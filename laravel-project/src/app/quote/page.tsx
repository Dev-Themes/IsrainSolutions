import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { QuoteWizard } from "@/components/quote/quote-wizard";
import { getSiteUrl } from "@/lib/site-config";
import { CATEGORIES } from "@/lib/data";
import { ShieldCheck, CheckCircle2, Clock } from "lucide-react";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Post a Job | Free Quotes from Vetted Local Trades",
  description:
    "Post your home improvement or repair project. Compare quotes from verified, insured plumbers, electricians, roofers, and HVAC contractors across the UK and US.",
  alternates: {
    canonical: `${siteUrl}/quote`,
    languages: {
      "en-GB": `${siteUrl}/quote`,
      "en-US": `${siteUrl}/quote`,
      "x-default": `${siteUrl}/quote`,
    },
  },
  openGraph: {
    title: "Post a Job | TradeConnect",
    description:
      "Get up to 3 competitive quotes from verified, insured local contractors. Plumbers, electricians, roofers, and HVAC specialists.",
    url: `${siteUrl}/quote`,
    siteName: "TradeConnect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Post a Job | TradeConnect",
    description:
      "Get up to 3 competitive quotes from verified, insured local contractors.",
  },
};

export default function QuotePage() {
  return (
    <div className="section-light py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Post a Job" }]} />

        <div className="mb-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
            Verified Contractor Network
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] mt-1 tracking-tight">
            Post a Job &amp; Get Free Estimates
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 max-w-lg mx-auto">
            Describe your repair or installation task. Up to 3 licensed and insured local tradespeople will review your requirements and provide transparent quotes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--pine-accent)]" /> 100% Vetted &amp; Insured
            </span>
            <span className="inline-flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-[var(--accent)]" /> Average response: 42 mins
            </span>
            <span className="inline-flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--pine-accent)]" /> Free &amp; No Obligation
            </span>
          </div>
        </div>

        {/* Client Wizard with Suspense */}
        <Suspense
          fallback={
            <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] p-8 border border-[var(--line)] shadow-soft text-center animate-pulse">
              <div className="h-4 bg-[var(--line)] rounded w-1/3 mx-auto mb-4" />
              <div className="h-8 bg-[var(--line)] rounded w-2/3 mx-auto mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                <div className="h-16 bg-[var(--line-subtle)] rounded" />
                <div className="h-16 bg-[var(--line-subtle)] rounded" />
                <div className="h-16 bg-[var(--line-subtle)] rounded" />
                <div className="h-16 bg-[var(--line-subtle)] rounded" />
              </div>
            </div>
          }
        >
          <QuoteWizard />
        </Suspense>

        {/* Crawlable Fallback & Indexing Content for Search Engines */}
        <noscript>
          <div className="mt-8 p-6 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)]">
            <h2 className="text-base font-bold text-[var(--text)] mb-2">
              Request Quotes for Home Improvement &amp; Maintenance Services
            </h2>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              To request a quote without JavaScript, browse our verified trades directory or contact vetted pros directly in your area:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/uk/${cat.slug}`}
                  className="p-2 border border-[var(--line-subtle)] rounded hover:bg-[var(--bg-alt)] font-semibold text-[var(--text)]"
                >
                  {cat.name} Quotes
                </Link>
              ))}
            </div>
          </div>
        </noscript>
      </div>
    </div>
  );
}
