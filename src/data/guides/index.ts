import { Guide } from '../../types';
import { debtPayoffGuide } from './individual/debt-payoff';
import { compoundInterestGuide } from './individual/compound-interest';
import { bmiWeightGuide } from './individual/bmi-weight';
import { runningTrainingGuide } from './individual/running-training';
import { homeRenovationGuide } from './individual/home-renovation';
import { cookingWeightGuide } from './individual/cooking-weight';
import { percentageGuide } from './individual/percentages';
import { datePlanningGuide } from './individual/date-planning';
import { scientificCalculatorGuide } from './individual/scientific-calculator';

export const GUIDE_REGISTRY: Guide[] = [
  {
    id: 'home-buying-guide',
    slug: 'complete-home-buying-guide',
    name: 'The Complete Home Buying Guide',
    shortDesc: 'How affordability, mortgages, down payments, closing costs, and property tax actually add up when you buy a house.',
    category: 'finance',
    iconName: 'Home',
    keywords: ['home buying', 'mortgage', 'affordability', 'down payment', 'closing costs', 'property tax', 'first time buyer', 'rent vs buy'],
    content: {
      hook: 'A house is the largest purchase most people ever make, and the sticker price is the least useful number in the deal. What decides whether you can afford one is the monthly payment with taxes and insurance inside it, the cash you need on closing day, and how long you expect to stay. This guide works through all three with the actual arithmetic. Examples use U.S. dollars and an illustrative 6.5% rate; loan programs, fees, taxes, and legal requirements vary by location and lender.',
      sections: [
        {
          heading: 'Start With the Monthly Payment, Not the Price',
          body: [
            'Affordability is a cash-flow question wearing a price tag. A $500,000 house with 40% down can cost less each month than a $350,000 house with 5% down, because the loan size and the interest rate decide the payment, not the listing price. Work out what you can pay every month first, then see what price that buys.',
            'Lenders measure this with debt-to-income ratios. The front-end ratio is the housing payment divided by gross monthly income. The back-end ratio adds every other minimum debt payment: car loans, student loans, credit card minimums. A 28/36 convention is still widely quoted in the United States, with housing near 28% of gross income and total debt near 36%, but specific thresholds vary by loan program and borrower, and some programs approve ratios well above 36%.',
            'The arithmetic is simple enough to do at the kitchen table. On $7,000 of gross monthly income, 36% is $2,520. Subtract a $400 car payment and housing has to fit inside $2,120, and that figure still has to absorb property tax, insurance, and any association dues before principal and interest get a share.',
          ],
          callout: 'A lender maximum is what the lender will lend, not a budget. Gross income is not take-home pay, and qualification ignores childcare, savings, and repairs.',
        },
        {
          heading: 'What the Mortgage Payment Actually Contains',
          body: [
            'Four pieces sit inside a typical payment: principal, interest, property tax, and homeowners insurance, which is why the industry calls it PITI. Principal and interest come from the loan. Tax and insurance are collected monthly into an escrow account and paid by the servicer when the bills arrive.',
            'On a $400,000 home with 20% down, the loan is $320,000. At an illustrative 6.5% over 30 years the principal-and-interest payment is $2,022.62, and the total paid over the term is about $728,000, of which roughly $408,000 is interest. The first payment splits into $1,733.33 of interest and $289.28 of principal. The balance shifts only gradually, because the loan is designed to pay the lender first.',
            'Then come the two costs that never appear in a loan quote. Maintenance and repairs are commonly budgeted at about 1% of property value a year, which is $4,000 on a $400,000 house, and association dues where they exist can range from modest to larger than the mortgage itself.',
          ],
          callout: 'A fixed rate fixes the interest, not the payment. Escrow items move, and the monthly figure moves with them.',
        },
        {
          heading: 'The Down Payment: What 20% Actually Buys You',
          body: [
            'Twenty percent is not a legal requirement. It is the line at which conventional lenders generally stop requiring private mortgage insurance, which is why it dominates the conversation.',
            'Putting 10% down on the same $400,000 home means a $360,000 loan, and the principal-and-interest payment rises to $2,275.44, or $252.83 more each month. You also keep $40,000 in reserve, which is real money at a moment when repairs, movers, and furniture all land together.',
            'PMI is quoted as an annual percentage of the loan rather than a flat fee, and the rate depends on credit score, loan-to-value, and the insurer. At an illustrative 0.5% a year on a $360,000 loan, the premium is $150 a month until it ends. In the United States, federal rules require the servicer to cancel PMI automatically once the balance is scheduled to reach 78% of the original value, and allow a borrower to request cancellation at 80%, subject to conditions such as being current on payments. Appreciation alone does not trigger either.',
            'The other side of a larger down payment is opportunity cost. Leaving $40,000 invested rather than in the house, at an illustrative 7% annual return, would be worth roughly $78,700 after ten years. That does not settle the question, because the house is leveraged and the avoided loan interest is certain while investment returns are not, but it belongs in the comparison.',
          ],
          callout: 'Below 20% down you are not disqualified. You are paying an insurance premium for the lender risk on the extra loan.',
        },
        {
          heading: 'Closing Costs and the Cash You Actually Need',
          body: [
            'Closing costs typically run 2% to 5% of the purchase price, and they are due in cleared funds on the day of closing, on top of the down payment. Buyers who budget only the down payment discover the shortfall in the final week, when there is no time to solve it.',
            'On a $400,000 purchase with $320,000 borrowed, a 1% origination fee is $3,200, 0.5% for title and escrow is $1,600, appraisal and inspection add $900, and prepaid tax and insurance $3,500, for $9,200 in closing costs. Cash needed is $80,000 + $9,200 = $89,200, which is 22.3% of the price rather than 20%. The line items behind that number:',
          ],
          list: [
            'Loan origination fee, and discount points if you buy the rate down',
            'Title search, title insurance, and escrow or attorney fees',
            'Appraisal, home inspection, and credit report',
            'Recording and transfer charges',
            'Prepaid interest for the days between closing and the first payment',
            'The first year of homeowners insurance, and several months of property tax deposited into escrow',
          ],
          callout: 'Budget the down payment and the closing costs as two separate numbers. The second one is the one that surprises people. Seller concessions can shift part of it, but they are capped by the loan program and are a negotiation, not a right.',
        },
        {
          heading: 'Fixed or Adjustable, Fifteen Years or Thirty',
          body: [
            'A fixed-rate loan keeps the same principal-and-interest payment for the whole term. An adjustable-rate mortgage is fixed for an initial period, often 5, 7, or 10 years, and then resets at a margin over a reference index, usually with periodic and lifetime caps. The caps decide how bad a reset can get, so read them before comparing the starting rate.',
            'Term length is the other lever, and it is pure arithmetic. On $320,000 at 6.5%, a 30-year term costs $2,022.62 a month and about $408,000 of interest. A 15-year term costs $2,787.54 a month and about $182,000 of interest. The shorter loan saves roughly $226,000 but demands $765 more every month, for fifteen years, without flexibility.',
            'Extra principal payments shorten the term and cut interest, but they do not usually reduce the scheduled payment unless the lender recasts the loan. Check the prepayment terms, then model the effect against your own balance and rate rather than a generic schedule.',
          ],
          callout: 'Compare offers on the loan estimate, not the advertised rate. Points, lender fees, and escrow requirements decide the real cost.',
        },
        {
          heading: 'Property Tax and Insurance Are Local, and They Move',
          body: [
            'Property tax is where two identical houses can part company. The bill comes from a local assessor applying a mill rate, which is tax per $1,000 of assessed value, to an assessed value that is often a percentage of market value.',
            'A $450,000 home assessed at 100% with a 10-mill rate carries $450,000 x 10 / 1,000 = $4,500 a year, or $375 a month, an effective rate of 1% of market value. If the same jurisdiction assessed at 50% of market value, the bill would be half that. Mill rates cannot be compared across jurisdictions without the assessment ratio.',
            'Insurance is priced on the cost to rebuild the house, not on what you paid for it, and it varies with construction, roof age, and local risk. Premiums in many markets have risen sharply, and the seller existing policy is not a forecast for yours.',
            'Both sit in escrow, so a rising tax bill produces a rising monthly payment even on a fixed-rate loan, and an escrow analysis can add a shortfall payment to cover the gap.',
          ],
          callout: 'Ask for the actual tax bill and an insurance quote before you make an offer. Both change the payment, and both are obtainable before closing.',
        },
        {
          heading: 'Rent vs Buy: Arithmetic, Not Ideology',
          body: [
            'Buying front-loads the costs and back-loads the benefit. The down payment, the closing costs, and the cost of selling later all land on the buying side, while the benefit arrives as equity as the loan is paid down and, possibly, as appreciation.',
            'Selling costs matter more than most buyers expect. Agent commissions and transfer fees commonly total 6% to 10% of the sale price, so on a $400,000 home the exit costs $24,000 to $40,000. That is why a two-year stay can lose money even in a flat market.',
            'For scale, renting at $1,600 a month with 3% annual increases costs about $220,000 over ten years. Buying a $350,000 home with 20% down at 6.5% costs far more upfront and carries tax, insurance, and maintenance, but the principal payments stay with you as equity. Which wins depends on the horizon, the rate, local prices, and how fast rents rise where you live.',
            'There is no universal break-even year. Anyone quoting one is quoting their own assumptions, and the crossover moves by years between one city and the next.',
          ],
          callout: 'The break-even depends on how long you stay and what selling costs. Run it with your numbers, not a rule of thumb.',
        },
        {
          heading: 'The Order of Operations Before You Make an Offer',
          body: [
            'Sequence matters more than most buyers realise, because each step narrows what the next one can offer you.',
          ],
          list: [
            'Pull your credit reports and dispute errors before a lender sees them',
            'Get pre-qualified for a rough range, then pre-approved with documents once you are serious',
            'Set your own ceiling below the approval, with tax, insurance, and maintenance inside it',
            'Save closing costs and a reserve separately from the down payment; three to six months of payments is a common target',
            'Compare at least three lenders inside a short window so the inquiries count as one shopping event',
            'Read the loan estimate line by line: rate, points, origination fee, and escrow requirements',
            'Do not open credit, finance furniture, or move large sums between accounts during underwriting',
          ],
        },
        {
          heading: 'Where Buyers Get Hurt',
          body: [
            'The recurring failures are not exotic. They are the same six, and all of them are visible in advance.',
          ],
          list: [
            'Buying to the approval limit leaves nothing for the first repair, and the first repair always comes',
            'Draining savings to close turns a $6,000 roof or furnace into credit card debt',
            'Assuming PMI ends because the market rose: cancellation follows the original value and the servicer schedule, subject to the rules and any appraisal requirements',
            'Taking an adjustable rate without reading the caps, then meeting the first reset',
            'Ignoring the escrow analysis and treating the higher payment as an error',
            'Underestimating utilities, maintenance, and commuting on a larger or more distant home',
          ],
          callout: 'Cash reserves after closing are not optional. They are the difference between a repair and a crisis.',
        },
      ],
      conclusion: 'The best time to buy is when the monthly payment fits a budget you can hold, the cash to close still leaves a reserve, and you expect to stay long enough for the upfront costs to be absorbed. That is arithmetic you can run before you talk to anyone. Use the calculators below on your own numbers.',
    },
    faqs: [
      { q: 'How much should I save before buying a house?', a: 'Enough for the down payment, the closing costs, and a reserve. On a $400,000 home with 10% down, that is $40,000 down, roughly $9,000 to $20,000 in closing costs at 2% to 5%, and three to six months of payments in reserve, so somewhere around $60,000 to $75,000. Saving past the minimum is not wasted: it lowers the loan and the monthly payment.' },
      { q: 'Is a 20% down payment required?', a: 'No. It is the point at which conventional lenders generally stop requiring private mortgage insurance. Smaller down payments are available through conventional and government-backed programs for eligible borrowers, and the trade-off is mortgage insurance, a larger loan, and a higher monthly payment. Confirm current program rules with a lender.' },
      { q: 'How much house can I afford on an $85,000 income?', a: 'Gross monthly income is about $7,083, and 36% of that is $2,550 for housing plus every other debt payment. With a $400 car payment, $2,150 is left. If tax and insurance take $500 of that, $1,650 goes to principal and interest, which supports a loan near $261,000 at an illustrative 6.5% over 30 years, or a price near $326,000 with 20% down.' },
      { q: 'What credit score do I need for a mortgage?', a: 'It depends on the loan program and the lender, and the score affects pricing as well as eligibility. A strong score does not guarantee approval, because income, debts, reserves, and the property all count. Check your reports for errors well before applying, and ask lenders which programs fit your file rather than assuming a number is enough.' },
      { q: 'Is a 15-year or 30-year mortgage better?', a: 'A 30-year spreads the same loan over more payments, so each is smaller and total interest is larger. On $320,000 at 6.5%, the 30-year payment is $2,022.62 with about $408,000 of interest, and the 15-year payment is $2,787.54 with about $182,000. The shorter loan saves roughly $226,000 but costs $765 more every month.' },
      { q: 'How do I get rid of PMI?', a: 'In the United States, the servicer must terminate PMI automatically when the balance is scheduled to reach 78% of the original value, and you can request cancellation at 80% if you are current and meet the lender conditions. Paying extra principal accelerates both. Some lenders allow earlier removal based on an appraisal, but that depends on the investor and the program.' },
      { q: 'Who pays closing costs, the buyer or the seller?', a: 'Buyers usually pay most of them. Sellers can contribute through concessions, which are capped by the loan program and are a negotiation rather than a guarantee. Concessions are more available in a slow market; in a competitive one they can cost you the offer.' },
      { q: 'How long do I need to stay for buying to beat renting?', a: 'Long enough for the upfront and selling costs to be absorbed by equity and by avoided rent increases. Selling costs commonly run 6% to 10% of the price, so a short stay is usually expensive. There is no universal number of years; run the comparison with your own price, rate, rent, and expected time in the home.' },
      { q: 'What debt-to-income ratio will a lender use?', a: 'Many U.S. lenders still quote 28/36, meaning housing near 28% of gross income and total debt near 36%, but thresholds vary by program and some approve higher ratios for borrowers with compensating factors. Qualification is a lending decision, not a recommendation for how much of your income to commit.' },
      { q: 'Can I buy a house with 3% down?', a: 'Low-down-payment programs exist. Some conventional options allow small down payments for eligible borrowers, and FHA-insured loans commonly require 3.5% for qualifying borrowers, with mortgage insurance in both cases. Availability, limits, and costs change, so confirm current terms with a lender rather than relying on an old number.' },
    ],
    embeddedCalculators: ['mortgage-affordability-calculator', 'mortgage-calculator', 'amortization-schedule-calculator', 'down-payment-savings-calculator'],
    relatedCalculators: ['closing-cost-calculator', 'rent-vs-buy-calculator', 'property-tax-calculator', 'debt-to-income-calculator', 'emergency-fund-calculator'],
    relatedGuides: ['debt-payoff-strategy-guide', 'compound-interest-savings-guide'],
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.9,
      updatedAt: '2026-11-06',
    },
    publishedAt: '2026-08-21',
  },
  {
    id: 'tdee-guide',
    slug: 'tdee-macros-complete-guide',
    name: 'TDEE, Macros, and Your Calorie Target',
    shortDesc: 'Understand your Total Daily Energy Expenditure, calculate macros, and set the right calorie target for weight loss or muscle gain.',
    category: 'health',
    iconName: 'Flame',
    keywords: ['tdee', 'calories', 'macros', 'weight loss', 'muscle gain', 'bmr', 'nutrition'],
    content: {
      hook: 'Most people fail at weight management because they guess at calories instead of calculating them. Your TDEE is the single number that determines whether you lose, maintain, or gain weight.',
      sections: [
        {
          heading: 'What is TDEE and Why It Matters',
          body: [
            'Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a day. It includes your Basal Metabolic Rate (BMR) which is calories burned at rest, plus all physical activity, the thermic effect of food, and non-exercise activity thermogenesis (NEAT).',
            'Knowing your TDEE removes the guesswork. If you eat below TDEE, you lose weight. Above it, you gain. At it, you maintain. The size of the deficit or surplus determines the speed.',
            'TDEE is not static. It changes with your weight, activity level, and body composition. A 200-pound person burns more calories than a 150-pound person doing the same activity. As you lose weight, your TDEE drops, which is why plateaus happen.',
          ],
          callout: 'TDEE is your maintenance calories. A 500-calorie daily deficit produces roughly 1 pound of fat loss per week.',
        },
        {
          heading: 'BMR: Your Baseline',
          body: [
            'BMR is the energy your body needs for basic functions: breathing, circulation, cell production, and brain activity. It typically accounts for 60-70% of your total daily burn.',
            'The calculator uses the Mifflin-St Jeor estimate. For the conventional sex-specific equations: 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 5 for men, and the same expression − 161 for women. A formula estimate is not a direct measurement.',
            'Other equations and measurement methods can produce different estimates. Use the result as a rough starting point and consult a qualified health professional for individualized advice.',
          ],
        },
        {
          heading: 'Setting Your Activity Multiplier',
          body: [
            'The activity multiplier converts BMR to TDEE. Sedentary (desk job, no exercise) = BMR × 1.2. Light exercise (1-3 days/week) = 1.375. Moderate (3-5 days/week) = 1.55. Active (6-7 days/week) = 1.725. Athlete (2x daily or physical job) = 1.9.',
            'Activity labels are approximate and do not capture every person’s movement, occupation, or physiology. Choose the closest estimate, then treat the result as uncertain rather than a measurement.',
            'Track your intake for 2-3 weeks and compare to the TDEE estimate. If your weight is stable, the estimate is close. If you are gaining or losing, adjust accordingly. Real data beats any formula.',
          ],
        },
        {
          heading: 'Macros: Protein, Carbs, and Fat',
          body: [
            'Once you know your calories, the next question is what to eat. The three macronutrients are protein (4 cal/gram), carbohydrates (4 cal/gram), and fat (9 cal/gram).',
            'Protein needs depend on age, activity, health, and goals. A single grams-per-kilogram target or percentage split is not appropriate for everyone; seek qualified nutrition advice when needs are specific.',
            'There is no universal macronutrient split. Food preferences, medical needs, and activity differ, so treat any ratio as an example rather than a prescription.',
          ],
          callout: 'The calculator provides estimates. It does not diagnose a condition or replace individualized nutrition advice.',
        },
        {
          heading: 'Weight Loss vs Muscle Gain',
          body: [
            'A calorie deficit can lead to weight loss over time, but the amount and pace vary. Simple calorie arithmetic is not a guaranteed weekly weight change; health, adherence, and metabolic adaptation matter.',
            'Weight-gain targets and body-composition changes are individual. Avoid treating a single calorie surplus as a universal plan.',
            'Nutrition strategies differ by person and goal. For a personalized plan, especially with a medical condition or history of disordered eating, consult a qualified clinician or dietitian.',
          ],
        },
      ],
      conclusion: 'A TDEE calculator provides an estimate, not a measurement or medical recommendation. This guide is educational; discuss nutrition or weight changes with a qualified health professional when needed.',
    },
    faqs: [
      { q: 'How accurate is the TDEE calculator?', a: 'The result is an estimate and may differ from an individual’s actual energy needs. The calculator does not measure metabolism or activity directly.' },
      { q: 'Should I eat back exercise calories?', a: 'This calculator cannot determine an individual nutrition plan. Exercise estimates and daily needs vary; seek qualified advice if you need a tailored target.' },
      { q: 'Do macros matter if I just hit my calorie target?', a: 'Calories and nutrient composition are different considerations. Individual needs vary by health, activity, and goals; this guide does not prescribe a specific ratio.' },
      { q: 'How often should I recalculate TDEE?', a: 'Every 4-6 weeks, or whenever your weight changes by more than 5 pounds. As you lose weight, your TDEE drops, so your calorie target needs to come down too.' },
    ],
    embeddedCalculators: ['tdee-calculator', 'bmr-calculator', 'protein-intake-calculator', 'calories-burned-calculator'],
    relatedCalculators: ['bmi-calculator', 'body-fat-calculator', 'ideal-weight-calculator'],
    relatedGuides: ['bmi-body-fat-weight-guide', 'running-pace-training-zones-guide'],
    seo: {
      status: 'noindex',
      reviewStatus: 'pending',
      priority: 0.85,
    },
    publishedAt: '2026-08-21',
  },
  debtPayoffGuide,
  compoundInterestGuide,
  bmiWeightGuide,
  runningTrainingGuide,
  homeRenovationGuide,
  cookingWeightGuide,
  percentageGuide,
  datePlanningGuide,
  scientificCalculatorGuide,
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDE_REGISTRY.find(g => g.slug === slug);
}

export function getGuidesByCategory(category: string): Guide[] {
  return GUIDE_REGISTRY.filter(g => g.category === category);
}

export function getAllGuides(): Guide[] {
  return GUIDE_REGISTRY;
}
