"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Send,
  Search,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Radio,
  Dna,
} from "lucide-react";

export default function WhyChooseUs() {
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/REPLACE_WITH_ACTUAL_USERNAME";
  const telegramHandle = process.env.NEXT_PUBLIC_TELEGRAM_HANDLE || "@PeptideIngredientsLab";

  return (
    <section id="why-choose-us" className="py-20 sm:py-24 lg:py-28 bg-[#151B18] border-y border-[#354239]/60">
      <div className="container-custom space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="editorial-badge">Core Advantages</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-foreground tracking-tight">
            Built for Cosmetic Formulators
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
            Eliminating ambiguity through standardized molecular descriptors, transparent specifications, and responsive direct communication.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Bento Card 1: Featured Large Laboratory Card (spans 7 cols on lg) */}
          <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-[#354239] bg-[#222C26] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:border-accent/40 shadow-lg">
            {/* Background Laboratory Imagery with moody dark overlay */}
            <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-55 transition-opacity duration-500">
              <Image
                src="/images/features/why-documentation.webp"
                alt="Minimalist laboratory documentation workspace with precision glassware and specification sheets"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#222C26] via-[#222C26]/75 to-transparent pointer-events-none" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Primary Analytical Standard
                </span>
                <span className="text-[11px] font-mono text-foreground-muted">01 / INTEGRITY</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-foreground leading-snug">
                Laboratory-Standard Molecular Integrity
              </h3>

              <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed max-w-xl">
                Every catalog item reflects standardized molecular weight parameters, verified CAS registry identifiers, and defined solubility characteristics intended for cosmetic development chemists and laboratory formulation teams.
              </p>
            </div>

            {/* Analytical Metrics Bar */}
            <div className="relative z-10 pt-8 mt-6 border-t border-[#354239]/80 grid grid-cols-3 gap-4">
              <div>
                <span className="text-lg sm:text-xl font-bold font-mono text-accent block">&ge;98%</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-foreground-muted">HPLC Purity</span>
              </div>
              <div className="border-l border-[#354239] pl-4">
                <span className="text-lg sm:text-xl font-bold font-mono text-accent block">MS / NMR</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-foreground-muted">Mass Verified</span>
              </div>
              <div className="border-l border-[#354239] pl-4">
                <span className="text-lg sm:text-xl font-bold font-mono text-accent block">COA</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-foreground-muted">Lot Specific</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Telegram Communication Card (spans 5 cols on lg) */}
          <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-[#354239] bg-[#222C26] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:border-accent/40 shadow-lg">
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
              <Image
                src="/images/features/why-direct-contact.webp"
                alt="Smartphone communication interface on stone desk beside peptide ingredient vial"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#222C26] via-[#222C26]/85 to-transparent pointer-events-none" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#19211D] border border-[#354239] flex items-center justify-center text-accent">
                  <Send className="w-5 h-5" />
                </div>
                {/* Live Pulse Indicator */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-[10px] font-mono uppercase tracking-wider text-accent font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Live Desk
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-foreground-muted">
                  02 / DIRECT DESK
                </span>
                <h3 className="text-lg sm:text-xl font-display font-medium text-foreground">
                  Direct Technical Communication
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  Connect directly with our technical desk via our official Telegram channel. Receive prompt assistance for lot queries, pilot scale requirements, and documentation dispatch.
                </p>
              </div>

              {/* Status Box */}
              <div className="p-3.5 rounded-xl bg-[#19211D] border border-[#354239] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground-muted">Average Response Time</span>
                  <span className="font-mono text-accent font-semibold">&lt; 15 Minutes</span>
                </div>
                <div className="text-[11px] text-foreground-muted font-mono truncate">
                  Handle: <span className="text-foreground">{telegramHandle}</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-accent hover:bg-accent-hover rounded-lg transition-colors shadow-sm"
              >
                <span>Open Direct Telegram Line</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Bento Card 3: Discovery Card (spans 5 cols on lg) */}
          <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-[#354239] bg-[#222C26] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:border-accent/40 shadow-lg">
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
              <Image
                src="/images/features/why-product-information.webp"
                alt="Unbranded cosmetic ingredient vial beside technical information sheet"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#222C26] via-[#222C26]/85 to-transparent pointer-events-none" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#19211D] border border-[#354239] flex items-center justify-center text-accent">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-foreground-muted">03 / DISCOVERY</span>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-foreground-muted">
                  Systematic Catalog
                </span>
                <h3 className="text-lg sm:text-xl font-display font-medium text-foreground">
                  Streamlined Peptide Discovery
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  Filter by cosmetic category, molecular mechanism, or CAS number to immediately locate candidate ingredients suitable for your target formulation matrix.
                </p>
              </div>

              {/* Functional Preview Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Signal Peptides", "Carrier Peptides", "Neurotransmitter-Inhibiting", "Enzyme-Inhibiting"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#19211D] border border-[#354239] text-foreground-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="#products"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent hover:text-accent-hover transition-colors underline underline-offset-4"
              >
                <span>Explore Catalog Filters</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Card 4: Transparency & CAS Data Card (spans 7 cols on lg) */}
          <div className="lg:col-span-7 relative group rounded-2xl border border-[#354239] bg-[#222C26] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:border-accent/40 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#19211D] border border-[#354239] flex items-center justify-center text-accent">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-foreground-muted">04 / TRANSPARENCY</span>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-foreground-muted">
                  Unambiguous Identifiers
                </span>
                <h3 className="text-lg sm:text-xl font-display font-medium text-foreground">
                  Standardized Documentation &amp; CAS Traceability
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  We state explicit Chemical Abstracts Service (CAS) numbers, standardized INCI nomenclature, exact molecular formulas, and verified molecular weights for every compound in our catalog.
                </p>
              </div>

              {/* Sample Molecular Preview Block */}
              <div className="p-4 rounded-xl bg-[#19211D] border border-[#354239] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-mono text-foreground-muted">Sample Compound</span>
                  <p className="font-display font-medium text-foreground">Copper Tripeptide-1 (GHK-Cu)</p>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="px-2.5 py-1 rounded bg-[#222C26] border border-[#354239] text-accent">
                    CAS: 89030-95-5
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#222C26] border border-[#354239] text-foreground">
                    MW: 403.93 g/mol
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center gap-2 text-xs text-foreground-muted">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Full Certificate of Analysis (COA) provided with each batch review.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
