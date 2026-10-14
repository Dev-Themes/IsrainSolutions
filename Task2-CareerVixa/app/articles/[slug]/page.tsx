import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { constructMetadata, siteConfig } from "@/lib/seo";
import { ArticleViewTracker } from "@/components/articles/ArticleViewTracker";
import { ReadingProgressBar } from "@/components/articles/ReadingProgressBar";
import { ShareButtons } from "@/components/articles/ShareButtons";
import { Clock, ArrowRight, BookOpen, ShieldCheck, CalendarCheck, ExternalLink } from "lucide-react";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  return constructMetadata({
    title: `${article.title} | CareerVixa`,
    description: article.description,
    url: `${siteConfig.url}/articles/${article.slug}`,
    image: `${siteConfig.url}/articles/${article.slug}/opengraph-image`,
    type: "article",
    publishedTime: article.publishedAt.toISOString(),
    modifiedTime: article.updatedAt.toISOString(),
    author: article.author,
    section: article.category,
    tags: article.tags,
  });
}

function extractHeadings(content: string) {
  const headings: { id: string; text: string }[] = [];
  const htmlH2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
  let match;
  while ((match = htmlH2Regex.exec(content)) !== null) {
    const rawText = match[1].replace(/<[^>]*>/g, "").trim();
    if (rawText) {
      const id = rawText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      headings.push({ id, text: rawText });
    }
  }

  if (headings.length === 0) {
    const mdH2Regex = /^##\s+(.+)$/gm;
    while ((match = mdH2Regex.exec(content)) !== null) {
      const rawText = match[1].trim();
      const id = rawText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      headings.push({ id, text: rawText });
    }
  }

  if (headings.length === 0) {
    return [
      { id: "framework-overview", text: "Executive Framework" },
      { id: "compensation-benchmarks", text: "Compensation Benchmarks" },
      { id: "execution-roadmap", text: "Execution Roadmap" },
      { id: "key-takeaways", text: "Key Takeaways" },
    ];
  }

  return headings.slice(0, 8);
}

function injectHeadingIds(content: string) {
  return content.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, innerText) => {
    if (attrs.includes("id=")) return match;
    const cleanText = innerText.replace(/<[^>]*>/g, "").trim();
    const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return `<h2 id="${id}" class="scroll-mt-24" ${attrs}>${innerText}</h2>`;
  });
}

