export interface AminoAcidResidue {
  abbr: string;
  name: string;
  type: "hydrophilic" | "hydrophobic" | "basic" | "acidic" | "aromatic" | "neutral" | "terminal";
  charge?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  inciName?: string;
  casNumber?: string;
  category: string;
  description: string;
  extendedDescription?: string;
  image: string;
  imageAlt: string;
  specifications: Record<string, string>;
  availability?: string;
  featured?: boolean;
  molecularFormula?: string;
  molecularWeight?: string;
  appearance?: string;
  storage?: string;
  suggestedUsage?: string;
  solubility?: string;
  sequence?: string;
  aminoAcids?: AminoAcidResidue[];
  suggestedPh?: string;
  dilutionVehicles?: string[];
  incompatibilities?: string[];
}

export type ProductCategory = 
  | "All Products"
  | "Cosmetic Peptides"
  | "Signal Peptides"
  | "Carrier Peptides"
  | "Ingredient Blends";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface DossierItem {
  product: Product;
  requestedQuantity: string;
  targetVehicle: string;
}
