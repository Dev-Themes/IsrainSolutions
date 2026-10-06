import Image from "next/image";
import { Home, Wrench, Thermometer, Wind, ShieldCheck, Clock, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ResidentialServicePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col justify-center min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
            alt="Residential HVAC Hero"
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
              <Home className="w-4 h-4 text-ice-500" />
              <span className="text-xs font-bold tracking-widest text-text-2 uppercase">RESIDENTIAL HVAC</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-text-0 mb-6 drop-shadow-md leading-tight">
              Home Comfort <span className="text-ice-500">Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-text-1 mb-10 max-w-2xl leading-relaxed">
              Fast, accurate diagnosis and expert repairs for your family's peace of mind. We service all residential HVAC systems with unwavering honesty and integrity.
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
              Residential <span className="text-ice-500">Services</span>
            </h2>
            <p className="text-text-1 text-lg">
              Comprehensive HVAC services designed to keep your home comfortable year-round. We never pressure you into unnecessary upgrades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Wrench, title: "AC REPAIR & DIAGNOSTICS", desc: "Fast, accurate diagnosis and repair for all air conditioning makes and models to restore your home's comfort." },
              { icon: Thermometer, title: "HEATING SYSTEM REPAIR", desc: "Full heating service including furnaces, heat pumps, and dual-fuel systems to keep you warm." },
              { icon: Wind, title: "SYSTEM REPLACEMENT", desc: "When replacement is truly needed, we match you with the right high-efficiency system for your specific home." },
              { icon: Home, title: "NEW INSTALLATION", desc: "Professional installation for new construction, remodels, and additions with proper sizing and load calculations." },
              { icon: ShieldCheck, title: "INDOOR AIR QUALITY", desc: "Advanced filtration, humidification, and purification solutions for healthier air in your home." },
              { icon: Clock, title: "24/7 EMERGENCY SERVICE", desc: "Priority emergency response because heating and cooling problems don't wait for business hours." }
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
                <span className="text-xs font-bold tracking-widest text-text-2 uppercase">WHY CHOOSE US</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-0 mb-6">
                Trusted by Local Homeowners
              </h2>
              <p className="text-text-1 text-lg mb-8 leading-relaxed">
                We believe in providing honest answers and treating your home with the utmost respect. Our technicians are highly trained, background-checked, and focused on delivering the best possible solution for your specific needs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Honest, Upfront Pricing",
                  "No High-Pressure Sales",
                  "Licensed & Insured",
                  "Clean & Respectful Technicians",
                  "Fast Response Times",
                  "Satisfaction Guaranteed"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-ice-500 shrink-0" />
                    <span className="text-text-0 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Button href="/about" className="py-4 px-8 text-sm font-bold uppercase tracking-widest bg-ice-500 text-bg-0 hover:bg-ice-400 transition-all text-center border border-transparent">
                Learn Our Story
              </Button>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=2070&auto=format&fit=crop"
                  alt="Residential HVAC Equipment and Ductwork"
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
