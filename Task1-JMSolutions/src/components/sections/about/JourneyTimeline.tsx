import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutContent } from "@/content/about";
import { TimelineProgress } from "./TimelineProgress";

export function JourneyTimeline() {
  const content = aboutContent.journey;

  return (
    <Section bg="bg-0" className="py-20 md:py-32 relative isolate overflow-clip">
      <div className="container-custom relative">
        <SectionHeader h2Part1={content.h2Part1} h2Part2={content.h2Part2} />

        <div className="relative max-w-[880px] mx-auto mt-16">
          <TimelineProgress />
          
          <ol className="relative flex flex-col gap-12 sm:gap-16 pb-12">
            {/* The vertical rail */}
            {/* On mobile: left-4 (centered in 32px area conceptually). On desktop: 96px(col1) + 16px(gap) + 19px(half col2) = 131px */}
            <div className="absolute top-0 bottom-0 w-[2px] bg-line left-4 sm:left-[131px] -z-10">
              {/* Active fill simulated by CSS relying on data-active elements */}
            </div>

            {content.items.map((item, idx) => (
              <li 
                key={idx} 
                className="timeline-item group relative grid grid-cols-1 sm:grid-cols-[96px_40px_1fr] items-start gap-x-4 min-w-0"
              >
                {/* Year (Desktop: Col 1, Mobile: inside Col 3 conceptually, but we'll use CSS layout) */}
                <div className="hidden sm:block text-right pt-1">
                  <span className="font-display font-bold text-xl text-brand-gradient">{item.year}</span>
                </div>

                {/* Rail & Marker (Desktop: Col 2, Mobile: Absolute left) */}
                <div className="absolute sm:relative left-4 sm:left-0 top-1.5 sm:top-0 w-[2px] sm:w-[40px] h-full sm:h-auto flex justify-center flex-shrink-0">
                  <div className="w-[14px] h-[14px] bg-bg-1 border-2 border-[image:var(--grad-brand)] transform skew-x-[-14deg] absolute left-1/2 -translate-x-1/2 sm:top-2 transition-all duration-350 group-data-[active=true]:scale-125 group-data-[active=true]:bg-[image:var(--grad-brand)] group-data-[active=true]:shadow-[0_0_15px_rgba(63,160,240,0.6)] motion-reduce:transition-none"></div>
                </div>

                {/* Content (Desktop: Col 3, Mobile: Col 1 with left padding) */}
                <div className="pl-12 sm:pl-0 pt-0.5 min-w-0">
                  <div className="sm:hidden mb-1">
                    <span className="font-display font-bold text-lg text-brand-gradient">{item.year}</span>
                  </div>
                  <h3 className="font-nav font-bold text-[16px] sm:text-lg uppercase tracking-wide text-fg-0 mb-3 break-words">
                    {item.title}
                  </h3>
                  <p className="text-fg-1 text-sm sm:text-[15px] leading-relaxed max-w-[55ch]">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
