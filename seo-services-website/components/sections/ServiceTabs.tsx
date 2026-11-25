"use client";

import React, { useState } from "react";
import Link from "next/link";
import { servicesData } from "@/content/services";
import { ArrowRight, Check, MessageSquare } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const ServiceTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"guest-posts" | "links" | "content-pr">("guest-posts");

  const tabs = [
    {
      id: "guest-posts" as const,
      label: "Guest Post & Niche Edit",
      count: 4,
    },
    {
      id: "links" as const,
      label: "Links",
      count: 4,
    },
    {
      id: "content-pr" as const,
      label: "Content and PR",
      count: 2,
    },
  ];

  const filteredServices = servicesData.filter((s) => s.tab === activeTab);

  return (
    <section className="bg-gradient-to-b from-[#020817] via-[#041238] to-[#020817] py-20 lg:py-28 border-b border-sky-500/20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>Link building services</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Every backlink building service we offer.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Niche and general guest posts, niche edits, off-page SEO packages, blog comments, PBN and Wikipedia citations, plus press releases and SEO content writing. Each service is priced per order; monthly contracts are not required.
          </p>
        </div>

        {/* Tab Controls (ARIA Accessible) */}
        <div
          role="tablist"
          aria-label="Service Categories"
          className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 sm:pb-0 gap-2 mb-10 no-scrollbar"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2",
                  isActive
                    ? "bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] text-slate-950 font-black shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                    : "bg-[#06183d]/70 text-slate-200 border border-sky-500/30 hover:border-sky-400 hover:bg-[#092255]"
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full",
                    isActive ? "bg-slate-950/20 text-slate-950 font-black" : "bg-sky-500/20 text-sky-200"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Panel */}
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-xl bg-[#06163b]/85 border border-sky-400/35 hover:border-sky-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.22)] backdrop-blur-sm transition-all p-6 flex flex-col justify-between shadow-lg group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-sky-300 uppercase tracking-wider">
                    {service.metrics.da} {service.metrics.dr ? `/ ${service.metrics.dr}` : ""}
                  </span>
                  <span className="text-xs font-bold text-sky-300 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-400/40">
                    From ${service.startingPrice}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {service.tagline}
                  </p>
                </div>

                <ul className="space-y-1.5 pt-2 border-t border-sky-500/15">
                  {service.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-slate-200">
                      <Check className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-sky-500/20 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-bold text-white group-hover:text-sky-300 uppercase tracking-wider flex items-center gap-1 hover:underline"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/order?service=${service.slug}`}
                  className="text-[11px] font-semibold text-sky-300 hover:text-white"
                >
                  Order →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bespoke Link Advisory Station */}
        <div className="mt-14 rounded-2xl bg-gradient-to-br from-[#06183d]/95 via-[#082052]/90 to-[#041235]/95 border border-sky-400/40 p-6 sm:p-9 shadow-[0_20px_50px_rgba(2,8,23,0.9),0_0_30px_rgba(56,189,248,0.12)] backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Editorial Guidance */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-400/40 text-[11px] font-mono uppercase tracking-wider text-sky-300">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
                <span>Custom Link Profile Advisory</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Not sure which backlink tier your page needs?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Send your target page URL and primary keyword. Abdul Qadir and our manual outreach team analyze your current anchor text distribution, competitor link velocity, and topical relevance. We will tell you exactly which package fits—or give you honest advice if the page needs on-page work first.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Anchor ratio audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Topical niche match</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Zero-sales pressure</span>
                </div>
              </div>
            </div>

            {/* Right: Bespoke Action Panel */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 p-5 rounded-xl bg-[#030e26]/85 border border-sky-400/30 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-sky-500/20 text-xs">
                <span className="font-mono text-sky-300/80">Direct Response SLA:</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Within 24 business hours
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Discuss your target URL directly with Abdul Qadir on WhatsApp, or send a brief online without creating an account.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] hover:from-[#34bbf0] hover:to-[#7dd3fc] text-slate-950 font-black text-xs uppercase tracking-wider text-center transition-all shadow-[0_0_20px_rgba(56,189,248,0.35)] flex items-center justify-center gap-2"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/order"
                  className="py-3 px-4 rounded-lg border border-sky-400/50 hover:border-sky-300 hover:bg-sky-500/15 text-sky-200 hover:text-white font-bold text-xs uppercase tracking-wider text-center transition-all"
                >
                  Send Brief →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
