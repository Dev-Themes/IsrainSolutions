"use client";

import * as React from "react";

export interface QuoteProposal {
  proId: string;
  proName: string;
  rating: number;
  phone: string;
  price: string;
  notes: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED";
  proEmail?: string;
}

export interface MarketplaceJobItem {
  id: string;
  referenceCode: string;
  service: string;
  title: string;
  description?: string;
  location: string;
  city: string;
  country: "UK" | "US";
  urgency: string;
  datePosted: string;
  status: "QUOTING" | "IN_PROGRESS" | "COMPLETED";
  homeownerId?: string;
  homeownerName: string;
  homeownerPhone: string;
  homeownerEmail?: string;
  proposals: QuoteProposal[];
  finalCost?: string;
  completedDate?: string;
  reviewLeft?: {
    rating: number;
    comment: string;
  };
}

const STORAGE_KEY_JOBS = "tradeconnect_marketplace_jobs_v3";

const EMPTY_JOBS: MarketplaceJobItem[] = [];
let cachedJobsRaw: string | null = null;
let cachedJobsArray: MarketplaceJobItem[] = EMPTY_JOBS;

function subscribeJobs(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("tradeconnect_jobs_updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("tradeconnect_jobs_updated", callback);
    window.removeEventListener("storage", callback);
  };
}

export function getLocalJobs(): MarketplaceJobItem[] {
  if (typeof window === "undefined") return EMPTY_JOBS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_JOBS);
    if (!raw) return EMPTY_JOBS;
    if (raw === cachedJobsRaw) return cachedJobsArray;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cachedJobsRaw = raw;
      cachedJobsArray = parsed;
      return cachedJobsArray;
    }
    return EMPTY_JOBS;
  } catch {
    return EMPTY_JOBS;
  }
}

export function saveLocalJobs(jobs: MarketplaceJobItem[]) {
  cachedJobsArray = jobs;
  cachedJobsRaw = JSON.stringify(jobs);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY_JOBS, cachedJobsRaw);
      window.dispatchEvent(new Event("tradeconnect_jobs_updated"));
    } catch {
      // ignore
    }
  }
}

/**
 * Persist job to Neon PostgreSQL database via /api/jobs
 */
export async function syncJobToNeon(job: MarketplaceJobItem): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    return res.ok;
  } catch (err) {
    console.warn("Neon DB async job sync notice:", err);
    return false;
  }
}

/**
 * Delete job from Neon PostgreSQL database
 */
