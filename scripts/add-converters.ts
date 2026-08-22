import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src/data/catalog/conversion.ts');
let content = fs.readFileSync(file, 'utf8');

content = content.trimEnd();
if (content.endsWith('];')) {
  content = content.slice(0, -2).trimEnd();
}

const converters = [
  { id: 'pounds-to-kg', slug: 'pounds-to-kg-calculator', name: 'Pounds to Kilograms Converter', unitGroup: 'weight', defaultFrom: 'lb', defaultTo: 'kg', icon: 'Weight', keywords: ['pounds to kg','pounds to kilograms','lbs to kg'], priority: 0.95 },
  { id: 'kg-to-lbs', slug: 'kg-to-lbs-calculator', name: 'Kilograms to Pounds Converter', unitGroup: 'weight', defaultFrom: 'kg', defaultTo: 'lb', icon: 'Weight', keywords: ['kg to lbs','kg to pounds','kilograms to pounds'], priority: 0.9 },
  { id: 'celsius-fahrenheit', slug: 'celsius-to-fahrenheit-calculator', name: 'Celsius to Fahrenheit Converter', unitGroup: 'temperature', defaultFrom: 'C', defaultTo: 'F', icon: 'Thermometer', keywords: ['celsius to fahrenheit','c to f','convert celsius'], priority: 0.95 },
  { id: 'fahrenheit-celsius', slug: 'fahrenheit-to-celsius-calculator', name: 'Fahrenheit to Celsius Converter', unitGroup: 'temperature', defaultFrom: 'F', defaultTo: 'C', icon: 'Thermometer', keywords: ['fahrenheit to celsius','f to c','convert fahrenheit'], priority: 0.9 },
  { id: 'inches-cm', slug: 'inches-to-cm-calculator', name: 'Inches to Centimeters Converter', unitGroup: 'length', defaultFrom: 'in', defaultTo: 'cm', icon: 'Ruler', keywords: ['inches to cm','inches to centimeters','convert inches'], priority: 0.95 },
  { id: 'cm-inches', slug: 'cm-to-inches-calculator', name: 'Centimeters to Inches Converter', unitGroup: 'length', defaultFrom: 'cm', defaultTo: 'in', icon: 'Ruler', keywords: ['cm to inches','centimeters to inches','convert cm'], priority: 0.9 },
  { id: 'feet-meters', slug: 'feet-to-meters-calculator', name: 'Feet to Meters Converter', unitGroup: 'length', defaultFrom: 'ft', defaultTo: 'm', icon: 'Ruler', keywords: ['feet to meters','ft to m','how many feet in a mile'], priority: 0.95 },
  { id: 'meters-feet', slug: 'meters-to-feet-calculator', name: 'Meters to Feet Converter', unitGroup: 'length', defaultFrom: 'm', defaultTo: 'ft', icon: 'Ruler', keywords: ['meters to feet','m to ft','convert meters'], priority: 0.9 },
  { id: 'miles-km', slug: 'miles-to-km-calculator', name: 'Miles to Kilometers Converter', unitGroup: 'length', defaultFrom: 'mi', defaultTo: 'km', icon: 'Ruler', keywords: ['miles to km','miles to kilometers','convert miles'], priority: 0.95 },
  { id: 'km-miles', slug: 'km-to-miles-calculator', name: 'Kilometers to Miles Converter', unitGroup: 'length', defaultFrom: 'km', defaultTo: 'mi', icon: 'Ruler', keywords: ['km to miles','kilometers to miles','convert km'], priority: 0.9 },
  { id: 'gallons-liters', slug: 'gallons-to-liters-calculator', name: 'Gallons to Liters Converter', unitGroup: 'volume', defaultFrom: 'gal', defaultTo: 'l', icon: 'Box', keywords: ['gallons to liters','gallon to liter','convert gallons'], priority: 0.95 },
  { id: 'liters-gallons', slug: 'liters-to-gallons-calculator', name: 'Liters to Gallons Converter', unitGroup: 'volume', defaultFrom: 'l', defaultTo: 'gal', icon: 'Box', keywords: ['liters to gallons','liter to gallon','convert liters'], priority: 0.9 },
  { id: 'ounces-grams', slug: 'ounces-to-grams-calculator', name: 'Ounces to Grams Converter', unitGroup: 'weight', defaultFrom: 'oz', defaultTo: 'g', icon: 'Weight', keywords: ['ounces to grams','oz to grams','convert ounces'], priority: 0.9 },
  { id: 'grams-ounces', slug: 'grams-to-ounces-calculator', name: 'Grams to Ounces Converter', unitGroup: 'weight', defaultFrom: 'g', defaultTo: 'oz', icon: 'Weight', keywords: ['grams to ounces','g to oz','convert grams'], priority: 0.85 },
  { id: 'cups-ml', slug: 'cups-to-ml-calculator', name: 'Cups to Milliliters Converter', unitGroup: 'volume', defaultFrom: 'cup', defaultTo: 'ml', icon: 'CupSoda', keywords: ['cups to ml','cup to ml','convert cups'], priority: 0.9 },
  { id: 'tbsp-tsp', slug: 'tablespoons-to-teaspoons-calculator', name: 'Tablespoons to Teaspoons Converter', unitGroup: 'volume', defaultFrom: 'tbsp', defaultTo: 'tsp', icon: 'CupSoda', keywords: ['tablespoons to teaspoons','tbsp to tsp','cooking conversion'], priority: 0.85 },
  { id: 'pints-quarts', slug: 'pints-to-quarts-calculator', name: 'Pints to Quarts Converter', unitGroup: 'volume', defaultFrom: 'pint', defaultTo: 'quart', icon: 'Box', keywords: ['pints to quarts','pint to quart','volume conversion'], priority: 0.8 },
  { id: 'acres-sqft', slug: 'acres-to-square-feet-calculator', name: 'Acres to Square Feet Converter', unitGroup: 'area', defaultFrom: 'ac', defaultTo: 'ft2', icon: 'Square', keywords: ['acres to square feet','acre to sq ft','land area'], priority: 0.9 },
  { id: 'sqft-acres', slug: 'square-feet-to-acres-calculator', name: 'Square Feet to Acres Converter', unitGroup: 'area', defaultFrom: 'ft2', defaultTo: 'ac', icon: 'Square', keywords: ['square feet to acres','sq ft to acres','convert area'], priority: 0.85 },
  { id: 'stone-pounds', slug: 'stone-to-pounds-calculator', name: 'Stone to Pounds Converter', unitGroup: 'weight', defaultFrom: 'st', defaultTo: 'lb', icon: 'Weight', keywords: ['stone to pounds','stone to lbs','convert stone'], priority: 0.85 },
  { id: 'pounds-stone', slug: 'pounds-to-stone-calculator', name: 'Pounds to Stone Converter', unitGroup: 'weight', defaultFrom: 'lb', defaultTo: 'st', icon: 'Weight', keywords: ['pounds to stone','lbs to stone','weight conversion'], priority: 0.8 },
  { id: 'mb-gb', slug: 'mb-to-gb-calculator', name: 'Megabytes to Gigabytes Converter', unitGroup: 'digital', defaultFrom: 'mb', defaultTo: 'gb', icon: 'HardDrive', keywords: ['mb to gb','megabytes to gigabytes','file size'], priority: 0.9 },
  { id: 'gb-tb', slug: 'gb-to-tb-calculator', name: 'Gigabytes to Terabytes Converter', unitGroup: 'digital', defaultFrom: 'gb', defaultTo: 'tb', icon: 'HardDrive', keywords: ['gb to tb','gigabytes to terabytes','storage conversion'], priority: 0.85 },
  { id: 'hours-minutes', slug: 'hours-to-minutes-calculator', name: 'Hours to Minutes Converter', unitGroup: 'time-conv', defaultFrom: 'hr', defaultTo: 'min', icon: 'Clock', keywords: ['hours to minutes','hr to min','time conversion'], priority: 0.9 },
  { id: 'days-hours', slug: 'days-to-hours-calculator', name: 'Days to Hours Converter', unitGroup: 'time-conv', defaultFrom: 'day', defaultTo: 'hr', icon: 'Clock', keywords: ['days to hours','day to hour','time conversion'], priority: 0.85 },
  { id: 'weeks-days', slug: 'weeks-to-days-calculator', name: 'Weeks to Days Converter', unitGroup: 'time-conv', defaultFrom: 'week', defaultTo: 'day', icon: 'CalendarClock', keywords: ['weeks to days','week to days','how many days in a week'], priority: 0.85 },
  { id: 'months-days', slug: 'months-to-days-calculator', name: 'Months to Days Converter', unitGroup: 'time-conv', defaultFrom: 'month', defaultTo: 'day', icon: 'CalendarClock', keywords: ['months to days','how many days in a month','days in month'], priority: 0.85 },
  { id: 'years-days', slug: 'years-to-days-calculator', name: 'Years to Days Converter', unitGroup: 'time-conv', defaultFrom: 'year', defaultTo: 'day', icon: 'CalendarClock', keywords: ['years to days','how many days in a year','days in a year'], priority: 0.9 },
  { id: 'mph-kph', slug: 'mph-to-kph-calculator', name: 'MPH to KPH Converter', unitGroup: 'speed', defaultFrom: 'mph', defaultTo: 'kmh', icon: 'Gauge', keywords: ['mph to kph','mph to kmh','miles per hour to km'], priority: 0.9 },
  { id: 'psi-bar', slug: 'psi-to-bar-calculator', name: 'PSI to Bar Converter', unitGroup: 'pressure', defaultFrom: 'psi', defaultTo: 'bar', icon: 'Gauge', keywords: ['psi to bar','psi to bars','pressure conversion'], priority: 0.85 },
];

