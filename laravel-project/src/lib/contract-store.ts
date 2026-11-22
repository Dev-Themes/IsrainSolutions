"use client";

import * as React from "react";
import type { MarketplaceJobItem, QuoteProposal } from "./job-store";

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
  platformFeeRate?: number;
  platformFeeAmount?: number;
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
 * Resolves accurate contract financials:
 * - contractPrice: Agreed contractor fee for labor and materials (excludes platform fee)
 * - platformFee: 5% platform fee
 * - totalGross: Total gross amount paid by homeowner / held in escrow
 */
export type FinancialTarget = {
  priceNumeric?: number;
  agreedPrice?: string;
  subtotalAmount?: number;
  labourAmount?: number;
  materialsAmount?: number;
  platformFeeAmount?: number;
  totalAmount?: number;
  finalCost?: string;
};

export function getContractFinancials(c?: FinancialTarget | null): {
  contractPrice: number;
  platformFee: number;
  totalGross: number;
  labour: number;
  materials: number;
} {
  if (!c) {
    return {
      contractPrice: 0,
      platformFee: 0,
      totalGross: 0,
      labour: 0,
      materials: 0,
    };
  }

  const labourVal = c.labourAmount !== undefined && !isNaN(c.labourAmount) ? c.labourAmount : undefined;
  const materialsVal = c.materialsAmount !== undefined && !isNaN(c.materialsAmount) ? c.materialsAmount : undefined;

  let contractPrice = 0;
  if (c.subtotalAmount !== undefined && !isNaN(c.subtotalAmount) && c.subtotalAmount > 0) {
    contractPrice = c.subtotalAmount;
  } else if (labourVal !== undefined && materialsVal !== undefined && (labourVal + materialsVal) > 0) {
    contractPrice = Math.round((labourVal + materialsVal) * 100) / 100;
  } else {
    const rawNum =
      c.priceNumeric ||
      (c.agreedPrice ? parseFloat(c.agreedPrice.replace(/[^0-9.]/g, "")) : (c.finalCost ? parseFloat(c.finalCost.replace(/[^0-9.]/g, "")) : 0)) ||
      0;
    // Handle case where priceNumeric was mistakenly stored equal to totalAmount (which already had the 5% fee)
    if (c.totalAmount && c.totalAmount > 0 && Math.abs(rawNum - c.totalAmount) < 0.01) {
      contractPrice = Math.round((c.totalAmount / 1.05) * 100) / 100;
    } else {
      contractPrice = rawNum;
    }
  }

  const platformFee = c.platformFeeAmount !== undefined && !isNaN(c.platformFeeAmount)
    ? c.platformFeeAmount
    : Math.round(contractPrice * 0.05 * 100) / 100;

  const totalGross = c.totalAmount !== undefined && !isNaN(c.totalAmount) && c.totalAmount >= contractPrice
    ? c.totalAmount
    : Math.round((contractPrice + platformFee) * 100) / 100;

  const resolvedLabour = labourVal !== undefined ? labourVal : Math.round(contractPrice * 0.7 * 100) / 100;
  const resolvedMaterials = materialsVal !== undefined ? materialsVal : Math.round((contractPrice - resolvedLabour) * 100) / 100;

  return {
    contractPrice,
    platformFee,
    totalGross,
    labour: resolvedLabour,
    materials: resolvedMaterials,
  };
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

  const resolvedEquipments =
    updates.providedEquipments && updates.providedEquipments.length > 0
      ? updates.providedEquipments
      : idx !== -1 && all[idx].providedEquipments && all[idx].providedEquipments.length > 0
      ? all[idx].providedEquipments
      : ["Certified trade replacement parts and compression fittings", "Standard high-spec trade consumables"];

  const resolvedServices =
    updates.providedServices && updates.providedServices.length > 0
      ? updates.providedServices
      : idx !== -1 && all[idx].providedServices && all[idx].providedServices.length > 0
      ? all[idx].providedServices
      : ["Initial trade inspection & diagnosis", "Agreed repair labor and material fitting"];

  const harmonizedUpdates: Partial<JobContract> = {
    ...updates,
    agreedPrice: resolvedAgreedPrice,
    currency: resolvedCurrency,
    priceNumeric: resolvedNumeric,
    labourAmount: resolvedLabour,
    materialsAmount: resolvedMaterials,
    totalAmount: resolvedTotal,
    providedServices: resolvedServices,
    providedEquipments: resolvedEquipments,
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
      homeownerId: updates.homeownerId || "",
      homeownerName: updates.homeownerName || "Homeowner",
      homeownerPhone: updates.homeownerPhone || "+44 20 7946 0812",
      homeownerEmail: updates.homeownerEmail || "",
      homeownerAddress: updates.homeownerAddress || updates.location || "London, UK",
      proId: updates.proId || "",
      proSlug: updates.proSlug || (updates.proName ? updates.proName.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "trade-specialist"),
      proName: updates.proName || "Trade Specialist",
      proPhone: updates.proPhone || "+44 20 7946 0812",
      proEmail: updates.proEmail || "",
      proLicense: updates.proLicense || "Verified Trade Certification",
      proInsurance: updates.proInsurance || "£2,000,000 Trade Liability",
      proCity: updates.proCity || updates.city || "London",
      status: updates.status || "DRAFT",
      agreedPrice: resolvedAgreedPrice,
      currency: resolvedCurrency,
      priceNumeric: resolvedNumeric,
      labourAmount: resolvedLabour,
      materialsAmount: resolvedMaterials,
      totalAmount: resolvedTotal,
      providedServices: resolvedServices,
      providedEquipments: resolvedEquipments,
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
  const all = getContracts();
  const existing = all.find((c) => c.id === contractId || c.referenceCode === contractId);

  return updateContractDraft(contractId, {
    ...(existing || {}),
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

  const all = getContracts();
  const existing = all.find((c) => c.id === contractId || c.referenceCode === contractId);

  return updateContractDraft(contractId, {
    ...(existing || {}),
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
    platformFeeRate?: number;
    platformFeeAmount?: number;
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
  },
  baseContract?: Partial<JobContract>
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
  const currency = existing?.currency || baseContract?.currency || "£";

  const subtotal = invoiceData.subtotalAmount ?? (invoiceData.labourAmount + invoiceData.materialsAmount);
  const fee = invoiceData.platformFeeAmount ?? Math.round(subtotal * 0.05 * 100) / 100;
  const gross = invoiceData.totalAmount || Math.round((subtotal + fee) * 100) / 100;

  return updateContractDraft(contractId, {
    ...(baseContract || {}),
    ...(existing || {}),
    status: "INVOICED",
    invoiceNumber: invoiceData.invoiceNumber,
    invoiceIssuedAt: timestamp,
    labourAmount: invoiceData.labourAmount,
    materialsAmount: invoiceData.materialsAmount,
    subtotalAmount: subtotal,
    platformFeeRate: invoiceData.platformFeeRate ?? 5,
    platformFeeAmount: fee,
    vatRate: invoiceData.vatRate ?? 0,
    vatAmount: invoiceData.vatAmount ?? 0,
    vatNumber: invoiceData.vatNumber ?? "GB 948 2014 92",
    totalAmount: gross,
    priceNumeric: subtotal,
    agreedPrice: `${currency}${subtotal.toFixed(2)}`,
    providedServices: existing?.providedServices || baseContract?.providedServices,
    providedEquipments: existing?.providedEquipments || baseContract?.providedEquipments,
    paymentMethod: invoiceData.paymentMethod || "Bank Transfer (Direct)",
    bankDetails: invoiceData.bankDetails || {
      bankName: "Barclays Business UK",
      accountName: existing?.proName || baseContract?.proName || "Trade Specialist",
      sortCode: "20-04-15",
      accountNumber: "83921049",
      paymentReference: existing?.referenceCode || baseContract?.referenceCode || "TC-2026",
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

  const all = getContracts();
  const existing = all.find((c) => c.id === contractId || c.referenceCode === contractId);

  return updateContractDraft(contractId, {
    ...(existing || {}),
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

  const all = getContracts();
  const existing = all.find((c) => c.id === contractId || c.referenceCode === contractId);

  const updated = updateContractDraft(contractId, {
    ...(existing || {}),
    status: "PAID",
    invoicePaidAt: existing?.invoicePaidAt || dateStr,
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

function parseMonthKeyAndLabel(dateStr?: string): { monthKey: string; monthLabel: string } {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const now = new Date();
  const fallbackYear = now.getFullYear();
  const fallbackMonth = now.getMonth(); // 0-indexed
  const fallbackKey = `${fallbackYear}-${String(fallbackMonth + 1).padStart(2, "0")}`;
  const fallbackLabel = `${monthNames[fallbackMonth]} ${fallbackYear}`;

  if (!dateStr || dateStr.toLowerCase().includes("recent") || dateStr.toLowerCase() === "today") {
    return { monthKey: fallbackKey, monthLabel: fallbackLabel };
  }

  // 1. Check for month names like "21 Nov 2026" or "November 2026"
  for (let i = 0; i < 12; i++) {
    if (new RegExp(`\\b(${monthNames[i]}|${shortMonthNames[i]})\\b`, "i").test(dateStr)) {
      const yearMatch = dateStr.match(/\b(20\d\d)\b/);
      const y = yearMatch ? parseInt(yearMatch[1], 10) : fallbackYear;
      const m = i + 1;
      return {
        monthKey: `${y}-${String(m).padStart(2, "0")}`,
        monthLabel: `${monthNames[i]} ${y}`,
      };
    }
  }

  // 2. Check for DD/MM/YYYY format e.g. "21/11/2026"
  const dmyMatch = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (dmyMatch) {
    const m = parseInt(dmyMatch[2], 10);
    const y = parseInt(dmyMatch[3], 10);
    if (!isNaN(y) && !isNaN(m) && m >= 1 && m <= 12) {
      return {
        monthKey: `${y}-${String(m).padStart(2, "0")}`,
        monthLabel: `${monthNames[m - 1]} ${y}`,
      };
    }
  }

  // 3. Check for ISO format YYYY-MM-DD
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})/);
  if (isoMatch) {
    const y = parseInt(isoMatch[1], 10);
    const m = parseInt(isoMatch[2], 10);
    if (!isNaN(y) && !isNaN(m) && m >= 1 && m <= 12) {
      return {
        monthKey: `${y}-${String(m).padStart(2, "0")}`,
        monthLabel: `${monthNames[m - 1]} ${y}`,
      };
    }
  }

  // 4. Try standard Date.parse
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = parsed.getMonth();
    return {
      monthKey: `${y}-${String(m + 1).padStart(2, "0")}`,
      monthLabel: `${monthNames[m]} ${y}`,
    };
  }

  return { monthKey: fallbackKey, monthLabel: fallbackLabel };
}

export function getContractorEarnings(
  proFilter: string | { id?: string; email?: string; companyName?: string; name?: string } = "pro_uk_1",
  contractsList?: JobContract[],
  jobsList?: MarketplaceJobItem[]
): ContractorEarningsReport {
  const all = contractsList || getContracts();

  const proId = typeof proFilter === "string" ? proFilter : proFilter.id;
  const proEmail = typeof proFilter === "string" ? undefined : proFilter.email?.toLowerCase();
  const proCompany = typeof proFilter === "string" ? undefined : proFilter.companyName?.toLowerCase();
  const proName = typeof proFilter === "string" ? undefined : proFilter.name?.toLowerCase();

  const isDemoPro =
    proId === "pro_uk_1" ||
    proId === "user_pro_1" ||
    proEmail === "david.thornton@apexheating.co.uk" ||
    proEmail === "apex.heating@tradeconnect.co.uk";

  // Filter for contracts associated with this pro that are PAID or COMPLETED
  const paidContracts = all.filter((c) => {
    if (isDemoPro) {
      return (
        c.proId === "pro_uk_1" ||
        c.proSlug === "apex-plumbing-heating-london" ||
        c.proEmail?.toLowerCase() === "david.thornton@apexheating.co.uk" ||
        c.proEmail?.toLowerCase() === "david@apexplumbing.co.uk" ||
        c.proName.toLowerCase().includes("apex")
      );
    }

    // For real new contractors: strictly match their user ID, registered email or name
    if (proId && c.proId === proId) return true;
    if (proEmail && c.proEmail && c.proEmail.toLowerCase() === proEmail) return true;
    if (proCompany && c.proName && c.proName.toLowerCase() === proCompany) return true;
    if (proName && c.proName && c.proName.toLowerCase() === proName) return true;
    return false;
  }).filter((c) => c.status === "PAID" || c.status === "COMPLETED");

  // Also include any completed jobs from jobsList where this contractor's proposal was accepted
  if (Array.isArray(jobsList)) {
    jobsList.forEach((j: MarketplaceJobItem) => {
      if (j.status !== "COMPLETED") return;
      if (paidContracts.some((c) => c.referenceCode === j.referenceCode)) return;

      const isMyJob = isDemoPro
        ? true
        : j.proposals?.some((p: QuoteProposal) =>
            p.status === "ACCEPTED" &&
            (p.proId === proId ||
              (proEmail && p.proEmail?.toLowerCase() === proEmail) ||
              (proCompany && p.proName?.toLowerCase() === proCompany) ||
              (proName && p.proName?.toLowerCase() === proName))
          );

      if (isMyJob) {
        const rawPrice = j.finalCost || "£145.00";
        const numericPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, "")) || 145;
        const acceptedProp = j.proposals?.find((p: QuoteProposal) => p.status === "ACCEPTED");

        paidContracts.push({
          id: `cnt_${j.id}`,
          referenceCode: j.referenceCode,
          service: j.service,
          title: j.title,
          location: j.location,
          city: j.city || "London",
          country: j.country || "UK",
          urgency: j.urgency || "Standard",
          datePosted: j.datePosted,
          homeownerId: j.homeownerId || "",
          homeownerName: j.homeownerName,
          homeownerPhone: j.homeownerPhone || "+44 20 7946 0812",
          homeownerEmail: j.homeownerEmail || "",
          homeownerAddress: j.location,
          proId: acceptedProp?.proId || proId || "pro_custom",
          proSlug: "contractor",
          proName: acceptedProp?.proName || proCompany || proName || "Trade Specialist",
          proPhone: acceptedProp?.phone || "+44 20 7946 0812",
          proEmail: acceptedProp?.proEmail || proEmail || "",
          proLicense: "Verified Trade Certification",
          proInsurance: "£2,000,000 Trade Liability",
          proCity: j.city || "London",
          status: "PAID",
          agreedPrice: rawPrice,
          currency: "£",
          priceNumeric: numericPrice,
          totalAmount: numericPrice,
          providedServices: ["Standard trade diagnostic & repair", "Certified part installation"],
          providedEquipments: ["Certified replacement fittings", "Approved diagnostic testing equipment"],
          serviceDate: j.completedDate || "Recently",
          serviceTime: "09:00 AM",
          warrantyPeriod: "12 Months Workmanship Guarantee",
          invoiceNumber: `INV-${j.referenceCode}`,
          invoicePaidAt: j.completedDate || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
          notes: "Job completed to homeowner satisfaction.",
        });
      }
    });
  }

  let totalLifetimeEarned = 0;
  const monthMap: { [key: string]: MonthlyEarningEntry } = {};

  // Now dynamically calculate paid contracts for this contractor
  paidContracts.forEach((contract) => {
    // Contractor earnings strictly exclude platform fee
    const fin = getContractFinancials(contract);
    const amount = fin.contractPrice;
    if (amount > 0) {
      const { monthKey, monthLabel } = parseMonthKeyAndLabel(contract.invoicePaidAt || contract.serviceDate);
      if (!monthMap[monthKey]) {
        monthMap[monthKey] = {
          monthKey,
          monthLabel,
          totalEarned: 0,
          total: 0,
          jobsCount: 0,
          contracts: [],
          invoices: [],
        };
      }
      monthMap[monthKey].totalEarned += amount;
      monthMap[monthKey].total += amount;
      monthMap[monthKey].jobsCount += 1;
      monthMap[monthKey].contracts.unshift(contract);
      monthMap[monthKey].invoices.unshift({
        id: contract.id,
        invoiceNumber: contract.invoiceNumber || `INV-${contract.referenceCode}`,
        referenceCode: contract.referenceCode,
        title: contract.title,
        homeownerName: contract.homeownerName,
        amount,
        paidDate: contract.invoicePaidAt || "Today",
      });
      totalLifetimeEarned += amount;
    }
  });

  const breakdown = Object.values(monthMap).sort((a, b) => b.monthKey.localeCompare(a.monthKey));
  const thisMonthEarned = breakdown[0]?.totalEarned || 0;

  return {
    totalLifetimeEarned,
    lifetimeTotal: totalLifetimeEarned,
    thisMonthEarned,
    completedContractsCount: paidContracts.length,
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
  userFilter: string | { id?: string; email?: string; name?: string } = "usr_homeowner_1",
  contractsList?: JobContract[]
): HomeownerStats {
  const all = contractsList || getContracts();
  const id = typeof userFilter === "string" ? userFilter : userFilter.id;
  const email = typeof userFilter === "string" ? undefined : userFilter.email?.toLowerCase();
  const name = typeof userFilter === "string" ? userFilter : userFilter.name;

  const isDemo =
    id === "usr_homeowner_1" ||
    id === "user_homeowner_1" ||
    email === "sarah.jenkins@example.com" ||
    (typeof userFilter === "string" && userFilter.toLowerCase().includes("sarah"));

  const mine = all.filter((c) => {
    if (isDemo) {
      return (
        c.homeownerId === "usr_homeowner_1" ||
        c.homeownerId === "user_homeowner_1" ||
        c.homeownerEmail?.toLowerCase() === "sarah.jenkins@example.com" ||
        c.homeownerName.toLowerCase().includes("sarah")
      );
    }
    // For non-demo real registered users: strictly match by user ID or user email
    if (id && c.homeownerId === id) return true;
    if (email && c.homeownerEmail && c.homeownerEmail.toLowerCase() === email) return true;
    return false;
  });

  const completed = mine.filter((c) => c.status === "COMPLETED" || c.status === "PAID");
  const active = mine.filter((c) => c.status === "ACTIVE" || c.status === "INVOICED");
  const pendingDrafts = mine.filter((c) => c.status === "PENDING_APPROVAL" || c.status === "DRAFT");

  const totalSpent = completed.reduce((sum, c) => sum + getContractFinancials(c).contractPrice, 0);
  const signedCount = completed.length + active.length;

  return {
    homeownerName: name || "Homeowner",
    signedContractsCount: signedCount,
    completedContractsCount: completed.length,
    activeContractsCount: active.length,
    pendingDraftsCount: pendingDrafts.length,
    totalSpent,
    isVerifiedJobProvider: signedCount >= 10,
    memberSince: isDemo ? "October 2026" : "Recently Joined",
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
    let inFlight = false;

    const pollContracts = async () => {
      if (!isMounted || inFlight) return;
      inFlight = true;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      try {
        const res = await fetch("/api/contracts", { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data && Array.isArray(data.contracts)) {
          const currentLocal = getContracts();
          // Authoritative list from database: only preserve unsynced temporary local items
          const pendingLocal = currentLocal.filter(
            (lc: JobContract) => lc.id.startsWith("cnt_temp_") && !data.contracts.some((mc: JobContract) => mc.referenceCode === lc.referenceCode)
          );
          const merged = [...data.contracts, ...pendingLocal];
          saveContracts(merged);
        }
      } catch (err: unknown) {
        if ((err as Error)?.name !== "AbortError") {
          console.warn("Neon DB fetch notice:", err);
        }
      } finally {
        clearTimeout(timeoutId);
        inFlight = false;
      }
    };

    pollContracts();
    const timer = setInterval(pollContracts, 5000);

    return () => {
      isMounted = false;
      clearInterval(timer);
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
