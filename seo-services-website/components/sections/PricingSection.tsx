"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { guestPostPackages } from "@/content/pricing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const PricingSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-[#00081d] via-[#030e2c] to-[#00081d] py-20 lg:py-28 border-b border-sky-500/20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-500/5 blur-[160px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with ElementsKit Separator */}
        <ScrollReveal direction="up" delay={100}>
          <SectionHeading
            eyebrow="Transparent Packages"
            title={
              <>
                Curated Guest Post{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8]">
                  Packages
                </span>
              </>
            }
            subtitle="Transparent one-time investment with zero recurring retainers. Every placement is verified permanently on DA &amp; DR 30+ sites with 5,000+ organic traffic."
            align="center"
          />
        </ScrollReveal>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {guestPostPackages.map((pkg, idx) => (
            <ScrollReveal
              key={pkg.id}
              direction="up"
              delay={150 + idx * 100}
              duration={700}
              className="h-full"
            >
              <div
                className={`relative rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-between transition-all duration-300 backdrop-blur-sm ${
                  pkg.isPopular
                    ? "bg-gradient-to-b from-[#061e47] via-[#041638] to-[#020b22] border-2 border-[#1FA9E0] shadow-[0_15px_50px_rgba(2,8,23,0.95),0_0_35px_rgba(31,169,224,0.3)] md:-translate-y-2 hover:shadow-[0_20px_60px_rgba(2,8,23,0.95),0_0_45px_rgba(31,169,224,0.4)]"
                    : "bg-[#03000B] border border-sky-500/25 hover:border-sky-400 hover:shadow-[0_10px_35px_rgba(2,8,23,0.9),0_0_20px_rgba(31,169,224,0.18)]"
                }`}
              >
                {/* Popular Ribbon - Bulletproof horizontal center */}
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 inset-x-0 mx-auto w-max px-4 py-1 rounded-full bg-[#1FA9E0] text-slate-950 text-[11px] font-black uppercase tracking-widest text-center shadow-[0_0_15px_rgba(31,169,224,0.6)] z-10">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                    <p className="text-xs text-slate-300 mt-1.5 min-h-[32px] leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  <div className="flex items-baseline justify-center gap-1.5 pb-4 border-b border-sky-500/20">
                    <span className="text-4xl font-extrabold text-white font-mono">${pkg.price}</span>
                    <span className="text-xs text-sky-300 font-mono">/ one-time</span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 text-xs text-slate-200">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#1FA9E0] flex-shrink-0" />
                      <span><strong>{pkg.linksCount} guest post link{pkg.linksCount > 1 ? "s" : ""}</strong></span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#1FA9E0] flex-shrink-0" />
                      <span>DA 30+ to DA 60+ real niche websites</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#1FA9E0] flex-shrink-0" />
                      <span>700+ word human-written article per link</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#1FA9E0] flex-shrink-0" />
                      <span>Ahrefs organic traffic 5,000+ verified</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#1FA9E0] flex-shrink-0" />
                      <span>Permanent editorial dofollow context</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#1FA9E0] flex-shrink-0" />
                      <span>Guaranteed turnaround in 3–7 business days</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#1FA9E0] flex-shrink-0" />
                      <span>Live spreadsheet report with metrics</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-sky-500/20 space-y-2">
                  <Link
                    href={`/order?package=${pkg.id}`}
                    className={`w-full py-3 rounded-lg font-bold text-xs uppercase tracking-wider text-center transition-all duration-200 block shadow-sm ${
                      pkg.isPopular
                        ? "bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] text-slate-950 hover:brightness-110 shadow-[0_0_20px_rgba(31,169,224,0.3)]"
                        : "border border-sky-400/40 text-white hover:bg-sky-500/15 hover:border-sky-300"
                    }`}
                  >
                    Order {pkg.name} →
                  </Link>
                  <p className="text-[11px] text-center text-sky-200/60">
                    100% money-back refund guarantee
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Custom requirements link */}
        <ScrollReveal direction="up" delay={500}>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-sky-300 hover:text-white transition-colors"
            >
              <span>Need a custom bulk order or enterprise agency white-label pricing?</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#1FA9E0]" />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
