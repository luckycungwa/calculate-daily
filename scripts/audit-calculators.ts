import { readFileSync } from 'node:fs';
import { CALCULATOR_CATALOG } from '../src/data/calculators';
import { GUIDE_REGISTRY } from '../src/data/guides';
import { UNIT_GROUPS, CONVERTER_DEFAULTS } from '../src/data/unitGroups';
import { FALLBACK_RATES } from '../src/data/currencies';
import {
  calculateBreakEven,
  calculateFraction,
  calculateWeeklyHours,
  compareUnitPrices,
} from '../src/lib/opportunityCalculations';
import {
  calculateCommission,
  calculateDensity,
  calculateFuelEconomy,
  calculateLandscapeMaterial,
  calculateRentalYield,
  calculateRoofingMaterials,
  calculateTileOrder,
  convertUnixTimestamp,
  countText,
  simulateDebtPayoff,
} from '../src/lib/scaleOpportunityCalculations';
import {
  calculateApsScore,
  calculateConceptionDate,
  calculateConfidenceIntervalMean,
  calculateDueDate,
  calculateOvulation,
  calculateSampleSize,
  percentageToNscLevel,
} from '../src/lib/academicAndHealthCalculations';

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
  'ScientificNotationCalculator',
  'SignificantFiguresCalculator',
  'GraphingCalculator',
  'TdeeCalculator',
  'SleepCycleCalculator',
  'StepsToMilesCalculator',
  'StandardDeviationCalculator',
  'MeanMedianModeCalculator',
  'FinalGradeCalculator',
  'ZScoreCalculator',
  'SolidVolumeCalculator',
  'SaFuelCalculator',
  'PricePerUnitCalculator',
  'BreakEvenCalculator',
  'FractionCalculator',
  'TimesheetCalculator',
  'CarLoanCalculator',
  'PersonalLoanCalculator',
  'GoldLoanCalculator',
  'DebtPayoffCalculator',
  'TileCalculator',
  'LandscapeMaterialCalculator',
  'RoofingCalculator',
  'RentalYieldCalculator',
  'CommissionCalculator',
  'FuelEconomyCalculator',
  'UnixTimestampCalculator',
  'WordCounterCalculator',
  'DensityCalculator',
  'ApsCalculator',
  'ConfidenceIntervalCalculator',
  'SampleSizeCalculator',
  'DueDateCalculator',
  'OvulationCalculator',
  'ConceptionCalculator',
  'PregnancyWeekCalculator',
  'VarianceCalculator',
  'PercentileCalculator',
  'NormalDistributionCalculator',
  'TriangleCalculator',
  'FractionToDecimalCalculator',
  'VatCalculator',
  'NpvCalculator',
  'IrrCalculator',
  'InflationCalculator',
  'IpSubnetCalculator',
  'NumberBaseConverter',
  'PasswordEntropyCalculator',
  'UrlEncoderDecoder',
  'ColorConverter',
  'ContrastRatioCalculator',
  'MolecularWeightCalculator',
  'PhCalculator',
  'OhmsLawCalculator',
  'ResistorColorCodeCalculator',
  'IngredientWeightConverter',
  'ButterConverter',
  'FlourConverter',
  'OvenTemperatureConverter',
  'SpeedDistanceTimeCalculator',
  'RaceTimePredictor',
  'GolfHandicapCalculator',
  'PetCalorieCalculator',
  'ConversionRateCalculator',
  'DimensionalWeightCalculator',
  'FreelanceRateCalculator',
  'EvChargingCostCalculator',
  'TripCostCalculator',
  'BtuCalculator',
  'InsulationCalculator',
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

