import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Tags, Plus, Trash2 } from "lucide-react";

async function createTag(formData: FormData) {
  "use server";
  await requireAdmin();
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  if (!name || !slug) return;

  await prisma.tag.create({
    data: {
      name,
      slug: slug.toLowerCase().replace(/\s+/g, "-"),
    },
  });
  revalidatePath("/admin/tags");
}

async function deleteTag(id: string) {
  "use server";
  await requireAdmin();
  await prisma.tag.delete({ where: { id } });
  revalidatePath("/admin/tags");
}

export default async function AdminTagsPage() {
  await requireAdmin();

  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { articles: true } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
        <p className="text-muted-foreground mt-1">
          Manage tags for career articles, skill areas, and trending industry keywords.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Create form */}
        <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-xs h-fit">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
            <Plus className="h-5 w-5 text-primary" />
            Add New Tag
          </h2>
          <form action={createTag} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Remote Work"
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Slug</label>
              <input
                type="text"
                name="slug"
                required
                placeholder="e.g. remote-work"
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full py-2.5 bg-primary hover:opacity-90 text-primary-foreground rounded-lg text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              Create Tag
            </button>
          </form>
        </div>

        {/* Tags list */}
        <div className="md:col-span-2 bg-card text-card-foreground rounded-xl border border-border shadow-xs overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/40 flex items-center gap-2 font-semibold text-foreground">
            <Tags className="h-5 w-5 text-muted-foreground" />
            Active Tags ({tags.length})
          </div>
          <div className="p-5 flex flex-wrap gap-2.5">
            {tags.length === 0 ? (
              <div className="w-full py-8 text-center text-muted-foreground text-sm">
                No tags created yet. Add your first tag using the form!
              </div>
            ) : (
              tags.map((tag) => (
                <div
                  key={tag.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted/30 text-sm hover:bg-muted/60 transition-colors"
                >
                  <span className="font-semibold text-foreground">#{tag.name}</span>
                  <span className="text-xs text-muted-foreground">({tag._count.articles})</span>
                  <form
                    action={async () => {
                      "use server";
                      await deleteTag(tag.id);
                    }}
                    className="inline"
                  >
                    <button
                      type="submit"
                      className="text-muted-foreground hover:text-destructive transition-colors ml-1 p-0.5 rounded cursor-pointer"
                      title="Delete Tag"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
