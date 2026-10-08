import { requireAdmin } from "@/lib/auth/guards";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createArticle } from "@/actions/admin/articles";
import { redirect } from "next/navigation";

export default async function NewArticlePage() {
  await requireAdmin();

  const allCategories = await db.select().from(categories);

  async function handleCreate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const categoryId = formData.get("categoryId") as string;
    const content = formData.get("content") as string;

    const article = await createArticle({ title, slug, categoryId, content, status: "DRAFT" });
    redirect(`/admin/articles/${article.id}/edit`);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Create Article</h1>
      <form action={handleCreate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input name="title" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <Input name="slug" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="categoryId" className="w-full border p-2 rounded" required>
            <option value="">Select a category</option>
            {allCategories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea name="content" className="w-full border p-2 rounded h-40" required />
        </div>
        <Button type="submit">Save Draft</Button>
      </form>
    </div>
  );
}
