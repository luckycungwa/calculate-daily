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
        { label: 'Monthly Payment', formulaCode: '(amount * ((annualRate / 100 / 12) * Math.pow(1 + annualRate / 100 / 12, years * 12))) / (Math.pow(1 + annualRate / 100 / 12, years * 12) - 1)', prefix: '$', accent: true },
        { label: 'Total Paid Over Term', formulaCode: '((amount * ((annualRate / 100 / 12) * Math.pow(1 + annualRate / 100 / 12, years * 12))) / (Math.pow(1 + annualRate / 100 / 12, years * 12) - 1)) * years * 12', prefix: '$' },
        { label: 'Total Interest', formulaCode: '(((amount * ((annualRate / 100 / 12) * Math.pow(1 + annualRate / 100 / 12, years * 12))) / (Math.pow(1 + annualRate / 100 / 12, years * 12) - 1)) * years * 12) - amount', prefix: '$' },
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
];