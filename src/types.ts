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
  | 'tech'
  | 'science'
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

/**
 * The listing/search projection of a calculator.
 *
 * Everything a directory card, a search result, a related-links list, or a
 * category page needs — and nothing that only the calculator page needs.
 * `content` (prose, FAQs, sources) and `config` (formula spec) are deliberately
 * absent: they are the bulk of the catalogue and are loaded per content area
 * only when a calculator page actually renders.
 */
export type CalculatorSummary = Pick<
  CalculatorMeta,
  | 'id'
  | 'slug'
  | 'name'
  | 'shortDesc'
  | 'tagline'
  | 'category'
  | 'iconName'
  | 'badge'
  | 'featured'
  | 'keywords'
  | 'kind'
  | 'seo'
>;

/** The minimum a directory card needs — used by the home page's curated lists. */
export type CalculatorCardModel = Pick<
  CalculatorSummary,
  'id' | 'slug' | 'name' | 'shortDesc' | 'category' | 'iconName' | 'badge'
>;

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
    /** Real date (YYYY-MM-DD) of the last meaningful content change. Feeds <lastmod>. */
    updatedAt?: string;
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
    /** Real date (YYYY-MM-DD) of the last meaningful content edit. Feeds <lastmod>. */
    updatedAt?: string;
  };
  publishedAt: string;
}