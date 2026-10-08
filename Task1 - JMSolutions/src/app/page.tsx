"use client";

import Image from "next/image";
import { 
  Snowflake, Flame, Wrench, Clock, ShieldCheck, DollarSign, MapPin, Search, ChevronRight, Phone, ArrowRight, Star
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ServiceAccordion } from "@/components/ui/ServiceAccordion";
import { ReviewsCarousel } from "@/components/ui/ReviewsCarousel";
import { InteractiveGallery } from "@/components/ui/InteractiveGallery";
import { useState } from "react";
import { images } from "@/lib/images";
import { serviceAreas } from "@/config/serviceAreas";

export default function Home() {
  const [activeHeroTab, setActiveHeroTab] = useState<'heating'|'cooling'|'refrigeration'>('cooling');

  const heroTabs = {
    heating: { src: images.heroTabs.heating, color: 'var(--ember)', caption: "Furnace & heat pump repair" },
    cooling: { src: images.heroTabs.cooling, color: 'var(--blue)', caption: "AC repair & installation" },
    refrigeration: { src: images.heroTabs.refrigeration, color: 'var(--ice)', caption: "Commercial refrigeration" },
  };

  const accordionData = [
    { title: "Air Conditioning Repair", items: serviceAreas.map(area => ({ label: `Air Conditioning Repair ${area.city}`, slug: area.slug })) },
    { title: "Heating & Furnace Repair", items: serviceAreas.map(area => ({ label: `Furnace Repair ${area.city}`, slug: area.slug })) },
    { title: "Commercial Refrigeration Repair", items: serviceAreas.map(area => ({ label: `Commercial Refrigeration ${area.city}`, slug: area.slug })) },
  ];

  const reviews = [
    { source: "GOOGLE REVIEW", date: "3 weeks ago", stars: 5, quote: "Awesome service. I understood exactly what was wrong and how it needed to be fixed. I will continue to use this company for AC maintenance.", initial: "S", name: "Shanel Onyechi" },
    { source: "GOOGLE REVIEW", date: "a month ago", stars: 5, quote: "I visited with my family and was pleased to find the waiting area clean and quiet. The technician arrived on time and clearly explained the repair process...", initial: "D", name: "Dexter Parker" },
    { source: "FACEBOOK REVIEW", date: "2 months ago", stars: 5, quote: "Extremely professional! They fixed my walk-in cooler the same day I called. Didn't try to upsell me on a completely new unit.", initial: "M", name: "Michael T." },
    { source: "GOOGLE REVIEW", date: "4 months ago", stars: 5, quote: "The emergency line actually works. Called at 2AM on a Sunday and they had someone out here by 4AM. Absolute lifesavers.", initial: "L", name: "Linda G." },
    { source: "FACEBOOK REVIEW", date: "6 months ago", stars: 5, quote: "Honest pricing. Another company quoted me $5k for a replacement. JM Comfort fixed a $200 part and it's been running perfect since.", initial: "J", name: "James Anderson" },
    { source: "GOOGLE REVIEW", date: "1 year ago", stars: 5, quote: "Signed up for their maintenance plan and it's totally worth it. The technicians are always polite, wear shoe covers, and get the job done fast.", initial: "S", name: "Sarah Williams" },
  ];

  return (
    <>
      {/* 2. HERO */}
      <Section className="min-h-[calc(100svh-128px)] flex items-center relative isolation overflow-hidden py-12 md:py-20" bg="bg-0">
        <div className="absolute inset-0 bg-[url('/textures/contours.svg')] bg-repeat opacity-[0.06] -z-10 mix-blend-screen pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:240px_100%] -z-10 pointer-events-none"></div>
        <div className="absolute top-0 left-0 bottom-0 w-[40vw] bg-[radial-gradient(circle_at_0%_50%,rgba(63,160,240,0.15)_0%,transparent_70%)] -z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-[40vw] bg-[radial-gradient(circle_at_100%_50%,rgba(236,106,71,0.15)_0%,transparent_70%)] -z-10 pointer-events-none"></div>
        
        <div className="container-custom grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 md:gap-16 items-center">
          
          {/* Left Column */}
          <div className="flex flex-col items-start text-left max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-[14px] py-[8px] mb-8 border border-[image:var(--grad-brand)] border-opacity-30 text-ice text-[12px] font-nav font-bold tracking-[.24em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-ice shadow-[0_0_8px_var(--ice)] animate-pulse"></span>
              ● Sugar Land, TX · <span className="text-ember">HEATING</span> | <span className="text-blue">COOLING</span> | <span className="text-ice">REFRIGERATION</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-6 text-fg-0 uppercase drop-shadow-md text-balance">
              REPAIR IT RIGHT.<br />
              <span className="text-brand-gradient">REPLACE ONLY</span><br />
              WHEN IT MAKES SENSE.
            </h1>
            
            <p className="text-[17px] md:text-[18px] text-fg-1 mb-10 max-w-[65ch] leading-[1.65]">
              Locally owned HVAC and refrigeration for homes and businesses. Honest diagnosis, written quotes and 24/7 emergency response, and we'll repair your system instead of replacing it whenever that's the smarter call.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
              <Button href="/contact" variant="primary">
                Get a Free Quote
              </Button>
              <Button href="tel:5551234567" variant="outline">
                <Phone className="w-4 h-4" /> Call Now: (555) 123-4567
              </Button>
            </div>

            <div className="flex items-center gap-8 md:gap-12 w-full pt-6 border-t border-line/30">
              <div className="flex flex-col pl-4 border-l-2 border-[image:var(--grad-brand)]">
                <span className="font-display font-bold text-4xl text-brand-gradient">24/7</span>
                <span className="text-[12px] uppercase font-bold tracking-[.16em] text-fg-2">Emergency Service</span>
              </div>
              <div className="flex flex-col pl-4 border-l-2 border-[image:var(--grad-brand)]">
                <span className="font-display font-bold text-4xl text-brand-gradient">15+</span>
                <span className="text-[12px] uppercase font-bold tracking-[.16em] text-fg-2">Systems Serviced</span>
              </div>
              <div className="flex flex-col pl-4 border-l-2 border-[image:var(--grad-brand)]">
                <span className="font-display font-bold text-4xl text-brand-gradient">100%</span>
                <span className="text-[12px] uppercase font-bold tracking-[.16em] text-fg-2">Written Quotes</span>
              </div>
            </div>
          </div>
          
          {/* Right Column: Interactive Media Frame */}
          <div className="relative w-full aspect-[4/5] md:aspect-[4/3] lg:aspect-[4/5] rounded-[8px] clip-chamfer group isolate p-[2px] transition-all duration-500 overflow-visible mt-8 lg:mt-0" style={{background: heroTabs[activeHeroTab].color}}>
            <div className="absolute inset-[2px] bg-card clip-chamfer overflow-hidden -z-10">
              {Object.entries(heroTabs).map(([key, tab]) => (
                <Image 
                  key={key}
                  src={tab.src}
                  alt={tab.caption}
                  fill
                  className={`object-cover transition-opacity duration-700 ${activeHeroTab === key ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  priority={key === 'cooling'}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-transparent to-transparent z-20"></div>
            </div>

            {/* Tab Rail */}
            <div className="absolute right-[-1px] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
              {(['cooling', 'heating', 'refrigeration'] as const).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveHeroTab(tab)}
                  className={`w-[4px] h-16 transition-all duration-300 ${activeHeroTab === tab ? 'w-[6px] h-24 bg-white shadow-[0_0_10px_#fff]' : 'bg-white/30 hover:bg-white/60'}`}
                  style={activeHeroTab === tab ? { backgroundColor: heroTabs[tab].color } : {}}
                  aria-label={`Select ${tab} view`}
                />
              ))}
            </div>

            {/* Caption */}
            <div className="absolute top-6 right-6 z-30">
              <span className="bg-bg-0/90 backdrop-blur-sm border border-line px-4 py-2 text-sm font-bold uppercase tracking-widest text-fg-0 inline-block clip-chamfer" style={{'--cut': '8px'} as any}>
                {heroTabs[activeHeroTab].caption}
              </span>
            </div>

            {/* Overlapping Skewed Badge */}
            <div className="absolute bottom-8 left-4 md:-left-4 z-40 transform skew-x-[-12deg] bg-[image:var(--grad-warm)] px-6 py-3 shadow-xl">
              <span className="block transform skew-x-[12deg] text-white font-bold text-sm tracking-[.14em] uppercase whitespace-nowrap">24/7 Emergency Service</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. WHY JM COMFORT SOLUTIONS */}
      <Section bg="bg-1">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-0 mb-4 inline-flex flex-col items-center">
            <span>Why <span className="text-brand-gradient">JM Comfort Solutions?</span></span>
            <div className="w-[88px] h-[4px] mt-2 bg-[image:var(--grad-brand)] transform skew-x-[-20deg]"></div>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container-custom items-stretch">
          {[
            { variant: 'cool', icon: <Wrench className="w-6 h-6 text-white" />, title: "Repair Before Replace", desc: "A 15-year-old system isn't automatically dead. We test first, show you what failed, and fix it whenever a repair gives you real, lasting value." },
            { variant: 'warm', icon: <DollarSign className="w-6 h-6 text-white" />, title: "Honest, Upfront Pricing", desc: "You get a written quote before any work begins. No surprise add-ons, no pressure to upgrade, no inflated replacement quotes." },
            { variant: 'cool', icon: <Clock className="w-6 h-6 text-white" />, title: "24/7 Emergency Line", desc: "Furnace out in a cold snap? Walk-in cooler down on a Friday night? We answer every call, day or night, at (555) 123-4567." },
            { variant: 'warm', icon: <MapPin className="w-6 h-6 text-white" />, title: "Locally Owned & Operated", desc: "Founded in 2024 by the experts to do HVAC the right way. When you call, you reach the people who do the work." }
          ].map((item, i) => (
            <Card key={i} variant={item.variant as any} className="flex flex-col">
              <div className={`w-[52px] h-[52px] clip-chamfer mb-6 flex items-center justify-center ${item.variant === 'cool' ? 'bg-[image:var(--grad-cool)]' : 'bg-[image:var(--grad-warm)]'}`} style={{'--cut': '12px'} as any}>
                {item.icon}
              </div>
              <h3 className="text-ice font-bold uppercase tracking-wider mb-4">{item.title}</h3>
              <p className="text-fg-1 text-[15px] leading-relaxed flex-1">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 4. OUR SERVICES */}
      <Section bg="bg-0">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-0 mb-4 inline-flex flex-col items-center">
            <span>Our <span className="text-brand-gradient">Services</span></span>
            <div className="w-[88px] h-[4px] mt-2 bg-[image:var(--grad-brand)] transform skew-x-[-20deg]"></div>
          </h2>
          <p className="mt-4 text-fg-1 max-w-[64ch] mx-auto">Complete residential and commercial heating, cooling and refrigeration for Greater Houston Area.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container-custom items-stretch">
          {/* Card 1 */}
          <div className="relative isolate clip-chamfer flex flex-col bg-card border border-line">
            <div className="relative h-60 w-full overflow-hidden clip-chamfer rounded-none" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
              <Image src={images.services.residential} alt="Residential HVAC" fill className="object-cover" />
              <div className="absolute top-4 left-4 w-12 h-12 bg-bg-1 border border-line flex items-center justify-center">
                <Snowflake className="w-6 h-6 text-ice" />
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-cool-gradient font-bold text-xl uppercase tracking-wider mb-4 font-display">Residential HVAC</h3>
              <p className="text-fg-1 text-[15px] leading-relaxed mb-6 flex-1">Keep your home comfortable year-round with expert repair, maintenance and installation.</p>
              <ul className="text-sm text-fg-1 space-y-3 mb-8">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice shrink-0" /> AC Repair & Installation</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice shrink-0" /> Heating Systems</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice shrink-0" /> Mini-Split Systems</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice shrink-0" /> Emergency Service</li>
              </ul>
              <Button href="/services/residential" variant="primary" className="w-full">
                Learn More
              </Button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative isolate clip-chamfer flex flex-col bg-card border border-line">
            <div className="relative h-60 w-full overflow-hidden clip-chamfer rounded-none" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
              <Image src={images.services.commercial} alt="Commercial HVAC" fill className="object-cover" />
              <div className="absolute top-4 left-4 w-12 h-12 bg-bg-1 border border-line flex items-center justify-center">
                <Wrench className="w-6 h-6 text-ice" />
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-brand-gradient font-bold text-xl uppercase tracking-wider mb-4 font-display">Commercial HVAC & Ref</h3>
              <p className="text-fg-1 text-[15px] leading-relaxed mb-6 flex-1">Reliable climate and cold-chain solutions for businesses of every size.</p>
              <ul className="text-sm text-fg-1 space-y-3 mb-8">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice shrink-0" /> Rooftop Units</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice shrink-0" /> Walk-In Coolers & Freezers</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice shrink-0" /> Ice Machines & Display Cases</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ice shrink-0" /> Emergency Response</li>
              </ul>
              <Button href="/services/commercial" variant="primary" className="w-full">
                Learn More
              </Button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative isolate clip-chamfer flex flex-col bg-card border border-line">
            <div className="relative h-60 w-full overflow-hidden clip-chamfer rounded-none" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
              <Image src={images.services.maintenance} alt="Maintenance Plans" fill className="object-cover" />
              <div className="absolute top-4 left-4 w-12 h-12 bg-bg-1 border border-line flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-ice" />
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-warm-gradient font-bold text-xl uppercase tracking-wider mb-4 font-display">Maintenance Plans</h3>
              <p className="text-fg-1 text-[15px] leading-relaxed mb-6 flex-1">Preventive care that extends equipment life and catches problems before they get expensive.</p>
              <ul className="text-sm text-fg-1 space-y-3 mb-8">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ember shrink-0" /> Seasonal Tune-Ups</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ember shrink-0" /> Filter Replacement</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ember shrink-0" /> Priority Scheduling</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-ember shrink-0" /> Discounted Repairs</li>
              </ul>
              <Button href="/services/maintenance-plans" variant="primary" className="w-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. OUR STORY */}
      <Section bg="band">
        <div className="absolute inset-0 bg-[url('/textures/contours.svg')] bg-repeat opacity-10 mix-blend-screen pointer-events-none mask-image-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"></div>
        <div className="absolute left-0 top-0 bottom-0 w-[20vw] bg-[radial-gradient(circle_at_0%_50%,rgba(63,160,240,0.2)_0%,transparent_100%)] pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-[20vw] bg-[radial-gradient(circle_at_100%_50%,rgba(236,106,71,0.2)_0%,transparent_100%)] pointer-events-none"></div>

        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-[image:var(--grad-brand)] text-ice text-[12px] font-nav font-bold tracking-[.24em] uppercase">
              OUR STORY
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-0 mb-6 leading-tight">
              Built on Honesty.<br />
              <span className="text-brand-gradient">Driven by Results.</span>
            </h2>
            <div className="w-[88px] h-[4px] mb-8 bg-[image:var(--grad-brand)] transform skew-x-[-20deg]"></div>
            
            <p className="text-fg-1 leading-relaxed mb-8 text-[17px]">
              JM Comfort Solutions was founded in 2024 with a simple goal: take care of customers the way we'd want to be taken care of. After years in the industry, we saw how company policies, commissions and quotas can push customers toward replacements they don't need. We built JM to do it differently.
            </p>
            <div className="border-l-4 border-[image:var(--grad-brand)] pl-6 py-2 mb-10">
              <p className="text-fg-0 italic font-medium leading-relaxed text-[18px]">
                "We want every customer to walk away thinking, 'They gave me an honest answer and treated my money like it was their own.'"
              </p>
            </div>
            <Button href="/about-us" variant="primary">
              Our Full Story
            </Button>
          </div>
          
          <div className="relative group mx-auto w-full max-w-[500px] lg:max-w-none">
            <div className="relative aspect-[4/5] w-full clip-chamfer overflow-hidden border border-line">
              <Image 
                src={images.story}
                alt="HVAC Service"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 lg:-right-8 bg-[image:var(--grad-brand)] px-8 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform skew-x-[-12deg] max-w-[240px] z-20">
              <div className="transform skew-x-[12deg]">
                <div className="text-4xl font-display font-bold text-bg-0 mb-1 leading-none">60+</div>
                <div className="text-[13px] font-bold uppercase tracking-widest text-bg-0 leading-tight font-nav">YR SYSTEMS SERVICED</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. REVIEWS */}
      <Section bg="bg-1" className="overflow-hidden">
        <div className="text-center mb-16">
          <div className="flex justify-center gap-4 mb-4 items-center">
            {/* Google SVG */}
            <svg className="w-10 h-10" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            {/* Facebook SVG */}
            <svg className="w-10 h-10" viewBox="0 0 48 48">
              <path fill="#1877F2" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24c0 11.979 8.776 21.908 20.25 23.708V30.93h-6.094V24h6.094v-5.28c0-6.012 3.585-9.336 9.07-9.336 2.621 0 5.367.468 5.367.468v5.898h-3.023c-2.975 0-3.906 1.848-3.906 3.75V24h6.637l-1.06 6.93h-5.577v16.778C39.224 45.908 48 35.978 48 24z"/>
              <path fill="#FFF" d="M31.42 30.93L32.48 24h-6.637v-4.5c0-1.902.931-3.75 3.906-3.75h3.023v-5.898s-2.746-.468-5.367-.468c-5.485 0-9.07 3.324-9.07 9.336V24h-6.094v6.93h6.094v16.778c1.236.193 2.497.292 3.75.292 1.253 0 2.514-.099 3.75-.292V30.93h5.577z"/>
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-0 mb-4 inline-flex flex-col items-center">
            <span>What Our <span className="text-brand-gradient">Customers Say</span></span>
            <div className="w-[88px] h-[4px] mt-2 bg-[image:var(--grad-brand)] transform skew-x-[-20deg]"></div>
          </h2>
          <p className="mt-4 text-fg-1 max-w-[64ch] mx-auto">Real reviews from homeowners and businesses.</p>
        </div>
        
        <ReviewsCarousel reviews={reviews} />
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12">
          <Button variant="outline" href="#google">Leave a Google Review</Button>
          <Button variant="outline" href="#facebook">Review on Facebook</Button>
        </div>
      </Section>

      {/* 7. GALLERY */}
      <Section bg="bg-0">
         <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-0 mb-4 flex flex-col items-center">
            <span className="whitespace-nowrap">Our <span className="text-brand-gradient">Work</span> in Action</span>
            <div className="w-[88px] h-[4px] mt-4 bg-[image:var(--grad-brand)] transform skew-x-[-20deg]"></div>
          </h2>
          <p className="mt-4 text-fg-1 max-w-[64ch] mx-auto">From residential repairs to commercial refrigeration installs, see JM Comfort Solutions on the job.</p>
        </div>
        
        <InteractiveGallery images={images.gallery.slice(0, 6).map((src, i) => ({
          src,
          alt: `Project Showcase 0${i + 1}`,
          description: "High-efficiency installation completed ahead of schedule. Our expert technicians ensured perfect alignment with manufacturer specifications, delivering optimal comfort and significantly lower energy bills for the property. All work backed by our 100% satisfaction guarantee."
        }))} />
      </Section>

      {/* 8. CTA BAND */}
      {/* 8. CTA BAND */}
      <Section bg="band" className="py-20 md:py-32 overflow-hidden relative isolate">
        <div className="absolute inset-0 bg-[url('/textures/contours.svg')] bg-repeat opacity-10 mix-blend-screen pointer-events-none"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-[image:var(--grad-brand)] opacity-20 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>

        <div className="container-custom relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-ice/50 bg-ice/10 text-ice text-[12px] font-nav font-bold tracking-[.24em] uppercase backdrop-blur-md">
            <Flame className="w-4 h-4 text-ember" />
            <Snowflake className="w-4 h-4 text-ice" />
            <span>REQUEST SERVICE</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-fg-0 mb-6 drop-shadow-lg">
            Ready to Get <span className="text-brand-gradient italic">Comfortable?</span>
          </h2>
          <p className="text-[18px] md:text-[20px] text-fg-1 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Don't sweat it. JM Comfort Solutions is one call away. Honest service, fair pricing and <span className="text-white font-bold border-b border-ember border-dashed pb-1">24/7 emergency response</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button href="/contact" variant="primary" className="shadow-[0_0_30px_rgba(236,106,71,0.3)] hover:shadow-[0_0_40px_rgba(63,160,240,0.5)]">
              Book Service Online
            </Button>
            <Button href="tel:5551234567" variant="outline" className="bg-bg-1/50 backdrop-blur-md border-ice hover:bg-ice/20 text-fg-0 hover:text-white">
              <Phone className="w-5 h-5 text-ice" /> (555) 123-4567
            </Button>
          </div>
        </div>
      </Section>

      {/* 9. SERVING THESE AREAS */}
      <Section bg="bg-1" className="border-t border-line">
        <div className="absolute inset-0 bg-[url('/textures/contours.svg')] bg-repeat opacity-5 mix-blend-screen pointer-events-none"></div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-fg-0 mb-4 inline-flex flex-col items-center">
            <span>Serving Houston <span className="text-brand-gradient">and These Areas</span></span>
            <div className="w-[88px] h-[4px] mt-2 bg-[image:var(--grad-brand)] transform skew-x-[-20deg]"></div>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 mt-12 text-center max-w-4xl mx-auto mb-16">
            {serviceAreas.map((area, idx) => (
              <a key={idx} href={`/ac-repair-${area.slug}`} className="group relative inline-flex justify-center text-[16px] text-fg-1 hover:text-ice transition-colors font-medium">
                {area.city}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full h-[1px] bg-line group-hover:h-[2px] group-hover:bg-[image:var(--grad-brand)] transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* 10. ACCORDIONS */}
          <div className="max-w-4xl mx-auto">
             <ServiceAccordion data={accordionData} />
          </div>
        </div>
      </Section>
    </>
  );
}
