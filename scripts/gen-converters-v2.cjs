const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'src/data/catalog/conversion.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.trimEnd().replace(/];\s*$/, '');

const data = require('./converter-data-v2a.cjs')
  .concat(require('./converter-data-v2b.cjs'))
  .concat(require('./converter-data-v2c.cjs'))
  .concat(require('./converter-data-v2d.cjs'))
  .concat(require('./converter-data-v2e.cjs'))
  .concat(require('./converter-data-v2f.cjs'))
  .concat(require('./converter-data-v2g.cjs'));

function makeEntry(d) {
  const kwStr = d.keywords.map(k => `'${k}'`).join(', ');
  const faqsStr = d.faqs.map(f =>
    `        { q: '${f.q}', a: '${f.a}' }`
  ).join(',\n');
  const relatedStr = d.related.map(r => `'${r}'`).join(', ');
  const workflowStr = d.workflow.map(w =>
    `        { slug: '${w[0]}', step: '${w[1]}' }`
  ).join(',\n');

  return `  {
    id: '${d.id}',
    slug: '${d.slug}',
    name: '${d.name}',
    shortDesc: '${d.shortDesc}',
    tagline: '${d.tagline}',
    category: 'conversion',
    iconName: '${d.icon}',
    keywords: [${kwStr}],
    kind: 'converter',
    unitGroup: '${d.unitGroup}',
    content: {
      intro: '${d.intro}',
      howItWorks: '${d.howItWorks}',
      example: '${d.example}',
      formulas: [{ label: '${d.formulaLabel}', expression: '${d.formulaExpr}', note: '${d.formulaNote}' }],
      resultExplanations: [{ resultLabel: '${d.resultLabel}', explanation: '${d.resultExplanation}' }],
      workflowLinks: [
${workflowStr}
      ],
      faqs: [
${faqsStr}
      ],
      related: [${relatedStr}],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: ${d.priority} },
  }`;
}

const newEntries = data.map(makeEntry).join(',\n');
const result = content + newEntries + '\n];\n';
fs.writeFileSync(file, result);
console.log('Added ' + data.length + ' converters');
