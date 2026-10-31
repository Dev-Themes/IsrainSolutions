import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { InteractiveSurface } from "@/components/branding/InteractiveSurface";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/types/portfolio";

const relatedWork = ["color-studies", "noise-visual-system", "motion-without-borders", "monolith-echoes", "form-follows-feeling", "the-art-of-presence"];

function CapabilityGraphic({ index }: { index: number }) {
  return <svg viewBox="0 0 240 160" fill="none" aria-hidden="true" className="capability-graphic">
    {index === 0 && <g><circle cx="100" cy="80" r="58" fill="currentColor" /><circle cx="145" cy="80" r="40" fill="var(--cap-surface)" /><path d="M145 22V138M87 80H203" stroke="var(--foreground)" strokeWidth="1.5" /><circle cx="145" cy="80" r="11" fill="var(--foreground)" /></g>}
    {index === 1 && <g><rect x="54" y="22" width="116" height="116" stroke="currentColor" strokeWidth="2" /><rect x="75" y="43" width="116" height="95" fill="currentColor" /><path d="M75 67H191M75 91H191M75 115H191" stroke="var(--cap-surface)" strokeWidth="2" /><circle cx="75" cy="43" r="10" fill="var(--foreground)" /></g>}
    {index === 2 && <g><circle cx="120" cy="80" r="60" stroke="currentColor" strokeWidth="2" /><circle cx="120" cy="80" r="44" stroke="currentColor" strokeWidth="2" /><path d="M106 51L150 80L106 109Z" fill="currentColor" /><path d="M28 80H48M192 80H212" stroke="var(--foreground)" strokeWidth="2" /></g>}
    {index === 3 && <g><path d="M48 40H192V126H48Z" stroke="currentColor" strokeWidth="2" /><path d="M78 40L92 24H148L162 40" stroke="currentColor" strokeWidth="2" /><circle cx="120" cy="82" r="31" fill="currentColor" /><circle cx="120" cy="82" r="15" fill="var(--cap-surface)" /><circle cx="174" cy="56" r="4" fill="currentColor" /><path d="M36 70V96M204 70V96" stroke="var(--foreground)" strokeWidth="2" /></g>}
    {index === 4 && <g><rect x="42" y="28" width="156" height="104" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M42 50H198M94 50V132" stroke="currentColor" strokeWidth="2" /><circle cx="54" cy="39" r="3" fill="currentColor" /><circle cx="65" cy="39" r="3" fill="currentColor" /><path d="M120 70L164 101L143 105L132 122Z" fill="currentColor" /></g>}
    {index === 5 && <g><path d="M120 18L185 53V113L120 146L55 113V53Z" stroke="currentColor" strokeWidth="2" /><path d="M55 53L120 87L185 53M120 87V146M120 18V87" stroke="currentColor" strokeWidth="2" /><path d="M55 113L120 78L185 113" stroke="currentColor" strokeWidth="1" strokeDasharray="4 5" /><circle cx="120" cy="87" r="10" fill="currentColor" /></g>}
  </svg>;
}

export function CapabilitiesSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const copy = dict.home.capabilityUi;
  return <section className="capabilities-section section-space" aria-labelledby="capabilities-title">
    <div className="container-popart">
      <div className="capabilities-heading"><div><p className="section-kicker">{dict.home.capabilitiesTag}</p><h2 id="capabilities-title">{dict.home.manifestoTitle}</h2></div><p>{copy.hint}</p></div>
      <div className="capability-grid">
        {dict.home.capabilities.map((item, index) => <details className={`capability-card capability-card-${index}`} name="popart-capabilities" key={item.number}>
          <summary>
            <InteractiveSurface className="capability-cover">
              <span className="capability-top"><span>{item.number} / PopArt Agency</span><Plus size={19} className="capability-toggle" aria-hidden="true" /></span>
              <CapabilityGraphic index={index} />
              <span className="capability-title">{item.title}</span>
              <span className="capability-prompt">{copy.explore}<ArrowUpRight size={17} aria-hidden="true" /></span>
            </InteractiveSurface>
          </summary>
          <div className="capability-content"><p>{item.desc}</p><ul>{copy.deliverables[index].map(label => <li key={label}>{label}</li>)}</ul>
            <Link href={`/${locale}/work/${relatedWork[index]}`} className="editorial-link" aria-label={`${copy.related} — ${item.title}`}>{copy.related}<ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </details>)}
      </div>
    </div>
  </section>;
}
