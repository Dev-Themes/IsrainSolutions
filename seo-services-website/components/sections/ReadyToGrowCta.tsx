"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const ReadyToGrowCta: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-[#010615] via-[#020b24] to-[#000511] relative overflow-hidden border-b border-sky-500/25">
      {/* Radial Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-500/10 blur-[150px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal direction="up" delay={100}>
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1FA9E0]/10 border border-[#1FA9E0]/30 text-[#1FA9E0] text-xs font-bold uppercase tracking-[0.14em] mb-4 shadow-[0_0_20px_rgba(31,169,224,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0] animate-pulse" />
            <span>Start Your Campaign</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.14] max-w-3xl mx-auto">
            Ready to Grow?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA9E0] via-[#38bdf8] to-[#bae6fd]">
              Let’s Get Started Today!
            </span>
          </h2>

          {/* ElementsKit Separator */}
          <div className="flex items-center justify-center gap-1.5 my-5">
            <span className="h-[3px] w-14 rounded-full bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8]" />
            <span className="w-2 h-2 rounded-full bg-[#1FA9E0] shadow-[0_0_8px_#1FA9E0]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]/60" />
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            Connect with our link building specialists today. Whether you need a single high-impact niche guest post or a full-scale white-label authority campaign, we deliver verified live URLs on time, every time.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all duration-200 shadow-[0_0_25px_rgba(31,169,224,0.35)] active:scale-95 group"
            >
              <span>Order Links Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-sky-400/40 bg-[#06173d]/70 text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0a2355] hover:border-sky-300 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Direct WhatsApp Discussion</span>
            </a>
          </div>

          {/* Security & Guarantee Seal */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Full 100% money-back guarantee within 12–24h if agreed delivery SLA is missed</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
