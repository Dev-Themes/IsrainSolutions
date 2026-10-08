import { requireAdmin } from "@/lib/auth/guards";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { DataTable } from "@/components/admin/data-table";

export default async function AdminCategoriesPage() {
  await requireAdmin();

  const allCategories = await db.select().from(categories);

  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Slug", accessorKey: "slug" },
    { header: "Description", accessorKey: "description" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
      <DataTable columns={columns} data={allCategories} />
    </div>
  );
}
