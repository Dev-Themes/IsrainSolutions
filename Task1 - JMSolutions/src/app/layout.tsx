import type { Metadata } from "next";
import { DM_Sans, Saira_Condensed, Saira } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const sairaCond = Saira_Condensed({ 
  subsets: ["latin"], 
  weight: ["600", "700"], 
  variable: "--font-saira-condensed",
  display: "swap"
});
const saira = Saira({ 
  subsets: ["latin"], 
  weight: ["600", "700"], 
  variable: "--font-saira",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jmcomfort.com'),
  title: {
    default: "JM Comfort Solutions | Heating, Cooling & Refrigeration",
    template: "%s | JM Comfort Solutions"
  },
  description: "Honest diagnosis. Right-sized solutions. JM Comfort Solutions provides expert residential and commercial HVAC and refrigeration services in the Greater Houston Area with 24/7 emergency response.",
  keywords: ["HVAC", "Air Conditioning Repair", "Furnace Repair", "Commercial Refrigeration", "Greater Houston Area", "JM Comfort Solutions", "Heating & Cooling", "Emergency HVAC"],
  authors: [{ name: "JM Comfort Solutions" }],
  creator: "JM Comfort Solutions",
  publisher: "JM Comfort Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jmcomfort.com",
    title: "JM Comfort Solutions | Heating, Cooling & Refrigeration",
    description: "Honest diagnosis. Right-sized solutions. JM Comfort Solutions provides expert residential and commercial HVAC and refrigeration services in the Greater Houston Area.",
    siteName: "JM Comfort Solutions",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "JM Comfort Solutions Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JM Comfort Solutions | Heating, Cooling & Refrigeration",
    description: "Expert residential and commercial HVAC and refrigeration services in the Greater Houston Area.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${dmSans.variable} ${sairaCond.variable} ${saira.variable}`} style={{ colorScheme: "dark" }}>
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#050D1A" />
      </head>
      <body className="bg-bg-0 text-fg-1">
        <a href="#main" className="absolute -top-[100px] left-0 z-[100] bg-card text-fg-0 p-3 focus:top-0 transition-all">Skip to content</a>
        <Header />
        <main id="main" style={{ paddingTop: '1px' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
