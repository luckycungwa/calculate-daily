import type { Guide } from '../../../src/types';

export const timesheetCalculationGuideDraft: Guide = {
  id: 'timesheet-calculation-guide-draft',
  slug: 'timesheet-calculation-guide',
  name: 'Timesheets, Breaks, Overnight Shifts, and Decimal Hours',
  shortDesc:
    'Calculate elapsed shift time, subtract the break duration you enter, and convert minutes to decimal hours.',
  category: 'time',
  iconName: 'Clock',
  keywords: ['time card calculator', 'timesheet calculator', 'decimal hours', 'overnight shift hours'],
  content: {
    hook:
      'To total a shift, find the elapsed minutes between start and end, add 24 hours when the shift ends the next day, subtract only the break duration you enter, and divide the remaining minutes by 60 for decimal hours.',
    sections: [
      {
        heading: 'A reliable timesheet calculation',
        body: [
          'Convert each time to minutes after midnight. Subtract the start from the end. If the end time is earlier than the start time because the shift crosses midnight, add 1,440 minutes to the end time before subtracting.',
          'Subtract the break minutes entered for that shift. Convert the remaining time to decimal hours by dividing minutes by 60. For example, 15 minutes is 0.25 hours and 45 minutes is 0.75 hours.',
          'The time-card calculator repeats this calculation across a week and totals the hours. Check that each entry uses the intended date and that the break duration is entered in minutes.',
        ],
      },
      {
        heading: 'Worked example: an overnight shift',
        body: [
          'A shift runs from 9:30 p.m. to 6:15 a.m. the following day. From 9:30 p.m. to midnight is 150 minutes; from midnight to 6:15 a.m. is 375 minutes. Elapsed time is 525 minutes, or 8 hours 45 minutes.',
          'If the timesheet entry includes a 30-minute break, subtract 30 minutes: 525 − 30 = 495 minutes. Divide 495 by 60 to get 8.25 hours, which is 8 hours 15 minutes.',
        ],
      },
      {
        heading: 'Use the calculator for arithmetic, not policy decisions',
        body: [
          'The calculator subtracts the break duration you enter. It does not determine whether a break is paid, whether time is legally compensable, or whether overtime is owed. Those decisions depend on the applicable rules, work arrangement, and jurisdiction.',
          'Keep the original clock entries and record any corrections according to your employer or client process. A calculated total is not a substitute for an approved timesheet or payroll record.',
          'If your shift spans a daylight-saving clock change, the difference between displayed clock times may not equal elapsed real time. Follow the timekeeping system and local policy for that date.',
        ],
      },
      {
        heading: 'Common mistakes',
        body: [
          'Do not read 8 hours 15 minutes as 8.15 decimal hours. Convert minutes by dividing by 60: 15 minutes is 0.25 hours, so 8 hours 15 minutes is 8.25 hours.',
          'Do not subtract paid or unpaid breaks based on a general rule in this guide. Enter only the break duration your records and applicable policy require.',
          'For multiple shifts, calculate each date separately before totaling. This makes overnight entries and corrections easier to review.',
        ],
      },
    ],
    conclusion:
      'Use clock entries to calculate elapsed minutes, account for an overnight end time, subtract the break duration that applies to your record, and divide by 60 for decimal hours. Confirm payroll and break treatment with the relevant policy or authority.',
  },
  faqs: [
    {
      q: 'How do I convert minutes to decimal hours?',
      a: 'Divide the minutes by 60. For example, 45 minutes is 45 ÷ 60 = 0.75 hours.',
    },
    {
      q: 'How do I calculate a shift that crosses midnight?',
      a: 'Treat the end time as occurring on the next day. Add 24 hours to the end time before subtracting the start time, then subtract the break duration you enter.',
    },
    {
      q: 'Does a timesheet calculator decide whether a break is paid?',
      a: 'No. It performs arithmetic on the break duration entered. Whether a break is paid or compensable depends on the applicable workplace rules and jurisdiction.',
    },
  ],
  embeddedCalculators: ['time-card-calculator'],
  relatedCalculators: [
    'decimal-hours-calculator',
    'work-hours-calculator',
    'hourly-to-annual-salary-calculator',
  ],
  relatedGuides: ['date-planning-countdown-guide'],
  seo: { status: 'noindex', reviewStatus: 'pending', priority: 0 },
  publishedAt: 'DRAFT - NOT PUBLISHED',
};

export const timesheetEditorialNotes = {
  primaryQuery: 'time card calculator',
  userIntent: 'Calculate shift and weekly hours, including overnight shifts and decimal-hour totals.',
  title: 'Timesheets, Breaks, Overnight Shifts, and Decimal Hours',
  description:
    'Learn how to total a timesheet, handle an overnight shift, subtract entered breaks, and convert minutes to decimal hours.',
  suggestedInternalLinks: [
    '/calculators/time-card-calculator',
    '/calculators/decimal-hours-calculator',
    '/calculators/work-hours-calculator',
    '/guides/date-planning-countdown-guide',
  ],
  sources: [
    {
      label: 'U.S. Department of Labor, Fact Sheet #22: Hours Worked Under the FLSA',
      url: 'https://www.dol.gov/agencies/whd/fact-sheets/22-flsa-hours-worked',
      status: 'Retrieved; use only for explicitly U.S.-scoped legal context. The draft does not state a universal break rule.',
    },
    {
      label: 'NIST, SI Units - Time',
      url: 'https://www.nist.gov/pml/owm/si-units-time',
      status: 'Retrieved for time-unit reference; the minutes-to-decimal examples are independently calculated.',
    },
  ],
  factCheckNotes: [
    'Hand-check 21:30 to 06:15 as 525 elapsed minutes; less 30 entered minutes is 495 minutes, or 8.25 hours.',
    'Confirm current time-card calculator behavior for end-before-start and blank/incomplete entries.',
    'Review daylight-saving wording and local labor-law scope before publication.',
  ],
  ownerReview: [
    'Trim or retarget the detailed Work Hours and Scheduling section in the existing date-planning guide to prevent query overlap.',
    'Assign an author and a reviewer; do not characterize the guide as legal or payroll advice.',
  ],
};
