"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Briefcase,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Mail,
  ShieldCheck,
  RefreshCw,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";
import { PasswordInput } from "@/components/ui/password-input";

export default function RegisterPage() {
  return (
    <React.Suspense fallback={<div className="p-12 text-center text-xs text-[var(--text-muted)]">Loading Registration...</div>}>
      <RegisterContent />
    </React.Suspense>
  );
}

function RegisterContent() {
  const router = useRouter();
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") === "pro" ? "PRO" : "CUSTOMER";
  const redirectTarget = searchParams.get("redirect") || "";

  // Form State
  const [step, setStep] = React.useState<"DETAILS" | "VERIFY_CODE">("DETAILS");
  const [role, setRole] = React.useState<"CUSTOMER" | "PRO">(defaultRole);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [licenseNumber, setLicenseNumber] = React.useState("");
  const [country, setCountry] = React.useState<"UK" | "US">("UK");
  const [category, setCategory] = React.useState("plumbing");

  // Verification State
  const [otpCode, setOtpCode] = React.useState("");
  const [isSendingCode, setIsSendingCode] = React.useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = React.useState(false);
  const [previewOtp, setPreviewOtp] = React.useState<string | null>(null);
  const [cooldown, setCooldown] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  // Cooldown timer
  React.useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleRequestVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailTrimmed = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailTrimmed)) {
      setError("Please provide a valid email address (e.g. yourname@domain.com).");
      return;
    }

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (role === "PRO" && !companyName.trim()) {
      setError("Please provide your trading company name.");
      return;
    }

    setIsSendingCode(true);

    try {
      // Real-time DNS MX lookup + code dispatch through server
      const res = await fetch("/api/auth/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailTrimmed, purpose: "REGISTRATION" }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setIsSendingCode(false);
        setError(data.error || "Failed to verify email domain. Please provide an active email account.");
        return;
      }

      setIsSendingCode(false);
      setPreviewOtp(data.previewCode || null);
      setStep("VERIFY_CODE");
      setCooldown(60);
    } catch (err) {
      console.error(err);
      setIsSendingCode(false);
      setError("Network error validating email. Please check your connection and try again.");
    }
  };

  const handleVerifyOtpAndCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otpCode || otpCode.trim().length !== 6) {
      setError("Please enter the complete 6-digit confirmation code.");
      return;
    }

    setIsVerifyingCode(true);

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          code: otpCode.trim(),
          purpose: "REGISTRATION",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setIsVerifyingCode(false);
        setError(data.error || "Incorrect verification code. Please check and try again.");
        return;
      }

      // Email confirmed legitimate and active in cloud -> Register Account
      login(email.trim(), role, name.trim(), password, {
        phone: phone.trim() || undefined,
        companyName: role === "PRO" ? companyName.trim() : undefined,
      });

      setIsVerifyingCode(false);
      setSuccess(true);

      setTimeout(() => {
        if (redirectTarget) {
          router.push(redirectTarget);
        } else if (role === "CUSTOMER") {
          router.push("/dashboard/homeowner");
        } else {
          router.push("/dashboard/pro");
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      setIsVerifyingCode(false);
      setError("Error verifying code. Please try again.");
    }
  };

  const handleResendCode = async () => {
    if (cooldown > 0) return;
    setError(null);
    setIsSendingCode(true);

    try {
      const res = await fetch("/api/auth/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), purpose: "REGISTRATION" }),
      });
      const data = await res.json();
      setIsSendingCode(false);

      if (data.success) {
        setPreviewOtp(data.previewCode || null);
        setCooldown(60);
      } else {
        setError(data.error || "Failed to resend code.");
      }
    } catch {
      setIsSendingCode(false);
      setError("Could not resend verification code.");
    }
  };

  return (
    <div className="section-light py-10 sm:py-16 max-w-lg mx-auto px-4">
      <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] p-6 sm:p-10 border border-[var(--line)] shadow-soft">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-full bg-[var(--brand-light)] text-[var(--accent)] mx-auto flex items-center justify-center mb-3 border border-[var(--line)]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
            {step === "DETAILS" ? "Create an Account" : "Verify Your Email"}
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {step === "DETAILS"
              ? "Join the UK & USA verified trade network"
              : `We sent a 6-digit code to ${email}`}
          </p>
        </div>

        {redirectTarget === "/quote" && step === "DETAILS" && (
          <div className="mb-5 p-3 rounded-[var(--radius-sm)] bg-[var(--brand-light)] border border-[var(--brand)]/20 text-xs text-[var(--text)] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--pine-accent)] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Fast Registration:</span> Verify your email to post your job and receive quotes.
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-[var(--radius-sm)] bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-medium flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-[var(--radius-sm)] bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Email verified &amp; account activated! Preparing your workspace...</span>
          </div>
        )}

        {/* STEP 1: ACCOUNT DETAILS INPUT */}
        {step === "DETAILS" && (
          <>
            {/* Role Toggle */}
            <div className="grid grid-cols-2 gap-2 mb-6 p-1 rounded-[var(--radius)] bg-[var(--bg-alt)] border border-[var(--line)]">
              <button
                type="button"
                onClick={() => {
                  setRole("CUSTOMER");
                  setError(null);
                }}
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
                onClick={() => {
                  setRole("PRO");
                  setError(null);
                }}
                className={`py-2 px-3 rounded-[var(--radius-sm)] text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                  role === "PRO"
                    ? "bg-[var(--surface)] text-[var(--text)] shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Trade Professional</span>
              </button>
            </div>

            <form onSubmit={handleRequestVerification} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError(null);
                    }}
                    placeholder="David Thornton"
                    className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError(null);
                    }}
                    placeholder="+44 7123 456789"
                    className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Legitimate Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  placeholder="name@gmail.com or company email"
                  className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                />
                <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
                  Must be an active email with verified mail servers. A 6-digit confirmation code will be dispatched.
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Password
                </label>
                <PasswordInput
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder="Minimum 8 characters"
                  required
                />
              </div>

              {/* Trade Pro fields */}
              {role === "PRO" && (
                <div className="pt-3 border-t border-[var(--line)] space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                    Trade Accreditation Details
                  </span>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      Company / Trading Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                        setError(null);
                      }}
                      placeholder="Apex Heating Ltd"
                      className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                        Country
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value as "UK" | "US")}
                        className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs font-semibold text-[var(--text)] focus:outline-none"
                      >
                        <option value="UK">🇬🇧 United Kingdom</option>
                        <option value="US">🇺🇸 United States</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                        Primary Trade
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs font-semibold text-[var(--text)] focus:outline-none"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat.slug} value={cat.slug}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      Licence / Registration Number
                    </label>
                    <input
                      type="text"
                      value={licenseNumber}
                      onChange={(e) => {
                        setLicenseNumber(e.target.value);
                        setError(null);
                      }}
                      placeholder="e.g. Gas Safe #592104 or NICEIC #D60312"
                      className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSendingCode}
                  className="w-full py-3.5 rounded-[var(--radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] font-bold text-xs sm:text-sm text-white transition-colors shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span>
                    {isSendingCode ? "Validating Mail Servers & Dispatching Code..." : "Verify Email & Continue"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-[var(--line)] text-center text-xs text-[var(--text-muted)]">
              Already registered?{" "}
              <Link
                href={`/auth/login${redirectTarget ? `?redirect=${encodeURIComponent(redirectTarget)}` : ""}`}
                className="font-bold text-[var(--accent)] hover:underline"
              >
                Sign in
              </Link>
            </div>
          </>
        )}

        {/* STEP 2: 6-DIGIT EMAIL CODE CONFIRMATION */}
        {step === "VERIFY_CODE" && (
          <div className="space-y-5">
            <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] text-xs text-[var(--text)] space-y-2">
              <div className="flex items-center space-x-2 text-[var(--pine-accent)] font-bold">
                <Mail className="w-4 h-4 shrink-0" />
                <span>Verification Code Dispatched</span>
              </div>
              <p className="text-[var(--text-muted)] leading-relaxed">
                We sent a 6-digit confirmation code to <strong>{email}</strong>. Please check your inbox or spam folder.
              </p>
              {previewOtp && (
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 font-mono text-[11px]">
                  <strong>Demo / Testing Code:</strong> {previewOtp}
                </div>
              )}
            </div>

            <form onSubmit={handleVerifyOtpAndCreate} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 text-center">
                  Enter 6-Digit Confirmation Code
                </label>
                <div className="relative max-w-[240px] mx-auto">
                  <KeyRound className="w-4 h-4 text-[var(--text-light)] absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => {
                      setOtpCode(e.target.value.replace(/[^0-9]/g, ""));
                      setError(null);
                    }}
                    placeholder="123456"
                    className="w-full pl-9 pr-3 py-2.5 rounded-[var(--radius-sm)] border-2 border-[var(--brand)] bg-[var(--surface)] text-center font-mono font-black text-lg tracking-[0.3em] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    autoFocus
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifyingCode || otpCode.length !== 6}
                className="w-full py-3 rounded-[var(--radius)] btn-primary font-bold text-xs sm:text-sm text-white transition-colors shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                <span>{isVerifyingCode ? "Verifying Code..." : "Confirm & Activate Account"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between pt-3 text-xs text-[var(--text-muted)] border-t border-[var(--line)]">
              <button
                type="button"
                onClick={() => {
                  setStep("DETAILS");
                  setError(null);
                }}
                className="hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Change Email</span>
              </button>

              <button
                type="button"
                onClick={handleResendCode}
                disabled={cooldown > 0 || isSendingCode}
                className="font-bold text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isSendingCode ? "animate-spin" : ""}`} />
                <span>{cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend Code"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
