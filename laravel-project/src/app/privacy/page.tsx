import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getSiteUrl } from "@/lib/site-config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Privacy Policy & Data Protection | UK GDPR & US Privacy",
  description:
    "TradeConnect privacy policy and data protection disclosures under UK GDPR, Data Protection Act 2018, and US State Privacy Laws (CCPA/TDPSA).",
  alternates: {
    canonical: `${siteUrl}/privacy`,
    languages: {
      "en-GB": `${siteUrl}/privacy`,
      "en-US": `${siteUrl}/privacy`,
      "x-default": `${siteUrl}/privacy`,
    },
  },
  openGraph: {
    title: "Privacy Policy | TradeConnect",
    description:
      "TradeConnect privacy policy and data protection disclosures under UK GDPR and US State Privacy Laws.",
    url: `${siteUrl}/privacy`,
    siteName: "TradeConnect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | TradeConnect",
    description:
      "TradeConnect privacy policy and data protection disclosures.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="section-light section-spacing">
      <div className="container-custom max-w-3xl">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-3 tracking-tight">
          Privacy Policy &amp; Data Protection Disclosures
        </h1>
        <p className="text-xs text-[var(--text-muted)] mb-6">
          Last revised: 10 November 2026 &middot; TradeConnect Network Ltd &amp; TradeConnect Inc.
        </p>

        <div className="space-y-6 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-[var(--text)] mb-2">1. Introduction &amp; Data Controllers</h2>
            <p>
              TradeConnect Network Ltd (registered in England &amp; Wales No. 14829103) and TradeConnect Inc. (Delaware File No. 7192841) operate as joint data controllers under the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and applicable US State Privacy Laws, including the California Consumer Privacy Act (CCPA/CPRA) and Texas Data Privacy and Security Act (TDPSA).
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--text)] mb-2">2. Personal Information We Collect</h2>
            <p>
              When you post a job, register as a trade professional, or contact our support team, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Homeowners: Name, telephone number, email address, postal code / ZIP code, and scope of requested works.</li>
              <li>Trade Professionals: Director/sole trader name, verified trading entity details, phone, email, public liability insurance policies, regulatory certification numbers (e.g. Gas Safe, NICEIC, EPA), and government-issued photo ID.</li>
              <li>Technical Telemetry: IP addresses, device identifiers, and browser parameters to prevent fraudulent duplicate job postings and bot abuse.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--text)] mb-2">3. Purpose and Legal Basis of Processing</h2>
            <p>
              Under UK GDPR Article 6, we process your personal data under the lawful basis of contractual necessity (matching homeowner requests with certified local contractors) and our legitimate interest in fraud detection, verification, and service quality control.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--text)] mb-2">4. Distribution of Contact Data</h2>
            <p>
              Your contact details are strictly disclosed only to up to 3 verified, insured trade professionals who match your postcode territory and service category. We never sell, rent, or trade your personal information to third-party telemarketing firms or unaffiliated advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--text)] mb-2">5. Your Statutory Rights</h2>
            <p>
              Under UK GDPR and US State Privacy Laws, you have the right to request access to your personal data, rectify inaccurate records, request erasure (&ldquo;right to be forgotten&rdquo;), or lodge a complaint with the UK Information Commissioner&apos;s Office (ICO) or relevant US State Attorney General. To exercise these rights, email <a href="mailto:privacy@tradeconnect.com" className="text-[var(--accent)] font-semibold hover:underline">privacy@tradeconnect.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
