import { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Root landing page
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Dedicated Product Detail Routes
  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${siteConfig.url}/products/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...routes, ...productRoutes];
}
