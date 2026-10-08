import Link from "next/link";
import { Suspense } from "react";
import { SearchInput } from "@/components/shared/SearchInput";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { getCurrentSession } from "@/lib/auth/rbac";
import { logoutUser } from "@/actions/auth";

function SearchInputFallback() {
  return <div className="w-[200px] h-10 border-[var(--line)] border bg-[var(--card)] animate-pulse rounded-full" />;
}

export async function Header() {
  const session = await getCurrentSession();

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-sans font-bold text-xl tracking-tight text-[var(--ink)]">
            CareerVexa
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/category/career-development" className="text-[var(--mute)] hover:text-[var(--accent)] transition-colors">
              Career Development
            </Link>
            <Link href="/category/job-search" className="text-[var(--mute)] hover:text-[var(--accent)] transition-colors">
              Job Search
            </Link>
            <Link href="/category/resumes" className="text-[var(--mute)] hover:text-[var(--accent)] transition-colors">
              Resumes
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Suspense fallback={<SearchInputFallback />}>
            <SearchInput />
          </Suspense>
          <ThemeToggle />
          
          <Link href="/admin" className="text-sm font-medium text-[var(--mute)] hover:text-[var(--accent)] transition-colors">
            Admin
          </Link>

          {session ? (
            <div className="flex items-center gap-4 border-l border-[var(--line)] pl-4">
              <Link href={session.user.role === 'ADMIN' ? "/admin" : "/dashboard"} className="text-sm font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors">
                {session.user.role === 'ADMIN' ? "Admin Panel" : "Dashboard"}
              </Link>
              <form action={logoutUser}>
                <button type="submit" className="text-sm font-medium text-[var(--mute)] hover:text-[var(--warn)] transition-colors">
                  Log out
                </button>
              </form>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="text-sm font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            >
              Client Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
