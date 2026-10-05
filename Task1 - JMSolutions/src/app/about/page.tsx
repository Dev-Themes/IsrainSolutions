import TriColorTagline from "@/components/TriColorTagline";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Award } from "lucide-react";

export const metadata = {
  title: "About Us | JM Comfort Solutions",
  description: "Built on honest work and a commitment to keeping you comfortable.",
};

export default function AboutPage() {
  const team = [
    {
      name: "John Mitchell",
      role: "Founder & Master Technician",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Mike Davies",
      role: "Lead HVAC Installer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "David Smith",
      role: "Commercial Specialist",
      image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=400&auto=format&fit=crop"
    }
  ];

  return (
    <>
      <div className="bg-navy-950 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/contours.svg')] opacity-10"></div>
        <div className="container-custom relative z-10 text-center">
          <TriColorTagline />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mt-6 mb-4">Built on Honest Work.</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">Integrity and craftsmanship in every job we do.</p>
        </div>
      </div>

      <div className="container-custom py-20">
         <div className="grid md:grid-cols-2 gap-16 items-center">
           <div>
             <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mb-6">Our Story</h2>
             <div className="space-y-4 text-ink-500 text-lg">
               <p>Founded by John Mitchell, JM Comfort Solutions was built on a simple premise: treat customers with respect, diagnose the problem honestly, and fix it right the first time.</p>
               <p>We saw too many companies pushing unnecessary replacements. Our philosophy is different: we focus on repair and maintenance first, and only recommend replacement when it's truly the most cost-effective and comfortable option for you.</p>
               <p>With over 15 years of combined experience, our team is equipped to handle everything from residential AC tune-ups to complex commercial refrigeration systems.</p>
             </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-mist rounded-2xl aspect-[4/5] p-6 flex flex-col justify-end text-navy-900 shadow-sm border border-gray-100">
                 <ShieldCheck className="w-8 h-8 mb-4 text-heat-500" />
                 <span className="font-bold text-lg">Licensed &<br/>Insured</span>
              </div>
              <div className="bg-cool-600 rounded-2xl aspect-[4/5] p-6 flex flex-col justify-end text-white mt-8 shadow-sm">
                 <Award className="w-8 h-8 mb-4 text-cool-200" />
                 <span className="font-bold text-lg">Certified<br/>Technicians</span>
              </div>
           </div>
         </div>
      </div>

      <section className="bg-mist py-20 border-t border-gray-100">
         <div className="container-custom">
           <h2 className="text-3xl font-display font-bold text-navy-900 mb-12 text-center">Meet the Team</h2>
           <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <div key={i} className="bg-white rounded-xl shadow-soft overflow-hidden text-center border border-gray-100 group">
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <Image src={member.image} alt={member.name} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-navy-900 text-xl">{member.name}</h3>
                    <p className="text-ink-500">{member.role}</p>
                  </div>
                </div>
              ))}
           </div>
         </div>
      </section>
    </>
  );
}
