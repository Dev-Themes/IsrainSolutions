"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  items: { label: string; slug: string }[];
}

export function ServiceAccordion({ data }: { data: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col gap-4 text-left">
      {data.map((accordion, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="clip-chamfer bg-card border border-line overflow-hidden transition-colors relative isolate" style={{'--cut': '8px'} as any}>
            <button
              onClick={() => toggle(index)}
              className={cn(
                "w-full px-6 py-5 flex items-center justify-center relative hover:bg-card-2 transition-colors cursor-pointer",
                isOpen && "bg-[image:var(--grad-brand)]"
              )}
              aria-expanded={isOpen}
            >
              {isOpen && <div className="absolute inset-0 bg-card opacity-90 -z-10"></div>}
              <span className="font-display font-bold text-[20px] uppercase tracking-wide text-fg-0">{accordion.title}</span>
              <ChevronDown className={cn("absolute right-6 w-5 h-5 text-ice transition-transform duration-350", isOpen && "rotate-180")} />
            </button>
            <div 
              className={cn(
                "grid transition-all duration-350 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 p-6 border-t border-line">
                  {accordion.items.map((item, idx) => (
                    <li key={idx} className="group flex items-center gap-3">
                      <span className="w-1.5 h-1.5 shrink-0 bg-[image:var(--grad-brand)] rounded-full"></span>
                      <Link 
                        href={`/ac-repair-${item.slug}`} 
                        className="text-fg-1 text-[15px] group-hover:text-transparent group-hover:bg-[image:var(--grad-brand)] group-hover:bg-clip-text transition-all duration-300 group-hover:translate-x-1 inline-block"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
