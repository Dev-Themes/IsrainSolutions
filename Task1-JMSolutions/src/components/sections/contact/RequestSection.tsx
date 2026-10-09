import { Section } from '@/components/ui/Section';
import { ContactForm } from './ContactForm';
import { ContactSidebar } from './ContactSidebar';

export function RequestSection() {
  return (
    <Section bg="band" id="request" className="py-20 lg:py-32 scroll-mt-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-10 lg:gap-16 items-start max-w-[1280px] mx-auto 2xl:max-w-[1440px]">
          <div className="w-full">
            <ContactForm />
          </div>
          <div className="w-full lg:sticky lg:top-32">
            <ContactSidebar />
          </div>
        </div>
      </div>
    </Section>
  );
}
