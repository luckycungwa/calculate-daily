import { CalculatorCategory, CategoryMeta } from '../types';

/**
 * Category metadata lives outside the catalogue so that headers, footers and
 * navigation can render without pulling in any calculator data.
 *
 * `description` is the one-line summary used for metadata and cards; `intro` is
 * the longer copy rendered on the category page itself. The intro has to stay
 * specific to what the category actually contains and to how those models
 * behave - a category page that only lists links is a thin page.
 */
export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'math',
    label: 'Math',
    description: 'Percentages, ratios, grades, and everyday arithmetic.',
    intro:
      'The maths tools share one property: you can check the answer by hand. Percentages and fractions sit beside descriptive statistics (mean, median, mode, variance, standard deviation, z-score, confidence interval), geometry (circle, triangle, slope, solid volume, distance) and number work (primes, factors, GCD and LCM, combinations). Each page names the formula it applies and carries one worked example with real numbers, so a rounded or simplified result can be traced back to the step that produced it.',
  },
  {
    id: 'finance',
    label: 'Finance & Money',
    description: 'Loans, savings, salaries, interest, and budgeting.',
    intro:
      'Money maths, with the assumptions kept on the page. Borrowing tools cover payment, amortization, refinance break-even, affordability and credit-card payoff; saving and growth tools cover compound interest, CAGR, present value, NPV and IRR; property tools cover closing costs, rental yield, cap rate and cash-on-cash return. Rates, fees and tax rates are values you enter rather than figures the site invents, because a payment is only as accurate as the rate behind it. Results are estimates of a model, not an offer from a lender.',
  },
  {
    id: 'health',
    label: 'Health & Fitness',
    description: 'BMI, calories, macros, heart rate, and wellness metrics.',
    intro:
      'Body composition, energy needs and screening-style ratios, built on published population formulas - Mifflin-St Jeor among them for basal metabolic rate. BMI, body fat, lean body mass, TDEE and calorie targets describe an average person with your measurements, so treat a result as a reference point rather than a personal assessment. Waist ratios, blood pressure, A1C and cholesterol tools turn a reading into a category using published thresholds; they cannot diagnose anything. Speak to a clinician before acting on a result that concerns you.',
  },
  {
    id: 'conversion',
    label: 'Unit Conversion',
    description: 'Temperature, length, weight, volume, currency, and more.',
    intro:
      'Conversions that are exact where the definition is exact and rounded where it is not. Length, mass, volume, area, speed, pressure, data storage and time are handled with defined factors, so the answer is reproducible to the digits shown. Cooking conversions are the exception that matters: a cup of flour is not a cup of water by weight, so those tools use a stated grams-per-cup figure. The currency converter requests live reference rates and states the date it received them.',
  },
  {
    id: 'time',
    label: 'Time & Schedule',
    description: 'Work hours, decimal time, and timeline planning.',
    intro:
      'Everything that turns a clock into a number. Work out a shift length or a whole timesheet between two times minus breaks, convert hours to decimal for payroll, add time blocks, and count days between dates with an age calculator that handles leap years. Time-zone conversion and Unix timestamps are handled in UTC first and then rendered in your browser zone, which is the step most hand calculations get wrong. Deadlines and countdowns use calendar days, not 24-hour blocks.',
  },
  {
    id: 'construction',
    label: 'Construction & DIY',
    description: 'Room area, concrete, paint, flooring, and lumber estimates.',
    intro:
      'Quantities from dimensions. Paint, tile, flooring, concrete, rebar, lumber, drywall, roofing, siding, stairs, insulation, wallpaper and epoxy all take a measured area or volume and add a waste allowance you choose, because the allowance decides the order. Outdoor and site work follows the same pattern for gravel, topsoil, mulch, sod, pavers, fence posts and decking, with energy sizing (BTU, solar array, generator) alongside. Coverage figures and waste percentages are stated on each page. Local codes and structural requirements are not modelled - confirm those with a licensed contractor.',
  },
  {
    id: 'food',
    label: 'Food & Cooking',
    description: 'Recipe scaling and per-serving meal costs.',
    intro:
      'Kitchen maths where an approximation is often good enough and sometimes is not. Scale a recipe by servings or by pan size, convert an ingredient between cups, tablespoons and grams using a stated density, convert oven temperatures between Celsius and Fahrenheit, and check dough hydration or a brine concentration by weight. Because a cup holds a different weight of flour and of butter, the weight-based tools name the grams-per-cup figure they use instead of assuming one universal conversion.',
  },
  {
    id: 'fitness',
    label: 'Sports & Strength',
    description: 'Running pace and one-rep-max strength estimates.',
    intro:
      'A small set of training and racing tools, each built on a named formula rather than a guess. Convert a run into pace per mile or kilometre, project an equivalent time at another distance, read a swim split per 100 metres, estimate a one-rep max from a lighter set, and build a golf Handicap Index from score differentials. Every one is a model of an average athlete: terrain, heat, altitude and fatigue are invisible to it, which is why the pages say how far to trust the number and where to stop.',
  },
  {
    id: 'tech',
    label: 'Developer & Tech',
    description: 'Subnets, number bases, screen density, URL encoding, and colour.',
    intro:
      'Utilities for the parts of web and systems work where a silent off-by-one is expensive. Subnet maths, number-base conversion, aspect ratio, pixels per inch, rem to pixels and CSS clamp resolve layout and network questions; contrast ratio, hex to RGB and URL encoding cover colour and links; password entropy, download time, video file size and AI token cost turn a spec into a number. Where a value depends on a specification, the page names the reference it follows and the units it expects.',
  },
  {
    id: 'science',
    label: 'Science & Physics',
    description: 'Motion, energy, electricity, and lab calculations.',
    intro:
      'Bench and circuit calculations where units do most of the damage. Molarity, dilution, pH, molecular weight, half-life and the ideal gas law cover lab work; specific heat and projectile motion cover mechanics; Ohm\'s law, voltage drop, wire sizing and resistor colour codes cover electrical work. Each page states the constants and unit conventions it uses, because a gas constant or a resistivity figure applied in the wrong units is the usual source of a wrong answer.',
  },
  {
    id: 'daily',
    label: 'Everyday Tools',
    description: 'Tips, bills, and daily life math.',
    intro:
      'The arithmetic of ordinary life: tips and bill splitting, discounts and sales tax, price per unit across package sizes, subscription totals, commute and parking costs, screen-time electricity, coffee ratios, alcohol units, shipping dimensional weight and word counts. Most of these are simple by design, so the value is in the assumptions being visible - a service charge already in the bill, a fuel price with the date it applied, a duty-free allowance left out on purpose.',
  },
  {
    id: 'misc',
    label: 'Automotive & Home',
    description: 'Fuel and electricity running costs.',
    intro:
      'Running costs for the things you own. Tire size comparison with the speedometer error it causes, car depreciation, trip and fuel cost, EV charging and household electricity, moving cost, plus speed-distance-time and the volume maths behind ponds, aquariums and fertilizer rates. Vehicle and energy figures use the inputs you supply - consumption, tariff, distance - so swapping your own numbers is the whole point of the tool.',
  },
];

export const CATEGORY_LABELS: Record<Exclude<CalculatorCategory, 'all' | 'ai'>, string> = {
  math: 'Math',
  finance: 'Finance & Money',
  health: 'Health & Fitness',
  conversion: 'Unit Conversion',
  time: 'Time & Schedule',
  construction: 'Construction & DIY',
  food: 'Food & Cooking',
  fitness: 'Sports & Strength',
  tech: 'Developer & Tech',
  science: 'Science & Physics',
  daily: 'Everyday Tools',
  misc: 'Automotive & Home',
};

export function getCategoryById(id: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
