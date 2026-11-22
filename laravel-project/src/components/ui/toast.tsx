"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastItem {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  message?: string;
  duration?: number;
}

type ToastListener = (toasts: ToastItem[]) => void;

let toasts: ToastItem[] = [];
const listeners = new Set<ToastListener>();

function notify() {
  listeners.forEach((fn) => fn([...toasts]));
}

export const toast = {
  success(title: string, message?: string, duration = 4000) {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastItem = { id, type: "success", title, message, duration };
    toasts = [...toasts, newToast];
    notify();
    if (duration > 0) {
      setTimeout(() => {
        toast.dismiss(id);
      }, duration);
    }
  },
  error(title: string, message?: string, duration = 5000) {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastItem = { id, type: "error", title, message, duration };
    toasts = [...toasts, newToast];
    notify();
    if (duration > 0) {
      setTimeout(() => {
        toast.dismiss(id);
      }, duration);
    }
  },
  info(title: string, message?: string, duration = 4000) {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastItem = { id, type: "info", title, message, duration };
    toasts = [...toasts, newToast];
    notify();
    if (duration > 0) {
      setTimeout(() => {
        toast.dismiss(id);
      }, duration);
    }
  },
  dismiss(id: string) {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  },
};

export function ToastContainer() {
  const [activeToasts, setActiveToasts] = React.useState<ToastItem[]>([]);

  React.useEffect(() => {
    const handler: ToastListener = (updated) => setActiveToasts(updated);
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  if (activeToasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-4 right-4 z-9999 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none px-3 sm:px-0"
    >
      {activeToasts.map((t) => {
        const isSuccess = t.type === "success";
        const isError = t.type === "error";

        return (
          <div
            key={t.id}
            role="alert"
            className={`pointer-events-auto rounded-[var(--radius-lg)] border p-4 shadow-xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 flex items-start space-x-3 text-xs ${
              isSuccess
                ? "bg-zinc-900/95 text-white border-emerald-500/40 shadow-emerald-950/20"
                : isError
                ? "bg-zinc-900/95 text-white border-red-500/40 shadow-red-950/20"
                : "bg-zinc-900/95 text-white border-amber-500/40 shadow-amber-950/20"
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {isError && <AlertCircle className="w-4 h-4 text-red-400" />}
              {!isSuccess && !isError && <Info className="w-4 h-4 text-amber-400" />}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <div className="font-bold text-white leading-snug">{t.title}</div>
              {t.message && (
                <div className="text-zinc-300 text-[11px] mt-0.5 leading-relaxed">
                  {t.message}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
              className="shrink-0 text-zinc-400 hover:text-white transition-colors p-1 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
