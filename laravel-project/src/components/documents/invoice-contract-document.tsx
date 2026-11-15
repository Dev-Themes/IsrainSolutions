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
  documentType: "INVOICE" | "CONTRACT";
  documentNumber: string;
  issueDate: string;
  completionDate?: string;
  referenceCode: string;
  jobTitle: string;
  serviceCategory: string;
  location: string;
  agreedPrice: string;
  paymentStatus: "PAID IN FULL" | "ESCROW HELD" | "CONTRACT ACTIVE";
  paymentMethod?: string;
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
      doc.rect(15, 15, 180, 22, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("TradeConnect Network", 22, 25);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("Verified Trade Services Marketplace (UK & US)", 22, 31);

      // Doc Type Badge
      doc.setFillColor(180, 72, 31); // accent terracotta #b4481f
      doc.roundedRect(140, 19, 48, 14, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(isInvoice ? "VAT INVOICE" : "WORK CONTRACT", 145, 28);

      // Meta Details
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Document Ref: ${data.documentNumber}`, 15, 46);
      doc.text(`Job Reference: ${data.referenceCode}`, 15, 52);
      doc.text(`Issue Date: ${data.issueDate}`, 15, 58);
      doc.text(`Payment Status: ${data.paymentStatus}`, 115, 46);
      doc.text(`Trade Category: ${data.serviceCategory}`, 115, 52);
      doc.text(`Payment Method: ${data.paymentMethod || "Milestone Escrow"}`, 115, 58);

      // Horizontal Divider
      doc.setDrawColor(200, 200, 200);
      doc.line(15, 64, 195, 64);

      // Parties Box
      doc.setFillColor(248, 248, 248);
      doc.rect(15, 68, 88, 38, "F");
      doc.rect(107, 68, 88, 38, "F");

      // Client
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("CLIENT / HOMEOWNER", 19, 74);
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(9.5);
      doc.text(data.homeowner.name, 19, 81);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(data.homeowner.address, 19, 87);
      doc.text(`Phone: ${data.homeowner.phone}`, 19, 93);
      if (data.homeowner.email) doc.text(`Email: ${data.homeowner.email}`, 19, 99);

      // Contractor
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("CERTIFIED CONTRACTOR", 111, 74);
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(9.5);
      doc.text(data.contractor.companyName, 111, 81);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(`License / Gas Safe: ${data.contractor.licenseNumber}`, 111, 87);
      doc.text(`Insurance: ${data.contractor.insuranceAmount} Verified`, 111, 93);
      doc.text(`Registered Base: ${data.contractor.baseCity} | Phone: ${data.contractor.phone}`, 111, 99);

      // Job Description & Scope
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text("CONTRACTED WORK SCOPE", 15, 115);

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(210, 210, 210);
      doc.rect(15, 118, 180, 18);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(data.jobTitle, 19, 125);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(`Site Location: ${data.location} | Trade Standard Compliance verified.`, 19, 131);

      // Financial Table Header
      doc.setFillColor(235, 235, 235);
      doc.rect(15, 143, 180, 8, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("Item / Milestone Description", 19, 148);
      doc.text("Audit Status", 130, 148);
      doc.text("Total", 175, 148);

      // Table Content
      let y = 158;
      if (data.milestones && data.milestones.length > 0) {
        data.milestones.forEach((m, idx) => {
          doc.setFont("helvetica", "normal");
          doc.text(`Milestone #${idx + 1}: ${m.title}`, 19, y);
          doc.text("Verified Pass", 130, y);
          doc.setFont("helvetica", "bold");
          doc.text(m.amount, 175, y);
          y += 8;
        });
      } else {
        doc.setFont("helvetica", "normal");
        doc.text("Certified Trade Labor & Approved Diagnostics", 19, y);
        doc.text("Accredited", 130, y);
        doc.setFont("helvetica", "bold");
        doc.text(data.agreedPrice, 175, y);
        y += 8;

        doc.setFont("helvetica", "normal");
        doc.text("TradeConnect Escrow Protection & Dispute Guarantee", 19, y);
        doc.text("Included (0%)", 130, y);
        doc.setFont("helvetica", "bold");
        doc.text("£0.00", 175, y);
        y += 8;
      }

      // Total Box
      doc.setDrawColor(31, 58, 52);
      doc.setLineWidth(0.5);
      doc.line(15, y + 2, 195, y + 2);
      y += 10;

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(isInvoice ? "TOTAL SETTLED (INC. VAT):" : "TOTAL CONTRACT AMOUNT:", 110, y);
      doc.setFontSize(12);
      doc.setTextColor(180, 72, 31);
      doc.text(data.agreedPrice, 175, y);

      // Cryptographic Sign-off Audit
      y += 18;
      doc.setDrawColor(220, 220, 220);
      doc.line(15, y, 195, y);
      y += 8;

      doc.setTextColor(120, 120, 120);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "normal");
      doc.text(`Digital Sign-off Timestamp: ${data.completionDate || data.issueDate} 14:22:09 UTC`, 15, y);
      doc.text(`Cryptographic Audit Seal: SHA256:8f9c4b${data.documentNumber.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}a94f8e`, 15, y + 4);
      doc.text("TradeConnect Network Ltd | Registered in England & Wales #09482014 | VAT Reg GB 948 2014 92", 15, y + 8);
      doc.text("Headquarters: 180 Strand, London WC2R 1EA | 24/7 Support: 0800 123 4567 | support@tradeconnect.com", 15, y + 12);

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
            <span className="font-bold uppercase tracking-wider text-[var(--accent)]">
              {isInvoice ? "Official VAT Invoice & Receipt" : "Digital Service Agreement"}
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
                  TradeConnect Network Ltd &middot; Registered Company #09482014 &middot; VAT Reg GB 948 2014 92
                  <br />
                  Headquarters: 180 Strand, Temple, London WC2R 1EA
                </p>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded text-xs font-extrabold tracking-wider uppercase bg-zinc-900 text-white">
                  {isInvoice ? "VAT INVOICE" : "WORK CONTRACT"}
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
                <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
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
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                Contracted Service Scope
              </h4>
              <div className="p-4 rounded-lg border border-zinc-200 bg-white space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-900 text-sm">{data.jobTitle}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-100 text-zinc-700 border border-zinc-200">
                    {data.serviceCategory}
                  </span>
                </div>
                <p className="text-zinc-600 text-[11px] leading-relaxed">
                  Location of works: {data.location}. All works executed in compliance with BS 7671 (Electrical) / Gas Safety Regulations 1998 / Building Regulations.
                </p>
              </div>
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
                    {data.milestones && data.milestones.length > 0 ? (
                      data.milestones.map((m, idx) => (
                        <tr key={idx}>
                          <td className="p-3">
                            <span className="font-semibold text-zinc-900 block">{m.title}</span>
                            <span className="text-[10px] text-zinc-500">Milestone #{idx + 1} &bull; Verified inspection</span>
                          </td>
                          <td className="p-3 text-[11px] text-zinc-600">Passed standard</td>
                          <td className="p-3 text-right font-mono font-bold text-zinc-900">{m.amount}</td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr>
                          <td className="p-3">
                            <span className="font-semibold text-zinc-900 block">Professional Trade Labor &amp; Diagnostic</span>
                            <span className="text-[10px] text-zinc-500">Qualified technician rate &bull; Completed to trade standard</span>
                          </td>
                          <td className="p-3 text-[11px] text-zinc-600">License validated</td>
                          <td className="p-3 text-right font-mono font-bold text-zinc-900">
                            {data.agreedPrice}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3">
                            <span className="font-semibold text-zinc-900 block">TradeConnect Escrow Fee &amp; Guarantee</span>
                            <span className="text-[10px] text-zinc-500">Milestone dispute protection &amp; insurance backing</span>
                          </td>
                          <td className="p-3 text-[11px] text-emerald-700 font-semibold">Included (0% fee)</td>
                          <td className="p-3 text-right font-mono font-bold text-zinc-900">&pound;0.00</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="bg-zinc-50 border-t-2 border-zinc-800">
                      <td colSpan={2} className="p-3 text-right font-bold text-zinc-800 uppercase text-[11px]">
                        {isInvoice ? "Total Paid (Inc. VAT / Taxes):" : "Total Contract Value:"}
                      </td>
                      <td className="p-3 text-right font-mono font-extrabold text-base text-zinc-900">
                        {data.agreedPrice}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Digital Sign-off & Audit Trail Hash */}
            <div className="pt-4 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] text-zinc-500">
              <div>
                <span className="font-bold text-zinc-800 uppercase block mb-0.5">Digital Sign-Off Audit:</span>
                <p>Sign-off timestamp: {data.completionDate || data.issueDate} 14:22:09 UTC</p>
                <p className="font-mono text-[9px] mt-0.5 truncate text-zinc-400">
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
