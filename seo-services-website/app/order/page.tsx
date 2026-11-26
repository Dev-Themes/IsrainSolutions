import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { guestPostPackages } from "@/content/pricing";
import { BriefForm } from "@/components/forms/BriefForm";
import { buildMetadata } from "@/lib/seo";
import { ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "Order Link Building Packages",
  description:
    "Select a backlink package and submit your target URL and keywords. No account or sales call needed.",
  path: "/order",
});

export default function OrderPage() {
  return (
    <div className="flex flex-col w-full py-16 sm:py-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#1FA9E0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0]" />
            <span>Order Links</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Order links on real websites in your niche.
          </h1>
          <p className="text-sm sm:text-base text-[#EBF1FF] leading-relaxed">
            Choose a package tier or specify your custom needs below. Our team reviews your URL and begins publisher outreach immediately.
          </p>
        </div>

        {/* Package Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {guestPostPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative p-6 rounded-2xl bg-[#06163b]/85 flex flex-col justify-between border ${
                pkg.isPopular
                  ? "border-[#1FA9E0] shadow-[0_0_25px_rgba(31,169,224,0.25)] md:-translate-y-1.5"
                  : "border-white/10"
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 inset-x-0 mx-auto w-max px-3.5 py-0.5 rounded-full bg-[#1FA9E0] text-slate-950 text-[10px] font-black uppercase tracking-widest text-center shadow-[0_0_12px_rgba(31,169,224,0.5)] z-10">
                  Most Popular Choice
                </div>
              )}
              <div className="space-y-3">
                <div className="text-center pb-2 border-b border-sky-500/20">
                  <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                  <div className="text-2xl font-mono font-extrabold text-[#1FA9E0] my-1">
                    ${pkg.price}
                  </div>
                  <p className="text-xs text-slate-300 min-h-[32px]">{pkg.tagline}</p>
                </div>
                <div className="pt-2 text-[11px] text-sky-200/90 space-y-1.5">
                  <div className="flex items-center gap-2"><span>✓</span> <strong>{pkg.linksCount} guest post link{pkg.linksCount > 1 ? "s" : ""}</strong></div>
                  <div className="flex items-center gap-2"><span>✓</span> <span>{pkg.siteQuality}</span></div>
                  <div className="flex items-center gap-2"><span>✓</span> <span>{pkg.traffic}</span></div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5">
                <a
                  href="#brief-form"
                  className={`w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider text-center block transition-all shadow-sm ${
                    pkg.isPopular
                      ? "bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] text-slate-950 hover:brightness-110"
                      : "bg-[#092252] hover:bg-sky-500/20 border border-sky-400/30 text-white"
                  }`}
                >
                  Choose {pkg.name}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Brief Form Box */}
        <div id="brief-form" className="max-w-2xl mx-auto w-full p-6 sm:p-8 rounded-2xl bg-[#06163b]/85 border-2 border-sky-400/50 shadow-2xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white">Submit your order brief</h2>
            <p className="text-xs text-sky-300/80">
              Takes 3 minutes. Full refund guarantee within 12 to 24 hours of target date.
            </p>
          </div>
          <BriefForm />
        </div>
      </div>
    </div>
  );
}
