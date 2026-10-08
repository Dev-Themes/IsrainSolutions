import { requireAdmin } from "@/lib/auth/guards";
import { getUsers } from "@/actions/admin/users";
import { DataTable } from "@/components/admin/data-table";

export default async function AdminUsersPage() {
  await requireAdmin();

  const allUsers = await getUsers();

  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Role", accessorKey: "role" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Users</h1>
      <DataTable columns={columns} data={allUsers} />
    </div>
  );
}
