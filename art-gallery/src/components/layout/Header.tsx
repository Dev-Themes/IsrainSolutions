"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/branding/BrandLogo";
import { Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const pathname = usePathname() || "";
  const dict = getDictionary(locale);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track window scroll for fixed header transitions
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change or escape
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Determine active route
  const isWorkActive =
    (pathname === `/${locale}` || pathname === `/${locale}/work` || pathname.startsWith(`/${locale}/work/`)) &&
    !pathname.startsWith(`/${locale}/products`);
  const isProductsActive = pathname.startsWith(`/${locale}/products`);
  const isAboutActive = pathname.startsWith(`/${locale}/about`);
  const isContactActive = pathname.startsWith(`/${locale}/contact`);

  // Switch locale link
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";
  const switchLocaleHref = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  return (
    <header
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
      className={`w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#050505]/95 backdrop-blur-lg border-b border-[#333333] shadow-lg shadow-black/50 py-2.5 sm:py-3"
          : "bg-[#050505]/85 backdrop-blur-md border-b border-[#292929]/40 py-4 sm:py-5"
      }`}
    >
      <div className="container-forme flex items-center justify-between transition-all duration-300">
        {/* Left: Brand Logo */}
        <BrandLogo locale={locale} />

        {/* Desktop Navigation Links with Artistic Multicolor Underlines */}
        <nav
          className="hidden md:flex items-center space-x-6 lg:space-x-10 text-xs uppercase tracking-[0.2em] font-medium"
          aria-label={dict.nav.menuAria}
        >
          {/* WORK — Electric Coral Accent (#FF665C) */}
          <Link
            href={`/${locale}`}
            className={`group relative py-1.5 transition-colors duration-200 ${
              isWorkActive ? "text-[#FFFFFF]" : "text-[#B8B8B8] hover:text-[#FFFFFF]"
            }`}
          >
            <span>{dict.nav.work}</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#FF665C] transition-all duration-300 ease-out ${
                isWorkActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          {/* PRODUCTS — Mint Green Accent (#78E6BF) */}
          <Link
            href={`/${locale}/products`}
            className={`group relative py-1.5 transition-colors duration-200 ${
              isProductsActive ? "text-[#FFFFFF]" : "text-[#B8B8B8] hover:text-[#FFFFFF]"
            }`}
          >
            <span>{dict.nav.products}</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#78E6BF] transition-all duration-300 ease-out ${
                isProductsActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          {/* ABOUT / STUDIO — Vibrant Yellow Accent (#F7D85B) */}
          <Link
            href={`/${locale}/about`}
            className={`group relative py-1.5 transition-colors duration-200 ${
              isAboutActive ? "text-[#FFFFFF]" : "text-[#B8B8B8] hover:text-[#FFFFFF]"
            }`}
          >
            <span>{dict.nav.about}</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#F7D85B] transition-all duration-300 ease-out ${
                isAboutActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          {/* CONTACT — Electric Blue Accent (#6298FF) */}
          <Link
            href={`/${locale}/contact`}
            className={`group relative py-1.5 transition-colors duration-200 ${
              isContactActive ? "text-[#FFFFFF]" : "text-[#B8B8B8] hover:text-[#FFFFFF]"
            }`}
          >
            <span>{dict.nav.contact}</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#6298FF] transition-all duration-300 ease-out ${
                isContactActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          {/* Language Switcher — Mint Green Accent (#78E6BF) */}
          <Link
            href={switchLocaleHref}
            className="text-[11px] font-mono text-[#B8B8B8] hover:text-[#78E6BF] hover:border-[#78E6BF] transition-colors border border-[#424242] px-2.5 py-1 rounded-xs"
            aria-label={dict.nav.langSwitchAria}
          >
            {otherLocale.toUpperCase()}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Quick Language switch on mobile header */}
          <Link
            href={switchLocaleHref}
            className="text-[11px] font-mono text-[#B8B8B8] border border-[#424242] hover:text-[#78E6BF] hover:border-[#78E6BF] px-2 py-0.5 rounded-xs transition-colors"
            aria-label={dict.nav.langSwitchAria}
          >
            {otherLocale.toUpperCase()}
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#FFFFFF] hover:text-[#FF665C] focus-visible:ring-1 focus-visible:ring-[#FF665C] transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-[#050505] border-b border-[#333333] shadow-2xl"
          >
            <div className="container-forme py-6 flex flex-col space-y-4 text-xs tracking-[0.25em] uppercase font-light">
              <Link
                href={`/${locale}`}
                className={`py-2.5 flex items-center justify-between border-b border-[#1f1f1f] transition-colors ${
                  isWorkActive ? "text-[#FF665C] font-medium" : "text-[#B8B8B8] hover:text-[#FF665C]"
                }`}
              >
                <span>{dict.nav.work}</span>
                {isWorkActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF665C]" />}
              </Link>
              <Link
                href={`/${locale}/products`}
                className={`py-2.5 flex items-center justify-between border-b border-[#1f1f1f] transition-colors ${
                  isProductsActive ? "text-[#78E6BF] font-medium" : "text-[#B8B8B8] hover:text-[#78E6BF]"
                }`}
              >
                <span>{dict.nav.products}</span>
                {isProductsActive && <span className="w-1.5 h-1.5 rounded-full bg-[#78E6BF]" />}
              </Link>
              <Link
                href={`/${locale}/about`}
                className={`py-2.5 flex items-center justify-between border-b border-[#1f1f1f] transition-colors ${
                  isAboutActive ? "text-[#F7D85B] font-medium" : "text-[#B8B8B8] hover:text-[#F7D85B]"
                }`}
              >
                <span>{dict.nav.about}</span>
                {isAboutActive && <span className="w-1.5 h-1.5 rounded-full bg-[#F7D85B]" />}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className={`py-2.5 flex items-center justify-between border-b border-[#1f1f1f] transition-colors ${
                  isContactActive ? "text-[#6298FF] font-medium" : "text-[#B8B8B8] hover:text-[#6298FF]"
                }`}
              >
                <span>{dict.nav.contact}</span>
                {isContactActive && <span className="w-1.5 h-1.5 rounded-full bg-[#6298FF]" />}
              </Link>

              <div className="pt-3 border-t border-[#292929] flex items-center justify-between">
                <span className="text-[11px] text-[#B8B8B8] tracking-widest font-mono">LANGUE / LANGUAGE</span>
                <Link
                  href={switchLocaleHref}
                  className="text-xs font-mono text-[#78E6BF] border border-[#78E6BF]/60 px-3 py-1 rounded-xs"
                >
                  {otherLocale.toUpperCase()}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
