import type { Metadata } from "next";

function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL;
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    if (envUrl && !envUrl.includes("localhost")) {
      return envUrl.replace(/\/$/, "");
    }
    return "https://career-vixa.vercel.app";
  }
  return (envUrl || "http://localhost:3000").replace(/\/$/, "");
}

export const siteConfig = {
  name: "CareerVixa",
  url: getBaseUrl(),
  description: "Practical, warm, and confident career advice, job search strategies, and professional growth guides.",
};

interface SEOResults {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function constructMetadata({
  title,
  description,
  url,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
}: SEOResults): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image || `${siteConfig.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
      locale: "en_US",
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : [],
        section,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || `${siteConfig.url}/twitter-image`],
    },
  };
}
