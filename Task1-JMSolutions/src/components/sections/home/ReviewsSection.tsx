import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ReviewsCarousel } from '@/components/ui/ReviewsCarousel';

const reviews = [
  { source: "GOOGLE REVIEW", date: "3 weeks ago", stars: 5, quote: "Awesome service. I understood exactly what was wrong and how it needed to be fixed. I will continue to use this company for AC maintenance.", initial: "S", name: "Shanel Onyechi" },
  { source: "GOOGLE REVIEW", date: "a month ago", stars: 5, quote: "I visited with my family and was pleased to find the waiting area clean and quiet. The technician arrived on time and clearly explained the repair process...", initial: "D", name: "Dexter Parker" },
  { source: "FACEBOOK REVIEW", date: "2 months ago", stars: 5, quote: "Extremely professional! They fixed my walk-in cooler the same day I called. Didn't try to upsell me on a completely new unit.", initial: "M", name: "Michael T." },
  { source: "GOOGLE REVIEW", date: "4 months ago", stars: 5, quote: "The emergency line actually works. Called at 2AM on a Sunday and they had someone out here by 4AM. Absolute lifesavers.", initial: "L", name: "Linda G." },
  { source: "FACEBOOK REVIEW", date: "6 months ago", stars: 5, quote: "Honest pricing. Another company quoted me $5k for a replacement. JM Comfort fixed a $200 part and it's been running perfect since.", initial: "J", name: "James Anderson" },
  { source: "GOOGLE REVIEW", date: "1 year ago", stars: 5, quote: "Signed up for their maintenance plan and it's totally worth it. The technicians are always polite, wear shoe covers, and get the job done fast.", initial: "S", name: "Sarah Williams" },
];

export function ReviewsSection() {
  return (
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
  );
}
