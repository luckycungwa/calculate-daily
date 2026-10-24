import { CALCULATOR_CATALOG } from '../src/data/calculators';
import { UNIT_GROUPS } from '../src/data/unitGroups';
import { FALLBACK_RATES } from '../src/data/currencies';

interface AuditItem {
  name: string;
  slug: string;
  kind: string;
  status: 'PASS' | 'FAIL';
  detail: string;
}

function evalFormula(fieldIds: string[], defaultValueMap: Record<string, number>, code: string): number {
  const keys = Object.keys(defaultValueMap);
  const vals = keys.map((k) => defaultValueMap[k]);
  const fn = new Function(...keys, `"use strict"; return (${code});`);
  const out = fn(...vals);
  if (typeof out !== 'number' || !Number.isFinite(out)) {
    throw new Error(`result is not a finite number: ${out}`);
  }
  return out;
}

const REGISTERED_CUSTOM = new Set([
  'TipCalculator',
  'BmiCalculator',
  'MortgageCalculator',
  'PercentageCalculator',
  'CompoundInterestCalculator',
  'DiscountCalculator',
  'CurrencyConverter',
  'DailySavingsChallenge',
  'RefinanceCalculator',
  'AmortizationScheduleCalculator',
  'AffordabilityCalculator',
  'RentVsBuyCalculator',
  'DownPaymentSavingsCalculator',
  'AgeCalculator',
  'DateDifferenceCalculator',
  'DaysUntilCalculator',
  'ScientificCalculator',
  'TdeeCalculator',
  'SleepCycleCalculator',
  'StepsToMilesCalculator',
  'StandardDeviationCalculator',
  'MeanMedianModeCalculator',
  'FinalGradeCalculator',
  'SaFuelCalculator',
]);

function auditConfig(item: { name: string; slug: string; config?: any }, results: AuditItem[]) {
  const cfg = item.config;
  if (!cfg || !Array.isArray(cfg.fields) || !Array.isArray(cfg.results)) {
    results.push({ name: item.name, slug: item.slug, kind: 'config', status: 'FAIL', detail: 'missing fields/results' });
    return;
  }
  const defaults: Record<string, number> = {};
  const fieldIds = new Set<string>();
  for (const f of cfg.fields) {
    if (fieldIds.has(f.id)) {
      results.push({ name: item.name, slug: item.slug, kind: 'config', status: 'FAIL', detail: `duplicate field id ${f.id}` });
      return;
    }
    fieldIds.add(f.id);
    defaults[f.id] = typeof f.defaultValue === 'number' ? f.defaultValue : 0;
  }
  const errors: string[] = [];
  for (const r of cfg.results) {
    if (!r.formulaCode) {
      errors.push(`result "${r.label}" has no formulaCode`);
      continue;
    }
    try {
      const val = evalFormula([...fieldIds], defaults, r.formulaCode);
      if (val === 0 && r.accent) {
        // borderline but not a failure; many legit calculators can output 0 on defaults
      }
    } catch (e: any) {
      errors.push(`result "${r.label}": ${e.message}`);
    }
  }
  results.push({
    name: item.name,
    slug: item.slug,
    kind: 'config',
    status: errors.length ? 'FAIL' : 'PASS',
    detail: errors.length ? errors.join(' | ') : `${cfg.results.length} result(s) evaluated OK`,
  });
}

function auditConverter(item: { name: string; slug: string; unitGroup?: string }, results: AuditItem[]) {
  const group = UNIT_GROUPS[item.unitGroup || ''];
  if (!group) {
    results.push({ name: item.name, slug: item.slug, kind: 'converter', status: 'FAIL', detail: `unknown unit group "${item.unitGroup}"` });
    return;
  }
  if (!group.units || group.units.length < 2) {
    results.push({ name: item.name, slug: item.slug, kind: 'converter', status: 'FAIL', detail: 'group needs at least 2 units' });
    return;
  }
  const errors: string[] = [];
  for (const u of group.units) {
    if (!Number.isFinite(u.toBaseFactor) || u.toBaseFactor <= 0) {
      errors.push(`unit "${u.value}" has bad factor ${u.toBaseFactor}`);
    }
  }
  // Check every from->to pair converts without NaN/Infinity
  for (const from of group.units) {
    for (const to of group.units) {
      const inBase = 7.5 * from.toBaseFactor + (from.toBaseOffset || 0);
      const out = (inBase - (to.toBaseOffset || 0)) / to.toBaseFactor;
      if (!Number.isFinite(out)) {
        errors.push(`${from.value}->${to.value} produced ${out}`);
      }
    }
  }
  results.push({
    name: item.name,
    slug: item.slug,
    kind: 'converter',
    status: errors.length ? 'FAIL' : 'PASS',
    detail: errors.length ? errors.join(' | ') : `${group.units.length} units, all ${group.units.length ** 2} pairs OK`,
  });
}

