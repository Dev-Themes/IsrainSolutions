"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, User, Briefcase, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsDemo } = useAuth();
  const [role, setRole] = React.useState<"CUSTOMER" | "PRO">("CUSTOMER");
  const [email, setEmail] = React.useState("sarah.jenkins@example.com");
  const [password, setPassword] = React.useState("••••••••");
  const [remember, setRemember] = React.useState(true);

  const handleRoleToggle = (newRole: "CUSTOMER" | "PRO") => {
    setRole(newRole);
    if (newRole === "CUSTOMER") {
      setEmail("sarah.jenkins@example.com");
    } else {
      setEmail("david.thornton@apexheating.co.uk");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role, role === "CUSTOMER" ? "Sarah Jenkins" : "David Thornton");
    if (role === "CUSTOMER") {
      router.push("/dashboard/homeowner");
    } else {
      router.push("/dashboard/pro");
    }
  };

  const handleQuickDemoLogin = (targetRole: "CUSTOMER" | "PRO") => {
    loginAsDemo(targetRole);
    if (targetRole === "CUSTOMER") {
      router.push("/dashboard/homeowner");
    } else {
      router.push("/dashboard/pro");
    }
  };

  return (
    <div className="section-light py-12 sm:py-20 max-w-md mx-auto px-4">
      <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] p-8 border border-[var(--line)] shadow-soft">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--brand-light)] text-[var(--pine-accent)] mx-auto flex items-center justify-center mb-3 border border-[var(--line)]">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text)]">
            Sign In to TradeConnect
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Access your verified homeowner or contractor workspace
          </p>
        </div>

        {/* Dual Role Selector */}
        <div className="grid grid-cols-2 gap-2 mb-6 p-1 rounded-[var(--radius)] bg-[var(--bg-alt)] border border-[var(--line)]">
          <button
            type="button"
            onClick={() => handleRoleToggle("CUSTOMER")}
            className={`py-2 px-3 rounded-[var(--radius-sm)] text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
              role === "CUSTOMER"
                ? "bg-[var(--surface)] text-[var(--text)] shadow-xs"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            <User className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Homeowner</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleToggle("PRO")}
            className={`py-2 px-3 rounded-[var(--radius-sm)] text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
              role === "PRO"
                ? "bg-[var(--surface)] text-[var(--text)] shadow-xs"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-[var(--brand)]" />
            <span>Contractor Pro</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              {role === "CUSTOMER" ? "Homeowner Account Email" : "Trade Contractor Email"}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[var(--text-light)] absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Password
              </label>
              <Link href="/auth/forgot-password" className="text-xs text-[var(--accent)] hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--text-light)] absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center space-x-2 text-[var(--text-muted)] cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded border-[var(--line)] text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <span>Remember this session</span>
            </label>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-[var(--radius)] font-bold text-xs text-white transition-colors shadow-xs mt-2 flex items-center justify-center space-x-1.5 cursor-pointer ${
              role === "CUSTOMER" ? "btn-primary" : "btn-brand"
            }`}
          >
            <span>{role === "CUSTOMER" ? "Sign In to Homeowner Portal" : "Sign In to Contractor Dispatch"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Demo Credentials Strip */}
        <div className="mt-6 p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] text-xs text-[var(--text-muted)] space-y-2">
          <div className="font-bold text-[var(--text)] flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[var(--pine-accent)]" />
            <span>Instant Demo Access (Single Click):</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("CUSTOMER")}
              className="py-2 px-2.5 rounded-[var(--radius-sm)] bg-[var(--surface)] hover:bg-[var(--line-subtle)] border border-[var(--line)] text-[11px] font-bold text-[var(--text)] transition-colors cursor-pointer text-center"
            >
              Sign In as Sarah (Homeowner)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("PRO")}
              className="py-2 px-2.5 rounded-[var(--radius-sm)] bg-[var(--surface)] hover:bg-[var(--line-subtle)] border border-[var(--line)] text-[11px] font-bold text-[var(--text)] transition-colors cursor-pointer text-center"
            >
              Sign In as Apex (Contractor)
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[var(--line)] text-center text-xs text-[var(--text-muted)]">
          Do not have an account yet?{" "}
          <Link
            href="/auth/register"
            className="font-bold text-[var(--accent)] hover:underline"
          >
            Register here free
          </Link>
        </div>
      </div>
    </div>
  );
}
