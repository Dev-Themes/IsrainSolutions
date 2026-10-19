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
  GraduationCap,
  Briefcase,
  Shuffle,
  Laptop,
  UserCheck,
  Compass,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { constructMetadata, siteConfig } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "About CareerVixa | Career Intelligence, Mission & Editorial Standards",
  description:
    "Helping people navigate their careers with confidence. Learn about CareerVixa's mission, audience, dual publishing model, and editorial principles.",
  url: `${siteConfig.url}/about`,
});

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About CareerVixa",
    description:
      "Helping people navigate their careers with confidence through data-backed career intelligence, actionable frameworks, and verified editorial standards.",
    url: `${siteConfig.url}/about`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "About", item: `${siteConfig.url}/about` },
    ],
  };

  const audienceSegments = [
    {
      title: "Students & Graduates",
      icon: GraduationCap,
      description:
        "Internship hunting, campus-to-corporate transitions, foundational resume design, and entry-level interview preparation.",
    },
    {
      title: "Active Job Seekers",
      icon: Briefcase,
      description:
        "Modern job search tactics, ATS-optimized resumes, recruiter cold messaging, and behavioral interview mastery.",
    },
    {
      title: "Career Changers",
      icon: Shuffle,
      description:
        "Translating non-traditional experience, building cross-industry skill narratives, and navigating mid-career pivots.",
    },
    {
      title: "Freelancers & Contractors",
      icon: Laptop,
      description:
        "Value-based pricing, client acquisition, contract negotiations, and building a resilient independent consulting business.",
    },
    {
      title: "Working Professionals",
      icon: UserCheck,
      description:
        "Promotion strategies, quarterly performance reviews, salary benchmarking, counter-offers, and workplace navigation.",
    },
    {
      title: "Leaders & Managers",
      icon: Compass,
      description:
        "First-time manager transitions, cross-functional leadership, hiring best practices, and building high-trust teams.",
    },
  ];

  const editorialPrinciples = [
    {
      title: "Accuracy & Verification",
      icon: CheckCircle2,
      description:
        "Every career guide, compensation benchmark, and industry trend is grounded in verifiable data and marketplace realities.",
    },
    {
      title: "Originality & Depth",
      icon: BookOpen,
      description:
        "We reject superficial platitudes. We publish 1,200 to 2,500 word comprehensive analyses with concrete examples and real case studies.",
    },
    {
      title: "Immediate Practical Value",
      icon: TrendingUp,
      description:
        "Every article includes tangible takeaways, step-by-step frameworks, or word-for-word scripts readers can apply today.",
    },
    {
      title: "Attribution & Integrity",
      icon: Award,
      description:
        "Every human contributor receives full public byline attribution, custom author bio, and verified professional profile links.",
    },
    {
      title: "Responsible Publishing",
      icon: ShieldCheck,
      description:
        "We strictly prohibit deceptive claims, clickbait, get-rich-quick career schemes, and unverified promotional funnels.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="w-full max-w-full overflow-x-clip bg-bg-page min-h-screen">
        {/* 1. Editorial Hero Section */}
        <section className="relative border-b border-border-default bg-gradient-to-b from-brand-primary/5 via-bg-page to-bg-page py-16 sm:py-24">
          <Container>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-primary/25 bg-brand-soft text-brand-primary-text text-xs font-bold uppercase tracking-wider shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Our Publication &amp; Editorial Mission</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-text-heading leading-[1.15]">
                Helping People Navigate Their Careers with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                  Confidence.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-text-muted leading-relaxed font-normal">
                CareerVixa is an independent digital publication dedicated to replacing generic advice
                with actionable roadmaps, compensation benchmarks, and tested workplace strategies.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-btn-fill hover:bg-brand-btn-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-primary/20 transition-all hover:-translate-y-0.5 min-h-[44px]"
                >
                  <span>Explore Career Guides</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/write-for-us"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border-default bg-bg-surface hover:bg-bg-surface-subtle text-text-heading text-xs sm:text-sm font-bold shadow-2xs transition-all min-h-[44px]"
                >
                  <PenTool className="h-4 w-4 text-brand-primary-text" />
                  <span>Write For Us</span>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. Who We Are & Our Mission */}
        <section className="py-14 sm:py-20 border-b border-border-default bg-bg-surface">
          <Container>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-text">
                  Who We Are
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-text-heading tracking-tight">
                  Democratizing Practical Career Intelligence
                </h2>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none text-text-muted leading-relaxed text-sm sm:text-base space-y-4">
                <p>
                  Professional growth should not depend on insider connections or luck. Too often, job seekers
                  and working professionals encounter high-level platitudes like &ldquo;network more&rdquo; or
                  &ldquo;know your worth&rdquo; that provide zero guidance when preparing for an interview or
                  negotiating an offer.
                </p>
                <p>
                  CareerVixa was built to bridge this gap. We produce tactical, step-by-step guides that teach
                  ambitious individuals how to craft impact-driven resumes, master behavioral and technical interviews,
                  navigate difficult workplace dynamics, and evaluate total compensation packages.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. Who We Help (6 Audience Cards) */}
        <section className="py-14 sm:py-20 border-b border-border-default bg-bg-page">
          <Container>
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-text">
                  Our Community
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-text-heading tracking-tight">
                  Who We Help
                </h2>
                <p className="text-xs sm:text-sm text-text-muted max-w-xl mx-auto">
                  Career journeys are non-linear. CareerVixa creates tailored intelligence across every major career milestone.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {audienceSegments.map((seg) => {
                  const Icon = seg.icon;
                  return (
                    <div
                      key={seg.title}
                      className="p-6 rounded-2xl border border-border-default bg-bg-surface hover:border-brand-primary/40 transition-colors shadow-xs flex flex-col gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand-primary-text flex items-center justify-center font-bold shadow-xs border border-brand-primary/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-text-heading">{seg.title}</h3>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                        {seg.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* 4. Dual Publishing Channels */}
        <section className="py-14 sm:py-20 border-b border-border-default bg-bg-surface">
          <Container>
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-text">
                  Content Creation Methodology
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-text-heading tracking-tight">
                  How CareerVixa Creates Content
                </h2>
                <p className="text-xs sm:text-sm text-text-muted max-w-xl mx-auto">
                  We blend verified practitioner expertise with responsible autonomous AI market research.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {/* Channel 1: Editorial Contributions */}
                <div className="p-6 sm:p-8 rounded-2xl border border-border-default bg-bg-page flex flex-col justify-between gap-6 shadow-xs">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-text-heading">
                      Practitioner &amp; Contributor Guides
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      Industry practitioners, coaches, talent specialists, and seasoned managers share
                      firsthand lessons and proven workplace scripts. Contributor submissions undergo
                      rigorous email-based editorial pitching, review, and fact-checking before live publication
                      with verified author attribution.
                    </p>
                  </div>
                  <Link
                    href="/write-for-us"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary-text hover:underline"
                  >
                    <span>Read contributor guidelines</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Channel 2: Supervised AI Publishing */}
                <div className="p-6 sm:p-8 rounded-2xl border border-border-default bg-bg-page flex flex-col justify-between gap-6 shadow-xs">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-text-heading">
                      Responsible Autonomous AI Publishing
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      Our autonomous AI publisher continuously scans industry hiring reports, compensation
                      benchmarks, and tech job trends. Operating under strict factual safety constraints,
                      structured schemas, and editorial guidelines, it compiles comprehensive daily guides
                      to keep readers ahead of changing market conditions.
                    </p>
                  </div>
                  <Link
                    href="/articles"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary-text hover:underline"
                  >
                    <span>Browse latest daily publications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 5. 5 Editorial Principles */}
        <section className="py-14 sm:py-20 border-b border-border-default bg-bg-page">
          <Container>
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-text">
                  Our Code of Ethics
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-text-heading tracking-tight">
                  Five Editorial Principles
                </h2>
                <p className="text-xs sm:text-sm text-text-muted max-w-xl mx-auto">
                  Career choices have high personal stakes. We govern every publication by these non-negotiable standards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {editorialPrinciples.map((prin) => {
                  const Icon = prin.icon;
                  return (
                    <div
                      key={prin.title}
                      className="p-6 rounded-2xl border border-border-default bg-bg-surface hover:border-brand-primary/40 transition-colors shadow-xs flex flex-col gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-text-heading">{prin.title}</h3>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                        {prin.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* 6. Final Call to Action */}
        <section className="py-16 sm:py-24 bg-bg-surface">
          <Container>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-heading tracking-tight">
                Ready to Accelerate Your Career?
              </h2>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-xl mx-auto">
                Explore our full library of data-backed career roadmaps, or join our contributor community to share your firsthand insights.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-btn-fill hover:bg-brand-btn-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-primary/20 transition-all hover:-translate-y-0.5 min-h-[44px]"
                >
                  <span>Browse All Articles</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/write-for-us"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border-default bg-bg-page hover:bg-bg-surface-subtle text-text-heading text-xs sm:text-sm font-bold shadow-2xs transition-all min-h-[44px]"
                >
                  <PenTool className="h-4 w-4 text-brand-primary-text" />
                  <span>Write for Us</span>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
