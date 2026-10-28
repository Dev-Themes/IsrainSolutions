import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import type { Locale, PortfolioProject } from "@/types/portfolio";
import type { ProductProject } from "@/types/products";
import { defaultLocale, locales } from "@/i18n/config";
import { productTitle, productCategory } from "./product-text";

const languageTags = { ro: "ro-RO", fr: "fr-FR", en: "en-US" };
const graphTags = { ro: "ro_RO", fr: "fr_FR", en: "en_US" };

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
  title, description, path = "", locale = defaultLocale, ogImage,
}: PageMetaOptions = {}): Metadata {
  const pagePath = path.split("/").filter(Boolean).join("/");
  const localizedUrl = (language: Locale) => absolute(`/${language}${pagePath ? `/${pagePath}` : ""}`);
  const canonicalUrl = localizedUrl(locale);
  const pageTitle = title
    ? `${title} — ${siteConfig.name}`
    : locale === "ro" ? `${siteConfig.name} — Studio de creație | Direcție artistică și identitate vizuală` : `${siteConfig.name} — ${siteConfig.descriptor} | Art Direction & Visual Identity`;
  const pageDescription = description || siteConfig.description[locale];
  const imageAlt = locale === "ro" ? "PopArt Agency — Studio de creație | Identitate vizuală oficială" : brandImageAlt;

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description: pageDescription,
    applicationName: siteConfig.name,
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: locale === "ro" ? "Artă și design" : "Art and design",
    alternates: {
      canonical: canonicalUrl,
      languages: { ...Object.fromEntries(locales.map(language => [language, localizedUrl(language)])), "x-default": localizedUrl(defaultLocale) },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: graphTags[locale],
      alternateLocale: locales.filter(language => language !== locale).map(language => graphTags[language]),
      type: "website",
      images: [
        { url: brandImage, width: 1200, height: 630, type: "image/png", alt: imageAlt },
        // Keep case-study artwork available, with the supplied brand logo first.
        ...(ogImage ? [{ url: absolute(ogImage), alt: title || siteConfig.name }] : []),
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [{ url: brandImage, alt: imageAlt }],
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

export function generateOrganizationSchema(locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absolute("/#organization"),
    name: siteConfig.name,
    description: siteConfig.description[locale],
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
    inLanguage: locales.map(locale => languageTags[locale]),
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
    inLanguage: languageTags[locale],
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
    name: `${product.brand} — ${productTitle(product, locale)}`,
    headline: product.tagline[locale],
    description: product.summary[locale],
    url: absolute(`/${locale}/products/${product.slug}`),
    inLanguage: languageTags[locale],
    image: absolute(product.coverImage),
    creator: { "@type": "Organization", "@id": absolute("/#organization"), name: siteConfig.name },
    copyrightYear: product.year,
    genre: productCategory(product, locale),
    publisher: { "@type": "Organization", "@id": absolute("/#organization"), name: siteConfig.name, url: siteConfig.url },
  };
}
