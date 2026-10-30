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
        { label: 'Hours Worked', formulaCode: '(function(){ var s = startHour * 60 + startMin; var e = endHour * 60 + endMin; if (e < s) { e += 1440; } return Math.max(0, e - s - breakMin) / 60; })()', suffix: 'hours', accent: true },
        { label: 'Minutes Worked', formulaCode: '(function(){ var s = startHour * 60 + startMin; var e = endHour * 60 + endMin; if (e < s) { e += 1440; } return Math.max(0, e - s - breakMin); })()', suffix: 'min' },
      ],
      formulaDescription: 'Hours = (End time - Start time - Break) in minutes / 60, with an end time earlier than the start treated as the next day',
      tips: [
        'Shifts that cross midnight are handled: 22:00 to 06:00 counts as 8 hours.',
        'Use the 24-hour clock so afternoon shifts are unambiguous.',
        'Subtract every unpaid break to match payroll.',
      ],
    },
    content: {
      intro:
        'The Work Hours Calculator computes the exact hours worked between a start and end time after subtracting breaks. Freelancers tracking time and employees checking pay stubs use it for accurate totals.',
      howItWorks:
        'Start and end times convert to total minutes since midnight, the break is subtracted, and the remainder is divided by 60 for decimal hours. The tool also reports the figure in minutes.',
      example:
        'Working 9:00 AM to 5:30 PM with a 30-minute lunch yields 8.0 hours: (1050 - 540 - 30) = 480 minutes, divided by 60.',
      formulas: [
        {
          label: 'Hours Worked',
          expression: 'Hours = (End âˆ’ Start âˆ’ Break) minutes / 60',
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
        { q: 'Does it handle overnight shifts?', a: 'Yes. If the end time is earlier than the start time, the calculator treats the shift as ending the next day.' },
        { q: 'Should breaks be included?', a: 'Only unpaid breaks should be subtracted. Paid 15-minute breaks stay within working hours.' },
      ],
      related: ['decimal-hours-calculator', 'days-to-weeks-calculator', 'hourly-to-annual-salary-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
      updatedAt: '2026-10-26',
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
      updatedAt: '2026-08-21',
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
      updatedAt: '2026-08-21',
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
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-08-22' },
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
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-08-22' },
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
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75, updatedAt: '2026-08-22' },
  },
  {
    id: 'time-adder',
    slug: 'time-adder',
    name: 'Time Adder',
    shortDesc: 'Add hours and minutes together.',
    tagline: 'Sum up your time blocks.',
    category: 'time',
    iconName: 'Clock',
    keywords: ['time adder', 'add time', 'add hours and minutes', 'time sum'],
    kind: 'config',
    config: {
      fields: [
        { id: 'hours1', label: 'Hours 1', type: 'number', defaultValue: 2, min: 0 },
        { id: 'minutes1', label: 'Minutes 1', type: 'number', defaultValue: 45, min: 0, max: 59 },
        { id: 'hours2', label: 'Hours 2', type: 'number', defaultValue: 1, min: 0 },
        { id: 'minutes2', label: 'Minutes 2', type: 'number', defaultValue: 30, min: 0, max: 59 }
      ],
      results: [
        { label: 'Total Minutes', formulaCode: '(hours1*60+minutes1)+(hours2*60+minutes2)', suffix: 'min', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Enter each time block separately.',
      'The calculator carries 60 minutes into 1 hour automatically.'
      ],
    },
    content: {
      intro: 'The Time Adder sums multiple time values expressed in hours and minutes. It handles carrying over 60 minutes into hours automatically.',
      howItWorks: 'Enter hours and minutes for each time block. The calculator totals them and carries any remainder over 60 minutes into the hours column.',
      example: '2h 45m + 1h 30m + 45m = 5h 0m.',
      formulas: [{ label: 'Sum', expression: 'Total minutes = sum(h*60+m), then convert back' }],
      resultExplanations: [
        { resultLabel: 'Total Minutes', explanation: 'The combined time expressed as total minutes.' }
      ],
      workflowLinks: [
        { slug: 'time-zone-converter', step: 'Convert the total to another time zone.' },
        { slug: 'weekly-hours-calculator', step: 'Count working hours for project timelines.' }
      ],
      faqs: [
        { q: 'Can I add more than 2 time blocks?', a: 'Yes. Enter as many blocks as needed. The calculator sums all of them.' },
        { q: 'Does it handle seconds?', a: 'This calculator works with hours and minutes. For precise timing, use the stopwatch tool.' },
        { q: 'Can I subtract time?', a: 'Enter negative values or use the time difference calculator for subtraction.' }
      ],
      related: ['time-zone-converter', 'weekly-hours-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-08-22' },
  },
  {
    id: 'timezone-converter',
    slug: 'time-zone-converter',
    name: 'Time Zone Converter',
    shortDesc: 'Convert a time between major world time zones.',
    tagline: 'Any time, any zone.',
    category: 'time',
    iconName: 'Globe',
    keywords: ['time zone converter', 'timezone calculator', 'world clock', 'time conversion'],
    kind: 'config',
    config: {
      fields: [
        { id: 'hours', label: 'Hours (0-23)', type: 'number', defaultValue: 10, min: 0, max: 23 },
        { id: 'minutes', label: 'Minutes', type: 'number', defaultValue: 0, min: 0, max: 59 },
        { id: 'sourceOffset', label: 'Source UTC Offset (hrs)', type: 'number', defaultValue: -5, min: -12, max: 14, step: 0.5 },
        { id: 'targetOffset', label: 'Target UTC Offset (hrs)', type: 'number', defaultValue: 0, min: -12, max: 14, step: 0.5 }
      ],
      results: [
        { label: 'Hour Difference', formulaCode: 'targetOffset - sourceOffset', suffix: 'hrs', accent: true }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Common offsets: EST=-5, CST=-6, MST=-7, PST=-8, GMT=0, CET=+1, JST=+9.',
      'DST may shift the offset by 1 hour.'
      ],
    },
    content: {
      intro: 'The Time Zone Converter converts a specific time between major world time zones. It accounts for daylight saving time automatically.',
      howItWorks: 'Enter the time and select the source and target time zones. The calculator applies the correct offset.',
      example: '10:00 AM EST converts to 3:00 PM GMT.',
      formulas: [{ label: 'Offset', expression: 'Target = Source + (TargetOffset - SourceOffset)' }],
      resultExplanations: [
        { resultLabel: 'Hour Difference', explanation: 'The offset between the source and target time zones.' }
      ],
      workflowLinks: [
        { slug: 'weekly-hours-calculator', step: 'Schedule meetings across time zones.' },
        { slug: 'sleep-cycle-calculator', step: 'Plan sleep around a target wake time.' }
      ],
      faqs: [
        { q: 'How do I find my UTC offset?', a: 'UTC offset is your hours ahead of or behind UTC. EST is UTC-5, GMT is UTC+0, JST is UTC+9.' },
        { q: 'Does this handle daylight saving?', a: 'Enter the current DST-adjusted offset. The calculator applies the difference between source and target offsets.' },
        { q: 'Can I convert between any two zones?', a: 'Yes. Enter the UTC offsets for both source and target zones.' }
      ],
      related: ['weekly-hours-calculator', 'sleep-cycle-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-10-26' },
  },
  {
    id: 'seconds-to-time',
    slug: 'seconds-to-time-calculator',
    name: 'Seconds to Time Converter',
    shortDesc: 'Convert seconds into hours, minutes, and seconds.',
    tagline: 'Break seconds into pieces.',
    category: 'time',
    iconName: 'Timer',
    keywords: ['seconds converter', 'seconds to hours', 'seconds to minutes', 'time converter'],
    kind: 'config',
    config: {
      fields: [
        { id: 'seconds', label: 'Seconds', type: 'number', defaultValue: 3661, min: 0 }
      ],
      results: [
        { label: 'Hours', formulaCode: 'Math.floor(seconds / 3600)', accent: true },
        { label: 'Minutes', formulaCode: 'Math.floor((seconds % 3600) / 60)' },
        { label: 'Seconds', formulaCode: 'seconds % 60' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'One hour = 3,600 seconds. One minute = 60 seconds.',
      'This is useful for video timestamps and athletic performance.'
      ],
    },
    content: {
      intro: 'The Seconds to Time Converter breaks a total number of seconds into hours, minutes, and seconds. It is useful for scheduling, video editing, and athletic timing.',
      howItWorks: 'Hours = floor(seconds / 3600). Minutes = floor((seconds % 3600) / 60). Remaining seconds = seconds % 60.',
      example: '3,661 seconds = 1 hour, 1 minute, 1 second.',
      formulas: [{ label: 'Convert', expression: 'h = floor(s/3600), m = floor(s%3600/60), sec = s%60' }],
      resultExplanations: [
        { resultLabel: 'Hours', explanation: 'The whole hours component.' },
        { resultLabel: 'Minutes', explanation: 'The remaining minutes after extracting hours.' },
        { resultLabel: 'Seconds', explanation: 'The remaining seconds after extracting hours and minutes.' }
      ],
      workflowLinks: [
        { slug: 'minutes-to-hours-calculator', step: 'Convert the minutes component further.' },
        { slug: 'time-zone-converter', step: 'Apply the converted time across zones.' }
      ],
      faqs: [
        { q: 'How many seconds are in an hour?', a: '3,600 seconds (60 minutes x 60 seconds).' },
        { q: 'Can I convert hours to seconds?', a: 'Yes. Multiply hours by 3,600, minutes by 60, then add all together.' },
        { q: 'What is this useful for?', a: 'Video editing, athletic timing, scheduling, and any context where time is measured in raw seconds.' }
      ],
      related: ['minutes-to-hours-calculator', 'time-zone-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-08-22' },
  },
  {
    id: 'minutes-to-hours',
    slug: 'minutes-to-hours-calculator',
    name: 'Minutes to Hours Calculator',
    shortDesc: 'Convert minutes to hours and minutes.',
    tagline: 'Minutes into hours instantly.',
    category: 'time',
    iconName: 'Clock',
    keywords: ['minutes to hours', 'convert minutes', 'minutes converter', 'time conversion'],
    kind: 'config',
    config: {
      fields: [
        { id: 'minutes', label: 'Minutes', type: 'number', defaultValue: 150, min: 0 }
      ],
      results: [
        { label: 'Hours', formulaCode: 'Math.floor(minutes / 60)', accent: true },
        { label: 'Remaining Minutes', formulaCode: 'minutes % 60' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'One hour = 60 minutes.',
      'This conversion is useful for payroll, scheduling, and time tracking.'
      ],
    },
    content: {
      intro: 'The Minutes to Hours Calculator converts a total number of minutes into hours and remaining minutes.',
      howItWorks: 'Hours = floor(minutes / 60). Remaining minutes = minutes % 60.',
      example: '150 minutes = 2 hours and 30 minutes.',
      formulas: [{ label: 'Convert', expression: 'h = floor(m/60), rem = m%60' }],
      resultExplanations: [
        { resultLabel: 'Hours', explanation: 'The whole hours portion.' },
        { resultLabel: 'Remaining Minutes', explanation: 'The leftover minutes after extracting full hours.' }
      ],
      workflowLinks: [
        { slug: 'seconds-to-time-calculator', step: 'Break down the minutes component further into seconds.' },
        { slug: 'weekly-hours-calculator', step: 'Convert working hours to days.' }
      ],
      faqs: [
        { q: 'How do I convert 90 minutes?', a: '90 / 60 = 1 hour with 30 minutes remaining.' },
        { q: 'Can I use this for decimal hours?', a: 'Yes. Divide minutes by 60 to get decimal hours. 90 minutes = 1.5 hours.' },
        { q: 'What is this useful for?', a: 'Payroll calculations, time tracking, project management, and scheduling.' }
      ],
      related: ['seconds-to-time-calculator', 'weekly-hours-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-08-22' },
  },
  {
    id: 'hours-until',
    slug: 'hours-until-calculator',
    name: 'Hours Until Calculator',
    shortDesc: 'Calculate hours between now and a future time.',
    tagline: 'How many hours until then?',
    category: 'time',
    iconName: 'Timer',
    keywords: ['hours until', 'time until', 'countdown hours', 'hours between times'],
    kind: 'config',
    config: {
      fields: [
        { id: 'currentHour', label: 'Current Hour (0-23)', type: 'number', defaultValue: 14, min: 0, max: 23 },
        { id: 'currentMinute', label: 'Current Minute', type: 'number', defaultValue: 0, min: 0, max: 59 },
        { id: 'targetHour', label: 'Target Hour (0-23)', type: 'number', defaultValue: 6, min: 0, max: 23 },
        { id: 'targetMinute', label: 'Target Minute', type: 'number', defaultValue: 0, min: 0, max: 59 },
        { id: 'daysAhead', label: 'Days Ahead', type: 'number', defaultValue: 1, min: 0, max: 30 }
      ],
      results: [
        { label: 'Hours Until', formulaCode: '(targetHour*60+targetMinute+daysAhead*1440-currentHour*60-currentMinute)/60', suffix: 'hrs', accent: true },
        { label: 'Remaining Minutes', formulaCode: '(targetHour*60+targetMinute+daysAhead*1440-currentHour*60-currentMinute)%60', suffix: 'min' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Set daysAhead to 0 if the target is today.',
      'If the target time has passed, the result will be 0.'
      ],
    },
    content: {
      intro: 'The Hours Until Calculator computes the number of hours between the current time and a target time. It is useful for countdowns, deadlines, and scheduling.',
      howItWorks: 'Subtract the current time from the target time in hours.',
      example: 'If it is now 2:00 PM and the target is 6:00 AM tomorrow, the result is 16 hours.',
      formulas: [{ label: 'Hours', expression: 'Hours = (Target - Now) / 60' }],
      resultExplanations: [
        { resultLabel: 'Hours Until', explanation: 'The whole hours remaining until the target time.' },
        { resultLabel: 'Remaining Minutes', explanation: 'The leftover minutes after extracting full hours.' }
      ],
      workflowLinks: [
        { slug: 'sleep-cycle-calculator', step: 'Plan sleep around your target wake time.' },
        { slug: 'weekly-hours-calculator', step: 'Count working hours until a deadline.' }
      ],
      faqs: [
        { q: 'What if the target time has already passed?', a: 'The calculator returns 0h 0m. Set the target to a future time.' },
        { q: 'Can I use this for deadlines?', a: 'Yes. Enter the deadline hour and minute as the target.' },
        { q: 'Does it handle multi-day differences?', a: 'Yes. Use the days-ahead field for targets more than one day away.' }
      ],
      related: ['sleep-cycle-calculator', 'weekly-hours-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-10-26' },
  },
  {
    id: 'weekly-hours',
    slug: 'weekly-hours-calculator',
    name: 'Weekly Hours Calculator',
    shortDesc: 'Track total hours worked per week.',
    tagline: 'Your weekly hour count.',
    category: 'time',
    iconName: 'Clock',
    keywords: ['weekly hours calculator', 'hours worked', 'weekly time tracker', 'work hours'],
    kind: 'config',
    config: {
      fields: [
        { id: 'mon', label: 'Monday', type: 'number', defaultValue: 8, min: 0, max: 24 },
        { id: 'tue', label: 'Tuesday', type: 'number', defaultValue: 8, min: 0, max: 24 },
        { id: 'wed', label: 'Wednesday', type: 'number', defaultValue: 8, min: 0, max: 24 },
        { id: 'thu', label: 'Thursday', type: 'number', defaultValue: 8, min: 0, max: 24 },
        { id: 'fri', label: 'Friday', type: 'number', defaultValue: 8, min: 0, max: 24 },
        { id: 'sat', label: 'Saturday', type: 'number', defaultValue: 0, min: 0, max: 24 },
        { id: 'sun', label: 'Sunday', type: 'number', defaultValue: 0, min: 0, max: 24 }
      ],
      results: [
        { label: 'Total Hours', formulaCode: 'mon+tue+wed+thu+fri+sat+sun', suffix: 'hrs', accent: true },
        { label: 'Daily Average', formulaCode: '(mon+tue+wed+thu+fri+sat+sun)/7', suffix: 'hrs/day' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'A standard full-time week is 40 hours.',
      'The average across 7 days gives a better picture of work-life balance.'
      ],
    },
    content: {
      intro: 'The Weekly Hours Calculator totals your working hours across a 7-day week. Enter hours for each day to get your weekly total and average.',
      howItWorks: 'Sum the hours entered for each day of the week.',
      example: 'Monday-Friday at 8 hours each = 40 hours per week.',
      formulas: [{ label: 'Sum', expression: 'Total = sum of all 7 days' }],
      resultExplanations: [
        { resultLabel: 'Total Hours', explanation: 'The total hours worked across all 7 days.' },
        { resultLabel: 'Daily Average', explanation: 'Average hours per day across the full week.' }
      ],
      workflowLinks: [
        { slug: 'work-hours-calculator', step: 'Convert weekly hours into an annual salary.' },
        { slug: 'work-hours-per-year-calculator', step: 'Check if you are exceeding standard hours.' }
      ],
      faqs: [
        { q: 'What is a standard work week?', a: 'A standard work week is 40 hours, typically Monday through Friday.' },
        { q: 'Does this include overtime?', a: 'It totals all hours. If your standard is 40 hours, any excess is overtime.' },
        { q: 'Can I use this for part-time work?', a: 'Yes. Enter the actual hours for each day, regardless of full-time or part-time status.' }
      ],
      related: ['work-hours-calculator', 'work-hours-per-year-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75, updatedAt: '2026-08-22' },
  },
  {
    id: 'sleep-hours',
    slug: 'sleep-hours-calculator',
    name: 'Sleep Hours Calculator',
    shortDesc: 'Calculate total sleep from bedtime to wake time.',
    tagline: 'How much did you actually sleep?',
    category: 'time',
    iconName: 'Moon',
    keywords: ['sleep hours', 'how many hours did i sleep', 'sleep time calculator', 'sleep duration'],
    kind: 'config',
    config: {
      fields: [
        { id: 'bedHour', label: 'Bedtime Hour (0-23)', type: 'number', defaultValue: 23, min: 0, max: 23 },
        { id: 'bedMinute', label: 'Bedtime Minute', type: 'number', defaultValue: 30, min: 0, max: 59 },
        { id: 'wakeHour', label: 'Wake Hour (0-23)', type: 'number', defaultValue: 7, min: 0, max: 23 },
        { id: 'wakeMinute', label: 'Wake Minute', type: 'number', defaultValue: 0, min: 0, max: 59 }
      ],
      results: [
        { label: 'Sleep Hours', formulaCode: 'Math.floor(((wakeHour*60+wakeMinute)-(bedHour*60+bedMinute)+(((wakeHour*60+wakeMinute)<=(bedHour*60+bedMinute))?1440:0))/60)', suffix: 'hrs', accent: true },
        { label: 'Sleep Minutes', formulaCode: '(((wakeHour*60+wakeMinute)-(bedHour*60+bedMinute)+(((wakeHour*60+wakeMinute)<=(bedHour*60+bedMinute))?1440:0))%60)', suffix: 'min' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'Most adults need 7-9 hours of sleep.',
      'Track your sleep duration over a week to find your average.'
      ],
    },
    content: {
      intro: 'The Sleep Hours Calculator computes the total hours and minutes between your bedtime and wake time.',
      howItWorks: 'Subtract bedtime from wake time. If wake is earlier in the day, add 24 hours to account for crossing midnight.',
      example: 'Bedtime 11:30 PM, wake 7:00 AM = 7 hours 30 minutes.',
      formulas: [{ label: 'Sleep', expression: 'Sleep = Wake - Bedtime (+ 24h if needed)' }],
      resultExplanations: [
        { resultLabel: 'Sleep Hours', explanation: 'The whole hours of sleep.' },
        { resultLabel: 'Sleep Minutes', explanation: 'The remaining minutes of sleep.' }
      ],
      workflowLinks: [
        { slug: 'sleep-cycle-calculator', step: 'Plan sleep around your target wake time.' },
        { slug: 'sleep-debt-calculator', step: 'Check if you are accumulating a deficit.' }
      ],
      faqs: [
        { q: 'How many hours of sleep do adults need?', a: 'Most adults need 7-9 hours per night. Individual needs vary.' },
        { q: 'Does this include time to fall asleep?', a: 'This measures the time in bed. Actual sleep time is typically 10-20 minutes less.' },
        { q: 'Can I use this for naps?', a: 'Yes. Enter the nap start and end times to get the duration.' }
      ],
      related: ['sleep-cycle-calculator', 'sleep-debt-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75, updatedAt: '2026-10-26' },
  },
  {
    id: 'add-days-to-date',
    slug: 'add-days-to-date',
    name: 'Add Days to Date Calculator',
    shortDesc: 'Find the date after adding a number of days.',
    tagline: 'Jump forward in time.',
    category: 'time',
    iconName: 'Calendar',
    keywords: ['add days to date', 'date calculator', 'future date', 'what date is'],
    kind: 'config',
    config: {
      fields: [
        { id: 'startMonth', label: 'Start Month (1-12)', type: 'number', defaultValue: 1, min: 1, max: 12 },
        { id: 'startDay', label: 'Start Day', type: 'number', defaultValue: 15, min: 1, max: 31 },
        { id: 'daysToAdd', label: 'Days to Add', type: 'number', defaultValue: 45, min: 0 }
      ],
      results: [
        { label: 'Result Month', formulaCode: 'new Date(2026,startMonth-1,startDay+daysToAdd).getMonth()+1', suffix: 'month', accent: true },
        { label: 'Result Day', formulaCode: 'new Date(2026,startMonth-1,startDay+daysToAdd).getDate()' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'The calculator handles month and year rollovers automatically.',
      'Use negative values to subtract days from a date.'
      ],
    },
    content: {
      intro: 'The Add Days to Date Calculator determines the date that falls a given number of days after a starting date. It handles month and year boundaries automatically.',
      howItWorks: 'Enter a starting date and the number of days to add. The calculator rolls over month and year boundaries.',
      example: 'January 15 + 45 days = March 1.',
      formulas: [{ label: 'Date', expression: 'New Date = Start Date + Days' }],
      resultExplanations: [
        { resultLabel: 'Result Month', explanation: 'The month of the resulting date.' },
        { resultLabel: 'Result Day', explanation: 'The day of the resulting date.' }
      ],
      workflowLinks: [
        { slug: 'weekly-hours-calculator', step: 'Count only working days between dates.' },
        { slug: 'hours-until-calculator', step: 'Find hours until the resulting date.' }
      ],
      faqs: [
        { q: 'Does it handle leap years?', a: 'Yes. The calculator uses the system Date object which accounts for leap years automatically.' },
        { q: 'Can I subtract days?', a: 'Enter a negative number to find a date in the past.' },
        { q: 'What happens if the start day exceeds the month?', a: 'The calculator rolls over to the next month automatically.' }
      ],
      related: ['weekly-hours-calculator', 'hours-until-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.75, updatedAt: '2026-08-22' },
  },
  {
    id: 'work-hours-per-year',
    slug: 'work-hours-per-year-calculator',
    name: 'Work Hours Per Year Calculator',
    shortDesc: 'Estimate your annual working hours.',
    tagline: 'Your annual work total.',
    category: 'time',
    iconName: 'Calendar',
    keywords: ['work hours per year', 'annual hours', 'yearly work hours', 'hours worked per year'],
    kind: 'config',
    config: {
      fields: [
        { id: 'weeklyHours', label: 'Weekly Hours', type: 'number', defaultValue: 40, min: 0, max: 80 },
        { id: 'vacationWeeks', label: 'Vacation Weeks', type: 'number', defaultValue: 2, min: 0, max: 12 },
        { id: 'holidays', label: 'Paid Holidays (days)', type: 'number', defaultValue: 10, min: 0, max: 30 }
      ],
      results: [
        { label: 'Hours Per Year', formulaCode: 'weeklyHours*52-vacationWeeks*weeklyHours-holidays*8', suffix: 'hrs', accent: true },
        { label: 'Days Per Year', formulaCode: '(weeklyHours*52-vacationWeeks*weeklyHours-holidays*8)/8', suffix: 'days' }
      ],
      formulaDescription: 'undefined',
      tips: [
      'A standard full-time worker puts in about 2,000 hours per year.',
      'Use this to compare job offers or negotiate hours.'
      ],
    },
    content: {
      intro: 'The Work Hours Per Year Calculator estimates the total number of hours you work in a year based on weekly hours, vacation weeks, and holidays.',
      howItWorks: 'Multiply weekly hours by 52, then subtract vacation and holiday hours.',
      example: '40 hours/week, 2 weeks vacation, 10 holidays: (40 x 52) - 80 - 80 = 1,920 hours.',
      formulas: [{ label: 'Annual', expression: 'Hours = (Weekly x 52) - Vacation - Holidays' }],
      resultExplanations: [
        { resultLabel: 'Hours Per Year', explanation: 'Your estimated annual working hours after vacation and holidays.' },
        { resultLabel: 'Days Per Year', explanation: 'Equivalent number of 8-hour work days.' }
      ],
      workflowLinks: [
        { slug: 'weekly-hours-calculator', step: 'Track weekly hours first.' },
        { slug: 'weekly-hours-calculator', step: 'Combine with salary for hourly rate.' }
      ],
      faqs: [
        { q: 'How many work hours in a year?', a: 'A standard full-time year is about 2,000 hours (40 hrs x 50 weeks).' },
        { q: 'Does this include overtime?', a: 'Enter your actual weekly hours including overtime for an accurate annual total.' },
        { q: 'How do part-time hours compare?', a: 'Part-time at 20 hours/week yields about 1,000 hours per year before deductions.' }
      ],
      related: ['weekly-hours-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7, updatedAt: '2026-08-22' },
  },
  {
    id: 'timesheet',
    slug: 'time-card-calculator',
    name: 'Weekly Timesheet Calculator',
    shortDesc: 'Total weekly shift hours, overtime, unpaid breaks, and estimated gross pay.',
    tagline: 'Add up a week of shifts and separate regular from overtime hours.',
    category: 'time',
    iconName: 'Clock',
    keywords: ['timesheet calculator', 'time card calculator', 'weekly time card', 'weekly hours and pay', 'overtime hours calculator'],
    kind: 'custom',
    componentId: 'TimesheetCalculator',
    content: {
      intro: 'The Weekly Timesheet Calculator totals up to seven daily shifts, subtracts unpaid breaks, and estimates regular hours, overtime, and gross pay. Overnight shifts are supported by treating an end time earlier than the start as the following day.',
      howItWorks: 'Each shift duration is calculated in minutes, adjusted for a midnight crossing, and reduced by the unpaid break. Weekly hours up to the entered threshold are paid at the base rate; additional hours use the overtime multiplier.',
      example: 'Five 09:00-17:00 shifts with 30-minute unpaid breaks total 37.5 hours; at 20 per hour, estimated gross pay is 750. A 45-hour week with a 40-hour threshold and 1.5 overtime multiplier estimates 950.',
      formulas: [
        { label: 'Shift Hours', expression: '(End − Start, plus 24 hours if overnight − unpaid break) / 60' },
        { label: 'Gross Pay', expression: '(Regular hours × rate) + (Overtime hours × rate × multiplier)' },
      ],
      resultExplanations: [
        { resultLabel: 'Weekly Total', explanation: 'The sum of each completed shift after unpaid breaks are removed.' },
        { resultLabel: 'Estimated Gross Pay', explanation: 'A simple estimate using your entered weekly overtime threshold and multiplier, before taxes or other deductions.' },
      ],
      workflowLinks: [
        { slug: 'work-hours-calculator', step: 'Calculate a single shift in more detail.' },
        { slug: 'salary-to-hourly-calculator', step: 'Compare an hourly rate with an annual salary.' },
      ],
      faqs: [
        { q: 'Does the timesheet handle overnight shifts?', a: 'Yes. If an end time is earlier than the start time, the calculator treats the shift as crossing midnight.' },
        { q: 'How is overtime calculated?', a: 'This tool applies overtime only to weekly hours above your entered threshold. Legal rules vary by location and may also count daily overtime.' },
        { q: 'Should I subtract paid breaks?', a: 'No. Enter only unpaid break minutes; paid breaks remain part of the hours worked.' },
        { q: 'What if the break is longer than the shift?', a: 'The calculator shows a validation message rather than producing a negative shift duration.' },
      ],
      related: ['work-hours-calculator', 'weekly-hours-calculator', 'salary-to-hourly-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-10-26' },
  },
  {
    id: 'unix-timestamp',
    slug: 'unix-timestamp-converter',
    name: 'Unix Timestamp Converter',
    shortDesc: 'Convert Unix epoch seconds or milliseconds to UTC ISO 8601 strings and local browser dates.',
    tagline: 'Translate epoch timestamps into readable human date formats instantly.',
    category: 'time',
    iconName: 'Clock',
    keywords: ['unix timestamp converter', 'epoch converter', 'unix time converter', 'epoch to date', 'timestamp to date', 'epoch timestamp'],
    kind: 'custom',
    componentId: 'UnixTimestampCalculator',
    content: {
      intro: 'The Unix Timestamp Converter translates Unix epoch time (the number of seconds or milliseconds elapsed since January 1, 1970 UTC) into standard ISO 8601 UTC date-time representations and localized browser time.',
      howItWorks: 'The numeric epoch input is validated against valid JavaScript date ranges (-100,000,000 to +100,000,000 days). Seconds are scaled by 1,000 into milliseconds. A UTC ISO string is generated alongside local time adjusted for your browser time zone and daylight-saving offset.',
      example: 'A timestamp of 1700000000 seconds converts to 2023-11-14T22:13:20.000Z in UTC and provides the corresponding local time for your region.',
      formulas: [
        { label: 'Milliseconds to Seconds', expression: 'Seconds = Floor(Milliseconds / 1000)' },
        { label: 'Epoch Time Basis', expression: 'Elapsed time since 1970-01-01T00:00:00.000Z' },
      ],
      resultExplanations: [
        { resultLabel: 'UTC ISO 8601', explanation: 'The universal, standardized date and time string in UTC without timezone bias.' },
        { resultLabel: 'Local browser time', explanation: 'The date and time formatted for your device current timezone and locale.' },
      ],
      workflowLinks: [
        { slug: 'date-difference-calculator', step: 'Calculate elapsed days, months, and years between converted dates.' },
        { slug: 'days-until-calculator', step: 'Count down to an upcoming timestamp milestone.' },
      ],
      faqs: [
        { q: 'What is Unix epoch time?', a: 'Unix time is a system for tracking time as a single running count of seconds that have passed since 00:00:00 UTC on 1 January 1970 (the Unix epoch).' },
        { q: 'What is the Year 2038 problem?', a: 'Older 32-bit systems store timestamps as signed 32-bit integers, which overflow on 19 January 2038. Modern 64-bit platforms and this browser tool support dates billions of years in the future.' },
        { q: 'How do I know if my timestamp is in seconds or milliseconds?', a: '10-digit timestamps (e.g. 1700000000) are in seconds; 13-digit timestamps (e.g. 1700000000000) are in milliseconds.' },
      ],
      related: ['date-difference-calculator', 'time-card-calculator', 'days-until-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-10-26' },
  }
];
