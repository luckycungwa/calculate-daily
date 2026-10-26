import React, { useMemo, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  fractionToDecimal,
  normalCdf,
  normalPdf,
  normalQuantile,
  normalRangeProbability,
  parseNumberList,
  percentile,
  percentileRank,
  solveTriangle,
  summarizeDataset,
  type TriangleMode,
  type TriangleResult,
} from '../../lib/advancedMath';
import { useToast } from '../ui/toast';

type CalculatorProps = { onSaveHistory?: (summary: string) => void };

function format(value: number, digits = 4): string {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat('en', { maximumFractionDigits: digits }).format(value);
}

function ResultPanel({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">{children}</div>;
}

function NumberField({
  id,
  label,
  value,
  onChange,
  step = 'any',
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  step?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type="number" inputMode="decimal" step={step} value={value} onChange={(event) => onChange(event.target.value)} />
      {hint && <p className="text-[11px] text-zinc-500">{hint}</p>}
    </div>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  hint,
  rows = 3,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
      />
      {hint && <p className="text-[11px] text-zinc-500">{hint}</p>}
    </div>
  );
}

function toNumber(value: string): number {
  return value.trim() === '' ? Number.NaN : Number(value);
}

function useCopy(onSaveHistory?: (summary: string) => void) {
  const { toast } = useToast();
  return async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast('Result copied to clipboard');
    } catch {
      toast('Clipboard unavailable — select and copy manually.', 'warning');
    }
    onSaveHistory?.(text);
  };
}

// ==========================================
// Variance
// ==========================================

export const VarianceCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [data, setData] = useState('12, 15, 18, 22, 25, 31');

  const result = useMemo(() => {
    try {
      return { value: summarizeDataset(parseNumberList(data)), error: '' };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : 'Enter a list of numbers.' };
    }
  }, [data]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Statistics</Badge>
        <CardTitle>Variance Calculator</CardTitle>
        <CardDescription>Sample and population variance, standard deviation, mean, and range from a list of values.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <TextAreaField
            id="variance-data"
            label="Data set"
            value={data}
            onChange={setData}
            hint="Separate values with commas, spaces, or new lines."
          />
          <p className="text-[11px] text-zinc-500">
            Sample variance divides by n − 1 and is the usual choice for data drawn from a larger population. Population
            variance divides by n and describes the whole set.
          </p>
        </div>
        <ResultPanel>
          <p className="text-xs font-mono uppercase tracking-wide text-zinc-400">Sample variance (s²)</p>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-3xl font-bold tabular-nums text-emerald-400">{format(value.sampleVariance)}</p>
              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                {[
                  ['Sample standard deviation', format(value.sampleStandardDeviation)],
                  ['Population variance', format(value.populationVariance)],
                  ['Population standard deviation', format(value.populationStandardDeviation)],
                  ['Mean', format(value.mean)],
                  ['Count', format(value.count, 0)],
                  ['Range', format(value.range)],
                ].map(([label, shown]) => (
                  <div key={label} className="flex justify-between gap-3">
                    <dt className="text-zinc-400">{label}</dt>
                    <dd className="font-mono text-zinc-100">{shown}</dd>
                  </div>
                ))}
              </dl>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `Variance: sample ${format(value.sampleVariance)}, population ${format(value.populationVariance)} ` +
                      `(n = ${value.count}, mean = ${format(value.mean)}).`
                  )
                }
              >
                Copy result
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Percentile
// ==========================================

