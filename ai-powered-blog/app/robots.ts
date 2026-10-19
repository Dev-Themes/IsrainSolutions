import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/dashboard/",
        "/api/",
        "/reset-password",
        "/verify-email",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
