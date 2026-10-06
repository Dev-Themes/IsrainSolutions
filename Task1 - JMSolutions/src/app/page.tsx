import Image from "next/image";
import { 
  Snowflake, Flame, ThermometerSnowflake, Wrench, ShieldCheck, 
  Clock, ChevronRight, Phone, ArrowRight, Star
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ServiceAccordion } from "@/components/ui/ServiceAccordion";

export default function Home() {
  const serviceAreas = [
    "Springfield", "Riverside", "Oakwood", "Maplewood", 
    "Fairview", "Centerville", "Lakeview", "Georgetown",
    "Pine Valley", "Cedar Creek", "Willow Bend", "Stone Oak"
  ];

  const accordionData = [
    {
      title: "Air Conditioning Repair",
      items: serviceAreas.map(area => `Air Conditioning Repair ${area}`)
    },
    {
      title: "Furnace Repair",
      items: serviceAreas.map(area => `Furnace Repair ${area}`)
    }
  ];

  return (
    <>
      {/* 1. HERO SECTION */}
      <Section bg="bg-0" className="pt-32 pb-24 min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
            alt="HVAC background"
            fill
            priority
            className="object-cover opacity-40 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-0/90 via-bg-0/30 to-bg-0" />
        </div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-stroke text-text-2 text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-ice-500 shadow-[0_0_10px_rgba(47,140,255,0.8)]"></span>
            SERVING YOUR AREA - EST. 2024
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-8 text-text-0 uppercase drop-shadow-lg">
            WE FIX WHAT<br />
            <span className="text-ice-500">OTHER COMPANIES</span><br />
            WANT TO REPLACE.
          </h1>
          
          <p className="text-lg md:text-xl text-text-1 mb-12 max-w-2xl leading-relaxed">
            Locally owned HVAC in your area. Honest answers, fair pricing, and we'll repair your system instead of replacing it — when it makes sense.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button href="/contact" variant="secondary" className="py-4 px-10 text-lg uppercase tracking-wider font-bold border border-ice-500 bg-transparent text-ice-500 hover:bg-ice-500 hover:text-bg-0 transition-all duration-300 hover:shadow-[0_0_20px_rgba(47,140,255,0.4)]">
              Get a Free Quote
            </Button>
            <Button href="tel:5551234567" variant="primary" className="py-4 px-10 text-lg uppercase tracking-wider font-bold bg-transparent border border-ember-500 text-ember-500 hover:bg-ember-500 hover:text-bg-0 transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,81,30,0.4)] flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> Call Now: (555) 123-4567
            </Button>
          </div>
        </div>
      </Section>

      {/* 2. WHY JM SOLUTIONS */}
      <Section bg="bg-1" className="py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-0 inline-block relative">
            Why <span className="text-ice-500">JM Solutions?</span>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-ice-500"></div>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: <Clock className="w-10 h-10" />, title: "24/7 EMERGENCY LINE", desc: "AC quit in the middle of summer? We answer every call, day or night." },
            { icon: <ShieldCheck className="w-10 h-10" />, title: "REPAIR BEFORE REPLACE", desc: "A 15-year-old system isn't automatically dead. If it can be fixed, we'll fix it." },
            { icon: <ThermometerSnowflake className="w-10 h-10" />, title: "YOUR MONEY, OUR RESPECT", desc: "No upsells, no unnecessary replacements, no inflated quotes." },
            { icon: <Wrench className="w-10 h-10" />, title: "LOCALLY OWNED", desc: "Founded by HVAC veterans who wanted to do things differently — the right way." }
          ].map((item, i) => (
            <div key={i} className="border border-stroke/50 bg-bg-2 p-8 flex flex-col items-center text-center group hover:border-ice-500/50 hover:bg-[#151D31] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(47,140,255,0.15)] transition-all duration-500">
              <div className="text-text-0 mb-6 group-hover:scale-110 group-hover:text-ice-500 transition-all duration-300">{item.icon}</div>
              <h3 className="text-ice-500 font-bold uppercase tracking-wider mb-4 h-10 flex items-center justify-center">{item.title}</h3>
              <p className="text-text-2 text-sm leading-relaxed group-hover:text-text-1 transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. OUR SERVICES */}
      <Section bg="bg-0" className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-0 inline-block relative">
            Our <span className="text-ice-500">Services</span>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-ice-500"></div>
          </h2>
          <p className="mt-8 text-text-2">Complete residential and commercial HVAC solutions.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {/* Card 1 */}
          <div className="border border-stroke/50 bg-bg-2 flex flex-col group hover:border-ice-500/50 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(47,140,255,0.15)] transition-all duration-500 overflow-hidden">
            <div className="relative h-60 w-full overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop" alt="Residential" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 w-12 h-12 bg-bg-1 border border-stroke flex items-center justify-center group-hover:bg-ice-500 transition-colors duration-300">
                <Snowflake className="w-6 h-6 text-ice-500 group-hover:text-bg-0 transition-colors" />
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1 bg-bg-2">
              <h3 className="text-ice-500 font-bold text-lg uppercase tracking-wider mb-4">RESIDENTIAL HVAC</h3>
              <p className="text-text-2 text-sm mb-6 group-hover:text-text-1 transition-colors">Keep your home comfortable year-round with our expert repair, maintenance, and installation services.</p>
              <ul className="text-sm text-text-1 space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice-500" /> AC Repair & Installation</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice-500" /> Heating Systems</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice-500" /> Mini-Split Systems</li>
              </ul>
              <Button href="/services" className="w-full py-4 bg-ice-500/10 text-ice-500 border border-ice-500/30 hover:bg-ice-500 hover:text-bg-0 font-bold tracking-wider uppercase text-sm transition-all">
                Learn More
              </Button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-stroke/50 bg-bg-2 flex flex-col group hover:border-ice-500/50 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(47,140,255,0.15)] transition-all duration-500 overflow-hidden">
            <div className="relative h-60 w-full overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop" alt="Commercial" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 w-12 h-12 bg-bg-1 border border-stroke flex items-center justify-center group-hover:bg-ice-500 transition-colors duration-300">
                <Wrench className="w-6 h-6 text-ice-500 group-hover:text-bg-0 transition-colors" />
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1 bg-bg-2">
              <h3 className="text-ice-500 font-bold text-lg uppercase tracking-wider mb-4">COMMERCIAL HVAC</h3>
              <p className="text-text-2 text-sm mb-6 group-hover:text-text-1 transition-colors">Reliable climate control solutions designed for businesses of all sizes to ensure optimal operations.</p>
              <ul className="text-sm text-text-1 space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice-500" /> Rooftop Equipment</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice-500" /> Multi-Unit Properties</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice-500" /> Emergency Response</li>
              </ul>
              <Button href="/services" className="w-full py-4 bg-ice-500/10 text-ice-500 border border-ice-500/30 hover:bg-ice-500 hover:text-bg-0 font-bold tracking-wider uppercase text-sm transition-all">
                Learn More
              </Button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-stroke/50 bg-bg-2 flex flex-col group hover:border-ice-500/50 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(47,140,255,0.15)] transition-all duration-500 overflow-hidden">
            <div className="relative h-60 w-full overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=2070&auto=format&fit=crop" alt="Maintenance" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 w-12 h-12 bg-bg-1 border border-stroke flex items-center justify-center group-hover:bg-ice-500 transition-colors duration-300">
                <ShieldCheck className="w-6 h-6 text-ice-500 group-hover:text-bg-0 transition-colors" />
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1 bg-bg-2">
              <h3 className="text-ice-500 font-bold text-lg uppercase tracking-wider mb-4">MAINTENANCE PLANS</h3>
              <p className="text-text-2 text-sm mb-6 group-hover:text-text-1 transition-colors">Preventative care to extend the life of your equipment and catch problems before they become costly.</p>
              <ul className="text-sm text-text-1 space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice-500" /> Seasonal Tune-Ups</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice-500" /> Filter Replacement</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice-500" /> Priority Scheduling</li>
              </ul>
              <Button href="/services" className="w-full py-4 bg-ice-500/10 text-ice-500 border border-ice-500/30 hover:bg-ice-500 hover:text-bg-0 font-bold tracking-wider uppercase text-sm transition-all">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center flex justify-center mt-4">
          <Button href="/services" className="py-4 px-10 text-base uppercase tracking-wider bg-ember-500 text-bg-0 border border-transparent hover:bg-ember-400 hover:shadow-[0_0_30px_rgba(244,81,30,0.5)] transition-all font-bold flex items-center justify-center shadow-lg">
            View All Services
          </Button>
        </div>
      </Section>

      {/* 4. OUR STORY */}
      <Section bg="bg-1" className="py-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block border border-stroke px-4 py-2 text-xs uppercase tracking-widest text-text-2 mb-8">Our Story</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-0 mb-8 leading-tight">
              Built on <span className="text-ice-500">Honesty.</span><br />
              Driven by <span className="text-ice-500">Results.</span>
            </h2>
            <p className="text-text-1 leading-relaxed mb-8">
              JM Comfort Solutions was founded with a simple goal: take care of customers the way we believe they should be taken care of. After working in the HVAC industry and seeing how company policies can dictate solutions, we wanted to do things differently.
            </p>
            <div className="border-l-2 border-ice-500 pl-6 py-2 mb-10">
              <p className="text-text-0 italic font-medium leading-relaxed">
                "We want every customer to walk away thinking, 'They gave me an honest answer and treated my money like it was their own.'"
              </p>
            </div>
            <Button href="/about" className="py-4 px-8 text-sm uppercase tracking-wider bg-ice-500 text-bg-0 hover:bg-ice-400 font-bold shadow-lg hover:shadow-[0_0_20px_rgba(47,140,255,0.4)] transition-all">
              Our Full Story
            </Button>
          </div>
          
          <div className="relative group">
            <div className="relative aspect-[4/3] w-full clip-chamfer overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
                alt="HVAC Installation"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-ice-500 p-6 shadow-[0_0_30px_rgba(47,140,255,0.3)] max-w-[200px] group-hover:-translate-y-2 transition-transform duration-500">
              <div className="text-3xl font-display font-bold text-bg-0 mb-1">60+</div>
              <div className="text-xs font-bold uppercase tracking-widest text-bg-1 leading-tight">Yr Systems Serviced</div>
            </div>
          </div>
        </div>
      </Section>

      {/* 4.5 HOW IT WORKS */}
      <Section bg="bg-0" className="py-24 border-t border-stroke/50 overflow-hidden">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-0 inline-block relative">
            How It <span className="text-ice-500">Works</span>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-ice-500"></div>
          </h2>
          <p className="mt-8 text-text-2">Our simple, transparent process to get your system back online.</p>
        </div>

        <div className="max-w-6xl mx-auto relative px-4">
          {/* Connecting Neon Line (Hidden on mobile) */}
          <div className="hidden md:block absolute top-[4rem] left-[10%] right-[10%] h-[2px] bg-ice-500/30 -translate-y-1/2 z-0">
            <div className="absolute top-0 left-0 h-full w-full bg-ice-500 shadow-[0_0_15px_rgba(47,140,255,0.8)]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {[
              { step: "01", title: "Contact Us", desc: "Call or request service online. We answer 24/7." },
              { step: "02", title: "Diagnosis", desc: "Expert technicians inspect your system thoroughly." },
              { step: "03", title: "Honest Quote", desc: "We provide straightforward options to repair before replace." },
              { step: "04", title: "Comfort Restored", desc: "Your system is fixed right the first time by JM Solutions." }
            ].map((item, i) => (
              <div key={i} className="bg-bg-1 border border-stroke p-8 flex flex-col items-center text-center relative group hover:border-ice-500 hover:shadow-[0_0_30px_rgba(47,140,255,0.15)] transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-bg-0 border-2 border-ice-500 text-ice-500 flex items-center justify-center font-display font-bold text-xl mb-6 shadow-[0_0_20px_rgba(47,140,255,0.4)] group-hover:bg-ice-500 group-hover:text-bg-0 group-hover:scale-110 transition-all duration-300 relative z-10">
                  {item.step}
                </div>
                <h3 className="text-text-0 font-bold uppercase tracking-wider mb-3 group-hover:text-ice-400 transition-colors">{item.title}</h3>
                <p className="text-text-2 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

    </>
  );
}
