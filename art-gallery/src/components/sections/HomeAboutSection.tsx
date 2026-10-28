import { ui } from "@/i18n/ui";
import { InteractiveSurface } from "@/components/branding/InteractiveSurface";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/types/portfolio";

export function HomeAboutSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return <section className="studio-teaser section-space">
    <div className="container-popart studio-teaser-grid">
      <div>
        <p className="section-kicker mb-6">03 / {ui(locale, "LE STUDIO", "THE STUDIO")}</p>
        <h2>{dict.home.manifestoTitle}</h2>
        <Link href={`/${locale}/about`} className="editorial-link mt-8">{dict.home.aboutLink}<ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
      <Link href={`/${locale}/about`} className="studio-art-link" aria-label={dict.home.aboutLink}><InteractiveSurface className="studio-playground"><div className="studio-symbol" aria-hidden="true"><span /></div></InteractiveSurface></Link>
    </div>
  </section>;
}
