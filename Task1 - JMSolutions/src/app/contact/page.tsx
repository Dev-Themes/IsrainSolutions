import TriColorTagline from "@/components/TriColorTagline";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

export const metadata = {
  title: "Contact Us | JM Comfort Solutions",
  description: "Get in touch with JM Comfort Solutions for a free quote or emergency service.",
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-navy-950 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/contours.svg')] opacity-10"></div>
        <div className="container-custom relative z-10 text-center">
          <TriColorTagline />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mt-6 mb-4">Let's Get You Comfortable.</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">Call for immediate service or request a quote online.</p>
        </div>
      </div>

      <div className="container-custom py-20">
         <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">Send us a Message</h2>
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-navy-900 mb-2">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cool-500" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-navy-900 mb-2">Phone</label>
                    <input type="tel" id="phone" className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cool-500" placeholder="(555) 123-4567" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-navy-900 mb-2">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cool-500" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-bold text-navy-900 mb-2">Service Needed</label>
                  <select id="service" className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cool-500">
                    <option>Heating</option>
                    <option>Cooling</option>
                    <option>Commercial Refrigeration</option>
                    <option>Maintenance / Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-navy-900 mb-2">Message</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cool-500" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full bg-heat-600 text-white font-bold py-4 rounded-md hover:bg-heat-500 transition-colors shadow-soft">
                  Request Service
                </button>
              </form>
            </div>
            
            <div className="bg-mist p-6 sm:p-8 md:p-12 rounded-2xl border border-gray-100">
               <h2 className="text-3xl font-display font-bold text-navy-900 mb-8">Contact Information</h2>
               <ul className="space-y-6 text-lg">
                 <li className="flex gap-4">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm"><Phone className="text-heat-600 w-6 h-6" /></div>
                   <div>
                     <span className="block font-bold text-navy-900">Phone</span>
                     <a href="tel:5551234567" className="text-ink-500 hover:text-heat-500 transition-colors">(555) 123-4567</a>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm"><Mail className="text-cool-600 w-6 h-6" /></div>
                   <div>
                     <span className="block font-bold text-navy-900">Email</span>
                     <a href="mailto:info@jmcomfort.com" className="text-ink-500 hover:text-cool-600 transition-colors">info@jmcomfort.com</a>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm"><MapPin className="text-navy-900 w-6 h-6" /></div>
                   <div>
                     <span className="block font-bold text-navy-900">Address</span>
                     <span className="text-ink-500 block">123 Comfort Way, Houston, TX 77001</span>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm"><Clock className="text-heat-500 w-6 h-6" /></div>
                   <div>
                     <span className="block font-bold text-navy-900">Hours</span>
                     <span className="text-ink-500 block">Mon-Fri 8am-5pm</span>
                     <span className="text-heat-600 font-bold text-sm mt-1 block">24/7 Emergency Service Available</span>
                   </div>
                 </li>
               </ul>
            </div>
         </div>
      </div>
    </>
  );
}
