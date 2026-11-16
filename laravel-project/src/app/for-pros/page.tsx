import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Coins,
  RefreshCw,
  FileCheck,
  UserCheck,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getSiteUrl } from "@/lib/site-config";
import { UkFlagIcon, UsFlagIcon } from "@/components/ui/flag-icon";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Join as a Verified Trade Professional | Local Leads",
  description:
    "Grow your trade business with verified UK and US homeowner leads. Transparent pay-as-you-go lead credits, zero commission deductions, and automatic refund guarantee for invalid contacts.",
  alternates: {
    canonical: `${siteUrl}/for-pros`,
    languages: {
      "en-GB": `${siteUrl}/for-pros`,
      "en-US": `${siteUrl}/for-pros`,
      "x-default": `${siteUrl}/for-pros`,
    },
  },
  openGraph: {
    title: "Join as a Verified Trade Professional | TradeConnect",
    description:
      "Direct homeowner leads in your chosen postal radius. Zero commissions on completed jobs and 100% lead credit refund guarantee.",
    url: `${siteUrl}/for-pros`,
    siteName: "TradeConnect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join as a Verified Trade Professional | TradeConnect",
    description:
      "Grow your trade business with verified UK and US homeowner leads.",
  },
};

export default function ForProsPage() {
  return (
    <div className="flex flex-col">
      <div className="container-custom pt-4">
        <Breadcrumbs items={[{ label: "For Trade Professionals" }]} />
      </div>

      {/* Hero Section */}
      <section className="section-light section-spacing border-b border-[var(--line)]">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-light)] border border-[var(--line)] text-xs font-semibold text-[var(--pine-accent)] mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--pine-accent)] animate-pulse" />
            <span>Contractor Network &middot; UK &amp; USA Expansion</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text)] mb-4 leading-tight tracking-tight">
            Grow your trade business with genuine local homeowner leads.
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-6 max-w-2xl">
            Join 8,784+ verified tradespeople across the UK and USA. Receive targeted repair, replacement, and installation requests matched directly to your postcode radius. Zero percentage commissions taken from your completed invoices.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/auth/register?role=pro"
              className="px-6 py-3.5 rounded-[var(--radius)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white font-bold text-sm inline-flex items-center space-x-1.5 shadow-xs transition-colors"
            >
              <span>Apply as a Trade Professional</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link
              href="/pros"
              className="px-5 py-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] font-semibold text-sm hover:bg-[var(--bg-alt)] transition-colors"
            >
              View Active Pro Directory
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[var(--line-subtle)] text-xs">
            <div>
              <span className="block font-extrabold text-lg text-[var(--text)]">8,784+</span>
              <span className="text-[var(--text-muted)]">Verified Pros Registered</span>
            </div>
            <div>
              <span className="block font-extrabold text-lg text-[var(--text)]">0% Cut</span>
              <span className="text-[var(--text-muted)]">Commission on Invoices</span>
            </div>
            <div>
              <span className="block font-extrabold text-lg text-[var(--text)]">24-48h</span>
              <span className="text-[var(--text-muted)]">Verification Speed</span>
            </div>
            <div>
              <span className="block font-extrabold text-lg text-[var(--text)]">100%</span>
              <span className="text-[var(--text-muted)]">Lead Refund Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* How the Lead-Credit Model Works */}
      <section className="section-sand section-spacing border-b border-[var(--line)]">
        <div className="container-custom max-w-4xl">
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
              Fair &amp; Transparent Model
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] mt-1">
              How the Lead Credit Model Works
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
              Unlike traditional lead generation directories that charge heavy monthly subscriptions or take a 15-20% cut of your hard-earned revenue, TradeConnect operates on a transparent, pay-as-you-go credit system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--surface)] p-6 rounded-[var(--radius)] border border-[var(--line)] shadow-soft">
              <div className="w-10 h-10 rounded-full bg-[var(--brand-light)] text-[var(--pine-accent)] flex items-center justify-center mb-4">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-[var(--text)] mb-2">
                Pay Only for Leads You Want
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Browse incoming job notifications in your area for free. Review the job description, urgency, and postcode before deciding to purchase homeowner contact details using credits (&pound;8-&pound;22 / $12-$30 average).
              </p>
            </div>

            <div className="bg-[var(--surface)] p-6 rounded-[var(--radius)] border border-[var(--line)] shadow-soft">
              <div className="w-10 h-10 rounded-full bg-[var(--brand-light)] text-[var(--pine-accent)] flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-[var(--text)] mb-2">
                100% Refund for Bad Leads
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                If a homeowner provides an invalid telephone number, has already hired someone prior to lead release, or is outside your defined trade specialty, report it within 72 hours for an immediate full credit refund.
              </p>
            </div>

            <div className="bg-[var(--surface)] p-6 rounded-[var(--radius)] border border-[var(--line)] shadow-soft">
              <div className="w-10 h-10 rounded-full bg-[var(--brand-light)] text-[var(--pine-accent)] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-[var(--text)] mb-2">
                Max 3 Pros Per Request
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                We strictly cap quote distribution to a maximum of 3 contractors per homeowner request. You will never compete against dozens of contractors racing to underbid your professional rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding & Verification Criteria */}
      <section className="section-light section-spacing border-b border-[var(--line)]">
        <div className="container-custom max-w-4xl">
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
              Quality Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] mt-1">
              Onboarding Requirements &amp; Verification Checks
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
              To protect the integrity of our platform and maintain homeowner trust, all applicants undergo a four-tier manual review process within 24 to 48 hours.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] flex items-start space-x-3.5">
              <FileCheck className="w-5 h-5 text-[var(--pine-accent)] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-sm text-[var(--text)]">
                  1. Public Liability / General Liability Insurance
                </strong>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  UK pros must provide a valid policy certificate showing a minimum of &pound;1,000,000 in public liability cover (&pound;2,000,000+ recommended). US contractors must submit active Certificate of Insurance (COI) with $1,000,000+ general liability.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] flex items-start space-x-3.5">
              <ShieldCheck className="w-5 h-5 text-[var(--pine-accent)] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-sm text-[var(--text)]">
                  2. Mandatory Trade Certification Proof
                </strong>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  Gas and boiler engineers must provide their 6-digit Gas Safe registration number. Electricians must hold NICEIC, NAPIT, or ELECSA certification. US HVAC technicians must show EPA Section 608 Universal Certification and state contractor board licenses.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] flex items-start space-x-3.5">
              <UserCheck className="w-5 h-5 text-[var(--pine-accent)] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-sm text-[var(--text)]">
                  3. Identity &amp; Business Entity Verification
                </strong>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  Directors and sole traders must verify their identity via official government photo ID (passport or driving licence) and demonstrate registered business status (Companies House registration number in the UK, or state EIN/LLC filing in the US).
                </p>
              </div>
            </div>

            <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] flex items-start space-x-3.5">
              <Clock className="w-5 h-5 text-[var(--pine-accent)] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-sm text-[var(--text)]">
                  4. Fast 24-48 Hour Turnaround
                </strong>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  Our compliance team verifies all uploaded credentials against live regulatory registries. Once approved, your profile receives the Verified Contractor badge and access to live incoming job broadcasts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Region Support */}
      <section className="section-sand section-spacing">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)]">
              <div className="flex items-center gap-2 mb-3">
                <UkFlagIcon className="w-5 h-3.5 rounded-[2px]" />
                <h3 className="font-extrabold text-base text-[var(--text)]">United Kingdom Network</h3>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                Established presence covering London, Manchester, Birmingham, Leeds, Glasgow, and surrounding counties. Connecting Gas Safe heating engineers, Part P electricians, and roofing specialists with verified local homeowners.
              </p>
              <div className="text-xs font-semibold text-[var(--pine-accent)]">
                &check; 45% Established UK Coverage
              </div>
            </div>

            <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)]">
              <div className="flex items-center gap-2 mb-3">
                <UsFlagIcon className="w-5 h-3.5 rounded-[2px]" />
                <h3 className="font-extrabold text-base text-[var(--text)]">United States Expansion</h3>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                Now accepting licensed contractors across Austin, Dallas, Houston, Phoenix, and Atlanta. EPA-certified HVAC technicians, licensed master electricians, and licensed residential plumbers.
              </p>
              <div className="text-xs font-semibold text-[var(--accent)]">
                &check; Active US Market Launch
              </div>
            </div>
          </div>

          <div className="mt-8 text-center bg-[var(--surface)] p-8 rounded-[var(--radius-lg)] border border-[var(--line)] shadow-soft">
            <h3 className="text-xl font-extrabold text-[var(--text)] mb-2">
              Ready to Expand Your Client Base?
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-5 max-w-md mx-auto">
              Register in under 5 minutes. Submit your insurance and trade credentials to receive qualified local leads.
            </p>
            <Link
              href="/auth/register?role=pro"
              className="px-6 py-3 rounded-[var(--radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] font-bold text-xs sm:text-sm text-white inline-flex items-center space-x-1.5 shadow-xs transition-colors"
            >
              <span>Submit Contractor Application</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
