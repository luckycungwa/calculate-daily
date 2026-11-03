import { Guide } from '../../../types';

export const scientificCalculatorGuide: Guide = {
  id: 'scientific-calculator-guide',
  slug: 'how-to-use-a-scientific-calculator',
  name: 'How to Use a Scientific Calculator: Degrees, Radians, Logs and Notation',
  shortDesc:
    'A practical walkthrough of the functions that actually get used — angle modes, logs and powers, scientific notation, and how many digits to write down.',
  category: 'math',
  iconName: 'Calculator',
  keywords: [
    'how to use a scientific calculator',
    'scientific calculator guide',
    'what is a scientific calculator',
    'degrees vs radians',
    'scientific notation on calculator',
    'scientific calculator functions',
    'ee button',
    'log vs ln',
  ],
  content: {
    hook:
      'Most people use a fraction of what a scientific calculator can do, and the functions they skip are the ones that cause wrong answers: an angle mode left in radians, an exponent typed as two separate numbers, an answer copied with more precision than the measurement had. This guide covers the handful of functions that matter and the mistakes they cause.',
    sections: [
      {
        heading: 'What makes a calculator "scientific"?',
        body: [
          'A basic calculator performs the four operations in the order you press the keys. A scientific calculator instead evaluates a whole expression using standard mathematical precedence: brackets first, then powers, then multiplication and division, then addition and subtraction. That is why 2 + 3 × 4 gives 14 rather than 20.',
          'The second difference is the function set: trigonometry, logarithms, powers, roots, factorials and constants such as π and e. Those are the operations that appear in science and engineering coursework, and they are what the extra keys are for.',
          'Everything on this site runs in the browser, so the same rules apply to the online scientific calculator as to a physical device — with one advantage: you can type sin(30)^2 + 4! as a single line instead of chaining button presses.',
        ],
        callout:
          'Order of operations is the single biggest source of wrong answers when people move from a basic calculator to a scientific one. Use brackets whenever you are unsure.',
      },
      {
        heading: 'Degrees or radians: check the mode before you trust a trigonometry result',
        body: [
          'Sine, cosine and tangent take an angle, and an angle can be measured in degrees or radians. The number you type is the same; the meaning is not. In degree mode sin(30) is 0.5. In radian mode the calculator reads 30 as 30 radians, which is about -0.988.',
          'A full circle is 360 degrees or 2π radians, so one radian is roughly 57.3 degrees. Radians are the natural unit in calculus and physics — sin(pi/2) is exactly 1 — while degrees are what most people visualise.',
          'The inverse functions follow the mode too. asin(0.5) returns 30 in degree mode and about 0.5236 in radian mode. If a result looks plausible but slightly wrong, the angle mode is the first thing to check.',
        ],
        callout:
          'A calculator with a DEG or RAD indicator on screen is telling you something. Read it before entering any trigonometry, and set it back for the next person.',
      },
      {
        heading: 'Scientific notation: the e key is not Euler\u2019s number',
        body: [
          'Scientific notation writes a value as a mantissa between 1 and 10 multiplied by a power of ten: 0.00042 becomes 4.2 × 10⁻⁴. The calculator shorthand for that is 4.2e-4, where the e means "times ten to the power of".',
          'That letter is overloaded. On the same keypad e also stands for Euler\u2019s number, about 2.71828, which is the base of the natural logarithm. The display convention is what separates them: a number immediately before the e — 4.2e-4 — is scientific notation, while a standalone e is the constant.',
          'When you type a large or small value, use the exponent form rather than counting zeros. 6.02e23 is unambiguous; 602000000000000000000000 invites a miscount, and many calculators will silently round it anyway. The scientific notation calculator converts between the forms and checks the exponent arithmetic.',
        ],
      },
      {
        heading: 'Logs, powers and roots without mixing them up',
        body: [
          'There are two logarithm keys and they use different bases. log is base 10: log(100) = 2 because 10² = 100. ln is base e: ln(e) = 1. Choosing the wrong one usually produces a plausible-looking number, which is why it survives marking.',
          'Powers and roots are inverses of each other. Squaring a number multiplies it by itself; the square root undoes that. 12² = 144 and √144 = 12. The same relationship holds for cubes: 3³ = 27 and ∛27 = 3.',
          'Powers are right-associative, so 2^3^2 means 2^(3^2) = 2⁹ = 512, not (2³)² = 64. If you want the second reading, write the brackets yourself. Negative signs are similarly easy to misplace: -2² is -4, while (-2)² is 4.',
        ],
      },
      {
        heading: 'How many digits should you actually write down?',
        body: [
          'A calculator will happily print twelve digits for a measurement that supports two. Significant figures are the digits that carry real information, and the answer can only be as precise as the least precise input.',
          'The counting rules are simple: non-zero digits count, zeros between them count, leading zeros never count, and trailing zeros after a decimal point count because someone chose to write them. That means 0.00450 has three significant figures and 1.230 has four.',
          'A whole number ending in zeros with no decimal point is ambiguous — 1200 could be two significant figures or four — so write it as 1.2 × 10³ or 1.200 × 10³ if the precision matters. For multiplication and division, round the final answer to the fewest significant figures among the inputs. For addition and subtraction, match decimal places instead.',
        ],
        callout:
          'Round once, at the end. Rounding at every intermediate step accumulates error and can change the last digit of the answer.',
      },
      {
        heading: 'Five mistakes worth checking before you submit',
        body: [
          'Leaving the angle mode in radians after a calculus question, then answering a triangulation question in the same session.',
          'Typing a negative exponent as a subtraction: 2.5e-3 is 0.0025, but 2.5e - 3 evaluates to -0.4975 if the e is not followed by the exponent digits.',
          'Trusting an unclosed bracket. A calculator that evaluates a partial expression will give you an answer to a question you did not ask.',
          'Copying every displayed digit into a lab report. Report the significant figures the measurement supports, not the ones the screen offers.',
          'Forgetting that percentages and fractions have their own keys. 15% of 240 is 36, and entering 15 ÷ 100 × 240 works, but the percent key removes the chance of a misplaced decimal.',
        ],
      },
    ],
    conclusion:
      'A scientific calculator rewards a two-second check: is the angle mode right, is the expression complete, and how precise is the answer allowed to be? Those three questions prevent most of the errors that survive into submitted work. Use the calculators below to practise each step.',
  },
  faqs: [
    {
      q: 'Why does my calculator give a different answer for sin(30)?',
      a: 'The angle mode differs. In degree mode sin(30) is 0.5; in radian mode the input is read as 30 radians, which is about -0.988. Look for a DEG or RAD indicator on the display and switch it to match the question.',
    },
    {
      q: 'How do I type scientific notation on a calculator?',
      a: 'Enter the mantissa, then the e or EE key, then the exponent: 4.2e-4 means 4.2 × 10⁻⁴. Do not type the multiplication sign and a separate 10 — the exponent has to stay attached to the number.',
    },
    {
      q: 'What is the difference between log and ln?',
      a: 'log is the base-10 logarithm, so log(100) = 2. ln is the natural logarithm with base e, so ln(e) = 1. Using the wrong one gives a plausible but incorrect answer, so check which base the problem uses.',
    },
    {
      q: 'How many significant figures should I write in my answer?',
      a: 'For multiplication and division, use the fewest significant figures in any input. For addition and subtraction, use the fewest decimal places. Round only the final answer, and use the significant figures calculator to count the digits in each measurement.',
    },
    {
      q: 'Does the order I press the keys matter?',
      a: 'On a scientific calculator that evaluates expressions, no — precedence is applied for you. On a basic calculator, yes: it computes as you press, so 2 + 3 × 4 gives 20 unless you use brackets. Knowing which type you are holding prevents most entry errors.',
    },
  ],
  embeddedCalculators: [
    'scientific-calculator',
    'scientific-notation-calculator',
    'significant-figures-calculator',
  ],
  relatedCalculators: [
    'fraction-calculator',
    'exponent-root-calculator',
    'rounding-calculator',
    'graphing-calculator',
  ],
  relatedGuides: ['understanding-percentages-guide'],
  seo: {
    status: 'index',
    reviewStatus: 'reviewed',
    priority: 0.8,
    updatedAt: '2026-10-31',
    title: 'How to Use a Scientific Calculator — Degrees, Radians, Logs & Notation',
    description:
      'A practical guide to scientific calculator functions: DEG vs RAD, log vs ln, powers and roots, typing scientific notation with the e key, and how many significant figures to report.',
  },
  publishedAt: '2026-10-31',
};
