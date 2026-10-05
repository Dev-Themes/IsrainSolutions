import WaveLines from "./WaveLines";
import ContourBackground from "./ContourBackground";
import TriColorTagline from "./TriColorTagline";
import Link from "next/link";
import Image from "next/image";
import { Phone, ShieldCheck, Clock, MapPin, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-navy-950 pt-20 pb-24 md:pt-32 md:pb-32 text-white">
      {/* Background System */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-cool-600 opacity-20 blur-[120px] rounded-full"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-heat-600 opacity-20 blur-[120px] rounded-full"></div>
        <ContourBackground />
        <WaveLines />
      </div>

      <div className="container-custom relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-block bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm shadow-sm">
            <TriColorTagline />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-tight text-white drop-shadow-md">
            Comfort, Engineered <br className="hidden md:block" /> for Every Season.
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed font-medium">
            From a stalled furnace to a failing walk-in cooler, JM Comfort Solutions diagnoses honestly, repairs right, and keeps your home and business running.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <a href="tel:5551234567" className="group flex items-center justify-center gap-2 bg-heat-600 text-white font-bold py-4 px-8 rounded-md hover:bg-heat-500 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(210,64,28,0.5)] transition-all duration-300">
              <Phone className="w-5 h-5 animate-pulse" />
              <span>Call (555) 123-4567</span>
            </a>
            <Link href="/contact" className="group flex items-center justify-center gap-2 border-2 border-white/80 bg-white/5 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-md hover:bg-white hover:text-navy-900 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(255,255,255,0.2)] transition-all duration-300">
              <span>Get a Free Quote</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6 text-sm text-white/80 font-semibold">
            <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-cool-500" /> Licensed & Insured</span>
            <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-cool-500" /> Upfront Pricing</span>
            <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-heat-500" /> Same-Day Service</span>
          </div>
        </div>
        
        <div className="hidden lg:block lg:col-span-5 relative">
          <div className="relative w-full aspect-square max-w-lg mx-auto transform hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-tr from-cool-500/30 to-heat-500/30 rounded-3xl blur-3xl animate-pulse"></div>
            <div className="relative w-full h-full rounded-3xl border border-white/20 overflow-hidden shadow-2xl glass-dark">
              <Image src="/images/hero_climate_icon.jpg" alt="HVAC Climate Control" fill className="object-cover opacity-90 hover:opacity-100 transition-opacity" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
