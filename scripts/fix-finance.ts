import fs from 'fs';

let content = fs.readFileSync('src/data/catalog/finance.ts', 'utf8');

// Replace each inputs/compute block with config format
// Pattern: inputs: [...], compute: (vars) => { ... },
// We need to replace with: kind: 'config', config: { fields: [...], results: [...], formulaDescription: '...' }

const replacements = [
  { id: 'investment-roi', fields: [{id:'amount',label:'Investment Amount',type:'number',defaultValue:10000,min:0,prefix:'$'},{id:'rate',label:'Annual Return (%)',type:'number',defaultValue:8,min:0,suffix:'%'},{id:'years',label:'Years',type:'number',defaultValue:10,min:1}], results: [{label:'Future Value',formulaCode:'amount * Math.pow(1 + rate/100, years)',prefix:'$',accent:true},{label:'Total Interest',formulaCode:'amount * Math.pow(1 + rate/100, years) - amount',prefix:'$'}], desc: 'FV = PV x (1 + r)^n' },
  { id: 'simple-interest', fields: [{id:'principal',label:'Principal',type:'number',defaultValue:5000,min:0,prefix:'$'},{id:'rate',label:'Annual Rate (%)',type:'number',defaultValue:6,min:0,suffix:'%'},{id:'years',label:'Years',type:'number',defaultValue:3,min:1}], results: [{label:'Simple Interest',formulaCode:'principal * rate/100 * years',prefix:'$',accent:true},{label:'Total Amount',formulaCode:'principal + principal * rate/100 * years',prefix:'$'}], desc: 'I = P x R x T' },
  { id: 'compound-interest-fv', fields: [{id:'principal',label:'Present Value',type:'number',defaultValue:10000,min:0,prefix:'$'},{id:'rate',label:'Annual Rate (%)',type:'number',defaultValue:8,min:0,suffix:'%'},{id:'years',label:'Years',type:'number',defaultValue:10,min:1},{id:'compound',label:'Compounds/Year',type:'select',defaultValue:12,options:[{label:'Annually',value:1},{label:'Semi-annually',value:2},{label:'Quarterly',value:4},{label:'Monthly',value:12},{label:'Daily',value:365}]}], results: [{label:'Future Value',formulaCode:'principal * Math.pow(1 + rate/100/compound, compound * years)',prefix:'$',accent:true},{label:'Total Interest',formulaCode:'principal * Math.pow(1 + rate/100/compound, compound * years) - principal',prefix:'$'}], desc: 'FV = PV x (1 + r/n)^(nt)' },
  { id: 'present-value', fields: [{id:'futureValue',label:'Future Value',type:'number',defaultValue:50000,min:0,prefix:'$'},{id:'rate',label:'Annual Rate (%)',type:'number',defaultValue:5,min:0,suffix:'%'},{id:'years',label:'Years',type:'number',defaultValue:5,min:1}], results: [{label:'Present Value',formulaCode:'futureValue / Math.pow(1 + rate/100, years)',prefix:'$',accent:true}], desc: 'PV = FV / (1 + r)^n' },
  { id: 'effective-rate', fields: [{id:'nominal',label:'Nominal Rate (%)',type:'number',defaultValue:6,min:0,suffix:'%'},{id:'compound',label:'Compounds/Year',type:'select',defaultValue:12,options:[{label:'Annually',value:1},{label:'Semi-annually',value:2},{label:'Quarterly',value:4},{label:'Monthly',value:12},{label:'Daily',value:365}]}], results: [{label:'Effective Annual Rate',formulaCode:'(Math.pow(1 + nominal/100/compound, compound) - 1) * 100',suffix:'%',accent:true}], desc: 'EAR = (1 + r/n)^n - 1' },
  { id: 'rule-72', fields: [{id:'rate',label:'Annual Rate (%)',type:'number',defaultValue:8,min:0.1,suffix:'%'}], results: [{label:'Years to Double',formulaCode:'72 / rate',suffix:' years',accent:true}], desc: 'Years = 72 / rate' },
  { id: 'bond-yield', fields: [{id:'faceValue',label:'Face Value',type:'number',defaultValue:1000,min:0,prefix:'$'},{id:'coupon',label:'Annual Coupon',type:'number',defaultValue:60,min:0,prefix:'$'},{id:'price',label:'Market Price',type:'number',defaultValue:950,min:1,prefix:'$'}], results: [{label:'Current Yield',formulaCode:'coupon / price * 100',suffix:'%',accent:true},{label:'Discount/Premium',formulaCode:'price - faceValue',prefix:'$'}], desc: 'Yield = Coupon / Price x 100' },
  { id: 'loan-interest', fields: [{id:'principal',label:'Loan Amount',type:'number',defaultValue:20000,min:0,prefix:'$'},{id:'rate',label:'Annual Rate (%)',type:'number',defaultValue:5,min:0,suffix:'%'},{id:'years',label:'Loan Term (Years)',type:'number',defaultValue:5,min:1}], results: [{label:'Monthly Payment',formulaCode:'principal * (rate/100/12) * Math.pow(1+rate/100/12, years*12) / (Math.pow(1+rate/100/12, years*12)-1)',prefix:'$',accent:true},{label:'Total Interest',formulaCode:'(principal * (rate/100/12) * Math.pow(1+rate/100/12, years*12) / (Math.pow(1+rate/100/12, years*12)-1)) * years*12 - principal',prefix:'$'}], desc: 'Total interest = (monthly payment x months) - principal' },
  { id: 'loan-payoff', fields: [{id:'principal',label:'Loan Amount',type:'number',defaultValue:25000,min:0,prefix:'$'},{id:'rate',label:'Annual Rate (%)',type:'number',defaultValue:6,min:0,suffix:'%'},{id:'years',label:'Loan Term (Years)',type:'number',defaultValue:5,min:1}], results: [{label:'Monthly Payment',formulaCode:'principal * (rate/100/12) * Math.pow(1+rate/100/12, years*12) / (Math.pow(1+rate/100/12, years*12)-1)',prefix:'$',accent:true},{label:'Total Paid',formulaCode:'(principal * (rate/100/12) * Math.pow(1+rate/100/12, years*12) / (Math.pow(1+rate/100/12, years*12)-1)) * years*12',prefix:'$'}], desc: 'M = P x r(1+r)^n / ((1+r)^n - 1)' },
  { id: 'savings-future', fields: [{id:'monthly',label:'Monthly Contribution',type:'number',defaultValue:200,min:0,prefix:'$'},{id:'rate',label:'Annual Return (%)',type:'number',defaultValue:5,min:0,suffix:'%'},{id:'years',label:'Years',type:'number',defaultValue:10,min:1}], results: [{label:'Future Value',formulaCode:'monthly * ((Math.pow(1+rate/100/12, years*12)-1)/(rate/100/12))',prefix:'$',accent:true},{label:'Total Contributed',formulaCode:'monthly * years * 12',prefix:'$'}], desc: 'FV = PMT x ((1+r)^n - 1) / r' },
  { id: 'retirement-monthly', fields: [{id:'goal',label:'Retirement Goal',type:'number',defaultValue:1000000,min:0,prefix:'$'},{id:'rate',label:'Annual Return (%)',type:'number',defaultValue:7,min:0,suffix:'%'},{id:'years',label:'Years Until Retirement',type:'number',defaultValue:30,min:1}], results: [{label:'Monthly Savings Needed',formulaCode:'goal * (rate/100/12) / (Math.pow(1+rate/100/12, years*12)-1)',prefix:'$',accent:true},{label:'Total Contributed',formulaCode:'goal * (rate/100/12) / (Math.pow(1+rate/100/12, years*12)-1) * years*12',prefix:'$'}], desc: 'PMT = FV x r / ((1+r)^n - 1)' },
  { id: 'cagr', fields: [{id:'beginValue',label:'Beginning Value',type:'number',defaultValue:10000,min:0,prefix:'$'},{id:'endValue',label:'Ending Value',type:'number',defaultValue:25000,min:0,prefix:'$'},{id:'years',label:'Years',type:'number',defaultValue:5,min:1}], results: [{label:'CAGR',formulaCode:'(Math.pow(endValue/beginValue, 1/years) - 1) * 100',suffix:'%',accent:true}], desc: 'CAGR = (EV/BV)^(1/n) - 1' },
  { id: 'apr-to-apy', fields: [{id:'apr',label:'APR (%)',type:'number',defaultValue:5,min:0,suffix:'%'},{id:'compound',label:'Compounds/Year',type:'select',defaultValue:365,options:[{label:'Annually',value:1},{label:'Semi-annually',value:2},{label:'Quarterly',value:4},{label:'Monthly',value:12},{label:'Daily',value:365}]}], results: [{label:'APY',formulaCode:'(Math.pow(1 + apr/100/compound, compound) - 1) * 100',suffix:'%',accent:true}], desc: 'APY = (1 + r/n)^n - 1' },
  { id: 'debt-to-income', fields: [{id:'monthlyDebt',label:'Monthly Debt Payments',type:'number',defaultValue:2000,min:0,prefix:'$'},{id:'grossIncome',label:'Gross Monthly Income',type:'number',defaultValue:7000,min:1,prefix:'$'}], results: [{label:'DTI Ratio',formulaCode:'monthlyDebt / grossIncome * 100',suffix:'%',accent:true},{label:'Rating',formulaCode:'monthlyDebt / grossIncome * 100 <= 36 ? 1 : monthlyDebt / grossIncome * 100 <= 43 ? 2 : 3',format:'text'}], desc: 'DTI = Total Debt / Gross Income x 100' },
  { id: 'tip-calculator', fields: [{id:'bill',label:'Bill Amount',type:'number',defaultValue:50,min:0,prefix:'$'},{id:'tipPct',label:'Tip (%)',type:'number',defaultValue:20,min:0,suffix:'%'},{id:'split',label:'Split Between',type:'number',defaultValue:1,min:1}], results: [{label:'Tip Amount',formulaCode:'bill * tipPct / 100',prefix:'$',accent:true},{label:'Total with Tip',formulaCode:'bill + bill * tipPct / 100',prefix:'$'},{label:'Per Person',formulaCode:'(bill + bill * tipPct / 100) / split',prefix:'$'}], desc: 'Tip = Bill x Tip%' },
  { id: 'pay-raise', fields: [{id:'current',label:'Current Salary',type:'number',defaultValue:50000,min:0,prefix:'$'},{id:'raise',label:'Raise (%)',type:'number',defaultValue:8,min:0,suffix:'%'}], results: [{label:'New Salary',formulaCode:'current * (1 + raise/100)',prefix:'$',accent:true},{label:'Annual Increase',formulaCode:'current * raise/100',prefix:'$'},{label:'Monthly Increase',formulaCode:'current * raise/100 / 12',prefix:'$'}], desc: 'New Salary = Current x (1 + %)' },
  { id: 'salary-annual', fields: [{id:'rate',label:'Hourly Rate',type:'number',defaultValue:25,min:0,prefix:'$'},{id:'hours',label:'Hours per Week',type:'number',defaultValue:40,min:1}], results: [{label:'Annual Salary',formulaCode:'rate * hours * 52',prefix:'$',accent:true},{label:'Monthly Salary',formulaCode:'rate * hours * 52 / 12',prefix:'$'},{label:'Weekly Salary',formulaCode:'rate * hours',prefix:'$'}], desc: 'Annual = Rate x Hours x 52' },
  { id: 'hourly-rate', fields: [{id:'salary',label:'Annual Salary',type:'number',defaultValue:60000,min:0,prefix:'$'},{id:'hours',label:'Hours per Week',type:'number',defaultValue:40,min:1}], results: [{label:'Hourly Rate',formulaCode:'salary / (hours * 52)',prefix:'$',accent:true},{label:'Weekly Gross',formulaCode:'salary / 52',prefix:'$'}], desc: 'Hourly = Salary / (Hours x 52)' },
  { id: 'stock-avg', fields: [{id:'shares1',label:'Shares (Purchase 1)',type:'number',defaultValue:100,min:1},{id:'price1',label:'Price (Purchase 1)',type:'number',defaultValue:50,min:0.01,prefix:'$'},{id:'shares2',label:'Shares (Purchase 2)',type:'number',defaultValue:50,min:1},{id:'price2',label:'Price (Purchase 2)',type:'number',defaultValue:40,min:0.01,prefix:'$'}], results: [{label:'Average Cost/Share',formulaCode:'(shares1*price1 + shares2*price2) / (shares1 + shares2)',prefix:'$',accent:true},{label:'Total Cost',formulaCode:'shares1*price1 + shares2*price2',prefix:'$'}], desc: 'Avg = Total Cost / Total Shares' },
  { id: 'crypto-profit', fields: [{id:'buyPrice',label:'Buy Price',type:'number',defaultValue:30000,min:0,prefix:'$'},{id:'sellPrice',label:'Sell Price',type:'number',defaultValue:45000,min:0,prefix:'$'},{id:'quantity',label:'Quantity',type:'number',defaultValue:2,min:0}], results: [{label:'Profit/Loss',formulaCode:'(sellPrice - buyPrice) * quantity',prefix:'$',accent:true},{label:'Return %',formulaCode:'(sellPrice - buyPrice) / buyPrice * 100',suffix:'%'}], desc: 'Profit = (Sell - Buy) x Quantity' },
  { id: 'dividend-yield', fields: [{id:'annualDiv',label:'Annual Dividend/Share',type:'number',defaultValue:2,min:0,prefix:'$'},{id:'price',label:'Share Price',type:'number',defaultValue:50,min:0.01,prefix:'$'},{id:'investment',label:'Investment Amount',type:'number',defaultValue:10000,min:0,prefix:'$'}], results: [{label:'Dividend Yield',formulaCode:'annualDiv / price * 100',suffix:'%',accent:true},{label:'Annual Income',formulaCode:'annualDiv / price * investment',prefix:'$'}], desc: 'Yield = Dividend / Price x 100' },
  { id: 'depreciation', fields: [{id:'cost',label:'Asset Cost',type:'number',defaultValue:30000,min:0,prefix:'$'},{id:'salvage',label:'Salvage Value',type:'number',defaultValue:5000,min:0,prefix:'$'},{id:'life',label:'Useful Life (Years)',type:'number',defaultValue:5,min:1}], results: [{label:'Annual Depreciation',formulaCode:'(cost - salvage) / life',prefix:'$',accent:true},{label:'Monthly Depreciation',formulaCode:'(cost - salvage) / life / 12',prefix:'$'}], desc: 'Depreciation = (Cost - Salvage) / Life' },
  { id: 'inflation-adjusted', fields: [{id:'nominalReturn',label:'Nominal Return (%)',type:'number',defaultValue:8,min:0,suffix:'%'},{id:'inflation',label:'Inflation Rate (%)',type:'number',defaultValue:3,min:0,suffix:'%'}], results: [{label:'Real Return',formulaCode:'((1 + nominalReturn/100) / (1 + inflation/100) - 1) * 100',suffix:'%',accent:true}], desc: 'Real Return = (1 + r) / (1 + i) - 1' },
  { id: 'rule-of-114', fields: [{id:'rate',label:'Annual Rate (%)',type:'number',defaultValue:8,min:0.1,suffix:'%'}], results: [{label:'Years to Triple',formulaCode:'114 / rate',suffix:' years',accent:true}], desc: 'Years = 114 / rate' },
];

