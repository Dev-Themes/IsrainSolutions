import { images } from '@/lib/images';

export type ServiceVariant = 'cool' | 'warm';

export interface ServicePageData {
  slug: string;
  name: string;
  shortName: string;
  variant: ServiceVariant;
  icon: 'House' | 'Building2' | 'Snowflake' | 'Wrench';
  tag: string;
  h1: { lead: string; accent: string };
  heroLead: string;
  heroImage: string;
  offerHeading: { lead: string; accent: string };
  offerSubtext: string;
  offers: Array<{
    icon: 'Zap' | 'Thermometer' | 'Wrench' | 'House' | 'Wind' | 'Siren' | 'Fan' | 'Building2' | 'HardHat' | 'ClipboardCheck' | 'Timer' | 'DoorOpen' | 'Snowflake' | 'Droplets' | 'Store' | 'Cog' | 'CalendarCheck' | 'Filter' | 'Brush' | 'Gauge' | 'Clock' | 'BadgePercent';
    title: string;
    description: string;
  }>;
  why: {
    tag: string;
    h2: { lead: string; accent: string };
    paragraphs: string[];
    checklist: string[];
    image: string;
  };
  faqs: Array<{ q: string; a: string }>;
  seo: { title: string; description: string };
  quoteParam: string;
}

