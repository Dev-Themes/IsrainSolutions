"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, CheckCircle2, ArrowRight } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <React.Suspense fallback={<div className="p-12 text-center text-[var(--text-muted)]">Loading reset form...</div>}>
      <ResetPasswordContent />
    </React.Suspense>
  );
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "user@example.com";

  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  };

  return (
    <div className="section-light py-12 sm:py-20 max-w-md mx-auto px-4">
      <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] p-8 border border-[var(--line)] shadow-soft">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--pine-accent)]/15 text-[var(--pine-accent)] mx-auto flex items-center justify-center mb-3 border border-[var(--line)]">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text)]">
            Set New Password
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Updating password for <strong>{email}</strong>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-[var(--radius-sm)] bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-medium">
            {error}
          </div>
        )}

        {success ? (
          <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] text-xs text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="font-bold text-[var(--text)]">Password Updated Successfully</div>
            <p className="text-[var(--text-muted)]">
              Your password has been changed. Redirecting you to the sign-in screen...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-[var(--radius)] btn-primary font-bold text-xs text-white transition-colors shadow-xs mt-2 flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>Save & Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-[var(--line)] text-center text-xs text-[var(--text-muted)]">
          <Link
            href="/auth/login"
            className="font-bold text-[var(--accent)] hover:underline"
          >
            Cancel and Return to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
