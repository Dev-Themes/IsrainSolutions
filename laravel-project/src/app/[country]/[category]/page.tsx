import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { CATEGORIES, CITIES } from "@/lib/data";

interface PageProps {
  params: Promise<{ country: string; category: string }>;
}

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
  const countryName = country.toUpperCase() === "UK" ? "United Kingdom" : "United States";

  if (!currentCategory) {
    return { title: "Trade Category | TradeConnect" };
  }

  return {
    title: `${currentCategory.name} across ${countryName} | Verified Specialists`,
    description: `Find certified ${currentCategory.name.toLowerCase()} experts in the ${countryName}. Get free quotes with verified liability coverage.`,
  };
}

export default async function CategoryHubPage({ params }: PageProps) {
  const { country, category } = await params;
  const upper = country.toUpperCase() as "UK" | "US";
  const currentCategory = CATEGORIES.find((c) => c.slug === category);

  if (!currentCategory || (upper !== "UK" && upper !== "US")) {
    notFound();
  }

  const countryCities = CITIES.filter((c) => c.country === upper);

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-[var(--bg-alt)] border-b border-[var(--line)] text-xs py-3 px-4">
        <div className="container-custom flex items-center space-x-2 text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/${country}`} className="hover:text-[var(--text)]">{upper} Hub</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[var(--text)] font-semibold truncate">{currentCategory.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="section-light section-spacing border-b border-[var(--line)]">
        <div className="container-custom max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
            {upper} Category Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-3">
            {currentCategory.name} in {upper === "UK" ? "the United Kingdom" : "the United States"}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
            {currentCategory.fullDescription}
          </p>
          <Link
            href={`/quote?service=${category}`}
            className="inline-flex items-center px-5 py-3 rounded-[var(--radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] font-bold text-xs text-white shadow-xs"
          >
            Get Free Quotes for {currentCategory.name}
          </Link>
        </div>
      </section>

      {/* City Breakdown */}
      <section className="section-sand section-spacing">
        <div className="container-custom">
          <h2 className="text-xl font-extrabold text-[var(--text)] mb-6">
            Select Your City for Local {currentCategory.name} Rates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {countryCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${country}/${category}/${city.slug}`}
                className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] transition-colors flex items-center justify-between shadow-soft group"
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {city.name}
                  </div>
                  <div className="text-[11px] text-[var(--text-light)] mt-0.5">
                    {city.stateCounty} &middot; {city.postalPrefix}
                  </div>
                </div>
                <span className="text-xs font-bold text-[var(--accent)]">View Pros &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
