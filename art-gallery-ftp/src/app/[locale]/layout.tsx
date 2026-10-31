import { ui } from "@/i18n/ui";
import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { defaultLocale, locales, isValidLocale } from "@/i18n/config";
import { Locale } from "@/types/portfolio";
import { constructMetadata, generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";
import "@/app/globals.css";
import { SitePreferences } from "@/components/providers/SitePreferences";

const GeistSans = localFont({
  src: "../../fonts/Geist-Romanian-Variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-geist-sans",
  display: "swap",
});

const GeistMono = localFont({
  src: "../../fonts/GeistMono-Romanian-Variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-geist-mono",
  preload: false,
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  return constructMetadata({ locale: validLocale });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  const siteSchemas = [generateOrganizationSchema(validLocale), generateWebsiteSchema()];

  return (
    <html
      lang={validLocale}
      data-theme="light"
      className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#fbfcfd" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchemas).replace(/</g, "\\u003c") }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col font-sans overflow-x-hidden"
      >
        <SitePreferences>
        <a className="skip-link" href="#main-content">{ui(validLocale, "Aller au contenu", "Skip to content")}</a>
        <Header locale={validLocale} />
        <main id="main-content" tabIndex={-1} className="flex-1 w-full overflow-x-hidden pt-16 sm:pt-20">{children}</main>
        <Footer locale={validLocale} />
        </SitePreferences>
      </body>
    </html>
  );
}
