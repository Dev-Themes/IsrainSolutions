"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
    href: "/services/seo-content-writing-services",
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
  const [mobileGuestOpen, setMobileGuestOpen] = useState(false);
  const [mobilePbnOpen, setMobilePbnOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setActiveFlyout(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 border-b",
        isScrolled
          ? "bg-[#020817]/95 backdrop-blur-md py-2.5 border-sky-500/25 shadow-[0_8px_30px_rgba(2,8,23,0.9),0_0_15px_rgba(56,189,248,0.1)]"
          : "bg-[#020817]/90 backdrop-blur-sm py-3.5 border-sky-500/20"
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Lockup */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA9E0] rounded"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
              <Image
                src="/brand/israin-icon.png"
                alt="Israin Solutions"
                fill
                sizes="36px"
                priority
                className="object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-wider text-sm sm:text-base uppercase">
                ISRAIN SOLUTIONS
              </span>
              <span className="text-[10px] text-sky-300/80 tracking-wide font-normal">
                Developing Beyond Imagination
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
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
                  "flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors",
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

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/order"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-[#3B9DC4] text-xs font-bold text-white uppercase tracking-wider hover:bg-[#1FA9E0] hover:text-black hover:border-[#1FA9E0] transition-all duration-200 shadow-[0_0_15px_rgba(31,169,224,0.15)] active:scale-95"
            >
              <span>Order links</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Hamburger Button for Mobile / Tablet */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 text-white hover:text-[#1FA9E0] border border-sky-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1FA9E0]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Drawer for Tablet & Mobile (< lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[57px] bottom-0 bg-[#020817]/98 backdrop-blur-2xl border-t border-sky-500/25 z-50 overflow-y-auto px-5 py-5 flex flex-col justify-between">
          <nav className="flex flex-col gap-4">
            {/* Top Direct Links */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-sky-500/20">
              <Link
                href="/"
                className={cn(
                  "p-2.5 rounded-lg border text-xs font-bold uppercase tracking-wider text-center transition-colors",
                  pathname === "/"
                    ? "bg-[#092252] border-sky-400 text-sky-300"
                    : "border-sky-500/20 bg-[#06163b]/80 text-white"
                )}
              >
                Home
              </Link>
              <Link
                href="/services"
                className={cn(
                  "p-2.5 rounded-lg border text-xs font-bold uppercase tracking-wider text-center transition-colors",
                  pathname === "/services"
                    ? "bg-[#092252] border-sky-400 text-sky-300"
                    : "border-sky-500/20 bg-[#06163b]/80 text-white"
                )}
              >
                All Services
              </Link>
              <Link
                href="/guest-post-sites"
                className={cn(
                  "p-2.5 rounded-lg border text-xs font-bold uppercase tracking-wider text-center transition-colors",
                  pathname === "/guest-post-sites"
                    ? "bg-[#092252] border-sky-400 text-sky-300"
                    : "border-sky-500/20 bg-[#06163b]/80 text-white"
                )}
              >
                Guest Post Sites
              </Link>
              <Link
                href="/link-insertion-sites"
                className={cn(
                  "p-2.5 rounded-lg border text-xs font-bold uppercase tracking-wider text-center transition-colors",
                  pathname === "/link-insertion-sites"
                    ? "bg-[#092252] border-sky-400 text-sky-300"
                    : "border-sky-500/20 bg-[#06163b]/80 text-white"
                )}
              >
                Link Insertion Sites
              </Link>
            </div>

            {/* Services List */}
            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-sky-400 block px-2 mb-2">
                Services
              </span>

              {/* Guest Post & Niche Edit Group */}
              <div className="rounded-lg bg-[#06163b]/60 border border-sky-500/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileGuestOpen(!mobileGuestOpen)}
                  className="w-full flex items-center justify-between p-3 text-xs font-semibold text-white hover:bg-sky-500/10 text-left"
                >
                  <span>Guest Post &amp; Niche Edit</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-sky-400 transition-transform duration-200",
                      mobileGuestOpen ? "rotate-180" : ""
                    )}
                  />
                </button>
                {mobileGuestOpen && (
                  <div className="bg-[#030d26]/90 px-3 py-2 space-y-1.5 border-t border-sky-500/15">
                    {serviceMenuItems[0].subItems?.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block py-1.5 px-2 text-xs text-slate-300 hover:text-white rounded hover:bg-sky-500/10"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Off-page SEO packages */}
              <Link
                href="/services/off-page-seo-packages"
                className="block p-3 rounded-lg bg-[#06163b]/60 border border-sky-500/20 text-xs font-semibold text-white hover:bg-sky-500/10"
              >
                Off-page SEO packages
              </Link>

              {/* Niche blog comments */}
              <Link
                href="/services/niche-blog-comments"
                className="block p-3 rounded-lg bg-[#06163b]/60 border border-sky-500/20 text-xs font-semibold text-white hover:bg-sky-500/10"
              >
                Niche blog comments
              </Link>

              {/* PBN links Group */}
              <div className="rounded-lg bg-[#06163b]/60 border border-sky-500/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobilePbnOpen(!mobilePbnOpen)}
                  className="w-full flex items-center justify-between p-3 text-xs font-semibold text-white hover:bg-sky-500/10 text-left"
                >
                  <span>PBN links</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-sky-400 transition-transform duration-200",
                      mobilePbnOpen ? "rotate-180" : ""
                    )}
                  />
                </button>
                {mobilePbnOpen && (
                  <div className="bg-[#030d26]/90 px-3 py-2 space-y-1.5 border-t border-sky-500/15">
                    {serviceMenuItems[3].subItems?.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block py-1.5 px-2 text-xs text-slate-300 hover:text-white rounded hover:bg-sky-500/10"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Wikipedia links */}
              <Link
                href="/services/wikipedia-links"
                className="block p-3 rounded-lg bg-[#06163b]/60 border border-sky-500/20 text-xs font-semibold text-white hover:bg-sky-500/10"
              >
                Wikipedia links
              </Link>

              {/* Press releases */}
              <Link
                href="/services/press-releases"
                className="block p-3 rounded-lg bg-[#06163b]/60 border border-sky-500/20 text-xs font-semibold text-white hover:bg-sky-500/10"
              >
                Press releases
              </Link>

              {/* SEO content writing */}
              <Link
                href="/services/seo-content-writing-services"
                className="block p-3 rounded-lg bg-[#06163b]/60 border border-sky-500/20 text-xs font-semibold text-white hover:bg-sky-500/10"
              >
                SEO content writing
              </Link>

              {/* Contact direct link */}
              <Link
                href="/contact"
                className="block p-3 rounded-lg bg-[#06163b]/60 border border-sky-500/20 text-xs font-semibold text-white hover:bg-sky-500/10"
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* Drawer Footer CTA */}
          <div className="pt-5 mt-4 border-t border-sky-500/20 space-y-3">
            <Link
              href="/order"
              className="w-full text-center py-3 rounded-md bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] text-slate-950 font-black text-xs uppercase tracking-wider block shadow-lg shadow-sky-400/25 active:scale-95"
            >
              Order links now →
            </Link>
            <div className="text-center text-[11px] text-slate-400">
              <span className="text-white font-semibold">ISRAIN SOLUTIONS</span>
              <span className="block text-[10px] text-sky-300/80">Developing Beyond Imagination</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
