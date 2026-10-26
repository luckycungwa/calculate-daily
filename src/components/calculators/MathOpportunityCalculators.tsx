import React, { useMemo, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  calculateSolidVolume,
  calculateZScore,
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
              className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
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
              className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
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
