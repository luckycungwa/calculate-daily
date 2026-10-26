import { Guide } from '../../../types';

export const datePlanningGuide: Guide = {
  id: 'date-planning-guide',
  slug: 'date-planning-countdown-guide',
  name: 'Date Planning, Countdowns, and Work Hour Calculations',
  shortDesc: 'Calculate exact ages, days between dates, countdown to events, and convert work hours into scheduling and pay.',
  category: 'time',
  iconName: 'CalendarClock',
  keywords: ['date calculator', 'age calculator', 'countdown', 'days until', 'work hours', 'decimal hours', 'scheduling'],
  content: {
    hook: 'Time is the one resource you cannot save or borrow. Planning around dates keeps you in control of deadlines, events, and work schedules.',
    sections: [
      {
        heading: 'Calculating Exact Age',
        body: [
          'Your age is not just years. An age calculator breaks down your exact age in years, months, and days. Someone born on March 15, 1990 is not just "35" on August 22, 2025. They are 35 years, 5 months, and 7 days old.',
          'This matters for legal deadlines (probation periods, contract terms), medical milestones, and insurance thresholds. "Under 26" for parent health insurance means exactly that, not approximately.',
          'Age in days is useful for tracking habits and milestones. "100 days sober" or "365 days of consistent exercise" is more motivating than vague progress. It also helps with pregnancy tracking where weeks and days matter.',
        ],
      },
      {
        heading: 'Days Between Any Two Dates',
        body: [
          'Knowing the exact number of days between dates helps with project planning, contract terms, and loan calculations. A "90-day sprint" from June 1 ends on August 30, not September 1.',
          'Most people undercount days in long spans. From January 1 to December 31 is 364 days, not 365. February has 28 or 29 days. Months have 28-31 days. Manual counting is error-prone.',
          'Date math is essential for financial calculations too. Interest accrues over exact days. A loan taken on March 15 and paid on September 15 has 184 days of interest, not 6 months.',
        ],
        callout: 'From January 1 to December 31 is 364 days, not 365. Leap years add February 29. Always use a calculator for date spans longer than a few weeks.',
      },
      {
        heading: 'Counting Down to Events',
        body: [
          'A countdown timer creates urgency and helps with preparation planning. Knowing a wedding is 147 days away means different planning stages: 6 months for venue, 3 months for invitations, 1 month for final details.',
          'Project deadlines benefit from day counts rather than dates. "45 days until launch" is more actionable than "October 15." It forces you to break work into daily chunks.',
          'Countdowns also reveal whether your timeline is realistic. If you need 200 days of preparation and only have 90 days, you need to cut scope, add resources, or move the date.',
        ],
      },
      {
        heading: 'Work Hours and Scheduling',
        body: [
          'Work-hours calculators can convert clock time to decimal hours for payroll or billing. 8 hours and 45 minutes is 8.75 hours; employers may use different rounding and timekeeping rules.',
          'For freelancers and contractors, tracking work in decimal hours is essential. If your rate is $50/hour and you work 8 hours and 36 minutes on a project, that is 8.6 hours = $430, not $400 or $450.',
          'When planning work weeks, account for breaks and non-productive time. An 8-hour workday typically has 6-7 hours of focused work. Planning at 100% utilization guarantees missed deadlines.',
        ],
      },
      {
        heading: 'Week Conversions for Project Planning',
        body: [
          'Converting between days, weeks, and hours creates clearer project timelines. A 6-week project at 40 hours per week is 240 hours. That is the budget, not a suggestion.',
          'Buffer time is not waste. Standard project management adds 20-30% buffer to estimated timelines. A task estimated at 5 weeks should be scheduled for 6-7 weeks to account for interruptions, delays, and revisions.',
          'For team projects, convert person-hours to calendar time by dividing by the number of people. But remember Brooks Law: adding people to a late project makes it later, because coordination overhead increases.',
        ],
      },
    ],
    conclusion: 'Date and time calculations remove ambiguity from planning. Whether counting down to a deadline, converting work hours to pay, or calculating exact ages, precision with time prevents surprises.',
  },
  faqs: [
    { q: 'How do I calculate how many days until a specific date?', a: 'Subtract today from the target date, accounting for different month lengths and leap years. Our days-until calculator handles this automatically. Enter the target date and get the exact count.' },
    { q: 'What is decimal time and why does payroll use it?', a: 'Decimal time converts hours and minutes to a decimal number. 1 hour 30 minutes = 1.5 hours. Payroll systems use decimal math because multiplying 1.5 hours by $25/hour is simpler than converting 1:30 to a flat rate.' },
    { q: 'How many working days are in a year?', a: 'Approximately 260 (52 weeks x 5 days). But subtract holidays (10-15 depending on country), vacation (10-20 days), and sick days (3-5) to get 230-240 actual working days for most full-time employees.' },
    { q: 'How do I calculate project duration in days?', a: 'Start date to end date, inclusive. A project starting March 1 and ending March 15 has 15 days, not 14. For business days, exclude weekends and holidays from the count.' },
  ],
  embeddedCalculators: ['age-calculator', 'date-difference-calculator', 'days-until-calculator', 'work-hours-calculator'],
  relatedCalculators: ['decimal-hours-calculator', 'days-to-weeks-calculator', 'hourly-to-annual-salary-calculator'],
  relatedGuides: [],
  seo: {
    status: 'index',
    reviewStatus: 'reviewed',
    priority: 0.8,
  },
  publishedAt: '2026-08-22',
};
