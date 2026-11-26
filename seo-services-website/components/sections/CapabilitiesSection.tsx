"use client";

import React from "react";
import Link from "next/link";
import { Globe, FileText, Layers, Trophy, ShieldCheck, Newspaper, ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const capabilities = [
  {
    number: "01",
    title: "Niche Guest Posts",
    href: "/services/niche-guest-posts",
    price: "From $100",
    icon: Globe,
    desc: "100% manual outreach on real publications within your exact industry. Placed permanently with contextual body dofollow links.",
    features: [
      "Real organic traffic (5k+ monthly)",
      "Strict manual outreach (no spam farms)",
      "Editorial 700+ word article included",
      "Live URL & Ahrefs metrics report",
    ],
  },
  {
    number: "02",
    title: "Curated Niche Edits",
    href: "/services/niche-edits",
    price: "From $50",
    icon: Layers,
    desc: "Immediate link insertion into existing, aged articles that are already indexed and ranking for topical keywords on Google.",
    features: [
      "Aged articles with established rank",
      "Immediate search indexing velocity",
      "Natural in-content editorial fit",
      "100% permanent dofollow placement",
    ],
  },
  {
    number: "03",
    title: "Off-Page SEO Packages",
    href: "/services/off-page-seo-packages",
    price: "From $50",
    icon: Trophy,
    desc: "Complete multi-tier authority architectures designed to power competitive keywords while maintaining natural anchor distribution.",
    features: [
      "Tier 1 guest posts + Tier 2 syndication",
      "Balanced brand & topical anchors",
      "Transparent spreadsheet delivery",
      "Custom URL strategy consultation",
    ],
  },
  {
    number: "04",
    title: "Casino & iGaming Posts",
    href: "/services/casino-igaming-guest-posts",
    price: "From $30",
    icon: SparklesIcon,
    desc: "Specialized vetted publisher network that explicitly accepts casino, sports betting, gambling, and crypto industry links.",
    features: [
      "Dedicated gambling-friendly publishers",
      "DA 25 to DA 70+ vetted domains",
      "Permanent placement guarantee",
      "Discreet and secure order processing",
    ],
  },
  {
    number: "05",
    title: "PBN Authority Links",
    href: "/services/pbn-links",
    price: "From $10",
    icon: ShieldCheck,
    desc: "Aged domain backlinks with zero digital footprint, distinct A/B/C class IPs, and pristine historic backlink profiles.",
    features: [
      "Zero footprint hosting across unique IPs",
      "High DR/DA aged clean domains",
      "Sidebar & blogroll options available",
      "Transparent risk and reward advisory",
    ],
  },
  {
    number: "06",
    title: "Press Release Syndication",
    href: "/services/press-releases",
    price: "From $100",
    icon: Newspaper,
    desc: "Broad-spectrum brand citations and entity proof syndication across 100+ recognized news, finance, and digital media publications.",
    features: [
      "100+ major media syndications",
      "Google News & Knowledge Graph signals",
      "Professional press release writing",
      "Complete live pickup URL report",
    ],
  },
];

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  );
}

export const CapabilitiesSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#010615] relative overflow-hidden border-b border-sky-500/20">
      {/* Background Subtle Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-500/5 blur-[160px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with ElementsKit Separator */}
        <ScrollReveal direction="up" delay={100}>
          <SectionHeading
            eyebrow="Our Capabilities"
            title={
              <>
                Link Building &amp; Search Authority{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8]">
                  Solutions
                </span>
              </>
            }
            subtitle="Built on manual outreach, genuine publisher relationships, and uncompromising editorial standards. Select any solution to inspect real metrics and deliverables."
          />
        </ScrollReveal>

        {/* 6 Capabilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <ScrollReveal
                key={cap.number}
                direction="up"
                delay={150 + idx * 80}
                duration={700}
                className="h-full"
              >
                <div className="group relative h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#03000B] border border-sky-500/25 hover:border-sky-400 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(2,8,23,0.9),0_0_25px_rgba(31,169,224,0.22)] hover:-translate-y-1">
                  
                  <div>
                    {/* Top Header: Icon + Number & Price */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#06173d] border border-sky-500/30 flex items-center justify-center text-[#1FA9E0] group-hover:bg-[#1FA9E0] group-hover:text-slate-950 transition-colors duration-300 shadow-[0_0_15px_rgba(31,169,224,0.15)]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-400/30">
                          {cap.price}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-500">
                          {cap.number}.
                        </span>
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors mb-3">
                      {cap.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      {cap.desc}
                    </p>

                    {/* Feature Bullets */}
                    <ul className="space-y-2 mb-6 border-t border-sky-500/15 pt-4">
                      {cap.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-sky-200/80">
                          <Check className="w-3.5 h-3.5 text-[#1FA9E0] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action Link */}
                  <Link
                    href={cap.href}
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-sky-500/15 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#1FA9E0] transition-colors"
                  >
                    <span>Explore Service Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Hub CTA */}
        <ScrollReveal direction="up" delay={700}>
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-sky-400/40 bg-[#06163b]/70 hover:bg-[#0a2355] hover:border-sky-300 text-xs font-bold text-white uppercase tracking-wider transition-all"
            >
              <span>View All 10 Link Building Capabilities &amp; Pricing</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#1FA9E0]" />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
