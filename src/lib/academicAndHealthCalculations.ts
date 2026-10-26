/**
 * Academic and Health Opportunity Calculations
 * High-accuracy, policy-compliant calculations for APS Score, Confidence Intervals,
 * Sample Size, Ovulation, Pregnancy Due Date, and Conception Date.
 *
 * Every date is handled as a UTC calendar date. All clinical outputs are estimates: they follow
 * Naegele's rule (280 days from LMP, 266 days from conception) and standard fertility timing, and
 * are not a substitute for ultrasound dating or medical advice.
 */

// ==========================================
// 1. APS Score (Admission Point Score)
// ==========================================

export type LifeOrientationRule = 'exclude' | 'half' | 'full';

export interface SubjectScore {
  name: string;
  percentage: number;
  isLifeOrientation?: boolean;
}

export interface ApsResult {
  totalAps: number;
  subjectPoints: Array<{ name: string; percentage: number; points: number; isLifeOrientation: boolean }>;
  qualificationPass: 'Bachelor Degree' | 'Diploma' | 'Higher Certificate' | 'Did Not Meet Minimum';
  passSummary: string;
}

export function percentageToNscLevel(percentage: number): number {
  if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
    throw new RangeError('Percentage must be a finite number between 0 and 100.');
  }
  if (percentage >= 80) return 7;
  if (percentage >= 70) return 6;
  if (percentage >= 60) return 5;
  if (percentage >= 50) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 30) return 2;
  return 1;
}

export function calculateApsScore(
  subjects: SubjectScore[],
  loRule: LifeOrientationRule = 'exclude'
): ApsResult {
  if (!Array.isArray(subjects) || subjects.length < 6 || subjects.length > 9) {
    throw new RangeError('Enter between 6 and 9 National Senior Certificate subjects.');
  }

  let totalAps = 0;
  let subjectsAbove50 = 0;
  let subjectsAbove40 = 0;
  let subjectsAbove30 = 0;
  let homeLanguagePassed = false;

  const subjectPoints = subjects.map((sub, index) => {
    const level = percentageToNscLevel(sub.percentage);
    const isLO = Boolean(sub.isLifeOrientation || sub.name.toLowerCase().includes('life orientation'));

    let points = level;
    if (isLO) {
      if (loRule === 'exclude') {
        points = 0;
      } else if (loRule === 'half') {
        points = Math.round(level / 2);
      }
    }

    totalAps += points;

    if (!isLO) {
      if (sub.percentage >= 50) subjectsAbove50++;
      if (sub.percentage >= 40) subjectsAbove40++;
      if (sub.percentage >= 30) subjectsAbove30++;
    }

    if (index === 0 && sub.percentage >= 40) {
      homeLanguagePassed = true;
    }

    return {
      name: sub.name || `Subject ${index + 1}`,
      percentage: sub.percentage,
      points,
      isLifeOrientation: isLO,
    };
  });

  // South African NSC Qualification Pass Thresholds (Department of Basic Education)
  let qualificationPass: ApsResult['qualificationPass'] = 'Did Not Meet Minimum';
  let passSummary = '';

  if (homeLanguagePassed && subjectsAbove50 >= 4 && subjectsAbove30 >= 2) {
    qualificationPass = 'Bachelor Degree';
    passSummary = 'Meets the statutory minimum for Bachelor Degree entrance (subject to faculty-specific APS requirements).';
  } else if (homeLanguagePassed && subjectsAbove40 >= 3 && subjectsAbove30 >= 2) {
    qualificationPass = 'Diploma';
    passSummary = 'Meets the statutory minimum for Diploma study entrance.';
  } else if (homeLanguagePassed && subjectsAbove40 >= 2 && subjectsAbove30 >= 3) {
    qualificationPass = 'Higher Certificate';
    passSummary = 'Meets the statutory minimum for Higher Certificate study entrance.';
  } else {
    qualificationPass = 'Did Not Meet Minimum';
    passSummary = 'Does not meet the standard statutory admission requirements for tertiary study.';
  }

  return {
    totalAps,
    subjectPoints,
    qualificationPass,
    passSummary,
  };
}

