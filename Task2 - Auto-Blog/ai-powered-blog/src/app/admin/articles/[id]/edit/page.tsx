import { requireAdmin } from "@/lib/auth/guards";
import { db } from "@/db";
import { articles, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateArticle, deleteArticle } from "@/actions/admin/articles";
import { redirect, notFound } from "next/navigation";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;

  const article = await db.query.articles.findFirst({
    where: eq(articles.id, id),
  });

  if (!article) notFound();

  const allCategories = await db.select().from(categories);

  async function handleUpdate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const categoryId = formData.get("categoryId") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") as any;

    await updateArticle(id, { title, slug, categoryId, content, status });
  }

  async function handleDelete() {
    "use server";
    await deleteArticle(id);
    redirect("/admin/articles");
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Edit Article</h1>
        <form action={handleDelete}>
           <Button variant="destructive" type="submit">Delete</Button>
        </form>
      </div>

      <form action={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" defaultValue={article.status} className="w-full border p-2 rounded">
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="PENDING">PENDING</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input name="title" defaultValue={article.title} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <Input name="slug" defaultValue={article.slug} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="categoryId" defaultValue={article.categoryId || ""} className="w-full border p-2 rounded" required>
            <option value="">Select a category</option>
            {allCategories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea name="content" defaultValue={article.content} className="w-full border p-2 rounded h-40" required />
        </div>
        <Button type="submit">Update Article</Button>
      </form>
    </div>
  );
}
