"use client";

import * as React from "react";

export type ContractStatus =
  | "DRAFT"             // Contractor is drafting (price, equipment, services, date/time)
  | "PENDING_APPROVAL" // Contractor submitted draft to homeowner to review & sign
  | "ACTIVE"           // Homeowner approved & signed. Work in progress.
  | "INVOICED"         // Contractor completed work and sent final invoice
  | "PAID"             // Homeowner paid invoice -> added to Contractor Earned Tab
  | "COMPLETED";       // Work finished & testimonial stored in Pro profile

export interface JobContract {
  id: string;
  referenceCode: string;
  service: string;
  title: string;
  location: string;
  city: string;
  country: "UK" | "US";
  urgency: string;
  datePosted: string;

  // Homeowner info
  homeownerId: string;
  homeownerName: string;
  homeownerPhone: string;
  homeownerEmail: string;
  homeownerAddress: string;

  // Contractor info
  proId: string;
  proSlug: string;
  proName: string;
  proPhone: string;
  proEmail: string;
  proLicense: string;
  proInsurance: string;
  proCity: string;

  // Status
  status: ContractStatus;

  // Draft & Terms
  agreedPrice: string; // e.g. "£145.00"
  currency: "£" | "$";
  priceNumeric: number;
  providedServices: string[];
  providedEquipments: string[];
  serviceDate: string; // e.g. "17 Nov 2026"
  serviceTime: string; // e.g. "09:30 AM"
  warrantyPeriod: string; // e.g. "12 Months Workmanship Guarantee"
  notes: string;

  // Approval & Signing
  approvedByHomeownerAt?: string;
  homeownerSignature?: string;

  // Invoice Details & Banking
  invoiceNumber?: string;
  invoiceIssuedAt?: string;
  invoicePaidAt?: string;
  labourAmount?: number;
  materialsAmount?: number;
  subtotalAmount?: number;
  vatRate?: number;
  vatAmount?: number;
  vatNumber?: string;
  totalAmount?: number;
  paymentMethod?: string;
  bankDetails?: {
    bankName: string;
    accountName: string;
    sortCode: string;
    accountNumber: string;
    paymentReference?: string;
  };

  // Homeowner Review / Testimonial
  review?: {
    rating: number;
    comment: string;
    author: string;
    date: string;
  };
}

export interface StoredReview {
  id: string;
  contractId: string;
  proSlug: string;
  proName: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  city: string;
  date: string;
  jobReference: string;
  service: string;
}

const STORAGE_KEY_CONTRACTS = "tradeconnect_job_contracts_v4";
const STORAGE_KEY_REVIEWS = "tradeconnect_pro_reviews_v4";

export const INITIAL_SEED_CONTRACTS: JobContract[] = [];

export const INITIAL_SEED_REVIEWS: StoredReview[] = [
  {
    id: "rev_seed_1",
    contractId: "cnt_103",
    proSlug: "apex-plumbing-heating-london",
    proName: "Apex Heating & Emergency Plumbing Ltd",
    author: "Sarah Jenkins",
    rating: 5,
    title: "Annual Worcester Bosch Combi Service",
    comment: "Arrived exactly on time, conducted thorough pressure and flue checks, and provided the official certificate before leaving. Very pleased.",
    city: "London",
    date: "19 Oct 2026",
    jobReference: "TC-591204",
    service: "Gas & Boiler Engineers",
  },
  {
    id: "rev_seed_2",
    contractId: "cnt_104",
    proSlug: "apex-plumbing-heating-london",
    proName: "Apex Heating & Emergency Plumbing Ltd",
    author: "Arthur Pendelton",
    rating: 5,
    title: "Sunday night Megaflo emergency fix",
    comment: "Turned up on a Sunday evening within 40 minutes of posting the job. Repaired the tundish discharge leak cleanly and explained every step.",
    city: "London",
    date: "28 Sep 2026",
    jobReference: "TC-482019",
    service: "Emergency Plumbing",
  },
  {
    id: "rev_seed_3",
    contractId: "cnt_105",
    proSlug: "apex-plumbing-heating-london",
    proName: "Apex Heating & Emergency Plumbing Ltd",
    author: "Eleanor Vance",
    rating: 5,
    title: "Concealed shower valve pipework",
    comment: "Superb attention to detail with the copper pipework behind the tiled wall. Cleaned up completely after the job was finished.",
    city: "London",
    date: "13 Aug 2026",
    jobReference: "TC-390114",
    service: "Plumbing Installation",
  },
];

