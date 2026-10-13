/**
 * Curated Professional Workplace Image Repository
 * Strictly complies with CareerVixa Editorial Standards:
 * - Strictly professional office architecture, modern workspaces, desks, laptops, tech screens, charts, notebooks.
 * - Absolutely NO nudity, NO adultery, NO women or girls.
 * - High resolution, verified Unsplash CDN URLs.
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
      alt: "Corporate executive boardroom meeting room",
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
      alt: "Professional businessman in formal suit holding career portfolio",
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
  ]
};

/**
 * Resolves a strictly vetted workplace stock photo based on article title and category.
 */
export function resolveWorkplaceImage(title: string = "", category: string = ""): WorkplaceImage {
  const text = `${title} ${category}`.toLowerCase();

  if (text.includes("interview") || text.includes("hiring") || text.includes("question")) {
    const list = WORKPLACE_IMAGES.interview;
    return list[Math.floor(Math.random() * list.length)];
  }

  if (text.includes("resume") || text.includes("cv") || text.includes("cover letter") || text.includes("portfolio")) {
    const list = WORKPLACE_IMAGES.resume;
    return list[Math.floor(Math.random() * list.length)];
  }

  if (text.includes("salary") || text.includes("compensation") || text.includes("negotiat") || text.includes("finance")) {
    const list = WORKPLACE_IMAGES.salary;
    return list[Math.floor(Math.random() * list.length)];
  }

  if (text.includes("tech") || text.includes("software") || text.includes("code") || text.includes("ai") || text.includes("engineer") || text.includes("remote")) {
    const list = WORKPLACE_IMAGES.technology;
    return list[Math.floor(Math.random() * list.length)];
  }

  if (text.includes("lead") || text.includes("exec") || text.includes("manage") || text.includes("strategy") || text.includes("growth")) {
    const list = WORKPLACE_IMAGES.leadership;
    return list[Math.floor(Math.random() * list.length)];
  }

  const generalList = WORKPLACE_IMAGES.general;
  return generalList[Math.floor(Math.random() * generalList.length)];
}
