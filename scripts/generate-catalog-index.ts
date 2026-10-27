/**
 * Generates the client-side catalogue index.
 *
 * The full catalogue (prose, FAQs, formula specs) is ~730 kB of minified
 * JavaScript. Only the calculator page for a given slug needs that entry, so the
 * client imports a small listing projection plus one content-area chunk on
 * demand. This script is the single source of truth for both halves: it reads
 * the real catalogues and writes the index, so they cannot drift.
 *
 * Run with: npm run catalog:index
 * Also runs automatically before `vite build` via the build script.
 */
import fs from 'fs';
import path from 'path';
import type { CalculatorMeta, CalculatorCardModel, CalculatorSummary } from '../src/types';
import { MATH_CALCULATORS } from '../src/data/catalog/math';
import { FINANCE_CALCULATORS } from '../src/data/catalog/finance';
import { HEALTH_CALCULATORS } from '../src/data/catalog/health';
import { CONVERSION_CALCULATORS } from '../src/data/catalog/conversion';
import { TIME_CALCULATORS } from '../src/data/catalog/time';
import { CONSTRUCTION_CALCULATORS } from '../src/data/catalog/construction';
import { FOOD_CALCULATORS, FITNESS_CALCULATORS, DAILY_CALCULATORS } from '../src/data/catalog/other';
import { TECH_CALCULATORS } from '../src/data/catalog/tech';
import { SCIENCE_CALCULATORS } from '../src/data/catalog/science';
import { FOOD_AND_AUTO_CALCULATORS } from '../src/data/catalog/foodAndAuto';
import { SPORTS_AND_HOME_CALCULATORS } from '../src/data/catalog/sportsAndHome';
import { AI_CALCULATORS } from '../src/data/catalog/ai';

export const CATALOG_SOURCES = [
  ['math', MATH_CALCULATORS],
  ['finance', FINANCE_CALCULATORS],
  ['health', HEALTH_CALCULATORS],
  ['conversion', CONVERSION_CALCULATORS],
  ['time', TIME_CALCULATORS],
  ['construction', CONSTRUCTION_CALCULATORS],
  ['other', FOOD_CALCULATORS],
  ['other', FITNESS_CALCULATORS],
  ['other', DAILY_CALCULATORS],
  ['tech', TECH_CALCULATORS],
  ['science', SCIENCE_CALCULATORS],
  ['foodAndAuto', FOOD_AND_AUTO_CALCULATORS],
  ['sportsAndHome', SPORTS_AND_HOME_CALCULATORS],
  ['ai', AI_CALCULATORS],
] as const;

export type CatalogChunkId = (typeof CATALOG_SOURCES)[number][0];

export const CHUNK_IDS: CatalogChunkId[] = [
  'math',
  'finance',
  'health',
  'conversion',
  'time',
  'construction',
  'other',
  'tech',
  'science',
  'foodAndAuto',
  'sportsAndHome',
  'ai',
];

function toSummary(calc: CalculatorMeta): CalculatorSummary {
  return {
    id: calc.id,
    slug: calc.slug,
    name: calc.name,
    shortDesc: calc.shortDesc,
    tagline: calc.tagline,
    category: calc.category,
    iconName: calc.iconName,
    kind: calc.kind,
    ...(calc.badge ? { badge: calc.badge } : {}),
    ...(calc.featured ? { featured: true } : {}),
    ...(calc.keywords && calc.keywords.length ? { keywords: calc.keywords } : {}),
    ...(calc.seo ? { seo: calc.seo } : {}),
  };
}

