import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CircleCheck } from 'lucide-react';

const problems = [
  "AC running but not cooling",
  "AC completely stopped working",
  "Weak airflow from vents",
  "Frozen evaporator coil",
  "Refrigerant leaks",
  "Low refrigerant",
  "Failed capacitors",
  "Electrical and control faults",
  "Compressor problems",
  "Condenser fan failures",
  "Blower motor problems",
  "Thermostat issues",
  "Clogged condensate drains",
  "Water leaking near the indoor unit",
  "High indoor humidity",
  "Uneven temperatures room to room",
  "Short cycling",
  "Strange noises or odors"
];

export function DiagnosticsSplit({ data }: { data: any }) {
  return (
    <Section bg="bg-1" className="relative overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6 text-balance text-fg-1">
              {data.h2_1}
            </h2>
            <div className="space-y-4 text-lg text-fg-2 text-pretty">
              <p>{data.p1_1}</p>
              <p>{data.p1_2}</p>
              <p className="font-semibold text-ice">{data.p1_3}</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6 text-balance text-fg-1">
              {data.h2_2}
            </h2>
            <div className="space-y-4 text-lg text-fg-2 text-pretty">
              <p>{data.p2_1}</p>
              {data.p2_2 && <p>{data.p2_2}</p>}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-fg-1">What happens on a diagnostic visit</h3>
            <ol className="relative border-l border-white/10 ml-3 space-y-8">
              {[
                { title: "Arrive & listen", desc: "we ask what you've noticed and when it started." },
                { title: "Inspect & test", desc: "airflow, electrical, refrigerant and drainage checks." },
                { title: "Explain & quote", desc: "the findings in plain language, with a written price." },
                { title: "Repair or hold", desc: "we fix it with your approval, or leave you with the facts." }
              ].map((step, i) => (
                <li key={i} className="ml-8">
                  <span className="absolute -left-[17px] flex items-center justify-center w-8 h-8 clip-chamfer bg-card border border-line" style={{'--cut': '4px'} as any}>
                    <span className="bg-[image:var(--grad-brand)] bg-clip-text text-transparent font-bold text-sm">
                      {i + 1}
                    </span>
                  </span>
                  <h4 className="font-bold text-fg-1 text-lg mb-1">{step.title}</h4>
                  <p className="text-fg-2 text-base">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <Card className="flex flex-col checklist-card h-fit">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-fg-1">Common AC Problems We Repair</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-8">
              {problems.map((prob, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CircleCheck className="w-5 h-5 text-ice shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-fg-2 text-sm sm:text-base leading-snug">{prob}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto">
            <div className="h-px bg-white/10 w-full mb-6" />
            <p className="italic text-fg-2 opacity-80 text-center mb-6">
              Not sure what's wrong? That's exactly what a diagnostic visit is for.
            </p>
            <Button variant="primary" className="w-full" href="/contact">
              {data.buttonText}
            </Button>
          </div>
        </Card>
      </div>
    </Section>
  );
}
