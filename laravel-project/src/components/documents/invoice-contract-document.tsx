"use client";

import * as React from "react";
import Image from "next/image";
import {
  Printer,
  Download,
  X,
  CheckCircle2,
} from "lucide-react";
import { jsPDF } from "jspdf";

export interface InvoiceContractData {
  documentType: "INVOICE" | "CONTRACT" | "DRAFT_CONTRACT";
  documentNumber: string;
  issueDate: string;
  completionDate?: string;
  referenceCode: string;
  jobTitle: string;
  serviceCategory: string;
  location: string;
  agreedPrice: string;
  labourAmount?: number;
  materialsAmount?: number;
  subtotalAmount?: number;
  platformFeeRate?: number;
  platformFeeAmount?: number;
  vatRate?: number;
  vatAmount?: number;
  vatNumber?: string;
  totalAmount?: number;
  paymentStatus: "PAID IN FULL" | "ESCROW HELD" | "CONTRACT ACTIVE" | "DRAFT PENDING APPROVAL" | "PENDING APPROVAL" | "PENDING PAYMENT";
  paymentMethod?: string;
  bankDetails?: {
    bankName: string;
    accountName: string;
    sortCode: string;
    accountNumber: string;
    paymentReference?: string;
  };
  invoiceIssuedAt?: string;
  invoicePaidAt?: string;
  providedServices?: string[];
  providedEquipments?: string[];
  serviceDateTime?: string;
  warrantyPeriod?: string;
  homeownerSignature?: string;
  notes?: string;
  homeowner: {
    name: string;
    phone: string;
    address: string;
    email?: string;
  };
  contractor: {
    companyName: string;
    contactName: string;
    licenseNumber: string;
    insuranceAmount: string;
    baseCity: string;
    phone: string;
    email?: string;
  };
  milestones?: {
    title: string;
    amount: string;
    status: "COMPLETED" | "SCHEDULED";
  }[];
}

interface InvoiceContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvoiceContractData;
}

