"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/portfolio";

interface BrandLogoProps { locale?: Locale; className?: string; showDescriptor?: boolean; }

export function BrandLogo({ locale = "fr", className = "", showDescriptor = true }: BrandLogoProps) {
  return <Link href={`/${locale}`} className={`inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-80 ${className}`}
    aria-label={locale === "fr" ? "PopArt Agency Studio Créatif — Accueil" : "PopArt Agency Creative Studio — Home"}>
    <Image src="/brand/final-lockup.png" alt="PopArt Agency" width={1060} height={414} sizes="(max-width: 640px) 145px, 190px" className="h-auto w-[145px] sm:w-[190px]" preload />
    {showDescriptor && <span data-brand-descriptor className="hidden text-[9px] font-normal tracking-[0.22em] text-[var(--muted)] uppercase sm:inline-block border-l border-[var(--border)] pl-3 py-0.5">{locale === "fr" ? "Studio Créatif" : "Creative Studio"}</span>}
  </Link>;
}
