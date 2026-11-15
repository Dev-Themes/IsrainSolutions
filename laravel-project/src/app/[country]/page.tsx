import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, CITIES } from "@/lib/data";

interface PageProps {
  params: Promise<{ country: string }>;
}

export function generateStaticParams() {
  return [{ country: "uk" }, { country: "us" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const upper = country.toUpperCase();
  const countryName = upper === "UK" ? "United Kingdom" : "United States";

  return {
    title: `${countryName} Trade Services Directory | Vetted Local Pros`,
    description: `Browse verified trade professionals across the ${countryName}. Top plumbers, electricians, roofers, and HVAC contractors with guaranteed ratings.`,
  };
}

export default async function CountryHubPage({ params }: PageProps) {
  const { country } = await params;
  const upper = country.toUpperCase() as "UK" | "US";

  if (upper !== "UK" && upper !== "US") {
    notFound();
  }

  const countryName = upper === "UK" ? "United Kingdom" : "United States";
  const countryCities = CITIES.filter((c) => c.country === upper);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="section-light section-spacing border-b border-[var(--line)]">
        <div className="container-custom max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
            {upper === "UK" ? "🇬🇧 Established Network (45% UK Coverage)" : "🇺🇸 USA Expansion Hub"}
          </span>
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
  );
}