function auditGuides(results: AuditItem[]) {
  const guideSlugs = new Set(GUIDE_REGISTRY.map((guide) => guide.slug));
  const guideIds = new Set(GUIDE_REGISTRY.map((guide) => guide.id));
  const calculatorSlugs = new Set(CALCULATOR_CATALOG.map((calc) => calc.slug));
  const slugCounts = new Map<string, number>();
  const idCounts = new Map<string, number>();

  for (const guide of GUIDE_REGISTRY) {
    slugCounts.set(guide.slug, (slugCounts.get(guide.slug) ?? 0) + 1);
    idCounts.set(guide.id, (idCounts.get(guide.id) ?? 0) + 1);
  }

  const duplicateSlugs = [...slugCounts.entries()].filter(([, count]) => count > 1);
  const duplicateIds = [...idCounts.entries()].filter(([, count]) => count > 1);
  results.push({
    name: 'guide registry',
    slug: 'unique-guide-routes',
    kind: 'integrity',
    status: duplicateSlugs.length || duplicateIds.length ? 'FAIL' : 'PASS',
    detail:
      duplicateSlugs.length || duplicateIds.length
        ? `duplicate slugs: ${duplicateSlugs.map(([slug]) => slug).join(', ') || 'none'}; duplicate IDs: ${duplicateIds.map(([id]) => id).join(', ') || 'none'}`
        : `${guideSlugs.size} unique guide slugs and ${guideIds.size} unique guide IDs`,
  });

  for (const guide of GUIDE_REGISTRY) {
    const errors: string[] = [];
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(guide.slug)) {
      errors.push('slug is not a valid lowercase route segment');
    }
    if (!guide.name.trim() || guide.shortDesc.trim().length < 30) {
      errors.push('missing name or useful short description');
    }
    if (!guide.content.hook.trim() || guide.content.sections.length === 0) {
      errors.push('missing introduction or article sections');
    }
    for (const slug of [...guide.embeddedCalculators, ...guide.relatedCalculators]) {
      if (!calculatorSlugs.has(slug)) errors.push(`calculator reference "${slug}" does not exist`);
    }
    for (const slug of guide.relatedGuides || []) {
      if (!guideSlugs.has(slug)) errors.push(`related guide "${slug}" does not match a guide slug`);
      if (slug === guide.slug) errors.push(`related guide "${slug}" self-references`);
    }
    if (guide.seo?.status === 'index' && guide.seo?.reviewStatus !== 'reviewed') {
      errors.push('status=index requires reviewStatus=reviewed');
    }
    if (
      guide.seo?.priority !== undefined &&
      (!Number.isFinite(guide.seo.priority) || guide.seo.priority < 0 || guide.seo.priority > 1)
    ) {
      errors.push('SEO priority must be between 0 and 1');
    }

    results.push({
      name: guide.name,
      slug: guide.slug,
      kind: 'guide-integrity',
      status: errors.length ? 'FAIL' : 'PASS',
      detail: errors.length ? errors.join(' | ') : 'route, metadata, and calculator/guide references valid',
    });
  }
}