// Memory fallback for SSR


/**
 * Asynchronously persist contract record to Neon PostgreSQL database
 */
export async function syncContractToNeon(contract: JobContract): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    await fetch("/api/contracts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contract),
    });
  } catch (err) {
    console.warn("Neon DB async background sync notice:", err);
  }
}

const EMPTY_CONTRACTS: JobContract[] = [];
const EMPTY_REVIEWS: StoredReview[] = [];
let cachedContractsRaw: string | null = null;
let cachedContractsArray: JobContract[] = EMPTY_CONTRACTS;
let cachedReviewsRaw: string | null = null;
let cachedReviewsArray: StoredReview[] = EMPTY_REVIEWS;

function subscribeContracts(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("tradeconnect_contracts_updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("tradeconnect_contracts_updated", callback);
    window.removeEventListener("storage", callback);
  };
}

function subscribeReviews(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("tradeconnect_reviews_updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("tradeconnect_reviews_updated", callback);
    window.removeEventListener("storage", callback);
  };
}

export function getContracts(): JobContract[] {
  if (typeof window === "undefined") return EMPTY_CONTRACTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONTRACTS);
    if (!raw) return EMPTY_CONTRACTS;
    if (raw === cachedContractsRaw) return cachedContractsArray;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cachedContractsRaw = raw;
      cachedContractsArray = parsed;
      return cachedContractsArray;
    }
    return EMPTY_CONTRACTS;
  } catch {
    return EMPTY_CONTRACTS;
  }
}

export function saveContracts(contracts: JobContract[]) {
  cachedContractsArray = contracts;
  cachedContractsRaw = JSON.stringify(contracts);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY_CONTRACTS, cachedContractsRaw);
      window.dispatchEvent(new Event("tradeconnect_contracts_updated"));
    } catch {
      // ignore
    }
  }
}

export function getStoredReviews(): StoredReview[] {
  if (typeof window === "undefined") return EMPTY_REVIEWS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REVIEWS);
    if (!raw) return INITIAL_SEED_REVIEWS;
    if (raw === cachedReviewsRaw) return cachedReviewsArray;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cachedReviewsRaw = raw;
      cachedReviewsArray = parsed;
      return cachedReviewsArray;
    }
    return INITIAL_SEED_REVIEWS;
  } catch {
    return INITIAL_SEED_REVIEWS;
  }
}

export function saveStoredReviews(reviews: StoredReview[]) {
  cachedReviewsArray = reviews;
  cachedReviewsRaw = JSON.stringify(reviews);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY_REVIEWS, cachedReviewsRaw);
      window.dispatchEvent(new Event("tradeconnect_reviews_updated"));
    } catch {
      // ignore
    }
  }
}

/**
 * Helper to normalize numeric price and formatted string
 */
function extractNumericPrice(priceStr: string | number | undefined, defaultVal = 145): number {
  if (typeof priceStr === "number") return isNaN(priceStr) ? defaultVal : priceStr;
  if (!priceStr) return defaultVal;
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? defaultVal : num;
}

/**
 * Update an existing contract or create a draft contract
 * Harmonizes agreedPrice, priceNumeric, totalAmount, labourAmount, materialsAmount
 * and syncs directly to Neon PostgreSQL.
 */
