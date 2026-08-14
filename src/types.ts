export type CalculatorId = 
  | 'tip'
  | 'bmi'
  | 'mortgage'
  | 'daily-challenge'
  | 'percentage'
  | 'compound'
  | 'discount'
  | 'ai-custom';

export type CalculatorCategory = 'all' | 'finance' | 'health' | 'daily' | 'math' | 'ai';

export interface CalculatorMeta {
  id: CalculatorId;
  name: string;
  shortDesc: string;
  tagline: string;
  category: CalculatorCategory;
  iconName: string;
  badge?: string;
  isDailyChallenge?: boolean;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  targetAmount: number;
  days: number;
  dailyRate: number;
  streakDays: number;
  badge?: string;
  timestamp: string;
}

export interface DynamicAiField {
  id: string;
  label: string;
  type: 'number';
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface DynamicAiCalculatorSpec {
  title: string;
  description: string;
  icon?: string;
  fields: DynamicAiField[];
  formulaDescription: string;
  formulaCode: string;
  resultLabel: string;
  resultPrefix?: string;
  resultSuffix?: string;
  tips?: string[];
  userPrompt?: string;
}

export interface CalculationHistoryItem {
  id: string;
  calculatorName: string;
  summary: string;
  timestamp: number;
}
