import type { Metadata } from "next";
import { Inter, Saira } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopBanner from "@/components/layout/TopBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const saira = Saira({ 
  subsets: ["latin"], 
  weight: ["600", "700"], 
  style: ["normal", "italic"], 
  variable: "--font-saira",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jmcomfort.com'),
  title: {
    default: "JM Comfort Solutions | Heating, Cooling & Refrigeration",
    template: "%s | JM Comfort Solutions"
  },
  description: "Honest diagnosis. Right-sized solutions. JM Comfort Solutions diagnoses honestly, repairs right, and keeps your home and business running.",
};

import BottomSections from "@/components/layout/BottomSections";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${saira.variable}`} style={{ colorScheme: "dark" }}>
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#05070D" />
      </head>
      <body className="bg-bg-0 text-text-1">
        <a href="#main" className="skip-link">Skip to content</a>
        <TopBanner />
        <Header />
        <main id="main" className="pt-[calc(var(--header-offset)+40px)]">
          {children}
        </main>
        <BottomSections />
        <Footer />
      </body>
    </html>
  );
}