function auditCustom(item: { name: string; slug: string; componentId?: string }, results: AuditItem[]) {
  if (!item.componentId || !REGISTERED_CUSTOM.has(item.componentId)) {
    results.push({ name: item.name, slug: item.slug, kind: 'custom', status: 'FAIL', detail: `componentId "${item.componentId}" not registered in CalculatorRenderer` });
    return;
  }
  results.push({ name: item.name, slug: item.slug, kind: 'custom', status: 'PASS', detail: `component "${item.componentId}" is registered` });
}

function auditContent(item: { name: string; slug: string; content?: any; seo?: any }, results: AuditItem[]) {
  const c = item.content;
  if (!c) {
    results.push({ name: item.name, slug: item.slug, kind: 'content', status: 'FAIL', detail: 'missing content' });
    return;
  }
  const errors: string[] = [];
  for (const [key, label] of [
    ['intro', 'intro'],
    ['howItWorks', 'howItWorks'],
    ['example', 'example'],
  ] as const) {
    if (!c[key] || typeof c[key] !== 'string' || c[key].length < 30) {
      errors.push(`${label} too short or missing`);
    }
  }
  if (!Array.isArray(c.faqs) || c.faqs.length < 2) {
    errors.push('need at least 2 FAQs');
  } else {
    for (const f of c.faqs) {
      if (!f.q || !f.a || f.q.length < 10 || f.a.length < 30) {
        errors.push('a FAQ is missing q/a or too short');
        break;
      }
    }
  }
  // Every related / workflowLinks target must exist and must not self-reference
  const slugSet = new Set(CALCULATOR_CATALOG.map((x) => x.slug));
  for (const slug of c.related || []) {
    if (!slugSet.has(slug)) errors.push(`related "${slug}" does not exist`);
    if (slug === item.slug) errors.push(`related "${slug}" self-references`);
  }
  for (const w of c.workflowLinks || []) {
    if (!w.slug || !slugSet.has(w.slug)) errors.push(`workflow link "${w?.slug}" does not exist`);
    if (w.slug === item.slug) errors.push(`workflow link "${w?.slug}" self-references`);
  }
  // Indexation gate (docs/indexation-policy.md). status=index without a completed review is a
  // silent trap: the page would be withheld from the sitemap and noindexed (fail-closed).
  // Unreviewed entries and reviewed-but-noindexed entries are both legitimate states.
  if (item.seo?.status === 'index' && item.seo?.reviewStatus !== 'reviewed') {
    errors.push('status=index requires reviewStatus=reviewed');
  }
  results.push({
    name: item.name,
    slug: item.slug,
    kind: 'content',
    status: errors.length ? 'FAIL' : 'PASS',
    detail: errors.length ? errors.join(' | ') : `${c.faqs?.length ?? 0} FAQs, related=${c.related?.length ?? 0}, workflow=${c.workflowLinks?.length ?? 0}, seo=${item.seo?.status ?? 'default'}`,
  });
}

