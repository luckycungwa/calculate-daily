import type { CalculatorMeta } from '../types';
import { CATALOG_CHUNK_BY_SLUG, type CatalogChunkId } from './catalogChunks.generated';

/**
 * Loads calculator entries on demand.
 *
 * Client bundle policy: the catalogue is split by content area, and a route only
 * downloads the area it needs. The index (`catalogIndex.generated.ts`) answers
 * "does this slug exist, and what is it called"; this module answers "give me
 * the full entry".
 *
 * Prerendering runs in Node and needs every entry synchronously during
 * `renderToStaticMarkup`, so it calls `preloadAllCatalogData()` first and then
 * reads through `getCalculatorData()`. The browser does the same thing for the
 * current route before hydrating, which keeps the first client render identical
 * to the server-rendered HTML.
 */

const entries = new Map<string, CalculatorMeta>();
const chunkPromises = new Map<CatalogChunkId, Promise<void>>();

function register(list: readonly CalculatorMeta[]): void {
  for (const entry of list) entries.set(entry.slug, entry);
}

const CHUNK_LOADERS: Record<CatalogChunkId, () => Promise<void>> = {
  math: async () => register((await import('./catalog/math')).MATH_CALCULATORS),
  finance: async () => register((await import('./catalog/finance')).FINANCE_CALCULATORS),
  health: async () => register((await import('./catalog/health')).HEALTH_CALCULATORS),
  conversion: async () => register((await import('./catalog/conversion')).CONVERSION_CALCULATORS),
  time: async () => register((await import('./catalog/time')).TIME_CALCULATORS),
  construction: async () => register((await import('./catalog/construction')).CONSTRUCTION_CALCULATORS),
  other: async () => {
    const mod = await import('./catalog/other');
    register(mod.FOOD_CALCULATORS);
    register(mod.FITNESS_CALCULATORS);
    register(mod.DAILY_CALCULATORS);
  },
  tech: async () => register((await import('./catalog/tech')).TECH_CALCULATORS),
  science: async () => register((await import('./catalog/science')).SCIENCE_CALCULATORS),
  foodAndAuto: async () => register((await import('./catalog/foodAndAuto')).FOOD_AND_AUTO_CALCULATORS),
  sportsAndHome: async () => register((await import('./catalog/sportsAndHome')).SPORTS_AND_HOME_CALCULATORS),
  ai: async () => register((await import('./catalog/ai')).AI_CALCULATORS),
};

export function getCatalogChunkId(slug: string): CatalogChunkId | undefined {
  return CATALOG_CHUNK_BY_SLUG[slug];
}

/** Full entry for a slug, if its chunk has already been loaded. */
export function getCalculatorData(slug: string): CalculatorMeta | undefined {
  return entries.get(slug);
}

export function isCalculatorDataLoaded(slug: string): boolean {
  return entries.has(slug);
}

async function loadChunk(id: CatalogChunkId): Promise<void> {
  let pending = chunkPromises.get(id);
  if (!pending) {
    pending = CHUNK_LOADERS[id]();
    chunkPromises.set(id, pending);
  }
  return pending;
}

/** Ensures the entry for `slug` is available. Resolves `undefined` for a bad slug. */
export async function ensureCalculatorData(slug: string): Promise<CalculatorMeta | undefined> {
  const existing = entries.get(slug);
  if (existing) return existing;
  const chunk = CATALOG_CHUNK_BY_SLUG[slug];
  if (!chunk) return undefined;
  await loadChunk(chunk);
  return entries.get(slug);
}

/** Prerender / Node entry point: load every content area once. */
export async function preloadAllCatalogData(): Promise<void> {
  await Promise.all((Object.keys(CHUNK_LOADERS) as CatalogChunkId[]).map((id) => loadChunk(id)));
}

/** Test hook: clears the cache so a fresh chunk load can be observed. */
export function resetCatalogCache(): void {
  entries.clear();
  chunkPromises.clear();
}
