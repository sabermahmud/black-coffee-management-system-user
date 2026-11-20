
import { NextResponse, type NextRequest } from "next/server";

import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Public authentication routes
  const isPublicRoute =
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname === "/signup" ||
    pathname.startsWith("/signup/");

  // Verify Better Auth session on the server
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // Not logged in
    if (!session) {
      // Allow login and signup pages
      if (isPublicRoute) {
        return NextResponse.next();
      }

      // Redirect to login
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set(
        "callbackUrl",
        `${pathname}${search}`
      );

      return NextResponse.redirect(loginUrl);
    }

    // Already logged in: redirect away from login/signup
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Authenticated user can continue
    return NextResponse.next();
  } catch (error) {
    console.error("Authentication proxy error:", error);

    // Fail closed if session verification fails
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
