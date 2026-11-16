"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Search,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Award,
} from "lucide-react";
import { CATEGORIES, VERIFIED_PROS } from "@/lib/data";
import { UkFlagIcon, UsFlagIcon } from "@/components/ui/flag-icon";

export function ProsDirectory() {
  const [selectedCountry, setSelectedCountry] = React.useState<"ALL" | "UK" | "US">("ALL");
  const [selectedCat, setSelectedCat] = React.useState<string>("ALL");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const filteredPros = VERIFIED_PROS.filter((pro) => {
    const matchesCountry = selectedCountry === "ALL" || pro.country === selectedCountry;
    const matchesCategory = selectedCat === "ALL" || pro.categories.includes(selectedCat);
    const matchesSearch =
      searchQuery.trim() === "" ||
      pro.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCountry && matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col">
      {/* Interactive Two-Layered Hero */}
      <section className="section-light section-spacing border-b border-[var(--line)] relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--brand-light)] border border-[var(--line)] text-xs font-semibold text-[var(--pine-accent)]">
                <span className="w-2 h-2 rounded-full bg-[var(--pine-accent)] animate-pulse" />
                <span>8,784 Verified UK &amp; US Trade Pros</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
                Search Certified Trade Pros with Validated Licenses
              </h1>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
                Every tradesperson on TradeConnect holds verified public liability insurance (£1M+ / $1M+), active trade certifications (Gas Safe, NICEIC, EPA), and genuine homeowner reviews. Zero sponsored rank manipulation.
              </p>

              {/* Quick Credential Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] text-[var(--text)] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--pine-accent)] mr-1.5" />
                  Gas Safe Active
                </span>
                <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] text-[var(--text)] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--pine-accent)] mr-1.5" />
                  NICEIC / NAPIT Certified
                </span>
                <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] text-[var(--text)] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--pine-accent)] mr-1.5" />
                  £2M+ Public Liability
                </span>
                <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] text-[var(--text)] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--pine-accent)] mr-1.5" />
                  Verified Reviews Only
                </span>
              </div>

              {/* Filters Bar */}
              <div className="mt-6 p-3.5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex flex-col md:flex-row gap-2.5">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-[var(--text-light)] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by company, city, or license number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] placeholder-[var(--text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    value={selectedCountry}
                    aria-label="Filter by country"
                    onChange={(e) => setSelectedCountry(e.target.value as "ALL" | "UK" | "US")}
                    className="px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs font-semibold text-[var(--text)] focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">All Countries (UK &amp; US)</option>
                    <option value="UK">United Kingdom</option>
                    <option value="US">United States</option>
                  </select>

                  <select
                    value={selectedCat}
                    aria-label="Filter by trade category"
                    onChange={(e) => setSelectedCat(e.target.value)}
                    className="px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs font-semibold text-[var(--text)] focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">All Categories</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Scroll down indicator */}
              <div className="pt-2">
                <a
                  href="#pros-directory-grid"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-[var(--accent)] hover:underline cursor-pointer group"
                >
                  <span>Jump straight to filtered pro cards</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column: Two-Layered Visual Frame */}
            <div className="lg:col-span-5 relative">
              {/* Layer 1: Photographic Base */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--line)] shadow-md">
                <Image
                  src="/images/trades/boiler-inspection.jpg"
                  alt="Verified heating engineer inspecting boiler combustion"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-white border border-white/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                    Live Compliance Sync
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold text-white/90">
                    Inspected on-site: Combi boiler flue analysis &amp; pressure test
                  </p>
                  <p className="text-[11px] text-white/70 mt-0.5">
                    Updated live across UK Gas Safe Register &amp; US State boards
                  </p>
                </div>
              </div>

              {/* Layer 2: Floating Real-time Verification Badge */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 max-w-xs p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-lg z-10 animate-in fade-in duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--brand-light)] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[var(--pine-accent)]" />
                  </div>
                  <div>
                    <strong className="block text-xs font-extrabold text-[var(--text)]">Apex Heating &amp; Gas Ltd</strong>
                    <span className="text-[11px] text-[var(--pine-accent)] font-semibold flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Gas Safe #592104 Active
                    </span>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-[var(--line-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                  <span className="flex items-center font-bold text-[var(--accent)]">
                    <Star className="w-3.5 h-3.5 fill-[var(--accent)] mr-1" />
                    4.96 (168 reviews)
                  </span>
                  <span>&pound;2,000,000 Insured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section id="pros-directory-grid" className="section-sand section-spacing flex-1">
        <div className="container-custom">
          <div className="mb-6 flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>Showing {filteredPros.length} verified trade pros</span>
            <span className="font-semibold text-[var(--pine-accent)] flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              100% Identity &amp; Insurance Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPros.map((pro) => (
              <div
                key={pro.id}
                className="bg-[var(--surface)] rounded-[var(--radius)] p-6 border border-[var(--line)] shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--bg-alt)] text-[var(--text-muted)] border border-[var(--line-subtle)]">
                        {pro.country === "UK" ? (
                          <>
                            <UkFlagIcon className="w-3 h-2" />
                            <span>UK Vetted</span>
                          </>
                        ) : (
                          <>
                            <UsFlagIcon className="w-3 h-2" />
                            <span>USA Verified</span>
                          </>
                        )}
                      </span>
                      <h3 className="font-extrabold text-base text-[var(--text)] mt-1.5 leading-snug">
                        {pro.companyName}
                      </h3>
                      <div className="flex items-center text-xs text-[var(--text-muted)] mt-1">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-[var(--accent)]" />
                        <span>{pro.city} &middot; {pro.postcodeOrZip}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-[var(--accent)] font-bold text-xs shrink-0 ml-2">
                      <Star className="w-3.5 h-3.5 fill-[var(--accent)] mr-1" />
                      <span>{pro.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">
                    {pro.bio}
                  </p>

                  <div className="space-y-1.5 py-3 border-y border-[var(--line-subtle)] text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-light)]">Accreditation:</span>
                      <span className="font-semibold text-[var(--text)]">{pro.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-light)]">Insurance:</span>
                      <span className="font-semibold text-[var(--pine-accent)]">{pro.insuranceAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-light)]">Standard Rate:</span>
                      <span className="font-bold text-[var(--text)]">
                        {pro.country === "UK" ? `£${pro.hourlyRate}/hr` : `$${pro.hourlyRate}/hr`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-2">
                  <Link
                    href={`/pros/${pro.slug}`}
                    className="flex-1 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-center text-xs font-bold text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors"
                  >
                    View Profile ({pro.reviewCount})
                  </Link>
                  <Link
                    href={`/quote?pro=${pro.slug}`}
                    className="flex-1 py-2.5 rounded-[var(--radius-sm)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-center text-xs font-bold text-white transition-colors"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
