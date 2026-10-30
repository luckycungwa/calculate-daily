import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateTripCost, tripFuelScenarios } from './fuelTrip';
import { getFuelPrice, FUEL_PRICE_DATA } from '../data/fuelPrices';

/**
 * Regression guard for the South Africa Fuel Calculator: the widget's chart
 * and headline values must equal this engine, which multiplies distance,
 * consumption and price. 100 km at 7.5 L/100km uses 7.5 L; at the published
 * inland 95 ULP price that trip costs 7.5 x price.
 */
test('trip cost ties distance, consumption and the published price together', () => {
  const price = getFuelPrice('inland', '95ulp');
  const trip = calculateTripCost({
    distanceKm: 100,
    consumptionLPer100km: 7.5,
    pricePerLitre: price,
  });
  assert.equal(trip.distanceKm, 100);
  assert.ok(Math.abs(trip.fuelNeededL - 7.5) < 1e-9);
  assert.ok(Math.abs(trip.totalCost - 7.5 * price) < 1e-9);
  assert.ok(Math.abs(trip.costPerKm - (7.5 * price) / 100) < 1e-9);
  assert.equal(trip.priceSource, 'published-dmpr');
});

test('return trips double the distance but not the consumption rate', () => {
  const trip = calculateTripCost({
    distanceKm: 300,
    consumptionLPer100km: 6,
    pricePerLitre: 10,
    returnTrip: true,
  });
  assert.equal(trip.distanceKm, 600);
  assert.ok(Math.abs(trip.fuelNeededL - 36) < 1e-9);
  assert.ok(Math.abs(trip.totalCost - 360) < 1e-9);
  // costPerKm matches the one-way price, proving the doubling only moved distance
  const oneWay = calculateTripCost({ distanceKm: 300, consumptionLPer100km: 6, pricePerLitre: 10 });
  assert.ok(Math.abs(trip.costPerKm - oneWay.costPerKm) < 1e-12);
});

test('zero distance and zero consumption do not divide by zero', () => {
  const zeroDistance = calculateTripCost({ distanceKm: 0, consumptionLPer100km: 7.5, pricePerLitre: 10 });
  assert.equal(zeroDistance.fuelNeededL, 0);
  assert.equal(zeroDistance.totalCost, 0);
  assert.equal(zeroDistance.costPerKm, 0);
  const zeroConsumption = calculateTripCost({ distanceKm: 100, consumptionLPer100km: 0, pricePerLitre: 10 });
  assert.equal(zeroConsumption.totalCost, 0);
});

test('scenario strip reads prices straight from the published schedule', () => {
  const scenarios = tripFuelScenarios({
    province: 'Western Cape',
    fuelTypes: ['95ulp', '93ulp', 'diesel50', 'diesel500'],
    distanceKm: 120,
    consumptionLPer100km: 8,
  });
  assert.equal(scenarios.length, 4);
  for (const s of scenarios) {
    // every scenario maps its stated price to the published table
    assert.ok(s.priceProof.includes(FUEL_PRICE_DATA.effectiveLabel), s.priceProof);
  }
  const coastal95 = getFuelPrice('coastal', '95ulp');
  const [petrol] = scenarios;
  assert.ok(Math.abs(petrol.scenario.pricePerLitre - coastal95) < 1e-9);
  assert.ok(Math.abs(petrol.scenario.fuelNeededL - 9.6) < 1e-9);
  assert.ok(Math.abs(petrol.scenario.totalCost - 9.6 * coastal95) < 1e-9);
  // diesel is flagged as the wholesale baseline in its proof text
  assert.ok(scenarios[2].priceProof.includes('wholesale'));
  assert.ok(!scenarios[0].priceProof.includes('wholesale'));
});

test('a user-entered price override is labelled, never posed as official', () => {
  const scenarios = tripFuelScenarios({
    province: 'Gauteng',
    fuelTypes: ['95ulp'],
    distanceKm: 100,
    consumptionLPer100km: 7.5,
    priceOverride: 25,
  });
  const [withOverride] = scenarios;
  assert.ok(withOverride.label.includes('your price'));
  assert.ok(withOverride.priceProof.includes('user-entered'));
  assert.ok(Math.abs(withOverride.scenario.totalCost - 187.5) < 1e-9);
  assert.equal(withOverride.scenario.priceSource, 'user-entered');

  // an invalid override (0 / negative / NaN) falls back to the published price
  for (const bad of [0, -3, Number.NaN]) {
    const fallback = tripFuelScenarios({
      province: 'Gauteng',
      fuelTypes: ['95ulp'],
      distanceKm: 100,
      consumptionLPer100km: 7.5,
      priceOverride: bad,
    });
    assert.equal(fallback[0].scenario.priceSource, 'published-dmpr');
    assert.ok(Math.abs(fallback[0].scenario.pricePerLitre - getFuelPrice('inland', '95ulp')) < 1e-9);
    assert.ok(fallback[0].priceProof.includes('published'));
  }
});
