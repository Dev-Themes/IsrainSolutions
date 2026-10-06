"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  items: string[];
}

export function ServiceAccordion({ data }: { data: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {data.map((section, idx) => (
        <div key={idx} className="border border-stroke bg-bg-2">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex justify-between items-center p-6 text-left hover:bg-bg-3 transition-colors"
          >
            <h3 className="font-bold text-ice-500 text-xl">{section.title}</h3>
            <ChevronDown 
              className={`w-6 h-6 transition-transform duration-300 ${
                openIndex === idx ? "rotate-180 text-ice-500" : "text-text-2"
              }`} 
            />
          </button>
          
          <div 
            className={`grid transition-all duration-300 ease-in-out ${
              openIndex === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-6 border-t border-stroke bg-bg-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-2 text-text-1 hover:text-ice-500 transition-colors cursor-pointer">
                      <span className="w-1.5 h-1.5 rounded-full bg-ice-500 flex-shrink-0"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
