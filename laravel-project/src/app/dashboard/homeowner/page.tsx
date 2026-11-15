"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  Star,
  MapPin,
  Phone,
  Plus,
  Edit3,
  Trash2,
  X,
  Printer,
  Lock,
} from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";
import {
  InvoiceContractModal,
  InvoiceContractData,
} from "@/components/documents/invoice-contract-document";
import { NegotiationModal } from "@/components/chat/negotiation-modal";

interface QuoteProposal {
  proId: string;
  proName: string;
  rating: number;
  phone: string;
  price: string;
  notes: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED";
}

interface HomeownerJob {
  id: string;
  referenceCode: string;
  service: string;
  title: string;
  location: string;
  datePosted: string;
  urgency: string;
  status: "QUOTING" | "IN_PROGRESS" | "COMPLETED";
  proposals: QuoteProposal[];
  completedDate?: string;
  finalCost?: string;
  reviewLeft?: {
    rating: number;
    comment: string;
  };
}

const INITIAL_HOMEOWNER_JOBS: HomeownerJob[] = [
  {
    id: "job_1",
    referenceCode: "TC-849201",
    service: "Emergency Plumbing",
    title: "Burst pipe under master bathroom floorboards",
    location: "Fulham, London (SW6 2PY)",
    datePosted: "14 Nov 2026",
    urgency: "Emergency",
    status: "QUOTING",
    proposals: [
      {
        proId: "pro_uk_1",
        proName: "Apex Heating & Emergency Plumbing Ltd",
        rating: 4.96,
        phone: "+44 20 7946 0812",
        price: "£145 (All parts & labor included)",
        notes: "Can dispatch in 30 minutes. Van stocked with 15mm copper & press-fit valves.",
        status: "PENDING",
      },
      {
        proId: "pro_uk_4",
        proName: "Thames Valley Drainage & Plumbing",
        rating: 4.88,
        phone: "+44 20 8921 4410",
        price: "£160 (Fixed estimate)",
        notes: "Available this afternoon at 2pm. 12-month guarantee on replacement joint.",
        status: "PENDING",
      },
    ],
  },
  {
    id: "job_2",
    referenceCode: "TC-721094",
    service: "Certified Electricians",
    title: "10-Way dual RCD metal consumer unit upgrade & EICR",
    location: "Fulham, London (SW6 2PY)",
    datePosted: "02 Nov 2026",
    urgency: "Within 48 hours",
    status: "IN_PROGRESS",
    proposals: [
      {
        proId: "pro_uk_2",
        proName: "MCR Power & Electrical Solutions",
        rating: 4.92,
        phone: "+44 161 832 9410",
        price: "£520 (Parts, labor & certification)",
        notes: "Accepted by homeowner. Scheduled for inspection.",
        status: "ACCEPTED",
      },
    ],
  },
  {
    id: "job_3",
    referenceCode: "TC-591204",
    service: "Gas & Boiler Engineers",
    title: "Annual Worcester Bosch Combi Service & CP12 Certificate",
    location: "Fulham, London (SW6 2PY)",
    datePosted: "18 Oct 2026",
    completedDate: "19 Oct 2026",
    finalCost: "£95.00",
    urgency: "Flexible",
    status: "COMPLETED",
    proposals: [
      {
        proId: "pro_uk_1",
        proName: "Apex Heating & Emergency Plumbing Ltd",
        rating: 4.96,
        phone: "+44 20 7946 0812",
        price: "£95 (Full clean & flue test)",
        notes: "Completed successfully. Certificate emailed.",
        status: "ACCEPTED",
      },
    ],
    reviewLeft: {
      rating: 5,
      comment: "Arrived exactly on time, conducted thorough pressure and flue checks, and provided the official certificate before leaving. Very pleased.",
    },
  },
];