export function updateContractDraft(
  contractId: string,
  updates: Partial<JobContract>
): JobContract | null {
  const all = getContracts();
  const idx = all.findIndex((c) => c.id === contractId || c.referenceCode === contractId);

  // Harmonize price values
  let resolvedCurrency: "£" | "$" = "£";
  if (updates.currency) {
    resolvedCurrency = updates.currency;
  } else if (updates.agreedPrice && updates.agreedPrice.includes("$")) {
    resolvedCurrency = "$";
  } else if (idx !== -1 && all[idx].currency) {
    resolvedCurrency = all[idx].currency;
  }

  let resolvedNumeric = 145;
  if (updates.priceNumeric !== undefined && !isNaN(updates.priceNumeric) && updates.priceNumeric > 0) {
    resolvedNumeric = updates.priceNumeric;
  } else if (updates.agreedPrice) {
    resolvedNumeric = extractNumericPrice(updates.agreedPrice);
  } else if (updates.totalAmount !== undefined && !isNaN(updates.totalAmount) && updates.totalAmount > 0) {
    resolvedNumeric = updates.totalAmount;
  } else if (idx !== -1) {
    resolvedNumeric = all[idx].priceNumeric || 145;
  }

  const resolvedAgreedPrice = updates.agreedPrice
    ? (updates.agreedPrice.startsWith("£") || updates.agreedPrice.startsWith("$")
        ? updates.agreedPrice
        : `${resolvedCurrency}${resolvedNumeric.toFixed(2)}`)
    : `${resolvedCurrency}${resolvedNumeric.toFixed(2)}`;

  const resolvedLabour = updates.labourAmount !== undefined
    ? updates.labourAmount
    : Math.round(resolvedNumeric * 0.7);

  const resolvedMaterials = updates.materialsAmount !== undefined
    ? updates.materialsAmount
    : Math.max(0, Math.round((resolvedNumeric - resolvedLabour) * 100) / 100);

  const resolvedTotal = updates.totalAmount !== undefined
    ? updates.totalAmount
    : resolvedNumeric;

  const harmonizedUpdates: Partial<JobContract> = {
    ...updates,
    agreedPrice: resolvedAgreedPrice,
    currency: resolvedCurrency,
    priceNumeric: resolvedNumeric,
    labourAmount: resolvedLabour,
    materialsAmount: resolvedMaterials,
    totalAmount: resolvedTotal,
  };

  if (idx === -1) {
    // Create new contract record
    const newContract: JobContract = {
      id: contractId.startsWith("cnt_") ? contractId : `cnt_${Date.now()}`,
      referenceCode: updates.referenceCode || `TC-${Math.floor(100000 + Math.random() * 900000)}`,
      service: updates.service || "General Trade Service",
      title: updates.title || "Agreed Trade Service",
      location: updates.location || "London, UK",
      city: updates.city || "London",
      country: updates.country || "UK",
      urgency: updates.urgency || "Standard",
      datePosted: updates.datePosted || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      homeownerId: updates.homeownerId || "usr_homeowner_1",
      homeownerName: updates.homeownerName || "Sarah Jenkins",
      homeownerPhone: updates.homeownerPhone || "+44 20 7946 0812",
      homeownerEmail: updates.homeownerEmail || "sarah.jenkins@example.co.uk",
      homeownerAddress: updates.homeownerAddress || "14 Cranbury Road, Fulham, London SW6 2PY",
      proId: updates.proId || "pro_uk_1",
      proSlug: updates.proSlug || "apex-plumbing-heating-london",
      proName: updates.proName || "Apex Heating & Emergency Plumbing Ltd",
      proPhone: updates.proPhone || "+44 20 7946 0812",
      proEmail: updates.proEmail || "david@apexplumbing.co.uk",
      proLicense: updates.proLicense || "Gas Safe Register #592104",
      proInsurance: updates.proInsurance || "£5,000,000 Direct Line Public Liability",
      proCity: updates.proCity || "London (SW6)",
      status: updates.status || "DRAFT",
      agreedPrice: resolvedAgreedPrice,
      currency: resolvedCurrency,
      priceNumeric: resolvedNumeric,
      labourAmount: resolvedLabour,
      materialsAmount: resolvedMaterials,
      totalAmount: resolvedTotal,
      providedServices: updates.providedServices || ["Initial trade inspection & diagnosis", "Agreed repair labor and material fitting"],
      providedEquipments: updates.providedEquipments || ["Standard trade replacement fittings", "Approved diagnostic testing equipment"],
      serviceDate: updates.serviceDate || "Next Available Slot",
      serviceTime: updates.serviceTime || "09:00 AM",
      warrantyPeriod: updates.warrantyPeriod || "12 Months Workmanship Guarantee",
      notes: updates.notes || "Standard terms agreed between contractor and homeowner.",
      ...harmonizedUpdates,
    };
    all.unshift(newContract);
    saveContracts(all);
    syncContractToNeon(newContract);
    return newContract;
  }

  const updated: JobContract = {
    ...all[idx],
    ...harmonizedUpdates,
  };
  all[idx] = updated;
  saveContracts(all);
  syncContractToNeon(updated);
  return updated;
}

/**
 * Contractor finalizes draft and sends to homeowner for approval
 */
export function submitDraftToHomeowner(contractId: string): JobContract | null {
  return updateContractDraft(contractId, {
    status: "PENDING_APPROVAL",
  });
}