for (const r of replacements) {
  const inputPattern = new RegExp(`(\\{[^{}]*id: '${r.id}'[\\s\\S]*?)\\s*inputs:\\s*\\[[\\s\\S]*?\\],\\s*compute:\\s*\\(vars\\)\\s*=>\\s*\\{[\\s\\S]*?\\},`, 'm');
  
  const configFields = r.fields.map(f => {
    if (f.type === 'select') {
      return `        { id: '${f.id}', label: '${f.label}', type: 'select', defaultValue: ${f.defaultValue}, options: ${JSON.stringify(f.options)} },`;
    }
    return `        { id: '${f.id}', label: '${f.label}', type: 'number', defaultValue: ${f.defaultValue}, min: ${f.min}${f.prefix ? ", prefix: '" + f.prefix + "'" : ''}${f.suffix ? ", suffix: '" + f.suffix + "'" : ''} },`;
  }).join('\n');

  const configResults = r.results.map(res => {
    const fmt = res.format === 'text' ? `, format: 'text'` : '';
    return `        { label: '${res.label}', formulaCode: '${res.formulaCode}'${res.prefix ? ", prefix: '" + res.prefix + "'" : ''}${res.suffix ? ", suffix: '" + res.suffix + "'" : ''}${res.accent ? ', accent: true' : ''}${fmt} },`;
  }).join('\n');

  const replacement = `{
    id: '${r.id}',`;
  
  const configBlock = `    kind: 'config',
    config: {
      fields: [
${configFields}
      ],
      results: [
${configResults}
      ],
      formulaDescription: '${r.desc}',
    },`;
  
  // Simpler approach: find the block and replace it
  const blockPattern = new RegExp(`  \\{\\s*id: '${r.id}'[\\s\\S]*?seo:\\s*\\{[^}]*\\}\\s*\\},\\s*\\},`, 'm');
  const match = content.match(blockPattern);
  if (match) {
    // Extract the content part
    const contentPattern = new RegExp(`(  \\{\\s*id: '${r.id}'[\\s\\S]*?)(?:inputs:|seo:)[\\s\\S]*?(\\}\\s*\\}\\s*,)`, 'm');
    // Actually, let's do a simpler find and replace
  }
}

