import { Section } from '@/components/ui/Section';
import { FaqCard } from './FaqCard';
import { CircleCheck } from 'lucide-react';

export function WhyChoose({ data, url }: { data: any; url: string }) {
  return (
    <Section 
      bg="bg-1" className="relative overflow-hidden"
    >
      <div className="grid lg:grid-cols-[1fr_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-balance text-fg-1">
          {data.whyChoose.h2}
        </h2>
        
        <ul className="space-y-6">
          {data.whyChoose.items.map((item: any, i: number) => (
            <li key={i} className="flex items-start gap-4">
              <CircleCheck className="w-6 h-6 text-ice shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-bold text-ice mb-1">{item.title}</h3>
                <p className="text-fg-2 text-base">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-fit">
        <FaqCard faqs={data.faqs} url={url} />
      </div>
      </div>
    </Section>
  );
}
