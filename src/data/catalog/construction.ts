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
  {
    id: 'tile-order',
    slug: 'tile-calculator',
    name: 'Tile Calculator',
    shortDesc: 'Estimate tile quantities and full boxes needed based on room dimensions, tile size, and waste.',
    tagline: 'Calculate tiles and boxes needed for floors and walls.',
    category: 'construction',
    iconName: 'Grid',
    keywords: ['tile calculator', 'tile box calculator', 'how many tiles do i need', 'flooring tile estimator', 'tile square footage'],
    kind: 'custom',
    componentId: 'TileCalculator',
    content: {
      intro: 'The Tile Calculator estimates the total number of tiles and full purchase boxes needed to cover a room or wall surface. Enter room square footage, individual tile dimensions in inches, a waste factor, and tiles per box to generate an accurate material estimate.',
      howItWorks: 'Tile surface area is converted to square feet (length × width / 144). The order area applies the waste allowance percentage (typically 10% to 15% for cuts and breakage). Dividing the order area by tile coverage and rounding up gives total tiles, which is then divided by tiles per box and rounded up to full boxes.',
      example: 'A 120 sq ft room using 12x12 inch tiles with a 10% waste allowance requires 132 sq ft of coverage. At 10 tiles per box, you need 132 individual tiles, which rounds up to 14 full boxes.',
      formulas: [
        { label: 'Tile Coverage Area', expression: 'Tile Area (sq ft) = (Length in × Width in) / 144' },
        { label: 'Order Area with Waste', expression: 'Order Area = Room Area × (1 + Waste % / 100)' },
        { label: 'Tile and Box Counts', expression: 'Tiles = Ceil(Order Area / Tile Area); Boxes = Ceil(Tiles / Tiles per Box)' },
      ],
      resultExplanations: [
        { resultLabel: 'Boxes to purchase', explanation: 'The minimum number of full manufacturer boxes required to fulfill the tile order including waste allowance.' },
        { resultLabel: 'Tiles required', explanation: 'The individual tile count needed to cover the designated area plus offcuts and breakage.' },
        { resultLabel: 'Tile coverage each', explanation: 'The net square footage covered by one single tile.' },
      ],
      workflowLinks: [
        { slug: 'room-area-calculator', step: 'Measure rectangular floor or wall dimensions before calculating tile.' },
        { slug: 'flooring-calculator', step: 'Compare tile material quantities with vinyl, hardwood, or laminate.' },
      ],
      faqs: [
        { q: 'How much tile waste should I calculate?', a: 'Standard grid layouts typically require 10% waste. Diagonal, herringbone, or complex room perimeters with many door cutouts require 15% to 20% waste.' },
        { q: 'Why do tile estimates round up to full boxes?', a: 'Retailers and distributors sell tile by the sealed box to protect edges from transit breakage and ensure matching dye lots.' },
        { q: 'Can I use this for wall tile and backsplashes?', a: 'Yes. Enter the total square footage of your wall, shower surround, or kitchen backsplash surface.' },
      ],
      related: ['flooring-calculator', 'room-area-calculator', 'area-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'landscape-material',
    slug: 'landscape-material-calculator',
    name: 'Landscape Material Calculator',
    shortDesc: 'Estimate mulch, gravel, or topsoil required in cubic yards and standard bags from area and depth.',
    tagline: 'Calculate bulk and bagged landscape materials with precision.',
    category: 'construction',
    iconName: 'Truck',
    keywords: ['landscape material calculator', 'mulch calculator', 'gravel calculator', 'topsoil calculator', 'cubic yards calculator', 'how many bags of mulch'],
    kind: 'custom',
    componentId: 'LandscapeMaterialCalculator',
    content: {
      intro: 'The Landscape Material Calculator computes bulk volume in cubic yards and the exact number of retail bags needed for mulch, gravel, or topsoil. Enter ground area in square feet, desired application depth in inches, and package bag size.',
      howItWorks: 'Depth in inches is converted to feet by dividing by twelve and multiplied by surface area to get cubic feet. Dividing by 27 converts cubic feet to cubic yards for bulk deliveries. Dividing cubic feet by bag volume (typically 2 cubic feet for mulch or 0.5 cubic feet for gravel/soil) and rounding up gives total retail bags.',
      example: 'A 200 sq ft garden bed mulched to a 3-inch depth requires 50 cubic feet (1.85 cubic yards) of material, which equals 25 standard 2-cubic-foot bags.',
      formulas: [
        { label: 'Volume in Cubic Feet', expression: 'Cubic Feet = Area (sq ft) × (Depth in / 12)' },
        { label: 'Volume in Cubic Yards', expression: 'Cubic Yards = Cubic Feet / 27' },
        { label: 'Bag Count', expression: 'Bags = Ceil(Cubic Feet / Bag Volume cu ft)' },
      ],
      resultExplanations: [
        { resultLabel: 'Volume in Cubic Yards', explanation: 'Total bulk volume required, which is the standard unit for truckload landscape deliveries.' },
        { resultLabel: 'Bags to purchase', explanation: 'Number of sealed retail bags needed if purchasing packaged product rather than bulk delivery.' },
      ],
      workflowLinks: [
        { slug: 'room-area-calculator', step: 'Measure rectangular garden beds, walkways, or borders.' },
        { slug: 'solid-volume-calculator', step: 'Calculate geometric volume for non-rectangular planters.' },
      ],
      faqs: [
        { q: 'How deep should mulch or gravel be applied?', a: 'Wood mulch is typically installed at a depth of 2 to 3 inches for moisture retention. Decorative gravel walkways usually need 2 to 3 inches over compacted base.' },
        { q: 'When is bulk delivery cheaper than bagged material?', a: 'Generally, projects requiring more than 2 cubic yards (about 27 standard 2-cu-ft bags) are significantly cheaper by the truckload from a local supplier.' },
        { q: 'Does mulch or soil settle over time?', a: 'Yes. Organic mulch and loose topsoil settle by 10% to 20% after watering and natural decomposition over the first few weeks.' },
      ],
      related: ['concrete-calculator', 'room-area-calculator', 'solid-volume-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'roofing',
    slug: 'roofing-calculator',
    name: 'Roofing Calculator',
    shortDesc: 'Calculate roof surface area, roofing squares, and bundle counts from ground footprint and pitch.',
    tagline: 'Estimate shingle bundles and squares with roof pitch adjustment.',
    category: 'construction',
    iconName: 'Hammer',
    keywords: ['roofing calculator', 'shingle calculator', 'roofing squares calculator', 'how many bundles of shingles', 'roof pitch calculator'],
    kind: 'custom',
    componentId: 'RoofingCalculator',
    content: {
      intro: 'The Roofing Calculator computes total sloped roof surface area, industry roofing squares (100 sq ft units), and standard shingle bundle counts from a ground building footprint, roof pitch slope, and waste allowance.',
      howItWorks: 'Roof slope pitch (rise in inches per 12 inches of run) calculates a geometric multiplier via the Pythagorean theorem: sqrt(1 + (rise/12)^2). Multiplying ground footprint by this factor yields actual sloped surface area. Factoring in waste (typically 10% to 15%) gives total order area, which is divided by 100 for roofing squares and by bundle coverage (typically 33.3 sq ft, or 3 bundles per square).',
      example: 'A 2,000 sq ft footprint with a 6/12 pitch has a multiplier of 1.118, yielding 2,236 sq ft of roof area. With 10% waste, order coverage is 2,460 sq ft (24.6 squares), which rounds up to 74 shingle bundles.',
      formulas: [
        { label: 'Pitch Multiplier', expression: 'Multiplier = Sqrt(1 + (Rise in / 12)²)' },
        { label: 'Sloped Roof Area', expression: 'Roof Area = Footprint sq ft × Multiplier' },
        { label: 'Roofing Squares and Bundles', expression: 'Squares = Order Area / 100; Bundles = Ceil(Order Area / Bundle Coverage)' },
      ],
      resultExplanations: [
        { resultLabel: 'Roofing squares', explanation: 'One roofing square equals 100 square feet of actual roof surface area.' },
        { resultLabel: 'Bundles to purchase', explanation: 'Total shingle packages required, assuming standard asphalt 3-tab or architectural shingle coverage.' },
        { resultLabel: 'Area with waste', explanation: 'Total ordering square footage including ridge caps, valley cuts, eaves, and starter strips.' },
      ],
      workflowLinks: [
        { slug: 'area-converter', step: 'Convert building dimensions and footprint units.' },
        { slug: 'room-area-calculator', step: 'Plan interior ceiling dimensions under the roof pitch.' },
      ],
      faqs: [
        { q: 'What is a roofing square?', a: 'In the construction and roofing trades, a square is a standardized unit of measure equal to exactly 100 square feet of roof surface.' },
        { q: 'How many bundles of shingles make a square?', a: 'Standard architectural and 3-tab asphalt shingles are packaged with 3 bundles per square (each bundle covering approximately 33.33 sq ft).' },
        { q: 'Why is roof area larger than ground footprint?', a: 'Because roofs are angled, their sloping surface area is always larger than the flat horizontal footprint below. Steeper roof pitches create significantly more surface area.' },
      ],
      related: ['area-converter', 'room-area-calculator', 'flooring-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'roof-pitch',
    slug: 'roof-pitch-calculator',
    name: 'Roof Pitch Calculator',
    shortDesc: 'Convert roof rise and run into pitch, angle in degrees, percentage grade, and slope multiplier.',
    tagline: 'From 6/12 to degrees, grade, and roof area factor.',
    category: 'construction',
    iconName: 'TrendingUp',
    badge: 'Roofing',
    featured: true,
    keywords: [
      'roof pitch calculator',
      'roof slope calculator',
      'pitch to degrees',
      'roof angle calculator',
      'rise over run',
      'roof pitch multiplier',
      '6/12 pitch',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'rise', label: 'Rise', type: 'number', defaultValue: 6, min: 0, suffix: 'in' },
        { id: 'run', label: 'Run', type: 'number', defaultValue: 12, min: 0.01, suffix: 'in' },
      ],
      results: [
        { label: 'Roof pitch (x:12)', formulaCode: '(rise / run) * 12', suffix: ':12', accent: true },
        { label: 'Angle', formulaCode: 'Math.atan(rise / run) * 180 / Math.PI', suffix: '°' },
        { label: 'Percentage grade', formulaCode: '(rise / run) * 100', suffix: '%' },
        { label: 'Slope multiplier', formulaCode: 'Math.sqrt(1 + (rise / run) ** 2)', suffix: '× footprint' },
      ],
      formulaDescription: 'Pitch = rise / run; angle = atan(rise / run); multiplier = √(1 + (rise/run)²)',
      tips: [
        'Pitch is usually written as inches of rise per 12 inches of run, such as 6/12.',
        'The slope multiplier converts a flat footprint into actual sloped roof area.',
        'Roofing manufacturers set minimum slopes for each product; check the installation guide.',
      ],
    },
    content: {
      intro:
        'The Roof Pitch Calculator converts a roof\u2019s rise and run into the four numbers trades actually use: pitch as x:12, angle in degrees, percentage grade, and the slope multiplier that turns a building footprint into roof surface area.',
      howItWorks:
        'Pitch is the ratio of vertical rise to horizontal run, normalised to 12 inches of run. The angle is the arctangent of that ratio. Percentage grade multiplies the ratio by 100. The slope multiplier is the hypotenuse of a unit right triangle, so multiplying the footprint by it gives the sloped area.',
      example:
        'A roof that rises 6 inches over 12 inches has a 6:12 pitch, an angle of about 26.57°, a 50% grade, and a slope multiplier of 1.118. A 2,000 sq ft footprint therefore has about 2,236 sq ft of roof surface.',
      formulas: [
        {
          label: 'Pitch',
          expression: 'Pitch (x:12) = (rise / run) × 12',
        },
        {
          label: 'Angle',
          expression: 'Angle = atan(rise / run) × 180 / π',
        },
        {
          label: 'Slope multiplier',
          expression: 'Multiplier = √(1 + (rise / run)²)',
          note: 'Multiply the flat footprint by this to get sloped roof area.',
        },
      ],
      sources: [
        {
          label: 'International Residential Code (IRC) — roof covering provisions',
          expression: 'Minimum slope depends on the roofing material',
          note: 'The IRC and manufacturer instructions set minimum slopes; this calculator only converts geometry.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Roof pitch (x:12)',
          explanation:
            'The standard trade notation: inches of vertical rise for every 12 inches of horizontal run.',
        },
        {
          resultLabel: 'Slope multiplier',
          explanation:
            'The factor applied to a flat footprint to get true sloped area. It is why a steep roof needs more shingles than its plan area suggests.',
        },
      ],
      workflowLinks: [
        { slug: 'roofing-calculator', step: 'Use the pitch to estimate squares and shingle bundles.' },
        { slug: 'room-area-calculator', step: 'Measure the building footprint first.' },
        { slug: 'triangle-calculator', step: 'Solve the rafter triangle from other known values.' },
      ],
      faqs: [
        {
          q: 'What does a 6/12 roof pitch mean?',
          a: 'It rises 6 inches for every 12 inches of horizontal run. That is a 26.57° angle, a 50% grade, and a slope multiplier of about 1.118.',
        },
        {
          q: 'How do I convert roof pitch to degrees?',
          a: 'Divide the rise by the run and take the arctangent, then convert radians to degrees. 6/12 gives atan(0.5) = 26.57°.',
        },
        {
          q: 'What is a roof pitch multiplier used for?',
          a: 'It converts the flat footprint of a building into the actual sloped area of the roof. Multiply the footprint by 1.118 for a 6/12 roof before ordering shingles or underlayment.',
        },
        {
          q: 'What is the minimum roof pitch for shingles?',
          a: 'It depends on the product. Asphalt shingles commonly require at least 2:12 with a double underlayment, and some products require 4:12. Always follow the manufacturer\u2019s installation instructions and local code.',
        },
      ],
      related: ['roofing-calculator', 'room-area-calculator', 'triangle-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'drywall',
    slug: 'drywall-calculator',
    name: 'Drywall Calculator',
    shortDesc: 'Estimate drywall sheets, joint compound, tape, and screws from wall area and sheet size.',
    tagline: 'Sheets, mud, tape, and screws in one pass.',
    category: 'construction',
    iconName: 'Grid',
    badge: 'Drywall',
    featured: true,
    keywords: [
      'drywall calculator',
      'sheetrock calculator',
      'how many sheets of drywall',
      'drywall estimate',
      'joint compound calculator',
      'drywall screws',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'area', label: 'Wall and ceiling area', type: 'number', defaultValue: 1000, min: 0, suffix: 'sq ft' },
        { id: 'sheetWidth', label: 'Sheet width', type: 'number', defaultValue: 4, min: 1, suffix: 'ft' },
        { id: 'sheetHeight', label: 'Sheet length', type: 'number', defaultValue: 8, min: 1, suffix: 'ft' },
        { id: 'waste', label: 'Waste allowance', type: 'number', defaultValue: 10, min: 0, max: 30, suffix: '%' },
      ],
      results: [
        { label: 'Sheets needed', formulaCode: 'Math.ceil((area * (1 + waste / 100)) / (sheetWidth * sheetHeight))', suffix: 'sheets', accent: true },
        { label: 'Joint compound (estimate)', formulaCode: '(area * (1 + waste / 100)) / 250', suffix: 'gal' },
        { label: 'Joint tape (estimate)', formulaCode: 'area * 1.1', suffix: 'ft' },
        { label: 'Screws (estimate)', formulaCode: 'area * 1.05', suffix: 'screws' },
      ],
      formulaDescription: 'Sheets = ceil(Area × (1 + waste) / sheet area)',
      tips: [
        'Add 10% waste for a simple room and 15–20% for rooms with many openings or angles.',
        'Joint compound and screw counts are planning estimates; lid counts, corner bead, and ceiling height change them.',
      ],
    },
    content: {
      intro:
        'The Drywall Calculator estimates how many sheets of drywall a job needs, plus planning quantities for joint compound, tape, and screws. It works from total wall and ceiling area, sheet size, and a waste allowance.',
      howItWorks:
        'Total area is increased by the waste percentage, then divided by the area of one sheet and rounded up. Compound and tape estimates use typical coverage rates for a three-coat finish; screws assume roughly one per square foot, which suits studs at 16 inches on centre.',
      example:
        'For 1,000 sq ft of wall and ceiling with 4 × 8 ft sheets and 10% waste, the order area is 1,100 sq ft. That needs 35 sheets, about 4.4 gallons of joint compound, 1,100 ft of tape, and roughly 1,050 screws.',
      formulas: [
        {
          label: 'Sheet count',
          expression: 'Sheets = ceil(Area × (1 + waste/100) / (sheet width × sheet length))',
        },
        {
          label: 'Joint compound',
          expression: 'Compound ≈ Order area / 250 sq ft per gallon',
          note: 'A planning estimate for a standard three-coat finish.',
        },
        {
          label: 'Screws',
          expression: 'Screws ≈ Area × 1.05',
          note: 'Assumes framing at 16 in on centre and screws at 12 in along each stud.',
        },
      ],
      sources: [
        {
          label: 'ASTM C840 — Standard Specification for Application and Finishing of Gypsum Board',
          expression: 'Fastener spacing and finishing levels',
          note: 'C840 defines the application and finish standards this estimate approximates.',
        },
        {
          label: 'Gypsum Association GA-216 — Application and Finishing of Gypsum Panel Products',
          expression: 'Screw spacing and joint treatment',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Sheets needed',
          explanation:
            'Full sheets to buy after the waste allowance and rounding up. Retailers sell by the sheet, so a fractional result is never useful.',
        },
        {
          resultLabel: 'Joint compound',
          explanation:
            'A rough gallons figure for taping and finishing. Buy one extra container rather than running out mid-coat.',
        },
      ],
      workflowLinks: [
        { slug: 'room-area-calculator', step: 'Measure wall and ceiling areas first.' },
        { slug: 'paint-calculator', step: 'Plan primer and paint over the new board.' },
        { slug: 'lumber-calculator', step: 'Price the studs behind the drywall.' },
      ],
      faqs: [
        {
          q: 'How many sheets of drywall do I need?',
          a: 'Divide the total wall and ceiling area by the sheet area (32 sq ft for 4 × 8), add 10% waste, and round up. For 1,000 sq ft that is about 35 sheets.',
        },
        {
          q: 'Should I use 4 × 8 or 4 × 12 sheets?',
          a: 'Longer sheets mean fewer joints and a faster finish, but they are heavier and harder to handle alone. Use 4 × 12 where two people can manage them; use 4 × 8 for solo work and tight spaces.',
        },
        {
          q: 'How much joint compound do I need?',
          a: 'Plan on roughly 1 gallon per 250 sq ft of board for a three-coat finish. More elaborate corners and arches use more; a level 5 finish uses more again.',
        },
        {
          q: 'Do I need to add waste for drywall?',
          a: 'Yes. Cuts around doors, windows, outlets, and angled ceilings create offcuts. Ten percent is a sensible default; complex rooms often need 15–20%.',
        },
      ],
      related: ['room-area-calculator', 'paint-calculator', 'lumber-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'siding',
    slug: 'siding-calculator',
    name: 'Siding Calculator',
    shortDesc: 'Estimate siding pieces, squares, and boxes from exterior wall area, coverage, and waste.',
    tagline: 'Order siding by the square, not by guesswork.',
    category: 'construction',
    iconName: 'Home',
    badge: 'Exterior',
    keywords: [
      'siding calculator',
      'how much siding do i need',
      'siding squares calculator',
      'vinyl siding calculator',
      'lap siding calculator',
      'exterior cladding estimate',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'area', label: 'Exterior wall area', type: 'number', defaultValue: 1200, min: 0, suffix: 'sq ft' },
        { id: 'coverage', label: 'Coverage per piece', type: 'number', defaultValue: 8, min: 0.1, suffix: 'sq ft' },
        { id: 'piecesPerBox', label: 'Pieces per box', type: 'number', defaultValue: 20, min: 1, suffix: 'pieces' },
        { id: 'waste', label: 'Waste allowance', type: 'number', defaultValue: 10, min: 0, max: 30, suffix: '%' },
      ],
      results: [
        { label: 'Siding pieces', formulaCode: 'Math.ceil((area * (1 + waste / 100)) / coverage)', suffix: 'pieces', accent: true },
        { label: 'Squares', formulaCode: '(area * (1 + waste / 100)) / 100', suffix: 'squares' },
        { label: 'Boxes', formulaCode: 'Math.ceil(Math.ceil((area * (1 + waste / 100)) / coverage) / piecesPerBox)', suffix: 'boxes' },
      ],
      formulaDescription: 'Pieces = ceil(Area × (1 + waste) / coverage per piece); 1 square = 100 sq ft',
      tips: [
        'Subtract large window and door openings before entering the wall area.',
        'Siding is often sold by the square (100 sq ft); boxes vary by product, so check the label.',
      ],
    },
    content: {
      intro:
        'The Siding Calculator estimates how many siding pieces, squares, and boxes an exterior job needs. It accounts for coverage per piece and a waste allowance for cuts, corners, and mistakes.',
      howItWorks:
        'Exterior wall area is increased by the waste percentage, then divided by the coverage of one piece and rounded up. One square is 100 square feet of wall area. Dividing the piece count by the number of pieces in a box gives the number of boxes to buy.',
      example:
        'For 1,200 sq ft of wall with 8 sq ft coverage per piece, 20 pieces per box, and 10% waste, the order area is 1,320 sq ft. That needs 165 pieces, 13.2 squares, and 9 boxes.',
      formulas: [
        {
          label: 'Pieces',
          expression: 'Pieces = ceil(Area × (1 + waste/100) / coverage per piece)',
        },
        {
          label: 'Squares',
          expression: 'Squares = Order area / 100',
        },
        {
          label: 'Boxes',
          expression: 'Boxes = ceil(Pieces / pieces per box)',
        },
      ],
      sources: [
        {
          label: 'International Residential Code (IRC) — exterior wall covering',
          expression: 'Weather-resistant enclosure and clearance requirements',
          note: 'The IRC sets performance and clearance rules; coverage per piece comes from the manufacturer.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Siding pieces',
          explanation:
            'Individual lengths or panels needed after waste. Use this when buying loose pieces rather than sealed boxes.',
        },
        {
          resultLabel: 'Squares',
          explanation:
            'Order area in 100 sq ft units, the unit many siding suppliers quote in.',
        },
        {
          resultLabel: 'Boxes',
          explanation:
            'Sealed boxes to buy, rounded up so you are not short of a matching dye lot.',
        },
      ],
      workflowLinks: [
        { slug: 'room-area-calculator', step: 'Measure each wall elevation and subtract openings.' },
        { slug: 'paint-calculator', step: 'Estimate paint or stain for the new siding.' },
        { slug: 'roofing-calculator', step: 'Plan the roof and walls as one exterior project.' },
      ],
      faqs: [
        {
          q: 'How much siding do I need for a 1,200 sq ft wall?',
          a: 'With 10% waste and 8 sq ft coverage per piece, you need 165 pieces, or 13.2 squares. That is 9 boxes if each box holds 20 pieces.',
        },
        {
          q: 'What is a siding square?',
          a: 'One square is 100 square feet of wall area. Suppliers use it because coverage per piece varies by profile and exposure.',
        },
        {
          q: 'Should I subtract windows and doors?',
          a: 'Yes for large openings. Subtract the opening area from the wall area, but keep small openings in the total because the offcuts around them are rarely reusable.',
        },
        {
          q: 'How much waste should I allow for siding?',
          a: 'Ten percent suits a simple rectangular elevation. Add 15% for gables, many corners, or diagonal installations, where offcuts are larger.',
        },
      ],
      related: ['paint-calculator', 'roofing-calculator', 'room-area-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'gravel',
    slug: 'gravel-calculator',
    name: 'Gravel Calculator',
    shortDesc: 'Calculate gravel volume in cubic yards, weight in tons, and the number of bags needed.',
    tagline: 'Cubic yards, tons, and bags for any drive or bed.',
    category: 'construction',
    iconName: 'Truck',
    badge: 'Landscaping',
    featured: true,
    keywords: [
      'gravel calculator',
      'how much gravel do i need',
      'gravel tonnage calculator',
      'cubic yards of gravel',
      'pea gravel calculator',
      'crushed stone calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'area', label: 'Area to cover', type: 'number', defaultValue: 300, min: 0, suffix: 'sq ft' },
        { id: 'depth', label: 'Depth', type: 'number', defaultValue: 3, min: 0.1, suffix: 'in' },
        { id: 'density', label: 'Bulk density', type: 'number', defaultValue: 1.4, min: 0.5, suffix: 'tons/cu yd' },
        { id: 'bagSize', label: 'Bag volume', type: 'number', defaultValue: 0.5, min: 0.1, suffix: 'cu ft' },
      ],
      results: [
        { label: 'Volume', formulaCode: 'area * (depth / 12) / 27', suffix: 'cu yd', accent: true },
        { label: 'Weight', formulaCode: 'area * (depth / 12) / 27 * density', suffix: 'tons' },
        { label: 'Bags needed', formulaCode: 'Math.ceil((area * (depth / 12)) / bagSize)', suffix: 'bags' },
        { label: 'Cubic feet', formulaCode: 'area * (depth / 12)', suffix: 'cu ft' },
      ],
      formulaDescription: 'Volume (cu yd) = Area × (Depth in / 12) / 27; Weight = Volume × density',
      tips: [
        'Crushed stone is typically 1.35–1.5 tons per cubic yard; pea gravel is similar.',
        'Order 5–10% extra because gravel settles and spreads unevenly.',
      ],
    },
    content: {
      intro:
        'The Gravel Calculator converts a coverage area and depth into cubic yards, tons, and bags. It handles driveways, paths, drainage beds, and decorative borders, where the supplier may quote in any of those three units.',
      howItWorks:
        'Depth in inches is converted to feet and multiplied by area for cubic feet. Dividing by 27 gives cubic yards. Multiplying volume by bulk density gives weight in tons, and dividing cubic feet by bag volume gives the bag count.',
      example:
        'A 300 sq ft path at 3 inches deep needs 75 cubic feet, or 2.78 cubic yards. At 1.4 tons per cubic yard that is 3.89 tons, or 150 bags at 0.5 cubic feet each.',
      formulas: [
        {
          label: 'Volume',
          expression: 'Cubic yards = Area (sq ft) × (Depth in / 12) / 27',
        },
        {
          label: 'Weight',
          expression: 'Tons = Cubic yards × bulk density (tons/cu yd)',
        },
        {
          label: 'Bags',
          expression: 'Bags = ceil(Cubic feet / bag volume)',
        },
      ],
      sources: [
        {
          label: 'American Association of State Highway and Transportation Officials (AASHTO) — aggregate specifications',
          expression: 'Aggregate gradation and compacted density',
          note: 'Bulk density varies with gradation, moisture, and compaction; the supplier\u2019s figure is authoritative.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Volume',
          explanation:
            'Loose volume in cubic yards, the unit bulk suppliers use for delivery.',
        },
        {
          resultLabel: 'Weight',
          explanation:
            'Tonnage at your chosen bulk density. Use the supplier\u2019s density if they quote one, because moisture and stone size change it.',
        },
        {
          resultLabel: 'Bags needed',
          explanation:
            'Sealed bags to buy when a bulk delivery is impractical. Bag counts are rounded up.',
        },
      ],
      workflowLinks: [
        { slug: 'landscape-material-calculator', step: 'Compare gravel with mulch or topsoil for the same bed.' },
        { slug: 'concrete-calculator', step: 'Plan a concrete edge or pad beside the gravel.' },
        { slug: 'room-area-calculator', step: 'Measure a rectangular area before ordering.' },
      ],
      faqs: [
        {
          q: 'How many tons of gravel are in a cubic yard?',
          a: 'Roughly 1.35–1.5 tons for crushed stone, depending on the gradation and moisture. This calculator defaults to 1.4 tons per cubic yard; ask your supplier for the exact figure.',
        },
        {
          q: 'How deep should gravel be?',
          a: 'A decorative path needs about 2 inches, a footpath 3–4 inches, and a driveway 6–12 inches of compacted base depending on traffic and subsoil. Drainage beds are sized by water volume, not just area.',
        },
        {
          q: 'Should I buy bags or bulk?',
          a: 'Bulk is usually cheaper above roughly 2 cubic yards (about 54 bags at 1 cu ft). Bags make sense for small repairs and for carrying in a car.',
        },
        {
          q: 'Does the calculator account for compaction?',
          a: 'No. It returns loose volume. Compacted base courses and gravel that will be vibrated need 10–20% more material, so order at the upper end of your waste allowance.',
        },
      ],
      related: ['landscape-material-calculator', 'topsoil-calculator', 'concrete-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'topsoil',
    slug: 'topsoil-calculator',
    name: 'Topsoil Calculator',
    shortDesc: 'Estimate topsoil in cubic yards, tons, and bags for lawns, beds, and raised areas.',
    tagline: 'Fill beds and level lawns without over-ordering.',
    category: 'construction',
    iconName: 'Truck',
    badge: 'Landscaping',
    keywords: [
      'topsoil calculator',
      'how much topsoil do i need',
      'topsoil cubic yards',
      'topsoil tons calculator',
      'soil calculator',
      'raised bed soil calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'area', label: 'Area to cover', type: 'number', defaultValue: 300, min: 0, suffix: 'sq ft' },
        { id: 'depth', label: 'Depth', type: 'number', defaultValue: 6, min: 0.1, suffix: 'in' },
        { id: 'density', label: 'Bulk density', type: 'number', defaultValue: 1.1, min: 0.5, suffix: 'tons/cu yd' },
        { id: 'bagSize', label: 'Bag volume', type: 'number', defaultValue: 0.75, min: 0.1, suffix: 'cu ft' },
      ],
      results: [
        { label: 'Volume', formulaCode: 'area * (depth / 12) / 27', suffix: 'cu yd', accent: true },
        { label: 'Weight', formulaCode: 'area * (depth / 12) / 27 * density', suffix: 'tons' },
        { label: 'Bags needed', formulaCode: 'Math.ceil((area * (depth / 12)) / bagSize)', suffix: 'bags' },
        { label: 'Cubic feet', formulaCode: 'area * (depth / 12)', suffix: 'cu ft' },
      ],
      formulaDescription: 'Volume (cu yd) = Area × (Depth in / 12) / 27; Weight = Volume × density',
      tips: [
        'Screened topsoil is typically 1.0–1.3 tons per cubic yard; moisture raises the weight.',
        'For raised beds, mix topsoil with compost rather than filling with soil alone.',
      ],
    },
    content: {
      intro:
        'The Topsoil Calculator estimates how much soil a lawn, bed, or raised area needs in cubic yards, tons, and bags. It uses the same volume arithmetic as gravel or mulch, with a density suited to moist soil.',
      howItWorks:
        'Area multiplied by depth in feet gives cubic feet. Dividing by 27 converts to cubic yards, the unit used for bulk soil delivery. Multiplying by bulk density gives tons, and dividing cubic feet by bag volume gives the bag count.',
      example:
        'A 300 sq ft bed at 6 inches deep needs 150 cubic feet, or 5.56 cubic yards. At 1.1 tons per cubic yard that is 6.11 tons, or 200 bags at 0.75 cubic feet each.',
      formulas: [
        {
          label: 'Volume',
          expression: 'Cubic yards = Area (sq ft) × (Depth in / 12) / 27',
        },
        {
          label: 'Weight',
          expression: 'Tons = Cubic yards × bulk density',
        },
        {
          label: 'Bags',
          expression: 'Bags = ceil(Cubic feet / bag volume)',
        },
      ],
      sources: [
        {
          label: 'USDA Natural Resources Conservation Service — soil bulk density',
          expression: 'Bulk density varies with texture, organic matter, and moisture',
          note: 'NRCS soil surveys give local bulk density; use the supplier figure for delivered topsoil.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Volume',
          explanation:
            'Loose soil volume in cubic yards. Bulk deliveries are usually quoted this way.',
        },
        {
          resultLabel: 'Weight',
          explanation:
            'Tonnage at the density you entered. Wet soil is heavier, so leave margin if the delivery is priced by weight.',
        },
      ],
      workflowLinks: [
        { slug: 'gravel-calculator', step: 'Pair soil with a gravel drainage layer.' },
        { slug: 'mulch-calculator', step: 'Top-dress the bed after spreading soil.' },
        { slug: 'landscape-material-calculator', step: 'Compare bulk quantities across materials.' },
      ],
      faqs: [
        {
          q: 'How much topsoil do I need for a lawn?',
          a: 'A thin overseeding layer is about 0.25–0.5 inches; levelling a uneven lawn usually needs 1–2 inches. Multiply area by depth in feet and divide by 27 for cubic yards.',
        },
        {
          q: 'How many tons is a cubic yard of topsoil?',
          a: 'Usually about 1.0–1.3 tons, depending on moisture and clay content. This calculator defaults to 1.1 tons per cubic yard.',
        },
        {
          q: 'Is bagged topsoil the same as bulk?',
          a: 'Bagged products are often screened and blended, and sold by volume rather than weight. Bulk is cheaper for large areas, but quality varies, so inspect it before it is tipped.',
        },
        {
          q: 'How much does topsoil settle?',
          a: 'Loose fill settles by roughly 10–20% after watering and rainfall. Order at the upper end of the estimate if the finished level matters.',
        },
      ],
      related: ['mulch-calculator', 'gravel-calculator', 'landscape-material-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'mulch',
    slug: 'mulch-calculator',
    name: 'Mulch Calculator',
    shortDesc: 'Calculate mulch in cubic yards, cubic feet, bags, and approximate weight.',
    tagline: 'Cover beds at the right depth, first time.',
    category: 'construction',
    iconName: 'Truck',
    badge: 'Landscaping',
    featured: true,
    keywords: [
      'mulch calculator',
      'how much mulch do i need',
      'mulch cubic yards',
      'bags of mulch calculator',
      'wood chip calculator',
      'garden bed mulch',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'area', label: 'Bed area', type: 'number', defaultValue: 300, min: 0, suffix: 'sq ft' },
        { id: 'depth', label: 'Depth', type: 'number', defaultValue: 3, min: 0.1, suffix: 'in' },
        { id: 'bagSize', label: 'Bag volume', type: 'number', defaultValue: 2, min: 0.1, suffix: 'cu ft' },
        { id: 'density', label: 'Bulk density', type: 'number', defaultValue: 0.4, min: 0.1, suffix: 'tons/cu yd' },
      ],
      results: [
        { label: 'Volume', formulaCode: 'area * (depth / 12) / 27', suffix: 'cu yd', accent: true },
        { label: 'Cubic feet', formulaCode: 'area * (depth / 12)', suffix: 'cu ft' },
        { label: 'Bags needed', formulaCode: 'Math.ceil((area * (depth / 12)) / bagSize)', suffix: 'bags' },
        { label: 'Approximate weight', formulaCode: 'area * (depth / 12) / 27 * density', suffix: 'tons' },
      ],
      formulaDescription: 'Volume (cu yd) = Area × (Depth in / 12) / 27; Bags = ceil(Cubic feet / bag volume)',
      tips: [
        'Keep mulch 2–3 inches deep. More than 4 inches can smother roots and hold too much moisture.',
        'Keep mulch a few inches away from trunks and stems to avoid rot and pests.',
      ],
    },
    content: {
      intro:
        'The Mulch Calculator estimates how much mulch a bed needs in cubic yards, cubic feet, and bags. It uses the standard 2–3 inch application depth that suppresses weeds and retains moisture without smothering roots.',
      howItWorks:
        'Area times depth in feet gives cubic feet. Dividing by 27 gives cubic yards for bulk delivery. Dividing cubic feet by bag volume gives the number of sealed bags, rounded up. Weight is approximate because mulch density depends on wood type and moisture.',
      example:
        'A 300 sq ft bed at 3 inches deep needs 75 cubic feet, or 2.78 cubic yards. That is 38 bags at 2 cubic feet each, and roughly 1.11 tons at 0.4 tons per cubic yard.',
      formulas: [
        {
          label: 'Volume',
          expression: 'Cubic yards = Area × (Depth in / 12) / 27',
        },
        {
          label: 'Bags',
          expression: 'Bags = ceil(Cubic feet / bag volume)',
        },
        {
          label: 'Weight',
          expression: 'Tons = Cubic yards × bulk density',
        },
      ],
      sources: [
        {
          label: 'USDA Natural Resources Conservation Service — mulching',
          expression: 'Apply 2–3 inches around plants',
          note: 'NRCS extension guidance recommends a 2–3 inch layer and keeping mulch clear of stems.',
        },
        {
          label: 'University extension services — landscape mulch',
          expression: 'Excess depth reduces oxygen to roots',
          note: 'Extension publications warn against mulch volcanoes and layers deeper than 3–4 inches.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Volume',
          explanation:
            'Loose mulch volume in cubic yards, the unit bulk suppliers use.',
        },
        {
          resultLabel: 'Bags needed',
          explanation:
            'Sealed bags to buy, rounded up. A standard bag is 2 cubic feet in the US and 50 litres in metric markets.',
        },
      ],
      workflowLinks: [
        { slug: 'topsoil-calculator', step: 'Amend the soil before mulching the surface.' },
        { slug: 'gravel-calculator', step: 'Compare an inorganic mulch or drainage layer.' },
        { slug: 'landscape-material-calculator', step: 'Estimate several materials for one project.' },
      ],
      faqs: [
        {
          q: 'How deep should mulch be?',
          a: 'Two to three inches is standard for weed suppression and moisture retention. More than four inches can reduce oxygen at the roots and encourage rot around trunks.',
        },
        {
          q: 'How many bags of mulch are in a cubic yard?',
          a: 'At 2 cubic feet per bag, 13.5 bags make one cubic yard. Suppliers usually round to 13 or 14 bags for planning.',
        },
        {
          q: 'Should I remove old mulch first?',
          a: 'Not every year. Rake it to break the crust, then top up to the target depth. If the layer is already deeper than 4 inches, remove some before adding more.',
        },
        {
          q: 'Does mulch volume shrink?',
          a: 'Yes. Organic mulch decomposes and settles, typically losing 10–20% of its volume over a season. Order slightly extra if you want to maintain the full depth.',
        },
      ],
      related: ['topsoil-calculator', 'gravel-calculator', 'landscape-material-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'fence',
    slug: 'fence-calculator',
    name: 'Fence Calculator',
    shortDesc: 'Estimate posts, sections, rails, pickets, and concrete bags for a run of fence.',
    tagline: 'Posts, rails, pickets, and concrete in one list.',
    category: 'construction',
    iconName: 'Ruler',
    badge: 'Exterior',
    featured: true,
    keywords: [
      'fence calculator',
      'how many fence posts',
      'fence post spacing',
      'picket calculator',
      'fence material calculator',
      'fence concrete calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'length', label: 'Fence run', type: 'number', defaultValue: 100, min: 0, suffix: 'ft' },
        { id: 'spacing', label: 'Post spacing', type: 'number', defaultValue: 8, min: 1, suffix: 'ft' },
        { id: 'rails', label: 'Rails per section', type: 'number', defaultValue: 2, min: 1, max: 4 },
        { id: 'picketWidth', label: 'Picket width', type: 'number', defaultValue: 5.5, min: 0.5, suffix: 'in' },
        { id: 'picketGap', label: 'Gap between pickets', type: 'number', defaultValue: 0.125, min: 0, suffix: 'in' },
        { id: 'concretePerPost', label: 'Concrete bags per post', type: 'number', defaultValue: 2, min: 0, suffix: 'bags' },
      ],
      results: [
        { label: 'Posts', formulaCode: 'Math.ceil(length / spacing) + 1', suffix: 'posts', accent: true },
        { label: 'Sections', formulaCode: 'Math.ceil(length / spacing)', suffix: 'sections' },
        { label: 'Rails', formulaCode: 'Math.ceil(length / spacing) * rails', suffix: 'rails' },
        { label: 'Pickets', formulaCode: 'Math.ceil((length * 12) / (picketWidth + picketGap))', suffix: 'pickets' },
        { label: 'Concrete bags', formulaCode: '(Math.ceil(length / spacing) + 1) * concretePerPost', suffix: 'bags' },
      ],
      formulaDescription: 'Posts = ceil(run / spacing) + 1; pickets = ceil(run in / (width + gap))',
      tips: [
        'Posts are needed at both ends, so the count is one more than the number of sections.',
        'Local code and frost depth determine post footing size; two 50 lb bags per post is a common starting point.',
      ],
    },
    content: {
      intro:
        'The Fence Calculator estimates the main materials for a straight run: posts, sections, rails, pickets, and concrete bags. It works for privacy fences, picket fences, and garden screens where spacing and picket width are known.',
      howItWorks:
        'Divide the run by the post spacing and round up to get sections, then add one for the closing post at the far end. Rails multiply sections by rails per section. Pickets divide the run in inches by the combined picket width and gap, rounded up. Concrete bags multiply the post count by bags per post.',
      example:
        'A 100 ft run with posts every 8 ft has 13 sections and 14 posts. With two rails per section that is 26 rails. Using 5.5 inch pickets and a 1/8 inch gap needs 214 pickets, and 28 concrete bags at two per post.',
      formulas: [
        {
          label: 'Posts',
          expression: 'Posts = ceil(run / post spacing) + 1',
        },
        {
          label: 'Rails',
          expression: 'Rails = sections × rails per section',
        },
        {
          label: 'Pickets',
          expression: 'Pickets = ceil((run × 12) / (picket width + gap))',
        },
      ],
      sources: [
        {
          label: 'International Residential Code (IRC) R403 — footings',
          expression: 'Footings must extend below the frost line where applicable',
          note: 'Fence height, setback, and footing rules are usually local; check before digging.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Posts',
          explanation:
            'Including both end posts. Gate posts are extra and usually need deeper footings.',
        },
        {
          resultLabel: 'Pickets',
          explanation:
            'The picket count for a run at the chosen width and gap. It does not include gate framing or spare pickets for damage.',
        },
        {
          resultLabel: 'Concrete bags',
          explanation:
            'A planning quantity based on your bags-per-post figure. A 50 lb bag sets roughly 0.375 cubic feet, so check the hole volume.',
        },
      ],
      workflowLinks: [
        { slug: 'deck-calculator', step: 'Plan the deck that meets the fence line.' },
        { slug: 'lumber-calculator', step: 'Price the posts, rails, and pickets by board foot.' },
        { slug: 'concrete-calculator', step: 'Estimate concrete for post footings.' },
      ],
      faqs: [
        {
          q: 'How far apart should fence posts be?',
          a: 'Eight feet is the most common spacing for wood and vinyl fencing. Six feet is stronger in windy areas or with heavy panels; always follow the manufacturer\u2019s span limit.',
        },
        {
          q: 'How many posts do I need for 100 feet of fence?',
          a: 'At 8 ft spacing, divide 100 by 8 to get 12.5 sections, round up to 13, then add one end post: 14 posts in total.',
        },
        {
          q: 'How much concrete per fence post?',
          a: 'A common rule is one to two 50 lb bags per post, depending on hole size and soil. A 10 inch hole 30 inches deep needs about 1.4 cubic feet, or roughly four bags.',
        },
        {
          q: 'Does this calculator include a gate?',
          a: 'No. A gate needs its own posts, usually larger and deeper, plus hinges, latch, and framing. Add those separately to the material list.',
        },
      ],
      related: ['deck-calculator', 'lumber-calculator', 'concrete-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'deck',
    slug: 'deck-calculator',
    name: 'Deck Calculator',
    shortDesc: 'Estimate decking boards, linear feet, joists, and screws from deck size and board dimensions.',
    tagline: 'Boards, joists, and fasteners for a new deck.',
    category: 'construction',
    iconName: 'Hammer',
    badge: 'Exterior',
    keywords: [
      'deck calculator',
      'deck board calculator',
      'how many deck boards',
      'deck joist calculator',
      'deck material estimator',
      'decking calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'length', label: 'Deck length', type: 'number', defaultValue: 16, min: 0, suffix: 'ft' },
        { id: 'width', label: 'Deck width', type: 'number', defaultValue: 12, min: 0, suffix: 'ft' },
        { id: 'boardWidth', label: 'Board width', type: 'number', defaultValue: 5.5, min: 1, suffix: 'in' },
        { id: 'gap', label: 'Gap between boards', type: 'number', defaultValue: 0.125, min: 0, suffix: 'in' },
        { id: 'joistSpacing', label: 'Joist spacing', type: 'number', defaultValue: 16, min: 8, suffix: 'in' },
        { id: 'waste', label: 'Board waste', type: 'number', defaultValue: 10, min: 0, max: 30, suffix: '%' },
      ],
      results: [
        { label: 'Deck area', formulaCode: 'length * width', suffix: 'sq ft', accent: true },
        { label: 'Deck boards', formulaCode: 'Math.ceil((width * 12 / (boardWidth + gap)) * (1 + waste / 100))', suffix: 'boards' },
        { label: 'Board linear feet', formulaCode: 'Math.ceil((width * 12 / (boardWidth + gap)) * (1 + waste / 100)) * length', suffix: 'lin ft' },
        { label: 'Joists', formulaCode: 'Math.ceil((length * 12) / joistSpacing) + 1', suffix: 'joists' },
        { label: 'Joist linear feet', formulaCode: '(Math.ceil((length * 12) / joistSpacing) + 1) * width', suffix: 'lin ft' },
        { label: 'Screws (estimate)', formulaCode: 'length * width * 2.5', suffix: 'screws' },
      ],
      formulaDescription: 'Boards = ceil(deck width in / (board width + gap) × (1 + waste)); Joists = ceil(length in / spacing) + 1',
      tips: [
        'Boards are assumed to run the length of the deck; if they run the other way, swap length and width.',
        'Joist spacing depends on board type and span; composite boards often require 12 inches on centre.',
      ],
    },
    content: {
      intro:
        'The Deck Calculator estimates decking boards, board linear feet, joists, joist linear feet, and screws from the deck size, board dimensions, and joist spacing. It gives a shopping list rather than a single area figure.',
      howItWorks:
        'The number of board rows is the deck width in inches divided by the board width plus the gap. That is scaled by the waste allowance and rounded up. Joists run the other way: the deck length in inches divided by joist spacing, plus one for the end joist. Screws use a typical 2.5 per square foot.',
      example:
        'A 16 × 12 ft deck is 192 sq ft. With 5.5 inch boards, a 1/8 inch gap, and 10% waste, it needs 29 boards and 464 linear feet. Joists at 16 inches on centre need 13 pieces and 156 linear feet; screws come to about 480.',
      formulas: [
        {
          label: 'Board rows',
          expression: 'Boards = ceil((deck width in / (board width + gap)) × (1 + waste/100))',
        },
        {
          label: 'Joists',
          expression: 'Joists = ceil((deck length in / joist spacing)) + 1',
        },
        {
          label: 'Screws',
          expression: 'Screws ≈ Deck area × 2.5',
          note: 'A planning estimate for two screws per board per joist crossing.',
        },
      ],
      sources: [
        {
          label: 'International Residential Code (IRC) R507 — exterior decks',
          expression: 'Joist spans, ledger attachment, and guard requirements',
          note: 'The IRC sets structural limits; this tool only estimates quantities.',
        },
        {
          label: 'American Wood Council — Prescriptive Residential Wood Deck Construction Guide',
          expression: 'Joist spacing and fastener schedules',
          note: 'The guide gives prescriptive spans for common lumber sizes and deck loads.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Deck boards',
          explanation:
            'Board count assuming boards run the long direction. Add extra if you plan a picture-frame border or diagonal layout.',
        },
        {
          resultLabel: 'Joists',
          explanation:
            'Joist count including the rim joist at the far end. Ledger attachment and post spacing still need structural design.',
        },
        {
          resultLabel: 'Screws',
          explanation:
            'An approximate fastener count. Hidden fastener systems use a different quantity per square foot.',
        },
      ],
      workflowLinks: [
        { slug: 'lumber-calculator', step: 'Price the framing lumber by board foot.' },
        { slug: 'concrete-calculator', step: 'Estimate concrete for deck footings.' },
        { slug: 'fence-calculator', step: 'Plan a matching fence or railing run.' },
      ],
      faqs: [
        {
          q: 'How many deck boards do I need?',
          a: 'Divide the deck width in inches by the board width plus gap, then add 10% waste and round up. A 12 ft wide deck with 5.5 inch boards and a 1/8 inch gap needs about 29 boards.',
        },
        {
          q: 'What joist spacing should I use?',
          a: 'Sixteen inches on centre is common for wood decking; composite boards often require 12 inches. The span also depends on joist size, species, and load, so check the span table or a designer.',
        },
        {
          q: 'Should deck boards run parallel to the house?',
          a: 'Usually parallel to the house is the default because it looks calmer and is simpler to lay. Perpendicular or diagonal layouts change the board count and waste, so recalculate with the dimensions swapped.',
        },
        {
          q: 'How many screws per square foot of decking?',
          a: 'About 2.5 screws per square foot for a standard two-screw fixing at each joist. Hidden clips use roughly one clip per board per joist plus screws.',
        },
      ],
      related: ['lumber-calculator', 'fence-calculator', 'concrete-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'stair',
    slug: 'stair-calculator',
    name: 'Stair Calculator',
    shortDesc: 'Calculate risers, treads, total run, and stringer length from total rise and target riser height.',
    tagline: 'Even risers and a stringer length that fits.',
    category: 'construction',
    iconName: 'Ruler',
    badge: 'Framing',
    featured: true,
    keywords: [
      'stair calculator',
      'stair stringer calculator',
      'riser and tread calculator',
      'how many stairs',
      'stair rise run',
      'deck stair calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'totalRise', label: 'Total rise', type: 'number', defaultValue: 108, min: 1, suffix: 'in' },
        { id: 'targetRiser', label: 'Target riser height', type: 'number', defaultValue: 7.5, min: 4, max: 7.75, suffix: 'in' },
        { id: 'treadDepth', label: 'Tread depth', type: 'number', defaultValue: 10, min: 8, suffix: 'in' },
        { id: 'width', label: 'Stair width', type: 'number', defaultValue: 36, min: 24, suffix: 'in' },
      ],
      results: [
        { label: 'Number of risers', formulaCode: 'Math.round(totalRise / targetRiser)', suffix: 'risers', accent: true },
        {
          label: 'Actual riser height',
          formulaCode: 'totalRise / Math.round(totalRise / targetRiser)',
          suffix: 'in',
        },
        { label: 'Number of treads', formulaCode: 'Math.round(totalRise / targetRiser) - 1', suffix: 'treads' },
        {
          label: 'Total run',
          formulaCode: '(Math.round(totalRise / targetRiser) - 1) * treadDepth',
          suffix: 'in',
        },
        {
          label: 'Stringer length',
          formulaCode:
            'Math.sqrt(totalRise ** 2 + ((Math.round(totalRise / targetRiser) - 1) * treadDepth) ** 2)',
          suffix: 'in',
        },
        { label: 'Stair width', formulaCode: 'width', suffix: 'in' },
      ],
      formulaDescription: 'Risers = round(total rise / target riser); Treads = risers − 1; Stringer = √(rise² + run²)',
      tips: [
        'Every riser must be the same height within a few millimetres; uneven risers are a trip hazard.',
        'The IRC caps riser height at 7.75 inches and requires a minimum 10 inch tread for most residential stairs.',
      ],
    },
    content: {
      intro:
        'The Stair Calculator works out the number of risers, the actual riser height, the number of treads, the total run, and the stringer length for a straight stair. It starts from the total floor-to-floor rise and a target riser height.',
      howItWorks:
        'Divide the total rise by the target riser height and round to the nearest whole number of risers. Dividing the total rise by that count gives the actual riser height, which must be identical for every step. There is always one fewer tread than riser, because the upper floor is the final step. Stringer length is the hypotenuse of the total rise and total run.',
      example:
        'A 108 inch floor-to-floor rise with a 7.5 inch target gives 14.4, which rounds to 14 risers. The actual riser is 108 / 14 = 7.71 inches. With 10 inch treads there are 13 treads, a 130 inch run, and a stringer length of about 169 inches.',
      formulas: [
        {
          label: 'Risers',
          expression: 'Risers = round(total rise / target riser)',
        },
        {
          label: 'Actual riser',
          expression: 'Riser = total rise / number of risers',
        },
        {
          label: 'Treads and run',
          expression: 'Treads = risers − 1; Run = treads × tread depth',
        },
        {
          label: 'Stringer',
          expression: 'Stringer = √(total rise² + total run²)',
        },
      ],
      sources: [
        {
          label: 'International Residential Code (IRC) R311.7 — stairways',
          expression: 'Maximum riser 7.75 in; minimum tread 10 in; minimum width 36 in',
          note: 'IRC R311.7 sets the prescriptive limits for residential stairs. Local amendments can be stricter.',
        },
        {
          label: 'OSHA 29 CFR 1926.1052 — stairways',
          expression: 'Workplace stair rise and tread limits',
          note: 'Construction-site stairs have separate temporary-stair rules from permanent residential stairs.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Number of risers',
          explanation:
            'The count of vertical steps, including the final step onto the upper floor. It is rounded to the nearest whole riser.',
        },
        {
          resultLabel: 'Actual riser height',
          explanation:
            'The exact height each riser must be. Build to this figure, not the target, so the top and bottom steps match.',
        },
        {
          resultLabel: 'Stringer length',
          explanation:
            'The straight-line length of the angled board that carries the treads, before allowing for plumb and level cuts.',
        },
      ],
      workflowLinks: [
        { slug: 'lumber-calculator', step: 'Price the stringers and treads by board foot.' },
        { slug: 'deck-calculator', step: 'Plan the deck the stairs lead to.' },
        { slug: 'triangle-calculator', step: 'Check the stair triangle with other known values.' },
      ],
      faqs: [
        {
          q: 'How do I calculate the number of stairs?',
          a: 'Measure the total floor-to-floor rise and divide by your target riser height, then round to the nearest whole number. A 108 inch rise with a 7.5 inch target gives 14.4, so 14 risers.',
        },
        {
          q: 'Why are there fewer treads than risers?',
          a: 'The upper floor is the last step, so it does not need a tread. A stair with 14 risers has 13 treads and lands on the floor at the top.',
        },
        {
          q: 'What is the maximum riser height for a residential stair?',
          a: 'The IRC caps risers at 7.75 inches and requires treads at least 10 inches deep for most residential stairs. Local codes may differ, and outdoor or utility stairs can have separate rules.',
        },
        {
          q: 'How long should a stair stringer be?',
          a: 'It is the hypotenuse of the total rise and total run: √(rise² + run²). For a 108 inch rise and 130 inch run that is about 169 inches, before cut allowances.',
        },
      ],
      related: ['lumber-calculator', 'deck-calculator', 'triangle-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'btu',
    slug: 'btu-calculator',
    name: 'BTU Calculator',
    shortDesc: 'Estimate a room cooling load in BTU per hour and translate it into tons and a common air-conditioner size.',
    tagline: 'Size the room, not the catalogue.',
    category: 'construction',
    iconName: 'Thermometer',
    badge: 'Cooling',
    featured: false,
    keywords: [
      'btu calculator',
      'how many btu to cool a room',
      'room air conditioner size calculator',
      'btu per square foot',
      'ton of cooling calculator',
      'ac sizing calculator',
    ],
    kind: 'custom',
    componentId: 'BtuCalculator',
    content: {
      intro:
        'The BTU Calculator estimates the cooling load of a room from its floor area, ceiling height, insulation, sun exposure, occupants, and whether a kitchen is included. It returns BTU per hour, tons of cooling, kilowatts, and the nearest common air-conditioner size, so a showroom label can be compared with the room rather than with the last unit that happened to be on sale.',
      howItWorks:
        'The model starts at 20 BTU per hour per square foot for an 8-foot ceiling with average insulation and average sun. Ceiling height scales that base proportionally. Insulation and sun apply the stated multipliers, each additional person above two adds 600 BTU per hour, and a kitchen adds 4,000. The total is rounded to the nearest 100 BTU per hour. One ton of cooling is 12,000 BTU per hour and one BTU per hour is about 0.293 watts.',
      example:
        'A 300 sq ft room with an 8-foot ceiling, average insulation, sunny exposure, and two occupants has a base load of 300 x 20 = 6,000 BTU/h. The sunny factor raises it to 6,600 BTU/h, or 0.55 tons. The nearest common size at or above that is an 8,000 BTU/h unit. Adding a kitchen raises the load to 10,600 BTU/h, which points to 12,000 BTU/h.',
      formulas: [
        { label: 'Base load', expression: 'area x 20 BTU/h per sq ft' },
        { label: 'Ceiling adjustment', expression: 'base x (ceiling height / 8)' },
        { label: 'Envelope adjustments', expression: 'base x insulation factor x sun factor' },
        { label: 'Occupants', expression: '+600 BTU/h for each person above two' },
        { label: 'Kitchen', expression: '+4,000 BTU/h when a kitchen is included' },
        { label: 'Tons', expression: 'BTU/h / 12,000' },
      ],
      sources: [
        {
          label: 'ASHRAE Handbook - Fundamentals',
          expression: 'Cooling load principles and heat gain components',
          note: 'The professional reference behind the simplified factors used here. A full calculation accounts for each surface, window, and internal load.',
        },
        {
          label: 'ACCA Manual J - Residential Load Calculation',
          expression: 'Room-by-room residential heating and cooling load method',
          note: 'The standard method for equipment sizing. Use it when the result matters, especially for a whole-house system.',
        },
        {
          label: 'U.S. Department of Energy - Energy Saver: Room Air Conditioners',
          expression: 'Sizing and efficiency guidance',
          note: 'Confirms that an oversized unit cools quickly, cycles on and off, and removes less humidity.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'BTU per hour',
          explanation:
            'The estimated heat the room gains on a design day, and therefore the cooling capacity the unit must remove. It is a snapshot of one room, not a whole-house figure.',
        },
        {
          resultLabel: 'Recommended unit size',
          explanation:
            'The smallest common nominal size at or above the estimate. Slightly larger is normal because units are sold in fixed steps; much larger is not better.',
        },
        {
          resultLabel: 'Tons',
          explanation:
            'A convenience unit in the trade: one ton is 12,000 BTU per hour. A 0.55-ton load is a small room; a 3-ton unit is a large living area.',
        },
      ],
      workflowLinks: [
        { slug: 'insulation-calculator', step: 'Check whether added insulation changes the load before buying equipment.' },
        { slug: 'room-area-calculator', step: 'Measure the floor area accurately first.' },
        { slug: 'paint-calculator', step: 'Plan the room refresh that usually accompanies the install.' },
      ],
      faqs: [
        {
          q: 'Is 20 BTU per square foot a reliable rule?',
          a: 'It is a starting point for a typical room with an 8-foot ceiling, average insulation, and average sun. Large windows, a west-facing wall, a top-floor flat, or a poorly insulated room can push the real load well above it. The adjustments here are still simpler than a Manual J calculation.',
        },
        {
          q: 'Why not buy a bigger unit for faster cooling?',
          a: 'An oversized unit reaches the thermostat setpoint quickly and shuts off before it has removed much humidity. The room feels cold and clammy, and the compressor cycles more often. Matching capacity to the load is more comfortable and usually uses less energy.',
        },
        {
          q: 'What is a ton of cooling?',
          a: 'One ton is 12,000 BTU per hour, a historical reference to the cooling effect of melting a ton of ice in a day. It is a rate of heat removal, not the weight of the equipment.',
        },
        {
          q: 'Can I use this for heating as well?',
          a: 'No. Heating load depends on the outdoor design temperature, the building envelope, and the heating system, and the multipliers are different. Use a heating load calculation or a professional assessment for a heat pump or furnace.',
        },
        {
          q: 'Does the calculator handle open-plan or vaulted spaces?',
          a: 'Only approximately. It scales for ceiling height, but it does not model air stratification, a connected stairwell, or heat moving in from an open kitchen. For a vaulted or open-plan space, treat the result as a lower bound and get a room-by-room assessment.',
        },
      ],
      related: ['insulation-calculator', 'room-area-calculator', 'paint-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.88 },
  },
  {
    id: 'insulation',
    slug: 'insulation-calculator',
    name: 'Insulation Calculator',
    shortDesc: 'Find the extra R-value, installed thickness, package count, and material cost for a wall or ceiling.',
    tagline: 'R-value is the target. Thickness is what you install.',
    category: 'construction',
    iconName: 'Box',
    badge: 'Home improvement',
    featured: false,
    keywords: [
      'insulation calculator',
      'how much insulation do i need',
      'r value calculator',
      'insulation coverage calculator',
      'blown in insulation calculator',
      'wall insulation cost',
    ],
    kind: 'custom',
    componentId: 'InsulationCalculator',
    content: {
      intro:
        'The Insulation Calculator converts a target R-value into the thickness of a chosen material, the number of packages to buy, and the material cost. It subtracts windows and doors from the gross area, adds a waste allowance, and flags when the required thickness will not fit a standard 2x4 or 2x6 cavity.',
      howItWorks:
        'Net area is gross area minus openings. The additional R-value is the target minus whatever R-value already exists, floored at zero. Thickness is that additional R divided by the material nominal R per inch. The area plus waste is divided by the coverage printed on one package and rounded up, because suppliers sell whole packages. Cost is packages multiplied by price per package.',
      example:
        'An 800 sq ft wall with 100 sq ft of windows and doors has 700 sq ft of net area. Going from R-13 to R-38 needs 25 more R. Fiberglass batt at 3.2 R per inch needs 25 / 3.2 = 7.8 inches. With 10% waste, 770 / 88 sq ft per package = 8.75, so buy 9 packages. At $55 each the material cost is $495, covering 792 sq ft with 92 sq ft left over.',
      formulas: [
        { label: 'Net area', expression: 'gross area - openings' },
        { label: 'Additional R', expression: 'max(0, target R - existing R)' },
        { label: 'Thickness', expression: 'additional R / material R per inch' },
        { label: 'Packages', expression: 'ceil(net area x (1 + waste %) / coverage per package)' },
        { label: 'Material cost', expression: 'packages x price per package' },
      ],
      sources: [
        {
          label: 'U.S. Department of Energy - Energy Saver: Insulation',
          expression: 'R-value, climate zones, and where insulation matters most',
          note: 'A starting point for choosing a target R-value. Local code may set a higher minimum.',
        },
        {
          label: 'Federal Trade Commission - R-Value Rule, 16 CFR Part 460',
          expression: 'Labeling and advertising requirements for insulation',
          note: 'Why the package label states R-value and coverage. Use the label, not a generic table, for the product you buy.',
        },
        {
          label: 'U.S. Department of Energy - Insulation Fact Sheet',
          expression: 'Material R-values per inch and installation guidance',
          note: 'The basis for the nominal R-per-inch ranges shown for each material.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Packages',
          explanation:
            'Whole packages needed for the net area plus waste. Coverage varies by brand, thickness, and product form, so replace the default with the figure on the label.',
        },
        {
          resultLabel: 'Installed thickness',
          explanation:
            'The depth of the additional material, not the total wall thickness. If it exceeds the cavity, the insulation will be compressed or will need a different assembly.',
        },
        {
          resultLabel: 'Total R-value',
          explanation:
            'Existing R plus the added R. It is the target when the inputs are right, but real performance also depends on air sealing, moisture, and installation quality.',
        },
      ],
      workflowLinks: [
        { slug: 'btu-calculator', step: 'See how the improved R-value changes the room cooling load.' },
        { slug: 'drywall-calculator', step: 'Plan the boards and joint compound if the wall is being opened.' },
        { slug: 'roofing-calculator', step: 'Coordinate a ceiling insulation job with a roof repair.' },
      ],
      faqs: [
        {
          q: 'What R-value should I aim for?',
          a: 'It depends on climate zone, the assembly, and local code. The Department of Energy publishes recommended levels by zone; a builder or energy auditor can confirm the requirement for your wall, floor, or ceiling. The calculator takes your target and works out what it takes to reach it.',
        },
        {
          q: 'Can I compress a thicker batt into a shallower cavity?',
          a: 'You can physically, but you should not. Compression squeezes the air pockets that do the insulating, so the installed R-value falls below the label. Choose a product that fits the cavity, or add rigid insulation to the assembly.',
        },
        {
          q: 'Why does the package count use a waste allowance?',
          a: 'Cuts around studs, outlets, windows, and corners create offcuts that cannot always be used. Ten percent is a common allowance for a simple wall; complex framing, diagonal runs, or many penetrations need more.',
        },
        {
          q: 'Do I need a vapour barrier as well?',
          a: 'That depends on climate, the wall assembly, and local code. Adding insulation can change where moisture condenses, so do not treat this calculator as a moisture design. Ask a local professional before closing a wall.',
        },
        {
          q: 'How do I know the existing R-value?',
          a: 'Use the label on the existing batts, the depth and type of the cavity fill, or an energy audit. If it is unknown, enter zero and treat the result as a full fill rather than a top-up; guessing high under-buys material.',
        },
      ],
      related: ['btu-calculator', 'drywall-calculator', 'roofing-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.88 },
  },
  {
    id: 'gutter',
    slug: 'gutter-calculator',
    name: 'Gutter Calculator',
    shortDesc: 'Estimate gutter length, hanger count, downspout pipe, and 10 ft sections from the roof edge run.',
    tagline: 'Measure the eave line before you order gutter.',
    category: 'construction',
    iconName: 'Route',
    badge: 'Exterior',
    featured: false,
    keywords: [
      'gutter calculator',
      'how much gutter do i need',
      'downspout calculator',
      'gutter hanger spacing',
      'gutter material estimator',
      'rain gutter length',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'edgeFt', label: 'Total gutter run', type: 'number', defaultValue: 120, min: 1, suffix: 'ft' },
        { id: 'downspouts', label: 'Number of downspouts', type: 'number', defaultValue: 4, min: 0, step: 1 },
        { id: 'downspoutFt', label: 'Downspout length each', type: 'number', defaultValue: 10, min: 0, suffix: 'ft' },
        { id: 'spacingIn', label: 'Hanger spacing', type: 'number', defaultValue: 24, min: 6, suffix: 'in' },
        { id: 'waste', label: 'Waste allowance', type: 'number', defaultValue: 5, min: 0, max: 25, suffix: '%' },
      ],
      results: [
        { label: 'Gutter length to buy', formulaCode: 'edgeFt * (1 + waste / 100)', suffix: 'ft', accent: true },
        { label: 'Hangers', formulaCode: 'Math.ceil(edgeFt * 12 / spacingIn) + 1' },
        { label: 'Downspout pipe', formulaCode: 'downspouts * downspoutFt', suffix: 'ft' },
        {
          label: 'Total gutter and pipe',
          formulaCode: 'edgeFt * (1 + waste / 100) + downspouts * downspoutFt',
          suffix: 'ft',
        },
        {
          label: '10 ft sections',
          formulaCode: 'Math.ceil((edgeFt * (1 + waste / 100) + downspouts * downspoutFt) / 10)',
        },
      ],
      formulaDescription:
        'Gutter length = edge run x (1 + waste); hangers = ceiling(edge run in inches / spacing) + 1; pipe = downspouts x length each.',
      tips: [
        'Measure the actual eave line, not the roof area. A 120 ft run needs more gutter than the same roof measured as squares suggests.',
        'Hanger spacing of 24 in is common in mild climates; snow load, ice damming, and manufacturer instructions often call for 12-18 in.',
        'A downspout every 30-40 ft of run is a common starting point, but roof area, roof pitch, and local rainfall intensity decide the real number.',
      ],
    },
    content: {
      intro:
        'The Gutter Calculator turns the length of the eave line into an order list: gutter in linear feet, hangers at your spacing, downspout pipe, and the number of 10 ft sections. It is a takeoff tool, not a gutter-sizing tool, so it does not guess a 5 in or 6 in profile from the roof area.',
      howItWorks:
        'Gutter is ordered by linear foot along the eave. The tool adds your waste allowance, then counts hangers by converting the run to inches, dividing by the hanger spacing, rounding up, and adding one for the end. Downspout pipe is the number of downspouts multiplied by their drop length, and the total is divided into 10 ft sections so you can match stock lengths and couplers.',
      example:
        'A house with 120 ft of eave, 4 downspouts dropping 10 ft each, hangers at 24 in, and 5 percent waste needs 126 ft of gutter, ceil(1440 / 24) + 1 = 61 hangers, 40 ft of downspout pipe, 166 ft of material in total, and 17 sections at 10 ft.',
      formulas: [
        { label: 'Gutter length', expression: 'edge run x (1 + waste / 100)' },
        { label: 'Hanger count', expression: 'ceiling(edge run in inches / hanger spacing) + 1' },
        { label: 'Downspout pipe', expression: 'number of downspouts x drop length each' },
        { label: '10 ft sections', expression: 'ceiling(total gutter and pipe / 10)' },
      ],
      sources: [
        {
          label: 'International Residential Code - Chapter 9, Roof Assemblies',
          expression: 'Roof drainage and gutter requirements',
          note: 'Sets the code framework for drainage, but the adopted edition and local amendments control.',
        },
        {
          label: 'SMACNA Architectural Sheet Metal Manual',
          expression: 'Gutter sizing and downspout capacity tables',
          note: 'The industry reference for sizing a gutter profile from roof area and rainfall intensity, which this takeoff tool does not do.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Gutter length to buy',
          explanation:
            'Eave run plus waste. Waste covers corners, outlets, and cut ends; add more for a complex roofline with many inside and outside corners.',
        },
        {
          resultLabel: 'Hangers',
          explanation:
            'Count based on your spacing plus one end hanger. Hidden hangers, spikes and ferrules, and snow guards may change the count and fixing pattern.',
        },
        {
          resultLabel: '10 ft sections',
          explanation:
            'A shopping aid for sectional gutter sold in 10 ft lengths. Seamless gutter is ordered as one continuous run and does not use this number.',
        },
      ],
      workflowLinks: [
        { slug: 'roofing-calculator', step: 'Estimate the roof area and bundles that the gutters will drain.' },
        { slug: 'rainwater-harvest-calculator', step: 'Work out how much rain the same roof can collect.' },
        { slug: 'siding-calculator', step: 'Coordinate fascia and siding work with the gutter replacement.' },
      ],
      faqs: [
        {
          q: 'How do I know whether I need 5 in or 6 in gutters?',
          a: 'Size the profile from the roof area draining to each run and the local rainfall intensity, using a gutter sizing table or the manufacturer guidance. A long run with a steep roof and one downspout may need 6 in even on a modest house. This calculator only measures the run you have chosen.',
        },
        {
          q: 'How far apart should gutter hangers be?',
          a: 'Twenty-four inches is common for mild conditions. Cold climates with snow and ice, heavy rainfall, or metal gutters often need 12-18 in, and the manufacturer instructions override any rule of thumb. Closer spacing also helps a gutter hold its slope under load.',
        },
        {
          q: 'How many downspouts does a gutter run need?',
          a: 'One downspout per 30-40 ft of run is a common starting point, but the limit is the roof area and rainfall intensity, not length alone. Each downspout must also discharge far enough from the foundation, and the outlet should not create a trip hazard or a slope back toward the house.',
        },
        {
          q: 'Does the calculator include elbows, outlets, and end caps?',
          a: 'No. Those are counted per corner and per downspout, not per foot. Add one outlet per downspout, two end caps per run, and elbows for every change of direction, then check the manufacturer parts list for the profile you are installing.',
        },
        {
          q: 'What slope should a gutter have?',
          a: 'A common target is about 1/4 in of fall per 10 ft toward the downspout, but follow the manufacturer and local practice. The calculator does not adjust length for slope because the difference is small compared with waste and corner allowances.',
        },
      ],
      related: ['roofing-calculator', 'siding-calculator', 'rainwater-harvest-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.82 },
  },
  {
    id: 'wallpaper',
    slug: 'wallpaper-calculator',
    name: 'Wallpaper Calculator',
    shortDesc: 'Estimate wallpaper rolls from wall size, roll dimensions, and pattern repeat, including pattern matching waste.',
    tagline: 'Pattern repeat is what makes wallpaper estimates wrong.',
    category: 'construction',
    iconName: 'PaintRoller',
    badge: 'Interior',
    featured: false,
    keywords: [
      'wallpaper calculator',
      'how many rolls of wallpaper',
      'wallpaper estimator',
      'wallpaper pattern repeat calculator',
      'wallpaper roll coverage',
      'wallpaper drops per roll',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'wallWidthFt', label: 'Total wall width', type: 'number', defaultValue: 12, min: 1, suffix: 'ft' },
        { id: 'wallHeightFt', label: 'Wall height', type: 'number', defaultValue: 9, min: 1, suffix: 'ft' },
        { id: 'rollWidthIn', label: 'Roll width', type: 'number', defaultValue: 20.5, min: 1, suffix: 'in' },
        { id: 'rollLengthFt', label: 'Roll length', type: 'number', defaultValue: 33, min: 1, suffix: 'ft' },
        { id: 'repeatIn', label: 'Pattern repeat', type: 'number', defaultValue: 12, min: 0, suffix: 'in' },
      ],
      results: [
        { label: 'Wall area', formulaCode: 'wallWidthFt * wallHeightFt', suffix: 'sq ft' },
        {
          label: 'Drops needed',
          formulaCode: 'Math.ceil(wallWidthFt / (rollWidthIn / 12))',
          accent: true,
        },
        { label: 'Cut length per drop', formulaCode: 'wallHeightFt + repeatIn / 12', suffix: 'ft' },
        {
          label: 'Drops per roll',
          formulaCode: 'Math.max(1, Math.floor(rollLengthFt / (wallHeightFt + repeatIn / 12)))',
        },
        {
          label: 'Rolls required',
          formulaCode:
            'Math.ceil(Math.ceil(wallWidthFt / (rollWidthIn / 12)) / Math.max(1, Math.floor(rollLengthFt / (wallHeightFt + repeatIn / 12))))',
        },
      ],
      formulaDescription:
        'Drops = ceiling(wall width / roll width); cut length = wall height + repeat; rolls = ceiling(drops / drops per roll).',
      tips: [
        'A straight match wastes up to one full repeat per drop, so the cut length is wall height plus the repeat, not wall height alone.',
        'Use the actual wall height including any skirting or ceiling gap you plan to trim into. Do not subtract windows and doors: the drop still runs past them.',
        'Buy all rolls in one batch code. Later batches can differ in shade, and a spare roll is cheaper than a mismatched repair.',
      ],
    },
    content: {
      intro:
        'The Wallpaper Calculator estimates rolls from the wall run, wall height, roll size, and pattern repeat. It counts whole vertical drops rather than dividing wall area by roll area, because pattern matching and trimming mean a roll rarely delivers its full printed coverage.',
      howItWorks:
        'The wall width is divided by the roll width to find how many vertical drops are needed, rounded up. Each drop is cut to the wall height plus one pattern repeat, which is the worst case for aligning a straight match. The roll length is divided by that cut length to find how many drops fit on one roll, rounded down. Rolls required is the drop count divided by drops per roll, rounded up. Areas are shown for reference only.',
      example:
        'A wall 12 ft wide and 9 ft high with a 20.5 in wide, 33 ft long roll and a 12 in repeat needs ceil(12 / 1.708) = 8 drops. Each cut is 9 + 1 = 10 ft, so 33 / 10 = 3 drops fit per roll. Eight drops divided by 3 gives 3 rolls, even though the 108 sq ft wall is less than the 56.4 sq ft printed on one roll times three.',
      formulas: [
        { label: 'Drops needed', expression: 'ceiling(wall width / roll width in feet)' },
        { label: 'Cut length per drop', expression: 'wall height + pattern repeat in feet' },
        { label: 'Drops per roll', expression: 'floor(roll length / cut length per drop)' },
        { label: 'Rolls required', expression: 'ceiling(drops needed / drops per roll)' },
      ],
      sources: [
        {
          label: 'ASTM F793 - Standard Classification of Wall Covering by Use Characteristics',
          expression: 'Wallcovering performance classes',
          note: 'Useful for choosing a covering suited to the room, not for estimating quantity.',
        },
        {
          label: 'Wallcoverings Association - installation and estimating guidance',
          expression: 'Drop counting and pattern match allowances',
          note: 'Industry guidance confirms that pattern repeat and match type, not wall area alone, drive roll counts.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Drops needed',
          explanation:
            'Whole vertical strips across the wall run, rounded up. A partial strip at the end still consumes a full drop.',
        },
        {
          resultLabel: 'Drops per roll',
          explanation:
            'How many cuts fit in one roll after allowing one repeat for matching. It is rounded down because a partial cut cannot be used as a full drop.',
        },
        {
          resultLabel: 'Rolls required',
          explanation:
            'The number to order before adding a spare. It assumes a straight match and a simple rectangular wall; a drop match, many corners, or a large motif can need more.',
        },
      ],
      workflowLinks: [
        { slug: 'paint-calculator', step: 'Price the paint for trim and ceilings while the room is empty.' },
        { slug: 'room-area-calculator', step: 'Measure the floor area for flooring or rug planning.' },
        { slug: 'drywall-calculator', step: 'Repair or replace damaged wallboard before papering.' },
      ],
      faqs: [
        {
          q: 'What is a pattern repeat and why does it add waste?',
          a: 'The repeat is the distance before the pattern starts again. Adjacent drops must be shifted so the motif lines up, which means each cut needs up to one extra repeat of length. A 24 in repeat on a 9 ft wall effectively makes every drop 11 ft for cutting purposes.',
        },
        {
          q: 'Should I subtract windows and doors from the wall area?',
          a: 'No. Drops run from ceiling to floor past openings, and the offcut above or below a window is rarely long enough to reuse. Subtracting openings is the most common reason an estimate comes up short.',
        },
        {
          q: 'What is the difference between a straight match and a drop match?',
          a: 'A straight match lines up at the same height on every drop. A drop match, also called an offset match, shifts by half a repeat on alternate drops and can waste more. This calculator assumes the simpler straight match, so add a roll for an offset pattern.',
        },
        {
          q: 'Do I need to add a spare roll?',
          a: 'It is wise if the budget allows. Dye lots change, and a future repair may not match. Keep one unopened roll with the batch code written on it, especially in a room with heavy traffic or plumbing that might need a patch.',
        },
        {
          q: 'Can I use this for lining paper?',
          a: 'Yes, set the pattern repeat to zero. Lining paper has no match, so cut length equals wall height and the estimate becomes a straightforward drop count. Still round up, because damaged edges and trimming consume length.',
        },
      ],
      related: ['paint-calculator', 'drywall-calculator', 'room-area-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'epoxy-resin',
    slug: 'epoxy-resin-calculator',
    name: 'Epoxy Resin Calculator',
    shortDesc: 'Convert coating area and thickness into resin volume, gallons, litres, and part A and B amounts.',
    tagline: 'Volume first, then the mix ratio.',
    category: 'construction',
    iconName: 'Droplets',
    badge: 'Coating',
    featured: false,
    keywords: [
      'epoxy resin calculator',
      'epoxy coverage calculator',
      'how much epoxy do i need',
      'epoxy mil thickness calculator',
      'epoxy mix ratio calculator',
      'resin volume calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'areaSqFt', label: 'Coated area', type: 'number', defaultValue: 400, min: 1, suffix: 'sq ft' },
        { id: 'thicknessMils', label: 'Coating thickness', type: 'number', defaultValue: 20, min: 1, suffix: 'mils' },
        { id: 'ratioA', label: 'Part A ratio', type: 'number', defaultValue: 2, min: 0.1, step: 0.1 },
        { id: 'ratioB', label: 'Part B ratio', type: 'number', defaultValue: 1, min: 0.1, step: 0.1 },
      ],
      results: [
        {
          label: 'Total resin volume',
          formulaCode: 'areaSqFt * 144 * (thicknessMils / 1000) / 231',
          suffix: 'gal',
          accent: true,
        },
        {
          label: 'Part A',
          formulaCode: 'areaSqFt * 144 * (thicknessMils / 1000) / 231 * ratioA / (ratioA + ratioB)',
          suffix: 'gal',
        },
        {
          label: 'Part B',
          formulaCode: 'areaSqFt * 144 * (thicknessMils / 1000) / 231 * ratioB / (ratioA + ratioB)',
          suffix: 'gal',
        },
        {
          label: 'Total in litres',
          formulaCode: 'areaSqFt * 144 * (thicknessMils / 1000) / 231 * 3.78541',
          suffix: 'L',
        },
      ],
      formulaDescription:
        'Volume (gal) = area (sq ft) x 144 x thickness (in) / 231; part A = total x A / (A + B).',
      tips: [
        'One mil is one thousandth of an inch. A 20 mil coating is 0.020 in thick, not 20 mm.',
        'This is geometric volume. Porous concrete, broadcast flakes, primer, and squeegee loss all consume extra resin, so round up and check the product data sheet.',
        'Mix ratio is by volume or by weight depending on the product. Never assume the ratio from one brand applies to another.',
      ],
    },
    content: {
      intro:
        'The Epoxy Resin Calculator converts a coated area and a target film thickness into the volume of mixed resin, then splits that volume into part A and part B using your mix ratio. It is useful for countertops, garage floors, and art pieces where buying too little means a visible cold joint.',
      howItWorks:
        'Area in square feet is multiplied by 144 to get square inches, then by thickness in inches to get cubic inches. One US gallon is 231 cubic inches, so dividing by 231 gives gallons. Litres are gallons multiplied by 3.78541. The mix ratio divides the total into parts: a 2:1 ratio means two thirds of the volume is part A and one third is part B.',
      example:
        'A 400 sq ft floor at 20 mils is 400 x 144 x 0.020 = 1,152 cubic inches. Dividing by 231 gives 4.99 gallons, or 18.88 litres. At a 2:1 mix ratio that is 3.32 gallons of part A and 1.66 gallons of part B.',
      formulas: [
        { label: 'Cubic inches', expression: 'area (sq ft) x 144 x thickness (in)' },
        { label: 'Gallons', expression: 'cubic inches / 231' },
        { label: 'Litres', expression: 'gallons x 3.78541' },
        { label: 'Part A and B', expression: 'total x ratio / (ratio A + ratio B)' },
      ],
      sources: [
        {
          label: 'ASTM D4414 - Measurement of Wet Film Thickness by Notch Gages',
          expression: 'Wet film thickness measurement',
          note: 'A practical check that the wet coat is close to the specified thickness before it cures.',
        },
        {
          label: 'SSPC - Coating thickness and coverage guidance',
          expression: 'Theoretical versus practical coverage',
          note: 'Explains why real coverage falls short of a smooth, non-porous theoretical surface.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Total resin volume',
          explanation:
            'Mixed volume for a perfectly flat, non-absorbent surface at the stated thickness. Add primer and a margin for the substrate.',
        },
        {
          resultLabel: 'Part A',
          explanation:
            'The resin side of the mix. Ratio is normally printed on the container; using the wrong side or the wrong ratio leaves a tacky or brittle cure.',
        },
        {
          resultLabel: 'Total in litres',
          explanation:
            'Useful when resin is sold in litre or kilogram packs. Check whether the pack size is by volume or weight, because resin density is above 1.',
        },
      ],
      workflowLinks: [
        { slug: 'concrete-calculator', step: 'Estimate the slab or patch that the coating will cover.' },
        { slug: 'paint-calculator', step: 'Compare a thin paint system with a thick resin system.' },
        { slug: 'tile-calculator', step: 'Compare a tiled finish with a poured resin finish.' },
      ],
      faqs: [
        {
          q: 'Why is the resin volume so much larger than the coverage on the can?',
          a: 'Coverage charts usually assume a thin coat, often 1-3 mils for a sealer or 10 mils for a build coat. Volume scales linearly with thickness, so 20 mils needs twice the resin of 10 mils. Always compare the chart at your target thickness.',
        },
        {
          q: 'Does the calculator include primer and topcoat?',
          a: 'No. It sizes one coat. A typical system may use primer, a base coat, and a clear topcoat, each with its own thickness and coverage. Calculate each layer separately, then add the packs together.',
        },
        {
          q: 'Is the mix ratio by volume or by weight?',
          a: 'It depends on the product, and the difference matters because part A and part B have different densities. Use the ratio stated on the technical data sheet and measure with the method it specifies. This calculator treats the ratio as volume parts.',
        },
        {
          q: 'How much extra should I buy for a porous surface?',
          a: 'There is no universal allowance. Bare or broom-finished concrete can absorb a first coat heavily, and broadcast flakes add surface area. A primer and a 10-15 percent margin is a reasonable starting point, but the product data sheet and a test patch are better guides.',
        },
        {
          q: 'What happens if I mix more than I can pour in time?',
          a: 'Pot life shortens as temperature rises, and a batch that starts to gel will not level. Mix only what you can place within the working time, and keep part A and B separate until you are ready. Do not try to thin a gelling batch with solvent unless the product allows it.',
        },
      ],
      related: ['paint-calculator', 'concrete-calculator', 'tile-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'sod',
    slug: 'sod-calculator',
    name: 'Sod Calculator',
    shortDesc: 'Estimate sod rolls and pallets from lawn area with a waste allowance and your supplier roll coverage.',
    tagline: 'Order the lawn by the roll and the pallet.',
    category: 'construction',
    iconName: 'Sprout',
    badge: 'Landscaping',
    featured: false,
    keywords: [
      'sod calculator',
      'how much sod do i need',
      'sod rolls calculator',
      'sod pallet coverage',
      'lawn sod estimator',
      'new lawn calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'lengthFt', label: 'Lawn length', type: 'number', defaultValue: 50, min: 1, suffix: 'ft' },
        { id: 'widthFt', label: 'Lawn width', type: 'number', defaultValue: 30, min: 1, suffix: 'ft' },
        { id: 'rollCoverage', label: 'Roll coverage', type: 'number', defaultValue: 10, min: 1, suffix: 'sq ft' },
        { id: 'palletCoverage', label: 'Pallet coverage', type: 'number', defaultValue: 450, min: 1, suffix: 'sq ft' },
        { id: 'waste', label: 'Waste allowance', type: 'number', defaultValue: 5, min: 0, max: 25, suffix: '%' },
      ],
      results: [
        { label: 'Lawn area', formulaCode: 'lengthFt * widthFt', suffix: 'sq ft' },
        {
          label: 'Area to order',
          formulaCode: 'lengthFt * widthFt * (1 + waste / 100)',
          suffix: 'sq ft',
        },
        {
          label: 'Sod rolls',
          formulaCode: 'Math.ceil(lengthFt * widthFt * (1 + waste / 100) / rollCoverage)',
          accent: true,
        },
        {
          label: 'Pallets',
          formulaCode: 'Math.ceil(lengthFt * widthFt * (1 + waste / 100) / palletCoverage)',
        },
      ],
      formulaDescription:
        'Area = length x width; order area = area x (1 + waste); rolls = ceiling(order area / roll coverage).',
      tips: [
        'Roll coverage varies by supplier, grass type, and whether the sod is cut thick. Confirm the actual square feet per roll before ordering.',
        'Irregular lawns should be split into rectangles, circles, and triangles, then added. A single bounding rectangle over-orders badly on an L-shaped yard.',
        'Sod is perishable. Schedule delivery for the day you can install, and keep rolls shaded and moist if there is any delay.',
      ],
    },
    content: {
      intro:
        'The Sod Calculator estimates the square footage of a lawn, adds a waste allowance, and converts it into rolls and pallets using your supplier coverage. It is built for a rectangular lawn; irregular yards need to be split into shapes and added together.',
      howItWorks:
        'Length times width gives the lawn area. The waste allowance covers cuts at edges, curves, and around beds and paths. That order area is divided by the square feet per roll and rounded up, then divided by the square feet per pallet and rounded up. Both coverage figures are inputs because sod rolls and pallets are not standardized across suppliers.',
      example:
        'A 50 ft by 30 ft lawn is 1,500 sq ft. With 5 percent waste the order area is 1,575 sq ft. At 10 sq ft per roll that is 158 rolls, and at 450 sq ft per pallet it is 4 pallets.',
      formulas: [
        { label: 'Lawn area', expression: 'length x width' },
        { label: 'Order area', expression: 'area x (1 + waste / 100)' },
        { label: 'Rolls', expression: 'ceiling(order area / roll coverage)' },
        { label: 'Pallets', expression: 'ceiling(order area / pallet coverage)' },
      ],
      sources: [
        {
          label: 'Turfgrass Producers International - sod installation guidance',
          expression: 'Sod handling, installation, and establishment',
          note: 'Industry guidance on preparing soil, laying rolls tightly, and watering after installation.',
        },
        {
          label: 'USDA Natural Resources Conservation Service - turf establishment',
          expression: 'Soil preparation and turf selection',
          note: 'Background on why soil preparation and species choice matter more than the order quantity.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Area to order',
          explanation:
            'Lawn area plus waste. The allowance covers edge trimming and unusable offcuts, not failed establishment.',
        },
        {
          resultLabel: 'Sod rolls',
          explanation:
            'Rolls at your supplier coverage, rounded up. Confirm whether the supplier sells by the roll or the pallet, and whether a part pallet is available.',
        },
        {
          resultLabel: 'Pallets',
          explanation:
            'Whole pallets at your coverage figure. Pallet counts vary by farm, grass type, and roll size, so treat this as a planning number rather than a quote.',
        },
      ],
      workflowLinks: [
        { slug: 'topsoil-calculator', step: 'Order the topsoil and compost for the seedbed.' },
        { slug: 'mulch-calculator', step: 'Plan beds and tree rings around the new lawn.' },
        { slug: 'landscape-material-calculator', step: 'Estimate gravel or mulch for paths and borders.' },
      ],
      faqs: [
        {
          q: 'How many square feet are in a roll of sod?',
          a: 'Common rolls cover about 9-10 sq ft, but suppliers vary and some sell by the square yard. Check the actual coverage on the quote. The calculator lets you enter the real number so the roll count matches what will be delivered.',
        },
        {
          q: 'How much waste should I allow for sod?',
          a: 'Five percent is reasonable for a simple rectangle. Curves, beds, narrow strips, and many corners can push it to 10 percent. Ordering too little is worse than a small surplus because a second delivery may come from a different cut.',
        },
        {
          q: 'How soon should sod be installed after delivery?',
          a: 'As soon as possible, ideally the same day. Sod is a living plant and heats up in the roll. If installation is delayed, unroll it in shade, keep it moist, and do not stack rolls in direct sun. Follow the supplier instructions for the grass type.',
        },
        {
          q: 'Do I need topsoil under the sod?',
          a: 'The sod needs contact with prepared soil, not a dusting over hardpan or weeds. Till and amend the top 4-6 in, grade for drainage, and firm before laying. The sod calculator does not include soil, compost, or starter fertilizer.',
        },
        {
          q: 'Can I calculate an irregular lawn?',
          a: 'Yes, by splitting it into shapes. Use rectangles for the main areas, triangles for corner beds, and circles for curved sections, then add the results. Do not measure the bounding rectangle unless you are prepared to pay for sod you cannot use.',
        },
      ],
      related: ['topsoil-calculator', 'mulch-calculator', 'landscape-material-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.82 },
  },
  {
    id: 'paver',
    slug: 'paver-calculator',
    name: 'Paver Calculator',
    shortDesc: 'Estimate pavers from patio area, paver size, joint width, and a cutting waste allowance.',
    tagline: 'Count pavers, not just square feet.',
    category: 'construction',
    iconName: 'Grid',
    badge: 'Hardscape',
    featured: false,
    keywords: [
      'paver calculator',
      'how many pavers do i need',
      'patio paver calculator',
      'paver base calculator',
      'pavers per square foot',
      'paver estimator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'areaSqFt', label: 'Patio area', type: 'number', defaultValue: 200, min: 1, suffix: 'sq ft' },
        { id: 'paverLengthIn', label: 'Paver length', type: 'number', defaultValue: 8, min: 0.5, suffix: 'in' },
        { id: 'paverWidthIn', label: 'Paver width', type: 'number', defaultValue: 4, min: 0.5, suffix: 'in' },
        { id: 'jointIn', label: 'Joint width', type: 'number', defaultValue: 0.125, min: 0, max: 1, step: 0.125, suffix: 'in' },
        { id: 'waste', label: 'Cutting waste', type: 'number', defaultValue: 10, min: 0, max: 30, suffix: '%' },
      ],
      results: [
        {
          label: 'Pavers required',
          formulaCode:
            'Math.ceil(areaSqFt * (1 + waste / 100) / (((paverLengthIn + jointIn) / 12) * ((paverWidthIn + jointIn) / 12)))',
          accent: true,
        },
        {
          label: 'Pavers per sq ft',
          formulaCode: '1 / (((paverLengthIn + jointIn) / 12) * ((paverWidthIn + jointIn) / 12))',
        },
        {
          label: 'Area to cover',
          formulaCode: 'areaSqFt * (1 + waste / 100)',
          suffix: 'sq ft',
        },
        {
          label: 'Paver face area with joint',
          formulaCode: '((paverLengthIn + jointIn) / 12) * ((paverWidthIn + jointIn) / 12)',
          suffix: 'sq ft',
        },
      ],
      formulaDescription:
        'Pavers = ceiling(area x (1 + waste) / ((length + joint) x (width + joint) / 144)).',
      tips: [
        'The joint is part of the module. Ignoring a 1/8 in joint over thousands of pavers adds up to a real shortage.',
        'Ten percent waste suits a running bond in a simple rectangle. Herringbone, circles, and many cuts need 15 percent or more.',
        'Pavers need a compacted base and bedding sand; this tool counts pavers only, not base, sand, or edge restraints.',
      ],
    },
    content: {
      intro:
        'The Paver Calculator converts a patio area into a paver count using the actual paver dimensions, the joint width, and a cutting waste allowance. It answers the question a square-foot estimate cannot: how many individual units to order.',
      howItWorks:
        'Each paver plus its joint forms a module. The module area is length plus joint times width plus joint, converted from square inches to square feet. The patio area is increased by the waste allowance and divided by the module area, then rounded up. Pavers per square foot is the reciprocal of the module area, useful for checking a supplier quote.',
      example:
        'A 200 sq ft patio with 8 in by 4 in pavers and a 1/8 in joint has a module of 8.125 x 4.125 = 33.52 sq in, or 0.2328 sq ft. With 10 percent waste, 220 / 0.2328 = 945.2, so order 946 pavers.',
      formulas: [
        { label: 'Module area', expression: '(paver length + joint) x (paver width + joint) / 144' },
        { label: 'Pavers required', expression: 'ceiling(area x (1 + waste) / module area)' },
        { label: 'Pavers per sq ft', expression: '1 / module area' },
        { label: 'Area to cover', expression: 'area x (1 + waste)' },
      ],
      sources: [
        {
          label: 'Interlocking Concrete Pavement Institute - paver installation guide',
          expression: 'Base, bedding, joint sand, and restraint',
          note: 'The industry reference for the layers under the pavers, which this counter does not include.',
        },
        {
          label: 'ASTM C936 - Solid Concrete Interlocking Paving Units',
          expression: 'Paver dimensional and performance requirements',
          note: 'Manufactured dimensions can vary slightly, so confirm the nominal size on the pallet.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Pavers required',
          explanation:
            'Units to order including cutting waste. Keep a few spares from the same production batch for future repairs and settling.',
        },
        {
          resultLabel: 'Pavers per sq ft',
          explanation:
            'A check against the supplier coverage figure. It includes the joint, so it will be slightly lower than a count based on paver face alone.',
        },
        {
          resultLabel: 'Paver face area with joint',
          explanation:
            'The installed footprint of one module. It is the number that makes the area and count agree.',
        },
      ],
      workflowLinks: [
        { slug: 'gravel-calculator', step: 'Estimate the compacted base and drainage layer.' },
        { slug: 'landscape-material-calculator', step: 'Price bulk sand, gravel, or mulch by volume.' },
        { slug: 'concrete-calculator', step: 'Compare a poured slab with a paver patio.' },
      ],
      faqs: [
        {
          q: 'Why include the joint width in the paver count?',
          a: 'Pavers are not butted tight; the joint sand is part of the finished surface. A 1/8 in joint on an 8 x 4 in paver reduces the number of units per square foot. Leaving it out under-orders, and the shortfall grows with the size of the patio.',
        },
        {
          q: 'How much waste should I allow?',
          a: 'Ten percent is a sensible default for a simple running bond in a rectangular area. Herringbone, basketweave, curved edges, and many obstructions create more offcuts, so use 15 percent. Complex circular designs can waste more than that.',
        },
        {
          q: 'How deep should the base be?',
          a: 'It depends on the traffic and the subgrade. A common residential patio uses 4-6 in of compacted aggregate plus about 1 in of bedding sand, but clay soils, driveways, and freeze-thaw climates need an engineered section. The paver count does not size the base.',
        },
        {
          q: 'Can I use this for retaining wall blocks?',
          a: 'Only if the block is sold by face area and installed in a single wythe. Wall blocks have different coverage, cores, and geogrid requirements. Use the wall system manufacturer coverage chart and a separate base and drainage design.',
        },
        {
          q: 'Do I need edge restraints?',
          a: 'Yes for almost any flexible paver surface. Without restraint the edge units migrate outward, joints open, and the pattern loosens. Count the perimeter separately and use the restraint system specified for the base and curve radius.',
        },
      ],
      related: ['gravel-calculator', 'landscape-material-calculator', 'concrete-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.84 },
  },
  {
    id: 'rainwater-harvest',
    slug: 'rainwater-harvest-calculator',
    name: 'Rainwater Harvesting Calculator',
    shortDesc: 'Estimate annual rain capture from a roof footprint using rainfall and a runoff coefficient.',
    tagline: 'How much rain can the roof actually collect?',
    category: 'construction',
    iconName: 'Droplets',
    badge: 'Water',
    featured: false,
    keywords: [
      'rainwater harvesting calculator',
      'rainwater collection calculator',
      'how much rainwater can i collect',
      'roof catchment calculator',
      'rain barrel calculator',
      'rainwater yield',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'roofFootprintSqFt', label: 'Roof footprint', type: 'number', defaultValue: 1500, min: 1, suffix: 'sq ft' },
        { id: 'rainfallIn', label: 'Annual rainfall', type: 'number', defaultValue: 30, min: 0, suffix: 'in' },
        { id: 'runoffCoefficient', label: 'Runoff coefficient', type: 'number', defaultValue: 85, min: 1, max: 100, suffix: '%' },
      ],
      results: [
        {
          label: 'Catchable rain per year',
          formulaCode: 'roofFootprintSqFt * (rainfallIn / 12) * 7.48052 * (runoffCoefficient / 100)',
          suffix: 'gal',
          accent: true,
        },
        {
          label: 'Catchable rain in litres',
          formulaCode: 'roofFootprintSqFt * (rainfallIn / 12) * 7.48052 * (runoffCoefficient / 100) * 3.78541',
          suffix: 'L',
        },
        {
          label: 'Catchment volume',
          formulaCode: 'roofFootprintSqFt * (rainfallIn / 12) * (runoffCoefficient / 100)',
          suffix: 'cu ft',
        },
        {
          label: 'Average per day',
          formulaCode: 'roofFootprintSqFt * (rainfallIn / 12) * 7.48052 * (runoffCoefficient / 100) / 365',
          suffix: 'gal',
        },
      ],
      formulaDescription:
        'Gallons = roof footprint (sq ft) x rainfall (ft) x 7.48052 x runoff coefficient.',
      tips: [
        'Use the roof footprint, not the sloped surface area. A plan view of the roof is what intercepts the rain.',
        'The runoff coefficient accounts for splashing, first-flush diversion, gutter overflow, and wetting the roof. Eighty to ninety percent is typical for a clean hard roof.',
        'Annual capture is not tank size. Storage should match the dry spell you want to bridge, not the yearly total.',
      ],
    },
    content: {
      intro:
        'The Rainwater Harvesting Calculator estimates how many gallons and litres of rain a roof can deliver in a year, using the roof footprint, annual rainfall, and a runoff coefficient. It is a supply estimate; tank sizing also needs the dry-spell length and how much water you actually use.',
      howItWorks:
        'Rainfall in inches is converted to feet, multiplied by the roof footprint to get cubic feet of rain falling on the plan area, then converted to gallons with 7.48052 gallons per cubic foot. The runoff coefficient reduces that theoretical total for splashing, gutter losses, and first-flush diversion. Litres are gallons multiplied by 3.78541, and the daily average simply spreads the annual total over 365 days.',
      example:
        'A 1,500 sq ft roof in a 30 in rainfall area intercepts 1,500 x 2.5 = 3,750 cubic feet of rain. At an 85 percent runoff coefficient, 3,187.5 cubic feet is captured, which is about 23,844 gallons or 90,260 litres a year, or roughly 65 gallons a day averaged across the year.',
      formulas: [
        { label: 'Catchment volume', expression: 'roof footprint x rainfall (ft) x runoff coefficient' },
        { label: 'Gallons', expression: 'cubic feet x 7.48052' },
        { label: 'Litres', expression: 'gallons x 3.78541' },
        { label: 'Daily average', expression: 'annual gallons / 365' },
      ],
      sources: [
        {
          label: 'US EPA - Rainwater Harvesting',
          expression: 'Catchment, conveyance, and storage components',
          note: 'A general reference for system components and non-potable uses.',
        },
        {
          label: 'Texas A&M AgriLife Extension - Rainwater Harvesting',
          expression: 'Catchment area and runoff calculations',
          note: 'Provides the standard catchment formula and practical guidance on first-flush diversion and tank sizing.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Catchable rain per year',
          explanation:
            'A long-run supply estimate after the runoff coefficient. It is not a guarantee for any single year, because rainfall varies widely.',
        },
        {
          resultLabel: 'Catchment volume',
          explanation:
            'The same result in cubic feet, useful for comparing with tank volumes and soil storage.',
        },
        {
          resultLabel: 'Average per day',
          explanation:
            'The annual total spread evenly. Real supply arrives in bursts, so a tank or cistern is what turns it into a daily resource.',
        },
      ],
      workflowLinks: [
        { slug: 'roof-pitch-calculator', step: 'Confirm the roof geometry and plan area.' },
        { slug: 'irrigation-calculator', step: 'Compare garden demand with the rain supply.' },
        { slug: 'gallons-to-liters-calculator', step: 'Convert between the units used by tank suppliers.' },
      ],
      faqs: [
        {
          q: 'Should I use the roof footprint or the sloped roof area?',
          a: 'Use the footprint, meaning the plan area the roof covers. A steep roof has more surface area, but it intercepts the same rainfall per unit of ground area. Using the sloped area overstates the supply.',
        },
        {
          q: 'What runoff coefficient should I use?',
          a: 'A clean metal, tile, or asphalt roof typically loses 10-20 percent to wetting, splash, and first flush, so 80-90 percent is a reasonable range. A green roof, gravel roof, or long gutter run loses more. If you divert the first flush, include that loss here.',
        },
        {
          q: 'How big should my tank be?',
          a: 'Size for the dry spell, not the annual total. Multiply daily demand by the longest typical dry period, then compare with the capture from a typical storm. A tank that holds the whole annual catch would sit empty most of the year and full after one storm.',
        },
        {
          q: 'Can I drink harvested rainwater?',
          a: 'Only with a properly designed treatment train and local approval. Roof runoff can carry bird droppings, metals, and pathogens. Potable use needs first-flush diversion, filtration, disinfection, and testing. For garden use, keep the system simple and avoid stagnant water.',
        },
        {
          q: 'Does the roof material affect water quality?',
          a: 'Yes. Uncoated metal and concrete tile are generally cleaner catchments than old asbestos, lead flashing, or treated wood shingles. Avoid roofs with moss treatments or recent paint, and check local rules before using the water on edible crops.',
        },
      ],
      related: ['roof-pitch-calculator', 'irrigation-calculator', 'gallons-to-liters-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'irrigation',
    slug: 'irrigation-calculator',
    name: 'Irrigation Water Calculator',
    shortDesc: 'Estimate water use per watering session, week, and month from area, application rate, and run time.',
    tagline: 'Turn minutes on the timer into gallons on the lawn.',
    category: 'construction',
    iconName: 'Waves',
    badge: 'Water',
    featured: false,
    keywords: [
      'irrigation calculator',
      'sprinkler water usage calculator',
      'how much water does my lawn need',
      'irrigation gallons per week',
      'watering calculator',
      'precipitation rate calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'areaSqFt', label: 'Irrigated area', type: 'number', defaultValue: 1000, min: 1, suffix: 'sq ft' },
        { id: 'precipRate', label: 'Application rate', type: 'number', defaultValue: 0.5, min: 0.01, step: 0.05, suffix: 'in/hr' },
        { id: 'minutes', label: 'Minutes per session', type: 'number', defaultValue: 20, min: 1, suffix: 'min' },
        { id: 'sessionsPerWeek', label: 'Sessions per week', type: 'number', defaultValue: 3, min: 0, max: 14, step: 1 },
      ],
      results: [
        {
          label: 'Water per session',
          formulaCode: 'areaSqFt * (precipRate * minutes / 60) / 12 * 7.48052',
          suffix: 'gal',
          accent: true,
        },
        {
          label: 'Water per week',
          formulaCode: 'areaSqFt * (precipRate * minutes / 60) / 12 * 7.48052 * sessionsPerWeek',
          suffix: 'gal',
        },
        {
          label: 'Weekly application depth',
          formulaCode: 'precipRate * minutes * sessionsPerWeek / 60',
          suffix: 'in',
        },
        {
          label: 'Water per month',
          formulaCode: 'areaSqFt * (precipRate * minutes / 60) / 12 * 7.48052 * sessionsPerWeek * 4.33',
          suffix: 'gal',
        },
      ],
      formulaDescription:
        'Depth per session = rate x minutes / 60; gallons = area x depth (ft) x 7.48052.',
      tips: [
        'Use the precipitation rate printed on the nozzle chart, or measure it with catch cups. The timer minutes mean little without the rate.',
        'Deep, infrequent watering usually beats a daily light sprinkle because it wets the root zone and reduces evaporation.',
        'Group heads with the same precipitation rate on one zone, or some areas will be overwatered and others starved.',
      ],
    },
    content: {
      intro:
        'The Irrigation Water Calculator converts a sprinkler zone, application rate, and run time into gallons per session, per week, and per month. It also reports the weekly application depth in inches, which is the number to compare with local evapotranspiration and rainfall.',
      howItWorks:
        'Application rate in inches per hour multiplied by run time in minutes, divided by 60, gives the depth applied in one session. That depth is divided by 12 to convert to feet, multiplied by the irrigated area to get cubic feet, then by 7.48052 to get gallons. Multiplying by sessions per week gives the weekly total, and 4.33 weeks gives a monthly estimate.',
      example:
        'A 1,000 sq ft zone at 0.5 in per hour run for 20 minutes applies 0.167 in, or about 1,247 gallons per session. Three sessions a week uses about 3,740 gallons and applies 0.5 in of water per week. A typical month is about 16,195 gallons.',
      formulas: [
        { label: 'Depth per session', expression: 'application rate x minutes / 60' },
        { label: 'Gallons per session', expression: 'area x depth (ft) x 7.48052' },
        { label: 'Weekly depth', expression: 'depth per session x sessions per week' },
        { label: 'Monthly gallons', expression: 'weekly gallons x 4.33' },
      ],
      sources: [
        {
          label: 'US EPA WaterSense - Irrigation Controllers',
          expression: 'Water-efficient irrigation scheduling',
          note: 'Explains how weather-based scheduling and cycle-and-soak reduce waste.',
        },
        {
          label: 'Alliance for Water Efficiency - Landscape Irrigation',
          expression: 'Precipitation rate and distribution uniformity',
          note: 'Background on why matched nozzles and a measured application rate matter.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Water per session',
          explanation:
            'The volume applied to the stated area at the stated rate. It assumes even distribution; a windy site or mismatched nozzles will not deliver it uniformly.',
        },
        {
          resultLabel: 'Weekly application depth',
          explanation:
            'Compare this with local evapotranspiration minus rainfall. If it is below the demand, the lawn is being deficit-irrigated; if it is far above, water is running off or leaching.',
        },
        {
          resultLabel: 'Water per month',
          explanation:
            'Weekly use multiplied by 4.33. It is a planning average, not a bill: rates, season length, and controller adjustments change the real total.',
        },
      ],
      workflowLinks: [
        { slug: 'rainwater-harvest-calculator', step: 'Estimate how much of that demand rain can supply.' },
        { slug: 'mulch-calculator', step: 'Reduce evaporation with an appropriate mulch depth.' },
        { slug: 'topsoil-calculator', step: 'Improve water holding capacity before planting.' },
      ],
      faqs: [
        {
          q: 'What is a precipitation rate?',
          a: 'It is how fast a sprinkler zone applies water, usually in inches per hour. It depends on nozzle flow, spacing, and pressure, not on the timer. Without it, minutes are just a number and cannot be converted to gallons for a given area.',
        },
        {
          q: 'How do I measure my application rate?',
          a: 'Set several straight-sided catch cups across the zone, run the system for 15-20 minutes, and measure the average depth. Multiply by four to get inches per hour for a 15 minute run. This also reveals dry spots and wind distortion.',
        },
        {
          q: 'How often should I water?',
          a: 'Water deeply enough to wet the root zone, then let the surface dry before watering again. The exact interval depends on grass species, soil, weather, and slope. A rain sensor or weather-based controller adjusts automatically and usually saves more than a fixed schedule.',
        },
        {
          q: 'Why does the monthly figure use 4.33 weeks?',
          a: 'A month averages about 4.33 weeks across a year. It is an approximation for planning. For a real water bill, use the actual number of watering days in the billing period and the tiered rates from the utility.',
        },
        {
          q: 'Does this include rain or evapotranspiration?',
          a: 'No. It calculates what the system applies, not what the plants need. Subtract effective rainfall and compare with local evapotranspiration to decide whether the schedule is right. The calculator is a measuring tool, not a scheduling model.',
        },
      ],
      related: ['rainwater-harvest-calculator', 'mulch-calculator', 'topsoil-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'livestock-feed',
    slug: 'livestock-feed-calculator',
    name: 'Livestock Feed Calculator',
    shortDesc: 'Estimate daily and annual feed weight and cost from herd size, body weight, and intake percent.',
    tagline: 'Feed cost per day, per head, per year.',
    category: 'construction',
    iconName: 'Beef',
    badge: 'Agriculture',
    featured: false,
    keywords: [
      'livestock feed calculator',
      'cattle feed cost calculator',
      'feed intake calculator',
      'how much feed per day',
      'herd feed calculator',
      'feed cost per head',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'animals', label: 'Number of animals', type: 'number', defaultValue: 20, min: 1, step: 1 },
        { id: 'avgWeightLb', label: 'Average body weight', type: 'number', defaultValue: 1000, min: 1, suffix: 'lb' },
        { id: 'intakePercent', label: 'Daily intake', type: 'number', defaultValue: 2.5, min: 0.1, max: 10, step: 0.1, suffix: '% of body weight' },
        { id: 'feedCostPerTon', label: 'Feed cost', type: 'number', defaultValue: 300, min: 0, prefix: '$', suffix: '/ton' },
      ],
      results: [
        { label: 'Feed per day', formulaCode: 'animals * avgWeightLb * intakePercent / 100', suffix: 'lb', accent: true },
        {
          label: 'Feed per day in tons',
          formulaCode: 'animals * avgWeightLb * intakePercent / 100 / 2000',
          suffix: 'tons',
        },
        {
          label: 'Daily feed cost',
          formulaCode: 'animals * avgWeightLb * intakePercent / 100 / 2000 * feedCostPerTon',
          prefix: '$',
        },
        {
          label: 'Annual feed cost',
          formulaCode: 'animals * avgWeightLb * intakePercent / 100 / 2000 * feedCostPerTon * 365',
          prefix: '$',
        },
        {
          label: 'Feed per head per day',
          formulaCode: 'avgWeightLb * intakePercent / 100',
          suffix: 'lb',
        },
      ],
      formulaDescription:
        'Daily feed = animals x body weight x intake % / 100; daily cost = daily tons x cost per ton.',
      tips: [
        'Intake percent is usually quoted on a dry matter basis. If your feed is 85 percent dry matter, divide the as-fed weight by 0.85 or adjust the intake figure.',
        'Young, growing, pregnant, and lactating animals eat a higher percentage of body weight than mature dry stock.',
        'Add storage, delivery, and waste. A 5-10 percent feed loss is common with round bales and outdoor feeders.',
      ],
    },
    content: {
      intro:
        'The Livestock Feed Calculator estimates daily feed weight and cost for a herd from the number of animals, average body weight, daily intake as a percentage of body weight, and feed price per ton. It is a budgeting tool for dry matter demand, not a ration formulation.',
      howItWorks:
        'Each animal eats a percentage of its body weight per day, so animals times weight times intake percent divided by 100 gives pounds of feed per day. Dividing by 2,000 converts to tons, which is multiplied by the price per ton for daily cost and by 365 for an annual figure. Feed per head per day is shown separately so you can check the ration against a label.',
      example:
        'Twenty head averaging 1,000 lb at 2.5 percent intake eat 20 x 1,000 x 0.025 = 500 lb of feed a day, or 0.25 tons. At $300 per ton that is $75 a day and $27,375 a year. Each animal eats 25 lb a day.',
      formulas: [
        { label: 'Daily feed', expression: 'animals x body weight x intake % / 100' },
        { label: 'Daily tons', expression: 'daily pounds / 2000' },
        { label: 'Daily cost', expression: 'daily tons x cost per ton' },
        { label: 'Annual cost', expression: 'daily cost x 365' },
      ],
      sources: [
        {
          label: 'National Academies - Nutrient Requirements of Beef Cattle',
          expression: 'Dry matter intake and nutrient requirements',
          note: 'The standard reference for intake and ration formulation by class, weight, and production stage.',
        },
        {
          label: 'USDA National Agricultural Statistics Service - feed price reports',
          expression: 'Regional feed and hay prices',
          note: 'A source for current prices; the calculator uses the price you enter.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Feed per day',
          explanation:
            'Total pounds across the herd. It is only as good as the intake percentage, which varies with feed quality, weather, and animal stage.',
        },
        {
          resultLabel: 'Annual feed cost',
          explanation:
            'Daily cost projected across a full year at the same price and intake. Real costs move with seasons and feed quality, so treat it as a budget baseline.',
        },
        {
          resultLabel: 'Feed per head per day',
          explanation:
            'The ration check. Compare it with the feeding guide for the animal class and the dry matter content of the feed.',
        },
      ],
      workflowLinks: [
        { slug: 'price-per-unit-calculator', step: 'Compare feed prices on a cost per pound or per ton basis.' },
        { slug: 'meal-cost-calculator', step: 'Apply the same cost-per-serving logic to a household budget.' },
        { slug: 'pet-food-calculator', step: 'Estimate daily calories for companion animals instead of livestock.' },
      ],
      faqs: [
        {
          q: 'What intake percentage should I use?',
          a: 'Mature dry cattle often eat about 2-2.5 percent of body weight in dry matter; growing or lactating animals can exceed 3 percent. Sheep and goats differ, and feed quality changes intake. Use a ration guide for the specific class rather than a single herd average.',
        },
        {
          q: 'Is this dry matter or as-fed weight?',
          a: 'The percentage is normally a dry matter figure. If you weigh out as-fed silage or hay, divide the dry matter requirement by the feed dry matter fraction to get the as-fed weight. For hay at 88 percent dry matter, 25 lb of dry matter is about 28.4 lb as fed.',
        },
        {
          q: 'Does the calculator include waste?',
          a: 'No. It estimates what the animals eat, not what you put in the feeder. Round bales, outdoor feeding, and storage losses can add 5-15 percent. Add a waste factor to the order quantity, not to the animal requirement.',
        },
        {
          q: 'Can I use this for poultry or pigs?',
          a: 'It works arithmetically, but the intake percentages are different and poultry rations are usually formulated by age and production stage rather than body weight percentage. Use the species-specific feeding guide and treat this as a rough cost estimate only.',
        },
        {
          q: 'Why is the annual cost so sensitive to the price per ton?',
          a: 'Feed is bought in tons but eaten in pounds, so a small price change multiplies across the whole herd and the whole year. A $20 per ton difference on 91 tons is $1,825 a year. Locking in quality feed at a known price matters more than a small change in intake.',
        },
      ],
      related: ['price-per-unit-calculator', 'meal-cost-calculator', 'pet-food-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.78 },
  },
  {
    id: 'firewood',
    slug: 'firewood-calculator',
    name: 'Firewood Calculator',
    shortDesc: 'Convert a stacked woodpile into cubic feet, cords, face cords, and cubic metres.',
    tagline: 'A cord is a volume, not a pickup load.',
    category: 'construction',
    iconName: 'Flame',
    badge: 'Heating',
    featured: false,
    keywords: [
      'firewood calculator',
      'how much firewood do i need',
      'cord of wood calculator',
      'face cord calculator',
      'firewood volume calculator',
      'stacked wood calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'lengthFt', label: 'Stack length', type: 'number', defaultValue: 8, min: 0.1, suffix: 'ft' },
        { id: 'heightFt', label: 'Stack height', type: 'number', defaultValue: 4, min: 0.1, suffix: 'ft' },
        { id: 'depthFt', label: 'Log length (stack depth)', type: 'number', defaultValue: 2, min: 0.1, suffix: 'ft' },
      ],
      results: [
        { label: 'Stacked volume', formulaCode: 'lengthFt * heightFt * depthFt', suffix: 'cu ft', accent: true },
        { label: 'Full cords', formulaCode: 'lengthFt * heightFt * depthFt / 128' },
        { label: 'Face cords (16 in)', formulaCode: 'lengthFt * heightFt * depthFt / (8 * 4 * 16 / 12)' },
        { label: 'Cubic metres', formulaCode: 'lengthFt * heightFt * depthFt * 0.0283168', suffix: 'm3' },
      ],
      formulaDescription: 'Volume = length x height x depth; cords = cubic feet / 128.',
      tips: [
        'A full cord is 128 cubic feet of stacked wood, including the air gaps between pieces. It is not 128 cubic feet of solid wood.',
        'A face cord is a stack 8 ft long and 4 ft high with logs cut to a shorter length. Its volume depends on the log length, so it is not a fixed unit.',
        'Loose-piled or thrown wood measures larger than a neatly stacked cord. Measure after stacking, not after dumping.',
      ],
    },
    content: {
      intro:
        'The Firewood Calculator converts the dimensions of a stacked woodpile into cubic feet, full cords, face cords, and cubic metres. It is the fastest way to check whether a seller is offering a real cord or a stack that only looks like one.',
      howItWorks:
        'Stack length times height times depth gives stacked volume in cubic feet, including the air spaces between logs. A full cord is defined as 128 cubic feet, traditionally 8 ft long by 4 ft high by 4 ft deep. Dividing the stack volume by 128 gives cords. A face cord is the same 8 ft by 4 ft face with a shorter log length, so the divisor changes with the depth.',
      example:
        'A stack 8 ft long, 4 ft high, and 2 ft deep is 64 cubic feet. That is 0.5 of a full cord. With 16 in logs it is 1.5 face cords, and it is about 1.81 cubic metres.',
      formulas: [
        { label: 'Stacked volume', expression: 'length x height x depth' },
        { label: 'Full cords', expression: 'stacked cubic feet / 128' },
        { label: 'Face cords', expression: 'stacked cubic feet / (8 x 4 x log length in ft)' },
        { label: 'Cubic metres', expression: 'cubic feet x 0.0283168' },
      ],
      sources: [
        {
          label: 'USDA Forest Service - Wood as Fuel',
          expression: 'Wood volume, weight, and heating value',
          note: 'Explains cord measure, species density, and why weight is a poor substitute for volume.',
        },
        {
          label: 'US EPA Burn Wise - Firewood and Wood Heater Guidance',
          expression: 'Seasoning and efficient burning',
          note: 'Guidance on drying wood and burning it cleanly, which affects usable heat more than volume alone.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Full cords',
          explanation:
            'Stacked volume divided by 128. A legal cord is a measure of stacked volume, so neat stacking and honest dimensions are what you are paying for.',
        },
        {
          resultLabel: 'Face cords',
          explanation:
            'A stack 8 ft by 4 ft with the log length you entered. Because the depth varies, a face cord is not a standard amount of wood and should not be priced as one.',
        },
        {
          resultLabel: 'Cubic metres',
          explanation:
            'Useful when buying from a supplier who quotes metric volume. One cubic metre is about 0.276 cords.',
        },
      ],
      workflowLinks: [
        { slug: 'btu-calculator', step: 'Estimate the heat demand the wood is meant to meet.' },
        { slug: 'insulation-calculator', step: 'Reduce demand before buying more fuel.' },
        { slug: 'room-volume-calculator', step: 'Measure the space being heated.' },
      ],
      faqs: [
        {
          q: 'What is the difference between a cord and a face cord?',
          a: 'A full cord is 128 cubic feet of stacked wood, usually 8 ft by 4 ft by 4 ft. A face cord is the same 8 ft by 4 ft face but only one log deep. A face cord of 16 in logs is one third of a cord; with 24 in logs it is half a cord.',
        },
        {
          q: 'How many cubic feet are in a cord?',
          a: 'Exactly 128 cubic feet of stacked volume in the usual US definition. That includes the air gaps. The solid wood content is lower, often 60-70 percent of the stack depending on how the pieces are split and stacked.',
        },
        {
          q: 'Is a pickup truck load a cord?',
          a: 'Usually not. A full-size pickup bed with a standard 6.5 ft bed holds roughly 50 cubic feet level with the rails, which is under half a cord. A heaped load may look larger but is not a reliable measure. Ask for the stack dimensions or buy by the cord from a reputable seller.',
        },
        {
          q: 'How long should firewood season?',
          a: 'Most hardwood needs 6-12 months after splitting and stacking, with airflow and a cover that keeps rain off but lets moisture out. Unseasoned wood burns cool, smokes, and deposits creosote. A moisture meter should read around 15-20 percent on a freshly split face.',
        },
        {
          q: 'Does species change the value of a cord?',
          a: 'Yes. Dense hardwoods such as oak and hickory deliver more heat per cord than softwoods, which is why price per cord varies. A cord is still a cord by volume, but the usable energy and how often you refill the stove are different.',
        },
      ],
      related: ['btu-calculator', 'insulation-calculator', 'room-volume-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'solar-panel',
    slug: 'solar-panel-calculator',
    name: 'Solar Panel Calculator',
    shortDesc: 'Size a solar array from annual electricity use, peak sun hours, panel wattage, and system losses.',
    tagline: 'From a power bill to a panel count.',
    category: 'construction',
    iconName: 'Zap',
    badge: 'Energy',
    featured: false,
    keywords: [
      'solar panel calculator',
      'how many solar panels do i need',
      'solar system size calculator',
      'solar array calculator',
      'solar panel count',
      'solar payback calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'annualKwh', label: 'Annual electricity use', type: 'number', defaultValue: 10000, min: 1, suffix: 'kWh' },
        { id: 'sunHours', label: 'Peak sun hours per day', type: 'number', defaultValue: 4.5, min: 0.5, max: 10, step: 0.1, suffix: 'h' },
        { id: 'panelWatts', label: 'Panel size', type: 'number', defaultValue: 400, min: 50, suffix: 'W' },
        { id: 'losses', label: 'System losses', type: 'number', defaultValue: 15, min: 0, max: 50, suffix: '%' },
        { id: 'panelAreaSqFt', label: 'Roof area per panel', type: 'number', defaultValue: 18, min: 1, suffix: 'sq ft' },
      ],
      results: [
        {
          label: 'Array size needed',
          formulaCode: 'annualKwh / (365 * sunHours * (1 - losses / 100))',
          suffix: 'kW',
          accent: true,
        },
        {
          label: 'Panels needed',
          formulaCode: 'Math.ceil(annualKwh / (365 * sunHours * (1 - losses / 100)) * 1000 / panelWatts)',
        },
        {
          label: 'Estimated annual generation',
          formulaCode:
            'Math.ceil(annualKwh / (365 * sunHours * (1 - losses / 100)) * 1000 / panelWatts) * panelWatts * sunHours * 365 * (1 - losses / 100) / 1000',
          suffix: 'kWh',
        },
        {
          label: 'Roof area needed',
          formulaCode: 'Math.ceil(annualKwh / (365 * sunHours * (1 - losses / 100)) * 1000 / panelWatts) * panelAreaSqFt',
          suffix: 'sq ft',
        },
        {
          label: 'Array size installed',
          formulaCode: 'Math.ceil(annualKwh / (365 * sunHours * (1 - losses / 100)) * 1000 / panelWatts) * panelWatts / 1000',
          suffix: 'kW',
        },
      ],
      formulaDescription:
        'Array kW = annual kWh / (365 x peak sun hours x (1 - losses)); panels = ceiling(array W / panel W).',
      tips: [
        'Peak sun hours are not daylight hours. They are the equivalent hours of full-strength sun, typically 3-6 in the US depending on location and season.',
        'System losses of 10-20 percent cover inverter conversion, wiring, soiling, heat, and mismatch. Keep the figure honest rather than optimistic.',
        'Panel count is rounded up, so the installed array usually generates slightly more than the target. Use the installed size for cost and interconnection planning.',
      ],
    },
    content: {
      intro:
        'The Solar Panel Calculator sizes an array from annual electricity use, peak sun hours, panel wattage, and system losses. It returns the array size needed, the number of panels after rounding, the roof area, and the generation the rounded array should produce.',
      howItWorks:
        'Annual kWh is divided by 365 to get daily use, then by peak sun hours and by the efficiency remaining after losses. That gives the direct current array size in kilowatts. Multiplying by 1,000 and dividing by panel wattage gives a fractional panel count, which is rounded up. The installed array size and estimated generation are recalculated from the whole panel count so the numbers agree.',
      example:
        'A home using 10,000 kWh a year in a 4.5 peak sun hour location with 15 percent losses needs 10,000 / (365 x 4.5 x 0.85) = 7.16 kW. At 400 W per panel that is 18 panels, an installed array of 7.2 kW, roughly 10,052 kWh a year, and about 324 sq ft of roof area.',
      formulas: [
        { label: 'Array size', expression: 'annual kWh / (365 x peak sun hours x (1 - losses))' },
        { label: 'Panels', expression: 'ceiling(array watts / panel watts)' },
        { label: 'Installed generation', expression: 'panels x panel watts x sun hours x 365 x (1 - losses) / 1000' },
        { label: 'Roof area', expression: 'panels x area per panel' },
      ],
      sources: [
        {
          label: 'National Renewable Energy Laboratory - PVWatts Calculator',
          expression: 'Hourly PV energy production model',
          note: 'A location-specific simulation that accounts for weather, tilt, and orientation better than a hand calculation.',
        },
        {
          label: 'US Department of Energy - Solar Energy Technologies Office',
          expression: 'Solar system sizing and performance basics',
          note: 'Background on capacity, capacity factor, and why real output differs from nameplate rating.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Array size needed',
          explanation:
            'The direct current size before rounding to whole panels. It is a planning target, not a hardware configuration.',
        },
        {
          resultLabel: 'Panels needed',
          explanation:
            'Whole panels at your wattage, rounded up. Panel dimensions and wattage vary, so confirm the actual product before committing to a layout.',
        },
        {
          resultLabel: 'Estimated annual generation',
          explanation:
            'What the rounded array should produce under the assumed sun hours and losses. Real output varies by weather, shading, tilt, and inverter clipping.',
        },
      ],
      workflowLinks: [
        { slug: 'electricity-cost-calculator', step: 'Value the generated kWh at your actual tariff.' },
        { slug: 'generator-size-calculator', step: 'Plan backup power for the loads the array does not cover at night.' },
        { slug: 'btu-calculator', step: 'Check whether heating or cooling is the largest load to offset.' },
      ],
      faqs: [
        {
          q: 'How many solar panels do I need for a normal house?',
          a: 'It depends on consumption, location, panel wattage, and roof orientation. A low-use home in a sunny climate may need 10-14 panels; a high-use home in a cloudy region may need 25 or more. Use your own annual kWh rather than a national average.',
        },
        {
          q: 'What are peak sun hours?',
          a: 'A measure of solar energy received per day expressed as hours of full-strength sun. Four peak sun hours means the day delivered the equivalent of four hours at 1,000 W per square metre. It is not the length of the day, and it changes with season.',
        },
        {
          q: 'What system losses should I assume?',
          a: 'Ten to twenty percent is a reasonable range for a residential system, covering inverter conversion, wiring, soiling, temperature, and module mismatch. Shade, snow, and an undersized inverter can push losses higher. A site-specific simulation is more accurate.',
        },
        {
          q: 'Does the calculator account for shading and roof orientation?',
          a: 'No. It assumes the array faces the sun well and is unshaded at the peak. A north-facing roof, a chimney shadow, or a steep pitch can cut output substantially. Use a shade study or PVWatts with your actual tilt and azimuth before sizing.',
        },
        {
          q: 'Should I size to 100 percent of my use?',
          a: 'That is a common starting point, but the best size depends on net metering, export rates, battery economics, and budget. In some tariffs, offsetting evening load with a battery is worth more than adding panels that export at a low rate. Model the tariff, not just the kWh.',
        },
      ],
      related: ['electricity-cost-calculator', 'generator-size-calculator', 'btu-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.84 },
  },
  {
    id: 'generator-size',
    slug: 'generator-size-calculator',
    name: 'Generator Size Calculator',
    shortDesc: 'Add up running and starting watts, apply headroom, and see the generator size and kVA to look for.',
    tagline: 'Starting watts decide the generator, not running watts.',
    category: 'construction',
    iconName: 'Plug',
    badge: 'Power',
    featured: false,
    keywords: [
      'generator size calculator',
      'what size generator do i need',
      'generator wattage calculator',
      'starting watts calculator',
      'generator kva calculator',
      'home backup generator sizing',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'runningWatts', label: 'Running watts', type: 'number', defaultValue: 3500, min: 1, suffix: 'W' },
        { id: 'surgeWatts', label: 'Surge watts', type: 'number', defaultValue: 6000, min: 0, suffix: 'W' },
        { id: 'headroom', label: 'Headroom', type: 'number', defaultValue: 20, min: 0, max: 100, suffix: '%' },
        { id: 'powerFactor', label: 'Power factor', type: 'number', defaultValue: 0.8, min: 0.5, max: 1, step: 0.05 },
      ],
      results: [
        {
          label: 'Recommended running watts',
          formulaCode: 'runningWatts * (1 + headroom / 100)',
          suffix: 'W',
          accent: true,
        },
        {
          label: 'Surge to cover',
          formulaCode: 'Math.max(surgeWatts, runningWatts * (1 + headroom / 100))',
          suffix: 'W',
        },
        {
          label: 'Generator kVA',
          formulaCode: 'runningWatts * (1 + headroom / 100) / powerFactor / 1000',
          suffix: 'kVA',
        },
        {
          label: 'Spare capacity at surge',
          formulaCode: 'Math.max(surgeWatts, runningWatts * (1 + headroom / 100)) - runningWatts',
          suffix: 'W',
        },
      ],
      formulaDescription:
        'Recommended running = running watts x (1 + headroom); kVA = running watts / power factor / 1000.',
      tips: [
        'Start the largest motor first, then add the rest. Surge watts are not simply the sum of every appliance starting at once.',
        'A conventional generator must cover the surge; an inverter generator may handle motor starting differently. Check the product surge rating and duration.',
        'Power factor converts watts to volt-amperes. A 0.8 power factor means 4,000 W needs about 5 kVA of generator capacity.',
      ],
    },
    content: {
      intro:
        'The Generator Size Calculator takes the running and starting watts of the loads you want to back up, adds headroom, and reports the generator size to shop for in watts and kVA. It is a load-planning tool, not a substitute for a transfer switch and a licensed electrical design.',
      howItWorks:
        'Running watts are summed across everything that will operate at once. Headroom is added because generators are rated at sea level under standard conditions and should not run at their limit. The larger of the surge watts and the recommended running watts becomes the starting requirement. kVA is running watts divided by power factor and 1,000, because generators are often sold in volt-amperes rather than watts.',
      example:
        'A backup panel with 3,500 running watts and a 6,000 W well pump surge, plus 20 percent headroom, needs 4,200 running watts. The surge to cover is max(6,000, 4,200) = 6,000 W. At a 0.8 power factor the generator is 4,200 / 0.8 / 1000 = 5.25 kVA.',
      formulas: [
        { label: 'Recommended running', expression: 'running watts x (1 + headroom)' },
        { label: 'Surge to cover', expression: 'max(surge watts, recommended running)' },
        { label: 'kVA', expression: 'running watts / power factor / 1000' },
        { label: 'Spare surge capacity', expression: 'surge to cover - running watts' },
      ],
      sources: [
        {
          label: 'NFPA 70 National Electrical Code - Article 702, Optional Standby Systems',
          expression: 'Installation requirements for standby power',
          note: 'Covers transfer equipment and the separation of utility and generator supply. Local amendments apply.',
        },
        {
          label: 'Portable Generator Manufacturers Association - sizing guidance',
          expression: 'Running versus starting watts',
          note: 'Industry guidance on motor starting and generator load planning.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Recommended running watts',
          explanation:
            'The continuous load plus headroom. A generator run near its rating for hours is loud, inefficient, and short-lived.',
        },
        {
          resultLabel: 'Surge to cover',
          explanation:
            'The largest short-term demand, usually a motor starting. If the generator cannot supply it, the motor stalls or the breaker trips.',
        },
        {
          resultLabel: 'Generator kVA',
          explanation:
            'The volt-ampere rating to compare with generator labels. Watts and volt-amperes are only equal at a power factor of 1.',
        },
      ],
      workflowLinks: [
        { slug: 'electricity-cost-calculator', step: 'Estimate the cost of running the backed-up loads.' },
        { slug: 'solar-panel-calculator', step: 'Compare generator backup with a solar and battery system.' },
        { slug: 'ohms-law-calculator', step: 'Check current and voltage relationships for the circuits involved.' },
      ],
      faqs: [
        {
          q: 'What is the difference between running watts and starting watts?',
          a: 'Running watts are the continuous draw once a device is operating. Starting watts, also called surge watts, are the brief higher draw when a motor starts. Refrigerators, well pumps, furnaces, and air conditioners can draw two to three times their running watts for a few seconds.',
        },
        {
          q: 'Should I add up the starting watts of every appliance?',
          a: 'No. Start the largest motor first, then let it run before starting the next. The generator only has to cover the surge of the last motor plus the running load of everything already on. Adding every surge together over-sizes the generator and wastes fuel.',
        },
        {
          q: 'Do I need a transfer switch?',
          a: 'Yes for a permanently connected generator. A transfer switch prevents backfeeding the utility, which can injure line workers and damage equipment. Portable generators should use a properly rated inlet and interlock, never a suicide cord.',
        },
        {
          q: 'Why is the generator rating in kVA instead of watts?',
          a: 'Alternators are limited by current and voltage, which gives volt-amperes. Real power in watts depends on the power factor of the load. A 5 kVA generator at 0.8 power factor delivers about 4 kW; resistive loads use the full ratio, motors do not.',
        },
        {
          q: 'Does altitude or temperature affect generator capacity?',
          a: 'Yes. Engine-driven generators lose output at high altitude and in high ambient temperatures, and the manufacturer derating chart should be applied. A unit rated at sea level may not carry the same load at 8,000 ft or in a heatwave.',
        },
      ],
      related: ['electricity-cost-calculator', 'solar-panel-calculator', 'ohms-law-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'rebar',
    slug: 'rebar-calculator',
    name: 'Rebar Calculator',
    shortDesc: 'Estimate rebar linear feet, stock bars, and weight for a slab grid at your spacing and bar size.',
    tagline: 'Count both directions before you order steel.',
    category: 'construction',
    iconName: 'Hammer',
    badge: 'Concrete',
    featured: false,
    keywords: [
      'rebar calculator',
      'how much rebar do i need',
      'rebar spacing calculator',
      'rebar weight calculator',
      'slab rebar calculator',
      'rebar grid calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'slabLengthFt', label: 'Slab length', type: 'number', defaultValue: 20, min: 1, suffix: 'ft' },
        { id: 'slabWidthFt', label: 'Slab width', type: 'number', defaultValue: 10, min: 1, suffix: 'ft' },
        { id: 'spacingIn', label: 'Bar spacing', type: 'number', defaultValue: 12, min: 3, suffix: 'in' },
        { id: 'barLengthFt', label: 'Stock bar length', type: 'number', defaultValue: 20, min: 1, suffix: 'ft' },
        { id: 'barWeight', label: 'Bar weight', type: 'number', defaultValue: 0.668, min: 0.05, step: 0.001, suffix: 'lb/ft' },
        { id: 'waste', label: 'Lap and waste', type: 'number', defaultValue: 5, min: 0, max: 50, suffix: '%' },
      ],
      results: [
        {
          label: 'Total rebar length',
          formulaCode:
            '(Math.floor(slabWidthFt * 12 / spacingIn) + 1) * slabLengthFt + (Math.floor(slabLengthFt * 12 / spacingIn) + 1) * slabWidthFt',
          suffix: 'ft',
          accent: true,
        },
        {
          label: 'Length with laps and waste',
          formulaCode:
            '((Math.floor(slabWidthFt * 12 / spacingIn) + 1) * slabLengthFt + (Math.floor(slabLengthFt * 12 / spacingIn) + 1) * slabWidthFt) * (1 + waste / 100)',
          suffix: 'ft',
        },
        {
          label: 'Stock bars',
          formulaCode:
            'Math.ceil(((Math.floor(slabWidthFt * 12 / spacingIn) + 1) * slabLengthFt + (Math.floor(slabLengthFt * 12 / spacingIn) + 1) * slabWidthFt) * (1 + waste / 100) / barLengthFt)',
        },
        {
          label: 'Estimated weight',
          formulaCode:
            '((Math.floor(slabWidthFt * 12 / spacingIn) + 1) * slabLengthFt + (Math.floor(slabLengthFt * 12 / spacingIn) + 1) * slabWidthFt) * (1 + waste / 100) * barWeight',
          suffix: 'lb',
        },
      ],
      formulaDescription:
        'Bars each way = floor(dimension in inches / spacing) + 1; total length = bars x other dimension, both directions.',
      tips: [
        'Number 4 bar is about 0.668 lb per foot. Number 3 is about 0.376, number 5 about 1.043, and number 6 about 1.502.',
        'Add lap splice length where bars join. A common starting point is 40 bar diameters, but the structural design and code govern.',
        'Rebar needs chairs or bar supports to stay at the designed depth. Steel lying on the ground does not reinforce the slab.',
      ],
    },
    content: {
      intro:
        'The Rebar Calculator estimates the linear feet of reinforcing bar in a two-way slab grid, then converts it to stock bars and weight. It counts bars in both directions from the slab dimensions and spacing, because a one-direction estimate is a common and expensive mistake.',
      howItWorks:
        'Bars running one way are spaced across the other dimension. The width in inches is divided by spacing, rounded down, and one is added for the starting bar. That count is multiplied by the slab length. The same is done in the other direction, and the two lengths are added. Lap and waste percentage increases the total, which is then divided by stock bar length and multiplied by bar weight.',
      example:
        'A 20 ft by 10 ft slab at 12 in spacing has floor(120/12) + 1 = 11 bars running the 20 ft length, or 220 ft, and floor(240/12) + 1 = 21 bars running the 10 ft width, or 210 ft. Total is 430 ft. With 5 percent laps and waste that is 451.5 ft, 23 stock bars at 20 ft, and about 301.6 lb of number 4 bar.',
      formulas: [
        { label: 'Bars in one direction', expression: 'floor(other dimension in inches / spacing) + 1' },
        { label: 'Total length', expression: 'bars along length x length + bars along width x width' },
        { label: 'Stock bars', expression: 'ceiling(total length x (1 + waste) / stock length)' },
        { label: 'Weight', expression: 'total length x bar weight' },
      ],
      sources: [
        {
          label: 'ACI 318 - Building Code Requirements for Structural Concrete',
          expression: 'Reinforcement detailing and lap splices',
          note: 'The design standard behind spacing, cover, and splice requirements for structural concrete.',
        },
        {
          label: 'CRSI - Placing Reinforcing Bars',
          expression: 'Field placing, supports, and laps',
          note: 'Practical guidance on chairs, cover, and splice placement.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Total rebar length',
          explanation:
            'The grid length before laps. It includes the extra bar at each edge, which is why the count is spacing plus one rather than area divided by spacing.',
        },
        {
          resultLabel: 'Stock bars',
          explanation:
            'Whole bars to buy at your stock length. Cutting and lapping means the usable length per bar is less than the nominal length.',
        },
        {
          resultLabel: 'Estimated weight',
          explanation:
            'Length times unit weight. Use it for transport and handling planning, not as a substitute for a mill certificate or a supplier quote.',
        },
      ],
      workflowLinks: [
        { slug: 'concrete-calculator', step: 'Order the concrete for the slab the steel goes into.' },
        { slug: 'post-hole-concrete-calculator', step: 'Size the concrete for post footings.' },
        { slug: 'lumber-calculator', step: 'Plan formwork lumber for the pour.' },
      ],
      faqs: [
        {
          q: 'How much does rebar weigh per foot?',
          a: 'Number 3 is about 0.376 lb/ft, number 4 about 0.668, number 5 about 1.043, number 6 about 1.502, and number 8 about 2.670. The calculator takes the unit weight as an input so you can match the bar you are using.',
        },
        {
          q: 'What spacing should I use for a slab?',
          a: 'Residential slabs often use a 12 in to 24 in grid, but the correct spacing depends on the slab thickness, loads, subgrade, and whether it is structural. Follow the engineered design or the prescriptive code for your situation; this tool only measures the grid you specify.',
        },
        {
          q: 'Does the waste percentage cover lap splices?',
          a: 'It can, if you set it high enough, but laps are better calculated explicitly. A lap of 40 bar diameters on number 4 bar is about 20 in, and a 20 ft bar cannot span a 20 ft slab without a lap. Add the lap length or order longer bars.',
        },
        {
          q: 'Can I use welded wire mesh instead?',
          a: 'Sometimes, for crack control in a lightly loaded slab. Mesh is easier to place but must be supported at the correct height and lapped properly. Structural reinforcement should follow the design, not a substitution based on convenience.',
        },
        {
          q: 'Do I need rebar in a driveway slab?',
          a: 'Most driveway slabs benefit from reinforcement or mesh, but thickness, base preparation, jointing, and drainage matter as much as the steel. A 4 in slab on poor subgrade will crack regardless of a light grid. Ask for a local design rather than scaling up a patio detail.',
        },
      ],
      related: ['concrete-calculator', 'post-hole-concrete-calculator', 'lumber-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'post-hole-concrete',
    slug: 'post-hole-concrete-calculator',
    name: 'Post Hole Concrete Calculator',
    shortDesc: 'Calculate concrete volume per post hole after subtracting the post, plus bags at your yield.',
    tagline: 'The post displaces more concrete than you think.',
    category: 'construction',
    iconName: 'Cuboid',
    badge: 'Concrete',
    featured: false,
    keywords: [
      'post hole concrete calculator',
      'how many bags of concrete per post',
      'fence post concrete calculator',
      'deck post concrete',
      'post hole volume calculator',
      'concrete bag calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'holeDiameterIn', label: 'Hole diameter', type: 'number', defaultValue: 10, min: 1, suffix: 'in' },
        { id: 'holeDepthIn', label: 'Hole depth', type: 'number', defaultValue: 36, min: 1, suffix: 'in' },
        { id: 'postWidthIn', label: 'Post width', type: 'number', defaultValue: 4, min: 0, suffix: 'in' },
        { id: 'posts', label: 'Number of posts', type: 'number', defaultValue: 8, min: 1, step: 1 },
        { id: 'bagYield', label: 'Bag yield', type: 'number', defaultValue: 0.6, min: 0.1, step: 0.05, suffix: 'cu ft' },
      ],
      results: [
        {
          label: 'Concrete per hole',
          formulaCode: '(Math.PI * Math.pow(holeDiameterIn / 2, 2) * holeDepthIn - Math.pow(postWidthIn, 2) * holeDepthIn) / 1728',
          suffix: 'cu ft',
          accent: true,
        },
        {
          label: 'Total concrete',
          formulaCode:
            '((Math.PI * Math.pow(holeDiameterIn / 2, 2) * holeDepthIn - Math.pow(postWidthIn, 2) * holeDepthIn) / 1728) * posts',
          suffix: 'cu ft',
        },
        {
          label: 'Bags required',
          formulaCode:
            'Math.ceil(((Math.PI * Math.pow(holeDiameterIn / 2, 2) * holeDepthIn - Math.pow(postWidthIn, 2) * holeDepthIn) / 1728) * posts / bagYield)',
        },
        {
          label: 'Total weight',
          formulaCode:
            '((Math.PI * Math.pow(holeDiameterIn / 2, 2) * holeDepthIn - Math.pow(postWidthIn, 2) * holeDepthIn) / 1728) * posts * 145',
          suffix: 'lb',
        },
      ],
      formulaDescription:
        'Per hole = (cylinder volume - post volume) / 1728; bags = ceiling(total / bag yield).',
      tips: [
        'An 80 lb bag of concrete mix yields about 0.6 cubic feet; a 50 lb bag yields about 0.375. Always check the bag label.',
        'The post is subtracted as a square section. A round post displaces less, and a post with a base plate displaces more.',
        'Set the post above the concrete so it does not sit in a water trap, and slope the concrete away from the post.',
      ],
    },
    content: {
      intro:
        'The Post Hole Concrete Calculator estimates the concrete needed for fence, deck, and mailbox posts by subtracting the buried post from the cylindrical hole. It reports volume per hole, total volume, bags at your yield, and the weight of the cured concrete.',
      howItWorks:
        'The hole is treated as a cylinder: pi times radius squared times depth. The buried post is treated as a square prism: width squared times the same depth. Subtracting the post gives the net concrete volume in cubic inches, which is divided by 1,728 to convert to cubic feet. Multiplying by the number of posts gives the total, which is divided by the bag yield and rounded up.',
      example:
        'A 10 in diameter hole 36 in deep has 2,827 cubic inches. A 4 in by 4 in post displaces 576 cubic inches, leaving 2,251 cubic inches, or 1.30 cubic feet per hole. Eight posts need 10.42 cubic feet, which is 18 bags at 0.6 cubic feet each, and about 1,511 lb of cured concrete.',
      formulas: [
        { label: 'Hole volume', expression: 'pi x radius squared x depth' },
        { label: 'Post volume', expression: 'post width squared x depth' },
        { label: 'Net concrete per hole', expression: '(hole - post) / 1728 cubic feet' },
        { label: 'Bags', expression: 'ceiling(total cubic feet / bag yield)' },
      ],
      sources: [
        {
          label: 'ACI 332 - Residential Code for Concrete Construction',
          expression: 'Residential concrete practice',
          note: 'Guidance on footings and concrete placement for residential work.',
        },
        {
          label: 'International Residential Code - Footings and Foundations',
          expression: 'Frost depth and footing requirements',
          note: 'Local frost depth and footing rules govern how deep a post support must be.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Concrete per hole',
          explanation:
            'Net volume after the post is subtracted. It assumes the post runs the full depth of the hole and the hole is a clean cylinder.',
        },
        {
          resultLabel: 'Bags required',
          explanation:
            'Whole bags at your yield, rounded up. Bag yield varies by mix and by how much water is added, so a little spare is sensible.',
        },
        {
          resultLabel: 'Total weight',
          explanation:
            'Cured concrete at about 145 lb per cubic foot. Use it to plan transport and to check a vehicle or trailer load.',
        },
      ],
      workflowLinks: [
        { slug: 'concrete-calculator', step: 'Compare a slab pour with the post footings.' },
        { slug: 'fence-calculator', step: 'Plan the posts, rails, and panels around the footings.' },
        { slug: 'rebar-calculator', step: 'Add reinforcement to a structural footing or pier.' },
      ],
      faqs: [
        {
          q: 'How many bags of concrete do I need per fence post?',
          a: 'It depends on hole diameter and depth. A 10 in hole 36 in deep with a 4 in post needs about 1.3 cubic feet, which is roughly 2.2 bags of 80 lb mix. Shallow or narrow holes need less; a wide hole in frozen ground needs more.',
        },
        {
          q: 'Should the post sit on gravel at the bottom of the hole?',
          a: 'A few inches of compacted gravel improves drainage and gives the post a stable base, but it reduces the concrete depth. Add the gravel thickness to the hole depth so the concrete still reaches the required embedment, and check local frost depth requirements.',
        },
        {
          q: 'How deep should a post hole be?',
          a: 'Below the local frost line for structural posts, and deep enough for the lateral load the post carries. Fence posts often use one third of their above-ground height in the ground, but a deck or pergola needs an engineered footing. Local code is the starting point.',
        },
        {
          q: 'Does the calculator subtract the post correctly for a round post?',
          a: 'It subtracts a square section of the width you enter, which is conservative for a round post. For a 6 in round post, enter about 5.3 in as the equivalent square, or expect a slight overestimate. Overestimating concrete is safer than running short mid-pour.',
        },
        {
          q: 'Can I use fast-setting concrete without mixing?',
          a: 'Some fast-setting mixes are designed to be poured dry into the hole and wetted, but the volume needed is the same. Follow the bag instructions exactly, because the water ratio affects strength. Do not use a fast-set mix where you need to adjust the post after it starts to cure.',
        },
      ],
      related: ['concrete-calculator', 'fence-calculator', 'rebar-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.82 },
  }
];