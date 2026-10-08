import Link from "next/link";
import React from "react";
import { getPublishedArticles } from "@/actions/public";

const images = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
  "https://images.unsplash.com/photo-1487528278747-ba99ed528ebc",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
  "https://images.unsplash.com/photo-1487611459768-bd414656ea10",
  "https://images.unsplash.com/photo-1492515114975-b062d1a270ae",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
  "https://images.unsplash.com/photo-1497366216548-37526070297c",
  "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902"
];

function Img({ index, className, alt = "" }: { index: number; className?: string; alt?: string }) {
  // Using direct unsplash URL. Aspect ratio should be handled by className sizes.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${images[index]}?auto=format&fit=crop&q=80&w=800`}
      alt={alt}
      className={`object-cover ${className}`}
      loading="lazy"
    />
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="text-3xl font-bold tracking-tight text-[var(--ink)]">{title}</h2>
      <div className="h-px bg-[var(--line)] flex-1" />
    </div>
  );
}

function MetaInfo({ category, date, author }: { category: string; date: string; author: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--mute)] font-medium mb-3">
      <span className="text-[var(--accent)] uppercase tracking-wider text-xs">{category}</span>
      <span>•</span>
      <span>{date}</span>
      <span>•</span>
      <span>By {author}</span>
    </div>
  );
}

