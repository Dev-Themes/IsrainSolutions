export type Locale = "fr" | "en";

export interface ProjectLocalizedText {
  fr: string;
  en: string;
}

export interface ProjectDetails {
  fr: {
    concept: string;
    artDirection: string;
    execution: string;
  };
  en: {
    concept: string;
    artDirection: string;
    execution: string;
  };
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  year: number;
  description: ProjectLocalizedText;
  caption?: ProjectLocalizedText;
  details: ProjectDetails;
  coverImage: string;
  galleryImages: string[];
  featured: boolean;
  layout: "standard" | "wide";
  alt: ProjectLocalizedText;
  tagline?: ProjectLocalizedText;
  accentColor?: string;
}

export interface SiteConfig {
  name: string;
  descriptor: string;
  description: ProjectLocalizedText;
  url: string;
  email: string;
  location: string;
  collaboration: ProjectLocalizedText;
  socials: {
    name: string;
    url: string;
  }[];
  navLinks: {
    key: string;
    href: string;
  }[];
}
