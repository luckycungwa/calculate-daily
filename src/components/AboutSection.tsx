import React from 'react';
import { ShieldCheck, Zap, Target, ClipboardCheck } from 'lucide-react';
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
              Convert large target expenditures into realistic daily, weekly, and monthly milestones.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-2">
            <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
              <ClipboardCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
            </div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Verified Formulas</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Each tool uses a recognized standard formula, audited at build time for correctness.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-left space-y-3">
        <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Methodology</h3>
        <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            Every calculator on this site applies a named, published formula so results are reproducible and verifiable. Examples include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Compound growth: FV = P × (1 + r/n)^(n×t), plus the standard annuity term for recurring contributions.</li>
            <li>Fixed-rate loans: the amortization formula M = P × r × (1 + r)^n / ((1 + r)^n − 1).</li>
            <li>Basal metabolism: the Mifflin-St Jeor equation (10 × kg + 6.25 × cm − 5 × age ± adjustment).</li>
            <li>Body composition: the U.S. Navy tape method using waist, neck, hip, and height.</li>
            <li>Strength estimates: the Epley formula 1RM = weight × (1 + reps / 30).</li>
            <li>Unit conversions: exact factors, e.g. 1 inch = 2.54 cm, 1 US gallon = 3.78541 L.</li>
          </ul>
          <p>
            All computations run deterministically in your browser. Results are estimates for general information and are not professional financial, medical, legal, or construction advice. Confirm critical decisions with a qualified professional.
          </p>
        </div>
      </div>

      <div className="text-center text-xs font-mono text-zinc-400 dark:text-zinc-500 pt-4">
        Calculate Daily Engine • Precision Math Verification
      </div>
    </div>
  );
};
