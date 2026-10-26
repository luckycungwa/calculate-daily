import { CalculatorMeta } from '../../types';

export const FINANCE_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'compound',
    slug: 'compound-interest-calculator',
    name: 'Compound Interest & SIP Calculator',
    shortDesc: 'Project fixed-rate compound growth with monthly contributions, including SIP-style scenarios.',
    tagline: 'See the exponential power of compounding your money.',
    category: 'finance',
    iconName: 'TrendingUp',
    badge: 'Wealth',
    featured: true,
    keywords: ['compound interest calculator', 'SIP calculator', 'systematic investment plan projection', 'monthly investment projection', 'savings growth', 'future value'],
    kind: 'custom',
    componentId: 'CompoundInterestCalculator',
    content: {
      intro:
        'The Compound Interest & SIP Calculator projects a fixed-rate scenario with an initial deposit and regular month-end contributions. Use it to explore contribution schedules; it does not predict mutual-fund performance or guarantee a return.',
      howItWorks:
        'Future value is computed with the compound growth formula FV = P x (1 + r/n)^(nt) for the principal, plus an annuity term for monthly contributions. The tool subtracts total deposits from the final balance to isolate interest earned.',
      example:
        'Start with R5,000, add R250 at the end of each month, and assume an 8% nominal annual rate compounded monthly for 10 years. The estimate is about R56,835, including roughly R21,835 in growth before tax, fees, and inflation.',
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
        { q: 'How often is interest compounded?', a: 'The estimate uses a nominal annual rate divided into monthly periods, with deposits assumed at the end of each month. Actual account and investment terms may differ.' },
        { q: 'Is this a guaranteed investment return?', a: 'No. The rate is an assumption for a mathematical projection. Investment returns vary and can be negative; savings rates and account terms can also change.' },
        { q: 'Does this account for inflation, taxes, or fees?', a: 'No. The result is a nominal estimate and excludes taxes, fees, inflation, and any changes to the rate or contribution amount.' },
        { q: 'Can I use this for a SIP estimate?', a: 'You can model a fixed monthly contribution at an assumed constant rate. Actual SIP investments can have variable or negative returns, and fund expenses, taxes, and timing are not modeled.' },
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
    name: 'Home Loan EMI & Mortgage Calculator',
    shortDesc: 'Estimate a home loan EMI or mortgage payment, total interest, taxes, insurance, and amortization.',
    tagline: 'Smart monthly mortgage costs with full interest analysis.',
    category: 'finance',
    iconName: 'Home',
    badge: 'Finance',
    featured: true,
    keywords: ['mortgage calculator', 'home loan calculator', 'home loan EMI calculator', 'house loan EMI', 'monthly mortgage payment', 'amortization', 'interest rate'],
    kind: 'custom',
    componentId: 'MortgageCalculator',
    content: {
      intro:
        'Estimate a fixed-rate home loan EMI or mortgage payment, add monthly property tax and insurance, and compare total interest. A built-in amortization schedule shows how the balance changes over time.',
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
    name: 'Loan Prepayment & Amortization Calculator',
    shortDesc: 'See how extra monthly payments change a fixed-rate loan payoff schedule and total interest.',
    tagline: 'The complete anatomy of your loan, month by month.',
    category: 'finance',
    iconName: 'Table',
    badge: 'Home',
    featured: true,
    keywords: ['amortization schedule', 'home loan prepayment calculator', 'mortgage prepayment calculator', 'extra payment calculator', 'loan payoff schedule'],
    kind: 'custom',
    componentId: 'AmortizationScheduleCalculator',
    content: {
      intro:
        'View each month of a fixed-rate loan and model an extra payment made every month. Compare payoff time and total interest under the entered schedule; lender rules for how prepayments are applied can differ.',
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
    name: 'Loan EMI & Monthly Payment Calculator',
    shortDesc: 'Estimate an EMI or monthly installment and total interest for a fixed-rate loan.',
    tagline: 'Know your monthly payment before you borrow.',
    category: 'finance',
    iconName: 'Landmark',
    keywords: ['loan payment calculator', 'loan EMI calculator', 'EMI calculator', 'monthly payment calculator', 'personal loan EMI', 'fixed-rate installment'],
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
        'The Loan EMI and Monthly Payment Calculator estimates a fixed-rate installment and total interest from the amount borrowed, annual percentage rate, and term. Compare scenarios; lender-specific fees and repayment rules are not included unless entered in the principal.',
      howItWorks:
        'It applies the amortization formula M = P x r x (1+r)^n / ((1+r)^n - 1) with the monthly rate and total payment count. Total interest is the difference between all payments and the amount borrowed.',
      example:
        'Borrow R20,000 at 7% annual interest for 5 years with monthly payments. The estimated installment is about R396; the exact result depends on the entered amount, rate, and term.',
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
    id: 'car-loan',
    slug: 'car-loan-calculator',
    name: 'Car Loan EMI Calculator',
    shortDesc: 'Estimate a vehicle-loan installment from the price, down payment, trade-in equity, APR, and term.',
    tagline: 'See the estimated payment and interest before comparing vehicle financing.',
    category: 'finance',
    iconName: 'CarFront',
    badge: 'Finance',
    keywords: ['car loan calculator', 'car loan EMI calculator', 'auto loan calculator', 'vehicle loan payment', 'car finance calculator'],
    kind: 'custom',
    componentId: 'CarLoanCalculator',
    content: {
      intro: 'Estimate a fixed-rate vehicle-loan payment using the purchase price, taxes and fees, down payment, trade-in equity, APR, and term. This is a comparison estimate, not a lender quote or approval.',
      howItWorks: 'The amount financed is vehicle price plus entered taxes and fees, minus the down payment and net trade-in equity. A negative trade-in equity value increases the amount financed. The monthly payment uses the standard fixed-payment amortization formula; a 0% rate divides the amount financed evenly across the selected months.',
      example: 'A $30,000 vehicle with $1,800 in taxes and fees and a $3,000 down payment leaves $28,800 to finance before trade-in equity. At 6.5% APR for 60 months, the estimated payment is about $563 per month.',
      formulas: [
        { label: 'Amount Financed', expression: 'Vehicle price + entered taxes and fees − down payment − net trade-in equity' },
        { label: 'Monthly Payment', expression: 'M = P × r / (1 − (1 + r)^−n)', note: 'P = amount financed, r = APR / 12, n = number of monthly payments. At 0% APR, M = P / n.' },
        { label: 'Estimated Interest', expression: '(Monthly payment × number of payments) − amount financed' },
      ],
      resultExplanations: [
        { resultLabel: 'Estimated Monthly Payment', explanation: 'The fixed monthly principal-and-interest installment under the entered APR and term.' },
        { resultLabel: 'Amount Financed', explanation: 'Vehicle price and entered fees after subtracting the down payment and net trade-in equity.' },
        { resultLabel: 'Estimated Interest', explanation: 'Total scheduled payments minus the amount financed; excludes charges not entered into the estimate.' },
      ],
      workflowLinks: [
        { slug: 'loan-payment-calculator', step: 'Compare the vehicle estimate with a generic fixed-rate loan.' },
        { slug: 'amortization-schedule-calculator', step: 'Review how principal and interest change over the payment schedule.' },
      ],
      faqs: [
        { q: 'What does the car loan EMI estimate include?', a: 'It uses the vehicle price, taxes and fees you enter, down payment, net trade-in equity, APR, and term. Insurance, optional products, and lender-specific charges are not added unless included in your inputs.' },
        { q: 'How do I enter negative trade-in equity?', a: 'Enter a negative amount when the payoff on the traded vehicle is greater than its value. That difference increases the new amount financed.' },
        { q: 'Is APR the same as the lender quote?', a: 'The calculator applies the APR you provide as a monthly fixed rate. Lender disclosures, compounding conventions, fees, and eligibility can change a real offer; verify the final terms with the lender.' },
        { q: 'Can I use this for any country?', a: 'The arithmetic is general, but taxes, fees, loan conventions, and currency differ by location. Enter local amounts and confirm the lender’s calculation method.' },
      ],
      related: ['loan-payment-calculator', 'amortization-schedule-calculator', 'mortgage-calculator'],
    },
    seo: {
      status: 'noindex',
      reviewStatus: 'pending',
      priority: 0.75,
    },
  },
  {
    id: 'personal-loan',
    slug: 'personal-loan-emi-calculator',
    name: 'Personal Loan EMI Calculator',
    shortDesc: 'Estimate net cash after an origination fee, monthly installments, and total borrowing cost.',
    tagline: 'Compare what you receive with what you repay.',
    category: 'finance',
    iconName: 'Landmark',
    badge: 'Finance',
    keywords: ['personal loan EMI calculator', 'personal loan calculator', 'personal loan interest calculator', 'loan amount after origination fee'],
    kind: 'custom',
    componentId: 'PersonalLoanCalculator',
    content: {
      intro: 'Estimate a fixed-rate personal-loan installment and compare the amount borrowed with cash received after the entered origination fee. This is a mathematical comparison, not an offer, approval, or recommendation to borrow.',
      howItWorks: 'The estimate subtracts the percentage origination fee from the amount borrowed to show net proceeds. Monthly installments use a standard fixed-payment amortization formula. Total cost is all scheduled payments minus net cash received, so it includes both estimated interest and the entered origination fee.',
      example: 'For a $10,000 loan with a 5% origination fee at 0% APR over 20 months, the fee is $500, net proceeds are $9,500, and the monthly installment is $500. The example excludes any other lender charges.',
      formulas: [
        { label: 'Net Cash Received', expression: 'Loan amount × (1 − origination fee rate)' },
        { label: 'Monthly Payment', expression: 'M = P × r / (1 − (1 + r)^−n)', note: 'At 0% APR, M = P / n.' },
        { label: 'Total Cost Above Proceeds', expression: '(Monthly payment × number of payments) − net cash received' },
      ],
      resultExplanations: [
        { resultLabel: 'Estimated Cash Received', explanation: 'Loan amount minus the percentage origination fee entered here.' },
        { resultLabel: 'Total Cost Above Cash Received', explanation: 'Scheduled payments less net proceeds; includes the modeled interest and origination fee but not other charges.' },
      ],
      workflowLinks: [
        { slug: 'loan-payment-calculator', step: 'Compare against the installment with no origination fee modeled.' },
        { slug: 'amortization-schedule-calculator', step: 'Explore how an extra monthly payment changes payoff timing.' },
      ],
      faqs: [
        { q: 'What is a personal loan EMI?', a: 'It is a fixed monthly installment estimate for the entered amount, APR, and term. Actual lender calculations may include additional charges or different terms.' },
        { q: 'How does an origination fee affect the estimate?', a: 'This tool treats the fee as withheld from the loan proceeds. It reduces estimated cash received but does not reduce the amount scheduled for repayment.' },
        { q: 'Does the total cost include every lender charge?', a: 'No. It includes the modeled interest and entered origination fee only. Check the lender disclosure for all charges and the legally disclosed APR.' },
        { q: 'Is this a loan recommendation or approval?', a: 'No. It is an arithmetic estimate using your inputs and does not assess eligibility, affordability, or whether borrowing is suitable.' },
      ],
      related: ['loan-payment-calculator', 'amortization-schedule-calculator', 'debt-to-income-calculator'],
    },
    seo: {
      status: 'noindex',
      reviewStatus: 'pending',
      priority: 0.7,
    },
  },
  {
    id: 'gold-loan',
    slug: 'gold-loan-emi-calculator',
    name: 'Gold Loan Eligibility & EMI Calculator',
    shortDesc: 'Estimate purity-adjusted gold value and a scenario loan amount from an entered LTV.',
    tagline: 'Explore the assumptions behind a collateral-backed loan estimate.',
    category: 'finance',
    iconName: 'Landmark',
    badge: 'Finance',
    keywords: ['gold loan calculator', 'gold loan EMI calculator', 'gold loan eligibility estimate', 'gold collateral loan'],
    kind: 'custom',
    componentId: 'GoldLoanCalculator',
    content: {
      intro: 'Estimate a gold-backed loan scenario from the net gold weight, purity, a price per gram you supply, a loan-to-value percentage, APR, and term. The estimate is not an appraisal, lender eligibility decision, or market quote.',
      howItWorks: 'Fine-gold equivalent is net gold weight multiplied by carat purity divided by 24. The entered price per gram estimates collateral value; the selected loan-to-value percentage applies a hypothetical cap. A fixed-rate monthly payment estimate is then calculated from the hypothetical loan amount.',
      example: 'If 20 grams of net gold is entered at 22 carat, the fine-gold equivalent is about 18.33 grams. At an entered price of $80 per gram, the estimated value is about $1,466.67; a user-entered 75% LTV gives a scenario loan amount of about $1,100.',
      formulas: [
        { label: 'Fine-Gold Equivalent', expression: 'Net gold weight × purity in carats / 24' },
        { label: 'Estimated Collateral Value', expression: 'Fine-gold equivalent × user-entered gold price per gram' },
        { label: 'Scenario Loan Amount', expression: 'Estimated collateral value × user-entered loan-to-value percentage' },
        { label: 'Monthly Payment', expression: 'M = P × r / (1 − (1 + r)^−n)', note: 'At 0% APR, M = P / n; lender repayment methods may differ.' },
      ],
      resultExplanations: [
        { resultLabel: 'Fine-Gold Equivalent', explanation: 'Purity-adjusted weight based only on the carat value entered; it is not a jewelry assay.' },
        { resultLabel: 'Estimated Maximum Loan', explanation: 'A scenario amount from the entered gold price and LTV; lender valuation rules and caps may produce a different result.' },
      ],
      workflowLinks: [
        { slug: 'loan-payment-calculator', step: 'Compare a standard fixed-rate loan payment with this scenario.' },
        { slug: 'amortization-schedule-calculator', step: 'Review the schedule using a loan amount from the scenario.' },
      ],
      faqs: [
        { q: 'Does this use a live gold price?', a: 'No. Enter a price per gram yourself. The calculator does not fetch a market quote or guarantee that a lender will use that price.' },
        { q: 'Does the estimate confirm loan eligibility?', a: 'No. It does not appraise jewelry or check lender rules, identity, documentation, location, or eligibility. Only a lender can assess an application.' },
        { q: 'Why does purity affect the estimate?', a: 'The simple model scales net weight by carat purity relative to 24 carat. Lenders may test purity differently and exclude stones, fittings, or other material.' },
        { q: 'Are LTV limits and repayment methods universal?', a: 'No. Lender policies, fees, rates, local rules, and repayment structures vary. Use the LTV and APR only as scenario assumptions and confirm current terms with a regulated lender.' },
      ],
      related: ['loan-payment-calculator', 'personal-loan-emi-calculator', 'amortization-schedule-calculator'],
    },
    seo: {
      status: 'noindex',
      reviewStatus: 'pending',
      priority: 0.65,
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
        { slug: 'mortgage-calculator', step: 'Calculate your mortgage payment.' },
        { slug: 'loan-affordability-calculator', step: 'Find how much you can borrow.' }
      ],
      faqs: [
        { q: 'What is a good DTI ratio?', a: 'Below 36% is good. Below 43% is needed for most mortgages.' },
        { q: 'Does DTI include utilities?', a: 'No. DTI only counts debt payments, not utilities or insurance.' },
        { q: 'How do I lower my DTI?', a: 'Pay down debt, increase income, or avoid new debt before applying for a mortgage.' }
      ],
      related: ['mortgage-calculator', 'loan-affordability-calculator'],
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
        { slug: 'mortgage-calculator', step: 'Calculate specific mortgage payments.' }
      ],
      faqs: [
        { q: 'What is the 36% rule?', a: 'Financial advisors recommend keeping total monthly debt payments below 36% of gross income for healthy finances.' },
        { q: 'Can I borrow more than this?', a: 'Some lenders allow DTI up to 43-50%, but stretching your budget increases financial risk.' },
        { q: 'Does this include all debt?', a: 'Yes, include rent, car loans, student loans, credit cards, and any other recurring debt obligations.' }
      ],
      related: ['debt-to-income-calculator', 'mortgage-calculator', 'loan-payment-calculator'],
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
    id: 'break-even',
    slug: 'break-even-calculator',
    name: 'Break-Even Calculator',
    shortDesc: 'Find the unit sales and revenue needed to cover fixed and variable costs.',
    tagline: 'Know the sales target that covers your costs.',
    category: 'finance',
    iconName: 'TrendingUp',
    keywords: ['break even calculator', 'break-even point', 'break even analysis', 'break even units', 'contribution margin'],
    kind: 'custom',
    componentId: 'BreakEvenCalculator',
    content: {
      intro: 'The Break-Even Calculator estimates how many units you need to sell before revenue covers fixed and variable costs. It also shows the contribution margin and how far current unit sales are above or below the target.',
      howItWorks: 'Contribution per unit is selling price minus variable cost per unit. Divide fixed costs by that contribution, then round up to a whole unit. Break-even revenue uses the rounded whole-unit target.',
      example: 'With 10,000 in fixed costs, a 25 selling price, and 15 variable cost per unit, each sale contributes 10. You need 1,000 units and 25,000 in revenue to break even.',
      formulas: [
        { label: 'Contribution per Unit', expression: 'Selling price − Variable cost per unit' },
        { label: 'Break-Even Units', expression: 'Ceiling(Fixed costs / Contribution per unit)' },
        { label: 'Break-Even Revenue', expression: 'Break-even units × Selling price' },
      ],
      resultExplanations: [
        { resultLabel: 'Break-Even Units', explanation: 'The minimum whole number of units that covers fixed costs at the entered contribution per unit.' },
        { resultLabel: 'Margin of Safety', explanation: 'Entered units sold minus the break-even unit target. A negative value means sales are below break-even.' },
      ],
      workflowLinks: [
        { slug: 'markup-margin-calculator', step: 'Compare contribution margin with markup and gross margin.' },
        { slug: 'investment-roi-calculator', step: 'Evaluate return after reaching a sales target.' },
      ],
      faqs: [
        { q: 'What is the break-even point?', a: 'It is the sales level where total revenue equals total costs, so the modeled profit is zero before taxes and financing.' },
        { q: 'Why are units rounded up?', a: 'A fraction of a product usually cannot be sold, so the target rounds up to the next whole unit to ensure costs are covered.' },
        { q: 'What if my variable cost equals the selling price?', a: 'There is no contribution left to pay fixed costs. The calculator reports that break-even cannot be reached under those inputs.' },
        { q: 'Does this include taxes or discounts?', a: 'No. This basic estimate assumes a constant selling price and costs and does not model tax, discounts, or capacity constraints.' },
      ],
      related: ['markup-margin-calculator', 'investment-roi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75 },
  },
  {
    id: 'price-per-unit',
    slug: 'price-per-unit-calculator',
    name: 'Price per Unit Calculator',
    shortDesc: 'Compare package sizes by normalized price per weight, volume, or item.',
    tagline: 'Find the better value across different package sizes.',
    category: 'daily',
    iconName: 'Receipt',
    keywords: ['price per unit calculator', 'unit price calculator', 'cost per unit', 'price per 100g', 'compare package sizes'],
    kind: 'custom',
    componentId: 'PricePerUnitCalculator',
    content: {
      intro: 'The Price per Unit Calculator compares up to three product packages using the same normalized unit price. Enter package prices, quantities, and compatible units to see which option costs less for the same amount.',
      howItWorks: 'Each quantity is converted to a common base unit within its unit family, then the package price is divided by that base quantity. Weight is displayed per 100 grams, volume per 100 millilitres, and counts per item.',
      example: 'A 500 g package priced at 4.00 costs 0.80 per 100 g. A 750 g package at 5.25 costs 0.70 per 100 g, so the larger package is cheaper per 100 g.',
      formulas: [
        { label: 'Normalized Unit Price', expression: 'Package price / package quantity in the common base unit' },
        { label: 'Price per 100 g or ml', expression: 'Price per base unit × 100' },
      ],
      resultExplanations: [
        { resultLabel: 'Normalized Unit Price', explanation: 'The package cost expressed in a common unit, making different sizes easier to compare.' },
        { resultLabel: 'Best Value', explanation: 'The product with the lowest normalized cost among the packages entered.' },
      ],
      workflowLinks: [
        { slug: 'discount-sales-tax-calculator', step: 'Account for a discount and sales tax before comparing checkout prices.' },
        { slug: 'meal-cost-calculator', step: 'Estimate the cost per serving for a recipe.' },
      ],
      faqs: [
        { q: 'How do I compare different package sizes?', a: 'Divide each package price by its quantity after converting quantities to the same unit, then compare the normalized results.' },
        { q: 'Can I compare grams with ounces?', a: 'Yes. Both are weight units and are converted to grams before comparison. The result is displayed per 100 g.' },
        { q: 'Can I compare litres with kilograms?', a: 'Not with this tool. Weight and volume are different dimensions; comparing them requires a product-specific density.' },
        { q: 'Does the result include promotions?', a: 'Enter the effective package price after any promotion. Multi-buy deals and coupons are not modeled automatically.' },
      ],
      related: ['discount-sales-tax-calculator', 'meal-cost-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
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
  },
  {
    id: 'debt-payoff',
    slug: 'debt-payoff-calculator',
    name: 'Debt Payoff Strategy Calculator',
    shortDesc: 'Compare debt snowball and debt avalanche strategies to map your debt-free timeline.',
    tagline: 'Model payoff schedules with custom extra monthly payments.',
    category: 'finance',
    iconName: 'CreditCard',
    badge: 'Popular',
    keywords: ['debt payoff calculator', 'debt snowball calculator', 'debt avalanche calculator', 'pay off debt', 'debt free plan', 'credit card payoff strategy'],
    kind: 'custom',
    componentId: 'DebtPayoffCalculator',
    content: {
      intro: 'The Debt Payoff Strategy Calculator simulates monthly repayments across up to eight debts using the debt avalanche (highest APR first) or debt snowball (lowest balance first) method. Add an extra monthly payment to see how much faster you become debt-free and how much interest you save.',
      howItWorks: 'Each month, interest accrues based on annual percentage rate divided by twelve. Minimum payments are applied across every debt first. Any remaining monthly budget is concentrated entirely on the primary target debt until it reaches a zero balance, after which that freed payment rolls into the next target debt.',
      example: 'With three debts totaling $25,000 and an extra $100 monthly budget, the avalanche strategy prioritizes the 24% APR card, clearing all debt faster and saving hundreds in interest compared to paying minimums alone.',
      formulas: [
        { label: 'Monthly Interest', expression: 'Interest = Current Balance × (APR / 1200)' },
        { label: 'Avalanche Priority', expression: 'Sort active debts by descending APR' },
        { label: 'Snowball Priority', expression: 'Sort active debts by ascending balance' },
      ],
      resultExplanations: [
        { resultLabel: 'Debt-free after', explanation: 'The projected calendar months or years required to eliminate all entered debt balances.' },
        { resultLabel: 'Estimated total interest', explanation: 'The cumulative financing interest accrued across all debts until the final payment is made.' },
        { resultLabel: 'Payoff order', explanation: 'The chronological sequence in which each debt account is fully paid off under the active strategy.' },
      ],
      workflowLinks: [
        { slug: 'credit-card-payoff-calculator', step: 'Model detailed minimum-payment percentage rules for a single card.' },
        { slug: 'emergency-fund-calculator', step: 'Build a safety buffer so unexpected expenses do not disrupt your payoff plan.' },
      ],
      faqs: [
        { q: 'What is the difference between debt snowball and debt avalanche?', a: 'Debt avalanche targets the highest-interest debt first to minimize total interest paid. Debt snowball pays off the smallest balance first to build quick psychological momentum.' },
        { q: 'Which debt payoff strategy saves more money?', a: 'Mathematically, the debt avalanche method always results in equal or lower total interest paid because it eliminates high-interest charges faster.' },
        { q: 'What happens if my payment does not cover monthly interest?', a: 'If minimum payments fall below monthly interest accrual, balances grow indefinitely. The calculator requires amortizing payments that pay off every debt.' },
        { q: 'Can I add extra monthly payments?', a: 'Yes. Entering an extra monthly payment applies those surplus funds directly to the target debt once all minimums are satisfied.' },
      ],
      related: ['credit-card-payoff-calculator', 'loan-payment-calculator', 'emergency-fund-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'rental-yield',
    slug: 'rental-yield-calculator',
    name: 'Rental Yield Calculator',
    shortDesc: 'Calculate gross and net rental yield, monthly cash flow, and net operating income for investment property.',
    tagline: 'Assess real estate returns with vacancy and operating expense modeling.',
    category: 'finance',
    iconName: 'Landmark',
    keywords: ['rental yield calculator', 'gross rental yield', 'net rental yield', 'property investment return', 'buy to let calculator', 'noi calculator'],
    kind: 'custom',
    componentId: 'RentalYieldCalculator',
    content: {
      intro: 'The Rental Yield Calculator measures property investment performance by comparing annual rental income against purchase price and operating costs. It computes gross rental yield, vacancy-adjusted net rental yield, annual net operating income (NOI), and pre-financing cash flow.',
      howItWorks: 'Gross yield divides scheduled annual rent by purchase price. Net operating income subtracts vacancy allowance and annual operating expenses (taxes, insurance, maintenance, management). Net yield then divides net operating income by total capital invested (purchase price plus closing costs).',
      example: 'A $300,000 property with $10,000 closing costs renting for $2,500/month with $6,000 in annual expenses and 5% vacancy generates a 10.00% gross yield and a 7.26% net yield.',
      formulas: [
        { label: 'Gross Yield', expression: 'Gross Yield = (Annual Scheduled Rent / Purchase Price) × 100' },
        { label: 'Net Operating Income (NOI)', expression: 'NOI = (Annual Rent × (1 − Vacancy% / 100)) − Annual Expenses' },
        { label: 'Net Yield', expression: 'Net Yield = (NOI / (Purchase Price + Closing Costs)) × 100' },
      ],
      resultExplanations: [
        { resultLabel: 'Gross Yield', explanation: 'Annual scheduled rental income expressed as a percentage of the property purchase price before expenses.' },
        { resultLabel: 'Net Yield', explanation: 'Annual net operating income divided by total capital invested including closing costs.' },
        { resultLabel: 'Annual Net Operating Income', explanation: 'Actual annual cash earnings after accounting for tenant vacancies and operating expenses.' },
      ],
      workflowLinks: [
        { slug: 'mortgage-calculator', step: 'Estimate monthly mortgage payments to calculate post-financing cash flow.' },
        { slug: 'investment-roi-calculator', step: 'Compare rental property yield against stock index or bond returns.' },
      ],
      faqs: [
        { q: 'What is a good rental yield?', a: 'Typically, gross yields between 5% and 8% are considered reasonable in urban residential markets, while higher-yield properties (8%+) often carry greater vacancy or maintenance risks.' },
        { q: 'Why is net yield more accurate than gross yield?', a: 'Gross yield ignores property taxes, insurance, repairs, property management fees, and vacancy gaps. Net yield reflects actual money left in your pocket relative to total cash invested.' },
        { q: 'Does this calculator include mortgage financing?', a: 'The tool calculates Net Operating Income and unleveraged property yield. To calculate cash-on-cash return with debt, subtract your annual mortgage payment from NOI.' },
      ],
      related: ['mortgage-calculator', 'rent-vs-buy-calculator', 'investment-roi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'commission',
    slug: 'commission-calculator',
    name: 'Sales Commission Calculator',
    shortDesc: 'Calculate total sales commission and split payouts between brokers, agents, or team members.',
    tagline: 'Determine gross commission and split shares from total transaction volume.',
    category: 'finance',
    iconName: 'Receipt',
    keywords: ['commission calculator', 'sales commission calculator', 'real estate commission calculator', 'commission split calculator', 'agent commission'],
    kind: 'custom',
    componentId: 'CommissionCalculator',
    content: {
      intro: 'The Sales Commission Calculator determines total commission earned on a sale and splits the payout according to agreement percentages. Ideal for real estate agents, brokers, sales representatives, and agency teams dividing earnings.',
      howItWorks: 'Multiply transaction volume by the agreed commission rate to determine the gross commission pool. Then apply the recipient share percentage to calculate individual payout and remaining agency retention.',
      example: 'On a $500,000 home sale at a 6% commission rate, the total commission pool is $30,000. With a 50/50 broker-agent split, the agent receives $15,000 and the brokerage retains $15,000.',
      formulas: [
        { label: 'Total Commission', expression: 'Total Commission = Sale Amount × (Commission % / 100)' },
        { label: 'Recipient Commission', expression: 'Recipient Share = Total Commission × (Recipient Share % / 100)' },
        { label: 'Remaining Commission', expression: 'Remaining Share = Total Commission − Recipient Share' },
      ],
      resultExplanations: [
        { resultLabel: 'Total Commission', explanation: 'The gross commission generated by the transaction before any internal splits or fees.' },
        { resultLabel: 'Recipient Commission', explanation: 'The net commission allocated to the designated agent, broker, or partner.' },
        { resultLabel: 'Remaining Commission', explanation: 'The balance retained by the brokerage, firm, or co-broker.' },
      ],
      workflowLinks: [
        { slug: 'percentage-calculator', step: 'Calculate custom percentage markups, discounts, or progressive tiered splits.' },
        { slug: 'break-even-calculator', step: 'Determine transaction sales volume needed to cover business overhead.' },
      ],
      faqs: [
        { q: 'How do tiered commission splits work?', a: 'Many brokerages increase the agent share percentage (e.g. from 60% to 80%) after reaching an annual sales threshold or company dollar cap.' },
        { q: 'Does commission calculate before or after sales tax?', a: 'Real estate and professional sales commissions are typically calculated on gross transaction value before statutory taxes, unless contract terms specify otherwise.' },
        { q: 'Can I use this for non-real estate sales?', a: 'Yes. The calculation applies universally to wholesale, software, automotive, retail, and consulting commissions.' },
      ],
      related: ['markup-margin-calculator', 'percentage-calculator', 'break-even-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75 },
  },
  {
    id: 'take-home-pay',
    slug: 'take-home-pay-calculator',
    name: 'Take-Home Pay Calculator',
    shortDesc: 'Turn a gross salary into monthly and annual take-home pay after tax, retirement, and deductions.',
    tagline: 'What actually lands in your account each month.',
    category: 'finance',
    iconName: 'Wallet',
    badge: 'Salary',
    featured: true,
    keywords: [
      'take home pay calculator',
      'net pay calculator',
      'salary after tax',
      'monthly take home pay',
      'paycheck calculator',
      'gross to net salary',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'grossAnnual', label: 'Gross annual salary', type: 'number', defaultValue: 600000, min: 0, step: 1000 },
        { id: 'taxRate', label: 'Effective income tax rate', type: 'number', defaultValue: 25, min: 0, max: 70, step: 0.1, suffix: '%' },
        { id: 'retirementPct', label: 'Retirement contribution', type: 'number', defaultValue: 8, min: 0, max: 50, step: 0.5, suffix: '% of gross' },
        { id: 'otherMonthly', label: 'Other monthly deductions', type: 'number', defaultValue: 0, min: 0, step: 10, suffix: 'per month' },
      ],
      results: [
        {
          label: 'Monthly take-home pay',
          formulaCode:
            '(grossAnnual * (1 - retirementPct / 100) * (1 - taxRate / 100)) / 12 - otherMonthly',
          accent: true,
        },
        {
          label: 'Annual take-home pay',
          formulaCode:
            'grossAnnual * (1 - retirementPct / 100) * (1 - taxRate / 100) - otherMonthly * 12',
        },
        {
          label: 'Estimated income tax',
          formulaCode: 'grossAnnual * (1 - retirementPct / 100) * (taxRate / 100)',
        },
        {
          label: 'Total deductions for the year',
          formulaCode:
            'grossAnnual - (grossAnnual * (1 - retirementPct / 100) * (1 - taxRate / 100) - otherMonthly * 12)',
        },
      ],
      formulaDescription:
        'Net = Gross × (1 − retirement %) × (1 − effective tax %) − other deductions',
      tips: [
        'Use your effective (average) tax rate, not your marginal bracket, or the estimate will be far too low.',
        'Retirement contributions are treated as pre-tax. If yours are paid from already-taxed income, lower the retirement field and add it to other deductions instead.',
        'Medical aid, union fees, and garnishees are not tax; enter them as other monthly deductions.',
      ],
    },
    content: {
      intro:
        'The Take-Home Pay Calculator converts a gross annual salary into the monthly and annual amount you actually keep, after income tax, retirement contributions, and recurring deductions. It is deliberately rate-agnostic: you supply the effective tax rate that applies to you, so the answer stays correct wherever you live and whenever tax bands change.',
      howItWorks:
        'Pre-tax retirement contributions are removed from gross salary first. The effective tax rate is then applied to what remains, because that rate already blends every bracket you pass through. Recurring deductions such as medical cover or garnishees are subtracted monthly. What is left is net pay — the figure that reaches your bank account.',
      example:
        'On a gross salary of 600,000 with 8% going to retirement, 25% effective tax, and no other deductions, taxable pay is 552,000. Tax comes to 138,000, leaving 414,000 a year, or 34,500 a month. Adding a 500 monthly deduction drops take-home to 34,000.',
      formulas: [
        {
          label: 'Net annual pay',
          expression: 'Net = Gross × (1 − retirement %) × (1 − effective tax %) − (other deductions × 12)',
        },
        {
          label: 'Monthly take-home',
          expression: 'Monthly net = Net annual / 12',
        },
        {
          label: 'Effective vs marginal rate',
          expression: 'Effective rate = total tax / gross income',
          note: 'The effective rate is always at or below your top marginal bracket.',
        },
      ],
      sources: [
        {
          label: 'OECD Taxing Wages',
          expression: 'Average tax wedge and net personal average tax rate',
          note: 'The OECD publishes the methodology for comparing gross pay with net take-home pay across countries.',
        },
        {
          label: 'IRS Publication 15-T — Federal Income Tax Withholding Methods',
          expression: 'Withholding is an estimate, not a final liability',
          note: 'Payroll withholding uses bracket tables, which is why an effective-rate estimate can differ slightly from a payslip.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Monthly take-home pay',
          explanation:
            'The recurring amount you can budget with after tax, retirement, and other deductions. Bonuses, overtime, and one-off payments are not included unless you build them into gross salary.',
        },
        {
          resultLabel: 'Total deductions for the year',
          explanation:
            'Everything removed between gross salary and net pay: income tax, retirement contributions, and recurring deductions. It is not the same as your tax bill.',
        },
      ],
      workflowLinks: [
        { slug: 'income-tax-calculator', step: 'Check the tax component on its own.' },
        { slug: 'budget-calculator', step: 'Build a monthly budget around the net figure.' },
        { slug: 'salary-to-hourly-calculator', step: 'Convert the net annual amount into an hourly equivalent.' },
      ],
      faqs: [
        {
          q: 'Should I use my marginal or effective tax rate?',
          a: 'Use the effective rate: total income tax divided by gross income. The marginal rate only applies to your last unit of income, so applying it to the whole salary overstates tax dramatically.',
        },
        {
          q: 'Are retirement contributions deducted before tax?',
          a: 'Usually yes for employer-sponsored retirement plans, which is why they reduce taxable income. Some countries and some plans use after-tax contributions instead, in which case lower the retirement field and add the amount to other deductions.',
        },
        {
          q: 'Why is my payslip slightly different?',
          a: 'Payroll systems apply bracket tables, proration, and year-to-date adjustments, while this calculator uses a flat effective rate. Small differences are normal; large ones usually mean the effective rate or a deduction is wrong.',
        },
        {
          q: 'Does this include bonuses or a 13th cheque?',
          a: 'No. Add expected bonuses to gross salary to see their effect, but remember they are often taxed at a higher marginal rate, so the estimate will be slightly optimistic on that portion.',
        },
      ],
      related: ['income-tax-calculator', 'budget-calculator', 'salary-to-hourly-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'vat',
    slug: 'vat-calculator',
    name: 'VAT Calculator',
    shortDesc: 'Add VAT to a net price or remove VAT from a gross price at any rate, with the tax split shown.',
    tagline: 'Net, VAT, and gross — in either direction.',
    category: 'finance',
    iconName: 'Receipt',
    badge: 'Tax',
    featured: true,
    keywords: [
      'vat calculator',
      'add vat calculator',
      'remove vat calculator',
      'vat inclusive calculator',
      'vat exclusive calculator',
      'reverse vat calculator',
    ],
    kind: 'custom',
    componentId: 'VatCalculator',
    content: {
      intro:
        'The VAT Calculator moves a price between net and gross at any value-added tax rate. Choose whether you are adding VAT to a net figure or extracting it from a gross one, and it returns the net amount, the tax itself, and the gross total.',
      howItWorks:
        'Adding VAT multiplies the net price by one plus the rate. Removing VAT is not the same as subtracting the rate — you divide the gross price by one plus the rate, because the tax was calculated on the smaller net figure. The tax is then the difference between gross and net. The calculator also shows VAT as a share of the gross price, which is always lower than the headline rate.',
      example:
        'At 15% VAT, a net price of 1,000 becomes 1,150 gross, with 150 of VAT. Working backwards from 1,150 gives a net of 1,000. Note that VAT is 13.04% of the gross price, not 15% — subtracting 15% from 1,150 would wrongly give 977.50.',
      formulas: [
        {
          label: 'Adding VAT',
          expression: 'Gross = Net × (1 + rate); VAT = Net × rate',
        },
        {
          label: 'Removing VAT',
          expression: 'Net = Gross / (1 + rate); VAT = Gross − Net',
        },
        {
          label: 'VAT fraction of a gross price',
          expression: 'Share = rate / (100 + rate)',
          note: 'At 15% the VAT fraction is 13.04%; at 20% it is 16.67%.',
        },
      ],
      sources: [
        {
          label: 'EU VAT Directive 2006/112/EC',
          expression: 'Standard rate must be at least 15%',
          note: 'The Directive sets the EU floor and the framework for reduced rates; national rates still vary.',
        },
        {
          label: 'SARS — Value-Added Tax',
          expression: 'Standard rate 15% in South Africa',
          note: 'Rates change with legislation, which is why this calculator asks you to enter the rate rather than assuming one.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Gross total',
          explanation:
            'The VAT-inclusive price the customer pays. When removing VAT, this is the number you entered.',
        },
        {
          resultLabel: 'VAT as share of gross',
          explanation:
            'The tax expressed as a percentage of the gross price. It is lower than the headline rate because the rate applies to the net amount.',
        },
      ],
      workflowLinks: [
        { slug: 'discount-sales-tax-calculator', step: 'Apply a discount and sales tax in one pass.' },
        { slug: 'markup-margin-calculator', step: 'Set a selling price with a target margin.' },
        { slug: 'percentage-calculator', step: 'Work with the tax as a plain percentage.' },
      ],
      faqs: [
        {
          q: 'How do I remove VAT from a gross amount?',
          a: 'Divide the gross amount by one plus the rate. At 15%, divide by 1.15. Do not subtract 15% from the gross price — that removes too much and understates the net.',
        },
        {
          q: 'What is the difference between VAT inclusive and exclusive?',
          a: 'VAT exclusive is the net price before tax. VAT inclusive is what the customer pays, with the tax already inside it. Business-to-business quotes are often exclusive; retail prices are usually inclusive.',
        },
        {
          q: 'Why is VAT only 13.04% of a 15% gross price?',
          a: 'Because the 15% is charged on the net amount, which is smaller than the gross. The tax divided by the gross is 15/115, or 13.04%. This is the VAT fraction used to extract tax from a gross total.',
        },
        {
          q: 'Can I use this for GST or sales tax?',
          a: 'Yes for any single-rate tax added at the point of sale, including GST and most sales taxes. It does not handle compound taxes, exemptions, or multiple rates on one invoice.',
        },
      ],
      related: ['discount-sales-tax-calculator', 'markup-margin-calculator', 'percentage-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'income-tax',
    slug: 'income-tax-calculator',
    name: 'Income Tax Calculator',
    shortDesc: 'Estimate income tax, after-tax income, and a balance due or refund from taxable income and your effective rate.',
    tagline: 'See what tax costs before the brackets surprise you.',
    category: 'finance',
    iconName: 'Landmark',
    badge: 'Tax',
    featured: true,
    keywords: [
      'income tax calculator',
      'tax owed calculator',
      'effective tax rate calculator',
      'after tax income',
      'income tax estimate',
      'tax refund calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'taxableIncome', label: 'Taxable income', type: 'number', defaultValue: 500000, min: 0, step: 1000 },
        { id: 'effectiveRate', label: 'Effective tax rate', type: 'number', defaultValue: 22, min: 0, max: 70, step: 0.1, suffix: '%' },
        { id: 'withheld', label: 'Tax already withheld', type: 'number', defaultValue: 0, min: 0, step: 100 },
      ],
      results: [
        {
          label: 'Estimated tax owed',
          formulaCode: 'taxableIncome * effectiveRate / 100',
          accent: true,
        },
        {
          label: 'After-tax income',
          formulaCode: 'taxableIncome * (1 - effectiveRate / 100)',
        },
        {
          label: 'Monthly after-tax income',
          formulaCode: '(taxableIncome * (1 - effectiveRate / 100)) / 12',
        },
        {
          label: 'Balance due (negative = refund)',
          formulaCode: 'taxableIncome * effectiveRate / 100 - withheld',
        },
      ],
      formulaDescription: 'Tax = Taxable income × effective rate; After-tax = Income − Tax',
      tips: [
        'Effective rate is total tax divided by taxable income. Your top marginal bracket is always higher.',
        'Taxable income is after deductions and exemptions, not gross salary.',
        'A negative balance means too much was withheld and a refund is likely.',
      ],
    },
    content: {
      intro:
        'The Income Tax Calculator estimates the tax due on a taxable income at any effective rate, then shows after-tax income and whether withholding leaves a balance due or a refund. Because you enter the rate, the tool does not depend on a jurisdiction-specific bracket table that can fall out of date.',
      howItWorks:
        'Tax is taxable income multiplied by the effective rate. The effective rate is your total tax divided by total taxable income, so it already accounts for progressive brackets, credits, and rebates. Subtracting tax from income gives after-tax income. Comparing tax owed with tax already withheld shows the balance to settle or refund at filing.',
      example:
        'With taxable income of 500,000 and an effective rate of 22%, tax is 110,000, leaving 390,000 after tax or 32,500 a month. If 100,000 was withheld during the year, 10,000 is still due. With 120,000 withheld, the same income produces a 10,000 refund.',
      formulas: [
        {
          label: 'Tax owed',
          expression: 'Tax = Taxable income × effective rate',
        },
        {
          label: 'After-tax income',
          expression: 'After tax = Taxable income − Tax',
        },
        {
          label: 'Balance at filing',
          expression: 'Balance = Tax owed − Tax withheld',
          note: 'Negative values are refunds.',
        },
      ],
      sources: [
        {
          label: 'IRS — Tax Withholding Estimator methodology',
          expression: 'Withholding compared with actual liability',
          note: 'The difference between payments and liability determines the refund or balance due.',
        },
        {
          label: 'OECD — Effective tax rates on personal income',
          expression: 'Average vs marginal tax rates',
          note: 'The OECD explains why an effective rate is lower than the top marginal bracket.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Estimated tax owed',
          explanation:
            'An estimate based on the rate you supplied. It is not a filed return; deductions, credits, and surtaxes can all move the final figure.',
        },
        {
          resultLabel: 'Balance due',
          explanation:
            'Tax owed minus tax already withheld. A positive number is payable at filing; a negative number means a refund is likely.',
        },
      ],
      workflowLinks: [
        { slug: 'take-home-pay-calculator', step: 'Turn the after-tax total into monthly net pay.' },
        { slug: 'capital-gains-tax-calculator', step: 'Add tax on investment gains.' },
        { slug: 'budget-calculator', step: 'Build a budget from after-tax income.' },
      ],
      faqs: [
        {
          q: 'What is the difference between effective and marginal tax rate?',
          a: 'The marginal rate applies to your next unit of income. The effective rate is the average across everything you earned. In a progressive system the effective rate is always lower than the marginal rate.',
        },
        {
          q: 'Is taxable income the same as my salary?',
          a: 'No. Taxable income is salary plus other income, minus allowed deductions, exemptions, and contributions. Using gross salary with an effective rate will overstate tax in most systems.',
        },
        {
          q: 'Why does the calculator ask me for a rate?',
          a: 'Because tax bands, rebates, and surtaxes change with legislation and vary by country, filing status, and year. Hard-coding one country\u2019s table would make the tool silently wrong for everyone else and stale after the next budget.',
        },
        {
          q: 'Can this tell me my exact refund?',
          a: 'No. It estimates the gap between tax owed and tax withheld. A real refund also depends on credits, other income, penalties, and how the return is assessed.',
        },
      ],
      related: ['take-home-pay-calculator', 'capital-gains-tax-calculator', 'budget-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'inflation',
    slug: 'inflation-calculator',
    name: 'Inflation Calculator',
    shortDesc: 'See what an amount will cost in the future and what today\u2019s money will be worth after inflation.',
    tagline: 'What inflation does to prices and purchasing power.',
    category: 'finance',
    iconName: 'TrendingUp',
    badge: 'Economics',
    featured: true,
    keywords: [
      'inflation calculator',
      'future value of money',
      'purchasing power calculator',
      'inflation rate calculator',
      'cost of living calculator',
      'money value over time',
    ],
    kind: 'custom',
    componentId: 'InflationCalculator',
    content: {
      intro:
        'The Inflation Calculator projects a price forward and pulls purchasing power backward at a constant annual rate. It answers two different questions with the same arithmetic: what something will cost later, and what a future sum is really worth today.',
      howItWorks:
        'Inflation compounds, so the multiplier is one plus the annual rate raised to the number of years. Multiplying an amount by that factor gives the future cost of the same basket. Dividing by it gives the present value of a future amount — what it buys in today\u2019s money. The tool also reports cumulative inflation and the real percentage change in purchasing power.',
      example:
        'At 3% inflation, 1,000 of spending today costs about 1,343.92 in ten years. Put the other way, 1,000 received in ten years buys only about 744.09 worth of today\u2019s goods — a real fall of 25.59%. The gap between +34.39% and −25.59% is the same inflation seen from two directions.',
      formulas: [
        {
          label: 'Future cost',
          expression: 'Future = Amount × (1 + rate)^years',
        },
        {
          label: 'Purchasing power',
          expression: 'Today\u2019s value = Amount / (1 + rate)^years',
        },
        {
          label: 'Cumulative inflation',
          expression: 'Cumulative % = ((1 + rate)^years − 1) × 100',
        },
      ],
      sources: [
        {
          label: 'OECD — Consumer Price Index data',
          expression: 'Annual CPI inflation rates by country',
          note: 'CPI measures a representative basket and is the usual basis for headline inflation.',
        },
        {
          label: 'IMF — Inflation: Prices on the Rise',
          expression: 'Compounding effect of sustained inflation',
          note: 'Explains why even low rates erode purchasing power substantially over decades.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Future cost',
          explanation:
            'What the same goods or services would cost after the chosen number of years at a constant rate. Real inflation rarely moves in a straight line.',
        },
        {
          resultLabel: 'Purchasing power',
          explanation:
            'What a future sum is worth in today\u2019s money. It is the figure to compare against a future salary or pension.',
        },
      ],
      workflowLinks: [
        { slug: 'inflation-adjusted-return', step: 'Strip inflation out of an investment return.' },
        { slug: 'savings-goal-calculator', step: 'Set a savings target in future money.' },
        { slug: 'compound-interest-calculator', step: 'Compare nominal growth with real growth.' },
      ],
      faqs: [
        {
          q: 'What inflation rate should I use?',
          a: 'Use your central bank\u2019s target or the long-run CPI average for your country, typically 2–3% in developed economies. For personal planning, use the inflation rate you actually experience, which may be higher if housing or food dominates your spending.',
        },
        {
          q: 'Why does purchasing power fall faster than prices rise?',
          a: 'They are the same change measured from opposite ends. Prices rising 34.39% means money loses 25.59% of its buying power, because the new price is the reference point. The percentages differ, but the underlying factor is identical.',
        },
        {
          q: 'Does this show real wage growth?',
          a: 'Not directly, but you can use it to. Convert a future salary to today\u2019s money with the purchasing-power figure, then compare it with your current salary. If the real figure is lower, your pay is not keeping up.',
        },
        {
          q: 'Is a constant inflation rate realistic?',
          a: 'No. Real inflation moves with energy prices, supply shocks, and policy. A constant rate is a planning assumption, not a forecast. Run a low and a high case to see the range.',
        },
      ],
      related: ['inflation-adjusted-return', 'savings-goal-calculator', 'compound-interest-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'capital-gains-tax',
    slug: 'capital-gains-tax-calculator',
    name: 'Capital Gains Tax Calculator',
    shortDesc: 'Calculate a capital gain, the taxable portion, tax due, and net proceeds after tax.',
    tagline: 'What you keep after selling at a gain.',
    category: 'finance',
    iconName: 'TrendingUp',
    badge: 'Tax',
    keywords: [
      'capital gains tax calculator',
      'cgt calculator',
      'capital gain calculator',
      'tax on sale of property',
      'inclusion rate calculator',
      'net proceeds after tax',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'salePrice', label: 'Sale price (proceeds)', type: 'number', defaultValue: 800000, min: 0, step: 1000 },
        { id: 'costBasis', label: 'Cost basis (purchase + improvements)', type: 'number', defaultValue: 500000, min: 0, step: 1000 },
        { id: 'sellingCosts', label: 'Selling costs', type: 'number', defaultValue: 30000, min: 0, step: 500 },
        { id: 'inclusionRate', label: 'Taxable share of the gain', type: 'number', defaultValue: 40, min: 0, max: 100, step: 1, suffix: '%' },
        { id: 'taxRate', label: 'Tax rate on the taxable gain', type: 'number', defaultValue: 41, min: 0, max: 70, step: 0.5, suffix: '%' },
      ],
      results: [
        {
          label: 'Capital gain',
          formulaCode: 'salePrice - sellingCosts - costBasis',
          accent: true,
        },
        {
          label: 'Taxable gain',
          formulaCode: 'Math.max(0, salePrice - sellingCosts - costBasis) * inclusionRate / 100',
        },
        {
          label: 'Tax owed',
          formulaCode:
            'Math.max(0, salePrice - sellingCosts - costBasis) * inclusionRate / 100 * taxRate / 100',
        },
        {
          label: 'Net proceeds after tax',
          formulaCode:
            'salePrice - sellingCosts - Math.max(0, salePrice - sellingCosts - costBasis) * inclusionRate / 100 * taxRate / 100',
        },
        { label: 'Effective rate on the gain', formulaCode: 'inclusionRate * taxRate / 100', suffix: '%' },
      ],
      formulaDescription:
        'Gain = Proceeds − Selling costs − Basis; Tax = max(0, Gain) × inclusion % × tax rate',
      tips: [
        'Cost basis includes the original purchase price plus capital improvements, not repairs or maintenance.',
        'Some countries tax only a share of the gain (an inclusion rate); others tax 100% at a preferential rate. Set the inclusion field accordingly.',
        'Losses usually offset gains rather than producing a refund, so a negative gain here is shown as zero taxable gain.',
      ],
    },
    content: {
      intro:
        'The Capital Gains Tax Calculator works out the gain on a sale, the portion that is actually taxable, the tax due, and what you keep after tax. It uses an inclusion rate and a tax rate rather than a country-specific table, so it adapts to systems that tax all of a gain and to those that tax only a fraction.',
      howItWorks:
        'Start with proceeds and subtract selling costs and the cost basis. The result is the capital gain. Many systems then include only a percentage of that gain in taxable income, and tax it at the taxpayer\u2019s rate. Multiplying the gain by the inclusion rate and then by the tax rate gives the tax. Net proceeds are what remains after selling costs and tax.',
      example:
        'Sell for 800,000 with a 500,000 basis and 30,000 of selling costs: the gain is 270,000. At a 40% inclusion rate, 108,000 is taxable. At a 41% tax rate that is 44,280 of tax, leaving 725,720 of net proceeds and an effective 16.4% rate on the gain.',
      formulas: [
        {
          label: 'Capital gain',
          expression: 'Gain = Proceeds − Selling costs − Cost basis',
        },
        {
          label: 'Taxable gain',
          expression: 'Taxable = max(0, Gain) × inclusion rate',
        },
        {
          label: 'Tax and net proceeds',
          expression: 'Tax = Taxable × tax rate; Net = Proceeds − Selling costs − Tax',
        },
      ],
      sources: [
        {
          label: 'SARS — Capital Gains Tax',
          expression: '40% inclusion rate for individuals (effective 2024/25)',
          note: 'Inclusion rates and annual exclusions change with legislation; confirm the current year before filing.',
        },
        {
          label: 'IRS Publication 523 — Selling Your Home',
          expression: 'Basis, improvements, and selling expenses',
          note: 'Defines what increases basis and which selling costs reduce the amount realised.',
        },
        {
          label: 'OECD — Taxation of Capital Gains',
          expression: 'Countries differ on inclusion and rates',
          note: 'Some tax the full gain at a flat rate; others include a share in ordinary income.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Capital gain',
          explanation:
            'Proceeds minus selling costs and basis. A negative figure is a capital loss, which may offset other gains but does not generate a refund on its own.',
        },
        {
          resultLabel: 'Net proceeds after tax',
          explanation:
            'Cash left after paying selling costs and capital gains tax. It is not the same as profit, because the original basis is still embedded in it.',
        },
        {
          resultLabel: 'Effective rate on the gain',
          explanation:
            'Tax divided by the raw gain. With a 40% inclusion rate and a 41% marginal rate, the effective rate is 16.4%, not 41%.',
        },
      ],
      workflowLinks: [
        { slug: 'income-tax-calculator', step: 'Combine the taxable gain with other income.' },
        { slug: 'property-tax-calculator', step: 'Account for recurring property taxes on the asset.' },
        { slug: 'roi-calculator', step: 'Measure the pre-tax total return on the investment.' },
      ],
      faqs: [
        {
          q: 'What is an inclusion rate?',
          a: 'The share of a capital gain that counts as taxable income. South Africa, for example, includes 40% of an individual\u2019s gain, so only that portion is taxed at the marginal rate. Set it to 100% for systems that tax the whole gain.',
        },
        {
          q: 'Do selling costs reduce the gain?',
          a: 'Usually yes. Agent commission, legal fees, and advertising costs are commonly deducted from proceeds before calculating the gain. Rules vary, so check which costs your tax authority allows.',
        },
        {
          q: 'What counts as cost basis?',
          a: 'The purchase price plus capital improvements that add lasting value, such as an extension or a new roof. Routine repairs and maintenance are usually expensed, not added to basis.',
        },
        {
          q: 'Can I use this for shares or crypto?',
          a: 'Yes, if you enter total proceeds and total cost basis. It does not handle multiple lots with different holding periods, wash-sale rules, or losses carried forward, so it is an estimate for a single disposal.',
        },
      ],
      related: ['income-tax-calculator', 'property-tax-calculator', 'roi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'property-tax',
    slug: 'property-tax-calculator',
    name: 'Property Tax Calculator',
    shortDesc: 'Estimate annual and monthly property tax from market value, assessment ratio, and mill rate.',
    tagline: 'Turn an assessment and a mill rate into a real bill.',
    category: 'finance',
    iconName: 'Home',
    badge: 'Property',
    keywords: [
      'property tax calculator',
      'mill rate calculator',
      'property tax estimate',
      'assessed value calculator',
      'real estate tax calculator',
      'annual property tax',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'marketValue', label: 'Market value', type: 'number', defaultValue: 450000, min: 1000, step: 5000 },
        { id: 'assessmentRatio', label: 'Assessment ratio', type: 'number', defaultValue: 100, min: 1, max: 100, step: 1, suffix: '% of market value' },
        { id: 'millRate', label: 'Tax rate', type: 'number', defaultValue: 10, min: 0, step: 0.1, suffix: 'per $1,000 assessed' },
      ],
      results: [
        { label: 'Assessed value', formulaCode: 'marketValue * assessmentRatio / 100' },
        {
          label: 'Annual property tax',
          formulaCode: '(marketValue * assessmentRatio / 100) * millRate / 1000',
          accent: true,
        },
        {
          label: 'Monthly property tax',
          formulaCode: '((marketValue * assessmentRatio / 100) * millRate / 1000) / 12',
        },
        {
          label: 'Effective rate on market value',
          formulaCode: '(((marketValue * assessmentRatio / 100) * millRate / 1000) / marketValue) * 100',
          suffix: '%',
        },
      ],
      formulaDescription: 'Tax = (Market value × assessment ratio) × mill rate / 1,000',
      tips: [
        'A mill is one-thousandth of a currency unit, so 10 mills per 1,000 equals a 1% tax on assessed value.',
        'Some jurisdictions publish a rate per 100 of assessed value instead of per 1,000; convert before entering it.',
        'Assessment ratio and mill rate are set locally, and both can change after a revaluation.',
      ],
    },
    content: {
      intro:
        'The Property Tax Calculator converts a market value, a local assessment ratio, and a mill rate into an annual and monthly property tax bill. It also shows the effective rate on market value, which is the number to compare between jurisdictions.',
      howItWorks:
        'The assessment ratio converts market value into the assessed value that the tax is actually levied on. The mill rate is applied per 1,000 of assessed value. Dividing the annual bill by twelve gives the monthly amount that often sits inside a mortgage escrow payment.',
      example:
        'A 450,000 property assessed at 100% with a 10 mill rate has a 450,000 assessed value. Tax is 450,000 × 10 / 1,000 = 4,500 a year, or 375 a month. That is an effective rate of 1% of market value.',
      formulas: [
        {
          label: 'Assessed value',
          expression: 'Assessed = Market value × assessment ratio',
        },
        {
          label: 'Annual tax',
          expression: 'Tax = Assessed value × mill rate / 1,000',
        },
        {
          label: 'Effective rate',
          expression: 'Effective % = Annual tax / Market value × 100',
        },
      ],
      sources: [
        {
          label: 'Lincoln Institute of Land Policy — Property Tax Basics',
          expression: 'Assessment ratio, mill rate, and effective tax rate',
          note: 'Explains how assessed value and mill rates combine, and why effective rates differ from statutory rates.',
        },
        {
          label: 'US Census Bureau — Annual Survey of State and Local Government Finances',
          expression: 'Property tax as a share of local revenue',
          note: 'Local governments set both assessment practices and rates, so no single national rate exists.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Assessed value',
          explanation:
            'The taxable value after applying the local assessment ratio. It can be well below market value, which is why the statutory mill rate looks higher than the effective rate.',
        },
        {
          resultLabel: 'Effective rate on market value',
          explanation:
            'Annual tax divided by market value. It is the fair way to compare tax burdens across regions with different assessment practices.',
        },
      ],
      workflowLinks: [
        { slug: 'mortgage-calculator', step: 'Add the monthly tax to principal and interest.' },
        { slug: 'rental-yield-calculator', step: 'Include property tax in net rental yield.' },
        { slug: 'closing-cost-calculator', step: 'Budget for prorated taxes at closing.' },
      ],
      faqs: [
        {
          q: 'What is a mill rate?',
          a: 'A mill is one-thousandth, so a mill rate is the tax per 1,000 of assessed value. A rate of 10 mills means 10 per 1,000, which is 1% of assessed value.',
        },
        {
          q: 'Why is my assessed value lower than market value?',
          a: 'Many jurisdictions assess at a fraction of market value, or lag behind a rising market. The assessment ratio field lets you model that. Check your assessment notice for the ratio and the valuation date.',
        },
        {
          q: 'Does this include exemptions?',
          a: 'No. Homestead, senior, and veteran exemptions reduce taxable value before the rate is applied. Subtract the exempt amount from assessed value, or lower the assessment ratio, to approximate the effect.',
        },
        {
          q: 'Can my property tax change after I buy?',
          a: 'Yes. A sale can trigger reassessment, and rates are set annually by local budgets. Budget for an increase in the first year after purchase, especially where assessments lag the market.',
        },
      ],
      related: ['mortgage-calculator', 'rental-yield-calculator', 'closing-cost-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'roas',
    slug: 'roas-calculator',
    name: 'ROAS Calculator',
    shortDesc: 'Calculate return on ad spend, the profit left after ads, and the break-even ROAS for your margin.',
    tagline: 'Is the ad spend actually making money?',
    category: 'finance',
    iconName: 'Target',
    badge: 'Marketing',
    featured: true,
    keywords: [
      'roas calculator',
      'return on ad spend',
      'break even roas',
      'advertising roi calculator',
      'marketing roi calculator',
      'roas formula',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'revenue', label: 'Revenue attributed to ads', type: 'number', defaultValue: 12000, min: 0, step: 100 },
        { id: 'adSpend', label: 'Ad spend', type: 'number', defaultValue: 3000, min: 1, step: 100 },
        { id: 'grossMargin', label: 'Gross margin', type: 'number', defaultValue: 40, min: 1, max: 100, step: 1, suffix: '%' },
      ],
      results: [
        { label: 'ROAS', formulaCode: 'revenue / adSpend', suffix: '×', accent: true },
        { label: 'ROAS as a percentage', formulaCode: '(revenue / adSpend) * 100', suffix: '%' },
        {
          label: 'Profit after ad spend',
          formulaCode: 'revenue * grossMargin / 100 - adSpend',
        },
        { label: 'Break-even ROAS', formulaCode: '100 / grossMargin', suffix: '×' },
      ],
      formulaDescription: 'ROAS = Revenue / Ad spend; Break-even ROAS = 1 / gross margin',
      tips: [
        'ROAS measures revenue per unit of spend, not profit. A 4× ROAS is a loss if your gross margin is 20%.',
        'Break-even ROAS is 1 divided by gross margin: 25% margin needs 4×, 50% margin needs 2×.',
        'Use the same attribution window for revenue and spend or the ratio will flatter or punish the campaign unfairly.',
      ],
    },
    content: {
      intro:
        'The ROAS Calculator measures revenue returned per unit of advertising spend, then goes one step further and shows whether that revenue actually covers the cost of the goods sold. It also reports the break-even ROAS implied by your gross margin, which is the number a campaign must beat to be profitable.',
      howItWorks:
        'ROAS is attributed revenue divided by ad spend. It says nothing about margin, so a high ROAS can still lose money. Profit after ad spend applies gross margin to revenue and subtracts the spend. Break-even ROAS is one divided by gross margin, expressed as a multiple: with a 40% margin, you need 2.5 in revenue for every 1 spent before ads break even.',
      example:
        'Spend 3,000 to generate 12,000 of revenue and ROAS is 4.0×, or 400%. At a 40% gross margin, gross profit is 4,800, so profit after ad spend is 1,800. Break-even ROAS is 100 / 40 = 2.5×, so the campaign clears its hurdle comfortably.',
      formulas: [
        {
          label: 'ROAS',
          expression: 'ROAS = Attributed revenue / Ad spend',
        },
        {
          label: 'Profit after ad spend',
          expression: 'Profit = Revenue × gross margin − Ad spend',
        },
        {
          label: 'Break-even ROAS',
          expression: 'Break-even ROAS = 1 / gross margin',
          note: 'A 25% margin needs 4.0×; a 50% margin needs 2.0×.',
        },
      ],
      sources: [
        {
          label: 'Google Ads Help — Return on ad spend (ROAS)',
          expression: 'Conversion value divided by cost',
          note: 'Defines ROAS as conversion value over cost, and notes it ignores margin and overhead.',
        },
        {
          label: 'Meta Business Help Centre — ROAS',
          expression: 'Purchase value divided by spend',
          note: 'Platform-reported ROAS depends on the attribution window and modelled conversions.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'ROAS',
          explanation:
            'Revenue per unit of ad spend. 4.0× means every 1 spent returns 4 in revenue — not 4 in profit.',
        },
        {
          resultLabel: 'Break-even ROAS',
          explanation:
            'The minimum ROAS that covers cost of goods. Below this figure, extra revenue still loses money after the product is delivered.',
        },
        {
          resultLabel: 'Profit after ad spend',
          explanation:
            'Gross profit minus ad spend. It still excludes overheads such as salaries, software, and fulfilment, so it is a campaign-level contribution figure.',
        },
      ],
      workflowLinks: [
        { slug: 'roi-calculator', step: 'Compare ad performance with total business return.' },
        { slug: 'break-even-calculator', step: 'Find the sales volume that covers fixed costs.' },
        { slug: 'markup-margin-calculator', step: 'Check the gross margin used in the break-even ROAS.' },
      ],
      faqs: [
        {
          q: 'What is a good ROAS?',
          a: 'It depends entirely on margin. A 4× ROAS is strong at a 60% margin and loss-making at 20%. Calculate your break-even ROAS first, then judge performance against that floor rather than a generic benchmark.',
        },
        {
          q: 'What is the difference between ROAS and ROI?',
          a: 'ROAS compares revenue with ad spend. ROI compares profit with total investment, including production, salaries, and tools. ROAS is a campaign efficiency metric; ROI is a business profitability metric.',
        },
        {
          q: 'Does ROAS include organic sales?',
          a: 'Only if they are attributed to the campaign, which is why attribution windows matter. Platform-reported ROAS often includes conversions that would have happened anyway, so it tends to overstate incremental impact.',
        },
        {
          q: 'How do I calculate break-even ROAS?',
          a: 'Divide 1 by your gross margin as a decimal. A 40% margin gives 1 / 0.4 = 2.5×. Below 2.5×, the campaign is paying more for ads than it earns in gross profit.',
        },
      ],
      related: ['roi-calculator', 'break-even-calculator', 'markup-margin-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'npv',
    slug: 'npv-calculator',
    name: 'NPV Calculator',
    shortDesc: 'Discount a series of cash flows to present value and see whether a project creates value.',
    tagline: 'Is the project worth more than it costs today?',
    category: 'finance',
    iconName: 'BarChart3',
    badge: 'Investment',
    featured: true,
    keywords: [
      'npv calculator',
      'net present value calculator',
      'discounted cash flow calculator',
      'dcf calculator',
      'present value of cash flows',
      'npv formula',
    ],
    kind: 'custom',
    componentId: 'NpvCalculator',
    content: {
      intro:
        'The NPV Calculator discounts a stream of future cash flows back to today at your chosen rate and reports the net present value. It also shows the present value of the inflows, the profitability index, and a period-by-period discounting table so you can see where the value comes from.',
      howItWorks:
        'Each cash flow is divided by one plus the discount rate raised to its period number. Period 0 is not discounted because it happens today. Summing the discounted values gives NPV. A positive NPV means the project returns more than the discount rate; a negative one means it destroys value at that rate.',
      example:
        'Invest 10,000 today and receive 3,000, 3,500, 4,000, and 4,500 over four years at a 10% discount rate. The discounted inflows total about 12,434, so NPV is roughly +2,434 and the profitability index is 1.24. The project clears a 10% hurdle.',
      formulas: [
        {
          label: 'Net present value',
          expression: 'NPV = Σ CFₜ / (1 + r)ᵗ',
          note: 'CF₀ is not discounted because it occurs at t = 0.',
        },
        {
          label: 'Profitability index',
          expression: 'PI = PV of inflows / Initial outlay',
          note: 'A PI above 1 is consistent with a positive NPV.',
        },
      ],
      sources: [
        {
          label: 'CFA Institute — Capital Budgeting',
          expression: 'NPV as the primary investment criterion',
          note: 'NPV is preferred over payback because it accounts for the time value of money and the scale of cash flows.',
        },
        {
          label: 'Brealey, Myers & Allen — Principles of Corporate Finance',
          expression: 'Discounting at the opportunity cost of capital',
          note: 'The discount rate should reflect the return available on investments of comparable risk.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Net present value',
          explanation:
            'Value created or destroyed in today\u2019s money at the chosen discount rate. Positive means acceptable if the rate is your true cost of capital.',
        },
        {
          resultLabel: 'Profitability index',
          explanation:
            'Present value of inflows per unit invested. It helps rank projects of different sizes, where raw NPV favours larger ones.',
        },
      ],
      workflowLinks: [
        { slug: 'irr-calculator', step: 'Find the rate at which this NPV becomes zero.' },
        { slug: 'present-value-calculator', step: 'Discount a single future amount.' },
        { slug: 'cagr-calculator', step: 'Compare the project with a compound annual return.' },
      ],
      faqs: [
        {
          q: 'What discount rate should I use?',
          a: 'Your opportunity cost of capital: the return you could earn on an investment of similar risk. For a company project that is usually the weighted average cost of capital; for personal investing it is a realistic portfolio return.',
        },
        {
          q: 'What does a negative NPV mean?',
          a: 'At that discount rate the project returns less than the alternative. It does not automatically mean the idea is bad — the cash-flow assumptions or the rate may be wrong — but on those inputs it destroys value.',
        },
        {
          q: 'Why is the first cash flow not discounted?',
          a: 'Period 0 happens today, so its present value equals its nominal value. If your first outlay occurs a year from now, put a zero in period 0 and shift the series along.',
        },
        {
          q: 'Is NPV better than payback period?',
          a: 'Yes for investment decisions. Payback ignores everything after the break-even point and ignores the time value of money. NPV captures the full stream and discounts it, which is why it is the standard criterion.',
        },
      ],
      related: ['irr-calculator', 'present-value-calculator', 'cagr-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'irr',
    slug: 'irr-calculator',
    name: 'IRR Calculator',
    shortDesc: 'Find the internal rate of return of a cash-flow series and compare it with your hurdle rate.',
    tagline: 'The rate a project actually earns.',
    category: 'finance',
    iconName: 'TrendingUp',
    badge: 'Investment',
    featured: true,
    keywords: [
      'irr calculator',
      'internal rate of return calculator',
      'irr formula',
      'hurdle rate calculator',
      'cash flow irr',
      'investment return rate',
    ],
    kind: 'custom',
    componentId: 'IrrCalculator',
    content: {
      intro:
        'The IRR Calculator finds the annual rate at which a series of cash flows has a net present value of zero — the rate the investment actually earns. It reports the IRR, the NPV check at that rate, the money multiple, and whether the result clears a hurdle rate you set.',
      howItWorks:
        'IRR is the discount rate that makes discounted inflows equal discounted outflows. There is no closed-form solution for most series, so the calculator solves numerically by bisection: it narrows an interval until NPV is effectively zero. A series needs at least one negative and one positive cash flow, otherwise no internal rate exists.',
      example:
        'Invest 10,000 and receive 3,000, 3,500, 4,000, and 4,500 over four years. The IRR is about 17.6% a year. Against a 10% hurdle it clears comfortably; against a 20% hurdle it does not. Total returned is 15,000, a 1.5× money multiple — but the multiple alone ignores how long the money was tied up.',
      formulas: [
        {
          label: 'IRR definition',
          expression: '0 = Σ CFₜ / (1 + IRR)ᵗ',
        },
        {
          label: 'Money multiple',
          expression: 'Multiple = Total inflows / Total outflows',
          note: 'Ignores timing, which is why IRR and the multiple can tell different stories.',
        },
      ],
      sources: [
        {
          label: 'CFA Institute — Internal Rate of Return',
          expression: 'IRR is the discount rate that sets NPV to zero',
          note: 'Notes the reinvestment-rate assumption and the multiple-IRR problem with non-conventional cash flows.',
        },
        {
          label: 'Brealey, Myers & Allen — Principles of Corporate Finance',
          expression: 'Comparing IRR with NPV',
          note: 'NPV and IRR can rank mutually exclusive projects differently when scale or timing differs.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Internal rate of return',
          explanation:
            'The per-period rate that zeroes NPV. It assumes interim cash flows are reinvested at the same rate, which is optimistic for very high IRRs.',
        },
        {
          resultLabel: 'NPV at this rate',
          explanation:
            'A numerical check. It should be effectively zero; a large value means the solver landed on a different root or the series is ill-conditioned.',
        },
        {
          resultLabel: 'Money multiple',
          explanation:
            'Total cash returned divided by total cash invested. Useful alongside IRR because it shows scale, not just rate.',
        },
      ],
      workflowLinks: [
        { slug: 'npv-calculator', step: 'Check the project at your actual cost of capital.' },
        { slug: 'cagr-calculator', step: 'Compare with a compound annual growth rate.' },
        { slug: 'roi-calculator', step: 'Measure total return without annualising.' },
      ],
      faqs: [
        {
          q: 'What is a good IRR?',
          a: 'One above your hurdle rate — the return you could get elsewhere at similar risk. A 15% IRR is attractive against a 10% hurdle and inadequate against a 20% one. There is no universal threshold.',
        },
        {
          q: 'Why does the calculator reject my cash flows?',
          a: 'IRR needs at least one negative and one positive value. If every flow has the same sign, discounted value can never reach zero. If the series never changes sign, no internal rate exists.',
        },
        {
          q: 'Can a project have more than one IRR?',
          a: 'Yes. If the cash flows change sign more than once — for example a large decommissioning cost at the end — there can be multiple rates that zero the NPV. In that case use NPV at your cost of capital instead.',
        },
        {
          q: 'Is IRR better than NPV?',
          a: 'NPV is generally better for the decision itself because it measures value in money and avoids the reinvestment assumption. IRR is useful for communicating a rate and comparing projects of similar size and duration.',
        },
      ],
      related: ['npv-calculator', 'cagr-calculator', 'roi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'conversion-rate',
    slug: 'conversion-rate-calculator',
    name: 'Conversion Rate Calculator',
    shortDesc: 'Calculate conversion rate, cost per conversion, revenue per visitor, and the range the true rate could sit in.',
    tagline: 'A percentage is a start. The interval is the honest part.',
    category: 'finance',
    iconName: 'TrendingUp',
    badge: 'Marketing',
    featured: false,
    keywords: [
      'conversion rate calculator',
      'conversion rate formula',
      'how to calculate conversion rate',
      'cost per conversion',
      'conversion rate confidence interval',
      'visitors needed for conversions',
    ],
    kind: 'custom',
    componentId: 'ConversionRateCalculator',
    content: {
      intro:
        'The Conversion Rate Calculator turns a visitor count and a conversion count into the percentage of visitors who completed the action, the cost and revenue attached to each conversion, and a 95% confidence interval for the underlying rate. It is for the ordinary marketing question: is this page, campaign, or checkout actually improving, or does the difference disappear once the sample size is taken seriously?',
      howItWorks:
        'The rate is conversions divided by visitors, multiplied by 100. Optional spend and revenue are divided by the same counts to give cost per conversion, revenue per visitor, and revenue per conversion. The confidence interval uses the Wilson score method rather than the textbook normal approximation, because Wilson behaves sensibly when the rate is near 0% or 100% and when the sample is small. Conversions must be whole numbers and cannot exceed visitors, because this model counts one conversion per visitor.',
      example:
        'A landing page receives 2,500 visitors and records 75 purchases. The conversion rate is 75 / 2,500 x 100 = 3.0%. With only 75 conversions the 95% interval is roughly 2.4% to 3.7%, so a week at 3.4% is not yet proof of improvement. At a 3.0% rate, reaching 100 conversions needs ceil(100 / 0.03) = 3,334 visitors.',
      formulas: [
        { label: 'Conversion rate', expression: 'rate = conversions / visitors x 100' },
        { label: 'Visitors per conversion', expression: 'visitors / conversions' },
        { label: 'Cost per conversion', expression: 'spend / conversions' },
        {
          label: 'Visitors for a target',
          expression: 'target conversions / (rate / 100)',
          note: 'Rounded up to a whole visitor.',
        },
        {
          label: 'Wilson score interval',
          expression: '(p + z2/2n +/- z sqrt(p(1-p)/n + z2/4n2)) / (1 + z2/n)',
          note: 'p is the observed rate and n is the visitor count. A 95% interval uses z = 1.96.',
        },
      ],
      sources: [
        {
          label: 'Wilson, E. B. (1927), Probable inference, the law of succession, and statistical inference',
          expression: 'Score interval for a binomial proportion',
          note: 'The confidence interval method used here. It is more reliable than the normal approximation for small samples and extreme rates.',
        },
        {
          label: 'Google Analytics 4 Help - Key events',
          expression: 'How conversions (key events) are defined and counted',
          note: 'A reminder that the definition of the conversion is a choice. Changing it changes every rate that follows.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Conversion rate',
          explanation:
            'The share of visitors who completed the action. It is only comparable across periods and channels when the action and the counting method stay the same.',
        },
        {
          resultLabel: '95% confidence interval',
          explanation:
            'The range of underlying rates that is compatible with the observed data. Two campaigns with overlapping intervals have not shown a real difference yet.',
        },
        {
          resultLabel: 'Cost per conversion',
          explanation:
            'Spend divided by conversions, shown only when spend is entered. A cheap conversion that never becomes a customer is still expensive.',
        },
      ],
      workflowLinks: [
        { slug: 'roas-calculator', step: 'Compare the revenue from those conversions with the ad spend behind them.' },
        { slug: 'break-even-calculator', step: 'Work out how many conversions the fixed costs actually require.' },
        { slug: 'sample-size-calculator', step: 'Plan how much traffic a split test needs before you call a winner.' },
      ],
      faqs: [
        {
          q: 'Should visitors be sessions or unique users?',
          a: 'Either can work, but pick one and keep it. Sessions count repeat visits, so a returning visitor can create several chances to convert; unique users count each person once. Mixing the two across reports makes a change look like a trend.',
        },
        {
          q: 'Why is the confidence interval so wide?',
          a: 'Small samples carry more uncertainty. At 3 conversions from 100 visitors the interval is roughly 1.0% to 8.5%; at 300 from 10,000 it tightens to roughly 2.7% to 3.4%. The point estimate is the same 3% in both cases, but only the second is precise enough to act on.',
        },
        {
          q: 'Can a conversion rate exceed 100%?',
          a: 'Not in this model, where each visitor can convert at most once. If one visitor can generate several conversions, such as multiple purchases or multiple form submissions, track events per visitor separately rather than forcing them into a single rate.',
        },
        {
          q: 'Is a higher conversion rate always better?',
          a: 'No. A 20% rate for a newsletter signup can be worth less than a 1% rate for a high-value purchase. Pair the rate with revenue per visitor or cost per conversion before deciding which page is doing the better job.',
        },
        {
          q: 'How many visitors do I need before trusting the number?',
          a: 'There is no universal threshold. It depends on the baseline rate and the size of the change you want to detect. Use the interval as a guide: if it is wide enough to contain both "no change" and "a meaningful gain", keep collecting data or run a proper power calculation.',
        },
      ],
      related: ['roas-calculator', 'break-even-calculator', 'sample-size-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.88 },
  },
  {
    id: 'freelance-rate',
    slug: 'freelance-rate-calculator',
    name: 'Freelance Rate Calculator',
    shortDesc: 'Turn a target income, tax set-aside, expenses, and realistic billable hours into an hourly and day rate.',
    tagline: 'Price the hours you can bill, not the hours you sit at a desk.',
    category: 'finance',
    iconName: 'Wallet',
    badge: 'Pricing',
    featured: false,
    keywords: [
      'freelance rate calculator',
      'how much should i charge freelance',
      'freelance hourly rate',
      'day rate calculator',
      'consulting rate calculator',
      'billable hours calculator',
    ],
    kind: 'custom',
    componentId: 'FreelanceRateCalculator',
    content: {
      intro:
        'The Freelance Rate Calculator works backwards from the life you want: a target take-home income, the tax you need to set aside, the annual cost of running the business, and the hours you can genuinely bill. It returns the hourly rate, day rate, and annual revenue that make those numbers add up, instead of pricing from a salaried equivalent and discovering the gap at tax time.',
      howItWorks:
        'The target income is grossed up for tax by dividing by (1 - tax rate). Business expenses are added because they are paid from revenue before income reaches you. That revenue requirement is divided by annual billable hours, calculated as billable hours per week multiplied by (52 - weeks off). A day rate multiplies the hourly rate by the length of a billable day. Admin, sales, invoicing, and holiday are deliberately outside the billable hours, which is why the resulting rate is higher than a salary divided by 2,080 hours.',
      example:
        'You want $80,000 after tax, expect a combined 30% tax rate, and spend $12,000 a year on software, insurance, and accounting. You can bill 25 hours a week and take 4 weeks off. Billable hours are 25 x 48 = 1,200. Revenue needed is 80,000 / 0.70 + 12,000 = $126,286. The hourly rate is $126,286 / 1,200 = $105.24, and a 6-hour billable day is $631.43.',
      formulas: [
        { label: 'Billable hours per year', expression: 'hours per week x (52 - weeks off)' },
        { label: 'Revenue needed', expression: 'target income / (1 - tax rate) + business expenses' },
        { label: 'Hourly rate', expression: 'revenue needed / billable hours per year' },
        { label: 'Day rate', expression: 'hourly rate x billable hours per day' },
        {
          label: 'Kept per billable hour',
          expression: 'target income / billable hours per year',
          note: 'What actually reaches you per billed hour, after tax and business costs.',
        },
      ],
      sources: [
        {
          label: 'IRS - Self-Employment Tax',
          expression: 'Social Security and Medicare contributions for self-employed people',
          note: 'Explains why a freelancer sets aside more than income tax alone. The exact combined rate depends on earnings and jurisdiction.',
        },
        {
          label: 'IRS Publication 535 - Business Expenses',
          expression: 'Which ordinary and necessary costs are deductible',
          note: 'A reference for deciding what belongs in the business-expenses field rather than in the target income.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Hourly rate',
          explanation:
            'The minimum you need to charge for every billable hour to hit the target after tax and expenses. Treat it as a floor, not a ceiling: it includes no margin for slow months or unpaid proposals.',
        },
        {
          resultLabel: 'Revenue needed',
          explanation:
            'The gross amount the business must invoice in a year. It is larger than the target income because tax and expenses are paid out of it.',
        },
        {
          resultLabel: 'Kept per billable hour',
          explanation:
            'The target income divided by billable hours. The gap between this and the hourly rate is tax plus business costs, and it is the number to remember when a client asks for a discount.',
        },
      ],
      workflowLinks: [
        { slug: 'hourly-to-annual-salary-calculator', step: 'Compare the freelance rate with an equivalent salaried package.' },
        { slug: 'take-home-pay-calculator', step: 'Check what a salaried offer actually leaves after tax.' },
        { slug: 'break-even-calculator', step: 'Find the number of billable hours or projects that covers fixed costs.' },
      ],
      faqs: [
        {
          q: 'Why not just divide my target income by 2,080 hours?',
          a: 'Because almost no freelancer bills 40 hours in every one of 52 weeks. Sales, admin, invoicing, learning, holiday, and quiet periods are unpaid. Dividing by 2,080 hides those hours and produces a rate that cannot sustain the target.',
        },
        {
          q: 'What tax rate should I use?',
          a: 'Use your best estimate of the combined effective rate for income tax and self-employment contributions, not just the marginal bracket. It varies by country, income, and deductions. If you are unsure, ask an accountant; the calculator is a planning tool, not tax advice.',
        },
        {
          q: 'Does the rate cover health insurance and retirement?',
          a: 'Only if you include them. Put premiums and pension contributions in business expenses, or add them to the target income if you prefer to treat them as personal costs. The calculator does not add them automatically.',
        },
        {
          q: 'Should every client pay this rate?',
          a: 'The result is an average floor that funds your year. You can charge more for urgent or specialist work and less for a long retainer that fills otherwise empty time, as long as the mix still covers the annual revenue requirement.',
        },
        {
          q: 'What if I bill fewer hours than expected?',
          a: 'The rate rises. That is the honest signal: either raise the rate, reduce expenses, or treat the shortfall as a decision to work less rather than a pricing failure. Re-run the calculator with the hours you actually billed.',
        },
      ],
      related: ['hourly-to-annual-salary-calculator', 'salary-to-hourly-calculator', 'take-home-pay-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.88 },
  },
  {
    id: 'overtime',
    slug: 'overtime-calculator',
    name: 'Overtime Pay Calculator',
    shortDesc: 'Calculate regular pay, overtime pay at your multiplier, total gross pay, and the blended hourly rate.',
    tagline: 'What the extra hours are actually worth.',
    category: 'finance',
    iconName: 'Clock',
    badge: 'Payroll',
    featured: false,
    keywords: [
      'overtime calculator',
      'overtime pay calculator',
      'time and a half calculator',
      'how to calculate overtime',
      'overtime rate calculator',
      'gross pay calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'hourlyRate', label: 'Hourly rate', type: 'number', defaultValue: 25, min: 0, prefix: '$' },
        { id: 'regularHours', label: 'Regular hours', type: 'number', defaultValue: 40, min: 0, suffix: 'h' },
        { id: 'overtimeHours', label: 'Overtime hours', type: 'number', defaultValue: 10, min: 0, suffix: 'h' },
        { id: 'multiplier', label: 'Overtime multiplier', type: 'number', defaultValue: 1.5, min: 1, max: 3, step: 0.1 },
      ],
      results: [
        { label: 'Regular pay', formulaCode: 'hourlyRate * regularHours', prefix: '$' },
        { label: 'Overtime pay', formulaCode: 'hourlyRate * overtimeHours * multiplier', prefix: '$' },
        {
          label: 'Total gross pay',
          formulaCode: 'hourlyRate * regularHours + hourlyRate * overtimeHours * multiplier',
          prefix: '$',
          accent: true,
        },
        {
          label: 'Blended hourly rate',
          formulaCode:
            '(hourlyRate * regularHours + hourlyRate * overtimeHours * multiplier) / (regularHours + overtimeHours)',
          prefix: '$',
        },
      ],
      formulaDescription:
        'Gross pay = rate x regular hours + rate x overtime hours x multiplier; blended rate = gross / total hours.',
      tips: [
        'Overtime is usually based on hours worked over 40 in a workweek, not over 8 in a day, unless your state or contract says otherwise.',
        'The multiplier applies to the base rate, not to a shift differential or bonus in most cases. Check how your employer calculates the regular rate.',
        'Gross pay is before tax, benefits, and deductions. Use the take-home pay calculator for the amount that reaches your account.',
      ],
    },
    content: {
      intro:
        'The Overtime Pay Calculator works out regular pay, overtime pay at a chosen multiplier, total gross pay, and the blended hourly rate across all hours. It is a payroll arithmetic tool, not a ruling on whether a particular role is exempt from overtime.',
      howItWorks:
        'Regular pay is the hourly rate times regular hours. Overtime pay is the rate times overtime hours times the multiplier, normally 1.5 for time and a half. Adding both gives gross pay. The blended rate divides gross pay by all hours worked, which is useful for comparing a job with long hours against one with a higher base rate and no overtime.',
      example:
        'At $25 an hour, 40 regular hours and 10 overtime hours at 1.5 gives $1,000 regular pay and $375 overtime pay, for $1,375 gross. Across 50 hours the blended rate is $27.50.',
      formulas: [
        { label: 'Regular pay', expression: 'hourly rate x regular hours' },
        { label: 'Overtime pay', expression: 'hourly rate x overtime hours x multiplier' },
        { label: 'Gross pay', expression: 'regular pay + overtime pay' },
        { label: 'Blended rate', expression: 'gross pay / total hours' },
      ],
      sources: [
        {
          label: 'US Department of Labor - Fact Sheet #23: Overtime Pay Requirements of the FLSA',
          expression: 'Federal overtime rules and the regular rate',
          note: 'Explains the 40-hour workweek threshold and how the regular rate is calculated. State law can be stricter.',
        },
        {
          label: 'US Department of Labor - Fact Sheet #17: Exemption for Executive, Administrative, and Professional Employees',
          expression: 'White-collar exemption tests',
          note: 'Relevant to whether a salaried role is entitled to overtime at all.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Overtime pay',
          explanation:
            'The premium portion for the overtime hours at your multiplier. It assumes the base rate is the correct regular rate for overtime.',
        },
        {
          resultLabel: 'Total gross pay',
          explanation:
            'Pay before tax and deductions. It excludes bonuses, shift differentials, and paid leave unless you add them as hours.',
        },
        {
          resultLabel: 'Blended hourly rate',
          explanation:
            'Gross pay divided by all hours. It shows what the long week averages out to and makes overtime-heavy offers easier to compare.',
        },
      ],
      workflowLinks: [
        { slug: 'take-home-pay-calculator', step: 'Estimate the tax and deductions taken from gross pay.' },
        { slug: 'salary-to-hourly-calculator', step: 'Compare an hourly role with a salaried offer.' },
        { slug: 'hourly-to-annual-salary-calculator', step: 'Annualise the weekly gross at a steady schedule.' },
      ],
      faqs: [
        {
          q: 'Is overtime always time and a half?',
          a: 'Under the federal Fair Labor Standards Act, non-exempt employees generally receive at least 1.5 times the regular rate for hours over 40 in a workweek. Some states require daily overtime, double time after a threshold, or a higher multiplier. A contract or union agreement can also be more generous.',
        },
        {
          q: 'Does overtime apply after 8 hours in a day?',
          a: 'Not under federal law, which uses the 40-hour workweek. Several states, including California, have daily overtime rules. Check your state labour office and any applicable agreement before relying on a daily threshold.',
        },
        {
          q: 'Can salaried employees get overtime?',
          a: 'Some can. Exempt status depends on the duties test and the salary threshold, not the job title. Being paid a salary does not automatically make a role exempt. The Department of Labor fact sheets explain the tests, and state rules may differ.',
        },
        {
          q: 'How do bonuses affect the overtime rate?',
          a: 'Non-discretionary bonuses often must be included in the regular rate, which raises the overtime rate for the period. Discretionary bonuses are treated differently. This calculator uses a single base rate, so ask payroll or an employment adviser for a bonus-adjusted figure.',
        },
        {
          q: 'Why is my take-home overtime pay lower than expected?',
          a: 'Overtime is taxed as ordinary income, and it can push part of the week into a higher withholding bracket. It can also affect benefit deductions or premium pay calculations. The gross figure here is the starting point, not the amount deposited.',
        },
      ],
      related: ['take-home-pay-calculator', 'salary-to-hourly-calculator', 'hourly-to-annual-salary-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.84 },
  },
  {
    id: 'apr-to-apy',
    slug: 'apr-to-apy-calculator',
    name: 'APR to APY Calculator',
    shortDesc: 'Convert a nominal APR into the effective annual yield for any compounding frequency.',
    tagline: 'The same rate earns more when it compounds.',
    category: 'finance',
    iconName: 'Percent',
    badge: 'Rates',
    featured: false,
    keywords: [
      'apr to apy calculator',
      'apy calculator',
      'effective annual rate calculator',
      'apr vs apy',
      'compound interest rate conversion',
      'nominal to effective rate',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'apr', label: 'Nominal APR', type: 'number', defaultValue: 6, min: 0, max: 100, step: 0.01, suffix: '%' },
        { id: 'compounds', label: 'Compounding periods per year', type: 'number', defaultValue: 12, min: 1, max: 365, step: 1 },
        { id: 'balance', label: 'Balance', type: 'number', defaultValue: 10000, min: 0, prefix: '$' },
      ],
      results: [
        {
          label: 'Effective APY',
          formulaCode: '(Math.pow(1 + apr / 100 / compounds, compounds) - 1) * 100',
          suffix: '%',
          accent: true,
        },
        { label: 'Periodic rate', formulaCode: 'apr / compounds', suffix: '%' },
        {
          label: 'First-year interest',
          formulaCode: 'balance * (Math.pow(1 + apr / 100 / compounds, compounds) - 1)',
          prefix: '$',
        },
        {
          label: 'APY minus APR',
          formulaCode: '(Math.pow(1 + apr / 100 / compounds, compounds) - 1) * 100 - apr',
          suffix: 'percentage points',
        },
        {
          label: 'Interest at simple APR',
          formulaCode: 'balance * apr / 100',
          prefix: '$',
        },
      ],
      formulaDescription: 'APY = (1 + APR / n)^n - 1, where n is the number of compounding periods per year.',
      tips: [
        'APR is a nominal annual rate. APY, also called the effective annual rate, includes the effect of compounding within the year.',
        'More frequent compounding raises APY for the same APR. Monthly compounding at 6 percent gives 6.168 percent; daily gives about 6.183 percent.',
        'For a loan, the APR may include fees, while this conversion only handles the nominal rate and compounding. Compare the APR quoted on the loan estimate.',
      ],
    },
    content: {
      intro:
        'The APR to APY Calculator converts a nominal annual percentage rate into the effective annual percentage yield for a chosen compounding frequency. It shows why two accounts advertising the same APR can pay different amounts over a year.',
      howItWorks:
        'The APR is divided by the number of compounding periods to get the periodic rate. One plus that rate is raised to the number of periods in a year, and one is subtracted to get the effective annual rate. Multiplying by 100 expresses it as a percentage. The balance field converts the rate difference into first-year interest and shows the simple-interest alternative for comparison.',
      example:
        'A 6 percent APR compounded monthly has a periodic rate of 0.5 percent. (1.005)^12 - 1 = 6.168 percent APY. On $10,000 that is about $616.78 of interest in the first year, compared with $600 at simple interest.',
      formulas: [
        { label: 'Periodic rate', expression: 'APR / compounding periods' },
        { label: 'APY', expression: '(1 + periodic rate)^periods - 1' },
        { label: 'First-year interest', expression: 'balance x APY' },
        { label: 'Rate advantage', expression: 'APY - APR' },
      ],
      sources: [
        {
          label: 'Consumer Financial Protection Bureau - APR and APY explained',
          expression: 'Annual percentage rate versus annual percentage yield',
          note: 'Explains how the two measures differ and why the compounding convention matters.',
        },
        {
          label: 'US SEC Investor.gov - Compound Interest',
          expression: 'Compounding frequency and effective return',
          note: 'Investor-focused explanation of compounding and effective annual yield.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Effective APY',
          explanation:
            'The true annual growth rate if interest compounds at the chosen frequency and nothing is withdrawn.',
        },
        {
          resultLabel: 'First-year interest',
          explanation:
            'APY applied to the balance you entered. It is a first-year illustration, not a projection of future rates.',
        },
        {
          resultLabel: 'APY minus APR',
          explanation:
            'The compounding bonus in percentage points. It grows with the rate and the frequency, and is small at low rates.',
        },
      ],
      workflowLinks: [
        { slug: 'compound-interest-calculator', step: 'Project the balance over several years at the effective rate.' },
        { slug: 'savings-goal-calculator', step: 'Work out how much to save each month for a target.' },
        { slug: 'simple-interest-calculator', step: 'Compare a simple-interest product with a compounding one.' },
      ],
      faqs: [
        {
          q: 'What is the difference between APR and APY?',
          a: 'APR is a nominal annual rate that ignores compounding within the year. APY, or effective annual rate, includes it. For savings, APY is the number to compare. For loans, APR may also include fees, so a loan APR is not directly comparable with a savings APY.',
        },
        {
          q: 'Why does more frequent compounding increase APY?',
          a: 'Interest is added to the balance more often, so later interest is earned on earlier interest. At 6 percent, annual compounding gives 6.000 percent, monthly gives 6.168 percent, and daily gives about 6.183 percent. The gain shrinks as frequency rises.',
        },
        {
          q: 'Can APY be lower than APR?',
          a: 'Not with positive nominal rates and more than one compounding period per year. APY equals APR when there is one annual compounding period and no fees. Negative rates or fee adjustments can change the relationship, but this calculator handles only the nominal rate.',
        },
        {
          q: 'Does this include account fees?',
          a: 'No. It converts a nominal rate, not a full APR disclosure. A loan APR includes certain finance charges, and a savings account may have maintenance fees that reduce the effective return. Read the account terms and the loan estimate.',
        },
        {
          q: 'How do I use this for a loan?',
          a: 'Use it to see the effect of compounding on a nominal rate, but do not treat the result as the loan APR. Loan APR includes fees and is calculated under specific disclosure rules. For borrowing, compare the APR on the loan estimate and the total interest over the term.',
        },
      ],
      related: ['compound-interest-calculator', 'savings-goal-calculator', 'simple-interest-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.82 },
  },
  {
    id: 'payback-period',
    slug: 'payback-period-calculator',
    name: 'Payback Period Calculator',
    shortDesc: 'Find how long an investment takes to repay its initial cost from annual cash flow.',
    tagline: 'How many years before the money comes back?',
    category: 'finance',
    iconName: 'Timer',
    badge: 'Investment',
    featured: false,
    keywords: [
      'payback period calculator',
      'how to calculate payback period',
      'investment payback calculator',
      'simple payback calculator',
      'cash flow payback',
      'payback period formula',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'initialInvestment', label: 'Initial investment', type: 'number', defaultValue: 50000, min: 1, prefix: '$' },
        { id: 'annualCashFlow', label: 'Annual net cash flow', type: 'number', defaultValue: 12000, min: 0.01, prefix: '$' },
        { id: 'targetYears', label: 'Target payback', type: 'number', defaultValue: 5, min: 0.1, suffix: 'years' },
      ],
      results: [
        { label: 'Payback period', formulaCode: 'initialInvestment / annualCashFlow', suffix: 'years', accent: true },
        { label: 'Payback in months', formulaCode: 'initialInvestment / annualCashFlow * 12', suffix: 'months' },
        {
          label: 'Cash flow needed for target',
          formulaCode: 'initialInvestment / targetYears',
          prefix: '$',
        },
        {
          label: 'Annual return on cost',
          formulaCode: 'annualCashFlow / initialInvestment * 100',
          suffix: '%',
        },
      ],
      formulaDescription:
        'Payback years = initial investment / annual net cash flow; target cash flow = investment / target years.',
      tips: [
        'Simple payback ignores the time value of money. A 4-year payback is not the same as a 4-year discounted payback when the discount rate is high.',
        'Use net cash flow after operating costs and taxes, not gross revenue. A payback built on revenue flatters the investment.',
        'Payback says nothing about what happens after the break-even point. A project can pay back quickly and then fail, or pay back slowly and earn for decades.',
      ],
    },
    content: {
      intro:
        'The Payback Period Calculator shows how many years and months an investment takes to return its initial cost from a steady annual cash flow. It also reports the annual return on cost and the cash flow required to hit a target payback.',
      howItWorks:
        'The initial investment is divided by the annual net cash flow. The result is the number of years to recover the outlay, assuming the cash flow is constant. Multiplying by 12 gives months. Dividing the investment by a target number of years shows the annual cash flow that target would require. Annual return on cost is the inverse of the payback period, expressed as a percentage.',
      example:
        'A $50,000 investment returning $12,000 a year pays back in 4.17 years, or 50 months. The annual return on cost is 24 percent. To pay back in 5 years, it would need $10,000 a year, so the actual cash flow clears that target.',
      formulas: [
        { label: 'Payback period', expression: 'initial investment / annual cash flow' },
        { label: 'Payback in months', expression: 'payback years x 12' },
        { label: 'Cash flow for target', expression: 'initial investment / target years' },
        { label: 'Return on cost', expression: 'annual cash flow / initial investment' },
      ],
      sources: [
        {
          label: 'US Department of Energy - Federal Energy Management Program, Simple Payback',
          expression: 'Simple payback calculation for energy projects',
          note: 'A public-sector explanation of the simple payback method and its limitations.',
        },
        {
          label: 'Project Management Institute - Project Economics and Cash Flow',
          expression: 'Payback, NPV, and discounted cash flow',
          note: 'Places payback alongside discounted methods that account for the time value of money.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Payback period',
          explanation:
            'Years to recover the initial outlay at a constant cash flow. It is a screening number, not a measure of total profit.',
        },
        {
          resultLabel: 'Cash flow needed for target',
          explanation:
            'The annual cash flow that would hit your target payback. Compare it with the realistic cash flow before committing.',
        },
        {
          resultLabel: 'Annual return on cost',
          explanation:
            'The reciprocal of payback, useful for a quick comparison with a savings rate. It ignores the timing of cash flows and any residual value.',
        },
      ],
      workflowLinks: [
        { slug: 'npv-calculator', step: 'Discount the cash flows to see whether the project adds value.' },
        { slug: 'irr-calculator', step: 'Find the annualised return implied by the cash flows.' },
        { slug: 'roi-calculator', step: 'Compare total profit with the investment over the holding period.' },
      ],
      faqs: [
        {
          q: 'What is a good payback period?',
          a: 'It depends on the risk and the life of the asset. A equipment upgrade might need a 2-3 year payback, while a building retrofit can accept longer. Compare against your cost of capital and the alternatives rather than a single universal threshold.',
        },
        {
          q: 'Does payback account for the time value of money?',
          a: 'Simple payback does not. Discounted payback does, by discounting each year of cash flow before accumulating it. At a high discount rate, the discounted payback is longer than the simple figure. Use NPV or IRR alongside payback for a fuller picture.',
        },
        {
          q: 'What if cash flow changes from year to year?',
          a: 'Simple payback assumes a constant annual figure. For uneven cash flows, accumulate the actual cash flow year by year until it covers the investment, then interpolate within that year. A spreadsheet or the NPV calculator with a cash flow schedule is more accurate.',
        },
        {
          q: 'Is payback the same as break-even?',
          a: 'No. Break-even usually means the sales volume or time at which revenue covers costs in a period. Payback is the time to recover a specific capital outlay. They can use similar arithmetic but answer different questions.',
        },
        {
          q: 'Should I include salvage value or resale?',
          a: 'Simple payback usually ignores it. If the asset has a known resale value, a discounted cash flow that includes the terminal value is a better measure of the investment. Including resale in payback effectively shortens the period and can make a weak project look strong.',
        },
      ],
      related: ['npv-calculator', 'irr-calculator', 'roi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.82 },
  },
  {
    id: 'cap-rate',
    slug: 'cap-rate-calculator',
    name: 'Cap Rate Calculator',
    shortDesc: 'Turn net operating income and property price into a cap rate, plus the value implied by a target cap.',
    tagline: 'The property yield before the mortgage.',
    category: 'finance',
    iconName: 'Home',
    badge: 'Real Estate',
    featured: false,
    keywords: [
      'cap rate calculator',
      'capitalization rate calculator',
      'how to calculate cap rate',
      'noi calculator',
      'rental property cap rate',
      'commercial property cap rate',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'price', label: 'Property price', type: 'number', defaultValue: 500000, min: 1, prefix: '$' },
        { id: 'grossRent', label: 'Annual gross rent', type: 'number', defaultValue: 60000, min: 0, prefix: '$' },
        { id: 'operatingExpenses', label: 'Annual operating expenses', type: 'number', defaultValue: 18000, min: 0, prefix: '$' },
        { id: 'vacancy', label: 'Vacancy and credit loss', type: 'number', defaultValue: 5, min: 0, max: 50, suffix: '%' },
        { id: 'targetCap', label: 'Target cap rate', type: 'number', defaultValue: 7, min: 0.1, max: 30, step: 0.1, suffix: '%' },
      ],
      results: [
        {
          label: 'Net operating income',
          formulaCode: 'grossRent * (1 - vacancy / 100) - operatingExpenses',
          prefix: '$',
        },
        {
          label: 'Cap rate',
          formulaCode: '(grossRent * (1 - vacancy / 100) - operatingExpenses) / price * 100',
          suffix: '%',
          accent: true,
        },
        {
          label: 'Value at target cap',
          formulaCode: '(grossRent * (1 - vacancy / 100) - operatingExpenses) / (targetCap / 100)',
          prefix: '$',
        },
        {
          label: 'Expense ratio',
          formulaCode: '(operatingExpenses + grossRent * vacancy / 100) / grossRent * 100',
          suffix: '%',
        },
      ],
      formulaDescription:
        'NOI = gross rent x (1 - vacancy) - operating expenses; cap rate = NOI / price.',
      tips: [
        'NOI excludes mortgage payments, income tax, depreciation, and capital improvements. It is a property-level operating figure.',
        'Use a realistic vacancy even if the property is currently full. A 5 percent allowance is a planning assumption, not a market guarantee.',
        'A lower cap rate means a higher price for the same income. It usually signals lower perceived risk or stronger growth expectations, not automatically a better deal.',
      ],
    },
    content: {
      intro:
        'The Cap Rate Calculator converts gross rent, vacancy, operating expenses, and price into net operating income and a capitalization rate. It also shows the value implied by a target cap rate, which is how buyers and sellers test a price against a required yield.',
      howItWorks:
        'Gross rent is reduced by a vacancy and credit loss allowance, then operating expenses are subtracted to get net operating income. Dividing NOI by the property price gives the cap rate. Rearranging the same relationship, NOI divided by a target cap rate gives the price that would produce that yield. The expense ratio shows how much of gross rent is consumed by vacancy and operating costs.',
      example:
        'A $500,000 property with $60,000 gross rent, 5 percent vacancy, and $18,000 operating expenses has NOI of $57,000 - $18,000 = $39,000. The cap rate is 7.8 percent. At a 7 percent target cap, the same NOI supports a value of $557,143.',
      formulas: [
        { label: 'NOI', expression: 'gross rent x (1 - vacancy) - operating expenses' },
        { label: 'Cap rate', expression: 'NOI / property price' },
        { label: 'Value at target cap', expression: 'NOI / target cap rate' },
        { label: 'Expense ratio', expression: '(operating expenses + vacancy loss) / gross rent' },
      ],
      sources: [
        {
          label: 'Appraisal Institute - The Appraisal of Real Estate',
          expression: 'Direct capitalization and net operating income',
          note: 'The standard appraisal text for the income approach and cap rate derivation.',
        },
        {
          label: 'CCIM Institute - Commercial Real Estate Financial Analysis',
          expression: 'NOI, cap rate, and property valuation',
          note: 'Industry guidance on applying cap rates consistently across comparable properties.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Net operating income',
          explanation:
            'Income after vacancy and operating expenses, before debt service. It is the numerator that drives both cap rate and value.',
        },
        {
          resultLabel: 'Cap rate',
          explanation:
            'NOI as a percentage of price. It is an unlevered yield, so it does not reflect the mortgage or the investor tax position.',
        },
        {
          resultLabel: 'Value at target cap',
          explanation:
            'The price that would deliver your target yield at the current NOI. A seller asking above this is pricing at a lower cap rate than you require.',
        },
      ],
      workflowLinks: [
        { slug: 'rental-yield-calculator', step: 'Compare gross and net rental yield on a residential let.' },
        { slug: 'cash-on-cash-return-calculator', step: 'Add the mortgage to see the levered cash return.' },
        { slug: 'property-tax-calculator', step: 'Check the tax line that belongs in operating expenses.' },
      ],
      faqs: [
        {
          q: 'What is a good cap rate?',
          a: 'It varies by property type, location, age, tenant quality, and interest rates. A stable leased asset in a strong market often trades at a lower cap rate than a tired property in a weak one. Compare cap rates for genuinely similar properties and check what the NOI excludes.',
        },
        {
          q: 'Does cap rate include the mortgage?',
          a: 'No. Cap rate is unlevered: it uses NOI before debt service. That is deliberate, because it lets buyers compare properties regardless of financing. The levered return is cash-on-cash return, which subtracts mortgage payments from NOI.',
        },
        {
          q: 'What belongs in operating expenses?',
          a: 'Recurring costs of running the property: property tax, insurance, maintenance, repairs, management, utilities paid by the owner, and a reserve for turnover. Exclude mortgage principal and interest, income tax, depreciation, and major capital improvements that add value.',
        },
        {
          q: 'Why is my cap rate different from the listing?',
          a: 'Listing cap rates often use pro forma rent, omit a vacancy allowance, or leave out reserves and management. Recalculate from actual trailing income and a full expense list. A small difference in NOI moves the cap rate meaningfully at low yields.',
        },
        {
          q: 'Can I use cap rate for a single-family rental?',
          a: 'Yes, but it is less standardized than for commercial property. Residential buyers often focus on gross rent multiplier, cash-on-cash return, and comparable sales. Cap rate is still useful for comparing the unlevered yield of two rentals with similar expense structures.',
        },
      ],
      related: ['rental-yield-calculator', 'cash-on-cash-return-calculator', 'property-tax-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.84 },
  },
  {
    id: 'cash-on-cash',
    slug: 'cash-on-cash-return-calculator',
    name: 'Cash-on-Cash Return Calculator',
    shortDesc: 'Measure the annual pre-tax cash flow against the actual cash invested in a rental property.',
    tagline: 'The return on the money you actually put in.',
    category: 'finance',
    iconName: 'LineChart',
    badge: 'Real Estate',
    featured: false,
    keywords: [
      'cash on cash return calculator',
      'cash on cash calculator',
      'rental property cash return',
      'real estate cash flow calculator',
      'coc return calculator',
      'leveraged rental return',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'purchasePrice', label: 'Purchase price', type: 'number', defaultValue: 400000, min: 1, prefix: '$' },
        { id: 'downPayment', label: 'Down payment', type: 'number', defaultValue: 80000, min: 0, prefix: '$' },
        { id: 'closingCosts', label: 'Closing costs', type: 'number', defaultValue: 8000, min: 0, prefix: '$' },
        { id: 'annualNOI', label: 'Annual net operating income', type: 'number', defaultValue: 32000, min: 0, prefix: '$' },
        { id: 'annualDebtService', label: 'Annual debt service', type: 'number', defaultValue: 24000, min: 0, prefix: '$' },
        { id: 'targetReturn', label: 'Target cash-on-cash return', type: 'number', defaultValue: 10, min: 0, max: 50, step: 0.5, suffix: '%' },
      ],
      results: [
        {
          label: 'Total cash invested',
          formulaCode: 'downPayment + closingCosts',
          prefix: '$',
        },
        {
          label: 'Annual pre-tax cash flow',
          formulaCode: 'annualNOI - annualDebtService',
          prefix: '$',
        },
        {
          label: 'Cash-on-cash return',
          formulaCode: '(annualNOI - annualDebtService) / (downPayment + closingCosts) * 100',
          suffix: '%',
          accent: true,
        },
        {
          label: 'Cash flow needed for target',
          formulaCode: '(downPayment + closingCosts) * targetReturn / 100',
          prefix: '$',
        },
        {
          label: 'Loan amount',
          formulaCode: 'purchasePrice - downPayment',
          prefix: '$',
        },
      ],
      formulaDescription:
        'Cash-on-cash = (NOI - debt service) / (down payment + closing costs).',
      tips: [
        'Cash invested is the money that leaves your account at closing: down payment plus closing costs, and any immediate repairs you fund.',
        'NOI is before mortgage payments but after vacancy, operating expenses, and reserves. Do not use gross rent as NOI.',
        'Cash-on-cash ignores appreciation, principal paydown, and tax benefits. It measures current cash yield, not total return.',
      ],
    },
    content: {
      intro:
        'The Cash-on-Cash Return Calculator measures the annual pre-tax cash flow of a rental property against the cash actually invested to buy it. It is the levered counterpart to cap rate and the number that tells you whether the deal pays you while you hold it.',
      howItWorks:
        'Cash invested is the down payment plus closing costs. Annual cash flow is net operating income minus annual debt service. Dividing cash flow by cash invested gives the cash-on-cash return. The calculator also reports the loan amount and the cash flow that would hit your target return, so you can see the gap before you make an offer.',
      example:
        'A $400,000 property with an $80,000 down payment and $8,000 closing costs uses $88,000 of cash. NOI of $32,000 minus $24,000 of debt service leaves $8,000 of cash flow. Cash-on-cash return is $8,000 / $88,000 = 9.09 percent. A 10 percent target would need $8,800 of cash flow.',
      formulas: [
        { label: 'Cash invested', expression: 'down payment + closing costs' },
        { label: 'Pre-tax cash flow', expression: 'NOI - annual debt service' },
        { label: 'Cash-on-cash return', expression: 'cash flow / cash invested' },
        { label: 'Cash flow for target', expression: 'cash invested x target return' },
      ],
      sources: [
        {
          label: 'CCIM Institute - Commercial Real Estate Financial Analysis',
          expression: 'Cash-on-cash and levered return measures',
          note: 'Industry reference for the relationship between NOI, debt service, and equity cash flow.',
        },
        {
          label: 'IRS Publication 527 - Residential Rental Property',
          expression: 'Rental income, expenses, and depreciation',
          note: 'Explains which costs are deductible and why taxable income differs from cash flow.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Annual pre-tax cash flow',
          explanation:
            'NOI minus debt service, before income tax. It is the cash the property produces while you hold it, assuming the NOI and mortgage figures are accurate.',
        },
        {
          resultLabel: 'Cash-on-cash return',
          explanation:
            'The current cash yield on the equity you invested. It rises with leverage when the cap rate exceeds the mortgage constant, and falls when it does not.',
        },
        {
          resultLabel: 'Cash flow needed for target',
          explanation:
            'The annual cash flow that would deliver your target return. Compare it with the realistic cash flow after a vacancy and repair allowance.',
        },
      ],
      workflowLinks: [
        { slug: 'cap-rate-calculator', step: 'See the unlevered yield before the mortgage.' },
        { slug: 'rental-yield-calculator', step: 'Compare gross and net yield on the same property.' },
        { slug: 'mortgage-calculator', step: 'Calculate the debt service used in the cash flow.' },
      ],
      faqs: [
        {
          q: 'What is the difference between cash-on-cash and cap rate?',
          a: 'Cap rate divides NOI by the property price and ignores financing. Cash-on-cash divides cash flow after debt service by the cash invested. A property can have a 6 percent cap rate and a 12 percent cash-on-cash return with heavy leverage, but the leverage also increases risk.',
        },
        {
          q: 'Should closing costs be included in cash invested?',
          a: 'Yes. They are cash out of pocket that the investment must earn back. Include lender fees, title, appraisal, recording, and any immediate repairs. Exclude costs paid by the seller or financed into the loan.',
        },
        {
          q: 'Does cash-on-cash include principal paydown?',
          a: 'No. Debt service includes principal and interest, so principal paydown is already reducing cash flow. The wealth built through principal is a separate return component, captured by total return or IRR, not by cash-on-cash.',
        },
        {
          q: 'What is a good cash-on-cash return?',
          a: 'It depends on the market, property type, and risk. Many investors target 8-12 percent in stable markets, but a high return can signal a risky or management-intensive property. Compare it with the cap rate, the mortgage terms, and the reserves you will need.',
        },
        {
          q: 'How do reserves affect the calculation?',
          a: 'A reserve for repairs, turnover, and capital replacements is an operating expense in a conservative NOI. If you leave it out, cash-on-cash looks better than the cash you can actually spend. Include a realistic reserve before judging the return.',
        },
      ],
      related: ['cap-rate-calculator', 'rental-yield-calculator', 'mortgage-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.82 },
  },
  {
    id: 'house-flip',
    slug: 'house-flip-calculator',
    name: 'House Flip Calculator',
    shortDesc: 'Add purchase, rehab, and holding costs, subtract selling costs from the resale value, and see profit and ROI.',
    tagline: 'Profit is what is left after everything.',
    category: 'finance',
    iconName: 'Home',
    badge: 'Real Estate',
    featured: false,
    keywords: [
      'house flip calculator',
      'fix and flip calculator',
      'flip profit calculator',
      '70 percent rule calculator',
      'rehab roi calculator',
      'house flipping costs',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'purchasePrice', label: 'Purchase price', type: 'number', defaultValue: 150000, min: 1, prefix: '$' },
        { id: 'rehabCost', label: 'Rehab cost', type: 'number', defaultValue: 40000, min: 0, prefix: '$' },
        { id: 'holdingCosts', label: 'Holding costs', type: 'number', defaultValue: 5000, min: 0, prefix: '$' },
        { id: 'afterRepairValue', label: 'After-repair value', type: 'number', defaultValue: 250000, min: 1, prefix: '$' },
        { id: 'sellingCostPercent', label: 'Selling costs', type: 'number', defaultValue: 8, min: 0, max: 20, step: 0.5, suffix: '%' },
      ],
      results: [
        {
          label: 'Total project cost',
          formulaCode: 'purchasePrice + rehabCost + holdingCosts',
          prefix: '$',
        },
        {
          label: 'Net sale proceeds',
          formulaCode: 'afterRepairValue * (1 - sellingCostPercent / 100)',
          prefix: '$',
        },
        {
          label: 'Profit',
          formulaCode: 'afterRepairValue * (1 - sellingCostPercent / 100) - (purchasePrice + rehabCost + holdingCosts)',
          prefix: '$',
          accent: true,
        },
        {
          label: 'Return on cost',
          formulaCode:
            '(afterRepairValue * (1 - sellingCostPercent / 100) - (purchasePrice + rehabCost + holdingCosts)) / (purchasePrice + rehabCost + holdingCosts) * 100',
          suffix: '%',
        },
        {
          label: '70 percent rule max offer',
          formulaCode: 'afterRepairValue * 0.7 - rehabCost',
          prefix: '$',
        },
      ],
      formulaDescription:
        'Profit = ARV x (1 - selling costs) - (purchase + rehab + holding); return = profit / total cost.',
      tips: [
        'The 70 percent rule is a screening heuristic, not a law: maximum offer = 70 percent of ARV minus rehab. It leaves room for selling costs, holding, and profit.',
        'Holding costs include loan interest, taxes, insurance, utilities, and security for every month you own the property, not just the rehab period.',
        'Use a realistic ARV from comparable sold properties, not the agent estimate that makes the deal work. A 5 percent ARV miss can erase the profit.',
      ],
    },
    content: {
      intro:
        'The House Flip Calculator totals the money a flip consumes and compares it with the net proceeds after selling costs. It reports profit, return on total cost, and the maximum offer implied by the common 70 percent rule, so you can screen a deal before spending on inspections.',
      howItWorks:
        'Total project cost is purchase price plus rehab plus holding costs. Net sale proceeds are the after-repair value reduced by the selling cost percentage for commissions, closing fees, and concessions. Profit is net proceeds minus total cost. Return on cost divides profit by total cost. The 70 percent rule subtracts rehab from 70 percent of ARV to suggest a maximum purchase price.',
      example:
        'Buy at $150,000, spend $40,000 on rehab and $5,000 on holding. The after-repair value is $250,000 and selling costs are 8 percent, so net proceeds are $230,000. Total cost is $195,000, profit is $35,000, and return on cost is 17.9 percent. The 70 percent rule suggests a maximum offer of $135,000.',
      formulas: [
        { label: 'Total project cost', expression: 'purchase + rehab + holding' },
        { label: 'Net sale proceeds', expression: 'ARV x (1 - selling cost %)' },
        { label: 'Profit', expression: 'net proceeds - total project cost' },
        { label: 'Return on cost', expression: 'profit / total project cost' },
        { label: '70 percent rule offer', expression: 'ARV x 0.70 - rehab' },
      ],
      sources: [
        {
          label: 'IRS Publication 523 - Selling Your Home',
          expression: 'Basis, improvements, and selling costs',
          note: 'Explains how acquisition and improvement costs affect taxable gain. It is not a flip-specific tax guide.',
        },
        {
          label: 'Consumer Financial Protection Bureau - Closing costs',
          expression: 'Buying and selling transaction costs',
          note: 'A consumer reference for the fees that belong in the selling cost percentage.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Total project cost',
          explanation:
            'Everything spent to acquire, improve, and hold the property. It excludes the selling costs, which are netted from the sale price instead.',
        },
        {
          resultLabel: 'Profit',
          explanation:
            'Pre-tax profit after selling costs. It does not include financing points, income tax, or the cost of your own time.',
        },
        {
          resultLabel: '70 percent rule max offer',
          explanation:
            'A quick screening ceiling, not a valuation. It assumes selling and holding costs fit inside the 30 percent margin and that rehab is accurate.',
        },
      ],
      workflowLinks: [
        { slug: 'closing-cost-calculator', step: 'Estimate the buying and selling transaction costs.' },
        { slug: 'moving-cost-calculator', step: 'Add relocation and storage to the holding budget.' },
        { slug: 'roi-calculator', step: 'Compare the flip return with another use of the capital.' },
      ],
      faqs: [
        {
          q: 'What is the 70 percent rule?',
          a: 'A common house-flipping heuristic: do not pay more than 70 percent of the after-repair value minus the rehab cost. It is meant to leave room for selling costs, holding costs, and profit. It is not a law or a guarantee, and it fits some markets better than others.',
        },
        {
          q: 'What should holding costs include?',
          a: 'Property tax, insurance, utilities, loan interest, HOA dues, lawn and security, and any rent you pay while the project runs. Add a contingency for delays. A flip that takes four months instead of three can lose more in holding than it saved on a finish.',
        },
        {
          q: 'How accurate is the after-repair value?',
          a: 'Only as accurate as the comparable sales behind it. Use recent closed sales of similar size, condition, and location, and adjust for differences. Do not use active listings or a value that assumes a finish level you are not funding.',
        },
        {
          q: 'Does the calculator include taxes and financing?',
          a: 'No. Profit is pre-tax and excludes loan origination, points, and any penalty for a short holding period. A hard-money loan can consume a large share of the spread. Model financing separately before committing.',
        },
        {
          q: 'What return should a flip target?',
          a: 'Many flippers look for a profit margin of 15-20 percent of the after-repair value, or a return on cost in the high teens or better, to compensate for execution risk. The right target depends on the market, the holding period, and how much of the work you do yourself.',
        },
      ],
      related: ['closing-cost-calculator', 'moving-cost-calculator', 'roi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.82 },
  },
  {
    id: 'credit-utilization',
    slug: 'credit-utilization-calculator',
    name: 'Credit Utilization Calculator',
    shortDesc: 'Calculate utilization from balances and limits, plus the balance to reach 30 percent or 10 percent.',
    tagline: 'The ratio that moves a credit score.',
    category: 'finance',
    iconName: 'CreditCard',
    badge: 'Credit',
    featured: false,
    keywords: [
      'credit utilization calculator',
      'credit utilization ratio',
      'how to calculate credit utilization',
      'credit score utilization',
      'pay down credit cards',
      'credit limit calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'balances', label: 'Total card balances', type: 'number', defaultValue: 4500, min: 0, prefix: '$' },
        { id: 'limits', label: 'Total credit limits', type: 'number', defaultValue: 15000, min: 1, prefix: '$' },
        { id: 'target', label: 'Target utilization', type: 'number', defaultValue: 10, min: 0, max: 100, suffix: '%' },
      ],
      results: [
        {
          label: 'Credit utilization',
          formulaCode: 'balances / limits * 100',
          suffix: '%',
          accent: true,
        },
        {
          label: 'Available credit',
          formulaCode: 'limits - balances',
          prefix: '$',
        },
        {
          label: 'Balance at 30 percent',
          formulaCode: 'limits * 0.3',
          prefix: '$',
        },
        {
          label: 'Balance at target',
          formulaCode: 'limits * target / 100',
          prefix: '$',
        },
        {
          label: 'Pay down to target',
          formulaCode: 'Math.max(0, balances - limits * target / 100)',
          prefix: '$',
        },
      ],
      formulaDescription: 'Utilization = balances / credit limits; paydown = balance - limit x target.',
      tips: [
        'Utilization is usually calculated per card and across all cards. A maxed-out card can hurt even if the overall ratio looks fine.',
        'Issuers report balances on the statement closing date, not the payment due date. Paying before the statement closes can lower the reported balance.',
        'Closing a card reduces total available credit and can raise utilization. Keep the account open if it has no fee and you can manage it.',
      ],
    },
    content: {
      intro:
        'The Credit Utilization Calculator divides total card balances by total credit limits and shows the balance to reach a target ratio. It also reports available credit, so you can see how much headroom remains before utilization climbs.',
      howItWorks:
        'Balances are divided by total limits and multiplied by 100 to get the utilization percentage. The target balance is the limit multiplied by the target percentage. Pay down to target is the current balance minus that target, floored at zero because a negative paydown means you are already below the target.',
      example:
        'A $4,500 balance on $15,000 of limits is 30 percent utilization. Available credit is $10,500. To reach 10 percent, the balance needs to be $1,500, so you would pay down $3,000.',
      formulas: [
        { label: 'Utilization', expression: 'balances / limits' },
        { label: 'Available credit', expression: 'limits - balances' },
        { label: 'Target balance', expression: 'limits x target %' },
        { label: 'Paydown required', expression: 'max(0, balances - target balance)' },
      ],
      sources: [
        {
          label: 'Consumer Financial Protection Bureau - How to improve your credit score',
          expression: 'Credit utilization and score factors',
          note: 'Consumer guidance on the amount owed factor and paying down balances.',
        },
        {
          label: 'FICO - What is credit utilization?',
          expression: 'Revolving utilization in score calculation',
          note: 'Explains that utilization is a major score factor and is evaluated both overall and per account.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Credit utilization',
          explanation:
            'The share of your revolving limits in use. Lower is generally better for scores, but zero on every card is not required.',
        },
        {
          resultLabel: 'Balance at target',
          explanation:
            'The balance that produces your target ratio across all cards. A single card can still be over the target even when the total is under.',
        },
        {
          resultLabel: 'Pay down to target',
          explanation:
            'The payment needed to reach the target, assuming limits do not change and no new charges are added before the statement closes.',
        },
      ],
      workflowLinks: [
        { slug: 'credit-card-payoff-calculator', step: 'Plan the monthly payment that clears the balance.' },
        { slug: 'credit-card-interest-calculator', step: 'See how much interest the balance is costing.' },
        { slug: 'debt-to-income-calculator', step: 'Check the other ratio lenders review.' },
      ],
      faqs: [
        {
          q: 'What utilization ratio should I aim for?',
          a: 'Many credit models reward utilization below 30 percent, and scores often improve further below 10 percent. There is no universal cutoff, and the scoring model matters. Paying in full each month is the simplest way to keep reported utilization low.',
        },
        {
          q: 'Is utilization calculated per card or overall?',
          a: 'Both. Scoring models consider total revolving utilization and individual account utilization. A maxed-out card can hurt even if your overall ratio is low, so spread balances across cards or pay the highest-utilization card first.',
        },
        {
          q: 'When is the balance reported to the credit bureaus?',
          a: 'Most issuers report once a month, often around the statement closing date. A payment made after the statement closes may not reduce the balance in that reporting cycle. Check your statement date and pay before it if utilization is the goal.',
        },
        {
          q: 'Does closing a card help my utilization?',
          a: 'Usually not. Closing a card reduces total available credit while the balance stays the same, which raises the ratio. It can also shorten the average account age. Keep the card open unless the fee or spending risk outweighs the score effect.',
        },
        {
          q: 'Does paying off a card immediately improve my score?',
          a: 'Utilization is generally reported monthly, so the effect appears after the next reporting cycle, not instantly. Payment history and other factors also matter. A single payment can help, but the score update follows the issuer report and the scoring model timing.',
        },
      ],
      related: ['credit-card-payoff-calculator', 'credit-card-interest-calculator', 'debt-to-income-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.84 },
  },
  {
    id: 'severance',
    slug: 'severance-pay-calculator',
    name: 'Severance Pay Calculator',
    shortDesc: 'Estimate severance weeks and gross pay from weekly pay, service years, policy weeks, and a minimum.',
    tagline: 'Put a number on the exit package.',
    category: 'finance',
    iconName: 'Wallet',
    badge: 'Payroll',
    featured: false,
    keywords: [
      'severance pay calculator',
      'how much severance will i get',
      'severance package calculator',
      'weeks of severance',
      'severance pay formula',
      'redundancy pay calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'weeklyPay', label: 'Weekly pay', type: 'number', defaultValue: 1200, min: 0, prefix: '$' },
        { id: 'yearsOfService', label: 'Years of service', type: 'number', defaultValue: 6, min: 0, step: 0.5, suffix: 'years' },
        { id: 'weeksPerYear', label: 'Weeks per year of service', type: 'number', defaultValue: 2, min: 0, step: 0.5 },
        { id: 'minimumWeeks', label: 'Minimum weeks', type: 'number', defaultValue: 4, min: 0, step: 0.5 },
        { id: 'withholding', label: 'Estimated withholding', type: 'number', defaultValue: 22, min: 0, max: 60, suffix: '%' },
      ],
      results: [
        {
          label: 'Severance weeks',
          formulaCode: 'Math.max(minimumWeeks, yearsOfService * weeksPerYear)',
          suffix: 'weeks',
          accent: true,
        },
        {
          label: 'Gross severance',
          formulaCode: 'Math.max(minimumWeeks, yearsOfService * weeksPerYear) * weeklyPay',
          prefix: '$',
        },
        {
          label: 'Estimated withholding',
          formulaCode: 'Math.max(minimumWeeks, yearsOfService * weeksPerYear) * weeklyPay * withholding / 100',
          prefix: '$',
        },
        {
          label: 'Estimated net',
          formulaCode:
            'Math.max(minimumWeeks, yearsOfService * weeksPerYear) * weeklyPay * (1 - withholding / 100)',
          prefix: '$',
        },
      ],
      formulaDescription:
        'Weeks = max(minimum, years x weeks per year); gross = weeks x weekly pay.',
      tips: [
        'Severance is not required by federal law in the US. It comes from an employer policy, an individual contract, a union agreement, or a negotiated exit.',
        'The weekly pay used should reflect the regular rate, not a one-off bonus or reimbursement. Check whether commissions or overtime are included in your policy.',
        'Severance is generally taxable as wages. The withholding rate here is an estimate, not a tax calculation; the final amount depends on your tax situation.',
      ],
    },
    content: {
      intro:
        'The Severance Pay Calculator estimates the number of severance weeks and the gross and net amount from weekly pay, years of service, a policy formula, and a minimum. It is a planning tool for comparing an offer with a policy, not legal advice on entitlement.',
      howItWorks:
        'The policy formula multiplies years of service by weeks per year, then applies the minimum if the result is lower. Those weeks are multiplied by weekly pay to get gross severance. The withholding percentage is applied to estimate tax and deductions, and the remainder is the estimated net. Real withholding depends on the jurisdiction and how the payment is classified.',
      example:
        'Six years of service at two weeks per year gives 12 weeks, which is above the four-week minimum. At $1,200 a week, gross severance is $14,400. At an estimated 22 percent withholding, about $3,168 is withheld and the net is about $11,232.',
      formulas: [
        { label: 'Severance weeks', expression: 'max(minimum weeks, years x weeks per year)' },
        { label: 'Gross severance', expression: 'severance weeks x weekly pay' },
        { label: 'Estimated withholding', expression: 'gross x withholding %' },
        { label: 'Estimated net', expression: 'gross - withholding' },
      ],
      sources: [
        {
          label: 'US Department of Labor - Severance Pay',
          expression: 'When severance pay is required',
          note: 'Explains that severance is generally a matter of policy or agreement rather than a federal statutory minimum.',
        },
        {
          label: 'IRS Publication 15-A - Employer Supplemental Wage Withholding',
          expression: 'Tax treatment of severance payments',
          note: 'Severance is generally treated as supplemental wages, with specific withholding methods.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Severance weeks',
          explanation:
            'The policy formula result after applying the minimum. Part years are included as the decimal you enter; many policies round service differently.',
        },
        {
          resultLabel: 'Gross severance',
          explanation:
            'The amount before tax. It excludes accrued vacation, unused sick leave, bonuses, and continuation of benefits unless your policy adds them.',
        },
        {
          resultLabel: 'Estimated net',
          explanation:
            'Gross minus a flat withholding estimate. It is not a tax return result and may differ from the actual deposit.',
        },
      ],
      workflowLinks: [
        { slug: 'take-home-pay-calculator', step: 'Compare the severance with normal take-home pay.' },
        { slug: 'emergency-fund-calculator', step: 'Work out how long the package covers essential costs.' },
        { slug: 'budget-calculator', step: 'Set a monthly spending plan for the gap between jobs.' },
      ],
      faqs: [
        {
          q: 'Is severance pay required by law?',
          a: 'In the US, federal law does not require severance pay. It may be required by an employment contract, a union agreement, a company policy, or state law in specific situations such as a mass layoff under the WARN Act. Read the documents that apply to your job.',
        },
        {
          q: 'How is severance taxed?',
          a: 'Severance is generally treated as supplemental wages and is subject to income tax and payroll taxes. The withholding method can be a flat percentage or the aggregate method, so the amount withheld may not match your eventual tax. A tax adviser can estimate the final liability.',
        },
        {
          q: 'Does unused vacation count as severance?',
          a: 'Usually not. Accrued vacation is a separate wage owed under state law or policy, and it may be paid as a lump sum. It should be added to the package but not counted as severance weeks unless the employer says so.',
        },
        {
          q: 'Can I negotiate severance?',
          a: 'Sometimes, especially if you have leverage such as a strong record, pending claims, or a role that is hard to replace. Negotiation may cover weeks, health coverage, vesting, references, and confidentiality. Get any agreement in writing and consider legal advice before signing a release.',
        },
        {
          q: 'How do I compare a severance offer with a new job?',
          a: 'Convert the package to a monthly budget, subtract tax, and divide by your essential monthly costs to see the runway. Then compare the new salary and start date. A larger package with a long non-compete may be worth less than a smaller one that lets you start immediately.',
        },
      ],
      related: ['take-home-pay-calculator', 'emergency-fund-calculator', 'budget-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.78 },
  },
  {
    id: 'dividend-yield',
    slug: 'dividend-yield-calculator',
    name: 'Dividend Yield Calculator',
    shortDesc: 'Calculate current yield, yield on cost, and annual dividend income from your share count.',
    tagline: 'Current yield and the yield you actually bought.',
    category: 'finance',
    iconName: 'TrendingUp',
    badge: 'Investing',
    featured: false,
    keywords: [
      'dividend yield calculator',
      'how to calculate dividend yield',
      'yield on cost calculator',
      'dividend income calculator',
      'annual dividend calculator',
      'stock yield calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'annualDividend', label: 'Annual dividend per share', type: 'number', defaultValue: 2.4, min: 0, step: 0.01, prefix: '$' },
        { id: 'sharePrice', label: 'Current share price', type: 'number', defaultValue: 60, min: 0.01, prefix: '$' },
        { id: 'shares', label: 'Shares owned', type: 'number', defaultValue: 100, min: 0, step: 1 },
        { id: 'costBasis', label: 'Purchase price per share', type: 'number', defaultValue: 40, min: 0, prefix: '$' },
      ],
      results: [
        {
          label: 'Current dividend yield',
          formulaCode: 'annualDividend / sharePrice * 100',
          suffix: '%',
          accent: true,
        },
        {
          label: 'Yield on cost',
          formulaCode: 'annualDividend / costBasis * 100',
          suffix: '%',
        },
        {
          label: 'Annual dividend income',
          formulaCode: 'annualDividend * shares',
          prefix: '$',
        },
        {
          label: 'Current position value',
          formulaCode: 'sharePrice * shares',
          prefix: '$',
        },
        {
          label: 'Total cost basis',
          formulaCode: 'costBasis * shares',
          prefix: '$',
        },
      ],
      formulaDescription:
        'Current yield = annual dividend / current price; yield on cost = annual dividend / purchase price.',
      tips: [
        'Current yield moves inversely with price. A falling share price raises the yield, which can signal risk rather than opportunity.',
        'Yield on cost uses your original purchase price, so it can look high after years of dividend increases and price appreciation.',
        'A high yield can be a warning. Check the payout ratio and free cash flow before assuming the dividend is safe.',
      ],
    },
    content: {
      intro:
        'The Dividend Yield Calculator reports the current yield, the yield on your original cost, and the annual income from your share count. It separates the yield a new buyer sees from the yield you locked in when you bought.',
      howItWorks:
        'Current yield is the annual dividend per share divided by the current share price. Yield on cost uses the purchase price instead, so it rises as the company increases its dividend. Annual income is the dividend per share times the number of shares, and position value and cost basis show the capital side of the same holding.',
      example:
        'A stock paying $2.40 a year and trading at $60 yields 4 percent. If you bought 100 shares at $40, your yield on cost is 6 percent. The annual income is $240, the position is worth $6,000, and your cost basis is $4,000.',
      formulas: [
        { label: 'Current yield', expression: 'annual dividend / current price' },
        { label: 'Yield on cost', expression: 'annual dividend / purchase price' },
        { label: 'Annual income', expression: 'annual dividend x shares' },
        { label: 'Position value', expression: 'current price x shares' },
      ],
      sources: [
        {
          label: 'US SEC Investor.gov - Dividend',
          expression: 'How dividends and yields work',
          note: 'Investor education on dividend payments and the difference between yield and total return.',
        },
        {
          label: 'CFA Institute - Equity Valuation: Dividends and Yield',
          expression: 'Dividend yield and payout ratios',
          note: 'Explains why yield alone is not a valuation or safety measure.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Current dividend yield',
          explanation:
            'The income rate a buyer gets at today price. It changes every day with the share price, even if the dividend does not.',
        },
        {
          resultLabel: 'Yield on cost',
          explanation:
            'The income rate on what you paid. It is a personal performance measure, not a comparison with the current market.',
        },
        {
          resultLabel: 'Annual dividend income',
          explanation:
            'Dividend per share times shares, before tax and withholding. It assumes the dividend is maintained for a full year.',
        },
      ],
      workflowLinks: [
        { slug: 'roi-calculator', step: 'Add price change to dividend income for total return.' },
        { slug: 'compound-interest-calculator', step: 'Project reinvested dividends over time.' },
        { slug: 'investment-roi-calculator', step: 'Compare the holding with another investment.' },
      ],
      faqs: [
        {
          q: 'What is a good dividend yield?',
          a: 'It depends on the sector, the payout ratio, and the risk-free rate. A utility might pay 4 percent with stable cash flow, while a 7 percent yield in a cyclical company can signal a dividend cut. Compare yield with payout ratio, debt, and free cash flow rather than a single threshold.',
        },
        {
          q: 'What is yield on cost?',
          a: 'The annual dividend divided by your original purchase price. If you bought at $40 and the dividend is $2.40, your yield on cost is 6 percent even if the shares now trade at $60 and yield 4 percent. It measures the income return on your invested capital.',
        },
        {
          q: 'Why does a high dividend yield sometimes mean risk?',
          a: 'Yield rises when the price falls or the dividend rises. If the price has fallen because the business is deteriorating, the market may expect a cut. Check the payout ratio, earnings, and cash flow before treating a high yield as income.',
        },
        {
          q: 'Are dividends guaranteed?',
          a: 'No. A board can reduce or suspend a dividend, and preferred dividends can be deferred under their terms. Common dividends are not a contractual obligation. Diversify across issuers and keep an emergency reserve rather than relying on one payout.',
        },
        {
          q: 'How are dividends taxed?',
          a: 'In the US, qualified dividends are generally taxed at capital gains rates, while ordinary dividends are taxed as income. The treatment depends on the issuer, your holding period, and your jurisdiction. This calculator reports pre-tax income only.',
        },
      ],
      related: ['roi-calculator', 'compound-interest-calculator', 'investment-roi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.82 },
  },
  {
    id: 'basis-points',
    slug: 'basis-points-calculator',
    name: 'Basis Points Calculator',
    shortDesc: 'Convert basis points into a percentage rate change and the dollar impact on a balance.',
    tagline: 'One basis point is one hundredth of a percent.',
    category: 'finance',
    iconName: 'Scale',
    badge: 'Rates',
    featured: false,
    keywords: [
      'basis points calculator',
      'bps calculator',
      'how to calculate basis points',
      'basis point to percentage',
      'rate change calculator',
      '100 basis points',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'value', label: 'Balance or loan amount', type: 'number', defaultValue: 250000, min: 0, prefix: '$' },
        { id: 'basisPoints', label: 'Rate change', type: 'number', defaultValue: 75, min: -1000, max: 1000, step: 1, suffix: 'bps' },
      ],
      results: [
        {
          label: 'Rate change',
          formulaCode: 'basisPoints / 100',
          suffix: '%',
          accent: true,
        },
        {
          label: 'Value change',
          formulaCode: 'value * basisPoints / 10000',
          prefix: '$',
        },
        {
          label: 'New value',
          formulaCode: 'value * (1 + basisPoints / 10000)',
          prefix: '$',
        },
        {
          label: 'One basis point is worth',
          formulaCode: 'value / 10000',
          prefix: '$',
        },
      ],
      formulaDescription:
        '1 basis point = 0.01 percentage point; value change = balance x bps / 10,000.',
      tips: [
        'One basis point is 0.01 percent, so 100 bps is 1 percent and 25 bps is 0.25 percent.',
        'On a $250,000 loan, one basis point is $25 of interest a year on the full balance, before amortisation.',
        'Basis points remove ambiguity. Saying "a 50 basis point cut" is clearer than "a half percent cut", which some readers hear as half of the existing rate.',
      ],
    },
    content: {
      intro:
        'The Basis Points Calculator converts a basis point change into a percentage and a dollar amount on a balance or loan. It also shows what one basis point is worth, which makes a rate negotiation easier to price.',
      howItWorks:
        'One basis point is one hundredth of a percentage point, so dividing basis points by 100 gives the percentage change. Dividing by 10,000 and multiplying by the balance gives the dollar change. Adding that change to the balance gives the new value. The one-basis-point result divides the balance by 10,000.',
      example:
        'A 75 basis point change on a $250,000 balance is 0.75 percent, or $1,875. The new value is $251,875, and one basis point is worth $25.',
      formulas: [
        { label: 'Percentage change', expression: 'basis points / 100' },
        { label: 'Dollar change', expression: 'balance x basis points / 10,000' },
        { label: 'New value', expression: 'balance x (1 + basis points / 10,000)' },
        { label: 'Value of one bp', expression: 'balance / 10,000' },
      ],
      sources: [
        {
          label: 'US Federal Reserve - Selected Interest Rates (H.15)',
          expression: 'Rate changes quoted in basis points',
          note: 'The Fed publishes market rates, and basis points are the standard unit for changes.',
        },
        {
          label: 'US SEC Investor.gov - Interest Rate',
          expression: 'Percentage points and rate changes',
          note: 'Investor education on how rate changes affect borrowing and savings.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Rate change',
          explanation:
            'The basis point change expressed as a percentage. A negative value is a rate cut, and the calculator handles it as a decrease.',
        },
        {
          resultLabel: 'Value change',
          explanation:
            'The dollar effect on the full balance for a one-year change, before compounding or amortisation. For a loan, the interest effect declines as principal is repaid.',
        },
        {
          resultLabel: 'One basis point is worth',
          explanation:
            'The dollar value of a single basis point on this balance. It is a quick way to price a negotiation or an expense ratio.',
        },
      ],
      workflowLinks: [
        { slug: 'apr-to-apy-calculator', step: 'Convert the nominal rate into an effective annual yield.' },
        { slug: 'mortgage-calculator', step: 'See the monthly payment at the new rate.' },
        { slug: 'refinance-calculator', step: 'Compare the rate saving with the refinance costs.' },
      ],
      faqs: [
        {
          q: 'How many basis points are in one percent?',
          a: 'One hundred. One basis point is 0.01 percent, so 100 bps is 1 percent, 50 bps is 0.5 percent, and 25 bps is 0.25 percent. This is why a 25 bps cut is a quarter of a percentage point, not a quarter of the rate.',
        },
        {
          q: 'Why use basis points instead of percentages?',
          a: 'Basis points are unambiguous. A "0.5 percent cut" could mean half a percentage point or half of the current rate. "50 basis points" always means half a percentage point. They are standard in bond, mortgage, and central bank communication.',
        },
        {
          q: 'Does the dollar change account for amortisation?',
          a: 'No. It applies the rate change to the full balance for a year. On an amortising loan the balance falls, so the interest effect is smaller over time. Use the mortgage or amortisation calculator for a payment-level answer.',
        },
        {
          q: 'Can basis points be negative?',
          a: 'Yes, for a rate cut. Enter a negative number and the calculator shows the percentage decrease, the dollar reduction, and the lower new value. A negative rate itself is unusual but the arithmetic still works.',
        },
        {
          q: 'How do basis points apply to fund fees?',
          a: 'Expense ratios are often quoted in basis points, such as 0.05 percent for an index fund or 1.00 percent for an active fund. On a $100,000 portfolio, 50 bps is $500 a year. The fee compounds against you, so small differences matter over decades.',
        },
      ],
      related: ['apr-to-apy-calculator', 'mortgage-calculator', 'refinance-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  }
];
