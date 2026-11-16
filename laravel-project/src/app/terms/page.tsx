import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getSiteUrl } from "@/lib/site-config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Terms of Service & Marketplace Agreement | TradeConnect",
  description:
    "Terms and conditions for homeowners and trade professionals using the TradeConnect marketplace across the UK and US.",
  alternates: {
    canonical: `${siteUrl}/terms`,
    languages: {
      "en-GB": `${siteUrl}/terms`,
      "en-US": `${siteUrl}/terms`,
      "x-default": `${siteUrl}/terms`,
    },
  },
  openGraph: {
    title: "Terms of Service | TradeConnect",
    description:
      "Terms and conditions for homeowners and trade professionals using TradeConnect.",
    url: `${siteUrl}/terms`,
    siteName: "TradeConnect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | TradeConnect",
    description:
      "Terms and conditions for homeowners and trade professionals using TradeConnect.",
  },
};

export default function TermsPage() {
  return (
    <div className="section-light section-spacing">
      <div className="container-custom max-w-3xl">
        <Breadcrumbs items={[{ label: "Terms of Service" }]} />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-3 tracking-tight">
          Terms of Service &amp; User Agreement
        </h1>
        <p className="text-xs text-[var(--text-muted)] mb-6">
          Last revised: 10 November 2026 &middot; Governing laws of England &amp; Wales / State of Texas
        </p>

        <div className="space-y-6 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-[var(--text)] mb-2">1. The Marketplace Role</h2>
            <p>
              TradeConnect operates as an introductory technology directory connecting residential and commercial property owners with independent, verified trade professionals. TradeConnect is not a general contractor, building firm, or employer of any tradesperson listed on the platform. All contracts, quotes, scope warranties, and payments for physical labor and materials exist solely between the customer and the independent contractor.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--text)] mb-2">2. Trade Verification Standards &amp; On-Site Due Diligence</h2>
            <p>
              While TradeConnect performs initial and annual validation of public liability insurance (£1M+ / $1M+) and official regulatory trade licenses (Gas Safe Register, NICEIC, NAPIT, TDLR), homeowners remain advised to verify physical identification cards on-site and ensure formal written estimates are signed prior to commencement of demolition or building work.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--text)] mb-2">3. Contractor Conduct &amp; Lead Credit Terms</h2>
            <p>
              Contractors agree to maintain active insurance, respond professionally within 2 hours to claimed homeowner leads, and honor the terms of our Lead Refund Guarantee. Any contractor found manipulating reviews, sub-contracting unverified personnel without disclosure, or carrying expired liability cover will be subject to immediate platform suspension.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--text)] mb-2">4. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law (including the UK Consumer Rights Act 2015), TradeConnect shall not be liable for indirect, incidental, or consequential damages resulting from defective workmanship, contractor delays, or property disputes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
