import { Section } from '@/components/ui/Section';
import { BentoGrid, BentoItem } from '@/components/ui/BentoGrid';
import { GlassBox } from '@/components/ui/GlassBox';
import { Button } from '@/components/ui/Button';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <Section className="!pt-32" bg="bg-0">
        <div className="max-w-3xl mb-12">
          <div className="text-sm font-bold tracking-widest text-ice-500 uppercase mb-4">Contact Us</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-0 mb-6">Let's Get You Comfortable.</h1>
          <p className="text-xl text-text-1">Call for emergencies, or use the form for quotes and service requests.</p>
        </div>
        
        <BentoGrid>
          <BentoItem colSpan={8}>
            <GlassBox className="h-full">
              <h3 className="text-2xl font-bold text-text-0 mb-6 font-display">Send a Message</h3>
              <form className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-text-0">Name</label>
                    <input type="text" className="bg-bg-2 border border-stroke rounded-sm p-3 text-text-0 focus:outline-none focus:border-ice-500" placeholder="John Doe" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-text-0">Phone</label>
                    <input type="tel" className="bg-bg-2 border border-stroke rounded-sm p-3 text-text-0 focus:outline-none focus:border-ice-500" placeholder="(555) 123-4567" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-text-0">Service Needed</label>
                  <select className="bg-bg-2 border border-stroke rounded-sm p-3 text-text-0 focus:outline-none focus:border-ice-500">
                    <option>AC Repair</option>
                    <option>Heating Repair</option>
                    <option>Commercial Refrigeration</option>
                    <option>Maintenance</option>
                    <option>Quote for Replacement</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-text-0">Message</label>
                  <textarea rows={4} className="bg-bg-2 border border-stroke rounded-sm p-3 text-text-0 focus:outline-none focus:border-ice-500" placeholder="How can we help?"></textarea>
                </div>
                <Button variant="primary" className="mt-4 self-start">Send Message</Button>
              </form>
            </GlassBox>
          </BentoItem>
          
          <BentoItem colSpan={4}>
            <div className="flex flex-col gap-4 h-full">
              <GlassBox className="flex-1 flex flex-col justify-center">
                <Phone className="w-6 h-6 text-ice-500 mb-3" />
                <h4 className="font-bold text-text-0 mb-1">Call Us</h4>
                <a href="tel:5551234567" className="text-text-1 hover:text-ice-400 text-lg font-bold">(555) 123-4567</a>
              </GlassBox>
              <GlassBox className="flex-1 flex flex-col justify-center">
                <Mail className="w-6 h-6 text-ice-500 mb-3" />
                <h4 className="font-bold text-text-0 mb-1">Email</h4>
                <p className="text-text-1">service@jmcomfort.com</p>
              </GlassBox>
              <GlassBox className="flex-1 flex flex-col justify-center">
                <Clock className="w-6 h-6 text-ember-500 mb-3" />
                <h4 className="font-bold text-text-0 mb-1">Emergency 24/7</h4>
                <p className="text-text-1">Standing by for rapid dispatch.</p>
              </GlassBox>
              <GlassBox className="flex-1 flex flex-col justify-center">
                <MapPin className="w-6 h-6 text-ice-500 mb-3" />
                <h4 className="font-bold text-text-0 mb-1">Service Area</h4>
                <p className="text-text-1">[CITY / SERVICE AREAS]</p>
              </GlassBox>
            </div>
          </BentoItem>
        </BentoGrid>
      </Section>
    </>
  );
}
