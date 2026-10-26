import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalCdf,
  normalQuantile,
  normalRangeProbability,
  parseNumberList,
  percentile,
  percentileRank,
  solveTriangle,
  summarizeDataset,
  fractionToDecimal,
} from './advancedMath';

test('dataset summary separates sample and population variance', () => {
  const summary = summarizeDataset([2, 4, 4, 4, 5, 5, 7, 9]);
  assert.equal(summary.count, 8);
  assert.equal(summary.mean, 5);
  assert.equal(summary.populationVariance, 4);
  assert.equal(summary.sampleVariance, 32 / 7);
  assert.equal(summary.range, 7);
  assert.throws(() => summarizeDataset([]), /at least one/);
  assert.throws(() => summarizeDataset([1, Number.NaN]), /finite/);
});

test('number list parsing accepts commas, spaces, and semicolons', () => {
  assert.deepEqual(parseNumberList('1, 2;3  4'), [1, 2, 3, 4]);
  assert.deepEqual(parseNumberList('-1.5\n2.5'), [-1.5, 2.5]);
  assert.throws(() => parseNumberList('1, two'), /must be a number/);
  assert.throws(() => parseNumberList('   '), /at least one/);
});

test('percentile uses linear interpolation and percentile rank handles ties', () => {
  const values = [15, 20, 35, 40, 50];
  assert.equal(percentile(values, 0), 15);
  assert.equal(percentile(values, 100), 50);
  assert.equal(percentile(values, 50), 35);
  assert.equal(percentile(values, 40), 29); // rank 1.6 -> 20 + 0.6 * 15
  assert.equal(percentileRank([10, 20, 20, 30], 20), 50);
  assert.equal(percentileRank([10, 20, 20, 30], 10), 12.5); // half of the single tie counts as below
  assert.throws(() => percentile(values, 101), /between 0 and 100/);
});

test('normal CDF and quantile agree with standard tables', () => {
  assert.ok(Math.abs(normalCdf(0) - 0.5) < 1e-9);
  assert.ok(Math.abs(normalCdf(1.96) - 0.975) < 1e-4);
  assert.ok(Math.abs(normalCdf(-1.645) - 0.05) < 1e-4);
  assert.ok(Math.abs(normalQuantile(0.975) - 1.959964) < 1e-4);
  assert.ok(Math.abs(normalQuantile(0.5)) < 1e-9);
  const range = normalRangeProbability(85, 115, 100, 15);
  assert.ok(Math.abs(range.percent - 68.27) < 0.1);
  assert.throws(() => normalRangeProbability(120, 80), /lower bound/);
  assert.throws(() => normalCdf(1, 0, 0), /greater than zero/);
});

test('triangle solver handles SSS, SAS, ASA, and AAS consistently', () => {
  const sss = solveTriangle({ mode: 'sss', a: 3, b: 4, c: 5 });
  assert.ok(Math.abs(sss.C - 90) < 1e-9);
  assert.ok(Math.abs(sss.area - 6) < 1e-9);
  assert.equal(sss.type, 'Scalene');

  // SAS: two sides of 5 with a 60 degree included angle is equilateral.
  const sas = solveTriangle({ mode: 'sas', a: 5, b: 5, C: 60 });
  assert.ok(Math.abs(sas.c - 5) < 1e-9);
  assert.equal(sas.type, 'Equilateral');

  // ASA with side c = 10 between A = 60 and B = 60 gives an equilateral triangle.
  const asa = solveTriangle({ mode: 'asa', A: 60, B: 60, c: 10 });
  assert.ok(Math.abs(asa.a - 10) < 1e-9);

  // AAS: a = 10 opposite 30 degrees, B = 60 -> b = 10 * sin60 / sin30.
  const aas = solveTriangle({ mode: 'aas', A: 30, B: 60, a: 10 });
  assert.ok(Math.abs(aas.b - 10 * Math.sin(Math.PI / 3) / Math.sin(Math.PI / 6)) < 1e-9);

  assert.throws(() => solveTriangle({ mode: 'sss', a: 1, b: 1, c: 5 }), /cannot form a triangle/);
  assert.throws(() => solveTriangle({ mode: 'asa', A: 100, B: 90, c: 5 }), /less than 180/);
});

test('fraction to decimal simplifies, converts to percent, and detects repeating decimals', () => {
  const threeEighths = fractionToDecimal(6, 8);
  assert.equal(threeEighths.decimal, 0.75);
  assert.equal(threeEighths.percent, 75);
  assert.equal(threeEighths.numerator, 3);
  assert.equal(threeEighths.denominator, 4);
  assert.equal(threeEighths.isTerminating, true);

  const third = fractionToDecimal(1, 3);
  assert.equal(third.isTerminating, false);

  const negative = fractionToDecimal(3, -8);
  assert.equal(negative.decimal, -0.375);
  assert.equal(negative.numerator, -3);
  assert.equal(negative.denominator, 8);

  const mixed = fractionToDecimal(11, 4);
  assert.equal(mixed.mixedWhole, 2);
  assert.equal(mixed.mixedNumerator, 3);
  assert.equal(mixed.mixedDenominator, 4);

  assert.throws(() => fractionToDecimal(1, 0), /cannot be zero/);
  assert.throws(() => fractionToDecimal(1.5, 2), /whole numbers/);
});
