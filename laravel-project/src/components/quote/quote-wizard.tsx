"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
  User,
} from "lucide-react";
import { CATEGORIES, CITIES } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";
import { UkFlagIcon, UsFlagIcon } from "@/components/ui/flag-icon";

export function QuoteWizard() {
  const router = useRouter();
  const { user, loginAsDemo, login } = useAuth();
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "plumbing";

  const [step, setStep] = React.useState(1);
  const [country, setCountry] = React.useState<"UK" | "US">("UK");
  const [category, setCategory] = React.useState(initialService);
  const [jobType, setJobType] = React.useState("");
  const [urgency, setUrgency] = React.useState("WITHIN_48_HOURS");
  const [city, setCity] = React.useState("");
  const [postcode, setPostcode] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState(user ? user.name : "");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState(user ? user.email : "");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedRef, setSubmittedRef] = React.useState<string | null>(null);
  const [showAuthGate, setShowAuthGate] = React.useState(false);

  const selectedCategoryObj = CATEGORIES.find((c) => c.slug === category) || CATEGORIES[0];
  const filteredCities = CITIES.filter((c) => c.country === country);

  const executeDispatch = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const randomRef = `TC-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(randomRef);
      setIsSubmitting(false);
      setShowAuthGate(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/auth/login?redirect=/quote");
      return;
    }
    executeDispatch();
  };

  const handleAuthAndDispatch = (demo: boolean) => {
    if (demo) {
      loginAsDemo("CUSTOMER");
    } else {
      login(email || "client@example.com", "CUSTOMER", name || "Verified Homeowner");
    }
    executeDispatch();
  };

  if (!user) {
    return (
      <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] p-8 sm:p-12 border border-[var(--line)] shadow-soft text-center animate-in fade-in duration-200">
        <div className="w-14 h-14 rounded-full bg-[var(--brand-light)] text-[var(--accent)] mx-auto flex items-center justify-center mb-5 border border-[var(--line)]">
          <Lock className="w-7 h-7" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
          Client Authentication Required
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text)] mt-1 mb-2">
          Please Sign In to Post Your Job
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto mb-6 leading-relaxed">
          To maintain verified trust and protect contractor dispatch availability, all job submissions require an authenticated homeowner account.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-6">
          <Link
            href="/auth/login?redirect=/quote"
            className="w-full sm:w-auto px-6 py-2.5 rounded-[var(--radius-sm)] btn-primary text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs"
          >
            <User className="w-4 h-4" />
            <span>Sign In to Your Account</span>
          </Link>
          <Link
            href="/auth/register?redirect=/quote"
            className="w-full sm:w-auto px-6 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-[var(--text)] text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <span>Register Free Account</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-[var(--line-subtle)] max-w-md mx-auto text-xs text-[var(--text-muted)]">
          <span className="block mb-2 font-medium">Or continue immediately with demo access:</span>
          <button
            type="button"
            onClick={() => loginAsDemo("CUSTOMER")}
            className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] hover:bg-[var(--surface)] border border-[var(--line)] text-xs font-bold text-[var(--text)] transition-colors cursor-pointer inline-flex items-center space-x-1.5 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Homeowner Demo Sign-In</span>
          </button>
        </div>
      </div>
    );
  }

  if (submittedRef) {
    return (
      <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] p-8 sm:p-12 border border-[var(--line)] shadow-soft text-center">
        <div className="w-14 h-14 rounded-full bg-[var(--brand-light)] text-[var(--pine-accent)] mx-auto flex items-center justify-center mb-5 border border-[var(--line)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
          Request Logged
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] mt-1 mb-3">
          Quotes Requested Successfully
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-md mx-auto">
          Your job has been routed to verified, insured {selectedCategoryObj.name.toLowerCase()} contractors near <strong className="text-[var(--text)] font-semibold">{postcode.toUpperCase()}</strong>.
        </p>

        <div className="mt-6 p-4 rounded-[var(--radius)] bg-[var(--bg-alt)] border border-[var(--line-subtle)] text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Reference Number:</span>
            <span className="font-mono font-bold text-[var(--brand)]">{submittedRef}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Service:</span>
            <span className="font-semibold text-[var(--text)]">{selectedCategoryObj.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Location:</span>
            <span className="font-semibold text-[var(--text)]">{city || "London"}, {postcode.toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Expected Response:</span>
            <span className="font-bold text-[var(--pine-accent)]">Within 2 hours</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 py-3 px-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] font-semibold text-xs text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/pros"
            className="flex-1 py-3 px-4 rounded-[var(--radius)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] font-bold text-xs text-white transition-colors"
          >
            Browse Active Pros
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] mb-2">
          <span>Step {step} of 4</span>
          <span>
            {step === 1 && "Trade Selection"}
            {step === 2 && "Urgency Level"}
            {step === 3 && "Job Details & Postcode"}
            {step === 4 && "Contact Information"}
          </span>
        </div>
        <div className="w-full bg-[var(--line)] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[var(--accent)] h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] p-6 sm:p-10 border border-[var(--line)] shadow-soft">
        <form onSubmit={handleSubmit}>
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  Step 1
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text)] mt-1">
                  What service do you require?
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Select the trade category and specific type of task.
                </p>
              </div>

              {/* Region Pill */}
              <div className="flex items-center space-x-2 mb-5">
                <span className="text-xs font-semibold text-[var(--text)]">Region:</span>
                <button
                  type="button"
                  onClick={() => setCountry("UK")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-[4px] font-bold border transition-colors cursor-pointer ${
                    country === "UK"
                      ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                      : "border-[var(--line)] text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  <UkFlagIcon className="w-3.5 h-2.5 rounded-[1px]" />
                  <span>UK</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCountry("US")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-[4px] font-bold border transition-colors cursor-pointer ${
                    country === "US"
                      ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                      : "border-[var(--line)] text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  <UsFlagIcon className="w-3.5 h-2.5 rounded-[1px]" />
                  <span>USA</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => {
                      setCategory(cat.slug);
                      setJobType("");
                    }}
                    className={`p-3.5 rounded-[var(--radius)] border text-left transition-colors cursor-pointer ${
                      category === cat.slug
                        ? "border-[var(--brand)] bg-[var(--brand-light)]"
                        : "border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)]"
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-[var(--text)]">
                      {cat.name}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-0.5 line-clamp-1">
                      {cat.shortDescription}
                    </div>
                  </button>
                ))}
              </div>

              {/* Common Tasks */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Select Specific Task
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedCategoryObj.commonJobs.map((job) => (
                    <button
                      key={job}
                      type="button"
                      onClick={() => setJobType(job)}
                      className={`px-3 py-1.5 text-xs rounded-[var(--radius-sm)] border transition-colors cursor-pointer ${
                        jobType === job
                          ? "bg-[var(--brand)] text-white font-bold border-[var(--brand)]"
                          : "border-[var(--line)] text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--bg-alt)]"
                      }`}
                    >
                      {job}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3.5 rounded-[var(--radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] font-bold text-sm text-white transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <span>Continue to Timing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  Step 2
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text)] mt-1">
                  How urgent is this project?
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Emergency jobs trigger direct priority dispatch alerts.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  {
                    id: "EMERGENCY",
                    title: "Emergency / Immediate Attention",
                    desc: "Active leaks, total electrical blackout, boiler breakdown in winter.",
                    badge: "Under 1 Hour Dispatch",
                  },
                  {
                    id: "SAME_DAY",
                    title: "Same Day / Next 24 Hours",
                    desc: "Urgent repair needed by end of day.",
                    badge: "Priority",
                  },
                  {
                    id: "WITHIN_48_HOURS",
                    title: "Within the next 2-3 Days",
                    desc: "Standard repairs and scheduled maintenance.",
                    badge: "Most Common",
                  },
                  {
                    id: "FLEXIBLE",
                    title: "Flexible / Planning Ahead",
                    desc: "Future renovations, extensions, non-urgent work.",
                    badge: "Best Rates",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setUrgency(item.id)}
                    className={`w-full p-4 rounded-[var(--radius)] border text-left transition-colors flex items-start justify-between cursor-pointer ${
                      urgency === item.id
                        ? "border-[var(--brand)] bg-[var(--brand-light)]"
                        : "border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)]"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-[var(--text)]">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] mt-1">
                        {item.desc}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--bg-alt)] border border-[var(--line-subtle)] text-[var(--text)] shrink-0 ml-2">
                      {item.badge}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-5 rounded-[var(--radius)] border border-[var(--line)] text-xs font-bold text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors flex items-center"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3.5 rounded-[var(--radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] font-bold text-sm text-white transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <span>Continue to Location</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  Step 3
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text)] mt-1">
                  Where is the work located?
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Postcodes confirm that contractors cover your immediate area.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Town or City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-xs font-semibold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    required
                  >
                    <option value="">Select City</option>
                    {filteredCities.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name} ({c.stateCounty})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    {country === "UK" ? "UK Postcode (e.g. SW1A 1AA)" : "US Zip (e.g. 78701)"}
                  </label>
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder={country === "UK" ? "SW1A 1AA" : "78701"}
                    className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-xs font-semibold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Short Job Summary
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Replace noisy bathroom extraction fan and check isolator"
                  className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-xs font-semibold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Detailed Scope of Work
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Include any key details: appliance makes, height access, parking restrictions..."
                  className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-xs font-semibold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3 px-5 rounded-[var(--radius)] border border-[var(--line)] text-xs font-bold text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors flex items-center"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 py-3.5 rounded-[var(--radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] font-bold text-sm text-white transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <span>Continue to Contact</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div>
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  Final Step
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text)] mt-1">
                  Where should contractors send quotes?
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Your phone and email are only shared with responding vetted contractors.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-xs font-semibold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Telephone Number (For Quick Verification)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={country === "UK" ? "07123 456789" : "(512) 555-0199"}
                    className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-xs font-semibold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Email Address (For Written Estimates)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah.jenkins@example.com"
                    className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-xs font-semibold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    required
                  />
                </div>
              </div>

              <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line-subtle)] flex items-start space-x-2.5 mb-6 text-xs text-[var(--text-muted)]">
                <ShieldCheck className="w-4 h-4 text-[var(--pine-accent)] shrink-0 mt-0.5" />
                <span>
                  No obligation to accept any quote. Up to 3 verified local contractors will contact you.
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="py-3 px-5 rounded-[var(--radius)] border border-[var(--line)] text-xs font-bold text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors flex items-center"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 rounded-[var(--radius)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] font-bold text-sm text-white transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Routing to Local Trades...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Dispatch Free Quote Request</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* AUTHORIZATION GATE MODAL */}
        {showAuthGate && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
          >
            <div className="fixed inset-0" onClick={() => setShowAuthGate(false)} aria-hidden="true" />
            <div className="relative z-10 w-full max-w-md bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--line)] shadow-2xl p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[var(--brand-light)] text-[var(--accent)] mx-auto flex items-center justify-center mb-3 border border-[var(--line)]">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text)]">
                  Homeowner Authorization Required
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
                  To prevent anonymous spam and protect contractors from fake requests, you must be signed in to dispatch jobs and receive quotes.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleAuthAndDispatch(true)}
                  className="w-full py-3 px-4 rounded-[var(--radius-sm)] btn-primary text-xs font-bold flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Authorize as Sarah Jenkins (Homeowner Demo)</span>
                </button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-[var(--line)]" />
                  <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-[var(--text-muted)]">
                    Or Sign In to Your Account
                  </span>
                  <div className="flex-grow border-t border-[var(--line)]" />
                </div>

                <button
                  type="button"
                  onClick={() => handleAuthAndDispatch(false)}
                  className="w-full py-2.5 px-4 rounded-[var(--radius-sm)] btn-secondary text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Authorize &amp; Dispatch as &ldquo;{name || "Homeowner"}&rdquo;</span>
                </button>

                <div className="text-center pt-2">
                  <Link
                    href={`/auth/login?redirect=/quote`}
                    className="text-xs text-[var(--accent)] hover:underline font-semibold"
                  >
                    Already have credentials? Sign In here
                  </Link>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--line)] text-center">
                <button
                  type="button"
                  onClick={() => setShowAuthGate(false)}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                >
                  Cancel and Edit Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
