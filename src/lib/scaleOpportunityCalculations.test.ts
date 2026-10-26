import assert from 'node:assert/strict';
import test from 'node:test';
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
} from './scaleOpportunityCalculations';

test('snowball and avalanche change payoff priority without changing the debt inputs', () => {
  const debts = [
    { name: 'Small balance', balance: 500, annualRate: 5, minimumPayment: 50 },
    { name: 'High rate', balance: 1000, annualRate: 20, minimumPayment: 100 },
  ];
  const snowball = simulateDebtPayoff(debts, 50, 'snowball');
  const avalanche = simulateDebtPayoff(debts, 50, 'avalanche');

  assert.equal(snowball.payoffOrder[0], 'Small balance');
  assert.equal(avalanche.payoffOrder[0], 'High rate');
  assert.ok(avalanche.totalInterest <= snowball.totalInterest);
  assert.ok(snowball.payoffMonths > 0 && avalanche.totalPayments > 0);
});

test('debt payoff rejects non-amortizing and invalid debt inputs', () => {
  assert.throws(() => simulateDebtPayoff([
    { name: 'Card', balance: 1000, annualRate: 25, minimumPayment: 1 },
  ], 0, 'avalanche'), /do not pay off/);
  assert.throws(() => simulateDebtPayoff([
    { name: 'Card', balance: 1000, annualRate: 10, minimumPayment: 50 },
    { name: 'card', balance: 200, annualRate: 5, minimumPayment: 20 },
  ], 0, 'snowball'), /distinct name/);
});

test('tile estimator rounds tile and box quantities upward after waste', () => {
  const result = calculateTileOrder({
    roomAreaSquareFeet: 120,
    tileLengthInches: 12,
    tileWidthInches: 12,
    wastePercent: 10,
    tilesPerBox: 10,
  });
  assert.equal(result.orderAreaSquareFeet, 132);
  assert.equal(result.tileCount, 132);
  assert.equal(result.boxCount, 14);
});

test('landscape estimator converts depth and computes bag quantities', () => {
  const result = calculateLandscapeMaterial({ areaSquareFeet: 200, depthInches: 3, bagVolumeCubicFeet: 2 });
  assert.equal(result.volumeCubicFeet, 50);
  assert.ok(Math.abs(result.volumeCubicYards - 50 / 27) < 1e-12);
  assert.equal(result.bagCount, 25);
});

test('roofing estimator applies pitch, waste, squares, and package coverage', () => {
  const result = calculateRoofingMaterials({
    footprintSquareFeet: 1000,
    riseInchesPer12: 6,
    wastePercent: 10,
    bundleCoverageSquareFeet: 33.3,
  });
  assert.ok(Math.abs(result.pitchMultiplier - Math.sqrt(1.25)) < 1e-12);
  assert.ok(Math.abs(result.orderAreaSquareFeet - 1000 * Math.sqrt(1.25) * 1.1) < 1e-10);
  assert.ok(Math.abs(result.roofingSquares - result.orderAreaSquareFeet / 100) < 1e-12);
  assert.equal(result.bundleCount, Math.ceil(result.orderAreaSquareFeet / 33.3));
});

test('rental yield distinguishes scheduled gross rent from vacancy-adjusted NOI', () => {
  const result = calculateRentalYield({
    purchasePrice: 200000,
    closingCosts: 5000,
    monthlyRent: 2000,
    annualExpenses: 6000,
    vacancyPercent: 5,
  });
  assert.equal(result.grossYieldPercent, 12);
  assert.ok(Math.abs(result.annualNetOperatingIncome - 16800) < 1e-10);
  assert.ok(Math.abs(result.netYieldPercent - (16800 / 205000 * 100)) < 1e-10);
  assert.equal(result.monthlyCashFlowBeforeFinancing, 1400);
});

test('commission calculator allocates the entered share', () => {
  const result = calculateCommission({ saleAmount: 100000, commissionPercent: 5, recipientSharePercent: 80 });
  assert.equal(result.totalCommission, 5000);
  assert.equal(result.recipientCommission, 4000);
  assert.equal(result.remainingCommission, 1000);
});

test('fuel economy normalizes supported distance and fuel units', () => {
  const result = calculateFuelEconomy({ distance: 300, distanceUnit: 'miles', fuelUsed: 10, fuelUnit: 'us-gallons' });
  assert.equal(result.usMilesPerGallon, 30);
  assert.ok(result.imperialMilesPerGallon > 36.02 && result.imperialMilesPerGallon < 36.04);
  assert.ok(result.litersPer100Kilometers > 7.83 && result.litersPer100Kilometers < 7.85);
  const metric = calculateFuelEconomy({ distance: 100, distanceUnit: 'kilometers', fuelUsed: 8, fuelUnit: 'liters' });
  assert.ok(Math.abs(metric.litersPer100Kilometers - 8) < 1e-12);
});

test('Unix timestamp converter handles epoch and fractional seconds', () => {
  assert.equal(convertUnixTimestamp('0', 'seconds').isoUtc, '1970-01-01T00:00:00.000Z');
  const result = convertUnixTimestamp('0.5', 'seconds');
  assert.equal(result.milliseconds, 500);
  assert.equal(result.isoUtc, '1970-01-01T00:00:00.500Z');
  assert.throws(() => convertUnixTimestamp('not a timestamp', 'seconds'), /finite Unix timestamp/);
  assert.throws(() => convertUnixTimestamp('9000000000000000', 'milliseconds'), /date range/);
});

test('word counter handles empty text, whitespace, and editable reading speed', () => {
  const result = countText('One two.\n\nThree!', 200);
  assert.equal(result.words, 3);
  assert.equal(result.charactersWithSpaces, 16);
  assert.equal(result.charactersWithoutSpaces, 13);
  assert.equal(result.sentences, 2);
  assert.equal(result.paragraphs, 2);
  assert.equal(result.estimatedReadingMinutes, 3 / 200);
  assert.equal(countText('  \n ', 200).words, 0);
});

test('density converts kilograms per liter to SI and rejects zero volume', () => {
  const result = calculateDensity(2, 1);
  assert.equal(result.kilogramsPerCubicMeter, 2000);
  assert.equal(result.gramsPerCubicCentimeter, 2);
  assert.throws(() => calculateDensity(2, 0), /greater than zero/);
});