import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`bg-[var(--bg-alt)] border-b border-[var(--line)] text-xs py-2.5 px-4 ${className}`}
    >
      <div className="container-custom">
        <ol className="flex items-center space-x-2 text-[var(--text-muted)] overflow-x-auto whitespace-nowrap scrollbar-none">
          <li className="flex items-center">
            <Link
              href="/"
              className="flex items-center hover:text-[var(--text)] transition-colors focus:outline-none focus-visible:underline"
              title="Home"
            >
              <Home className="w-3.5 h-3.5 mr-1" />
              <span>Home</span>
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center space-x-2">
                <ChevronRight className="w-3.5 h-3.5 text-[var(--text-light)] shrink-0" aria-hidden="true" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-[var(--text)] transition-colors focus:outline-none focus-visible:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-[var(--text)] font-semibold truncate max-w-[240px] sm:max-w-none"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
