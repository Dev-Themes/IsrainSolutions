import settings from "@/content/site.config.json";

export const siteConfig = {
  ...settings,
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL || settings.url).origin,
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
