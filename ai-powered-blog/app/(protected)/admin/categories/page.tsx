import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Folder, Plus, Trash2 } from "lucide-react";

async function createCategory(formData: FormData) {
  "use server";
  await requireAdmin();
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;

  if (!name || !slug) return;

  await prisma.category.create({
    data: {
      name,
      slug: slug.toLowerCase().replace(/\s+/g, "-"),
      description,
    },
  });
  revalidatePath("/admin/categories");
}

async function deleteCategory(id: string) {
  "use server";
  await requireAdmin();
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}

export default async function AdminCategoriesPage() {
  await requireAdmin();

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { articles: true } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground mt-1">
          Organize CareerVixa articles into focused career topics and fields.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Create form */}
        <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-xs h-fit">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
            <Plus className="h-5 w-5 text-primary" />
            Add New Category
          </h2>
          <form action={createCategory} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Resume Writing"
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Slug</label>
              <input
                type="text"
                name="slug"
                required
                placeholder="e.g. resume-writing"
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Description</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Brief description of this career category"
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full py-2.5 bg-primary hover:opacity-90 text-primary-foreground rounded-lg text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              Create Category
            </button>
          </form>
        </div>

        {/* Categories list */}
        <div className="md:col-span-2 bg-card text-card-foreground rounded-xl border border-border shadow-xs overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/40 flex items-center gap-2 font-semibold text-foreground">
            <Folder className="h-5 w-5 text-muted-foreground" />
            Active Categories ({categories.length})
          </div>
          <div className="divide-y divide-border">
            {categories.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No categories yet. Create your first career category using the form!
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">/{category.slug}</p>
                    {category.description && (
                      <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EAF1FF] dark:bg-[#20324E] text-[#17479B] dark:text-[#A2C4FF] border border-[#D1DDEE] dark:border-[#344762]">
                      {category._count.articles} {category._count.articles === 1 ? "article" : "articles"}
                    </span>
                    <form
                      action={async () => {
                        "use server";
                        await deleteCategory(category.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete Category"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