// ==========================================
// 2. Confidence Interval Calculator
// ==========================================

export type ConfidenceLevel = 90 | 95 | 98 | 99;

const Z_CRITICAL: Record<ConfidenceLevel, number> = {
  90: 1.6448536269514722,
  95: 1.959963984540054,
  98: 2.3263478740408408,
  99: 2.5758293035489004,
};

export interface ConfidenceIntervalMeanInput {
  sampleMean: number;
  standardDeviation: number;
  sampleSize: number;
  confidenceLevel: ConfidenceLevel;
}

export interface ConfidenceIntervalResult {
  marginOfError: number;
  lowerBound: number;
  upperBound: number;
  criticalValue: number;
  standardError: number;
}

export function calculateConfidenceIntervalMean({
  sampleMean,
  standardDeviation,
  sampleSize,
  confidenceLevel,
}: ConfidenceIntervalMeanInput): ConfidenceIntervalResult {
  if (![sampleMean, standardDeviation, sampleSize].every(Number.isFinite)) {
    throw new RangeError('Sample mean, standard deviation, and sample size must be finite numbers.');
  }
  if (standardDeviation < 0) {
    throw new RangeError('Standard deviation cannot be negative.');
  }
  if (sampleSize < 2 || !Number.isInteger(sampleSize)) {
    throw new RangeError('Sample size must be an integer of 2 or greater.');
  }
  const z = Z_CRITICAL[confidenceLevel];
  if (!z) {
    throw new RangeError('Select a valid confidence level (90, 95, 98, or 99).');
  }

  const standardError = standardDeviation / Math.sqrt(sampleSize);
  const marginOfError = z * standardError;

  return {
    marginOfError,
    lowerBound: sampleMean - marginOfError,
    upperBound: sampleMean + marginOfError,
    criticalValue: z,
    standardError,
  };
}

// ==========================================
// 3. Sample Size Calculator
// ==========================================

export interface SampleSizeInput {
  confidenceLevel: ConfidenceLevel;
  marginOfError: number; // percentage points, e.g. 5 for ±5%
  populationProportion: number; // expected proportion, in percent (50 = maximum variance)
  populationSize?: number; // optional finite population
}

export interface SampleSizeResult {
  requiredSampleSize: number;
  unadjustedSampleSize: number;
  isFiniteAdjusted: boolean;
  marginOfErrorDecimal: number;
  zScore: number;
}

export function calculateSampleSize({
  confidenceLevel,
  marginOfError,
  populationProportion = 50,
  populationSize,
}: SampleSizeInput): SampleSizeResult {
  if (!Number.isFinite(marginOfError) || marginOfError <= 0 || marginOfError >= 100) {
    throw new RangeError('Margin of error must be a positive percentage less than 100.');
  }
  if (!Number.isFinite(populationProportion) || populationProportion <= 0 || populationProportion >= 100) {
    throw new RangeError('Population proportion must be between 0 and 100 percent.');
  }

  const z = Z_CRITICAL[confidenceLevel];
  if (!z) {
    throw new RangeError('Select a valid confidence level (90, 95, 98, or 99).');
  }

  // Both inputs are percentages; convert to proportions before applying Cochran's formula.
  const e = marginOfError / 100;
  const p = populationProportion / 100;

  // Cochran's formula: n0 = (z^2 * p * (1 - p)) / e^2
  const unadjusted = (z * z * p * (1 - p)) / (e * e);
  let required = Math.ceil(unadjusted);
  let isFiniteAdjusted = false;

  if (populationSize !== undefined && populationSize !== null && populationSize > 0) {
    if (!Number.isFinite(populationSize) || populationSize < 1) {
      throw new RangeError('Population size must be a positive integer.');
    }
    // Finite Population Correction: n = n0 / (1 + (n0 - 1) / N)
    const adjusted = unadjusted / (1 + (unadjusted - 1) / populationSize);
    required = Math.ceil(adjusted);
    isFiniteAdjusted = true;
  }

  return {
    requiredSampleSize: required,
    unadjustedSampleSize: Math.ceil(unadjusted),
    isFiniteAdjusted,
    marginOfErrorDecimal: e,
    zScore: z,
  };
}

