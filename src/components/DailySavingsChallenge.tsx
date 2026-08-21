import React, { useState, useMemo } from 'react';
import { Target, Share2, Coffee, Zap, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ExportModal } from './common/ExportModal';
import { useCurrency } from '../lib/currency';

interface DailySavingsChallengeProps {
  onSaveHistory?: (summary: string) => void;
}

export const DailySavingsChallenge: React.FC<DailySavingsChallengeProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const [targetAmount, setTargetAmount] = useState<string>('1200');
  const [daysToSave, setDaysToSave] = useState<string>('90');
  const [userGoalName, setUserGoalName] = useState<string>('Emergency Cushion');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const daysPresets = [30, 60, 90, 180, 365];

  const results = useMemo(() => {
    const target = Math.max(0, parseFloat(targetAmount) || 0);
    const days = Math.max(1, parseInt(daysToSave) || 1);

    const dailyNeeded = target / days;
    const weeklyNeeded = dailyNeeded * 7;
    const monthlyNeeded = dailyNeeded * 30.416;

    let comparison = 'Comparable to a dining takeout meal';
    if (dailyNeeded <= 3) {
      comparison = 'Less than 1 homebrewed espresso';
    } else if (dailyNeeded <= 7) {
      comparison = 'Equal to 1 specialty coffee drink';
    } else if (dailyNeeded <= 15) {
      comparison = 'Equal to skipping 1 fast-casual lunch';
    } else if (dailyNeeded <= 30) {
      comparison = 'Equal to 1 rideshare trip or evening dinner';
    } else {
      comparison = 'High-velocity capital accumulation sprint';
    }

    return {
      target,
      days,
      dailyNeeded,
      weeklyNeeded,
      monthlyNeeded,
      comparison,
    };
  }, [targetAmount, daysToSave]);

  return (
    <div id="daily-challenge-section" className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Daily Challenge
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Benchmark: {currency}12.50 / day</span>
          </div>
          <h2 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
            Daily Savings Goal Challenge
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
            Break down macro savings milestones into disciplined, bite-sized daily allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExportOpen(true)}
            className="text-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 items-start">
        {/* Calculator */}
        <Card>
          <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                <CardTitle className="text-base">Configure Savings Target</CardTitle>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">
                Active Math
              </Badge>
            </div>
            <CardDescription>
              Set your target capital requirement and time horizon.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-5">
            {/* Goal Title */}
            <div className="space-y-1.5">
              <Label htmlFor="challenge-goal-title">Goal Name</Label>
              <Input
                id="challenge-goal-title"
                type="text"
                value={userGoalName}
                onChange={(e) => setUserGoalName(e.target.value)}
                placeholder="e.g. Emergency Reserve, Equipment, Travel"
                className="font-medium"
              />
            </div>

            {/* Target Amount */}
            <div className="space-y-1.5">
              <Label htmlFor="challenge-target-amount">Target Amount ({currency})</Label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
                <Input
                  id="challenge-target-amount"
                  type="number"
                  min="1"
                  step="50"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="1000"
                  className="pl-7 font-mono font-bold text-sm tabular-nums"
                />
              </div>
            </div>

            {/* Days to Save */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="challenge-days-to-save">Time Horizon (Days)</Label>
                <span className="text-xs text-zinc-500 font-mono">
                  ~{(parseInt(daysToSave) / 30.4).toFixed(1)} Months
                </span>
              </div>
              <Input
                id="challenge-days-to-save"
                type="number"
                min="1"
                max="2000"
                value={daysToSave}
                onChange={(e) => setDaysToSave(e.target.value)}
                className="font-mono font-bold text-sm tabular-nums"
              />

              {/* Preset Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {daysPresets.map((days) => (
                  <Button
                    key={days}
                    id={`challenge-preset-${days}`}
                    type="button"
                    variant={daysToSave === days.toString() ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDaysToSave(days.toString())}
                    className="h-7 text-xs font-mono"
                  >
                    {days}d {days === 365 ? '(1y)' : ''}
                  </Button>
                ))}
              </div>
            </div>

            {/* Result Box */}
            <div id="challenge-results-card" className="p-4 rounded-xl bg-zinc-950 text-white border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-2 border-b border-zinc-800">
                <span>{userGoalName || 'Target Savings'}</span>
                <span className="font-bold text-white tabular-nums">{currency}{results.target.toLocaleString()}</span>
              </div>

              <div className="text-center py-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Required Daily Allocation</div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono my-1 tabular-nums">
                  {currency}{results.dailyNeeded.toFixed(2)}
                  <span className="text-xs font-sans font-normal text-emerald-400"> / day</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-zinc-300 font-mono mt-1">
                  <Coffee className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{results.comparison}</span>
                </div>
              </div>

              {/* Sub intervals */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800 text-center font-mono">
                <div className="bg-zinc-900 rounded-lg p-2.5 border border-zinc-800">
                  <div className="text-[10px] text-zinc-400 uppercase">Weekly Rate</div>
                  <div className="text-sm font-bold text-white tabular-nums">{currency}{results.weeklyNeeded.toFixed(2)}/wk</div>
                </div>
                <div className="bg-zinc-900 rounded-lg p-2.5 border border-zinc-800">
                  <div className="text-[10px] text-zinc-400 uppercase">Monthly Rate</div>
                  <div className="text-sm font-bold text-white tabular-nums">{currency}{results.monthlyNeeded.toFixed(2)}/mo</div>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-400">Your pace:</span>
                <span className="text-xs font-mono text-emerald-400 font-bold tabular-nums">
                  {currency}{results.dailyNeeded.toFixed(2)} / day for {results.days} days
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Daily Savings Challenge"
        title="Personal Savings Roadmap"
        data={{
          'Savings Goal': userGoalName || 'Target Savings',
          'Target Amount': `${currency}${results.target.toLocaleString()}`,
          'Target Horizon': `${results.days} Days`,
          'Daily Savings Needed': `${currency}${results.dailyNeeded.toFixed(2)} / day`,
          'Weekly Equivalent': `${currency}${results.weeklyNeeded.toFixed(2)} / week`,
          'Monthly Equivalent': `${currency}${results.monthlyNeeded.toFixed(2)} / month`,
          'Relative Scale': results.comparison,
        }}
        summaryText={`Daily Savings Plan:\nGoal: ${userGoalName}\nTarget: ${currency}${results.target.toLocaleString()} in ${results.days} days\nDaily Deposit Pace: ${currency}${results.dailyNeeded.toFixed(2)}/day (${currency}${results.weeklyNeeded.toFixed(2)}/wk)\nHabit Perspective: ${results.comparison}`}
      />
    </div>
  );
};
