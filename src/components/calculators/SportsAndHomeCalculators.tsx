import React, { useMemo, useState } from 'react';
import { Copy, Flag, PawPrint, Plus, Timer, Trash2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  formatDuration,
  golfDifferential,
  golfHandicapIndex,
  petCalories,
  predictRaceTime,
  PET_FACTORS,
  type PetSpecies,
  type PetStage,
} from '../../lib/sportsAndHome';
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
          className={suffix ? 'pr-16' : undefined}
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
  'h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-tint dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50';

// ==========================================
// Race time predictor
// ==========================================

const COMMON_RACES: Array<{ label: string; km: number }> = [
  { label: '5K', km: 5 },
  { label: '10K', km: 10 },
  { label: 'Half marathon', km: 21.0975 },
  { label: 'Marathon', km: 42.195 },
];

export const RaceTimePredictor: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [knownDistance, setKnownDistance] = useState('10');
  const [minutes, setMinutes] = useState('50');
  const [seconds, setSeconds] = useState('0');
  const [targetDistance, setTargetDistance] = useState('21.0975');

  const knownTimeSeconds = (toNumber(minutes) || 0) * 60 + (toNumber(seconds) || 0);

  const result = useMemo(() => {
    try {
      const known = toNumber(knownDistance);
      const target = toNumber(targetDistance);
      if (!Number.isFinite(knownTimeSeconds) || knownTimeSeconds <= 0) {
        throw new RangeError('Enter the time you ran for the known distance.');
      }
      const prediction = predictRaceTime(known, knownTimeSeconds, target);
      const table = COMMON_RACES.map((race) => ({
        ...race,
        ...predictRaceTime(known, knownTimeSeconds, race.km),
      }));
      return { value: { prediction, table }, error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter a valid distance and time.',
      };
    }
  }, [knownDistance, knownTimeSeconds, targetDistance]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Endurance</Badge>
        <CardTitle>Race Time Predictor</CardTitle>
        <CardDescription>
          Use one race result to estimate an equivalent time at another distance with the Riegel formula.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <NumberField id="race-known-distance" label="Known distance" value={knownDistance} onChange={setKnownDistance} step="0.1" suffix="km" />
            <NumberField id="race-target-distance" label="Target distance" value={targetDistance} onChange={setTargetDistance} step="0.1" suffix="km" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <NumberField id="race-minutes" label="Known time" value={minutes} onChange={setMinutes} step="1" suffix="min" />
            <NumberField id="race-seconds" label="Seconds" value={seconds} onChange={setSeconds} step="1" suffix="sec" />
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Set the target to</p>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_RACES.map((race) => (
                <button
                  key={race.label}
                  type="button"
                  onClick={() => setTargetDistance(String(race.km))}
                  className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-[11px] text-zinc-700 transition-colors hover:border-primary hover:text-primary dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-primary-tint"
                >
                  {race.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-zinc-500">
            The prediction assumes endurance pacing and roughly equivalent training. It is least reliable when the
            target is more than twice the known distance, or for runners whose speed and endurance are unusually
            skewed.
          </p>
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <Timer className="h-3.5 w-3.5" /> Predicted finish
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-primary-on-dark">
                {formatDuration(value.prediction.seconds)}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {format(value.prediction.paceSecondsPerKm / 60, 2)} min/km ·{' '}
                {toNumber(targetDistance) ? `${format(toNumber(targetDistance), 2)} km` : 'target race'}
              </p>

              <div className="mt-4 overflow-hidden rounded-lg border border-zinc-800">
                <table className="w-full text-[11px]">
                  <thead className="bg-zinc-900 text-zinc-400">
                    <tr>
                      <th className="px-2 py-1.5 text-left font-medium">Race</th>
                      <th className="px-2 py-1.5 text-right font-medium">Time</th>
                      <th className="px-2 py-1.5 text-right font-medium">Pace</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {value.table.map((row) => (
                      <tr key={row.label}>
                        <td className="px-2 py-1.5 text-zinc-300">{row.label}</td>
                        <td className="px-2 py-1.5 text-right font-mono text-zinc-100">{formatDuration(row.seconds)}</td>
                        <td className="px-2 py-1.5 text-right font-mono text-zinc-300">
                          {format(row.paceSecondsPerKm / 60, 2)} /km
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `Predicted ${format(toNumber(targetDistance), 2)} km: ${formatDuration(value.prediction.seconds)} ` +
                      `(${format(value.prediction.paceSecondsPerKm / 60, 2)} min/km), based on ` +
                      `${format(toNumber(knownDistance), 2)} km in ${formatDuration(knownTimeSeconds)}.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy prediction
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Golf handicap
// ==========================================

export const GolfHandicapCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [score, setScore] = useState('85');
  const [rating, setRating] = useState('72');
  const [slope, setSlope] = useState('113');
  const [differentials, setDifferentials] = useState<number[]>([12.4, 14.1, 10.8, 13.6, 11.9, 15.2, 9.7]);

  const differentialResult = useMemo(() => {
    try {
      return { value: golfDifferential(toNumber(score), toNumber(rating), toNumber(slope)), error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter a score, course rating, and slope.',
      };
    }
  }, [score, rating, slope]);

  const indexResult = useMemo(() => {
    try {
      return { value: golfHandicapIndex(differentials), error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Add at least three differentials.',
      };
    }
  }, [differentials]);

  const addDifferential = () => {
    if (differentialResult.value === null) return;
    const rounded = Math.round(differentialResult.value * 10) / 10;
    setDifferentials((current) => [...current, rounded].slice(-20));
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">World Handicap System</Badge>
        <CardTitle>Golf Handicap Calculator</CardTitle>
        <CardDescription>
          Turn a score into a differential, then build a Handicap Index from your recent rounds.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <NumberField id="golf-score" label="Score" value={score} onChange={setScore} step="1" />
            <NumberField id="golf-rating" label="Course rating" value={rating} onChange={setRating} step="0.1" />
            <NumberField id="golf-slope" label="Slope" value={slope} onChange={setSlope} step="1" />
          </div>

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-900">
            <p className="flex items-center justify-between gap-3">
              <span className="text-zinc-500">Differential for that round</span>
              <span className="font-mono text-zinc-900 dark:text-zinc-100">
                {differentialResult.error ? '—' : format(differentialResult.value ?? 0, 1)}
              </span>
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              disabled={differentialResult.value === null}
              onClick={addDifferential}
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add to index
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                Recent differentials ({differentials.length}/20)
              </p>
              {differentials.length > 0 && (
                <button
                  type="button"
                  onClick={() => setDifferentials([])}
                  className="text-[11px] text-zinc-500 underline-offset-2 hover:text-zinc-800 hover:underline dark:hover:text-zinc-200"
                >
                  Clear all
                </button>
              )}
            </div>
            {differentials.length === 0 ? (
              <p className="rounded-lg border border-dashed border-zinc-300 px-3 py-4 text-center text-[11px] text-zinc-500 dark:border-zinc-700">
                Add a round above to start building an index.
              </p>
            ) : (
              <ul className="max-h-48 space-y-1 overflow-y-auto pr-1">
                {differentials.map((value, index) => (
                  <li
                    key={`${value}-${index}`}
                    className="flex items-center justify-between rounded-md border border-zinc-200 px-2 py-1 text-xs dark:border-zinc-800"
                  >
                    <span className="text-zinc-500">Round {index + 1}</span>
                    <span className="font-mono text-zinc-900 dark:text-zinc-100">{format(value, 1)}</span>
                    <button
                      type="button"
                      aria-label={`Remove round ${index + 1}`}
                      onClick={() => setDifferentials((current) => current.filter((_, i) => i !== index))}
                      className="text-zinc-400 transition-colors hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="text-[11px] text-zinc-500">
            A Handicap Index needs at least three 18-hole differentials and uses the best rounds from the most recent
            20. The WHS table applies a small adjustment when only three to six rounds are available.
          </p>
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <Flag className="h-3.5 w-3.5" /> Handicap Index
          </div>
          {indexResult.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{indexResult.error}</p>
          ) : indexResult.value && (
            <>
              <p className="mt-2 font-mono text-5xl font-bold tabular-nums text-primary-on-dark">
                {indexResult.value.index === null ? '—' : format(indexResult.value.index, 1)}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {indexResult.value.index === null
                  ? 'Add at least three rounds to receive an index.'
                  : `Based on the best ${indexResult.value.used} of ${indexResult.value.differentialsCount} differentials`}
              </p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Differentials entered</dt>
                  <dd className="font-mono text-zinc-100">{indexResult.value.differentialsCount}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Rounds counted</dt>
                  <dd className="font-mono text-zinc-100">{indexResult.value.used}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">WHS adjustment</dt>
                  <dd className="font-mono text-zinc-100">
                    {indexResult.value.adjustment === 0 ? 'None' : format(indexResult.value.adjustment, 1)}
                  </dd>
                </div>
              </dl>

              {indexResult.value.index !== null && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() =>
                    copy(
                      `Handicap Index ${format(indexResult.value?.index ?? 0, 1)} from the best ` +
                        `${indexResult.value?.used} of ${indexResult.value?.differentialsCount} differentials.`
                    )
                  }
                >
                  <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy index
                </Button>
              )}
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Pet calories
// ==========================================

const PET_STAGE_LABELS: Record<PetSpecies, Record<PetStage, string>> = {
  dog: {
    neutered: 'Neutered adult',
    intact: 'Intact adult',
    'weight-loss': 'Weight-loss programme',
    growth: 'Puppy (under 4 months)',
    senior: 'Senior',
  },
  cat: {
    neutered: 'Neutered adult',
    intact: 'Intact adult',
    'weight-loss': 'Weight-loss programme',
    growth: 'Kitten',
    senior: 'Senior',
  },
};

export const PetCalorieCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [species, setSpecies] = useState<PetSpecies>('dog');
  const [stage, setStage] = useState<PetStage>('neutered');
  const [weight, setWeight] = useState('10');
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');

  const result = useMemo(() => {
    try {
      const raw = toNumber(weight);
      const kg = unit === 'kg' ? raw : raw * 0.45359237;
      return { value: petCalories(kg, species, stage), error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter a valid weight.',
      };
    }
  }, [weight, unit, species, stage]);

  const value = result.value;
  const stageOptions = Object.keys(PET_FACTORS[species]) as PetStage[];

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Veterinary estimate</Badge>
        <CardTitle>Pet Calorie Calculator</CardTitle>
        <CardDescription>
          Estimate resting and daily calorie needs for a dog or cat from body weight and life stage.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="pet-species">Species</Label>
              <select
                id="pet-species"
                value={species}
                onChange={(event) => {
                  const next = event.target.value as PetSpecies;
                  setSpecies(next);
                  setStage('neutered');
                }}
                className={SELECT_CLASS}
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pet-stage">Life stage</Label>
              <select
                id="pet-stage"
                value={stage}
                onChange={(event) => setStage(event.target.value as PetStage)}
                className={SELECT_CLASS}
              >
                {stageOptions.map((option) => (
                  <option key={option} value={option}>
                    {PET_STAGE_LABELS[species][option]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              id="pet-weight"
              label="Body weight"
              value={weight}
              onChange={setWeight}
              step="0.1"
              suffix={unit}
            />
            <div className="space-y-1.5">
              <Label htmlFor="pet-unit">Weight unit</Label>
              <select
                id="pet-unit"
                value={unit}
                onChange={(event) => setUnit(event.target.value as 'kg' | 'lb')}
                className={SELECT_CLASS}
              >
                <option value="kg">Kilograms</option>
                <option value="lb">Pounds</option>
              </select>
            </div>
          </div>

          <p className="text-[11px] text-zinc-500">
            Use your pet’s current weight, and ask a veterinarian before changing a diet. Growing, pregnant, and
            medically fragile animals need individual assessment, not a formula.
          </p>
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <PawPrint className="h-3.5 w-3.5" /> Daily calories
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-primary-on-dark">
                {format(value.maintenance, 0)}
                <span className="ml-1 text-base font-normal text-zinc-400">kcal/day</span>
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Maintenance estimate for a {PET_STAGE_LABELS[species][stage].toLowerCase()}
              </p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Resting energy (RER)</dt>
                  <dd className="font-mono text-zinc-100">{format(value.resting, 0)} kcal</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Life-stage factor</dt>
                  <dd className="font-mono text-zinc-100">×{format(value.factor, 2)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Practical range</dt>
                  <dd className="font-mono text-zinc-100">
                    {format(value.maintenance * 0.9, 0)}–{format(value.maintenance * 1.1, 0)} kcal
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Treat allowance (10%)</dt>
                  <dd className="font-mono text-zinc-100">{format(value.maintenance * 0.1, 0)} kcal</dd>
                </div>
              </dl>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `${format(value.maintenance, 0)} kcal/day (RER ${format(value.resting, 0)} kcal × ` +
                      `${format(value.factor, 2)}); practical range ${format(value.maintenance * 0.9, 0)}–` +
                      `${format(value.maintenance * 1.1, 0)} kcal.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy estimate
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};
