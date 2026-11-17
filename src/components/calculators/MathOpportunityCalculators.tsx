import React, { useMemo, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  calculateMissingRatioTerm,
  calculateSolidVolume,
  calculateZScore,
  compareRatios,
  scaleRatioToFirstTerm,
  simplifyRatio,
  splitTotalByRatio,
  SOLID_DIMENSIONS,
  type SolidShape,
  type VolumeDimension,
} from '../../lib/mathOpportunityCalculations';

type CalculatorProps = { onSaveHistory?: (summary: string) => void };

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en', { maximumSignificantDigits: 9 }).format(value);
}

function NumberField({
  id,
  label,
  value,
  onChange,
  step = 'any',
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  step?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export const ZScoreCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const [value, setValue] = useState('85');
  const [mean, setMean] = useState('80');
  const [standardDeviation, setStandardDeviation] = useState('5');
  const result = useMemo(() => {
    try {
      const zScore = calculateZScore(
        value.trim() === '' ? Number.NaN : Number(value),
        mean.trim() === '' ? Number.NaN : Number(mean),
        standardDeviation.trim() === '' ? Number.NaN : Number(standardDeviation)
      );
      return { zScore, error: '' };
    } catch (error) {
      return { zScore: null, error: error instanceof Error ? error.message : 'Unable to calculate this z-score.' };
    }
  }, [value, mean, standardDeviation]);

  const saveSummary = () => {
    if (result.zScore !== null) {
      onSaveHistory?.(`Z-score: ${formatNumber(Number(value))} is ${formatNumber(Math.abs(result.zScore))} standard deviations ${result.zScore < 0 ? 'below' : 'above'} the mean.`);
    }
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Statistics</Badge>
        <CardTitle>Z-Score Calculator</CardTitle>
        <CardDescription>Standardize one observation against a mean and standard deviation.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <NumberField id="zscore-value" label="Observed value (x)" value={value} onChange={setValue} />
          <NumberField id="zscore-mean" label="Mean (μ)" value={mean} onChange={setMean} />
          <NumberField id="zscore-standard-deviation" label="Standard deviation (σ)" value={standardDeviation} onChange={setStandardDeviation} />
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">
          <p className="text-xs font-mono uppercase tracking-wide text-zinc-400">Z-score</p>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : result.zScore !== null && (
            <>
              <p className="mt-2 break-all text-3xl font-bold font-mono tabular-nums">{formatNumber(result.zScore)}</p>
              <p className="mt-3 text-sm text-zinc-300">
                The value is {formatNumber(Math.abs(result.zScore))} standard deviations {result.zScore < 0 ? 'below' : result.zScore > 0 ? 'above' : 'at'} the mean.
              </p>
              {onSaveHistory && (
                <Button type="button" variant="outline" size="sm" className="mt-4" onClick={saveSummary}>
                  Save result
                </Button>
              )}
            </>
          )}
          <p className="mt-4 text-xs text-zinc-500">A z-score alone does not show whether the data are normally distributed or determine a probability.</p>
        </div>
      </CardContent>
    </Card>
  );
};

const SHAPE_LABELS: Record<SolidShape, string> = {
  cube: 'Cube',
  'rectangular-prism': 'Rectangular prism',
  sphere: 'Sphere',
  cylinder: 'Cylinder',
  cone: 'Cone',
};

function isSolidShape(value: string): value is SolidShape {
  return Object.prototype.hasOwnProperty.call(SHAPE_LABELS, value);
}

const DIMENSION_LABELS: Record<VolumeDimension, string> = {
  side: 'Side length',
  length: 'Length',
  width: 'Width',
  height: 'Height',
  radius: 'Radius',
};

const DIMENSION_DEFAULTS: Record<VolumeDimension, string> = {
  side: '3',
  length: '2',
  width: '3',
  height: '4',
  radius: '2',
};

const VOLUME_UNITS = ['cm', 'm', 'mm', 'in', 'ft'] as const;

function isVolumeUnit(value: string): value is (typeof VOLUME_UNITS)[number] {
  return VOLUME_UNITS.some((unit) => unit === value);
}