export const PercentileCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [data, setData] = useState('15, 20, 35, 40, 50, 62, 71, 80');
  const [rankValue, setRankValue] = useState('62');
  const [p, setP] = useState('90');

  const result = useMemo(() => {
    try {
      const values = parseNumberList(data);
      const valueAt = percentile(values, toNumber(p));
      const rank = percentileRank(values, toNumber(rankValue));
      const summary = summarizeDataset(values);
      return { value: { valueAt, rank, summary }, error: '' };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : 'Enter a list of numbers.' };
    }
  }, [data, p, rankValue]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Statistics</Badge>
        <CardTitle>Percentile Calculator</CardTitle>
        <CardDescription>Find the value at any percentile, or the percentile rank of a specific value.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <TextAreaField id="percentile-data" label="Data set" value={data} onChange={setData} rows={4} />
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField id="percentile-p" label="Percentile to find" value={p} onChange={setP} hint="e.g. 90 for P90" />
            <NumberField id="percentile-value" label="Value to rank" value={rankValue} onChange={setRankValue} />
          </div>
          <p className="text-[11px] text-zinc-500">
            Values are sorted and interpolated linearly between the two nearest observations, the same convention as
            Excel&apos;s PERCENTILE.INC.
          </p>
        </div>
        <ResultPanel>
          <p className="text-xs font-mono uppercase tracking-wide text-zinc-400">Result</p>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-3xl font-bold tabular-nums text-emerald-400">{format(value.valueAt)}</p>
              <p className="mt-1 text-xs text-zinc-400">is the P{format(toNumber(p), 1)} value</p>
              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Percentile rank of {format(toNumber(rankValue))}</dt>
                  <dd className="font-mono text-zinc-100">{format(value.rank, 1)}%</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Median (P50)</dt>
                  <dd className="font-mono text-zinc-100">{format(percentile(parseNumberList(data), 50))}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Count</dt>
                  <dd className="font-mono text-zinc-100">{value.summary.count}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Mean</dt>
                  <dd className="font-mono text-zinc-100">{format(value.summary.mean)}</dd>
                </div>
              </dl>
              <p className="mt-3 text-[11px] text-zinc-500">
                A percentile rank is the share of observations at or below the value, with ties split evenly.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `P${format(toNumber(p), 1)} = ${format(value.valueAt)}; ${format(toNumber(rankValue))} sits at the ` +
                      `${format(value.rank, 1)}th percentile of ${value.summary.count} values.`
                  )
                }
              >
                Copy result
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Normal distribution
// ==========================================

export const NormalDistributionCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [mean, setMean] = useState('100');
  const [sd, setSd] = useState('15');
  const [lower, setLower] = useState('85');
  const [upper, setUpper] = useState('115');

  const result = useMemo(() => {
    try {
      const mu = toNumber(mean);
      const sigma = toNumber(sd);
      const lo = toNumber(lower);
      const hi = toNumber(upper);
      const range = normalRangeProbability(lo, hi, mu, sigma);
      return {
        value: {
          range,
          cdfLower: normalCdf(lo, mu, sigma),
          cdfUpper: normalCdf(hi, mu, sigma),
          pdfLower: normalPdf(lo, mu, sigma),
          middle95: [normalQuantile(0.025, mu, sigma), normalQuantile(0.975, mu, sigma)] as [number, number],
          middle68: [normalQuantile(0.16, mu, sigma), normalQuantile(0.84, mu, sigma)] as [number, number],
        },
        error: '',
      };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : 'Enter valid numbers.' };
    }
  }, [mean, sd, lower, upper]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Probability</Badge>
        <CardTitle>Normal Distribution Calculator</CardTitle>
        <CardDescription>Probability between two values, z-scores, and the 68% and 95% ranges for a normal distribution.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField id="normal-mean" label="Mean (μ)" value={mean} onChange={setMean} />
            <NumberField id="normal-sd" label="Standard deviation (σ)" value={sd} onChange={setSd} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField id="normal-lower" label="Lower bound (x₁)" value={lower} onChange={setLower} />
            <NumberField id="normal-upper" label="Upper bound (x₂)" value={upper} onChange={setUpper} />
          </div>
          <p className="text-[11px] text-zinc-500">
            Uses the normal CDF with a maximum error below 1.5 × 10⁻⁷. Probabilities are two-sided within the bounds you
            enter.
          </p>
        </div>
        <ResultPanel>
          <p className="text-xs font-mono uppercase tracking-wide text-zinc-400">P(x₁ &lt; X &lt; x₂)</p>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-3xl font-bold tabular-nums text-emerald-400">
                {format(value.range.percent, 2)}%
              </p>
              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">z-scores</dt>
                  <dd className="font-mono text-zinc-100">
                    {format(value.range.zLower, 3)} → {format(value.range.zUpper, 3)}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">P(X &lt; x₁)</dt>
                  <dd className="font-mono text-zinc-100">{format(value.cdfLower * 100, 2)}%</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">P(X &lt; x₂)</dt>
                  <dd className="font-mono text-zinc-100">{format(value.cdfUpper * 100, 2)}%</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Middle 68%</dt>
                  <dd className="font-mono text-zinc-100">
                    {format(value.middle68[0], 2)} – {format(value.middle68[1], 2)}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Middle 95%</dt>
                  <dd className="font-mono text-zinc-100">
                    {format(value.middle95[0], 2)} – {format(value.middle95[1], 2)}
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-[11px] text-zinc-500">
                Density at the lower bound: {format(value.pdfLower, 5)}. The normal model assumes a symmetric,
                bell-shaped distribution — check a histogram before relying on it.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `Normal(μ=${mean}, σ=${sd}): P(${lower} < X < ${upper}) = ${format(value.range.percent, 2)}%. ` +
                      `Middle 95% range ${format(value.middle95[0], 2)} to ${format(value.middle95[1], 2)}.`
                  )
                }
              >
                Copy result
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Triangle solver
// ==========================================

