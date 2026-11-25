import type { Metadata } from "next";
import { siteConfig } from "./site-config";

interface MetadataProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image = "/og/default-og.png",
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: MetadataProps = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.brandName}`
    : `${siteConfig.tagline} | ${siteConfig.brandName}`;
  const canonicalUrl = `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
  const ogImage = image.startsWith("http") ? image : `${siteConfig.url}${image}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
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
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.brandName,
      locale: "en_US",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@israinsolutions",
    },
  };
}
