import { CircleCheck } from "lucide-react";

interface CheckListProps {
  items: string[];
  variant: 'cool' | 'warm';
}

export function CheckList({ items, variant }: CheckListProps) {
  const accentClass = variant === 'cool' ? 'text-ice' : 'text-ember';

  return (
    <ul className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-8">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <CircleCheck className={`w-5 h-5 shrink-0 mt-0.5 ${accentClass}`} aria-hidden="true" />
          <span className="text-fg-1 text-[15px]">{item}</span>
        </li>
      ))}
    </ul>
  );
}
