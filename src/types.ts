export type CalculatorId = string;

export type CalculatorCategory =
  | 'math'
  | 'finance'
  | 'health'
  | 'conversion'
  | 'time'
  | 'construction'
  | 'food'
  | 'fitness'
  | 'daily'
  | 'misc'
  | 'all';

export interface ConfigField {
  id: string;
  label: string;
  type: 'number';
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  prefix?: string;
  suffix?: string;
}

export interface ConfigResult {
  label: string;
  formulaCode: string;
  prefix?: string;
  suffix?: string;
  accent?: boolean;
}

export interface ConfigCalculatorSpec {
  fields: ConfigField[];
  results: ConfigResult[];
  formulaDescription: string;
  tips?: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FormulaSource {
  label: string;
  expression: string;
  note?: string;
}

export interface WorkflowLink {
  slug: string;
  step: string;
  label?: string;
}

export interface ResultExplanation {
  resultLabel: string;
  explanation: string;
}

export interface ToolContent {
  intro: string;
  howItWorks: string;
  example: string;
  faqs: FaqItem[];
  related?: string[];
  sources?: FormulaSource[];
  formulas?: FormulaSource[];
  workflowLinks?: WorkflowLink[];
  resultExplanations?: ResultExplanation[];
}

export type SeoStatus = 'index' | 'noindex';

export type ReviewStatus = 'pending' | 'reviewed';

export interface CalculatorMeta {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  tagline: string;
  category: CalculatorCategory;
  iconName: string;
  badge?: string;
  keywords?: string[];
  isDailyChallenge?: boolean;
  featured?: boolean;
  kind: 'custom' | 'config' | 'converter';
  componentId?: string;
  config?: ConfigCalculatorSpec;
  unitGroup?: string;
  content: ToolContent;
  seo?: {
    status?: SeoStatus;
    reviewStatus?: ReviewStatus;
    priority?: number;
  };
}

export interface CategoryMeta {
  id: Exclude<CalculatorCategory, 'all' | 'ai'>;
  label: string;
  description: string;
}

export interface CalculationHistoryItem {
  id: string;
  calculatorName: string;
  summary: string;
  timestamp: number;
}

export interface GuideSection {
  heading: string;
  body: string[];
  list?: string[];
  callout?: string;
}

export interface Guide {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  category: CalculatorCategory;
  iconName: string;
  keywords?: string[];
  content: {
    hook: string;
    sections: GuideSection[];
    conclusion: string;
  };
  faqs: FaqItem[];
  embeddedCalculators: string[];
  relatedCalculators: string[];
  relatedGuides?: string[];
  seo?: {
    status?: SeoStatus;
    reviewStatus?: ReviewStatus;
    priority?: number;
  };
  publishedAt: string;
}