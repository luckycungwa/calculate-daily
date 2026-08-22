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
        { id: 'age', label: 'Age', type: 'number', defaultValue: 30, min: 15, suffix: 'yrs' },
        { id: 'restingHR', label: 'Resting Heart Rate', type: 'number', defaultValue: 65, min: 30, suffix: 'bpm' },
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
      intro: 'The TDEE Calculator determines your Total Daily Energy Expenditure using the Mifflin-St Jeor equation. It shows your BMR, maintenance calories, and calorie targets for cutting or bulking.',
      howItWorks: 'BMR for men: 10 x weight(kg) + 6.25 x height(cm) - 5 x age - 5. For women: same formula minus 161 instead of 5. BMR is multiplied by an activity factor (1.2 to 1.9) to get TDEE.',
      example: 'A 30-year-old male, 80kg, 178cm, moderate activity: BMR = 10x80 + 6.25x178 - 5x30 + 5 = 1,792. TDEE = 1,792 x 1.55 = 2,778 cal/day.',
      formulas: [
        { label: 'BMR (Male)', expression: 'BMR = 10 x weight + 6.25 x height - 5 x age + 5' },
        { label: 'TDEE', expression: 'TDEE = BMR x Activity Multiplier' },
      ],
      resultExplanations: [
        { resultLabel: 'BMR', explanation: 'Calories your body burns at complete rest for basic functions.' },
        { resultLabel: 'TDEE', explanation: 'Total daily calorie burn including all activity. This is your maintenance level.' },
        { resultLabel: 'Calorie Targets', explanation: 'Suggested intakes for fat loss (500 under), mild cut (250 under), and lean bulk (300 over).' },
      ],
      workflowLinks: [
        { slug: 'bmr-calculator', step: 'See your basal metabolic rate in detail.' },
        { slug: 'protein-intake-calculator', step: 'Set your protein target for your goal.' },
      ],
      faqs: [
        { q: 'How accurate is TDEE?', a: 'Formulas give a good starting estimate within 10-15%. Track your intake and weight for 2-3 weeks to calibrate the real number.' },
        { q: 'Should I eat back exercise calories?', a: 'Exercise calorie estimates are often inaccurate. Set your activity multiplier conservatively and eat a consistent amount regardless of daily exercise.' },
        { q: 'How often should I recalculate?', a: 'Every 4-6 weeks, or whenever your weight changes by more than 5 pounds. As you lose weight, your TDEE drops.' },
      ],
      related: ['bmr-calculator', 'protein-intake-calculator', 'calories-burned-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
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
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
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
      intro: 'The Steps to Miles Calculator converts your step count into distance (km and miles) and estimates calories burned based on your stride length and body weight.',
      howItWorks: 'Distance = Steps x Stride Length (cm) / 100,000 for km. Miles = km x 0.621371. Calories are estimated using the ACSM walking energy expenditure formula: kcal = km x weight(kg) x 0.53.',
      example: '10,000 steps with 76cm stride: 7.6 km = 4.72 miles. At 70kg: approximately 284 calories burned.',
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
      ],
      faqs: [
        { q: 'What is the average stride length?', a: 'Adults average 65-80cm (26-31 inches). Men tend toward 76cm, women toward 67cm. Height is the best predictor.' },
        { q: 'How many steps is a mile?', a: 'Roughly 2,000-2,500 steps per mile depending on stride length. With a 76cm stride, it is about 2,112 steps per mile.' },
        { q: 'Is the calorie estimate accurate?', a: 'It is a reasonable approximation for walking. Actual calories vary with pace, terrain, and individual metabolism. Use it as a guide, not an exact measure.' },
      ],
      related: ['tdee-calculator', 'bmr-calculator', 'calories-burned-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
  },
];