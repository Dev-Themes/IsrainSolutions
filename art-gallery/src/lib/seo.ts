import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import type { Locale, PortfolioProject } from "@/types/portfolio";
import type { ProductProject } from "@/types/products";

interface PageMetaOptions {
  title?: string;
  description?: string;
  path?: string;
  locale?: Locale;
  ogImage?: string;
}

const absolute = (path: string) => new URL(path, `${siteConfig.url}/`).href;
const brandImage = absolute("/opengraph-image");
const brandImageAlt = "PopArt Agency — Creative Studio | Official brand identity";

export function constructMetadata({
  title, description, path = "", locale = "fr", ogImage,
}: PageMetaOptions = {}): Metadata {
  const pagePath = path.split("/").filter(Boolean).join("/");
  const localizedUrl = (language: Locale) => absolute(`/${language}${pagePath ? `/${pagePath}` : ""}`);
  const canonicalUrl = localizedUrl(locale);
  const pageTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.descriptor} | Art Direction & Visual Identity`;
  const pageDescription = description || siteConfig.description[locale];

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description: pageDescription,
    applicationName: siteConfig.name,
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "Art and design",
    alternates: {
      canonical: canonicalUrl,
      languages: { fr: localizedUrl("fr"), en: localizedUrl("en"), "x-default": localizedUrl("fr") },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      type: "website",
      images: [
        { url: brandImage, width: 1200, height: 630, type: "image/png", alt: brandImageAlt },
        // Keep case-study artwork available, with the supplied brand logo first.
        ...(ogImage ? [{ url: absolute(ogImage), alt: title || siteConfig.name }] : []),
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [{ url: brandImage, alt: brandImageAlt }],
    },
    icons: {
      icon: [{ url: "/brand/final-icon-32.png", sizes: "32x32", type: "image/png" }],
      apple: [{ url: "/brand/final-icon-180.png", sizes: "180x180", type: "image/png" }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absolute("/#organization"),
    name: siteConfig.name,
    description: siteConfig.description.en,
    url: siteConfig.url,
    logo: { "@type": "ImageObject", url: absolute("/brand/final-logo.png"), width: 1060, height: 803 },
    // Demo email addresses and generic social homepages are not business identities.
    ...(siteConfig.email.endsWith(".example") ? {} : { email: siteConfig.email }),
    address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
    sameAs: siteConfig.socials.filter(s => new URL(s.url).pathname.replaceAll("/", "").length > 0).map(s => s.url),
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absolute("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: ["fr-FR", "en-US"],
    publisher: { "@id": absolute("/#organization") },
  };
}

export function generateCreativeWorkSchema(project: PortfolioProject, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.description[locale],
    url: absolute(`/${locale}/work/${project.slug}`),
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    image: absolute(project.coverImage),
    creator: { "@type": "Organization", "@id": absolute("/#organization"), name: siteConfig.name },
    copyrightYear: project.year,
    genre: project.category,
    publisher: { "@type": "Organization", "@id": absolute("/#organization"), name: siteConfig.name, url: siteConfig.url },
  };
}

export function generateProductCreativeWorkSchema(product: ProductProject, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${product.brand} — ${product.title}`,
    headline: product.tagline[locale],
    description: product.summary[locale],
    url: absolute(`/${locale}/products/${product.slug}`),
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    image: absolute(product.coverImage),
    creator: { "@type": "Organization", "@id": absolute("/#organization"), name: siteConfig.name },
    copyrightYear: product.year,
    genre: product.category,
    publisher: { "@type": "Organization", "@id": absolute("/#organization"), name: siteConfig.name, url: siteConfig.url },
  };
}
