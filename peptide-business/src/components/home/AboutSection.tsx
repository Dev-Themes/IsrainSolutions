"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Microscope, Database, Send } from "lucide-react";

export default function AboutSection() {
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/REPLACE_WITH_ACTUAL_USERNAME";

  return (
    <section id="about" className="py-20 sm:py-24 lg:py-28 bg-background border-t border-border transition-colors duration-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Realistic Laboratory Imagery with Analytical Overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] min-h-[360px] lg:min-h-[480px] rounded-2xl overflow-hidden bg-surface border border-border shadow-2xl group">
              <Image
                src="/images/about/about-approach.webp"
                alt="Modern cosmetic formulation workspace with amber apothecary bottles, glassware, and laboratory documentation"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />

              {/* Informative Floating Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-surface/95 dark:bg-surface/90 backdrop-blur-md border border-border rounded-xl p-4 text-xs text-foreground-muted shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-accent flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Analytical Standard
                  </span>
                  <span className="text-[10px] font-mono text-foreground-muted">R&amp;D Ready</span>
                </div>
                <p className="text-foreground font-medium text-xs">
                  Reference standards for cosmetic development teams and formulation chemists worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Informative Brand Copy & Editorial Highlights */}
          <div className="lg:col-span-7 space-y-7">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="editorial-badge">Our Mission &amp; Standard</span>
                <div className="h-px w-10 bg-accent/40" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-foreground tracking-tight leading-snug">
                Transparent Chemistry for Discerning Formulators
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-foreground-muted leading-relaxed font-normal">
              <p>
                Navigating cosmetic peptide raw materials often involves ambiguous marketing narratives, proprietary compound secrecy, and fragmented specifications. Our platform was created to provide cosmetic chemists, brand developers, and commercial formulators with an organized, transparent showcase of peptide compounds.
              </p>
              <p>
                Rather than operating through automated web carts or unverified medical claims, we emphasize verified chemical descriptors and direct communication. Every listing presents key molecular weights, CAS identifiers, and standard formulation parameters, enabling you to identify candidate ingredients and discuss lot-specific documentation directly with our team.
              </p>
            </div>

            {/* Editorial Stats / Key Principles Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-surface border border-border space-y-1 shadow-xs">
                <span className="text-lg font-bold font-mono text-accent block">100%</span>
                <span className="text-[11px] font-medium text-foreground block">Verified CAS</span>
                <span className="text-[10px] text-foreground-muted block">Indexed chemicals</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface border border-border space-y-1 shadow-xs">
                <span className="text-lg font-bold font-mono text-accent block">Direct</span>
                <span className="text-[11px] font-medium text-foreground block">Telegram Line</span>
                <span className="text-[10px] text-foreground-muted block">Direct desk access</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface border border-border space-y-1 shadow-xs">
                <span className="text-lg font-bold font-mono text-accent block">INCI</span>
                <span className="text-[11px] font-medium text-foreground block">Compliant</span>
                <span className="text-[10px] text-foreground-muted block">Standard labeling</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface border border-border space-y-1 shadow-xs">
                <span className="text-lg font-bold font-mono text-accent block">HPLC</span>
                <span className="text-[11px] font-medium text-foreground block">Purity Docs</span>
                <span className="text-[10px] text-foreground-muted block">Available per lot</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent hover:text-accent-hover transition-colors underline underline-offset-4"
              >
                <span>Browse the Ingredient Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-foreground-muted text-xs">•</span>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:text-accent transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-accent" />
                <span>Contact Desk on Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
