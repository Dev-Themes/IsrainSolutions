import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { ShieldCheck, Phone, CircleCheck } from 'lucide-react';

const factors = [
  "Overall condition of the equipment",
  "Which component failed and what it costs",
  "Refrigerant type",
  "Repair cost versus replacement cost",
  "Efficiency",
  "Parts availability",
  "Signs of refrigerant leaks",
  "Repair history and warranty coverage"
];

export function SecondOpinion({ data }: { data: any }) {
  return (
    <Section 
      bg="bg-0" className="relative overflow-hidden"
    >
      <div className="grid lg:grid-cols-[1fr_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
      <div className="flex flex-col items-start gap-6">
        <Tag><ShieldCheck className="w-4 h-4" /> Honest Assessment</Tag>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-balance text-fg-1">
          {data.h2}
        </h2>
        <div className="text-2xl font-bold bg-[image:var(--grad-brand)] bg-clip-text text-transparent">
          {data.subhead}
        </div>
        <div className="space-y-4 text-lg text-fg-2 text-pretty">
          <p>{data.p1}</p>
          <p>{data.p2}</p>
        </div>
        <blockquote className="border-l-4 border-l-ember bg-card p-6 clip-chamfer italic text-fg-1 text-lg my-4" style={{'--cut': '8px'} as any}>
          "Our approach is simple: repair it when repairing makes sense, replace it when it doesn't."
        </blockquote>
        <Button variant="primary" href="/contact" className="mt-2">
          {data.buttonText}
        </Button>
      </div>

      <Card className="flex flex-col checklist-card h-fit">
        <div>
          <h3 className="text-2xl font-bold mb-6 text-fg-1">We Work on Older AC Systems Too</h3>
          <div className="space-y-4 text-fg-2 mb-6 text-base sm:text-lg">
            <p>Age matters, but it doesn't settle the question by itself. We look at the whole picture before recommending a repair or a replacement.</p>
            <p>When we evaluate an older system, we weigh:</p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-8">
            {factors.map((factor, i) => (
              <li key={i} className="flex items-start gap-3">
                <CircleCheck className="w-5 h-5 text-ice shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-fg-2 text-sm sm:text-base leading-snug">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto pt-6">
          <div className="h-px bg-white/10 w-full mb-6" />
          <p className="italic text-fg-2 opacity-80">
            If replacement is the smarter move, we'll tell you why. If repairing what you have is reasonable, we'll tell you that too.
          </p>
        </div>
      </Card>
      </div>
    </Section>
  );
}
