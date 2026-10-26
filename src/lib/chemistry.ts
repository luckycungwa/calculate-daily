/**
 * Chemistry helpers: formula parsing, molarity, dilution, pH, and half-life.
 *
 * Atomic masses are IUPAC 2021 standard atomic weights (abridged, two to five significant
 * figures). They are conventional values for stoichiometry, not isotope-specific masses.
 */

export const ATOMIC_MASSES: Record<string, number> = {
  H: 1.008,
  He: 4.0026,
  Li: 6.94,
  Be: 9.0122,
  B: 10.81,
  C: 12.011,
  N: 14.007,
  O: 15.999,
  F: 18.998,
  Ne: 20.18,
  Na: 22.99,
  Mg: 24.305,
  Al: 26.982,
  Si: 28.085,
  P: 30.974,
  S: 32.06,
  Cl: 35.45,
  Ar: 39.948,
  K: 39.098,
  Ca: 40.078,
  Sc: 44.956,
  Ti: 47.867,
  V: 50.942,
  Cr: 51.996,
  Mn: 54.938,
  Fe: 55.845,
  Co: 58.933,
  Ni: 58.693,
  Cu: 63.546,
  Zn: 65.38,
  Ga: 69.723,
  Ge: 72.63,
  As: 74.922,
  Se: 78.971,
  Br: 79.904,
  Kr: 83.798,
  Rb: 85.468,
  Sr: 87.62,
  Y: 88.906,
  Zr: 91.224,
  Nb: 92.906,
  Mo: 95.95,
  Ag: 107.87,
  Cd: 112.41,
  In: 114.82,
  Sn: 118.71,
  Sb: 121.76,
  Te: 127.6,
  I: 126.9,
  Xe: 131.29,
  Cs: 132.91,
  Ba: 137.33,
  La: 138.91,
  Ce: 140.12,
  Pt: 195.08,
  Au: 196.97,
  Hg: 200.59,
  Tl: 204.38,
  Pb: 207.2,
  Bi: 208.98,
  Th: 232.04,
  U: 238.03,
};

export interface FormulaComposition {
  formula: string;
  molarMass: number;
  counts: Record<string, number>;
  totalAtoms: number;
  massPercent: Record<string, number>;
}

type Counts = Record<string, number>;

function addCounts(target: Counts, source: Counts, multiplier: number): void {
  for (const [element, count] of Object.entries(source)) {
    target[element] = (target[element] ?? 0) + count * multiplier;
  }
}

/**
 * Parses a plain molecular formula such as C6H12O6, Ca(OH)2, or CuSO4·5H2O.
 * Charges, state symbols, and coefficient prefixes are rejected rather than guessed at.
 */
