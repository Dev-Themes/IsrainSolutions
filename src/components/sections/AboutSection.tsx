"use client";

import React from "react";
import Link from "next/link";
import { Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { GeometricHeading } from "@/components/branding/GeometricHeading";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface AboutSectionProps {
  locale: Locale;
}

export function AboutSection({ locale }: AboutSectionProps) {
  const dict = getDictionary(locale);

  // Artistic accent colors for disciplines
  const disciplineColors = ["#FF665C", "#F7D85B", "#6298FF", "#78E6BF", "#BA9CFF", "#FF665C"];
  const pillarColors = ["#FF665C", "#F7D85B", "#6298FF"];

  return (
    <div className="w-full">
      {/* Hero Studio Banner */}
      <section className="relative w-full pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 border-b border-[#1f1f1f] overflow-hidden">
        <div className="container-forme">
          <div className="max-w-4xl">
            <GeometricHeading text="STUDIO." as="h1" className="mb-8 sm:mb-12" />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-3xl md:text-4xl font-light text-[#FFFFFF] leading-snug tracking-tight mb-8"
            >
              {dict.about.introText}
            </motion.p>
          </div>
        </div>
      </section>

      {/* 01. Philosophy Section */}
      <section className="w-full py-20 sm:py-28 border-b border-[#1f1f1f] bg-[#000000]">
        <div className="container-forme">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#FF665C] block mb-2">
                [{dict.about.philosophyTag}]
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#FFFFFF]">
                {dict.about.philosophyTitle}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-[#717171] mt-1 uppercase tracking-wider">
                {dict.about.philosophySubtitle}
              </p>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg sm:text-2xl font-light text-[#D4D4D4] leading-relaxed">
                {dict.about.philosophyText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Approach Section */}
      <section className="w-full py-20 sm:py-28 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="container-forme">
          <div className="mb-12 sm:mb-16 max-w-3xl">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#F7D85B] block mb-2">
              [{dict.about.approachTag}]
            </span>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-[#FFFFFF] mb-3">
              {dict.about.approachTitle}
            </h2>
            <p className="text-base sm:text-lg font-light text-[#B8B8B8] leading-relaxed">
              {dict.about.approachText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {dict.about.approachSteps.map((step, idx) => (
              <div
                key={step.number}
                className="p-6 sm:p-8 bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#333333] transition-colors rounded-xs"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-[#F7D85B]">
                    {step.number}
                  </span>
                  <span className="w-6 h-[1px] bg-[#333333]" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-[#FFFFFF] mb-3">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#B8B8B8] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. What We Do (Disciplines) */}
      <section className="w-full py-20 sm:py-28 border-b border-[#1f1f1f] bg-[#000000]">
        <div className="container-forme">
          <div className="mb-12 sm:mb-16">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#6298FF] block mb-2">
              [{dict.about.disciplinesTag}]
            </span>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-[#FFFFFF]">
              {dict.about.disciplinesTitle}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#717171] mt-1 uppercase tracking-wider">
              {dict.about.disciplinesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {dict.about.disciplines.map((item, idx) => {
              const color = disciplineColors[idx % disciplineColors.length];
              return (
                <div
                  key={item.title}
                  style={{ "--disc-color": color } as React.CSSProperties}
                  className="group p-6 sm:p-8 bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[var(--disc-color)] transition-all duration-300 rounded-xs"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#717171] group-hover:text-[var(--disc-color)] transition-colors">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <span
                      style={{ backgroundColor: color }}
                      className="w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#FFFFFF] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-[#B8B8B8] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04. Values & Pillars */}
      <section className="w-full py-20 sm:py-28 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="container-forme">
          <div className="mb-12 sm:mb-16">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#78E6BF] block mb-2">
              [{dict.about.valuesTag}]
            </span>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-[#FFFFFF]">
              {dict.about.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.about.values.map((val, idx) => {
              const color = pillarColors[idx % pillarColors.length];
              return (
                <div key={val.name} className="border-t border-[#333333] pt-6 group">
                  <span
                    style={{ color }}
                    className="text-xs font-mono uppercase tracking-wider block mb-2"
                  >
                    [{val.enName}]
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium text-[#FFFFFF] mb-3">
                    {val.name}
                  </h3>
                  <p className="text-sm font-light text-[#B8B8B8] leading-relaxed">
                    {val.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Banner in Charcoal #292929 */}
      <section className="w-full py-20 sm:py-28 bg-[#292929] text-[#FFFFFF]">
        <div className="container-forme flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight mb-4">
              {dict.about.contactBannerTitle}
            </h2>
            <p className="text-sm sm:text-base font-light text-[#B8B8B8] leading-relaxed">
              {dict.about.contactBannerText}
            </p>
          </div>

          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFFFFF] text-[#050505] hover:bg-[#F7D85B] transition-colors text-xs font-mono tracking-[0.2em] uppercase rounded-xs"
          >
            <span>{dict.about.contactBannerAction}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
