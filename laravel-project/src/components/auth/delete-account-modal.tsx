"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Lock,
  X,
  Trash2,
  KeyRound,
  Eye,
  EyeOff,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "@/components/ui/toast";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: "HOMEOWNER" | "CONTRACTOR";
}

export function DeleteAccountModal({
  isOpen,
  onClose,
  role,
}: DeleteAccountModalProps) {
  const router = useRouter();
  const { user, deleteAccount } = useAuth();
  const [step, setStep] = React.useState<"CONFIRM_WARNING" | "ENTER_PASSWORD">("CONFIRM_WARNING");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleClose = () => {
    setStep("CONFIRM_WARNING");
    setPassword("");
    setShowPassword(false);
    setErrorMessage(null);
    setIsDeleting(false);
    onClose();
  };

  if (!isOpen) return null;

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!password.trim()) {
      setErrorMessage("Please enter your account password to confirm.");
      return;
    }

    setIsDeleting(true);

    const result = deleteAccount(password.trim());

    if (!result.success) {
      setIsDeleting(false);
      setErrorMessage(result.error || "Password verification failed. Account could not be deleted.");
      return;
    }

    handleClose();
    toast.success("Your TradeConnect profile, active listings, and account data have been permanently deleted.");
    router.push("/");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="fixed inset-0" onClick={handleClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md bg-[var(--surface)] text-[var(--text)] rounded-[var(--radius-lg)] border border-red-500/40 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-red-950/20 dark:bg-red-900/30 border-b border-red-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 text-red-600 dark:text-red-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <h3 className="font-extrabold text-sm sm:text-base">
              {step === "CONFIRM_WARNING"
                ? `Delete ${role === "CONTRACTOR" ? "Contractor Profile" : "Homeowner Profile"}`
                : "Confirm Password to Delete Account"}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg)] transition-colors cursor-pointer"
            aria-label="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: WARNING CONFIRMATION SCREEN */}
        {step === "CONFIRM_WARNING" && (
          <div className="p-5 space-y-4 text-xs">
            <div className="p-4 rounded-[var(--radius)] bg-red-500/10 border-2 border-red-500/30 text-red-700 dark:text-red-300 space-y-2 leading-relaxed">
              <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 font-extrabold text-sm">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>Irreversible Account Deletion Warning</span>
              </div>
              <p className="font-bold text-xs">
                This action is not revertible and it will erase all your data instantly without any data refund.
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">
                Account to be purged: <strong className="text-[var(--text)]">{user?.email}</strong>.
                All job requests, quotes, accepted contracts, transaction history, and verified status will be permanently removed.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2 border-t border-[var(--line)]">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] font-semibold hover:bg-[var(--bg)] transition-colors cursor-pointer text-xs"
              >
                Cancel / Keep Account
              </button>
              <button
                type="button"
                onClick={() => setStep("ENTER_PASSWORD")}
                className="px-4 py-2 rounded-[var(--radius-sm)] bg-red-600 hover:bg-red-700 text-white font-bold transition-colors cursor-pointer text-xs flex items-center space-x-1.5 shadow-xs"
              >
                <span>Proceed to Account Deletion</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PASSWORD ENTRY WITH VIEW PASSWORD FUNCTIONALITY */}
        {step === "ENTER_PASSWORD" && (
          <form onSubmit={handleDelete} className="p-5 space-y-4 text-xs">
            <div className="p-3.5 rounded-[var(--radius)] bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 space-y-1.5 leading-relaxed">
              <p className="font-bold">Final Authentication Step:</p>
              <p className="text-[11px] text-[var(--text-muted)]">
                Enter your login password to authenticate and finalize irreversible account deletion for <strong className="text-[var(--text)]">{user?.email}</strong>.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold text-[var(--text)] flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-red-500" />
                  <span>Enter Account Password:</span>
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-normal">
                  (Demo default: password123)
                </span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your current password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer p-0.5"
                  aria-label={showPassword ? "Hide password" : "View password"}
                  title={showPassword ? "Hide password" : "View password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded bg-red-100 dark:bg-red-950/40 border border-red-500/30 text-red-600 dark:text-red-400 font-bold text-[11px]">
                {errorMessage}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between border-t border-[var(--line)]">
              <button
                type="button"
                onClick={() => setStep("CONFIRM_WARNING")}
                disabled={isDeleting}
                className="px-3 py-2 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text)] font-semibold transition-colors cursor-pointer text-xs"
              >
                &larr; Back
              </button>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isDeleting}
                  className="px-3.5 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] font-semibold hover:bg-[var(--bg)] transition-colors cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDeleting || !password.trim()}
                  className="px-4 py-2 rounded-[var(--radius-sm)] bg-red-600 hover:bg-red-700 text-white font-bold transition-colors cursor-pointer text-xs flex items-center space-x-1.5 disabled:opacity-50 shadow-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isDeleting ? "Authenticating..." : "Permanently Delete Account"}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
