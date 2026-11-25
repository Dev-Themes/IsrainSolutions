import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#020817",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.tagline} | ${siteConfig.brandName}`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/brand/israin-icon.png",
    apple: "/brand/israin-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    legalName: siteConfig.brandName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/israin-wordmark-1024x244.webp`,
    image: `${siteConfig.url}/brand/israin-wordmark.webp`,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.parentCompany.address.street,
      addressLocality: siteConfig.parentCompany.address.city,
      addressRegion: siteConfig.parentCompany.address.region,
      postalCode: siteConfig.parentCompany.address.postalCode,
      addressCountry: siteConfig.parentCompany.address.country,
    },
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.parentCompany.name,
      url: siteConfig.parentCompany.url,
    },
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.role,
    },
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body className="min-h-dvh flex flex-col bg-[#020817] text-[#cbd5e1] selection:bg-[#38bdf8]/30 selection:text-white">
        {/* Skip to Content for WCAG 2.2 accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#1FA9E0] text-black font-bold rounded-md shadow-lg"
        >
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
