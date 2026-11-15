import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works | TradeConnect Marketplace",
  description: "Learn how TradeConnect matches homeowners with vetted local trade professionals in 3 transparent, risk-free steps.",
};

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col">
      {/* SECTION 1: INTERACTIVE TWO-LAYERED HERO */}
      <section className="section-light section-spacing border-b border-[var(--line)] relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--brand-light)] border border-[var(--line)] text-xs font-semibold text-[var(--pine-accent)]">
                <span className="w-2 h-2 rounded-full bg-[var(--pine-accent)] animate-pulse" />
                <span>Zero Sales Pressure &middot; 100% Free for Homeowners</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
                How TradeConnect Protects Homeowners &amp; Trades
              </h1>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
                Finding a certified tradesperson shouldn&apos;t involve making twenty cold calls or wondering whether someone has valid public liability insurance. We verify every trade license before any contractor can submit a quote.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">Stage 1</span>
                  <p className="text-xs font-bold text-[var(--text)] mt-0.5">Post Details Free</p>
                  <p className="text-[11px] text-[var(--text-muted)]">No card required</p>
                </div>
                <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--pine-accent)] block">Stage 2</span>
                  <p className="text-xs font-bold text-[var(--text)] mt-0.5">Max 3 Vetted Bids</p>
                  <p className="text-[11px] text-[var(--text-muted)]">Zero spam flooding</p>
                </div>
                <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)] block">Stage 3</span>
                  <p className="text-xs font-bold text-[var(--text)] mt-0.5">Milestone Receipts</p>
                  <p className="text-[11px] text-[var(--text-muted)]">Pay on satisfaction</p>
                </div>
              </div>

              {/* Action buttons & scroll cue */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/quote"
                  className="btn-primary px-6 py-3.5 rounded-[var(--radius)] font-bold text-xs inline-flex items-center space-x-2 shadow-xs"
                >
                  <span>Post a Free Job Request</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#step-by-step-process"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[var(--accent)] hover:underline cursor-pointer"
                >
                  <span>Explore the 3-step breakdown</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </a>
              </div>
            </div>

            {/* Right Column: Two-Layered Visual Card */}
            <div className="lg:col-span-5 relative">
              {/* Layer 1: Photographic Base */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--line)] shadow-md">
                <Image
                  src="/images/trades/copper-pipework.jpg"
                  alt="Certified plumber assembling press-fit copper pipework system"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-white border border-white/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                    Verified Pipework Standards
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold text-white/95">
                    Craftsmanship First: Commercial-grade fittings &amp; pressure tested
                  </p>
                  <p className="text-[11px] text-white/75 mt-0.5">
                    Every contractor profile displays active liability insurance &amp; city licenses
                  </p>
                </div>
              </div>

              {/* Layer 2: Floating Workflow Card */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 max-w-xs p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-lg z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    Marketplace Safe Guarantee
                  </span>
                  <span className="text-[10px] font-bold text-[var(--pine-accent)] bg-[var(--brand-light)] px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-[var(--text)] font-semibold">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--pine-accent)] shrink-0" />
                    <span>No personal number sold to third-parties</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--pine-accent)] shrink-0" />
                    <span>Compare up to 3 itemized quotes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--pine-accent)] shrink-0" />
                    <span>Digital audit trail and receipt history</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 3-STAGE DETAILED WORKFLOW */}
      <section id="step-by-step-process" className="section-sand section-spacing">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
              Transparent Steps
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
              Three Steps from Post to Completed Job
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2">
              Designed to give homeowners total control while providing trade pros with clear job specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex flex-col justify-between space-y-4 hover:border-[var(--brand)] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--brand)] text-white font-extrabold text-lg flex items-center justify-center mb-4 shadow-xs">
                  01
                </div>
                <h3 className="text-base font-bold text-[var(--text)] mb-2">
                  Post Your Job in 2 Minutes
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Select your trade category, enter your postcode or town, and describe what needs doing. Attach photos if you have them so trades can understand the scope before pricing.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--line-subtle)] space-y-1.5 text-xs">
                <div className="flex items-center text-[var(--pine-accent)] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  <span>100% Free with no card details</span>
                </div>
                <div className="flex items-center text-[var(--pine-accent)] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  <span>Immediate notification to local pros</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex flex-col justify-between space-y-4 hover:border-[var(--brand)] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--accent)] text-white font-extrabold text-lg flex items-center justify-center mb-4 shadow-xs">
                  02
                </div>
                <h3 className="text-base font-bold text-[var(--text)] mb-2">
                  Receive Up to 3 Vetted Quotes
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Only licensed contractors operating in your direct area can bid. Review their itemized labor and materials quotes, insurance policies, and previous customer reviews side-by-side.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--line-subtle)] space-y-1.5 text-xs">
                <div className="flex items-center text-[var(--pine-accent)] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  <span>Strict limit of 3 quotes (no spam)</span>
                </div>
                <div className="flex items-center text-[var(--pine-accent)] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  <span>Verified credentials displayed on bids</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex flex-col justify-between space-y-4 hover:border-[var(--brand)] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--pine-accent)] text-white font-extrabold text-lg flex items-center justify-center mb-4 shadow-xs">
                  03
                </div>
                <h3 className="text-base font-bold text-[var(--text)] mb-2">
                  Complete Job &amp; Confirm Review
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Accept the quote that matches your schedule and budget. Manage contracts directly in your dashboard, verify work completion, and leave a verified homeowner review.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--line-subtle)] space-y-1.5 text-xs">
                <div className="flex items-center text-[var(--pine-accent)] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  <span>Digital contract &amp; receipt records</span>
                </div>
                <div className="flex items-center text-[var(--pine-accent)] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  <span>Verified review linked to actual job</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: COMPARISON TABLE (TradeConnect vs Lead-Gen Sites) */}
      <section className="section-light section-spacing border-b border-[var(--line)]">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
              Why We Are Different
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
              TradeConnect vs. Traditional Lead-Gen Sites
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2">
              Most directories make money by reselling homeowner contact details to as many paying contractors as possible. We prioritize vetting and quality.
            </p>
          </div>

          <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--line)] shadow-soft">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[var(--surface)] border-b border-[var(--line)]">
                  <th className="p-4 font-bold text-[var(--text)]">Marketplace Feature</th>
                  <th className="p-4 font-bold text-[var(--accent)] bg-[var(--accent)]/5">TradeConnect Standard</th>
                  <th className="p-4 font-bold text-[var(--text-muted)]">Old Directory Models</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line-subtle)] bg-[var(--surface)]">
                <tr>
                  <td className="p-4 font-semibold text-[var(--text)]">Contractor Insurance Verification</td>
                  <td className="p-4 text-[var(--pine-accent)] font-bold bg-[var(--accent)]/5">
                    Mandatory &pound;1M+ / $1M+ checked annually
                  </td>
                  <td className="p-4 text-[var(--text-muted)]">Unchecked or voluntary self-reporting</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[var(--text)]">Number of Contractor Inquiries</td>
                  <td className="p-4 text-[var(--pine-accent)] font-bold bg-[var(--accent)]/5">
                    Strict maximum of 3 quotes
                  </td>
                  <td className="p-4 text-[var(--text-muted)]">Sold to 10+ callers who bombard your phone</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[var(--text)]">Paid Sponsored Rank Boosting</td>
                  <td className="p-4 text-[var(--pine-accent)] font-bold bg-[var(--accent)]/5">
                    Zero paid ranking &mdash; sorted purely by proximity &amp; rating
                  </td>
                  <td className="p-4 text-[var(--text-muted)]">Contractors who pay the highest subscription fee appear first</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[var(--text)]">Homeowner Review Authenticity</td>
                  <td className="p-4 text-[var(--pine-accent)] font-bold bg-[var(--accent)]/5">
                    Requires verified completed job number
                  </td>
                  <td className="p-4 text-[var(--text-muted)]">Anyone with an email address can leave fake reviews</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[var(--text)]">Dashboard Contract Records</td>
                  <td className="p-4 text-[var(--pine-accent)] font-bold bg-[var(--accent)]/5">
                    Full CRUD dashboard with invoices &amp; milestones
                  </td>
                  <td className="p-4 text-[var(--text-muted)]">Zero job tracking after lead details are sold</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 4: CALL TO ACTION */}
      <section className="section-deep py-14">
        <div className="container-custom text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--bg-deep-text)]">
            Ready to get fair, itemized quotes for your home?
          </h2>
          <p className="text-xs sm:text-sm text-[rgba(255,255,255,0.85)] leading-relaxed">
            Tell us what needs fixing or building. Receive up to 3 competitive quotes from verified contractors in your postal radius.
          </p>
          <div className="pt-2">
            <Link
              href="/quote"
              className="inline-flex items-center px-6 py-3.5 rounded-[var(--radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-xs shadow-xs transition-colors"
            >
              <span>Post Your Job Free</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
