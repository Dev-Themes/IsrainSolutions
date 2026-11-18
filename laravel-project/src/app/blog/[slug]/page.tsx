import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_ARTICLES } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getSiteUrl } from "@/lib/site-config";
import {
  ArrowLeft,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Award,
  Sparkles,
  ArrowRight,
  FileCheck,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

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
      title: `${article.title} | TradeConnect Guides`,
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

function getArticleImages(category: string, slug: string) {
  const cat = category.toLowerCase();
  if (cat.includes("heat") || cat.includes("boiler")) {
    return {
      hero: "/images/trades/boiler-inspection.jpg",
      heroAlt: "Gas Safe registered engineer performing multi-point pressure and safety inspection on sealed combi boiler",
      heroCaption: "Figure 1: High-precision hydraulic pressure and expansion vessel diagnostic test conducted by a certified heating engineer.",
      secondary: "/images/trades/copper-pipework.jpg",
      secondaryAlt: "Copper hydronic pipework with brass isolation valves and filling loop connection",
      secondaryCaption: "Figure 2: WRAS-compliant braided filling loop with double check valves installed beneath residential boiler casing.",
    };
  } else if (cat.includes("electric")) {
    return {
      hero: "/images/trades/electrical-consumer-unit.jpg",
      heroAlt: "NICEIC electrician testing metal-clad 18th Edition Amendment 2 consumer unit with calibrated MFT tester",
      heroCaption: "Figure 1: Live instrument dead-testing and RCD trip disconnection calibration on an updated domestic distribution board.",
      secondary: "/images/trades/copper-pipework.jpg",
      secondaryAlt: "Supplementary equipotential earth bonding conductor attached to incoming metallic utility pipework",
      secondaryCaption: "Figure 2: Verifying continuous 10mm² main earth bonding connection to incoming water and gas utility services.",
    };
  } else if (cat.includes("hvac") || cat.includes("air")) {
    return {
      hero: "/images/trades/hvac-heat-pump.jpg",
      heroAlt: "EPA certified technician commissioning outdoor residential heat pump condenser unit",
      heroCaption: "Figure 1: Verifying SEER2 heat exchange ratios and refrigerant operating pressures on an outdoor split-system unit.",
      secondary: "/images/trades/boiler-inspection.jpg",
      secondaryAlt: "Air handler and secondary auxiliary heating coil inspection",
      secondaryCaption: "Figure 2: Internal static air pressure and filter assembly inspection on secondary distribution plenum.",
    };
  } else {
    return {
      hero: "/images/trades/copper-pipework.jpg",
      heroAlt: "Professional trade installation with verified brass valves and compression fittings",
      heroCaption: "Figure 1: High-specification materials and safety isolation layout meeting national Building Regulations standards.",
      secondary: "/images/trades/boiler-inspection.jpg",
      secondaryAlt: "Diagnostic inspection and regulatory compliance verification",
      secondaryCaption: "Figure 2: Comprehensive multi-stage site inspection and safety sign-off procedure.",
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const images = getArticleImages(article.category, article.slug);
  const relatedArticles = BLOG_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

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

      <div className="flex flex-col bg-[var(--bg)]">
        {/* Breadcrumb Bar */}
        <div className="bg-[var(--surface)] border-b border-[var(--line)] py-3">
          <div className="container-custom">
            <Breadcrumbs
              items={[
                { label: "Guides & Advice", href: "/blog" },
                { label: article.category, href: "/blog" },
                { label: article.title },
              ]}
            />
          </div>
        </div>

        {/* 2-COLUMN EDITORIAL ARTICLE CONTAINER */}
        <article className="py-8 sm:py-14">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* =========================================
                  MAIN ARTICLE COLUMN (LEFT, 8 COLUMNS)
                  ========================================= */}
              <div className="lg:col-span-8 space-y-8">
                {/* Meta Category & Timing Pill */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-[var(--text-muted)]">
                  <span className="font-bold text-[var(--accent)] uppercase tracking-wider text-[10px] px-2.5 py-1 rounded bg-[var(--bg-alt)] border border-[var(--line-subtle)]">
                    {article.category}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                    {article.readTime}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[var(--text-light)]" />
                    Published {article.date}
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--text)] leading-tight tracking-tight">
                  {article.title}
                </h1>

                {/* MANDATORY PROMINENT AUTHOR AUTHORITY BLOCK */}
                <div className="p-4 sm:p-5 rounded-xl bg-[var(--surface)] border-2 border-[var(--brand)]/30 shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--line-subtle)]">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-[var(--brand-light)] text-[var(--brand)] flex items-center justify-center font-bold text-base shrink-0 border border-[var(--line)]">
                        <User className="w-6 h-6 text-[var(--brand)]" />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider font-bold text-[var(--accent)] flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5" />
                          <span>Official Technical Publication</span>
                        </div>
                        <div className="font-extrabold text-sm sm:text-base text-[var(--text)]">
                          Published by <span className="text-[var(--brand)]">TradeConnect</span> on {article.date}
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold w-fit">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Peer Reviewed &amp; Verified</span>
                    </div>
                  </div>

                  <div className="text-xs text-[var(--text-muted)] flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>
                      <strong className="text-[var(--text)]">Lead Author:</strong> {article.author}
                    </span>
                    <span>&bull;</span>
                    <span className="text-[var(--pine-accent)] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {article.authorRole}
                    </span>
                  </div>
                </div>

                {/* Excerpt Pullquote */}
                <div className="p-5 rounded-xl bg-[var(--bg-alt)] border-l-4 border-[var(--accent)] text-sm sm:text-base text-[var(--text)] font-medium leading-relaxed shadow-2xs">
                  {article.excerpt}
                </div>

                {/* IMAGE 1: HIGH-RES FEATURED TECHNICAL HERO IMAGE */}
                <figure className="space-y-2">
                  <div className="relative aspect-16/9 rounded-xl overflow-hidden border border-[var(--line)] shadow-md bg-[var(--surface)]">
                    <Image
                      src={images.hero}
                      alt={images.heroAlt}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10 flex items-center gap-1.5">
                      <FileCheck className="w-3 h-3 text-[var(--accent)]" />
                      <span>Verified Trade Photography</span>
                    </div>
                  </div>
                  <figcaption className="text-xs text-[var(--text-muted)] italic px-1 leading-relaxed">
                    {images.heroCaption}
                  </figcaption>
                </figure>

                {/* Table of Contents */}
                {article.tableOfContents && article.tableOfContents.length > 0 && (
                  <div className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--line)] shadow-soft">
                    <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>In This Technical Guide</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {article.tableOfContents.map((toc) => (
                        <li key={toc.id}>
                          <a
                            href={`#${toc.id}`}
                            className="p-2 rounded-lg bg-[var(--bg-alt)] hover:bg-[var(--brand-light)] hover:text-[var(--accent)] border border-[var(--line-subtle)] text-[var(--text)] font-semibold transition-colors block"
                          >
                            {toc.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Body Content - First Half */}
                <div className="space-y-6 text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                  {article.sections && article.sections.slice(0, 2).map((sec, idx) => {
                    const tocItem = article.tableOfContents?.[idx];
                    const sectionId = tocItem ? tocItem.id : `section-${idx}`;
                    return (
                      <section key={idx} id={sectionId} className="scroll-mt-24">
                        <h2 className="text-lg sm:text-xl font-extrabold text-[var(--text)] mb-3 pb-1 border-b border-[var(--line-subtle)]">
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
                      </section>
                    );
                  })}
                </div>

                {/* IMAGE 2: TECHNICAL IN-ARTICLE COMPONENT IMAGE */}
                <figure className="space-y-2 pt-2">
                  <div className="relative aspect-16/9 rounded-xl overflow-hidden border border-[var(--line)] shadow-md bg-[var(--surface)]">
                    <Image
                      src={images.secondary}
                      alt={images.secondaryAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10 flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>BS &amp; WRAS Installation Standards</span>
                    </div>
                  </div>
                  <figcaption className="text-xs text-[var(--text-muted)] italic px-1 leading-relaxed">
                    {images.secondaryCaption}
                  </figcaption>
                </figure>

                {/* Body Content - Remaining Sections */}
                <div className="space-y-6 text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                  {article.sections && article.sections.slice(2).map((sec, idx) => {
                    const actualIdx = idx + 2;
                    const tocItem = article.tableOfContents?.[actualIdx];
                    const sectionId = tocItem ? tocItem.id : `section-${actualIdx}`;
                    return (
                      <section key={actualIdx} id={sectionId} className="scroll-mt-24">
                        <h2 className="text-lg sm:text-xl font-extrabold text-[var(--text)] mb-3 pb-1 border-b border-[var(--line-subtle)]">
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
                              <div key={sIdx} className="p-4 rounded-lg bg-[var(--bg-alt)] border border-[var(--line-subtle)]">
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
                  })}
                </div>

                {/* Pro Assistance Callout Box */}
                <div className="mt-10 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-soft">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--brand-light)] text-[var(--accent)] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-[var(--text)]">
                        Need a licensed local engineer to inspect or quote this job?
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 leading-relaxed">
                        Avoid rogue traders. Post your job on TradeConnect to receive up to 3 competitive estimates from verified, insured tradespeople in your postal area.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                          href="/quote"
                          className="px-5 py-2.5 rounded-[var(--radius-sm)] btn-primary text-white font-bold text-xs shadow-xs transition-colors"
                        >
                          Request Free Quotes Online
                        </Link>
                        <Link
                          href="/pros"
                          className="px-5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] font-semibold text-xs hover:bg-[var(--bg-alt)] transition-colors"
                        >
                          Browse Directory of Vetted Pros
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Back Nav */}
                <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between">
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-xs font-bold text-[var(--accent)] hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    <span>Back to All Technical Guides</span>
                  </Link>
                  <Link
                    href="/"
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
                  >
                    TradeConnect Home
                  </Link>
                </div>
              </div>

              {/* =========================================
                  STICKY SIDEBAR (RIGHT, 4 COLUMNS)
                  ========================================= */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="sticky top-24 space-y-6">
                  {/* Official Editorial Authority Card */}
                  <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--brand)] text-white flex items-center justify-center font-bold text-xs">
                        TC
                      </div>
                      <div>
                        <span className="font-bold text-xs text-[var(--text)] block leading-none">
                          TradeConnect Editorial
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                          Verified Publisher Standards
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[var(--bg-alt)] border border-[var(--line-subtle)] text-xs space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                        <span>Published Date:</span>
                        <span className="font-bold text-[var(--text)]">{article.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                        <span>Domain Category:</span>
                        <span className="font-bold text-[var(--accent)]">{article.category}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                        <span>Technical Accuracy:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">100% Verified</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                      Every TradeConnect guide is authored and peer-reviewed exclusively by registered professionals with verified Gas Safe, NICEIC, or NFRC credentials.
                    </div>
                  </div>

                  {/* Instant Quote Callout Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--bg-alt)] border-2 border-[var(--accent)]/30 shadow-md space-y-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                      Instant Local Quote
                    </div>
                    <h3 className="font-extrabold text-sm text-[var(--text)]">
                      Compare Vetted Rates for {article.category}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Free estimates with zero commission markups. Compare up to 3 verified tradespeople near your postcode.
                    </p>
                    <Link
                      href="/quote"
                      className="w-full py-2.5 rounded-[var(--radius-sm)] btn-primary text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs"
                    >
                      <span>Post a Job Free</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Related Articles Card */}
                  <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-3">
                    <h3 className="font-extrabold text-xs uppercase tracking-wider text-[var(--text)]">
                      More Recommended Guides
                    </h3>
                    <div className="space-y-2.5">
                      {relatedArticles.map((rel) => (
                        <Link
                          key={rel.slug}
                          href={`/blog/${rel.slug}`}
                          className="block p-2.5 rounded-lg bg-[var(--bg-alt)] hover:bg-[var(--brand-light)] border border-[var(--line-subtle)] transition-colors group"
                        >
                          <span className="text-[10px] font-bold uppercase text-[var(--accent)] block mb-0.5">
                            {rel.category}
                          </span>
                          <span className="font-bold text-xs text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                            {rel.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
