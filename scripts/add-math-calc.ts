import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src/data/catalog/math.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.trimEnd();
if (content.endsWith('];')) {
  content = content.slice(0, -2).trimEnd();
}

function cfg(fields, results, formulaDescription, tips) {
  return JSON.stringify({ fields, results, formulaDescription, tips }).replace(/"/g, "'");
}

const entries = [];

entries.push(`  {
    id: 'gcd-lcm',
    slug: 'gcd-lcm-calculator',
    name: 'GCD & LCM Calculator',
    shortDesc: 'Find the greatest common divisor and least common multiple of two or more numbers.',
    tagline: 'Fundamental number theory at your fingertips.',
    category: 'math',
    iconName: 'Calculator',
    keywords: ['GCD calculator', 'LCM calculator', 'greatest common divisor', 'least common multiple', 'gcd lcm'],
    kind: 'config',
    config: {
      fields: [
        { id: 'a', label: 'Number A', type: 'number', defaultValue: 12, min: 1 },
        { id: 'b', label: 'Number B', type: 'number', defaultValue: 18, min: 1 },
      ],
      results: [
        { label: 'GCD', formulaCode: '(() => { let x = a, y = b; while (y) { [x, y] = [y, x % y]; } return x; })()', accent: true },
        { label: 'LCM', formulaCode: 'Math.abs(a * b) / (() => { let x = a, y = b; while (y) { [x, y] = [y, x % y]; } return x; })()' },
      ],
      formulaDescription: 'GCD via Euclidean algorithm; LCM = |A x B| / GCD(A, B)',
      tips: [
        'The Euclidean algorithm repeatedly replaces the larger number by the remainder.',
        'LCM is useful for finding common denominators when adding fractions.',
      ],
    },
    content: {
      intro: 'The GCD and LCM Calculator finds the Greatest Common Divisor and Least Common Multiple of two integers using the Euclidean algorithm. It is essential for simplifying fractions, scheduling, and number theory.',
      howItWorks: 'The Euclidean algorithm computes GCD by repeatedly replacing the larger number with the remainder until zero. LCM is calculated as |A x B| / GCD(A, B).',
      example: 'For 12 and 18: GCD = 6, LCM = (12 x 18) / 6 = 36.',
      formulas: [
        { label: 'Euclidean GCD', expression: 'GCD(a, b): while b != 0, (a, b) = (b, a mod b)' },
        { label: 'LCM from GCD', expression: 'LCM(a, b) = |a * b| / GCD(a, b)' },
      ],
      resultExplanations: [
        { resultLabel: 'GCD', explanation: 'The largest positive integer that divides both numbers without a remainder.' },
        { resultLabel: 'LCM', explanation: 'The smallest positive integer that is a multiple of both numbers.' },
      ],
      workflowLinks: [
        { slug: 'fraction-to-percent-calculator', step: 'Simplify fractions using the GCD.' },
        { slug: 'ratio-proportion-calculator', step: 'Apply GCD and LCM to ratio problems.' },
      ],
      faqs: [
        { q: 'What is the Greatest Common Divisor?', a: 'The GCD is the largest number that divides two or more integers without leaving a remainder. For example, GCD(12, 18) = 6.' },
        { q: 'What is LCM used for?', a: 'LCM is used when finding common denominators for fractions, scheduling recurring events, and solving gear-ratio problems.' },
        { q: 'Can GCD work with more than 2 numbers?', a: 'Yes. GCD(a, b, c) = GCD(GCD(a, b), c). Apply the algorithm iteratively.' },
      ],
      related: ['fraction-to-percent-calculator', 'ratio-proportion-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },
  }`);

const newContent = content + ',\n' + entries.join(',\n') + '\n];\n';
fs.writeFileSync(file, newContent, 'utf8');
console.log('Added ' + entries.length + ' new entries to math.ts');
