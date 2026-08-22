module.exports = [
  {
    id: 'net-worth', slug: 'net-worth-calculator', name: 'Net Worth Calculator',
    shortDesc: 'Calculate your total net worth by adding assets and subtracting liabilities.',
    tagline: 'Your financial snapshot.', icon: 'Calculator', priority: 0.9,
    keywords: ['net worth', 'net worth calculator', 'assets minus liabilities'],
    intro: 'The Net Worth Calculator gives you a snapshot of your overall financial health by subtracting everything you owe from everything you own. Tracking net worth over time is the single best way to measure financial progress.',
    howItWorks: 'Add up all assets: cash, investments, retirement accounts, property value, vehicles. Then subtract all liabilities: mortgages, car loans, student loans, credit card debt. The result is your net worth.',
    example: 'Assets: $150,000 home, $40,000 retirement, $10,000 savings = $200,000. Liabilities: $120,000 mortgage, $25,000 student loans = $145,000. Net worth = $55,000.',
    formulaLabel: 'Net Worth', formulaExpr: 'Net Worth = Assets - Liabilities',
    formulaDesc: 'Net Worth = Assets - Liabilities',
    fields: [
      { id: 'assets', label: 'Total Assets ($)', type: 'number', defaultValue: 200000, min: 0, prefix: '$' },
      { id: 'liabilities', label: 'Total Liabilities ($)', type: 'number', defaultValue: 145000, min: 0, prefix: '$' },
    ],
    results: [
      { label: 'Net Worth', formulaCode: 'assets - liabilities', prefix: '$', accent: true },
    ],
    resultExplanations: [
      { label: 'Net Worth', explanation: 'Your total wealth. A positive number means assets exceed debts.' },
    ],
    workflow: [['debt-to-income-calculator', 'Check your debt-to-income ratio.'], ['investment-roi-calculator', 'Track investment returns.']],
    faqs: [
      { q: 'Is a negative net worth bad?', a: 'Not necessarily. Many young adults have negative net worth due to student loans. The trend over time matters most.' },
      { q: 'How often should I calculate net worth?', a: 'Monthly or quarterly. Tracking the trend reveals whether your financial situation is improving.' },
      { q: 'Should I include my home in net worth?', a: 'Yes. Your home is an asset. Include its current market value, not the purchase price.' },
    ],
    related: ['debt-to-income-calculator', 'investment-roi-calculator', 'retirement-calculator'],
  },
  {
    id: 'credit-card-payoff', slug: 'credit-card-payoff-calculator', name: 'Credit Card Payoff Calculator',
    shortDesc: 'Find out how long it takes to pay off credit card debt and how much interest you pay.',
    tagline: 'Escape credit card debt.', icon: 'Calculator', priority: 0.95,
    keywords: ['credit card payoff', 'credit card calculator', 'debt payoff', 'minimum payment'],
    intro: 'The Credit Card Payoff Calculator shows how long it takes to eliminate credit card debt and the total interest paid based on your balance, interest rate, and monthly payment amount. It reveals the true cost of carrying a balance.',
    howItWorks: 'Each month, your payment covers interest first, then reduces the principal. Higher payments dramatically reduce both the time and total interest. The calculator uses an amortization formula to model each payment.',
    example: 'A $5,000 balance at 19% APR with $200 monthly payments takes 31 months to pay off and costs $934 in interest. Paying $300/month reduces it to 19 months and $564 in interest.',
    formulaLabel: 'Payoff Time', formulaExpr: 'Months = -log(1 - (balance x monthlyRate) / payment) / log(1 + monthlyRate)',
    formulaDesc: 'Uses logarithmic formula to calculate months to payoff based on balance, rate, and payment.',
    fields: [
      { id: 'balance', label: 'Credit Card Balance', type: 'number', defaultValue: 5000, min: 0, prefix: '$' },
      { id: 'apr', label: 'APR (%)', type: 'number', defaultValue: 19, min: 0, suffix: '%' },
      { id: 'payment', label: 'Monthly Payment', type: 'number', defaultValue: 200, min: 1, prefix: '$' },
    ],
    results: [
      { label: 'Months to Pay Off', formulaCode: 'Math.ceil(-Math.log(1 - (balance * apr/12/100) / payment) / Math.log(1 + apr/12/100))', suffix: ' months', accent: true },
      { label: 'Total Interest', formulaCode: '(function(){ var m = Math.ceil(-Math.log(1 - (balance * apr/12/100) / payment) / Math.log(1 + apr/12/100)); return m * payment - balance; })()', prefix: '$' },
    ],
    resultExplanations: [
      { label: 'Months to Pay Off', explanation: 'The number of months until your balance reaches zero.' },
      { label: 'Total Interest', explanation: 'The total cost of borrowing this money over the payoff period.' },
    ],
    workflow: [['debt-consolidation-calculator', 'Explore consolidation options.'], ['budget-calculator', 'Find room in your budget for higher payments.']],
    faqs: [
      { q: 'Why does minimum payment take so long?', a: 'Minimum payments are designed to maximize interest revenue for the bank. Most of your payment goes to interest, barely touching the principal.' },
      { q: 'What is the fastest way to pay off credit card debt?', a: 'Pay as much as possible each month. Even an extra $50/month can save hundreds in interest and months of payments.' },
      { q: 'Should I transfer to a 0% APR card?', a: 'If you qualify and can pay off the balance during the promo period, a balance transfer can save significant interest. Watch for transfer fees of 3-5%.' },
    ],
    related: ['debt-consolidation-calculator', 'budget-calculator', 'loan-payment-calculator'],
  },
];
