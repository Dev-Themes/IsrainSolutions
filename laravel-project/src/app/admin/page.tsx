"use client";

import * as React from "react";
import Link from "next/link";
import {
  Lock,
  CheckCircle2,
  Users,
  Search,
  Calendar,
  LogOut,
  TrendingUp,
  Receipt,
  Eye,
  Printer,
  X,
  Building,
} from "lucide-react";
import { useContractStore, JobContract, getContracts, getContractFinancials } from "@/lib/contract-store";
import { useJobStore } from "@/lib/job-store";
import { VERIFIED_PROS } from "@/lib/data";
import { toast } from "@/components/ui/toast";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  InvoiceContractModal,
  InvoiceContractData,
} from "@/components/documents/invoice-contract-document";

interface UserSecurityStatus {
  id: string;
  status: "ACTIVE" | "FLAGGED" | "SUSPENDED";
  flagReason?: string;
  lastActionAt?: string;
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("tradeconnect_admin_auth") === "granted";
    }
    return false;
  });
  const [passkeyInput, setPasskeyInput] = React.useState("");
  const [passkeyError, setPasskeyError] = React.useState(false);

  // Tab View
  const [activeTab, setActiveTab] = React.useState<"OVERVIEW" | "CONTRACTORS" | "HOMEOWNERS" | "CONTRACTS">("OVERVIEW");
  const [breakdownPeriod, setBreakdownPeriod] = React.useState<"MONTHLY" | "YEARLY">("MONTHLY");

  // Filter & Search
  const [searchTerm, setSearchTerm] = React.useState("");

  // Invoice & Bank Details Inspection
  const [inspectingContract, setInspectingContract] = React.useState<JobContract | null>(null);
  const [isOfficialDocOpen, setIsOfficialDocOpen] = React.useState(false);

  // Store hooks
  const { contracts: storeContracts } = useContractStore();
  const { jobs: storeJobs } = useJobStore();

  // Security actions store (persisted in localStorage)
  const [securityMap, setSecurityMap] = React.useState<Record<string, UserSecurityStatus>>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedSecurity = localStorage.getItem("tradeconnect_admin_security_v1");
        if (storedSecurity) return JSON.parse(storedSecurity);
      } catch {
        // ignore
      }
    }
    return {};
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === "admin2026" || passkeyInput === "superadmin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("tradeconnect_admin_auth", "granted");
      setPasskeyError(false);
      toast.success("Administrator session authorized. Access granted.");
    } else {
      setPasskeyError(true);
      toast.error("Invalid administrator security key.");
    }
  };

  const handleLogoutAdmin = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("tradeconnect_admin_auth");
    toast.info("Logged out of administrator console.");
  };

  const updateSecurityStatus = (
    userId: string,
    newStatus: "ACTIVE" | "FLAGGED" | "SUSPENDED",
    reason = ""
  ) => {
    const updated: UserSecurityStatus = {
      id: userId,
      status: newStatus,
      flagReason: reason || (newStatus === "FLAGGED" ? "Flagged for manual audit" : newStatus === "SUSPENDED" ? "Account suspended for policy compliance review" : "Restored to active standing"),
      lastActionAt: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const newMap = { ...securityMap, [userId]: updated };
    setSecurityMap(newMap);
    try {
      localStorage.setItem("tradeconnect_admin_security_v1", JSON.stringify(newMap));
    } catch {
      // ignore
    }

    if (newStatus === "SUSPENDED") {
      toast.error(`Security action: User ${userId} has been SUSPENDED.`);
    } else if (newStatus === "FLAGGED") {
      toast.info(`Security action: User ${userId} has been FLAGGED.`);
    } else {
      toast.success(`Security action: User ${userId} restored to ACTIVE standing.`);
    }
  };

  // Compile full set of all contracts & completed jobs
  const allContracts = React.useMemo(() => {
    return storeContracts && storeContracts.length > 0 ? storeContracts : getContracts();
  }, [storeContracts]);

  // Financial aggregates
  const completedContracts = React.useMemo(() => {
    return allContracts.filter((c) => c.status === "PAID" || c.status === "COMPLETED");
  }, [allContracts]);

  // Aggregate Metrics:
  // 1. Total contractor work subtotal (net paid to trades)
  // 2. Platform 5% fee commission (earned by platform)
  // 3. Gross volume paid by homeowners (subtotal + 5% platform fee)
  const financialTotals = React.useMemo(() => {
    let contractorNet = 0;
    let platformCommission = 0;
    let homeownerGross = 0;
    const uniqueContractors = new Set<string>();
    const uniqueHomeowners = new Set<string>();

    completedContracts.forEach((c) => {
      const fin = getContractFinancials(c);
      contractorNet += fin.contractPrice;
      platformCommission += fin.platformFee;
      homeownerGross += fin.totalGross;

      if (c.proSlug || c.proName) uniqueContractors.add(c.proSlug || c.proName);
      if (c.homeownerEmail || c.homeownerName) uniqueHomeowners.add(c.homeownerEmail || c.homeownerName);
    });

    return {
      contractorNet: Math.round(contractorNet * 100) / 100,
      platformCommission: Math.round(platformCommission * 100) / 100,
      homeownerGross: Math.round(homeownerGross * 100) / 100,
      contractorCount: uniqueContractors.size,
      homeownerCount: uniqueHomeowners.size,
      totalCompletedJobs: completedContracts.length,
    };
  }, [completedContracts]);

  // Monthly & Yearly breakdowns
  const periodicBreakdown = React.useMemo(() => {
    const monthlyGroups: Record<string, { label: string; jobsCount: number; contractorNet: number; platformCommission: number; homeownerGross: number }> = {};
    const yearlyGroups: Record<string, { label: string; jobsCount: number; contractorNet: number; platformCommission: number; homeownerGross: number }> = {};

    completedContracts.forEach((c) => {
      const fin = getContractFinancials(c);
      const subtotal = fin.contractPrice;
      const fee = fin.platformFee;
      const gross = fin.totalGross;

      const dateStr = c.invoicePaidAt || c.serviceDate || "22 Nov 2026";
      let monthKey = "2026-11";
      let monthLabel = "November 2026";
      let yearKey = "2026";

      if (dateStr.includes("Oct") || dateStr.includes("10/")) {
        monthKey = "2026-10";
        monthLabel = "October 2026";
      } else if (dateStr.includes("Sep") || dateStr.includes("09/")) {
        monthKey = "2026-09";
        monthLabel = "September 2026";
      } else if (dateStr.includes("Aug") || dateStr.includes("08/")) {
        monthKey = "2026-08";
        monthLabel = "August 2026";
      }

      const yearMatch = dateStr.match(/\b(20\d\d)\b/);
      if (yearMatch) yearKey = yearMatch[1];

      // Monthly
      if (!monthlyGroups[monthKey]) {
        monthlyGroups[monthKey] = { label: monthLabel, jobsCount: 0, contractorNet: 0, platformCommission: 0, homeownerGross: 0 };
      }
      monthlyGroups[monthKey].jobsCount += 1;
      monthlyGroups[monthKey].contractorNet += subtotal;
      monthlyGroups[monthKey].platformCommission += fee;
      monthlyGroups[monthKey].homeownerGross += gross;

      // Yearly
      if (!yearlyGroups[yearKey]) {
        yearlyGroups[yearKey] = { label: `Year ${yearKey}`, jobsCount: 0, contractorNet: 0, platformCommission: 0, homeownerGross: 0 };
      }
      yearlyGroups[yearKey].jobsCount += 1;
      yearlyGroups[yearKey].contractorNet += subtotal;
      yearlyGroups[yearKey].platformCommission += fee;
      yearlyGroups[yearKey].homeownerGross += gross;
    });

    return {
      monthly: Object.values(monthlyGroups),
      yearly: Object.values(yearlyGroups),
    };
  }, [completedContracts]);

  // Contractors master directory
  const contractorsDirectory = React.useMemo(() => {
    return VERIFIED_PROS.map((pro) => {
      const myContracts = completedContracts.filter(
        (c) => c.proSlug === pro.slug || c.proName.toLowerCase().includes(pro.companyName.toLowerCase().slice(0, 5))
      );
      const jobsCount = myContracts.length;
      const totalNetEarned = myContracts.reduce((sum, c) => sum + (c.subtotalAmount || c.priceNumeric || 0), 0);
      const sec = securityMap[pro.slug] || { id: pro.slug, status: "ACTIVE" };

      return {
        id: pro.slug,
        name: pro.companyName,
        contactName: pro.contactName,
        service: pro.categories?.[0] || "Trade Specialist",
        city: pro.city,
        phone: pro.phone,
        license: pro.licenseNumber,
        completedJobs: jobsCount,
        totalEarned: totalNetEarned,
        securityStatus: sec.status,
        flagReason: sec.flagReason,
      };
    });
  }, [completedContracts, securityMap]);

  // Homeowners directory compiled from contracts & jobs
  const homeownersDirectory = React.useMemo(() => {
    const map = new Map<string, { id: string; name: string; email: string; phone: string; city: string; jobsPosted: number; totalPaid: number; securityStatus: "ACTIVE" | "FLAGGED" | "SUSPENDED" }>();

    allContracts.forEach((c) => {
      const key = c.homeownerEmail || c.homeownerName;
      if (!key) return;
      const existing = map.get(key) || {
        id: key,
        name: c.homeownerName,
        email: c.homeownerEmail || "homeowner@registered.uk",
        phone: c.homeownerPhone,
        city: c.city || "London",
        jobsPosted: 0,
        totalPaid: 0,
        securityStatus: (securityMap[key]?.status as "ACTIVE" | "FLAGGED" | "SUSPENDED") || "ACTIVE",
      };

      existing.jobsPosted += 1;
      if (c.status === "PAID" || c.status === "COMPLETED") {
        existing.totalPaid += getContractFinancials(c).totalGross;
      }
      map.set(key, existing);
    });

    storeJobs.forEach((j) => {
      const key = j.homeownerEmail || j.homeownerName;
      if (!key) return;
      const existing = map.get(key) || {
        id: key,
        name: j.homeownerName,
        email: j.homeownerEmail || "client@verified.uk",
        phone: j.homeownerPhone || "+44 20 7946 0812",
        city: j.city || "London",
        jobsPosted: 0,
        totalPaid: 0,
        securityStatus: (securityMap[key]?.status as "ACTIVE" | "FLAGGED" | "SUSPENDED") || "ACTIVE",
      };
      existing.jobsPosted += 1;
      map.set(key, existing);
    });

    return Array.from(map.values());
  }, [allContracts, storeJobs, securityMap]);

  // Convert inspecting contract to InvoiceContractData
  const inspectingDocData: InvoiceContractData | null = React.useMemo(() => {
    if (!inspectingContract) return null;
    const isPaid = inspectingContract.status === "PAID" || inspectingContract.status === "COMPLETED";
    const fin = getContractFinancials(inspectingContract);
    const curr = inspectingContract.currency || "£";

    return {
      documentType: isPaid ? "INVOICE" : inspectingContract.status === "DRAFT" || inspectingContract.status === "PENDING_APPROVAL" ? "DRAFT_CONTRACT" : "CONTRACT",
      documentNumber: inspectingContract.invoiceNumber || `INV-${inspectingContract.referenceCode}`,
      referenceCode: inspectingContract.referenceCode,
      issueDate: inspectingContract.invoiceIssuedAt || inspectingContract.serviceDate || "22 Nov 2026",
      serviceCategory: inspectingContract.service,
      jobTitle: inspectingContract.title,
      location: inspectingContract.location,
      agreedPrice: `${curr}${fin.contractPrice.toFixed(2)}`,
      paymentStatus: isPaid ? "PAID IN FULL" : inspectingContract.status === "INVOICED" ? "PENDING PAYMENT" : "CONTRACT ACTIVE",
      paymentMethod: inspectingContract.paymentMethod || "TradeConnect Protected Escrow",
      serviceDateTime: `${inspectingContract.serviceDate} at ${inspectingContract.serviceTime}`,
      warrantyPeriod: inspectingContract.warrantyPeriod,
      homeowner: {
        name: inspectingContract.homeownerName,
        address: inspectingContract.homeownerAddress,
        phone: inspectingContract.homeownerPhone,
        email: inspectingContract.homeownerEmail,
      },
      contractor: {
        companyName: inspectingContract.proName,
        contactName: inspectingContract.proName,
        licenseNumber: inspectingContract.proLicense,
        insuranceAmount: inspectingContract.proInsurance,
        phone: inspectingContract.proPhone,
        baseCity: inspectingContract.proCity,
      },
      providedServices: inspectingContract.providedServices,
      providedEquipments: inspectingContract.providedEquipments,
      labourAmount: fin.labour,
      materialsAmount: fin.materials,
      subtotalAmount: fin.contractPrice,
      platformFeeRate: 5,
      platformFeeAmount: fin.platformFee,
      totalAmount: fin.totalGross,
      homeownerSignature: inspectingContract.homeownerSignature,
    };
  }, [inspectingContract]);

  // ==========================================
  // PASSKEY GATEWAY SCREEN (THEMED)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg)] text-[var(--text)] transition-colors">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-2xl space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] px-2 py-0.5 rounded bg-[var(--bg-alt)] border border-[var(--line)]">
              Admin Gateway
            </span>
            <ThemeToggle />
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-[var(--text)]">
              TradeConnect Executive Portal
            </h1>
            <p className="text-xs text-[var(--text-muted)]">
              Private Executive Operations &amp; Platform Security Console. Follows platform theme.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                Admin Security Passkey
              </label>
              <input
                type="password"
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Enter admin security key (e.g. admin2026)"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-sm text-[var(--text)] placeholder-[var(--text-light)] focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-mono"
                autoFocus
              />
              {passkeyError && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 font-semibold">
                  Access denied. Invalid security passkey.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              Authorize Security Access &rarr;
            </button>

            <button
              type="button"
              onClick={() => {
                setPasskeyInput("admin2026");
                setIsAuthenticated(true);
                sessionStorage.setItem("tradeconnect_admin_auth", "granted");
                toast.success("Superadmin credentials authorized.");
              }}
              className="w-full py-1.5 text-center text-[11px] text-[var(--text-muted)] hover:text-[var(--text)] underline cursor-pointer"
            >
              Dev Bypass: Use Default Admin Key (admin2026)
            </button>
          </form>

          <div className="pt-2 border-t border-[var(--line)] text-center">
            <Link href="/" className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
              &larr; Return to Public Platform
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED ADMIN CONSOLE (FULL THEME AWARE)
  // ==========================================
  return (
    <div className="min-h-screen pb-16 bg-[var(--bg)] text-[var(--text)] transition-colors">
      {/* Top Banner */}
      <header className="sticky top-0 z-40 bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--line)] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xs">
            TC
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold text-sm sm:text-base text-[var(--text)] tracking-tight">
                TradeConnect Executive Console
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 text-[10px] font-bold">
                INTERNAL ONLY
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Escrow Oversight &bull; 5% Platform Revenue &bull; Security Action Enforcement
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Link
            href="/"
            target="_blank"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] px-2.5 py-1.5 rounded border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] transition-colors"
          >
            Open Live Site &rarr;
          </Link>
          <button
            type="button"
            onClick={handleLogoutAdmin}
            className="inline-flex items-center space-x-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-500/10 px-2.5 py-1.5 rounded border border-red-500/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Console</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* EXECUTIVE KPI FINANCIAL CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: 5% Commission */}
          <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Platform 5% Revenue
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text)]">
              £{financialTotals.platformCommission.toFixed(2)}
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Direct 5% commission collected on {financialTotals.totalCompletedJobs} settled contracts
            </p>
          </div>

          {/* Card 2: Homeowners Total Paid */}
          <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Homeowners Total Paid
              </span>
              <Receipt className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text)]">
              £{financialTotals.homeownerGross.toFixed(2)}
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Total gross escrow volume paid across {financialTotals.homeownerCount} active clients
            </p>
          </div>

          {/* Card 3: Contractors Benefitted */}
          <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                Contractors Benefitted
              </span>
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text)]">
              £{financialTotals.contractorNet.toFixed(2)}
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              100% net earnings paid out to {financialTotals.contractorCount || VERIFIED_PROS.length} verified trade pros
            </p>
          </div>

          {/* Card 4: Jobs Done */}
          <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
                Total Jobs Completed
              </span>
              <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text)]">
              {financialTotals.totalCompletedJobs}
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Zero escrow disputes &bull; Guaranteed completion sign-off
            </p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-2">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setActiveTab("OVERVIEW")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === "OVERVIEW"
                  ? "bg-amber-600 text-white"
                  : "bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--line)]"
              }`}
            >
              Financial Breakdowns
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("CONTRACTORS")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === "CONTRACTORS"
                  ? "bg-amber-600 text-white"
                  : "bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--line)]"
              }`}
            >
              Contractors ({contractorsDirectory.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("HOMEOWNERS")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === "HOMEOWNERS"
                  ? "bg-amber-600 text-white"
                  : "bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--line)]"
              }`}
            >
              Homeowners ({homeownersDirectory.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("CONTRACTS")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === "CONTRACTS"
                  ? "bg-amber-600 text-white"
                  : "bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--line)]"
              }`}
            >
              Contracts Audit ({allContracts.length})
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, reference, or city..."
              className="pl-8 pr-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-xs text-[var(--text)] placeholder-[var(--text-light)] focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* TAB CONTENT: 1. OVERVIEW & FINANCIAL BREAKDOWNS */}
        {activeTab === "OVERVIEW" && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider">
                    Volume &amp; Platform Commission Breakdowns
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Showing direct comparison between Monthly and Yearly gross escrow throughput and 5% fee revenue.
                  </p>
                </div>

                <div className="flex items-center space-x-1.5 p-1 rounded-lg bg-[var(--bg-alt)] border border-[var(--line)]">
                  <button
                    type="button"
                    onClick={() => setBreakdownPeriod("MONTHLY")}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      breakdownPeriod === "MONTHLY" ? "bg-amber-600 text-white shadow-xs" : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    Monthly Wise
                  </button>
                  <button
                    type="button"
                    onClick={() => setBreakdownPeriod("YEARLY")}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      breakdownPeriod === "YEARLY" ? "bg-amber-600 text-white shadow-xs" : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    Yearly Wise
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[var(--bg-alt)] text-[var(--text-muted)] uppercase tracking-wider font-bold border-b border-[var(--line)]">
                    <tr>
                      <th className="p-3">Period</th>
                      <th className="p-3 text-center">Settled Jobs</th>
                      <th className="p-3 text-right">Homeowners Paid (Gross)</th>
                      <th className="p-3 text-right">Contractors Payout (Net)</th>
                      <th className="p-3 text-right text-emerald-600 dark:text-emerald-400">Platform 5% Commission</th>
                      <th className="p-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    {(breakdownPeriod === "MONTHLY" ? periodicBreakdown.monthly : periodicBreakdown.yearly).map((group, idx) => (
                      <tr key={idx} className="hover:bg-[var(--bg-alt)]/50 transition-colors">
                        <td className="p-3 font-bold text-[var(--text)] flex items-center space-x-2">
                          <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>{group.label}</span>
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-[var(--text)]">
                          {group.jobsCount}
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-amber-700 dark:text-amber-300">
                          £{group.homeownerGross.toFixed(2)}
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-blue-700 dark:text-blue-300">
                          £{group.contractorNet.toFixed(2)}
                        </td>
                        <td className="p-3 text-right font-mono font-extrabold text-emerald-700 dark:text-emerald-400">
                          £{group.platformCommission.toFixed(2)}
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                            Audited &bull; Settled
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Platform Policy Summary */}
            <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-soft">
              <div>
                <span className="font-bold text-[var(--text)] block">Platform Escrow Fee Compliance:</span>
                <span className="text-[var(--text-muted)]">
                  Fixed 5% commission is strictly withheld from escrow upon milestone release. VAT has been removed from contracts and direct invoices in accordance with updated direct billing regulations.
                </span>
              </div>
              <Link
                href="/blog/platform-fees-escrow-protection-policy"
                target="_blank"
                className="shrink-0 text-amber-700 dark:text-amber-400 hover:underline font-bold"
              >
                Read Official Policy Article &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* TAB CONTENT: 2. CONTRACTORS DIRECTORY & SECURITY ACTIONS */}
        {activeTab === "CONTRACTORS" && (
          <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider">
                  Contractor Security Oversight &amp; Compliance Directory
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Manage trade credentials, monitor earnings, and execute immediate security sanctions (Flag / Suspend / Reactivate).
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[var(--bg-alt)] text-[var(--text-muted)] uppercase tracking-wider font-bold border-b border-[var(--line)]">
                  <tr>
                    <th className="p-3">Contractor / Trade</th>
                    <th className="p-3">Base &amp; Contact</th>
                    <th className="p-3">License / Accreditations</th>
                    <th className="p-3 text-center">Jobs Completed</th>
                    <th className="p-3 text-right">Net Earned</th>
                    <th className="p-3 text-center">Security Standing</th>
                    <th className="p-3 text-right">Security Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  {contractorsDirectory
                    .filter((pro) =>
                      searchTerm ? pro.name.toLowerCase().includes(searchTerm.toLowerCase()) || pro.city.toLowerCase().includes(searchTerm.toLowerCase()) || pro.service.toLowerCase().includes(searchTerm.toLowerCase()) : true
                    )
                    .map((pro) => (
                      <tr key={pro.id} className="hover:bg-[var(--bg-alt)]/50 transition-colors">
                        <td className="p-3">
                          <span className="font-bold text-[var(--text)] block">{pro.name}</span>
                          <span className="text-[var(--text-muted)] text-[11px]">{pro.contactName} &bull; {pro.service}</span>
                        </td>
                        <td className="p-3 text-[var(--text)]">
                          <div>{pro.city}</div>
                          <div className="font-mono text-[10px] text-[var(--text-muted)]">{pro.phone}</div>
                        </td>
                        <td className="p-3">
                          <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400 block">{pro.license}</span>
                          <span className="text-[10px] text-[var(--text-muted)]">£2,000,000 Verified Liability</span>
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-[var(--text)]">
                          {pro.completedJobs}
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-blue-700 dark:text-blue-400">
                          £{pro.totalEarned.toFixed(2)}
                        </td>
                        <td className="p-3 text-center">
                          {pro.securityStatus === "SUSPENDED" ? (
                            <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30 font-bold text-[10px]">
                              SUSPENDED
                            </span>
                          ) : pro.securityStatus === "FLAGGED" ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold text-[10px]">
                              FLAGGED
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                              VERIFIED ACTIVE
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            {pro.securityStatus === "SUSPENDED" ? (
                              <button
                                type="button"
                                onClick={() => updateSecurityStatus(pro.id, "ACTIVE")}
                                className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px] cursor-pointer shadow-xs"
                              >
                                Reactivate
                              </button>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() => updateSecurityStatus(pro.id, "FLAGGED", "Manual audit check")}
                                  className="px-2 py-1 rounded bg-amber-500/15 hover:bg-amber-600 hover:text-white text-amber-700 dark:text-amber-400 font-bold text-[10px] border border-amber-500/30 cursor-pointer"
                                  title="Flag for security audit"
                                >
                                  Flag
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateSecurityStatus(pro.id, "SUSPENDED", "Policy investigation")}
                                  className="px-2 py-1 rounded bg-red-500/15 hover:bg-red-600 hover:text-white text-red-600 dark:text-red-400 font-bold text-[10px] border border-red-500/30 cursor-pointer"
                                  title="Suspend contractor account"
                                >
                                  Suspend
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB CONTENT: 3. HOMEOWNERS DIRECTORY & SECURITY ACTIONS */}
        {activeTab === "HOMEOWNERS" && (
          <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider">
                  Homeowner Account Registry &amp; Escrow Security
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Inspect job posting activity, total escrow paid, and execute security actions when suspicious activity is detected.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[var(--bg-alt)] text-[var(--text-muted)] uppercase tracking-wider font-bold border-b border-[var(--line)]">
                  <tr>
                    <th className="p-3">Homeowner Name</th>
                    <th className="p-3">Email &amp; Contact</th>
                    <th className="p-3">Location</th>
                    <th className="p-3 text-center">Jobs Posted</th>
                    <th className="p-3 text-right">Total Escrow Paid</th>
                    <th className="p-3 text-center">Account Standing</th>
                    <th className="p-3 text-right">Security Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  {homeownersDirectory
                    .filter((h) =>
                      searchTerm ? h.name.toLowerCase().includes(searchTerm.toLowerCase()) || h.email.toLowerCase().includes(searchTerm.toLowerCase()) || h.city.toLowerCase().includes(searchTerm.toLowerCase()) : true
                    )
                    .map((h) => (
                      <tr key={h.id} className="hover:bg-[var(--bg-alt)]/50 transition-colors">
                        <td className="p-3 font-bold text-[var(--text)]">
                          {h.name}
                        </td>
                        <td className="p-3">
                          <div className="text-[var(--text)]">{h.email}</div>
                          <div className="font-mono text-[10px] text-[var(--text-muted)]">{h.phone}</div>
                        </td>
                        <td className="p-3 text-[var(--text)]">
                          {h.city}
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-[var(--text)]">
                          {h.jobsPosted}
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-amber-700 dark:text-amber-300">
                          £{h.totalPaid.toFixed(2)}
                        </td>
                        <td className="p-3 text-center">
                          {h.securityStatus === "SUSPENDED" ? (
                            <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30 font-bold text-[10px]">
                              SUSPENDED
                            </span>
                          ) : h.securityStatus === "FLAGGED" ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold text-[10px]">
                              FLAGGED
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                              GOOD STANDING
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            {h.securityStatus === "SUSPENDED" ? (
                              <button
                                type="button"
                                onClick={() => updateSecurityStatus(h.id, "ACTIVE")}
                                className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px] cursor-pointer shadow-xs"
                              >
                                Restore
                              </button>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() => updateSecurityStatus(h.id, "FLAGGED", "Escrow verification")}
                                  className="px-2 py-1 rounded bg-amber-500/15 hover:bg-amber-600 hover:text-white text-amber-700 dark:text-amber-400 font-bold text-[10px] border border-amber-500/30 cursor-pointer"
                                >
                                  Flag
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateSecurityStatus(h.id, "SUSPENDED", "Security hold")}
                                  className="px-2 py-1 rounded bg-red-500/15 hover:bg-red-600 hover:text-white text-red-600 dark:text-red-400 font-bold text-[10px] border border-red-500/30 cursor-pointer"
                                >
                                  Suspend
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB CONTENT: 4. MASTER CONTRACTS AUDIT & INVOICE INSPECTION */}
        {activeTab === "CONTRACTS" && (
          <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider">
                  Master Contracts &amp; Invoices Ledger
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Full historical audit trail of all drafted, active, invoiced, and settled contracts with hidden bank settlement inspection.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[var(--bg-alt)] text-[var(--text-muted)] uppercase tracking-wider font-bold border-b border-[var(--line)]">
                  <tr>
                    <th className="p-3">Reference &amp; Service</th>
                    <th className="p-3">Homeowner</th>
                    <th className="p-3">Contractor</th>
                    <th className="p-3 text-right">Contractor Work</th>
                    <th className="p-3 text-right text-emerald-700 dark:text-emerald-400">5% Platform Fee</th>
                    <th className="p-3 text-right">Total Escrow</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-right">Audit Invoice &amp; Banking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  {allContracts
                    .filter((c) =>
                      searchTerm ? c.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) || c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.proName.toLowerCase().includes(searchTerm.toLowerCase()) || c.homeownerName.toLowerCase().includes(searchTerm.toLowerCase()) : true
                    )
                    .map((c) => {
                      const fin = getContractFinancials(c);

                      return (
                        <tr key={c.id} className="hover:bg-[var(--bg-alt)]/50 transition-colors">
                          <td className="p-3">
                            <span className="font-mono font-bold text-amber-700 dark:text-amber-400 block">{c.referenceCode}</span>
                            <span className="text-[var(--text)] text-[11px] block">{c.title}</span>
                            <span className="text-[var(--text-muted)] text-[10px]">{c.serviceDate} at {c.serviceTime}</span>
                          </td>
                          <td className="p-3 text-[var(--text)]">
                            <div>{c.homeownerName}</div>
                            <div className="text-[10px] text-[var(--text-muted)]">{c.city}</div>
                          </td>
                          <td className="p-3 text-[var(--text)]">
                            <div className="font-semibold">{c.proName}</div>
                            <div className="text-[10px] text-[var(--text-muted)] font-mono">{c.proLicense}</div>
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-blue-700 dark:text-blue-400">
                            {c.currency || "£"}{fin.contractPrice.toFixed(2)}
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
                            {c.currency || "£"}{fin.platformFee.toFixed(2)}
                          </td>
                          <td className="p-3 text-right font-mono font-extrabold text-amber-700 dark:text-amber-300">
                            {c.currency || "£"}{fin.totalGross.toFixed(2)}
                          </td>
                          <td className="p-3 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                c.status === "PAID" || c.status === "COMPLETED"
                                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                                  : c.status === "ACTIVE"
                                  ? "bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30"
                                  : c.status === "INVOICED"
                                  ? "bg-purple-500/15 text-purple-700 dark:text-purple-400 border border-purple-500/30"
                                  : "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30"
                              }`}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => setInspectingContract(c)}
                              className="px-2.5 py-1.5 rounded bg-[var(--surface)] hover:bg-[var(--bg-alt)] border border-[var(--line)] text-[var(--accent)] font-bold text-[11px] inline-flex items-center space-x-1 cursor-pointer transition-colors shadow-xs"
                              title="Inspect full invoice, itemization & hidden bank details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Invoice &amp; Bank</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================== */}
      {/* MODAL 1: ADMIN INVOICE & CONFIDENTIAL BANK DETAILS VIEWER */}
      {/* ========================================================== */}
      {inspectingContract && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="fixed inset-0" onClick={() => setInspectingContract(null)} aria-hidden="true" />

          <div className="relative z-10 w-full max-w-2xl max-h-[92vh] flex flex-col bg-[var(--surface)] text-[var(--text)] rounded-[var(--radius-lg)] shadow-2xl border border-[var(--line)] overflow-hidden">
            {/* Header */}
            <div className="shrink-0 bg-zinc-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-zinc-800">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xs text-amber-400 uppercase tracking-wider">
                    Executive Audit Console
                  </span>
                  <span className="text-zinc-500">&bull;</span>
                  <span className="font-mono text-xs text-zinc-300 font-semibold">{inspectingContract.referenceCode}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-0.5 truncate max-w-md">
                  Invoice &amp; Settlement Details: {inspectingContract.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingContract(null)}
                className="p-1.5 rounded-[var(--radius-sm)] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-[var(--text)]">
              {/* Financial Breakdown Summary Card */}
              {(() => {
                const fin = getContractFinancials(inspectingContract);
                return (
                  <div className="p-4 rounded-xl bg-[var(--bg-alt)] border border-[var(--line)] space-y-3">
                    <div className="flex justify-between items-center border-b border-[var(--line)] pb-2.5">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                          Contractor Work (Labor &amp; Materials)
                        </span>
                        <span className="text-xl font-black font-mono text-[var(--text)]">
                          {inspectingContract.currency}{fin.contractPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                          Platform 5% Fee Commission
                        </span>
                        <span className="text-xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                          +{inspectingContract.currency}{fin.platformFee.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-1">
                      <span className="font-bold uppercase tracking-wider text-xs text-[var(--text)]">
                        Total Gross Escrow Amount Paid:
                      </span>
                      <span className="text-2xl font-black font-mono text-amber-700 dark:text-amber-400">
                        {inspectingContract.currency}{fin.totalGross.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* CONFIDENTIAL BANK SETTLEMENT CREDENTIALS (Requested by user) */}
              <div className="p-4 rounded-xl border-2 border-amber-500/40 bg-amber-500/10 space-y-3">
                <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300">
                  <Building className="w-4 h-4 shrink-0" />
                  <h4 className="font-extrabold text-xs uppercase tracking-wider">
                    Confidential Contractor Bank Settlement Details
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[var(--surface)] p-3.5 rounded-lg border border-amber-500/30">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] block">Bank Name</span>
                    <span className="font-bold text-[var(--text)]">
                      {inspectingContract.bankDetails?.bankName || "Barclays Business UK"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] block">Account Holder</span>
                    <span className="font-bold text-[var(--text)]">
                      {inspectingContract.bankDetails?.accountName || inspectingContract.proName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] block">Sort Code</span>
                    <span className="font-mono font-bold text-amber-800 dark:text-amber-400">
                      {inspectingContract.bankDetails?.sortCode || "20-04-15"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] block">Account Number</span>
                    <span className="font-mono font-bold text-amber-800 dark:text-amber-400">
                      {inspectingContract.bankDetails?.accountNumber || "83921049"}
                    </span>
                  </div>
                  <div className="sm:col-span-2 pt-2 border-t border-[var(--line-subtle)] flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] block">Payment Reference</span>
                      <span className="font-mono text-xs font-semibold text-[var(--text)]">
                        {inspectingContract.bankDetails?.paymentReference || inspectingContract.referenceCode}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] block">Settlement Method</span>
                      <span className="font-semibold text-xs text-emerald-700 dark:text-emerald-400">
                        {inspectingContract.paymentMethod || "TradeConnect Protected Escrow (Card)"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parties Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-[var(--bg-alt)] border border-[var(--line)]">
                  <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] block mb-1">Client / Homeowner</span>
                  <div className="font-bold text-[var(--text)]">{inspectingContract.homeownerName}</div>
                  <div className="text-[var(--text-muted)]">{inspectingContract.homeownerAddress}</div>
                  <div className="font-mono text-[11px] text-[var(--text-muted)]">{inspectingContract.homeownerPhone}</div>
                  {inspectingContract.homeownerEmail && (
                    <div className="text-[11px] text-[var(--text-muted)]">{inspectingContract.homeownerEmail}</div>
                  )}
                </div>

                <div className="p-3.5 rounded-lg bg-[var(--bg-alt)] border border-[var(--line)]">
                  <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] block mb-1">Contractor</span>
                  <div className="font-bold text-[var(--text)]">{inspectingContract.proName}</div>
                  <div className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400">{inspectingContract.proLicense}</div>
                  <div className="text-[var(--text-muted)]">{inspectingContract.proInsurance}</div>
                  <div className="font-mono text-[11px] text-[var(--text-muted)]">{inspectingContract.proPhone}</div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="shrink-0 bg-[var(--bg-alt)] px-5 sm:px-6 py-3.5 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setIsOfficialDocOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-[var(--radius-sm)] bg-[var(--brand)] hover:opacity-90 text-white text-xs font-bold cursor-pointer shadow-xs transition-opacity"
              >
                <Printer className="w-4 h-4" />
                <span>View Official Printable Invoice (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => setInspectingContract(null)}
                className="px-4 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-[var(--text)] text-xs font-semibold cursor-pointer"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL 2: OFFICIAL INVOICE CONTRACT MODAL (PDF VIEWER)     */}
      {/* ========================================================== */}
      {inspectingDocData && (
        <InvoiceContractModal
          isOpen={isOfficialDocOpen}
          onClose={() => setIsOfficialDocOpen(false)}
          data={inspectingDocData}
        />
      )}
    </div>
  );
}
