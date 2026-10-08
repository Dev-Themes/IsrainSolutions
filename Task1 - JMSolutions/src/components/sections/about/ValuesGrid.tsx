import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutContent } from "@/content/about";
import { Target, Wrench, Handshake, Lightbulb } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Target,
  Wrench,
  Handshake,
  Lightbulb
};

export function ValuesGrid() {
  const content = aboutContent.values;

  return (
    <Section bg="band" className="py-20 md:py-32">
      <div className="container-custom">
        <SectionHeader h2Part1={content.h2Part1} h2Part2={content.h2Part2} subtext={content.subtext} />

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
          {content.items.map((item, idx) => {
            const Icon = iconMap[item.icon];
            const isWarm = idx === 1 || idx === 2; // cool, warm, warm, cool alternating
            const gradientVar = isWarm ? '--grad-warm' : '--grad-cool';
            const cutDirection = idx % 2 === 0 ? 'polygon(0 0, calc(100% - 17.6px) 0, 100% 17.6px, 100% 100%, 0 100%)' : 'polygon(17.6px 0, 100% 0, 100% 100%, 0 100%, 0 17.6px)'; // alternate cut corners

            return (
              <li 
                key={idx} 
                className="group relative isolate overflow-hidden bg-card border border-line p-6 sm:p-8 flex flex-col [@media(min-width:400px)]:flex-row gap-6 min-h-full items-start"
                style={{ clipPath: cutDirection }}
              >
                {/* Pointer spotlight fallback - using hover for now without JS */}
                <div className="absolute inset-0 bg-[image:var(--grad-brand)] opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[image:var(--grad-brand)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex-shrink-0 w-[52px] h-[52px] flex items-center justify-center bg-bg-0 border border-line clip-chamfer relative isolate" style={{'--cut': '8px'} as any}>
                  <div className={`absolute inset-0 bg-[image:var(${gradientVar})] opacity-20 -z-10`}></div>
                  {Icon && <Icon className="w-6 h-6 text-white" />}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-nav font-bold text-lg md:text-xl uppercase tracking-wide text-fg-0 mb-3 line-clamp-2 break-words">
                    {/* At < 24px we just use solid fg-0, but since font is Saira we can optionally gradient it on large. Simplified here to solid. */}
                    {item.title}
                  </h3>
                  <p className="text-fg-1 text-sm md:text-[15px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
