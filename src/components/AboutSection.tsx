import React from 'react';
import { ShieldCheck, Zap, Sparkles, Target } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export const AboutSection: React.FC = () => {
  return (
    <div id="about-section" className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <Badge variant="outline" className="text-[11px] font-mono">
          System Overview
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
          Deterministic Calculations for Everyday Decisions
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Calculate Daily delivers instantaneous, browser-native mathematical computations without network delay, intrusive ads, or remote telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5 space-y-2">
            <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
            </div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Instant Client-Side Engine</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Every formula executes live inside your local browser thread with zero network latency.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-2">
            <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
              <ShieldCheck className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            </div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Strict Client Privacy</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Financial figures, loan amounts, and health records persist only in your device's local storage.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-2">
            <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
              <Target className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            </div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Target Savings Goals</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Convert large target expenditures into realistic daily milestones and track streaks.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-2">
            <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
            </div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">AI Schema Synthesis</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Synthesize specialized multi-variable calculation tools dynamically from plain natural language.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-xs font-mono text-zinc-400 dark:text-zinc-500 pt-4">
        Calculate Daily Engine • Precision Math Verification
      </div>
    </div>
  );
};
