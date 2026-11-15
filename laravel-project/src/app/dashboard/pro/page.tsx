"use client";

import * as React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Star,
  MapPin,
  Clock,
  Check,
  Award,
  Send,
  AlertCircle,
  Edit3,
  Trash2,
  Settings,
  X,
  Printer,
  Lock,
  Globe,
  Car,
} from "lucide-react";
import { CITIES, CATEGORIES } from "@/lib/data";
import {
  InvoiceContractModal,
  InvoiceContractData,
} from "@/components/documents/invoice-contract-document";
import { NegotiationModal } from "@/components/chat/negotiation-modal";

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

const INITIAL_OPEN_LEADS: OpenLead[] = [
  {
    id: "lead_101",
    referenceCode: "TC-904122",
    service: "Emergency Plumbing",
    title: "Burst isolating valve under kitchen sink flooding cabinet",
    city: "London",
    country: "UK",
    location: "Fulham, London (SW6)",
    distance: "1.8 miles away (Base City)",
    datePosted: "15 minutes ago",
    urgency: "Emergency",
    homeownerName: "Marcus P.",
    description: "Main cold water pipe isolating valve has cracked and is spraying water. Have turned stopcock off. Need immediate replacement valve and pipe check.",
    estimatedBudget: "£120 - £180",
    quotesReceivedCount: 1,
  },
  {
    id: "lead_102",
    referenceCode: "TC-849201",
    service: "Emergency Plumbing",
    title: "Burst pipe under master bathroom floorboards",
    city: "London",
    country: "UK",
    location: "Parsons Green, London (SW6 2PY)",
    distance: "2.3 miles away (Base City)",
    datePosted: "1 hour ago",
    urgency: "Emergency",
    homeownerName: "Sarah Jenkins",
    description: "Water dripping into ground floor ceiling from first-floor en-suite floorboards. Need leak isolated and soldered joint repaired.",
    estimatedBudget: "£140 - £200",
    quotesReceivedCount: 2,
    myQuote: {
      price: "£145.00",
      timeline: "Can dispatch in 30 minutes",
      notes: "Van stocked with 15mm copper & press-fit lever valves. 12-month workmanship guarantee.",
      submittedAt: "45 minutes ago",
    },
  },
  {
    id: "lead_103",
    referenceCode: "TC-781190",
    service: "Gas & Boiler Engineers",
    title: "Worcester Bosch Greenstar combi boiler flashing EA fault code",
    city: "London",
    country: "UK",
    location: "Putney, London (SW15)",
    distance: "3.1 miles away (Base City)",
    datePosted: "3 hours ago",
    urgency: "Within 48 Hours",
    homeownerName: "Oliver B.",
    description: "Boiler ignited then shut down displaying EA code (flame not detected). Heating and hot water offline. Need diagnostic and repair.",
    estimatedBudget: "£90 - £160",
    quotesReceivedCount: 1,
  },
  {
    id: "lead_104",
    referenceCode: "TC-652391",
    service: "Central Heating",
    title: "Full system MagnaClean chemical power flush & magnetic filter installation",
    city: "London",
    country: "UK",
    location: "Wandsworth, London (SW18)",
    distance: "4.2 miles away (Base City)",
    datePosted: "Yesterday",
    urgency: "Flexible",
    homeownerName: "Fiona C.",
    description: "Three radiators cold at the bottom due to magnetite sludge. Looking for a full chemical flush with Kamco machine and Adey filter install.",
    estimatedBudget: "£450 - £600",
    quotesReceivedCount: 3,
  },
  {
    id: "lead_105",
    referenceCode: "TC-541982",
    service: "Gas & Boiler Engineers",
    title: "Commercial plantroom dual-boiler annual service & safety certificate",
    city: "Manchester",
    country: "UK",
    location: "Didsbury, Manchester (M20)",
    distance: "Expanded Coverage Area (Travel from London required)",
    datePosted: "2 hours ago",
    urgency: "Within 48 Hours",
    homeownerName: "Liam T.",
    description: "Need CP12 safety certification and flue gas combustion analysis for light commercial property. Flexible on engineer travel.",
    estimatedBudget: "£320 - £450",
    quotesReceivedCount: 1,
  },
  {
    id: "lead_106",
    referenceCode: "TC-489211",
    service: "Emergency Plumbing",
    title: "Underground main water supply copper pipe joint leak",
    city: "Birmingham",
    country: "UK",
    location: "Edgbaston, Birmingham (B15)",
    distance: "Expanded Coverage Area (Travel from London required)",
    datePosted: "4 hours ago",
    urgency: "Emergency",
    homeownerName: "Chloe H.",
    description: "Water meter spinning while all internal appliances off. Excavation completed. Need 25mm MDPE to copper transition joint replaced.",
    estimatedBudget: "£280 - £400",
    quotesReceivedCount: 2,
  },
  {
    id: "lead_107",
    referenceCode: "TC-391204",
    service: "Central Heating",
    title: "10-Radiator smart Honeywell Evohome multi-zone heating controls upgrade",
    city: "Bristol",
    country: "UK",
    location: "Clifton, Bristol (BS8)",
    distance: "Nationwide Lead (Travel from London required)",
    datePosted: "5 hours ago",
    urgency: "Flexible",
    homeownerName: "Julian W.",
    description: "Looking for experienced heating engineer to install smart wireless motorized radiator TRVs and wireless relay module.",
    estimatedBudget: "£550 - £750",
    quotesReceivedCount: 1,
  },
  {
    id: "lead_108",
    referenceCode: "TC-291044",
    service: "Certified Electricians",
    title: "Main 100A supply cut-out fuse board replacement & full house EICR",
    city: "Leeds",
    country: "UK",
    location: "Headingley, Leeds (LS6)",
    distance: "Nationwide Lead (Travel from London required)",
    datePosted: "6 hours ago",
    urgency: "Within 48 Hours",
    homeownerName: "Natasha P.",
    description: "Older Victorian terrace needing dual RCD metal consumer unit with surge protection device (SPD) and landlord compliance certification.",
    estimatedBudget: "£500 - £650",
    quotesReceivedCount: 2,
  },
];

