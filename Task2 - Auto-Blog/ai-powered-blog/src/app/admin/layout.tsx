import { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth/guards";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, Tags, Folder, Users } from "lucide-react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="w-64 border-r bg-background flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">Admin Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm font-medium">
            <LayoutDashboard className="w-4 h-4" /> Overview
          </Link>
          <Link href="/admin/articles" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm font-medium">
            <FileText className="w-4 h-4" /> Articles
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm font-medium">
            <Folder className="w-4 h-4" /> Categories
          </Link>
          <Link href="/admin/tags" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm font-medium">
            <Tags className="w-4 h-4" /> Tags
          </Link>
          <Link href="/admin/users" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm font-medium">
            <Users className="w-4 h-4" /> Users
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
