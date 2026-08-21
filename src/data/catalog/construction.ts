import { CalculatorMeta } from '../../types';

export const CONSTRUCTION_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'room-area',
    slug: 'room-area-calculator',
    name: 'Room Area Calculator',
    shortDesc: 'Compute floor area in square feet and square meters.',
    tagline: 'Measure a room before you buy materials.',
    category: 'construction',
    iconName: 'Square',
    keywords: ['room area', 'area calculator', 'square feet', 'square meters', 'floor area', 'room size'],
    kind: 'config',
    config: {
      fields: [
        { id: 'lengthFt', label: 'Length', type: 'number', defaultValue: 12, min: 0, suffix: 'ft' },
        { id: 'widthFt', label: 'Width', type: 'number', defaultValue: 10, min: 0, suffix: 'ft' },
      ],
      results: [
        { label: 'Area', formulaCode: 'lengthFt * widthFt', suffix: 'sq ft', accent: true },
        { label: 'Area in Square Meters', formulaCode: 'lengthFt * widthFt * 0.092903', suffix: 'm²' },
      ],
      formulaDescription: 'Area = Length x Width',
      tips: [
        'For irregular rooms, split the space into rectangles and add the areas.',
        'Add 10% waste when ordering flooring or paint.',
      ],
    },
    content: {
      intro:
        'The Room Area Calculator finds the floor area of a rectangular room from its length and width, reporting both square feet and square meters. It is the first step in any flooring, paint, or tile estimate.',
      howItWorks:
        'Area is length times width for rectangular spaces. The tool multiplies feet directly for square footage and applies the 0.092903 factor to report square meters.',
      example:
        'A room 12 feet by 10 feet has an area of 120 square feet, or about 11.15 square meters.',
      formulas: [
        {
          label: 'Floor Area',
          expression: 'Area = Length × Width',
          note: 'Square meters = sq ft × 0.092903.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Area',
          explanation:
            'The floor surface in square feet, the base number for ordering materials.',
        },
        {
          resultLabel: 'Area in Square Meters',
          explanation:
            'The same floor area in metric units for international materials or comparisons.',
        },
      ],
      workflowLinks: [
        { slug: 'flooring-calculator', step: 'Turn the area into a material order with waste.' },
        { slug: 'paint-calculator', step: 'Estimate paint using the same wall area.' },
      ],
      faqs: [
        { q: 'How do I calculate the area of a room?', a: 'Measure length and width in the same unit, then multiply. A 12 x 10 foot room is 120 square feet.' },
        { q: 'How do I measure an L-shaped room?', a: 'Split it into two rectangles, compute each area, and add them together. The tool handles one rectangle at a time.' },
        { q: 'Should I account for waste?', a: 'Yes. Add 5-10% for cutting waste when buying flooring, tile, or carpet, which the flooring calculator handles for you.' },
      ],
      related: ['flooring-calculator', 'paint-calculator', 'area-converter'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
    },
  },
  {
    id: 'room-volume',
    slug: 'room-volume-calculator',
    name: 'Room Volume Calculator',
    shortDesc: 'Compute room volume in cubic feet and cubic yards.',
    tagline: 'Volume for HVAC, storage, and capacity planning.',
    category: 'construction',
    iconName: 'Cube',
    keywords: ['room volume', 'volume calculator', 'cubic feet', 'cubic yards', 'cubic meters', 'room capacity'],
    kind: 'config',
    config: {
      fields: [
        { id: 'lengthFt', label: 'Length', type: 'number', defaultValue: 12, min: 0, suffix: 'ft' },
        { id: 'widthFt', label: 'Width', type: 'number', defaultValue: 10, min: 0, suffix: 'ft' },
        { id: 'heightFt', label: 'Height', type: 'number', defaultValue: 8, min: 0, suffix: 'ft' },
      ],
      results: [
        { label: 'Volume', formulaCode: 'lengthFt * widthFt * heightFt', suffix: 'cu ft', accent: true },
        { label: 'Volume in Cubic Yards', formulaCode: 'lengthFt * widthFt * heightFt / 27', suffix: 'cu yd' },
      ],
      formulaDescription: 'Volume = Length x Width x Height',
      tips: [
        '27 cubic feet equal 1 cubic yard, the standard unit for ordering fill.',
        'Room volume drives HVAC sizing and ventilation calculations.',
      ],
    },
    content: {
      intro:
        'The Room Volume Calculator computes the interior volume of a space in cubic feet and cubic yards. HVAC sizing, storage capacity, and ventilation planning all start with this measurement.',
      howItWorks:
        'Volume is length times width times height for a rectangular space. Cubic feet divide by 27 to become cubic yards, the unit most often used to order fill material.',
      example:
        'A room 12 x 10 x 8 feet holds 960 cubic feet, or about 35.6 cubic yards.',
      formulas: [
        {
          label: 'Room Volume',
          expression: 'Volume = Length × Width × Height',
          note: 'Cubic yards = cu ft / 27.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Volume',
          explanation:
            'The interior space in cubic feet, the base figure for HVAC and capacity planning.',
        },
        {
          resultLabel: 'Volume in Cubic Yards',
          explanation:
            'The same space in the unit used to order fill and concrete.',
        },
      ],
      workflowLinks: [
        { slug: 'concrete-calculator', step: 'Order concrete for a slab using volume math.' },
        { slug: 'room-area-calculator', step: 'Pair the floor area with the space volume.' },
      ],
      faqs: [
        { q: 'How do I calculate the volume of a room?', a: 'Multiply length by width by height in the same unit. A 12 x 10 x 8 foot room is 960 cubic feet.' },
        { q: 'Why do I need room volume?', a: 'Heating and cooling loads, fan sizing, and storage capacity all depend on volume rather than floor area.' },
        { q: 'How many cubic feet are in a cubic yard?', a: 'There are 27 cubic feet in a cubic yard, so divide the cubic feet by 27 to convert.' },
      ],
      related: ['concrete-calculator', 'room-area-calculator', 'volume-converter'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.6,
    },
  },
  {
    id: 'concrete',
    slug: 'concrete-calculator',
    name: 'Concrete Calculator',
    shortDesc: 'Estimate concrete in cubic yards and number of bags needed.',
    tagline: 'Order the right concrete, the first time.',
    category: 'construction',
    iconName: 'Truck',
    keywords: ['concrete calculator', 'cubic yards concrete', 'concrete bags', 'concrete slab', 'how much concrete', 'cement'],
    kind: 'config',
    config: {
      fields: [
        { id: 'lengthFt', label: 'Slab Length', type: 'number', defaultValue: 10, min: 0, suffix: 'ft' },
        { id: 'widthFt', label: 'Slab Width', type: 'number', defaultValue: 8, min: 0, suffix: 'ft' },
        { id: 'depthIn', label: 'Slab Thickness', type: 'number', defaultValue: 4, min: 1, suffix: 'in' },
      ],
      results: [
        { label: 'Volume Needed', formulaCode: 'lengthFt * widthFt * (depthIn / 12) / 27', suffix: 'cu yd', accent: true },
        { label: '60 lb Bags', formulaCode: 'lengthFt * widthFt * (depthIn / 12) / 27 / 0.017', suffix: 'bags' },
        { label: '80 lb Bags', formulaCode: 'lengthFt * widthFt * (depthIn / 12) / 27 / 0.022', suffix: 'bags' },
      ],
      formulaDescription: 'Volume (cu yd) = Length x Width x Thickness / 27',
      tips: [
        'A 60 lb bag yields about 0.017 cu yd; an 80 lb bag about 0.022 cu yd.',
        'Order 5-10% extra to account for uneven ground and spillage.',
      ],
    },
    content: {
      intro:
        'The Concrete Calculator estimates the concrete needed for a slab in cubic yards and the number of pre-mixed bags required. It prevents both under-ordering mid-pour and over-ordering that wastes money.',
      howItWorks:
        'The slab volume in cubic feet is length times width times thickness in inches divided by 12. Dividing by 27 converts to cubic yards, then bag counts follow from each bag size yield.',
      example:
        'A 10 x 8 foot slab at 4 inches thick needs 10 x 8 x 0.333 / 27 = 0.99 cubic yards, or about 58 sixty-pound bags.',
      formulas: [
        {
          label: 'Slab Volume',
          expression: 'Volume (cu yd) = L × W × (Thickness in / 12) / 27',
        },
        {
          label: 'Bag Count',
          expression: 'Bags = Volume / Yield per Bag',
          note: '60 lb ≈ 0.017 cu yd, 80 lb ≈ 0.022 cu yd.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Volume Needed',
          explanation:
            'The concrete volume for your slab in cubic yards, the unit used when ordering a delivery.',
        },
        {
          resultLabel: '60 lb / 80 lb Bags',
          explanation:
            'How many pre-mixed bags to buy if you are mixing by hand, by bag size.',
        },
      ],
      workflowLinks: [
        { slug: 'room-volume-calculator', step: 'Measure the space that needs a concrete fill.' },
        { slug: 'room-area-calculator', step: 'Start from the slab footprint area.' },
      ],
      faqs: [
        { q: 'How much concrete do I need for a slab?', a: 'Multiply length by width by thickness in feet and divide by 27 for cubic yards. The calculator automates this and reports bag counts.' },
        { q: 'How many bags of concrete are in a cubic yard?', a: 'Roughly 59 sixty-pound bags or 45 eighty-pound bags per cubic yard, accounting for standard yields.' },
        { q: 'Should I order extra concrete?', a: 'Order 5-10% extra. Slight over-excavation and spillage are common, and running short mid-pour is far worse than having a little left.' },
      ],
      related: ['room-volume-calculator', 'room-area-calculator', 'volume-converter'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.7,
    },
  },
  {
    id: 'paint',
    slug: 'paint-calculator',
    name: 'Paint Calculator',
    shortDesc: 'Estimate gallons of paint needed for walls and ceilings.',
    tagline: 'Buy exactly the paint your walls need.',
    category: 'construction',
    iconName: 'PaintRoller',
    keywords: ['paint calculator', 'how much paint', 'gallons of paint', 'paint coverage', 'painting walls', 'paint room'],
    kind: 'config',
    config: {
      fields: [
        { id: 'wallAreaSqft', label: 'Wall Area to Paint', type: 'number', defaultValue: 400, min: 0, suffix: 'sq ft' },
        { id: 'coats', label: 'Number of Coats', type: 'number', defaultValue: 2, min: 1, max: 4 },
        { id: 'coveragePerGallon', label: 'Coverage per Gallon', type: 'number', defaultValue: 350, min: 50, suffix: 'sq ft' },
      ],
      results: [
        { label: 'Gallons Needed', formulaCode: 'wallAreaSqft * coats / coveragePerGallon', suffix: 'gal', accent: true },
        { label: 'Liters Needed', formulaCode: 'wallAreaSqft * coats / coveragePerGallon * 3.78541', suffix: 'L' },
      ],
      formulaDescription: 'Gallons = Area x Coats / Coverage per Gallon',
      tips: [
        'One gallon typically covers about 350 sq ft per coat.',
        'Rough or textured walls absorb more paint than smooth surfaces.',
      ],
    },
    content: {
      intro:
        'The Paint Calculator estimates the gallons of paint needed for a job based on surface area, number of coats, and paint coverage. It keeps you from buying too little mid-project or too much at the register.',
      howItWorks:
        'Total gallons equal the wall area multiplied by the number of coats and divided by the coverage per gallon. Liters are derived by multiplying gallons by 3.785.',
      example:
        'Painting 400 square feet with two coats using 350 sq ft/gallon coverage needs 400 x 2 / 350 = 2.29 gallons, or about 8.7 liters.',
      formulas: [
        {
          label: 'Gallons Needed',
          expression: 'Gallons = Area × Coats / Coverage per Gallon',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Gallons Needed',
          explanation:
            'The paint volume for the job, accounting for surface area and number of coats.',
        },
        {
          resultLabel: 'Liters Needed',
          explanation:
            'The same paint volume in metric units, useful where paint is sold by the liter.',
        },
      ],
      workflowLinks: [
        { slug: 'room-area-calculator', step: 'Measure the wall area to paint first.' },
        { slug: 'flooring-calculator', step: 'Plan the room materials together in one pass.' },
      ],
      faqs: [
        { q: 'How much paint do I need for a room?', a: 'Calculate the wall area, multiply by the number of coats, and divide by coverage per gallon (typically 350 sq ft). The calculator does all three steps.' },
        { q: 'How do I measure wall area?', a: 'Multiply each wall length by its height and subtract windows and doors. Sum all walls for the total surface.' },
        { q: 'Does paint coverage vary?', a: 'Yes. Smooth primed walls cover near 400 sq ft per gallon, while rough or unprimed surfaces may drop to 250-300 sq ft.' },
      ],
      related: ['room-area-calculator', 'flooring-calculator', 'lumber-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.65,
    },
  },
  {
    id: 'flooring',
    slug: 'flooring-calculator',
    name: 'Flooring Calculator',
    shortDesc: 'Estimate flooring needed including cutting waste.',
    tagline: 'Buy the right amount of flooring the first time.',
    category: 'construction',
    iconName: 'Grid',
    keywords: ['flooring calculator', 'how much flooring', 'square feet flooring', 'tile calculator', 'laminate', 'hardwood'],
    kind: 'config',
    config: {
      fields: [
        { id: 'roomLengthFt', label: 'Room Length', type: 'number', defaultValue: 12, min: 0, suffix: 'ft' },
        { id: 'roomWidthFt', label: 'Room Width', type: 'number', defaultValue: 10, min: 0, suffix: 'ft' },
        { id: 'wastePct', label: 'Waste Allowance', type: 'number', defaultValue: 10, min: 0, max: 30, suffix: '%' },
      ],
      results: [
        { label: 'Flooring Needed', formulaCode: 'roomLengthFt * roomWidthFt * (1 + wastePct / 100)', suffix: 'sq ft', accent: true },
        { label: 'In Square Yards', formulaCode: 'roomLengthFt * roomWidthFt * (1 + wastePct / 100) / 9', suffix: 'sq yd' },
      ],
      formulaDescription: 'Needed = Room Area x (1 + Waste / 100)',
      tips: [
        'Add 5-10% waste for straight layouts and up to 15% for diagonal or patterned ones.',
        'Square footage divides by 9 to become square yards.',
      ],
    },
    content: {
      intro:
        'The Flooring Calculator estimates the material you need for a room, including cutting waste. Hardwood, tile, laminate, and carpet all need extra to cover cuts, and this tool puts the number in plain square feet.',
      howItWorks:
        'Room area is length times width. The waste allowance scales that area by (1 + waste/100) to cover offcuts and mistakes. The result converts to square yards when needed.',
      example:
        'A 12 x 10 foot room with 10% waste needs 120 x 1.10 = 132 square feet of flooring, or about 14.7 square yards.',
      formulas: [
        {
          label: 'Flooring Needed',
          expression: 'Needed = Room Area × (1 + Waste / 100)',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Flooring Needed',
          explanation:
            'The total material to buy, including your waste allowance for cuts and mistakes.',
        },
        {
          resultLabel: 'In Square Yards',
          explanation:
            'The same quantity in the unit carpet is often sold by.',
        },
      ],
      workflowLinks: [
        { slug: 'room-area-calculator', step: 'Measure the room footprint first.' },
        { slug: 'paint-calculator', step: 'Budget the walls while you plan the floor.' },
      ],
      faqs: [
        { q: 'How much extra flooring should I buy?', a: 'Add 5-10% for straight layouts and up to 15% for diagonal, herringbone, or heavily patterned installations.' },
        { q: 'How do I convert flooring to square yards?', a: 'Divide square feet by 9. Carpet is commonly sold by the square yard, so 132 sq ft is 14.7 sq yd.' },
        { q: 'Why does waste matter?', a: 'Cutting planks and tiles around edges, doors, and pipes produces unavoidable offcuts that must be planned for.' },
      ],
      related: ['room-area-calculator', 'paint-calculator', 'lumber-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.65,
    },
  },
  {
    id: 'lumber',
    slug: 'lumber-calculator',
    name: 'Lumber & Board Foot Calculator',
    shortDesc: 'Compute board feet for any lumber quantity and size.',
    tagline: 'Price lumber accurately with board-foot math.',
    category: 'construction',
    iconName: 'Hammer',
    keywords: ['board feet', 'lumber calculator', 'board foot calculator', 'lumber pricing', 'wood volume', 'timber'],
    kind: 'config',
    config: {
      fields: [
        { id: 'pieces', label: 'Number of Pieces', type: 'number', defaultValue: 10, min: 1 },
        { id: 'lengthFt', label: 'Length', type: 'number', defaultValue: 8, min: 1, suffix: 'ft' },
        { id: 'widthIn', label: 'Width', type: 'number', defaultValue: 6, min: 1, suffix: 'in' },
        { id: 'thicknessIn', label: 'Thickness', type: 'number', defaultValue: 1, min: 0.5, suffix: 'in' },
      ],
      results: [
        { label: 'Total Board Feet', formulaCode: 'pieces * (lengthFt * widthIn * thicknessIn / 12)', suffix: 'bd ft', accent: true },
        { label: 'Board Feet per Piece', formulaCode: 'lengthFt * widthIn * thicknessIn / 12', suffix: 'bd ft' },
      ],
      formulaDescription: 'Board Feet = Pieces x Length(ft) x Width(in) x Thickness(in) / 12',
      tips: [
        'One board foot equals 1 foot x 1 foot x 1 inch of lumber.',
        'Lumber is sold by the board foot, not by weight.',
      ],
    },
    content: {
      intro:
        'The Lumber & Board Foot Calculator computes the board feet in any pile of lumber. Because lumber is priced by board foot, this tool turns raw dimensions into the number used on the invoice.',
      howItWorks:
        'Board feet equal length in feet times width in inches times thickness in inches divided by 12. Multiplying by the piece count gives the total for the whole order.',
      example:
        'Ten pieces of 8-foot 6 x 1 lumber total 10 x (8 x 6 x 1 / 12) = 40 board feet.',
      formulas: [
        {
          label: 'Total Board Feet',
          expression: 'Board ft = Pieces × (Length ft × Width in × Thickness in / 12)',
          note: 'One board foot = 1 ft × 1 ft × 1 in.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Total Board Feet',
          explanation:
            'The full order volume in board feet, the number on the lumber invoice.',
        },
        {
          resultLabel: 'Board Feet per Piece',
          explanation:
            'The single-piece volume, useful for comparing lumber options.',
        },
      ],
      workflowLinks: [
        { slug: 'room-area-calculator', step: 'Plan the framing footprint that needs lumber.' },
        { slug: 'room-volume-calculator', step: 'Estimate structural volume for larger builds.' },
      ],
      faqs: [
        { q: 'What is a board foot?', a: 'It is the unit lumber is priced by: one foot long, one foot wide, and one inch thick, or 144 cubic inches of wood.' },
        { q: 'How do I calculate board feet?', a: 'Multiply length in feet by width in inches by thickness in inches and divide by 12. The tool handles multiple pieces automatically.' },
        { q: 'Does dimension lumber match nominal size?', a: 'No. A 2x4 is actually about 1.5 x 3.5 inches. For pricing use the nominal size, but for volume use actual dimensions.' },
      ],
      related: ['room-area-calculator', 'room-volume-calculator', 'paint-calculator'],
    },
    seo: {
      status: 'index',
      reviewStatus: 'reviewed',
      priority: 0.6,
    },
  },
];