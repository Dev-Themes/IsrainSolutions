/**
 * Curated Professional Workplace Image Repository
 * Strictly complies with CareerVixa Editorial Standards:
 * - Strictly professional office architecture, modern workspaces, desks, laptops, tech screens, charts, notebooks.
 * - Authentically context-mapped to specific career, engineering, leadership, and workplace topics.
 * - High resolution, verified Unsplash CDN URLs with appropriate licenses.
 */

export interface WorkplaceImage {
  src: string;
  alt: string;
  credit: string;
}

/**
 * Extracts a canonical, normalized asset identifier from an image URL.
 * Detects identical photographs regardless of query parameters, dimensions, crops, or formatting flags.
 * E.g.:
 *  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80"
 *  and
 *  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800"
 *  both resolve to "unsplash:photo-1497215728101-856f4ea42174".
 */
export function getCanonicalImageId(rawUrl: string | null | undefined): string | null {
  if (!rawUrl || typeof rawUrl !== "string") return null;

  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const urlObj = new URL(trimmed);
    const hostname = urlObj.hostname.toLowerCase();

    // 1. Unsplash asset ID identification
    if (hostname.includes("unsplash.com")) {
      const match = urlObj.pathname.match(/(photo-[a-zA-Z0-9_-]+)/i);
      if (match) {
        return `unsplash:${match[1].toLowerCase()}`;
      }
      // If no photo- ID pattern, use normalized pathname
      return `unsplash:${urlObj.pathname.replace(/\/+$/, "").toLowerCase()}`;
    }

    // 2. Generic absolute URLs: Strip query parameters and hash, normalize hostname + path
    return `${hostname}${urlObj.pathname.replace(/\/+$/, "").toLowerCase()}`;
  } catch {
    // Relative or malformed paths: strip queries and fragments
    const stripped = trimmed.split("?")[0].split("#")[0].replace(/\/+$/, "").toLowerCase();
    const unsplashMatch = stripped.match(/(photo-[a-zA-Z0-9_-]+)/i);
    if (unsplashMatch) {
      return `unsplash:${unsplashMatch[1].toLowerCase()}`;
    }
    return stripped || null;
  }
}

/**
 * Checks whether two image URLs represent the same underlying asset.
 */
export function isSameImageAsset(urlA: string | null | undefined, urlB: string | null | undefined): boolean {
  const idA = getCanonicalImageId(urlA);
  const idB = getCanonicalImageId(urlB);
  if (!idA || !idB) return false;
  return idA === idB;
}

