import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="py-12 md:py-20 lg:py-24 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
        Elevate Your Career with <span className="text-primary">Expert Insights</span>
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Discover high-quality articles on job searching, remote work, interview prep, and professional growth from industry leaders.
      </p>
      <div className="flex justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/blog">Read Latest Articles</Link>
        </Button>
      </div>
    </section>
  );
}
