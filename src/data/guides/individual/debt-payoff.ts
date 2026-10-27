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
    hook: 'A high-interest balance can take a long time to repay when payments are small. The payoff timeline and total interest depend on the rate, issuer payment formula, fees, and whether new purchases are added.',
    sections: [
      {
        heading: 'How Credit Card Interest Actually Works',
        body: [
          'Many cards calculate interest using a daily periodic rate and an average-daily-balance method, but the method, grace period, fees, and payment rules depend on the card agreement.',
          'For a simple monthly illustration, a $5,000 balance at a nominal 20% annual rate accrues about $83.33 in interest in the first month before considering payments or fees. A $100 payment would leave relatively little to reduce principal; actual card calculations may differ.',
          'Minimum-payment formulas vary. A small payment relative to the balance and interest can extend repayment and increase the total cost, especially if new purchases or fees are added.',
        ],
        callout: 'Paying just $50 extra per month on a $5,000 credit card balance saves thousands in interest and cuts years off the payoff timeline.',
      },
      {
        heading: 'Snowball vs Avalanche: Which Works Better?',
        body: [
          'The debt snowball method lists your debts smallest to largest. You pay minimums on everything except the smallest, which you attack aggressively. When it is paid off, you roll that payment into the next smallest. The psychological wins of eliminating individual debts keep you motivated.',
          'The debt avalanche method lists debts highest interest rate to lowest. If the total payment amount and all other terms are held equal, directing extra payments to the highest-rate debt minimizes interest mathematically.',
          'The two methods can produce different payoff timelines and interest totals, but the difference depends on balances, rates, fees, and payment amounts. Compare your actual debts rather than relying on a generic savings figure.',
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
          'Employer retirement matching can affect a debt-versus-saving decision. Check the plan rules, vesting terms, tax treatment, and debt rates; the right choice depends on your circumstances.',
        ],
      },
    ],
    conclusion: 'The total interest you pay on debt is a choice, not an obligation. Every dollar above the minimum reduces total cost and shortens the timeline. Run the numbers on your specific debts and pick the method that matches your personality.',
  },
  faqs: [
    { q: 'Should I pay off debt or invest?', a: 'Compare the debt interest and fees with the uncertain return and risk of investing, while considering liquidity, taxes, and any employer plan terms. There is no single answer that fits every situation.' },
    { q: 'Does paying off a loan early affect my credit?', a: 'Credit-score effects depend on the scoring model and your credit history. Check the lender terms for prepayment fees and consider how closing an account could affect your overall credit profile.' },
    { q: 'What about debt consolidation loans?', a: 'A consolidation loan makes sense if it lowers your interest rate and you have a payoff plan. It fails when you consolidate and then run up new balances on the freed-up credit cards.' },
    { q: 'How much should I keep in an emergency fund while paying off debt?', a: 'The right reserve depends on income stability, essential expenses, dependents, insurance, and access to funds. Keep enough liquidity for plausible near-term needs before committing every available dollar to debt repayment.' },
  ],
  embeddedCalculators: ['credit-card-interest-calculator', 'loan-payment-calculator', 'compound-interest-calculator', 'emergency-fund-calculator'],
  relatedCalculators: ['savings-goal-calculator', 'simple-interest-calculator', 'percentage-calculator'],
  relatedGuides: ['compound-interest-savings-guide', 'complete-home-buying-guide'],
  seo: {
    status: 'noindex',
    reviewStatus: 'pending',
    priority: 0.95,
  },
  publishedAt: '2026-08-22',
};
