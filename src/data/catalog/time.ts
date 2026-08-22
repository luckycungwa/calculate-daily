import { CalculatorMeta } from '../../types';

export const TIME_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'work-hours',
    slug: 'work-hours-calculator',
    name: 'Work Hours Calculator',
    shortDesc: 'Calculate total hours worked between start and end times minus breaks.',
    tagline: 'Know your exact shift length and hours.',
    category: 'time',
    iconName: 'Clock',
    badge: 'Workplace',
    keywords: ['work hours', 'hours calculator', 'time clock', 'shift hours', 'hours worked', 'break time', 'payroll hours'],
    kind: 'config',
    config: {
      fields: [
        { id: 'startHour', label: 'Start Hour (0-23)', type: 'number', defaultValue: 9, min: 0, max: 23 },
        { id: 'startMin', label: 'Start Minutes', type: 'number', defaultValue: 0, min: 0, max: 59 },
        { id: 'endHour', label: 'End Hour (0-23)', type: 'number', defaultValue: 17, min: 0, max: 23 },
        { id: 'endMin', label: 'End Minutes', type: 'number', defaultValue: 30, min: 0, max: 59 },
        { id: 'breakMin', label: 'Break Duration', type: 'number', defaultValue: 30, min: 0, suffix: 'min' },
      ],
      results: [
        { label: 'Hours Worked', formulaCode: '((endHour * 60 + endMin) - (startHour * 60 + startMin) - breakMin) / 60', suffix: 'hours', accent: true },
        { label: 'Minutes Worked', formulaCode: '(endHour * 60 + endMin) - (startHour * 60 + startMin) - breakMin', suffix: 'min' },
      ],
      formulaDescription: 'Hours = (End time - Start time - Break) in minutes / 60',
      tips: [
        'Use the 24-hour clock so afternoon shifts do not underflow.',
        'Subtract every unpaid break to match payroll.',
      ],
    },
    content: {
      intro:
        'The Work Hours Calculator computes the exact hours worked between a start and end time after subtracting breaks. Freelancers tracking time and employees checking pay stubs use it for accurate totals.',
      howItWorks:
        'Start and end times convert to total minutes since midnight, the break is subtracted, and the remainder is divided by 60 for decimal hours. The tool also reports the figure in minutes.',
      example:
        'Working 9:00 AM to 5:30 PM with a 30-minute lunch yields 8.0 hours: (510 - 540 + 30) converted and divided by 60.',
      formulas: [
        {
          label: 'Hours Worked',
          expression: 'Hours = (End − Start − Break) minutes / 60',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Hours Worked',
          explanation:
            'The total paid time in decimal hours between start and end, after subtracting unpaid breaks.',
        },
        {
          resultLabel: 'Minutes Worked',
          explanation:
            'The same total expressed in minutes, useful for payroll systems that track exact minutes.',
        },
      ],
      workflowLinks: [
        { slug: 'decimal-hours-calculator', step: 'Convert the result into the decimal form payroll uses.' },
        { slug: 'hourly-to-annual-salary-calculator', step: 'Turn hours worked into income projections.' },
      ],
      faqs: [
        { q: 'How do I calculate hours worked by hand?', a: 'Convert both times to minutes since midnight, subtract the break, then divide by 60. For example, 9 to 5:30 with a 30-minute lunch is 8 hours.' },
        { q: 'Does it handle overnight shifts?', a: 'Not automatically. For overnight work, add 24 hours to the end time or split the shift into two segments.' },
        { q: 'Should breaks be included?', a: 'Only unpaid breaks should be subtracted. Paid 15-minute breaks stay within working hours.' },
      ],
      related: ['decimal-hours-calculator', 'days-to-weeks-calculator', 'hourly-to-annual-salary-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
    },
  },
  {
    id: 'decimal-hours',
    slug: 'decimal-hours-calculator',
    name: 'Decimal Hours Converter',
    shortDesc: 'Convert hours and minutes into decimal hours instantly.',
    tagline: 'Time in payroll decimal form, ready to bill.',
    category: 'time',
    iconName: 'Timer',
    keywords: ['decimal hours', 'hours and minutes', 'convert minutes to decimal', 'time to decimal', 'payroll time'],
    kind: 'config',
    config: {
      fields: [
        { id: 'hours', label: 'Hours', type: 'number', defaultValue: 7, min: 0, suffix: 'hr' },
        { id: 'minutes', label: 'Minutes', type: 'number', defaultValue: 45, min: 0, max: 59, suffix: 'min' },
      ],
      results: [
        { label: 'Decimal Hours', formulaCode: 'hours + minutes / 60', suffix: 'hrs', accent: true },
        { label: 'Total Minutes', formulaCode: 'hours * 60 + minutes', suffix: 'min' },
      ],
      formulaDescription: 'Decimal hours = Hours + Minutes / 60',
      tips: [
        'Payroll often bills in quarter-hour (0.25) or tenth-hour (0.1) increments.',
        '30 minutes is 0.5 hours; 45 minutes is 0.75 hours.',
      ],
    },
    content: {
      intro:
        'The Decimal Hours Converter turns hours and minutes into the decimal form used on timesheets and invoices. It is essential for anyone who bills time or processes payroll.',
      howItWorks:
        'Minutes divide by 60 to become a fraction of an hour and add to the whole hours. The tool also returns total minutes for cross-checking.',
      example:
        'Seven hours and 45 minutes converts to 7.75 decimal hours, or 465 total minutes.',
      formulas: [
        {
          label: 'Decimal Hours',
          expression: 'Decimal = Hours + Minutes / 60',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Decimal Hours',
          explanation:
            'The time in the base-10 form used by payroll and invoicing, where 7:45 becomes 7.75.',
        },
        {
          resultLabel: 'Total Minutes',
          explanation:
            'The complete duration in minutes, a quick cross-check for billing accuracy.',
        },
      ],
      workflowLinks: [
        { slug: 'work-hours-calculator', step: 'Compute total shift hours before converting to decimal.' },
        { slug: 'hourly-to-annual-salary-calculator', step: 'Multiply decimal hours by your rate for pay.' },
      ],
      faqs: [
        { q: 'How do I convert minutes to decimal hours?', a: 'Divide the minutes by 60. Fifteen minutes is 0.25 hours, 30 minutes is 0.5, and 45 minutes is 0.75.' },
        { q: 'Why does payroll use decimal time?', a: 'Decimal time makes wage multiplication simple, avoiding the awkwardness of base-60 arithmetic in invoices.' },
        { q: 'How many decimal hours is 8 hours 20 minutes?', a: '20 minutes is 0.333 hours, so the total is approximately 8.33 decimal hours.' },
      ],
      related: ['work-hours-calculator', 'days-to-weeks-calculator', 'hourly-to-annual-salary-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.65,
    },
  },
  {
    id: 'days-weeks',
    slug: 'days-to-weeks-calculator',
    name: 'Days to Weeks & Months',
    shortDesc: 'Convert a day count into weeks and months instantly.',
    tagline: 'Timelines in the units you actually plan with.',
    category: 'time',
    iconName: 'CalendarDays',
    keywords: ['days to weeks', 'days to months', 'days calculator', 'weeks to days', 'time period', 'timeline'],
    kind: 'config',
    config: {
      fields: [
        { id: 'days', label: 'Number of Days', type: 'number', defaultValue: 90, min: 1 },
      ],
      results: [
        { label: 'Weeks', formulaCode: 'days / 7', suffix: 'weeks' },
        { label: 'Months (avg)', formulaCode: 'days / 30.44', suffix: 'months', accent: true },
        { label: 'Years', formulaCode: 'days / 365', suffix: 'years' },
      ],
      formulaDescription: 'Weeks = Days / 7; Months = Days / 30.44',
      tips: [
        'A month averages 30.44 days across the calendar year.',
        'For exact calendar math, count the specific start and end dates.',
      ],
    },
    content: {
      intro:
        'The Days to Weeks & Months converter translates a day count into weeks, months, and years. Project planning, savings challenges, and countdowns all benefit from seeing a number in familiar time units.',
      howItWorks:
        'Weeks are days divided by 7. Months use the average month length of 30.44 days, derived from 365.25 days across 12 months, which is accurate for planning horizons.',
      example:
        '90 days equals 12.9 weeks, or roughly 3.0 months, useful for a savings challenge or a project timeline.',
      formulas: [
        {
          label: 'Weeks',
          expression: 'Weeks = Days / 7',
        },
        {
          label: 'Months',
          expression: 'Months = Days / 30.44',
          note: 'Average month length across the calendar year.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Weeks',
          explanation:
            'The day count broken into 7-day weeks.',
        },
        {
          resultLabel: 'Months (avg)',
          explanation:
            'The day count in average calendar months, using 30.44 days per month for planning.',
        },
      ],
      workflowLinks: [
        { slug: 'work-hours-calculator', step: 'Plan a schedule in exact working hours.' },
        { slug: 'decimal-hours-calculator', step: 'Convert planning time into billing-friendly decimal form.' },
      ],
      faqs: [
        { q: 'How many weeks are in 30 days?', a: '30 days divided by 7 equals about 4.3 weeks. Calendar months vary between 4 and 4.4 weeks.' },
        { q: 'Why is a month 30.44 days?', a: 'It is the average calendar month length: 365.25 days divided by 12. It smooths over months with 28 to 31 days.' },
        { q: 'Is this exact for calendar dates?', a: 'For exact date math, compare the specific start and end dates. This converter is best for estimating time horizons.' },
      ],
      related: ['work-hours-calculator', 'decimal-hours-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.6,
    },
  },
  {
    id: 'age',
    slug: 'age-calculator',
    name: 'Age Calculator',
    shortDesc: 'Calculate your exact age in years, months, and days with zodiac sign and next birthday countdown.',
    tagline: 'Your precise age down to the day.',
    category: 'time',
    iconName: 'CalendarDays',
    badge: 'Date & Time',
    keywords: ['age calculator', 'how old am I', 'birthday calculator', 'age in years months days', 'next birthday'],
    kind: 'custom',
    componentId: 'AgeCalculator',
    content: {
      intro: 'The Age Calculator converts a date of birth into years, months, and days. It also shows total days lived, zodiac sign, and how many days until your next birthday.',
      howItWorks: 'The calculator uses UTC date math to count exact years, months, and days between your birth date and today. Zodiac sign is determined from birth month and day.',
      example: 'Someone born on June 15, 2000 is exactly 26 years old with 3 months and 5 days. Total days lived: about 9,600.',
      formulas: [{ label: 'Age', expression: 'Years = today.year - birth.year; adjust if month/day have not passed yet' }],
      resultExplanations: [
        { resultLabel: 'Age (Years, Months, Days)', explanation: 'Your exact age broken into calendar units.' },
        { resultLabel: 'Next Birthday', explanation: 'Days remaining until your next birthday, or celebration day if today is your birthday.' },
      ],
      workflowLinks: [
        { slug: 'date-difference-calculator', step: 'Calculate the exact gap between any two dates.' },
        { slug: 'days-until-calculator', step: 'Count down to any future event.' },
      ],
      faqs: [
        { q: 'How is age calculated in months?', a: 'Months are counted as full calendar months between your birth date and today. If your birthday has passed this year, months start from your last birthday.' },
        { q: 'What is my zodiac sign?', a: 'Zodiac signs are based on birth month and day. The calculator determines your sun sign from the standard Western zodiac date ranges.' },
        { q: 'Does it handle leap year birthdays?', a: 'Yes. If born on February 29, the calculator uses March 1 for non-leap years to keep the count accurate.' },
      ],
      related: ['date-difference-calculator', 'days-until-calculator', 'days-to-weeks-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'date-difference',
    slug: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    shortDesc: 'Find the exact number of days, weeks, months, and business days between any two dates.',
    tagline: 'Precise calendar and business day counts.',
    category: 'time',
    iconName: 'ArrowRightLeft',
    badge: 'Date & Time',
    keywords: ['date difference', 'days between dates', 'business days calculator', 'how many days between', 'date calculator'],
    kind: 'custom',
    componentId: 'DateDifferenceCalculator',
    content: {
      intro: 'The Date Difference Calculator counts the exact time between any two dates. It shows total days, weeks and days, years, months, and business days (weekdays only).',
      howItWorks: 'Both dates are parsed to UTC. Total days = (end - start) / 86400000. Weeks and remaining days use integer division. Business days iterate through the range counting Mon-Fri.',
      example: 'From January 1 to March 15, 2026: 73 total days, 10 weeks and 3 days, 0 years 2 months 14 days, 53 business days.',
      formulas: [{ label: 'Total Days', expression: 'Total Days = (End Date - Start Date) / 86400000' }],
      resultExplanations: [
        { resultLabel: 'Total Days', explanation: 'The raw day count between the two dates.' },
        { resultLabel: 'Business Days', explanation: 'Weekdays only (Mon-Fri), excluding weekends.' },
      ],
      workflowLinks: [
        { slug: 'age-calculator', step: 'Calculate your exact age from a date of birth.' },
        { slug: 'days-until-calculator', step: 'Count down to a specific future date.' },
      ],
      faqs: [
        { q: 'Are weekends included in the count?', a: 'Total days includes all calendar days. Business days exclude Saturdays and Sundays.' },
        { q: 'Does it count holidays?', a: 'No. Business days are Monday through Friday only. Public holidays are not excluded.' },
        { q: 'Can I calculate backward?', a: 'If the start date is after the end date, the calculator shows the difference in reverse.' },
      ],
      related: ['age-calculator', 'days-until-calculator', 'days-to-weeks-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'days-until',
    slug: 'days-until-calculator',
    name: 'Days Until Calculator',
    shortDesc: 'Count down to any future event. See how many days, weeks, and months remain until your target date.',
    tagline: 'Your countdown in calendar units.',
    category: 'time',
    iconName: 'Timer',
    badge: 'Date & Time',
    keywords: ['days until', 'countdown calculator', 'days until christmas', 'days until birthday', 'how many days left'],
    kind: 'custom',
    componentId: 'DaysUntilCalculator',
    content: {
      intro: 'The Days Until Calculator counts down from today to any target date. It shows days remaining, weeks, and the day of week your target falls on.',
      howItWorks: 'The target date is compared to today at midnight UTC. If the target is in the past, it shows how many days ago it was. If today, it shows a celebration message.',
      example: 'If today is August 21, 2026 and the target is December 25, 2026, there are 126 days until Christmas, about 18 weeks.',
      formulas: [{ label: 'Days Until', expression: 'Days = floor((Target Date - Today) / 86400000)' }],
      resultExplanations: [
        { resultLabel: 'Days Remaining', explanation: 'Calendar days from today until the target date.' },
        { resultLabel: 'Weeks', explanation: 'The same period in weeks, useful for planning.' },
      ],
      workflowLinks: [
        { slug: 'age-calculator', step: 'See your complete age breakdown from date of birth.' },
        { slug: 'date-difference-calculator', step: 'Compare any two dates in detail.' },
      ],
      faqs: [
        { q: 'What happens if the date is in the past?', a: 'The calculator shows how many days ago the date was, along with weeks.' },
        { q: 'Is today counted?', a: 'If the target date is today, the calculator shows a celebration message with 0 days remaining.' },
        { q: 'Does it account for time zones?', a: 'All comparisons use midnight UTC to keep calculations consistent regardless of your local time zone.' },
      ],
      related: ['age-calculator', 'date-difference-calculator', 'days-to-weeks-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75 },
  },
];