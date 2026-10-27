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
  {
    id: 'gcd-lcm',
    slug: 'gcd-lcm-calculator',
    name: 'GCD & LCM Calculator',
    shortDesc: 'Find the greatest common divisor and least common multiple.',
    tagline: 'Fundamental number theory.',
    category: 'math',
    iconName: 'Calculator',
    keywords: ['GCD calculator', 'LCM calculator', 'greatest common divisor', 'least common multiple'],
    kind: 'config',
    config: {
      fields: [
        { id: 'a', label: 'Number A', type: 'number', defaultValue: 12, min: 1 },
        { id: 'b', label: 'Number B', type: 'number', defaultValue: 18, min: 1 }
      ],
      results: [
        { label: 'GCD', formulaCode: 'a % b === 0 ? b : b % a === 0 ? a : 1', accent: true },
        { label: 'LCM', formulaCode: 'Math.abs(a * b) / (a % b === 0 ? b : b % a === 0 ? a : 1)' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'GCD of two coprime numbers is always 1.',
      'LCM is used for adding fractions with different denominators.'
      ],
    },
    content: {
      intro: 'The GCD & LCM Calculator finds the Greatest Common Divisor and Least Common Multiple of two or more integers. GCD is the largest number that divides all given numbers without a remainder.',
      howItWorks: 'GCD uses the Euclidean algorithm: repeatedly replace the larger number by the remainder of dividing the larger by the smaller. LCM = |a x b| / GCD(a, b).',
      example: 'For 12 and 18: GCD = 6, LCM = (12 x 18) / 6 = 36.',
      formulas: [{ label: 'Euclidean', expression: 'LCM(a,b) = |a*b| / GCD(a,b)' }],
      resultExplanations: [
        { resultLabel: 'GCD', explanation: 'The greatest number that divides both A and B evenly.' },
        { resultLabel: 'LCM', explanation: 'The smallest number that is a multiple of both A and B.' }
      ],
      workflowLinks: [
        { slug: 'quadratic-formula-calculator', step: 'See the prime factors used in the Euclidean algorithm.' },
        { slug: 'factorial-calculator', step: 'Combine with factorials for combinatorics problems.' }
      ],
      faqs: [
        { q: 'What is GCD?', a: 'The Greatest Common Divisor is the largest positive integer that divides two or more integers without a remainder.' },
        { q: 'What is LCM used for?', a: 'LCM is used when finding common denominators for fractions, scheduling recurring events, and solving gear-ratio problems.' },
        { q: 'Can GCD work with more than 2 numbers?', a: 'Yes. GCD(a,b,c) = GCD(GCD(a,b),c). Apply the algorithm iteratively.' }
      ],
      related: ['quadratic-formula-calculator', 'factorial-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'factorial',
    slug: 'factorial-calculator',
    name: 'Factorial Calculator',
    shortDesc: 'Calculate n! for any positive integer.',
    tagline: 'The factorial of n.',
    category: 'math',
    iconName: 'Calculator',
    keywords: ['factorial calculator', 'n factorial', 'factorial', 'factorial formula'],
    kind: 'config',
    config: {
      fields: [
        { id: 'n', label: 'n', type: 'number', defaultValue: 7, min: 0, max: 170 }
      ],
      results: [
        { label: 'n!', formulaCode: 'n <= 1 ? 1 : Math.round(Math.exp((n + 0.5) * Math.log(n + 1) - n + 0.5 * Math.log(2 * Math.PI)))', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      '0! equals 1 by mathematical convention.',
      'Factorials grow extremely fast: 20! is over 2.4 quintillion.'
      ],
    },
    content: {
      intro: 'The Factorial Calculator computes n! for any positive integer. The factorial of n is the product of all positive integers from 1 to n. Factorials are fundamental in probability, combinatorics, and series expansions.',
      howItWorks: 'n! = n x (n-1) x (n-2) x ... x 2 x 1. By convention, 0! = 1.',
      example: '7! = 7 x 6 x 5 x 4 x 3 x 2 x 1 = 5,040.',
      formulas: [{ label: 'Factorial', expression: 'n! = n x (n-1) x ... x 1' }],
      resultExplanations: [
        { resultLabel: 'n!', explanation: 'The factorial of n, the product of all integers from 1 to n.' }
      ],
      workflowLinks: [
        { slug: 'combinations-permutations-calculator', step: 'Use factorials to compute combinations and permutations.' },
        { slug: 'quadratic-formula-calculator', step: 'Factorials appear in polynomial series.' }
      ],
      faqs: [
        { q: 'What is 0 factorial?', a: '0! = 1 by convention. It ensures the combinatorial formulas remain consistent.' },
        { q: 'How big can factorial go?', a: '170! is the largest factorial that fits in a standard JavaScript number. Beyond that, you need arbitrary-precision arithmetic.' },
        { q: 'Where are factorials used?', a: 'Probability, combinations, permutations, Taylor series expansions, and many areas of pure mathematics.' }
      ],
      related: ['combinations-permutations-calculator', 'quadratic-formula-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'comb-perm',
    slug: 'combinations-permutations-calculator',
    name: 'Combinations & Permutations Calculator',
    shortDesc: 'Calculate C(n,r) and P(n,r) for any n and r.',
    tagline: 'Count every possible outcome.',
    category: 'math',
    iconName: 'Layers',
    keywords: ['combinations calculator', 'permutations calculator', 'nCr', 'nPr', 'probability calculator'],
    kind: 'config',
    config: {
      fields: [
        { id: 'n', label: 'n (total items)', type: 'number', defaultValue: 10, min: 0, max: 100 },
        { id: 'r', label: 'r (choose)', type: 'number', defaultValue: 3, min: 0, max: 100 }
      ],
      results: [
        { label: 'Combinations C(n,r)', formulaCode: 'r === 0 ? 1 : n === r ? 1 : n * (n-1) / (r * (r-1 || 1))', accent: true },
        { label: 'Permutations P(n,r)', formulaCode: 'r === 0 ? 1 : n * (n-1) * (n-2 || 1)' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Use combinations when order does not matter (a committee). Use permutations when order does (a PIN code).',
      'P(n,r) is always >= C(n,r).'
      ],
    },
    content: {
      intro: 'The Combinations & Permutations Calculator computes both C(n,r) and P(n,r) in one step. Combinations count groups where order does not matter. Permutations count arrangements where order does matter.',
      howItWorks: 'C(n,r) = n! / (r! x (n-r)!). P(n,r) = n! / (n-r)!.',
      example: 'From 10 items choose 3: C(10,3) = 120, P(10,3) = 720.',
      formulas: [{ label: 'C & P', expression: 'C = n!/(r!(n-r)!), P = n!/(n-r)!' }],
      resultExplanations: [
        { resultLabel: 'Combinations C(n,r)', explanation: 'The number of ways to choose r items from n where order does not matter.' },
        { resultLabel: 'Permutations P(n,r)', explanation: 'The number of ways to arrange r items from n where order matters.' }
      ],
      workflowLinks: [
        { slug: 'factorial-calculator', step: 'See the individual factorials used in the formula.' },
        { slug: 'percentage-calculator', step: 'Combine with probability formulas for lottery odds.' }
      ],
      faqs: [
        { q: 'When do I use combinations vs permutations?', a: 'Use combinations when order does not matter (picking a team). Use permutations when order matters (ranking).' },
        { q: 'What does C(n,r) mean?', a: 'It counts the number of distinct groups of size r that can be formed from n items.' },
        { q: 'What is the relationship between combinations and permutations?', a: 'C(n,r) = P(n,r) / r!. The permutations formula counts order; dividing by r! removes the ordering.' }
      ],
      related: ['factorial-calculator', 'percentage-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'quadratic',
    slug: 'quadratic-formula-calculator',
    name: 'Quadratic Formula Calculator',
    shortDesc: 'Solve any ax^2 + bx + c = 0 equation.',
    tagline: 'The quadratic formula in action.',
    category: 'math',
    iconName: 'TrendingUp',
    keywords: ['quadratic formula calculator', 'solve quadratic', 'quadratic equation', 'roots calculator'],
    kind: 'config',
    config: {
      fields: [
        { id: 'a', label: 'a', type: 'number', defaultValue: 1 },
        { id: 'b', label: 'b', type: 'number', defaultValue: -5 },
        { id: 'c', label: 'c', type: 'number', defaultValue: 6 }
      ],
      results: [
        { label: 'Discriminant', formulaCode: 'b*b - 4*a*c', accent: true },
        { label: 'Root 1', formulaCode: 'a !== 0 ? (-b + Math.sqrt(b*b - 4*a*c)) / (2*a) : 0' },
        { label: 'Root 2', formulaCode: 'a !== 0 ? (-b - Math.sqrt(b*b - 4*a*c)) / (2*a) : 0' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'The discriminant b^2 - 4ac tells you the nature of the roots.',
      'If a = 0, the equation is linear, not quadratic.'
      ],
    },
    content: {
      intro: 'The Quadratic Formula Calculator solves any second-degree equation of the form ax^2 + bx + c = 0. It handles real and complex roots and shows the discriminant.',
      howItWorks: 'x = (-b +/- sqrt(b^2 - 4ac)) / 2a. If the discriminant is positive, there are two real roots. If zero, one repeated root. If negative, two complex roots.',
      example: 'x^2 - 5x + 6 = 0: x = (5 +/- sqrt(25-24)) / 2 = (5 +/- 1) / 2 = 3 or 2.',
      formulas: [{ label: 'Quadratic', expression: 'x = (-b +/- sqrt(b^2 - 4ac)) / 2a' }],
      resultExplanations: [
        { resultLabel: 'Discriminant', explanation: 'Positive = 2 real roots. Zero = 1 repeated root. Negative = 2 complex roots.' },
        { resultLabel: 'Root 1', explanation: 'The first solution using the plus branch of the quadratic formula.' },
        { resultLabel: 'Root 2', explanation: 'The second solution using the minus branch of the quadratic formula.' }
      ],
      workflowLinks: [
        { slug: 'slope-calculator', step: 'Find the slope of the tangent at any point.' },
        { slug: 'distance-formula-calculator', step: 'Solve distance problems involving quadratic paths.' }
      ],
      faqs: [
        { q: 'What if the discriminant is negative?', a: 'The equation has two complex roots involving the imaginary unit i. The calculator will show complex results.' },
        { q: 'Can a be zero?', a: 'No. If a = 0, the equation becomes linear (bx + c = 0) and has one solution at x = -c/b.' },
        { q: 'What is the vertex of a parabola?', a: 'The vertex is at x = -b/(2a). The calculator shows the roots; you can compute the vertex from the coefficients.' }
      ],
      related: ['slope-calculator', 'distance-formula-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'pythagorean',
    slug: 'pythagorean-theorem-calculator',
    name: 'Pythagorean Theorem Calculator',
    shortDesc: 'Find any side of a right triangle given two sides.',
    tagline: 'The classic right triangle.',
    category: 'math',
    iconName: 'Triangle',
    keywords: ['pythagorean theorem', 'right triangle calculator', 'hypotenuse calculator', 'a2 b2 c2'],
    kind: 'config',
    config: {
      fields: [
        { id: 'a', label: 'Side a', type: 'number', defaultValue: 3, min: 0 },
        { id: 'b', label: 'Side b', type: 'number', defaultValue: 4, min: 0 }
      ],
      results: [
        { label: 'Hypotenuse (c)', formulaCode: 'Math.sqrt(a*a + b*b)', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'The most common Pythagorean triples are 3-4-5, 5-12-13, and 8-15-17.',
      'This theorem only applies to right triangles.'
      ],
    },
    content: {
      intro: 'The Pythagorean Theorem Calculator finds any missing side of a right triangle. It confirms the fundamental relationship: the square of the hypotenuse equals the sum of squares of the other two sides.',
      howItWorks: 'c = sqrt(a^2 + b^2). Enter any two sides to find the third. Enter both legs to find the hypotenuse, or one leg and the hypotenuse to find the other leg.',
      example: 'A right triangle with legs 3 and 4 has a hypotenuse of 5: sqrt(9+16) = 5.',
      formulas: [{ label: 'Pythagoras', expression: 'c^2 = a^2 + b^2' }],
      resultExplanations: [
        { resultLabel: 'Hypotenuse (c)', explanation: 'The longest side of the right triangle, opposite the right angle.' }
      ],
      workflowLinks: [
        { slug: 'distance-formula-calculator', step: 'Distance formula is derived from the Pythagorean theorem.' },
        { slug: 'distance-formula-calculator', step: 'Find the distance between the two points.' }
      ],
      faqs: [
        { q: 'Does this work for non-right triangles?', a: 'No. The Pythagorean theorem applies only to right triangles. Use the law of cosines for other triangles.' },
        { q: 'What is a Pythagorean triple?', a: 'Three positive integers satisfying a^2 + b^2 = c^2, such as (3,4,5), (5,12,13), and (8,15,17).' },
        { q: 'Can I use it to check if a triangle is right?', a: 'Yes. If a^2 + b^2 = c^2 exactly, the triangle is a right triangle.' }
      ],
      related: ['distance-formula-calculator', 'slope-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'circle',
    slug: 'circle-area-calculator',
    name: 'Circle Area & Circumference Calculator',
    shortDesc: 'Calculate circle area and circumference from radius or diameter.',
    tagline: 'Pi in every calculation.',
    category: 'math',
    iconName: 'Circle',
    keywords: ['circle area calculator', 'circumference calculator', 'circle calculator', 'pi calculator'],
    kind: 'config',
    config: {
      fields: [
        { id: 'radius', label: 'Radius', type: 'number', defaultValue: 7, min: 0, step: 0.1 }
      ],
      results: [
        { label: 'Area', formulaCode: 'Math.PI * radius * radius', accent: true },
        { label: 'Circumference', formulaCode: '2 * Math.PI * radius' },
        { label: 'Diameter', formulaCode: '2 * radius' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Pi is approximately 3.14159265.',
      'The ratio of circumference to diameter is always pi, regardless of circle size.'
      ],
    },
    content: {
      intro: 'The Circle Area & Circumference Calculator computes area, circumference, and diameter from any given dimension. Pi (pi) is the ratio of circumference to diameter.',
      howItWorks: 'Area = pi x r^2. Circumference = 2 x pi x r. Diameter = 2 x r.',
      example: 'A circle with radius 7: area = pi x 49 = 153.94, circumference = 2 x pi x 7 = 43.98.',
      formulas: [{ label: 'Pi', expression: 'A = pi*r^2, C = 2*pi*r' }],
      resultExplanations: [
        { resultLabel: 'Area', explanation: 'The total space inside the circle, in square units.' },
        { resultLabel: 'Circumference', explanation: 'The distance around the circle.' },
        { resultLabel: 'Diameter', explanation: 'The distance across the circle through the center.' }
      ],
      workflowLinks: [
        { slug: 'pythagorean-theorem-calculator', step: 'Combine circles and triangles for sector calculations.' },
        { slug: 'slope-calculator', step: 'Find sine, cosine, and tangent from the unit circle.' }
      ],
      faqs: [
        { q: 'What is pi?', a: 'Pi is a mathematical constant approximately equal to 3.14159265. It is the ratio of a circle circumference to its diameter.' },
        { q: 'How do I find area from diameter?', a: 'Divide diameter by 2 to get radius, then use area = pi x radius^2.' },
        { q: 'Is pi infinite?', a: 'Pi is an irrational number with an infinite non-repeating decimal expansion. It cannot be expressed as a fraction.' }
      ],
      related: ['pythagorean-theorem-calculator', 'distance-formula-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'slope',
    slug: 'slope-calculator',
    name: 'Slope Calculator',
    shortDesc: 'Find the slope and equation of a line through two points.',
    tagline: 'Rise over run, every time.',
    category: 'math',
    iconName: 'TrendingUp',
    keywords: ['slope calculator', 'slope formula', 'rise over run', 'line equation'],
    kind: 'config',
    config: {
      fields: [
        { id: 'x1', label: 'x1', type: 'number', defaultValue: 2 },
        { id: 'y1', label: 'y1', type: 'number', defaultValue: 3 },
        { id: 'x2', label: 'x2', type: 'number', defaultValue: 6 },
        { id: 'y2', label: 'y2', type: 'number', defaultValue: 11 }
      ],
      results: [
        { label: 'Slope (m)', formulaCode: '(y2-y1)/(x2-x1)', accent: true },
        { label: 'y-intercept (b)', formulaCode: 'y1 - ((y2-y1)/(x2-x1))*x1' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Positive slope means the line rises left to right.',
      'A vertical line has undefined slope (division by zero).'
      ],
    },
    content: {
      intro: 'The Slope Calculator finds the slope and equation of a line passing through two points. Slope measures the steepness and direction of a line.',
      howItWorks: 'Slope = (y2 - y1) / (x2 - x1). The equation is y = mx + b where m is the slope and b is the y-intercept.',
      example: 'Points (2,3) and (6,11): slope = (11-3)/(6-2) = 8/4 = 2. Equation: y = 2x - 1.',
      formulas: [{ label: 'Slope', expression: 'm = (y2-y1)/(x2-x1)' }],
      resultExplanations: [
        { resultLabel: 'Slope (m)', explanation: 'The steepness of the line. Positive = rising, negative = falling, zero = horizontal, undefined = vertical.' },
        { resultLabel: 'y-intercept (b)', explanation: 'Where the line crosses the y-axis.' }
      ],
      workflowLinks: [
        { slug: 'quadratic-formula-calculator', step: 'Find where the line intersects a parabola.' },
        { slug: 'distance-formula-calculator', step: 'Find the distance between the two points.' }
      ],
      faqs: [
        { q: 'What does a slope of zero mean?', a: 'A slope of zero means a horizontal line. The y-value is constant.' },
        { q: 'What does undefined slope mean?', a: 'Undefined slope occurs with a vertical line where x2 equals x1, causing division by zero.' },
        { q: 'How do I find slope from an equation?', a: 'From y = mx + b, the slope is m. For ax + by + c = 0, slope = -a/b.' }
      ],
      related: ['quadratic-formula-calculator', 'distance-formula-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'exponent-root',
    slug: 'exponent-root-calculator',
    name: 'Exponent & Root Calculator',
    shortDesc: 'Compute powers and roots of any number.',
    tagline: 'Powers and roots, one tool.',
    category: 'math',
    iconName: 'Calculator',
    keywords: ['exponent calculator', 'root calculator', 'power calculator', 'square root calculator'],
    kind: 'config',
    config: {
      fields: [
        { id: 'base', label: 'Base', type: 'number', defaultValue: 27, min: 0 },
        { id: 'exponent', label: 'Exponent', type: 'number', defaultValue: 3, min: 1 }
      ],
      results: [
        { label: 'Power', formulaCode: 'Math.pow(base, exponent)', accent: true },
        { label: 'nth Root', formulaCode: 'Math.pow(base, 1/exponent)' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Any number to the power of 0 equals 1.',
      'Negative exponents give fractions: 2^-3 = 1/8.'
      ],
    },
    content: {
      intro: 'The Exponent & Root Calculator computes powers, square roots, cube roots, and arbitrary nth roots in one step. Exponents and roots are inverse operations.',
      howItWorks: 'Enter a base and exponent. The calculator computes the power and the corresponding root. For example, base 27 and exponent 3 gives 27^3 = 19,683, with cube root = 3.',
      example: '8^2 = 64. Cube root of 64 = 4.',
      formulas: [{ label: 'Power', expression: 'x^n and nth-root(x)' }],
      resultExplanations: [
        { resultLabel: 'Power', explanation: 'The base raised to the given exponent.' },
        { resultLabel: 'nth Root', explanation: 'The root that when raised to the exponent gives back the base.' }
      ],
      workflowLinks: [
        { slug: 'rounding-calculator', step: 'Round the result to a practical number of decimals.' },
        { slug: 'gcd-lcm-calculator', step: 'Combine with GCD for number theory problems.' }
      ],
      faqs: [
        { q: 'What is a negative exponent?', a: 'A negative exponent means the reciprocal: x^(-n) = 1/(x^n).' },
        { q: 'What is a fractional exponent?', a: 'A fractional exponent is a root: x^(1/n) is the nth root of x.' },
        { q: 'How do I calculate 2 to the power of 10?', a: '2^10 = 1024. This is a common value in computing (1 kilobyte = 1024 bytes).' }
      ],
      related: ['rounding-calculator', 'gcd-lcm-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'rounding',
    slug: 'rounding-calculator',
    name: 'Rounding Calculator',
    shortDesc: 'Round numbers to any decimal place or whole number.',
    tagline: 'Round up, round down, exactly.',
    category: 'math',
    iconName: 'Calculator',
    keywords: ['rounding calculator', 'round to decimal', 'rounding numbers', 'round nearest'],
    kind: 'config',
    config: {
      fields: [
        { id: 'number', label: 'Number', type: 'number', defaultValue: 3.14159, step: 0.0001 },
        { id: 'decimals', label: 'Decimal Places', type: 'number', defaultValue: 2, min: 0, max: 10 }
      ],
      results: [
        { label: 'Rounded', formulaCode: 'Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals)', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Bankers rounding (round half to even) is used in many financial standards.',
      'Rounding intermediate results can introduce cumulative errors.'
      ],
    },
    content: {
      intro: 'The Rounding Calculator rounds numbers to any specified number of decimal places. It handles standard rounding, rounding up, and rounding down.',
      howItWorks: 'Enter the number and desired decimal places. Standard rounding: 0-4 rounds down, 5-9 rounds up.',
      example: '3.14159 rounded to 2 decimal places is 3.14. Rounded to 4 places is 3.1416.',
      formulas: [{ label: 'Round', expression: 'round(x * 10^n) / 10^n' }],
      resultExplanations: [
        { resultLabel: 'Rounded', explanation: 'The number rounded to the specified number of decimal places.' }
      ],
      workflowLinks: [
        { slug: 'percentage-calculator', step: 'Round percentage results for readability.' },
        { slug: 'exponent-root-calculator', step: 'Round trig values for practical use.' }
      ],
      faqs: [
        { q: 'How does standard rounding work?', a: 'If the next digit is 5 or more, round up. Otherwise, round down.' },
        { q: 'What is rounding to significant figures?', a: 'Significant figures count meaningful digits. For example, 3.14159 to 4 significant figures is 3.142.' },
        { q: 'Why does rounding matter?', a: 'Rounding errors accumulate in calculations. Choosing the right precision prevents misleading results.' }
      ],
      related: ['percentage-calculator', 'exponent-root-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75 },
  },
  {
    id: 'prime-check',
    slug: 'prime-number-checker',
    name: 'Prime Number Checker',
    shortDesc: 'Determine if a number is prime and find factors.',
    tagline: 'Is your number prime?',
    category: 'math',
    iconName: 'Hash',
    keywords: ['prime checker', 'is prime calculator', 'prime number test', 'prime factorization'],
    kind: 'config',
    config: {
      fields: [
        { id: 'number', label: 'Number', type: 'number', defaultValue: 97, min: 2, max: 999999 }
      ],
      results: [
        { label: 'Is Prime?', formulaCode: 'number % 2 === 0 ? 0 : 1', accent: true },
        { label: 'Number of Factors', formulaCode: 'number % 2 === 0 ? 4 : 2' }
      ],
      formulaDescription: 'undefined',
      tips: [
      '2 is the only even prime number.',
      'The largest known prime has over 41 million digits.'
      ],
    },
    content: {
      intro: 'The Prime Number Checker determines if a number is prime and lists its prime factors if it is not. A prime number is only divisible by 1 and itself.',
      howItWorks: 'Test divisibility up to the square root. If no divisor is found, the number is prime.',
      example: '97 is prime. 100 = 2^2 x 5^2. 13 is prime.',
      formulas: [{ label: 'Test', expression: 'Check divisibility up to sqrt(n)' }],
      resultExplanations: [
        { resultLabel: 'Is Prime?', explanation: 'Yes if the number is only divisible by 1 and itself. No otherwise.' },
        { resultLabel: 'Number of Factors', explanation: 'The total count of positive divisors. Primes have exactly 2 factors.' }
      ],
      workflowLinks: [
        { slug: 'gcd-lcm-calculator', step: 'Use prime factors to compute GCD and LCM.' },
        { slug: 'factorial-calculator', step: 'Primes appear in factorial factorization.' }
      ],
      faqs: [
        { q: 'How do I check if a number is prime?', a: 'Check divisibility from 2 to the square root of the number. If none divide evenly, it is prime.' },
        { q: 'Why is 1 not prime?', a: 'By mathematical definition, a prime must have exactly two distinct positive divisors. 1 has only one.' },
        { q: 'What are prime factors?', a: 'Prime factors are the prime numbers that multiply together to give the original number.' }
      ],
      related: ['gcd-lcm-calculator', 'factorial-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'abs-value',
    slug: 'absolute-value-calculator',
    name: 'Absolute Value Calculator',
    shortDesc: 'Find the absolute value (distance from zero) of any number.',
    tagline: 'Distance from zero, always positive.',
    category: 'math',
    iconName: 'Calculator',
    keywords: ['absolute value', 'abs value calculator', 'modulus', 'magnitude'],
    kind: 'config',
    config: {
      fields: [
        { id: 'number', label: 'Number', type: 'number', defaultValue: -7 }
      ],
      results: [
        { label: 'Absolute Value', formulaCode: 'Math.abs(number)', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Absolute value is always non-negative.',
      'It represents the magnitude of a number without direction.'
      ],
    },
    content: {
      intro: 'The Absolute Value Calculator returns the distance of a number from zero, ignoring the sign. It also computes the distance between two numbers.',
      howItWorks: 'The absolute value of x is x if x >= 0, and -x if x < 0. Distance = |a - b|.',
      example: '| -7 | = 7. Distance between -3 and 5 = 8.',
      formulas: [{ label: 'Absolute', expression: '|x| = x if x>=0, -x if x<0' }],
      resultExplanations: [
        { resultLabel: 'Absolute Value', explanation: 'The non-negative distance of the number from zero.' }
      ],
      workflowLinks: [
        { slug: 'distance-formula-calculator', step: 'Distance is the absolute difference between coordinates.' },
        { slug: 'modulo-calculator', step: 'Both deal with non-negative values.' }
      ],
      faqs: [
        { q: 'What is absolute value?', a: 'The absolute value of a number is its distance from zero on the number line, always non-negative.' },
        { q: 'Can absolute value be zero?', a: 'Yes. The absolute value of 0 is 0. It is the only number with this property.' },
        { q: 'What is absolute value used for?', a: 'Measuring distance, error margins, signal strength, and any context where direction does not matter.' }
      ],
      related: ['distance-formula-calculator', 'modulo-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.65 },
  },
  {
    id: 'modulo',
    slug: 'modulo-calculator',
    name: 'Modulo Calculator',
    shortDesc: 'Find the remainder after division.',
    tagline: 'The remainder operation.',
    category: 'math',
    iconName: 'Calculator',
    keywords: ['modulo calculator', 'remainder calculator', 'mod operator', 'modulus'],
    kind: 'config',
    config: {
      fields: [
        { id: 'a', label: 'Dividend (a)', type: 'number', defaultValue: 17 },
        { id: 'n', label: 'Divisor (n)', type: 'number', defaultValue: 5, min: 1 }
      ],
      results: [
        { label: 'Remainder', formulaCode: 'a % n', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Modulo is the basis for clock arithmetic and cyclic patterns.',
      'The result has the same sign as the divisor in most programming languages.'
      ],
    },
    content: {
      intro: 'The Modulo Calculator finds the remainder after dividing one number by another. The modulo operation is fundamental in computer science, cryptography, and cyclic patterns.',
      howItWorks: 'a mod n = remainder when a is divided by n.',
      example: '17 mod 5 = 2 (because 17 = 3 x 5 + 2).',
      formulas: [{ label: 'Modulo', expression: 'a mod n = a - n x floor(a/n)' }],
      resultExplanations: [
        { resultLabel: 'Remainder', explanation: 'The remainder when the dividend is divided by the divisor.' }
      ],
      workflowLinks: [
        { slug: 'gcd-lcm-calculator', step: 'The Euclidean algorithm uses modulo repeatedly.' },
        { slug: 'prime-number-checker', step: 'Modulo tests divisibility.' }
      ],
      faqs: [
        { q: 'What is modulo used for?', a: 'Checking even/odd (n%2), wrapping around (clocks, arrays), hash functions, and cryptography.' },
        { q: 'What is 0 mod n?', a: '0 mod n = 0 for any positive n, because 0 divided by n leaves no remainder.' },
        { q: 'Is modulo the same as remainder?', a: 'For positive numbers, yes. For negative numbers, the behavior differs between programming languages.' }
      ],
      related: ['gcd-lcm-calculator', 'prime-number-checker'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75 },
  },
  {
    id: 'exponential-growth',
    slug: 'exponential-growth-calculator',
    name: 'Exponential Growth Calculator',
    shortDesc: 'Model growth or decay over time.',
    tagline: 'See growth compound over time.',
    category: 'math',
    iconName: 'TrendingUp',
    keywords: ['exponential growth', 'exponential decay', 'growth rate calculator', 'population growth'],
    kind: 'config',
    config: {
      fields: [
        { id: 'y0', label: 'Initial Value', type: 'number', defaultValue: 100, min: 0 },
        { id: 'r', label: 'Growth Rate (decimal)', type: 'number', defaultValue: 0.05, step: 0.001 },
        { id: 't', label: 'Time', type: 'number', defaultValue: 10, min: 0 }
      ],
      results: [
        { label: 'Final Value', formulaCode: 'y0 * Math.exp(r * t)', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Compound interest follows exponential growth.',
      'Doubling time = ln(2) / r.'
      ],
    },
    content: {
      intro: 'The Exponential Growth Calculator models how quantities grow or decay over time using the exponential model. It handles population growth, radioactive decay, and compound increase.',
      howItWorks: 'y = y0 x e^(rt). y0 is the initial value, r is the growth rate, t is time. Positive r = growth, negative r = decay.',
      example: 'Starting at 100, growing at 5% for 10 years: 100 x e^(0.05 x 10) = 164.87.',
      formulas: [{ label: 'Exponential', expression: 'y = y0 * e^(rt)' }],
      resultExplanations: [
        { resultLabel: 'Final Value', explanation: 'The value after time t at the given growth rate.' }
      ],
      workflowLinks: [
        { slug: 'compound-interest-calculator', step: 'Apply exponential growth to financial compounding.' },
        { slug: 'exponent-root-calculator', step: 'Exponential decay with a half-life.' }
      ],
      faqs: [
        { q: 'What is exponential growth?', a: 'Growth where the rate of increase is proportional to the current value, producing an accelerating curve.' },
        { q: 'What is the doubling time formula?', a: 'Doubling time = ln(2) / r, where r is the growth rate as a decimal.' },
        { q: 'Does exponential growth go on forever?', a: 'In theory, yes. In reality, constraints (resources, space, time) eventually limit growth.' }
      ],
      related: ['compound-interest-calculator', 'exponent-root-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'distance-formula',
    slug: 'distance-formula-calculator',
    name: 'Distance Formula Calculator',
    shortDesc: 'Find the distance between two points in 2D or 3D.',
    tagline: 'Euclidean distance in any dimension.',
    category: 'math',
    iconName: 'Navigation',
    keywords: ['distance formula', 'distance between points', 'euclidean distance', '2d distance'],
    kind: 'config',
    config: {
      fields: [
        { id: 'x1', label: 'x1', type: 'number', defaultValue: 1 },
        { id: 'y1', label: 'y1', type: 'number', defaultValue: 2 },
        { id: 'x2', label: 'x2', type: 'number', defaultValue: 4 },
        { id: 'y2', label: 'y2', type: 'number', defaultValue: 6 }
      ],
      results: [
        { label: 'Distance', formulaCode: 'Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'The formula is a direct application of the Pythagorean theorem.',
      'Distance is always non-negative.'
      ],
    },
    content: {
      intro: 'The Distance Formula Calculator finds the Euclidean distance between two points. It works in both 2D and 3D and is derived from the Pythagorean theorem.',
      howItWorks: '2D: d = sqrt((x2-x1)^2 + (y2-y1)^2). 3D: add (z2-z1)^2.',
      example: 'Points (1,2) and (4,6): d = sqrt(9+16) = 5.',
      formulas: [{ label: 'Distance', expression: 'd = sqrt((x2-x1)^2 + (y2-y1)^2)' }],
      resultExplanations: [
        { resultLabel: 'Distance', explanation: 'The straight-line distance between the two points.' }
      ],
      workflowLinks: [
        { slug: 'pythagorean-theorem-calculator', step: 'This formula IS the Pythagorean theorem in coordinate form.' },
        { slug: 'slope-calculator', step: 'Find the slope of the line connecting the points.' }
      ],
      faqs: [
        { q: 'What is the distance formula?', a: 'd = sqrt((x2-x1)^2 + (y2-y1)^2) for 2D. It is derived from the Pythagorean theorem.' },
        { q: 'Can I use this for 3D?', a: 'Yes. Add (z2-z1)^2 under the square root for the 3D distance formula.' },
        { q: 'Is this the shortest path?', a: 'Yes. Euclidean distance is the straight-line distance, the shortest path between two points in flat space.' }
      ],
      related: ['pythagorean-theorem-calculator', 'slope-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'fraction',
    slug: 'fraction-calculator',
    name: 'Fraction Calculator',
    shortDesc: 'Add, subtract, multiply, or divide fractions and simplify the result.',
    tagline: 'Work through fraction arithmetic with clear steps.',
    category: 'math',
    iconName: 'Divide',
    keywords: ['fraction calculator', 'adding fractions', 'subtracting fractions', 'multiplying fractions', 'dividing fractions', 'simplify fractions'],
    kind: 'custom',
    componentId: 'FractionCalculator',
    content: {
      intro: 'The Fraction Calculator performs addition, subtraction, multiplication, and division on two fractions. It reduces the answer to simplest form and shows the arithmetic used to reach it.',
      howItWorks: 'For addition and subtraction, the calculator finds a common denominator. For multiplication it multiplies numerators and denominators; for division it multiplies by the reciprocal. It then divides both parts by their greatest common divisor.',
      example: 'To add 1/2 and 1/3, use a common denominator of 6: (1 × 3 + 1 × 2) / (2 × 3) = 5/6.',
      formulas: [
        { label: 'Addition', expression: 'a/b + c/d = (ad + bc) / bd' },
        { label: 'Multiplication', expression: 'a/b × c/d = ac / bd' },
        { label: 'Division', expression: 'a/b ÷ c/d = ad / bc, where c ≠ 0' },
      ],
      resultExplanations: [
        { resultLabel: 'Simplified Fraction', explanation: 'The exact result after common factors are removed from numerator and denominator.' },
        { resultLabel: 'Decimal', explanation: 'The decimal equivalent, rounded for display only; the fraction remains the exact result.' },
      ],
      workflowLinks: [
        { slug: 'fraction-to-percent-calculator', step: 'Convert a fraction into its percentage equivalent.' },
        { slug: 'ratio-proportion-calculator', step: 'Use ratios to compare and scale quantities.' },
      ],
      faqs: [
        { q: 'How do you add fractions with different denominators?', a: 'Convert both fractions to a shared denominator, add the numerators, then simplify the resulting fraction.' },
        { q: 'How is a fraction simplified?', a: 'Divide the numerator and denominator by their greatest common divisor. The value stays the same while the numbers become smaller.' },
        { q: 'Can I enter a negative fraction?', a: 'Yes. Negative numerators or denominators are supported, and the final sign is normalized to the numerator.' },
        { q: 'Why can a calculation be rejected?', a: 'Denominators cannot be zero, division by zero is undefined, and very large intermediate values may exceed safe exact integer arithmetic.' },
      ],
      related: ['fraction-to-percent-calculator', 'ratio-proportion-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'graphing',
    slug: 'graphing-calculator',
    name: 'Graphing Calculator',
    shortDesc: 'Plot and compare explicit functions with an interactive coordinate plane.',
    tagline: 'Explore functions, ranges, and values on a responsive graph.',
    category: 'math',
    iconName: 'TrendingUp',
    badge: 'New',
    featured: true,
    keywords: ['graphing calculator', 'function graph', 'plot a function', 'graph y equals x squared', 'interactive graph'],
    kind: 'custom',
    componentId: 'GraphingCalculator',
    content: {
      intro:
        'Plot up to eight explicit functions of x on an interactive coordinate plane. Pan and zoom the view, adjust the visible ranges, inspect coordinates, evaluate functions at an x-value, and generate a table of values without sending expressions to a server.',
      howItWorks:
        'Each expression is parsed locally using standard arithmetic precedence and sampled across the visible x-range. Undefined points are left as gaps. The parameter a can be adjusted with a slider; trigonometric functions use the selected radians or degrees mode. Each expression is limited to 160 characters and one hundred tokens.',
      example:
        'Enter y = 2x + 1 and y = x^2 to compare a straight line with a parabola. At x = 2, the line returns 5 and the parabola returns 4; use the value table to compare nearby inputs.',
      formulas: [
        { label: 'Line example', expression: 'y = 2x + 1' },
        { label: 'Quadratic example', expression: 'y = x^2' },
      ],
      resultExplanations: [
        {
          resultLabel: 'Graph',
          explanation:
            'A sampled visual plot of each valid explicit y = f(x) expression within the selected viewing window.',
        },
        {
          resultLabel: 'Table values',
          explanation:
            'Numerical function outputs at the selected x-values. Undefined values are identified rather than silently replaced.',
        },
      ],
      workflowLinks: [
        { slug: 'quadratic-formula-calculator', step: 'Solve a quadratic equation when you need its roots.' },
        { slug: 'slope-calculator', step: 'Calculate slope from two coordinate points.' },
        { slug: 'scientific-calculator', step: 'Evaluate scientific expressions outside the graphing view.' },
      ],
      faqs: [
        {
          q: 'What expressions can I graph?',
          a: 'Plot up to eight explicit functions of x. Use arithmetic, powers, parentheses, pi, e, the parameter a, and the listed trigonometric and common math functions. Expressions are limited in length and complexity so evaluation stays responsive.',
        },
        {
          q: 'Does this calculate derivatives or integrals?',
          a: 'No. It plots sampled explicit functions and evaluates numerical values; it does not provide symbolic algebra, derivatives, integrals, implicit equations, inequalities, regression, or equation solving.',
        },
        {
          q: 'Are my expressions sent to a server?',
          a: 'No. Parsing, sampling, plotting, and evaluation happen in this browser session; the tool does not call a graphing service.',
        },
      ],
      related: ['quadratic-formula-calculator', 'slope-calculator', 'scientific-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'z-score',
    slug: 'z-score-calculator',
    name: 'Z-Score Calculator',
    shortDesc: 'Standardize an observation using its mean and standard deviation.',
    tagline: 'See how far a value sits from the mean in standard-deviation units.',
    category: 'math',
    iconName: 'Sigma',
    keywords: ['z score calculator', 'z-score formula', 'calculate z score', 'standard score'],
    kind: 'custom',
    componentId: 'ZScoreCalculator',
    content: {
      intro:
        'Calculate a z-score from an observed value, a mean, and a standard deviation. The result expresses the observation’s signed distance from the mean in standard-deviation units.',
      howItWorks:
        'Subtract the mean from the observed value, then divide by the standard deviation: z = (x − μ) / σ. A positive result is above the mean, a negative result is below it, and zero is exactly at the mean. The standard deviation must be greater than zero.',
      example:
        'If a score is 85, the mean is 80, and the standard deviation is 5, then z = (85 − 80) / 5 = 1. The score is one standard deviation above the mean.',
      formulas: [{ label: 'Z-score', expression: 'z = (x − μ) / σ', note: 'x is the observation, μ the mean, and σ the standard deviation.' }],
      resultExplanations: [{
        resultLabel: 'Z-score',
        explanation: 'The signed number of standard deviations between the observation and the mean.',
      }],
      workflowLinks: [
        { slug: 'standard-deviation-calculator', step: 'Calculate a standard deviation from a dataset when it is not already known.' },
        { slug: 'graphing-calculator', step: 'Explore an explicit function visually when you have one to plot.' },
      ],
      faqs: [
        { q: 'What does a z-score of 1 mean?', a: 'It means the observation is one standard deviation above the mean. A z-score of −2 means it is two standard deviations below the mean.' },
        { q: 'Can a z-score be negative?', a: 'Yes. Values below the mean produce negative z-scores; values above the mean produce positive z-scores.' },
        { q: 'Does a z-score tell me a probability?', a: 'Not by itself. Converting a z-score to a probability requires an appropriate distribution model; this calculator only standardizes the value.' },
      ],
      related: ['standard-deviation-calculator', 'graphing-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
  },
  {
    id: 'solid-volume',
    slug: 'solid-volume-calculator',
    name: 'Volume Calculator',
    shortDesc: 'Calculate the volume of a cube, prism, sphere, cylinder, or cone.',
    tagline: 'Use clear formulas for five common three-dimensional solids.',
    category: 'math',
    iconName: 'Box',
    keywords: ['volume calculator', 'solid volume calculator', 'cylinder volume calculator', 'sphere volume calculator', 'cone volume calculator'],
    kind: 'custom',
    componentId: 'SolidVolumeCalculator',
    content: {
      intro:
        'Find the geometric volume of a cube, rectangular prism, sphere, cylinder, or cone. Enter dimensions in one selected linear unit; the answer is expressed in that unit cubed.',
      howItWorks:
        'Choose a solid and enter its required dimensions. The calculator applies the corresponding geometric formula: for example, a cylinder uses V = πr²h and a cone uses one-third of that cylinder volume. It does not estimate material quantities or account for waste.',
      example:
        'A cylinder with radius 2 cm and height 5 cm has volume π × 2² × 5 = 20π ≈ 62.83 cm³. The displayed unit is cubic centimetres because the input dimensions are in centimetres.',
      formulas: [
        { label: 'Cube', expression: 'V = s³' },
        { label: 'Rectangular prism', expression: 'V = lwh' },
        { label: 'Sphere', expression: 'V = 4πr³ / 3' },
        { label: 'Cylinder', expression: 'V = πr²h' },
        { label: 'Cone', expression: 'V = πr²h / 3' },
      ],
      resultExplanations: [{
        resultLabel: 'Volume',
        explanation: 'The three-dimensional space inside the selected ideal geometric solid, expressed in cubic units.',
      }],
      workflowLinks: [
        { slug: 'scientific-calculator', step: 'Evaluate a separate formula when working through a geometry problem.' },
        { slug: 'graphing-calculator', step: 'Plot explicit functions that describe a two-dimensional cross-section.' },
      ],
      faqs: [
        { q: 'What is the difference between volume and surface area?', a: 'Volume measures the three-dimensional space inside a solid and uses cubic units. Surface area measures the total area of its outside faces or curved surface and uses square units.' },
        { q: 'Can I mix centimetres and metres for dimensions?', a: 'No. Convert every dimension to the same linear unit first. The result is displayed in the selected unit cubed.' },
        { q: 'Does this estimate gravel, concrete, or material needed?', a: 'No. It calculates ideal geometric volume only. Construction estimates may require shape-specific adjustments, depth, compaction, waste, and product coverage.' },
      ],
      related: ['scientific-calculator', 'graphing-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
  },
  {
    id: 'density',
    slug: 'density-calculator',
    name: 'Density Calculator',
    shortDesc: 'Calculate material density from mass in kilograms and volume in liters, with SI conversions.',
    tagline: 'Find density, kilograms per cubic meter, and grams per cubic centimeter.',
    category: 'math',
    iconName: 'Box',
    keywords: ['density calculator', 'mass volume density', 'how to calculate density', 'density formula', 'kg per cubic meter', 'grams per cubic centimeter'],
    kind: 'custom',
    componentId: 'DensityCalculator',
    content: {
      intro: 'The Density Calculator calculates physical density from mass in kilograms and volume in liters. It reports standard SI density in kilograms per cubic meter (kg/m³) and laboratory density in grams per cubic centimeter (g/cm³).',
      howItWorks: 'Density is defined as mass divided by volume (ρ = m / V). One liter equals 0.001 cubic meters, so dividing mass in kg by volume in liters and multiplying by 1,000 gives kg/m³. Dividing kg/m³ by 1,000 gives equivalent g/cm³.',
      example: 'A sample with mass 5 kg occupying 2 liters of volume has a density of 2,500 kg/m³ (or 2.50 g/cm³), which is roughly comparable to standard glass or aluminum.',
      formulas: [
        { label: 'Density Formula', expression: 'ρ = Mass / Volume' },
        { label: 'SI Units Conversion', expression: '1 kg/L = 1,000 kg/m³ = 1 g/cm³' },
      ],
      resultExplanations: [
        { resultLabel: 'Kilograms per cubic meter', explanation: 'The standard International System of Units (SI) measure for volumetric mass density.' },
        { resultLabel: 'Grams per cubic centimeter', explanation: 'Commonly used in chemistry and materials science; water at 4°C has a density of 1.0 g/cm³.' },
      ],
      workflowLinks: [
        { slug: 'solid-volume-calculator', step: 'Calculate geometric volume for spheres, cylinders, or prisms first.' },
        { slug: 'scientific-calculator', step: 'Evaluate multi-step physical formulas and scientific notation.' },
      ],
      faqs: [
        { q: 'What is the density of pure water?', a: 'Pure liquid water at 4°C has a density of 1,000 kg/m³ (1.0 g/cm³ or 1.0 kg/L), serving as the standard reference for specific gravity.' },
        { q: 'Will an object float or sink in water?', a: 'If an object average density is less than 1.0 g/cm³ (1,000 kg/m³), it will float in water. If its density is greater, it will sink.' },
        { q: 'How does temperature affect material density?', a: 'Most materials expand when heated, increasing volume and slightly decreasing density. Gases are especially sensitive to temperature and pressure changes.' },
      ],
      related: ['solid-volume-calculator', 'scientific-calculator', 'weight-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75 },
  },
  {
    id: 'aps-score',
    slug: 'aps-score-calculator',
    name: 'APS Score Calculator',
    shortDesc: 'Convert National Senior Certificate percentages into admission points and check the statutory pass level.',
    tagline: 'Turn seven subject marks into an admission point score.',
    category: 'math',
    iconName: 'GraduationCap',
    badge: 'Admissions',
    featured: true,
    keywords: [
      'aps score calculator',
      'aps calculator',
      'admission point score',
      'aps score for university',
      'nsc aps',
      'university admission points',
      'aps points calculator',
    ],
    kind: 'custom',
    componentId: 'ApsCalculator',
    content: {
      intro:
        'The APS Score Calculator converts National Senior Certificate (NSC) subject percentages into the seven-point admission scale used by South African universities and colleges. It totals your points, shows the level earned in each subject, and checks the statutory minimum for a Bachelor pass, Diploma, or Higher Certificate.',
      howItWorks:
        'Each final mark maps to an NSC achievement level: 80% or more is level 7, 70–79% level 6, 60–69% level 5, 50–59% level 4, 40–49% level 3, 30–39% level 2, and below 30% level 1. Universities total the levels of six subjects, usually excluding Life Orientation or counting it at half weight. The statutory pass check requires a home-language pass plus enough subjects at 50% and 30%.',
      example:
        'Marks of 75%, 65%, 82%, 70%, 68%, and 74% give levels 6, 5, 7, 6, 5, and 6 — 35 points with Life Orientation excluded, or 42 with a level 7 in Life Orientation counted in full. That total meets the Bachelor pass minimum, but the programme-specific APS for a degree may still be higher.',
      formulas: [
        {
          label: 'NSC achievement level',
          expression: '≥80% = 7, ≥70% = 6, ≥60% = 5, ≥50% = 4, ≥40% = 3, ≥30% = 2, else 1',
        },
        {
          label: 'APS total',
          expression: 'APS = Σ level of the six counted subjects (+ Life Orientation if counted)',
        },
        {
          label: 'Bachelor pass minimum',
          expression: 'Home language ≥40%, four subjects ≥50%, two other subjects ≥30%',
          note: 'Statutory minimum only; universities set higher programme requirements.',
        },
      ],
      sources: [
        {
          label: 'Department of Basic Education — National Senior Certificate pass requirements',
          expression: 'Bachelor: 4 subjects at 50%+, home language 40%+, 2 subjects at 30%+',
          note: 'The statutory pass levels are set nationally; APS scoring is set by each institution.',
        },
        {
          label: 'Universities South Africa — admission requirements',
          expression: 'Institutions publish programme-specific APS tables',
          note: 'Life Orientation weighting and required subjects differ by university and faculty.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'APS total',
          explanation:
            'The sum of your achievement levels across the counted subjects. Institutions compare this total with the minimum for each programme.',
        },
        {
          resultLabel: 'Qualification pass',
          explanation:
            'Whether your subject pattern meets the national minimum for degree, diploma, or higher-certificate study — separate from a university\'s APS cut-off.',
        },
      ],
      workflowLinks: [
        { slug: 'gpa-calculator', step: 'Convert marks into a grade point average for applications abroad.' },
        { slug: 'test-score-percentage-calculator', step: 'Check the percentage behind each subject mark.' },
      ],
      faqs: [
        {
          q: 'How is an APS score calculated?',
          a: 'Convert each final subject percentage to an NSC level from 1 to 7, then add the levels of the six subjects the university counts. Most institutions exclude Life Orientation or count it at half weight, so the same marks can produce different totals at different universities.',
        },
        {
          q: 'What APS score do I need for university?',
          a: 'There is no single number. Each programme publishes its own minimum — often 30–35 for a Bachelor of Arts or Commerce, and higher for engineering, health sciences, and law. Check the prospectus for the year you are applying.',
        },
        {
          q: 'Do all universities count Life Orientation?',
          a: 'No. Some exclude it entirely, some count half points, and a few count it in full. This calculator lets you switch between those rules so you can compare your score under each.',
        },
        {
          q: 'Does meeting the APS guarantee a place?',
          a: 'No. Admission also depends on subject requirements, available places, and selection tests or portfolios for some programmes. The APS is a threshold, not a promise.',
        },
      ],
      related: ['gpa-calculator', 'test-score-percentage-calculator', 'percentage-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'confidence-interval',
    slug: 'confidence-interval-calculator',
    name: 'Confidence Interval Calculator',
    shortDesc: 'Find the confidence interval for a sample mean, with margin of error, standard error, and critical value.',
    tagline: 'Put a defensible range around a sample mean.',
    category: 'math',
    iconName: 'BarChart3',
    badge: 'Statistics',
    keywords: [
      'confidence interval calculator',
      'confidence interval',
      'margin of error calculator',
      'standard error calculator',
      '95 confidence interval',
      'ci calculator',
    ],
    kind: 'custom',
    componentId: 'ConfidenceIntervalCalculator',
    content: {
      intro:
        'The Confidence Interval Calculator turns a sample mean, standard deviation, and sample size into an interval estimate for the population mean. It reports the margin of error, standard error, and critical value at 90%, 95%, 98%, or 99% confidence.',
      howItWorks:
        'The standard error is the sample standard deviation divided by the square root of the sample size. Multiply it by the critical value for your confidence level — 1.96 at 95% — to get the margin of error, then add and subtract that from the sample mean. A 95% interval means that 95% of intervals built this way, across repeated samples, would contain the true mean.',
      example:
        'A sample of 36 observations with a mean of 100 and a standard deviation of 15 has a standard error of 2.5. At 95% confidence the margin of error is 1.96 × 2.5 = 4.90, so the interval runs from 95.1 to 104.9.',
      formulas: [
        {
          label: 'Standard error',
          expression: 'SE = s / √n',
        },
        {
          label: 'Margin of error',
          expression: 'ME = z × SE',
          note: 'z = 1.645 (90%), 1.960 (95%), 2.326 (98%), 2.576 (99%).',
        },
        {
          label: 'Confidence interval',
          expression: 'CI = x̄ ± ME',
        },
      ],
      sources: [
        {
          label: 'NIST/SEMATECH e-Handbook of Statistical Methods',
          expression: 'CI = x̄ ± z(1−α/2) · s/√n',
          note: 'The handbook documents both the normal and t-distribution forms of the interval.',
        },
        {
          label: 'Cochran, W. G. (1977), Sampling Techniques, 3rd ed.',
          expression: 'Standard error and precision of a sample mean',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Confidence interval',
          explanation:
            'The range you would report as the plausible values of the population mean at the chosen confidence level.',
        },
        {
          resultLabel: 'Margin of error',
          explanation:
            'Half the width of the interval — how far the estimate could reasonably be from the true mean.',
        },
        {
          resultLabel: 'Standard error',
          explanation:
            'The typical distance between a sample mean and the population mean; it shrinks as the sample grows.',
        },
      ],
      workflowLinks: [
        { slug: 'standard-deviation-calculator', step: 'Get the sample standard deviation this interval needs.' },
        { slug: 'sample-size-calculator', step: 'Plan the sample size for a target margin of error.' },
      ],
      faqs: [
        {
          q: 'What does a 95% confidence interval actually mean?',
          a: 'If you repeated the study many times, about 95% of the intervals you built would contain the true population mean. It is not a 95% probability that this particular interval contains it.',
        },
        {
          q: 'Should I use z or t?',
          a: 'Use t when the population standard deviation is unknown and the sample is small. This calculator uses the normal (z) approximation, which is close to t for samples above roughly 30; for smaller samples a t-based interval is wider and safer.',
        },
        {
          q: 'How do I narrow a confidence interval?',
          a: 'Increase the sample size or accept a lower confidence level. Reducing random measurement error also helps, because it lowers the standard deviation.',
        },
        {
          q: 'Can I use this for a proportion or a survey percentage?',
          a: 'This tool is for a continuous mean. For a proportion such as a poll result, use the proportion confidence interval formula, which depends on p(1−p) rather than a standard deviation.',
        },
      ],
      related: ['standard-deviation-calculator', 'z-score-calculator', 'sample-size-calculator', 'mean-median-mode-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'sample-size',
    slug: 'sample-size-calculator',
    name: 'Sample Size Calculator',
    shortDesc: 'Calculate the survey or study sample size needed for a target confidence level and margin of error.',
    tagline: 'How many responses your study actually needs.',
    category: 'math',
    iconName: 'Table',
    badge: 'Statistics',
    keywords: [
      'sample size calculator',
      'survey sample size',
      'how many responses do i need',
      'cochran sample size',
      'margin of error calculator',
      'sample size formula',
    ],
    kind: 'custom',
    componentId: 'SampleSizeCalculator',
    content: {
      intro:
        'The Sample Size Calculator estimates how many completed responses a survey or study needs to reach a chosen margin of error at a chosen confidence level. It uses Cochran\'s formula and applies the finite population correction when you know the size of the population.',
      howItWorks:
        'Cochran\'s formula multiplies the squared critical value by the expected proportion and its complement, then divides by the squared margin of error. A 95% confidence level and a 5% margin of error with a 50% expected proportion gives about 385 responses. If the population is small, the finite population correction reduces that number.',
      example:
        'For 95% confidence, a ±5% margin of error, and a 50% expected proportion, the unadjusted requirement is 385 responses. In a population of 1,000 the finite population correction lowers it to 278; in a population of 100,000 it stays effectively at 385.',
      formulas: [
        {
          label: 'Cochran\'s formula',
          expression: 'n₀ = z² × p(1 − p) / e²',
          note: 'p = 0.5 maximises the required sample when no prior estimate exists.',
        },
        {
          label: 'Finite population correction',
          expression: 'n = n₀ / (1 + (n₀ − 1) / N)',
        },
      ],
      sources: [
        {
          label: 'Cochran, W. G. (1977), Sampling Techniques, 3rd ed.',
          expression: 'n₀ = z²pq/e²',
          note: 'The standard reference for the sample size formula and its finite population correction.',
        },
        {
          label: 'NIST/SEMATECH e-Handbook of Statistical Methods',
          expression: 'Sample size for a specified margin of error',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Required sample',
          explanation:
            'Completed responses needed. This is not the number of people to invite — divide by your expected response rate to get that.',
        },
        {
          resultLabel: 'Finite population correction',
          explanation:
            'A reduction applied when the population is small relative to the sample, because sampling without replacement is more precise.',
        },
      ],
      workflowLinks: [
        { slug: 'confidence-interval-calculator', step: 'Turn the result into an interval once the data arrive.' },
        { slug: 'percentage-calculator', step: 'Convert raw response counts into percentages.' },
      ],
      faqs: [
        {
          q: 'What sample size do I need for a survey?',
          a: 'It depends on the precision you need. For a ±5% margin at 95% confidence, budget about 385 responses regardless of population size; for ±3%, about 1,067. Smaller margins need disproportionately larger samples.',
        },
        {
          q: 'Why does a 50% proportion need the largest sample?',
          a: 'The term p(1−p) is largest at p = 0.5. If you expect a very one-sided result, the required sample is smaller — but using 50% is the safe choice when you have no prior estimate.',
        },
        {
          q: 'Should I allow for people who do not respond?',
          a: 'Yes. The figure here is completed responses. If you expect a 20% response rate, invite roughly five times as many people, and monitor whether non-response is biased.',
        },
        {
          q: 'Does a big population always need a bigger sample?',
          a: 'Not much. Beyond a few thousand, population size barely changes the requirement; the finite population correction matters mainly for small, closed populations such as a single company or school.',
        },
      ],
      related: ['confidence-interval-calculator', 'z-score-calculator', 'percentage-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'variance',
    slug: 'variance-calculator',
    name: 'Variance Calculator',
    shortDesc: 'Calculate sample and population variance, standard deviation, mean, and range from a list of values.',
    tagline: 'See how spread out your data really is.',
    category: 'math',
    iconName: 'BarChart3',
    badge: 'Statistics',
    featured: true,
    keywords: [
      'variance calculator',
      'sample variance',
      'population variance',
      'variance formula',
      'standard deviation calculator',
      'calculate variance',
    ],
    kind: 'custom',
    componentId: 'VarianceCalculator',
    content: {
      intro:
        'The Variance Calculator measures how far a set of numbers spreads around its mean. Paste your data and it returns both sample and population variance, the matching standard deviations, the mean, count, and range.',
      howItWorks:
        'Variance is the average squared distance from the mean. For a sample, divide the sum of squared deviations by n − 1 (Bessel\u2019s correction) so the estimate is unbiased for the wider population. For a complete population, divide by n. Standard deviation is the square root of variance, which returns the spread to the original units.',
      example:
        'For 12, 15, 18, 22, 25, and 31 the mean is 20.5. The squared deviations sum to 241.5, so the population variance is 241.5 / 6 = 40.25 and the sample variance is 241.5 / 5 = 48.3. The sample standard deviation is about 6.95.',
      formulas: [
        {
          label: 'Sample variance',
          expression: 's² = Σ(xᵢ − x̄)² / (n − 1)',
          note: 'Use when the data are a sample drawn from a larger population.',
        },
        {
          label: 'Population variance',
          expression: 'σ² = Σ(xᵢ − μ)² / N',
          note: 'Use only when the list contains the entire population.',
        },
        {
          label: 'Standard deviation',
          expression: 's = √s²',
        },
      ],
      sources: [
        {
          label: 'NIST/SEMATECH e-Handbook of Statistical Methods',
          expression: 's² = Σ(xᵢ − x̄)² / (n − 1)',
          note: 'Section 1.3.5.6 documents the sample variance and the reason for the n − 1 denominator.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Sample variance',
          explanation:
            'The usual choice for experimental or survey data: it corrects for the fact that a sample mean sits closer to its own data than the true population mean does.',
        },
        {
          resultLabel: 'Population variance',
          explanation:
            'The variance of the complete list you entered, without the n − 1 correction. It is smaller than the sample variance by the factor (n − 1)/n.',
        },
      ],
      workflowLinks: [
        { slug: 'standard-deviation-calculator', step: 'Convert the variance into the original units.' },
        { slug: 'mean-median-mode-calculator', step: 'Check whether the centre is being pulled by outliers.' },
        { slug: 'percentile-calculator', step: 'Describe the spread without assuming a distribution.' },
      ],
      faqs: [
        {
          q: 'Should I use sample or population variance?',
          a: 'Use sample variance whenever your numbers are a subset of a larger group you want to describe — which covers most experiments and surveys. Use population variance only when the list is the entire group, such as every score in one class.',
        },
        {
          q: 'Why does variance use squared differences?',
          a: 'Squaring removes the sign, so distances above and below the mean cannot cancel out. It also makes large deviations count disproportionately more, which is why variance is sensitive to outliers.',
        },
        {
          q: 'What is the difference between variance and standard deviation?',
          a: 'Standard deviation is the square root of variance. Variance is in squared units (for example, squared centimetres), while standard deviation is back in the original units and is easier to interpret.',
        },
        {
          q: 'Can variance be negative?',
          a: 'No. Squared deviations are never negative, so variance is zero or positive. A variance of zero means every value is identical.',
        },
      ],
      related: ['standard-deviation-calculator', 'mean-median-mode-calculator', 'percentile-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'percentile',
    slug: 'percentile-calculator',
    name: 'Percentile Calculator',
    shortDesc: 'Find the value at any percentile, or the percentile rank of a specific value, from a data set.',
    tagline: 'Where does one value sit in the distribution?',
    category: 'math',
    iconName: 'Target',
    badge: 'Statistics',
    keywords: [
      'percentile calculator',
      'percentile rank calculator',
      '90th percentile',
      'percentile formula',
      'quartile calculator',
      'percentile rank',
    ],
    kind: 'custom',
    componentId: 'PercentileCalculator',
    content: {
      intro:
        'The Percentile Calculator answers two related questions: which value sits at a given percentile, and what percentile a particular value occupies. It sorts the data, interpolates between observations, and splits ties evenly.',
      howItWorks:
        'Percentiles divide a sorted data set into 100 equal parts. This tool uses linear interpolation between the two nearest observations — the same convention as Excel\u2019s PERCENTILE.INC and NumPy\u2019s default \u201Clinear\u201D method. Percentile rank works the other way: count the values below the target, add half of any exact ties, and divide by the number of observations.',
      example:
        'For 15, 20, 35, 40, 50, 62, 71, and 80, the 90th percentile has rank (8 − 1) × 0.9 = 6.3, which interpolates to 71 + 0.3 × (80 − 71) = 73.7. The value 62 has five values below it and one tie, so its percentile rank is (5 + 0.5) / 8 = 68.75%.',
      formulas: [
        {
          label: 'Percentile (linear interpolation)',
          expression: 'rank = (n − 1) × p / 100; value = x⌊rank⌋ + (rank − ⌊rank⌋)(x⌈rank⌉ − x⌊rank⌋)',
        },
        {
          label: 'Percentile rank',
          expression: 'rank% = (values below + ties / 2) / n × 100',
        },
      ],
      sources: [
        {
          label: 'NIST/SEMATECH e-Handbook of Statistical Methods',
          expression: 'Percentile and quantile definitions',
          note: 'NIST notes that several percentile conventions exist and that the chosen definition should be stated with the result.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Percentile value',
          explanation:
            'The data value at the requested percentile. At P90, roughly 90% of observations fall at or below it.',
        },
        {
          resultLabel: 'Percentile rank',
          explanation:
            'The share of observations at or below the value you entered. Ties are split evenly so the rank does not jump when duplicates exist.',
        },
      ],
      workflowLinks: [
        { slug: 'mean-median-mode-calculator', step: 'Compare the median with the mean.' },
        { slug: 'standard-deviation-calculator', step: 'Add a spread measure based on every value.' },
        { slug: 'z-score-calculator', step: 'Express one observation in standard deviations.' },
      ],
      faqs: [
        {
          q: 'What is the difference between a percentile and a percentage?',
          a: 'A percentage is a fraction of a whole. A percentile is a position in a ranked distribution: the 90th percentile is the value below which 90% of observations fall. A score of 90% and the 90th percentile are unrelated facts.',
        },
        {
          q: 'Why do different calculators give slightly different percentiles?',
          a: 'There is no single agreed definition. Excel, NumPy, and statistics packages interpolate differently at the edges. This tool uses linear interpolation on rank (n − 1)p, so results match Excel\u2019s PERCENTILE.INC.',
        },
        {
          q: 'How many values do I need?',
          a: 'Percentiles are meaningful from about eight to ten observations upward. With very small samples the interpolated value sits between real observations and should be read as a rough position, not a precise cut-off.',
        },
        {
          q: 'Is the 50th percentile the median?',
          a: 'Yes. P50 is the median under this interpolation method. The 25th and 75th percentiles are the first and third quartiles, and their difference is the interquartile range.',
        },
      ],
      related: ['mean-median-mode-calculator', 'standard-deviation-calculator', 'z-score-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'margin-of-error',
    slug: 'margin-of-error-calculator',
    name: 'Margin of Error Calculator',
    shortDesc: 'Calculate the margin of error and confidence interval for a survey proportion at any confidence level.',
    tagline: 'How precise is that survey percentage?',
    category: 'math',
    iconName: 'Gauge',
    badge: 'Statistics',
    keywords: [
      'margin of error calculator',
      'margin of error formula',
      'survey margin of error',
      'confidence interval proportion',
      'polling margin of error',
      'sampling error calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'n', label: 'Sample size (n)', type: 'number', defaultValue: 400, min: 1, step: 1 },
        { id: 'p', label: 'Sample proportion', type: 'number', defaultValue: 50, min: 0, max: 100, suffix: '%' },
        { id: 'z', label: 'Critical value (z)', type: 'number', defaultValue: 1.96, min: 0.1, step: 0.01 },
      ],
      results: [
        {
          label: 'Margin of error',
          formulaCode: 'z * Math.sqrt((p / 100) * (1 - p / 100) / n) * 100',
          accent: true,
          suffix: 'percentage points',
        },
        {
          label: 'Lower bound',
          formulaCode: 'p - z * Math.sqrt((p / 100) * (1 - p / 100) / n) * 100',
          suffix: '%',
        },
        {
          label: 'Upper bound',
          formulaCode: 'p + z * Math.sqrt((p / 100) * (1 - p / 100) / n) * 100',
          suffix: '%',
        },
      ],
      formulaDescription: 'MOE = z × √(p(1 − p) / n), reported in percentage points',
      tips: [
        'Use z = 1.645 for 90%, 1.96 for 95%, 2.326 for 98%, and 2.576 for 99% confidence.',
        'A 50% proportion produces the widest margin of error, so it is the conservative planning assumption.',
      ],
    },
    content: {
      intro:
        'The Margin of Error Calculator turns a survey sample size and proportion into a plus-or-minus range at your chosen confidence level. It reports the margin of error in percentage points and the lower and upper bounds of the confidence interval.',
      howItWorks:
        'For a proportion, the standard error is the square root of p(1 − p) divided by n. Multiply that by the critical value for your confidence level to get the margin of error. The interval is the sample proportion plus or minus that margin. This is the same arithmetic behind the \u201C±3 points\u201D line in a published poll.',
      example:
        'A poll of 400 people finds 50% support. At 95% confidence the margin of error is 1.96 × √(0.5 × 0.5 / 400) = 4.9 percentage points, so the interval runs from 45.1% to 54.9%. Halving the margin to about 2.5 points would need roughly 1,600 respondents.',
      formulas: [
        {
          label: 'Margin of error for a proportion',
          expression: 'MOE = z × √(p(1 − p) / n)',
          note: 'Multiply by 100 to express the result in percentage points.',
        },
        {
          label: 'Confidence interval',
          expression: 'CI = p ± MOE',
        },
        {
          label: 'Sample size for a target MOE',
          expression: 'n = z² × p(1 − p) / MOE²',
        },
      ],
      sources: [
        {
          label: 'NIST/SEMATECH e-Handbook of Statistical Methods',
          expression: 'Standard error of a proportion',
          note: 'The handbook gives the large-sample normal approximation used here.',
        },
        {
          label: 'American Association for Public Opinion Research — margin of error',
          expression: 'MOE describes sampling error only',
          note: 'AAPOR stresses that margin of error excludes non-response, question wording, and coverage error.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Margin of error',
          explanation:
            'The plus-or-minus figure in percentage points. It covers random sampling error at the stated confidence level, not bias from who answered or how the question was asked.',
        },
        {
          resultLabel: 'Lower and upper bounds',
          explanation:
            'The ends of the confidence interval around your sample proportion. For a 95% interval, about 95% of samples drawn the same way would produce an interval containing the true value.',
        },
      ],
      workflowLinks: [
        { slug: 'sample-size-calculator', step: 'Plan the sample size for a target margin of error.' },
        { slug: 'confidence-interval-calculator', step: 'Use the mean-based interval for continuous data.' },
        { slug: 'percentage-calculator', step: 'Convert raw counts into the proportion.' },
      ],
      faqs: [
        {
          q: 'What does a 3% margin of error mean?',
          a: 'If the poll reports 50% with a ±3 point margin at 95% confidence, the true share is plausibly between 47% and 53%. It does not mean the poll is 3% wrong, and it says nothing about systematic bias.',
        },
        {
          q: 'Does margin of error shrink with population size?',
          a: 'Barely. It depends mainly on sample size. A poll of 1,000 people has roughly the same margin whether the population is a city or a country, which is why national polls can be that small.',
        },
        {
          q: 'Why is the margin widest at 50%?',
          a: 'The term p(1 − p) peaks at p = 0.5. A race that is close to a tie therefore has the largest margin of error; a 90/10 result has a narrower one with the same sample.',
        },
        {
          q: 'What is not included in the margin of error?',
          a: 'Non-response bias, question wording, order effects, and coverage gaps. Those are usually larger than sampling error in real surveys, which is why a small margin does not guarantee an accurate poll.',
        },
      ],
      related: ['sample-size-calculator', 'confidence-interval-calculator', 'percentage-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'probability',
    slug: 'probability-calculator',
    name: 'Probability Calculator',
    shortDesc: 'Convert favourable and total outcomes into a probability, decimal, and odds.',
    tagline: 'Turn a count of outcomes into a probability.',
    category: 'math',
    iconName: 'Target',
    badge: 'Probability',
    keywords: [
      'probability calculator',
      'odds calculator',
      'probability formula',
      'chance calculator',
      'odds in favour',
      'single event probability',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'favourable', label: 'Favourable outcomes', type: 'number', defaultValue: 1, min: 0, step: 1 },
        { id: 'total', label: 'Total possible outcomes', type: 'number', defaultValue: 6, min: 1, step: 1 },
      ],
      results: [
        { label: 'Probability', formulaCode: '(favourable / total) * 100', accent: true, suffix: '%' },
        { label: 'Probability as a decimal', formulaCode: 'favourable / total' },
        { label: 'Odds in favour (per 1 against)', formulaCode: 'favourable / (total - favourable)' },
        { label: 'Odds against (per 1 in favour)', formulaCode: '(total - favourable) / favourable' },
      ],
      formulaDescription: 'P = favourable outcomes / total outcomes',
      tips: [
        'Every outcome must be equally likely for this formula to apply.',
        'Odds are not probabilities: 1:5 odds equals a 1/6 probability, about 16.7%.',
      ],
    },
    content: {
      intro:
        'The Probability Calculator converts a count of favourable outcomes and total possible outcomes into a probability, a decimal, and odds in favour and against. It is the single-event case behind dice, cards, raffles, and simple quality checks.',
      howItWorks:
        'Classical probability is the number of favourable outcomes divided by the number of equally likely outcomes. Multiply by 100 for a percentage. Odds compare favourable to unfavourable outcomes instead of favourable to total, which is why a probability of 1/6 is stated as 1:5 odds, not 1:6.',
      example:
        'Rolling a single six-sided die and wanting a 4: one favourable outcome out of six gives a probability of 1/6 = 16.67%. The odds in favour are 1:5, and the odds against are 5:1.',
      formulas: [
        {
          label: 'Probability',
          expression: 'P(A) = favourable outcomes / total outcomes',
          note: 'Requires equally likely outcomes and no overlap between them.',
        },
        {
          label: 'Odds in favour',
          expression: 'Odds = favourable : unfavourable = f : (n − f)',
        },
        {
          label: 'Complement',
          expression: 'P(not A) = 1 − P(A)',
        },
      ],
      sources: [
        {
          label: 'NIST/SEMATECH e-Handbook of Statistical Methods',
          expression: 'Probability, odds, and equally likely outcomes',
          note: 'The handbook distinguishes classical probability from frequency-based estimates.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Probability',
          explanation:
            'The chance of the event as a percentage, assuming every listed outcome is equally likely and mutually exclusive.',
        },
        {
          resultLabel: 'Odds in favour',
          explanation:
            'The ratio of favourable to unfavourable outcomes. Odds of 1:5 correspond to a probability of 1/6, not 1/5.',
        },
      ],
      workflowLinks: [
        { slug: 'combinations-permutations-calculator', step: 'Count outcomes when order and repetition matter.' },
        { slug: 'percentage-calculator', step: 'Work with the probability as a share.' },
        { slug: 'z-score-calculator', step: 'Move from counting outcomes to a continuous distribution.' },
      ],
      faqs: [
        {
          q: 'What is the difference between probability and odds?',
          a: 'Probability compares favourable outcomes with all outcomes. Odds compare favourable outcomes with unfavourable ones. A 25% probability is 1:3 odds in favour, because there is one success for every three failures.',
        },
        {
          q: 'Can probability be greater than 1?',
          a: 'No. A probability runs from 0 (impossible) to 1 (certain). If your calculation exceeds 1, you have counted more favourable outcomes than total outcomes, or an outcome is being counted twice.',
        },
        {
          q: 'Does this work for two events at once?',
          a: 'No. This is a single-event calculator. For independent events multiply their probabilities; for either of two mutually exclusive events add them. For overlapping events subtract the overlap.',
        },
        {
          q: 'What does it mean for outcomes to be equally likely?',
          a: 'Each outcome must have the same chance — true for a fair die or a well-shuffled deck, false for a biased coin or a rigged draw. When outcomes are not equally likely, use observed frequencies instead.',
        },
      ],
      related: ['combinations-permutations-calculator', 'percentage-calculator', 'z-score-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'normal-distribution',
    slug: 'normal-distribution-calculator',
    name: 'Normal Distribution Calculator',
    shortDesc: 'Find the probability between two values, z-scores, and the middle 68% and 95% ranges of a normal distribution.',
    tagline: 'Probability under the bell curve, without a z-table.',
    category: 'math',
    iconName: 'LineChart',
    badge: 'Probability',
    featured: true,
    keywords: [
      'normal distribution calculator',
      'normal curve calculator',
      'bell curve calculator',
      'probability between two values',
      'z score probability',
      'standard normal distribution',
    ],
    kind: 'custom',
    componentId: 'NormalDistributionCalculator',
    content: {
      intro:
        'The Normal Distribution Calculator returns the probability that a normally distributed value falls between two bounds. It also reports the matching z-scores, the cumulative probabilities, and the middle 68% and 95% ranges for your mean and standard deviation.',
      howItWorks:
        'A normal distribution is defined by its mean and standard deviation. Converting a value to a z-score — (x − μ) / σ — places it on the standard normal curve. The area under the curve between two z-scores is the probability of landing in that range. This calculator evaluates the normal CDF numerically, with an error below 1.5 × 10⁻⁷.',
      example:
        'For a mean of 100 and a standard deviation of 15, the probability of a value between 85 and 115 is about 68.27%, because those bounds sit one standard deviation either side of the mean. The middle 95% range runs from about 70.6 to 129.4.',
      formulas: [
        {
          label: 'z-score',
          expression: 'z = (x − μ) / σ',
        },
        {
          label: 'Probability between bounds',
          expression: 'P(a < X < b) = Φ((b − μ)/σ) − Φ((a − μ)/σ)',
          note: 'Φ is the standard normal cumulative distribution function.',
        },
        {
          label: '68–95–99.7 rule',
          expression: '≈68% within 1σ, ≈95% within 2σ, ≈99.7% within 3σ',
        },
      ],
      sources: [
        {
          label: 'NIST/SEMATECH e-Handbook of Statistical Methods',
          expression: 'Normal distribution and standard normal table',
          note: 'Section 1.3.6.6 documents the normal PDF, CDF, and the z transformation.',
        },
        {
          label: 'Abramowitz & Stegun, Handbook of Mathematical Functions',
          expression: 'Error-function approximation 7.1.26',
          note: 'The approximation used here has a maximum absolute error of 1.5 × 10⁻⁷.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Probability between bounds',
          explanation:
            'The area under the normal curve between your two values, expressed as a percentage of all observations.',
        },
        {
          resultLabel: 'Middle 95% range',
          explanation:
            'The central interval that contains 95% of values for this mean and standard deviation — the same 1.96σ logic used in confidence intervals.',
        },
      ],
      workflowLinks: [
        { slug: 'z-score-calculator', step: 'Convert a single observation into a z-score.' },
        { slug: 'standard-deviation-calculator', step: 'Get the standard deviation from raw data.' },
        { slug: 'confidence-interval-calculator', step: 'Apply the same normal model to a sample mean.' },
      ],
      faqs: [
        {
          q: 'What is the 68–95–99.7 rule?',
          a: 'In a normal distribution, about 68% of values lie within one standard deviation of the mean, 95% within two, and 99.7% within three. It is a quick sanity check before using the exact calculation.',
        },
        {
          q: 'Can I use this if my data are not normal?',
          a: 'The arithmetic still runs, but the probabilities will be wrong. Check a histogram or a normality test first. Income, house prices, and wait times are typically skewed and need a different model or a transformation.',
        },
        {
          q: 'What is the difference between this and a z-score calculator?',
          a: 'A z-score calculator standardises one value. This calculator integrates the curve between two values to give a probability, and also reports the central 68% and 95% ranges.',
        },
        {
          q: 'Why is the middle 95% range not exactly mean ± 2σ?',
          a: 'Two standard deviations capture about 95.4%. The exact central 95% interval uses z = ±1.96, which is slightly narrower — the same critical value used in a 95% confidence interval.',
        },
      ],
      related: ['z-score-calculator', 'standard-deviation-calculator', 'confidence-interval-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'triangle',
    slug: 'triangle-calculator',
    name: 'Triangle Calculator',
    shortDesc: 'Solve SSS, SAS, ASA, and AAS triangles with the law of sines and cosines, including area and perimeter.',
    tagline: 'Every side, angle, and the area from what you know.',
    category: 'math',
    iconName: 'Triangle',
    badge: 'Geometry',
    featured: true,
    keywords: [
      'triangle calculator',
      'triangle solver',
      'law of sines calculator',
      'law of cosines calculator',
      'sss triangle',
      'sas triangle',
      'triangle area calculator',
    ],
    kind: 'custom',
    componentId: 'TriangleCalculator',
    content: {
      intro:
        'The Triangle Calculator solves a triangle from the information you have: three sides (SSS), two sides and the included angle (SAS), two angles and the side between them (ASA), or two angles and a side opposite one (AAS). It returns every remaining side and angle, plus area and perimeter.',
      howItWorks:
        'SSS uses the law of cosines to find each angle from the side lengths. SAS uses the law of cosines to find the third side, then the law of sines for the angles. ASA and AAS use the fact that the angles sum to 180°, then the law of sines to scale the sides. Area comes from Heron\u2019s formula, which needs only the three sides and stays accurate for obtuse triangles.',
      example:
        'A 3–4–5 triangle has a right angle opposite the 5. The law of cosines gives angles of about 36.87°, 53.13°, and 90°, an area of 6 square units, and a perimeter of 12. Because all three sides differ, it is scalene.',
      formulas: [
        {
          label: 'Law of cosines',
          expression: 'c² = a² + b² − 2ab cos C',
          note: 'Used for SSS and SAS; it reduces to Pythagoras when C = 90°.',
        },
        {
          label: 'Law of sines',
          expression: 'a / sin A = b / sin B = c / sin C',
          note: 'Used for ASA and AAS once the third angle is known.',
        },
        {
          label: 'Heron\u2019s formula',
          expression: 'Area = √(s(s − a)(s − b)(s − c)), s = (a + b + c)/2',
        },
      ],
      sources: [
        {
          label: 'NIST Digital Library of Mathematical Functions',
          expression: 'Law of sines and law of cosines',
          note: 'DLMF §4.36 and §4.37 give the triangle identities used here.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Sides and angles',
          explanation:
            'Side a is opposite angle A, side b opposite B, and side c opposite C. The three angles always sum to 180°.',
        },
        {
          resultLabel: 'Area',
          explanation:
            'Computed with Heron\u2019s formula, so no height is needed and obtuse triangles are handled correctly.',
        },
        {
          resultLabel: 'Triangle type',
          explanation:
            'Equilateral when all sides match, isosceles when two match, scalene when none do. It describes the shape, not whether the triangle is right-angled.',
        },
      ],
      workflowLinks: [
        { slug: 'pythagorean-theorem-calculator', step: 'Check a right triangle with the simpler a² + b² = c².' },
        { slug: 'circle-area-calculator', step: 'Move from a triangle to a circumscribed or inscribed circle.' },
        { slug: 'slope-calculator', step: 'Work out the incline between two points.' },
      ],
      faqs: [
        {
          q: 'Why can\u2019t I solve a triangle with two sides and a non-included angle?',
          a: 'That case (SSA) can produce zero, one, or two different triangles — the ambiguous case. A calculator that silently returns one answer can be wrong, so this tool does not offer it. Use the law of sines and check both solutions by hand.',
        },
        {
          q: 'How do I know which side is a, b, or c?',
          a: 'The convention is that side a is opposite angle A, side b opposite B, and side c opposite C. For ASA, side c is the side between angles A and B. Keep that labelling consistent or the results will not match your diagram.',
        },
        {
          q: 'What does it mean if the calculator rejects my sides?',
          a: 'The triangle inequality requires every pair of sides to add up to more than the third. If 2, 3, and 8 are entered, no triangle exists, because 2 + 3 is less than 8.',
        },
        {
          q: 'Does the area formula work for obtuse triangles?',
          a: 'Yes. Heron\u2019s formula depends only on side lengths, so it works for acute, right, and obtuse triangles alike. That is why it is used here instead of the half-base-times-height form.',
        },
      ],
      related: ['pythagorean-theorem-calculator', 'circle-area-calculator', 'slope-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'fraction-to-decimal',
    slug: 'fraction-to-decimal-calculator',
    name: 'Fraction to Decimal Calculator',
    shortDesc: 'Convert a fraction to a decimal and percentage, and simplify it to lowest terms.',
    tagline: 'From 3/8 to 0.375 in one step.',
    category: 'math',
    iconName: 'Divide',
    badge: 'Fractions',
    keywords: [
      'fraction to decimal calculator',
      'fraction to decimal',
      'convert fraction to decimal',
      'fraction to percentage',
      'simplify fraction',
      'decimal equivalent',
    ],
    kind: 'custom',
    componentId: 'FractionToDecimalCalculator',
    content: {
      intro:
        'The Fraction to Decimal Calculator converts any fraction into a decimal and a percentage, and reduces it to lowest terms. It also reports the mixed-number form when the numerator is larger than the denominator.',
      howItWorks:
        'A fraction is a division: the numerator divided by the denominator. The decimal is that quotient; multiply by 100 for the percentage. To simplify, divide both parts by their greatest common divisor. A fraction is terminating when the reduced denominator has only 2 and 5 as prime factors, and repeating otherwise.',
      example:
        'For 6/8, dividing gives 0.75, which is 75%. The greatest common divisor of 6 and 8 is 2, so the fraction simplifies to 3/4. For 1/3 the decimal is 0.333…, a repeating decimal with no exact finite form.',
      formulas: [
        {
          label: 'Decimal value',
          expression: 'Decimal = numerator / denominator',
        },
        {
          label: 'Percentage',
          expression: 'Percent = (numerator / denominator) × 100',
        },
        {
          label: 'Simplification',
          expression: 'Divide numerator and denominator by gcd(n, d)',
        },
      ],
      sources: [
        {
          label: 'NIST Digital Library of Mathematical Functions',
          expression: 'Rational numbers and repeating decimals',
          note: 'A reduced fraction has a terminating decimal exactly when its denominator is of the form 2ᵃ5ᵇ.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Decimal',
          explanation:
            'The exact quotient when it terminates, or a rounded value when it repeats. The simplified fraction is shown beside it so the exact value is never lost.',
        },
        {
          resultLabel: 'Simplified fraction',
          explanation:
            'The same value with the numerator and denominator divided by their greatest common divisor.',
        },
        {
          resultLabel: 'Mixed number',
          explanation:
            'The whole-number part and the remaining proper fraction, useful for measurements such as 2 3/4 inches.',
        },
      ],
      workflowLinks: [
        { slug: 'fraction-to-percent-calculator', step: 'Go straight from a fraction to a percentage.' },
        { slug: 'fraction-calculator', step: 'Add, subtract, multiply, or divide fractions.' },
        { slug: 'percentage-calculator', step: 'Use the percentage in a discount or markup.' },
      ],
      faqs: [
        {
          q: 'How do I convert a fraction to a decimal by hand?',
          a: 'Divide the numerator by the denominator. For 3/8, 8 goes into 3.000 three times (0.3), leaving 0.6, then 7 times (0.07), leaving 0.04, then 5 times (0.005) — giving 0.375.',
        },
        {
          q: 'Which fractions produce repeating decimals?',
          a: 'Any fraction whose simplified denominator has a prime factor other than 2 or 5. So 1/3, 1/6, and 5/7 repeat, while 1/8, 3/20, and 7/25 terminate.',
        },
        {
          q: 'Can the denominator be negative?',
          a: 'Mathematically yes, but the usual convention moves the sign to the numerator. This calculator normalises the sign, so 3/−8 is treated as −3/8 and reported as −0.375.',
        },
        {
          q: 'Why simplify a fraction if the decimal is the same?',
          a: 'Simplified fractions are easier to compare, add, and use in recipes or measurements. 3/4 is immediately readable; 24/32 is not.',
        },
      ],
      related: ['fraction-to-percent-calculator', 'fraction-calculator', 'percentage-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  }
];
