export const servicesHero = {
  tag: "Services",
  h1Part1: "HVAC & Refrigeration ",
  h1Accent: "Services",
  lead: "Residential comfort, commercial HVAC, walk-in coolers and planned maintenance, all from one locally owned team that tells you what's wrong before it tells you what to buy.",
  facts: [
    "Residential & commercial",
    "24/7 emergency service",
    "Repair-first approach"
  ],
  index: [
    { label: "Residential HVAC", href: "#residential-hvac" },
    { label: "Commercial HVAC", href: "#commercial-hvac" },
    { label: "Commercial Refrigeration", href: "#commercial-refrigeration" },
    { label: "Maintenance Plans", href: "#maintenance-plans" }
  ]
};

export type ServiceVariant = 'cool' | 'warm';
export type ServiceMediaSide = 'left' | 'right';

export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServiceBlockData {
  id: string;
  anchor: string;
  variant: ServiceVariant;
  mediaSide: ServiceMediaSide;
  icon: 'House' | 'Building2' | 'Snowflake' | 'Wrench';
  tag: string;
  h2Part1: string;
  h2Accent: string;
  intro: string;
  items: ServiceItem[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  emergencyCard: { headline: string; text: string };
  imageAlt: string;
  imageKey: 'residential' | 'commercial' | 'refrigeration' | 'maintenance';
}

export const services: ServiceBlockData[] = [
  {
    id: "residential",
    anchor: "residential-hvac",
    variant: "cool",
    mediaSide: "left",
    icon: "House",
    tag: "Comfort for the Home You Live In",
    h2Part1: "Residential ",
    h2Accent: "HVAC",
    intro: "From an AC that can't keep up in the middle of summer to a furnace that won't light in January, we diagnose first and fix what is actually wrong. When a system truly has reached the end of its life, we size the replacement to your home instead of selling you the biggest unit on the truck.",
    items: [
      { title: "AC Repair & Diagnostics", description: "Full system testing on every call, so you see the cause before you approve the fix." },
      { title: "Heating Repair", description: "Furnaces, heat pumps and electric heat brought back to dependable operation." },
      { title: "System Replacement", description: "Properly sized equipment, offered only when repair no longer makes sense." },
      { title: "New Installation", description: "Clean, code-compliant installs for new builds, additions and upgrades." },
      { title: "Mini-Split Systems", description: "Ductless heating and cooling for additions, garages and hard-to-duct rooms." },
      { title: "Emergency Service", description: "Round-the-clock response when a system quits at the worst possible time." }
    ],
    primaryCta: { label: "Learn More", href: "/services/residential" },
    secondaryCta: { label: "Get a Free Quote", href: "/contact" },
    emergencyCard: { headline: "No Heat or No Cooling?", text: "Call any hour. We'll get a technician headed your way." },
    imageAlt: "Outdoor air conditioner condenser unit beside a wooden fence",
    imageKey: "residential"
  },
  {
    id: "commercial",
    anchor: "commercial-hvac",
    variant: "warm",
    mediaSide: "right",
    icon: "Building2",
    tag: "Uptime for Your Property",
    h2Part1: "Commercial ",
    h2Accent: "HVAC",
    intro: "Offices, retail spaces, restaurants and multi-tenant buildings can't afford a dead rooftop unit. We service package units, split systems and multi-zone setups with fast response and clear written options, so you can plan around the repair instead of absorbing the surprise.",
    items: [
      { title: "Commercial Repair", description: "Fast diagnosis that keeps downtime short and tenants comfortable." },
      { title: "Rooftop Units", description: "Service, repair and replacement for package and rooftop equipment." },
      { title: "Multi-Tenant Properties", description: "Consistent service across suites, floors and shared systems." },
      { title: "Build-Outs & New Installs", description: "Equipment sizing and installation for new and renovated spaces." },
      { title: "Service Agreements", description: "Scheduled visits that keep equipment clean, tested and documented." },
      { title: "Priority Response", description: "Commercial calls handled first when your business is losing time." }
    ],
    primaryCta: { label: "Learn More", href: "/services/commercial" },
    secondaryCta: { label: "Call Now: +1 555-123-4567", href: "tel:5551234567" },
    emergencyCard: { headline: "Rooftop Unit Down?", text: "We pick up around the clock. Tell us what's failing and we'll start the dispatch." },
    imageAlt: "Commercial rooftop HVAC units on a flat roof",
    imageKey: "commercial"
  },
  {
    id: "refrigeration",
    anchor: "commercial-refrigeration",
    variant: "cool",
    mediaSide: "left",
    icon: "Snowflake",
    tag: "The Cold Side of the Business",
    h2Part1: "Commercial ",
    h2Accent: "Refrigeration",
    intro: "Warm product costs real money. Our refrigeration work covers the equipment restaurants, grocers and convenience stores depend on every hour of the day, diagnosed with the same repair-first honesty as our HVAC service.",
    items: [
      { title: "Walk-In Coolers", description: "Temperature faults, fan and door issues, and system tune-ups." },
      { title: "Walk-In Freezers", description: "Defrost problems, frost build-up and compressor troubleshooting." },
      { title: "Ice Machines", description: "Repair and cleaning for machines that stall, under-produce or leak." },
      { title: "Display Cases & Reach-Ins", description: "Keeping merchandising and prep equipment at safe temperatures." },
      { title: "Condensing Units & Compressors", description: "Diagnosis and repair of the hardware doing the heavy work." },
      { title: "Emergency Calls", description: "Rapid response when product is at risk and every minute counts." }
    ],
    primaryCta: { label: "Learn More", href: "/services/refrigeration" },
    secondaryCta: { label: "Call Now: +1 555-123-4567", href: "tel:5551234567" },
    emergencyCard: { headline: "Cooler or Freezer Down?", text: "Don't wait on spoiled stock. Call now and we'll prioritize your equipment." },
    imageAlt: "Commercial refrigeration condensing unit mounted outdoors",
    imageKey: "refrigeration"
  },
  {
    id: "maintenance",
    anchor: "maintenance-plans",
    variant: "warm",
    mediaSide: "right",
    icon: "Wrench",
    tag: "Fewer Surprises, Longer Equipment Life",
    h2Part1: "Maintenance ",
    h2Accent: "Plans",
    intro: "A planned visit costs less than an emergency one. Our maintenance plans keep residential and commercial equipment clean, calibrated and documented, so small problems get caught while they are still small.",
    items: [
      { title: "Seasonal Tune-Ups", description: "Spring and fall visits that prepare equipment for peak demand." },
      { title: "Filter Service", description: "Scheduled filter changes that protect airflow and indoor air quality." },
      { title: "Coil Cleaning", description: "Clean evaporator and condenser coils for better efficiency and longer life." },
      { title: "Refrigerant & Pressure Checks", description: "Readings verified and recorded, not guessed." },
      { title: "Priority Scheduling", description: "Plan members move to the front of the line." },
      { title: "Member Repair Pricing", description: "Reduced rates on repairs found between visits." }
    ],
    primaryCta: { label: "Learn More", href: "/services/maintenance" },
    secondaryCta: { label: "Call Now: +1 555-123-4567", href: "tel:5551234567" },
    emergencyCard: { headline: "Already Have a Problem?", text: "Skip the wait. Call us and we'll take it from there, plan or no plan." },
    imageAlt: "Air conditioning equipment installed along an exterior wall",
    imageKey: "maintenance"
  }
];
