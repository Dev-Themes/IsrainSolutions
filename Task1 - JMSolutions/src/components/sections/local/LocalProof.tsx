import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function LocalProof({ data }: { data: any }) {
  // Try to parse the title, e.g. "What a typical AC repair call looks like"
  const titleParts = data.h2.split('AC');
  const h2Part1 = titleParts[0] ? titleParts[0].trim() : data.h2;
  const h2Part2 = titleParts.length > 1 ? 'AC' + titleParts[1] : '';

  return (
    <Section bg="bg-0" className="relative">
      <div className="flex flex-col items-center">
        <SectionHeader 
          h2Part1={h2Part1}
          h2Part2={h2Part2}
          centered={true}
        />
        <div className="max-w-3xl text-center text-lg text-fg-2 mb-12 space-y-4 text-balance">
          <p>{data.intro}</p>
          {data.localNote && <p>{data.localNote}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {data.cases.map((work: any, i: number) => (
            <Card key={i} className="flex flex-col h-full relative p-6 md:p-8" variant="brand">
              {data.isIllustrative && (
                <div className="absolute top-0 right-0 bg-card-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fg-2 opacity-80 clip-chamfer border-b border-l border-line">
                  Typical call
                </div>
              )}
              <div className="flex flex-col gap-6 h-full">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-ice mb-2">Problem</div>
                  <p className="text-fg-1 font-medium text-lg leading-snug">{work.problem}</p>
                </div>
                <div className="h-px bg-white/10 w-full" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-ice mb-2">Diagnosis</div>
                  <p className="text-fg-2 text-base">{work.diagnosis}</p>
                </div>
                <div className="h-px bg-white/10 w-full" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-ice mb-2">Solution</div>
                  <p className="text-fg-2 text-base">{work.solution}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
