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
import { TECH_CALCULATORS } from './catalog/tech';
import { SCIENCE_CALCULATORS } from './catalog/science';
import { FOOD_AND_AUTO_CALCULATORS } from './catalog/foodAndAuto';
import { SPORTS_AND_HOME_CALCULATORS } from './catalog/sportsAndHome';
import { AI_CALCULATORS } from './catalog/ai';

export const CALCULATOR_CATALOG: CalculatorMeta[] = [
  ...MATH_CALCULATORS,
  ...FINANCE_CALCULATORS,
  ...HEALTH_CALCULATORS,
  ...CONVERSION_CALCULATORS,
  ...TIME_CALCULATORS,
  ...CONSTRUCTION_CALCULATORS,
  ...FOOD_CALCULATORS,
  ...FITNESS_CALCULATORS,
  ...TECH_CALCULATORS,
  ...SCIENCE_CALCULATORS,
  ...FOOD_AND_AUTO_CALCULATORS,
  ...SPORTS_AND_HOME_CALCULATORS,
  ...AI_CALCULATORS,
  ...DAILY_CALCULATORS,
];


// CATEGORIES / CATEGORY_LABELS live in ./categories so navigation can import them
// without pulling in the calculator catalogue.
export { CATEGORIES, CATEGORY_LABELS, getCategoryById } from './categories';

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
