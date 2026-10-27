import { Guide } from '../../types';
import { debtPayoffGuide } from './individual/debt-payoff';
import { compoundInterestGuide } from './individual/compound-interest';
import { bmiWeightGuide } from './individual/bmi-weight';
import { runningTrainingGuide } from './individual/running-training';
import { homeRenovationGuide } from './individual/home-renovation';
import { cookingWeightGuide } from './individual/cooking-weight';
import { percentageGuide } from './individual/percentages';
import { datePlanningGuide } from './individual/date-planning';

export const GUIDE_REGISTRY: Guide[] = [
  {
    id: 'home-buying-guide',
    slug: 'complete-home-buying-guide',
    name: 'The Complete Home Buying Guide',
    shortDesc: 'Everything you need to know about affordability, mortgages, down payments, and closing costs when buying a house.',
    category: 'finance',
    iconName: 'Home',
    keywords: ['home buying', 'mortgage', 'affordability', 'down payment', 'closing costs', 'first time buyer'],
    content: {
      hook: 'Home purchases involve substantial upfront and recurring costs. This guide uses U.S.-dollar examples; loan programs, fees, taxes, and legal requirements vary by location and lender.',
      sections: [
        {
          heading: 'How Much House Can You Actually Afford?',
          body: [
            'Price-to-income ratios can be a rough starting point, but they do not account for taxes, debt, household costs, or local prices. Work back from a monthly budget and compare it with current lender terms.',
            'Some U.S. lenders use debt-to-income guidelines such as 28/36, but thresholds and what counts as housing cost vary by program and borrower. Qualification limits are not a recommended personal spending target.',
            'Estimate property taxes, insurance, maintenance, and any association fees using local information. These costs vary significantly by location, property, and coverage.',
          ],
          callout: 'Use lender guidelines as one input, not as a substitute for a household budget or local cost estimates.',
        },
        {
          heading: 'Down Payment Strategy',
          body: [
            'For many U.S. conventional loans, a lower down payment may involve private mortgage insurance, subject to the loan terms and applicable rules. Other loan programs may have different insurance requirements.',
            'Some U.S. loan programs allow low down payments for eligible borrowers. Program availability, eligibility, insurance, rates, and total costs vary; confirm current requirements with a qualified lender.',
            'Consider the opportunity cost. If you put 10% down instead of 20% on a $300,000 home, that extra $30,000 invested at 7% annual return would grow to about $59,000 over 10 years. But PMI on that same $30,000 gap might cost you $150/month ($18,000 over 10 years). Run the numbers for your situation.',
          ],
        },
        {
          heading: 'Understanding Your Mortgage',
          body: [
            'The two main options are fixed-rate and adjustable-rate mortgages. A 30-year fixed gives you the same payment for the full term. A 5/1 ARM starts lower but adjusts annually after year 5.',
            'Fixed-rate is generally safer unless you plan to sell or refinance within 5-7 years. The psychological benefit of a predictable payment is real and underrated.',
            'A shorter mortgage term usually has higher scheduled payments and can reduce total interest under the same rate assumptions. Compare actual offers and make sure the payment fits your budget.',
          ],
          callout: 'Extra principal payments change a loan schedule; check the lender’s prepayment terms and calculate the effect using your actual balance, rate, and remaining term.',
        },
        {
          heading: 'Closing Costs and Hidden Expenses',
          body: [
            'Closing costs typically run 2-5% of the home price. On a $300,000 home, expect $6,000-15,000 in closing costs on top of your down payment. These include appraisal fees, title insurance, origination fees, and prepaid taxes and insurance.',
            'Many buyers forget about moving costs ($1,000-5,000), immediate repairs and furniture ($2,000-10,000), and the higher utility bills that come with a larger space. Budget an extra $5,000-15,000 beyond your down payment and closing costs.',
            'Your real estate agent can sometimes negotiate seller concessions where the seller covers part of your closing costs. This is more common in buyer markets or when a property has been listed for a while.',
          ],
        },
        {
          heading: 'Making the Decision',
          body: [
            'The rent-versus-buy comparison depends on local prices, financing, taxes, maintenance, transaction costs, rent changes, and how long you expect to stay. There is no universal break-even period.',
            'Personal preferences and non-financial needs matter alongside cost. Compare scenarios using realistic local assumptions rather than relying on a general rule.',
            'Get pre-approved for a mortgage before you start looking. This tells you exactly what you can afford and makes sellers take your offers more seriously.',
          ],
        },
      ],
      conclusion: 'The best time to buy is when the numbers work for your budget and you plan to stay long enough to recoup transaction costs. Use the calculators below to run the actual numbers for your situation.',
    },
    faqs: [
      { q: 'How much should I save before buying a house?', a: 'Plan for your down payment plus 3-5% in closing costs plus a $10,000-15,000 emergency buffer. For a $300,000 home with 10% down, that means roughly $45,000-55,000 in savings.' },
      { q: 'Should I pay off debt before buying?', a: 'Existing debt affects cash flow and may affect lender qualification. Compare your budget and current loan terms; there is no universal debt threshold that determines the right decision for every buyer.' },
      { q: 'Is a 15-year or 30-year mortgage better?', a: 'A 30-year gives lower payments and more flexibility. A 15-year saves massive interest but requires higher payments. Choose based on your cash flow, not just the interest math.' },
      { q: 'What credit score do I need?', a: 'Credit requirements vary by lender, loan type, and other application details. Check current eligibility directly with lenders; a score alone does not guarantee approval or a particular rate.' },
    ],
    embeddedCalculators: ['mortgage-affordability-calculator', 'mortgage-calculator', 'amortization-schedule-calculator', 'down-payment-savings-calculator'],
    relatedCalculators: ['closing-cost-calculator', 'compound-interest-calculator', 'simple-interest-calculator'],
    relatedGuides: ['debt-payoff-strategy-guide', 'compound-interest-savings-guide'],
    seo: {
      status: 'noindex',
      reviewStatus: 'pending',
      priority: 0.9,
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
