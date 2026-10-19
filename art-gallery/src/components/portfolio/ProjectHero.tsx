"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortfolioProject, Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectHeroProps {
  project: PortfolioProject;
  locale: Locale;
}

export function ProjectHero({ project, locale }: ProjectHeroProps) {
  const dict = getDictionary(locale);
  const accent = project.accentColor || "#E8D49B";

  return (
    <section className="w-full pt-8 sm:pt-12 pb-12 sm:pb-20 border-b border-[#1f1f1f]">
      <div className="container-forme">
        {/* Back Link */}
        <div className="mb-8 sm:mb-12">
          <Link
            href={`/${locale}`}
            style={{ "--hero-accent": accent } as React.CSSProperties}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B8B8B8] hover:text-[var(--hero-accent)] transition-colors py-1 focus-visible:ring-1 focus-visible:ring-[var(--hero-accent)]"
          >
            <ArrowLeft size={16} />
            <span>{dict.project.backToWork}</span>
          </Link>
        </div>

        {/* Project Header Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 sm:mb-16">
          <div className="lg:col-span-8">
            <span
              style={{ color: accent, borderColor: `${accent}70` }}
              className="inline-block text-xs uppercase font-mono tracking-[0.25em] border px-2.5 py-1 mb-4 rounded-xs"
            >
              [{project.category.toUpperCase()}]
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FFFFFF] mb-6">
              {project.title}
            </h1>
            <p className="text-base sm:text-xl font-light text-[#B8B8B8] max-w-3xl leading-relaxed">
              {project.description[locale]}
            </p>
          </div>

          {/* Project Metadata Table */}
          <div className="lg:col-span-4 flex flex-col justify-end border-t lg:border-t-0 lg:border-l border-[#292929] pt-6 lg:pt-0 lg:pl-8 space-y-4 text-xs font-mono">
            <div>
              <span className="text-[#717171] uppercase tracking-wider block">CLIENT</span>
              <span className="text-[#FFFFFF] text-sm tracking-wide">{project.client}</span>
            </div>
            <div>
              <span className="text-[#717171] uppercase tracking-wider block">ANNÉE / YEAR</span>
              <span className="text-[#FFFFFF] text-sm tracking-wide">{project.year}</span>
            </div>
            <div>
              <span className="text-[#717171] uppercase tracking-wider block">DISCIPLINE</span>
              <span className="text-[#E8D49B] text-sm tracking-wide">{project.category}</span>
            </div>
          </div>
        </div>

        {/* Full-Width Panoramic Hero Cover Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[360px] sm:h-[520px] md:h-[680px] lg:h-[760px] overflow-hidden bg-[#000000] border border-[#292929]"
        >
          <Image
            src={project.coverImage}
            alt={project.alt[locale]}
            fill
            priority
            quality={80}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 95vw, 1400px"
            className="object-cover"
          />
        </motion.div>

        {/* Short brief description of the image as caption */}
        {project.caption && (
          <p className="mt-3 text-xs sm:text-sm font-light text-[#A0A0A0] italic tracking-wide">
            — {project.caption[locale]}
          </p>
        )}
      </div>
    </section>
  );
}
