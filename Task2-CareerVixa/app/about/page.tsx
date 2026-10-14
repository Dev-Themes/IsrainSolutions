import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  Sparkles,
  TrendingUp,
  FileCheck2,
  Lock,
  ArrowRight,
  PenTool,
} from "lucide-react";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "About CareerVixa | Executive Career Intelligence & Editorial Mission",
  description: "Learn about CareerVixa's mission, editorial standards, data-backed career intelligence, and contributor community.",
  url: "https://career-vixa.vercel.app/about",
});

export default function AboutPage() {
  const pillars = [
    {
      title: "Data-Backed Market Intelligence",
      description: "We analyze verified compensation surveys, hiring reports, and marketplace dynamics to give you real leverage in salary and career decisions.",
      icon: TrendingUp,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    {
      title: "Actionable Executive Frameworks",
      description: "No generic motivational fluff. Every guide provides battle-tested negotiation scripts, resume templates, and concrete interview frameworks.",
      icon: BookOpen,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    {
      title: "Supervised AI & Editorial Governance",
      description: "We harness AI models for comprehensive research, with mandatory human fact-checking and editorial approval prior to publication.",
      icon: Sparkles,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    },
    {
      title: "Transparent Standards & Integrity",
      description: "Sponsored contributor publications and affiliate links are clearly disclosed. Our editorial integrity is paramount and non-negotiable.",
      icon: ShieldCheck,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
  ];

  const editorialRules = [
    "Every article must include actionable takeaways, verifiable sources, or real-world frameworks.",
    "Compensation claims must cite verified industry data or primary marketplace benchmark sources.",
    "Sponsored contributor articles are reviewed for quality, clarity, and factual accuracy prior to approval.",
    "Outbound links are tagged with appropriate rel attributes (nofollow/sponsored) to maintain search compliance.",
    "We maintain zero tolerance for plagiarized content, clickbait, or unverified career guarantees.",
  ];

  return (
    <div className="w-full max-w-full overflow-x-clip bg-bg-page min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative border-b border-border-default bg-gradient-to-b from-brand-primary/5 via-bg-page to-bg-page py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-primary/25 bg-brand-soft text-brand-primary-text text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Award className="h-3.5 w-3.5" />
              <span>Independent Career Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-text-heading leading-[1.15]">
              Empowering Ambitious Professionals with <span className="text-brand-primary">Actionable Intelligence</span>
            </h1>

            <p className="text-base sm:text-lg text-text-muted leading-relaxed font-normal">
              CareerVixa is an executive digital publication created to replace generic job advice with data-backed career frameworks, compensation benchmarks, and proven workplace navigation strategies.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/category/career-development"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-btn-fill hover:bg-brand-btn-hover text-white text-xs sm:text-sm font-bold shadow-sm transition-all hover:shadow"
              >
                <span>Explore Career Guides</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/publish"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border-default bg-bg-surface hover:bg-bg-surface-subtle text-text-heading text-xs sm:text-sm font-bold shadow-2xs transition-all"
              >
                <PenTool className="h-4 w-4 text-brand-primary-text" />
                <span>Write For Us</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Core Pillars Grid */}
      <section className="py-16 sm:py-20 border-b border-border-default bg-bg-surface">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-2 mb-12 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-text">
                Our Foundation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-heading">
                What Sets CareerVixa Apart
              </h2>
              <p className="text-sm text-text-muted max-w-xl mx-auto">
                Modern workplaces change rapidly. Our publication is built on rigorous editorial principles designed for high career impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl border border-border-default bg-bg-surface hover:border-brand-primary/40 transition-all shadow-xs space-y-3"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${pillar.color}`}>
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-text-heading">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Editorial Standards & Review Workflow */}
      <section className="py-16 sm:py-20 bg-bg-page">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="bg-bg-surface border border-border-default rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 text-brand-primary-text font-bold text-xs uppercase tracking-wider">
                <FileCheck2 className="w-4 h-4" />
                <span>Editorial Code of Ethics</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-heading">
                Rigorous Editorial Governance &amp; Fact-Checking
              </h2>

              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                We believe career advice carries high stakes. A misleading salary benchmark or poorly calibrated negotiation advice can impact a professional’s income and career progression. That is why our editorial desk adheres to uncompromising quality standards.
              </p>

              <div className="space-y-3 pt-2">
                {editorialRules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-text-body">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span className="leading-relaxed font-medium">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contributor Community & Platform Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 sm:p-8 rounded-2xl border border-border-default bg-bg-surface shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand-primary-text flex items-center justify-center border border-brand-primary/20">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-text-heading">
                  Verified Executive Contributors
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  Our authors include career coaches, talent acquisition leads, negotiation consultants, and corporate leaders sharing hands-on lessons from executive hiring.
                </p>
                <Link
                  href="/publish"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary-text hover:underline pt-2"
                >
                  <span>Learn how to write for us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl border border-border-default bg-bg-surface shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-text-heading">
                  Reader Privacy &amp; Trust
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  We respect reader data. We do not sell personal browsing histories to data brokers. Our newsletter subscribers can withdraw consent and unsubscribe at any time.
                </p>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary-text hover:underline pt-2"
                >
                  <span>Read our Privacy Policy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
