"use client";

import { useState } from "react";
import { adminLoginAction } from "../../../actions/admin-auth";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as Parameters<typeof adminLoginAction>[0];
    const res = await adminLoginAction(data);
    if (res?.error) {
      setError(res.error);
    }
    setPending(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[var(--bg)]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm w-full mx-auto p-6 bg-[var(--card)] rounded-lg shadow-sm border border-[var(--line)]">
        <h2 className="text-2xl font-bold text-[var(--ink)]">Admin Login</h2>
        <p className="text-sm text-[var(--mute)]">Secure access for platform administrators.</p>
        
        {error && <div className="text-[var(--warn)] text-sm font-medium p-2 bg-[var(--warn)]/10 rounded">{error}</div>}
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[var(--ink)]">Email</label>
          <input type="email" name="email" required className="p-2 rounded border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[var(--ink)]">Password</label>
          <input type="password" name="password" required className="p-2 rounded border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]" />
        </div>
        
        <button disabled={pending} type="submit" className="mt-2 p-2 bg-[var(--accent)] text-[var(--bg)] rounded font-medium disabled:opacity-50 hover:opacity-90">
          {pending ? "Authenticating..." : "Log in to Admin"}
        </button>
      </form>
    </div>
  );
}
