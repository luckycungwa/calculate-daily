import assert from 'node:assert/strict';
import test from 'node:test';
import { BMI_DIAL, BMI_ZONES, bmiValue, bmiZoneFor, healthyWeightRange, kgToPounds, poundsToKg } from './bmi';

/**
 * Regression guard for the BMI calculator: the dial, the category text and
 * the healthy-weight range all come from this engine, so the boundaries
 * (18.5 / 25 / 30) and the inverse-weight formula are pinned here.
 */
test('catalogue example: 70 kg at 175 cm is 22.9, normal weight', () => {
  const bmi = bmiValue(70, 1.75);
  assert.ok(Math.abs(bmi - 22.857142857) < 1e-9);
  assert.equal(bmiZoneFor(bmi).id, 'normal');
  assert.equal(bmiZoneFor(bmi).label, 'Normal weight');
});

test('WHO cut-offs classify exactly, including the boundary values', () => {
  assert.equal(bmiZoneFor(18.4).id, 'under');
  assert.equal(bmiZoneFor(18.5).id, 'normal');
  assert.equal(bmiZoneFor(24.9).id, 'normal');
  assert.equal(bmiZoneFor(25).id, 'over');
  assert.equal(bmiZoneFor(29.9).id, 'over');
  assert.equal(bmiZoneFor(30).id, 'obese');
  assert.equal(bmiZoneFor(39.9).id, 'obese');
});

test('invalid measurements give no number and cannot be classified', () => {
  assert.equal(bmiValue(0, 1.75), 0);
  assert.equal(bmiValue(70, 0), 0);
  assert.throws(() => bmiZoneFor(0));
});

test('healthy weight range is the inverse of the normal band', () => {
  const range = healthyWeightRange(1.75);
  // the range is the normal-band cut-offs applied to 1.75 m squared, rounded to 0.1 kg
  const expectedMin = parseFloat((18.5 * 1.75 * 1.75).toFixed(1)); // 56.7
  const expectedMax = parseFloat(((25 - 0.1) * 1.75 * 1.75).toFixed(1)); // 76.2
  assert.equal(range.min, expectedMin);
  assert.equal(range.max, expectedMax);
  // round-trip: a weight at the top of the range still classifies normal
  assert.equal(bmiZoneFor(bmiValue(range.max, 1.75)).id, 'normal');
  // a hair above the range (BMI ≥ 25 at this height is ≥ 76.6 kg) classifies overweight
  assert.equal(bmiZoneFor(bmiValue(range.max + 0.4, 1.75)).id, 'over');
  assert.deepEqual(healthyWeightRange(0), { min: 0, max: 0 });
});

test('unit conversions stay consistent with the metric engine', () => {
  assert.ok(Math.abs(poundsToKg(154.3235839) - 70) < 1e-6);
  assert.ok(Math.abs(kgToPounds(70) - 154.3) < 0.06);
  // imperial inputs land in the same zone as the metric engine
  const metric = bmiZoneFor(bmiValue(70, 1.75));
  const imperial = bmiZoneFor(bmiValue(poundsToKg(154.3), (5 * 12 + 9) * 0.0254));
  assert.equal(metric.id, imperial.id);
});

test('the dial covers every WHO cut-off and its zones are one list with the legend', () => {
  // stops are the finite zone starts: 18.5, 25, 30 — all within the 10–40 scale
  assert.deepEqual(BMI_DIAL.stops, [18.5, 25, 30]);
  for (const stop of BMI_DIAL.stops) {
    assert.ok(stop > BMI_DIAL.scaleMin && stop < BMI_DIAL.scaleMax, `stop ${stop} inside scale`);
  }
  // legend and dial share the same four zones in the same order
  assert.deepEqual(
    BMI_ZONES.map((z) => z.id),
    ['under', 'normal', 'over', 'obese']
  );
});
