"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  FileCheck,
  Wrench,
  Zap,
  Flame,
  Home,
  ThermometerSnowflake,
  Trees,
  PaintBucket,
  KeyRound,
  Check,
  ChevronDown,
  Globe,
} from "lucide-react";
import {
  CATEGORIES,
  CITIES,
  TYPICAL_JOB_PRICES,
  GALLERY_PHOTOS,
  HOME_REVIEWS,
  BLOG_ARTICLES,
  FAQS,
} from "@/lib/data";
import { ReviewsCarousel } from "@/components/ui/reviews-carousel";
import { WorkGallery } from "@/components/ui/work-gallery";
import { AreaChips } from "@/components/ui/area-chips";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { getSiteUrl } from "@/lib/site-config";

const iconMap: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="w-5 h-5 text-[var(--accent)]" />,
  Zap: <Zap className="w-5 h-5 text-[var(--accent)]" />,
  Flame: <Flame className="w-5 h-5 text-[var(--accent)]" />,
  Home: <Home className="w-5 h-5 text-[var(--accent)]" />,
  ThermometerSnowflake: <ThermometerSnowflake className="w-5 h-5 text-[var(--accent)]" />,
  Trees: <Trees className="w-5 h-5 text-[var(--accent)]" />,
  PaintBucket: <PaintBucket className="w-5 h-5 text-[var(--accent)]" />,
  KeyRound: <KeyRound className="w-5 h-5 text-[var(--accent)]" />,
};

