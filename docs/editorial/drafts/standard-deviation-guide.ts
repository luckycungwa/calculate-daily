import type { Guide } from '../../../src/types';

export const standardDeviationGuideDraft: Guide = {
  id: 'standard-deviation-guide-draft',
  slug: 'standard-deviation-guide',
  name: 'Sample and Population Standard Deviation: A Worked Example',
  shortDesc:
    'Learn what standard deviation measures and when to use the sample or population formula.',
  category: 'math',
  iconName: 'BarChart3',
  keywords: ['standard deviation', 'sample standard deviation', 'population standard deviation'],
  content: {
    hook:
      'Standard deviation summarizes how far data values tend to spread from their mean. Use the population formula when the data is the full population of interest; use the sample formula when estimating spread from a sample.',
    sections: [
      {
        heading: 'The two formulas',
        body: [
          'First calculate the mean, then find each value’s difference from the mean, square those differences, and add them.',
          'Population standard deviation is the square root of the squared-deviation sum divided by n, the number of values. Sample standard deviation is the square root of that sum divided by n − 1.',
          'The sample formula’s denominator is different because it estimates population spread from a sample. Standard deviation is expressed in the same units as the original data; variance is expressed in squared units.',
        ],
      },
      {
        heading: 'Worked example: 4, 8, 6, 5, 3',
        body: [
          'The mean is (4 + 8 + 6 + 5 + 3) ÷ 5 = 5.2. The squared deviations are 1.44, 7.84, 0.64, 0.04, and 4.84; their sum is 14.8.',
          'For the full population, variance is 14.8 ÷ 5 = 2.96 and standard deviation is √2.96 ≈ 1.72.',
          'If these five values are a sample, sample variance is 14.8 ÷ 4 = 3.7 and sample standard deviation is √3.7 ≈ 1.92.',
        ],
      },
      {
        heading: 'Interpret the result in context',
        body: [
          'A smaller standard deviation indicates values are closer to the mean on this measure; a larger value indicates more spread. Compare values only when their units and datasets make the comparison meaningful.',
          'Standard deviation alone does not tell you why the data varies or whether it follows a normal distribution. A histogram, context, and other summaries may be needed to describe the shape of the data.',
          'Outliers can have a strong effect because deviations are squared. For skewed data or data with influential extremes, also inspect the median, range, and interquartile range.',
        ],
      },
      {
        heading: 'Common mistakes',
        body: [
          'Do not choose sample or population solely because one answer looks more familiar. Decide whether the values are the entire population you want to describe or a sample used to estimate a larger population.',
          'Do not compare a standard deviation with a variance without accounting for the squared units.',
          'Avoid interpreting one standard deviation as a fixed percentage of observations unless the distributional assumptions justify that statement.',
        ],
      },
    ],
    conclusion:
      'Choose the sample or population formula based on what the dataset represents, verify the mean and squared-deviation sum, and interpret the result in the original units and context.',
  },
  faqs: [
    {
      q: 'What is the difference between sample and population standard deviation?',
      a: 'Population standard deviation divides the squared-deviation sum by n. Sample standard deviation divides by n − 1 to estimate spread from a sample.',
    },
    {
      q: 'Does standard deviation have the same units as the data?',
      a: 'Yes. Standard deviation is the square root of variance, so it returns to the original data units. Variance uses squared units.',
    },
    {
      q: 'Does a low standard deviation prove that data is normally distributed?',
      a: 'No. Standard deviation measures spread around the mean; it does not establish the shape or distribution of the data.',
    },
  ],
  embeddedCalculators: ['standard-deviation-calculator'],
  relatedCalculators: ['mean-median-mode-calculator', 'percentage-calculator'],
  relatedGuides: [],
  seo: { status: 'noindex', reviewStatus: 'pending', priority: 0 },
  publishedAt: 'DRAFT - NOT PUBLISHED',
};

export const standardDeviationEditorialNotes = {
  primaryQuery: 'standard deviation calculator',
  userIntent: 'Understand and calculate sample or population standard deviation for a dataset.',
  title: 'Sample and Population Standard Deviation: A Worked Example',
  description:
    'Compare sample and population standard deviation with formulas, a checked example, and practical interpretation limits.',
  suggestedInternalLinks: [
    '/calculators/standard-deviation-calculator',
    '/calculators/mean-median-mode-calculator',
    '/calculators/percentage-calculator',
  ],
  sources: [
    {
      label: 'NIST Engineering Statistics Handbook, Measures of Scale',
      url: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm',
      status: 'Retrieved; reviewed definitions of variance, standard deviation, units, and alternative spread measures.',
    },
  ],
  factCheckNotes: [
    'Hand-check the dataset: mean 5.2; squared-deviation sum 14.8; population standard deviation √2.96 ≈ 1.7205; sample standard deviation √3.7 ≈ 1.9235.',
    'Verify the calculator labels and results for sample versus population and confirms n − 1 versus n.',
    'Avoid statements that infer normality or a fixed proportion of observations from standard deviation alone.',
  ],
  ownerReview: ['Assign a real author and a statistics reviewer before publication.'],
};
