import { Guide } from '../../../types';

export const percentageGuide: Guide = {
  id: 'percentage-guide',
  slug: 'understanding-percentages-guide',
  name: 'Understanding Percentages: From Discounts to Margins',
  shortDesc: 'Master percentages for everyday use: discounts, tips, tax, markups, margins, and the math behind every transaction.',
  category: 'math',
  iconName: 'Percent',
  keywords: ['percentages', 'discount', 'markup', 'margin', 'tip calculator', 'sales tax', 'percentage change'],
  content: {
    hook: 'Percentages are the most used math skill in daily life. Yet most people get them wrong at least once a week. The difference between 20% off and 20% margin is thousands of dollars.',
    sections: [
      {
        heading: 'Percentage Basics That Matter',
        body: [
          'To find X% of a number, multiply the number by X/100. 20% of $50 is 50 x 0.20 = $10. This is the foundation of every percentage calculation.',
          'To find what percent A is of B, divide A by B and multiply by 100. If you saved $12 on a $60 item, you saved (12/60) x 100 = 20%.',
          'Percentage change is (new - old) / old x 100. If your rent went from $1,000 to $1,100, that is (100/1000) x 100 = 10% increase.',
        ],
      },
      {
        heading: 'Discounts: What You Actually Pay',
        body: [
          'A 20% discount on a $100 item saves you $20. You pay $80. Simple. But retailers use tricks: "up to 50% off" means most items are 10-20% off.',
          'Stacking discounts: 20% off plus an additional 10% off is not 30% off. The second discount applies to the already-reduced price. 20% off $100 is $80. Then 10% off $80 is $72. Total savings: 28%, not 30%.',
          'The percentage you save on a clearance item depends on the original price, not the marked-down price. A "50% off" item that was first marked up 100% is actually sold at full price. Check the original price before getting excited.',
        ],
      },
      {
        heading: 'Markup vs Margin: The Confusion That Costs Money',
        body: [
          'Markup is the percentage added to cost to get selling price. Margin is the percentage of selling price that is profit. They sound similar but calculate differently.',
          'Example: You buy a shirt for $20 and sell it for $40. Markup is ($40-$20)/$20 = 100%. Margin is ($40-$20)/$40 = 50%. Same transaction, two different percentages.',
          'A 50% margin means profit is half the selling price. A 50% markup means profit is half the cost. To convert: margin = markup / (1 + markup). To get a 33% margin, you need a 50% markup.',
        ],
        callout: 'Markup and margin are not the same. A 50% markup equals a 33% margin. Confusing them misprices your products.',
      },
      {
        heading: 'Tips, Tax, and Splits',
        body: [
          'Standard tip percentages: 15% for adequate service, 18-20% for good service, 25%+ for exceptional service. To calculate 20% quickly, move the decimal one place (10%) and double it.',
          'Sales tax multiplies the purchase price. An 8% tax on a $50 item adds $4. The total is $54. If you have a budget of $50 including tax, divide by 1.08 to find the maximum pre-tax price: $50/1.08 = $46.30.',
          'Splitting a bill evenly: divide total by number of people. Splitting fairly: each person pays for what they ordered plus equal share of tip and tax. The fair method prevents the person who ordered water from subsidizing the person who ordered steak.',
        ],
      },
      {
        heading: 'Test Scores and Grade Percentages',
        body: [
          'A test score is (correct / total) x 100. Getting 42 out of 50 right is (42/50) x 100 = 84%. This is the same math as any percentage calculation.',
          'GPA calculation weights each course grade by its credit hours. An A (4.0) in a 3-credit course contributes 12 grade points. A B (3.0) in a 4-credit course contributes 12 grade points. Total grade points divided by total credit hours equals GPA.',
          'Final grade calculators show exactly what score you need on remaining assignments to reach a target grade. If you have 85% going into a final worth 30% of the grade, you need at least 85% on the final to maintain 85% overall.',
        ],
      },
    ],
    conclusion: 'Percentages appear in every financial transaction you make. Understanding the difference between markup and margin, knowing how to calculate discounts quickly, and being able to split bills fairly saves real money every week.',
  },
  faqs: [
    { q: 'How do I calculate 15% of a number quickly?', a: 'Find 10% by moving the decimal one place left. Then find 5% by halving that. Add them together. For 15% of $80: 10% = $8, 5% = $4, total = $12.' },
    { q: 'What is the difference between percentage and percentage points?', a: 'Percentage points measure the difference between two percentages. If tax goes from 20% to 25%, it increased by 5 percentage points (not 5%). The percentage increase is (25-20)/20 = 25%.' },
    { q: 'How do I reverse a percentage increase?', a: 'If a price increased by X%, divide by (1 + X/100) to find the original. A $120 price after a 20% increase was $120/1.20 = $100 originally.' },
    { q: 'Is a 50% margin the same as a 50% markup?', a: 'No. 50% margin means profit is half the selling price (cost is the other half). 50% markup means profit is half the cost (selling price is 1.5x cost). A 50% markup equals a 33.3% margin.' },
  ],
  embeddedCalculators: ['percentage-calculator', 'discount-sales-tax-calculator', 'markup-margin-calculator', 'test-score-percentage-calculator'],
  relatedCalculators: ['fraction-to-percent-calculator', 'tip-calculator', 'gpa-calculator'],
  relatedGuides: ['debt-payoff-strategy-guide', 'cooking-by-weight-guide'],
  seo: {
    status: 'index',
    reviewStatus: 'reviewed',
    priority: 0.9,
  },
  publishedAt: '2026-08-22',
};
