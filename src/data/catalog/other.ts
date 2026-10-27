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
          expression: 'Scaled = Amount Ã— (Desired Servings / Original Servings)',
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
          expression: '1RM = Weight Ã— (1 + Reps / 30)',
          note: 'The Epley formula, most accurate for 1â€“10 reps.',
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
          expression: 'Tip = Bill Ã— Rate',
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
          expression: 'Cost = Gallons Ã— Price per Gallon',
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
          expression: 'kWh = Watts / 1000 Ã— Hours Ã— Days',
        },
        {
          label: 'Monthly Cost',
          expression: 'Cost = kWh Ã— Rate per kWh',
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
      'Off-street parking is usually cheaper than on-street meters.'
      ],
    },
    content: {
      intro: 'The Parking Cost Calculator estimates total parking expenses for a trip based on hourly or daily rates and the duration of your stay.',
      howItWorks: 'Enter the parking rate and duration. The calculator shows total cost, including any daily maximums.',
      example: 'Parking at $3/hour for 8 hours = $24, or $15/day max applies = $15.',
      formulas: [{ label: 'Cost', expression: 'Cost = Rate x Hours (capped at daily max)' }],
      resultExplanations: [
        { resultLabel: 'Total Cost', explanation: 'The parking fee, using whichever rate (hourly or daily) is cheaper.' },
        { resultLabel: 'Days', explanation: 'The number of calendar days covered by the parking duration.' }
      ],
      workflowLinks: [
        { slug: 'budget-calculator', step: 'Add parking costs to your travel budget.' },
        { slug: 'fuel-cost-calculator', step: 'Pair with fuel costs for total trip expenses.' }
      ],
      faqs: [
        { q: 'How accurate is this estimate?', a: 'It depends on the actual rates at your parking location. Use it as a planning tool.' },
        { q: 'Does it include taxes?', a: 'No. Enter the total rate including any taxes or fees for an accurate estimate.' },
        { q: 'Can I use this for monthly parking?', a: 'Yes. Enter the monthly rate divided by 30 as the daily rate.' }
      ],
      related: ['budget-calculator', 'fuel-cost-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
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
      'Buying in bulk often reduces cost per serving.',
      'Premium food costs more but may reduce vet bills over time.'
      ],
    },
    content: {
      intro: 'The Pet Food Cost Calculator estimates how much you spend on pet food each month and per year based on your pet weight and food type.',
      howItWorks: 'Enter your pet weight, cost per bag, and how often you buy. The calculator estimates annual and monthly costs.',
      example: 'A 25 kg dog eating a $45 bag every 6 weeks spends about $30 per month.',
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
        { q: 'How much should I budget for pet food?', a: 'Dogs typically cost $30-80 per month. Cats cost $20-50 per month depending on food quality.' },
        { q: 'Does this include treats?', a: 'No. Add 10-20% for treats and supplements if you give them regularly.' },
        { q: 'Is expensive food worth it?', a: 'Higher quality food often means smaller portions and fewer health issues, which can offset the cost.' }
      ],
      related: ['budget-calculator', 'savings-goal-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.65 },
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
      'Sleep mode uses 1-5W. Turn off monitors when not in use.'
      ],
    },
    content: {
      intro: 'The Screen Time Cost Calculator estimates how much electricity your monitors or TV consume based on screen time, wattage, and electricity rate.',
      howItWorks: 'Multiply wattage by hours per day by electricity rate. Standard monitor is 30-60W. TV is 80-200W.',
      example: 'A 40W monitor used 8 hours/day at $0.15/kWh costs $0.048 per day, $17.52 per year.',
      formulas: [{ label: 'Cost', expression: 'Cost = Watts x Hours x Rate / 1000' }],
      resultExplanations: [
        { resultLabel: 'Daily Cost', explanation: 'Electricity cost per day of use.' },
        { resultLabel: 'Monthly Cost', explanation: 'Estimated monthly electricity cost.' },
        { resultLabel: 'Annual Cost', explanation: 'Estimated yearly electricity cost.' }
      ],
      workflowLinks: [
        { slug: 'budget-calculator', step: 'Add electricity costs to your monthly budget.' },
        { slug: 'fuel-cost-calculator', step: 'Compare energy costs across devices.' }
      ],
      faqs: [
        { q: 'How do I find my monitor wattage?', a: 'Check the label on the back or the manufacturer specs. Most monitors are 30-60W.' },
        { q: 'Does this include the computer?', a: 'No. Add the PC wattage (150-400W for desktops, 30-70W for laptops) separately.' },
        { q: 'What is the average electricity rate?', a: 'US average is about $0.15/kWh. Rates range from $0.10 to $0.30+ depending on location.' }
      ],
      related: ['budget-calculator', 'fuel-cost-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
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
      intro: 'The Subscription Total Calculator adds up all your monthly and annual subscriptions to show your true recurring costs per month and per year.',
      howItWorks: 'Enter each subscription cost and billing frequency. The calculator converts everything to monthly and annual totals.',
      example: 'Netflix $15/mo + Spotify $10/mo + iCloud $3/mo = $28/mo, $336/year.',
      formulas: [{ label: 'Total', expression: 'Monthly total = sum of all monthly costs' }],
      resultExplanations: [
        { resultLabel: 'Monthly Total', explanation: 'Total monthly recurring charges.' },
        { resultLabel: 'Annual Total', explanation: 'Total annual recurring charges.' }
      ],
      workflowLinks: [
        { slug: 'budget-calculator', step: 'Include subscriptions in your monthly budget.' },
        { slug: 'savings-goal-calculator', step: 'Redirect cancelled subscriptions to savings.' }
      ],
      faqs: [
        { q: 'How do I find all my subscriptions?', a: 'Check your bank and credit card statements for recurring charges. Apps like Truebill can help.' },
        { q: 'What if I pay annually?', a: 'Divide the annual cost by 12 to get the monthly equivalent.' },
        { q: 'Can I include free trials?', a: 'Add them at their post-trial price so you are prepared if you forget to cancel.' }
      ],
      related: ['budget-calculator', 'savings-goal-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
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
      'A standard unit is 10ml of pure alcohol.'
      ],
    },
    content: {
      intro: 'The Alcohol Units Calculator converts your drink consumption into standard alcohol units and estimates blood alcohol content.',
      howItWorks: 'Units = ABV% x Volume (ml) / 1000. Enter each drink with its ABV and volume.',
      example: 'A pint of beer at 5% ABV = 5 x 568 / 1000 = 2.84 units.',
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
        { q: 'What is a standard unit?', a: 'A standard unit is 10ml (7.9g) of pure alcohol. In the UK, one unit equals a single shot of spirits.' },
        { q: 'How many units in a pint?', a: 'A pint of 5% beer has 2.84 units. A pint of 4% beer has 2.27 units.' },
        { q: 'What is the weekly limit?', a: 'UK guidelines recommend no more than 14 units per week, spread over 3 or more days.' }
      ],
      related: ['calorie-deficit-calculator', 'bmi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
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
      'Use a kitchen scale for consistency.'
      ],
    },
    content: {
      intro: 'The Coffee Ratio Calculator determines the ideal coffee and water amounts for various brewing methods. A golden ratio of 1:15 to 1:18 is standard for drip coffee.',
      howItWorks: 'Enter your desired coffee amount or water amount. The calculator applies the brewing ratio to determine the other.',
      example: 'For 350ml of drip coffee at 1:16 ratio: 350/16 = 21.9g of coffee.',
      formulas: [{ label: 'Ratio', expression: 'Coffee = Water / Ratio' }],
      resultExplanations: [
        { resultLabel: 'Coffee Needed', explanation: 'Grams of coffee beans for your desired water amount.' },
        { resultLabel: 'Strength', explanation: 'The concentration percentage of the brew.' }
      ],
      workflowLinks: [
        { slug: 'caffeine-limit-calculator', step: 'Track caffeine from your daily coffee.' },
        { slug: 'budget-calculator', step: 'Calculate your coffee spending.' }
      ],
      faqs: [
        { q: 'What is the golden ratio for coffee?', a: 'Most specialty coffee recommends 1:15 to 1:18 (coffee to water by weight).' },
        { q: 'How strong is espresso?', a: 'Espresso uses a 1:2 ratio, making it about 8x stronger per volume than drip coffee.' },
        { q: 'Does grind size matter?', a: 'Yes. Fine for espresso, medium for drip, coarse for French press. Grind affects extraction time and flavor.' }
      ],
      related: ['caffeine-limit-calculator', 'budget-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.65 },
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
        { label: 'Boiling Point', formulaCode: '100 - elevation/300', suffix: 'C', accent: true },
        { label: 'Fahrenheit', formulaCode: '(100 - elevation/300)*9/5+32', suffix: 'F' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Above 3,000m, add 1 minute of cooking time per 1,000 feet above sea level.',
      'Pressure cookers restore boiling point to 121 degrees C.'
      ],
    },
    content: {
      intro: 'The Boiling Point Altitude Calculator determines the boiling point of water based on elevation. Water boils at a lower temperature at higher altitudes, affecting cooking times.',
      howItWorks: 'The boiling point drops about 1 degree C for every 300 meters of elevation. Formula: BP = 100 - (Elevation / 300) x 1.',
      example: 'At 1,500 meters elevation, water boils at 95 degrees C instead of 100 degrees C.',
      formulas: [{ label: 'BP', expression: 'BP = 100 - (Elevation / 300)' }],
      resultExplanations: [
        { resultLabel: 'Boiling Point', explanation: 'The temperature at which water boils at your elevation.' },
        { resultLabel: 'Fahrenheit', explanation: 'The boiling point in Fahrenheit scale.' }
      ],
      workflowLinks: [
        { slug: 'recipe-scaling-calculator', step: 'Adjust cooking times for altitude.' },
        { slug: 'temperature-converter', step: 'Convert between Celsius and Fahrenheit.' }
      ],
      faqs: [
        { q: 'How much does boiling point drop per meter?', a: 'About 0.0034 degrees C per meter, or roughly 1 degree C per 300 meters.' },
        { q: 'Does this affect cooking?', a: 'Yes. Water boils at a lower temperature, so food takes longer to cook at altitude.' },
        { q: 'How do I adjust recipes?', a: 'Add 1 minute of cooking time per 1,000 feet above sea level for boiling foods.' }
      ],
      related: ['recipe-scaling-calculator', 'temperature-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.65 },
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
        { label: 'Daily Cost', formulaCode: '(distanceKm*2/fuelEfficiency)*gasPrice', suffix: '$', accent: true },
        { label: 'Monthly Cost', formulaCode: '(distanceKm*2/fuelEfficiency)*gasPrice*workDays', suffix: '$' },
        { label: 'Annual Cost', formulaCode: '(distanceKm*2/fuelEfficiency)*gasPrice*workDays*12', suffix: '$' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'This does not include parking, tolls, or vehicle wear.',
      'Remote work 2 days per week saves 40% on commute costs.'
      ],
    },
    content: {
      intro: 'The Daily Commute Cost Calculator estimates the total daily and annual cost of your commute based on distance, fuel efficiency, and gas price.',
      howItWorks: 'Daily cost = (Distance x 2) / MPG x Gas Price. Multiply by work days for annual total.',
      example: 'A 30 km commute, 8L/100km, $1.50/L costs $11.25/day, $2,880/year.',
      formulas: [{ label: 'Cost', expression: 'Cost = (2 x Distance / MPG) x Gas Price' }],
      resultExplanations: [
        { resultLabel: 'Daily Cost', explanation: 'Fuel cost for a round trip commute.' },
        { resultLabel: 'Monthly Cost', explanation: 'Estimated monthly fuel cost for commuting.' },
        { resultLabel: 'Annual Cost', explanation: 'Estimated yearly fuel cost for commuting.' }
      ],
      workflowLinks: [
        { slug: 'budget-calculator', step: 'Include commute costs in your monthly budget.' },
        { slug: 'fuel-cost-calculator', step: 'Calculate fuel costs for any trip.' }
      ],
      faqs: [
        { q: 'How accurate is this?', a: 'It estimates fuel cost only. Add parking, tolls, insurance, and maintenance for total cost of commuting.' },
        { q: 'Does this include wear and tear?', a: 'No. Vehicle depreciation and maintenance add about $0.10-0.20 per km on top of fuel costs.' },
        { q: 'Is remote work cheaper?', a: 'Yes. Working from home eliminates commute costs entirely, saving the average commuter over $2,000 per year.' }
      ],
      related: ['budget-calculator', 'fuel-cost-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75 },
  },
  {
    id: 'sa-fuel',
    slug: 'south-africa-fuel-calculator',
    name: 'South Africa Fuel Calculator',
    shortDesc: 'Calculate trip fuel costs with current August 2026 SA petrol and diesel prices by province.',
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
        'The South Africa Fuel Calculator estimates your trip fuel cost using the latest DMRE-regulated petrol and diesel prices for all nine provinces. Select your province, pick your fuel type, enter the distance and your car consumption, and instantly see how many litres you need and what the trip will cost in Rand.',
      howItWorks:
        'Choose your province to load the correct inland or coastal pump price. Enter trip distance and fuel consumption in litres per 100 kilometres. The calculator divides distance by consumption to get litres needed, then multiplies by the current price per litre to produce total cost and cost per kilometre.',
      example:
        'Johannesburg to Durban is 568 km. At 7.5 L/100km on 95 Unleaded (R25.58/L inland), you need 42.6 litres costing R1,089.89 total, or R1.92 per kilometre.',
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
        { q: 'How often do South African fuel prices change?', a: 'The DMRE adjusts fuel prices on the first Wednesday of every month based on international oil prices, the rand/dollar exchange rate, and local levies.' },
        { q: 'Why are inland prices higher than coastal?', a: 'Inland prices include the cost of transporting fuel from coastal ports and refineries to inland regions, adding roughly 60 to 75 cents per litre.' },
        { q: 'What is the difference between Diesel 50ppm and 500ppm?', a: 'Diesel 50ppm has lower sulphur content (50 parts per million) and is typically more expensive. It is required for newer engines with advanced emissions systems.' },
      ],
      related: ['fuel-cost-calculator', 'budget-calculator', 'currency-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
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
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
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
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
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
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.86 },
  }
];