/**
 * Homeowner reviews & signs contract -> becomes ACTIVE
 */
export function approveAndSignContract(
  contractId: string,
  signatureName: string
): JobContract | null {
  const timestamp = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return updateContractDraft(contractId, {
    status: "ACTIVE",
    approvedByHomeownerAt: timestamp,
    homeownerSignature: signatureName,
  });
}

/**
 * Contractor marks work done and issues invoice
 */
export function sendContractInvoice(
  contractId: string,
  invoiceData: {
    invoiceNumber: string;
    labourAmount: number;
    materialsAmount: number;
    subtotalAmount?: number;
    vatRate?: number;
    vatAmount?: number;
    vatNumber?: string;
    totalAmount: number;
    paymentMethod?: string;
    bankDetails?: {
      bankName: string;
      accountName: string;
      sortCode: string;
      accountNumber: string;
      paymentReference?: string;
    };
  }
): JobContract | null {
  const timestamp = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const all = getContracts();
  const existing = all.find((c) => c.id === contractId || c.referenceCode === contractId);
  const currency = existing?.currency || "£";

  return updateContractDraft(contractId, {
    status: "INVOICED",
    invoiceNumber: invoiceData.invoiceNumber,
    invoiceIssuedAt: timestamp,
    labourAmount: invoiceData.labourAmount,
    materialsAmount: invoiceData.materialsAmount,
    subtotalAmount: invoiceData.subtotalAmount ?? (invoiceData.labourAmount + invoiceData.materialsAmount),
    vatRate: invoiceData.vatRate ?? 20,
    vatAmount: invoiceData.vatAmount ?? 0,
    vatNumber: invoiceData.vatNumber ?? "GB 948 2014 92",
    totalAmount: invoiceData.totalAmount,
    priceNumeric: invoiceData.totalAmount,
    agreedPrice: `${currency}${invoiceData.totalAmount.toFixed(2)}`,
    paymentMethod: invoiceData.paymentMethod || "Bank Transfer (Direct)",
    bankDetails: invoiceData.bankDetails || {
      bankName: "Barclays Business UK",
      accountName: existing?.proName || "Apex Heating & Emergency Plumbing Ltd",
      sortCode: "20-04-15",
      accountNumber: "83921049",
      paymentReference: existing?.referenceCode || "TC-2026",
    },
  });
}

/**
 * Homeowner marks invoice paid -> updates contractor monthly earnings
 */
export function markInvoicePaid(
  contractId: string,
  paymentMethod = "TradeConnect Protected Escrow (Card)"
): JobContract | null {
  const timestamp = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return updateContractDraft(contractId, {
    status: "PAID",
    invoicePaidAt: timestamp,
    paymentMethod,
  });
}

/**
 * Homeowner leaves review -> updates contract & stores to Pro's testimonials
 */
export function submitContractReview(
  contractId: string,
  review: {
    rating: number;
    title?: string;
    comment: string;
    author: string;
    city?: string;
  }
): JobContract | null {
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const updated = updateContractDraft(contractId, {
    status: "COMPLETED",
    review: {
      rating: review.rating,
      comment: review.comment,
      author: review.author,
      date: dateStr,
    },
  });

  if (updated) {
    const reviews = getStoredReviews();
    const newStoredRev: StoredReview = {
      id: `rev_${Date.now()}`,
      contractId: updated.id,
      proSlug: updated.proSlug,
      proName: updated.proName,
      author: review.author,
      rating: review.rating,
      title: review.title || `${updated.service} in ${updated.city}`,
      comment: review.comment,
      city: review.city || updated.city,
      date: dateStr,
      jobReference: updated.referenceCode,
      service: updated.service,
    };
    // Add to top of list
    reviews.unshift(newStoredRev);
    saveStoredReviews(reviews);
  }

  return updated;
}

/**
 * Calculate Contractor Lifetime & Monthly Earnings
 */
export interface MonthlyEarningEntry {
  monthKey: string;     // e.g. "2026-11"
  monthLabel: string;   // e.g. "November 2026"
  totalEarned: number;
  total: number;
  jobsCount: number;
  contracts: JobContract[];
  invoices: {
    id: string;
    invoiceNumber: string;
    referenceCode: string;
    title: string;
    homeownerName: string;
    amount: number;
    paidDate: string;
  }[];
}

