import { serviceAreas } from "@/config/serviceAreas";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

// Spec 6.6: Generate static params from the config
export async function generateStaticParams() {
  return serviceAreas.map((area) => ({
    slug: area.slug,
  }));
}

export const metadata = {
  title: "AC Repair | JM Comfort Solutions",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ACRepairCityPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const area = serviceAreas.find((a) => a.slug === resolvedParams.slug);

  if (!area) {
    notFound();
  }

  return (
    <>
      {/* Dynamic Hero */}
      <Section className="min-h-[60svh] flex items-center relative isolation overflow-hidden py-12 md:py-20" bg="bg-0">
        <div className="absolute inset-0 bg-[url('/textures/contours.svg')] bg-repeat opacity-[0.06] -z-10 mix-blend-screen pointer-events-none"></div>
        <div className="absolute top-0 left-0 bottom-0 w-[40vw] bg-[radial-gradient(circle_at_0%_50%,rgba(63,160,240,0.15)_0%,transparent_70%)] -z-10 pointer-events-none"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-[14px] py-[8px] mb-8 border border-[image:var(--grad-brand)] border-opacity-30 text-ice text-[12px] font-nav font-bold tracking-[.24em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-ice shadow-[0_0_8px_var(--ice)] animate-pulse"></span>
              ● {area.city.toUpperCase()}, {area.state.toUpperCase()}
            </div>
            
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-[1.05] mb-6 text-fg-0 uppercase">
              EXPERT AC REPAIR IN<br />
              <span className="text-cool-gradient">{area.city}</span>
            </h1>
            
            <p className="text-[17px] md:text-[18px] text-fg-1 mb-10 max-w-[65ch] leading-[1.65]">
              JM Comfort Solutions provides fast, reliable, and honest air conditioning repair services across {area.city}. Available 24/7 for emergency repairs. We diagnose the issue accurately and repair your system when possible, saving you money.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button href="/contact" variant="primary">
                Get a Free Quote
              </Button>
              <Button href="tel:5551234567" variant="outline">
                Call Now: (555) 123-4567
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Placeholder Content Section */}
      <Section bg="bg-1" className="py-20">
         <div className="container-custom max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-fg-0 mb-6">
              Why Choose Us in <span className="text-cool-gradient">{area.city}?</span>
            </h2>
            <div className="w-[88px] h-[4px] mx-auto mb-8 bg-[image:var(--grad-brand)] transform skew-x-[-20deg]"></div>
            <p className="text-[16px] text-fg-1 leading-relaxed mb-6">
              When your AC goes down during a hot Texas summer, you need a team you can trust. Our {area.city} technicians arrive fully equipped to handle any make or model. We offer honest, upfront pricing so you're never surprised by the bill.
            </p>
            <p className="text-[16px] text-fg-1 leading-relaxed">
              *Note: This page is generated dynamically based on the serviceAreas configuration. Additional localized content can be added here.*
            </p>
         </div>
      </Section>
    </>
  );
}
