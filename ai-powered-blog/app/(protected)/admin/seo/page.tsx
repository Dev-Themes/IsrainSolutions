import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import {
  SearchCheck,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Pencil,
  Image as ImageIcon,
  FileText,
  TrendingUp,
  Sparkles,
  Info,
  SlidersHorizontal,
  ShieldCheck,
  Link2,
} from "lucide-react";

interface AuditResult {
  id: string;
  title: string;
  slug: string;
  status: string;
  categoryName: string;
  wordCount: number;
  titleLength: number;
  metaTitle: string | null;
  metaDescription: string | null;
  descLength: number;
  hasCoverImage: boolean;
  tagCount: number;
  hasOriginalSource: boolean;
  originalSourceUrl: string | null;
  outboundLinksCount: number;
  viewsCount: number;
  score: number;
  grade: "EXCELLENT" | "GOOD" | "ATTENTION" | "CRITICAL";
  issues: { severity: "error" | "warning" | "info"; text: string }[];
}

function auditArticle(article: any): AuditResult {
  const contentText = (article.content || "").replace(/<[^>]*>/g, "").replace(/#|\*|`|_/g, "");
  const words = contentText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const effectiveTitle = article.metaTitle || article.title || "";
  const titleLength = effectiveTitle.length;

  const effectiveDesc = article.metaDescription || article.summary || "";
  const descLength = effectiveDesc.length;

  const hasCoverImage = Boolean(article.coverImage && article.coverImage.trim().length > 0);
  const tagCount = article.tags?.length || 0;

  const issues: { severity: "error" | "warning" | "info"; text: string }[] = [];
  let score = 0;

  // 1. Title Audit (20 pts)
  if (titleLength >= 30 && titleLength <= 65) {
    score += 20;
  } else if (titleLength > 65 && titleLength <= 75) {
    score += 14;
    issues.push({ severity: "warning", text: `Title is ${titleLength} chars (Google typically truncates at 65)` });
  } else if (titleLength > 75) {
    score += 8;
    issues.push({ severity: "error", text: `Title too long (${titleLength} chars)` });
  } else if (titleLength > 0 && titleLength < 30) {
    score += 10;
    issues.push({ severity: "warning", text: `Title is short (${titleLength} chars, recommended 35-65)` });
  } else {
    issues.push({ severity: "error", text: "Missing title" });
  }

  // 2. Meta Description Audit (25 pts)
  if (article.metaDescription && article.metaDescription.trim().length >= 110 && article.metaDescription.trim().length <= 165) {
    score += 25;
  } else if (article.metaDescription && article.metaDescription.trim().length > 165) {
    score += 18;
    issues.push({ severity: "warning", text: `Meta description is ${article.metaDescription.length} chars (may truncate at 160)` });
  } else if (article.metaDescription && article.metaDescription.trim().length > 0) {
    score += 15;
    issues.push({ severity: "warning", text: `Meta description is short (${article.metaDescription.length} chars, recommended 120-160)` });
  } else if (article.summary && article.summary.length >= 80) {
    score += 12;
    issues.push({ severity: "warning", text: "Using article summary fallback; write a dedicated SEO meta description" });
  } else {
    issues.push({ severity: "error", text: "Missing meta description (critical for search snippets)" });
  }

  // 3. Content Depth & Quality (25 pts)
  if (wordCount >= 800) {
    score += 25;
  } else if (wordCount >= 450) {
    score += 18;
  } else if (wordCount >= 250) {
    score += 10;
    issues.push({ severity: "warning", text: `Moderate length (${wordCount} words). Aim for 800+ for high search rankings` });
  } else {
    score += 4;
    issues.push({ severity: "error", text: `Thin content (${wordCount} words). High risk of low search visibility` });
  }

  // 4. Visual Media / OpenGraph (15 pts)
  if (hasCoverImage) {
    score += 15;
  } else {
    issues.push({ severity: "error", text: "Missing cover image (required for Google Discover & OpenGraph rich cards)" });
  }

  // 5. Taxonomy & Discoverability (15 pts)
  let taxonomyScore = 0;
  if (article.category?.name) {
    taxonomyScore += 8;
  } else {
    issues.push({ severity: "warning", text: "No category assigned" });
  }

  if (tagCount >= 2) {
    taxonomyScore += 7;
  } else if (tagCount === 1) {
    taxonomyScore += 4;
    issues.push({ severity: "info", text: "Add 1-2 more tags for contextual discovery" });
  } else {
    issues.push({ severity: "warning", text: "No tags assigned" });
  }
  score += taxonomyScore;

  // 6. Source Attribution & Citation Integrity (E-E-A-T Governance)
  const rawContent = article.content || "";
  const markdownLinks = (rawContent.match(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g) || []).length;
  const htmlLinks = (rawContent.match(/href=["'](https?:\/\/[^"']+)["']/g) || []).length;
  const outboundLinksCount = markdownLinks + htmlLinks;

  const hasOriginalSource = Boolean(article.originalSourceUrl && article.originalSourceUrl.trim().length > 0);
  if (hasOriginalSource) {
    if (!/^https?:\/\/.+/i.test(article.originalSourceUrl.trim())) {
      issues.push({ severity: "error", text: "Malformed primary citation URL (must start with http:// or https://)" });
    }
  }

  if (article.promotionalUrl) {
    if (!/^https?:\/\/.+/i.test(article.promotionalUrl.trim())) {
      issues.push({ severity: "warning", text: "Malformed promotional URL (must start with http:// or https://)" });
    }
  }

  if (wordCount >= 700 && outboundLinksCount === 0 && !hasOriginalSource) {
    issues.push({ severity: "info", text: "No outbound citations detected. Adding links to authoritative sources boosts E-E-A-T trust" });
  }

  // Grade classification
  let grade: "EXCELLENT" | "GOOD" | "ATTENTION" | "CRITICAL";
  if (score >= 85) grade = "EXCELLENT";
  else if (score >= 70) grade = "GOOD";
  else if (score >= 50) grade = "ATTENTION";
  else grade = "CRITICAL";

  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    status: article.status,
    categoryName: article.category?.name || "Uncategorized",
    wordCount,
    titleLength,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    descLength,
    hasCoverImage,
    tagCount,
    hasOriginalSource,
    originalSourceUrl: article.originalSourceUrl,
    outboundLinksCount,
    viewsCount: article.viewsCount || 0,
    score,
    grade,
    issues,
  };
}

