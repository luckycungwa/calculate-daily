import { Guide } from '../../../types';

export const bmiWeightGuide: Guide = {
  id: 'bmi-weight-guide',
  slug: 'bmi-body-fat-weight-guide',
  name: 'BMI, Body Fat, and Understanding Your Weight',
  shortDesc: 'What BMI actually measures, why it fails for athletes, and how body fat percentage gives a more complete picture.',
  category: 'health',
  iconName: 'Scale',
  keywords: ['bmi', 'body fat percentage', 'ideal weight', 'weight categories', 'body composition', 'health weight'],
  content: {
    hook: 'BMI says a muscular 200-pound man is overweight. Body fat percentage says he is at 12% and in excellent shape. Neither number alone tells the full story. You need both.',
    sections: [
      {
        heading: 'What BMI Actually Measures',
        body: [
          'Body Mass Index is your weight in kilograms divided by your height in meters squared. It is a simple ratio that does not distinguish between muscle, fat, bone, or water. It is a screening tool, not a diagnosis.',
          'BMI categories: Underweight (below 18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (30+). These ranges work well as population-level indicators but break down for individuals.',
          'BMI was never designed for individual health assessment. It was created in the 1830s for statistical analysis of populations. Using it as your sole health metric is like using your zip code to determine your income.',
        ],
      },
      {
        heading: 'Why BMI Fails for Active People',
        body: [
          'Muscle is denser than fat. A 200-pound man who lifts weights regularly can have a BMI of 28 (overweight) while carrying only 12% body fat. A sedentary 200-pound man with the same BMI might carry 30% body fat.',
          'Athletes, bodybuilders, and anyone with above-average muscle mass will almost always register as overweight or obese by BMI alone. This does not mean they are unhealthy.',
          'Conversely, some people with normal BMI carry excessive visceral fat (thin outside, fat inside). This metabolically obese but normal weight condition is arguably more dangerous than being overweight with low body fat.',
        ],
        callout: 'BMI is a starting point, not a conclusion. If your BMI is elevated, check body fat percentage before assuming you are unhealthy.',
      },
      {
        heading: 'Body Fat Percentage: The Better Metric',
        body: [
          'Body fat percentage measures what portion of your total weight is fat. For men, 10-20% is healthy; 6-10% is athletic; 2-5% is essential minimum. For women, 18-28% is healthy; 14-20% is athletic; 10-13% is essential minimum.',
          'Methods to measure: DEXA scan (most accurate, $50-150), hydrostatic weighing (very accurate, rare), bioelectrical impedance (scales and handheld devices, less accurate but convenient), and skinfold calipers (moderate accuracy, consistent when done by same person).',
          'Body fat percentage is more predictive of health outcomes than BMI. People with high body fat and normal BMI have higher all-cause mortality risk than people with normal body fat and high BMI.',
        ],
      },
      {
        heading: 'Finding Your Ideal Weight',
        body: [
          'There is no single ideal weight for any height. It depends on your frame size, muscle mass, age, and personal goals. A better approach is targeting a body fat percentage range rather than a specific weight.',
          'For most people, a healthy weight falls between the midpoint and upper end of the normal BMI range, combined with body fat in the healthy range. This might be 150-180 pounds for a 5-foot-10 man depending on build.',
          'Focus on what your body can do rather than a number on the scale. Can you walk up stairs without getting winded? Can you carry groceries? Can you play with your kids? Functional fitness matters more than aesthetic categories.',
        ],
      },
    ],
    conclusion: 'Use BMI as a quick screening tool, then dig deeper with body fat percentage and waist circumference. A healthy weight is one where your body fat is in the healthy range and you feel strong and energized.',
  },
  faqs: [
    { q: 'Is BMI accurate for older adults?', a: 'Less accurate. As people age, they lose muscle mass and may gain visceral fat. An older adult can have normal BMI but unhealthy body composition. Body fat percentage and waist circumference are better metrics for this group.' },
    { q: 'What is a healthy waist circumference?', a: 'For men, under 40 inches. For women, under 35 inches. Waist circumference measures visceral fat, which is the most metabolically dangerous type. A tape measure at the belly button level is sufficient.' },
    { q: 'Can I be overweight and healthy?', a: 'Yes, if the excess weight is muscle rather than fat. Metabolically healthy obesity exists but is less common than the term suggests. Body fat percentage and metabolic markers (blood pressure, blood sugar, lipids) give the full picture.' },
    { q: 'How often should I check body fat?', a: 'Monthly is sufficient for tracking trends. Daily fluctuations are noise, not signal. Use the same measurement method, at the same time of day, under similar conditions for consistency.' },
  ],
  embeddedCalculators: ['bmi-calculator', 'body-fat-calculator', 'ideal-weight-calculator', 'bmr-calculator'],
  relatedCalculators: ['tdee-calculator', 'protein-intake-calculator', 'calories-burned-calculator'],
  relatedGuides: ['tdee-macros-complete-guide', 'running-training-guide'],
  seo: {
    status: 'index',
    reviewStatus: 'reviewed',
    priority: 0.85,
  },
  publishedAt: '2026-08-22',
};