export const SolidVolumeCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const [shape, setShape] = useState<SolidShape>('cylinder');
  const [unit, setUnit] = useState<(typeof VOLUME_UNITS)[number]>('cm');
  const [dimensions, setDimensions] = useState<Record<VolumeDimension, string>>(DIMENSION_DEFAULTS);

  const result = useMemo(() => {
    try {
      const numericDimensions: Partial<Record<VolumeDimension, number>> = {};
      for (const dimension of SOLID_DIMENSIONS[shape]) {
        const raw = dimensions[dimension];
        numericDimensions[dimension] = raw.trim() === '' ? Number.NaN : Number(raw);
      }
      return { volume: calculateSolidVolume({ shape, dimensions: numericDimensions }), error: '' };
    } catch (error) {
      return { volume: null, error: error instanceof Error ? error.message : 'Unable to calculate this volume.' };
    }
  }, [shape, dimensions]);

  const updateDimension = (dimension: VolumeDimension, value: string) => {
    setDimensions((current) => ({ ...current, [dimension]: value }));
  };

  const saveSummary = () => {
    if (result.volume !== null) {
      onSaveHistory?.(`${SHAPE_LABELS[shape]} volume: ${formatNumber(result.volume)} ${unit}³`);
    }
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Geometry</Badge>
        <CardTitle>Volume Calculator</CardTitle>
        <CardDescription>Find the volume of five common solids using consistent linear measurements.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="volume-shape">Solid shape</Label>
            <select
              id="volume-shape"
              value={shape}
              onChange={(event) => {
                if (isSolidShape(event.target.value)) setShape(event.target.value);
              }}
              className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-tint dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            >
              {Object.entries(SHAPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="volume-unit">Measurement unit</Label>
            <select
              id="volume-unit"
              value={unit}
              onChange={(event) => {
                if (isVolumeUnit(event.target.value)) setUnit(event.target.value);
              }}
              className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-tint dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            >
              {VOLUME_UNITS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          {SOLID_DIMENSIONS[shape].map((dimension) => (
            <div key={dimension}>
              <NumberField
                id={`volume-${dimension}`}
                label={`${DIMENSION_LABELS[dimension]} (${unit})`}
                value={dimensions[dimension]}
                onChange={(value) => updateDimension(dimension, value)}
              />
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">
          <p className="text-xs font-mono uppercase tracking-wide text-zinc-400">{SHAPE_LABELS[shape]} volume</p>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : result.volume !== null && (
            <>
              <p className="mt-2 break-all text-3xl font-bold font-mono tabular-nums">{formatNumber(result.volume)} {unit}³</p>
              <p className="mt-3 text-sm text-zinc-300">All dimensions are treated as the selected unit; the result is in that unit cubed.</p>
              {onSaveHistory && (
                <Button type="button" variant="outline" size="sm" className="mt-4" onClick={saveSummary}>
                  Save result
                </Button>
              )}
            </>
          )}
        </div>
        <p className="text-xs text-zinc-500 md:col-span-2">Use one consistent unit for every dimension. This calculator does not estimate material waste, fill level, or construction quantities.</p>
      </CardContent>
    </Card>
  );
};


type RatioMode = 'missing' | 'simplify' | 'scale' | 'compare' | 'split';
const RATIO_MODES: Record<RatioMode, string> = {
  missing: 'Find a missing proportion term', simplify: 'Simplify a ratio', scale: 'Scale a ratio',
  compare: 'Compare two ratios', split: 'Divide a total in a ratio',
};
function isRatioMode(value: string): value is RatioMode { return Object.prototype.hasOwnProperty.call(RATIO_MODES, value); }
function numericInput(value: string): number { return value.trim() === '' ? Number.NaN : Number(value); }
type RatioResult = { title: string; primary: string; details: string[]; error: string };

export const RatioProportionCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const [mode, setMode] = useState<RatioMode>('missing');
  const [a, setA] = useState('2'), [b, setB] = useState('5'), [c, setC] = useState('8');
  const [d, setD] = useState('12'), [total, setTotal] = useState('100');
  const result = useMemo<RatioResult>(() => {
    try {
      const first = numericInput(a), second = numericInput(b), third = numericInput(c), fourth = numericInput(d);
      if (mode === 'missing') {
        const missing = calculateMissingRatioTerm(first, second, third);
        return { title: 'Missing fourth term (D)', primary: formatNumber(missing),
          details: [`A:B = ${formatNumber(first)}:${formatNumber(second)}`,
            `D = (B × C) ÷ A = (${formatNumber(second)} × ${formatNumber(third)}) ÷ ${formatNumber(first)}`], error: '' };
      }
      if (mode === 'simplify') {
        const simplified = simplifyRatio(first, second);
        return { title: 'Simplified ratio', primary: `${formatNumber(simplified.a)} : ${formatNumber(simplified.b)}`,
          details: [`Divide both terms by ${formatNumber(simplified.divisor)}.`,
            `${formatNumber(first)} ÷ ${formatNumber(simplified.divisor)} = ${formatNumber(simplified.a)}`,
            `${formatNumber(second)} ÷ ${formatNumber(simplified.divisor)} = ${formatNumber(simplified.b)}`], error: '' };
      }
      if (mode === 'scale') {
        const scaled = scaleRatioToFirstTerm(first, second, third);
        return { title: 'Scaled second term', primary: formatNumber(scaled),
          details: [`Original ratio: ${formatNumber(first)}:${formatNumber(second)}`,
            `Scale factor = ${formatNumber(third)} ÷ ${formatNumber(first)} = ${formatNumber(third / first)}`,
            `New ratio: ${formatNumber(third)}:${formatNumber(scaled)}`], error: '' };
      }
      if (mode === 'compare') {
        const comparison = compareRatios(first, second, third, fourth);
        const message = comparison === 0 ? 'The two ratios are equivalent.'
          : comparison > 0 ? `${formatNumber(first)}:${formatNumber(second)} is the larger ratio.`
            : `${formatNumber(third)}:${formatNumber(fourth)} is the larger ratio.`;
        return { title: 'Ratio comparison',
          primary: comparison === 0 ? 'Equivalent' : comparison > 0 ? 'First ratio is larger' : 'Second ratio is larger',
          details: [`First cross-product: ${formatNumber(first)} × ${formatNumber(fourth)} = ${formatNumber(first * fourth)}`,
            `Second cross-product: ${formatNumber(second)} × ${formatNumber(third)} = ${formatNumber(second * third)}`, message], error: '' };
      }
      const shares = splitTotalByRatio(numericInput(total), first, second);
      return { title: 'Proportional split', primary: `${formatNumber(shares.shareA)} : ${formatNumber(shares.shareB)}`,
        details: [`A share = total × A ÷ (A + B) = ${formatNumber(shares.shareA)}`,
          `B share = total × B ÷ (A + B) = ${formatNumber(shares.shareB)}`,
          `Check: ${formatNumber(shares.shareA + shares.shareB)}`], error: '' };
    } catch (error) {
      return { title: 'Result', primary: '', details: [],
        error: error instanceof Error ? error.message : 'Unable to calculate this ratio.' };
    }
  }, [mode, a, b, c, d, total]);
  const saveSummary = () => {
    if (!result.error && result.primary) onSaveHistory?.(`${RATIO_MODES[mode]}: ${result.primary}. ${result.details.join(' ')}`);
  };
  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Ratios & proportions</Badge>
        <CardTitle>Ratio Calculator</CardTitle>
        <CardDescription>Simplify ratios, solve proportions, scale values, compare ratios or divide a total proportionally.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="ratio-mode">What do you want to calculate?</Label>
            <select id="ratio-mode" value={mode}
              onChange={(event) => { if (isRatioMode(event.target.value)) setMode(event.target.value); }}
              className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-tint dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50">
              {Object.entries(RATIO_MODES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumberField id="ratio-a" label="First ratio term (A)" value={a} onChange={setA} />
            <NumberField id="ratio-b" label="Second ratio term (B)" value={b} onChange={setB} />
          </div>
          {mode === 'missing' && <NumberField id="ratio-c" label="Matching value (C)" value={c} onChange={setC} />}
          {mode === 'scale' && <NumberField id="ratio-scale-target" label="New first term (C)" value={c} onChange={setC} />}
          {mode === 'compare' && <div className="grid grid-cols-2 gap-3">
            <NumberField id="ratio-c" label="Third term (C)" value={c} onChange={setC} />
            <NumberField id="ratio-d" label="Fourth term (D)" value={d} onChange={setD} />
          </div>}
          {mode === 'split' && <NumberField id="ratio-total" label="Total to divide" value={total} onChange={setTotal} />}
          <p className="text-xs text-zinc-500">Enter positive ratio terms. The split total can be zero. Decimal ratios are supported for simplification up to six decimal places.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white" aria-live="polite">
          <p className="text-xs font-mono uppercase tracking-wide text-zinc-400">{result.title}</p>
          {result.error ? <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p> : <>
            <p className="mt-2 break-words text-3xl font-bold font-mono tabular-nums">{result.primary}</p>
            <div className="mt-4 space-y-2">{result.details.map((detail) => <p key={detail} className="text-sm text-zinc-300">{detail}</p>)}</div>
            {onSaveHistory && <Button type="button" variant="outline" size="sm" className="mt-4" onClick={saveSummary}>Save result</Button>}
          </>}
        </div>
      </CardContent>
    </Card>
  );
};
