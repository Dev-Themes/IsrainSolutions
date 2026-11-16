"use client";

import * as React from "react";
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  FileText,
  Star,
  MapPin,
  Clock,
  Check,
  Award,
  Send,
  AlertCircle,
  AlertTriangle,
  Edit3,
  Trash2,
  Settings,
  Printer,
  Lock,
  Globe,
  Car,
  Save,
} from "lucide-react";
import { CITIES, CATEGORIES } from "@/lib/data";
import {
  InvoiceContractModal,
  InvoiceContractData,
} from "@/components/documents/invoice-contract-document";
import { NegotiationModal } from "@/components/chat/negotiation-modal";
import { useAuth } from "@/lib/auth-context";
import {
  useContractStore,
  JobContract,
  getContractorEarnings,
} from "@/lib/contract-store";
import { DraftContractModal } from "@/components/contracts/draft-contract-modal";
import { ContractorInvoiceModal } from "@/components/contracts/contractor-invoice-modal";
import { useJobStore, QuoteProposal } from "@/lib/job-store";
import { DeleteAccountModal } from "@/components/auth/delete-account-modal";

interface OpenLead {
  id: string;
  referenceCode: string;
  service: string;
  title: string;
  city: string;
  country: "UK" | "US";
  location: string;
  distance: string;
  datePosted: string;
  urgency: "Emergency" | "Within 48 Hours" | "Flexible";
  homeownerName: string;
  description: string;
  estimatedBudget: string;
  quotesReceivedCount: number;
  myQuote?: {
    price: string;
    timeline: string;
    notes: string;
    submittedAt: string;
  };
}

interface ActiveContract {
  id: string;
  referenceCode: string;
  service: string;
  title: string;
  homeownerName: string;
  homeownerPhone: string;
  address: string;
  city?: string;
  agreedPrice: string;
  startDate: string;
  status: "SCHEDULED" | "ON_SITE" | "IN_PROGRESS";
  notes: string;
}

interface CompletedContract {
  id: string;
  referenceCode: string;
  service: string;
  title: string;
  homeownerName: string;
  completedDate: string;
  settledAmount: string;
  paymentStatus: "PAID" | "SETTLED_ESCROW";
  invoiceNumber: string;
  homeownerReview?: {
    author: string;
    rating: number;
    date: string;
    comment: string;
  };
}

export const INITIAL_OPEN_LEADS: OpenLead[] = [];
export const INITIAL_ACTIVE_CONTRACTS: ActiveContract[] = [];
export const INITIAL_COMPLETED_CONTRACTS: CompletedContract[] = [];

