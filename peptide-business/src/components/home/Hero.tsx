import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Send, ShieldCheck, Microscope, Sparkles, CheckCircle2 } from "lucide-react";

export default function Hero() {
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/REPLACE_WITH_ACTUAL_USERNAME";

  return (
    <section id="home" className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Brand Headline (~45%) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Cosmetic Peptide Catalog</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight leading-[1.12]">
                Peptide Raw Materials for Cosmetic Formulation
              </h1>
              <p className="text-sm sm:text-base text-foreground-muted leading-relaxed font-normal">
                An organized catalog of cosmetic peptide ingredients. Review standardized CAS registry numbers, molecular weights, and verified solubility parameters with direct inquiry communication.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-btn-primary-text bg-btn-primary hover:bg-btn-primary-hover rounded-xl transition-all duration-150 shadow-md hover:shadow-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:text-accent bg-surface hover:bg-surface-alt rounded-xl border border-border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Send className="w-3.5 h-3.5 text-accent" />
                <span>Contact on Telegram</span>
              </a>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 border-t border-border/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-foreground-muted">
              <div className="flex items-center gap-1.5">
                <Microscope className="w-4 h-4 text-accent" />
                <span>Standardized Molecular Data</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>18+ Verified Platform</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visually Dominant Editorial Photograph (~55%) */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/11] min-h-[340px] sm:min-h-[440px] lg:min-h-[500px] rounded-2xl overflow-hidden border border-border shadow-2xl bg-surface">
              <Image
                src="/images/hero/hero-peptides.webp"
                alt="Luxury cosmetic peptide ingredient vessels on dark stone surface with warm ambient lighting"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 700px"
                className="object-cover object-center transition-transform duration-700 hover:scale-103"
              />

              {/* Subtle dark film gradient overlays for integrated atmosphere without darkening photo excessively */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent hidden lg:block pointer-events-none" />

              {/* Editorial Caption Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-xl bg-surface/95 dark:bg-surface/90 backdrop-blur-md border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-lg">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-accent font-semibold block">
                    Analytical Batch Standard
                  </span>
                  <span className="font-display font-medium text-foreground text-sm">
                    High-Purity Bio-Active Peptide Solutions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-background-secondary border border-border text-foreground-secondary">
                    ISO-Compliant Reference Data
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
