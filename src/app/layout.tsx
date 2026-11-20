import type { Metadata } from "next";
import { Manrope, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import AdminNavbar from "@/app/admin/adminNav/AdminNavbar";
import Navbar from "@/components/header/Navbar";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Black Coffee Management",
  description:
    "Black Coffee Shop Management System - Manage orders, inventory, staff and daily business operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${notoNaskhArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ">
        <header className="container mx-auto">
          <Navbar />
        </header>

        <main className="flex-1 container mx-auto">{children}</main>

        <footer className="container mx-auto" />
      </body>
    </html>
  );
}
