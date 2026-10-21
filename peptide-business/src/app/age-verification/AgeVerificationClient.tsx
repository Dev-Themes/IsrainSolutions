"use client";

import React, { useState } from "react";
import { ShieldAlert, CheckCircle2, ArrowRight, RotateCcw } from "lucide-react";

interface AgeVerificationClientProps {
  returnUrl: string;
}

export default function AgeVerificationClient({ returnUrl }: AgeVerificationClientProps) {
  const [status, setStatus] = useState<"initial" | "denied" | "loading">("initial");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirm = async () => {
    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/age-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "confirm", returnUrl }),
      });

      if (!res.ok) {
        throw new Error("Confirmation request failed");
      }

      const data = await res.json();
      // Hard redirect to ensure middleware picks up the new HTTP-only cookie
      window.location.href = data.redirectUrl || "/";
    } catch (err) {
      console.error("Age verification error:", err);
      setStatus("initial");
      setErrorMessage("Unable to verify age at this moment. Please try again.");
    }
  };

  const handleDeny = async () => {
    setStatus("loading");
    try {
      await fetch("/api/age-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deny" }),
      });
      setStatus("denied");
    } catch {
      setStatus("denied");
    }
  };

  const handleReset = () => {
    setStatus("initial");
    setErrorMessage(null);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-8 sm:px-6 relative overflow-hidden transition-colors duration-200">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Verification Card */}
      <div className="relative z-10 w-full max-w-lg mx-auto bg-surface border border-border rounded-2xl p-6 sm:p-10 shadow-2xl transition-all duration-200">
        {/* Editorial Brand Monogram / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-surface-alt border border-accent/40 text-accent mb-4 shadow-sm">
            <span className="font-display font-bold text-xl tracking-wider">PI</span>
          </div>
          <span className="block text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-1">
            Peptide Ingredients Lab
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-foreground tracking-tight">
            Age Confirmation
          </h1>
        </div>

        {status === "denied" ? (
          <div className="text-center animate-fade-in" role="alert" aria-live="polite">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-900/20 border border-amber-500/40 text-amber-600 dark:text-amber-400 mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-medium text-foreground mb-3 font-display">
              Access Restricted
            </h2>
            <p className="text-sm text-foreground-muted leading-relaxed mb-8">
              This catalog presents technical specifications for cosmetic peptide raw materials and commercial formulation inquiries. Visitors must be 18 years of age or older to browse product details and initiate inquiries.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-lg border border-border bg-surface-alt text-foreground hover:bg-background-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <RotateCcw className="w-4 h-4" />
              Re-select Confirmation
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <p className="text-sm text-foreground-muted leading-relaxed text-center mb-6">
              Welcome. This website provides technical data, ingredient profiles, and an inquiry platform intended for commercial formulation research and industry professionals.
            </p>

            <div className="bg-surface-alt border border-border rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-foreground-muted leading-relaxed">
                  Please confirm that you are at least <strong className="text-foreground font-semibold">18 years of age</strong> before entering this showcase platform.
                </p>
              </div>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-500 dark:text-red-400 bg-red-900/20 border border-red-500/40 rounded-lg p-2.5 mb-4 text-center">
                {errorMessage}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleConfirm}
                disabled={status === "loading"}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-btn-primary-text bg-btn-primary hover:bg-btn-primary-hover rounded-xl transition-all duration-150 shadow-md hover:shadow-accent/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60"
              >
                {status === "loading" ? "Verifying..." : "I am 18 or Older"}
                {status !== "loading" && <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                onClick={handleDeny}
                disabled={status === "loading"}
                className="flex-1 inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground-muted hover:text-foreground bg-surface-alt hover:bg-background-secondary rounded-xl border border-border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60"
              >
                I am Under 18
              </button>
            </div>

            <p className="mt-8 text-[11px] text-center text-foreground-muted/75 leading-normal">
              By entering, you confirm compliance with age policies. This platform is an ingredient catalog and does not sell or distribute directly online.
            </p>
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-xs text-foreground-muted">
        &copy; {new Date().getFullYear()} Peptide Ingredients Lab. All rights reserved.
      </footer>
    </main>
  );
}
