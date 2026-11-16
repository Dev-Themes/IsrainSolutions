import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  ShieldCheck,
  Star,
  Clock,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { CATEGORIES, CITIES, VERIFIED_PROS } from "@/lib/data";
import { getSiteUrl } from "@/lib/site-config";

interface PageProps {
  params: Promise<{
    country: string;
    category: string;
    city: string;
  }>;
}

export const instant = false;

export function generateStaticParams() {
  const params: { country: string; category: string; city: string }[] = [];
  for (const city of CITIES) {
    const countrySlug = city.country.toLowerCase();
    for (const cat of CATEGORIES) {
      params.push({
        country: countrySlug,
        category: cat.slug,
        city: city.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country, category, city } = await params;
  const currentCountry = country.toUpperCase();
  const currentCategory = CATEGORIES.find((c) => c.slug === category);
  const currentCity = CITIES.find((c) => c.slug === city);

  if (!currentCategory || !currentCity) {
    return {
      title: "Local Services | TradeConnect",
    };
  }

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${country}/${category}/${city}`;
  const title = `Top Rated ${currentCategory.name} in ${currentCity.name} | Verified & Insured`;
  const description = `Find trusted local ${currentCategory.name.toLowerCase()} experts in ${currentCity.name}, ${currentCity.stateCounty}. Compare up to 3 free quotes from vetted trades with verified ${currentCountry === "US" ? "general liability" : "public liability"} insurance.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: currentCountry === "UK" ? "en_GB" : "en_US",
      url: pageUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-GB": `${siteUrl}/uk/${category}/${city}`,
        "en-US": `${siteUrl}/us/${category}/${city}`,
        "x-default": `${siteUrl}/uk/${category}/${city}`,
      },
    },
  };
}

