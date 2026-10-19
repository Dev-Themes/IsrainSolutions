import { Metadata } from "next";
import { siteConfig } from "./site-config";
import { Locale, PortfolioProject } from "@/types/portfolio";

interface PageMetaOptions {
  title?: string;
  description?: string;
  path?: string;
  locale?: Locale;
  ogImage?: string;
}

export function constructMetadata({
  title,
  description,
  path = "",
  locale = "fr",
  ogImage,
}: PageMetaOptions = {}): Metadata {
  const siteUrl = siteConfig.url;
  const canonicalUrl = `${siteUrl}/${locale}${path ? `/${path}` : ""}`;
  const otherLocale = locale === "fr" ? "en" : "fr";

  const pageTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.descriptor} | Art Direction & Visual Identity`;

  const pageDescription = description || siteConfig.description[locale];
  const image = ogImage || `${siteUrl}/opengraph-image`;

  return {
    metadataBase: new URL(siteUrl),
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: `${siteUrl}/fr${path ? `/${path}` : ""}`,
        en: `${siteUrl}/en${path ? `/${path}` : ""}`,
        "x-default": `${siteUrl}/fr${path ? `/${path}` : ""}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.descriptor}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
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
    description: siteConfig.description.en,
    url: siteConfig.url,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    sameAs: siteConfig.socials.map((s) => s.url),
  };
}

export function generateCreativeWorkSchema(project: PortfolioProject, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.description[locale],
    image: project.coverImage,
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    copyrightYear: project.year,
    genre: project.category,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
