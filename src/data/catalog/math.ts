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
];
