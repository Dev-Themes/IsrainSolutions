"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/i18n/config";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/branding/BrandLogo";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/types/portfolio";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const dict = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const [fits, setFits] = useState<boolean | null>(null);
  const row = useRef<HTMLDivElement>(null);
  const brand = useRef<HTMLDivElement>(null);
  const controls = useRef<HTMLDivElement>(null);
  const measurement = useRef<HTMLDivElement>(null);
  const [previousPath, setPreviousPath] = useState(pathname);
  if (previousPath !== pathname) { setPreviousPath(pathname); setOpen(false); }
  const items = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/work`, label: dict.nav.work },
    { href: `/${locale}/products`, label: dict.nav.products },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  useEffect(() => {
    let frame = 0;
    let active = true;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!active || !row.current || !brand.current || !controls.current || !measurement.current) return;
        const style = getComputedStyle(row.current);
        const available = row.current.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        const required = brand.current.getBoundingClientRect().width + measurement.current.getBoundingClientRect().width + controls.current.getBoundingClientRect().width + 2 * (parseFloat(style.columnGap) || 0);
        const canFit = required <= available - 4;
        setFits(canFit);
        if (canFit) setOpen(false);
      });
    };
    const observer = new ResizeObserver(measure);
    [row.current, brand.current, controls.current, measurement.current].forEach(element => { if (element) observer.observe(element); });
    measure();
    document.fonts.ready.then(measure);
    return () => { active = false; observer.disconnect(); cancelAnimationFrame(frame); };
  }, [locale]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const active = (href: string) => pathname === href || (href !== `/${locale}` && pathname.startsWith(href + "/"));
  return <header className="site-header" data-nav-fit={fits === null ? undefined : fits ? "full" : "compact"}>
    <div ref={row} className="container-popart header-row">
      <div ref={brand} className="header-brand"><BrandLogo locale={locale} /></div>
      <nav className="desktop-navigation" aria-label={dict.nav.menuAria}>
        {items.map(item => <Link key={item.href} href={item.href} className="nav-link" aria-current={active(item.href) ? "page" : undefined}>{item.label}</Link>)}
      </nav>
      <div className="header-actions">
        <div ref={controls} className="header-utilities">
          <select className="language-select font-mono text-xs" value={locale} aria-label={dict.nav.langSwitchAria} onChange={event => {
            const next = event.target.value;
            const path = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${next}`);
            router.push(`${path}${window.location.search}${window.location.hash}`);
          }}>{locales.map(language => <option value={language} key={language} lang={language}>{language.toUpperCase()}</option>)}</select>
        </div>
        <button type="button" className="header-control navigation-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <div ref={measurement} className="navigation-measure" aria-hidden="true" inert>
        {items.map(item => <span key={item.href} className="nav-link">{item.label}</span>)}
      </div>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-navigation container-popart" aria-label={dict.nav.menuAria}>
      {items.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="nav-link" aria-current={active(item.href) ? "page" : undefined}>{item.label}</Link>)}
    </nav>}
  </header>;
}
