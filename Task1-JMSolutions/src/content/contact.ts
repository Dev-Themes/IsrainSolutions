import { servicePages } from './service-pages';

export interface ContactPageData {
  slug: 'contact';
  h1: { lead: string; accent: string };
  heroLead: string;
  tag: string;
  requestTypes: Array<{
    id: 'emergency' | 'schedule';
    label: string;
    description: string;
  }>;
  services: Array<{ value: string; label: string }>;
  process: [
    { title: string; description: string },
    { title: string; description: string },
    { title: string; description: string }
  ];
  faqs: [
    { q: string; a: string },
    { q: string; a: string },
    { q: string; a: string }
  ];
  seo: { title: string; description: string };
}

const mappedServices = Object.values(servicePages).map((s) => ({
  value: s.slug,
  label: s.name,
}));

mappedServices.push({ value: 'not-sure', label: 'Not sure yet' });

export const contactPageData: ContactPageData = {
  slug: 'contact',
  h1: {
    lead: 'Talk to a Technician',
    accent: 'Today',
  },
  heroLead:
    'Our emergency line is answered 24 hours a day. For non-emergencies, we schedule a confirmed arrival window so you never have to wait around.',
  tag: 'Get In Touch',
  requestTypes: [
    {
      id: 'emergency',
      label: 'Emergency (ASAP)',
      description: 'We dispatch the first available technician.',
    },
    {
      id: 'schedule',
      label: 'Schedule a visit',
      description: 'We will confirm a time that works for you.',
    },
  ],
  services: mappedServices,
  process: [
    {
      title: 'Confirm the request',
      description:
        'A dispatcher calls you back to confirm the problem and the access details.',
    },
    {
      title: 'Set the window',
      description:
        'We agree on an arrival window and tell you who is coming.',
    },
    {
      title: 'Diagnose first',
      description:
        'The technician runs test readings, explains the findings in writing, and waits for your approval before any repair.',
    },
  ],
  faqs: [
    {
      q: 'How fast will someone contact me after I send a request?',
      a: 'During normal hours, our dispatcher calls back shortly to confirm the details. If you choose the emergency option, we prioritize your call to dispatch the closest available technician.',
    },
    {
      q: 'What should I have ready when I call?',
      a: 'It helps to know the address, the brand and model from the unit\'s data plate if accessible, the current thermostat setting, and a brief description of the issue—like whether it has stopped completely or is making an unusual noise.',
    },
    {
      q: 'Do I need to be home for the visit?',
      a: 'Yes, an adult with the authority to approve work must be present. The technician will ask for approval before starting any repairs.',
    },
  ],
  seo: {
    title: 'Contact JM Comfort Solutions | 24/7 HVAC Service',
    description:
      'Request HVAC repair, installation or maintenance online, or call our 24/7 emergency line. Clear scheduling and written pricing before any work begins.',
  },
};
