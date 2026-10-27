import type { Guide } from '../../../src/types';

export const breakEvenAnalysisGuideDraft: Guide = {
  id: 'break-even-analysis-guide-draft',
  slug: 'break-even-analysis-guide',
  name: 'Break-Even Point: Units, Revenue, and Contribution Margin',
  shortDesc:
    'Use contribution per unit to estimate the sales volume that covers modeled fixed costs.',
  category: 'finance',
  iconName: 'TrendingUp',
  keywords: ['break even point', 'break even units', 'contribution margin'],
  content: {
    hook:
      'For a single product with a positive contribution per unit, divide fixed costs by selling price minus variable cost per unit. Round the required unit count up so the estimate covers the modeled fixed costs.',
    sections: [
      {
        heading: 'The direct answer and formula',
        body: [
          'Contribution per unit = selling price per unit − variable cost per unit.',
          'Break-even units = fixed costs ÷ contribution per unit. Since products are generally sold in whole units, round a fractional result up. Break-even revenue = break-even units × selling price per unit.',
          'This basic model assumes one product, a constant selling price and variable cost per unit, and fixed costs that remain fixed over the modeled range. It estimates the point where modeled revenue equals modeled costs; it is not a forecast.',
        ],
      },
      {
        heading: 'Worked example',
        body: [
          'Suppose fixed costs for the period are $10,000, each unit sells for $25, and variable cost is $15 per unit. Contribution per unit is $25 − $15 = $10.',
          'Break-even units are $10,000 ÷ $10 = 1,000 units. Break-even revenue is 1,000 × $25 = $25,000.',
          'If fixed costs were $10,001 instead, the quotient would be 1,000.1 units. Rounding up gives 1,001 whole units, or $25,025 in revenue under the same assumptions.',
        ],
      },
      {
        heading: 'What the estimate leaves out',
        body: [
          'The result changes if selling price, variable cost, or fixed cost changes. Discounts, returns, multiple products with different margins, capacity limits, financing, and taxes are not included in this basic calculation unless the model explicitly adds them.',
          'If the selling price is equal to or below variable cost per unit, contribution is zero or negative. Under those inputs, sales cannot contribute toward fixed costs, so there is no finite break-even unit count in this model.',
          'A break-even estimate is one scenario using the inputs you provide. It is not a recommendation about pricing, hiring, borrowing, or whether a business is viable.',
        ],
      },
      {
        heading: 'Common mistakes',
        body: [
          'Do not divide fixed costs by the selling price alone; variable costs must first be subtracted to find contribution per unit.',
          'Keep the time period consistent. Weekly fixed costs should be compared with weekly sales and costs, not with an annual sales estimate.',
          'Do not round contribution per unit prematurely. Calculate with the entered values, round the unit target up at the end, and verify the result against the assumptions.',
        ],
      },
    ],
    conclusion:
      'Break-even analysis is a useful first-pass cost-volume calculation when its assumptions fit the situation. Enter consistent costs and prices, review the assumptions, and treat the output as an estimate rather than a business forecast.',
  },
  faqs: [
    {
      q: 'What is contribution per unit?',
      a: 'It is the selling price per unit minus the variable cost per unit. The remaining amount contributes toward fixed costs in the basic model.',
    },
    {
      q: 'Why do I round break-even units up?',
      a: 'A fractional unit generally cannot be sold. Rounding up gives the first whole-unit quantity that meets or exceeds the calculated threshold.',
    },
    {
      q: 'What if variable cost is higher than selling price?',
      a: 'Contribution per unit is negative, so additional sales increase the modeled loss rather than cover fixed costs. The basic model has no finite break-even point for those inputs.',
    },
  ],
  embeddedCalculators: ['break-even-calculator'],
  relatedCalculators: ['markup-margin-calculator', 'investment-roi-calculator'],
  relatedGuides: [],
  seo: { status: 'noindex', reviewStatus: 'pending', priority: 0 },
  publishedAt: 'DRAFT - NOT PUBLISHED',
};

export const breakEvenEditorialNotes = {
  primaryQuery: 'break even calculator',
  userIntent: 'Understand and calculate the unit and revenue threshold for a basic break-even model.',
  title: 'Break-Even Point: Units, Revenue, and Contribution Margin',
  description:
    'See the break-even formula, a worked unit-sales example, and the assumptions behind the estimate.',
  suggestedInternalLinks: [
    '/calculators/break-even-calculator',
    '/calculators/markup-margin-calculator',
    '/calculators/investment-roi-calculator',
  ],
  sources: [
    {
      label: 'AccountingCoach, Break-Even Point',
      url: 'https://www.accountingcoach.com/break-even-point/explanation',
      status: 'Retrieved; formula and model limitations reviewed.',
    },
  ],
  factCheckNotes: [
    'Hand-check the examples: $10,000 / ($25 - $15) = 1,000 units; $10,001 / $10 rounds up to 1,001 units.',
    'Confirm the calculator implementation and rounding behavior match these statements.',
    'Do not imply this single-product formula covers mixed product portfolios or all operating costs.',
  ],
  ownerReview: ['Assign a real author and a reviewer with business-accounting competence.'],
};
