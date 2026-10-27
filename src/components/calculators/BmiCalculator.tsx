import React, { useState, useMemo } from 'react';
import { Activity, RotateCcw, Copy, Check, HeartPulse, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { ExportModal } from '../common/ExportModal';
import { DialGauge } from '../common/DialGauge';
import { useToast } from '../ui/toast';

interface BmiCalculatorProps {
  onSaveHistory?: (summary: string) => void;
}

type UnitMode = 'metric' | 'imperial';

/**
 * WHO cut-offs. The coloured band on the dial and the legend below share this
 * one list so the two can never disagree.
 */
const BMI_ZONES = [
  { id: 'under', label: 'Under', range: '< 18.5', color: '#0ea5e9' },
  { id: 'normal', label: 'Normal', range: '18.5 - 24.9', color: '#10b981' },
  { id: 'over', label: 'Over', range: '25 - 29.9', color: '#f59e0b' },
  { id: 'obese', label: 'Obese', range: '30+', color: '#f43f5e' },
] as const;

const BMI_DIAL_ZONES = BMI_ZONES.map((zone) => ({
  to: zone.id === 'under' ? 18.5 : zone.id === 'normal' ? 25 : zone.id === 'over' ? 30 : 40,
  color: zone.color,
}));

const BMI_CATEGORY_ID: Record<string, string> = {
  Underweight: 'under',
  'Normal weight': 'normal',
  Overweight: 'over',
  Obese: 'obese',
};

export const BmiCalculator: React.FC<BmiCalculatorProps> = ({ onSaveHistory }) => {
  const { toast } = useToast();
  const [unitMode, setUnitMode] = useState<UnitMode>('metric');

  // Metric state
  const [weightKg, setWeightKg] = useState<string>('70');
  const [heightCm, setHeightCm] = useState<string>('175');

  // Imperial state
  const [weightLbs, setWeightLbs] = useState<string>('154');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('9');

  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Compute BMI
  const results = useMemo(() => {
    let weightInKg = 0;
    let heightInMeters = 0;

    if (unitMode === 'metric') {
      weightInKg = Math.max(0, parseFloat(weightKg) || 0);
      heightInMeters = Math.max(0, (parseFloat(heightCm) || 0) / 100);
    } else {
      const lbs = Math.max(0, parseFloat(weightLbs) || 0);
      weightInKg = lbs * 0.45359237;
      const ft = Math.max(0, parseFloat(heightFt) || 0);
      const inches = Math.max(0, parseFloat(heightIn) || 0);
      const totalInches = ft * 12 + inches;
      heightInMeters = totalInches * 0.0254;
    }

    if (weightInKg <= 0 || heightInMeters <= 0) {
      return {
        bmi: 0,
        category: 'Enter measurements',
        minHealthyWeightKg: 0,
        maxHealthyWeightKg: 0,
        minHealthyWeightLbs: 0,
        maxHealthyWeightLbs: 0,
        advice: 'Enter weight and standing height to compute your Body Mass Index.',
      };
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    const bmiFormatted = parseFloat(bmiValue.toFixed(1));

    let category = 'Normal weight';
    let advice = 'Your BMI falls within the healthy standard range. Maintain balanced nutrition and daily movement.';

    if (bmiFormatted < 18.5) {
      category = 'Underweight';
      advice = 'BMI indicates underweight. Nutrient-dense whole foods and strength conditioning are recommended.';
    } else if (bmiFormatted <= 24.9) {
      category = 'Normal weight';
      advice = 'Standard recommended weight bracket for your height profile.';
    } else if (bmiFormatted <= 29.9) {
      category = 'Overweight';
      advice = 'Slightly above standard range. Moderate cardiovascular conditioning and portion monitoring recommended.';
    } else {
      category = 'Obese';
      advice = 'Consulting a primary healthcare provider can help tailor sustainable metabolic health goals.';
    }

    const minHealthyKg = 18.5 * (heightInMeters * heightInMeters);
    const maxHealthyKg = 24.9 * (heightInMeters * heightInMeters);

    return {
      bmi: bmiFormatted,
      category,
      advice,
      minHealthyWeightKg: parseFloat(minHealthyKg.toFixed(1)),
      maxHealthyWeightKg: parseFloat(maxHealthyKg.toFixed(1)),
      minHealthyWeightLbs: parseFloat((minHealthyKg * 2.20462).toFixed(1)),
      maxHealthyWeightLbs: parseFloat((maxHealthyKg * 2.20462).toFixed(1)),
    };
  }, [unitMode, weightKg, heightCm, weightLbs, heightFt, heightIn]);

  const handleCopy = () => {
    const text = `BMI Health Summary:\nScore: ${results.bmi} (${results.category})\nTarget Healthy Weight: ${
      unitMode === 'metric'
        ? `${results.minHealthyWeightKg} - ${results.maxHealthyWeightKg} kg`
        : `${results.minHealthyWeightLbs} - ${results.maxHealthyWeightLbs} lbs`
    }`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);

    if (onSaveHistory) {
      onSaveHistory(`BMI: ${results.bmi} (${results.category})`);
    }
  };

  const handleReset = () => {
    setWeightKg('70');
    setHeightCm('175');
    setWeightLbs('154');
    setHeightFt('5');
    setHeightIn('9');
  };

  return (
    <Card id="bmi-calculator-container" className="p-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Health Index
            </Badge>
            <span className="text-xs font-mono text-zinc-500">WHO Standard</span>
          </div>
          <CardTitle className="text-xl">BMI & Body Health</CardTitle>
          <CardDescription>
            Compute Body Mass Index with Metric or Imperial standard units.
          </CardDescription>
        </div>

        {/* Unit Toggle & Actions */}
        <div className="flex items-center gap-2">
          <Tabs value={unitMode} onValueChange={(val) => setUnitMode(val as UnitMode)}>
            <TabsList className="h-8">
              <TabsTrigger value="metric" className="text-xs py-1">
                Metric
              </TabsTrigger>
              <TabsTrigger value="imperial" className="text-xs py-1">
                Imperial
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsExportOpen(true)}
            className="h-8 w-8"
            title="Export"
          >
            <Share2 className="w-3.5 h-3.5" />
          </Button>

          <Button
            id="bmi-reset-button"
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="h-8 w-8"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Inputs */}
          <div className="lg:col-span-6 space-y-4">
            {unitMode === 'metric' ? (
              <>
                {/* Weight Metric */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="bmi-weight-kg">Body Weight (kg)</Label>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono font-medium">kg</span>
                  </div>
                  <div className="relative">
                    <Input
                      id="bmi-weight-kg"
                      type="number"
                      min="10"
                      max="400"
                      step="0.5"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      className="font-mono font-bold text-sm pr-9 tabular-nums"
                    />
                    <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">kg</span>
                  </div>
                </div>

                {/* Height Metric */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="bmi-height-cm">Standing Height (cm)</Label>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono font-medium">cm</span>
                  </div>
                  <div className="relative">
                    <Input
                      id="bmi-height-cm"
                      type="number"
                      min="40"
                      max="260"
                      step="1"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      className="font-mono font-bold text-sm pr-9 tabular-nums"
                    />
                    <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">cm</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Weight Imperial */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="bmi-weight-lbs">Body Weight (lbs)</Label>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono font-medium">lbs</span>
                  </div>
                  <div className="relative">
                    <Input
                      id="bmi-weight-lbs"
                      type="number"
                      min="20"
                      max="800"
                      step="1"
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(e.target.value)}
                      className="font-mono font-bold text-sm pr-9 tabular-nums"
                    />
                    <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">lbs</span>
                  </div>
                </div>

                {/* Height Imperial */}
                <div className="space-y-1.5">
                  <Label>Height (Feet & Inches)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <Input
                        id="bmi-height-ft"
                        type="number"
                        min="1"
                        max="8"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        placeholder="Feet"
                        className="font-mono font-bold text-sm pr-8 tabular-nums"
                      />
                      <span className="absolute right-3 top-2 text-xs font-mono text-zinc-400">ft</span>
                    </div>
                    <div className="relative">
                      <Input
                        id="bmi-height-in"
                        type="number"
                        min="0"
                        max="11"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        placeholder="Inches"
                        className="font-mono font-bold text-sm pr-8 tabular-nums"
                      />
                      <span className="absolute right-3 top-2 text-xs font-mono text-zinc-400">in</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Quick presets */}
            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase text-zinc-600 dark:text-zinc-400 font-semibold block mb-1.5">
                Profiles:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setUnitMode('metric');
                    setWeightKg('65');
                    setHeightCm('172');
                  }}
                  className="h-7 text-xs font-mono"
                >
                  65kg / 172cm
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setUnitMode('metric');
                    setWeightKg('85');
                    setHeightCm('180');
                  }}
                  className="h-7 text-xs font-mono"
                >
                  85kg / 180cm
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setUnitMode('metric');
                    setWeightKg('52');
                    setHeightCm('160');
                  }}
                  className="h-7 text-xs font-mono"
                >
                  52kg / 160cm
                </Button>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-6 flex flex-col items-center text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-semibold">
                Calculated Score
              </span>

              <div className="mt-1 w-full max-w-[19rem]">
                {results.bmi > 0 ? (
                  <DialGauge
                    value={results.bmi}
                    min={10}
                    max={40}
                    zones={BMI_DIAL_ZONES}
                    accent="#10b981"
                    ticks={3}
                    caption="BMI"
                    ariaLabel={`Body mass index ${results.bmi.toFixed(1)}, ${results.category}. The scale runs from 10 to 40.`}
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center font-mono text-5xl font-bold text-zinc-300 dark:text-zinc-700">
                    --
                  </div>
                )}
              </div>

              <div className="mt-2 mb-3">
                <Badge variant={results.category === 'Normal weight' ? 'success' : 'outline'} className="font-mono text-xs font-bold">
                  {results.category}
                </Badge>
              </div>

              <p className="text-xs text-zinc-700 dark:text-zinc-300 max-w-sm leading-relaxed font-medium">
                {results.advice}
              </p>

              {/* Zone legend: the same bands the dial paints */}
              <ul className="mt-5 grid w-full grid-cols-2 gap-x-3 gap-y-2 text-left">
                {BMI_ZONES.map((zone) => {
                  const active = BMI_CATEGORY_ID[results.category] === zone.id;
                  return (
                    <li
                      key={zone.id}
                      className={`flex items-center gap-2 ${active ? '' : 'opacity-55'}`}
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: zone.color }}
                      />
                      <span className="min-w-0">
                        <span
                          className={`block text-[11px] leading-tight ${
                            active
                              ? 'font-bold text-zinc-900 dark:text-zinc-50'
                              : 'font-medium text-zinc-600 dark:text-zinc-400'
                          }`}
                        >
                          {zone.label}
                        </span>
                        <span className="block font-mono text-[10px] leading-tight text-zinc-500 dark:text-zinc-500">
                          {zone.range}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Target Range Box */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-3.5 border border-zinc-200 dark:border-zinc-800 text-xs flex items-center justify-between">
              <div>
                <span className="text-zinc-600 dark:text-zinc-400 text-[11px] block font-mono font-semibold">Normal Weight Range:</span>
                <span className="font-mono tabular-nums text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  {unitMode === 'metric'
                    ? `${results.minHealthyWeightKg} kg – ${results.maxHealthyWeightKg} kg`
                    : `${results.minHealthyWeightLbs} lbs – ${results.maxHealthyWeightLbs} lbs`}
                </span>
              </div>
              <Button
                id="bmi-copy-button"
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="text-xs h-7"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="BMI & Body Health"
        title="Body Mass Index Report"
        data={{
          'Unit System': unitMode.toUpperCase(),
          'BMI Score': results.bmi,
          'Health Category': results.category,
          'Healthy Weight Range':
            unitMode === 'metric'
              ? `${results.minHealthyWeightKg} - ${results.maxHealthyWeightKg} kg`
              : `${results.minHealthyWeightLbs} - ${results.maxHealthyWeightLbs} lbs`,
        }}
        summaryText={`BMI Health Summary:\nScore: ${results.bmi} (${results.category})\nTarget Healthy Weight: ${
          unitMode === 'metric'
            ? `${results.minHealthyWeightKg} - ${results.maxHealthyWeightKg} kg`
            : `${results.minHealthyWeightLbs} - ${results.maxHealthyWeightLbs} lbs`
        }`}
      />
    </Card>
  );
};
