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
      updatedAt: '2026-08-21',
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
      updatedAt: '2026-08-21',
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
      updatedAt: '2026-08-21',
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
      updatedAt: '2026-08-21',
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
      updatedAt: '2026-08-21',
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
      updatedAt: '2026-08-21',
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
      updatedAt: '2026-08-21',
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
      intro: 'The Stone to Pounds Converter translates stone into pounds, which is how people in the UK and Ireland commonly express body weight. When a British doctor says you weigh 12 stone, converting to pounds gives you a number Americans understand immediately.',
      howItWorks: 'One stone equals exactly 14 pounds. Multiply the number of stone by 14 to get pounds.',
      example: 'A person who weighs 10 stone is 140 pounds. A 12-stone person weighs 168 pounds.',
      formulas: [{ label: 'Conversion Factor', expression: 'lbs = stone x 14', note: '1 stone = 14 pounds exactly.' }],
      resultExplanations: [{ resultLabel: 'Weight in Pounds', explanation: 'Your weight expressed in pounds using the exact stone-to-pound ratio.' }],
      workflowLinks: [
        { slug: 'pounds-to-stone-calculator', step: 'Convert back the other direction.' },
        { slug: 'bmi-calculator', step: 'Calculate BMI after converting your weight.' }
      ],
      faqs: [
        { q: 'How many pounds in 1 stone?', a: 'Exactly 14 pounds in 1 stone, which is about 6.35 kilograms.' },
        { q: 'What is 10 stone in pounds?', a: '10 stone equals 140 pounds, or about 63.5 kg.' },
        { q: 'Why do the British use stone?', a: 'Stone has been used for body weight in the UK since medieval times. Most other countries use kilograms now.' }
      ],
      related: ['pounds-to-stone-calculator', 'weight-converter', 'bmi-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-08-22' },
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
      intro: 'The Pounds to Stone Converter translates pounds into stone, the body weight unit still used daily in the UK and Ireland. When reading British health advice or comparing weight with friends across the pond, this conversion gives you a sense of how weight is discussed there.',
      howItWorks: 'Divide the number of pounds by 14 to get stone. Since one stone equals 14 pounds exactly, the conversion is precise.',
      example: 'A 154-pound person weighs 11 stone. A 200-pound person weighs 14 stone 4 pounds.',
      formulas: [{ label: 'Conversion Factor', expression: 'stone = pounds / 14', note: '1 stone = 14 pounds.' }],
      resultExplanations: [{ resultLabel: 'Weight in Stone', explanation: 'Your weight expressed in stone using the exact conversion ratio.' }],
      workflowLinks: [
        { slug: 'stone-to-pounds-calculator', step: 'Convert back the other direction.' },
        { slug: 'bmi-calculator', step: 'Calculate BMI after converting your weight.' }
      ],
      faqs: [
        { q: 'How do I express stone and pounds separately?', a: 'Divide by 14. The whole number is stone, multiply the remainder by 14 for remaining pounds.' },
        { q: 'Is stone used anywhere else?', a: 'Stone is primarily used for body weight in the UK and Ireland only.' },
        { q: 'What is the metric equivalent?', a: 'Most countries use kilograms instead. 1 stone is about 6.35 kg.' }
      ],
      related: ['stone-to-pounds-calculator', 'weight-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-08-22' },
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
      intro: 'The Gigabytes to Terabytes Converter scales up from gigabytes to terabytes, which is how external hard drives, NAS systems, and enterprise storage are measured. When shopping for a 2 TB drive or checking your cloud backup quota, converting between these units helps you compare options.',
      howItWorks: 'One terabyte equals 1,024 gigabytes in binary terms. Divide GB by 1,024 to get TB.',
      example: 'A 1 TB hard drive is 1,024 GB. A 500 GB SSD is 0.49 TB. A 4 TB backup drive is 4,096 GB.',
      formulas: [{ label: 'Binary Conversion', expression: 'TB = GB / 1024', note: '1 TB = 1,024 GB in binary.' }],
      resultExplanations: [{ resultLabel: 'Size in Terabytes', explanation: 'Your storage expressed in terabytes using the binary conversion.' }],
      workflowLinks: [
        { slug: 'mb-to-gb-calculator', step: 'Convert down to gigabytes.' },
        { slug: 'data-storage-converter', step: 'Convert between all storage units.' }
      ],
      faqs: [
        { q: 'How many GB in 1 TB?', a: '1 TB = 1,024 GB in binary. Manufacturers sometimes use 1,000 GB = 1 TB.' },
        { q: 'How many photos fit in 1 TB?', a: 'At 5 MB per photo, about 200,000 photos. At 20 MB per photo (high resolution), about 50,000.' },
        { q: 'Is 1 TB enough for most people?', a: 'For photos and documents, yes. For large video files or gaming libraries, 2-4 TB is more comfortable.' }
      ],
      related: ['mb-to-gb-calculator', 'data-storage-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-08-22' },
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
      intro: 'The Hours to Minutes Converter translates hours into minutes, which is useful for tracking work sessions, billing clients, or understanding how long a movie or commute takes. Breaking hours into minutes makes short durations easier to plan around.',
      howItWorks: 'One hour equals exactly 60 minutes. Multiply the number of hours by 60 to get minutes.',
      example: 'A 2.5-hour meeting is 150 minutes. A 45-minute commute is 0.75 hours. An 8-hour workday is 480 minutes.',
      formulas: [{ label: 'Time Conversion', expression: 'minutes = hours x 60', note: '1 hour = 60 minutes exactly.' }],
      resultExplanations: [{ resultLabel: 'Time in Minutes', explanation: 'Your time expressed in minutes using the exact hour-to-minute ratio.' }],
      workflowLinks: [
        { slug: 'days-to-hours-calculator', step: 'Convert days to hours for longer periods.' },
        { slug: 'weeks-to-days-calculator', step: 'Convert weeks to days.' }
      ],
      faqs: [
        { q: 'How many minutes in 1 hour?', a: 'Exactly 60 minutes, which is also the length of a typical TV episode.' },
        { q: 'How many minutes in 8 hours?', a: '8 hours equals 480 minutes, a standard workday.' },
        { q: 'How do I convert minutes to hours?', a: 'Divide minutes by 60. A 90-minute movie is 1.5 hours.' }
      ],
      related: ['days-to-hours-calculator', 'weeks-to-days-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-08-22' },
  },
  {
    id: 'days-hours',
    slug: 'days-to-hours-calculator',
    name: 'Days to Hours Converter',
    shortDesc: 'Convert days to hours for project deadlines and travel planning.',
    tagline: 'Days into workable hours.',
    category: 'conversion',
    iconName: 'Clock',
    keywords: ['days to hours', 'day to hours', 'time conversion', 'hours in a day'],
    kind: 'converter',
    unitGroup: 'time-conv',
    content: {
      intro: 'The Days to Hours Converter translates days into hours, which helps with project planning, medication schedules, and understanding time windows. When a deadline is 3 days away, knowing the exact hour count makes scheduling precise.',
      howItWorks: 'One day equals exactly 24 hours. Multiply the number of days by 24 to get hours.',
      example: 'A 3-day deadline is 72 hours. A weekend trip of 2 days is 48 hours. A 14-day quarantine is 336 hours.',
      formulas: [{ label: 'Time Conversion', expression: 'hours = days x 24', note: '1 day = 24 hours exactly.' }],
      resultExplanations: [{ resultLabel: 'Time in Hours', explanation: 'Your time expressed in hours using the exact day-to-hour ratio.' }],
      workflowLinks: [
        { slug: 'weeks-to-days-calculator', step: 'Convert weeks to days.' },
        { slug: 'hours-to-minutes-calculator', step: 'Break hours into minutes.' }
      ],
      faqs: [
        { q: 'How many hours in 1 day?', a: 'Exactly 24 hours, which includes 8 hours of sleep for most people.' },
        { q: 'How many hours in a work week?', a: 'A standard 5-day work week is 120 hours total, though working hours are typically 40.' },
        { q: 'Is a day always 24 hours?', a: 'A solar day averages 24 hours but varies slightly. For conversion, 24 hours is the standard.' }
      ],
      related: ['weeks-to-days-calculator', 'hours-to-minutes-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-08-22' },
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
      intro: 'The Weeks to Days Converter translates weeks into days, which is useful for project timelines, fitness challenges, and countdown timers. When someone says a project takes 3 weeks, converting to days gives you a concrete number to plan around.',
      howItWorks: 'One week equals exactly 7 days. Multiply the number of weeks by 7 to get days.',
      example: 'A 2-week vacation is 14 days. A 6-week fitness program is 42 days. A 1-week notice period is 7 days.',
      formulas: [{ label: 'Time Conversion', expression: 'days = weeks x 7', note: '1 week = 7 days exactly.' }],
      resultExplanations: [{ resultLabel: 'Time in Days', explanation: 'Your time expressed in days using the exact week-to-day ratio.' }],
      workflowLinks: [
        { slug: 'months-to-days-calculator', step: 'Convert months to days.' },
        { slug: 'days-to-hours-calculator', step: 'Break days into hours.' }
      ],
      faqs: [
        { q: 'How many days in 1 week?', a: 'Exactly 7 days, which breaks down into 5 weekdays and 2 weekend days.' },
        { q: 'How many days in 4 weeks?', a: '4 weeks equals exactly 28 days, which is also the length of February.' },
        { q: 'Is 4 weeks the same as a month?', a: 'Not exactly. Most months have 30 or 31 days, while 4 weeks is 28 days.' }
      ],
      related: ['months-to-days-calculator', 'days-to-hours-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-08-22' },
  },
  {
    id: 'months-days',
    slug: 'months-to-days-calculator',
    name: 'Months to Days Converter',
    shortDesc: 'Convert months to days for pregnancy, subscriptions, and deadlines.',
    tagline: 'Calendar months into exact days.',
    category: 'conversion',
    iconName: 'CalendarClock',
    keywords: ['months to days', 'how many days in a month', 'days in month'],
    kind: 'converter',
    unitGroup: 'time-conv',
    content: {
      intro: 'The Months to Days Converter translates months into days, which matters for pregnancy tracking, subscription billing, and lease terms. Since months vary between 28 and 31 days, this calculator uses 30.44 days per month as the average.',
      howItWorks: 'Uses 30.44 days per month, the average over a year (365.25 / 12). For exact dates, count the specific months involved.',
      example: 'A 9-month pregnancy is about 274 days. A 6-month lease is roughly 183 days.',
      formulas: [{ label: 'Average Month', expression: 'days = months x 30.44', note: 'Average of 30.44 days per month.' }],
      resultExplanations: [{ resultLabel: 'Time in Days', explanation: 'Your time expressed in days using the average month length.' }],
      workflowLinks: [
        { slug: 'weeks-to-days-calculator', step: 'Convert weeks to days.' },
        { slug: 'years-to-days-calculator', step: 'Convert years to days.' }
      ],
      faqs: [
        { q: 'How many days in a month?', a: 'Months vary from 28 to 31 days. The average is about 30.44 days.' },
        { q: 'How many days in 6 months?', a: 'About 183 days using the average. Actual count depends on which months.' },
        { q: 'How many months is 100 days?', a: 'About 3.28 months, or roughly 3 months and 9 days.' }
      ],
      related: ['weeks-to-days-calculator', 'years-to-days-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-08-22' },
  },
  {
    id: 'years-days',
    slug: 'years-to-days-calculator',
    name: 'Years to Days Converter',
    shortDesc: 'Convert years to days for long-term planning and age calculations.',
    tagline: 'Years into countable days.',
    category: 'conversion',
    iconName: 'CalendarClock',
    keywords: ['years to days', 'how many days in a year', 'days in a year', 'leap year'],
    kind: 'converter',
    unitGroup: 'time-conv',
    content: {
      intro: 'The Years to Days Converter translates years into days, useful for counting down to milestones, calculating ages, or planning long-term goals. A year has 365 days normally, or 366 in a leap year.',
      howItWorks: 'Uses 365.25 days per year as the average, accounting for leap years every 4 years.',
      example: 'A 5-year mortgage is 1,826 days. A 10-year anniversary is 3,652 days.',
      formulas: [{ label: 'Average Year', expression: 'days = years x 365.25', note: 'Average of 365.25 days accounting for leap years.' }],
      resultExplanations: [{ resultLabel: 'Time in Days', explanation: 'Your time expressed in days using the average year length.' }],
      workflowLinks: [
        { slug: 'months-to-days-calculator', step: 'Convert months to days.' },
        { slug: 'weeks-to-days-calculator', step: 'Convert weeks to days.' }
      ],
      faqs: [
        { q: 'How many days in 1 year?', a: '365 days in a standard year, 366 in a leap year. Average is 365.25.' },
        { q: 'How many days in 10 years?', a: 'About 3,652 days, including 2 or 3 leap years.' },
        { q: 'What years are leap years?', a: 'Years divisible by 4, except century years not divisible by 400. 2024 and 2028 are leap years.' }
      ],
      related: ['months-to-days-calculator', 'weeks-to-days-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-08-22' },
  },
  {
    id: 'mph-kph',
    slug: 'mph-to-kph-calculator',
    name: 'MPH to KPH Converter',
    shortDesc: 'Convert miles per hour to kilometers per hour for driving and travel.',
    tagline: 'Speed limits that cross borders.',
    category: 'conversion',
    iconName: 'Gauge',
    keywords: ['mph to kph', 'mph to kmh', 'miles per hour to km', 'speed conversion'],
    kind: 'converter',
    unitGroup: 'speed',
    content: {
      intro: 'The MPH to KPH Converter translates miles per hour into kilometers per hour, essential when driving abroad. European speed limits, GPS readings, and car speedometers outside the US all use km/h.',
      howItWorks: 'One mph equals approximately 1.60934 km/h. Multiply mph by this factor.',
      example: '60 mph is 96.6 km/h. 30 mph school zone is 48.3 km/h. 100 mph is 160.9 km/h.',
      formulas: [{ label: 'Speed Conversion', expression: 'km/h = mph x 1.60934', note: '1 mph = 1.60934 km/h.' }],
      resultExplanations: [{ resultLabel: 'Speed in km/h', explanation: 'Your speed expressed in km/h using the exact conversion factor.' }],
      workflowLinks: [
        { slug: 'speed-converter', step: 'Convert between other speed units.' },
        { slug: 'fuel-cost-calculator', step: 'Calculate fuel cost per distance.' }
      ],
      faqs: [
        { q: 'How fast is 60 mph in km/h?', a: '60 mph equals about 96.6 km/h.' },
        { q: 'What is 100 km/h in mph?', a: '100 km/h equals about 62.1 mph.' },
        { q: 'Which countries use mph?', a: 'The US, UK, and a few others use mph. Most of the world uses km/h.' }
      ],
      related: ['speed-converter', 'fuel-cost-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-08-22' },
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
      intro: 'The PSI to Bar Converter translates pounds per square inch into bar, the pressure unit for tire specifications, air compressors, and hydraulics worldwide. European car manuals list tire pressure in bar while American gauges show PSI.',
      howItWorks: 'One bar equals approximately 14.5038 PSI. Divide PSI by 14.5038 to get bar.',
      example: 'Car tire at 32 PSI is 2.21 bar. Bicycle tire at 100 PSI is 6.89 bar. Truck tire at 110 PSI is 7.58 bar.',
      formulas: [{ label: 'Pressure Conversion', expression: 'bar = PSI / 14.5038', note: '1 bar = 14.5038 PSI.' }],
      resultExplanations: [{ resultLabel: 'Pressure in Bar', explanation: 'Your pressure expressed in bar using the exact conversion factor.' }],
      workflowLinks: [
        { slug: 'fuel-cost-calculator', step: 'Calculate fuel cost per distance.' },
        { slug: 'speed-converter', step: 'Convert between other speed units.' }
      ],
      faqs: [
        { q: 'What is 32 PSI in bar?', a: '32 PSI equals about 2.21 bar, a standard passenger car tire pressure.' },
        { q: 'How many PSI in 1 bar?', a: 'One bar equals 14.5038 PSI, roughly the pressure of a standard car tire.' },
        { q: 'Is bar the same as atm?', a: 'Close. 1 bar = 0.987 atm. Standard atmospheric pressure is 1.01325 bar.' }
      ],
      related: ['fuel-cost-calculator', 'speed-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-08-22' },
  }
];
