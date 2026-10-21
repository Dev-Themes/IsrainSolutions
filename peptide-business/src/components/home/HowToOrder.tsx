"use client";

import React from "react";
import Image from "next/image";
import { Search, SlidersHorizontal, Send, ArrowRight, CheckCircle2 } from "lucide-react";

const STAGES = [
  {
    number: "01",
    icon: Search,
    phase: "Phase 1: Discovery",
    title: "Explore & Select",
    image: "/images/steps/step-explore.webp",
    description:
      "Browse the structured peptide catalog. Filter by cosmetic functional class or CAS number, and review molecular weights, solubility profiles, and target pH windows.",
    highlight: "Review Technical Specs",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    phase: "Phase 2: Formulation Scope",
    title: "Define Parameters",
    image: "/images/steps/step-review.webp",
    description:
      "Determine your pilot batch volume and target active concentration using our Formulation Studio, or compile multiple candidate peptides into your Inquiry Dossier.",
    highlight: "Batch Size & Concentration",
  },
  {
    number: "03",
    icon: Send,
    phase: "Phase 3: Direct Desk",
    title: "Connect via Telegram",
    image: "/images/steps/step-contact.webp",
    description:
      "Transmit your pre-configured parameters directly to our technical desk via official Telegram. Review lot-specific COA analysis and confirm availability.",
    highlight: "< 15 Min Response Average",
  },
];

export default function HowToOrder() {
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/REPLACE_WITH_ACTUAL_USERNAME";

  return (
    <section id="how-to-inquire" className="py-20 sm:py-24 lg:py-28 bg-[#151B18] border-y border-[#354239]/60">
      <div className="container-custom space-y-14 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="editorial-badge">Structured Workflow</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-foreground tracking-tight">
            How to Inquire
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
            A frictionless, direct protocol for reviewing specifications and initiating product inquiries.
          </p>
        </div>

        {/* Visual Process Sequence with Connecting Lines */}
        <div className="relative">
          {/* Desktop Connecting Progression Line */}
          <div
            className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-accent/20 via-accent/60 to-accent/20 z-0 pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {STAGES.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.number}
                  className="relative group rounded-2xl border border-[#354239] bg-[#222C26] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-accent/50 hover:-translate-y-1 shadow-lg"
                >
                  <div className="space-y-4">
                    {/* Top Stage Node Header */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#19211D] border border-accent/40 text-accent flex items-center justify-center font-mono font-bold text-base shadow-sm group-hover:bg-accent group-hover:text-white transition-colors duration-200">
                        {stage.number}
                      </div>
                      <div className="w-9 h-9 rounded-lg bg-[#19211D] border border-[#354239] flex items-center justify-center text-foreground-muted group-hover:text-accent transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Step Visual Photograph */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#19211D] border border-[#354239] shadow-inner">
                      <Image
                        src={stage.image}
                        alt={stage.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover group-hover:scale-104 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#222C26]/80 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold block">
                        {stage.phase}
                      </span>
                      <h3 className="font-display font-medium text-lg text-foreground">
                        {stage.title}
                      </h3>
                      <p className="text-xs text-foreground-muted leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  {/* Stage Footer Badge */}
                  <div className="pt-4 mt-4 border-t border-[#354239]/80 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-foreground-muted flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                      {stage.highlight}
                    </span>
                    <span className="text-[10px] font-mono text-foreground-muted/60">
                      Step {index + 1}/3
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action CTA below workflow */}
        <div className="text-center pt-2">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-accent hover:bg-accent-hover rounded-xl transition-all duration-150 shadow-md hover:shadow-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Send className="w-4 h-4" />
            <span>Start an Inquiry on Telegram</span>
            <ArrowRight className="w-4 h-4 ml-1 opacity-90" />
          </a>
          <p className="text-[11px] text-foreground-muted mt-3 font-mono">
            Direct response from commercial formulation desk • No obligation
          </p>
        </div>
      </div>
    </section>
  );
}
