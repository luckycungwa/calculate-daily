import { useEffect, useReducer } from 'react';
import type { CalculatorMeta } from '../types';
import { ensureCalculatorData, getCalculatorData } from '../data/catalogRuntime';
import { hasCalculator } from '../data/catalogLinks';

export interface CalculatorEntryState {
  /** Full entry (config + prose), once its content chunk has loaded. */
  entry?: CalculatorMeta;
  /** Whether the slug exists at all, known synchronously from the index. */
  known: boolean;
  /** The slug exists but its content chunk is still downloading. */
  loading: boolean;
}

/**
 * Resolves the full catalogue entry for a slug.
 *
 * Direct navigation is preloaded in `main.tsx` before hydration, so the first
 * client render already has the entry and matches the prerendered HTML. This
 * hook covers in-app navigation, where the next content chunk is fetched on
 * demand and the page shows a skeleton for the length of one chunk request.
 */
export function useCalculatorEntry(slug: string): CalculatorEntryState {
  const entry = getCalculatorData(slug);
  const known = hasCalculator(slug);
  const [, force] = useReducer((n: number) => n + 1, 0);

  useEffect(() => {
    if (entry || !known) return;
    let active = true;
    ensureCalculatorData(slug).then(() => {
      if (active) force();
    });
    return () => {
      active = false;
    };
  }, [slug, entry, known]);

  return { entry, known, loading: known && !entry };
}
