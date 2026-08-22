const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'src/data/catalog/conversion.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.trimEnd().replace(/];\s*$/, '');

const data = [
  ['pounds-to-kg','pounds-to-kg-calculator','Pounds to Kilograms Converter','Convert pounds to kilograms instantly.','Most common weight conversion.','Weight','weight',['pounds to kg','pounds to kilograms','lbs to kg'],0.95],
  ['kg-to-lbs','kg-to-lbs-calculator','Kilograms to Pounds Converter','Convert kilograms to pounds instantly.','Metric to imperial weight.','Weight','weight',['kg to lbs','kilograms to pounds','convert kg'],0.9],
  ['celsius-fahrenheit','celsius-to-fahrenheit-calculator','Celsius to Fahrenheit Converter','Convert Celsius to Fahrenheit instantly.','Temperature made simple.','Thermometer','temperature',['celsius to fahrenheit','c to f','convert celsius'],0.95],
  ['fahrenheit-celsius','fahrenheit-to-celsius-calculator','Fahrenheit to Celsius Converter','Convert Fahrenheit to Celsius instantly.','Imperial to metric temperature.','Thermometer','temperature',['fahrenheit to celsius','f to c','convert fahrenheit'],0.9],
  ['inches-cm','inches-to-cm-calculator','Inches to Centimeters Converter','Convert inches to centimeters instantly.','Imperial to metric length.','Ruler','length',['inches to cm','inches to centimeters','convert inches'],0.95],
  ['cm-inches','cm-to-inches-calculator','Centimeters to Inches Converter','Convert centimeters to inches instantly.','Metric to imperial length.','Ruler','length',['cm to inches','centimeters to inches','convert cm'],0.9],
  ['feet-meters','feet-to-meters-calculator','Feet to Meters Converter','Convert feet to meters instantly.','Height and distance conversion.','Ruler','length',['feet to meters','ft to m'],0.95],
  ['meters-feet','meters-to-feet-calculator','Meters to Feet Converter','Convert meters to feet instantly.','Metric to imperial length.','Ruler','length',['meters to feet','m to ft'],0.9],
  ['miles-km','miles-to-km-calculator','Miles to Kilometers Converter','Convert miles to kilometers instantly.','Driving distance conversion.','Ruler','length',['miles to km','miles to kilometers'],0.95],
  ['km-miles','km-to-miles-calculator','Kilometers to Miles Converter','Convert kilometers to miles instantly.','Metric to imperial distance.','Ruler','length',['km to miles','kilometers to miles'],0.9],
  ['gallons-liters','gallons-to-liters-calculator','Gallons to Liters Converter','Convert gallons to liters instantly.','Fuel and volume conversion.','Box','volume',['gallons to liters','gallon to liter'],0.95],
  ['liters-gallons','liters-to-gallons-calculator','Liters to Gallons Converter','Convert liters to gallons instantly.','Metric to imperial volume.','Box','volume',['liters to gallons','liter to gallon'],0.9],
  ['ounces-grams','ounces-to-grams-calculator','Ounces to Grams Converter','Convert ounces to grams instantly.','Weight for cooking and fitness.','Weight','weight',['ounces to grams','oz to grams'],0.9],
  ['grams-ounces','grams-to-ounces-calculator','Grams to Ounces Converter','Convert grams to ounces instantly.','Metric to imperial weight.','Weight','weight',['grams to ounces','g to oz'],0.85],
  ['cups-ml','cups-to-ml-calculator','Cups to Milliliters Converter','Convert cups to milliliters instantly.','Kitchen volume conversion.','CupSoda','volume',['cups to ml','cup to ml'],0.9],
  ['tbsp-tsp','tablespoons-to-teaspoons-calculator','Tablespoons to Teaspoons Converter','Convert tablespoons to teaspoons instantly.','Cooking measurement helper.','CupSoda','volume',['tablespoons to teaspoons','tbsp to tsp'],0.85],
  ['pints-quarts','pints-to-quarts-calculator','Pints to Quarts Converter','Convert pints to quarts instantly.','US volume conversion.','Box','volume',['pints to quarts','pint to quart'],0.8],
  ['acres-sqft','acres-to-square-feet-calculator','Acres to Square Feet Converter','Convert acres to square feet instantly.','Land area conversion.','Square','area',['acres to square feet','acre to sq ft'],0.9],
  ['sqft-acres','square-feet-to-acres-calculator','Square Feet to Acres Converter','Convert square feet to acres instantly.','Area conversion made easy.','Square','area',['square feet to acres','sq ft to acres'],0.85],
  ['stone-pounds','stone-to-pounds-calculator','Stone to Pounds Converter','Convert stone to pounds instantly.','UK weight conversion.','Weight','weight',['stone to pounds','stone to lbs'],0.85],
  ['pounds-stone','pounds-to-stone-calculator','Pounds to Stone Converter','Convert pounds to stone instantly.','Imperial to UK weight.','Weight','weight',['pounds to stone','lbs to stone'],0.8],
  ['mb-gb','mb-to-gb-calculator','Megabytes to Gigabytes Converter','Convert MB to GB instantly.','Digital storage conversion.','HardDrive','digital',['mb to gb','megabytes to gigabytes'],0.9],
  ['gb-tb','gb-to-tb-calculator','Gigabytes to Terabytes Converter','Convert GB to TB instantly.','Storage conversion.','HardDrive','digital',['gb to tb','gigabytes to terabytes'],0.85],
  ['hours-minutes','hours-to-minutes-calculator','Hours to Minutes Converter','Convert hours to minutes instantly.','Time conversion made easy.','Clock','time-conv',['hours to minutes','hr to min'],0.9],
  ['days-hours','days-to-hours-calculator','Days to Hours Converter','Convert days to hours instantly.','Time unit conversion.','Clock','time-conv',['days to hours','day to hours'],0.85],
  ['weeks-days','weeks-to-days-calculator','Weeks to Days Converter','Convert weeks to days instantly.','How many days in a week.','CalendarClock','time-conv',['weeks to days','week to days'],0.85],
  ['months-days','months-to-days-calculator','Months to Days Converter','Convert months to days instantly.','Days in each month.','CalendarClock','time-conv',['months to days','how many days in a month'],0.85],
  ['years-days','years-to-days-calculator','Years to Days Converter','Convert years to days instantly.','Days in a year.','CalendarClock','time-conv',['years to days','how many days in a year'],0.9],
  ['mph-kph','mph-to-kph-calculator','MPH to KPH Converter','Convert miles per hour to km/h instantly.','Speed conversion.','Gauge','speed',['mph to kph','mph to kmh','miles per hour to km'],0.9],
  ['psi-bar','psi-to-bar-calculator','PSI to Bar Converter','Convert PSI to bar instantly.','Pressure conversion.','Gauge','pressure',['psi to bar','pressure conversion'],0.85],
];

