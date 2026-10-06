"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const navLinkClass = "relative text-sm font-bold text-[#05070D] transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#05070D] hover:after:scale-x-100 after:transition-transform after:duration-300";

  return (
    <>
      <header 
        className={`fixed left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-32px)] md:w-[calc(100%-48px)] max-w-[1280px] rounded-sm transition-all duration-300 ${scrolled ? 'top-3 bg-[#94A3B8]/95 backdrop-blur-xl shadow-lg' : 'top-4 md:top-8 lg:top-12 bg-[#94A3B8]/75 backdrop-blur-md'}`}
        style={{
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <div className="px-4 md:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo-removebg-preview.png" 
              alt="JM Comfort Solutions" 
              width={160} 
              height={50}
              className="h-8 md:h-10 w-auto object-contain drop-shadow-sm"
              priority
            />
          </Link>

          {/* Desktop Nav - Centered */}
          <nav className="hidden md:flex items-center justify-center gap-8 flex-1">
            <Link href="/" className={navLinkClass}>HOME</Link>
            <Link href="/about" className={navLinkClass}>ABOUT US</Link>
            <div className="relative group">
              <Link href="/services" className={navLinkClass + " inline-flex items-center gap-1"}>
                SERVICES
                <svg className="w-4 h-4 text-[#05070D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
                <div className="bg-bg-0 border border-stroke rounded-sm shadow-xl w-56 flex flex-col p-2">
                  <Link href="/services" className="text-text-1 hover:text-ice-500 hover:bg-bg-1 px-4 py-3 text-sm font-bold transition-colors border-b border-stroke/50">All Services</Link>
                  <Link href="/services/residential" className="text-text-1 hover:text-ice-500 hover:bg-bg-1 px-4 py-3 text-sm font-bold transition-colors border-b border-stroke/50">Residential HVAC</Link>
                  <Link href="/services/commercial" className="text-text-1 hover:text-ice-500 hover:bg-bg-1 px-4 py-3 text-sm font-bold transition-colors border-b border-stroke/50">Commercial HVAC</Link>
                  <Link href="/services/maintenance" className="text-text-1 hover:text-ice-500 hover:bg-bg-1 px-4 py-3 text-sm font-bold transition-colors">Maintenance Plans</Link>
                </div>
              </div>
            </div>
            <Link href="/contact" className={navLinkClass}>CONTACT</Link>
          </nav>

          {/* Right Button */}
          <div className="hidden md:flex items-center justify-end w-[200px]">
            <Button href="tel:5551234567" variant="primary" className="py-2 px-6 text-sm shadow-md flex items-center gap-2">
              <Phone className="w-4 h-4" /> CALL NOW
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-[#05070D]" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-bg-0/95 backdrop-blur-xl flex flex-col p-6 text-text-0 overflow-y-auto">
          <div className="flex justify-end mb-8 shrink-0">
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 border border-stroke rounded-sm">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-2xl font-display font-bold text-center">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-center gap-2 cursor-pointer"
              >
                Services
                <svg className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              
              <div className={`flex flex-col gap-3 text-lg font-sans font-normal text-text-1 overflow-hidden transition-all duration-300 ease-in-out ${mobileServicesOpen ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <Link href="/services" onClick={() => setMobileMenuOpen(false)}>All Services</Link>
                <Link href="/services/residential" onClick={() => setMobileMenuOpen(false)}>Residential HVAC</Link>
                <Link href="/services/commercial" onClick={() => setMobileMenuOpen(false)}>Commercial HVAC</Link>
                <Link href="/services/maintenance" onClick={() => setMobileMenuOpen(false)}>Maintenance Plans</Link>
              </div>
            </div>

            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </nav>
          <div className="mt-8 flex flex-col gap-4 shrink-0">
            <Button href="tel:5551234567" variant="secondary" className="w-full">
              <Phone className="w-5 h-5" /> Call (555) 123-4567
            </Button>
            <Button href="/contact" variant="primary" className="w-full">
              Get a Free Quote
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
