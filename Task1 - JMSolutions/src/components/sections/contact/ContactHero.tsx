import { Section } from '@/components/ui/Section';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Headset, Phone, CalendarClock } from 'lucide-react';
import { site } from '@/config/site';

interface ContactHeroProps {
  data: {
    h1: { lead: string; accent: string };
    heroLead: string;
    tag: string;
  };
}

export function ContactHero({ data }: ContactHeroProps) {
  return (
    <Section bg="bg-0" className="pt-24 lg:pt-32 pb-16 overflow-hidden relative">
      <div className="container-custom">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-fg-1">
            <li>
              <a href="/" className="hover:text-fg-0 transition-colors focus-visible:outline-brand">Home</a>
            </li>
            <li className="select-none" aria-hidden="true">›</li>
            <li aria-current="page" className="text-fg-0 font-medium">Contact</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-[clamp(32px,5vw,72px)] items-center">
          
          <div className="flex flex-col gap-6 animate-load-in">
            <Tag>
              <Headset className="w-4 h-4" />
              {data.tag}
            </Tag>
            
            <h1 className="font-display font-bold text-fg-0 leading-tight" style={{ fontSize: 'clamp(2.1rem, 1.2rem + 4.6vw, 4.4rem)', textWrap: 'balance' }}>
              {data.h1.lead}{' '}
              <span className="text-brand-gradient block">{data.h1.accent}</span>
            </h1>

            <p className="text-fg-1" style={{ fontSize: 'clamp(1rem, .95rem + .25vw, 1.125rem)', maxWidth: '65ch' }}>
              {data.heroLead}
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full animate-load-in" style={{ animationDelay: '150ms' }}>
            {/* Emergency Action */}
            <Card variant="warm" className="p-6 sm:p-8 flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-ember" />
                </div>
                <h2 className="font-display font-bold uppercase tracking-wide text-fg-0 text-lg">Emergency line</h2>
              </div>
              <a href={`tel:${site.phone.replace(/[^0-9]/g, '')}`} className="text-3xl sm:text-4xl font-display font-bold text-fg-0 hover:text-ember transition-colors focus-visible:outline-brand inline-block mb-1">
                {site.phone}
              </a>
              <p className="text-fg-1 text-sm sm:text-base">Answered 24 hours a day, including holidays.</p>
            </Card>

            {/* Schedule Action */}
            <Card variant="cool" className="p-6 sm:p-8 flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-ice/10 flex items-center justify-center shrink-0">
                  <CalendarClock className="w-5 h-5 text-ice" />
                </div>
                <h2 className="font-display font-bold uppercase tracking-wide text-fg-0 text-lg">Book a visit</h2>
              </div>
              <p className="text-fg-1 text-sm sm:text-base mb-4">
                We will confirm an arrival window that works for you.
              </p>
              <Button href="#request" variant="cool" className="w-full sm:w-auto self-start">
                Schedule Service
              </Button>
            </Card>
          </div>

        </div>
      </div>
    </Section>
  );
}
