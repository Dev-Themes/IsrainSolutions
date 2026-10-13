import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import ArticleForm from "@/components/admin/ArticleForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const [article, categories, tags] = await Promise.all([
    prisma.article.findUnique({
      where: { id },
      include: {
        tags: { select: { id: true } },
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contributorProfile: true,
          },
        },
        editorialReviews: {
          orderBy: { createdAt: "desc" },
          include: {
            admin: { select: { name: true, email: true } },
          },
        },
      },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!article) {
    notFound();
  }

  const initialData = {
    ...article,
    tags: article.tags.map((t) => t.id),
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/articles"
          className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Article</h1>
          <p className="text-muted-foreground mt-1">
            Update content, SEO settings, or publication status.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <ArticleForm initialData={initialData} categories={categories} tags={tags} />
      </div>
    </div>
  );
}
