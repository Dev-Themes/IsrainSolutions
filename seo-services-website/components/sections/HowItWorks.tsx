"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Search, Layers, FileEdit, FileSpreadsheet, MessageSquare } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/site-config";

const processSteps = [
  {
    step: "01",
    title: "URL Audit & Anchor Strategy",
    icon: Search,
    desc: "You submit your target landing page and preferred keyword themes. We analyze your existing anchor distribution, topical authority gaps, and competitors to plan a natural, safe campaign.",
    deliverable: "Anchor & Competitor Gap Review",
  },
  {
    step: "02",
    title: "Publisher Matching & Approval",
    icon: Layers,
    desc: "We hand-match your niche against our catalog of 2,000+ active publishers. You inspect domain metrics (Ahrefs DR, Moz DA, organic traffic) and pre-approve sites before writing begins.",
    deliverable: "Pre-Approved Placement List",
  },
  {
    step: "03",
    title: "Editorial Content Crafting",
    icon: FileEdit,
    desc: "Professional in-house writers craft an authentic, informative 700+ word article relevant to the host site's readership. Your backlink is embedded naturally in the editorial body.",
    deliverable: "Original 700+ Word Article",
  },
  {
    step: "04",
    title: "Live URL Verification & Report",
    icon: FileSpreadsheet,
    desc: "Once published and indexed, we verify dofollow attribution and permanent placement. You receive an organized Google Sheets report with live URLs and Moz/Ahrefs metrics.",
    deliverable: "Live Verified URL Spreadsheet",
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="bg-[#00081d] py-20 lg:py-28 border-b border-sky-500/20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-500/5 blur-[160px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={100}>
          <SectionHeading
            align="center"
            eyebrow="Working Process"
            title={
              <>
                How Our Link Building{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8]">
                  Campaigns Work
                </span>
              </>
            }
            subtitle="A transparent, 4-stage execution model designed to acquire high-authority backlinks while maintaining natural anchor safety."
          />
        </ScrollReveal>

        {/* 4 Process Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {processSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={item.step}
                direction="up"
                delay={150 + idx * 100}
                duration={700}
                className="h-full"
              >
                <div className="h-full flex flex-col justify-between p-6 rounded-2xl bg-[#03000B] border border-sky-500/25 hover:border-sky-400 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(2,8,23,0.9),0_0_20px_rgba(31,169,224,0.18)] hover:-translate-y-1 group">
                  <div>
                    {/* Step Number & Icon Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-sky-500/15 mb-5">
                      <span className="text-2xl font-black font-mono text-[#1FA9E0] group-hover:scale-105 transition-transform">
                        {item.step}.
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-[#06173d] border border-sky-500/30 flex items-center justify-center text-[#1FA9E0] group-hover:bg-[#1FA9E0] group-hover:text-slate-950 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors mb-3">
                      {item.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Deliverable Badge */}
                  <div className="pt-5 mt-5 border-t border-sky-500/15">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                      Deliverable:
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1FA9E0]" />
                      {item.deliverable}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* WhatsApp & Consultation Bridge Bar */}
        <ScrollReveal direction="up" delay={550}>
          <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-[#06173d]/50 border border-sky-500/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Have questions about specific niches or custom order turnaround times?
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Our link directors discuss anchor safety, publisher metrics, and volume discounts directly.
              </p>
            </div>
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_15px_rgba(37,211,102,0.25)]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
