const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'src/data/catalog/finance.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.trimEnd().replace(/];\s*$/, '');

const calcs = require('./finance-data.cjs').concat(require('./finance-data2.cjs'));

function makeEntry(c) {
  const kwStr = c.keywords.map(k => `'${k}'`).join(', ');
  const fieldsStr = c.fields.map(f => {
    const extras = [];
    if (f.prefix) extras.push(`prefix: '${f.prefix}'`);
    if (f.suffix) extras.push(`suffix: '${f.suffix}'`);
    if (f.min !== undefined) extras.push(`min: ${f.min}`);
    const extraStr = extras.length ? ', ' + extras.join(', ') : '';
    return `        { id: '${f.id}', label: '${f.label}', type: 'number', defaultValue: ${f.defaultValue}${extraStr} }`;
  }).join(',\n');
  const resultsStr = c.results.map(r => {
    const extras = [];
    if (r.prefix) extras.push(`prefix: '${r.prefix}'`);
    if (r.suffix) extras.push(`suffix: '${r.suffix}'`);
    if (r.accent) extras.push('accent: true');
    const extraStr = extras.length ? ', ' + extras.join(', ') : '';
    return `        { label: '${r.label}', formulaCode: '${r.formulaCode}'${extraStr} }`;
  }).join(',\n');
  return `  {
    id: '${c.id}',
    slug: '${c.slug}',
    name: '${c.name}',
    shortDesc: '${c.short}',
    tagline: '${c.name} made simple.',
    category: 'finance',
    iconName: 'Calculator',
    keywords: [${kwStr}],
    kind: 'config',
    config: {
      fields: [
${fieldsStr}
      ],
      results: [
${resultsStr}
      ],
      formulaDescription: '${c.desc}',
    },
    content: {
      intro: 'The ${c.name} uses the standard financial formula. It gives you an instant result for financial planning.',
      howItWorks: 'Enter your values and the calculator applies the formula instantly, showing the result with a clear explanation.',
      example: 'Enter your values to see an instant result based on the formula.',
      formulas: [{ label: 'Formula', expression: '${c.desc}' }],
      resultExplanations: [{ resultLabel: 'Result', explanation: 'The calculated value based on your inputs.' }],
      workflowLinks: [{ slug: 'finance-calculators', step: 'Browse all finance tools.' }],
      faqs: [
        { q: 'Is this accurate?', a: 'Yes, it uses the standard financial formula recognized by economists and banks.' },
        { q: 'Can I use this for planning?', a: 'Yes, this is a standard planning tool. Always consult a financial advisor for major decisions.' },
      ],
      related: ['finance-calculators'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  }`;
}

const newEntries = calcs.map(makeEntry).join(',\n');
const result = content + newEntries + '\n];\n';
fs.writeFileSync(file, result);
console.log('Added ' + calcs.length + ' finance calculators');
