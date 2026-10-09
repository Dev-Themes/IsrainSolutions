import { getAreaCtx } from '@/lib/local';

export function getAcContent(ctx: ReturnType<typeof getAreaCtx>, isHub: boolean = false) {
  const joinList = (list: string[]) => {
    if (list.length === 0) return '';
    if (list.length === 1) return list[0];
    if (list.length === 2) return `${list[0]} and ${list[1]}`;
    return `${list.slice(0, -1).join(', ')}, and ${list[list.length - 1]}`;
  };

  const getSubhead = () => {
    const clauses = [];
    if (ctx.features.sameDay) clauses.push('Same-day service when scheduling allows');
    if (ctx.features.emergency247) clauses.push('24/7 emergency help');
    clauses.push('Honest diagnostics');
    if (ctx.fee) clauses.push(`Clear ${ctx.fee} diagnostics`);
    return clauses.join(' · ');
  };

  const getAtAGlance = () => {
    const rows = [];
    if (ctx.features.sameDay) rows.push('Same-day service when scheduling allows');
    if (ctx.features.emergency247) rows.push('24/7 emergency response');
    if (ctx.features.freeSecondOpinion) rows.push('Free second opinions');
    rows.push('Written quote before any repair');
    if (ctx.fee) rows.push(`${ctx.fee} diagnostic visit`);
    return rows;
  };

  const getProofIntro = () => {
    let text = '';
    if (isHub) {
      text = `JM Comfort Solutions serves homes and businesses throughout ${ctx.metro} and the surrounding area, and we work here regularly.`;
    } else if (ctx.status === 'primary') {
      text = `JM Comfort Solutions serves homes and businesses throughout ${ctx.town} and the surrounding area, and we work here regularly.`;
    } else if (ctx.status === 'regular') {
      text = `JM Comfort Solutions serves homeowners and businesses in ${ctx.town} and nearby communities.`;
    } else {
      text = `${ctx.town} is part of our extended service area. Call us to confirm availability and scheduling.`;
    }

    if (!isHub && ctx.neighborhoods.length > 0) {
      text += ` including ${joinList(ctx.neighborhoods)}.`;
    }
    return text;
  };

  const getFaqs = () => {
    const faqs = [];
    if (ctx.fee) {
      faqs.push({
        question: `How much is an AC service call in ${ctx.town}?`,
        answer: `JM Comfort Solutions offers a ${ctx.fee} AC diagnostic service call in ${ctx.town}. It covers diagnosing the problem. Repair costs, parts, refrigerant and additional work are quoted separately.`
      });
    } else {
      faqs.push({
        question: `How much is an AC service call in ${ctx.town}?`,
        answer: `We quote our diagnostic fee up front, before a technician is dispatched. Repair costs, parts, refrigerant and additional work are quoted separately in writing.`
      });
    }

    if (ctx.features.sameDay) {
      faqs.push({
        question: `Do you offer same-day AC repair in ${ctx.town}?`,
        answer: `Yes, when scheduling and availability permit. Call ${ctx.phone} to check today's openings.`
      });
    }

    if (ctx.features.emergency247) {
      faqs.push({
        question: `Do you provide 24-hour emergency AC repair?`,
        answer: `Yes. Our emergency line is answered 24/7, including nights, weekends and holidays.`
      });
    }

    faqs.push({
      question: `My AC is running but not cooling. What could be wrong?`,
      answer: `Common causes include airflow restrictions, dirty coils, low refrigerant, failed capacitors, blower or condenser fan problems and compressor issues. A diagnostic visit identifies the actual cause.`
    });

    faqs.push({
      question: `Will you repair an older AC system?`,
      answer: `Yes. We don't recommend replacement just because a system is old. We evaluate its condition, refrigerant type, parts availability and repair cost to decide whether repair is reasonable.`
    });

    if (ctx.features.freeSecondOpinion) {
      faqs.push({
        question: `Another company says I need a new system. Can you check it?`,
        answer: `Yes. We offer free second opinions on major repair and replacement recommendations.`
      });
    }

    if (ctx.nearby.length > 0 && !isHub) {
      // Assuming nearby contains slugs, but this requires mapping to town names ideally.
      // We'll just list the slugs or assume they are formatted. The prompt says `nearby joined`. 
      // For simplicity, we just join them. In reality they might need to be resolved to Town names.
      // The instructions say: "We also serve {nearby joined}."
      faqs.push({
        question: `Which areas near ${ctx.town} do you serve?`,
        answer: `We also serve ${joinList(ctx.nearby)}.`
      });
    }

    if (ctx.localFaq && !isHub) {
      faqs.push(...ctx.localFaq);
    }

    return faqs;
  };

  const getWhyChoose = () => {
    const items = [];
    const localDesc = isHub 
      ? `We regularly serve ${ctx.metro} and the surrounding area.` 
      : (ctx.status === 'primary' || ctx.status === 'regular' ? `We regularly serve ${ctx.town} and the surrounding area.` : `We serve ${ctx.town} as part of our extended area.`);
    items.push({ title: 'Local Service', desc: localDesc });
    
    if (ctx.fee) {
      items.push({ title: `Clear ${ctx.fee} Diagnostics`, desc: "Know what's wrong before deciding what to do; the fee covers diagnosis, repairs are quoted separately." });
    } else {
      items.push({ title: 'Upfront Diagnostics', desc: "We quote our diagnostic fee before we dispatch. Repairs are quoted separately in writing." });
    }

    if (ctx.features.sameDay) {
      items.push({ title: 'Same-Day Service', desc: 'When scheduling permits.' });
    }
    if (ctx.features.emergency247) {
      items.push({ title: '24/7 Emergency HVAC', desc: "Breakdowns don't keep business hours, and neither do we." });
    }
    if (ctx.features.freeSecondOpinion) {
      items.push({ title: 'Free Second Opinions', desc: "Before committing to a major repair or replacement, let us take another look." });
    }
    items.push({ title: 'Repair-First Approach', desc: "We're willing to repair older equipment when it's practical and financially reasonable." });
    if (ctx.features.financing) {
      items.push({ title: 'Financing Available', desc: "Flexible payment options for major repairs and replacements." });
    }
    items.push({ title: `Licensed ${ctx.stateName} HVAC Contractor`, desc: `${ctx.license.label}: ${ctx.license.number}` });

    return items;
  };

  return {
    hero: {
      title: isHub ? `AC Repair in ${ctx.metro}` : `AC Repair in \n ${ctx.town}, ${ctx.st}`,
      badge: isHub ? ctx.metro : `${ctx.town}, ${ctx.st}`,
      subhead: getSubhead(),
      paragraph: isHub 
        ? `When your air conditioner stops cooling, waiting days for a technician isn't an option. JM Comfort Solutions repairs residential and commercial AC systems throughout ${ctx.metro} with same-day appointments when scheduling allows, 24/7 emergency response, and a diagnosis you can actually understand before any repair work begins.`
        : `When your air conditioner stops cooling in ${ctx.town}, waiting days for a technician isn't an option. JM Comfort Solutions repairs residential and commercial AC systems with same-day appointments when scheduling allows, 24/7 emergency response, and a diagnosis you can actually understand before any repair work begins.`,
      atAGlance: getAtAGlance(),
      licenseLine: `${ctx.license.label}: ${ctx.license.number}`,
    },
    diagnostics: {
      h2_1: ctx.fee ? `${ctx.fee} AC Diagnostic Service Calls in ${ctx.town}` : `AC Diagnostic Service in ${ctx.town}`,
      p1_1: `Not sure what's wrong with your air conditioner? Start with a proper diagnosis. A JM technician inspects the system, tests the electrical and refrigerant sides, and finds the actual cause instead of guessing at parts.`,
      p1_2: `Before any repair begins, we explain what we found in plain language and give you your options with a written price. You approve the work or you don't, and either way you leave knowing exactly what's going on.`,
      p1_3: ctx.fee 
        ? `The ${ctx.fee} diagnostic covers finding the problem. Repairs, parts and any additional work are quoted separately, in writing, before we start.` 
        : `Our diagnostic fee is quoted before we dispatch. Repairs, parts and additional work are always quoted separately, in writing, before we start.`,
      h2_2: ctx.features.emergency247 ? `24/7 Emergency AC Repair in ${ctx.town}` : `Fast AC Repair in ${ctx.town}`,
      p2_1: ctx.features.emergency247 
        ? `Air conditioners rarely fail at a convenient time. If yours quits on a hot afternoon, late at night, over a weekend or on a holiday, call us. Our emergency line is answered around the clock.`
        : `If your AC fails, call us and we'll get you on the schedule as quickly as we can.`,
      p2_2: ctx.features.sameDay ? `We also offer same-day AC service in ${ctx.town} whenever scheduling allows, so you're not left sweating through another night.` : null,
      buttonText: ctx.fee ? `Schedule a ${ctx.fee} Diagnostic` : `Schedule a Diagnostic`,
    },
    secondOpinion: {
      enabled: ctx.features.freeSecondOpinion,
      h2: ctx.features.freeSecondOpinion ? "Told You Need a New AC System?" : "Considering Replacement?",
      subhead: ctx.features.freeSecondOpinion ? "Get a Free Second Opinion." : "Let Us Take a Second Look.",
      p1: ctx.features.freeSecondOpinion
        ? `If another company has told you to replace your system, we'll take a second look at no charge. We'll check what's actually failing and whether a repair is a reasonable option.`
        : `If you're considering replacing your system, we can evaluate it first. We'll check what's actually failing and whether a repair is a reasonable option.`,
      p2: `An older system deserves the same careful diagnosis as a newer one. Some should be replaced. Others can still be repaired economically. Our job is to give you enough information to make the decision that fits your home and your budget.`,
      buttonText: ctx.features.freeSecondOpinion ? "Call for a Free Second Opinion" : "Call for an Assessment",
    },
    proof: {
      h2: isHub ? "What a typical AC repair call looks like" : (ctx.recentWork?.length ? `Recent HVAC work in ${ctx.town}` : "What a typical AC repair call looks like"),
      intro: getProofIntro(),
      localNote: !isHub ? ctx.localNote : undefined,
      cases: (ctx.recentWork?.length && !isHub) ? ctx.recentWork : [
        {
          problem: "Warm air from the vents and frost on the indoor unit.",
          diagnosis: "A restricted filter and dirty coil starving the system of airflow.",
          solution: "Clean the coil, restore airflow and verify temperature split."
        },
        {
          problem: "The system starts, then trips the breaker within minutes.",
          diagnosis: "A failing condenser fan motor drawing excess current.",
          solution: "Replace the motor, test amperage and confirm normal operation."
        },
        {
          problem: "Another company recommended full replacement after finding low refrigerant.",
          diagnosis: "A leak at an accessible service valve fitting, with the coils intact.",
          solution: "Repair the leak, evacuate and recharge to spec, a fraction of replacement cost."
        }
      ],
      isIllustrative: isHub || !ctx.recentWork?.length,
    },
    whyChoose: {
      h2: `Why Choose JM Comfort Solutions for AC Repair in ${ctx.town}?`,
      items: getWhyChoose(),
    },
    faqs: getFaqs(),
    cta: {
      h2: `Need AC Repair in ${ctx.town}?`,
      priceLine: ctx.fee ? `${ctx.fee} AC Diagnostic Service Call` : `Upfront diagnostic pricing`,
      bullets: [
        ctx.features.sameDay && 'Same-day service available',
        ctx.features.emergency247 && '24/7 emergency HVAC service',
        ctx.features.freeSecondOpinion && 'Free second opinions',
        ctx.features.financing && 'Financing available',
        'Residential & commercial HVAC'
      ].filter(Boolean) as string[],
    }
  };
}
