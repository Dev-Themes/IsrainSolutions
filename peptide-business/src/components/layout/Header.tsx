"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Send, FolderHeart, ShieldCheck, ChevronRight } from "lucide-react";
import { useDossier } from "@/lib/dossier-context";

// Primary Navigation Links
const NAV_LINKS = [
  { name: "Products", href: "/#products", num: "01" },
  { name: "Why Us", href: "/#why-choose-us", num: "02" },
  { name: "About", href: "/#about", num: "03" },
  { name: "Contact", href: "/#contact", num: "04" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const { totalItems, setIsDossierOpen } = useDossier();
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/REPLACE_WITH_ACTUAL_USERNAME";
  const telegramHandle = process.env.NEXT_PUBLIC_TELEGRAM_HANDLE || "@PeptideIngredientsLab";

  // Efficient scroll observer for sticky visual transitions
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 15);
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
          setScrollProgress(currentProgress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
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

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#101513]/95 backdrop-blur-md border-b border-[#354239] shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            : "bg-[#101513]/90 backdrop-blur-xs border-b border-[#354239]/70"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 gap-2 sm:gap-4">
            {/* Brand Monogram & Logo (Left) */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg shrink-0 min-w-0"
              aria-label="Peptide Lab Home"
            >
              <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#19211D] border border-accent/40 text-accent font-display font-bold text-xs sm:text-sm transition-transform duration-200 group-hover:scale-105 group-hover:border-accent shadow-sm shrink-0">
                PI
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-display font-medium text-sm sm:text-base lg:text-lg tracking-tight text-foreground leading-none truncate">
                  Peptide Lab
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-foreground-muted mt-1 font-medium hidden sm:block truncate">
                  Scientific Luxury
                </span>
              </div>
            </Link>

            {/* Primary Desktop Navigation: Displayed cleanly on lg (1024px+) screens */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold uppercase tracking-wider text-foreground-secondary"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-accent transition-colors duration-150 py-1.5 border-b-2 border-transparent hover:border-accent"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Action Controls: Responsive across 320px to large screens */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Inquiry Dossier Counter Button */}
              <button
                type="button"
                onClick={() => setIsDossierOpen(true)}
                className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all ${
                  totalItems > 0
                    ? "bg-accent/20 border-accent text-accent font-bold shadow-xs"
                    : "bg-[#19211D] border-[#354239] text-foreground-muted hover:text-foreground hover:bg-[#222C26]"
                }`}
                title="View your custom batch inquiry dossier"
                aria-label={`Open inquiry dossier with ${totalItems} items`}
              >
                <FolderHeart className="w-3.5 h-3.5 text-accent" />
                <span className="hidden md:inline font-mono">Dossier</span>
                <span
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                    totalItems > 0 ? "bg-accent text-white" : "bg-[#222C26] text-foreground-muted"
                  }`}
                >
                  {totalItems}
                </span>
              </button>

              {/* Distinct Telegram CTA Button: Compact on sm/md, full label on lg */}
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold uppercase tracking-wider text-white bg-accent hover:bg-accent-hover rounded-lg transition-all duration-150 shadow-sm hover:shadow-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0"
                aria-label="Contact our team on Telegram (opens in new window)"
              >
                <Send className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden xl:inline">Telegram Inquiry</span>
                <span className="xl:hidden">Telegram</span>
                <ArrowUpRight className="w-3 h-3 opacity-80 shrink-0" />
              </a>

              {/* Mobile / Tablet Menu Button (Visible on < 1024px) */}
              <button
                ref={toggleButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-foreground rounded-lg hover:bg-[#19211D] border border-[#354239] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-dialog"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Progress Indicator Bar */}
        <div
          className="h-[2px] bg-gradient-to-r from-accent/80 via-accent to-accent-hover transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
      </header>

      {/* Full-Screen Accessible Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          ref={menuRef}
          className="fixed inset-0 z-50 bg-[#101513]/98 backdrop-blur-2xl flex flex-col justify-between p-5 sm:p-8 lg:hidden animate-fade-in overflow-y-auto"
        >
          {/* Drawer Top Bar with Brand and Close Button */}
          <div className="flex items-center justify-between border-b border-[#354239] pb-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#19211D] border border-accent/40 text-accent font-display font-bold text-xs">
                PI
              </span>
              <span className="font-display font-medium text-base text-foreground">
                Peptide Lab
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-[#19211D] border border-[#354239] transition-colors"
              aria-label="Close mobile navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links with Numbering and Smooth Interaction */}
          <div className="flex flex-col space-y-2 py-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold mb-2 block">
              Menu Navigation
            </span>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-lg sm:text-xl font-display font-medium text-foreground py-3 border-b border-[#354239]/60 hover:text-accent hover:border-accent/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-foreground-muted group-hover:text-accent">
                    {link.num}
                  </span>
                  <span>{link.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-foreground-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>

          {/* Bottom Action Controls: Dossier & Telegram Direct Line */}
          <div className="pt-6 border-t border-[#354239] space-y-3.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsDossierOpen(true);
              }}
              className="w-full inline-flex items-center justify-between px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground bg-[#19211D] border border-[#354239] hover:bg-[#222C26] rounded-xl transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FolderHeart className="w-4 h-4 text-accent" />
                <span>Inquiry Dossier</span>
              </div>
              <span className="font-mono text-accent bg-[#222C26] px-2 py-0.5 rounded-full text-[11px] font-bold">
                {totalItems} Selected
              </span>
            </button>

            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-accent hover:bg-accent-hover rounded-xl transition-all shadow-md hover:shadow-accent/25"
            >
              <Send className="w-4 h-4" />
              <span>Contact Official Telegram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-90" />
            </a>

            <div className="flex items-center justify-between text-[11px] text-foreground-muted pt-2 font-mono">
              <span>Channel: {telegramHandle}</span>
              <span className="flex items-center gap-1 text-accent">
                <ShieldCheck className="w-3 h-3" />
                18+ Verified
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