const components = {
  h2: (props: any) => {
    const text = typeof props.children === "string" ? props.children : Array.isArray(props.children) ? props.children.join("") : "";
    const id = text ? text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : undefined;
    return <h2 id={id} className="text-2xl font-bold mt-8 mb-4 text-text-heading scroll-mt-24" {...props} />;
  },
  h3: (props: any) => {
    const text = typeof props.children === "string" ? props.children : Array.isArray(props.children) ? props.children.join("") : "";
    const id = text ? text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : undefined;
    return <h3 id={id} className="text-xl font-bold mt-6 mb-3 text-text-heading scroll-mt-24" {...props} />;
  },
  p: (props: any) => <p className="mb-4 leading-relaxed text-text-body text-[17px] sm:text-[18px]" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-2 text-text-body" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-text-body" {...props} />,
  li: (props: any) => <li {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-brand-primary pl-4 italic text-text-muted my-6 bg-bg-surface-subtle py-2.5 rounded-r-lg" {...props} />
  ),
  table: (props: any) => (
    <div className="w-full overflow-x-auto my-6 border border-border-default rounded-xl">
      <table className="w-full text-sm text-left tabular-nums" {...props} />
    </div>
  ),
  th: (props: any) => <th scope="col" className="px-4 py-3 bg-bg-surface-subtle font-bold text-text-heading border-b border-border-strong" {...props} />,
  td: (props: any) => <td className="px-4 py-3 border-b border-border-default text-text-body" {...props} />,
  a: (props: any) => <a className="text-brand-primary-text hover:underline font-semibold" {...props} />,
};

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  const allArticles = await getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => (a.category === article.category ? -1 : 1))
    .slice(0, 3);

  const headings = extractHeadings(article.content);
  const processedContent = article.isDbArticle ? injectHeadingIds(article.content) : article.content;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: article.heroImage.src,
    datePublished: article.publishedAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      }
    }
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: article.category, item: `${siteConfig.url}/category/${article.category.toLowerCase().replace(/ /g, "-")}` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${siteConfig.url}/articles/${article.slug}` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ArticleViewTracker slug={article.slug} />
      <ReadingProgressBar />

      <div className="w-full max-w-full overflow-x-clip">
        <Container className="py-8 sm:py-10 lg:py-14">
          
          {/* 1. Executive Split Hero Header Section (Full 12-column layout above the fold) */}
          <header className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
            {/* Left Column: Metadata, Badges, Title, Byline */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
                <ol className="flex items-center space-x-2 flex-wrap">
                  <li>
                    <Link href="/" className="hover:text-brand-primary-text transition-colors min-h-[40px] inline-flex items-center">
                      Home
                    </Link>
                  </li>
                  <li><span aria-hidden="true">&gt;</span></li>
                  <li>
                    <Link
                      href={`/category/${article.category.toLowerCase().replace(/ /g, "-")}`}
                      className="hover:text-brand-primary-text transition-colors min-h-[40px] inline-flex items-center"
                    >
                      {article.category}
                    </Link>
                  </li>
                  <li><span aria-hidden="true">&gt;</span></li>
                  <li className="text-text-heading font-semibold truncate max-w-[200px] sm:max-w-none" aria-current="page">
                    {article.title}
                  </li>
                </ol>
              </nav>

              {/* Badges: Category & Fact-Checked Verified */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary-text text-xs font-bold uppercase tracking-wider rounded-full">
                  {article.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950 text-xs font-bold rounded-full shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-white dark:text-slate-950" />
                  Fact-Checked &amp; Verified
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-text-heading leading-[1.15] tracking-tight">
                {article.title}
              </h1>

              {/* Dek / Subtitle */}
              {article.dek && (
                <p className="text-base sm:text-lg text-text-muted leading-relaxed font-normal">
                  {article.dek}
                </p>
              )}

              {/* High-Contrast Author & Governance Strip */}
              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-border-default">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950 font-black text-lg flex items-center justify-center shadow-xs shrink-0">
                    {article.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-base text-text-heading">{article.author}</span>
                    <div className="flex items-center flex-wrap gap-x-2 text-xs font-medium text-text-muted">
                      <span>Executive Contributor</span>
                      <span aria-hidden="true">&middot;</span>
                      <time dateTime={article.publishedAt.toISOString()}>{format(article.publishedAt, "MMM d, yyyy")}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>
                </div>

                {/* Editorial Governance / Trust Date */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg-surface border border-border-default text-xs font-semibold text-text-muted shadow-2xs">
                  <CalendarCheck className="w-3.5 h-3.5 text-brand-primary-text" />
                  <span>
                    Reviewed: <strong className="text-text-heading font-bold">{format(article.updatedAt || article.publishedAt, "MMM yyyy")}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Cover Photo Card */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <figure className="relative w-full rounded-2xl overflow-hidden border border-border-default bg-bg-surface-subtle shadow-xl group">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={article.heroImage.src}
                    alt={article.heroImage.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
                {(article.heroImage.credit || article.heroImage.alt) && (
                  <figcaption className="p-3 bg-bg-surface/95 backdrop-blur-md border-t border-border-default text-[11px] text-text-muted text-center font-medium">
                    {article.heroImage.alt} &middot; <span className="text-text-heading font-semibold">Credit: {article.heroImage.credit}</span>
                  </figcaption>
                )}
              </figure>
            </div>
          </header>

          {/* 2. Main 2-Column Content & Sticky Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column (Article Body, 8 cols) */}
            <article className="lg:col-span-8 w-full max-w-prose">
              <div className="prose prose-lg max-w-none text-text-body">
                {article.isDbArticle ? (
                  <div dangerouslySetInnerHTML={{ __html: processedContent }} />
                ) : (
                  <MDXRemote source={article.content} components={components} />
                )}
              </div>

              {/* Contributor / Author Box with Tracked Outbound Link */}
              {article.promotionalUrl && (
                <div className="mt-10 p-6 bg-bg-surface border border-brand-primary/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-brand-primary-text uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Sponsored Contributor Publication</span>
                    </div>
                    <h4 className="font-bold text-base text-text-heading">
                      About {article.author}
                    </h4>
                    <p className="text-xs text-text-muted mt-1 max-w-md">
                      This career framework was authored by verified industry contributor <strong>{article.author}</strong>.
                    </p>
                  </div>
                  <a
                    href={`/api/outbound/${article.slug}`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand-btn-fill hover:bg-brand-btn-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm shrink-0"
                  >
                    Visit Contributor Website &rarr;
                  </a>
                </div>
              )}

              {/* Verified Primary Source Citation */}
              {article.originalSourceUrl && (
                <div className="mt-8 p-4 rounded-2xl border border-border-default bg-bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-muted shadow-2xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>
                      Primary Source Citation: <strong className="text-text-heading font-semibold">Fact-checked by CareerVixa Editorial Board</strong>
                    </span>
                  </div>
                  <a
                    href={article.originalSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-1 text-brand-primary-text hover:underline font-bold shrink-0"
                  >
                    View Source Citation <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Editorial Governance Standards Disclosure */}
              <div className="mt-8 p-5 bg-bg-surface-subtle border border-border-default rounded-2xl text-xs text-text-muted leading-relaxed">
                <div className="flex items-center gap-2 font-bold text-text-heading mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Editorial Standards &amp; Trust Guarantee
                </div>
                <p>
                  CareerVixa publishes career frameworks, interview insights, and salary benchmarks researched using current marketplace data. All AI research is strictly supervised, fact-checked, and approved by editors to maintain factual accuracy and career relevancy.
                </p>
              </div>

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-bg-surface border border-border-default text-text-heading font-medium rounded-lg text-xs shadow-2xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Working Interactive Share Component */}
              <div className="mt-10">
                <ShareButtons title={article.title} url={`/articles/${article.slug}`} />
              </div>

              {/* Full Author Card */}
              <div className="mt-12 p-6 bg-bg-surface border border-border-default rounded-2xl flex flex-col sm:flex-row gap-5 items-start shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950 font-black text-xl flex items-center justify-center shadow-xs shrink-0">
                  {article.author.charAt(0)}
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-lg text-text-heading">{article.author}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950 shadow-2xs">
                      Verified Contributor
                    </span>
                  </div>
                  <p className="text-text-muted text-xs leading-relaxed">
                    Contributing executive career strategist for CareerVixa. Researched and published with focus on practical workplace navigation, compensation benchmarks, negotiation frameworks, and professional leadership.
                  </p>
                </div>
              </div>
            </article>

            {/* Right Column (Sticky Executive Sidebar, 4 cols) */}
            <aside className="lg:col-span-4 w-full">
              <div className="lg:sticky lg:top-24 space-y-6">
                
                {/* Table of Contents */}
                <div className="bg-bg-surface border border-border-default rounded-2xl p-6 shadow-xs">
                  <h3 className="font-extrabold text-sm text-text-heading uppercase tracking-wider mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-primary-text" />
                    Table of Contents
                  </h3>
                  <nav aria-label="Table of contents">
                    <ul className="space-y-2.5 text-xs">
                      {headings.map((item, idx) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="flex items-start gap-2 text-text-muted hover:text-brand-primary-text hover:underline transition-colors py-1 leading-snug group"
                          >
                            <span className="font-mono text-[10px] text-text-muted/60 group-hover:text-brand-primary-text shrink-0 mt-0.5">
                              {(idx + 1).toString().padStart(2, "0")}
                            </span>
                            <span className="font-medium text-text-body group-hover:text-brand-primary-text">
                              {item.text}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* Key Takeaways Card */}
                <div className="bg-bg-surface border border-brand-primary/25 rounded-2xl p-6 shadow-xs">
                  <h3 className="font-extrabold text-sm text-text-heading uppercase tracking-wider mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Executive Takeaways
                  </h3>
                  <ul className="space-y-3 text-xs">
                    {(article.takeaways && article.takeaways.length > 0
                      ? article.takeaways
                      : [
                          "Data-backed compensation benchmarks to anchor your market value.",
                          "Concrete negotiation scripts to steer strategic discussions.",
                          "Step-by-step career acceleration framework for modern professionals.",
                        ]
                    ).map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-text-body font-medium leading-relaxed">
                        <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                          ✓
                        </span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Share Widget (Sidebar) */}
                <div className="bg-bg-surface border border-border-default rounded-2xl p-5 shadow-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-3">
                    Share this intelligence
                  </span>
                  <ShareButtons compact title={article.title} url={`/articles/${article.slug}`} />
                </div>

                {/* Weekly Intelligence Newsletter Card */}
                <div className="bg-bg-surface border border-border-default rounded-2xl p-6 shadow-xs">
                  <h3 className="font-extrabold text-sm text-text-heading mb-1.5">
                    Executive Career Digest
                  </h3>
                  <p className="text-xs text-text-muted mb-4 leading-relaxed">
                    Join 50,000+ ambitious professionals receiving weekly career frameworks every Tuesday.
                  </p>
                  <NewsletterForm buttonText="Subscribe" stacked />
                </div>
              </div>
            </aside>
          </div>

          {/* 3. Related Articles Grid */}
          {relatedArticles.length > 0 && (
            <section className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-border-default">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
                <div>
                  <span className="text-xs font-bold tracking-wider text-brand-primary-text uppercase">
                    Continue Reading
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-text-heading mt-1">
                    Related Career Guides
                  </h2>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary-text hover:underline transition-colors group"
                >
                  Browse all publications
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/articles/${rel.slug}`}
                    className="group flex flex-col h-full bg-bg-surface border border-border-default hover:border-brand-primary/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-surface-subtle">
                      {rel.heroImage?.src ? (
                        <Image
                          src={rel.heroImage.src}
                          alt={rel.heroImage.alt || rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 text-brand-primary-text">
                          <BookOpen className="w-8 h-8 opacity-60" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-bg-surface/90 backdrop-blur-md text-text-heading shadow-xs">
                          {rel.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-text-heading group-hover:text-brand-primary-text transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h3>
                        {rel.dek && (
                          <p className="mt-2 text-xs text-text-muted line-clamp-2 leading-relaxed">
                            {rel.dek}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-border-default flex items-center justify-between text-xs text-text-muted">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{rel.readTime} min read</span>
                        </div>
                        <span className="font-bold text-brand-primary-text inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          Read Guide
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </Container>
      </div>
    </>
  );
}
