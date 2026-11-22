import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ShieldCheck,
  Star,
  Clock,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import { CATEGORIES, CITIES, VERIFIED_PROS } from "@/lib/data";
import { getSiteUrl } from "@/lib/site-config";
import { ServiceCostCalculator } from "@/components/services/service-cost-calculator";
import { UkFlagIcon, UsFlagIcon } from "@/components/ui/flag-icon";

interface PageProps {
  params: Promise<{ country: string; category: string }>;
}

export const instant = false;

export function generateStaticParams() {
  const params: { country: string; category: string }[] = [];
  for (const country of ["uk", "us"]) {
    for (const cat of CATEGORIES) {
      params.push({ country, category: cat.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country, category } = await params;
  const currentCategory = CATEGORIES.find((c) => c.slug === category);
  const upper = country.toUpperCase() as "UK" | "US";
  const countryName = upper === "UK" ? "United Kingdom" : "United States";
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${country}/${category}`;

  if (!currentCategory) {
    return { title: "Trade Category" };
  }

  const title = `${currentCategory.name} across ${countryName} | Verified Specialists`;
  const description = `Find certified ${currentCategory.name.toLowerCase()} experts across ${countryName}. Compare free quotes from vetted local pros with verified insurance coverage.`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-GB": `${siteUrl}/uk/${category}`,
        "en-US": `${siteUrl}/us/${category}`,
        "x-default": `${siteUrl}/uk/${category}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: upper === "UK" ? "en_GB" : "en_US",
      url: pageUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function getCategoryImage(slug: string) {
  switch (slug) {
    case "plumbing":
      return "/images/trades/copper-pipework.jpg";
    case "electrical":
      return "/images/trades/electrical-consumer-unit.jpg";
    case "gas-boiler":
      return "/images/trades/boiler-inspection.jpg";
    case "hvac":
      return "/images/trades/hvac-heat-pump.jpg";
    default:
      return "/images/trades/boiler-inspection.jpg";
  }
}

export default async function CategoryHubPage({ params }: PageProps) {
  const { country, category } = await params;
  const upper = country.toUpperCase() as "UK" | "US";
  const currentCategory = CATEGORIES.find((c) => c.slug === category);

  if (!currentCategory || (upper !== "UK" && upper !== "US")) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const countryName = upper === "UK" ? "United Kingdom" : "United States";
  const currencySymbol = upper === "UK" ? "£" : "$";
  const countryCities = CITIES.filter((c) => c.country === upper);
  const categoryImage = getCategoryImage(category);

  // Filter verified pros matching this category and country
  const matchingPros = VERIFIED_PROS.filter(
    (p) => p.country === upper && p.categories.includes(category)
  );
  const displayPros = matchingPros.length > 0 ? matchingPros : VERIFIED_PROS.filter((p) => p.country === upper).slice(0, 3);

  // JSON-LD Breadcrumbs & Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `${upper} Hub`,
            item: `${siteUrl}/${country}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: currentCategory.name,
            item: `${siteUrl}/${country}/${category}`,
          },
        ],
      },
      {
        "@type": "Service",
        name: `${currentCategory.name} in ${upper === "UK" ? "the United Kingdom" : "the United States"}`,
        serviceType: currentCategory.name,
        provider: {
          "@type": "Organization",
          name: "TradeConnect Verified Network",
          url: siteUrl,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col bg-[var(--bg)]">
        {/* Breadcrumb */}
        <div className="bg-[var(--surface)] border-b border-[var(--line)] text-xs py-3 px-4">
          <div className="container-custom flex items-center space-x-2 text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--text)] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/${country}`} className="hover:text-[var(--text)] transition-colors">{upper} Directory</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--text)] font-semibold truncate">{currentCategory.name}</span>
          </div>
        </div>

        {/* HIGH-IMPACT HERO SECTION WITH AUTHENTIC TRADE PHOTOGRAPHY */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[var(--surface)] via-[var(--bg)] to-[var(--bg-alt)] border-b border-[var(--line)] py-12 lg:py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Headline, stats and badges */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs font-bold text-[var(--text)] shadow-2xs">
                    {upper === "UK" ? <UkFlagIcon className="w-4 h-3 rounded-[2px]" /> : <UsFlagIcon className="w-4 h-3 rounded-[2px]" />}
                    <span>{countryName} Verified Specialist Network</span>
                  </div>

                  {currentCategory.emergencyAvailable && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      24/7 Emergency Dispatch Available
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text)] tracking-tight leading-tight">
                  {currentCategory.name} in {countryName}
                </h1>

                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-xl">
                  {currentCategory.fullDescription}
                </p>

                {/* Rates & Guarantee Chips */}
                <div className="flex flex-wrap gap-3 pt-1 text-xs">
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--line)] shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">Typical Hourly Rates</span>
                    <span className="text-base font-black text-[var(--accent)]">
                      {upper === "UK" ? currentCategory.avgPriceUK : currentCategory.avgPriceUS}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--line)] shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">Insurance Verification</span>
                    <span className="text-base font-black text-[var(--pine-accent)] flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 inline" /> {upper === "UK" ? "£2,000,000" : "$1,000,000"} Cover
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--line)] shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">Response Time</span>
                    <span className="text-base font-black text-[var(--brand)] flex items-center gap-1">
                      <Clock className="w-4 h-4 inline" /> 42 Mins Avg
                    </span>
                  </div>
                </div>

                {/* Primary CTAs */}
                <div className="flex flex-wrap gap-3.5 pt-2">
                  <Link
                    href={`/quote?service=${category}`}
                    className="px-6 py-3.5 rounded-[var(--radius)] btn-primary font-bold text-xs sm:text-sm text-white shadow-md hover:shadow-lg inline-flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Get Up To 3 Free Quotes</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="#calculator"
                    className="px-5 py-3.5 rounded-[var(--radius)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] border border-[var(--line)] text-xs sm:text-sm font-bold text-[var(--text)] inline-flex items-center gap-2 transition-colors shadow-2xs"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Calculate Project Cost</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Visual Showcase */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl p-3 bg-gradient-to-br from-[var(--surface)] to-[var(--bg-alt)] border border-[var(--line)] shadow-xl">
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden border border-[var(--line)]">
                    <Image
                      src={categoryImage}
                      alt={`${currentCategory.name} licensed professional at work`}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10 flex items-center gap-1.5">
                      <BadgeCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>Certified &amp; Vetted Trades</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/15">
                        <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                          <span>TradeConnect Vetting Standard</span>
                          <span className="text-amber-400">4.96 ★ Rated</span>
                        </div>
                        <p className="text-[11px] text-white/80">
                          Background checks, public liability insurance, and governing trade licences strictly verified before dispatch.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE COST & ESTIMATOR SECTION */}
        <section id="calculator" className="section-sand section-spacing">
          <div className="container-custom max-w-4xl">
            <div className="text-center mb-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                Interactive Cost Estimator
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--text)] mt-1 tracking-tight">
                Calculate Transparent {currentCategory.name} Rates
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 max-w-lg mx-auto">
                Select your repair or installation task below for an instant, real-time breakdown of typical labor and parts costs across {countryName}.
              </p>
            </div>

            <ServiceCostCalculator
              country={upper}
              categorySlug={category}
              categoryName={currentCategory.name}
              currencySymbol={currencySymbol}
            />
          </div>
        </section>

        {/* COMMON JOBS & DIAGNOSTIC CHECKLIST */}
        {currentCategory.commonJobs && currentCategory.commonJobs.length > 0 && (
          <section className="section-light section-spacing border-y border-[var(--line)]">
            <div className="container-custom max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
                    Job Specifications
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
                    Common {currentCategory.name} Jobs We Solve
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                    Every task is covered by our transparent pricing policy and insured workmanship guarantee.
                  </p>
                </div>

                <Link
                  href={`/quote?service=${category}`}
                  className="px-4 py-2 rounded-[var(--radius-sm)] btn-primary text-xs font-bold text-white self-start sm:self-auto shrink-0"
                >
                  Post Your Requirement
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentCategory.commonJobs.map((job, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)] shadow-2xs hover:border-[var(--brand)] transition-colors flex items-start space-x-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[var(--brand-light)] text-[var(--brand)] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xs sm:text-sm text-[var(--text)]">
                        {job}
                      </h3>
                      <span className="text-[11px] text-[var(--pine-accent)] font-semibold flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3 h-3" /> Vetted Specialists Available
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SPOTLIGHT: TOP-RATED VERIFIED PROS IN THIS CATEGORY */}
        <section className="section-sand section-spacing">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
                  Vetted Directory
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
                  Featured {currentCategory.name} Specialists
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                  Actively insured and identity-verified contractors in our network.
                </p>
              </div>

              <Link
                href="/pros"
                className="text-xs font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
              >
                <span>View All Verified Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPros.map((pro) => (
                <div
                  key={pro.id}
                  className="rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-soft p-6 flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-extrabold text-base text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                          {pro.companyName}
                        </h3>
                        <div className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                          <span>{pro.city} &middot; {pro.postcodeOrZip}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{pro.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                      {pro.bio}
                    </p>

                    <div className="p-3 rounded-lg bg-[var(--bg-alt)] border border-[var(--line-subtle)] text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Licence / Reg:</span>
                        <span className="font-bold text-[var(--text)]">{pro.licenseNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Insurance:</span>
                        <span className="font-bold text-[var(--pine-accent)]">{pro.insuranceAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Standard Rate:</span>
                        <span className="font-extrabold text-[var(--text)]">
                          {currencySymbol}{pro.hourlyRate}/hr
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--line-subtle)]">
                    <Link
                      href={`/quote?service=${category}&pro=${pro.slug}`}
                      className="w-full py-2.5 rounded-[var(--radius-sm)] btn-primary text-center font-bold text-xs text-white shadow-xs block transition-colors"
                    >
                      Request Free Estimate
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REDESIGNED: SELECT YOUR CITY FOR LOCAL RATES (REPLACES BORING -> ARROWS) */}
        <section className="section-light section-spacing border-b border-[var(--line)]">
          <div className="container-custom">
            <div className="text-center mb-8 max-w-2xl mx-auto">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                Local Area Pricing
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] mt-1 tracking-tight">
                Select Your City for Local {currentCategory.name} Rates
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5">
                Local callout rates and vetted specialist availability across {countryName} metropolitan areas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {countryCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${country}/${category}/${city.slug}`}
                  className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] hover:shadow-md transition-all flex items-center justify-between group shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--brand-light)] text-[var(--brand)] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                      <MapPin className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        {city.name}
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                        {city.stateCounty} &middot; <span className="font-semibold text-[var(--text)]">{city.postalPrefix}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-3 py-1.5 rounded-lg bg-[var(--bg-alt)] group-hover:bg-[var(--accent)] group-hover:text-white text-xs font-bold text-[var(--text)] transition-colors shrink-0">
                    View Pros
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
