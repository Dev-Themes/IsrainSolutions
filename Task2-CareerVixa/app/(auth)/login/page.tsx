"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        const { getSession } = await import("next-auth/react");
        const session = await getSession();
        if (session?.user?.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
        router.refresh();
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
            Sign in to your account
          </h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div
              role="alert"
              id="login-error"
              className="rounded-lg bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-center font-medium"
            >
              {error}
            </div>
          )}

          <div className="space-y-4">
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
                aria-describedby={error ? "login-error" : undefined}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="block text-xs font-semibold text-text-heading"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-brand-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full min-h-[44px] rounded-lg border border-border-default bg-bg-page px-3.5 py-2 text-sm text-text-heading placeholder:text-text-muted/60 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby={error ? "login-error" : undefined}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-lg bg-brand-btn-fill px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          <div className="text-center text-xs text-text-muted pt-2 border-t border-border-default">
            <span>Looking to contribute an article? </span>
            <Link
              href="/write-for-us"
              className="font-semibold text-brand-primary hover:underline"
            >
              Write for Us
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
