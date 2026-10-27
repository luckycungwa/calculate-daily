import { Guide } from '../../../types';

export const runningTrainingGuide: Guide = {
  id: 'running-training-guide',
  slug: 'running-pace-training-zones-guide',
  name: 'Running Pace, Heart Rate Zones, and Training Plans',
  shortDesc: 'Calculate your training paces, understand heart rate zones, and build a running plan based on real numbers.',
  category: 'fitness',
  iconName: 'Timer',
  keywords: ['running pace', 'heart rate zones', 'training plan', 'calories burned running', 'zone 2', 'vo2 max', 'running fitness'],
  content: {
    hook: 'Running faster without a plan leads to injury. Running slower without a plan leads nowhere. The math behind training zones fixes both problems.',
    sections: [
      {
        heading: 'Understanding Pace vs Speed',
        body: [
          'Pace is minutes per mile (or kilometer). Speed is miles per hour. Runners think in pace because it directly translates to race times. A 9:00/mile pace finishes a half-marathon in about 1:58.',
          'Your easy pace should feel conversational. If you cannot speak in full sentences, you are running too fast. Most runners run their easy days too hard and their hard days too easy, which produces mediocre results and frequent injuries.',
          'Pace ranges are individual and depend on training history, terrain, weather, and health. A recent race result can provide context, but it should not be used as a universal prescription for easy pace.',
        ],
      },
      {
        heading: 'Heart Rate Training Zones',
        body: [
          'Zone 1 (50-60% max HR): Recovery, warm-up. Very easy effort. Zone 2 (60-70%): Aerobic base, fat burning. The pace where you could hold a conversation. Zone 3 (70-80%): Tempo, threshold. Comfortably hard. Zone 4 (80-90%): Anaerobic, intervals. Hard effort for 3-10 minutes. Zone 5 (90-100%): Maximum effort, sprints.',
          'Training-zone percentages are approximate and vary by method and individual. Many training plans emphasize easier sessions, but the appropriate distribution depends on goals, experience, and recovery.',
          'The estimate 220 minus age is a rough population estimate, not a measurement of an individual maximum heart rate. Do not perform an all-out test based on this guide; seek qualified supervision if an exercise test is needed, especially if you have health concerns.',
        ],
        callout: 'Use heart-rate zones as estimates, not medical measurements. The talk test is another practical way to monitor perceived effort.',
      },
      {
        heading: 'Calculating Your Training Paces',
        body: [
          'Use a recent race result or time trial to establish your current fitness. A 5K in 25 minutes suggests a current easy pace of about 10:30/mile, a tempo pace of about 8:45/mile, and an interval pace of about 8:15/mile.',
          'For beginners without a race time, use the talk test. Your easy pace is where you can hold a full conversation. Your tempo pace is where you can speak in short phrases. Your interval pace is where you can only say a word or two.',
          'Reassess every 6-8 weeks. As your fitness improves, your paces get faster. The goal is progressive overload: gradually increasing volume or intensity to drive adaptation.',
        ],
      },
      {
        heading: 'Calories Burned Running',
        body: [
          'A distance-based calorie estimate is only a rough guide. Actual energy use varies with body size, running economy, terrain, and measurement method; pace and conditions can also matter.',
          'A simple approximation of about 0.6 calories per pound per mile gives roughly 108 calories per mile for a 180-pound runner, 132 for 220 pounds, and 84 for 140 pounds. These values are examples, not precise measurements.',
          'Wearables and exercise calculators provide estimates, not exact energy measurements. Do not use this guide alone to set a nutrition or weight-loss plan.',
        ],
        callout: 'Treat exercise-calorie estimates as approximate; individual results vary.',
      },
      {
        heading: 'Building a Weekly Training Plan',
        body: [
          'A beginner schedule should reflect current activity, health, and recovery. Increase training gradually rather than relying on a fixed weekly percentage; stop and seek advice for concerning symptoms.',
          'An intermediate plan: 4-5 runs per week including one long run (easy pace), one tempo run, one interval session, and 1-2 easy runs. Total weekly volume: 20-35 miles.',
          'The long run is the foundation. It teaches your body to burn fat efficiently and builds endurance. Keep it at easy pace. Speed comes from the hard days, not from making every run hard.',
        ],
      },
    ],
    conclusion: 'Start at a comfortable effort and progress in a way that fits your experience and health. The paces and heart-rate zones here are general estimates, not individualized training or medical advice.',
  },
  faqs: [
    { q: 'How fast should my easy pace be?', a: 'Easy pace should feel genuinely easy. For most people this is 2-3 minutes per mile slower than 5K race pace. If you cannot hold a conversation, slow down. There is no shame in running slowly on easy days.' },
    { q: 'How many miles per week should I run?', a: 'Beginners: 8-12 miles per week across 3-4 runs. Intermediate: 20-35 miles. Advanced: 40-70+ miles. The key is gradual progression, not starting at high volume.' },
    { q: 'Do I need a heart rate monitor?', a: 'Not required but helpful. The talk test is a reliable alternative. If you can speak in full sentences, you are in Zone 2. If you can only say a few words, you are in Zone 4-5.' },
    { q: 'How long before I see results?', a: 'Cardiovascular fitness improves within 2-3 weeks of consistent training. Visible body composition changes typically take 6-8 weeks. Performance improvements (faster paces, longer distances) compound over months.' },
  ],
  embeddedCalculators: ['running-pace-calculator', 'target-heart-rate-calculator', 'calories-burned-calculator', 'one-rep-max-calculator'],
  relatedCalculators: ['protein-intake-calculator', 'bmr-calculator', 'water-intake-calculator'],
  relatedGuides: ['tdee-macros-complete-guide', 'bmi-body-fat-weight-guide'],
  seo: {
    status: 'noindex',
    reviewStatus: 'pending',
    priority: 0.85,
  },
  publishedAt: '2026-08-22',
};