const INITIAL_ACTIVE_CONTRACTS: ActiveContract[] = [
  {
    id: "active_1",
    referenceCode: "TC-721094",
    service: "Certified Electricians / Heating Controls",
    title: "10-Way dual RCD consumer unit upgrade & smart thermostat wiring",
    homeownerName: "Sarah Jenkins",
    homeownerPhone: "+44 20 7946 0812",
    address: "14 Cranbury Road, Fulham, London SW6 2PY",
    city: "London",
    agreedPrice: "£520.00",
    startDate: "16 Nov 2026 (Tomorrow, 08:30 AM)",
    status: "SCHEDULED",
    notes: "Homeowner confirmed access via front gate. Parking space on driveway reserved.",
  },
];

const INITIAL_COMPLETED_CONTRACTS: CompletedContract[] = [
  {
    id: "comp_1",
    referenceCode: "TC-591204",
    service: "Gas & Boiler Engineers",
    title: "Annual Worcester Bosch Combi Service & CP12 Landlord Safety Certificate",
    homeownerName: "Sarah Jenkins",
    completedDate: "19 Oct 2026",
    settledAmount: "£95.00",
    paymentStatus: "PAID",
    invoiceNumber: "INV-2026-088",
    homeownerReview: {
      author: "Sarah Jenkins",
      rating: 5,
      date: "19 Oct 2026",
      comment: "Arrived exactly on time, conducted thorough pressure and flue checks, and provided the official certificate before leaving. Very pleased.",
    },
  },
  {
    id: "comp_2",
    referenceCode: "TC-482019",
    service: "Emergency Plumbing",
    title: "Emergency unvented Megaflo pressure relief discharge pipe replacement",
    homeownerName: "Arthur Pendelton",
    completedDate: "28 Sep 2026",
    settledAmount: "£210.00",
    paymentStatus: "PAID",
    invoiceNumber: "INV-2026-074",
    homeownerReview: {
      author: "Arthur Pendelton",
      rating: 5,
      date: "28 Sep 2026",
      comment: "Turned up on a Sunday evening within 40 minutes of posting the job. Repaired the tundish discharge leak cleanly and explained every step.",
    },
  },
  {
    id: "comp_3",
    referenceCode: "TC-390114",
    service: "Plumbing Installation",
    title: "Thermostatic concealed shower valve and copper riser installation",
    homeownerName: "Eleanor Vance",
    completedDate: "12 Aug 2026",
    settledAmount: "£380.00",
    paymentStatus: "PAID",
    invoiceNumber: "INV-2026-061",
    homeownerReview: {
      author: "Eleanor Vance",
      rating: 5,
      date: "13 Aug 2026",
      comment: "Superb attention to detail with the copper pipework behind the tiled wall. Cleaned up completely after the job was finished.",
    },
  },
];

