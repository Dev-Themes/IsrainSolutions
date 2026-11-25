"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Check, Send, AlertCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const briefSchema = z.object({
  fullName: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please provide a valid email address"),
  website: z.string().url("Please include a valid URL (e.g. https://yoursite.com)").or(z.string().min(3)),
  service: z.string().min(1, "Please select what service you need"),
  budget: z.string().min(1, "Please select an estimated budget"),
  targetDetails: z.string().min(5, "Please provide the target page URL and at least 1 keyword"),
  humanAnswer: z.string().min(1, "Please solve the verification"),
  honeypot: z.string().optional(),
});

type BriefFormData = z.infer<typeof briefSchema>;

const niches = [
  "General/business",
  "Technology",
  "Health",
  "Finance",
  "Crypto",
  "Casino/iGaming",
  "Real estate",
  "Travel",
  "Other",
];

export const BriefForm: React.FC = () => {
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BriefFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      website: "",
      service: "",
      budget: "",
      targetDetails: "",
      humanAnswer: "",
      honeypot: "",
    },
  });

  const toggleNiche = (niche: string) => {
    setSelectedNiches((prev) =>
      prev.includes(niche) ? prev.filter((n) => n !== niche) : [...prev, niche]
    );
  };

  const onSubmit = async (data: BriefFormData) => {
    if (data.honeypot) {
      // Bot trapped
      setSubmitStatus("success");
      return;
    }

    if (data.humanAnswer.trim() !== "11") {
      setErrorMessage("Incorrect answer to human verification: 4 + 7 = ?");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          niches: selectedNiches,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to deliver brief right now. Please message us on WhatsApp.");
      }

      setSubmitStatus("success");
      reset();
      setSelectedNiches([]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error sending brief.";
      setErrorMessage(msg);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="p-8 rounded-xl bg-[#061e47] border-2 border-sky-400 text-center space-y-4 shadow-[0_0_30px_rgba(56,189,248,0.25)]">
        <div className="w-12 h-12 rounded-full bg-sky-400/20 text-sky-400 flex items-center justify-center mx-auto">
          <Check className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white">Brief Sent Successfully!</h3>
        <p className="text-sm text-slate-200">
          Thank you. Abdul Qadir and our link building team will review your target URL and reply with recommended placements within 24 business hours.
        </p>
        <div className="pt-2">
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
          >
            Follow up immediately on WhatsApp →
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Honeypot field (hidden from humans) */}
      <input
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        {...register("honeypot")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
            Full name *
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className={cn(
              "w-full px-3.5 py-2.5 rounded-lg bg-[#040f2b] border text-white text-sm focus:outline-none transition-colors",
              errors.fullName ? "border-red-500" : "border-sky-500/30 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40"
            )}
            {...register("fullName", { required: true })}
          />
          {errors.fullName && (
            <span className="text-[11px] text-red-400 mt-1 block">
              {errors.fullName.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
            Email *
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            className={cn(
              "w-full px-3.5 py-2.5 rounded-lg bg-[#040f2b] border text-white text-sm focus:outline-none transition-colors",
              errors.email ? "border-red-500" : "border-sky-500/30 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40"
            )}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-[11px] text-red-400 mt-1 block">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      {/* Website */}
      <div>
        <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
          Your website URL *
        </label>
        <input
          type="text"
          placeholder="https://yoursite.com"
          className={cn(
            "w-full px-3.5 py-2.5 rounded-lg bg-[#040f2b] border text-white text-sm focus:outline-none transition-colors",
            errors.website ? "border-red-500" : "border-sky-500/30 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40"
          )}
          {...register("website", { required: true })}
        />
        {errors.website && (
          <span className="text-[11px] text-red-400 mt-1 block">
            {errors.website.message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Service */}
        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
            What do you need? *
          </label>
          <select
            className={cn(
              "w-full px-3.5 py-2.5 rounded-lg bg-[#040f2b] border text-white text-sm focus:outline-none transition-colors",
              errors.service ? "border-red-500" : "border-sky-500/30 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40"
            )}
            {...register("service", { required: true })}
          >
            <option value="">Choose a service…</option>
            <option value="Niche Guest Posts">Niche Guest Posts (from $100)</option>
            <option value="General Guest Posts">General Guest Posts (from $10)</option>
            <option value="Niche Edits">Niche Edits (from $50)</option>
            <option value="Casino & iGaming">Casino & iGaming (from $30)</option>
            <option value="Off-Page SEO Packages">Off-Page SEO Packages (from $50)</option>
            <option value="PBN Links">PBN Links (from $10)</option>
            <option value="Blog Comments">Niche Blog Comments (from $15)</option>
            <option value="Press Releases">Press Releases (from $100)</option>
            <option value="Custom Plan">Custom / Other Plan</option>
          </select>
          {errors.service && (
            <span className="text-[11px] text-red-400 mt-1 block">
              {errors.service.message}
            </span>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
            Budget range *
          </label>
          <select
            className={cn(
              "w-full px-3.5 py-2.5 rounded-lg bg-[#040f2b] border text-white text-sm focus:outline-none transition-colors",
              errors.budget ? "border-red-500" : "border-sky-500/30 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40"
            )}
            {...register("budget", { required: true })}
          >
            <option value="">Select a range</option>
            <option value="Under $200">Under $200</option>
            <option value="$200 - $500">$200 – $500</option>
            <option value="$500 - $1,500">$500 – $1,500</option>
            <option value="$1,500 - $5,000">$1,500 – $5,000</option>
            <option value="$5,000+">$5,000+</option>
          </select>
          {errors.budget && (
            <span className="text-[11px] text-red-400 mt-1 block">
              {errors.budget.message}
            </span>
          )}
        </div>
      </div>

      {/* Niche Chips (Multi-select) */}
      <div>
        <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
          Your industry niche (optional)
        </label>
        <div className="flex flex-wrap gap-1.5">
          {niches.map((niche) => {
            const isSelected = selectedNiches.includes(niche);
            return (
              <button
                key={niche}
                type="button"
                onClick={() => toggleNiche(niche)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                  isSelected
                    ? "bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] text-slate-950 font-black border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                    : "bg-[#06183d]/80 text-sky-200 border-sky-500/30 hover:border-sky-400 hover:text-white"
                )}
              >
                {niche}
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Page and Keywords */}
      <div>
        <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
          Target page and keywords *
        </label>
        <textarea
          rows={3}
          placeholder="The page URL you want to rank, 1–5 target keywords, and any deadline. Sites you already have links from help too."
          className={cn(
            "w-full px-3.5 py-2.5 rounded-lg bg-[#040f2b] border text-white text-sm focus:outline-none transition-colors resize-y",
            errors.targetDetails ? "border-red-500" : "border-sky-500/30 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40"
          )}
          {...register("targetDetails", { required: true })}
        />
        {errors.targetDetails && (
          <span className="text-[11px] text-red-400 mt-1 block">
            {errors.targetDetails.message}
          </span>
        )}
      </div>

      {/* Human verification check */}
      <div className="p-3 rounded-lg bg-[#040f2b] border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <span className="text-slate-200 font-medium">
          Human verification: What is <strong>4 + 7 = ?</strong>
        </span>
        <input
          type="text"
          placeholder="Answer"
          className="w-24 px-3 py-1.5 rounded bg-[#020817] border border-sky-500/40 text-white font-mono text-center focus:outline-none focus:border-sky-400"
          {...register("humanAnswer", { required: true })}
        />
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] hover:from-[#34bbf0] hover:to-[#7dd3fc] disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(56,189,248,0.35)] active:scale-95 flex items-center justify-center gap-2"
      >
        <span>{isSubmitting ? "Sending brief..." : "Send my brief"}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-[11px] text-sky-300 text-center">
        No newsletter, no spam. Your details are used strictly to reply to this link building brief.
      </p>
    </form>
  );
};