function main() {
  const results: AuditItem[] = [];
  for (const calc of CALCULATOR_CATALOG) {
    if (calc.kind === 'config') auditConfig(calc as any, results);
    else if (calc.kind === 'converter') auditConverter(calc as any, results);
    else if (calc.kind === 'custom') auditCustom(calc as any, results);
    else results.push({ name: calc.name, slug: calc.slug, kind: calc.kind, status: 'FAIL', detail: `unknown kind "${calc.kind}"` });
    auditContent(calc as any, results);
  }

  // Currency-specific checks
  const currency = CALCULATOR_CATALOG.find((c) => c.slug === 'currency-converter');
  if (currency) {
    const missingRates = Object.keys(FALLBACK_RATES).filter((code) => !Number.isFinite(FALLBACK_RATES[code]) || FALLBACK_RATES[code] <= 0);
    results.push({
      name: currency.name,
      slug: currency.slug,
      kind: 'currency-data',
      status: missingRates.length ? 'FAIL' : 'PASS',
      detail: missingRates.length ? `bad fallback rates: ${missingRates.join(', ')}` : `${Object.keys(FALLBACK_RATES).length} fallback rates OK`,
    });
  }

  // Slug uniqueness: a duplicate slug renders one entry but emits the same URL twice in the sitemap
  {
    const counts = new Map<string, number>();
    for (const calc of CALCULATOR_CATALOG) {
      counts.set(calc.slug, (counts.get(calc.slug) ?? 0) + 1);
    }
    const duplicates = [...counts.entries()].filter(([, n]) => n > 1);
    results.push({
      name: 'catalogue',
      slug: 'unique-slugs',
      kind: 'integrity',
      status: duplicates.length ? 'FAIL' : 'PASS',
      detail: duplicates.length
        ? `duplicate slugs: ${duplicates.map(([s, n]) => `${s} x${n}`).join(', ')}`
        : `${counts.size} unique slugs across ${CALCULATOR_CATALOG.length} entries`,
    });
  }

  // Edge-case regressions. These evaluate a single result against overridden inputs,
  // so they catch maths that is wrong only outside the default values.
  const evalResult = (slug: string, index: number, overrides: Record<string, number>): number | null => {
    const calc = CALCULATOR_CATALOG.find((c) => c.slug === slug);
    if (!calc || calc.kind !== 'config') return null;
    const spec = calc.config;
    if (!spec || !spec.fields || !spec.results[index]) return null;
    const values: Record<string, number> = {};
    for (const f of spec.fields) values[f.id] = f.defaultValue;
    Object.assign(values, overrides);
    const keys = Object.keys(values);
    try {
      const fn = new Function(...keys, `"use strict"; return (${spec.results[index].formulaCode});`);
      return fn(...keys.map((k) => values[k])) as number;
    } catch {
      return Number.NaN;
    }
  };

  {
    // A payment that cannot cover the monthly interest must not report a finite payoff.
    const months = evalResult('credit-card-payoff-calculator', 0, { payment: 1 });
    const ok = months !== null && !Number.isFinite(months);
    results.push({
      name: 'Credit Card Payoff',
      slug: 'credit-card-payoff-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok
        ? 'non-amortising payment returns a non-finite payoff, not a misleading 0'
        : `expected a non-finite payoff, got ${months}`,
    });
  }

  {
    // 22:00 -> 06:00 is an 8 hour shift that crosses midnight.
    const hours = evalResult('work-hours-calculator', 0, {
      startHour: 22,
      startMin: 0,
      endHour: 6,
      endMin: 0,
      breakMin: 0,
    });
    const ok = hours !== null && Math.abs(hours - 8) < 1e-9;
    results.push({
      name: 'Work Hours',
      slug: 'work-hours-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? 'overnight 22:00-06:00 resolves to 8 hours' : `expected 8 hours, got ${hours}`,
    });
  }

  {
    // A 0% loan is a real product, not an error: the payment must be amount / months.
    const payment = evalResult('loan-payment-calculator', 0, { amount: 20000, annualRate: 0, years: 5 });
    const ok = payment !== null && Number.isFinite(payment) && Math.abs(payment - 333.3333) < 0.01;
    results.push({
      name: 'Loan Payment',
      slug: 'loan-payment-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '0% APR resolves to amount / months, not NaN' : `expected 333.33, got ${payment}`,
    });
  }

  // Indexation state (docs/indexation-policy.md). Reported, never failed: the three states are all
  // legitimate. Only the contradiction status=index without reviewed is an error, handled per entry.
  {
    const total = CALCULATOR_CATALOG.length;
    const reviewed = CALCULATOR_CATALOG.filter((c) => c.seo?.reviewStatus === 'reviewed').length;
    const indexable = CALCULATOR_CATALOG.filter(
      (c) => c.seo?.status === 'index' && c.seo?.reviewStatus === 'reviewed'
    ).length;
    const withheld = CALCULATOR_CATALOG.filter(
      (c) => c.seo?.reviewStatus === 'reviewed' && c.seo?.status !== 'index'
    ).length;
    results.push({
      name: 'catalogue',
      slug: 'indexation-policy',
      kind: 'policy',
      status: 'PASS',
      detail: `indexable ${indexable} | reviewed-noindex ${withheld} | unreviewed ${total - reviewed} of ${total}`,
    });
  }

  const failed = results.filter((r) => r.status === 'FAIL');
  console.log(`\n=== CALCULATOR FUNCTIONAL AUDIT ===`);
  console.log(`Total tools: ${CALCULATOR_CATALOG.length} | Audited: ${results.length} | PASS: ${results.length - failed.length} | FAIL: ${failed.length}\n`);
  for (const r of results) {
    const mark = r.status === 'PASS' ? '  OK ' : 'FAIL ';
    console.log(`${mark} [${r.kind.padEnd(14)}] ${r.name.padEnd(32)} ${r.detail}`);
  }
  if (failed.length) {
    console.log(`\n${failed.length} FAILING ITEMS — fix before launch.`);
    process.exitCode = 1;
  } else {
    console.log(`\nAll calculators functional.`);
  }
}

main();