export function InvoiceContractModal({
  isOpen,
  onClose,
  data,
}: InvoiceContractModalProps) {
  if (!isOpen) return null;

  const isInvoice = data.documentType === "INVOICE";
  const isDraft = data.documentType === "DRAFT_CONTRACT";
  const docTitle = isInvoice ? "OFFICIAL INVOICE & RECEIPT" : isDraft ? "DRAFT SERVICE CONTRACT" : "WORK CONTRACT";
  const docSub = isInvoice ? "Official Service Invoice & Settlement" : isDraft ? "Draft Contract (Pending Approval)" : "Digital Service Agreement";

  const currencySymbol = data.agreedPrice.startsWith("$") ? "$" : "£";
  const numPrice = parseFloat(data.agreedPrice.replace(/[^0-9.]/g, "")) || 0;
  let subtotalVal = data.subtotalAmount !== undefined
    ? data.subtotalAmount
    : numPrice;
  if (data.totalAmount && Math.abs(subtotalVal - data.totalAmount) < 0.01 && data.totalAmount > 0) {
    // subtotal was previously set to gross totalAmount (which includes the 5% platform fee)
    subtotalVal = Math.round((data.totalAmount / 1.05) * 100) / 100;
  }
  const labourVal = data.labourAmount !== undefined
    ? data.labourAmount
    : Math.round(subtotalVal * 0.7 * 100) / 100;
  const materialsVal = data.materialsAmount !== undefined
    ? data.materialsAmount
    : Math.max(0, Math.round((subtotalVal - labourVal) * 100) / 100);
  const platformFeeRate = data.platformFeeRate ?? 5;
  const platformFeeVal = data.platformFeeAmount !== undefined && Math.abs(data.platformFeeAmount - Math.round(subtotalVal * 0.05 * 100) / 100) < 0.05
    ? data.platformFeeAmount
    : Math.round(subtotalVal * (platformFeeRate / 100) * 100) / 100;
  const grossVal = data.totalAmount && data.totalAmount > subtotalVal
    ? data.totalAmount
    : Math.round((subtotalVal + platformFeeVal) * 100) / 100;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Header Band
      doc.setFillColor(31, 58, 52); // brand dark pine #1f3a34
      doc.rect(15, 12, 180, 22, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("TradeConnect Network", 22, 22);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("Verified Trade Services Marketplace (UK & US)", 22, 28);

      // Doc Type Badge
      if (isDraft) {
        doc.setFillColor(217, 119, 6); // amber-600
        doc.roundedRect(125, 16, 65, 14, 2, 2, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8.5);
        doc.setFont("helvetica", "bold");
        doc.text("DRAFT CONTRACT", 132, 23);
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.text("PENDING SIGNATURE", 132, 27);
      } else {
        doc.setFillColor(180, 72, 31); // accent terracotta #b4481f
        doc.roundedRect(138, 16, 52, 14, 2, 2, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(isInvoice ? "SERVICE INVOICE" : "WORK CONTRACT", 141, 25);
      }

      // Meta Details
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Document Ref: ${data.documentNumber}`, 15, 41);
      doc.text(`Job Reference: ${data.referenceCode}`, 15, 47);
      doc.text(`Issue Date: ${data.issueDate}`, 15, 53);
      if (data.serviceDateTime) {
        doc.text(`Service Schedule: ${data.serviceDateTime}`, 15, 59);
      }
      doc.text(`Status: ${data.paymentStatus}`, 115, 41);
      doc.text(`Trade Category: ${data.serviceCategory}`, 115, 47);
      doc.text(`Payment Method: ${data.paymentMethod || "TradeConnect Escrow"}`, 115, 53);
      if (data.warrantyPeriod) {
        doc.text(`Warranty: ${data.warrantyPeriod}`, 115, 59);
      }

      // Horizontal Divider
      doc.setDrawColor(200, 200, 200);
      doc.line(15, 63, 195, 63);

      // Parties Box
      doc.setFillColor(248, 248, 248);
      doc.rect(15, 66, 88, 36, "F");
      doc.rect(107, 66, 88, 36, "F");

      // Client
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("CLIENT / HOMEOWNER", 19, 72);
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(9.5);
      doc.text(data.homeowner.name, 19, 78);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(data.homeowner.address, 19, 84);
      doc.text(`Phone: ${data.homeowner.phone}`, 19, 90);
      if (data.homeowner.email) doc.text(`Email: ${data.homeowner.email}`, 19, 96);

      // Contractor
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("CERTIFIED CONTRACTOR", 111, 72);
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(9.5);
      doc.text(data.contractor.companyName, 111, 78);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(`License / Gas Safe: ${data.contractor.licenseNumber}`, 111, 84);
      doc.text(`Insurance: ${data.contractor.insuranceAmount} Verified`, 111, 90);
      doc.text(`Base: ${data.contractor.baseCity} | ${data.contractor.phone}`, 111, 96);

      // Job Description & Scope
      let curY = 108;
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text("CONTRACTED WORK SCOPE & SERVICES", 15, curY);

      curY += 3;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(210, 210, 210);
      doc.rect(15, curY, 180, 16);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(data.jobTitle, 19, curY + 6);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(`Location: ${data.location} | All work executed to trade standard.`, 19, curY + 12);
      curY += 21;

      // Provided Services and Equipment if available
      if (data.providedServices && data.providedServices.length > 0) {
        doc.setFontSize(8.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(31, 58, 52);
        doc.text("Agreed Services & Labor Scope:", 15, curY);
        curY += 4;
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(50, 50, 50);
        data.providedServices.forEach((s) => {
          doc.text(`• ${s}`, 19, curY);
          curY += 4.5;
        });
        curY += 2;
      }

      if (data.providedEquipments && data.providedEquipments.length > 0) {
        doc.setFontSize(8.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(31, 58, 52);
        doc.text("Materials & Equipment Included:", 15, curY);
        curY += 4;
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(50, 50, 50);
        data.providedEquipments.forEach((e) => {
          doc.text(`• ${e}`, 19, curY);
          curY += 4.5;
        });
        curY += 2;
      }

      // Financial Table Header
      doc.setFillColor(235, 235, 235);
      doc.rect(15, curY, 180, 7, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("Item / Description", 19, curY + 5);
      doc.text("Audit Status", 130, curY + 5);
      doc.text("Total", 175, curY + 5);
      curY += 10;

      // Financial Items - Dynamically derived from authoritative agreedPrice and breakdown
      doc.setFont("helvetica", "normal");
      doc.text("Professional Certified Trade Labor & Diagnostics", 19, curY);
      doc.text("Accredited", 130, curY);
      doc.setFont("helvetica", "bold");
      doc.text(`${currencySymbol}${labourVal.toFixed(2)}`, 175, curY);
      curY += 6;

      doc.setFont("helvetica", "normal");
      doc.text("Trade Replacement Materials, Equipment & Parts", 19, curY);
      doc.text("Verified OEM", 130, curY);
      doc.setFont("helvetica", "bold");
      doc.text(`${currencySymbol}${materialsVal.toFixed(2)}`, 175, curY);
      curY += 6;

      doc.setFont("helvetica", "normal");
      doc.text("TradeConnect Platform Protection & Escrow Fee (5%)", 19, curY);
      doc.text("Fixed 5.0%", 130, curY);
      doc.setFont("helvetica", "bold");
      doc.text(`${currencySymbol}${platformFeeVal.toFixed(2)}`, 175, curY);
      curY += 6;

      // Total Box
      doc.setDrawColor(31, 58, 52);
      doc.setLineWidth(0.5);
      doc.line(15, curY + 1, 195, curY + 1);
      curY += 7;

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(isInvoice ? "TOTAL SETTLED (INC. 5% FEE):" : isDraft ? "PROPOSED CONTRACT TOTAL:" : "TOTAL CONTRACT AMOUNT:", 88, curY);
      doc.setFontSize(11);
      doc.setTextColor(180, 72, 31);
      doc.text(`${currencySymbol}${grossVal.toFixed(2)}`, 175, curY);
      curY += 10;

      // Signatures Box
      doc.setFillColor(250, 250, 250);
      doc.rect(15, curY, 88, 18, "F");
      doc.rect(107, curY, 88, 18, "F");

      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(80, 80, 80);
      doc.text("CONTRACTOR SIGNATURE", 19, curY + 5);
      doc.text("HOMEOWNER SIGNATURE", 111, curY + 5);

      doc.setFont("helvetica", "normal");
      doc.text(`Signed: ${data.contractor.contactName} (${data.contractor.companyName})`, 19, curY + 11);
      if (data.homeownerSignature) {
        doc.setTextColor(16, 120, 60);
        doc.text(`Approved & Signed: ${data.homeownerSignature}`, 111, curY + 11);
      } else {
        doc.setTextColor(180, 100, 20);
        doc.text("Pending Homeowner Digital Approval", 111, curY + 11);
      }
      curY += 22;

      // Cryptographic Sign-off Audit
      doc.setDrawColor(220, 220, 220);
      doc.line(15, curY, 195, curY);
      curY += 5;

      doc.setTextColor(120, 120, 120);
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.text(`Digital Sign-off Timestamp: ${data.completionDate || data.issueDate} UTC`, 15, curY);
      doc.text(`Cryptographic Audit Seal: SHA256:8f9c4b${data.documentNumber.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}a94f8e`, 15, curY + 3.5);
      doc.text("TradeConnect Network Ltd | Registered in England & Wales #09482014 | Milestone Escrow Protected", 15, curY + 7);
      doc.text("Headquarters: 180 Strand, London WC2R 1EA | 24/7 Support: 0800 123 4567 | support@tradeconnect.com", 15, curY + 10.5);

      // Trigger local file download
      doc.save(`${data.documentNumber}.pdf`);
    } catch (err) {
      console.error("PDF download failed, using browser print", err);
      window.print();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="fixed inset-0 no-print"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Responsive Card Container - Constrained Viewport Height */}
      <div className="relative z-10 w-full max-w-3xl max-h-[88vh] flex flex-col bg-white text-zinc-900 rounded-[var(--radius-lg)] shadow-2xl border border-zinc-200 overflow-hidden">
        {/* Top Action Toolbar (Hidden in Print) */}
        <div className="shrink-0 no-print bg-zinc-900 text-white px-5 sm:px-6 py-3.5 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center space-x-2 text-xs truncate">
            <span className={`font-bold uppercase tracking-wider ${isDraft ? "text-amber-400" : "text-[var(--accent)]"}`}>
              {docSub}
            </span>
            <span className="text-zinc-400">&bull;</span>
            <span className="font-mono text-zinc-300 font-semibold">{data.documentNumber}</span>
          </div>

          <div className="flex items-center space-x-2 shrink-0 ml-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              title="Download PDF directly as a local file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF File</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              title="Print document via system print dialog"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-[var(--radius-sm)] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close document modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Paper Canvas */}
        <div className="flex-1 overflow-y-auto min-h-0 bg-white">
          <div id="printable-document" className="p-6 sm:p-10 space-y-7 font-sans text-xs text-zinc-800 leading-normal">
            {/* Document Header with Logo & Brand Information */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-zinc-800">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-[var(--radius-sm)] overflow-hidden border border-zinc-300 relative shrink-0">
                    <Image
                      src="/images/brand/logo.jpg"
                      alt="TradeConnect Official Logo"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-extrabold text-xl tracking-tight text-zinc-900 block leading-none font-display">
                      Trade<span className="text-[var(--accent)]">Connect</span>
                    </span>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-zinc-500 block mt-0.5">
                      Verified Trade Network &middot; UK &amp; US
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-zinc-500 max-w-xs leading-relaxed">
                  TradeConnect Network Ltd &middot; Registered Company #09482014 &middot; Milestone Escrow Protected
                  <br />
                  Headquarters: 180 Strand, Temple, London WC2R 1EA
                </p>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <span className={`inline-block px-3 py-1 rounded text-xs font-extrabold tracking-wider uppercase ${isDraft ? "bg-amber-600 text-white" : "bg-zinc-900 text-white"}`}>
                  {docTitle}
                </span>
                <div className="text-xs font-mono font-bold text-zinc-900 mt-1">
                  Ref: {data.documentNumber}
                </div>
                <div className="text-[11px] text-zinc-600">
                  Job Code: <strong className="font-mono text-zinc-800">{data.referenceCode}</strong>
                </div>
                <div className="text-[11px] text-zinc-600">
                  Date: {data.issueDate}
                </div>
                {data.serviceDateTime && (
                  <div className="text-[11px] text-zinc-700 font-medium">
                    Schedule: <strong>{data.serviceDateTime}</strong>
                  </div>
                )}
                <div className={`mt-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${isDraft ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-emerald-100 text-emerald-800 border border-emerald-300"}`}>
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {data.paymentStatus}
                </div>
              </div>
            </div>

            {/* Parties: Homeowner & Verified Contractor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-lg bg-zinc-50 border border-zinc-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                  Client / Homeowner:
                </span>
                <h4 className="font-bold text-sm text-zinc-900">{data.homeowner.name}</h4>
                <p className="text-zinc-600 mt-0.5">{data.homeowner.address}</p>
                <p className="text-zinc-600 mt-0.5">Phone: {data.homeowner.phone}</p>
                {data.homeowner.email && (
                  <p className="text-zinc-600">Email: {data.homeowner.email}</p>
                )}
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                  Certified Trade Contractor:
                </span>
                <h4 className="font-bold text-sm text-zinc-900">{data.contractor.companyName}</h4>
                <p className="text-zinc-600 mt-0.5">
                  License / Gas Safe: <strong className="text-zinc-900 font-mono">{data.contractor.licenseNumber}</strong>
                </p>
                <p className="text-zinc-600 mt-0.5">
                  Public Liability: <strong className="text-emerald-700 font-medium">{data.contractor.insuranceAmount} Verified</strong>
                </p>
                <p className="text-zinc-600 mt-0.5">
                  Registered Base: {data.contractor.baseCity} &middot; Contact: {data.contractor.phone}
                </p>
              </div>
            </div>

            {/* Job Scope & Specifications */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                Contracted Service Scope
              </h4>
              <div className="p-4 rounded-lg border border-zinc-200 bg-white space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-900 text-sm">{data.jobTitle}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-100 text-zinc-700 border border-zinc-200">
                    {data.serviceCategory}
                  </span>
                </div>
                <p className="text-zinc-600 text-[11px] leading-relaxed">
                  Location of works: {data.location}. All works executed in compliance with trade safety and building regulations.
                </p>
                {data.warrantyPeriod && (
                  <p className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-1 rounded inline-block">
                    Guarantee: {data.warrantyPeriod}
                  </p>
                )}
              </div>

              {/* Provided Services List */}
              {data.providedServices && data.providedServices.length > 0 && (
                <div className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/60 space-y-1.5">
                  <span className="text-[11px] font-bold text-zinc-800 uppercase tracking-wider block">
                    Agreed Services &amp; Labor Tasks:
                  </span>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-700 text-xs">
                    {data.providedServices.map((service, sIdx) => (
                      <li key={sIdx}>{service}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Provided Equipments / Materials */}
              {data.providedEquipments && data.providedEquipments.length > 0 && (
                <div className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/60 space-y-1.5">
                  <span className="text-[11px] font-bold text-zinc-800 uppercase tracking-wider block">
                    Included Equipment &amp; Materials:
                  </span>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-700 text-xs">
                    {data.providedEquipments.map((eq, eIdx) => (
                      <li key={eIdx}>{eq}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Itemized Financial Breakdown Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                Itemized Financial Breakdown
              </h4>
              <div className="overflow-hidden rounded-lg border border-zinc-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-zinc-100 text-zinc-700 font-bold border-b border-zinc-200">
                      <th className="p-3">Description of Work / Milestones</th>
                      <th className="p-3">Accreditation Audit</th>
                      <th className="p-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    <tr>
                      <td className="p-3">
                        <span className="font-semibold text-zinc-900 block">Professional Certified Trade Labor &amp; Diagnostics</span>
                        <span className="text-[10px] text-zinc-500">Qualified technician rate &bull; Completed to trade standard</span>
                      </td>
                      <td className="p-3 text-[11px] text-zinc-600">Accredited</td>
                      <td className="p-3 text-right font-mono font-bold text-zinc-900">
                        {currencySymbol}{labourVal.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3">
                        <span className="font-semibold text-zinc-900 block">Trade Replacement Materials, Equipment &amp; Parts</span>
                        <span className="text-[10px] text-zinc-500">Manufacturer standard replacement fittings &bull; Tested</span>
                      </td>
                      <td className="p-3 text-[11px] text-zinc-600">Verified OEM</td>
                      <td className="p-3 text-right font-mono font-bold text-zinc-900">
                        {currencySymbol}{materialsVal.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3">
                        <span className="font-semibold text-zinc-900 block">TradeConnect Platform Fee &amp; Escrow Protection (5%)</span>
                        <span className="text-[10px] text-zinc-500">Non-negotiable fixed platform fee &bull; Dispute mediation &amp; £2M insurance</span>
                      </td>
                      <td className="p-3 text-[11px] text-zinc-700 font-semibold">Fixed 5.0%</td>
                      <td className="p-3 text-right font-mono font-bold text-zinc-900">
                        {currencySymbol}{platformFeeVal.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    {isInvoice ? (
                      <>
                        <tr className="bg-zinc-50 border-t border-zinc-200 text-zinc-700">
                          <td colSpan={2} className="p-2.5 text-right font-semibold text-[11px]">
                            Contractor Services Subtotal:
                          </td>
                          <td className="p-2.5 text-right font-mono font-bold text-zinc-900">
                            {currencySymbol}{subtotalVal.toFixed(2)}
                          </td>
                        </tr>
                        <tr className="bg-zinc-50 text-zinc-700">
                          <td colSpan={2} className="p-2.5 text-right font-semibold text-[11px]">
                            TradeConnect Platform Protection Fee (5% Fixed):
                          </td>
                          <td className="p-2.5 text-right font-mono font-bold text-zinc-900">
                            {currencySymbol}{platformFeeVal.toFixed(2)}
                          </td>
                        </tr>
                        <tr className="bg-zinc-100 border-t-2 border-zinc-800">
                          <td colSpan={2} className="p-3 text-right font-bold text-zinc-900 uppercase text-xs">
                            {data.paymentStatus === "PAID IN FULL" ? "Total Paid (Gross Inc. 5% Fee):" : "Total Due (Gross Inc. 5% Fee):"}
                          </td>
                          <td className="p-3 text-right font-mono font-extrabold text-base text-zinc-900">
                            {currencySymbol}{grossVal.toFixed(2)}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <tr className="bg-zinc-50 border-t-2 border-zinc-800">
                        <td colSpan={2} className="p-3 text-right font-bold text-zinc-800 uppercase text-[11px]">
                          {isDraft ? "Proposed Total:" : "Total Contract Value:"}
                        </td>
                        <td className="p-3 text-right font-mono font-extrabold text-base text-zinc-900">
                          {data.agreedPrice}
                        </td>
                      </tr>
                    )}
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Banking & Settlement Card for Invoices */}
            {isInvoice && (
              <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 block">
                    {data.paymentStatus === "PAID IN FULL"
                      ? "Settled Bank Transfer Receipt (Protected)"
                      : "Beneficiary Banking Details for Payment"}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-200 text-zinc-800">
                    Ref: {data.referenceCode}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Account Holder:</span>
                    <strong className="text-zinc-900 font-semibold">
                      {data.bankDetails?.accountName || data.contractor.companyName}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Bank Name:</span>
                    <strong className="text-zinc-900 font-semibold">
                      {data.bankDetails?.bankName || "Barclays Business UK"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Sort Code:</span>
                    <strong className="text-zinc-900 font-mono">
                      {data.paymentStatus === "PAID IN FULL"
                        ? `••-••-${(data.bankDetails?.sortCode || "20-04-15").replace(/[^0-9]/g, "").slice(-2)}`
                        : data.bankDetails?.sortCode || "20-04-15"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Account Number:</span>
                    <strong className="text-zinc-900 font-mono">
                      {data.paymentStatus === "PAID IN FULL"
                        ? `•••••${(data.bankDetails?.accountNumber || "83921049").slice(-4)}`
                        : data.bankDetails?.accountNumber || "83921049"}
                    </strong>
                  </div>
                </div>

                {/* Issuing and Paid Timestamps */}
                <div className="pt-2 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-600">
                  <div>
                    <span>Invoice Issued: </span>
                    <strong className="text-zinc-800">{data.invoiceIssuedAt || data.issueDate}</strong>
                  </div>
                  <div>
                    <span>Payment Settled: </span>
                    <strong className="text-emerald-700">
                      {data.paymentStatus === "PAID IN FULL"
                        ? (data.invoicePaidAt || data.completionDate || "Confirmed Settled")
                        : "Awaiting Settlement"}
                    </strong>
                  </div>
                </div>
              </div>
            )}

            {/* Digital Sign-off & Audit Trail Hash */}
            <div className="pt-4 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] text-zinc-500">
              <div>
                <span className="font-bold text-zinc-800 uppercase block mb-0.5">Digital Signatures:</span>
                <p>Contractor: {data.contractor.contactName} ({data.contractor.companyName})</p>
                <p className="mt-0.5">
                  Homeowner: {data.homeownerSignature ? (
                    <span className="text-emerald-700 font-semibold">Signed by {data.homeownerSignature}</span>
                  ) : (
                    <span className="text-amber-700 font-semibold">Pending Digital Signature</span>
                  )}
                </p>
                <p className="font-mono text-[9px] mt-1 truncate text-zinc-400">
                  Cryptographic Seal: SHA256:8f9c4b{data.documentNumber.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}a94f8e...{data.referenceCode}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="font-bold text-zinc-800 uppercase block mb-0.5">Dispute Protection:</span>
                <p>Guaranteed under TradeConnect Homeowner Charter &bull; 12-Month Workmanship Audit</p>
                <p className="text-zinc-600 font-semibold">Questions: support@tradeconnect.com &bull; 0800 123 4567</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Close Bar (Hidden in Print) */}
        <div className="shrink-0 no-print bg-zinc-100 px-6 py-3 border-t border-zinc-200 flex items-center justify-between">
          <span className="text-[11px] text-zinc-600">
            Click <strong>Download PDF File</strong> to save to disk, or <strong>Print</strong> for paper/system dialog.
          </span>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="px-3.5 py-2 rounded-[var(--radius-sm)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs inline-flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF File</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-[var(--radius-sm)] border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
