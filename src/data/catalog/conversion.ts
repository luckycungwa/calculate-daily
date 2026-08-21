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
        'The Temperature Converter converts between Celsius, Fahrenheit, and Kelvin in either direction. Cooking, weather, and science all use different scales, and this tool removes the mental arithmetic.',
      howItWorks:
        'Every scale normalizes to Celsius internally. Fahrenheit converts as (F - 32) x 5/9 and Kelvin as K - 273.15, then the target scale is applied in reverse.',
      example:
        'Convert 100°F to Celsius: (100 - 32) x 5/9 = 37.8°C. The same temperature is 310.9 K.',
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
        { slug: 'length-converter', step: 'Switch related metric and imperial units in the same project.' },
        { slug: 'weight-converter', step: 'Complete a unit family conversion for cooking or travel.' },
      ],
      faqs: [
        { q: 'How do I convert Celsius to Fahrenheit?', a: 'Multiply by 9/5 and add 32: C x 9/5 + 32. The converter does this automatically in either direction.' },
        { q: 'At what temperature are Celsius and Fahrenheit equal?', a: 'At -40 degrees, both scales read -40. It is the one point where the two agree.' },
        { q: 'Why does Kelvin have no negative numbers?', a: 'Kelvin is an absolute scale starting at absolute zero, the coldest physically possible temperature, so values are never negative.' },
      ],
      related: ['length-converter', 'weight-converter', 'speed-converter'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
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
        'The Length Converter handles millimeters through miles, including meters, feet, inches, and yards. It is a go-to for DIY projects, travel math, and international unit switching.',
      howItWorks:
        'All units normalize to meters. Inches, feet, yards, and miles convert through their exact meter equivalents, then scale to the chosen target unit.',
      example:
        'Convert 2 miles to kilometers: 2 x 1.609344 = 3.22 km. Or convert 180 cm to feet for a height check: about 5 feet 11 inches.',
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
        { q: 'How many feet are in a meter?', a: 'One meter equals about 3.281 feet, or 39.37 inches. The converter applies the exact factor.' },
        { q: 'How do I convert inches to centimeters?', a: 'Multiply inches by 2.54. An 11-inch tablet is 27.94 cm across.' },
        { q: 'Does it include nautical or survey units?', a: 'This tool covers everyday units from millimeters to miles. Nautical miles are available in the speed converter context.' },
      ],
      related: ['temperature-converter', 'weight-converter', 'room-area-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.8,
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
        'The Weight Converter converts between milligrams, grams, kilograms, ounces, pounds, stone, and metric tons. Fitness tracking, cooking, and international shipping all rely on these conversions.',
      howItWorks:
        'Every unit normalizes to kilograms using exact factors. A pound is 0.453592 kg and an ounce is 0.0283495 kg, so conversions are precise in either direction.',
      example:
        'Convert 150 pounds to kilograms: 150 x 0.453592 = 68.04 kg. Convert 1 stone to pounds: 14 lbs.',
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
        { slug: 'length-converter', step: 'Pair weight with height for body metrics.' },
      ],
      faqs: [
        { q: 'How many kilograms are in a pound?', a: 'One pound equals 0.453592 kilograms, so dividing pounds by 2.20462 converts to kilograms.' },
        { q: 'What is a stone?', a: 'A stone is a British mass unit equal to 14 pounds, or about 6.35 kg, still common for body weight in the UK.' },
        { q: 'Is mass the same as weight?', a: 'Technically no, but for everyday use mass in kilograms and weight in pounds are treated interchangeably on Earth.' },
      ],
      related: ['length-converter', 'temperature-converter', 'bmi-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.75,
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
        'The Speed Converter translates between kilometers per hour, miles per hour, knots, and meters per second. It is handy for road-trip math, aviation references, and comparing sports performance.',
      howItWorks:
        'All speeds normalize to km/h, then scale to the target unit. A mile is 1.609344 km and a knot is 1.852 km/h, giving exact cross-unit results.',
      example:
        'Convert 60 mph to km/h: 60 x 1.609344 = 96.56 km/h. Convert 20 knots to mph: about 23 mph.',
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
      ],
      faqs: [
        { q: 'How many mph is 100 km/h?', a: '100 km/h equals about 62.1 mph, using the factor 1 km = 0.621371 miles.' },
        { q: 'What is a knot?', a: 'A knot is one nautical mile per hour, used in aviation and maritime travel. One knot equals about 1.15 mph.' },
        { q: 'How do I convert m/s to km/h?', a: 'Multiply meters per second by 3.6. A 10 m/s sprint is 36 km/h.' },
      ],
      related: ['length-converter', 'running-pace-calculator', 'fuel-cost-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
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
        'The Area Converter converts square meters, square feet, acres, hectares, and square miles. Real estate, landscaping, and international property listings rarely share the same units, so this tool keeps comparisons honest.',
      howItWorks:
        'All units normalize to square meters using exact conversion factors. An acre equals 4046.86 m² and a hectare 10,000 m², enabling precise scaling between systems.',
      example:
        'Convert 1,000 square feet to square meters: 1,000 x 0.092903 = 92.9 m². Convert 2 acres to hectares: about 0.81 ha.',
      formulas: [
        {
          label: 'Normalized Conversion',
          expression: 'Result = Input (in m²) × Target factor',
          note: '1 acre = 4046.86 m², 1 hectare = 10,000 m².',
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
      ],
      faqs: [
        { q: 'How many square feet are in a square meter?', a: 'One square meter equals about 10.764 square feet. Divide square feet by 10.764 to convert.' },
        { q: 'What is the difference between acre and hectare?', a: 'A hectare is 10,000 m² and equals about 2.471 acres. Acres are standard in US real estate; hectares are standard elsewhere.' },
        { q: 'Can I convert room dimensions directly?', a: 'For room areas, enter length and width in the room-area calculator, then use this converter to switch the result to another unit.' },
      ],
      related: ['room-area-calculator', 'length-converter', 'flooring-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
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
        'The Volume Converter converts between milliliters, liters, teaspoons, cups, pints, quarts, gallons, and cubic meters. It serves recipes, fuel, and container math in a single tool.',
      howItWorks:
        'Every unit normalizes to liters using exact customary factors. A US gallon is 3.78541 liters and a cup is 0.236588 liters, so conversions stay accurate across systems.',
      example:
        'Convert 2 gallons to liters: 2 x 3.78541 = 7.57 liters. Convert 500 ml to cups: about 2.11 US cups.',
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
      ],
      faqs: [
        { q: 'How many liters are in a gallon?', a: 'A US gallon is 3.785 liters; an imperial gallon is larger at 4.546 liters. This converter uses US customary units.' },
        { q: 'How many milliliters in a cup?', a: 'A US cup holds 237 milliliters. The converter applies the exact factor for any unit pair.' },
        { q: 'Does it convert dry volume too?', a: 'Yes, all volume units here are equivalent by capacity. For weight-based baking, use the cups-to-grams tool instead.' },
      ],
      related: ['oz-to-cups-calculator', 'cups-to-grams-calculator', 'room-volume-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
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
        'The Data Storage Converter converts between bits, bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes. It settles file-size and storage questions in either binary or storage-company terms.',
      howItWorks:
        'Units normalize to bytes using binary factors, where each step multiplies by 1,024. This matches how operating systems and file systems count data.',
      example:
        'Convert 16 GB to MB: 16 x 1,024 = 16,384 MB. Convert a 5 TB drive to GB: 5,120 GB.',
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
        { slug: 'volume-converter', step: 'Convert related physical volume units.' },
        { slug: 'length-converter', step: 'Switch the same quantity across another unit family.' },
      ],
      faqs: [
        { q: 'How many MB are in a GB?', a: 'In binary terms, 1 GB equals 1,024 MB. Storage vendors sometimes use 1,000, which is why drives show slightly less space than advertised.' },
        { q: 'What is the difference between a bit and a byte?', a: 'A byte is 8 bits. Internet speeds are often quoted in bits per second, while file sizes are in bytes, creating apparent mismatches.' },
        { q: 'Why does my drive show less space than labeled?', a: 'Manufacturers use decimal units (1 GB = 1 billion bytes) while operating systems report binary units (1 GB = 1.074 billion bytes).' },
      ],
      related: ['volume-converter', 'length-converter', 'weight-converter'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.65,
    },
  },
];