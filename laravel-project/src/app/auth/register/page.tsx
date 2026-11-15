"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Briefcase, User, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  return (
    <React.Suspense fallback={<div className="p-12 text-center text-[var(--text-muted)]">Loading Registration...</div>}>
      <RegisterContent />
    </React.Suspense>
  );
}

function RegisterContent() {
  const router = useRouter();
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") === "pro" ? "PRO" : "CUSTOMER";

  const [role, setRole] = React.useState<"CUSTOMER" | "PRO">(defaultRole);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [licenseNumber, setLicenseNumber] = React.useState("");
  const [country, setCountry] = React.useState<"UK" | "US">("UK");
  const [category, setCategory] = React.useState("plumbing");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role, name);
    alert(`Account created successfully as ${role === "PRO" ? "Trade Professional" : "Homeowner"}! Redirecting to your workspace...`);
    if (role === "CUSTOMER") {
      router.push("/dashboard/homeowner");
    } else {
      router.push("/dashboard/pro");
    }
  };

  return (
    <div className="section-light py-10 sm:py-16 max-w-lg mx-auto px-4">
      <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] p-6 sm:p-10 border border-[var(--line)] shadow-soft">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
            Create an Account
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Join the UK & USA verified trade network
          </p>
        </div>

        {/* Role Toggle */}
        <div className="grid grid-cols-2 gap-2 mb-6 p-1 rounded-[var(--radius)] bg-[var(--bg-alt)] border border-[var(--line)]">
          <button
            type="button"
            onClick={() => setRole("CUSTOMER")}
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
            onClick={() => setRole("PRO")}
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

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7123 456789"
                className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="david@example.com"
              className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
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
                  onChange={(e) => setCompanyName(e.target.value)}
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
                  onChange={(e) => setLicenseNumber(e.target.value)}
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
              className="w-full py-3.5 rounded-[var(--radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] font-bold text-xs sm:text-sm text-white transition-colors shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>{role === "PRO" ? "Submit Contractor Application" : "Create Homeowner Account"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[var(--line)] text-center text-xs text-[var(--text-muted)]">
          Already registered?{" "}
          <Link
            href="/auth/login"
            className="font-bold text-[var(--accent)] hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
