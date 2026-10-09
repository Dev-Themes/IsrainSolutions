import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Zap, TriangleAlert, Thermometer, Wrench } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function IssueCards() {
  const issues = [
    {
      icon: Thermometer,
      title: "AC Running but Not Cooling?",
      p1: "A system can run all day and still fail to cool. Restricted airflow, dirty coils, low refrigerant, failing electrical parts and duct problems are all common causes.",
      p2: "We test the system and find what's really behind it, so you pay to fix the problem, not to try parts.",
      variant: "cool" as const
    },
    {
      icon: Zap,
      title: "AC Stopped Working Completely?",
      p1: "A dead AC doesn't always mean a dead system. A failed capacitor, contactor, thermostat, blower or condenser fan motor, or a tripped drain safety switch, can shut everything down.",
      p2: "We trace the failure, explain it plainly and lay out your options.",
      variant: "brand" as const
    },
    {
      icon: TriangleAlert,
      title: "Refrigerant Leaks & Low Refrigerant",
      p1: "Air conditioners don't use up refrigerant. If yours is low, there's a leak somewhere that needs to be found.",
      p2: "Depending on where it is, the age of the system and the type of refrigerant, repair may or may not make financial sense. We'll show you what we find so you can decide.",
      variant: "brand" as const
    },
    {
      icon: Wrench,
      title: "Compressor Problems",
      p1: "A compressor issue doesn't automatically mean a new system. We check whether the compressor itself has failed or whether an electrical or refrigerant problem is affecting it.",
      p2: "If a major repair is needed, we'll compare its cost with replacement before you commit.",
      variant: "cool" as const
    }
  ];

  return (
    <Section className="relative overflow-hidden">
      <div className="flex flex-col items-center">
        <SectionHeader 
          h2Part1="Expert"
          h2Part2="Diagnostics & Repair"
          centered={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-12">
          {issues.map((issue, i) => {
            const Icon = issue.icon;
            return (
              <Card key={i} className="flex flex-col h-full p-8" variant={issue.variant}>
                <div className="w-12 h-12 clip-chamfer mb-6 flex items-center justify-center bg-white/5 border border-white/10 relative overflow-hidden group" style={{'--cut': '8px'} as any}>
                  <div className={`absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40 ${
                    issue.variant === 'cool' ? 'bg-ice' : 'bg-ember'
                  }`} />
                  <Icon className={`w-6 h-6 relative z-10 ${issue.variant === 'cool' ? 'text-ice' : 'text-ember'}`} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-fg-1">{issue.title}</h3>
                <div className="space-y-4 text-base text-fg-2 flex-grow">
                  <p>{issue.p1}</p>
                  <p>{issue.p2}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
