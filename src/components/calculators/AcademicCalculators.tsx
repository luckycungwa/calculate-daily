import React, { useMemo, useState } from 'react';
import { Copy, GraduationCap, RotateCcw } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  calculateApsScore,
  calculateConfidenceIntervalMean,
  calculateSampleSize,
  type ApsResult,
  type ConfidenceLevel,
  type ConfidenceIntervalResult,
  type LifeOrientationRule,
  type SampleSizeResult,
} from '../../lib/academicAndHealthCalculations';
import { useToast } from '../ui/toast';

type CalculatorProps = { onSaveHistory?: (summary: string) => void };

const SELECT_CLASS =
  'h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50';

function formatNumber(value: number, maximumFractionDigits = 3): string {
  return new Intl.NumberFormat('en', { maximumFractionDigits, minimumFractionDigits: 0 }).format(value);
}

function toNumber(value: string): number {
  if (value.trim() === '') return Number.NaN;
  return Number(value);
}

function NumberField({
  id,
  label,
  value,
  onChange,
  step = 'any',
  min,
  suffix,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  step?: string;
  min?: number;
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
          inputMode="decimal"
          step={step}
          min={min}
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

function SelectField<T extends string | number>({
  id,
  label,
  value,
  onChange,
  options,
  hint,
}: {
  id: string;
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string }>;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={String(value)}
        onChange={(event) => {
          const next = options.find((option) => String(option.value) === event.target.value);
          if (next) onChange(next.value);
        }}
        className={SELECT_CLASS}
      >
        {options.map((option) => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && <p className="text-[11px] text-zinc-500">{hint}</p>}
    </div>
  );
}

function ResultPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">
      {children}
    </div>
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

// ==========================================
// APS Score
// ==========================================

interface SubjectRow {
  name: string;
  percentage: string;
}

const DEFAULT_SUBJECTS: SubjectRow[] = [
  { name: 'Home Language', percentage: '75' },
  { name: 'First Additional Language', percentage: '68' },
  { name: 'Mathematics', percentage: '72' },
  { name: 'Life Sciences', percentage: '66' },
  { name: 'Physical Sciences', percentage: '61' },
  { name: 'Accounting', percentage: '70' },
];

const LO_RULES: Array<{ value: LifeOrientationRule; label: string }> = [
  { value: 'exclude', label: 'Excluded (most common)' },
  { value: 'half', label: 'Count half points' },
  { value: 'full', label: 'Count full points' },
];

export const ApsCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copySummary = useCopySummary(onSaveHistory);
  const [subjects, setSubjects] = useState<SubjectRow[]>(DEFAULT_SUBJECTS);
  const [loPercentage, setLoPercentage] = useState('78');
  const [loRule, setLoRule] = useState<LifeOrientationRule>('exclude');

  const result = useMemo(() => {
    try {
      const rows = [...subjects.map((subject) => ({ name: subject.name, percentage: toNumber(subject.percentage) }))];
      rows.push({ name: 'Life Orientation', percentage: toNumber(loPercentage), isLifeOrientation: true });
      return { value: calculateApsScore(rows, loRule), error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter a percentage for every subject.',
      };
    }
  }, [subjects, loPercentage, loRule]);

  const updateSubject = (index: number, patch: Partial<SubjectRow>) => {
    setSubjects((current) => current.map((subject, i) => (i === index ? { ...subject, ...patch } : subject)));
  };

  const reset = () => {
    setSubjects(DEFAULT_SUBJECTS);
    setLoPercentage('78');
    setLoRule('exclude');
  };

  const value: ApsResult | null = result.value;
  const maxPoints = 42 + (loRule === 'exclude' ? 0 : loRule === 'half' ? 4 : 7);

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 text-[11px] font-mono">Admissions</Badge>
          <CardTitle>APS Score Calculator</CardTitle>
          <CardDescription>
            Convert National Senior Certificate percentages into admission points and check the statutory pass level.
          </CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={reset}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {subjects.map((subject, index) => (
              <div key={index} className="space-y-2 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                <div className="space-y-1.5">
                  <Label htmlFor={`aps-subject-${index}-name`}>Subject {index + 1}</Label>
                  <Input
                    id={`aps-subject-${index}-name`}
                    value={subject.name}
                    onChange={(event) => updateSubject(index, { name: event.target.value })}
                  />
                </div>
                <NumberField
                  id={`aps-subject-${index}-percentage`}
                  label="Final mark"
                  value={subject.percentage}
                  onChange={(percentage) => updateSubject(index, { percentage })}
                  min={0}
                  suffix="%"
                />
              </div>
            ))}
          </div>

          <div className="grid gap-3 rounded-lg border border-dashed border-emerald-300 p-3 dark:border-emerald-800 sm:grid-cols-2">
            <NumberField
              id="aps-lo-percentage"
              label="Life Orientation mark"
              value={loPercentage}
              onChange={setLoPercentage}
              min={0}
              suffix="%"
            />
            <SelectField
              id="aps-lo-rule"
              label="Life Orientation weighting"
              value={loRule}
              onChange={setLoRule}
              options={LO_RULES}
              hint="Universities differ: many exclude Life Orientation, some count half."
            />
          </div>
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <GraduationCap className="h-3.5 w-3.5" /> APS total
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {formatNumber(value.totalAps, 0)}
                <span className="ml-1 text-sm font-normal text-zinc-400">/ {maxPoints}</span>
              </p>
              <p className="mt-3 text-sm font-semibold text-white">{value.qualificationPass}</p>
              <p className="mt-1 text-xs text-zinc-300">{value.passSummary}</p>

              <div className="mt-4 space-y-1 border-t border-zinc-800 pt-3">
                {value.subjectPoints.map((subject, index) => (
                  <div key={index} className="flex items-baseline justify-between gap-3 text-xs">
                    <span className={subject.isLifeOrientation ? 'text-zinc-500' : 'text-zinc-300'}>
                      {subject.name || `Subject ${index + 1}`}
                      <span className="ml-1 text-[10px] text-zinc-500">({formatNumber(subject.percentage, 1)}%)</span>
                    </span>
                    <span className="font-mono text-zinc-200">
                      {subject.points} pt{subject.points === 1 ? '' : 's'}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-zinc-500">
                Points use the NSC 7-point scale. Institution and faculty APS rules differ — always confirm the
                prospectus for your programme.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copySummary(
                    `APS score: ${value.totalAps} points (${value.qualificationPass}). ` +
                      value.subjectPoints
                        .map((subject) => `${subject.name}: ${subject.percentage}% = ${subject.points}`)
                        .join(', ')
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy breakdown
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Confidence Interval
// ==========================================

const CONFIDENCE_OPTIONS: Array<{ value: ConfidenceLevel; label: string }> = [
  { value: 90, label: '90%' },
  { value: 95, label: '95% (standard)' },
  { value: 98, label: '98%' },
  { value: 99, label: '99%' },
];

export const ConfidenceIntervalCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copySummary = useCopySummary(onSaveHistory);
  const [mean, setMean] = useState('100');
  const [standardDeviation, setStandardDeviation] = useState('15');
  const [sampleSize, setSampleSize] = useState('36');
  const [confidenceLevel, setConfidenceLevel] = useState<ConfidenceLevel>(95);

  const result = useMemo(() => {
    try {
      const value = calculateConfidenceIntervalMean({
        sampleMean: toNumber(mean),
        standardDeviation: toNumber(standardDeviation),
        sampleSize: toNumber(sampleSize),
        confidenceLevel,
      });
      return { value, error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Unable to calculate this interval.',
      };
    }
  }, [mean, standardDeviation, sampleSize, confidenceLevel]);

  const value: ConfidenceIntervalResult | null = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Statistics</Badge>
        <CardTitle>Confidence Interval Calculator</CardTitle>
        <CardDescription>
          Estimate the range that is likely to contain the true population mean, with margin of error and standard error.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <NumberField id="ci-mean" label="Sample mean (x̄)" value={mean} onChange={setMean} />
          <NumberField id="ci-sd" label="Standard deviation (s)" value={standardDeviation} onChange={setStandardDeviation} min={0} />
          <NumberField id="ci-n" label="Sample size (n)" value={sampleSize} onChange={setSampleSize} min={2} step="1" />
          <SelectField
            id="ci-level"
            label="Confidence level"
            value={confidenceLevel}
            onChange={setConfidenceLevel}
            options={CONFIDENCE_OPTIONS}
          />
        </div>
        <ResultPanel>
          <p className="text-xs font-mono uppercase tracking-wide text-zinc-400">
            {confidenceLevel}% confidence interval
          </p>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 break-all font-mono text-2xl font-bold tabular-nums text-emerald-400">
                {formatNumber(value.lowerBound, 3)} – {formatNumber(value.upperBound, 3)}
              </p>
              <dl className="mt-4 space-y-2 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Margin of error</dt>
                  <dd className="font-mono text-zinc-100">± {formatNumber(value.marginOfError, 3)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Standard error</dt>
                  <dd className="font-mono text-zinc-100">{formatNumber(value.standardError, 4)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Critical value (z)</dt>
                  <dd className="font-mono text-zinc-100">{formatNumber(value.criticalValue, 4)}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-zinc-300">
                With repeated sampling, about {confidenceLevel}% of intervals built this way would contain the true
                mean — not a {confidenceLevel}% probability that this specific interval does.
              </p>
              <p className="mt-3 text-[11px] text-zinc-500">
                Uses the normal (z) approximation. For small samples with an unknown population standard deviation,
                a t-distribution gives wider, more conservative intervals.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copySummary(
                    `${confidenceLevel}% CI for a mean of ${mean} (s = ${standardDeviation}, n = ${sampleSize}): ` +
                      `${formatNumber(value.lowerBound, 2)} to ${formatNumber(value.upperBound, 2)} (±${formatNumber(value.marginOfError, 2)}).`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy result
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Sample Size
// ==========================================

export const SampleSizeCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copySummary = useCopySummary(onSaveHistory);
  const [confidenceLevel, setConfidenceLevel] = useState<ConfidenceLevel>(95);
  const [marginOfError, setMarginOfError] = useState('5');
  const [proportion, setProportion] = useState('50');
  const [populationSize, setPopulationSize] = useState('');

  const result = useMemo(() => {
    try {
      const population = populationSize.trim() === '' ? undefined : toNumber(populationSize);
      const value = calculateSampleSize({
        confidenceLevel,
        marginOfError: toNumber(marginOfError),
        populationProportion: toNumber(proportion),
        populationSize: population,
      });
      return { value, error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Unable to calculate this sample size.',
      };
    }
  }, [confidenceLevel, marginOfError, proportion, populationSize]);

  const value: SampleSizeResult | null = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Research methods</Badge>
        <CardTitle>Sample Size Calculator</CardTitle>
        <CardDescription>
          Find the number of responses needed for a survey or study at a chosen confidence level and margin of error.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <SelectField
            id="ss-level"
            label="Confidence level"
            value={confidenceLevel}
            onChange={setConfidenceLevel}
            options={CONFIDENCE_OPTIONS}
          />
          <NumberField
            id="ss-moe"
            label="Margin of error"
            value={marginOfError}
            onChange={setMarginOfError}
            min={0.1}
            suffix="%"
            hint="How close the estimate must be to the true value."
          />
          <NumberField
            id="ss-proportion"
            label="Expected proportion"
            value={proportion}
            onChange={setProportion}
            min={1}
            suffix="%"
            hint="Use 50% when you have no prior estimate — it needs the largest sample."
          />
          <NumberField
            id="ss-population"
            label="Population size (optional)"
            value={populationSize}
            onChange={setPopulationSize}
            min={1}
            step="1"
            hint="Leave blank for an unlimited population; enter it to apply the finite population correction."
          />
        </div>
        <ResultPanel>
          <p className="text-xs font-mono uppercase tracking-wide text-zinc-400">Required sample</p>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {formatNumber(value.requiredSampleSize, 0)}
              </p>
              <p className="mt-1 text-xs text-zinc-400">completed responses</p>

              <dl className="mt-4 space-y-2 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Cochran estimate (n₀)</dt>
                  <dd className="font-mono text-zinc-100">{formatNumber(value.unadjustedSampleSize, 0)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Finite population correction</dt>
                  <dd className="font-mono text-zinc-100">{value.isFiniteAdjusted ? 'Applied' : 'Not applied'}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Critical value (z)</dt>
                  <dd className="font-mono text-zinc-100">{formatNumber(value.zScore, 4)}</dd>
                </div>
              </dl>

              <p className="mt-3 text-xs text-zinc-300">
                Expected precision: ±{formatNumber(toNumber(marginOfError), 2)} percentage points at{' '}
                {confidenceLevel}% confidence.
              </p>
              <p className="mt-3 text-[11px] text-zinc-500">
                This is the number of completed responses. If your response rate is lower than 100%, invite more
                people than this figure.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copySummary(
                    `Sample size: ${value.requiredSampleSize} responses needed for ±${marginOfError}% at ${confidenceLevel}% confidence` +
                      (value.isFiniteAdjusted ? ` (population ${populationSize}).` : ' (unlimited population).')
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy result
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};