export const servicePages: Record<string, ServicePageData> = {
  residential: {
    slug: 'residential',
    name: 'Residential HVAC',
    shortName: 'Residential',
    variant: 'cool',
    icon: 'House',
    tag: 'Residential HVAC',
    h1: { lead: 'Residential HVAC ', accent: 'Done Honestly' },
    heroLead: 'Complete home comfort from emergency repairs to new installs. We diagnose first and fix what is actually wrong, keeping your home comfortable all year.',
    heroImage: images.subservices.residential.hero,
    offerHeading: { lead: 'Our ', accent: 'Residential Services' },
    offerSubtext: 'Comprehensive air conditioning and heating solutions for your home.',
    offers: [
      { icon: 'Zap', title: 'AC Repair & Diagnostics', description: 'Full system testing on every call, so you see the cause before you approve the fix.' },
      { icon: 'Thermometer', title: 'Heating System Repair', description: 'Furnaces, heat pumps and electric heat brought back to dependable operation.' },
      { icon: 'Wrench', title: 'System Replacement', description: 'Properly sized equipment, offered only when repair no longer makes sense.' },
      { icon: 'House', title: 'New Installation', description: 'Clean, code-compliant installs for new builds, additions and upgrades.' },
      { icon: 'Wind', title: 'Mini-Split Systems', description: 'Ductless heating and cooling for additions, garages and hard-to-duct rooms.' },
      { icon: 'Siren', title: 'Emergency Service', description: 'Round-the-clock response when a system quits at the worst possible time.' }
    ],
    why: {
      tag: 'Why JM Comfort Solutions',
      h2: { lead: 'Honest Work in ', accent: 'Your Home' },
      paragraphs: [
        'We believe in finding the real issue instead of making a quick sale. Whether it is an iced-over suction line, a short-cycling furnace, or a complete replacement, our recommendations are backed by accurate test readings.',
        'You will always know what the repair costs before we turn a wrench, and we service all major brands.'
      ],
      checklist: [
        'Repair-first recommendations backed by test readings',
        'Written pricing before any work begins',
        'Same-day appointments for most repairs',
        'Licensed, insured, background-checked technicians',
        'Every major brand serviced',
        'Emergency line staffed 24/7'
      ],
      image: images.subservices.residential.why
    },
    faqs: [
      { q: 'How do I know if my AC should be repaired or replaced?', a: 'We measure compressor health, refrigerant levels and airflow. If the repair cost approaches half the value of a new unit, or if the system uses phased-out refrigerant, replacement might be smarter. We will show you the numbers so you can decide.' },
      { q: 'Do you charge for a diagnosis?', a: 'We charge a standard dispatch and diagnostic fee to cover the travel and the time required to pinpoint the exact failure. Once we find the issue, we provide a firm repair price. If you proceed with the repair, the diagnostic fee is often applied toward the work.' },
      { q: 'How fast can you get to me in an emergency?', a: 'During peak summer and winter extremes, our 24/7 emergency dispatch prioritizes homes with zero conditioning. We aim to have a technician on site within hours, and our trucks carry universal parts to restore operation on the first visit.' },
      { q: 'Can you install a mini-split in a room with no ductwork?', a: 'Yes. Ductless mini-splits are the perfect solution for sunrooms, garages, or additions where extending traditional ductwork is impossible. They require only a small wall penetration for the refrigerant lines and provide highly efficient, localized comfort.' }
    ],
    seo: {
      title: 'Residential HVAC Services | JM Comfort Solutions',
      description: 'AC repair, heating repair, replacement and installation for your home. Honest diagnosis, upfront pricing and 24/7 emergency service.'
    },
    quoteParam: 'residential-hvac'
  },
  commercial: {
    slug: 'commercial',
    name: 'Commercial HVAC',
    shortName: 'Commercial',
    variant: 'warm',
    icon: 'Building2',
    tag: 'Commercial HVAC',
    h1: { lead: 'Commercial HVAC ', accent: 'That Keeps Business Moving' },
    heroLead: 'Rooftop unit repair, multi-tenant service, new installs and service agreements for businesses. Fast response and 24/7 emergency calls.',
    heroImage: images.subservices.commercial.hero,
    offerHeading: { lead: 'Our ', accent: 'Commercial Services' },
    offerSubtext: 'Dependable climate control for offices, retail spaces, and industrial properties.',
    offers: [
      { icon: 'Wrench', title: 'Commercial Repair', description: 'Fast diagnosis that keeps downtime short and tenants comfortable.' },
      { icon: 'Fan', title: 'Rooftop Units', description: 'Service, repair and replacement for package and rooftop equipment.' },
      { icon: 'Building2', title: 'Multi-Tenant Properties', description: 'Consistent service across suites, floors and shared systems.' },
      { icon: 'HardHat', title: 'New Installation & Build-Outs', description: 'Equipment sizing and installation for new and renovated spaces.' },
      { icon: 'ClipboardCheck', title: 'Service Agreements', description: 'Scheduled visits that keep equipment clean, tested and documented.' },
      { icon: 'Timer', title: 'Priority Response', description: 'Commercial calls handled first when your business is losing time.' }
    ],
    why: {
      tag: 'Why JM Comfort Solutions',
      h2: { lead: 'Built Around Your ', accent: 'Uptime' },
      paragraphs: [
        'A failed rooftop unit means lost productivity, uncomfortable tenants, and impacted revenue. We arrive ready to diagnose complex multi-zone systems, broken economizers, and failing compressors.',
        'We provide written scopes of work so property managers and business owners can approve repairs confidently and get operations back to normal.'
      ],
      checklist: [
        'Fast-response commercial dispatch',
        'Written scope and pricing ready for approval',
        'Experience with rooftop, split and multi-zone systems',
        'Documentation property managers can file',
        'After-hours and weekend coverage',
        'One team for HVAC and refrigeration'
      ],
      image: images.subservices.commercial.why
    },
    faqs: [
      { q: 'How quickly can you respond to a no-cooling call at my business?', a: 'We prioritize commercial emergencies because we understand the cost of downtime. Our dispatch routes emergency commercial calls to the front of the board, aiming for same-day resolution.' },
      { q: 'Do you offer service agreements for multiple locations?', a: 'Yes. We build custom maintenance agreements for property management groups and franchises covering multiple locations. You get consistent reporting and priority dispatch across your entire portfolio.' },
      { q: 'Can work be scheduled after business hours?', a: 'Absolutely. We regularly schedule major repairs, crane lifts, and full unit replacements during nights or weekends to ensure zero disruption to your daily operations or your customers.' },
      { q: 'Do you handle both HVAC and refrigeration for restaurants?', a: 'Yes. We are cross-trained in both commercial HVAC and commercial refrigeration, meaning restaurant owners only need to make one call for a down dining room AC or a failing walk-in cooler.' }
    ],
    seo: {
      title: 'Commercial HVAC Services | JM Comfort Solutions',
      description: 'Rooftop unit repair, multi-tenant service, new installs and service agreements for businesses. Fast response and 24/7 emergency calls.'
    },
    quoteParam: 'commercial-hvac'
  },
  refrigeration: {
    slug: 'refrigeration',
    name: 'Commercial Refrigeration',
    shortName: 'Refrigeration',
    variant: 'cool',
    icon: 'Snowflake',
    tag: 'Commercial Refrigeration',
    h1: { lead: 'Commercial Refrigeration ', accent: 'That Stays Cold' },
    heroLead: 'Walk-in cooler, freezer, ice machine and display case repair for restaurants and stores. Fast emergency response, any hour.',
    heroImage: images.subservices.refrigeration.hero,
    offerHeading: { lead: 'Our ', accent: 'Refrigeration Services' },
    offerSubtext: 'Protecting your inventory with rapid-response refrigeration repair.',
    offers: [
      { icon: 'DoorOpen', title: 'Walk-In Coolers', description: 'Temperature faults, fan and door issues, and system tune-ups.' },
      { icon: 'Snowflake', title: 'Walk-In Freezers', description: 'Defrost problems, frost build-up and compressor troubleshooting.' },
      { icon: 'Droplets', title: 'Ice Machines', description: 'Repair and cleaning for machines that stall, under-produce or leak.' },
      { icon: 'Store', title: 'Display Cases & Reach-Ins', description: 'Keeping merchandising and prep equipment at safe temperatures.' },
      { icon: 'Cog', title: 'Condensing Units & Compressors', description: 'Diagnosis and repair of the hardware doing the heavy work.' },
      { icon: 'Siren', title: 'Emergency Calls', description: 'Rapid response when product is at risk and every minute counts.' }
    ],
    why: {
      tag: 'Why JM Comfort Solutions',
      h2: { lead: 'Protect Your Product, ', accent: 'Protect Your Margin' },
      paragraphs: [
        'When a walk-in cooler drops pressure or an evaporator coil freezes over, you are racing against the clock. We understand that warm product is lost money.',
        'Our technicians diagnose erratic defrost cycles, low refrigerant, and failing fan motors with a repair-first mindset, ensuring your equipment stays reliable and food-safe.'
      ],
      checklist: [
        'Temperature readings recorded on every visit',
        'Fast response when stock is at risk',
        'Experience across walk-ins, reach-ins and ice machines',
        'Repair-first instead of default replacement',
        'Food-safety-minded service practices',
        'One call for HVAC and refrigeration'
      ],
      image: images.subservices.refrigeration.why
    },
    faqs: [
      { q: 'What should I do first when my walk-in cooler stops cooling?', a: 'Keep the doors closed to preserve temperature. Check that the breaker has not tripped and ensure the condenser coil is not blocked by boxes or debris. Then, call us immediately for emergency dispatch.' },
      { q: 'Can you repair ice machines that stall or leak?', a: 'Yes. We repair stalled harvest cycles, water inlet valve failures, and scaling issues on all major commercial ice machine brands. We also perform deep chemical descale cleanings.' },
      { q: 'Do you service restaurants and convenience stores?', a: 'We service all food retail and preparation environments, including dedicated restaurant walk-ins, convenience store reach-in beverage coolers, and specialized prep tables.' },
      { q: 'Do you offer preventive refrigeration maintenance?', a: 'Yes. Condenser coils on refrigeration equipment clog quickly with grease and dust. Regular maintenance keeps head pressure down, preventing expensive compressor failures and extending equipment life.' }
    ],
    seo: {
      title: 'Commercial Refrigeration Repair | JM Comfort Solutions',
      description: 'Walk-in cooler, freezer, ice machine and display case repair for restaurants and stores. Fast emergency response, any hour.'
    },
    quoteParam: 'commercial-refrigeration'
  },
  maintenance: {
    slug: 'maintenance',
    name: 'HVAC Maintenance Plans',
    shortName: 'Maintenance',
    variant: 'warm',
    icon: 'Wrench',
    tag: 'Maintenance Plans',
    h1: { lead: 'HVAC Maintenance Plans ', accent: 'That Prevent Breakdowns' },
    heroLead: 'Seasonal tune-ups, coil cleaning, filter service and priority scheduling for homes and businesses. Prevent breakdowns before they start.',
    heroImage: images.subservices.maintenance.hero,
    offerHeading: { lead: 'What Our ', accent: 'Plans Include' },
    offerSubtext: 'Consistent care that extends the life of your equipment and lowers your energy bills.',
    offers: [
      { icon: 'CalendarCheck', title: 'Seasonal Tune-Ups', description: 'Spring and fall visits that prepare equipment for peak demand.' },
      { icon: 'Filter', title: 'Filter Service', description: 'Scheduled filter changes that protect airflow and indoor air quality.' },
      { icon: 'Brush', title: 'Coil Cleaning', description: 'Clean evaporator and condenser coils for better efficiency and longer life.' },
      { icon: 'Gauge', title: 'Refrigerant & Pressure Checks', description: 'Readings verified and recorded, not guessed.' },
      { icon: 'Clock', title: 'Priority Scheduling', description: 'Plan members move to the front of the line.' },
      { icon: 'BadgePercent', title: 'Member Repair Pricing', description: 'Reduced rates on repairs found between visits.' }
    ],
    why: {
      tag: 'Why JM Comfort Solutions',
      h2: { lead: 'Small Visits, ', accent: 'Fewer Emergencies' },
      paragraphs: [
        'A clogged filter or a dirty condenser coil forces your compressor to work harder, pulling more electricity and shortening its lifespan. Routine maintenance corrects these minor issues before they trigger a system lockout.',
        'We document our inspections, clean the critical components, and provide a clear report on system health without high-pressure sales tactics.'
      ],
      checklist: [
        'Documented inspection after every visit',
        'Plans for homes and for businesses',
        'Reminders before each season',
        'Priority booking for members',
        'Reduced repair rates for members',
        'You decide what to fix, never pressure'
      ],
      image: images.subservices.maintenance.why
    },
    faqs: [
      { q: 'How often should my HVAC system be serviced?', a: 'We recommend two visits per year for standard heat pump or split systems: once in the spring before peak cooling season, and once in the fall before you turn on the heat.' },
      { q: 'What happens during a maintenance visit?', a: 'We clear drain lines, test capacitors under load, measure amp draw on motors, inspect electrical connections, verify refrigerant pressures, and clean the outdoor coil. You receive a full health report.' },
      { q: 'Is a plan worth it for newer equipment?', a: 'Yes. Almost all manufacturer warranties require proof of annual professional maintenance to remain valid. A plan ensures your warranty stays intact and your new system runs at its rated efficiency.' },
      { q: 'Can I include commercial refrigeration in a plan?', a: 'Absolutely. We customize commercial plans to include rooftop HVAC units, ice machines, and walk-in coolers, ensuring all critical equipment is cleaned and tested on a regular schedule.' }
    ],
    seo: {
      title: 'HVAC Maintenance Plans | JM Comfort Solutions',
      description: 'Seasonal tune-ups, coil cleaning, filter service and priority scheduling for homes and businesses. Prevent breakdowns before they start.'
    },
    quoteParam: 'maintenance-plans'
  }
};

export const serviceSlugs = Object.keys(servicePages);
