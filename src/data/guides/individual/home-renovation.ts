import { Guide } from '../../../types';

export const homeRenovationGuide: Guide = {
  id: 'home-renovation-guide',
  slug: 'home-renovation-math-guide',
  name: 'Home Renovation Math: Measure Twice, Calculate Once',
  shortDesc: 'How to calculate room dimensions, paint coverage, flooring needs, and concrete volume for any renovation project.',
  category: 'construction',
  iconName: 'Hammer',
  keywords: ['home renovation', 'room area', 'paint calculator', 'flooring', 'concrete', 'renovation budget', 'materials'],
  content: {
    hook: 'Most renovation budgets blow out because the math was wrong before work started. Measure twice, calculate once, and your project stays on budget.',
    sections: [
      {
        heading: 'Calculating Room Area and Volume',
        body: [
          'For rectangular rooms, multiply length by width to get floor area in square feet. A 12-foot by 14-foot room is 168 square feet. Add a closet by measuring it separately and adding to the total.',
          'For irregular rooms, break the space into rectangles. An L-shaped room is two rectangles added together. A room with a bay window is a rectangle plus the triangular or rectangular window area.',
          'Volume (length x width x height) matters for HVAC sizing and concrete pours. A 12x14x8 room is 1,344 cubic feet. This number determines what size air conditioner or heater you need.',
        ],
      },
      {
        heading: 'Paint Coverage and Ordering',
        body: [
          'One gallon of interior paint covers 350-400 square feet of smooth wall. Textured surfaces absorb 15-20% more paint. Ceilings count separately from walls.',
          'To calculate wall area: measure the perimeter of the room and multiply by ceiling height. A 12x14 room with 8-foot walls has a perimeter of 52 feet, giving 416 square feet of wall area. Subtract windows (15 sq ft each) and doors (21 sq ft each).',
          'Always buy 10% extra for touch-ups and waste. Two coats are standard for good coverage. Buy all paint from the same batch to ensure color consistency.',
        ],
        callout: 'One gallon of paint covers roughly 350 square feet. Calculate wall area, subtract windows and doors, then add 10% for waste.',
      },
      {
        heading: 'Flooring: Ordering with Waste Factor',
        body: [
          'Measure the room area in square feet, then add waste: 10% for simple rectangular rooms, 15% for diagonal installations, 20% for herringbone or complex patterns. Tile breaks more than vinyl or laminate.',
          'For plank flooring (laminate, hardwood, vinyl), account for the plank direction. Running planks parallel to the longest wall minimizes waste. Running perpendicular or diagonally increases cuts and waste.',
          'Order all flooring from the same production run. Different batches can have slight color variations that are visible when laid side by side. If you need more later, you may not get an exact match.',
        ],
      },
      {
        heading: 'Concrete and Material Volume',
        body: [
          'Concrete is ordered by cubic yards. One cubic yard covers 81 square feet at 4 inches thick (standard slab). Calculate: length x width x thickness (in feet), then divide by 27 to get cubic yards.',
          'A 20x20 patio at 4 inches thick needs: 20 x 20 x 0.33 = 132 cubic feet, divided by 27 = 4.89 cubic yards. Order 5 cubic yards. Always round up because you cannot order partial yards.',
          'Add 5-10% for settling, spillage, and uneven subgrade. Concrete cannot be returned. Running short means a cold joint (visible line where new concrete meets old), which is both ugly and structurally weak.',
        ],
        callout: 'Concrete is ordered by cubic yards. Length x width x thickness (in feet) divided by 27 equals cubic yards needed. Always round up.',
      },
      {
        heading: 'Budgeting with Markup and Contingency',
        body: [
          'Material costs are only 40-60% of a renovation budget. Labor, permits, disposal, and unexpected issues make up the rest. A $10,000 materials estimate typically becomes a $20,000-25,000 total project cost.',
          'Keep a 15-20% contingency fund for unexpected issues: hidden water damage, outdated wiring, structural surprises behind walls. These are not possibilities; they are near-certainties in older homes.',
          'Get three contractor bids for any work you cannot do yourself. The cheapest bid is not always the best. Ask for references, check licensing, and verify insurance. A bad contractor costs more to fix than the savings from their low bid.',
        ],
      },
    ],
    conclusion: 'Accurate measurements prevent budget blowouts. Calculate room area, wall area, and material volume before ordering anything. Add waste factors and contingency. The math takes 15 minutes and saves thousands.',
  },
  faqs: [
    { q: 'How much paint do I need for a 12x12 room?', a: 'A 12x12 room with 8-foot walls has about 384 square feet of wall area. Subtract 57 sq ft for a door and window, leaving roughly 327 sq ft. One gallon covers 350 sq ft, so one gallon is enough for one coat. Buy two gallons for two coats.' },
    { q: 'How do I calculate flooring for an L-shaped room?', a: 'Break the L into two rectangles. Calculate each area separately and add them together. Then add the waste factor (10-15% depending on installation pattern).' },
    { q: 'Can I return unused concrete?', a: 'No. Concrete is a custom-mixed product that cannot be returned. Always order 5-10% more than your calculation. Running short creates a cold joint that weakens the slab.' },
    { q: 'What is the biggest hidden cost in renovations?', a: 'Unforeseen structural or code issues. Old homes may have knob-and-tube wiring, lead paint, asbestos, or water damage that must be addressed before cosmetic work begins. Budget 15-20% contingency for these surprises.' },
  ],
  embeddedCalculators: ['room-area-calculator', 'paint-calculator', 'flooring-calculator', 'concrete-calculator'],
  relatedCalculators: ['room-volume-calculator', 'lumber-calculator', 'markup-margin-calculator'],
  relatedGuides: ['cooking-by-weight-guide'],
  seo: {
    status: 'index',
    reviewStatus: 'reviewed',
    priority: 0.85,
  },
  publishedAt: '2026-08-22',
};
