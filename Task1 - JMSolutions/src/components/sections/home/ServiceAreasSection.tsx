import { Section } from '@/components/ui/Section';
import { ServiceAccordion } from '@/components/ui/ServiceAccordion';
import { serviceAreas } from '@/config/serviceAreas';

export function ServiceAreasSection() {
  const accordionData = [
    { title: "Air Conditioning Repair", items: serviceAreas.map(area => ({ label: `Air Conditioning Repair ${area.city}`, slug: area.slug })) },
    { title: "Heating & Furnace Repair", items: serviceAreas.map(area => ({ label: `Furnace Repair ${area.city}`, slug: area.slug })) },
    { title: "Commercial Refrigeration Repair", items: serviceAreas.map(area => ({ label: `Commercial Refrigeration ${area.city}`, slug: area.slug })) },
  ];

  return (
    <Section bg="bg-1" className="border-t border-line">
      <div className="absolute inset-0 bg-[url('/textures/contours.svg')] bg-repeat opacity-5 mix-blend-screen pointer-events-none"></div>
      <div className="container-custom relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-fg-0 mb-4 inline-flex flex-col items-center">
          <span>Serving Houston <span className="text-brand-gradient">and These Areas</span></span>
          <div className="w-[88px] h-[4px] mt-2 bg-[image:var(--grad-brand)] transform skew-x-[-20deg]"></div>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 mt-12 text-center max-w-4xl mx-auto mb-16">
          {serviceAreas.map((area, idx) => (
            <a key={idx} href={`/ac-repair-${area.slug}`} className="group relative inline-flex justify-center text-[16px] text-fg-1 hover:text-ice transition-colors font-medium">
              {area.city}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full h-[1px] bg-line group-hover:h-[2px] group-hover:bg-[image:var(--grad-brand)] transition-all duration-300"></span>
            </a>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
           <ServiceAccordion data={accordionData} />
        </div>
      </div>
    </Section>
  );
}
