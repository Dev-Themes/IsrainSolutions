import { Metadata } from "next";
import { Product } from "@/types/product";

export const siteConfig = {
  name: "Peptide Ingredients Lab",
  shortName: "Peptide Lab",
  description: "A refined, catalog-focused showcase of cosmetic peptides, signal peptides, and bio-functional raw materials for professional formulation inquiries.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://peptideshowcase.com",
  ogImage: "/og-image.jpg",
  telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/REPLACE_WITH_ACTUAL_USERNAME",
  telegramHandle: process.env.NEXT_PUBLIC_TELEGRAM_HANDLE || "@PeptideIngredientsLab",
};

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
  canonical,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
} = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — Technical Peptide Ingredients & Inquiry Showcase`;

  const canonicalUrl = canonical
    ? `${siteConfig.url}${canonical}`
    : siteConfig.url;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Technical Peptide Catalog`,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@PeptideLab",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer inquiry",
      url: siteConfig.telegramUrl,
      availableLanguage: ["en"],
    },
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    category: product.category,
    sku: product.id,
    identifier: product.casNumber,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      price: "0",
      description: "Direct batch inquiry on Telegram for pricing & technical specifications",
      url: `${siteConfig.url}/products/${product.slug}`,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}
