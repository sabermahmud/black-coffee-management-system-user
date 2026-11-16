
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminNavbarProps {
  onMenuClick?: () => void;
}

export default function AdminNavbar({
  onMenuClick,
}: AdminNavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E7E2DC] bg-white">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">

        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="text-[#111111] hover:bg-[#F7F5F1]"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Black Coffee"
              width={95}
              height={55}
              priority
              className="h-10 w-auto object-contain"
            />

            <div className="hidden sm:block border-l border-[#E7E2DC] pl-3">
              <p className="text-sm font-bold tracking-wide text-[#111111]">
                BLACK COFFEE
              </p>
              <p className="text-[10px] tracking-widest text-[#79543A]">
                MANAGEMENT
              </p>
            </div>
          </Link>
        </div>

        {/* Search Section */}
        <div className="hidden max-w-md flex-1 md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77736E]" />
            <Input
              placeholder="Search anything..."
              className="h-10 border-[#E7E2DC] bg-[#F7F5F1] pl-10 text-sm focus-visible:ring-[#79543A]"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">

          {/* Notification */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-[#292929] hover:bg-[#F7F5F1]"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#79543A] ring-2 ring-white" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="ghost"
                className="flex h-auto items-center gap-2 px-2 py-1 hover:bg-[#F7F5F1]"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-[#79543A] font-semibold text-white">
                    BC
                  </AvatarFallback>
                </Avatar>

                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-[#111111]">
                    Admin User
                  </p>
                  <p className="text-xs text-[#77736E]">
                    Administrator
                  </p>
                </div>

                <ChevronDown className="hidden h-4 w-4 text-[#77736E] sm:block" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link href="/admin/profile">
                  <UserRound className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}
