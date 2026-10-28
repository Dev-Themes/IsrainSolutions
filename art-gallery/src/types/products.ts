import { ProjectLocalizedText } from "./portfolio";

export interface ProductImage {
  src: string;
  alt: ProjectLocalizedText & { ro: string };
  caption?: ProjectLocalizedText;
}

export interface ProductCreativeDirection {
  narrative: string;
  palette: {
    name: string;
    hex: string;
    role: string;
  }[];
  typography: string;
  materials: string;
  photography: string;
}

export interface ProductDesignDetails {
  materialsList: string[];
  specifications: string[];
  innovationNote: string;
}

export interface ProductProject {
  id: string;
  slug: string;
  brand: string;
  title: string;
  localizedTitle?: { ro: string; fr: string; en: string };
  localizedCategory?: { ro: string; fr: string; en: string };
  category: string;
  year: number;
  accentColor: string;
  featured: boolean;
  layout: "wide" | "standard";
  coverImage: string;
  galleryImages: string[];
  imageDetails: ProductImage[];
  alt: ProjectLocalizedText & { ro: string };
  tagline: ProjectLocalizedText & { ro: string };
  summary: ProjectLocalizedText & { ro: string };
  concept: {
    ro: { headline: string; paragraphs: string[] };
    fr: {
      headline: string;
      paragraphs: string[];
    };
    en: {
      headline: string;
      paragraphs: string[];
    };
  };
  creativeDirection: {
    ro: ProductCreativeDirection;
    fr: ProductCreativeDirection;
    en: ProductCreativeDirection;
  };
  designDetails: {
    ro: ProductDesignDetails;
    fr: ProductDesignDetails;
    en: ProductDesignDetails;
  };
}
