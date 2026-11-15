import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | TradeConnect",
  description: "Information about how TradeConnect uses browser storage and cookies.",
};

export default function CookiesPage() {
  return (
    <div className="section-light section-spacing">
      <div className="container-custom max-w-2xl">
        <h1 className="text-3xl font-extrabold text-[var(--text)] mb-4">Cookie Policy</h1>
        <div className="space-y-4 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          <p>
            TradeConnect uses minimal, privacy-first browser storage solely for site functionality.
          </p>
          <h2 className="text-base font-bold text-[var(--text)] pt-2">1. Functional Storage</h2>
          <p>
            We use <code>localStorage</code> to remember your chosen theme preference (light or dark mode) and session state during multi-step quote requests.
          </p>
          <h2 className="text-base font-bold text-[var(--text)] pt-2">2. Performance Analytics</h2>
          <p>
            We use privacy-friendly Vercel Web Analytics, which does not track individuals across sites or collect personally identifiable advertising IDs.
          </p>
        </div>
      </div>
    </div>
  );
}
