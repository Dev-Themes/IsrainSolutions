import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Star,
  MapPin,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { VERIFIED_PROS } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return VERIFIED_PROS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pro = VERIFIED_PROS.find((p) => p.slug === slug);

  if (!pro) {
    return { title: "Trade Professional | TradeConnect" };
  }

  return {
    title: `${pro.companyName} | Verified Reviews & Credentials`,
    description: `Read customer feedback for ${pro.companyName} in ${pro.city}. Licensed (${pro.licenseNumber}), insured, and rated ${pro.rating}★ on TradeConnect.`,
  };
}

export default async function ProProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const pro = VERIFIED_PROS.find((p) => p.slug === slug);

  if (!pro) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-[var(--bg-alt)] border-b border-[var(--line)] text-xs py-3 px-4">
        <div className="container-custom flex items-center space-x-2 text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/pros" className="hover:text-[var(--text)]">Trade Directory</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[var(--text)] font-semibold truncate">{pro.companyName}</span>
        </div>
      </div>

      {/* Header */}
      <section className="section-light section-spacing border-b border-[var(--line)]">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--brand-light)] text-[var(--pine-accent)] flex items-center border border-[var(--line)]">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Verified Contractor #{pro.id.toUpperCase()}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  {pro.yearsInBusiness} Years in Business
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)]">
                {pro.companyName}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
                <div className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent)] mr-1" />
                  <span>{pro.city}, {pro.country === "UK" ? "UK" : "USA"} ({pro.postcodeOrZip})</span>
                </div>
                <div className="flex items-center text-[var(--accent)] font-bold">
                  <Star className="w-3.5 h-3.5 fill-[var(--accent)] mr-1" />
                  <span>{pro.rating} rating ({pro.reviewCount} verified reviews)</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed pt-2">
                {pro.bio}
              </p>
            </div>

            {/* Quick Pricing Card */}
            <div className="bg-[var(--surface)] rounded-[var(--radius)] p-6 border border-[var(--line)] shadow-soft shrink-0 lg:w-80">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-light)] mb-1">
                Standard Pricing
              </div>
              <div className="text-3xl font-extrabold text-[var(--text)] font-serif mb-3">
                {pro.country === "UK" ? `£${pro.hourlyRate}` : `$${pro.hourlyRate}`}
                <span className="text-xs font-normal text-[var(--text-muted)] font-sans"> / hour</span>
              </div>

              <div className="space-y-2 text-xs py-3 border-y border-[var(--line-subtle)] mb-5">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Callout Fee:</span>
                  <span className="font-semibold text-[var(--text)]">
                    {pro.country === "UK" ? `£${pro.calloutFee}` : `$${pro.calloutFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Public Liability:</span>
                  <span className="font-semibold text-[var(--pine-accent)]">{pro.insuranceAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Official Licence:</span>
                  <span className="font-semibold text-[var(--text)]">{pro.licenseNumber}</span>
                </div>
              </div>

              <Link
                href={`/quote?pro=${pro.slug}`}
                className="w-full py-3 rounded-[var(--radius-sm)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] font-bold text-xs text-white text-center transition-colors block shadow-xs"
              >
                Request Quote from this Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & Work History */}
      <section className="section-sand section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-extrabold text-[var(--text)] mb-6">
                Verified Customer Feedback
              </h2>

              <div className="space-y-4">
                {pro.reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="bg-[var(--surface)] rounded-[var(--radius)] p-5 border border-[var(--line)] shadow-soft"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs sm:text-sm text-[var(--text)]">
                          {rev.author}
                        </span>
                        <span className="text-[10px] bg-[var(--brand-light)] text-[var(--pine-accent)] px-2 py-0.5 rounded font-bold">
                          Verified Homeowner
                        </span>
                      </div>
                      <span className="text-[11px] text-[var(--text-light)]">{rev.date}</span>
                    </div>

                    <div className="flex items-center text-[var(--accent)] mb-2">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[var(--accent)]" />
                      ))}
                    </div>

                    <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] mb-1">
                      {rev.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[var(--text)] mb-6">
                Recent Completed Jobs
              </h2>

              <div className="bg-[var(--surface)] rounded-[var(--radius)] p-5 border border-[var(--line)] shadow-soft">
                <ul className="space-y-3 text-xs text-[var(--text-muted)]">
                  {pro.recentWork.map((item, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[var(--pine-accent)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-[var(--line-subtle)]">
                  <span className="text-[11px] text-[var(--text-light)] block">
                    Phone verification:
                  </span>
                  <span className="font-bold text-sm text-[var(--text)]">
                    {pro.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
