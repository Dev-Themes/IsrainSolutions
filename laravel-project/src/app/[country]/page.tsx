import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { CATEGORIES, CITIES } from "@/lib/data";
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

export default async function CountryHubPage({ params }: PageProps) {
  const { country } = await params;
  const upper = country.toUpperCase() as "UK" | "US";

  if (upper !== "UK" && upper !== "US") {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const countryName = upper === "UK" ? "United Kingdom" : "United States";
  const countryCities = CITIES.filter((c) => c.country === upper);

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
            <Link href="/" className="hover:text-[var(--text)]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--text)] font-semibold">{countryName} Hub</span>
          </div>
        </div>

        {/* Hero */}
        <section className="section-light section-spacing border-b border-[var(--line)]">
          <div className="container-custom max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs font-bold text-[var(--text)] mb-3">
              {upper === "UK" ? <UkFlagIcon /> : <UsFlagIcon />}
              <span>{upper === "UK" ? "Established Network (45% UK Coverage)" : "USA Expansion Hub (Active Launch)"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-3">
              {countryName} Trade Directory
            </h1>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
              Explore vetted, insured local contractors operating across {countryName} cities and towns. Compare quotes with zero obligation.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center px-5 py-3 rounded-[var(--radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] font-bold text-xs text-white shadow-xs"
            >
              Post a Job in {upper}
            </Link>
          </div>
        </section>

      {/* Cities */}
      <section className="section-sand section-spacing">
        <div className="container-custom">
          <h2 className="text-xl font-extrabold text-[var(--text)] mb-6">
            Browse by Town / City
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {countryCities.map((city) => (
              <div
                key={city.slug}
                className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-extrabold text-sm text-[var(--text)]">
                      {city.name}
                    </h3>
                    <span className="text-[11px] text-[var(--text-light)]">
                      {city.stateCounty}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mb-3">
                    {city.populationText}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--line-subtle)] text-[11px]">
                  <Link
                    href={`/${country}/plumbing/${city.slug}`}
                    className="font-semibold text-[var(--accent)] hover:underline"
                  >
                    Plumbers &rarr;
                  </Link>
                  <Link
                    href={`/${country}/electrical/${city.slug}`}
                    className="font-semibold text-[var(--accent)] hover:underline"
                  >
                    Electricians &rarr;
                  </Link>
                  <Link
                    href={`/${country}/roofing/${city.slug}`}
                    className="font-semibold text-[var(--accent)] hover:underline"
                  >
                    Roofers &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-light section-spacing border-b border-[var(--line)]">
        <div className="container-custom">
          <h2 className="text-xl font-extrabold text-[var(--text)] mb-6">
            All Trade Categories in {countryName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${country}/${cat.slug}`}
                className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] transition-colors flex flex-col justify-between shadow-soft group"
              >
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2">
                    {cat.shortDescription}
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[var(--accent)] mt-3 block">
                  View Rates &rarr;
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
