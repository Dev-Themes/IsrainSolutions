import { prisma } from "@/lib/prisma";
import { FileText, Folder, Tags, FileEdit, Clock, Eye, MousePointerClick, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [
    totalArticles,
    pendingArticles,
    publishedArticles,
    draftArticles,
    totalCategories,
    totalTags,
    trafficAggregate,
    topArticles,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.article.count({ where: { status: "PUBLISHED" } }),
    prisma.article.count({ where: { status: "DRAFT" } }),
    prisma.category.count(),
    prisma.tag.count(),
    prisma.article.aggregate({
      _sum: { viewsCount: true, clicksCount: true },
    }),
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { viewsCount: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        viewsCount: true,
        clicksCount: true,
        isAIGenerated: true,
        author: { select: { name: true, email: true } },
      },
    }),
  ]);

  const totalViews = trafficAggregate._sum.viewsCount || 0;
  const totalClicks = trafficAggregate._sum.clicksCount || 0;

  const stats = [
    { title: "Pending Review", value: pendingArticles, icon: Clock, href: "/admin/articles?status=PENDING_REVIEW", highlight: pendingArticles > 0 },
    { title: "Platform Views", value: totalViews, icon: Eye, href: "/admin/articles?status=PUBLISHED" },
    { title: "Referral Clicks", value: totalClicks, icon: MousePointerClick, href: "/admin/articles?status=PUBLISHED" },
    { title: "Total Articles", value: totalArticles, icon: FileText, href: "/admin/articles" },
    { title: "Published", value: publishedArticles, icon: FileText, href: "/admin/articles?status=PUBLISHED" },
    { title: "Categories", value: totalCategories, icon: Folder, href: "/admin/categories" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your career blog content and statistics.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <Link
            key={i}
            href={stat.href}
            className={`rounded-2xl border bg-card text-card-foreground shadow-xs hover:shadow-md transition-all cursor-pointer ${
              stat.highlight
                ? "border-amber-400 bg-amber-50/40 dark:bg-amber-950/20"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.title}</h3>
              <div
                className={`rounded-xl p-2.5 flex items-center justify-center shrink-0 border ${
                  stat.highlight
                    ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                    : "bg-[#EAF1FF] dark:bg-[#20324E] text-[#17479B] dark:text-[#A2C4FF] border-[#D1DDEE] dark:border-[#344762]"
                }`}
              >
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="p-6 pt-0 flex items-baseline justify-between">
              <div
                className={`text-3xl font-black tracking-tight tabular-nums ${
                  stat.highlight ? "text-amber-900 dark:text-amber-200" : "text-foreground"
                }`}
              >
                {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
              </div>
              {stat.highlight && (
                <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-800 px-2.5 py-0.5 rounded-full">
                  Action Required
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Top Performing Articles (Spec 008 Analytics) */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-lg">Top Performing Articles</h2>
          </div>
          <Link href="/admin/articles" className="text-xs text-primary hover:underline font-semibold cursor-pointer">
            View All &rarr;
          </Link>
        </div>

        {topArticles.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            No published articles yet to display traffic analytics.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/40 text-xs text-muted-foreground uppercase border-b border-border">
                <tr>
                  <th className="px-4 py-2.5">Article Title</th>
                  <th className="px-4 py-2.5">Author</th>
                  <th className="px-4 py-2.5 text-center">Views</th>
                  <th className="px-4 py-2.5 text-center">Promo Clicks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {topArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/articles/${art.id}/edit`}
                          className="hover:text-primary transition-colors text-foreground font-semibold"
                        >
                          {art.title}
                        </Link>
                        {art.isAIGenerated && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                            <Sparkles className="h-2.5 w-2.5" />
                            AI
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {art.author?.name || art.author?.email || "CareerVixa"}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-[#2458C6] dark:text-[#78A5FF]">
                      {art.viewsCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-[#17479B] dark:text-[#A2C4FF]">
                      {art.clicksCount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
