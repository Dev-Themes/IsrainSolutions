import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Plus } from 'lucide-react';

interface ContactFaqProps {
  data: [
    { q: string; a: string },
    { q: string; a: string },
    { q: string; a: string }
  ];
}

export function ContactFaq({ data }: ContactFaqProps) {
  return (
    <Section bg="band" className="py-20 lg:py-32">
      <div className="container-custom">
        <SectionHeader 
          h2Part1="Before You" 
          h2Part2="Call"
          subtext="A few things to know about our dispatch process and what to have ready."
          centered={true}
        />

        <div className="max-w-[880px] mx-auto mt-12 flex flex-col">
          {data.map((faq, idx) => (
            <details 
              key={idx} 
              className="group border-b border-line/30 pb-6 mb-6 last:border-b-0 last:mb-0 last:pb-0"
              open={idx === 0}
            >
              <summary className="flex justify-between items-center cursor-pointer list-none min-h-[48px] focus-visible:outline-brand group-open:text-brand-gradient">
                <h3 className="font-display font-bold text-fg-0 text-lg sm:text-xl pr-6 group-open:text-ice transition-colors">
                  {faq.q}
                </h3>
                <span className="w-8 h-8 rounded-full bg-card/50 flex items-center justify-center shrink-0 text-fg-1 group-open:rotate-45 group-open:text-ice transition-transform duration-300">
                  <Plus className="w-5 h-5" />
                </span>
              </summary>
              <div className="pt-4 pr-12 text-fg-1 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
