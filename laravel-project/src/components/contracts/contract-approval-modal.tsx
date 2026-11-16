"use client";

import * as React from "react";
import { X, CheckCircle2, ShieldCheck, Download, Calendar, Clock, Award } from "lucide-react";
import { JobContract, approveAndSignContract } from "@/lib/contract-store";

interface ContractApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: JobContract;
  onApproved?: (updatedContract: JobContract) => void;
  onDownloadPdf?: (contract: JobContract) => void;
}

export function ContractApprovalModal({
  isOpen,
  onClose,
  contract,
  onApproved,
  onDownloadPdf,
}: ContractApprovalModalProps) {
  const [signatureName, setSignatureName] = React.useState(contract.homeownerName || "");
  const [agreedTerms, setAgreedTerms] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleApprove = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signatureName.trim()) {
      setErrorMsg("Please type your full legal name to provide digital sign-off.");
      return;
    }
    if (!agreedTerms) {
      setErrorMsg("Please accept the trade agreement terms.");
      return;
    }

    setIsSubmitting(true);
    const approved = approveAndSignContract(contract.id, signatureName.trim());
    setIsSubmitting(false);

    if (approved) {
      if (onApproved) onApproved(approved);
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

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col bg-white text-zinc-900 rounded-[var(--radius-lg)] shadow-2xl border border-zinc-200 overflow-hidden">
        {/* Header */}
        <div className="shrink-0 bg-zinc-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-zinc-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xs text-amber-400 uppercase tracking-wider">
                Homeowner Review &amp; Approval
              </span>
              <span className="text-zinc-500">&bull;</span>
              <span className="font-mono text-xs text-zinc-300 font-semibold">{contract.referenceCode}</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5 truncate max-w-md">
              Sign Contract: {contract.title}
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
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-zinc-800">
          {/* Key Contract Summary Bar */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                Agreed Contract Price
              </span>
              <div className="text-2xl font-black text-zinc-900 font-display">
                {contract.agreedPrice}
              </div>
              <span className="text-[11px] text-zinc-600 block mt-0.5">
                Held safely under TradeConnect Protected Escrow
              </span>
            </div>

            <div className="space-y-1 text-right sm:text-right">
              <div className="inline-flex items-center space-x-1.5 text-zinc-700 font-medium">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>{contract.serviceDate}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-zinc-700 font-medium justify-end">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>{contract.serviceTime}</span>
              </div>
            </div>
          </div>

          {/* Contractor Credentials & Protection */}
          <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">
                Verified Contractor
              </span>
              <h4 className="font-bold text-zinc-900 text-sm">{contract.proName}</h4>
              <p className="text-zinc-600 mt-0.5">Location: {contract.proCity}</p>
              <p className="text-zinc-600 font-mono text-[11px]">Phone: {contract.proPhone}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">
                Insurance &amp; Accreditations
              </span>
              <div className="flex items-center space-x-1.5 text-emerald-800 font-medium text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{contract.proLicense}</span>
              </div>
              <p className="text-zinc-600 text-[11px] mt-0.5">{contract.proInsurance}</p>
              <div className="mt-1 flex items-center space-x-1 text-zinc-700 text-[11px]">
                <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{contract.warrantyPeriod}</span>
              </div>
            </div>
          </div>

          {/* Itemized Services Scope */}
          {contract.providedServices && contract.providedServices.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                Agreed Services &amp; Tasks (Included in Contract)
              </h4>
              <div className="p-3.5 rounded-lg border border-zinc-200 bg-white space-y-1.5">
                <ul className="list-disc pl-5 space-y-1 text-zinc-700 text-xs">
                  {contract.providedServices.map((task, idx) => (
                    <li key={idx} className="font-medium">{task}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Itemized Equipments / Materials */}
          {contract.providedEquipments && contract.providedEquipments.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                Included Replacement Materials &amp; Consumables
              </h4>
              <div className="p-3.5 rounded-lg border border-zinc-200 bg-white space-y-1.5">
                <ul className="list-disc pl-5 space-y-1 text-zinc-700 text-xs">
                  {contract.providedEquipments.map((eq, idx) => (
                    <li key={idx} className="font-medium">{eq}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Digital Signature Form */}
          <form onSubmit={handleApprove} className="p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/40 space-y-3">
            <div>
              <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1">
                Homeowner Digital Signature *
              </label>
              <input
                type="text"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                placeholder="Type your full legal name"
                className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-zinc-300 bg-white text-sm font-semibold text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">
                Typing your full legal name constitutes a binding digital signature under UK &amp; US electronic signature statutes.
              </span>
            </div>

            <label className="flex items-start space-x-2.5 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 rounded text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <span className="text-[11px] text-zinc-700 leading-snug">
                I approve the itemized services, equipment, and scheduled arrival. I understand that payment will be secured in escrow and only released upon job completion.
              </span>
            </label>

            {errorMsg && (
              <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>
            )}
          </form>
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 bg-zinc-100 px-5 sm:px-6 py-3.5 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-2">
          {onDownloadPdf && (
            <button
              type="button"
              onClick={() => onDownloadPdf(contract)}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-[var(--radius-sm)] border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-zinc-600" />
              <span>Download Draft PDF</span>
            </button>
          )}

          <div className="flex items-center space-x-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-[var(--radius-sm)] border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-semibold cursor-pointer"
            >
              Review Later
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleApprove}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-[var(--radius-sm)] bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve &amp; Sign Contract</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
