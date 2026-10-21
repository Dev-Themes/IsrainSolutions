import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTelegramInquiryUrl(productName?: string, productIdentifier?: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/REPLACE_WITH_ACTUAL_USERNAME";
  if (!productName) {
    return baseUrl;
  }
  const text = `Hello, I would like to inquire regarding product information, documentation, and availability for: ${productName}${productIdentifier ? ` (${productIdentifier})` : ""}.`;
  return `${baseUrl}?text=${encodeURIComponent(text)}`;
}
