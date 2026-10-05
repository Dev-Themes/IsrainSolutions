import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock } from "lucide-react";
import TriColorTagline from "./TriColorTagline";

export default function Footer() {
  const FooterLink = ({ href, text, hoverColor }: { href: string, text: string, hoverColor: string }) => (
    <li>
      <Link href={href} className={"group flex items-center text-ink-700 transition-all duration-300 " + hoverColor}>
        <span className="h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-3 group-hover:mr-2"></span>
        <span>{text}</span>
      </Link>
    </li>
  );

  return (
    <footer className="bg-mist text-navy-900 relative pt-16 pb-8 border-t-2 border-brand-gradient">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-gradient"></div>
      
      <div className="container-custom relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="space-y-1">
          <div className="">
             <Image src="/logo-removebg-preview.png" alt="JM Comfort Solutions" width={120} height={40} className="h-30 w-auto object-contain" quality={100} />
          </div>
          <p className="text-ink-700 leading-relaxed text-sm">
            Honest diagnosis. Right-sized solutions. JM Comfort Solutions diagnoses honestly, repairs right, and keeps your home and business running.
          </p>
          <div className="flex space-x-4 mt-[10px]">
             <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center hover:bg-cool-600 hover:text-white transition-colors cursor-pointer hover:-translate-y-1 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
             </a>
             <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center hover:bg-cool-600 hover:text-white transition-colors cursor-pointer hover:-translate-y-1 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
             </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-display font-bold mb-6 tracking-wide text-navy-900">Services</h3>
          <ul className="space-y-4 text-sm font-medium">
            <FooterLink href="/services#heating" text="Heating Repair & Install" hoverColor="hover:text-heat-600" />
            <FooterLink href="/services#cooling" text="Cooling Services" hoverColor="hover:text-cool-600" />
            <FooterLink href="/services#refrigeration" text="Commercial Refrigeration" hoverColor="hover:text-cool-600" />
            <FooterLink href="/services#maintenance" text="Maintenance Plans" hoverColor="hover:text-navy-900" />
            <FooterLink href="/services#iaq" text="Indoor Air Quality" hoverColor="hover:text-navy-900" />
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-display font-bold mb-6 tracking-wide text-navy-900">Company</h3>
          <ul className="space-y-4 text-sm font-medium">
            <FooterLink href="/about" text="About Us" hoverColor="hover:text-cool-600" />
            <FooterLink href="/contact" text="Contact" hoverColor="hover:text-cool-600" />
            <FooterLink href="/service-areas" text="Service Areas" hoverColor="hover:text-cool-600" />
            <FooterLink href="/reviews" text="Reviews" hoverColor="hover:text-cool-600" />
            <FooterLink href="/faq" text="FAQ" hoverColor="hover:text-cool-600" />
          </ul>
        </div>

        {/* Contact/Hours */}
        <div>
          <h3 className="text-lg font-display font-bold mb-6 tracking-wide text-navy-900">Contact Us</h3>
          <ul className="space-y-4 text-ink-700 text-sm font-medium">
            <li className="flex gap-3">
              <Phone className="w-5 h-5 text-heat-600 shrink-0" />
              <a href="tel:5551234567" className="hover:text-heat-600 transition-colors">(555) 123-4567</a>
            </li>
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 text-cool-600 shrink-0" />
              <span>123 Comfort Way, Houston, TX</span>
            </li>
            <li className="flex gap-3">
              <Clock className="w-5 h-5 text-cool-600 shrink-0" />
              <span>Mon-Fri 8am-5pm<br/><span className="text-heat-600 font-bold mt-1 inline-block">24/7 Emergency Service</span></span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-custom pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <TriColorTagline />
        <div className="text-ink-500 text-xs flex flex-wrap gap-4 items-center font-medium">
          <span>&copy; {new Date().getFullYear()} JM Comfort Solutions.</span>
          <span>License TACLA123456C</span>
          <Link href="/privacy" className="hover:text-navy-900 transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
