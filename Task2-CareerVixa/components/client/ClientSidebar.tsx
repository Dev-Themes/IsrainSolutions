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
      className="fixed inset-y-0 left-0 z-40 hidden sm:flex w-16 lg:w-64 flex-col border-r border-[#047857]/40 dark:border-[#1E293B] bg-[#064E3B] dark:bg-[#0F172A] text-white shadow-xl transition-colors"
    >
      {/* 1. TOP SECTION: Branding & Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-[#047857]/40 dark:border-[#1E293B] px-4 lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-2.5 font-bold min-h-[44px] group">
          <div className="w-8 h-8 rounded-lg bg-[#059669] dark:bg-[#34D399] text-white dark:text-[#064E3B] font-black text-sm flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            CV
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-white leading-none">
              CareerVixa
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 dark:text-[#34D399] mt-1">
              Contributor Hub
            </span>
          </div>
        </Link>
      </div>

      {/* 2. MIDDLE SECTION: Scrollable Navigation Links (Ends before user profile) */}
      <nav
        className="flex flex-col gap-1.5 px-3 py-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-800"
        aria-label="Contributor Navigation"
      >
        <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-emerald-200/70 dark:text-[#94A3B8] px-3 py-1 mb-1">
          Publishing Portal
        </span>
        {navItems.map((item) => {
          const isWriteArticle = pathname === "/dashboard/articles/new";
          const isActive =
            item.href === "/dashboard/articles/new"
              ? isWriteArticle
              : item.href === "/dashboard/articles"
                ? pathname.startsWith("/dashboard/articles") && !isWriteArticle
                : item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname === item.href || pathname.startsWith(item.href);
          return (
            <div key={item.href} className="relative group/nav">
              <Link
                href={item.href}
                aria-label={item.name}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all min-h-[42px] focus:outline-none focus:ring-2 focus:ring-[#34D399]/50",
                  isActive
                    ? "bg-[#059669] text-white dark:bg-[#34D399] dark:text-[#064E3B] font-bold shadow-sm"
                    : "text-emerald-100 hover:bg-[#047857]/50 hover:text-white dark:text-[#CBD5E1] dark:hover:bg-[#1E293B] dark:hover:text-white"
                )}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white dark:text-[#064E3B]" : "text-emerald-300 dark:text-[#34D399]")} />
                <span className="hidden lg:block truncate">{item.name}</span>
              </Link>
              {/* Accessible Floating Tooltip on compact rail (hover & keyboard focus-within) */}
              <div
                role="tooltip"
                className="lg:hidden pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#0B1220] text-white dark:bg-[#151F32] dark:text-[#F8FAFC] border border-slate-700 dark:border-[#334155] shadow-xl opacity-0 -translate-x-1 transition-all duration-150 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-focus-within/nav:opacity-100 group-focus-within/nav:translate-x-0 whitespace-nowrap"
              >
                {item.name}
              </div>
            </div>
          );
        })}
      </nav>

      {/* 3. BOTTOM SECTION: Visually Separated User Profile & Account */}
      <div className="shrink-0 border-t border-[#047857]/40 dark:border-[#1E293B] bg-[#043E30] dark:bg-[#0B1220] p-3 lg:p-4">
        {/* User Card */}
        <div className="hidden lg:flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#059669]/50 border border-emerald-400/40 text-emerald-200 dark:text-[#34D399] font-bold text-sm flex items-center justify-center shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : "C"}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-white truncate">
              {user?.name || "Contributor"}
            </span>
            <span className="text-[10px] text-emerald-200/80 dark:text-[#94A3B8] truncate">
              {user?.email || "Guest Author"}
            </span>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col gap-1">
          <div className="relative group/nav">
            <Link
              href="/"
              target="_blank"
              aria-label="View Public Blog"
              className="flex items-center justify-between text-xs font-semibold text-emerald-200 hover:text-white hover:bg-[#047857]/40 dark:text-[#CBD5E1] dark:hover:text-white dark:hover:bg-[#1E293B] rounded-lg px-2.5 py-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#34D399]/50"
            >
              <span className="hidden lg:inline">View Public Blog</span>
              <ExternalLink className="h-3.5 w-3.5 mx-auto lg:mx-0" />
            </Link>
            <div
              role="tooltip"
              className="lg:hidden pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#0B1220] text-white dark:bg-[#151F32] dark:text-[#F8FAFC] border border-slate-700 dark:border-[#334155] shadow-xl opacity-0 -translate-x-1 transition-all duration-150 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-focus-within/nav:opacity-100 group-focus-within/nav:translate-x-0 whitespace-nowrap"
            >
              View Public Blog
            </div>
          </div>

          <div className="relative group/nav">
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center justify-between text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 rounded-lg px-2.5 py-1.5 transition-colors text-left w-full focus:outline-none focus:ring-2 focus:ring-rose-400/50 cursor-pointer"
              aria-label="Sign Out"
            >
              <span className="hidden lg:inline">Sign Out</span>
              <LogOut className="h-3.5 w-3.5 mx-auto lg:mx-0" />
            </button>
            <div
              role="tooltip"
              className="lg:hidden pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#0B1220] text-white dark:bg-[#151F32] dark:text-[#F8FAFC] border border-slate-700 dark:border-[#334155] shadow-xl opacity-0 -translate-x-1 transition-all duration-150 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-focus-within/nav:opacity-100 group-focus-within/nav:translate-x-0 whitespace-nowrap"
            >
              Sign Out
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
