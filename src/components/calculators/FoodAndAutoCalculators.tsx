import React, { useMemo, useState } from 'react';
import { ArrowLeftRight, Copy, Gauge, Timer } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  BUTTER_UNIT_LABELS,
  convertButter,
  convertOvenTemperature,
  FLOUR_TYPES,
  findFlourType,
  findIngredientDensity,
  formatHoursMinutes,
  formatPace,
  GAS_MARKS,
  gramsFromVolume,
  INGREDIENT_DENSITIES,
  solveSpeedDistanceTime,
  VOLUME_UNIT_LABELS,
  volumeFromGrams,
  type ButterUnit,
  type OvenScale,
  type SpeedDistanceMode,
  type VolumeUnit,
} from '../../lib/foodAndAuto';
import { useToast } from '../ui/toast';

type CalculatorProps = { onSaveHistory?: (summary: string) => void };

function format(value: number, digits = 2): string {
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
  suffix,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  step?: string;
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
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={suffix ? 'pr-14' : undefined}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-zinc-400">
            {suffix}
          </span>
        )}
      </div>
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

const SELECT_CLASS =
  'h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50';

const SEGMENT_BASE =
  'flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600';
const SEGMENT_ON = 'border-emerald-600 bg-emerald-600 text-white';
const SEGMENT_OFF =
  'border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300';

// ==========================================
// Ingredient weight
// ==========================================

const VOLUME_UNITS: VolumeUnit[] = ['cup', 'tbsp', 'tsp', 'ml', 'floz'];