export default function ContractorDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<"LEADS" | "ACTIVE" | "HISTORY" | "COMPLIANCE">("LEADS");
  const [leads, setLeads] = React.useState<OpenLead[]>(INITIAL_OPEN_LEADS);
  const [activeContracts, setActiveContracts] = React.useState<ActiveContract[]>(INITIAL_ACTIVE_CONTRACTS);
  const [completedContracts, setCompletedContracts] = React.useState<CompletedContract[]>(INITIAL_COMPLETED_CONTRACTS);

  // Contractor Profile & Coverage Area State
  const [companyName, setCompanyName] = React.useState("Apex Heating & Emergency Plumbing Ltd");
  const [leadEngineer, setLeadEngineer] = React.useState("David Thornton (Lead Engineer)");
  const [homeBaseCity] = React.useState<string>("London"); // Registered account creation base city (permanent)
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
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);

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
    const docData: InvoiceContractData = {
      documentType: "CONTRACT",
      documentNumber: `CNT-${contract.referenceCode.replace("TC-", "2026-")}`,
      issueDate: contract.startDate.split(" ")[0],
      referenceCode: contract.referenceCode,
      jobTitle: contract.title,
      serviceCategory: contract.service,
      location: contract.address,
      agreedPrice: contract.agreedPrice,
      paymentStatus: "CONTRACT ACTIVE",
      paymentMethod: "TradeConnect Protected Milestone Escrow",
      homeowner: {
        name: contract.homeownerName,
        phone: contract.homeownerPhone,
        address: contract.address,
      },
      contractor: {
        companyName,
        contactName: leadEngineer,
        licenseNumber: "Gas Safe Reg #592104 &bull; NICEIC #D94812",
        insuranceAmount: "£5,000,000",
        baseCity: `${homeBaseCity} (Primary Base)`,
        phone: "+44 20 7946 0812",
      },
      milestones: [
        {
          title: "Preliminary site inspection, circuit isolation & parts staging",
          amount: "£150.00",
          status: "COMPLETED",
        },
        {
          title: "Final installation, safety testing & building compliance sign-off",
          amount: contract.agreedPrice,
          status: contract.status === "ON_SITE" ? "SCHEDULED" : "SCHEDULED",
        },
      ],
    };
    setSelectedDocData(docData);
    setIsDocModalOpen(true);
  };

  const handleOpenCompletedInvoiceDoc = (comp: CompletedContract) => {
    const docData: InvoiceContractData = {
      documentType: "INVOICE",
      documentNumber: comp.invoiceNumber,
      issueDate: comp.completedDate,
      completionDate: comp.completedDate,
      referenceCode: comp.referenceCode,
      jobTitle: comp.title,
      serviceCategory: comp.service,
      location: `${comp.homeownerName} Residence`,
      agreedPrice: comp.settledAmount,
      paymentStatus: "PAID IN FULL",
      paymentMethod: "Settled via TradeConnect Escrow Transfer",
      homeowner: {
        name: comp.homeownerName,
        phone: "+44 20 7946 0812",
        address: "Fulham, London",
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

  const handleNegotiationAgreed = (newPrice: string) => {
    if (!activeNegotiation) return;
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === activeNegotiation.jobId && lead.myQuote) {
          return {
            ...lead,
            myQuote: {
              ...lead.myQuote,
              price: newPrice,
              notes: `${lead.myQuote.notes} [Negotiated counter accepted: ${newPrice}]`,
            },
          };
        }
        return lead;
      })
    );
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

  const handleRetractQuote = (leadId: string, referenceCode: string) => {
    if (confirm(`Withdraw your submitted quote for job ${referenceCode}?`)) {
      setLeads((prev) =>
        prev.map((lead) => {
          if (lead.id === leadId) {
            return {
              ...lead,
              myQuote: undefined,
              quotesReceivedCount: Math.max(0, lead.quotesReceivedCount - 1),
            };
          }
          return lead;
        })
      );
      alert("Quote proposal successfully withdrawn.");
    }
  };

  const handleConfirmQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quotingLeadId) return;

    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === quotingLeadId) {
          const isUpdate = Boolean(lead.myQuote);
          return {
            ...lead,
            quotesReceivedCount: isUpdate ? lead.quotesReceivedCount : lead.quotesReceivedCount + 1,
            myQuote: {
              price: quotePrice.startsWith("£") || quotePrice.startsWith("$") ? quotePrice : `£${quotePrice}`,
              timeline: quoteTimeline,
              notes: quoteNotes,
              submittedAt: isUpdate ? "Updated just now" : "Just now",
            },
          };
        }
        return lead;
      })
    );

    setQuotingLeadId(null);
    alert("Quote submitted to homeowner! You will receive notification when the homeowner accepts.");
  };

  const handleToggleOnSite = (contractId: string) => {
    setActiveContracts((prev) =>
      prev.map((c) =>
        c.id === contractId
          ? { ...c, status: c.status === "SCHEDULED" ? "ON_SITE" : "SCHEDULED" }
          : c
      )
    );
  };

  const handleCompleteActiveContract = (contractId: string) => {
    const target = activeContracts.find((c) => c.id === contractId);
    if (!target) return;

    if (!confirm(`Mark contract ${target.referenceCode} as completed and issue final invoice?`)) {
      return;
    }

    const newCompleted: CompletedContract = {
      id: `comp_${target.id}_done`,
      referenceCode: target.referenceCode,
      service: target.service,
      title: target.title,
      homeownerName: target.homeownerName,
      completedDate: "15 Nov 2026",
      settledAmount: target.agreedPrice,
      paymentStatus: "PAID",
      invoiceNumber: `INV-2026-${target.referenceCode.replace("TC-", "")}`,
      homeownerReview: {
        author: target.homeownerName,
        rating: 5,
        date: "15 Nov 2026",
        comment: "Excellent workmanship and polite service. Completed strictly on agreed budget.",
      },
    };

    setActiveContracts((prev) => prev.filter((c) => c.id !== contractId));
    setCompletedContracts((prev) => [newCompleted, ...prev]);
    setActiveTab("HISTORY");
  };

  return (
    <div className="section-light section-spacing">
      <div className="container-custom">
        {/* Contractor Profile Summary Card */}
        <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-[var(--brand)] text-[var(--bg-deep-text)] font-extrabold text-xl flex items-center justify-center shrink-0 shadow-xs">
              AH
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--text)]">
                  {companyName}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[var(--accent)] text-white">
                  Verified Contractor
                </span>
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="p-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer text-xs inline-flex items-center space-x-1"
                  title="Edit business profile and rates"
                >
                  <Settings className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Edit Profile & Rates</span>
                </button>
              </div>
              <div className="text-xs text-[var(--text-muted)] flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                <span className="font-medium text-[var(--text)]">{leadEngineer}</span>
                <span>&middot;</span>
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-[var(--accent)]" />
                  <strong>Base: {homeBaseCity}</strong>
                  {additionalCoverageCities.length > 0 && (
                    <span className="ml-1 text-[11px] text-[var(--pine-accent)] font-semibold">
                      (+ Also covering: {additionalCoverageCities.join(", ")})
                    </span>
                  )}
                </span>
                <span>&middot;</span>
                <span className="font-semibold text-[var(--text)]">Rate: {hourlyRate} (Callout: {calloutFee})</span>
                <span>&middot;</span>
                <span className="flex items-center font-bold text-[var(--accent)]">
                  <Star className="w-3.5 h-3.5 mr-1 fill-[var(--accent)]" />
                  4.96 ★ (48 reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Accreditation Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded bg-[var(--bg-alt)] border border-[var(--line)] text-[var(--text)] font-medium inline-flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[var(--pine-accent)]" />
              Gas Safe #592104
            </span>
            <span className="px-3 py-1 rounded bg-[var(--bg-alt)] border border-[var(--line)] text-[var(--text)] font-medium inline-flex items-center">
              <Award className="w-3.5 h-3.5 mr-1.5 text-[var(--brand)]" />
              £5M Liability Insured
            </span>
            <span className="px-3 py-1 rounded bg-[var(--bg-alt)] border border-[var(--line)] text-[var(--text)] font-medium inline-flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-[var(--accent)]" />
              28m Avg Dispatch
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">
              Available Leads
            </div>
            <div className="text-2xl font-bold text-[var(--text)] mt-1 font-serif">
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
            <div className="text-2xl font-bold text-[var(--text)] mt-1 font-serif">
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
            <div className="text-2xl font-bold text-[var(--text)] mt-1 font-serif">
              {completedContracts.length + 45}
            </div>
            <div className="text-[11px] text-[var(--pine-accent)] font-semibold mt-0.5">
              100% Verified Reviews
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">
              Verified Settlement
            </div>
            <div className="text-2xl font-bold text-[var(--text)] mt-1 font-serif">
              £14,820
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
              Direct & escrow payout
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
            Live Job Board & Leads ({leads.length})
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
            In-Progress Contracts ({activeContracts.length})
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
            Contract History & Receipts ({completedContracts.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("COMPLIANCE")}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "COMPLIANCE"
                ? "border-[var(--brand)] text-[var(--brand)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            Credentials & Compliance
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
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1.5 text-xs font-bold text-[var(--pine-accent)] bg-[var(--bg-alt)] px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--line)]">
                          <Check className="w-3.5 h-3.5" />
                          <span>Submitted ({lead.myQuote.price})</span>
                        </div>
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
              activeContracts.map((contract) => (
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
                        {contract.agreedPrice}
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
                      onClick={() => handleCompleteActiveContract(contract.id)}
                      className="btn-primary px-4 py-2 rounded-[var(--radius-sm)] text-xs font-bold inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark Job Completed &amp; Issue Invoice</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: CONTRACT HISTORY & INVOICES */}
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

        {/* TAB 4: CREDENTIALS & COMPLIANCE */}
        {activeTab === "COMPLIANCE" && (
          <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft space-y-6">
            <div>
              <h3 className="text-base font-bold text-[var(--text)]">
                Accreditations & Regulatory Licenses
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
                  <div><strong>Scope:</strong> Full domestic & commercial electrical installation</div>
                </div>
              </div>

              <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-[var(--text)] flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1.5 text-[var(--text-muted)]" />
                    Health & Safety CSCS Card
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--pine-accent)]/15 text-[var(--pine-accent)]">
                    Gold Card (Supervisor)
                  </span>
                </div>
                <div className="text-xs text-[var(--text-muted)] space-y-1">
                  <div><strong>Card Number:</strong> CSCS-990142</div>
                  <div><strong>Standard:</strong> NVQ Level 3 Plumbing & Heating</div>
                  <div><strong>Valid Through:</strong> 2028</div>
                </div>
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
        {/* Modal: Edit Contractor Public Profile & Rates */}
        {isProfileModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
          >
            <div className="fixed inset-0" onClick={() => setIsProfileModalOpen(false)} aria-hidden="true" />
            <div className="relative z-10 w-full max-w-xl max-h-[88vh] flex flex-col bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--line)] shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[var(--line)] shrink-0">
                <h3 className="text-base font-bold text-[var(--text)]">Edit Public Business Listing & Rates</h3>
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="p-1 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsProfileModalOpen(false);
                  alert("Contractor profile and rate card successfully updated!");
                }}
                className="flex flex-col flex-1 min-h-0 overflow-hidden"
              >
                <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">Company / Trading Name</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">Lead Engineer / Director Name</label>
                    <input
                      type="text"
                      required
                      value={leadEngineer}
                      onChange={(e) => setLeadEngineer(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[var(--text)] mb-1">Hourly Labor Rate</label>
                      <input
                        type="text"
                        required
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[var(--text)] mb-1">Emergency Callout Fee</label>
                      <input
                        type="text"
                        required
                        value={calloutFee}
                        onChange={(e) => setCalloutFee(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Registered Account Creation City (Permanent Base) */}
                  <div className="p-3.5 rounded-[var(--radius-sm)] bg-[var(--bg-alt)] border border-[var(--line)]">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-[var(--text)]">
                        Registered Workshop Base City (Account Creation City)
                      </label>
                      <span className="text-[10px] uppercase font-bold text-[var(--pine-accent)] bg-[var(--brand-light)] px-2 py-0.5 rounded border border-[var(--line-subtle)]">
                        Permanent Base
                      </span>
                    </div>
                    <div className="font-bold text-sm text-[var(--text)] flex items-center">
                      <MapPin className="w-4 h-4 text-[var(--accent)] mr-1.5" />
                      <span>{homeBaseCity} (United Kingdom)</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                      This city was permanently registered when your trade account was approved. Homeowners are shown this base location so they know travel is required when quoting in other cities.
                    </p>
                  </div>

                  {/* Additional City Coverage (Multi-select) */}
                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1.5">
                      Additional Coverage Cities (Areas you are willing to travel to):
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
                            className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-semibold border transition-all cursor-pointer ${
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

                  {/* Offered Trade Categories */}
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
                            className={`px-2.5 py-1.5 rounded-[var(--radius-sm)] text-xs font-semibold border transition-all cursor-pointer ${
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

                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1">Coverage Territory Summary</label>
                    <input
                      type="text"
                      required
                      value={coverageRadius}
                      onChange={(e) => setCoverageRadius(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 p-3.5 sm:p-4 border-t border-[var(--line)] bg-[var(--surface)] shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsProfileModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[var(--text-muted)] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-5 py-2.5 rounded-[var(--radius-sm)] text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Save Business Profile
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
      </div>
    </div>
  );
}
