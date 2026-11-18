import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/plumber",
        destination: "/uk/plumbing",
        permanent: false,
      },
      {
        source: "/plumbing",
        destination: "/uk/plumbing",
        permanent: false,
      },
      {
        source: "/electrician",
        destination: "/uk/electrical",
        permanent: false,
      },
      {
        source: "/electrical",
        destination: "/uk/electrical",
        permanent: false,
      },
      {
        source: "/boiler",
        destination: "/uk/gas-boiler",
        permanent: false,
      },
      {
        source: "/gas-boiler",
        destination: "/uk/gas-boiler",
        permanent: false,
      },
      {
        source: "/roofing",
        destination: "/uk/roofing",
        permanent: false,
      },
      {
        source: "/roofer",
        destination: "/uk/roofing",
        permanent: false,
      },
      {
        source: "/hvac",
        destination: "/uk/hvac",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
