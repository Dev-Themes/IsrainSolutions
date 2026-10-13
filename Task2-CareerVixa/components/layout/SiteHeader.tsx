"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, User as UserIcon, PenTool, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SiteHeader({ user }: { user?: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Close menus on Escape key and restore focus
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMenuOpen) {
          setIsMenuOpen(false);
          hamburgerRef.current?.focus();
        }
        setIsUserMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Career Growth", href: "/category/career-development" },
    { name: "Job Search", href: "/category/job-search-strategies" },
    { name: "Resumes", href: "/category/resume-and-cover-letters" },
    { name: "Interviews", href: "/category/interview-preparation" },
    { name: "Salary & Negotiation", href: "/category/salary-and-negotiation" },
  ];

  const isDashboardOrAdmin = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  if (isDashboardOrAdmin) {
    return null;
  }

  return (
    <>
      {/* Skip to Content for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-brand-btn-fill focus:text-white focus:font-bold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full bg-surface/90 backdrop-blur-md border-b border-border-default transition-colors">
        <Container className="h-16 lg:h-[72px] flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group min-h-[44px]">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary-hover via-brand-primary to-brand-accent flex items-center justify-center text-white font-black text-lg shadow-sm shadow-brand-primary/20 group-hover:scale-105 transition-transform">
              CV
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-text-heading group-hover:text-brand-primary-text transition-colors">
                CareerVixa
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-bold tracking-wider text-text-muted -mt-1">
                Executive Career Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (1280px and above for complete breathing room) */}
          <div className="hidden xl:flex items-center gap-5">
            <nav className="flex items-center gap-1" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors min-h-[40px] flex items-center whitespace-nowrap shrink-0 ${
                      isActive
                        ? "text-brand-primary-text font-bold underline underline-offset-4 decoration-2 decoration-brand-primary"
                        : "text-text-muted hover:text-text-heading hover:bg-bg-surface-subtle"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="h-5 w-px bg-border-default mx-1 shrink-0" aria-hidden="true" />

            {/* Contributor Direct Action */}
            <Link
              href="/publish"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-brand-primary-text bg-brand-soft hover:bg-brand-soft/80 border border-brand-primary/20 transition-all hover:-translate-y-0.5 min-h-[40px] shrink-0 whitespace-nowrap"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Write For Us</span>
            </Link>

            <ThemeToggle />

            {user ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-border-default bg-bg-surface hover:bg-bg-surface-subtle text-text-heading transition-colors focus:outline-none min-h-[40px]"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                  aria-label="User account menu"
                >
                  <div className="w-7 h-7 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-xs font-semibold max-w-[100px] truncate">{user.name || "Account"}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-bg-surface border border-border-default shadow-xl rounded-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                    <div className="px-3.5 py-2 border-b border-border-default">
                      <p className="text-xs font-bold text-text-heading truncate">{user.name}</p>
                      <p className="text-[11px] text-text-muted truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-soft text-brand-primary-text">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
                      className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-text-heading hover:bg-bg-surface-subtle transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-text-muted" />
                      <span>{user.role === "ADMIN" ? "Admin CMS Hub" : "Contributor Dashboard"}</span>
                    </Link>

                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-text-heading hover:bg-bg-surface-subtle transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-3.5 h-3.5 text-text-muted" />
                      <span>Account Settings</span>
                    </Link>

                    <div className="border-t border-border-default my-1" />

                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 w-full text-left px-3.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5 shrink-0">
                <Link
                  href="/login"
                  className="text-xs font-bold text-text-heading hover:text-brand-primary-text px-3 py-2 rounded-lg transition-colors min-h-[40px] flex items-center"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold text-white bg-brand-btn-fill hover:bg-brand-btn-hover shadow-sm transition-all hover:shadow min-h-[40px]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile & Tablet Header Elements (Below 1280px) */}
          <div className="xl:hidden flex items-center gap-2">
            <ThemeToggle />

            {user && (
              <Link
                href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-text-heading hover:text-brand-primary-text rounded-lg"
                aria-label="Dashboard"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
            )}

            <button
              ref={hamburgerRef}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-text-heading hover:text-brand-primary-text rounded-lg border border-border-default/60 hover:border-brand-primary/40 bg-bg-surface/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>

        {/* Mobile Navigation Drawer with Overlay */}
        {isMenuOpen && (
          <div className="xl:hidden fixed inset-0 top-16 lg:top-[72px] z-50">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in Drawer */}
            <nav
              id="mobile-nav-drawer"
              aria-label="Mobile Navigation Drawer"
              className="relative z-10 w-full max-w-sm ml-auto h-[calc(100vh-4rem)] bg-surface border-l border-border-default shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between pb-3 border-b border-border-default">
                  <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    Navigation Menu
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-text-muted hover:text-text-heading min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-1 pt-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`font-semibold text-sm min-h-[44px] flex items-center px-3.5 rounded-lg transition-colors ${
                          isActive
                            ? "bg-brand-soft text-brand-primary-text font-bold"
                            : "text-text-heading hover:bg-surface-subtle"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-border-default">
                  <Link
                    href="/publish"
                    className="flex items-center gap-2 px-3.5 py-3 rounded-lg text-xs font-bold text-brand-primary-text bg-brand-soft border border-brand-primary/20 min-h-[44px]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PenTool className="w-4 h-4 shrink-0" />
                    <span>Write For CareerVixa</span>
                  </Link>
                </div>
              </div>

              {/* Bottom Auth Section */}
              <div className="pt-6 border-t border-border-default flex flex-col gap-2.5">
                {!user ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      className="flex items-center justify-center px-4 py-2.5 rounded-lg text-xs font-bold border border-border-default text-text-heading hover:bg-surface-subtle min-h-[44px]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center justify-center px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-brand-btn-fill hover:bg-brand-btn-hover min-h-[44px]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => signOut()}
                    className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 w-full min-h-[44px]"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
