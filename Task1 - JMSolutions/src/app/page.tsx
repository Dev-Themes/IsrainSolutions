import Hero from "@/components/Hero";
import Link from "next/link";
import { Flame, Snowflake, ThermometerSnowflake, CheckCircle2, ChevronRight, Star, Phone } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Trust Bar */}
      <section className="bg-white py-8 border-b border-gray-100 shadow-sm relative z-20">
        <div className="container-custom grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-3xl font-display font-bold text-navy-900 mb-1">15+</span>
            <span className="text-sm text-ink-500 font-medium">Years Experience</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-3xl font-display font-bold text-navy-900 mb-1">5,000+</span>
            <span className="text-sm text-ink-500 font-medium">Systems Serviced</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="flex gap-1 mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
            </div>
            <span className="text-sm text-ink-500 font-medium">5-Star Rated Service</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-3xl font-display font-bold text-heat-600 mb-1">24/7</span>
            <span className="text-sm text-ink-500 font-medium">Emergency Line</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-mist relative">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-sm font-bold tracking-widest text-cool-600 uppercase mb-3">Our Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-navy-900 mb-6">Complete Climate Control</h3>
            <p className="text-ink-500 text-base sm:text-lg">We bring expertise and honesty to every call, whether it's a home AC tune-up or a commercial walk-in freezer repair.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-soft overflow-hidden group hover:-translate-y-1 transition-all duration-300 border-t-4 border-heat-600 flex flex-col h-full">
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="w-14 h-14 bg-heat-100 rounded-lg flex items-center justify-center mb-6">
                  <Flame className="w-7 h-7 text-heat-600" />
                </div>
                <h4 className="text-xl sm:text-2xl font-display font-bold text-navy-900 mb-3">Heating</h4>
                <p className="text-ink-500 mb-6 flex-1 text-sm sm:text-base">Furnace & heat pump repair, installation, and tune-ups to keep you warm all winter.</p>
                <Link href="/services#heating" className="inline-flex items-center gap-2 text-heat-600 font-bold hover:gap-3 transition-all text-sm sm:text-base mt-auto">
                  Learn more <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-soft overflow-hidden group hover:-translate-y-1 transition-all duration-300 border-t-4 border-cool-600 flex flex-col h-full">
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="w-14 h-14 bg-cool-100 rounded-lg flex items-center justify-center mb-6">
                  <Snowflake className="w-7 h-7 text-cool-600" />
                </div>
                <h4 className="text-xl sm:text-2xl font-display font-bold text-navy-900 mb-3">Cooling</h4>
                <p className="text-ink-500 mb-6 flex-1 text-sm sm:text-base">AC repair, replacement, and duct work to beat the brutal summer heat reliably.</p>
                <Link href="/services#cooling" className="inline-flex items-center gap-2 text-cool-600 font-bold hover:gap-3 transition-all text-sm sm:text-base mt-auto">
                  Learn more <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-soft overflow-hidden group hover:-translate-y-1 transition-all duration-300 border-t-4 border-navy-900 flex flex-col h-full">
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                  <ThermometerSnowflake className="w-7 h-7 text-navy-900" />
                </div>
                <h4 className="text-xl sm:text-2xl font-display font-bold text-navy-900 mb-3">Refrigeration</h4>
                <p className="text-ink-500 mb-6 flex-1 text-sm sm:text-base">Commercial refrigeration, walk-in coolers/freezers, and ice machines for your business.</p>
                <Link href="/services#refrigeration" className="inline-flex items-center gap-2 text-navy-900 font-bold hover:gap-3 transition-all text-sm sm:text-base mt-auto">
                  Learn more <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Heat / Cool Split */}
      <section className="flex flex-col md:flex-row">
        <div className="flex-1 bg-cool-100 p-8 sm:p-12 md:p-20 flex flex-col justify-center items-start border-t border-cool-500/20">
          <Snowflake className="w-10 h-10 sm:w-12 sm:h-12 text-cool-600 mb-4 sm:mb-6" />
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy-900 mb-3 sm:mb-4">Beat the Heat</h3>
          <p className="text-navy-800 mb-6 sm:mb-8 max-w-md text-sm sm:text-base">Don't sweat it out. Our rapid-response AC repair and high-efficiency installations keep your space perfectly chilled.</p>
          <Link href="/services#cooling" className="bg-cool-600 text-white font-bold py-3 px-6 rounded-md hover:bg-cool-500 transition-colors w-full sm:w-auto text-center">
            Cooling Solutions
          </Link>
        </div>
        <div className="flex-1 bg-heat-100 p-8 sm:p-12 md:p-20 flex flex-col justify-center items-start border-t border-heat-500/20">
          <Flame className="w-10 h-10 sm:w-12 sm:h-12 text-heat-600 mb-4 sm:mb-6" />
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy-900 mb-3 sm:mb-4">Beat the Cold</h3>
          <p className="text-navy-800 mb-6 sm:mb-8 max-w-md text-sm sm:text-base">Stay cozy when temperatures drop. We provide reliable furnace repairs and heating system upgrades.</p>
          <Link href="/services#heating" className="bg-heat-600 text-white font-bold py-3 px-6 rounded-md hover:bg-heat-500 transition-colors w-full sm:w-auto text-center">
            Heating Solutions
          </Link>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-navy-950 text-white py-12 sm:py-16 relative overflow-hidden border-t-2 border-brand-gradient">
        <div className="absolute inset-0 opacity-5 bg-[url('/patterns/contours.svg')]"></div>
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight">24/7 Emergency Heating, Cooling & Refrigeration</h2>
          <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8">We're here when the temperature isn't right. Call us anytime, day or night, for rapid dispatch.</p>
          <a href="tel:5551234567" className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 bg-heat-600 text-white font-bold py-3 px-4 sm:px-8 rounded-full shadow-[0_4px_20px_rgba(210,64,28,0.4)] hover:shadow-[0_8px_30px_rgba(210,64,28,0.6)] hover:-translate-y-1 hover:bg-heat-500 transition-all duration-300 text-base sm:text-lg overflow-hidden w-full sm:w-auto">
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full group-hover:bg-white group-hover:text-heat-600 transition-colors duration-300 shrink-0">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="whitespace-nowrap">Call (555) 123-4567 Now</span>
          </a>
        </div>
      </section>
    </>
  );
}
