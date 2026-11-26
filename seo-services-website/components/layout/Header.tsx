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
    href: "/services/seo-content-writing",
  },
  {
    label: "All services",
    href: "/services",
  },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeFlyout, setActiveFlyout] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setActiveFlyout(null);
    setMobileServicesOpen(false);
  }, [pathname]);

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
    <header className="sticky top-0 z-50 w-full bg-[#020817] border-b border-sky-500/20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center flex-shrink-0"
          >
            <div className="relative h-8 w-36 sm:w-44">
              <Image
                src="/brand/israin-wordmark-1024x244.webp"
                alt="Israin Solutions"
                fill
                sizes="(max-width: 640px) 144px, 176px"
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className={cn(
                "text-xs font-semibold uppercase tracking-wider transition-colors",
                pathname === "/" ? "text-[#1FA9E0]" : "text-white/90 hover:text-[#1FA9E0]"
              )}
            >
              Home
            </Link>

            {/* Desktop Services Dropdown */}
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
                  "flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer",
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

              {/* Flyout Menu */}
              <div
                className={cn(
                  "absolute top-full left-0 w-[240px] pt-2 transition-all duration-150 z-50",
                  servicesOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                )}
              >
                <div className="bg-[#030d26] border border-sky-400/35 rounded-xl py-1.5 shadow-2xl">
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

                        {/* Nested Submenu */}
                        {hasSub && isFlyoutOpen && (
                          <div
                            className="absolute left-[99%] -top-1.5 w-[230px] pl-1.5 z-50"
                            onMouseEnter={() => setActiveFlyout(item.label)}
                          >
                            <div className="bg-[#030d26] border border-sky-400/35 rounded-xl py-1.5 shadow-2xl">
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

            <Link
              href="/guest-post-sites"
              className={cn(
                "text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap",
                pathname === "/guest-post-sites"
                  ? "text-[#1FA9E0]"
                  : "text-white/90 hover:text-[#1FA9E0]"
              )}
            >
              Guest Post Sites
            </Link>

            <Link
              href="/link-insertion-sites"
              className={cn(
                "text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap",
                pathname === "/link-insertion-sites"
                  ? "text-[#1FA9E0]"
                  : "text-white/90 hover:text-[#1FA9E0]"
              )}
            >
              Link Insertion Sites
            </Link>

            <Link
              href="/contact"
              className={cn(
                "text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap",
                pathname === "/contact" || pathname === "/contact-us"
                  ? "text-[#1FA9E0]"
                  : "text-white/90 hover:text-[#1FA9E0]"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action & Hamburger */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/order"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#1FA9E0] bg-[#1FA9E0]/15 hover:bg-[#1FA9E0] hover:text-slate-950 text-xs font-bold text-white transition-all"
            >
              <span>Order links</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 text-white hover:text-[#1FA9E0] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Pure, Simple, Normal Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-sky-500/20 bg-[#020817] px-5 py-4 max-h-[calc(100vh-64px)] overflow-y-auto">
          <nav className="flex flex-col text-sm divide-y divide-white/10">
            {/* 1. Home */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "py-3 font-medium transition-colors",
                pathname === "/" ? "text-[#1FA9E0]" : "text-white hover:text-[#1FA9E0]"
              )}
            >
              Home
            </Link>

            {/* 2. Services Dropdown Toggle */}
            <div className="py-2">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full py-1.5 flex items-center justify-between font-medium text-white hover:text-[#1FA9E0] transition-colors cursor-pointer"
              >
                <span className={cn(isServicesActive && "text-[#1FA9E0]")}>Services</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-sky-400 transition-transform duration-200",
                    mobileServicesOpen ? "rotate-180" : ""
                  )}
                />
              </button>

              {/* Services Sub-links */}
              {mobileServicesOpen && (
                <div className="pl-3 pt-2 pb-1 space-y-2.5 text-xs text-slate-300">
                  <Link
                    href="/services/niche-guest-posts"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-[#1FA9E0] transition-colors"
                  >
                    Niche guest posts
                  </Link>
                  <Link
                    href="/services/general-guest-posts"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-[#1FA9E0] transition-colors"
                  >
                    General guest posts
                  </Link>
                  <Link
                    href="/services/niche-edits"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-[#1FA9E0] transition-colors"
                  >
                    Niche edits
                  </Link>
                  <Link
                    href="/services/casino-igaming-guest-posts"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-[#1FA9E0] transition-colors"
                  >
                    Casino / iGaming guest posts
                  </Link>
                  <Link
                    href="/services/off-page-seo-packages"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-[#1FA9E0] transition-colors"
                  >
                    Off-page SEO packages
                  </Link>
                  <Link
                    href="/services/niche-blog-comments"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-[#1FA9E0] transition-colors"
                  >
                    Niche blog comments
                  </Link>
                  <Link
                    href="/services/pbn-links"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-[#1FA9E0] transition-colors"
                  >
                    Aged PBN links
                  </Link>
                  <Link
                    href="/services/wikipedia-links"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-[#1FA9E0] transition-colors"
                  >
                    Wikipedia links
                  </Link>
                  <Link
                    href="/services/press-releases"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-[#1FA9E0] transition-colors"
                  >
                    Press releases
                  </Link>
                  <Link
                    href="/services/seo-content-writing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block hover:text-[#1FA9E0] transition-colors"
                  >
                    SEO content writing
                  </Link>
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block pt-1 text-[#1FA9E0] font-semibold hover:underline"
                  >
                    View all services →
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Guest Post Sites */}
            <Link
              href="/guest-post-sites"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "py-3 font-medium transition-colors",
                pathname === "/guest-post-sites" ? "text-[#1FA9E0]" : "text-white hover:text-[#1FA9E0]"
              )}
            >
              Guest Post Sites
            </Link>

            {/* 4. Link Insertion Sites */}
            <Link
              href="/link-insertion-sites"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "py-3 font-medium transition-colors",
                pathname === "/link-insertion-sites" ? "text-[#1FA9E0]" : "text-white hover:text-[#1FA9E0]"
              )}
            >
              Link Insertion Sites
            </Link>

            {/* 5. Contact */}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "py-3 font-medium transition-colors",
                pathname === "/contact" || pathname === "/contact-us"
                  ? "text-[#1FA9E0]"
                  : "text-white hover:text-[#1FA9E0]"
              )}
            >
              Contact
            </Link>

            {/* Order Links CTA */}
            <div className="pt-4 pb-2">
              <Link
                href="/order"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-lg bg-[#1FA9E0] hover:bg-[#34bbf0] text-slate-950 font-bold text-xs uppercase tracking-wider text-center block transition-all"
              >
                Order links now →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
