import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TradeConnect | Verified Local Trade Services",
    short_name: "TradeConnect",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f1e9",
    theme_color: "#0e1715",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/images/brand/logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
