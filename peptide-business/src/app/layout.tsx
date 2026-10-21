import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { constructMetadata, generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DossierProvider } from "@/lib/dossier-context";
import InquiryDossierDrawer from "@/components/layout/InquiryDossierDrawer";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: "#101513",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground antialiased selection:bg-accent/25 selection:text-foreground">
        <DossierProvider>
          {/* Announcement Bar in normal document flow */}
          <AnnouncementBar />

          {/* Header sits naturally below banner and becomes sticky on scroll */}
          <Header />

          <InquiryDossierDrawer />

          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>

          <Footer />
        </DossierProvider>
      </body>
    </html>
  );
}
