"use client";

import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
  compact?: boolean;
}

export function ShareButtons({ title, url, className = "", compact = false }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== "undefined" ? (url.startsWith("http") ? url : `${window.location.origin}${url}`) : url;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = fullUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  const handleTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  const handleWhatsApp = () => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${fullUrl}`)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: fullUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  if (compact) {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        <button
          onClick={handleLinkedIn}
          title="Share to LinkedIn"
          aria-label="Share to LinkedIn"
          className="w-9 h-9 rounded-xl bg-bg-surface border border-border-default hover:border-brand-primary/50 text-text-heading hover:text-brand-primary-text flex items-center justify-center transition-all hover:scale-105 shadow-2xs shrink-0"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
          </svg>
        </button>
        <button
          onClick={handleTwitter}
          title="Share on X (Twitter)"
          aria-label="Share on X (Twitter)"
          className="w-9 h-9 rounded-xl bg-bg-surface border border-border-default hover:border-brand-primary/50 text-text-heading hover:text-brand-primary-text flex items-center justify-center transition-all hover:scale-105 shadow-2xs shrink-0"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
        <button
          onClick={handleWhatsApp}
          title="Share via WhatsApp"
          aria-label="Share via WhatsApp"
          className="w-9 h-9 rounded-xl bg-bg-surface border border-border-default hover:border-brand-primary/50 text-text-heading hover:text-brand-primary-text flex items-center justify-center transition-all hover:scale-105 shadow-2xs shrink-0"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.44 0-2.85-.38-4.08-1.1l-.29-.17-3.03.79.81-2.95-.19-.3a8.21 8.21 0 0 1-1.26-4.33c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.21-.17-.46-.29" />
          </svg>
        </button>
        <button
          onClick={handleCopy}
          title={copied ? "Link Copied!" : "Copy Link"}
          aria-label={copied ? "Link Copied" : "Copy Link"}
          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs shrink-0 ${
            copied
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-bg-surface border-border-default hover:border-brand-primary/50 text-text-heading hover:text-brand-primary-text"
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-bg-surface border border-border-default shadow-xs ${className}`}>
      <span className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5 shrink-0">
        <Share2 className="w-3.5 h-3.5 text-brand-primary-text" />
        Share Guide:
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleLinkedIn}
          className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-bg-surface-subtle hover:bg-brand-soft border border-border-default text-text-heading hover:text-brand-primary-text text-xs font-bold transition-all hover:scale-105 shrink-0 min-h-[36px]"
          aria-label="Share on LinkedIn"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
          </svg>
          <span>LinkedIn</span>
        </button>

        <button
          onClick={handleTwitter}
          className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-bg-surface-subtle hover:bg-brand-soft border border-border-default text-text-heading hover:text-brand-primary-text text-xs font-bold transition-all hover:scale-105 shrink-0 min-h-[36px]"
          aria-label="Share on X"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>X / Twitter</span>
        </button>

        <button
          onClick={handleWhatsApp}
          className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-bg-surface-subtle hover:bg-emerald-50 hover:border-emerald-200 dark:hover:bg-emerald-950/40 border border-border-default text-text-heading hover:text-emerald-600 text-xs font-bold transition-all hover:scale-105 shrink-0 min-h-[36px]"
          aria-label="Share on WhatsApp"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.44 0-2.85-.38-4.08-1.1l-.29-.17-3.03.79.81-2.95-.19-.3a8.21 8.21 0 0 1-1.26-4.33c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.21-.17-.46-.29" />
          </svg>
          <span>WhatsApp</span>
        </button>

        <button
          onClick={handleCopy}
          className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs shrink-0 min-h-[36px] ${
            copied
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 hover:scale-105"
          }`}
          aria-label={copied ? "Link Copied to Clipboard" : "Copy Article Link"}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Link Copied!" : "Copy Link"}</span>
        </button>
      </div>
    </div>
  );
}
