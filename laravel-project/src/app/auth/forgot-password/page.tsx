"use client";

import * as React from "react";
import Link from "next/link";
import { KeyRound, Mail, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="section-light py-12 sm:py-20 max-w-md mx-auto px-4">
      <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] p-8 border border-[var(--line)] shadow-soft">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--accent-light)] text-[var(--accent)] mx-auto flex items-center justify-center mb-3 border border-[var(--line)]">
            <KeyRound className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text)]">
            Reset Your Password
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Enter your email and we will send you secure recovery instructions
          </p>
        </div>

        {isSubmitted ? (
          <div className="space-y-4">
            <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] text-xs text-[var(--text)] space-y-2">
              <div className="flex items-center space-x-2 text-[var(--pine-accent)] font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Password Reset Email Dispatched</span>
              </div>
              <p className="text-[var(--text-muted)] leading-relaxed">
                We sent a password reset authorization link to <strong>{email}</strong>. Please check your inbox and spam folders.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={`/auth/reset-password?email=${encodeURIComponent(email)}&token=demo-sec-token-994`}
                className="w-full py-3 rounded-[var(--radius-sm)] btn-primary text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <span>Proceed to Reset Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-[var(--accent)] hover:underline font-semibold cursor-pointer"
              >
                Did not receive email? Click here to retry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Account Email Address
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-[var(--radius)] btn-brand font-bold text-xs text-white transition-colors shadow-xs mt-2 flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? "Sending Reset Link..." : "Send Reset Link"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-[var(--line)] text-center text-xs text-[var(--text-muted)]">
          <Link
            href="/auth/login"
            className="font-bold text-[var(--accent)] hover:underline inline-flex items-center space-x-1"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
