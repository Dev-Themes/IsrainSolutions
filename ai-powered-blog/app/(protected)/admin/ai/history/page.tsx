import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import { format } from "date-fns";

export default async function AIHistoryPage() {
  await requireAdmin();

  const logs = await prisma.aIExecutionLog.findMany({
    orderBy: { timestamp: "desc" },
    take: 50,
    include: { article: true }
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Execution History</h1>
        <p className="text-muted-foreground mt-2">
          View recent automation runs, validation results, and published articles.
        </p>
      </div>

      <div className="bg-card text-card-foreground rounded-xl border border-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                <th className="px-6 py-3 font-semibold text-muted-foreground">Date/Time</th>
                <th className="px-6 py-3 font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-3 font-semibold text-muted-foreground">Article</th>
                <th className="px-6 py-3 font-semibold text-muted-foreground">Validation / Errors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No execution logs found.
                  </td>
                </tr>
              )}
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {format(log.timestamp, "MMM d, yyyy HH:mm")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      log.status === "SUCCESS" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" :
                      log.status === "FAILURE" ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300" :
                      "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {log.article ? (
                      <Link href={`/admin/articles/${log.articleId}/edit`} className="text-primary hover:underline font-semibold cursor-pointer">
                        {log.article.title}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-muted-foreground max-w-xs truncate">
                    {log.errorLogs || log.validationData || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
