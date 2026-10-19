import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { projects } from "@/data/projects";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date();

  const staticRoutes = ["", "/work", "/about", "/contact", "/privacy", "/cookies", "/terms"];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static routes in all locales
  for (const locale of locales) {
    for (const route of staticRoutes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: currentDate,
        changeFrequency: route === "" || route === "/work" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route === "/work" ? 0.9 : 0.7,
      });
    }
  }

  // Dynamic project routes in all locales
  for (const project of projects) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/work/${project.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return sitemapEntries;
}
