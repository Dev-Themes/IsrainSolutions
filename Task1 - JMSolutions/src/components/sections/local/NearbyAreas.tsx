import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { serviceAreas } from '@/config/serviceAreas';
import { services } from '@/config/services';

export function NearbyAreas({ currentTownSlug, isHub = false, metro }: { currentTownSlug?: string; isHub?: boolean; metro: string }) {
  const showSample = process.env.NEXT_PUBLIC_SHOW_SAMPLE_AREAS === '1' || process.env.NODE_ENV === 'development';
  const areas = serviceAreas.filter(a => {
    if (a.placeholder && !showSample) return false;
    return true;
  });

  if (areas.length === 0 && isHub) {
    return (
      <Section className="py-16 bg-card">
        <div className="text-center text-fg-2 text-lg">
          Call us or request service online today.
        </div>
      </Section>
    );
  }

  const enabledServices = services.filter(s => s.enabled);

  return (
    <Section className="py-16 lg:py-24 bg-card-2">
      <SectionHeader 
        h2Part1={`Serving ${metro}`}
        h2Part2="and These Areas"
        centered={true}
      />
      <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-12 gap-y-4 md:gap-y-6 w-full max-w-5xl mx-auto mb-16 text-center">
        {areas.map((area) => (
          <Link
            key={area.slug}
            href={`/ac-repair-${area.slug}`}
            className="group flex items-center gap-2 py-2 text-fg-2 hover:text-ice transition-colors"
            aria-current={currentTownSlug === area.slug ? 'page' : undefined}
          >
            {currentTownSlug === area.slug && (
              <span className="w-1.5 h-1.5 clip-chamfer bg-[image:var(--grad-brand)]" />
            )}
            <span className={`underline decoration-white/20 underline-offset-4 group-hover:decoration-ice ${currentTownSlug === area.slug ? 'font-bold text-fg-1' : ''}`}>
              {area.town}
            </span>
          </Link>
        ))}
      </div>

      {!isHub && currentTownSlug && (
        <div className="max-w-3xl mx-auto text-center border-t border-white/10 pt-12">
          <h3 className="text-xl font-bold text-fg-1 mb-6">Also in {areas.find(a => a.slug === currentTownSlug)?.town}</h3>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-fg-2">
            {enabledServices.filter(s => s.slug !== 'ac-repair').map(s => (
              <Link key={s.slug} href={`/${s.slug}-${currentTownSlug}`} className="hover:text-ice underline decoration-white/20 underline-offset-4">
                {s.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </Link>
            ))}
            <Link href="/about" className="hover:text-ice underline decoration-white/20 underline-offset-4">
              About Us
            </Link>
          </div>
        </div>
      )}
    </Section>
  );
}
