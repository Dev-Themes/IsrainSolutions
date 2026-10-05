import TriColorTagline from "@/components/TriColorTagline";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ChevronRight, Phone } from "lucide-react";

export const metadata = {
  title: "Services | JM Comfort Solutions",
  description: "Comprehensive heating, cooling, and commercial refrigeration services.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="bg-navy-950 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/contours.svg')] opacity-10"></div>
        <div className="container-custom relative z-10 text-center">
          <TriColorTagline />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mt-6 mb-4">Heating, Cooling & Refrigeration Services</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">Expert diagnostics and repair-first solutions for your home or business.</p>
        </div>
      </div>

      <div className="container-custom py-16">
         {/* Heating */}
         <section id="heating" className="py-16 border-b border-gray-100">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">Heating Services</h2>
               <p className="text-ink-500 mb-6 text-lg">When the chill sets in, you need reliable warmth. We service all makes and models of furnaces and heat pumps.</p>
               <ul className="space-y-4 mb-8">
                 <li className="flex gap-3"><CheckCircle2 className="text-heat-500 shrink-0" /> <span className="font-medium text-navy-800">Furnace Repair & Installation</span></li>
                 <li className="flex gap-3"><CheckCircle2 className="text-heat-500 shrink-0" /> <span className="font-medium text-navy-800">Heat Pump Diagnostics</span></li>
                 <li className="flex gap-3"><CheckCircle2 className="text-heat-500 shrink-0" /> <span className="font-medium text-navy-800">Seasonal Tune-Ups</span></li>
               </ul>
               <a href="tel:5551234567" className="inline-flex items-center gap-2 bg-heat-600 text-white px-6 py-3 rounded-md font-bold hover:bg-heat-500 transition-colors">Call for Heating Service</a>
             </div>
             <div className="bg-mist rounded-2xl aspect-[4/3] flex items-center justify-center border border-gray-100 overflow-hidden relative shadow-soft group">
               <Image src="/images/heating.jpg" alt="Technician servicing furnace" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
             </div>
           </div>
         </section>

         {/* Cooling */}
         <section id="cooling" className="py-16 border-b border-gray-100">
           <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
             <div className="md:order-2">
               <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">Cooling Services</h2>
               <p className="text-ink-500 mb-6 text-lg">Beat the heat with our comprehensive AC services. We focus on efficiency and rapid response.</p>
               <ul className="space-y-4 mb-8">
                 <li className="flex gap-3"><CheckCircle2 className="text-cool-500 shrink-0" /> <span className="font-medium text-navy-800">AC Repair & Replacement</span></li>
                 <li className="flex gap-3"><CheckCircle2 className="text-cool-500 shrink-0" /> <span className="font-medium text-navy-800">Ductless Mini-Splits</span></li>
                 <li className="flex gap-3"><CheckCircle2 className="text-cool-500 shrink-0" /> <span className="font-medium text-navy-800">Coil Cleaning & Maintenance</span></li>
               </ul>
               <a href="tel:5551234567" className="inline-flex items-center gap-2 bg-cool-600 text-white px-6 py-3 rounded-md font-bold hover:bg-cool-500 transition-colors">Call for Cooling Service</a>
             </div>
             <div className="md:order-1 bg-cool-50 rounded-2xl aspect-[4/3] flex items-center justify-center border border-cool-100 overflow-hidden relative shadow-soft group">
               <Image src="/images/cooling.jpg" alt="Outdoor AC unit maintenance" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
             </div>
           </div>
         </section>

         {/* Refrigeration */}
         <section id="refrigeration" className="py-16">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">Commercial Refrigeration</h2>
               <p className="text-ink-500 mb-6 text-lg">Protect your inventory. We provide emergency repairs and preventive maintenance for commercial food service equipment.</p>
               <ul className="space-y-4 mb-8">
                 <li className="flex gap-3"><CheckCircle2 className="text-navy-900 shrink-0" /> <span className="font-medium text-navy-800">Walk-In Coolers & Freezers</span></li>
                 <li className="flex gap-3"><CheckCircle2 className="text-navy-900 shrink-0" /> <span className="font-medium text-navy-800">Commercial Ice Machines</span></li>
                 <li className="flex gap-3"><CheckCircle2 className="text-navy-900 shrink-0" /> <span className="font-medium text-navy-800">Display Cases & Prep Tables</span></li>
               </ul>
               <a href="tel:5551234567" className="inline-flex items-center gap-2 bg-navy-900 text-white px-6 py-3 rounded-md font-bold hover:bg-navy-800 transition-colors">Call for Refrigeration</a>
             </div>
             <div className="bg-mist rounded-2xl aspect-[4/3] flex items-center justify-center border border-gray-100 overflow-hidden relative shadow-soft group">
               <Image src="/images/refrigeration.jpg" alt="Commercial kitchen refrigeration" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
             </div>
           </div>
         </section>
      </div>
    </>
  );
}
