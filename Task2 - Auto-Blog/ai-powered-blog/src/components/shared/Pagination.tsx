import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}) {
  if (totalPages <= 1) return null;

  const separator = baseUrl.includes("?") ? "&" : "?";
  const prevUrl = `${baseUrl}${separator}page=${currentPage - 1}`;
  const nextUrl = `${baseUrl}${separator}page=${currentPage + 1}`;

  return (
    <div className="flex items-center justify-center gap-6 mt-12 pt-8 border-t border-[var(--line)]">
      {currentPage <= 1 ? (
        <span className="flex items-center px-4 py-2 text-sm font-bold text-[var(--mute)] cursor-not-allowed opacity-50">
          <ChevronLeft className="w-4 h-4 mr-2" /> Previous
        </span>
      ) : (
        <Link href={prevUrl} className="flex items-center px-4 py-2 text-sm font-bold text-[var(--ink)] border border-[var(--line)] bg-[var(--card)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
          <ChevronLeft className="w-4 h-4 mr-2" /> Previous
        </Link>
      )}
      
      <span className="text-sm font-medium text-[var(--mute)]">
        Page {currentPage} of {totalPages}
      </span>
      
      {currentPage >= totalPages ? (
        <span className="flex items-center px-4 py-2 text-sm font-bold text-[var(--mute)] cursor-not-allowed opacity-50">
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </span>
      ) : (
        <Link href={nextUrl} className="flex items-center px-4 py-2 text-sm font-bold text-[var(--ink)] border border-[var(--line)] bg-[var(--card)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Link>
      )}
    </div>
  );
}
