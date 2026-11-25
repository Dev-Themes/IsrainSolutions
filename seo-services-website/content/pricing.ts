export interface GuestPostPackage {
  id: string;
  name: string;
  price: number;
  isPopular?: boolean;
  tagline: string;
  linksCount: number;
  siteQuality: string;
  traffic: string;
  content: string;
  placement: string;
  ctaText: string;
}

export const guestPostPackages: GuestPostPackage[] = [
  {
    id: "basic",
    name: "Basic",
    price: 100,
    isPopular: false,
    tagline: "One link to test us or support a new page.",
    linksCount: 1,
    siteQuality: "DA and DR 30+",
    traffic: "Ahrefs traffic 5k+",
    content: "500+ words unique content",
    placement: "Dofollow placement",
    ctaText: "Order Basic",
  },
  {
    id: "premium",
    name: "Premium",
    price: 200,
    isPopular: true,
    tagline: "Two links for a page you're pushing up the rankings.",
    linksCount: 2,
    siteQuality: "DA and DR 30+",
    traffic: "Ahrefs traffic 5k+",
    content: "500+ words unique content",
    placement: "Dofollow placement",
    ctaText: "Order Premium",
  },
  {
    id: "advanced",
    name: "Advanced",
    price: 300,
    isPopular: false,
    tagline: "Three links for competitive keywords.",
    linksCount: 3,
    siteQuality: "DA and DR 30+",
    traffic: "Ahrefs traffic 5k+",
    content: "500+ words unique content",
    placement: "Dofollow placement",
    ctaText: "Order Advanced",
  },
];

export const publisherSamples = [
  { name: "MSN", category: "News & Tech", da: 92, dr: 94 },
  { name: "Business Insider Africa", category: "Business & Finance", da: 84, dr: 87 },
  { name: "Markets Insider", category: "Finance & Investing", da: 89, dr: 90 },
  { name: "The Independent", category: "Global News", da: 94, dr: 93 },
  { name: "1883 Magazine", category: "Culture & Lifestyle", da: 58, dr: 64 },
  { name: "The Signal", category: "Regional & Business", da: 62, dr: 66 },
  { name: "UrbanMatter", category: "City & Lifestyle", da: 65, dr: 68 },
  { name: "Trending US", category: "Trends & Media", da: 54, dr: 59 },
  { name: "The Source", category: "Entertainment & Culture", da: 74, dr: 76 },
  { name: "Daily Trust", category: "International News", da: 77, dr: 79 },
  { name: "News Ghana", category: "Current Affairs", da: 72, dr: 75 },
];
