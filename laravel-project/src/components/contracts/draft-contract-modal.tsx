"use client";

import * as React from "react";
import { X, Plus, Trash2, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { JobContract, updateContractDraft } from "@/lib/contract-store";
import { toast } from "@/components/ui/toast";

interface DraftContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: JobContract;
  onSaved?: (updatedContract: JobContract) => void;
  onPreviewPdf?: (contract: JobContract) => void;
}

export function DraftContractModal({
  isOpen,
  onClose,
  contract,
  onSaved,
  onPreviewPdf,
}: DraftContractModalProps) {
  const toIsoDate = (str?: string): string => {
    if (!str) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split("T")[0];
    }
    const parsed = new Date(str);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split("T")[0];
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const toTimeInput = (timeStr?: string): string => {
    if (!timeStr) return "09:30";
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (match) {
      let hours = parseInt(match[1], 10);
      const mins = match[2];
      const ampm = match[3]?.toUpperCase();
      if (ampm === "PM" && hours < 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;
      return `${String(hours).padStart(2, "0")}:${mins}`;
    }
    return "09:30";
  };

  const formatTimeFromInput = (val: string): string => {
    if (!val) return "09:30 AM";
    const [hStr, mStr] = val.split(":");
    let hours = parseInt(hStr, 10);
    const minutes = mStr || "00";
    const ampm = hours >= 12 ? "PM" : "AM";
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
  };

  const formatFromIso = (isoStr: string): string => {
    const parsed = new Date(isoStr);
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    }
    return isoStr;
  };

  const [agreedPrice, setAgreedPrice] = React.useState(contract.agreedPrice || "£145.00");
  const [rawServiceDate, setRawServiceDate] = React.useState<string>(() => toIsoDate(contract.serviceDate));
  const [serviceDate, setServiceDate] = React.useState<string>(() => {
    if (contract.serviceDate && contract.serviceDate !== "Next Available Slot") {
      return contract.serviceDate;
    }
    return formatFromIso(toIsoDate());
  });
  const [rawServiceTime, setRawServiceTime] = React.useState<string>(() => toTimeInput(contract.serviceTime));
  const [serviceTime, setServiceTime] = React.useState<string>(() => {
    return contract.serviceTime || "09:30 AM";
  });
  const [warrantyPeriod, setWarrantyPeriod] = React.useState(
    contract.warrantyPeriod || "12 Months Workmanship Guarantee"
  );
  const [notes, setNotes] = React.useState(contract.notes || "");

  const [services, setServices] = React.useState<string[]>(
    contract.providedServices && contract.providedServices.length > 0
      ? [...contract.providedServices]
      : ["Complete inspection and diagnostics", "Professional repair and fitting"]
  );
  const [newService, setNewService] = React.useState("");

  const [equipments, setEquipments] = React.useState<string[]>(
    contract.providedEquipments && contract.providedEquipments.length > 0
      ? [...contract.providedEquipments]
      : ["Certified replacement parts & seals", "Standard trade consumables"]
  );
  const [newEquipment, setNewEquipment] = React.useState("");

  const [syncedContractId, setSyncedContractId] = React.useState(contract.id);
  if (contract.id !== syncedContractId) {
    setSyncedContractId(contract.id);
    setAgreedPrice(contract.agreedPrice || "£145.00");
    setRawServiceDate(toIsoDate(contract.serviceDate));
    setServiceDate(
      contract.serviceDate && contract.serviceDate !== "Next Available Slot"
        ? contract.serviceDate
        : formatFromIso(toIsoDate())
    );
    setRawServiceTime(toTimeInput(contract.serviceTime));
    setServiceTime(contract.serviceTime || "09:30 AM");
    setWarrantyPeriod(contract.warrantyPeriod || "12 Months Workmanship Guarantee");
    setNotes(contract.notes || "");
    if (contract.providedServices && contract.providedServices.length > 0) {
      setServices([...contract.providedServices]);
    }
    if (contract.providedEquipments && contract.providedEquipments.length > 0) {
      setEquipments([...contract.providedEquipments]);
    }
  }

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);
  const currencySymbol = agreedPrice.startsWith("$") ? "$" : "£";

  if (!isOpen) return null;

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.trim()) return;
    setServices([...services, newService.trim()]);
    setNewService("");
  };

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEquipment.trim()) return;
    setEquipments([...equipments, newEquipment.trim()]);
    setNewEquipment("");
  };

  const handleRemoveEquipment = (index: number) => {
    setEquipments(equipments.filter((_, i) => i !== index));
  };

  const getCleanPriceNumeric = (str: string): number => {
    const num = parseFloat(str.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const handleSaveDraft = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    const numPrice = getCleanPriceNumeric(agreedPrice);
    const platformFee = Math.round(numPrice * 0.05 * 100) / 100;
    const totalDeposit = Math.round((numPrice + platformFee) * 100) / 100;

    const updated = updateContractDraft(contract.id, {
      ...contract,
      agreedPrice,
      priceNumeric: numPrice,
      platformFeeRate: 5,
      platformFeeAmount: platformFee,
      totalAmount: totalDeposit,
      serviceDate,
      serviceTime,
      warrantyPeriod,
      notes,
      providedServices: services,
      providedEquipments: equipments,
      status: "DRAFT",
    });
    setIsSubmitting(false);
    if (updated) {
      toast.success("Draft Saved", "Contract draft updated successfully.");
      if (onSaved) onSaved(updated);
    }
  };

  const handleSubmitToHomeowner = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const numPrice = getCleanPriceNumeric(agreedPrice);
    const platformFee = Math.round(numPrice * 0.05 * 100) / 100;
    const totalDeposit = Math.round((numPrice + platformFee) * 100) / 100;

    // Save all contract metadata and promote status to PENDING_APPROVAL
    const finalized = updateContractDraft(contract.id, {
      ...contract,
      agreedPrice,
      priceNumeric: numPrice,
      platformFeeRate: 5,
      platformFeeAmount: platformFee,
      totalAmount: totalDeposit,
      serviceDate,
      serviceTime,
      warrantyPeriod,
      notes,
      providedServices: services,
      providedEquipments: equipments,
      status: "PENDING_APPROVAL",
    });
    setIsSubmitting(false);
    if (finalized) {
      setStatusMessage("Proposal draft saved and submitted.");
      toast.success(
        "Proposal Submitted",
        "Final draft submitted to homeowner dashboard for review and sign-off!"
      );
      if (onSaved) onSaved(finalized);
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
              <span className="font-bold text-sm text-[var(--accent)] uppercase tracking-wider">
                Contractor Draft Studio
              </span>
              <span className="text-zinc-500">&bull;</span>
              <span className="font-mono text-xs text-zinc-300 font-semibold">{contract.referenceCode}</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5 truncate max-w-md">
              Draft Agreement: {contract.title}
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

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-zinc-800">
          {statusMessage && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center space-x-2 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Homeowner & Job Context Banner */}
          <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row justify-between gap-3 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-500">Homeowner / Client</span>
              <p className="font-bold text-zinc-900">{contract.homeownerName}</p>
              <p className="text-zinc-600">{contract.homeownerAddress}</p>
              <p className="text-zinc-600 text-[11px] font-mono">{contract.homeownerPhone}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-500">Current Status</span>
              <div className="mt-1">
                <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${contract.status === "PENDING_APPROVAL" ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-blue-100 text-blue-800 border border-blue-300"}`}>
                  {contract.status === "PENDING_APPROVAL" ? "Awaiting Homeowner Approval" : "Contractor Draft"}
                </span>
              </div>
            </div>
          </div>

          {/* Agreed Price, Service Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Contractor Quote ({currencySymbol}) *
              </label>
              <input
                type="text"
                value={agreedPrice}
                onChange={(e) => setAgreedPrice(e.target.value)}
                placeholder="e.g. £145.00"
                className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-zinc-300 text-sm font-bold font-mono focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
              />
              <div className="mt-1.5 p-2 rounded bg-amber-50 border border-amber-200/80 text-[10px] space-y-0.5">
                <div className="flex justify-between text-zinc-600">
                  <span>Contractor Quote:</span>
                  <span className="font-semibold text-zinc-800">{currencySymbol}{getCleanPriceNumeric(agreedPrice).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-800 font-medium">
                  <span>Fixed 5% Platform Fee:</span>
                  <span>+{currencySymbol}{(getCleanPriceNumeric(agreedPrice) * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-900 font-bold border-t border-amber-200 pt-0.5">
                  <span>Homeowner Escrow Total:</span>
                  <span>{currencySymbol}{(getCleanPriceNumeric(agreedPrice) * 1.05).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Service Date *
              </label>
              <input
                type="date"
                value={rawServiceDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setRawServiceDate(e.target.value);
                  setServiceDate(formatFromIso(e.target.value));
                }}
                required
                className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-zinc-300 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">
                Scheduled: <strong className="text-zinc-900">{serviceDate}</strong>
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Arrival / Service Time *
              </label>
              <input
                type="time"
                value={rawServiceTime}
                onChange={(e) => {
                  setRawServiceTime(e.target.value);
                  setServiceTime(formatTimeFromInput(e.target.value));
                }}
                required
                className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-zinc-300 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">
                Time slot: <strong className="text-zinc-900">{serviceTime}</strong>
              </span>
            </div>
          </div>

          {/* Warranty / Guarantee */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Workmanship Guarantee / Warranty Period
            </label>
            <input
              type="text"
              value={warrantyPeriod}
              onChange={(e) => setWarrantyPeriod(e.target.value)}
              placeholder="e.g. 12 Months Workmanship Guarantee"
              className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-zinc-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          {/* Itemized Services Provided */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider">
              Provided Services &amp; Labor Tasks (Itemized for Contract)
            </label>
            <ul className="space-y-1.5">
              {services.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between px-3 py-1.5 rounded-[var(--radius-sm)] bg-zinc-50 border border-zinc-200 text-xs"
                >
                  <span className="font-medium text-zinc-800">• {item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(idx)}
                    className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>

            <form onSubmit={handleAddService} className="flex gap-2 pt-1">
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Add service (e.g. Radiator flush & leak isolation)"
                className="flex-1 px-3 py-1.5 rounded-[var(--radius-sm)] border border-zinc-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-zinc-800 text-white font-semibold text-xs hover:bg-zinc-700 cursor-pointer inline-flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </form>
          </div>

          {/* Itemized Equipments & Materials */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider">
              Included Equipment &amp; Replacement Materials
            </label>
            <ul className="space-y-1.5">
              {equipments.map((eq, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between px-3 py-1.5 rounded-[var(--radius-sm)] bg-zinc-50 border border-zinc-200 text-xs"
                >
                  <span className="font-medium text-zinc-800">• {eq}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEquipment(idx)}
                    className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>

            <form onSubmit={handleAddEquipment} className="flex gap-2 pt-1">
              <input
                type="text"
                value={newEquipment}
                onChange={(e) => setNewEquipment(e.target.value)}
                placeholder="Add equipment (e.g. 15mm copper compression elbow fittings)"
                className="flex-1 px-3 py-1.5 rounded-[var(--radius-sm)] border border-zinc-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-zinc-800 text-white font-semibold text-xs hover:bg-zinc-700 cursor-pointer inline-flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </form>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Additional Scope Notes / Site Access Terms
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Client to provide clear access to water stopcock and electrical cupboard."
              className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-zinc-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-start space-x-2 text-[11px]">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Once you submit this draft, the homeowner will be notified to review and sign it in their dashboard. The contract becomes an active job as soon as they sign.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 bg-zinc-100 px-5 sm:px-6 py-3.5 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-2">
          {onPreviewPdf && (
            <button
              type="button"
              onClick={() => {
                const currentDraft: JobContract = {
                  ...contract,
                  agreedPrice,
                  priceNumeric: getCleanPriceNumeric(agreedPrice),
                  serviceDate,
                  serviceTime,
                  warrantyPeriod,
                  notes,
                  providedServices: services,
                  providedEquipments: equipments,
                };
                onPreviewPdf(currentDraft);
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-[var(--radius-sm)] border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-semibold cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-600" />
              <span>Preview Draft PDF</span>
            </button>
          )}

          <div className="flex items-center space-x-2 ml-auto">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSaveDraft}
              className="px-3.5 py-2 rounded-[var(--radius-sm)] border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-semibold cursor-pointer"
            >
              Save Draft
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmitToHomeowner}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Finalize &amp; Send to Homeowner</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
