import Link from "next/link";
import { User, Briefcase, ArrowRight, ShieldCheck, FileCheck } from "lucide-react";

export default function DashboardPortalSelector() {
  return (
    <div className="section-light section-spacing">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
            Authorized Account Portals
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
            Select Your Account Workspace
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2 max-w-md mx-auto">
            TradeConnect provides tailored workspaces for both homeowners managing service quotes and certified trade contractors managing leads and contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* HOMEOWNER PORTAL CARD */}
          <div className="p-6 sm:p-8 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex flex-col justify-between hover:border-[var(--brand)] transition-colors">
            <div>
              <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-[var(--brand-light)] text-[var(--brand)] flex items-center justify-center mb-5 border border-[var(--line)]">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[var(--text)] mb-2">
                Homeowner Portal
              </h2>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                View your requested repair jobs, compare received contractor quotes, manage active contracts, and view completed job history.
              </p>

              <ul className="space-y-1.5 text-xs text-[var(--text)] mb-6 py-3 border-y border-[var(--line-subtle)]">
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--pine-accent)]" />
                  <span>3 Active Quote Requests</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FileCheck className="w-3.5 h-3.5 text-[var(--pine-accent)]" />
                  <span>Contract history with receipts</span>
                </li>
              </ul>
            </div>

            <Link
              href="/dashboard/homeowner"
              className="btn-primary w-full py-3 rounded-[var(--radius-sm)] font-bold text-xs text-center flex items-center justify-center space-x-1.5"
            >
              <span>Open Homeowner Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* SERVICE PROVIDER PORTAL CARD */}
          <div className="p-6 sm:p-8 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex flex-col justify-between hover:border-[var(--brand)] transition-colors">
            <div>
              <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mb-5 border border-[var(--line)]">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[var(--text)] mb-2">
                Contractor Dispatch Portal
              </h2>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                Access incoming local homeowner leads, submit proposals, manage active on-site work orders, and review customer ratings.
              </p>

              <ul className="space-y-1.5 text-xs text-[var(--text)] mb-6 py-3 border-y border-[var(--line-subtle)]">
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--pine-accent)]" />
                  <span>Live Local Leads Feed</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FileCheck className="w-3.5 h-3.5 text-[var(--pine-accent)]" />
                  <span>Contract history & performance stats</span>
                </li>
              </ul>
            </div>

            <Link
              href="/dashboard/pro"
              className="btn-brand w-full py-3 rounded-[var(--radius-sm)] font-bold text-xs text-center flex items-center justify-center space-x-1.5"
            >
              <span>Open Contractor Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
