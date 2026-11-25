export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  tab: "guest-posts" | "links" | "content-pr";
  tagline: string;
  startingPrice: number;
  deliveryTime: string;
  description: string;
  metrics: {
    da: string;
    dr?: string;
    traffic?: string;
    dofollow: boolean;
  };
  features: string[];
  bestFor: string;
}

export const servicesData: ServiceItem[] = [
  // Tab 1: Guest Post & Niche Edit
  {
    id: "niche-guest-posts",
    slug: "niche-guest-posts",
    name: "Niche Guest Posts",
    tab: "guest-posts",
    tagline: "A niche guest post on a real site in your niche, with a contextual dofollow link.",
    startingPrice: 100,
    deliveryTime: "5–10 business days",
    description:
      "Hand-outreach guest posts placed inside original, topical articles on actively vetted publisher websites. We pitch real editors and ensure the target page receives thematic contextual relevance and strong ranking signals.",
    metrics: {
      da: "30+",
      dr: "30+",
      traffic: "5,000+ Ahrefs organic",
      dofollow: true,
    },
    features: [
      "100% relevant niche placement",
      "500+ words human-written original content",
      "Editorial dofollow backlink",
      "Permanent placement guarantee",
      "Full live URL report with metrics",
    ],
    bestFor: "High-value commercial keywords, competitive niches, and long-term brand authority.",
  },
  {
    id: "general-guest-posts",
    slug: "general-guest-posts",
    name: "General Guest Posts",
    tab: "guest-posts",
    tagline: "A 700+ word article on a DA 20+ multi-topic site, with 2 dofollow links in every post.",
    startingPrice: 10,
    deliveryTime: "3–5 business days",
    description:
      "Cost-effective guest posting on general authority blogs and multi-topic magazines. Perfect for establishing initial link equity, anchoring secondary target pages, and diversifying backlink profiles at scale.",
    metrics: {
      da: "20+",
      traffic: "1,000+",
      dofollow: true,
    },
    features: [
      "DA 20+ multi-topic domain",
      "700+ word contextual article",
      "2 dofollow links included per article",
      "Fast indexation turnaround",
      "Live URL confirmation report",
    ],
    bestFor: "Budget-conscious campaigns, tier 2 link building, and anchor text diversification.",
  },
  {
    id: "niche-edits",
    slug: "niche-edits",
    name: "Niche Edits (Curated Links)",
    tab: "guest-posts",
    tagline: "Your link added to an existing, indexed article on a site in your niche.",
    startingPrice: 50,
    deliveryTime: "3–7 business days",
    description:
      "We reach out to webmasters to insert your target URL and contextual anchor text into an established, pre-indexed blog post that already has search engine rankings and accumulated authority.",
    metrics: {
      da: "25+",
      dr: "30+",
      traffic: "2,500+",
      dofollow: true,
    },
    features: [
      "Inserted into aged, indexed articles",
      "Pre-existing page authority and rankings",
      "Topical contextual paragraph insertion",
      "Natural anchor text integration",
      "Verified permanent editorial placement",
    ],
    bestFor: "Immediate link equity transfer without waiting for new articles to age and index.",
  },
  {
    id: "casino-igaming-guest-posts",
    slug: "casino-igaming-guest-posts",
    name: "Casino & iGaming Guest Posts",
    tab: "guest-posts",
    tagline: "Guest posts on sites that accept casino, betting, iGaming and slots content.",
    startingPrice: 30,
    deliveryTime: "5–10 business days",
    description:
      "Specialized outreach for gambling, sports betting, crypto casinos, and iGaming portals. Placed on verified publishers with clean histories that expressly accept gaming content without warning flags.",
    metrics: {
      da: "25+",
      traffic: "3,000+",
      dofollow: true,
    },
    features: [
      "Explicitly accepts casino & betting topics",
      "Tailored gambling & gaming editorial content",
      "Dofollow target anchor insertion",
      "No sponsor disclaimer tags where requested",
      "Direct publisher relationships",
    ],
    bestFor: "iGaming operators, sportsbooks, affiliate reviewers, and casino review sites.",
  },

  // Tab 2: Links
  {
    id: "off-page-seo-packages",
    slug: "off-page-seo-packages",
    name: "Off-Page SEO Packages",
    tab: "links",
    tagline: "Tier 1 and tier 2 structured backlink campaigns for a single target URL.",
    startingPrice: 50,
    deliveryTime: "10–14 business days",
    description:
      "Complete multi-tier off-page SEO packages engineered to power target URLs safely. We combine contextual guest posts at Tier 1 with supporting foundational links at Tier 2 to maximize search signal propagation.",
    metrics: {
      da: "30–50+",
      traffic: "Multi-domain",
      dofollow: true,
    },
    features: [
      "Structured Tier 1 + Tier 2 link architecture",
      "Balanced anchor text distribution plan",
      "Drip-fed indexing over 10–14 days",
      "Comprehensive spreadsheet report with live URLs",
      "Free ranking check review",
    ],
    bestFor: "Landing pages, category pages, or product pages looking for comprehensive push.",
  },
  {
    id: "niche-blog-comments",
    slug: "niche-blog-comments",
    name: "Niche Blog Comments",
    tab: "links",
    tagline: "Dofollow and trusted comment links on DA 30+ sites in your niche.",
    startingPrice: 15,
    deliveryTime: "2–4 business days",
    description:
      "Manual blog commenting on relevant industry publications. Written by native English writers with thoughtful, value-additive commentary to pass moderation and diversify link profiles naturally.",
    metrics: {
      da: "30+",
      dofollow: true,
    },
    features: [
      "Strictly relevant blog topics",
      "Hand-written, meaningful comments",
      "Approved and indexed live links",
      "Natural anchor variations",
      "Full URL confirmation report",
    ],
    bestFor: "Profile diversification, unlinked brand mention support, and natural ratio balancing.",
  },
  {
    id: "pbn-links",
    slug: "pbn-links",
    name: "PBN Backlinks (Aged Domains)",
    tab: "links",
    tagline: "High-authority backlinks from aged, private domains with clean histories.",
    startingPrice: 10,
    deliveryTime: "3–5 business days",
    description:
      "Hosted on aged domains with high trust scores and clean historical Wayback records. We provide transparent risk guidance so clients use PBN assets strategically and safely alongside white-hat outreach.",
    metrics: {
      da: "20–40+",
      dofollow: true,
    },
    features: [
      "Hosted on unique IPs and different DNS providers",
      "Zero footprint server architecture",
      "Clean Wayback Machine history vetted",
      "Contextual in-content placement",
      "Clear risk framing and usage guidance",
    ],
    bestFor: "Testing secondary pages, short-term competitive pushes, and multi-tier campaigns.",
  },
  {
    id: "wikipedia-links",
    slug: "wikipedia-links",
    name: "Wikipedia Citations",
    tab: "links",
    tagline: "Wikipedia citation links for brand authority, trust signals, and referral traffic.",
    startingPrice: 150,
    deliveryTime: "7–14 business days",
    description:
      "Editorial references placed as citations on relevant, active Wikipedia pages following strict neutrality and notability standards. Passes immense trust signals to search engine knowledge graphs.",
    metrics: {
      da: "90+",
      dofollow: false,
    },
    features: [
      "Strict editorial adherence to Wikipedia guidelines",
      "High domain authority citation",
      "Direct brand trust and entity validation",
      "Stable placement with replacement warranty",
      "Permanent citation confirmation report",
    ],
    bestFor: "Entity SEO, brand authority building, and Google Knowledge Graph association.",
  },

  // Tab 3: Content and PR
  {
    id: "press-releases",
    slug: "press-releases",
    name: "Press Release Distribution",
    tab: "content-pr",
    tagline: "Your announcement syndicated on major news and financial publication networks.",
    startingPrice: 100,
    deliveryTime: "3–5 business days",
    description:
      "Full journalistic press release creation and distribution across leading news wires and syndicated media networks. Generates immediate brand visibility, high trust mentions, and hundreds of media pickups.",
    metrics: {
      da: "40–80+",
      dofollow: true,
    },
    features: [
      "Professionally drafted news release",
      "Syndication to 100+ news outlets",
      "Google News indexation inclusion",
      "Inclusion of logo, images, and live links",
      "Comprehensive media pickup report",
    ],
    bestFor: "Company announcements, product launches, brand entity creation, and PR campaigns.",
  },
  {
    id: "seo-content-writing",
    slug: "seo-content-writing",
    name: "SEO Content Writing",
    tab: "content-pr",
    tagline: "Search-optimized, human-written content for guest posts and on-site blogs.",
    startingPrice: 5,
    deliveryTime: "2–4 business days",
    description:
      "Original, keyword-targeted, structured articles crafted specifically for search performance. Written by experienced SEO copywriters to engage human readers and meet modern search engine quality standards.",
    metrics: {
      da: "N/A",
      dofollow: false,
    },
    features: [
      "100% human-written and Copyscape passed",
      "Structured with H2/H3s and keyword placement",
      "Tailored for guest posts or client on-site publishing",
      "Free revisions included",
      "Rapid turnaround",
    ],
    bestFor: "Guest post submissions, on-page blog content, and topic cluster expansion.",
  },
];
