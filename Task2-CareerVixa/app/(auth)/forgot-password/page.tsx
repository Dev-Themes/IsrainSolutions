"use client";

import { useState } from "react";
import { forgotPassword } from "@/app/actions/auth/forgot-password";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await forgotPassword({ email });

      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        setSuccess(res.success);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-bg-page">
      <div className="w-full max-w-[420px] rounded-2xl border border-border-default bg-bg-surface p-6 sm:p-8 shadow-sm">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="font-extrabold text-2xl tracking-tight text-text-heading group-hover:text-brand-primary transition-colors">
              Career<span className="text-brand-primary">Vixa</span>
            </span>
          </Link>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Executive Career Intelligence
          </p>
          <h1 className="mt-5 text-xl font-bold tracking-tight text-text-heading">
            Reset your password
          </h1>
          <p className="mt-2 text-center text-xs text-text-muted leading-relaxed">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div
              role="alert"
              id="forgot-error"
              className="rounded-lg bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-center font-medium"
            >
              {error}
            </div>
          )}
          {success && (
            <div
              role="status"
              className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-center font-medium"
            >
              {success}
            </div>
          )}

          <div>
            <label
              className="block text-xs font-semibold text-text-heading mb-1.5"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full min-h-[44px] rounded-lg border border-border-default bg-bg-page px-3.5 py-2 text-sm text-text-heading placeholder:text-text-muted/60 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby={error ? "forgot-error" : undefined}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !!success}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-lg bg-brand-btn-fill px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending link...</span>
                </>
              ) : (
                "Send reset link"
              )}
            </button>
          </div>

          <div className="text-center text-xs text-text-muted pt-2 border-t border-border-default">
            <Link
              href="/login"
              className="font-semibold text-brand-primary hover:underline"
            >
              Return to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
