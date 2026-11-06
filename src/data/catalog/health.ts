import { CalculatorMeta } from '../../types';

export const HEALTH_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'bmi',
    slug: 'bmi-calculator',
    name: 'BMI & Body Health',
    shortDesc: 'Compute Body Mass Index with Metric & Imperial units and target healthy weight guides.',
    tagline: 'Instant health index and target weight range breakdown.',
    category: 'health',
    iconName: 'Activity',
    badge: 'Health',
    featured: true,
    keywords: ['bmi', 'bmi calculator', 'body mass index', 'body weight', 'healthy weight', 'weight range'],
    kind: 'custom',
    componentId: 'BmiCalculator',
    content: {
      intro:
        'The BMI Calculator computes your Body Mass Index from weight and height and classifies it against the WHO standard ranges. It also reveals the healthy weight band for your height so you can see where you fall.',
      howItWorks:
        'BMI is weight in kilograms divided by height in meters squared. The result maps onto standard categories: underweight below 18.5, normal 18.5-24.9, overweight 25-29.9, and obese 30 and above. Healthy weight is the range producing a BMI in the normal band.',
      example:
        'At 70 kg and 175 cm, BMI is 70 / (1.75 x 1.75) = 22.9, comfortably in the normal range. The healthy band for that height spans roughly 56.6 to 76.3 kg.',
      formulas: [
        {
          label: 'Body Mass Index',
          expression: 'BMI = Weight (kg) / Height (m)²',
        },
        {
          label: 'Healthy Weight Band',
          expression: 'Weight = BMI × Height (m)²',
          note: 'For BMI 18.5–24.9.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Body Mass Index',
          explanation:
            'Your weight scaled to height, classified by the WHO standard ranges shown in the category badge.',
        },
        {
          resultLabel: 'Healthy Weight Range',
          explanation:
            'The weight band for your height that produces a BMI in the normal 18.5–24.9 range.',
        },
      ],
      workflowLinks: [
        { slug: 'bmr-calculator', step: 'Find your calorie baseline alongside your BMI.' },
        { slug: 'body-fat-calculator', step: 'Get a more accurate body-composition reading.' },
      ],
      faqs: [
        { q: 'Is BMI accurate for everyone?', a: 'BMI is a useful population-level screen but can misclassify muscular athletes, who may appear overweight despite low body fat.' },
        { q: 'What is a healthy BMI range?', a: 'The WHO defines 18.5 to 24.9 as normal weight, with under 18.5 underweight and 25+ overweight or obese.' },
        { q: 'Does BMI account for body composition?', a: 'No. For a fuller picture, pair BMI with waist circumference or body-fat percentage, such as the body-fat calculator on this site.' },
      ],
      related: ['bmr-calculator', 'body-fat-calculator', 'ideal-weight-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.9,
      updatedAt: '2026-08-21',
    },
  },
  {
    id: 'bmr',
    slug: 'bmr-calculator',
    name: 'BMR & Calorie Baseline',
    shortDesc: 'Estimate daily calorie needs using age, height, weight, and sex.',
    tagline: 'Find the calorie baseline your body burns at rest.',
    category: 'health',
    iconName: 'Flame',
    keywords: ['bmr', 'basal metabolic rate', 'calorie calculator', 'daily calories', 'metabolism', 'calorie baseline'],
    kind: 'config',
    config: {
      fields: [
        { id: 'weightKg', label: 'Body Weight', type: 'number', defaultValue: 70, min: 20, suffix: 'kg' },
        { id: 'heightCm', label: 'Height', type: 'number', defaultValue: 175, min: 100, suffix: 'cm' },
        { id: 'age', label: 'Age', type: 'number', defaultValue: 30, min: 15, suffix: 'yrs' },
        { id: 'sex', label: 'Sex (1 = Male, 0 = Female)', type: 'number', defaultValue: 1, min: 0, max: 1, step: 1 },
      ],
      results: [
        { label: 'Basal Metabolic Rate', formulaCode: '(10 * weightKg) + (6.25 * heightCm) - (5 * age) + (sex === 1 ? 5 : -161)', suffix: 'kcal/day', accent: true },
        { label: 'Sedentary Needs (x1.2)', formulaCode: '((10 * weightKg) + (6.25 * heightCm) - (5 * age) + (sex === 1 ? 5 : -161)) * 1.2', suffix: 'kcal' },
        { label: 'Moderate Activity (x1.55)', formulaCode: '((10 * weightKg) + (6.25 * heightCm) - (5 * age) + (sex === 1 ? 5 : -161)) * 1.55', suffix: 'kcal' },
      ],
      formulaDescription: 'Mifflin-St Jeor: 10 x weight + 6.25 x height - 5 x age + 5 (male) or -161 (female)',
      tips: [
        'BMR is the energy needed at complete rest, before any activity.',
        'Multiply BMR by an activity factor to estimate total daily calorie needs.',
      ],
    },
    content: {
      intro:
        'The BMR Calculator estimates the calories your body burns at rest using the Mifflin-St Jeor equation, the most accurate standard formula for everyday use. It also applies common activity multipliers for maintenance planning.',
      howItWorks:
        'BMR uses weight in kilograms, height in centimeters, age, and sex: 10 x weight + 6.25 x height - 5 x age + 5 for men or -161 for women. Multiplying by activity factors (1.2 sedentary, 1.55 moderate) estimates daily maintenance calories.',
      example:
        'A 30-year-old, 70 kg, 175 cm male has a BMR near 1,649 kcal. With moderate activity, his maintenance need is about 2,556 kcal per day.',
      formulas: [
        {
          label: 'Basal Metabolic Rate',
          expression: 'BMR = 10 × weight + 6.25 × height − 5 × age + 5',
          note: 'Mifflin-St Jeor; subtract 161 instead of adding 5 for women.',
        },
        {
          label: 'Maintenance Calories',
          expression: 'TDEE = BMR × Activity Factor',
          note: '1.2 sedentary, 1.55 moderate, 1.725 active.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Basal Metabolic Rate',
          explanation:
            'Calories burned at complete rest, before any activity, per the Mifflin-St Jeor equation.',
        },
        {
          resultLabel: 'Sedentary / Moderate Needs',
          explanation:
            'Daily maintenance calories when BMR is multiplied by a lifestyle activity factor.',
        },
      ],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'Pair your calorie baseline with body mass index.' },
        { slug: 'protein-intake-calculator', step: 'Set protein targets against your calorie needs.' },
      ],
      faqs: [
        { q: 'What is the difference between BMR and TDEE?', a: 'BMR is resting energy only. Total Daily Energy Expenditure (TDEE) adds activity and digestion, estimated by multiplying BMR by an activity factor.' },
        { q: 'How do I use BMR to lose weight?', a: 'Eat below your maintenance calories, roughly TDEE minus 300-500 kcal, while keeping protein high to preserve muscle.' },
        { q: 'Which formula does this use?', a: 'The Mifflin-St Jeor equation, which research consistently ranks among the most accurate for general populations.' },
      ],
      related: ['bmi-calculator', 'calories-burned-calculator', 'protein-intake-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.8,
      updatedAt: '2026-08-21',
    },
  },
  {
    id: 'calories-burned',
    slug: 'calories-burned-calculator',
    name: 'Calories Burned Calculator',
    shortDesc: 'Estimate calories burned during exercise using MET values.',
    tagline: 'Measure the burn of your workout sessions.',
    category: 'health',
    iconName: 'Zap',
    keywords: ['calories burned', 'exercise calories', 'workout calories', 'met', 'calories running', 'calories cycling'],
    kind: 'config',
    config: {
      fields: [
        { id: 'weightKg', label: 'Body Weight', type: 'number', defaultValue: 70, min: 20, suffix: 'kg' },
        { id: 'minutes', label: 'Exercise Duration', type: 'number', defaultValue: 45, min: 1, suffix: 'min' },
        { id: 'met', label: 'Activity Intensity (MET)', type: 'number', defaultValue: 7, min: 1, max: 15, step: 0.5 },
      ],
      results: [
        { label: 'Calories Burned', formulaCode: 'met * 3.5 * weightKg / 200 * minutes', suffix: 'kcal', accent: true },
      ],
      formulaDescription: 'Calories = MET x 3.5 x Weight (kg) / 200 x Minutes',
      tips: [
        'Typical MET values: walking 3.5, cycling 7, running 9.8, swimming 8.',
        'Heavier people burn more calories for the same activity and duration.',
      ],
    },
    content: {
      intro:
        'The Calories Burned Calculator estimates energy expenditure during exercise using metabolic equivalents, known as METs. Runners, cyclists, and gym-goers use it to quantify each session and balance their training against nutrition.',
      howItWorks:
        'One MET equals the energy burned sitting still. Activity is scored in METs, and calories equal MET x 3.5 x weight (kg) / 200 x minutes. Since body weight is in the formula, heavier individuals burn more for identical effort.',
      example:
        'A 70 kg person cycling at a MET of 7 for 45 minutes burns 7 x 3.5 x 70 / 200 x 45 = about 386 kcal.',
      formulas: [
        {
          label: 'Calories Burned',
          expression: 'kcal = MET × 3.5 × Weight (kg) / 200 × Minutes',
          note: '3.5 ml O₂/kg/min = 1 MET baseline.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Calories Burned',
          explanation:
            'Total energy expenditure for the session, computed from the activity MET value, your weight, and duration.',
        },
      ],
      workflowLinks: [
        { slug: 'bmr-calculator', step: 'Compare exercise burn against your daily baseline.' },
        { slug: 'running-pace-calculator', step: 'Plan the pace and distance behind a running burn.' },
      ],
      faqs: [
        { q: 'What is a MET?', a: 'A metabolic equivalent rates how many times resting metabolism an activity demands. Running scores around 9.8, brisk walking around 3.5.' },
        { q: 'How accurate is this estimate?', a: 'It is a solid estimate based on published MET values, accurate to roughly 10-15% for most activities and intensities.' },
        { q: 'Should I eat back exercise calories?', a: 'Not necessarily. Activity trackers overestimate, and many people undo workouts by over-rewarding themselves at meals.' },
      ],
      related: ['bmr-calculator', 'running-pace-calculator', 'one-rep-max-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.75,
      updatedAt: '2026-08-21',
    },
  },
  {
    id: 'body-fat',
    slug: 'body-fat-calculator',
    name: 'Body Fat Percentage Calculator',
    shortDesc: 'Estimate body fat percentage with the U.S. Navy tape method.',
    tagline: 'A better health metric than the scale alone.',
    category: 'health',
    iconName: 'HeartPulse',
    keywords: ['body fat', 'body fat percentage', 'body fat calculator', 'navy method', 'tape measure', 'body composition'],
    kind: 'config',
    config: {
      fields: [
        { id: 'waistCm', label: 'Waist', type: 'number', defaultValue: 82, min: 40, suffix: 'cm' },
        { id: 'neckCm', label: 'Neck', type: 'number', defaultValue: 37, min: 20, suffix: 'cm' },
        { id: 'hipCm', label: 'Hip (female only)', type: 'number', defaultValue: 95, min: 20, suffix: 'cm' },
        { id: 'heightCm', label: 'Height', type: 'number', defaultValue: 175, min: 100, suffix: 'cm' },
        { id: 'sex', label: 'Sex (1 = Male, 0 = Female)', type: 'number', defaultValue: 1, min: 0, max: 1, step: 1 },
      ],
      results: [
        { label: 'Body Fat Percentage', formulaCode: 'sex === 1 ? (86.01 * Math.log10(waistCm - neckCm) - 70.041 * Math.log10(heightCm) + 36.76) : (163.205 * Math.log10(waistCm + hipCm - neckCm) - 97.684 * Math.log10(heightCm) - 78.387)', suffix: '%', accent: true },
      ],
      formulaDescription: 'U.S. Navy tape method using waist, neck, hip (females), and height',
      tips: [
        'Measure with the tape level and snug, not pulled tight, for consistent results.',
        'Healthy ranges are roughly 8-19% for men and 21-32% for women.',
      ],
    },
    content: {
      intro:
        'The Body Fat Percentage Calculator estimates body composition using the U.S. Navy tape method, which needs only waist, neck, height, and hip measurements. It gives a more meaningful health picture than weight alone.',
      howItWorks:
        'The Navy method uses logarithms of circumference measurements. Men rely on waist, neck, and height; women add the hip. The result estimates the percentage of body mass that is fat to within a few points of lab methods.',
      example:
        'A male with an 82 cm waist, 37 cm neck, and 175 cm height gets a body-fat estimate near 18%, a healthy athletic range.',
      formulas: [
        {
          label: 'Body Fat (Male)',
          expression: '%BF = 86.01 × log10(waist − neck) − 70.041 × log10(height) + 36.76',
        },
        {
          label: 'Body Fat (Female)',
          expression: '%BF = 163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Body Fat Percentage',
          explanation:
            'The estimated share of your body mass that is fat, derived from the U.S. Navy circumference method.',
        },
      ],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'Compare body-fat percentage with your BMI category.' },
        { slug: 'calories-burned-calculator', step: 'Estimate calorie needs adjusted to lean mass.' },
      ],
      faqs: [
        { q: 'How accurate is the Navy method?', a: 'Published studies show it agrees with more advanced methods like DEXA within roughly 3-4 percentage points when measured carefully.' },
        { q: 'What is a healthy body fat percentage?', a: 'Athletes often sit at 6-13% (men) and 14-20% (women). Healthy general ranges are about 14-24% for men and 21-35% for women.' },
        { q: 'How do I take the measurements?', a: 'Wrap a tape measure around the bare waist at the navel, the neck below the larynx, and the widest part of the hips, keeping it level and snug.' },
      ],
      related: ['bmi-calculator', 'ideal-weight-calculator', 'calories-burned-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
      updatedAt: '2026-08-21',
    },
  },
  {
    id: 'ideal-weight',
    slug: 'ideal-weight-calculator',
    name: 'Ideal Weight Calculator',
    shortDesc: 'Estimate a healthy target weight using the Devine formula.',
    tagline: 'A science-based weight target for your height.',
    category: 'health',
    iconName: 'ClipboardList',
    keywords: ['ideal weight', 'ideal weight calculator', 'healthy weight', 'target weight', 'devine formula'],
    kind: 'config',
    config: {
      fields: [
        { id: 'heightCm', label: 'Height', type: 'number', defaultValue: 175, min: 100, suffix: 'cm' },
        { id: 'sex', label: 'Sex (1 = Male, 0 = Female)', type: 'number', defaultValue: 1, min: 0, max: 1, step: 1 },
      ],
      results: [
        { label: 'Ideal Body Weight', formulaCode: 'sex === 1 ? 50 + 2.3 * ((heightCm / 2.54) - 60) : 45.5 + 2.3 * ((heightCm / 2.54) - 60)', suffix: 'kg', accent: true },
        { label: 'Weight in Pounds', formulaCode: '(sex === 1 ? 50 + 2.3 * ((heightCm / 2.54) - 60) : 45.5 + 2.3 * ((heightCm / 2.54) - 60)) * 2.20462', suffix: 'lbs' },
      ],
      formulaDescription: 'Devine: 50 + 2.3 x (height in inches - 60) for men; 45.5 + 2.3 x (...) for women',
      tips: [
        'Ideal weight is a reference point, not a rule; body composition matters more.',
        'Pair with BMI range and body-fat percentage for a complete picture.',
      ],
    },
    content: {
      intro:
        'The Ideal Weight Calculator estimates a healthy target weight for your height using the widely referenced Devine formula. It is a practical reference for setting goals, not a medical prescription.',
      howItWorks:
        'The Devine formula anchors on 50 kg (men) or 45.5 kg (women) at 60 inches and adds 2.3 kg for every inch beyond. The tool converts your height to inches, applies the formula, and also reports the figure in pounds.',
      example:
        'A man 175 cm (about 69 inches) tall has an ideal weight near 50 + 2.3 x 9 = 70.7 kg, or about 156 lbs.',
      formulas: [
        {
          label: 'Ideal Body Weight (Male)',
          expression: 'IBW = 50 + 2.3 × (height_in − 60)',
          note: 'Devine formula; women use 45.5 as the base.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Ideal Body Weight',
          explanation:
            'A height-based reference weight from the Devine formula, useful as a target anchor rather than a strict goal.',
        },
      ],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'Confirm the target sits inside your healthy BMI band.' },
        { slug: 'body-fat-calculator', step: 'Check body composition rather than weight alone.' },
      ],
      faqs: [
        { q: 'How is ideal weight determined?', a: 'Formulas like Devine correlate height with weight associated with lower mortality risk. They provide a reference range rather than an exact target.' },
        { q: 'Is ideal weight the same for athletes?', a: 'No. Muscular individuals may sit above formula estimates while remaining healthy, which is why body-fat percentage adds useful context.' },
        { q: 'Should I aim exactly for this number?', a: 'Use it as a guide within the healthy BMI range for your height. Individual builds vary.' },
      ],
      related: ['bmi-calculator', 'body-fat-calculator', 'water-intake-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.6,
      updatedAt: '2026-08-21',
    },
  },
  {
    id: 'water-intake',
    slug: 'water-intake-calculator',
    name: 'Daily Water Intake Calculator',
    shortDesc: 'Estimate how much water you should drink each day.',
    tagline: 'Hydrate to a number, not a guess.',
    category: 'health',
    iconName: 'Droplets',
    keywords: ['water intake', 'water calculator', 'how much water', 'hydration', 'drink water', 'daily water'],
    kind: 'config',
    config: {
      fields: [
        { id: 'weightKg', label: 'Body Weight', type: 'number', defaultValue: 70, min: 20, suffix: 'kg' },
        { id: 'activityMin', label: 'Daily Activity', type: 'number', defaultValue: 45, min: 0, suffix: 'min' },
      ],
      results: [
        { label: 'Daily Water Target', formulaCode: 'weightKg * 0.033 + (activityMin / 30) * 0.35', suffix: 'liters', accent: true },
        { label: 'In Fluid Ounces', formulaCode: '(weightKg * 0.033 + (activityMin / 30) * 0.35) * 33.814', suffix: 'fl oz' },
      ],
      formulaDescription: 'Water (L) = Weight (kg) x 0.033 + Activity adjustment',
      tips: [
        'About 20% of daily water comes from food, so drink roughly 80% of the target.',
        'Heat, illness, and exercise raise your needs beyond the baseline.',
      ],
    },
    content: {
      intro:
        'The Daily Water Intake Calculator estimates how much fluid your body needs based on weight and activity. It converts the recommendation into liters and fluid ounces so the goal is easy to track.',
      howItWorks:
        'The baseline recommendation scales at 33 milliliters per kilogram of body weight, with an extra 350 milliliters per 30 minutes of activity. This aligns with common clinical guidance of 2-3 liters for most adults.',
      example:
        'A 70 kg adult who exercises 45 minutes daily targets about 2.31 + 0.53 = 2.84 liters, roughly 96 fluid ounces.',
      formulas: [
        {
          label: 'Daily Water Target',
          expression: 'Water (L) = Weight (kg) × 0.033 + (Activity min / 30) × 0.35',
          note: 'Baseline scales to body weight with an activity adjustment.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Daily Water Target',
          explanation:
            'The recommended daily fluid intake in liters, scaled to your weight plus a bonus for exercise.',
        },
      ],
      workflowLinks: [
        { slug: 'calories-burned-calculator', step: 'Replace the fluid you burn during activity.' },
        { slug: 'bmr-calculator', step: 'Plan hydration alongside your calorie baseline.' },
      ],
      faqs: [
        { q: 'How much water should I drink a day?', a: 'Common guidance is about 2 liters for women and 3 liters for men, adjusted for weight, activity, heat, and health conditions.' },
        { q: 'Does coffee and tea count toward water?', a: 'Mostly yes. While caffeine has a mild diuretic effect, the fluid in coffee and tea still contributes to daily hydration.' },
        { q: 'Can I drink too much water?', a: 'Excess water is rare but possible and can dilute blood sodium. Very high intakes far above the target are unnecessary.' },
      ],
      related: ['bmr-calculator', 'calories-burned-calculator', 'ideal-weight-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.6,
      updatedAt: '2026-08-21',
    },
  },
  {
    id: 'macro-protein',
    slug: 'protein-intake-calculator',
    name: 'Protein Intake Calculator',
    shortDesc: 'Set daily protein targets by body weight and goal.',
    tagline: 'Protein numbers for muscle, health, or weight loss.',
    category: 'health',
    iconName: 'Beef',
    keywords: ['protein intake', 'protein calculator', 'grams of protein', 'protein per day', 'muscle protein', 'macros'],
    kind: 'config',
    config: {
      fields: [
        { id: 'weightKg', label: 'Body Weight', type: 'number', defaultValue: 70, min: 20, suffix: 'kg' },
        { id: 'gramsPerKg', label: 'Grams per kg of Body Weight', type: 'number', defaultValue: 1.6, min: 0.5, max: 2.5, step: 0.1 },
      ],
      results: [
        { label: 'Daily Protein Target', formulaCode: 'weightKg * gramsPerKg', suffix: 'grams', accent: true },
        { label: 'Approx. Protein Calories', formulaCode: 'weightKg * gramsPerKg * 4', suffix: 'kcal' },
      ],
      formulaDescription: 'Protein (g) = Weight (kg) x Grams per kg',
      tips: [
        'Use 0.8 g/kg for general health, 1.2-1.6 for weight loss, and 1.6-2.2 for muscle gain.',
        'Protein provides 4 calories per gram and is highly satiating.',
      ],
    },
    content: {
      intro:
        'The Protein Intake Calculator sets a daily protein target scaled to your body weight and goal. Whether you train for muscle, manage weight, or simply want balanced nutrition, the number removes the guesswork.',
      howItWorks:
        'Research-backed guidelines recommend 0.8 g of protein per kilogram for general health, 1.2-1.6 g during weight loss, and 1.6-2.2 g for muscle building. The tool multiplies your weight by the chosen rate and reports calories too.',
      example:
        'A 70 kg athlete targeting 1.6 g/kg needs 112 grams of protein daily, supplying about 448 calories from protein.',
      formulas: [
        {
          label: 'Daily Protein Target',
          expression: 'Protein (g) = Weight (kg) × g/kg',
        },
        {
          label: 'Protein Calories',
          expression: 'kcal = Protein (g) × 4',
          note: 'Protein provides 4 calories per gram.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Daily Protein Target',
          explanation:
            'Grams of protein to eat each day, scaled to your body weight and the rate matched to your goal.',
        },
        {
          resultLabel: 'Approx. Protein Calories',
          explanation:
            'How many of your daily calories come from that protein target, useful when balancing macros.',
        },
      ],
      workflowLinks: [
        { slug: 'bmr-calculator', step: 'Fit the protein target inside your calorie baseline.' },
        { slug: 'one-rep-max-calculator', step: 'Track strength training against your protein intake.' },
      ],
      faqs: [
        { q: 'How much protein do I need to build muscle?', a: 'Aim for 1.6-2.2 grams per kilogram of body weight per day, combined with consistent resistance training.' },
        { q: 'How much protein for weight loss?', a: 'Higher protein, around 1.2-1.6 g/kg, preserves muscle and increases satiety while you cut calories.' },
        { q: 'Can I get too much protein?', a: 'Very high intakes are usually safe for healthy kidneys but unnecessary. Spread intake across meals for better use by the body.' },
      ],
      related: ['bmr-calculator', 'calories-burned-calculator', 'one-rep-max-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.65,
      updatedAt: '2026-08-21',
    },
  },
  {
    id: 'target-heart-rate',
    slug: 'target-heart-rate-calculator',
    name: 'Target Heart Rate Calculator',
    shortDesc: 'Find your cardio training zones by age and resting heart rate.',
    tagline: 'Train in the zone that matches your goal.',
    category: 'health',
    iconName: 'Heart',
    keywords: ['heart rate', 'target heart rate', 'heart rate zones', 'training zone', 'cardio zone', 'max heart rate'],
    kind: 'config',
    config: {
      fields: [
        { id: 'age', label: 'Age', type: 'number', defaultValue: 30, min: 15, max: 110, suffix: 'yrs' },
        { id: 'restingHR', label: 'Resting Heart Rate', type: 'number', defaultValue: 65, min: 30, max: 220, suffix: 'bpm' },
        { id: 'intensityPct', label: 'Target Intensity', type: 'number', defaultValue: 70, min: 50, max: 90, suffix: '%' },
      ],
      results: [
        { label: 'Maximum Heart Rate', formulaCode: '220 - age', suffix: 'bpm' },
        { label: 'Target Training Zone', formulaCode: 'restingHR + ((220 - age) - restingHR) * (intensityPct / 100)', suffix: 'bpm', accent: true },
        { label: 'Lower Zone Bound (50%)', formulaCode: 'restingHR + ((220 - age) - restingHR) * 0.5', suffix: 'bpm' },
      ],
      formulaDescription: 'Target = Resting HR + ((220 - Age) - Resting HR) x Intensity',
      tips: [
        'Zone 2 (60-70%) builds endurance; 70-85% improves fitness; 85%+ is threshold work.',
        'This uses the Karvonen method with heart rate reserve.',
      ],
    },
    content: {
      intro:
        'The Target Heart Rate Calculator finds your cardio training zone using the Karvonen method, which accounts for both age and resting heart rate. Runners and cyclists use it to stay in the effort range that matches each workout.',
      howItWorks:
        'Maximum heart rate is estimated at 220 minus age. Heart rate reserve is the gap between max and resting rate. A target zone is the resting rate plus a percentage of that reserve, refined by your chosen intensity.',
      example:
        'A 30-year-old with a resting heart rate of 65 training at 70% intensity targets about 65 + 0.70 x 125 = 152 bpm.',
      formulas: [
        {
          label: 'Maximum Heart Rate',
          expression: 'HRmax = 220 − Age',
          note: 'Standard population estimate.',
        },
        {
          label: 'Target Training Zone',
          expression: 'Target = Resting HR + (HRmax − Resting HR) × Intensity',
          note: 'The Karvonen method using heart rate reserve.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Target Training Zone',
          explanation:
            'The heart rate to hold during exercise for your chosen intensity, personalized with your resting rate.',
        },
        {
          resultLabel: 'Lower Zone Bound',
          explanation:
            'The floor of the aerobic zone at 50% effort, useful for easy recovery runs and zone-2 work.',
        },
      ],
      workflowLinks: [
        { slug: 'running-pace-calculator', step: 'Convert a target heart rate into training pace.' },
        { slug: 'calories-burned-calculator', step: 'Estimate the burn of sessions in this zone.' },
      ],
      faqs: [
        { q: 'What is a good target heart rate?', a: 'It depends on your goal. Moderate effort sits around 50-70% of max heart rate, vigorous effort around 70-85%.' },
        { q: 'How do I calculate my max heart rate?', a: 'The common estimate is 220 minus your age. More precise tests exist, but the formula is reliable for most planning.' },
        { q: 'What is the Karvonen formula?', a: 'It adds resting heart rate into the zone math, making results more personalized than age alone.' },
      ],
      related: ['running-pace-calculator', 'calories-burned-calculator', 'bmr-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.6,
      // Age and resting-heart-rate bounds added (T-12 field-level min/max).
      updatedAt: '2026-11-02',
    },
  },
  {
    id: 'dog-age',
    slug: 'dog-age-calculator',
    name: 'Dog Age Calculator',
    shortDesc: 'Convert dog years to human years with the modern DNA formula.',
    tagline: 'How old is your dog, really?',
    category: 'health',
    iconName: 'PawPrint',
    keywords: ['dog age', 'dog years', 'dog age calculator', 'human years dog', 'dog to human years'],
    kind: 'config',
    config: {
      fields: [
        { id: 'dogYears', label: 'Dog Age', type: 'number', defaultValue: 4, min: 1, max: 30, suffix: 'yrs' },
      ],
      results: [
        { label: 'Equivalent Human Age', formulaCode: '16 * Math.log(dogYears) + 31', suffix: 'human years', accent: true },
      ],
      formulaDescription: 'Human years = 16 x ln(dog age) + 31 (for ages 1+)',
      tips: [
        'The first year of a dog life equals roughly 31 human years.',
        'Large breeds age faster than small breeds after maturity.',
      ],
    },
    content: {
      intro:
        'The Dog Age Calculator converts your dog age into human years using the DNA-based formula developed by researchers at the University of California, San Diego, which is far more accurate than the old multiply-by-7 rule.',
      howItWorks:
        'The modern formula models the epigenetic clock shared by dogs and humans: 16 x ln(dog age) + 31. It captures the rapid aging of a dog first year followed by gentler aging in later years.',
      example:
        'A 4-year-old dog equals about 16 x ln(4) + 31 = 53 human years. A 1-year-old dog is roughly 31 human years old.',
      formulas: [
        {
          label: 'Equivalent Human Age',
          expression: 'Human years = 16 × ln(dog years) + 31',
          note: 'DNA-based epigenetic clock for ages 1+.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Equivalent Human Age',
          explanation:
            'Your dog age converted to a human-year equivalent using the modern DNA-derived formula from UCSD research.',
        },
      ],
      workflowLinks: [
        { slug: 'ideal-weight-calculator', step: 'Track healthy weight alongside age milestones.' },
        { slug: 'bmi-calculator', step: 'Compare age and health metrics for your pet family.' },
      ],
      faqs: [
        { q: 'Is the 7 dog years rule wrong?', a: 'Yes, largely. It oversimplifies. The first year alone equals about 31 human years, and aging slows afterward depending on breed size.' },
        { q: 'Does breed size matter?', a: 'Large breeds mature and age faster than small breeds after about age 5, so size-adjusted charts are even more accurate.' },
        { q: 'How old is a 2-year-old dog in human years?', a: 'Using the formula, 16 x ln(2) + 31 = about 42 human years.' },
      ],
      related: ['bmi-calculator', 'ideal-weight-calculator', 'water-intake-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.55,
      updatedAt: '2026-08-21',
    },
  },
  {
    id: 'tdee',
    slug: 'tdee-calculator',
    name: 'TDEE & Calorie Calculator',
    shortDesc: 'Calculate your Total Daily Energy Expenditure and find the right calorie target for weight loss or muscle gain.',
    tagline: 'Know your maintenance calories.',
    category: 'health',
    iconName: 'Flame',
    badge: 'Nutrition',
    featured: true,
    keywords: ['tdee calculator', 'calorie calculator', 'maintenance calories', 'bmr calculator', 'how many calories'],
    kind: 'custom',
    componentId: 'TdeeCalculator',
    content: {
      intro: 'The TDEE Calculator estimates how many calories you burn in a day using the Mifflin-St Jeor equation for basal metabolic rate, scaled by an activity multiplier. It reports BMR, maintenance calories, and three targets either side of maintenance, which is the range most people actually need: a mild cut, a full deficit, and a lean bulk.',
      howItWorks: 'BMR is the energy needed at complete rest and comes from weight, height, age and sex — 10 × weight in kg, plus 6.25 × height in cm, minus 5 × age, plus 5 for men or minus 161 for women. That resting figure is then multiplied by an activity factor from 1.2 for sedentary to 1.9 for a highly active athlete, giving total daily energy expenditure. The targets are fixed offsets from TDEE: 250 below for a mild cut, 500 below for steady loss, and 300 above for a lean bulk. Mifflin-St Jeor is used because it outperforms the older Harris-Benedict equation in most validation studies, but any formula is an estimate of a population average, not a measurement of you.',
      example: 'A 30-year-old man at 75 kg and 175 cm has a BMR of 750 + 1,093.75 − 150 + 5 = 1,699 kcal. At moderate activity, TDEE is 1,699 × 1.55 = 2,633 kcal, so a mild cut is 2,383, weight loss is 2,133 and a lean bulk is 2,933. A woman of the same height and weight has a BMR of 1,533 and a TDEE of 2,376 — the 166-calorie difference is the sex term, not a difference in effort.',
      formulas: [
        { label: 'BMR (Male)', expression: 'BMR = 10 × weight + 6.25 × height − 5 × age + 5' },
        { label: 'TDEE', expression: 'TDEE = BMR × Activity Multiplier' },
      ],
      resultExplanations: [
        { resultLabel: 'BMR', explanation: 'Calories your body burns at complete rest for basic functions.' },
        { resultLabel: 'TDEE', explanation: 'Total daily calorie burn including all activity. This is your maintenance level.' },
        { resultLabel: 'Calorie Targets', explanation: 'Suggested intakes for fat loss (500 under), mild cut (250 under), and lean bulk (300 over).' },
      ],
      workflowLinks: [
        { slug: 'bmr-calculator', step: 'See your basal metabolic rate in detail.' },
        { slug: 'protein-intake-calculator', step: 'Set your protein target for your goal.' },
        { slug: 'macro-calculator', step: 'Split the calorie target into protein, carbs and fat.' },
      ],
      faqs: [
        { q: 'How accurate is TDEE?', a: 'Formulas land within roughly 10-15% for most people, which is several hundred calories a day. Treat the figure as a starting point, then track intake and weight for two to three weeks and adjust by 100-200 kcal based on what the scale actually does.' },
        { q: 'Should I eat back exercise calories?', a: 'Usually not. The activity multiplier already accounts for your typical week, and exercise calorie estimates from watches are unreliable. Double-counting is the most common reason a deficit fails to produce loss.' },
        { q: 'How often should I recalculate?', a: 'Every 4-6 weeks, or whenever your weight changes by more than 5 pounds. A lighter body has a lower BMR, so the same intake that produced loss at the start becomes maintenance later.' },
        { q: 'Which activity multiplier should I choose?', a: 'Pick the one that describes your normal week, not your best week. Desk work with no exercise is 1.2; three or four sessions a week is about 1.55. Overestimating activity is the second most common reason the numbers do not match reality.' },
        { q: 'Is a 500-calorie deficit safe?', a: 'For most adults, yes — it is roughly half a kilogram of fat loss a week. Very low intakes, or deficits above about 1,000 kcal a day, risk muscle loss and nutrient shortfalls without medical supervision, and they are rarely sustainable.' },
      ],
      related: ['bmr-calculator', 'protein-intake-calculator', 'calories-burned-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-11-06' },
  },
  {
    id: 'sleep-cycle',
    slug: 'sleep-cycle-calculator',
    name: 'Sleep Cycle Calculator',
    shortDesc: 'Find the best bedtime or wake-up time based on 90-minute sleep cycles.',
    tagline: 'Wake up at the right point in your cycle.',
    category: 'health',
    iconName: 'Moon',
    badge: 'Wellness',
    keywords: ['sleep calculator', 'bedtime calculator', 'wake up time', 'sleep cycles', 'how many hours of sleep'],
    kind: 'custom',
    componentId: 'SleepCycleCalculator',
    content: {
      intro: 'The Sleep Cycle Calculator determines the best bedtime or wake-up time based on 90-minute sleep cycles. Waking up at the end of a cycle means feeling more refreshed.',
      howItWorks: 'A full sleep cycle is approximately 90 minutes. It takes about 15 minutes to fall asleep. The calculator counts backward from your wake time in 90-minute increments, minus 15 minutes for sleep onset.',
      example: 'If you need to wake at 7:00 AM, ideal bedtimes are: 11:15 PM (5 cycles, 7h 45m), 9:45 PM (6 cycles, 9h 15m), or 12:45 AM (4 cycles, 6h 15m).',
      formulas: [
        { label: 'Bedtime', expression: 'Bedtime = Wake Time - (Cycles x 90 min) - 15 min fall asleep' },
      ],
      resultExplanations: [
        { resultLabel: 'Bedtimes', explanation: 'Recommended times to fall asleep, each aligned with the end of a complete sleep cycle.' },
        { resultLabel: 'Sleep Duration', explanation: 'Total time in bed for each option, including fall-asleep buffer.' },
      ],
      workflowLinks: [
        { slug: 'work-hours-calculator', step: 'Plan your schedule around optimal sleep.' },
        { slug: 'bmr-calculator', step: 'Sleep quality affects your metabolism.' },
      ],
      faqs: [
        { q: 'Why 90 minutes?', a: 'A complete sleep cycle (light, deep, REM) takes about 90 minutes on average. Waking between cycles reduces sleep inertia (grogginess).' },
        { q: 'Does it account for individual variation?', a: 'The 90-minute average varies between people (80-100 minutes). Use the calculator as a starting point and adjust based on how you feel.' },
        { q: 'What about naps?', a: 'For naps, 20-30 minutes (one cycle minus deep sleep) or a full 90 minutes works best. Avoid 45-60 minute naps that wake you mid-cycle.' },
      ],
      related: ['work-hours-calculator', 'bmr-calculator', 'tdee-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-08-22' },
  },
  {
    id: 'steps-to-miles',
    slug: 'steps-to-miles-calculator',
    name: 'Steps to Miles & Calories',
    shortDesc: 'Convert step count to distance in miles and kilometers, and estimate calories burned walking.',
    tagline: 'Your step count in real distance.',
    category: 'health',
    iconName: 'Dumbbell',
    badge: 'Fitness',
    keywords: ['steps to miles', 'steps to km', 'steps to calories', 'walking distance', 'step counter calculator'],
    kind: 'custom',
    componentId: 'StepsToMilesCalculator',
    content: {
      intro: 'The Steps to Miles Calculator converts a step count into distance in kilometres and miles, then estimates the calories the walk burned from your body weight. Step counters report a number; distance and energy are what make it comparable with a walk you already know.',
      howItWorks: 'Distance is steps multiplied by stride length in centimetres, divided by 100,000 to give kilometres, and multiplied by 0.621371 for miles. Calories use a simple net walking estimate of 0.53 kcal per kilogram per kilometre, which is why the result rises with both weight and distance. The calorie figure is the energy spent walking, not total daily burn, so it excludes what you would have used sitting still.',
      example: 'The defaults of 10,000 steps, a 76 cm stride and 70 kg give 10,000 × 76 / 100,000 = 7.6 km, which is 4.72 miles, and 7.6 × 70 × 0.53 = 282 kcal. A shorter 67 cm stride covers only 6.7 km for the same 10,000 steps, and at 90 kg the same 7.6 km costs about 363 kcal.',
      formulas: [
        { label: 'Distance (km)', expression: 'km = Steps x Stride (cm) / 100,000' },
        { label: 'Calories', expression: 'kcal = km x Weight (kg) x 0.53' },
      ],
      resultExplanations: [
        { resultLabel: 'Distance', explanation: 'Your step count converted to kilometers and miles using your stride length.' },
        { resultLabel: 'Calories Burned', explanation: 'Estimated energy expenditure for the walk, based on distance and body weight.' },
      ],
      workflowLinks: [
        { slug: 'bmr-calculator', step: 'See your total daily calorie burn.' },
        { slug: 'tdee-calculator', step: 'Factor activity into your calorie targets.' },
        { slug: 'calories-burned-calculator', step: 'Compare walking with other activities by time.' }
      ],
      faqs: [
        { q: 'What is the average stride length?', a: 'Adults average about 65-80 cm, with men nearer 76 cm and women nearer 67 cm. Height is the best predictor, but measuring is better: walk ten normal steps, measure the distance and divide by ten.' },
        { q: 'How many steps is a mile?', a: 'About 2,118 with a 76 cm stride, and roughly 2,000-2,500 across the usual range. A shorter stride means more steps per mile, which is why two people with the same step count can cover different distances.' },
        { q: 'Is the calorie estimate accurate?', a: 'It is a reasonable approximation for steady walking on flat ground. Pace, hills, load and fitness all move the real figure, so treat it as a guide and compare your own weeks rather than treating it as a measurement.' },
        { q: 'Do I need 10,000 steps a day?', a: 'The 10,000 figure began as a marketing step target, not a research finding. Studies of step counts and mortality show benefits accruing well below it, with most of the gain by around 7,000-8,000 steps for older adults. More is generally better, but the cliff at 10,000 is not real.' },
        { q: 'Should I use walking or running stride?', a: 'Walking. Running stride is longer and varies far more with pace, so a running step count needs a different stride and a different energy equation. This calculator is calibrated for walking.' },
      ],
      related: ['tdee-calculator', 'bmr-calculator', 'calories-burned-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-11-05' },
  },
  {
    id: 'waist-to-hip-ratio',
    slug: 'waist-to-hip-ratio-calculator',
    name: 'Waist-to-Hip Ratio Calculator',
    shortDesc: 'Assess body fat distribution and health risk using waist and hip measurements.',
    tagline: 'A simple ratio that reveals a lot.',
    category: 'health',
    iconName: 'Ruler',
    keywords: ['waist to hip ratio', 'WHR calculator', 'body fat distribution', 'central obesity'],
    kind: 'config',
    config: {
      fields: [
        { id: 'waistCm', label: 'Waist (cm)', type: 'number', defaultValue: 82, suffix: 'cm', min: 40 },
        { id: 'hipCm', label: 'Hip (cm)', type: 'number', defaultValue: 95, suffix: 'cm', min: 40 }
      ],
      results: [
        { label: 'Waist-to-Hip Ratio', formulaCode: 'waistCm / hipCm', suffix: ':1', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Measure the waist at the navel and hips at the widest point of the buttocks.',
      'Men above 0.90 and women above 0.85 are at increased cardiovascular and metabolic risk.'
      ],
    },
    content: {
      intro: 'The Waist-to-Hip Ratio Calculator measures body fat distribution by dividing waist circumference by hip circumference. A higher ratio signals more abdominal fat, which correlates strongly with cardiovascular and metabolic risk independent of BMI.',
      howItWorks: 'Measure your waist at the navel and hips at the widest point of the buttocks. Divide waist by hips. The WHO classifies risk for men at 0.90 or above and women at 0.85 or above.',
      example: 'A man with a 94 cm waist and 96 cm hips has a WHR of 0.98, placing him in the high-risk category.',
      formulas: [{ label: 'WHR', expression: 'WHR = Waist / Hip' }],
      resultExplanations: [
        { resultLabel: 'Waist-to-Hip Ratio', explanation: 'Below 0.80 (women) or 0.90 (men) = low risk. 0.80-0.85 (women) or 0.90-1.0 (men) = moderate risk. Above 0.85 (women) or 1.0 (men) = high risk.' }
      ],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'Pair WHR with BMI for a fuller risk picture.' },
        { slug: 'body-fat-calculator', step: 'Get an actual body-fat percentage reading.' }
      ],
      faqs: [
        { q: 'What is a healthy waist-to-hip ratio?', a: 'The WHO defines low risk as below 0.90 for men and below 0.85 for women. Higher values signal more abdominal fat and greater health risk.' },
        { q: 'Is WHR better than BMI?', a: 'WHR captures fat distribution, which BMI does not. Two people with the same BMI can have very different risk profiles depending on where they carry fat.' },
        { q: 'How do I measure my waist correctly?', a: 'Wrap the tape around your bare abdomen at the level of the navel, after a gentle exhale. Do not suck in or push out.' }
      ],
      related: ['bmi-calculator', 'body-fat-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75, updatedAt: '2026-08-22' },
  },
  {
    id: 'waist-to-height-ratio',
    slug: 'waist-to-height-ratio-calculator',
    name: 'Waist-to-Height Ratio Calculator',
    shortDesc: 'Determine if your waist is too large for your height.',
    tagline: 'Keep your waist under half your height.',
    category: 'health',
    iconName: 'Ruler',
    keywords: ['waist to height ratio', 'WHtR calculator', 'central obesity', 'health risk'],
    kind: 'config',
    config: {
      fields: [
        { id: 'waistCm', label: 'Waist (cm)', type: 'number', defaultValue: 82, suffix: 'cm', min: 40 },
        { id: 'heightCm', label: 'Height (cm)', type: 'number', defaultValue: 175, suffix: 'cm', min: 100 }
      ],
      results: [
        { label: 'Waist-to-Height Ratio', formulaCode: 'waistCm / heightCm', suffix: ':1', accent: true },
        { label: 'Waist at 0.5 Threshold', formulaCode: 'heightCm * 0.5', suffix: 'cm' },
        { label: 'Above Threshold', formulaCode: 'waistCm - heightCm * 0.5', suffix: 'cm' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'The guideline is simple: keep your waist to less than half your height.',
      'WHtR is considered a better predictor of health risk than BMI alone.',
      'The same rule works in any unit, so inches are fine as long as both are measured the same way.'
      ],
    },
    content: {
      intro: 'The Waist-to-Height Ratio Calculator divides your waist circumference by your height to produce a single number with a simple rule attached: keep your waist under half your height. It also reports the waist measurement that would sit exactly on that line, so the result becomes a target rather than just a verdict.',
      howItWorks: 'Waist is divided by height in the same unit, so the ratio is dimensionless — 82 cm over 175 cm gives 0.47 whether you measure in centimetres or inches, as long as both are converted consistently. Below 0.5 is the healthy band, 0.5 to 0.6 indicates elevated risk, and above 0.6 indicates high risk. The threshold column converts that rule into centimetres: half of 175 cm is 87.5 cm, which is the waist at which the ratio reaches 0.5. Unlike BMI, the measure requires no weight and no assumptions about muscle mass, because abdominal fat is the tissue most strongly linked to metabolic and cardiovascular risk.',
      example: 'A waist of 82 cm and a height of 175 cm give a ratio of 0.47, comfortably inside the healthy band. The 0.5 threshold for that height is 87.5 cm, so there are 5.5 cm of headroom — the calculator reports that as −5.5 cm. At 92 cm the ratio becomes 0.53, inside the elevated band, and at 108 cm it reaches 0.62, which is the high-risk range.',
      formulas: [{ label: 'WHtR', expression: 'WHtR = Waist / Height' }],
      resultExplanations: [
        { resultLabel: 'Waist-to-Height Ratio', explanation: 'Below 0.5 = healthy. 0.5 to 0.6 = elevated risk. Above 0.6 = high risk of cardiometabolic disease.' },
        { resultLabel: 'Waist at 0.5 Threshold', explanation: 'Half your height in centimetres — the largest waist that still keeps the ratio in the healthy band.' },
        { resultLabel: 'Above Threshold', explanation: 'How far your waist sits beyond that limit. A negative figure means you are under it.' }
      ],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'Compare WHtR against your BMI classification.' },
        { slug: 'waist-to-hip-ratio-calculator', step: 'See how fat is distributed across your midsection.' },
        { slug: 'body-fat-calculator', step: 'Estimate total body fat alongside the central measure.' }
      ],
      faqs: [
        { q: 'Why is waist-to-height better than BMI?', a: 'WHtR accounts for where you carry fat, not just total weight, and it scales naturally with body size — a tall person is allowed a larger waist. Large studies find it predicts cardiovascular and metabolic risk at least as well as BMI and often better, without needing a scale.' },
        { q: 'What does a WHtR of 0.5 mean?', a: 'It is the boundary. The guidance is to stay below it, so 0.5 itself is the point to act rather than a comfortable target. Values just under 0.5 are associated with the lowest risk in population data.' },
        { q: 'Does this work for children?', a: 'The 0.5 rule is validated for adults. Children grow at very different rates and need age- and sex-specific growth charts, so applying an adult threshold to a child can misclassify them in either direction.' },
        { q: 'Where exactly should I measure my waist?', a: 'At the midpoint between the lowest rib and the top of the hip bone, after a normal exhale, with the tape snug but not compressing the skin. Measuring at the navel is common but can read higher on some body shapes; the midpoint is the more reproducible landmark.' },
        { q: 'Can I use inches instead of centimetres?', a: 'Yes. The ratio is unitless, so as long as waist and height are in the same unit the answer is identical. The threshold and excess columns will then be in inches, which is why they carry a unit label.' }
      ],
      related: ['bmi-calculator', 'waist-to-hip-ratio-calculator', 'body-fat-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75, updatedAt: '2026-11-06' },
  },
  {
    id: 'blood-pressure',
    slug: 'blood-pressure-calculator',
    name: 'Blood Pressure Category Calculator',
    shortDesc: 'Classify your blood pressure reading against ACC/AHA 2017 guidelines.',
    tagline: 'Know where your numbers fall.',
    category: 'health',
    iconName: 'HeartPulse',
    keywords: ['blood pressure calculator', 'blood pressure chart', 'BP categories', 'hypertension calculator'],
    kind: 'config',
    config: {
      fields: [
        { id: 'systolic', label: 'Systolic (mmHg)', type: 'number', defaultValue: 120, suffix: 'mmHg', min: 60, max: 250 },
        { id: 'diastolic', label: 'Diastolic (mmHg)', type: 'number', defaultValue: 80, suffix: 'mmHg', min: 30, max: 150 }
      ],
      results: [
        { label: 'Pulse Pressure', formulaCode: 'systolic - diastolic', suffix: 'mmHg', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Take readings at the same time each day for consistency.',
      'Average two or more readings on separate occasions before acting on results.'
      ],
    },
    content: {
      intro: 'The Blood Pressure Category Calculator classifies your systolic and diastolic readings according to the American College of Cardiology and American Heart Association 2017 guidelines. It shows your combined reading and pulse pressure.',
      howItWorks: 'Enter your systolic (top number) and diastolic (bottom number) in mmHg. The calculator shows your combined reading and pulse pressure. Normal is below 120/80, Elevated is 120-129 below 80, Stage 1 is 130-139 or 80-89, Stage 2 is 140+ or 90+, Crisis is 180+ or 120+.',
      example: 'A reading of 138/88 mmHg: pulse pressure is 50 mmHg and falls into Stage 1 Hypertension.',
      formulas: [{ label: 'Pulse Pressure', expression: 'Pulse Pressure = Systolic - Diastolic' }],
      resultExplanations: [
        { resultLabel: 'Pulse Pressure', explanation: 'The gap between systolic and diastolic. Normal is 30-40 mmHg. Higher values may indicate arterial stiffness.' }
      ],
      workflowLinks: [
        { slug: 'waist-to-height-ratio-calculator', step: 'Assess central obesity alongside blood pressure.' },
        { slug: 'target-heart-rate-calculator', step: 'Plan exercise zones that improve blood pressure.' }
      ],
      faqs: [
        { q: 'What is considered normal blood pressure?', a: 'Normal blood pressure is below 120/80 mmHg. Elevated blood pressure is 120-129 systolic with diastolic below 80.' },
        { q: 'When should I see a doctor?', a: 'If your reading consistently falls in Stage 1 or higher, consult a healthcare professional. Hypertensive Crisis (180+/120+) requires immediate medical attention.' },
        { q: 'How often should I check?', a: 'If you have elevated or high readings, check daily at the same time. For normal readings, periodic checks every few months are sufficient.' }
      ],
      related: ['target-heart-rate-calculator', 'waist-to-hip-ratio-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-08-22' },
  },
  {
    id: 'a1c-glucose',
    slug: 'a1c-calculator',
    name: 'A1C to Blood Sugar Converter',
    shortDesc: 'Convert your A1C percentage to estimated average blood sugar.',
    tagline: 'Translate your A1C into glucose numbers.',
    category: 'health',
    iconName: 'Droplets',
    keywords: ['a1c calculator', 'a1c to blood sugar', 'HbA1c calculator', 'average blood glucose'],
    kind: 'config',
    config: {
      fields: [
        { id: 'a1c', label: 'A1C (%)', type: 'number', defaultValue: 5.7, suffix: '%', min: 4, max: 15, step: 0.1 }
      ],
      results: [
        { label: 'Avg Blood Sugar (mg/dL)', formulaCode: '(a1c * 28.7) - 46.7', suffix: 'mg/dL', accent: true },
        { label: 'Avg Blood Sugar (mmol/L)', formulaCode: '((a1c * 28.7) - 46.7) / 18', suffix: 'mmol/L' },
        { label: 'IFCC A1C', formulaCode: '(a1c - 2.15) * 10.929', suffix: 'mmol/mol' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Normal A1C is below 5.7%. Pre-diabetes is 5.7% to 6.4%. Diabetes is 6.5% or above.',
      'The American Diabetes Association endorses this formula for converting A1C to average glucose.',
      'UK and many European labs report A1C in mmol/mol (IFCC), not percent (NGSP).'
      ],
    },
    content: {
      intro: 'The A1C to Blood Sugar Converter turns a hemoglobin A1C percentage into estimated average glucose in both mg/dL and mmol/L, and converts the same result into the IFCC units used by laboratories outside the United States. A single A1C number means different things depending on where you read it, and this puts all three representations side by side.',
      howItWorks: 'The ADAG study established the relationship eAG (mg/dL) = 28.7 × A1C − 46.7, which the American Diabetes Association endorses; dividing by 18 converts to mmol/L, since glucose has a molar mass that makes 18 mg/dL equal one mmol/L. The IFCC conversion is a separate linear relationship, (A1C% − 2.15) × 10.929, giving mmol/mol. The two scales are offset rather than scaled: 7% NGSP is 53 mmol/mol IFCC, and a lab reporting 53 is reporting the same result in different units. A1C reflects average glucose over roughly the lifespan of a red blood cell, about two to three months, weighted toward the most recent weeks.',
      example: 'An A1C of 7.0% converts to an estimated average glucose of 154.2 mg/dL, which is 8.6 mmol/L, and to 53 mmol/mol on the IFCC scale. At 5.7% — the top of the normal range — the figures are 116.9 mg/dL, 6.5 mmol/L and 39 mmol/mol. At 6.5%, the diabetes threshold, they are 139.9 mg/dL, 7.8 mmol/L and 48 mmol/mol.',
      formulas: [{ label: 'eAG', expression: 'eAG = 28.7 × A1C − 46.7' }],
      resultExplanations: [
        { resultLabel: 'Avg Blood Sugar (mg/dL)', explanation: 'Your estimated average blood glucose in mg/dL, the unit used by most US glucose meters.' },
        { resultLabel: 'Avg Blood Sugar (mmol/L)', explanation: 'Your estimated average blood glucose in mmol/L, the unit used in most other countries.' },
        { resultLabel: 'IFCC A1C', explanation: 'The same A1C on the mmol/mol scale used by laboratories in the UK, Europe and much of the world.' }
      ],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'See how weight management affects blood sugar control.' },
        { slug: 'water-intake-calculator', step: 'Hydration supports glucose regulation.' },
        { slug: 'blood-pressure-calculator', step: 'Cardiometabolic risk factors tend to cluster.' }
      ],
      faqs: [
        { q: 'What is a normal A1C?', a: 'Below 5.7% is normal. 5.7% to 6.4% indicates pre-diabetes. 6.5% or above on two separate tests indicates diabetes. These are US ADA thresholds; the WHO and some other bodies use slightly different cut-offs for diagnosis, so the label attached to a number can vary by country.' },
        { q: 'How often should A1C be tested?', a: 'Every six months if results are stable and at target, and every three months if you are managing diabetes or changing treatment. Testing more often than that is uninformative, because the measurement averages two to three months of glucose.' },
        { q: 'Does A1C reflect daily glucose swings?', a: 'No. A1C is an average, so it can look acceptable while hiding wide excursions — high after meals and low overnight. Continuous glucose monitoring captures that variability, and two people with the same A1C can have very different glucose patterns.' },
        { q: 'Why do labs report A1C in mmol/mol?', a: 'The IFCC reference method expresses the result as millimoles of glycated hemoglobin per mole, which is the international standard; the NGSP percentage is a US-anchored derived scale. Both measure the same thing, and the conversion here lets you read a result in whichever unit your clinician uses.' },
        { q: 'Can anything other than glucose affect A1C?', a: 'Yes. Conditions that change red blood cell lifespan — anemia, recent blood loss, some hemoglobin variants, pregnancy and certain kidney problems — can shift the result without a real change in glucose. If the A1C does not match your meter readings, that is worth raising with a clinician.' }
      ],
      related: ['bmi-calculator', 'water-intake-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-11-06' },
  },
  {
    id: 'lean-body-mass',
    slug: 'lean-body-mass-calculator',
    name: 'Lean Body Mass Calculator',
    shortDesc: 'Estimate your lean body mass excluding fat using the Boer formula.',
    tagline: 'Know what is under the body fat.',
    category: 'health',
    iconName: 'Activity',
    keywords: ['lean body mass', 'LBM calculator', 'fat free mass', 'body composition'],
    kind: 'config',
    config: {
      fields: [
        { id: 'weightKg', label: 'Weight (kg)', type: 'number', defaultValue: 70, suffix: 'kg', min: 20 },
        { id: 'heightCm', label: 'Height (cm)', type: 'number', defaultValue: 175, suffix: 'cm', min: 100 },
        { id: 'sex', label: 'Sex (1=Male, 0=Female)', type: 'number', defaultValue: 1, min: 0, max: 1, step: 1 }
      ],
      results: [
        { label: 'Lean Body Mass', formulaCode: 'sex === 1 ? (0.407 * weightKg) + (0.267 * heightCm) - 19.2 : (0.252 * weightKg) + (0.473 * heightCm) - 48.3', suffix: 'kg', accent: true },
        { label: 'Body Fat Mass', formulaCode: 'weightKg - (sex === 1 ? (0.407 * weightKg) + (0.267 * heightCm) - 19.2 : (0.252 * weightKg) + (0.473 * heightCm) - 48.3)', suffix: 'kg' },
        { label: 'Body Fat Percentage', formulaCode: '(function(){ var lbm = sex === 1 ? (0.407 * weightKg) + (0.267 * heightCm) - 19.2 : (0.252 * weightKg) + (0.473 * heightCm) - 48.3; return (weightKg - lbm) / weightKg * 100; })()', suffix: '%' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Lean body mass includes muscle, bone, organs, and water.',
      'Higher LBM relative to total weight indicates a more muscular body composition.',
      'The Boer equation needs only height, weight and sex — no calipers or scans.'
      ],
    },
    content: {
      intro: 'The Lean Body Mass Calculator estimates how much of your body weight is not fat, using the Boer equation, and reports the fat mass and body fat percentage that follow from it. Lean mass is the part that carries the metabolic and functional value: muscle, bone, organs and the water inside them.',
      howItWorks: 'The Boer formula predicts lean mass from height, weight and sex alone, so it needs no calipers or scan. For men it is 0.407 × weight in kg, plus 0.267 × height in cm, minus 19.2. For women it is 0.252 × weight, plus 0.473 × height, minus 48.3 — a different slope and intercept, because women carry more essential fat and less skeletal muscle at the same size. Fat mass is total weight minus lean mass, and body fat percentage is that fat mass as a share of total weight. Because the equation is fitted to population averages, it is a reasonable estimate for most adults and less reliable at extremes of height, very high body fat, or high muscularity, where a DEXA scan is more trustworthy.',
      example: 'A 70 kg, 175 cm man has a lean mass of 28.49 + 46.73 − 19.2 = 56.0 kg, so fat mass is 14.0 kg and body fat percentage is 20.0%. A woman of the same height and weight has a lean mass of 52.1 kg, fat mass of 17.9 kg and 25.6% body fat. At 75 kg the man is predicted 58.0 kg of lean mass and 17.0 kg of fat — 22.6% — because the equation assumes part of the extra weight is lean tissue rather than all fat.',
      formulas: [{ label: 'Boer', expression: 'LBM = 0.407W + 0.267H − 19.2 (male)' }],
      resultExplanations: [
        { resultLabel: 'Lean Body Mass', explanation: 'The estimated weight of everything in your body that is not fat, in kilograms.' },
        { resultLabel: 'Body Fat Mass', explanation: 'The estimated fat portion of your body weight.' },
        { resultLabel: 'Body Fat Percentage', explanation: 'Fat mass as a share of total weight, the figure that makes the estimate comparable with body-composition standards.' }
      ],
      workflowLinks: [
        { slug: 'body-fat-calculator', step: 'Compare with the Navy tape body-fat method.' },
        { slug: 'protein-intake-calculator', step: 'Set protein targets based on lean mass.' },
        { slug: 'ideal-body-fat-calculator', step: 'See the healthy body-fat range for your age and sex.' }
      ],
      faqs: [
        { q: 'How accurate is the Boer formula?', a: 'It typically lands within a few percentage points of a DEXA scan for adults of average build, which is good enough for tracking a trend but not for clinical decisions. People with very high muscle mass are usually under-estimated for body fat, and very lean people are over-estimated.' },
        { q: 'Why does lean body matter more than total weight?', a: 'Because lean tissue is what burns energy, carries strength and supports bone density. Two people at 80 kg can differ by 10 kg of muscle, and their metabolic rates, health risks and appropriate protein intakes differ with it. Total weight alone cannot distinguish those cases.' },
        { q: 'Can I increase my lean body mass?', a: 'Yes, though the ceiling is genetic. Resistance training two to four times a week, protein at roughly 1.6-2.2 g per kg of body weight, and a small calorie surplus are the reliable levers. Progress is slow: a few kilograms over a year is a realistic rate for most people.' },
        { q: 'Does lean mass include water?', a: 'Yes. Lean mass is everything that is not fat, and water is a large part of it — roughly 60% of body weight in a typical adult. That is why hydration status, a salty meal or a hard training session can shift the estimate by a kilogram or more from day to day.' },
        { q: 'Why are the male and female formulas different?', a: 'Because body composition differs systematically by sex at the same height and weight. The equations were fitted to measured populations, so they encode that difference in the coefficients rather than applying a single formula and adjusting afterwards.' }
      ],
      related: ['body-fat-calculator', 'bmi-calculator', 'protein-intake-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-11-06' },
  },
  {
    id: 'calorie-deficit',
    slug: 'calorie-deficit-calculator',
    name: 'Calorie Deficit Calculator',
    shortDesc: 'Calculate how long to reach goal weight at a given daily deficit.',
    tagline: 'Put a timeline on weight loss.',
    category: 'health',
    iconName: 'TrendingUp',
    keywords: ['calorie deficit calculator', 'weight loss timeline', 'how long to lose weight'],
    kind: 'config',
    config: {
      fields: [
        { id: 'currentWeightKg', label: 'Current Weight (kg)', type: 'number', defaultValue: 80, suffix: 'kg', min: 30 },
        { id: 'goalWeightKg', label: 'Goal Weight (kg)', type: 'number', defaultValue: 70, suffix: 'kg', min: 30 },
        { id: 'dailyDeficitKcal', label: 'Daily Deficit (kcal)', type: 'number', defaultValue: 500, suffix: 'kcal', min: 100, max: 1500, step: 50 }
      ],
      results: [
        { label: 'Weight to Lose', formulaCode: 'Math.max(0, currentWeightKg - goalWeightKg)', suffix: 'kg', accent: true },
        { label: 'Days to Goal', formulaCode: 'Math.max(0, currentWeightKg - goalWeightKg) > 0 ? Math.round((currentWeightKg - goalWeightKg) * 7700 / dailyDeficitKcal) : 0', suffix: 'days' },
        { label: 'Weeks to Goal', formulaCode: '(function(){ var loss = Math.max(0, currentWeightKg - goalWeightKg); return loss > 0 ? (loss * 7700 / dailyDeficitKcal) / 7 : 0; })()', suffix: 'weeks' },
        { label: 'Total Deficit Needed', formulaCode: 'Math.max(0, currentWeightKg - goalWeightKg) * 7700', suffix: 'kcal' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'A safe deficit is 300-700 kcal/day for most people.',
      'A larger deficit loses weight faster but increases hunger and muscle loss risk.',
      'The 7,700 kcal per kilogram figure is an approximation — the real cost rises as you get leaner.'
      ],
    },
    content: {
      intro: 'The Calorie Deficit Calculator turns a weight-loss target and a daily deficit into a timeline, converting kilograms of fat into the calories they represent and dividing by the deficit you can sustain. It reports the total energy gap, the days and the weeks, which is the form a plan is actually made in.',
      howItWorks: 'A kilogram of body fat stores roughly 7,700 kcal, so losing 10 kg requires a cumulative deficit of about 77,000 kcal. Dividing that by a daily deficit gives the number of days; dividing again by seven gives weeks. The 7,700 figure is an approximation drawn from the energy density of fat tissue, and it overstates the cost slightly as you get leaner, because some of the lost mass is lean tissue and because a smaller body burns fewer calories. That is why real timelines tend to run a little longer than the arithmetic predicts, and why a fixed deficit produces slower loss over time.',
      example: 'Losing 10 kg at a 500 kcal daily deficit needs 10 × 7,700 = 77,000 kcal of cumulative deficit, which at 500 a day is 154 days — about 22 weeks, or roughly five months. Halving the deficit to 250 kcal doubles the timeline to 308 days. Raising it to 750 kcal brings it to 103 days, but that is a steeper deficit than most people sustain without hunger and muscle loss.',
      formulas: [{ label: 'Days', expression: 'Days = Weight loss × 7,700 / Daily deficit' }],
      resultExplanations: [
        { resultLabel: 'Weight to Lose', explanation: 'The difference between your current weight and goal weight.' },
        { resultLabel: 'Days to Goal', explanation: 'The estimated number of days to reach your goal at the given deficit.' },
        { resultLabel: 'Weeks to Goal', explanation: 'The same timeline in weeks, which is how most people plan and review progress.' },
        { resultLabel: 'Total Deficit Needed', explanation: 'The cumulative calorie gap the whole weight loss represents — the total energy you need to under-eat or burn.' }
      ],
      workflowLinks: [
        { slug: 'bmr-calculator', step: 'Understand your resting calorie baseline.' },
        { slug: 'protein-intake-calculator', step: 'Keep protein high to preserve muscle during the deficit.' },
        { slug: 'tdee-calculator', step: 'Find the maintenance level the deficit is subtracted from.' }
      ],
      faqs: [
        { q: 'How big of a calorie deficit is safe?', a: 'A 300-700 kcal a day deficit is sustainable for most adults, producing roughly 0.25-0.7 kg of loss a week. Larger deficits accelerate short-term loss but raise the risk of muscle loss, nutrient shortfalls and rebound, and they usually need medical supervision.' },
        { q: 'Why does weight loss slow down?', a: 'As you lose weight your BMR and the energy cost of movement both fall, so the same intake becomes a smaller deficit. The 7,700 kcal figure also becomes less accurate as fat stores shrink. Recalculate every few weeks rather than assuming the original timeline holds.' },
        { q: 'Does this account for muscle gain?', a: 'No. This is a fat-loss model, and it assumes the weight lost is fat. Someone strength training in a modest deficit can add a little muscle, which slows the scale without slowing fat loss — measurements and photos are better progress checks than weight alone.' },
        { q: 'Is the timeline a promise?', a: 'No. It is arithmetic on an average, and real bodies hold water, adapt, and lose at an uneven rate. Weeks with no movement followed by a sudden drop are normal. Use the figure to set expectations, not to judge any single week.' },
        { q: 'What happens when I reach the goal?', a: 'The deficit stops being appropriate, and intake needs to rise to the maintenance level for the new weight — which is lower than it was at the start. That transition, rather than the loss itself, is where most weight is regained, so plan for it before you arrive.' }
      ],
      related: ['bmr-calculator', 'protein-intake-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-11-06' },
  },
  {
    id: 'body-surface-area',
    slug: 'body-surface-area-calculator',
    name: 'Body Surface Area Calculator',
    shortDesc: 'Estimate body surface area using the Mosteller formula.',
    tagline: 'A standard medical metric.',
    category: 'health',
    iconName: 'Square',
    keywords: ['body surface area', 'BSA calculator', 'Mosteller formula', 'medical dosing'],
    kind: 'config',
    config: {
      fields: [
        { id: 'weightKg', label: 'Weight (kg)', type: 'number', defaultValue: 70, suffix: 'kg', min: 20 },
        { id: 'heightCm', label: 'Height (cm)', type: 'number', defaultValue: 175, suffix: 'cm', min: 100 }
      ],
      results: [
        { label: 'Body Surface Area', formulaCode: 'Math.sqrt((weightKg * heightCm) / 3600)', suffix: 'm2', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
        'Average adult body surface area is roughly 1.7 m², with men averaging a little higher than women.',
        'BSA is used for chemotherapy dosing, cardiac index and kidney-function indexing.',
        'BSA is an estimate of skin area, not a measure of body composition or fitness.'
      ],
    },
    content: {
      intro: 'The Body Surface Area Calculator estimates total skin surface area from height and weight using the Mosteller formula. BSA is the number clinicians use when a drug dose or a physiological measurement needs to scale with body size rather than with weight alone.',
      howItWorks: 'Mosteller\u2019s formula is BSA = √(height in cm × weight in kg / 3600). It needs only two measurements, which is why it became the default in clinical practice, and it tracks more elaborate formulas closely for most adults. Body surface area scales less steeply than weight, so a person twice as heavy does not have twice the skin area — which is exactly why some drug doses are written per m² instead of per kg.',
      example: 'For 175 cm and 70 kg: 175 × 70 = 12,250, divided by 3,600 gives 3.403, and the square root is 1.84 m². At 90 kg the figure rises to 2.09 m², and at 50 kg it falls to 1.56 m². The reference adult of 70 kg and 175 cm is often quoted as 1.73 m² in clinical literature, so a result of 1.84 m² is at the upper end of typical.',
      formulas: [{ label: 'Mosteller', expression: 'BSA = sqrt(H x W / 3600)' }],
      resultExplanations: [
        { resultLabel: 'Body Surface Area', explanation: 'Your estimated total body surface area in square metres, from the Mosteller formula.' }
      ],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'Pair BSA with BMI for a fuller health picture.' },
        { slug: 'lean-body-mass-calculator', step: 'Understand body composition alongside surface area.' }
      ],
      faqs: [
        { q: 'What is BSA used for?', a: 'Chemotherapy and some other drug doses are written per square metre of body surface, cardiac output is reported per m² as the cardiac index, and kidney function is often indexed to a standard 1.73 m² so results can be compared between differently sized people.' },
        { q: 'How accurate is the Mosteller formula?', a: 'It typically lands within a few per cent of measured surface area for adults, which is close enough for dosing tables and far cheaper than measurement. It is an estimate, though — no formula replaces a clinical assessment for a critical dose.' },
        { q: 'What is a normal BSA?', a: 'Most adults fall between about 1.5 and 2.1 m², with the clinical reference adult at 1.73 m². Men average slightly higher than women because they tend to be taller and heavier, and children are much lower.' },
        { q: 'Is BSA better than weight for drug dosing?', a: 'For drugs whose clearance tracks metabolic mass rather than fat or fluid, yes — which is why oncology settled on it. For others, weight-based or fixed dosing is used. The choice is drug-specific and belongs to the prescriber, not to a calculator.' },
        { q: 'Does BSA work in obesity?', a: 'It is less reliable at extremes. Mosteller and other height-weight formulas tend to overestimate in severe obesity, where lean mass is a smaller share of total weight, and different formulas diverge — which is why dosing protocols for these patients often specify adjustments.' },
      ],
      related: ['bmi-calculator', 'lean-body-mass-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.65, updatedAt: '2026-11-05' },
  },
  {
    id: 'vo2-max',
    slug: 'vo2-max-calculator',
    name: 'VO2 Max Estimator',
    shortDesc: 'Estimate VO2 max from a 1.5-mile run time.',
    tagline: 'Your aerobic fitness number.',
    category: 'health',
    iconName: 'Gauge',
    keywords: ['VO2 max calculator', 'aerobic fitness', 'run VO2 max', 'cardiovascular fitness'],
    kind: 'config',
    config: {
      fields: [
        { id: 'timeMinutes', label: '1.5-Mile Time (Minutes)', type: 'number', defaultValue: 12, min: 1, max: 300 },
        { id: 'timeSeconds', label: 'Seconds', type: 'number', defaultValue: 0, min: 0, max: 59 }
      ],
      results: [
        { label: 'Estimated VO2 Max', formulaCode: '(483 / (timeMinutes + timeSeconds / 60)) + 3.5', suffix: 'ml/kg/min', accent: true }
      ],
      formulaDescription: 'VO2 max = 483 / time in minutes + 3.5',
      tips: [
        'This estimate is built for a 1.5-mile (2.4 km) run, not a 5K or a treadmill session at an easy pace.',
        'Warm up, then run the distance as hard as you can sustain over the full 2.4 km.',
        'Typical values: sedentary 30-40, active 40-50, competitive runners 55-70+ ml/kg/min.'
      ],
    },
    content: {
      intro: 'The VO2 Max Estimator turns a hard 1.5-mile (2.4 km) run into an estimate of your maximal oxygen uptake, the standard measure of aerobic fitness. Faster times mean a higher number, and the estimate is comparable with the laboratory values quoted in training books and race-pace tables.',
      howItWorks: 'The calculator applies the Cooper 1.5-mile equation: 483 divided by the run time in minutes, plus 3.5 for the oxygen you use at rest. Seconds are converted to a fraction of a minute first, so 12 minutes 30 seconds is treated as 12.5. The equation is calibrated for that exact distance at maximal effort, which is why a time from another distance cannot simply be substituted.',
      example: 'A 1.5-mile run in 12 minutes 00 seconds: 483 / 12 = 40.25, plus 3.5 gives 43.75 ml/kg/min. The same distance in 15 minutes gives 483 / 15 + 3.5 = 35.7, and an elite 9-minute run gives 57.2 — the steep curve is why a minute either way moves the estimate so much.',
      formulas: [{ label: 'Cooper', expression: 'VO2 max = 483 / T(min) + 3.5' }],
      resultExplanations: [
        { resultLabel: 'Estimated VO2 Max', explanation: 'Your estimated maximal oxygen uptake in millilitres of oxygen per kilogram of body weight per minute. Higher values indicate better aerobic fitness.' }
      ],
      workflowLinks: [
        { slug: 'target-heart-rate-calculator', step: 'Set training zones based on your fitness level.' },
        { slug: 'calories-burned-calculator', step: 'Estimate the calorie cost of your runs.' }
      ],
      faqs: [
        { q: 'What distance do I run?', a: 'Exactly 1.5 miles, or 2.4 km. The 483 constant belongs to that distance. For a 5K or a 12-minute run test you need a different equation, so a 5K time entered here will produce a figure that is far too low.' },
        { q: 'What is a good VO2 max?', a: 'Age and sex both shift the scale. Rough bands for a man in his thirties are 35-40 below average, 40-45 average, 45-55 good and 55+ excellent; women usually score about 5-10 points lower at the same fitness level.' },
        { q: 'How do I improve my VO2 max?', a: 'Intervals near maximal effort, tempo runs and a gradually rising weekly mileage are the reliable levers. Most of the gain comes from consistent weeks rather than any single session.' },
        { q: 'Is this as accurate as a lab test?', a: 'No. Field equations typically land within 5-10% of a laboratory treadmill test, and heat, hills, wind and pacing all move the result. Use it to track your own trend under similar conditions, not as a clinical measurement.' }
      ],
      related: ['target-heart-rate-calculator', 'calories-burned-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-11-04' },
  },
  {
    id: 'carb-intake',
    slug: 'carb-intake-calculator',
    name: 'Carb Intake Calculator',
    shortDesc: 'Set daily carbohydrate targets by body weight and activity.',
    tagline: 'Fuel your workouts right.',
    category: 'health',
    iconName: 'Flame',
    keywords: ['carb intake calculator', 'carbs per day', 'carbohydrate calculator', 'daily carb intake'],
    kind: 'config',
    config: {
      fields: [
        { id: 'weightKg', label: 'Body Weight (kg)', type: 'number', defaultValue: 70, suffix: 'kg', min: 20 },
        { id: 'gramsPerKg', label: 'Grams per kg', type: 'number', defaultValue: 4, min: 1, max: 10, step: 0.5 }
      ],
      results: [
        { label: 'Daily Carb Target', formulaCode: 'weightKg * gramsPerKg', suffix: 'grams', accent: true },
        { label: 'Carb Calories', formulaCode: 'weightKg * gramsPerKg * 4', suffix: 'kcal' },
        { label: 'Per Meal (4 meals)', formulaCode: 'weightKg * gramsPerKg / 4', suffix: 'grams' }
      ],
      formulaDescription: 'undefined',
      tips: [
        'Use 2-3 g/kg for sedentary, 4-6 g/kg for moderate activity, 6-10 g/kg for endurance training.',
        'Carbs provide 4 kcal per gram and are the preferred fuel for high-intensity exercise.',
        'Check the gram target against your calorie budget: at 4 kcal/g, 400 g of carbs is 1,600 kcal.'
      ],
    },
    content: {
      intro: 'The Carb Intake Calculator sets a daily carbohydrate target from your body weight and a grams-per-kilogram figure chosen for your training load. It turns a range from sports-nutrition guidance into a single number, and shows what that number costs in calories and how it divides across meals.',
      howItWorks: 'Body weight in kilograms is multiplied by grams per kilogram to give the daily total. That figure is multiplied by 4 — the energy in one gram of carbohydrate — to show how much of the day\u2019s calorie budget it consumes, and divided by four to suggest a per-meal share. The grams-per-kilogram input is the only judgement in the calculation: sedentary adults sit around 2-3, moderate training at 4-6, and heavy endurance work at 6-10.',
      example: 'A 70 kg runner at 5 g/kg needs 350 g of carbohydrate a day, which is 1,400 kcal — about 70% of a 2,000 kcal diet, and 88 g per meal across four meals. At 3 g/kg the same person needs 210 g and 840 kcal, a much easier fit alongside protein and fat. A 90 kg endurance athlete at 8 g/kg is at 720 g and 2,880 kcal, which only works with a large total intake.',
      formulas: [{ label: 'Carbs', expression: 'Carbs (g) = Weight (kg) x g/kg; kcal = grams x 4' }],
      resultExplanations: [
        { resultLabel: 'Daily Carb Target', explanation: 'Grams of carbohydrates to eat each day at the chosen grams-per-kilogram figure.' },
        { resultLabel: 'Carb Calories', explanation: 'How many daily calories come from that carbohydrate target, at 4 kcal per gram.' },
        { resultLabel: 'Per Meal (4 meals)', explanation: 'The daily target split evenly across four meals, a starting point for portioning.' }
      ],
      workflowLinks: [
        { slug: 'tdee-calculator', step: 'Fit carbs within your total calorie budget.' },
        { slug: 'protein-intake-calculator', step: 'Set protein alongside carbs for a complete plan.' },
        { slug: 'macro-calculator', step: 'Turn the same targets into a percentage split.' }
      ],
      faqs: [
        { q: 'How many carbs do I need per day?', a: 'Sedentary adults need roughly 2-3 g/kg, moderately active people 4-6 g/kg, and endurance athletes in heavy training 6-10 g/kg. For a 70 kg person that spans about 140 g to 700 g a day, which is why a single figure for everyone cannot work.' },
        { q: 'Are low-carb diets safe?', a: 'Low-carb diets can work for weight loss and some metabolic conditions, but very low intakes under about 50 g a day are hard to sustain for intense training and can leave nutrient gaps if the foods removed are not replaced. The right level depends on what you are training for.' },
        { q: 'What are the best carb sources?', a: 'Whole grains, potatoes, fruit, vegetables and legumes bring fibre, vitamins and minerals alongside the carbohydrate. Refined sources are not forbidden — they are simply easier to overeat and carry less of everything else.' },
        { q: 'Do carbs make you gain fat?', a: 'A calorie surplus does, and carbohydrate is the easiest macronutrient to overeat. Carbs also hold water: every gram of stored glycogen carries roughly 3 g of water, so a high-carb day can move the scale without adding fat.' },
        { q: 'Should I eat carbs before or after training?', a: 'Both have a case. Carbs before training top up glycogen for the session; carbs after refill it faster, particularly in the first hours. Total daily intake matters more than timing unless you train twice a day.' },
      ],
      related: ['tdee-calculator', 'protein-intake-calculator', 'macro-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75, updatedAt: '2026-11-05' },
  },
  {
    id: 'fat-intake',
    slug: 'fat-intake-calculator',
    name: 'Daily Fat Intake Calculator',
    shortDesc: 'Estimate how much dietary fat you need each day.',
    tagline: 'The right amount of fat.',
    category: 'health',
    iconName: 'Droplets',
    keywords: ['fat intake calculator', 'daily fat intake', 'how much fat per day', 'dietary fat'],
    kind: 'config',
    config: {
      fields: [
        { id: 'dailyCalories', label: 'Daily Calories', type: 'number', defaultValue: 2000, suffix: 'kcal', min: 800, max: 6000 },
        { id: 'fatPct', label: 'Fat as % of Calories', type: 'number', defaultValue: 30, suffix: '%', min: 10, max: 50, step: 1 }
      ],
      results: [
        { label: 'Daily Fat Target', formulaCode: 'dailyCalories * (fatPct / 100) / 9', suffix: 'grams', accent: true },
        { label: 'Fat Calories', formulaCode: 'dailyCalories * (fatPct / 100)', suffix: 'kcal' }
      ],
      formulaDescription: 'undefined',
      tips: [
        'Most guidelines put fat at 20-35% of calories.',
        'Fat provides 9 kcal per gram, more than double protein or carbohydrate at 4.',
        'Saturated fat is usually advised to stay under 10% of total calories.'
      ],
    },
    content: {
      intro: 'The Daily Fat Intake Calculator converts a fat percentage into grams per day. Fat is the most calorie-dense macronutrient at 9 kcal per gram, so a percentage target on a food label or diet plan is easier to follow once it becomes a daily gram figure.',
      howItWorks: 'Calories are multiplied by the fat percentage to give the calories that should come from fat, and that figure is divided by 9, the energy in one gram of fat. The second result simply repeats the calorie figure, which is useful when comparing a gram target against a food label that lists fat calories directly.',
      example: 'On 2,000 kcal at 30% fat: 2,000 x 0.30 = 600 kcal from fat, and 600 / 9 = 66.7 grams. Dropping to 25% gives 500 kcal and 55.6 grams; raising to 35% gives 700 kcal and 77.8 grams. The same 30% on a 2,500 kcal diet is 83.3 grams.',
      formulas: [{ label: 'Fat', expression: 'Fat (g) = Calories x Fat% / 100 / 9' }],
      resultExplanations: [
        { resultLabel: 'Daily Fat Target', explanation: 'Grams of dietary fat per day at the calorie level and percentage entered.' },
        { resultLabel: 'Fat Calories', explanation: 'How many of the daily calories come from fat at that percentage.' }
      ],
      workflowLinks: [
        { slug: 'tdee-calculator', step: 'Set your calorie baseline before splitting macros.' },
        { slug: 'protein-intake-calculator', step: 'Set protein alongside fat for a complete plan.' }
      ],
      faqs: [
        { q: 'How much fat should I eat per day?', a: 'Most guidelines recommend 20-35% of total calories from fat. For 2,000 kcal that is 44-78 grams per day; the exact figure depends on your calorie target, not on a universal number.' },
        { q: 'Is dietary fat bad for you?', a: 'No. Fat is required for hormone production and for absorbing vitamins A, D, E and K. The distinction that matters is type: unsaturated fats from olive oil, nuts, seeds and fish in place of saturated fat, and avoiding industrial trans fats.' },
        { q: 'What happens if I eat too little fat?', a: 'Very low fat intakes can impair hormone production and reduce absorption of the fat-soluble vitamins. The 20% floor in this calculator reflects the usual lower guidance rather than a hard biological limit.' },
        { q: 'Does the type of fat matter?', a: 'Yes, and this calculator cannot tell them apart. Two diets at 30% fat can differ completely in saturated and unsaturated content, and that split matters far more for health than the total grams.' }
      ],
      related: ['tdee-calculator', 'protein-intake-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-11-04' },
  },
  {
    id: 'macro-calculator',
    slug: 'macro-calculator',
    name: 'Complete Macro Calculator',
    shortDesc: 'Split daily calories into protein, carbs, and fat targets.',
    tagline: 'Three numbers for your nutrition.',
    category: 'health',
    iconName: 'BarChart3',
    keywords: ['macro calculator', 'macronutrient calculator', 'protein carbs fat calculator', 'macro split'],
    kind: 'config',
    config: {
      fields: [
        { id: 'dailyCalories', label: 'Daily Calories', type: 'number', defaultValue: 2000, suffix: 'kcal', min: 800, max: 6000 },
        { id: 'proteinPct', label: 'Protein %', type: 'number', defaultValue: 30, suffix: '%', min: 10, max: 50, step: 1 },
        { id: 'carbPct', label: 'Carbs %', type: 'number', defaultValue: 40, suffix: '%', min: 10, max: 70, step: 1 },
        { id: 'fatPct', label: 'Fat %', type: 'number', defaultValue: 30, suffix: '%', min: 10, max: 50, step: 1 }
      ],
      results: [
        { label: 'Protein', formulaCode: 'dailyCalories * (proteinPct / 100) / 4', suffix: 'grams', accent: true },
        { label: 'Carbs', formulaCode: 'dailyCalories * (carbPct / 100) / 4', suffix: 'grams' },
        { label: 'Fat', formulaCode: 'dailyCalories * (fatPct / 100) / 9', suffix: 'grams' },
        { label: 'Calories from Split', formulaCode: 'dailyCalories * (proteinPct + carbPct + fatPct) / 100', suffix: 'kcal' }
      ],
      formulaDescription: 'undefined',
      tips: [
        'Protein and carbs have 4 kcal per gram. Fat has 9.',
        'Common splits: 30/40/30 balanced, 40/30/30 higher protein, 30/50/20 endurance.',
        'Watch the Calories from Split figure — it should match your daily target, or the percentages do not add up to 100%.'
      ],
    },
    content: {
      intro: 'The Complete Macro Calculator splits a daily calorie target into protein, carbohydrate and fat grams. It converts the percentage split on a diet plan into the three numbers you actually weigh and log, and it shows how many calories the split really adds up to.',
      howItWorks: 'Each percentage is applied to the daily calorie target to give the calories from that macronutrient, then divided by its energy value: 4 kcal per gram for protein and carbohydrate, 9 for fat. The fourth result adds the three percentages together and applies that total to the calorie target. If the split totals 100%, this equals the calorie target; if it totals 110%, it shows 10% more calories than intended, which is the arithmetic slips most often missed.',
      example: '2,500 kcal split 30% protein, 40% carbs and 30% fat: protein is 2,500 × 0.30 / 4 = 187.5 g, carbs 2,500 × 0.40 / 4 = 250 g, and fat 2,500 × 0.30 / 9 = 83.3 g. The split totals 100%, so Calories from Split reads 2,500. Setting protein to 40% and leaving the others alone gives 2,750 kcal — a 250 kcal overshoot that the gram figures alone would not reveal.',
      formulas: [{ label: 'Macros', expression: 'Protein/Carbs = Cal x %/4; Fat = Cal x %/9' }],
      resultExplanations: [
        { resultLabel: 'Protein', explanation: 'Daily protein target in grams, at 4 kcal per gram.' },
        { resultLabel: 'Carbs', explanation: 'Daily carbohydrate target in grams, at 4 kcal per gram.' },
        { resultLabel: 'Fat', explanation: 'Daily fat target in grams, at 9 kcal per gram.' },
        { resultLabel: 'Calories from Split', explanation: 'What the three percentages add up to in calories. It should match your daily target; if it does not, the percentages do not total 100%.' }
      ],
      workflowLinks: [
        { slug: 'tdee-calculator', step: 'Start with your TDEE to set the calorie target.' },
        { slug: 'protein-intake-calculator', step: 'Set protein independently using body-weight methods.' },
        { slug: 'carb-intake-calculator', step: 'Set carbs by body weight and training load.' }
      ],
      faqs: [
        { q: 'What macro split is best?', a: 'There is no single best split. A balanced 30/40/30 suits most people, higher protein helps preserve muscle in a deficit, and higher carbohydrate supports heavy endurance training. Adherence matters more than the exact ratio.' },
        { q: 'Do percentages need to add to 100%?', a: 'Yes, for the grams to match the calorie target. The calculator applies each percentage independently rather than forcing them to sum, and the Calories from Split result shows the difference — so 30/50/30 reads 2,750 kcal on a 2,500 kcal target.' },
        { q: 'Should I count macros or just calories?', a: 'Calories decide whether weight changes; macros decide what that weight is made of and how you feel training. Counting calories alone works for simple goals, and tracking protein specifically is the part of macro counting with the clearest evidence behind it.' },
        { q: 'Why is fat divided by 9 and protein by 4?', a: 'Because fat carries 9 kcal per gram while protein and carbohydrate carry about 4. That is why fat targets look small in grams: 30% of 2,500 kcal is 83 g of fat but 187 g of protein.' },
        { q: 'Can I use this for weight gain?', a: 'Yes — set the calorie target above your TDEE and keep protein high enough to support the training. A modest surplus of 200-300 kcal a day limits excess fat gain compared with a large one.' },
      ],
      related: ['tdee-calculator', 'protein-intake-calculator', 'carb-intake-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-11-05' },
  },
  {
    id: 'sleep-debt',
    slug: 'sleep-debt-calculator',
    name: 'Sleep Debt Calculator',
    shortDesc: 'Track cumulative sleep deficit and recovery needs.',
    tagline: 'See how much sleep you owe.',
    category: 'health',
    iconName: 'Moon',
    keywords: ['sleep debt calculator', 'sleep deficit', 'sleep recovery', 'catch up on sleep'],
    kind: 'config',
    config: {
      fields: [
        { id: 'targetHours', label: 'Target Sleep (hrs)', type: 'number', defaultValue: 8, suffix: 'hrs', min: 5, max: 10, step: 0.5 },
        { id: 'actualHoursLast7', label: 'Average Actual Sleep', type: 'number', defaultValue: 6.5, suffix: 'hrs', min: 0, max: 14, step: 0.5 },
        { id: 'daysOfDeficit', label: 'Days of Deficit', type: 'number', defaultValue: 7, min: 1, max: 90 }
      ],
      results: [
        { label: 'Nightly Shortfall', formulaCode: 'Math.max(0, targetHours - actualHoursLast7)', suffix: 'hrs', accent: true },
        { label: 'Total Sleep Debt', formulaCode: 'Math.max(0, targetHours - actualHoursLast7) * daysOfDeficit', suffix: 'hrs' },
        { label: 'Recovery Nights (2h extra)', formulaCode: 'Math.ceil(Math.max(0, targetHours - actualHoursLast7) * daysOfDeficit / 2)', suffix: 'nights' }
      ],
      formulaDescription: 'undefined',
      tips: [
        'Most adults need 7-9 hours per night; teenagers need more.',
        'Recovery works best at 1-2 extra hours a night over several nights, not one long lie-in.',
        'A consistent wake time anchors sleep more reliably than an early bedtime.'
      ],
    },
    content: {
      intro: 'The Sleep Debt Calculator multiplies a nightly shortfall by the number of nights it has run to give the total hours owed, plus the number of nights needed to repay it at two extra hours a night. It puts a figure on something that is otherwise easy to wave away, because the deficit accumulates faster than it feels like it does.',
      howItWorks: 'Target sleep minus average actual sleep gives the shortfall for one night, floored at zero so a surplus night does not offset a deficit. Multiplying by the days in the window gives total debt, and dividing that debt by two gives the recovery nights required at an extra two hours each. The window matters: a 7-day figure describes last week, not a permanent biological account.',
      example: 'Targeting 8 hours but averaging 6.5 over 7 days: the shortfall is 1.5 hours a night and the debt is 10.5 hours. At two extra hours a night that takes six nights to clear. Over 14 days at the same rate the debt reaches 21 hours, which is why a single lie-in cannot undo a fortnight of short sleep.',
      formulas: [{ label: 'Sleep Debt', expression: 'Debt = (Target - Actual) x Days' }],
      resultExplanations: [
        { resultLabel: 'Nightly Shortfall', explanation: 'How many hours you are losing each night, never below zero.' },
        { resultLabel: 'Total Sleep Debt', explanation: 'The cumulative hours of sleep you owe your body across the days entered.' },
        { resultLabel: 'Recovery Nights (2h extra)', explanation: 'Nights needed to repay the debt if you add two hours to each night.' }
      ],
      workflowLinks: [
        { slug: 'sleep-cycle-calculator', step: 'Plan sleep around your target wake time.' },
        { slug: 'sleep-hours-calculator', step: 'Work out how long you actually slept between two times.' },
        { slug: 'caffeine-limit-calculator', step: 'Check how late caffeine is still in your system at bedtime.' }
      ],
      faqs: [
        { q: 'Can you catch up on lost sleep?', a: 'Partially. Extra sleep over the following nights restores alertness and reaction time fairly well, but some measures of attention and glucose handling recover more slowly. A single long sleep does not erase a week of short nights.' },
        { q: 'How much sleep debt is dangerous?', a: 'Repeatedly sleeping under about 7 hours is associated with impaired attention, mood and immune function, and with higher long-term cardiometabolic risk. One or two short nights are survivable; the pattern is what matters.' },
        { q: 'Is it better to sleep more on weekends?', a: 'It helps and is better than nothing, but a large weekday deficit and a weekend catch-up creates its own problem — shifting the body clock back and forth, often called social jetlag. A more consistent schedule is usually easier to sustain.' },
        { q: 'Does sleep debt reset?', a: 'The calculation is a window, not a biological ledger. Physiologically, recovery happens over several nights of adequate sleep, and the estimate resets when your shortfall returns to zero rather than by any fixed rule.' },
        { q: 'Do naps count toward repayment?', a: 'Yes, particularly short early-afternoon naps. They are less efficient for deep sleep than a full night, so a 20-30 minute nap can support alertness without replacing the hours owed.' },
      ],
      related: ['sleep-cycle-calculator', 'sleep-hours-calculator', 'caffeine-limit-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75, updatedAt: '2026-11-05' },
  },
  {
    id: 'body-frame-size',
    slug: 'body-frame-size-calculator',
    name: 'Body Frame Size Calculator',
    shortDesc: 'Classify your body frame as small, medium, or large.',
    tagline: 'Your frame changes ideal weight.',
    category: 'health',
    iconName: 'ClipboardList',
    keywords: ['body frame size', 'body frame calculator', 'small medium large frame', 'wrist measurement'],
    kind: 'config',
    config: {
      fields: [
        { id: 'wristCm', label: 'Wrist (cm)', type: 'number', defaultValue: 17, suffix: 'cm', min: 10, max: 30, step: 0.1 },
        { id: 'heightCm', label: 'Height (cm)', type: 'number', defaultValue: 175, suffix: 'cm', min: 100 },
        { id: 'sex', label: 'Sex (1=Male, 0=Female)', type: 'number', defaultValue: 1, min: 0, max: 1, step: 1 }
      ],
      results: [
        { label: 'Height-to-Wrist Ratio', formulaCode: 'heightCm / wristCm', suffix: ':1', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Measure the wrist just above the wrist bone with a flexible tape.',
      'Body frame size affects ideal weight ranges. Large-framed individuals have higher healthy weights.',
      'The ratio is height divided by wrist circumference, so a larger number means a smaller frame.'
      ],
    },
    content: {
      intro: 'The Body Frame Size Calculator compares your height with your wrist circumference to classify your frame as small, medium or large. Frame size is bone structure, not body composition, and it explains why two people of the same height can have different healthy weight ranges without either being over- or under-weight.',
      howItWorks: 'Height in centimetres is divided by wrist circumference in centimetres, giving a ratio with no units. For men, above 10.4 indicates a small frame, 9.6 to 10.4 a medium frame, and below 9.6 a large frame. For women the bands shift up because average wrist circumference is smaller relative to height: above 11.0 small, 10.1 to 11.0 medium, below 10.1 large. The inversion catches people out — a bigger number means a smaller frame, because a narrow wrist divided into a fixed height gives a larger quotient. The wrist is used because it is a bony site with very little subcutaneous fat, so the tape measures structure rather than today diet.',
      example: 'A 175 cm man with a 17 cm wrist has a ratio of 175 / 17 = 10.29, which sits inside the medium band of 9.6 to 10.4. The same height with a 15.5 cm wrist gives 11.29 — a small frame — while a 19 cm wrist gives 9.21, a large frame. For a 165 cm woman, a 15 cm wrist gives 11.0, right at the small/medium boundary, and a 17 cm wrist gives 9.71, which is a large frame.',
      formulas: [{ label: 'Height-to-Wrist Ratio', expression: 'Ratio = Height / Wrist' }],
      resultExplanations: [
        { resultLabel: 'Height-to-Wrist Ratio', explanation: 'Men: above 10.4 small, 9.6-10.4 medium, below 9.6 large. Women: above 11.0 small, 10.1-11.0 medium, below 10.1 large.' }
      ],
      workflowLinks: [
        { slug: 'ideal-weight-calculator', step: 'Adjust your ideal weight target for your frame size.' },
        { slug: 'bmi-calculator', step: 'BMI does not account for frame size.' },
        { slug: 'body-fat-calculator', step: 'Frame size says nothing about body fat — measure that separately.' }
      ],
      faqs: [
        { q: 'How does frame size affect ideal weight?', a: 'A larger frame carries more bone and connective tissue, so a healthy weight for that person is higher than a formula based on height alone would suggest. The usual adjustment is around 10% either side of the medium-frame figure, not a free pass to ignore body fat.' },
        { q: 'How do I measure my wrist?', a: 'Wrap a flexible tape around the wrist just above the wrist bone, on the arm you write with, and keep it snug without compressing the skin. Measure twice; a half-centimetre error moves the ratio enough to change a classification near a boundary.' },
        { q: 'Is frame size genetic?', a: 'Largely, yes. Bone structure is set by genetics and by nutrition during growth, and it does not change meaningfully in adulthood — not with weight loss, and not with training. Muscle can be added around the frame, but the frame itself stays.' },
        { q: 'Why divide height by wrist rather than the other way round?', a: 'Because the published frame-size bands are expressed that way, and matching them means the number can be read directly. It is the reciprocal of a wrist-to-height percentage, so it carries exactly the same information — only the direction of "bigger means smaller frame" changes.' },
        { q: 'Can I use this to choose a bike frame or watch strap?', a: 'No. Those use their own measurements — inseam, arm length, wrist flat width — and a body-frame classification is far too coarse. This ratio describes skeletal build for weight-range purposes only.' }
      ],
      related: ['ideal-weight-calculator', 'bmi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-11-06' },
  },
  {
    id: 'metabolic-age',
    slug: 'metabolic-age-calculator',
    name: 'Metabolic Age Calculator',
    shortDesc: 'Compare your BMR to population averages for your age group.',
    tagline: 'How old is your metabolism?',
    category: 'health',
    iconName: 'Activity',
    keywords: ['metabolic age', 'metabolic age calculator', 'metabolism age', 'BMR age'],
    kind: 'config',
    config: {
      fields: [
        { id: 'weightKg', label: 'Weight (kg)', type: 'number', defaultValue: 70, suffix: 'kg', min: 20 },
        { id: 'heightCm', label: 'Height (cm)', type: 'number', defaultValue: 175, suffix: 'cm', min: 100 },
        { id: 'age', label: 'Age', type: 'number', defaultValue: 35, min: 15, max: 100 },
        { id: 'sex', label: 'Sex (1=Male, 0=Female)', type: 'number', defaultValue: 1, min: 0, max: 1, step: 1 }
      ],
      results: [
        { label: 'Your BMR', formulaCode: 'sex === 1 ? (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5 : (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161', suffix: 'kcal/day', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Muscle tissue burns more calories than fat. Building muscle can lower your metabolic age.',
      'Metabolic age is an estimate. Individual variation is significant.'
      ],
    },
    content: {
      intro: 'The Metabolic Age Calculator compares your Basal Metabolic Rate to average BMR values for your age group. If your metabolic age is higher than your actual age, your metabolism is slower than average.',
      howItWorks: 'Your BMR is calculated using the Mifflin-St Jeor equation. It is then compared to average BMR values for your age group. A lower metabolic age than chronological age indicates a faster metabolism.',
      example: 'A 35-year-old with a BMR of 1,650 kcal might have a metabolic age of 30, indicating a faster-than-average metabolism for their age group.',
      formulas: [{ label: 'BMR', expression: 'BMR = 10W + 6.25H - 5A + 5 (male)' }],
      resultExplanations: [
        { resultLabel: 'Your BMR', explanation: 'Your Basal Metabolic Rate. Compare to age-group averages: a lower BMR than average means higher metabolic age.' }
      ],
      workflowLinks: [
        { slug: 'bmr-calculator', step: 'Get your detailed BMR breakdown.' },
        { slug: 'tdee-calculator', step: 'Calculate your total daily energy expenditure.' }
      ],
      faqs: [
        { q: 'What is metabolic age?', a: 'It compares your BMR to average BMR values for your age group. A lower number than your real age means a faster metabolism.' },
        { q: 'How can I lower my metabolic age?', a: 'Build muscle through resistance training, eat adequate protein, and stay active throughout the day.' },
        { q: 'Is metabolic age accurate?', a: 'It is a useful estimate but not a precise measurement. Individual metabolism varies based on genetics, muscle mass, and other factors.' }
      ],
      related: ['bmr-calculator', 'tdee-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-08-22' },
  },
  {
    id: 'caffeine-limit',
    slug: 'caffeine-limit-calculator',
    name: 'Caffeine Intake Limit Calculator',
    shortDesc: 'Find your daily caffeine limit based on weight.',
    tagline: 'Know your safe caffeine cap.',
    category: 'health',
    iconName: 'Coffee',
    keywords: ['caffeine intake limit', 'caffeine calculator', 'how much caffeine', 'caffeine mg per day'],
    kind: 'config',
    config: {
      fields: [
        { id: 'weightKg', label: 'Weight (kg)', type: 'number', defaultValue: 70, suffix: 'kg', min: 20 }
      ],
      results: [
        { label: 'Daily Caffeine Limit', formulaCode: 'Math.min(weightKg * 3, 400)', suffix: 'mg', accent: true },
        { label: 'Equivalent Coffees', formulaCode: 'Math.min(weightKg * 3, 400) / 100', suffix: 'cups' }
      ],
      formulaDescription: 'undefined',
      tips: [
        'One 240 ml cup of filter coffee has roughly 80-100 mg of caffeine.',
        'Pregnant or breastfeeding women should stay at or below 200 mg per day regardless of weight.',
        'The limit is a daily cap, not a target — and a single large coffee can carry half of it.'
      ],
    },
    content: {
      intro: 'The Caffeine Intake Limit Calculator gives the daily caffeine ceiling that applies to you, using the 3 mg per kilogram of body weight guidance and the 400 mg daily cap for healthy adults. The lower of the two always wins, so a very heavy person still stops at 400 mg.',
      howItWorks: 'Weight in kilograms is multiplied by 3 to get a weight-based limit in milligrams. That figure is then compared with the 400 mg general ceiling for healthy adults and the calculator reports whichever is lower. A second result divides the answer by 100 mg, the approximate caffeine in a cup of filter coffee, to put the number in cups rather than milligrams.',
      example: 'A 70 kg adult: 70 x 3 = 210 mg, which is below the 400 mg cap, so 210 mg is the answer — about two 100 mg cups of coffee. At 90 kg the weight-based figure is 270 mg. From about 134 kg the calculation would pass 400 mg, so the cap takes over and the limit stays at 400 mg.',
      formulas: [{ label: 'Caffeine', expression: 'Limit (mg) = min(Weight (kg) x 3, 400)' }],
      resultExplanations: [
        { resultLabel: 'Daily Caffeine Limit', explanation: 'The lower of the 3 mg/kg weight-based figure and the 400 mg daily cap for healthy adults.' },
        { resultLabel: 'Equivalent Coffees', explanation: 'The limit expressed in 100 mg cups of filter coffee, for a rough sense of what it means in drinks.' }
      ],
      workflowLinks: [
        { slug: 'bmr-calculator', step: 'Caffeine can temporarily lift metabolic rate.' },
        { slug: 'water-intake-calculator', step: 'Pair caffeine intake with adequate water.' }
      ],
      faqs: [
        { q: 'Is 400 mg of caffeine safe for everyone?', a: 'It is the general ceiling cited for healthy adults, not a guarantee. People with heart conditions, anxiety disorders or insomnia, and anyone taking medication that interacts with caffeine, should ask a clinician about their own limit.' },
        { q: 'Why does the result stop at 400 mg?', a: 'Because the weight-based 3 mg/kg figure is not the only guidance. The 400 mg daily cap applies to healthy adults regardless of size, so the calculator reports whichever limit is lower and never exceeds it.' },
        { q: 'How much caffeine is in common drinks?', a: 'Roughly: filter coffee 80-100 mg per 240 ml cup, espresso 63 mg per shot, black tea 40-70 mg per cup, energy drink 80-150 mg per can, cola 30-40 mg per can. Brew strength and serving size move these figures a lot.' },
        { q: 'Does caffeine affect sleep?', a: 'Yes. Caffeine has a half-life of about 5-6 hours, so a 200 mg coffee at 4 pm still leaves roughly 100 mg in your system at 10 pm. Many people do better with no caffeine in the 8 hours before bed.' }
      ],
      related: ['bmr-calculator', 'water-intake-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-11-04' },
  },
  {
    id: 'body-type',
    slug: 'body-type-calculator',
    name: 'Body Type Calculator',
    shortDesc: 'Compare wrist and ankle size against your height.',
    tagline: 'Frame size, measured simply.',
    category: 'health',
    iconName: 'ClipboardList',
    keywords: ['body type calculator', 'somatotype', 'ectomorph', 'mesomorph', 'endomorph'],
    kind: 'config',
    config: {
      fields: [
        { id: 'heightCm', label: 'Height (cm)', type: 'number', defaultValue: 175, suffix: 'cm', min: 100 },
        { id: 'wristCm', label: 'Wrist (cm)', type: 'number', defaultValue: 17, suffix: 'cm', min: 10, max: 30, step: 0.1 },
        { id: 'ankleCm', label: 'Ankle (cm)', type: 'number', defaultValue: 23, suffix: 'cm', min: 15, max: 35, step: 0.1 }
      ],
      results: [
        { label: 'Wrist Ratio', formulaCode: '(wristCm / heightCm) * 100', suffix: '%', accent: true },
        { label: 'Ankle Ratio', formulaCode: '(ankleCm / heightCm) * 100', suffix: '%' }
      ],
      formulaDescription: 'undefined',
      tips: [
        'Measure the wrist just below the wrist bone, and the ankle at its narrowest point, without pulling the tape tight.',
        'Ratios only describe frame size. Muscle, body fat and training history are not part of them.',
        'Most people sit between categories rather than in a tidy one.'
      ],
    },
    content: {
      intro: 'The Body Type Calculator expresses your wrist and ankle circumference as a percentage of your height. Those two ratios are the measurement behind everyday talk of a small, medium or large frame — the frame that somatotype language (ectomorph, mesomorph, endomorph) loosely refers to.',
      howItWorks: 'Each circumference is divided by height in the same unit and multiplied by 100, giving a percentage of height. Wrist and ankle are used because they carry very little fat, so their girth tracks bone and joint size rather than body composition. The two ratios are reported separately rather than collapsed into a score, because a large wrist with narrow ankles is a real pattern and a single averaged number would hide it.',
      example: 'A 175 cm person with a 17 cm wrist and 23 cm ankle: 17 / 175 x 100 = 9.71% and 23 / 175 x 100 = 13.14%. At the same height, a 15.5 cm wrist gives 8.86% and a 19 cm wrist gives 10.86% — the range the terms small and large frame are describing.',
      formulas: [{ label: 'Ratios', expression: 'wrist% = wrist / height x 100; ankle% = ankle / height x 100' }],
      resultExplanations: [
        { resultLabel: 'Wrist Ratio', explanation: 'Wrist circumference as a percentage of height. Roughly 9.5-10.5% is typical for adults; below that reads as a finer frame, above it as a heavier one.' },
        { resultLabel: 'Ankle Ratio', explanation: 'Ankle circumference as a percentage of height. Ankles are wider relative to height than wrists, so this number is normally the larger of the two.' }
      ],
      workflowLinks: [
        { slug: 'body-frame-size-calculator', step: 'Cross-check the frame size with the elbow-breadth method.' },
        { slug: 'body-fat-calculator', step: 'Pair frame size with body composition.' },
        { slug: 'bmi-calculator', step: 'BMI is a weight-for-height measure and ignores frame entirely.' }
      ],
      faqs: [
        { q: 'Does this tell me my somatotype?', a: 'No. Somatotyping is a descriptive system built from overall shape — muscle, fat and skeletal breadth together — and no two circumference measurements can assign it. These ratios describe frame size, which is only one ingredient.' },
        { q: 'What do the percentages mean?', a: 'They put your wrist and ankle in proportion to your height so two people of different heights can be compared. Roughly 9.5-10.5% wrist-to-height covers most adults; the ankle figure is naturally higher because ankles are thicker relative to height.' },
        { q: 'Can I change my body type?', a: 'You cannot change your bone structure, which is what these ratios reflect. You can change muscle and body fat substantially through training and nutrition, which is what most people actually want when they ask about body type.' },
        { q: 'Why measure the wrist and ankle?', a: 'Both are narrow, bony sites with little subcutaneous fat, so the tape measures structure rather than body composition. Waist or upper arm circumference would move with diet and training and hide the frame underneath.' }
      ],
      related: ['body-fat-calculator', 'bmi-calculator', 'body-frame-size-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.65, updatedAt: '2026-11-04' },
  },
  {
    id: 'ideal-body-fat',
    slug: 'ideal-body-fat-calculator',
    name: 'Ideal Body Fat Percentage Calculator',
    shortDesc: 'Find the ideal body fat range for your age and sex.',
    tagline: 'Your target body fat range.',
    category: 'health',
    iconName: 'Activity',
    keywords: ['ideal body fat', 'body fat percentage', 'healthy body fat', 'body fat chart'],
    kind: 'config',
    config: {
      fields: [
        { id: 'sex', label: 'Sex (1=Male, 0=Female)', type: 'number', defaultValue: 1, min: 0, max: 1, step: 1 }
      ],
      results: [
        { label: 'Fitness Range — Low', formulaCode: 'sex === 1 ? 14 : 21', suffix: '%', accent: true },
        { label: 'Fitness Range — High', formulaCode: 'sex === 1 ? 17 : 24', suffix: '%' },
        { label: 'Athlete Range — Low', formulaCode: 'sex === 1 ? 6 : 14', suffix: '%' },
        { label: 'Essential Fat Floor', formulaCode: 'sex === 1 ? 2 : 10', suffix: '%' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Athletes need lower body fat. Average adults are healthy within the fitness range.',
      'Body fat percentage increases naturally with age, even at constant weight.',
      'The categories are the American Council on Exercise bands, which vary by sex rather than by age.'
      ],
    },
    content: {
      intro: 'The Ideal Body Fat Percentage Calculator shows the American Council on Exercise body-fat bands for your sex, including the fitness range, the athlete range and the essential-fat floor below which health is at risk. Body fat percentage is a more informative metric than BMI because it distinguishes fat from muscle — a lean, muscular person and a sedentary person can share a BMI while sitting in completely different categories.',
      howItWorks: 'The bands come from the American Council on Exercise and are set by sex, not by age. For men, athletes sit at 6-13%, fitness at 14-17%, acceptable at 18-24%, and obesity begins at 25%. For women the same categories run 14-20%, 21-24%, 25-31% and 32% and above, because essential fat — the fat needed for hormone production, organ cushioning and temperature regulation — is much higher in women. Essential fat is about 2-5% for men and 10-13% for women, which is why a man at 4% body fat is at the edge of safety while a woman at 4% would be in serious danger. Age does not change the bands, but body fat tends to rise with age at constant weight as muscle mass declines, so the same number means more at 60 than at 25.',
      example: 'A man at 15% body fat is in the 14-17% fitness band, 1 percentage point inside the lower bound and 2 below the upper. A woman at 25% is at the top of the fitness band and about to cross into acceptable. A man at 20% is in the acceptable band, and at 26% he is in the obese band, which starts at 25%. At 8% he would be an athlete, but only 6 points above the essential floor.',
      formulas: [{ label: 'ACE Ranges', expression: 'Ranges by sex: men 6-13-17-24, women 14-20-24-31' }],
      resultExplanations: [
        { resultLabel: 'Fitness Range — Low', explanation: 'The lower bound of the fitness category for your sex.' },
        { resultLabel: 'Fitness Range — High', explanation: 'The upper bound of the fitness category. Above this, the acceptable band begins.' },
        { resultLabel: 'Athlete Range — Low', explanation: 'The lower bound of the athletic band — leaner than most people need for health.' },
        { resultLabel: 'Essential Fat Floor', explanation: 'The approximate minimum body fat compatible with normal hormonal and physiological function.' }
      ],
      workflowLinks: [
        { slug: 'body-fat-calculator', step: 'Measure your actual body fat.' },
        { slug: 'bmi-calculator', step: 'BMI does not distinguish fat from muscle.' },
        { slug: 'lean-body-mass-calculator', step: 'Convert a body fat percentage into lean and fat mass.' }
      ],
      faqs: [
        { q: 'What is a healthy body fat percentage for men?', a: 'Athletes: 6-13%. Fitness: 14-17%. Acceptable: 18-24%. Above 25% is considered obese. These are ACE bands that describe populations, not individual medical thresholds — a lean 22% is not automatically unhealthy.' },
        { q: 'What is a healthy body fat percentage for women?', a: 'Athletes: 14-20%. Fitness: 21-24%. Acceptable: 25-31%. Above 32% is considered obese. The higher figures reflect essential fat, which supports hormone production and reproduction, and which is why very low body fat in women often disrupts the menstrual cycle.' },
        { q: 'Can I get too lean?', a: 'Yes. Essential fat is about 2-5% for men and 10-13% for women, and going below it impairs hormone function, immunity and bone health. Bodybuilders reach those levels briefly for competition and rarely stay there, because the cost is measurable.' },
        { q: 'Why does the calculator not ask my age?', a: 'Because the ACE bands do not vary by age — they are the same thresholds across adulthood. Age still matters in practice, since body fat tends to increase and muscle mass to fall with age at the same body weight, so a 20% reading at 60 represents a different body than 20% at 25.' },
        { q: 'How accurate is a body fat measurement?', a: 'It depends entirely on the method. DEXA is the practical reference standard at around 1-2 percentage points of error; calipers and bioimpedance scales can be off by 5 points or more and shift with hydration. What matters most is using the same method each time and watching the trend.' }
      ],
      related: ['body-fat-calculator', 'bmi-calculator', 'lean-body-mass-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.65, updatedAt: '2026-11-06' },
  },
  {
    id: 'maintain-weight',
    slug: 'maintain-weight-calculator',
    name: 'Weight Maintenance Calories Calculator',
    shortDesc: 'Find the exact calories needed to stay at your current weight.',
    tagline: 'Maintenance is not a guess.',
    category: 'health',
    iconName: 'Scale',
    keywords: ['maintenance calories', 'weight maintenance', 'calories to maintain weight', 'TDEE maintenance'],
    kind: 'config',
    config: {
      fields: [
        { id: 'weightKg', label: 'Weight (kg)', type: 'number', defaultValue: 70, suffix: 'kg', min: 20 },
        { id: 'heightCm', label: 'Height (cm)', type: 'number', defaultValue: 175, suffix: 'cm', min: 100 },
        { id: 'age', label: 'Age', type: 'number', defaultValue: 35, min: 15, max: 100 },
        { id: 'sex', label: 'Sex (1=Male, 0=Female)', type: 'number', defaultValue: 1, min: 0, max: 1, step: 1 },
        { id: 'activityLevel', label: 'Activity (1.2=sedentary, 1.375=light, 1.55=moderate, 1.725=very active, 1.9=extra active)', type: 'number', defaultValue: 1.55, min: 1.2, max: 1.9, step: 0.025 }
      ],
      results: [
        { label: 'Maintenance Calories', formulaCode: 'Math.round((sex === 1 ? (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5 : (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161) * activityLevel)', suffix: 'kcal/day', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Use 1.2 for desk jobs, 1.375 for light activity, 1.55 for moderate, 1.725 for intense.',
      'This is an estimate. Track your weight over 2-3 weeks and adjust by 100-200 kcal.'
      ],
    },
    content: {
      intro: 'The Weight Maintenance Calories Calculator determines the precise number of calories needed to maintain your current weight. It combines your BMR with an activity multiplier to give you your Total Daily Energy Expenditure.',
      howItWorks: 'Calculate your BMR using Mifflin-St Jeor, then multiply by an activity factor. Sedentary: 1.2, Light activity: 1.375, Moderate: 1.55, Very active: 1.725, Extra active: 1.9.',
      example: 'A 70 kg, 175 cm, 35-year-old male who exercises moderately: BMR = 1,658, TDEE = 1,658 x 1.55 = 2,570 kcal/day.',
      formulas: [{ label: 'TDEE', expression: 'TDEE = BMR x Activity Factor' }],
      resultExplanations: [
        { resultLabel: 'Maintenance Calories', explanation: 'Your estimated total daily energy expenditure (TDEE). Eating this amount maintains your current weight.' }
      ],
      workflowLinks: [
        { slug: 'bmr-calculator', step: 'See your BMR before the activity multiplier.' },
        { slug: 'tdee-calculator', step: 'Get a detailed TDEE breakdown.' }
      ],
      faqs: [
        { q: 'How do I find my maintenance calories?', a: 'Calculate your BMR, multiply by your activity factor. Adjust over 2-3 weeks based on weight changes.' },
        { q: 'Does exercise increase maintenance?', a: 'Yes. A very active person burns significantly more than a sedentary person at the same weight.' },
        { q: 'Do maintenance calories change with age?', a: 'Yes. BMR drops about 1-2% per decade after age 25, reducing maintenance calories.' }
      ],
      related: ['bmr-calculator', 'tdee-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75, updatedAt: '2026-08-22' },
  },
  {
    id: 'running-calories',
    slug: 'running-calories-calculator',
    name: 'Running Calorie Calculator',
    shortDesc: 'Estimate calories burned during a run by pace and duration.',
    tagline: 'See what your run costs.',
    category: 'health',
    iconName: 'Flame',
    keywords: ['running calories', 'calories burned running', 'running calorie calculator', 'run calories per mile'],
    kind: 'config',
    config: {
      fields: [
        { id: 'weightKg', label: 'Weight (kg)', type: 'number', defaultValue: 70, suffix: 'kg', min: 20 },
        { id: 'distanceKm', label: 'Distance (km)', type: 'number', defaultValue: 5, suffix: 'km', min: 0.5, step: 0.1 },
        { id: 'durationMin', label: 'Duration (min)', type: 'number', defaultValue: 30, suffix: 'min', min: 1 }
      ],
      results: [
        { label: 'Estimated Calories Burned', formulaCode: 'Math.round(weightKg * distanceKm * 1.0)', suffix: 'kcal', accent: true },
        { label: 'Calories per Minute', formulaCode: '(weightKg * distanceKm) / durationMin', suffix: 'kcal/min' },
        { label: 'Calories per Mile', formulaCode: 'weightKg * 1.609344', suffix: 'kcal' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Running burns roughly 1.0 kcal per kg per kilometer.',
      'Uphill running, wind resistance, and high intensity increase the calorie cost.',
      'The cost per kilometre barely changes with pace — distance, not speed, is the main driver.'
      ],
    },
    content: {
      intro: 'The Running Calorie Calculator estimates the energy a run cost from your body weight and the distance covered, then restates it per minute and per mile. It is deliberately a distance-based estimate: running costs roughly one kilocalorie per kilogram of body weight per kilometre, a figure that stays remarkably stable whether you shuffle or sprint.',
      howItWorks: 'Body weight in kilograms is multiplied by distance in kilometres, because the energy cost of running scales almost linearly with both. That is why pace changes the rate of burn but not the total for a given distance — a faster runner covers the kilometres sooner, so burns the same energy in less time. The per-minute figure divides the total by the duration you entered, which is the rate that matters for comparing against other activities or a workout window. The per-mile figure multiplies weight by 1.609344, the number of kilometres in a mile. The estimate excludes the calories you would have burned at rest, so the net cost of the run is slightly lower than the gross figure — by roughly one kcal per minute of exercise.',
      example: 'A 70 kg runner covering 5 km burns about 70 × 5 = 350 kcal. Over 30 minutes that is 11.7 kcal per minute, and the same runner burns 112.7 kcal per mile. At 90 kg the same 5 km costs 450 kcal, a 29% increase for identical distance — weight is the multiplier, not fitness. Running the 5 km in 20 minutes instead of 30 raises the rate to 17.5 kcal per minute but leaves the total at 350.',
      formulas: [{ label: 'Calories', expression: 'Calories = Weight (kg) × Distance (km) × 1.0' }],
      resultExplanations: [
        { resultLabel: 'Estimated Calories Burned', explanation: 'Estimated energy expenditure for the whole run. Actual values vary with terrain, wind and fitness level.' },
        { resultLabel: 'Calories per Minute', explanation: 'The burn rate for this run, which is what lets you compare it with other activities or fit it into a session.' },
        { resultLabel: 'Calories per Mile', explanation: 'The cost of one mile at your body weight, for runners who think in miles rather than kilometres.' }
      ],
      workflowLinks: [
        { slug: 'running-pace-calculator', step: 'Convert pace and distance into a run estimate.' },
        { slug: 'target-heart-rate-calculator', step: 'Pair with heart-rate data for more accuracy.' },
        { slug: 'calories-burned-calculator', step: 'Compare running with other activities by time.' }
      ],
      faqs: [
        { q: 'Does running burn more calories than walking?', a: 'Per minute, yes — roughly two to three times more, because running is a more demanding gait. Per mile, the gap is much smaller, around 30%, because walking and running both move the same body mass over the same ground. The real advantage of running is that it covers distance faster.' },
        { q: 'How accurate is this estimate?', a: 'Field and laboratory measurements generally agree with the 1 kcal/kg/km rule within about 10-15%. Terrain, wind, surface, gait and fitness all move the real figure, and treadmill running is slightly cheaper than outdoor running because there is no air resistance to overcome.' },
        { q: 'Do heavier people burn more calories running?', a: 'Yes, almost proportionally. Running requires moving your whole body, so at the same pace and distance a 90 kg runner burns about 30% more than a 70 kg runner. This is also why calorie estimates from watches, which often ignore weight, can be badly wrong.' },
        { q: 'Why does pace not change the total much?', a: 'Because the dominant cost is supporting and propelling body mass over distance, not the speed itself. Faster running costs more per minute but takes fewer minutes, and the two effects largely cancel. Very steep hills are the main exception — climbing adds real work against gravity.' },
        { q: 'Should I eat back the calories I burned?', a: 'Usually not deliberately, unless you are training at high volume or trying to gain weight. The figure is an estimate, and adding it back on top of an activity multiplier in a TDEE calculation double-counts the same exercise — the most common reason a weight-loss plan stalls.' }
      ],
      related: ['running-pace-calculator', 'calories-burned-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-11-06' },
  },
  {
    id: 'due-date',
    slug: 'due-date-calculator',
    name: 'Pregnancy Due Date Calculator',
    shortDesc: 'Estimate your due date from your last period or conception date, with gestational age and trimester.',
    tagline: 'Naegele-adjusted due date, gestational age, and days to go.',
    category: 'health',
    iconName: 'CalendarDays',
    badge: 'Pregnancy',
    featured: true,
    keywords: [
      'pregnancy due date calculator',
      'due date calculator',
      'edd calculator',
      'estimated due date',
      'pregnancy calculator',
      'naegele rule',
      'how many weeks pregnant',
    ],
    kind: 'custom',
    componentId: 'DueDateCalculator',
    content: {
      intro:
        'The Pregnancy Due Date Calculator estimates when your baby is due from the first day of your last menstrual period (LMP) or a known conception date. It applies Naegele\'s rule, adjusts for cycles that are not 28 days long, and reports gestational age, trimester, and the days remaining.',
      howItWorks:
        'An LMP-based estimate adds 280 days (40 weeks) to the first day of your last period, then shifts by the difference between your average cycle length and 28 days because a longer cycle ovulates later. A known conception date adds 266 days (38 weeks). Gestational age is counted from the LMP rather than conception, which is why you are considered about two weeks pregnant on the day of conception.',
      example:
        'An LMP of 1 January 2026 with a 28-day cycle gives an estimated due date of 8 October 2026. On 9 April 2026 that is 14 weeks 0 days, in the second trimester, with 182 days remaining. The same LMP with a 35-day cycle moves the estimate to 15 October 2026.',
      formulas: [
        {
          label: 'Naegele\'s rule (LMP)',
          expression: 'Due date = LMP + 280 days + (cycle length − 28)',
          note: '280 days is 40 weeks from the first day of the last period.',
        },
        {
          label: 'Known conception date',
          expression: 'Due date = Conception + 266 days',
          note: '266 days is 38 weeks, because gestational age includes the two weeks before conception.',
        },
        {
          label: 'Gestational age',
          expression: 'Weeks = floor((today − LMP) / 7), days = (today − LMP) mod 7',
        },
      ],
      sources: [
        {
          label: 'ACOG Committee Opinion 700 — Methods for Estimating the Due Date',
          expression: '280 days from LMP; 266 days from conception',
          note: 'ACOG notes that an ultrasound before 14 weeks is the most accurate dating method and that the estimated due date should be revised when scan dating differs materially.',
        },
        {
          label: 'NICE NG201 — Antenatal care',
          expression: 'Dating scan offered at 11–14 weeks',
          note: 'UK guidance uses the dating scan to confirm gestational age and the estimated due date.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Estimated due date',
          explanation:
            'The 40-week date calculated from your LMP or conception date. It is a midpoint, not an appointment: only about 4% of babies arrive on it.',
        },
        {
          resultLabel: 'Gestational age',
          explanation:
            'Weeks and days since the first day of your last period — the convention used in antenatal care, scans, and test windows.',
        },
        {
          resultLabel: 'Estimated conception',
          explanation:
            'The date of fertilisation implied by your dates, roughly two weeks after the LMP in a 28-day cycle.',
        },
      ],
      workflowLinks: [
        { slug: 'ovulation-calculator', step: 'See the fertile window that led to conception.' },
        { slug: 'conception-calculator', step: 'Work backwards from a due date to a conception date.' },
      ],
      faqs: [
        {
          q: 'How accurate is an estimated due date?',
          a: 'Only about 4% of births happen on the estimated date. Most arrive within two weeks either side, and first pregnancies often run a little later. An early ultrasound is more accurate than calendar dating, especially with irregular cycles.',
        },
        {
          q: 'Why does cycle length change the due date?',
          a: 'Naegele\'s rule assumes ovulation on day 14 of a 28-day cycle. If your cycles average 35 days, ovulation is about a week later, so the due date moves about a week later as well.',
        },
        {
          q: 'What if my ultrasound gives a different date?',
          a: 'Clinicians usually keep the scan date when it differs materially from the calendar estimate, particularly before 14 weeks. Ask your midwife or doctor which date they will use for your care.',
        },
        {
          q: 'Can I calculate a due date without knowing my last period?',
          a: 'Yes. If you know your conception or ovulation date, use the conception method, which adds 266 days. If you know neither, a dating scan is the reliable route.',
        },
      ],
      related: ['ovulation-calculator', 'conception-calculator', 'date-difference-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-10-26' },
  },
  {
    id: 'ovulation',
    slug: 'ovulation-calculator',
    name: 'Ovulation & Fertile Window Calculator',
    shortDesc: 'Predict ovulation, your six-day fertile window, and the next three cycles from your last period.',
    tagline: 'Find your most fertile days and next period dates.',
    category: 'health',
    iconName: 'Heart',
    badge: 'Fertility',
    featured: true,
    keywords: [
      'ovulation calculator',
      'fertile window calculator',
      'ovulation date',
      'fertile days',
      'when do i ovulate',
      'ovulation predictor',
      'cycle calculator',
    ],
    kind: 'custom',
    componentId: 'OvulationCalculator',
    content: {
      intro:
        'The Ovulation Calculator predicts when you are most likely to ovulate and the six-day window in which conception is possible. It works from the first day of your last period, your average cycle length, and your luteal phase, and it projects the next three cycles.',
      howItWorks:
        'Ovulation is estimated by counting backwards from the next expected period: ovulation day equals cycle length minus luteal phase length. In a 28-day cycle with a 14-day luteal phase, that is day 15 by obstetric counting (14 days after the first day of bleeding). The fertile window opens five days before ovulation, because sperm can survive that long, and closes about a day after it, because the egg is viable for roughly 12–24 hours.',
      example:
        'With a last period starting on 1 May 2026, a 28-day cycle, and a 14-day luteal phase, ovulation is predicted for 15 May 2026. The fertile window runs 10–16 May, the next period is due 29 May, and the following cycle ovulates around 12 June.',
      formulas: [
        {
          label: 'Ovulation day',
          expression: 'Ovulation = LMP + (cycle length − luteal phase)',
          note: 'The luteal phase is usually 12–16 days and is more stable than the follicular phase.',
        },
        {
          label: 'Fertile window',
          expression: 'Window = ovulation − 5 days to ovulation + 1 day',
        },
        {
          label: 'Next period',
          expression: 'Next period = LMP + cycle length',
        },
      ],
      sources: [
        {
          label: 'ACOG — Fertility awareness and ovulation timing',
          expression: 'Sperm survive up to 5 days; the egg is viable 12–24 hours',
          note: 'ACOG patient education describes the fertile window as the five days before ovulation plus ovulation day.',
        },
        {
          label: 'NICE NG201 — Antenatal care',
          expression: 'Gestational age is counted from the LMP',
          note: 'The same LMP convention is used here so the cycle dates line up with antenatal dating.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Ovulation date',
          explanation:
            'The single most likely day of ovulation. Real ovulation can move by a few days from cycle to cycle, even when your cycles are regular.',
        },
        {
          resultLabel: 'Fertile window',
          explanation:
            'The days on which intercourse can lead to conception: five days before ovulation through about one day after.',
        },
        {
          resultLabel: 'Peak fertility',
          explanation:
            'The two days with the highest probability — the day before ovulation and ovulation day itself.',
        },
      ],
      workflowLinks: [
        { slug: 'due-date-calculator', step: 'If conception happens, estimate the due date.' },
        { slug: 'conception-calculator', step: 'Reverse the maths from a known due date.' },
      ],
      faqs: [
        {
          q: 'How accurate is an ovulation calculator?',
          a: 'For regular cycles it is typically accurate to within a few days, which is enough to time the fertile window. Irregular cycles, PCOS, thyroid conditions, and recent hormonal contraception make calendar predictions unreliable — ovulation predictor kits, basal body temperature, or cervical mucus tracking are better then.',
        },
        {
          q: 'Does everyone ovulate on day 14?',
          a: 'No. Day 14 is the midpoint of an idealised 28-day cycle. Ovulation timing varies with cycle length and can shift between cycles, which is why the luteal phase is used to work backwards from the next period.',
        },
        {
          q: 'When is the best time to try to conceive?',
          a: 'The two days before ovulation and ovulation day carry the highest chance. Intercourse every one to two days across the fertile window covers the peak without relying on a single predicted date.',
        },
        {
          q: 'Can I use this calculator to avoid pregnancy?',
          a: 'No. Calendar methods are not reliable contraception, because ovulation can occur earlier or later than predicted and sperm survive for days. Use a method recommended by a clinician.',
        },
      ],
      related: ['due-date-calculator', 'conception-calculator', 'date-difference-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-10-26' },
  },
  {
    id: 'conception',
    slug: 'conception-calculator',
    name: 'Conception Date Calculator',
    shortDesc: 'Work backwards from a due date or last period to the most likely conception date and intercourse window.',
    tagline: 'Find the conception date behind a due date.',
    category: 'health',
    iconName: 'HeartPulse',
    badge: 'Pregnancy',
    keywords: [
      'conception calculator',
      'conception date calculator',
      'when did i conceive',
      'date of conception',
      'conception date from due date',
      'calculate conception',
    ],
    kind: 'custom',
    componentId: 'ConceptionCalculator',
    content: {
      intro:
        'The Conception Date Calculator estimates the date of fertilisation from either an estimated due date or the first day of your last period. It also shows the intercourse window that could have led to conception, plus the implied last period and due date.',
      howItWorks:
        'A pregnancy is dated from the last menstrual period, about two weeks before conception. Working backwards, conception is roughly 266 days before the due date, or 14 days after the LMP in a 28-day cycle. Because sperm survive up to five days, the calculator also reports a window from five days before that date to one day after.',
      example:
        'For a due date of 8 October 2026, the estimated conception date is 15 January 2026, the likely intercourse window is 10–16 January, and the implied last period is 1 January 2026. With a 30-day cycle starting 1 May 2026, conception is estimated at 17 May 2026.',
      formulas: [
        {
          label: 'From the due date',
          expression: 'Conception = Due date − 266 days',
        },
        {
          label: 'From the last period',
          expression: 'Conception = LMP + (cycle length − 14)',
          note: 'Assumes a 14-day luteal phase; adjust the cycle length rather than the luteal phase.',
        },
        {
          label: 'Likely intercourse window',
          expression: 'Window = conception − 5 days to conception + 1 day',
        },
      ],
      sources: [
        {
          label: 'ACOG Committee Opinion 700 — Methods for Estimating the Due Date',
          expression: '266 days from conception to due date',
          note: 'The 280-day LMP rule and the 266-day conception rule describe the same 40-week pregnancy.',
        },
        {
          label: 'NICE NG201 — Antenatal care',
          expression: 'Dating scan at 11–14 weeks',
          note: 'Scan dating takes precedence when it differs from calendar estimates.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Conception date',
          explanation:
            'The estimated day of fertilisation. It is a statistical midpoint: ovulation, and therefore conception, can occur several days away from it.',
        },
        {
          resultLabel: 'Likely intercourse window',
          explanation:
            'The days on which intercourse could plausibly have led to this pregnancy, allowing for sperm survival and egg viability.',
        },
        {
          resultLabel: 'Estimated last period',
          explanation:
            'The LMP implied by the dates, useful when you are asked for it at a first antenatal appointment.',
        },
      ],
      workflowLinks: [
        { slug: 'due-date-calculator', step: 'Calculate forward from an LMP or conception date.' },
        { slug: 'ovulation-calculator', step: 'See the fertile window around a conception date.' },
      ],
      faqs: [
        {
          q: 'How is the conception date calculated?',
          a: 'Subtract 266 days from the estimated due date, or add 14 days to the first day of the last period in a 28-day cycle. The result is an estimate of fertilisation, not a precise timestamp.',
        },
        {
          q: 'How precise is a conception date?',
          a: 'It is typically accurate to within about a week, and less so with irregular cycles. Ultrasound dating, which measures the embryo directly, is more precise than any calendar calculation.',
        },
        {
          q: 'Is the conception date the same as the ovulation date?',
          a: 'Very close. Fertilisation happens within roughly 24 hours of ovulation, so the two dates are usually the same or one day apart.',
        },
        {
          q: 'Can this calculator establish paternity?',
          a: 'No. It only estimates dates. Paternity is established by DNA testing, not by calendar arithmetic.',
        },
      ],
      related: ['due-date-calculator', 'ovulation-calculator', 'date-difference-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-10-26' },
  },
  {
    id: 'pregnancy-week',
    slug: 'pregnancy-week-calculator',
    name: 'Pregnancy Week Calculator',
    shortDesc: 'See how many weeks and days pregnant you are, the trimester, fetal age, and your next antenatal milestone.',
    tagline: 'Your current week, trimester, and weeks to go.',
    category: 'health',
    iconName: 'CalendarDays',
    badge: 'Pregnancy',
    featured: true,
    keywords: [
      'pregnancy week calculator',
      'how many weeks pregnant am i',
      'pregnancy weeks calculator',
      'gestational age calculator',
      'what week of pregnancy am i',
      'fetal age calculator',
    ],
    kind: 'custom',
    componentId: 'PregnancyWeekCalculator',
    content: {
      intro:
        'The Pregnancy Week Calculator tells you how many weeks and days pregnant you are on any date, counted from the first day of your last period. It also shows the trimester, fetal age, the estimated due date, and weeks remaining.',
      howItWorks:
        'Obstetric dating counts from the first day of the last menstrual period, not from conception. Gestational age is the number of days since that date divided into weeks and days. Fetal age is about two weeks less, because ovulation happens roughly two weeks into the cycle. With a known conception date, the calculator converts it to the equivalent LMP before counting.',
      example:
        'If your last period began on 1 January 2026, then on 11 April 2026 you are 100 days pregnant — 14 weeks and 2 days. Fetal age is 12 weeks 2 days, the estimated due date is 8 October 2026, and about 26 weeks remain.',
      formulas: [
        {
          label: 'Gestational age',
          expression: 'Weeks = floor((today − LMP) / 7); Days = (today − LMP) mod 7',
        },
        {
          label: 'Fetal age',
          expression: 'Fetal age ≈ gestational age − 14 days',
          note: 'Approximate because it assumes ovulation on cycle day 14.',
        },
        {
          label: 'Weeks remaining',
          expression: 'Weeks to go = ceil((due date − today) / 7)',
        },
      ],
      sources: [
        {
          label: 'ACOG Committee Opinion 700 — Methods for Estimating the Due Date',
          expression: 'Gestational age is counted from the LMP',
          note: 'ACOG recommends revising the estimated due date when an early ultrasound differs materially from calendar dating.',
        },
        {
          label: 'NICE NG201 — Antenatal care',
          expression: 'Dating scan at 11–14 weeks; anomaly scan at 18–22 weeks',
          note: 'The milestone labels in this tool reflect the usual UK antenatal schedule, not an appointment booking.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Week and days',
          explanation:
            'Your gestational age in the format used by midwives and scan reports. \u201CWeek 14 + 2\u201D means 14 completed weeks and 2 days.',
        },
        {
          resultLabel: 'Fetal age',
          explanation:
            'Time since fertilisation, about two weeks less than gestational age. It is useful for reading development information, which often uses fetal age.',
        },
        {
          resultLabel: 'Next milestone',
          explanation:
            'The next standard antenatal window or trimester boundary. It is a planning marker, not a substitute for the schedule your own clinician gives you.',
        },
      ],
      workflowLinks: [
        { slug: 'due-date-calculator', step: 'Recalculate the due date from an LMP or conception date.' },
        { slug: 'conception-calculator', step: 'Work backwards to the likely conception date.' },
        { slug: 'ovulation-calculator', step: 'See the fertile window for a future cycle.' },
      ],
      faqs: [
        {
          q: 'How do I calculate how many weeks pregnant I am?',
          a: 'Count the days from the first day of your last period to today, then divide by seven. The whole number is your completed weeks and the remainder is the extra days. This calculator does that and also handles a known conception date.',
        },
        {
          q: 'Why is fetal age two weeks less than gestational age?',
          a: 'Pregnancy is dated from the last period, but fertilisation happens about two weeks later. So at 14 weeks gestational age, the embryo or fetus has been developing for roughly 12 weeks. The two-week gap is a convention, not a discrepancy.',
        },
        {
          q: 'What if my scan gives a different gestational age?',
          a: 'An early ultrasound is more accurate than calendar dating, especially with irregular cycles. Clinicians usually revise the due date when the scan differs materially before 14 weeks, so use the scan-derived date for appointments.',
        },
        {
          q: 'Does this calculator tell me if everything is progressing normally?',
          a: 'No. It only does calendar arithmetic. It cannot assess growth, position, or wellbeing. Any concern about movement, pain, bleeding, or growth should go to your midwife or doctor the same day.',
        },
      ],
      related: ['due-date-calculator', 'conception-calculator', 'ovulation-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-10-26' },
  },
  {
    id: 'ldl-cholesterol',
    slug: 'ldl-cholesterol-calculator',
    name: 'LDL Cholesterol Calculator',
    shortDesc: 'Estimate LDL cholesterol with the Friedewald equation and see non-HDL and cholesterol ratios.',
    tagline: 'Estimate the LDL from a standard lipid panel.',
    category: 'health',
    iconName: 'HeartPulse',
    badge: 'Lipids',
    featured: false,
    keywords: [
      'ldl cholesterol calculator',
      'friedewald equation calculator',
      'how to calculate ldl',
      'ldl from total cholesterol',
      'non hdl cholesterol calculator',
      'cholesterol ratio calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'totalCholesterol', label: 'Total cholesterol', type: 'number', defaultValue: 200, min: 50, max: 500, suffix: 'mg/dL' },
        { id: 'hdl', label: 'HDL cholesterol', type: 'number', defaultValue: 50, min: 5, max: 150, suffix: 'mg/dL' },
        { id: 'triglycerides', label: 'Triglycerides', type: 'number', defaultValue: 150, min: 10, max: 1000, suffix: 'mg/dL' },
      ],
      results: [
        {
          label: 'Estimated LDL cholesterol',
          formulaCode: 'totalCholesterol - hdl - triglycerides / 5',
          suffix: 'mg/dL',
          accent: true,
        },
        { label: 'Non-HDL cholesterol', formulaCode: 'totalCholesterol - hdl', suffix: 'mg/dL' },
        { label: 'Total cholesterol to HDL ratio', formulaCode: 'totalCholesterol / hdl' },
        { label: 'Triglyceride to HDL ratio', formulaCode: 'triglycerides / hdl' },
      ],
      formulaDescription:
        'Friedewald LDL = total cholesterol - HDL - triglycerides / 5, all in mg/dL.',
      tips: [
        'The Friedewald equation is unreliable when triglycerides are 400 mg/dL or higher or when LDL is very low. Laboratories may use a direct assay or the Martin-Hopkins equation instead.',
        'Non-HDL cholesterol is total cholesterol minus HDL. It captures all the atherogenic particles and does not need a triglyceride assumption.',
        'These are arithmetic estimates from a lipid panel, not a risk assessment. Cardiovascular risk also depends on age, blood pressure, diabetes, smoking, and prior events.',
      ],
    },
    content: {
      intro:
        'The LDL Cholesterol Calculator estimates LDL cholesterol from total cholesterol, HDL cholesterol, and triglycerides using the Friedewald equation. It also reports non-HDL cholesterol and two common ratios, with the limits of the estimate stated plainly.',
      howItWorks:
        'The Friedewald equation treats VLDL cholesterol as triglycerides divided by 5, then subtracts VLDL and HDL from total cholesterol. The result is an LDL estimate in mg/dL. Non-HDL is total minus HDL. The total-to-HDL ratio divides total cholesterol by HDL, and the triglyceride-to-HDL ratio divides triglycerides by HDL. All inputs must be in mg/dL.',
      example:
        'Total cholesterol 200, HDL 50, and triglycerides 150 give an estimated LDL of 200 - 50 - 30 = 120 mg/dL. Non-HDL is 150 mg/dL, the total-to-HDL ratio is 4.0, and the triglyceride-to-HDL ratio is 3.0.',
      formulas: [
        { label: 'Friedewald LDL', expression: 'total cholesterol - HDL - triglycerides / 5' },
        { label: 'Non-HDL cholesterol', expression: 'total cholesterol - HDL' },
        { label: 'Total to HDL ratio', expression: 'total cholesterol / HDL' },
        { label: 'Triglyceride to HDL ratio', expression: 'triglycerides / HDL' },
      ],
      sources: [
        {
          label: 'National Cholesterol Education Program - ATP III Guidelines',
          expression: 'Friedewald equation and lipid targets',
          note: 'The source of the widely used LDL estimate and the lipid categories it was built around.',
        },
        {
          label: 'American Heart Association - Cholesterol and lipid testing',
          expression: 'Lipid panel interpretation',
          note: 'Patient-facing guidance on cholesterol numbers and the need for clinician risk assessment.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Estimated LDL cholesterol',
          explanation:
            'A calculated value, not a direct measurement. It is the number most lipid panels report when triglycerides are in the valid range.',
        },
        {
          resultLabel: 'Non-HDL cholesterol',
          explanation:
            'Total cholesterol minus HDL, representing cholesterol carried by LDL, VLDL, and other atherogenic particles. It remains meaningful when triglycerides are high.',
        },
        {
          resultLabel: 'Triglyceride to HDL ratio',
          explanation:
            'A simple marker associated with insulin resistance and metabolic risk. It is not a diagnosis and should be interpreted with the rest of the panel.',
        },
      ],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'Check whether weight is a modifiable risk factor.' },
        { slug: 'blood-pressure-calculator', step: 'Add blood pressure to the cardiovascular picture.' },
        { slug: 'a1c-calculator', step: 'Review long-term glucose alongside the lipid panel.' },
      ],
      faqs: [
        {
          q: 'What is the Friedewald equation?',
          a: 'LDL = total cholesterol - HDL - triglycerides / 5, with all values in mg/dL. It estimates VLDL cholesterol from triglycerides and subtracts it. The equation is inexpensive and widely used, but it becomes unreliable at high triglycerides and very low LDL.',
        },
        {
          q: 'When is the LDL estimate unreliable?',
          a: 'At triglycerides of 400 mg/dL or more, the VLDL estimate is poor and many laboratories will not report a Friedewald LDL. Very low LDL values, certain genetic lipid disorders, and non-fasting samples can also distort it. A direct LDL assay is more reliable in those cases.',
        },
        {
          q: 'What is non-HDL cholesterol and why does it matter?',
          a: 'It is total cholesterol minus HDL, so it includes LDL, VLDL, and remnant cholesterol. It does not depend on the triglyceride assumption and is a useful secondary target, especially when triglycerides are elevated. Many guidelines treat it as a co-primary target.',
        },
        {
          q: 'Do I need to fast for a lipid panel?',
          a: 'Not always. Many guidelines allow non-fasting lipid testing for most people, but triglycerides rise after a meal and the Friedewald estimate is sensitive to them. Follow the instructions from the laboratory and clinician ordering the test.',
        },
        {
          q: 'Can this calculator tell me my heart disease risk?',
          a: 'No. It only does the lipid arithmetic. A risk estimate needs age, sex, blood pressure, diabetes status, smoking, cholesterol values, and sometimes additional markers. Use a validated risk tool with a clinician rather than a single number.',
        },
      ],
      related: ['bmi-calculator', 'blood-pressure-calculator', 'a1c-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.84, updatedAt: '2026-10-26' },
  },
  {
    id: 'mean-arterial-pressure',
    slug: 'mean-arterial-pressure-calculator',
    name: 'Mean Arterial Pressure Calculator',
    shortDesc: 'Calculate mean arterial pressure and pulse pressure from systolic and diastolic readings.',
    tagline: 'The average pressure driving perfusion.',
    category: 'health',
    iconName: 'Activity',
    badge: 'Vitals',
    featured: false,
    keywords: [
      'mean arterial pressure calculator',
      'map calculator',
      'how to calculate map',
      'pulse pressure calculator',
      'blood pressure map',
      'map formula',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'systolic', label: 'Systolic pressure', type: 'number', defaultValue: 120, min: 40, max: 300, suffix: 'mmHg' },
        { id: 'diastolic', label: 'Diastolic pressure', type: 'number', defaultValue: 80, min: 20, max: 200, suffix: 'mmHg' },
      ],
      results: [
        {
          label: 'Mean arterial pressure',
          formulaCode: 'diastolic + (systolic - diastolic) / 3',
          suffix: 'mmHg',
          accent: true,
        },
        { label: 'Pulse pressure', formulaCode: 'systolic - diastolic', suffix: 'mmHg' },
        { label: 'Diastolic share of MAP', formulaCode: 'diastolic / (diastolic + (systolic - diastolic) / 3) * 100', suffix: '%' },
      ],
      formulaDescription: 'MAP = diastolic + (systolic - diastolic) / 3.',
      tips: [
        'The one-third formula assumes a normal heart rate and waveform. At very high or low heart rates, the true mean pressure can differ.',
        'A MAP of at least 65 mmHg is a common resuscitation target in sepsis, but targets are individualised by the clinical team.',
        'Pulse pressure is systolic minus diastolic. A widening pulse pressure can reflect arterial stiffness and is worth discussing with a clinician.',
      ],
    },
    content: {
      intro:
        'The Mean Arterial Pressure Calculator converts a systolic and diastolic reading into mean arterial pressure and pulse pressure. MAP approximates the average pressure in the arteries during one cardiac cycle and is used in critical care to judge organ perfusion.',
      howItWorks:
        'MAP is estimated as diastolic pressure plus one third of the difference between systolic and diastolic. The weighting reflects the fact that the heart spends about twice as long in diastole as in systole at a normal rate. Pulse pressure is the simple systolic minus diastolic difference, and the diastolic share shows how much of the mean comes from the resting phase.',
      example:
        'A reading of 120 over 80 gives a pulse pressure of 40 and a MAP of 80 + 40/3 = 93.3 mmHg. The diastolic share is 80 / 93.3 = 85.7 percent.',
      formulas: [
        { label: 'Mean arterial pressure', expression: 'diastolic + (systolic - diastolic) / 3' },
        { label: 'Pulse pressure', expression: 'systolic - diastolic' },
        { label: 'Diastolic share', expression: 'diastolic / MAP' },
      ],
      sources: [
        {
          label: 'American Heart Association - Blood pressure measurement',
          expression: 'Systolic and diastolic pressure',
          note: 'Guidance on measuring blood pressure accurately and interpreting the two numbers.',
        },
        {
          label: 'Surviving Sepsis Campaign - Hemodynamic Support',
          expression: 'MAP target in septic shock',
          note: 'Recommends an initial MAP target of 65 mmHg, individualised to the patient.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Mean arterial pressure',
          explanation:
            'An estimate of average arterial pressure. It is not a replacement for a monitored arterial line in unstable patients.',
        },
        {
          resultLabel: 'Pulse pressure',
          explanation:
            'The gap between systolic and diastolic. It reflects stroke volume and arterial compliance and changes with age and disease.',
        },
        {
          resultLabel: 'Diastolic share of MAP',
          explanation:
            'How much of the mean comes from diastole. It is a quick check that the one-third approximation is behaving as expected.',
        },
      ],
      workflowLinks: [
        { slug: 'blood-pressure-calculator', step: 'Classify the reading against standard categories.' },
        { slug: 'target-heart-rate-calculator', step: 'Plan aerobic training zones with a safer cardiovascular picture.' },
        { slug: 'waist-to-height-ratio-calculator', step: 'Add a central adiposity measure to the risk picture.' },
      ],
      faqs: [
        {
          q: 'What is a normal mean arterial pressure?',
          a: 'A resting MAP is commonly around 70-100 mmHg, but the normal range depends on age, activity, and clinical context. In critical care, 65 mmHg is a common lower target for organ perfusion. A single number does not define health or illness.',
        },
        {
          q: 'Why is diastolic weighted more than systolic?',
          a: 'The cardiac cycle spends roughly twice as long in diastole as in systole at a normal heart rate, so the mean is closer to diastolic. The one-third formula is an approximation; at fast or irregular heart rates the true mean can differ.',
        },
        {
          q: 'Is MAP the same as blood pressure?',
          a: 'No. Blood pressure is reported as two numbers, systolic and diastolic. MAP collapses them into an average pressure over the cycle. It is useful for perfusion assessment but does not replace either number or a full clinical evaluation.',
        },
        {
          q: 'What does a wide pulse pressure mean?',
          a: 'A wide gap can reflect arterial stiffness, a high stroke volume, or conditions such as aortic regurgitation. It is not diagnostic on its own. Age, medications, and other findings matter, so discuss a persistent change with a clinician.',
        },
        {
          q: 'Can I use this for exercise or altitude planning?',
          a: 'It is arithmetic, not a fitness or altitude model. Exercise and altitude change cardiac output and vascular resistance in ways the formula does not capture. Use it to understand a reading, not to set a training or acclimatisation target.',
        },
      ],
      related: ['blood-pressure-calculator', 'target-heart-rate-calculator', 'waist-to-height-ratio-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-10-26' },
  },
  {
    id: 'pack-years',
    slug: 'pack-years-calculator',
    name: 'Pack Years Calculator',
    shortDesc: 'Convert cigarettes per day and years smoked into pack-years and total cigarettes.',
    tagline: 'The smoking history number clinicians ask for.',
    category: 'health',
    iconName: 'Flame',
    badge: 'Respiratory',
    featured: false,
    keywords: [
      'pack years calculator',
      'pack year smoking calculator',
      'how to calculate pack years',
      'smoking history calculator',
      'lung cancer screening pack years',
      'cigarette pack years',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'cigarettesPerDay', label: 'Cigarettes per day', type: 'number', defaultValue: 20, min: 0, max: 100, step: 1 },
        { id: 'yearsSmoked', label: 'Years smoked', type: 'number', defaultValue: 30, min: 0, max: 100, step: 0.5 },
      ],
      results: [
        {
          label: 'Pack-years',
          formulaCode: 'cigarettesPerDay / 20 * yearsSmoked',
          accent: true,
        },
        {
          label: 'Total cigarettes',
          formulaCode: 'cigarettesPerDay * 365 * yearsSmoked',
        },
        {
          label: 'Packs per year',
          formulaCode: 'cigarettesPerDay / 20 * 365',
        },
        {
          label: 'Cigarettes per year',
          formulaCode: 'cigarettesPerDay * 365',
        },
      ],
      formulaDescription:
        'Pack-years = (cigarettes per day / 20) x years smoked.',
      tips: [
        'A standard pack is 20 cigarettes. If you smoked 10 a day for 20 years, that is 10 pack-years, the same as 20 a day for 10 years.',
        'For a history with different intensities, calculate each period separately and add the pack-years.',
        'Pack-years summarise dose, not risk on their own. Current smoking, age, and other exposures still matter for screening and clinical decisions.',
      ],
    },
    content: {
      intro:
        'The Pack Years Calculator converts cigarettes per day and years smoked into pack-years, the standard summary of cumulative smoking exposure. It also reports total cigarettes and packs per year so the history is easy to check.',
      howItWorks:
        'One pack is 20 cigarettes, so cigarettes per day divided by 20 gives packs per day. Multiplying by years smoked gives pack-years. For example, 20 a day for 30 years is one pack a day for 30 years, or 30 pack-years. Total cigarettes multiplies daily use by 365 and then by years.',
      example:
        'Smoking 20 cigarettes a day for 30 years is 1 pack per day x 30 years = 30 pack-years. That is 7,300 cigarettes a year and 219,000 cigarettes in total.',
      formulas: [
        { label: 'Packs per day', expression: 'cigarettes per day / 20' },
        { label: 'Pack-years', expression: 'packs per day x years smoked' },
        { label: 'Total cigarettes', expression: 'cigarettes per day x 365 x years smoked' },
      ],
      sources: [
        {
          label: 'US Preventive Services Task Force - Lung Cancer Screening Recommendation',
          expression: 'Pack-year eligibility criteria',
          note: 'The 2021 recommendation uses a 20 pack-year history, age 50-80, and current smoking or quitting within 15 years.',
        },
        {
          label: 'US CDC - Smoking and Tobacco Use',
          expression: 'Health effects of cigarette smoking',
          note: 'Background on cumulative exposure and cessation benefits.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Pack-years',
          explanation:
            'Cumulative exposure in pack-years. It combines intensity and duration into one number but does not capture every pattern of smoking.',
        },
        {
          resultLabel: 'Total cigarettes',
          explanation:
            'An arithmetic total based on daily use and years. It is an estimate, because daily consumption and quit periods vary.',
        },
        {
          resultLabel: 'Packs per year',
          explanation:
            'How many packs the daily habit amounts to over a year. Useful for comparing the cost of smoking with cessation support.',
        },
      ],
      workflowLinks: [
        { slug: 'alcohol-units-calculator', step: 'Review another common cumulative exposure.' },
        { slug: 'bmi-calculator', step: 'Add body mass index to the health picture.' },
        { slug: 'blood-pressure-calculator', step: 'Check blood pressure, another cardiovascular risk factor.' },
      ],
      faqs: [
        {
          q: 'How do I calculate pack-years if I smoked different amounts?',
          a: 'Split the history into periods with a steady amount. For each period, divide cigarettes per day by 20 and multiply by the years in that period, then add the results. For example, 10 a day for 10 years plus 20 a day for 10 years is 5 + 10 = 15 pack-years.',
        },
        {
          q: 'Is one pack a day for 20 years the same as two packs a day for 10 years?',
          a: 'Both are 20 pack-years, but the exposure pattern is different. Pack-years is a useful summary for eligibility and risk conversations, not a perfect biological dose. Tell your clinician about the pattern as well as the total.',
        },
        {
          q: 'Does quitting reset pack-years?',
          a: 'No. Pack-years records past exposure and does not go down after quitting. The risk of many smoking-related diseases falls after cessation, but the cumulative history remains relevant to screening eligibility and clinical assessment.',
        },
        {
          q: 'Do cigars, pipes, or vaping count?',
          a: 'Pack-years is defined for cigarettes. Cigar and pipe exposure is usually recorded differently, and vaping has no established pack-year equivalent. Do not convert them silently; describe the actual product and amount to a clinician.',
        },
        {
          q: 'Should I be screened for lung cancer?',
          a: 'Screening eligibility depends on age, pack-years, current smoking status, and years since quitting, along with other risk factors. The USPSTF recommends annual low-dose CT screening for adults aged 50-80 with at least 20 pack-years who currently smoke or quit within 15 years. Discuss the decision with a clinician.',
        },
      ],
      related: ['alcohol-units-calculator', 'bmi-calculator', 'blood-pressure-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.82, updatedAt: '2026-10-26' },
  }
];
