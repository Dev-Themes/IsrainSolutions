import { MetadataRoute } from "next";
import { CATEGORIES, CITIES, BLOG_ARTICLES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tradeconnect-marketplace.vercel.app";
  const lastModified = new Date("2026-01-01T00:00:00.000Z");

  // Core Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/uk`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/us`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/quote`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/pros`, lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/how-it-works`, lastModified, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/for-pros`, lastModified, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Blog Articles
  const blogRoutes: MetadataRoute.Sitemap = BLOG_ARTICLES.map((art) => ({
    url: `${baseUrl}/blog/${art.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Category Hubs
  const categoryRoutes: MetadataRoute.Sitemap = [];
  for (const country of ["uk", "us"]) {
    for (const cat of CATEGORIES) {
      categoryRoutes.push({
        url: `${baseUrl}/${country}/${cat.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // Programmatic City + Category SEO Pages
  const programmaticCityRoutes: MetadataRoute.Sitemap = [];
  for (const city of CITIES) {
    const countrySlug = city.country.toLowerCase();
    for (const cat of CATEGORIES) {
      programmaticCityRoutes.push({
        url: `${baseUrl}/${countrySlug}/${cat.slug}/${city.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
  }

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...programmaticCityRoutes,
  ];
}
