"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Sparkles,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface ClientSidebarProps {
  user?: {
    name?: string | null;
    email?: string | null;
  };
}

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Articles", href: "/dashboard/articles", icon: FileText },
  { name: "Write Article", href: "/dashboard/articles/new", icon: PlusCircle },
  { name: "AI Draft Generator", href: "/dashboard/ai/generate", icon: Sparkles },
  { name: "Contributor Profile", href: "/dashboard/settings", icon: Settings },
];

export default function ClientSidebar({ user }: ClientSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden sm:flex w-16 lg:w-64 flex-col border-r border-[#21473F] dark:border-[#153630] bg-[#11483F] dark:bg-[#092B27] text-white shadow-xl transition-colors"
    >
      {/* 1. TOP SECTION: Branding & Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-[#21473F] dark:border-[#153630] px-4 lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-2.5 font-bold min-h-[44px] group">
          <div className="w-8 h-8 rounded-lg bg-[#087B61] dark:bg-[#65DEAE] text-white dark:text-[#08261E] font-black text-sm flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            CV
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-white leading-none">
              CareerVixa
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#95F0CB] dark:text-[#65DEAE] mt-1">
              Contributor Hub
            </span>
          </div>
        </Link>
      </div>

      {/* 2. MIDDLE SECTION: Scrollable Navigation Links (Ends before user profile) */}
      <nav
        className="flex flex-col gap-1.5 px-3 py-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#21473F]"
        aria-label="Contributor Navigation"
      >
        <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-[#B5D8CC] px-3 py-1 mb-1">
          Publishing Portal
        </span>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.name}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all min-h-[42px]",
                isActive
                  ? "bg-[#087B61] text-white dark:bg-[#65DEAE] dark:text-[#08261E] font-bold shadow-sm"
                  : "text-[#E2F5ED] hover:bg-[#21473F]/70 hover:text-white dark:text-[#B5D8CC] dark:hover:bg-[#21473F]/60 dark:hover:text-white"
              )}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white dark:text-[#08261E]" : "text-[#95F0CB] dark:text-[#65DEAE]")} />
              <span className="hidden lg:block truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* 3. BOTTOM SECTION: Visually Separated User Profile & Account */}
      <div className="shrink-0 border-t border-[#21473F] dark:border-[#153630] bg-[#0B3A32] dark:bg-[#061F1C] p-3 lg:p-4">
        {/* User Card */}
        <div className="hidden lg:flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#087B61]/50 border border-[#65DEAE]/40 text-[#95F0CB] dark:text-[#65DEAE] font-bold text-sm flex items-center justify-center shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : "C"}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-white truncate">
              {user?.name || "Contributor"}
            </span>
            <span className="text-[10px] text-[#B5D8CC] truncate">
              {user?.email || "Guest Author"}
            </span>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs font-semibold text-[#B5D8CC] hover:text-white hover:bg-[#21473F]/60 rounded-lg px-2.5 py-1.5 transition-colors"
          >
            <span className="hidden lg:inline">View Public Blog</span>
            <ExternalLink className="h-3.5 w-3.5 mx-auto lg:mx-0" />
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center justify-between text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 rounded-lg px-2.5 py-1.5 transition-colors text-left"
            title="Sign Out"
          >
            <span className="hidden lg:inline">Sign Out</span>
            <LogOut className="h-3.5 w-3.5 mx-auto lg:mx-0" />
          </button>
        </div>
      </div>
    </aside>
  );
}
