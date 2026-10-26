import type { Guide } from '../../../src/types';

export const fractionArithmeticGuideDraft: Guide = {
  id: 'fraction-arithmetic-guide-draft',
  slug: 'fraction-arithmetic-guide',
  name: 'Fraction Arithmetic and Conversions: A Practical Guide',
  shortDesc:
    'Add, subtract, multiply, divide, simplify, and convert fractions with worked examples.',
  category: 'math',
  iconName: 'Divide',
  keywords: ['fraction calculator', 'adding fractions', 'simplify fractions', 'fraction to decimal'],
  content: {
    hook:
      'For addition or subtraction, rewrite fractions with a common denominator before combining numerators. For multiplication, multiply numerators and denominators; for division, multiply by the reciprocal.',
    sections: [
      {
        heading: 'Add fractions using a common denominator',
        body: [
          'To add fractions with different denominators, find a common denominator, rewrite each fraction as an equivalent fraction, add the numerators, and simplify if possible.',
          'For example, 2/3 + 3/4 uses 12 as a common denominator. Rewrite 2/3 as 8/12 and 3/4 as 9/12. Then 8/12 + 9/12 = 17/12 = 1 5/12.',
          'Subtraction follows the same steps, except you subtract the numerators after making the denominators equal.',
        ],
      },
      {
        heading: 'Multiply and divide fractions',
        body: [
          'To multiply, multiply the numerators and multiply the denominators. For 2/3 × 3/5, the result is 6/15, which simplifies to 2/5.',
          'To divide by a nonzero fraction, multiply by its reciprocal. For 3/4 ÷ 2/3, calculate 3/4 × 3/2 = 9/8 = 1 1/8.',
          'You can simplify common factors before multiplying to keep intermediate numbers smaller. The final fraction should be reduced when numerator and denominator share a factor.',
        ],
      },
      {
        heading: 'Convert a fraction to a decimal or percent',
        body: [
          'Divide the numerator by the denominator to get a decimal. Multiply that decimal by 100 to express it as a percent.',
          'For example, 3/8 = 3 ÷ 8 = 0.375. As a percent, 0.375 × 100 = 37.5%. The conversion is exact for this example.',
          'Some fractions produce repeating decimals. If you round the decimal or percent, state the precision so the rounded value is not mistaken for an exact fraction.',
        ],
      },
      {
        heading: 'Assumptions and common mistakes',
        body: [
          'A denominator cannot be zero because division by zero is undefined. The fraction calculator should reject that input rather than present a numeric result.',
          'Do not add or subtract denominators. The denominator describes the size of the fractional parts; make the part sizes equal before combining them.',
          'Check signs, simplify only by common factors, and distinguish a mixed number from a decimal. When a conversion is rounded, retain the original fraction if exactness matters.',
        ],
      },
    ],
    conclusion:
      'Choose the operation, use a common denominator for addition and subtraction, use reciprocals for division, and simplify the result. Convert to decimals or percentages only at the precision the task requires.',
  },
  faqs: [
    {
      q: 'Why do fractions need a common denominator before addition?',
      a: 'The denominator identifies the size of the parts. You can combine the numerators only after rewriting both fractions in equal-sized parts.',
    },
    {
      q: 'How do I divide one fraction by another?',
      a: 'Multiply the first fraction by the reciprocal of the second, provided the divisor is not zero. For example, 3/4 ÷ 2/3 = 3/4 × 3/2 = 9/8.',
    },
    {
      q: 'How do I turn a fraction into a percent?',
      a: 'Divide the numerator by the denominator, then multiply the decimal by 100. For example, 3/8 equals 0.375, or 37.5%.',
    },
  ],
  embeddedCalculators: ['fraction-calculator'],
  relatedCalculators: ['fraction-to-percent-calculator', 'percentage-calculator'],
  relatedGuides: ['understanding-percentages-guide'],
  seo: { status: 'noindex', reviewStatus: 'pending', priority: 0 },
  publishedAt: 'DRAFT - NOT PUBLISHED',
};

export const fractionArithmeticEditorialNotes = {
  primaryQuery: 'fraction calculator',
  userIntent: 'Learn and check common fraction operations and fraction-to-decimal/percent conversions.',
  title: 'Fraction Arithmetic and Conversions: A Practical Guide',
  description:
    'Follow worked examples for adding, multiplying, and dividing fractions, then convert a fraction to a decimal or percent.',
  suggestedInternalLinks: [
    '/calculators/fraction-calculator',
    '/calculators/fraction-to-percent-calculator',
    '/calculators/percentage-calculator',
    '/guides/understanding-percentages-guide',
  ],
  sources: [
    {
      label: 'OpenStax Prealgebra 2e, 4.1 Visualize Fractions',
      url: 'https://openstax.org/books/prealgebra-2e/pages/4-1-visualize-fractions',
      status: 'Retrieved; supports fraction meaning and equivalent fractions.',
    },
    {
      label: 'OpenStax Prealgebra 2e, 4.2 Multiply and Divide Fractions',
      url: 'https://openstax.org/books/prealgebra-2e/pages/4-2-multiply-and-divide-fractions',
      status: 'Retrieved; supports simplification, multiplication, and division.',
    },
    {
      label: 'Math is Fun, Adding Fractions',
      url: 'https://www.mathsisfun.com/fractions_addition.html',
      status: 'Retrieved for common-denominator explanation; use OpenStax as the preferred textbook citation where a matching section is available.',
    },
  ],
  factCheckNotes: [
    'Independently verify every example: 17/12 = 1 5/12; 6/15 = 2/5; 9/8 = 1 1/8; 3/8 = 0.375 = 37.5%.',
    'Check the fraction calculator supports each operation and its input conventions before publication.',
    'Confirm how the tool handles negative values, zero denominators, simplification, and repeating decimals.',
  ],
  ownerReview: ['Assign a real author and a math reviewer; make no author-credential claims without evidence.'],
};
