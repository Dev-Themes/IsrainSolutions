import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-4 border-[var(--ink)] bg-[var(--card)] py-12 mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-sans font-bold text-2xl tracking-tight text-[var(--ink)] mb-4 inline-block">
              CareerVexa
            </Link>
            <p className="text-[var(--mute)] max-w-sm">
              Your daily source for career advice, job search strategies, and professional growth. Build the career you deserve.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-4">Topics</h3>
            <ul className="space-y-2 text-sm text-[var(--mute)]">
              <li><Link href="/category/career-development" className="hover:text-[var(--accent)] transition-colors">Career Development</Link></li>
              <li><Link href="/category/job-search" className="hover:text-[var(--accent)] transition-colors">Job Search</Link></li>
              <li><Link href="/category/resumes" className="hover:text-[var(--accent)] transition-colors">Resumes & Interviews</Link></li>
              <li><Link href="/category/remote" className="hover:text-[var(--accent)] transition-colors">Remote Work</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-[var(--mute)]">
              <li><Link href="/about" className="hover:text-[var(--accent)] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--accent)] transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--accent)] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[var(--line)] flex flex-col md:flex-row items-center justify-between text-sm text-[var(--mute)]">
          <p>© {new Date().getFullYear()} CareerVexa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
