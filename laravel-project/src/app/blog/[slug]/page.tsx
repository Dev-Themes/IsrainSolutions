import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_ARTICLES } from "@/lib/data";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Article | TradeConnect" };
  }

  return {
    title: `${article.title} | TradeConnect Guide`,
    description: article.excerpt,
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
    },
    publisher: {
      "@type": "Organization",
      name: "TradeConnect",
      url: "https://tradeconnect-marketplace.vercel.app",
    },
    datePublished: "2026-11-01",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col">
        {/* Breadcrumb */}
        <div className="bg-[var(--bg-alt)] border-b border-[var(--line)] text-xs py-3 px-4">
          <div className="container-custom flex items-center space-x-2 text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--text)]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-[var(--text)]">Guides</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--text)] font-semibold truncate">{article.title}</span>
          </div>
        </div>

        <article className="section-light section-spacing">
          <div className="container-custom max-w-2xl">
            <div className="text-xs text-[var(--text-light)] mb-3 flex items-center space-x-3">
              <span className="font-bold text-[var(--accent)] uppercase">{article.category}</span>
              <span>&middot;</span>
              <span>{article.readTime}</span>
              <span>&middot;</span>
              <span>{article.date}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-4 leading-tight">
              {article.title}
            </h1>

            <p className="text-base text-[var(--text-muted)] font-medium leading-relaxed mb-8 pb-6 border-b border-[var(--line)]">
              {article.excerpt}
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-[var(--text)] leading-relaxed">
              <p>
                When dealing with domestic systems, understanding the fundamental warning signs early can save hundreds of pounds or dollars in emergency out-of-hours callout charges.
              </p>
              <h2 className="text-xl font-bold text-[var(--text)] pt-4">
                Step-by-step diagnostic verification
              </h2>
              <p>
                1. Always check the primary isolation point. Before unscrewing any inspection hatch or touching electrical enclosures, verify that the circuit breaker or local water isolator is safely off.
              </p>
              <p>
                2. Check gauge readings carefully. For sealed heating circuits, normal cold operating pressure is between 1.0 and 1.5 bar. If the needle has dropped into the red zone below 0.8 bar, the pressure switch will prevent the burner from igniting.
              </p>
              <p>
                3. Examine the filling loop. Locate the braided flexible hose under the boiler casing. Open the double check valves slowly until the pressure gauge reaches 1.2 bar, then firmly close both levers.
              </p>
              <h2 className="text-xl font-bold text-[var(--text)] pt-4">
                When to stop and call a professional
              </h2>
              <p>
                If your system continues to lose pressure within 48 hours of topping up, there is likely a pinhole leak on a radiator valve or an internal fault with the boiler expansion vessel. Never attempt to disassemble gas components or combustion seals yourself.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-[var(--line)] flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center text-xs font-bold text-[var(--brand)] hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                <span>Back to All Guides</span>
              </Link>
              <Link
                href="/quote"
                className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-xs"
              >
                Get Quotes for Repairs
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
