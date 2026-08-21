import { useState, useEffect } from 'react';

const STORAGE_KEY = 'calculate_daily_currency';
const DEFAULT_CURRENCY = '$';

export const CURRENCY_SYMBOLS = ['R', '$', '€', '£', '¥', '₹', 'A$', 'C$', 'S$', 'NZ$', '₦', '₱', 'kr', 'zł', '₩', '฿'];

export function getCurrencySymbol(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && CURRENCY_SYMBOLS.includes(saved)) return saved;
  } catch {
    /* ignore */
  }
  return DEFAULT_CURRENCY;
}

export function setCurrencySymbol(symbol: string) {
  try {
    localStorage.setItem(STORAGE_KEY, symbol);
  } catch {
    /* ignore */
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('currencychange'));
  }
}

export function useCurrency(): string {
  const [symbol, setSymbol] = useState<string>(() => getCurrencySymbol());

  useEffect(() => {
    const handler = () => setSymbol(getCurrencySymbol());
    window.addEventListener('currencychange', handler);
    return () => window.removeEventListener('currencychange', handler);
  }, []);

  return symbol;
}

// Replaces a dollar prefix in calculator configs with the active currency symbol.
export function applyCurrency(prefix: string | undefined, currency: string): string | undefined {
  if (!prefix) return prefix;
  return prefix.replace(/\$/g, currency);
}