import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getAllArticles } from "@/lib/articles";
import { constructMetadata, siteConfig } from "@/lib/seo";
import { Clock, ArrowRight, BookOpen, Search, Sparkles } from "lucide-react";

export const metadata = constructMetadata({
  title: "All Career Guides & Executive Insights | CareerVixa",
  description: "Browse CareerVixa's full directory of data-backed career frameworks, salary negotiation guides, and interview mastery scripts.",
  url: `${siteConfig.url}/articles`,
});

export default async function ArticlesIndexPage(props: {
  searchParams: Promise<{ search?: string; q?: string; category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = (searchParams.search || searchParams.q || "").toLowerCase().trim();
  const selectedCategory = (searchParams.category || "").toLowerCase().trim();

  const allArticles = await getAllArticles();

  const filteredArticles = allArticles.filter((article) => {
    const matchesQuery =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query) ||
      (article.tags && article.tags.some((t) => t.toLowerCase().includes(query)));

    const matchesCategory =
      !selectedCategory ||
      article.category.toLowerCase().replace(/[^a-z0-9]/g, "") ===
        selectedCategory.replace(/[^a-z0-9]/g, "");

    return matchesQuery && matchesCategory;
  });

  const categories = Array.from(new Set(allArticles.map((a) => a.category))).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Career Guides & Executive Insights | CareerVixa",
    description: "Browse CareerVixa's full directory of data-backed career frameworks, salary negotiation guides, and interview mastery scripts.",
    url: `${siteConfig.url}/articles`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: filteredArticles.map((art, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${siteConfig.url}/articles/${art.slug}`,
        name: art.title,
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Articles", item: `${siteConfig.url}/articles` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="w-full max-w-full overflow-x-clip bg-bg-page min-h-screen">
        {/* Header Hero */}
        <section className="relative border-b border-border-default bg-gradient-to-b from-brand-primary/5 via-bg-page to-bg-page py-12 sm:py-16">
          <Container>
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-primary/25 bg-brand-soft text-brand-primary-text text-xs font-bold uppercase tracking-wider shadow-2xs">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Executive Career Repository</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-text-heading leading-tight">
                All Career Guides &amp; Insights
              </h1>

              <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl mx-auto">
                Discover verified compensation frameworks, negotiation scripts, and tactical playbooks researched to accelerate your professional growth.
              </p>

              {/* Search Bar Form */}
              <form action="/articles" method="GET" className="max-w-xl mx-auto pt-2 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    name="search"
                    defaultValue={query}
                    placeholder="Search guides, salaries, interviews, resumes..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-default bg-bg-surface text-text-heading text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/40 shadow-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-brand-btn-fill hover:bg-brand-btn-hover text-white text-xs sm:text-sm font-bold transition-all shadow-xs shrink-0"
                >
                  Search
                </button>
              </form>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
                <Link
                  href="/articles"
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    !selectedCategory && !query
                      ? "bg-brand-btn-fill text-white shadow-xs"
                      : "bg-bg-surface border border-border-default text-text-muted hover:text-text-heading hover:border-brand-primary/40"
                  }`}
                >
                  All ({allArticles.length})
                </Link>
                {categories.map((cat) => {
                  const isActive =
                    selectedCategory.replace(/[^a-z0-9]/g, "") ===
                    cat.toLowerCase().replace(/[^a-z0-9]/g, "");
                  const slug = cat.toLowerCase().replace(/ /g, "-");
                  return (
                    <Link
                      key={cat}
                      href={`/category/${slug}`}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-brand-btn-fill text-white shadow-xs"
                          : "bg-bg-surface border border-border-default text-text-muted hover:text-text-heading hover:border-brand-primary/40"
                      }`}
                    >
                      {cat}
                    </Link>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* Guides List */}
        <section className="py-12 sm:py-16">
          <Container>
            {filteredArticles.length === 0 ? (
              <div className="py-16 text-center bg-bg-surface border border-border-default rounded-3xl p-8 flex flex-col items-center gap-4 max-w-xl mx-auto shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand-primary-text flex items-center justify-center font-bold">
                  <Search className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-text-heading">No publications match your criteria</h2>
                <p className="text-sm text-text-muted">
                  Try adjusting your search terms or view our complete catalog of publications.
                </p>
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-btn-fill hover:bg-brand-btn-hover text-white font-bold text-xs transition-colors shadow-xs"
                >
                  Clear Filters &amp; View All
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>
                    Showing <strong className="text-text-heading">{filteredArticles.length}</strong> {filteredArticles.length === 1 ? "guide" : "guides"}
                  </span>
                  <span>Curated for ambitious career growth</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                  {filteredArticles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/articles/${article.slug}`}
                      className="group flex flex-col h-full bg-bg-surface border border-border-default hover:border-brand-primary/40 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-surface-subtle">
                        <Image
                          src={article.heroImage?.src || "/images/articles/placeholder.jpg"}
                          alt={article.heroImage?.alt || article.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-bg-surface/90 backdrop-blur-md text-text-heading shadow-xs">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-base sm:text-lg text-text-heading group-hover:text-brand-primary-text transition-colors line-clamp-2 leading-snug">
                            {article.title}
                          </h3>
                          {article.dek && (
                            <p className="mt-2 text-xs text-text-muted line-clamp-2 leading-relaxed">
                              {article.dek}
                            </p>
                          )}
                        </div>

                        <div className="pt-3.5 border-t border-border-default flex items-center justify-between text-xs text-text-muted">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{article.readTime} min read</span>
                          </div>

                          <span className="font-semibold text-brand-primary-text inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            Read Guide <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </section>
      </div>
    </>
  );
}
