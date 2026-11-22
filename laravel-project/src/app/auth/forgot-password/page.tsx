"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  KeyRound,
  Mail,
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { findUserByEmail } = useAuth();

  const [step, setStep] = React.useState<"ENTER_EMAIL" | "VERIFY_CODE">("ENTER_EMAIL");
  const [email, setEmail] = React.useState("");
  const [otpCode, setOtpCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [previewOtp, setPreviewOtp] = React.useState<string | null>(null);
  const [foundAccountName, setFoundAccountName] = React.useState<string>("");
  const [cooldown, setCooldown] = React.useState(0);

  React.useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSendResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      setError("Please provide a valid email address (e.g. name@example.com).");
      return;
    }

    const existingUser = findUserByEmail(trimmed);
    if (!existingUser) {
      setError(
        `No TradeConnect account was found registered with "${trimmed}". Please check your email or register a new account.`
      );
      return;
    }

    setFoundAccountName(existingUser.name || "Valued User");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, purpose: "PASSWORD_RESET" }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to dispatch password reset code.");
        return;
      }

      setPreviewOtp(data.previewCode || null);
      setStep("VERIFY_CODE");
      setCooldown(60);
    } catch {
      setIsLoading(false);
      setError("Network error dispatching verification code. Please try again.");
    }
  };

  const handleVerifyResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otpCode || otpCode.trim().length !== 6) {
      setError("Please enter the complete 6-digit confirmation code.");
      return;
    }

    setIsVerifying(true);

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          code: otpCode.trim(),
          purpose: "PASSWORD_RESET",
        }),
      });

      const data = await res.json();
      setIsVerifying(false);

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid reset code. Please check and try again.");
        return;
      }

      // Authorized -> proceed to reset-password form with security token
      router.push(`/auth/reset-password?email=${encodeURIComponent(email.trim())}&token=${data.token}`);
    } catch {
      setIsVerifying(false);
      setError("Error verifying reset code.");
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), purpose: "PASSWORD_RESET" }),
      });
      const data = await res.json();
      setIsLoading(false);

      if (data.success) {
        setPreviewOtp(data.previewCode || null);
        setCooldown(60);
      } else {
        setError(data.error || "Failed to resend code.");
      }
    } catch {
      setIsLoading(false);
      setError("Could not resend code.");
    }
  };

  return (
    <div className="section-light py-12 sm:py-20 max-w-md mx-auto px-4">
      <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] p-8 border border-[var(--line)] shadow-soft">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--accent-light)] text-[var(--accent)] mx-auto flex items-center justify-center mb-3 border border-[var(--line)]">
            <KeyRound className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text)]">
            {step === "ENTER_EMAIL" ? "Reset Your Password" : "Enter Verification Code"}
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {step === "ENTER_EMAIL"
              ? "We verify your genuine email before authorizing password reset"
              : `Security code sent to ${email}`}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-[var(--radius-sm)] bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-medium flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div>{error}</div>
              {step === "ENTER_EMAIL" && (
                <div className="text-[11px] text-[var(--text-muted)]">
                  Try demo accounts: <code className="bg-[var(--bg-alt)] px-1 rounded">sarah.jenkins@example.com</code> or <code className="bg-[var(--bg-alt)] px-1 rounded">david.thornton@apexheating.co.uk</code>
                </div>
              )}
            </div>
          </div>
        )}

        {step === "ENTER_EMAIL" ? (
          <form onSubmit={handleSendResetCode} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Account Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[var(--text-light)] absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                />
              </div>
            </div>

            <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line-subtle)] text-[11px] text-[var(--text-muted)] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
              <span>
                To prevent unauthorized password resets, we verify MX mail server records and dispatch an OTP code directly to this address.
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-[var(--radius)] btn-brand font-bold text-xs text-white transition-colors shadow-xs mt-2 flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? "Validating & Sending Code..." : "Verify & Send 6-Digit Code"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] text-xs text-[var(--text)] space-y-2">
              <div className="flex items-center space-x-2 text-[var(--pine-accent)] font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Reset Code Dispatched</span>
              </div>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Hello <strong>{foundAccountName}</strong>. A 6-digit authorization code was dispatched to <strong>{email}</strong>.
              </p>
              {previewOtp && (
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 font-mono text-[11px]">
                  <strong>Demo / Testing Code:</strong> {previewOtp}
                </div>
              )}
            </div>

            <form onSubmit={handleVerifyResetCode} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 text-center">
                  Enter 6-Digit Code
                </label>
                <div className="relative max-w-[220px] mx-auto">
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => {
                      setOtpCode(e.target.value.replace(/[^0-9]/g, ""));
                      setError(null);
                    }}
                    placeholder="123456"
                    className="w-full py-2.5 rounded-[var(--radius-sm)] border-2 border-[var(--brand)] bg-[var(--surface)] text-center font-mono font-black text-lg tracking-[0.3em] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    autoFocus
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying || otpCode.length !== 6}
                className="w-full py-3 rounded-[var(--radius-sm)] btn-primary text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer disabled:opacity-50"
              >
                <span>{isVerifying ? "Verifying..." : "Authorize Password Reset"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between pt-3 text-xs text-[var(--text-muted)] border-t border-[var(--line)]">
              <button
                type="button"
                onClick={() => {
                  setStep("ENTER_EMAIL");
                  setError(null);
                }}
                className="hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Change Email</span>
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={cooldown > 0 || isLoading}
                className="font-bold text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
                <span>{cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}</span>
              </button>
            </div>
          </div>
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
