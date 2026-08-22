module.exports = [
  {
    id: 'loan-affordability', slug: 'loan-affordability-calculator', name: 'Loan Affordability Calculator',
    shortDesc: 'Find out how much you can afford to borrow based on your income.',
    tagline: 'Borrow within your means.', icon: 'Calculator', priority: 0.9,
    keywords: ['loan affordability', 'how much can i borrow', 'loan calculator'],
    intro: 'The Loan Affordability Calculator estimates the maximum loan amount you can comfortably handle based on your income, existing debts, and desired monthly payment. It helps you set realistic borrowing limits before applying.',
    howItWorks: 'Based on your monthly payment capacity and interest rate, the calculator determines the maximum principal you can borrow. Most financial advisors recommend keeping total debt payments under 36% of gross income.',
    example: 'With $6,000 monthly income, $1,800 existing debt, and wanting to keep DTI at 36%, you can afford about $360/month for a new loan, giving you roughly $20,000 at 7% for 5 years.',
    formulaLabel: 'Loan Amount', formulaExpr: 'Max Loan = payment x [(1+r)^n - 1] / [r(1+r)^n]',
    formulaDesc: 'Max Loan = payment x [(1+r)^n - 1] / [r(1+r)^n]',
    fields: [
      { id: 'income', label: 'Gross Monthly Income', type: 'number', defaultValue: 6000, min: 0, prefix: '$' },
      { id: 'existingDebt', label: 'Existing Monthly Debt', type: 'number', defaultValue: 1800, min: 0, prefix: '$' },
      { id: 'rate', label: 'Expected Interest Rate', type: 'number', defaultValue: 7, min: 0, suffix: '%' },
      { id: 'years', label: 'Loan Term (Years)', type: 'number', defaultValue: 5, min: 1 },
    ],
    results: [
      { label: 'Max Monthly Payment', formulaCode: 'income * 0.36 - existingDebt > 0 ? income * 0.36 - existingDebt : 0', prefix: '$', accent: true },
      { label: 'Max Loan Amount', formulaCode: '(function(){ var p = income * 0.36 - existingDebt; if(p <= 0) return 0; var r = rate/12/100; var n = years*12; return p * (Math.pow(1+r,n)-1)/(r*Math.pow(1+r,n)); })()', prefix: '$' },
    ],
    resultExplanations: [
      { label: 'Max Monthly Payment', explanation: 'The most you should spend on a new loan each month, keeping DTI at 36%.' },
      { label: 'Max Loan Amount', explanation: 'The maximum you can borrow at the given rate and term.' },
    ],
    workflow: [['debt-to-income-calculator', 'Check your current DTI ratio.'], ['mortgage-payment-calculator', 'Calculate specific mortgage payments.']],
    faqs: [
      { q: 'What is the 36% rule?', a: 'Financial advisors recommend keeping total monthly debt payments below 36% of gross income for healthy finances.' },
      { q: 'Can I borrow more than this?', a: 'Some lenders allow DTI up to 43-50%, but stretching your budget increases financial risk.' },
      { q: 'Does this include all debt?', a: 'Yes, include rent, car loans, student loans, credit cards, and any other recurring debt obligations.' },
    ],
    related: ['debt-to-income-calculator', 'mortgage-payment-calculator', 'loan-payment-calculator'],
  },
  {
    id: 'inflation-adjusted', slug: 'inflation-adjusted-return', name: 'Inflation-Adjusted Return Calculator',
    shortDesc: 'Calculate real investment returns after accounting for inflation.',
    tagline: 'True purchasing power.', icon: 'Calculator', priority: 0.85,
    keywords: ['inflation adjusted return', 'real return', 'real interest rate', 'purchasing power'],
    intro: 'The Inflation-Adjusted Return Calculator converts nominal investment returns into real returns that account for inflation. A 7% return with 4% inflation means your purchasing power only grew by about 3%.',
    howItWorks: 'The real return equals the nominal return minus the inflation rate, divided by (1 + inflation rate), times 100. This Fisher equation adjustment gives you the true growth in purchasing power.',
    example: 'Your investment returned 8% nominal but inflation was 3.5%. Real return = (8 - 3.5) / (1 + 3.5/100) x 100 = 4.35%. Your purchasing power grew by 4.35%, not 8%.',
    formulaLabel: 'Real Return', formulaExpr: 'Real = (nominal - inflation) / (1 + inflation) x 100',
    formulaDesc: 'Real Return = (nominal - inflation) / (1 + inflation) x 100',
    fields: [
      { id: 'nominal', label: 'Nominal Return (%)', type: 'number', defaultValue: 8, min: 0, suffix: '%' },
      { id: 'inflation', label: 'Inflation Rate (%)', type: 'number', defaultValue: 3.5, min: 0, suffix: '%' },
    ],
    results: [
      { label: 'Real Return', formulaCode: '(nominal - inflation) / (1 + inflation / 100) * 100', suffix: '%', accent: true },
    ],
    resultExplanations: [
      { label: 'Real Return', explanation: 'Your actual increase in purchasing power after inflation is accounted for.' },
    ],
    workflow: [['compound-interest-calculator', 'Project growth with nominal rates.'], ['cagr-calculator', 'Compare annualized returns.']],
    faqs: [
      { q: 'Why does inflation matter for returns?', a: 'Inflation erodes purchasing power. A 5% return with 5% inflation means zero real growth.' },
      { q: 'What is a good real return?', a: 'Historically, the S&P 500 averages about 7% nominal, giving roughly 4-5% real return after inflation.' },
      { q: 'Can real returns be negative?', a: 'Yes. If inflation exceeds your nominal return, you are losing purchasing power even if the account balance grows.' },
    ],
    related: ['compound-interest-calculator', 'cagr-calculator', 'investment-roi-calculator'],
  },
];
