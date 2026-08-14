import React, { useState, useMemo } from 'react';
import { Target, Award, CheckCircle2, Share2, Search, Coffee, Zap, TrendingUp, Calendar, Plus } from 'lucide-react';
import { INITIAL_LEADERBOARD } from '../data/calculators';
import { LeaderboardEntry } from '../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { ExportModal } from './common/ExportModal';

interface DailySavingsChallengeProps {
  onSaveHistory?: (summary: string) => void;
}

export const DailySavingsChallenge: React.FC<DailySavingsChallengeProps> = ({ onSaveHistory }) => {
  const [targetAmount, setTargetAmount] = useState<string>('1200');
  const [daysToSave, setDaysToSave] = useState<string>('90');
  const [userGoalName, setUserGoalName] = useState<string>('Emergency Cushion');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);
  const [joinedSuccess, setJoinedSuccess] = useState<boolean>(false);
  const [showJoinModal, setShowJoinModal] = useState<boolean>(false);
  const [joinName, setJoinName] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rate' | 'streak' | 'amount'>('rate');
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

  const filteredLeaderboard = useMemo(() => {
    return leaderboard
      .filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'rate') return b.dailyRate - a.dailyRate;
        if (sortBy === 'streak') return b.streakDays - a.streakDays;
        return b.targetAmount - a.targetAmount;
      });
  }, [leaderboard, searchQuery, sortBy]);

  const handleJoinLeaderboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinName.trim()) return;

    const initials = joinName.trim().slice(0, 2).toUpperCase();
    const newEntry: LeaderboardEntry = {
      id: `lead-user-${Date.now()}`,
      name: joinName.trim(),
      avatar: initials,
      targetAmount: results.target,
      days: results.days,
      dailyRate: parseFloat(results.dailyNeeded.toFixed(2)),
      streakDays: 1,
      badge: 'Active Goal',
      timestamp: 'Just now',
    };

    const updated = [...leaderboard, newEntry];
    setLeaderboard(updated);
    setJoinedSuccess(true);
    setShowJoinModal(false);
    setJoinName('');
    if (onSaveHistory) {
      onSaveHistory(`Savings Plan: $${results.dailyNeeded.toFixed(2)}/day for $${results.target.toLocaleString()} in ${results.days} days`);
    }
    setTimeout(() => setJoinedSuccess(false), 5000);
  };

  return (
    <div id="daily-challenge-section" className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Daily Challenge
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Benchmark: $12.50 / day</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Calculator */}
        <Card className="lg:col-span-7">
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
              <Label htmlFor="challenge-target-amount">Target Amount ($)</Label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">$</span>
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
                <span className="font-bold text-white tabular-nums">${results.target.toLocaleString()}</span>
              </div>

              <div className="text-center py-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Required Daily Allocation</div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono my-1 tabular-nums">
                  ${results.dailyNeeded.toFixed(2)}
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
                  <div className="text-sm font-bold text-white tabular-nums">${results.weeklyNeeded.toFixed(2)}/wk</div>
                </div>
                <div className="bg-zinc-900 rounded-lg p-2.5 border border-zinc-800">
                  <div className="text-[10px] text-zinc-400 uppercase">Monthly Rate</div>
                  <div className="text-sm font-bold text-white tabular-nums">${results.monthlyNeeded.toFixed(2)}/mo</div>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-400">Track publicly:</span>
                <Button
                  id="challenge-join-board-btn"
                  variant="primary"
                  size="sm"
                  onClick={() => setShowJoinModal(true)}
                  className="text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Post to Community
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Leaderboard */}
        <Card className="lg:col-span-5 flex flex-col">
          <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                <CardTitle className="text-base">Community Benchmarks</CardTitle>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">
                {leaderboard.length} Goals
              </Badge>
            </div>
            <CardDescription>
              Real community savings targets and daily velocities.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 pt-4 flex-1 flex flex-col">
            {/* Search & Sort Controls */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Filter targets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 text-xs h-8"
                />
              </div>

              <div className="flex items-center gap-1 text-[11px] font-mono">
                <span className="text-zinc-400 mr-1">Sort:</span>
                <Button
                  variant={sortBy === 'rate' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('rate')}
                  className="h-6 px-2 text-[10px]"
                >
                  Rate
                </Button>
                <Button
                  variant={sortBy === 'streak' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('streak')}
                  className="h-6 px-2 text-[10px]"
                >
                  Streak
                </Button>
                <Button
                  variant={sortBy === 'amount' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('amount')}
                  className="h-6 px-2 text-[10px]"
                >
                  Total
                </Button>
              </div>
            </div>

            {joinedSuccess && (
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-800 dark:text-emerald-300 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Goal successfully posted to community board.
              </div>
            )}

            {/* List */}
            <div id="challenge-leaderboard-list" className="space-y-2 flex-1 overflow-y-auto max-h-[360px] pr-1">
              {filteredLeaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className="p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                      {entry.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {entry.name}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        ${entry.targetAmount.toLocaleString()} • {entry.days}d
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      ${entry.dailyRate.toFixed(2)}/d
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400">
                      {entry.streakDays}d active
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Join Dialog */}
      <Dialog open={showJoinModal} onOpenChange={setShowJoinModal}>
        <DialogContent className="max-w-md">
          <DialogHeader className="pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <DialogTitle>Post Savings Milestone</DialogTitle>
            <DialogDescription>
              Publish your target of ${results.target.toLocaleString()} ({results.days} days @ ${results.dailyNeeded.toFixed(2)}/day) to the public community board.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleJoinLeaderboard} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="join-challenger-name">Display Name / Identifier</Label>
              <Input
                id="join-challenger-name"
                type="text"
                required
                value={joinName}
                onChange={(e) => setJoinName(e.target.value)}
                placeholder="e.g. Jordan K."
                autoFocus
              />
            </div>

            <DialogFooter className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowJoinModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Confirm & Post
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Daily Savings Challenge"
        title="Personal Savings Roadmap"
        data={{
          'Savings Goal': userGoalName || 'Target Savings',
          'Target Amount': `$${results.target.toLocaleString()}`,
          'Target Horizon': `${results.days} Days`,
          'Daily Savings Needed': `$${results.dailyNeeded.toFixed(2)} / day`,
          'Weekly Equivalent': `$${results.weeklyNeeded.toFixed(2)} / week`,
          'Monthly Equivalent': `$${results.monthlyNeeded.toFixed(2)} / month`,
          'Relative Scale': results.comparison,
        }}
        summaryText={`Daily Savings Plan:\nGoal: ${userGoalName}\nTarget: $${results.target.toLocaleString()} in ${results.days} days\nDaily Deposit Pace: $${results.dailyNeeded.toFixed(2)}/day ($${results.weeklyNeeded.toFixed(2)}/wk)\nHabit Perspective: ${results.comparison}`}
      />
    </div>
  );
};
