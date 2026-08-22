import { Guide } from '../../../types';

export const debtPayoffGuide: Guide = {
  id: 'debt-payoff-guide',
  slug: 'debt-payoff-strategy-guide',
  name: 'Debt Payoff Strategy: Snowball, Avalanche, and Every Method Between',
  shortDesc: 'Compare debt payoff methods, calculate the true cost of minimum payments, and build a payoff plan that actually works.',
  category: 'finance',
  iconName: 'TrendingDown',
  keywords: ['debt payoff', 'credit card debt', 'debt snowball', 'debt avalanche', 'minimum payments', 'loan payoff', 'interest cost'],
  content: {
    hook: 'A $5,000 credit card balance at 20% APR costs you $1,000 a year in interest alone. At minimum payments, it takes over 20 years to pay off and you pay $8,000 total. The math is brutal, but it is also fixable.',
    sections: [
      {
        heading: 'How Credit Card Interest Actually Works',
        body: [
          'Credit card interest is calculated daily on your average daily balance. The APR is divided by 365 to get a daily rate, then multiplied by your balance each day. This means you pay interest on interest, compounding against you.',
          'A $5,000 balance at 20% APR with a $100 minimum payment takes 22 years to pay off and costs $8,231 in interest. The same $5,000 with a $300 monthly payment takes 19 months and costs $817. The difference is staggering.',
          'The minimum payment is designed to keep you in debt. It typically covers only interest plus 1-2% of principal. Paying the minimum is the most expensive way to borrow money.',
        ],
        callout: 'Paying just $50 extra per month on a $5,000 credit card balance saves thousands in interest and cuts years off the payoff timeline.',
      },
      {
        heading: 'Snowball vs Avalanche: Which Works Better?',
        body: [
          'The debt snowball method lists your debts smallest to largest. You pay minimums on everything except the smallest, which you attack aggressively. When it is paid off, you roll that payment into the next smallest. The psychological wins of eliminating individual debts keep you motivated.',
          'The debt avalanche method lists debts highest interest rate to lowest. You pay minimums on everything except the highest-rate debt. This is mathematically optimal because it minimizes total interest paid.',
          'On a $25,000 total debt load across five cards, the avalanche method typically saves $2,000-4,000 in interest versus the snowball. But if the snowball helps you stay on track, the psychological benefit outweighs the mathematical cost.',
        ],
        callout: 'The best method is the one you actually stick with. Consistency beats optimization every time.',
      },
      {
        heading: 'Balance Transfer Strategy',
        body: [
          'A balance transfer moves high-interest debt to a 0% introductory APR card. Most offer 12-21 months at 0%, with a 3-5% transfer fee. On $10,000 of credit card debt, a 3% fee ($300) saves you $2,000+ in interest over 18 months.',
          'The catch: if you do not pay off the balance before the intro period ends, you are back to high interest rates, sometimes higher. Set up autopay for the full amount divided by the intro months.',
          'Balance transfers work best when you have a clear payoff timeline and the discipline to not run up new charges on the old cards. Close the old cards after transferring to remove the temptation.',
        ],
      },
      {
        heading: 'Building Your Payoff Plan',
        body: [
          'Step 1: List every debt with balance, interest rate, and minimum payment. Step 2: Choose snowball or avalanche. Step 3: Set a fixed extra amount and apply it to your target debt. Step 4: Automate minimums and the extra payment.',
          'Track your progress monthly. Seeing balances drop creates momentum. Many people find that once they start paying more than the minimum, they naturally increase the amount as they see results.',
          'Do not stop other financial goals entirely. If you have an employer 401(k) match, contribute at least enough to get the full match. The 50-100% instant return from the match beats the interest savings on most debts.',
        ],
      },
    ],
    conclusion: 'The total interest you pay on debt is a choice, not an obligation. Every dollar above the minimum reduces total cost and shortens the timeline. Run the numbers on your specific debts and pick the method that matches your personality.',
  },
  faqs: [
    { q: 'Should I pay off debt or invest?', a: 'If your debt interest rate is higher than expected investment returns (typically 7-10% for stocks), pay off debt first. Credit card debt at 20%+ always wins. Low-rate debt (student loans, mortgage) can coexist with investing.' },
    { q: 'Does paying off a loan early hurt my credit?', a: 'Paying off installment loans can temporarily dip your score by 5-10 points because you lose the account. But the long-term benefit of being debt-free outweighs a minor, temporary credit dip.' },
    { q: 'What about debt consolidation loans?', a: 'A consolidation loan makes sense if it lowers your interest rate and you have a payoff plan. It fails when you consolidate and then run up new balances on the freed-up credit cards.' },
    { q: 'How much should I keep in emergency fund while paying off debt?', a: 'Keep a starter emergency fund of $1,000-2,000 while aggressively paying off high-interest debt. Once high-interest debt is gone, build the full 3-6 month emergency fund.' },
  ],
  embeddedCalculators: ['credit-card-interest-calculator', 'loan-payment-calculator', 'compound-interest-calculator', 'emergency-fund-calculator'],
  relatedCalculators: ['savings-goal-calculator', 'simple-interest-calculator', 'percentage-calculator'],
  relatedGuides: ['compound-interest-guide', 'complete-home-buying-guide'],
  seo: {
    status: 'index',
    reviewStatus: 'reviewed',
    priority: 0.95,
  },
  publishedAt: '2026-08-22',
};
