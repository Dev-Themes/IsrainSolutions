"use client";

import { useState } from "react";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

interface NewsletterFormProps {
  buttonText?: string;
  className?: string;
}

export function NewsletterForm({ buttonText = "Subscribe", className = "" }: NewsletterFormProps) {
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
      <div className={`p-4 bg-brand-soft border border-brand/20 rounded-md text-brand-strong ${className}`}>
        Thank you for subscribing! Check your inbox to confirm.
      </div>
    );
  }

  return (
    <form className={`flex flex-col gap-2 ${className}`} onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
          className={`flex-1 px-4 py-3 border rounded-lg min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand ${
            status === "error" ? "border-red-500" : "border-border"
          }`}
          aria-label="Email address"
          aria-invalid={status === "error"}
        />
        <button 
          type="submit"
          className="px-6 py-3 min-h-[44px] bg-brand text-white font-medium rounded-lg hover:bg-brand-strong transition-colors"
        >
          {buttonText}
        </button>
      </div>
      {status === "error" && (
        <span className="text-sm text-red-500 text-left mt-1">{errorMessage}</span>
      )}
    </form>
  );
}
