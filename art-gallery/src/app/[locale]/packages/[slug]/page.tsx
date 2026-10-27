import { permanentRedirect } from "next/navigation";
import { defaultLocale, isValidLocale } from "@/i18n/config";

export default async function PackagePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale } = await params;
  permanentRedirect(`/${isValidLocale(locale) ? locale : defaultLocale}#packages`);
}
