import { CalculatorMeta } from '../../types';

export const FOOD_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'recipe-scaling',
    slug: 'recipe-scaling-calculator',
    name: 'Recipe Scaler',
    shortDesc: 'Scale any recipe ingredient to your desired serving count.',
    tagline: 'Cook for two or twenty without the arithmetic.',
    category: 'food',
    iconName: 'ChefHat',
    badge: 'Kitchen',
    keywords: ['recipe scaler', 'recipe scaling', 'scale recipe', 'servings calculator', 'cooking math', 'ingredient ratio'],
    kind: 'config',
    config: {
      fields: [
        { id: 'originalServings', label: 'Original Servings', type: 'number', defaultValue: 4, min: 1 },
        { id: 'newServings', label: 'Desired Servings', type: 'number', defaultValue: 6, min: 1 },
        { id: 'amount', label: 'Ingredient Amount', type: 'number', defaultValue: 250, min: 0 },
      ],
      results: [
        { label: 'Scaled Amount', formulaCode: 'amount * (newServings / originalServings)', accent: true },
      ],
      formulaDescription: 'Scaled = Original Amount x (Desired Servings / Original Servings)',
      tips: [
        'Most recipes scale linearly, but spice amounts often need only a gentle increase.',
        'For baking, scaling by weight rather than volume gives the most consistent results.',
      ],
    },
    content: {
      intro:
        'The Recipe Scaler adjusts any ingredient amount from the original serving count to your desired servings. It is the fast way to cook for two from a four-serving recipe, or to feed a crowd from a dinner for six.',
      howItWorks:
        'The scale factor is the desired servings divided by the original servings. Each ingredient amount multiplies by that factor, preserving the ratios that make a recipe taste right.',
      example:
        'Scaling a 4-serving recipe that uses 250 g of rice to 6 servings gives 250 x 6 / 4 = 375 g.',
      formulas: [
        {
          label: 'Scaled Ingredient',
          expression: 'Scaled = Amount × (Desired Servings / Original Servings)',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Scaled Amount',
          explanation:
            'The ingredient quantity adjusted by the serving ratio, keeping the recipe proportions intact.',
        },
      ],
      workflowLinks: [
        { slug: 'cups-to-grams-calculator', step: 'Convert scaled volumes into precise weights.' },
        { slug: 'ratio-proportion-calculator', step: 'Apply the same scaling logic to any proportional problem.' },
      ],
      faqs: [
        { q: 'How do I scale a recipe?', a: 'Divide the servings you want by the original servings, then multiply every ingredient by that factor. The calculator does the math for one ingredient at a time.' },
        { q: 'Do spices scale the same way?', a: 'Linearly scaled spice can become overpowering. Increase herbs and spices more gently, tasting as you go.' },
        { q: 'Does scaling affect cooking time?', a: 'Often, but unpredictably. Baking time rarely changes much, while larger stove-top batches may need a few extra minutes.' },
      ],
      related: ['cups-to-grams-calculator', 'ratio-proportion-calculator', 'meal-cost-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
    },
  },
  {
    id: 'meal-cost',
    slug: 'meal-cost-calculator',
    name: 'Cost per Meal Calculator',
    shortDesc: 'Work out the cost of each serving from a total recipe price.',
    tagline: 'Price your home cooking accurately.',
    category: 'food',
    iconName: 'Utensils',
    keywords: ['cost per meal', 'meal cost', 'serving cost', 'recipe cost', 'food budgeting', 'cost per serving'],
    kind: 'config',
    config: {
      fields: [
        { id: 'totalCost', label: 'Total Recipe Cost', type: 'number', defaultValue: 18, min: 0, prefix: '$' },
        { id: 'servings', label: 'Number of Servings', type: 'number', defaultValue: 4, min: 1 },
      ],
      results: [
        { label: 'Cost per Serving', formulaCode: 'totalCost / servings', prefix: '$', accent: true },
      ],
      formulaDescription: 'Cost per Serving = Total Cost / Servings',
      tips: [
        'Compare home cooking against takeout by the per-serving price.',
        'Include the full cost of the recipe, not just one ingredient.',
      ],
    },
    content: {
      intro:
        'The Cost per Meal Calculator divides a recipe total by its serving count to reveal the price of each plate. Meal planners and budgeters use it to compare home cooking against restaurant and delivery prices.',
      howItWorks:
        'Cost per serving is simply the total recipe cost divided by the number of servings. The result makes meal budgeting concrete and comparable.',
      example:
        'A recipe that costs R18 to make and serves four costs R4.50 per serving, a fraction of most takeout prices.',
      formulas: [
        {
          label: 'Cost per Serving',
          expression: 'Serving Cost = Total Cost / Servings',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Cost per Serving',
          explanation:
            'The price of one plate, giving you a direct comparison against takeout and delivery.',
        },
      ],
      workflowLinks: [
        { slug: 'recipe-scaling-calculator', step: 'Scale the recipe to match your serving needs.' },
        { slug: 'discount-sales-tax-calculator', step: 'Compare meal costs against restaurant promos.' },
      ],
      faqs: [
        { q: 'How do I calculate the cost of a home-cooked meal?', a: 'Add the cost of all ingredients used, then divide by the number of servings. The calculator handles the division instantly.' },
        { q: 'What should I include in the cost?', a: 'All ingredients actually used, plus reasonable portions of pantry staples like oil and spices if you want full precision.' },
        { q: 'Is home cooking always cheaper?', a: 'Usually per serving, yes, especially in bulk. This tool lets you put a number on the savings.' },
      ],
      related: ['recipe-scaling-calculator', 'markup-margin-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.65,
    },
  },
];

