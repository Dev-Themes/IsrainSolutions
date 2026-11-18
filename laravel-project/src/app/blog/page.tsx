import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BLOG_ARTICLES } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getSiteUrl } from "@/lib/site-config";
import { Clock, User, ArrowRight, ShieldCheck, Award } from "lucide-react";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Home Trade Guides & Cost Advice | Technical Resources",
  description:
    "Practical guides and transparent price breakdowns written by verified trade professionals in the UK and USA. Boiler pressure top-ups, EICR certificates, heat pumps, and storm roof repairs.",
  alternates: {
    canonical: `${siteUrl}/blog`,
    languages: {
      "en-GB": `${siteUrl}/blog`,
      "en-US": `${siteUrl}/blog`,
      "x-default": `${siteUrl}/blog`,
    },
  },
  openGraph: {
    title: "Home Trade Guides & Cost Advice | TradeConnect",
    description:
      "Expert trade maintenance guides, price breakdowns, and regulatory compliance advice from verified engineers.",
    url: `${siteUrl}/blog`,
    siteName: "TradeConnect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Trade Guides & Cost Advice | TradeConnect",
    description:
      "Expert trade maintenance guides and cost advice from verified engineers.",
  },
};

function getBlogThumbnail(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes("heat") || cat.includes("boiler")) {
    return "/images/trades/boiler-inspection.jpg";
  } else if (cat.includes("electric")) {
    return "/images/trades/electrical-consumer-unit.jpg";
  } else if (cat.includes("hvac") || cat.includes("air")) {
    return "/images/trades/hvac-heat-pump.jpg";
  }
  return "/images/trades/copper-pipework.jpg";
}

export default function BlogIndexPage() {
  return (
    <div className="flex flex-col">
      <div className="container-custom pt-4">
        <Breadcrumbs items={[{ label: "Guides & Advice" }]} />
      </div>

      <section className="section-light section-spacing border-b border-[var(--line)]">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] shadow-2xs text-xs font-bold text-[var(--accent)] mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Knowledge Hub · Written by Active Tradespeople</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text)] mb-3 tracking-tight">
            Practical Guides &amp; Trade Advice
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
            Authored and peer-reviewed by active, licensed trade professionals. Straightforward technical guidance to help you maintain your home, understand Building Regulations, and accurately assess project quotes.
          </p>
        </div>
      </section>

      <section className="section-sand section-spacing">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_ARTICLES.map((article) => {
              const thumbnail = getBlogThumbnail(article.category);
              return (
                <article
                  key={article.slug}
                  className="rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-soft hover:shadow-lg hover:border-[var(--brand)] transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-[var(--bg-alt)] border-b border-[var(--line-subtle)]">
                      <Image
                        src={thumbnail}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="font-bold text-[var(--accent)] uppercase tracking-wider text-[10px] px-2.5 py-1 rounded-full bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--line-subtle)] shadow-xs">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-[11px] text-[var(--text-light)] mb-2.5">
                        <span className="flex items-center gap-1 font-medium text-[var(--text-muted)]">
                          <Clock className="w-3 h-3 text-[var(--accent)]" />
                          {article.readTime}
                        </span>
                        <span>Published {article.date}</span>
                      </div>

                      <h2 className="font-extrabold text-base sm:text-lg text-[var(--text)] mb-2.5 leading-snug group-hover:text-[var(--accent)] transition-colors">
                        <Link href={`/blog/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>

                      <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                        <div className="w-5 h-5 rounded-full bg-[var(--brand-light)] text-[var(--brand)] flex items-center justify-center shrink-0">
                          <User className="w-3 h-3" />
                        </div>
                        <span className="font-semibold text-[var(--text)] truncate">
                          {article.author}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${article.slug}`}
                        className="font-bold text-xs text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Read Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
