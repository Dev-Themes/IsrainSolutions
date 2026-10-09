import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-nav font-bold uppercase tracking-widest text-fg-2">
        <li>
          <Link href="/" className="hover:text-ice transition-colors">Home</Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-ice/70" />
        </li>
        <li>
          <span aria-current="page" className="text-fg-0">{current}</span>
        </li>
      </ol>
    </nav>
  );
}
