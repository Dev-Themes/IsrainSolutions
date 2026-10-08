import { Section } from '@/components/ui/Section';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { ServiceBlockData } from '@/content/services';
import { ServiceMedia } from './ServiceMedia';
import { EmergencyCard } from './EmergencyCard';
import { ServiceItemList } from './ServiceItemList';
import { House, Building2, Snowflake, Wrench } from 'lucide-react';

interface ServiceBlockProps {
  service: ServiceBlockData;
  tone: 'band' | 'bg-0';
  index: number;
}

const ICONS = {
  House,
  Building2,
  Snowflake,
  Wrench
};

export function ServiceBlock({ service, tone, index }: ServiceBlockProps) {
  const Icon = ICONS[service.icon];
  const number = String(index + 1).padStart(2, '0');
  
  return (
    <Section 
      id={service.anchor} 
      bg={tone} 
      className="py-20 md:py-32 scroll-mt-[88px]" 
      aria-labelledby={`${service.anchor}-title`}
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 900px' }}
    >
      {/* DOM Order: Text, Media */}
      <div className="container-custom grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[clamp(40px,5vw,72px)] items-start">
        
        {/* TEXT COLUMN */}
        <div className={`flex flex-col min-w-0 ${service.mediaSide === 'left' ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="flex items-center gap-3 mb-6">
            <Icon className={`w-7 h-7 ${service.variant === 'cool' ? 'text-ice' : 'text-ember'}`} />
            <Tag>
              <span className="text-fg-2 mr-2 aria-hidden" aria-hidden="true">{number} / 04</span>
              {service.tag}
            </Tag>
          </div>
          
          <h2 id={`${service.anchor}-title`} className="text-[clamp(1.7rem,1.1rem+2.6vw,3rem)] font-display font-bold leading-tight text-fg-0 mb-6 text-balance overflow-wrap-anywhere">
            {service.h2Part1} <span className="text-brand-gradient">{service.h2Accent}</span>
          </h2>
          
          <div className="w-12 h-1 bg-[image:var(--grad-brand)] mb-8 transform skew-x-[-12deg] aria-hidden" aria-hidden="true"></div>
          
          <p className="text-fg-1 text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] max-w-[65ch] leading-relaxed mb-10">
            {service.intro}
          </p>

          <ServiceItemList items={service.items} variant={service.variant} />

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button href={service.primaryCta.href} variant="primary">
              {service.primaryCta.label}
            </Button>
            <Button href={service.secondaryCta.href} variant="outline">
              {service.secondaryCta.label}
            </Button>
          </div>
        </div>

        {/* MEDIA COLUMN */}
        <div className={`flex flex-col gap-6 min-w-0 ${service.mediaSide === 'left' ? 'lg:order-1' : 'lg:order-2'}`}>
          <ServiceMedia 
            imageKey={service.imageKey}
            alt={service.imageAlt}
            side={service.mediaSide}
            variant={service.variant}
          />
          <EmergencyCard 
            headline={service.emergencyCard.headline}
            text={service.emergencyCard.text}
          />
        </div>
        
      </div>
    </Section>
  );
}
