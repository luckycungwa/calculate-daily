import { CalculatorMeta } from '../../types';

export const SCIENCE_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'molarity',
    slug: 'molarity-calculator',
    name: 'Molarity Calculator',
    shortDesc: 'Convert solute mass, molar mass, and solution volume into molarity and millimolarity.',
    tagline: 'Mass, moles, and volume in one step.',
    category: 'science',
    iconName: 'FlaskConical',
    badge: 'Chemistry',
    featured: true,
    keywords: [
      'molarity calculator',
      'molar concentration calculator',
      'moles to molarity',
      'molar solution calculator',
      'mmol calculator',
      'concentration calculator chemistry',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'mass', label: 'Mass of solute', type: 'number', defaultValue: 5.844, min: 0, step: 0.001, suffix: 'g' },
        { id: 'molarMass', label: 'Molar mass of solute', type: 'number', defaultValue: 58.44, min: 0.001, step: 0.01, suffix: 'g/mol' },
        { id: 'volumeMl', label: 'Final solution volume', type: 'number', defaultValue: 1000, min: 0.001, step: 1, suffix: 'mL' },
      ],
      results: [
        {
          label: 'Molarity',
          formulaCode: 'mass / molarMass / (volumeMl / 1000)',
          suffix: 'M',
          accent: true,
        },
        {
          label: 'Millimolarity',
          formulaCode: '(mass / molarMass / (volumeMl / 1000)) * 1000',
          suffix: 'mM',
        },
        { label: 'Moles of solute', formulaCode: 'mass / molarMass', suffix: 'mol' },
        { label: 'Millimoles of solute', formulaCode: '(mass / molarMass) * 1000', suffix: 'mmol' },
      ],
      formulaDescription: 'Molarity (M) = mass ÷ molar mass ÷ volume in litres',
      tips: [
        'Volume is the final volume of the solution, not the volume of water added. Dissolving a solid can change the total volume.',
        'Molar mass must match the formula you actually weighed. Hydrated salts include their water of crystallisation.',
        'Molarity changes slightly with temperature because the solution expands; molality does not.',
      ],
    },
    content: {
      intro:
        'The Molarity Calculator turns a weighed mass of solute and a final solution volume into molar concentration. It also reports the amount of substance in moles and millimoles, which is the bridge between a balance reading and the concentration written on a lab label.',
      howItWorks:
        'Dividing mass by molar mass gives moles. Dividing moles by the final volume in litres gives molarity, in moles per litre. Millimolarity is simply molarity multiplied by a thousand, which is why a 0.1 M solution is also 100 mM.',
      example:
        'Weigh 5.844 g of sodium chloride (58.44 g/mol) and make the solution up to 1,000 mL. That is 0.1 mol in 1 L, so the molarity is 0.100 M, or 100 mM. The same mass made up to 500 mL would be 0.200 M.',
      formulas: [
        { label: 'Moles', expression: 'n = mass / molar mass' },
        { label: 'Molarity', expression: 'M = n / volume in litres' },
        {
          label: 'Combined',
          expression: 'M = mass / (molar mass × volume in litres)',
          note: 'Volume must be in litres; divide millilitres by 1,000 first.',
        },
      ],
      sources: [
        {
          label: 'IUPAC — Compendium of Chemical Terminology (Gold Book)',
          expression: 'Definitions of amount of substance and molar concentration',
          note: 'Molarity is defined as amount of substance divided by the volume of the solution.',
        },
        {
          label: 'NIST Chemistry WebBook (SRD 69)',
          expression: 'Reference molar masses and thermodynamic data',
          note: 'A primary reference for the molar mass values used in stoichiometry.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Molarity',
          explanation:
            'Moles of solute per litre of final solution. It is the concentration used in most stoichiometry and titration calculations.',
        },
        {
          resultLabel: 'Moles of solute',
          explanation:
            'The amount of substance you actually weighed out. Moles are the counting unit that reaction equations are written in.',
        },
      ],
      workflowLinks: [
        { slug: 'molecular-weight-calculator', step: 'Look up the molar mass from a formula.' },
        { slug: 'dilution-calculator', step: 'Dilute a stock solution to a working concentration.' },
        { slug: 'density-calculator', step: 'Convert a mass into a volume when the density is known.' },
      ],
      faqs: [
        {
          q: 'Is molarity the same as molality?',
          a: 'No. Molarity is moles per litre of solution and changes with temperature. Molality is moles per kilogram of solvent and does not, which is why it is preferred for precise work near boiling or freezing points.',
        },
        {
          q: 'Do I use the volume of water or the final volume?',
          a: 'Always the final volume after the solute has dissolved and the flask has been made up to the mark. Adding 1 L of water to a solid usually produces slightly more than 1 L of solution.',
        },
        {
          q: 'How do I find the molar mass?',
          a: 'Add the standard atomic weights of every atom in the formula. Sodium chloride is 22.99 + 35.45 = 58.44 g/mol. The molecular weight calculator on this site does that arithmetic for any formula, including hydrates.',
        },
        {
          q: 'Why does the answer differ slightly from the label on the bottle?',
          a: 'Standard atomic weights are averages across natural isotope abundances, and assay purity is rarely exactly 100%. Both shift the effective molar mass, so volumetric standards are usually prepared with a correction factor.',
        },
      ],
      related: ['molecular-weight-calculator', 'dilution-calculator', 'density-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-10-26' },
  },
  {
    id: 'molecular-weight',
    slug: 'molecular-weight-calculator',
    name: 'Molecular Weight Calculator',
    shortDesc: 'Parse a chemical formula into molar mass, atom count, and percentage composition by mass.',
    tagline: 'Any formula, straight to g/mol.',
    category: 'science',
    iconName: 'Atom',
    badge: 'Chemistry',
    featured: true,
    keywords: [
      'molecular weight calculator',
      'molar mass calculator',
      'molecular mass calculator',
      'formula weight calculator',
      'percent composition calculator',
      'chemical formula calculator',
    ],
    kind: 'custom',
    componentId: 'MolecularWeightCalculator',
    content: {
      intro:
        'The Molecular Weight Calculator reads a chemical formula and returns its molar mass, the number of atoms in one formula unit, and each element’s share of the total mass. It handles subscripts, nested brackets, and hydrates such as copper sulfate pentahydrate.',
      howItWorks:
        'The formula is parsed into element counts, including the multiplier that applies after a bracket and the coefficient after a hydrate dot. Each count is multiplied by the IUPAC standard atomic weight for that element and summed. Percentage composition is each element’s contribution divided by the total.',
      example:
        'Glucose, C6H12O6, contains 6 carbon, 12 hydrogen, and 6 oxygen atoms. Its molar mass is 6 × 12.011 + 12 × 1.008 + 6 × 15.999 = 180.16 g/mol, of which carbon is 40.0% and oxygen 53.3%.',
      formulas: [
        {
          label: 'Molar mass',
          expression: 'M = Σ (atom count × standard atomic weight)',
        },
        {
          label: 'Mass percent',
          expression: 'Element % = (element mass / molar mass) × 100',
        },
        {
          label: 'Hydrate coefficient',
          expression: 'CuSO₄·5H₂O = CuSO₄ + 5 × H₂O',
          note: 'A number after the dot multiplies the whole following formula unit, not just its first element.',
        },
      ],
      sources: [
        {
          label: 'IUPAC — Standard Atomic Weights (2021)',
          expression: 'Abridged atomic weights used for each element',
          note: 'IUPAC publishes the conventional atomic weights that stoichiometry uses.',
        },
        {
          label: 'NIST Chemistry WebBook (SRD 69)',
          expression: 'Evaluated thermochemical and mass data',
          note: 'Useful for checking a computed molar mass against an independent reference value.',
        },
        {
          label: 'PubChem — Compound records',
          expression: 'Molecular formula and molecular weight',
          note: 'A cross-check for common compounds, including hydrate forms.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Molar mass',
          explanation:
            'Grams per mole of the formula unit as written. For an ionic compound this is formula mass, because there are no discrete molecules.',
        },
        {
          resultLabel: 'Mass percent',
          explanation:
            'The fraction of total mass contributed by each element. It is the same ratio used in empirical formula and yield calculations.',
        },
      ],
      workflowLinks: [
        { slug: 'molarity-calculator', step: 'Use the molar mass to prepare a solution.' },
        { slug: 'dilution-calculator', step: 'Dilute the stock you prepared.' },
        { slug: 'percentage-calculator', step: 'Work with the composition percentages directly.' },
      ],
      faqs: [
        {
          q: 'What is the difference between molecular weight and molar mass?',
          a: 'Molecular weight is the mass of one molecule in atomic mass units; molar mass is the mass of one mole in grams per mole. The numbers are numerically identical, which is why the terms are often used interchangeably.',
        },
        {
          q: 'Why does Co give a different answer from CO?',
          a: 'Chemical symbols are case-sensitive. Co is cobalt, one atom with an atomic weight near 58.93. CO is one carbon and one oxygen, totalling about 28.01. The calculator rejects unknown symbols rather than guessing.',
        },
        {
          q: 'How are hydrates handled?',
          a: 'A dot separates formula units, and a leading number multiplies the unit that follows. CuSO4·5H2O is one copper sulfate unit plus five water units, giving 249.68 g/mol rather than the anhydrous 159.60.',
        },
        {
          q: 'Does this account for isotopes?',
          a: 'No. It uses standard atomic weights averaged over natural abundance. For isotope-labelled work, or for mass spectrometry, use the monoisotopic mass of the specific isotopologue instead.',
        },
      ],
      related: ['molarity-calculator', 'dilution-calculator', 'percentage-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-10-26' },
  },
  {
    id: 'dilution',
    slug: 'dilution-calculator',
    name: 'Dilution Calculator',
    shortDesc: 'Work out how much stock solution and diluent you need to reach a target concentration and volume.',
    tagline: 'C1V1 = C2V2, without the algebra.',
    category: 'science',
    iconName: 'TestTube',
    badge: 'Chemistry',
    featured: true,
    keywords: [
      'dilution calculator',
      'c1v1 c2v2 calculator',
      'solution dilution calculator',
      'stock solution calculator',
      'serial dilution calculator',
      'dilution factor calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'stockConc', label: 'Stock concentration', type: 'number', defaultValue: 1, min: 0.001, step: 0.1, suffix: 'M' },
        { id: 'targetConc', label: 'Target concentration', type: 'number', defaultValue: 0.1, min: 0.001, step: 0.01, suffix: 'M' },
        { id: 'finalVolumeMl', label: 'Final volume', type: 'number', defaultValue: 100, min: 0.001, step: 1, suffix: 'mL' },
      ],
      results: [
        {
          label: 'Stock solution needed',
          formulaCode: '(targetConc * finalVolumeMl) / stockConc',
          suffix: 'mL',
          accent: true,
        },
        {
          label: 'Diluent to add',
          formulaCode: 'Math.max(0, finalVolumeMl - (targetConc * finalVolumeMl) / stockConc)',
          suffix: 'mL',
        },
        { label: 'Dilution factor', formulaCode: 'stockConc / targetConc', suffix: '×' },
        {
          label: 'Stock as a share of final volume',
          formulaCode: '(targetConc / stockConc) * 100',
          suffix: '%',
        },
      ],
      formulaDescription: 'C₁V₁ = C₂V₂, so V₁ = (C₂ × V₂) / C₁',
      tips: [
        'Add the stock to part of the diluent, then make up to the final volume. Adding stock last can overshoot the mark and force you to start again.',
        'The target concentration must be below the stock concentration; dilution cannot concentrate a solution.',
        'For a serial dilution, each step multiplies by the same factor, so errors compound. Use volumetric glassware at every step.',
      ],
    },
    content: {
      intro:
        'The Dilution Calculator solves the standard dilution equation for the volume of stock you need. Enter the stock concentration, the concentration you want, and the final volume, and it returns the stock volume, the diluent volume, and the dilution factor.',
      howItWorks:
        'Dilution conserves the amount of solute: concentration times volume is constant, so C₁V₁ = C₂V₂. Rearranging gives the stock volume. The diluent is whatever remains of the final volume once the stock is added. The dilution factor is the stock concentration divided by the target.',
      example:
        'To make 100 mL of 0.1 M solution from a 1 M stock, you need 0.1 × 100 / 1 = 10 mL of stock. Add roughly 80 mL of diluent first, then make up to the 100 mL mark, so the diluent volume is about 90 mL. The dilution factor is 10×.',
      formulas: [
        {
          label: 'Dilution equation',
          expression: 'C₁V₁ = C₂V₂',
        },
        {
          label: 'Stock volume',
          expression: 'V₁ = (C₂ × V₂) / C₁',
        },
        {
          label: 'Dilution factor',
          expression: 'DF = C₁ / C₂',
          note: 'A 10× dilution means one part stock to nine parts diluent.',
        },
      ],
      sources: [
        {
          label: 'IUPAC — Compendium of Chemical Terminology (Gold Book)',
          expression: 'Dilution and concentration definitions',
          note: 'Defines concentration in terms of amount of substance and volume, which is the basis of C₁V₁ = C₂V₂.',
        },
        {
          label: 'NIST — Standard Reference Materials for solution concentration',
          expression: 'Gravimetric and volumetric preparation',
          note: 'Illustrates why final volume, not added solvent volume, defines the concentration.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Stock solution needed',
          explanation:
            'The volume of concentrated solution that contains exactly the target amount of solute. Measure it with a pipette or graduated cylinder, not by eye.',
        },
        {
          resultLabel: 'Dilution factor',
          explanation:
            'How many times the solution is diluted. A factor of 10 means the final concentration is one tenth of the stock.',
        },
      ],
      workflowLinks: [
        { slug: 'molarity-calculator', step: 'Work out the stock concentration from mass and volume.' },
        { slug: 'molecular-weight-calculator', step: 'Find the molar mass needed to prepare the stock.' },
        { slug: 'volume-converter', step: 'Convert the volumes into the units your glassware uses.' },
      ],
      faqs: [
        {
          q: 'Do I add the stock to the diluent or the other way round?',
          a: 'Add the stock to part of the diluent, mix, then make up to the final volume. The volumes are not perfectly additive, so adding all the diluent first often leaves you above the mark.',
        },
        {
          q: 'What does a 1:10 dilution mean?',
          a: 'It usually means one part stock plus nine parts diluent, for a total of ten parts and a dilution factor of 10. Some protocols write 1:10 to mean one part in ten total, which is the same thing; watch for 1:9 notation, which also gives a factor of 10.',
        },
        {
          q: 'Can I use this for a serial dilution?',
          a: 'Yes, but apply it one step at a time. Each transfer carries pipetting error, so a five-step 10× series can drift noticeably from the nominal final concentration.',
        },
        {
          q: 'Why can I not set the target above the stock?',
          a: 'Dilution only lowers concentration. To go up you would need to add solute, evaporate solvent, or use a more concentrated stock — none of which this equation models.',
        },
      ],
      related: ['molarity-calculator', 'molecular-weight-calculator', 'volume-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-10-26' },
  },
  {
    id: 'ph',
    slug: 'ph-calculator',
    name: 'pH Calculator',
    shortDesc: 'Convert between pH, pOH, hydrogen-ion, and hydroxide-ion concentration with an acidity label.',
    tagline: 'Acid, base, or neutral — with the numbers.',
    category: 'science',
    iconName: 'Droplets',
    badge: 'Acids & Bases',
    featured: true,
    keywords: [
      'ph calculator',
      'poh calculator',
      'hydrogen ion concentration calculator',
      'ph to concentration',
      'ph formula',
      'acid base calculator',
    ],
    kind: 'custom',
    componentId: 'PhCalculator',
    content: {
      intro:
        'The pH Calculator converts between pH, pOH, hydrogen-ion concentration, and hydroxide-ion concentration. Enter whichever value you have and it returns the rest, with the solution labelled acidic, neutral, or basic.',
      howItWorks:
        'pH is the negative base-10 logarithm of hydrogen-ion activity, approximated here by concentration in moles per litre. pOH is 14 minus pH at 25 °C, where the ion product of water is 1.0 × 10⁻¹⁴. Hydrogen and hydroxide concentrations follow from the logarithmic definitions and always multiply to that ion product.',
      example:
        'A solution with [H⁺] = 1 × 10⁻³ mol/L has pH 3, so it is acidic. pOH is 11 and [OH⁻] is 1 × 10⁻¹¹ mol/L. A pH of 10 gives pOH 4 and [H⁺] = 1 × 10⁻¹⁰ mol/L, which is basic.',
      formulas: [
        { label: 'pH', expression: 'pH = −log₁₀[H⁺]' },
        { label: 'pOH', expression: 'pOH = 14 − pH', note: 'Valid in water at 25 °C.' },
        { label: 'Ion product', expression: '[H⁺] × [OH⁻] = 1.0 × 10⁻¹⁴' },
      ],
      sources: [
        {
          label: 'IUPAC — Compendium of Chemical Terminology (Gold Book)',
          expression: 'Definition of pH as negative logarithm of hydrogen-ion activity',
          note: 'Strictly, pH measures activity rather than concentration; the two diverge in concentrated solutions.',
        },
        {
          label: 'USGS Water Science School — pH',
          expression: 'pH scale and typical natural waters',
          note: 'A practical reference for interpreting environmental and drinking-water pH values.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'pH',
          explanation:
            'The negative log of hydrogen-ion concentration. Each unit is a tenfold change, so pH 4 is ten times more acidic than pH 5.',
        },
        {
          resultLabel: '[H⁺] and [OH⁻]',
          explanation:
            'Concentrations in moles per litre. They are reciprocals through the ion product of water, which is why one rises as the other falls.',
        },
      ],
      workflowLinks: [
        { slug: 'molarity-calculator', step: 'Find the concentration that produces this pH.' },
        { slug: 'dilution-calculator', step: 'Dilute a stock acid or base before measuring.' },
        { slug: 'molecular-weight-calculator', step: 'Check the formula of the acid or base you are using.' },
      ],
      faqs: [
        {
          q: 'Why is pH 7 neutral?',
          a: 'At 25 °C pure water has equal hydrogen and hydroxide concentrations of 1 × 10⁻⁷ mol/L, giving pH 7. Neutral pH shifts with temperature because the ion product of water changes.',
        },
        {
          q: 'Can pH be negative or above 14?',
          a: 'Yes, for concentrated strong acids or bases. A 2 M strong acid has a nominal pH near −0.3. The scale is not bounded, but the simple concentration approximation breaks down badly at those strengths.',
        },
        {
          q: 'What is the difference between pH and pOH?',
          a: 'They measure opposite ions. pH tracks hydrogen ions, pOH tracks hydroxide ions, and in water at 25 °C they add to 14. Reporting pH alone is conventional.',
        },
        {
          q: 'Does temperature matter?',
          a: 'Yes. The ion product of water rises with temperature, so the pH of neutrality falls below 7 as water heats. Buffers also change pH with temperature, which is why calibrations specify it.',
        },
      ],
      related: ['molarity-calculator', 'dilution-calculator', 'molecular-weight-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-10-26' },
  },
  {
    id: 'half-life',
    slug: 'half-life-calculator',
    name: 'Half-Life Calculator',
    shortDesc: 'Project how much of a substance remains after a given time, and how many half-lives have passed.',
    tagline: 'Exponential decay, made concrete.',
    category: 'science',
    iconName: 'Hourglass',
    badge: 'Decay',
    keywords: [
      'half life calculator',
      'half life formula',
      'exponential decay calculator',
      'radioactive decay calculator',
      'remaining amount calculator',
      'half life equation',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'initial', label: 'Initial amount', type: 'number', defaultValue: 100, min: 0, step: 1 },
        { id: 'halfLife', label: 'Half-life', type: 'number', defaultValue: 5, min: 0.001, step: 0.1, suffix: 'time units' },
        { id: 'elapsed', label: 'Elapsed time', type: 'number', defaultValue: 10, min: 0, step: 0.1, suffix: 'time units' },
      ],
      results: [
        {
          label: 'Amount remaining',
          formulaCode: 'initial * Math.pow(0.5, elapsed / halfLife)',
          accent: true,
        },
        {
          label: 'Amount decayed',
          formulaCode: 'initial - initial * Math.pow(0.5, elapsed / halfLife)',
        },
        { label: 'Half-lives elapsed', formulaCode: 'elapsed / halfLife' },
        {
          label: 'Share remaining',
          formulaCode: 'Math.pow(0.5, elapsed / halfLife) * 100',
          suffix: '%',
        },
      ],
      formulaDescription: 'N(t) = N₀ × (1/2)^(t / t½)',
      tips: [
        'Keep the time units consistent. A half-life in hours needs an elapsed time in hours, not days.',
        'The initial amount can be a mass, a count, or an activity; only the ratio matters to the decay curve.',
        'Half-life is a statistical property of a large population. A handful of atoms does not decay on schedule.',
      ],
    },
    content: {
      intro:
        'The Half-Life Calculator projects exponential decay: how much of a substance remains after a chosen time, how much has decayed, and how many half-lives have elapsed. The units are yours to choose, as long as the half-life and elapsed time match.',
      howItWorks:
        'Every half-life reduces the remaining amount by half. The number of half-lives is elapsed time divided by the half-life, and the remaining fraction is one half raised to that power. Because the exponent is continuous, the formula also works for fractional half-lives.',
      example:
        'Start with 100 units of a substance with a 5-day half-life and wait 10 days. Two half-lives have passed, so 100 × (1/2)² = 25 units remain and 75 have decayed. Waiting 15 days would leave 12.5 units.',
      formulas: [
        {
          label: 'Remaining amount',
          expression: 'N(t) = N₀ × (1/2)^(t / t½)',
        },
        {
          label: 'Half-lives elapsed',
          expression: 'n = t / t½',
        },
        {
          label: 'Decayed amount',
          expression: 'Decayed = N₀ − N(t)',
        },
      ],
      sources: [
        {
          label: 'IUPAC — Compendium of Chemical Terminology (Gold Book)',
          expression: 'Definition of half-life',
          note: 'Defines half-life as the time for the concentration or amount to fall to half its initial value.',
        },
        {
          label: 'NIST — Guide for the Use of the International System of Units (SP 811)',
          expression: 'Units for time and activity',
          note: 'Clarifies the unit conventions used for decay rates and elapsed time.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Amount remaining',
          explanation:
            'The quantity left after the elapsed time, in whatever unit you entered as the initial amount. It approaches zero without ever reaching it.',
        },
        {
          resultLabel: 'Half-lives elapsed',
          explanation:
            'The exponent that drives the decay. Each whole number halves the amount again, so the first few half-lives remove most of the material.',
        },
      ],
      workflowLinks: [
        { slug: 'percentage-calculator', step: 'Express the remaining share as a percentage change.' },
        { slug: 'molarity-calculator', step: 'Convert a remaining amount into concentration.' },
        { slug: 'density-calculator', step: 'Relate a remaining mass to its volume.' },
      ],
      faqs: [
        {
          q: 'Does the amount ever reach zero?',
          a: 'Mathematically no. Exponential decay approaches zero asymptotically. In practice, once only a few atoms remain, the statistical model gives way to individual random events.',
        },
        {
          q: 'What is the difference between half-life and mean life?',
          a: 'Mean life is the average lifetime of an atom, equal to the half-life divided by the natural logarithm of 2, about 1.44 times longer. Half-life is the more commonly reported figure.',
        },
        {
          q: 'Can I use this for drug clearance or carbon dating?',
          a: 'Yes, both follow first-order exponential decay. Carbon dating uses a half-life of about 5,700 years for carbon-14; drug clearance uses a biological half-life that assumes first-order elimination.',
        },
        {
          q: 'Why does the calculator not ask for a decay constant?',
          a: 'The half-life already encodes it: the decay constant is ln(2) divided by the half-life. Entering either one is enough, and half-life is the form most data sources report.',
        },
      ],
      related: ['molarity-calculator', 'percentage-calculator', 'density-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85, updatedAt: '2026-10-26' },
  },
  {
    id: 'ohms-law',
    slug: 'ohms-law-calculator',
    name: "Ohm's Law Calculator",
    shortDesc: 'Enter any two of voltage, current, resistance, or power and solve the other two.',
    tagline: 'V, I, R, P — pick two, get four.',
    category: 'science',
    iconName: 'Zap',
    badge: 'Electronics',
    featured: true,
    keywords: [
      'ohms law calculator',
      'voltage current resistance calculator',
      'v ir calculator',
      'electrical power calculator',
      'watts volts amps calculator',
      'resistance calculator',
    ],
    kind: 'custom',
    componentId: 'OhmsLawCalculator',
    content: {
      intro:
        "The Ohm's Law Calculator solves a resistive circuit from any two known quantities. Choose which pair you have — voltage and current, voltage and resistance, and so on — and it returns voltage, current, resistance, and power with consistent units.",
      howItWorks:
        "Ohm's law relates voltage, current, and resistance as V = IR. Electrical power is P = VI, which combines with Ohm's law to give P = I²R and P = V²/R. Knowing any two values fixes the other two, so there is exactly one solution for a purely resistive load.",
      example:
        'A 12 V supply drives 2 A through a resistor. Resistance is 12 / 2 = 6 Ω and power is 12 × 2 = 24 W. The same resistor on 6 V would draw 1 A and dissipate 6 W, because power falls with the square of voltage.',
      formulas: [
        { label: "Ohm's law", expression: 'V = I × R' },
        { label: 'Electrical power', expression: 'P = V × I' },
        {
          label: 'Power variants',
          expression: 'P = I²R = V²/R',
          note: 'Use the form that matches the two values you know.',
        },
      ],
      sources: [
        {
          label: 'ISO/IEC 80000-6 — Quantities and units: electromagnetism',
          expression: 'Volt, ampere, ohm, and watt definitions',
          note: 'Defines the SI quantities and the relationships this calculator uses.',
        },
        {
          label: 'NIST — SI Brochure, 9th edition',
          expression: 'Base unit definitions for the ampere',
          note: 'The ampere is defined from the elementary charge, which anchors the electrical units.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Voltage',
          explanation:
            'The potential difference across the resistive element. It is the quantity a multimeter measures in parallel with the load.',
        },
        {
          resultLabel: 'Power',
          explanation:
            'Energy converted per second, in watts. In a resistor this is heat, so the component must be rated for at least this dissipation.',
        },
      ],
      workflowLinks: [
        { slug: 'voltage-drop-calculator', step: 'Check how much voltage is lost in the supply cable.' },
        { slug: 'wire-size-calculator', step: 'Size a conductor for the current you just found.' },
        { slug: 'electricity-cost-calculator', step: 'Turn the power figure into a running cost.' },
      ],
      faqs: [
        {
          q: 'Which formula do I use for power?',
          a: 'Use P = VI when you know voltage and current, P = I²R when you know current and resistance, and P = V²/R when you know voltage and resistance. All three are the same relationship rearranged.',
        },
        {
          q: 'Does this work for AC circuits?',
          a: 'Only for purely resistive AC loads, where voltage and current are in phase. Motors, transformers, and capacitors need impedance and power factor, and the result will be wrong without them.',
        },
        {
          q: 'Why must both inputs be greater than zero?',
          a: 'A zero voltage or current makes resistance undefined or infinite, and a zero resistance would imply infinite current. Real circuits have limits, so the calculator asks for values that describe one.',
        },
        {
          q: 'How do I pick a resistor wattage?',
          a: 'Calculate the dissipation, then choose a resistor rated at roughly twice that figure for headroom. A 24 W load needs a 50 W part, not a 25 W one, because surface temperature and derating matter.',
        },
      ],
      related: ['voltage-drop-calculator', 'wire-size-calculator', 'resistor-color-code-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.95, updatedAt: '2026-10-26' },
  },
  {
    id: 'voltage-drop',
    slug: 'voltage-drop-calculator',
    name: 'Voltage Drop Calculator',
    shortDesc: 'Calculate the volts lost in a two-wire run and the voltage that actually reaches the load.',
    tagline: 'What arrives at the far end of the cable.',
    category: 'science',
    iconName: 'Plug',
    badge: 'Electrical',
    featured: true,
    keywords: [
      'voltage drop calculator',
      'cable voltage drop',
      'voltage drop formula',
      'wire voltage loss',
      '2 percent voltage drop',
      'electrical cable calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'systemVoltage', label: 'Supply voltage', type: 'number', defaultValue: 230, min: 1, step: 1, suffix: 'V' },
        { id: 'current', label: 'Load current', type: 'number', defaultValue: 20, min: 0.001, step: 0.1, suffix: 'A' },
        { id: 'lengthM', label: 'One-way cable length', type: 'number', defaultValue: 30, min: 0.1, step: 0.5, suffix: 'm' },
        { id: 'areaMm2', label: 'Conductor cross-section', type: 'number', defaultValue: 4, min: 0.01, step: 0.5, suffix: 'mm²' },
        {
          id: 'resistivity',
          label: 'Conductor resistivity',
          type: 'number',
          defaultValue: 0.0175,
          min: 0.0001,
          step: 0.0001,
          suffix: 'Ω·mm²/m',
        },
      ],
      results: [
        {
          label: 'Voltage drop',
          formulaCode: 'current * (2 * resistivity * lengthM / areaMm2)',
          suffix: 'V',
          accent: true,
        },
        {
          label: 'Drop as a percentage of supply',
          formulaCode: '(current * (2 * resistivity * lengthM / areaMm2) / systemVoltage) * 100',
          suffix: '%',
        },
        {
          label: 'Voltage at the load',
          formulaCode: 'systemVoltage - current * (2 * resistivity * lengthM / areaMm2)',
          suffix: 'V',
        },
        {
          label: 'Power lost in the cable',
          formulaCode: 'current * current * (2 * resistivity * lengthM / areaMm2)',
          suffix: 'W',
        },
      ],
      formulaDescription: 'Vdrop = I × (2 × ρ × L / A), with L as the one-way length',
      tips: [
        'The factor of two accounts for both conductors: the current travels out and back.',
        'Copper is about 0.0175 Ω·mm²/m at 20 °C; aluminium is about 0.0282. Resistance rises as conductors heat.',
        'A 3% branch-circuit drop and 5% total drop are common design limits, but local wiring regulations govern.',
      ],
    },
    content: {
      intro:
        'The Voltage Drop Calculator works out how many volts are lost in a cable run and what voltage remains at the load. It models the out-and-back loop resistance of a two-wire circuit using conductor length, cross-section, and resistivity.',
      howItWorks:
        'Resistance of a conductor is resistivity times length divided by cross-sectional area. Because the return conductor carries the same current, the loop resistance doubles. Multiplying by current gives the volts lost, and subtracting from the supply gives the voltage at the load. The lost power is current squared times loop resistance.',
      example:
        'A 20 A load 30 m from a 230 V supply, wired in 4 mm² copper, has a loop resistance of 2 × 0.0175 × 30 / 4 = 0.2625 Ω. The drop is 5.25 V, or 2.28%, leaving 224.75 V at the load and wasting 105 W as heat in the cable.',
      formulas: [
        { label: 'Loop resistance', expression: 'R = 2 × ρ × L / A' },
        { label: 'Voltage drop', expression: 'Vdrop = I × R' },
        { label: 'Load voltage', expression: 'Vload = Vsupply − Vdrop' },
        { label: 'Cable power loss', expression: 'Ploss = I² × R' },
      ],
      sources: [
        {
          label: 'IEC 60364-5-52 — Wiring systems',
          expression: 'Selection and erection of wiring systems, including voltage drop',
          note: 'The international installation standard that sets voltage-drop guidance for fixed wiring.',
        },
        {
          label: 'NFPA 70 — National Electrical Code, 210.19(A) Informational Note',
          expression: 'Branch-circuit and total voltage drop recommendations',
          note: 'Suggests keeping branch-circuit drop to 3% and total to 5% for reasonable efficiency.',
        },
        {
          label: 'IEEE Std 141 — Recommended Practice for Electric Power Distribution',
          expression: 'Voltage-drop calculation methods',
          note: 'Covers the resistive and reactive components; this calculator handles the resistive part.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Voltage drop',
          explanation:
            'The volts lost between the supply and the load. It is proportional to current, length, and resistivity, and inversely proportional to conductor area.',
        },
        {
          resultLabel: 'Voltage at the load',
          explanation:
            'What the equipment actually receives. Motors and compressors are sensitive to low voltage, especially during start-up when current briefly rises.',
        },
      ],
      workflowLinks: [
        { slug: 'wire-size-calculator', step: 'Find the cross-section that keeps the drop within a limit.' },
        { slug: 'ohms-law-calculator', step: 'Relate the load current to its resistance and power.' },
        { slug: 'electricity-cost-calculator', step: 'Price the energy lost in the cable over time.' },
      ],
      faqs: [
        {
          q: 'Why does the formula use twice the cable length?',
          a: 'Current flows to the load along one conductor and returns along another, so the total conductor length in the circuit is twice the one-way distance. Both lengths contribute resistance.',
        },
        {
          q: 'What is an acceptable voltage drop?',
          a: 'Common design guidance is up to 3% on a branch circuit and 5% overall, but the figure that matters is the equipment tolerance and your local wiring regulations. Some installations require tighter limits.',
        },
        {
          q: 'Does this account for power factor?',
          a: 'No. It assumes a resistive load at unity power factor. For motors and other inductive loads, the resistive drop is combined with a reactive component, which can change the answer significantly.',
        },
        {
          q: 'Why does my cable get warm?',
          a: 'The power lost in the conductor becomes heat. A 105 W loss in the example is a real heating effect, and bundling cables or insulating them reduces how easily that heat escapes, which is why derating factors exist.',
        },
      ],
      related: ['wire-size-calculator', 'ohms-law-calculator', 'electricity-cost-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-10-26' },
  },
  {
    id: 'wire-size',
    slug: 'wire-size-calculator',
    name: 'Wire Size Calculator',
    shortDesc: 'Find the minimum conductor cross-section that keeps voltage drop within a percentage you set.',
    tagline: 'Size the cable before the run gets expensive.',
    category: 'science',
    iconName: 'Cable',
    badge: 'Electrical',
    featured: true,
    keywords: [
      'wire size calculator',
      'cable size calculator',
      'conductor size calculator',
      'voltage drop wire size',
      'wire gauge calculator',
      'cable cross section calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'systemVoltage', label: 'Supply voltage', type: 'number', defaultValue: 230, min: 1, step: 1, suffix: 'V' },
        { id: 'current', label: 'Load current', type: 'number', defaultValue: 20, min: 0.001, step: 0.1, suffix: 'A' },
        { id: 'lengthM', label: 'One-way cable length', type: 'number', defaultValue: 30, min: 0.1, step: 0.5, suffix: 'm' },
        {
          id: 'maxDropPercent',
          label: 'Maximum voltage drop',
          type: 'number',
          defaultValue: 3,
          min: 0.1,
          max: 50,
          step: 0.1,
          suffix: '%',
        },
        {
          id: 'resistivity',
          label: 'Conductor resistivity',
          type: 'number',
          defaultValue: 0.0175,
          min: 0.0001,
          step: 0.0001,
          suffix: 'Ω·mm²/m',
        },
      ],
      results: [
        {
          label: 'Minimum conductor cross-section',
          formulaCode: '(2 * resistivity * lengthM * current) / ((systemVoltage * maxDropPercent) / 100)',
          suffix: 'mm²',
          accent: true,
        },
        {
          label: 'Allowable voltage drop',
          formulaCode: '(systemVoltage * maxDropPercent) / 100',
          suffix: 'V',
        },
        {
          label: 'Power lost at that size',
          formulaCode: '(current * systemVoltage * maxDropPercent) / 100',
          suffix: 'W',
        },
        {
          label: 'Loop resistance at that size',
          formulaCode: '((systemVoltage * maxDropPercent) / 100) / current',
          suffix: 'Ω',
        },
      ],
      formulaDescription: 'A = (2 × ρ × L × I) / (V × drop%)',
      tips: [
        'This is a voltage-drop calculation, not a current-carrying-capacity check. The cable must also satisfy the ampacity and derating rules in your wiring code.',
        'Round up to the next standard cross-section: 1.5, 2.5, 4, 6, 10, 16, 25, 35 mm² are common metric sizes.',
        'Long runs are dominated by drop, not heat. At 100 m, the required size is often far larger than the current alone would suggest.',
      ],
    },
    content: {
      intro:
        'The Wire Size Calculator finds the smallest conductor cross-section that keeps voltage drop within a limit you choose. It inverts the voltage-drop equation, so instead of checking a cable you already have, it tells you what to buy.',
      howItWorks:
        'The maximum permitted drop in volts is the supply voltage times the allowed percentage. Setting the voltage-drop equation equal to that limit and solving for area gives area equals two times resistivity times length times current, divided by the allowable drop. Power loss at exactly that size simplifies to current times supply voltage times the allowed fraction.',
      example:
        'A 20 A load 30 m from a 230 V supply, with a 3% limit and copper at 0.0175 Ω·mm²/m, needs at least 3.04 mm². The next standard size is 4 mm², which drops 2.28% and wastes 105 W. Choosing 2.5 mm² would exceed the limit.',
      formulas: [
        { label: 'Allowable drop', expression: 'Vallow = V × drop% / 100' },
        { label: 'Required area', expression: 'A = 2 × ρ × L × I / Vallow' },
        {
          label: 'Loss at the limit',
          expression: 'Ploss = I × Vallow',
          note: 'At exactly the allowed drop, the cable dissipates this much regardless of length.',
        },
      ],
      sources: [
        {
          label: 'IEC 60364-5-52 — Wiring systems',
          expression: 'Conductor sizing and voltage drop',
          note: 'Sets out how voltage drop and current-carrying capacity are both considered when selecting a conductor.',
        },
        {
          label: 'NFPA 70 — National Electrical Code, Article 310',
          expression: 'Conductor ampacities and adjustment factors',
          note: 'Ampacity, ambient temperature, and bundling can require a larger conductor than voltage drop alone.',
        },
        {
          label: 'IEEE Std 141 — Recommended Practice for Electric Power Distribution',
          expression: 'Voltage-drop limits and conductor selection',
          note: 'Discusses how voltage drop influences conductor choice on long distribution runs.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Minimum conductor cross-section',
          explanation:
            'The calculated area that exactly meets the drop limit. It is a floor, not a standard size — round up, and check ampacity separately.',
        },
        {
          resultLabel: 'Power lost at that size',
          explanation:
            'The energy converted to heat in the cable when it runs at the allowed drop. It is independent of length because a longer cable at the same drop has more resistance and less current for a fixed load.',
        },
      ],
      workflowLinks: [
        { slug: 'voltage-drop-calculator', step: 'Check the drop for a cable size you already have.' },
        { slug: 'ohms-law-calculator', step: 'Confirm the load current from its power rating.' },
        { slug: 'electricity-cost-calculator', step: 'Cost the energy lost in the conductor.' },
      ],
      faqs: [
        {
          q: 'Is voltage drop enough to choose a cable?',
          a: 'No. A conductor must also carry the current without overheating, which is the ampacity requirement. Installation method, ambient temperature, grouping, and insulation type all affect it, so check the wiring code before buying.',
        },
        {
          q: 'What cross-section should I actually install?',
          a: 'Round the calculated figure up to the next standard size, then verify ampacity. A 3.04 mm² result means 4 mm², not 2.5 mm², because standard sizes jump from 2.5 to 4.',
        },
        {
          q: 'Why is aluminium different?',
          a: 'Aluminium has higher resistivity, about 0.0282 Ω·mm²/m against copper’s 0.0175, so it needs roughly 60% more area for the same drop. It also needs connectors rated for aluminium to avoid corrosion problems.',
        },
        {
          q: 'Does cable length include the return path?',
          a: 'Enter the one-way distance. The calculator doubles it internally because the circuit includes both the outgoing and returning conductors.',
        },
      ],
      related: ['voltage-drop-calculator', 'ohms-law-calculator', 'electricity-cost-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-10-26' },
  },
  {
    id: 'resistor-color-code',
    slug: 'resistor-color-code-calculator',
    name: 'Resistor Color Code Calculator',
    shortDesc: 'Decode a four-band resistor from its colours into resistance and tolerance range.',
    tagline: 'Read the bands without squinting.',
    category: 'science',
    iconName: 'CircuitBoard',
    badge: 'Electronics',
    featured: true,
    keywords: [
      'resistor color code calculator',
      'resistor colour code',
      '4 band resistor calculator',
      'resistor value calculator',
      'resistor tolerance calculator',
      'color code chart',
    ],
    kind: 'custom',
    componentId: 'ResistorColorCodeCalculator',
    content: {
      intro:
        'The Resistor Color Code Calculator turns four colour bands into a resistance value and a tolerance range. Pick the colours from the dropdowns and it shows the exact value, the minimum and maximum within tolerance, and a visual band preview.',
      howItWorks:
        'The first two bands are digits. The third is a multiplier — a power of ten, with gold and silver standing for 0.1 and 0.01. The fourth band is tolerance as a percentage. The resistance is the two-digit number times the multiplier, and the tolerance spread is that value times the percentage.',
      example:
        'Brown, black, red, gold reads as 1, 0, ×100, ±5%. That is 10 × 100 = 1,000 Ω, or 1 kΩ, with a range of 950 Ω to 1,050 Ω. Brown, black, brown, gold would be 100 Ω instead.',
      formulas: [
        {
          label: 'Resistance',
          expression: 'R = (digit₁ × 10 + digit₂) × multiplier',
        },
        {
          label: 'Tolerance range',
          expression: 'Rmin = R × (1 − tol); Rmax = R × (1 + tol)',
        },
        {
          label: 'Multiplier bands',
          expression: 'Gold = ×0.1, silver = ×0.01',
          note: 'These two appear only in the multiplier position, never as digits.',
        },
      ],
      sources: [
        {
          label: 'IEC 60062 — Marking codes for resistors and capacitors',
          expression: 'Colour code for fixed resistors',
          note: 'The international standard that defines band order, digit values, multipliers, and tolerance colours.',
        },
        {
          label: 'IEC 60063 — Preferred number series',
          expression: 'E6, E12, E24, E96 value series',
          note: 'Explains why 1 kΩ and 4.7 kΩ exist but 5 kΩ does not: resistors come in preferred-number steps.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Resistance',
          explanation:
            'The nominal value at 20 °C. A resistor’s actual value drifts with temperature, which is specified separately as a temperature coefficient.',
        },
        {
          resultLabel: 'Tolerance range',
          explanation:
            'The window the manufacturer guarantees. A 1 kΩ ±5% part is in specification anywhere from 950 Ω to 1,050 Ω, which is often fine for a divider and not fine for a precision reference.',
        },
      ],
      workflowLinks: [
        { slug: 'ohms-law-calculator', step: 'Use the resistance to find current and power.' },
        { slug: 'voltage-drop-calculator', step: 'See how resistance in a long cable affects the load.' },
        { slug: 'wire-size-calculator', step: 'Size a conductor for a real installation.' },
      ],
      faqs: [
        {
          q: 'How do I know which end to start from?',
          a: 'Start from the end with the bands grouped closest together. The tolerance band is usually separated slightly from the other three, and gold or silver only ever appears as a multiplier or tolerance, never as a digit.',
        },
        {
          q: 'What does the fifth band mean?',
          a: 'On a five-band resistor, the first three bands are digits and the fourth is the multiplier; the fifth is tolerance. A sixth band is a temperature coefficient. This calculator reads the four-band layout.',
        },
        {
          q: 'Why is there no green or blue multiplier tolerance?',
          a: 'Green and blue do have tolerance meanings (0.5% and 0.25%) and appear in the tolerance position on precision parts. The dropdown shows every colour that has a defined tolerance value.',
        },
        {
          q: 'Can I read a resistor while it is in circuit?',
          a: 'Not reliably. Parallel paths change the measured value, and your meter’s test voltage may turn on semiconductor junctions. Desolder one leg, or isolate the part, before measuring.',
        },
      ],
      related: ['ohms-law-calculator', 'voltage-drop-calculator', 'wire-size-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9, updatedAt: '2026-10-26' },
  },
  {
    id: 'specific-heat',
    slug: 'specific-heat-calculator',
    name: 'Specific Heat Calculator',
    shortDesc: 'Calculate the energy needed to heat or cool a mass by a temperature change using specific heat.',
    tagline: 'How much energy a temperature change really takes.',
    category: 'science',
    iconName: 'Thermometer',
    badge: 'Physics',
    featured: false,
    keywords: [
      'specific heat calculator',
      'heat energy calculator',
      'q mc delta t calculator',
      'how to calculate specific heat',
      'thermal energy calculator',
      'specific heat capacity',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'massKg', label: 'Mass', type: 'number', defaultValue: 2, min: 0.001, step: 0.1, suffix: 'kg' },
        { id: 'specificHeat', label: 'Specific heat capacity', type: 'number', defaultValue: 4186, min: 0.01, suffix: 'J/kg-C' },
        { id: 'deltaT', label: 'Temperature change', type: 'number', defaultValue: 30, step: 1, suffix: 'C' },
      ],
      results: [
        {
          label: 'Energy required',
          formulaCode: 'massKg * specificHeat * deltaT',
          suffix: 'J',
          accent: true,
        },
        { label: 'Energy in kilojoules', formulaCode: 'massKg * specificHeat * deltaT / 1000', suffix: 'kJ' },
        {
          label: 'Energy in kilowatt-hours',
          formulaCode: 'massKg * specificHeat * deltaT / 3600000',
          suffix: 'kWh',
        },
        {
          label: 'Energy in kilocalories',
          formulaCode: 'massKg * specificHeat * deltaT / 4184',
          suffix: 'kcal',
        },
      ],
      formulaDescription: 'Q = mass x specific heat capacity x temperature change.',
      tips: [
        'A negative temperature change means the material is cooling, so the energy is released rather than absorbed. The magnitude is the same.',
        'Specific heat changes with temperature and phase. The value for liquid water, 4,186 J/kg-C, does not apply to ice or steam.',
        'A phase change needs latent heat as well. Melting ice at 0 C takes about 334,000 J per kg before the temperature can rise.',
      ],
    },
    content: {
      intro:
        'The Specific Heat Calculator applies Q = mc delta T to find the energy needed to change the temperature of a mass. It is the basic calculation behind heating water, sizing a thermal store, and checking a cooling load.',
      howItWorks:
        'Mass in kilograms is multiplied by specific heat capacity in joules per kilogram per degree Celsius, then by the temperature change in degrees Celsius. The result is energy in joules. Dividing by 1,000 gives kilojoules, by 3,600,000 gives kilowatt-hours, and by 4,184 gives kilocalories. The sign of the temperature change tells you whether energy is absorbed or released.',
      example:
        'Heating 2 kg of water with a specific heat of 4,186 J/kg-C by 30 C takes 2 x 4,186 x 30 = 251,160 J. That is 251.16 kJ, about 0.0698 kWh, or about 60.0 kcal.',
      formulas: [
        { label: 'Heat energy', expression: 'Q = mass x specific heat x temperature change' },
        { label: 'Kilojoules', expression: 'joules / 1000' },
        { label: 'Kilowatt-hours', expression: 'joules / 3,600,000' },
        { label: 'Kilocalories', expression: 'joules / 4,184' },
      ],
      sources: [
        {
          label: 'NIST - Thermophysical Properties of Fluid Systems',
          expression: 'Specific heat and phase properties',
          note: 'Reference data for water and other fluids across temperature and pressure.',
        },
        {
          label: 'OpenStax College Physics - Temperature, Heat, and Specific Heat',
          expression: 'Q = mc delta T derivation',
          note: 'A textbook treatment of specific heat and the sign convention for heating and cooling.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Energy required',
          explanation:
            'The sensible heat for the stated mass and temperature change. It excludes losses to the surroundings and any phase change.',
        },
        {
          resultLabel: 'Energy in kilowatt-hours',
          explanation:
            'The same energy in the unit on an electricity bill. It is useful for comparing an electric heater or heat pump with the theoretical minimum.',
        },
        {
          resultLabel: 'Energy in kilocalories',
          explanation:
            'The energy in food-calorie units, often used in nutrition and older engineering texts. One kilocalorie is 4,184 joules.',
        },
      ],
      workflowLinks: [
        { slug: 'btu-calculator', step: 'Convert the heat load into BTUs for HVAC sizing.' },
        { slug: 'electricity-cost-calculator', step: 'Price the electricity needed to deliver the energy.' },
        { slug: 'boiling-point-calculator', step: 'Check how pressure changes the boiling temperature.' },
      ],
      faqs: [
        {
          q: 'What is specific heat capacity?',
          a: 'The energy needed to raise one kilogram of a substance by one degree Celsius. Water is about 4,186 J/kg-C, which is high, which is why it is good at storing heat. Metals are much lower, so they heat and cool quickly.',
        },
        {
          q: 'Why does my real heater use more energy than the calculator?',
          a: 'The calculation gives the minimum sensible heat. Real systems lose heat to the room, the container, and the surroundings, and they may have inefficiencies in the heating element or heat pump. A poorly insulated tank can lose a large share of the input.',
        },
        {
          q: 'Does this work for cooling?',
          a: 'Yes. Enter a negative temperature change or take the magnitude and interpret it as energy removed. The specific heat is assumed constant over the range; for a large change, use an average value or a property table.',
        },
        {
          q: 'What about melting or boiling?',
          a: 'Add latent heat separately. Melting ice takes about 334 kJ per kg, and vaporising water takes about 2,260 kJ per kg at atmospheric pressure. This calculator covers only the temperature change within one phase.',
        },
        {
          q: 'Which specific heat value should I use for water?',
          a: 'Liquid water is about 4,186 J/kg-C near room temperature. It rises slightly with temperature, and ice and steam have much lower values. For a precise design, use a property table at the relevant temperature rather than a single constant.',
        },
      ],
      related: ['btu-calculator', 'electricity-cost-calculator', 'boiling-point-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-10-26' },
  },
  {
    id: 'ideal-gas-law',
    slug: 'ideal-gas-law-calculator',
    name: 'Ideal Gas Law Calculator',
    shortDesc: 'Find pressure from moles, temperature, and volume, with density and molar volume included.',
    tagline: 'PV = nRT, with the units kept honest.',
    category: 'science',
    iconName: 'FlaskConical',
    badge: 'Chemistry',
    featured: false,
    keywords: [
      'ideal gas law calculator',
      'pvnrt calculator',
      'ideal gas pressure calculator',
      'gas density calculator',
      'molar volume calculator',
      'ideal gas equation',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'moles', label: 'Amount of gas', type: 'number', defaultValue: 1, min: 0.0001, step: 0.1, suffix: 'mol' },
        { id: 'tempC', label: 'Temperature', type: 'number', defaultValue: 25, min: -273, step: 1, suffix: 'C' },
        { id: 'volumeL', label: 'Volume', type: 'number', defaultValue: 24.47, min: 0.0001, step: 1, suffix: 'L' },
        { id: 'molarMass', label: 'Molar mass', type: 'number', defaultValue: 28.97, min: 0.001, suffix: 'g/mol' },
      ],
      results: [
        {
          label: 'Pressure',
          formulaCode: 'moles * 8.314 * (tempC + 273.15) / volumeL',
          suffix: 'kPa',
          accent: true,
        },
        {
          label: 'Pressure in atmospheres',
          formulaCode: 'moles * 8.314 * (tempC + 273.15) / volumeL / 101.325',
          suffix: 'atm',
        },
        { label: 'Density', formulaCode: 'moles * molarMass / volumeL', suffix: 'g/L' },
        { label: 'Molar volume', formulaCode: 'volumeL / moles', suffix: 'L/mol' },
      ],
      formulaDescription: 'P = nRT / V with R = 8.314 kPa L / (mol K) and T in kelvin.',
      tips: [
        'Always convert Celsius to kelvin by adding 273.15. Forgetting this is the most common ideal gas error.',
        'R = 8.314 works with pressure in kPa and volume in litres. If you use atm, use R = 0.08206 with volume in litres.',
        'The ideal gas law assumes no intermolecular forces and point particles. It is least accurate at high pressure and near condensation.',
      ],
    },
    content: {
      intro:
        'The Ideal Gas Law Calculator solves PV = nRT for pressure using moles, temperature, and volume, then reports density and molar volume. It uses the gas constant that matches kilopascals and litres, so the units stay consistent.',
      howItWorks:
        'Temperature in Celsius is converted to kelvin. Pressure is moles times the gas constant 8.314 times temperature, divided by volume in litres, giving kilopascals. Dividing by 101.325 converts to atmospheres. Density is the mass of gas, moles times molar mass, divided by volume. Molar volume is volume divided by moles and is about 24.5 L/mol at 25 C and one atmosphere for an ideal gas.',
      example:
        'One mole of air at 25 C in 24.47 L gives P = 1 x 8.314 x 298.15 / 24.47 = 101.3 kPa, or about 1.000 atm. With a molar mass of 28.97 g/mol the density is 28.97 / 24.47 = 1.184 g/L, and the molar volume is 24.47 L/mol.',
      formulas: [
        { label: 'Pressure', expression: 'P = nRT / V' },
        { label: 'Temperature', expression: 'T (K) = temperature in C + 273.15' },
        { label: 'Density', expression: 'mass / volume = n x molar mass / V' },
        { label: 'Molar volume', expression: 'V / n' },
      ],
      sources: [
        {
          label: 'NIST - Ideal Gas Law and the Gas Constant',
          expression: 'Gas constant values and units',
          note: 'Reference values for R and the conditions under which the ideal approximation is reasonable.',
        },
        {
          label: 'OpenStax Chemistry - The Ideal Gas Law',
          expression: 'PV = nRT and its applications',
          note: 'Textbook derivation and worked examples, including unit conversion.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Pressure',
          explanation:
            'Absolute pressure in kilopascals from the ideal gas law. It is not gauge pressure; add atmospheric pressure if you need a gauge reading.',
        },
        {
          resultLabel: 'Density',
          explanation:
            'Mass per litre at the stated temperature and volume. It assumes the gas behaves ideally, which is close enough for air at ordinary conditions.',
        },
        {
          resultLabel: 'Molar volume',
          explanation:
            'Volume per mole. At 0 C and one atmosphere it is about 22.4 L/mol; at 25 C it is about 24.5 L/mol.',
        },
      ],
      workflowLinks: [
        { slug: 'molarity-calculator', step: 'Connect gas moles to solution concentration.' },
        { slug: 'molecular-weight-calculator', step: 'Find the molar mass for the gas you are modelling.' },
        { slug: 'ph-calculator', step: 'Move from gas-phase chemistry to aqueous equilibrium.' },
      ],
      faqs: [
        {
          q: 'Why do I have to add 273.15 to the temperature?',
          a: 'The gas laws are based on absolute temperature, where zero means the particles have minimum thermal energy. Celsius starts at the freezing point of water, not absolute zero. Using 25 instead of 298.15 understates the pressure by a factor of about 12.',
        },
        {
          q: 'Which value of R should I use?',
          a: 'Use 8.314 when pressure is in kPa and volume in litres. Use 0.08206 when pressure is in atmospheres and volume in litres. The numerical value changes with the units, but the physical relationship does not. This calculator uses the kPa form.',
        },
        {
          q: 'When does the ideal gas law break down?',
          a: 'At high pressure, low temperature, or near the boiling point, intermolecular forces and molecular volume matter. Real gas equations such as van der Waals add corrections. For air at room temperature and near atmospheric pressure, the ideal approximation is usually adequate.',
        },
        {
          q: 'Is the pressure absolute or gauge?',
          a: 'The ideal gas law uses absolute pressure. Gauge pressure measures the difference from the surrounding atmosphere. If a gauge reads 200 kPa, the absolute pressure is about 301 kPa at sea level, and the ideal gas calculation needs the absolute value.',
        },
        {
          q: 'Can I solve for volume or moles instead?',
          a: 'Yes, by rearranging: V = nRT/P and n = PV/RT. This calculator is set up to solve for pressure from the other three. Use the same unit discipline, and convert temperature to kelvin before substituting.',
        },
      ],
      related: ['molarity-calculator', 'molecular-weight-calculator', 'ph-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-10-26' },
  },
  {
    id: 'projectile-motion',
    slug: 'projectile-motion-calculator',
    name: 'Projectile Motion Calculator',
    shortDesc: 'Calculate flight time, range, maximum height, and launch components from speed, angle, and height.',
    tagline: 'Where the ball lands, ignoring air.',
    category: 'science',
    iconName: 'Target',
    badge: 'Physics',
    featured: false,
    keywords: [
      'projectile motion calculator',
      'trajectory calculator',
      'range of a projectile',
      'flight time calculator',
      'launch angle calculator',
      'kinematics calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'speed', label: 'Launch speed', type: 'number', defaultValue: 20, min: 0, step: 0.5, suffix: 'm/s' },
        { id: 'angle', label: 'Launch angle', type: 'number', defaultValue: 45, min: -90, max: 90, suffix: 'degrees' },
        { id: 'height', label: 'Launch height', type: 'number', defaultValue: 0, min: 0, step: 0.5, suffix: 'm' },
      ],
      results: [
        {
          label: 'Flight time',
          formulaCode:
            '(speed * Math.sin(angle * Math.PI / 180) + Math.sqrt(Math.pow(speed * Math.sin(angle * Math.PI / 180), 2) + 2 * 9.81 * height)) / 9.81',
          suffix: 's',
          accent: true,
        },
        {
          label: 'Horizontal range',
          formulaCode:
            'speed * Math.cos(angle * Math.PI / 180) * (speed * Math.sin(angle * Math.PI / 180) + Math.sqrt(Math.pow(speed * Math.sin(angle * Math.PI / 180), 2) + 2 * 9.81 * height)) / 9.81',
          suffix: 'm',
        },
        {
          label: 'Maximum height',
          formulaCode: 'height + Math.pow(speed * Math.sin(angle * Math.PI / 180), 2) / (2 * 9.81)',
          suffix: 'm',
        },
        {
          label: 'Vertical velocity',
          formulaCode: 'speed * Math.sin(angle * Math.PI / 180)',
          suffix: 'm/s',
        },
        {
          label: 'Horizontal velocity',
          formulaCode: 'speed * Math.cos(angle * Math.PI / 180)',
          suffix: 'm/s',
        },
      ],
      formulaDescription:
        'vy = v sin(angle); flight = (vy + sqrt(vy^2 + 2gh)) / g; range = v cos(angle) x flight.',
      tips: [
        'The model ignores air resistance, spin, and wind. A real ball falls short of the ideal range, especially at high speed or with a light projectile.',
        'A 45 degree launch maximises range only when the launch and landing heights are equal. Launching from a height favours a slightly lower angle.',
        'Keep the angle in degrees for this calculator. If you derive the components yourself, convert to radians before using a trig function.',
      ],
    },
    content: {
      intro:
        'The Projectile Motion Calculator finds flight time, horizontal range, maximum height, and the horizontal and vertical velocity components for a launch over level ground or from a raised height. It is the standard no-drag model used in introductory physics.',
      howItWorks:
        'The launch speed is split into vertical and horizontal components using sine and cosine. Vertical motion is accelerated by gravity at 9.81 m/s squared, so flight time is the positive root of the quadratic for the time when height returns to zero. Range is horizontal velocity times flight time. Maximum height adds the rise from the vertical component to the launch height. Gravity is assumed constant and air resistance is ignored.',
      example:
        'A ball launched at 20 m/s at 45 degrees from ground level has a vertical component of 14.14 m/s. Flight time is 2 x 14.14 / 9.81 = 2.88 s. Range is 14.14 x 2.88 = 40.77 m, and maximum height is 14.14 squared / 19.62 = 10.19 m.',
      formulas: [
        { label: 'Vertical velocity', expression: 'vy = v sin(angle)' },
        { label: 'Flight time', expression: 't = (vy + sqrt(vy^2 + 2gh)) / g' },
        { label: 'Range', expression: 'R = v cos(angle) x t' },
        { label: 'Maximum height', expression: 'h max = h + vy^2 / (2g)' },
      ],
      sources: [
        {
          label: 'OpenStax College Physics - Projectile Motion',
          expression: 'Kinematic equations for two-dimensional motion',
          note: 'Textbook derivation of range, time of flight, and maximum height without drag.',
        },
        {
          label: 'NASA - Equations of Motion',
          expression: 'Constant acceleration and trajectory',
          note: 'Reference for the kinematic relationships used in the model.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Flight time',
          explanation:
            'Time from launch until the projectile returns to the ground plane at height zero. A raised launch increases the time.',
        },
        {
          resultLabel: 'Horizontal range',
          explanation:
            'The horizontal distance at ground level, assuming no air resistance. Real range is shorter for most objects.',
        },
        {
          resultLabel: 'Maximum height',
          explanation:
            'The peak height above the ground, including any launch height. It occurs when the vertical velocity reaches zero.',
        },
      ],
      workflowLinks: [
        { slug: 'distance-formula-calculator', step: 'Check the straight-line distance between two points.' },
        { slug: 'speed-distance-time-calculator', step: 'Relate average speed, distance, and time for the flight.' },
        { slug: 'slope-calculator', step: 'Describe the launch or landing slope geometrically.' },
      ],
      faqs: [
        {
          q: 'What launch angle gives the maximum range?',
          a: 'At equal launch and landing heights, 45 degrees maximises range in a vacuum. With air resistance the optimum is usually lower, and from a raised launch point a lower angle can travel farther because the projectile stays in the air longer.',
        },
        {
          q: 'Why is the calculated range longer than what I observe?',
          a: 'The model ignores air resistance, which removes energy throughout the flight. A light or large projectile is affected more. Spin, wind, and an uneven landing surface also change the result, so treat the number as an upper bound.',
        },
        {
          q: 'Does launch height change the optimal angle?',
          a: 'Yes. When launching from a height, the projectile has extra fall time, and the angle that maximises range drops below 45 degrees. The calculator shows the range for the angle you enter; it does not search for the optimum.',
        },
        {
          q: 'Can I use this for a vertical launch?',
          a: 'Yes. At 90 degrees the horizontal component is zero, so the range is zero and the projectile rises and falls on the same line. The flight time and maximum height still apply. At negative angles the model treats the launch as downward.',
        },
        {
          q: 'Is gravity always 9.81 m/s squared?',
          a: 'It is a standard average at the Earth surface. The local value varies slightly with latitude and altitude, and other planets have very different gravity. For a school calculation, 9.81 is appropriate; for a precision trajectory, use the local value.',
        },
      ],
      related: ['distance-formula-calculator', 'speed-distance-time-calculator', 'slope-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8, updatedAt: '2026-10-26' },
  },
];
