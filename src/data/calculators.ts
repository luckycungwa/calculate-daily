import {
  CalculatorMeta,
  CalculatorCategory,
  CategoryMeta,
} from '../types';
import { MATH_CALCULATORS } from './catalog/math';
import { FINANCE_CALCULATORS } from './catalog/finance';
import { HEALTH_CALCULATORS } from './catalog/health';
import { CONVERSION_CALCULATORS } from './catalog/conversion';
import { TIME_CALCULATORS } from './catalog/time';
import { CONSTRUCTION_CALCULATORS } from './catalog/construction';
import { FOOD_CALCULATORS, FITNESS_CALCULATORS, DAILY_CALCULATORS } from './catalog/other';

export const CALCULATOR_CATALOG: CalculatorMeta[] = [
  ...MATH_CALCULATORS,
  ...FINANCE_CALCULATORS,
  ...HEALTH_CALCULATORS,
  ...CONVERSION_CALCULATORS,
  ...TIME_CALCULATORS,
  ...CONSTRUCTION_CALCULATORS,
  ...FOOD_CALCULATORS,
  ...FITNESS_CALCULATORS,
  ...DAILY_CALCULATORS,
];

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'math',
    label: 'Math',
    description: 'Percentages, ratios, grades, and everyday arithmetic.',
  },
  {
    id: 'finance',
    label: 'Finance & Money',
    description: 'Loans, savings, salaries, interest, and budgeting.',
  },
  {
    id: 'health',
    label: 'Health & Fitness',
    description: 'BMI, calories, macros, heart rate, and wellness metrics.',
  },
  {
    id: 'conversion',
    label: 'Unit Conversion',
    description: 'Temperature, length, weight, volume, currency, and more.',
  },
  {
    id: 'time',
    label: 'Time & Schedule',
    description: 'Work hours, decimal time, and timeline planning.',
  },
  {
    id: 'construction',
    label: 'Construction & DIY',
    description: 'Room area, concrete, paint, flooring, and lumber estimates.',
  },
  {
    id: 'food',
    label: 'Food & Cooking',
    description: 'Recipe scaling and per-serving meal costs.',
  },
  {
    id: 'fitness',
    label: 'Sports & Strength',
    description: 'Running pace and one-rep-max strength estimates.',
  },
  {
    id: 'daily',
    label: 'Everyday Tools',
    description: 'Tips, bills, and daily life math.',
  },
  {
    id: 'misc',
    label: 'Automotive & Home',
    description: 'Fuel and electricity running costs.',
  },
];

export const CATEGORY_LABELS: Record<Exclude<CalculatorCategory, 'all' | 'ai'>, string> = {
  math: 'Math',
  finance: 'Finance & Money',
  health: 'Health & Fitness',
  conversion: 'Unit Conversion',
  time: 'Time & Schedule',
  construction: 'Construction & DIY',
  food: 'Food & Cooking',
  fitness: 'Sports & Strength',
  daily: 'Everyday Tools',
  misc: 'Automotive & Home',
};

export function getCalculatorById(id: string): CalculatorMeta | undefined {
  return CALCULATOR_CATALOG.find((c) => c.id === id);
}

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return CALCULATOR_CATALOG.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: CalculatorCategory): CalculatorMeta[] {
  if (category === 'all') return CALCULATOR_CATALOG;
  return CALCULATOR_CATALOG.filter((c) => c.category === category);
}

export function getFeaturedCalculators(): CalculatorMeta[] {
  return CALCULATOR_CATALOG.filter((c) => c.featured);
}

export function getCategoryById(id: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.id === id);
}