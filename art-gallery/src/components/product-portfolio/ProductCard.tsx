"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductProject } from "@/types/products";
import { Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { Maximize2, ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: ProductProject;
  locale: Locale;
  priority?: boolean;
  onOpenLightbox: (product: ProductProject, triggerRef: React.RefObject<HTMLButtonElement | null>) => void;
}

export function ProductCard({
  product,
  locale,
  priority = false,
  onOpenLightbox,
}: ProductCardProps) {
  const dict = getDictionary(locale);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isWide = product.layout === "wide";
  const accent = product.accentColor || "#78E6BF";

  return (
    <article
      style={{ "--card-accent": accent } as React.CSSProperties}
      className={`group relative overflow-hidden bg-[#0a0a0a] border border-[#1f1f1f] transition-all duration-500 hover:border-[var(--card-accent)]/50 scroll-mt-24 ${
        isWide ? "col-span-1 md:col-span-2" : "col-span-1"
      }`}
    >
      {/* Clickable Image Container triggering Lightbox */}
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="dialog"
        onClick={() => onOpenLightbox(product, buttonRef)}
        className="w-full text-left relative block cursor-pointer select-none overflow-hidden focus-visible:outline-2 focus-visible:outline-[var(--card-accent)]"
        aria-label={`${dict.productsPage.lightboxAria} — ${product.brand} ${product.title}`}
      >
        <div
          className={`relative w-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isWide
              ? "h-[290px] sm:h-[430px] md:h-[560px] lg:h-[640px]"
              : "h-[270px] sm:h-[370px] md:h-[470px] lg:h-[530px]"
          }`}
        >
          {/* Main Product Image with subtle scale & brightness hover */}
          <Image
            src={product.coverImage}
            alt={product.alt[locale]}
            fill
            priority={priority}
            quality={80}
            sizes={
              isWide
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1400px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
            }
            className="object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:brightness-95"
          />

          {/* Controlled Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/95 via-[#000000]/35 to-transparent pointer-events-none transition-opacity duration-500 opacity-80 group-hover:opacity-100" />

          {/* Hover Zoom Hint Icon (Top Right) */}
          <div
            style={{ borderColor: `${accent}60` }}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-[#000000]/60 backdrop-blur-md text-[#FFFFFF] border opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <Maximize2 size={15} style={{ color: accent }} />
          </div>

          {/* Bottom Left Content Overlay */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 pointer-events-none flex flex-col items-start gap-1.5 sm:gap-2">
            {/* Outlined Category Badge with Product Accent Color */}
            <span
              style={{
                borderColor: `${accent}80`,
                color: accent,
              }}
              className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-mono border bg-[#000000]/60 backdrop-blur-xs px-2.5 py-1 rounded-xs transition-colors duration-300"
            >
              [{product.category.toUpperCase()}]
            </span>

            {/* Brand & Project Title with subtle upward translation on hover */}
            <div className="flex flex-col gap-0.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#B8B8B8]">
                {product.brand}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#FFFFFF] drop-shadow-sm">
                {product.title}
              </h3>
            </div>

            {/* Tagline */}
            {product.tagline && (
              <p className="text-xs sm:text-sm font-light text-[#A0A0A0] max-w-xl line-clamp-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
                {product.tagline[locale]}
              </p>
            )}
          </div>
        </div>
      </button>

      {/* Direct Case Study Link in Card Footer with Accent Transition */}
      <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-[#050505] flex items-center justify-between border-t border-[#1f1f1f] text-xs">
        <span className="text-[#717171] font-mono tracking-wider text-[11px]">
          {product.brand} — {product.year}
        </span>
        <Link
          href={`/${locale}/products/${product.slug}`}
          className="group/link inline-flex items-center gap-1.5 text-[#B8B8B8] hover:text-[var(--card-accent)] transition-colors tracking-[0.16em] uppercase text-[11px] font-medium"
        >
          <span>{dict.productsPage.viewProject}</span>
          <ArrowUpRight
            size={13}
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
