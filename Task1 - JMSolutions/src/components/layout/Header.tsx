"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { LogoGlow } from '../ui/LogoGlow';
import { site } from '@/config/site';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const navLinkClass = "relative text-[13px] tracking-[.1em] font-nav font-semibold text-fg-1 uppercase transition-colors hover:text-fg-0 hover:after:scale-x-100 after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[image:var(--grad-brand)] after:transition-transform after:duration-[280ms]";

  return (
    <>
      {/* Announcement Bar */}
      <div className="flex items-center justify-center h-[40px] bg-[image:var(--grad-fill-cta)] text-white text-[13px] uppercase tracking-[.12em] px-4 font-nav font-semibold">
        <span className="flex items-center gap-2">
          <span className="text-[14px]">⚠️</span>
          <span>24/7 EMERGENCY LINE: <a href={`tel:${site.phone.replace(/[^0-9]/g, '')}`} className="underline hover:text-white/80">{site.phone}</a> — We Answer Every Call</span>
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 w-full h-[72px] md:h-[88px] bg-[#050D1A]/95 backdrop-blur-[10px] border-b border-b-transparent relative isolation">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[image:var(--grad-brand)] opacity-55 pointer-events-none"></div>
        <div className="container-custom h-full flex items-center justify-between overflow-visible">
          
          <Link href="/" className="flex items-center flex-shrink-0" style={{ overflow: 'visible' }}>
            <LogoGlow>
              {/* Replace logo.png when ready, using the removed bg version */}
              <Image 
                src="/logo-removebg-preview.png" 
                alt={site.name} 
                width={160} 
                height={50}
                className="h-[48px] md:h-[64px] w-auto object-contain"
                priority
              />
            </LogoGlow>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 ml-auto mr-12">
            <Link href="/" className={navLinkClass}>Home</Link>
            <Link href="/about" className={navLinkClass}>About Us</Link>
            
            <div 
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className={`${navLinkClass} inline-flex items-center gap-1 cursor-pointer`} aria-expanded={servicesOpen} aria-haspopup="true">
                Services <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Services Dropdown */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-[24px] transition-all duration-200 z-40 ${servicesOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="clip-chamfer bg-bg-0 border border-line w-[280px] p-2 flex flex-col relative isolate">
                  {/* Inner background hack for chamfer gap */}
                  <div className="absolute inset-[1px] bg-card -z-10 clip-chamfer" style={{clipPath: 'polygon(0 0, calc(100% - 17.6px) 0, 100% 17.6px, 100% 100%, 17.6px 100%, 0 calc(100% - 17.6px))'}}></div>
                  <Link href="/services" className="px-4 py-3 text-sm font-bold uppercase text-fg-1 hover:text-ice hover:bg-card-2 hover:border-l-[2px] hover:border-l-ice transition-all">All Services</Link>
                  <Link href="/services/residential" className="px-4 py-3 text-sm font-bold uppercase text-fg-1 hover:text-ice hover:bg-card-2 hover:border-l-[2px] hover:border-l-ice transition-all">Residential HVAC</Link>
                  <Link href="/services/commercial" className="px-4 py-3 text-sm font-bold uppercase text-fg-1 hover:text-ice hover:bg-card-2 hover:border-l-[2px] hover:border-l-ice transition-all">Commercial HVAC</Link>
                  <Link href="/services/refrigeration" className="px-4 py-3 text-sm font-bold uppercase text-fg-1 hover:text-ice hover:bg-card-2 hover:border-l-[2px] hover:border-l-ice transition-all">Commercial Refrigeration</Link>
                  <Link href="/services/maintenance" className="px-4 py-3 text-sm font-bold uppercase text-fg-1 hover:text-ice hover:bg-card-2 hover:border-l-[2px] hover:border-l-ice transition-all">Maintenance Plans</Link>
                </div>
              </div>
            </div>

            <Link href="/ac-repair" className={navLinkClass}>AC Repair</Link>
            <Link href="/contact" className={navLinkClass}>Contact</Link>
          </nav>

          {/* Right Button */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Button href={`tel:${site.phone.replace(/[^0-9]/g, '')}`} variant="warm">
              <Phone className="w-4 h-4 fill-current" /> CALL NOW
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-fg-1 focus:outline-none" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#050D1A] flex flex-col p-6 text-fg-0 overflow-y-auto w-full h-full transform transition-transform translate-x-0">
          <div className="flex justify-end mb-8 shrink-0">
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 border border-line rounded-sm">
              <X className="w-8 h-8 text-fg-1" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-2xl font-display font-bold uppercase tracking-wider text-center">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-ice">Home</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-ice">About Us</Link>
            
            <div className="flex flex-col items-center gap-3">
              <button 
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-center gap-2 cursor-pointer hover:text-ice"
              >
                Services
                <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`flex flex-col gap-4 text-lg font-sans font-normal text-fg-1 overflow-hidden transition-all duration-300 ease-in-out ${servicesOpen ? 'max-h-[400px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <Link href="/services" onClick={() => setMobileMenuOpen(false)}>All Services</Link>
                <Link href="/services/residential" onClick={() => setMobileMenuOpen(false)}>Residential HVAC</Link>
                <Link href="/services/commercial" onClick={() => setMobileMenuOpen(false)}>Commercial HVAC</Link>
                <Link href="/services/refrigeration" onClick={() => setMobileMenuOpen(false)}>Commercial Refrigeration</Link>
                <Link href="/services/maintenance" onClick={() => setMobileMenuOpen(false)}>Maintenance Plans</Link>
              </div>
            </div>

            <Link href="/ac-repair" onClick={() => setMobileMenuOpen(false)} className="hover:text-ice">AC Repair</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-ice">Contact</Link>
          </nav>
          
          <div className="mt-auto pt-8 flex flex-col gap-4 shrink-0 pb-20">
            <Button href={`tel:${site.phone.replace(/[^0-9]/g, '')}`} variant="warm" className="w-full">
              <Phone className="w-5 h-5 fill-current" /> Call {site.phone}
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
