import { requireAdmin } from "@/lib/auth/guards";
import { db } from "@/db";
import { tags } from "@/db/schema";
import { DataTable } from "@/components/admin/data-table";

export default async function AdminTagsPage() {
  await requireAdmin();

  const allTags = await db.select().from(tags);

  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Slug", accessorKey: "slug" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
      <DataTable columns={columns} data={allTags} />
    </div>
  );
}
