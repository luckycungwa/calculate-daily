import React, { useState, useMemo } from 'react';
import { Sigma, GraduationCap, Copy, Check, RotateCcw, Share2 } from 'lucide-react';
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

const parseNumbers = (input: string): number[] => {
  return input
    .split(/[,\s\n]+/)
    .map((s) => s.trim())
    .filter((s) => s !== '' && !isNaN(Number(s)))
    .map(Number);
};

export const StandardDeviationCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const { toast } = useToast();
  const [input, setInput] = useState<string>('85, 90, 78, 92, 88, 76, 95, 89');
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const results = useMemo(() => {
    const nums = parseNumbers(input);
    const n = nums.length;
    if (n === 0) {
      return { count: 0, sum: 0, mean: 0, median: 0, sampleVariance: 0, populationVariance: 0, sampleStdDev: 0, populationStdDev: 0, min: 0, max: 0, range: 0 };
    }
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(n / 2);
    const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const min = sorted[0];
    const max = sorted[n - 1];
    const range = max - min;
    const sqDiffs = nums.map((v) => (v - mean) ** 2);
    const populationVariance = sqDiffs.reduce((a, b) => a + b, 0) / n;
    const sampleVariance = n > 1 ? sqDiffs.reduce((a, b) => a + b, 0) / (n - 1) : 0;
    return {
      count: n, sum: parseFloat(sum.toFixed(4)), mean: parseFloat(mean.toFixed(4)),
      median: parseFloat(median.toFixed(4)), sampleVariance: parseFloat(sampleVariance.toFixed(4)),
      populationVariance: parseFloat(populationVariance.toFixed(4)),
      sampleStdDev: parseFloat(Math.sqrt(sampleVariance).toFixed(4)),
      populationStdDev: parseFloat(Math.sqrt(populationVariance).toFixed(4)),
      min, max, range: parseFloat(range.toFixed(4)),
    };
  }, [input]);

  const handleCopySummary = () => {
    const text = `Statistics:\nCount: ${results.count}\nMean: ${results.mean}\nMedian: ${results.median}\nSample Std Dev: ${results.sampleStdDev}\nRange: ${results.min} - ${results.max}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
    if (onSaveHistory) onSaveHistory(`Stats (n=${results.count}): mean=${results.mean}, sd=${results.sampleStdDev}`);
  };

  const handleReset = () => setInput('85, 90, 78, 92, 88, 76, 95, 89');

  return (
    <Card id="stddev-calculator-container" className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">Statistical Analysis</Badge>
            <span className="text-xs font-mono text-zinc-500">Sample &amp; Population</span>
          </div>
          <CardTitle className="text-xl">Standard Deviation Calculator</CardTitle>
          <CardDescription>Compute variance, standard deviation, and key statistics for any dataset.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsExportOpen(true)} className="text-xs">
            <Share2 className="w-3.5 h-3.5" /> Share / Export
          </Button>
          <Button id="stddev-reset-button" variant="outline" size="sm" onClick={handleReset} className="text-xs" title="Reset to defaults">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="stddev-input">Dataset Values</Label>
                <span className="text-xs text-zinc-400 font-mono">{results.count} {results.count === 1 ? 'number' : 'numbers'}</span>
              </div>
              <textarea
                id="stddev-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter numbers separated by commas, spaces, or new lines..."
                rows={6}
                className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm font-mono font-bold tabular-nums placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] font-mono uppercase text-zinc-500 block mb-1">Min</span>
                <span className="text-lg font-mono font-bold tabular-nums">{results.count > 0 ? results.min : '--'}</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] font-mono uppercase text-zinc-500 block mb-1">Max</span>
                <span className="text-lg font-mono font-bold tabular-nums">{results.count > 0 ? results.max : '--'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Analysis Results</span>
                  <span className="inline-flex items-center gap-1 text-zinc-200 font-semibold">
                    <Sigma className="w-3.5 h-3.5 text-emerald-400" /> n={results.count}
                  </span>
                </div>
                <div className="my-4 text-center">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">Sample Std Deviation</p>
                  <div className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight tabular-nums">{results.count > 0 ? results.sampleStdDev : '--'}</div>
                  <p className="text-[11px] text-emerald-400 font-mono mt-1 font-semibold">Most commonly used</p>
                </div>
                <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-200"><span className="text-zinc-400">Count:</span><span className="font-bold tabular-nums">{results.count}</span></div>
                  <div className="flex justify-between text-zinc-200"><span className="text-zinc-400">Sum:</span><span className="font-bold tabular-nums">{results.sum}</span></div>
                  <div className="flex justify-between text-zinc-200"><span className="text-zinc-400">Mean:</span><span className="font-bold tabular-nums">{results.mean}</span></div>
                  <div className="flex justify-between text-zinc-200"><span className="text-zinc-400">Median:</span><span className="font-bold tabular-nums">{results.median}</span></div>
                  <div className="flex justify-between text-zinc-200 pt-2 border-t border-zinc-800"><span className="text-zinc-400">Sample Variance:</span><span className="font-bold tabular-nums">{results.sampleVariance}</span></div>
                  <div className="flex justify-between text-zinc-200"><span className="text-zinc-400">Pop. Variance:</span><span className="font-bold tabular-nums">{results.populationVariance}</span></div>
                  <div className="flex justify-between text-zinc-200"><span className="text-zinc-400">Pop. Std Dev:</span><span className="font-bold tabular-nums">{results.populationStdDev}</span></div>
                  <div className="flex justify-between text-zinc-100 pt-2 border-t border-zinc-800"><span className="font-semibold">Range:</span><span className="font-bold text-white tabular-nums">{results.count > 0 ? `${results.min} - ${results.max}` : '--'}</span></div>
                </div>
              </div>
              <div className="pt-3 border-t border-zinc-800">
                <Button id="stddev-copy-button" type="button" variant="primary" size="sm" onClick={handleCopySummary} className="w-full text-xs">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Statistics'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Standard Deviation Calculator"
        title="Statistical Analysis Report"
        data={{
          'Count': results.count, 'Sum': results.sum, 'Mean': results.mean, 'Median': results.median,
          'Sample Std Dev': results.sampleStdDev, 'Pop. Std Dev': results.populationStdDev,
          'Sample Variance': results.sampleVariance, 'Pop. Variance': results.populationVariance,
          'Min': results.min, 'Max': results.max, 'Range': results.range,
        }}
        summaryText={`Statistics (n=${results.count}):\nMean: ${results.mean}\nMedian: ${results.median}\nSample Std Dev: ${results.sampleStdDev}\nRange: ${results.min} - ${results.max}`}
      />
    </Card>
  );
};

export const MeanMedianModeCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const { toast } = useToast();
  const [input, setInput] = useState<string>('4, 7, 9, 10, 15, 15, 15, 20, 22');
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const results = useMemo(() => {
    const nums = parseNumbers(input);
    const n = nums.length;
    if (n === 0) return { count: 0, sum: 0, mean: 0, median: 0, modes: [] as number[], range: 0 };
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(n / 2);
    const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const freq = new Map<number, number>();
    nums.forEach((v) => freq.set(v, (freq.get(v) || 0) + 1));
    const maxFreq = Math.max(...Array.from(freq.values()));
    const modes = maxFreq > 1 ? Array.from(freq.entries()).filter(([, f]) => f === maxFreq).map(([v]) => v).sort((a, b) => a - b) : [];
    return { count: n, sum: parseFloat(sum.toFixed(4)), mean: parseFloat(mean.toFixed(4)), median: parseFloat(median.toFixed(4)), modes, range: parseFloat((sorted[n - 1] - sorted[0]).toFixed(4)) };
  }, [input]);

  const handleCopySummary = () => {
    const modeStr = results.modes.length > 0 ? results.modes.join(', ') : 'None';
    const text = `Mean/Median/Mode:\nCount: ${results.count}\nMean: ${results.mean}\nMedian: ${results.median}\nMode: ${modeStr}\nRange: ${results.range}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
    if (onSaveHistory) onSaveHistory(`Mean=${results.mean}, Median=${results.median}, Mode=${results.modes.length > 0 ? results.modes.join(',') : 'none'}`);
  };

  const handleReset = () => setInput('4, 7, 9, 10, 15, 15, 15, 20, 22');

  return (
    <Card id="mean-median-mode-container" className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">Central Tendency</Badge>
            <span className="text-xs font-mono text-zinc-500">Mean, Median &amp; Mode</span>
          </div>
          <CardTitle className="text-xl">Mean, Median &amp; Mode Calculator</CardTitle>
          <CardDescription>Find the central tendency measures for any set of numbers.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsExportOpen(true)} className="text-xs">
            <Share2 className="w-3.5 h-3.5" /> Share / Export
          </Button>
          <Button id="mmm-reset-button" variant="outline" size="sm" onClick={handleReset} className="text-xs" title="Reset to defaults">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="mmm-input">Dataset Values</Label>
                <span className="text-xs text-zinc-400 font-mono">{results.count} {results.count === 1 ? 'number' : 'numbers'}</span>
              </div>
              <textarea
                id="mmm-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter numbers separated by commas, spaces, or new lines..."
                rows={6}
                className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm font-mono font-bold tabular-nums placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] font-mono uppercase text-zinc-500 block mb-1">Range</span>
                <span className="text-lg font-mono font-bold tabular-nums">{results.count > 0 ? results.range : '--'}</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] font-mono uppercase text-zinc-500 block mb-1">Sum</span>
                <span className="text-lg font-mono font-bold tabular-nums">{results.count > 0 ? results.sum : '--'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Central Tendency</span>
                  <span className="inline-flex items-center gap-1 text-zinc-200 font-semibold">
                    <Sigma className="w-3.5 h-3.5 text-emerald-400" /> n={results.count}
                  </span>
                </div>
                <div className="my-4 text-center">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">Mean (Average)</p>
                  <div className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight tabular-nums">{results.count > 0 ? results.mean : '--'}</div>
                  <p className="text-[11px] text-emerald-400 font-mono mt-1 font-semibold">Arithmetic average</p>
                </div>
                <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-200"><span className="text-zinc-400">Count:</span><span className="font-bold tabular-nums">{results.count}</span></div>
                  <div className="flex justify-between text-zinc-200"><span className="text-zinc-400">Mean:</span><span className="font-bold tabular-nums">{results.mean}</span></div>
                  <div className="flex justify-between text-zinc-200"><span className="text-zinc-400">Median:</span><span className="font-bold text-emerald-400 tabular-nums">{results.median}</span></div>
                  <div className="flex justify-between text-zinc-200 pt-2 border-t border-zinc-800">
                    <span className="text-zinc-400">Mode:</span>
                    <span className="font-bold tabular-nums">{results.modes.length > 0 ? results.modes.join(', ') : 'No mode'}</span>
                  </div>
                  {results.modes.length > 1 && (
                    <div className="flex justify-between text-zinc-200">
                      <span className="text-zinc-400">Type:</span>
                      <span className="font-bold text-amber-400 tabular-nums">Multimodal ({results.modes.length})</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-100 pt-2 border-t border-zinc-800"><span className="font-semibold">Range:</span><span className="font-bold text-white tabular-nums">{results.range}</span></div>
                </div>
              </div>
              <div className="pt-3 border-t border-zinc-800">
                <Button id="mmm-copy-button" type="button" variant="primary" size="sm" onClick={handleCopySummary} className="w-full text-xs">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Result'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Mean, Median & Mode Calculator"
        title="Central Tendency Report"
        data={{
          'Count': results.count, 'Sum': results.sum, 'Mean': results.mean, 'Median': results.median,
          'Mode': results.modes.length > 0 ? results.modes.join(', ') : 'No mode', 'Range': results.range,
        }}
        summaryText={`Mean: ${results.mean}\nMedian: ${results.median}\nMode: ${results.modes.length > 0 ? results.modes.join(', ') : 'No mode'}\nRange: ${results.range}`}
      />
    </Card>
  );
};

export const FinalGradeCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const { toast } = useToast();
  const [currentGrade, setCurrentGrade] = useState<string>('75');
  const [targetGrade, setTargetGrade] = useState<string>('80');
  const [finalWeight, setFinalWeight] = useState<string>('25');
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const results = useMemo(() => {
    const current = parseFloat(currentGrade) || 0;
    const target = parseFloat(targetGrade) || 0;
    const weight = parseFloat(finalWeight) || 0;

    if (weight <= 0 || weight > 100) {
      return { required: 0, gap: 0, isPossible: true, current, target, weight };
    }

    const required = (target - current * (1 - weight / 100)) / (weight / 100);
    const gap = required - current;
    return {
      required: parseFloat(required.toFixed(2)),
      gap: parseFloat(gap.toFixed(2)),
      isPossible: required <= 100,
      current, target, weight,
    };
  }, [currentGrade, targetGrade, finalWeight]);

  const handleCopySummary = () => {
    const text = `Final Grade:\nCurrent: ${results.current}%\nTarget: ${results.target}%\nFinal Weight: ${results.weight}%\nRequired Exam Score: ${results.required}%`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
    if (onSaveHistory) onSaveHistory(`Need ${results.required}% on final (${results.weight}% weight) for ${results.target}% target`);
  };

  const handleReset = () => { setCurrentGrade('75'); setTargetGrade('80'); setFinalWeight('25'); };

  return (
    <Card id="final-grade-calculator-container" className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">Academic</Badge>
            <span className="text-xs font-mono text-zinc-500">GPA Planning</span>
          </div>
          <CardTitle className="text-xl">Final Grade Calculator</CardTitle>
          <CardDescription>Find the exam score you need on your final to reach your target grade.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsExportOpen(true)} className="text-xs">
            <Share2 className="w-3.5 h-3.5" /> Share / Export
          </Button>
          <Button id="grade-reset-button" variant="outline" size="sm" onClick={handleReset} className="text-xs" title="Reset to defaults">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="grade-current">Current Grade (%)</Label>
                <span className="text-xs text-zinc-400 font-mono">percent</span>
              </div>
              <div className="relative">
                <Input
                  id="grade-current"
                  type="number"
                  min="0"
                  max="100"
                  value={currentGrade}
                  onChange={(e) => setCurrentGrade(e.target.value)}
                  placeholder="75"
                  className="font-mono font-bold text-sm tabular-nums"
                />
                <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">%</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="grade-target">Target Grade (%)</Label>
                <span className="text-xs text-zinc-400 font-mono">percent</span>
              </div>
              <div className="relative">
                <Input
                  id="grade-target"
                  type="number"
                  min="0"
                  max="100"
                  value={targetGrade}
                  onChange={(e) => setTargetGrade(e.target.value)}
                  placeholder="80"
                  className="font-mono font-bold text-sm tabular-nums"
                />
                <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">%</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="grade-weight">Final Exam Weight (%)</Label>
                <span className="text-xs text-zinc-400 font-mono">percent</span>
              </div>
              <div className="relative">
                <Input
                  id="grade-weight"
                  type="number"
                  min="1"
                  max="100"
                  value={finalWeight}
                  onChange={(e) => setFinalWeight(e.target.value)}
                  placeholder="25"
                  className="font-mono font-bold text-sm tabular-nums"
                />
                <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">%</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase text-zinc-600 dark:text-zinc-400 font-semibold block mb-1.5">Common Weights:</span>
              <div className="flex flex-wrap gap-1.5">
                {[10, 20, 25, 30, 40, 50].map((preset) => (
                  <Button key={preset} type="button" variant="outline" size="sm" onClick={() => setFinalWeight(String(preset))} className="h-7 text-xs font-mono">
                    {preset}%
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Grade Projection</span>
                  <span className="inline-flex items-center gap-1 text-zinc-200 font-semibold">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400" /> Final Exam
                  </span>
                </div>

                <div className="my-4 text-center">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">Required Exam Score</p>
                  <div className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight tabular-nums">
                    {results.required > 0 ? results.required : '--'}
                    <span className="text-lg ml-1 text-zinc-400">%</span>
                  </div>
                  <div className="mt-2">
                    {results.isPossible ? (
                      <Badge variant="success" className="font-mono text-xs font-bold">Possible</Badge>
                    ) : (
                      <Badge variant="destructive" className="font-mono text-xs font-bold">Impossible</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-200"><span className="text-zinc-400">Current Grade:</span><span className="font-bold tabular-nums">{results.current}%</span></div>
                  <div className="flex justify-between text-zinc-200"><span className="text-zinc-400">Target Grade:</span><span className="font-bold tabular-nums">{results.target}%</span></div>
                  <div className="flex justify-between text-zinc-200"><span className="text-zinc-400">Final Weight:</span><span className="font-bold tabular-nums">{results.weight}%</span></div>
                  <div className="flex justify-between text-zinc-200 pt-2 border-t border-zinc-800">
                    <span className="text-zinc-400">Grade Gap:</span>
                    <span className={`font-bold tabular-nums ${results.gap > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>{results.gap > 0 ? '+' : ''}{results.gap}%</span>
                  </div>
                  <div className="flex justify-between text-zinc-100 pt-2 border-t border-zinc-800">
                    <span className="font-semibold">Score Needed:</span>
                    <span className="font-bold text-white tabular-nums">{results.required > 0 ? `${results.required}%` : '--'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <Button id="grade-copy-button" type="button" variant="primary" size="sm" onClick={handleCopySummary} className="w-full text-xs">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Grade Result'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Final Grade Calculator"
        title="Grade Projection Report"
        data={{
          'Current Grade': `${results.current}%`,
          'Target Grade': `${results.target}%`,
          'Final Weight': `${results.weight}%`,
          'Required Exam Score': `${results.required}%`,
          'Grade Gap': `${results.gap}%`,
          'Feasibility': results.isPossible ? 'Possible' : 'Impossible',
        }}
        summaryText={`Final Grade Plan:\nCurrent: ${results.current}%\nTarget: ${results.target}%\nFinal Weight: ${results.weight}%\nRequired: ${results.required}%`}
      />
    </Card>
  );
};
