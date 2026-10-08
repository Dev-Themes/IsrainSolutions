import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface ProcessStepsProps {
  data: [
    { title: string; description: string },
    { title: string; description: string },
    { title: string; description: string }
  ];
}

export function ProcessSteps({ data }: ProcessStepsProps) {
  return (
    <Section bg="bg-0" className="py-20 lg:py-32">
      <div className="container-custom max-w-[1280px]">
        <SectionHeader 
          h2Part1="What Happens" 
          h2Part2="After You Send"
          subtext="We review your request immediately and call you back to confirm the details before dispatching a technician."
          centered={false}
        />

        <ol className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[28px] left-0 w-full h-[2px] bg-[image:var(--grad-brand)] opacity-20 -z-10" aria-hidden="true"></div>

          {data.map((step, index) => {
            const num = `0${index + 1}`;
            return (
              <li key={num} className="relative flex flex-col gap-4">
                {/* Connecting line for mobile */}
                {index !== 2 && (
                  <div className="block lg:hidden absolute left-[28px] top-[64px] bottom-[-32px] w-[2px] bg-[image:var(--grad-brand)] opacity-20 -z-10" aria-hidden="true"></div>
                )}
                
                <div className="text-[32px] font-display font-bold text-brand-gradient tracking-tight bg-bg-0 inline-block pr-4 lg:w-max">
                  {num}
                </div>
                <div>
                  <h3 className="font-display font-bold text-fg-0 text-xl mb-2">{step.title}</h3>
                  <p className="text-fg-1 leading-relaxed">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
