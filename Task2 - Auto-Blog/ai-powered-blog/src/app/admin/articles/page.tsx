import { requireAdmin } from "@/lib/auth/guards";
import { db } from "@/db";
import { articles, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export default async function AdminArticlesPage() {
  await requireAdmin();

  const allArticles = await db.query.articles.findMany({
    orderBy: [desc(articles.createdAt)],
    with: {
      category: true,
    }
  });

  const columns = [
    { header: "Title", accessorKey: "title", cell: (item: any) => <Link href={`/admin/articles/${item.id}/edit`} className="font-medium hover:underline">{item.title}</Link> },
    { header: "Status", accessorKey: "status", cell: (item: any) => <Badge variant={item.status === "PUBLISHED" ? "default" : "secondary"}>{item.status}</Badge> },
    { header: "Category", accessorKey: "category", cell: (item: any) => item.category?.name || "Uncategorized" },
    { header: "Author", accessorKey: "authorName" },
    { header: "Date", accessorKey: "createdAt", cell: (item: any) => new Date(item.createdAt).toLocaleDateString() },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <p className="text-muted-foreground">Manage your articles.</p>
        </div>
        <Link href="/admin/articles/new">
          <Button><Plus className="w-4 h-4 mr-2" /> New Article</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={allArticles} />
    </div>
  );
}
