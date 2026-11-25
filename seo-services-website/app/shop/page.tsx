import React from "react";
import Link from "next/link";
import { servicesData } from "@/content/services";
import { guestPostPackages } from "@/content/pricing";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight, ShoppingCart, Check } from "lucide-react";

export const metadata = buildMetadata({
  title: "Shop Link Building Packages & Services",
  description:
    "Browse our full catalog of off-page SEO packages, niche edits, and guest post bundles with transparent, fixed pricing.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <div className="flex flex-col w-full py-16 sm:py-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#1FA9E0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0]" />
            <span>Service Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            OffPage SEO Shop
          </h1>
          <p className="text-sm sm:text-base text-[#EBF1FF] leading-relaxed">
            All services are sold per package with fixed deliverables and zero recurring retainer locks. Select any product to customize your order brief.
          </p>
        </div>

        {/* Featured Packages */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Starter Guest Post Bundles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guestPostPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-6 rounded-2xl bg-[#06163b]/85 border border-white/10 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{pkg.name}</h3>
                    <span className="text-2xl font-mono font-bold text-[#1FA9E0]">
                      ${pkg.price}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{pkg.tagline}</p>
                  <ul className="space-y-2 text-xs text-[#EBF1FF] pt-2 border-t border-white/5">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1FA9E0]" />
                      <span>{pkg.linksCount} guest post link</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1FA9E0]" />
                      <span>{pkg.siteQuality}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <Link
                    href={`/order?package=${pkg.id}`}
                    className="w-full py-2.5 rounded-full bg-[#1FA9E0] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#34bbf0] transition-all"
                  >
                    <span>Configure Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Services */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Individual Link Building Solutions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((svc) => (
              <div
                key={svc.id}
                className="p-6 rounded-xl bg-[#06163b]/85 border border-white/10 hover:border-sky-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-sky-300/80">
                      {svc.metrics.da}
                    </span>
                    <span className="text-xs font-bold text-[#1FA9E0]">
                      From ${svc.startingPrice}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{svc.name}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2">{svc.tagline}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <Link
                    href={`/services/${svc.slug}`}
                    className="text-xs text-sky-300/80 hover:text-white"
                  >
                    Specs
                  </Link>
                  <Link
                    href={`/order?service=${svc.slug}`}
                    className="text-xs font-bold text-[#1FA9E0] hover:underline"
                  >
                    Order →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
