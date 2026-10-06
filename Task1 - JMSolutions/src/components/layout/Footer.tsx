import Link from 'next/link';
import { TriTagline } from '../ui/TriTagline';

export default function Footer() {
  return (
    <footer className="bg-bg-1 border-t border-brand-gradient/30 pt-16 pb-24 md:pb-8">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="flex flex-col gap-6">
          <span className="font-display font-bold text-2xl tracking-wide text-text-0">
            <span className="text-ice-500">JM</span> COMFORT
          </span>
          <p className="text-text-1 text-sm leading-relaxed">
            Honest diagnosis. Right-sized solutions. JM Comfort Solutions diagnoses honestly, repairs right, and keeps your home and business running.
          </p>
          <TriTagline />
        </div>
        
        <div>
          <h4 className="font-bold text-text-0 mb-6 font-display">Services</h4>
          <ul className="flex flex-col gap-3 text-sm text-text-1">
            <li className="group flex items-center"><span className="w-0 h-[2px] bg-ice-400 mr-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:mr-3"></span><Link href="/services#cooling" className="group-hover:text-ice-400 transition-colors duration-300">Cooling & AC Repair</Link></li>
            <li className="group flex items-center"><span className="w-0 h-[2px] bg-ember-400 mr-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:mr-3"></span><Link href="/services#heating" className="group-hover:text-ember-400 transition-colors duration-300">Heating & Furnaces</Link></li>
            <li className="group flex items-center"><span className="w-0 h-[2px] bg-cryo-400 mr-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:mr-3"></span><Link href="/services#refrigeration" className="group-hover:text-cryo-400 transition-colors duration-300">Commercial Refrigeration</Link></li>
            <li className="group flex items-center"><span className="w-0 h-[2px] bg-text-0 mr-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:mr-3"></span><Link href="/services#plans" className="group-hover:text-text-0 transition-colors duration-300">Maintenance Plans</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-text-0 mb-6 font-display">Company</h4>
          <ul className="flex flex-col gap-3 text-sm text-text-1">
            <li className="group flex items-center"><span className="w-0 h-[2px] bg-ice-500 mr-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:mr-3"></span><Link href="/about" className="group-hover:text-ice-500 transition-colors duration-300">About Us</Link></li>
            <li className="group flex items-center"><span className="w-0 h-[2px] bg-ice-500 mr-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:mr-3"></span><Link href="/contact" className="group-hover:text-ice-500 transition-colors duration-300">Contact</Link></li>
            <li className="group flex items-center"><span className="w-0 h-[2px] bg-ice-500 mr-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:mr-3"></span><Link href="/privacy" className="group-hover:text-ice-500 transition-colors duration-300">Privacy Policy</Link></li>
            <li className="group flex items-center"><span className="w-0 h-[2px] bg-ice-500 mr-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:mr-3"></span><Link href="/terms" className="group-hover:text-ice-500 transition-colors duration-300">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-text-0 mb-6 font-display">Contact</h4>
          <ul className="flex flex-col gap-3 text-sm text-text-1">
            <li><a href="tel:5551234567" className="hover:text-ice-400 font-bold text-lg text-text-0">(555) 123-4567</a></li>
            <li>Emergency Dispatch 24/7</li>
            <li className="mt-2 text-text-2">service@jmcomfort.com</li>
            <li className="text-text-2">Springfield & Surrounding Areas</li>
          </ul>
        </div>
      </div>
      
      <div className="container-custom pt-8 border-t border-stroke text-sm text-text-2 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} JM Comfort Solutions, LLC. All rights reserved.</p>
        <p>License #TACLB123456E</p>
      </div>
    </footer>
  );
}
