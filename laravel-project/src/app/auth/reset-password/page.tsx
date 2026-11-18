"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, CheckCircle2, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { PasswordInput } from "@/components/ui/password-input";

export default function ResetPasswordPage() {
  return (
    <React.Suspense fallback={<div className="p-12 text-center text-xs text-[var(--text-muted)]">Loading reset form...</div>}>
      <ResetPasswordContent />
    </React.Suspense>
  );
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "sarah.jenkins@example.com";
  const { resetUserPassword } = useAuth();

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
      setError("Passwords do not match. Please verify and re-enter.");
      return;
    }

    const resetOk = resetUserPassword(email, newPassword);
    if (!resetOk) {
      setError("Unable to update password. Please ensure this email is valid or try again.");
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/auth/login");
    }, 1800);
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
            Updating password for <strong className="text-[var(--text)]">{email}</strong>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-[var(--radius-sm)] bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-5 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] text-xs text-center space-y-2">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-[var(--text)]">Password Updated Successfully</div>
            <p className="text-[var(--text-muted)]">
              Your new password is now active. Redirecting you to the sign-in screen...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                New Password
              </label>
              <PasswordInput
                required
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError("");
                }}
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Confirm New Password
              </label>
              <PasswordInput
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                placeholder="Re-enter password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-[var(--radius)] btn-primary font-bold text-xs text-white transition-colors shadow-xs mt-2 flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>Save &amp; Sign In</span>
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