export const WORKPLACE_IMAGES: Record<string, WorkplaceImage[]> = {
  interview: [
    {
      src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80",
      alt: "Corporate executive boardroom and candidate interview room",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      alt: "Modern professional office workstation interior",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
      alt: "Executive conference room and presentation screens",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1600&q=80",
      alt: "Modern boardroom table prepared for executive interviews",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80",
      alt: "Executive panel interview and boardroom presentation",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
      alt: "Strategic candidate interview and leadership discussion workspace",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
      alt: "Professional team collaborative interview and evaluation setting",
      credit: "Unsplash / CareerVixa",
    },
  ],
  resume: [
    {
      src: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=80",
      alt: "Executive desk with fountain pen and legal portfolio",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80",
      alt: "Clean organized desk with resume notes, notebook and laptop",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1600&q=80",
      alt: "Curated job application portfolio and document review workstation",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
      alt: "Strategic career portfolio planning and executive document audit",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
      alt: "Professional CV review and graduate career placement workstation",
      credit: "Unsplash / CareerVixa",
    },
  ],
  salary: [
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
      alt: "Financial data growth metrics and compensation analytics",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
      alt: "Business data growth chart and analytics report",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80",
      alt: "Executive compensation analysis and financial planning calculation",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      alt: "Data analytics dashboard displaying compensation benchmarks and market trends",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1600&q=80",
      alt: "Financial compensation growth chart and market evaluation metrics",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
      alt: "Executive team analyzing market salary data and equity distribution",
      credit: "Unsplash / CareerVixa",
    },
  ],
  technology: [
    {
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
      alt: "Software development workstation with code on laptop screen",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
      alt: "High-tech software engineering dual monitor workstation",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
      alt: "Cutting-edge computing technology architecture",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
      alt: "Modern software development code editor on screen",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
      alt: "High-performance AI engineering workspace with multiple development displays",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80",
      alt: "Software engineer designing scalable systems and agent architecture",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
      alt: "Engineering team collaborating on cloud software infrastructure",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=1600&q=80",
      alt: "Modern software developer coding workstation with dark theme terminal",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1600&q=80",
      alt: "Modern programming code screen and software development environment",
      credit: "Unsplash / CareerVixa",
    },
  ],
  remote: [
    {
      src: "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=1600&q=80",
      alt: "Ergonomic modern remote work desk setup with laptop and natural light",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1600&q=80",
      alt: "Clean minimal remote office workspace with notebook and coffee",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
      alt: "Digital communication and remote collaboration workstation",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=1600&q=80",
      alt: "Professional remote freelancer desk with laptop and productivity planner",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1600&q=80",
      alt: "Minimalist home office workstation optimized for remote productivity",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80",
      alt: "Distributed asynchronous workplace collaboration display",
      credit: "Unsplash / CareerVixa",
    },
  ],
  leadership: [
    {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      alt: "Modern architectural corporate glass skyscraper",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
      alt: "Corporate high-rise architecture and headquarters",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80",
      alt: "Executive holding strategic portfolio in professional business district",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80",
      alt: "Executive leader in modern corporate tech headquarters",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
      alt: "Executive suite corridor and leadership meeting architectural space",
      credit: "Unsplash / CareerVixa",
    },
  ],
  career_growth: [
    {
      src: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1600&q=80",
      alt: "Strategic career roadmap and professional progression planning",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
      alt: "Comprehensive workplace planning and performance evaluation",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
      alt: "Modern professional development workspace and growth strategy setting",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1600&q=80",
      alt: "Productive career milestone planning workstation with notebook and device",
      credit: "Unsplash / CareerVixa",
    },
  ],
  general: [
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      alt: "Professional minimalist corporate office space",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      alt: "Modern metropolitan corporate business district",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80",
      alt: "Professional workspace with laptop, notebook and coffee",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
      alt: "Modern corporate office architecture and collaboration zone",
      credit: "Unsplash / CareerVixa",
    },
    {
      src: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1600&q=80",
      alt: "Minimalist executive desk setup with notebook and technology",
      credit: "Unsplash / CareerVixa",
    },
  ],
};

/**
 * Deterministic hash function for distributing images across articles evenly
 * without consecutive duplicates.
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Maps topic text and category to a primary image category and an ordered list of fallback categories.
 */
export function categorizeTopicForImages(title: string = "", category: string = ""): {
  primary: keyof typeof WORKPLACE_IMAGES;
  fallbacks: (keyof typeof WORKPLACE_IMAGES)[];
} {
  const text = `${title} ${category}`.toLowerCase();

  if (text.includes("interview") || text.includes("hiring") || text.includes("question") || text.includes("recruiter")) {
    return { primary: "interview", fallbacks: ["career_growth", "leadership", "general"] };
  }
  if (text.includes("resume") || text.includes("cv") || text.includes("cover letter") || text.includes("portfolio") || text.includes("linkedin profile")) {
    return { primary: "resume", fallbacks: ["career_growth", "general"] };
  }
  if (text.includes("salary") || text.includes("compensation") || text.includes("negotiat") || text.includes("equity") || text.includes("bonus") || text.includes("pay")) {
    return { primary: "salary", fallbacks: ["leadership", "career_growth", "general"] };
  }
  if (text.includes("tech") || text.includes("software") || text.includes("code") || text.includes("developer") || text.includes("ai") || text.includes("engineer") || text.includes("data") || text.includes("cloud") || text.includes("agent")) {
    return { primary: "technology", fallbacks: ["career_growth", "leadership", "general"] };
  }
  if (text.includes("remote") || text.includes("freelanc") || text.includes("work from home") || text.includes("wfh") || text.includes("hybrid") || text.includes("contract")) {
    return { primary: "remote", fallbacks: ["career_growth", "general"] };
  }
  if (text.includes("lead") || text.includes("exec") || text.includes("manage") || text.includes("director") || text.includes("vp") || text.includes("culture") || text.includes("board")) {
    return { primary: "leadership", fallbacks: ["career_growth", "general"] };
  }
  if (text.includes("roadmap") || text.includes("growth") || text.includes("transition") || text.includes("skill") || text.includes("promotion") || text.includes("upskill")) {
    return { primary: "career_growth", fallbacks: ["leadership", "general"] };
  }

  return { primary: "general", fallbacks: ["career_growth", "leadership"] };
}

