"use client";

import * as React from "react";
import {
  Lock,
  Send,
  X,
  CheckCircle2,
  Sparkles,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export interface ChatMessage {
  id: string;
  senderRole: "CUSTOMER" | "PRO";
  senderName: string;
  text: string;
  timestamp: string;
  isCounterOffer?: boolean;
  proposedPrice?: string;
  status?: "PROPOSED" | "ACCEPTED" | "DECLINED";
}

interface NegotiationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  referenceCode: string;
  currentPrice: string;
  counterpartName: string;
  counterpartRole: "CONTRACTOR" | "HOMEOWNER";
  initialMessages?: ChatMessage[];
  onPriceAgreed?: (newPrice: string) => void;
}

export function NegotiationModal({
  isOpen,
  onClose,
  jobTitle,
  referenceCode,
  currentPrice,
  counterpartName,
  counterpartRole,
  initialMessages,
  onPriceAgreed,
}: NegotiationModalProps) {
  const { user } = useAuth();
  const storageKey = `tradeconnect_thread_${referenceCode}`;

  const currentRole: "CUSTOMER" | "PRO" =
    user?.role === "PRO" ? "PRO" : "CUSTOMER";
  const myName = user?.name || (currentRole === "PRO" ? "Lead Contractor" : "Homeowner");

  const [messages, setMessages] = React.useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return initialMessages || [];
  });

  const [inputMessage, setInputMessage] = React.useState("");
  const [isCounterOfferOpen, setIsCounterOfferOpen] = React.useState(false);
  const [counterPriceInput, setCounterPriceInput] = React.useState("");
  const [counterReasonInput, setCounterReasonInput] = React.useState("");
  const [activeAgreedPrice, setActiveAgreedPrice] = React.useState(currentPrice);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // 1. Fetch messages from Neon DB
  const fetchMessagesFromNeon = React.useCallback(async () => {
    if (!referenceCode) return;
    try {
      const res = await fetch(`/api/messages?referenceCode=${encodeURIComponent(referenceCode)}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data && Array.isArray(data.messages)) {
        const mapped: ChatMessage[] = data.messages.map((m: {
          id: string;
          senderRole: "CUSTOMER" | "PRO";
          senderName: string;
          text: string;
          timestamp: string;
          isCounterOffer?: boolean;
          proposedPrice?: string | null;
          status?: "PROPOSED" | "ACCEPTED" | "DECLINED" | null;
        }) => ({
          id: m.id,
          senderRole: m.senderRole,
          senderName: m.senderName,
          text: m.text,
          timestamp: m.timestamp,
          isCounterOffer: Boolean(m.isCounterOffer),
          proposedPrice: m.proposedPrice || undefined,
          status: (m.status as ChatMessage["status"]) || undefined,
        }));

        setMessages(mapped);
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(storageKey, JSON.stringify(mapped));
          } catch {
            // ignore
          }
        }
      }
    } catch (err) {
      console.warn("Neon DB /api/messages fetch notice:", err);
    }
  }, [referenceCode, storageKey]);

  // 2. Poll messages when modal is open so 2 browsers sync in real time
  React.useEffect(() => {
    if (!isOpen || !referenceCode) return;
    let isMounted = true;

    // Initial fetch via Promise .then chain to satisfy React effect rules
    fetch(`/api/messages?referenceCode=${encodeURIComponent(referenceCode)}`)
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data: { messages?: Array<Record<string, unknown>> } | null) => {
        if (!isMounted || !data || !Array.isArray(data.messages)) return;
        const mapped: ChatMessage[] = data.messages.map((m) => ({
          id: String(m.id || ""),
          senderRole: (m.senderRole as ChatMessage["senderRole"]) || "CUSTOMER",
          senderName: String(m.senderName || ""),
          text: String(m.text || ""),
          timestamp: String(m.timestamp || ""),
          isCounterOffer: Boolean(m.isCounterOffer),
          proposedPrice: m.proposedPrice ? String(m.proposedPrice) : undefined,
          status: (m.status as ChatMessage["status"]) || undefined,
        }));
        setMessages(mapped);
      })
      .catch((err) => {
        console.warn("Neon DB /api/messages initial fetch notice:", err);
      });

    const interval = setInterval(() => {
      void fetchMessagesFromNeon();
    }, 2000);

    const handleStorageUpdate = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setMessages(parsed);
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, [isOpen, referenceCode, fetchMessagesFromNeon, storageKey]);

  // Sync to localStorage as local cache
  React.useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      } catch {
        // ignore
      }
    }
  }, [messages, storageKey]);

  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const text = inputMessage.trim();
    setInputMessage("");

    const timeStr = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const timestamp = `Today, ${timeStr}`;

    const tempMsg: ChatMessage = {
      id: `temp_${Date.now()}`,
      senderRole: currentRole,
      senderName: myName,
      text,
      timestamp,
    };

    // Optimistic local update
    setMessages((prev) => [...prev, tempMsg]);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceCode,
          senderRole: currentRole,
          senderName: myName,
          text,
          timestamp,
        }),
      });
      if (res.ok) {
        void fetchMessagesFromNeon();
      }
    } catch (err) {
      console.error("Failed to persist message to Neon DB:", err);
    }
  };

  const handleSendCounterOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!counterPriceInput.trim()) return;

    const formattedPrice =
      counterPriceInput.startsWith("£") || counterPriceInput.startsWith("$")
        ? counterPriceInput
        : `£${counterPriceInput}`;

    const text = counterReasonInput.trim()
      ? `Proposed Counter-Offer: ${formattedPrice}. Note: "${counterReasonInput.trim()}"`
      : `Proposed Counter-Offer: ${formattedPrice}.`;

    setIsCounterOfferOpen(false);
    setCounterPriceInput("");
    setCounterReasonInput("");

    const timeStr = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const timestamp = `Today, ${timeStr}`;

    const tempCounter: ChatMessage = {
      id: `temp_counter_${Date.now()}`,
      senderRole: currentRole,
      senderName: myName,
      text,
      timestamp,
      isCounterOffer: true,
      proposedPrice: formattedPrice,
      status: "PROPOSED",
    };

    // Optimistic local update
    setMessages((prev) => [...prev, tempCounter]);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceCode,
          senderRole: currentRole,
          senderName: myName,
          text,
          timestamp,
          isCounterOffer: true,
          proposedPrice: formattedPrice,
          status: "PROPOSED",
        }),
      });
      if (res.ok) {
        void fetchMessagesFromNeon();
      }
    } catch (err) {
      console.error("Failed to persist counter offer to Neon DB:", err);
    }
  };

  const handleAcceptCounterOffer = async (msgId: string, price: string) => {
    const timeStr = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const timestamp = `Today, ${timeStr}`;
    const acceptText = `I accept the revised quote of ${price}. This negotiated rate is now agreed and updated in our digital contract.`;

    setActiveAgreedPrice(price);
    if (onPriceAgreed) {
      onPriceAgreed(price);
    }

    // Optimistic local update
    setMessages((prev) => {
      const updated = prev.map((m) =>
        m.id === msgId ? { ...m, status: "ACCEPTED" as const } : m
      );
      const acceptNote: ChatMessage = {
        id: `temp_accept_${Date.now()}`,
        senderRole: currentRole,
        senderName: myName,
        text: acceptText,
        timestamp,
      };
      return [...updated, acceptNote];
    });

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceCode,
          senderRole: currentRole,
          senderName: myName,
          text: acceptText,
          timestamp,
          acceptedCounterMessageId: msgId.startsWith("temp_") ? undefined : msgId,
          agreedPrice: price,
        }),
      });
      if (res.ok) {
        void fetchMessagesFromNeon();
      }
    } catch (err) {
      console.error("Failed to persist accepted counter offer to Neon DB:", err);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Responsive Modal Container - Height & Width constrained */}
      <div className="relative z-10 w-full max-w-2xl max-h-[88vh] bg-[var(--surface)] text-[var(--text)] rounded-[var(--radius-lg)] border border-[var(--line)] shadow-2xl flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="shrink-0 p-3.5 sm:p-4 bg-[var(--bg-alt)] border-b border-[var(--line)] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-[var(--brand)] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              {counterpartName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm text-[var(--text)] truncate">{counterpartName}</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--line)] text-[var(--accent)] shrink-0">
                  {counterpartRole === "CONTRACTOR" ? "Verified Contractor" : "Verified Homeowner"}
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">
                Job Ref: <strong className="font-mono text-[var(--text)]">{referenceCode}</strong> &bull; {jobTitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close conversation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Notice & Agreed Price Strip */}
        <div className="shrink-0 px-4 py-2 bg-emerald-950/10 dark:bg-emerald-900/20 border-b border-emerald-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
            <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>End-to-End Encrypted &bull; Direct Verified Negotiation</span>
          </div>

          <div className="flex items-center space-x-2 text-[11px]">
            <span className="text-[var(--text-muted)]">Active Rate:</span>
            <span className="font-mono font-extrabold text-xs text-[var(--text)] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--line)]">
              {activeAgreedPrice}
            </span>
          </div>
        </div>

        {/* Scrollable Message Thread Area */}
        <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-3 bg-[var(--bg)]/40 text-xs">
          {messages.length === 0 ? (
            <div className="h-full min-h-[180px] flex flex-col items-center justify-center text-center p-6 text-[var(--text-muted)] space-y-2">
              <div className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)] mb-1 shadow-xs">
                <MessageSquare className="w-5 h-5" />
              </div>
              <p className="font-bold text-xs text-[var(--text)]">Direct Conversation Thread</p>
              <p className="text-[11px] max-w-sm text-[var(--text-muted)] leading-relaxed">
                Connect directly with <strong className="text-[var(--text)]">{counterpartName}</strong> regarding job <span className="font-mono text-[var(--text)]">{referenceCode}</span>. Discuss access times, part specifications, or submit counter-offers below.
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.senderRole === currentRole;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center space-x-1.5 mb-1 text-[10px] text-[var(--text-light)]">
                    <span className="font-bold text-[var(--text)]">{isMe ? `You (${myName})` : msg.senderName}</span>
                    <span>&bull;</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-[var(--radius)] max-w-[88%] sm:max-w-[75%] space-y-2 shadow-xs ${
                      isMe
                        ? "bg-[var(--brand)] text-white rounded-br-none"
                        : "bg-[var(--surface)] border border-[var(--line)] text-[var(--text)] rounded-bl-none"
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                    {/* Counter Offer Box */}
                    {msg.isCounterOffer && (
                      <div className="mt-2 p-2.5 rounded bg-black/15 dark:bg-black/40 border border-white/20 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold uppercase tracking-wider text-[10px] opacity-90">
                            Proposed Contract Value:
                          </span>
                          <span className="font-mono font-extrabold text-sm">{msg.proposedPrice}</span>
                        </div>

                        {msg.status === "PROPOSED" && !isMe && (
                          <button
                            type="button"
                            onClick={() =>
                              handleAcceptCounterOffer(msg.id, msg.proposedPrice || activeAgreedPrice)
                            }
                            className="w-full py-1.5 px-3 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1 cursor-pointer transition-colors shadow-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            <span>Accept &amp; Lock New Rate into Contract</span>
                          </button>
                        )}

                        {msg.status === "ACCEPTED" && (
                          <div className="text-[11px] font-bold text-emerald-400 dark:text-emerald-300 flex items-center">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            <span>Agreed &amp; Updated in Contract</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Counter Offer Input Drawer */}
        {isCounterOfferOpen && (
          <form
            onSubmit={handleSendCounterOffer}
            className="shrink-0 p-3 bg-[var(--surface)] border-t border-[var(--line)] space-y-2.5 animate-in slide-in-from-bottom-2 duration-150"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--text)] flex items-center">
                <DollarSign className="w-3.5 h-3.5 text-[var(--accent)] mr-1" />
                Submit Counter-Offer for Private Bargaining
              </span>
              <button
                type="button"
                onClick={() => setIsCounterOfferOpen(false)}
                className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="w-full sm:w-36">
                <input
                  type="text"
                  required
                  placeholder="e.g. £140"
                  value={counterPriceInput}
                  onChange={(e) => setCounterPriceInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs font-mono font-bold text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Reason / terms (e.g. Can supply own materials)"
                  value={counterReasonInput}
                  onChange={(e) => setCounterReasonInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <button
                type="submit"
                className="btn-primary px-4 py-2 rounded-[var(--radius-sm)] text-xs font-bold shrink-0 cursor-pointer"
              >
                Send Offer
              </button>
            </div>
          </form>
        )}

        {/* Fixed Bottom Input Bar */}
        <div className="shrink-0 p-3 bg-[var(--surface)] border-t border-[var(--line)] space-y-2">
          {!isCounterOfferOpen && (
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[var(--text-muted)]">
                Bargain or negotiate terms in private:
              </span>
              <button
                type="button"
                onClick={() => setIsCounterOfferOpen(true)}
                className="font-bold text-[var(--accent)] hover:underline inline-flex items-center space-x-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Propose Counter-Offer</span>
              </button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder={`Type a message to ${counterpartName}...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] placeholder-[var(--text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-[var(--radius-sm)] btn-brand text-white transition-opacity disabled:opacity-40 cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