function auditRedirects(results: AuditItem[]) {
  interface VercelRedirect {
    source: string;
    destination: string;
    permanent: boolean;
  }

  const config = JSON.parse(
    readFileSync(new URL('../vercel.json', import.meta.url), 'utf8')
  ) as { redirects?: VercelRedirect[] };
  const calculatorSlugs = new Set(CALCULATOR_CATALOG.map((calc) => calc.slug));
  const errors: string[] = [];
  const sources = new Set<string>();

  for (const redirect of config.redirects ?? []) {
    const sourceSlug = redirect.source.match(/^\/calculators\/([a-z0-9-]+)$/)?.[1];
    const destinationSlug = redirect.destination.match(/^\/calculators\/([a-z0-9-]+)$/)?.[1];
    if (!sourceSlug || !destinationSlug) {
      errors.push(`invalid calculator redirect ${redirect.source} -> ${redirect.destination}`);
      continue;
    }
    if (sources.has(sourceSlug)) errors.push(`duplicate redirect source "${sourceSlug}"`);
    sources.add(sourceSlug);
    if (calculatorSlugs.has(sourceSlug)) {
      errors.push(`redirect source "${sourceSlug}" still exists in the catalog`);
    }
    if (!calculatorSlugs.has(destinationSlug)) {
      errors.push(`redirect destination "${destinationSlug}" does not exist in the catalog`);
    }
    if (!redirect.permanent) errors.push(`redirect "${sourceSlug}" must be permanent`);
  }

  results.push({
    name: 'Vercel calculator redirects',
    slug: 'catalog-redirects',
    kind: 'integrity',
    status: errors.length ? 'FAIL' : 'PASS',
    detail: errors.length ? errors.join(' | ') : `${sources.size} permanent redirects target existing calculators`,
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
  auditGuides(results);

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

  {
    const counts = new Map<string, number>();
    for (const calc of CALCULATOR_CATALOG) {
      const normalizedName = calc.name.trim().replace(/\s+/g, ' ').toLowerCase();
      counts.set(normalizedName, (counts.get(normalizedName) ?? 0) + 1);
    }
    const duplicates = [...counts.entries()].filter(([, count]) => count > 1);
    results.push({
      name: 'catalogue',
      slug: 'unique-display-names',
      kind: 'integrity',
      status: duplicates.length ? 'FAIL' : 'PASS',
      detail: duplicates.length
        ? `duplicate display names: ${duplicates.map(([name, count]) => `${name} x${count}`).join(', ')}`
        : `${counts.size} unique normalized display names`,
    });
  }

  auditRedirects(results);

  // Converter pages are named for a direction, so each one must open on the
  // matching unit pair. A missing or misspelled entry silently falls back to the
  // first two units in the group — the Years to Days page showing milliseconds.
  {
    const problems: string[] = [];
    for (const calc of CALCULATOR_CATALOG) {
      if (calc.kind !== 'converter' || !calc.unitGroup) continue;
      const group = UNIT_GROUPS[calc.unitGroup];
      if (!group) {
        problems.push(`${calc.slug}: unknown unit group ${calc.unitGroup}`);
        continue;
      }
      const defaults = CONVERTER_DEFAULTS[calc.id];
      if (!defaults) {
        problems.push(`${calc.slug}: no default units`);
        continue;
      }
      if (!group.units.some((u) => u.value === defaults.from)) {
        problems.push(`${calc.slug}: from=${defaults.from} not in ${group.id}`);
      }
      if (!group.units.some((u) => u.value === defaults.to)) {
        problems.push(`${calc.slug}: to=${defaults.to} not in ${group.id}`);
      }
      if (defaults.from === defaults.to) {
        problems.push(`${calc.slug}: from and to are the same unit`);
      }
    }
    results.push({
      name: 'converters',
      slug: 'default-unit-pairs',
      kind: 'integrity',
      status: problems.length ? 'FAIL' : 'PASS',
      detail: problems.length
        ? problems.join('; ')
        : `every converter opens on its named unit pair`,
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

  {
    // 9 and 91 are the classic false positives for an odd/even "primality" test.
    const nine = evalResult('prime-number-checker', 0, { number: 9 });
    const ninetyOne = evalResult('prime-number-checker', 0, { number: 91 });
    const ninetySeven = evalResult('prime-number-checker', 0, { number: 97 });
    const two = evalResult('prime-number-checker', 0, { number: 2 });
    const ok = nine === 0 && ninetyOne === 0 && ninetySeven === 1 && two === 1;
    results.push({
      name: 'Prime Checker',
      slug: 'prime-number-checker',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok
        ? '9 and 91 are composite; 97 and 2 are prime'
        : `expected 9=0, 91=0, 97=1, 2=1, got ${nine}, ${ninetyOne}, ${ninetySeven}, ${two}`,
    });
  }

  {
    // A finished countdown must read 0h 0m, never a negative time.
    const hours = evalResult('hours-until-calculator', 0, {
      currentHour: 14,
      currentMinute: 0,
      targetHour: 6,
      targetMinute: 0,
      daysAhead: 0,
    });
    const minutes = evalResult('hours-until-calculator', 1, {
      currentHour: 14,
      currentMinute: 0,
      targetHour: 6,
      targetMinute: 0,
      daysAhead: 0,
    });
    const ok = hours === 0 && minutes === 0;
    results.push({
      name: 'Hours Until',
      slug: 'hours-until-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? 'a passed target stops at 0h 0m rather than going negative' : `expected 0 and 0, got ${hours} and ${minutes}`,
    });
  }

  {
    // The month/day/year fields must survive a year rollover and a negative offset.
    const month = evalResult('add-days-to-date', 0, { startYear: 2026, startMonth: 1, startDay: 15, daysToAdd: 45 });
    const day = evalResult('add-days-to-date', 1, { startYear: 2026, startMonth: 1, startDay: 15, daysToAdd: 45 });
    const yearAhead = evalResult('add-days-to-date', 2, { startYear: 2026, startMonth: 12, startDay: 31, daysToAdd: 1 });
    const backwards = evalResult('add-days-to-date', 2, { startYear: 2026, startMonth: 1, startDay: 15, daysToAdd: -45 });
    const ok = month === 3 && day === 1 && yearAhead === 2027 && backwards === 2025;
    results.push({
      name: 'Add Days to Date',
      slug: 'add-days-to-date',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok
        ? '15 Jan 2026 + 45 = 1 Mar 2026; 31 Dec 2026 + 1 = 2027; 15 Jan 2026 - 45 = 2025'
        : `expected 3/1/2027/2025, got ${month}/${day}/${yearAhead}/${backwards}`,
    });
  }

  {
    // 10:00 at UTC-5 is 15:00 at UTC+0.
    const converted = evalResult('time-zone-converter', 0, { hours: 10, minutes: 0, sourceOffset: -5, targetOffset: 0 });
    const wrapped = evalResult('time-zone-converter', 0, { hours: 10, minutes: 0, sourceOffset: -5, targetOffset: 9 });
    const ok = converted === 15 && wrapped === 0;
    results.push({
      name: 'Time Zone',
      slug: 'time-zone-converter',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '10:00 UTC-5 -> 15:00 UTC+0, and 00:00 when shifted past midnight' : `expected 15 and 0, got ${converted} and ${wrapped}`,
    });
  }

  {
    // 30 km each way at 8 L/100km and 1.50/L burns 4.8 litres: 7.20, not 11.25.
    const daily = evalResult('daily-commute-cost-calculator', 0, {
      distanceKm: 30,
      fuelEfficiency: 8,
      gasPrice: 1.5,
      workDays: 22,
    });
    const ok = daily !== null && Math.abs(daily - 7.2) < 1e-9;
    results.push({
      name: 'Commute Cost',
      slug: 'daily-commute-cost-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? 'L/100km is applied as consumption, giving 4.8 L and $7.20 a day' : `expected 7.2, got ${daily}`,
    });
  }

  {
    // The 483 constant is only valid for a 1.5-mile (2.4 km) run: 12:00 gives 43.75.
    const twelve = evalResult('vo2-max-calculator', 0, { timeMinutes: 12, timeSeconds: 0 });
    const half = evalResult('vo2-max-calculator', 0, { timeMinutes: 12, timeSeconds: 30 });
    const ok =
      twelve !== null &&
      half !== null &&
      Math.abs(twelve - 43.75) < 1e-9 &&
      Math.abs(half - 42.14) < 0.01;
    results.push({
      name: 'VO2 Max',
      slug: 'vo2-max-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '1.5 miles in 12:00 gives 43.75 ml/kg/min; 12:30 gives 42.14' : `expected 43.75 and 42.14, got ${twelve} and ${half}`,
    });
  }

  {
    // base^exponent and base^(1/exponent) are inverses; exponent 0 must not divide by zero.
    const power = evalResult('exponent-root-calculator', 0, { base: 9, exponent: 0.5 });
    const root = evalResult('exponent-root-calculator', 1, { base: 9, exponent: 0.5 });
    const zeroRoot = evalResult('exponent-root-calculator', 1, { base: 9, exponent: 0 });
    const cube = evalResult('exponent-root-calculator', 1, { base: 64, exponent: 3 });
    const ok =
      power === 3 &&
      root === 81 &&
      cube !== null &&
      Math.abs(cube - 4) < 1e-9 &&
      zeroRoot !== null &&
      Number.isNaN(zeroRoot);
    results.push({
      name: 'Exponent & Root',
      slug: 'exponent-root-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok
        ? '9^0.5 = 3 with root 81; cube root of 64 = 4; exponent 0 returns no root rather than Infinity'
        : `expected 3/81/4/NaN, got ${power}/${root}/${cube}/${zeroRoot}`,
    });
  }

  {
    // The Euclidean algorithm must handle pairs where neither divides the other:
    // GCD(12,18)=6 not 1, and GCD(48,180)=12 with LCM 720.
    const gcd1 = evalResult('gcd-lcm-calculator', 0, { a: 12, b: 18 });
    const lcm1 = evalResult('gcd-lcm-calculator', 1, { a: 12, b: 18 });
    const gcd2 = evalResult('gcd-lcm-calculator', 0, { a: 48, b: 180 });
    const lcm2 = evalResult('gcd-lcm-calculator', 1, { a: 48, b: 180 });
    const coprime = evalResult('gcd-lcm-calculator', 0, { a: 7, b: 13 });
    const ok = gcd1 === 6 && lcm1 === 36 && gcd2 === 12 && lcm2 === 720 && coprime === 1;
    results.push({
      name: 'GCD & LCM',
      slug: 'gcd-lcm-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok
        ? '12/18 gives 6 and 36; 48/180 gives 12 and 720; coprime 7/13 gives 1'
        : `expected 6/36/12/720/1, got ${gcd1}/${lcm1}/${gcd2}/${lcm2}/${coprime}`,
    });
  }

  {
    // A negative discriminant has no real root: report the real part and the
    // imaginary part instead of NaN, and reject a = 0.
    const disc = evalResult('quadratic-formula-calculator', 0, { a: 1, b: 2, c: 5 });
    const real1 = evalResult('quadratic-formula-calculator', 1, { a: 1, b: 2, c: 5 });
    const real2 = evalResult('quadratic-formula-calculator', 2, { a: 1, b: 2, c: 5 });
    const imag = evalResult('quadratic-formula-calculator', 3, { a: 1, b: 2, c: 5 });
    const realRoot = evalResult('quadratic-formula-calculator', 1, { a: 1, b: -5, c: 6 });
    const linear = evalResult('quadratic-formula-calculator', 1, { a: 0, b: 2, c: 5 });
    const ok =
      disc === -16 &&
      real1 === -1 &&
      real2 === -1 &&
      imag === 2 &&
      realRoot === 3 &&
      linear !== null &&
      Number.isNaN(linear);
    results.push({
      name: 'Quadratic Formula',
      slug: 'quadratic-formula-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok
        ? 'discriminant -16 gives real part -1 and imaginary 2; x^2-5x+6 gives root 3; a=0 returns no root'
        : `expected -16/-1/-1/2/3/NaN, got ${disc}/${real1}/${real2}/${imag}/${realRoot}/${linear}`,
    });
  }

  {
    // 350 ml at 1:16 is 21.875 g of coffee, 6.25% strength.
    const coffee = evalResult('coffee-ratio-calculator', 0, { waterMl: 350, ratio: 16 });
    const strength = evalResult('coffee-ratio-calculator', 1, { waterMl: 350, ratio: 16 });
    const ok =
      coffee !== null &&
      strength !== null &&
      Math.abs(coffee - 21.875) < 1e-9 &&
      Math.abs(strength - 6.25) < 1e-9;
    results.push({
      name: 'Coffee Ratio',
      slug: 'coffee-ratio-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '350 ml at 1:16 needs 21.875 g at 6.25% strength' : `expected 21.875 and 6.25, got ${coffee} and ${strength}`,
    });
  }

  {
    // The rate field is a percentage: 5 must mean 5%, not 500%.
    const final = evalResult('exponential-growth-calculator', 0, { y0: 100, r: 5, t: 10 });
    const doubling = evalResult('exponential-growth-calculator', 2, { y0: 100, r: 5, t: 10 });
    const ok =
      final !== null &&
      doubling !== null &&
      Math.abs(final - 164.87) < 0.01 &&
      Math.abs(doubling - 13.86) < 0.01;
    results.push({
      name: 'Exponential Growth',
      slug: 'exponential-growth-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok
        ? '100 at 5% for 10 periods gives 164.87 and a 13.86-period doubling time'
        : `expected 164.87 and 13.86, got ${final} and ${doubling}`,
    });
  }

  {
    // 300 miles at 30 mpg and $3.50/gal: 10 gallons, $35, about $0.1167 per mile.
    const cost = evalResult('fuel-cost-calculator', 1, { distanceMiles: 300, mpg: 30, pricePerGallon: 3.5 });
    const perMile = evalResult('fuel-cost-calculator', 2, { distanceMiles: 300, mpg: 30, pricePerGallon: 3.5 });
    const ok =
      cost !== null &&
      perMile !== null &&
      Math.abs(cost - 35) < 1e-9 &&
      Math.abs(perMile - 3.5 / 30) < 1e-9;
    results.push({
      name: 'Fuel Cost',
      slug: 'fuel-cost-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '300 mi at 30 mpg and $3.50/gal costs $35, or $0.1167 a mile' : `expected 35 and 0.1167, got ${cost} and ${perMile}`,
    });
  }

  {
    const result = compareUnitPrices([
      { name: 'A', price: 4, quantity: 500, unit: 'g' },
      { name: 'B', price: 5.25, quantity: 750, unit: 'g' },
    ]);
    let rejectsOverflow = false;
    try {
      compareUnitPrices([
        { name: 'A', price: 1e308, quantity: 1e-308, unit: 'g' },
        { name: 'B', price: 1, quantity: 1, unit: 'g' },
      ]);
    } catch (error) {
      rejectsOverflow = error instanceof RangeError;
    }
    const ok = Math.abs(result.items[0].pricePerDisplayUnit - 0.8) < 1e-9 &&
      Math.abs(result.items[1].pricePerDisplayUnit - 0.7) < 1e-9 &&
      result.bestIndex === 1 &&
      rejectsOverflow;
    results.push({
      name: 'Price per Unit',
      slug: 'price-per-unit-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '500 g at 4.00 vs 750 g at 5.25 ranks the lower normalized price first' : JSON.stringify(result),
    });
  }

  {
    const result = calculateBreakEven({ fixedCosts: 10000, sellingPrice: 25, variableCost: 15 });
    let rejectsNoContribution = false;
    try {
      calculateBreakEven({ fixedCosts: 10000, sellingPrice: 15, variableCost: 15 });
    } catch (error) {
      rejectsNoContribution = error instanceof RangeError;
    }
    let rejectsOverflow = false;
    try {
      calculateBreakEven({ fixedCosts: 1e308, sellingPrice: 1e-308, variableCost: 0 });
    } catch (error) {
      rejectsOverflow = error instanceof RangeError;
    }
    const ok = result.wholeUnits === 1000 &&
      result.breakEvenRevenue === 25000 &&
      rejectsNoContribution &&
      rejectsOverflow;
    results.push({
      name: 'Break-Even',
      slug: 'break-even-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '10,000 fixed / 10 contribution gives 1,000 units and 25,000 revenue; zero contribution is rejected' : JSON.stringify(result),
    });
  }

  {
    const result = calculateFraction(1, 2, 1, 3, 'add');
    let rejectsZeroDenominator = false;
    try {
      calculateFraction(1, 0, 1, 3, 'add');
    } catch (error) {
      rejectsZeroDenominator = error instanceof RangeError;
    }
    const ok = result.numerator === 5 && result.denominator === 6 && rejectsZeroDenominator;
    results.push({
      name: 'Fraction Calculator',
      slug: 'fraction-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '1/2 + 1/3 simplifies to 5/6; zero denominators are rejected' : JSON.stringify(result),
    });
  }

  {
    const overnight = calculateWeeklyHours([{ start: '22:00', end: '06:00', breakMinutes: 0 }], 20);
    let rejectsLongBreak = false;
    try {
      calculateWeeklyHours([{ start: '09:00', end: '10:00', breakMinutes: 61 }], 20);
    } catch (error) {
      rejectsLongBreak = error instanceof RangeError;
    }
    let rejectsOverflow = false;
    try {
      calculateWeeklyHours([{ start: '09:00', end: '17:00', breakMinutes: 0 }], 1e308);
    } catch (error) {
      rejectsOverflow = error instanceof RangeError;
    }
    const ok = overnight.totalHours === 8 &&
      overnight.grossPay === 160 &&
      rejectsLongBreak &&
      rejectsOverflow;
    results.push({
      name: 'Weekly Timesheet',
      slug: 'time-card-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? 'overnight 22:00-06:00 yields 8 hours; a break longer than the shift is rejected' : JSON.stringify(overnight),
    });
  }

  {
    const payoff = simulateDebtPayoff(
      [
        { name: 'Card', balance: 1000, annualRate: 20, minimumPayment: 30 },
        { name: 'Loan', balance: 2000, annualRate: 5, minimumPayment: 50 },
      ],
      100,
      'avalanche'
    );
    let rejectsNonAmortizing = false;
    try {
      simulateDebtPayoff(
        [{ name: 'Card', balance: 10000, annualRate: 25, minimumPayment: 10 }],
        0,
        'snowball'
      );
    } catch (e) {
      rejectsNonAmortizing = e instanceof RangeError;
    }
    const ok = payoff.payoffOrder[0] === 'Card' && payoff.payoffMonths > 0 && rejectsNonAmortizing;
    results.push({
      name: 'Debt Payoff',
      slug: 'debt-payoff-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? 'avalanche prioritizes highest APR; non-amortizing payments are rejected' : JSON.stringify(payoff),
    });
  }

  {
    const tile = calculateTileOrder({
      roomAreaSquareFeet: 120,
      tileLengthInches: 12,
      tileWidthInches: 12,
      wastePercent: 10,
      tilesPerBox: 10,
    });
    let rejectsHighWaste = false;
    try {
      calculateTileOrder({
        roomAreaSquareFeet: 120,
        tileLengthInches: 12,
        tileWidthInches: 12,
        wastePercent: 60,
        tilesPerBox: 10,
      });
    } catch (e) {
      rejectsHighWaste = e instanceof RangeError;
    }
    const ok = tile.tileCount === 132 && tile.boxCount === 14 && rejectsHighWaste;
    results.push({
      name: 'Tile Calculator',
      slug: 'tile-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '120 sq ft with 10% waste yields 132 tiles and 14 boxes; excess waste rejected' : JSON.stringify(tile),
    });
  }

  {
    const landscape = calculateLandscapeMaterial({
      areaSquareFeet: 200,
      depthInches: 3,
      bagVolumeCubicFeet: 2,
    });
    let rejectsZeroArea = false;
    try {
      calculateLandscapeMaterial({
        areaSquareFeet: 0,
        depthInches: 3,
        bagVolumeCubicFeet: 2,
      });
    } catch (e) {
      rejectsZeroArea = e instanceof RangeError;
    }
    const ok = landscape.volumeCubicFeet === 50 && landscape.bagCount === 25 && rejectsZeroArea;
    results.push({
      name: 'Landscape Material',
      slug: 'landscape-material-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '200 sq ft at 3 in depth yields 50 cu ft and 25 bags; non-positive area rejected' : JSON.stringify(landscape),
    });
  }

  {
    const roofing = calculateRoofingMaterials({
      footprintSquareFeet: 2000,
      riseInchesPer12: 6,
      wastePercent: 10,
      bundleCoverageSquareFeet: 33.333333333333336,
    });
    let rejectsPitch = false;
    try {
      calculateRoofingMaterials({
        footprintSquareFeet: 2000,
        riseInchesPer12: -1,
        wastePercent: 10,
        bundleCoverageSquareFeet: 33.33,
      });
    } catch (e) {
      rejectsPitch = e instanceof RangeError;
    }
    const ok = Math.abs(roofing.pitchMultiplier - 1.11803) < 0.001 && roofing.bundleCount === 74 && rejectsPitch;
    results.push({
      name: 'Roofing Calculator',
      slug: 'roofing-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '6/12 pitch on 2000 sq ft footprint yields ~1.118 multiplier and 74 bundles' : JSON.stringify(roofing),
    });
  }

  {
    const yieldRes = calculateRentalYield({
      purchasePrice: 300000,
      closingCosts: 10000,
      monthlyRent: 2500,
      annualExpenses: 6000,
      vacancyPercent: 5,
    });
    let rejectsPrice = false;
    try {
      calculateRentalYield({
        purchasePrice: -100,
        closingCosts: 0,
        monthlyRent: 1000,
        annualExpenses: 100,
        vacancyPercent: 0,
      });
    } catch (e) {
      rejectsPrice = e instanceof RangeError;
    }
    const ok = Math.abs(yieldRes.grossYieldPercent - 10) < 1e-9 &&
      Math.abs(yieldRes.netYieldPercent - 7.258) < 0.01 &&
      rejectsPrice;
    results.push({
      name: 'Rental Yield',
      slug: 'rental-yield-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '300k purchase at 2500/mo yields 10% gross and 7.26% net; negative price rejected' : JSON.stringify(yieldRes),
    });
  }

  {
    const comm = calculateCommission({
      saleAmount: 500000,
      commissionPercent: 6,
      recipientSharePercent: 50,
    });
    let rejectsHighCommission = false;
    try {
      calculateCommission({
        saleAmount: 500000,
        commissionPercent: 105,
        recipientSharePercent: 50,
      });
    } catch (e) {
      rejectsHighCommission = e instanceof RangeError;
    }
    const ok = comm.totalCommission === 30000 && comm.recipientCommission === 15000 && rejectsHighCommission;
    results.push({
      name: 'Sales Commission',
      slug: 'commission-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '500k sale at 6% with 50% split yields 30,000 total and 15,000 recipient; >100% rate rejected' : JSON.stringify(comm),
    });
  }

  {
    const fuel = calculateFuelEconomy({
      distance: 300,
      distanceUnit: 'miles',
      fuelUsed: 10,
      fuelUnit: 'us-gallons',
    });
    let rejectsZeroFuel = false;
    try {
      calculateFuelEconomy({
        distance: 300,
        distanceUnit: 'miles',
        fuelUsed: 0,
        fuelUnit: 'us-gallons',
      });
    } catch (e) {
      rejectsZeroFuel = e instanceof RangeError;
    }
    const ok = fuel.usMilesPerGallon === 30 &&
      Math.abs(fuel.imperialMilesPerGallon - 36.0287) < 0.01 &&
      rejectsZeroFuel;
    results.push({
      name: 'Gas Mileage',
      slug: 'gas-mileage-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '300 miles on 10 US gal yields 30 US MPG and 36.03 Imperial MPG; zero fuel rejected' : JSON.stringify(fuel),
    });
  }

  {
    const ts = convertUnixTimestamp('1700000000', 'seconds');
    let rejectsInvalid = false;
    try {
      convertUnixTimestamp('not-a-number', 'seconds');
    } catch (e) {
      rejectsInvalid = e instanceof RangeError;
    }
    const ok = ts.isoUtc === '2023-11-14T22:13:20.000Z' && rejectsInvalid;
    results.push({
      name: 'Unix Timestamp',
      slug: 'unix-timestamp-converter',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '1700000000 seconds converts to 2023-11-14T22:13:20.000Z; non-numeric input rejected' : JSON.stringify(ts),
    });
  }

  {
    const words = countText('Hello world! Antigravity code.', 238);
    let rejectsNegativeSpeed = false;
    try {
      countText('Hello', 0);
    } catch (e) {
      rejectsNegativeSpeed = e instanceof RangeError;
    }
    const ok = words.words === 4 && words.charactersWithSpaces === 30 && words.sentences === 2 && rejectsNegativeSpeed;
    results.push({
      name: 'Word Counter',
      slug: 'word-counter',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '30-char sample counts 4 words and 2 sentences; zero/negative speed rejected' : JSON.stringify(words),
    });
  }

  {
    const density = calculateDensity(5, 2);
    let rejectsZeroVol = false;
    try {
      calculateDensity(5, 0);
    } catch (e) {
      rejectsZeroVol = e instanceof RangeError;
    }
    const ok = density.kilogramsPerCubicMeter === 2500 && density.gramsPerCubicCentimeter === 2.5 && rejectsZeroVol;
    results.push({
      name: 'Density Calculator',
      slug: 'density-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok ? '5 kg in 2 L yields 2500 kg/m³ and 2.5 g/cm³; zero volume rejected' : JSON.stringify(density),
    });
  }

  {
    // APS: NSC level boundaries, Life Orientation exclusion, and the 6-subject floor.
    const subjects = [
      { name: 'Home Language', percentage: 75 },
      { name: 'First Additional Language', percentage: 65 },
      { name: 'Mathematics', percentage: 82 },
      { name: 'Physical Sciences', percentage: 70 },
      { name: 'Life Sciences', percentage: 68 },
      { name: 'Accounting', percentage: 74 },
      { name: 'Life Orientation', percentage: 88, isLifeOrientation: true },
    ];
    const excluded = calculateApsScore(subjects, 'exclude');
    const full = calculateApsScore(subjects, 'full');
    let rejectsShortSubjectList = false;
    try {
      calculateApsScore(subjects.slice(0, 5), 'exclude');
    } catch (error) {
      rejectsShortSubjectList = error instanceof RangeError;
    }
    const levels = [80, 70, 60, 50, 40, 30, 29].map(percentageToNscLevel).join(',');
    const ok =
      levels === '7,6,5,4,3,2,1' &&
      excluded.totalAps === 35 &&
      full.totalAps === 42 &&
      excluded.qualificationPass === 'Bachelor Degree' &&
      rejectsShortSubjectList;
    results.push({
      name: 'APS Score',
      slug: 'aps-score-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok
        ? 'levels 80/70/60/50/40/30/29 map to 7/6/5/4/3/2/1; LO exclusion gives 35, full 42; 5 subjects rejected'
        : `levels=${levels}, excluded=${excluded.totalAps}, full=${full.totalAps}`,
    });
  }

  {
    // Confidence interval and Cochran sample size against textbook values.
    const ci = calculateConfidenceIntervalMean({
      sampleMean: 100,
      standardDeviation: 15,
      sampleSize: 36,
      confidenceLevel: 95,
    });
    const infinite = calculateSampleSize({ confidenceLevel: 95, marginOfError: 5, populationProportion: 50 });
    const finite = calculateSampleSize({
      confidenceLevel: 95,
      marginOfError: 5,
      populationProportion: 50,
      populationSize: 1000,
    });
    const ok =
      Math.abs(ci.standardError - 2.5) < 1e-9 &&
      Math.abs(ci.lowerBound - 95.1) < 0.01 &&
      infinite.requiredSampleSize === 385 &&
      finite.requiredSampleSize === 278 &&
      finite.isFiniteAdjusted;
    results.push({
      name: 'Confidence Interval & Sample Size',
      slug: 'confidence-interval-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok
        ? 'CI 95% for mean 100 / SD 15 / n 36 gives 95.1-104.9; n=385, finite-population n=278'
        : `ci=${JSON.stringify(ci)}, infinite=${infinite.requiredSampleSize}, finite=${finite.requiredSampleSize}`,
    });
  }

  {
    // Naegele's rule, cycle-length adjustment, and reverse conception dating.
    const due = calculateDueDate({
      method: 'lmp',
      inputDate: '2026-01-01',
      cycleLengthDays: 28,
      asOfDate: '2026-04-09',
    });
    const longCycle = calculateDueDate({
      method: 'lmp',
      inputDate: '2026-01-01',
      cycleLengthDays: 35,
      asOfDate: '2026-04-09',
    });
    const conception = calculateConceptionDate({ method: 'due-date', inputDate: '2026-10-08' });
    const ovulation = calculateOvulation({ lastPeriodDate: '2026-05-01', cyclesAhead: 1 });
    const ok =
      due.estimatedDueDate === '2026-10-08' &&
      due.gestationalWeeks === 14 &&
      due.gestationalDays === 0 &&
      longCycle.estimatedDueDate === '2026-10-15' &&
      conception.conceptionDate === '2026-01-15' &&
      conception.intercourseWindowStart === '2026-01-10' &&
      ovulation.ovulationDate === '2026-05-15' &&
      ovulation.nextPeriodDate === '2026-05-29' &&
      ovulation.forecast[0]?.ovulationDate === '2026-06-12';
    results.push({
      name: 'Pregnancy date cluster',
      slug: 'due-date-calculator',
      kind: 'edge-case',
      status: ok ? 'PASS' : 'FAIL',
      detail: ok
        ? 'LMP 2026-01-01 gives EDD 2026-10-08; a 35-day cycle shifts it to 2026-10-15; conception reverse-dates to 2026-01-15'
        : `due=${due.estimatedDueDate}, long=${longCycle.estimatedDueDate}, conception=${conception.conceptionDate}, ovulation=${ovulation.ovulationDate}`,
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
  console.log(`Total tools: ${CALCULATOR_CATALOG.length} | Guides: ${GUIDE_REGISTRY.length} | Audited: ${results.length} | PASS: ${results.length - failed.length} | FAIL: ${failed.length}\n`);
  for (const r of results) {
    const mark = r.status === 'PASS' ? '  OK ' : 'FAIL ';
    console.log(`${mark} [${r.kind.padEnd(14)}] ${r.name.padEnd(32)} ${r.detail}`);
  }
  if (failed.length) {
    console.log(`\n${failed.length} FAILING ITEMS — fix before launch.`);
    process.exitCode = 1;
  } else {
    console.log(`\nCalculator and guide integrity checks passed.`);
  }
}

main();