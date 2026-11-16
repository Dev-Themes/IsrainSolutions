import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/lib/auth-context";
import { getSiteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1715" },
  ],
};

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TradeConnect | Verified Local Trade Services (UK & USA)",
    template: "%s | TradeConnect",
  },
  description: siteConfig.description,
  authors: [{ name: "TradeConnect Global" }],
  creator: "TradeConnect",
  publisher: "TradeConnect",
  icons: {
    icon: "/images/brand/logo.jpg",
    shortcut: "/images/brand/logo.jpg",
    apple: "/images/brand/logo.jpg",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-GB": `${siteUrl}/uk`,
      "en-US": `${siteUrl}/us`,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "TradeConnect",
    title: "TradeConnect | Verified Local Trade Services",
    description:
      "Connect with over 8,784+ vetted trade professionals. Fast quote matching, zero obligation, and verified customer reviews.",
    images: [
      {
        url: "/images/brand/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "TradeConnect UK & USA Verified Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TradeConnect | Verified Home Trade Services",
    description:
      "Get free quotes from vetted local plumbers, electricians, roofers, and HVAC contractors.",
    images: ["/images/brand/og-preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${outfit.variable}`}
    >
      <head>
        {/* Pre-paint zero-flash theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] antialiased">
        <AuthProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-white focus:rounded-lg focus:shadow-lg"
          >
            Skip to main content
          </a>
          <div className="flex min-h-screen flex-col">
            <Suspense fallback={<div className="h-16 w-full bg-[var(--surface)] border-b border-[var(--line)]" />}>
              <Header />
            </Suspense>
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
