import assert from 'node:assert/strict';
import test from 'node:test';
import { parsePath } from './router';

test('parses the supported exact routes', () => {
  assert.deepEqual(parsePath('/'), { name: 'home' });
  assert.deepEqual(parsePath('/calculators'), { name: 'calculators' });
  assert.deepEqual(parsePath('/calculators/compound-interest-calculator'), {
    name: 'calculator',
    slug: 'compound-interest-calculator',
  });
  assert.deepEqual(parsePath('/categories/finance'), {
    name: 'category',
    category: 'finance',
  });
  assert.deepEqual(parsePath('/guides/compound-interest-savings-guide'), {
    name: 'guide',
    slug: 'compound-interest-savings-guide',
  });
  assert.deepEqual(parsePath('/embed/bmi-calculator'), {
    name: 'embed',
    slug: 'bmi-calculator',
  });
});

test('does not alias malformed or extra-segment routes to valid pages', () => {
  for (const path of [
    '/calculators/compound-interest-calculator/extra',
    '/calculators//compound-interest-calculator',
    '/calculators/compound-interest-calculator/',
    '/categories/finance/extra',
    '/guides/compound-interest-savings-guide/extra',
    '/embed/bmi-calculator/extra',
    '/embed/bmi-calculator/',
    '/embed',
    '/embed//bmi-calculator',
    '/about/extra',
    '/privacy/extra',
    '/savings-goal/extra',
  ]) {
    assert.deepEqual(parsePath(path), { name: 'not-found' }, path);
  }
});
