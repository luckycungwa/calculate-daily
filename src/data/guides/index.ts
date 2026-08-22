import { Guide } from '../../types';

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
      hook: 'Buying a home is the biggest financial decision most people make. Get the numbers wrong and you end up house-poor. Get them right and you build real wealth over time.',
      sections: [
        {
          heading: 'How Much House Can You Actually Afford?',
          body: [
            'The rule of thumb says your home price should be 2.5 to 3 times your annual income. But that ignores taxes, debt, and lifestyle. A better approach is working backwards from your monthly budget.',
            'Most lenders use the 28/36 rule: your mortgage payment (principal, interest, taxes, insurance) should not exceed 28% of gross monthly income, and total debt payments should not exceed 36%. This gives you a hard ceiling, not a target.',
            'Start with what you can comfortably pay per month, then reverse-engineer the home price. Factor in property taxes (typically 1-2% of home value annually), homeowners insurance ($1,000-3,000/year depending on location), and HOA fees if applicable.',
          ],
          callout: 'Rule: Never spend more than 28% of gross monthly income on housing costs.',
        },
        {
          heading: 'Down Payment Strategy',
          body: [
            'A 20% down payment avoids Private Mortgage Insurance (PMI), which adds $50-200/month to your payment. But waiting to save 20% means years of rent payments and potential price appreciation you miss.',
            'FHA loans require as little as 3.5% down, and conventional loans now offer 3% down options. The tradeoff: lower down payment means higher monthly payments, PMI costs, and more interest paid over the loan term.',
            'Consider the opportunity cost. If you put 10% down instead of 20% on a $300,000 home, that extra $30,000 invested at 7% annual return would grow to about $59,000 over 10 years. But PMI on that same $30,000 gap might cost you $150/month ($18,000 over 10 years). Run the numbers for your situation.',
          ],
        },
        {
          heading: 'Understanding Your Mortgage',
          body: [
            'The two main options are fixed-rate and adjustable-rate mortgages. A 30-year fixed gives you the same payment for the full term. A 5/1 ARM starts lower but adjusts annually after year 5.',
            'Fixed-rate is generally safer unless you plan to sell or refinance within 5-7 years. The psychological benefit of a predictable payment is real and underrated.',
            'A 15-year mortgage saves dramatically on interest (roughly half the total interest of a 30-year), but the payment is higher. If you can afford it, the math is overwhelmingly in your favor.',
          ],
          callout: 'Every extra $100/month toward principal on a 30-year mortgage saves roughly $35,000 in interest and pays off the loan 4-5 years early.',
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
            'The rent vs buy calculation depends on how long you plan to stay. In most markets, buying becomes cheaper than renting after 5-7 years of ownership, factoring in equity building, tax benefits, and price appreciation.',
            'Emotional factors matter too. Having a stable home, the ability to renovate, and building equity in something you own provide value beyond the financial calculation. But dont let emotion override affordability math.',
            'Get pre-approved for a mortgage before you start looking. This tells you exactly what you can afford and makes sellers take your offers more seriously.',
          ],
        },
      ],
      conclusion: 'The best time to buy is when the numbers work for your budget and you plan to stay long enough to recoup transaction costs. Use the calculators below to run the actual numbers for your situation.',
    },
    faqs: [
      { q: 'How much should I save before buying a house?', a: 'Plan for your down payment plus 3-5% in closing costs plus a $10,000-15,000 emergency buffer. For a $300,000 home with 10% down, that means roughly $45,000-55,000 in savings.' },
      { q: 'Should I pay off debt before buying?', a: 'High-interest debt (credit cards, personal loans) should be paid off first. Low-interest debt like student loans can coexist with a mortgage if your debt-to-income ratio stays under 36%.' },
      { q: 'Is a 15-year or 30-year mortgage better?', a: 'A 30-year gives lower payments and more flexibility. A 15-year saves massive interest but requires higher payments. Choose based on your cash flow, not just the interest math.' },
      { q: 'What credit score do I need?', a: 'Conventional loans typically require 620+. FHA loans accept 580+. Better credit means better rates. Even a 0.5% rate difference costs tens of thousands over the loan term.' },
    ],
    embeddedCalculators: ['affordability-calculator', 'mortgage-calculator', 'amortization-schedule-calculator', 'down-payment-savings-calculator'],
    relatedCalculators: ['closing-cost-calculator', 'rent-vs-buy-calculator', 'home-equity-calculator', 'refinance-calculator'],
    relatedGuides: [],
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
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
            'The Mifflin-St Jeor equation is considered the most accurate for most people. For men: 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 5. For women: 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161.',
            'Other formulas exist (Harris-Benedict, Katch-McArdle) but Mifflin-St Jeor has the best validation across diverse populations. The difference between formulas is typically 50-100 calories, which is within measurement error anyway.',
          ],
        },
        {
          heading: 'Setting Your Activity Multiplier',
          body: [
            'The activity multiplier converts BMR to TDEE. Sedentary (desk job, no exercise) = BMR × 1.2. Light exercise (1-3 days/week) = 1.375. Moderate (3-5 days/week) = 1.55. Active (6-7 days/week) = 1.725. Athlete (2x daily or physical job) = 1.9.',
            'Be honest here. Most people overestimate their activity level. If you exercise 3 times a week but sit the rest of the day, you are moderate at best. The multiplier is not a reward for effort; it is a measure of actual energy expenditure.',
            'Track your intake for 2-3 weeks and compare to the TDEE estimate. If your weight is stable, the estimate is close. If you are gaining or losing, adjust accordingly. Real data beats any formula.',
          ],
        },
        {
          heading: 'Macros: Protein, Carbs, and Fat',
          body: [
            'Once you know your calories, the next question is what to eat. The three macronutrients are protein (4 cal/gram), carbohydrates (4 cal/gram), and fat (9 cal/gram).',
            'Protein is the most important macro for body composition. Aim for 1.6-2.2g per kg of body weight for active individuals. Higher protein preserves muscle during fat loss and increases satiety.',
            'A practical split: 30% protein, 40% carbs, 30% fat is a solid starting point for most people. Adjust based on preference and performance. Low-carb works. Low-fat works. The best diet is one you can sustain.',
          ],
          callout: 'Protein target: 1.6-2.2g per kg of body weight. For a 70kg person, that is 112-154g of protein per day.',
        },
        {
          heading: 'Weight Loss vs Muscle Gain',
          body: [
            'For fat loss, a deficit of 300-500 calories per TDEE produces steady loss of 0.5-1 pound per week without excessive muscle loss. Larger deficits work initially but increase hunger, metabolic adaptation, and muscle loss.',
            'For muscle gain (bulking), a surplus of 200-300 calories above TDEE minimizes fat gain while supporting muscle growth. The "dirty bulk" of eating everything in sight adds as much fat as muscle.',
            'The cut-bulk cycle is more effective than trying to do both simultaneously. Spend 12-16 weeks in a focused deficit, then 8-12 weeks in a controlled surplus. This produces better long-term body composition than maintenance eating.',
          ],
        },
      ],
      conclusion: 'Calculate your TDEE, set a target, and track your intake for two weeks. The first number you get will not be perfect, but it gives you a starting point. Adjust every 2-3 weeks based on the scale trend and how you feel.',
    },
    faqs: [
      { q: 'How accurate is the TDEE calculator?', a: 'Formulas give a good estimate within 10-15%. The real TDEE depends on your exact activity, metabolism, and body composition. Use the formula as a starting point and adjust based on real-world results.' },
      { q: 'Should I eat back exercise calories?', a: 'Exercise calorie estimates from machines and watches are notoriously inaccurate, often overestimating by 30-50%. A safer approach is to set your activity level multiplier and eat a consistent amount regardless of daily exercise.' },
      { q: 'Do macros matter if I just hit my calorie target?', a: 'For pure weight loss, calories are the main driver. But macros affect hunger, energy, muscle retention, and performance. Getting protein right (at least 1.6g/kg) makes the deficit much more manageable.' },
      { q: 'How often should I recalculate TDEE?', a: 'Every 4-6 weeks, or whenever your weight changes by more than 5 pounds. As you lose weight, your TDEE drops, so your calorie target needs to come down too.' },
    ],
    embeddedCalculators: ['tdee-calculator', 'bmr-calculator', 'protein-intake-calculator', 'calories-burned-calculator'],
    relatedCalculators: ['bmi-calculator', 'body-fat-calculator', 'ideal-weight-calculator', 'water-intake-calculator'],
    relatedGuides: [],
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.85,
    },
    publishedAt: '2026-08-21',
  },
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