export function parseChemicalFormula(input: string): FormulaComposition {
  const formula = input.replace(/\s+/g, '');
  if (!formula) {
    throw new RangeError('Enter a chemical formula, such as H2O or C6H12O6.');
  }

  /*
   * Hydrates are written as separate formula units, e.g. CuSO4·5H2O. The coefficient after the
   * separator multiplies the whole following unit, not just its first element, so the formula is
   * split into top-level segments before anything is counted.
   */
  const segments: string[] = [];
  let depth = 0;
  let current = '';

  for (const char of formula) {
    if (char === '(' || char === '[') {
      depth += 1;
      current += char;
      continue;
    }
    if (char === ')' || char === ']') {
      depth -= 1;
      if (depth < 0) {
        throw new RangeError('Unmatched closing bracket in the formula.');
      }
      current += char;
      continue;
    }
    if (depth === 0 && (char === '\u00b7' || char === '*' || char === '.')) {
      if (!current) {
        throw new RangeError('A hydrate separator must sit between two formula units.');
      }
      segments.push(current);
      current = '';
      continue;
    }
    current += char;
  }

  if (depth !== 0) {
    throw new RangeError('Unclosed bracket in the formula.');
  }
  if (!current) {
    throw new RangeError('A hydrate separator must sit between two formula units.');
  }
  segments.push(current);

  const counts: Counts = {};

  for (const [segmentIndex, segment] of segments.entries()) {
    let index = 0;
    const length = segment.length;

    const parseNumber = (): number => {
      const start = index;
      while (index < length && /\d/.test(segment[index])) index += 1;
      if (start === index) return 1;
      const value = Number(segment.slice(start, index));
      if (!Number.isInteger(value) || value < 1) {
        throw new RangeError('Subscripts must be whole numbers of 1 or more.');
      }
      return value;
    };

    // Only a hydrate continuation may start with a coefficient: "·5H2O" is valid, "2H2O" is not.
    const unitMultiplier = segmentIndex > 0 && /^\d/.test(segment) ? parseNumber() : 1;

    interface GroupResult {
      counts: Counts;
      sawContent: boolean;
      closedWith?: string;
    }

    const parseGroup = (nested: boolean): GroupResult => {
      const groupCounts: Counts = {};
      let sawContent = false;

      while (index < length) {
        const char = segment[index];

        if (char === ')' || char === ']') {
          if (!nested) throw new RangeError('Unmatched closing bracket in the formula.');
          index += 1;
          return { counts: groupCounts, sawContent, closedWith: char };
        }

        if (char === '(' || char === '[') {
          const expected = char === '(' ? ')' : ']';
          index += 1;
          const inner = parseGroup(true);
          if (inner.closedWith !== expected) {
            throw new RangeError(`Missing "${expected}" in the formula.`);
          }
          if (!inner.sawContent) {
            throw new RangeError('Empty group in the formula.');
          }
          const multiplier = parseNumber();
          addCounts(groupCounts, inner.counts, multiplier);
          sawContent = true;
          continue;
        }

        if (/[A-Z]/.test(char)) {
          let symbol = char;
          index += 1;
          while (index < length && /[a-z]/.test(segment[index])) {
            symbol += segment[index];
            index += 1;
          }
          if (!ATOMIC_MASSES[symbol]) {
            throw new RangeError(`Unknown element "${symbol}". Check capitalisation, for example Co vs CO.`);
          }
          const count = parseNumber();
          groupCounts[symbol] = (groupCounts[symbol] ?? 0) + count;
          sawContent = true;
          continue;
        }

        if (/\d/.test(char)) {
          throw new RangeError('A subscript must follow an element or a closing bracket.');
        }

        throw new RangeError(`Unexpected character "${char}" in the formula.`);
      }

      if (nested) {
        throw new RangeError('Unclosed bracket in the formula.');
      }
      return { counts: groupCounts, sawContent };
    };

    const parsed = parseGroup(false);
    if (index !== length) {
      throw new RangeError('The formula could not be read to the end.');
    }
    if (!parsed.sawContent) {
      throw new RangeError('Empty group in the formula.');
    }
    addCounts(counts, parsed.counts, unitMultiplier);
  }

  if (Object.keys(counts).length === 0) {
    throw new RangeError('Enter at least one element.');
  }
  let molarMass = 0;
  let totalAtoms = 0;
  for (const [element, count] of Object.entries(counts)) {
    molarMass += ATOMIC_MASSES[element] * count;
    totalAtoms += count;
  }

  const massPercent: Record<string, number> = {};
  for (const [element, count] of Object.entries(counts)) {
    massPercent[element] = ((ATOMIC_MASSES[element] * count) / molarMass) * 100;
  }

  return { formula, molarMass, counts, totalAtoms, massPercent };
}

export interface MolarityResult {
  molarity: number;
  moles: number;
  millimoles: number;
  millimolarity: number;
}

