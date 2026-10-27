import { SiteConfig } from "@/types/portfolio";

export const siteConfig: SiteConfig = {
  name: "PopArt Agency",
  descriptor: "Studio Créatif",
  description: {
    fr: "PopArt Agency est un studio créatif indépendant explorant la direction artistique, l'identité visuelle, la photographie et les récits contemporains sans frontières.",
    en: "PopArt Agency is an independent creative studio exploring art direction, visual identity, photography and contemporary visual stories without borders.",
  },
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://israin-solutions.vercel.app").origin,
  email: "hello@popart.example",
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
  accent: "#F87966",
  subtleBorder: "#424242",
  // Artistic Multicolor Accent Tokens (80/20 balance)
  electricCoral: "#F87966",
  vibrantYellow: "#1440FF",
  electricBlue: "#1440FF",
  mintGreen: "#FF9B70",
  softLavender: "#8F2F45",
  charcoal: "#292929",
};
