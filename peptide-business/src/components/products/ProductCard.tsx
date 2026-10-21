"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, ArrowUpRight, Eye, Plus, Check, Scale } from "lucide-react";
import { Product } from "@/types/product";
import { formatTelegramInquiryUrl } from "@/lib/utils";
import { useDossier } from "@/lib/dossier-context";

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
  onToggleCompare?: (product: Product) => void;
  isCompared?: boolean;
}

export default function ProductCard({
  product,
  onOpenQuickView,
  onToggleCompare,
  isCompared = false,
}: ProductCardProps) {
  const telegramUrl = formatTelegramInquiryUrl(product.name, product.casNumber);
  const { addToDossier, hasItem } = useDossier();
  const inDossier = hasItem(product.id);

  return (
    <article className="group relative flex flex-col bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-accent/50 w-full min-w-0">
      {/* Product Image Surface - Prominently Displayed with Minimum Height */}
      <div className="relative aspect-[4/3] w-full min-h-[220px] bg-surface-alt overflow-hidden">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle bottom shadow gradient to elevate text */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <span className="editorial-badge bg-surface/90 backdrop-blur-md text-[10px] text-accent font-mono font-medium border-border">
            {product.category}
          </span>
        </div>

        {/* Top Right: Compare Checkbox */}
        {onToggleCompare && (
          <button
            type="button"
            onClick={() => onToggleCompare(product)}
            className={`absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all shadow-xs ${
              isCompared
                ? "bg-accent text-white font-semibold"
                : "bg-surface/90 text-foreground-secondary hover:text-foreground border border-border backdrop-blur-md"
            }`}
            title="Toggle side-by-side comparison"
          >
            <Scale className="w-3 h-3" />
            <span className="hidden sm:inline">{isCompared ? "Compared" : "Compare"}</span>
          </button>
        )}

        {/* Quick View Floating Button */}
        <button
          type="button"
          onClick={() => onOpenQuickView(product)}
          className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/95 backdrop-blur-md text-xs font-medium text-foreground hover:bg-surface-alt shadow-md transition-all duration-150 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 border border-border"
          aria-label={`Quick view specifications for ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5 text-accent" />
          <span>Quick Specs</span>
        </button>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-4 sm:p-5 justify-between space-y-4 min-w-0">
        <div className="space-y-2 min-w-0">
          <div className="flex items-center justify-between gap-2">
            {product.casNumber && (
              <span className="text-[11px] font-mono text-foreground-muted tracking-tight truncate block">
                CAS: {product.casNumber}
              </span>
            )}
            {product.suggestedPh && (
              <span className="text-[10px] font-mono text-accent bg-accent/15 border border-accent/25 px-2 py-0.5 rounded shrink-0">
                pH {product.suggestedPh}
              </span>
            )}
          </div>

          <h3 className="font-display font-medium text-base text-foreground group-hover:text-accent transition-colors leading-snug break-words">
            <Link href={`/products/${product.slug}`} className="focus-visible:outline-none focus-visible:underline">
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-foreground-muted leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Sequence Motif Pill */}
          {product.sequence && (
            <div className="pt-1">
              <span className="text-[10px] font-mono text-accent bg-surface-alt border border-border px-2 py-0.5 rounded truncate block max-w-full">
                Motif: {product.sequence}
              </span>
            </div>
          )}
        </div>

        {/* Specification Micro-Metrics */}
        <div className="pt-2 border-t border-border grid grid-cols-2 gap-2 text-[11px]">
          <div className="min-w-0">
            <span className="text-foreground-muted block text-[10px] uppercase font-mono tracking-wider">Formula</span>
            <span className="font-mono text-foreground font-medium truncate block">
              {product.molecularFormula || "Organic Matrix"}
            </span>
          </div>
          <div className="min-w-0">
            <span className="text-foreground-muted block text-[10px] uppercase font-mono tracking-wider">Usage</span>
            <span className="text-accent font-medium truncate block font-mono">
              {product.suggestedUsage || "0.05% – 1%"}
            </span>
          </div>
        </div>

        {/* Card Action CTAs: Structured 2-Tier Layout (Zero-Crop Guarantee Across All Device Widths) */}
        <div className="pt-2 space-y-2">
          {/* Tier 1: Secondary Actions (Dossier & Details) Balanced 50/50 Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Add to Dossier Button */}
            <button
              type="button"
              onClick={() => addToDossier(product)}
              className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all text-center min-w-0 ${
                inDossier
                  ? "bg-accent/20 border-accent text-accent"
                  : "border-border bg-surface text-foreground hover:bg-surface-alt hover:border-accent/40"
              }`}
              title="Add to multi-item batch inquiry dossier"
            >
              {inDossier ? <Check className="w-3.5 h-3.5 shrink-0 text-accent" /> : <Plus className="w-3.5 h-3.5 shrink-0 opacity-70" />}
              <span className="truncate">{inDossier ? "In Dossier" : "Dossier"}</span>
            </button>

            {/* Product Details Link */}
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-border bg-surface text-foreground hover:bg-surface-alt hover:text-accent hover:border-accent/40 transition-all text-center min-w-0"
              title={`View technical specifications for ${product.name}`}
            >
              <span className="truncate">Details</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
            </Link>
          </div>

          {/* Tier 2: Primary Conversion Action (Full Width, Uncropped, High Contrast) */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text font-bold transition-all shadow-sm text-center min-w-0 group/inquire"
            aria-label={`Inquire about ${product.name} on Telegram`}
          >
            <Send className="w-3.5 h-3.5 shrink-0 transition-transform group-hover/inquire:translate-x-0.5" />
            <span className="truncate">Inquire on Telegram</span>
          </a>
        </div>
      </div>
    </article>
  );
}