export const FITNESS_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'pace',
    slug: 'running-pace-calculator',
    name: 'Running Pace Calculator',
    shortDesc: 'Convert distance and time into pace per mile or kilometer.',
    tagline: 'Train to a pace, not a guess.',
    category: 'fitness',
    iconName: 'Flag',
    keywords: ['running pace', 'pace calculator', 'running calculator', 'pace per mile', 'pace per km', 'race pace'],
    kind: 'config',
    config: {
      fields: [
        { id: 'distanceKm', label: 'Distance', type: 'number', defaultValue: 10, min: 0.1, suffix: 'km' },
        { id: 'timeMin', label: 'Time (minutes)', type: 'number', defaultValue: 55, min: 1, suffix: 'min' },
        { id: 'timeSec', label: 'Time (seconds)', type: 'number', defaultValue: 0, min: 0, max: 59, suffix: 'sec' },
      ],
      results: [
        { label: 'Pace', formulaCode: '(timeMin + timeSec / 60) / distanceKm', suffix: 'min/km', accent: true },
        { label: 'Average Speed', formulaCode: 'distanceKm / ((timeMin + timeSec / 60) / 60)', suffix: 'km/h' },
      ],
      formulaDescription: 'Pace = Total Minutes / Distance; Speed = Distance / Hours',
      tips: [
        'To convert min/km to min/mile, multiply by 1.609344.',
        'Split every 5 km by taking one-fifth of your total time.',
      ],
    },
    content: {
      intro:
        'The Running Pace Calculator converts a distance and finish time into pace per kilometer and average speed. Runners planning workouts and races use it to translate effort into numbers they can hold.',
      howItWorks:
        'Total time in minutes divides by distance for pace, and distance divided by time in hours gives average speed. Both figures come from the same inputs, so you see the full picture.',
      example:
        'Running 10 km in 55 minutes gives a pace of 5:30 per km and an average speed of 10.9 km/h.',
      formulas: [
        {
          label: 'Running Pace',
          expression: 'Pace = Total Minutes / Distance',
          note: 'Speed = Distance / Time in hours.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Pace',
          explanation:
            'Minutes per kilometer, the number you hold during a run or race.',
        },
        {
          resultLabel: 'Average Speed',
          explanation:
            'Distance divided by total time in hours, useful for comparing across distances.',
        },
      ],
      workflowLinks: [
        { slug: 'calories-burned-calculator', step: 'Estimate the burn of a run at this pace.' },
        { slug: 'target-heart-rate-calculator', step: 'Match the pace to a training heart-rate zone.' },
      ],
      faqs: [
        { q: 'How do I calculate my running pace?', a: 'Divide your total minutes by the distance. A 55-minute 10 km run is a 5:30 per kilometer pace.' },
        { q: 'What is a good running pace?', a: 'It depends on experience and distance. Beginners may run 7-8 min/km, while competitive runners hold 4-5 min/km for races.' },
        { q: 'How do I convert min/km to min/mile?', a: 'Multiply the minutes by 1.609. A 5:30 min/km pace is about 8:51 per mile.' },
      ],
      related: ['calories-burned-calculator', 'target-heart-rate-calculator', 'one-rep-max-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.65,
    },
  },
  {
    id: 'one-rep-max',
    slug: 'one-rep-max-calculator',
    name: 'One Rep Max Calculator',
    shortDesc: 'Estimate your one-rep max from a lighter lifting set.',
    tagline: 'Train with percentages of a real target.',
    category: 'fitness',
    iconName: 'Dumbbell',
    keywords: ['one rep max', '1rm', '1 rep max calculator', 'strength calculator', 'max lift', 'training percentage'],
    kind: 'config',
    config: {
      fields: [
        { id: 'weightLbs', label: 'Weight Lifted', type: 'number', defaultValue: 135, min: 1, suffix: 'lbs' },
        { id: 'reps', label: 'Repetitions', type: 'number', defaultValue: 8, min: 1, max: 12 },
      ],
      results: [
        { label: 'Estimated 1 Rep Max', formulaCode: 'weightLbs * (1 + reps / 30)', suffix: 'lbs', accent: true },
        { label: 'Estimated Max (kg)', formulaCode: 'weightLbs * (1 + reps / 30) * 0.453592', suffix: 'kg' },
        { label: '80% Training Weight', formulaCode: 'weightLbs * (1 + reps / 30) * 0.8', suffix: 'lbs' },
      ],
      formulaDescription: 'Epley: 1RM = Weight x (1 + Reps / 30)',
      tips: [
        'The Epley formula is most accurate for sets of 1-10 reps.',
        'Train with 70-85% of your 1RM for strength building.',
      ],
    },
    content: {
      intro:
        'The One Rep Max Calculator estimates your maximum single-repetition lift from a heavier set of several reps. Strength athletes use it to set training loads without attempting a risky true max.',
      howItWorks:
        'The Epley formula estimates 1RM as weight x (1 + reps / 30). The tool also converts to kilograms and reports a common 80% training weight for programming.',
      example:
        'Lifting 135 lb for 8 reps estimates a 1RM of 135 x (1 + 8/30) = 171 lb.',
      formulas: [
        {
          label: 'Estimated One Rep Max',
          expression: '1RM = Weight × (1 + Reps / 30)',
          note: 'The Epley formula, most accurate for 1–10 reps.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Estimated 1 Rep Max',
          explanation:
            'Your projected single-rep maximum derived from the set you completed, used to set training loads.',
        },
        {
          resultLabel: '80% Training Weight',
          explanation:
            'A common working weight for strength sets, calculated as 80% of the estimated max.',
        },
      ],
      workflowLinks: [
        { slug: 'protein-intake-calculator', step: 'Fuel strength training with the right protein target.' },
        { slug: 'calories-burned-calculator', step: 'Estimate the energy cost of your sessions.' },
      ],
      faqs: [
        { q: 'What is the Epley formula?', a: 'It estimates one-rep max as weight multiplied by (1 + reps/30). It is one of the most accurate simple predictors for moderate rep ranges.' },
        { q: 'Should I test my true 1RM?', a: 'Testing a true max carries injury risk. Estimates like this let you program without it, reserving true tests for competitions.' },
        { q: 'What percentages should I train at?', a: 'Strength work commonly uses 70-85% of 1RM, hypertrophy around 65-80%, and power work with low reps at higher percentages.' },
      ],
      related: ['protein-intake-calculator', 'calories-burned-calculator', 'running-pace-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.6,
    },
  },
];