function makeConverter(c) {
  const fromLabel = c.defaultFrom;
  const toLabel = c.defaultTo;
  const fromName = c.name.replace(' Converter', '').split(' to ')[0];
  const toName = c.name.replace(' Converter', '').split(' to ')[1];
  return `  {
    id: '${c.id}',
    slug: '${c.slug}',
    name: '${c.name}',
    shortDesc: 'Convert ${fromName} to ${toName} instantly with this free online converter.',
    tagline: '${c.name} made simple.',
    category: 'conversion',
    iconName: '${c.icon}',
    keywords: [${c.keywords.map(k => "'" + k + "'").join(', ')}],
    kind: 'converter',
    unitGroup: '${c.unitGroup}',
    defaultFrom: '${c.defaultFrom}',
    defaultTo: '${c.defaultTo}',
    content: {
      intro: 'The ${c.name} converts ${fromName.toLowerCase()} to ${toName.toLowerCase()} instantly using exact conversion factors. Whether you are cooking, traveling, or working on a project, this tool gives you an accurate result.',
      howItWorks: 'The converter uses the exact conversion factor between the two units, normalizing through the base unit of the group for precise results in either direction.',
      example: 'Enter any value and get an instant conversion. The result updates as you type, with no button press needed.',
      formulas: [{ label: 'Conversion', expression: 'Result = Input x Conversion Factor', note: 'Uses the exact factor between the two units.' }],
      resultExplanations: [{ resultLabel: '${toName}', explanation: 'Your input expressed in ${toName.toLowerCase()} using the exact conversion factor.' }],
      workflowLinks: [{ slug: '${c.unitGroup}-converter', step: 'Convert between all ${c.unitGroup} units.' }],
      faqs: [
        { q: 'Is this conversion exact?', a: 'Yes, the conversion factors used are the internationally defined exact values.' },
        { q: 'Can I convert back the other direction?', a: 'Yes, swap the from and to units to convert in reverse.' },
        { q: 'Do I need to press a button?', a: 'No, the result updates instantly as you type.' },
      ],
      related: ['${c.unitGroup}-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: ${c.priority} },
  }`;
}

const newEntries = converters.map(makeConverter).join(',\n');
const result = content + ',\n' + newEntries + ',\n];\n';
fs.writeFileSync(file, result);
console.log('Added ' + converters.length + ' specific converters to conversion.ts');
