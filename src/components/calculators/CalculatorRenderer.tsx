import React, { useEffect, useState } from 'react';
import { CalculatorMeta } from '../../types';
import { ConfigCalculator } from './ConfigCalculator';
import { UnitConverter } from './UnitConverter';
import { DailySavingsChallenge } from '../DailySavingsChallenge';

type CalculatorComponent = React.ComponentType<{ onSaveHistory?: (summary: string) => void }>;

const LAZY_COMPONENTS: Record<string, () => Promise<Record<string, unknown>>> = {
  TipCalculator: () => import('./TipCalculator'),
  BmiCalculator: () => import('./BmiCalculator'),
  MortgageCalculator: () => import('./MortgageCalculator'),
  PercentageCalculator: () => import('./PercentageCalculator'),
  CompoundInterestCalculator: () => import('./CompoundInterestCalculator'),
  DiscountCalculator: () => import('./DiscountCalculator'),
  CurrencyConverter: () => import('./CurrencyConverter'),
  RefinanceCalculator: () => import('./RefinanceCalculator'),
  AmortizationScheduleCalculator: () => import('./AmortizationScheduleCalculator'),
  AffordabilityCalculator: () => import('./AffordabilityCalculator'),
  RentVsBuyCalculator: () => import('./RentVsBuyCalculator'),
  DownPaymentSavingsCalculator: () => import('./DownPaymentSavingsCalculator'),
  AgeCalculator: () => import('./DateCalculators'),
  DateDifferenceCalculator: () => import('./DateCalculators'),
  DaysUntilCalculator: () => import('./DateCalculators'),
  ScientificCalculator: () => import('./ScientificCalculator'),
  TdeeCalculator: () => import('./HealthCalculators'),
  SleepCycleCalculator: () => import('./HealthCalculators'),
  StepsToMilesCalculator: () => import('./HealthCalculators'),
  StandardDeviationCalculator: () => import('./StatisticsCalculators'),
  MeanMedianModeCalculator: () => import('./StatisticsCalculators'),
  FinalGradeCalculator: () => import('./StatisticsCalculators'),
};

const LOADED: Record<string, CalculatorComponent | undefined> = {};
const PENDING: Record<string, Promise<void>> = {};

export function preloadCalculatorComponents(): Promise<unknown> {
  return Promise.all(Object.keys(LAZY_COMPONENTS).map((id) => ensureLoaded(id)));
}

function ensureLoaded(id: string): Promise<void> {
  if (LOADED[id]) return Promise.resolve();
  PENDING[id] ??= LAZY_COMPONENTS[id]().then((mod) => {
    LOADED[id] = mod[id] as CalculatorComponent;
  });
  return PENDING[id];
}

function useLazyCalculator(id: string): CalculatorComponent | null {
  const Comp = LOADED[id];
  const [, setTick] = useState(0);
  useEffect(() => {
    if (Comp) return;
    let active = true;
    ensureLoaded(id).then(() => {
      if (active) setTick((t) => t + 1);
    });
    return () => {
      active = false;
    };
  }, [id, Comp]);
  return Comp ?? null;
}

const LazyCalculator: React.FC<{ id: string; onSaveHistory?: (summary: string) => void }> = ({
  id,
  onSaveHistory,
}) => {
  const Comp = useLazyCalculator(id);
  if (!Comp) {
    return (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4 animate-pulse">
        <div className="h-5 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-10 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-10 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-24 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
      </div>
    );
  }
  return <Comp onSaveHistory={onSaveHistory} />;
};

interface CalculatorRendererProps {
  meta: CalculatorMeta;
  onSaveHistory?: (summary: string) => void;
}

export const CalculatorRenderer: React.FC<CalculatorRendererProps> = ({ meta, onSaveHistory }) => {
  if (meta.kind === 'config' && meta.config) {
    return (
      <ConfigCalculator name={meta.name} slug={meta.slug} spec={meta.config} onSaveHistory={onSaveHistory} />
    );
  }

  if (meta.kind === 'converter' && meta.unitGroup) {
    return (
      <UnitConverter
        name={meta.name}
        unitGroup={meta.unitGroup}
        defaultFrom={meta.id === 'oz-cups' ? 'floz' : undefined}
        defaultTo={meta.id === 'oz-cups' ? 'cup' : undefined}
        onSaveHistory={onSaveHistory}
      />
    );
  }

  if (LAZY_COMPONENTS[meta.componentId ?? '']) {
    return <LazyCalculator id={meta.componentId!} onSaveHistory={onSaveHistory} />;
  }

  switch (meta.componentId) {
    case 'DailySavingsChallenge':
      return <DailySavingsChallenge onSaveHistory={onSaveHistory} />;
    default:
      return null;
  }
};