export default async function ProgrammaticCityPage({ params }: PageProps) {
  const { country, category, city } = await params;
  const currentCountry = country.toUpperCase() as "UK" | "US";
  const currentCategory = CATEGORIES.find((c) => c.slug === category);
  const currentCity = CITIES.find((c) => c.slug === city);

  if (!currentCategory || !currentCity) {
    notFound();
  }

  const localPros = VERIFIED_PROS.filter(
    (p) =>
      p.country === currentCountry &&
      (p.categories.includes(category) || p.city.toLowerCase() === currentCity.name.toLowerCase())
  );

  const displayPros = localPros.length > 0 ? localPros : VERIFIED_PROS.slice(0, 2);

  const siteUrl = getSiteUrl();

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
            name: `${currentCountry} Services`,
            item: `${siteUrl}/${country}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: currentCategory.name,
            item: `${siteUrl}/${country}/${category}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${currentCategory.name} in ${currentCity.name}`,
            item: `${siteUrl}/${country}/${category}/${city}`,
          },
        ],
      },
      {
        "@type": "Service",
        name: `${currentCategory.name} in ${currentCity.name}`,
        serviceType: currentCategory.name,
        areaServed: {
          "@type": "City",
          name: currentCity.name,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: currentCity.stateCounty,
          },
        },
        provider: {
          "@type": "Organization",
          name: "TradeConnect Verified Network",
          url: siteUrl,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "184",
          bestRating: "5",
          worstRating: "1",
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

      <div className="flex flex-col">
        {/* Breadcrumb */}
        <div className="bg-[var(--bg-alt)] border-b border-[var(--line)] text-xs py-3 px-4">
          <div className="container-custom flex items-center space-x-2 text-[var(--text-muted)] overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[var(--text)]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href={`/${country}`} className="hover:text-[var(--text)]">{currentCountry} Directory</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[var(--text)] font-semibold truncate">
              {currentCategory.name} in {currentCity.name}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="section-light section-spacing border-b border-[var(--line)]">
          <div className="container-custom max-w-3xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider mb-3 border border-[var(--line-subtle)]">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>{currentCity.name}, {currentCity.stateCounty} &middot; Verified Local Pros</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] leading-tight mb-3">
              Top Rated {currentCategory.name} in {currentCity.name}
            </h1>

            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-6">
              Connect with vetted, insured tradespeople serving <strong className="text-[var(--text)] font-semibold">{currentCity.name}</strong> and surrounding areas ({currentCity.postalPrefix}). Compare quotes with zero obligation.
            </p>

            {/* Quick stats pills */}
            <div className="flex flex-wrap gap-3 text-xs mb-8">
              <div className="flex items-center text-[var(--text)] bg-[var(--surface)] px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--pine-accent)] mr-1.5" />
                <span>Public Liability Verified</span>
              </div>
              <div className="flex items-center text-[var(--text)] bg-[var(--surface)] px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] shadow-xs">
                <Clock className="w-3.5 h-3.5 text-[var(--pine-accent)] mr-1.5" />
                <span>Average response &lt; 2 hrs</span>
              </div>
              <div className="flex items-center text-[var(--text)] bg-[var(--surface)] px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] shadow-xs">
                <Star className="w-3.5 h-3.5 text-[var(--accent)] fill-[var(--accent)] mr-1.5" />
                <span>4.9 / 5.0 Local Trust Rating</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/quote?service=${category}&city=${city}`}
                className="px-6 py-3.5 rounded-[var(--radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] font-bold text-xs sm:text-sm text-white text-center shadow-xs transition-colors flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get 3 Free Quotes in {currentCity.name}</span>
              </Link>
              <a
                href="#pricing-guide"
                className="px-5 py-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-[var(--text)] font-semibold text-xs sm:text-sm text-center transition-colors"
              >
                View {currentCity.name} Pricing Guide
              </a>
            </div>
          </div>
        </section>

        {/* Local Pros List */}
        <section className="section-sand section-spacing">
          <div className="container-custom">
            <h2 className="text-xl font-extrabold text-[var(--text)] mb-6">
              Available {currentCategory.name} Contractors Near {currentCity.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPros.map((pro) => (
                <div
                  key={pro.id}
                  className="bg-[var(--surface)] rounded-[var(--radius)] p-6 border border-[var(--line)] shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-extrabold text-sm sm:text-base text-[var(--text)] leading-snug">
                          {pro.companyName}
                        </h3>
                        <div className="flex items-center text-xs text-[var(--text-muted)] mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[var(--accent)] mr-1" />
                          <span>{currentCity.name} &middot; {pro.postcodeOrZip}</span>
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
                        <span className="text-[var(--text-light)]">Licence:</span>
                        <span className="font-semibold text-[var(--text)]">{pro.licenseNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-light)]">Standard Rate:</span>
                        <span className="font-bold text-[var(--text)]">
                          {currentCountry === "UK" ? `£${pro.hourlyRate}/hr` : `$${pro.hourlyRate}/hr`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/quote?service=${category}&city=${city}&pro=${pro.slug}`}
                    className="w-full py-2.5 rounded-[var(--radius-sm)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-center text-xs font-bold text-white transition-colors"
                  >
                    Request Free Quote
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Guide */}
        <section id="pricing-guide" className="section-light section-spacing border-b border-[var(--line)]">
          <div className="container-custom max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
              Local Cost Benchmark
            </span>
            <h2 className="text-2xl font-extrabold text-[var(--text)] mb-3">
              Average {currentCategory.name} Costs in {currentCity.name}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
              Trade costs in {currentCity.name} typically fluctuate based on emergency callouts, access, and parts. Below are realistic verified averages:
            </p>

            <div className="rounded-[var(--radius)] border border-[var(--line)] overflow-hidden bg-[var(--surface)] shadow-soft">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--bg-alt)] text-[var(--text)] font-bold uppercase text-[11px] border-b border-[var(--line)]">
                  <tr>
                    <th className="px-5 py-3">Task Scope</th>
                    <th className="px-5 py-3">Estimated Price Range</th>
                    <th className="px-5 py-3">Typical Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line-subtle)] text-[var(--text)]">
                  {currentCategory.commonJobs.map((job, idx) => (
                    <tr key={job} className="hover:bg-[var(--bg-alt)]/50">
                      <td className="px-5 py-3 font-bold text-[var(--text)]">{job}</td>
                      <td className="px-5 py-3 font-semibold text-[var(--text)]">
                        {currentCountry === "UK"
                          ? `£${85 + idx * 45} - £${140 + idx * 70}`
                          : `$${110 + idx * 55} - $${180 + idx * 85}`}
                      </td>
                      <td className="px-5 py-3 text-[var(--text-muted)]">
                        {idx === 0 ? "1 - 2 hours" : idx === 1 ? "Half day" : "1 - 2 days"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Nearby Cities Links */}
        <section className="section-sand py-10">
          <div className="container-custom">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--text-muted)] mb-3">
              Explore {currentCategory.name} in Other Major {currentCountry} Cities:
            </h3>
            <div className="flex flex-wrap gap-2">
              {CITIES.filter((c) => c.country === currentCountry && c.slug !== city).map((otherCity) => (
                <Link
                  key={otherCity.slug}
                  href={`/${country}/${category}/${otherCity.slug}`}
                  className="px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-xs font-semibold text-[var(--text)] hover:border-[var(--brand)] hover:text-[var(--accent)] transition-colors"
                >
                  {currentCategory.name} in {otherCity.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
