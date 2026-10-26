import { CalculatorMeta } from '../../types';

export const SPORTS_AND_HOME_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'race-time-predictor',
    slug: 'race-time-predictor',
    name: 'Race Time Predictor',
    shortDesc: 'Estimate an equivalent race time at another distance from one known result.',
    tagline: 'One race, four distances.',
    category: 'fitness',
    iconName: 'Timer',
    badge: 'Endurance',
    featured: true,
    keywords: [
      'race time predictor',
      'race time calculator',
      'running time prediction',
      'riegel formula calculator',
      '10k to half marathon predictor',
      'marathon time predictor',
    ],
    kind: 'custom',
    componentId: 'RaceTimePredictor',
    content: {
      intro:
        'The Race Time Predictor uses a recent race result to estimate what you could run at another distance. It applies Riegel’s endurance formula, then shows the equivalent times for 5K, 10K, half marathon, and marathon so you can see the whole progression rather than a single number.',
      howItWorks:
        'The formula scales your time by the ratio of the distances raised to an endurance exponent: T₂ = T₁ × (D₂ ÷ D₁)^1.06. The exponent above one reflects the fact that longer races are run at a slower average pace, because fatigue accumulates. The predictor also converts the result into a pace per kilometre.',
      example:
        'A 50-minute 10K is 3,000 seconds. For a half marathon, the distance ratio is 2.10975, and 2.10975^1.06 is about 2.207, giving roughly 6,620 seconds — 1:50:20, or 5:14 per kilometre. The same effort predicts about 3:49 for a marathon.',
      formulas: [
        { label: 'Riegel prediction', expression: 'T₂ = T₁ × (D₂ ÷ D₁)^1.06' },
        { label: 'Equivalent pace', expression: 'pace = T₂ ÷ D₂' },
        {
          label: 'Exponent',
          expression: '1.06',
          note: 'An empirical endurance constant. It fits road races reasonably well and drifts for very short or ultra distances.',
        },
      ],
      sources: [
        {
          label: 'Riegel, P. S. — Athletic Records and Human Endurance (American Scientist, 1981)',
          expression: 'The original endurance scaling relationship',
          note: 'The source of the distance-to-time power law used here.',
        },
        {
          label: 'World Athletics — Race distance definitions',
          expression: 'Official road race distances',
          note: 'Confirms the 21.0975 km half marathon and 42.195 km marathon distances.',
        },
        {
          label: 'American College of Sports Medicine — Guidelines for Exercise Testing and Prescription',
          expression: 'Endurance performance and pacing context',
          note: 'Background on why average pace falls as distance rises.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Predicted finish',
          explanation:
            'The time the model expects at the target distance if your training and endurance are broadly typical for the result you entered. It is an estimate, not a guarantee.',
        },
        {
          resultLabel: 'Pace',
          explanation:
            'The average pace the prediction implies. Compare it with your known race pace to see how much slowdown the model expects over the longer distance.',
        },
      ],
      workflowLinks: [
        { slug: 'running-pace-calculator', step: 'Turn the predicted time into splits for training.' },
        { slug: 'running-calories-calculator', step: 'Estimate the energy cost of the race.' },
        { slug: 'speed-distance-time-calculator', step: 'Check the average speed behind the pace.' },
      ],
      faqs: [
        {
          q: 'How accurate is the Riegel formula?',
          a: 'It is usually within a few minutes for road races between 5K and the marathon, but it is an average model. Runners with strong endurance tend to beat it at long distances, while speed-oriented runners tend to fall short.',
        },
        {
          q: 'Why does the prediction slow down as distance increases?',
          a: 'Because the exponent is greater than one, the time grows slightly faster than the distance. That captures the fatigue, fuelling limits, and pacing compromises that make a marathon pace slower than a 10K pace.',
        },
        {
          q: 'Can I use a training run instead of a race?',
          a: 'You can, but a race is more reliable because it is a maximal effort with tapering, competition, and accurate measurement. A training run usually understates your capability unless it was a time trial.',
        },
        {
          q: 'Should I trust the marathon prediction from a 5K?',
          a: 'Treat it cautiously. Extrapolating more than about four times the known distance assumes endurance you may not have trained. Use a half marathon or a long tempo run as the input for a marathon prediction.',
        },
      ],
      related: ['running-pace-calculator', 'running-calories-calculator', 'speed-distance-time-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'golf-handicap',
    slug: 'golf-handicap-calculator',
    name: 'Golf Handicap Calculator',
    shortDesc: 'Turn scores into differentials and build a Handicap Index with the World Handicap System table.',
    tagline: 'A fair game, by the numbers.',
    category: 'fitness',
    iconName: 'Flag',
    badge: 'World Handicap System',
    featured: true,
    keywords: [
      'golf handicap calculator',
      'handicap index calculator',
      'golf differential calculator',
      'whs handicap calculator',
      'golf handicap formula',
      'course handicap calculator',
    ],
    kind: 'custom',
    componentId: 'GolfHandicapCalculator',
    content: {
      intro:
        'The Golf Handicap Calculator converts a score into a score differential using the course rating and slope, then builds a Handicap Index from your recent differentials. It applies the World Handicap System rule that counts only your best rounds from the most recent 20.',
      howItWorks:
        'A differential is (adjusted gross score − course rating) × 113 ÷ slope rating. The course rating sets the expected score for a scratch golfer, and the slope scales the result for a bogey golfer on that course. The index is the average of your best differentials, with a small adjustment when only three to six rounds are available.',
      example:
        'Shooting 85 on a course rated 72.0 with a slope of 113 gives a differential of (85 − 72) × 113 ÷ 113 = 13.0. On a harder course with a slope of 130, the same score gives 11.3, because the course is rated more difficult relative to a bogey golfer.',
      formulas: [
        { label: 'Score differential', expression: '(score − course rating) × 113 ÷ slope' },
        { label: 'Handicap Index', expression: 'average of the lowest qualifying differentials' },
        {
          label: 'WHS adjustment',
          expression: '3 rounds: lowest − 2.0; 4: lowest − 1.0; 6: lowest 2 − 1.0',
          note: 'No adjustment applies from five rounds upward in the simplified table used here.',
        },
      ],
      sources: [
        {
          label: 'The R&A and USGA — World Handicap System: Rules of Handicapping',
          expression: 'Score differential and Handicap Index calculation',
          note: 'The governing rules for the differential formula and the best-round table.',
        },
        {
          label: 'USGA — Course Rating and Slope Rating',
          expression: 'Definitions of course rating and slope',
          note: 'Explains why a harder course produces a lower differential for the same score.',
        },
        {
          label: 'The R&A — WHS Guidance',
          expression: 'Minimum rounds and adjustment table',
          note: 'Confirms that at least three 18-hole scores are needed before an index is issued.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Handicap Index',
          explanation:
            'A portable measure of playing ability, expressed to one decimal place. It is not the number of strokes you receive on a particular course; the course handicap converts it for that layout.',
        },
        {
          resultLabel: 'Differential',
          explanation:
            'One round’s performance normalised for course difficulty. Differentials are the raw material of the index, which is why the calculator shows each one before adding it.',
        },
      ],
      workflowLinks: [
        { slug: 'percentage-calculator', step: 'Work with the percentage differences in your scores.' },
        { slug: 'mean-median-mode-calculator', step: 'See how an average behaves with a small set of rounds.' },
        { slug: 'confidence-interval-calculator', step: 'Understand how much a small sample can vary.' },
      ],
      faqs: [
        {
          q: 'How many rounds do I need for a handicap?',
          a: 'At least three 18-hole scores under the World Handicap System. With three or four rounds the index uses only your lowest differential plus an adjustment; from 20 rounds it uses the best eight.',
        },
        {
          q: 'Why is my differential lower on a harder course?',
          a: 'Because the slope rating divides the score difference. A course with a slope of 130 is harder for a bogey golfer than one rated 113, so the same raw score represents a better relative performance and produces a smaller differential.',
        },
        {
          q: 'Is course handicap the same as Handicap Index?',
          a: 'No. The index is your portable baseline. The course handicap adjusts it for the tees and course you are playing, using the slope rating, so you receive more or fewer strokes depending on the layout.',
        },
        {
          q: 'Does this use adjusted gross score?',
          a: 'It expects the adjusted gross score, which caps very high hole scores under net double bogey. If you enter a raw score with a disastrous hole, the differential will be slightly higher than the official one.',
        },
      ],
      related: ['percentage-calculator', 'mean-median-mode-calculator', 'confidence-interval-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'pet-calorie',
    slug: 'pet-calorie-calculator',
    name: 'Pet Calorie Calculator',
    shortDesc: 'Estimate resting and daily calorie needs for a dog or cat from weight and life stage.',
    tagline: 'How much food, roughly.',
    category: 'health',
    iconName: 'PawPrint',
    badge: 'Veterinary estimate',
    featured: true,
    keywords: [
      'pet calorie calculator',
      'dog calorie calculator',
      'cat calorie calculator',
      'how many calories should my dog eat',
      'pet feeding calculator',
      'rer dog calculator',
    ],
    kind: 'custom',
    componentId: 'PetCalorieCalculator',
    content: {
      intro:
        'The Pet Calorie Calculator estimates resting energy requirement and daily maintenance calories for a dog or cat. It uses body weight and a life-stage factor, and shows a practical range plus a treat allowance so the number can be used for feeding rather than just displayed.',
      howItWorks:
        'Resting energy requirement is 70 × body weight in kilograms raised to the power 0.75, the allometric scaling used in veterinary nutrition. Maintenance energy multiplies that by a life-stage factor: about 1.6 for a neutered adult dog, 1.2 for a neutered adult cat, lower for weight loss, and higher for growth.',
      example:
        'A 10 kg neutered dog has a resting requirement of 70 × 10^0.75 ≈ 394 kcal. Multiplying by 1.6 gives about 630 kcal a day, with a practical range of roughly 567–693 kcal and a 63 kcal treat allowance. A 4 kg neutered cat needs about 238 kcal a day instead.',
      formulas: [
        { label: 'Resting energy', expression: 'RER = 70 × weight(kg)^0.75' },
        { label: 'Maintenance energy', expression: 'MER = RER × life-stage factor' },
        {
          label: 'Practical range',
          expression: 'MER × 0.9 to MER × 1.1',
          note: 'Individual metabolism, activity, and body condition vary more than the formula admits.',
        },
      ],
      sources: [
        {
          label: 'National Research Council — Nutrient Requirements of Dogs and Cats (2006)',
          expression: 'Resting and maintenance energy equations',
          note: 'The standard scientific basis for the 70 × BW^0.75 allometric equation.',
        },
        {
          label: 'World Small Animal Veterinary Association — Global Nutrition Guidelines',
          expression: 'Body condition scoring and feeding assessment',
          note: 'Recommends adjusting intake to body condition rather than relying on a formula alone.',
        },
        {
          label: 'American Animal Hospital Association — Nutritional Assessment Guidelines',
          expression: 'Life-stage and clinical nutrition screening',
          note: 'Explains why growing, pregnant, and ill animals need individual veterinary assessment.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Daily calories',
          explanation:
            'A starting maintenance estimate for an adult animal at the chosen life stage. Adjust up or down over a few weeks based on body condition, not on the number alone.',
        },
        {
          resultLabel: 'Resting energy',
          explanation:
            'The energy needed at complete rest in a thermoneutral environment. It is the baseline that life-stage and activity factors multiply.',
        },
      ],
      workflowLinks: [
        { slug: 'dog-age-calculator', step: 'Put the life stage in context with an age conversion.' },
        { slug: 'pet-food-calculator', step: 'Turn the daily amount into a monthly food cost.' },
        { slug: 'ideal-weight-calculator', step: 'Check the human body-weight formula for comparison.' },
      ],
      faqs: [
        {
          q: 'How accurate is a calorie formula for pets?',
          a: 'It is a starting point, not a prescription. Two dogs of the same weight can differ by 25% in energy needs because of age, activity, neuter status, and individual metabolism. Adjust gradually and judge by body condition.',
        },
        {
          q: 'Should I use current weight or ideal weight?',
          a: 'Use current weight for a rough estimate, but if the animal is overweight, calculate from its target weight instead. Feeding an overweight pet for its current weight keeps it overweight.',
        },
        {
          q: 'How much of the daily calories can be treats?',
          a: 'A common guideline is no more than about 10% of daily calories from treats, with the rest from a complete balanced food. The calculator shows that allowance so it is easy to keep track.',
        },
        {
          q: 'Why is the cat factor lower than the dog factor?',
          a: 'Cats have a different metabolic rate and are more prone to obesity, so the maintenance multipliers used in veterinary practice are lower. A neutered adult cat is typically about 1.2 times resting energy, against 1.6 for a comparable dog.',
        },
      ],
      related: ['dog-age-calculator', 'pet-food-calculator', 'ideal-weight-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'aquarium-volume',
    slug: 'aquarium-volume-calculator',
    name: 'Aquarium Volume Calculator',
    shortDesc: 'Work out tank volume in litres and gallons, allowing for substrate and decoration displacement.',
    tagline: 'The real water volume, not the box size.',
    category: 'misc',
    iconName: 'Cuboid',
    badge: 'Aquariums',
    featured: false,
    keywords: [
      'aquarium volume calculator',
      'fish tank volume calculator',
      'tank litres calculator',
      'aquarium gallons calculator',
      'fish tank size calculator',
      'water volume calculator aquarium',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'lengthCm', label: 'Tank length', type: 'number', defaultValue: 100, min: 1, step: 1, suffix: 'cm' },
        { id: 'widthCm', label: 'Tank width', type: 'number', defaultValue: 50, min: 1, step: 1, suffix: 'cm' },
        { id: 'heightCm', label: 'Tank height', type: 'number', defaultValue: 50, min: 1, step: 1, suffix: 'cm' },
        { id: 'substrateCm', label: 'Substrate depth', type: 'number', defaultValue: 5, min: 0, step: 0.5, suffix: 'cm' },
        {
          id: 'displacementPercent',
          label: 'Rock and decor displacement',
          type: 'number',
          defaultValue: 10,
          min: 0,
          max: 90,
          step: 1,
          suffix: '%',
        },
      ],
      results: [
        {
          label: 'Gross volume',
          formulaCode: '(lengthCm * widthCm * heightCm) / 1000',
          suffix: 'L',
        },
        {
          label: 'Net water volume',
          formulaCode:
            '(lengthCm * widthCm * Math.max(0, heightCm - substrateCm) * (1 - displacementPercent / 100)) / 1000',
          suffix: 'L',
          accent: true,
        },
        {
          label: 'US gallons',
          formulaCode:
            '((lengthCm * widthCm * Math.max(0, heightCm - substrateCm) * (1 - displacementPercent / 100)) / 1000) / 3.785411784',
          suffix: 'gal',
        },
        {
          label: 'UK gallons',
          formulaCode:
            '((lengthCm * widthCm * Math.max(0, heightCm - substrateCm) * (1 - displacementPercent / 100)) / 1000) / 4.54609',
          suffix: 'gal',
        },
        {
          label: 'Water weight',
          formulaCode: '(lengthCm * widthCm * Math.max(0, heightCm - substrateCm) * (1 - displacementPercent / 100)) / 1000',
          suffix: 'kg',
        },
      ],
      formulaDescription: 'Net litres = length × width × (height − substrate) × (1 − displacement%) ÷ 1000',
      tips: [
        'Measure inside dimensions, not the outside of the glass. Glass thickness can remove several litres on a large tank.',
        'Substrate and rock displace water. A 10–15% allowance is typical for a planted tank with driftwood and stone.',
        'Water weighs about 1 kg per litre, so the filled weight is much greater than the tank’s dry weight. Check the floor and stand rating.',
      ],
    },
    content: {
      intro:
        'The Aquarium Volume Calculator works out how much water a tank actually holds, not just the outside dimensions. It subtracts the substrate layer and a displacement allowance for rock and decoration, then reports litres, US gallons, UK gallons, and the weight of the water.',
      howItWorks:
        'Gross volume is length times width times height, divided by 1,000 to convert cubic centimetres to litres. The substrate reduces the effective height, and the displacement percentage removes the space taken by hardscape. Water weight follows directly because fresh water is close to 1 kg per litre at normal aquarium temperatures.',
      example:
        'A 100 × 50 × 50 cm tank is 250 L gross. With 5 cm of substrate the water column is 45 cm, giving 225 L. Allowing 10% for rock and wood leaves about 202.5 L, or 53.5 US gallons and 44.5 UK gallons, weighing roughly 203 kg.',
      formulas: [
        { label: 'Gross volume', expression: 'L × W × H ÷ 1000' },
        { label: 'Net volume', expression: 'L × W × (H − substrate) × (1 − displacement) ÷ 1000' },
        { label: 'US gallons', expression: 'litres ÷ 3.78541' },
        { label: 'UK gallons', expression: 'litres ÷ 4.54609' },
      ],
      sources: [
        {
          label: 'NIST Special Publication 811 — Guide for the Use of the SI',
          expression: 'Cubic centimetre, litre, and gallon conversions',
          note: 'The authoritative conversion factors used by the calculator.',
        },
        {
          label: 'USGS Water Science School — Water properties',
          expression: 'Density of fresh water',
          note: 'Supports the approximation of 1 kg per litre used for the weight result.',
        },
        {
          label: 'NIST Handbook 44',
          expression: 'US and Imperial gallon definitions',
          note: 'Explains why US and UK gallons differ by about 20%.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Net water volume',
          explanation:
            'The volume you will actually fill, after substrate and hardscape. Use this figure for stocking, medication, and water-treatment dosing.',
        },
        {
          resultLabel: 'Water weight',
          explanation:
            'The mass of the water alone. Add the tank, stand, substrate, and rock to judge whether the floor can carry the full setup.',
        },
      ],
      workflowLinks: [
        { slug: 'pond-volume-calculator', step: 'Do the same calculation for an outdoor pond.' },
        { slug: 'volume-converter', step: 'Convert the result into another volume unit.' },
        { slug: 'room-volume-calculator', step: 'Check the room volume for ventilation and humidity.' },
      ],
      faqs: [
        {
          q: 'Why is the net volume lower than the tank’s advertised size?',
          a: 'Advertised sizes usually quote the outside dimensions or the gross volume. Substrate, rock, wood, and equipment all take up space, and the water line sits below the rim. A tank sold as 250 L commonly holds 200–220 L.',
        },
        {
          q: 'How much substrate should I allow?',
          a: 'About 5 cm is typical for a basic planted tank, and 7–10 cm for deep-rooted plants. Shallower is easier to clean; deeper gives more root space but displaces more water.',
        },
        {
          q: 'Does temperature change the volume?',
          a: 'Slightly. Water expands as it warms, but the change over the aquarium range is well under 1%, so it does not affect stocking or dosing decisions.',
        },
        {
          q: 'Is the water weight the same as the total weight?',
          a: 'No. The water is only part of it. Add the empty tank, stand, substrate, rock, and equipment. A large tank can weigh several hundred kilograms, which is why it should sit across floor joists rather than between them.',
        },
      ],
      related: ['pond-volume-calculator', 'volume-converter', 'room-volume-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'fertilizer',
    slug: 'fertilizer-calculator',
    name: 'Fertilizer Calculator',
    shortDesc: 'Work out how much fertilizer to spread for a target nitrogen rate, based on the bag analysis.',
    tagline: 'Feed the lawn, not the bag.',
    category: 'misc',
    iconName: 'Sprout',
    badge: 'Lawn & garden',
    featured: true,
    keywords: [
      'fertilizer calculator',
      'lawn fertilizer calculator',
      'nitrogen application calculator',
      'fertilizer rate calculator',
      'how much fertilizer per 1000 sq ft',
      'npk calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'areaSqFt', label: 'Lawn area', type: 'number', defaultValue: 5000, min: 1, step: 100, suffix: 'sq ft' },
        {
          id: 'targetNitrogen',
          label: 'Target nitrogen',
          type: 'number',
          defaultValue: 1,
          min: 0.01,
          step: 0.1,
          suffix: 'lb / 1000 sq ft',
        },
        {
          id: 'bagNitrogenPercent',
          label: 'Bag nitrogen (first N-P-K number)',
          type: 'number',
          defaultValue: 10,
          min: 0.1,
          max: 50,
          step: 0.1,
          suffix: '%',
        },
        { id: 'bagWeightLb', label: 'Bag weight', type: 'number', defaultValue: 50, min: 0.1, step: 1, suffix: 'lb' },
      ],
      results: [
        {
          label: 'Product per 1,000 sq ft',
          formulaCode: 'targetNitrogen / (bagNitrogenPercent / 100)',
          suffix: 'lb',
          accent: true,
        },
        {
          label: 'Total product needed',
          formulaCode: '(targetNitrogen / (bagNitrogenPercent / 100)) * areaSqFt / 1000',
          suffix: 'lb',
        },
        {
          label: 'Bags to buy',
          formulaCode: '((targetNitrogen / (bagNitrogenPercent / 100)) * areaSqFt / 1000) / bagWeightLb',
          suffix: 'bags',
        },
        {
          label: 'Total nitrogen applied',
          formulaCode: 'targetNitrogen * areaSqFt / 1000',
          suffix: 'lb',
        },
        {
          label: 'Product per 1,000 sq ft',
          formulaCode: '(targetNitrogen / (bagNitrogenPercent / 100)) * 0.45359237',
          suffix: 'kg',
        },
      ],
      formulaDescription: 'Product = target nitrogen ÷ (bag N% ÷ 100), then scaled by area ÷ 1,000',
      tips: [
        'The first number in an N-P-K ratio is nitrogen. A 10-10-10 bag is 10% N, so it takes twice the weight of a 20-10-10 bag to deliver the same nitrogen.',
        'Most cool-season lawns want 0.5–1 lb of nitrogen per 1,000 sq ft per application, with several weeks between feeds. More is not better; it burns grass and runs off.',
        'Water in after applying, and keep fertilizer off hard surfaces and out of drains. Local rules may restrict nitrogen timing near waterways.',
      ],
    },
    content: {
      intro:
        'The Fertilizer Calculator converts a target nitrogen rate into the weight of product you need, using the first number on the bag. It reports the product per 1,000 square feet, the total for your lawn, the number of bags to buy, and the actual nitrogen applied.',
      howItWorks:
        'A fertilizer analysis such as 10-10-10 means 10% nitrogen, 10% phosphate, and 10% potash by weight. To deliver a target weight of nitrogen, divide by the nitrogen fraction. That gives product per 1,000 square feet; multiplying by the lawn area in thousands gives the total product, and dividing by the bag weight gives the bag count.',
      example:
        'To apply 1 lb of nitrogen per 1,000 sq ft using a 10-10-10 bag, you need 10 lb of product per 1,000 sq ft. For a 5,000 sq ft lawn that is 50 lb total, exactly one 50 lb bag, delivering 5 lb of actual nitrogen across the lawn.',
      formulas: [
        { label: 'Product per 1,000 sq ft', expression: 'target N ÷ (bag N% ÷ 100)' },
        { label: 'Total product', expression: 'product per 1,000 × area ÷ 1,000' },
        { label: 'Bags', expression: 'total product ÷ bag weight' },
        { label: 'Actual nitrogen', expression: 'target N × area ÷ 1,000' },
      ],
      sources: [
        {
          label: 'USDA Natural Resources Conservation Service — Nutrient Management',
          expression: 'Nitrogen application planning and runoff risk',
          note: 'Federal guidance on matching nutrient applications to crop and site needs.',
        },
        {
          label: 'Penn State Extension — Fertilizing Lawns',
          expression: 'Nitrogen rates and application timing',
          note: 'A practical extension source for the 0.5–1 lb N per 1,000 sq ft range.',
        },
        {
          label: 'Association of American Plant Food Control Officials — Fertilizer label definitions',
          expression: 'N-P-K analysis and guaranteed analysis',
          note: 'Defines what the three numbers on a fertilizer bag mean by weight.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Total product needed',
          explanation:
            'The weight of bagged fertilizer to spread over the whole lawn. Weigh it or calibrate the spreader; guessing at the setting is the usual reason a lawn gets too much or too little.',
        },
        {
          resultLabel: 'Total nitrogen applied',
          explanation:
            'The actual nitrogen delivered to the lawn. It should match your target, and it is the number to compare when switching between products with different analyses.',
        },
      ],
      workflowLinks: [
        { slug: 'percentage-calculator', step: 'Check the percentage arithmetic behind the bag analysis.' },
        { slug: 'topsoil-calculator', step: 'Estimate soil for repairing bare patches before feeding.' },
        { slug: 'gravel-calculator', step: 'Plan a path or bed edge while you are working outside.' },
      ],
      faqs: [
        {
          q: 'What do the three numbers on a fertilizer bag mean?',
          a: 'They are the percentages of nitrogen, available phosphate, and soluble potash, always in that order. A 10-10-10 bag contains 10% of each by weight, with the rest being filler and secondary nutrients.',
        },
        {
          q: 'How much nitrogen should I apply?',
          a: 'For most established cool-season lawns, 0.5–1 lb of nitrogen per 1,000 sq ft per application, with four to six weeks between applications. Warm-season grasses and sandy soils need different scheduling, so check local extension guidance.',
        },
        {
          q: 'Why does the bag count come out fractional?',
          a: 'Because the total product rarely divides evenly by the bag size. Round up to buy whole bags, but do not necessarily spread the extra; over-application is worse for the lawn than a slightly light pass.',
        },
        {
          q: 'Can I use this for a garden or a farm field?',
          a: 'The arithmetic is the same, but the target rate and the area unit differ. Market gardens usually work in pounds per acre or kilograms per hectare, and soil tests should set the target rather than a generic lawn rate.',
        },
      ],
      related: ['percentage-calculator', 'topsoil-calculator', 'gravel-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'pond-volume',
    slug: 'pond-volume-calculator',
    name: 'Pond Volume Calculator',
    shortDesc: 'Estimate pond volume in cubic metres, litres, and gallons, with a shape factor for irregular ponds.',
    tagline: 'Size the pond before the pump.',
    category: 'misc',
    iconName: 'Waves',
    badge: 'Ponds',
    featured: false,
    keywords: [
      'pond volume calculator',
      'pond litres calculator',
      'pond gallon calculator',
      'water garden volume',
      'pond size calculator',
      'pond treatment dosage volume',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'lengthM', label: 'Average length', type: 'number', defaultValue: 5, min: 0.1, step: 0.1, suffix: 'm' },
        { id: 'widthM', label: 'Average width', type: 'number', defaultValue: 3, min: 0.1, step: 0.1, suffix: 'm' },
        { id: 'depthM', label: 'Average depth', type: 'number', defaultValue: 1.5, min: 0.1, step: 0.1, suffix: 'm' },
        {
          id: 'shapeFactor',
          label: 'Shape factor',
          type: 'number',
          defaultValue: 0.8,
          min: 0.1,
          max: 1,
          step: 0.05,
          suffix: '× rectangle',
        },
      ],
      results: [
        {
          label: 'Volume',
          formulaCode: 'lengthM * widthM * depthM * shapeFactor',
          suffix: 'm³',
          accent: true,
        },
        {
          label: 'Litres',
          formulaCode: 'lengthM * widthM * depthM * shapeFactor * 1000',
          suffix: 'L',
        },
        {
          label: 'US gallons',
          formulaCode: '(lengthM * widthM * depthM * shapeFactor * 1000) / 3.785411784',
          suffix: 'gal',
        },
        {
          label: 'Water weight',
          formulaCode: 'lengthM * widthM * depthM * shapeFactor',
          suffix: 'tonnes',
        },
      ],
      formulaDescription: 'Volume = length × width × average depth × shape factor',
      tips: [
        'Use average length and width, not the longest and widest points. For an oval or kidney shape, a shape factor of 0.7–0.85 is a fair approximation.',
        'Average depth matters more than maximum depth. A pond that is 1.8 m in the middle but shallow at the edges may average only 1.2 m.',
        'A cubic metre of water is 1,000 litres and weighs one tonne, so a 20 m³ pond is 20 tonnes before you add fish, plants, or rock.',
      ],
    },
    content: {
      intro:
        'The Pond Volume Calculator estimates how much water a pond holds from its average length, width, and depth, with a shape factor for irregular outlines. The result is given in cubic metres, litres, US gallons, and tonnes of water, which are the units used for pumps, filters, and treatments.',
      howItWorks:
        'A rectangular pond is length times width times average depth. Real ponds are rarely rectangular, so the shape factor scales the bounding rectangle: 1.0 for a true rectangle, around 0.8 for an oval, and lower for a kidney or irregular shape. Multiplying cubic metres by 1,000 gives litres.',
      example:
        'A pond averaging 5 m by 3 m with an average depth of 1.5 m has a bounding volume of 22.5 m³. At a shape factor of 0.8 the actual volume is 18 m³, or 18,000 litres, about 4,755 US gallons, and 18 tonnes of water.',
      formulas: [
        { label: 'Volume', expression: 'V = length × width × average depth × shape factor' },
        { label: 'Litres', expression: 'litres = cubic metres × 1000' },
        { label: 'US gallons', expression: 'gallons = litres ÷ 3.78541' },
        { label: 'Water weight', expression: 'tonnes ≈ cubic metres' },
      ],
      sources: [
        {
          label: 'USDA Natural Resources Conservation Service — Pond Volume and Water Measurement',
          expression: 'Field methods for estimating pond volume',
          note: 'Confirms the use of average depth and area rather than maximum dimensions.',
        },
        {
          label: 'NIST Special Publication 811 — Guide for the Use of the SI',
          expression: 'Cubic metre, litre, and gallon conversions',
          note: 'The conversion factors used for the litre and gallon results.',
        },
        {
          label: 'USGS Water Science School — Water density',
          expression: 'Mass of fresh water per unit volume',
          note: 'Supports the one-tonne-per-cubic-metre approximation.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Volume',
          explanation:
            'The estimated water volume. Use it to size a pump that turns the pond over once every one to two hours, and to dose treatments at the manufacturer’s rate.',
        },
        {
          resultLabel: 'Water weight',
          explanation:
            'The mass of the water alone. Add the liner, rock, and edging to judge whether a raised pond or deck needs structural support.',
        },
      ],
      workflowLinks: [
        { slug: 'aquarium-volume-calculator', step: 'Use the same method for an indoor tank.' },
        { slug: 'volume-converter', step: 'Convert the pond volume into another unit.' },
        { slug: 'gravel-calculator', step: 'Estimate rock or gravel for the pond edge.' },
      ],
      faqs: [
        {
          q: 'How do I measure average depth?',
          a: 'Take several depth readings across the pond and average them, weighting by the area each reading represents. A single reading in the deepest hole overstates the volume badly.',
        },
        {
          q: 'What shape factor should I use?',
          a: 'Use 1.0 for a rectangular pond, about 0.8 for an oval or rounded rectangle, and 0.6–0.75 for a kidney or heavily irregular shape. When in doubt, choose the lower value and treat the result as a conservative estimate.',
        },
        {
          q: 'Why does pond volume matter?',
          a: 'Every pump, filter, and treatment is specified against volume. A pump that is too small will not clear the water, and a treatment dosed for the wrong volume can harm fish. Volume is also the basis for stocking limits.',
        },
        {
          q: 'Does rainfall or evaporation change the volume?',
          a: 'Yes, but the design volume is what matters for equipment. Evaporation can lower a pond by several centimetres a week in summer, so top-up water and a stable water level matter more than recalculating the volume.',
        },
      ],
      related: ['aquarium-volume-calculator', 'volume-converter', 'gravel-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'salary-increase',
    slug: 'salary-increase-calculator',
    name: 'Salary Increase Calculator',
    shortDesc: 'See what a raise is worth before and after inflation, with the monthly difference.',
    tagline: 'A raise is not a raise until inflation is counted.',
    category: 'finance',
    iconName: 'TrendingUp',
    badge: 'Pay',
    featured: true,
    keywords: [
      'salary increase calculator',
      'raise calculator',
      'pay rise calculator',
      'percentage increase salary',
      'real wage calculator',
      'inflation adjusted raise',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'currentSalary', label: 'Current annual salary', type: 'number', defaultValue: 50000, min: 0, step: 1000 },
        { id: 'increasePercent', label: 'Raise', type: 'number', defaultValue: 5, min: -100, max: 1000, step: 0.1, suffix: '%' },
        { id: 'inflationPercent', label: 'Inflation rate', type: 'number', defaultValue: 2.5, min: -50, max: 1000, step: 0.1, suffix: '%' },
      ],
      results: [
        {
          label: 'New salary',
          formulaCode: 'currentSalary * (1 + increasePercent / 100)',
          accent: true,
        },
        { label: 'Annual raise', formulaCode: 'currentSalary * increasePercent / 100' },
        { label: 'Monthly raise', formulaCode: '(currentSalary * increasePercent / 100) / 12' },
        {
          label: 'Real increase after inflation',
          formulaCode: '((1 + increasePercent / 100) / (1 + inflationPercent / 100) - 1) * 100',
          suffix: '%',
        },
        {
          label: 'Inflation-adjusted purchasing power',
          formulaCode: '(currentSalary * (1 + increasePercent / 100)) / (1 + inflationPercent / 100)',
        },
      ],
      formulaDescription: 'New salary = current × (1 + raise%); real change = (1 + raise%) ÷ (1 + inflation%) − 1',
      tips: [
        'A 3% raise during 4% inflation is a real-terms pay cut, even though the nominal salary rises.',
        'The real change is a ratio of ratios, not simply raise minus inflation, though the two are close for small percentages.',
        'Ask whether the raise is on base salary or a one-off bonus. Only a base increase compounds in future years.',
      ],
    },
    content: {
      intro:
        'The Salary Increase Calculator shows what a raise does to your annual and monthly pay, and what it is worth after inflation. It separates the nominal increase — the number on the contract — from the real increase in purchasing power.',
      howItWorks:
        'The new salary is the current salary multiplied by one plus the raise percentage. The annual raise is the difference, and dividing by twelve gives the monthly change. The real increase divides the raise factor by the inflation factor, because prices are rising at the same time as pay.',
      example:
        'A $50,000 salary with a 5% raise becomes $52,500, a $2,500 annual raise or about $208 a month. If inflation is 2.5%, the real increase is only about 2.44%, and the new salary buys what $51,220 bought before the raise.',
      formulas: [
        { label: 'New salary', expression: 'new = current × (1 + raise%)' },
        { label: 'Monthly raise', expression: 'monthly = (new − current) ÷ 12' },
        { label: 'Real increase', expression: 'real% = ((1 + raise%) ÷ (1 + inflation%) − 1) × 100' },
        { label: 'Purchasing power', expression: 'new ÷ (1 + inflation%)' },
      ],
      sources: [
        {
          label: 'US Bureau of Labor Statistics — Real Earnings',
          expression: 'Nominal and inflation-adjusted wage changes',
          note: 'The standard method for deflating nominal pay by the consumer price index.',
        },
        {
          label: 'US Bureau of Labor Statistics — CPI Inflation Calculator',
          expression: 'Purchasing power of the dollar over time',
          note: 'A public check on the inflation adjustment used here.',
        },
        {
          label: 'OECD — Average annual wages',
          expression: 'Cross-country wage comparison methodology',
          note: 'Context for comparing a nominal raise with real earnings growth.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'New salary',
          explanation:
            'The nominal salary after the raise. It is the figure that appears on the contract and the one payroll will use.',
        },
        {
          resultLabel: 'Real increase after inflation',
          explanation:
            'The change in what the salary can actually buy. A positive number means the raise beat inflation; a negative number means it did not.',
        },
      ],
      workflowLinks: [
        { slug: 'inflation-calculator', step: 'See how prices have changed over a longer period.' },
        { slug: 'take-home-pay-calculator', step: 'Estimate what the new salary leaves after tax.' },
        { slug: 'salary-to-hourly-calculator', step: 'Convert the new salary into an hourly rate.' },
      ],
      faqs: [
        {
          q: 'Is a 5% raise good?',
          a: 'It depends on inflation and your market. A 5% raise with 2.5% inflation is a real gain of about 2.4%; the same raise with 6% inflation is a real cut. Compare it with both the cost of living and what similar roles pay.',
        },
        {
          q: 'Why is the real increase not just raise minus inflation?',
          a: 'Because the two percentages apply to different bases. Dividing the factors is the exact way to combine them. For small rates the difference is tiny, but it grows as the numbers get larger.',
        },
        {
          q: 'Should I count a bonus as a raise?',
          a: 'No. A bonus is usually one-off and does not compound, while a base salary increase raises future pay, pension contributions, and often overtime. The calculator is for a change to base salary.',
        },
        {
          q: 'What if my raise is below inflation?',
          a: 'Your nominal pay rises but your purchasing power falls. That is still useful information for a negotiation: the real value of the role, and the market rate for it, are stronger arguments than the inflation figure alone.',
        },
      ],
      related: ['inflation-calculator', 'take-home-pay-calculator', 'salary-to-hourly-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'moving-cost',
    slug: 'moving-cost-calculator',
    name: 'Moving Cost Calculator',
    shortDesc: 'Estimate a move from distance, labour, packing, and supplies, with a cost per kilometre.',
    tagline: 'The quote, itemised.',
    category: 'misc',
    iconName: 'Truck',
    badge: 'Moving',
    featured: false,
    keywords: [
      'moving cost calculator',
      'movers cost calculator',
      'cost to move calculator',
      'moving estimate calculator',
      'relocation cost calculator',
      'moving truck cost',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'distanceKm', label: 'Moving distance', type: 'number', defaultValue: 500, min: 0, step: 10, suffix: 'km' },
        { id: 'ratePerKm', label: 'Rate per kilometre', type: 'number', defaultValue: 2, min: 0, step: 0.1 },
        { id: 'baseFee', label: 'Base / call-out fee', type: 'number', defaultValue: 200, min: 0, step: 10 },
        { id: 'laborHours', label: 'Labour hours', type: 'number', defaultValue: 8, min: 0, step: 0.5, suffix: 'h' },
        { id: 'hourlyRate', label: 'Hourly labour rate', type: 'number', defaultValue: 50, min: 0, step: 1 },
        { id: 'packingCost', label: 'Professional packing', type: 'number', defaultValue: 300, min: 0, step: 10 },
        { id: 'suppliesCost', label: 'Boxes and supplies', type: 'number', defaultValue: 100, min: 0, step: 10 },
        { id: 'otherCost', label: 'Other costs', type: 'number', defaultValue: 0, min: 0, step: 10 },
      ],
      results: [
        {
          label: 'Transport',
          formulaCode: 'baseFee + distanceKm * ratePerKm',
          accent: true,
        },
        { label: 'Labour', formulaCode: 'laborHours * hourlyRate' },
        { label: 'Packing and extras', formulaCode: 'packingCost + suppliesCost + otherCost' },
        { label: 'Total move cost', formulaCode: 'baseFee + distanceKm * ratePerKm + laborHours * hourlyRate + packingCost + suppliesCost + otherCost' },
        {
          label: 'Cost per kilometre',
          formulaCode:
            '(baseFee + distanceKm * ratePerKm + laborHours * hourlyRate + packingCost + suppliesCost + otherCost) / Math.max(distanceKm, 1)',
        },
      ],
      formulaDescription: 'Total = base fee + distance × rate + labour hours × rate + packing + supplies + other',
      tips: [
        'Ask whether the quote is binding or an estimate. A binding quote protects you from a surprise on moving day; a non-binding estimate can rise by a set percentage.',
        'Labour is often billed from arrival to departure, including travel between addresses, not just the hours spent carrying boxes.',
        'Declutter before getting quotes. Movers price volume and weight, so every box you do not move is money saved.',
      ],
    },
    content: {
      intro:
        'The Moving Cost Calculator itemises a move into transport, labour, and extras, then totals it and shows the cost per kilometre. It is built for comparing quotes or building your own estimate rather than accepting a single lump sum.',
      howItWorks:
        'Transport is a base or call-out fee plus a per-kilometre rate. Labour is hours multiplied by an hourly rate. Packing, supplies, and any other costs are added as extras. Dividing the total by the distance gives a cost per kilometre, which makes short and long moves comparable.',
      example:
        'A 500 km move with a $200 base fee and $2 per km costs $1,200 in transport. Eight labour hours at $50 adds $400, and $300 packing plus $100 supplies adds $400 more. The total is $2,000, or $4 per kilometre.',
      formulas: [
        { label: 'Transport', expression: 'base fee + distance × rate per km' },
        { label: 'Labour', expression: 'hours × hourly rate' },
        { label: 'Extras', expression: 'packing + supplies + other' },
        { label: 'Total', expression: 'transport + labour + extras' },
      ],
      sources: [
        {
          label: 'US Federal Motor Carrier Safety Administration — Your Rights and Responsibilities When You Move',
          expression: 'Binding and non-binding moving estimates',
          note: 'Explains the estimate types and the documents a mover must provide.',
        },
        {
          label: 'IRS Publication 521 — Moving Expenses',
          expression: 'Deductible moving costs and distance test',
          note: 'Defines which moving costs are recognised, even though the federal deduction is currently suspended for most taxpayers.',
        },
        {
          label: 'US Bureau of Labor Statistics — Consumer Expenditure Survey',
          expression: 'Household moving and household operations spending',
          note: 'Background on how much households typically spend on moves.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Total move cost',
          explanation:
            'The sum of transport, labour, and extras before tax, tips, or insurance. Add those separately; they are not part of the mover’s base quote.',
        },
        {
          resultLabel: 'Cost per kilometre',
          explanation:
            'A comparison figure. Short moves are dominated by the base fee and labour, so their cost per kilometre is much higher than a long interstate move.',
        },
      ],
      workflowLinks: [
        { slug: 'salary-increase-calculator', step: 'Check whether a relocation raise covers the move.' },
        { slug: 'fuel-cost-calculator', step: 'Price the fuel if you are driving a rental truck yourself.' },
        { slug: 'car-depreciation-calculator', step: 'Account for the value of the vehicle you are moving.' },
      ],
      faqs: [
        {
          q: 'Is a moving quote binding?',
          a: 'Not always. A binding quote fixes the price in advance, while a non-binding estimate can change based on actual weight and services. Ask which one you are signing, and get it in writing before the truck arrives.',
        },
        {
          q: 'What is usually not included in a mover’s quote?',
          a: 'Tips, insurance or valuation coverage above the basic release rate, storage, stairs or long-carry fees, and packing materials are common extras. Read the line items rather than comparing only the headline number.',
        },
        {
          q: 'Should I move myself to save money?',
          a: 'For short moves with little furniture, a rental truck can be cheaper. For long distances, fuel, tolls, accommodation, and your own time often narrow the gap, and professional movers carry insurance and equipment you would otherwise rent.',
        },
        {
          q: 'How far in advance should I book?',
          a: 'Four to eight weeks is typical for a summer move, and longer if you need a specific date. Last-minute bookings cost more and give you less choice, especially at month-end when leases turn over.',
        },
      ],
      related: ['salary-increase-calculator', 'fuel-cost-calculator', 'car-depreciation-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'swim-pace',
    slug: 'swim-pace-calculator',
    name: 'Swim Pace Calculator',
    shortDesc: 'Convert a swim time and distance into pace per 100 m, speed, and split times.',
    tagline: 'The pace per 100 is the number that matters.',
    category: 'fitness',
    iconName: 'Waves',
    badge: 'Swimming',
    featured: false,
    keywords: [
      'swim pace calculator',
      'swimming pace per 100',
      'swim time calculator',
      'pool pace calculator',
      'swim split calculator',
      'swim speed calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'distanceM', label: 'Distance', type: 'number', defaultValue: 1500, min: 1, step: 25, suffix: 'm' },
        { id: 'minutes', label: 'Minutes', type: 'number', defaultValue: 30, min: 0, step: 1 },
        { id: 'seconds', label: 'Seconds', type: 'number', defaultValue: 0, min: 0, max: 59, step: 1 },
      ],
      results: [
        { label: 'Total time', formulaCode: 'minutes * 60 + seconds', suffix: 's' },
        {
          label: 'Pace per 100 m',
          formulaCode: '(minutes * 60 + seconds) / distanceM * 100',
          suffix: 's',
          accent: true,
        },
        {
          label: 'Pace per 100 m in minutes',
          formulaCode: '(minutes * 60 + seconds) / distanceM * 100 / 60',
          suffix: 'min',
        },
        { label: 'Average speed', formulaCode: 'distanceM / (minutes * 60 + seconds)', suffix: 'm/s' },
        {
          label: 'Split per 25 m',
          formulaCode: '(minutes * 60 + seconds) / distanceM * 25',
          suffix: 's',
        },
      ],
      formulaDescription:
        'Pace per 100 m = total seconds / distance x 100; speed = distance / total seconds.',
      tips: [
        'A pace per 100 m of 120 seconds is 2:00 per 100, which is a common way to describe a 1500 m swim at 30:00.',
        'Short course (25 m) is faster than long course (50 m) because there are more turns. Compare paces only within the same course length.',
        'Open water has no turns, plus sighting and current. A pool pace is a training reference, not a prediction of open-water time.',
      ],
    },
    content: {
      intro:
        'The Swim Pace Calculator converts a swim time and distance into pace per 100 metres, average speed, and a 25 m split. Pace per 100 is the standard shorthand for swimming speed and the easiest way to compare efforts across distances.',
      howItWorks:
        'Minutes are converted to seconds and added to the seconds field to get total time. Dividing by distance and multiplying by 100 gives seconds per 100 metres. Dividing that by 60 expresses the pace in decimal minutes. Average speed is distance divided by total seconds. The 25 m split applies the same pace to a quarter of a 100 m length.',
      example:
        'A 1,500 m swim in 30:00 is 1,800 seconds. Pace per 100 m is 1,800 / 1,500 x 100 = 120 seconds, or 2:00 per 100. Average speed is 0.833 m/s, and a 25 m split is 30 seconds.',
      formulas: [
        { label: 'Total seconds', expression: 'minutes x 60 + seconds' },
        { label: 'Pace per 100 m', expression: 'total seconds / distance x 100' },
        { label: 'Average speed', expression: 'distance / total seconds' },
        { label: '25 m split', expression: 'total seconds / distance x 25' },
      ],
      sources: [
        {
          label: 'World Aquatics - Competition Regulations',
          expression: 'Course lengths and competition distances',
          note: 'The governing rules for 25 m and 50 m courses and standard event distances.',
        },
        {
          label: 'USA Swimming - Training and Pace Guidance',
          expression: 'Pace per 100 and set design',
          note: 'Coaching guidance on using pace per 100 to set training intervals.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Pace per 100 m',
          explanation:
            'Seconds per 100 metres, the standard swimming pace unit. Convert the decimal seconds to minutes and seconds for a clock-style readout.',
        },
        {
          resultLabel: 'Pace per 100 m in minutes',
          explanation:
            'The same pace in decimal minutes, useful for spreadsheet comparisons or for converting to a training interval.',
        },
        {
          resultLabel: 'Split per 25 m',
          explanation:
            'The average time per 25 m length at this pace. Actual splits vary with turns, starts, and pacing strategy.',
        },
      ],
      workflowLinks: [
        { slug: 'running-pace-calculator', step: 'Compare land and water pacing for a triathlon.' },
        { slug: 'race-time-predictor', step: 'Project a time at another distance from the same effort.' },
        { slug: 'calories-burned-calculator', step: 'Estimate the energy cost of the session.' },
      ],
      faqs: [
        {
          q: 'How do I read a swim pace of 2:00 per 100?',
          a: 'It means two minutes for every 100 metres. A 400 m swim at that pace takes 8:00, and a 1,500 m swim takes 30:00. Pace per 100 is used because it makes different distances directly comparable.',
        },
        {
          q: 'Why is my short-course pace faster than long-course?',
          a: 'A 25 m pool has twice as many turns as a 50 m pool, and each push-off adds speed without a stroke. The difference is usually a few seconds per 100. Compare times only within the same course length, or use a conversion factor with caution.',
        },
        {
          q: 'Does this calculator include turns and starts?',
          a: 'It uses total time, so turns and the start are included in the average. It does not break them out. For a detailed race analysis, record splits per length and compare the turn times separately.',
        },
        {
          q: 'How can I use pace per 100 in training?',
          a: 'Set an interval slightly above your pace to allow rest. If your pace is 2:00 per 100, a set of 10 x 100 on 2:20 gives about 20 seconds rest per repeat. Adjust the interval to the purpose of the set rather than holding one number for every workout.',
        },
        {
          q: 'Can I use this for open water?',
          a: 'Yes, but treat the result as a pool-equivalent reference. Open water adds sighting, waves, current, and no turns, and wetsuits change buoyancy and speed. A pool pace is a useful fitness marker, not a precise race prediction.',
        },
      ],
      related: ['running-pace-calculator', 'race-time-predictor', 'calories-burned-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
];
