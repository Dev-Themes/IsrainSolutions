"use client";
import { ui } from "@/i18n/ui";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/portfolio";
import { defaultLocale } from "@/i18n/config";

interface BrandLogoProps { locale?: Locale; className?: string; showDescriptor?: boolean; }

export function BrandLogo({ locale = defaultLocale, className = "", showDescriptor = true }: BrandLogoProps) {
  return <Link href={`/${locale}`} className={`inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-80 ${className}`}
    aria-label={ui(locale, "PopArt Agency Studio Créatif — Accueil", "PopArt Agency Creative Studio — Home")}>
    <Image src="/brand/final-lockup.png" alt="PopArt Agency" width={1060} height={414} sizes="(max-width: 640px) 145px, 190px" className="h-auto w-[145px] sm:w-[190px]" preload />
    {showDescriptor && <span data-brand-descriptor className="hidden text-[9px] font-normal tracking-[0.22em] text-[var(--muted)] uppercase sm:inline-block border-l border-[var(--border)] pl-3 py-0.5">{ui(locale, "Studio Créatif", "Creative Studio")}</span>}
  </Link>;
}
