import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addDaysToIsoDate,
  calculateApsScore,
  calculateConceptionDate,
  calculateConfidenceIntervalMean,
  calculateDueDate,
  calculateOvulation,
  calculatePregnancyWeek,
  calculateSampleSize,
  parseIsoDate,
  percentageToNscLevel,
} from './academicAndHealthCalculations';

test('APS score converts percentages to NSC levels accurately', () => {
  assert.equal(percentageToNscLevel(85), 7);
  assert.equal(percentageToNscLevel(72), 6);
  assert.equal(percentageToNscLevel(61), 5);
  assert.equal(percentageToNscLevel(55), 4);
  assert.equal(percentageToNscLevel(45), 3);
  assert.equal(percentageToNscLevel(33), 2);
  assert.equal(percentageToNscLevel(25), 1);
  assert.throws(() => percentageToNscLevel(-5), /between 0 and 100/);
  assert.throws(() => percentageToNscLevel(105), /between 0 and 100/);
});

test('APS score computes total points with LO exclusion and pass requirements', () => {
  const subjects = [
    { name: 'English Home Language', percentage: 75 }, // Level 6
    { name: 'Afrikaans First Additional', percentage: 65 }, // Level 5
    { name: 'Mathematics', percentage: 82 }, // Level 7
    { name: 'Physical Sciences', percentage: 70 }, // Level 6
    { name: 'Life Sciences', percentage: 68 }, // Level 5
    { name: 'Accounting', percentage: 74 }, // Level 6
    { name: 'Life Orientation', percentage: 88, isLifeOrientation: true }, // Level 7
  ];

  // When Life Orientation is excluded (common university practice, e.g. UP, Wits)
  const resultExclude = calculateApsScore(subjects, 'exclude');
  // 6 + 5 + 7 + 6 + 5 + 6 = 35 points (LO excluded = 0)
  assert.equal(resultExclude.totalAps, 35);
  assert.equal(resultExclude.qualificationPass, 'Bachelor Degree');

  // When Life Orientation is full points
  const resultFull = calculateApsScore(subjects, 'full');
  assert.equal(resultFull.totalAps, 42);

  // When Life Orientation is half points
  const resultHalf = calculateApsScore(subjects, 'half');
  // Level 7 / 2 = 3.5 -> rounded to 4
  assert.equal(resultHalf.totalAps, 39);
});

test('Confidence interval computes margin of error and bounds for sample mean', () => {
  // Mean = 100, SD = 15, N = 36, 95% confidence
  // SE = 15 / sqrt(36) = 2.5
  // ME = 1.95996 * 2.5 = 4.8999
  const ci = calculateConfidenceIntervalMean({
    sampleMean: 100,
    standardDeviation: 15,
    sampleSize: 36,
    confidenceLevel: 95,
  });

  assert.equal(ci.standardError, 2.5);
  assert.ok(Math.abs(ci.marginOfError - 4.9) < 0.01);
  assert.ok(Math.abs(ci.lowerBound - 95.1) < 0.01);
  assert.ok(Math.abs(ci.upperBound - 104.9) < 0.01);

  assert.throws(
    () =>
      calculateConfidenceIntervalMean({
        sampleMean: 100,
        standardDeviation: -2,
        sampleSize: 36,
        confidenceLevel: 95,
      }),
    /cannot be negative/
  );
});

test('Sample size computes Cochran sample size with and without finite population correction', () => {
  // 95% confidence (z = 1.96), margin of error = 5%, p = 50%
  // unadjusted n0 = (1.95996^2 * 0.25) / 0.0025 = ~384.15 -> 385
  const infiniteRes = calculateSampleSize({
    confidenceLevel: 95,
    marginOfError: 5,
    populationProportion: 50,
  });

  assert.equal(infiniteRes.requiredSampleSize, 385);
  assert.equal(infiniteRes.isFiniteAdjusted, false);

  // Finite population of 1000
  // n = 384.15 / (1 + 383.15/1000) = 384.15 / 1.38315 = 277.7 -> 278
  const finiteRes = calculateSampleSize({
    confidenceLevel: 95,
    marginOfError: 5,
    populationProportion: 50,
    populationSize: 1000,
  });

  assert.equal(finiteRes.requiredSampleSize, 278);
  assert.equal(finiteRes.isFiniteAdjusted, true);
});

test('Ovulation calculator identifies fertile window and next period accurately', () => {
  // LMP: 2026-05-01, 28-day cycle, 14-day luteal phase
  // Ovulation on day 14 = 2026-05-15
  // Fertile window = 2026-05-10 to 2026-05-16
  // Next period = 2026-05-29
  const res = calculateOvulation({
    lastPeriodDate: '2026-05-01',
    cycleLengthDays: 28,
    lutealPhaseDays: 14,
  });

  assert.equal(res.ovulationDate, '2026-05-15');
  assert.equal(res.fertileWindowStart, '2026-05-10');
  assert.equal(res.fertileWindowEnd, '2026-05-16');
  assert.equal(res.nextPeriodDate, '2026-05-29');

  assert.throws(
    () =>
      calculateOvulation({
        lastPeriodDate: '2026-05-01',
        cycleLengthDays: 15, // outside valid human range
      }),
    /between 20 and 45 days/
  );
});