const emptySubscribe = () => () => {};
function useIsClient() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function ContractorDashboardPage() {
  const { user, updateUser } = useAuth();
  const { contracts: storeContracts } = useContractStore();
  const { jobs: marketplaceJobs, updateJob } = useJobStore();
  const mounted = useIsClient();
  const earningsData = React.useMemo(() => getContractorEarnings("pro_uk_1", storeContracts), [storeContracts]);

  const [activeTab, setActiveTab] = React.useState<"LEADS" | "ACTIVE" | "EARNED" | "HISTORY" | "PROFILE">("LEADS");
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = React.useState(false);
  const [profileSavedMsg, setProfileSavedMsg] = React.useState(false);

  // Contractor Profile & Coverage Area State
  const [companyName, setCompanyName] = React.useState(user?.name || "Apex Heating & Emergency Plumbing Ltd");
  const [leadEngineer, setLeadEngineer] = React.useState("David Thornton (Lead Engineer)");
  const [proPhone, setProPhone] = React.useState(user?.phone || "+44 20 7946 0912");
  const proEmail = user?.email || "apex.heating@tradeconnect.co.uk";
  const [homeBaseCity, setHomeBaseCity] = React.useState<string>(user?.city || "London");
  const [additionalCoverageCities, setAdditionalCoverageCities] = React.useState<string[]>([
    "Manchester",
    "Birmingham",
  ]);
  const [offeredServices, setOfferedServices] = React.useState<string[]>([
    "Emergency Plumbing",
    "Gas & Boiler Engineers",
    "Central Heating",
    "Certified Electricians",
  ]);
  const [coverageRadius, setCoverageRadius] = React.useState("London & Greater South East (Base: London)");
  const [hourlyRate, setHourlyRate] = React.useState("£75 / hr");
  const [calloutFee, setCalloutFee] = React.useState("£45");

  const handleSaveProProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: companyName,
      phone: proPhone,
      city: homeBaseCity,
    });
    setProfileSavedMsg(true);
    setTimeout(() => setProfileSavedMsg(false), 3000);
  };

  // Convert real Neon DB marketplace jobs into contractor open leads (filter out completed / contracted)
  const leads: OpenLead[] = React.useMemo(() => {
    return marketplaceJobs
      .filter((j) => {
        // Only open quoting status
        if (j.status !== "QUOTING") return false;
        // Exclude jobs where the homeowner has contracted with someone (accepted proposal)
        if (j.proposals.some((p) => p.status === "ACCEPTED")) return false;
        // Exclude jobs that have active, invoiced, or completed contracts
        const hasActiveContract = storeContracts.some(
          (c) => c.referenceCode === j.referenceCode && c.status !== "DRAFT"
        );
        if (hasActiveContract) return false;
        return true;
      })
      .map((j) => {
        const myExistingProposal = j.proposals.find(
          (p) => p.proId === "pro_uk_1" || p.proName === companyName
        );
        const isUrgent = j.urgency === "Emergency" ? "Emergency" : j.urgency === "Within 48 hours" ? "Within 48 Hours" : "Flexible";
        return {
          id: j.id,
          referenceCode: j.referenceCode,
          service: j.service,
          title: j.title,
          city: j.city || "London",
          country: j.country || "UK",
          location: j.location,
          distance: j.city === homeBaseCity ? "Local (Base City)" : "Extended Coverage Area",
          datePosted: j.datePosted,
          urgency: isUrgent,
          homeownerName: j.homeownerName,
          description: j.description || `${j.service} requested by customer at ${j.location}.`,
          estimatedBudget: j.finalCost || "Quote Required",
          quotesReceivedCount: j.proposals.length,
          myQuote: myExistingProposal
            ? {
                price: myExistingProposal.price,
                timeline: "Immediate dispatch",
                notes: myExistingProposal.notes,
                submittedAt: "Submitted",
              }
            : undefined,
        };
      });
  }, [marketplaceJobs, storeContracts, companyName, homeBaseCity]);

  // Dynamic on-site status toggle overrides
  const [onSiteOverrides, setOnSiteOverrides] = React.useState<Record<string, "SCHEDULED" | "ON_SITE">>({});

  // Derive active and completed contracts from real database store contracts
  const activeContracts: ActiveContract[] = React.useMemo(() => {
    return storeContracts
      .filter((c) => c.status === "ACTIVE" || c.status === "INVOICED")
      .map((c) => ({
        id: c.id,
        referenceCode: c.referenceCode,
        service: c.service,
        title: c.title,
        homeownerName: c.homeownerName,
        homeownerPhone: c.homeownerPhone,
        address: c.homeownerAddress || c.location,
        city: c.city,
        agreedPrice: c.agreedPrice,
        startDate: `${c.serviceDate} (${c.serviceTime})`,
        status: onSiteOverrides[c.id] || (c.status === "INVOICED" ? "ON_SITE" : "SCHEDULED"),
        notes: c.notes || "",
      }));
  }, [storeContracts, onSiteOverrides]);

  const completedContracts: CompletedContract[] = React.useMemo(() => {
    const fromContracts = storeContracts
      .filter((c) => c.status === "PAID" || c.status === "COMPLETED")
      .map((c) => {
        const jobMatch = marketplaceJobs.find((j) => j.referenceCode === c.referenceCode);
        const resolvedReview = c.review || (jobMatch?.reviewLeft ? {
          author: c.homeownerName || "Homeowner",
          rating: jobMatch.reviewLeft.rating,
          date: jobMatch.completedDate || c.serviceDate,
          comment: jobMatch.reviewLeft.comment,
        } : undefined);

        return {
          id: c.id,
          referenceCode: c.referenceCode,
          service: c.service,
          title: c.title,
          homeownerName: c.homeownerName,
          completedDate: c.invoicePaidAt?.split(",")[0] || c.serviceDate,
          settledAmount: c.agreedPrice,
          paymentStatus: "PAID" as const,
          invoiceNumber: c.invoiceNumber || `INV-${c.referenceCode}`,
          homeownerReview: resolvedReview,
        };
      });

    const fromJobs = marketplaceJobs
      .filter((j) => j.status === "COMPLETED" && !fromContracts.some((c) => c.referenceCode === j.referenceCode))
      .map((j) => ({
        id: j.id,
        referenceCode: j.referenceCode,
        service: j.service,
        title: j.title,
        homeownerName: j.homeownerName,
        completedDate: j.completedDate || "Recently Completed",
        settledAmount: j.finalCost || "£145.00",
        paymentStatus: "PAID" as const,
        invoiceNumber: `INV-${j.referenceCode}`,
        homeownerReview: j.reviewLeft ? {
          author: j.homeownerName || "Homeowner",
          rating: j.reviewLeft.rating,
          date: j.completedDate || "Recently",
          comment: j.reviewLeft.comment,
        } : undefined,
      }));

    return [...fromContracts, ...fromJobs];
  }, [storeContracts, marketplaceJobs]);

  // Pro Verification Requirement: Must complete at least 10 contracts successfully AND have rating > 4.0
  const proCompletedCount = completedContracts.length;
  const proReviews = React.useMemo(() => {
    return completedContracts
      .map((c) => c.homeownerReview)
      .filter((r): r is NonNullable<typeof r> => Boolean(r));
  }, [completedContracts]);

  const proAverageRating = React.useMemo(() => {
    if (proReviews.length === 0) return 0;
    const sum = proReviews.reduce((acc, r) => acc + r.rating, 0);
    return Number((sum / proReviews.length).toFixed(2));
  }, [proReviews]);

  const safeProCount = mounted ? proCompletedCount : 0;
  const safeProRating = mounted ? proAverageRating : 0;
  const safeIsProVerified = safeProCount >= 10 && safeProRating > 4.0;

  // Draft and Invoicing Modals State
  const [draftingContract, setDraftingContract] = React.useState<JobContract | null>(null);
  const [isDraftModalOpen, setIsDraftModalOpen] = React.useState(false);
  const [invoicingContract, setInvoicingContract] = React.useState<JobContract | null>(null);
  const [isInvoicingModalOpen, setIsInvoicingModalOpen] = React.useState(false);

  // Territory filter for Job Board
  const [territoryFilter, setTerritoryFilter] = React.useState<"ALL" | "BASE" | "EXPANDED">("ALL");

  // Document & Negotiation Modals State
  const [selectedDocData, setSelectedDocData] = React.useState<InvoiceContractData | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = React.useState(false);
  const [activeNegotiation, setActiveNegotiation] = React.useState<{
    jobId: string;
    referenceCode: string;
    jobTitle: string;
    homeownerName: string;
    currentPrice: string;
  } | null>(null);

  // Quote Submission / Edit State
  const [quotingLeadId, setQuotingLeadId] = React.useState<string | null>(null);
  const [quotePrice, setQuotePrice] = React.useState<string>("");
  const [quoteTimeline, setQuoteTimeline] = React.useState<string>("");
  const [quoteNotes, setQuoteNotes] = React.useState<string>("");

  const filteredLeads = leads.filter((lead) => {
    if (territoryFilter === "BASE") {
      return lead.city === homeBaseCity;
    }
    if (territoryFilter === "EXPANDED") {
      return additionalCoverageCities.includes(lead.city);
    }
    return true; // "ALL" shows all leads across the country
  });

  const handleOpenActiveContractDoc = (contract: ActiveContract) => {
    const matched = storeContracts.find((c) => c.referenceCode === contract.referenceCode);
    const resolvedPrice = matched?.agreedPrice || contract.agreedPrice;
    const docData: InvoiceContractData = {
      documentType: "CONTRACT",
      documentNumber: `CNT-${contract.referenceCode.replace("TC-", "2026-")}`,
      issueDate: matched?.datePosted || contract.startDate.split(" ")[0],
      referenceCode: contract.referenceCode,
      jobTitle: matched?.title || contract.title,
      serviceCategory: matched?.service || contract.service,
      location: matched?.location || contract.address,
      agreedPrice: resolvedPrice,
      labourAmount: matched?.labourAmount,
      materialsAmount: matched?.materialsAmount,
      totalAmount: matched?.totalAmount,
      paymentStatus: "CONTRACT ACTIVE",
      paymentMethod: matched?.paymentMethod || "TradeConnect Protected Milestone Escrow",
      providedServices: matched?.providedServices,
      providedEquipments: matched?.providedEquipments,
      serviceDateTime: matched?.serviceDate ? `${matched.serviceDate} (${matched.serviceTime})` : contract.startDate,
      warrantyPeriod: matched?.warrantyPeriod,
      homeownerSignature: matched?.homeownerSignature,
      notes: matched?.notes || contract.notes,
      homeowner: {
        name: matched?.homeownerName || contract.homeownerName,
        phone: matched?.homeownerPhone || contract.homeownerPhone,
        address: matched?.homeownerAddress || contract.address,
        email: matched?.homeownerEmail,
      },
      contractor: {
        companyName,
        contactName: leadEngineer,
        licenseNumber: "Gas Safe Reg #592104 &bull; NICEIC #D94812",
        insuranceAmount: "£5,000,000",
        baseCity: `${homeBaseCity} (Primary Base)`,
        phone: "+44 20 7946 0812",
      },
    };
    setSelectedDocData(docData);
    setIsDocModalOpen(true);
  };

  const handleOpenCompletedInvoiceDoc = (comp: CompletedContract) => {
    const matched = storeContracts.find((c) => c.referenceCode === comp.referenceCode);
    const resolvedPrice = matched?.agreedPrice || comp.settledAmount;
    const docData: InvoiceContractData = {
      documentType: "INVOICE",
      documentNumber: matched?.invoiceNumber || comp.invoiceNumber,
      issueDate: matched?.invoiceIssuedAt?.split(",")[0] || comp.completedDate,
      completionDate: matched?.invoicePaidAt?.split(",")[0] || comp.completedDate,
      referenceCode: comp.referenceCode,
      jobTitle: matched?.title || comp.title,
      serviceCategory: matched?.service || comp.service,
      location: matched?.location || `${comp.homeownerName} Residence`,
      agreedPrice: resolvedPrice,
      labourAmount: matched?.labourAmount,
      materialsAmount: matched?.materialsAmount,
      subtotalAmount: matched?.subtotalAmount,
      vatRate: matched?.vatRate ?? 20,
      vatAmount: matched?.vatAmount,
      vatNumber: matched?.vatNumber ?? "GB 948 2014 92",
      totalAmount: matched?.totalAmount,
      bankDetails: matched?.bankDetails,
      invoiceIssuedAt: matched?.invoiceIssuedAt,
      invoicePaidAt: matched?.invoicePaidAt || comp.completedDate,
      paymentStatus: "PAID IN FULL",
      paymentMethod: matched?.paymentMethod || "Settled via TradeConnect Escrow Transfer",
      providedServices: matched?.providedServices,
      providedEquipments: matched?.providedEquipments,
      serviceDateTime: matched?.serviceDate ? `${matched.serviceDate} (${matched.serviceTime})` : undefined,
      warrantyPeriod: matched?.warrantyPeriod,
      homeownerSignature: matched?.homeownerSignature,
      homeowner: {
        name: matched?.homeownerName || comp.homeownerName,
        phone: "+44 20 7946 0812",
        address: matched?.homeownerAddress || "Fulham, London",
        email: matched?.homeownerEmail,
      },
      contractor: {
        companyName,
        contactName: leadEngineer,
        licenseNumber: "Gas Safe Reg #592104 &bull; NICEIC #D94812",
        insuranceAmount: "£5,000,000",
        baseCity: `${homeBaseCity} (Primary Base)`,
        phone: "+44 20 7946 0812",
      },
    };
    setSelectedDocData(docData);
    setIsDocModalOpen(true);
  };

  const handleNegotiationAgreed = async (newPrice: string) => {
    if (!activeNegotiation) return;
    const targetJob = marketplaceJobs.find(
      (j) => j.id === activeNegotiation.jobId || j.referenceCode === activeNegotiation.referenceCode
    );
    if (!targetJob) return;

    const updatedProposals = targetJob.proposals.map((p) => {
      if (p.proId === "pro_uk_1" || p.proName === companyName) {
        return {
          ...p,
          price: newPrice,
          notes: `${p.notes} [Negotiated counter accepted: ${newPrice}]`,
        };
      }
      return p;
    });

    await updateJob(targetJob.referenceCode, {
      proposals: updatedProposals,
    });
  };

  const handleOpenQuoteModal = (lead: OpenLead) => {
    setQuotingLeadId(lead.id);
    if (lead.myQuote) {
      setQuotePrice(lead.myQuote.price);
      setQuoteTimeline(lead.myQuote.timeline);
      setQuoteNotes(lead.myQuote.notes);
    } else {
      setQuotePrice("");
      setQuoteTimeline("Can attend within 1 hour");
      setQuoteNotes("Fully equipped van with parts in stock. Certified Gas Safe & insured.");
    }
  };

  const handleRetractQuote = async (leadId: string, referenceCode: string) => {
    if (confirm(`Withdraw your submitted quote for job ${referenceCode}?`)) {
      const targetJob = marketplaceJobs.find((j) => j.id === leadId || j.referenceCode === referenceCode);
      if (targetJob) {
        const updatedProposals = targetJob.proposals.filter((p) => p.proId !== "pro_uk_1" && p.proName !== companyName);
        await updateJob(targetJob.referenceCode, {
          proposals: updatedProposals,
        });
      }
      alert("Quote proposal successfully withdrawn.");
    }
  };

  const handleConfirmQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quotingLeadId) return;

    const targetJob = marketplaceJobs.find((j) => j.id === quotingLeadId || j.referenceCode === quotingLeadId);
    if (targetJob) {
      const formattedPrice = quotePrice.startsWith("£") || quotePrice.startsWith("$") ? quotePrice : `£${quotePrice}`;
      const newProposal: QuoteProposal = {
        proId: "pro_uk_1",
        proName: companyName,
        rating: 4.96,
        phone: "+44 20 7946 0812",
        price: formattedPrice,
        notes: quoteNotes,
        status: "PENDING",
      };

      const updatedProposals = [
        ...targetJob.proposals.filter((p) => p.proId !== "pro_uk_1" && p.proName !== companyName),
        newProposal,
      ];

      await updateJob(targetJob.referenceCode, {
        proposals: updatedProposals,
      });
    }

    setQuotingLeadId(null);
    alert("Quote submitted to homeowner! You will receive notification when the homeowner accepts.");
  };

  const handleToggleOnSite = (contractId: string) => {
    setOnSiteOverrides((prev) => ({
      ...prev,
      [contractId]: prev[contractId] === "ON_SITE" ? "SCHEDULED" : "ON_SITE",
    }));
  };

  const handleOpenDraftFromLead = (lead: OpenLead) => {
    const matched = storeContracts.find((c) => c.referenceCode === lead.referenceCode);
    const contractToDraft: JobContract = matched || {
      id: `cnt_${lead.id}`,
      referenceCode: lead.referenceCode,
      service: lead.service,
      title: lead.title,
      location: lead.location,
      city: lead.city,
      country: lead.country,
      urgency: lead.urgency,
      datePosted: lead.datePosted,
      homeownerId: "usr_homeowner_1",
      homeownerName: lead.homeownerName,
      homeownerPhone: "+44 20 7946 0812",
      homeownerEmail: "sarah.jenkins@example.co.uk",
      homeownerAddress: lead.location,
      proId: "pro_uk_1",
      proSlug: "apex-plumbing-heating-london",
      proName: companyName,
      proPhone: "+44 20 7946 0812",
      proEmail: "david@apexplumbing.co.uk",
      proLicense: "Gas Safe Register #592104",
      proInsurance: "£5,000,000 Direct Line Public Liability",
      proCity: homeBaseCity,
      status: "DRAFT",
      agreedPrice: lead.myQuote?.price || "£145.00",
      currency: "£",
      priceNumeric: parseFloat((lead.myQuote?.price || "145").replace(/[^0-9.]/g, "")) || 145,
      providedServices: [
        "Full initial fault diagnosis & system pressure isolation",
        "Replacement of damaged pipework / component to trade standard",
        "Final pressure test, leak check and handover sign-off",
      ],
      providedEquipments: [
        "Certified trade replacement parts and compression fittings",
        "Standard high-spec trade consumables",
      ],
      serviceDate: "17 Nov 2026",
      serviceTime: "09:30 AM",
      warrantyPeriod: "12 Months Workmanship Guarantee",
      notes: lead.myQuote?.notes || "Final terms agreed following negotiation.",
    };
    setDraftingContract(contractToDraft);
    setIsDraftModalOpen(true);
  };

  const handlePreviewDraftPdf = (contract: JobContract) => {
    const docData: InvoiceContractData = {
      documentType: "DRAFT_CONTRACT",
      documentNumber: `DFT-${contract.referenceCode.replace("TC-", "2026-")}`,
      issueDate: contract.datePosted || "16 Nov 2026",
      referenceCode: contract.referenceCode,
      jobTitle: contract.title,
      serviceCategory: contract.service,
      location: contract.location,
      agreedPrice: contract.agreedPrice,
      paymentStatus: "DRAFT PENDING APPROVAL",
      paymentMethod: "TradeConnect Protected Milestone Escrow",
      providedServices: contract.providedServices,
      providedEquipments: contract.providedEquipments,
      serviceDateTime: `${contract.serviceDate} (${contract.serviceTime})`,
      warrantyPeriod: contract.warrantyPeriod,
      notes: contract.notes,
      homeowner: {
        name: contract.homeownerName,
        phone: contract.homeownerPhone,
        address: contract.homeownerAddress,
        email: contract.homeownerEmail,
      },
      contractor: {
        companyName: contract.proName,
        contactName: leadEngineer,
        licenseNumber: contract.proLicense,
        insuranceAmount: contract.proInsurance,
        baseCity: contract.proCity,
        phone: contract.proPhone,
        email: contract.proEmail,
      },
    };
    setSelectedDocData(docData);
    setIsDocModalOpen(true);
  };

  const handleOpenStoreContractDoc = (c: JobContract) => {
    const isPaid = c.status === "PAID" || c.status === "COMPLETED";
    const docData: InvoiceContractData = {
      documentType: isPaid ? "INVOICE" : c.status === "DRAFT" || c.status === "PENDING_APPROVAL" ? "DRAFT_CONTRACT" : "CONTRACT",
      documentNumber: isPaid ? (c.invoiceNumber || `INV-${c.referenceCode}`) : `CNT-${c.referenceCode}`,
      issueDate: c.invoiceIssuedAt?.split(",")[0] || c.datePosted,
      completionDate: c.invoicePaidAt?.split(",")[0],
      referenceCode: c.referenceCode,
      jobTitle: c.title,
      serviceCategory: c.service,
      location: c.location,
      agreedPrice: c.agreedPrice,
      labourAmount: c.labourAmount,
      materialsAmount: c.materialsAmount,
      totalAmount: c.totalAmount,
      paymentStatus: isPaid ? "PAID IN FULL" : c.status === "ACTIVE" ? "CONTRACT ACTIVE" : "DRAFT PENDING APPROVAL",
      paymentMethod: c.paymentMethod || "TradeConnect Protected Escrow",
      providedServices: c.providedServices,
      providedEquipments: c.providedEquipments,
      serviceDateTime: `${c.serviceDate} (${c.serviceTime})`,
      warrantyPeriod: c.warrantyPeriod,
      homeownerSignature: c.homeownerSignature,
      notes: c.notes,
      homeowner: {
        name: c.homeownerName,
        phone: c.homeownerPhone,
        address: c.homeownerAddress,
        email: c.homeownerEmail,
      },
      contractor: {
        companyName: c.proName,
        contactName: leadEngineer,
        licenseNumber: c.proLicense,
        insuranceAmount: c.proInsurance,
        baseCity: c.proCity,
        phone: c.proPhone,
        email: c.proEmail,
      },
    };
    setSelectedDocData(docData);
    setIsDocModalOpen(true);
  };

  const handleOpenIssueInvoice = (contract: ActiveContract) => {
    const matched = storeContracts.find((c) => c.referenceCode === contract.referenceCode);
    const resolvedPrice = matched?.agreedPrice || contract.agreedPrice;
    const cnt: JobContract = matched || {
      id: `cnt_${contract.id}`,
      referenceCode: contract.referenceCode,
      service: contract.service,
      title: contract.title,
      location: contract.address,
      city: contract.city || "London",
      country: "UK",
      urgency: "Standard",
      datePosted: "14 Nov 2026",
      homeownerId: "usr_homeowner_1",
      homeownerName: contract.homeownerName,
      homeownerPhone: contract.homeownerPhone,
      homeownerEmail: "sarah.jenkins@example.co.uk",
      homeownerAddress: contract.address,
      proId: "pro_uk_1",
      proSlug: "apex-plumbing-heating-london",
      proName: companyName,
      proPhone: "+44 20 7946 0812",
      proEmail: "david@apexplumbing.co.uk",
      proLicense: "Gas Safe #592104",
      proInsurance: "£5,000,000 Direct Line Public Liability",
      proCity: homeBaseCity,
      status: "ACTIVE",
      agreedPrice: resolvedPrice,
      currency: "£",
      priceNumeric: parseFloat(resolvedPrice.replace(/[^0-9.]/g, "")) || 520,
      providedServices: [
        "Primary trade installation & circuit isolation",
        "Full test and certification compliance",
      ],
      providedEquipments: [
        "10-way dual RCD metal consumer unit",
        "Surge Protection Device (SPD) and type A RCBOs",
      ],
      serviceDate: "16 Nov 2026",
      serviceTime: "08:30 AM",
      warrantyPeriod: "12 Months Workmanship Guarantee",
      notes: contract.notes,
    };
    setInvoicingContract(cnt);
    setIsInvoicingModalOpen(true);
  };

  return (
    <div className="section-light section-spacing">
      <div className="container-custom">
        {/* Top Contractor Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                Contractor Dashboard
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--pine-accent)]/15 text-[var(--pine-accent)]">
                Trade Professional
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Manage incoming job leads, track in-progress contracts, and view settled earnings.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setActiveTab("PROFILE")}
              className="p-2 px-3 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-[var(--text)] transition-colors cursor-pointer text-xs font-bold inline-flex items-center space-x-1.5 shadow-xs"
              title="Edit business profile, rates and compliance"
            >
              <Settings className="w-4 h-4 text-[var(--accent)]" />
              <span>Company Profile &amp; Settings</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8" suppressHydrationWarning>
          <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">
              Available Leads
            </div>
            <div className="text-2xl font-bold text-[var(--text)] mt-1 font-serif" suppressHydrationWarning>
              {leads.length}
            </div>
            <div className="text-[11px] text-[var(--accent)] font-semibold mt-0.5">
              Within 5 mile radius
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">
              Active Contracts
            </div>
            <div className="text-2xl font-bold text-[var(--text)] mt-1 font-serif" suppressHydrationWarning>
              {activeContracts.length}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
              Currently in progress
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">
              Completed Jobs
            </div>
            <div className="text-2xl font-bold text-[var(--text)] mt-1 font-serif" suppressHydrationWarning>
              {completedContracts.length}
            </div>
            <div className="text-[11px] text-[var(--pine-accent)] font-semibold mt-0.5">
              100% Verified Reviews
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">
              Verified Settlement
            </div>
            <div className="text-2xl font-bold text-[var(--text)] mt-1 font-serif" suppressHydrationWarning>
              {earningsData.currency}{earningsData.lifetimeTotal.toLocaleString()}
            </div>
            <div className="text-[11px] text-[var(--pine-accent)] font-semibold mt-0.5">
              {earningsData.completedContractsCount} paid contracts settled
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[var(--line)] mb-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("LEADS")}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "LEADS"
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            <span suppressHydrationWarning>Live Job Board & Leads ({leads.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ACTIVE")}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "ACTIVE"
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            <span suppressHydrationWarning>In-Progress Contracts ({activeContracts.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("EARNED")}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "EARNED"
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            <span suppressHydrationWarning>Earned Tab ({earningsData.currency}{earningsData.lifetimeTotal.toLocaleString()})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("HISTORY")}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "HISTORY"
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            <span suppressHydrationWarning>Contract History & Receipts ({completedContracts.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("PROFILE")}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "PROFILE"
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            Company Profile &amp; Security
          </button>
        </div>

        {/* TAB 1: LIVE JOB BOARD & LEADS */}
        {activeTab === "LEADS" && (
          <div className="space-y-4">
            {/* Territory Filter Controls */}
            <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-[var(--text)] block">
                    UK National Leads Board &middot; Contractor Radius Control
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Filter by your primary workshop base or expand to nationwide customer listings.
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[var(--pine-accent)] flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Verified Domestic Inquiries
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 border-t border-[var(--line-subtle)]">
                <button
                  type="button"
                  onClick={() => setTerritoryFilter("ALL")}
                  className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-bold transition-all cursor-pointer ${
                    territoryFilter === "ALL"
                      ? "bg-[var(--brand)] text-white shadow-xs"
                      : "bg-[var(--bg-alt)] text-[var(--text)] hover:bg-[var(--line)]"
                  }`}
                >
                  All UK Nationwide Leads ({leads.length})
                </button>

                <button
                  type="button"
                  onClick={() => setTerritoryFilter("BASE")}
                  className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-bold transition-all cursor-pointer ${
                    territoryFilter === "BASE"
                      ? "bg-[var(--brand)] text-white shadow-xs"
                      : "bg-[var(--bg-alt)] text-[var(--text)] hover:bg-[var(--line)]"
                  }`}
                >
                  My Base City Only ({homeBaseCity}) ({leads.filter((l) => l.city === homeBaseCity).length})
                </button>

                <button
                  type="button"
                  onClick={() => setTerritoryFilter("EXPANDED")}
                  className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-bold transition-all cursor-pointer ${
                    territoryFilter === "EXPANDED"
                      ? "bg-[var(--brand)] text-white shadow-xs"
                      : "bg-[var(--bg-alt)] text-[var(--text)] hover:bg-[var(--line)]"
                  }`}
                >
                  My Expanded Cities ({additionalCoverageCities.join(", ")}) (
                  {leads.filter((l) => additionalCoverageCities.includes(l.city)).length})
                </button>
              </div>
            </div>

            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--bg-alt)] text-[var(--text-muted)] font-mono">
                        {lead.referenceCode}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--brand-light)] text-[var(--brand)]">
                        {lead.service}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          lead.urgency === "Emergency"
                            ? "bg-red-500/15 text-red-600 dark:text-red-400 font-extrabold"
                            : "bg-[var(--bg-alt)] text-[var(--text-muted)]"
                        }`}
                      >
                        {lead.urgency}
                      </span>

                      {/* Travel & Radius Status Tag */}
                      {lead.city === homeBaseCity ? (
                        <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          <MapPin className="w-3 h-3 mr-1" />
                          Local Base ({lead.city})
                        </span>
                      ) : additionalCoverageCities.includes(lead.city) ? (
                        <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                          <Car className="w-3 h-3 mr-1" />
                          Expanded Coverage ({lead.city} - Travel Required)
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                          <Globe className="w-3 h-3 mr-1" />
                          Nationwide Lead ({lead.city} - Travel Required)
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[var(--text)]">
                      {lead.title}
                    </h3>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="text-xs text-[var(--text-muted)] block">
                      Homeowner Budget
                    </span>
                    <span className="text-sm font-bold text-[var(--text)] font-serif">
                      {lead.estimatedBudget}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {lead.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[var(--line)] text-xs">
                  <div className="flex flex-wrap items-center gap-4 text-[var(--text-muted)]">
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-[var(--accent)]" />
                      {lead.location} ({lead.distance})
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-[var(--text-muted)]" />
                      Posted {lead.datePosted}
                    </span>
                    <span>
                      {lead.quotesReceivedCount} {lead.quotesReceivedCount === 1 ? "quote" : "quotes"} submitted
                    </span>
                  </div>

                  <div>
                    {lead.myQuote ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center space-x-1.5 text-xs font-bold text-[var(--pine-accent)] bg-[var(--bg-alt)] px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--line)]">
                          <Check className="w-3.5 h-3.5" />
                          <span>Submitted ({lead.myQuote.price})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleOpenDraftFromLead(lead)}
                          className="px-2.5 py-1.5 rounded-[var(--radius-sm)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold transition-colors cursor-pointer text-xs inline-flex items-center space-x-1 shadow-xs"
                          title="Draft or edit final contract terms, provided services, equipment, and schedule"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Draft Contract</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveNegotiation({
                              jobId: lead.id,
                              referenceCode: lead.referenceCode,
                              jobTitle: lead.title,
                              homeownerName: lead.homeownerName,
                              currentPrice: lead.myQuote!.price,
                            })
                          }
                          className="px-2.5 py-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-[var(--text)] transition-colors cursor-pointer text-xs inline-flex items-center space-x-1"
                          title="Private End-to-End Encrypted Bargaining with Homeowner"
                        >
                          <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Negotiate</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenQuoteModal(lead)}
                          className="p-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-[var(--text)] transition-colors cursor-pointer text-xs inline-flex items-center space-x-1"
                          title="Edit quote"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[var(--accent)]" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRetractQuote(lead.id, lead.referenceCode)}
                          className="p-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors cursor-pointer text-xs inline-flex items-center space-x-1"
                          title="Withdraw bid"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Withdraw</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenQuoteModal(lead)}
                        className="btn-brand px-4 py-2 rounded-[var(--radius-sm)] text-xs font-bold inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Quote / Proposal</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Draft Contract Status Banner if exists */}
                {(() => {
                  const matched = storeContracts.find((c) => c.referenceCode === lead.referenceCode);
                  if (!matched) return null;
                  if (matched.status === "PENDING_APPROVAL") {
                    return (
                      <div className="mt-2.5 p-3 rounded-[var(--radius-sm)] bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          <span className="font-semibold">
                            Final Draft Contract submitted to {lead.homeownerName} &bull; Awaiting digital signature
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePreviewDraftPdf(matched)}
                          className="font-bold text-amber-700 dark:text-amber-400 hover:underline ml-2 text-[11px]"
                        >
                          Preview Draft PDF &rarr;
                        </button>
                      </div>
                    );
                  }
                  if (matched.status === "ACTIVE") {
                    return (
                      <div className="mt-2.5 p-3 rounded-[var(--radius-sm)] bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="font-semibold">
                            Contract signed and activated by homeowner! Work in progress.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleOpenStoreContractDoc(matched)}
                          className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline ml-2 text-[11px]"
                        >
                          View Contract PDF &rarr;
                        </button>
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Already submitted proposal summary */}
                {lead.myQuote && (
                  <div className="mt-3 p-3.5 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] text-xs">
                    <div className="flex items-center justify-between font-bold text-[var(--text)] mb-1">
                      <span>Your Submitted Proposal:</span>
                      <span className="text-[var(--accent)]">{lead.myQuote.price} &middot; {lead.myQuote.timeline}</span>
                    </div>
                    <p className="text-[var(--text-muted)]">
                      {lead.myQuote.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: ACTIVE CONTRACTS */}
        {activeTab === "ACTIVE" && (
          <div className="space-y-4">
            {activeContracts.length === 0 ? (
              <div className="p-8 text-center rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] text-[var(--text-muted)] text-xs">
                No currently in-progress contracts. Submit quotes on the Job Board to win contracts.
              </div>
            ) : (
              activeContracts.map((contract) => {
                const matchedStore = storeContracts.find((c) => c.referenceCode === contract.referenceCode);
                const displayPrice = matchedStore?.agreedPrice || contract.agreedPrice;
                return (
                  <div
                    key={contract.id}
                    className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--bg-alt)] text-[var(--text-muted)] font-mono">
                            {contract.referenceCode}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/15 text-blue-600 dark:text-blue-400">
                            {contract.status === "SCHEDULED" ? "Work Scheduled" : "In Progress"}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--brand-light)] text-[var(--brand)]">
                            {contract.service}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[var(--text)]">
                          {contract.title}
                        </h3>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <span className="text-xs text-[var(--text-muted)] block">
                          Agreed Contract Amount
                        </span>
                        <span className="text-base font-bold text-[var(--accent)] font-serif">
                          {displayPrice}
                        </span>
                      </div>
                    </div>

                  {/* Customer Direct Contact Details */}
                  <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] space-y-2 text-xs">
                    <div className="font-bold text-[var(--text)] flex items-center justify-between">
                      <span>Homeowner Contact & Site Access Details</span>
                      <span className="text-[10px] uppercase font-bold text-[var(--pine-accent)] flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                        Identity Verified
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[var(--text-muted)]">
                      <div>
                        <strong>Client:</strong> {contract.homeownerName}
                      </div>
                      <div>
                        <strong>Telephone:</strong>{" "}
                        <a href={`tel:${contract.homeownerPhone}`} className="text-[var(--accent)] hover:underline font-bold">
                          {contract.homeownerPhone}
                        </a>
                      </div>
                      <div className="sm:col-span-2">
                        <strong>Site Address:</strong> {contract.address}
                      </div>
                      <div className="sm:col-span-2">
                        <strong>Appointment:</strong> {contract.startDate}
                      </div>
                      <div className="sm:col-span-2 text-[11px] italic">
                        <strong>Access Notes:</strong> {contract.notes}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--line)]">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-[var(--text-muted)]">
                        Status Milestone:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleOnSite(contract.id)}
                        className={`px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-bold border transition-colors cursor-pointer ${
                          contract.status === "ON_SITE"
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                            : "bg-[var(--bg-alt)] text-[var(--text)] border-[var(--line)] hover:bg-[var(--line-subtle)]"
                        }`}
                      >
                        {contract.status === "ON_SITE" ? "✓ Currently On Site" : "Mark as On Site"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenActiveContractDoc(contract)}
                        className="px-2.5 py-1 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-[11px] font-semibold text-[var(--text)] inline-flex items-center space-x-1 cursor-pointer"
                        title="Print Official Work Contract as PDF"
                      >
                        <Printer className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span>Print Contract PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveNegotiation({
                            jobId: contract.id,
                            referenceCode: contract.referenceCode,
                            jobTitle: contract.title,
                            homeownerName: contract.homeownerName,
                            currentPrice: contract.agreedPrice,
                          })
                        }
                        className="px-2.5 py-1 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-[11px] font-semibold text-[var(--text)] inline-flex items-center space-x-1 cursor-pointer"
                        title="Private End-to-End Encrypted Bargaining Channel"
                      >
                        <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>E2EE Chat</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenIssueInvoice(contract)}
                      className="btn-primary px-4 py-2 rounded-[var(--radius-sm)] text-xs font-bold inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Issue Final Invoice</span>
                    </button>
                  </div>
                </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 3: MONTHLY EARNINGS & ESCROW SETTLEMENTS */}
        {activeTab === "EARNED" && (
          <div className="space-y-6">
            {/* Top Earned Summary Card */}
            <div className="p-6 rounded-[var(--radius-lg)] bg-zinc-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-zinc-800">
              <div className="space-y-1">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[var(--accent)] block">
                  Verified Contractor Payout Dashboard
                </span>
                <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                  {earningsData.currency}{earningsData.lifetimeTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-zinc-400 max-w-md pt-1 leading-relaxed">
                  Total lifetime trade earnings secured and settled through TradeConnect Escrow. Zero commission fee deducted (100% contractor payout).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0">
                <div className="p-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total Paid Jobs</span>
                  <div className="text-xl font-black text-white mt-0.5 font-mono">
                    {earningsData.completedContractsCount}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">100% Settled</span>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Active Month</span>
                  <div className="text-xl font-black text-[var(--accent)] mt-0.5 font-mono">
                    {earningsData.currency}{(earningsData.monthlyBreakdown[0]?.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-zinc-400">November 2026</span>
                </div>
              </div>
            </div>

            {/* Month-by-Month Historical Breakdown */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[var(--text)]">
                    Monthly Revenue Breakdown
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Accredited earnings and itemized VAT invoices by calendar month.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[var(--bg-alt)] border border-[var(--line)] text-[var(--text-muted)]">
                  {earningsData.monthlyBreakdown.length} Settlement Months
                </span>
              </div>

              {earningsData.monthlyBreakdown.map((mGroup) => (
                <div
                  key={mGroup.monthLabel}
                  className="rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft overflow-hidden"
                >
                  {/* Month Header Banner */}
                  <div className="px-5 py-4 bg-[var(--bg-alt)] border-b border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-[var(--brand-light)] text-[var(--brand)] flex items-center justify-center font-bold text-sm border border-[var(--line)]">
                        {mGroup.monthLabel.slice(0, 3)}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-[var(--text)]">
                          {mGroup.monthLabel}
                        </h4>
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {mGroup.jobsCount} completed and paid {mGroup.jobsCount === 1 ? "contract" : "contracts"}
                        </span>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">
                        Monthly Settled Total
                      </span>
                      <span className="text-lg font-black font-mono text-[var(--accent)]">
                        {earningsData.currency}{mGroup.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Contracts Table for this Month */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[var(--line)] bg-[var(--surface)] text-[var(--text-muted)] font-bold uppercase text-[10px] tracking-wider">
                          <th className="py-3 px-4">Ref &amp; Service</th>
                          <th className="py-3 px-4">Job Scope</th>
                          <th className="py-3 px-4">Client</th>
                          <th className="py-3 px-4">Settled Date</th>
                          <th className="py-3 px-4 text-right">Earned Amount</th>
                          <th className="py-3 px-4 text-right">Invoice Document</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--line)]">
                        {mGroup.contracts.map((cnt) => (
                          <tr key={cnt.id} className="hover:bg-[var(--bg-alt)]/50 transition-colors">
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="font-mono font-bold text-[var(--text)] block">
                                {cnt.referenceCode}
                              </span>
                              <span className="text-[10px] text-[var(--pine-accent)] font-semibold">
                                {cnt.service}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 max-w-xs">
                              <span className="font-semibold text-[var(--text)] line-clamp-1 block">
                                {cnt.title}
                              </span>
                              <span className="text-[10px] text-[var(--text-muted)]">
                                {cnt.warrantyPeriod}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="font-medium text-[var(--text)] block">
                                {cnt.homeownerName}
                              </span>
                              <span className="text-[10px] text-[var(--text-muted)]">
                                {cnt.city}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap text-[var(--text-muted)] text-[11px]">
                              {cnt.invoicePaidAt?.split(",")[0] || cnt.serviceDate}
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap font-mono font-extrabold text-sm text-[var(--text)]">
                              {cnt.currency}{(cnt.totalAmount || cnt.priceNumeric).toFixed(2)}
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => handleOpenStoreContractDoc(cnt)}
                                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-[var(--accent)] font-bold text-xs cursor-pointer shadow-2xs"
                                title="Download VAT Invoice as PDF"
                              >
                                <Printer className="w-3.5 h-3.5" />
                                <span>Download PDF</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CONTRACT HISTORY & INVOICES */}
        {activeTab === "HISTORY" && (
          <div className="space-y-4">
            <div className="p-4 rounded-[var(--radius)] bg-[var(--bg-alt)] border border-[var(--line)] text-xs text-[var(--text-muted)] flex items-center justify-between">
              <span>Permanent record of executed contracts, completed work orders, settlements, and verified homeowner reviews.</span>
              <button
                type="button"
                onClick={() => {
                  if (completedContracts.length > 0) {
                    handleOpenCompletedInvoiceDoc(completedContracts[0]);
                  }
                }}
                className="font-bold text-[var(--brand)] hover:underline inline-flex items-center cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 mr-1 text-[var(--accent)]" />
                <span>View Latest Invoice PDF</span>
              </button>
            </div>

            {completedContracts.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--bg-alt)] text-[var(--text-muted)] font-mono">
                        {job.referenceCode}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--pine-accent)]/15 text-[var(--pine-accent)] font-bold">
                        Completed &amp; Settled
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--bg-alt)] text-[var(--text-muted)]">
                        {job.service}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[var(--text)]">
                      {job.title}
                    </h3>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="text-xs text-[var(--text-muted)] block">
                      Settled Amount
                    </span>
                    <span className="text-base font-bold text-[var(--text)] font-serif">
                      {job.settledAmount}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--line)]">
                  <span>Homeowner: <strong>{job.homeownerName}</strong> &middot; Completed: {job.completedDate}</span>
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-[11px] bg-[var(--bg-alt)] px-2 py-0.5 rounded border border-[var(--line)]">
                      {job.invoiceNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenCompletedInvoiceDoc(job)}
                      className="text-[var(--accent)] font-semibold hover:underline inline-flex items-center space-x-1 cursor-pointer"
                      title="Print Official VAT Invoice as PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print VAT Invoice PDF</span>
                    </button>
                  </div>
                </div>

                {job.homeownerReview && (
                  <div className="p-3.5 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)]">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-1 text-xs font-bold text-[var(--accent)]">
                        {Array.from({ length: job.homeownerReview.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[var(--accent)]" />
                        ))}
                        <span className="ml-1 text-[var(--text)]">{job.homeownerReview.rating}.0 / 5.0</span>
                      </div>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        Verified review by {job.homeownerReview.author} &middot; {job.homeownerReview.date}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] italic">
                      &ldquo;{job.homeownerReview.comment}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: COMPANY PROFILE, VERIFICATION BADGES & SECURITY */}
        {activeTab === "PROFILE" && (
          <div className="space-y-6">
            {/* 1. Pro Verification Milestones & Requirement Progress */}
            <div
              className={`p-6 rounded-[var(--radius-lg)] border shadow-soft ${
                safeIsProVerified
                  ? "bg-emerald-500/5 border-emerald-500/30"
                  : "bg-[var(--surface)] border-[var(--line)]"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start space-x-3.5">
                  <div
                    className={`p-3 rounded-full ${
                      safeIsProVerified
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {safeIsProVerified ? (
                      <ShieldCheck className="w-6 h-6" />
                    ) : (
                      <ShieldAlert className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[var(--text)]">
                        {safeIsProVerified
                          ? "Verified Pro Contractor Status Active"
                          : "TradeConnect Pro Verification Milestone"}
                      </h3>
                      {safeIsProVerified && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Verified Pro
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-1 max-w-2xl leading-relaxed">
                      {safeIsProVerified
                        ? "Congratulations! You have fulfilled all TradeConnect trust criteria: completed at least 10 verified contracts with a customer rating above 4.0 stars. Your profile proudly displays the official Verified Pro badge."
                        : "To earn the official Verified Pro Contractor badge, you must complete at least 10 contracts successfully and maintain an average customer review rating above 4.0 stars."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Gauges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-5 border-t border-[var(--line)]">
                <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-[var(--text)]">Completed Contracts Milestone</span>
                    <span
                      className={
                        safeProCount >= 10
                          ? "text-emerald-700 font-extrabold"
                          : "text-[var(--brand)] font-extrabold"
                      }
                    >
                      {safeProCount} / 10 Completed
                    </span>
                  </div>
                  <div className="w-full bg-[var(--line)] rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        safeProCount >= 10 ? "bg-emerald-600" : "bg-[var(--brand)]"
                      }`}
                      style={{ width: `${Math.min(100, (safeProCount / 10) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    {safeProCount >= 10
                      ? "✓ Requirement satisfied (10+ completed contracts)"
                      : `${Math.max(0, 10 - safeProCount)} more completed contracts needed to unlock status.`}
                  </p>
                </div>

                <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-[var(--text)]">Homeowner Review Rating Requirement</span>
                    <span
                      className={
                        safeProRating > 4.0
                          ? "text-emerald-700 font-extrabold flex items-center"
                          : "text-[var(--accent)] font-extrabold flex items-center"
                      }
                    >
                      <Star className="w-3.5 h-3.5 fill-current mr-1" />
                      {safeProRating > 0 ? safeProRating.toFixed(2) : "0.0"} / 4.0★ Required
                    </span>
                  </div>
                  <div className="w-full bg-[var(--line)] rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        safeProRating > 4.0 ? "bg-emerald-600" : "bg-[var(--accent)]"
                      }`}
                      style={{ width: `${Math.min(100, (safeProRating / 5.0) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    {safeProRating > 4.0
                      ? `✓ Rating criteria met with ${safeProRating}★ across ${proReviews.length} reviews`
                      : proReviews.length === 0
                      ? "Awaiting first completed job reviews from homeowners."
                      : `Current average is ${safeProRating}★. Minimum >4.0★ required.`}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Business Profile & Rate Card Settings */}
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-[var(--text)]">
                    Business Profile &amp; Service Rates
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Update your trading identity, contact info, default hourly rates, and coverage cities.
                  </p>
                </div>
                {profileSavedMsg && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded inline-flex items-center animate-in fade-in">
                    <Check className="w-3.5 h-3.5 mr-1" />
                    Profile Updated &amp; Saved
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveProProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">
                      Company / Trading Business Name
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">
                      Lead Engineer / Primary Contact
                    </label>
                    <input
                      type="text"
                      required
                      value={leadEngineer}
                      onChange={(e) => setLeadEngineer(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">
                      Business Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={proPhone}
                      onChange={(e) => setProPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-[var(--text)]">
                        Business Sign-In Email
                      </label>
                      <span className="text-[10px] text-[var(--text-muted)] flex items-center font-normal">
                        <Lock className="w-3 h-3 mr-1 text-[var(--accent)]" />
                        Cannot be edited
                      </span>
                    </div>
                    <input
                      type="email"
                      disabled
                      readOnly
                      value={user?.email || proEmail}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text-muted)] cursor-not-allowed select-none font-medium opacity-80"
                      title="Your contractor sign-in email address cannot be changed."
                    />
                    <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
                      Account email remains permanent as registered upon sign in.
                    </span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">
                      Hourly Labor Rate
                    </label>
                    <input
                      type="text"
                      required
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">
                      Standard Callout Diagnostic Fee
                    </label>
                    <input
                      type="text"
                      required
                      value={calloutFee}
                      onChange={(e) => setCalloutFee(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">
                      Registered Base City
                    </label>
                    <input
                      type="text"
                      required
                      value={homeBaseCity}
                      onChange={(e) => setHomeBaseCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">
                      Coverage Territory Description
                    </label>
                    <input
                      type="text"
                      required
                      value={coverageRadius}
                      onChange={(e) => setCoverageRadius(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Additional City Coverage (Multi-select) */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text)] mb-1.5">
                    Additional Coverage Cities (Areas you travel to):
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {CITIES.filter((c) => c.country === "UK" && c.name !== homeBaseCity).map((city) => {
                      const isSelected = additionalCoverageCities.includes(city.name);
                      return (
                        <button
                          key={city.id}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setAdditionalCoverageCities(additionalCoverageCities.filter((c) => c !== city.name));
                            } else {
                              setAdditionalCoverageCities([...additionalCoverageCities, city.name]);
                            }
                          }}
                          className={`px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-semibold border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[var(--brand)] text-white border-[var(--brand)] shadow-xs"
                              : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--line)] hover:border-[var(--text)]"
                          }`}
                        >
                          {isSelected ? "✓ " : "+ "}
                          {city.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Offered Trade Services (Multi-select) */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text)] mb-1.5">
                    Trade Services Offered:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map((cat) => {
                      const isSelected = offeredServices.includes(cat.name);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setOfferedServices(offeredServices.filter((s) => s !== cat.name));
                            } else {
                              setOfferedServices([...offeredServices, cat.name]);
                            }
                          }}
                          className={`px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-semibold border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-xs"
                              : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--line)] hover:border-[var(--text)]"
                          }`}
                        >
                          {isSelected ? "✓ " : "+ "}
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary px-5 py-2.5 rounded-[var(--radius-sm)] text-xs font-bold flex items-center space-x-2 cursor-pointer shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Company Profile &amp; Rates</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 3. Accreditations & Regulatory Licenses */}
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-4">
              <div>
                <h3 className="text-base font-bold text-[var(--text)]">
                  Accreditations &amp; Regulatory Licenses
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  TradeConnect verifies all contractor credentials directly with national governing bodies (Gas Safe, NICEIC, NAPIT, OSHA).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-xs text-[var(--text)] flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-1.5 text-[var(--pine-accent)]" />
                      Gas Safe Register
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--pine-accent)]/15 text-[var(--pine-accent)]">
                      Verified Active
                    </span>
                  </div>
                  <div className="text-xs text-[var(--text-muted)] space-y-1">
                    <div><strong>Registration No:</strong> 592104</div>
                    <div><strong>Categories:</strong> Domestic Gas, Boilers, Cookers, Pipework</div>
                    <div><strong>Expiry Date:</strong> 31 March 2027</div>
                  </div>
                </div>

                <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-xs text-[var(--text)] flex items-center">
                      <Award className="w-4 h-4 mr-1.5 text-[var(--brand)]" />
                      Public Liability Insurance
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--pine-accent)]/15 text-[var(--pine-accent)]">
                      Verified Active
                    </span>
                  </div>
                  <div className="text-xs text-[var(--text-muted)] space-y-1">
                    <div><strong>Insurer:</strong> AXA Commercial Trade Policy</div>
                    <div><strong>Coverage:</strong> £5,000,000 indemnity limit</div>
                    <div><strong>Policy ID:</strong> AXA-PL-8921048</div>
                    <div><strong>Expiry Date:</strong> 14 October 2027</div>
                  </div>
                </div>

                <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-xs text-[var(--text)] flex items-center">
                      <FileText className="w-4 h-4 mr-1.5 text-[var(--accent)]" />
                      NICEIC Approved Contractor
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--pine-accent)]/15 text-[var(--pine-accent)]">
                      Verified Active
                    </span>
                  </div>
                  <div className="text-xs text-[var(--text-muted)] space-y-1">
                    <div><strong>Enrollment:</strong> 0482910</div>
                    <div><strong>Qualified Supervisor:</strong> David Thornton</div>
                    <div><strong>Scope:</strong> Full domestic &amp; commercial electrical installation</div>
                  </div>
                </div>

                <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-xs text-[var(--text)] flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1.5 text-[var(--text-muted)]" />
                      Health &amp; Safety CSCS Card
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--pine-accent)]/15 text-[var(--pine-accent)]">
                      Gold Card (Supervisor)
                    </span>
                  </div>
                  <div className="text-xs text-[var(--text-muted)] space-y-1">
                    <div><strong>Card Number:</strong> CSCS-990142</div>
                    <div><strong>Standard:</strong> NVQ Level 3 Plumbing &amp; Heating</div>
                    <div><strong>Valid Through:</strong> 2028</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Danger Zone: Password-Protected Account Deletion */}
            <div className="p-6 rounded-[var(--radius-lg)] bg-red-500/5 border border-red-500/30 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-red-600 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Danger Zone &bull; Delete Contractor Account
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1 max-w-xl">
                    Permanently delete your trade professional profile, active proposals, and earnings ledger. You will be prompted to enter your login password to authenticate this action.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDeleteAccountModalOpen(true)}
                  className="px-4 py-2 text-xs font-bold rounded-[var(--radius-sm)] bg-red-600 hover:bg-red-700 text-white cursor-pointer transition-colors shrink-0 flex items-center space-x-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Pro Account</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Submit Quote Proposal */}
        {quotingLeadId && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
          >
            <div
              className="fixed inset-0"
              onClick={() => setQuotingLeadId(null)}
              aria-hidden="true"
            />

            <div className="relative z-10 w-full max-w-lg max-h-[88vh] flex flex-col bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--line)] shadow-2xl overflow-hidden">
              <div className="flex items-start justify-between p-4 sm:p-5 border-b border-[var(--line)] shrink-0">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    Direct Quote Submission
                  </span>
                  <h3 id="quote-modal-title" className="text-lg font-bold text-[var(--text)] mt-0.5">
                    Submit Proposal to Homeowner
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setQuotingLeadId(null)}
                  className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--line)] cursor-pointer"
                  aria-label="Close quote modal"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleConfirmQuoteSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
                <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
                  <div>
                    <label htmlFor="quote-price" className="block text-xs font-bold text-[var(--text)] mb-1">
                      Your Estimate / Fixed Price (£ or $) *
                    </label>
                    <input
                      id="quote-price"
                      type="text"
                      required
                      placeholder="e.g. £145 (parts & labor included)"
                      value={quotePrice}
                      onChange={(e) => setQuotePrice(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-timeline" className="block text-xs font-bold text-[var(--text)] mb-1">
                      Estimated Arrival / Start Time *
                    </label>
                    <input
                      id="quote-timeline"
                      type="text"
                      required
                      placeholder="e.g. Can dispatch in 30 minutes / Today by 2pm"
                      value={quoteTimeline}
                      onChange={(e) => setQuoteTimeline(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-notes" className="block text-xs font-bold text-[var(--text)] mb-1">
                      Notes for Homeowner (Parts, Warranty, Guarantees)
                    </label>
                    <textarea
                      id="quote-notes"
                      rows={3}
                      placeholder="Describe how you will solve the issue, warranty details, and what parts you carry."
                      value={quoteNotes}
                      onChange={(e) => setQuoteNotes(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 border-t border-[var(--line)] bg-[var(--surface)] shrink-0 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setQuotingLeadId(null)}
                    className="px-4 py-2 rounded-[var(--radius-sm)] text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-brand px-5 py-2.5 rounded-[var(--radius-sm)] text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Send Proposal to Homeowner
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: OFFICIAL PRINTABLE INVOICE / CONTRACT */}
        {selectedDocData && (
          <InvoiceContractModal
            isOpen={isDocModalOpen}
            onClose={() => {
              setIsDocModalOpen(false);
              setSelectedDocData(null);
            }}
            data={selectedDocData}
          />
        )}

        {/* MODAL 4: END-TO-END ENCRYPTED NEGOTIATION CHAT */}
        {activeNegotiation && (
          <NegotiationModal
            isOpen={Boolean(activeNegotiation)}
            onClose={() => setActiveNegotiation(null)}
            jobTitle={activeNegotiation.jobTitle}
            referenceCode={activeNegotiation.referenceCode}
            currentPrice={activeNegotiation.currentPrice}
            counterpartName={activeNegotiation.homeownerName}
            counterpartRole="HOMEOWNER"
            onPriceAgreed={handleNegotiationAgreed}
          />
        )}

        {/* MODAL 5: CONTRACTOR DRAFT CONTRACT STUDIO */}
        {draftingContract && (
          <DraftContractModal
            isOpen={isDraftModalOpen}
            onClose={() => {
              setIsDraftModalOpen(false);
              setDraftingContract(null);
            }}
            contract={draftingContract}
            onPreviewPdf={handlePreviewDraftPdf}
            onSaved={async (updated) => {
              setDraftingContract(updated);
              const target = marketplaceJobs.find((j) => j.referenceCode === updated.referenceCode);
              if (target) {
                const updatedProposals = target.proposals.map((p) =>
                  p.proId === "pro_uk_1" || p.proName === companyName
                    ? { ...p, price: updated.agreedPrice, notes: updated.notes }
                    : p
                );
                await updateJob(target.referenceCode, {
                  proposals: updatedProposals,
                });
              }
            }}
          />
        )}

        {/* MODAL 6: CONTRACTOR INVOICE ISSUANCE */}
        {invoicingContract && (
          <ContractorInvoiceModal
            isOpen={isInvoicingModalOpen}
            onClose={() => {
              setIsInvoicingModalOpen(false);
              setInvoicingContract(null);
            }}
            contract={invoicingContract}
            onInvoiceSent={() => {
              setIsInvoicingModalOpen(false);
              setInvoicingContract(null);
              setActiveTab("EARNED");
            }}
          />
        )}

        {/* MODAL 7: PASSWORD-AUTHENTICATED ACCOUNT DELETION */}
        <DeleteAccountModal
          isOpen={isDeleteAccountModalOpen}
          onClose={() => setIsDeleteAccountModalOpen(false)}
          role="CONTRACTOR"
        />
      </div>
    </div>
  );
}
