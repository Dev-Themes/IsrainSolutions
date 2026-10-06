"use client";

import Image from "next/image";
import { Star, Phone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ServiceAccordion } from "@/components/ui/ServiceAccordion";

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

export default function BottomSections() {
  return (
    <>
      {/* 5. REVIEWS */}
      <Section bg="bg-0" className="py-24">
        <div className="text-center mb-16">
          <div className="flex justify-center gap-4 mb-4">
            <span className="font-bold text-ice-500">G</span>
            <span className="text-stroke">|</span>
            <span className="font-bold text-ice-500">F</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-0 inline-block relative">
            What Our <span className="text-ice-500">Customers Say</span>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-ice-500"></div>
          </h2>
          <p className="mt-8 text-text-2">Real reviews from honest feedback from real homeowners and businesses.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Review 1 */}
          <div className="border border-stroke/50 bg-bg-2 p-8 relative group hover:border-ice-500/50 hover:bg-[#151D31] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(47,140,255,0.15)] transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-bg-1 px-3 py-1 border border-stroke group-hover:border-ice-500/30 transition-colors">
                <span className="text-ice-500">G</span> Google Review
              </div>
              <span className="text-text-2 text-sm">3 weeks ago</span>
            </div>
            <div className="flex gap-1 mb-4 text-ice-500">
              <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-text-1 italic mb-8">"Awesome service. I understood exactly what was wrong and how it needed to be fixed. I will continue to use this company for AC maintenance."</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-stroke flex items-center justify-center font-bold text-text-0 group-hover:bg-ice-500 group-hover:text-bg-0 transition-colors">S</div>
              <div>
                <div className="font-bold text-text-0">Shanel Onyechi</div>
                <div className="text-xs text-text-2">Verified Customer</div>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="border border-stroke/50 bg-bg-2 p-8 relative group hover:border-ice-500/50 hover:bg-[#151D31] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(47,140,255,0.15)] transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-bg-1 px-3 py-1 border border-stroke group-hover:border-ice-500/30 transition-colors">
                <span className="text-ice-500">G</span> Google Review
              </div>
              <span className="text-text-2 text-sm">a month ago</span>
            </div>
            <div className="flex gap-1 mb-4 text-ice-500">
              <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-text-1 italic mb-8">"I visited with my family and was pleased to find the waiting area clean and quiet. The technician arrived on time and clearly explained the repair process..."</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-stroke flex items-center justify-center font-bold text-text-0 group-hover:bg-ice-500 group-hover:text-bg-0 transition-colors">D</div>
              <div>
                <div className="font-bold text-text-0">Dexter Parker</div>
                <div className="text-xs text-text-2">Verified Customer</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. READY TO GET COMFORTABLE */}
      <Section bg="bg-0" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=2069&auto=format&fit=crop"
            alt="Ductwork background"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-text-0 mb-6">
            Ready to Get <span className="text-ice-500">Comfortable?</span>
          </h2>
          <p className="text-lg text-text-1 mb-12 max-w-2xl mx-auto">
            Don't sweat it — JM Comfort Solutions is one call away. Honest service, fair pricing, and 24/7 emergency response.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button href="/contact" variant="primary" className="py-4 px-10 text-lg uppercase tracking-wider font-bold bg-ice-500 text-bg-0 hover:bg-ice-400 hover:shadow-[0_0_30px_rgba(47,140,255,0.4)] transition-all border border-transparent">
              Request Service
            </Button>
            <Button href="tel:5551234567" variant="secondary" className="py-4 px-10 text-lg uppercase tracking-wider font-bold border border-ice-500 text-ice-500 bg-transparent hover:bg-ice-500 hover:text-bg-0 hover:shadow-[0_0_30px_rgba(47,140,255,0.4)] transition-all flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> (555) 123-4567
            </Button>
          </div>
        </div>
      </Section>

      {/* 8. SERVING THESE AREAS */}
      <Section bg="bg-1" className="py-24 border-t border-stroke/50">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-0 inline-block relative">
            Serving Your Area <br />
            <span className="text-ice-500">and These Areas</span>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-ice-500"></div>
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 text-center">
            {serviceAreas.map((city, idx) => (
              <div key={idx} className="group cursor-default">
                <span className="text-text-0 font-bold group-hover:text-ice-500 transition-colors inline-block group-hover:-translate-y-1 transform duration-300 relative">
                  {city}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-ice-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <ServiceAccordion data={accordionData} />
      </Section>
    </>
  );
}
