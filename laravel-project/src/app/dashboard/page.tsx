"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { ShieldCheck } from "lucide-react";

const emptySubscribe = () => () => {};
function useIsClient() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function DashboardPortalSelector() {
  const router = useRouter();
  const { user } = useAuth();
  const mounted = useIsClient();

  React.useEffect(() => {
    if (!mounted) return;

    if (!user) {
      router.replace("/auth/login?redirect=/dashboard");
    } else if (user.role === "PRO") {
      router.replace("/dashboard/pro");
    } else if (user.role === "CUSTOMER") {
      router.replace("/dashboard/homeowner");
    }
  }, [mounted, user, router]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 border-4 border-[var(--brand)] border-t-transparent rounded-full animate-spin mb-4" />
      <div className="flex items-center space-x-2 text-[var(--brand)] font-bold text-sm mb-1">
        <ShieldCheck className="w-4 h-4" />
        <span>Authenticating Secure Workspace</span>
      </div>
      <p className="text-xs text-[var(--text-muted)] max-w-sm">
        {user
          ? "Redirecting you to your authorized dashboard workspace..."
          : "Checking authorization credentials. Redirecting to login portal..."}
      </p>
    </div>
  );
}