// ==========================================
// Date helpers — date-only, UTC-safe
// ==========================================
// Calendar dates are stored as UTC midnight and manipulated in whole days. Building them from
// local time (setDate / getDate) shifts the result by a day for users west of UTC and can move
// a date across a DST boundary. Keep every operation in UTC.

const MS_PER_DAY = 86_400_000;

export function parseIsoDate(value: string): Date | null {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return date;
}

export function formatIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function todayIsoDate(): string {
  const now = new Date();
  return formatIsoDate(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())));
}

export function addDaysToIsoDate(value: string, days: number): string {
  const date = parseIsoDate(value);
  if (!date) throw new RangeError('Enter a valid date (YYYY-MM-DD).');
  return formatIsoDate(new Date(date.getTime() + days * MS_PER_DAY));
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY);
}

// ==========================================
// 4. Ovulation & Fertile Window Calculator
// ==========================================

export interface OvulationInput {
  lastPeriodDate: string; // YYYY-MM-DD
  cycleLengthDays?: number; // 20 to 45 days, default 28
  lutealPhaseDays?: number; // 9 to 18 days, default 14
  cyclesAhead?: number; // number of future cycles to project, default 3
}

export interface PredictedCycle {
  periodStart: string;
  ovulationDate: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
}

export interface OvulationResult {
  ovulationDate: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
  peakFertilityStart: string;
  peakFertilityEnd: string;
  nextPeriodDate: string;
  cycleLength: number;
  ovulationCycleDay: number;
  forecast: PredictedCycle[];
}

export function calculateOvulation({
  lastPeriodDate,
  cycleLengthDays = 28,
  lutealPhaseDays = 14,
  cyclesAhead = 3,
}: OvulationInput): OvulationResult {
  const lmp = parseIsoDate(lastPeriodDate);
  if (!lmp) {
    throw new RangeError('Enter a valid date for the first day of your last period.');
  }
  if (!Number.isFinite(cycleLengthDays) || cycleLengthDays < 20 || cycleLengthDays > 45) {
    throw new RangeError('Average menstrual cycle length is typically between 20 and 45 days.');
  }
  if (!Number.isFinite(lutealPhaseDays) || lutealPhaseDays < 9 || lutealPhaseDays > 18) {
    throw new RangeError('Luteal phase duration is typically between 9 and 18 days (default 14).');
  }

  // Ovulation typically occurs (cycle length - luteal phase) days after the first day of the period.
  const ovulationCycleDay = cycleLengthDays - lutealPhaseDays;
  if (ovulationCycleDay < 1) {
    throw new RangeError('Luteal phase duration cannot exceed cycle length.');
  }

  const ovulationDate = addDays(lmp, ovulationCycleDay);

  // Sperm survive up to about 5 days in the reproductive tract; the egg is viable for 12-24 hours.
  const fertileStart = addDays(ovulationDate, -5);
  const fertileEnd = addDays(ovulationDate, 1);

  // Peak fertility: the day before ovulation and ovulation day itself.
  const peakStart = addDays(ovulationDate, -1);

  const nextPeriod = addDays(lmp, cycleLengthDays);

  const projectionCount = Number.isFinite(cyclesAhead)
    ? Math.min(12, Math.max(0, Math.trunc(cyclesAhead)))
    : 0;
  const forecast: PredictedCycle[] = [];
  for (let cycle = 1; cycle <= projectionCount; cycle += 1) {
    const periodStart = addDays(lmp, cycle * cycleLengthDays);
    const ovulation = addDays(periodStart, ovulationCycleDay);
    forecast.push({
      periodStart: formatIsoDate(periodStart),
      ovulationDate: formatIsoDate(ovulation),
      fertileWindowStart: formatIsoDate(addDays(ovulation, -5)),
      fertileWindowEnd: formatIsoDate(addDays(ovulation, 1)),
    });
  }

  return {
    ovulationDate: formatIsoDate(ovulationDate),
    fertileWindowStart: formatIsoDate(fertileStart),
    fertileWindowEnd: formatIsoDate(fertileEnd),
    peakFertilityStart: formatIsoDate(peakStart),
    peakFertilityEnd: formatIsoDate(ovulationDate),
    nextPeriodDate: formatIsoDate(nextPeriod),
    cycleLength: cycleLengthDays,
    ovulationCycleDay: ovulationCycleDay + 1, // 1-indexed day of the cycle
    forecast,
  };
}