export interface ContractorEarningsReport {
  totalLifetimeEarned: number;
  lifetimeTotal: number;
  thisMonthEarned: number;
  completedContractsCount: number;
  currency: string;
  monthlyBreakdown: MonthlyEarningEntry[];
  allPaidContracts: JobContract[];
}

interface SeedLedgerEntry {
  monthKey: string;
  monthLabel: string;
  totalEarned: number;
  jobsCount: number;
  invoices: {
    id: string;
    invoiceNumber: string;
    referenceCode: string;
    title: string;
    homeownerName: string;
    amount: number;
    paidDate: string;
  }[];
}

export function getContractorEarnings(
  proIdOrSlug = "pro_uk_1",
  contractsList?: JobContract[]
): ContractorEarningsReport {
  const all = contractsList || getContracts();
  // Filter for contracts associated with this pro that are PAID or COMPLETED
  const paidContracts = all.filter(
    (c) =>
      (c.proId === proIdOrSlug || c.proSlug === proIdOrSlug) &&
      (c.status === "PAID" || c.status === "COMPLETED")
  );

  let totalLifetimeEarned = 0;
  const monthMap: { [key: string]: MonthlyEarningEntry } = {};

  // Empty ledger to start cleanly from 0 real paid contracts
  const seedLedger: SeedLedgerEntry[] = [];

  // Initialize month map with seed data
  seedLedger.forEach((entry) => {
    monthMap[entry.monthKey] = {
      ...entry,
      total: entry.totalEarned,
      contracts: [],
      invoices: [...entry.invoices],
    };
    totalLifetimeEarned += entry.totalEarned;
  });

  // Now dynamically add any real-time paid contracts
  paidContracts.forEach((contract) => {
    const amount = contract.totalAmount || contract.priceNumeric || 0;
    // Check if contract is already in seed invoices
    const exists = Object.values(monthMap).some((m) =>
      m.invoices.some((inv) => inv.id === contract.id || inv.referenceCode === contract.referenceCode)
    );

    if (!exists && amount > 0) {
      // Determine month
      const currentMonthKey = "2026-11";
      if (!monthMap[currentMonthKey]) {
        monthMap[currentMonthKey] = {
          monthKey: currentMonthKey,
          monthLabel: "November 2026",
          totalEarned: 0,
          total: 0,
          jobsCount: 0,
          contracts: [],
          invoices: [],
        };
      }
      monthMap[currentMonthKey].totalEarned += amount;
      monthMap[currentMonthKey].total += amount;
      monthMap[currentMonthKey].jobsCount += 1;
      monthMap[currentMonthKey].invoices.unshift({
        id: contract.id,
        invoiceNumber: contract.invoiceNumber || `INV-2026-${contract.referenceCode.replace("TC-", "")}`,
        referenceCode: contract.referenceCode,
        title: contract.title,
        homeownerName: contract.homeownerName,
        amount,
        paidDate: contract.invoicePaidAt || "Today",
      });
      totalLifetimeEarned += amount;
    }
  });

  // Populate total and contracts array for each month
  Object.values(monthMap).forEach((m) => {
    m.total = m.totalEarned;
    m.contracts = m.invoices.map((inv) => {
      const match = all.find((c) => c.id === inv.id || c.referenceCode === inv.referenceCode);
      if (match) return match;
      return {
        id: inv.id,
        referenceCode: inv.referenceCode,
        service: "Plumbing & Heating Services",
        title: inv.title,
        location: "London, UK",
        city: "London",
        country: "UK",
        urgency: "Standard",
        datePosted: inv.paidDate,
        homeownerId: "usr_homeowner_1",
        homeownerName: inv.homeownerName,
        homeownerPhone: "+44 20 7946 0812",
        homeownerEmail: "client@example.com",
        homeownerAddress: "Fulham, London",
        proId: "pro_uk_1",
        proSlug: "apex-plumbing-heating-london",
        proName: "Apex Heating & Emergency Plumbing Ltd",
        proPhone: "+44 20 7946 0812",
        proEmail: "david@apexplumbing.co.uk",
        proLicense: "Gas Safe Register #592104",
        proInsurance: "£5,000,000 Direct Line Public Liability",
        proCity: "London (SW6)",
        status: "COMPLETED",
        agreedPrice: `£${inv.amount.toFixed(2)}`,
        currency: "£",
        priceNumeric: inv.amount,
        totalAmount: inv.amount,
        invoiceNumber: inv.invoiceNumber,
        invoicePaidAt: inv.paidDate,
        providedServices: ["Certified trade labor & installation", "Standard building compliance inspection"],
        providedEquipments: ["Approved trade replacement fittings & hardware"],
        serviceDate: inv.paidDate,
        serviceTime: "10:00 AM",
        warrantyPeriod: "12 Months Workmanship Guarantee",
        notes: "Settled via TradeConnect Escrow.",
      };
    });
  });

  const breakdown = Object.values(monthMap).sort((a, b) => b.monthKey.localeCompare(a.monthKey));
  const thisMonthEarned = monthMap["2026-11"]?.totalEarned || 0;
  const completedContractsCount = breakdown.reduce((acc, m) => acc + m.jobsCount, 0);

  return {
    totalLifetimeEarned,
    lifetimeTotal: totalLifetimeEarned,
    thisMonthEarned,
    completedContractsCount,
    currency: "£",
    monthlyBreakdown: breakdown,
    allPaidContracts: paidContracts,
  };
}

