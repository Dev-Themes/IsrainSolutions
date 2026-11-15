import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_ARTICLES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Home Trade Guides & Cost Advice | TradeConnect",
  description: "Practical guides and transparent price breakdowns written by verified trade professionals in the UK and USA.",
};

export default function BlogIndexPage() {
  return (
    <div className="flex flex-col">
      <section className="section-light section-spacing border-b border-[var(--line)]">
        <div className="container-custom max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
            Knowledge Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-3">
            Practical Guides & Cost Advice
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Written by experienced tradespeople. Straightforward technical guidance to help you maintain your home and understand project quotes.
          </p>
        </div>
      </section>

      <section className="section-sand section-spacing">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] p-6 shadow-soft flex flex-col justify-between hover:border-[var(--brand)] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-light)] mb-2">
                    <span className="font-bold text-[var(--accent)] uppercase">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="font-bold text-base text-[var(--text)] mb-2 leading-snug">
                    <Link href={`/blog/${article.slug}`} className="hover:text-[var(--accent)] transition-colors">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[var(--line-subtle)] text-[11px] text-[var(--text-muted)]">
                  By {article.author}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
