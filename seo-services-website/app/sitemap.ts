import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/services/niche-guest-posts",
    "/services/general-guest-posts",
    "/services/niche-edits",
    "/services/casino-igaming-guest-posts",
    "/services/off-page-seo-packages",
    "/services/niche-blog-comments",
    "/services/pbn-links",
    "/services/wikipedia-links",
    "/services/press-releases",
    "/services/seo-content-writing",
    "/guest-posts",
    "/guest-post-sites",
    "/link-insertion-sites",
    "/contact",
    "/contact-us",
    "/order",
    "/shop",
    "/privacy-policy",
    "/privacy-policy-2",
    "/terms",
    "/pbn",
    "/pbn/high-dr-da-backlinks",
    "/pbn/casino-igaming-backlinks",
    "/pbn/sidebar-blogroll-backlinks",
    "/niche-guest-post",
    "/general-guest-post",
    "/niche-edit",
    "/casino-guest-posts",
    "/off-page-seo-backlinks-service",
    "/niche-blog-comments",
    "/wikipedia-links",
    "/press-release",
    "/seo-content-writing-services",
  ];

  const allRoutes = Array.from(new Set(staticRoutes));
  const now = new Date();

  return allRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : route.startsWith("/services") ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.7,
  }));
}
