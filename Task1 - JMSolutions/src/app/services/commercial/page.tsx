import Image from "next/image";
import { Building2, Wrench, Settings, Users2, ShieldCheck, Clock, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CommercialServicePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col justify-center min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop"
            alt="Commercial HVAC Hero"
            fill
            className="object-cover opacity-50 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-0 via-bg-0/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-transparent to-transparent" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-stroke bg-bg-0/50 backdrop-blur-sm">
              <Building2 className="w-4 h-4 text-ice-500" />
              <span className="text-xs font-bold tracking-widest text-text-2 uppercase">COMMERCIAL HVAC</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-text-0 mb-6 drop-shadow-md leading-tight">
              Commercial <span className="text-ice-500">Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-text-1 mb-10 max-w-2xl leading-relaxed">
              Comprehensive HVAC services designed to keep your business running smoothly. From rooftop units to multi-tenant properties, we deliver reliable climate control for every industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contact" className="py-4 px-8 text-sm font-bold uppercase tracking-widest bg-ice-500 text-bg-0 hover:bg-ice-400 transition-all shadow-[0_0_20px_rgba(47,140,255,0.3)] text-center">
                Get a Free Quote
              </Button>
              <Button href="tel:5551234567" className="py-4 px-8 text-sm font-bold uppercase tracking-widest bg-bg-2 border border-stroke text-text-0 hover:bg-bg-3 transition-all flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> (555) 123-4567
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="bg-bg-0 py-24 border-t border-stroke/50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-text-0 mb-6">
              Commercial <span className="text-ice-500">Services</span>
            </h2>
            <p className="text-text-1 text-lg">
              We understand that downtime costs you money, which is why our commercial team handles complex systems with speed, precision, and honesty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Wrench, title: "COMMERCIAL REPAIRS", desc: "Minimize downtime with fast, effective commercial HVAC repairs. We understand that every hour without AC costs your business money." },
              { icon: Settings, title: "ROOFTOP EQUIPMENT", desc: "Installation, maintenance, and repair of commercial rooftop units. We handle all major brands and configurations." },
              { icon: Users2, title: "MULTI-UNIT PROPERTIES", desc: "Comprehensive solutions for apartment complexes, condos, and multi-tenant properties. Single point of contact for all your HVAC needs." },
              { icon: Building2, title: "NEW COMMERCIAL INSTALLATION", desc: "Full installation services for commercial buildings, offices, and tenant build-outs. Properly engineered for your space." },
              { icon: ShieldCheck, title: "PREVENTIVE MAINTENANCE CONTRACTS", desc: "Scheduled maintenance to keep your systems running efficiently and avoid costly emergency breakdowns." },
              { icon: Clock, title: "EMERGENCY COMMERCIAL RESPONSE", desc: "Priority emergency service for commercial clients. We understand the urgency of keeping your business operational." }
            ].map((item, i) => (
              <div key={i} className="bg-bg-1 border border-stroke p-8 rounded-sm hover:border-ice-500/50 transition-colors group">
                <item.icon className="w-8 h-8 text-ice-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-bold tracking-widest uppercase text-text-0 mb-3">{item.title}</h3>
                <p className="text-text-2 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content + Image Section */}
      <section className="bg-bg-1 py-24 border-t border-stroke/50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-stroke">
                <span className="text-xs font-bold tracking-widest text-text-2 uppercase">INDUSTRIES WE SERVE</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-0 mb-6">
                Trusted by Local Businesses
              </h2>
              <p className="text-text-1 text-lg mb-8 leading-relaxed">
                We provide HVAC solutions for a wide range of commercial clients across the area. Our team understands the unique needs of each industry and delivers tailored solutions that keep your operations running smoothly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Offices & Corporate Buildings",
                  "Retail Stores & Shopping Centers",
                  "Restaurants & Food Service",
                  "Medical & Dental Offices",
                  "Warehouses & Industrial",
                  "Apartment Complexes"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-ice-500 shrink-0" />
                    <span className="text-text-0 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Button href="/contact" className="py-4 px-8 text-sm font-bold uppercase tracking-widest bg-ice-500/10 border border-ice-500 text-ice-500 hover:bg-ice-500 hover:text-bg-0 transition-all text-center">
                Schedule an Assessment
              </Button>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=2070&auto=format&fit=crop"
                  alt="Commercial HVAC Units on rooftop"
                  fill
                  className="object-cover clip-chamfer border border-stroke"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
