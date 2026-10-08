import { Flame, Snowflake, Phone } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function CtaBand() {
  return (
    <Section bg="band" className="py-20 md:py-32 overflow-hidden relative isolate">
      <div className="absolute inset-0 bg-[url('/textures/contours.svg')] bg-repeat opacity-10 mix-blend-screen pointer-events-none"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-[image:var(--grad-brand)] opacity-20 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>

      <div className="container-custom relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-ice/50 bg-ice/10 text-ice text-[12px] font-nav font-bold tracking-[.24em] uppercase backdrop-blur-md">
          <Flame className="w-4 h-4 text-ember" />
          <Snowflake className="w-4 h-4 text-ice" />
          <span>REQUEST SERVICE</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-fg-0 mb-6 drop-shadow-lg">
          Ready to Get <span className="text-brand-gradient italic">Comfortable?</span>
        </h2>
        <p className="text-[18px] md:text-[20px] text-fg-1 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
          Don't sweat it. JM Comfort Solutions is one call away. Honest service, fair pricing and <span className="text-white font-bold border-b border-ember border-dashed pb-1">24/7 emergency response</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button href="/contact" variant="primary" className="shadow-[0_0_30px_rgba(236,106,71,0.3)] hover:shadow-[0_0_40px_rgba(63,160,240,0.5)]">
            Book Service Online
          </Button>
          <Button href="tel:5551234567" variant="outline" className="bg-bg-1/50 backdrop-blur-md border-ice hover:bg-ice/20 text-fg-0 hover:text-white">
            <Phone className="w-5 h-5 text-ice" /> (555) 123-4567
          </Button>
        </div>
      </div>
    </Section>
  );
}
