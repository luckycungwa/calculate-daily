import { CalculatorMeta } from '../../types';

export const FOOD_AND_AUTO_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'ingredient-weight',
    slug: 'ingredient-weight-converter',
    name: 'Ingredient Weight Converter',
    shortDesc: 'Convert cups and spoons into grams using measured densities for common baking ingredients.',
    tagline: 'Cups lie. A scale does not.',
    category: 'food',
    iconName: 'Scale',
    badge: 'Kitchen weight',
    featured: true,
    keywords: [
      'ingredient weight converter',
      'cups to grams by ingredient',
      'grams per cup',
      'baking weight conversion',
      'cup to gram calculator',
      'ingredient density chart',
    ],
    kind: 'custom',
    componentId: 'IngredientWeightConverter',
    content: {
      intro:
        'The Ingredient Weight Converter turns cups, tablespoons, teaspoons, millilitres, and fluid ounces into grams for common baking ingredients, and back again. Each ingredient has its own measured density, because a cup of flour and a cup of honey do not weigh anything like each other.',
      howItWorks:
        'Each ingredient is stored as grams per US cup. Volume is converted into cups first, then multiplied by that density. Working the other way, grams are divided by the density to get cups, then converted into spoons, millilitres, or fluid ounces. The result is a weight for a lightly spooned and levelled cup, which is the measuring method the reference values assume.',
      example:
        'One US cup of all-purpose flour is about 120 g, so half a cup is 60 g and one tablespoon is 7.5 g. The same cup of granulated sugar is about 200 g, and a cup of honey is about 340 g. That difference is why volume recipes drift and weight recipes repeat.',
      formulas: [
        { label: 'Volume to weight', expression: 'grams = cups × grams per cup' },
        { label: 'Weight to volume', expression: 'cups = grams ÷ grams per cup' },
        { label: 'Spoons', expression: '1 cup = 16 tablespoons = 48 teaspoons' },
        {
          label: 'US cup',
          expression: '1 US cup = 236.588 mL',
          note: 'The US customary cup, not the 250 mL metric cup used in some countries.',
        },
      ],
      sources: [
        {
          label: 'USDA FoodData Central',
          expression: 'Nutrient and weight data for foods',
          note: 'The reference database used to check ingredient weights and densities.',
        },
        {
          label: 'King Arthur Baking — Ingredient Weight Chart',
          expression: 'Grams per cup for common baking ingredients',
          note: 'A widely used professional baking reference, including the flour weights used here.',
        },
        {
          label: 'NIST Handbook 44',
          expression: 'US customary units for volume and weight',
          note: 'Defines the US cup, fluid ounce, and ounce relationships applied by the converter.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Weight',
          explanation:
            'The mass of the ingredient in grams for the volume you entered. This is the number to put on a scale, and it is the only reproducible way to measure dry ingredients.',
        },
        {
          resultLabel: 'Cups and spoons',
          explanation:
            'The equivalent volume. Use it when the recipe is written in cups and you have no scale, but expect a little more variation than the gram figure suggests.',
        },
      ],
      workflowLinks: [
        { slug: 'cups-to-grams-calculator', step: 'Use a single-ingredient conversion when you only need flour or sugar.' },
        { slug: 'recipe-scaling-calculator', step: 'Scale the weighed amounts up or down for a different number of servings.' },
        { slug: 'butter-converter', step: 'Handle butter, which is usually sold in sticks or blocks.' },
      ],
      faqs: [
        {
          q: 'Why does a cup of flour weigh less than a cup of sugar?',
          a: 'Because the two ingredients pack differently. Flour particles trap air and settle loosely, while sugar crystals are dense and fit together closely. A cup of flour is roughly 120 g, a cup of granulated sugar about 200 g, even though both fill the same volume.',
        },
        {
          q: 'How should I fill the cup?',
          a: 'Spoon the ingredient into the cup and level it with a straight edge. Scooping directly from the bag compacts the flour and can add 10–20% to the weight, which is enough to make a cake dry or a bread dough stiff.',
        },
        {
          q: 'Is this US or metric cups?',
          a: 'US customary cups, where one cup is 236.588 mL. A metric cup is 250 mL, about 5.7% larger, so a recipe written for metric cups will weigh more per cup than the figures here.',
        },
        {
          q: 'Why is brown sugar listed as packed?',
          a: 'Brown sugar is normally packed into the cup for baking, and the trapped air makes the weight depend heavily on how firmly it is pressed. The 213 g figure assumes a firmly packed cup, the standard for most recipes.',
        },
      ],
      related: ['cups-to-grams-calculator', 'butter-converter', 'recipe-scaling-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'butter',
    slug: 'butter-converter',
    name: 'Butter Converter',
    shortDesc: 'Convert butter between sticks, cups, tablespoons, teaspoons, grams, and ounces.',
    tagline: 'Sticks, blocks, and spoons, reconciled.',
    category: 'food',
    iconName: 'CookingPot',
    badge: 'Cooking',
    featured: false,
    keywords: [
      'butter converter',
      'sticks of butter to cups',
      'butter grams to cups',
      'how much is a stick of butter',
      'butter tablespoon grams',
      'butter measurement conversion',
    ],
    kind: 'custom',
    componentId: 'ButterConverter',
    content: {
      intro:
        'The Butter Converter translates a quantity of butter between the units recipes actually use: US sticks, cups, tablespoons, teaspoons, grams, and ounces. It is built for the moment a European recipe says 250 g and the wrapper in your fridge is marked in sticks.',
      howItWorks:
        'One US stick of butter is half a cup, eight tablespoons, or 113.4 g. Every other unit is derived from that anchor: a cup is two sticks, a tablespoon is one eighth of a stick, and an ounce is 28.35 g. Enter any amount and unit and the converter fills in the rest.',
      example:
        'A recipe calling for two sticks of butter needs 226.8 g, which is one cup or 16 tablespoons. If you only have a 250 g block, that is about 2.2 sticks, or 17.6 tablespoons, so cut slightly more than the recipe asks for.',
      formulas: [
        { label: 'Stick anchor', expression: '1 stick = ½ cup = 8 tbsp = 113.4 g' },
        { label: 'Cups', expression: 'cups = grams ÷ 226.8' },
        { label: 'Tablespoons', expression: 'tbsp = grams ÷ 14.175' },
        { label: 'Ounces', expression: 'oz = grams ÷ 28.3495' },
      ],
      sources: [
        {
          label: 'USDA FoodData Central — Butter, salted',
          expression: 'Composition and weight of butter',
          note: 'Confirms that a US stick is 113.4 g and that butter is about 80% fat.',
        },
        {
          label: 'USDA — Grading and Standards for Butter',
          expression: 'US butter packaging conventions',
          note: 'Explains the quarter-pound stick format that US recipes assume.',
        },
        {
          label: 'NIST Handbook 44',
          expression: 'Ounce and pound relationships',
          note: 'Defines the avoirdupois ounce used for the ounce conversion.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Grams',
          explanation:
            'The most portable unit. A kitchen scale reads it directly, and it is unaffected by how the butter is cut or softened.',
        },
        {
          resultLabel: 'Sticks',
          explanation:
            'The US packaging unit. Each stick is half a cup, and the wrapper usually has tablespoon markings, so you can cut without a measuring cup.',
        },
      ],
      workflowLinks: [
        { slug: 'ingredient-weight-converter', step: 'Convert the other ingredients in the same recipe.' },
        { slug: 'cups-to-grams-calculator', step: 'Check a generic cups-to-grams conversion.' },
        { slug: 'recipe-scaling-calculator', step: 'Rescale the whole recipe for a different batch size.' },
      ],
      faqs: [
        {
          q: 'How much is one stick of butter in grams?',
          a: 'One US stick is 113.4 g, or four ounces. It is half a cup, eight tablespoons, or 24 teaspoons. Outside the US, butter is usually sold in 250 g blocks, which is about 2.2 sticks.',
        },
        {
          q: 'Does salted butter weigh the same as unsalted?',
          a: 'Almost. The salt content is only about 1.5–2% of the weight, so the difference is a couple of grams per stick. For baking, the type matters more for flavour and rise than for the weight conversion.',
        },
        {
          q: 'Can I use oil instead of butter?',
          a: 'Sometimes, but not by equal weight. Butter is about 80% fat and 15–18% water, while oil is 100% fat, so replacing butter with oil usually means using about 80% of the weight. The result will also be denser and less flavoursome.',
        },
        {
          q: 'Why do recipes measure butter in tablespoons?',
          a: 'Because US sticks are printed with tablespoon marks, so slicing along the wrapper is faster than weighing. It is convenient but less accurate than a scale, especially for small amounts.',
        },
      ],
      related: ['ingredient-weight-converter', 'cups-to-grams-calculator', 'recipe-scaling-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'flour',
    slug: 'flour-converter',
    name: 'Flour Converter',
    shortDesc: 'Convert flour between cups and grams, with a different density for each type of flour.',
    tagline: 'Bread flour is not cake flour.',
    category: 'food',
    iconName: 'ChefHat',
    badge: 'Baking',
    featured: true,
    keywords: [
      'flour converter',
      'cups of flour to grams',
      'grams to cups flour',
      'bread flour grams per cup',
      'cake flour conversion',
      'flour weight chart',
    ],
    kind: 'custom',
    componentId: 'FlourConverter',
    content: {
      intro:
        'The Flour Converter converts between cups and grams for all-purpose, bread, cake, whole-wheat, and self-raising flour. Each type has its own weight per cup, because milling, protein content, and particle size all change how much flour fits in the same volume.',
      howItWorks:
        'The converter looks up the grams-per-cup figure for the flour you choose, then multiplies or divides by it. Cups to grams is a multiplication; grams to cups is a division. Tablespoons and ounces follow from the same weight, using 16 tablespoons per cup and 28.35 g per ounce.',
      example:
        'One cup of all-purpose flour is about 120 g, so 500 g is about 4.17 cups. The same 500 g of bread flour at 127 g per cup is about 3.94 cups. Using the wrong flour’s density overshoots or undershoots the flour by roughly 6%.',
      formulas: [
        { label: 'Cups to grams', expression: 'grams = cups × grams per cup' },
        { label: 'Grams to cups', expression: 'cups = grams ÷ grams per cup' },
        { label: 'Tablespoons', expression: 'tbsp = cups × 16' },
        { label: 'Ounces', expression: 'oz = grams ÷ 28.3495' },
      ],
      sources: [
        {
          label: 'King Arthur Baking — Ingredient Weight Chart',
          expression: 'Grams per cup for all-purpose, bread, cake, and whole-wheat flour',
          note: 'The source of the flour-specific weights used by the converter.',
        },
        {
          label: 'USDA FoodData Central — Wheat flour',
          expression: 'Composition of common flour types',
          note: 'Explains the protein and moisture differences behind the weight variation.',
        },
        {
          label: 'NIST Handbook 44',
          expression: 'US cup and ounce definitions',
          note: 'Fixes the volume and weight units used in the conversion.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Grams',
          explanation:
            'The weight to aim for on a scale. It is the reliable figure; the cup equivalent depends on how the flour was settled into the measure.',
        },
        {
          resultLabel: 'Cups',
          explanation:
            'The volume equivalent for the selected flour. If you must use cups, spoon the flour in and level it rather than scooping, or you will use more than the recipe intends.',
        },
      ],
      workflowLinks: [
        { slug: 'ingredient-weight-converter', step: 'Convert the rest of the ingredients in the recipe.' },
        { slug: 'pizza-dough-calculator', step: 'Put the flour weight to work in a dough formula.' },
        { slug: 'cups-to-grams-calculator', step: 'Use a general-purpose conversion for a quick check.' },
      ],
      faqs: [
        {
          q: 'Why do different sources give different grams per cup for flour?',
          a: 'Because the weight depends on how the flour is put into the cup. A lightly spooned cup of all-purpose flour is about 120 g, while a scooped cup can reach 140 g or more. Professional bakers weigh for exactly this reason.',
        },
        {
          q: 'Can I substitute bread flour for all-purpose?',
          a: 'Yes, but the result changes. Bread flour has more protein, absorbs more water, and produces a chewier crumb. If you swap by volume rather than weight, you may also add more flour than intended, because bread flour is denser per cup.',
        },
        {
          q: 'What is self-raising flour?',
          a: 'All-purpose flour with baking powder and salt already added, common in the UK and Australia. If a US recipe calls for it, you can make your own by adding about 1½ teaspoons of baking powder and ¼ teaspoon of salt per cup of all-purpose flour.',
        },
        {
          q: 'Should I sift flour before measuring?',
          a: 'Sifting aerates the flour and lowers its weight per cup, which is why older recipes that assume sifted flour can come out dry if you use unsifted. Weighing avoids the question entirely.',
        },
      ],
      related: ['ingredient-weight-converter', 'cups-to-grams-calculator', 'pizza-dough-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'oven-temperature',
    slug: 'oven-temperature-converter',
    name: 'Oven Temperature Converter',
    shortDesc: 'Convert oven settings between Celsius, Fahrenheit, gas mark, and fan-assisted equivalents.',
    tagline: 'Gas mark 4, without the guesswork.',
    category: 'food',
    iconName: 'Thermometer',
    badge: 'Cooking',
    featured: false,
    keywords: [
      'oven temperature converter',
      'gas mark to celsius',
      'fan oven conversion',
      '350 f to c oven',
      'gas mark 4 in celsius',
      'conventional to fan oven',
    ],
    kind: 'custom',
    componentId: 'OvenTemperatureConverter',
    content: {
      intro:
        'The Oven Temperature Converter translates a baking temperature between Celsius, Fahrenheit, UK gas marks, and the lower setting a fan-assisted oven usually needs. It shows the conventional figure first, then the fan equivalent, because a recipe written for a conventional oven will overbake in a fan oven set to the same number.',
      howItWorks:
        'Celsius and Fahrenheit are converted with the standard temperature formula. Gas marks use the conventional chart printed in British recipe books, where each mark corresponds to a rounded Celsius and Fahrenheit pair rather than a strict mathematical conversion. The result panel shows the exact Fahrenheit value, so it can differ by a few degrees from the rounded chart. The fan setting is estimated as 20 °C below the conventional temperature, the usual manufacturer guidance.',
      example:
        'Gas mark 4 is conventionally 180 °C or 350 °F, and about 160 °C in a fan oven. The exact conversion of 180 °C is 356 °F, which is why the result panel can differ by a few degrees from the rounded chart. A recipe that says “180 °C fan” therefore wants a conventional oven at 200 °C, which is gas mark 6.',
      formulas: [
        { label: 'Fahrenheit from Celsius', expression: '°F = °C × 9/5 + 32' },
        { label: 'Celsius from Fahrenheit', expression: '°C = (°F − 32) × 5/9' },
        { label: 'Fan-assisted', expression: 'fan °C ≈ conventional °C − 20' },
        {
          label: 'Gas marks',
          expression: 'Gas 1 = 140 °C, gas 4 = 180 °C, gas 9 = 240 °C',
          note: 'The chart is conventional, not a continuous formula; use the nearest mark for values between.',
        },
      ],
      sources: [
        {
          label: 'NIST Special Publication 811 — Guide for the Use of the SI',
          expression: 'Celsius and Fahrenheit conversion',
          note: 'The authoritative temperature conversion used here.',
        },
        {
          label: 'King Arthur Baking — Oven Temperature Conversion',
          expression: 'Conventional and convection oven equivalents',
          note: 'Explains why convection ovens are set lower and by how much.',
        },
        {
          label: 'Food Standards Agency — Cooking safely',
          expression: 'Oven and food safety guidance',
          note: 'Reminds cooks that oven thermostats drift and a separate thermometer is more reliable than the dial.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Celsius',
          explanation:
            'The conventional oven temperature. Most European and Australian recipes are written in Celsius, and fan ovens usually need 20 °C less.',
        },
        {
          resultLabel: 'Gas mark',
          explanation:
            'The nearest UK gas setting. Gas marks are coarse steps, so a recipe at 175 °C is usually cooked at gas mark 4 (180 °C) or 3 (170 °C) depending on the baker.',
        },
      ],
      workflowLinks: [
        { slug: 'temperature-converter', step: 'Convert a temperature that is not an oven setting.' },
        { slug: 'pizza-dough-calculator', step: 'Work out the dough before you preheat.' },
        { slug: 'ingredient-weight-converter', step: 'Weigh the ingredients while the oven heats.' },
      ],
      faqs: [
        {
          q: 'Is a fan oven hotter than a conventional oven?',
          a: 'Yes, effectively. A fan moves hot air around the cavity, so heat transfers faster and the food cooks sooner at the same dial setting. Manufacturers usually advise setting a fan oven about 20 °C lower than a conventional one.',
        },
        {
          q: 'Why is gas mark 4 not exactly 180 °C?',
          a: 'Gas marks are a coarse scale inherited from early gas ovens, and each mark maps to a rounded pair of Celsius and Fahrenheit values. Gas mark 4 is defined as about 180 °C / 350 °F, but real ovens vary by 10–20 °C either way.',
        },
        {
          q: 'Should I trust the oven dial?',
          a: 'Not for anything delicate. Domestic oven thermostats commonly drift, and the displayed temperature is not the same as the average cavity temperature. An inexpensive oven thermometer will tell you what the oven is actually doing.',
        },
        {
          q: 'What about air fryers and convection microwaves?',
          a: 'They are fan ovens with a smaller cavity, so they run hotter and faster still. Start about 20 °C below the fan setting and check early; the conversion here is for a full-size fan oven.',
        },
      ],
      related: ['temperature-converter', 'pizza-dough-calculator', 'ingredient-weight-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'pizza-dough',
    slug: 'pizza-dough-calculator',
    name: 'Pizza Dough Calculator',
    shortDesc: 'Work out flour, water, salt, and yeast for any number of dough balls at a chosen hydration.',
    tagline: 'Baker percentages, without the notebook.',
    category: 'food',
    iconName: 'Pizza',
    badge: 'Baking',
    featured: true,
    keywords: [
      'pizza dough calculator',
      'pizza dough hydration calculator',
      'baker percentage calculator',
      'dough ball calculator',
      'pizza dough recipe calculator',
      'pizza hydration chart',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'balls', label: 'Number of dough balls', type: 'number', defaultValue: 4, min: 1, max: 100, step: 1 },
        { id: 'ballWeight', label: 'Weight per dough ball', type: 'number', defaultValue: 250, min: 50, max: 2000, step: 10, suffix: 'g' },
        { id: 'hydration', label: 'Hydration', type: 'number', defaultValue: 62, min: 40, max: 100, step: 1, suffix: '% of flour' },
        { id: 'saltPercent', label: 'Salt', type: 'number', defaultValue: 2.5, min: 0, max: 10, step: 0.1, suffix: '% of flour' },
        { id: 'yeastPercent', label: 'Instant yeast', type: 'number', defaultValue: 0.5, min: 0, max: 10, step: 0.05, suffix: '% of flour' },
      ],
      results: [
        { label: 'Total dough', formulaCode: 'balls * ballWeight', suffix: 'g', accent: true },
        {
          label: 'Flour',
          formulaCode: '(balls * ballWeight) / (1 + hydration / 100 + saltPercent / 100 + yeastPercent / 100)',
          suffix: 'g',
        },
        {
          label: 'Water',
          formulaCode:
            '((balls * ballWeight) / (1 + hydration / 100 + saltPercent / 100 + yeastPercent / 100)) * hydration / 100',
          suffix: 'g',
        },
        {
          label: 'Salt',
          formulaCode:
            '((balls * ballWeight) / (1 + hydration / 100 + saltPercent / 100 + yeastPercent / 100)) * saltPercent / 100',
          suffix: 'g',
        },
        {
          label: 'Instant yeast',
          formulaCode:
            '((balls * ballWeight) / (1 + hydration / 100 + saltPercent / 100 + yeastPercent / 100)) * yeastPercent / 100',
          suffix: 'g',
        },
        {
          label: 'Flour per ball',
          formulaCode:
            '((balls * ballWeight) / (1 + hydration / 100 + saltPercent / 100 + yeastPercent / 100)) / balls',
          suffix: 'g',
        },
      ],
      formulaDescription: 'Flour = total dough ÷ (1 + hydration% + salt% + yeast%), with all percentages measured against flour weight',
      tips: [
        'Baker percentages are always relative to flour weight, not total dough. That is why the flour is smaller than the water-plus-flour total.',
        'Hydration is the biggest lever on texture: 55–60% gives a stiff, easy dough; 62–67% gives a crisp-bottomed Neapolitan-style dough; above 70% needs experience and a strong flour.',
        'Salt is usually 2–3% of flour and yeast 0.3–1% for a same-day dough. Cold-fermenting for 24–72 hours lets you use less yeast and builds more flavour.',
      ],
    },
    content: {
      intro:
        'The Pizza Dough Calculator turns a target number of dough balls and a preferred hydration into exact flour, water, salt, and yeast weights. It uses baker percentages, the notation professional bakers use, where every ingredient is expressed as a percentage of the flour weight.',
      howItWorks:
        'You choose the total dough weight by multiplying the number of balls by the weight of each ball. Because the flour is 100% and everything else is a percentage of it, the total is flour multiplied by one plus the hydration, salt, and yeast percentages. Dividing the total by that sum gives the flour weight, and each other ingredient follows from its percentage.',
      example:
        'Four balls at 250 g make 1,000 g of dough. At 62% hydration, 2.5% salt, and 0.5% yeast, the sum is 1 + 0.62 + 0.025 + 0.005 = 1.65, so the flour is 606 g. That gives 376 g of water, 15 g of salt, and 3 g of yeast, and the numbers add back to 1,000 g.',
      formulas: [
        { label: 'Total dough', expression: 'total = balls × ball weight' },
        {
          label: 'Flour',
          expression: 'flour = total ÷ (1 + hydration% + salt% + yeast%)',
        },
        { label: 'Water', expression: 'water = flour × hydration%' },
        { label: 'Salt and yeast', expression: 'salt = flour × salt%; yeast = flour × yeast%' },
      ],
      sources: [
        {
          label: 'Associazione Verace Pizza Napoletana — Disciplinare',
          expression: 'Traditional Neapolitan dough proportions',
          note: 'Specifies flour, water, salt, and yeast ranges for the protected Neapolitan style.',
        },
        {
          label: 'King Arthur Baking — Pizza Dough',
          expression: 'Hydration and kneading guidance for home ovens',
          note: 'A practical reference for the 60–70% hydration range used in home baking.',
        },
        {
          label: 'USDA FoodData Central — Wheat flour',
          expression: 'Flour composition and water absorption context',
          note: 'Explains why higher-protein flours tolerate more water.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Flour',
          explanation:
            'The anchor weight. Every other ingredient is a percentage of this number, so if you change the flour, everything else moves with it.',
        },
        {
          resultLabel: 'Water',
          explanation:
            'The hydration weight. Higher hydration makes a wetter, harder-to-handle dough that bakes with a more open crumb and a crisper base.',
        },
      ],
      workflowLinks: [
        { slug: 'flour-converter', step: 'Convert the flour weight if your recipe is written in cups.' },
        { slug: 'oven-temperature-converter', step: 'Set the oven and fan equivalent before baking.' },
        { slug: 'recipe-scaling-calculator', step: 'Scale a different dough recipe to the same ball count.' },
      ],
      faqs: [
        {
          q: 'What hydration should I use?',
          a: 'For a home oven, 60–65% is a good starting point: manageable to shape and still crisp. Neapolitan-style doughs run 62–67%, and high-hydration sourdough-style pizzas go above 70%, but they need a strong flour and practice.',
        },
        {
          q: 'Why is the flour weight less than the total dough?',
          a: 'Because water, salt, and yeast add weight. The flour is only part of the dough, so it is always smaller than the total. In the example, 606 g of flour becomes 1,000 g of dough once the other ingredients are added.',
        },
        {
          q: 'How much yeast should I use?',
          a: 'About 0.5% instant yeast for a same-day dough at room temperature, or 0.2–0.3% for a 24–48 hour cold ferment. More yeast speeds the rise but costs flavour; less yeast needs more time and a warmer spot.',
        },
        {
          q: 'Can I use the calculator for sourdough?',
          a: 'Yes, but treat the starter as part flour and part water. A starter at 100% hydration is half flour and half water, so subtract its flour from the total flour and its water from the total water to keep the final hydration accurate.',
        },
      ],
      related: ['flour-converter', 'oven-temperature-converter', 'recipe-scaling-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.95 },
  },
  {
    id: 'tire-size',
    slug: 'tire-size-calculator',
    name: 'Tire Size Calculator',
    shortDesc: 'Compare two tire sizes by diameter, circumference, and the resulting speedometer error.',
    tagline: 'Know the difference before you buy.',
    category: 'misc',
    iconName: 'Disc',
    badge: 'Automotive',
    featured: true,
    keywords: [
      'tire size calculator',
      'tire size comparison',
      'tire diameter calculator',
      'speedometer error calculator',
      'plus size tire calculator',
      'tyre size calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'oldWidth', label: 'Original tire width', type: 'number', defaultValue: 205, min: 100, max: 400, step: 5, suffix: 'mm' },
        { id: 'oldAspect', label: 'Original aspect ratio', type: 'number', defaultValue: 55, min: 20, max: 100, step: 5, suffix: '%' },
        { id: 'oldRim', label: 'Original rim diameter', type: 'number', defaultValue: 16, min: 10, max: 30, step: 1, suffix: 'in' },
        { id: 'newWidth', label: 'New tire width', type: 'number', defaultValue: 215, min: 100, max: 400, step: 5, suffix: 'mm' },
        { id: 'newAspect', label: 'New aspect ratio', type: 'number', defaultValue: 60, min: 20, max: 100, step: 5, suffix: '%' },
        { id: 'newRim', label: 'New rim diameter', type: 'number', defaultValue: 17, min: 10, max: 30, step: 1, suffix: 'in' },
      ],
      results: [
        {
          label: 'Original overall diameter',
          formulaCode: 'oldRim * 25.4 + 2 * (oldWidth * oldAspect / 100)',
          suffix: 'mm',
          accent: true,
        },
        {
          label: 'New overall diameter',
          formulaCode: 'newRim * 25.4 + 2 * (newWidth * newAspect / 100)',
          suffix: 'mm',
        },
        {
          label: 'Diameter change',
          formulaCode: '(newRim * 25.4 + 2 * (newWidth * newAspect / 100)) - (oldRim * 25.4 + 2 * (oldWidth * oldAspect / 100))',
          suffix: 'mm',
        },
        {
          label: 'Speedometer error at 100 km/h',
          formulaCode:
            '(((newRim * 25.4 + 2 * (newWidth * newAspect / 100)) - (oldRim * 25.4 + 2 * (oldWidth * oldAspect / 100))) / (oldRim * 25.4 + 2 * (oldWidth * oldAspect / 100))) * 100',
          suffix: '%',
        },
        {
          label: 'Actual speed when reading 100 km/h',
          formulaCode:
            '100 * (newRim * 25.4 + 2 * (newWidth * newAspect / 100)) / (oldRim * 25.4 + 2 * (oldWidth * oldAspect / 100))',
          suffix: 'km/h',
        },
        {
          label: 'New circumference',
          formulaCode: 'Math.PI * (newRim * 25.4 + 2 * (newWidth * newAspect / 100))',
          suffix: 'mm',
        },
      ],
      formulaDescription: 'Diameter = rim × 25.4 + 2 × (width × aspect ÷ 100)',
      tips: [
        'Aim to keep the new overall diameter within 3% of the original. Beyond that, gearing, clearance, and the speedometer all drift noticeably.',
        'The first number is the section width in millimetres; the second is the sidewall height as a percentage of that width, not a measurement in millimetres.',
        'A larger diameter makes the speedometer read low: the car is travelling faster than the dashboard says.',
      ],
    },
    content: {
      intro:
        'The Tire Size Calculator compares an original tire with a replacement and reports the change in overall diameter and circumference, plus the speedometer error the change introduces. It reads the standard metric size notation, so a 205/55 R16 becomes an actual diameter in millimetres rather than three numbers you have to interpret.',
      howItWorks:
        'The rim diameter is converted from inches to millimetres. The sidewall height is the width multiplied by the aspect ratio, and because the tire has a sidewall on both sides of the wheel, it is counted twice. Adding the two sidewalls to the rim gives the overall diameter, and multiplying by pi gives the circumference. The percentage difference in diameter is also the speedometer error.',
      example:
        'A 205/55 R16 has a 16-inch rim (406.4 mm) and sidewalls of 205 × 0.55 = 112.75 mm, so its diameter is 631.9 mm. A 215/60 R17 comes to 689.8 mm, which is 9.2% larger. At an indicated 100 km/h the car is actually doing about 109 km/h, and the gearing is effectively taller.',
      formulas: [
        { label: 'Sidewall height', expression: 'sidewall = width × aspect ÷ 100' },
        { label: 'Overall diameter', expression: 'diameter = rim × 25.4 + 2 × sidewall' },
        { label: 'Circumference', expression: 'circumference = π × diameter' },
        { label: 'Speedometer error', expression: 'error% = (new diameter − old diameter) ÷ old diameter × 100' },
      ],
      sources: [
        {
          label: 'Tire and Rim Association — Yearbook',
          expression: 'Tire size designations and dimensions',
          note: 'The US standards body that defines the metric tire size notation used here.',
        },
        {
          label: 'ISO 4000-1 — Passenger car tyres and rims',
          expression: 'Tyre designation and dimensions',
          note: 'The international standard for the size codes and measuring rim definitions.',
        },
        {
          label: 'UN Regulation No. 39 — Speedometer equipment',
          expression: 'Speedometer accuracy requirements',
          note: 'Explains why a diameter change produces a legal as well as a practical speed-reading error.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Diameter change',
          explanation:
            'How much taller or shorter the new tire is. A positive number raises the car and reduces the effective gearing; a negative number does the opposite.',
        },
        {
          resultLabel: 'Speedometer error at 100 km/h',
          explanation:
            'The percentage by which the speedometer under- or over-reads. A larger tire turns fewer times per kilometre, so the dashboard reads lower than the true speed.',
        },
      ],
      workflowLinks: [
        { slug: 'speed-converter', step: 'Convert the resulting speed into miles per hour.' },
        { slug: 'fuel-cost-calculator', step: 'See how a gearing change might affect fuel cost.' },
        { slug: 'car-loan-calculator', step: 'Budget for the vehicle these tires go on.' },
      ],
      faqs: [
        {
          q: 'What do the numbers on a tire mean?',
          a: 'In 205/55 R16, 205 is the section width in millimetres, 55 is the sidewall height as a percentage of that width, R means radial construction, and 16 is the rim diameter in inches. The overall diameter is not written on the sidewall, which is why it has to be calculated.',
        },
        {
          q: 'How much size difference is acceptable?',
          a: 'Most fitters aim to keep the overall diameter within 3% of the original. Beyond that, the speedometer error becomes significant, the gearing changes, and on a tight car the tire may rub the arch or suspension at full lock.',
        },
        {
          q: 'Will a larger tire make my speedometer read faster or slower?',
          a: 'Slower. A larger circumference covers more ground per revolution, so for a given true speed the wheels turn fewer times and the speedometer, which counts revolutions, shows a lower number than the real speed.',
        },
        {
          q: 'Does the calculator account for tire pressure or wear?',
          a: 'No. It uses the nominal new-tire dimensions. Inflation changes the rolling radius slightly, and worn tread reduces the diameter by a few millimetres, but neither is large enough to change the buying decision.',
        },
      ],
      related: ['speed-converter', 'fuel-cost-calculator', 'car-loan-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'car-depreciation',
    slug: 'car-depreciation-calculator',
    name: 'Car Depreciation Calculator',
    shortDesc: 'Project a vehicle’s value year by year using a declining-balance rate and a salvage floor.',
    tagline: 'The largest cost of car ownership.',
    category: 'misc',
    iconName: 'Car',
    badge: 'Automotive',
    featured: true,
    keywords: [
      'car depreciation calculator',
      'vehicle depreciation calculator',
      'car value after 5 years',
      'auto depreciation rate',
      'car resale value calculator',
      'declining balance depreciation',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'price', label: 'Purchase price', type: 'number', defaultValue: 30000, min: 1, step: 500 },
        { id: 'annualRate', label: 'Annual depreciation rate', type: 'number', defaultValue: 15, min: 0, max: 90, step: 1, suffix: '%' },
        { id: 'years', label: 'Years of ownership', type: 'number', defaultValue: 5, min: 1, max: 40, step: 1 },
        { id: 'salvage', label: 'Minimum value (salvage floor)', type: 'number', defaultValue: 0, min: 0, step: 500 },
      ],
      results: [
        {
          label: 'Value after ownership period',
          formulaCode: 'Math.min(price, Math.max(salvage, price * Math.pow(1 - annualRate / 100, years)))',
          accent: true,
        },
        {
          label: 'Total depreciation',
          formulaCode: 'price - Math.min(price, Math.max(salvage, price * Math.pow(1 - annualRate / 100, years)))',
        },
        {
          label: 'Average loss per year',
          formulaCode: '(price - Math.min(price, Math.max(salvage, price * Math.pow(1 - annualRate / 100, years)))) / years',
        },
        {
          label: 'Average loss per month',
          formulaCode: '(price - Math.min(price, Math.max(salvage, price * Math.pow(1 - annualRate / 100, years)))) / years / 12',
        },
        {
          label: 'First-year loss',
          formulaCode: 'price - Math.min(price, Math.max(salvage, price * (1 - annualRate / 100)))',
        },
        {
          label: 'Share of value retained',
          formulaCode: '(Math.min(price, Math.max(salvage, price * Math.pow(1 - annualRate / 100, years))) / price) * 100',
          suffix: '%',
        },
      ],
      formulaDescription: 'Value = price × (1 − annual rate)^years, never below the salvage floor',
      tips: [
        'New cars lose the most in the first year, often 15–25%, then a further 8–12% a year. A single flat rate is a simplification, not a forecast.',
        'The salvage floor matters for old or unusual vehicles: a rate that would take the value below scrap is not realistic.',
        'Depreciation is not a cash cost, but it is real. Add it to fuel, insurance, and maintenance to see the true cost of ownership.',
      ],
    },
    content: {
      intro:
        'The Car Depreciation Calculator projects what a vehicle will be worth after a chosen number of years, using a declining-balance rate and an optional minimum value. It also shows the total loss, the average monthly cost of that loss, and the share of the purchase price that remains.',
      howItWorks:
        'Each year, the car loses a fixed percentage of its current value, not of its original price. That is declining-balance depreciation: a 15% rate removes 15% of the first-year value, then 15% of what is left, and so on. The value is never allowed to fall below the salvage floor, which represents scrap or trade-in value.',
      example:
        'A $30,000 car depreciating at 15% a year is worth $25,500 after one year, $21,675 after two, and about $13,311 after five. That is $16,689 of value gone, or roughly $278 a month over the period, with 44% of the original price retained.',
      formulas: [
        { label: 'Declining balance', expression: 'value = price × (1 − rate)^years' },
        { label: 'Total loss', expression: 'loss = price − value' },
        { label: 'Average monthly loss', expression: 'monthly = loss ÷ years ÷ 12' },
        { label: 'Retained share', expression: 'retained% = value ÷ price × 100' },
      ],
      sources: [
        {
          label: 'IRS Publication 946 — How to Depreciate Property',
          expression: 'Declining-balance depreciation methods',
          note: 'Explains the declining-balance method that this calculator applies, including salvage-value treatment.',
        },
        {
          label: 'US Bureau of Labor Statistics — CPI Used Cars and Trucks',
          expression: 'Market price movement for used vehicles',
          note: 'A public check on how used-vehicle prices actually move over time.',
        },
        {
          label: 'AAA — Your Driving Costs',
          expression: 'Depreciation as a share of ownership cost',
          note: 'Shows why depreciation is usually the largest single cost of new-car ownership.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Value after ownership period',
          explanation:
            'The projected resale or trade-in value. Treat it as a planning estimate, not a quote: condition, mileage, demand, and local market all move the real number.',
        },
        {
          resultLabel: 'Average loss per month',
          explanation:
            'The depreciation spread evenly across the ownership period. It is useful for comparing a new car with a used one, or a lease with a purchase.',
        },
      ],
      workflowLinks: [
        { slug: 'car-loan-calculator', step: 'Add the financing cost to the depreciation cost.' },
        { slug: 'fuel-cost-calculator', step: 'Complete the running-cost picture.' },
        { slug: 'percentage-calculator', step: 'Work with the retained-value percentage directly.' },
      ],
      faqs: [
        {
          q: 'What is a realistic depreciation rate?',
          a: 'A new car commonly loses 15–25% in the first year and 8–12% a year after that. Luxury, electric, and high-volume models can be steeper; sought-after trucks and limited-run cars can be gentler. The calculator lets you use whichever rate fits your case.',
        },
        {
          q: 'Is depreciation the same as resale value?',
          a: 'No. Depreciation is the loss in value; resale value is what remains. A car that drops 40% in three years has a 60% resale value, before any adjustment for mileage or condition.',
        },
        {
          q: 'Why does the first year hurt so much?',
          a: 'Because the moment a new car is registered it becomes a used car, and the next buyer expects a used-car price. The steepest part of the curve is the first few months, which is why a one- or two-year-old car is often the better value.',
        },
        {
          q: 'Should I use straight-line or declining-balance?',
          a: 'Declining balance is closer to how vehicles actually lose value, because the same percentage of a shrinking number produces a large early loss and smaller later ones. Straight-line, an equal amount each year, understates the first-year hit.',
        },
      ],
      related: ['car-loan-calculator', 'fuel-cost-calculator', 'percentage-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'speed-distance-time',
    slug: 'speed-distance-time-calculator',
    name: 'Speed Distance Time Calculator',
    shortDesc: 'Solve for journey time, average speed, or distance, with the result shown as clock time and pace.',
    tagline: 'Distance, speed, time — pick the missing one.',
    category: 'misc',
    iconName: 'Route',
    badge: 'Travel',
    featured: false,
    keywords: [
      'speed distance time calculator',
      'travel time calculator',
      'average speed calculator',
      'distance speed time formula',
      'how long will it take to drive',
      'pace calculator km',
    ],
    kind: 'custom',
    componentId: 'SpeedDistanceTimeCalculator',
    content: {
      intro:
        'The Speed Distance Time Calculator solves the three-way relationship between distance, average speed, and journey time. Tell it which two you know and it returns the third, along with the time in hours and minutes and the equivalent running pace.',
      howItWorks:
        'Distance equals speed multiplied by time, so time is distance divided by speed and speed is distance divided by time. The calculator keeps everything in kilometres and hours internally, then presents the answer in the unit that makes sense for the question, including a minutes-per-kilometre pace for walking and running.',
      example:
        'A 100 km drive at an average of 80 km/h takes 1.25 hours, which is 1 hour 15 minutes. The same journey at 100 km/h takes exactly 1 hour. Running 10 km in 50 minutes is an average of 12 km/h, or a pace of 5:00 per kilometre.',
      formulas: [
        { label: 'Time', expression: 'time = distance ÷ speed' },
        { label: 'Speed', expression: 'speed = distance ÷ time' },
        { label: 'Distance', expression: 'distance = speed × time' },
        { label: 'Pace', expression: 'pace (min/km) = 60 ÷ speed (km/h)' },
      ],
      sources: [
        {
          label: 'NIST Special Publication 811 — Guide for the Use of the SI',
          expression: 'Kilometre, hour, and derived speed units',
          note: 'Defines the units and the relationship between them.',
        },
        {
          label: 'ISO 80000-3 — Quantities and units: space and time',
          expression: 'Speed and velocity definitions',
          note: 'Confirms that average speed is distance divided by elapsed time, not an average of instantaneous speeds.',
        },
        {
          label: 'UK Highway Code — Speed limits',
          expression: 'Practical context for average journey speeds',
          note: 'A reminder that legal limits are not average speeds; traffic, stops, and road type all lower the real figure.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Journey time',
          explanation:
            'Elapsed time at a constant average speed. Real journeys include stops, traffic, and speed changes, so add a margin for anything time-critical.',
        },
        {
          resultLabel: 'Pace',
          explanation:
            'Minutes per kilometre, the unit runners and walkers use. It is the reciprocal of speed, so a faster speed means a smaller pace number.',
        },
      ],
      workflowLinks: [
        { slug: 'running-pace-calculator', step: 'Turn the pace into split times and race predictions.' },
        { slug: 'fuel-cost-calculator', step: 'Price the fuel for the journey you just calculated.' },
        { slug: 'speed-converter', step: 'Convert the speed into miles per hour or metres per second.' },
      ],
      faqs: [
        {
          q: 'Is average speed the same as the speed shown on the dashboard?',
          a: 'No. Average speed is total distance divided by total time, including stops. If you drive 100 km in 90 minutes with a 15-minute break, the average is about 67 km/h even though the car was doing 100 km/h on the motorway.',
        },
        {
          q: 'How do I enter 1 hour 30 minutes?',
          a: 'Use decimal hours: 1.5. To convert minutes to a decimal, divide by 60, so 45 minutes is 0.75 hours and 20 minutes is 0.33 hours. The result is also shown in hours and minutes so you can check it.',
        },
        {
          q: 'Why is the pace in minutes per kilometre?',
          a: 'Because that is the convention for running and walking almost everywhere outside the US. If you need minutes per mile, note that one mile is 1.609 km, so the pace per mile is the pace per kilometre multiplied by 1.609.',
        },
        {
          q: 'Can I use this for a flight or a boat trip?',
          a: 'Yes, as long as the distance and speed use the same units. It assumes a constant speed over the whole distance, so it will be approximate for anything affected by wind, current, or intermediate stops.',
        },
      ],
      related: ['running-pace-calculator', 'fuel-cost-calculator', 'speed-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'ev-charging-cost',
    slug: 'ev-charging-cost-calculator',
    name: 'EV Charging Cost Calculator',
    shortDesc: 'Compare the cost of a home charge and a public charge after losses, with range added and cost per mile or kilometre.',
    tagline: 'The battery takes 45 kWh. The meter sees more.',
    category: 'misc',
    iconName: 'Zap',
    badge: 'Running costs',
    featured: false,
    keywords: [
      'ev charging cost calculator',
      'cost to charge electric car',
      'electric car charging cost per mile',
      'home vs public ev charging cost',
      'kwh per charge calculator',
      'ev cost per km',
    ],
    kind: 'custom',
    componentId: 'EvChargingCostCalculator',
    content: {
      intro:
        'The EV Charging Cost Calculator prices a charging session from the battery size and the charge window, then compares a home tariff with a public charger. It separates the energy that reaches the battery from the energy drawn from the grid, so charging losses are visible rather than quietly missing from the bill.',
      howItWorks:
        'Usable battery capacity is multiplied by the change in charge percentage to get the energy added to the battery. Charging is not perfectly efficient, so the grid energy is that figure divided by (1 - loss percentage). Grid energy is multiplied by the home and public price per kWh. Range added is the battery energy multiplied by the car efficiency in miles or kilometres per kWh, and charging time is grid energy divided by charger power.',
      example:
        'A 75 kWh car charged from 20% to 80% takes on 45 kWh. With 10% charging loss the meter supplies 45 / 0.90 = 50 kWh. At $0.16 per kWh that is $8.00 at home; at $0.45 per kWh it is $22.50 at a public charger. At 3.5 miles per kWh the session adds 157.5 miles, which is about $0.051 per mile at home.',
      formulas: [
        { label: 'Energy added', expression: 'battery kWh x (end % - start %) / 100' },
        { label: 'Grid energy', expression: 'energy added / (1 - loss % / 100)' },
        { label: 'Cost', expression: 'grid energy x price per kWh' },
        { label: 'Range added', expression: 'energy added x distance per kWh' },
        { label: 'Charging time', expression: 'grid energy / charger kW', note: 'Hours; multiplied by 60 for minutes.' },
      ],
      sources: [
        {
          label: 'U.S. Department of Energy - Fuel Economy: Electric Vehicles',
          expression: 'How EV efficiency is measured and reported',
          note: 'Explains miles per kWh and kWh per 100 miles. Real efficiency varies with speed, temperature, and driving style.',
        },
        {
          label: 'U.S. Environmental Protection Agency - Fuel Economy',
          expression: 'Monroney label efficiency figures for new vehicles',
          note: 'The source of the efficiency number on a new car label. Use your own trip meter for a used car in your conditions.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Grid energy drawn',
          explanation:
            'The electricity the meter actually supplies. It is higher than the energy stored in the battery because chargers and batteries lose some energy as heat.',
        },
        {
          resultLabel: 'Home cost',
          explanation:
            'Grid energy multiplied by your home tariff. Time-of-use rates, standing charges, and solar export credits are not modelled; use the effective rate you pay for the charging window.',
        },
        {
          resultLabel: 'Cost per mile',
          explanation:
            'The session cost divided by the range it adds. This is the number to compare with petrol or diesel cost per mile, and it moves with both electricity price and driving efficiency.',
        },
      ],
      workflowLinks: [
        { slug: 'fuel-cost-calculator', step: 'Compare the same journey in a petrol or diesel car.' },
        { slug: 'trip-cost-calculator', step: 'Add charging, tolls, and lodging into a whole-trip budget.' },
        { slug: 'gas-mileage-calculator', step: 'Check the efficiency of a combustion car on the same route.' },
      ],
      faqs: [
        {
          q: 'Why is grid energy higher than the energy added to the battery?',
          a: 'Charging loses energy in the onboard charger, the cable, and the battery itself, mostly as heat. The default 10% is a planning assumption. Cold weather, high charging power, and battery age can push losses higher.',
        },
        {
          q: 'Why is public charging so much more expensive?',
          a: 'Public networks pay for equipment, land, demand charges, maintenance, and payment processing, and they price for convenience. The gap in the calculator is the premium you pay for charging away from home, not a statement about the cost of electricity.',
        },
        {
          q: 'Should I use the car efficiency from the label or the trip meter?',
          a: 'Use the trip meter for a car you already drive, especially in winter or at highway speed. The label figure is a standardised test result and is useful for comparing models, not for predicting a specific journey.',
        },
        {
          q: 'Does this include battery degradation or replacement?',
          a: 'No. It prices energy for one session. Depreciation, tyres, servicing, insurance, and any battery repair belong in a total cost of ownership calculation, not in a charging cost.',
        },
        {
          q: 'How do I convert kWh per 100 miles into miles per kWh?',
          a: 'Divide 100 by the kWh per 100 miles figure. For example, 28 kWh per 100 miles is 100 / 28 = 3.57 miles per kWh. For kilometres, the same relationship holds with km per kWh.',
        },
      ],
      related: ['fuel-cost-calculator', 'trip-cost-calculator', 'gas-mileage-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.88 },
  },
  {
    id: 'trip-cost',
    slug: 'trip-cost-calculator',
    name: 'Trip Cost Calculator',
    shortDesc: 'Budget fuel, tolls, parking, lodging, and food for a whole trip, then split the total per person.',
    tagline: 'The fuel is rarely the expensive part.',
    category: 'misc',
    iconName: 'Route',
    badge: 'Travel budget',
    featured: false,
    keywords: [
      'trip cost calculator',
      'road trip cost calculator',
      'cost of driving trip',
      'fuel and hotel trip budget',
      'travel cost per person',
      'road trip budget calculator',
    ],
    kind: 'custom',
    componentId: 'TripCostCalculator',
    content: {
      intro:
        'The Trip Cost Calculator turns a route into a full travel budget: fuel, tolls, parking, lodging, food, and extras, with a per-person and per-mile split. It is deliberately broader than a fuel calculator, because on a multi-day trip the hotel and meals usually cost more than the tank.',
      howItWorks:
        'The one-way distance is doubled when the trip returns to its starting point. Fuel is distance divided by miles per gallon, or distance divided by 100 multiplied by litres per 100 km, then multiplied by the fuel price. Parking is charged per day, lodging per night, and food per person per day. Tolls and other costs are added once. The total is divided by the number of travellers and by the total distance.',
      example:
        'A 250-mile each-way trip with 25 mpg at $3.50 per gallon uses 20 gallons and costs $70 in fuel. Add 2 nights of lodging at $120 ($240), 3 days of parking at $12 ($36), food at $40 per person per day for 3 people over 3 days ($360), $30 of tolls, and $50 of extras. The trip total is $786, or $262 per person, and $1.572 per mile.',
      formulas: [
        { label: 'Trip distance', expression: 'one-way distance x 2 when round trip' },
        { label: 'Fuel (imperial)', expression: 'distance / mpg x price per gallon' },
        { label: 'Fuel (metric)', expression: 'distance / 100 x litres per 100 km x price per litre' },
        { label: 'Food', expression: 'food per person per day x days x travellers' },
        { label: 'Total', expression: 'fuel + tolls + parking + lodging + food + other' },
        { label: 'Per person', expression: 'total / travellers' },
      ],
      sources: [
        {
          label: 'U.S. Department of Energy - Fuel Economy',
          expression: 'Miles per gallon and litres per 100 km',
          note: 'The two efficiency measures are inverses: lower L/100km is better, higher mpg is better.',
        },
        {
          label: 'NIST Special Publication 811 - Guide for the Use of the International System of Units (SI)',
          expression: 'US gallon and litre conversion factors',
          note: 'Defines the unit relationship used when switching between imperial and metric fuel prices.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Total trip cost',
          explanation:
            'Everything entered, for the whole party. It is a budget, not a quote: fuel prices, hotel rates, and food spending are yours to estimate.',
        },
        {
          resultLabel: 'Cost per person',
          explanation:
            'The total divided by travellers. Shared fuel, lodging, and parking are split evenly here even if one person drives more or eats more.',
        },
        {
          resultLabel: 'Fuel share',
          explanation:
            'Fuel as a percentage of the total. On long trips with cheap lodging it can dominate; on short city breaks it is often a small slice.',
        },
      ],
      workflowLinks: [
        { slug: 'fuel-cost-calculator', step: 'Price a single journey when fuel is the only cost you need.' },
        { slug: 'gas-mileage-calculator', step: 'Measure your car real mpg before estimating the fuel line.' },
        { slug: 'ev-charging-cost-calculator', step: 'Swap the fuel line for charging costs on an electric trip.' },
      ],
      faqs: [
        {
          q: 'How is this different from the fuel cost calculator?',
          a: 'The fuel cost calculator prices the fuel for a distance. This one builds a trip budget, adding tolls, parking, lodging, food, and other costs, then splits the result per person. Use this for planning a holiday and the fuel calculator for a single drive.',
        },
        {
          q: 'Should I enter a one-way or round-trip distance?',
          a: 'Enter the one-way distance and leave the round-trip toggle on if you are returning. If you are relocating or not returning, switch it off. The calculator doubles the one-way figure only when the toggle is on.',
        },
        {
          q: 'Why does my metric efficiency look so different?',
          a: 'Miles per gallon and litres per 100 km run in opposite directions. A higher mpg is better; a lower L/100km is better. The unit switch resets the defaults so the numbers are not carried across with the wrong meaning.',
        },
        {
          q: 'What about wear, depreciation, and insurance?',
          a: 'They are not included. Add an estimate to the other-costs field if you want a fuller cost of driving. Depreciation is usually the largest per-mile cost and is not a cash cost on the day of the trip.',
        },
        {
          q: 'How should I split costs between travellers?',
          a: 'The tool splits everything evenly. If one person pays for lodging and another for fuel, use the per-person figure as the equal-share benchmark and settle the difference separately.',
        },
      ],
      related: ['fuel-cost-calculator', 'gas-mileage-calculator', 'ev-charging-cost-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.88 },
  },
  {
    id: 'brine',
    slug: 'brine-calculator',
    name: 'Brine Calculator',
    shortDesc: 'Calculate salt and water weights for a target salinity percentage, with grams per litre shown.',
    tagline: 'Salt by weight, not by scoop.',
    category: 'food',
    iconName: 'CookingPot',
    badge: 'Preserving',
    featured: false,
    keywords: [
      'brine calculator',
      'salt brine percentage calculator',
      'how much salt for brine',
      'wet brine calculator',
      'pickling brine calculator',
      'salinity calculator food',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'waterLiters', label: 'Water volume', type: 'number', defaultValue: 4, min: 0.1, step: 0.5, suffix: 'L' },
        { id: 'saltPercent', label: 'Target salinity', type: 'number', defaultValue: 5, min: 0.1, max: 30, step: 0.5, suffix: '% by weight' },
      ],
      results: [
        {
          label: 'Salt to add',
          formulaCode: 'waterLiters * 1000 * saltPercent / (100 - saltPercent)',
          suffix: 'g',
          accent: true,
        },
        {
          label: 'Total brine weight',
          formulaCode: 'waterLiters + waterLiters * 1000 * saltPercent / (100 - saltPercent) / 1000',
          suffix: 'kg',
        },
        {
          label: 'Salt concentration per litre',
          formulaCode: 'waterLiters * 1000 * saltPercent / (100 - saltPercent) / waterLiters',
          suffix: 'g/L',
        },
        {
          label: 'Salt as percent of water weight',
          formulaCode: 'waterLiters * 1000 * saltPercent / (100 - saltPercent) / (waterLiters * 1000) * 100',
          suffix: '%',
        },
      ],
      formulaDescription:
        'Salt (g) = water (g) x salinity / (100 - salinity), because salinity is salt as a share of total brine weight.',
      tips: [
        'Salinity is salt weight divided by total brine weight. Adding 5 percent of the water weight gives about 4.76 percent salinity, not 5 percent.',
        'Weigh salt on a kitchen scale. Tablespoons vary with crystal size, humidity, and how tightly the salt is packed.',
        'Keep brining food refrigerated. Salt slows some microbes but does not make a warm brine safe.',
      ],
    },
    content: {
      intro:
        'The Brine Calculator converts a water volume and a target salinity into the weight of salt to add. It uses the proper weight-based definition of salinity, where salt is a percentage of the total brine, not a percentage of the water alone.',
      howItWorks:
        'One litre of water weighs about 1,000 g. If the target salinity is 5 percent, salt must be 5 percent of the total weight, so the water is the other 95 percent. The salt weight is therefore water weight times salinity divided by 100 minus salinity. The total brine weight is water plus salt, and grams per litre divides the salt by the water volume.',
      example:
        'For 4 litres of water at 5 percent salinity, salt is 4,000 x 5 / 95 = 210.5 g. Total brine weight is 4.21 kg, which is 52.6 g of salt per litre, and the salt is 5.26 percent of the water weight.',
      formulas: [
        { label: 'Salt weight', expression: 'water weight x salinity / (100 - salinity)' },
        { label: 'Total brine weight', expression: 'water weight + salt weight' },
        { label: 'Grams per litre', expression: 'salt weight / water volume' },
        { label: 'Salt percent of water', expression: 'salt weight / water weight' },
      ],
      sources: [
        {
          label: 'USDA FSIS - Food Safety Guidance',
          expression: 'Curing, brining, and refrigeration',
          note: 'Food safety guidance for wet brining and the need for temperature control.',
        },
        {
          label: 'FDA Food Code - Time and Temperature Control',
          expression: 'Cold holding and cooling requirements',
          note: 'The food safety framework behind refrigerated brining.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Salt to add',
          explanation:
            'The weight of salt for the target salinity. It assumes the water weighs 1,000 g per litre, which is close enough for kitchen use.',
        },
        {
          resultLabel: 'Total brine weight',
          explanation:
            'Water plus salt. It is the denominator in the salinity definition and is useful for scaling a recipe.',
        },
        {
          resultLabel: 'Salt concentration per litre',
          explanation:
            'Grams of salt per litre of water. It is a convenient label for comparing brines, but it is not the same as percentage salinity.',
        },
      ],
      workflowLinks: [
        { slug: 'recipe-scaling-calculator', step: 'Scale the brine and the food together.' },
        { slug: 'coffee-ratio-calculator', step: 'Compare another weight-based ratio in the kitchen.' },
        { slug: 'meal-cost-calculator', step: 'Cost the brine and the batch together.' },
      ],
      faqs: [
        {
          q: 'Is brine percentage based on water or total weight?',
          a: 'Total weight. A 5 percent brine is 5 g of salt in 95 g of water, for 100 g of brine. If you add 5 g of salt to 100 g of water, the salinity is 4.76 percent, not 5 percent. The difference matters for consistent curing and fermentation.',
        },
        {
          q: 'How much salt is in a 5 percent brine?',
          a: 'About 52.6 g per litre of water, or 210.5 g in 4 litres. That is close to 3.5 tablespoons of fine sea salt, but weigh it rather than scooping. Different salts have different bulk densities.',
        },
        {
          q: 'Can I reuse a brine?',
          a: 'It is not recommended for food safety. The brine has been in contact with raw food, and its salt concentration and contamination load are uncertain. Discard it, or follow a tested curing recipe that specifies reuse.',
        },
        {
          q: 'How long should I brine meat?',
          a: 'It depends on the cut, thickness, and salinity. A whole chicken might take several hours to overnight in a moderate brine, while a thick roast needs longer. Over-brining makes the food salty and can affect texture. Follow a tested recipe for the specific cut.',
        },
        {
          q: 'Does a stronger brine preserve food without refrigeration?',
          a: 'Not automatically. Salt reduces water activity, but the safety of a preserve depends on the full method, acidity, temperature, and time. Use a tested canning or curing recipe and keep perishable brines cold unless the recipe is designed for ambient fermentation.',
        },
      ],
      related: ['recipe-scaling-calculator', 'coffee-ratio-calculator', 'meal-cost-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'cake-pan',
    slug: 'cake-pan-conversion-calculator',
    name: 'Cake Pan Conversion Calculator',
    shortDesc: 'Compare pan volumes and areas to scale a cake recipe between different pan sizes and depths.',
    tagline: 'Same batter, different pan, different depth.',
    category: 'food',
    iconName: 'ChefHat',
    badge: 'Baking',
    featured: false,
    keywords: [
      'cake pan conversion calculator',
      'pan size converter',
      'cake batter calculator',
      'how to scale a cake recipe',
      'pan volume calculator',
      'cake pan substitute',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'oldLength', label: 'Original pan length', type: 'number', defaultValue: 9, min: 0.1, suffix: 'in' },
        { id: 'oldWidth', label: 'Original pan width', type: 'number', defaultValue: 13, min: 0.1, suffix: 'in' },
        { id: 'oldDepth', label: 'Original pan depth', type: 'number', defaultValue: 2, min: 0.1, suffix: 'in' },
        { id: 'newLength', label: 'New pan length', type: 'number', defaultValue: 8, min: 0.1, suffix: 'in' },
        { id: 'newWidth', label: 'New pan width', type: 'number', defaultValue: 8, min: 0.1, suffix: 'in' },
        { id: 'newDepth', label: 'New pan depth', type: 'number', defaultValue: 2, min: 0.1, suffix: 'in' },
      ],
      results: [
        {
          label: 'Batter multiplier',
          formulaCode: '(newLength * newWidth * newDepth) / (oldLength * oldWidth * oldDepth)',
          accent: true,
        },
        {
          label: 'Area ratio',
          formulaCode: '(newLength * newWidth) / (oldLength * oldWidth)',
        },
        {
          label: 'Depth ratio',
          formulaCode: 'newDepth / oldDepth',
        },
        {
          label: 'New pan volume',
          formulaCode: 'newLength * newWidth * newDepth',
          suffix: 'cu in',
        },
      ],
      formulaDescription:
        'Batter multiplier = new pan volume / original pan volume; area and depth ratios show where the change comes from.',
      tips: [
        'A 9 x 13 x 2 in pan holds 234 cubic inches. An 8 x 8 x 2 in pan holds 128, so the same recipe fills it about 1.8 times as deep and may overflow.',
        'For round pans, measure the inside diameter and use the circle area formula. This calculator accepts rectangles only.',
        'Keep the oven temperature the same and adjust the time. A shallower batter bakes faster; a deeper one needs longer and may need a reduce-and-extend bake.',
      ],
    },
    content: {
      intro:
        'The Cake Pan Conversion Calculator compares the volume and area of two rectangular pans to give a batter multiplier. It separates the area change from the depth change, which is what determines whether a recipe fits, overflows, or bakes unevenly.',
      howItWorks:
        'Rectangular pan volume is length times width times depth. Dividing the new volume by the original volume gives the multiplier to apply to the batter quantity. The area ratio shows the change in the footprint, and the depth ratio shows the change in batter depth when the same volume is used. If the multiplier is above one, the new pan holds more; below one, it holds less.',
      example:
        'A 9 x 13 x 2 in pan has a volume of 234 cubic inches. An 8 x 8 x 2 in pan has 128 cubic inches. The multiplier is 128 / 234 = 0.547, so the original recipe makes about 1.83 times the batter the smaller pan holds. The area ratio is also 0.547 because the depth is unchanged.',
      formulas: [
        { label: 'Pan volume', expression: 'length x width x depth' },
        { label: 'Batter multiplier', expression: 'new volume / original volume' },
        { label: 'Area ratio', expression: '(new length x new width) / (original length x original width)' },
        { label: 'Depth ratio', expression: 'new depth / original depth' },
      ],
      sources: [
        {
          label: 'King Arthur Baking - Cake Pan Sizes and Conversions',
          expression: 'Pan capacity and batter scaling',
          note: 'A test-kitchen reference for common pan sizes and approximate capacities.',
        },
        {
          label: 'USDA Food Safety and Inspection Service - Baking and Egg Safety',
          expression: 'Safe baking and egg handling',
          note: 'General food safety guidance for batters containing eggs and dairy.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Batter multiplier',
          explanation:
            'Multiply the recipe by this number to fill the new pan to the same depth. A multiplier below one means the original recipe is too much for the new pan.',
        },
        {
          resultLabel: 'Area ratio',
          explanation:
            'How the footprint changed. It drives the baking time because a larger area exposes more batter to the oven heat.',
        },
        {
          resultLabel: 'Depth ratio',
          explanation:
            'How the batter depth changes if you use the same volume. More than about 1.3 can mean a longer bake and a domed top.',
        },
      ],
      workflowLinks: [
        { slug: 'recipe-scaling-calculator', step: 'Scale the full recipe, not just the batter.' },
        { slug: 'oven-temperature-converter', step: 'Convert the bake temperature between C and F.' },
        { slug: 'ingredient-weight-converter', step: 'Convert cup measures into grams for a reliable scale-up.' },
      ],
      faqs: [
        {
          q: 'Can I just use the same batter in a different pan?',
          a: 'Only if the pan volume is close. A smaller pan makes a deeper cake that may overflow or stay raw in the centre. A larger pan makes a thin layer that bakes fast and can dry out. Compare volumes first, then adjust the batter and the time.',
        },
        {
          q: 'How do I convert a round pan?',
          a: 'Measure the inside diameter and calculate area as pi times radius squared. Volume is area times depth. This calculator uses rectangles, so for round pans calculate the two volumes separately and use their ratio as the multiplier.',
        },
        {
          q: 'Should I change the oven temperature?',
          a: 'Usually not for a modest size change. Keep the temperature and adjust the time, checking early. A much deeper batter benefits from a slightly lower temperature and a longer bake so the centre sets before the crust over-browns.',
        },
        {
          q: 'How full should a cake pan be?',
          a: 'About half to two thirds full is a safe range for most cakes. Leave room for rise and avoid filling to the rim. If the multiplier says the batter would fill the new pan more than about two thirds, bake the excess as cupcakes or scale the recipe down.',
        },
        {
          q: 'Does pan material change the result?',
          a: 'Yes. Dark metal pans brown faster, glass heats more slowly and retains heat, and light aluminium is more forgiving. Adjust the temperature by about 15 C (25 F) for dark pans and check earlier. The volume conversion does not account for material.',
        },
      ],
      related: ['recipe-scaling-calculator', 'oven-temperature-converter', 'ingredient-weight-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
];
