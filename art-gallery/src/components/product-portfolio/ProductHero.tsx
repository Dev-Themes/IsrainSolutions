"use client";

import React from "react";
import { Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { GeometricProductsHeading } from "./GeometricProductsHeading";
import { ProductHeroMotif } from "./ProductHeroMotif";
import { motion } from "framer-motion";

interface ProductHeroProps {
  locale: Locale;
}

export function ProductHero({ locale }: ProductHeroProps) {
  const dict = getDictionary(locale);

  return (
    <section className="relative w-full pt-12 sm:pt-20 md:pt-28 pb-14 sm:pb-20 border-b border-[#1f1f1f] overflow-hidden">
      <div className="container-forme">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Experimental PRODUCTS Typography & Subtext */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            {/* Small Editorial Label */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-4 sm:mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#78E6BF] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#78E6BF]">
                {dict.productsPage.eyebrow}
              </span>
            </motion.div>

            {/* Custom SVG Geometric PRODUCTS. Heading */}
            <GeometricProductsHeading as="h1" className="mb-6 sm:mb-8" />

            {/* Intro Copy */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-xl lg:text-2xl font-light text-[#B8B8B8] max-w-2xl leading-relaxed tracking-normal"
            >
              {dict.productsPage.heroSubtext}
            </motion.p>
          </div>

          {/* Right Column: Decorative Restrained Geometric Motif */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <ProductHeroMotif size={280} className="sm:w-[320px] sm:h-[320px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
