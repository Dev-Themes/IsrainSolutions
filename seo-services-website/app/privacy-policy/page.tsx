import React from "react";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for OffPage SEO Services, an agency division of Israin Solutions.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col w-full py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm text-[#EBF1FF] leading-relaxed">
        <div className="space-y-3 border-b border-white/10 pb-6">
          <span className="text-xs font-bold text-[#1FA9E0] uppercase tracking-widest">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="text-xs text-sky-300/80">
            Last updated: November 25, 2026 · {siteConfig.brandName}
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
          <p className="text-slate-300">
            We collect personal information directly when you submit a link building brief or contact inquiry. This includes your name, email address, website URL, target keywords, and any notes you provide. We do not require account registration or store unnecessary telemetry.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. How We Use Your Details</h2>
          <p className="text-slate-300">
            Your details are used solely to evaluate your website, formulate backlink placement recommendations, communicate delivery reports, and process support inquiries. We never sell, lease, or distribute your email or website data to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Third-Party Publisher Outreach</h2>
          <p className="text-slate-300">
            When executing guest posts or niche edits, we share only the target URL and contextual anchor text required for editorial inclusion with host webmasters. We do not disclose client billing or personal identity information to host publishers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Contact & Queries</h2>
          <p className="text-slate-300">
            For questions regarding our privacy practices or to request data deletion, contact us at:{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-[#1FA9E0] underline">
              {siteConfig.contact.email}
            </a>{" "}
            or write to {siteConfig.parentCompany.legalName}, {siteConfig.contact.address}.
          </p>
        </section>
      </div>
    </div>
  );
}
