import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { legalPagesEnabled } from "@/lib/legal-pages";
import { LegalPage, legalContent } from "@/components/layout/LegalPage";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { constructMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!legalPagesEnabled) notFound();
  const { locale } = await params;
  const language = isValidLocale(locale) ? locale : defaultLocale;
  const copy = legalContent.cookies.translations[language];
  return constructMetadata({ locale: language, path: "cookies", title: copy.title, description: copy.intro });
}
export default async function Page({ params }: Props) {
  if (!legalPagesEnabled) notFound();
  const { locale } = await params;
  return <LegalPage locale={isValidLocale(locale) ? locale : defaultLocale} kind="cookies" />;
}
