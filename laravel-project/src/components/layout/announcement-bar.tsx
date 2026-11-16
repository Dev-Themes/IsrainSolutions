import Link from "next/link";
import { Phone, Clock, ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-[var(--brand)] text-[var(--bg)] text-xs py-2 px-4 border-b border-[var(--line)]">
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="flex items-center font-medium">
            <Clock className="w-3.5 h-3.5 mr-1.5 text-[var(--accent)] shrink-0" />
            <span className="hidden sm:inline">Guaranteed response from local trades within 2 hours</span>
            <span className="sm:hidden">Fast local quotes &lt; 2 hrs</span>
          </span>
          <span className="hidden md:inline text-[var(--line-subtle)]">&middot;</span>
          <span className="hidden md:inline text-[var(--line-subtle)]">
            8,784+ verified contractors &middot; 45% established UK coverage &amp; USA expansion
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs font-semibold">
          <a
            href="tel:+448001234567"
            className="flex items-center hover:text-[var(--accent)] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 mr-1 text-[var(--accent)]" />
            <span className="hidden sm:inline">24/7 Dispatch: 0800 123 4567</span>
            <span className="sm:hidden">0800 123 4567</span>
          </a>
          <Link
            href="/quote"
            className="hidden lg:inline-flex items-center text-[var(--accent)] hover:underline"
          >
            <span>Post a job free</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
