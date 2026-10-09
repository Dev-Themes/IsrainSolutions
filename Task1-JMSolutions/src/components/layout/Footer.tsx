import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock } from 'lucide-react';
import { LogoGlow } from '../ui/LogoGlow';
import { cn } from '@/lib/utils';
import { serviceAreas } from '@/config/serviceAreas';
import { site } from '@/config/site';

export default function Footer() {
  const linkClass = "group flex items-center text-fg-1 hover:text-ice transition-colors";
  const bulletClass = "w-0 h-[2px] bg-[image:var(--grad-cool)] mr-0 transition-all duration-300 ease-out group-hover:w-3 group-hover:mr-2 opacity-0 group-hover:opacity-100";

  return (
    <footer className="relative bg-bg-0 pt-16 pb-24 md:pb-8 isolate overflow-hidden mt-12">
      {/* 2px gradient hairline at the top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[image:var(--grad-brand)]"></div>
      
      {/* Contour texture at low opacity */}
      {/* Handled via global texture class or inline SVG pattern if available, for now just a faint noise/gradient fallback */}
      <div className="absolute inset-0 -z-10 opacity-[0.05] pointer-events-none bg-[url(/textures/contours.svg)] bg-repeat"></div>
      
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 relative z-10">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-6 items-start">
          <LogoGlow>
            <Image 
              src="/logo-removebg-preview.png" 
              alt={site.name} 
              width={200} 
              height={60}
              className="h-[60px] w-auto object-contain"
            />
          </LogoGlow>
          <p className="text-fg-1 text-[16px] leading-relaxed max-w-[280px]">
            Locally owned HVAC and refrigeration serving {site.metroArea}. Honest answers. Fair prices. We treat your money like it's our own.
          </p>
          <p className="font-display italic text-[24px] font-bold text-brand-gradient tracking-wide">
            Comfort, Engineered.
          </p>
          <div className="flex gap-3">
            <a href="#" className="flex items-center justify-center w-10 h-10 border border-line bg-card hover:bg-[image:var(--grad-brand)] transition-all text-fg-1 hover:text-white rounded-[4px] clip-chamfer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </a>
            <a href="#" className="flex items-center justify-center w-10 h-10 border border-line bg-card hover:bg-[image:var(--grad-brand)] transition-all text-fg-1 hover:text-white rounded-[4px] clip-chamfer">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Services Column */}
        <div>
          <h4 className="font-bold text-fg-0 mb-6 font-display text-[20px] uppercase tracking-wide">Services</h4>
          <ul className="flex flex-col gap-4 text-[16px]">
            <li><Link href="/services/residential" className={linkClass}><span className={bulletClass}></span>Residential HVAC</Link></li>
            <li><Link href="/services/commercial" className={linkClass}><span className={bulletClass}></span>Commercial HVAC</Link></li>
            <li><Link href="/services/refrigeration" className={linkClass}><span className={bulletClass}></span>Commercial Refrigeration</Link></li>
            <li><Link href="/services/maintenance" className={linkClass}><span className={bulletClass}></span>Maintenance Plans</Link></li>
            <li><Link href="/ac-repair" className={linkClass}><span className={bulletClass}></span>AC Repair</Link></li>
          </ul>
        </div>
        
        {/* Company Column */}
        <div>
          <h4 className="font-bold text-fg-0 mb-6 font-display text-[20px] uppercase tracking-wide">Company</h4>
          <ul className="flex flex-col gap-4 text-[16px]">
            <li><Link href="/about" className={linkClass}><span className={bulletClass}></span>About Us</Link></li>
            <li><Link href="/contact" className={linkClass}><span className={bulletClass}></span>Contact</Link></li>
            <li><Link href="/reviews" className={linkClass}><span className={bulletClass}></span>Reviews</Link></li>
            <li><Link href="/services" className={linkClass}><span className={bulletClass}></span>All Services</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-bold text-fg-0 mb-6 font-display text-[20px] uppercase tracking-wide">Contact</h4>
          <ul className="flex flex-col gap-5 text-[16px] text-fg-1">
            <li className="flex gap-3 items-start">
              <Phone className="w-5 h-5 text-ember shrink-0 mt-1" />
              <div className="flex flex-col">
                <span className="text-[14px] uppercase tracking-widest text-fg-2">Emergency Line</span>
                <a href={`tel:${site.phone.replace(/[^0-9]/g, '')}`} className="hover:text-ice font-bold text-[18px] text-fg-0">{site.phone}</a>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-ice shrink-0 mt-1" />
              <div className="flex flex-col">
                <span className="text-[14px] uppercase tracking-widest text-fg-2">Address</span>
                <span className="text-fg-0">{site.address}, {site.city}, {site.state} {site.zip}</span>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <Clock className="w-5 h-5 text-ice shrink-0 mt-1" />
              <div className="flex flex-col">
                <span className="text-[14px] uppercase tracking-widest text-fg-2">Availability</span>
                <span className="text-fg-0">{site.hours}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="container-custom pt-8 border-t border-line text-[14px] text-fg-2 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left relative z-10">
        <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <span>License TACLB12345E</span>
          <span className="hidden md:inline text-line">|</span>
          <span>Serving {site.metroArea}</span>
          <span className="hidden md:inline text-line">|</span>
          <Link href="/privacy" className="hover:text-ice transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-ice transition-colors">Terms</Link>
          <Link href="/credits" className="hover:text-ice transition-colors">Photo Credits</Link>
        </div>
      </div>
    </footer>
  );
}

