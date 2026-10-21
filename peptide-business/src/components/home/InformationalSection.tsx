"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Hash, FlaskConical, Snowflake, FileCheck, ArrowRight, ShieldCheck } from "lucide-react";

interface GuideTopic {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  tag: string;
  overview: string;
  keyPoints: { label: string; text: string }[];
  badge: string;
}

const TOPICS: GuideTopic[] = [
  {
    id: "cas-inci",
    icon: Hash,
    title: "CAS Registry & INCI Nomenclature",
    subtitle: "Precise chemical identification standards",
    tag: "Regulatory Identification",
    overview:
      "Chemical Abstracts Service (CAS) registry numbers provide unambiguous identification of specific molecular entities regardless of brand trade names. The International Nomenclature of Cosmetic Ingredients (INCI) ensures standardized ingredient declarations worldwide.",
    keyPoints: [
      {
        label: "CAS Specificity",
        text: "Ensures the exact stereochemical isomer and salt form is validated (e.g., CAS 89030-95-5 for GHK-Cu).",
      },
      {
        label: "Regulatory Compliance",
        text: "INCI names are mandatory on cosmetic product ingredient labels in the EU, US, and Asian regulatory jurisdictions.",
      },
      {
        label: "Traceability",
        text: "Enables independent cross-referencing against safety evaluations (CIR, SCCS) and international chemical inventories.",
      },
    ],
    badge: "Mandatory for Formulation Filing",
  },
  {
    id: "solubility",
    icon: FlaskConical,
    title: "Molecular Form & Solubility Profiles",
    subtitle: "Hydrophilic vs. lipopeptide compatibility",
    tag: "Phase Compatibility",
    overview:
      "Bioactive cosmetic peptides vary significantly in physical state. Understanding solubility boundaries prevents precipitation, turbidity, and phase destabilization during emulsion manufacturing.",
    keyPoints: [
      {
        label: "Lyophilized Powders vs. Solutions",
        text: "Pure lyophilized peptides offer extended shelf stability, whereas pre-dissolved solutions require strict cold chain compliance.",
      },
      {
        label: "Phase Incorporation",
        text: "Water-soluble peptides must be introduced below 40°C in the cool-down phase of emulsion production.",
      },
      {
        label: "Lipopeptide Conjugation",
        text: "Palmitoyl chains (e.g., Pal-GHK) increase lipophilicity, facilitating cellular penetration in oil-in-water emulsions.",
      },
    ],
    badge: "Direct Impact on Finished Stability",
  },
  {
    id: "storage",
    icon: Snowflake,
    title: "Handling & Storage Protocols",
    subtitle: "Preserving peptide tertiary structure",
    tag: "Preservation Dynamics",
    overview:
      "Peptide bonds and amino acid side chains are vulnerable to hydrolysis, oxidation, and photolysis. Adhering to controlled atmospheric storage preserves biological efficacy.",
    keyPoints: [
      {
        label: "Lyophilized State (Powder)",
        text: "Store at -20°C in desiccated, inert nitrogen atmosphere for up to 24 months of verified shelf life.",
      },
      {
        label: "Reconstituted Solution",
        text: "Store at 2°C–8°C for short-term use. Avoid repeated freeze-thaw cycles which shear peptide chains.",
      },
      {
        label: "Photolytic Protection",
        text: "Always shield from UV light exposure using amber Type-I borosilicate laboratory glassware.",
      },
    ],
    badge: "Cold-Chain Maintained",
  },
  {
    id: "purity",
    icon: FileCheck,
    title: "Purity & Analytical Documentation",
    subtitle: "HPLC, Mass Spectrometry, and COA analysis",
    tag: "Quality Verification",
    overview:
      "Cosmetic formulations demand high peptide purity with strictly documented impurity profiles. Standard analytical testing guarantees active peptide content without unreacted reagents or truncated sequences.",
    keyPoints: [
      {
        label: "HPLC (High-Performance Liquid Chromatography)",
        text: "Verifies chromatographic purity, typically ≥98.0% active peptide content by peak area percentage.",
      },
      {
        label: "MS (Mass Spectrometry)",
        text: "Confirms exact molecular weight (within ±1 Da) to prove the synthesized sequence matches theoretical mass.",
      },
      {
        label: "Certificate of Analysis (COA)",
        text: "Lot-specific document recording physical appearance, purity, peptide content, residual moisture, and heavy metal assays.",
      },
    ],
    badge: "Lot-Specific Testing Documented",
  },
];

export default function InformationalSection() {
  const [activeTab, setActiveTab] = useState<string>("cas-inci");

  const currentTopic = TOPICS.find((t) => t.id === activeTab) || TOPICS[0];
  const CurrentIcon = currentTopic.icon;

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-[#101513] border-t border-[#354239]/60">
      <div className="container-custom space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="editorial-badge">Technical Guide</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-foreground tracking-tight">
            Understanding Product Information
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
            Essential reference standards to evaluate peptide raw material specifications with precision and confidence.
          </p>
        </div>

        {/* 2-Column Split: Photography Left + Interactive Tabbed Guide Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Atmospheric Laboratory Photography */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] min-h-[360px] lg:min-h-[480px] rounded-2xl overflow-hidden bg-[#151B18] border border-[#354239] shadow-xl group">
              <Image
                src="/images/editorial/technical-guide.webp"
                alt="Precision cosmetic ingredient analysis workspace with transparent laboratory glassware and documentation"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101513] via-[#101513]/20 to-transparent pointer-events-none" />

              {/* Analytical Badge Overlay */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#222C26]/90 backdrop-blur-md border border-[#354239] space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-accent font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Documentation Standards
                </span>
                <p className="text-xs text-foreground font-medium">
                  All catalog listings are backed by verified analytical methodology and verifiable CAS identifiers.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Interactive Tabbed Educational Module */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            {/* Horizontal Tab Navigation */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-[#19211D] rounded-xl border border-[#354239]">
              {TOPICS.map((topic) => {
                const Icon = topic.icon;
                const isActive = activeTab === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setActiveTab(topic.id)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#222C26] text-accent border border-accent/40 shadow-sm font-semibold"
                        : "text-foreground-muted hover:text-foreground hover:bg-[#222C26]/50"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-accent" : "text-foreground-muted"}`} />
                    <span className="truncate">{topic.title.split("&")[0].trim()}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Panel with Detailed Content */}
            <div className="rounded-2xl border border-[#354239] bg-[#222C26] p-6 sm:p-8 space-y-6 shadow-xl transition-all">
              <div className="space-y-2 border-b border-[#354239] pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold px-2 py-0.5 rounded bg-accent/15 border border-accent/20">
                    {currentTopic.tag}
                  </span>
                  <span className="text-[11px] font-mono text-foreground-muted">
                    {currentTopic.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-medium text-foreground">
                  {currentTopic.title}
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  {currentTopic.overview}
                </p>
              </div>

              {/* Key Technical Takeaways */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold">
                  Technical Considerations
                </h4>
                <div className="space-y-2.5">
                  {currentTopic.keyPoints.map((point, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl bg-[#19211D] border border-[#354239] space-y-1"
                    >
                      <span className="text-xs font-semibold text-accent font-mono block">
                        • {point.label}
                      </span>
                      <p className="text-xs text-foreground-muted leading-relaxed">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel Footer Links */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <Link
                  href="#faqs"
                  className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover transition-colors font-semibold uppercase tracking-wider text-[11px] underline underline-offset-4"
                >
                  <span>Read Technical FAQs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] font-mono text-foreground-muted">
                  Topic {TOPICS.findIndex((t) => t.id === activeTab) + 1} of {TOPICS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
