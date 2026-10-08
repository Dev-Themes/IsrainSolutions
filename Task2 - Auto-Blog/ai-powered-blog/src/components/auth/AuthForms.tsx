"use client";

import { useActionState, useState } from "react";
import { registerUser, loginUser } from "../../actions/auth";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as any;
    
    const res = await registerUser(data);
    if (res?.error) {
      setError(res.error);
    }
    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm w-full mx-auto p-6 bg-[var(--card)] rounded-lg shadow-sm border border-[var(--line)]">
      <h2 className="text-2xl font-bold text-[var(--ink)]">Register</h2>
      {error && <div className="text-[var(--warn)] text-sm font-medium p-2 bg-[var(--warn)]/10 rounded">{error}</div>}
      
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--ink)]">Name</label>
        <input type="text" name="name" required className="p-2 rounded border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]" />
      </div>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--ink)]">Email</label>
        <input type="email" name="email" required className="p-2 rounded border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]" />
      </div>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--ink)]">Password</label>
        <input type="password" name="password" required className="p-2 rounded border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]" />
      </div>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--ink)]">Confirm Password</label>
        <input type="password" name="confirmPassword" required className="p-2 rounded border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]" />
      </div>
      
      <button disabled={pending} type="submit" className="mt-2 p-2 bg-[var(--accent)] text-[var(--bg)] rounded font-medium disabled:opacity-50 hover:opacity-90">
        {pending ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as any;
    
    const res = await loginUser(data);
    if (res?.error) {
      setError(res.error);
    }
    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm w-full mx-auto p-6 bg-[var(--card)] rounded-lg shadow-sm border border-[var(--line)]">
      <h2 className="text-2xl font-bold text-[var(--ink)]">Log in</h2>
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
        {pending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
