import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isPublicRoute = pathname === "/login" || pathname === "/signup";

  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // User is not authenticated
    if (!session) {
      if (isPublicRoute) {
        return NextResponse.next();
      }

      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);

      return NextResponse.redirect(loginUrl);
    }

    // User is already authenticated
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy authentication error:", error);

    if (isPublicRoute) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf)$).*)",
  ],
};
