"use client";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function Contact() {
  return (
    <>
      <Section className="py-24" bg="bg-0">
        <div className="container-custom">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-[image:var(--grad-brand)] text-ice text-[12px] font-nav font-bold tracking-[.24em] uppercase">
            CONTACT US
          </div>
          <h1 className="text-5xl font-display font-bold text-fg-0 mb-6">
            Let's Get You <span className="text-brand-gradient">Comfortable.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Name" className="p-3 bg-card border border-line rounded-[8px] text-fg-0" />
              <input type="tel" placeholder="Phone" className="p-3 bg-card border border-line rounded-[8px] text-fg-0" />
              <input type="email" placeholder="Email" className="p-3 bg-card border border-line rounded-[8px] text-fg-0" />
              <textarea placeholder="Message" className="p-3 bg-card border border-line rounded-[8px] text-fg-0 h-32"></textarea>
              <Button type="submit" variant="primary">Send Message</Button>
            </form>
            <div>
               <h3 className="text-xl font-bold font-display text-fg-0 mb-4">Contact Information</h3>
               <p className="text-fg-1 mb-2"><strong>Emergency Line:</strong> (555) 123-4567</p>
               <p className="text-fg-1 mb-2"><strong>Email:</strong> info@jmcomfort.com</p>
               <p className="text-fg-1 mb-2"><strong>Service Area:</strong> Greater Houston Area</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
