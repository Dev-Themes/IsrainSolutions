"use client";

import { useState } from "react";
import { upsertContributorProfile } from "@/lib/actions/client-profile";
import { ContributorProfileInput } from "@/lib/validation/contributor-profile";
import { User, Building, Globe, Phone, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ProfileFormProps {
  initialProfile?: {
    fullName?: string;
    organization?: string | null;
    country?: string;
    phoneNumber?: string | null;
    bio?: string | null;
    websiteUrl?: string | null;
  } | null;
  user: {
    email?: string | null;
    name?: string | null;
  };
}

export default function ContributorProfileForm({ initialProfile, user }: ProfileFormProps) {
  const [formData, setFormData] = useState<ContributorProfileInput>({
    fullName: initialProfile?.fullName || user.name || "",
    organization: initialProfile?.organization || "",
    country: initialProfile?.country || "",
    phoneNumber: initialProfile?.phoneNumber || "",
    bio: initialProfile?.bio || "",
    websiteUrl: initialProfile?.websiteUrl || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await upsertContributorProfile(formData);
      setSuccessMessage("Your contributor profile has been updated successfully.");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to update profile. Please check your inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successMessage && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-4 text-sm text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 p-4 text-sm text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Account Identity (Read-only) */}
      <div className="rounded-xl border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] p-6 space-y-4">
        <h3 className="font-bold text-base text-slate-950 dark:text-white">Account Identity</h3>
        <p className="text-xs text-slate-700 dark:text-[#B5D8CC]">
          Verified email address associated with your CareerVixa login.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-950 dark:text-[#F0FCF7] mb-1">
              Verified Email
            </label>
            <input
              type="text"
              disabled
              value={user.email || ""}
              className="w-full rounded-md border border-[#C6E2D6] dark:border-[#355A50] bg-[#F2FBF8] dark:bg-[#091A19] px-3 py-2 text-sm text-slate-800 dark:text-slate-300 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Contributor Details */}
      <div className="rounded-xl border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] p-6 space-y-4">
        <h3 className="font-bold text-base text-slate-950 dark:text-white">Contributor Information</h3>
        <p className="text-xs text-slate-700 dark:text-[#B5D8CC]">
          Mandatory contributor attribution fields for guest article submissions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-950 dark:text-[#F0FCF7] mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#091A19] text-slate-950 dark:text-[#F0FCF7] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-950 dark:text-[#F0FCF7] mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. United States, United Kingdom, Canada"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#091A19] text-slate-950 dark:text-[#F0FCF7] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-950 dark:text-[#F0FCF7] mb-1">
              Organization / Company <span className="text-xs font-normal text-slate-700 dark:text-[#B5D8CC]">(Optional)</span>
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <input
                type="text"
                placeholder="e.g. TechCareer Academy, RemoteWorks Inc"
                value={formData.organization || ""}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#091A19] text-slate-950 dark:text-[#F0FCF7] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-950 dark:text-[#F0FCF7] mb-1">
              Phone Number <span className="text-xs font-normal text-slate-700 dark:text-[#B5D8CC]">(Optional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <input
                type="tel"
                placeholder="e.g. +1 555-019-2834"
                value={formData.phoneNumber || ""}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#091A19] text-slate-950 dark:text-[#F0FCF7] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-950 dark:text-[#F0FCF7] mb-1">
              Website / Portfolio URL <span className="text-xs font-normal text-slate-700 dark:text-[#B5D8CC]">(Optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://yourcompany.com"
              value={formData.websiteUrl || ""}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-md border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#091A19] text-slate-950 dark:text-[#F0FCF7] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-950 dark:text-[#F0FCF7] mb-1">
              Author Biography <span className="text-xs font-normal text-slate-700 dark:text-[#B5D8CC]">(Optional, max 500 characters)</span>
            </label>
            <textarea
              rows={3}
              maxLength={500}
              placeholder="Brief professional bio highlighting your industry experience..."
              value={formData.bio || ""}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-md border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#091A19] text-slate-950 dark:text-[#F0FCF7] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <p className="text-[11px] text-slate-700 dark:text-[#B5D8CC] text-right mt-1">
              {(formData.bio || "").length}/500
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:opacity-90 text-primary-foreground font-semibold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <span>Save Profile</span>
          )}
        </button>
      </div>
    </form>
  );
}
