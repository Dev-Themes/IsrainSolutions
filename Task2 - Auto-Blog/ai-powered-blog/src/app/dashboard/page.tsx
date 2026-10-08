import { requireAuth } from "@/lib/auth/rbac";
import { LogOut, PenSquare, FileText, User } from "lucide-react";
import { logoutUser } from "@/actions/auth";

export default async function ClientDashboardPage() {
  const session = await requireAuth();

  return (
    <div className="min-h-[80vh] bg-[var(--bg)] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[var(--ink)] tracking-tight mb-2">
              Welcome back, {session.user.name}
            </h1>
            <p className="text-[var(--mute)]">
              This is your private dashboard. Only you and platform administrators can view this page.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-[var(--mark)]/20 text-[var(--warn)] text-xs font-bold uppercase tracking-wider rounded-full border border-[var(--mark)]/30">
              {session.user.role}
            </span>
            <form action={logoutUser}>
              <button 
                type="submit" 
                className="flex items-center gap-2 text-sm font-medium text-[var(--mute)] hover:text-[var(--warn)] transition-colors px-4 py-2 border border-[var(--line)] rounded-lg bg-[var(--card)] shadow-sm hover:shadow"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </form>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Quick Stat Cards */}
          <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--line)] shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 text-[var(--accent)]" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--ink)] mb-1">0</h3>
            <p className="text-sm font-medium text-[var(--mute)]">Published Articles</p>
          </div>
          <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--line)] shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[var(--mark)]/10 flex items-center justify-center mb-4">
              <PenSquare className="w-5 h-5 text-[var(--warn)]" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--ink)] mb-1">0</h3>
            <p className="text-sm font-medium text-[var(--mute)]">Drafts in Review</p>
          </div>
          <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--line)] shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[var(--ink)]/5 flex items-center justify-center mb-4">
              <User className="w-5 h-5 text-[var(--ink)]" />
            </div>
            <h3 className="text-lg font-bold text-[var(--ink)] mb-1 line-clamp-1">{session.user.email}</h3>
            <p className="text-sm font-medium text-[var(--mute)]">Account Email</p>
          </div>
        </div>

        <section className="bg-[var(--card)] border border-[var(--line)] rounded-xl shadow-sm p-8 text-center py-16">
          <div className="w-16 h-16 bg-[var(--bg)] rounded-full flex items-center justify-center mx-auto mb-6">
            <PenSquare className="w-8 h-8 text-[var(--mute)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">No drafts yet</h2>
          <p className="text-[var(--mute)] mb-8 max-w-md mx-auto">
            You haven&apos;t submitted any articles for review. Start your first draft using our AI assistant or paste your manual draft.
          </p>
          <button className="bg-[var(--ink)] text-[var(--bg)] px-6 py-3 rounded-lg font-bold hover:bg-[var(--accent)] transition-colors shadow-md hover:shadow-lg">
            Create New Draft
          </button>
        </section>
      </div>
    </div>
  );
}
