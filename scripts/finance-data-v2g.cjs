module.exports = [
  {
    id: 'budget-50-30-20', slug: 'budget-calculator', name: '50/30/20 Budget Calculator',
    shortDesc: 'Divide your income into needs, wants, and savings using the 50/30/20 rule.',
    tagline: 'Budget without the headache.', icon: 'Calculator', priority: 0.9,
    keywords: ['budget calculator', '50 30 20 rule', 'budgeting', 'personal finance'],
    intro: 'The 50/30/20 Budget Calculator splits your after-tax income into three buckets: 50% for needs like rent and groceries, 30% for wants like dining and entertainment, and 20% for savings and debt payoff. It is the simplest budgeting framework for getting your finances organized.',
    howItWorks: 'Take your monthly after-tax income and multiply by 50%, 30%, and 20% to get dollar amounts for each category. Needs include housing, food, utilities, insurance, and minimum debt payments. Wants include everything else that is not essential.',
    example: 'After-tax income of $4,500 per month: $2,250 for needs (housing, food, utilities), $1,350 for wants (dining, hobbies, travel), and $900 for savings and extra debt payments.',
    formulaLabel: 'Budget Split', formulaExpr: 'Needs = 50%, Wants = 30%, Savings = 20%',
    formulaDesc: 'Divides after-tax income into 50% needs, 30% wants, 20% savings.',
    fields: [
      { id: 'income', label: 'Monthly After-Tax Income', type: 'number', defaultValue: 4500, min: 0, prefix: '$' },
    ],
    results: [
      { label: 'Needs (50%)', formulaCode: 'income * 0.5', prefix: '$', accent: true },
      { label: 'Wants (30%)', formulaCode: 'income * 0.3', prefix: '$' },
      { label: 'Savings (20%)', formulaCode: 'income * 0.2', prefix: '$' },
    ],
    resultExplanations: [
      { label: 'Needs (50%)', explanation: 'Essential expenses: rent, groceries, utilities, insurance, minimum debt payments.' },
      { label: 'Wants (30%)', explanation: 'Non-essentials: dining out, hobbies, subscriptions, entertainment.' },
      { label: 'Savings (20%)', explanation: 'Emergency fund, retirement contributions, extra debt payoff, investments.' },
    ],
    workflow: [['net-worth-calculator', 'Track your overall financial health.'], ['credit-card-payoff-calculator', 'Use savings to pay down debt faster.']],
    faqs: [
      { q: 'What if my needs exceed 50%?', a: 'In high cost-of-living areas, needs may take 60%+. Adjust the ratio but try to save at least 10-15%.' },
      { q: 'Should I count minimum payments as needs?', a: 'Yes. Minimum debt payments are obligations and belong in the needs category. Extra payments come from the savings bucket.' },
      { q: 'How do I track my spending?', a: 'Use a spreadsheet, bank app, or budgeting app to categorize transactions. Review weekly until habits form.' },
    ],
    related: ['net-worth-calculator', 'credit-card-payoff-calculator', 'retirement-calculator'],
  },
  {
    id: 'emergency-fund-target', slug: 'emergency-fund-target-calculator', name: 'Emergency Fund Target Calculator',
    shortDesc: 'Calculate how much you need in your emergency fund.',
    tagline: 'Financial safety net.', icon: 'Calculator', priority: 0.9,
    keywords: ['emergency fund', 'emergency fund calculator', 'safety net', 'savings goal'],
    intro: 'The Emergency Fund Calculator tells you exactly how much to save based on your monthly expenses and risk factors. Most experts recommend 3-6 months of expenses, but your ideal amount depends on job stability and obligations.',
    howItWorks: 'Multiply your essential monthly expenses by the recommended number of months. Factors like job stability, income sources, and dependents affect whether you need 3 months or 12 months of coverage.',
    example: 'Monthly essentials total $3,500. With a stable job and no dependents, 6 months = $21,000 emergency fund. If self-employed, aim for 9-12 months ($31,500-$42,000).',
    formulaLabel: 'Emergency Fund', formulaExpr: 'Target = Monthly Expenses x Months',
    formulaDesc: 'Target = Monthly Expenses x Recommended Months',
    fields: [
      { id: 'expenses', label: 'Monthly Essential Expenses', type: 'number', defaultValue: 3500, min: 0, prefix: '$' },
      { id: 'months', label: 'Recommended Months', type: 'number', defaultValue: 6, min: 3, suffix: ' months' },
    ],
    results: [
      { label: 'Emergency Fund Target', formulaCode: 'expenses * months', prefix: '$', accent: true },
    ],
    resultExplanations: [
      { label: 'Emergency Fund Target', explanation: 'The amount you should aim to save for unexpected expenses or job loss.' },
    ],
    workflow: [['net-worth-calculator', 'See how emergency fund affects net worth.'], ['budget-calculator', 'Find room to save more.']],
    faqs: [
      { q: 'How many months of expenses do I need?', a: '3-6 months for most people. Self-employed or single-income families should aim for 9-12 months.' },
      { q: 'Where should I keep my emergency fund?', a: 'In a high-yield savings account that is easily accessible. Do not invest it in stocks or lock it in CDs.' },
      { q: 'When should I use my emergency fund?', a: 'For true emergencies: job loss, medical bills, critical home or car repairs. Not for vacations or discretionary purchases.' },
    ],
    related: ['net-worth-calculator', 'budget-calculator', 'savings-goal-calculator'],
  },
];
