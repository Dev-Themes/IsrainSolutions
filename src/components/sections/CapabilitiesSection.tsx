"use client";

import React from "react";
import { Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { motion } from "framer-motion";

interface CapabilitiesSectionProps {
  locale: Locale;
}

export function CapabilitiesSection({ locale }: CapabilitiesSectionProps) {
  const dict = getDictionary(locale);

  return (
    <section className="w-full border-b border-[#1f1f1f] bg-[#000000] py-14 sm:py-20">
      <div className="container-forme">
        {/* Top Section Header: Tag & Bold Manifesto Heading */}
        <div className="mb-10 sm:mb-14">
          <span className="text-[10px] sm:text-xs uppercase font-mono tracking-[0.25em] text-[#F7D85B] block mb-3">
            [{dict.home.capabilitiesTag}]
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#FFFFFF]">
              {dict.home.manifestoTitle}
            </h2>
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#717171] uppercase">
              {dict.home.manifestoSubtitle}
            </span>
          </div>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {dict.home.capabilities.map((item) => (
            <motion.div
              key={item.number}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ "--cap-color": item.color } as React.CSSProperties}
              className="group p-6 sm:p-7 bg-[#050505] border border-[#1f1f1f] hover:border-[var(--cap-color)] transition-all duration-300 rounded-xs flex flex-col justify-between"
            >
              <div>
                {/* Number & Color Accent Indicator */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono text-[#717171] group-hover:text-[var(--cap-color)] transition-colors">
                    {item.number}
                  </span>
                  <span
                    style={{ backgroundColor: item.color }}
                    className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Capability Title */}
                <h3 className="text-lg sm:text-xl font-medium text-[#FFFFFF] group-hover:text-[#FFFFFF] mb-2.5 tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm font-light text-[#B8B8B8] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
