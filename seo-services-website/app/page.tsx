import React from "react";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { StatStrip } from "@/components/sections/StatStrip";
import { PublisherMarquee } from "@/components/sections/PublisherMarquee";
import { ServiceTabs } from "@/components/sections/ServiceTabs";
import { BacklinksInSeo } from "@/components/sections/BacklinksInSeo";
import { AiSearchSection } from "@/components/sections/AiSearchSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PricingSection } from "@/components/sections/PricingSection";
import { OrderInclusions } from "@/components/sections/OrderInclusions";
import { ContactBriefSection } from "@/components/sections/ContactBriefSection";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const homeFaqs = [
  {
    question: "Which link building service should I order first?",
    answer:
      "Most clients start with a Niche Guest Post or Niche Edit. If you have an established page that already ranks on page 2 or 3 of Google, a Niche Edit in an already-indexed, ranking article gives fast relevance. If you are ranking a newer page or need fresh topical authority, Niche Guest Posts are ideal. You can also send your URL on WhatsApp for a personalized recommendation.",
  },
  {
    question: "Are all backlinks permanent and contextual dofollow?",
    answer:
      "Yes. Every link we secure is permanently placed inside the editorial body copy of a real website. We verify dofollow attribution on live delivery. If a link drops or the article is removed within 12 months, we replace it free of charge on an equal or higher authority publication.",
  },
  {
    question: "Do you have guest posts for casino, betting, or iGaming sites?",
    answer:
      "Yes. We maintain a vetted list of publishers that explicitly accept casino, sports betting, crypto, and iGaming content. Because general mainstream sites often restrict gambling content, we price casino guest posts separately starting from $30.",
  },
  {
    question: "Will these backlinks help my domain show up in ChatGPT and Google AI Overviews?",
    answer:
      "Generative AI engines (ChatGPT, Perplexity, Gemini, Google AI Overviews) synthesize answers by indexing and citing credible, high-authority web publications. Having contextual brand mentions and editorial links across reputable industry sites provides the entity proof AI engines require to select your brand as a source.",
  },
  {
    question: "What happens if you miss the agreed delivery date?",
    answer:
      "We offer a 100% money-back refund guarantee. If an order cannot be finalized within 12 to 24 hours of the agreed delivery date, you receive a full refund promptly without lengthy disputes.",
  },
  {
    question: "Can I choose my target keywords and anchor text?",
    answer:
      "Yes. You specify the target URLs and preferred anchor text. Our team reviews your anchor distribution to ensure natural variety (branded, topical partial match, and exact match) so your backlink profile remains compliant with Google Search essentials.",
  },
];

export const metadata = buildMetadata({
  title: "Link Building Services on Real Websites in Your Niche",
  description:
    "Manual outreach guest posts, curated niche edits, and off-page SEO packages on DA 30+ sites with 5k+ traffic. Live URL reporting on every order.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Stats Strip */}
      <StatStrip />

      {/* 3. Publisher Marquee */}
      <PublisherMarquee />

      {/* 4. Link Building Services with Tabs */}
      <ServiceTabs />

      {/* 5. Backlinks in SEO */}
      <BacklinksInSeo />

      {/* 6. AI Search: AEO & GEO */}
      <AiSearchSection />

      {/* 7. How It Works (01-04 Process) */}
      <HowItWorks />

      {/* 8. Guest Post Packages (Pricing) */}
      <PricingSection />

      {/* 9. Order Inclusions */}
      <OrderInclusions />

      {/* 10. Frequently Asked Questions Accordion */}
      <FaqAccordion
        faqs={homeFaqs}
        title="Frequently asked questions."
        subtitle="Common questions about link building methods, turnaround times, anchor safety, and refund policies."
      />

      {/* 11. Contact & Brief Form */}
      <ContactBriefSection />
    </div>
  );
}
