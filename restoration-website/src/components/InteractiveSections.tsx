'use client';

import { useState } from 'react';
import { ArrowRight } from '@/components/ui/Icon';

export function ProcessCards({ steps }: { steps: readonly (readonly [string, string])[] }) {
  const [active, setActive] = useState(0);
  return <div className="process-cards">
    {steps.map(([title, copy], index) => <button className={`process-card ${active === index ? 'is-active' : ''}`} key={title} onClick={() => setActive(index)} aria-pressed={active === index}>
      <span className="process-card-number">0{index + 1}</span><span className="process-card-title">{title}</span><span className="process-card-copy">{copy}</span><ArrowRight size={20}/>
    </button>)}
  </div>;
}

export function FAQAccordion({ faqs }: { faqs: readonly (readonly [string, string])[] }) {
  const [active, setActive] = useState<number | null>(0);
  return <div className="faq-accordion">{faqs.map(([question, answer], index) => <div className={`faq-item ${active === index ? 'is-open' : ''}`} key={question}>
    <button aria-expanded={active === index} onClick={() => setActive(active === index ? null : index)}><span>{question}</span><b aria-hidden="true">+</b></button>
    <div className="faq-answer"><p>{answer}</p></div>
  </div>)}</div>;
}
