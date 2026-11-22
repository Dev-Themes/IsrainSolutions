"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  Star,
  Phone,
  Plus,
  Edit3,
  Trash2,
  X,
  Printer,
  Lock,
  Download,
  Receipt,
  Save,
  Clock,
  Briefcase,
  AlertTriangle,
} from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";
import {
  InvoiceContractModal,
  InvoiceContractData,
} from "@/components/documents/invoice-contract-document";
import { NegotiationModal } from "@/components/chat/negotiation-modal";
import {
  useContractStore,
  JobContract,
  getHomeownerStats,
  getContractFinancials,
} from "@/lib/contract-store";
import { ContractApprovalModal } from "@/components/contracts/contract-approval-modal";
import { HomeownerReviewModal } from "@/components/contracts/homeowner-review-modal";
import { DeleteAccountModal } from "@/components/auth/delete-account-modal";
import { toast } from "@/components/ui/toast";
import { useUnreadMessages } from "@/lib/message-store";
import { useCurrency } from "@/lib/currency";

import {
  useJobStore,
  MarketplaceJobItem as HomeownerJob,
} from "@/lib/job-store";

export const INITIAL_HOMEOWNER_JOBS: HomeownerJob[] = [];

const emptySubscribe = () => () => {};
function useIsClient() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function HomeownerDashboardPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const { contracts: storeContracts, submitReview, updateDraft } = useContractStore();
  const { jobs, createJob, updateJob, removeJob } = useJobStore();
  const mounted = useIsClient();

  const isDemo =
    user?.email?.toLowerCase() === "sarah.jenkins@example.com" ||
    user?.id === "user_homeowner_1" ||
    user?.id === "usr_homeowner_1";

  // Filter jobs belonging strictly to this homeowner
  const myJobs = React.useMemo(() => {
    return jobs.filter((j) => {
      if (isDemo) {
        return (
          j.homeownerId === "usr_homeowner_1" ||
          j.homeownerId === "user_homeowner_1" ||
          j.homeownerEmail?.toLowerCase() === "sarah.jenkins@example.com" ||
          j.homeownerName.toLowerCase().includes("sarah")
        );
      }
      if (user?.id && j.homeownerId === user.id) return true;
      if (user?.email && j.homeownerEmail && j.homeownerEmail.toLowerCase() === user.email.toLowerCase()) return true;
      return false;
    });
  }, [jobs, user, isDemo]);

  // Filter contracts belonging strictly to this homeowner
  const myContracts = React.useMemo(() => {
    return storeContracts.filter((c) => {
      if (isDemo) {
        return (
          c.homeownerId === "usr_homeowner_1" ||
          c.homeownerId === "user_homeowner_1" ||
          c.homeownerEmail?.toLowerCase() === "sarah.jenkins@example.com" ||
          c.homeownerName.toLowerCase().includes("sarah")
        );
      }
      if (user?.id && c.homeownerId === user.id) return true;
      if (user?.email && c.homeownerEmail && c.homeownerEmail.toLowerCase() === user.email.toLowerCase()) return true;
      return false;
    });
  }, [storeContracts, user, isDemo]);

  const homeownerStats = React.useMemo(() => {
    return getHomeownerStats({ id: user?.id, email: user?.email, name: user?.name }, myContracts);
  }, [user, myContracts]);

  // Tab Navigation: Listings & Quotes, Ongoing Contracts, History & Receipts, Profile & Settings
  const [activeTab, setActiveTab] = React.useState<"LISTINGS" | "ONGOING" | "HISTORY" | "PROFILE">("LISTINGS");

  // Contract Approval and Review Modal States
  const [approvingContract, setApprovingContract] = React.useState<JobContract | null>(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = React.useState(false);

  const [payingReviewContract, setPayingReviewContract] = React.useState<JobContract | null>(null);
  const [isPayReviewModalOpen, setIsPayReviewModalOpen] = React.useState(false);
  const [payReviewMode, setPayReviewMode] = React.useState<"PAY_AND_REVIEW" | "REVIEW_ONLY">("PAY_AND_REVIEW");

  // Document & Negotiation States
  const { unreadMap } = useUnreadMessages("CUSTOMER");
  const { currency, setCurrency, format } = useCurrency();
  const [selectedDocData, setSelectedDocData] = React.useState<InvoiceContractData | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = React.useState(false);
  const [activeNegotiation, setActiveNegotiation] = React.useState<{
    jobId: string;
    proId: string;
    proName: string;
    jobTitle: string;
    referenceCode: string;
    currentPrice: string;
  } | null>(null);

  // CRUD Modals State
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [editingJob, setEditingJob] = React.useState<HomeownerJob | null>(null);
  const [reviewingJob, setReviewingJob] = React.useState<HomeownerJob | null>(null);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = React.useState(false);

  // Form states for creation
  const [newTitle, setNewTitle] = React.useState("");
  const [newService, setNewService] = React.useState("Emergency Plumbing");
  const [newLocation, setNewLocation] = React.useState("Fulham, London (SW6)");
  const [newUrgency, setNewUrgency] = React.useState("Emergency");

  // Form states for edit
  const [editTitle, setEditTitle] = React.useState("");
  const [editUrgency, setEditUrgency] = React.useState("");

  // Review states
  const [reviewRating, setReviewRating] = React.useState(5);
  const [reviewComment, setReviewComment] = React.useState("");

  // Profile Edit State
  const [profileName, setProfileName] = React.useState(user?.name || (isDemo ? "Sarah Jenkins" : "Homeowner"));
  const [profilePhone, setProfilePhone] = React.useState(user?.phone || (isDemo ? "+44 20 7946 0812" : ""));
  const [profileAddress, setProfileAddress] = React.useState(user?.address || (isDemo ? "14 Cranbury Road, Fulham, London SW6 2PY" : ""));
  const [profileCity, setProfileCity] = React.useState(user?.city || (isDemo ? "London" : ""));
  const profileEmail = user?.email || (isDemo ? "sarah.jenkins@example.com" : "");

  const [syncedUserId, setSyncedUserId] = React.useState(user?.id);
  if (user && user.id !== syncedUserId) {
    setSyncedUserId(user.id);
    if (user.name && !isDemo) setProfileName(user.name);
    if (user.phone && !isDemo) setProfilePhone(user.phone);
    if (user.address && !isDemo) setProfileAddress(user.address);
    if (user.city && !isDemo) setProfileCity(user.city);
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: profileName,
      phone: profilePhone,
      address: profileAddress,
      city: profileCity,
    });
    toast.success("Profile details saved successfully!");
  };

  const handleOpenDraftDoc = (c: JobContract) => {
    const isPaid = c.status === "PAID" || c.status === "COMPLETED";
    const docData: InvoiceContractData = {
      documentType: isPaid
        ? "INVOICE"
        : c.status === "DRAFT" || c.status === "PENDING_APPROVAL"
        ? "DRAFT_CONTRACT"
        : "CONTRACT",
      documentNumber: isPaid
        ? c.invoiceNumber || `INV-${c.referenceCode}`
        : c.status === "PENDING_APPROVAL"
        ? `DFT-${c.referenceCode}`
        : `CNT-${c.referenceCode}`,
      issueDate: c.invoiceIssuedAt?.split(",")[0] || c.datePosted,
      completionDate: c.invoicePaidAt?.split(",")[0],
      referenceCode: c.referenceCode,
      jobTitle: c.title,
      serviceCategory: c.service,
      location: c.location,
      agreedPrice: c.agreedPrice,
      labourAmount: c.labourAmount,
      materialsAmount: c.materialsAmount,
      subtotalAmount: c.subtotalAmount,
      vatRate: c.vatRate,
      vatAmount: c.vatAmount,
      vatNumber: c.vatNumber,
      totalAmount: c.totalAmount,
      bankDetails: c.bankDetails,
      invoiceIssuedAt: c.invoiceIssuedAt,
      invoicePaidAt: c.invoicePaidAt,
      paymentStatus: isPaid
        ? "PAID IN FULL"
        : c.status === "ACTIVE"
        ? "CONTRACT ACTIVE"
        : c.status === "INVOICED"
        ? "PENDING PAYMENT"
        : "DRAFT PENDING APPROVAL",
      paymentMethod: c.paymentMethod || "TradeConnect Protected Escrow",
      providedServices: c.providedServices,
      providedEquipments: c.providedEquipments,
      serviceDateTime: `${c.serviceDate} (${c.serviceTime})`,
      warrantyPeriod: c.warrantyPeriod,
      homeownerSignature: c.homeownerSignature,
      notes: c.notes,
      homeowner: {
        name: user ? user.name : "Sarah Jenkins",
        phone: user?.phone || "+44 20 7946 0812",
        address: c.location,
        email: user ? user.email : "sarah.jenkins@example.co.uk",
      },
      contractor: {
        companyName: c.proName,
        contactName: "David Thornton (Lead Engineer)",
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

  const handleOpenInvoice = (job: HomeownerJob) => {
    const matched = storeContracts.find((c) => c.referenceCode === job.referenceCode);
    const resolvedPrice = matched?.agreedPrice || job.finalCost || "£145.00";
    const docData: InvoiceContractData = {
      documentType: "INVOICE",
      documentNumber: matched?.invoiceNumber || `INV-${job.referenceCode}`,
      issueDate: job.datePosted,
      completionDate: job.completedDate || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      referenceCode: job.referenceCode,
      jobTitle: job.title,
      serviceCategory: job.service,
      location: job.location,
      agreedPrice: resolvedPrice,
      labourAmount: matched?.labourAmount,
      materialsAmount: matched?.materialsAmount,
      subtotalAmount: matched?.subtotalAmount,
      vatRate: matched?.vatRate,
      vatAmount: matched?.vatAmount,
      vatNumber: matched?.vatNumber,
      totalAmount: matched?.totalAmount,
      bankDetails: matched?.bankDetails,
      invoiceIssuedAt: matched?.invoiceIssuedAt,
      invoicePaidAt: matched?.invoicePaidAt || job.completedDate,
      paymentStatus: "PAID IN FULL",
      paymentMethod: matched?.paymentMethod || "TradeConnect Escrow (Stripe Verified)",
      providedServices: matched?.providedServices || [
        "Primary trade diagnostic & isolation",
        "Replacement component installation to BS standard",
        "Handover inspection & signed safety compliance certificate",
      ],
      providedEquipments: matched?.providedEquipments || [
        "Certified trade components & compression fittings",
        "High-spec trade consumables",
      ],
      serviceDateTime: matched?.serviceDate ? `${matched.serviceDate} (${matched.serviceTime})` : "Completed",
      warrantyPeriod: matched?.warrantyPeriod || "12 Months Workmanship Guarantee",
      homeownerSignature: user?.name || "Sarah Jenkins",
      notes: matched?.notes || "Job completed to homeowner satisfaction with zero defects.",
      homeowner: {
        name: user?.name || "Sarah Jenkins",
        phone: user?.phone || "+44 20 7946 0812",
        address: job.location,
        email: user?.email || "sarah.jenkins@example.co.uk",
      },
      contractor: {
        companyName: matched?.proName || (job.proposals[0]?.proName || "Apex Heating & Emergency Plumbing Ltd"),
        contactName: "David Thornton (Lead Engineer)",
        licenseNumber: matched?.proLicense || "Gas Safe Register #592104",
        insuranceAmount: matched?.proInsurance || "£5,000,000 Direct Line Public Liability",
        baseCity: "London (SW6)",
        phone: matched?.proPhone || "+44 20 7946 0812",
        email: matched?.proEmail || "david@apexplumbing.co.uk",
      },
    };
    setSelectedDocData(docData);
    setIsDocModalOpen(true);
  };

  const handleOpenContract = (job: HomeownerJob) => {
    const matched = storeContracts.find((c) => c.referenceCode === job.referenceCode);
    const resolvedPrice = matched?.agreedPrice || job.finalCost || "£145.00";
    const docData: InvoiceContractData = {
      documentType: "CONTRACT",
      documentNumber: `CNT-${job.referenceCode.replace("TC-", "2026-")}`,
      issueDate: job.datePosted,
      referenceCode: job.referenceCode,
      jobTitle: job.title,
      serviceCategory: job.service,
      location: job.location,
      agreedPrice: resolvedPrice,
      labourAmount: matched?.labourAmount,
      materialsAmount: matched?.materialsAmount,
      totalAmount: matched?.totalAmount,
      paymentStatus: "CONTRACT ACTIVE",
      paymentMethod: matched?.paymentMethod || "TradeConnect Protected Milestone Escrow",
      providedServices: matched?.providedServices || [
        "Primary trade installation & circuit isolation",
        "Supply and install replacement components to trade standard",
        "Full test and certification compliance",
      ],
      providedEquipments: matched?.providedEquipments || [
        "Certified trade components & compression fittings",
      ],
      serviceDateTime: matched?.serviceDate ? `${matched.serviceDate} (${matched.serviceTime})` : "Scheduled within 24 hours",
      warrantyPeriod: matched?.warrantyPeriod || "12 Months Workmanship Guarantee",
      homeownerSignature: user?.name || "Sarah Jenkins",
      notes: matched?.notes || "Digital contract binding both parties under TradeConnect Escrow Protection.",
      homeowner: {
        name: user?.name || "Sarah Jenkins",
        phone: user?.phone || "+44 20 7946 0812",
        address: job.location,
        email: user?.email || "sarah.jenkins@example.co.uk",
      },
      contractor: {
        companyName: matched?.proName || (job.proposals[0]?.proName || "Apex Heating & Emergency Plumbing Ltd"),
        contactName: "David Thornton (Lead Engineer)",
        licenseNumber: matched?.proLicense || "Gas Safe Register #592104",
        insuranceAmount: matched?.proInsurance || "£5,000,000 Direct Line Public Liability",
        baseCity: "London (SW6)",
        phone: matched?.proPhone || "+44 20 7946 0812",
        email: matched?.proEmail || "david@apexplumbing.co.uk",
      },
    };
    setSelectedDocData(docData);
    setIsDocModalOpen(true);
  };

  const handlePriceAgreed = async (newPrice: string) => {
    if (!activeNegotiation) return;
    const target = jobs.find((j) => j.id === activeNegotiation.jobId || j.referenceCode === activeNegotiation.referenceCode);
    if (!target) return;

    const updatedProposals = target.proposals.map((p) => {
      if (p.proId === activeNegotiation.proId) {
        return {
          ...p,
          price: newPrice,
          notes: `${p.notes} [Negotiated rate accepted: ${newPrice}]`,
        };
      }
      return p;
    });

    await updateJob(target.referenceCode, {
      proposals: updatedProposals,
    });
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newRef = `TC-${Math.floor(100000 + Math.random() * 900000)}`;
    const lowerLocation = newLocation.toLowerCase();
    const resolvedCity = lowerLocation.includes("manchester")
      ? "Manchester"
      : lowerLocation.includes("birmingham")
      ? "Birmingham"
      : lowerLocation.includes("leeds")
      ? "Leeds"
      : lowerLocation.includes("glasgow")
      ? "Glasgow"
      : "London";

    await createJob({
      referenceCode: newRef,
      service: newService,
      title: newTitle.trim(),
      description: `Customer requested urgent ${newService.toLowerCase()} assistance. Verified homeowner listing.`,
      location: newLocation.trim() || "Fulham, London",
      city: resolvedCity,
      country: "UK",
      urgency: newUrgency,
      datePosted: "Just now",
      homeownerId: user?.id || "usr_homeowner_1",
      homeownerName: user?.name || "Sarah Jenkins",
      homeownerPhone: user?.phone || "+44 20 7946 0812",
      homeownerEmail: user?.email || "sarah.jenkins@example.co.uk",
    });

    setIsCreateModalOpen(false);
    setNewTitle("");
    toast.success(`Job request ${newRef} has been published to verified trade contractors in your area!`);
  };

  const handleStartEdit = (job: HomeownerJob) => {
    setEditingJob(job);
    setEditTitle(job.title);
    setEditUrgency(job.urgency);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    await updateJob(editingJob.referenceCode, {
      title: editTitle,
      urgency: editUrgency,
    });
    setEditingJob(null);
  };

  const handleDeleteJob = async (jobId: string, referenceCode: string) => {
    await removeJob(referenceCode);
    try {
      await fetch(`/api/contracts?referenceCode=${encodeURIComponent(referenceCode)}`, { method: "DELETE" });
      await fetch(`/api/messages?referenceCode=${encodeURIComponent(referenceCode)}`, { method: "DELETE" });
    } catch {
      // ignore cleanup fetch errors
    }
    toast.info(`Job request ${referenceCode} was removed.`);
  };

  const handleAcceptProposal = async (jobId: string, proId: string) => {
    if (!user) {
      router.push("/auth/login?redirect=/dashboard/homeowner");
      return;
    }

    const target = jobs.find((j) => j.id === jobId || j.referenceCode === jobId);
    if (!target) return;

    const updatedProposals = target.proposals.map((p) =>
      p.proId === proId
        ? { ...p, status: "ACCEPTED" as const }
        : { ...p, status: "DECLINED" as const }
    );
    const acceptedProp = updatedProposals.find((p) => p.status === "ACCEPTED");
    const resolvedPrice = acceptedProp?.price || target.finalCost || "£145.00";
    const numericPrice = parseFloat(resolvedPrice.replace(/[^0-9.]/g, "")) || 145;

    await updateJob(target.referenceCode, {
      status: "IN_PROGRESS",
      proposals: updatedProposals,
      finalCost: resolvedPrice,
    });

    // Create or activate formal legal contract in contract-store & Neon DB
    const existingContract = storeContracts.find((c) => c.referenceCode === target.referenceCode || c.id === target.id);
    const contractId = existingContract ? existingContract.id : `cnt_${target.id}`;

    updateDraft(contractId, {
      ...(existingContract || {}),
      referenceCode: target.referenceCode,
      service: target.service,
      title: target.title,
      location: target.location,
      city: target.city || "London",
      country: target.country || "UK",
      urgency: target.urgency || "Standard",
      homeownerId: user.id || target.homeownerId || "",
      homeownerName: user.name || target.homeownerName,
      homeownerPhone: user.phone || target.homeownerPhone || "+44 20 7946 0812",
      homeownerEmail: user.email || target.homeownerEmail || "",
      homeownerAddress: target.location,
      proId: acceptedProp?.proId || existingContract?.proId || proId,
      proName: acceptedProp?.proName || existingContract?.proName || "Trade Specialist",
      proPhone: acceptedProp?.phone || existingContract?.proPhone || "+44 20 7946 0812",
      proEmail: acceptedProp?.proEmail || existingContract?.proEmail || "",
      status: "ACTIVE",
      agreedPrice: resolvedPrice,
      priceNumeric: numericPrice,
      totalAmount: numericPrice,
      serviceDate: existingContract?.serviceDate || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      serviceTime: existingContract?.serviceTime || "09:00 AM",
      warrantyPeriod: existingContract?.warrantyPeriod || "12 Months Workmanship Guarantee",
      providedServices: existingContract?.providedServices || ["Standard trade inspection", "Agreed service & fitting"],
      providedEquipments: existingContract?.providedEquipments || ["Certified trade materials", "Standard trade consumables"],
      approvedByHomeownerAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      homeownerSignature: user.name || "Homeowner Signed",
    });

    setActiveTab("ONGOING");
    toast.success("Contractor proposal accepted! An active contract has been created and this job has moved to Ongoing Contracts.");
  };

  const handleCompleteAndReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingJob) return;

    const acceptedProp = reviewingJob.proposals.find((p) => p.status === "ACCEPTED");
    const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    const authorName = user?.name || (isDemo ? "Sarah Jenkins" : "Homeowner");
    const commentText = reviewComment || "Job completed strictly to specification. Verified contractor.";
    const resolvedPrice = acceptedProp ? acceptedProp.price : reviewingJob.finalCost || "£145.00";
    const numericPrice = parseFloat(resolvedPrice.replace(/[^0-9.]/g, "")) || 145;

    await updateJob(reviewingJob.referenceCode, {
      status: "COMPLETED",
      completedDate: dateStr,
      finalCost: resolvedPrice,
      reviewLeft: {
        rating: reviewRating,
        comment: commentText,
      },
    });

    // Ensure contract is stored as PAID/COMPLETED in contract-store & Neon DB for contractor earnings
    const matchedContract = storeContracts.find(
      (c) => c.referenceCode === reviewingJob.referenceCode || c.id === reviewingJob.id
    );
    const contractId = matchedContract ? matchedContract.id : `cnt_${reviewingJob.id}`;

    updateDraft(contractId, {
      ...(matchedContract || {}),
      referenceCode: reviewingJob.referenceCode,
      service: reviewingJob.service,
      title: reviewingJob.title,
      location: reviewingJob.location,
      city: reviewingJob.city || "London",
      country: reviewingJob.country || "UK",
      homeownerId: user?.id || reviewingJob.homeownerId || "",
      homeownerName: user?.name || reviewingJob.homeownerName,
      homeownerEmail: user?.email || reviewingJob.homeownerEmail || "",
      homeownerPhone: user?.phone || reviewingJob.homeownerPhone,
      homeownerAddress: reviewingJob.location,
      proId: acceptedProp?.proId || matchedContract?.proId || "pro_custom",
      proName: acceptedProp?.proName || matchedContract?.proName || "Trade Specialist",
      proEmail: acceptedProp?.proEmail || matchedContract?.proEmail || "",
      proPhone: acceptedProp?.phone || matchedContract?.proPhone || "",
      status: "PAID",
      agreedPrice: resolvedPrice,
      priceNumeric: numericPrice,
      totalAmount: numericPrice,
      invoicePaidAt: dateStr,
      paymentMethod: "TradeConnect Protected Escrow (Card)",
      review: {
        rating: reviewRating,
        comment: commentText,
        author: authorName,
        date: dateStr,
      },
    });

    submitReview(contractId, {
      rating: reviewRating,
      title: `${reviewingJob.service} in ${reviewingJob.city || "London"}`,
      comment: commentText,
      author: authorName,
      city: reviewingJob.city || "London",
    });

    setReviewingJob(null);
    setActiveTab("HISTORY");
    toast.success("Contract finalized and verified review published! Payment released to contractor and receipt stored in Contract History.");
  };

  // Dedicated data slicing strictly for the current homeowner
  const quotingJobs = myJobs.filter((j) => j.status === "QUOTING");
  const ongoingContracts = myContracts.filter(
    (c) => c.status === "PENDING_APPROVAL" || c.status === "ACTIVE" || c.status === "INVOICED"
  );
  const inProgressJobs = myJobs.filter(
    (j) => j.status === "IN_PROGRESS" && !myContracts.some((c) => c.referenceCode === j.referenceCode)
  );
  const completedContracts = myContracts.filter((c) => c.status === "PAID" || c.status === "COMPLETED");
  const completedJobs = myJobs.filter((j) => j.status === "COMPLETED");

  const allHistoryItems = React.useMemo(() => {
    const list: {
      id: string;
      referenceCode: string;
      title: string;
      service: string;
      proName: string;
      displayCost: string;
      completedDate: string;
      review?: { rating: number; comment: string };
      rawContract?: JobContract;
      rawJob?: HomeownerJob;
    }[] = [];

    completedContracts.forEach((c) => {
      list.push({
        id: c.id,
        referenceCode: c.referenceCode,
        title: c.title,
        service: c.service,
        proName: c.proName,
        displayCost: c.agreedPrice || `${c.currency}${(c.totalAmount || c.priceNumeric).toFixed(2)}`,
        completedDate: c.invoicePaidAt?.split(",")[0] || c.serviceDate,
        review: c.review ? { rating: c.review.rating, comment: c.review.comment } : undefined,
        rawContract: c,
      });
    });

    completedJobs.forEach((j) => {
      if (!list.some((item) => item.referenceCode === j.referenceCode)) {
        list.push({
          id: j.id,
          referenceCode: j.referenceCode,
          title: j.title,
          service: j.service,
          proName: j.proposals.find((p) => p.status === "ACCEPTED")?.proName || "Trade Specialist",
          displayCost: j.finalCost || "£145.00",
          completedDate: j.completedDate || "Recently",
          review: j.reviewLeft ? { rating: j.reviewLeft.rating, comment: j.reviewLeft.comment } : undefined,
          rawJob: j,
        });
      }
    });

    return list;
  }, [completedContracts, completedJobs]);

  // Verified Badge Rule: Must complete at least 10 contracts successfully
  const completedContractsCount = allHistoryItems.length;
  const isHomeownerVerified = completedContractsCount >= 10;

  // Airtight Auth & Role Guard
  React.useEffect(() => {
    if (mounted) {
      if (!user) {
        router.replace("/auth/login?redirect=/dashboard/homeowner");
      } else if (user.role === "PRO") {
        router.replace("/dashboard/pro");
      }
    }
  }, [mounted, user, router]);

  // Shield dashboard UI from unauthenticated users or wrong role
  if (!mounted || !user || user.role === "PRO") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 border-4 border-[var(--brand)] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold text-[var(--text)]">Verifying Homeowner Authorization...</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          {!user ? "Please sign in to access your dashboard. Redirecting to login..." : "Redirecting to your contractor portal..."}
        </p>
      </div>
    );
  }

  return (
    <div className="section-light section-spacing">
      <div className="container-custom">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                Homeowner Dashboard
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--brand-light)] text-[var(--brand)]">
                Homeowner Account
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Manage your active service requests, review ongoing contracts, and download invoices.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary px-4 py-2.5 rounded-[var(--radius-sm)] text-xs font-bold inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Job Request</span>
            </button>
          </div>
        </div>

        {/* Homeowner Verified Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8" suppressHydrationWarning>
          <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">
              Signed Contracts
            </div>
            <div className="text-2xl font-bold text-[var(--text)] mt-1 font-serif" suppressHydrationWarning>
              {homeownerStats.signedContractsCount}
            </div>
            <div className="text-[11px] text-[var(--pine-accent)] font-semibold mt-0.5">
              Legally Binding
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">
              Completed Contracts
            </div>
            <div className="text-2xl font-bold text-[var(--text)] mt-1 font-serif" suppressHydrationWarning>
              {completedContractsCount}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-0.5" suppressHydrationWarning>
              {isHomeownerVerified ? "✓ Verified Status Unlocked" : `${10 - completedContractsCount} more to Verified Badge`}
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">
              Total Settled (Contract Work)
            </div>
            <div className="text-2xl font-bold text-[var(--text)] mt-1 font-mono" suppressHydrationWarning>
              {format(homeownerStats.totalSpent)}
            </div>
            <div className="text-[11px] text-[var(--pine-accent)] font-semibold mt-0.5">
              Excl. 5% Escrow Fee &bull; 0% Dispute
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">
              Escrow Protection
            </div>
            <div className="text-2xl font-bold text-emerald-700 mt-1 font-serif">
              Active
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
              TradeConnect Charter
            </div>
          </div>
        </div>

        {/* Tab Navigation & Currency Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--line)] mb-6 gap-3">
          <div className="flex overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("LISTINGS")}
              className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "LISTINGS"
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              <span suppressHydrationWarning>My Job Listings &amp; Quotes ({quotingJobs.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ONGOING")}
              className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "ONGOING"
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              <span suppressHydrationWarning>Ongoing Contracts ({ongoingContracts.length + inProgressJobs.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("HISTORY")}
              className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "HISTORY"
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              <span suppressHydrationWarning>Contract History &amp; Receipts ({allHistoryItems.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("PROFILE")}
              className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "PROFILE"
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              Profile &amp; Settings
            </button>
          </div>

          <div className="flex items-center space-x-1 p-1 rounded-lg bg-[var(--surface)] border border-[var(--line)] text-xs shrink-0 self-start sm:self-center mb-2 sm:mb-0 shadow-2xs">
            <span className="text-[10px] text-[var(--text-muted)] font-bold px-1.5 uppercase">Currency:</span>
            {(["GBP", "USD", "EUR"] as const).map((currCode) => (
              <button
                key={currCode}
                type="button"
                onClick={() => setCurrency(currCode)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                  currency === currCode
                    ? "bg-[var(--accent)] text-white shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {currCode === "GBP" ? "£ GBP" : currCode === "USD" ? "$ USD" : "€ EUR"}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: JOB LISTINGS & QUOTES */}
        {activeTab === "LISTINGS" && (
          <div className="space-y-6">
            {/* Action Required Banners for Drafts & Invoices */}
            {myContracts.some((c) => c.status === "PENDING_APPROVAL") && (
              <div className="p-4 rounded-[var(--radius)] bg-amber-500/10 border-2 border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                  <div>
                    <span className="font-bold text-amber-900 dark:text-amber-200 block">
                      Contractor submitted a formal contract draft for your review!
                    </span>
                    <span className="text-[11px] text-amber-700 dark:text-amber-300">
                      Review proposed arrival date, warranty and services, then sign digitally.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("ONGOING")}
                  className="px-3.5 py-1.5 rounded-[var(--radius-sm)] bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 inline-flex items-center space-x-1 cursor-pointer shadow-xs"
                >
                  <span>Review &amp; Approve Contract &rarr;</span>
                </button>
              </div>
            )}

            {myContracts.some((c) => c.status === "INVOICED") && (
              <div className="p-4 rounded-[var(--radius)] bg-emerald-500/10 border-2 border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
                      Contractor has issued a final service invoice! Work completed.
                    </span>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-300">
                      Settle payment via TradeConnect Escrow and leave your verified homeowner review.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("ONGOING")}
                  className="px-3.5 py-1.5 rounded-[var(--radius-sm)] bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shrink-0 inline-flex items-center space-x-1 cursor-pointer shadow-xs"
                >
                  <span>Pay Invoice &amp; Leave Review &rarr;</span>
                </button>
              </div>
            )}

            {quotingJobs.length === 0 ? (
              <div className="p-12 text-center rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] space-y-3">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-alt)] border border-[var(--line)] flex items-center justify-center mx-auto text-[var(--accent)]">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[var(--text)]">No Active Job Requests</h3>
                <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
                  You do not have any open listings receiving quotes. Click below to publish a service request to local verified trade professionals.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="btn-primary px-4 py-2 rounded-[var(--radius-sm)] text-xs font-bold cursor-pointer inline-flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post a New Job Request</span>
                </button>
              </div>
            ) : (
              quotingJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--line-subtle)] gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-[var(--brand)]">
                          {job.referenceCode}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--bg-alt)] text-[var(--text-muted)]">
                          {job.service}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                          Receiving Quotes ({job.proposals.length})
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[var(--text)] mt-1.5">
                        {job.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        {job.description} &bull; <strong className="text-[var(--text)]">{job.location}</strong>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-xs text-[var(--text-muted)] text-left sm:text-right mr-2">
                        <span>Posted {job.datePosted}</span>
                        <span className="block text-[11px] text-[var(--text-light)]">Urgency: {job.urgency}</span>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(job)}
                          className="p-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-[var(--text)] transition-colors cursor-pointer text-xs inline-flex items-center space-x-1"
                          title="Edit job details"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[var(--accent)]" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteJob(job.id, job.referenceCode)}
                          className="p-1.5 rounded-[var(--radius-sm)] border border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer text-xs font-bold inline-flex items-center space-x-1"
                          title="Delete this job listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Listing</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Proposals received from pros */}
                  <div className="mt-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                      Contractor Proposals ({job.proposals.length})
                    </h4>

                    {job.proposals.length === 0 ? (
                      <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] text-center text-xs text-[var(--text-muted)]">
                        Your job request has been dispatched to local contractors. Proposals will appear here with quoted rates and notes.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {job.proposals.map((prop, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)]/60 border border-[var(--line-subtle)] flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-xs sm:text-sm text-[var(--text)]">
                                  {prop.proName}
                                </span>
                                <span className="flex items-center text-xs font-bold text-[var(--accent)]">
                                  <Star className="w-3 h-3 fill-[var(--accent)] mr-0.5" />
                                  {prop.rating}
                                </span>
                              </div>
                              <p className="text-xs text-[var(--text-muted)]">
                                &ldquo;{prop.notes}&rdquo;
                              </p>
                              <div className="text-[11px] text-[var(--text-light)] flex items-center space-x-3 pt-0.5">
                                <span className="flex items-center">
                                  <Phone className="w-3 h-3 mr-1 text-[var(--accent)]" />
                                  {prop.phone}
                                </span>
                                <span>&middot;</span>
                                <span className="flex items-center text-[var(--pine-accent)] font-semibold">
                                  <ShieldCheck className="w-3 h-3 mr-1" />
                                  Insurance Verified
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 shrink-0">
                              <div className="text-left sm:text-right pr-2">
                                <span className="text-[10px] text-[var(--text-light)] block uppercase">Quote Price</span>
                                <span className="font-extrabold text-sm text-[var(--text)] font-mono">{format(prop.price)}</span>
                              </div>

                              <div className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveNegotiation({
                                      jobId: job.id,
                                      proId: prop.proId,
                                      proName: prop.proName,
                                      jobTitle: job.title,
                                      referenceCode: job.referenceCode,
                                      currentPrice: prop.price,
                                    })
                                  }
                                  className="px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-xs font-semibold text-[var(--text)] inline-flex items-center space-x-1 cursor-pointer transition-colors"
                                  title="Private End-to-End Encrypted Bargaining"
                                >
                                  <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                  <span>Negotiate / Message</span>
                                  {unreadMap[job.referenceCode] > 0 && (
                                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-red-600 text-white font-extrabold text-[9px] animate-pulse">
                                      {unreadMap[job.referenceCode]} new
                                    </span>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleAcceptProposal(job.id, prop.proId)}
                                  className="btn-primary px-3.5 py-2 rounded-[var(--radius-sm)] text-xs font-bold cursor-pointer"
                                >
                                  Accept &amp; Hire
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: ONGOING CONTRACTS */}
        {activeTab === "ONGOING" && (
          <div className="space-y-6">
            {ongoingContracts.length === 0 && inProgressJobs.length === 0 ? (
              <div className="p-12 text-center rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] space-y-3">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-alt)] border border-[var(--line)] flex items-center justify-center mx-auto text-[var(--brand)]">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[var(--text)]">No Ongoing Contracts</h3>
                <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
                  When you accept a contractor quote and sign their contract draft, it moves here so you can monitor live progress, schedule arrival, and view the legal contract.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("LISTINGS")}
                  className="btn-primary px-4 py-2 rounded-[var(--radius-sm)] text-xs font-bold cursor-pointer"
                >
                  View Open Quotes
                </button>
              </div>
            ) : (
              <>
                {/* 1. PENDING APPROVAL DRAFTS */}
                {myContracts.filter((c) => c.status === "PENDING_APPROVAL").map((draft) => (
                  <div
                    key={draft.id}
                    className="p-5 sm:p-6 rounded-[var(--radius-lg)] bg-amber-500/10 border-2 border-amber-500/40 shadow-soft space-y-4 animate-in fade-in duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="font-mono text-xs font-bold text-amber-900 dark:text-amber-300">
                            {draft.referenceCode}
                          </span>
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500 text-white">
                            Action Required: Review Draft Contract
                          </span>
                          {unreadMap[draft.referenceCode] > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-600 text-white animate-pulse inline-flex items-center space-x-1 shadow-xs">
                              <span>💬 {unreadMap[draft.referenceCode]} New Messages</span>
                            </span>
                          )}
                          <span className="text-xs text-[var(--text-muted)]">
                            Submitted by <strong>{draft.proName}</strong>
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[var(--text)]">
                          {draft.title}
                        </h3>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">
                          Contract Work Price
                        </span>
                        <span className="text-xl font-black text-amber-700 dark:text-amber-400 font-mono">
                          {format(draft.subtotalAmount || draft.priceNumeric)}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">
                          +5% Platform Fee: {format(draft.platformFeeAmount ?? ((draft.subtotalAmount || draft.priceNumeric) * 0.05))}
                        </span>
                        <span className="text-[11px] font-bold text-[var(--text)] block font-mono">
                          Total Payable: {format(draft.totalAmount || ((draft.subtotalAmount || draft.priceNumeric) * 1.05))}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-amber-200 dark:border-amber-900/40 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] block">
                          Proposed Schedule
                        </span>
                        <span className="font-semibold text-[var(--text)]">
                          {draft.serviceDate} at {draft.serviceTime}
                        </span>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                          Warranty: {draft.warrantyPeriod}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] block">
                          Services &amp; Equipment Included
                        </span>
                        <span className="text-[11px] text-[var(--text)] font-medium">
                          {draft.providedServices?.length || 2} labor tasks &bull; {draft.providedEquipments?.length || 2} replacement materials
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleOpenDraftDoc(draft)}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-xs font-semibold text-[var(--text)] cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-zinc-600" />
                          <span>Download Draft PDF</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveNegotiation({
                              jobId: draft.id,
                              proId: draft.proId,
                              proName: draft.proName,
                              jobTitle: draft.title,
                              referenceCode: draft.referenceCode,
                              currentPrice: draft.agreedPrice,
                            })
                          }
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-xs font-semibold text-[var(--text)] cursor-pointer"
                        >
                          <Lock className="w-3 h-3 text-emerald-600" />
                          <span>Message Contractor</span>
                          {unreadMap[draft.referenceCode] > 0 && (
                            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-red-600 text-white font-extrabold text-[9px] animate-pulse">
                              {unreadMap[draft.referenceCode]} new
                            </span>
                          )}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setApprovingContract(draft);
                          setIsApprovalModalOpen(true);
                        }}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-[var(--radius-sm)] bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Review &amp; Approve Draft Contract</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* 2. INVOICED CONTRACTS */}
                {myContracts.filter((c) => c.status === "INVOICED").map((invoiced) => (
                  <div
                    key={invoiced.id}
                    className="p-5 sm:p-6 rounded-[var(--radius-lg)] bg-emerald-500/10 border-2 border-emerald-500/40 shadow-soft space-y-4 animate-in fade-in duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="font-mono text-xs font-bold text-emerald-900 dark:text-emerald-300">
                            Invoice #{invoiced.invoiceNumber || "INV-FINAL"}
                          </span>
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-700 text-white">
                            Work Completed &bull; Payment Due
                          </span>
                          {unreadMap[invoiced.referenceCode] > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-600 text-white animate-pulse inline-flex items-center space-x-1 shadow-xs">
                              <span>💬 {unreadMap[invoiced.referenceCode]} New Messages</span>
                            </span>
                          )}
                          <span className="text-xs text-[var(--text-muted)]">
                            From <strong>{invoiced.proName}</strong>
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[var(--text)]">
                          {invoiced.title}
                        </h3>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">
                          Contract Work Price
                        </span>
                        <span className="text-xl font-black text-[var(--text)] font-mono">
                          {format(invoiced.subtotalAmount || invoiced.priceNumeric)}
                        </span>
                        <span className="text-[10px] text-zinc-500 block mt-0.5">
                          +5% Platform Fee: {format(invoiced.platformFeeAmount ?? ((invoiced.subtotalAmount || invoiced.priceNumeric) * 0.05))}
                        </span>
                        <span className="text-lg font-black text-emerald-700 dark:text-emerald-400 font-mono block">
                          Total Due: {format(invoiced.totalAmount || ((invoiced.subtotalAmount || invoiced.priceNumeric) * 1.05))}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-emerald-200 dark:border-emerald-900/40 flex justify-between items-center text-xs">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] block">
                          Itemized Breakdown
                        </span>
                        <span className="text-zinc-700 dark:text-zinc-300 text-[11px]">
                          Labour: {format(invoiced.labourAmount ?? Math.round(invoiced.priceNumeric * 0.7))} &bull; Materials: {format(invoiced.materialsAmount ?? Math.round(invoiced.priceNumeric * 0.3))}
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        100% Escrow Protection Guaranteed
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleOpenDraftDoc(invoiced)}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-xs font-semibold text-[var(--text)] cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-zinc-600" />
                          <span>Download Invoice PDF</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveNegotiation({
                              jobId: invoiced.id,
                              proId: invoiced.proId,
                              proName: invoiced.proName,
                              jobTitle: invoiced.title,
                              referenceCode: invoiced.referenceCode,
                              currentPrice: invoiced.agreedPrice,
                            })
                          }
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-xs font-semibold text-[var(--text)] cursor-pointer"
                        >
                          <Lock className="w-3 h-3 text-emerald-600" />
                          <span>Message Contractor</span>
                          {unreadMap[invoiced.referenceCode] > 0 && (
                            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-red-600 text-white font-extrabold text-[9px] animate-pulse">
                              {unreadMap[invoiced.referenceCode]} new
                            </span>
                          )}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPayingReviewContract(invoiced);
                          setPayReviewMode("PAY_AND_REVIEW");
                          setIsPayReviewModalOpen(true);
                        }}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-[var(--radius-sm)] bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                      >
                        <Receipt className="w-4 h-4" />
                        <span>Pay Invoice &amp; Leave Review ({format(invoiced.totalAmount || ((invoiced.subtotalAmount || invoiced.priceNumeric) * 1.05))})</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* 3. ACTIVE SIGNED ONGOING CONTRACTS */}
                {myContracts.filter((c) => c.status === "ACTIVE").map((contract) => (
                  <div
                    key={contract.id}
                    className="rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft p-6 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--line-subtle)] gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-[var(--brand)]">
                            {contract.referenceCode}
                          </span>
                          <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                            Contract Active &bull; In Progress
                          </span>
                          {unreadMap[contract.referenceCode] > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-600 text-white animate-pulse inline-flex items-center space-x-1 shadow-xs">
                              <span>💬 {unreadMap[contract.referenceCode]} New Messages</span>
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-[var(--text)] mt-1.5">
                          {contract.title}
                        </h3>
                      </div>

                      <div className="text-xs text-left sm:text-right">
                        <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">Contract Work Price</span>
                        <span className="text-lg font-black text-[var(--text)] font-mono">{format(contract.subtotalAmount || contract.priceNumeric)}</span>
                        <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">
                          +5% Platform Fee: {format(contract.platformFeeAmount ?? ((contract.subtotalAmount || contract.priceNumeric) * 0.05))}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono block">
                          Total Escrow: {format(contract.totalAmount || ((contract.subtotalAmount || contract.priceNumeric) * 1.05))}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs p-3.5 rounded bg-[var(--bg-alt)] border border-[var(--line-subtle)]">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">Contractor Assigned</span>
                        <span className="font-bold text-[var(--text)]">{contract.proName}</span>
                        <span className="block text-[11px] text-[var(--text-muted)]">{contract.proLicense}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">Scheduled Service Date</span>
                        <span className="font-bold text-[var(--text)]">{contract.serviceDate} ({contract.serviceTime})</span>
                        <span className="block text-[11px] text-emerald-700 font-semibold">{contract.warrantyPeriod}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">Emergency Contact</span>
                        <span className="font-bold text-[var(--text)] flex items-center mt-0.5">
                          <Phone className="w-3 h-3 mr-1 text-[var(--accent)]" />
                          {contract.proPhone}
                        </span>
                        <span className="block text-[11px] text-[var(--text-muted)]">{contract.proInsurance}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--line-subtle)]">
                      <button
                        type="button"
                        onClick={() => handleOpenDraftDoc(contract)}
                        className="btn-secondary px-3.5 py-2 rounded-[var(--radius-sm)] text-xs font-semibold inline-flex items-center space-x-1.5 cursor-pointer shadow-xs"
                      >
                        <Printer className="w-3.5 h-3.5 text-[var(--brand)]" />
                        <span>View Contract PDF &amp; Terms</span>
                      </button>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveNegotiation({
                              jobId: contract.id,
                              proId: contract.proId,
                              proName: contract.proName,
                              jobTitle: contract.title,
                              referenceCode: contract.referenceCode,
                              currentPrice: contract.agreedPrice,
                            })
                          }
                          className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] hover:bg-[var(--line-subtle)] border border-[var(--line)] text-[var(--text)] font-semibold text-xs inline-flex items-center space-x-1 cursor-pointer"
                        >
                          <Lock className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                          <span>Message</span>
                          {unreadMap[contract.referenceCode] > 0 && (
                            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-red-600 text-white font-extrabold text-[9px] animate-pulse">
                              {unreadMap[contract.referenceCode]}
                            </span>
                          )}
                        </button>

                        <a
                          href={`tel:${contract.proPhone}`}
                          className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] hover:bg-[var(--line-subtle)] border border-[var(--line)] text-[var(--text)] font-semibold text-xs inline-flex items-center space-x-1"
                        >
                          <Phone className="w-3.5 h-3.5 mr-1 text-[var(--accent)]" />
                          <span>Call Contractor</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            setPayingReviewContract(contract);
                            setPayReviewMode("PAY_AND_REVIEW");
                            setIsPayReviewModalOpen(true);
                          }}
                          className="btn-primary px-3.5 py-2 rounded-[var(--radius-sm)] text-xs font-bold inline-flex items-center space-x-1 shadow-xs cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Complete &amp; Release Escrow Payment</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 4. IN-PROGRESS JOBS WITHOUT FORMAL STORE CONTRACT */}
                {inProgressJobs.map((job) => (
                  <div
                    key={job.id}
                    className="rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--line-subtle)] gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-[var(--brand)]">
                            {job.referenceCode}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                            Contract In Progress
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[var(--text)] mt-1.5">
                          {job.title}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{job.location}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleOpenContract(job)}
                          className="btn-secondary px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-semibold inline-flex items-center space-x-1 cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5 text-[var(--accent)]" />
                          <span>View Contract</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setReviewingJob(job)}
                          className="btn-primary px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-bold inline-flex items-center space-x-1 shadow-xs cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Complete &amp; Review</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* TAB 3: CONTRACT HISTORY & COMPLETED JOBS */}
        {activeTab === "HISTORY" && (
          <div className="space-y-4">
            {allHistoryItems.length === 0 ? (
              <div className="p-12 text-center rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] space-y-3">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-alt)] border border-[var(--line)] flex items-center justify-center mx-auto text-[var(--accent)]">
                  <Receipt className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[var(--text)]">No Contract History Yet</h3>
                <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
                  Completed contracts, official service invoice receipts, and contractor reviews will be archived here.
                </p>
              </div>
            ) : (
              allHistoryItems.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--line-subtle)] gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-[var(--brand)]">
                            {item.referenceCode}
                          </span>
                          <span className="inline-flex items-center text-[10px] font-bold text-[var(--pine-accent)] bg-[var(--brand-light)] px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed &amp; Settled
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[var(--text)] mt-1">
                          {item.title}
                        </h3>
                      </div>

                      <div className="text-xs text-[var(--text-muted)] text-left sm:text-right">
                        <span>Completed on {item.completedDate}</span>
                        {(() => {
                          const fin = getContractFinancials(item.rawContract || item.rawJob);
                          return (
                            <div className="mt-1">
                              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">
                                Contract Work Price
                              </span>
                              <span className="font-extrabold text-sm text-[var(--text)] font-mono">
                                {format(fin.contractPrice)}
                              </span>
                              <span className="text-[10px] text-[var(--text-muted)] block">
                                +5% Platform Fee: {format(fin.platformFee)} &bull; Total Settled: {format(fin.totalGross)}
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                      <div>
                        <span className="text-[11px] text-[var(--text-light)] block">Hired Contractor:</span>
                        <span className="font-bold text-[var(--text)]">
                          {item.proName}
                        </span>
                        {item.review && (
                          <div className="mt-2 p-3 rounded-[var(--radius-sm)] bg-[var(--bg-alt)]/50 border border-[var(--line-subtle)] text-xs text-[var(--text-muted)]">
                            <div className="flex items-center text-[var(--accent)] mb-1">
                              {[...Array(item.review.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-[var(--accent)]" />
                              ))}
                              <span className="text-[10px] font-semibold text-[var(--text-light)] ml-1.5">
                                Verified Review Left
                              </span>
                            </div>
                            &ldquo;{item.review.comment}&rdquo;
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (item.rawContract) {
                            handleOpenDraftDoc(item.rawContract);
                          } else if (item.rawJob) {
                            handleOpenInvoice(item.rawJob);
                          }
                        }}
                        className="btn-secondary px-3.5 py-2 rounded-[var(--radius-sm)] text-xs font-semibold inline-flex items-center space-x-1.5 self-start md:self-center cursor-pointer shadow-xs"
                        title="View and print official service invoice as PDF"
                      >
                        <Printer className="w-3.5 h-3.5 text-[var(--brand)]" />
                        <span>View &amp; Print Official PDF Invoice</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 4: PROFILE & SETTINGS */}
        {activeTab === "PROFILE" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Verification Badge Card */}
            <div className="space-y-6">
              <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--brand-light)] text-[var(--brand)] font-bold text-lg flex items-center justify-center border border-[var(--line)]">
                    {user?.avatar || (user?.name ? user.name.substring(0, 2).toUpperCase() : "HM")}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[var(--text)]">{user?.name || (isDemo ? "Sarah Jenkins" : "Homeowner")}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{user?.email || (isDemo ? "sarah.jenkins@example.co.uk" : "")}</p>
                  </div>
                </div>

                {/* Verified Milestone Card */}
                {(() => {
                  const safeCount = mounted ? completedContractsCount : 0;
                  const safeVerified = safeCount >= 10;
                  return (
                    <div className="p-4 rounded-[var(--radius)] bg-[var(--bg-alt)] border border-[var(--line-subtle)] space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[var(--text)] flex items-center">
                          {safeVerified ? (
                            <>
                              <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
                              <span>Verified Homeowner Status</span>
                            </>
                          ) : (
                            <>
                              <ShieldAlert className="w-4 h-4 text-amber-600 mr-1.5" />
                              <span>Verification Progress</span>
                            </>
                          )}
                        </span>
                        <span className="font-mono font-bold text-xs">
                          {safeCount} / 10
                        </span>
                      </div>

                      {/* Visual Progress Bar */}
                      <div className="w-full bg-[var(--surface)] h-2.5 rounded-full overflow-hidden border border-[var(--line)]">
                        <div
                          className={`h-full transition-all duration-300 ${
                            safeVerified ? "bg-emerald-600" : "bg-amber-500"
                          }`}
                          style={{ width: `${Math.min(100, (safeCount / 10) * 100)}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                        {safeVerified ? (
                          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                            ✓ Milestone Achieved: You have successfully completed 10+ contracts and unlocked the Verified Homeowner Badge on TradeConnect.
                          </span>
                        ) : (
                          <span>
                            Complete <strong>{Math.max(0, 10 - safeCount)} more contracts</strong> to unlock the official TradeConnect Verified Homeowner Badge.
                          </span>
                        )}
                      </p>
                    </div>
                  );
                })()}
              </div>

              {/* Security & Protection Summary */}
              <div className="p-5 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] text-xs space-y-2">
                <span className="font-bold uppercase tracking-wider text-[10px] text-[var(--text-muted)] block">
                  Account Protection
                </span>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  Your payments are locked in TradeConnect Protected Escrow until you review and confirm satisfactory completion of each job.
                </p>
              </div>
            </div>

            {/* Right Column: Edit Profile Details & Danger Zone */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Details Form */}
              <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-4">
                <div className="border-b border-[var(--line)] pb-3">
                  <h3 className="font-bold text-sm text-[var(--text)]">Edit Personal Details</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Update your contact information used when publishing jobs and generating legal service contracts.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[var(--text)] mb-1">Full Legal Name *</label>
                      <input
                        type="text"
                        required
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[var(--text)] mb-1">Contact Phone Number *</label>
                      <input
                        type="text"
                        required
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block font-bold text-[var(--text)]">Email Address (Permanent)</label>
                        <span className="text-[10px] text-[var(--text-muted)] flex items-center font-normal">
                          <Lock className="w-3 h-3 mr-1 text-[var(--accent)]" />
                          Cannot be edited
                        </span>
                      </div>
                      <input
                        type="email"
                        disabled
                        readOnly
                        value={user?.email || profileEmail}
                        className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text-muted)] cursor-not-allowed select-none font-medium opacity-80"
                        title="Your account sign-in email address cannot be changed."
                      />
                      <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
                        Account email remains permanent as registered upon sign in.
                      </span>
                    </div>

                    <div>
                      <label className="block font-bold text-[var(--text)] mb-1">City / Region *</label>
                      <input
                        type="text"
                        required
                        value={profileCity}
                        onChange={(e) => setProfileCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[var(--text)] mb-1">Primary Street Address (Job Location Default) *</label>
                    <input
                      type="text"
                      required
                      value={profileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                      placeholder="e.g. 14 Cranbury Road, Fulham, London SW6 2PY"
                      className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="btn-primary px-5 py-2 rounded-[var(--radius-sm)] text-xs font-bold inline-flex items-center space-x-1.5 cursor-pointer shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Profile Details</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Danger Zone: Account Deletion */}
              <div className="p-6 rounded-[var(--radius-lg)] bg-red-500/5 border border-red-500/30 space-y-3">
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <h4 className="font-extrabold text-xs uppercase tracking-wider">Danger Zone &bull; Account Deletion</h4>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Permanently delete your homeowner profile, open job listings, and contract history. You will be prompted to authenticate this decision with your account password.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setIsDeleteAccountModalOpen(true)}
                    className="px-4 py-2 rounded-[var(--radius-sm)] border border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-colors text-xs font-bold inline-flex items-center space-x-1.5 cursor-pointer shadow-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Homeowner Profile &amp; Account...</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: CREATE NEW JOB REQUEST */}
        {isCreateModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
          >
            <div className="fixed inset-0" onClick={() => setIsCreateModalOpen(false)} aria-hidden="true" />
            <div className="relative z-10 w-full max-w-lg max-h-[88vh] flex flex-col bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--line)] shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[var(--line)] shrink-0">
                <h3 className="text-base font-bold text-[var(--text)]">Post New Home Service Job</h3>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-1 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateJob} className="flex flex-col flex-1 min-h-0 overflow-hidden">
                <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">
                      Job Title / Short Summary *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Leaking radiator valve in living room"
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[var(--text)] mb-1">Trade Category</label>
                      <select
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat.slug} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[var(--text)] mb-1">Urgency</label>
                      <select
                        value={newUrgency}
                        onChange={(e) => setNewUrgency(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                      >
                        <option value="Emergency">🚨 Emergency (Today)</option>
                        <option value="Within 48 hours">Within 48 Hours</option>
                        <option value="Flexible">Flexible (Next week)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">Location / Postcode</label>
                    <input
                      type="text"
                      required
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Fulham, London (SW6 2PY)"
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 p-3.5 sm:p-4 border-t border-[var(--line)] bg-[var(--surface)] shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-5 py-2.5 rounded-[var(--radius-sm)] text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Publish Job to Contractors
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: EDIT EXISTING JOB */}
        {editingJob && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
          >
            <div className="fixed inset-0" onClick={() => setEditingJob(null)} aria-hidden="true" />
            <div className="relative z-10 w-full max-w-md max-h-[88vh] flex flex-col bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--line)] shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[var(--line)] shrink-0">
                <h3 className="text-base font-bold text-[var(--text)]">Edit Job Details</h3>
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="p-1 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
                <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">Job Summary</label>
                    <input
                      type="text"
                      required
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">Urgency Level</label>
                    <select
                      value={editUrgency}
                      onChange={(e) => setEditUrgency(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                    >
                      <option value="Emergency">🚨 Emergency (Today)</option>
                      <option value="Within 48 hours">Within 48 Hours</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 p-3.5 sm:p-4 border-t border-[var(--line)] bg-[var(--surface)] shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditingJob(null)}
                    className="px-4 py-2 text-xs font-semibold text-[var(--text-muted)] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-brand px-5 py-2.5 rounded-[var(--radius-sm)] text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: COMPLETE CONTRACT & LEAVE REVIEW */}
        {reviewingJob && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
          >
            <div className="fixed inset-0" onClick={() => setReviewingJob(null)} aria-hidden="true" />
            <div className="relative z-10 w-full max-w-md max-h-[88vh] flex flex-col bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--line)] shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[var(--line)] shrink-0">
                <h3 className="text-base font-bold text-[var(--text)]">Finalize Contract &amp; Review</h3>
                <button
                  type="button"
                  onClick={() => setReviewingJob(null)}
                  className="p-1 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCompleteAndReview} className="flex flex-col flex-1 min-h-0 overflow-hidden">
                <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">Contractor Rating</label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="cursor-pointer p-1"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= reviewRating ? "fill-amber-400 text-amber-500" : "text-[var(--line)]"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-[var(--text)] ml-2">{reviewRating} / 5 Stars</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">Review Comments</label>
                    <textarea
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="How was the punctuality, craftsmanship, and tidiness of the contractor?"
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 p-3.5 sm:p-4 border-t border-[var(--line)] bg-[var(--surface)] shrink-0">
                  <button
                    type="button"
                    onClick={() => setReviewingJob(null)}
                    className="px-4 py-2 text-xs font-semibold text-[var(--text-muted)] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-5 py-2.5 rounded-[var(--radius-sm)] text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Submit Review &amp; Complete Contract
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 4: OFFICIAL PRINTABLE INVOICE / CONTRACT */}
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

        {/* MODAL 5: END-TO-END ENCRYPTED BARGAINING CHAT */}
        {activeNegotiation && (
          <NegotiationModal
            key={activeNegotiation.referenceCode}
            isOpen={Boolean(activeNegotiation)}
            onClose={() => setActiveNegotiation(null)}
            jobTitle={activeNegotiation.jobTitle}
            referenceCode={activeNegotiation.referenceCode}
            currentPrice={activeNegotiation.currentPrice}
            counterpartName={activeNegotiation.proName}
            counterpartRole="CONTRACTOR"
            onPriceAgreed={handlePriceAgreed}
          />
        )}

        {/* MODAL 6: HOMEOWNER CONTRACT APPROVAL & SIGNING */}
        {approvingContract && (
          <ContractApprovalModal
            isOpen={isApprovalModalOpen}
            onClose={() => {
              setIsApprovalModalOpen(false);
              setApprovingContract(null);
            }}
            contract={approvingContract}
            onDownloadPdf={(c) => handleOpenDraftDoc(c)}
            onApproved={async (approved) => {
              setIsApprovalModalOpen(false);
              setApprovingContract(null);
              await updateJob(approved.referenceCode, {
                status: "IN_PROGRESS",
                finalCost: approved.agreedPrice,
              });
              setActiveTab("ONGOING");
            }}
          />
        )}

        {/* MODAL 7: HOMEOWNER INVOICE PAYMENT & TESTIMONIAL REVIEW */}
        {payingReviewContract && (
          <HomeownerReviewModal
            isOpen={isPayReviewModalOpen}
            onClose={() => {
              setIsPayReviewModalOpen(false);
              setPayingReviewContract(null);
            }}
            contract={payingReviewContract}
            mode={payReviewMode}
            onCompleted={async (completedContract) => {
              setIsPayReviewModalOpen(false);
              setPayingReviewContract(null);
              await updateJob(completedContract.referenceCode, {
                status: "COMPLETED",
                finalCost: completedContract.agreedPrice,
                completedDate: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
                reviewLeft: completedContract.review ? {
                  rating: completedContract.review.rating,
                  comment: completedContract.review.comment,
                } : undefined,
              });
              setActiveTab("HISTORY");
            }}
          />
        )}

        {/* MODAL 8: SECURE PASSWORD-AUTHENTICATED ACCOUNT DELETION */}
        <DeleteAccountModal
          isOpen={isDeleteAccountModalOpen}
          onClose={() => setIsDeleteAccountModalOpen(false)}
          role="HOMEOWNER"
        />
      </div>
    </div>
  );
}
