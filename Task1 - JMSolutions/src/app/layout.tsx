import type { Metadata } from "next";
import { Inter, Saira } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyActionBar from "@/components/StickyActionBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const saira = Saira({ 
  subsets: ["latin"], 
  weight: ["600", "700", "800"], 
  style: ["normal", "italic"], 
  variable: "--font-saira" 
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jmcomfort.com'),
  title: {
    default: "JM Comfort Solutions | Heating, Cooling & Refrigeration",
    template: "%s | JM Comfort Solutions"
  },
  description: "Honest diagnosis. Right-sized solutions. JM Comfort Solutions diagnoses honestly, repairs right, and keeps your home and business running.",
  keywords: ["HVAC", "Heating", "Cooling", "AC Repair", "Commercial Refrigeration", "Furnace Install", "Texas HVAC"],
  authors: [{ name: "JM Comfort Solutions" }],
  creator: "JM Comfort Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jmcomfort.com",
    siteName: "JM Comfort Solutions",
    title: "JM Comfort Solutions | Heating, Cooling & Refrigeration",
    description: "Honest diagnosis. Right-sized solutions. JM Comfort Solutions diagnoses honestly, repairs right, and keeps your home and business running.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JM Comfort Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JM Comfort Solutions | Heating, Cooling & Refrigeration",
    description: "Honest diagnosis. Right-sized solutions. JM Comfort Solutions diagnoses honestly, repairs right, and keeps your home and business running.",
    images: ["/images/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${saira.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen font-sans bg-gray-50 text-ink-700 antialiased selection:bg-cool-500 selection:text-white">
        <div className="mx-auto w-full max-w-[1600px] bg-paper shadow-2xl relative flex flex-col min-h-screen overflow-x-hidden">
          <Header />
          <main className="flex-grow flex flex-col relative w-full">
            {children}
          </main>
          <Footer />
          <StickyActionBar />
        </div>
      </body>
    </html>
  );
}
