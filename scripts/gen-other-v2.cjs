const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'src/data/catalog/other.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.trimEnd().replace(/];\s*$/, '');

const data = require('./other-data-v2a.cjs');

function makeEntry(c) {
  const kwStr = c.keywords.map(k => `'${k}'`).join(', ');
  const fieldsStr = c.fields.map(f => {
    const extras = [];
    if (f.prefix) extras.push(`prefix: '${f.prefix}'`);
    if (f.suffix) extras.push(`suffix: '${f.suffix}'`);
    if (f.min !== undefined) extras.push(`min: ${f.min}`);
    if (f.max !== undefined) extras.push(`max: ${f.max}`);
    if (f.step !== undefined) extras.push(`step: ${f.step}`);
    const extraStr = extras.length ? ', ' + extras.join(', ') : '';
    return `        { id: '${f.id}', label: '${f.label}', type: 'number', defaultValue: ${f.defaultValue}${extraStr} }`;
  }).join(',\n');
  const resultsStr = c.results.map(r => {
    const extras = [];
    if (r.suffix) extras.push(`suffix: '${r.suffix}'`);
    if (r.accent) extras.push('accent: true');
    const extraStr = extras.length ? ', ' + extras.join(', ') : '';
    return `        { label: '${r.label}', formulaCode: '${r.formulaCode}'${extraStr} }`;
  }).join(',\n');
  const faqsStr = c.faqs.map(f =>
    `        { q: '${f.q}', a: '${f.a}' }`
  ).join(',\n');
  const workflowStr = c.workflow.map(w =>
    `        { slug: '${w[0]}', step: '${w[1]}' }`
  ).join(',\n');
  const relatedStr = c.related.map(r => `'${r}'`).join(', ');
  const tipsStr = c.tips.map(t => `      '${t}'`).join(',\n');

  return `  {
    id: '${c.id}',
    slug: '${c.slug}',
    name: '${c.name}',
    shortDesc: '${c.shortDesc}',
    tagline: '${c.tagline}',
    category: 'daily',
    iconName: '${c.icon}',
    keywords: [${kwStr}],
    kind: 'config',
    config: {
      fields: [
${fieldsStr}
      ],
      results: [
${resultsStr}
      ],
      formulaDescription: '${c.formulaDesc}',
      tips: [
${tipsStr}
      ],
    },
    content: {
      intro: '${c.intro}',
      howItWorks: '${c.howItWorks}',
      example: '${c.example}',
      formulas: [{ label: '${c.formulaLabel}', expression: '${c.formulaExpr}' }],
      resultExplanations: [
${c.resultExplanations.map(r => `        { resultLabel: '${r.label}', explanation: '${r.explanation}' }`).join(',\n')}
      ],
      workflowLinks: [
${workflowStr}
      ],
      faqs: [
${faqsStr}
      ],
      related: [${relatedStr}],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: ${c.priority} },
  }`;
}

const newEntries = data.map(makeEntry).join(',\n');
const result = content + newEntries + '\n];\n';
fs.writeFileSync(file, result);
console.log('Added ' + data.length + ' other calculators');
