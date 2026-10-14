import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Sparkles, CheckCircle2, ShieldCheck, PenTool, Users, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Publish Your Article | CareerVixa Contributor Portal",
  description: "Share your career expertise, industry insights, and professional growth strategies with thousands of ambitious job seekers.",
};

export default async function PublishLandingPage() {
  const session = await auth();

  // If already authenticated, redirect straight to their contributor dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-bg-page">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border-default bg-gradient-to-b from-brand-primary/5 via-bg-page to-bg-page py-20 px-4 sm:px-6 lg:px-8">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-primary/20 bg-brand-primary/10 text-brand-primary-text text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Guest Publishing & Editorial Portal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-heading">
              Publish on <span className="text-brand-primary">CareerVixa</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
              Share your expertise on career development, hiring trends, salary negotiations, and workplace growth with thousands of ambitious professionals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/signup?callbackUrl=/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-lg bg-brand-btn-fill text-white font-semibold shadow hover:opacity-95 transition-all"
              >
                <span>Get Started as Contributor</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login?callbackUrl=/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-lg border border-border-default bg-bg-surface text-text-heading font-semibold hover:bg-bg-page transition-colors"
              >
                <span>Sign In to Dashboard</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-heading">
                Why Contribute to CareerVixa?
              </h2>
              <p className="text-sm text-text-muted mt-2">
                Build your authority while educating readers about executive advancement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-xl border border-border-default bg-bg-surface p-6 space-y-3 shadow-xs">
                <div className="h-11 w-11 rounded-xl bg-slate-900 text-sky-400 dark:bg-slate-950 dark:text-sky-300 flex items-center justify-center shadow-sm border border-slate-800 dark:border-slate-800">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base text-text-heading">
                  Targeted Professional Audience
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Reach job seekers, recruiters, executives, and remote professionals seeking high-quality career advice.
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-bg-surface p-6 space-y-3 shadow-xs">
                <div className="h-11 w-11 rounded-xl bg-slate-900 text-emerald-400 dark:bg-slate-950 dark:text-emerald-300 flex items-center justify-center shadow-sm border border-slate-800 dark:border-slate-800">
                  <PenTool className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base text-text-heading">
                  AI Research &amp; Rich-Text Tools
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Use our live AI agent to research and structure initial drafts, or craft custom articles with our rich-text editor.
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-bg-surface p-6 space-y-3 shadow-xs">
                <div className="h-11 w-11 rounded-xl bg-slate-900 text-teal-300 dark:bg-slate-950 dark:text-teal-300 flex items-center justify-center shadow-sm border border-slate-800 dark:border-slate-800">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base text-text-heading">
                  Promotional Link Attribution
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Include your organization profile and approved promotional backlinks to your career service or portfolio.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Editorial Standards & Gate */}
      <section className="bg-bg-surface/50 border-t border-border-default py-16 px-4 sm:px-6 lg:px-8">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center text-text-heading">
              CareerVixa Editorial Standards
            </h2>
            <div className="rounded-xl border border-border-default bg-bg-surface p-6 space-y-4 shadow-xs">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-text-body">
                  <strong className="text-text-heading">Niche Relevance:</strong> All submissions must directly address Career Development, Job Searching, Interviewing, Resumes, or Professional Growth.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-text-body">
                  <strong className="text-text-heading">Mandatory Editorial Review:</strong> Contributor articles never publish automatically. Every submission undergoes manual review by CareerVixa editors.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-text-body">
                  <strong className="text-text-heading">Originality & Rights:</strong> You must declare publication rights and ownership of your submitted work.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <Link
                href="/signup?callbackUrl=/dashboard"
                className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-lg bg-brand-btn-fill text-white font-semibold hover:opacity-95 transition-all shadow-sm"
              >
                <span>Publish Your Article Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