test('Pregnancy due date calculator uses Naegele rule and computes gestational age', () => {
  // LMP: 2026-01-01, 28-day cycle -> EDD = 2026-01-01 + 280 days = 2026-10-08
  const res = calculateDueDate({
    method: 'lmp',
    inputDate: '2026-01-01',
    cycleLengthDays: 28,
    asOfDate: '2026-04-09', // exactly 98 days = 14 weeks 0 days
  });

  assert.equal(res.estimatedDueDate, '2026-10-08');
  assert.equal(res.gestationalWeeks, 14);
  assert.equal(res.gestationalDays, 0);
  assert.equal(res.currentTrimester, 2);
  assert.ok(res.progressPercent >= 35);
});

test('Ovulation forecast projects further cycles without drifting a day', () => {
  const res = calculateOvulation({
    lastPeriodDate: '2026-05-01',
    cycleLengthDays: 28,
    lutealPhaseDays: 14,
    cyclesAhead: 2,
  });

  assert.equal(res.forecast.length, 2);
  assert.equal(res.forecast[0].periodStart, '2026-05-29');
  assert.equal(res.forecast[0].ovulationDate, '2026-06-12');
  assert.equal(res.forecast[1].periodStart, '2026-06-26');
  assert.equal(res.forecast[1].fertileWindowStart, '2026-07-05');
  // Obstetric counting: the first day of the period is cycle day 1, so LMP + 14 days is day 15.
  assert.equal(res.ovulationCycleDay, 15);
});

test('Due date respects a non-28-day cycle and clamps past due dates', () => {
  // A 35-day cycle delays ovulation by 7 days, so the EDD moves 7 days later.
  const res = calculateDueDate({
    method: 'lmp',
    inputDate: '2026-01-01',
    cycleLengthDays: 35,
    asOfDate: '2026-10-30', // after the 2026-10-15 EDD
  });

  assert.equal(res.estimatedDueDate, '2026-10-15');
  assert.equal(res.conceptionDate, '2026-01-22');
  assert.equal(res.daysRemaining, 0);
  assert.equal(res.progressPercent, 100);

  assert.throws(
    () => calculateDueDate({ method: 'lmp', inputDate: '2026-02-30' }),
    /valid date/
  );
});

test('Conception calculator reverses a due date and derives the intercourse window', () => {
  // EDD 2026-10-08 -> conception 266 days earlier = 2026-01-15
  const fromDueDate = calculateConceptionDate({
    method: 'due-date',
    inputDate: '2026-10-08',
  });

  assert.equal(fromDueDate.conceptionDate, '2026-01-15');
  assert.equal(fromDueDate.lastPeriodDate, '2026-01-01');
  assert.equal(fromDueDate.intercourseWindowStart, '2026-01-10');
  assert.equal(fromDueDate.intercourseWindowEnd, '2026-01-16');

  // LMP 2026-05-01 with a 30-day cycle -> ovulation on cycle day 16 = 2026-05-17
  const fromLmp = calculateConceptionDate({
    method: 'lmp',
    inputDate: '2026-05-01',
    cycleLengthDays: 30,
  });

  assert.equal(fromLmp.conceptionDate, '2026-05-17');
  assert.equal(fromLmp.dueDate, '2027-02-07');
});

test('Date helpers reject impossible dates instead of rolling them forward', () => {
  assert.equal(parseIsoDate('2026-02-29'), null);
  assert.equal(parseIsoDate('2024-02-29')?.toISOString(), '2024-02-29T00:00:00.000Z');
  assert.equal(addDaysToIsoDate('2026-12-31', 1), '2027-01-01');
  assert.throws(() => addDaysToIsoDate('31/12/2026', 1), /valid date/);
});


test('Pregnancy week reports obstetric week, fetal age, and the next milestone', () => {
  // LMP 2026-01-01 + 100 days = 14 weeks 2 days on 2026-04-11.
  const res = calculatePregnancyWeek({
    method: 'lmp',
    inputDate: '2026-01-01',
    asOfDate: '2026-04-11',
  });

  assert.equal(res.weekNumber, 14);
  assert.equal(res.daysIntoWeek, 2);
  assert.equal(res.fetalAgeWeeks, 12);
  assert.equal(res.fetalAgeDays, 2);
  assert.equal(res.trimester, 2);
  assert.equal(res.estimatedDueDate, '2026-10-08');
  assert.equal(res.nextMilestone?.week, 20);
  assert.equal(res.weeksRemaining, 26);

  // Conception-based input is dated forward 266 days.
  const fromConception = calculatePregnancyWeek({
    method: 'conception',
    inputDate: '2026-01-15',
    asOfDate: '2026-04-11',
  });
  assert.equal(fromConception.weekNumber, 14);
  assert.equal(fromConception.estimatedDueDate, '2026-10-08');
});
