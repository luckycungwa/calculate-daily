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
      updatedAt: '2026-08-22',
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
      updatedAt: '2026-08-21',
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
      updatedAt: '2026-08-21',
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
      updatedAt: '2026-08-22',
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
      updatedAt: '2026-08-22',
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
        { label: 'Cost per Mile', formulaCode: 'pricePerGallon / mpg', prefix: '$' },
      ],
      formulaDescription: 'Cost = Distance / Efficiency x Price',
      tips: [
        'Highway driving usually beats city mileage, so adjust for your route.',
        'Cost per mile = Price / Efficiency.',
        'Enter a round-trip distance if you need the cost of both directions.',
      ],
    },
    content: {
      intro:
        'The Fuel Cost Calculator turns a trip distance, a vehicle efficiency and a pump price into the fuel bill for the journey. It also shows the gallons the trip consumes and the cost per mile, which is the figure worth comparing between two cars or two routes.',
      howItWorks:
        'Distance divided by miles per gallon gives the gallons burned; multiplying by the price per gallon gives the cost. Dividing the price by the efficiency instead gives cost per mile, which stays the same regardless of trip length — so a 300-mile trip costs ten times a 30-mile one at the same rate. Efficiency is assumed to be a US-gallon mpg figure and the price a price per US gallon.',
      example:
        'A 300-mile trip in a 30 mpg car at $3.50 per gallon: 300 / 30 = 10 gallons, costing 10 x $3.50 = $35, or about $0.117 a mile. The same trip in a 20 mpg car burns 15 gallons and costs $52.50, while a 45 mpg car needs 6.67 gallons and costs $23.33.',
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
        {
          resultLabel: 'Cost per Mile',
          explanation:
            'The price of one mile at this efficiency and fuel price. Handy for comparing vehicles, because it does not depend on trip length.',
        },
      ],
      workflowLinks: [
        { slug: 'currency-converter', step: 'Convert fuel prices across currencies on cross-border trips.' },
        { slug: 'speed-converter', step: 'Convert distances and speeds between unit systems.' },
        { slug: 'daily-commute-cost-calculator', step: 'Turn a single trip into a monthly commuting cost.' },
      ],
      faqs: [
        { q: 'How do I calculate fuel cost for a trip?', a: 'Divide the distance by your miles per gallon to get gallons, then multiply by the fuel price. A 300-mile trip at 30 mpg uses 10 gallons, which costs $35 at $3.50 a gallon.' },
        { q: 'How do I find my car mpg?', a: 'Fill the tank, reset the trip meter, and at the next fill-up divide the miles driven by the gallons it took to refill. That measured figure is more reliable than the dashboard estimate, especially for mostly city driving.' },
        { q: 'Can I use litres and kilometres?', a: 'Not directly — this calculator assumes miles and US gallons. Convert the distance to miles and the fuel to US gallons first, or use a litre-per-100km calculator, which divides consumption in the opposite direction.' },
        { q: 'Is a US gallon the same as an imperial gallon?', a: 'No. A US gallon is 3.785 litres and an imperial gallon is 4.546 litres, about 20% larger. A car quoted at 40 mpg (US) is roughly 48 mpg (imperial), so mixing the two makes the cost look wrong.' },
        { q: 'Why is the real cost usually higher?', a: 'Because the estimate assumes the rated efficiency is achieved. Cold starts, air conditioning, roof racks, tyre pressure, traffic and a heavy load all lower real-world mpg, so treat the result as a best case for the route you described.' },
      ],
      related: ['electricity-cost-calculator', 'speed-converter', 'currency-converter'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
      updatedAt: '2026-11-04',
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
      updatedAt: '2026-08-22',
    },
  },
  {
    id: 'parking-cost',
    slug: 'parking-cost-calculator',
    name: 'Parking Cost Calculator',
    shortDesc: 'Estimate the total cost of parking for a trip.',
    tagline: 'Know your parking bill.',
    category: 'daily',
    iconName: 'Car',
    keywords: ['parking cost', 'parking calculator', 'how much does parking cost', 'parking fee'],
    kind: 'config',
    config: {
      fields: [
        { id: 'hourlyRate', label: 'Hourly Rate ($)', type: 'number', defaultValue: 3, min: 0, step: 0.5 },
        { id: 'dailyRate', label: 'Daily Rate ($)', type: 'number', defaultValue: 15, min: 0 },
        { id: 'hours', label: 'Hours', type: 'number', defaultValue: 8, min: 1, max: 168 }
      ],
      results: [
        { label: 'Total Cost', formulaCode: 'Math.min(hourlyRate*hours, dailyRate*Math.ceil(hours/24))', suffix: '$', accent: true },
        { label: 'Days', formulaCode: 'Math.ceil(hours/24)' }
      ],
      formulaDescription: 'undefined',
      tips: [
        'Compare hourly vs daily rates. Parking garages often have a daily maximum.',
        'Off-street parking is usually cheaper than on-street meters.',
        'A stay that touches two calendar days is charged two day passes.'
      ],
    },
    content: {
      intro: 'The Parking Cost Calculator estimates what a stay will cost when a car park charges both an hourly rate and a daily maximum. It charges whichever is cheaper, so a long day at an hourly meter never costs more than the daily cap.',
      howItWorks: 'The hourly total is the hourly rate multiplied by the hours parked. The day-pass total is the daily rate multiplied by the number of calendar days the stay touches, rounded up. The calculator charges the lower of the two, which is how a daily maximum behaves in practice. The days figure shows how many day passes are being counted.',
      example: 'Eight hours at $3 an hour would be $24, but with a $15 daily maximum the charge is $15. A 30-hour stay spans two days, so the day-pass total is $30 against $90 hourly, and $30 is charged instead.',
      formulas: [{ label: 'Cost', expression: 'Cost = min(Hourly x Hours, Daily x ceil(Hours / 24))' }],
      resultExplanations: [
        { resultLabel: 'Total Cost', explanation: 'The parking fee, using whichever rate (hourly or daily) is cheaper.' },
        { resultLabel: 'Days', explanation: 'The number of day passes the stay touches, rounded up.' }
      ],
      workflowLinks: [
        { slug: 'budget-calculator', step: 'Add parking costs to your travel budget.' },
        { slug: 'fuel-cost-calculator', step: 'Pair with fuel costs for total trip expenses.' }
      ],
      faqs: [
        { q: 'How accurate is this estimate?', a: 'It depends on the actual rates at your parking location. Use it as a planning tool and check the sign at the entrance.' },
        { q: 'Does it include taxes?', a: 'No. Enter the total rate including any taxes or fees for an accurate estimate.' },
        { q: 'What if the car park rounds to the next hour?', a: 'The hourly figure here is linear, while most real meters round up to the next hour or part-hour. Enter the number of hours you will actually be billed for.' },
        { q: 'Can I use this for monthly parking?', a: 'Not directly. Monthly permits are usually a flat fee, so compare that fee with the daily-rate estimate for the days you actually park.' }
      ],
      related: ['budget-calculator', 'fuel-cost-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-11-04' },
  },
  {
    id: 'pet-food',
    slug: 'pet-food-calculator',
    name: 'Pet Food Cost Calculator',
    shortDesc: 'Estimate monthly pet food costs.',
    tagline: 'Budget for your furry friend.',
    category: 'daily',
    iconName: 'Heart',
    keywords: ['pet food cost', 'pet food calculator', 'monthly pet cost', 'dog food cost'],
    kind: 'config',
    config: {
      fields: [
        { id: 'bagCost', label: 'Cost per Bag ($)', type: 'number', defaultValue: 45, min: 0 },
        { id: 'weeksPerBag', label: 'Weeks per Bag', type: 'number', defaultValue: 6, min: 0.5, step: 0.5 }
      ],
      results: [
        { label: 'Monthly Cost', formulaCode: 'bagCost * 4.33 / weeksPerBag', suffix: '$', accent: true },
        { label: 'Annual Cost', formulaCode: 'bagCost * 52 / weeksPerBag', suffix: '$' }
      ],
      formulaDescription: 'undefined',
      tips: [
        'Buying in bulk often reduces cost per week.',
        'A pricier bag can still be cheaper per week if it lasts longer — compare weeks, not bag price.',
        'Treats and supplements are not included.'
      ],
    },
    content: {
      intro: 'The Pet Food Cost Calculator turns a bag price and how long that bag lasts into a monthly and yearly food bill. It works for dogs, cats or any pet fed from a bought bag, and it makes different bag sizes comparable on the figure that actually matters: cost per week.',
      howItWorks: 'One bag divided by the number of weeks it lasts gives the weekly cost. Multiplying that by 4.33 weeks per month gives the monthly figure, and by 52 weeks gives the year. The 4.33 is simply 52 / 12, the average number of weeks in a month, so the monthly and annual results stay consistent with each other.',
      example: 'A $45 bag that lasts six weeks: 45 / 6 = $7.50 a week, so 45 x 4.33 / 6 = $32.48 a month and 45 x 52 / 6 = $390 a year. A $60 bag lasting eight weeks also works out at about $32.48 a month, because both cost $7.50 a week.',
      formulas: [{ label: 'Cost', expression: 'Monthly = (Cost per bag x 4.33) / Weeks per bag' }],
      resultExplanations: [
        { resultLabel: 'Monthly Cost', explanation: 'Estimated monthly spending on pet food.' },
        { resultLabel: 'Annual Cost', explanation: 'Estimated yearly spending on pet food.' }
      ],
      workflowLinks: [
        { slug: 'budget-calculator', step: 'Include pet costs in your household budget.' },
        { slug: 'savings-goal-calculator', step: 'Save for annual pet expenses.' }
      ],
      faqs: [
        { q: 'How much should I budget for pet food?', a: 'There is no single figure: a small cat and a large dog differ several fold. Use the price of the bag you actually buy and how many weeks it lasts, rather than an average.' },
        { q: 'How do I compare two bag sizes?', a: 'Divide each bag price by the weeks it lasts to get a weekly cost, then compare. The lower weekly cost is the better value, even if the bag itself costs more.' },
        { q: 'Does this include treats?', a: 'No. Add 10-20% for treats and supplements if you give them regularly.' },
        { q: 'Is expensive food worth it?', a: 'That depends on the food and the pet. If a costly bag lasts proportionally longer, the weekly cost may be similar, so compare on weekly cost before deciding.' }
      ],
      related: ['budget-calculator', 'savings-goal-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.65, updatedAt: '2026-11-04' },
  },
  {
    id: 'screen-time-cost',
    slug: 'screen-time-cost-calculator',
    name: 'Screen Time Cost Calculator',
    shortDesc: 'Calculate what your screen time costs in electricity.',
    tagline: 'See the real cost of scrolling.',
    category: 'daily',
    iconName: 'Monitor',
    keywords: ['screen time cost', 'electricity cost', 'monitor power cost', 'screen energy cost'],
    kind: 'config',
    config: {
      fields: [
        { id: 'watts', label: 'Device Wattage (W)', type: 'number', defaultValue: 40, min: 1, max: 500 },
        { id: 'hoursPerDay', label: 'Hours per Day', type: 'number', defaultValue: 8, min: 0.5, max: 24, step: 0.5 },
        { id: 'ratePerKwh', label: 'Electricity Rate ($/kWh)', type: 'number', defaultValue: 0.15, min: 0, step: 0.01 }
      ],
      results: [
        { label: 'Daily Cost', formulaCode: 'watts*hoursPerDay*ratePerKwh/1000', suffix: '$', accent: true },
        { label: 'Monthly Cost', formulaCode: 'watts*hoursPerDay*ratePerKwh/1000*30', suffix: '$' },
        { label: 'Annual Cost', formulaCode: 'watts*hoursPerDay*ratePerKwh/1000*365', suffix: '$' }
      ],
      formulaDescription: 'undefined',
      tips: [
        'LED monitors use 20-40W. Older LCD panels use 40-60W.',
        'Sleep mode uses 1-5W. Turn the display off when it is not in use.',
        'The wattage on the power brick is a maximum, not what the screen draws at normal brightness.'
      ],
    },
    content: {
      intro: 'The Screen Time Cost Calculator converts a display wattage and daily viewing hours into the electricity it costs per day, month and year. A monitor is a small, constant load, so the daily figure looks trivial while the annual number is the one worth checking against your bill.',
      howItWorks: 'Watts multiplied by hours gives watt-hours per day, and dividing by 1,000 converts that to kilowatt-hours — the unit your electricity bill actually uses. Multiplying by the price per kWh gives the daily cost, and stretching it over 30 days or 365 days gives the monthly and annual figures. Nothing is added for the computer driving the screen, which is a separate and usually larger load.',
      example: 'A 40 W monitor for 8 hours a day at $0.15 per kWh: 40 x 8 = 320 Wh, or 0.32 kWh, costing $0.048 a day. That is about $1.44 a month and $17.52 a year. A 150 W television watched for 4 hours a day costs $0.09 a day, roughly $32.85 a year.',
      formulas: [{ label: 'Cost', expression: 'kWh = Watts x Hours / 1000; cost = kWh x rate' }],
      resultExplanations: [
        { resultLabel: 'Daily Cost', explanation: 'Electricity cost for one day at the hours entered.' },
        { resultLabel: 'Monthly Cost', explanation: 'The daily cost extended over a 30-day month.' },
        { resultLabel: 'Annual Cost', explanation: 'The daily cost extended over 365 days, assuming the same daily use all year.' }
      ],
      workflowLinks: [
        { slug: 'budget-calculator', step: 'Add electricity costs to your monthly budget.' },
        { slug: 'fuel-cost-calculator', step: 'Compare energy costs across devices and trips.' }
      ],
      faqs: [
        { q: 'How do I find my monitor wattage?', a: 'Check the label on the back or the manufacturer specifications. Most desktop monitors are rated between 20 W and 60 W, and the rating is usually a maximum at full brightness.' },
        { q: 'Does this include the computer?', a: 'No. Only the display is counted. A desktop tower typically draws 150-400 W under load and a laptop 30-70 W, so add that separately for the true cost of a session.' },
        { q: 'What is the average electricity rate?', a: 'US residential rates average roughly $0.15-0.18 per kWh and vary widely by state and tariff. Use the rate printed on your own bill rather than an average for a usable estimate.' },
        { q: 'Why is the daily cost so small?', a: 'Because one screen draws only a few hundred watts. The annual figure is the useful one: $17.52 for the example monitor, which is a real line item once several screens and a desktop are added together.' }
      ],
      related: ['budget-calculator', 'fuel-cost-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-11-04' },
  },
  {
    id: 'subscription-total',
    slug: 'subscription-total-calculator',
    name: 'Subscription Total Calculator',
    shortDesc: 'Add up all your monthly subscriptions.',
    tagline: 'See what you actually pay.',
    category: 'daily',
    iconName: 'CreditCard',
    keywords: ['subscription total', 'monthly subscriptions', 'subscription cost', 'recurring charges'],
    kind: 'config',
    config: {
      fields: [
        { id: 'sub1', label: 'Subscription 1 ($/mo)', type: 'number', defaultValue: 15, min: 0 },
        { id: 'sub2', label: 'Subscription 2 ($/mo)', type: 'number', defaultValue: 10, min: 0 },
        { id: 'sub3', label: 'Subscription 3 ($/mo)', type: 'number', defaultValue: 3, min: 0 },
        { id: 'sub4', label: 'Subscription 4 ($/mo)', type: 'number', defaultValue: 0, min: 0 },
        { id: 'sub5', label: 'Subscription 5 ($/mo)', type: 'number', defaultValue: 0, min: 0 }
      ],
      results: [
        { label: 'Monthly Total', formulaCode: 'sub1+sub2+sub3+sub4+sub5', suffix: '$/mo', accent: true },
        { label: 'Annual Total', formulaCode: '(sub1+sub2+sub3+sub4+sub5)*12', suffix: '$/yr' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'The average household has $200-300 per month in subscriptions.',
      'Review subscriptions quarterly and cancel unused ones.'
      ],
    },
    content: {
      intro: 'The Subscription Total Calculator adds up to five monthly subscription prices and shows what they cost you in a month and over a year. Subscriptions are small individually and easy to forget, so the annual figure is usually the first honest look at what they add up to.',
      howItWorks: 'Every slot is entered as a monthly amount, and the calculator simply sums the five. The annual total multiplies that sum by 12. Leaving a slot at zero excludes it, so you can use two or three slots for a small set. For a service billed yearly, divide its annual price by 12 before entering it so every slot is on the same monthly basis.',
      example: 'Netflix at $15, Spotify at $10 and iCloud at $3 a month: 15 + 10 + 3 = $28 a month, which is 28 x 12 = $336 a year. Adding a $120-a-year service means entering $10 a month, which lifts the total to $38 a month and $456 a year.',
      formulas: [{ label: 'Total', expression: 'Monthly = sum of the five slots; Annual = monthly x 12' }],
      resultExplanations: [
        { resultLabel: 'Monthly Total', explanation: 'The combined monthly charge across all filled slots.' },
        { resultLabel: 'Annual Total', explanation: 'The monthly total multiplied by 12, assuming every subscription runs all year.' }
      ],
      workflowLinks: [
        { slug: 'budget-calculator', step: 'Include subscriptions in your monthly budget.' },
        { slug: 'savings-goal-calculator', step: 'Redirect cancelled subscriptions to savings.' }
      ],
      faqs: [
        { q: 'How do I find all my subscriptions?', a: 'Search your bank and card statements for the same merchant appearing every month. The recurring pattern is easier to spot across three months of statements than in a single month.' },
        { q: 'What if I pay annually?', a: 'Divide the annual price by 12 and enter that monthly equivalent. A $120-a-year plan is $10 a month, which keeps every slot comparable.' },
        { q: 'Can I track more than five subscriptions?', a: 'Not in one pass — the calculator has five slots. For a longer list, split it into two runs and add the monthly totals, or enter the combined monthly cost of each group.' },
        { q: 'Can I include free trials?', a: 'Add them at their post-trial price so the total already reflects what you will pay if the trial converts.' }
      ],
      related: ['budget-calculator', 'savings-goal-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-11-04' },
  },
  {
    id: 'alcohol-units',
    slug: 'alcohol-units-calculator',
    name: 'Alcohol Units Calculator',
    shortDesc: 'Calculate alcohol units from drinks consumed.',
    tagline: 'Know your unit intake.',
    category: 'daily',
    iconName: 'Wine',
    keywords: ['alcohol units', 'units calculator', 'drink units', 'alcohol calculator'],
    kind: 'config',
    config: {
      fields: [
        { id: 'abv', label: 'ABV (%)', type: 'number', defaultValue: 5, min: 0, max: 100, step: 0.1 },
        { id: 'volumeMl', label: 'Volume (ml)', type: 'number', defaultValue: 568, min: 0 },
        { id: 'quantity', label: 'Number of Drinks', type: 'number', defaultValue: 1, min: 1, max: 20 }
      ],
      results: [
        { label: 'Units per Drink', formulaCode: 'abv*volumeMl/1000', suffix: 'units', accent: true },
        { label: 'Total Units', formulaCode: 'abv*volumeMl/1000*quantity', suffix: 'units' }
      ],
      formulaDescription: 'undefined',
      tips: [
        'UK recommended limit is 14 units per week for both men and women.',
        'A standard unit is 10ml of pure alcohol.',
        'Units measure how much you drank, not how impaired you are.'
      ],
    },
    content: {
      intro: 'The Alcohol Units Calculator converts a drink strength and volume into standard alcohol units, then multiplies by how many you had. A UK unit is 10 ml of pure alcohol, so a 568 ml pint at 5% ABV works out at 2.84 units.',
      howItWorks: 'Pure alcohol in millilitres is the drink volume multiplied by ABV and divided by 100. Dividing that by 10 gives standard units, which is the same as ABV x volume / 1,000. Total units then multiply the per-drink figure by the number of drinks, so mixing different drinks means running each one separately and adding the totals.',
      example: 'A 568 ml pint at 5% ABV: 5 x 568 / 1,000 = 2.84 units per pint, and three pints total 8.52 units. A 175 ml glass of 13% wine is 2.28 units, a 25 ml shot of 40% spirits is exactly 1.0 unit, and a 330 ml bottle of 4.5% beer is 1.49 units.',
      formulas: [{ label: 'Units', expression: 'Units = ABV x Volume(ml) / 1000' }],
      resultExplanations: [
        { resultLabel: 'Units per Drink', explanation: 'The standard alcohol units in a single serving.' },
        { resultLabel: 'Total Units', explanation: 'Total units for the number of drinks consumed.' }
      ],
      workflowLinks: [
        { slug: 'calorie-deficit-calculator', step: 'Alcohol adds calories without nutrition.' },
        { slug: 'bmi-calculator', step: 'Alcohol calories contribute to weight gain.' }
      ],
      faqs: [
        { q: 'What is a standard unit?', a: 'A standard unit is 10 ml (8 g) of pure alcohol. In the UK, one unit equals a single 25 ml shot of 40% spirits.' },
        { q: 'How many units in a pint?', a: 'A pint of 5% beer has 2.84 units. A pint of 4% beer has 2.27 units.' },
        { q: 'Does this estimate blood alcohol?', a: 'No. Units measure how much alcohol you drank, not how drunk you are. Blood alcohol depends on body weight, sex, food, time and liver function, so it needs a dedicated BAC formula with those inputs.' },
        { q: 'What is the weekly limit?', a: 'UK guidelines recommend no more than 14 units per week, spread over 3 or more days. A US standard drink contains 14 g of alcohol, about 1.75 UK units.' }
      ],
      related: ['calorie-deficit-calculator', 'bmi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-11-04' },
  },
  {
    id: 'coffee-ratio',
    slug: 'coffee-ratio-calculator',
    name: 'Coffee Ratio Calculator',
    shortDesc: 'Calculate coffee-to-water ratio for brewing.',
    tagline: 'The perfect brew ratio.',
    category: 'daily',
    iconName: 'Coffee',
    keywords: ['coffee ratio', 'coffee calculator', 'brew ratio', 'coffee water ratio'],
    kind: 'config',
    config: {
      fields: [
        { id: 'waterMl', label: 'Water (ml)', type: 'number', defaultValue: 350, min: 50 },
        { id: 'ratio', label: 'Ratio (1:X)', type: 'number', defaultValue: 16, min: 10, max: 20, step: 0.5 }
      ],
      results: [
        { label: 'Coffee Needed', formulaCode: 'waterMl/ratio', suffix: 'grams', accent: true },
        { label: 'Strength', formulaCode: '100/ratio', suffix: '%' }
      ],
      formulaDescription: 'undefined',
      tips: [
        'Drip coffee: 1:15-1:18. French press: 1:12-1:15. Espresso: 1:2-1:3.',
        'Use a kitchen scale: a scoop of ground coffee varies by 30% or more.',
        'The ratio counts coffee and water only. It ignores the water the grounds retain.'
      ],
    },
    content: {
      intro: 'The Coffee Ratio Calculator turns a brew ratio and a water volume into the weight of coffee to grind. Ratios are written as 1:X, meaning one part coffee to X parts water by weight, so 1:16 with 350 ml of water needs about 22 g of coffee.',
      howItWorks: 'Water in millilitres is treated as grams, which is accurate enough for brewing water. Dividing that weight by the X in the ratio gives the dose of coffee in grams. The strength figure is 100 divided by the same ratio: a 1:16 brew is about 6.25% coffee by weight before any water is absorbed by the grounds, which is why the brewed liquid tastes weaker than that number suggests.',
      example: '350 ml of water at 1:16: 350 / 16 = 21.9 g of coffee, with a strength reading of 6.25%. The same water at a stronger 1:12 needs 29.2 g, and at 1:18 only 19.4 g. Doubling the water to 700 ml doubles every dose.',
      formulas: [{ label: 'Ratio', expression: 'Coffee(g) = Water(ml) / X for a 1:X ratio' }],
      resultExplanations: [
        { resultLabel: 'Coffee Needed', explanation: 'Grams of coffee for the water volume you entered.' },
        { resultLabel: 'Strength', explanation: 'Coffee as a percentage of the water weight, before the grounds absorb any water.' }
      ],
      workflowLinks: [
        { slug: 'caffeine-limit-calculator', step: 'Track caffeine from your daily coffee.' },
        { slug: 'recipe-scaling-calculator', step: 'Scale the same ratio up or down for a bigger batch.' },
        { slug: 'budget-calculator', step: 'Cost out your coffee habit.' }
      ],
      faqs: [
        { q: 'What is the golden ratio for coffee?', a: 'Most specialty coffee recommends 1:15 to 1:18 coffee to water by weight. Drip sits in that range, French press runs stronger at 1:12-1:15, and espresso is a different process entirely at roughly 1:2.' },
        { q: 'Is this ratio by weight or by volume?', a: 'By weight. A tablespoon of coffee is roughly 5 g, but that varies with grind and roast, so a scale is what makes the ratio repeatable.' },
        { q: 'Why does the strength figure look high?', a: 'It measures coffee as a share of the water, not the strength of the cup. Some water stays in the grounds, and not every soluble compound is extracted, so brewed coffee is around 1.2-1.5% dissolved solids.' },
        { q: 'Does grind size matter?', a: 'It changes extraction, not the dose. Fine for espresso, medium for drip, coarse for French press. If the cup tastes sour it is usually under-extracted; bitter means over-extracted.' }
      ],
      related: ['caffeine-limit-calculator', 'budget-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.65, updatedAt: '2026-11-04' },
  },
  {
    id: 'boiling-point',
    slug: 'boiling-point-calculator',
    name: 'Boiling Point Altitude Calculator',
    shortDesc: 'Find the boiling point of water at your altitude.',
    tagline: 'Water boils lower up high.',
    category: 'daily',
    iconName: 'Thermometer',
    keywords: ['boiling point', 'altitude boiling point', 'water boiling point', 'elevation boiling'],
    kind: 'config',
    config: {
      fields: [
        { id: 'elevation', label: 'Elevation (meters)', type: 'number', defaultValue: 0, min: 0, max: 9000 }
      ],
      results: [
        { label: 'Boiling Point', formulaCode: '100 - elevation/300', suffix: '°C', accent: true },
        { label: 'Fahrenheit', formulaCode: '(100 - elevation/300)*9/5+32', suffix: '°F' }
      ],
      formulaDescription: 'undefined',
      tips: [
        'Above 3,000 m, boiled food needs noticeably longer — as a rule of thumb, add about a minute per 300 m.',
        'A pressure cooker raises the boiling point back above 100 °C, which is why it works at altitude.',
        'The 1 °C per 300 m figure is a close approximation up to about 6,000 m; above that the drop accelerates.',
      ],
    },
    content: {
      intro: 'The Boiling Point Altitude Calculator estimates the temperature at which water boils at a given elevation. Because atmospheric pressure falls as you climb, water boils cooler the higher you go — which is why pasta stays firm and rice stays crunchy on a mountain even after the water has been at a rolling boil.',
      howItWorks: 'The calculator uses a linear approximation: the boiling point drops about 1 °C for every 300 m of elevation, so the result is 100 − (elevation / 300) in Celsius, converted to Fahrenheit by multiplying by 9/5 and adding 32. The relationship is not truly linear, but between sea level and roughly 6,000 m the approximation holds within about half a degree, which is closer than a kitchen thermometer will resolve.',
      example: 'At sea level water boils at 100 °C. At 1,500 m the estimate is 100 − 5 = 95 °C, or 203 °F. Denver, at about 1,600 m, comes out at 94.7 °C. At 3,000 m it is 90 °C, at 5,000 m 83.3 °C, and at the summit of Everest (8,848 m) about 70.5 °C, which is well below the temperature a cup of tea is normally brewed at.',
      formulas: [{ label: 'Boiling Point', expression: 'BP(°C) = 100 - Elevation(m) / 300' }],
      resultExplanations: [
        { resultLabel: 'Boiling Point', explanation: 'The estimated temperature at which water boils at your elevation, in Celsius.' },
        { resultLabel: 'Fahrenheit', explanation: 'The same boiling point in Fahrenheit, for recipes written in °F.' }
      ],
      workflowLinks: [
        { slug: 'recipe-scaling-calculator', step: 'Adjust cooking times and quantities for altitude.' },
        { slug: 'temperature-converter', step: 'Convert between Celsius and Fahrenheit.' },
        { slug: 'caffeine-limit-calculator', step: 'Brewing temperature affects how much caffeine is extracted.' }
      ],
      faqs: [
        { q: 'How much does the boiling point drop per meter?', a: 'About 0.0033 °C per metre at low altitude, which is the 1 °C per 300 m this calculator uses. The real rate steepens with height, so the linear rule drifts by roughly half a degree at 6,000 m and rather more near the top of the troposphere.' },
        { q: 'Does this affect cooking?', a: 'Yes, and mostly for boiled and steamed food. Cooking is driven by temperature, not by how vigorously the water bubbles, so at 3,000 m a pot of water at 90 °C cooks pasta and vegetables noticeably slower than at sea level. Roasting and frying are barely affected because the oven or pan is far hotter than 100 °C.' },
        { q: 'How do I adjust recipes at altitude?', a: 'For boiled foods, a common rule of thumb is to add about a minute of cooking time per 300 m of elevation, then test rather than trusting the clock. A pressure cooker is the reliable fix: it holds pressure above atmospheric and brings the boiling point back above 100 °C.' },
        { q: 'Why does water boil cooler at altitude?', a: 'Boiling happens when vapour pressure equals the surrounding air pressure. Higher up there is less air above you, so less pressure to overcome and the water reaches that balance at a lower temperature. In a vacuum water boils at room temperature for the same reason.' },
        { q: 'Does this work for other liquids?', a: 'The pattern does — every liquid boils at a lower temperature as pressure drops — but the numbers here are specific to water. Alcohol, for example, boils at 78 °C at sea level and falls at its own rate.' }
      ],
      related: ['recipe-scaling-calculator', 'temperature-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.65, updatedAt: '2026-11-04' },
  },
  {
    id: 'daily-commute-cost',
    slug: 'daily-commute-cost-calculator',
    name: 'Daily Commute Cost Calculator',
    shortDesc: 'Calculate the true cost of your daily commute.',
    tagline: 'See what your drive costs.',
    category: 'daily',
    iconName: 'Car',
    keywords: ['commute cost', 'driving cost', 'gas cost commute', 'commute calculator'],
    kind: 'config',
    config: {
      fields: [
        { id: 'distanceKm', label: 'One-Way Distance (km)', type: 'number', defaultValue: 30, min: 1 },
        { id: 'fuelEfficiency', label: 'Fuel Efficiency (L/100km)', type: 'number', defaultValue: 8, min: 1, step: 0.5 },
        { id: 'gasPrice', label: 'Gas Price ($/L)', type: 'number', defaultValue: 1.5, min: 0, step: 0.01 },
        { id: 'workDays', label: 'Work Days per Month', type: 'number', defaultValue: 22, min: 1, max: 31 }
      ],
      results: [
        { label: 'Daily Cost', formulaCode: '(distanceKm*2*fuelEfficiency/100)*gasPrice', suffix: '$', accent: true },
        { label: 'Monthly Cost', formulaCode: '(distanceKm*2*fuelEfficiency/100)*gasPrice*workDays', suffix: '$' },
        { label: 'Annual Cost', formulaCode: '(distanceKm*2*fuelEfficiency/100)*gasPrice*workDays*12', suffix: '$' }
      ],
      formulaDescription: 'undefined',
      tips: [
        'This does not include parking, tolls, or vehicle wear.',
        'Remote work 2 days per week saves 40% on commute costs.',
        'Litres per 100 km is a fuel consumption figure, so lower is better.'
      ],
    },
    content: {
      intro: 'The Daily Commute Cost Calculator works out what the drive to and from work costs in fuel each day, month and year. Give it your one-way distance, the fuel consumption and the pump price, and it multiplies the round trip across your working month.',
      howItWorks: 'A round trip is twice the one-way distance. Fuel used is that distance multiplied by litres per 100 km and divided by 100. Multiplying litres by the price per litre gives the daily cost; multiply by working days per month for the monthly figure, then by 12 for the year. Parking, tolls, insurance and servicing are not part of the result.',
      example: 'A 30 km each-way commute in a car using 8 L/100 km at $1.50 a litre: 60 km x 8 / 100 = 4.8 litres a day, costing $7.20. At 22 working days that is $158.40 a month, and $1,900.80 over a year.',
      formulas: [{ label: 'Cost', expression: 'Litres per round trip = 2 x distance x L/100km / 100; cost = litres x price' }],
      resultExplanations: [
        { resultLabel: 'Daily Cost', explanation: 'Fuel cost for a round trip commute.' },
        { resultLabel: 'Monthly Cost', explanation: 'Daily cost multiplied by working days per month.' },
        { resultLabel: 'Annual Cost', explanation: 'Monthly cost multiplied by 12, assuming the same working pattern all year.' }
      ],
      workflowLinks: [
        { slug: 'budget-calculator', step: 'Include commute costs in your monthly budget.' },
        { slug: 'fuel-cost-calculator', step: 'Calculate fuel costs for any trip.' }
      ],
      faqs: [
        { q: 'How accurate is this?', a: 'It estimates fuel cost only. Add parking, tolls, insurance, and maintenance for the full cost of commuting.' },
        { q: 'Does this include wear and tear?', a: 'No. Depreciation, insurance, tyres and servicing all add to the cost of every kilometre, so the real figure is higher than the fuel bill alone.' },
        { q: 'Why is my real cost higher than this?', a: 'Official fuel consumption figures come from test cycles. Cold starts, traffic, air conditioning and roof racks all raise real-world consumption, sometimes well above the sticker number.' },
        { q: 'Is remote work cheaper?', a: 'Yes. Every day you work from home removes one round trip, which is the daily figure above — $7.20 a day in the example, or about $158 a month at 22 working days.' }
      ],
      related: ['budget-calculator', 'fuel-cost-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75, updatedAt: '2026-11-04' },
  },
  {
    id: 'sa-fuel',
    slug: 'south-africa-fuel-calculator',
    name: 'South Africa Fuel Calculator',
    shortDesc: 'Calculate trip fuel costs with official October 2026 SA petrol and diesel prices by province.',
    tagline: 'Know your fuel cost before you hit the N1.',
    category: 'daily',
    iconName: 'Fuel',
    badge: 'SA',
    featured: true,
    keywords: ['fuel calculator south africa', 'petrol price south africa', 'fuel cost calculator', 'south africa fuel', 'petrol price', 'diesel price', 'sa fuel calculator', 'fuel price gauteng', 'road trip fuel cost'],
    kind: 'custom',
    componentId: 'SaFuelCalculator',
    content: {
      intro:
        'The South Africa Fuel Calculator estimates your trip fuel cost using the official DMPR-regulated petrol and diesel prices effective 7 October 2026. Select your province, pick your fuel type, enter the distance and your car consumption, and instantly see how many litres you need and what the trip will cost in Rand. Petrol prices are regulated pump prices; diesel figures are official wholesale baselines, and forecourt diesel prices vary by station.',
      howItWorks:
        'Choose your province to load the correct inland or coastal price. Enter trip distance and fuel consumption in litres per 100 kilometres. Litres needed equal distance multiplied by consumption and divided by 100, then multiplied by the price per litre to produce total cost and cost per kilometre.',
      example:
        'Johannesburg to Durban is 568 km. At 7.5 L/100km on 95 Unleaded (R30.25/L inland, effective 7 October 2026), you need 42.6 litres costing R1,288.65 total, or about R2.27 per kilometre.',
      formulas: [
        { label: 'Litres Needed', expression: 'Litres = Distance x Consumption / 100' },
        { label: 'Total Cost', expression: 'Cost = Litres x Price per Litre' },
      ],
      resultExplanations: [
        { resultLabel: 'Fuel Needed', explanation: 'Total litres your car will consume for the trip distance at the given fuel consumption rate.' },
        { resultLabel: 'Total Cost', explanation: 'The estimated Rand amount you will spend on fuel for the entire trip.' },
        { resultLabel: 'Cost per km', explanation: 'The fuel cost per kilometre, useful for comparing trips or budgeting monthly travel.' },
      ],
      workflowLinks: [
        { slug: 'fuel-cost-calculator', step: 'Compare with global fuel cost estimates.' },
        { slug: 'budget-calculator', step: 'Include fuel costs in your monthly budget.' },
        { slug: 'currency-converter', step: 'Convert fuel costs to other currencies for cross-border trips.' },
      ],
      faqs: [
        { q: 'How often do South African fuel prices change?', a: 'The Department of Mineral and Petroleum Resources (DMPR) adjusts fuel prices on the first Wednesday of every month based on international oil prices, the rand/dollar exchange rate, transport costs, and local levies. The prices in this tool are effective 7 October 2026; the next scheduled adjustment is 4 November 2026 and was not yet published when the data was last verified on 28 October 2026.' },
        { q: 'Why are inland prices higher than coastal?', a: 'Inland prices include the cost of transporting fuel from coastal ports and refineries to inland regions. In the October 2026 schedule the inland petrol price is 87 cents per litre above the coastal price.' },
        { q: 'What is the difference between Diesel 50ppm and 500ppm?', a: 'Diesel 50ppm has lower sulphur content (50 parts per million) and is typically more expensive. It is required for newer engines with advanced emissions systems. The official DMPR diesel figures are wholesale baselines; forecourt diesel prices are deregulated and vary by station.' },
        { q: 'Are these prices official?', a: 'The petrol prices are the regulated retail prices published by the DMPR effective 7 October 2026. The diesel figures are that schedule’s wholesale baselines. Always confirm the price at the pump, which can differ for diesel and can change at any time.' },
      ],
      sources: [
        {
          label: 'Department of Mineral and Petroleum Resources (DMPR)',
          expression: 'Official fuel prices effective 7 October 2026',
          note: 'https://www.dmpr.gov.za/Services/Petroleum-Resources/Fuel-Prices — the primary schedule used for every price in this calculator.',
        },
        {
          label: 'Petrol Price October 2026',
          expression: 'Secondary confirmation of the DMPR October 2026 figures',
          note: 'https://petrolprice.co.za/petrol-price-october-2026/ — used to cross-check the effective date, zone differentials, and product changes.',
        },
      ],
      related: ['fuel-cost-calculator', 'budget-calculator', 'currency-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-10-30' },
  },
  {
    id: 'gas-mileage',
    slug: 'gas-mileage-calculator',
    name: 'Gas Mileage & Fuel Economy Calculator',
    shortDesc: 'Calculate vehicle fuel economy and convert between US MPG, Imperial MPG, and L/100 km.',
    tagline: 'Track gas mileage and convert fuel efficiency across US, UK, and metric standards.',
    category: 'daily',
    iconName: 'Car',
    badge: 'Popular',
    keywords: ['gas mileage calculator', 'mpg calculator', 'fuel economy calculator', 'liters per 100km calculator', 'fuel consumption calculator', 'miles per gallon'],
    kind: 'custom',
    componentId: 'FuelEconomyCalculator',
    content: {
      intro: 'The Gas Mileage & Fuel Economy Calculator computes vehicle fuel efficiency from distance traveled and fuel consumed. It displays equivalent ratings across US miles per gallon (MPG), UK Imperial miles per gallon, and metric liters per 100 kilometers (L/100 km).',
      howItWorks: 'Distance and fuel volume are converted to standard units. US MPG is miles divided by US gallons. Imperial MPG is miles divided by UK imperial gallons (1 Imperial gallon ≈ 1.20095 US gallons). L/100 km is calculated as (liters / kilometers) × 100.',
      example: 'Driving 300 miles on 10 US gallons of gasoline yields 30.00 US MPG, 36.03 Imperial MPG, and 7.84 L/100 km.',
      formulas: [
        { label: 'US MPG', expression: 'US MPG = Miles / US Gallons' },
        { label: 'Imperial MPG', expression: 'Imperial MPG = Miles / Imperial Gallons = US MPG × 1.20095' },
        { label: 'Liters per 100 km', expression: 'L/100 km = 235.215 / US MPG = (Liters / Kilometers) × 100' },
      ],
      resultExplanations: [
        { resultLabel: 'US miles per gallon', explanation: 'Standard American fuel efficiency rating indicating distance covered per US liquid gallon.' },
        { resultLabel: 'Imperial miles per gallon', explanation: 'United Kingdom and Commonwealth fuel rating based on the larger Imperial gallon (4.546 liters).' },
        { resultLabel: 'Liters per 100 km', explanation: 'Standard metric fuel consumption figure indicating fuel volume needed to travel 100 kilometers.' },
      ],
      workflowLinks: [
        { slug: 'fuel-cost-calculator', step: 'Estimate trip fuel expense using your vehicle fuel economy.' },
        { slug: 'daily-commute-cost-calculator', step: 'Calculate monthly and annual commuting costs based on gas consumption.' },
      ],
      faqs: [
        { q: 'Why is UK MPG higher than US MPG?', a: 'A UK Imperial gallon is about 20% larger than a US liquid gallon (4.546 liters vs 3.785 liters), so a car travels more miles per Imperial gallon.' },
        { q: 'How do I accurately measure my car MPG?', a: 'Fill your tank completely and reset the trip odometer. Drive normally until your next fill-up, fill to full again, and divide the trip miles by the exact gallons pumped.' },
        { q: 'Why is a lower L/100 km number better?', a: 'L/100 km measures consumption (fuel used per distance), whereas MPG measures efficiency (distance per fuel). Lower consumption means better fuel economy.' },
      ],
      related: ['fuel-cost-calculator', 'daily-commute-cost-calculator', 'speed-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-10-26' },
  },
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word & Character Counter',
    shortDesc: 'Count words, characters with and without spaces, sentences, paragraphs, and estimated reading time.',
    tagline: 'Detailed text metrics and customizable reading time estimation.',
    category: 'daily',
    iconName: 'Receipt',
    keywords: ['word counter', 'character counter', 'word count tool', 'reading time calculator', 'sentence counter', 'text analyzer'],
    kind: 'custom',
    componentId: 'WordCounterCalculator',
    content: {
      intro: 'The Word & Character Counter provides real-time text statistics including word count, character count (with and without spaces), sentence count, paragraph count, and an estimated reading time based on an adjustable words-per-minute speed.',
      howItWorks: 'Text is parsed using Unicode whitespace patterns to isolate words. Sentences are counted using terminal punctuation markers (. ! ?), paragraphs are separated by newlines, and reading duration is calculated by dividing total words by the reading speed (defaulting to 238 words per minute).',
      example: 'Pasting a 500-word essay reveals 3,150 characters with spaces, 2,650 characters without spaces, 24 sentences, 5 paragraphs, and an estimated reading time of 2.1 minutes at 238 WPM.',
      formulas: [
        { label: 'Word Count', expression: 'Words = Count of non-empty whitespace-separated tokens' },
        { label: 'Reading Time', expression: 'Reading Minutes = Words / Reading Speed (WPM)' },
      ],
      resultExplanations: [
        { resultLabel: 'Words', explanation: 'Total count of individual words in the entered text.' },
        { resultLabel: 'Characters with spaces', explanation: 'Total byte length and typography count including all spaces, tabs, and line breaks.' },
        { resultLabel: 'Estimated reading time', explanation: 'Projected minutes required for an average adult to read the passage at the selected reading speed.' },
      ],
      workflowLinks: [
        { slug: 'time-card-calculator', step: 'Log client writing, editing, or transcription project hours.' },
        { slug: 'percentage-calculator', step: 'Calculate target keyword densities or length ratios.' },
      ],
      faqs: [
        { q: 'What is the average adult reading speed?', a: 'Standard research indicates most adults read non-technical prose at approximately 200 to 250 words per minute (commonly standardized at 238 WPM).' },
        { q: 'Are hyphenated words counted as one word or two?', a: 'Standard tokenization treats hyphenated compound words without internal spaces as a single lexical word unit.' },
        { q: 'Does this tool store or upload my text?', a: 'No. All counting, text analysis, and reading time estimation happen 100% locally in your browser session.' },
      ],
      related: ['screen-time-cost-calculator', 'scientific-calculator', 'percentage-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-10-26' },
  },
  {
    id: 'dimensional-weight',
    slug: 'dimensional-weight-calculator',
    name: 'Dimensional Weight Calculator',
    shortDesc: 'Calculate billable parcel weight from carton dimensions, carrier divisor, and actual weight.',
    tagline: 'A light box can still be a heavy shipment.',
    category: 'daily',
    iconName: 'Truck',
    badge: 'Shipping',
    featured: false,
    keywords: [
      'dimensional weight calculator',
      'dim weight calculator',
      'how to calculate dimensional weight',
      'billable weight calculator',
      'ups dimensional weight',
      'fedex dimensional weight',
    ],
    kind: 'custom',
    componentId: 'DimensionalWeightCalculator',
    content: {
      intro:
        'The Dimensional Weight Calculator works out what a parcel is billed at when its size, rather than its scale weight, decides the price. Enter the carton dimensions, the actual weight, and the carrier divisor, and it returns the dimensional weight, the billable weight, and how far the parcel is above its actual weight.',
      howItWorks:
        'Carton volume is length x width x height in the carrier unit. Dividing volume by the carrier divisor gives dimensional weight in pounds or kilograms. The billable weight is the greater of that figure and the actual weight. A parcel whose dimensional weight exceeds its actual weight is described as being billed by dimension, and the difference is the weight it is effectively paying for but does not weigh.',
      example:
        'A carton measuring 20 x 16 x 12 inches has a volume of 3,840 cubic inches. Under the UPS and FedEx daily-rate divisor of 139, its dimensional weight is 3,840 / 139 = 27.6 lb. A 10 lb parcel is therefore billed at 27.6 lb, about 176% above its actual weight. The same carton under the 166 retail divisor is 23.1 lb.',
      formulas: [
        { label: 'Carton volume', expression: 'length x width x height' },
        { label: 'Dimensional weight', expression: 'volume / carrier divisor' },
        { label: 'Billable weight', expression: 'max(actual weight, dimensional weight)' },
        {
          label: 'Over actual weight',
          expression: '(billable weight - actual weight) / actual weight x 100',
          note: 'Shown only when actual weight is above zero.',
        },
      ],
      sources: [
        {
          label: 'UPS - Dimensional Weight',
          expression: 'Daily-rate and retail divisors for parcel billing',
          note: 'UPS publishes 139 for daily rates and 166 for retail rates in the US. Service and country can change the rule.',
        },
        {
          label: 'FedEx - Dimensional Weight',
          expression: 'How FedEx calculates dimensional weight',
          note: 'FedEx uses a 139 divisor for US domestic parcel services. Confirm the current tariff before quoting a shipment.',
        },
        {
          label: 'USPS - Dimensional Weight',
          expression: 'When USPS applies dimensional weight',
          note: 'USPS uses a 166 divisor and applies dimensional weight to specified services and sizes. Not every parcel is affected.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Billable weight',
          explanation:
            'The weight the carrier prices. It is the greater of the dimensional and actual figures, before any rounding up to the next whole pound or kilogram.',
        },
        {
          resultLabel: 'Dimensional weight',
          explanation:
            'The hypothetical weight of the space the carton occupies. It is a billing convention, not a physical property of the parcel.',
        },
        {
          resultLabel: 'Over actual weight',
          explanation:
            'How much larger the billable weight is than the scale weight. A high percentage means the packaging, not the product, is driving the shipping cost.',
        },
      ],
      workflowLinks: [
        { slug: 'price-per-unit-calculator', step: 'Compare the shipping cost per item across pack sizes.' },
        { slug: 'trip-cost-calculator', step: 'Price a delivery run or a market trip that includes tolls and parking.' },
        { slug: 'room-volume-calculator', step: 'Measure a larger space when the shipment is furniture or equipment.' },
      ],
      faqs: [
        {
          q: 'Why is my parcel billed at a higher weight than I measured?',
          a: 'The carrier is charging for the space the carton occupies, not just its mass. A large box filled mostly with air still takes up room in a van or aircraft. Reducing the carton size is often the fastest way to lower the bill.',
        },
        {
          q: 'Which divisor should I use?',
          a: 'Match the carrier and service on your label. In the US, UPS and FedEx daily rates use 139, retail rates and USPS use 166, and metric air tariffs commonly use 5,000 or 6,000. The divisor is a commercial term, so confirm it in the current tariff rather than assuming it never changes.',
        },
        {
          q: 'Does dimensional weight apply to every parcel?',
          a: 'No. Carriers apply it to specific services and above certain sizes, and some small or flat-rate services are exempt. The calculator always shows the comparison, so you can see whether dimension actually governs for the entered profile.',
        },
        {
          q: 'How do carriers round the result?',
          a: 'Most round up to the next whole pound or kilogram, and some apply a minimum billable weight. This calculator shows the exact figure so you can see how close the parcel is to the next step, then check the carrier rule for the service you are using.',
        },
        {
          q: 'How can I reduce dimensional weight?',
          a: 'Use the smallest carton that protects the product, remove void fill where a shorter box will do, and consider a poly mailer for soft goods. Do not trade protection for size: a damaged parcel costs more than the weight difference.',
        },
      ],
      related: ['price-per-unit-calculator', 'trip-cost-calculator', 'room-volume-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.86, updatedAt: '2026-10-26' },
  }
];
