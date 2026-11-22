"use client";

import * as React from "react";

export interface MessageThreadSummary {
  referenceCode: string;
  unreadCount: number;
  lastMessageText?: string;
  lastMessageTime?: string;
  lastSenderRole?: "CUSTOMER" | "PRO";
}

function getReadTimestamp(referenceCode: string, role: string): number {
  if (typeof window === "undefined") return 0;
  try {
    const val = localStorage.getItem(`tc_read_${role}_${referenceCode}`);
    return val ? parseInt(val, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function markThreadAsRead(referenceCode: string, role: string) {
  if (typeof window === "undefined" || !referenceCode) return;
  try {
    localStorage.setItem(`tc_read_${role}_${referenceCode}`, Date.now().toString());
    const cached = localStorage.getItem(`tradeconnect_thread_${referenceCode}`);
    if (cached) {
      try {
        const msgs = JSON.parse(cached);
        if (Array.isArray(msgs)) {
          const counterpartMsgs = msgs.filter((m: { senderRole: string }) => m.senderRole !== role).length;
          localStorage.setItem(`tc_readcount_${role}_${referenceCode}`, counterpartMsgs.toString());
        }
      } catch {
        // ignore
      }
    }
    window.dispatchEvent(
      new CustomEvent("tc_messages_read", { detail: { referenceCode, role } })
    );
  } catch {
    // ignore
  }
}

export function useUnreadMessages(
  role?: "CUSTOMER" | "PRO" | "ADMIN",
  referenceCodes: string[] = []
) {
  const [unreadMap, setUnreadMap] = React.useState<Record<string, number>>({});
  const [threadSummaries, setThreadSummaries] = React.useState<MessageThreadSummary[]>([]);
  const activeRole = role === "PRO" ? "PRO" : "CUSTOMER";
  const refKey = referenceCodes.join(",");

  const calculateUnreads = React.useCallback(async () => {
    if (typeof window === "undefined") {
      setUnreadMap({});
      setThreadSummaries([]);
      return;
    }

    try {
      // 1. Fetch latest messages from Neon DB across all threads
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.messages)) {
          // Group messages by referenceCode
          const byRef: Record<string, Array<{
            id: string;
            referenceCode: string;
            senderRole: string;
            senderName: string;
            text: string;
            timestamp: string;
            isCounterOffer?: boolean;
            proposedPrice?: string;
            status?: string;
          }>> = {};

          data.messages.forEach((m: {
            id: string;
            referenceCode: string;
            senderRole: string;
            senderName: string;
            text: string;
            timestamp: string;
            isCounterOffer?: boolean;
            proposedPrice?: string;
            status?: string;
          }) => {
            if (!m.referenceCode) return;
            if (!byRef[m.referenceCode]) byRef[m.referenceCode] = [];
            byRef[m.referenceCode].push(m);
          });

          // Also check localStorage for any pending local threads
          try {
            Object.keys(localStorage)
              .filter((k) => k.startsWith("tradeconnect_thread_"))
              .forEach((k) => {
                const ref = k.replace("tradeconnect_thread_", "");
                if (!byRef[ref]) {
                  try {
                    const localMsgs = JSON.parse(localStorage.getItem(k) || "[]");
                    if (Array.isArray(localMsgs) && localMsgs.length > 0) {
                      byRef[ref] = localMsgs;
                    }
                  } catch {
                    // ignore
                  }
                }
              });
          } catch {
            // ignore
          }

          const newMap: Record<string, number> = {};
          const summaries: MessageThreadSummary[] = [];

          Object.entries(byRef).forEach(([ref, msgs]) => {
            // Cache messages to localStorage for instant modal loading
            try {
              localStorage.setItem(`tradeconnect_thread_${ref}`, JSON.stringify(msgs));
            } catch {
              // ignore
            }

            const counterpartMsgs = msgs.filter((m) => m.senderRole !== activeRole).length;
            const readCountKey = `tc_readcount_${activeRole}_${ref}`;
            const previousCount = parseInt(localStorage.getItem(readCountKey) || "0", 10);
            const lastReadTime = getReadTimestamp(ref, activeRole);

            let unreadDiff = 0;
            if (lastReadTime > 0) {
              unreadDiff = Math.max(0, counterpartMsgs - previousCount);
            } else {
              unreadDiff = counterpartMsgs;
            }

            newMap[ref] = unreadDiff;

            const lastMsg = msgs[msgs.length - 1];
            summaries.push({
              referenceCode: ref,
              unreadCount: unreadDiff,
              lastMessageText: lastMsg?.text || "New message in contract discussion",
              lastMessageTime: lastMsg?.timestamp || "Recently",
              lastSenderRole: lastMsg?.senderRole as "CUSTOMER" | "PRO",
            });
          });

          setUnreadMap(newMap);
          setThreadSummaries(summaries);
          return;
        }
      }
    } catch (err) {
      console.warn("calculateUnreads fetch notice:", err);
    }

    // Fallback if network or DB fails: check localStorage directly
    try {
      const targets = referenceCodes.filter(Boolean);
      const newMap: Record<string, number> = {};
      targets.forEach((ref) => {
        const cached = localStorage.getItem(`tradeconnect_thread_${ref}`);
        if (cached) {
          try {
            const msgs = JSON.parse(cached);
            if (Array.isArray(msgs)) {
              const counterpartMsgs = msgs.filter((m: { senderRole: string }) => m.senderRole !== activeRole).length;
              const readCountKey = `tc_readcount_${activeRole}_${ref}`;
              const previousCount = parseInt(localStorage.getItem(readCountKey) || "0", 10);
              newMap[ref] = Math.max(0, counterpartMsgs - previousCount);
            }
          } catch {
            // ignore
          }
        }
      });
      setUnreadMap(newMap);
    } catch {
      // ignore
    }
  }, [referenceCodes, activeRole]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      void calculateUnreads();
    }, 0);

    const handleUpdate = () => {
      void calculateUnreads();
    };

    window.addEventListener("tc_messages_read", handleUpdate);
    window.addEventListener("tc_new_message", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    // Periodic poll every 4s for live sync like Fiverr
    const interval = setInterval(() => {
      void calculateUnreads();
    }, 4000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("tc_messages_read", handleUpdate);
      window.removeEventListener("tc_new_message", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      clearInterval(interval);
    };
  }, [calculateUnreads, refKey]);

  const markAsRead = React.useCallback(
    (ref: string) => {
      markThreadAsRead(ref, activeRole);
      setUnreadMap((prev) => ({ ...prev, [ref]: 0 }));
      setThreadSummaries((prev) =>
        prev.map((s) => (s.referenceCode === ref ? { ...s, unreadCount: 0 } : s))
      );
    },
    [activeRole]
  );

  const totalUnread = Object.values(unreadMap).reduce((acc, curr) => acc + curr, 0);

  return {
    totalUnread,
    unreadMap,
    threadSummaries,
    markAsRead,
  };
}
