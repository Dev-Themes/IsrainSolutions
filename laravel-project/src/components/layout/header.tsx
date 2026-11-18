"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Briefcase,
  ArrowRight,
  User,
  LogOut,
  LayoutDashboard,
  FileText,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { CATEGORIES } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";
import { UkFlagIcon, UsFlagIcon } from "@/components/ui/flag-icon";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);
  const [userCountry, setUserCountry] = React.useState<"UK" | "US">("UK");

  // Derive active country from route first, falling back to selected preference
  const country: "UK" | "US" = pathname.startsWith("/us")
    ? "US"
    : pathname.startsWith("/uk")
    ? "UK"
    : userCountry;

  const handleCountrySwitch = (target: "UK" | "US") => {
    setUserCountry(target);
    if (typeof window !== "undefined") {
      localStorage.setItem("tradeconnect_preferred_country", target);
    }
    if (pathname.startsWith("/uk") && target === "US") {
      router.push(pathname.replace(/^\/uk/, "/us"));
    } else if (pathname.startsWith("/us") && target === "UK") {
      router.push(pathname.replace(/^\/us/, "/uk"));
    } else if (pathname === "/") {
      router.push(`/${target.toLowerCase()}`);
    }
  };

  const hamburgerButtonRef = React.useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = React.useRef<HTMLDivElement>(null);

  // Close mobile drawer on resize to desktop (>= 1024px)
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Escape key
  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        hamburgerButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is active
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      mobileDrawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Sticky Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--line)] transition-colors overflow-x-clip">
        <div className="container-custom">
          <div className="flex items-center justify-between h-17">
            {/* Logo */}
            <div className="flex items-center space-x-3 shrink-0">
              <Link
                href="/"
                className="flex items-center space-x-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg p-0.5 group"
                aria-label="TradeConnect Homepage"
              >
                <div className="w-10 h-10 rounded-[var(--radius-sm)] overflow-hidden border border-[var(--line)] shadow-xs relative shrink-0">
                  <Image
                    src="/images/brand/logo.jpg"
                    alt="TradeConnect Logo"
                    fill
                    priority
                    sizes="40px"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <span className="font-bold text-lg sm:text-xl tracking-tight text-[var(--text)] block leading-none font-display">
                    Trade<span className="text-[var(--accent)]">Connect</span>
                  </span>
                  <span className="text-[9px] tracking-widest uppercase font-semibold text-[var(--text-muted)] block mt-0.5">
                    Verified Network &middot; UK & US
                  </span>
                </div>
              </Link>
            </div>

            {/* Streamlined Desktop Navigation Links (>= 1024px) */}
            <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5 shrink-0" aria-label="Main Navigation">
              {/* Services Dropdown */}
              <div
                className="relative py-2"
                onMouseEnter={() => setDesktopServicesOpen(true)}
                onMouseLeave={() => setDesktopServicesOpen(false)}
                onFocus={() => setDesktopServicesOpen(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setDesktopServicesOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={desktopServicesOpen}
                  className="nav-link-hover whitespace-nowrap text-xs font-semibold text-[var(--text)] hover:text-[var(--accent)] py-1 space-x-1"
                >
                  <span>Trade Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${
                      desktopServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {desktopServicesOpen && (
                  <div
                    className="absolute top-full left-0 w-64 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    role="menu"
                  >
                    <div className="p-2 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-md space-y-0.5">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/${country.toLowerCase()}/${cat.slug}`}
                          role="menuitem"
                          onClick={() => setDesktopServicesOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-[var(--radius-sm)] text-xs font-medium text-[var(--text)] hover:bg-[var(--bg-alt)] hover:text-[var(--accent)] transition-colors"
                        >
                          <span className="whitespace-nowrap">{cat.name}</span>
                          <ArrowRight className="w-3 h-3 opacity-50 shrink-0 ml-2" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/pros"
                className={`nav-link-hover whitespace-nowrap text-xs font-semibold py-1 ${
                  pathname === "/pros" ? "text-[var(--accent)] active" : "text-[var(--text)] hover:text-[var(--accent)]"
                }`}
              >
                Verified Directory
              </Link>

              <Link
                href="/about"
                className={`nav-link-hover whitespace-nowrap text-xs font-semibold py-1 ${
                  pathname === "/about" ? "text-[var(--accent)] active" : "text-[var(--text)] hover:text-[var(--accent)]"
                }`}
              >
                Our Standards
              </Link>
            </nav>

            {/* Desktop Actions & Role-Aware Action Buttons */}
            <div className="hidden lg:flex items-center space-x-2.5 xl:space-x-3 shrink-0">
              {/* Region Pill */}
              <div className="flex items-center bg-[var(--bg-alt)] p-0.5 rounded-[var(--radius-sm)] border border-[var(--line)] text-[11px]">
                <button
                  type="button"
                  onClick={() => handleCountrySwitch("UK")}
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] font-semibold transition-colors cursor-pointer ${
                    country === "UK"
                      ? "bg-[var(--surface)] text-[var(--text)] shadow-xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                  title="Switch to UK Market Directory (45% established coverage)"
                >
                  <UkFlagIcon className="w-3.5 h-2.5 rounded-[1px]" />
                  <span>UK</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCountrySwitch("US")}
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] font-semibold transition-colors cursor-pointer ${
                    country === "US"
                      ? "bg-[var(--surface)] text-[var(--text)] shadow-xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                  title="Switch to US Expansion Market Hub"
                >
                  <UsFlagIcon className="w-3.5 h-2.5 rounded-[1px]" />
                  <span>US</span>
                </button>
              </div>

              <ThemeToggle />

              {/* USER PROFILE OR SIGN IN BUTTON */}
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    onBlur={(e) => {
                      if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                        setUserDropdownOpen(false);
                      }
                    }}
                    className="flex items-center space-x-2 px-2.5 py-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] transition-colors cursor-pointer text-xs"
                  >
                    <div className="w-6 h-6 rounded-full bg-[var(--brand)] text-[var(--bg-deep-text)] font-bold text-[10px] flex items-center justify-center">
                      {user.avatar || "U"}
                    </div>
                    <span className="font-bold text-[var(--text)] max-w-[110px] truncate">
                      {user.name}
                    </span>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[var(--bg-alt)] text-[var(--text-muted)]">
                      {user.role === "PRO" ? "Pro" : "Client"}
                    </span>
                    <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-56 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-lg p-2 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-2.5 py-2 border-b border-[var(--line)] mb-1">
                        <div className="font-bold text-[var(--text)] truncate">{user.name}</div>
                        <div className="text-[11px] text-[var(--text-muted)] truncate">{user.email}</div>
                        <div className="text-[10px] uppercase font-bold text-[var(--accent)] mt-0.5">
                          {user.role === "PRO" ? "Verified Contractor Account" : "Homeowner Account"}
                        </div>
                      </div>

                      <Link
                        href={user.role === "PRO" ? "/dashboard/pro" : "/dashboard/homeowner"}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-2.5 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--bg-alt)] text-[var(--text)] transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[var(--brand)]" />
                        <span>My Dashboard</span>
                      </Link>

                      <Link
                        href={user.role === "PRO" ? "/dashboard/pro" : "/dashboard/homeowner"}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-2.5 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--bg-alt)] text-[var(--text)] transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span>Contract History & Invoices</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-2.5 py-2 rounded-[var(--radius-sm)] hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors text-left cursor-pointer mt-1 pt-2 border-t border-[var(--line)]"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="whitespace-nowrap px-3 py-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors flex items-center space-x-1"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* ROLE-AWARE ACTION BUTTONS:
                  - If Contractor (PRO): Show ONLY "Find Jobs", HIDE "Post a Job"
                  - If Homeowner (CUSTOMER): Show ONLY "Post a Job", HIDE "Find Jobs"
                  - If Visitor (!user): Show "Post a Job" & "Join as Pro" */}
              {user?.role === "PRO" && (
                <Link
                  href="/dashboard/pro"
                  className="whitespace-nowrap btn-secondary px-3.5 py-2 rounded-[var(--radius-sm)] text-xs font-bold inline-flex items-center space-x-1.5"
                  title="Contractor Leads Board & Proposals"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[var(--brand)]" />
                  <span>Find Jobs</span>
                </Link>
              )}

              {user?.role === "CUSTOMER" && (
                <Link
                  href="/quote"
                  className="whitespace-nowrap btn-primary px-4 py-2 rounded-[var(--radius-sm)] text-xs font-bold inline-flex items-center space-x-1.5 shadow-xs"
                  title="Post a job and receive competitive quotes"
                >
                  <span>Post a Job</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}

              {!user && (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/for-pros"
                    className="whitespace-nowrap px-3 py-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                    title="Information and registration for trade professionals"
                  >
                    <span>For Trades</span>
                  </Link>
                  <Link
                    href="/auth/login?redirect=/quote"
                    className="whitespace-nowrap btn-primary px-4 py-2 rounded-[var(--radius-sm)] text-xs font-bold inline-flex items-center space-x-1.5 shadow-xs"
                    title="Sign in to post a job and receive competitive quotes"
                  >
                    <span>Post a Job</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Controls (< 1024px) */}
            <div className="flex items-center space-x-2 lg:hidden">
              <ThemeToggle />
              <button
                ref={hamburgerButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-[var(--radius-sm)] text-[var(--text)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] transition-colors cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Mobile Slide-in Drawer Navigation (< 1024px) */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          <div
            ref={mobileDrawerRef}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[var(--surface)] shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-[var(--line)] animate-in slide-in-from-right duration-200"
          >
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
                <span className="font-bold text-lg text-[var(--text)]">
                  Trade<span className="text-[var(--accent)]">Connect</span>
                </span>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="p-2 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--line)] cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Role-Aware Action Buttons at Top of Drawer */}
              <div className="mt-4 p-3 rounded-[var(--radius)] bg-[var(--bg-alt)] border border-[var(--line-subtle)] space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Quick Access
                </div>
                {user?.role === "CUSTOMER" && (
                  <Link
                    href="/quote"
                    onClick={closeMobileMenu}
                    className="w-full py-2.5 rounded-[var(--radius-sm)] text-center font-bold text-xs text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors shadow-xs block"
                  >
                    Post a Job (Homeowners)
                  </Link>
                )}
                {user?.role === "PRO" && (
                  <Link
                    href="/dashboard/pro"
                    onClick={closeMobileMenu}
                    className="w-full py-2.5 rounded-[var(--radius-sm)] text-center font-bold text-xs border border-[var(--line)] text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Find Jobs (Trades Dashboard)</span>
                  </Link>
                )}
                {!user && (
                  <div className="space-y-2">
                    <Link
                      href="/auth/login?redirect=/quote"
                      onClick={closeMobileMenu}
                      className="w-full py-2.5 rounded-[var(--radius-sm)] text-center font-bold text-xs text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors shadow-xs block"
                    >
                      Post a Job (Sign In to Post)
                    </Link>
                    <Link
                      href="/for-pros"
                      onClick={closeMobileMenu}
                      className="w-full py-2.5 rounded-[var(--radius-sm)] text-center font-bold text-xs border border-[var(--line)] text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] transition-colors block"
                    >
                      Join as a Trade Pro
                    </Link>
                  </div>
                )}
              </div>

              {/* Drawer Navigation Links */}
              <nav className="mt-5 flex flex-col space-y-1">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="px-3 py-2 rounded-[var(--radius-sm)] text-xs font-semibold text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors"
                >
                  Home
                </Link>

                {/* Mobile Country Switcher */}
                <div className="pt-2 pb-1">
                  <div className="flex items-center justify-between p-2 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)]">
                    <span className="text-[11px] font-bold text-[var(--text-muted)]">Active Market:</span>
                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        onClick={() => {
                          handleCountrySwitch("UK");
                          closeMobileMenu();
                        }}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-xs font-bold transition-all cursor-pointer ${
                          country === "UK"
                            ? "bg-[var(--brand)] text-white shadow-xs"
                            : "bg-[var(--surface)] text-[var(--text)] border border-[var(--line)]"
                        }`}
                      >
                        <UkFlagIcon className="w-3.5 h-2.5 rounded-[1px]" />
                        <span>UK (45%)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleCountrySwitch("US");
                          closeMobileMenu();
                        }}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-xs font-bold transition-all cursor-pointer ${
                          country === "US"
                            ? "bg-[var(--accent)] text-white shadow-xs"
                            : "bg-[var(--surface)] text-[var(--text)] border border-[var(--line)]"
                        }`}
                      >
                        <UsFlagIcon className="w-3.5 h-2.5 rounded-[1px]" />
                        <span>USA</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expandable Services */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-[var(--radius-sm)] text-xs font-semibold text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors cursor-pointer"
                    aria-expanded={mobileServicesOpen}
                  >
                    <span>Trade Categories ({country})</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${
                        mobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-[var(--bg-alt)] rounded-[var(--radius-sm)] my-1 border border-[var(--line-subtle)]">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/${country.toLowerCase()}/${cat.slug}`}
                          onClick={closeMobileMenu}
                          className="block px-2.5 py-1.5 rounded-[4px] text-xs font-medium text-[var(--text)] hover:text-[var(--accent)]"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/pros"
                  onClick={closeMobileMenu}
                  className="px-3 py-2 rounded-[var(--radius-sm)] text-xs font-semibold text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors"
                >
                  Verified Directory
                </Link>
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className="px-3 py-2 rounded-[var(--radius-sm)] text-xs font-semibold text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors"
                >
                  Our Standards
                </Link>
                <Link
                  href={user?.role === "PRO" ? "/dashboard/pro" : "/dashboard/homeowner"}
                  onClick={closeMobileMenu}
                  className="px-3 py-2 rounded-[var(--radius-sm)] text-xs font-semibold text-[var(--accent)] hover:bg-[var(--bg-alt)] transition-colors"
                >
                  My Workspace Dashboard
                </Link>
              </nav>
            </div>

            {/* Drawer Bottom */}
            <div className="pt-4 border-t border-[var(--line)] space-y-2">
              {user ? (
                <div className="space-y-2">
                  <div className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line-subtle)] flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-[var(--brand)] text-[var(--bg-deep-text)] font-bold text-xs flex items-center justify-center">
                      {user.avatar || "U"}
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-xs text-[var(--text)] truncate">{user.name}</div>
                      <div className="text-[10px] text-[var(--text-muted)] truncate">{user.email}</div>
                    </div>
                  </div>
                  <Link
                    href={user.role === "PRO" ? "/dashboard/pro" : "/dashboard/homeowner"}
                    onClick={closeMobileMenu}
                    className="w-full py-2.5 rounded-[var(--radius-sm)] text-center text-xs font-bold bg-[var(--surface)] border border-[var(--line)] text-[var(--text)] block"
                  >
                    Open My Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="w-full py-2 rounded-[var(--radius-sm)] text-center text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors block cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={closeMobileMenu}
                  className="w-full py-2.5 rounded-[var(--radius-sm)] text-center text-xs font-semibold border border-[var(--line)] text-[var(--text)] hover:bg-[var(--bg-alt)] block"
                >
                  Sign In to Account
                </Link>
              )}
              <div className="text-[11px] text-[var(--text-muted)] text-center pt-1">
                Emergency Dispatch: 0800 123 4567
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
