import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function ACRepair() {
  return (
    <>
      <Section className="py-24" bg="bg-0">
        <div className="container-custom">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-[image:var(--grad-brand)] text-ice text-[12px] font-nav font-bold tracking-[.24em] uppercase">
            AC REPAIR
          </div>
          <h1 className="text-5xl font-display font-bold text-fg-0 mb-6">
            AC Repair <span className="text-brand-gradient">You Can Trust</span>
          </h1>
          <p className="text-fg-1 max-w-2xl mb-8">
            When your AC goes down, you need fast, reliable service. We provide 24/7 emergency repair with honest, upfront pricing.
          </p>
          <Button href="/contact" variant="primary">Request Repair</Button>
        </div>
      </Section>
    </>
  );
}
