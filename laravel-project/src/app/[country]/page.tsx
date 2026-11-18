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
  Wrench,
  Zap,
  Flame,
  Hammer,
  Sparkles,
  Award,
  Users,
} from "lucide-react";
import { CATEGORIES, CITIES, VERIFIED_PROS } from "@/lib/data";
import { getSiteUrl } from "@/lib/site-config";
import { UkFlagIcon, UsFlagIcon } from "@/components/ui/flag-icon";

interface PageProps {
  params: Promise<{ country: string }>;
}

export const instant = false;

export function generateStaticParams() {
  return [{ country: "uk" }, { country: "us" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const upper = country.toUpperCase() as "UK" | "US";
  const countryName = upper === "UK" ? "United Kingdom" : "United States";
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${country}`;

  const title = `${countryName} Trade Services Directory | Vetted Local Pros`;
  const description = `Browse verified trade professionals across the ${countryName}. Top plumbers, electricians, roofers, and HVAC contractors with guaranteed ratings and insurance.`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-GB": `${siteUrl}/uk`,
        "en-US": `${siteUrl}/us`,
        "x-default": `${siteUrl}/uk`,
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

function getCategoryIcon(slug: string) {
  switch (slug) {
    case "plumbing":
      return <Wrench className="w-5 h-5 text-blue-500" />;
    case "electrical":
      return <Zap className="w-5 h-5 text-amber-500" />;
    case "gas-boiler":
      return <Flame className="w-5 h-5 text-orange-500" />;
    default:
      return <Hammer className="w-5 h-5 text-emerald-500" />;
  }
}

export default async function CountryHubPage({ params }: PageProps) {
  const { country } = await params;
  const upper = country.toUpperCase() as "UK" | "US";

  if (upper !== "UK" && upper !== "US") {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const countryName = upper === "UK" ? "United Kingdom" : "United States";
  const countryCities = CITIES.filter((c) => c.country === upper);
  const countryPros = VERIFIED_PROS.filter((p) => p.country === upper);

  // JSON-LD Breadcrumbs
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
            name: `${countryName} Directory`,
            item: `${siteUrl}/${country}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col">
        {/* Visible Breadcrumb */}
        <div className="bg-[var(--bg-alt)] border-b border-[var(--line)] text-xs py-3 px-4">
          <div className="container-custom flex items-center space-x-2 text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--text)] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--text)] font-semibold">{countryName} Marketplace Hub</span>
          </div>
        </div>

        {/* EYE-CATCHING HERO SECTION WITH MEDIA SHOWCASE */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[var(--surface)] via-[var(--bg)] to-[var(--bg-alt)] border-b border-[var(--line)] py-12 lg:py-20">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Headlines & CTA */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--line)] shadow-2xs text-xs font-bold text-[var(--text)]">
                  {upper === "UK" ? <UkFlagIcon className="w-4 h-3 rounded-[2px]" /> : <UsFlagIcon className="w-4 h-3 rounded-[2px]" />}
                  <span className="text-[var(--accent)]">
                    {upper === "UK" ? "Established UK Network · 45% National Coverage" : "USA Expansion Hub · Active Metro Rollout"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text)] tracking-tight leading-[1.12]">
                  {upper === "UK" ? (
                    <>
                      Vetted, Insured <span className="text-[var(--accent)]">Trade Professionals</span> Across the UK
                    </>
                  ) : (
                    <>
                      Licensed <span className="text-[var(--accent)]">Contractor Directory</span> Across the USA
                    </>
                  )}
                </h1>

                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-xl">
                  {upper === "UK"
                    ? "Connect with Gas Safe engineers, NICEIC certified electricians, and accredited master plumbers. Every local contractor carries verified £2M+ public liability insurance and identity screening."
                    : "Connect with OSHA-compliant, state-licensed trade specialists in rapid-growth metropolitan corridors. Direct quotes, emergency dispatch, and vetted insurance validation."}
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-3 pt-1 text-xs text-[var(--text)] font-semibold">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--line)] shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-[var(--pine-accent)]" />
                    <span>100% Vetted &amp; Insured</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--line)] shadow-2xs">
                    <Clock className="w-4 h-4 text-[var(--accent)]" />
                    <span>42 Min Average Response</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--line)] shadow-2xs">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>4.96/5 Customer Rating</span>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="flex flex-wrap gap-3.5 pt-3">
                  <Link
                    href="/quote"
                    className="px-6 py-3.5 rounded-[var(--radius)] btn-primary font-bold text-xs sm:text-sm text-white shadow-md hover:shadow-lg inline-flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Post a Job in {upper} &amp; Compare Quotes</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/pros"
                    className="px-5 py-3.5 rounded-[var(--radius)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] border border-[var(--line)] text-xs sm:text-sm font-bold text-[var(--text)] inline-flex items-center gap-2 transition-colors shadow-2xs"
                  >
                    <Users className="w-4 h-4 text-[var(--brand)]" />
                    <span>Browse {countryPros.length}+ Verified Pros</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: High-Impact Visual Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl p-3 bg-gradient-to-br from-[var(--surface)] to-[var(--bg-alt)] border border-[var(--line)] shadow-xl">
                  {/* Image container */}
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden border border-[var(--line)]">
                    <Image
                      src={upper === "UK" ? "/images/trades/copper-pipework.jpg" : "/images/trades/boiler-inspection.jpg"}
                      alt={upper === "UK" ? "Vetted UK trade specialist fitting copper pipework" : "USA HVAC and boiler technician inspecting residential equipment"}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Floating pill: Live Dispatch */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white border border-white/10 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{upper === "UK" ? "Live Dispatch Across 6 UK Hubs" : "Live Dispatch in Active US Metros"}</span>
                    </div>

                    {/* Floating badge bottom */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/15">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs text-white">
                            {upper === "UK" ? "Verified UK Trades Network" : "Licensed US Pro Network"}
                          </span>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[var(--accent)] text-white">
                            Identity Checked
                          </span>
                        </div>
                        <p className="text-[11px] text-white/80 mt-1">
                          Zero rogue traders. Transparent pricing models with zero upfront commission fees.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Micro stats under image */}
                  <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                    <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--line-subtle)]">
                      <div className="text-base font-black text-[var(--accent)]">{countryCities.length}</div>
                      <div className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">Metros</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--line-subtle)]">
                      <div className="text-base font-black text-[var(--brand)]">{CATEGORIES.length}</div>
                      <div className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">Categories</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--line-subtle)]">
                      <div className="text-base font-black text-[var(--pine-accent)]">£0 / $0</div>
                      <div className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">Free Quotes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REDESIGNED: BROWSE BY TOWN / CITY WITH MODERN INTERACTIVE CARDS */}
        <section className="section-sand section-spacing">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
                  Local Coverage Hubs
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
                  Browse by Town &amp; City in {countryName}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-xl">
                  Select your metropolitan region to view active verified pros, typical callout rates, and regional customer feedback.
                </p>
              </div>

              <div className="text-xs font-semibold text-[var(--text-muted)]">
                Showing {countryCities.length} active service districts
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {countryCities.map((city) => (
                <div
                  key={city.slug}
                  className="rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft hover:shadow-md hover:border-[var(--brand)]/60 transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Card Header */}
                  <div className="p-5 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--brand-light)] text-[var(--brand)] flex items-center justify-center font-bold">
                          <MapPin className="w-4 h-4 text-[var(--accent)]" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                            {city.name}
                          </h3>
                          <span className="text-[11px] font-medium text-[var(--text-muted)]">
                            {city.stateCounty} &middot; <span className="font-semibold text-[var(--text)]">{city.postalPrefix}</span>
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[var(--bg-alt)] border border-[var(--line-subtle)] text-[var(--text-muted)]">
                        Active Hub
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-muted)] mt-2">
                      {city.populationText}
                    </p>
                  </div>

                  {/* Interactive Trade Service Badges (Replaces boring -> arrows) */}
                  <div className="p-4 bg-[var(--bg-alt)]/60 border-t border-[var(--line-subtle)] space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Instant Local Trade Directory:
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <Link
                        href={`/${country}/plumbing/${city.slug}`}
                        className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] hover:bg-[var(--brand-light)]/20 text-center transition-all group/item shadow-2xs"
                      >
                        <div className="w-6 h-6 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center mb-1 group-hover/item:scale-110 transition-transform">
                          <Wrench className="w-3.5 h-3.5" />
                        </div>
                        <span className="block text-[11px] font-bold text-[var(--text)] group-hover/item:text-[var(--accent)]">
                          Plumbing
                        </span>
                      </Link>

                      <Link
                        href={`/${country}/electrical/${city.slug}`}
                        className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] hover:bg-[var(--brand-light)]/20 text-center transition-all group/item shadow-2xs"
                      >
                        <div className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-1 group-hover/item:scale-110 transition-transform">
                          <Zap className="w-3.5 h-3.5" />
                        </div>
                        <span className="block text-[11px] font-bold text-[var(--text)] group-hover/item:text-[var(--accent)]">
                          Electrical
                        </span>
                      </Link>

                      <Link
                        href={`/${country}/gas-boiler/${city.slug}`}
                        className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] hover:bg-[var(--brand-light)]/20 text-center transition-all group/item shadow-2xs"
                      >
                        <div className="w-6 h-6 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 mx-auto flex items-center justify-center mb-1 group-hover/item:scale-110 transition-transform">
                          <Flame className="w-3.5 h-3.5" />
                        </div>
                        <span className="block text-[11px] font-bold text-[var(--text)] group-hover/item:text-[var(--accent)]">
                          Heating
                        </span>
                      </Link>
                    </div>

                    <div className="pt-1.5 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[var(--pine-accent)] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Insured Pros Available
                      </span>
                      <Link
                        href={`/${country}/plumbing/${city.slug}`}
                        className="text-[11px] font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>View {city.name} Rates</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REDESIGNED: ALL TRADE CATEGORIES WITH INTERACTIVE RICH CARDS */}
        <section className="section-light section-spacing border-b border-[var(--line)]">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
                  Comprehensive Directory
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
                  All Trade Categories in {countryName}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-xl">
                  Compare hourly rates, emergency callout costs, and verified credentials across every domestic and commercial trade discipline.
                </p>
              </div>

              <Link
                href="/quote"
                className="text-xs font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${country}/${cat.slug}`}
                  className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--accent)] hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    {/* Top Row: Icon & Emergency Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-[var(--bg-alt)] border border-[var(--line)] flex items-center justify-center group-hover:scale-105 transition-transform">
                        {getCategoryIcon(cat.slug)}
                      </div>

                      {cat.emergencyAvailable && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          24/7 Callout
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1.5 line-clamp-2 leading-relaxed">
                        {cat.shortDescription}
                      </p>
                    </div>

                    {/* Typical Rate Chip */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--bg-alt)] border border-[var(--line-subtle)] text-[11px] font-bold text-[var(--text)]">
                      <span className="text-[var(--text-muted)] font-normal">Typical:</span>
                      <span>{upper === "UK" ? cat.avgPriceUK : cat.avgPriceUS}</span>
                    </div>
                  </div>

                  {/* Card Footer with hover animation */}
                  <div className="pt-4 mt-4 border-t border-[var(--line-subtle)] flex items-center justify-between text-xs font-bold text-[var(--accent)]">
                    <span>View Specialists &amp; Rates</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
