"use client";

import React from "react";
import { Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { GeometricHeading } from "@/components/branding/GeometricHeading";
import { ConcentricGraphic } from "@/components/branding/ConcentricGraphic";
import { motion } from "framer-motion";

interface WorkHeroProps {
  locale: Locale;
}

export function WorkHero({ locale }: WorkHeroProps) {
  const dict = getDictionary(locale);

  return (
    <section className="relative w-full pt-12 sm:pt-20 md:pt-28 pb-14 sm:pb-20 border-b border-[#1f1f1f] overflow-hidden">
      <div className="container-forme">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Massive Experimental WORK Typography & Subtext */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            {/* Custom SVG Geometric Striped Lettering */}
            <GeometricHeading text="WORK" as="h1" className="mb-6 sm:mb-8" />

            {/* Intro Copy */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-xl lg:text-2xl font-light text-[#B8B8B8] max-w-2xl leading-relaxed tracking-normal"
            >
              {dict.home.heroSubtext}
            </motion.p>
          </div>

          {/* Right Column: Decorative Concentric Arc Graphic */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <ConcentricGraphic size={280} className="sm:w-[320px] sm:h-[320px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
