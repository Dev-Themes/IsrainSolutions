"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Tags,
  Folder,
  Sparkles,
  Clock,
  Bot,
  SearchCheck,
  ExternalLink,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

const mainNav = [
  { name: "Overview Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "All Articles", href: "/admin/articles", icon: FileText },
  { name: "Review Queue", href: "/admin/articles?status=PENDING_REVIEW", icon: Clock },
];

const taxonomyNav = [
  { name: "SEO Health Audit", href: "/admin/seo", icon: SearchCheck },
  { name: "Categories", href: "/admin/categories", icon: Folder },
  { name: "Tags", href: "/admin/tags", icon: Tags },
];

const aiNav = [
  { name: "AI Automation", href: "/admin/ai/automation", icon: Bot },
  { name: "AI Execution Logs", href: "/admin/ai/history", icon: Clock },
  { name: "Manual AI Generator", href: "/admin/ai/generate", icon: Sparkles },
];

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearchParam(window.location.search);
    }
  }, [pathname]);

  const renderNavGroup = (items: typeof mainNav, title: string) => (
    <div className="flex flex-col gap-1">
      <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-[#7E96BA] dark:text-[#647C9E] px-3 py-1">
        {title}
      </span>
      {items.map((item) => {
        const isReviewQueue = searchParam.includes("status=PENDING_REVIEW");
        const isActive = item.href.includes("status=PENDING_REVIEW")
          ? pathname === "/admin/articles" && isReviewQueue
          : item.href === "/admin/articles"
            ? pathname === "/admin/articles" && !isReviewQueue
            : item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href || pathname.startsWith(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            title={item.name}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all min-h-[42px] cursor-pointer",
              isActive
                ? "bg-[#2458C6] text-white dark:bg-[#78A5FF] dark:text-[#09162C] font-bold shadow-sm"
                : "text-[#B8C8DF] hover:bg-[#1B385E] dark:hover:bg-[#122036] hover:text-white"
            )}
          >
            <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white dark:text-[#09162C]" : "text-[#7E96BA] dark:text-[#647C9E]")} />
            <span className="hidden lg:block truncate">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden sm:flex w-16 lg:w-64 flex-col border-r border-[#1B385E] dark:border-[#1E2E48] bg-[#142B49] dark:bg-[#080F1D] text-slate-100 shadow-xl"
    >
      {/* 1. TOP SECTION: Branding & Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-[#1B385E] dark:border-[#1E2E48] px-4 lg:px-6">
        <Link href="/admin" className="flex items-center gap-2.5 font-bold min-h-[44px] group">
          <div className="w-8 h-8 rounded-lg bg-[#2458C6] dark:bg-[#78A5FF] text-white dark:text-[#09162C] font-black text-sm flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            CV
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-white leading-none">
              CareerVixa
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A2C4FF] mt-1">
              Admin CMS
            </span>
          </div>
        </Link>
      </div>

      {/* 2. MIDDLE SECTION: Scrollable Navigation Links (Ends before user profile) */}
      <nav
        className="flex flex-col gap-4 px-3 py-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800"
        aria-label="Admin Editorial Navigation"
      >
        {renderNavGroup(mainNav, "Content & Editorial")}
        <div className="border-t border-[#1B385E] dark:border-[#1E2E48] my-1 hidden lg:block" />
        {renderNavGroup(taxonomyNav, "SEO & Taxonomies")}
        <div className="border-t border-[#1B385E] dark:border-[#1E2E48] my-1 hidden lg:block" />
        {renderNavGroup(aiNav, "Autonomous AI")}
      </nav>

      {/* 3. BOTTOM SECTION: Visually Separated User Profile & Account */}
      <div className="shrink-0 border-t border-[#1B385E] dark:border-[#1E2E48] bg-[#0E2038] dark:bg-[#050A14] p-3 lg:p-4">
        {/* User Card */}
        <div className="hidden lg:flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#2458C6]/30 border border-[#2458C6]/50 text-[#A2C4FF] font-bold text-sm flex items-center justify-center shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-white truncate">
              {user?.name || "Admin Editorial"}
            </span>
            <span className="text-[10px] text-[#B8C8DF] truncate">
              {user?.email || "Super Administrator"}
            </span>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs font-semibold text-[#B8C8DF] hover:text-white hover:bg-[#1B385E] dark:hover:bg-[#122036] rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer"
          >
            <span className="hidden lg:inline">View Public Site</span>
            <ExternalLink className="h-3.5 w-3.5 mx-auto lg:mx-0" />
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center justify-between text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg px-2.5 py-1.5 transition-colors text-left cursor-pointer"
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
