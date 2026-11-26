import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  X,
  ShieldCheck,
  Clock,
  ChevronRight,
  HelpCircle,
  FileText,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Layers,
  Globe,
} from "lucide-react";
import { serviceDetailsData } from "@/content/service-details";
import { servicesData } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { BriefForm } from "@/components/forms/BriefForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = serviceDetailsData[slug];
  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${slug}`,
  });
}

const samplePublishers = [
  { name: "MSN", domain: "msn.com", da: 92, dr: 93, cat: "Global News" },
  { name: "Business Insider Africa", domain: "africa.businessinsider.com", da: 89, dr: 88, cat: "Business & Tech" },
  { name: "The Independent", domain: "independent.co.uk", da: 94, dr: 92, cat: "Media" },
  { name: "Markets Insider", domain: "markets.businessinsider.com", da: 91, dr: 90, cat: "Finance" },
  { name: "UrbanMatter", domain: "urbanmatter.com", da: 64, dr: 72, cat: "Lifestyle" },
  { name: "The Source", domain: "thesource.com", da: 76, dr: 78, cat: "Culture" },
];

const nichesList = [
  "Business & Finance",
  "Technology & SaaS",
  "Health & Wellness",
  "Education & E-learning",
  "Real Estate & Property",
  "Home Improvement",
  "Travel & Tourism",
  "Fashion & Lifestyle",
  "Crypto & Web3",
];

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = serviceDetailsData[slug];

  if (!service) {
    notFound();
  }

  // Schema generation
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.metaDescription,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.brandName,
      url: siteConfig.url,
    },
    offers: {
      "@type": "Offer",
      price: service.startingPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/services/${service.slug}`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteConfig.url}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${siteConfig.url}/services/${service.slug}`,
      },
    ],
  };

  return (
    <div className="flex flex-col w-full bg-[#020817]">
      <JsonLd data={[serviceSchema, faqSchema, breadcrumbSchema]} />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#020817] border-b border-sky-500/15 py-3">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-sky-300/80">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-sky-500/40" />
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3 h-3 text-sky-500/40" />
            <span className="text-white font-medium">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#041238] via-[#020b24] to-[#020817] pt-14 pb-20 border-b border-sky-500/20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/15 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/50 bg-[#061b45]/90 text-xs font-semibold uppercase tracking-widest text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
              <span>Link Building Service · Real Vetted Sites</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] text-balance">
              {service.h1}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              {service.heroSnippet} Every site is selected and engaged through manual outreach to ensure genuine topical relevance, search traffic, and permanent dofollow indexation.
            </p>

            {/* 4 Quick Stat Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#06163b]/90 border border-sky-400/30">
                <span className="text-[10px] uppercase font-mono text-sky-300/80 block">Turnaround</span>
                <strong className="text-sm sm:text-base font-bold text-white block mt-0.5">{service.deliveryTime}</strong>
                <span className="text-[10px] text-slate-400">Live delivery</span>
              </div>
              <div className="p-3 rounded-xl bg-[#06163b]/90 border border-sky-400/30">
                <span className="text-[10px] uppercase font-mono text-sky-300/80 block">Domain Quality</span>
                <strong className="text-sm sm:text-base font-bold text-white block mt-0.5">DA & DR 30+</strong>
                <span className="text-[10px] text-slate-400">Strictly verified</span>
              </div>
              <div className="p-3 rounded-xl bg-[#06163b]/90 border border-sky-400/30">
                <span className="text-[10px] uppercase font-mono text-sky-300/80 block">Organic Traffic</span>
                <strong className="text-sm sm:text-base font-bold text-white block mt-0.5">5,000+ Ahrefs</strong>
                <span className="text-[10px] text-slate-400">Real readers</span>
              </div>
              <div className="p-3 rounded-xl bg-[#06163b]/90 border border-sky-400/30">
                <span className="text-[10px] uppercase font-mono text-sky-300/80 block">Starting At</span>
                <strong className="text-sm sm:text-base font-bold text-sky-400 block mt-0.5">${service.startingPrice}</strong>
                <span className="text-[10px] text-slate-400">One-time payment</span>
              </div>
            </div>

            {/* CTAs & Guarantee */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#order-brief"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] hover:from-[#34bbf0] hover:to-[#7dd3fc] text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-200 text-center shadow-[0_0_25px_rgba(56,189,248,0.35)] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Order {service.name}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full border border-sky-400/60 hover:border-sky-300 text-sky-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 text-center flex items-center justify-center gap-2 bg-[#06183d]/60 hover:bg-[#0c2859]"
              >
                <MessageSquare className="w-4 h-4 text-sky-400" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
              <ShieldCheck className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>Live in {service.deliveryTime}. Full refund within 12 to 24 hours if we miss the deadline.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Where We Publish Strip */}
      <section className="bg-[#020817] py-14 border-b border-sky-500/15">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 block mb-1">
                Where We Publish
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Sites we place {service.name.toLowerCase()} on.
              </h2>
            </div>
            <Link
              href="/guest-post-sites"
              className="text-xs font-bold text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1 whitespace-nowrap"
            >
              <span>View full 2,000+ catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {samplePublishers.map((pub, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#06163b]/85 border border-sky-400/30 flex flex-col justify-between hover:border-sky-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all group"
              >
                <div>
                  <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors block truncate">
                    {pub.name}
                  </span>
                  <span className="text-[10px] text-sky-300/70 font-mono block truncate mt-0.5">
                    {pub.domain}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-sky-500/15 text-[10px] font-mono">
                  <span className="text-slate-300">DA {pub.da}</span>
                  <span className="text-sky-400 font-bold">DR {pub.dr}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Explanation Block: What It Is */}
      <section className="bg-gradient-to-b from-[#020817] via-[#04133b] to-[#020817] py-20 border-b border-sky-500/15">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                Editorial Integrity
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                What makes our {service.name.toLowerCase()} different.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Most agencies rely on automated blasts, reciprocal link swaps, or disguised PBN farms that carry severe algorithmic risks. We do the manual work: contacting editors, pitching original content, and embedding contextual dofollow links that stand up to search engine updates.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.whatYouGet.map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl bg-[#06163b]/85 border border-sky-400/30 flex items-start gap-3.5 hover:border-sky-300 transition-all"
                  >
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process: Six Steps */}
      <section className="bg-[#020817] py-20 border-b border-sky-500/15">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Our Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Six steps, from niche research to a live report.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Clear, transparent milestones from initial URL intake to verified delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Niche analysis", desc: "We evaluate your target page and find authoritative publications closely matched to your specific industry topic." },
              { step: "02", title: "Manual outreach", desc: "Our outreach specialists personally contact blog editors and webmasters. No automated software and zero private PBNs." },
              { step: "03", title: "Content creation", desc: "Experienced writers craft an original, helpful 500+ words article aligned with the publisher's editorial guidelines." },
              { step: "04", title: "Editorial placement", desc: "Your dofollow link is embedded naturally inside the article body using your selected anchor text." },
              { step: "05", title: "Quality check", desc: "We review the domain's live Moz DA, Ahrefs DR, organic search traffic, and spam score to verify standard compliance." },
              { step: "06", title: "Live link report", desc: "You receive an organized spreadsheet report containing the live published URL, metrics, and indexation status." },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#06163b]/85 border border-sky-400/30 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-3xl font-extrabold text-sky-400 font-mono mb-2 block">
                    {p.step}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Pricing Tiers */}
      <section className="bg-gradient-to-b from-[#020817] via-[#04133b] to-[#020817] py-20 border-b border-sky-500/15">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Package Options
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {service.name} packages. One-time payment.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              No monthly retainer or hidden fees. All placements feature verified DA/DR 30+ metrics and organic search traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Basic Package */}
            <div className="rounded-2xl bg-[#06163b]/85 border border-sky-400/35 p-6 sm:p-8 flex flex-col justify-between shadow-lg">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">Basic</h3>
                  <p className="text-xs text-slate-300 mt-1 min-h-[32px]">
                    Single placement to test our outreach quality or support a newly published page.
                  </p>
                </div>
                <div className="flex items-baseline justify-center gap-1 pb-4 border-b border-sky-500/20">
                  <span className="text-4xl font-extrabold text-white">${service.startingPrice}</span>
                  <span className="text-xs text-sky-300">/ one-time</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span><strong>1 {service.name} link</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>DA and DR 30+ guaranteed</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>Ahrefs organic traffic 5,000+</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>500+ words unique editorial copy</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>Permanent contextual dofollow link</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <a
                  href="#order-brief"
                  className="w-full py-3 rounded-full border border-sky-400/60 hover:border-sky-300 text-sky-200 hover:text-white hover:bg-sky-500/15 text-xs font-bold uppercase tracking-wider text-center block transition-all"
                >
                  Select Basic →
                </a>
              </div>
            </div>

            {/* Popular Package */}
            <div className="rounded-2xl bg-gradient-to-b from-[#082255] to-[#05163b] border-2 border-sky-400 p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_35px_rgba(56,189,248,0.3)] md:-translate-y-2 relative">
              <div className="absolute -top-3.5 inset-x-0 mx-auto w-max px-4 py-1 rounded-full bg-[#1FA9E0] text-slate-950 text-[11px] font-black uppercase tracking-widest text-center shadow-[0_0_15px_rgba(31,169,224,0.6)] z-10">
                Most Popular Choice
              </div>
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">Popular</h3>
                  <p className="text-xs text-slate-300 mt-1 min-h-[32px]">
                    Two authoritative links for pages actively competing for commercial keyword positions.
                  </p>
                </div>
                <div className="flex items-baseline justify-center gap-1 pb-4 border-b border-sky-500/20">
                  <span className="text-4xl font-extrabold text-white">${service.startingPrice * 2}</span>
                  <span className="text-xs text-sky-300">/ one-time</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span><strong>2 {service.name} links</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>DA and DR 30+ guaranteed</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>Ahrefs organic traffic 5,000+</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>500+ words unique editorial copy</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>Permanent contextual dofollow links</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <a
                  href="#order-brief"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] text-slate-950 hover:from-[#34bbf0] hover:to-[#7dd3fc] text-xs font-black uppercase tracking-wider text-center block transition-all shadow-[0_0_20px_rgba(56,189,248,0.35)]"
                >
                  Select Popular →
                </a>
              </div>
            </div>

            {/* Advanced Package */}
            <div className="rounded-2xl bg-[#06163b]/85 border border-sky-400/35 p-6 sm:p-8 flex flex-col justify-between shadow-lg">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">Advanced</h3>
                  <p className="text-xs text-slate-300 mt-1 min-h-[32px]">
                    Three targeted placements to build sustainable topical authority in competitive industries.
                  </p>
                </div>
                <div className="flex items-baseline justify-center gap-1 pb-4 border-b border-sky-500/20">
                  <span className="text-4xl font-extrabold text-white">${service.startingPrice * 3}</span>
                  <span className="text-xs text-sky-300">/ one-time</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span><strong>3 {service.name} links</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>DA and DR 30+ guaranteed</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>Ahrefs organic traffic 5,000+</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>500+ words unique editorial copy</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>Permanent contextual dofollow links</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <a
                  href="#order-brief"
                  className="w-full py-3 rounded-full border border-sky-400/60 hover:border-sky-300 text-sky-200 hover:text-white hover:bg-sky-500/15 text-xs font-bold uppercase tracking-wider text-center block transition-all"
                >
                  Select Advanced →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Niches We Cover & When Not To Order */}
      <section className="bg-[#020817] py-20 border-b border-sky-500/15">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Niches List */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                Topical Breadth
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Niches we cover.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                We place links across all legitimate business and consumer niches. Casino and iGaming content has dedicated sites and its own pricing tier.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {nichesList.map((niche) => (
                  <span
                    key={niche}
                    className="px-3.5 py-1.5 rounded-full bg-[#06163b]/90 border border-sky-400/35 text-xs text-sky-200 font-medium"
                  >
                    {niche}
                  </span>
                ))}
              </div>
            </div>

            {/* When not to order */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#040f2b] border border-amber-500/30 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                Honest Agency Guidance
              </span>
              <h4 className="text-base font-bold text-white">
                When this service isn&apos;t the right fit:
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Your page has thin content:</strong> Strengthen on-page copy and search intent first. A link pointing to a weak page rarely sustains top rankings.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span><strong>You want dozens of links on a tiny budget:</strong> High-authority manual outreach requires fair publisher compensation. Niche blog comments or off-page packages fit low budgets better.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <FaqAccordion
        faqs={service.faqs}
        title={`${service.name} Questions.`}
        subtitle="Common questions about our link placement criteria, indexation guarantees, anchor text policies, and delivery timelines."
      />

      {/* Related Services Strip */}
      <section className="bg-gradient-to-b from-[#020817] via-[#04133b] to-[#020817] py-16 border-b border-sky-500/15">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base sm:text-lg font-bold text-white">
              Explore other link building services:
            </h3>
            <Link href="/services" className="text-xs font-bold text-sky-400 hover:underline">
              Compare all services →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicesData
              .filter((s) => s.slug !== service.slug)
              .slice(0, 4)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="p-4 rounded-xl bg-[#06163b]/85 border border-sky-400/30 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors block">
                      {s.name}
                    </span>
                    <span className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                      {s.tagline}
                    </span>
                  </div>
                  <div className="pt-3 mt-3 border-t border-sky-500/15 flex items-center justify-between text-[11px]">
                    <span className="text-sky-400 font-bold">From ${s.startingPrice}</span>
                    <span className="text-slate-300 group-hover:text-white flex items-center gap-1 font-semibold">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Embedded Link Building Brief Form & Founder Note */}
      <section id="order-brief" className="bg-[#020817] py-20 lg:py-28 border-b border-sky-500/15">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Who replies */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Who replies</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Direct brief for {service.name.toLowerCase()}.
              </h2>

              {/* Founder Note Card */}
              <div className="p-6 rounded-xl bg-[#06163b]/90 border border-sky-400/40 shadow-[0_0_25px_rgba(56,189,248,0.15)] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1FA9E0] to-[#38bdf8] text-slate-950 font-extrabold text-base flex items-center justify-center font-mono shadow-[0_0_15px_rgba(56,189,248,0.35)]">
                    AQ
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {siteConfig.founder.name}
                    </h3>
                    <span className="text-xs text-sky-300">
                      {siteConfig.founder.role}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  &quot;{siteConfig.founder.bio} Send the page you want to rank with {service.name.toLowerCase()} and we will evaluate which publishers fit your topical authority.&quot;
                </p>

                <div className="pt-2 border-t border-sky-500/20 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-white">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                    <a
                      href={siteConfig.contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-slate-200 hover:text-white"
                    >
                      WhatsApp: {siteConfig.contact.whatsapp}
                    </a>
                  </div>
                </div>
              </div>

              {/* 3 Reassurance Rows */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Reply within 24 hours on business days</strong>
                    <span>A straight answer on which links fit your niche and what they cost.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Full refund if we&apos;re late</strong>
                    <span>Miss the delivery date and you are refunded within 12 to 24 hours.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Every niche except adult</strong>
                    <span>Including technology, finance, crypto, real estate, health, and casino/iGaming.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Embedded Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-[#06163b]/95 border-2 border-sky-400/50 p-6 sm:p-8 shadow-[0_0_35px_rgba(56,189,248,0.22)] backdrop-blur-md">
                <div className="space-y-1 mb-6">
                  <h3 className="text-xl font-bold text-white">Link building brief</h3>
                  <p className="text-xs text-sky-300">
                    Three minutes. No account, no sales call needed.
                  </p>
                </div>

                <BriefForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