function main(): void {
  const summaries: CalculatorSummary[] = [];
  const chunkBySlug: Record<string, CatalogChunkId> = {};
  const seen = new Set<string>();
  const chunkCounts: Record<string, number> = {};

  for (const [chunk, entries] of CATALOG_SOURCES) {
    for (const entry of entries) {
      if (seen.has(entry.slug)) {
        throw new Error(`Duplicate slug while building index: ${entry.slug}`);
      }
      seen.add(entry.slug);
      summaries.push(toSummary(entry));
      chunkBySlug[entry.slug] = chunk;
      chunkCounts[chunk] = (chunkCounts[chunk] ?? 0) + 1;
    }
  }

  // Home-page data is captured before the stable sort so the featured/popular
  // order still follows the curated catalogue order rather than the alphabet.
  // Cards only need the fields they display, so the home payload stays small.
  const toCard = (c: CalculatorSummary): CalculatorCardModel => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    shortDesc: c.shortDesc,
    category: c.category,
    iconName: c.iconName,
    ...(c.badge ? { badge: c.badge } : {}),
  });
  const featured = summaries.filter((c) => c.featured).slice(0, 12).map(toCard);
  const popular = [...summaries]
    .sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0))
    .slice(0, 12)
    .map(toCard);
  const total = summaries.length;

  // Counts per category for navigation menus. Computed here so the header can
  // show them without importing the full index.
  const categoryCounts: Record<string, number> = {};
  for (const summary of summaries) {
    categoryCounts[summary.category] = (categoryCounts[summary.category] ?? 0) + 1;
  }
  const sortedCategoryCounts: Record<string, number> = {};
  for (const key of Object.keys(categoryCounts).sort()) {
    sortedCategoryCounts[key] = categoryCounts[key];
  }

  // A slug → name/icon projection for related-tool links. Calculator pages use
  // this instead of the full index so they never download the whole directory.
  const links: Record<string, { name: string; iconName: string; shortDesc: string }> = {};
  for (const summary of summaries) {
    links[summary.slug] = {
      name: summary.name,
      iconName: summary.iconName,
      shortDesc: summary.shortDesc,
    };
  }

  // Stable ordering keeps the generated file diff-free between runs.
  summaries.sort((a, b) => a.slug.localeCompare(b.slug));

  const sortedChunks: Record<string, CatalogChunkId> = {};
  for (const slug of Object.keys(chunkBySlug).sort()) {
    sortedChunks[slug] = chunkBySlug[slug];
  }

  const out = `// GENERATED FILE — do not edit by hand.
// Source: scripts/generate-catalog-index.ts (npm run catalog:index)
// ${summaries.length} calculators. Listing/search projection — route chunks only.
import type { CalculatorSummary } from '../types';

export const CALCULATOR_INDEX: CalculatorSummary[] = ${JSON.stringify(summaries)};
`;

  const chunksOut = `// GENERATED FILE — do not edit by hand.
// Source: scripts/generate-catalog-index.ts (npm run catalog:index)
// Loaded by the app shell, so this file must stay small.
export type CatalogChunkId =
${CHUNK_IDS.map((id) => `  | '${id}'`).join('\n')};

export const CATALOG_CHUNK_IDS: CatalogChunkId[] = ${JSON.stringify(CHUNK_IDS)};

export const CATALOG_CHUNK_BY_SLUG: Record<string, CatalogChunkId> = ${JSON.stringify(sortedChunks)};
`;

  const linksOut = `// GENERATED FILE — do not edit by hand.
// Source: scripts/generate-catalog-index.ts (npm run catalog:index)
// Compact slug → name/icon/summary map used by tool pages for related-tool links.
export const CALCULATOR_LINKS: Record<string, { name: string; iconName: string; shortDesc: string }> = ${JSON.stringify(links)};
`;

  const homeOut = `// GENERATED FILE — do not edit by hand.
// Source: scripts/generate-catalog-index.ts (npm run catalog:index)
import type { CalculatorCardModel } from '../types';

export const HOME_CALCULATOR_COUNT = ${total};

export const HOME_FEATURED: CalculatorCardModel[] = ${JSON.stringify(featured)};

export const HOME_POPULAR: CalculatorCardModel[] = ${JSON.stringify(popular)};

export const HOME_CATEGORY_COUNTS: Record<string, number> = ${JSON.stringify(sortedCategoryCounts)};
`;

  fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'catalogIndex.generated.ts'), out, 'utf8');
  fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'catalogChunks.generated.ts'), chunksOut, 'utf8');
  fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'catalogLinks.generated.ts'), linksOut, 'utf8');
  fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'homeIndex.generated.ts'), homeOut, 'utf8');
  console.log(
    `catalog index: ${summaries.length} calculators → src/data/catalogIndex.generated.ts (${Math.round(
      out.length / 1024
    )} kB); chunk map ${Math.round(chunksOut.length / 1024)} kB`
  );
  console.log(
    `catalog links: ${Object.keys(links).length} slugs → src/data/catalogLinks.generated.ts (${Math.round(
      linksOut.length / 1024
    )} kB); home index ${Math.round(homeOut.length / 1024)} kB`
  );
  console.log(
    'chunks: ' +
      Object.entries(chunkCounts)
        .map(([id, count]) => `${id}=${count}`)
        .join(' ')
  );
}

main();