export const DAILY_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'tip',
    slug: 'tip-calculator',
    name: 'Tip & Bill Splitter',
    shortDesc: 'Calculate exact tip percentages and split evenly per diner with one click.',
    tagline: 'Split bills and tips fairly without awkward table math.',
    category: 'daily',
    iconName: 'Receipt',
    badge: 'Popular',
    featured: true,
    keywords: ['tip', 'tip calculator', 'bill split', 'split bill', 'gratuity', 'restaurant tip', 'split the bill'],
    kind: 'custom',
    componentId: 'TipCalculator',
    content: {
      intro:
        'The Tip & Bill Splitter computes the tip on any check, adds it to the total, and divides the result evenly across diners. It even rounds up to the next dollar for a cleaner split.',
      howItWorks:
        'The tip equals the bill times the chosen rate, the grand total is the bill plus tip, and each diner pays that total divided by the group size. The per-person breakdown shows bill share and tip share separately.',
      example:
        'A R84.50 check at 18% with two diners totals R99.71, or R49.86 per person including a R7.61 tip share each.',
      formulas: [
        {
          label: 'Tip Amount',
          expression: 'Tip = Bill × Rate',
        },
        {
          label: 'Per Person Share',
          expression: 'Share = (Bill + Tip) / Diners',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Grand Total',
          explanation:
            'The bill plus the tip, the final amount on the check.',
        },
        {
          resultLabel: 'Per Person',
          explanation:
            'Each diner share of the grand total, split evenly across the group.',
        },
      ],
      workflowLinks: [
        { slug: 'percentage-calculator', step: 'Double-check the tip as a percentage of the bill.' },
        { slug: 'discount-sales-tax-calculator', step: 'Add sales tax to the check before tipping.' },
      ],
      faqs: [
        { q: 'How much should I tip?', a: 'In the US, 15-20% is standard for restaurant service, with 18% the common default and 20% for exceptional service.' },
        { q: 'How do I split a bill unevenly?', a: 'This tool splits evenly. For uneven shares, each person can compute their own portion by entering only their items with their tip rate.' },
        { q: 'Does it handle rounding?', a: 'Yes. Enable round-up to raise the grand total to the next whole dollar and recalculate the tip to match.' },
      ],
      related: ['discount-sales-tax-calculator', 'meal-cost-calculator', 'percentage-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.9,
    },
  },
  {
    id: 'fuel-cost',
    slug: 'fuel-cost-calculator',
    name: 'Fuel Cost Calculator',
    shortDesc: 'Estimate trip fuel cost from distance, mileage, and price.',
    tagline: 'Know your gas bill before you hit the road.',
    category: 'misc',
    iconName: 'Fuel',
    keywords: ['fuel cost', 'gas cost', 'trip cost', 'fuel calculator', 'gas money', 'mpg cost'],
    kind: 'config',
    config: {
      fields: [
        { id: 'distanceMiles', label: 'Trip Distance', type: 'number', defaultValue: 300, min: 0, suffix: 'mi' },
        { id: 'mpg', label: 'Vehicle Fuel Efficiency', type: 'number', defaultValue: 30, min: 1, suffix: 'mpg' },
        { id: 'pricePerGallon', label: 'Fuel Price', type: 'number', defaultValue: 3.5, min: 0, prefix: '$', suffix: '/gal' },
      ],
      results: [
        { label: 'Gallons Needed', formulaCode: 'distanceMiles / mpg', suffix: 'gal' },
        { label: 'Total Fuel Cost', formulaCode: 'distanceMiles / mpg * pricePerGallon', prefix: '$', accent: true },
      ],
      formulaDescription: 'Cost = Distance / Efficiency x Price',
      tips: [
        'Highway driving usually beats city mileage, so adjust for your route.',
        'Cost per mile = Price / Efficiency.',
      ],
    },
    content: {
      intro:
        'The Fuel Cost Calculator estimates the cost of a trip based on distance, vehicle efficiency, and current fuel prices. Road-trippers and daily commuters use it to budget gas before leaving.',
      howItWorks:
        'Gallons needed equal distance divided by efficiency. Multiplying by the price per gallon gives total fuel cost for the trip.',
      example:
        'A 300-mile trip in a 30 mpg car at $3.50 per gallon uses 10 gallons and costs $35.',
      formulas: [
        {
          label: 'Gallons Needed',
          expression: 'Gallons = Distance / Efficiency',
        },
        {
          label: 'Total Fuel Cost',
          expression: 'Cost = Gallons × Price per Gallon',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Gallons Needed',
          explanation:
            'The fuel your trip will consume, distance divided by vehicle efficiency.',
        },
        {
          resultLabel: 'Total Fuel Cost',
          explanation:
            'The trip gas bill, gallons multiplied by the pump price.',
        },
      ],
      workflowLinks: [
        { slug: 'currency-converter', step: 'Convert fuel prices across currencies on cross-border trips.' },
        { slug: 'speed-converter', step: 'Convert distances and speeds between unit systems.' },
      ],
      faqs: [
        { q: 'How do I calculate fuel cost for a trip?', a: 'Divide the distance by your miles per gallon to get gallons, then multiply by the fuel price. The calculator does both steps.' },
        { q: 'How do I find my car mpg?', a: 'Divide the miles driven since your last fill-up by the gallons it took to refill. Your dashboard may also display it.' },
        { q: 'Can I use liters and kilometers?', a: 'Convert your values first, or use the length and volume converters to translate your numbers into miles and gallons.' },
      ],
      related: ['electricity-cost-calculator', 'speed-converter', 'currency-converter'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
    },
  },
  {
    id: 'electricity-cost',
    slug: 'electricity-cost-calculator',
    name: 'Electricity Cost Calculator',
    shortDesc: 'Estimate appliance running costs from wattage and usage.',
    tagline: 'Find the appliances eating your electric bill.',
    category: 'misc',
    iconName: 'Plug',
    keywords: ['electricity cost', 'appliance cost', 'kwh calculator', 'power cost', 'energy cost', 'electric bill'],
    kind: 'config',
    config: {
      fields: [
        { id: 'watts', label: 'Appliance Wattage', type: 'number', defaultValue: 1200, min: 0, suffix: 'W' },
        { id: 'hoursPerDay', label: 'Hours Used per Day', type: 'number', defaultValue: 2, min: 0, suffix: 'hrs' },
        { id: 'daysPerMonth', label: 'Days per Month', type: 'number', defaultValue: 30, min: 1, suffix: 'days' },
        { id: 'ratePerKwh', label: 'Electricity Rate', type: 'number', defaultValue: 0.16, min: 0, prefix: '$', suffix: '/kWh' },
      ],
      results: [
        { label: 'Energy Used', formulaCode: 'watts / 1000 * hoursPerDay * daysPerMonth', suffix: 'kWh' },
        { label: 'Monthly Cost', formulaCode: 'watts / 1000 * hoursPerDay * daysPerMonth * ratePerKwh', prefix: '$', accent: true },
      ],
      formulaDescription: 'Cost = (Watts / 1000) x Hours x Days x Rate',
      tips: [
        'Find wattage on the appliance label or in its manual.',
        'Standby power, from TVs and chargers, adds up across the home.',
      ],
    },
    content: {
      intro:
        'The Electricity Cost Calculator estimates the monthly cost of any appliance from its wattage and usage pattern. It turns an opaque electric bill into per-device numbers you can act on.',
      howItWorks:
        'Wattage converts to kilowatt-hours by dividing by 1,000, then multiplying by daily hours, days per month, and your electricity rate. The result is that appliance contribution to the bill.',
      example:
        'A 1,200 W space heater running 2 hours daily for 30 days at R0.16/kWh uses 72 kWh and costs about R11.52 per month.',
      formulas: [
        {
          label: 'Energy Used',
          expression: 'kWh = Watts / 1000 × Hours × Days',
        },
        {
          label: 'Monthly Cost',
          expression: 'Cost = kWh × Rate per kWh',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Energy Used',
          explanation:
            'The appliance consumption in kilowatt-hours over the month.',
        },
        {
          resultLabel: 'Monthly Cost',
          explanation:
            'That energy converted to money using your electricity rate.',
        },
      ],
      workflowLinks: [
        { slug: 'fuel-cost-calculator', step: 'Compare energy costs across transport and home use.' },
        { slug: 'hourly-to-annual-salary-calculator', step: 'Weigh appliance costs against your income.' },
      ],
      faqs: [
        { q: 'How do I find an appliance wattage?', a: 'Check the label plate on the back or bottom of the device, or look for a "W" rating. Many manuals list typical wattage too.' },
        { q: 'What is a kilowatt-hour?', a: 'A kilowatt-hour is 1,000 watts used for one hour. Your utility bills you per kWh consumed.' },
        { q: 'How do I find my electricity rate?', a: 'It appears on your electric bill as cents or dollars per kWh, often divided into supply and delivery charges that you can sum.' },
      ],
      related: ['fuel-cost-calculator', 'emergency-fund-calculator', 'hourly-to-annual-salary-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
    },
  },
];