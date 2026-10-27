import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDilution,
  calculateHalfLife,
  calculateMolarity,
  parseChemicalFormula,
  phFromHydrogen,
  phFromValue,
} from './chemistry';

test('formula parser handles subscripts, groups, and hydrates', () => {
  const water = parseChemicalFormula('H2O');
  assert.equal(Number(water.molarMass.toFixed(3)), 18.015);
  assert.deepEqual(water.counts, { H: 2, O: 1 });
  assert.equal(water.totalAtoms, 3);
  assert.equal(Number(water.massPercent.H.toFixed(2)), 11.19);

  const glucose = parseChemicalFormula('C6H12O6');
  assert.equal(Number(glucose.molarMass.toFixed(2)), 180.16);

  const lime = parseChemicalFormula('Ca(OH)2');
  assert.deepEqual(lime.counts, { Ca: 1, O: 2, H: 2 });
  assert.equal(Number(lime.molarMass.toFixed(3)), 74.092);

  const hydrate = parseChemicalFormula('CuSO4\u00b75H2O');
  assert.deepEqual(hydrate.counts, { Cu: 1, S: 1, O: 9, H: 10 });
  assert.equal(Number(hydrate.molarMass.toFixed(2)), 249.68);

  assert.throws(() => parseChemicalFormula('Xx2'), /Unknown element/);
  assert.throws(() => parseChemicalFormula('(OH'), /Unclosed bracket/);
  assert.throws(() => parseChemicalFormula('H2O)'), /Unmatched closing/);
  assert.throws(() => parseChemicalFormula('2H2O'), /subscript must follow/);
  assert.throws(() => parseChemicalFormula(''), /Enter a chemical formula/);
});

test('molarity connects mass, molar mass, and volume', () => {
  // 5.844 g of NaCl (58.44 g/mol) in 1 L is 0.1 M.
  const salt = calculateMolarity(5.844, 58.44, 1);
  assert.equal(Number(salt.molarity.toFixed(6)), 0.1);
  assert.equal(Number(salt.moles.toFixed(6)), 0.1);
  assert.equal(Number(salt.millimoles.toFixed(3)), 100);
  assert.equal(Number(salt.millimolarity.toFixed(3)), 100);

  assert.throws(() => calculateMolarity(5, 0, 1), /Molar mass/);
  assert.throws(() => calculateMolarity(5, 58, 0), /Volume/);
  assert.throws(() => calculateMolarity(-1, 58, 1), /Mass/);
});

test('dilution solves C1V1 = C2V2 and predicts the actual final concentration', () => {
  const dilution = calculateDilution(1, 0.1, 100);
  assert.equal(Number(dilution.stockVolume.toFixed(6)), 10);
  assert.equal(Number(dilution.diluentVolume.toFixed(6)), 90);
  assert.equal(Number(dilution.dilutionFactor.toFixed(6)), 10);

  const short = calculateDilution(1, 0.1, 100, 5);
  assert.equal(Number(short.finalConcentration.toFixed(6)), 0.05);

  assert.throws(() => calculateDilution(0.1, 1, 100), /cannot exceed/);
  assert.throws(() => calculateDilution(1, 0, 100), /Target concentration/);
  assert.throws(() => calculateDilution(1, 0.1, 0), /Final volume/);
});

test('pH conversions stay reciprocal and classify acidic, neutral, and basic', () => {
  const neutral = phFromHydrogen(1e-7);
  assert.equal(Number(neutral.ph.toFixed(6)), 7);
  assert.equal(neutral.classification, 'neutral');
  assert.equal(Number(neutral.poh.toFixed(6)), 7);
  assert.ok(Math.abs(neutral.hydroxide - 1e-7) < 1e-15);

  const acid = phFromHydrogen(1e-3);
  assert.equal(Number(acid.ph.toFixed(6)), 3);
  assert.equal(acid.classification, 'acidic');

  const base = phFromValue(10);
  assert.equal(base.classification, 'basic');
  assert.equal(Number(base.hydrogen.toExponential(2)), 1e-10);
  assert.equal(Number(base.poh.toFixed(6)), 4);

  assert.throws(() => phFromHydrogen(0), /greater than zero/);
  assert.throws(() => phFromValue(20), /between -1 and 15/);
});

test('half-life decays exponentially and reports elapsed half-lives', () => {
  const result = calculateHalfLife(100, 5, 10);
  assert.equal(result.remaining, 25);
  assert.equal(result.decayed, 75);
  assert.equal(result.halfLives, 2);
  assert.equal(result.percentRemaining, 25);

  const noTime = calculateHalfLife(50, 5, 0);
  assert.equal(noTime.remaining, 50);
  assert.equal(noTime.decayed, 0);

  assert.throws(() => calculateHalfLife(100, 0, 10), /Half-life/);
  assert.throws(() => calculateHalfLife(-1, 5, 10), /Initial amount/);
  assert.throws(() => calculateHalfLife(100, 5, -1), /Elapsed time/);
});
