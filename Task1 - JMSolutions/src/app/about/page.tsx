import Image from 'next/image';
import { ShieldCheck, Wrench, Handshake, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop"
            alt="JM Solutions facility"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/80 to-transparent" />
        </div>
        <div className="container-custom relative z-10 text-center max-w-4xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-ice-500/10 border border-ice-500/20 text-ice-500 text-sm font-bold tracking-widest uppercase mb-6">
            About Us
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-text-0 mb-6">
            About JM Comfort Solutions
          </h1>
          <p className="text-lg md:text-xl text-text-1">
            Delivering top-tier HVAC and refrigeration services with uncompromised integrity and expertise. We prioritize honesty and long-term solutions for every client.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-bg-0 py-20 lg:py-32 overflow-hidden relative">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
            <div className="w-full lg:w-1/2">
              <div className="text-sm font-bold tracking-widest text-ice-500 uppercase mb-4">Our Story</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-0 mb-6">
                Rooted in Hard Work and Transparency.
              </h2>
              <div className="space-y-6 text-text-1 text-lg">
                <p>
                  JM Comfort Solutions was founded on a simple principle: doing the right thing for our customers, every single time. We saw an industry often focused on up-selling and quick replacements, and decided to build a company that puts repair and longevity first.
                </p>
                <p>
                  Our early days were spent building trust one service call at a time. Whether it was a midnight emergency at a local restaurant or a freezing weekend in a family home, we showed up ready to diagnose the real issue, not just offer the most expensive fix.
                </p>
                <p>
                  Today, we continue that legacy. We treat every system as if it were our own and every customer's budget with the utmost respect. We are proud to be the team you can rely on for straightforward answers and dependable craftsmanship.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0 px-4 md:px-0">
              <div className="relative aspect-square md:aspect-[4/3] w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-ice-500/10 translate-x-4 translate-y-4 clip-chamfer"></div>
                <Image
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
                  alt="HVAC machinery"
                  fill
                  className="object-cover clip-chamfer relative z-10 border border-stroke/50"
                />
                
                {/* Quote Box overlapping */}
                <div className="absolute -bottom-6 left-4 right-4 sm:right-auto sm:-bottom-12 sm:-left-12 bg-bg-1 border border-stroke p-5 md:p-8 rounded-sm z-20 shadow-xl">
                  <div className="flex gap-3 md:gap-4">
                    <div className="text-ice-500 shrink-0">
                      <svg width="32" height="32" className="md:w-10 md:h-10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-text-0 font-medium italic text-base md:text-lg mb-2 md:mb-4">
                        "Honest answer and treated my money like it was their own."
                      </p>
                      <div className="text-xs md:text-sm font-bold text-ice-500 uppercase tracking-wider">- Happy Customer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="bg-bg-1 py-20 lg:py-32 overflow-hidden relative">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <div className="text-sm font-bold tracking-widest text-ice-500 uppercase mb-4">Our Philosophy</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-0 mb-6">
                Repair First, Replace Only When Necessary.
              </h2>
              <div className="space-y-6 text-text-1 text-lg mb-10">
                <p>
                  We believe that a well-maintained system can outlast expectations. Our technicians are trained to identify the root cause of the problem and provide a targeted repair solution whenever feasible.
                </p>
                <p>
                  By prioritizing repair, we save our clients significant money and reduce unnecessary waste. We take the time to educate you about your equipment's health so you can make informed decisions.
                </p>
                <p>
                  When replacement is truly the best option, we guide you through selecting the most efficient, durable system for your specific needs, ensuring a perfect installation that will stand the test of time.
                </p>
              </div>
              <div className="bg-bg-2 border-l-4 border-ice-500 p-6 md:p-8 rounded-r-sm">
                <p className="text-xl md:text-2xl text-text-0 font-medium italic">
                  "We fix what other companies want to replace."
                </p>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0">
               <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
                 <div className="absolute inset-0 bg-ice-500/10 -translate-x-4 translate-y-4 clip-chamfer"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop"
                    alt="Industrial HVAC components"
                    fill
                    className="object-cover clip-chamfer relative z-10 border border-stroke/50"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="bg-bg-0 py-20 lg:py-32">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-sm font-bold tracking-widest text-ice-500 uppercase mb-4">Core Values</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-0 mb-6">
              What We Stand For
            </h2>
            <p className="text-lg text-text-1">
              These principles guide every decision we make and every service call we run. They are the foundation of the trust we build with our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            <div className="bg-bg-1 border border-stroke p-8 rounded-sm hover:border-ice-500/50 transition-colors duration-300 flex flex-col sm:flex-row items-start gap-6 group">
              <div className="bg-bg-2 p-4 rounded-sm border border-stroke group-hover:bg-ice-500/10 group-hover:border-ice-500/30 transition-all duration-300 shrink-0">
                <ShieldCheck className="w-8 h-8 text-ice-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-0 mb-3 font-display">Integrity</h3>
                <p className="text-text-1">We provide honest diagnoses, fair pricing, and never recommend services you don't need.</p>
              </div>
            </div>
            
            <div className="bg-bg-1 border border-stroke p-8 rounded-sm hover:border-ice-500/50 transition-colors duration-300 flex flex-col sm:flex-row items-start gap-6 group">
              <div className="bg-bg-2 p-4 rounded-sm border border-stroke group-hover:bg-ice-500/10 group-hover:border-ice-500/30 transition-all duration-300 shrink-0">
                <Wrench className="w-8 h-8 text-ice-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-0 mb-3 font-display">Craftsmanship</h3>
                <p className="text-text-1">We take pride in our work, ensuring every repair and installation meets the highest industry standards.</p>
              </div>
            </div>
            
            <div className="bg-bg-1 border border-stroke p-8 rounded-sm hover:border-ice-500/50 transition-colors duration-300 flex flex-col sm:flex-row items-start gap-6 group">
              <div className="bg-bg-2 p-4 rounded-sm border border-stroke group-hover:bg-ice-500/10 group-hover:border-ice-500/30 transition-all duration-300 shrink-0">
                <Handshake className="w-8 h-8 text-ice-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-0 mb-3 font-display">Reliability</h3>
                <p className="text-text-1">When we say we'll be there, we'll be there. You can count on us to show up on time, ready to work.</p>
              </div>
            </div>
            
            <div className="bg-bg-1 border border-stroke p-8 rounded-sm hover:border-ice-500/50 transition-colors duration-300 flex flex-col sm:flex-row items-start gap-6 group">
              <div className="bg-bg-2 p-4 rounded-sm border border-stroke group-hover:bg-ice-500/10 group-hover:border-ice-500/30 transition-all duration-300 shrink-0">
                <Lightbulb className="w-8 h-8 text-ice-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-0 mb-3 font-display">Expertise</h3>
                <p className="text-text-1">Continuous training ensures our technicians are equipped with the latest knowledge to handle any system.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey (Timeline) */}
      <section className="bg-bg-1 py-20 lg:py-32">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-sm font-bold tracking-widest text-ice-500 uppercase mb-4">History</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-0 mb-6">
              Our Journey
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-stroke -translate-x-1/2"></div>
            
            <div className="space-y-16">
              {/* Timeline Item 1 */}
              <div className="relative flex flex-col md:flex-row items-center md:justify-between group">
                <div className="hidden md:block w-5/12 text-right pr-12">
                  <h3 className="text-2xl font-bold text-ice-500 font-display">2010</h3>
                  <p className="text-text-1 mt-2">The Foundation</p>
                </div>
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-bg-1 border-2 border-ice-500 -translate-x-1/2 group-hover:bg-ice-500 group-hover:shadow-[0_0_15px_rgba(0,255,255,0.6)] transition-all duration-300 z-10"></div>
                <div className="w-full md:w-5/12 pl-12 md:pl-12 text-left">
                  <div className="md:hidden mb-2">
                    <h3 className="text-2xl font-bold text-ice-500 font-display">2010</h3>
                  </div>
                  <div className="bg-bg-0 border border-stroke p-6 rounded-sm shadow-lg">
                    <h4 className="text-xl font-bold text-text-0 mb-2">Humble Beginnings</h4>
                    <p className="text-text-1">JM Comfort Solutions started with a single truck and a commitment to providing honest, transparent HVAC services to our local community.</p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative flex flex-col md:flex-row items-center md:justify-between group">
                <div className="w-full md:w-5/12 pl-12 md:pl-0 md:pr-12 text-left md:text-right md:order-1 order-2 mt-4 md:mt-0">
                  <div className="md:hidden mb-2">
                    <h3 className="text-2xl font-bold text-ice-500 font-display">2015</h3>
                  </div>
                  <div className="bg-bg-0 border border-stroke p-6 rounded-sm shadow-lg">
                    <h4 className="text-xl font-bold text-text-0 mb-2">Commercial Expansion</h4>
                    <p className="text-text-1">Recognizing the need for reliable commercial services, we expanded our team and expertise to tackle complex refrigeration and large-scale HVAC systems.</p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-bg-1 border-2 border-ice-500 -translate-x-1/2 group-hover:bg-ice-500 group-hover:shadow-[0_0_15px_rgba(0,255,255,0.6)] transition-all duration-300 z-10 md:order-2 order-1"></div>
                <div className="hidden md:block w-5/12 text-left pl-12 md:order-3">
                  <h3 className="text-2xl font-bold text-ice-500 font-display">2015</h3>
                  <p className="text-text-1 mt-2">Growing Capabilities</p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative flex flex-col md:flex-row items-center md:justify-between group">
                <div className="hidden md:block w-5/12 text-right pr-12">
                  <h3 className="text-2xl font-bold text-ice-500 font-display">2020</h3>
                  <p className="text-text-1 mt-2">Award-Winning Service</p>
                </div>
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-bg-1 border-2 border-ice-500 -translate-x-1/2 group-hover:bg-ice-500 group-hover:shadow-[0_0_15px_rgba(0,255,255,0.6)] transition-all duration-300 z-10"></div>
                <div className="w-full md:w-5/12 pl-12 md:pl-12 text-left">
                  <div className="md:hidden mb-2">
                    <h3 className="text-2xl font-bold text-ice-500 font-display">2020</h3>
                  </div>
                  <div className="bg-bg-0 border border-stroke p-6 rounded-sm shadow-lg">
                    <h4 className="text-xl font-bold text-text-0 mb-2">Industry Recognition</h4>
                    <p className="text-text-1">Our unwavering dedication to the "Repair First" philosophy earned us local recognition and solidified our reputation as trusted industry leaders.</p>
                  </div>
                </div>
              </div>
              
              {/* Timeline Item 4 */}
              <div className="relative flex flex-col md:flex-row items-center md:justify-between group">
                <div className="w-full md:w-5/12 pl-12 md:pl-0 md:pr-12 text-left md:text-right md:order-1 order-2 mt-4 md:mt-0">
                  <div className="md:hidden mb-2">
                    <h3 className="text-2xl font-bold text-ice-500 font-display">Today</h3>
                  </div>
                  <div className="bg-bg-0 border border-stroke p-6 rounded-sm shadow-lg">
                    <h4 className="text-xl font-bold text-text-0 mb-2">Continuous Innovation</h4>
                    <p className="text-text-1">We continue to embrace new technologies while staying true to our core values. We look forward to serving our community for decades to come.</p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-bg-1 border-2 border-ice-500 -translate-x-1/2 group-hover:bg-ice-500 group-hover:shadow-[0_0_15px_rgba(0,255,255,0.6)] transition-all duration-300 z-10 md:order-2 order-1"></div>
                <div className="hidden md:block w-5/12 text-left pl-12 md:order-3">
                  <h3 className="text-2xl font-bold text-ice-500 font-display">Today</h3>
                  <p className="text-text-1 mt-2">Looking Forward</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
