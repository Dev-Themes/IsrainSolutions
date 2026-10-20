import { Locale, ProjectLocalizedText } from "./portfolio";

export interface ProductImage {
  src: string;
  alt: ProjectLocalizedText;
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
  category: string;
  year: number;
  accentColor: string;
  featured: boolean;
  layout: "wide" | "standard";
  coverImage: string;
  galleryImages: string[];
  imageDetails: ProductImage[];
  alt: ProjectLocalizedText;
  tagline: ProjectLocalizedText;
  summary: ProjectLocalizedText;
  concept: {
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
    fr: ProductCreativeDirection;
    en: ProductCreativeDirection;
  };
  designDetails: {
    fr: ProductDesignDetails;
    en: ProductDesignDetails;
  };
}
