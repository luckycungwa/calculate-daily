import type { Guide } from '../../../src/types';

export const pricePerUnitGuideDraft: Guide = {
  id: 'price-per-unit-guide-draft',
  slug: 'price-per-unit-guide',
  name: 'How to Compare Price per Unit Across Package Sizes',
  shortDesc:
    'Normalize package prices to the same unit so you can compare different sizes fairly.',
  category: 'daily',
  iconName: 'Receipt',
  keywords: ['price per unit', 'unit price', 'compare package sizes'],
  content: {
    hook:
      'To compare two package sizes, divide each package price by the same normalized quantity. A lower shelf price does not necessarily mean a lower cost for the amount you need.',
    sections: [
      {
        heading: 'The direct answer: compare the same unit',
        body: [
          'Use price per unit = package price ÷ package quantity. First convert quantities to the same unit; then compare the results. For weight, this calculator shows price per 100 grams. For volume, it shows price per 100 millilitres. Countable items can be compared per item.',
          'The comparison is meaningful only when the products are reasonably comparable and the quantities use the same kind of measurement. Weight and volume are different dimensions; a density is needed to convert between them.',
        ],
      },
      {
        heading: 'Worked example: two bags of coffee',
        body: [
          'A 500 g bag costs $4.00. Its normalized price is $4.00 ÷ 500 × 100 = $0.80 per 100 g.',
          'A 750 g bag costs $5.25. Its normalized price is $5.25 ÷ 750 × 100 = $0.70 per 100 g. On this measure, the 750 g bag costs less for the same weight.',
          'At the smaller bag’s 500 g quantity, the larger bag’s equivalent cost is $0.70 × 5 = $3.50. That is $0.50 less than the $4.00 smaller bag, assuming the displayed prices are the prices you actually pay.',
        ],
      },
      {
        heading: 'Compare like with like',
        body: [
          'Use the same unit for every item: grams with grams, millilitres with millilitres, or individual items with individual items. The Price per Unit Calculator converts compatible units within a measurement family before comparing them.',
          'For a promotion, enter the effective package price after a coupon or discount. If a promotion requires buying multiple packages, divide the total amount paid by the total quantity received. The calculator does not evaluate loyalty points, conditional offers, or future waste.',
        ],
      },
      {
        heading: 'Assumptions and common mistakes',
        body: [
          'A lower unit price is not automatically the better purchase if the product quality, usable portion, freshness, or amount you will actually use differs. Compare the same product type and account for any required multi-buy quantity.',
          'Do not compare kilograms directly with litres as if they were interchangeable. Ingredients and products have different densities. Use a product-specific, sourced density only when a weight-to-volume comparison is necessary.',
          'Round only after calculating the normalized values. Rounding package prices or quantities too early can make close results appear equal or reverse the comparison.',
        ],
      },
    ],
    conclusion:
      'Normalize both packages to the same unit, compare the resulting prices, and then consider whether the products and quantities suit your needs. The calculator provides the arithmetic; it cannot judge quality or whether a bulk purchase will be used.',
  },
  faqs: [
    {
      q: 'How do I calculate price per 100 grams?',
      a: 'Divide the package price by its weight in grams, then multiply by 100. For example, $4.00 ÷ 500 × 100 = $0.80 per 100 g.',
    },
    {
      q: 'Can I compare grams with ounces?',
      a: 'Yes. Convert both quantities to a common weight unit before dividing price by quantity. The calculator normalizes compatible weight units.',
    },
    {
      q: 'Can I compare litres with kilograms?',
      a: 'Not directly. Volume and mass are different dimensions; you need a valid product-specific density to convert between them.',
    },
  ],
  embeddedCalculators: ['price-per-unit-calculator'],
  relatedCalculators: ['discount-sales-tax-calculator', 'meal-cost-calculator'],
  relatedGuides: [],
  seo: { status: 'noindex', reviewStatus: 'pending', priority: 0 },
  publishedAt: 'DRAFT - NOT PUBLISHED',
};

export const pricePerUnitEditorialNotes = {
  primaryQuery: 'price per unit calculator',
  userIntent: 'Normalize and compare package prices across different quantities.',
  title: 'How to Compare Price per Unit Across Package Sizes',
  description:
    'Learn the price-per-unit formula, compare package sizes with a worked example, and avoid mismatched units.',
  suggestedInternalLinks: [
    '/calculators/price-per-unit-calculator',
    '/calculators/discount-sales-tax-calculator',
    '/calculators/meal-cost-calculator',
  ],
  sources: [
    {
      label: 'Federal Trade Commission, Unit Pricing Guide for Businesses',
      url: 'https://www.ftc.gov/business-guidance/resources/unit-pricing-guide-businesses',
      status: 'Manual verification required: the available fetcher returned HTTP 403. Do not rely on regulatory claims until reviewed.',
    },
  ],
  factCheckNotes: [
    'Recalculate the worked example independently; both normalized values and the $0.50 equivalent saving are hand-checked.',
    'Confirm the current calculator unit families and displayed result precision before publication.',
    'Do not add legal claims about unit-price label requirements without jurisdiction-specific source review.',
  ],
  ownerReview: ['Assign the real author and factual reviewer; approve source access and final terminology.'],
};
