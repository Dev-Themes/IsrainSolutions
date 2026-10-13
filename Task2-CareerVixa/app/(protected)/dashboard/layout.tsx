import { requireClientUser } from "@/lib/client/auth";
import ClientSidebar from "@/components/client/ClientSidebar";
import ClientHeader from "@/components/client/ClientHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireClientUser();

  return (
    <div className="dashboard-client flex min-h-screen w-full bg-dashboard-bg text-dashboard-text-primary transition-colors" data-dashboard="client">
      <ClientSidebar user={session.user} />
      <div className="flex flex-col sm:pl-16 lg:pl-64 w-full min-h-screen">
        <ClientHeader user={session.user} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
