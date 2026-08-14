import React from 'react';
import { Calculator, Activity, Home, Percent, Search, Zap } from 'lucide-react';
import { CalculatorId } from '../types';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface HeroSectionProps {
  onSelectCalculator: (id: CalculatorId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateToAi: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCalculator,
  searchQuery,
  onSearchChange,
  onNavigateToAi,
}) => {
  const quickPills: { id: CalculatorId; label: string; icon: any }[] = [
    { id: 'tip', label: 'Tip & Bill Split', icon: Calculator },
    { id: 'bmi', label: 'BMI Health Index', icon: Activity },
    { id: 'mortgage', label: 'Mortgage & Loan', icon: Home },
    { id: 'daily-challenge', label: 'Savings Goal', icon: Percent },
    { id: 'percentage', label: 'Percentages', icon: Percent },
  ];

  return (
    <section id="hero-section" className="pt-4 pb-8 sm:pt-6 sm:pb-10 max-w-4xl mx-auto px-4 text-center">
      {/* Top Status Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 mb-4">
        <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-500" />
        Zero Latency • Local Execution • Real-Time Math
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight leading-[1.15]">
        Everyday Precision <span className="text-emerald-600 dark:text-emerald-500">Calculators.</span>
      </h1>

      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3 max-w-xl mx-auto font-normal leading-relaxed">
        Engineered for rapid daily decisions: split bills evenly, evaluate BMI health metrics, calculate mortgage amortization, or structure daily savings targets.
      </p>

      {/* Search Input */}
      <div className="mt-6 max-w-md mx-auto">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
          <Input
            id="hero-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search calculators (tip, bmi, mortgage, percent...)"
            className="pl-9 pr-14 h-10 text-xs font-medium bg-white dark:bg-zinc-900"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Quick Launch Pills */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mr-1">
          Quick:
        </span>
        {quickPills.map((pill) => {
          const Icon = pill.icon;
          return (
            <Button
              key={pill.id}
              id={`hero-pill-${pill.id}`}
              variant="outline"
              size="sm"
              onClick={() => onSelectCalculator(pill.id)}
              className="h-7 px-2.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 rounded-md"
            >
              <Icon className="w-3 h-3 text-zinc-500" />
              {pill.label}
            </Button>
          );
        })}
      </div>
    </section>
  );
};
