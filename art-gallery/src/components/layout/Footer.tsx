"use client";

import React from "react";
import Link from "next/link";
import { Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { EyeToWordmark } from "@/components/branding/EyeToWordmark";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);

  return (
    <footer className="popart-footer w-full bg-[var(--background)] text-[var(--foreground)] pt-16 sm:pt-24 pb-12 sm:pb-16 border-t border-[var(--border)]">
      <div className="container-popart">
        {/* Upper Navigation & Metadata Region */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-16 sm:mb-24 text-xs sm:text-sm font-normal tracking-[0.2em] uppercase">
          {/* Main Navigation */}
          <ul className="space-y-3">
            <li>
              <Link
                href={`/${locale}/work`}
                className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                {dict.footer.work}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/products`}
                className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                {dict.footer.products}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/about`}
                className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                {dict.footer.about}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/contact`}
                className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                {dict.footer.contact}
              </Link>
            </li>
          </ul>

          {/* Legal Pages */}
          <ul className="space-y-3">
            <li>
              <Link
                href={`/${locale}/privacy`}
                className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/cookies`}
                className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {dict.footer.cookies}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/terms`}
                className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {dict.footer.terms}
              </Link>
            </li>
          </ul>

          {/* Copyright Metadata */}
          <div className="col-span-2 md:col-span-1 text-left md:text-right text-[var(--muted)] tracking-widest">
            <p>© 2026 PopArt Agency</p>
            <p className="text-[11px] text-[var(--subtle)] mt-1 normal-case tracking-normal">
              Studio Créatif — Paris
            </p>
          </div>
        </div>

        {/* Center: Interactive Abstract Eye to Brand Wordmark Animation */}
        <div className="w-full flex flex-col items-center justify-center my-12 sm:my-20">
          <EyeToWordmark ariaLabel={dict.footer.symbolAria} />
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--subtle)] mt-4 select-none">
            {locale === "fr" ? "Survoler ou toucher pour révéler" : "Hover or tap to reveal"}
          </p>
        </div>

        {/* Bottom Byline */}
        <div className="w-full pt-10 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--subtle)] tracking-[0.18em] uppercase gap-4">
          <p>{dict.footer.byline}</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Behance
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
