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
    hook: 'BMI is a height-and-weight screening measure, not a diagnosis or a direct measure of body fat. It can be less informative for some individuals, including people with unusually high muscle mass, and should be interpreted in context.',
    sections: [
      {
        heading: 'What BMI Actually Measures',
        body: [
          'Body Mass Index is your weight in kilograms divided by your height in meters squared. It is a simple ratio that does not distinguish between muscle, fat, bone, or water. It is a screening tool, not a diagnosis.',
          'BMI categories: Underweight (below 18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (30+). These ranges work well as population-level indicators but break down for individuals.',
          'BMI was developed as a population-level measure and is used as one screening indicator. It should not be treated as a complete individual health assessment or interpreted without other relevant information.',
        ],
      },
      {
        heading: 'Why BMI Fails for Active People',
        body: [
          'Muscle is denser than fat. A 200-pound man who lifts weights regularly can have a BMI of 28 (overweight) while carrying only 12% body fat. A sedentary 200-pound man with the same BMI might carry 30% body fat.',
          'People with higher-than-average muscle mass may have a higher BMI without the measure distinguishing lean mass from fat mass. The result alone does not establish whether someone is healthy or unhealthy.',
          'BMI also does not show where body fat is distributed. A clinician may consider other measures and health factors when interpreting a result.',
        ],
        callout: 'BMI is a starting point, not a conclusion. If your BMI is elevated, check body fat percentage before assuming you are unhealthy.',
      },
      {
        heading: 'Body Fat Percentage: The Better Metric',
        body: [
          'Body-fat estimates depend on the measurement method and population. Reference ranges are not interchangeable or diagnostic; discuss health concerns and interpretation with a qualified clinician.',
          'Available methods include imaging, impedance devices, and skinfold measurements. Each has limitations and measurement error, so results from different methods may not be directly comparable.',
          'Body-fat percentage and BMI each describe different things. Neither number alone establishes health risk, and other clinical measures may be important.',
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
    conclusion: 'Use BMI only as a screening measure, not as a diagnosis or a standalone health target. This guide is educational and does not replace individualized advice from a qualified health professional.',
  },
  faqs: [
    { q: 'Is BMI accurate for older adults?', a: 'Less accurate. As people age, they lose muscle mass and may gain visceral fat. An older adult can have normal BMI but unhealthy body composition. Body fat percentage and waist circumference are better metrics for this group.' },
    { q: 'What is a healthy waist circumference?', a: 'For men, under 40 inches. For women, under 35 inches. Waist circumference measures visceral fat, which is the most metabolically dangerous type. A tape measure at the belly button level is sufficient.' },
    { q: 'Can I be overweight and healthy?', a: 'Yes, if the excess weight is muscle rather than fat. Metabolically healthy obesity exists but is less common than the term suggests. Body fat percentage and metabolic markers (blood pressure, blood sugar, lipids) give the full picture.' },
    { q: 'How often should I check body fat?', a: 'Monthly is sufficient for tracking trends. Daily fluctuations are noise, not signal. Use the same measurement method, at the same time of day, under similar conditions for consistency.' },
  ],
  embeddedCalculators: ['bmi-calculator', 'body-fat-calculator', 'ideal-weight-calculator', 'bmr-calculator'],
  relatedCalculators: ['tdee-calculator', 'protein-intake-calculator', 'calories-burned-calculator'],
  relatedGuides: ['tdee-macros-complete-guide', 'running-pace-training-zones-guide'],
  seo: {
    status: 'noindex',
    reviewStatus: 'pending',
    priority: 0.85,
  },
  publishedAt: '2026-08-22',
};