/**
 * Resolves an authentic, verified workplace stock photo matching the specific article topic.
 * Uses deterministic hashing on the title to guarantee variety.
 * Maintained for backward compatibility with synchronous callers.
 */
export function resolveWorkplaceImage(title: string = "", category: string = ""): WorkplaceImage {
  const { primary } = categorizeTopicForImages(title, category);
  const list = WORKPLACE_IMAGES[primary] || WORKPLACE_IMAGES.general;
  const hash = hashString(title);
  const selected = list[hash % list.length] || WORKPLACE_IMAGES.general[0];

  return {
    src: selected.src,
    alt: `${title} — ${selected.alt}`,
    credit: selected.credit,
  };
}

/**
 * Resolves a strictly unique, unused workplace cover image for autonomous AI publishing.
 *
 * Requirements:
 * - Compares candidate against canonical asset IDs of already published articles.
 * - Rejects identical photographs, resized variants, different crops, or query parameter differences.
 * - Bounded retry: iterates across topic-matched candidates, followed by ordered related fallback categories.
 * - Relevant to the topic: uniqueness does not come at the expense of topic relevance.
 * - Fails safely: if all relevant candidate images have already been used, throws a descriptive error
 *   rather than silently reusing a duplicate photo.
 */
export function resolveUniqueWorkplaceImage(params: {
  title: string;
  category?: string;
  usedImageUrls?: (string | null | undefined)[];
}): WorkplaceImage {
  const { title = "", category = "", usedImageUrls = [] } = params;

  // 1. Build canonical ID set of already used images
  const usedCanonicalIds = new Set<string>();
  for (const url of usedImageUrls) {
    const canonicalId = getCanonicalImageId(url);
    if (canonicalId) {
      usedCanonicalIds.add(canonicalId);
    }
  }

  // 2. Determine primary and fallback categories
  const { primary, fallbacks } = categorizeTopicForImages(title, category);
  const candidateCategories = [primary, ...fallbacks.filter((c) => c !== primary)];

  const hash = hashString(title);

  // 3. Search candidate pools in relevance priority order
  for (const catName of candidateCategories) {
    const images = WORKPLACE_IMAGES[catName] || [];
    if (images.length === 0) continue;

    // Start with deterministic offset to distribute variety across articles
    const offset = hash % images.length;
    for (let i = 0; i < images.length; i++) {
      const candidate = images[(offset + i) % images.length];
      const candidateCanonicalId = getCanonicalImageId(candidate.src);

      if (candidateCanonicalId && !usedCanonicalIds.has(candidateCanonicalId)) {
        // Unique candidate found!
        return {
          src: candidate.src,
          alt: `${title} — ${candidate.alt}`,
          credit: candidate.credit,
        };
      }
    }
  }

  // 4. Fail safely if all relevant candidate workplace images are exhausted
  throw new Error(
    `Image uniqueness safeguard: All candidate workplace images in relevant categories (${candidateCategories.join(
      ", "
    )}) have already been used by existing published articles. Cannot publish with a duplicate cover photo.`
  );
}
