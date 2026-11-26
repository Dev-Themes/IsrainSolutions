"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldAlert, Award, RefreshCw, BarChart3 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/site-config";

const stats = [
  { value: "10+", label: "Years Experience", note: "Guiding link building since 2016" },
  { value: "2,000+", label: "Vetted Publishers", note: "Active niche & general sites" },
  { value: "100%", label: "Live URL Delivery", note: "Verified Ahrefs & Moz metrics" },
  { value: "4.9★", label: "Client Rating", note: "Across 500+ SEO campaigns" },
];

const pillars = [
  {
    number: "01.",
    title: "Real Topical Authority, Zero Private Networks",
    desc: "We perform real manual outreach to genuine webmasters. Every backlink is permanently integrated into the editorial body copy of a ranking website with authentic organic search traffic—never automated link farms or hidden PBN footprints.",
  },
  {
    number: "02.",
    title: "Transparent Verification & Live URL Reporting",
    desc: "No hidden links or redacted spreadsheets. You receive a comprehensive live report with indexed URLs, exact anchor text, verified Moz Domain Authority, and Ahrefs Domain Rating before your order is closed.",
  },
  {
    number: "03.",
    title: "100% Money-Back Guarantee & 12-Month Replacement",
    desc: "If any publication drops or an order cannot be completed within 12 to 24 hours of the agreed delivery date, you receive an immediate full refund. Plus, all links include a 12-month free replacement warranty.",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#00081d] relative overflow-hidden border-b border-sky-500/20">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-sky-500/5 blur-[150px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[170px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Statement & 4 Stat Counters (Slides in from Left) */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="left" delay={100} duration={800}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1FA9E0]/10 border border-[#1FA9E0]/30 text-[#1FA9E0] text-[11px] font-bold uppercase tracking-[0.14em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0] animate-pulse" />
                <span>Why Choose Us</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.14]">
                Built on trust.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8]">
                  Driven by expertise.
                </span>
              </h2>

              {/* ElementsKit Signature Separator */}
              <div className="flex items-center gap-1.5 my-4">
                <span className="h-[3px] w-14 rounded-full bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8]" />
                <span className="w-2 h-2 rounded-full bg-[#1FA9E0] shadow-[0_0_8px_#1FA9E0]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]/60" />
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal pt-1">
                Link building is the backbone of search visibility. Since 2016, Israin Solutions has executed high-conviction link outreach for digital brands, marketing agencies, and global businesses looking to dominate organic search.
              </p>
            </ScrollReveal>

            {/* 4 Animated Stat Counters Grid */}
            <ScrollReveal direction="left" delay={250} duration={800}>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sky-500/20">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#03000B] border border-sky-500/25 hover:border-sky-400 transition-all duration-200 group"
                  >
                    <span className="block text-2xl sm:text-3xl font-black text-white font-mono group-hover:text-[#1FA9E0] transition-colors">
                      {stat.value}
                    </span>
                    <span className="block text-xs font-bold text-sky-200/90 mt-1 uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">
                      {stat.note}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={400} duration={800}>
              <div className="pt-2">
                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-sky-400/40 bg-[#06173d]/60 hover:bg-[#0a2355] text-xs font-bold uppercase tracking-wider text-white transition-all"
                >
                  <span>Consult with Lead Link Strategist</span>
                  <ArrowRight className="w-4 h-4 text-[#1FA9E0]" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 3 Numbered Feature Blocks (Slides in from Right) */}
          <div className="lg:col-span-7 space-y-6">
            {pillars.map((pillar, idx) => (
              <ScrollReveal
                key={pillar.number}
                direction="right"
                delay={150 + idx * 150}
                duration={800}
              >
                <div className="p-6 sm:p-8 rounded-2xl bg-[#03000B] border border-sky-500/25 hover:border-sky-400 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(2,8,23,0.9),0_0_20px_rgba(31,169,224,0.18)] hover:-translate-x-1 group">
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Big Number Accent */}
                    <div className="text-2xl sm:text-3xl font-black font-mono text-[#1FA9E0] group-hover:scale-105 transition-transform flex-shrink-0">
                      {pillar.number}
                    </div>
                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
