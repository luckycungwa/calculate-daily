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
          'A good rule: your easy pace is roughly 2-3 minutes per mile slower than your current 5K race pace. If you run a 25-minute 5K (8:03/mile pace), your easy pace should be 10:00-11:00/mile.',
        ],
      },
      {
        heading: 'Heart Rate Training Zones',
        body: [
          'Zone 1 (50-60% max HR): Recovery, warm-up. Very easy effort. Zone 2 (60-70%): Aerobic base, fat burning. The pace where you could hold a conversation. Zone 3 (70-80%): Tempo, threshold. Comfortably hard. Zone 4 (80-90%): Anaerobic, intervals. Hard effort for 3-10 minutes. Zone 5 (90-100%): Maximum effort, sprints.',
          'Most of your running (80%) should be in Zone 2. This builds aerobic capacity, mitochondrial density, and capillary networks. The 20% hard work (Zone 3-5) builds speed and VO2 max.',
          'Calculate max HR: the simplest method is 220 minus your age, but this has wide individual variation. A better approach is a time trial: warm up well, run a hard 1-mile effort, and note your peak heart rate. That is approximately your true max.',
        ],
        callout: '80% of your running should be easy (Zone 2). The most common training mistake is running easy days too hard.',
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
          'Running burns roughly 100 calories per mile for a 180-pound person, regardless of pace. A 5-mile run burns about 500 calories whether you run it in 40 minutes or 50 minutes. Pace changes the intensity, not the total burn.',
          'Body weight matters heavily. A 220-pound person burns roughly 130 calories per mile. A 140-pound person burns about 83 calories per mile. The formula is approximately 0.75 calories per pound per mile.',
          'Do not eat back all your exercise calories if fat loss is the goal. Exercise calorie estimates from watches are notoriously inaccurate, often overestimating by 30-50%. Use a consistent estimate and adjust based on results.',
        ],
        callout: 'Running burns approximately 100 calories per mile for an average adult. Distance matters more than speed for total calorie burn.',
      },
      {
        heading: 'Building a Weekly Training Plan',
        body: [
          'A beginner plan: 3-4 runs per week, all easy pace, 2-3 miles each. Total weekly volume: 8-12 miles. Increase total weekly mileage by no more than 10% per week to avoid injury.',
          'An intermediate plan: 4-5 runs per week including one long run (easy pace), one tempo run, one interval session, and 1-2 easy runs. Total weekly volume: 20-35 miles.',
          'The long run is the foundation. It teaches your body to burn fat efficiently and builds endurance. Keep it at easy pace. Speed comes from the hard days, not from making every run hard.',
        ],
      },
    ],
    conclusion: 'Start with an easy pace you can hold a conversation at, run 3-4 times per week, and increase volume by 10% per week. Use heart rate or the talk test to stay honest on easy days. The fitness follows the consistency.',
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
    status: 'index',
    reviewStatus: 'reviewed',
    priority: 0.85,
  },
  publishedAt: '2026-08-22',
};