export async function deleteJobFromNeon(referenceCode: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const res = await fetch(`/api/jobs?referenceCode=${encodeURIComponent(referenceCode)}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (err) {
    console.warn("Neon DB async job delete notice:", err);
    return false;
  }
}

/**
 * Create and publish a new job to Neon DB & Local Store
 */
export async function createMarketplaceJob(
  jobData: Omit<MarketplaceJobItem, "id" | "proposals" | "status"> & {
    id?: string;
    status?: "QUOTING" | "IN_PROGRESS" | "COMPLETED";
    proposals?: QuoteProposal[];
  }
): Promise<MarketplaceJobItem> {
  const newJob: MarketplaceJobItem = {
    id: jobData.id || `job_${Date.now()}`,
    referenceCode: jobData.referenceCode || `TC-${Math.floor(100000 + Math.random() * 900000)}`,
    service: jobData.service || "General Trade Service",
    title: jobData.title || "Home Trade Service",
    description: jobData.description || "",
    location: jobData.location || "London, UK",
    city: jobData.city || "London",
    country: jobData.country || "UK",
    urgency: jobData.urgency || "Standard",
    datePosted: jobData.datePosted || "Just now",
    status: jobData.status || "QUOTING",
    homeownerId: jobData.homeownerId || "usr_homeowner_1",
    homeownerName: jobData.homeownerName || "Sarah Jenkins",
    homeownerPhone: jobData.homeownerPhone || "+44 20 7946 0812",
    homeownerEmail: jobData.homeownerEmail || "sarah.jenkins@example.co.uk",
    proposals: jobData.proposals || [],
  };

  const current = getLocalJobs();
  const updated = [newJob, ...current.filter((j) => j.referenceCode !== newJob.referenceCode)];
  saveLocalJobs(updated);

  // Sync to Neon DB
  await syncJobToNeon(newJob);

  return newJob;
}

/**
 * Update existing job in Neon DB & Local Store
 */
export async function updateMarketplaceJob(
  referenceCode: string,
  updates: Partial<MarketplaceJobItem>
): Promise<MarketplaceJobItem | null> {
  const current = getLocalJobs();
  const idx = current.findIndex((j) => j.referenceCode === referenceCode || j.id === referenceCode);

  if (idx === -1) {
    // If not in local cache, still construct and sync
    const fallback: MarketplaceJobItem = {
      id: `job_${Date.now()}`,
      referenceCode,
      service: updates.service || "General Trade Service",
      title: updates.title || "Trade Service",
      location: updates.location || "London, UK",
      city: updates.city || "London",
      country: updates.country || "UK",
      urgency: updates.urgency || "Standard",
      datePosted: updates.datePosted || "Just now",
      status: updates.status || "QUOTING",
      homeownerName: updates.homeownerName || "Homeowner",
      homeownerPhone: updates.homeownerPhone || "+44 20 7946 0812",
      proposals: updates.proposals || [],
      ...updates,
    };
    const updated = [fallback, ...current];
    saveLocalJobs(updated);
    await syncJobToNeon(fallback);
    return fallback;
  }

  const updatedJob: MarketplaceJobItem = {
    ...current[idx],
    ...updates,
  };
  current[idx] = updatedJob;
  saveLocalJobs(current);

  // Sync to Neon DB
  await syncJobToNeon(updatedJob);

  return updatedJob;
}

/**
 * Delete job from Neon DB & Local Store
 */
export async function removeMarketplaceJob(referenceCode: string): Promise<void> {
  const current = getLocalJobs();
  const filtered = current.filter((j) => j.referenceCode !== referenceCode && j.id !== referenceCode);
  saveLocalJobs(filtered);
  await deleteJobFromNeon(referenceCode);
}

/**
 * Hook to subscribe to Neon DB Jobs with full reactivity
 */
export function useJobStore() {
  // Use React.useSyncExternalStore for 100% hydration-safe reactivity
  const jobs = React.useSyncExternalStore(
    subscribeJobs,
    getLocalJobs,
    () => EMPTY_JOBS
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const refreshJobs = React.useCallback(async () => {
    try {
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = (await res.json()) as { jobs?: Record<string, unknown>[] };
      if (data && Array.isArray(data.jobs)) {
        // Map database fields to MarketplaceJobItem
        const neonJobs: MarketplaceJobItem[] = data.jobs.map((item) => ({
          id: String(item.id || ""),
          referenceCode: String(item.referenceCode || ""),
          service: String(item.service || ""),
          title: String(item.title || ""),
          description: String(item.description || ""),
          location: String(item.location || ""),
          city: String(item.city || ""),
          country: ((item.country as "UK" | "US") || "UK"),
          urgency: String(item.urgency || "Flexible"),
          datePosted: String(item.datePosted || ""),
          status: (item.status as MarketplaceJobItem["status"]) || "QUOTING",
          homeownerId: String(item.homeownerId || ""),
          homeownerName: String(item.homeownerName || ""),
          homeownerPhone: String(item.homeownerPhone || ""),
          homeownerEmail: String(item.homeownerEmail || ""),
          proposals: Array.isArray(item.proposals) ? (item.proposals as unknown as QuoteProposal[]) : [],
          finalCost: item.finalCost ? String(item.finalCost) : undefined,
          completedDate: typeof item.completedDate === "string" ? item.completedDate : undefined,
          reviewLeft: (item.reviewLeft as MarketplaceJobItem["reviewLeft"]) || undefined,
        }));

        saveLocalJobs(neonJobs);
      }
    } catch (err) {
      console.warn("Neon DB /api/jobs fetch notice:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    let inFlight = false;

    const pollJobs = async () => {
      if (!isMounted || inFlight) return;
      inFlight = true;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      try {
        const res = await fetch("/api/jobs", { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) return;
        const data = (await res.json()) as { jobs?: Record<string, unknown>[] };
        if (!isMounted || !data || !Array.isArray(data.jobs)) return;
        const neonJobs: MarketplaceJobItem[] = data.jobs.map((item) => ({
          id: String(item.id || ""),
          referenceCode: String(item.referenceCode || ""),
          service: String(item.service || ""),
          title: String(item.title || ""),
          description: String(item.description || ""),
          location: String(item.location || ""),
          city: String(item.city || ""),
          country: ((item.country as "UK" | "US") || "UK"),
          urgency: String(item.urgency || "Flexible"),
          datePosted: String(item.datePosted || ""),
          status: (item.status as MarketplaceJobItem["status"]) || "QUOTING",
          homeownerId: String(item.homeownerId || ""),
          homeownerName: String(item.homeownerName || ""),
          homeownerPhone: String(item.homeownerPhone || ""),
          homeownerEmail: String(item.homeownerEmail || ""),
          proposals: Array.isArray(item.proposals) ? (item.proposals as unknown as QuoteProposal[]) : [],
          finalCost: item.finalCost ? String(item.finalCost) : undefined,
          completedDate: typeof item.completedDate === "string" ? item.completedDate : undefined,
          reviewLeft: (item.reviewLeft as MarketplaceJobItem["reviewLeft"]) || undefined,
        }));

        const current = getLocalJobs();
        // Authoritative list from server; only preserve unsynced temporary local items
        const pendingLocal = current.filter(
          (local) => local.id.startsWith("job_temp_") && !neonJobs.some((m) => m.referenceCode === local.referenceCode || m.id === local.id)
        );
        const merged = [...neonJobs, ...pendingLocal];
        saveLocalJobs(merged);
      } catch (err: unknown) {
        if ((err as Error)?.name !== "AbortError") {
          console.warn("Neon DB /api/jobs fetch notice:", err);
        }
      } finally {
        clearTimeout(timeoutId);
        inFlight = false;
      }
    };

    pollJobs();
    const timer = setInterval(pollJobs, 5000);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, []);

  return {
    jobs,
    isLoading,
    refreshJobs,
    createJob: createMarketplaceJob,
    updateJob: updateMarketplaceJob,
    removeJob: removeMarketplaceJob,
  };
}
