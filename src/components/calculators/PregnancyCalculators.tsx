import React, { useMemo, useState } from 'react';
import { Baby, CalendarDays, Copy, HeartPulse, RotateCcw } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  addDaysToIsoDate,
  calculateConceptionDate,
  calculateDueDate,
  calculateOvulation,
  calculatePregnancyWeek,
  parseIsoDate,
  todayIsoDate,
  type ConceptionMethod,
  type ConceptionResult,
  type DueDateMethod,
  type DueDateResult,
  type OvulationResult,
  type PregnancyWeekResult,
} from '../../lib/academicAndHealthCalculations';
import { useToast } from '../ui/toast';

type CalculatorProps = { onSaveHistory?: (summary: string) => void };

const SELECT_CLASS =
  'h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-tint dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50';

function formatLongDate(iso: string): string {
  const date = parseIsoDate(iso);
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function gestationalLabel(weeks: number, days: number): string {
  return `${weeks} week${weeks === 1 ? '' : 's'} ${days} day${days === 1 ? '' : 's'}`;
}

function DateField({
  id,
  label,
  value,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type="date" value={value} onChange={(event) => onChange(event.target.value)} />
      {hint && <p className="text-[11px] text-zinc-500">{hint}</p>}
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  suffix,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  suffix?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          inputMode="numeric"
          step="1"
          min={min}
          max={max}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={suffix ? 'pr-12' : undefined}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[11px] font-mono text-zinc-400">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-[11px] text-zinc-500">{hint}</p>}
    </div>
  );
}

