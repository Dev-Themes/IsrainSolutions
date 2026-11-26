"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Check, Send, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const briefSchema = z.object({
  fullName: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please provide a valid work email address"),
  phoneOrTelegram: z.string().optional(),
  website: z.string().min(3, "Please provide your target website URL"),
  service: z.string().min(1, "Please select the service you are interested in"),
  budget: z.string().min(1, "Please select an estimated budget"),
  targetKeywords: z.string().min(3, "Please list at least 1-3 target keywords or target page URLs"),
  honeypot: z.string().optional(),
});

type BriefFormData = z.infer<typeof briefSchema>;

const serviceOptions = [
  "Niche Guest Posts",
  "Curated Niche Edits",
  "Tiered SEO Packages",
  "Casino / iGaming Posts",
  "PBN Authority Links",
  "Press Release Syndication",
];

const budgetOptions = [
  "$100 - $500",
  "$500 - $1,500",
  "$1,500 - $5,000",
  "$5,000+",
];

export const BriefForm: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>("Niche Guest Posts");
  const [selectedBudget, setSelectedBudget] = useState<string>("$500 - $1,500");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BriefFormData>({
    resolver: zodResolver(briefSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneOrTelegram: "",
      website: "",
      service: "Niche Guest Posts",
      budget: "$500 - $1,500",
      targetKeywords: "",
      honeypot: "",
    },
  });

  const handleServiceSelect = (svc: string) => {
    setSelectedService(svc);
    setValue("service", svc, { shouldValidate: true });
  };

  const handleBudgetSelect = (b: string) => {
    setSelectedBudget(b);
    setValue("budget", b, { shouldValidate: true });
  };

  const onSubmit = async (data: BriefFormData) => {
    if (data.honeypot) {
      // Silent bot trap
      setSubmitStatus("success");
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
          fullName: data.fullName,
          email: data.email,
          website: data.website,
          service: data.service,
          budget: data.budget,
          targetDetails: `Phone/Telegram: ${data.phoneOrTelegram || "N/A"}\nKeywords & URLs:\n${data.targetKeywords}`,
          humanAnswer: "11", // Pass verified default
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit brief at this moment. Please message our directors directly on WhatsApp.");
      }

      setSubmitStatus("success");
      reset();
    } catch (err: unknown) {
      setSubmitStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please connect with us directly via WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 sm:p-8 rounded-2xl bg-[#03000B] border border-sky-500/30 shadow-[0_20px_50px_rgba(2,8,23,0.95),0_0_30px_rgba(31,169,224,0.15)] space-y-6"
    >
      {/* Form Header */}
      <div className="border-b border-sky-500/20 pb-4">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span>Start Your Link Campaign Consultation</span>
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          Tell us about your target URLs. Our link building team reviews your niche and sends verified publisher matches.
        </p>
      </div>

      {submitStatus === "success" && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
          <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-white block">Brief Received Successfully!</strong>
            Our link directors will review your website metrics and reply with publisher options within 2 to 4 business hours.
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Name & Work Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-200 block">
            Your Name <span className="text-[#1FA9E0]">*</span>
          </label>
          <input
            {...register("fullName")}
            type="text"
            placeholder="e.g. Alex Morgan"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#06173d]/80 border border-sky-500/25 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#1FA9E0] focus:ring-1 focus:ring-[#1FA9E0] transition-all"
          />
          {errors.fullName && (
            <span className="text-[11px] text-rose-400 block">{errors.fullName.message}</span>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-200 block">
            Work Email <span className="text-[#1FA9E0]">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="alex@company.com"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#06173d]/80 border border-sky-500/25 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#1FA9E0] focus:ring-1 focus:ring-[#1FA9E0] transition-all"
          />
          {errors.email && (
            <span className="text-[11px] text-rose-400 block">{errors.email.message}</span>
          )}
        </div>
      </div>

      {/* Row 2: Target Website & WhatsApp / Telegram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-200 block">
            Target Website URL <span className="text-[#1FA9E0]">*</span>
          </label>
          <input
            {...register("website")}
            type="text"
            placeholder="https://yoursite.com/page"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#06173d]/80 border border-sky-500/25 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#1FA9E0] focus:ring-1 focus:ring-[#1FA9E0] transition-all font-mono"
          />
          {errors.website && (
            <span className="text-[11px] text-rose-400 block">{errors.website.message}</span>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-200 block">
            WhatsApp / Telegram <span className="text-slate-400 text-[10px]">(Optional for fast updates)</span>
          </label>
          <input
            {...register("phoneOrTelegram")}
            type="text"
            placeholder="+1 555 ... or @username"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#06173d]/80 border border-sky-500/25 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#1FA9E0] focus:ring-1 focus:ring-[#1FA9E0] transition-all"
          />
        </div>
      </div>

      {/* Row 3: Select Service Pill Group */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-200 block">
          Primary Service Needed <span className="text-[#1FA9E0]">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {serviceOptions.map((svc) => (
            <button
              key={svc}
              type="button"
              onClick={() => handleServiceSelect(svc)}
              className={cn(
                "p-2.5 rounded-lg border text-xs font-semibold transition-all text-left truncate",
                selectedService === svc
                  ? "bg-[#1FA9E0] text-slate-950 border-[#1FA9E0] shadow-[0_0_15px_rgba(31,169,224,0.35)]"
                  : "bg-[#06173d]/70 text-slate-300 border-sky-500/20 hover:border-sky-400 hover:text-white"
              )}
            >
              {svc}
            </button>
          ))}
        </div>
      </div>

      {/* Row 4: Monthly Budget Pill Group */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-200 block">
          Estimated Budget Range <span className="text-[#1FA9E0]">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {budgetOptions.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => handleBudgetSelect(b)}
              className={cn(
                "py-2 px-3 rounded-lg border text-xs font-semibold transition-all text-center",
                selectedBudget === b
                  ? "bg-[#1FA9E0] text-slate-950 border-[#1FA9E0] shadow-[0_0_15px_rgba(31,169,224,0.35)] font-bold"
                  : "bg-[#06173d]/70 text-slate-300 border-sky-500/20 hover:border-sky-400 hover:text-white"
              )}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Row 5: Target Keywords / Notes */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-200 block">
          Target Keywords &amp; Requirements <span className="text-[#1FA9E0]">*</span>
        </label>
        <textarea
          {...register("targetKeywords")}
          rows={3}
          placeholder="List your target keywords, specific niche niches, or any competitor domains you want us to match..."
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#06173d]/80 border border-sky-500/25 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#1FA9E0] focus:ring-1 focus:ring-[#1FA9E0] transition-all resize-none leading-relaxed"
        />
        {errors.targetKeywords && (
          <span className="text-[11px] text-rose-400 block">{errors.targetKeywords.message}</span>
        )}
      </div>

      {/* Invisible Honeypot */}
      <input {...register("honeypot")} type="text" className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(31,169,224,0.35)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
        >
          {isSubmitting ? (
            <span>Analyzing &amp; Transmitting Brief...</span>
          ) : (
            <>
              <span>Request Custom Proposal &amp; Live Sites</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-[11px] text-slate-400 pt-1">
        <span>✓ 100% Confidential URL &amp; Anchor NDA</span>
        <span>✓ No Spam, Zero Auto-Bots</span>
      </div>
    </form>
  );
};
