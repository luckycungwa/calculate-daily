import assert from 'node:assert/strict';
import test from 'node:test';
import {
  APPLIANCE_LIBRARY,
  applianceCost,
  applianceUsage,
  costForKwh,
  householdTotals,
  ledVsConventionalSavings,
} from './electricityCost';

/**
 * Regression guard for the Electricity Cost Calculator: kwh, cost and LED
 * savings all reduce to the same formula, so visualisations of monthly cost
 * per appliance and the household totals must match these engine outputs.
 */
test('geyser example converts watts x hours x days x rate', () => {
  // 3,000 W geyser, 3 h/day: 9 kWh/day → 274 kWh over a 30.44-day month
  const usage = applianceUsage({ id: 'geyser', label: 'Geyser', watts: 3000, hoursPerDay: 3, quantity: 1 });
  assert.ok(Math.abs(usage.kwhPerDay - 9) < 1e-9);
  assert.ok(Math.abs(usage.kwhPerYear - 9 * 365) < 1e-9);
  const cost = applianceCost(
    { id: 'geyser', label: 'Geyser', watts: 3000, hoursPerDay: 3, quantity: 1 },
    2.5,
    30
  );
  assert.ok(Math.abs(cost.costPerMonth - 9 * 30 * 2.5) < 1e-9);
  assert.ok(Math.abs(cost.costPerDay - 22.5) < 1e-9);
});

test('quantities scale linearly and invalid loads contribute nothing', () => {
  const two = applianceUsage({ id: 'bulb', label: 'Bulb', watts: 60, hoursPerDay: 5, quantity: 2 });
  const one = applianceUsage({ id: 'bulb', label: 'Bulb', watts: 60, hoursPerDay: 5, quantity: 1 });
  assert.ok(Math.abs(two.kwhPerDay - one.kwhPerDay * 2) < 1e-12);

  // negative / NaN watts, hours or quantities clamp to zero rather than invent cost
  assert.equal(applianceUsage({ id: 'x', label: 'X', watts: -100, hoursPerDay: 5, quantity: 1 }).kwhPerDay, 0);
  assert.equal(applianceUsage({ id: 'x', label: 'X', watts: 100, hoursPerDay: NaN, quantity: 1 }).kwhPerDay, 0);
  assert.equal(applianceCost({ id: 'x', label: 'X', watts: 0, hoursPerDay: 1, quantity: -1 }, 2).costPerMonth, 0);
});

test('household totals equal the sum of every appliance line', () => {
  const loads = [
    { id: 'geyser', label: 'Geyser', watts: 3000, hoursPerDay: 3, quantity: 1 },
    { id: 'fridge', label: 'Fridge', watts: 100, hoursPerDay: 24, quantity: 1 },
    { id: 'led-strand', label: 'LED lighting', watts: 90, hoursPerDay: 5, quantity: 1 },
  ];
  const totals = householdTotals(loads, 2, 31);
  const manual = loads.reduce((s, l) => s + applianceCost(l, 2, 31).costPerMonth, 0);
  assert.ok(Math.abs(totals.costPerMonth - manual) < 1e-9);
  assert.ok(Math.abs(totals.kwhPerMonth - loads.reduce((s, l) => s + applianceUsage(l, 31).kwhPerMonth, 0)) < 1e-9);
  assert.equal(householdTotals([], 2, 30).costPerMonth, 0);
});

test('LED savings come from the identical formula, only the wattage differs', () => {
  const savings = ledVsConventionalSavings({
    conventionalWatts: 600, // 10 x 60 W halogens
    ledWatts: 90, // 10 x 9 W LEDs
    hoursPerDay: 5,
    quantity: 1,
    ratePerKwh: 2,
    daysPerMonth: 30,
  });
  assert.ok(Math.abs(savings.conventional.costPerMonth - 0.6 * 5 * 30 * 2) < 1e-9); // R180
  assert.ok(Math.abs(savings.led.costPerMonth - 0.09 * 5 * 30 * 2) < 1e-9); // R27
  assert.ok(Math.abs(savings.monthlySaving - 153) < 1e-9);
  // annual uses 365 real days, not 12 x the 30-day month: costPerYear diff
  assert.ok(Math.abs(savings.annualSaving - (savings.conventional.costPerYear - savings.led.costPerYear)) < 1e-9);
  assert.ok(savings.annualSaving > 1800);
  assert.ok(Math.abs(savings.monthlyKwhSaved - (90 - 13.5)) < 1e-9);
});

test("the library's installed defaults compute inside a plausible envelope", () => {
  // Every library entry feeds the component; sanity-check each against the formula
  for (const entry of APPLIANCE_LIBRARY) {
    const usage = applianceUsage({ id: entry.id, label: entry.label, watts: entry.watts, hoursPerDay: entry.hoursPerDay, quantity: 1 });
    assert.ok(
      Math.abs(usage.kwhPerDay - (entry.watts / 1000) * entry.hoursPerDay) < 1e-9,
      `${entry.id} usage`
    );
    assert.ok(usage.kwhPerMonth >= 0);
  }
  // lighting pair exists so the LED comparison always has honest defaults
  const incandescent = APPLIANCE_LIBRARY.find((a) => a.id === 'incandescent');
  const led = APPLIANCE_LIBRARY.find((a) => a.id === 'led-equivalent');
  assert.ok(incandescent && led);
  assert.ok(led.watts < incandescent.watts);
  // same burning hours, comparable light output — the honest comparison the UI offers
  assert.equal(incandescent.hoursPerDay, led.hoursPerDay);
});

test('cost for a plain kWh figure is rate x energy, never negative', () => {
  assert.equal(costForKwh(72, 0.16), 11.52);
  assert.equal(costForKwh(-5, 2), 0);
  assert.equal(costForKwh(5, -2), 0);
});