function ResultPanel({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">{children}</div>;
}

function MedicalNote() {
  return (
    <p className="text-[11px] leading-relaxed text-zinc-500">
      This is an estimate based on calendar dates, not a medical diagnosis or a dating scan. Only about 4% of babies
      arrive on their estimated due date. Speak to your midwife, GP, or obstetrician about dating and any symptoms
      that worry you.
    </p>
  );
}

function useCopySummary(onSaveHistory?: (summary: string) => void) {
  const { toast } = useToast();
  return async (summary: string) => {
    try {
      await navigator.clipboard.writeText(summary);
      toast('Result copied to clipboard');
    } catch {
      toast('Clipboard unavailable — select and copy the result manually.', 'warning');
    }
    onSaveHistory?.(summary);
  };
}

function toNumber(value: string): number {
  if (value.trim() === '') return Number.NaN;
  return Number(value);
}

// ==========================================
// Pregnancy Due Date
// ==========================================

const DUE_DATE_METHODS: Array<{ value: DueDateMethod; label: string }> = [
  { value: 'lmp', label: 'Last period (LMP)' },
  { value: 'conception', label: 'Known conception date' },
];

export const DueDateCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copySummary = useCopySummary(onSaveHistory);
  const [method, setMethod] = useState<DueDateMethod>('lmp');
  const [inputDate, setInputDate] = useState(() => addDaysToIsoDate(todayIsoDate(), -60));
  const [cycleLength, setCycleLength] = useState('28');
  const [asOfDate, setAsOfDate] = useState(() => todayIsoDate());

  const result = useMemo(() => {
    try {
      const value = calculateDueDate({
        method,
        inputDate,
        cycleLengthDays: toNumber(cycleLength),
        asOfDate,
      });
      return { value, error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter valid dates to calculate a due date.',
      };
    }
  }, [method, inputDate, cycleLength, asOfDate]);

  const value: DueDateResult | null = result.value;

  const reset = () => {
    setMethod('lmp');
    setInputDate(addDaysToIsoDate(todayIsoDate(), -60));
    setCycleLength('28');
    setAsOfDate(todayIsoDate());
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 text-[11px] font-mono">Pregnancy</Badge>
          <CardTitle>Pregnancy Due Date Calculator</CardTitle>
          <CardDescription>
            Estimate your due date with Naegele&apos;s rule and see gestational age, trimester, and days remaining.
          </CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={reset}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="due-method">Calculate from</Label>
            <select
              id="due-method"
              value={method}
              onChange={(event) => setMethod(event.target.value as DueDateMethod)}
              className={SELECT_CLASS}
            >
              {DUE_DATE_METHODS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <DateField
            id="due-input-date"
            label={method === 'lmp' ? 'First day of last period' : 'Conception date'}
            value={inputDate}
            onChange={setInputDate}
            hint={
              method === 'lmp'
                ? 'Day 1 is the first day of full bleeding, not the last day.'
                : 'A known ovulation or insemination date gives the most accurate estimate.'
            }
          />

          {method === 'lmp' && (
            <NumberField
              id="due-cycle-length"
              label="Average cycle length"
              value={cycleLength}
              onChange={setCycleLength}
              min={20}
              max={45}
              suffix="days"
              hint="Cycles longer than 28 days push ovulation — and the due date — later."
            />
          )}

          <DateField
            id="due-as-of"
            label="Calculate as of"
            value={asOfDate}
            onChange={setAsOfDate}
            hint="Set a future date to see how far along you will be then."
          />
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <Baby className="h-3.5 w-3.5" /> Estimated due date
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 text-xl font-bold text-primary-on-dark">{formatLongDate(value.estimatedDueDate)}</p>
              <p className="mt-1 font-mono text-xs text-zinc-400">{value.estimatedDueDate}</p>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-800 pt-3 text-xs">
                <div>
                  <p className="text-zinc-400">Gestational age</p>
                  <p className="mt-0.5 font-mono text-sm text-zinc-100">
                    {gestationalLabel(value.gestationalWeeks, value.gestationalDays)}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-400">Trimester</p>
                  <p className="mt-0.5 font-mono text-sm text-zinc-100">{value.currentTrimester}</p>
                </div>
                <div>
                  <p className="text-zinc-400">Days remaining</p>
                  <p className="mt-0.5 font-mono text-sm text-zinc-100">{value.daysRemaining}</p>
                </div>
                <div>
                  <p className="text-zinc-400">Estimated conception</p>
                  <p className="mt-0.5 font-mono text-sm text-zinc-100">{value.conceptionDate}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>40-week timeline</span>
                  <span>{value.progressPercent}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-primary-tint transition-all"
                    style={{ width: `${value.progressPercent}%` }}
                  />
                </div>
              </div>

              <p className="mt-3 text-xs text-zinc-300">
                That is {value.totalGestationalDays} days since the first day of your last period
                {value.currentTrimester === 2 ? ', in the second trimester' : value.currentTrimester === 3 ? ', in the third trimester' : ''}.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copySummary(
                    `Estimated due date: ${formatLongDate(value.estimatedDueDate)} (${value.estimatedDueDate}). ` +
                      `Gestational age on ${asOfDate}: ${gestationalLabel(value.gestationalWeeks, value.gestationalDays)}. ` +
                      `Estimated conception: ${value.conceptionDate}.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy result
              </Button>
              <div className="mt-3 border-t border-zinc-800 pt-3">
                <MedicalNote />
              </div>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Ovulation & Fertile Window
// ==========================================

export const OvulationCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copySummary = useCopySummary(onSaveHistory);
  const [lastPeriod, setLastPeriod] = useState(() => addDaysToIsoDate(todayIsoDate(), -14));
  const [cycleLength, setCycleLength] = useState('28');
  const [lutealPhase, setLutealPhase] = useState('14');

  const result = useMemo(() => {
    try {
      const value = calculateOvulation({
        lastPeriodDate: lastPeriod,
        cycleLengthDays: toNumber(cycleLength),
        lutealPhaseDays: toNumber(lutealPhase),
        cyclesAhead: 3,
      });
      return { value, error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter a valid date and cycle length.',
      };
    }
  }, [lastPeriod, cycleLength, lutealPhase]);

  const value: OvulationResult | null = result.value;

  const reset = () => {
    setLastPeriod(addDaysToIsoDate(todayIsoDate(), -14));
    setCycleLength('28');
    setLutealPhase('14');
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 text-[11px] font-mono">Fertility</Badge>
          <CardTitle>Ovulation Calculator</CardTitle>
          <CardDescription>
            Predict your ovulation date, six-day fertile window, and the next three cycles from your last period.
          </CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={reset}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <DateField
            id="ov-lmp"
            label="First day of last period"
            value={lastPeriod}
            onChange={setLastPeriod}
            hint="The first day of full bleeding counts as cycle day 1."
          />
          <NumberField
            id="ov-cycle"
            label="Average cycle length"
            value={cycleLength}
            onChange={setCycleLength}
            min={20}
            max={45}
            suffix="days"
            hint="Count from the first day of one period to the day before the next."
          />
          <NumberField
            id="ov-luteal"
            label="Luteal phase length"
            value={lutealPhase}
            onChange={setLutealPhase}
            min={9}
            max={18}
            suffix="days"
            hint="Usually 12–16 days. Leave at 14 if you are unsure."
          />
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <HeartPulse className="h-3.5 w-3.5" /> Most fertile
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 text-lg font-bold text-primary-on-dark">{formatLongDate(value.ovulationDate)}</p>
              <p className="mt-1 text-xs text-zinc-400">Predicted ovulation — cycle day {value.ovulationCycleDay}</p>

              <dl className="mt-4 space-y-2 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Fertile window</dt>
                  <dd className="text-right font-mono text-zinc-100">
                    {value.fertileWindowStart} → {value.fertileWindowEnd}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Peak fertility</dt>
                  <dd className="text-right font-mono text-zinc-100">
                    {value.peakFertilityStart} → {value.peakFertilityEnd}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Next period due</dt>
                  <dd className="text-right font-mono text-zinc-100">{value.nextPeriodDate}</dd>
                </div>
              </dl>

              <p className="mt-3 text-xs text-zinc-300">
                Sperm can survive up to five days, so the fertile window opens before ovulation. The egg is viable for
                roughly 12–24 hours after release.
              </p>

              {value.forecast.length > 0 && (
                <div className="mt-4 border-t border-zinc-800 pt-3">
                  <p className="mb-2 text-[11px] font-mono uppercase tracking-wide text-zinc-400">Next three cycles</p>
                  <div className="space-y-1.5 text-[11px]">
                    {value.forecast.map((cycle) => (
                      <div key={cycle.periodStart} className="flex justify-between gap-3">
                        <span className="text-zinc-400">{cycle.periodStart}</span>
                        <span className="font-mono text-zinc-200">ovulation {cycle.ovulationDate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copySummary(
                    `Ovulation estimate: ${formatLongDate(value.ovulationDate)}. Fertile window ${value.fertileWindowStart} to ${value.fertileWindowEnd}. ` +
                      `Next period due ${value.nextPeriodDate}.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy dates
              </Button>
              <div className="mt-3 border-t border-zinc-800 pt-3">
                <MedicalNote />
              </div>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Conception Date
// ==========================================

const CONCEPTION_METHODS: Array<{ value: ConceptionMethod; label: string }> = [
  { value: 'due-date', label: 'I know my due date' },
  { value: 'lmp', label: 'I know my last period' },
];

export const ConceptionCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copySummary = useCopySummary(onSaveHistory);
  const [method, setMethod] = useState<ConceptionMethod>('due-date');
  const [inputDate, setInputDate] = useState(() => addDaysToIsoDate(todayIsoDate(), 180));
  const [cycleLength, setCycleLength] = useState('28');

  const result = useMemo(() => {
    try {
      const value = calculateConceptionDate({
        method,
        inputDate,
        cycleLengthDays: toNumber(cycleLength),
      });
      return { value, error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter a valid date.',
      };
    }
  }, [method, inputDate, cycleLength]);

  const value: ConceptionResult | null = result.value;

  const reset = () => {
    setMethod('due-date');
    setInputDate(addDaysToIsoDate(todayIsoDate(), 180));
    setCycleLength('28');
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 text-[11px] font-mono">Pregnancy</Badge>
          <CardTitle>Conception Date Calculator</CardTitle>
          <CardDescription>
            Work backwards from a due date or last period to the most likely conception date and intercourse window.
          </CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={reset}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="conception-method">Calculate from</Label>
            <select
              id="conception-method"
              value={method}
              onChange={(event) => setMethod(event.target.value as ConceptionMethod)}
              className={SELECT_CLASS}
            >
              {CONCEPTION_METHODS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <DateField
            id="conception-input-date"
            label={method === 'due-date' ? 'Estimated due date' : 'First day of last period'}
            value={inputDate}
            onChange={setInputDate}
          />

          {method === 'lmp' && (
            <NumberField
              id="conception-cycle"
              label="Average cycle length"
              value={cycleLength}
              onChange={setCycleLength}
              min={20}
              max={45}
              suffix="days"
            />
          )}
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <CalendarDays className="h-3.5 w-3.5" /> Most likely conception
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 text-lg font-bold text-primary-on-dark">{formatLongDate(value.conceptionDate)}</p>
              <p className="mt-1 font-mono text-xs text-zinc-400">{value.conceptionDate}</p>

              <dl className="mt-4 space-y-2 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Likely intercourse window</dt>
                  <dd className="text-right font-mono text-zinc-100">
                    {value.intercourseWindowStart} → {value.intercourseWindowEnd}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Estimated last period</dt>
                  <dd className="font-mono text-zinc-100">{value.lastPeriodDate}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Estimated due date</dt>
                  <dd className="font-mono text-zinc-100">{value.dueDate}</dd>
                </div>
              </dl>

              <p className="mt-3 text-xs text-zinc-300">
                Conception is dated to fertilisation, about two weeks after the first day of the last period. The window
                covers the days intercourse could have led to it.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copySummary(
                    `Most likely conception date: ${formatLongDate(value.conceptionDate)} (${value.conceptionDate}). ` +
                      `Likely intercourse window ${value.intercourseWindowStart} to ${value.intercourseWindowEnd}. ` +
                      `Estimated due date ${value.dueDate}.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy result
              </Button>
              <div className="mt-3 border-t border-zinc-800 pt-3">
                <MedicalNote />
              </div>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Pregnancy Week
// ==========================================

const PREGNANCY_WEEK_METHODS: Array<{ value: DueDateMethod; label: string }> = [
  { value: 'lmp', label: 'Last period (LMP)' },
  { value: 'conception', label: 'Known conception date' },
];

export const PregnancyWeekCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copySummary = useCopySummary(onSaveHistory);
  const [method, setMethod] = useState<DueDateMethod>('lmp');
  const [inputDate, setInputDate] = useState(() => addDaysToIsoDate(todayIsoDate(), -98));
  const [cycleLength, setCycleLength] = useState('28');
  const [asOfDate, setAsOfDate] = useState(() => todayIsoDate());

  const result = useMemo(() => {
    try {
      const value = calculatePregnancyWeek({
        method,
        inputDate,
        cycleLengthDays: toNumber(cycleLength),
        asOfDate,
      });
      return { value, error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter valid dates to calculate your pregnancy week.',
      };
    }
  }, [method, inputDate, cycleLength, asOfDate]);

  const value: PregnancyWeekResult | null = result.value;

  const reset = () => {
    setMethod('lmp');
    setInputDate(addDaysToIsoDate(todayIsoDate(), -98));
    setCycleLength('28');
    setAsOfDate(todayIsoDate());
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 text-[11px] font-mono">Pregnancy</Badge>
          <CardTitle>Pregnancy Week Calculator</CardTitle>
          <CardDescription>
            See how many weeks and days pregnant you are, the trimester, fetal age, and what comes next.
          </CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={reset}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="week-method">Calculate from</Label>
            <select
              id="week-method"
              value={method}
              onChange={(event) => setMethod(event.target.value as DueDateMethod)}
              className={SELECT_CLASS}
            >
              {PREGNANCY_WEEK_METHODS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <DateField
            id="week-input-date"
            label={method === 'lmp' ? 'First day of last period' : 'Conception date'}
            value={inputDate}
            onChange={setInputDate}
            hint="Gestational age is counted from the first day of your last period."
          />

          {method === 'lmp' && (
            <NumberField
              id="week-cycle-length"
              label="Average cycle length"
              value={cycleLength}
              onChange={setCycleLength}
              min={20}
              max={45}
              suffix="days"
            />
          )}

          <DateField
            id="week-as-of"
            label="Calculate as of"
            value={asOfDate}
            onChange={setAsOfDate}
            hint="Change this to see a past or future week."
          />
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <CalendarDays className="h-3.5 w-3.5" /> You are in
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-primary-on-dark">
                Week {value.weekNumber}
                <span className="ml-2 text-base font-normal text-zinc-400">+{value.daysIntoWeek} days</span>
              </p>
              <p className="mt-1 text-xs text-zinc-300">{value.trimesterLabel}</p>

              <dl className="mt-4 space-y-2 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Fetal age</dt>
                  <dd className="font-mono text-zinc-100">
                    {value.fetalAgeWeeks}w {value.fetalAgeDays}d
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Estimated due date</dt>
                  <dd className="font-mono text-zinc-100">{value.estimatedDueDate}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Weeks to go</dt>
                  <dd className="font-mono text-zinc-100">{value.weeksRemaining}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Estimated conception</dt>
                  <dd className="font-mono text-zinc-100">{value.conceptionDate}</dd>
                </div>
              </dl>

              <div className="mt-4">
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>40-week timeline</span>
                  <span>{value.progressPercent}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-primary-tint transition-all"
                    style={{ width: `${value.progressPercent}%` }}
                  />
                </div>
              </div>

              {value.nextMilestone && (
                <p className="mt-3 text-xs text-zinc-300">
                  Next touchpoint: <span className="font-semibold">week {value.nextMilestone.week}</span> � {value.nextMilestone.label}.
                </p>
              )}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copySummary(
                    `Pregnancy week on ${asOfDate}: ${value.weekNumber} weeks ${value.daysIntoWeek} days ` +
                      `(${value.trimesterLabel}). Fetal age ${value.fetalAgeWeeks}w ${value.fetalAgeDays}d. ` +
                      `Estimated due date ${value.estimatedDueDate}, ${value.weeksRemaining} weeks to go.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
              </Button>
              <div className="mt-3 border-t border-zinc-800 pt-3">
                <MedicalNote />
              </div>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};