export const IngredientWeightConverter: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [ingredient, setIngredient] = useState('All-purpose flour');
  const [mode, setMode] = useState<'volume' | 'weight'>('volume');
  const [amount, setAmount] = useState('1');
  const [unit, setUnit] = useState<VolumeUnit>('cup');

  const result = useMemo(() => {
    try {
      const density = findIngredientDensity(ingredient);
      const value = toNumber(amount);
      if (mode === 'volume') {
        const grams = gramsFromVolume(density.gramsPerCup, value, unit);
        return {
          value: {
            density,
            grams,
            cups: grams / density.gramsPerCup,
            tablespoons: grams / density.gramsPerCup / (1 / 16),
            teaspoons: grams / density.gramsPerCup / (1 / 48),
            millilitres: (grams / density.gramsPerCup) * 236.5882365,
            ounces: grams / 28.349523125,
          },
          error: '',
        };
      }
      const grams = value;
      return {
        value: {
          density,
          grams,
          cups: volumeFromGrams(density.gramsPerCup, grams, 'cup'),
          tablespoons: volumeFromGrams(density.gramsPerCup, grams, 'tbsp'),
          teaspoons: volumeFromGrams(density.gramsPerCup, grams, 'tsp'),
          millilitres: volumeFromGrams(density.gramsPerCup, grams, 'ml'),
          ounces: grams / 28.349523125,
        },
        error: '',
      };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter a valid amount.',
      };
    }
  }, [ingredient, mode, amount, unit]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Kitchen weight</Badge>
        <CardTitle>Ingredient Weight Converter</CardTitle>
        <CardDescription>
          Convert cups and spoons into grams using measured densities for common baking ingredients.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="ingredient-select">Ingredient</Label>
            <select
              id="ingredient-select"
              value={ingredient}
              onChange={(event) => setIngredient(event.target.value)}
              className={SELECT_CLASS}
            >
              {INGREDIENT_DENSITIES.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name} — {item.gramsPerCup} g/cup
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label>Direction</Label>
            <div className="flex gap-2" role="group" aria-label="Conversion direction">
              <button
                type="button"
                aria-pressed={mode === 'volume'}
                onClick={() => setMode('volume')}
                className={`${SEGMENT_BASE} ${mode === 'volume' ? SEGMENT_ON : SEGMENT_OFF}`}
              >
                Volume → weight
              </button>
              <button
                type="button"
                aria-pressed={mode === 'weight'}
                onClick={() => setMode('weight')}
                className={`${SEGMENT_BASE} ${mode === 'weight' ? SEGMENT_ON : SEGMENT_OFF}`}
              >
                Weight → volume
              </button>
            </div>
          </div>

          {mode === 'volume' ? (
            <div className="grid grid-cols-2 gap-3">
              <NumberField id="ingredient-amount" label="Amount" value={amount} onChange={setAmount} step="any" />
              <div className="space-y-1.5">
                <Label htmlFor="ingredient-unit">Unit</Label>
                <select
                  id="ingredient-unit"
                  value={unit}
                  onChange={(event) => setUnit(event.target.value as VolumeUnit)}
                  className={SELECT_CLASS}
                >
                  {VOLUME_UNITS.map((option) => (
                    <option key={option} value={option}>
                      {VOLUME_UNIT_LABELS[option]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <NumberField
              id="ingredient-grams"
              label="Weight"
              value={amount}
              onChange={setAmount}
              step="any"
              suffix="g"
              hint="Use a scale for this direction — it is the only precise way to measure flour."
            />
          )}

          <p className="text-[11px] text-zinc-500">
            Densities assume a lightly spooned and levelled cup. Scooping straight from the bag can add 10–20%, so
            weigh when the recipe’s success depends on it.
          </p>
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <ArrowLeftRight className="h-3.5 w-3.5" /> {mode === 'volume' ? 'Weight' : 'Volume'}
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {mode === 'volume' ? format(value.grams, 1) : format(value.cups, 3)}
                <span className="ml-1 text-base font-normal text-zinc-400">
                  {mode === 'volume' ? 'g' : 'cups'}
                </span>
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {value.density.name} · {value.density.gramsPerCup} g per US cup
              </p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Grams</dt>
                  <dd className="font-mono text-zinc-100">{format(value.grams, 1)} g</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Ounces</dt>
                  <dd className="font-mono text-zinc-100">{format(value.ounces, 2)} oz</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Cups</dt>
                  <dd className="font-mono text-zinc-100">{format(value.cups, 3)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Tablespoons</dt>
                  <dd className="font-mono text-zinc-100">{format(value.tablespoons, 2)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Teaspoons</dt>
                  <dd className="font-mono text-zinc-100">{format(value.teaspoons, 1)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Millilitres</dt>
                  <dd className="font-mono text-zinc-100">{format(value.millilitres, 0)} mL</dd>
                </div>
              </dl>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `${value.density.name}: ${format(value.grams, 1)} g = ${format(value.ounces, 2)} oz = ` +
                      `${format(value.cups, 3)} cups = ${format(value.tablespoons, 2)} tbsp.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Butter
// ==========================================

const BUTTER_UNITS: ButterUnit[] = ['stick', 'cup', 'tbsp', 'tsp', 'gram', 'ounce'];

export const ButterConverter: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [amount, setAmount] = useState('1');
  const [unit, setUnit] = useState<ButterUnit>('stick');

  const result = useMemo(() => {
    try {
      return { value: convertButter(toNumber(amount), unit), error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter a valid butter amount.',
      };
    }
  }, [amount, unit]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Cooking</Badge>
        <CardTitle>Butter Converter</CardTitle>
        <CardDescription>
          Convert between sticks, cups, tablespoons, teaspoons, grams, and ounces of butter.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <NumberField
            id="butter-amount"
            label="Amount of butter"
            value={amount}
            onChange={setAmount}
            step="any"
          />
          <div className="space-y-1.5">
            <Label htmlFor="butter-unit">Unit</Label>
            <select
              id="butter-unit"
              value={unit}
              onChange={(event) => setUnit(event.target.value as ButterUnit)}
              className={SELECT_CLASS}
            >
              {BUTTER_UNITS.map((option) => (
                <option key={option} value={option}>
                  {BUTTER_UNIT_LABELS[option]}
                </option>
              ))}
            </select>
          </div>

          <p className="text-[11px] text-zinc-500">
            A US stick is ½ cup, 8 tablespoons, or 113.4 g. European blocks are usually sold by weight, so use grams
            when a recipe is metric.
          </p>
        </div>

        <ResultPanel>
          <p className="text-xs font-mono uppercase tracking-wide text-zinc-400">Butter equivalent</p>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {format(value.grams, 1)}
                <span className="ml-1 text-base font-normal text-zinc-400">g</span>
              </p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Sticks</dt>
                  <dd className="font-mono text-zinc-100">{format(value.sticks, 3)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Cups</dt>
                  <dd className="font-mono text-zinc-100">{format(value.cups, 3)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Tablespoons</dt>
                  <dd className="font-mono text-zinc-100">{format(value.tablespoons, 2)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Teaspoons</dt>
                  <dd className="font-mono text-zinc-100">{format(value.teaspoons, 1)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Ounces</dt>
                  <dd className="font-mono text-zinc-100">{format(value.ounces, 2)}</dd>
                </div>
              </dl>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `${format(value.grams, 1)} g butter = ${format(value.sticks, 3)} sticks = ` +
                      `${format(value.cups, 3)} cups = ${format(value.tablespoons, 2)} tbsp.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Flour
// ==========================================

export const FlourConverter: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [flour, setFlour] = useState('All-purpose flour');
  const [mode, setMode] = useState<'cups' | 'grams'>('cups');
  const [amount, setAmount] = useState('1');

  const result = useMemo(() => {
    try {
      const type = findFlourType(flour);
      const value = toNumber(amount);
      if (!Number.isFinite(value) || value < 0) {
        throw new RangeError('Amount must be zero or greater.');
      }
      const grams = mode === 'cups' ? value * type.gramsPerCup : value;
      const cups = mode === 'cups' ? value : grams / type.gramsPerCup;
      return {
        value: {
          type,
          grams,
          cups,
          tablespoons: cups * 16,
          ounces: grams / 28.349523125,
        },
        error: '',
      };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter a valid flour amount.',
      };
    }
  }, [flour, mode, amount]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Baking</Badge>
        <CardTitle>Flour Converter</CardTitle>
        <CardDescription>
          Convert flour between cups and grams, with a different density for each type of flour.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="flour-type">Flour type</Label>
            <select
              id="flour-type"
              value={flour}
              onChange={(event) => setFlour(event.target.value)}
              className={SELECT_CLASS}
            >
              {FLOUR_TYPES.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name} — {item.gramsPerCup} g/cup
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label>Direction</Label>
            <div className="flex gap-2">
              <button
                type="button"
                aria-pressed={mode === 'cups'}
                onClick={() => setMode('cups')}
                className={`${SEGMENT_BASE} ${mode === 'cups' ? SEGMENT_ON : SEGMENT_OFF}`}
              >
                Cups → grams
              </button>
              <button
                type="button"
                aria-pressed={mode === 'grams'}
                onClick={() => setMode('grams')}
                className={`${SEGMENT_BASE} ${mode === 'grams' ? SEGMENT_ON : SEGMENT_OFF}`}
              >
                Grams → cups
              </button>
            </div>
          </div>

          <NumberField
            id="flour-amount"
            label="Amount"
            value={amount}
            onChange={setAmount}
            step="any"
            suffix={mode === 'cups' ? 'cups' : 'g'}
          />

          <p className="text-[11px] text-zinc-500">
            Flours differ by milling and protein content, which changes how much fits in a cup. Bread flour is denser
            than cake flour, so the same cup weighs more.
          </p>
        </div>

        <ResultPanel>
          <p className="text-xs font-mono uppercase tracking-wide text-zinc-400">Flour equivalent</p>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {mode === 'cups' ? format(value.grams, 1) : format(value.cups, 3)}
                <span className="ml-1 text-base font-normal text-zinc-400">
                  {mode === 'cups' ? 'g' : 'cups'}
                </span>
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {value.type.name} · {value.type.gramsPerCup} g/cup · {value.type.protein} protein
              </p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Grams</dt>
                  <dd className="font-mono text-zinc-100">{format(value.grams, 1)} g</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Cups</dt>
                  <dd className="font-mono text-zinc-100">{format(value.cups, 3)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Tablespoons</dt>
                  <dd className="font-mono text-zinc-100">{format(value.tablespoons, 2)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Ounces</dt>
                  <dd className="font-mono text-zinc-100">{format(value.ounces, 2)}</dd>
                </div>
              </dl>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `${value.type.name}: ${format(value.grams, 1)} g = ${format(value.cups, 3)} cups = ` +
                      `${format(value.tablespoons, 2)} tbsp.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Oven temperature
// ==========================================

const OVEN_SCALES: Array<{ value: OvenScale; label: string; suffix: string }> = [
  { value: 'celsius', label: 'Celsius', suffix: '°C' },
  { value: 'fahrenheit', label: 'Fahrenheit', suffix: '°F' },
  { value: 'gas', label: 'Gas mark', suffix: 'gas' },
];

export const OvenTemperatureConverter: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [value, setValue] = useState('180');
  const [scale, setScale] = useState<OvenScale>('celsius');

  const active = OVEN_SCALES.find((option) => option.value === scale) ?? OVEN_SCALES[0];

  const result = useMemo(() => {
    try {
      return { value: convertOvenTemperature(toNumber(value), scale), error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter a valid oven temperature.',
      };
    }
  }, [value, scale]);

  const converted = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Cooking</Badge>
        <CardTitle>Oven Temperature Converter</CardTitle>
        <CardDescription>
          Convert oven settings between Celsius, Fahrenheit, gas mark, and fan-assisted equivalents.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="oven-scale">Scale</Label>
            <select
              id="oven-scale"
              value={scale}
              onChange={(event) => {
                const next = event.target.value as OvenScale;
                setScale(next);
                setValue(next === 'celsius' ? '180' : next === 'fahrenheit' ? '350' : '4');
              }}
              className={SELECT_CLASS}
            >
              {OVEN_SCALES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <NumberField
            id="oven-value"
            label="Oven setting"
            value={value}
            onChange={setValue}
            step={scale === 'gas' ? '0.25' : '5'}
            suffix={active.suffix}
          />

          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-[11px]">
              <thead className="bg-zinc-50 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                <tr>
                  <th className="px-2 py-1.5 text-left font-medium">Gas</th>
                  <th className="px-2 py-1.5 text-right font-medium">°C</th>
                  <th className="px-2 py-1.5 text-right font-medium">Chart °F</th>
                  <th className="px-2 py-1.5 text-right font-medium">Fan °C</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {GAS_MARKS.map((row) => (
                  <tr key={row.gas}>
                    <td className="px-2 py-1 text-zinc-700 dark:text-zinc-300">
                      {row.gas === 0.25 ? '¼' : row.gas === 0.5 ? '½' : row.gas}
                    </td>
                    <td className="px-2 py-1 text-right font-mono text-zinc-700 dark:text-zinc-300">{row.celsius}</td>
                    <td className="px-2 py-1 text-right font-mono text-zinc-700 dark:text-zinc-300">{row.fahrenheit}</td>
                    <td className="px-2 py-1 text-right font-mono text-zinc-700 dark:text-zinc-300">
                      {row.celsius - 20}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ResultPanel>
          <p className="text-xs font-mono uppercase tracking-wide text-zinc-400">Conventional oven</p>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : converted && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {format(converted.celsius, 0)}
                <span className="ml-1 text-base font-normal text-zinc-400">°C</span>
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {format(converted.fahrenheit, 0)} °F · gas mark {converted.gasLabel}
              </p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Celsius</dt>
                  <dd className="font-mono text-zinc-100">{format(converted.celsius, 0)} °C</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Fahrenheit (exact)</dt>
                  <dd className="font-mono text-zinc-100">{format(converted.fahrenheit, 0)} °F</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Gas mark</dt>
                  <dd className="font-mono text-zinc-100">{converted.gasLabel}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Fan-assisted</dt>
                  <dd className="font-mono text-zinc-100">{format(converted.fanCelsius, 0)} °C</dd>
                </div>
              </dl>

              <p className="mt-3 text-[11px] text-zinc-500">
                Fan ovens are usually set about 20 °C lower than conventional. Oven thermostats vary, so trust a
                separate thermometer over the dial.
              </p>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `${format(converted.celsius, 0)} °C = ${format(converted.fahrenheit, 0)} °F = ` +
                      `gas ${converted.gasLabel}; fan oven ${format(converted.fanCelsius, 0)} °C.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Speed, distance, time
// ==========================================

const SPEED_MODES: Array<{
  value: SpeedDistanceMode;
  label: string;
  first: string;
  firstUnit: string;
  second: string;
  secondUnit: string;
}> = [
  {
    value: 'time',
    label: 'Find the time',
    first: 'Distance',
    firstUnit: 'km',
    second: 'Speed',
    secondUnit: 'km/h',
  },
  {
    value: 'speed',
    label: 'Find the speed',
    first: 'Distance',
    firstUnit: 'km',
    second: 'Time',
    secondUnit: 'hours',
  },
  {
    value: 'distance',
    label: 'Find the distance',
    first: 'Speed',
    firstUnit: 'km/h',
    second: 'Time',
    secondUnit: 'hours',
  },
];

export const SpeedDistanceTimeCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [mode, setMode] = useState<SpeedDistanceMode>('time');
  const [first, setFirst] = useState('100');
  const [second, setSecond] = useState('80');

  const active = SPEED_MODES.find((option) => option.value === mode) ?? SPEED_MODES[0];

  const result = useMemo(() => {
    try {
      return { value: solveSpeedDistanceTime(mode, toNumber(first), toNumber(second)), error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter two valid values.',
      };
    }
  }, [mode, first, second]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Travel</Badge>
        <CardTitle>Speed Distance Time Calculator</CardTitle>
        <CardDescription>
          Solve for the missing value in a journey, with the result also shown as a clock time and a running pace.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="sdt-mode">What are you solving for?</Label>
            <select
              id="sdt-mode"
              value={mode}
              onChange={(event) => setMode(event.target.value as SpeedDistanceMode)}
              className={SELECT_CLASS}
            >
              {SPEED_MODES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              id="sdt-first"
              label={active.first}
              value={first}
              onChange={setFirst}
              step="any"
              suffix={active.firstUnit}
            />
            <NumberField
              id="sdt-second"
              label={active.second}
              value={second}
              onChange={setSecond}
              step="any"
              suffix={active.secondUnit}
            />
          </div>

          <p className="text-[11px] text-zinc-500">
            Time is entered in decimal hours: 1 hour 30 minutes is 1.5. The result also shows hours and minutes, and a
            pace per kilometre for running or walking.
          </p>
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <Gauge className="h-3.5 w-3.5" /> Journey
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {mode === 'distance'
                  ? `${format(value.distanceKm, 2)} km`
                  : mode === 'speed'
                    ? `${format(value.speedKmh, 2)} km/h`
                    : formatHoursMinutes(value.timeHours)}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {mode === 'distance' ? 'Distance covered' : mode === 'speed' ? 'Average speed' : 'Journey time'}
              </p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Distance</dt>
                  <dd className="font-mono text-zinc-100">{format(value.distanceKm, 3)} km</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Speed</dt>
                  <dd className="font-mono text-zinc-100">{format(value.speedKmh, 2)} km/h</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Time</dt>
                  <dd className="font-mono text-zinc-100">{format(value.timeHours, 4)} h</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="flex items-center gap-1 text-zinc-400">
                    <Timer className="h-3 w-3" /> Pace
                  </dt>
                  <dd className="font-mono text-zinc-100">{formatPace(value.paceMinPerKm)}</dd>
                </div>
              </dl>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `${format(value.distanceKm, 3)} km at ${format(value.speedKmh, 2)} km/h takes ` +
                      `${formatHoursMinutes(value.timeHours)} (${formatPace(value.paceMinPerKm)}).`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};
