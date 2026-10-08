import Link from "next/link";

export function ContributorCTA() {
  return (
    <section className="my-16 bg-[var(--accent)] p-8 md:p-12 text-[var(--bg)] flex flex-col items-center justify-center relative overflow-hidden text-center">
      <div className="absolute top-0 right-0 p-8 opacity-20">
        <span className="text-9xl">✍️</span>
      </div>
      <h3 className="text-3xl font-bold mb-4 relative z-10">Want to publish your article?</h3>
      <p className="font-serif text-lg mb-8 max-w-xl mx-auto relative z-10 text-[var(--bg)]/90">
        Join our platform to share your career insights, job search experiences, and professional growth tips with our growing community.
      </p>
      <div className="relative z-10">
        <Link href="/login" className="inline-block bg-[var(--bg)] text-[var(--ink)] font-bold px-8 py-4 hover:bg-[var(--mark)] transition-colors text-lg shadow-sm">
          Become a Contributor
        </Link>
      </div>
    </section>
  );
}
