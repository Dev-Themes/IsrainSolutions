"use client";

import {
  User as UserIcon,
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Clock,
  SearchCheck,
  Folder,
  Tags,
  Bot,
  Sparkles,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../layout/ThemeToggle";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
  };
}

const adminNav = [
  { name: "Overview Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "All Articles", href: "/admin/articles", icon: FileText },
  { name: "Review Queue", href: "/admin/articles?status=PENDING_REVIEW", icon: Clock },
  { name: "SEO Health Audit", href: "/admin/seo", icon: SearchCheck },
  { name: "Categories", href: "/admin/categories", icon: Folder },
  { name: "Tags", href: "/admin/tags", icon: Tags },
  { name: "AI Automation", href: "/admin/ai/automation", icon: Bot },
  { name: "AI Execution Logs", href: "/admin/ai/history", icon: Clock },
  { name: "Manual AI Generator", href: "/admin/ai/generate", icon: Sparkles },
];

export default function AdminHeader({ user }: AdminHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsMobileNavOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border-default bg-bg-surface px-4 sm:px-6 shadow-2xs">
      {/* Mobile brand & menu button */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-bg-surface-subtle text-text-heading border border-border-default cursor-pointer"
          aria-expanded={isMobileNavOpen}
          aria-controls="admin-mobile-nav"
          aria-label={isMobileNavOpen ? "Close navigation" : "Open navigation"}
        >
          {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <span className="font-extrabold text-brand-primary-text">CareerVixa Admin</span>
      </div>

      <div className="hidden lg:flex items-center gap-2 text-sm text-text-muted">
        <span className="font-bold text-text-heading">Executive CMS</span>
        <span>&middot;</span>
        <span className="text-xs font-medium">Editorial Governance &amp; AI Intelligence Controls</span>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default bg-bg-surface hover:bg-bg-surface-subtle transition-colors min-h-[44px] min-w-[44px] cursor-pointer"
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
            aria-label="Admin user menu"
          >
            <UserIcon className="h-4 w-4 text-text-heading" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border-default bg-bg-surface text-text-heading shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="px-4 py-2 text-xs border-b border-border-default">
                <span className="text-[10px] uppercase font-bold text-text-muted block">Signed in as</span>
                <span className="font-bold truncate text-text-heading block">{user?.name || "Super Admin"}</span>
                <span className="text-[11px] text-text-muted truncate block">{user?.email}</span>
              </div>
              <Link
                href="/"
                target="_blank"
                className="block px-4 py-2.5 text-xs font-semibold hover:bg-bg-surface-subtle transition-colors cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                View Public Site
              </Link>
              <div className="border-t border-border-default my-1" />
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav drawer with 100% solid opaque background */}
      {isMobileNavOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setIsMobileNavOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="admin-mobile-nav"
            aria-label="Admin Mobile Navigation"
            className="relative z-10 w-full max-w-xs bg-[#142B49] dark:bg-[#080F1D] text-slate-100 border-r border-[#1B385E] dark:border-[#1E2E48] h-[calc(100vh-4rem)] p-4 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-left duration-200"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#7E96BA] dark:text-[#647C9E] px-3 py-2">
                Editorial Management
              </span>
              {adminNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-semibold min-h-[44px] transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#2458C6] text-white dark:bg-[#78A5FF] dark:text-[#09162C] font-bold shadow-xs"
                        : "text-[#B8C8DF] hover:bg-[#1B385E] dark:hover:bg-[#122036] hover:text-white"
                    }`}
                  >
                    <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white dark:text-[#09162C]" : "text-[#7E96BA] dark:text-[#647C9E]")} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#1B385E] dark:border-[#1E2E48] flex flex-col gap-2">
              <div className="flex items-center gap-2.5 px-3 py-2 bg-[#0E2038] dark:bg-[#050A14] rounded-xl border border-[#1B385E] dark:border-[#1E2E48]">
                <div className="w-8 h-8 rounded-full bg-[#2458C6] dark:bg-[#78A5FF] text-white dark:text-[#09162C] font-bold text-xs flex items-center justify-center shrink-0">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white truncate">{user?.name || "Admin"}</span>
                  <span className="text-[10px] text-[#B8C8DF] truncate">{user?.email || "Super Administrator"}</span>
                </div>
              </div>
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#B8C8DF] hover:text-white min-h-[40px] cursor-pointer"
              >
                <span>View Public Platform</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 min-h-[40px] text-left cursor-pointer"
              >
                <span>Sign Out</span>
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
