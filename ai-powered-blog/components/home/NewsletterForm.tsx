"use client";

import { useState } from "react";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

interface NewsletterFormProps {
  buttonText?: string;
  className?: string;
  stacked?: boolean;
}

export function NewsletterForm({ buttonText = "Subscribe", className = "", stacked = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse({ email });
    
    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error.issues ? result.error.issues[0].message : "Invalid email");
      return;
    }

    // Simulate API call
    setStatus("success");
    setEmail("");
    setErrorMessage("");
  };

  if (status === "success") {
    return (
      <div className={`p-4 bg-brand-soft border border-brand-primary/25 rounded-xl text-brand-primary-text text-xs sm:text-sm font-semibold ${className}`}>
        Thank you for subscribing! Check your inbox to confirm.
      </div>
    );
  }

  return (
    <form className={`flex flex-col gap-2 w-full max-w-full ${className}`} onSubmit={handleSubmit}>
      <div className={stacked ? "flex flex-col gap-2.5 w-full" : "flex flex-col sm:flex-row gap-2.5 w-full"}>
        <input
          type="email"
          placeholder="Enter your executive email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
          className={`w-full min-w-0 flex-1 px-4 py-2.5 sm:py-3 border rounded-xl min-h-[44px] bg-bg-surface text-text-heading text-xs sm:text-sm placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all ${
            status === "error" ? "border-rose-500" : "border-border-default focus:border-brand-primary"
          }`}
          aria-label="Email address"
          aria-invalid={status === "error"}
        />
        <button 
          type="submit"
          className={`px-5 py-2.5 sm:py-3 min-h-[44px] bg-brand-btn-fill hover:bg-brand-btn-hover text-white font-bold rounded-xl transition-all shadow-xs cursor-pointer text-xs sm:text-sm shrink-0 ${
            stacked ? "w-full" : "w-full sm:w-auto"
          }`}
        >
          {buttonText}
        </button>
      </div>
      {status === "error" && (
        <span className="text-xs text-rose-500 text-left font-medium mt-1">{errorMessage}</span>
      )}
    </form>
  );
}
