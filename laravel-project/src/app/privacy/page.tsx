import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TradeConnect",
  description: "TradeConnect privacy policy and data protection disclosures.",
};

export default function PrivacyPage() {
  return (
    <div className="section-light section-spacing">
      <div className="container-custom max-w-2xl">
        <h1 className="text-3xl font-extrabold text-[var(--text)] mb-4">Privacy Policy</h1>
        <div className="space-y-4 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          <p>
            TradeConnect is committed to protecting your privacy. This policy explains how we collect and use your contact and project information.
          </p>
          <h2 className="text-base font-bold text-[var(--text)] pt-2">1. Data We Collect</h2>
          <p>
            When you request a quote, we collect your name, phone number, email address, postal code, and project description solely to distribute your lead to responding local contractors.
          </p>
          <h2 className="text-base font-bold text-[var(--text)] pt-2">2. How Your Data is Shared</h2>
          <p>
            Your contact details are shared exclusively with up to 3 verified trade professionals who match your postcode and service category. We never sell your personal information to third-party telemarketers.
          </p>
        </div>
      </div>
    </div>
  );
}