// ==========================================
// 5. Pregnancy Due Date Calculator
// ==========================================

export type DueDateMethod = 'lmp' | 'conception';

export interface DueDateInput {
  method: DueDateMethod;
  inputDate: string; // YYYY-MM-DD
  cycleLengthDays?: number; // default 28
  asOfDate?: string; // default today
}

export interface DueDateResult {
  estimatedDueDate: string;
  conceptionDate: string;
  gestationalWeeks: number;
  gestationalDays: number;
  totalGestationalDays: number;
  currentTrimester: 1 | 2 | 3;
  daysRemaining: number;
  progressPercent: number;
}

export function calculateDueDate({
  method,
  inputDate,
  cycleLengthDays = 28,
  asOfDate,
}: DueDateInput): DueDateResult {
  const baseDate = parseIsoDate(inputDate);
  if (!baseDate) {
    throw new RangeError('Enter a valid date.');
  }
  if (!Number.isFinite(cycleLengthDays) || cycleLengthDays < 20 || cycleLengthDays > 45) {
    throw new RangeError('Cycle length must be between 20 and 45 days.');
  }

  let lmpDate: Date;
  let conceptionDate: Date;
  let eddDate: Date;

  if (method === 'lmp') {
    lmpDate = baseDate;
    // Naegele's rule: LMP + 280 days, adjusted for cycles that are not 28 days long.
    const cycleAdjustment = cycleLengthDays - 28;
    eddDate = addDays(lmpDate, 280 + cycleAdjustment);
    conceptionDate = addDays(lmpDate, cycleLengthDays - 14);
  } else {
    conceptionDate = baseDate;
    // Conception to estimated due date is 266 days (38 weeks).
    eddDate = addDays(conceptionDate, 266);
    lmpDate = addDays(conceptionDate, -14);
  }

  const today = asOfDate ? parseIsoDate(asOfDate) : parseIsoDate(todayIsoDate());
  if (!today) {
    throw new RangeError('"As of" date must be a valid date (YYYY-MM-DD).');
  }

  const totalDays = Math.max(0, daysBetween(lmpDate, today));
  const gestationalWeeks = Math.floor(totalDays / 7);
  const gestationalDays = totalDays % 7;

  const daysRemaining = Math.max(0, daysBetween(today, eddDate));
  const progressPercent = Math.min(100, Math.max(0, Math.round((totalDays / 280) * 100)));

  let currentTrimester: 1 | 2 | 3 = 1;
  if (gestationalWeeks >= 28) {
    currentTrimester = 3;
  } else if (gestationalWeeks >= 13) {
    currentTrimester = 2;
  }

  return {
    estimatedDueDate: formatIsoDate(eddDate),
    conceptionDate: formatIsoDate(conceptionDate),
    gestationalWeeks,
    gestationalDays,
    totalGestationalDays: totalDays,
    currentTrimester,
    daysRemaining,
    progressPercent,
  };
}

// ==========================================
// 6. Conception Date Calculator
// ==========================================

export type ConceptionMethod = 'due-date' | 'lmp';

export interface ConceptionInput {
  method: ConceptionMethod;
  inputDate: string; // due date or first day of last period, YYYY-MM-DD
  cycleLengthDays?: number; // default 28, only used with method 'lmp'
}

export interface ConceptionResult {
  conceptionDate: string;
  intercourseWindowStart: string;
  intercourseWindowEnd: string;
  dueDate: string;
  lastPeriodDate: string;
}

