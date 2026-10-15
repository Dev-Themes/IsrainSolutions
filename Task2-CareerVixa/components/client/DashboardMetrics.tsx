import Link from "next/link";
import { FileEdit, Clock, AlertCircle, CheckCircle2, XCircle, BookOpen, Eye, MousePointerClick } from "lucide-react";

interface MetricsProps {
  metrics: {
    totalDrafts: number;
    pendingReview: number;
    changesRequested: number;
    rejected: number;
    published: number;
    totalSubmissions: number;
    totalViews?: number;
    totalClicks?: number;
    ctr?: string;
  };
}

export default function DashboardMetrics({ metrics }: MetricsProps) {
  const cards = [
    {
      title: "Draft Articles",
      value: metrics.totalDrafts,
      description: "Saved private drafts in progress",
      icon: FileEdit,
      href: "/dashboard/articles?status=DRAFT",
      badgeColor: "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800",
      iconColor: "text-emerald-800 dark:text-emerald-200",
    },
    {
      title: "Pending Review",
      value: metrics.pendingReview,
      description: "Submitted and awaiting Admin review",
      icon: Clock,
      href: "/dashboard/articles?status=PENDING_REVIEW",
      badgeColor: "bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800",
      iconColor: "text-amber-800 dark:text-amber-200",
    },
    {
      title: "Changes Requested",
      value: metrics.changesRequested,
      description: "Action required based on editor feedback",
      icon: AlertCircle,
      href: "/dashboard/articles?status=CHANGES_REQUESTED",
      badgeColor: "bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800",
      iconColor: "text-orange-800 dark:text-orange-200",
    },
    {
      title: "Published Articles",
      value: metrics.published,
      description: "Approved and live on CareerVixa",
      icon: CheckCircle2,
      href: "/dashboard/articles?status=PUBLISHED",
      badgeColor: "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800",
      iconColor: "text-emerald-800 dark:text-emerald-200",
    },
    {
      title: "Declined Submissions",
      value: metrics.rejected,
      description: "Articles not accepted for publication",
      icon: XCircle,
      href: "/dashboard/articles?status=REJECTED",
      badgeColor: "bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800",
      iconColor: "text-rose-800 dark:text-rose-200",
    },
    {
      title: "Total Portfolio",
      value: metrics.totalSubmissions,
      description: "All contributor articles created",
      icon: BookOpen,
      href: "/dashboard/articles",
      badgeColor: "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800",
      iconColor: "text-emerald-800 dark:text-emerald-200",
    },
    {
      title: "Article Impressions",
      value: metrics.totalViews ?? 0,
      description: "Total reader views across your live posts",
      icon: Eye,
      href: "/dashboard/articles?status=PUBLISHED",
      badgeColor: "bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800",
      iconColor: "text-sky-800 dark:text-sky-200",
    },
    {
      title: "Referral Link Clicks",
      value: metrics.totalClicks ?? 0,
      description: `${metrics.ctr || "0.0"}% click-through rate to your website`,
      icon: MousePointerClick,
      href: "/dashboard/articles?status=PUBLISHED",
      badgeColor: "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800",
      iconColor: "text-emerald-800 dark:text-emerald-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.title}
            href={card.href}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#151F32] p-5 shadow-xs transition-all hover:shadow-md hover:border-[#059669] dark:hover:border-[#34D399] hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-[#CBD5E1]">{card.title}</span>
              <div className={`rounded-xl p-2.5 flex items-center justify-center shrink-0 ${card.badgeColor}`}>
                <Icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-950 dark:text-[#F8FAFC] tracking-tight tabular-nums">{card.value}</span>
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-[#94A3B8] font-medium">{card.description}</p>
          </Link>
        );
      })}
    </div>
  );
}
