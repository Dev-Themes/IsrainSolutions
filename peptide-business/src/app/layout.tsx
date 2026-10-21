import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { constructMetadata, generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DossierProvider } from "@/lib/dossier-context";
import { ThemeProvider } from "@/lib/theme-context";
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
  themeColor: "#0B1220",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable} dark scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=true;if(s==='dark'){d=true}else if(s==='light'){d=false}else{var m=window.matchMedia('(prefers-color-scheme: light)');d=!(m&&m.matches)}var r=document.documentElement;if(d){r.classList.add('dark');r.classList.remove('light')}else{r.classList.add('light');r.classList.remove('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`,
          }}
        />
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
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
