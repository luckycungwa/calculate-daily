import { CalculatorMeta } from '../../types';

export const FINANCE_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'compound',
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    shortDesc: 'Project long-term wealth growth with recurring deposits and compound interest.',
    tagline: 'See the exponential power of compounding your money.',
    category: 'finance',
    iconName: 'TrendingUp',
    badge: 'Wealth',
    featured: true,
    keywords: ['compound interest', 'compound interest calculator', 'investment growth', 'savings growth', 'future value', 'retirement calculator'],
    kind: 'custom',
    componentId: 'CompoundInterestCalculator',
    content: {
      intro:
        'The Compound Interest Calculator projects how your money grows when interest earns interest. It models an initial deposit plus regular monthly contributions over a chosen time horizon, splitting the final balance into deposits versus earned interest.',
      howItWorks:
        'Future value is computed with the compound growth formula FV = P x (1 + r/n)^(nt) for the principal, plus an annuity term for monthly contributions. The tool subtracts total deposits from the final balance to isolate interest earned.',
      example:
        'Start with R5,000, add R250 monthly at 8% annual interest for 10 years. The projected balance is roughly R67,000, of which nearly R32,000 is pure compound growth.',
      formulas: [
        {
          label: 'Future Value of Principal',
          expression: 'FV = P × (1 + r/n)^(n × t)',
          note: 'P = principal, r = annual rate, n = compounds per year, t = years.',
        },
        {
          label: 'Future Value of Contributions',
          expression: 'FV = PMT × ((1 + r/12)^(12t) − 1) / (r/12)',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Projected Balance',
          explanation:
            'The sum of compounded principal and compounded monthly contributions at the end of the horizon.',
        },
        {
          resultLabel: 'Total Compound Growth',
          explanation:
            'Interest earned on top of everything you deposited. It shows how much of the ending balance came from growth rather than savings.',
        },
      ],
      workflowLinks: [
        { slug: 'simple-interest-calculator', step: 'Compare against linear, non-compounding growth.' },
        { slug: 'down-payment-savings-calculator', step: 'Turn the projection into a concrete monthly savings pace.' },
      ],
      faqs: [
        { q: 'How often is interest compounded?', a: 'This calculator uses monthly compounding, which matches most bank and brokerage accounts and produces slightly more growth than annual compounding.' },
        { q: 'What is the best way to maximize compounding?', a: 'Start early and contribute consistently. Time in the market, not timing, drives compound growth.' },
        { q: 'Does this account for inflation?', a: 'No. The projection shows nominal future value. To see buying power, mentally discount the result by your expected inflation rate.' },
      ],
      related: ['mortgage-calculator', 'simple-interest-calculator', 'loan-payment-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.85,
    },
  },
  {
    id: 'mortgage',
    slug: 'mortgage-calculator',
    name: 'Mortgage & Loan Planner',
    shortDesc: 'Estimate monthly loan repayments, total interest, and amortization schedules.',
    tagline: 'Smart monthly mortgage costs with full interest analysis.',
    category: 'finance',
    iconName: 'Home',
    badge: 'Finance',
    featured: true,
    keywords: ['mortgage', 'mortgage calculator', 'home loan', 'monthly payment', 'amortization', 'interest rate', 'house payment'],
    kind: 'custom',
    componentId: 'MortgageCalculator',
    content: {
      intro:
        'The Mortgage & Loan Planner estimates your monthly principal-and-interest payment, adds property tax and insurance, and reveals lifetime interest costs. A built-in amortization schedule shows the exact balance remaining each year.',
      howItWorks:
        'Monthly payments come from the standard amortization formula M = P x r x (1+r)^n / ((1+r)^n - 1), where r is the monthly rate and n the number of payments. Annual taxes and insurance are divided by 12 and added on top.',
      example:
        'A R400,000 home with R80,000 down at 6.5% over 30 years produces a principal-and-interest payment near R2,023, climbing to about R2,356 when taxes and insurance are included.',
      formulas: [
        {
          label: 'Monthly Payment',
          expression: 'M = P × r × (1 + r)^n / ((1 + r)^n − 1)',
          note: 'P = loan amount, r = monthly interest rate, n = total number of payments.',
        },
        {
          label: 'Total Interest',
          expression: 'Total Interest = (M × n) − P',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Total Monthly Payment',
          explanation:
            'Principal and interest plus one-twelfth of annual property taxes and home insurance. This is the cash you actually set aside each month.',
        },
        {
          resultLabel: 'Total Interest Paid',
          explanation:
            'The cumulative interest over the full loan term. Early payments are mostly interest, so this number is typically large relative to the principal.',
        },
      ],
      workflowLinks: [
        { slug: 'refinance-calculator', step: 'Already a homeowner? Check if refinancing pays off.' },
        { slug: 'amortization-schedule-calculator', step: 'Dive into the full monthly payment schedule.' },
        { slug: 'mortgage-affordability-calculator', step: 'Starting out? See how much house you can afford.' },
      ],
      faqs: [
        { q: 'How much of my payment goes to interest?', a: 'Early payments are mostly interest. Over a 30-year loan at typical rates, interest can exceed the principal borrowed, which the lifetime summary makes visible.' },
        { q: 'Should I choose a 15 or 30 year term?', a: 'A 15-year term has a higher monthly payment but far less total interest. Compare both in the tool to see the trade-off in dollars.' },
        { q: 'Does the estimate include PMI?', a: 'Yes. Enter your annual PMI in the optional section. It is typically required when your down payment is under 20%.' },
      ],
      related: ['refinance-calculator', 'amortization-schedule-calculator', 'mortgage-affordability-calculator', 'rent-vs-buy-calculator', 'closing-cost-calculator', 'down-payment-savings-calculator', 'home-equity-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.9,
    },
  },
  {
    id: 'mortgage-refinance',
    slug: 'refinance-calculator',
    name: 'Refinance Calculator',
    shortDesc: 'Find your break-even point and monthly savings when refinancing a mortgage.',
    tagline: 'Know exactly when a refi pays for itself.',
    category: 'finance',
    iconName: 'RefreshCcw',
    badge: 'Home',
    featured: true,
    keywords: ['refinance calculator', 'mortgage refinance', 'refinance break even', 'lower rate', 'refinance savings', 'closing costs refinance'],
    kind: 'custom',
    componentId: 'RefinanceCalculator',
    content: {
      intro:
        'The Refinance Calculator compares your current mortgage payment against a new rate and shows the break-even point, the number of months it takes for monthly savings to cover the closing costs. It also totals the interest saved over the rest of the loan.',
      howItWorks:
        'Monthly savings come from the difference between your current payment and the new-rate payment on the same balance. Break-even divides closing costs by that monthly savings figure, and lifetime interest savings compare holding the old loan to term versus the new one.',
      example:
        'Refinancing a R250,000 balance from 6.5% to 5.5% over 25 years saves about R153 a month. With R7,000 in closing costs, the refi breaks even in roughly 3.8 years.',
      resultExplanations: [
        {
          resultLabel: 'Break-Even Point',
          explanation:
            'The number of months until cumulative savings equal your closing costs. Staying in the home past this point means the refi is saving you money.',
        },
        {
          resultLabel: 'Lifetime Interest Saved',
          explanation:
            'Total interest on the current loan held to term minus total interest on the refinanced loan. This is the big-picture benefit beyond the monthly payment drop.',
        },
      ],
      workflowLinks: [
        { slug: 'mortgage-calculator', step: 'Model the payment on your current loan first.' },
        { slug: 'home-equity-calculator', step: 'Check your equity before committing to a refi.' },
      ],
      faqs: [
        { q: 'When does refinancing make sense?', a: 'When you plan to stay past the break-even point and can lock in a meaningfully lower rate without resetting your term too far.' },
        { q: 'What counts as closing costs?', a: 'Origination fees, title insurance, appraisal, credit report, and recording fees. Rolled into the loan they still count against your break-even.' },
        { q: 'Can I refinance to a shorter term?', a: 'Yes, but the payment may rise even at a lower rate. The tool uses the same term for a fair like-for-like comparison.' },
      ],
      related: ['mortgage-calculator', 'home-equity-calculator', 'loan-payment-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.85,
    },
  },
  {
    id: 'amortization-schedule',
    slug: 'amortization-schedule-calculator',
    name: 'Amortization Schedule Calculator',
    shortDesc: 'See every monthly payment, principal, and interest across the full loan term.',
    tagline: 'The complete anatomy of your loan, month by month.',
    category: 'finance',
    iconName: 'Table',
    badge: 'Home',
    featured: true,
    keywords: ['amortization schedule', 'amortization calculator', 'loan schedule', 'principal and interest schedule', 'loan payoff schedule'],
    kind: 'custom',
    componentId: 'AmortizationScheduleCalculator',
    content: {
      intro:
        'The Amortization Schedule Calculator lays out the full repayment plan of any fixed-rate loan, month by month: payment amount, principal, interest, cumulative interest, and remaining balance. Add extra payments to see the term shrink and interest savings grow.',
      howItWorks:
        'Each month, the interest due is the balance times the monthly rate, and the rest of your payment reduces principal. Because the balance falls, interest shrinks over time and the principal portion grows. The annual chart shows the shift.',
      example:
        'A R300,000 loan at 6.5% over 30 years carries a payment near R1,896. Total interest approaches R382,000, but adding R100 a month cuts about 4 years off the term and saves over R60,000 in interest.',
      resultExplanations: [
        {
          resultLabel: 'Payoff Time',
          explanation:
            'How long the loan actually lasts given your payments. Extra monthly payments shorten this dramatically.',
        },
        {
          resultLabel: 'Total Interest',
          explanation:
            'The cumulative interest paid over the life of the loan. Early in the schedule most of each payment is interest.',
        },
      ],
      workflowLinks: [
        { slug: 'mortgage-calculator', step: 'Start with the monthly payment estimate.' },
        { slug: 'refinance-calculator', step: 'See if a lower rate changes the picture.' },
      ],
      faqs: [
        { q: 'Why is most of my early payment interest?', a: 'Interest is charged on the full outstanding balance, which is largest at the start. As you pay down principal, the interest slice shrinks.' },
        { q: 'How does an extra payment help?', a: 'Every extra dollar goes straight to principal, reducing future interest. It also shortens the term.' },
        { q: 'Can I use this for any loan?', a: 'Yes, the schedule works for any fixed-rate loan: auto, personal, student, or home.' },
      ],
      related: ['mortgage-calculator', 'refinance-calculator', 'loan-payment-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.8,
    },
  },
  {
    id: 'mortgage-affordability',
    slug: 'mortgage-affordability-calculator',
    name: 'Mortgage Affordability Calculator',
    shortDesc: 'Find the maximum home price your income and debts support.',
    tagline: 'How much house can you really afford?',
    category: 'finance',
    iconName: 'Home',
    badge: 'Home',
    featured: true,
    keywords: ['how much house can i afford', 'affordability calculator', 'mortgage affordability', 'home buying budget', 'dtI calculator'],
    kind: 'custom',
    componentId: 'AffordabilityCalculator',
    content: {
      intro:
        'The Mortgage Affordability Calculator answers the single most common home-buying question: how much house can I afford? It uses your gross income, monthly debts, down payment, and typical housing costs to solve for a maximum home price within a healthy debt-to-income ratio.',
      howItWorks:
        'The tool applies the 36% back-end DTI guideline: housing payment plus other debts should stay under 36% of gross monthly income. It backs out the largest home price whose principal-and-interest, property tax, and insurance fit that budget.',
      example:
        'With R85,000 in annual income, R400 in monthly debts, 20% down, and a 6.5% rate, the calculator finds a comfortable maximum near R430,000 with a monthly payment around R2,700.',
      resultExplanations: [
        {
          resultLabel: 'Maximum Home Price',
          explanation:
            'The largest price that keeps your total housing payment inside the DTI limit. Staying under it preserves room for saving and unexpected costs.',
        },
        {
          resultLabel: 'Back-End DTI',
          explanation:
            'Housing payment plus other debt payments as a share of gross income. Lenders generally want this at or under 36%.',
        },
      ],
      workflowLinks: [
        { slug: 'closing-cost-calculator', step: 'Next, budget the fees you will pay at closing.' },
        { slug: 'down-payment-savings-calculator', step: 'Then plan how to save the down payment.' },
      ],
      faqs: [
        { q: 'What is a healthy debt-to-income ratio?', a: 'Most lenders prefer a back-end DTI at or below 36%, with the housing portion under 28%. Higher ratios mean riskier loans and worse rates.' },
        { q: 'Should I include bonuses in income?', a: 'Lenders typically require a two-year history of bonuses before counting them. Use your reliable base income for a conservative estimate.' },
        { q: 'What if I have a large down payment?', a: 'A bigger down payment lowers the loan and monthly payment, letting you afford a more expensive home within the same income.' },
      ],
      related: ['closing-cost-calculator', 'down-payment-savings-calculator', 'mortgage-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.95,
    },
  },
  {
    id: 'rent-vs-buy',
    slug: 'rent-vs-buy-calculator',
    name: 'Rent vs Buy Calculator',
    shortDesc: 'Compare total renting cost against buying, including the equity you build.',
    tagline: 'The math behind the rent-or-buy decision.',
    category: 'finance',
    iconName: 'Scale',
    badge: 'Home',
    featured: true,
    keywords: ['rent vs buy', 'rent or buy calculator', 'buying vs renting', 'home buying decision', 'rent calculator'],
    kind: 'custom',
    componentId: 'RentVsBuyCalculator',
    content: {
      intro:
        'The Rent vs Buy Calculator puts real numbers behind one of the biggest financial decisions you will make. It compares total cash spent renting against the total cost of owning over your chosen horizon, subtracting the equity you build so the comparison is fair.',
      howItWorks:
        'Renting accumulates monthly rent payments that grow at your rent-increase rate. Buying starts with a down payment, then monthly principal-and-interest, property tax, and insurance; the principal portion becomes equity that offsets the cash outlay.',
      example:
        'At R1,600 a month rent growing 3% a year, ten years of renting costs about R220,000. Buying a R350,000 home with 20% down at 6.5% costs more upfront but builds roughly R130,000 in equity, often making ownership the cheaper path long-term.',
      resultExplanations: [
        {
          resultLabel: 'Net Cost of Buying',
          explanation:
            'Total cash spent on the purchase and monthly payments minus the equity accumulated. This is the true cost of ownership versus renting.',
        },
        {
          resultLabel: 'Buy-Payback Crossover',
          explanation:
            'The point where cumulative buying costs fall below cumulative renting costs. Staying past this point favors buying.',
        },
      ],
      workflowLinks: [
        { slug: 'mortgage-affordability-calculator', step: 'Confirm you can afford the purchase first.' },
        { slug: 'mortgage-calculator', step: 'Model the exact monthly payment.' },
      ],
      faqs: [
        { q: 'Is buying always better than renting?', a: 'No. It depends on your horizon, rent growth, mortgage rate, and maintenance. Short horizons and high home prices often favor renting.' },
        { q: 'Do you include maintenance and repairs?', a: 'The model focuses on mortgage, tax, and insurance. Owners should budget roughly 1% of home value a year for upkeep on top.' },
        { q: 'Does the tool include the down payment?', a: 'Yes. The down payment counts as cash spent on the buy side, which is one reason ownership costs more upfront.' },
      ],
      related: ['mortgage-affordability-calculator', 'mortgage-calculator', 'closing-cost-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.9,
    },
  },
  {
    id: 'down-payment-savings',
    slug: 'down-payment-savings-calculator',
    name: 'Down Payment Savings Calculator',
    shortDesc: 'Break your down payment goal into a daily, weekly, and monthly savings pace.',
    tagline: 'A concrete plan to reach your down payment.',
    category: 'finance',
    iconName: 'PiggyBank',
    badge: 'Home',
    featured: true,
    keywords: ['down payment savings', 'save for house', 'down payment calculator', 'home savings plan', 'how to save for a house'],
    kind: 'custom',
    componentId: 'DownPaymentSavingsCalculator',
    content: {
      intro:
        'The Down Payment Savings Calculator turns a daunting savings target into a concrete daily, weekly, and monthly deposit pace. It accounts for what you have saved and the interest your savings earn, then projects when you will reach your goal.',
      howItWorks:
        'Each month your balance grows by the monthly deposit plus interest earned. The tool reports the daily and weekly equivalents of that pace and the total time needed to hit your target.',
      example:
        'Saving R80,000 with R20,000 already banked and R1,000 a month at 4% reaches the goal in about 4.5 years. That is roughly R44 a day toward your down payment.',
      resultExplanations: [
        {
          resultLabel: 'Time to Down Payment',
          explanation:
            'The number of years and months until your projected balance reaches the target, assuming your monthly deposit and rate hold steady.',
        },
        {
          resultLabel: 'Daily Pace',
          explanation:
            'The daily equivalent of your monthly deposit, useful for translating the goal into everyday terms and micro-savings habits.',
        },
      ],
      workflowLinks: [
        { slug: 'mortgage-affordability-calculator', step: 'Start with how much home you can afford.' },
        { slug: 'compound-interest-calculator', step: 'See what your savings balance could grow into.' },
      ],
      faqs: [
        { q: 'How much should I aim to save?', a: 'Most lenders want at least 20% down to avoid private mortgage insurance. At minimum, plan for 3% to 5% plus closing costs.' },
        { q: 'Where should I keep down-payment savings?', a: 'In a high-yield savings account or a CD ladder. The money should be safe and liquid, not invested in stocks you may need to sell at a loss.' },
        { q: 'Should I automate my deposits?', a: 'Yes. Automating the monthly transfer removes willpower from the equation and makes the schedule self-executing.' },
      ],
      related: ['mortgage-affordability-calculator', 'closing-cost-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.8,
    },
  },
  {
    id: 'loan-payment',
    slug: 'loan-payment-calculator',
    name: 'Loan Payment Calculator',
    shortDesc: 'Estimate monthly repayments and total interest for any fixed-rate loan.',
    tagline: 'Know your monthly payment before you borrow.',
    category: 'finance',
    iconName: 'Landmark',
    keywords: ['loan payment', 'loan calculator', 'monthly payment', 'auto loan', 'car loan', 'personal loan', 'installment'],
    kind: 'config',
    config: {
      fields: [
        { id: 'amount', label: 'Loan Amount', type: 'number', defaultValue: 20000, min: 0, prefix: '$' },
        { id: 'annualRate', label: 'Annual Interest Rate', type: 'number', defaultValue: 7, min: 0, suffix: '%' },
        { id: 'years', label: 'Loan Term', type: 'number', defaultValue: 5, min: 1, suffix: 'yrs' },
      ],
      results: [
        { label: 'Monthly Payment', formulaCode: '(function(){ var r = annualRate / 100 / 12; var n = years * 12; var f = Math.pow(1 + r, n); return r === 0 ? amount / n : amount * r * f / (f - 1); })()', prefix: '$', accent: true },
        { label: 'Total Paid Over Term', formulaCode: '(function(){ var r = annualRate / 100 / 12; var n = years * 12; var f = Math.pow(1 + r, n); var m = r === 0 ? amount / n : amount * r * f / (f - 1); return m * n; })()', prefix: '$' },
        { label: 'Total Interest', formulaCode: '(function(){ var r = annualRate / 100 / 12; var n = years * 12; var f = Math.pow(1 + r, n); var m = r === 0 ? amount / n : amount * r * f / (f - 1); return m * n - amount; })()', prefix: '$' },
      ],
      formulaDescription: 'M = P x r x (1 + r)^n / ((1 + r)^n - 1)',
      tips: [
        'Extending the term lowers monthly payments but raises total interest.',
        'A 1% rate drop can save thousands over a five-year auto loan.',
      ],
    },
    content: {
      intro:
        'The Loan Payment Calculator estimates the monthly repayment and lifetime interest for any fixed-rate loan, from car loans to personal installments. Run scenarios before signing to compare terms at a glance.',
      howItWorks:
        'It applies the amortization formula M = P x r x (1+r)^n / ((1+r)^n - 1) with the monthly rate and total payment count. Total interest is the difference between all payments and the amount borrowed.',
      example:
        'Borrow R20,000 at 7% over 5 years. The monthly payment is about R396, total paid is roughly R23,761, and interest comes to approximately R3,761.',
      formulas: [
        {
          label: 'Monthly Payment',
          expression: 'M = P × r × (1 + r)^n / ((1 + r)^n − 1)',
          note: 'P = principal, r = monthly rate, n = total payments.',
        },
        {
          label: 'Total Interest',
          expression: 'Interest = (M × n) − P',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Monthly Payment',
          explanation:
            'The fixed amount you pay each month, composed of both principal and interest, calculated from the amortization formula.',
        },
        {
          resultLabel: 'Total Interest',
          explanation:
            'The lifetime cost of borrowing, equal to all payments minus the amount you originally borrowed.',
        },
      ],
      workflowLinks: [
        { slug: 'mortgage-calculator', step: 'Scale the same math to a full amortization schedule.' },
        { slug: 'credit-card-interest-calculator', step: 'Compare this fixed installment against revolving card interest.' },
      ],
      faqs: [
        { q: 'What factors affect my monthly payment?', a: 'The amount borrowed, the interest rate, and the term length. Longer terms spread payments thinner but cost more in total interest.' },
        { q: 'Can I use this for a car loan?', a: 'Yes. Enter the financed amount after any down payment, the dealer rate, and the term to get an accurate monthly estimate.' },
        { q: 'Should I refinance to a lower rate?', a: 'Compare the total interest on your current terms against the new ones. The tool makes the difference explicit in dollars.' },
      ],
      related: ['mortgage-calculator', 'simple-interest-calculator', 'compound-interest-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.75,
    },
  },
  {
    id: 'simple-interest',
    slug: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    shortDesc: 'Calculate interest earned or owed without compounding.',
    tagline: 'Straightforward interest math for loans and savings.',
    category: 'finance',
    iconName: 'PiggyBank',
    keywords: ['simple interest', 'interest calculator', 'interest earned', 'interest owed', 'principal interest'],
    kind: 'config',
    config: {
      fields: [
        { id: 'principal', label: 'Principal Amount', type: 'number', defaultValue: 10000, min: 0, prefix: '$' },
        { id: 'rate', label: 'Annual Rate', type: 'number', defaultValue: 5, min: 0, suffix: '%' },
        { id: 'years', label: 'Time Period', type: 'number', defaultValue: 3, min: 0, suffix: 'yrs' },
      ],
      results: [
        { label: 'Interest', formulaCode: 'principal * rate / 100 * years', prefix: '$', accent: true },
        { label: 'Total Balance', formulaCode: 'principal + principal * rate / 100 * years', prefix: '$' },
      ],
      formulaDescription: 'Interest = Principal x Rate x Time',
      tips: [
        'Simple interest never capitalizes, so growth is linear rather than exponential.',
        'For compounding, use the Compound Interest Calculator instead.',
      ],
    },
    content: {
      intro:
        'The Simple Interest Calculator finds interest on the original principal only, with no compounding. It is the right tool for short-term loans, late fees, savings bonds, and any agreement stated as flat interest.',
      howItWorks:
        'Simple interest follows the formula I = P x r x t: principal times the annual rate times the number of years. The tool also returns the total balance, which is the principal plus interest.',
      example:
        'Deposit R10,000 at a flat 5% annual rate for 3 years. Interest is 10,000 x 0.05 x 3 = R1,500, giving a final balance of R11,500.',
      formulas: [
        {
          label: 'Simple Interest',
          expression: 'I = P × r × t',
          note: 'P = principal, r = annual rate, t = time in years.',
        },
        {
          label: 'Total Balance',
          expression: 'Balance = P + I',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Interest',
          explanation:
            'The flat interest earned or owed on the original principal only, with no capitalization.',
        },
        {
          resultLabel: 'Total Balance',
          explanation:
            'The principal plus the simple interest, the final figure for a loan or deposit at maturity.',
        },
      ],
      workflowLinks: [
        { slug: 'compound-interest-calculator', step: 'Compare the same deposit under compounding instead.' },
        { slug: 'roi-calculator', step: 'Measure the return as a percentage of the principal.' },
      ],
      faqs: [
        { q: 'What is the difference between simple and compound interest?', a: 'Simple interest is calculated only on the original principal. Compound interest also earns on previously accumulated interest, growing faster over time.' },
        { q: 'When is simple interest used?', a: 'Short-term loans, certain bonds, and flat-rate agreements. Mortgages and standard savings accounts typically compound.' },
        { q: 'How do I find the rate or time instead?', a: 'Rearrange the formula. Rate = Interest / (Principal x Time) and Time = Interest / (Principal x Rate).' },
      ],
      related: ['compound-interest-calculator', 'loan-payment-calculator', 'roi-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.6,
    },
  },
  {
    id: 'hourly-salary',
    slug: 'hourly-to-annual-salary-calculator',
    name: 'Hourly to Annual Salary',
    shortDesc: 'Convert hourly pay to weekly, monthly, and annual income.',
    tagline: 'See your real annual earnings from an hourly rate.',
    category: 'finance',
    iconName: 'Wallet',
    keywords: ['hourly to annual', 'salary calculator', 'hourly pay', 'annual salary', 'hourly rate to salary', 'paycheck'],
    kind: 'config',
    config: {
      fields: [
        { id: 'hourlyRate', label: 'Hourly Rate', type: 'number', defaultValue: 25, min: 0, prefix: '$' },
        { id: 'hoursPerWeek', label: 'Hours per Week', type: 'number', defaultValue: 40, min: 1 },
        { id: 'weeksPerYear', label: 'Weeks Worked per Year', type: 'number', defaultValue: 52, min: 1 },
      ],
      results: [
        { label: 'Annual Salary', formulaCode: 'hourlyRate * hoursPerWeek * weeksPerYear', prefix: '$', accent: true },
        { label: 'Weekly Pay', formulaCode: 'hourlyRate * hoursPerWeek', prefix: '$' },
        { label: 'Monthly Pay', formulaCode: 'hourlyRate * hoursPerWeek * weeksPerYear / 12', prefix: '$' },
      ],
      formulaDescription: 'Annual = Hourly Rate x Hours per Week x Weeks per Year',
      tips: [
        'Freelancers often bill 1,800 to 2,000 hours per year after holidays and vacation.',
        'Adjust weeks worked to reflect unpaid time off.',
      ],
    },
    content: {
      intro:
        'The Hourly to Annual Salary calculator converts an hourly rate into weekly, monthly, and annual income. Freelancers comparing jobs and employees negotiating rates use it to translate time into take-home math.',
      howItWorks:
        'Annual income is the hourly rate multiplied by hours per week and weeks worked per year. Monthly pay is the annual figure divided by 12, giving a realistic estimate for budgeting.',
      example:
        'At R25 per hour for 40 hours a week over 52 weeks, annual income is R52,000, with weekly pay of R1,000 and monthly pay near R4,333.',
      formulas: [
        {
          label: 'Annual Salary',
          expression: 'Annual = Rate × Hours/Week × Weeks/Year',
        },
        {
          label: 'Monthly Pay',
          expression: 'Monthly = Annual / 12',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Annual Salary',
          explanation:
            'Your gross yearly income before taxes, computed from the hourly rate and your work schedule.',
        },
        {
          resultLabel: 'Weekly / Monthly Pay',
          explanation:
            'The same income broken into familiar periods for budgeting and comparisons between job offers.',
        },
      ],
      workflowLinks: [
        { slug: 'emergency-fund-calculator', step: 'Size your safety net relative to your monthly pay.' },
        { slug: 'roi-calculator', step: 'Evaluate the return on training or education from this income.' },
      ],
      faqs: [
        { q: 'How many hours are in a standard work year?', a: 'A typical full-time year is 2,080 hours (40 hours x 52 weeks). Many freelancers bill closer to 1,800 hours after holidays.' },
        { q: 'Is this gross or net income?', a: 'The calculator reports gross income before taxes and deductions. Net pay depends on your tax bracket and withholdings.' },
        { q: 'How do I convert an annual salary to hourly?', a: 'Divide the annual salary by the hours worked per year. R52,000 / 2,080 equals R25 per hour.' },
      ],
      related: ['roi-calculator', 'markup-margin-calculator', 'emergency-fund-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.65,
    },
  },
  {
    id: 'roi',
    slug: 'roi-calculator',
    name: 'ROI Calculator',
    shortDesc: 'Measure return on investment and net profit from a final value.',
    tagline: 'Quantify how well your money is working.',
    category: 'finance',
    iconName: 'BarChart3',
    keywords: ['roi', 'return on investment', 'roi calculator', 'investment return', 'profit percentage', 'gain'],
    kind: 'config',
    config: {
      fields: [
        { id: 'investment', label: 'Amount Invested', type: 'number', defaultValue: 5000, min: 0, prefix: '$' },
        { id: 'finalValue', label: 'Final Value', type: 'number', defaultValue: 6500, min: 0, prefix: '$' },
      ],
      results: [
        { label: 'Net Profit', formulaCode: 'finalValue - investment', prefix: '$', accent: true },
        { label: 'Return on Investment', formulaCode: '(finalValue - investment) / investment * 100', suffix: '%' },
      ],
      formulaDescription: 'ROI = (Final Value - Invested) / Invested x 100',
      tips: [
        'ROI ignores time, so compare same-duration investments fairly.',
        'Annualized ROI = ((1 + ROI / 100) ^ (1 / years) - 1) x 100.',
      ],
    },
    content: {
      intro:
        'The ROI Calculator measures how efficiently your investment performed by comparing the final value to what you put in. Investors, marketers, and founders use it to judge a single decision in one clear percentage.',
      howItWorks:
        'Net profit is the final value minus the amount invested. ROI expresses that profit as a percentage of the original investment: (final - invested) / invested x 100.',
      example:
        'Invest R5,000 and receive R6,500 back. Net profit is R1,500 and ROI is 30%, meaning every rand returned R1.30.',
      formulas: [
        {
          label: 'Net Profit',
          expression: 'Profit = Final − Invested',
        },
        {
          label: 'Return on Investment',
          expression: 'ROI = (Final − Invested) / Invested × 100',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Net Profit',
          explanation:
            'The absolute gain, final value minus the amount invested.',
        },
        {
          resultLabel: 'Return on Investment',
          explanation:
            'Profit expressed as a percentage of the original investment, the standard way to judge a deal.',
        },
      ],
      workflowLinks: [
        { slug: 'compound-interest-calculator', step: 'Project the same capital over time with compounding.' },
        { slug: 'simple-interest-calculator', step: 'Check the flat-rate equivalent of this return.' },
      ],
      faqs: [
        { q: 'What is a good ROI?', a: 'It depends on risk and timeframe. Stock-market averages hover around 7-10% annually, while startups and ads require much higher returns to justify the risk.' },
        { q: 'Does ROI include time?', a: 'No, basic ROI ignores duration. Annualized ROI divides the growth by the holding period for fair comparison.' },
        { q: 'What if I lose money?', a: 'When the final value is below the invested amount, the calculator reports a negative ROI and a loss.' },
      ],
      related: ['compound-interest-calculator', 'simple-interest-calculator', 'markup-margin-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.6,
    },
  },
  {
    id: 'credit-card',
    slug: 'credit-card-interest-calculator',
    name: 'Credit Card Interest Calculator',
    shortDesc: 'See how much monthly interest your card balance accrues.',
    tagline: 'Understand the true cost of carrying a balance.',
    category: 'finance',
    iconName: 'CreditCard',
    keywords: ['credit card interest', 'credit card calculator', 'apr', 'monthly interest', 'card balance', 'minimum payment'],
    kind: 'config',
    config: {
      fields: [
        { id: 'balance', label: 'Current Balance', type: 'number', defaultValue: 3000, min: 0, prefix: '$' },
        { id: 'annualRate', label: 'APR', type: 'number', defaultValue: 24, min: 0, suffix: '%' },
      ],
      results: [
        { label: 'Monthly Interest Charge', formulaCode: 'balance * (annualRate / 100 / 12)', prefix: '$', accent: true },
        { label: 'Annual Interest', formulaCode: 'balance * annualRate / 100', prefix: '$' },
      ],
      formulaDescription: 'Monthly Interest = Balance x (APR / 12)',
      tips: [
        'Interest compounds daily on most cards, so paying early in the cycle saves money.',
        'Only the interest shows here; minimum payments also include principal.',
      ],
    },
    content: {
      intro:
        'The Credit Card Interest Calculator reveals the monthly interest charge on an unpaid balance, making the cost of revolving debt impossible to ignore. Use it before deciding how aggressively to pay down a card.',
      howItWorks:
        'Monthly interest is the balance multiplied by the annual percentage rate divided by 12. Because cards compound daily, this is an accurate first-order estimate of the next statement charge.',
      example:
        'A R3,000 balance at 24% APR accrues about R60 in interest this month and roughly R720 over a full year if the balance stays flat.',
      formulas: [
        {
          label: 'Monthly Interest',
          expression: 'Interest = Balance × (APR / 100 / 12)',
        },
        {
          label: 'Annual Interest',
          expression: 'Annual = Balance × APR / 100',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Monthly Interest Charge',
          explanation:
            'The estimated interest added to your balance in a single statement cycle based on the current APR.',
        },
        {
          resultLabel: 'Annual Interest',
          explanation:
            'The yearly interest cost if the balance stayed constant, useful for seeing the true cost of revolving debt.',
        },
      ],
      workflowLinks: [
        { slug: 'loan-payment-calculator', step: 'Convert the balance into a fixed installment payoff instead.' },
        { slug: 'emergency-fund-calculator', step: 'Build savings that cover this interest instead of paying it.' },
      ],
      faqs: [
        { q: 'How is credit card interest calculated?', a: 'Cards convert the APR to a daily rate and charge interest on the average daily balance. Monthly interest approximates balance x APR / 12.' },
        { q: 'How can I avoid paying interest?', a: 'Pay the full statement balance before the due date every month. Most cards then offer a grace period with no interest on purchases.' },
        { q: 'Does this include fees?', a: 'No. Late fees, balance-transfer fees, and cash-advance fees are separate from the interest charge shown here.' },
      ],
      related: ['loan-payment-calculator', 'emergency-fund-calculator', 'simple-interest-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.65,
    },
  },
  {
    id: 'emergency-fund',
    slug: 'emergency-fund-calculator',
    name: 'Emergency Fund Calculator',
    shortDesc: 'Size the savings cushion you need to cover living costs.',
    tagline: 'Build a realistic safety net, one month at a time.',
    category: 'finance',
    iconName: 'Shield',
    keywords: ['emergency fund', 'savings cushion', 'rainy day fund', 'living expenses', 'financial safety net'],
    kind: 'config',
    config: {
      fields: [
        { id: 'monthlyExpenses', label: 'Monthly Living Expenses', type: 'number', defaultValue: 3000, min: 0, prefix: '$' },
        { id: 'months', label: 'Months of Coverage', type: 'number', defaultValue: 6, min: 1 },
      ],
      results: [
        { label: 'Target Emergency Fund', formulaCode: 'monthlyExpenses * months', prefix: '$', accent: true },
        { label: 'Weekly Savings Need (over 1 yr)', formulaCode: 'monthlyExpenses * months / 52', prefix: '$' },
      ],
      formulaDescription: 'Target = Monthly Expenses x Months of Coverage',
      tips: [
        'Financial planners typically recommend 3 to 6 months of essential expenses.',
        'Start with one month, then extend the buffer over time.',
      ],
    },
    content: {
      intro:
        'The Emergency Fund Calculator sizes the cash cushion you need to survive a job loss, medical bill, or major repair. It multiplies your essential monthly expenses by a chosen coverage window and translates the target into a weekly savings pace.',
      howItWorks:
        'The target fund is your monthly essential expenses times the months of coverage you choose. Dividing that target across a year gives a weekly savings rate that turns the goal into an action plan.',
      example:
        'With R3,000 in monthly expenses, a 6-month cushion is R18,000. Saving toward it over a year means setting aside about R346 each week.',
      formulas: [
        {
          label: 'Target Emergency Fund',
          expression: 'Target = Monthly Expenses × Months of Coverage',
        },
        {
          label: 'Weekly Savings Need',
          expression: 'Weekly = Target / Weeks',
          note: 'Assumes building the fund over one year (52 weeks).',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Target Emergency Fund',
          explanation:
            'The total cash cushion needed to cover your essential expenses for the chosen number of months.',
        },
        {
          resultLabel: 'Weekly Savings Need',
          explanation:
            'How much to set aside each week to build the full cushion within a year, turning the goal into a repeatable habit.',
        },
      ],
      workflowLinks: [
        { slug: 'compound-interest-calculator', step: 'Grow the fund in a high-yield account while you save.' },
        { slug: 'down-payment-savings-calculator', step: 'Break the target into a concrete monthly savings pace.' },
      ],
      faqs: [
        { q: 'How many months should my emergency fund cover?', a: 'Three months is a common starting point and six months is the typical full recommendation. Freelancers often target more due to variable income.' },
        { q: 'What counts as essential expenses?', a: 'Housing, utilities, groceries, insurance, transport, and minimum debt payments. Discretionary spending is usually excluded.' },
        { q: 'Where should I keep the fund?', a: 'In a high-yield savings account that is liquid and separate from everyday spending, so it is never accidentally touched.' },
      ],
      related: ['compound-interest-calculator', 'credit-card-interest-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
    },
  },
  {
    id: 'home-equity',
    slug: 'home-equity-calculator',
    name: 'Home Equity Calculator',
    shortDesc: 'Calculate your current home equity, loan-to-value ratio, and HELOC capacity.',
    tagline: 'See how much of your home you actually own.',
    category: 'finance',
    iconName: 'Landmark',
    badge: 'Home',
    featured: true,
    keywords: ['home equity', 'equity calculator', 'heloc', 'loan to value', 'ltv', 'home value', 'mortgage balance'],
    kind: 'config',
    config: {
      fields: [
        { id: 'homeValue', label: 'Current Home Value', type: 'number', defaultValue: 450000, min: 0, prefix: '$' },
        { id: 'mortgageBalance', label: 'Mortgage Balance', type: 'number', defaultValue: 280000, min: 0, prefix: '$' },
      ],
      results: [
        { label: 'Home Equity', formulaCode: 'homeValue - mortgageBalance', prefix: '$', accent: true },
        { label: 'Equity Percentage', formulaCode: '(homeValue > 0) ? (homeValue - mortgageBalance) / homeValue * 100 : 0', suffix: '%' },
        { label: 'Loan-to-Value (LTV)', formulaCode: '(homeValue > 0) ? mortgageBalance / homeValue * 100 : 0', suffix: '%' },
        { label: 'HELOC Capacity (80% LTV)', formulaCode: 'Math.max(0, homeValue * 0.8 - mortgageBalance)', prefix: '$' },
      ],
      formulaDescription: 'Equity = Home Value - Mortgage Balance',
      tips: [
        'Lenders typically allow a HELOC up to 80% combined loan-to-value.',
        'Your equity grows as you pay down principal and as the home appreciates.',
      ],
    },
    content: {
      intro:
        'The Home Equity Calculator reveals how much of your home you own outright. Subtract your mortgage balance from the current market value, then see your equity percentage, loan-to-value ratio, and how much a lender might let you borrow with a HELOC.',
      howItWorks:
        'Equity is simply the home value minus the mortgage balance. LTV divides the mortgage by the value, and the HELOC estimate caps borrowing at 80% of the value minus what you still owe.',
      example:
        'A home worth R450,000 with a R280,000 mortgage leaves R170,000 in equity, an LTV of about 62%, and a potential HELOC of roughly R80,000 at an 80% LTV cap.',
      faqs: [
        { q: 'What is a good loan-to-value ratio?', a: 'Lenders prefer LTV below 80%. Above that, private mortgage insurance is typically required and refinancing options narrow.' },
        { q: 'How is home equity used?', a: 'Equity can back home-improvement loans, HELOCs, cash-out refinancing, or a bigger down payment on a future home.' },
        { q: 'Does the calculator know my home value?', a: 'No. The current value is your best estimate, based on recent sales in your area, an appraisal, or an automated valuation.' },
      ],
      related: ['mortgage-calculator', 'loan-payment-calculator', 'refinance-calculator'],
      workflowLinks: [
        { slug: 'mortgage-calculator', step: 'Model your payment and remaining balance over time.' },
        { slug: 'refinance-calculator', step: 'See if tapping equity via a refi makes sense.' },
      ],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
    },
  },
  {
    id: 'closing-cost',
    slug: 'closing-cost-calculator',
    name: 'Closing Cost Calculator',
    shortDesc: 'Estimate the fees and prepaids you pay when buying or refinancing a home.',
    tagline: 'Budget the true upfront cost of a mortgage.',
    category: 'finance',
    iconName: 'Receipt',
    badge: 'Home',
    keywords: ['closing costs', 'home buying fees', 'mortgage closing', 'loan origination fee', 'title insurance', 'prepaid costs'],
    kind: 'config',
    config: {
      fields: [
        { id: 'homePrice', label: 'Home Price', type: 'number', defaultValue: 400000, min: 0, prefix: '$' },
        { id: 'loanAmount', label: 'Loan Amount', type: 'number', defaultValue: 320000, min: 0, prefix: '$' },
        { id: 'originationPct', label: 'Origination Fee', type: 'number', defaultValue: 1, min: 0, suffix: '%' },
        { id: 'titlePct', label: 'Title & Escrow', type: 'number', defaultValue: 0.5, min: 0, suffix: '%' },
        { id: 'appraisal', label: 'Appraisal & Inspection', type: 'number', defaultValue: 900, min: 0, prefix: '$' },
        { id: 'prepaids', label: 'Prepaids (tax/ins)', type: 'number', defaultValue: 3500, min: 0, prefix: '$' },
      ],
      results: [
        { label: 'Total Closing Costs', formulaCode: 'loanAmount * originationPct / 100 + loanAmount * titlePct / 100 + appraisal + prepaids', prefix: '$', accent: true },
        { label: 'As % of Home Price', formulaCode: 'homePrice > 0 ? (loanAmount * originationPct / 100 + loanAmount * titlePct / 100 + appraisal + prepaids) / homePrice * 100 : 0', suffix: '%' },
        { label: 'Est. Cash Needed (down + closing)', formulaCode: 'homePrice - loanAmount + loanAmount * originationPct / 100 + loanAmount * titlePct / 100 + appraisal + prepaids', prefix: '$' },
      ],
      formulaDescription: 'Total = Origination + Title/Escrow + Appraisal + Prepaids',
      tips: [
        'Buyers typically pay 2% to 5% of the purchase price in closing costs.',
        'Some fees are negotiable; compare lender estimates side by side.',
      ],
    },
    content: {
      intro:
        'The Closing Cost Calculator budgets every major fee you pay at the closing table, from loan origination and title insurance to appraisal, inspections, and prepaid taxes. Seeing the real cash needed avoids sticker shock on top of the down payment.',
      howItWorks:
        'Origination and title fees scale as a percentage of the loan, appraisal and inspection are flat, and prepaids cover escrow items like property tax and homeowners insurance. The tool sums them and adds the result to your down payment for a true cash-out total.',
      example:
        'On a R400,000 home with a R320,000 loan, a 1% origination fee, 0.5% title cost, R900 appraisal, and R3,500 in prepaids produce closing costs near R8,700 and total cash needed around R88,700.',
      faqs: [
        { q: 'What is included in closing costs?', a: 'Loan origination, title search and insurance, appraisal, attorney or escrow fees, recording charges, and prepaid taxes and insurance are the common items.' },
        { q: 'Can the seller pay my closing costs?', a: 'Often yes, within limits set by the loan program. Ask your agent to negotiate a seller concession when you make the offer.' },
        { q: 'Are closing costs tax deductible?', a: 'Points paid on a mortgage are often deductible, but most other closing fees are not. Check current tax guidance for your situation.' },
      ],
      related: ['mortgage-calculator', 'mortgage-affordability-calculator', 'home-equity-calculator'],
      workflowLinks: [
        { slug: 'mortgage-affordability-calculator', step: 'Start with how much house you can afford.' },
        { slug: 'mortgage-calculator', step: 'Then model the monthly payment.' },
      ],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.65,
    },
  },
  {
    id: 'investment-roi',
    slug: 'investment-roi-calculator',
    name: 'Investment ROI Calculator',
    shortDesc: 'Calculate return on investment for stocks, real estate, or any purchase.',
    tagline: 'Know your real return.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['investment roi', 'return on investment', 'roi calculator'],
    kind: 'config',
    config: {
      fields: [
        { id: 'cost', label: 'Investment Cost', type: 'number', defaultValue: 10000, prefix: '$', min: 0 },
        { id: 'gain', label: 'Final Value', type: 'number', defaultValue: 13500, prefix: '$', min: 0 }
      ],
      results: [
        { label: 'ROI', formulaCode: '(gain - cost) / cost * 100', suffix: '%', accent: true },
        { label: 'Net Profit', formulaCode: 'gain - cost', prefix: '$' }
      ],
      formulaDescription: 'ROI = (gain - cost) / cost x 100',
    },
    content: {
      intro: 'The Investment ROI Calculator measures how much profit you earn relative to the amount you invested. Whether you put money into stocks, a rental property, or a small business, ROI tells you the percentage gain or loss on your capital.',
      howItWorks: 'ROI equals the gain minus the cost, divided by the cost, times 100. This gives you a percentage representing how much your money grew.',
      example: 'You invest $10,000 and sell for $13,500. ROI = (13500 - 10000) / 10000 x 100 = 35%.',
      formulas: [{ label: 'ROI Formula', expression: 'ROI = (gain - cost) / cost x 100' }],
      resultExplanations: [
        { resultLabel: 'ROI', explanation: 'Your percentage return on the original investment.' },
        { resultLabel: 'Net Profit', explanation: 'The actual dollar amount you gained.' }
      ],
      workflowLinks: [
        { slug: 'cagr-calculator', step: 'Compare annualized returns over multiple years.' },
        { slug: 'compound-interest-calculator', step: 'Project future growth.' }
      ],
      faqs: [
        { q: 'Is ROI the same as annual return?', a: 'No. ROI measures total return over the entire period. Annual return breaks it down per year.' },
        { q: 'Can ROI be negative?', a: 'Yes. If you lose money, ROI is negative. A $10,000 investment dropping to $7,000 gives -30% ROI.' },
        { q: 'Does ROI account for inflation?', a: 'Basic ROI does not. For inflation-adjusted returns, use the real return calculator.' }
      ],
      related: ['cagr-calculator', 'compound-interest-calculator', 'inflation-adjusted-return'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'simple-interest-v2',
    slug: 'simple-interest-calculator-v2',
    name: 'Simple Interest Calculator',
    shortDesc: 'Calculate simple interest on loans, savings, and financial products.',
    tagline: 'Straightforward interest math.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['simple interest', 'simple interest calculator', 'interest formula'],
    kind: 'config',
    config: {
      fields: [
        { id: 'principal', label: 'Principal', type: 'number', defaultValue: 5000, prefix: '$', min: 0 },
        { id: 'rate', label: 'Annual Rate (%)', type: 'number', defaultValue: 6, suffix: '%', min: 0 },
        { id: 'years', label: 'Years', type: 'number', defaultValue: 3, min: 1 }
      ],
      results: [
        { label: 'Simple Interest', formulaCode: 'principal * rate * years / 100', prefix: '$', accent: true },
        { label: 'Total Amount', formulaCode: 'principal + principal * rate * years / 100', prefix: '$' }
      ],
      formulaDescription: 'I = P x R x T',
    },
    content: {
      intro: 'The Simple Interest Calculator computes interest that accrues only on the original principal. Unlike compound interest, simple interest does not add earned interest back to the principal, making it common for short-term loans and promissory notes.',
      howItWorks: 'Simple interest equals principal times rate times time in years, divided by 100. The formula is I = P x R x T.',
      example: 'You borrow $5,000 at 6% for 3 years. Interest = 5000 x 6 x 3 / 100 = $900. Total repayment = $5,900.',
      formulas: [{ label: 'Simple Interest', expression: 'I = P x R x T / 100' }],
      resultExplanations: [
        { resultLabel: 'Simple Interest', explanation: 'Total interest earned or paid over the full period.' },
        { resultLabel: 'Total Amount', explanation: 'Principal plus interest, the final amount.' }
      ],
      workflowLinks: [
        { slug: 'compound-interest-calculator', step: 'Compare with compound interest.' },
        { slug: 'loan-payment-calculator', step: 'Calculate total loan interest.' }
      ],
      faqs: [
        { q: 'What is the difference between simple and compound interest?', a: 'Simple interest is on the original principal only. Compound interest is on principal plus accumulated interest.' },
        { q: 'When is simple interest used?', a: 'Short-term loans, some car loans, promissory notes, and certain savings accounts.' },
        { q: 'How do I find the monthly rate?', a: 'Divide the annual rate by 12. A 6% annual rate equals 0.5% per month.' }
      ],
      related: ['compound-interest-calculator', 'loan-payment-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'compound-interest-fv',
    slug: 'compound-interest-future-value',
    name: 'Compound Interest Future Value',
    shortDesc: 'Find the future value of any investment with compound interest.',
    tagline: 'Watch your money multiply.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['future value', 'compound interest future value', 'fv calculator'],
    kind: 'config',
    config: {
      fields: [
        { id: 'pv', label: 'Present Value', type: 'number', defaultValue: 10000, prefix: '$', min: 0 },
        { id: 'rate', label: 'Annual Rate (%)', type: 'number', defaultValue: 8, suffix: '%', min: 0 },
        { id: 'years', label: 'Years', type: 'number', defaultValue: 10, min: 1 }
      ],
      results: [
        { label: 'Future Value', formulaCode: 'pv * Math.pow(1 + rate/100, years)', prefix: '$', accent: true },
        { label: 'Total Interest', formulaCode: 'pv * Math.pow(1 + rate/100, years) - pv', prefix: '$' }
      ],
      formulaDescription: 'FV = PV x (1 + r/n)^(nt)',
    },
    content: {
      intro: 'The Compound Interest Future Value Calculator shows how much your investment grows when interest compounds. Unlike simple interest, compound interest earns returns on both the original principal and all previously accumulated interest.',
      howItWorks: 'Future value equals present value multiplied by (1 + r/n) raised to the power of (n x t), where r is the annual rate, n is compounding frequency, and t is years.',
      example: '$10,000 at 8% compounded monthly for 10 years grows to $22,196. Simple interest would only give $18,000.',
      formulas: [{ label: 'Compound Interest', expression: 'FV = PV x (1 + r/n)^(nt)' }],
      resultExplanations: [
        { resultLabel: 'Future Value', explanation: 'What your investment will be worth at the end of the period.' },
        { resultLabel: 'Total Interest', explanation: 'The total earnings from compound growth.' }
      ],
      workflowLinks: [
        { slug: 'present-value-calculator', step: 'Calculate what future money is worth today.' },
        { slug: 'cagr-calculator', step: 'Find annualized growth rate.' }
      ],
      faqs: [
        { q: 'How does compounding frequency affect returns?', a: 'More frequent compounding produces slightly higher returns. Monthly compounding earns more than annual, which earns more than simple interest.' },
        { q: 'What is the rule of 72?', a: 'A shortcut to estimate doubling time: divide 72 by the interest rate. At 8%, money doubles in about 9 years.' },
        { q: 'Is compound interest always better?', a: 'For savings, yes. For loans, compound interest costs more than simple interest because you pay interest on interest.' }
      ],
      related: ['present-value-calculator', 'cagr-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'present-value',
    slug: 'present-value-calculator',
    name: 'Present Value Calculator',
    shortDesc: 'Determine what future money is worth in todays dollars.',
    tagline: 'Future money, todays value.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['present value', 'pv calculator', 'time value of money'],
    kind: 'config',
    config: {
      fields: [
        { id: 'fv', label: 'Future Value', type: 'number', defaultValue: 50000, prefix: '$', min: 0 },
        { id: 'rate', label: 'Discount Rate (%)', type: 'number', defaultValue: 5, suffix: '%', min: 0 },
        { id: 'years', label: 'Years', type: 'number', defaultValue: 5, min: 1 }
      ],
      results: [
        { label: 'Present Value', formulaCode: 'fv / Math.pow(1 + rate/100, years)', prefix: '$', accent: true }
      ],
      formulaDescription: 'PV = FV / (1 + r)^n',
    },
    content: {
      intro: 'The Present Value Calculator discounts a future amount back to what it is worth today. A dollar today is worth more than a dollar tomorrow because of inflation and the opportunity to invest it. This calculation is fundamental to bond pricing, retirement planning, and comparing financial options.',
      howItWorks: 'Present value equals the future amount divided by (1 + discount rate) raised to the number of years. A higher discount rate reduces the present value more.',
      example: '$50,000 received in 5 years at 5% discount rate is worth $39,176 today. At 10%, the same future amount is worth only $31,046.',
      formulas: [{ label: 'Present Value', expression: 'PV = FV / (1 + r)^n' }],
      resultExplanations: [
        { resultLabel: 'Present Value', explanation: 'What the future amount is worth in todays dollars.' }
      ],
      workflowLinks: [
        { slug: 'compound-interest-calculator', step: 'See how present value grows over time.' },
        { slug: 'retirement-calculator', step: 'Plan for future financial goals.' }
      ],
      faqs: [
        { q: 'Why is future money worth less today?', a: 'Because of inflation and opportunity cost. Money you receive later loses purchasing power and misses investment returns.' },
        { q: 'What discount rate should I use?', a: 'Common choices are your expected investment return (8-10%) or inflation rate (3-4%) depending on the context.' },
        { q: 'Is present value the same as net present value?', a: 'No. Net present value (NPV) subtracts the initial investment cost from the present value of future cash flows.' }
      ],
      related: ['compound-interest-calculator', 'inflation-adjusted-return', 'retirement-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'cagr',
    slug: 'cagr-calculator',
    name: 'CAGR Calculator',
    shortDesc: 'Calculate the Compound Annual Growth Rate of any investment.',
    tagline: 'Annual growth that is comparable.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['cagr', 'compound annual growth rate', 'cagr calculator'],
    kind: 'config',
    config: {
      fields: [
        { id: 'bv', label: 'Beginning Value', type: 'number', defaultValue: 10000, prefix: '$', min: 0 },
        { id: 'ev', label: 'Ending Value', type: 'number', defaultValue: 18000, prefix: '$', min: 0 },
        { id: 'years', label: 'Years', type: 'number', defaultValue: 5, min: 1 }
      ],
      results: [
        { label: 'CAGR', formulaCode: '(Math.pow(ev/bv, 1/years) - 1) * 100', suffix: '%', accent: true }
      ],
      formulaDescription: 'CAGR = (EV/BV)^(1/n) - 1',
    },
    content: {
      intro: 'The CAGR Calculator computes the Compound Annual Growth Rate, smoothing volatile returns into a single annual figure. Investors use CAGR to compare investments with different time horizons on equal footing.',
      howItWorks: 'CAGR equals the ending value divided by the beginning value, raised to the power of 1/years, minus 1.',
      example: 'An investment grows from $10,000 to $18,000 in 5 years. CAGR = (18000/10000)^(1/5) - 1 = 12.47%.',
      formulas: [{ label: 'CAGR', expression: 'CAGR = (EV/BV)^(1/n) - 1' }],
      resultExplanations: [
        { resultLabel: 'CAGR', explanation: 'The annualized rate of return over this period.' }
      ],
      workflowLinks: [
        { slug: 'investment-roi-calculator', step: 'Calculate total ROI.' },
        { slug: 'inflation-adjusted-return', step: 'Adjust for inflation.' }
      ],
      faqs: [
        { q: 'What is CAGR?', a: 'Compound Annual Growth Rate. It smooths returns into a single annual percentage for comparison.' },
        { q: 'Is CAGR the same as average return?', a: 'No. CAGR accounts for compounding. Average return does not.' },
        { q: 'Can CAGR be negative?', a: 'Yes. If your investment lost value, CAGR shows the annual rate of decline.' }
      ],
      related: ['investment-roi-calculator', 'inflation-adjusted-return'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'debt-to-income',
    slug: 'debt-to-income-calculator',
    name: 'Debt-to-Income Ratio Calculator',
    shortDesc: 'Calculate your DTI ratio for mortgage qualification.',
    tagline: 'Know your borrowing power.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['debt to income', 'dti calculator', 'dti ratio', 'mortgage qualification'],
    kind: 'config',
    config: {
      fields: [
        { id: 'income', label: 'Gross Monthly Income', type: 'number', defaultValue: 6000, prefix: '$', min: 0 },
        { id: 'debts', label: 'Total Monthly Debts', type: 'number', defaultValue: 1800, prefix: '$', min: 0 }
      ],
      results: [
        { label: 'DTI Ratio', formulaCode: '(debts / income) * 100', suffix: '%', accent: true }
      ],
      formulaDescription: 'DTI = (monthly debts / gross income) x 100',
    },
    content: {
      intro: 'The Debt-to-Income Ratio Calculator computes the percentage of gross monthly income that goes toward debt payments. Lenders use this ratio to determine mortgage eligibility, with most requiring a DTI below 43%.',
      howItWorks: 'DTI equals total monthly debt payments divided by gross monthly income, multiplied by 100. Include rent, car loans, student loans, and credit card minimums.',
      example: 'Gross monthly income $6,000, monthly debts $1,800. DTI = 1800/6000 x 100 = 30%. Below the 43% threshold.',
      formulas: [{ label: 'DTI Ratio', expression: 'DTI = (debts / income) x 100' }],
      resultExplanations: [
        { resultLabel: 'DTI Ratio', explanation: 'Below 36% is good, below 43% needed for most mortgages.' }
      ],
      workflowLinks: [
        { slug: 'mortgage-payment-calculator', step: 'Calculate your mortgage payment.' },
        { slug: 'loan-affordability-calculator', step: 'Find how much you can borrow.' }
      ],
      faqs: [
        { q: 'What is a good DTI ratio?', a: 'Below 36% is good. Below 43% is needed for most mortgages.' },
        { q: 'Does DTI include utilities?', a: 'No. DTI only counts debt payments, not utilities or insurance.' },
        { q: 'How do I lower my DTI?', a: 'Pay down debt, increase income, or avoid new debt before applying for a mortgage.' }
      ],
      related: ['mortgage-payment-calculator', 'loan-affordability-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'mortgage-payment',
    slug: 'mortgage-payment-calculator',
    name: 'Mortgage Payment Calculator',
    shortDesc: 'Calculate monthly mortgage payments with principal, interest, taxes, and insurance.',
    tagline: 'Know what your home really costs.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['mortgage payment', 'mortgage calculator', 'monthly payment', 'home loan'],
    kind: 'config',
    config: {
      fields: [
        { id: 'loan', label: 'Loan Amount', type: 'number', defaultValue: 300000, prefix: '$', min: 0 },
        { id: 'rate', label: 'Annual Interest Rate', type: 'number', defaultValue: 6.5, suffix: '%', min: 0 },
        { id: 'years', label: 'Loan Term (Years)', type: 'number', defaultValue: 30, min: 1 },
        { id: 'taxes', label: 'Monthly Property Taxes', type: 'number', defaultValue: 300, prefix: '$', min: 0 },
        { id: 'insurance', label: 'Monthly Insurance', type: 'number', defaultValue: 150, prefix: '$', min: 0 }
      ],
      results: [
        { label: 'Monthly P&I', formulaCode: 'loan * (rate/12/100 * Math.pow(1 + rate/12/100, years*12)) / (Math.pow(1 + rate/12/100, years*12) - 1)', prefix: '$', accent: true },
        { label: 'Total PITI', formulaCode: 'loan * (rate/12/100 * Math.pow(1 + rate/12/100, years*12)) / (Math.pow(1 + rate/12/100, years*12) - 1) + taxes + insurance', prefix: '$' }
      ],
      formulaDescription: 'M = P[r(1+r)^n] / [(1+r)^n - 1]',
    },
    content: {
      intro: 'The Mortgage Payment Calculator computes your total monthly housing payment including principal, interest, property taxes, and insurance (PITI). Understanding this number is essential before buying a home.',
      howItWorks: 'Monthly P&I equals the loan amount multiplied by a factor based on rate and term. Add property taxes divided by 12 and annual insurance divided by 12 for total PITI.',
      example: 'A $300,000 loan at 6.5% for 30 years has a $1,896 monthly P&I payment. Add $300 taxes and $150 insurance for total PITI of $2,346.',
      formulas: [{ label: 'Mortgage Payment', expression: 'M = P[r(1+r)^n] / [(1+r)^n - 1]' }],
      resultExplanations: [
        { resultLabel: 'Monthly P&I', explanation: 'Principal and interest only, the base mortgage payment.' },
        { resultLabel: 'Total PITI', explanation: 'Complete monthly housing cost including taxes and insurance.' }
      ],
      workflowLinks: [
        { slug: 'debt-to-income-calculator', step: 'Check if this payment fits your DTI.' },
        { slug: 'loan-affordability-calculator', step: 'See how much you can borrow.' }
      ],
      faqs: [
        { q: 'What is PITI?', a: 'Principal, Interest, Taxes, and Insurance. The four components of a total monthly mortgage payment.' },
        { q: 'Should I get a 15 or 30 year mortgage?', a: 'A 15-year saves massive interest but has higher payments. A 30-year has lower payments but costs more total interest.' },
        { q: 'Does this include PMI?', a: 'No. If your down payment is less than 20%, add private mortgage insurance (PMI), typically $100-200/month.' }
      ],
      related: ['debt-to-income-calculator', 'loan-affordability-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.95 },
  },
  {
    id: 'tip-calculator-v2',
    slug: 'tip-split-calculator',
    name: 'Tip & Bill Split Calculator',
    shortDesc: 'Calculate tip amounts and split bills evenly for dining out.',
    tagline: 'Fair tipping made simple.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['tip calculator', 'gratuity calculator', 'bill split', 'restaurant tip'],
    kind: 'config',
    config: {
      fields: [
        { id: 'bill', label: 'Bill Amount', type: 'number', defaultValue: 120, prefix: '$', min: 0 },
        { id: 'tipPct', label: 'Tip Percentage', type: 'number', defaultValue: 20, suffix: '%', min: 0 },
        { id: 'people', label: 'Number of People', type: 'number', defaultValue: 4, min: 1 }
      ],
      results: [
        { label: 'Tip Amount', formulaCode: 'bill * tipPct / 100', prefix: '$', accent: true },
        { label: 'Per Person', formulaCode: '(bill + bill * tipPct / 100) / people', prefix: '$' }
      ],
      formulaDescription: 'tip = bill x tip%',
    },
    content: {
      intro: 'The Tip and Bill Split Calculator computes gratuity and splits the total evenly when dining with friends. It handles the math so you know exactly what each person owes without awkward mental math at the table.',
      howItWorks: 'Enter the bill amount, select a tip percentage, and specify how many people are splitting. The calculator shows the tip amount, total bill, and per-person cost.',
      example: 'A $120 dinner with 20% tip split 4 ways: tip is $24, total is $144, each person pays $36.',
      formulas: [{ label: 'Tip', expression: 'tip = bill x tip%' }],
      resultExplanations: [
        { resultLabel: 'Tip Amount', explanation: 'The total gratuity added to the bill.' },
        { resultLabel: 'Per Person', explanation: 'What each person pays including their share of the tip.' }
      ],
      workflowLinks: [
        { slug: 'budget-calculator', step: 'Track your monthly dining spend.' },
        { slug: 'budget-calculator', step: 'Plan your overall budget.' }
      ],
      faqs: [
        { q: 'What is the standard tip in the US?', a: '15-20% for sit-down restaurants. 10-15% for takeout. $1-2 per drink at bars.' },
        { q: 'Should I tip on the pre-tax or post-tax bill?', a: 'Traditionally on the pre-tax amount. Many people tip on the total for simplicity.' },
        { q: 'How do I handle large group dining?', a: 'For groups of 8+, some restaurants add automatic gratuity. Check before calculating your own tip.' }
      ],
      related: ['budget-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'net-worth',
    slug: 'net-worth-calculator',
    name: 'Net Worth Calculator',
    shortDesc: 'Calculate your total net worth by adding assets and subtracting liabilities.',
    tagline: 'Your financial snapshot.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['net worth', 'net worth calculator', 'assets minus liabilities'],
    kind: 'config',
    config: {
      fields: [
        { id: 'assets', label: 'Total Assets ($)', type: 'number', defaultValue: 200000, prefix: '$', min: 0 },
        { id: 'liabilities', label: 'Total Liabilities ($)', type: 'number', defaultValue: 145000, prefix: '$', min: 0 }
      ],
      results: [
        { label: 'Net Worth', formulaCode: 'assets - liabilities', prefix: '$', accent: true }
      ],
      formulaDescription: 'Net Worth = Assets - Liabilities',
    },
    content: {
      intro: 'The Net Worth Calculator gives you a snapshot of your overall financial health by subtracting everything you owe from everything you own. Tracking net worth over time is the single best way to measure financial progress.',
      howItWorks: 'Add up all assets: cash, investments, retirement accounts, property value, vehicles. Then subtract all liabilities: mortgages, car loans, student loans, credit card debt. The result is your net worth.',
      example: 'Assets: $150,000 home, $40,000 retirement, $10,000 savings = $200,000. Liabilities: $120,000 mortgage, $25,000 student loans = $145,000. Net worth = $55,000.',
      formulas: [{ label: 'Net Worth', expression: 'Net Worth = Assets - Liabilities' }],
      resultExplanations: [
        { resultLabel: 'Net Worth', explanation: 'Your total wealth. A positive number means assets exceed debts.' }
      ],
      workflowLinks: [
        { slug: 'debt-to-income-calculator', step: 'Check your debt-to-income ratio.' },
        { slug: 'investment-roi-calculator', step: 'Track investment returns.' }
      ],
      faqs: [
        { q: 'Is a negative net worth bad?', a: 'Not necessarily. Many young adults have negative net worth due to student loans. The trend over time matters most.' },
        { q: 'How often should I calculate net worth?', a: 'Monthly or quarterly. Tracking the trend reveals whether your financial situation is improving.' },
        { q: 'Should I include my home in net worth?', a: 'Yes. Your home is an asset. Include its current market value, not the purchase price.' }
      ],
      related: ['debt-to-income-calculator', 'investment-roi-calculator', 'retirement-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'credit-card-payoff',
    slug: 'credit-card-payoff-calculator',
    name: 'Credit Card Payoff Calculator',
    shortDesc: 'Find out how long it takes to pay off credit card debt and how much interest you pay.',
    tagline: 'Escape credit card debt.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['credit card payoff', 'credit card calculator', 'debt payoff', 'minimum payment'],
    kind: 'config',
    config: {
      fields: [
        { id: 'balance', label: 'Credit Card Balance', type: 'number', defaultValue: 5000, prefix: '$', min: 0 },
        { id: 'apr', label: 'APR (%)', type: 'number', defaultValue: 19, suffix: '%', min: 0 },
        { id: 'payment', label: 'Monthly Payment', type: 'number', defaultValue: 200, prefix: '$', min: 1 }
      ],
      results: [
        { label: 'Months to Pay Off', formulaCode: '(function(){ var r = apr/12/100; if (balance <= 0) { return 0; } if (r === 0) { return Math.ceil(balance / payment); } var i = balance * r; if (payment <= i) { return NaN; } return Math.ceil(-Math.log(1 - i/payment) / Math.log(1 + r)); })()', suffix: ' months', accent: true },
        { label: 'Total Interest', formulaCode: '(function(){ var r = apr/12/100; if (balance <= 0) { return 0; } var m; if (r === 0) { m = Math.ceil(balance / payment); } else { var i = balance * r; if (payment <= i) { return NaN; } m = Math.ceil(-Math.log(1 - i/payment) / Math.log(1 + r)); } return m * payment - balance; })()', prefix: '$' }
      ],
      formulaDescription: 'Uses logarithmic formula to calculate months to payoff based on balance, rate, and payment.',
      tips: [
        'A payment at or below the monthly interest never reduces the balance - the result shows as not calculable.',
        'Check the monthly interest figure before choosing a payment.',
      ],
    },
    content: {
      intro: 'The Credit Card Payoff Calculator shows how long it takes to eliminate credit card debt and the total interest paid based on your balance, interest rate, and monthly payment amount. It reveals the true cost of carrying a balance.',
      howItWorks: 'Each month, your payment covers interest first, then reduces the principal. Higher payments dramatically reduce both the time and total interest. The calculator uses an amortization formula to model each payment.',
      example: 'A $5,000 balance at 19% APR with $200 monthly payments takes 33 months to pay off and costs $1,600 in interest. Paying $300/month reduces it to 20 months and $1,000 in interest.',
      formulas: [{ label: 'Payoff Time', expression: 'Months = -log(1 - (balance x monthlyRate) / payment) / log(1 + monthlyRate)' }],
      resultExplanations: [
        { resultLabel: 'Months to Pay Off', explanation: 'The number of months until your balance reaches zero.' },
        { resultLabel: 'Total Interest', explanation: 'The total cost of borrowing this money over the payoff period.' }
      ],
      workflowLinks: [
        { slug: 'debt-consolidation-calculator', step: 'Explore consolidation options.' },
        { slug: 'budget-calculator', step: 'Find room in your budget for higher payments.' }
      ],
      faqs: [
        { q: 'Why does minimum payment take so long?', a: 'Minimum payments are designed to maximize interest revenue for the bank. Most of your payment goes to interest, barely touching the principal.' },
        { q: 'What is the fastest way to pay off credit card debt?', a: 'Pay as much as possible each month. Even an extra $50/month can save hundreds in interest and months of payments.' },
        { q: 'Should I transfer to a 0% APR card?', a: 'If you qualify and can pay off the balance during the promo period, a balance transfer can save significant interest. Watch for transfer fees of 3-5%.' }
      ],
      related: ['debt-consolidation-calculator', 'budget-calculator', 'loan-payment-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.95 },
  },
  {
    id: 'loan-affordability',
    slug: 'loan-affordability-calculator',
    name: 'Loan Affordability Calculator',
    shortDesc: 'Find out how much you can afford to borrow based on your income.',
    tagline: 'Borrow within your means.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['loan affordability', 'how much can i borrow', 'loan calculator'],
    kind: 'config',
    config: {
      fields: [
        { id: 'income', label: 'Gross Monthly Income', type: 'number', defaultValue: 6000, prefix: '$', min: 0 },
        { id: 'existingDebt', label: 'Existing Monthly Debt', type: 'number', defaultValue: 1800, prefix: '$', min: 0 },
        { id: 'rate', label: 'Expected Interest Rate', type: 'number', defaultValue: 7, suffix: '%', min: 0 },
        { id: 'years', label: 'Loan Term (Years)', type: 'number', defaultValue: 5, min: 1 }
      ],
      results: [
        { label: 'Max Monthly Payment', formulaCode: 'income * 0.36 - existingDebt > 0 ? income * 0.36 - existingDebt : 0', prefix: '$', accent: true },
        { label: 'Max Loan Amount', formulaCode: '(function(){ var p = income * 0.36 - existingDebt; if(p <= 0) return 0; var r = rate/12/100; var n = years*12; return p * (Math.pow(1+r,n)-1)/(r*Math.pow(1+r,n)); })()', prefix: '$' }
      ],
      formulaDescription: 'Max Loan = payment x [(1+r)^n - 1] / [r(1+r)^n]',
    },
    content: {
      intro: 'The Loan Affordability Calculator estimates the maximum loan amount you can comfortably handle based on your income, existing debts, and desired monthly payment. It helps you set realistic borrowing limits before applying.',
      howItWorks: 'Based on your monthly payment capacity and interest rate, the calculator determines the maximum principal you can borrow. Most financial advisors recommend keeping total debt payments under 36% of gross income.',
      example: 'With $6,000 monthly income, $1,800 existing debt, and wanting to keep DTI at 36%, you can afford about $360/month for a new loan, giving you roughly $20,000 at 7% for 5 years.',
      formulas: [{ label: 'Loan Amount', expression: 'Max Loan = payment x [(1+r)^n - 1] / [r(1+r)^n]' }],
      resultExplanations: [
        { resultLabel: 'Max Monthly Payment', explanation: 'The most you should spend on a new loan each month, keeping DTI at 36%.' },
        { resultLabel: 'Max Loan Amount', explanation: 'The maximum you can borrow at the given rate and term.' }
      ],
      workflowLinks: [
        { slug: 'debt-to-income-calculator', step: 'Check your current DTI ratio.' },
        { slug: 'mortgage-payment-calculator', step: 'Calculate specific mortgage payments.' }
      ],
      faqs: [
        { q: 'What is the 36% rule?', a: 'Financial advisors recommend keeping total monthly debt payments below 36% of gross income for healthy finances.' },
        { q: 'Can I borrow more than this?', a: 'Some lenders allow DTI up to 43-50%, but stretching your budget increases financial risk.' },
        { q: 'Does this include all debt?', a: 'Yes, include rent, car loans, student loans, credit cards, and any other recurring debt obligations.' }
      ],
      related: ['debt-to-income-calculator', 'mortgage-payment-calculator', 'loan-payment-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'inflation-adjusted',
    slug: 'inflation-adjusted-return',
    name: 'Inflation-Adjusted Return Calculator',
    shortDesc: 'Calculate real investment returns after accounting for inflation.',
    tagline: 'True purchasing power.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['inflation adjusted return', 'real return', 'real interest rate', 'purchasing power'],
    kind: 'config',
    config: {
      fields: [
        { id: 'nominal', label: 'Nominal Return (%)', type: 'number', defaultValue: 8, suffix: '%', min: 0 },
        { id: 'inflation', label: 'Inflation Rate (%)', type: 'number', defaultValue: 3.5, suffix: '%', min: 0 }
      ],
      results: [
        { label: 'Real Return', formulaCode: '(nominal - inflation) / (1 + inflation / 100) * 100', suffix: '%', accent: true }
      ],
      formulaDescription: 'Real Return = (nominal - inflation) / (1 + inflation) x 100',
    },
    content: {
      intro: 'The Inflation-Adjusted Return Calculator converts nominal investment returns into real returns that account for inflation. A 7% return with 4% inflation means your purchasing power only grew by about 3%.',
      howItWorks: 'The real return equals the nominal return minus the inflation rate, divided by (1 + inflation rate), times 100. This Fisher equation adjustment gives you the true growth in purchasing power.',
      example: 'Your investment returned 8% nominal but inflation was 3.5%. Real return = (8 - 3.5) / (1 + 3.5/100) x 100 = 4.35%. Your purchasing power grew by 4.35%, not 8%.',
      formulas: [{ label: 'Real Return', expression: 'Real = (nominal - inflation) / (1 + inflation) x 100' }],
      resultExplanations: [
        { resultLabel: 'Real Return', explanation: 'Your actual increase in purchasing power after inflation is accounted for.' }
      ],
      workflowLinks: [
        { slug: 'compound-interest-calculator', step: 'Project growth with nominal rates.' },
        { slug: 'cagr-calculator', step: 'Compare annualized returns.' }
      ],
      faqs: [
        { q: 'Why does inflation matter for returns?', a: 'Inflation erodes purchasing power. A 5% return with 5% inflation means zero real growth.' },
        { q: 'What is a good real return?', a: 'Historically, the S&P 500 averages about 7% nominal, giving roughly 4-5% real return after inflation.' },
        { q: 'Can real returns be negative?', a: 'Yes. If inflation exceeds your nominal return, you are losing purchasing power even if the account balance grows.' }
      ],
      related: ['compound-interest-calculator', 'cagr-calculator', 'investment-roi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'debt-consolidation',
    slug: 'debt-consolidation-calculator',
    name: 'Debt Consolidation Calculator',
    shortDesc: 'Compare consolidation options and see how much you could save.',
    tagline: 'Simplify your debt payoff.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['debt consolidation', 'consolidation calculator', 'combine debt'],
    kind: 'config',
    config: {
      fields: [
        { id: 'totalDebt', label: 'Total Debt Amount', type: 'number', defaultValue: 12000, prefix: '$', min: 0 },
        { id: 'currentRate', label: 'Current Average APR', type: 'number', defaultValue: 18, suffix: '%', min: 0 },
        { id: 'currentPayment', label: 'Current Monthly Payment', type: 'number', defaultValue: 500, prefix: '$', min: 1 },
        { id: 'newRate', label: 'Consolidation APR', type: 'number', defaultValue: 9, suffix: '%', min: 0 },
        { id: 'newPayment', label: 'Proposed Monthly Payment', type: 'number', defaultValue: 400, prefix: '$', min: 1 }
      ],
      results: [
        { label: 'Current Total Interest', formulaCode: '(function(){ var m = 0; var bal = totalDebt; var r = currentRate/12/100; while(bal > 0 && m < 600) { var int = bal * r; bal = bal + int - currentPayment; m++; } return m * currentPayment - totalDebt; })()', prefix: '$', accent: true },
        { label: 'New Total Interest', formulaCode: '(function(){ var m = 0; var bal = totalDebt; var r = newRate/12/100; while(bal > 0 && m < 600) { var int = bal * r; bal = bal + int - newPayment; m++; } return m * newPayment - totalDebt; })()', prefix: '$' }
      ],
      formulaDescription: 'Compares total interest under current debts versus a consolidated loan.',
    },
    content: {
      intro: 'The Debt Consolidation Calculator compares your current debt payments with a consolidated loan to show potential savings in interest and payoff time. It helps you decide if combining multiple debts into one payment makes financial sense.',
      howItWorks: 'Enter each debt with its balance, interest rate, and monthly payment. Then enter the proposed consolidation loan terms. The calculator compares total interest paid under both scenarios.',
      example: 'Three credit cards totaling $12,000 at rates of 18%, 22%, and 15% with combined payments of $500/month cost $3,200 in interest. A consolidation loan at 9% for 36 months costs $1,720 in interest, saving $1,480.',
      formulas: [{ label: 'Savings', expression: 'Savings = Current Interest - Consolidation Interest' }],
      resultExplanations: [
        { resultLabel: 'Current Total Interest', explanation: 'How much interest you pay keeping your current debt structure.' },
        { resultLabel: 'New Total Interest', explanation: 'Interest paid under the consolidation loan.' }
      ],
      workflowLinks: [
        { slug: 'credit-card-payoff-calculator', step: 'See individual card payoff times.' },
        { slug: 'budget-calculator', step: 'Find room for higher payments.' }
      ],
      faqs: [
        { q: 'Should I consolidate my debt?', a: 'If the new rate is lower and you can pay it off faster, consolidation saves money. Watch for origination fees.' },
        { q: 'Does consolidation hurt my credit?', a: 'Initially it may lower your score slightly, but consistent on-time payments on the new loan help your score over time.' },
        { q: 'What debts can I consolidate?', a: 'Credit cards, personal loans, medical bills, and some student loans. Secured debts like mortgages are typically not consolidated.' }
      ],
      related: ['credit-card-payoff-calculator', 'budget-calculator', 'loan-payment-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'retirement',
    slug: 'retirement-calculator',
    name: 'Retirement Savings Calculator',
    shortDesc: 'Estimate if your current savings will be enough for retirement.',
    tagline: 'Plan your future self.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['retirement calculator', 'retirement savings', 'how much to retire', 'retirement planning'],
    kind: 'config',
    config: {
      fields: [
        { id: 'currentSavings', label: 'Current Savings', type: 'number', defaultValue: 50000, prefix: '$', min: 0 },
        { id: 'monthly', label: 'Monthly Contribution', type: 'number', defaultValue: 500, prefix: '$', min: 0 },
        { id: 'returnRate', label: 'Expected Annual Return', type: 'number', defaultValue: 7, suffix: '%', min: 0 },
        { id: 'yearsToRetire', label: 'Years Until Retirement', type: 'number', defaultValue: 25, min: 1 }
      ],
      results: [
        { label: 'Projected Nest Egg', formulaCode: '(function(){ var r = returnRate/12/100; var n = yearsToRetire * 12; return currentSavings * Math.pow(1+r, n) + monthly * (Math.pow(1+r, n) - 1) / r; })()', prefix: '$', accent: true },
        { label: 'Annual Retirement Income', formulaCode: '(function(){ var r = returnRate/12/100; var n = yearsToRetire * 12; var fv = currentSavings * Math.pow(1+r, n) + monthly * (Math.pow(1+r, n) - 1) / r; return fv * 0.04; })()', prefix: '$' }
      ],
      formulaDescription: 'FV = PV(1+r)^n + PMT x [(1+r)^n - 1] / r',
    },
    content: {
      intro: 'The Retirement Savings Calculator projects whether your current savings and contributions will fund your desired retirement lifestyle. It accounts for inflation, investment returns, and Social Security to give a realistic picture.',
      howItWorks: 'The calculator projects your savings growth based on current balance, monthly contributions, expected return, and years until retirement. It compares the projected nest egg against your retirement income needs.',
      example: 'You have $50,000 saved, contribute $500/month, expect 7% returns, and plan to retire in 25 years. You will have about $536,000. With 4% withdrawal rate, that provides $21,440/year from savings plus Social Security.',
      formulas: [{ label: 'Future Value', expression: 'FV = PV(1+r)^n + PMT x [(1+r)^n - 1] / r' }],
      resultExplanations: [
        { resultLabel: 'Projected Nest Egg', explanation: 'Your estimated retirement savings at the time you retire.' },
        { resultLabel: 'Annual Retirement Income', explanation: 'Using the 4% safe withdrawal rule, this is your annual income from savings.' }
      ],
      workflowLinks: [
        { slug: 'compound-interest-calculator', step: 'Model investment growth.' },
        { slug: 'inflation-adjusted-return', step: 'Adjust for purchasing power.' }
      ],
      faqs: [
        { q: 'How much do I need to retire?', a: 'A common target is 25x your annual expenses. If you spend $50,000/year, aim for $1.25 million in savings.' },
        { q: 'What is the 4% rule?', a: 'The rule says you can safely withdraw 4% of your portfolio annually in retirement without running out of money over 30 years.' },
        { q: 'Should I include Social Security?', a: 'Yes, but do not rely on it fully. Treat it as supplemental income, not your primary retirement funding source.' }
      ],
      related: ['compound-interest-calculator', 'inflation-adjusted-return', 'net-worth-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.95 },
  },
  {
    id: 'budget-50-30-20',
    slug: 'budget-calculator',
    name: '50/30/20 Budget Calculator',
    shortDesc: 'Divide your income into needs, wants, and savings using the 50/30/20 rule.',
    tagline: 'Budget without the headache.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['budget calculator', '50 30 20 rule', 'budgeting', 'personal finance'],
    kind: 'config',
    config: {
      fields: [
        { id: 'income', label: 'Monthly After-Tax Income', type: 'number', defaultValue: 4500, prefix: '$', min: 0 }
      ],
      results: [
        { label: 'Needs (50%)', formulaCode: 'income * 0.5', prefix: '$', accent: true },
        { label: 'Wants (30%)', formulaCode: 'income * 0.3', prefix: '$' },
        { label: 'Savings (20%)', formulaCode: 'income * 0.2', prefix: '$' }
      ],
      formulaDescription: 'Divides after-tax income into 50% needs, 30% wants, 20% savings.',
    },
    content: {
      intro: 'The 50/30/20 Budget Calculator splits your after-tax income into three buckets: 50% for needs like rent and groceries, 30% for wants like dining and entertainment, and 20% for savings and debt payoff. It is the simplest budgeting framework for getting your finances organized.',
      howItWorks: 'Take your monthly after-tax income and multiply by 50%, 30%, and 20% to get dollar amounts for each category. Needs include housing, food, utilities, insurance, and minimum debt payments. Wants include everything else that is not essential.',
      example: 'After-tax income of $4,500 per month: $2,250 for needs (housing, food, utilities), $1,350 for wants (dining, hobbies, travel), and $900 for savings and extra debt payments.',
      formulas: [{ label: 'Budget Split', expression: 'Needs = 50%, Wants = 30%, Savings = 20%' }],
      resultExplanations: [
        { resultLabel: 'Needs (50%)', explanation: 'Essential expenses: rent, groceries, utilities, insurance, minimum debt payments.' },
        { resultLabel: 'Wants (30%)', explanation: 'Non-essentials: dining out, hobbies, subscriptions, entertainment.' },
        { resultLabel: 'Savings (20%)', explanation: 'Emergency fund, retirement contributions, extra debt payoff, investments.' }
      ],
      workflowLinks: [
        { slug: 'net-worth-calculator', step: 'Track your overall financial health.' },
        { slug: 'credit-card-payoff-calculator', step: 'Use savings to pay down debt faster.' }
      ],
      faqs: [
        { q: 'What if my needs exceed 50%?', a: 'In high cost-of-living areas, needs may take 60%+. Adjust the ratio but try to save at least 10-15%.' },
        { q: 'Should I count minimum payments as needs?', a: 'Yes. Minimum debt payments are obligations and belong in the needs category. Extra payments come from the savings bucket.' },
        { q: 'How do I track my spending?', a: 'Use a spreadsheet, bank app, or budgeting app to categorize transactions. Review weekly until habits form.' }
      ],
      related: ['net-worth-calculator', 'credit-card-payoff-calculator', 'retirement-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'emergency-fund-target',
    slug: 'emergency-fund-target-calculator',
    name: 'Emergency Fund Target Calculator',
    shortDesc: 'Calculate how much you need in your emergency fund.',
    tagline: 'Financial safety net.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['emergency fund', 'emergency fund calculator', 'safety net', 'savings goal'],
    kind: 'config',
    config: {
      fields: [
        { id: 'expenses', label: 'Monthly Essential Expenses', type: 'number', defaultValue: 3500, prefix: '$', min: 0 },
        { id: 'months', label: 'Recommended Months', type: 'number', defaultValue: 6, suffix: ' months', min: 3 }
      ],
      results: [
        { label: 'Emergency Fund Target', formulaCode: 'expenses * months', prefix: '$', accent: true }
      ],
      formulaDescription: 'Target = Monthly Expenses x Recommended Months',
    },
    content: {
      intro: 'The Emergency Fund Calculator tells you exactly how much to save based on your monthly expenses and risk factors. Most experts recommend 3-6 months of expenses, but your ideal amount depends on job stability and obligations.',
      howItWorks: 'Multiply your essential monthly expenses by the recommended number of months. Factors like job stability, income sources, and dependents affect whether you need 3 months or 12 months of coverage.',
      example: 'Monthly essentials total $3,500. With a stable job and no dependents, 6 months = $21,000 emergency fund. If self-employed, aim for 9-12 months ($31,500-$42,000).',
      formulas: [{ label: 'Emergency Fund', expression: 'Target = Monthly Expenses x Months' }],
      resultExplanations: [
        { resultLabel: 'Emergency Fund Target', explanation: 'The amount you should aim to save for unexpected expenses or job loss.' }
      ],
      workflowLinks: [
        { slug: 'net-worth-calculator', step: 'See how emergency fund affects net worth.' },
        { slug: 'budget-calculator', step: 'Find room to save more.' }
      ],
      faqs: [
        { q: 'How many months of expenses do I need?', a: '3-6 months for most people. Self-employed or single-income families should aim for 9-12 months.' },
        { q: 'Where should I keep my emergency fund?', a: 'In a high-yield savings account that is easily accessible. Do not invest it in stocks or lock it in CDs.' },
        { q: 'When should I use my emergency fund?', a: 'For true emergencies: job loss, medical bills, critical home or car repairs. Not for vacations or discretionary purchases.' }
      ],
      related: ['net-worth-calculator', 'budget-calculator', 'savings-goal-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'savings-goal',
    slug: 'savings-goal-calculator',
    name: 'Savings Goal Calculator',
    shortDesc: 'Find out how much to save monthly to reach your financial goal.',
    tagline: 'Hit your target on time.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['savings goal', 'savings calculator', 'how much to save', 'savings plan'],
    kind: 'config',
    config: {
      fields: [
        { id: 'goal', label: 'Savings Goal', type: 'number', defaultValue: 10000, prefix: '$', min: 0 },
        { id: 'months', label: 'Months Until Goal', type: 'number', defaultValue: 18, min: 1 },
        { id: 'rate', label: 'Savings APY', type: 'number', defaultValue: 4.5, suffix: '%', min: 0 }
      ],
      results: [
        { label: 'Monthly Savings Needed', formulaCode: '(function(){ var r = rate/12/100; if(r === 0) return goal/months; return goal * r / (Math.pow(1+r, months) - 1); })()', prefix: '$', accent: true },
        { label: 'Total Deposited', formulaCode: '(function(){ var r = rate/12/100; var p = r === 0 ? goal/months : goal * r / (Math.pow(1+r, months) - 1); return p * months; })()', prefix: '$' }
      ],
      formulaDescription: 'Payment = Goal / [(1+r)^n - 1] / r',
    },
    content: {
      intro: 'The Savings Goal Calculator tells you exactly how much to set aside each month to reach a specific financial target by your deadline. Whether saving for a vacation, down payment, or emergency fund, it gives you a concrete monthly number.',
      howItWorks: 'Divide the goal amount by the number of months to get a baseline. Then the calculator adjusts for any interest earned in a high-yield savings account, giving you the exact monthly deposit needed.',
      example: 'You need $10,000 for a down payment in 18 months. At 4.5% APY in a savings account, you need to save $530 per month instead of $556 without interest.',
      formulas: [{ label: 'Monthly Savings', expression: 'Payment = Goal / [(1+r)^n - 1] / r' }],
      resultExplanations: [
        { resultLabel: 'Monthly Savings Needed', explanation: 'The exact amount to deposit each month to reach your goal on time.' },
        { resultLabel: 'Total Deposited', explanation: 'The total you will put in over the saving period. Interest earned is the difference from your goal.' }
      ],
      workflowLinks: [
        { slug: 'emergency-fund-calculator', step: 'Set an emergency fund target.' },
        { slug: 'budget-calculator', step: 'Find room in your budget for savings.' }
      ],
      faqs: [
        { q: 'What interest rate should I assume?', a: 'Use current high-yield savings rates, typically 4-5% APY. Check your bank for the current rate.' },
        { q: 'Should I save or invest for short-term goals?', a: 'For goals under 3 years, keep savings in a high-yield account. For longer goals, investing may earn more but with risk.' },
        { q: 'What if I cannot save enough monthly?', a: 'Extend your timeline, reduce the goal amount, or find ways to increase income temporarily.' }
      ],
      related: ['emergency-fund-calculator', 'budget-calculator', 'retirement-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'salary-hourly',
    slug: 'salary-to-hourly-calculator',
    name: 'Salary to Hourly Calculator',
    shortDesc: 'Convert your annual salary to an hourly, daily, weekly, or monthly rate.',
    tagline: 'Know your real hourly worth.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: ['salary to hourly', 'annual salary to hourly', 'pay calculator', 'hourly rate'],
    kind: 'config',
    config: {
      fields: [
        { id: 'salary', label: 'Annual Salary', type: 'number', defaultValue: 75000, prefix: '$', min: 0 }
      ],
      results: [
        { label: 'Hourly Rate', formulaCode: 'salary / 2080', prefix: '$', accent: true },
        { label: 'Daily Rate', formulaCode: 'salary / 2080 * 8', prefix: '$' },
        { label: 'Weekly Pay', formulaCode: 'salary / 52', prefix: '$' },
        { label: 'Monthly Pay', formulaCode: 'salary / 12', prefix: '$' }
      ],
      formulaDescription: 'Hourly = Salary / 2,080',
    },
    content: {
      intro: 'The Salary to Hourly Calculator converts your annual salary into hourly, daily, weekly, and monthly pay rates. Useful for comparing job offers, negotiating freelance rates, or understanding what your time is actually worth per hour.',
      howItWorks: 'Divide the annual salary by 2,080 (40 hours x 52 weeks) for hourly rate. Then derive daily (x8), weekly (x40), and monthly (x40/52 x weeks) from the hourly figure. Assumes a standard 40-hour work week.',
      example: 'A $75,000 annual salary equals $36.06/hour, $288.46/day, $1,442.31/week, and $6,250/month before taxes.',
      formulas: [{ label: 'Hourly Rate', expression: 'Hourly = Salary / 2,080' }],
      resultExplanations: [
        { resultLabel: 'Hourly Rate', explanation: 'Your effective hourly wage assuming a 40-hour work week and 52 weeks per year.' },
        { resultLabel: 'Daily Rate', explanation: 'Based on an 8-hour work day.' },
        { resultLabel: 'Weekly Pay', explanation: 'Gross pay per week before deductions.' },
        { resultLabel: 'Monthly Pay', explanation: 'Gross monthly income before taxes and deductions.' }
      ],
      workflowLinks: [
        { slug: 'tip-calculator', step: 'Calculate tips based on your hourly rate.' },
        { slug: 'budget-calculator', step: 'Build a budget from your salary.' }
      ],
      faqs: [
        { q: 'Why 2,080 hours?', a: '40 hours per week x 52 weeks = 2,080. This is the standard full-time work year used for salary conversions.' },
        { q: 'Does this include overtime?', a: 'No. This calculates based on standard hours. If you work overtime, your effective hourly rate is higher.' },
        { q: 'How do I compare salary vs hourly jobs?', a: 'Convert the salary to hourly using this calculator, then compare. Also consider benefits, stability, and flexibility differences.' }
      ],
      related: ['budget-calculator', 'net-worth-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  }
];
