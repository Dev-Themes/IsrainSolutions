"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  MessageSquare,
  Send,
  Mail,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

interface SubMenuItem {
  label: string;
  href: string;
}

interface NavServiceItem {
  label: string;
  href: string;
  subItems?: SubMenuItem[];
}

const serviceMenuItems: NavServiceItem[] = [
  {
    label: "Guest Post & Niche Edit",
    href: "/services/niche-guest-posts",
    subItems: [
      { label: "Niche guest posts", href: "/services/niche-guest-posts" },
      { label: "General guest posts", href: "/services/general-guest-posts" },
      { label: "Niche edits", href: "/services/niche-edits" },
      { label: "Casino/iGaming guest posts", href: "/services/casino-igaming-guest-posts" },
    ],
  },
  {
    label: "Off-page SEO packages",
    href: "/services/off-page-seo-packages",
  },
  {
    label: "Niche blog comments",
    href: "/services/niche-blog-comments",
  },
  {
    label: "PBN links",
    href: "/services/pbn-links",
    subItems: [
      { label: "High DR/DA PBN backlinks", href: "/pbn/high-dr-da-backlinks" },
      { label: "Sidebar/Blogroll PBN backlinks", href: "/pbn/sidebar-blogroll-backlinks" },
      { label: "iGaming/Casino PBN backlinks", href: "/pbn/casino-igaming-backlinks" },
    ],
  },
  {
    label: "Wikipedia links",
    href: "/services/wikipedia-links",
  },
  {
    label: "Press releases",
    href: "/services/press-releases",
  },
  {
    label: "SEO content writing",
    href: "/services/seo-content-writing",
  },
  {
    label: "All services",
    href: "/services",
  },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeFlyout, setActiveFlyout] = useState<string | null>(null);

  // Mobile drawer accordions
  const [mobileGuestOpen, setMobileGuestOpen] = useState(true); // Open by default for easier mobile discovery
  const [mobilePbnOpen, setMobilePbnOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Track scroll position for subtle header background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setActiveFlyout(null);
  }, [pathname]);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeMobileMenu();
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mobileMenuOpen, closeMobileMenu]);

  const isServicesActive =
    pathname.startsWith("/services") ||
    pathname.startsWith("/pbn") ||
    pathname === "/niche-guest-post" ||
    pathname === "/general-guest-post" ||
    pathname === "/niche-edit" ||
    pathname === "/casino-guest-posts" ||
    pathname === "/off-page-seo-backlinks-service" ||
    pathname === "/niche-blog-comments" ||
    pathname === "/wikipedia-links" ||
    pathname === "/press-release" ||
    pathname === "/seo-content-writing-services";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200 border-b",
          // CRITICAL: When mobile menu is open, DO NOT apply backdrop-filter on header
          // because backdrop-filter establishes a containing block that traps and clips fixed children!
          mobileMenuOpen
            ? "bg-[#020817] border-sky-500/25"
            : isScrolled
            ? "bg-[#020817]/95 backdrop-blur-md py-2.5 border-sky-500/25 shadow-[0_8px_30px_rgba(2,8,23,0.9),0_0_15px_rgba(56,189,248,0.1)]"
            : "bg-[#020817]/90 backdrop-blur-sm py-3 sm:py-3.5 border-sky-500/20"
        )}
      >
        <div className="max-w-[1280px] mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Brand Wordmark Logo */}
            <Link
              href="/"
              onClick={() => {
                if (mobileMenuOpen) closeMobileMenu();
              }}
              className="flex items-center flex-shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA9E0] rounded"
            >
              <div className="relative h-7 sm:h-9 w-36 sm:w-44 flex-shrink-0">
                <Image
                  src="/brand/israin-wordmark-1024x244.webp"
                  alt="Israin Solutions"
                  fill
                  sizes="(max-width: 640px) 144px, 176px"
                  priority
                  className="object-contain object-left transition-transform group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Desktop Navigation (>= lg) */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-1.5 xl:gap-3"
            >
              {/* 1. Home */}
              <Link
                href="/"
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap",
                  pathname === "/" ? "text-[#1FA9E0]" : "text-white/90 hover:text-[#1FA9E0]"
                )}
              >
                Home
              </Link>

              {/* 2. Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => {
                  setServicesOpen(false);
                  setActiveFlyout(null);
                }}
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-expanded={servicesOpen}
                  className={cn(
                    "flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer",
                    isServicesActive ? "text-[#1FA9E0]" : "text-white/90 hover:text-[#1FA9E0]"
                  )}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      servicesOpen ? "rotate-180 text-[#1FA9E0]" : ""
                    )}
                  />
                </button>

                {/* Dropdown Container */}
                <div
                  className={cn(
                    "absolute top-full left-0 w-[240px] pt-2 transition-all duration-150 z-50",
                    servicesOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  )}
                >
                  <div className="bg-[#030d26]/98 border border-sky-400/35 rounded-xl py-1.5 shadow-[0_20px_50px_rgba(2,8,23,0.95),0_0_25px_rgba(56,189,248,0.15)] backdrop-blur-xl">
                    {serviceMenuItems.map((item) => {
                      const hasSub = !!item.subItems && item.subItems.length > 0;
                      const isFlyoutOpen = activeFlyout === item.label;

                      return (
                        <div
                          key={item.label}
                          className="relative"
                          onMouseEnter={() => {
                            if (hasSub) setActiveFlyout(item.label);
                            else setActiveFlyout(null);
                          }}
                        >
                          {hasSub ? (
                            <div
                              className={cn(
                                "flex items-center justify-between px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer select-none",
                                isFlyoutOpen
                                  ? "text-sky-300 bg-sky-500/15"
                                  : "text-slate-200 hover:text-white hover:bg-sky-500/10"
                              )}
                            >
                              <span>{item.label}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className={cn(
                                "block px-3.5 py-2 text-xs font-semibold transition-colors",
                                pathname === item.href
                                  ? "text-[#1FA9E0] bg-sky-500/15"
                                  : "text-slate-200 hover:text-white hover:bg-sky-500/10"
                              )}
                            >
                              {item.label}
                            </Link>
                          )}

                          {/* Flyout Submenu to the right */}
                          {hasSub && isFlyoutOpen && (
                            <div
                              className="absolute left-[99%] -top-1.5 w-[230px] pl-1.5 z-50 animate-in fade-in-50 duration-150"
                              onMouseEnter={() => setActiveFlyout(item.label)}
                            >
                              <div className="bg-[#030d26]/98 border border-sky-400/35 rounded-xl py-1.5 shadow-[0_20px_50px_rgba(2,8,23,0.95),0_0_25px_rgba(56,189,248,0.15)] backdrop-blur-xl">
                                {item.subItems?.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    className={cn(
                                      "block px-3.5 py-2 text-xs font-semibold transition-colors",
                                      pathname === sub.href
                                        ? "text-[#1FA9E0] bg-sky-500/15"
                                        : "text-slate-200 hover:text-white hover:bg-sky-500/10"
                                    )}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3. Guest Post Sites */}
              <Link
                href="/guest-post-sites"
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap",
                  pathname === "/guest-post-sites"
                    ? "text-[#1FA9E0]"
                    : "text-white/90 hover:text-[#1FA9E0]"
                )}
              >
                Guest Post Sites
              </Link>

              {/* 4. Link Insertion Sites */}
              <Link
                href="/link-insertion-sites"
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap",
                  pathname === "/link-insertion-sites"
                    ? "text-[#1FA9E0]"
                    : "text-white/90 hover:text-[#1FA9E0]"
                )}
              >
                Link Insertion Sites
              </Link>

              {/* 5. Contact */}
              <Link
                href="/contact"
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap",
                  pathname === "/contact" || pathname === "/contact-us"
                    ? "text-[#1FA9E0]"
                    : "text-white/90 hover:text-[#1FA9E0]"
                )}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action & Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Link
                href="/order"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg border border-[#1FA9E0]/60 bg-gradient-to-r from-[#1FA9E0]/15 to-[#38bdf8]/15 hover:from-[#1FA9E0] hover:to-[#38bdf8] text-xs font-bold text-white hover:text-slate-950 transition-all duration-200 shadow-[0_0_15px_rgba(31,169,224,0.18)] active:scale-95 whitespace-nowrap"
              >
                <span>Order links</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile / Tablet Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                className={cn(
                  "lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1FA9E0]",
                  mobileMenuOpen
                    ? "bg-[#1FA9E0] text-slate-950 border-[#1FA9E0] shadow-[0_0_15px_rgba(31,169,224,0.4)]"
                    : "bg-[#06173d]/80 text-white border-sky-500/30 hover:border-sky-400 hover:text-[#1FA9E0]"
                )}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-current stroke-[2.5]" />
                ) : (
                  <Menu className="w-5 h-5 text-current stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN RESPONSIVE MOBILE NAVIGATION DRAWER */}
      {/* Positioned at fixed inset-0 with z-[100] outside any backdrop-blur containing block */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="lg:hidden fixed inset-0 z-[100] bg-[#020817] flex flex-col h-[100dvh] w-screen overflow-hidden animate-in fade-in duration-200"
        >
          {/* Mobile Drawer Top Bar with Brand & Close Button */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-sky-500/25 bg-[#010615] flex-shrink-0">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="flex items-center"
            >
              <div className="relative h-7 w-36">
                <Image
                  src="/brand/israin-wordmark-1024x244.webp"
                  alt="Israin Solutions"
                  fill
                  sizes="144px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#06173d] border border-sky-400/40 text-sky-200 hover:text-white hover:bg-sky-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Navigation Body */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 overscroll-contain">
            {/* Quick Navigation 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={cn(
                  "p-3 rounded-xl border text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center",
                  pathname === "/"
                    ? "bg-[#1FA9E0] text-slate-950 border-[#1FA9E0] shadow-[0_0_15px_rgba(31,169,224,0.3)]"
                    : "border-sky-500/20 bg-[#06173d]/70 text-white hover:border-sky-400"
                )}
              >
                Home
              </Link>
              <Link
                href="/services"
                onClick={closeMobileMenu}
                className={cn(
                  "p-3 rounded-xl border text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center",
                  pathname === "/services"
                    ? "bg-[#1FA9E0] text-slate-950 border-[#1FA9E0] shadow-[0_0_15px_rgba(31,169,224,0.3)]"
                    : "border-sky-500/20 bg-[#06173d]/70 text-white hover:border-sky-400"
                )}
              >
                All Services
              </Link>
              <Link
                href="/guest-post-sites"
                onClick={closeMobileMenu}
                className={cn(
                  "p-3 rounded-xl border text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center",
                  pathname === "/guest-post-sites"
                    ? "bg-[#1FA9E0] text-slate-950 border-[#1FA9E0] shadow-[0_0_15px_rgba(31,169,224,0.3)]"
                    : "border-sky-500/20 bg-[#06173d]/70 text-white hover:border-sky-400"
                )}
              >
                Guest Post Sites
              </Link>
              <Link
                href="/link-insertion-sites"
                onClick={closeMobileMenu}
                className={cn(
                  "p-3 rounded-xl border text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center",
                  pathname === "/link-insertion-sites"
                    ? "bg-[#1FA9E0] text-slate-950 border-[#1FA9E0] shadow-[0_0_15px_rgba(31,169,224,0.3)]"
                    : "border-sky-500/20 bg-[#06173d]/70 text-white hover:border-sky-400"
                )}
              >
                Link Insertions
              </Link>
            </div>

            {/* Services Detailed List */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between px-1 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#1FA9E0] font-mono">
                  Link Building Services
                </span>
                <span className="text-[10px] text-slate-400">Tap to browse</span>
              </div>

              {/* Accordion 1: Guest Post & Niche Edit */}
              <div className="rounded-xl bg-[#03000B] border border-sky-500/25 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileGuestOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-white hover:bg-sky-500/10 text-left transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0]" />
                    <span>Guest Post &amp; Niche Edit</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-sky-400 transition-transform duration-200",
                      mobileGuestOpen ? "rotate-180" : ""
                    )}
                  />
                </button>
                {mobileGuestOpen && (
                  <div className="bg-[#06173d]/50 px-3 py-2 space-y-1 border-t border-sky-500/20">
                    {serviceMenuItems[0].subItems?.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={closeMobileMenu}
                        className={cn(
                          "block py-2 px-3 text-xs rounded-lg transition-colors",
                          pathname === sub.href
                            ? "bg-[#1FA9E0]/20 text-[#1FA9E0] font-bold"
                            : "text-slate-300 hover:text-white hover:bg-sky-500/10"
                        )}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct Link: Off-page SEO packages */}
              <Link
                href="/services/off-page-seo-packages"
                onClick={closeMobileMenu}
                className={cn(
                  "block p-3.5 rounded-xl border text-xs font-semibold transition-all",
                  pathname === "/services/off-page-seo-packages"
                    ? "bg-[#1FA9E0]/15 text-[#1FA9E0] border-[#1FA9E0]"
                    : "bg-[#03000B] border-sky-500/25 text-white hover:border-sky-400"
                )}
              >
                Off-page SEO packages (Tier 1 &amp; Tier 2)
              </Link>

              {/* Direct Link: Niche blog comments */}
              <Link
                href="/services/niche-blog-comments"
                onClick={closeMobileMenu}
                className={cn(
                  "block p-3.5 rounded-xl border text-xs font-semibold transition-all",
                  pathname === "/services/niche-blog-comments"
                    ? "bg-[#1FA9E0]/15 text-[#1FA9E0] border-[#1FA9E0]"
                    : "bg-[#03000B] border-sky-500/25 text-white hover:border-sky-400"
                )}
              >
                Niche blog comments (DA 30+)
              </Link>

              {/* Accordion 2: PBN links Group */}
              <div className="rounded-xl bg-[#03000B] border border-sky-500/25 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobilePbnOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-white hover:bg-sky-500/10 text-left transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Aged PBN Backlinks</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-sky-400 transition-transform duration-200",
                      mobilePbnOpen ? "rotate-180" : ""
                    )}
                  />
                </button>
                {mobilePbnOpen && (
                  <div className="bg-[#06173d]/50 px-3 py-2 space-y-1 border-t border-sky-500/20">
                    {serviceMenuItems[3].subItems?.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={closeMobileMenu}
                        className={cn(
                          "block py-2 px-3 text-xs rounded-lg transition-colors",
                          pathname === sub.href
                            ? "bg-[#1FA9E0]/20 text-[#1FA9E0] font-bold"
                            : "text-slate-300 hover:text-white hover:bg-sky-500/10"
                        )}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct Link: Wikipedia links */}
              <Link
                href="/services/wikipedia-links"
                onClick={closeMobileMenu}
                className={cn(
                  "block p-3.5 rounded-xl border text-xs font-semibold transition-all",
                  pathname === "/services/wikipedia-links"
                    ? "bg-[#1FA9E0]/15 text-[#1FA9E0] border-[#1FA9E0]"
                    : "bg-[#03000B] border-sky-500/25 text-white hover:border-sky-400"
                )}
              >
                Wikipedia links
              </Link>

              {/* Direct Link: Press releases */}
              <Link
                href="/services/press-releases"
                onClick={closeMobileMenu}
                className={cn(
                  "block p-3.5 rounded-xl border text-xs font-semibold transition-all",
                  pathname === "/services/press-releases"
                    ? "bg-[#1FA9E0]/15 text-[#1FA9E0] border-[#1FA9E0]"
                    : "bg-[#03000B] border-sky-500/25 text-white hover:border-sky-400"
                )}
              >
                Press release distribution (100+ media)
              </Link>

              {/* Direct Link: SEO content writing */}
              <Link
                href="/services/seo-content-writing"
                onClick={closeMobileMenu}
                className={cn(
                  "block p-3.5 rounded-xl border text-xs font-semibold transition-all",
                  pathname === "/services/seo-content-writing"
                    ? "bg-[#1FA9E0]/15 text-[#1FA9E0] border-[#1FA9E0]"
                    : "bg-[#03000B] border-sky-500/25 text-white hover:border-sky-400"
                )}
              >
                SEO content writing
              </Link>
            </div>

            {/* Direct Contact Options */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-sky-400 block px-1 mb-2 font-mono">
                Direct Agency Help
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="p-3 rounded-xl bg-[#06173d] border border-sky-500/30 text-white font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Mail className="w-4 h-4 text-sky-400" />
                  <span>Contact Form</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Drawer Pinned Bottom Bar */}
          <div className="p-4 border-t border-sky-500/25 bg-[#010615] flex-shrink-0 space-y-2.5 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Link
              href="/order"
              onClick={closeMobileMenu}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] text-slate-950 font-black text-xs uppercase tracking-wider text-center block shadow-[0_0_20px_rgba(31,169,224,0.35)] active:scale-95"
            >
              Order links now →
            </Link>
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Israin Solutions • 24/7 Support</span>
              <a
                href={siteConfig.parentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:underline flex items-center gap-1"
              >
                <span>israinsols.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
