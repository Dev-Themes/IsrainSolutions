import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Phone, CalendarDays, CheckCircle2 } from 'lucide-react';
import { site } from '@/config/site';

export function LocalCta({ data }: { data: any }) {
  return (
    <Section bg="band" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-band" />
      <div className="absolute inset-0 bg-[image:var(--grad-brand)] opacity-[0.03]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ice to-transparent opacity-50" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ember to-transparent opacity-50" />
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance text-fg-1">
          {data.h2.split(data.h2.match(/in (.*)\?/)?.[1] || '').map((part: string, i: number, arr: any[]) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="bg-[image:var(--grad-brand)] bg-clip-text text-transparent">
                  {data.h2.match(/in (.*)\?/)?.[1]}
                </span>
              )}
            </span>
          ))}
        </h2>

        <div className="text-xl sm:text-2xl font-bold text-ice mb-8">
          {data.priceLine}
        </div>

        <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          {data.bullets.map((bullet: string, i: number) => (
            <li key={i} className="flex items-center gap-2 text-base sm:text-lg text-fg-2">
              <CheckCircle2 className="w-5 h-5 text-ice shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button variant="primary" href={`tel:${site.phone.split(': ')[0] === '' ? '' : ''}`} className="w-full sm:w-auto">
            <Phone className="w-5 h-5 mr-2 inline" />
            Call {site.name}
          </Button>
          <Button variant="outline" href="/contact" className="w-full sm:w-auto">
            <CalendarDays className="w-5 h-5 mr-2 inline" />
            Request Service
          </Button>
        </div>
      </div>
    </Section>
  );
}