/**
 * Calculate Homeowner Profile Signed Contracts & Verified Stats
 */
export interface HomeownerStats {
  homeownerName: string;
  signedContractsCount: number;
  completedContractsCount: number;
  activeContractsCount: number;
  pendingDraftsCount: number;
  totalSpent: number;
  isVerifiedJobProvider: boolean;
  memberSince: string;
}

export function getHomeownerStats(
  homeownerName = "Sarah Jenkins",
  contractsList?: JobContract[]
): HomeownerStats {
  const all = contractsList || getContracts();
  const mine = all.filter(
    (c) =>
      c.homeownerName.toLowerCase().includes(homeownerName.toLowerCase()) ||
      homeownerName.toLowerCase().includes(c.homeownerName.toLowerCase())
  );

  const completed = mine.filter((c) => c.status === "COMPLETED" || c.status === "PAID");
  const active = mine.filter((c) => c.status === "ACTIVE" || c.status === "INVOICED");
  const pendingDrafts = mine.filter((c) => c.status === "PENDING_APPROVAL" || c.status === "DRAFT");

  const totalSpent = completed.reduce((sum, c) => sum + (c.totalAmount || c.priceNumeric || 0), 0);
  const signedCount = completed.length + active.length;

  return {
    homeownerName,
    signedContractsCount: signedCount,
    completedContractsCount: completed.length,
    activeContractsCount: active.length,
    pendingDraftsCount: pendingDrafts.length,
    totalSpent,
    isVerifiedJobProvider: signedCount >= 1,
    memberSince: "October 2026",
  };
}

/**
 * Custom React Hook to subscribe to contract & review store changes
 * Hydrates initial data from Neon PostgreSQL via /api/contracts
 */
export function useContractStore() {
  // Use React.useSyncExternalStore for 100% hydration-safe reactivity
  const contracts = React.useSyncExternalStore(
    subscribeContracts,
    getContracts,
    () => EMPTY_CONTRACTS
  );
  const reviews = React.useSyncExternalStore(
    subscribeReviews,
    getStoredReviews,
    () => EMPTY_REVIEWS
  );

  React.useEffect(() => {
    let isMounted = true;

    // 1. Hydrate from Neon PostgreSQL database in background
    fetch("/api/contracts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch from Neon DB");
        return res.json();
      })
      .then((data) => {
        if (isMounted && data && Array.isArray(data.contracts) && data.contracts.length > 0) {
          // Merge with local storage contracts
          const currentLocal = getContracts();
          const merged = [...data.contracts];
          // Preserve any newly added local contracts not yet on server
          currentLocal.forEach((lc: JobContract) => {
            if (!merged.some((mc: JobContract) => mc.referenceCode === lc.referenceCode || mc.id === lc.id)) {
              merged.push(lc);
            }
          });
          saveContracts(merged);
        }
      })
      .catch((err) => {
        console.warn("Neon DB fetch notice:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    contracts,
    reviews,
    updateDraft: updateContractDraft,
    submitDraft: submitDraftToHomeowner,
    approveContract: approveAndSignContract,
    sendInvoice: sendContractInvoice,
    payInvoice: markInvoicePaid,
    submitReview: submitContractReview,
    getEarnings: getContractorEarnings,
    getHomeownerStats,
  };
}
