import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  Database,
  Mail,
  UserCheck,
  RefreshCw,
} from "lucide-react";
import { constructMetadata, siteConfig } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Privacy Policy & Data Protection | CareerVixa",
  description: "Read CareerVixa's privacy policy, data protection standards, GDPR/CCPA compliance, and reader data rights.",
  url: `${siteConfig.url}/privacy`,
});

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy & Data Protection | CareerVixa",
    description: "Read CareerVixa's privacy policy, data protection standards, GDPR/CCPA compliance, and reader data rights.",
    url: `${siteConfig.url}/privacy`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${siteConfig.url}/privacy` },
    ],
  };

  const sections = [
    {
      id: "collection",
      title: "1. Information We Collect",
      icon: Database,
      content: (
        <>
          <p className="text-text-muted leading-relaxed">
            We collect minimal information necessary to deliver high-quality career intelligence and manage contributor publishing:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-text-body mt-2">
            <li>
              <strong>Account Information:</strong> When you register as a contributor or reader, we collect your name, email address, and encrypted credentials.
            </li>
            <li>
              <strong>Contributor Submissions:</strong> Author biographical details, social profile links, article drafts, and promotional website links submitted for editorial review.
            </li>
            <li>
              <strong>Newsletter Subscriptions:</strong> Your email address and topic preferences when subscribing to the Executive Career Digest.
            </li>
            <li>
              <strong>Technical Telemetry:</strong> Anonymized metrics including browser type, device resolution, and aggregated article view counts used to improve responsiveness and readability.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "usage",
      title: "2. How We Use Your Information",
      icon: Eye,
      content: (
        <>
          <p className="text-text-muted leading-relaxed">
            Your data is used solely to provide and enhance CareerVixa’s services:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-text-body mt-2">
            <li>To manage your account, authenticate sessions, and deliver contributor dashboard capabilities.</li>
            <li>To review, fact-check, and publish submitted articles in our editorial queue.</li>
            <li>To send weekly career frameworks and compensation updates (you can unsubscribe with one click anytime).</li>
            <li>To monitor platform health, prevent spam, and enforce our editorial guidelines.</li>
          </ul>
        </>
      ),
    },
    {
      id: "outbound",
      title: "3. Outbound Links & Contributor Sponsorship Transparency",
      icon: FileText,
      content: (
        <>
          <p className="text-text-muted leading-relaxed">
            CareerVixa articles may include outbound links to primary sources, author websites, and sponsored contributor portals:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-text-body mt-2">
            <li>
              <strong>Sponsored Disclosure:</strong> Articles with commercial contributor links are explicitly badged as <em>Sponsored Contributor Publications</em>.
            </li>
            <li>
              <strong>Search Engine Compliance:</strong> Commercial and promotional links are tagged with <code className="px-1.5 py-0.5 rounded bg-bg-surface-subtle font-mono text-xs">rel="sponsored nofollow"</code> in full accordance with webmaster guidelines.
            </li>
            <li>
              <strong>External Policies:</strong> We are not responsible for the privacy practices of third-party websites linked within articles. We encourage readers to review their independent policies.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "ai-transparency",
      title: "4. AI Research & Machine Processing",
      icon: RefreshCw,
      content: (
        <>
          <p className="text-text-muted leading-relaxed">
            CareerVixa utilizes supervised artificial intelligence for research synthesis and structural formatting:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-text-body mt-2">
            <li>
              <strong>Human Supervision:</strong> No AI-generated draft is published without mandatory human editorial review, factual verification, and approval.
            </li>
            <li>
              <strong>Zero Data Reselling:</strong> Reader personal information and private drafts are never sold, rented, or used to train public commercial AI models without explicit opt-in consent.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "rights",
      title: "5. Your Rights (GDPR & CCPA Compliance)",
      icon: UserCheck,
      content: (
        <>
          <p className="text-text-muted leading-relaxed">
            Regardless of your geography, CareerVixa respects global privacy standards, including the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-text-body mt-2">
            <li><strong>Right of Access:</strong> You may request a copy of all personal data held about your account.</li>
            <li><strong>Right to Rectification:</strong> You can update your contributor bio, email, or credentials via your settings.</li>
            <li><strong>Right to Erasure:</strong> You can request complete deletion of your account and personal profile at any time.</li>
            <li><strong>Right to Opt-Out:</strong> Every email newsletter contains a direct, one-click unsubscribe mechanism.</li>
          </ul>
        </>
      ),
    },
    {
      id: "security",
      title: "6. Security & Data Retention",
      icon: Lock,
      content: (
        <>
          <p className="text-text-muted leading-relaxed">
            We implement industry-standard technical measures to safeguard your information:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-text-body mt-2">
            <li>All network communications are encrypted via Transport Layer Security (TLS/HTTPS).</li>
            <li>User passwords are hashed using cryptographic salt functions (Argon2 / Bcrypt) and are never stored in plaintext.</li>
            <li>Database access is restricted to authenticated services with strict role-based access control.</li>
          </ul>
        </>
      ),
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
      {/* Hero Header */}
      <section className="relative border-b border-border-default bg-gradient-to-b from-brand-primary/5 via-bg-page to-bg-page py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-primary/25 bg-brand-soft text-brand-primary-text text-xs font-bold uppercase tracking-wider shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Trust &amp; Compliance</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-text-heading leading-tight">
              Privacy Policy &amp; Data Protection
            </h1>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Last updated: October 2026 &middot; CareerVixa Executive Publication
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Sections */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="p-5 sm:p-6 bg-brand-soft border border-brand-primary/20 rounded-2xl text-xs sm:text-sm text-text-body leading-relaxed">
              <p>
                <strong>Summary Guarantee:</strong> CareerVixa prioritizes your privacy. We do not sell your personal data to advertising brokers. We collect only what is required to provide executive career intelligence, process contributor drafts, and deliver requested email newsletters.
              </p>
            </div>

            <div className="space-y-6">
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="p-6 sm:p-8 rounded-2xl border border-border-default bg-bg-surface shadow-xs space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-soft text-brand-primary-text flex items-center justify-center border border-brand-primary/20 shrink-0">
                      <section.icon className="w-4 h-4" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-text-heading">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-xs sm:text-sm text-text-body leading-relaxed pl-0 sm:pl-12">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact / Data Officer Box */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border-default bg-bg-surface-subtle shadow-xs space-y-3 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-text-muted">
                  <Mail className="w-3.5 h-3.5 text-brand-primary-text" />
                  <span>Data Protection Officer</span>
                </div>
                <h3 className="text-base font-bold text-text-heading">
                  Have questions about your data or privacy?
                </h3>
                <p className="text-xs text-text-muted">
                  Submit access, rectification, or deletion requests directly to our editorial compliance team.
                </p>
              </div>

              <Link
                href="mailto:privacy@careervixa.com"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-brand-btn-fill hover:bg-brand-btn-hover text-white text-xs font-bold transition-all shadow-xs shrink-0 min-h-[44px]"
              >
                Contact Privacy Desk
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
    </>
  );
}
