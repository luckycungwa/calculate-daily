import { CalculatorMeta } from '../../types';

export const CONVERSION_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'oz-cups',
    slug: 'oz-to-cups-calculator',
    name: 'Oz to Cups Converter',
    shortDesc: 'Convert fluid ounces to cups and other volume units instantly.',
    tagline: 'Kitchen conversions without the math.',
    category: 'conversion',
    iconName: 'CupSoda',
    badge: 'Popular',
    keywords: ['oz to cups', 'ounces to cups', 'fluid ounces', 'volume converter', 'convert oz', 'cups to oz'],
    kind: 'converter',
    unitGroup: 'volume',
    content: {
      intro:
        'The Oz to Cups Converter converts fluid ounces, cups, milliliters, pints, quarts, and gallons in any direction. It is the fastest way to scale a recipe or measure a drink without juggling conversion tables.',
      howItWorks:
        'Every unit is normalized to liters, then converted to the target unit. One US cup equals 8 fluid ounces and 237 milliliters, so the tool handles both imperial and metric directions accurately.',
      example:
        'Convert 16 fluid ounces to cups and the result is exactly 2 cups. The same 16 oz converts to 473 ml or roughly 0.125 gallons.',
      formulas: [
        {
          label: 'Conversion Through Liters',
          expression: 'Result = Input (in L) × Target factor',
          note: '1 cup = 0.2366 L, 1 fl oz = 0.0296 L.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Converted Value',
          explanation:
            'The input volume expressed in the target unit, computed by normalizing through liters.',
        },
      ],
      workflowLinks: [
        { slug: 'cups-to-grams-calculator', step: 'Convert volume to weight for baking ingredients.' },
        { slug: 'recipe-scaling-calculator', step: 'Scale a recipe after converting its units.' },
      ],
      faqs: [
        { q: 'How many fluid ounces are in a cup?', a: 'In the US system, 1 cup equals 8 fluid ounces. The converter applies this and all other volume relationships instantly.' },
        { q: 'Are UK and US cups the same?', a: 'They differ slightly. A US cup is 237 ml while a UK cup is 250 ml. This calculator uses US customary units by default.' },
        { q: 'Does it convert dry ounces?', a: 'No. Fluid ounces measure volume; dry ounces measure weight. For weight use the cups-to-grams tool or the weight converter.' },
      ],
      related: ['volume-converter', 'cups-to-grams-calculator', 'recipe-scaling-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.8,
      updatedAt: '2026-08-21',
    },
  },
  {
    id: 'cups-grams',
    slug: 'cups-to-grams-calculator',
    name: 'Cups to Grams Converter',
    shortDesc: 'Convert cup measurements to grams using ingredient density.',
    tagline: 'Bake precisely with ingredient-aware conversions.',
    category: 'conversion',
    iconName: 'CookingPot',
    keywords: ['cups to grams', 'grams to cups', 'baking conversion', 'flour grams', 'sugar grams', 'ingredient converter'],
    kind: 'config',
    config: {
      fields: [
        { id: 'cups', label: 'Number of Cups', type: 'number', defaultValue: 1, min: 0, step: 0.25 },
        { id: 'gramsPerCup', label: 'Grams per Cup (ingredient)', type: 'number', defaultValue: 120, min: 1 },
      ],
      results: [
        { label: 'Grams', formulaCode: 'cups * gramsPerCup', suffix: 'g', accent: true },
      ],
      formulaDescription: 'Grams = Cups x Grams per Cup',
      tips: [
        'All-purpose flour is about 120 g/cup; granulated sugar 200 g/cup; brown sugar 220 g/cup.',
        'Check the grams-per-cup value matches your exact ingredient for accuracy.',
      ],
    },
    content: {
      intro:
        'The Cups to Grams Converter turns volume measurements into weight using the density of your ingredient. Because a cup of flour weighs far less than a cup of sugar, ingredient-aware conversion is essential for reliable baking.',
      howItWorks:
        'Weight equals volume times density, so grams = cups x grams-per-cup. Common reference values are built into the tips, letting you switch ingredients without leaving the page.',
      example:
        'Two cups of all-purpose flour at 120 g/cup equals 240 grams. The same two cups of granulated sugar at 200 g/cup equals 400 grams.',
      formulas: [
        {
          label: 'Weight From Volume',
          expression: 'Grams = Cups × Grams per Cup',
          note: 'Weight equals volume times ingredient density.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Grams',
          explanation:
            'The ingredient weight equivalent of your cup measurement, based on the density value you entered.',
        },
      ],
      workflowLinks: [
        { slug: 'oz-to-cups-calculator', step: 'Convert between liquid volume units in the same recipe.' },
        { slug: 'recipe-scaling-calculator', step: 'Scale the weighed ingredient amounts for more servings.' },
      ],
      faqs: [
        { q: 'Why do recipes differ on cups to grams?', a: 'Because how flour is scooped changes its density. Standard reference values assume lightly spooned flour, around 120 g per cup.' },
        { q: 'How many grams is one cup of flour?', a: 'All-purpose flour is approximately 120 grams per US cup. Whole-wheat flour runs a bit heavier at about 130 grams.' },
        { q: 'Is it better to bake by weight?', a: 'Yes. Weighing ingredients is far more consistent and reproducible than volume measures, which is why professional recipes use grams.' },
      ],
      related: ['oz-to-cups-calculator', 'volume-converter', 'recipe-scaling-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.75,
      updatedAt: '2026-08-21',
    },
  },
  {
    id: 'currency',
    slug: 'currency-converter',
    name: 'Currency Converter',
    shortDesc: 'Convert between 40+ world currencies with live exchange rates.',
    tagline: 'Live cross-currency math for travel, shopping, and remittances.',
    category: 'conversion',
    iconName: 'Coins',
    badge: 'Essential',
    keywords: ['currency converter', 'exchange rate', 'convert money', 'usd to euro', 'gbp to usd', 'euro to dollar', 'pound to dollar', 'yen to usd', 'inr to usd', 'forex', 'foreign exchange'],
    kind: 'custom',
    componentId: 'CurrencyConverter',
    content: {
      intro:
        'Convert money between 40+ world currencies using live daily exchange rates. Pick any currency pair, such as US dollar to euro or pound to yen, and get an instant result as you type.',
      howItWorks:
        'The tool loads current rates once per visit and divides your amount by the source rate, then multiplies by the target rate. If the live feed is unreachable, it falls back to reference rates so you always get an estimate.',
      example:
        'Enter 100, select USD as the source and EUR as the target. At 0.92 euros per dollar you get 92.00 euros. Swap the pair to convert 100 euros back to about 108.70 dollars.',
      formulas: [
        {
          label: 'Cross-Currency Conversion',
          expression: 'Result = Amount / Rate(Source) × Rate(Target)',
          note: 'Both rates are expressed per 1 USD.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Converted Amount',
          explanation:
            'Your amount expressed in the target currency, computed from the source and target exchange rates.',
        },
      ],
      workflowLinks: [
        { slug: 'percentage-calculator', step: 'Add a bank conversion margin as a percentage.' },
        { slug: 'fuel-cost-calculator', step: 'Convert fuel prices across currencies for road trips.' },
      ],
      faqs: [
        { q: 'Where do the exchange rates come from?', a: 'Rates load live from open.er-api.com each time the page opens. If that feed is unreachable, the tool uses built-in reference rates so you still get a close estimate.' },
        { q: 'Why is the rate I get different from what my bank charges?', a: 'Banks and card providers add a markup of 1-3% for conversion. The interbank rate you see here is the base rate before that margin.' },
        { q: 'Can I convert any two currencies, not just from US dollars?', a: 'Yes. Choose any pair from the 40+ listed currencies, including USD to EUR, GBP to JPY, INR to AED, and so on. The math handles it automatically.' },
        { q: 'Do you support live intraday rates?', a: 'Rates refresh once daily from official central-bank reference feeds. For real-time trading you would need a paid streaming data source.' },
      ],
      related: ['percentage-calculator', 'fuel-cost-calculator', 'discount-sales-tax-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.9,
      updatedAt: '2026-08-21',
    },
  },
  {
    id: 'temperature',
    slug: 'temperature-converter',
    name: 'Temperature Converter',
    shortDesc: 'Convert between Celsius, Fahrenheit, and Kelvin instantly.',
    tagline: 'Switch temperature scales without the formula.',
    category: 'conversion',
    iconName: 'Thermometer',
    badge: 'Essential',
    keywords: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius', 'kelvin', 'convert temperature'],
    kind: 'converter',
    unitGroup: 'temperature',
    content: {
      intro:
        'The Temperature Converter changes a reading between Celsius, Fahrenheit and Kelvin in either direction. Weather reports, recipes and lab values use different scales, and the three overlap often enough that the arithmetic is worth doing exactly rather than by eye.',
      howItWorks:
        'Every scale is normalised to Celsius first. Fahrenheit becomes (F − 32) x 5/9 and Kelvin becomes K − 273.15, then the target scale is applied in reverse: Celsius x 9/5 + 32 for Fahrenheit, plus 273.15 for Kelvin. The offsets are what catch people out — the two scales do not share a zero point, so converting is not a simple multiplication.',
      example:
        '100 °F is (100 − 32) x 5/9 = 37.8 °C, which is 37.8 + 273.15 = 310.9 K. Body temperature of 37 °C is 98.6 °F and 310.15 K, while water freezes at 0 °C, 32 °F and 273.15 K. At −40 the two everyday scales coincide: −40 °C is −40 °F.',
      formulas: [
        {
          label: 'Fahrenheit to Celsius',
          expression: '°C = (°F − 32) × 5/9',
        },
        {
          label: 'Celsius to Fahrenheit',
          expression: '°F = °C × 9/5 + 32',
        },
        {
          label: 'Celsius to Kelvin',
          expression: 'K = °C + 273.15',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Converted Temperature',
          explanation:
            'The input temperature expressed in the target scale, converted through a Celsius normalization.',
        },
      ],
      workflowLinks: [
        { slug: 'oven-temperature-converter', step: 'Convert an oven setting between conventional and fan scales.' },
        { slug: 'boiling-point-calculator', step: 'See how altitude changes the boiling point of water.' },
      ],
      faqs: [
        { q: 'How do I convert Celsius to Fahrenheit?', a: 'Multiply by 9/5 and add 32. So 20 °C is 68 °F and 37 °C is 98.6 °F. The converter does it in either direction without you picking a formula.' },
        { q: 'At what temperature are Celsius and Fahrenheit equal?', a: 'At −40: −40 °C and −40 °F are the same temperature. Because the scales have different zero points and different step sizes, they cross exactly once.' },
        { q: 'Why does Kelvin have no negative numbers?', a: 'Kelvin starts at absolute zero, the coldest temperature physically reachable, so there is nothing below it to record. 0 K is −273.15 °C, and every Kelvin degree is the same size as a Celsius degree.' },
        { q: 'Is 1 °C the same as 1 °F?', a: 'No. A Celsius degree is 1.8 times a Fahrenheit degree, which is why a 10 °C change is an 18 °F change. Only the size of the step differs; the offset is handled separately.' },
        { q: 'Which scale should I use for cooking?', a: 'Fan and conventional ovens are usually quoted in Celsius or Fahrenheit, and oven thermostats are often inaccurate by 10 °C or more. Convert the recipe figure, then trust an oven thermometer over the dial.' },
      ],
      related: ['oven-temperature-converter', 'boiling-point-calculator', 'length-converter'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
      updatedAt: '2026-11-05',
    },
  },
  {
    id: 'length',
    slug: 'length-converter',
    name: 'Length Converter',
    shortDesc: 'Convert meters, feet, miles, and more length units instantly.',
    tagline: 'Every length unit, one clean conversion.',
    category: 'conversion',
    iconName: 'Ruler',
    keywords: ['length converter', 'meters to feet', 'feet to meters', 'inches to cm', 'miles to km', 'unit converter'],
    kind: 'converter',
    unitGroup: 'length',
    content: {
      intro:
        'The Length Converter covers millimetres through miles, including metres, centimetres, inches, feet and yards. It turns dimensions in a plan into the units on your tape measure, and distances in a foreign road sign into units you can picture.',
      howItWorks:
        'Every unit is normalised to metres through its exact definition, then scaled to the target unit. The imperial factors are exact by definition rather than rounded: 1 inch is 0.0254 m, 1 foot 0.3048 m, 1 yard 0.9144 m and 1 mile 1,609.344 m. Metric prefixes follow the same pattern in powers of ten, so a kilometre is exactly 1,000 m.',
      example:
        '2 miles is 2 x 1,609.344 = 3,218.7 m, or 3.22 km. 180 cm is 5.906 ft, which is 5 feet 10.9 inches. A 2x4 timber quoted as 8 feet is 2.44 m, and a 55-inch television is 139.7 cm across the diagonal.',
      formulas: [
        {
          label: 'Normalized Conversion',
          expression: 'Result = Input (in meters) × Target factor',
          note: '1 mile = 1609.344 m, 1 inch = 0.0254 m.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Converted Length',
          explanation:
            'The input length expressed in the target unit, normalized through meters for exact results.',
        },
      ],
      workflowLinks: [
        { slug: 'room-area-calculator', step: 'Convert room dimensions before computing area.' },
        { slug: 'speed-converter', step: 'Pair distance units with their speed equivalents.' },
      ],
      faqs: [
        { q: 'How many feet are in a meter?', a: '1 / 0.3048 = 3.28084 feet, or 39.37 inches. The factor is exact because the foot is defined as 0.3048 m, not measured.' },
        { q: 'How do I convert inches to centimeters?', a: 'Multiply inches by 2.54. An 11-inch tablet is 27.94 cm across, and a 6-foot person is 182.9 cm tall.' },
        { q: 'Does it include nautical miles?', a: 'No. This converter stops at the statute mile; a nautical mile is 1,852 m and belongs to navigation rather than everyday length. The speed converter handles knots, which are nautical miles per hour.' },
        { q: 'Why is a mile 1,609.344 m?', a: 'The mile is defined as exactly 5,280 feet, and the foot as 0.3048 m, so the mile follows from those two definitions. Nothing in the chain is rounded, which is why a conversion can be reversed without drift.' },
      ],
      related: ['temperature-converter', 'weight-converter', 'room-area-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.8,
      updatedAt: '2026-11-05',
    },
  },
  {
    id: 'weight',
    slug: 'weight-converter',
    name: 'Weight Converter',
    shortDesc: 'Convert kilograms, pounds, ounces, and other mass units.',
    tagline: 'Switch mass units for fitness, food, and travel.',
    category: 'conversion',
    iconName: 'Weight',
    keywords: ['weight converter', 'kg to lbs', 'pounds to kg', 'kilograms to pounds', 'mass converter', 'stone to kg'],
    kind: 'converter',
    unitGroup: 'weight',
    content: {
      intro:
        'The Weight Converter changes a mass between milligrams, grams, kilograms, tonnes, ounces, pounds and stone. Gym programmes are written in pounds, shipping labels in kilograms and British body weight in stone, so the same number means different things depending on where it was written.',
      howItWorks:
        'Every unit normalises to kilograms through its exact factor, then scales to the target unit. A pound is 0.45359237 kg and an ounce is one sixteenth of that, 0.028349523125 kg; a stone is 14 pounds, or 6.35029318 kg. Because each factor is a definition rather than a measurement, round-tripping gives back the original number.',
      example:
        '150 lb is 150 x 0.45359237 = 68.04 kg, the same as 10 stone 10 lb. A 5 kg bag of flour is 11.02 lb, a 1 kg bag is 2.205 lb, and 8 oz of cheese is 226.8 g. A metric tonne of 1,000 kg is 2,204.6 lb.',
      formulas: [
        {
          label: 'Normalized Conversion',
          expression: 'Result = Input (in kg) × Target factor',
          note: '1 lb = 0.453592 kg, 1 oz = 0.0283495 kg.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Converted Mass',
          explanation:
            'The input mass expressed in the target unit, normalized through kilograms for precise results.',
        },
      ],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'Convert your weight before checking your BMI.' },
        { slug: 'cups-to-grams-calculator', step: 'Turn recipe volumes into weights for baking.' },
      ],
      faqs: [
        { q: 'How many kilograms are in a pound?', a: '0.45359237 kg exactly, so dividing pounds by 2.20462 converts to kilograms. 150 lb is 68.04 kg and 200 lb is 90.72 kg.' },
        { q: 'What is a stone?', a: 'A British unit of 14 pounds, or 6.35 kg. Body weight in the UK is commonly given in stones and pounds, so 11 stone 4 lb means 158 lb, about 71.7 kg.' },
        { q: 'Is mass the same as weight?', a: 'Not in physics: mass is the amount of matter and weight is the force gravity exerts on it, so your weight would differ on the Moon while your mass would not. In everyday use on Earth the two are treated as the same thing, and the units are used interchangeably.' },
        { q: 'Is a fluid ounce the same as an ounce?', a: 'No. A fluid ounce measures volume, an ounce measures mass, and they only coincide for water. A fluid ounce of honey weighs about 1.4 oz, which is why recipes specify one or the other.' },
        { q: 'Why does a kilogram weigh 2.2 pounds?', a: 'Because the pound was defined as 0.45359237 kg by international agreement in 1959. The kilogram is the base unit of mass in SI and the pound is defined from it, not the other way round.' },
      ],
      related: ['length-converter', 'temperature-converter', 'bmi-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.75,
      updatedAt: '2026-11-05',
    },
  },
  {
    id: 'speed',
    slug: 'speed-converter',
    name: 'Speed Converter',
    shortDesc: 'Convert between km/h, mph, knots, and meters per second.',
    tagline: 'Speeds across units for driving, travel, and sport.',
    category: 'conversion',
    iconName: 'Gauge',
    keywords: ['speed converter', 'kmh to mph', 'mph to kmh', 'knots', 'meters per second', 'speed units'],
    kind: 'converter',
    unitGroup: 'speed',
    content: {
      intro:
        'The Speed Converter translates between kilometres per hour, miles per hour, knots, metres per second and feet per second. Road signs, boat instruments, weather forecasts and athletics results each settled on a different unit, and this is where they meet.',
      howItWorks:
        'Every speed normalises to km/h and then scales to the target unit. The factors come from definitions rather than measurements: a mile is 1.609344 km, a knot is one nautical mile (1,852 m) per hour so 1.852 km/h, and 1 m/s is 3.6 km/h exactly. Because the inch and therefore the mile are defined in metric terms, none of these steps introduces rounding.',
      example:
        '60 mph is 96.56 km/h, and 100 km/h is 62.14 mph. 20 knots is 37.04 km/h, or 23.02 mph. A 10 m/s sprint is 36 km/h, and wind reported at 25 mph is about 21.7 knots.',
      formulas: [
        {
          label: 'Normalized Conversion',
          expression: 'Result = Input (in km/h) × Target factor',
          note: '1 mile = 1.609344 km, 1 knot = 1.852 km/h.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Converted Speed',
          explanation:
            'The input speed expressed in the target unit, normalized through km/h for exact cross-unit results.',
        },
      ],
      workflowLinks: [
        { slug: 'running-pace-calculator', step: 'Convert a running speed into pace per kilometer.' },
        { slug: 'length-converter', step: 'Check the distance units behind a speed figure.' },
        { slug: 'fuel-cost-calculator', step: 'Turn speed and distance into a trip cost.' },
      ],
      faqs: [
        { q: 'How many mph is 100 km/h?', a: '100 / 1.609344 = 62.14 mph, so a 100 km/h limit is slightly faster than a 60 mph limit. The rule of thumb that a km/h figure is about 0.62 of the mph figure holds well below 200 km/h.' },
        { q: 'What is a knot?', a: 'One nautical mile per hour, which is 1.852 km/h or 1.1508 mph. It is used at sea and in the air because a nautical mile corresponds to one minute of latitude, so degrees of position and distance line up neatly.' },
        { q: 'How do I convert m/s to km/h?', a: 'Multiply by 3.6. A 10 m/s run is 36 km/h; Usain Bolt\'s 100 m record averaged about 10.44 m/s, which is 37.6 km/h over the whole race.' },
        { q: 'Why are wind speeds sometimes in knots and sometimes in mph?', a: 'Tradition rather than physics. Marine and aviation forecasts use knots, land forecasts in the US use mph, and most of the rest of the world uses km/h or m/s. Converting lets you compare a hurricane advisory with a local weather app.' },
      ],
      related: ['length-converter', 'running-pace-calculator', 'fuel-cost-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
      updatedAt: '2026-11-05',
    },
  },
  {
    id: 'area-converter',
    slug: 'area-converter',
    name: 'Area Converter',
    shortDesc: 'Convert square meters, square feet, acres, and more.',
    tagline: 'Land and room areas across every unit system.',
    category: 'conversion',
    iconName: 'Square',
    keywords: ['area converter', 'square meters to square feet', 'acres', 'hectares', 'sq ft to sq m', 'land area'],
    kind: 'converter',
    unitGroup: 'area',
    content: {
      intro:
        'The Area Converter changes an area between square millimetres, square centimetres, square metres, square kilometres, square inches, square feet, square yards, acres, hectares and square miles. Property listings, land deeds and floor plans each pick a different unit, often for the same piece of ground, and this is where they line up.',
      howItWorks:
        'Every unit normalises to square metres through a fixed factor, then scales to the target. The imperial factors follow from the length definitions: a square foot is 0.3048² = 0.092903 m², a square yard 0.9144² = 0.836127 m², and a square mile 1,609.344² = 2,589,988 m². An acre is 4,840 square yards, or 4,046.86 m², and a hectare is exactly 10,000 m² — the neat metric counterpart that makes the two roughly comparable.',
      example:
        '1,000 square feet is 1,000 × 0.092903 = 92.9 m². 2 acres is 8,093.7 m², which is 0.81 hectares and just over 3,000 square yards. A 100 m² apartment is 1,076 square feet, and one square mile is 640 acres — the section grid that much of the American Midwest is laid out on.',
      formulas: [
        {
          label: 'Normalized Conversion',
          expression: 'Result = Input (in m²) × Target factor',
          note: '1 acre = 4,046.86 m², 1 hectare = 10,000 m².',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Converted Area',
          explanation:
            'The input area expressed in the target unit, normalized through square meters for precision.',
        },
      ],
      workflowLinks: [
        { slug: 'room-area-calculator', step: 'Compute a room area, then convert it to other units.' },
        { slug: 'flooring-calculator', step: 'Use converted area to estimate flooring material.' },
        { slug: 'length-converter', step: 'Convert the dimensions you measured before squaring them.' },
      ],
      faqs: [
        { q: 'How many square feet are in a square meter?', a: 'About 10.764. The factor is not a round number because it comes from squaring 3.28084 feet per metre. To go the other way, multiply square feet by 0.092903.' },
        { q: 'What is the difference between an acre and a hectare?', a: 'A hectare is 10,000 m² and an acre is 4,046.86 m², so a hectare is about 2.471 acres. Acres dominate US and UK land listings; hectares are standard almost everywhere else, including most of Europe and Australia.' },
        { q: 'Why can I not just convert the side lengths?', a: 'Because area scales with the square of length. A room 10 feet by 10 feet is 100 square feet, but 10 feet is 3.048 m and the same room is 9.29 m², not 30.4 — converting the sides and multiplying is equivalent, but converting the area directly avoids the mistake.' },
        { q: 'Can I convert room dimensions directly?', a: 'This tool converts an area you already have. For a room, measure length and width in the room-area calculator and it multiplies them for you; then bring the result here to switch units.' },
        { q: 'Is a square mile the same as a mile squared?', a: 'Literally yes, but the useful comparison is that one square mile is 640 acres or 2.59 km². That ratio is why American land sections are one mile square — a section is exactly 640 acres.' },
      ],
      related: ['room-area-calculator', 'length-converter', 'flooring-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
      updatedAt: '2026-11-05',
    },
  },
  {
    id: 'volume-converter',
    slug: 'volume-converter',
    name: 'Volume Converter',
    shortDesc: 'Convert liters, gallons, cups, and cubic units instantly.',
    tagline: 'Liquid and container volumes in any unit.',
    category: 'conversion',
    iconName: 'Box',
    keywords: ['volume converter', 'liters to gallons', 'gallons to liters', 'milliliters', 'cubic meters', 'liquid volume'],
    kind: 'converter',
    unitGroup: 'volume',
    content: {
      intro:
        'The Volume Converter changes a volume between millilitres, litres, teaspoons, tablespoons, cups, pints, quarts, gallons and cubic metres. It covers recipe scaling, fuel, tank capacity and container sizing in one place, and it uses US customary measures throughout because those differ from imperial ones.',
      howItWorks:
        'Every unit normalises to litres through its exact definition, then scales to the target. A US gallon is 231 cubic inches, which is 3.785411784 L, and a US cup is 8 US fluid ounces, 236.588 mL. The same names mean different amounts elsewhere: an imperial gallon is 4.54609 L, about 20% more than a US gallon, and a metric cup used in Australian and New Zealand recipes is 250 mL.',
      example:
        '2 US gallons is 7.571 L, and 500 mL is 2.113 US cups. A 5 L container holds 1.32 US gallons, and a 1 L bottle is 4.227 US cups. In imperial units the same 2 gallons would be 9.092 L, which is why a recipe copied across the Atlantic can taste wrong even when the numbers are unchanged.',
      formulas: [
        {
          label: 'Normalized Conversion',
          expression: 'Result = Input (in L) × Target factor',
          note: '1 US gallon = 3.78541 L, 1 cup = 0.236588 L.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Converted Volume',
          explanation:
            'The input volume expressed in the target unit, normalized through liters for accurate results.',
        },
      ],
      workflowLinks: [
        { slug: 'room-volume-calculator', step: 'Compute a room volume, then switch its units.' },
        { slug: 'oz-to-cups-calculator', step: 'Convert cooking volumes in the same measurement system.' },
        { slug: 'cups-to-grams-calculator', step: 'Turn a cup measure into a weight for baking.' },
      ],
      faqs: [
        { q: 'How many liters are in a gallon?', a: 'A US gallon is 3.785 L and an imperial gallon is 4.546 L, a gap of about 20%. This converter uses US customary units, so check which gallon a foreign recipe or fuel figure means before converting.' },
        { q: 'How many milliliters in a cup?', a: 'A US cup is 236.6 mL. Australian, New Zealand and Canadian recipes often use a metric cup of 250 mL, which is 13.4 mL more — enough to shift a delicate bake.' },
        { q: 'Does it convert dry volume too?', a: 'It converts capacity, not weight, so a cup of flour and a cup of water both read as 236.6 mL even though the flour weighs far less. For baking by weight, use the cups-to-grams converter instead.' },
        { q: 'Why do US and imperial gallons differ?', a: 'They descend from different historical standards: the US gallon from the 231-cubic-inch wine gallon, the imperial gallon from the 1824 British standard of 4.54609 L. Both names survived, which is why the ambiguity persists.' },
        { q: 'Is a fluid ounce the same as an ounce?', a: 'No. A US fluid ounce is 29.574 mL of volume; an ounce is 28.3495 g of mass. They only match for water, so honey, oil and syrup have very different weights for the same fluid ounce.' },
      ],
      related: ['oz-to-cups-calculator', 'cups-to-grams-calculator', 'room-volume-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
      updatedAt: '2026-11-05',
    },
  },
  {
    id: 'data-storage',
    slug: 'data-storage-converter',
    name: 'Data Storage Converter',
    shortDesc: 'Convert between bits, bytes, KB, MB, GB, and TB.',
    tagline: 'File sizes and storage across every unit.',
    category: 'conversion',
    iconName: 'HardDrive',
    keywords: ['data storage converter', 'gb to mb', 'mb to gb', 'bytes to megabytes', 'file size', 'storage units'],
    kind: 'converter',
    unitGroup: 'digital',
    content: {
      intro:
        'The Data Storage Converter converts sizes between bits, bytes, kilobytes, megabytes, gigabytes, terabytes and petabytes. It uses the binary step of 1,024 that operating systems report, which is why a drive advertised as 1 TB shows roughly 931 GB once it is plugged in.',
      howItWorks:
        'Every unit normalises to bytes, and each step multiplies by 1,024 — the binary convention behind the labels KB, MB, GB and TB on a computer. Manufacturers use the decimal convention instead, where each step multiplies by 1,000, so the same physical drive carries two different numbers depending on who is counting. A byte is 8 bits, which is where the mismatch between connection speeds in megabits and file sizes in megabytes also comes from.',
      example:
        '16 GB is 16 x 1,024 = 16,384 MB, and a 5 TB drive is 5,120 GB by binary maths. A drive sold as 1 TB holds 1,000,000,000,000 bytes, which the operating system reports as 931.3 GB — the capacity is identical, only the step size differs. A 100 Mbps connection moves about 12.5 MB per second, because eight bits make a byte.',
      formulas: [
        {
          label: 'Binary Conversion',
          expression: 'Result = Input × 1,024^steps',
          note: 'Each storage step multiplies by 1,024 in binary terms.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Converted Size',
          explanation:
            'The input data size expressed in the target unit, using binary factors of 1,024 per step.',
        },
      ],
      workflowLinks: [
        { slug: 'mb-to-gb-calculator', step: 'Check a single megabyte-to-gigabyte figure.' },
        { slug: 'gb-to-tb-calculator', step: 'Convert a drive capacity into terabytes.' },
      ],
      faqs: [
        { q: 'How many MB are in a GB?', a: '1,024 in binary terms and 1,000 in the decimal terms storage vendors use. This converter uses 1,024, matching what your file manager shows.' },
        { q: 'What is the difference between a bit and a byte?', a: 'A byte is 8 bits. Broadband speeds are sold in megabits per second while files are measured in bytes, so a 100 Mbps line downloads at roughly 12.5 MB per second rather than 100.' },
        { q: 'Why does my drive show less space than labeled?', a: 'Manufacturers count 1 GB as 1,000,000,000 bytes; operating systems count 1 GB as 1,073,741,824 bytes. A 1 TB drive therefore reports as about 931 GB, and a 500 GB drive as about 465 GB, with no space actually missing.' },
        { q: 'What is a KiB?', a: 'A kibibyte, which is 1,024 bytes by the IEC naming convention. Strictly, KB means 1,000 bytes and KiB means 1,024, but Windows labels binary sizes as KB, so the strict distinction is widely ignored in practice.' },
        { q: 'Does this include petabytes?', a: 'Yes, and each further step is another factor of 1,024. A petabyte is 1,024 terabytes, which is about 1.126 million gigabytes — the scale of large data centres rather than personal storage.' },
      ],
      related: ['mb-to-gb-calculator', 'gb-to-tb-calculator', 'volume-converter'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.65,
      updatedAt: '2026-11-05',
    },
  },
  {
    id: 'pounds-to-kg',
    slug: 'pounds-to-kg-calculator',
    name: 'Pounds to Kilograms Converter',
    shortDesc: 'Convert pounds to kilograms for fitness tracking, cooking, and shipping.',
    tagline: 'The weight conversion you use most often.',
    category: 'conversion',
    iconName: 'Weight',
    keywords: ['pounds to kg', 'pounds to kilograms', 'lbs to kg', 'convert pounds to kg'],
    kind: 'converter',
    unitGroup: 'weight',
    content: {
      intro: 'The Pounds to Kilograms Converter translates imperial weight into metric kilograms using the exact international standard factor. Most gym equipment, medical scales, and nutrition labels outside the US use kilograms, so this conversion comes up constantly when you track body weight, measure ingredients, or compare product specifications across countries.',
      howItWorks: 'One pound equals exactly 0.453592 kilograms. Multiply any weight in pounds by this number to get the kilogram equivalent.',
      example: 'A 180-pound person weighs 81.65 kg. A 50-pound bag of flour is 22.68 kg. A newborn at 7 pounds 8 ounces is 3.40 kg.',
      formulas: [{ label: 'Conversion Factor', expression: 'kg = lbs x 0.453592', note: '1 lb = 0.453592 kg exactly.' }],
      resultExplanations: [{ resultLabel: 'Weight in Kilograms', explanation: 'Your weight expressed in kilograms using the exact international conversion factor.' }],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'Use your weight in kg to calculate BMI.' },
        { slug: 'weight-converter', step: 'Convert between other weight units.' }
      ],
      faqs: [
        { q: 'How many kilograms is 1 pound?', a: 'One pound equals 0.453592 kilograms. For quick estimates, multiply pounds by 0.45.' },
        { q: 'How do I convert kilograms back to pounds?', a: 'Multiply kilograms by 2.20462. A 70 kg person weighs about 154 pounds.' },
        { q: 'Why do different countries use different units?', a: 'The US, Liberia, and Myanmar use pounds. Most of the world uses kilograms.' },
        { q: 'Is 1 pound the same as 1 kilogram?', a: 'No. One kilogram is about 2.2 pounds, so kilograms are the larger unit.' }
      ],
      related: ['kg-to-lbs-calculator', 'weight-converter', 'bmi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.95, updatedAt: '2026-08-22' },
  },
  {
    id: 'kg-to-lbs',
    slug: 'kg-to-lbs-calculator',
    name: 'Kilograms to Pounds Converter',
    shortDesc: 'Convert kilograms to pounds for travel, fitness, and everyday weight.',
    tagline: 'When metric meets imperial.',
    category: 'conversion',
    iconName: 'Weight',
    keywords: ['kg to lbs', 'kg to pounds', 'kilograms to pounds', 'convert kg'],
    kind: 'converter',
    unitGroup: 'weight',
    content: {
      intro: 'The Kilograms to Pounds Converter translates metric kilograms into imperial pounds, which is the unit most Americans think in for body weight, groceries, and luggage. If a recipe lists ingredients in kilograms or your doctor records your weight in kg, this conversion puts those numbers into a frame of reference you can visualize.',
      howItWorks: 'One kilogram equals 2.20462 pounds. Multiply the kilogram value by this factor to get pounds.',
      example: 'An adult cat weighing 5 kg is about 11 pounds. A 100 kg barbell weighs 220 pounds. A carry-on limited to 7 kg allows roughly 15.4 pounds.',
      formulas: [{ label: 'Conversion Factor', expression: 'lbs = kg x 2.20462', note: '1 kg = 2.20462 lb exactly.' }],
      resultExplanations: [{ resultLabel: 'Weight in Pounds', explanation: 'Your weight expressed in pounds using the exact international conversion factor.' }],
      workflowLinks: [
        { slug: 'bmi-calculator', step: 'Convert your weight before checking BMI.' },
        { slug: 'pounds-to-kg-calculator', step: 'Convert back the other direction.' }
      ],
      faqs: [
        { q: 'How many pounds is 1 kilogram?', a: 'One kilogram equals 2.20462 pounds. For quick estimates, double the kilograms and add about 10%.' },
        { q: 'What is 70 kg in pounds?', a: '70 kg equals 154.32 pounds. This is a common reference point for an average adult male.' },
        { q: 'Which is heavier, a pound or a kilogram?', a: 'A kilogram is heavier. One kilogram equals about 2.2 pounds.' }
      ],
      related: ['pounds-to-kg-calculator', 'weight-converter', 'bmi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-08-22' },
  },
  {
    id: 'celsius-fahrenheit',
    slug: 'celsius-to-fahrenheit-calculator',
    name: 'Celsius to Fahrenheit Converter',
    shortDesc: 'Convert Celsius to Fahrenheit for cooking, weather, and science.',
    tagline: 'Temperature that makes sense to you.',
    category: 'conversion',
    iconName: 'Thermometer',
    keywords: ['celsius to fahrenheit', 'c to f', 'convert celsius', 'degrees celsius to fahrenheit'],
    kind: 'converter',
    unitGroup: 'temperature',
    content: {
      intro: 'The Celsius to Fahrenheit Converter translates metric temperatures into the imperial scale used in the United States. Weather apps, international news, and most of the world report temperatures in Celsius, so this tool helps you understand what 25 degrees actually feels like when the forecast comes from abroad.',
      howItWorks: 'Multiply the Celsius temperature by 1.8, then add 32. This accounts for both the different scale size and the different zero point between the two systems.',
      example: 'Room temperature of 22 C equals 71.6 F. A hot summer day at 35 C is 95 F. Body temperature of 37 C equals 98.6 F.',
      formulas: [{ label: 'Temperature Formula', expression: 'F = C x 1.8 + 32', note: 'Multiply by 1.8, then add 32.' }],
      resultExplanations: [{ resultLabel: 'Temperature in Fahrenheit', explanation: 'Your temperature expressed in Fahrenheit using the standard conversion formula.' }],
      workflowLinks: [
        { slug: 'fahrenheit-to-celsius-calculator', step: 'Convert back the other direction.' },
        { slug: 'temperature-converter', step: 'Convert between all temperature units including Kelvin.' }
      ],
      faqs: [
        { q: 'What is 0 C in Fahrenheit?', a: '0 C equals 32 F, which is the freezing point of water.' },
        { q: 'What is 100 C in Fahrenheit?', a: '100 C equals 212 F, which is the boiling point of water at sea level.' },
        { q: 'At what temperature do both scales read the same?', a: 'At -40 degrees, both Celsius and Fahrenheit read -40.' },
        { q: 'Why does the US use Fahrenheit?', a: 'Fahrenheit was developed first and became entrenched in American culture. Most countries switched to Celsius during metric adoption.' }
      ],
      related: ['fahrenheit-to-celsius-calculator', 'temperature-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.95, updatedAt: '2026-08-22' },
  },
  {
    id: 'fahrenheit-celsius',
    slug: 'fahrenheit-to-celsius-calculator',
    name: 'Fahrenheit to Celsius Converter',
    shortDesc: 'Convert Fahrenheit to Celsius for travel, international recipes, and science.',
    tagline: 'American temperatures into global context.',
    category: 'conversion',
    iconName: 'Thermometer',
    keywords: ['fahrenheit to celsius', 'f to c', 'convert fahrenheit', 'degrees fahrenheit to celsius'],
    kind: 'converter',
    unitGroup: 'temperature',
    content: {
      intro: 'The Fahrenheit to Celsius Converter translates American temperatures into the metric scale used by most of the world. When a European friend says it is 30 degrees outside, or a scientific paper references temperatures in Celsius, this tool gives you the Fahrenheit equivalent so you can picture what that actually feels like.',
      howItWorks: 'Subtract 32 from the Fahrenheit temperature, then multiply the result by 5/9. The subtraction accounts for the different zero points, and the multiplication adjusts for the different scale sizes.',
      example: 'A comfortable 72 F room is 22.2 C. A fever of 102 F is 38.9 C. A freezer at 0 F is -17.8 C.',
      formulas: [{ label: 'Temperature Formula', expression: 'C = (F - 32) x 5/9', note: 'Subtract 32, then multiply by 5/9.' }],
      resultExplanations: [{ resultLabel: 'Temperature in Celsius', explanation: 'Your temperature expressed in Celsius using the standard conversion formula.' }],
      workflowLinks: [
        { slug: 'celsius-to-fahrenheit-calculator', step: 'Convert back the other direction.' },
        { slug: 'temperature-converter', step: 'Convert between all temperature units including Kelvin.' }
      ],
      faqs: [
        { q: 'What is 72 F in Celsius?', a: '72 F equals 22.2 C, a comfortable room temperature.' },
        { q: 'What is 98.6 F in Celsius?', a: '98.6 F equals 37 C, normal human body temperature.' },
        { q: 'How do I convert C to F?', a: 'Multiply Celsius by 1.8, then add 32.' }
      ],
      related: ['celsius-to-fahrenheit-calculator', 'temperature-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-08-22' },
  },
  {
    id: 'inches-cm',
    slug: 'inches-to-cm-calculator',
    name: 'Inches to Centimeters Converter',
    shortDesc: 'Convert inches to centimeters for height, screen sizes, and crafts.',
    tagline: 'Imperial length into metric precision.',
    category: 'conversion',
    iconName: 'Ruler',
    keywords: ['inches to cm', 'inches to centimeters', 'convert inches', 'height converter'],
    kind: 'converter',
    unitGroup: 'length',
    content: {
      intro: 'The Inches to Centimeters Converter translates imperial inches into metric centimeters using the exact international standard of 2.54 centimeters per inch. Television screens, monitor sizes, waist measurements, and craft patterns all switch between these units regularly, making this one of the most practical length conversions.',
      howItWorks: 'One inch equals exactly 2.54 centimeters. Multiply the number of inches by 2.54 to get centimeters. The relationship is exact because it was defined by international agreement in 1959.',
      example: 'A 27-inch monitor is 68.58 cm wide. A 32-inch waist is 81.28 cm. A standard ruler is 30.48 cm long.',
      formulas: [{ label: 'Conversion Factor', expression: 'cm = inches x 2.54', note: '1 inch = 2.54 cm exactly.' }],
      resultExplanations: [{ resultLabel: 'Length in Centimeters', explanation: 'Your measurement expressed in centimeters using the exact conversion factor.' }],
      workflowLinks: [
        { slug: 'cm-to-inches-calculator', step: 'Convert back the other direction.' },
        { slug: 'length-converter', step: 'Convert between other length units.' }
      ],
      faqs: [
        { q: 'How many cm is 1 inch?', a: 'One inch equals exactly 2.54 centimeters.' },
        { q: 'How do I convert cm to inches?', a: 'Divide centimeters by 2.54. A 30 cm ruler is about 11.8 inches.' },
        { q: 'Is a 55-inch TV really 55 inches?', a: 'The diagonal screen area is 55 inches. The width and height in cm depend on the aspect ratio.' }
      ],
      related: ['cm-to-inches-calculator', 'feet-to-meters-calculator', 'length-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.95, updatedAt: '2026-08-22' },
  },
  {
    id: 'cm-inches',
    slug: 'cm-to-inches-calculator',
    name: 'Centimeters to Inches Converter',
    shortDesc: 'Convert centimeters to inches for height, fabric, and product dimensions.',
    tagline: 'Metric length into everyday reference.',
    category: 'conversion',
    iconName: 'Ruler',
    keywords: ['cm to inches', 'centimeters to inches', 'convert cm', 'cm to in'],
    kind: 'converter',
    unitGroup: 'length',
    content: {
      intro: 'The Centimeters to Inches Converter translates metric centimeters into imperial inches so you can visualize measurements reported in centimeters. Height in cm, fabric dimensions, and international product sizes all become easier to picture when converted to inches.',
      howItWorks: 'Divide centimeters by 2.54 to get inches. Since one inch equals 2.54 cm exactly, the conversion is precise to as many decimal places as you need.',
      example: 'A person who is 175 cm tall is 68.9 inches, or about 5 feet 9 inches. A 60 cm guitar scale length is 23.6 inches.',
      formulas: [{ label: 'Conversion Factor', expression: 'inches = cm / 2.54', note: '1 inch = 2.54 cm.' }],
      resultExplanations: [{ resultLabel: 'Length in Inches', explanation: 'Your measurement expressed in inches using the exact conversion factor.' }],
      workflowLinks: [
        { slug: 'inches-to-cm-calculator', step: 'Convert back the other direction.' },
        { slug: 'feet-to-meters-calculator', step: 'Convert larger length measurements.' }
      ],
      faqs: [
        { q: 'How many inches is 100 cm?', a: '100 cm equals about 39.37 inches.' },
        { q: 'What is 180 cm in feet and inches?', a: '180 cm is about 5 feet 11 inches.' },
        { q: 'How accurate is this conversion?', a: 'It is exact. 1 inch = 2.54 cm is defined by international agreement.' }
      ],
      related: ['inches-to-cm-calculator', 'length-converter', 'feet-to-meters-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-08-22' },
  },
  {
    id: 'feet-meters',
    slug: 'feet-to-meters-calculator',
    name: 'Feet to Meters Converter',
    shortDesc: 'Convert feet to meters for height, construction, and running distances.',
    tagline: 'Imperial to metric height and distance.',
    category: 'conversion',
    iconName: 'Ruler',
    keywords: ['feet to meters', 'feet to meter', 'convert feet', 'ft to m'],
    kind: 'converter',
    unitGroup: 'length',
    content: {
      intro: 'The Feet to Meters Converter translates imperial feet into metric meters, which is the standard for construction blueprints, athletic tracks, and real estate listings outside the US. If you are 6 feet tall or running a 5K, knowing the meter equivalent helps you compare with international standards.',
      howItWorks: 'One foot equals exactly 0.3048 meters. Multiply the number of feet by 0.3048 to get meters. This is an exact conversion factor defined internationally.',
      example: 'A 6-foot person is 1.83 meters tall. A 100-foot cable is 30.48 meters. A basketball hoop at 10 feet is 3.05 meters.',
      formulas: [{ label: 'Conversion Factor', expression: 'meters = feet x 0.3048', note: '1 foot = 0.3048 m exactly.' }],
      resultExplanations: [{ resultLabel: 'Length in Meters', explanation: 'Your measurement expressed in meters using the exact conversion factor.' }],
      workflowLinks: [
        { slug: 'meters-to-feet-calculator', step: 'Convert back the other direction.' },
        { slug: 'room-area-calculator', step: 'Calculate area after converting dimensions.' }
      ],
      faqs: [
        { q: 'How many meters is 1 foot?', a: 'One foot equals exactly 0.3048 meters.' },
        { q: 'How do I convert meters to feet?', a: 'Multiply meters by 3.28084. A 2-meter person is about 6 feet 7 inches.' },
        { q: 'How many feet in a mile?', a: 'There are exactly 5,280 feet in a mile.' }
      ],
      related: ['meters-to-feet-calculator', 'inches-to-cm-calculator', 'length-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.95, updatedAt: '2026-08-22' },
  },
  {
    id: 'meters-feet',
    slug: 'meters-to-feet-calculator',
    name: 'Meters to Feet Converter',
    shortDesc: 'Convert meters to feet for real estate, sports, and construction.',
    tagline: 'Metric length into feet and inches.',
    category: 'conversion',
    iconName: 'Ruler',
    keywords: ['meters to feet', 'meter to feet', 'convert meters', 'm to ft'],
    kind: 'converter',
    unitGroup: 'length',
    content: {
      intro: 'The Meters to Feet Converter translates metric meters into imperial feet, which Americans use for height, room dimensions, and property listings. If a building is 3.5 meters tall or a room is 4.2 meters long, converting to feet gives you a sense of the actual scale.',
      howItWorks: 'One meter equals approximately 3.28084 feet. Multiply the meter value by this factor to get feet. For everyday use, you can approximate by multiplying meters by 3.3.',
      example: 'A 2-meter doorway is 6.56 feet (about 6 feet 7 inches). A 50-meter swimming pool length is 164 feet. Mount Everest at 8,849 meters is 29,032 feet.',
      formulas: [{ label: 'Conversion Factor', expression: 'feet = meters x 3.28084', note: '1 meter = 3.28084 feet.' }],
      resultExplanations: [{ resultLabel: 'Length in Feet', explanation: 'Your measurement expressed in feet using the exact conversion factor.' }],
      workflowLinks: [
        { slug: 'feet-to-meters-calculator', step: 'Convert back the other direction.' },
        { slug: 'room-area-calculator', step: 'Calculate area from room dimensions.' }
      ],
      faqs: [
        { q: 'How many feet is 1 meter?', a: 'One meter equals approximately 3.28 feet, or about 3 feet 3.4 inches.' },
        { q: 'How do I convert feet to meters?', a: 'Divide feet by 3.28084. A 6-foot person is about 1.83 meters.' },
        { q: 'What is a meter in everyday terms?', a: 'A meter is roughly the distance from your nose to your fingertips when your arm is extended.' }
      ],
      related: ['feet-to-meters-calculator', 'length-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-08-22' },
  },
  {
    id: 'miles-km',
    slug: 'miles-to-km-calculator',
    name: 'Miles to Kilometers Converter',
    shortDesc: 'Convert miles to kilometers for driving, running, and travel.',
    tagline: 'Road distances you can compare worldwide.',
    category: 'conversion',
    iconName: 'Ruler',
    keywords: ['miles to km', 'miles to kilometers', 'convert miles', 'driving distance'],
    kind: 'converter',
    unitGroup: 'length',
    content: {
      intro: 'The Miles to Kilometers Converter translates imperial miles into metric kilometers, which is the standard for road signs, running events, and travel distances in most countries. If a road trip is 300 miles or a marathon is 26.2 miles, converting to kilometers lets you compare with international distances.',
      howItWorks: 'One mile equals approximately 1.60934 kilometers. Multiply the number of miles by this factor to get kilometers.',
      example: 'A 5K race is 3.1 miles. A 100-mile road trip is 160.9 km. The Boston Marathon at 26.2 miles is 42.2 km.',
      formulas: [{ label: 'Conversion Factor', expression: 'km = miles x 1.60934', note: '1 mile = 1.60934 km.' }],
      resultExplanations: [{ resultLabel: 'Distance in Kilometers', explanation: 'Your distance expressed in kilometers using the exact conversion factor.' }],
      workflowLinks: [
        { slug: 'km-to-miles-calculator', step: 'Convert back the other direction.' },
        { slug: 'length-converter', step: 'Convert between other length units.' }
      ],
      faqs: [
        { q: 'How many km is 1 mile?', a: 'One mile equals approximately 1.609 kilometers.' },
        { q: 'What is a 10K in miles?', a: 'A 10K race is 6.21 miles, roughly the distance from downtown to the suburbs.' },
        { q: 'How do I convert km to miles?', a: 'Divide kilometers by 1.60934. A 42.2 km marathon is 26.2 miles.' }
      ],
      related: ['km-to-miles-calculator', 'length-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.95, updatedAt: '2026-08-22' },
  },
  {
    id: 'km-miles',
    slug: 'km-to-miles-calculator',
    name: 'Kilometers to Miles Converter',
    shortDesc: 'Convert kilometers to miles for road trips, running, and fitness tracking.',
    tagline: 'Metric distances into miles.',
    category: 'conversion',
    iconName: 'Ruler',
    keywords: ['km to miles', 'kilometers to miles', 'convert km', 'kph to mph'],
    kind: 'converter',
    unitGroup: 'length',
    content: {
      intro: 'The Kilometers to Miles Converter translates metric kilometers into imperial miles, the unit Americans use for road distances, running, and cycling. If a race is 42.2 km or a highway speed limit is 120 km/h, converting to miles helps you compare with what you are used to.',
      howItWorks: 'One kilometer equals approximately 0.621371 miles. Divide the kilometer value by 1.60934 or multiply by 0.621371 to get miles.',
      example: 'A 42.2 km marathon is 26.2 miles. A 5 km fun run is 3.1 miles. A 100 km highway stretch is 62.1 miles.',
      formulas: [{ label: 'Conversion Factor', expression: 'miles = km x 0.621371', note: '1 km = 0.621371 miles.' }],
      resultExplanations: [{ resultLabel: 'Distance in Miles', explanation: 'Your distance expressed in miles using the exact conversion factor.' }],
      workflowLinks: [
        { slug: 'miles-to-km-calculator', step: 'Convert back the other direction.' },
        { slug: 'length-converter', step: 'Convert between other length units.' }
      ],
      faqs: [
        { q: 'How many miles is 1 km?', a: 'One kilometer equals approximately 0.62 miles, or about five-eighths of a mile.' },
        { q: 'What is 5K in miles?', a: 'A 5K race is 3.1 miles, about the length of a 45-minute walk.' },
        { q: 'How do I convert mph to km/h?', a: 'Multiply mph by 1.60934. A 60 mph speed limit is about 96.5 km/h.' }
      ],
      related: ['miles-to-km-calculator', 'length-converter', 'mph-to-kph-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-08-22' },
  },
  {
    id: 'gallons-liters',
    slug: 'gallons-to-liters-calculator',
    name: 'Gallons to Liters Converter',
    shortDesc: 'Convert gallons to liters for fuel, recipes, and pool maintenance.',
    tagline: 'American fuel and liquid volumes.',
    category: 'conversion',
    iconName: 'Box',
    keywords: ['gallons to liters', 'gallon to liter', 'convert gallons', 'fuel conversion'],
    kind: 'converter',
    unitGroup: 'volume',
    content: {
      intro: 'The Gallons to Liters Converter translates US gallons into metric liters, which is the standard for fuel, beverages, and pool chemical dosing in most countries. If a recipe calls for liters of broth or a gas tank holds 15 gallons, converting between these units makes real-world comparisons straightforward.',
      howItWorks: 'One US gallon equals approximately 3.78541 liters. Multiply the number of gallons by this factor to get liters. Note that imperial (UK) gallons are larger at about 4.546 liters.',
      example: 'A standard gas tank is about 15 gallons or 56.8 liters. A gallon of milk is 3.79 liters. A 5-gallon bucket holds 18.9 liters.',
      formulas: [{ label: 'Conversion Factor', expression: 'liters = gallons x 3.78541', note: '1 US gallon = 3.78541 liters.' }],
      resultExplanations: [{ resultLabel: 'Volume in Liters', explanation: 'Your volume expressed in liters using the exact US gallon conversion factor.' }],
      workflowLinks: [
        { slug: 'liters-to-gallons-calculator', step: 'Convert back the other direction.' },
        { slug: 'volume-converter', step: 'Convert between other volume units.' }
      ],
      faqs: [
        { q: 'How many liters is 1 gallon?', a: 'One US gallon equals approximately 3.79 liters. An imperial (UK) gallon is about 4.55 liters.' },
        { q: 'How do I convert liters to gallons?', a: 'Divide liters by 3.78541. A 20-liter container holds about 5.28 US gallons.' },
        { q: 'Is a gallon of water a day good?', a: 'Most health guidelines suggest about 2-3 liters of total fluid per day. A gallon of water (3.79 L) is near the upper end for many people.' }
      ],
      related: ['liters-to-gallons-calculator', 'volume-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.95, updatedAt: '2026-08-22' },
  },
  {
    id: 'liters-gallons',
    slug: 'liters-to-gallons-calculator',
    name: 'Liters to Gallons Converter',
    shortDesc: 'Convert liters to gallons for fuel purchases and US recipe conversions.',
    tagline: 'Metric volumes into gallons.',
    category: 'conversion',
    iconName: 'Box',
    keywords: ['liters to gallons', 'liter to gallon', 'convert liters', 'fuel conversion'],
    kind: 'converter',
    unitGroup: 'volume',
    content: {
      intro: 'The Liters to Gallons Converter translates metric liters into US gallons, which is how Americans measure fuel, paint, and pool chemicals. When a European recipe calls for 2 liters of stock or you see fuel priced per liter abroad, converting to gallons gives you a familiar reference.',
      howItWorks: 'Divide liters by 3.78541 to get US gallons. Alternatively multiply liters by 0.264172. The result is in US gallons, not imperial gallons.',
      example: 'A 2-liter soda bottle is 0.528 gallons. A 60-liter car fuel tank holds 15.87 gallons. A standard swimming pool at 25,000 liters is 6,604 gallons.',
      formulas: [{ label: 'Conversion Factor', expression: 'gallons = liters / 3.78541', note: '1 US gallon = 3.78541 liters.' }],
      resultExplanations: [{ resultLabel: 'Volume in Gallons', explanation: 'Your volume expressed in US gallons using the exact conversion factor.' }],
      workflowLinks: [
        { slug: 'gallons-to-liters-calculator', step: 'Convert back the other direction.' },
        { slug: 'fuel-cost-calculator', step: 'Calculate cost per mile after converting fuel volume.' }
      ],
      faqs: [
        { q: 'How many gallons is 1 liter?', a: 'One liter equals about 0.264 US gallons.' },
        { q: 'What is 20 liters in gallons?', a: '20 liters equals about 5.28 US gallons.' },
        { q: 'Are US and UK gallons different?', a: 'Yes. A US gallon is 3.79 liters. A UK (imperial) gallon is 4.55 liters, about 20% larger.' }
      ],
      related: ['gallons-to-liters-calculator', 'volume-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-08-22' },
  },
  {
    id: 'ounces-grams',
    slug: 'ounces-to-grams-calculator',
    name: 'Ounces to Grams Converter',
    shortDesc: 'Convert ounces to grams for baking, nutrition labels, and precious metals.',
    tagline: 'Precise weight for cooking and measuring.',
    category: 'conversion',
    iconName: 'Weight',
    keywords: ['ounces to grams', 'oz to grams', 'convert ounces', 'baking conversion'],
    kind: 'converter',
    unitGroup: 'weight',
    content: {
      intro: 'The Ounces to Grams Converter translates imperial ounces into metric grams, which is the standard for nutrition labels, jewelry weights, and international recipes. If a recipe calls for 8 oz of flour or a ring is 3 oz of gold, converting to grams gives you precision that scales matter.',
      howItWorks: 'One ounce (avoirdupois) equals approximately 28.3495 grams. Multiply the ounce value by this factor. For precious metals, troy ounces are slightly heavier at 31.1035 grams per troy ounce.',
      example: 'A 6-ounce steak is 170 grams. A standard stick of butter (4 oz) is 113 grams. A 1-ounce gold coin is 28.35 grams avoirdupois or 31.1 grams troy.',
      formulas: [{ label: 'Conversion Factor', expression: 'grams = ounces x 28.3495', note: '1 oz (avoirdupois) = 28.3495 g.' }],
      resultExplanations: [{ resultLabel: 'Weight in Grams', explanation: 'Your weight expressed in grams using the standard avoirdupois conversion factor.' }],
      workflowLinks: [
        { slug: 'grams-to-ounces-calculator', step: 'Convert back the other direction.' },
        { slug: 'recipe-scaling-calculator', step: 'Scale recipe ingredients after converting units.' }
      ],
      faqs: [
        { q: 'How many grams is 1 ounce?', a: 'One avoirdupois ounce equals 28.35 grams. A troy ounce (used for gold and silver) is 31.1 grams.' },
        { q: 'How many grams in 8 ounces?', a: '8 ounces equals 226.8 grams, roughly a standard measuring cup of flour.' },
        { q: 'What is the difference between avoirdupois and troy ounces?', a: 'Avoirdupois ounces measure everyday items (28.35 g). Troy ounces measure precious metals (31.1 g). They are not interchangeable.' }
      ],
      related: ['grams-to-ounces-calculator', 'weight-converter', 'recipe-scaling-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-08-22' },
  },
  {
    id: 'grams-ounces',
    slug: 'grams-to-ounces-calculator',
    name: 'Grams to Ounces Converter',
    shortDesc: 'Convert grams to ounces for US recipes and product weight references.',
    tagline: 'Metric weight into ounces.',
    category: 'conversion',
    iconName: 'Weight',
    keywords: ['grams to ounces', 'g to oz', 'convert grams', 'metric to ounces'],
    kind: 'converter',
    unitGroup: 'weight',
    content: {
      intro: 'The Grams to Ounces Converter translates metric grams into imperial ounces, which Americans use for ingredient weights, portion sizes, and product labels. When a European recipe lists 200 grams of chocolate or a supplement is dosed in grams, converting to ounces puts the amount in familiar terms.',
      howItWorks: 'Divide grams by 28.3495 to get avoirdupois ounces. This is the everyday ounce used for food and household items, not the troy ounce used for precious metals.',
      example: 'A 100-gram bag of coffee is 3.53 ounces. A 450-gram package of pasta is 15.9 ounces. A 28-gram serving of nuts is exactly 1 ounce.',
      formulas: [{ label: 'Conversion Factor', expression: 'ounces = grams / 28.3495', note: '1 oz (avoirdupois) = 28.3495 g.' }],
      resultExplanations: [{ resultLabel: 'Weight in Ounces', explanation: 'Your weight expressed in avoirdupois ounces using the exact conversion factor.' }],
      workflowLinks: [
        { slug: 'ounces-to-grams-calculator', step: 'Convert back the other direction.' },
        { slug: 'recipe-scaling-calculator', step: 'Scale recipe ingredients after converting units.' }
      ],
      faqs: [
        { q: 'How many ounces is 100 grams?', a: '100 grams equals about 3.53 ounces.' },
        { q: 'What is 1 pound in grams?', a: 'One pound equals 453.59 grams.' },
        { q: 'Is this for food or precious metals?', a: 'This uses avoirdupois ounces for food and everyday items. Precious metals use troy ounces, which are heavier at 31.1 grams each.' }
      ],
      related: ['ounces-to-grams-calculator', 'weight-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-08-22' },
  },
  {
    id: 'cups-ml',
    slug: 'cups-to-ml-calculator',
    name: 'Cups to Milliliters Converter',
    shortDesc: 'Convert cups to milliliters for international recipes and precise liquid measures.',
    tagline: 'Kitchen volumes that cross borders.',
    category: 'conversion',
    iconName: 'CupSoda',
    keywords: ['cups to ml', 'cup to ml', 'convert cups', 'cooking conversion'],
    kind: 'converter',
    unitGroup: 'volume',
    content: {
      intro: 'The Cups to Milliliters Converter translates US cups into metric milliliters, which is how most of the world measures liquid ingredients. American recipes use cups while European and Asian recipes use milliliters, so this conversion is essential when following international cookbooks or scaling recipes.',
      howItWorks: 'One US cup equals approximately 236.588 milliliters. Multiply the number of cups by this factor. A metric cup (used in Australia and the UK) is 250 ml, slightly larger.',
      example: '1 cup of water is 236.59 ml. A recipe calling for 2 cups of milk needs 473.18 ml. A half cup of sugar is 118.29 ml.',
      formulas: [{ label: 'Conversion Factor', expression: 'ml = cups x 236.588', note: '1 US cup = 236.588 ml.' }],
      resultExplanations: [{ resultLabel: 'Volume in Milliliters', explanation: 'Your volume expressed in milliliters using the exact US cup conversion factor.' }],
      workflowLinks: [
        { slug: 'recipe-scaling-calculator', step: 'Scale recipe ingredients after converting units.' },
        { slug: 'volume-converter', step: 'Convert between other volume units.' }
      ],
      faqs: [
        { q: 'How many ml is 1 cup?', a: 'One US cup equals 236.59 ml. A metric cup used in some countries is 250 ml.' },
        { q: 'How many cups in a liter?', a: 'One liter equals about 4.23 US cups.' },
        { q: 'Is a cup always the same size?', a: 'No. A US cup is 236.6 ml, a metric cup is 250 ml, and a Japanese cup is about 200 ml. Always check which standard your recipe uses.' }
      ],
      related: ['recipe-scaling-calculator', 'volume-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-08-22' },
  },
  {
    id: 'tbsp-tsp',
    slug: 'tablespoons-to-teaspoons-calculator',
    name: 'Tablespoons to Teaspoons Converter',
    shortDesc: 'Convert tablespoons to teaspoons for accurate cooking and medication dosing.',
    tagline: 'Small measures, big difference.',
    category: 'conversion',
    iconName: 'CupSoda',
    keywords: ['tablespoons to teaspoons', 'tbsp to tsp', 'cooking conversion'],
    kind: 'converter',
    unitGroup: 'volume',
    content: {
      intro: 'The Tablespoons to Teaspoons Converter handles the small-volume conversions that matter in cooking, baking, and medicine. A tablespoon of vanilla or a teaspoon of baking soda can make or break a recipe, and getting the ratio right between these common kitchen measures is straightforward.',
      howItWorks: 'One US tablespoon equals exactly 3 US teaspoons. Multiply the number of tablespoons by 3 to get teaspoons. This is an exact ratio with no rounding.',
      example: '2 tablespoons of olive oil is 6 teaspoons. Half a tablespoon of salt is 1.5 teaspoons. A recipe calling for 4 tablespoons of honey needs 12 teaspoons.',
      formulas: [{ label: 'Conversion Factor', expression: 'tsp = tbsp x 3', note: '1 US tablespoon = 3 US teaspoons exactly.' }],
      resultExplanations: [{ resultLabel: 'Volume in Teaspoons', explanation: 'Your volume expressed in teaspoons using the exact tablespoon-to-teaspoon ratio.' }],
      workflowLinks: [
        { slug: 'recipe-scaling-calculator', step: 'Scale recipe ingredients up or down.' },
        { slug: 'volume-converter', step: 'Convert between other volume units.' }
      ],
      faqs: [
        { q: 'How many teaspoons in 1 tablespoon?', a: 'Exactly 3 teaspoons in 1 US tablespoon.' },
        { q: 'How many tablespoons in a cup?', a: 'There are 16 US tablespoons in 1 US cup.' },
        { q: 'Are UK and US tablespoons the same?', a: 'No. A US tablespoon is 14.79 ml. A UK tablespoon is 15 ml. A metric tablespoon is also 15 ml. The differences are small but matter in precise baking.' }
      ],
      related: ['cups-to-ml-calculator', 'recipe-scaling-calculator', 'volume-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-08-22' },
  },
  {
    id: 'pints-quarts',
    slug: 'pints-to-quarts-calculator',
    name: 'Pints to Quarts Converter',
    shortDesc: 'Convert pints to quarts for US liquid volume measurements.',
    tagline: 'Everyday US volume conversion.',
    category: 'conversion',
    iconName: 'Box',
    keywords: ['pints to quarts', 'pint to quart', 'volume conversion', 'liquid measure'],
    kind: 'converter',
    unitGroup: 'volume',
    content: {
      intro: 'The Pints to Quarts Converter handles a common US liquid volume conversion. Ice cream comes in pints, broth is sold in quarts, and beer is measured in pints, so knowing how these two measures relate helps you compare container sizes at the store.',
      howItWorks: 'One quart equals exactly 2 pints. Divide the number of pints by 2 to get quarts, or multiply quarts by 2 to get pints. This is a straightforward doubling relationship.',
      example: 'A pint of ice cream is 0.5 quarts. Two pints of broth make 1 quart. A half-gallon carton holds 4 pints or 2 quarts.',
      formulas: [{ label: 'Conversion Factor', expression: 'quarts = pints / 2', note: '1 quart = 2 pints exactly.' }],
      resultExplanations: [{ resultLabel: 'Volume in Quarts', explanation: 'Your volume expressed in quarts using the exact pint-to-quart ratio.' }],
      workflowLinks: [
        { slug: 'volume-converter', step: 'Convert between other volume units.' },
        { slug: 'gallons-to-liters-calculator', step: 'Convert to metric liters.' }
      ],
      faqs: [
        { q: 'How many pints in a quart?', a: 'Exactly 2 pints in 1 quart, which is also half a gallon.' },
        { q: 'How many quarts in a gallon?', a: 'There are 4 quarts in 1 US gallon, and 8 pints.' },
        { q: 'Are US and UK pints the same?', a: 'No. A US pint is 473 ml. An imperial (UK) pint is 568 ml, about 20% larger.' }
      ],
      related: ['volume-converter', 'gallons-to-liters-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-08-22' },
  },
  {
    id: 'acres-sqft',
    slug: 'acres-to-square-feet-calculator',
    name: 'Acres to Square Feet Converter',
    shortDesc: 'Convert acres to square feet for real estate, landscaping, and property comparisons.',
    tagline: 'Land area you can visualize.',
    category: 'conversion',
    iconName: 'Square',
    keywords: ['acres to square feet', 'acre to sq ft', 'land area', 'property size'],
    kind: 'converter',
    unitGroup: 'area',
    content: {
      intro: 'The Acres to Square Feet Converter translates acres into square feet, which is how Americans visualize room sizes, lot dimensions, and property listings. When a real estate listing says 0.5 acres or a farm is 200 acres, converting to square feet gives you a sense of the actual space.',
      howItWorks: 'One acre equals exactly 43,560 square feet. Multiply the number of acres by this factor to get square feet. This is defined as the area of a chain by a furlong (66 feet by 660 feet).',
      example: 'A half-acre lot is 21,780 square feet. A standard football field is about 1.32 acres or 57,600 square feet. An acre is roughly the size of a football field without the end zones.',
      formulas: [{ label: 'Conversion Factor', expression: 'sqft = acres x 43560', note: '1 acre = 43,560 sq ft exactly.' }],
      resultExplanations: [{ resultLabel: 'Area in Square Feet', explanation: 'Your land area expressed in square feet using the exact conversion factor.' }],
      workflowLinks: [
        { slug: 'square-feet-to-acres-calculator', step: 'Convert back the other direction.' },
        { slug: 'room-area-calculator', step: 'Calculate room area from dimensions.' }
      ],
      faqs: [
        { q: 'How many square feet in 1 acre?', a: 'One acre equals exactly 43,560 square feet.' },
        { q: 'How big is an acre visually?', a: 'An acre is roughly the size of a football field without the end zones, or about 208 feet by 208 feet.' },
        { q: 'How do I convert square feet to acres?', a: 'Divide square feet by 43,560. A 10,000 square foot lot is about 0.23 acres.' }
      ],
      related: ['square-feet-to-acres-calculator', 'room-area-calculator', 'area-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-08-22' },
  },
  {
    id: 'sqft-acres',
    slug: 'square-feet-to-acres-calculator',
    name: 'Square Feet to Acres Converter',
    shortDesc: 'Convert square feet to acres for property listings and land comparisons.',
    tagline: 'Room-scale measurements into land scale.',
    category: 'conversion',
    iconName: 'Square',
    keywords: ['square feet to acres', 'sq ft to acres', 'convert area', 'land size'],
    kind: 'converter',
    unitGroup: 'area',
    content: {
      intro: 'The Square Feet to Acres Converter translates square feet into acres, which is the standard unit for land area in the US. Property sizes, lot dimensions, and garden areas often appear in square feet, and converting to acres helps you compare with larger land parcels.',
      howItWorks: 'Divide square feet by 43,560 to get acres. Since one acre equals 43,560 square feet exactly, the conversion is precise.',
      example: 'A 10,000 square foot lot is 0.23 acres. A 2,500 square foot house sits on about 0.057 acres. A 50,000 square foot commercial property is 1.15 acres.',
      formulas: [{ label: 'Conversion Factor', expression: 'acres = sqft / 43560', note: '1 acre = 43,560 sq ft.' }],
      resultExplanations: [{ resultLabel: 'Area in Acres', explanation: 'Your area expressed in acres using the exact conversion factor.' }],
      workflowLinks: [
        { slug: 'acres-to-square-feet-calculator', step: 'Convert back the other direction.' },
        { slug: 'room-area-calculator', step: 'Calculate room area from dimensions.' }
      ],
      faqs: [
        { q: 'How many square feet is a quarter acre?', a: 'A quarter acre is 10,890 square feet.' },
        { q: 'What is the average lot size in the US?', a: 'The average residential lot is about 8,000 to 10,000 square feet, roughly 0.18 to 0.23 acres.' },
        { q: 'Is this exact?', a: 'Yes. 1 acre = 43,560 square feet is an exact definition.' }
      ],
      related: ['acres-to-square-feet-calculator', 'area-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-08-22' },
  },
  {
    id: 'stone-pounds',
    slug: 'stone-to-pounds-calculator',
    name: 'Stone to Pounds Converter',
    shortDesc: 'Convert stone to pounds for UK body weight measurements.',
    tagline: 'British weight into pounds.',
    category: 'conversion',
    iconName: 'Weight',
    keywords: ['stone to pounds', 'stone to lbs', 'convert stone', 'UK weight'],
    kind: 'converter',
    unitGroup: 'weight',
    content: {
      intro: 'The Stone to Pounds Converter changes a weight given in stone into pounds at the fixed rate of 14 pounds per stone. British and Irish body weight is still routinely quoted in stone, while most of the rest of the world reads pounds or kilograms, so the conversion is the first step before comparing, dosing or filling in a form.',
      howItWorks: 'Multiplying by 14 is exact, because the stone is defined as 14 pounds rather than measured. British weight is usually written in a mixed form — 11 stone 4 pounds, not 11.29 stone — so the whole number is the stone count and the remainder is pounds. One stone is 6.35029318 kg and one pound is 0.45359237 kg, which means the pounds figure divides by 2.20462 to reach kilograms.',
      example: '10 stone is 140 pounds, which is about 63.5 kg. 12 stone is 168 pounds, or 76.2 kg. The mixed figure 11 stone 4 pounds means 11 × 14 + 4 = 158 pounds, and that is 71.7 kg. A 9 stone 10 pound reading — common in boxing and jockey weights — is 136 pounds.',
      formulas: [{ label: 'Conversion Factor', expression: 'lbs = stone × 14', note: '1 stone = 14 pounds exactly, about 6.35 kg.' }],
      resultExplanations: [{ resultLabel: 'Weight in Pounds', explanation: 'Your weight expressed in pounds using the exact stone-to-pound ratio.' }],
      workflowLinks: [
        { slug: 'pounds-to-stone-calculator', step: 'Convert back the other direction.' },
        { slug: 'weight-converter', step: 'Convert the same weight to kilograms and other units.' },
        { slug: 'bmi-calculator', step: 'Calculate BMI after converting your weight.' }
      ],
      faqs: [
        { q: 'How many pounds in 1 stone?', a: 'Exactly 14 pounds, which is about 6.35 kilograms. The number is a definition, not a measurement, so it never varies.' },
        { q: 'What is 10 stone in pounds?', a: '10 × 14 = 140 pounds, or about 63.5 kg. Ten stone is a common target weight in UK slimming contexts for exactly that reason — it is a round number in the unit people actually use.' },
        { q: 'Why do the British use stone?', a: 'It has been the customary unit for body weight in Britain since the medieval wool trade, and unlike most imperial measures it survived metrication for personal weight. Body weight in the UK is still commonly given in stone, while packaged goods are sold in grams.' },
        { q: 'How do I read 11 stone 4?', a: 'The first number is whole stone and the second is leftover pounds, so 11 stone 4 is 11 × 14 + 4 = 158 pounds. Written as a decimal it would be 11.29 stone, which is why the mixed form is used — it avoids awkward fractions.' },
        { q: 'Is a stone the same everywhere?', a: 'Not historically. The stone varied by trade and region — a 14-pound stone for body weight, but different values for meat or wool in some periods. The 14-pound stone became the standard, and that is the one this converter uses.' },
      ],
      related: ['pounds-to-stone-calculator', 'weight-converter', 'bmi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-11-05' },
  },
  {
    id: 'pounds-stone',
    slug: 'pounds-to-stone-calculator',
    name: 'Pounds to Stone Converter',
    shortDesc: 'Convert pounds to stone for UK weight references and comparisons.',
    tagline: 'Pounds into the British frame.',
    category: 'conversion',
    iconName: 'Weight',
    keywords: ['pounds to stone', 'lbs to stone', 'weight conversion', 'UK weight'],
    kind: 'converter',
    unitGroup: 'weight',
    content: {
      intro: 'The Pounds to Stone Converter divides a weight in pounds by 14 to give stone, and splits the result into the whole-stone-plus-pounds form the UK actually uses. It is the direction that matters when a US scale, gym log or medical record gives pounds and the person thinks in stone.',
      howItWorks: 'Dividing by 14 gives stone as a decimal. To split it into the familiar form, take the whole number as stone and multiply the leftover fraction by 14 to get pounds: 158 / 14 = 11.2857, so 11 stone and 0.2857 × 14 = 4 pounds. Because both directions use the same fixed ratio, a figure converted one way and back returns exactly the original weight.',
      example: '154 pounds is exactly 11 stone, and 200 pounds is 14 stone 4 pounds — not 14.29 stone in everyday speech. 168 pounds is 12 stone, 130 pounds is 9 stone 4, and 250 pounds is 17 stone 12. In metric, 154 pounds is 69.9 kg and one stone is 6.35 kg.',
      formulas: [{ label: 'Conversion Factor', expression: 'stone = pounds / 14', note: '1 stone = 14 pounds exactly.' }],
      resultExplanations: [{ resultLabel: 'Weight in Stone', explanation: 'Your weight expressed in stone using the exact conversion ratio.' }],
      workflowLinks: [
        { slug: 'stone-to-pounds-calculator', step: 'Convert back the other direction.' },
        { slug: 'weight-converter', step: 'Convert pounds to kilograms and other units.' },
        { slug: 'bmi-calculator', step: 'Calculate BMI after converting your weight.' }
      ],
      faqs: [
        { q: 'How do I express stone and pounds separately?', a: 'Divide the pounds by 14. The whole number is stone, and the remainder — the fraction multiplied by 14 — is the leftover pounds. So 175 / 14 = 12.5, which reads as 12 stone 7 pounds.' },
        { q: 'Is stone used anywhere else?', a: 'Body weight in the UK and Ireland is the main surviving use, along with some British sporting weight classes. Elsewhere the stone is essentially unknown, which is why a conversion is usually needed before sharing a figure internationally.' },
        { q: 'What is the metric equivalent?', a: 'One stone is 6.35029318 kg, so a 12 stone person weighs about 76.2 kg. To go straight from pounds to kilograms, multiply by 0.45359237.' },
        { q: 'Why is 200 pounds not exactly 14 stone 4?', a: 'It is — 14 × 14 = 196, plus 4 makes 200. Written as a decimal, 200 / 14 = 14.2857 stone, and the 0.2857 is 4 pounds. Both forms describe the same weight; only the presentation differs.' },
        { q: 'Does this work for objects as well as people?', a: 'Yes, the ratio is universal, but the stone is almost never used for anything except body weight today. For luggage, produce or parcels the figure would normally be given in pounds or kilograms instead.' },
      ],
      related: ['stone-to-pounds-calculator', 'weight-converter', 'bmi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-11-05' },
  },
  {
    id: 'mb-gb',
    slug: 'mb-to-gb-calculator',
    name: 'Megabytes to Gigabytes Converter',
    shortDesc: 'Convert megabytes to gigabytes for file storage and data planning.',
    tagline: 'Digital storage that makes sense.',
    category: 'conversion',
    iconName: 'HardDrive',
    keywords: ['mb to gb', 'megabytes to gigabytes', 'convert mb', 'file size'],
    kind: 'converter',
    unitGroup: 'digital',
    content: {
      intro: 'The Megabytes to Gigabytes Converter translates megabytes into gigabytes, which is how we think about phone storage, download sizes, and cloud space. When an app is 250 MB or a photo is 5 MB, converting to gigabytes helps you understand how much of your 128 GB phone is used.',
      howItWorks: 'One gigabyte equals 1,024 megabytes in binary terms, which matches how operating systems report file sizes. Divide MB by 1,024 to get GB.',
      example: 'A 4 GB phone photo library is 4,096 MB. A 700 MB MP3 album is about 0.68 GB. A 15 GB cloud drive holds 15,360 MB.',
      formulas: [{ label: 'Binary Conversion', expression: 'GB = MB / 1024', note: '1 GB = 1,024 MB in binary.' }],
      resultExplanations: [{ resultLabel: 'Size in Gigabytes', explanation: 'Your file size expressed in gigabytes using the binary conversion.' }],
      workflowLinks: [
        { slug: 'gb-to-tb-calculator', step: 'Convert to terabytes for larger storage.' },
        { slug: 'data-storage-converter', step: 'Convert between all storage units.' }
      ],
      faqs: [
        { q: 'How many MB in 1 GB?', a: 'In binary terms, 1 GB = 1,024 MB. Manufacturers sometimes use 1,000 MB = 1 GB.' },
        { q: 'Why does my drive show less space?', a: 'Manufacturers use decimal (1 GB = 1 billion bytes) while your OS uses binary (1 GB = 1.074 billion bytes).' },
        { q: 'Is 1 GB enough for a movie?', a: 'A standard definition movie is about 1-1.5 GB. HD movies are 3-5 GB. 4K movies can be 15-25 GB.' }
      ],
      related: ['gb-to-tb-calculator', 'data-storage-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-08-22' },
  },
  {
    id: 'gb-tb',
    slug: 'gb-to-tb-calculator',
    name: 'Gigabytes to Terabytes Converter',
    shortDesc: 'Convert gigabytes to terabytes for hard drive and cloud storage.',
    tagline: 'From phone-scale to drive-scale.',
    category: 'conversion',
    iconName: 'HardDrive',
    keywords: ['gb to tb', 'gigabytes to terabytes', 'storage conversion', 'hard drive size'],
    kind: 'converter',
    unitGroup: 'digital',
    content: {
      intro: 'The Gigabytes to Terabytes Converter divides a storage figure by 1,024 to express it in terabytes, the unit drives and cloud plans are sold in. Going from phone-scale to drive-scale is where the gap between advertised capacity and reported capacity becomes large enough to notice, so it is worth doing the arithmetic deliberately.',
      howItWorks: 'A terabyte is 1,024 gigabytes in the binary convention that operating systems use, so dividing by 1,024 converts GB to TB and gives the figure you will see in a file manager. Drive manufacturers count in decimal instead, where a terabyte is 1,000 GB and each gigabyte is a billion bytes. The two conventions diverge by about 10% at this scale: a drive sold as 1 TB holds a trillion bytes, which the operating system reports as 931 GB, or 0.91 TB.',
      example: '1,024 GB is exactly 1 TB, and 500 GB is 0.49 TB. A drive advertised as 4 TB contains 4,000 GB in decimal terms, which shows up as roughly 3.64 TB in Windows. A 256 GB phone is 0.25 TB, and a 2 TB backup drive holds about 1.82 TB of reported space.',
      formulas: [{ label: 'Binary Conversion', expression: 'TB = GB / 1,024', note: '1 TB = 1,024 GB in the binary convention.' }],
      resultExplanations: [{ resultLabel: 'Size in Terabytes', explanation: 'Your storage expressed in terabytes using the binary conversion.' }],
      workflowLinks: [
        { slug: 'mb-to-gb-calculator', step: 'Convert the smaller step, from megabytes to gigabytes.' },
        { slug: 'data-storage-converter', step: 'Convert between all storage units, including bits and bytes.' },
        { slug: 'download-time-calculator', step: 'See how long a file of that size takes to transfer.' }
      ],
      faqs: [
        { q: 'How many GB in 1 TB?', a: '1,024 GB in the binary convention the calculator uses. Manufacturers quote 1,000 GB to the terabyte, which is the source of the missing-space confusion — the physical drive is the same size either way.' },
        { q: 'How many photos fit in 1 TB?', a: 'At about 5 MB a photo, roughly 200,000. At 20 MB for a high-resolution raw file, around 50,000. Video dominates storage far more: an hour of 4K footage can be 15-30 GB depending on compression.' },
        { q: 'Is 1 TB enough for most people?', a: 'For documents and photos, comfortably. For a gaming library or video editing, 2-4 TB is more realistic — modern games are often 50-100 GB each, so twenty of them fills a terabyte before anything else is stored.' },
        { q: 'Why does a 4 TB drive show 3.6 TB?', a: 'Because 4 TB decimal is 4,000,000,000,000 bytes, and dividing by 1,024 four times gives 3.638 TB binary. Nothing is missing; the manufacturer counts in powers of 1,000 and the operating system counts in powers of 1,024.' },
        { q: 'Should I use TB or TiB?', a: 'Strictly, TiB is the binary unit (1,024 GiB) and TB is decimal (1,000 GB). Most consumer software labels binary sizes as TB anyway, so this converter follows the common convention rather than the strict one.' },
      ],
      related: ['mb-to-gb-calculator', 'data-storage-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-11-05' },
  },
  {
    id: 'hours-minutes',
    slug: 'hours-to-minutes-calculator',
    name: 'Hours to Minutes Converter',
    shortDesc: 'Convert hours to minutes for time tracking, scheduling, and project billing.',
    tagline: 'Time breakdowns that work.',
    category: 'conversion',
    iconName: 'Clock',
    keywords: ['hours to minutes', 'hr to min', 'time conversion', 'minutes in an hour'],
    kind: 'converter',
    unitGroup: 'time-conv',
    content: {
      intro: 'The Hours to Minutes Converter turns a duration in hours into minutes at the fixed rate of 60 minutes per hour. It is the conversion behind timesheets, meeting notes and billing, where a duration like 2.5 hours has to become a number that a minutes-based system can use.',
      howItWorks: 'Hours are multiplied by 60. The rate is exact — the hour is defined as 60 minutes — so nothing is rounded and the reverse direction simply divides by 60. Because time is base-60, a decimal part is not hundredths: 0.5 hours is 30 minutes, not 50, which is why clock time and decimal hours diverge.',
      example: '2.5 hours is 150 minutes, an 8-hour workday is 480 minutes, and a 0.1-hour slot is 6 minutes. Going the other way, a 90-minute film is 1.5 hours and a 45-minute commute is 0.75 hours.',
      formulas: [{ label: 'Time Conversion', expression: 'minutes = hours x 60', note: '1 hour = 60 minutes exactly.' }],
      resultExplanations: [{ resultLabel: 'Time in Minutes', explanation: 'Your time expressed in minutes using the exact hour-to-minute ratio.' }],
      workflowLinks: [
        { slug: 'days-to-hours-calculator', step: 'Convert days to hours for longer periods.' },
        { slug: 'decimal-hours-calculator', step: 'Turn hours and minutes into payable decimal hours.' }
      ],
      faqs: [
        { q: 'How many minutes in 1 hour?', a: 'Exactly 60 minutes. That is why a 60-minute TV slot carries roughly 42-45 minutes of programme once advertising is removed.' },
        { q: 'How many minutes in 8 hours?', a: '480 minutes, the elapsed time of a standard workday. A full 40-hour week is 2,400 minutes.' },
        { q: 'How do I convert minutes to hours?', a: 'Divide the minutes by 60. A 90-minute film is 1.5 hours, and 100 minutes is 1.667 hours — 1 hour 40 minutes.' },
        { q: 'Why is 0.5 hours 30 minutes and not 50?', a: 'Because time counts in sixties. Half of 60 is 30, so the digits after the point in hours do not behave like decimals of 100. That mismatch is exactly what a decimal-hours converter resolves for payroll.' }
      ],
      related: ['days-to-hours-calculator', 'decimal-hours-calculator', 'weeks-to-days-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-11-05' },
  },
  {
    id: 'days-hours',
    slug: 'days-to-hours-calculator',
    name: 'Days to Hours Converter',
    shortDesc: 'Convert days to hours for deadlines, travel and schedules.',
    tagline: 'Days into workable hours.',
    category: 'conversion',
    iconName: 'Clock',
    keywords: ['days to hours', 'day to hours', 'time conversion', 'hours in a day'],
    kind: 'converter',
    unitGroup: 'time-conv',
    content: {
      intro: 'The Days to Hours Converter multiplies a number of days by 24 to give the equivalent number of hours. Deadlines, cancellation windows and itineraries are usually written in days but planned in hours, and this is the conversion between the two.',
      howItWorks: 'A civil day is 24 hours, so the conversion is a clean multiplication and its reverse is a division by 24. It uses the calendar day rather than the sidereal day: a solar day drifts by seconds across the year but is 24 hours for every practical purpose.',
      example: '3 days is 72 hours, a 14-day period is 336 hours, and half a day is 12 hours. A 5-day working week is 120 hours of elapsed time even though only about 40 of those hours are paid work.',
      formulas: [{ label: 'Time Conversion', expression: 'hours = days x 24', note: '1 day = 24 hours exactly.' }],
      resultExplanations: [{ resultLabel: 'Time in Hours', explanation: 'Your time expressed in hours using the exact day-to-hour ratio.' }],
      workflowLinks: [
        { slug: 'weeks-to-days-calculator', step: 'Convert weeks to days.' },
        { slug: 'hours-to-minutes-calculator', step: 'Break hours into minutes.' }
      ],
      faqs: [
        { q: 'How many hours in 1 day?', a: 'Exactly 24, of which most adults spend about 8 asleep, leaving roughly 16 waking hours. The 24-hour figure is a definition of the civil day, not a measurement.' },
        { q: 'How many hours in a work week?', a: 'A 5-day week is 120 hours of elapsed time, but a standard full-time week pays for about 40 of them. The gap is the point of the distinction between days off and paid hours.' },
        { q: 'Is a day always 24 hours?', a: 'Almost. The solar day averages 24 hours and the sidereal day is 23 hours 56 minutes 4 seconds. Clock days can also be 23 or 25 hours when daylight saving starts or ends.' },
        { q: 'How many hours are in a year?', a: '365 x 24 = 8,760 hours in a common year and 8,784 in a leap year. A 40-hour working week across 52 weeks comes to 2,080 paid hours, the figure many contracts quote.' }
      ],
      related: ['weeks-to-days-calculator', 'hours-to-minutes-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-11-05' },
  },
  {
    id: 'weeks-days',
    slug: 'weeks-to-days-calculator',
    name: 'Weeks to Days Converter',
    shortDesc: 'Convert weeks to days for planning and countdowns.',
    tagline: 'Weeks broken into days.',
    category: 'conversion',
    iconName: 'CalendarClock',
    keywords: ['weeks to days', 'week to days', 'how many days in a week'],
    kind: 'converter',
    unitGroup: 'time-conv',
    content: {
      intro: 'The Weeks to Days Converter turns weeks into days at exactly 7 days per week. Notice periods, training blocks and countdowns are usually written in weeks but scheduled in days, and this is the arithmetic that bridges them.',
      howItWorks: 'Multiplying by 7 is exact, and dividing by 7 reverses it. Because 7 does not divide evenly into a month or a year, week counts rarely line up with calendar months: 52 weeks is 364 days, one short of a common year, which is why a year is 52 weeks and a day.',
      example: '2 weeks is 14 days, 6 weeks is 42 days, and 90 days is 90 / 7 = 12.86 weeks, or 12 weeks and 6 days. A 12-week programme is 84 days, which is why it often ends a day or two before the three-month mark.',
      formulas: [{ label: 'Time Conversion', expression: 'days = weeks x 7', note: '1 week = 7 days exactly.' }],
      resultExplanations: [{ resultLabel: 'Time in Days', explanation: 'Your time expressed in days using the exact week-to-day ratio.' }],
      workflowLinks: [
        { slug: 'months-to-days-calculator', step: 'Convert months to days.' },
        { slug: 'days-to-hours-calculator', step: 'Break days into hours.' }
      ],
      faqs: [
        { q: 'How many days in 1 week?', a: 'Exactly 7 — usually 5 weekdays and 2 weekend days, though the split depends on the country and the job.' },
        { q: 'How many days in 4 weeks?', a: '28 days. That is the length of February in a common year, which is why February is the one month that is exactly four weeks long.' },
        { q: 'Is 4 weeks the same as a month?', a: 'No. Most months are 30 or 31 days, and the average is 30.44, so four weeks falls about two and a half days short of a month.' },
        { q: 'How many weeks are in a year?', a: '365 / 7 = 52.14, so a common year is 52 weeks plus one day, and a leap year is 52 weeks plus two. That extra day is why a fixed date drifts to a different weekday each year.' }
      ],
      related: ['months-to-days-calculator', 'days-to-hours-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-11-05' },
  },
  {
    id: 'months-days',
    slug: 'months-to-days-calculator',
    name: 'Months to Days Converter',
    shortDesc: 'Convert months to days using the 30.44-day average.',
    tagline: 'Calendar months into exact days.',
    category: 'conversion',
    iconName: 'CalendarClock',
    keywords: ['months to days', 'how many days in a month', 'days in month'],
    kind: 'converter',
    unitGroup: 'time-conv',
    content: {
      intro: 'The Months to Days Converter converts a number of months into days using the average month of 30.44 days. Months are the one common time unit with no fixed length, so an average is the only way to give one number for an arbitrary count of months.',
      howItWorks: 'An average year of 365.25 days divided by 12 gives 30.4375, rounded here to 30.44. Multiplying by that average is accurate across long spans and approximate across short ones: a specific six-month period can be 181, 182, 183 or 184 days depending on which months it covers and whether a leap day falls inside it.',
      example: '9 months is about 274 days and 6 months about 183. Three months is roughly 91 days, and 100 days works out to 3.28 months. For a lease or a notice period, count the real calendar days instead: January to June is 181 days in a common year and 182 in a leap year.',
      formulas: [{ label: 'Average Month', expression: 'days = months x 30.44', note: 'Average of 30.44 days per month.' }],
      resultExplanations: [{ resultLabel: 'Time in Days', explanation: 'Your time expressed in days using the average month length.' }],
      workflowLinks: [
        { slug: 'weeks-to-days-calculator', step: 'Convert weeks to days.' },
        { slug: 'years-to-days-calculator', step: 'Convert years to days.' }
      ],
      faqs: [
        { q: 'How many days in a month?', a: 'Between 28 and 31 days depending on the month, with February the outlier and the 31-day months alternating through the year. The average across a full year is 30.44.' },
        { q: 'How many days in 6 months?', a: 'About 183 by this average, but the real answer depends on the months: January to June is 181 days in a common year and 182 in a leap year, while April to September is 183.' },
        { q: 'How many months is 100 days?', a: '100 / 30.44 = 3.28 months, or roughly 3 months and 9 days. That is an average across the year rather than a fixed answer.' },
        { q: 'Why use 30.44 instead of 30?', a: 'Because 12 months of 30 days is 360 days, five short of a year. The gap is small per month and large over a multi-year lease, so the average keeps long conversions honest.' }
      ],
      related: ['weeks-to-days-calculator', 'years-to-days-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-11-05' },
  },
  {
    id: 'years-days',
    slug: 'years-to-days-calculator',
    name: 'Years to Days Converter',
    shortDesc: 'Convert years to days at 365 days per year.',
    tagline: 'Years into countable days.',
    category: 'conversion',
    iconName: 'CalendarClock',
    keywords: ['years to days', 'how many days in a year', 'days in a year', 'leap year'],
    kind: 'converter',
    unitGroup: 'time-conv',
    content: {
      intro: 'The Years to Days Converter multiplies a number of years by 365 to give a day count. It is a plain arithmetic conversion on a fixed 365-day year, which is what you want for budgets, countdowns and contractual periods rather than for dating a calendar.',
      howItWorks: 'The converter uses exactly 365 days per year, so the arithmetic is unambiguous and reversible: 7 years is 2,555 days, and 2,555 days is 7 years. It deliberately does not add leap days, because leap days depend on which calendar years you cross rather than on how many years you are converting.',
      example: '5 years is 5 x 365 = 1,825 days, and 10 years is 3,650 days. A real 10-year span containing two or three leap years is 3,652 or 3,653 days, so expect the calendar to run a couple of days ahead of this exact conversion.',
      formulas: [{ label: 'Exact Year', expression: 'days = years x 365', note: 'The converter treats every year as exactly 365 days.' }],
      resultExplanations: [{ resultLabel: 'Time in Days', explanation: 'Your time expressed in days, using 365 days per year.' }],
      workflowLinks: [
        { slug: 'months-to-days-calculator', step: 'Convert months to days.' },
        { slug: 'weeks-to-days-calculator', step: 'Convert weeks to days.' }
      ],
      faqs: [
        { q: 'How many days in 1 year?', a: '365 days in a standard year and 366 in a leap year. This converter uses 365 for every year, so it returns 1,825 for five years rather than the 1,826 a calendar containing one leap day would give.' },
        { q: 'Why is it not 365.25?', a: 'Because 365.25 is an average, not a count. Multiplying by 365.25 produces fractional days and a number that no calendar will ever show, which is worse than a clean 365 for planning purposes.' },
        { q: 'How many days in 10 years?', a: 'This converter returns 3,650. A real 10-year span usually contains two or three leap days, giving 3,652 or 3,653 — the difference is the leap-year handling, not an error in the multiplication.' },
        { q: 'What years are leap years?', a: 'Years divisible by 4, except century years not divisible by 400. 2024 and 2028 are leap years; 1900 was not, and 2000 was.' }
      ],
      related: ['months-to-days-calculator', 'weeks-to-days-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-11-04' },
  },
  {
    id: 'mph-kph',
    slug: 'mph-to-kph-calculator',
    name: 'MPH to KPH Converter',
    shortDesc: 'Convert miles per hour to kilometres per hour and back.',
    tagline: 'Speed limits that cross borders.',
    category: 'conversion',
    iconName: 'Gauge',
    keywords: ['mph to kph', 'mph to kmh', 'miles per hour to km', 'speed conversion'],
    kind: 'converter',
    unitGroup: 'speed',
    content: {
      intro: 'The MPH to KPH Converter translates between miles per hour and kilometres per hour, the two units that cover almost every speedometer and speed-limit sign in the world. Enter a speed on either side and the converter shows the equivalent in the other.',
      howItWorks: 'One mile is exactly 1.609344 kilometres, so one mile per hour is exactly 1.609344 kilometres per hour. Converting mph to km/h multiplies by that factor; converting the other way divides by it. The exact factor matters at speed: rounding it to 1.6 puts a 70 mph limit about 0.7 km/h out.',
      example: '60 mph x 1.609344 = 96.56 km/h, so a 60 mph motorway limit is posted as 96 km/h in metric countries. A 30 mph town limit is 48.28 km/h, and 100 mph is 160.93 km/h. Going the other way, a 130 km/h autoroute limit is 80.78 mph.',
      formulas: [{ label: 'Speed Conversion', expression: 'km/h = mph x 1.609344', note: '1 mile = 1.609344 km exactly.' }],
      resultExplanations: [{ resultLabel: 'Converted Speed', explanation: 'The speed expressed in the other unit, using the exact 1.609344 factor.' }],
      workflowLinks: [
        { slug: 'speed-converter', step: 'Convert between other speed units, including knots and metres per second.' },
        { slug: 'fuel-cost-calculator', step: 'Work out what a journey costs at that speed.' }
      ],
      faqs: [
        { q: 'How fast is 60 mph in km/h?', a: '60 mph is 96.56 km/h, which is why a 60 mph road is usually signed as 100 km/h in metric countries. Rounding to 96 or 97 is normal on road signs.' },
        { q: 'What is 100 km/h in mph?', a: '100 / 1.609344 = 62.14 mph. A 100 km/h limit is therefore slightly faster than a 60 mph limit.' },
        { q: 'Which countries use mph?', a: 'The United States uses mph for road speeds, and the United Kingdom uses mph for road signs while selling fuel in litres. Most other countries use km/h.' },
        { q: 'Why 1.609344 and not 1.6?', a: 'The mile is legally defined as exactly 1,609.344 metres, so the conversion is exact. Using 1.6 is fine for a rough mental estimate but drifts by about 0.6% — roughly 1 km/h at motorway speed.' }
      ],
      related: ['speed-converter', 'fuel-cost-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-11-04' },
  },
  {
    id: 'psi-bar',
    slug: 'psi-to-bar-calculator',
    name: 'PSI to Bar Converter',
    shortDesc: 'Convert PSI to bar for tire pressure, air compressors, and hydraulics.',
    tagline: 'Pressure units that matter.',
    category: 'conversion',
    iconName: 'Gauge',
    keywords: ['psi to bar', 'pressure conversion', 'tire pressure'],
    kind: 'converter',
    unitGroup: 'pressure',
    content: {
      intro: 'The PSI to Bar Converter changes pounds per square inch into bar for tyre pressure, compressors and hydraulics. Both measure the same quantity — force spread over an area — but PSI is standard in the United States while bar is used across most of Europe and Asia, so a car manual and a garage gauge can disagree on units alone.',
      howItWorks: 'One bar is 100,000 pascals and one psi is 6,894.76 pascals, which makes 1 bar = 14.5038 psi. Dividing psi by 14.5038 gives bar; multiplying reverses it. Both are gauge pressures in everyday use, meaning the reading above atmospheric pressure rather than absolute pressure, and that convention is what tyre placards and compressor dials assume.',
      example: '32 psi — a typical passenger-car tyre — is 32 / 14.5038 = 2.21 bar. A road bike at 100 psi is 6.89 bar, a truck tyre at 110 psi is 7.58 bar, and an 8 bar compressor is about 116 psi.',
      formulas: [{ label: 'Pressure Conversion', expression: 'bar = PSI / 14.5038', note: '1 bar = 14.5038 PSI.' }],
      resultExplanations: [{ resultLabel: 'Pressure in Bar', explanation: 'Your pressure expressed in bar using the exact conversion factor.' }],
      workflowLinks: [
        { slug: 'tire-size-calculator', step: 'Check which tyre size the pressure belongs to.' },
        { slug: 'boiling-point-calculator', step: 'See how pressure changes the boiling point of water.' }
      ],
      faqs: [
        { q: 'What is 32 PSI in bar?', a: '32 / 14.5038 = 2.21 bar, a common placard figure for a passenger car. Many European cars state the same pressure as 220 kPa, which is 2.2 bar.' },
        { q: 'How many PSI in 1 bar?', a: '14.5038 psi. That makes 2 bar about 29 psi and 3 bar about 43.5 psi — a useful pair to remember at a garage pump.' },
        { q: 'Is bar the same as atm?', a: 'Close but not equal. 1 bar is 0.9869 standard atmospheres, and 1 atmosphere is 1.01325 bar. The difference is under 2%, so a rough conversion is fine for tyres and not for anything calibrated.' },
        { q: 'What about kPa?', a: '1 bar is exactly 100 kPa, so bar and kPa differ only by a factor of 100. European tyre placards often use both — 2.2 bar and 220 kPa are the same pressure.' },
        { q: 'Is this gauge pressure or absolute pressure?', a: 'Gauge pressure, which is what a tyre gauge or compressor dial reads. Absolute pressure adds roughly 1 bar (14.7 psi) for the atmosphere on top. Boost gauges and tyre inflators normally show gauge.' }
      ],
      related: ['tire-size-calculator', 'boiling-point-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-11-05' },
  }
];
