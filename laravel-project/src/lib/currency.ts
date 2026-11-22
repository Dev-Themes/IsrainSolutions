"use client";

import * as React from "react";

export type CurrencyCode = "GBP" | "USD" | "EUR";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateAgainstGbp: number; // GBP = 1.00
}

export const CURRENCY_CONFIGS: Record<CurrencyCode, CurrencyConfig> = {
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    rateAgainstGbp: 1.0,
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    rateAgainstGbp: 1.28,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    rateAgainstGbp: 1.17,
  },
};

const STORAGE_KEY_CURRENCY = "tradeconnect_user_selected_currency_v1";

export function parsePriceToGbp(price: string | number): number {
  if (typeof price === "number") return price;
  if (!price) return 0;
  const num = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
  if (price.includes("$")) {
    return num / CURRENCY_CONFIGS.USD.rateAgainstGbp;
  }
  if (price.includes("€")) {
    return num / CURRENCY_CONFIGS.EUR.rateAgainstGbp;
  }
  return num; // Default GBP
}

export function formatPriceInCurrency(
  amountInGbp: number,
  targetCurrency: CurrencyCode = "GBP"
): string {
  const cfg = CURRENCY_CONFIGS[targetCurrency] || CURRENCY_CONFIGS.GBP;
  const converted = amountInGbp * cfg.rateAgainstGbp;
  return `${cfg.symbol}${converted.toFixed(2)}`;
}

export function convertPriceString(
  rawPrice: string | number,
  targetCurrency: CurrencyCode = "GBP"
): string {
  const gbpVal = parsePriceToGbp(rawPrice);
  return formatPriceInCurrency(gbpVal, targetCurrency);
}

export function useCurrency() {
  const [currency, setCurrencyState] = React.useState<CurrencyCode>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_CURRENCY) as CurrencyCode;
        if (saved && CURRENCY_CONFIGS[saved]) return saved;
      } catch {
        // ignore
      }
    }
    return "GBP";
  });

  const setCurrency = React.useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_CURRENCY, code);
        window.dispatchEvent(new CustomEvent("tc_currency_change", { detail: { currency: code } }));
      } catch {
        // ignore
      }
    }
  }, []);

  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_CURRENCY && e.newValue && CURRENCY_CONFIGS[e.newValue as CurrencyCode]) {
        setCurrencyState(e.newValue as CurrencyCode);
      }
    };
    const handleCustom = (e: Event) => {
      const custom = e as CustomEvent<{ currency: CurrencyCode }>;
      if (custom.detail?.currency && CURRENCY_CONFIGS[custom.detail.currency]) {
        setCurrencyState(custom.detail.currency);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("tc_currency_change", handleCustom);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("tc_currency_change", handleCustom);
    };
  }, []);

  const format = React.useCallback(
    (rawPrice: string | number) => {
      return convertPriceString(rawPrice, currency);
    },
    [currency]
  );

  return {
    currency,
    setCurrency,
    format,
    config: CURRENCY_CONFIGS[currency],
  };
}
