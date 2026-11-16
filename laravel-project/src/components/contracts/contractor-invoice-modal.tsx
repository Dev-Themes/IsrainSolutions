"use client";

import * as React from "react";
import { X, Send, Receipt, Landmark } from "lucide-react";
import { JobContract, sendContractInvoice } from "@/lib/contract-store";

interface ContractorInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: JobContract;
  onInvoiceSent?: (updatedContract: JobContract) => void;
}

export function ContractorInvoiceModal({
  isOpen,
  onClose,
  contract,
  onInvoiceSent,
}: ContractorInvoiceModalProps) {
  const [labourAmount, setLabourAmount] = React.useState<number>(() => {
    return Math.max(0, Math.round(contract.priceNumeric * 0.7));
  });
  const [materialsAmount, setMaterialsAmount] = React.useState<number>(() => {
    return Math.max(0, Math.round(contract.priceNumeric * 0.3));
  });
  const [invoiceNumber] = React.useState<string>(() => {
    return `INV-2026-${Math.floor(100 + Math.random() * 900)}`;
  });
  const [vatRate, setVatRate] = React.useState<number>(20);
  const [vatNumber, setVatNumber] = React.useState<string>("GB 948 2014 92");
  const [bankName, setBankName] = React.useState<string>("Barclays Business Bank UK");
  const [accountName, setAccountName] = React.useState<string>(
    contract.proName || "Apex Heating & Emergency Plumbing Ltd"
  );
  const [sortCode, setSortCode] = React.useState<string>("20-04-15");
  const [accountNumber, setAccountNumber] = React.useState<string>("83921049");
  const [notes, setNotes] = React.useState<string>(
    "Certified work completed in compliance with trade building regulations. 12-month workmanship guarantee active."
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!isOpen) return null;

  const subtotalAmount = (Number(labourAmount) || 0) + (Number(materialsAmount) || 0);
  const vatAmount = Math.round(subtotalAmount * (vatRate / 100) * 100) / 100;
  const totalAmount = Math.round((subtotalAmount + vatAmount) * 100) / 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updated = sendContractInvoice(contract.id, {
      invoiceNumber,
      labourAmount: Number(labourAmount) || 0,
      materialsAmount: Number(materialsAmount) || 0,
      subtotalAmount,
      vatRate,
      vatAmount,
      vatNumber,
      totalAmount,
      paymentMethod: "Bank Transfer (Direct BACS) / Escrow",
      bankDetails: {
        bankName,
        accountName,
        sortCode,
        accountNumber,
        paymentReference: contract.referenceCode,
      },
    });

    setIsSubmitting(false);
    if (updated) {
      if (onInvoiceSent) onInvoiceSent(updated);
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-xl max-h-[90vh] flex flex-col bg-white text-zinc-900 rounded-[var(--radius-lg)] shadow-2xl border border-zinc-200 overflow-hidden">
        {/* Header */}
        <div className="shrink-0 bg-zinc-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-zinc-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xs text-[var(--accent)] uppercase tracking-wider">
                Issue Final VAT Invoice
              </span>
              <span className="text-zinc-500">&bull;</span>
              <span className="font-mono text-xs text-zinc-300 font-semibold">{invoiceNumber}</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5 truncate max-w-md">
              Job: {contract.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-[var(--radius-sm)] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-zinc-800">
          {/* Target Homeowner Banner */}
          <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 flex justify-between items-center text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-500 block">Billed Homeowner</span>
              <p className="font-bold text-zinc-900">{contract.homeownerName}</p>
              <p className="text-zinc-600">{contract.homeownerAddress}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-zinc-500 block">Payment Reference</span>
              <span className="font-mono font-bold text-zinc-800">{contract.referenceCode}</span>
            </div>
          </div>

          {/* Itemized Labour & Materials Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center space-x-1.5">
              <Receipt className="w-4 h-4 text-zinc-500" />
              <span>Invoice Itemization &amp; VAT Breakdown</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Labour / Service Charges ({contract.currency}) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-500 font-bold">{contract.currency}</span>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={labourAmount}
                    onChange={(e) => setLabourAmount(parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 rounded-[var(--radius-sm)] border border-zinc-300 font-mono font-bold text-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>
                <span className="text-[10px] text-zinc-500 mt-0.5 block">Certified technician hours &amp; diagnostic</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Materials &amp; Parts ({contract.currency}) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-500 font-bold">{contract.currency}</span>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={materialsAmount}
                    onChange={(e) => setMaterialsAmount(parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 rounded-[var(--radius-sm)] border border-zinc-300 font-mono font-bold text-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>
                <span className="text-[10px] text-zinc-500 mt-0.5 block">Fittings, consumables &amp; hardware</span>
              </div>
            </div>

            {/* VAT Rate & VAT Reg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Applicable VAT Rate
                </label>
                <select
                  value={vatRate}
                  onChange={(e) => setVatRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-zinc-300 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
                >
                  <option value={20}>Standard 20% VAT</option>
                  <option value={5}>Reduced 5% Energy/Heating VAT</option>
                  <option value={0}>0% Zero-Rated / Exempt</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Contractor VAT Reg #
                </label>
                <input
                  type="text"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-zinc-300 text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
            </div>

            {/* Total Financial Summary Card */}
            <div className="p-3.5 rounded-xl bg-zinc-900 text-white space-y-1.5">
              <div className="flex justify-between text-xs text-zinc-300">
                <span>Subtotal (Net of VAT):</span>
                <span className="font-mono font-bold">{contract.currency}{subtotalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-300">
                <span>VAT ({vatRate}%):</span>
                <span className="font-mono font-bold">{contract.currency}{vatAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-zinc-700 pt-2 flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                  Total Gross Payable:
                </span>
                <span className="text-2xl font-black text-[var(--accent)] font-mono">
                  {contract.currency}{totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Banking Details Opt-In Section */}
          <div className="space-y-3 p-4 rounded-lg bg-zinc-50 border border-zinc-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center space-x-1.5">
              <Landmark className="w-4 h-4 text-[var(--pine-accent)]" />
              <span>Contractor Banking Details for Homeowner Payment</span>
            </h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              These details are presented to the homeowner so they can transfer payment. Upon payment settlement, sensitive numbers will be masked on the paid receipt.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-zinc-600 uppercase mb-1">
                  Bank / Financial Institution
                </label>
                <input
                  type="text"
                  required
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded border border-zinc-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-600 uppercase mb-1">
                  Beneficiary Account Name
                </label>
                <input
                  type="text"
                  required
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded border border-zinc-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-600 uppercase mb-1">
                  Sort Code / Routing Code
                </label>
                <input
                  type="text"
                  required
                  value={sortCode}
                  onChange={(e) => setSortCode(e.target.value)}
                  className="w-full px-3 py-1.5 rounded border border-zinc-300 font-mono text-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-600 uppercase mb-1">
                  Bank Account Number
                </label>
                <input
                  type="text"
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3 py-1.5 rounded border border-zinc-300 font-mono text-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
            </div>

            <div className="p-2.5 rounded bg-zinc-100 border border-zinc-200 text-[11px] text-zinc-700 flex justify-between items-center">
              <span>Required Payment Reference:</span>
              <strong className="font-mono text-zinc-900 font-bold">{contract.referenceCode}</strong>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Invoice Notes &amp; Sign-off Summary
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-zinc-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-[11px] leading-relaxed">
            When you send this invoice, the homeowner will receive a notification with your banking details and itemization. Once paid, the {contract.currency}{totalAmount.toFixed(2)} will be credited to your <strong>Earned Tab</strong>.
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end space-x-2 border-t border-zinc-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-[var(--radius-sm)] border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Official Invoice</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
