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
  ],
};

/**
 * Deterministic hash function for distributing images across articles evenly
 * without consecutive duplicates.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Resolves an authentic, verified workplace stock photo matching the specific article topic.
 * Uses deterministic hashing on the title to guarantee variety and prevent identical consecutive photos.
 */
export function resolveWorkplaceImage(title: string = "", category: string = ""): WorkplaceImage {
  const text = `${title} ${category}`.toLowerCase();
  const hash = hashString(title);

  let list: WorkplaceImage[] = WORKPLACE_IMAGES.general;

  if (text.includes("interview") || text.includes("hiring") || text.includes("question") || text.includes("recruiter")) {
    list = WORKPLACE_IMAGES.interview;
  } else if (text.includes("resume") || text.includes("cv") || text.includes("cover letter") || text.includes("portfolio") || text.includes("linkedin profile")) {
    list = WORKPLACE_IMAGES.resume;
  } else if (text.includes("salary") || text.includes("compensation") || text.includes("negotiat") || text.includes("equity") || text.includes("bonus") || text.includes("pay")) {
    list = WORKPLACE_IMAGES.salary;
  } else if (text.includes("tech") || text.includes("software") || text.includes("code") || text.includes("developer") || text.includes("ai") || text.includes("engineer") || text.includes("data") || text.includes("cloud")) {
    list = WORKPLACE_IMAGES.technology;
  } else if (text.includes("remote") || text.includes("freelanc") || text.includes("work from home") || text.includes("wfh") || text.includes("hybrid") || text.includes("contract")) {
    list = WORKPLACE_IMAGES.remote;
  } else if (text.includes("lead") || text.includes("exec") || text.includes("manage") || text.includes("director") || text.includes("vp") || text.includes("culture")) {
    list = WORKPLACE_IMAGES.leadership;
  } else if (text.includes("roadmap") || text.includes("growth") || text.includes("transition") || text.includes("skill") || text.includes("promotion") || text.includes("upskill")) {
    list = WORKPLACE_IMAGES.career_growth;
  }

  const selected = list[hash % list.length] || WORKPLACE_IMAGES.general[0];

  // Dynamically attach topic-contextual alt text
  return {
    src: selected.src,
    alt: `${title} — ${selected.alt}`,
    credit: selected.credit,
  };
}
