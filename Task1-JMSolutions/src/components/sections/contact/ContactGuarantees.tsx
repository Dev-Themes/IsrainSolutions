import { ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function ContactGuarantees() {
  return (
    <Section bg="bg-1" className="py-20 lg:py-32">
      <div className="container-custom">
        <SectionHeader 
          h2Part1="Our" 
          h2Part2="Guarantees" 
          subtext="When you call JM Comfort Solutions, you get peace of mind." 
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-[1280px] mx-auto">
          <Card variant="cool" className="p-8 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-ice/10 flex items-center justify-center shrink-0 mb-2">
              <Clock className="w-6 h-6 text-ice" />
            </div>
            <h3 className="font-display font-bold text-fg-0 text-xl">On-Time Arrival</h3>
            <p className="text-fg-1 leading-relaxed">
              We respect your time. When we schedule a window, we stick to it, and we call when we are on the way.
            </p>
          </Card>
          
          <Card variant="warm" className="p-8 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-ember/10 flex items-center justify-center shrink-0 mb-2">
              <ShieldCheck className="w-6 h-6 text-ember" />
            </div>
            <h3 className="font-display font-bold text-fg-0 text-xl">Upfront Pricing</h3>
            <p className="text-fg-1 leading-relaxed">
              No hidden fees or surprise charges. We diagnose the issue and provide a written quote before any work begins.
            </p>
          </Card>
          
          <Card variant="cool" className="p-8 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-ice/10 flex items-center justify-center shrink-0 mb-2">
              <BadgeCheck className="w-6 h-6 text-ice" />
            </div>
            <h3 className="font-display font-bold text-fg-0 text-xl">Guaranteed Work</h3>
            <p className="text-fg-1 leading-relaxed">
              We stand behind our repairs. If it is not fixed right the first time, we will make it right at no extra cost.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}
