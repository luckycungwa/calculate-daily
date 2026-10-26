import type { CalculatorCategory, CalculatorSummary } from '../types';
import { CALCULATOR_INDEX } from './catalogIndex.generated';

/**
 * Listing/search access to the catalogue.
 *
 * This module is safe to import from any page: it carries names, descriptions,
 * keywords and SEO state, but no calculator prose or formula specs.
 */
export { CATEGORIES, CATEGORY_LABELS, getCategoryById } from './categories';
export { CALCULATOR_INDEX } from './catalogIndex.generated';

export const CALCULATOR_CATALOG: CalculatorSummary[] = CALCULATOR_INDEX;
export const CALCULATOR_COUNT: number = CALCULATOR_INDEX.length;

const bySlug = new Map<string, CalculatorSummary>(CALCULATOR_INDEX.map((c) => [c.slug, c]));

export function getCalculatorBySlug(slug: string): CalculatorSummary | undefined {
  return bySlug.get(slug);
}

export function getCalculatorById(id: string): CalculatorSummary | undefined {
  return CALCULATOR_INDEX.find((c) => c.id === id);
}

export function getCalculatorsByCategory(category: CalculatorCategory): CalculatorSummary[] {
  if (category === 'all') return CALCULATOR_INDEX;
  return CALCULATOR_INDEX.filter((c) => c.category === category);
}

export function getFeaturedCalculators(): CalculatorSummary[] {
  return CALCULATOR_INDEX.filter((c) => c.featured);
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const entry of CALCULATOR_INDEX) {
    counts[entry.category] = (counts[entry.category] ?? 0) + 1;
  }
  return counts;
}
