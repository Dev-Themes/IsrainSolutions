import { SiteConfig } from "@/types/portfolio";

export const siteConfig: SiteConfig = {
  name: "FORME",
  descriptor: "Studio Créatif",
  description: {
    fr: "FORME est un studio créatif indépendant explorant la direction artistique, l'identité visuelle, la photographie et les récits contemporains sans frontières.",
    en: "FORME is an independent creative studio exploring art direction, visual identity, photography and contemporary visual stories without borders.",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://forme-studio.example",
  email: "hello@forme.example",
  location: "Paris, France",
  collaboration: {
    fr: "Collaborations Internationales",
    en: "Worldwide Collaborations",
  },
  socials: [
    { name: "Instagram", url: "https://instagram.com" },
    { name: "Behance", url: "https://behance.net" },
    { name: "LinkedIn", url: "https://linkedin.com" },
  ],
  navLinks: [
    { key: "work", href: "/work" },
    { key: "about", href: "/about" },
    { key: "contact", href: "/contact" },
  ],
};

export const brandColors = {
  primaryBackground: "#050505",
  pureBlack: "#000000",
  primaryText: "#FFFFFF",
  secondaryText: "#B8B8B8",
  contactBackground: "#292929",
  accent: "#E8D49B",
  subtleBorder: "#424242",
};