export function calculateConceptionDate({
  method,
  inputDate,
  cycleLengthDays = 28,
}: ConceptionInput): ConceptionResult {
  const baseDate = parseIsoDate(inputDate);
  if (!baseDate) {
    throw new RangeError('Enter a valid date.');
  }
  if (method === 'lmp' && (!Number.isFinite(cycleLengthDays) || cycleLengthDays < 20 || cycleLengthDays > 45)) {
    throw new RangeError('Cycle length must be between 20 and 45 days.');
  }

  let conceptionDate: Date;
  let dueDate: Date;
  let lastPeriodDate: Date;

  if (method === 'due-date') {
    dueDate = baseDate;
    conceptionDate = addDays(dueDate, -266);
    lastPeriodDate = addDays(dueDate, -280);
  } else {
    lastPeriodDate = baseDate;
    conceptionDate = addDays(lastPeriodDate, cycleLengthDays - 14);
    dueDate = addDays(lastPeriodDate, 280 + (cycleLengthDays - 28));
  }

  return {
    conceptionDate: formatIsoDate(conceptionDate),
    // Intercourse in the five days before ovulation can still lead to conception because sperm
    // remain viable; the egg itself is fertilisable for roughly 12-24 hours after ovulation.
    intercourseWindowStart: formatIsoDate(addDays(conceptionDate, -5)),
    intercourseWindowEnd: formatIsoDate(addDays(conceptionDate, 1)),
    dueDate: formatIsoDate(dueDate),
    lastPeriodDate: formatIsoDate(lastPeriodDate),
  };
}

// ==========================================
// 7. Pregnancy Week Calculator
// ==========================================

export interface PregnancyWeekResult {
  weekNumber: number;
  daysIntoWeek: number;
  fetalAgeWeeks: number;
  fetalAgeDays: number;
  trimester: 1 | 2 | 3;
  trimesterLabel: string;
  estimatedDueDate: string;
  conceptionDate: string;
  daysRemaining: number;
  weeksRemaining: number;
  progressPercent: number;
  /** Standard antenatal touchpoints expressed in completed weeks, not appointments. */
  nextMilestone: { week: number; label: string } | null;
}

const ANTENATAL_MILESTONES: Array<{ week: number; label: string }> = [
  { week: 12, label: 'Dating scan window (11–14 weeks)' },
  { week: 20, label: 'Anomaly scan window (18–22 weeks)' },
  { week: 28, label: 'Third trimester begins' },
  { week: 37, label: 'Early term begins' },
  { week: 40, label: 'Estimated due date' },
  { week: 42, label: 'Post-term review' },
];

/**
 * Pregnancy progress in the obstetric convention: gestational age is counted from the first day
 * of the last period, so the "fetal age" is roughly two weeks less.
 */
export function calculatePregnancyWeek({
  method,
  inputDate,
  cycleLengthDays = 28,
  asOfDate,
}: DueDateInput): PregnancyWeekResult {
  const due = calculateDueDate({ method, inputDate, cycleLengthDays, asOfDate });
  const weekNumber = due.gestationalWeeks;
  const daysIntoWeek = due.gestationalDays;
  const totalFetalDays = Math.max(0, due.totalGestationalDays - 14);
  const weeksRemaining = Math.ceil(due.daysRemaining / 7);

  const trimester: 1 | 2 | 3 = due.currentTrimester;
  const trimesterLabel =
    trimester === 1 ? 'First trimester (weeks 1–12)' : trimester === 2 ? 'Second trimester (weeks 13–27)' : 'Third trimester (weeks 28–40)';

  const nextMilestone =
    ANTENATAL_MILESTONES.find((milestone) => milestone.week > weekNumber) ?? null;

  return {
    weekNumber,
    daysIntoWeek,
    fetalAgeWeeks: Math.floor(totalFetalDays / 7),
    fetalAgeDays: totalFetalDays % 7,
    trimester,
    trimesterLabel,
    estimatedDueDate: due.estimatedDueDate,
    conceptionDate: due.conceptionDate,
    daysRemaining: due.daysRemaining,
    weeksRemaining,
    progressPercent: due.progressPercent,
    nextMilestone,
  };
}

