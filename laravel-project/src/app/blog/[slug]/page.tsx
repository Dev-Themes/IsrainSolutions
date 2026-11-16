import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_ARTICLES } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getSiteUrl } from "@/lib/site-config";
import { ArrowLeft, Clock, User, ShieldCheck, CheckCircle2 } from "lucide-react";

const siteUrl = getSiteUrl();

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Trade Guide" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `${siteUrl}/blog/${article.slug}`,
      languages: {
        "en-GB": `${siteUrl}/blog/${article.slug}`,
        "en-US": `${siteUrl}/blog/${article.slug}`,
        "x-default": `${siteUrl}/blog/${article.slug}`,
      },
    },
    openGraph: {
      title: `${article.title} | TradeConnect`,
      description: article.excerpt,
      url: `${siteUrl}/blog/${article.slug}`,
      siteName: "TradeConnect",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | TradeConnect`,
      description: article.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Person",
      name: article.author,
      jobTitle: article.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "TradeConnect",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${article.slug}`,
    },
    datePublished: "2026-10-15",
    dateModified: "2026-11-10",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col">
        <div className="container-custom pt-4">
          <Breadcrumbs
            items={[
              { label: "Guides & Advice", href: "/blog" },
              { label: article.title },
            ]}
          />
        </div>

        <article className="section-light section-spacing">
          <div className="container-custom max-w-3xl">
            {/* Meta Header */}
            <div className="text-xs text-[var(--text-light)] mb-3 flex flex-wrap items-center gap-2">
              <span className="font-bold text-[var(--accent)] uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-[var(--bg-alt)] border border-[var(--line-subtle)]">
                {article.category}
              </span>
              <span>&middot;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
              <span>&middot;</span>
              <span>Published {article.date}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--text)] mb-4 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Author Byline Box */}
            <div className="flex items-center space-x-3 p-3.5 rounded-[var(--radius)] bg-[var(--bg-alt)] border border-[var(--line-subtle)] mb-8">
              <div className="w-10 h-10 rounded-full bg-[var(--brand-light)] text-[var(--pine-accent)] flex items-center justify-center font-bold text-sm shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-[var(--text)]">
                  Written by {article.author}
                </div>
                <div className="text-[11px] text-[var(--pine-accent)] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{article.authorRole}</span>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-muted)] font-medium leading-relaxed mb-8 pb-6 border-b border-[var(--line)]">
              {article.excerpt}
            </p>

            {/* Table of Contents */}
            {article.tableOfContents && article.tableOfContents.length > 0 && (
              <div className="mb-8 p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-3">
                  Table of Contents
                </div>
                <ul className="space-y-1.5 text-xs text-[var(--text)]">
                  {article.tableOfContents.map((toc) => (
                    <li key={toc.id}>
                      <a
                        href={`#${toc.id}`}
                        className="hover:text-[var(--accent)] transition-colors hover:underline block"
                      >
                        {toc.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Body Sections */}
            <div className="space-y-8 text-xs sm:text-sm text-[var(--text)] leading-relaxed">
              {article.sections ? (
                article.sections.map((sec, idx) => {
                  const tocItem = article.tableOfContents?.[idx];
                  const sectionId = tocItem ? tocItem.id : `section-${idx}`;
                  return (
                    <section key={idx} id={sectionId} className="scroll-mt-24">
                      <h2 className="text-lg sm:text-xl font-extrabold text-[var(--text)] mb-3">
                        {sec.heading}
                      </h2>
                      {sec.body && (
                        <div className="space-y-3">
                          {sec.body.map((p, pIdx) => (
                            <p key={pIdx} className="text-[var(--text-muted)] leading-relaxed">
                              {p}
                            </p>
                          ))}
                        </div>
                      )}
                      {sec.subsections && (
                        <div className="space-y-4 mt-4">
                          {sec.subsections.map((sub, sIdx) => (
                            <div key={sIdx}>
                              <h3 className="text-sm sm:text-base font-bold text-[var(--text)] mb-2">
                                {sub.subheading}
                              </h3>
                              <div className="space-y-2">
                                {sub.body.map((subP, subPIdx) => (
                                  <p key={subPIdx} className="text-[var(--text-muted)] leading-relaxed">
                                    {subP}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  );
                })
              ) : (
                <div className="space-y-4">
                  <p>
                    When dealing with domestic systems, understanding the fundamental warning signs early can save hundreds of pounds or dollars in emergency out-of-hours callout charges.
                  </p>
                  <h2 className="text-xl font-bold text-[var(--text)] pt-4">
                    Step-by-step diagnostic verification
                  </h2>
                  <p>
                    1. Check gauge readings carefully. For sealed heating circuits, normal cold operating pressure is between 1.0 and 1.5 bar. If the needle has dropped into the red zone below 0.8 bar, the pressure switch will prevent the burner from igniting.
                  </p>
                  <p>
                    2. Examine the filling loop. Locate the braided flexible hose under the boiler casing. Open the double check valves slowly until the pressure gauge reaches 1.2 bar, then firmly close both levers.
                  </p>
                  <h2 className="text-xl font-bold text-[var(--text)] pt-4">
                    When to call a licensed engineer
                  </h2>
                  <p>
                    If your system continues to lose pressure within 48 hours of topping up, there is likely a pinhole leak on a radiator valve or an internal fault with the boiler expansion vessel. Never attempt to disassemble gas components or combustion seals yourself.
                  </p>
                </div>
              )}
            </div>

            {/* Pro Assistance Callout Box */}
            <div className="mt-12 p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft">
              <div className="flex items-start space-x-3.5">
                <CheckCircle2 className="w-5 h-5 text-[var(--pine-accent)] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-[var(--text)]">
                    Need professional assistance for this task?
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                    Post your job on TradeConnect to receive up to 3 competitive estimates from verified, insured tradespeople in your immediate postal area.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <Link
                      href="/quote"
                      className="px-4 py-2.5 rounded-[var(--radius-sm)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      Request Free Local Quotes
                    </Link>
                    <Link
                      href="/pros"
                      className="px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] font-semibold text-xs hover:bg-[var(--bg-alt)] transition-colors"
                    >
                      Browse Certified Pros Directory
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="mt-10 pt-6 border-t border-[var(--line)] flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center text-xs font-bold text-[var(--brand)] hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                <span>Back to All Guides</span>
              </Link>
              <Link
                href="/"
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                Return to TradeConnect Home
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
