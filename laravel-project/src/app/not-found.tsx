import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="section-light py-24 sm:py-32 text-center">
      <div className="container-custom max-w-md">
        <span className="text-4xl font-extrabold text-[var(--accent)] font-serif block mb-2">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] mb-3">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-8">
          The trade category or regional location page you are looking for has been relocated or is currently under revision.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-3 rounded-[var(--radius)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white font-bold text-xs inline-flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/pros"
            className="px-5 py-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-[var(--text)] font-semibold text-xs inline-flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Browse All Trades</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
