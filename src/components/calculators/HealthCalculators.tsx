import React, { useState, useMemo } from 'react';
import { Flame, Moon, Footprints, Copy, Check, RotateCcw, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';
import { useToast } from '../ui/toast';

interface CalculatorProps {
  onSaveHistory?: (summary: string) => void;
}

export const TdeeCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const { toast } = useToast();
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('30');
  const [weight, setWeight] = useState<string>('75');
  const [height, setHeight] = useState<string>('175');
  const [activity, setActivity] = useState<number>(1.55);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const results = useMemo(() => {
    const w = Math.max(0, parseFloat(weight) || 0);
    const h = Math.max(0, parseFloat(height) || 0);
    const a = Math.max(0, parseFloat(age) || 0);

    if (w <= 0 || h <= 0 || a <= 0) {
      return { bmr: 0, tdee: 0, mildCut: 0, weightLoss: 0, leanBulk: 0 };
    }

    const bmr = sex === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = bmr * activity;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      mildCut: Math.round(tdee - 250),
      weightLoss: Math.round(tdee - 500),
      leanBulk: Math.round(tdee + 300),
    };
  }, [sex, age, weight, height, activity]);

  const activityPresets = [
    { label: 'Sedentary', value: 1.2 },
    { label: 'Light', value: 1.375 },
    { label: 'Moderate', value: 1.55 },
    { label: 'Active', value: 1.725 },
    { label: 'Athlete', value: 1.9 },
  ];

  const handleCopySummary = () => {
    const text = `TDEE Summary:\nBMR: ${results.bmr} kcal\nTDEE: ${results.tdee} kcal\nMild Cut: ${results.mildCut} kcal\nWeight Loss: ${results.weightLoss} kcal\nLean Bulk: ${results.leanBulk} kcal`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);

    if (onSaveHistory) {
      onSaveHistory(`TDEE: ${results.tdee} kcal/day (BMR: ${results.bmr})`);
    }
  };

  const handleReset = () => {
    setSex('male');
    setAge('30');
    setWeight('75');
    setHeight('175');
    setActivity(1.55);
  };

  return (
    <Card id="tdee-calculator-container" className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Metabolic Health
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Mifflin-St Jeor</span>
          </div>
          <CardTitle className="text-xl">TDEE & Calorie Calculator</CardTitle>
          <CardDescription>
            Compute your basal metabolic rate and total daily energy expenditure.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExportOpen(true)}
            className="text-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share / Export
          </Button>
          <Button
            id="tdee-reset-button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-xs"
            title="Reset to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <Label>Biological Sex</Label>
              <div className="grid grid-cols-2 gap-1.5">
                <Button
                  type="button"
                  variant={sex === 'male' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSex('male')}
                  className="font-mono text-xs h-9"
                >
                  Male
                </Button>
                <Button
                  type="button"
                  variant={sex === 'female' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSex('female')}
                  className="font-mono text-xs h-9"
                >
                  Female
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="tdee-age">Age</Label>
                <span className="text-xs text-zinc-400 font-mono">years</span>
              </div>
              <div className="relative">
                <Input
                  id="tdee-age"
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="30"
                  className="font-mono font-bold text-sm tabular-nums"
                />
                <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">yr</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="tdee-weight">Weight</Label>
                <span className="text-xs text-zinc-400 font-mono">kilograms</span>
              </div>
              <div className="relative">
                <Input
                  id="tdee-weight"
                  type="number"
                  min="10"
                  max="400"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="75"
                  className="font-mono font-bold text-sm tabular-nums"
                />
                <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">kg</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="tdee-height">Height</Label>
                <span className="text-xs text-zinc-400 font-mono">centimeters</span>
              </div>
              <div className="relative">
                <Input
                  id="tdee-height"
                  type="number"
                  min="40"
                  max="260"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="175"
                  className="font-mono font-bold text-sm tabular-nums"
                />
                <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">cm</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Activity Level</Label>
                <span className="text-xs text-zinc-400 font-mono">×{activity}</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {activityPresets.map((preset) => (
                  <Button
                    key={preset.value}
                    type="button"
                    variant={activity === preset.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActivity(preset.value)}
                    className="font-mono text-xs h-8"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Daily Calorie Targets</span>
                  <span className="inline-flex items-center gap-1 text-zinc-200 font-semibold">
                    <Flame className="w-3.5 h-3.5 text-emerald-400" /> BMR {results.bmr}
                  </span>
                </div>

                <div className="my-4 text-center">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">
                    Total Daily Energy
                  </p>
                  <div className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight tabular-nums">
                    {results.tdee > 0 ? results.tdee.toLocaleString() : '--'}
                    <span className="text-lg ml-1 text-zinc-400">kcal</span>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-mono mt-1 font-semibold">
                    Maintenance level
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">BMR (at rest):</span>
                    <span className="font-bold tabular-nums">{results.bmr.toLocaleString()} kcal</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Mild Cut (−250):</span>
                    <span className="font-bold tabular-nums">{results.mildCut > 0 ? results.mildCut.toLocaleString() : '--'} kcal</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Weight Loss (−500):</span>
                    <span className="font-bold text-emerald-400 tabular-nums">{results.weightLoss > 0 ? results.weightLoss.toLocaleString() : '--'} kcal</span>
                  </div>
                  <div className="flex justify-between text-zinc-100 pt-2 border-t border-zinc-800">
                    <span className="font-semibold">Lean Bulk (+300):</span>
                    <span className="font-bold text-white tabular-nums">{results.leanBulk > 0 ? results.leanBulk.toLocaleString() : '--'} kcal</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <Button
                  id="tdee-copy-button"
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleCopySummary}
                  className="w-full text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard' : 'Copy TDEE Result'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="TDEE & Calorie Calculator"
        title="Daily Energy Expenditure"
        data={{
          'Sex': sex === 'male' ? 'Male' : 'Female',
          'Age': `${age} years`,
          'Weight': `${weight} kg`,
          'Height': `${height} cm`,
          'Activity Level': `×${activity}`,
          'BMR': `${results.bmr} kcal`,
          'TDEE': `${results.tdee} kcal`,
          'Mild Cut': `${results.mildCut} kcal`,
          'Weight Loss': `${results.weightLoss} kcal`,
          'Lean Bulk': `${results.leanBulk} kcal`,
        }}
        summaryText={`TDEE Summary:\nBMR: ${results.bmr} kcal\nTDEE: ${results.tdee} kcal\nMild Cut: ${results.mildCut} kcal\nWeight Loss: ${results.weightLoss} kcal\nLean Bulk: ${results.leanBulk} kcal`}
      />
    </Card>
  );
};

