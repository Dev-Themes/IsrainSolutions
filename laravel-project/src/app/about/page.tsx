import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Clock,
  ArrowRight,
  ChevronDown,
  MapPin,
  Building2,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getSiteUrl } from "@/lib/site-config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Our Story & Standards | Verified Trade Network",
  description:
    "Learn how TradeConnect was founded by tradespeople to eliminate rogue operators and connect homeowners with vetted, insured local contractors across the UK and US.",
  alternates: {
    canonical: `${siteUrl}/about`,
    languages: {
      "en-GB": `${siteUrl}/about`,
      "en-US": `${siteUrl}/about`,
      "x-default": `${siteUrl}/about`,
    },
  },
  openGraph: {
    title: "Our Story & Standards | TradeConnect",
    description:
      "TradeConnect connects homeowners with certified, insured local contractors. Zero sponsored rank manipulation.",
    url: `${siteUrl}/about`,
    siteName: "TradeConnect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story & Standards | TradeConnect",
    description:
      "TradeConnect connects homeowners with certified, insured local contractors.",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <div className="container-custom pt-4">
        <Breadcrumbs items={[{ label: "About Us" }]} />
      </div>

      {/* SECTION 1: TWO-LAYERED HERO */}
      <section className="section-light section-spacing border-b border-[var(--line)] relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--brand-light)] border border-[var(--line)] text-xs font-semibold text-[var(--pine-accent)]">
                <span className="w-2 h-2 rounded-full bg-[var(--pine-accent)] animate-pulse" />
                <span>Founded by Craftsmen &middot; Serving UK &amp; US</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
                Built by Tradespeople for Homeowners Who Value Real Craft
              </h1>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
                TradeConnect was created out of frustration with online directories that sell homeowner contact info to anyone who pays a monthly advertising fee. We built an independent platform where verified credentials, valid insurance, and authentic reviews come first.
              </p>

              {/* Key Platform Numbers */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
                  <strong className="block text-xl sm:text-2xl font-extrabold text-[var(--accent)]">
                    8,784+
                  </strong>
                  <span className="text-[11px] text-[var(--text-muted)] font-medium">
                    Registered Trade Pros
                  </span>
                </div>
                <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
                  <strong className="block text-xl sm:text-2xl font-extrabold text-[var(--pine-accent)]">
                    45%
                  </strong>
                  <span className="text-[11px] text-[var(--text-muted)] font-medium">
                    UK Postal Coverage
                  </span>
                </div>
                <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
                  <strong className="block text-xl sm:text-2xl font-extrabold text-[var(--brand)]">
                    &pound;2M+
                  </strong>
                  <span className="text-[11px] text-[var(--text-muted)] font-medium">
                    Liability Insurance Min
                  </span>
                </div>
              </div>

              {/* Action Buttons & Scroll Cue */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/quote"
                  className="btn-primary px-6 py-3.5 rounded-[var(--radius)] font-bold text-xs inline-flex items-center space-x-2 shadow-xs"
                >
                  <span>Post a Free Job Request</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#verification-pillars"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[var(--accent)] hover:underline cursor-pointer"
                >
                  <span>Read our 4 verification pillars</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </a>
              </div>
            </div>

            {/* Right Column: Two-Layered Visual Showcase */}
            <div className="lg:col-span-5 relative">
              {/* Layer 1: Photographic Base */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--line)] shadow-md">
                <Image
                  src="/images/trades/electrical-consumer-unit.jpg"
                  alt="Neat electrical consumer unit wiring by NICEIC verified electrician"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-white border border-white/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                    Regulated Electrical Standards
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold text-white/95">
                    BS 7671 18th Edition Compliance: Residual current protection &amp; surge devices
                  </p>
                  <p className="text-[11px] text-white/75 mt-0.5">
                    Inspected &amp; logged under UK Building Regulations Part P
                  </p>
                </div>
              </div>

              {/* Layer 2: Floating Founder Charter Badge */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 max-w-xs p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-lg z-10">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-[var(--brand)] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    TC
                  </div>
                  <div>
                    <strong className="block text-xs font-extrabold text-[var(--text)]">The TradeConnect Charter</strong>
                    <span className="text-[11px] text-[var(--text-muted)]">Zero Rogue Contractor Tolerance</span>
                  </div>
                </div>
                <blockquote className="text-xs italic text-[var(--text-muted)] border-t border-[var(--line-subtle)] pt-2">
                  &ldquo;Homeowners don&apos;t need marketing fluff. They need a tradesperson who shows up on time, fixes it right, and honors the agreed quote.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FOUR VERIFICATION PILLARS */}
      <section id="verification-pillars" className="section-sand section-spacing">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
              Uncompromising Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
              Our Four Verification Pillars
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2">
              Every pro on TradeConnect must clear all four validation checks before receiving access to domestic job leads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex items-start space-x-4">
              <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--brand-light)] text-[var(--pine-accent)] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-base text-[var(--text)]">
                  1. Independent Accreditation Checks
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  We verify directly with official trade registers: Gas Safe Register in the UK for boilers, NICEIC/NAPIT for domestic electricians, and state licensing boards across the US. Expired licenses result in immediate suspension.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex items-start space-x-4">
              <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--brand-light)] text-[var(--pine-accent)] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-base text-[var(--text)]">
                  2. Mandatory Public Liability Insurance
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  Every listed professional must maintain an active public liability policy with at least &pound;1,000,000 / $1,000,000 indemnity. Policy documents are re-audited annually before renewal.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex items-start space-x-4">
              <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--brand-light)] text-[var(--pine-accent)] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-base text-[var(--text)]">
                  3. Zero Paid Rank Placement
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  Contractors cannot buy the top spot in search results. Pro profiles are ranked strictly by geographical proximity to your job postcode and verified customer completion ratings.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex items-start space-x-4">
              <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--brand-light)] text-[var(--pine-accent)] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-base text-[var(--text)]">
                  4. Verified Booking Reviews Only
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  Homeowner testimonials must correspond to an actual booked job dispatched through the TradeConnect system. This eliminates fake five-star review farms and malicious competitor sabotage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EXPANSION ROADMAP (UK & US) */}
      <section className="section-light section-spacing border-b border-[var(--line)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                Network Footprint
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                Established UK Footprint &amp; Rapid US Expansion
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                TradeConnect launched in the UK with deep contractor relationships in London, Birmingham, Manchester, Leeds, and Bristol. Having established approximately 45% of our planned UK market coverage, we have expanded infrastructure to support US metro hubs including New York, Austin, Chicago, and Los Angeles.
              </p>
              <div className="space-y-2 pt-2 text-xs font-semibold text-[var(--text)]">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>United Kingdom: 45% target coverage active with 8,784+ verified trades</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-[var(--pine-accent)] shrink-0" />
                  <span>United States: Tier-1 metro launch roll-outs with state licensing validation</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-4">
              <h3 className="font-extrabold text-base text-[var(--text)]">
                Our Commitment to Local Communities
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                By charging fair, fixed marketplace pricing and never auctioning customer leads, we ensure independent electricians, plumbers, and heating engineers can focus on doing quality work rather than spending hours chasing unqualified sales leads.
              </p>
              <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[var(--text)] block">Are you a licensed contractor?</span>
                  <span className="text-[11px] text-[var(--text-muted)]">Join our verified trade network today.</span>
                </div>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white font-bold text-xs shrink-0 transition-colors"
                >
                  Apply as Pro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CALL TO ACTION */}
      <section className="section-deep py-14">
        <div className="container-custom text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--bg-deep-text)]">
            Ready to hire an insured, verified tradesperson?
          </h2>
          <p className="text-xs sm:text-sm text-[rgba(255,255,255,0.85)] leading-relaxed">
            Post your job requirements for free. Receive up to 3 competitive quotes from verified local contractors in your postal area.
          </p>
          <div className="pt-2">
            <Link
              href="/quote"
              className="inline-flex items-center px-6 py-3.5 rounded-[var(--radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-xs shadow-xs transition-colors"
            >
              <span>Post a Job</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
