import { CalculatorCategory, CategoryMeta } from '../types';

/**
 * Category metadata lives outside the catalogue so that headers, footers and
 * navigation can render without pulling in any calculator data.
 */
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
    id: 'tech',
    label: 'Developer & Tech',
    description: 'Subnets, number bases, screen density, URL encoding, and colour.',
  },
  {
    id: 'science',
    label: 'Science & Physics',
    description: 'Motion, energy, electricity, and lab calculations.',
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
  tech: 'Developer & Tech',
  science: 'Science & Physics',
  daily: 'Everyday Tools',
  misc: 'Automotive & Home',
};

export function getCategoryById(id: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