export default async function HomePage() {
  const articles = await getPublishedArticles({ page: 1, limit: 10 });
  const featured = articles[0];
  const sideHeroes = articles.slice(1, 4);
  const latest = articles.length > 4 ? articles.slice(4, 8) : articles.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <section className="max-w-[1200px] w-full mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Hero Article */}
          {featured && (
            <article className="lg:col-span-8 group flex flex-col">
              <div className="overflow-hidden mb-6 bg-[var(--line)] aspect-video">
                <Img index={0} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" alt={featured.title} />
              </div>
              <MetaInfo 
                category={featured.category?.name || "Uncategorized"} 
                date={featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ""} 
                author={featured.authorName} 
              />
              <Link href={`/article/${featured.slug}`} className="focus-visible:outline-none">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                  {featured.title}
                </h1>
              </Link>
              <p className="font-serif text-lg md:text-xl text-[var(--mute)] leading-relaxed max-w-3xl line-clamp-3">
                {featured.excerpt}
              </p>
            </article>
          )}

          {/* Side Hero Articles */}
          <div className="lg:col-span-4 flex flex-col gap-8 justify-between">
            {sideHeroes.map((article, idx) => (
              <React.Fragment key={article.id}>
                <article className="group">
                  {idx === 0 && (
                    <div className="overflow-hidden mb-4 bg-[var(--line)] aspect-[3/2]">
                      <Img index={1} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" alt={article.title} />
                    </div>
                  )}
                  <MetaInfo 
                    category={article.category?.name || "Uncategorized"} 
                    date={article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ""} 
                    author={article.authorName} 
                  />
                  <Link href={`/article/${article.slug}`}>
                    <h3 className="text-xl font-bold leading-tight mb-2 text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                </article>
                {idx < sideHeroes.length - 1 && <div className="h-px bg-[var(--line)] w-full" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Topic grid */}
      <section className="bg-[var(--card)] border-y border-[var(--line)] py-12">
        <div className="max-w-[1200px] w-full mx-auto px-4 md:px-6">
          <SectionHeading title="Explore Topics" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Career Development", "Job Search", "Resumes & Interviews", "Remote Work"].map((topic, i) => (
              <Link key={topic} href={`/category/${topic.toLowerCase().replace(/ /g, '-')}`} className="group p-6 border border-[var(--line)] bg-[var(--bg)] hover:border-[var(--accent)] transition-colors">
                <h3 className="font-bold text-lg text-[var(--ink)] group-hover:text-[var(--accent)]">{topic}</h3>
                <span className="text-sm text-[var(--mute)] mt-2 block">View articles &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Latest articles */}
      <section className="max-w-[1200px] w-full mx-auto px-4 md:px-6 py-16">
        <SectionHeading title="Latest Articles" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {latest.map((item, i) => (
            <article key={item.id} className="group flex flex-col">
              <div className="overflow-hidden mb-4 bg-[var(--line)] aspect-[3/2]">
                <Img index={i + 2} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" alt={item.title} />
              </div>
              <MetaInfo 
                category={item.category?.name || "Uncategorized"} 
                date={item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ""} 
                author={item.authorName} 
              />
              <Link href={`/article/${item.slug}`}>
                <h3 className="text-lg font-bold leading-snug mb-2 text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </h3>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Editor's picks */}
      <section className="bg-[var(--ink)] py-16 text-[var(--bg)]">
        <div className="max-w-[1200px] w-full mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--bg)]">Editor's Picks</h2>
            <div className="h-px bg-[var(--line)] opacity-20 flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {[
              { title: "The Myth of the Dream Job", img: 6, cat: "Career Development" },
              { title: "Why Your Resume is Being Ignored", img: 7, cat: "Resumes & Interviews" },
              { title: "Networking for Introverts", img: 8, cat: "Professional Skills" },
              { title: "Managing Up: How to Work With Your Boss", img: 9, cat: "Career Development" }
            ].map((item, i) => (
              <article key={i} className="group flex items-start gap-6">
                <div className="overflow-hidden flex-shrink-0 w-32 md:w-48 bg-[var(--line)] aspect-square">
                  <Img index={item.img} className="w-full h-full transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-medium mb-2 text-[var(--mute)]">
                    <span className="text-[var(--mark)] uppercase tracking-wider">{item.cat}</span>
                  </div>
                  <Link href={`/article/editor-${i}`}>
                    <h3 className="text-xl font-bold leading-snug mb-3 text-[var(--bg)] group-hover:text-[var(--accent)] transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="font-serif text-sm md:text-base text-[var(--mute)] line-clamp-2">
                    A deep dive into strategies that actually work when navigating this complex landscape.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. In-depth guides */}
      <section className="max-w-[1200px] w-full mx-auto px-4 md:px-6 py-16">
        <SectionHeading title="In-Depth Guides" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { title: "The Ultimate Guide to Tech Interviews", img: 10, cat: "Resumes & Interviews", desc: "Everything you need to know from initial screening to system design rounds and behavioral assessments." },
            { title: "Navigating a Career Pivot at 40", img: 11, cat: "Career Development", desc: "A practical framework for assessing your skills, redefining your narrative, and successfully switching industries." }
          ].map((item, i) => (
            <article key={i} className="group">
              <div className="overflow-hidden mb-6 bg-[var(--line)] aspect-[16/9]">
                <Img index={item.img} className="w-full h-full transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <MetaInfo category={item.cat} date="Oct 10, 2026" author="Expert Panel" />
              <Link href={`/article/guide-${i}`}>
                <h3 className="text-3xl font-bold leading-tight mb-4 text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </h3>
              </Link>
              <p className="font-serif text-lg text-[var(--mute)] leading-relaxed">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Browse by stage */}
      <section className="bg-[var(--card)] border-y border-[var(--line)] py-16">
        <div className="max-w-[1200px] w-full mx-auto px-4 md:px-6">
          <SectionHeading title="Browse by Career Stage" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stage: "Early Career", desc: "Landing your first role and building foundations." },
              { stage: "Mid-Level", desc: "Navigating promotions, management, and specialized tracks." },
              { stage: "Leadership", desc: "Executive presence, organizational strategy, and legacy." }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-[var(--line)] bg-[var(--bg)]">
                <h3 className="text-2xl font-bold text-[var(--ink)] mb-4">{item.stage}</h3>
                <p className="font-serif text-[var(--mute)] mb-6">{item.desc}</p>
                <Link href={`/stage/${i}`} className="text-[var(--ink)] font-bold border-b-2 border-[var(--accent)] pb-1 hover:text-[var(--accent)] transition-colors">
                  Explore {item.stage} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Quick reads */}
      <section className="max-w-[1200px] w-full mx-auto px-4 md:px-6 py-16">
        <SectionHeading title="Quick Reads" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "5 Resume Action Verbs to Use Right Now", img: 12 },
            { title: "How to Decline a Job Offer Gracefully", img: 13 },
            { title: "The Perfect Follow-Up Email", img: 14 },
            { title: "Daily Habits of Highly Effective Managers", img: 15 }
          ].map((item, i) => (
            <article key={i} className="group border border-[var(--line)] bg-[var(--card)] p-4 flex flex-col">
              <div className="overflow-hidden mb-4 bg-[var(--line)] aspect-video">
                <Img index={item.img} className="w-full h-full transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <span className="text-[var(--accent)] uppercase tracking-wider text-xs font-medium mb-2">3 Min Read</span>
              <Link href={`/article/quick-${i}`}>
                <h3 className="text-base font-bold leading-snug text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </h3>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* 8. Tools */}
      <section className="bg-[var(--bg)] py-16">
        <div className="max-w-[1200px] w-full mx-auto px-4 md:px-6">
          <SectionHeading title="Career Tools" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Resume Builder", icon: "📄", desc: "Create a tailored resume in minutes with our templates." },
              { name: "Salary Insights", icon: "💰", desc: "Compare compensation across industries and roles." },
              { name: "Interview Prep", icon: "🎯", desc: "Practice with AI-driven mock interview scenarios." }
            ].map((tool, i) => (
              <div key={i} className="flex flex-col items-start p-6 bg-[var(--card)] border border-[var(--line)] hover:border-[var(--accent)] transition-colors">
                <span className="text-4xl mb-4">{tool.icon}</span>
                <h3 className="text-xl font-bold text-[var(--ink)] mb-2">{tool.name}</h3>
                <p className="text-[var(--mute)] text-sm mb-4">{tool.desc}</p>
                <button className="mt-auto font-medium text-[var(--accent)] hover:underline">Try it out &rarr;</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Partners */}
      <section className="border-y border-[var(--line)] bg-[var(--card)] py-12">
        <div className="max-w-[1200px] w-full mx-auto px-4 md:px-6 text-center">
          <p className="text-sm font-medium text-[var(--mute)] uppercase tracking-wider mb-6">Trusted by professionals at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Minimalist text representations of partner logos */}
            <span className="text-xl font-bold font-sans">Acme Corp</span>
            <span className="text-xl font-bold font-serif italic">Globex</span>
            <span className="text-xl font-bold font-sans tracking-widest">SOYUZ</span>
            <span className="text-xl font-bold font-serif">Initech</span>
            <span className="text-xl font-bold font-sans">Umbrella</span>
          </div>
        </div>
      </section>

      {/* 10. Publish CTA & 11. Newsletter */}
      <section className="max-w-[1200px] w-full mx-auto px-4 md:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Publish CTA */}
        <div className="bg-[var(--accent)] p-8 md:p-12 text-[var(--bg)] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <span className="text-9xl">✍️</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 relative z-10">Want to publish your article?</h2>
          <p className="font-serif text-lg mb-8 max-w-md relative z-10 text-[var(--bg)]/90">
            Join our community of experts. Share your knowledge and help others grow in their careers.
          </p>
          <div className="relative z-10">
            <Link href="/how-it-works" className="inline-block bg-[var(--bg)] text-[var(--ink)] font-bold px-6 py-3 hover:bg-[var(--mark)] transition-colors">
              Submit a Pitch
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-[var(--card)] border border-[var(--line)] p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-[var(--ink)]">Stay Ahead</h2>
          <p className="font-serif text-lg text-[var(--mute)] mb-8">
            Get our best career advice and exclusive job opportunities delivered directly to your inbox every Tuesday.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 h-12 px-4 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] placeholder:text-[var(--mute)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              required
            />
            <button 
              type="submit" 
              className="h-12 px-8 bg-[var(--ink)] text-[var(--bg)] font-bold hover:bg-[var(--accent)] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
