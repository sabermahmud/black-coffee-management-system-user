"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Admin", href: "/admin" },
  { name: "Orders", href: "/orders" },
  { name: "Products", href:"/products" },
  { name: "Branches", href: "/branches" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E7E2DC] bg-white/95 backdrop-blur-md">
      <nav className="mx-auto grid h-16 max-w-[1600px] grid-cols-3 items-center px-3 sm:h-20 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu + Desktop Navigation */}
        <div className="flex min-w-0 items-center">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#111111] transition-colors hover:bg-[#F7F5F1] md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 lg:flex xl:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-base font-semibold text-[#77736E] transition-colors hover:text-[#79543A]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Tablet Navigation */}
          <div className="hidden items-center gap-3 md:flex lg:hidden">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm font-semibold text-[#77736E] transition-colors hover:text-[#79543A]"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/products"
              className="whitespace-nowrap text-xs font-semibold text-[#77736E] hover:text-[#79543A]"
            >
              Products
            </Link>
          </div>
        </div>

        {/* Center: Logo */}
        <Link
          href="/"
          className="flex min-w-0 justify-center"
          aria-label="Black Coffee Home"
        >
          <Image
            src="/logo.png"
            alt="Black Coffee Logo"
            width={150}
            height={60}
            priority
            className="h-12 w-auto max-w-full object-contain sm:h-16 lg:h-20"
            sizes="(max-width: 640px) 100px, 150px"
          />
        </Link>

        {/* Right: Auth Buttons */}
        <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-3">
          <Link
            href="/login"
            className="hidden rounded-lg border border-[#E7E2DC] px-3 py-2 text-sm font-semibold text-[#111111] transition-all hover:border-[#79543A] hover:text-[#79543A] sm:inline-flex sm:px-5 sm:py-2.5"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="hidden rounded-lg bg-[#111111] px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-[#79543A] sm:inline-flex sm:px-5 sm:py-2.5"
          >
            Sign Up
          </Link>

          {/* Mobile Login */}
          <Link
            href="/login"
            className="rounded-lg bg-[#111111] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#79543A] sm:hidden"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#E7E2DC] bg-white px-4 py-4 shadow-lg md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-[#292929] transition-colors hover:bg-[#F7F5F1] hover:text-[#79543A]"
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#E7E2DC] pt-4">
              <Link
                href="/login"
                onClick={closeMenu}
                className="rounded-lg border border-[#E7E2DC] px-4 py-3 text-center text-sm font-semibold text-[#111111] transition-colors hover:border-[#79543A] hover:text-[#79543A]"
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={closeMenu}
                className="rounded-lg bg-[#111111] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#79543A]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
