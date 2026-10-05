"use client";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const navLinkClass = "text-sm font-semibold text-navy-900 transition-colors uppercase tracking-wide relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-cool-600 after:transition-all after:duration-300 hover:after:w-full hover:text-cool-600";
  const mobileLinkClass = "text-2xl font-display font-bold text-white hover:text-heat-500 transition-colors block py-4 border-b border-white/10 w-full text-left";

  return (
    <>
      <div className="bg-navy-950 text-white/80 text-xs py-2 hidden md:block border-b border-white/5">
        <div className="container-custom flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-heat-500" /> Serving Houston, Katy, Sugar Land</span>
            <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-heat-500" /> 24/7 Emergency Service</span>
          </div>
          <div className="font-semibold tracking-widest uppercase text-white/60">
            License # TACLA123456C
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container-custom  flex items-center justify-between">
          <Link href="/" className="relative group flex items-center z-50">
            <Image src="/logo-removebg-preview.png" alt="JM Comfort Solutions" width={120} height={40} className="h-22 w-auto object-contain hover:opacity-90 transition-opacity" priority quality={100} />
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className={navLinkClass}>Home</Link>
            <Link href="/services" className={navLinkClass}>Services</Link>
            <Link href="/about" className={navLinkClass}>About</Link>
            <Link href="/contact" className={navLinkClass}>Contact</Link>
          </nav>

          <div className="hidden sm:flex items-center gap-4">
            <a href="tel:5551234567" className="flex items-center gap-2 text-navy-900 font-bold hover:text-cool-600 transition-colors">
              <Phone className="w-5 h-5" />
              <span>(555) 123-4567</span>
            </a>
            <Link href="/contact" className="bg-heat-600 text-white font-semibold py-2.5 px-6 rounded-md shadow-[0_4px_15px_rgba(210,64,28,0.3)] hover:bg-heat-500 hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(210,64,28,0.4)] transition-all duration-300 text-sm">
              Get a Free Quote
            </Link>
          </div>

          <button 
            className="lg:hidden relative z-40 p-2 text-navy-900 hover:text-heat-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-navy-950 shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div className="bg-white p-2 rounded-lg inline-block">
               <Image src="/logo-removebg-preview.png" alt="JM Comfort Solutions" width={100} height={33} className="h-6 w-auto object-contain" quality={100} />
            </div>
            <button 
              className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col">
            <nav className="flex flex-col mb-10">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Home</Link>
              <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Services</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>About</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Contact</Link>
            </nav>
            
            <div className="mt-auto space-y-4">
              <a href="tel:5551234567" className="flex items-center justify-center gap-3 w-full bg-white/5 text-white font-bold py-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <Phone className="w-5 h-5 text-heat-500" />
                <span className="text-lg">(555) 123-4567</span>
              </a>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center w-full bg-heat-600 text-white font-bold py-4 rounded-xl shadow-md text-lg hover:bg-heat-500 transition-colors">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
