import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:locale/portfolio",
        destination: "/:locale/products",
      },
      {
        source: "/:locale/portfolio/:slug*",
        destination: "/:locale/products/:slug*",
      },
      {
        source: "/portfolio",
        destination: "/fr/products",
      },
      {
        source: "/portfolio/:slug*",
        destination: "/fr/products/:slug*",
      },
    ];
  },
};

export default nextConfig;