const HERO_SHOWCASE = [
  {
    image: "/images/trades/boiler-inspection.jpg",
    trade: "Heating & Gas",
    title: "Combi Boiler Heat Exchanger Overhaul",
    cert: "Gas Safe #592104",
    location: "Fulham, London",
    note: "All boiler engineers hold verified Gas Safe registration and £2M+ public liability cover.",
  },
  {
    image: "/images/trades/electrical-consumer-unit.jpg",
    trade: "Electrical",
    title: "18th Edition RCBO Metal Consumer Unit",
    cert: "NICEIC Reg #048291",
    location: "Edgbaston, Birmingham",
    note: "NICEIC approved contractors sign off official Part P electrical compliance certificates.",
  },
  {
    image: "/images/trades/copper-pipework.jpg",
    trade: "Emergency Plumbing",
    title: "15mm Press-Fit Copper Manifold",
    cert: "NVQ Level 3 Verified",
    location: "South West London",
    note: "Vans stocked with copper press-fittings for rapid 30-minute emergency leak isolations.",
  },
  {
    image: "/images/trades/hvac-heat-pump.jpg",
    trade: "HVAC Diagnostics",
    title: "Heat Pump Manifold Pressure Diagnostics",
    cert: "EPA Universal / OSHA",
    location: "Round Rock, Austin TX",
    note: "High-efficiency heat pump diagnostics with digital micron gauges and pressure hold testing.",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = React.useState("plumbing");
  const [postcodeOrCity, setPostcodeOrCity] = React.useState("");
  const [activeHeroShowcase, setActiveHeroShowcase] = React.useState(0);
  const [searchMode, setSearchMode] = React.useState<"QUOTE" | "EMERGENCY" | "DIRECTORY">("QUOTE");
  const [pricingCurrency, setPricingCurrency] = React.useState<"GBP" | "USD">("GBP");
  const [marketTab, setMarketTab] = React.useState<"UK" | "US">("UK");

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = postcodeOrCity.trim().toLowerCase();
    // Default to London if blank, or match city slug
    const matchedCity = CITIES.find(
      (c) => c.slug === query || c.name.toLowerCase() === query
    );
    const countrySlug = matchedCity ? matchedCity.country.toLowerCase() : "uk";
    const citySlug = matchedCity ? matchedCity.slug : "london";
    router.push(`/${countrySlug}/${selectedCategory}/${citySlug}`);
  };

  // Structured Data (JSON-LD) for Organization, WebSite & FAQPage
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "TradeConnect",
        url: siteUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/uk/plumbing/{search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "TradeConnect",
        url: siteUrl,
        description:
          "Independent verified marketplace connecting homeowners with certified local trade professionals in the UK and USA.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+44-800-123-4567",
          contactType: "customer service",
          areaServed: ["GB", "US"],
          availableLanguage: "en",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col">
        {/* ======================================================== */}
        {/* SECTION 2: HERO (Content Density, Fancy & Professional Display) */}
        {/* ======================================================== */}
        <section className="section-light section-spacing border-b border-[var(--line)]">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Copy & Search Form */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] shadow-xs mb-3.5 text-xs font-medium text-[var(--text)]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[var(--pine-accent)] shrink-0" />
                    <span className="font-semibold text-xs text-[var(--text)]">Gas Safe, NICEIC &amp; State License Verified</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[var(--text)] leading-[1.12] tracking-tight font-display">
                    Reliable local tradespeople, checked before they quote.
                  </h1>
                  <p className="mt-4 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-xl">
                    Post your job in minutes. We match your requirements with up to 3 vetted, insured local contractors. Compare transparent pricing, read verified reviews, and hire when ready.
                  </p>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/quote"
                    className="btn-primary px-6 py-3.5 rounded-[var(--radius)] font-bold text-sm text-white shadow-xs inline-flex items-center space-x-2"
                  >
                    <span>Post a Job</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="tel:+448001234567"
                    className="btn-secondary px-5 py-3.5 rounded-[var(--radius)] font-semibold text-xs sm:text-sm text-[var(--text)] inline-flex items-center space-x-2"
                  >
                    <Phone className="w-4 h-4 text-[var(--accent)]" />
                    <span>Emergency Hotline: 0800 123 4567</span>
                  </a>
                </div>

                {/* Search Form with Mode Switcher */}
                <div className="rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft p-3 sm:p-4 space-y-3">
                  <div className="flex items-center space-x-2 border-b border-[var(--line-subtle)] pb-2.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setSearchMode("QUOTE")}
                      className={`px-3 py-1 rounded-[var(--radius-sm)] font-bold transition-colors cursor-pointer ${
                        searchMode === "QUOTE"
                          ? "bg-[var(--brand)] text-white"
                          : "text-[var(--text-muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      Compare 3 Quotes
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchMode("EMERGENCY")}
                      className={`px-3 py-1 rounded-[var(--radius-sm)] font-bold transition-colors cursor-pointer ${
                        searchMode === "EMERGENCY"
                          ? "bg-red-600 text-white"
                          : "text-[var(--text-muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      🚨 2h Emergency Dispatch
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchMode("DIRECTORY")}
                      className={`px-3 py-1 rounded-[var(--radius-sm)] font-bold transition-colors cursor-pointer ${
                        searchMode === "DIRECTORY"
                          ? "bg-[var(--accent)] text-white"
                          : "text-[var(--text-muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      City Price Guide
                    </button>
                  </div>

                  <form
                    onSubmit={handleHeroSearch}
                    className="flex flex-col sm:flex-row gap-2.5"
                  >
                    <div className="flex-1 flex items-center px-3 py-2.5 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line-subtle)]">
                      <Wrench className="w-4 h-4 text-[var(--accent)] mr-2 shrink-0" />
                      <div className="w-full">
                        <label htmlFor="hero-trade-select" className="sr-only">
                          Select Trade Service
                        </label>
                        <select
                          id="hero-trade-select"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full bg-[var(--bg-alt)] dark:bg-[#142421] text-xs font-semibold text-[var(--text)] dark:text-[#f3efe6] focus:outline-none cursor-pointer"
                        >
                          {CATEGORIES.map((cat) => (
                            <option
                              key={cat.slug}
                              value={cat.slug}
                              className="bg-[var(--surface)] text-[var(--text)] dark:bg-[#142421] dark:text-[#f3efe6]"
                            >
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex-1 flex items-center px-3 py-2.5 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line-subtle)]">
                      <MapPin className="w-4 h-4 text-[var(--accent)] mr-2 shrink-0" />
                      <div className="w-full">
                        <label htmlFor="hero-location-input" className="sr-only">
                          Postcode or Town
                        </label>
                        <input
                          id="hero-location-input"
                          type="text"
                          placeholder="e.g. London, SW1A, Manchester, Austin"
                          value={postcodeOrCity}
                          onChange={(e) => setPostcodeOrCity(e.target.value)}
                          className="w-full bg-transparent text-xs font-semibold text-[var(--text)] placeholder-[var(--text-light)] focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-brand px-6 py-2.5 rounded-[var(--radius-sm)] text-white font-bold text-xs shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>{searchMode === "EMERGENCY" ? "Dispatch Now" : "Find Pros"}</span>
                    </button>
                  </form>
                </div>

                {/* Key Numbers Row */}
                <div className="pt-4 border-t border-[var(--line)] grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] font-display tracking-tight">
                      8,784+
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      Vetted Trade Pros
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] font-display tracking-tight">
                      &lt; 2 Hours
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      Avg Quote Response
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] font-display tracking-tight">
                      4.92 ★
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      Average Trust Score
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Documentary Craftsman Photo Frame */}
              <div className="lg:col-span-5 space-y-3">
                <div className="relative rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-2 shadow-md">
                  <div className="w-full aspect-4/3 rounded-[var(--radius)] overflow-hidden bg-[#243a34] flex flex-col justify-between p-6 text-white relative">
                    <Image
                      src={HERO_SHOWCASE[activeHeroShowcase].image}
                      alt={HERO_SHOWCASE[activeHeroShowcase].title}
                      fill
                      priority
                      className="object-cover transition-all duration-300"
                      sizes="(max-width: 1024px) 100vw, 540px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30" />
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded">
                        {HERO_SHOWCASE[activeHeroShowcase].trade} &middot; {HERO_SHOWCASE[activeHeroShowcase].location}
                      </span>
                      <span className="text-xs font-bold text-[var(--accent)] bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded">
                        {HERO_SHOWCASE[activeHeroShowcase].cert}
                      </span>
                    </div>

                    <div className="relative z-10 bg-black/65 backdrop-blur-xs p-4 rounded-[var(--radius-sm)] border border-white/20">
                      <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-0.5">
                        Documented Site Record
                      </div>
                      <div className="text-sm font-bold leading-snug">
                        {HERO_SHOWCASE[activeHeroShowcase].title}
                      </div>
                      <p className="text-[11px] text-white/85 mt-1">
                        {HERO_SHOWCASE[activeHeroShowcase].note}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Trade Showcase Selector */}
                <div className="grid grid-cols-4 gap-2 text-[10px] font-bold">
                  {HERO_SHOWCASE.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActiveHeroShowcase(index)}
                      className={`p-2 rounded-[var(--radius-sm)] border text-center transition-all cursor-pointer ${
                        activeHeroShowcase === index
                          ? "bg-[var(--surface)] border-[var(--accent)] text-[var(--accent)] shadow-xs font-extrabold"
                          : "bg-[var(--bg-alt)] border-[var(--line)] text-[var(--text-muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      {item.trade}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Scroll Down Cue */}
            <div className="pt-8 flex flex-col items-center justify-center">
              <a
                href="#categories-section"
                className="group inline-flex flex-col items-center space-y-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
              >
                <span>Scroll to explore verified trades &amp; pricing guides</span>
                <div className="w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center shadow-xs group-hover:border-[var(--accent)] group-hover:translate-y-1 transition-all">
                  <ChevronDown className="w-4 h-4 text-[var(--accent)] animate-bounce" />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: TRUST STRIP (4 Honest Points, No Exaggerations)*/}
        {/* ======================================================== */}
        <section className="section-sand py-8">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--pine-accent)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--text)] block font-bold">100% Free to Post</strong>
                  <span className="text-[var(--text-muted)]">No charges to receive quotes. Compare with zero obligation.</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-[var(--pine-accent)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--text)] block font-bold">Insurance & ID Checked</strong>
                  <span className="text-[var(--text-muted)]">We check public liability insurance and licensing bodies.</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <FileCheck className="w-4 h-4 text-[var(--pine-accent)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--text)] block font-bold">Compare Up to 3 Quotes</strong>
                  <span className="text-[var(--text-muted)]">Avoid overpaying. Review itemized quotes from local pros.</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[var(--pine-accent)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--text)] block font-bold">UK & US Coverage</strong>
                  <span className="text-[var(--text-muted)]">45% UK towns active, with fast growth across US metro hubs.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3B: MARKETPLACE FOOTPRINT (UK 45% + US EXPANSION) */}
        {/* ======================================================== */}
        <section className="section-light section-spacing border-b border-[var(--line)] bg-[var(--surface)]">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 pb-6 border-b border-[var(--line)]">
              <div className="max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--brand-light)] border border-[var(--line-subtle)] text-xs font-bold text-[var(--pine-accent)] mb-3">
                  <Globe className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                  <span>Established UK Presence &amp; Active US Expansion</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
                  Regional Market Coverage &amp; Contractor Network
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  Approximately 45% established coverage across UK metropolitan regions with strong growth momentum, alongside our newly launched US market expansion across 6 primary growth hubs.
                </p>
              </div>

              {/* Dual Market Tab Buttons */}
              <div className="mt-4 lg:mt-0 flex items-center bg-[var(--bg-alt)] p-1 rounded-[var(--radius)] border border-[var(--line)] shrink-0">
                <button
                  type="button"
                  onClick={() => setMarketTab("UK")}
                  className={`px-4 py-2 rounded-[var(--radius-sm)] text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                    marketTab === "UK"
                      ? "bg-[var(--brand)] text-white shadow-xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  <span>🇬🇧 UK Market (45% Active)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMarketTab("US")}
                  className={`px-4 py-2 rounded-[var(--radius-sm)] text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                    marketTab === "US"
                      ? "bg-[var(--accent)] text-white shadow-xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  <span>🇺🇸 USA Expansion (Live)</span>
                </button>
              </div>
            </div>

            {/* Tab 1: UK Established Network */}
            {marketTab === "UK" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
                <div className="lg:col-span-8 space-y-6">
                  <div className="p-6 rounded-[var(--radius)] bg-[var(--bg-alt)] border border-[var(--line)]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--line-subtle)] gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                          National Footprint &middot; UK
                        </span>
                        <h3 className="text-lg font-bold text-[var(--text)]">
                          Established UK Operations — 45% Planned Coverage Active
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-[var(--pine-accent)] bg-[var(--brand-light)] px-3 py-1 rounded-full border border-[var(--line-subtle)] w-fit">
                        5,280+ UK Tradesmen
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mt-4">
                      Our UK infrastructure is established across England, Scotland, and Wales. We have achieved over 45% of our targeted national postal coverage, leaving substantial runway for regional acquisition expansion.
                    </p>

                    <div className="mt-5">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--text)] block mb-2.5">
                        Primary UK Active City Hubs:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        {CITIES.filter((c) => c.country === "UK").map((city) => (
                          <Link
                            key={city.slug}
                            href={`/uk/plumbing/${city.slug}`}
                            className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line-subtle)] hover:border-[var(--brand)] hover:text-[var(--accent)] transition-colors flex items-center justify-between group"
                          >
                            <div>
                              <div className="font-bold text-[var(--text)] group-hover:text-[var(--accent)]">
                                {city.name}
                              </div>
                              <div className="text-[10px] text-[var(--text-light)]">
                                {city.populationText.split("·")[1]?.trim() || city.stateCounty}
                              </div>
                            </div>
                            <ArrowRight className="w-3 h-3 text-[var(--text-light)] group-hover:text-[var(--accent)]" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* UK Network Credibility Metrics */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-4">
                    <h4 className="font-bold text-sm text-[var(--text)]">
                      UK Compliance &amp; Vetting Standards
                    </h4>
                    <div className="space-y-3 text-xs">
                      <div className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[var(--pine-accent)] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[var(--text)] block font-bold">Gas Safe Register Mandate</strong>
                          <span className="text-[var(--text-muted)]">100% of boiler engineers checked against the official register.</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[var(--pine-accent)] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[var(--text)] block font-bold">NICEIC &amp; Part P Approved</strong>
                          <span className="text-[var(--text-muted)]">Electrical safety certification (EICR) compliant contractors.</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[var(--pine-accent)] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[var(--text)] block font-bold">£2M+ Public Liability Cover</strong>
                          <span className="text-[var(--text-muted)]">Verified policy documents stored and monitored annually.</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/uk"
                        className="w-full py-2.5 rounded-[var(--radius-sm)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white text-center font-bold text-xs transition-colors shadow-xs block"
                      >
                        Browse Full UK Directory &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: US Expansion Hub */}
            {marketTab === "US" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
                <div className="lg:col-span-8 space-y-6">
                  <div className="p-6 rounded-[var(--radius)] bg-[var(--bg-alt)] border border-[var(--line)]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--line-subtle)] gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                          Market Expansion &middot; USA
                        </span>
                        <h3 className="text-lg font-bold text-[var(--text)]">
                          USA Expansion — Active Across 6 High-Growth Hubs
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800 w-fit">
                        3,500+ US Contractors
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mt-4">
                      Launched this week to capture high-demand residential services in Sun Belt and metropolitan growth corridors. We have onboarded licensed electricians, HVAC technicians, and plumbers across Texas, California, Illinois, Florida, and Arizona.
                    </p>

                    <div className="mt-5">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--text)] block mb-2.5">
                        Active US Launch Metro Territories:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        {CITIES.filter((c) => c.country === "US").map((city) => (
                          <Link
                            key={city.slug}
                            href={`/us/hvac/${city.slug}`}
                            className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line-subtle)] hover:border-[var(--brand)] hover:text-[var(--accent)] transition-colors flex items-center justify-between group"
                          >
                            <div>
                              <div className="font-bold text-[var(--text)] group-hover:text-[var(--accent)]">
                                {city.name}, {city.stateCounty}
                              </div>
                              <div className="text-[10px] text-[var(--text-light)]">
                                {city.populationText.split("·")[1]?.trim() || city.postalPrefix}
                              </div>
                            </div>
                            <ArrowRight className="w-3 h-3 text-[var(--text-light)] group-hover:text-[var(--accent)]" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* US Expansion Network Credibility Metrics */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-4">
                    <h4 className="font-bold text-sm text-[var(--text)]">
                      US Licensing &amp; Compliance Standards
                    </h4>
                    <div className="space-y-3 text-xs">
                      <div className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[var(--pine-accent)] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[var(--text)] block font-bold">EPA Universal &amp; HVAC Regs</strong>
                          <span className="text-[var(--text-muted)]">Refrigerant handling and heat pump pressure certified pros.</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[var(--pine-accent)] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[var(--text)] block font-bold">OSHA Safety &amp; State Boards</strong>
                          <span className="text-[var(--text-muted)]">Verified state contractor board license numbers.</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[var(--pine-accent)] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[var(--text)] block font-bold">$1M+ Commercial General Liability</strong>
                          <span className="text-[var(--text-muted)]">Active certificate of insurance verification on file.</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/us"
                        className="w-full py-2.5 rounded-[var(--radius-sm)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-center font-bold text-xs transition-colors shadow-xs block"
                      >
                        Browse USA Expansion Directory &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 4: SERVICES (8 Rich Cards with Checklist & Links) */}
        {/* ======================================================== */}
        <section id="categories-section" className="section-light section-spacing border-b border-[var(--line)]">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
                  Core Trade Capabilities
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                  Services Provided by Verified Contractors
                </h2>
              </div>
              <div className="mt-3 md:mt-0 flex items-center space-x-3">
                {/* Currency & Market Rate Toggle */}
                <div className="flex items-center bg-[var(--surface)] p-1 rounded-[var(--radius-sm)] border border-[var(--line)] text-xs font-bold">
                  <span className="text-[10px] text-[var(--text-muted)] mr-2 uppercase tracking-wider pl-1">Currency:</span>
                  <button
                    type="button"
                    onClick={() => setPricingCurrency("GBP")}
                    className={`px-2.5 py-1 rounded-[var(--radius-sm)] transition-all cursor-pointer ${
                      pricingCurrency === "GBP"
                        ? "bg-[var(--brand)] text-white shadow-xs"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    £ GBP (UK)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPricingCurrency("USD")}
                    className={`px-2.5 py-1 rounded-[var(--radius-sm)] transition-all cursor-pointer ${
                      pricingCurrency === "USD"
                        ? "bg-[var(--accent)] text-white shadow-xs"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    $ USD (US)
                  </button>
                </div>

                <Link
                  href={`/${pricingCurrency === "GBP" ? "uk" : "us"}`}
                  className="text-xs font-bold text-[var(--accent)] hover:underline inline-flex items-center shrink-0"
                >
                  <span>Full directory</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.slug}
                  className="group rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex flex-col justify-between overflow-hidden hover:border-[var(--accent)] hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Visual Top Band with Category Accent */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-[var(--brand)] via-[var(--pine-accent)] to-[var(--accent)] opacity-80 group-hover:opacity-100 transition-opacity" />

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Icon & Live Badge */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-11 h-11 rounded-[var(--radius)] bg-[var(--brand-light)] text-[var(--pine-accent)] flex items-center justify-center border border-[var(--line-subtle)] group-hover:scale-105 group-hover:bg-[var(--accent-light)] group-hover:text-[var(--accent)] transition-all">
                          {iconMap[cat.icon] || <Wrench className="w-5 h-5" />}
                        </div>
                        {cat.emergencyAvailable ? (
                          <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                            24/7 Available
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-[var(--text-muted)] bg-[var(--bg-alt)] px-2 py-0.5 rounded">
                            Standard Dispatch
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-extrabold text-[var(--text)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-2">
                        {cat.shortDescription}
                      </p>

                      {/* Interactive Common Jobs Pill Tags */}
                      <div className="mb-4 pt-3 border-t border-[var(--line-subtle)]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-light)] block mb-2">
                          Common Repairs &amp; Work:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.commonJobs.slice(0, 3).map((job) => (
                            <Link
                              key={job}
                              href={`/quote?service=${cat.slug}&title=${encodeURIComponent(job)}`}
                              className="inline-flex items-center text-[10.5px] px-2 py-1 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-white transition-colors cursor-pointer border border-[var(--line-subtle)]"
                              title={`Request quotes for ${job}`}
                            >
                              <Check className="w-3 h-3 text-[var(--pine-accent)] group-hover:text-current mr-1 shrink-0" />
                              <span className="truncate max-w-[170px]">{job}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pricing Guide & Action Bar */}
                    <div className="pt-3 border-t border-[var(--line-subtle)]">
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="text-[11px] text-[var(--text-muted)]">Typical rate:</span>
                        <span className="font-extrabold text-xs text-[var(--text)] font-mono">
                          {pricingCurrency === "GBP" ? cat.avgPriceUK.split("/")[0] : cat.avgPriceUS.split("/")[0]}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/quote?service=${cat.slug}`}
                          className="py-2 px-2.5 rounded-[var(--radius-sm)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-center text-xs font-bold transition-colors shadow-xs"
                        >
                          Post Job
                        </Link>
                        <Link
                          href={`/${pricingCurrency === "GBP" ? "uk" : "us"}/${cat.slug}`}
                          className="py-2 px-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-center text-xs font-bold text-[var(--text)] transition-colors flex items-center justify-center space-x-1"
                        >
                          <span>Pricing</span>
                          <ArrowRight className="w-3 h-3 ml-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 5: HOW IT WORKS (3 Simple Steps + Note for Pros)  */}
        {/* ======================================================== */}
        <section className="section-sand section-spacing">
          <div className="container-custom">
            <div className="max-w-2xl mb-12">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
                Straightforward Process
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                How It Works for Homeowners
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                We make finding and hiring a reliable local tradesperson simple, transparent, and pressure-free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--brand)] text-[var(--bg)] font-bold text-sm flex items-center justify-center mb-4">
                    1
                  </div>
                  <h3 className="font-bold text-base text-[var(--text)] mb-2">
                    Describe your project
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Tell us what needs fixing or replacing, where you are located, and how urgent the task is. It takes under 2 minutes.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--line-subtle)] text-[11px] text-[var(--pine-accent)] font-semibold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  100% Free with no obligation
                </div>
              </div>

              <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--brand)] text-[var(--bg)] font-bold text-sm flex items-center justify-center mb-4">
                    2
                  </div>
                  <h3 className="font-bold text-base text-[var(--text)] mb-2">
                    Receive up to 3 quotes
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Only verified contractors who operate in your postcode radius will review your job and provide itemized pricing.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--line-subtle)] text-[11px] text-[var(--pine-accent)] font-semibold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Compare rates and reviews
                </div>
              </div>

              <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--brand)] text-[var(--bg)] font-bold text-sm flex items-center justify-center mb-4">
                    3
                  </div>
                  <h3 className="font-bold text-base text-[var(--text)] mb-2">
                    Hire directly and review
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Select the contractor who suits your timeline and budget. Once finished, share an honest review for other homeowners.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--line-subtle)] text-[11px] text-[var(--pine-accent)] font-semibold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Direct trade contact & billing
                </div>
              </div>
            </div>

            {/* Note for Trade Professionals */}
            <div className="mt-8 p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-[var(--text)] block">
                  Are you a licensed trade professional?
                </span>
                <span className="text-[var(--text-muted)]">
                  Join over 8,780+ vetted contractors. Receive qualified leads in your immediate postal area with no commission fees.
                </span>
              </div>
              <Link
                href="/for-pros"
                className="px-4 py-2 rounded-[var(--radius-sm)] border border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white font-bold transition-colors whitespace-nowrap"
              >
                Learn How Leads Work &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 6: POPULAR JOBS & TYPICAL COSTS (Tabular Guide)   */}
        {/* ======================================================== */}
        <section className="section-light section-spacing border-b border-[var(--line)]">
          <div className="container-custom">
            <div className="max-w-2xl mb-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
                Transparency First
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                Common Jobs & Typical Price Guidelines
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Price benchmarks are based on real completed jobs across our UK and US networks. Specific site conditions and emergency callouts may vary.
              </p>
            </div>

            <div className="overflow-x-auto rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] shadow-soft">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--bg-alt)] text-[var(--text)] font-bold uppercase text-[11px] border-b border-[var(--line)]">
                  <tr>
                    <th className="px-5 py-3.5">Job Description</th>
                    <th className="px-5 py-3.5">Category</th>
                    <th className="px-5 py-3.5">Typical UK Cost</th>
                    <th className="px-5 py-3.5">Typical US Cost</th>
                    <th className="px-5 py-3.5">Duration</th>
                    <th className="px-5 py-3.5 text-right">Get Quotes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line-subtle)] text-[var(--text)]">
                  {TYPICAL_JOB_PRICES.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[var(--bg-alt)]/50 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-[var(--text)]">
                        {item.job}
                        <span className="block text-[10px] font-normal text-[var(--text-light)] mt-0.5">
                          {item.notes}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-[var(--text-muted)]">
                        {item.category}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-[var(--text)]">
                        {item.ukPriceRange}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-[var(--text)]">
                        {item.usPriceRange}
                      </td>
                      <td className="px-5 py-3.5 text-[var(--text-muted)]">
                        {item.duration}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          href={`/quote?service=${item.category.toLowerCase()}`}
                          className="font-bold text-[var(--accent)] hover:underline"
                        >
                          Quote &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-[11px] text-[var(--text-light)]">
              * Note: These figures are general guidance based on regional averages. Final quotes are confirmed by your selected contractor after reviewing job scope.
            </p>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 7: OUR STORY / WHY US (Editorial Craftsman Block) */}
        {/* ======================================================== */}
        <section className="section-deep section-spacing">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Photo representation */}
              <div className="lg:col-span-5">
                <div className="rounded-[var(--radius)] border border-white/20 p-2 bg-black/20">
                  <div className="aspect-4/3 rounded-[var(--radius-sm)] overflow-hidden relative flex flex-col justify-between p-6 text-white border border-white/10">
                    <Image
                      src="/images/trades/copper-pipework.jpg"
                      alt="Master plumber fitting copper pipework and lever valves"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 480px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30" />
                    <div className="relative z-10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded w-fit">
                        Founded by Tradesmen
                      </span>
                    </div>
                    <div className="relative z-10">
                      <blockquote className="text-sm italic leading-relaxed text-white/95 drop-shadow-sm">
                        &ldquo;Homeowners do not need marketing buzzwords. They need a plumber who turns up on time, isolates the leak properly, and charges what they promised.&rdquo;
                      </blockquote>
                      <span className="text-xs font-bold text-white/80 block mt-2">
                        David Thornton &middot; Master Plumber & Co-Founder
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story text */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                  Why TradeConnect Exists
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--bg-deep-text)]">
                  Built to remove the guesswork from hiring trades.
                </h2>
                <p className="text-xs sm:text-sm text-[rgba(255,255,255,0.8)] leading-relaxed">
                  Too many directories list anyone who pays a monthly advertising subscription, regardless of whether they have active insurance or genuine skills.
                </p>
                <p className="text-xs sm:text-sm text-[rgba(255,255,255,0.8)] leading-relaxed">
                  We started TradeConnect with one rule: every tradesperson must have their business identity, public liability insurance, and governing body registrations verified before they can quote on domestic jobs. No sponsored rank manipulation. Just honest local tradespeople with genuine reviews.
                </p>

                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center px-5 py-3 rounded-[var(--radius)] bg-[var(--surface)] text-[var(--text)] font-bold text-xs hover:bg-[var(--bg-alt)] transition-colors shadow-xs"
                  >
                    <span>Read Our Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 8: FOR PROFESSIONALS (Benefits & Explainer)       */}
        {/* ======================================================== */}
        <section className="section-light section-spacing border-b border-[var(--line)]">
          <div className="container-custom">
            <div className="p-8 sm:p-12 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                  Contractor Network
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                  Grow your local trade business on honest terms.
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  We connect qualified tradespeople directly with homeowners searching in their exact postal codes. No commission deductions from your completed work, and no long-term lock-in contracts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[var(--pine-accent)] shrink-0" />
                    <span>Direct phone contacts for homeowners</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[var(--pine-accent)] shrink-0" />
                    <span>Set your own radius and trade scopes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[var(--pine-accent)] shrink-0" />
                    <span>Keep 100% of your labor rates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[var(--pine-accent)] shrink-0" />
                    <span>Verified badge increases quote acceptance</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center space-y-3 bg-[var(--bg-alt)] p-6 rounded-[var(--radius)] border border-[var(--line-subtle)]">
                <h4 className="font-bold text-sm text-[var(--text)]">
                  How Lead Routing Works
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Homeowners submit their specific repair or installation details. If the job matches your trade and postcode radius, you receive instant SMS and email notifications to quote.
                </p>
                <Link
                  href="/for-pros"
                  className="w-full py-3 rounded-[var(--radius-sm)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white text-center font-bold text-xs transition-colors shadow-xs"
                >
                  Apply to Join the Pro Network
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 9: REVIEWS (Carousel with Real Feedback)         */}
        {/* ======================================================== */}
        <section className="section-sand section-spacing">
          <div className="container-custom">
            <div className="max-w-2xl mb-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
                Authentic Experiences
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                What Homeowners Say About Our Network
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Every review is submitted with a verified job reference code. No sponsored or automated testimonials.
              </p>
            </div>

            <ReviewsCarousel reviews={HOME_REVIEWS} />
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 10: OUR WORK IN ACTION (Photo Gallery + Lightbox) */}
        {/* ======================================================== */}
        <section className="section-light section-spacing border-b border-[var(--line)]">
          <div className="container-custom">
            <div className="max-w-2xl mb-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
                Documented Craftsmanship
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                Our Work in Action
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Real photos from completed installations and repairs across our network. Click any image to view details and site notes.
              </p>
            </div>

            <WorkGallery photos={GALLERY_PHOTOS} />
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 11: WHERE WE WORK (Area Chips & Trade Accordions) */}
        {/* ======================================================== */}
        <section className="section-sand section-spacing">
          <div className="container-custom">
            <div className="max-w-2xl mb-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
                Regional Coverage
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                Where We Work Across the UK and USA
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Explore local contractors by town or browse full trade coverage directories. Every chip links directly to local verified listings.
              </p>
            </div>

            <AreaChips />
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 12: GUIDES & ADVICE (3 Latest Articles)          */}
        {/* ======================================================== */}
        <section className="section-light section-spacing border-b border-[var(--line)]">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
                  Practical Knowledge
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                  Guides & Cost Advice
                </h2>
              </div>
              <Link
                href="/blog"
                className="mt-3 md:mt-0 text-xs font-bold text-[var(--accent)] hover:underline inline-flex items-center"
              >
                <span>Read all articles</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BLOG_ARTICLES.map((article) => (
                <article
                  key={article.slug}
                  className="rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] overflow-hidden shadow-soft flex flex-col justify-between hover:border-[var(--brand)] transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between text-[11px] text-[var(--text-light)] mb-2.5">
                      <span className="font-bold text-[var(--accent)] uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-bold text-base text-[var(--text)] mb-2 leading-snug">
                      <Link href={`/blog/${article.slug}`} className="hover:text-[var(--accent)] transition-colors">
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="px-6 py-3 border-t border-[var(--line-subtle)] bg-[var(--bg-alt)]/40 flex items-center justify-between text-[11px]">
                    <span className="text-[var(--text-muted)]">{article.author}</span>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="font-bold text-[var(--brand)] hover:underline"
                    >
                      Read Guide &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 13: FAQ (Accessible Accordions + JSON-LD)         */}
        {/* ======================================================== */}
        <section className="section-sand section-spacing">
          <div className="container-custom">
            <div className="max-w-2xl mb-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
                Clear Answers
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Everything you need to know about our vetting standards, quote process, and homeowner guarantees.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <Accordion>
                {FAQS.slice(0, Math.ceil(FAQS.length / 2)).map((faq, i) => (
                  <AccordionItem
                    key={faq.id}
                    id={faq.id}
                    title={faq.question}
                    defaultOpen={i === 0}
                  >
                    <p>{faq.answer}</p>
                  </AccordionItem>
                ))}
              </Accordion>

              <Accordion>
                {FAQS.slice(Math.ceil(FAQS.length / 2)).map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    id={faq.id}
                    title={faq.question}
                    defaultOpen={false}
                  >
                    <p>{faq.answer}</p>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Relatable Support Strip for Large Devices */}
            <div className="mt-10 p-6 sm:p-8 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  Dedicated Homeowner Support
                </span>
                <h3 className="text-lg font-bold text-[var(--text)]">
                  Have a question about a complex renovation or emergency repair?
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Our UK &amp; US support team works directly with verified trade engineers. We provide independent arbitration, quote fairness checks, and dispute protection on all booked jobs.
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5 justify-end">
                <a
                  href="tel:+448001234567"
                  className="btn-brand px-4 py-2.5 rounded-[var(--radius-sm)] text-center text-xs font-bold text-white shadow-xs inline-flex items-center justify-center space-x-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 0800 123 4567</span>
                </a>
                <Link
                  href="/contact"
                  className="btn-secondary px-4 py-2.5 rounded-[var(--radius-sm)] text-center text-xs font-semibold text-[var(--text)] inline-flex items-center justify-center"
                >
                  <span>Submit Support Inquiry &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 14: FINAL CALL-TO-ACTION BAND (Deep Contrast Band)*/}
        {/* ======================================================== */}
        <section className="section-deep py-16 text-center">
          <div className="container-custom max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--bg-deep-text)] tracking-tight">
              Ready to find a vetted local tradesperson?
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[rgba(255,255,255,0.8)] leading-relaxed">
              Post your job in 2 minutes. Receive up to 3 quotes from verified, insured professionals near you. 100% free with no obligation.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/quote"
                className="px-8 py-3.5 rounded-[var(--radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Post Your Job Free
              </Link>
              <Link
                href="/pros"
                className="px-6 py-3.5 rounded-[var(--radius)] border border-white/30 text-white hover:bg-white/10 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Browse Directory
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
