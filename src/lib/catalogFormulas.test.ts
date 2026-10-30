import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CALCULATOR_CATALOG } from '../data/calculators';

/**
 * The audit script evaluates each config formula with its default inputs only.
 * These tests override every field with a distinct value and compare the
 * output against hand-computed results, so a formula that is accidentally
 * wired to the wrong field or uses the wrong constant fails here.
 */

interface FormulaCase {
  slug: string;
  inputs: Record<string, number>;
  expected: Record<string, number>;
  tolerance?: number;
}

const CASES: FormulaCase[] = [
  {
    slug: 'gutter-calculator',
    inputs: { edgeFt: 150, downspouts: 3, downspoutFt: 12, spacingIn: 18, waste: 10 },
    expected: {
      'Gutter length to buy': 165,
      Hangers: 101,
      'Downspout pipe': 36,
      'Total gutter and pipe': 201,
      '10 ft sections': 21,
    },
  },
  {
    slug: 'wallpaper-calculator',
    inputs: { wallWidthFt: 15, wallHeightFt: 8, rollWidthIn: 21, rollLengthFt: 33, repeatIn: 18 },
    expected: {
      'Wall area': 120,
      'Drops needed': 9,
      'Cut length per drop': 9.5,
      'Drops per roll': 3,
      'Rolls required': 3,
    },
  },
  {
    slug: 'epoxy-resin-calculator',
    inputs: { areaSqFt: 250, thicknessMils: 30, ratioA: 3, ratioB: 1 },
    expected: {
      'Total resin volume': 4.675325,
      'Part A': 3.506494,
      'Part B': 1.168831,
      'Total in litres': 17.698,
    },
    tolerance: 0.005,
  },
  {
    slug: 'sod-calculator',
    inputs: { lengthFt: 60, widthFt: 40, rollCoverage: 9, palletCoverage: 500, waste: 8 },
    expected: { 'Lawn area': 2400, 'Area to order': 2592, 'Sod rolls': 288, Pallets: 6 },
  },
  {
    slug: 'paver-calculator',
    inputs: { areaSqFt: 300, paverLengthIn: 9, paverWidthIn: 6, jointIn: 0.25, waste: 12 },
    expected: {
      'Pavers required': 837,
      'Pavers per sq ft': 2.490813,
      'Area to cover': 336,
      'Paver face area with joint': 0.401476,
    },
    tolerance: 0.005,
  },
  {
    slug: 'rainwater-harvest-calculator',
    inputs: { roofFootprintSqFt: 2000, rainfallIn: 40, runoffCoefficient: 90 },
    expected: {
      'Catchable rain per year': 44883.12,
      'Catchable rain in litres': 169901.01,
      'Catchment volume': 6000,
      'Average per day': 122.9675,
    },
    tolerance: 1,
  },
  {
    slug: 'irrigation-calculator',
    inputs: { areaSqFt: 2000, precipRate: 0.75, minutes: 25, sessionsPerWeek: 4 },
    expected: {
      'Water per session': 389.61,
      'Water per week': 1558.44,
      'Weekly application depth': 1.25,
      'Water per month': 6748.05,
    },
    tolerance: 0.1,
  },
  {
    slug: 'livestock-feed-calculator',
    inputs: { animals: 50, avgWeightLb: 1200, intakePercent: 2.8, feedCostPerTon: 280 },
    expected: {
      'Feed per day': 1680,
      'Feed per day in tons': 0.84,
      'Daily feed cost': 235.2,
      'Annual feed cost': 85848,
      'Feed per head per day': 33.6,
    },
    tolerance: 0.01,
  },
  {
    slug: 'firewood-calculator',
    inputs: { lengthFt: 10, heightFt: 5, depthFt: 1.5 },
    expected: {
      'Stacked volume': 75,
      'Full cords': 0.585938,
      'Face cords (16 in)': 1.757813,
      'Cubic metres': 2.12376,
    },
    tolerance: 0.001,
  },
  {
    slug: 'solar-panel-calculator',
    inputs: { annualKwh: 8000, sunHours: 5, panelWatts: 350, losses: 18, panelAreaSqFt: 20 },
    expected: {
      'Array size needed': 5.345807,
      'Panels needed': 16,
      'Estimated annual generation': 8380.4,
      'Roof area needed': 320,
      'Array size installed': 5.6,
    },
    tolerance: 0.01,
  },
  {
    slug: 'generator-size-calculator',
    inputs: { runningWatts: 5000, surgeWatts: 8500, headroom: 25, powerFactor: 0.9 },
    expected: {
      'Recommended running watts': 6250,
      'Surge to cover': 8500,
      'Generator kVA': 6.944444,
      'Spare capacity at surge': 3500,
    },
    tolerance: 0.001,
  },
  {
    slug: 'rebar-calculator',
    inputs: {
      slabLengthFt: 30,
      slabWidthFt: 12,
      spacingIn: 16,
      barLengthFt: 20,
      barWeight: 0.668,
      waste: 8,
    },
    expected: {
      'Total rebar length': 576,
      'Length with laps and waste': 622.08,
      'Stock bars': 32,
      'Estimated weight': 415.5494,
    },
    tolerance: 0.01,
  },
  {
    slug: 'post-hole-concrete-calculator',
    inputs: { holeDiameterIn: 12, holeDepthIn: 42, postWidthIn: 6, posts: 10, bagYield: 0.5 },
    expected: {
      'Concrete per hole': 1.873894,
      'Total concrete': 18.738936,
      'Bags required': 38,
      'Total weight': 2717.146,
    },
    tolerance: 0.01,
  },
  {
    slug: 'overtime-calculator',
    inputs: { hourlyRate: 32.5, regularHours: 40, overtimeHours: 8, multiplier: 2 },
    expected: {
      'Regular pay': 1300,
      'Overtime pay': 520,
      'Total gross pay': 1820,
      'Blended hourly rate': 37.916667,
    },
    tolerance: 0.001,
  },
  {
    slug: 'apr-to-apy-calculator',
    inputs: { apr: 7.25, compounds: 4, balance: 20000 },
    expected: {
      'Effective APY': 7.449496,
      'Periodic rate': 1.8125,
      'First-year interest': 1489.9004,
      'APY minus APR': 0.199496,
      'Interest at simple APR': 1450,
    },
    tolerance: 0.001,
  },
  {
    slug: 'payback-period-calculator',
    inputs: { initialInvestment: 75000, annualCashFlow: 18000, targetYears: 4 },
    expected: {
      'Payback period': 4.166667,
      'Payback in months': 50,
      'Cash flow needed for target': 18750,
      'Annual return on cost': 24,
    },
    tolerance: 0.001,
  },
  {
    slug: 'cap-rate-calculator',
    inputs: { price: 750000, grossRent: 90000, operatingExpenses: 25000, vacancy: 6, targetCap: 6.5 },
    expected: {
      'Net operating income': 59600,
      'Cap rate': 7.946667,
      'Value at target cap': 916923.08,
      'Expense ratio': 33.777778,
    },
    tolerance: 0.5,
  },
  {
    slug: 'cash-on-cash-return-calculator',
    inputs: {
      purchasePrice: 500000,
      downPayment: 100000,
      closingCosts: 10000,
      annualNOI: 40000,
      annualDebtService: 30000,
      targetReturn: 12,
    },
    expected: {
      'Total cash invested': 110000,
      'Annual pre-tax cash flow': 10000,
      'Cash-on-cash return': 9.090909,
      'Cash flow needed for target': 13200,
      'Loan amount': 400000,
    },
    tolerance: 0.001,
  },
  {
    slug: 'house-flip-calculator',
    inputs: {
      purchasePrice: 180000,
      rehabCost: 55000,
      holdingCosts: 7500,
      afterRepairValue: 300000,
      sellingCostPercent: 7.5,
    },
    expected: {
      'Total project cost': 242500,
      'Net sale proceeds': 277500,
      Profit: 35000,
      'Return on cost': 14.43299,
      '70 percent rule max offer': 155000,
    },
    tolerance: 0.01,
  },
  {
    slug: 'credit-utilization-calculator',
    inputs: { balances: 6000, limits: 18000, target: 9 },
    expected: {
      'Credit utilization': 33.333333,
      'Available credit': 12000,
      'Balance at 30 percent': 5400,
      'Balance at target': 1620,
      'Pay down to target': 4380,
    },
    tolerance: 0.001,
  },
  {
    slug: 'severance-pay-calculator',
    inputs: { weeklyPay: 1450, yearsOfService: 8.5, weeksPerYear: 1.5, minimumWeeks: 6, withholding: 25 },
    expected: {
      'Severance weeks': 12.75,
      'Gross severance': 18487.5,
      'Estimated withholding': 4621.875,
      'Estimated net': 13865.625,
    },
    tolerance: 0.001,
  },
  {
    slug: 'dividend-yield-calculator',
    inputs: { annualDividend: 3.15, sharePrice: 72.5, shares: 250, costBasis: 48 },
    expected: {
      'Current dividend yield': 4.344828,
      'Yield on cost': 6.5625,
      'Annual dividend income': 787.5,
      'Current position value': 18125,
      'Total cost basis': 12000,
    },
    tolerance: 0.001,
  },
  {
    slug: 'basis-points-calculator',
    inputs: { value: 480000, basisPoints: -35 },
    expected: {
      'Rate change': -0.35,
      'Value change': -1680,
      'New value': 478320,
      'One basis point is worth': 48,
    },
    tolerance: 0.001,
  },
  {
    slug: 'ldl-cholesterol-calculator',
    inputs: { totalCholesterol: 240, hdl: 45, triglycerides: 200 },
    expected: {
      'Estimated LDL cholesterol': 155,
      'Non-HDL cholesterol': 195,
      'Total cholesterol to HDL ratio': 5.333333,
      'Triglyceride to HDL ratio': 4.444444,
    },
    tolerance: 0.001,
  },
  {
    slug: 'mean-arterial-pressure-calculator',
    inputs: { systolic: 140, diastolic: 90 },
    expected: {
      'Mean arterial pressure': 106.666667,
      'Pulse pressure': 50,
      'Diastolic share of MAP': 84.375,
    },
    tolerance: 0.001,
  },
  {
    slug: 'pack-years-calculator',
    inputs: { cigarettesPerDay: 25, yearsSmoked: 20 },
    expected: {
      'Pack-years': 25,
      'Total cigarettes': 182500,
      'Packs per year': 456.25,
      'Cigarettes per year': 9125,
    },
    tolerance: 0.001,
  },
  {
    slug: 'css-clamp-calculator',
    inputs: { minSize: 14, maxSize: 20, minViewport: 360, maxViewport: 1440, currentViewport: 900 },
    expected: {
      'Size at preview viewport': 17,
      'Fluid slope': 0.555556,
      'Preferred intercept': 12,
      'Growth across range': 6,
    },
    tolerance: 0.001,
  },
  {
    slug: 'rem-to-px-calculator',
    inputs: { remValue: 2.25, rootFontSize: 18, pixelValue: 27 },
    expected: {
      'REM in pixels': 40.5,
      'Pixels in REM': 1.5,
      'Root size as percentage of 16px': 112.5,
    },
    tolerance: 0.001,
  },
  {
    slug: 'video-file-size-calculator',
    inputs: { durationMin: 45, videoMbps: 8, audioKbps: 128 },
    expected: {
      'Estimated file size': 2743.2,
      'Estimated size in GB': 2.7432,
      'Size per minute': 60.96,
      'Estimated size in GiB': 2.554749,
    },
    tolerance: 0.001,
  },
  {
    slug: 'specific-heat-calculator',
    inputs: { massKg: 0.75, specificHeat: 900, deltaT: 80 },
    expected: {
      'Energy required': 54000,
      'Energy in kilojoules': 54,
      'Energy in kilowatt-hours': 0.015,
      'Energy in kilocalories': 12.90631,
    },
    tolerance: 0.001,
  },
  {
    slug: 'ideal-gas-law-calculator',
    inputs: { moles: 0.5, tempC: 100, volumeL: 10, molarMass: 44 },
    expected: {
      Pressure: 155.118455,
      'Pressure in atmospheres': 1.5309,
      Density: 2.2,
      'Molar volume': 20,
    },
    tolerance: 0.01,
  },
  {
    slug: 'projectile-motion-calculator',
    inputs: { speed: 30, angle: 30, height: 2 },
    expected: {
      'Flight time': 3.186096,
      'Horizontal range': 82.7767,
      'Maximum height': 13.46789,
      'Vertical velocity': 15,
      'Horizontal velocity': 25.980762,
    },
    tolerance: 0.01,
  },
  {
    slug: 'brine-calculator',
    inputs: { waterLiters: 6, saltPercent: 8 },
    expected: {
      'Salt to add': 521.73913,
      'Total brine weight': 6.521739,
      'Salt concentration per litre': 86.956522,
      'Salt as percent of water weight': 8.695652,
    },
    tolerance: 0.01,
  },
  {
    slug: 'cake-pan-conversion-calculator',
    inputs: {
      oldLength: 9,
      oldWidth: 13,
      oldDepth: 2,
      newLength: 10,
      newWidth: 15,
      newDepth: 3,
    },
    expected: {
      'Batter multiplier': 1.923077,
      'Area ratio': 1.282051,
      'Depth ratio': 1.5,
      'New pan volume': 450,
    },
    tolerance: 0.001,
  },
  {
    slug: 'swim-pace-calculator',
    inputs: { distanceM: 800, minutes: 12, seconds: 30 },
    expected: {
      'Total time': 750,
      'Pace per 100 m': 93.75,
      'Pace per 100 m in minutes': 1.5625,
      'Average speed': 1.066667,
      'Split per 25 m': 23.4375,
    },
    tolerance: 0.001,
  },
  {
    slug: 'customer-acquisition-cost-calculator',
    inputs: {
      marketingSpend: 30000,
      salesSpend: 10000,
      newCustomers: 200,
      annualRevenuePerCustomer: 2400,
    },
    expected: {
      'Total acquisition spend': 40000,
      'Customer acquisition cost': 200,
      'CAC payback': 1,
    },
  },
  {
    slug: 'customer-lifetime-value-calculator',
    inputs: {
      averageOrderValue: 200,
      grossMargin: 50,
      purchasesPerYear: 6,
      lifespanYears: 4,
      customerAcquisitionCost: 300,
    },
    expected: {
      'Annual revenue per customer': 1200,
      'Annual gross profit per customer': 600,
      'Customer lifetime value': 2400,
      'LTV to CAC ratio': 8,
      'CAC payback': 6,
    },
  },
];