const TRIANGLE_MODES: Array<{ value: TriangleMode; label: string }> = [
  { value: 'sss', label: 'SSS — three sides' },
  { value: 'sas', label: 'SAS — two sides and the included angle' },
  { value: 'asa', label: 'ASA — two angles and the side between them' },
  { value: 'aas', label: 'AAS — two angles and a side opposite one' },
];

const SELECT_CLASS =
  'h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50';

export const TriangleCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [mode, setMode] = useState<TriangleMode>('sss');
  const [a, setA] = useState('3');
  const [b, setB] = useState('4');
  const [c, setC] = useState('5');
  const [angleA, setAngleA] = useState('60');
  const [angleB, setAngleB] = useState('60');
  const [angleC, setAngleC] = useState('60');

  const result = useMemo(() => {
    try {
      const value = solveTriangle({
        mode,
        a: toNumber(a),
        b: toNumber(b),
        c: toNumber(c),
        A: toNumber(angleA),
        B: toNumber(angleB),
        C: toNumber(angleC),
      });
      return { value, error: '' };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : 'These values do not form a triangle.' };
    }
  }, [mode, a, b, c, angleA, angleB, angleC]);

  const value: TriangleResult | null = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Geometry</Badge>
        <CardTitle>Triangle Calculator</CardTitle>
        <CardDescription>Solve SSS, SAS, ASA, and AAS triangles with the law of sines and law of cosines.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="triangle-mode">What do you know?</Label>
            <select id="triangle-mode" value={mode} onChange={(event) => setMode(event.target.value as TriangleMode)} className={SELECT_CLASS}>
              {TRIANGLE_MODES.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {(mode === 'sss' || mode === 'sas' || mode === 'aas') && (
              <NumberField id="triangle-a" label="Side a (opposite A)" value={a} onChange={setA} />
            )}
            {(mode === 'sss' || mode === 'sas') && (
              <NumberField id="triangle-b" label="Side b (opposite B)" value={b} onChange={setB} />
            )}
            {(mode === 'sss' || mode === 'asa') && (
              <NumberField id="triangle-c" label={mode === 'asa' ? 'Side c (between A and B)' : 'Side c (opposite C)'} value={c} onChange={setC} />
            )}
            {(mode === 'asa' || mode === 'aas') && (
              <NumberField id="triangle-A" label="Angle A (degrees)" value={angleA} onChange={setAngleA} />
            )}
            {(mode === 'asa' || mode === 'aas') && (
              <NumberField id="triangle-B" label="Angle B (degrees)" value={angleB} onChange={setAngleB} />
            )}
            {mode === 'sas' && (
              <NumberField id="triangle-C" label="Included angle C (degrees)" value={angleC} onChange={setAngleC} />
            )}
          </div>

          <p className="text-[11px] text-zinc-500">
            Side a is opposite angle A, side b opposite B, and side c opposite C. SSA is not offered because it can
            produce two different triangles (the ambiguous case).
          </p>
        </div>

        <ResultPanel>
          <p className="text-xs font-mono uppercase tracking-wide text-zinc-400">Triangle</p>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 text-sm font-semibold text-emerald-400">{value.type}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
                {[
                  ['a', value.a],
                  ['b', value.b],
                  ['c', value.c],
                ].map(([label, side]) => (
                  <div key={String(label)} className="rounded-lg border border-zinc-800 p-2">
                    <p className="text-zinc-400">side {label}</p>
                    <p className="mt-0.5 font-mono text-sm text-zinc-100">{format(Number(side), 3)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[11px]">
                {[
                  ['A', value.A],
                  ['B', value.B],
                  ['C', value.C],
                ].map(([label, angle]) => (
                  <div key={String(label)} className="rounded-lg border border-zinc-800 p-2">
                    <p className="text-zinc-400">∠{label}</p>
                    <p className="mt-0.5 font-mono text-sm text-zinc-100">{format(Number(angle), 2)}°</p>
                  </div>
                ))}
              </div>
              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Area</dt>
                  <dd className="font-mono text-zinc-100">{format(value.area, 4)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Perimeter</dt>
                  <dd className="font-mono text-zinc-100">{format(value.perimeter, 4)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Angle sum</dt>
                  <dd className="font-mono text-zinc-100">{format(value.anglesSum, 2)}°</dd>
                </div>
              </dl>
              <p className="mt-3 text-[11px] text-zinc-500">
                Area uses Heron&apos;s formula, so it stays accurate for obtuse triangles where a height is hard to place.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `Triangle: a=${format(value.a, 3)}, b=${format(value.b, 3)}, c=${format(value.c, 3)}; ` +
                      `A=${format(value.A, 2)}°, B=${format(value.B, 2)}°, C=${format(value.C, 2)}°; ` +
                      `area=${format(value.area, 3)}, perimeter=${format(value.perimeter, 3)}.`
                  )
                }
              >
                Copy result
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Fraction to decimal
// ==========================================

function formatDecimal(value: number, places: number): string {
  if (!Number.isFinite(value)) return '�';
  const fixed = value.toFixed(Math.min(12, Math.max(0, places)));
  return fixed.includes('.') ? fixed.replace(/0+$/, '').replace(/\.$/, '') : fixed;
}

export const FractionToDecimalCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [numerator, setNumerator] = useState('3');
  const [denominator, setDenominator] = useState('8');
  const [places, setPlaces] = useState('6');

  const result = useMemo(() => {
    try {
      return {
        value: fractionToDecimal(toNumber(numerator), toNumber(denominator)),
        error: '',
      };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : 'Enter a valid fraction.' };
    }
  }, [numerator, denominator]);

  const value = result.value;
  const decimalPlaces = Math.min(12, Math.max(0, Math.trunc(toNumber(places)) || 6));

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Fractions</Badge>
        <CardTitle>Fraction to Decimal Calculator</CardTitle>
        <CardDescription>Convert a fraction to a decimal and percentage, and reduce it to lowest terms.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
            <NumberField id="fraction-numerator" label="Numerator" value={numerator} onChange={setNumerator} step="1" />
            <span className="pb-2 text-lg text-zinc-400">/</span>
            <NumberField id="fraction-denominator" label="Denominator" value={denominator} onChange={setDenominator} step="1" />
          </div>
          <NumberField
            id="fraction-places"
            label="Decimal places"
            value={places}
            onChange={setPlaces}
            step="1"
            hint="Between 0 and 12. Repeating decimals are rounded at this point."
          />
          <p className="text-[11px] text-zinc-500">
            The numerator and denominator must be whole numbers. A negative denominator is normalised by moving the sign to
            the numerator.
          </p>
        </div>
        <ResultPanel>
          <p className="text-xs font-mono uppercase tracking-wide text-zinc-400">Decimal</p>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 break-all font-mono text-3xl font-bold tabular-nums text-emerald-400">
                {formatDecimal(value.decimal, decimalPlaces)}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {value.isTerminating ? 'Terminating decimal' : 'Repeating decimal (rounded)'}
              </p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Percentage</dt>
                  <dd className="font-mono text-zinc-100">{format(value.percent, 4)}%</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Simplified fraction</dt>
                  <dd className="font-mono text-zinc-100">
                    {value.numerator} / {value.denominator}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Mixed number</dt>
                  <dd className="font-mono text-zinc-100">
                    {Math.abs(value.decimal) >= 1
                      ? `${value.mixedWhole} ${value.mixedNumerator}/${value.mixedDenominator}`
                      : '�'}
                  </dd>
                </div>
              </dl>

              <p className="mt-3 text-[11px] text-zinc-500">
                A fraction terminates only when its simplified denominator is built from 2s and 5s. Otherwise the decimal
                repeats forever.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `${numerator}/${denominator} = ${formatDecimal(value.decimal, decimalPlaces)} = ${format(value.percent, 4)}% ` +
                      `(simplified ${value.numerator}/${value.denominator}).`
                  )
                }
              >
                Copy result
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};
