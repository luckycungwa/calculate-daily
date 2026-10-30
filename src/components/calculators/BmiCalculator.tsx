import React, { useState, useMemo } from 'react';
import { Activity, RotateCcw, Copy, Check, HeartPulse, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';
import { ExportModal } from '../common/ExportModal';
import { useToast } from '../ui/toast';
import {
  BMI_DIAL,
  BMI_ZONES,
  bmiValue,
  bmiZoneFor,
  healthyWeightRange,
  kgToPounds,
  poundsToKg,
} from '../../lib/bmi';
import { CalculationAssumptions, ResultDataTable, ResultGauge, ResultTableToggle } from '../results/ResultComponents';

interface BmiCalculatorProps {
  onSaveHistory?: (summary: string) => void;
}

type UnitMode = 'metric' | 'imperial';

// Dial geometry comes from the engine so the legend, gauge and table share it.
// The first band starts at the dial floor; every zone stops at the next WHO cut-off.
const BMI_DIAL_ZONES = BMI_ZONES.map((zone) => ({
  to: zone.upper === Infinity ? BMI_DIAL.scaleMax : zone.upper,
  color: zone.color,
}));

const BMI_ZONES_LEGEND = BMI_ZONES.map((zone) => ({
  label: zone.label.replace('weight', ''),
  range: zone.range,
  color: zone.color,
}));

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

  // Compute BMI — all formulas live in the engine module, never in the UI.
  const results = useMemo(() => {
    let weightInKg = 0;
    let heightInMeters = 0;

    if (unitMode === 'metric') {
      weightInKg = Math.max(0, parseFloat(weightKg) || 0);
      heightInMeters = Math.max(0, (parseFloat(heightCm) || 0) / 100);
    } else {
      const lbs = Math.max(0, parseFloat(weightLbs) || 0);
      weightInKg = poundsToKg(lbs);
      const ft = Math.max(0, parseFloat(heightFt) || 0);
      const inches = Math.max(0, parseFloat(heightIn) || 0);
      heightInMeters = (ft * 12 + inches) * 0.0254;
    }

    if (weightInKg <= 0 || heightInMeters <= 0) {
      return {
        bmi: 0,
        category: 'Enter measurements',
        zoneId: '',
        minHealthyWeightKg: 0,
        maxHealthyWeightKg: 0,
        minHealthyWeightLbs: 0,
        maxHealthyWeightLbs: 0,
        advice: 'Enter weight and standing height to compute your Body Mass Index.',
      };
    }

    const bmiFormatted = parseFloat(bmiValue(weightInKg, heightInMeters).toFixed(1));
    const zone = bmiZoneFor(bmiFormatted);
    const healthy = healthyWeightRange(heightInMeters);

    const advice = {
      under:
        'BMI indicates underweight. Nutrient-dense whole foods and strength conditioning are recommended.',
      normal: 'Standard recommended weight bracket for your height profile.',
      over: 'Slightly above standard range. Moderate cardiovascular conditioning and portion monitoring recommended.',
      obese:
        'Consulting a primary healthcare provider can help tailor sustainable metabolic health goals.',
    }[zone.id];

    return {
      bmi: bmiFormatted,
      category: zone.label,
      zoneId: zone.id,
      advice,
      minHealthyWeightKg: healthy.min,
      maxHealthyWeightKg: healthy.max,
      minHealthyWeightLbs: kgToPounds(healthy.min),
      maxHealthyWeightLbs: kgToPounds(healthy.max),
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
          {/* Unit toggle. Was a Radix Tabs list with no TabsContent, which left
              every trigger pointing aria-controls at an element that never
              existed. A pressed-button group carries the same meaning without
              inventing a tab panel. */}
          <div
            role="group"
            aria-label="Unit system"
            className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-700/60 dark:bg-zinc-800"
          >
            {(['metric', 'imperial'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={unitMode === mode}
                onClick={() => setUnitMode(mode)}
                className={cn(
                  'cursor-pointer rounded-md px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  unitMode === mode
                    ? 'bg-white text-zinc-950 shadow-2xs dark:bg-zinc-900 dark:text-zinc-50'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50'
                )}
              >
                {mode === 'metric' ? 'Metric' : 'Imperial'}
              </button>
            ))}
          </div>

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
                    <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400">kg</span>
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
                    <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400">cm</span>
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
                    <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400">lbs</span>
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
                      <span className="absolute right-3 top-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">ft</span>
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
                      <span className="absolute right-3 top-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">in</span>
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
                  <ResultGauge
                    value={results.bmi}
                    min={BMI_DIAL.scaleMin}
                    max={BMI_DIAL.scaleMax}
                    zones={BMI_DIAL_ZONES}
                    accent="#6366f1"
                    ticks={3}
                    caption="BMI"
                    ariaLabel={`Body mass index ${results.bmi.toFixed(1)}, ${results.category}. The scale runs from ${BMI_DIAL.scaleMin} to ${BMI_DIAL.scaleMax}.`}
                    legend={BMI_ZONES.map((zone) => ({
                      label: zone.label,
                      range: zone.range,
                      color: zone.color,
                    }))}
                    activeZoneId={results.category}
                    summary={`A BMI of ${results.bmi.toFixed(1)} kg/m² falls in the ${results.category.toLowerCase()} band. The healthy weight range for the height you entered is ${results.minHealthyWeightKg}–${results.maxHealthyWeightKg} kg, shown under the gauge.`}
                    note="BMI is a screening ratio of weight to height, not a diagnosis. It does not measure body fat and over- or under-estimates it for athletes, older adults, pregnant people, and children — this tool uses WHO adult cut-offs only."
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

              {/* Category ranges as a table: the numerical a11y breakdown of the dial */}
              {results.bmi > 0 && (
                <div className="mt-4 w-full text-left">
                  <ResultTableToggle label="View category ranges as a table">
                    <ResultDataTable
                      columns={['Category', 'BMI range (kg/m²)']}
                      rows={BMI_ZONES.map((zone) => [zone.label, zone.range])}
                      caption="WHO Body Mass Index category ranges for adults 18 and over."
                    />
                  </ResultTableToggle>
                </div>
              )}
            </div>

            {/* Target Range Box */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-3.5 border border-zinc-200 dark:border-zinc-800 text-xs flex items-center justify-between">
              <div>
                <span className="text-zinc-600 dark:text-zinc-400 text-[11px] block font-mono font-semibold">Normal Weight Range:</span>
                <span className="font-mono tabular-nums text-brand font-bold text-sm">
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
                {copied ? <Check className="w-3.5 h-3.5 text-brand" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
        </div>

        <CalculationAssumptions
          className="mt-6"
          items={[
            {
              label: 'BMI formula',
              detail: 'BMI = weight (kg) / height (m)². Imperial inputs are converted exactly (1 lb = 0.45359237 kg, 1 in = 0.0254 m) before the same formula runs.',
              badge: 'formula',
            },
            {
              label: 'Category cut-offs',
              detail: 'WHO adult cut-offs for people 18 and over: underweight below 18.5, normal 18.5–24.9, overweight 25–29.9, obese 30 and above. The dial, legend and table above all read these from the same list.',
              badge: 'published',
              source: { label: 'WHO classification of BMI', href: 'https://www.who.int/data/gho/indicator-definition-repository/details/indicor-details-page/body-mass-index-(bmi)' },
            },
            {
              label: 'Healthy weight range',
              detail: 'The span of weights that lands inside the normal band for your height: 18.5 × height² to 24.9 × height².',
              badge: 'formula',
            },
            {
              label: 'Your measurements',
              detail: 'Weight and height are user-entered; a wrong or stale measurement shifts everything this tool reports.',
              badge: 'assumption',
            },
          ]}
          caveat="BMI is one screening number. It does not measure body fat, fitness or health risk, and it is not diagnostic — individual decisions need a healthcare professional."
        />
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
