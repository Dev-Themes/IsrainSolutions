import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { siteFeatures } from "@/lib/site-features";
import type { Metadata } from "next";
import { LegalPage, legalContent } from "@/components/layout/LegalPage";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { constructMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!siteFeatures.showLegalPages) return { metadataBase: new URL(siteConfig.url), robots: { index: false, follow: false } };
  const { locale } = await params;
  const language = isValidLocale(locale) ? locale : defaultLocale;
  const copy = legalContent.terms.translations[language];
  return constructMetadata({ locale: language, path: "terms", title: copy.title, description: copy.intro });
}
export default async function Page({ params }: Props) {
  if (!siteFeatures.showLegalPages) notFound();
  const { locale } = await params;
  return <LegalPage locale={isValidLocale(locale) ? locale : defaultLocale} kind="terms" />;
}
