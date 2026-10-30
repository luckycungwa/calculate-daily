import test from 'node:test';
import assert from 'node:assert/strict';
import { withBrand, DEFAULT_TITLE } from './pageTitle';

test('page titles carry one brand suffix', () => {
  assert.equal(withBrand('Mortgage Calculator'), 'Mortgage Calculator | Total Calculation');
  assert.equal(withBrand('  About & Methodology  '), 'About & Methodology | Total Calculation');
});

test('missing titles fall back to the home title', () => {
  assert.equal(withBrand(), DEFAULT_TITLE);
  assert.equal(withBrand(''), DEFAULT_TITLE);
  assert.equal(withBrand('   '), DEFAULT_TITLE);
  assert.equal(DEFAULT_TITLE, 'Total Calculation - Free Online Calculators & Unit Converters');
});
