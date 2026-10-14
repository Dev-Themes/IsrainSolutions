import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { getAllArticles } from "@/lib/articles";
import { auth } from "@/lib/auth";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  FileText,
  Clock,
  PenTool,
} from "lucide-react";
import { constructMetadata, siteConfig } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "CareerVixa - Career, Jobs & Professional Growth",
  description: "Data-backed career advice, compensation benchmarks, interview scripts, and executive frameworks to elevate your professional trajectory.",
  url: siteConfig.url,
});

export default async function HomePage() {
  const allArticles = await getAllArticles();
  const featuredArticle = allArticles.find((a) => a.featured) || allArticles[0] || null;

  // Latest 6 articles excluding the featured one
  const latestArticles = allArticles
    .filter((a) => a.slug !== featuredArticle?.slug)
    .slice(0, 6);

  const session = await auth();
  const publishUrl = "/publish";

  const topicCategories = [
    { name: "All Guides", href: "#latest", active: true },
    { name: "Career Growth", href: "/category/career-development" },
    { name: "Job Search", href: "/category/job-search-strategies" },
    { name: "Resumes & Portfolios", href: "/category/resume-and-cover-letters" },
    { name: "Interview Mastery", href: "/category/interview-preparation" },
    { name: "Salary Negotiation", href: "/category/salary-and-negotiation" },
  ];

  return (
    <div className="w-full max-w-full overflow-x-clip">
      <Container className="flex flex-col gap-12 lg:gap-16 py-8 sm:py-12 lg:py-16">
        {/* 1. Executive Split-Hero Showcase */}
        <section className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Editorial Value & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="flex flex-col items-start gap-5">
              {/* Live Intelligence Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-primary/20 text-brand-primary-text text-xs font-bold tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>LIVE CAREER INTELLIGENCE &middot; UPDATED DAILY</span>
              </div>

              {/* Authoritative Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-text-heading tracking-tight leading-[1.12]">
                Data-Backed Strategies to Navigate,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                  Accelerate &amp; Elevate
                </span>{" "}
                Your Career.
              </h1>

              {/* Dek Subtitle */}
              <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl">
                From executive compensation benchmarks and high-stakes interview mastery to strategic leadership transitions—CareerVixa delivers tested frameworks, roadmaps, and word-for-word scripts trusted by 50,000+ ambitious professionals worldwide.
              </p>

              {/* Trending Topic Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted mr-1">Trending:</span>
                <Link
                  href="/category/salary-and-negotiation"
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-bg-surface border border-border-default hover:border-brand-primary/40 text-text-heading hover:text-brand-primary-text transition-colors"
                >
                  Salary Negotiation
                </Link>
                <Link
                  href="/category/interview-preparation"
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-bg-surface border border-border-default hover:border-brand-primary/40 text-text-heading hover:text-brand-primary-text transition-colors"
                >
                  Interview Scripts
                </Link>
                <Link
                  href="/category/career-development"
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-bg-surface border border-border-default hover:border-brand-primary/40 text-text-heading hover:text-brand-primary-text transition-colors"
                >
                  Leadership Paths
                </Link>
              </div>

              {/* Dual Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-2">
                <Link
                  href="#latest"
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-btn-fill text-white font-bold text-sm hover:opacity-95 shadow-md shadow-brand-primary/20 transition-all hover:-translate-y-0.5 min-h-[44px]"
                >
                  <span>Explore Master Guides</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={publishUrl}
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl bg-bg-surface border border-border-default text-text-heading font-bold text-sm hover:bg-bg-surface-subtle hover:border-brand-primary/40 transition-all hover:-translate-y-0.5 min-h-[44px]"
                >
                  <PenTool className="w-4 h-4 text-brand-primary-text" />
                  <span>Publish as Guest Author</span>
                </Link>
              </div>
            </div>

            {/* Trust Stats Bar */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border-default">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-text-heading tracking-tight tabular-nums">150+</span>
                <span className="text-xs font-medium text-text-muted mt-0.5">In-Depth Guides</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-primary-text tracking-tight tabular-nums">100%</span>
                <span className="text-xs font-medium text-text-muted mt-0.5">Fact-Checked</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-text-heading tracking-tight tabular-nums">50+</span>
                <span className="text-xs font-medium text-text-muted mt-0.5">Copy Scripts</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-accent tracking-tight tabular-nums">50K+</span>
                <span className="text-xs font-medium text-text-muted mt-0.5">Monthly Leaders</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Executive Spotlight */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {featuredArticle ? (
              <div className="flex flex-col h-full rounded-2xl border border-brand-primary/25 bg-bg-surface p-5 sm:p-6 shadow-xl shadow-brand-primary/5 hover:border-brand-primary/50 transition-all">
                <div className="flex items-center justify-between pb-3.5 border-b border-border-default mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-primary-text">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured Intelligence
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-slate-950 dark:bg-slate-100 dark:text-slate-950 px-2.5 py-0.5 rounded-full shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-white dark:text-slate-950" />
                    Verified
                  </span>
                </div>

                <Link href={`/articles/${featuredArticle.slug}`} className="group flex flex-col flex-1 justify-between gap-4">
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-bg-surface-subtle">
                    <Image
                      src={featuredArticle.heroImage.src}
                      alt={featuredArticle.heroImage.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-bg-surface/90 backdrop-blur-md text-text-heading shadow-xs">
                        {featuredArticle.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-text-heading group-hover:text-brand-primary-text transition-colors line-clamp-2 leading-snug">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-text-muted line-clamp-2 leading-relaxed">
                      {featuredArticle.dek}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border-default flex items-center justify-between text-xs text-text-muted">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-soft text-brand-primary-text flex items-center justify-center font-bold text-xs">
                        {featuredArticle.author.charAt(0)}
                      </div>
                      <span className="font-semibold text-text-heading truncate max-w-[120px]">{featuredArticle.author}</span>
                    </div>

                    <div className="flex items-center gap-1 text-brand-primary-text font-bold group-hover:translate-x-0.5 transition-transform">
                      <span>Read Brief</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center text-center p-8 rounded-2xl border border-dashed border-border-default bg-bg-surface/50">
                <Sparkles className="w-10 h-10 text-brand-primary mb-3" />
                <h3 className="text-lg font-bold text-text-heading">Executive Briefing Queue</h3>
                <p className="text-xs text-text-muted mt-1 max-w-sm">
                  Our autonomous research agents and verified contributors are publishing new career roadmaps daily.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 2. Curated Domain Hubs Navigation */}
        <section className="w-full flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Curated Domain Hubs
            </span>
            <span className="text-xs text-text-muted hidden sm:block">
              Filter by executive focus
            </span>
          </div>
          <div className="w-full overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2 min-w-full sm:min-w-0 sm:flex-wrap">
              {topicCategories.map((cat, i) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap min-h-[40px] inline-flex items-center ${
                    i === 0
                      ? "bg-brand-btn-fill text-white shadow-xs"
                      : "bg-bg-surface border border-border-default text-text-heading hover:border-brand-primary/50 hover:bg-bg-surface-subtle"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Latest Executive Guides Grid */}
        <section id="latest" className="w-full flex flex-col gap-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border-default pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-text">
                Fresh Intelligence
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-text-heading tracking-tight mt-1">
                Latest Executive Guides
              </h2>
            </div>
            <span className="text-xs text-text-muted">
              Updated daily with live compensation and market data
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {latestArticles.map((article) => (
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
                    <p className="mt-2 text-xs text-text-muted line-clamp-2 leading-relaxed">
                      {article.dek}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-border-default flex items-center justify-between text-xs text-text-muted">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime} min read</span>
                    </div>

                    <span className="font-semibold text-brand-primary-text inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Read Guide &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Why CareerVixa Value Pillars */}
        <section className="w-full py-10 sm:py-12 border-y border-border-default">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-text">Editorial Standard</span>
            <h2 className="text-2xl sm:text-3xl font-black text-text-heading tracking-tight mt-1">
              Built on High-Trust Career Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-2">
              Career advice impacts livelihood. Here is how CareerVixa ensures every guide meets the highest standard of executive rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 rounded-2xl bg-bg-surface border border-border-default flex flex-col gap-3.5 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-emerald-400 dark:bg-slate-950 dark:text-emerald-300 flex items-center justify-center font-bold shadow-sm border border-slate-800 dark:border-slate-800">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-text-heading">Data-Backed Research</h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                We avoid speculative opinions. Every framework is grounded in live market research, official compensation surveys, and verified hiring practices.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-surface border border-border-default flex flex-col gap-3.5 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-teal-300 dark:bg-slate-950 dark:text-teal-300 flex items-center justify-center font-bold shadow-sm border border-slate-800 dark:border-slate-800">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-text-heading">Supervised Editorial Rigor</h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Whether assisted by research AI or submitted by guest industry executives, all publications pass through strict manual review before reaching live publication.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-surface border border-border-default flex flex-col gap-3.5 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-sky-300 dark:bg-slate-950 dark:text-sky-300 flex items-center justify-center font-bold shadow-sm border border-slate-800 dark:border-slate-800">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-text-heading">Actionable Scripts &amp; Templates</h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                No vague platitudes. We provide ready-to-use conversation scripts for salary negotiations, recruiter outreach, and behavioral interview responses.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Guest Contributor Action Band */}
        <section className="w-full relative rounded-3xl overflow-hidden bg-brand-primary/[0.06] dark:bg-brand-primary/[0.12] p-8 sm:p-12 lg:p-14 border border-brand-primary/20">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-5">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-soft text-brand-primary-text border border-brand-primary/20">
              Thought Leadership &middot; Guest Contributor Program
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-heading tracking-tight leading-tight">
              Share Your Professional Expertise with 50,000+ Leaders
            </h2>
            <p className="text-text-muted text-xs sm:text-sm leading-relaxed max-w-xl">
              Are you an executive coach, senior engineer, or talent acquisition leader? Publish sponsored articles, expand your authority, and connect with ambitious professionals.
            </p>
            <Link
              href={publishUrl}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-brand-btn-fill hover:opacity-95 text-white font-bold text-sm shadow-md shadow-brand-primary/20 transition-all hover:scale-105 min-h-[44px]"
            >
              <span>Submit an Article Pitch &rarr;</span>
            </Link>
          </div>
        </section>

        {/* 6. Newsletter Magnet */}
        <section className="w-full py-4">
          <div className="max-w-xl mx-auto bg-bg-surface border border-border-default rounded-3xl p-8 sm:p-10 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand-primary-text flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-text-heading tracking-tight mb-2">
              Elevate Your Trajectory Weekly
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mb-6 leading-relaxed">
              Join thousands of ambitious professionals receiving our curated salary benchmarks, interview breakdowns, and career frameworks every Tuesday.
            </p>
            <NewsletterForm className="w-full" />
            <p className="text-[11px] text-text-muted mt-3">
              We respect your privacy. Zero spam. Unsubscribe at any time with one click.
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
}
