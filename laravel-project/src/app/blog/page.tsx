import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_ARTICLES } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getSiteUrl } from "@/lib/site-config";
import { Clock, User } from "lucide-react";

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

export default function BlogIndexPage() {
  return (
    <div className="flex flex-col">
      <div className="container-custom pt-4">
        <Breadcrumbs items={[{ label: "Guides & Advice" }]} />
      </div>

      <section className="section-light section-spacing border-b border-[var(--line)]">
        <div className="container-custom max-w-4xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
            Knowledge Hub
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text)] mb-3 tracking-tight">
            Practical Guides &amp; Trade Advice
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
            Authored by active, licensed trade professionals. Straightforward technical guidance to help you maintain your home, understand Building Regulations, and accurately assess project quotes.
          </p>
        </div>
      </section>

      <section className="section-sand section-spacing">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] p-6 shadow-soft flex flex-col justify-between hover:border-[var(--brand)] transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-light)] mb-2.5">
                    <span className="font-bold text-[var(--accent)] uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-[var(--bg-alt)] border border-[var(--line-subtle)]">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="font-extrabold text-base text-[var(--text)] mb-2.5 leading-snug group-hover:text-[var(--accent)] transition-colors">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-5 border-t border-[var(--line-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                  <span className="flex items-center gap-1 font-medium truncate max-w-[170px]">
                    <User className="w-3 h-3 text-[var(--accent)] shrink-0" />
                    {article.author}
                  </span>
                  <span>{article.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
