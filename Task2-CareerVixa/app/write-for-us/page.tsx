import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { constructMetadata, siteConfig } from "@/lib/seo";
import {
  PenTool,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Send,
  Users,
  Compass,
  Briefcase,
  TrendingUp,
  Award,
  AlertCircle,
  Code,
  Laptop,
  Layers,
  FileCheck2,
  Check,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import {
  PitchTemplateCard,
  CopyEmailButton,
  WriteForUsFaq,
} from "@/components/write-for-us/WriteForUsInteractive";

export const metadata = constructMetadata({
  title: "Write for Us | Editorial Guidelines & Contributor Pitching — CareerVixa",
  description:
    "Share practical career frameworks, actionable interview strategies, and real-world workplace insights with ambitious professionals across every stage of their career.",
  url: `${siteConfig.url}/write-for-us`,
});

export default function WriteForUsPage() {
  const editorialEmail = (process.env.NEXT_PUBLIC_EDITORIAL_EMAIL || "devthemes4@gmail.com").trim();
  const isEmailConfigured = Boolean(editorialEmail && editorialEmail.length > 3);

  const valueProps = [
    {
      title: "Verified Author Attribution",
      icon: Award,
      description:
        "Every approved guide features your authentic byline, custom biography, and approved link to your professional profile or portfolio.",
    },
    {
      title: "Targeted Professional Reach",
      icon: Users,
      description:
        "Your insights reach students, job seekers, career changers, freelancers, and engineering professionals actively seeking actionable guidance.",
    },
    {
      title: "Collaborative Editorial Desk",
      icon: FileCheck2,
      description:
        "Work directly with our editors to refine your concepts, strengthen your structure, and produce high-impact, enduring career resources.",
    },
  ];

  const topicAreas = [
    {
      title: "Career Growth & Transitions",
      icon: TrendingUp,
      description:
        "Navigating career pivots, overcoming plateaus, internal mobility, skill reskilling narratives, and breaking into competitive industries.",
    },
    {
      title: "Resume & Portfolio Architecture",
      icon: Compass,
      description:
        "Modern resume formats, ATS optimization, quantifiable impact bullet points, technical portfolios, and GitHub profile presentation.",
    },
    {
      title: "Interview Strategies & Scripts",
      icon: Briefcase,
      description:
        "Behavioral STAR answers, executive presentation tactics, live coding preparation, case interview frameworks, and reverse-interview questions.",
    },
    {
      title: "Salary & Offer Negotiation",
      icon: Award,
      description:
        "Total compensation evaluation, equity vs. base breakdown, counter-offer tactics, performance review raises, and market benchmarks.",
    },
    {
      title: "Job Search & Recruiter Outreach",
      icon: Mail,
      description:
        "Accessing the hidden job market, crafting effective recruiter cold outreach, networking etiquette, and agency recruiter partnerships.",
    },
    {
      title: "Technology & Engineering Careers",
      icon: Code,
      description:
        "Software engineering levels, tech lead transitions, system design interviews, AI tooling workflows, and engineering management.",
    },
    {
      title: "Freelancing & Consulting",
      icon: Laptop,
      description:
        "Value-based pricing, client acquisition, contract negotiation, freelance-to-fulltime bridges, and building an independent consulting practice.",
    },
    {
      title: "Leadership & Management",
      icon: ShieldCheck,
      description:
        "First-time manager transitions, cross-functional stakeholder management, high-performance team culture, and executive decision-making.",
    },
    {
      title: "Workplace Dynamics & Culture",
      icon: Layers,
      description:
        "Remote collaboration strategies, burnout mitigation, performance improvement plan navigation, and healthy boundary setting.",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Submit a Structured Pitch",
      icon: Mail,
      description:
        "Email your proposed topic, target audience, 3 to 5 core takeaways, and author bio to our editorial team using the structured pitch format.",
    },
    {
      step: "02",
      title: "Editorial Evaluation",
      icon: FileCheck2,
      description:
        "Our editors evaluate your concept for practical relevance, originality, and audience value, replying with approval or constructive angle refinement.",
    },
    {
      step: "03",
      title: "Draft Submission",
      icon: PenTool,
      description:
        "Upon pitch acceptance, submit your complete draft (typically 1,200 to 2,500 words) with real-world examples, actionable scripts, or frameworks.",
    },
    {
      step: "04",
      title: "Collaborative Polish & Staging",
      icon: Layers,
      description:
        "Our team reviews the draft, provides structural and copy feedback, fact-checks references, and stages the article in our CMS.",
    },
    {
      step: "05",
      title: "Publication & Byline",
      icon: CheckCircle2,
      description:
        "Your article is published live with full author attribution, author schema markup, and permanent URL. We email you the live link.",
    },
  ];

  const pitchTemplateSubject = "Pitch: [Proposed Article Title] - [Your Name]";
  const pitchTemplateBody = `Hi CareerVixa Editorial Team,

I would like to propose an article for CareerVixa. Here are the details of my pitch:

1. Proposed Working Title:
[Clear, descriptive title]

2. Target Audience:
[e.g., Early career professionals, career changers, job seekers, team leaders]

3. Core Problem & Practical Takeaways:
- Takeaway 1: [Specific, actionable insight]
- Takeaway 2: [Specific, actionable insight]
- Takeaway 3: [Specific, actionable insight]

4. Proposed Article Outline:
- Section 1: [Overview / context]
- Section 2: [Framework / step-by-step methodology]
- Section 3: [Practical examples, scripts, or case studies]
- Section 4: [Actionable summary and implementation steps]

5. Author Background & Portfolio:
- Brief Bio: [1-2 sentences highlighting your experience and expertise]
- Professional Profile / Website: [LinkedIn, personal website, or portfolio URL]

6. Originality Confirmation:
I confirm that this pitch and any resulting article will be original, unpublished work authored by me.

Thank you for your consideration,
[Your Name]`;

  const mailtoHref = `mailto:${editorialEmail}?subject=${encodeURIComponent(
    pitchTemplateSubject
  )}&body=${encodeURIComponent(pitchTemplateBody)}`;

  return (
    <div className="w-full max-w-full overflow-x-clip bg-bg-page min-h-screen">
      <Container className="py-10 sm:py-14 lg:py-20 flex flex-col gap-16 lg:gap-20">
        {/* 1. Header / Hero Section */}
        <section className="text-center max-w-3xl mx-auto flex flex-col items-center gap-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-primary/20 text-brand-primary-text text-xs font-bold uppercase tracking-wider">
            <PenTool className="w-3.5 h-3.5" />
            <span>CareerVixa Contributor Network &amp; Editorial Standards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-heading tracking-tight leading-[1.15]">
            Write for <span className="text-brand-primary">CareerVixa</span>
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            Share practical career frameworks, actionable interview strategies, and real-world workplace insights.
            We publish tested guidance for ambitious students, job seekers, career changers, freelancers, and experienced leaders.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-btn-fill text-white font-bold text-sm shadow-md shadow-brand-primary/20 hover:opacity-95 transition-all hover:-translate-y-0.5 min-h-[44px]"
            >
              <Mail className="w-4 h-4" />
              <span>Pitch an Article ({editorialEmail})</span>
            </a>

            <a
              href="#editorial-process"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-bg-surface border border-border-default text-text-heading font-bold text-sm hover:bg-bg-surface-subtle transition-all min-h-[44px]"
            >
              <span>View Publishing Workflow</span>
            </a>
          </div>
        </section>

        {/* 2. 3 "Why Contribute?" Cards */}
        <section className="space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-text">
              Contributor Benefits
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-text-heading tracking-tight">
              Why Write for CareerVixa?
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              We respect your intellectual contributions with authentic attribution and rigorous editorial support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valueProps.map((prop) => {
              const Icon = prop.icon;
              return (
                <div
                  key={prop.title}
                  className="p-6 rounded-2xl bg-bg-surface border border-border-default flex flex-col gap-3 shadow-xs hover:border-brand-primary/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand-primary-text flex items-center justify-center font-bold shadow-xs border border-brand-primary/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-text-heading">{prop.title}</h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. 9-Topic Card Grid */}
        <section className="space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-text">
              Editorial Scope
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-text-heading tracking-tight">
              Topics We Welcome
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              We focus on practical, actionable guides across nine core career and professional domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicAreas.map((topic) => {
              const Icon = topic.icon;
              return (
                <div
                  key={topic.title}
                  className="p-6 rounded-2xl bg-bg-surface border border-border-default flex flex-col gap-3 shadow-xs hover:border-brand-primary/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-sky-400 dark:bg-slate-950 dark:text-sky-300 flex items-center justify-center font-bold shadow-xs border border-slate-800">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-text-heading">{topic.title}</h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. 5-Stage Editorial Workflow */}
        <section id="editorial-process" className="space-y-8 scroll-mt-24">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-text">
              Publishing Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-text-heading tracking-tight">
              How External Publishing Works
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              All contributor submissions are handled through direct editorial correspondence via email.
              Here is our transparent, 5-stage editorial review process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-bg-surface border border-border-default flex flex-col gap-3 relative shadow-xs hover:border-brand-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-brand-soft text-brand-primary-text font-black text-xs flex items-center justify-center">
                      {step.step}
                    </div>
                    <Icon className="w-4 h-4 text-text-muted" />
                  </div>
                  <h3 className="font-bold text-sm text-text-heading leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Pitch Checklist & Submission Format (Two Column) */}
        <section id="pitch-checklist" className="space-y-8 scroll-mt-24">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-text">
              Submission Format
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-text-heading tracking-tight">
              How to Structure Your Pitch
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Use our structured pitch checklist to ensure your proposal contains all details our editors need.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Checklist Column (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border-default space-y-6 shadow-xs">
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="w-5 h-5 text-brand-primary" />
                <h3 className="font-bold text-base text-text-heading">Pitch Checklist</h3>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Before sending your email, ensure your pitch includes each of these six required components:
              </p>
              <ul className="space-y-3.5 text-xs sm:text-sm text-text-muted">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-text-heading">Working Title:</strong> Specific, clear, and relevant to professional growth.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-text-heading">Target Audience:</strong> Who will benefit most (e.g., job seekers, new managers, engineers).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-text-heading">3–5 Core Takeaways:</strong> Specific, actionable insights readers will gain.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-text-heading">Structured Outline:</strong> 3 to 4 sections outlining your proposed methodology or case studies.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-text-heading">Author Bio &amp; Link:</strong> 1–2 sentences highlighting your experience and your LinkedIn or portfolio URL.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-text-heading">Originality Affirmation:</strong> Confirmation that your work is original and unpublished.
                  </span>
                </li>
              </ul>

              <div className="pt-2 border-t border-border-default/60">
                <a
                  href={mailtoHref}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-btn-fill text-white font-bold text-xs shadow-xs hover:opacity-95 transition-opacity min-h-[42px]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open Pre-filled Email Client</span>
                </a>
              </div>
            </div>

            {/* Template Column (7 cols) */}
            <div className="lg:col-span-7">
              <PitchTemplateCard email={editorialEmail} templateText={pitchTemplateBody} />
            </div>
          </div>
        </section>

        {/* 6. Editorial Standards & What We Expect */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border-default flex flex-col gap-5 shadow-xs">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <h3 className="text-lg font-bold text-text-heading">What We Welcome</h3>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-text-muted leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-2 shrink-0" />
                <span>
                  <strong className="text-text-heading">Depth &amp; Substance:</strong> Typically 1,200 to 2,500 words of thorough, well-organized analysis.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-2 shrink-0" />
                <span>
                  <strong className="text-text-heading">Firsthand Experience:</strong> Real-world scenarios, case studies, concrete examples, or specific lessons learned.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-2 shrink-0" />
                <span>
                  <strong className="text-text-heading">Actionable Frameworks:</strong> Readers should walk away with clear steps, frameworks, or scripts they can apply immediately.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-2 shrink-0" />
                <span>
                  <strong className="text-text-heading">Full Author Attribution:</strong> Every approved article includes your verified byline, biography, and professional profile link.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border-default flex flex-col gap-5 shadow-xs">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
              <h3 className="text-lg font-bold text-text-heading">What We Do Not Accept</h3>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-text-muted leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-rose-400 mt-2 shrink-0" />
                <span>
                  <strong className="text-text-heading">Unedited AI Spam:</strong> Automated, unedited content farm submissions without human verification or original insight.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-rose-400 mt-2 shrink-0" />
                <span>
                  <strong className="text-text-heading">Self-Promotional Advertorials:</strong> Articles whose primary aim is shilling a product, service, or affiliate funnel.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-rose-400 mt-2 shrink-0" />
                <span>
                  <strong className="text-text-heading">Plagiarized or Rehashed Work:</strong> Content that has already appeared elsewhere on the web or borrows heavily without attribution.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-rose-400 mt-2 shrink-0" />
                <span>
                  <strong className="text-text-heading">Superficial Advice:</strong> Generic platitudes (e.g., &quot;work hard and network&quot;) that lack tactical depth or specific guidance.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 7. Legal & Policy Disclosures */}
        <section className="p-6 rounded-2xl bg-bg-surface-subtle border border-border-default text-xs text-text-muted leading-relaxed space-y-3 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-2 font-bold text-text-heading">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Editorial Policies &amp; Terms Disclosure</span>
          </div>
          <p>
            Editorial review timelines, licensing, syndication arrangements, and compensation terms (if any)
            are assessed individually by CareerVixa editors on a per-submission basis. CareerVixa reserves the
            right to edit accepted submissions for clarity, style, length, and SEO alignment, or to decline
            unsolicited pitches that do not align with our current editorial calendar.
          </p>
          <p>
            Submission of a pitch does not constitute a guarantee of publication. Approved articles are published
            with genuine author attribution, biographical information, and verified profile links.
          </p>
        </section>

        {/* 8. Contributor FAQ Accordion */}
        <section className="space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-text">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-text-heading tracking-tight">
              Contributor FAQs
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Everything you need to know about pitching and writing for CareerVixa.
            </p>
          </div>

          <WriteForUsFaq />
        </section>

        {/* 9. Final Call to Action with Email Copying */}
        <section className="text-center max-w-2xl mx-auto flex flex-col items-center gap-5 pt-4">
          <h2 className="text-2xl sm:text-3xl font-black text-text-heading tracking-tight">
            Ready to Share Your Expertise?
          </h2>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            Send us your pitch. If your concept aligns with what our readers need right now, our editors
            will reach out directly to guide you through the drafting process.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-btn-fill text-white font-bold text-sm shadow-md shadow-brand-primary/20 hover:opacity-95 transition-all hover:-translate-y-0.5 min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span>Email Pitch to {editorialEmail}</span>
            </a>

            <CopyEmailButton email={editorialEmail} />
          </div>
        </section>
      </Container>
    </div>
  );
}
