import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getAllArticles } from "@/lib/articles";
import { prisma } from "@/lib/prisma";
import { Clock, ArrowRight, ArrowLeft, BookOpen, PenTool } from "lucide-react";
import { constructMetadata, siteConfig } from "@/lib/seo";

const CATEGORY_MAP: Record<string, { name: string; description: string }> = {
  "career-development": {
    name: "Career Development",
    description: "Strategies for leadership growth, career pivots, executive presence, and long-term professional mastery.",
  },
  "job-search-strategies": {
    name: "Job Search Strategies",
    description: "Tactical advice on modern hiring channels, recruiter outreach, applicant tracking systems, and landing interviews.",
  },
  "resume-and-cover-letters": {
    name: "Resumes & Cover Letters",
    description: "Battle-tested resume bullet frameworks, executive portfolio design, and high-converting cover letter templates.",
  },
  "interview-preparation": {
    name: "Interview Preparation",
    description: "Master technical rounds, executive behavioral questions, case studies, and post-interview follow-ups.",
  },
  "salary-and-negotiation": {
    name: "Salary & Negotiation",
    description: "Verified compensation data, equity breakdowns, and word-for-word scripts to negotiate higher job offers.",
  },
  "remote-work-and-freelancing": {
    name: "Remote Work & Freelancing",
    description: "High-income skills, asynchronous communication, and client acquisition for distributed professionals.",
  },
  "professional-skills-and-growth": {
    name: "Professional Skills & Growth",
    description: "High-leverage technical and interpersonal competencies that separate top 1% performers.",
  },
};

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const cat = CATEGORY_MAP[params.slug] || {
    name: params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: "Executive career guides and professional growth insights.",
  };

  return constructMetadata({
    title: `${cat.name} Guides | CareerVixa`,
    description: cat.description,
    url: `${siteConfig.url}/category/${params.slug}`,
  });
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug.toLowerCase();

  const categoryMeta = CATEGORY_MAP[slug] || {
    name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: "Actionable frameworks and verified data to advance your professional trajectory.",
  };

  const allArticles = await getAllArticles();

  // Filter articles by category name matching loosely
  const categoryArticles = allArticles.filter((article) => {
    const artCat = (article.category || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const targetCat = categoryMeta.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const targetSlug = slug.replace(/[^a-z0-9]/g, "");
    return artCat.includes(targetCat) || targetCat.includes(artCat) || artCat.includes(targetSlug);
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryMeta.name} Guides | CareerVixa`,
    description: categoryMeta.description,
    url: `${siteConfig.url}/category/${slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categoryArticles.map((art, idx) => ({
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
      { "@type": "ListItem", position: 2, name: categoryMeta.name, item: `${siteConfig.url}/category/${slug}` },
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
      <div className="w-full max-w-full overflow-x-clip">
        <Container className="py-10 lg:py-16 flex flex-col gap-10">
      {/* Category Header */}
      <div className="flex flex-col gap-4 border-b border-border pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-brand transition-colors w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to all publications
        </Link>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand">
            Curated Domain Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-text tracking-tight">
            {categoryMeta.name}
          </h1>
          <p className="text-muted text-base max-w-2xl leading-relaxed">
            {categoryMeta.description}
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      {categoryArticles.length === 0 ? (
        <div className="py-16 text-center bg-surface border border-border rounded-3xl p-8 flex flex-col items-center gap-4 max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-text">No articles published in this category yet</h2>
          <p className="text-sm text-muted">
            Be the first expert to share insights in this professional domain with CareerVixa readers.
          </p>
          <Link
            href="/publish"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-strong transition-colors"
          >
            <PenTool className="w-4 h-4" />
            Submit a Pitch for this Category
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {categoryArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group flex flex-col h-full bg-surface border border-border hover:border-brand/40 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-subtle">
                <Image
                  src={article.heroImage?.src || "/images/articles/placeholder.jpg"}
                  alt={article.heroImage?.alt || article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-background/90 backdrop-blur-md text-foreground shadow-xs">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg text-text group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted line-clamp-2 leading-relaxed">
                    {article.dek}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-border flex items-center justify-between text-xs text-muted">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime} min read</span>
                  </div>

                  <span className="font-semibold text-brand inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read Guide &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      </Container>
      </div>
    </>
  );
}
