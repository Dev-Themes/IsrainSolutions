import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { projects } from "@/data/projects";
import { productProjects } from "@/data/product-projects";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date();

  const staticRoutes = ["", "/work", "/products", "/about", "/contact", "/privacy", "/cookies", "/terms"];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static routes in all locales
  for (const locale of locales) {
    for (const route of staticRoutes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: currentDate,
        changeFrequency: route === "" || route === "/work" || route === "/products" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route === "/work" || route === "/products" ? 0.9 : 0.7,
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

  // Dynamic product portfolio routes in all locales
  for (const product of productProjects) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/products/${product.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.85,
      });
    }
  }

  return sitemapEntries;
}
