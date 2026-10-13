import { requireAdmin } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session;
  try {
    session = await requireAdmin();
  } catch (error) {
    redirect("/login");
  }

  return (
    <div className="dashboard-admin flex min-h-screen w-full bg-dashboard-bg text-dashboard-text-primary transition-colors" data-dashboard="admin">
      <AdminSidebar user={session?.user} />
      <div className="flex flex-col sm:pl-16 lg:pl-64 w-full min-h-screen">
        <AdminHeader user={session?.user} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