export function calculateMolarity(massG: number, molarMass: number, volumeL: number): MolarityResult {
  if (!Number.isFinite(massG) || massG < 0) {
    throw new RangeError('Mass must be zero or greater.');
  }
  if (!Number.isFinite(molarMass) || molarMass <= 0) {
    throw new RangeError('Molar mass must be greater than zero.');
  }
  if (!Number.isFinite(volumeL) || volumeL <= 0) {
    throw new RangeError('Volume must be greater than zero.');
  }

  const moles = massG / molarMass;
  const molarity = moles / volumeL;

  return {
    molarity,
    moles,
    millimoles: moles * 1000,
    millimolarity: molarity * 1000,
  };
}

export interface DilutionResult {
  stockVolume: number;
  diluentVolume: number;
  dilutionFactor: number;
  finalConcentration: number;
}

/**
 * C1V1 = C2V2. `stockVolume` is the volume of stock needed to reach `finalVolume` at
 * `targetConcentration`. `actualStockVolume` (optional) drives the predicted final concentration.
 */
export function calculateDilution(
  stockConcentration: number,
  targetConcentration: number,
  finalVolume: number,
  actualStockVolume?: number
): DilutionResult {
  if (!Number.isFinite(stockConcentration) || stockConcentration <= 0) {
    throw new RangeError('Stock concentration must be greater than zero.');
  }
  if (!Number.isFinite(targetConcentration) || targetConcentration <= 0) {
    throw new RangeError('Target concentration must be greater than zero.');
  }
  if (!Number.isFinite(finalVolume) || finalVolume <= 0) {
    throw new RangeError('Final volume must be greater than zero.');
  }
  if (targetConcentration > stockConcentration) {
    throw new RangeError('Target concentration cannot exceed the stock concentration — diluting only lowers it.');
  }

  const stockVolume = (targetConcentration * finalVolume) / stockConcentration;
  const usedStock = actualStockVolume ?? stockVolume;

  return {
    stockVolume,
    diluentVolume: finalVolume - stockVolume,
    dilutionFactor: stockConcentration / targetConcentration,
    finalConcentration: usedStock > 0 ? (stockConcentration * usedStock) / finalVolume : 0,
  };
}

export interface PhResult {
  ph: number;
  poh: number;
  hydrogen: number;
  hydroxide: number;
  classification: 'acidic' | 'neutral' | 'basic';
}

function buildPhResult(ph: number): PhResult {
  if (!Number.isFinite(ph) || ph < -1 || ph > 15) {
    throw new RangeError('pH must be between -1 and 15.');
  }
  const hydrogen = 10 ** -ph;
  return {
    ph,
    poh: 14 - ph,
    hydrogen,
    hydroxide: 1e-14 / hydrogen,
    classification: ph < 6.95 ? 'acidic' : ph > 7.05 ? 'basic' : 'neutral',
  };
}

/** pH from hydrogen-ion concentration in mol/L. */
export function phFromHydrogen(hydrogen: number): PhResult {
  if (!Number.isFinite(hydrogen) || hydrogen <= 0) {
    throw new RangeError('Hydrogen-ion concentration must be greater than zero.');
  }
  return buildPhResult(-Math.log10(hydrogen));
}

export function phFromValue(ph: number): PhResult {
  return buildPhResult(ph);
}

export interface HalfLifeResult {
  remaining: number;
  decayed: number;
  halfLives: number;
  percentRemaining: number;
}

export function calculateHalfLife(initial: number, halfLife: number, elapsed: number): HalfLifeResult {
  if (!Number.isFinite(initial) || initial < 0) {
    throw new RangeError('Initial amount must be zero or greater.');
  }
  if (!Number.isFinite(halfLife) || halfLife <= 0) {
    throw new RangeError('Half-life must be greater than zero.');
  }
  if (!Number.isFinite(elapsed) || elapsed < 0) {
    throw new RangeError('Elapsed time must be zero or greater.');
  }

  const halfLives = elapsed / halfLife;
  const remaining = initial * 0.5 ** halfLives;

  return {
    remaining,
    decayed: initial - remaining,
    halfLives,
    percentRemaining: initial === 0 ? 0 : (remaining / initial) * 100,
  };
}