function makeEntry(d) {
  const [id, slug, name, shortDesc, tagline, icon, unitGroup, keywords, priority] = d;
  const kwStr = keywords.map(k => `'${k}'`).join(', ');
  return `  {
    id: '${id}',
    slug: '${slug}',
    name: '${name}',
    shortDesc: '${shortDesc}',
    tagline: '${tagline}',
    category: 'conversion',
    iconName: '${icon}',
    keywords: [${kwStr}],
    kind: 'converter',
    unitGroup: '${unitGroup}',
    content: {
      intro: '${name} converts between units instantly using exact conversion factors.',
      howItWorks: 'The converter uses the exact conversion factor between the two units for precise results.',
      example: 'Enter any value and get an instant conversion result.',
      formulas: [{ label: 'Conversion', expression: 'Result = Input x Conversion Factor' }],
      resultExplanations: [{ resultLabel: 'Result', explanation: 'Your input expressed in the target unit.' }],
      workflowLinks: [{ slug: '${unitGroup}-converter', step: 'Convert between all ${unitGroup} units.' }],
      faqs: [
        { q: 'Is this conversion exact?', a: 'Yes, the conversion factors used are the internationally defined exact values.' },
        { q: 'Can I convert back the other direction?', a: 'Yes, swap the from and to units to convert in reverse.' },
      ],
      related: ['${unitGroup}-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: ${priority} },
  }`;
}

const newEntries = data.map(makeEntry).join(',\n');
const result = content + newEntries + '\n];\n';
fs.writeFileSync(file, result);
console.log('Added ' + data.length + ' converters');
