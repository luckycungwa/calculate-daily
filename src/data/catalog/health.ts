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
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75 },
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
        { label: 'Waist-to-Height Ratio', formulaCode: 'waistCm / heightCm', suffix: ':1', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'The guideline is simple: keep your waist to less than half your height.',
      'WHtR is considered a better predictor of health risk than BMI alone.'
      ],
    },
    content: {
      intro: 'The Waist-to-Height Ratio Calculator compares your waist circumference to your height. Research consistently shows that a ratio above 0.5 signals increased risk of diabetes, heart disease, and early mortality.',
      howItWorks: 'Divide waist circumference in centimeters by height in centimeters. A result below 0.5 is healthy. Between 0.5 and 0.6 indicates elevated risk. Above 0.6 indicates high risk.',
      example: 'Someone with an 82 cm waist and 175 cm height has a WHtR of 0.47, safely below the 0.5 threshold.',
      formulas: [{ label: 'WHtR', expression: 'WHtR = Waist / Height' }],
      resultExplanations: [
        { resultLabel: 'Waist-to-Height Ratio', explanation: 'Below 0.5 = healthy. 0.5 to 0.6 = elevated risk. Above 0.6 = high risk of cardiometabolic disease.' }
      ],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'Compare WHtR against your BMI classification.' },
        { slug: 'waist-to-hip-ratio-calculator', step: 'See how fat is distributed across your midsection.' }
      ],
      faqs: [
        { q: 'Why is waist-to-height better than BMI?', a: 'WHtR accounts for where you carry fat, not just total weight. It consistently outperforms BMI at predicting cardiovascular and metabolic risk.' },
        { q: 'What does a WHtR of 0.5 mean?', a: 'At 0.5 you are at the boundary. The recommendation is to stay below this threshold to minimize long-term health risks.' },
        { q: 'Does this work for children?', a: 'WHtR is validated for adults. For children, age-specific growth charts are more appropriate.' }
      ],
      related: ['bmi-calculator', 'waist-to-hip-ratio-calculator', 'body-fat-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75 },
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
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
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
        { label: 'Avg Blood Sugar (mmol/L)', formulaCode: '((a1c * 28.7) - 46.7) / 18', suffix: 'mmol/L' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Normal A1C is below 5.7%. Pre-diabetes is 5.7% to 6.4%. Diabetes is 6.5% or above.',
      'The American Diabetes Association endorses this formula for converting A1C to average glucose.'
      ],
    },
    content: {
      intro: 'The A1C to Blood Sugar Converter translates your hemoglobin A1C percentage into estimated average blood sugar levels in both mg/dL and mmol/L. This helps people with diabetes understand their A1C in terms of daily glucose numbers.',
      howItWorks: 'The ADAG study established that eAG (mg/dL) = 28.7 x A1C - 46.7. The mmol/L result divides by 18. This formula is endorsed by the American Diabetes Association.',
      example: 'An A1C of 7.0% converts to an estimated average blood sugar of 154.2 mg/dL or 8.6 mmol/L.',
      formulas: [{ label: 'eAG', expression: 'eAG = 28.7 x A1C - 46.7' }],
      resultExplanations: [
        { resultLabel: 'Avg Blood Sugar (mg/dL)', explanation: 'Your estimated average blood glucose in mg/dL, the unit used by most US glucose meters.' },
        { resultLabel: 'Avg Blood Sugar (mmol/L)', explanation: 'Your estimated average blood glucose in mmol/L, the unit used in most other countries.' }
      ],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'See how weight management affects blood sugar control.' },
        { slug: 'water-intake-calculator', step: 'Hydration supports glucose regulation.' }
      ],
      faqs: [
        { q: 'What is a normal A1C?', a: 'Below 5.7% is normal. 5.7% to 6.4% indicates pre-diabetes. 6.5% or above on two separate tests indicates diabetes.' },
        { q: 'How often should A1C be tested?', a: 'If your results are stable, every 6 months. If managing diabetes or changing treatment, every 3 months.' },
        { q: 'Does A1C reflect daily glucose swings?', a: 'No. A1C is a 2-3 month average and does not show highs and lows. Continuous glucose monitors capture the variability A1C misses.' }
      ],
      related: ['bmi-calculator', 'water-intake-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
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
        { label: 'Body Fat Mass', formulaCode: 'weightKg - (sex === 1 ? (0.407 * weightKg) + (0.267 * heightCm) - 19.2 : (0.252 * weightKg) + (0.473 * heightCm) - 48.3)', suffix: 'kg' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Lean body mass includes muscle, bone, organs, and water.',
      'Higher LBM relative to total weight indicates a more muscular body composition.'
      ],
    },
    content: {
      intro: 'The Lean Body Mass Calculator estimates the portion of your body weight that is not fat, using the Boer formula. LBM includes muscle, bone, organs, and water. Higher LBM relative to total weight indicates a more muscular or less fatty body composition.',
      howItWorks: 'Men: LBM = 0.407 x weight(kg) + 0.267 x height(cm) - 19.2. Women: LBM = 0.252 x weight(kg) + 0.473 x height(cm) - 48.3. Fat mass is total weight minus LBM.',
      example: 'A 70 kg, 175 cm male has an estimated LBM of 55.6 kg, meaning about 14.4 kg is fat mass.',
      formulas: [{ label: 'Boer', expression: 'LBM = 0.407W + 0.267H - 19.2 (male)' }],
      resultExplanations: [
        { resultLabel: 'Lean Body Mass', explanation: 'The estimated weight of everything in your body that is not fat, in kilograms.' },
        { resultLabel: 'Body Fat Mass', explanation: 'The estimated fat portion of your body weight.' }
      ],
      workflowLinks: [
        { slug: 'body-fat-calculator', step: 'Compare with the Navy tape body-fat method.' },
        { slug: 'protein-intake-calculator', step: 'Set protein targets based on lean mass.' }
      ],
      faqs: [
        { q: 'How accurate is the Boer formula?', a: 'It provides a reasonable estimate within a few percentage points for most adults. DEXA scans are more precise but less accessible.' },
        { q: 'Why does lean body matter more than total weight?', a: 'Two people at the same weight can have very different health profiles. Higher LBM means more muscle and a higher metabolic rate.' },
        { q: 'Can I increase my lean body mass?', a: 'Yes. Resistance training combined with adequate protein intake (1.6-2.2 g/kg) is the most effective way to build lean mass.' }
      ],
      related: ['body-fat-calculator', 'bmi-calculator', 'protein-intake-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
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
        { label: 'Days to Goal', formulaCode: 'Math.max(0, currentWeightKg - goalWeightKg) > 0 ? Math.round((currentWeightKg - goalWeightKg) * 7700 / dailyDeficitKcal) : 0', suffix: 'days' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'A safe deficit is 300-700 kcal/day for most people.',
      'A larger deficit loses weight faster but increases hunger and muscle loss risk.'
      ],
    },
    content: {
      intro: 'The Calorie Deficit Calculator determines how long it will take to reach a goal weight based on a daily calorie deficit. It converts the weight loss target into days using the 7,700 kcal per kilogram of body fat conversion.',
      howItWorks: 'Each kilogram of body fat stores approximately 7,700 kcal. Divide total deficit needed (weight loss x 7,700) by your daily deficit to get estimated days.',
      example: 'To lose 10 kg at a 500 kcal/day deficit: 10 x 7,700 / 500 = 154 days, roughly 5 months.',
      formulas: [{ label: 'Days', expression: 'Days = Weight loss x 7,700 / Deficit' }],
      resultExplanations: [
        { resultLabel: 'Weight to Lose', explanation: 'The difference between your current weight and goal weight.' },
        { resultLabel: 'Days to Goal', explanation: 'The estimated number of days to reach your goal at the given deficit.' }
      ],
      workflowLinks: [
        { slug: 'bmr-calculator', step: 'Understand your resting calorie baseline.' },
        { slug: 'protein-intake-calculator', step: 'Keep protein high to preserve muscle during the deficit.' }
      ],
      faqs: [
        { q: 'How big of a calorie deficit is safe?', a: 'A 300-700 kcal/day deficit is sustainable for most adults. Larger deficits may cause muscle loss and metabolic adaptation.' },
        { q: 'Why does weight loss slow down?', a: 'As you lose weight, your BMR and TDEE decrease. Recalculate your deficit periodically to stay on track.' },
        { q: 'Does this account for muscle gain?', a: 'No. This is a fat-loss estimate. Strength training may add muscle simultaneously, which affects the scale but not fat-loss trajectory.' }
      ],
      related: ['bmr-calculator', 'protein-intake-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
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
      'Average adult BSA is 1.7 m2 (men) and 1.6 m2 (women).',
      'BSA is used for drug dosing, chemotherapy, and cardiac output calculations.'
      ],
    },
    content: {
      intro: 'The Body Surface Area Calculator estimates your total skin surface area using the Mosteller formula. BSA is used in medicine for drug dosing, organ function assessment, and metabolic calculations.',
      howItWorks: 'BSA (m2) = sqrt(Height(cm) x Weight(kg) / 3600). It requires only height and weight and is accurate to within 3% of direct measurement methods.',
      example: 'A person 175 cm tall weighing 70 kg: BSA = sqrt(175 x 70 / 3600) = 1.84 m2.',
      formulas: [{ label: 'Mosteller', expression: 'BSA = sqrt(H x W / 3600)' }],
      resultExplanations: [
        { resultLabel: 'Body Surface Area', explanation: 'Your estimated total body surface area in square meters.' }
      ],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'Pair BSA with BMI for a fuller health picture.' },
        { slug: 'lean-body-mass-calculator', step: 'Understand body composition alongside surface area.' }
      ],
      faqs: [
        { q: 'What is BSA used for?', a: 'BSA is used in medicine for drug dosing (especially chemotherapy), cardiac output calculations, and assessing kidney function.' },
        { q: 'How accurate is the Mosteller formula?', a: 'It agrees with more complex formulas within about 1-2% for most adults.' },
        { q: 'What is a normal BSA?', a: 'The average adult BSA is 1.7 m2 for men and 1.6 m2 for women.' }
      ],
      related: ['bmi-calculator', 'lean-body-mass-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.65 },
  },
  {
    id: 'vo2-max',
    slug: 'vo2-max-calculator',
    name: 'VO2 Max Estimator',
    shortDesc: 'Estimate your VO2 max from a recent run time.',
    tagline: 'Your aerobic fitness number.',
    category: 'health',
    iconName: 'Gauge',
    keywords: ['VO2 max calculator', 'aerobic fitness', 'run VO2 max', 'cardiovascular fitness'],
    kind: 'config',
    config: {
      fields: [
        { id: 'timeMinutes', label: 'Minutes', type: 'number', defaultValue: 25, min: 1, max: 300 },
        { id: 'timeSeconds', label: 'Seconds', type: 'number', defaultValue: 0, min: 0, max: 59 }
      ],
      results: [
        { label: 'Estimated VO2 Max', formulaCode: '(483 / (timeMinutes + timeSeconds / 60)) + 3.5', suffix: 'ml/kg/min', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Average VO2 max: sedentary 30-40, active 40-50, competitive runners 55-70+.',
      'Use a time trial on a flat course for the most accurate estimate.'
      ],
    },
    content: {
      intro: 'The VO2 Max Estimator calculates your maximum oxygen uptake from a recent run time trial. VO2 max is the gold standard measure of aerobic cardiovascular fitness.',
      howItWorks: 'Run a known distance at maximum effort. The Cooper formula estimates VO2 max as 483 / time in minutes + 3.5.',
      example: 'A 5K in 25 minutes: VO2 max = 483 / 25 + 3.5 = 22.8 ml/kg/min.',
      formulas: [{ label: 'Cooper', expression: 'VO2 max = 483 / T(min) + 3.5' }],
      resultExplanations: [
        { resultLabel: 'Estimated VO2 Max', explanation: 'Your estimated maximal oxygen uptake. Higher values indicate better aerobic fitness.' }
      ],
      workflowLinks: [
        { slug: 'target-heart-rate-calculator', step: 'Set training zones based on your fitness level.' },
        { slug: 'calories-burned-calculator', step: 'Estimate the calorie cost of your runs.' }
      ],
      faqs: [
        { q: 'What is a good VO2 max?', a: 'For men, average is 40-50, good is 50-60, elite is 60-80+. For women, average is 30-40, good is 40-50, elite is 55-75+.' },
        { q: 'How do I improve my VO2 max?', a: 'Consistent interval training (4x4 minute hard efforts), tempo runs, and increasing weekly mileage are most effective.' },
        { q: 'Is this as accurate as a lab test?', a: 'Field tests agree with lab testing within about 5-10%. Consistent conditions improve reliability.' }
      ],
      related: ['target-heart-rate-calculator', 'calories-burned-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
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
        { label: 'Carb Calories', formulaCode: 'weightKg * gramsPerKg * 4', suffix: 'kcal' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Use 2-3 g/kg for sedentary, 4-6 g/kg for moderate activity, 6-10 g/kg for endurance.',
      'Carbs provide 4 calories per gram and are the preferred fuel for high-intensity exercise.'
      ],
    },
    content: {
      intro: 'The Carb Intake Calculator sets a daily carbohydrate target scaled to your body weight and activity level. Whether you train for endurance events or want balanced nutrition, the number removes the guesswork.',
      howItWorks: 'Carb needs scale with body weight and activity. Sedentary adults need about 2-3 g/kg, moderate exercisers 4-6 g/kg, and endurance athletes 6-10 g/kg.',
      example: 'A 70 kg moderate exerciser choosing 5 g/kg needs 350 grams of carbs daily.',
      formulas: [{ label: 'Carbs', expression: 'Carbs (g) = Weight (kg) x g/kg' }],
      resultExplanations: [
        { resultLabel: 'Daily Carb Target', explanation: 'Grams of carbohydrates to eat each day.' },
        { resultLabel: 'Carb Calories', explanation: 'How many daily calories come from that carbohydrate target.' }
      ],
      workflowLinks: [
        { slug: 'tdee-calculator', step: 'Fit carbs within your total calorie budget.' },
        { slug: 'protein-intake-calculator', step: 'Set protein alongside carbs for a complete plan.' }
      ],
      faqs: [
        { q: 'How many carbs do I need per day?', a: 'Sedentary adults need 2-3 g/kg. Moderate exercisers need 4-6 g/kg. Endurance athletes may need 6-10 g/kg.' },
        { q: 'Are low-carb diets safe?', a: 'Low-carb diets can be effective for weight loss, but very low intakes below 50 g/day may cause fatigue and nutrient gaps.' },
        { q: 'What are the best carb sources?', a: 'Whole grains, fruits, vegetables, and legumes provide fiber and nutrients alongside carbs.' }
      ],
      related: ['tdee-calculator', 'protein-intake-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75 },
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
      'Most guidelines recommend 20-35% of calories from fat.',
      'Fat provides 9 calories per gram, more than double the density of protein or carbs.'
      ],
    },
    content: {
      intro: 'The Daily Fat Intake Calculator estimates how much dietary fat you need based on your total calories and the percentage of fat in your diet. Fat is essential for hormone production, vitamin absorption, and brain function.',
      howItWorks: 'Multiply daily calories by the fat percentage, then divide by 9 (calories per gram of fat).',
      example: 'On a 2,000 kcal diet at 30% fat: 2,000 x 0.30 / 9 = 67 grams of fat per day.',
      formulas: [{ label: 'Fat', expression: 'Fat (g) = Calories x Fat% / 9' }],
      resultExplanations: [
        { resultLabel: 'Daily Fat Target', explanation: 'Grams of dietary fat to consume daily.' },
        { resultLabel: 'Fat Calories', explanation: 'How many daily calories come from fat.' }
      ],
      workflowLinks: [
        { slug: 'tdee-calculator', step: 'Set your calorie baseline before splitting macros.' },
        { slug: 'protein-intake-calculator', step: 'Set protein alongside fat for a complete plan.' }
      ],
      faqs: [
        { q: 'How much fat should I eat per day?', a: 'Most guidelines recommend 20-35% of total calories from fat. For 2,000 kcal, that is 44-78 grams per day.' },
        { q: 'Is dietary fat bad for you?', a: 'No. Healthy fats from olive oil, nuts, avocados, and fish are essential. The concern is excessive saturated and trans fats.' },
        { q: 'What happens if I eat too little fat?', a: 'Very low fat intakes can impair hormone production and reduce absorption of fat-soluble vitamins (A, D, E, K).' }
      ],
      related: ['tdee-calculator', 'protein-intake-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
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
        { label: 'Fat', formulaCode: 'dailyCalories * (fatPct / 100) / 9', suffix: 'grams' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Protein and carbs have 4 calories per gram. Fat has 9.',
      'Common splits: 30/40/30 balanced, 40/30/30 muscle building, 30/50/20 endurance.'
      ],
    },
    content: {
      intro: 'The Complete Macro Calculator splits your daily calorie target into protein, carbs, and fat grams in one step. It is the fastest way to build a daily nutrition plan.',
      howItWorks: 'Enter your daily calorie target and the percentage from each macronutrient. Protein and carbs provide 4 kcal/g, while fat provides 9 kcal/g.',
      example: 'A 2,500 kcal target split 30% protein, 40% carbs, 30% fat yields: 188g protein, 250g carbs, 83g fat.',
      formulas: [{ label: 'Macros', expression: 'Protein/Carbs = Cal x %/4; Fat = Cal x %/9' }],
      resultExplanations: [
        { resultLabel: 'Protein', explanation: 'Daily protein target in grams.' },
        { resultLabel: 'Carbs', explanation: 'Daily carbohydrate target in grams.' },
        { resultLabel: 'Fat', explanation: 'Daily fat target in grams.' }
      ],
      workflowLinks: [
        { slug: 'tdee-calculator', step: 'Start with your TDEE to set the calorie target.' },
        { slug: 'protein-intake-calculator', step: 'Set protein independently using body-weight methods.' }
      ],
      faqs: [
        { q: 'What macro split is best?', a: 'A balanced 30/40/30 works for most people. Higher protein suits muscle building. Higher carbs suit endurance athletes.' },
        { q: 'Do percentages need to add to 100%?', a: 'Yes. The calculator works best when protein%, carb%, and fat% total 100%.' },
        { q: 'Should I count macros or just calories?', a: 'Calories determine weight change. Macros determine how you feel, perform, and recover.' }
      ],
      related: ['tdee-calculator', 'protein-intake-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
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
        { label: 'Total Sleep Debt', formulaCode: 'Math.max(0, targetHours - actualHoursLast7) * daysOfDeficit', suffix: 'hrs' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Most adults need 7-9 hours per night.',
      'You can recover sleep debt by adding 1-2 extra hours per night over several nights.'
      ],
    },
    content: {
      intro: 'The Sleep Debt Calculator quantifies how much sleep you have lost over a period and estimates the extra sleep needed to recover. Chronic sleep debt accumulates faster than most people realize.',
      howItWorks: 'Subtract your average actual sleep from your target sleep to find the nightly shortfall. Multiply by the number of deficit days to get total sleep debt.',
      example: 'Sleeping 6.5 hours nightly for 7 days when you need 8: shortfall is 1.5 hours, total debt is 10.5 hours.',
      formulas: [{ label: 'Sleep Debt', expression: 'Debt = (Target - Actual) x Days' }],
      resultExplanations: [
        { resultLabel: 'Nightly Shortfall', explanation: 'How many hours you are losing each night.' },
        { resultLabel: 'Total Sleep Debt', explanation: 'The cumulative hours of sleep you owe your body.' }
      ],
      workflowLinks: [
        { slug: 'bedtime-calculator', step: 'Align bedtimes with sleep cycles for better quality.' },
        { slug: 'bmr-calculator', step: 'Sleep debt slows metabolism.' }
      ],
      faqs: [
        { q: 'Can you catch up on lost sleep?', a: 'Yes, partially. Extra sleep hours in the following days can restore alertness and performance.' },
        { q: 'How much sleep debt is dangerous?', a: 'Even 1-2 hours per night for a week impairs reaction time, mood, and immune function.' },
        { q: 'Is it better to sleep more on weekends?', a: 'Extending sleep on weekends helps but is less effective than consistent nightly sleep.' }
      ],
      related: ['bedtime-calculator', 'bmr-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75 },
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
        { label: 'Wrist-to-Height Ratio', formulaCode: 'wristCm / heightCm * 100', suffix: '%', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Measure the wrist just above the wrist bone with a flexible tape.',
      'Body frame size affects ideal weight ranges. Large-framed individuals have higher healthy weights.'
      ],
    },
    content: {
      intro: 'The Body Frame Size Calculator classifies your frame as small, medium, or large based on wrist circumference relative to height. Body frame size adjusts what a healthy weight range means for your build.',
      howItWorks: 'Measure your wrist circumference just above the wrist bone. Divide by height and multiply by 100. Men: below 8.9 small, 8.9-10.0 medium, above 10.0 large.',
      example: 'A 175 cm tall man with a 17 cm wrist: ratio = 17 / 175 x 100 = 9.7, classified as medium frame.',
      formulas: [{ label: 'Ratio', expression: 'Ratio = (Wrist / Height) x 100' }],
      resultExplanations: [
        { resultLabel: 'Wrist-to-Height Ratio', explanation: 'Men: <8.9 small, 8.9-10.0 medium, >10.0 large. Women: <9.2 small, 9.2-10.2 medium, >10.2 large.' }
      ],
      workflowLinks: [
        { slug: 'ideal-weight-calculator', step: 'Adjust your ideal weight target for your frame size.' },
        { slug: 'bmi-calculator', step: 'BMI does not account for frame size.' }
      ],
      faqs: [
        { q: 'How does frame size affect ideal weight?', a: 'Large-framed individuals naturally carry more bone mass and weigh more at the same height.' },
        { q: 'How do I measure my wrist?', a: 'Wrap a flexible tape around the narrowest part of your wrist, just above the wrist bone.' },
        { q: 'Is frame size genetic?', a: 'Yes. Bone structure is largely determined by genetics and does not change significantly with weight loss or gain.' }
      ],
      related: ['ideal-weight-calculator', 'bmi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
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
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
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
        { label: 'Daily Caffeine Limit', formulaCode: 'weightKg * 3', suffix: 'mg', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'One cup of coffee has roughly 80-100 mg of caffeine.',
      'Pregnant women should limit caffeine to 200 mg per day regardless of weight.'
      ],
    },
    content: {
      intro: 'The Caffeine Intake Limit Calculator recommends a safe daily maximum based on your body weight. The European Food Safety Authority sets the safe limit at 400 mg per day for healthy adults and 3 mg per kg of body weight.',
      howItWorks: 'Multiply your weight in kilograms by 3 to get your daily caffeine limit in milligrams.',
      example: 'A 70 kg person has a safe limit of 210 mg, roughly two cups of coffee.',
      formulas: [{ label: 'Caffeine', expression: 'Limit (mg) = Weight (kg) x 3' }],
      resultExplanations: [
        { resultLabel: 'Daily Caffeine Limit', explanation: 'The EFSA safe daily maximum based on 3 mg per kg of body weight.' }
      ],
      workflowLinks: [
        { slug: 'bmr-calculator', step: 'Caffeine can temporarily boost metabolic rate.' },
        { slug: 'water-intake-calculator', step: 'Balance caffeine diuresis with adequate water.' }
      ],
      faqs: [
        { q: 'Is 400 mg of caffeine safe for everyone?', a: 'Healthy adults can generally tolerate up to 400 mg/day. People with heart conditions, anxiety, or sleep disorders should consult a doctor.' },
        { q: 'How much caffeine is in common drinks?', a: 'Coffee (80-100 mg/cup), espresso (63 mg/shot), black tea (40-70 mg/cup), energy drink (80-150 mg/can), cola (30-40 mg/can).' },
        { q: 'Does caffeine affect sleep?', a: 'Caffeine has a half-life of 5-6 hours. Avoid caffeine within 8 hours of bedtime for better sleep quality.' }
      ],
      related: ['bmr-calculator', 'water-intake-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
  },
  {
    id: 'body-type',
    slug: 'body-type-calculator',
    name: 'Body Type Calculator',
    shortDesc: 'Classify your body type as ectomorph, mesomorph, or endomorph.',
    tagline: 'Know your body type for training.',
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
      'Most people are a blend of types rather than purely one.',
      'Your body type influences optimal training and nutrition strategies.'
      ],
    },
    content: {
      intro: 'The Body Type Calculator classifies your body into one of three somatotypes based on simple body measurements. Each type responds differently to exercise and nutrition.',
      howItWorks: 'Enter your wrist and ankle circumferences relative to your height. Thinner bones suggest ectomorph, thicker suggest endomorph.',
      example: 'A 175 cm male with a 17 cm wrist and 23 cm ankle is classified as a balanced mesomorph.',
      formulas: [{ label: 'Somatotype', expression: 'Based on bone structure ratios' }],
      resultExplanations: [
        { resultLabel: 'Wrist Ratio', explanation: 'Thin wrists (below 8.9% of height) suggest ectomorph. Above 10.0% suggest endomorph.' },
        { resultLabel: 'Ankle Ratio', explanation: 'Thin ankles (below 12.5% of height) suggest ectomorph. Above 14.5% suggest endomorph.' }
      ],
      workflowLinks: [
        { slug: 'body-fat-calculator', step: 'Combine body type with body fat for a full picture.' },
        { slug: 'bmi-calculator', step: 'BMI does not distinguish body types.' }
      ],
      faqs: [
        { q: 'Can I change my body type?', a: 'You cannot change your underlying bone structure, but you can shift body composition through training and nutrition.' },
        { q: 'What should ectomorphs eat?', a: 'Ectomorphs typically benefit from a calorie surplus with moderate-to-high carbs to support training and recovery.' },
        { q: 'Are somatotypes scientifically valid?', a: 'They are a useful framework but not a rigid classification. Most people are a blend of two types.' }
      ],
      related: ['body-fat-calculator', 'bmi-calculator', 'body-frame-size-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.65 },
  },
  {
    id: 'waist-circumference',
    slug: 'waist-circumference-calculator',
    name: 'Waist Circumference Risk Calculator',
    shortDesc: 'Assess health risk based on waist measurement.',
    tagline: 'Where you carry fat matters.',
    category: 'health',
    iconName: 'Ruler',
    keywords: ['waist circumference', 'waist measurement', 'abdominal obesity', 'health risk waist'],
    kind: 'config',
    config: {
      fields: [
        { id: 'waistCm', label: 'Waist (cm)', type: 'number', defaultValue: 90, suffix: 'cm', min: 40 },
        { id: 'sex', label: 'Sex (1=Male, 0=Female)', type: 'number', defaultValue: 1, min: 0, max: 1, step: 1 }
      ],
      results: [
        { label: 'Waist Circumference', formulaCode: 'waistCm', suffix: 'cm', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Measure at the navel, not at the waistline.',
      'A waist over 102 cm (men) or 88 cm (women) significantly increases heart disease and diabetes risk.'
      ],
    },
    content: {
      intro: 'The Waist Circumference Risk Calculator assesses your cardiometabolic risk based on waist measurement. Central obesity is an independent predictor of heart disease, diabetes, and premature mortality.',
      howItWorks: 'Measure your waist at the navel level. Men above 102 cm (40 inches) and women above 88 cm (35 inches) have elevated risk.',
      example: 'A man with a 105 cm waist is above the 102 cm threshold and at increased health risk.',
      formulas: [{ label: 'Risk', expression: 'Men: >102 cm high risk. Women: >88 cm high risk.' }],
      resultExplanations: [
        { resultLabel: 'Waist Circumference', explanation: 'Men: <94 cm = low risk, 94-102 cm = moderate risk, >102 cm = high risk. Women: <80 cm = low risk, 80-88 cm = moderate risk, >88 cm = high risk.' }
      ],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'BMI does not capture abdominal fat specifically.' },
        { slug: 'waist-to-hip-ratio-calculator', step: 'WHR gives further detail on fat distribution.' }
      ],
      faqs: [
        { q: 'Why is waist circumference important?', a: 'Excess abdominal fat is metabolically active and directly increases the risk of heart disease, diabetes, and stroke.' },
        { q: 'How do I measure my waist?', a: 'Find the top of your hip bone and the bottom of your rib cage. Measure midway between them, at the navel level.' },
        { q: 'Can I reduce waist size through exercise?', a: 'Yes. A combination of cardio, strength training, and a calorie deficit reduces waist circumference over time.' }
      ],
      related: ['bmi-calculator', 'waist-to-hip-ratio-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
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
        { id: 'age', label: 'Age', type: 'number', defaultValue: 30, min: 15, max: 80 },
        { id: 'sex', label: 'Sex (1=Male, 0=Female)', type: 'number', defaultValue: 1, min: 0, max: 1, step: 1 }
      ],
      results: [
        { label: 'Fitness Range', formulaCode: 'sex === 1 ? 14 : 21', suffix: '% to', accent: true },
        { label: 'Fitness Upper', formulaCode: 'sex === 1 ? 17 : 24', suffix: '%' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Athletes need lower body fat. Average adults are healthy within the fitness range.',
      'Body fat percentage increases naturally with age.'
      ],
    },
    content: {
      intro: 'The Ideal Body Fat Percentage Calculator provides the healthy body fat range for your age and sex. Body fat percentage is a more meaningful health metric than BMI because it distinguishes fat from muscle.',
      howItWorks: 'Healthy body fat ranges are defined by the American Council on Exercise. Men: 6-13% athletes, 14-17% fitness, 18-24% average. Women: 14-20% athletes, 21-24% fitness, 25-31% average.',
      example: 'A 35-year-old male at 15% body fat is in the fitness category, which is ideal.',
      formulas: [{ label: 'ACE Ranges', expression: 'Ranges by age and sex' }],
      resultExplanations: [
        { resultLabel: 'Fitness Range', explanation: 'The lower bound of the fitness category for your sex.' },
        { resultLabel: 'Fitness Upper', explanation: 'The upper bound of the fitness category for your sex.' }
      ],
      workflowLinks: [
        { slug: 'body-fat-calculator', step: 'Measure your actual body fat.' },
        { slug: 'bmi-calculator', step: 'BMI does not distinguish fat from muscle.' }
      ],
      faqs: [
        { q: 'What is a healthy body fat percentage for men?', a: 'Athletes: 6-13%. Fitness: 14-17%. Acceptable: 18-24%. Above 25% is considered obese.' },
        { q: 'What is a healthy body fat percentage for women?', a: 'Athletes: 14-20%. Fitness: 21-24%. Acceptable: 25-31%. Above 32% is considered obese.' },
        { q: 'Can I get too lean?', a: 'Yes. Essential fat (the minimum needed for health) is 2-5% for men and 10-13% for women. Going below these levels is dangerous.' }
      ],
      related: ['body-fat-calculator', 'bmi-calculator', 'lean-body-mass-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.65 },
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
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75 },
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
        { label: 'Estimated Calories Burned', formulaCode: 'Math.round(weightKg * distanceKm * 1.0)', suffix: 'kcal', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Running burns roughly 1.0 kcal per kg per kilometer.',
      'Uphill running, wind resistance, and high intensity increase the calorie cost.'
      ],
    },
    content: {
      intro: 'The Running Calorie Calculator estimates the energy cost of a run based on your pace and duration. Running is one of the most efficient calorie-burning exercises, but the actual cost depends on speed and body weight.',
      howItWorks: 'Running energy cost is approximately 1.0 kcal per kg per kilometer at moderate pace. Faster paces increase cost slightly due to reduced mechanical efficiency.',
      example: 'A 70 kg person running at 10 km/h for 30 minutes burns roughly 350 calories.',
      formulas: [{ label: 'Calories', expression: 'Calories = Weight x Distance x 1.0' }],
      resultExplanations: [
        { resultLabel: 'Estimated Calories Burned', explanation: 'Estimated energy expenditure. Actual values vary with pace, terrain, wind, and fitness level.' }
      ],
      workflowLinks: [
        { slug: 'running-pace-calculator', step: 'Convert pace and distance into a run estimate.' },
        { slug: 'target-heart-rate-calculator', step: 'Pair with heart-rate data for more accuracy.' }
      ],
      faqs: [
        { q: 'Does running burn more calories than walking?', a: 'Yes. Running at moderate pace burns roughly 2-3 times more calories per minute than walking.' },
        { q: 'How accurate is this estimate?', a: 'Field tests agree with lab testing within about 10-15%. Actual values depend on pace, terrain, and fitness level.' },
        { q: 'Do heavier people burn more calories running?', a: 'Yes. Running requires moving your entire body, so a heavier person burns more energy at the same pace.' }
      ],
      related: ['running-pace-calculator', 'calories-burned-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
  }
];
