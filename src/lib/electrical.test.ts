import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateResistorValue,
  calculateVoltageDrop,
  formatResistance,
  requiredConductorArea,
  solveOhmsLaw,
} from './electrical';

test("Ohm's law solves every pair of known values consistently", () => {
  const vi = solveOhmsLaw('vi', 12, 2);
  assert.deepEqual(vi, { voltage: 12, current: 2, resistance: 6, power: 24 });

  const vr = solveOhmsLaw('vr', 12, 6);
  assert.equal(vr.current, 2);
  assert.equal(vr.power, 24);

  const ir = solveOhmsLaw('ir', 2, 6);
  assert.equal(ir.voltage, 12);
  assert.equal(ir.power, 24);

  const vp = solveOhmsLaw('vp', 12, 24);
  assert.equal(vp.current, 2);
  assert.equal(vp.resistance, 6);

  const ip = solveOhmsLaw('ip', 2, 24);
  assert.equal(ip.voltage, 12);
  assert.equal(ip.resistance, 6);

  const rp = solveOhmsLaw('rp', 6, 24);
  assert.equal(rp.current, 2);
  assert.equal(rp.voltage, 12);

  assert.throws(() => solveOhmsLaw('vi', 0, 2), /greater than zero/);
  assert.throws(() => solveOhmsLaw('vi', 12, Number.NaN), /greater than zero/);
});

test('voltage drop uses the full out-and-back conductor loop', () => {
  const result = calculateVoltageDrop({
    systemVoltage: 230,
    current: 20,
    oneWayLengthM: 30,
    areaMm2: 4,
    resistivity: 0.0175,
  });

  assert.equal(Number(result.loopResistance.toFixed(4)), 0.2625);
  assert.equal(Number(result.dropVolts.toFixed(3)), 5.25);
  assert.equal(Number(result.dropPercent.toFixed(3)), 2.283);
  assert.equal(Number(result.loadVoltage.toFixed(2)), 224.75);
  assert.equal(Number(result.powerLossW.toFixed(2)), 105);

  assert.throws(
    () =>
      calculateVoltageDrop({ systemVoltage: 230, current: 20, oneWayLengthM: 30, areaMm2: 0, resistivity: 0.0175 }),
    /cross-section/
  );
});

test('required conductor area inverts the voltage-drop equation', () => {
  const area = requiredConductorArea({
    systemVoltage: 230,
    current: 20,
    oneWayLengthM: 30,
    maxDropPercent: 3,
    resistivity: 0.0175,
  });
  assert.equal(Number(area.toFixed(4)), 3.0435);

  // Feeding that area back in must land exactly on the 3% limit.
  const check = calculateVoltageDrop({
    systemVoltage: 230,
    current: 20,
    oneWayLengthM: 30,
    areaMm2: area,
    resistivity: 0.0175,
  });
  assert.equal(Number(check.dropPercent.toFixed(6)), 3);

  assert.throws(
    () =>
      requiredConductorArea({
        systemVoltage: 230,
        current: 20,
        oneWayLengthM: 30,
        maxDropPercent: 0,
        resistivity: 0.0175,
      }),
    /between 0 and 100/
  );
});

test('resistor colour bands produce a value with tolerance limits', () => {
  const brown = calculateResistorValue(1, 0, 100, 5); // brown-black-red-gold
  assert.equal(brown.ohms, 1000);
  assert.equal(brown.minimumOhms, 950);
  assert.equal(brown.maximumOhms, 1050);

  const fourSeven = calculateResistorValue(4, 7, 1, 1);
  assert.equal(fourSeven.ohms, 47);
  assert.equal(Number(fourSeven.minimumOhms.toFixed(2)), 46.53);

  assert.equal(formatResistance(1000), '1.00 kΩ');
  assert.equal(formatResistance(470), '470 Ω');
  assert.equal(formatResistance(2.2e6), '2.20 MΩ');

  assert.throws(() => calculateResistorValue(10, 0, 100, 5), /0 to 9/);
  assert.throws(() => calculateResistorValue(1, 0, 0, 5), /positive multiplier/);
  assert.throws(() => calculateResistorValue(1, 0, 100, 30), /between 0 and 20/);
});
