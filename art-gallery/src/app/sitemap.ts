import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { productProjects } from "@/data/product-projects";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/products", "/about", "/contact", "/privacy", "/cookies", "/terms",
    ...productProjects.map(product => `/products/${product.slug}`),
  ];
  return routes.flatMap(route => locales.map(locale => ({
    url: `${siteConfig.url}/${locale}${route}`,
    changeFrequency: route === "" || route === "/work" || route === "/products" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/work" || route === "/products" ? .9 : .7,
    alternates: {
      languages: { fr: `${siteConfig.url}/fr${route}`, en: `${siteConfig.url}/en${route}`, "x-default": `${siteConfig.url}/fr${route}` },
    },
  })));
}