export default async function AdminSeoAuditPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; search?: string }>;
}) {
  await requireAdmin();
  const { filter = "all", search = "" } = await searchParams;

  const rawArticles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { name: true } },
      tags: { select: { name: true } },
    },
  });

  const audits = rawArticles.map(auditArticle);

  // Filter & Search
  const filteredAudits = audits.filter((item) => {
    if (search) {
      const q = search.toLowerCase();
      const matchesSearch = item.title.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (filter === "critical") return item.grade === "CRITICAL" || item.grade === "ATTENTION";
    if (filter === "optimized") return item.grade === "EXCELLENT";
    if (filter === "missing_meta") return !item.metaDescription;
    if (filter === "missing_image") return !item.hasCoverImage;
    if (filter === "missing_sources") return !item.hasOriginalSource && item.outboundLinksCount === 0;
    if (filter === "published") return item.status === "PUBLISHED";
    return true;
  });

  // Global KPIs
  const totalArticles = audits.length;
  const avgScore = totalArticles > 0 ? Math.round(audits.reduce((acc, a) => acc + a.score, 0) / totalArticles) : 0;
  const fullyOptimizedCount = audits.filter((a) => a.grade === "EXCELLENT").length;
  const needsAttentionCount = audits.filter((a) => a.grade === "ATTENTION" || a.grade === "CRITICAL").length;
  const missingMetaCount = audits.filter((a) => !a.metaDescription).length;
  const missingImageCount = audits.filter((a) => !a.hasCoverImage).length;
  const missingSourcesCount = audits.filter((a) => !a.hasOriginalSource && a.outboundLinksCount === 0).length;
  const thinContentCount = audits.filter((a) => a.wordCount < 400).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">SEO Health & Content Audit</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
              Spec 009 Engine
            </span>
          </div>
          <p className="text-muted-foreground mt-1">
            Automated search engine optimization audit, meta tagging compliance, and content quality insights across all CareerVixa publications.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/sitemap.xml"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-card hover:bg-muted text-foreground text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            <ExternalLink className="h-4 w-4" />
            View XML Sitemap
          </Link>
          <Link
            href="/robots.txt"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-card hover:bg-muted text-foreground text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            <ExternalLink className="h-4 w-4" />
            View Robots.txt
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Overall Platform Score */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Average SEO Score</span>
            <SearchCheck className={`h-5 w-5 ${avgScore >= 80 ? "text-emerald-500" : avgScore >= 65 ? "text-amber-500" : "text-rose-500"}`} />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold">{avgScore}</span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
          <div className="mt-3 w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                avgScore >= 80 ? "bg-emerald-500" : avgScore >= 65 ? "bg-amber-500" : "bg-rose-500"
              }`}
              style={{ width: `${Math.min(100, Math.max(0, avgScore))}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {fullyOptimizedCount} of {totalArticles} articles reach high ranking standards
          </p>
        </div>

        {/* Action Needed */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Requires Attention</span>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">{needsAttentionCount}</span>
            <span className="text-xs text-muted-foreground">articles</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {missingMetaCount} missing meta descriptions, {missingImageCount} without cover images
          </p>
        </div>

        {/* Thin Content Risk */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Thin Content Risk</span>
            <FileText className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold">{thinContentCount}</span>
            <span className="text-xs text-muted-foreground">&lt; 400 words</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            In-depth guides (800+ words) receive up to 3x more search engine impressions
          </p>
        </div>

        {/* Schema & Indexing Status */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Schema & Crawl Index</span>
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">JSON-LD Active</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Article & BreadcrumbList schemas automatically injected into all public article pages
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card p-4 rounded-xl border">
        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-medium">
          <Link
            href="/admin/seo?filter=all"
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filter === "all" ? "bg-primary text-primary-foreground font-semibold" : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            All Articles ({totalArticles})
          </Link>
          <Link
            href="/admin/seo?filter=published"
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filter === "published" ? "bg-primary text-primary-foreground font-semibold" : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            Published Only
          </Link>
          <Link
            href="/admin/seo?filter=critical"
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filter === "critical" ? "bg-amber-600 text-white font-semibold" : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            Needs Improvement ({needsAttentionCount})
          </Link>
          <Link
            href="/admin/seo?filter=optimized"
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filter === "optimized" ? "bg-emerald-600 text-white font-semibold" : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            High Quality 85+ ({fullyOptimizedCount})
          </Link>
          <Link
            href="/admin/seo?filter=missing_meta"
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filter === "missing_meta" ? "bg-rose-600 text-white font-semibold" : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            Missing Meta ({missingMetaCount})
          </Link>
          <Link
            href="/admin/seo?filter=missing_sources"
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filter === "missing_sources" ? "bg-indigo-600 text-white font-semibold" : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            Uncited Content ({missingSourcesCount})
          </Link>
        </div>

        {/* Search */}
        <form method="GET" action="/admin/seo" className="relative flex-shrink-0 sm:w-64">
          <input type="hidden" name="filter" value={filter} />
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search article titles..."
            className="w-full text-xs rounded-lg border border-border bg-background px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </form>
      </div>

      {/* Audit Results Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/40 text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-5 py-3.5">Article & URL Slug</th>
                <th className="px-4 py-3.5 text-center">Score</th>
                <th className="px-4 py-3.5">Title Length</th>
                <th className="px-4 py-3.5">Meta Description</th>
                <th className="px-4 py-3.5">Content Depth</th>
                <th className="px-4 py-3.5">Image & Social</th>
                <th className="px-4 py-3.5">Trust & Citations</th>
                <th className="px-4 py-3.5">Key Action Items</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAudits.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-muted-foreground">
                    No articles match the current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredAudits.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                    {/* Title & Slug */}
                    <td className="px-5 py-4 max-w-xs">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-foreground line-clamp-1">{item.title}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="px-1.5 py-0.5 rounded bg-muted text-[10px] uppercase font-bold tracking-wider">
                            {item.status}
                          </span>
                          <span className="truncate">/{item.slug}</span>
                        </div>
                      </div>
                    </td>

                    {/* SEO Score Badge */}
                    <td className="px-4 py-4 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span
                          className={`inline-flex items-center justify-center w-11 h-11 rounded-full text-sm font-bold border-2 ${
                            item.score >= 85
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                              : item.score >= 70
                              ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                              : item.score >= 50
                              ? "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                              : "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
                          }`}
                        >
                          {item.score}
                        </span>
                        <span className="text-[10px] mt-1 font-semibold text-muted-foreground">
                          {item.grade === "EXCELLENT" ? "Optimal" : item.grade === "GOOD" ? "Good" : item.grade === "ATTENTION" ? "Moderate" : "Critical"}
                        </span>
                      </div>
                    </td>

                    {/* Title Check */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {item.titleLength >= 30 && item.titleLength <= 65 ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                        )}
                        <div>
                          <div className="text-xs font-medium">{item.titleLength} chars</div>
                          <div className="text-[10px] text-muted-foreground">Optimal: 35-65</div>
                        </div>
                      </div>
                    </td>

                    {/* Meta Description Check */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {item.metaDescription ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-rose-500 flex-shrink-0" />
                        )}
                        <div>
                          <div className="text-xs font-medium">
                            {item.metaDescription ? `${item.descLength} chars` : "Missing"}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {item.metaDescription ? "Explicit tag set" : "Fallback to summary"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Content Depth */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {item.wordCount >= 600 ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        ) : item.wordCount >= 350 ? (
                          <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                        )}
                        <div>
                          <div className="text-xs font-medium">{item.wordCount} words</div>
                          <div className="text-[10px] text-muted-foreground">
                            {item.wordCount >= 800 ? "In-depth guide" : item.wordCount >= 450 ? "Standard article" : "Thin content"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Cover Image / OpenGraph */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {item.hasCoverImage ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-rose-500 flex-shrink-0" />
                        )}
                        <div>
                          <div className="text-xs font-medium">{item.hasCoverImage ? "Configured" : "None"}</div>
                          <div className="text-[10px] text-muted-foreground">OpenGraph Card</div>
                        </div>
                      </div>
                    </td>

                    {/* Trust & Citations */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {item.hasOriginalSource ? (
                          <ShieldCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        ) : item.outboundLinksCount > 0 ? (
                          <Link2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        ) : (
                          <Info className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <div>
                          <div className="text-xs font-medium">
                            {item.hasOriginalSource
                              ? "Verified Source"
                              : item.outboundLinksCount > 0
                              ? `${item.outboundLinksCount} links cited`
                              : "No citations"}
                          </div>
                          <div className="text-[10px] text-muted-foreground">E-E-A-T Signal</div>
                        </div>
                      </div>
                    </td>

                    {/* Action Items List */}
                    <td className="px-4 py-4 max-w-xs">
                      {item.issues.length === 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5" /> All checks passing
                        </span>
                      ) : (
                        <div className="flex flex-col gap-1">
                          {item.issues.slice(0, 2).map((iss, i) => (
                            <span
                              key={i}
                              className={`text-[11px] leading-tight flex items-start gap-1 ${
                                iss.severity === "error"
                                  ? "text-rose-600 dark:text-rose-400 font-medium"
                                  : iss.severity === "warning"
                                  ? "text-amber-600 dark:text-amber-400"
                                  : "text-muted-foreground"
                              }`}
                            >
                              &bull; {iss.text}
                            </span>
                          ))}
                          {item.issues.length > 2 && (
                            <span className="text-[10px] text-muted-foreground font-medium">
                              +{item.issues.length - 2} more recommendations
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-2">
                        {item.status === "PUBLISHED" && (
                          <Link
                            href={`/articles/${item.slug}`}
                            target="_blank"
                            title="Preview public article"
                            className="p-1.5 rounded-lg border border-border bg-card hover:bg-muted text-foreground transition-all shadow-xs cursor-pointer"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/articles/${item.id}/edit`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all shadow-xs cursor-pointer"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit SEO
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Best Practice & Knowledge Guide */}
      <div className="rounded-xl border bg-muted/30 p-6">
        <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          CareerVixa Search Engine Optimization Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted-foreground leading-relaxed">
          <div className="space-y-1.5">
            <h4 className="font-semibold text-foreground">1. Title Tag Strategy</h4>
            <p>
              Front-load core career terms (e.g., &quot;Resume Writing&quot;, &quot;Software Engineer Interview&quot;). Keep title length under 60 characters so Google and Bing snippets display without truncation.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-semibold text-foreground">2. Meta Descriptions</h4>
            <p>
              Write compelling 130–155 character descriptions ending with an implicit call to action. Meta descriptions directly drive Click-Through Rates (CTR) from organic search results.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-semibold text-foreground">3. Visuals & Structured Data</h4>
            <p>
              Always attach high-resolution 1200x630px cover images. CareerVixa embeds BlogPosting and BreadcrumbList JSON-LD schemas automatically to qualify for rich snippet carousel features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