export const SleepCycleCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const { toast } = useToast();
  const [mode, setMode] = useState<'wake' | 'sleep'>('wake');
  const [wakeTime, setWakeTime] = useState<string>('07:00');
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const CYCLE_MS = 90 * 60 * 1000;
  const FALL_ASLEEP_MS = 15 * 60 * 1000;

  const timeToMs = (time: string): number => {
    const [h, m] = time.split(':').map(Number);
    return (h * 60 + m) * 60 * 1000;
  };

  const msToTime = (ms: number): string => {
    let totalMs = ms % (24 * 60 * 60 * 1000);
    if (totalMs < 0) totalMs += 24 * 60 * 60 * 1000;
    const totalMinutes = Math.round(totalMs / 60000);
    const hours = Math.floor(totalMinutes / 60) % 24;
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const formatDuration = (minutes: number): string => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  const results = useMemo(() => {
    if (mode === 'wake') {
      const wakeMs = timeToMs(wakeTime);
      const items = [];
      for (let cycles = 6; cycles >= 4; cycles--) {
        const bedMs = wakeMs - cycles * CYCLE_MS - FALL_ASLEEP_MS;
        const sleepMinutes = (cycles * CYCLE_MS) / 60000;
        items.push({
          time: msToTime(bedMs),
          cycles,
          duration: formatDuration(sleepMinutes),
        });
      }
      return items;
    } else {
      const now = new Date();
      const nowMs = (now.getHours() * 60 + now.getMinutes()) * 60 * 1000;
      const sleepStartMs = nowMs + FALL_ASLEEP_MS;
      const items = [];
      for (let cycles = 1; cycles <= 6; cycles++) {
        const wakeMs = sleepStartMs + cycles * CYCLE_MS;
        const sleepMinutes = (cycles * CYCLE_MS) / 60000;
        items.push({
          time: msToTime(wakeMs),
          cycles,
          duration: formatDuration(sleepMinutes),
        });
      }
      return items;
    }
  }, [mode, wakeTime]);

  const handleCopySummary = () => {
    const label = mode === 'wake' ? 'Bedtime options' : 'Wake time options';
    const text = `Sleep Cycle ${label}:\n${results.map((r) => `${r.time} (${r.cycles} cycles, ${r.duration})`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);

    if (onSaveHistory) {
      onSaveHistory(`Sleep cycles: ${results[0]?.time} (${results[0]?.cycles} cycles)`);
    }
  };

  const handleReset = () => {
    setMode('wake');
    setWakeTime('07:00');
  };

  return (
    <Card id="sleep-calculator-container" className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Sleep Science
            </Badge>
            <span className="text-xs font-mono text-zinc-500">90-Min Cycles</span>
          </div>
          <CardTitle className="text-xl">Sleep Cycle Calculator</CardTitle>
          <CardDescription>
            Find optimal bedtimes or wake times based on 90-minute sleep cycles.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExportOpen(true)}
            className="text-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share / Export
          </Button>
          <Button
            id="sleep-reset-button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-xs"
            title="Reset to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <Label>I need to</Label>
              <div className="grid grid-cols-2 gap-1.5">
                <Button
                  type="button"
                  variant={mode === 'wake' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setMode('wake')}
                  className="font-mono text-xs h-9"
                >
                  <Moon className="w-3.5 h-3.5" />
                  Wake up at
                </Button>
                <Button
                  type="button"
                  variant={mode === 'sleep' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setMode('sleep')}
                  className="font-mono text-xs h-9"
                >
                  <Footprints className="w-3.5 h-3.5" />
                  Go to sleep now
                </Button>
              </div>
            </div>

            {mode === 'wake' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sleep-wake-time">Wake Up Time</Label>
                  <span className="text-xs text-zinc-400 font-mono">HH:MM</span>
                </div>
                <Input
                  id="sleep-wake-time"
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
            )}

            {mode === 'sleep' && (
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-xs font-mono text-zinc-500">
                  Computing wake times from current time + 15 minutes to fall asleep.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label>
                {mode === 'wake' ? 'Optimal Bedtimes' : 'Optimal Wake Times'}
              </Label>
              <div className="space-y-1.5">
                {results.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-mono font-bold text-zinc-950 dark:text-zinc-50 tabular-nums">
                        {item.time}
                      </span>
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {item.cycles} {item.cycles === 1 ? 'cycle' : 'cycles'}
                      </Badge>
                    </div>
                    <span className="text-xs font-mono text-zinc-500 tabular-nums">
                      {item.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Sleep Summary</span>
                  <span className="inline-flex items-center gap-1 text-zinc-200 font-semibold">
                    <Moon className="w-3.5 h-3.5 text-emerald-400" /> {results.length} options
                  </span>
                </div>

                <div className="my-4 text-center">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">
                    {mode === 'wake' ? 'Best Bedtime' : 'Best Wake Time'}
                  </p>
                  <div className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight tabular-nums">
                    {results[0]?.time || '--'}
                  </div>
                  <p className="text-[11px] text-emerald-400 font-mono mt-1 font-semibold">
                    {results[0]?.cycles} cycles — {results[0]?.duration}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Cycle Length:</span>
                    <span className="font-bold tabular-nums">90 minutes</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Fall Asleep Buffer:</span>
                    <span className="font-bold tabular-nums">15 minutes</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Recommended:</span>
                    <span className="font-bold text-emerald-400 tabular-nums">4–6 cycles</span>
                  </div>
                  <div className="flex justify-between text-zinc-100 pt-2 border-t border-zinc-800">
                    <span className="font-semibold">Optimal Sleep:</span>
                    <span className="font-bold text-white tabular-nums">6–9 hours</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <Button
                  id="sleep-copy-button"
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleCopySummary}
                  className="w-full text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Sleep Schedule'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Sleep Cycle Calculator"
        title="Optimal Sleep Schedule"
        data={{
          'Mode': mode === 'wake' ? 'Wake Up At' : 'Sleep Now',
          'Target': mode === 'wake' ? wakeTime : 'Now',
          'Best Option': `${results[0]?.time} (${results[0]?.cycles} cycles, ${results[0]?.duration})`,
          'All Options': results.map((r) => `${r.time} (${r.cycles}c)`).join(', '),
        }}
        summaryText={`Sleep Cycle ${mode === 'wake' ? 'Bedtimes' : 'Wake Times'}:\n${results.map((r) => `${r.time} (${r.cycles} cycles, ${r.duration})`).join('\n')}`}
      />
    </Card>
  );
};

export const StepsToMilesCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const { toast } = useToast();
  const [steps, setSteps] = useState<string>('10000');
  const [strideLength, setStrideLength] = useState<string>('76');
  const [weight, setWeight] = useState<string>('70');
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const results = useMemo(() => {
    const s = Math.max(0, parseFloat(steps) || 0);
    const sl = Math.max(0, parseFloat(strideLength) || 0);
    const w = Math.max(0, parseFloat(weight) || 0);

    if (s <= 0 || sl <= 0) {
      return { distanceKm: 0, distanceMiles: 0, calories: 0, rate: 0 };
    }

    const distanceKm = (s * sl) / 100000;
    const distanceMiles = distanceKm * 0.621371;
    const calories = distanceKm * w * 0.53;
    const rate = s > 0 ? calories / s : 0;

    return {
      distanceKm: parseFloat(distanceKm.toFixed(3)),
      distanceMiles: parseFloat(distanceMiles.toFixed(3)),
      calories: Math.round(calories),
      rate: parseFloat((calories / s).toFixed(4)),
    };
  }, [steps, strideLength, weight]);

  const handleCopySummary = () => {
    const text = `Step Distance:\nSteps: ${parseInt(steps) || 0}\nDistance: ${results.distanceKm} km (${results.distanceMiles} mi)\nCalories Burned: ~${results.calories} kcal`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);

    if (onSaveHistory) {
      onSaveHistory(`Steps: ${parseInt(steps) || 0} → ${results.distanceMiles} mi, ~${results.calories} kcal`);
    }
  };

  const handleReset = () => {
    setSteps('10000');
    setStrideLength('76');
    setWeight('70');
  };

  return (
    <Card id="steps-calculator-container" className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Activity Tracking
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Distance & Calories</span>
          </div>
          <CardTitle className="text-xl">Steps to Miles Calculator</CardTitle>
          <CardDescription>
            Convert step count into distance and estimate calories burned.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExportOpen(true)}
            className="text-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share / Export
          </Button>
          <Button
            id="steps-reset-button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-xs"
            title="Reset to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="steps-count">Step Count</Label>
                <span className="text-xs text-zinc-400 font-mono">steps</span>
              </div>
              <div className="relative">
                <Input
                  id="steps-count"
                  type="number"
                  min="0"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  placeholder="10000"
                  className="font-mono font-bold text-sm tabular-nums"
                />
                <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">steps</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="stride-length">Stride Length</Label>
                <span className="text-xs text-zinc-400 font-mono">centimeters</span>
              </div>
              <div className="relative">
                <Input
                  id="stride-length"
                  type="number"
                  min="1"
                  max="200"
                  step="1"
                  value={strideLength}
                  onChange={(e) => setStrideLength(e.target.value)}
                  placeholder="76"
                  className="font-mono font-bold text-sm tabular-nums"
                />
                <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">cm</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="steps-weight">Body Weight</Label>
                <span className="text-xs text-zinc-400 font-mono">kilograms</span>
              </div>
              <div className="relative">
                <Input
                  id="steps-weight"
                  type="number"
                  min="10"
                  max="400"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                  className="font-mono font-bold text-sm tabular-nums"
                />
                <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">kg</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase text-zinc-600 dark:text-zinc-400 font-semibold block mb-1.5">
                Common Steps:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[2000, 5000, 8000, 10000, 15000].map((preset) => (
                  <Button
                    key={preset}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSteps(String(preset))}
                    className="h-7 text-xs font-mono"
                  >
                    {preset.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Distance & Energy</span>
                  <span className="inline-flex items-center gap-1 text-zinc-200 font-semibold">
                    <Footprints className="w-3.5 h-3.5 text-emerald-400" /> {(parseInt(steps) || 0).toLocaleString()} steps
                  </span>
                </div>

                <div className="my-4 text-center">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">
                    Total Distance
                  </p>
                  <div className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight tabular-nums">
                    {results.distanceMiles > 0 ? results.distanceMiles : '--'}
                    <span className="text-lg ml-1 text-zinc-400">mi</span>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-mono mt-1 font-semibold">
                    {results.distanceKm > 0 ? `${results.distanceKm} km` : '-- km'}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Distance (km):</span>
                    <span className="font-bold tabular-nums">{results.distanceKm > 0 ? results.distanceKm : '--'} km</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Distance (miles):</span>
                    <span className="font-bold tabular-nums">{results.distanceMiles > 0 ? results.distanceMiles : '--'} mi</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Est. Calories:</span>
                    <span className="font-bold text-emerald-400 tabular-nums">{results.calories > 0 ? `~${results.calories} kcal` : '--'}</span>
                  </div>
                  <div className="flex justify-between text-zinc-100 pt-2 border-t border-zinc-800">
                    <span className="font-semibold">Cal per Step:</span>
                    <span className="font-bold text-white tabular-nums">{results.rate > 0 ? results.rate.toFixed(4) : '--'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <Button
                  id="steps-copy-button"
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleCopySummary}
                  className="w-full text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Steps Result'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Steps to Miles Calculator"
        title="Step Distance Report"
        data={{
          'Steps': (parseInt(steps) || 0).toLocaleString(),
          'Stride Length': `${strideLength} cm`,
          'Body Weight': `${weight} kg`,
          'Distance (km)': results.distanceKm,
          'Distance (miles)': results.distanceMiles,
          'Calories Burned': `~${results.calories} kcal`,
          'Cal/Step': results.rate.toFixed(4),
        }}
        summaryText={`Steps: ${(parseInt(steps) || 0).toLocaleString()}\nDistance: ${results.distanceKm} km (${results.distanceMiles} mi)\nCalories: ~${results.calories} kcal`}
      />
    </Card>
  );
};
