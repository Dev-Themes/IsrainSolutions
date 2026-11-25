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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guestPostPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-6 rounded-2xl bg-[#06163b]/85 flex flex-col justify-between border ${
                pkg.isPopular
                  ? "border-[#1FA9E0] shadow-[0_0_25px_rgba(31,169,224,0.2)]"
                  : "border-white/10"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                  <span className="text-xl font-mono font-extrabold text-[#1FA9E0]">
                    ${pkg.price}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{pkg.tagline}</p>
                <div className="pt-2 text-[11px] text-sky-300/80 space-y-1">
                  <div>✓ {pkg.linksCount} guest post link</div>
                  <div>✓ {pkg.siteQuality}</div>
                  <div>✓ {pkg.traffic}</div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5">
                <a
                  href="#brief-form"
                  className="w-full py-2 rounded-md bg-[#092252] hover:bg-[#1FA9E0] hover:text-black border border-sky-400/30 text-white font-bold text-xs uppercase tracking-wider text-center block transition-all"
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
