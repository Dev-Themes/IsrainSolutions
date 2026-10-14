"use client";

import {
  User as UserIcon,
  Menu,
  X,
  PlusCircle,
  Sparkles,
  LayoutDashboard,
  FileText,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../layout/ThemeToggle";
import { cn } from "@/lib/utils";

interface ClientHeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
  };
}

export default function ClientHeader({ user }: ClientHeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileNavOpen]);

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

  const mobileNav = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Articles", href: "/dashboard/articles", icon: FileText },
    { name: "Write Article", href: "/dashboard/articles/new", icon: PlusCircle },
    { name: "AI Draft Generator", href: "/dashboard/ai/generate", icon: Sparkles },
    { name: "Contributor Profile", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#102925] px-4 sm:px-6 shadow-2xs transition-colors">
      {/* Mobile brand & menu button */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-[#E2F5ED] dark:hover:bg-[#21473F] text-[#153A34] dark:text-[#F0FCF7] border border-[#C6E2D6] dark:border-[#355A50]"
          aria-expanded={isMobileNavOpen}
          aria-controls="contributor-mobile-nav"
          aria-label={isMobileNavOpen ? "Close navigation" : "Open navigation"}
        >
          {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <span className="font-extrabold text-[#087B61] dark:text-[#65DEAE]">CareerVixa</span>
      </div>

      <div className="hidden lg:flex items-center gap-2 text-sm text-black dark:text-[#B5D8CC]">
        <span className="font-bold text-black dark:text-[#F0FCF7]">Contributor Portal</span>
        <span>&middot;</span>
        <span className="text-xs font-semibold text-black dark:text-[#B5D8CC]">Guest Publishing, Editorial Queue &amp; Analytics Hub</span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/articles/new"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-[#087B61] text-white hover:bg-[#086A54] dark:bg-[#65DEAE] dark:text-[#08261E] dark:hover:bg-[#95F0CB] transition-colors shadow-xs min-h-[40px] cursor-pointer"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span>Write Article</span>
        </Link>

        <ThemeToggle />

        {/* User profile dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] hover:bg-[#E2F5ED] dark:hover:bg-[#21473F] transition-colors min-h-[44px] min-w-[44px] cursor-pointer"
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
            aria-label="Contributor profile menu"
          >
            <UserIcon className="h-4 w-4 text-slate-900 dark:text-[#F0FCF7]" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] text-slate-950 dark:text-[#F0FCF7] shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="px-4 py-2 border-b border-[#C6E2D6] dark:border-[#355A50]">
                <span className="text-[10px] text-slate-700 dark:text-[#B5D8CC] uppercase font-bold block">Signed in as</span>
                <span className="text-sm font-bold truncate text-slate-950 dark:text-[#F0FCF7] block">{user?.name || "Contributor"}</span>
                <span className="text-xs text-slate-700 dark:text-[#B5D8CC] truncate block">{user?.email}</span>
              </div>
              <Link
                href="/dashboard/settings"
                className="block px-4 py-2.5 text-xs font-semibold hover:bg-[#E2F5ED] dark:hover:bg-[#21473F] transition-colors text-slate-900 dark:text-[#F0FCF7] cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Contributor Profile
              </Link>
              <Link
                href="/"
                target="_blank"
                className="block px-4 py-2.5 text-xs font-semibold hover:bg-[#E2F5ED] dark:hover:bg-[#21473F] transition-colors text-slate-900 dark:text-[#F0FCF7] cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                View Public Blog
              </Link>
              <div className="border-t border-[#C6E2D6] dark:border-[#355A50] my-1" />
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      </header>

      {/* Mobile nav drawer portaled directly to document.body */}
      {mounted && isMobileNavOpen && createPortal(
        <div className="lg:hidden fixed inset-0 z-[9999] flex justify-start">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileNavOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="contributor-mobile-nav"
            aria-label="Contributor Navigation"
            className="relative z-10 w-full max-w-xs bg-[#11483F] dark:bg-[#092B27] text-white border-r border-[#21473F] dark:border-[#153630] h-full p-4 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-left duration-200"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between pb-3 border-b border-[#21473F] dark:border-[#153630]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#087B61] dark:bg-[#65DEAE] text-white dark:text-[#08261E] font-black text-xs flex items-center justify-center">
                    CV
                  </div>
                  <span className="font-extrabold text-sm text-white">Contributor Hub</span>
                </div>
                <button
                  onClick={() => setIsMobileNavOpen(false)}
                  className="p-1.5 text-[#B5D8CC] hover:text-white rounded-lg hover:bg-[#21473F] min-h-[40px] min-w-[40px] flex items-center justify-center"
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1.5 pt-2">
                {mobileNav.map((item) => {
                  const isWriteArticle = pathname === "/dashboard/articles/new";
                  const isActive = item.href === "/dashboard/articles/new"
                    ? isWriteArticle
                    : item.href === "/dashboard/articles"
                      ? pathname.startsWith("/dashboard/articles") && !isWriteArticle
                      : item.href === "/dashboard"
                        ? pathname === "/dashboard"
                        : pathname === item.href || pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileNavOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold min-h-[44px] transition-colors",
                        isActive
                          ? "bg-[#087B61] text-white dark:bg-[#65DEAE] dark:text-[#08261E] font-bold shadow-xs"
                          : "text-[#E2F5ED] hover:bg-[#21473F]/70 hover:text-white dark:text-[#B5D8CC] dark:hover:bg-[#21473F]/60 dark:hover:text-white"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#21473F] dark:border-[#153630] flex flex-col gap-2">
              <div className="flex items-center gap-2.5 px-3 py-2 bg-[#0B3A32] dark:bg-[#061F1C] rounded-xl">
                <div className="w-8 h-8 rounded-full bg-[#087B61]/50 border border-[#65DEAE]/40 text-[#95F0CB] font-bold text-xs flex items-center justify-center">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "C"}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white truncate">{user?.name || "Contributor"}</span>
                  <span className="text-[10px] text-[#B5D8CC] truncate">{user?.email || "Guest Author"}</span>
                </div>
              </div>
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#B5D8CC] hover:text-white min-h-[40px]"
              >
                <span>View Public Platform</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-rose-300 hover:text-rose-100 min-h-[40px] text-left cursor-pointer"
              >
                <span>Log Out</span>
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </>
  );
}
