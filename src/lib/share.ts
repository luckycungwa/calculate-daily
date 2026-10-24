import { useState, useEffect } from 'react';

const PARAM_PREFIX = 'c_';

/**
 * Encodes a flat key->string map into URL query params using a stable prefix,
 * so a shared link fully reproduces a calculator's input state.
 */
export function encodeStateParams(state: Record<string, string | number | boolean>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(state)) {
    const v = typeof value === 'boolean' ? (value ? '1' : '0') : String(value);
    params.set(`${PARAM_PREFIX}${key}`, v);
  }
  return params.toString();
}

export function decodeStateParams(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const out: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    if (key.startsWith(PARAM_PREFIX)) {
      out[key.slice(PARAM_PREFIX.length)] = value;
    }
  }
  return out;
}

export function buildShareUrl(path: string, state: Record<string, string | number | boolean>): string {
  const base = typeof window !== 'undefined' ? `${window.location.origin}${path}` : path;
  const qs = encodeStateParams(state);
  return qs ? `${base}?${qs}` : base;
}

export function parseParamNumber(raw: string | undefined, fallback: number): number {
  if (raw === undefined) return fallback;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

export function parseParamBoolean(raw: string | undefined, fallback: boolean): boolean {
  if (raw === undefined) return fallback;
  return raw === '1' || raw === 'true';
}

/**
 * Syncs a calculator's input state with the URL query string (one-way write,
 * restoring on first mount). Keeps shareable links accurate while avoiding
 * full round-trip loops that fight user typing.
 */
export function useUrlState(
  initialState: Record<string, string | number | boolean>,
  deps: unknown[]
): {
  values: Record<string, string>;
  syncUrl: (values: Record<string, string | number | boolean>) => void;
} {
  const [restored] = useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') return {};
    return decodeStateParams(window.location.search);
  });

  const values: Record<string, string> = {};
  for (const [key, fallback] of Object.entries(initialState)) {
    const saved = restored[key];
    if (saved !== undefined) {
      values[key] = saved;
    } else {
      values[key] = String(fallback);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {}, deps);

  const syncUrl = (state: Record<string, string | number | boolean>) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.search = encodeStateParams(state);
    window.history.replaceState({}, '', `${url.pathname}${url.search}`);
  };

  return { values, syncUrl };
}