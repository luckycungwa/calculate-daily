import { CalculatorMeta } from '../../types';

export const MATH_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'percentage',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    shortDesc: 'Find percentage of a value, percentage increase/decrease, and ratios instantly.',
    tagline: 'Effortless percentage formulas for shopping, grades, and analysis.',
    category: 'math',
    iconName: 'Percent',
    badge: 'Essential',
    featured: true,
    keywords: ['percent', 'percentage', 'percentage calculator', 'percent of', 'percent increase', 'percent decrease', 'what is 20 percent of', 'ratio'],
    kind: 'custom',
    componentId: 'PercentageCalculator',
    content: {
      intro:
        'The Percentage Calculator solves the three most common percentage problems in one tool: finding a percentage of a number, determining what percentage one number is of another, and computing the percentage increase or decrease between two values. It is built for shoppers checking discounts, students grading work, and analysts comparing figures.',
      howItWorks:
        'Percentage problems reduce to three formulas. A portion is computed as (rate / 100) x base. A share of a total is (part / total) x 100. A delta is ((new - old) / |old|) x 100, where a positive result signals an increase and a negative result a decrease.',
      example:
        'You want 15% of 240. The calculator computes (15 / 100) x 240 = 36. Enter 45 and 180 to see that 45 is exactly 25% of 180, and enter 80 then 100 to see a 25% increase.',
      formulas: [
        {
          label: 'Percentage of a Value',
          expression: 'Part = (Rate / 100) × Base',
          note: 'Rate is the percent, Base is the whole.',
        },
        {
          label: 'Percentage Share',
          expression: 'Share = (Part / Total) × 100',
        },
        {
          label: 'Percent Change',
          expression: 'Change = ((New − Old) / |Old|) × 100',
          note: 'Positive means increase, negative means decrease.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Percent of Value',
          explanation:
            'The exact portion of the base number represented by the percentage rate. For 15% of 240 it returns 36.',
        },
        {
          resultLabel: 'Percent Change',
          explanation:
            'How much a value grew or shrank relative to its starting point, expressed as a percentage.',
        },
      ],
      workflowLinks: [
        { slug: 'discount-sales-tax-calculator', step: 'Apply your percentage savings to an actual purchase.' },
        { slug: 'fraction-to-percent-calculator', step: 'Convert the same relationship from fraction to percent form.' },
      ],
      faqs: [
        { q: 'How do I find what percent one number is of another?', a: 'Divide the part by the total and multiply by 100. For example, 45 is 45 / 180 x 100 = 25% of 180.' },
        { q: 'How do I calculate a percentage increase?', a: 'Subtract the original value from the new value, divide by the original value, and multiply by 100. A rise from 80 to 100 is a 25% increase.' },
        { q: 'Can this calculator work with negative deltas?', a: 'Yes. When the final value is lower than the initial value, the calculator reports a negative percentage, shown as a decrease.' },
      ],
      related: ['fraction-to-percent-calculator', 'markup-margin-calculator', 'discount-sales-tax-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.9,
    },
  },
  {
    id: 'discount',
    slug: 'discount-sales-tax-calculator',
    name: 'Discount & Sales Tax Calculator',
    shortDesc: 'Compute discounted prices, stacking promo codes, and final checkout totals.',
    tagline: 'Never wonder how much you save on clearance racks again.',
    category: 'math',
    iconName: 'Tag',
    badge: 'Shopping',
    keywords: ['discount', 'discount calculator', 'sales tax', 'coupon', 'sale price', 'clearance', 'percent off', 'final price', 'promo code'],
    kind: 'custom',
    componentId: 'DiscountCalculator',
    content: {
      intro:
        'The Discount & Sales Tax Calculator works out your exact final price after a primary discount, a stacked promo code, and sales tax. It shows precisely how much money you keep in your pocket at the register.',
      howItWorks:
        'Each markdown is applied sequentially to the running price, never to the original. The calculator first subtracts the primary discount, then applies the extra coupon to the discounted subtotal, then adds sales tax to reach the final checkout figure.',
      example:
        'A R120 jacket at 25% off with an extra 10% promo code and 8% sales tax drops to roughly R87.48. The tool reports the R32.52 saved and the tax added in one screen.',
      formulas: [
        {
          label: 'Price After Discount',
          expression: 'Price = Original × (1 − Discount / 100)',
          note: 'Each stacked discount applies to the running price.',
        },
        {
          label: 'Final Price With Tax',
          expression: 'Final = Subtotal × (1 + Tax / 100)',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Final Price',
          explanation:
            'The amount you actually pay after every stacked discount and sales tax has been applied in sequence.',
        },
        {
          resultLabel: 'Total Savings',
          explanation:
            'The combined dollar value of every discount applied, shown as the difference between original and final price before tax.',
        },
      ],
      workflowLinks: [
        { slug: 'percentage-calculator', step: 'Verify a single discount percentage in isolation.' },
        { slug: 'markup-margin-calculator', step: 'Check the retailer margin behind the discount price.' },
      ],
      faqs: [
        { q: 'Do stacked discounts apply to the original price?', a: 'No. Each discount applies to the price after the previous discount. Applying 25% then 10% is not the same as 35% off.' },
        { q: 'How is sales tax calculated?', a: 'Sales tax is computed on the discounted subtotal, not the original price, so you never pay tax on money you have already saved.' },
        { q: 'Can I use it for different tax rates?', a: 'Yes. Enter your local rate, from 0% in tax-free states to higher rates, and the calculator recomputes instantly.' },
      ],
      related: ['percentage-calculator', 'markup-margin-calculator', 'meal-cost-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.75,
    },
  },
  {
    id: 'ratio',
    slug: 'ratio-proportion-calculator',
    name: 'Ratio & Proportion Finder',
    shortDesc: 'Solve proportions like a:b = c:d and scale values by a ratio.',
    tagline: 'Find the missing term in any ratio instantly.',
    category: 'math',
    iconName: 'Scale',
    keywords: ['ratio', 'proportion', 'ratio calculator', 'proportion calculator', 'cross multiply', 'scale factor'],
    kind: 'config',
    config: {
      fields: [
        { id: 'a', label: 'Ratio Term A', type: 'number', defaultValue: 2, min: 0 },
        { id: 'b', label: 'Ratio Term B', type: 'number', defaultValue: 5, min: 0 },
        { id: 'c', label: 'Known Matching Value', type: 'number', defaultValue: 8, min: 0 },
      ],
      results: [
        { label: 'Missing Value (D)', formulaCode: 'c * b / a', accent: true },
        { label: 'Scale Factor', formulaCode: 'c / a' },
      ],
      formulaDescription: 'D = C x (B / A)',
      tips: [
        'Ratios express relationships: a recipe ratio of 2:5 scales any amount.',
        'Cross-multiplication works for any four-term proportion.',
      ],
    },
    content: {
      intro:
        'The Ratio & Proportion Finder solves proportions of the form A:B = C:D. Given three known terms it instantly returns the missing fourth, which makes it ideal for scaling recipes, resizing images, mixing solutions, and converting between units.',
      howItWorks:
        'A proportion states that two ratios are equal. Cross-multiplying gives A x D = B x C, so the missing value is D = C x B / A. The tool also reports the scale factor, which is how many times larger the matched side has been scaled.',
      example:
        'A paint mix needs a 2:5 ratio of base to pigment. If you pour 8 liters of base, the missing pigment is 8 x 5 / 2 = 20 liters.',
      formulas: [
        {
          label: 'Missing Proportion Term',
          expression: 'D = C × (B / A)',
          note: 'From the equality A:B = C:D via cross-multiplication.',
        },
        {
          label: 'Scale Factor',
          expression: 'Scale = C / A',
          note: 'How many times larger the matched side is scaled.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Missing Value (D)',
          explanation:
            'The fourth term that keeps the ratio proportional. For A:B = 2:5 with C = 8, the result is 20.',
        },
        {
          resultLabel: 'Scale Factor',
          explanation:
            'The multiplier connecting the two ratio sides. It shows how much larger the second set of terms is than the first.',
        },
      ],
      workflowLinks: [
        { slug: 'recipe-scaling-calculator', step: 'Scale a recipe proportionally using the same math.' },
        { slug: 'fraction-to-percent-calculator', step: 'Express the ratio as a percentage instead.' },
      ],
      faqs: [
        { q: 'What does A:B = C:D mean?', a: 'It states that the relationship between A and B is the same as the relationship between C and D. Given any three values, the fourth can always be found.' },
        { q: 'Can I use this to scale recipes?', a: 'Yes. Set A to the original yield and C to the desired yield, with B as the ingredient amount. The result D is the scaled ingredient amount.' },
        { q: 'What if the ratio is inverted?', a: 'Enter the terms in the order they appear in your ratio. Swapping A and B simply gives the reciprocal relationship.' },
      ],
      related: ['percentage-calculator', 'recipe-scaling-calculator', 'fraction-to-percent-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
    },
  },
  {
    id: 'fraction-percent',
    slug: 'fraction-to-percent-calculator',
    name: 'Fraction to Percent Converter',
    shortDesc: 'Convert any fraction to a percentage and decimal in one step.',
    tagline: 'Turn numerators and denominators into clean percentages.',
    category: 'math',
    iconName: 'Divide',
    keywords: ['fraction', 'fraction to percent', 'fraction to decimal', 'convert fraction', 'percentage'],
    kind: 'config',
    config: {
      fields: [
        { id: 'numerator', label: 'Numerator', type: 'number', defaultValue: 3, min: 0 },
        { id: 'denominator', label: 'Denominator', type: 'number', defaultValue: 4, min: 1 },
      ],
      results: [
        { label: 'Percentage', formulaCode: '(numerator / denominator) * 100', suffix: '%', accent: true },
        { label: 'Decimal Value', formulaCode: 'numerator / denominator' },
      ],
      formulaDescription: 'Percentage = (Numerator / Denominator) x 100',
      tips: [
        'A fraction is simply division waiting to happen: 3/4 means 3 divided by 4.',
        'Percentages are just fractions scaled to a denominator of 100.',
      ],
    },
    content: {
      intro:
        'The Fraction to Percent Converter transforms a fraction into its percentage and decimal equivalents instantly. Students checking homework, cooks scaling recipes, and analysts reading ratios all benefit from this one-step conversion.',
      howItWorks:
        'Dividing the numerator by the denominator yields the decimal form. Multiplying that decimal by 100 produces the percentage. The tool reports both, so you never have to repeat the arithmetic.',
      example:
        'Enter 3 as the numerator and 4 as the denominator. The calculator returns 75% and 0.75, matching the familiar 3/4 = 75% equivalence.',
      formulas: [
        {
          label: 'Percentage',
          expression: 'Percentage = (Numerator / Denominator) × 100',
        },
        {
          label: 'Decimal Equivalent',
          expression: 'Decimal = Numerator / Denominator',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Percentage',
          explanation:
            'The fraction scaled to a denominator of 100. For 3/4, this is 75%.',
        },
        {
          resultLabel: 'Decimal Value',
          explanation:
            'The fraction expressed as a decimal. For 3/4, this is 0.75, useful in further calculations.',
        },
      ],
      workflowLinks: [
        { slug: 'percentage-calculator', step: 'Use the percentage in a share or change calculation.' },
        { slug: 'test-score-percentage-calculator', step: 'Convert a score fraction into a grade percentage.' },
      ],
      faqs: [
        { q: 'How do I convert a fraction to a percentage by hand?', a: 'Divide the numerator by the denominator, then multiply by 100. For 1/8, that is 0.125 x 100 = 12.5%.' },
        { q: 'What if the fraction is improper?', a: 'Improper fractions where the numerator exceeds the denominator produce percentages above 100%, which the calculator handles correctly.' },
        { q: 'What is 1/3 as a percentage?', a: '1/3 is 33.33% when rounded to two decimals. The tool displays repeating fractions with two-decimal precision.' },
      ],
      related: ['percentage-calculator', 'ratio-proportion-calculator', 'gpa-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
    },
  },
  {
    id: 'markup-margin',
    slug: 'markup-margin-calculator',
    name: 'Markup & Margin Calculator',
    shortDesc: 'Convert markup percentages to margin and set profitable selling prices.',
    tagline: 'Price products correctly with clear profit math.',
    category: 'math',
    iconName: 'LineChart',
    badge: 'Business',
    keywords: ['markup', 'margin', 'markup calculator', 'profit margin', 'selling price', 'pricing', 'gross margin'],
    kind: 'config',
    config: {
      fields: [
        { id: 'cost', label: 'Cost Price', type: 'number', defaultValue: 40, min: 0, prefix: '$' },
        { id: 'markupPct', label: 'Markup Percentage', type: 'number', defaultValue: 50, min: 0, suffix: '%' },
      ],
      results: [
        { label: 'Selling Price', formulaCode: 'cost * (1 + markupPct / 100)', prefix: '$', accent: true },
        { label: 'Gross Profit', formulaCode: 'cost * (markupPct / 100)', prefix: '$' },
        { label: 'Profit Margin', formulaCode: '(cost * (markupPct / 100)) / (cost * (1 + markupPct / 100)) * 100', suffix: '%' },
      ],
      formulaDescription: 'Selling Price = Cost x (1 + Markup / 100); Margin = Profit / Selling Price x 100',
      tips: [
        'A 50% markup only produces a 33.3% margin, because margin is measured against the selling price.',
        'To target a specific margin, markup needed = margin / (1 - margin).',
      ],
    },
    content: {
      intro:
        'The Markup & Margin Calculator converts your cost into a selling price using markup percentage, then reveals the true profit margin. Retailers and freelancers use it to avoid the classic trap of confusing markup with margin.',
      howItWorks:
        'Markup is added on top of cost: selling price = cost x (1 + markup / 100). Margin measures profit against the selling price instead: margin = profit / selling price x 100. Because the two use different bases, a 50% markup equals only a 33.3% margin.',
      example:
        'A product costs R40. At a 50% markup the selling price is R60, profit is R20, and the margin is 20 / 60 = 33.3%.',
      formulas: [
        {
          label: 'Selling Price',
          expression: 'Price = Cost × (1 + Markup / 100)',
        },
        {
          label: 'Profit Margin',
          expression: 'Margin = Profit / Selling Price × 100',
          note: 'Margin is measured against selling price, not cost.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Selling Price',
          explanation:
            'The price a customer pays, built from cost plus the markup percentage applied to that cost.',
        },
        {
          resultLabel: 'Profit Margin',
          explanation:
            'Profit expressed as a share of the selling price. It is always smaller than the markup for the same sale.',
        },
      ],
      workflowLinks: [
        { slug: 'percentage-calculator', step: 'Convert between markup and margin percentages.' },
        { slug: 'discount-sales-tax-calculator', step: 'Add a customer-facing discount on top of your pricing.' },
      ],
      faqs: [
        { q: 'What is the difference between markup and margin?', a: 'Markup is profit divided by cost; margin is profit divided by selling price. They are different numbers for the same sale.' },
        { q: 'What markup gives a 40% margin?', a: 'Use markup = margin / (1 - margin) = 0.4 / 0.6 = 66.7%. The calculator can check this by entering cost and markup together.' },
        { q: 'Is margin before or after taxes?', a: 'This calculator reports gross margin before taxes and overhead. Net margin would subtract operating expenses as well.' },
      ],
      related: ['percentage-calculator', 'discount-sales-tax-calculator', 'hourly-to-annual-salary-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.75,
    },
  },
  {
    id: 'gpa',
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    shortDesc: 'Compute grade point average from total points and credit hours.',
    tagline: 'Average your semester grade points with credit weighting.',
    category: 'math',
    iconName: 'GraduationCap',
    keywords: ['gpa', 'gpa calculator', 'grade point average', 'college gpa', 'credit hours', 'semester gpa'],
    kind: 'config',
    config: {
      fields: [
        { id: 'totalPoints', label: 'Total Grade Points', type: 'number', defaultValue: 42, min: 0 },
        { id: 'totalCredits', label: 'Total Credit Hours', type: 'number', defaultValue: 14, min: 1 },
      ],
      results: [
        { label: 'Grade Point Average', formulaCode: 'totalPoints / totalCredits', accent: true },
      ],
      formulaDescription: 'GPA = Total Grade Points / Total Credit Hours',
      tips: [
        'Grade points equal the letter value (A = 4) multiplied by the course credits.',
        'Weighted classes may add bonus points, so confirm your scale first.',
      ],
    },
    content: {
      intro:
        'The GPA Calculator averages your grade point average by dividing total grade points by total credit hours. It works for both the standard 4.0 scale and weighted scales, giving students a fast checkpoint between report cards.',
      howItWorks:
        'Each course contributes points equal to its grade value multiplied by its credit hours. Summing all courses and dividing by total credits produces the GPA. Enter 42 points across 14 credits and the calculator returns a 3.0 average.',
      example:
        'A student earns an A (4.0) in a 3-credit class and a B (3.0) in a 4-credit class. Points total 12 + 12 = 24 over 7 credits, giving a GPA of 3.43.',
      formulas: [
        {
          label: 'Grade Point Average',
          expression: 'GPA = Total Grade Points / Total Credit Hours',
          note: 'Each course contributes grade value × credit hours.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Grade Point Average',
          explanation:
            'The credit-weighted average of your course grades. It tells you exactly where you stand on your institution scale.',
        },
      ],
      workflowLinks: [
        { slug: 'test-score-percentage-calculator', step: 'Convert individual exam scores into grade points.' },
        { slug: 'percentage-calculator', step: 'Check what percentage of your program each class counts for.' },
      ],
      faqs: [
        { q: 'How are grade points calculated?', a: 'Multiply the grade value (A = 4.0, B = 3.0, C = 2.0, D = 1.0) by the credit hours of the course, then sum them all.' },
        { q: 'Does this work for weighted GPAs?', a: 'Yes, as long as you enter points already adjusted for weighting. Advanced Placement or Honors values are typically one point higher per grade.' },
        { q: 'What if I want to include all semesters?', a: 'Enter the cumulative points and cumulative credits across all semesters to find your overall GPA.' },
      ],
      related: ['test-score-percentage-calculator', 'percentage-calculator', 'fraction-to-percent-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.6,
    },
  },
  {
    id: 'test-score',
    slug: 'test-score-percentage-calculator',
    name: 'Test Score Percentage Calculator',
    shortDesc: 'Convert correct answers into a test percentage instantly.',
    tagline: 'Know your grade the moment the test ends.',
    category: 'math',
    iconName: 'ClipboardCheck',
    keywords: ['test score', 'grade calculator', 'quiz score', 'percentage', 'exam grade', 'correct answers'],
    kind: 'config',
    config: {
      fields: [
        { id: 'correct', label: 'Questions Correct', type: 'number', defaultValue: 38, min: 0 },
        { id: 'total', label: 'Total Questions', type: 'number', defaultValue: 40, min: 1 },
      ],
      results: [
        { label: 'Score Percentage', formulaCode: '(correct / total) * 100', suffix: '%', accent: true },
        { label: 'Questions Wrong', formulaCode: 'total - correct' },
      ],
      formulaDescription: 'Score = (Correct / Total) x 100',
      tips: [
        'A score of 38/40 equals 95%, a solid A on most grading scales.',
        'Enter wrong answers directly to see both figures at once.',
      ],
    },
    content: {
      intro:
        'The Test Score Percentage Calculator converts correct answers into a percentage in a split second. Students, teachers, and quiz hosts use it to convert raw scores into grades without mental math.',
      howItWorks:
        'The tool divides the number of correct answers by the total number of questions and multiplies by 100. It also reports how many questions were missed for quick review planning.',
      example:
        'Answer 38 of 40 correctly and the calculator returns 95% with 2 questions wrong. A 40/40 gives a perfect 100%.',
      formulas: [
        {
          label: 'Score Percentage',
          expression: 'Score = (Correct / Total) × 100',
        },
        {
          label: 'Questions Wrong',
          expression: 'Wrong = Total − Correct',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Score Percentage',
          explanation:
            'The share of questions answered correctly, scaled to a percentage. 38/40 becomes 95%.',
        },
        {
          resultLabel: 'Questions Wrong',
          explanation:
            'The count of missed questions, shown alongside your score for quick review planning.',
        },
      ],
      workflowLinks: [
        { slug: 'gpa-calculator', step: 'Turn your test scores into a semester GPA.' },
        { slug: 'percentage-calculator', step: 'Explore what your score means as a share of the total.' },
      ],
      faqs: [
        { q: 'How do I calculate my test percentage?', a: 'Divide the number of correct answers by the total number of questions, then multiply by 100.' },
        { q: 'What is a passing percentage?', a: 'It depends on your institution, but 60% is a common minimum and 70% is typical for many programs.' },
        { q: 'Can I plan for a target grade?', a: 'Enter your goal score as the correct count over the total to verify how many questions you need to get right.' },
      ],
      related: ['percentage-calculator', 'gpa-calculator', 'fraction-to-percent-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.6,
    },
  },
  {
    id: 'scientific',
    slug: 'scientific-calculator',
    name: 'Scientific Calculator',
    shortDesc: 'Full scientific calculator with trigonometry, logarithms, exponents, factorials, and keyboard support.',
    tagline: 'Powerful math at your fingertips.',
    category: 'math',
    iconName: 'Calculator',
    badge: 'Science',
    keywords: ['scientific calculator', 'online calculator', 'trig calculator', 'log calculator', 'math calculator'],
    kind: 'custom',
    componentId: 'ScientificCalculator',
    content: {
      intro: 'The Scientific Calculator handles standard arithmetic plus trigonometric functions, logarithms, powers, roots, factorials, and constants like pi and e. It supports both DEG and RAD angle modes.',
      howItWorks: 'Expressions are parsed using a recursive descent parser that handles operator precedence, unary operators, function calls, and postfix operations. Trig functions respect the selected angle mode.',
      example: 'sin(30) in DEG mode = 0.5. log(100) = 2. sqrt(144) = 12. 5! = 120. 2^10 = 1024.',
      formulas: [
        { label: 'Sine', expression: 'sin(x) where x is in degrees or radians' },
        { label: 'Logarithm', expression: 'log(x) = log10(x), ln(x) = natural log' },
      ],
      resultExplanations: [
        { resultLabel: 'Result', explanation: 'The evaluated result of your expression, updated live as you type.' },
      ],
      workflowLinks: [
        { slug: 'percentage-calculator', step: 'Quick percentage calculations.' },
        { slug: 'compound-interest-calculator', step: 'Apply scientific math to financial formulas.' },
      ],
      faqs: [
        { q: 'How do I switch between degrees and radians?', a: 'Click the DEG/RAD button in the display area. DEG mode is the default and most common for everyday use.' },
        { q: 'Does it support keyboard input?', a: 'Yes. Focus the calculator and type numbers, operators, parentheses, and functions. Enter evaluates, Escape clears, Backspace deletes.' },
        { q: 'What is the maximum precision?', a: 'Results are displayed to 12 significant figures. Internal calculations use standard IEEE 754 double precision.' },
      ],
      related: ['percentage-calculator', 'compound-interest-calculator', 'ratio-proportion-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'std-dev',
    slug: 'standard-deviation-calculator',
    name: 'Standard Deviation Calculator',
    shortDesc: 'Calculate mean, median, sample and population standard deviation, variance, and more from a list of numbers.',
    tagline: 'Complete descriptive statistics.',
    category: 'math',
    iconName: 'BarChart3',
    badge: 'Statistics',
    keywords: ['standard deviation calculator', 'variance calculator', 'descriptive statistics', 'mean calculator', 'stat calculator'],
    kind: 'custom',
    componentId: 'StandardDeviationCalculator',
    content: {
      intro: 'The Standard Deviation Calculator computes a full set of descriptive statistics from any list of numbers: mean, median, sample and population standard deviation, variance, min, max, and range.',
      howItWorks: 'Enter numbers separated by commas, spaces, or newlines. The calculator parses them, computes the mean, then calculates deviation from the mean for each value. Sample deviation uses n-1 (Bessel correction); population uses n.',
      example: 'For 4, 8, 6, 5, 3: mean = 5.2, sample std dev = 1.92, population std dev = 1.72.',
      formulas: [
        { label: 'Mean', expression: 'Mean = Sum / Count' },
        { label: 'Sample Std Dev', expression: 's = sqrt(Sum((x - mean)^2) / (n-1))' },
      ],
      resultExplanations: [
        { resultLabel: 'Sample Std Dev', explanation: 'Standard deviation using n-1, appropriate for a sample of a larger population.' },
        { resultLabel: 'Population Std Dev', explanation: 'Standard deviation using n, appropriate when the data is the entire population.' },
      ],
      workflowLinks: [
        { slug: 'mean-median-mode-calculator', step: 'Find central tendency measures.' },
        { slug: 'percentage-calculator', step: 'Convert statistics to percentages.' },
      ],
      faqs: [
        { q: 'What is the difference between sample and population?', a: 'Sample standard deviation uses n-1 (Bessel correction) to estimate the true population parameter. Use it when your data is a subset. Population uses n and is exact for the full dataset.' },
        { q: 'What does standard deviation tell me?', a: 'It measures how spread out numbers are from the mean. A low std dev means values cluster near the mean; a high std dev means they are widely spread.' },
        { q: 'What input formats work?', a: 'Numbers separated by commas, spaces, or newlines. Mix formats in the same input: "1, 2 3\n4" works fine.' },
      ],
      related: ['mean-median-mode-calculator', 'percentage-calculator', 'gpa-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75 },
  },
  {
    id: 'mean-median-mode',
    slug: 'mean-median-mode-calculator',
    name: 'Mean, Median & Mode Calculator',
    shortDesc: 'Find the mean, median, and mode of any dataset with range, sum, and count.',
    tagline: 'Central tendency at a glance.',
    category: 'math',
    iconName: 'BarChart3',
    badge: 'Statistics',
    keywords: ['mean calculator', 'median calculator', 'mode calculator', 'average calculator', 'mean median mode'],
    kind: 'custom',
    componentId: 'MeanMedianModeCalculator',
    content: {
      intro: 'The Mean, Median & Mode Calculator finds all three measures of central tendency from a list of numbers, plus sum, count, and range.',
      howItWorks: 'Mean is the sum divided by count. Median is the middle value when sorted (or average of the two middle values for even counts). Mode is the most frequent value; bimodal and multimodal datasets are detected.',
      example: 'For 3, 7, 7, 2, 9: mean = 5.6, median = 7, mode = 7, range = 7.',
      formulas: [
        { label: 'Mean', expression: 'Mean = Sum / Count' },
        { label: 'Median', expression: 'Middle value of sorted dataset' },
      ],
      resultExplanations: [
        { resultLabel: 'Mean', explanation: 'The arithmetic average of all values.' },
        { resultLabel: 'Median', explanation: 'The middle value that separates the lower and upper halves.' },
        { resultLabel: 'Mode', explanation: 'The value(s) that appear most frequently.' },
      ],
      workflowLinks: [
        { slug: 'standard-deviation-calculator', step: 'Measure how spread out your data is.' },
        { slug: 'gpa-calculator', step: 'Apply averages to grade calculations.' },
      ],
      faqs: [
        { q: 'What if there are multiple modes?', a: 'The calculator shows all values that share the highest frequency. A dataset with two modes is bimodal; three or more is multimodal.' },
        { q: 'Which measure should I use?', a: 'Mean is best for symmetric data without outliers. Median is better for skewed data. Mode is useful for categorical or discrete data.' },
        { q: 'Can I enter negative numbers?', a: 'Yes. Negative numbers, decimals, and mixed formats all work.' },
      ],
      related: ['standard-deviation-calculator', 'percentage-calculator', 'gpa-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
  },
  {
    id: 'final-grade',
    slug: 'final-grade-calculator',
    name: 'Final Grade Needed Calculator',
    shortDesc: 'Find out what score you need on the final exam to achieve your target grade.',
    tagline: 'Know the exact score you need.',
    category: 'math',
    iconName: 'GraduationCap',
    badge: 'School',
    keywords: ['final grade calculator', 'what do I need on my final', 'grade calculator', 'exam score needed', 'grade needed'],
    kind: 'custom',
    componentId: 'FinalGradeCalculator',
    content: {
      intro: 'The Final Grade Calculator tells you exactly what score you need on your final exam to reach your target grade. Enter your current grade, desired grade, and the exam weight.',
      howItWorks: 'The formula is: Required = (Target - Current x (1 - Weight/100)) / (Weight/100). If the result exceeds 100, the target is mathematically impossible with that exam weight.',
      example: 'Current grade: 75%, target: 80%, final weight: 25%. Required score = (80 - 75 x 0.75) / 0.25 = (80 - 56.25) / 0.25 = 95%.',
      formulas: [
        { label: 'Required Score', expression: 'Required = (Target - Current x (1 - Weight/100)) / (Weight/100)' },
      ],
      resultExplanations: [
        { resultLabel: 'Required Exam Score', explanation: 'The minimum percentage you need on the final to hit your target.' },
      ],
      workflowLinks: [
        { slug: 'gpa-calculator', step: 'Compute your overall GPA across courses.' },
        { slug: 'test-score-percentage-calculator', step: 'Check your current test performance.' },
      ],
      faqs: [
        { q: 'What if the result is over 100?', a: 'That means your target grade is mathematically impossible with the current exam weight. You would need extra credit or a higher exam weight.' },
        { q: 'Does this work with weighted categories?', a: 'This uses a simple two-component model: everything before the final (weighted at 1 - final weight) and the final exam itself.' },
        { q: 'Can I use this for GPA?', a: 'For single-course grade targets, yes. For overall GPA across multiple courses, use the GPA Calculator instead.' },
      ],
      related: ['gpa-calculator', 'test-score-percentage-calculator', 'percentage-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
  },
];