// Different approach: just replace all inputs/compute blocks with config blocks
for (const r of replacements) {
  const blockStart = content.indexOf(`id: '${r.id}'`);
  if (blockStart === -1) continue;
  
  const inputsIdx = content.indexOf('inputs: [', blockStart);
  const computeIdx = content.indexOf('compute: (vars)', blockStart);
  
  if (inputsIdx === -1 || computeIdx === -1) continue;
  
  // Find end of compute function - look for },\n    content:
  const contentIdx = content.indexOf('content: {', computeIdx);
  if (contentIdx === -1) continue;
  
  // Go back to find the start of the compute line
  let startReplace = inputsIdx;
  while (startReplace > 0 && content[startReplace - 1] === ' ') startReplace--;
  if (startReplace > 0 && content[startReplace - 1] === ',') startReplace--;
  
  const configFields = r.fields.map(f => {
    if (f.type === 'select') {
      return `        { id: '${f.id}', label: '${f.label}', type: 'select', defaultValue: ${f.defaultValue}, options: ${JSON.stringify(f.options)} },`;
    }
    return `        { id: '${f.id}', label: '${f.label}', type: 'number', defaultValue: ${f.defaultValue}, min: ${f.min}${f.prefix ? ", prefix: '" + f.prefix + "'" : ''}${f.suffix ? ", suffix: '" + f.suffix + "'" : ''} },`;
  }).join('\n');

  const configResults = r.results.map(res => {
    return `        { label: '${res.label}', formulaCode: '${res.formulaCode}'${res.prefix ? ", prefix: '" + res.prefix + "'" : ''}${res.suffix ? ", suffix: '" + res.suffix + "'" : ''}${res.accent ? ', accent: true' : ''} },`;
  }).join('\n');

  const replacement = `    kind: 'config',
    config: {
      fields: [
${configFields}
      ],
      results: [
${configResults}
      ],
      formulaDescription: '${r.desc}',
    },`;

  content = content.substring(0, startReplace) + replacement + content.substring(contentIdx - 1);
}

fs.writeFileSync('src/data/catalog/finance.ts', content);
console.log('Fixed finance.ts config blocks');
