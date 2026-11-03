import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDescription,
  clampToLength,
  isValidDescription,
  DESCRIPTION_MAX,
  DESCRIPTION_MIN,
} from './metaDescription';
import { CALCULATOR_CATALOG } from '../data/calculators';
import { GUIDE_REGISTRY } from '../data/guides';

test('an explicit description always wins', () => {
  const description = buildDescription({
    explicit: 'Convert minutes to hours and minutes with a worked example.',
    intro: 'This introduction must not win.',
  });
  assert.equal(description, 'Convert minutes to hours and minutes with a worked example.');
});

test('an over-long explicit description is clamped, never dropped', () => {
  const long = 'Word '.repeat(80).trim();
  const description = buildDescription({ explicit: long });
  assert.ok(description.length <= DESCRIPTION_MAX);
  assert.ok(description.length >= DESCRIPTION_MIN);
});

test('the introduction is preferred over the one-line summary', () => {
  const description = buildDescription({
    intro:
      'The Minutes to Hours Calculator converts a total number of minutes into hours and remaining minutes.',
    shortDesc: 'Convert minutes to hours and minutes.',
  });
  assert.ok(description.startsWith('The Minutes to Hours Calculator'));
});

test('a short introduction is topped up rather than shipped alone', () => {
  const description = buildDescription({
    intro: 'Converts minutes.',
    shortDesc: 'Convert minutes to hours and minutes.',
    name: 'Minutes to Hours Calculator',
  });
  assert.ok(description.length >= DESCRIPTION_MIN);
  assert.ok(description.includes('Convert minutes to hours and minutes.'));
});

test('truncation never splits a word and never leaves a dangling separator', () => {
  const source =
    'Convert centimetres to inches for height, fabric, and product dimensions, including screens, ' +
    'furniture, and anything else measured in both metric and imperial units.';
  const description = clampToLength(source, 120);
  assert.ok(description.length <= 120);
  assert.ok(source.startsWith(description), 'the cut must be a prefix of the source');
  assert.ok(!/\s$/.test(description));
  assert.ok(!/[,;:\-–—]$/u.test(description));
  // A word boundary means the next character in the source is a space or the end.
  if (description.length < source.length) {
    assert.equal(source[description.length], ' ');
  }
});

test('a sentence boundary is preferred when one fits', () => {
  const description = clampToLength(
    'Convert kilometres to miles in one step. The converter also reports the pace per mile for a run.',
    60
  );
  assert.equal(description, 'Convert kilometres to miles in one step.');
});

test('the published bounds are enforced', () => {
  assert.equal(isValidDescription('x'.repeat(DESCRIPTION_MIN)), true);
  assert.equal(isValidDescription('x'.repeat(DESCRIPTION_MIN - 1)), false);
  assert.equal(isValidDescription('x'.repeat(DESCRIPTION_MAX)), true);
  assert.equal(isValidDescription('x'.repeat(DESCRIPTION_MAX + 1)), false);
});

test('every calculator produces a valid, unique description', () => {
  const seen = new Map<string, string>();
  for (const calc of CALCULATOR_CATALOG) {
    const description = buildDescription({
      explicit: calc.seo?.description,
      intro: calc.content.intro,
      shortDesc: calc.shortDesc,
      name: calc.name,
    });
    assert.ok(
      isValidDescription(description),
      `${calc.slug} produced ${description.length} chars: "${description}"`
    );
    assert.ok(!description.endsWith('…'), `${calc.slug} ends with an ellipsis`);
    const clash = seen.get(description);
    assert.equal(clash, undefined, `${calc.slug} duplicates ${clash}`);
    seen.set(description, calc.slug);
  }
});

test('every guide produces a valid description', () => {
  for (const guide of GUIDE_REGISTRY) {
    const description = buildDescription({
      explicit: guide.seo?.description,
      intro: guide.shortDesc,
      shortDesc: guide.shortDesc,
      name: guide.name,
    });
    assert.ok(isValidDescription(description), `${guide.slug}: ${description.length} chars`);
  }
});
