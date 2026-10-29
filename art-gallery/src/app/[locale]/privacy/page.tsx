import type { Metadata } from "next";
import { LegalPage, legalContent } from "@/components/layout/LegalPage";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { constructMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const language = isValidLocale(locale) ? locale : defaultLocale;
  const copy = legalContent.privacy.translations[language];
  return constructMetadata({ locale: language, path: "privacy", title: copy.title, description: copy.intro });
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <LegalPage locale={isValidLocale(locale) ? locale : defaultLocale} kind="privacy" />;
}