function evaluate(slug: string, inputs: Record<string, number>): Record<string, number> {
  const calc = CALCULATOR_CATALOG.find((item) => item.slug === slug);
  assert.ok(calc, `calculator "${slug}" is missing from the catalogue`);
  assert.equal(calc.kind, 'config', `calculator "${slug}" is not a config calculator`);
  const spec = calc.config;
  assert.ok(spec, `calculator "${slug}" has no config spec`);

  const fieldIds = spec.fields.map((field) => field.id);
  const inputKeys = Object.keys(inputs);
  for (const key of inputKeys) {
    assert.ok(fieldIds.includes(key), `calculator "${slug}" has no field "${key}"`);
  }

  const values = spec.fields.map((field) =>
    Object.prototype.hasOwnProperty.call(inputs, field.id) ? inputs[field.id] : field.defaultValue,
  );
  const body = `"use strict"; return [${spec.results.map((result) => `(${result.formulaCode})`).join(', ')}];`;
  const fn = new Function(...fieldIds, body) as (...args: number[]) => number[];
  const outputs = fn(...values);

  const byLabel: Record<string, number> = {};
  spec.results.forEach((result, index) => {
    byLabel[result.label] = outputs[index];
  });
  return byLabel;
}

for (const item of CASES) {
  test(`config formula: ${item.slug}`, () => {
    const outputs = evaluate(item.slug, item.inputs);
    const tolerance = item.tolerance ?? 0.01;

    for (const [label, expected] of Object.entries(item.expected)) {
      assert.ok(
        Object.prototype.hasOwnProperty.call(outputs, label),
        `"${item.slug}" has no result labelled "${label}"`,
      );
      const actual = outputs[label];
      assert.ok(Number.isFinite(actual), `"${item.slug}" result "${label}" is not finite: ${actual}`);
      assert.ok(
        Math.abs(actual - expected) <= tolerance,
        `"${item.slug}" result "${label}" was ${actual}, expected ${expected} (tolerance ${tolerance})`,
      );
    }
  });
}

test('new config calculators expose every result with a finite default evaluation', () => {
  for (const item of CASES) {
    const outputs = evaluate(item.slug, {});
    for (const [label, value] of Object.entries(outputs)) {
      assert.ok(Number.isFinite(value), `"${item.slug}" result "${label}" is not finite by default`);
    }
  }
});
