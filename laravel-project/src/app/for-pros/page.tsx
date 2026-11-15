import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Join as a Verified Trade Professional | TradeConnect",
  description: "Receive qualified local trade leads directly in your postal code radius. Zero commission deductions and no lock-in contracts.",
};

export default function ForProsPage() {
  return (
    <div className="flex flex-col">
      <section className="section-light section-spacing border-b border-[var(--line)]">
        <div className="container-custom max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
            Contractor Roster
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text)] mb-3 leading-tight">
            Grow your trade business with verified local homeowner leads.
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-6">
            Join over 8,780+ vetted trade professionals in the UK and USA. Receive genuine, targeted repair and installation requests from customers in your chosen postal radius.
          </p>

          <Link
            href="/auth/register?role=pro"
            className="px-6 py-3.5 rounded-[var(--radius)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white font-bold text-sm inline-flex items-center space-x-1.5 shadow-xs"
          >
            <span>Apply as a Trade Professional</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      <section className="section-sand section-spacing">
        <div className="container-custom max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text)] mb-6">
            Why Contractors Choose TradeConnect
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-[var(--text)]">
            <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] flex items-start space-x-3">
              <Check className="w-5 h-5 text-[var(--pine-accent)] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">No Commission Taken from Completed Work</strong>
                <span className="text-[var(--text-muted)]">You quote your standard hourly and day rates. We do not deduct percentage cuts or fees from your invoice.</span>
              </div>
            </div>

            <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] flex items-start space-x-3">
              <Check className="w-5 h-5 text-[var(--pine-accent)] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Custom Postcode Radius</strong>
                <span className="text-[var(--text-muted)]">Only receive leads within the specific travel radius you set. Never waste time on jobs outside your coverage territory.</span>
              </div>
            </div>

            <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] flex items-start space-x-3">
              <Check className="w-5 h-5 text-[var(--pine-accent)] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Verified Trust Badge</strong>
                <span className="text-[var(--text-muted)]">Showing your active insurance and accreditation badge immediately gives homeowners confidence to accept your quote.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
