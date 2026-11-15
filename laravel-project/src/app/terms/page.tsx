import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | TradeConnect",
  description: "Terms and conditions for homeowners and trade professionals using TradeConnect.",
};

export default function TermsPage() {
  return (
    <div className="section-light section-spacing">
      <div className="container-custom max-w-2xl">
        <h1 className="text-3xl font-extrabold text-[var(--text)] mb-4">Terms of Service</h1>
        <div className="space-y-4 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          <p>
            By using TradeConnect to request quotes or register as a contractor, you agree to these terms.
          </p>
          <h2 className="text-base font-bold text-[var(--text)] pt-2">1. Quotes and Contracts</h2>
          <p>
            TradeConnect acts as an introductory directory. All pricing, guarantees, and contracts for work are made directly between the homeowner and the independent trade contractor.
          </p>
          <h2 className="text-base font-bold text-[var(--text)] pt-2">2. Trade Verification</h2>
          <p>
            While we verify accreditation and insurance upon registration and annual renewal, homeowners should always inspect physical licensing cards on-site prior to work commencement.
          </p>
        </div>
      </div>
    </div>
  );
}
