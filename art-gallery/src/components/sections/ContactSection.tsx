"use client";
import { ui } from "@/i18n/ui";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import type { Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { siteConfig } from "@/lib/site-config";
import { GeometricHeading } from "@/components/branding/GeometricHeading";
import { InteractiveSurface } from "@/components/branding/InteractiveSurface";

export function ContactSection({ locale, as = "h2", offer }: { locale: Locale; as?: "h1" | "h2"; offer?: number }) {
  const dict = getDictionary(locale);
  const copy = dict.contact.interaction;
  const [topic, setTopic] = useState(0);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  useEffect(() => {
    if (copyState === "idle") return;
    const timer = setTimeout(() => setCopyState("idle"), 3500);
    return () => clearTimeout(timer);
  }, [copyState]);
  const offerLabel = offer ? `${offer} ${ui(locale, "vidéos produit", "product videos")}` : "";
  const emailHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`PopArt Agency — ${offerLabel ? `${offerLabel} / ` : ""}${copy.topics[topic]}`)}`;
  const socials = [{ name: "Facebook", url: "https://facebook.com" }, ...siteConfig.socials];

  return <section className="popart-contact contact-experience dark-section section-space" aria-label={dict.contact.heroHeading}>
    <div className="container-popart">
      <div className="contact-eyebrow"><span className="section-kicker">{copy.eyebrow}</span><span>{dict.contact.collaborations}</span></div>
      <div className="contact-main">
        <div className="contact-message">
          <GeometricHeading text="CONTACT" as={as} />
          <p className="contact-opening">{dict.contact.openingStatement}</p>
          <a href={`mailto:${siteConfig.email}`} className="contact-email" aria-label={dict.contact.emailAria}><span>{siteConfig.email.split("@")[0]}<wbr />@{siteConfig.email.split("@")[1]}</span><ArrowUpRight size={28} aria-hidden="true" /></a>
          <div className="contact-copy-row"><button type="button" className="contact-copy" onClick={async () => {
            try { await navigator.clipboard.writeText(siteConfig.email); setCopyState("copied"); }
            catch { setCopyState("error"); }
          }}>{copyState === "copied" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}{copyState === "copied" ? copy.copied : copy.copyEmail}</button><span className="contact-copy-status" role="status">{copyState === "error" ? copy.copyError : copyState === "copied" ? copy.copied : ""}</span></div>
        </div>
        <InteractiveSurface className="contact-project-panel">
          <div className="contact-panel-top"><span className="section-kicker">PopArt Agency / 0{topic + 1}</span><svg className="contact-orbit" viewBox="0 0 80 80" fill="none" aria-hidden="true"><circle cx="40" cy="40" r="34" stroke="currentColor" /><circle cx="40" cy="40" r="24" stroke="currentColor" /><path d="M40 6A34 34 0 0 1 74 40H40Z" fill="currentColor" /><circle cx="40" cy="40" r="8" fill="var(--surface-raised)" /></svg></div>
          {offer && <p className="contact-selected-offer">{ui(locale, "Votre formule", "Your package")}: {offerLabel}</p>}
          <fieldset className="contact-topics"><legend>{copy.topicLabel}</legend><div>{copy.topics.map((label, index) => <button type="button" key={label} aria-pressed={topic === index} onClick={() => setTopic(index)}><span>{label}</span><span className="topic-indicator" aria-hidden="true" /></button>)}</div></fieldset>
          <p className="contact-panel-note">{copy.emailHint}</p>
          <a href={emailHref} className="contact-start">{copy.start}<ArrowUpRight size={24} aria-hidden="true" /></a>
        </InteractiveSurface>
      </div>
      <div className="contact-bottom">
        <div><h3>{copy.workWithUs}</h3><address><p>14 Rue de Charonne, {ui(locale, "Étage 4", "Floor 4")}</p><p>75011 Paris, {locale === "ro" ? "Franța" : "France"}</p></address></div>
        <div className="contact-hours"><p>{dict.contact.hoursNote}</p><span>{dict.contact.location}</span></div>
        <nav className="contact-socials" aria-label={copy.socialLabel}>{socials.map(social => <a href={social.url} key={social.name} target="_blank" rel="noopener noreferrer"><span>{social.name}</span><ArrowUpRight size={16} aria-hidden="true" /></a>)}</nav>
      </div>
    </div>
  </section>;
}