export default function HomeownerDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [jobs, setJobs] = React.useState<HomeownerJob[]>(INITIAL_HOMEOWNER_JOBS);
  const [activeTab, setActiveTab] = React.useState<"ACTIVE" | "HISTORY">("ACTIVE");

  // Document & Negotiation States
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

  const handleOpenInvoice = (job: HomeownerJob) => {
    const acceptedProp = job.proposals.find((p) => p.status === "ACCEPTED") || job.proposals[0];
    const docData: InvoiceContractData = {
      documentType: "INVOICE",
      documentNumber: `INV-${job.referenceCode.replace("TC-", "2026-")}`,
      issueDate: job.completedDate || job.datePosted,
      completionDate: job.completedDate,
      referenceCode: job.referenceCode,
      jobTitle: job.title,
      serviceCategory: job.service,
      location: job.location,
      agreedPrice: job.finalCost || acceptedProp?.price || "£145.00",
      paymentStatus: "PAID IN FULL",
      paymentMethod: "TradeConnect Protected Escrow",
      homeowner: {
        name: user ? user.name : "Sarah Jenkins",
        phone: "+44 20 7946 0812",
        address: job.location,
        email: user ? user.email : "sarah.jenkins@example.co.uk",
      },
      contractor: {
        companyName: acceptedProp?.proName || "Apex Heating & Emergency Plumbing Ltd",
        contactName: "David Thornton (Master Plumber)",
        licenseNumber: "Gas Safe #589214 &bull; NICEIC #D94812",
        insuranceAmount: "£2,000,000",
        baseCity: "London (SW6)",
        phone: acceptedProp?.phone || "+44 20 7946 0812",
      },
    };
    setSelectedDocData(docData);
    setIsDocModalOpen(true);
  };

  const handleOpenContract = (job: HomeownerJob) => {
    const acceptedProp = job.proposals.find((p) => p.status === "ACCEPTED") || job.proposals[0];
    const docData: InvoiceContractData = {
      documentType: "CONTRACT",
      documentNumber: `CNT-${job.referenceCode.replace("TC-", "2026-")}`,
      issueDate: job.datePosted,
      referenceCode: job.referenceCode,
      jobTitle: job.title,
      serviceCategory: job.service,
      location: job.location,
      agreedPrice: acceptedProp ? acceptedProp.price : "Pending Quote Agreement",
      paymentStatus: job.status === "IN_PROGRESS" ? "CONTRACT ACTIVE" : "ESCROW HELD",
      paymentMethod: "TradeConnect Milestone Escrow",
      homeowner: {
        name: user ? user.name : "Sarah Jenkins",
        phone: "+44 20 7946 0812",
        address: job.location,
        email: user ? user.email : "sarah.jenkins@example.co.uk",
      },
      contractor: {
        companyName: acceptedProp?.proName || "TradeConnect Verified Contractor Network",
        contactName: "Assigned Lead Contractor",
        licenseNumber: "Verified Trade Licensing Sync Active",
        insuranceAmount: "£2,000,000 Minimum",
        baseCity: "London",
        phone: acceptedProp?.phone || "+44 20 7946 0812",
      },
      milestones: [
        {
          title: "Initial diagnostic, safety isolation & materials procurement",
          amount: "£60.00",
          status: "COMPLETED",
        },
        {
          title: "Main installation & pressure safety testing",
          amount: acceptedProp ? acceptedProp.price : "£145.00",
          status: job.status === "COMPLETED" ? "COMPLETED" : "SCHEDULED",
        },
      ],
    };
    setSelectedDocData(docData);
    setIsDocModalOpen(true);
  };

  const handlePriceAgreed = (newPrice: string) => {
    if (!activeNegotiation) return;
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id === activeNegotiation.jobId) {
          return {
            ...job,
            proposals: job.proposals.map((prop) =>
              prop.proId === activeNegotiation.proId
                ? {
                    ...prop,
                    price: newPrice,
                    notes: `${prop.notes} [Negotiated rate accepted: ${newPrice}]`,
                  }
                : prop
            ),
          };
        }
        return job;
      })
    );
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = `TC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newJob: HomeownerJob = {
      id: `job_${Date.now()}`,
      referenceCode: newRef,
      service: newService,
      title: newTitle,
      location: newLocation,
      datePosted: "Just now",
      urgency: newUrgency,
      status: "QUOTING",
      proposals: [],
    };
    setJobs([newJob, ...jobs]);
    setIsCreateModalOpen(false);
    setNewTitle("");
    alert(`Job request ${newRef} has been published to verified trade contractors in your area!`);
  };

  const handleStartEdit = (job: HomeownerJob) => {
    setEditingJob(job);
    setEditTitle(job.title);
    setEditUrgency(job.urgency);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    setJobs((prev) =>
      prev.map((j) =>
        j.id === editingJob.id
          ? { ...j, title: editTitle, urgency: editUrgency }
          : j
      )
    );
    setEditingJob(null);
  };

  const handleDeleteJob = (jobId: string, referenceCode: string) => {
    if (confirm(`Are you sure you want to cancel and delete job request ${referenceCode}?`)) {
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
    }
  };

  const handleAcceptProposal = (jobId: string, proId: string) => {
    if (!user) {
      router.push("/auth/login?redirect=/dashboard/homeowner");
      return;
    }

    setJobs((prev) =>
      prev.map((job) => {
        if (job.id === jobId) {
          return {
            ...job,
            status: "IN_PROGRESS",
            proposals: job.proposals.map((p) =>
              p.proId === proId
                ? { ...p, status: "ACCEPTED" }
                : { ...p, status: "DECLINED" }
            ),
          };
        }
        return job;
      })
    );
    alert("Contractor proposal accepted! The contractor has been notified with your contact details.");
  };

  const handleCompleteAndReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingJob) return;

    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === reviewingJob.id) {
          const acceptedProp = j.proposals.find((p) => p.status === "ACCEPTED");
          return {
            ...j,
            status: "COMPLETED",
            completedDate: "15 Nov 2026",
            finalCost: acceptedProp ? acceptedProp.price : "£145.00",
            reviewLeft: {
              rating: reviewRating,
              comment: reviewComment || "Job completed strictly to specification. Verified contractor.",
            },
          };
        }
        return j;
      })
    );
    setReviewingJob(null);
    setActiveTab("HISTORY");
    alert("Contract finalized and verified review published! Receipt available in Contract History.");
  };

  const activeJobs = jobs.filter((j) => j.status === "QUOTING" || j.status === "IN_PROGRESS");
  const completedJobs = jobs.filter((j) => j.status === "COMPLETED");

  return (
    <div className="section-light section-spacing">
      <div className="container-custom">
        {/* Top Profile Header */}
        <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-full bg-[var(--brand-light)] text-[var(--brand)] font-bold text-lg flex items-center justify-center border border-[var(--line)]">
              SJ
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-[var(--text)]">
                  Sarah Jenkins
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--bg-alt)] text-[var(--text-muted)]">
                  Homeowner Account
                </span>
              </div>
              <div className="text-xs text-[var(--text-muted)] flex items-center space-x-3 mt-0.5">
                <span>sarah.jenkins@example.com</span>
                <span>&middot;</span>
                <span className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-[var(--accent)]" />
                  Fulham, London SW6
                </span>
              </div>
            </div>
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

        {/* Tab Navigation */}
        <div className="flex border-b border-[var(--line)] mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("ACTIVE")}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === "ACTIVE"
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            Active Quotes & Works ({activeJobs.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("HISTORY")}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === "HISTORY"
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            Contract History & Receipts ({completedJobs.length})
          </button>
        </div>

        {/* TAB 1: ACTIVE JOBS & CONTRACTOR PROPOSALS */}
        {activeTab === "ACTIVE" && (
          <div className="space-y-6">
            {activeJobs.map((job) => (
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
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          job.status === "QUOTING"
                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {job.status === "QUOTING" ? "Receiving Quotes" : "Contract Active / In Progress"}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[var(--text)] mt-1.5">
                      {job.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-xs text-[var(--text-muted)] text-left sm:text-right mr-2">
                      <span>Posted {job.datePosted}</span>
                      <span className="block text-[11px] text-[var(--text-light)]">Urgency: {job.urgency}</span>
                    </div>

                    {job.status === "QUOTING" && (
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
                          className="p-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors cursor-pointer text-xs inline-flex items-center space-x-1"
                          title="Cancel job request"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}

                    {job.status === "IN_PROGRESS" && (
                      <button
                        type="button"
                        onClick={() => setReviewingJob(job)}
                        className="btn-primary px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-bold inline-flex items-center space-x-1 shadow-xs cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Complete & Review</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Proposals received from pros */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                    Proposals From Verified Pros ({job.proposals.length})
                  </h4>

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
                            <span className="font-extrabold text-sm text-[var(--text)] font-serif">{prop.price}</span>
                          </div>

                          {prop.status === "PENDING" && (
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
                                <span>Negotiate</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleAcceptProposal(job.id, prop.proId)}
                                className="btn-primary px-3.5 py-2 rounded-[var(--radius-sm)] text-xs font-bold"
                              >
                                Accept &amp; Hire
                              </button>
                            </div>
                          )}

                          {prop.status === "ACCEPTED" && (
                            <div className="flex items-center space-x-2">
                              <span className="inline-flex items-center px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--brand-light)] text-[var(--pine-accent)] text-xs font-bold border border-[var(--line)]">
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                Hired Contractor
                              </span>
                              <button
                                type="button"
                                onClick={() => handleOpenContract(job)}
                                className="p-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-xs font-semibold text-[var(--text)] inline-flex items-center space-x-1 cursor-pointer"
                                title="View & Print Digital Work Contract"
                              >
                                <Printer className="w-3.5 h-3.5 text-[var(--accent)]" />
                                <span>Print Contract</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: CONTRACT HISTORY & COMPLETED JOBS */}
        {activeTab === "HISTORY" && (
          <div className="space-y-4">
            {completedJobs.map((job) => (
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
                      <span className="inline-flex items-center text-[10px] font-bold text-[var(--pine-accent)] bg-[var(--brand-light)] px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Completed &amp; Verified
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[var(--text)] mt-1">
                      {job.title}
                    </h3>
                  </div>

                  <div className="text-xs text-[var(--text-muted)] text-left sm:text-right">
                    <span>Completed on {job.completedDate}</span>
                    <span className="block font-bold text-sm text-[var(--text)] font-serif mt-0.5">
                      Paid: {job.finalCost}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-[11px] text-[var(--text-light)] block">Hired Contractor:</span>
                    <span className="font-bold text-[var(--text)]">
                      {job.proposals[0]?.proName}
                    </span>
                    {job.reviewLeft && (
                      <div className="mt-2 p-3 rounded-[var(--radius-sm)] bg-[var(--bg-alt)]/50 border border-[var(--line-subtle)] text-xs text-[var(--text-muted)]">
                        <div className="flex items-center text-[var(--accent)] mb-1">
                          {[...Array(job.reviewLeft.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[var(--accent)]" />
                          ))}
                          <span className="text-[10px] font-semibold text-[var(--text-light)] ml-1.5">
                            Verified Review Left
                          </span>
                        </div>
                        &ldquo;{job.reviewLeft.comment}&rdquo;
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenInvoice(job)}
                    className="btn-secondary px-3.5 py-2 rounded-[var(--radius-sm)] text-xs font-semibold inline-flex items-center space-x-1.5 self-start md:self-center cursor-pointer shadow-xs"
                    title="View and print official VAT invoice as PDF"
                  >
                    <Printer className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>View &amp; Print Official PDF Invoice</span>
                  </button>
                </div>
              </div>
            ))}
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
                <h3 className="text-base font-bold text-[var(--text)]">Finalize Contract & Review</h3>
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
                    Submit Review & Complete Contract
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
      </div>
    </div>
  );
}
