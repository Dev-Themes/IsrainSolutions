import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, CalendarDays, CheckCircle2 } from 'lucide-react';

export function LocalHero({ data, isHub = false }: { data: any; isHub?: boolean }) {
  return (
    <Section className="pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden relative">
      <div className="grid lg:grid-cols-[1fr_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
        <div className="flex flex-col items-start z-10 max-w-2xl">
          <Breadcrumbs 
            current={isHub ? "AC Repair" : `AC Repair / ${data.badge}`}
          />

          <Tag className="mb-6">
            <MapPin className="w-4 h-4 mr-2 inline" />
            {data.badge}
          </Tag>

          <h1 className="text-4xl sm:text-5xl lg:text-[clamp(2.1rem,1.2rem+4.6vw,4.4rem)] font-bold tracking-tight mb-6 text-balance overflow-wrap-anywhere leading-[1.1]">
            {data.title.split('\n').map((line: string, i: number, arr: any[]) => (
              <span key={i} className={i === arr.length - 1 ? 'bg-[image:var(--grad-brand)] bg-clip-text text-transparent block mt-2' : 'block'}>
                {line}
              </span>
            ))}
          </h1>

          <div className="text-lg sm:text-xl font-medium text-ice mb-6 text-balance">
            {data.subhead}
          </div>

          <p className="text-base sm:text-lg text-fg-2 mb-10 max-w-[65ch] text-pretty">
            {data.paragraph}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
            <Button variant="primary" href={`tel:${data.licenseLine.split(': ')[0] === '' ? '' : ''}`} className="w-full sm:w-auto">
              <Phone className="w-5 h-5 mr-2" />
              Call {data.phone || 'JM Comfort Solutions'}
            </Button>
            <Button variant="outline" href="/contact" className="w-full sm:w-auto">
              <CalendarDays className="w-5 h-5 mr-2" />
              Schedule Service &rarr;
            </Button>
          </div>

          <div className="text-sm text-fg-2 opacity-80">
            {data.licenseLine}
          </div>
        </div>

        <div className="relative z-10 lg:h-full min-h-[400px] flex flex-col justify-center">
          <div className="relative w-full aspect-[4/3] clip-chamfer overflow-hidden mb-6 border border-line isolate bg-card">
              <Image
                src="/images/service-cooling.jpg"
                alt="Professional AC repair and maintenance"
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover -z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-transparent to-transparent opacity-80" />
          </div>

          {data.atAGlance && data.atAGlance.length > 0 && (
            <div className="bg-card border border-line clip-chamfer p-6" style={{'--cut': '12px'} as any}>
              <div className="font-nav font-bold text-[12px] tracking-[.14em] uppercase text-fg-2 mb-4">At a glance</div>
              <ul className="space-y-3">
                {data.atAGlance.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-fg-1">
                    <CheckCircle2 className="w-5 h-5 text-ice shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
