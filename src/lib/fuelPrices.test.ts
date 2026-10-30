import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  FUEL_LABELS,
  FUEL_PRICE_DATA,
  PROVINCE_REGIONS,
  getFuelPrice,
  isDiesel,
  type FuelType,
} from '../data/fuelPrices';

const FUEL_TYPES = Object.keys(FUEL_LABELS) as FuelType[];

/**
 * Fuel prices are time-sensitive, externally sourced data. These tests pin the
 * published effective date and check the relationships that a hand-typed update
 * can break (missing product, wrong zone, stale month, impossible price).
 */
test('fuel data covers every product in both pricing zones', () => {
  assert.deepEqual(FUEL_TYPES.sort(), ['93ulp', '95ulp', 'diesel50', 'diesel500']);
  for (const type of FUEL_TYPES) {
    assert.equal(typeof getFuelPrice('inland', type), 'number', `missing inland ${type}`);
    assert.equal(typeof getFuelPrice('coastal', type), 'number', `missing coastal ${type}`);
  }
});

test('fuel prices match the DMPR schedule effective 7 October 2026', () => {
  assert.equal(FUEL_PRICE_DATA.effectiveDate, '2026-10-07');
  assert.equal(FUEL_PRICE_DATA.effectiveLabel, '7 October 2026');
  assert.deepEqual(FUEL_PRICE_DATA.prices, {
    inland: { '95ulp': 30.25, '93ulp': 29.88, diesel50: 32.8, diesel500: 31.95 },
    coastal: { '95ulp': 29.38, '93ulp': 29.01, diesel50: 31.93, diesel500: 31.08 },
  });
});

test('coastal prices are lower than inland prices for every product', () => {
  for (const type of FUEL_TYPES) {
    assert.ok(
      getFuelPrice('coastal', type) < getFuelPrice('inland', type),
      `${type} coastal should be below inland`
    );
  }
});

test('fuel grade ordering is internally consistent', () => {
  for (const region of ['inland', 'coastal'] as const) {
    assert.ok(getFuelPrice(region, '95ulp') > getFuelPrice(region, '93ulp'), `${region}: 95 should exceed 93`);
    assert.ok(
      getFuelPrice(region, 'diesel50') > getFuelPrice(region, 'diesel500'),
      `${region}: low-sulphur diesel should cost more`
    );
  }
});

test('prices are inside a plausible Rand-per-litre range', () => {
  for (const region of ['inland', 'coastal'] as const) {
    for (const type of FUEL_TYPES) {
      const price = getFuelPrice(region, type);
      assert.ok(Number.isFinite(price), `${region} ${type} is not finite`);
      assert.ok(price >= 15 && price <= 45, `${region} ${type} outside R15–R45/L: ${price}`);
    }
  }
});

test('verification and adjustment dates are ordered and well formed', () => {
  const effective = Date.parse(FUEL_PRICE_DATA.effectiveDate);
  const verified = Date.parse(FUEL_PRICE_DATA.lastVerifiedDate);
  const next = Date.parse(FUEL_PRICE_DATA.nextAdjustmentDate);

  assert.ok(Number.isFinite(effective), 'effective date must parse');
  assert.ok(Number.isFinite(verified), 'verification date must parse');
  assert.ok(Number.isFinite(next), 'next adjustment date must parse');
  assert.ok(verified >= effective, 'last verified must not predate the effective date');
  assert.ok(next > effective, 'next adjustment must follow the effective date');
  assert.equal(FUEL_PRICE_DATA.nextAdjustmentPublished, false, 'do not present projections as official');
});

test('the data is not labelled with a stale month', () => {
  const serialized = JSON.stringify(FUEL_PRICE_DATA).toLowerCase();
  assert.ok(!serialized.includes('august 2026'), 'August 2026 label is stale');
  assert.ok(serialized.includes('7 october 2026'));
});

test('the DMPR source is a real HTTPS government URL', () => {
  const url = new URL(FUEL_PRICE_DATA.source.url);
  assert.equal(url.protocol, 'https:');
  assert.match(url.hostname, /(^|\.)dmpr\.gov\.za$/);
  assert.ok(FUEL_PRICE_DATA.secondarySource.url.startsWith('https://'));
});

test('all nine provinces map to a known pricing zone', () => {
  const provinces = Object.keys(PROVINCE_REGIONS);
  assert.equal(provinces.length, 9);
  for (const province of provinces) {
    assert.ok(['inland', 'coastal'].includes(PROVINCE_REGIONS[province as keyof typeof PROVINCE_REGIONS]));
  }
  assert.equal(PROVINCE_REGIONS.Gauteng, 'inland');
  assert.equal(PROVINCE_REGIONS['Western Cape'], 'coastal');
});

test('diesel products are identified for wholesale-baseline labelling', () => {
  assert.equal(isDiesel('diesel50'), true);
  assert.equal(isDiesel('diesel500'), true);
  assert.equal(isDiesel('95ulp'), false);
  assert.equal(isDiesel('93ulp'), false);
});
