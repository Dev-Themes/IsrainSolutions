import { notFound } from "next/navigation";
import { packagePlans, getPackagePlan } from "@/data/packages";
import { isValidLocale } from "@/i18n/config";
import { constructMetadata } from "@/lib/seo";
import { StaticRedirect } from "@/components/routing/StaticRedirect";

type Props = { params: Promise<{ locale: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return packagePlans.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return { ...constructMetadata({ locale }), robots: { index: false, follow: true } };
}
export default async function PackagePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale) || !getPackagePlan(slug)) notFound();
  return <StaticRedirect href={`/${locale}/#packages`} />;
}
