/**
 * Emits the SEO inventory that the growth loop is audited against.
 *
 * Writes `docs/seo-growth/calculator-inventory.csv` (one row per calculator) and
 * prints the summary used in `docs/seo-growth/baseline-audit.md`. It reads the
 * catalog directly, so a new tool appears in the inventory the moment it is
 * added — the numbers in the audit docs are regenerated, never hand-counted.
 *
 *   npm run seo:inventory
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { CALCULATOR_CATALOG } from '../src/data/calculators';
import { GUIDE_REGISTRY } from '../src/data/guides';

const OUT_DIR = path.join(process.cwd(), 'docs', 'seo-growth');
const OUT_FILE = path.join(OUT_DIR, 'calculator-inventory.csv');

const isIndexable = (entry: { seo?: { status?: string; reviewStatus?: string } }) =>
  entry.seo?.status === 'index' && entry.seo?.reviewStatus === 'reviewed';

/** Contextual inbound links: `related`, `workflowLinks`, and guide references. */
const inbound = new Map<string, number>();
const addInbound = (slug: string) => inbound.set(slug, (inbound.get(slug) ?? 0) + 1);

for (const calc of CALCULATOR_CATALOG) {
  for (const slug of calc.content.related ?? []) addInbound(slug);
  for (const link of calc.content.workflowLinks ?? []) addInbound(link.slug);
}
for (const guide of GUIDE_REGISTRY) {
  for (const slug of [...guide.embeddedCalculators, ...guide.relatedCalculators]) addInbound(slug);
}

const csvEscape = (value: string | number | boolean | undefined) => {
  const text = value === undefined ? '' : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

const header = [
  'slug',
  'name',
  'category',
  'kind',
  'implementation',
  'seo_status',
  'review_status',
  'indexable',
  'in_sitemap',
  'priority',
  'updated_at',
  'faqs',
  'related',
  'workflow_links',
  'formulas',
  'intro_chars',
  'inbound_links',
  'seo_title_override',
];

const rows = CALCULATOR_CATALOG.map((calc) => {
  const indexable = isIndexable(calc);
  return [
    calc.slug,
    calc.name,
    calc.category,
    calc.kind,
    calc.componentId ?? calc.unitGroup ?? calc.config?.results.length + ' results',
    calc.seo?.status ?? 'absent',
    calc.seo?.reviewStatus ?? 'absent',
    indexable ? 'yes' : 'no',
    indexable ? 'yes' : 'no',
    calc.seo?.priority ?? '',
    calc.seo?.updatedAt ?? '',
    calc.content.faqs.length,
    (calc.content.related ?? []).length,
    (calc.content.workflowLinks ?? []).length,
    (calc.content.formulas ?? []).length,
    calc.content.intro.length,
    inbound.get(calc.slug) ?? 0,
    calc.seo?.title ? 'yes' : 'no',
  ].map(csvEscape);
});

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, [header.join(','), ...rows.map((r) => r.join(','))].join('\n') + '\n');

// ---------------------------------------------------------------- summary ---

const byCategory = new Map<string, number>();
for (const calc of CALCULATOR_CATALOG) {
  byCategory.set(calc.category, (byCategory.get(calc.category) ?? 0) + 1);
}

const indexableCount = CALCULATOR_CATALOG.filter(isIndexable).length;
const reviewedNoindex = CALCULATOR_CATALOG.filter(
  (c) => c.seo?.reviewStatus === 'reviewed' && c.seo?.status === 'noindex'
).length;
const unreviewed = CALCULATOR_CATALOG.filter((c) => c.seo?.reviewStatus !== 'reviewed').length;
const withTitleOverride = CALCULATOR_CATALOG.filter((c) => c.seo?.title).length;

const indexableGuides = GUIDE_REGISTRY.filter(isIndexable);

const countDuplicates = (values: string[]) => {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()].filter(([, n]) => n > 1);
};

const duplicateNames = countDuplicates(CALCULATOR_CATALOG.map((c) => c.name));
const duplicateDescriptions = countDuplicates(CALCULATOR_CATALOG.map((c) => c.shortDesc));

const zeroInbound = CALCULATOR_CATALOG.filter((c) => (inbound.get(c.slug) ?? 0) === 0);
const thinFaqs = CALCULATOR_CATALOG.filter((c) => c.content.faqs.length < 3);
const noFormulas = CALCULATOR_CATALOG.filter((c) => (c.content.formulas ?? []).length === 0);

console.log(`SEO inventory -> ${path.relative(process.cwd(), OUT_FILE)}`);
console.log(`  calculators: ${CALCULATOR_CATALOG.length}`);
console.log(`  indexable:   ${indexableCount}`);
console.log(`  reviewed-noindex: ${reviewedNoindex}`);
console.log(`  unreviewed:  ${unreviewed}`);
console.log(`  seo title overrides: ${withTitleOverride}`);
console.log(
  `  categories:  ${[...byCategory.entries()].map(([id, n]) => `${id}=${n}`).join(' ')}`
);
console.log(`  guides: ${GUIDE_REGISTRY.length} (${indexableGuides.length} indexable)`);
console.log(`  duplicate names: ${duplicateNames.length}`);
console.log(`  duplicate short descriptions: ${duplicateDescriptions.length}`);
console.log(`  zero contextual inbound links: ${zeroInbound.length}`);
console.log(`    ${zeroInbound.slice(0, 15).map((c) => c.slug).join(', ')}`);
console.log(`  fewer than 3 FAQs: ${thinFaqs.length}`);
console.log(`  no documented formula: ${noFormulas.length}`);
