import Link from "next/link";
import { Snowflake, Flame, Settings } from "lucide-react";

export default function Residential() {
  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-js-navy border-l-8 border-js-blue pl-6">Residential Heating & Cooling</h1>
      <p className="text-xl text-gray-700 mb-10 leading-relaxed font-medium">
        Your home is your sanctuary. JS Comfort Solutions provides top-tier residential HVAC services designed to maximize your family's comfort and minimize your utility bills.
      </p>
      
      <div className="space-y-8 mt-12">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex gap-6 items-start">
          <div className="bg-blue-50 p-4 rounded-full flex-shrink-0">
            <Snowflake className="w-8 h-8 text-js-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 text-js-navy">AC Repair & Maintenance</h2>
            <p className="text-gray-600 text-lg">Fast, accurate diagnostics and repairs. We restore your cooling rapidly and offer preventative maintenance to keep it running smoothly all summer long.</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex gap-6 items-start">
          <div className="bg-orange-50 p-4 rounded-full flex-shrink-0">
            <Flame className="w-8 h-8 text-js-orange" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 text-js-navy">Heating & Furnace Services</h2>
            <p className="text-gray-600 text-lg">Comprehensive furnace and heat pump repairs to ensure you stay warm and safe. We inspect heat exchangers and pilot systems for complete safety.</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex gap-6 items-start">
          <div className="bg-slate-100 p-4 rounded-full flex-shrink-0">
            <Settings className="w-8 h-8 text-js-navy" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 text-js-navy">High-Efficiency Installations</h2>
            <p className="text-gray-600 text-lg">When it's time for an upgrade, we offer professional installation of modern, high-efficiency units tailored precisely to your home's square footage and layout.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center bg-js-light p-10 rounded-2xl border border-gray-200">
        <h3 className="text-2xl font-bold text-js-navy mb-6">Ready to restore your comfort?</h3>
        <Link href="/contact" className="inline-block bg-js-blue text-white font-bold py-4 px-10 rounded-full hover:bg-blue-700 transition-colors shadow-lg">
          Schedule Residential Service
        </Link>
      </div>
    </div>
  );
}
