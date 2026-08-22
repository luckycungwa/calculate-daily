import { Guide } from '../../../types';

export const cookingWeightGuide: Guide = {
  id: 'cooking-weight-guide',
  slug: 'cooking-by-weight-guide',
  name: 'Cooking by Weight: Why Grams Beat Cups Every Time',
  shortDesc: 'Understand why professional kitchens use weight instead of volume, convert any recipe, and scale ingredients accurately.',
  category: 'conversion',
  iconName: 'Utensils',
  keywords: ['cooking by weight', 'cups to grams', 'recipe conversion', 'baking precision', 'ingredient weight', 'meal cost'],
  content: {
    hook: 'American recipes use cups. Professional kitchens use grams. The difference matters more than you think, especially in baking where precision determines success or failure.',
    sections: [
      {
        heading: 'Why Weight Beats Volume for Accuracy',
        body: [
          'A cup of all-purpose flour can weigh anywhere from 120 to 150 grams depending on how you scoop it. That is a 25% variation in your main ingredient. In baking, that is the difference between a light cake and a dense brick.',
          'Weight eliminates the inconsistency of scooping. One gram is one gram, whether you are in London or Los Angeles. A scale removes human error from measuring.',
          'Professional recipes use weight for a reason. It produces consistent results every time. When a pastry chef says 250 grams of flour, every batch tastes the same.',
        ],
        callout: 'A cup of flour can vary by 25% depending on how you scoop it. Weight eliminates this inconsistency entirely.',
      },
      {
        heading: 'Common Conversions for Baking',
        body: [
          'All-purpose flour: 1 cup = 125 grams. Bread flour: 1 cup = 130 grams. Granulated sugar: 1 cup = 200 grams. Brown sugar (packed): 1 cup = 220 grams. Powdered sugar: 1 cup = 120 grams.',
          'Butter: 1 cup = 227 grams (2 sticks). Milk: 1 cup = 245 grams. Water: 1 cup = 237 grams. Honey: 1 cup = 340 grams.',
          'These are averages. Different brands and environmental humidity affect exact weights. But the variation from weight-based measurement is 2-3%, versus 20-25% with volume.',
        ],
      },
      {
        heading: 'Scaling Recipes Up and Down',
        body: [
          'Doubling a recipe is straightforward: multiply all ingredients by two. But scaling by odd factors (1.5x, 0.75x) is where weight shines. Multiply 227 grams of butter by 1.5 to get 340 grams. Try doing that with cups.',
          'Some ingredients do not scale linearly. Spices and seasonings should be scaled conservatively (about 75% of the proportional amount) because flavor compounds concentrate differently at different volumes.',
          'When scaling down, remember that some equipment has minimum effective sizes. A stand mixer with a large bowl may not mix a quarter batch effectively. Manual mixing works better for very small batches.',
        ],
      },
      {
        heading: 'Meal Cost Per Serving',
        body: [
          'To calculate cost per serving, add up the cost of all ingredients used and divide by the number of servings. A pasta dish with $8 of ingredients serving 4 people costs $2 per serving.',
          'Track ingredient costs by weight. If a 5-pound bag of flour costs $4 and you use 250 grams in a recipe, the flour costs $0.44. This level of tracking reveals which recipes are truly economical.',
          'Compare homemade cost to restaurant or takeout prices. A $2 per serving homemade meal versus $12 per serving at a restaurant saves $10 per person per meal. Over a year of home cooking, the savings are substantial.',
        ],
      },
      {
        heading: 'Substituting Ingredients by Weight',
        body: [
          'When substituting flours, use weight not volume. Cup-for-cup gluten-free flour blends are designed to match wheat flour by weight, not volume. Using the wrong measurement produces inconsistent results.',
          'Fat substitutions (butter for oil, applesauce for butter) must be done by weight. A cup of butter weighs 227 grams. A cup of oil weighs 218 grams. A cup of applesauce weighs 255 grams. These differences affect texture.',
          'When a recipe calls for an ingredient you do not have, check the weight of both ingredients. If they are within 10% by weight, the substitution usually works. If the weights differ significantly, adjust other ingredients to compensate.',
        ],
      },
    ],
    conclusion: 'Buy a kitchen scale. Measure by weight. Your baking will be more consistent, your cooking more precise, and your meal costs more accurate. The $15 investment pays for itself in fewer ruined recipes.',
  },
  faqs: [
    { q: 'Do I need an expensive kitchen scale?', a: 'No. A basic digital scale that reads in grams and ounces costs $10-20 and is accurate to 1 gram. That is precise enough for all home cooking and baking. Expensive scales add features like tare memory, not accuracy.' },
    { q: 'How do I convert a recipe from cups to grams?', a: 'Look up the weight of each ingredient in cups-to-grams tables. Flour (1 cup = 125g), sugar (1 cup = 200g), butter (1 cup = 227g) are the most common. Our calculator handles the conversion automatically.' },
    { q: 'Is baking by weight really that different?', a: 'Yes. Baking is chemistry, and chemistry requires precision. A 25% variation in flour (from scooping differently) changes the texture, rise, and moisture of baked goods. Weight eliminates this variable.' },
    { q: 'What about savory cooking?', a: 'Savory cooking is more forgiving because you taste and adjust as you go. But weight-based measurement still produces more consistent results, especially for spice blends, marinades, and sauce ratios.' },
  ],
  embeddedCalculators: ['cups-to-grams-calculator', 'oz-to-cups-calculator', 'recipe-scaling-calculator', 'meal-cost-calculator'],
  relatedCalculators: ['percentage-calculator', 'ratio-proportion-calculator'],
  relatedGuides: ['percentage-guide'],
  seo: {
    status: 'index',
    reviewStatus: 'reviewed',
    priority: 0.8,
  },
  publishedAt: '2026-08-22',
};
