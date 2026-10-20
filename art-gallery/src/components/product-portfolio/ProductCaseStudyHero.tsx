"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductProject } from "@/types/products";
import { Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCaseStudyHeroProps {
  product: ProductProject;
  locale: Locale;
}

export function ProductCaseStudyHero({ product, locale }: ProductCaseStudyHeroProps) {
  const dict = getDictionary(locale);
  const accent = product.accentColor || "#78E6BF";

  return (
    <section className="relative w-full pt-20 sm:pt-28 pb-12 sm:pb-20 border-b border-[#1f1f1f] overflow-hidden">
      <div className="container-forme">
        {/* Top Breadcrumb Navigation */}
        <div className="mb-8 sm:mb-12 flex items-center justify-between">
          <Link
            href={`/${locale}/products`}
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#B8B8B8] hover:text-[#FFFFFF] transition-colors"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>{dict.productsPage.backToProducts}</span>
          </Link>

          {/* Speculative Concept Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214] border border-[#292929] text-[10px] font-mono tracking-widest text-[#B8B8B8]">
            <Sparkles size={11} style={{ color: accent }} />
            <span>{dict.productsPage.speculativeBadge}</span>
          </div>
        </div>

        {/* Brand & Campaign Title Block */}
        <div className="max-w-4xl mb-8 sm:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span
              style={{ color: accent, borderColor: `${accent}60` }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-mono border px-3 py-1 rounded-xs"
            >
              [{product.category.toUpperCase()}]
            </span>
            <span className="text-xs font-mono text-[#717171] tracking-wider">
              {product.brand} • {product.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#FFFFFF] mb-4 sm:mb-6">
            {product.title}
          </h1>

          <p className="text-base sm:text-xl text-[#B8B8B8] font-light leading-relaxed max-w-3xl">
            {product.summary[locale]}
          </p>
        </div>

        {/* Large Cinematic Cover Image with Stable Aspect Ratio */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[340px] sm:h-[500px] md:h-[650px] lg:h-[750px] rounded-xs overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a]"
        >
          <Image
            src={product.coverImage}
            alt={product.alt[locale]}
            fill
            priority
            quality={85}
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent pointer-events-none" />

          {/* Caption Tag at Bottom Left of Hero Image */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-lg p-3 sm:p-4 rounded-sm bg-[#050505]/75 backdrop-blur-md border border-[#292929] pointer-events-none">
            <span className="text-[10px] font-mono text-[#78E6BF] uppercase tracking-widest block mb-1">
              [FIG. 01 — {product.brand}]
            </span>
            <p className="text-xs sm:text-sm text-[#FFFFFF] font-light">
              {product.tagline[locale]}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
