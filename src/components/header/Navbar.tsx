
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  ShoppingBag,
  Package,
  Building2,
  Coffee,
} from "lucide-react";

import { useSession, signOut } from "@/lib/auth-client";

const navLinks = [
  { name: "Admin", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/orders", icon: ShoppingBag },
  { name: "Products", href: "/products", icon: Package },
  { name: "Branches", href: "/branches", icon: Building2 },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user;
  const userName = user?.name || "User";
  const userImage = user?.image;

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      await signOut();

      closeMenu();
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E7E2DC] bg-white/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)] backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">

        {/* Left: Mobile Menu + Navigation */}
        <div className="flex flex-1 items-center gap-5">

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#111111] transition-all hover:bg-[#F7F5F1] active:scale-95 lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#77736E] transition-all duration-200 hover:bg-[#F7F5F1] hover:text-[#79543A] xl:px-4"
              >
                <link.icon
                  size={16}
                  className="text-[#A49A8C] transition-colors group-hover:text-[#79543A]"
                />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Tablet Navigation */}
          <div className="hidden items-center gap-1 md:flex lg:hidden">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-semibold text-[#77736E] transition-colors hover:bg-[#F7F5F1] hover:text-[#79543A] sm:text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Center: Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center justify-center"
          aria-label="Black Coffee Home"
        >
          <Image
            src="/logo.png"
            alt="Black Coffee Logo"
            width={150}
            height={60}
            priority
            className="h-12 w-auto object-contain sm:h-16"
            sizes="150px"
          />
        </Link>

        {/* Right: Authentication */}
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">

          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Profile */}
              <div className="flex min-w-0 items-center gap-2 rounded-xl border border-[#E7E2DC] bg-[#FDFCFB] p-1.5 pr-2 sm:gap-3 sm:pr-3">
                {userImage ? (
                  <img
                    src={userImage}
                    alt={`${userName}'s profile`}
                    className="h-9 w-9 shrink-0 rounded-full border border-[#E7E2DC] object-cover sm:h-10 sm:w-10"
                  />
                ) : (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#79543A] text-xs font-bold text-white sm:h-10 sm:w-10">
                    {initials || "U"}
                  </div>
                )}

                <div className="hidden min-w-0 sm:block">
                  <p className="max-w-28 truncate text-sm font-semibold text-[#292929]">
                    {userName}
                  </p>
                  <p className="text-[11px] text-[#999083]">
                    Account
                  </p>
                </div>

                <ChevronDown
                  size={15}
                  className="hidden text-[#999083] sm:block"
                />
              </div>

              {/* Sign Out */}
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E7E2DC] text-[#77736E] transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:w-auto sm:gap-2 sm:px-4"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut size={17} />
                <span className="hidden text-sm font-semibold sm:inline">
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="hidden rounded-xl border border-[#E7E2DC] px-4 py-2.5 text-sm font-semibold text-[#111111] transition-all hover:border-[#79543A] hover:bg-[#F7F5F1] hover:text-[#79543A] sm:inline-flex"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-xl bg-[#111111] px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#79543A] hover:shadow-md active:scale-95 sm:px-5 sm:text-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#E7E2DC] bg-white/95 px-4 py-5 shadow-xl backdrop-blur-xl lg:hidden"
        >
          <div className="mx-auto max-w-7xl space-y-2">

            {/* Mobile User Info */}
            {user && (
              <div className="mb-4 flex items-center gap-3 rounded-2xl bg-[#F7F5F1] p-4">
                {userImage ? (
                  <img
                    src={userImage}
                    alt={`${userName}'s profile`}
                    className="h-11 w-11 rounded-full border border-[#E7E2DC] object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#79543A] text-sm font-bold text-white">
                    {initials || "U"}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#292929]">
                    {userName}
                  </p>
                  <p className="text-xs text-[#999083]">
                    Welcome to Black Coffee
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="group flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-[#77736E] transition-all hover:bg-[#F7F5F1] hover:text-[#79543A]"
              >
                <link.icon
                  size={18}
                  className="text-[#A49A8C] transition-colors group-hover:text-[#79543A]"
                />
                {link.name}
              </Link>
            ))}

            {/* Mobile Authentication */}
            <div className="mt-4 border-t border-[#E7E2DC] pt-4">
              {user ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
                >
                  <LogOut size={17} />
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="rounded-xl border border-[#E7E2DC] px-4 py-3 text-center text-sm font-semibold text-[#111111] transition-all hover:border-[#79543A] hover:text-[#79543A]"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className="rounded-xl bg-[#111111] px-4 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-[#79543A]"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 pt-4 text-xs text-[#A49A8C]">
              <Coffee size={14} />
              <span>Black Coffee Management System</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
