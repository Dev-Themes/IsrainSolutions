import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getSiteUrl } from "@/lib/site-config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Cookie Policy & Local Storage Disclosures | TradeConnect",
  description:
    "Information regarding TradeConnect's privacy-first browser storage and minimal functional cookies under PECR and ePrivacy directives.",
  alternates: {
    canonical: `${siteUrl}/cookies`,
    languages: {
      "en-GB": `${siteUrl}/cookies`,
      "en-US": `${siteUrl}/cookies`,
      "x-default": `${siteUrl}/cookies`,
    },
  },
  openGraph: {
    title: "Cookie Policy | TradeConnect",
    description:
      "Information about how TradeConnect uses browser storage and cookies.",
    url: `${siteUrl}/cookies`,
    siteName: "TradeConnect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | TradeConnect",
    description:
      "Information about how TradeConnect uses browser storage and cookies.",
  },
};

export default function CookiesPage() {
  return (
    <div className="section-light section-spacing">
      <div className="container-custom max-w-3xl">
        <Breadcrumbs items={[{ label: "Cookie Policy" }]} />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-3 tracking-tight">
          Cookie Policy &amp; Storage Transparency
        </h1>
        <p className="text-xs text-[var(--text-muted)] mb-6">
          Last revised: 10 November 2026 &middot; Compliant with PECR &amp; UK ePrivacy Regulations
        </p>

        <div className="space-y-6 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-[var(--text)] mb-2">1. What Are Cookies &amp; Local Storage?</h2>
            <p>
              Cookies and browser local storage are small text files or key-value data stored on your device when you browse websites. They enable the site to remember your preferences (such as light or dark appearance mode and active country selection) across page navigation.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--text)] mb-2">2. How TradeConnect Uses Storage</h2>
            <p>
              TradeConnect operates on a strictly minimal, privacy-first technical footprint. We do not use third-party cross-site advertising tracking cookies or invasive profiling pixels.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left border border-[var(--line)] rounded text-xs">
                <thead className="bg-[var(--bg-alt)] border-b border-[var(--line)]">
                  <tr>
                    <th className="p-2.5 font-bold text-[var(--text)]">Key / Name</th>
                    <th className="p-2.5 font-bold text-[var(--text)]">Type</th>
                    <th className="p-2.5 font-bold text-[var(--text)]">Duration</th>
                    <th className="p-2.5 font-bold text-[var(--text)]">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line-subtle)]">
                  <tr>
                    <td className="p-2.5 font-mono text-[var(--text)]">tradeconnect_theme</td>
                    <td className="p-2.5">localStorage</td>
                    <td className="p-2.5">Persistent</td>
                    <td className="p-2.5 text-[var(--text-muted)]">Stores user preference for light vs dark mode.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono text-[var(--text)]">tradeconnect_preferred_country</td>
                    <td className="p-2.5">localStorage</td>
                    <td className="p-2.5">Persistent</td>
                    <td className="p-2.5 text-[var(--text-muted)]">Remembers UK or US market hub selection.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono text-[var(--text)]">tradeconnect_user</td>
                    <td className="p-2.5">localStorage</td>
                    <td className="p-2.5">Session / Auth</td>
                    <td className="p-2.5 text-[var(--text-muted)]">Preserves authenticated contractor or homeowner login token.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--text)] mb-2">3. Analytics &amp; Performance</h2>
            <p>
              We utilize privacy-centric Vercel Web Analytics to measure site speed and server response times. This tool does not track individual user identities across external websites or collect personally identifiable advertising IDs.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
