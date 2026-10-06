import Image from "next/image";
import { Home, Building2, Wrench, ChevronRight, Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col justify-center min-h-[60vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
            alt="HVAC Services Hero"
            fill
            className="object-cover opacity-40 mix-blend-screen"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-0/80 via-bg-0/60 to-bg-0" />
        </div>
        
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-ice-500/10 border border-ice-500/20 text-ice-500 text-sm font-bold tracking-widest uppercase mb-6">
            Our Services
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-text-0 mb-6 leading-tight">
            Complete HVAC <span className="text-ice-500">Solutions</span> <br />
            for Your Area
          </h1>
          <p className="text-lg md:text-xl text-text-1 mb-10 leading-relaxed max-w-2xl">
            Whether you need a quick repair at home, a massive rooftop unit replaced for your business, or a reliable maintenance plan to keep everything running smoothly — JM Comfort Solutions delivers with uncompromised honesty and expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact" className="py-4 px-8 text-sm font-bold uppercase tracking-widest bg-ice-500 text-bg-0 hover:bg-ice-400 transition-all shadow-[0_0_20px_rgba(47,140,255,0.3)]">
              Schedule Service Today
            </Button>
          </div>
        </div>
      </section>

      {/* Residential HVAC Section */}
      <section className="bg-bg-0 py-24 border-t border-stroke/50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
            {/* Image side */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 relative">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
                  alt="Residential HVAC System"
                  fill
                  className="object-cover clip-chamfer border border-stroke"
                />
              </div>
              
              <div className="bg-bg-1 border border-stroke p-8 rounded-sm">
                <div className="flex gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-ice-500 shrink-0" />
                  <div className="text-ice-500 text-sm font-bold tracking-widest uppercase mt-1">Need Emergency Service?</div>
                </div>
                <p className="text-text-1 mb-6">We answer every call 24/7. No answering machine, no after-hours voicemail.</p>
                <Button href="tel:5551234567" className="w-full sm:w-auto py-3 px-8 text-sm uppercase tracking-wider bg-ice-500/10 text-ice-500 border border-ice-500 hover:bg-ice-500 hover:text-bg-0 font-bold flex items-center justify-center gap-2 transition-all">
                  <Phone className="w-4 h-4" /> (555) 123-4567
                </Button>
              </div>
            </div>

            {/* Content side */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-stroke flex items-center justify-center text-ice-500">
                  <Home className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold tracking-widest border border-stroke px-3 py-1 text-text-2 uppercase">
                  Your Home Comfort is Our Mission
                </div>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-display font-bold text-text-0 mb-6">
                Residential HVAC
              </h2>
              
              <p className="text-text-1 text-lg mb-10 leading-relaxed">
                We service all residential HVAC systems — from quick repairs to complete system installations. Whether your AC quit in the middle of summer or your heater stopped working, we respond fast and fix it right.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                {[
                  { title: "AC Repair & Diagnostics", desc: "Fast, accurate diagnosis and repair for all AC makes and models." },
                  { title: "Heating System Repair", desc: "Full heating service including furnaces, heat pumps, and more." },
                  { title: "System Replacement", desc: "When replacement is truly needed, we match you with the right system." },
                  { title: "New Installation", desc: "Professional installation for new construction and additions." },
                  { title: "Mini-Split Systems", desc: "Ductless mini-split installation and service for any space." },
                  { title: "Emergency Service", desc: "24/7 emergency response — we answer every call." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <ChevronRight className="w-4 h-4 text-ice-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-text-0 font-bold text-sm uppercase tracking-wide mb-1">{item.title}</h4>
                      <p className="text-text-2 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/services/residential" className="py-4 px-8 text-sm font-bold uppercase tracking-widest bg-ice-500 text-bg-0 hover:bg-ice-400 text-center transition-all">
                  Learn More
                </Button>
                <Button href="/contact" className="py-4 px-8 text-sm font-bold uppercase tracking-widest bg-bg-2 border border-stroke text-text-0 hover:bg-bg-3 hover:border-stroke hover:text-text-0 text-center transition-all shadow-sm">
                  Get a Free Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial HVAC Section */}
      <section className="bg-bg-1 py-24 border-t border-stroke/50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-20 items-start">
            {/* Image side */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 relative">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop"
                  alt="Commercial HVAC Rooftop Units"
                  fill
                  className="object-cover clip-chamfer border border-stroke"
                />
              </div>
              
              <div className="bg-bg-0 border border-stroke p-8 rounded-sm">
                <div className="flex gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-ice-500 shrink-0" />
                  <div className="text-ice-500 text-sm font-bold tracking-widest uppercase mt-1">Need Emergency Service?</div>
                </div>
                <p className="text-text-1 mb-6">We answer every call 24/7. No answering machine, no after-hours voicemail.</p>
                <Button href="tel:5551234567" className="w-full sm:w-auto py-3 px-8 text-sm uppercase tracking-wider bg-ice-500/10 text-ice-500 border border-ice-500 hover:bg-ice-500 hover:text-bg-0 font-bold flex items-center justify-center gap-2 transition-all">
                  <Phone className="w-4 h-4" /> (555) 123-4567
                </Button>
              </div>
            </div>

            {/* Content side */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-stroke flex items-center justify-center text-ice-500">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold tracking-widest border border-stroke px-3 py-1 text-text-2 uppercase">
                  Keeping Your Business Comfortable & Productive
                </div>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-display font-bold text-text-0 mb-6">
                Commercial HVAC
              </h2>
              
              <p className="text-text-1 text-lg mb-10 leading-relaxed">
                From small offices to large commercial properties, we provide comprehensive HVAC solutions built for business. Our commercial team handles complex systems, multi-unit properties, and rooftop equipment with the same honesty we bring to every job.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                {[
                  { title: "Commercial Repairs", desc: "Minimize downtime with fast, effective commercial HVAC repairs." },
                  { title: "Rooftop Equipment", desc: "Installation, maintenance, and repair of commercial rooftop units." },
                  { title: "Multi-Unit Properties", desc: "Comprehensive solutions for apartment complexes and multi-tenant properties." },
                  { title: "New Commercial Installation", desc: "Full installation services for commercial buildings and tenant build-outs." },
                  { title: "Preventive Maintenance Contracts", desc: "Scheduled maintenance to keep your systems running efficiently." },
                  { title: "Emergency Commercial Response", desc: "Priority emergency service for commercial clients." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <ChevronRight className="w-4 h-4 text-ice-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-text-0 font-bold text-sm uppercase tracking-wide mb-1">{item.title}</h4>
                      <p className="text-text-2 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/services/commercial" className="py-4 px-8 text-sm font-bold uppercase tracking-widest bg-ice-500 text-bg-0 hover:bg-ice-400 text-center transition-all">
                  Learn More
                </Button>
                <Button href="/contact" className="py-4 px-8 text-sm font-bold uppercase tracking-widest bg-bg-2 border border-stroke text-text-0 hover:bg-bg-3 hover:border-stroke hover:text-text-0 text-center transition-all shadow-sm">
                  Get a Free Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Plans Section */}
      <section className="bg-bg-0 py-24 border-t border-stroke/50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
            {/* Image side */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 relative">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=2070&auto=format&fit=crop"
                  alt="HVAC Maintenance"
                  fill
                  className="object-cover clip-chamfer border border-stroke"
                />
              </div>
              
              <div className="bg-bg-1 border border-stroke p-8 rounded-sm">
                <div className="flex gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-ice-500 shrink-0" />
                  <div className="text-ice-500 text-sm font-bold tracking-widest uppercase mt-1">Need Emergency Service?</div>
                </div>
                <p className="text-text-1 mb-6">We answer every call 24/7. No answering machine, no after-hours voicemail.</p>
                <Button href="tel:5551234567" className="w-full sm:w-auto py-3 px-8 text-sm uppercase tracking-wider bg-ice-500/10 text-ice-500 border border-ice-500 hover:bg-ice-500 hover:text-bg-0 font-bold flex items-center justify-center gap-2 transition-all">
                  <Phone className="w-4 h-4" /> (555) 123-4567
                </Button>
              </div>
            </div>

            {/* Content side */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-stroke flex items-center justify-center text-ice-500">
                  <Wrench className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold tracking-widest border border-stroke px-3 py-1 text-text-2 uppercase">
                  Prevent Problems Before They Happen
                </div>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-display font-bold text-text-0 mb-6">
                Maintenance Plans
              </h2>
              
              <p className="text-text-1 text-lg mb-10 leading-relaxed">
                Our maintenance plans are designed to extend the life of your HVAC system, improve energy efficiency, and prevent costly emergency breakdowns. Regular maintenance is the single best investment you can make in your comfort system.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                {[
                  { title: "Spring/Fall Tune-Ups", desc: "Seasonal maintenance to prep your system before peak demand." },
                  { title: "Filter Replacement", desc: "Regular filter service to maintain air quality and efficiency." },
                  { title: "Coil Cleaning", desc: "Cleaning evaporator and condenser coils for peak performance." },
                  { title: "Refrigerant Check", desc: "Checking and adjusting refrigerant levels as needed." },
                  { title: "Priority Scheduling", desc: "Plan members get priority scheduling and faster response times." },
                  { title: "Discounted Repair Rates", desc: "Save on any repairs needed between scheduled visits." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <ChevronRight className="w-4 h-4 text-ice-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-text-0 font-bold text-sm uppercase tracking-wide mb-1">{item.title}</h4>
                      <p className="text-text-2 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/services/maintenance" className="py-4 px-8 text-sm font-bold uppercase tracking-widest bg-ice-500 text-bg-0 hover:bg-ice-400 text-center transition-all">
                  Learn More
                </Button>
                <Button href="/contact" className="py-4 px-8 text-sm font-bold uppercase tracking-widest bg-bg-2 border border-stroke text-text-0 hover:bg-bg-3 hover:border-stroke hover:text-text-0 text-center transition-all shadow-sm">
                  Get a Free Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
