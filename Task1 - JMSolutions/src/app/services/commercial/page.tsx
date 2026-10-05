import Link from "next/link";
import { ThermometerSnowflake, Building2, Wrench } from "lucide-react";

export default function Commercial() {
  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-js-navy border-l-8 border-js-navy pl-6">Commercial HVAC & Refrigeration</h1>
      <p className="text-xl text-gray-700 mb-10 leading-relaxed font-medium">
        A broken AC or failed freezer in a business isn't just uncomfortable—it costs you revenue. JS Comfort Solutions understands commercial urgency and offers rapid response times to protect your inventory and keep your doors open.
      </p>
      
      <div className="space-y-8 mt-12">
        <div className="bg-js-navy text-white p-8 rounded-xl shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
            <ThermometerSnowflake className="w-48 h-48 -mt-10 -mr-10" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-js-orange">Commercial Refrigeration</h2>
            <p className="text-gray-300 text-lg mb-6">We specialize in servicing, repairing, and installing critical refrigeration systems for restaurants, grocery stores, and medical facilities.</p>
            <ul className="grid sm:grid-cols-2 gap-3 font-medium text-js-light">
              <li>✓ Walk-in Coolers & Freezers</li>
              <li>✓ Reach-in Refrigerators</li>
              <li>✓ Ice Machines</li>
              <li>✓ Display Cases</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex gap-6 items-start">
          <div className="bg-slate-100 p-4 rounded-full flex-shrink-0">
            <Building2 className="w-8 h-8 text-js-navy" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 text-js-navy">Commercial RTU & Split Systems</h2>
            <p className="text-gray-600 text-lg">Comprehensive service for rooftop units and large split systems. We ensure your retail space or office remains perfectly climate-controlled.</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex gap-6 items-start">
          <div className="bg-slate-100 p-4 rounded-full flex-shrink-0">
            <Wrench className="w-8 h-8 text-js-navy" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 text-js-navy">Preventative Commercial Maintenance</h2>
            <p className="text-gray-600 text-lg">Customized maintenance schedules that fit your business hours. We replace belts, clean coils, and check refrigerant levels to prevent costly emergency breakdowns.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <Link href="/contact" className="inline-block bg-js-navy text-white font-bold py-4 px-10 rounded-full hover:bg-gray-800 transition-colors shadow-xl">
          Request a Commercial Quote
        </Link>
      </div>
    </div>
  );
}
