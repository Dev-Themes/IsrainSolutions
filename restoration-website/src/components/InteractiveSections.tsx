'use client';

import { useState } from 'react';
import { ArrowRight } from '@/components/ui/Icon';

export function ProcessCards({ steps }: { steps: readonly (readonly [string, string])[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="process-cards">
      {steps.map(([title, copy], index) => (
        <button
          type="button"
          className={`process-card ${active === index ? 'is-active' : ''}`}
          key={title}
          onClick={() => setActive(index)}
          aria-pressed={active === index}
        >
          <span className="process-card-number">0{index + 1}</span>
          <span className="process-card-title">{title}</span>
          <span className="process-card-copy">{copy}</span>
          <ArrowRight size={20} />
        </button>
      ))}
    </div>
  );
}

function FAQItem({ question, answer, initiallyOpen }: { question: string; answer: string; initiallyOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  return (
    <details
      className={`faq-item ${isOpen ? 'is-open' : ''}`}
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
    >
      <summary>
        <span>{question}</span>
        <b aria-hidden="true">+</b>
      </summary>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </details>
  );
}

export function FAQAccordion({ faqs }: { faqs: readonly (readonly [string, string])[] }) {
  return (
    <div className="faq-accordion">
      {faqs.map(([question, answer], index) => (
        <FAQItem
          key={question}
          question={question}
          answer={answer}
          initiallyOpen={index === 0}
        />
      ))}
    </div>
  );
}

const DEFAULT_SAFETY_STEPS = [
  {
    num: '01',
    heading: 'Keep clear of electrical hazards',
    detail: 'Do not enter standing water near electrical outlets, appliances or wiring. If electricity may be involved, stay clear and contact emergency services or a qualified electrician.'
  },
  {
    num: '02',
    heading: 'Stop the water — only if safe',
    detail: 'If a plumbing leak is responsible and the shut-off valve is safely accessible from a dry area, turn it off. Do not enter unsafe areas to reach it.'
  },
  {
    num: '03',
    heading: 'Call a restoration specialist',
    detail: 'Explain where the water is coming from, when the damage began and which rooms are affected. Ask what you should do while waiting for an assessment.'
  },
  {
    num: '04',
    heading: 'Document the damage',
    detail: 'From a safe, dry location, take photographs of affected areas and visible damage. Keep relevant receipts and notes for your records.'
  },
  {
    num: '05',
    heading: 'Move belongings if it is safe',
    detail: 'Move small valuables away from the affected area only when you can do so without exposure to electrical, structural or contaminated-water hazards.'
  }
] as const;

export function SafetySteps() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggle = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div id="steps">
      <div className="steps-head">
        <h2>What to do first</h2>
        <span>Five essential steps</span>
      </div>
      {DEFAULT_SAFETY_STEPS.map((step, index) => {
        const isOpen = openIndices.includes(index);
        const detailId = `d${index + 1}`;
        return (
          <div className="step" key={step.num}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={detailId}
              onClick={() => toggle(index)}
            >
              <span className="num">{step.num}</span>
              <span className="heading">{step.heading}</span>
              <span className="plus" aria-hidden="true">+</span>
            </button>
            <div id={detailId} className="detail" hidden={!isOpen}>
              {step.detail}
            </div>
          </div>
        );
      })}
    </div>
  );
}
