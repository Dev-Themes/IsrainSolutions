import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react";

export const BacklinksInSeo: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-[#020817] via-[#030e29] to-[#020817] py-20 lg:py-28 border-b border-sky-500/15">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Backlinks in SEO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              What is link building, and why does it matter?
            </h2>
            <div className="pt-2">
              <span className="text-xs font-mono text-sky-300 block">
                Source Attribution:
              </span>
              <a
                href="https://developers.google.com/search/docs/crawling-indexing/links-crawlable"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 hover:underline mt-1"
              >
                <span>Google Search Central: Link Best Practices</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Explanatory Copy & Internal Links */}
          <div className="lg:col-span-7 space-y-6 text-sm text-slate-200 leading-relaxed">
            <p>
              Link building is the deliberate process of acquiring hyperlinks from external websites to your own pages. In search engine algorithms, links serve as editorial votes of confidence. When search crawlers encounter a contextual hyperlink pointing to your page, it signals that an independent publisher considers your content credible, helpful, and worthy of recommendation.
            </p>
            <p className="text-slate-300">
              According to official guidance from Google Search Central, search engines evaluate links as a vital signal when determining the topical relevance and authority of web pages. A link originating from an authoritative, indexed publication that real audiences read tells search engines that your page deserves prominence for related search queries.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/services/niche-guest-posts"
                className="p-4 rounded-xl bg-[#06163b]/80 border border-sky-500/25 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all group"
              >
                <div className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors flex items-center justify-between">
                  <span>Niche Guest Posts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-[11px] text-sky-200/70 mt-1">
                  Manual outreach links on real indexed websites with organic traffic.
                </p>
              </Link>
              <Link
                href="/services/niche-edits"
                className="p-4 rounded-xl bg-[#06163b]/80 border border-sky-500/25 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all group"
              >
                <div className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors flex items-center justify-between">
                  <span>Curated Niche Edits</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-[11px] text-sky-200/70 mt-1">
                  Immediate contextual placement inside aged, ranking Google articles.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
