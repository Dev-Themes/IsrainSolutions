import type { ServicePageData } from "@/content/service-pages";
import { SmoothAccordion } from "@/components/ui/SmoothAccordion";

export function FaqSection({ page }: { page: ServicePageData }) {
  return (
    <section className="relative isolate py-16 md:py-24 bg-band overflow-clip">
      <div className="absolute inset-0 bg-[url(/textures/contours.svg)] bg-repeat opacity-[0.12] mix-blend-screen -z-10 pointer-events-none"></div>

      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[clamp(1.7rem,1.1rem+2.6vw,3rem)] font-display font-bold text-fg-0 uppercase mb-4 text-balance">
            Common <span className="text-brand-gradient">Questions</span>
          </h2>
          <div className="h-[3px] w-12 bg-[image:var(--grad-brand)] mx-auto"></div>
        </div>

        <SmoothAccordion faqs={page.faqs} />
      </div>
    </section>
  );
}
