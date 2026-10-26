export interface DebtInput {
  name: string;
  balance: number;
  annualRate: number;
  minimumPayment: number;
}

export interface DebtPayoffResult {
  payoffMonths: number;
  totalInterest: number;
  totalPayments: number;
  payoffOrder: string[];
}

export type DebtPayoffStrategy = 'snowball' | 'avalanche';

export function simulateDebtPayoff(
  debts: DebtInput[],
  extraMonthly: number,
  strategy: DebtPayoffStrategy,
): DebtPayoffResult {
  if (debts.length < 1 || debts.length > 8) throw new RangeError('Enter between 1 and 8 debts.');
  if (!Number.isFinite(extraMonthly) || extraMonthly < 0) throw new RangeError('Extra monthly budget must be finite and non-negative.');
  const names = new Set<string>();
  for (const debt of debts) {
    if (!debt.name.trim() || names.has(debt.name.trim().toLowerCase())) throw new RangeError('Each debt needs a distinct name.');
    names.add(debt.name.trim().toLowerCase());
    if (![debt.balance, debt.annualRate, debt.minimumPayment].every(Number.isFinite)) {
      throw new RangeError('Debt balances, APRs, and minimum payments must be finite.');
    }
    if (debt.balance <= 0 || debt.annualRate < 0 || debt.annualRate > 100 || debt.minimumPayment <= 0) {
      throw new RangeError('Balances and minimum payments must be positive; APR must be from 0% to 100%.');
    }
  }

  const balances = debts.map((debt) => debt.balance);
  const monthlyBudget = debts.reduce((total, debt) => total + debt.minimumPayment, extraMonthly);
  if (!Number.isFinite(monthlyBudget)) throw new RangeError('Monthly payment budget exceeds the supported range.');
  const payoffOrder: string[] = [];
  let totalInterest = 0;
  let totalPayments = 0;

  for (let month = 1; month <= 600; month += 1) {
    for (let index = 0; index < debts.length; index += 1) {
      if (balances[index] <= 0) continue;
      const interest = balances[index] * debts[index].annualRate / 1200;
      balances[index] += interest;
      totalInterest += interest;
      if (!Number.isFinite(balances[index]) || !Number.isFinite(totalInterest)) {
        throw new RangeError('The payoff projection exceeds the supported calculation range.');
      }
    }

    let budgetLeft = monthlyBudget;
    for (let index = 0; index < debts.length; index += 1) {
      if (balances[index] <= 0) continue;
      const payment = Math.min(balances[index], debts[index].minimumPayment);
      balances[index] -= payment;
      budgetLeft -= payment;
      totalPayments += payment;
      if (balances[index] <= 0.005 && !payoffOrder.includes(debts[index].name)) {
        balances[index] = 0;
        payoffOrder.push(debts[index].name);
      }
    }

    const priority = debts
      .map((debt, index) => ({ debt, index }))
      .filter(({ index }) => balances[index] > 0)
      .sort((left, right) => strategy === 'snowball'
        ? balances[left.index] - balances[right.index]
        : right.debt.annualRate - left.debt.annualRate || balances[left.index] - balances[right.index]);

    for (const { debt, index } of priority) {
      if (budgetLeft <= 0) break;
      const payment = Math.min(balances[index], budgetLeft);
      balances[index] -= payment;
      budgetLeft -= payment;
      totalPayments += payment;
      if (balances[index] <= 0.005) {
        balances[index] = 0;
        if (!payoffOrder.includes(debt.name)) payoffOrder.push(debt.name);
      }
    }

    if (balances.every((balance) => balance === 0)) {
      return { payoffMonths: month, totalInterest, totalPayments, payoffOrder };
    }
  }

  throw new RangeError('The entered payments do not pay off every debt within 50 years.');
}

export interface TileOrderInput {
  roomAreaSquareFeet: number;
  tileLengthInches: number;
  tileWidthInches: number;
  wastePercent: number;
  tilesPerBox: number;
}

export interface TileOrderResult {
  tileAreaSquareFeet: number;
  orderAreaSquareFeet: number;
  tileCount: number;
  boxCount: number;
}

export function calculateTileOrder(input: TileOrderInput): TileOrderResult {
  const { roomAreaSquareFeet, tileLengthInches, tileWidthInches, wastePercent, tilesPerBox } = input;
  if (![roomAreaSquareFeet, tileLengthInches, tileWidthInches, wastePercent, tilesPerBox].every(Number.isFinite)) {
    throw new RangeError('Enter finite values for all tile inputs.');
  }
  if (roomAreaSquareFeet <= 0 || tileLengthInches <= 0 || tileWidthInches <= 0 || tilesPerBox <= 0) {
    throw new RangeError('Room area, tile dimensions, and tiles per box must be greater than zero.');
  }
  if (wastePercent < 0 || wastePercent > 50 || !Number.isInteger(tilesPerBox)) {
    throw new RangeError('Waste must be from 0% to 50%; tiles per box must be a whole number.');
  }
  const tileAreaSquareFeet = tileLengthInches * tileWidthInches / 144;
  const orderAreaSquareFeet = roomAreaSquareFeet * (1 + wastePercent / 100);
  const tileCount = Math.ceil(orderAreaSquareFeet / tileAreaSquareFeet);
  const boxCount = Math.ceil(tileCount / tilesPerBox);
  if (![tileAreaSquareFeet, orderAreaSquareFeet, tileCount, boxCount].every(Number.isFinite)) {
    throw new RangeError('The tile order is outside the supported calculation range.');
  }
  return { tileAreaSquareFeet, orderAreaSquareFeet, tileCount, boxCount };
}

export interface LandscapeMaterialInput {
  areaSquareFeet: number;
  depthInches: number;
  bagVolumeCubicFeet: number;
}

export interface LandscapeMaterialResult {
  volumeCubicFeet: number;
  volumeCubicYards: number;
  bagCount: number;
}

export function calculateLandscapeMaterial(input: LandscapeMaterialInput): LandscapeMaterialResult {
  const { areaSquareFeet, depthInches, bagVolumeCubicFeet } = input;
  if (![areaSquareFeet, depthInches, bagVolumeCubicFeet].every(Number.isFinite)) {
    throw new RangeError('Enter finite values for area, depth, and bag size.');
  }
  if (areaSquareFeet <= 0 || depthInches <= 0 || bagVolumeCubicFeet <= 0) {
    throw new RangeError('Area, depth, and bag volume must be greater than zero.');
  }
  const volumeCubicFeet = areaSquareFeet * depthInches / 12;
  const volumeCubicYards = volumeCubicFeet / 27;
  const bagCount = Math.ceil(volumeCubicFeet / bagVolumeCubicFeet);
  if (![volumeCubicFeet, volumeCubicYards, bagCount].every(Number.isFinite)) {
    throw new RangeError('The material estimate is outside the supported calculation range.');
  }
  return { volumeCubicFeet, volumeCubicYards, bagCount };
}

export interface RoofingInput {
  footprintSquareFeet: number;
  riseInchesPer12: number;
  wastePercent: number;
  bundleCoverageSquareFeet: number;
}

export interface RoofingResult {
  pitchMultiplier: number;
  roofAreaSquareFeet: number;
  orderAreaSquareFeet: number;
  roofingSquares: number;
  bundleCount: number;
}

export function calculateRoofingMaterials(input: RoofingInput): RoofingResult {
  const { footprintSquareFeet, riseInchesPer12, wastePercent, bundleCoverageSquareFeet } = input;
  if (![footprintSquareFeet, riseInchesPer12, wastePercent, bundleCoverageSquareFeet].every(Number.isFinite)) {
    throw new RangeError('Enter finite values for all roofing inputs.');
  }
  if (footprintSquareFeet <= 0 || bundleCoverageSquareFeet <= 0 || riseInchesPer12 < 0 || riseInchesPer12 > 36) {
    throw new RangeError('Footprint and bundle coverage must be positive; pitch rise must be from 0 to 36 inches per 12 inches.');
  }
  if (wastePercent < 0 || wastePercent > 50) throw new RangeError('Waste must be from 0% to 50%.');
  const pitchMultiplier = Math.sqrt(1 + (riseInchesPer12 / 12) ** 2);
  const roofAreaSquareFeet = footprintSquareFeet * pitchMultiplier;
  const orderAreaSquareFeet = roofAreaSquareFeet * (1 + wastePercent / 100);
  const roofingSquares = orderAreaSquareFeet / 100;
  const bundleCount = Math.ceil(orderAreaSquareFeet / bundleCoverageSquareFeet);
  if (![pitchMultiplier, roofAreaSquareFeet, orderAreaSquareFeet, roofingSquares, bundleCount].every(Number.isFinite)) {
    throw new RangeError('The roofing estimate is outside the supported calculation range.');
  }
  return { pitchMultiplier, roofAreaSquareFeet, orderAreaSquareFeet, roofingSquares, bundleCount };
}

export interface RentalYieldInput {
  purchasePrice: number;
  closingCosts: number;
  monthlyRent: number;
  annualExpenses: number;
  vacancyPercent: number;
}

export interface RentalYieldResult {
  grossYieldPercent: number;
  netYieldPercent: number;
  monthlyCashFlowBeforeFinancing: number;
  annualNetOperatingIncome: number;
}

export function calculateRentalYield(input: RentalYieldInput): RentalYieldResult {
  const { purchasePrice, closingCosts, monthlyRent, annualExpenses, vacancyPercent } = input;
  if (![purchasePrice, closingCosts, monthlyRent, annualExpenses, vacancyPercent].every(Number.isFinite)) {
    throw new RangeError('Enter finite values for all property inputs.');
  }
  if (purchasePrice <= 0 || closingCosts < 0 || monthlyRent < 0 || annualExpenses < 0) {
    throw new RangeError('Purchase price must be positive; other cash inputs must be non-negative.');
  }
  if (vacancyPercent < 0 || vacancyPercent > 100) throw new RangeError('Vacancy allowance must be from 0% to 100%.');
  const invested = purchasePrice + closingCosts;
  const annualScheduledRent = monthlyRent * 12;
  const annualNetOperatingIncome = annualScheduledRent * (1 - vacancyPercent / 100) - annualExpenses;
  const grossYieldPercent = annualScheduledRent / purchasePrice * 100;
  const netYieldPercent = annualNetOperatingIncome / invested * 100;
  const monthlyCashFlowBeforeFinancing = annualNetOperatingIncome / 12;
  if (![invested, annualNetOperatingIncome, grossYieldPercent, netYieldPercent, monthlyCashFlowBeforeFinancing].every(Number.isFinite)) {
    throw new RangeError('The rental yield result is outside the supported calculation range.');
  }
  return { grossYieldPercent, netYieldPercent, monthlyCashFlowBeforeFinancing, annualNetOperatingIncome };
}

export interface CommissionInput {
  saleAmount: number;
  commissionPercent: number;
  recipientSharePercent: number;
}

export interface CommissionResult {
  totalCommission: number;
  recipientCommission: number;
  remainingCommission: number;
}

export function calculateCommission(input: CommissionInput): CommissionResult {
  const { saleAmount, commissionPercent, recipientSharePercent } = input;
  if (![saleAmount, commissionPercent, recipientSharePercent].every(Number.isFinite)) {
    throw new RangeError('Enter finite values for all commission inputs.');
  }
  if (saleAmount < 0 || commissionPercent < 0 || commissionPercent > 100 || recipientSharePercent < 0 || recipientSharePercent > 100) {
    throw new RangeError('Sale amount must be non-negative and both percentages must be from 0% to 100%.');
  }
  const totalCommission = saleAmount * commissionPercent / 100;
  const recipientCommission = totalCommission * recipientSharePercent / 100;
  const remainingCommission = totalCommission - recipientCommission;
  if (![totalCommission, recipientCommission, remainingCommission].every(Number.isFinite)) {
    throw new RangeError('The commission result is outside the supported calculation range.');
  }
  return { totalCommission, recipientCommission, remainingCommission };
}

export type DistanceUnit = 'miles' | 'kilometers';
export type FuelUnit = 'us-gallons' | 'imperial-gallons' | 'liters';

export interface FuelEconomyInput {
  distance: number;
  distanceUnit: DistanceUnit;
  fuelUsed: number;
  fuelUnit: FuelUnit;
}

export interface FuelEconomyResult {
  usMilesPerGallon: number;
  imperialMilesPerGallon: number;
  litersPer100Kilometers: number;
}

export function calculateFuelEconomy(input: FuelEconomyInput): FuelEconomyResult {
  const { distance, distanceUnit, fuelUsed, fuelUnit } = input;
  if (![distance, fuelUsed].every(Number.isFinite) || distance <= 0 || fuelUsed <= 0) {
    throw new RangeError('Distance and fuel used must be finite values greater than zero.');
  }
  const miles = distanceUnit === 'kilometers' ? distance / 1.609344 : distance;
  const liters = fuelUnit === 'liters' ? fuelUsed : fuelUsed * (fuelUnit === 'us-gallons' ? 3.785411784 : 4.54609);
  const usMilesPerGallon = miles / liters * 3.785411784;
  const imperialMilesPerGallon = miles / liters * 4.54609;
  const litersPer100Kilometers = liters / (miles * 1.609344) * 100;
  if (![usMilesPerGallon, imperialMilesPerGallon, litersPer100Kilometers].every(Number.isFinite)) {
    throw new RangeError('The fuel-economy result is outside the supported calculation range.');
  }
  return { usMilesPerGallon, imperialMilesPerGallon, litersPer100Kilometers };
}

export function convertUnixTimestamp(timestampText: string, unit: 'seconds' | 'milliseconds') {
  const timestamp = timestampText.trim() === '' ? Number.NaN : Number(timestampText);
  if (!Number.isFinite(timestamp)) throw new RangeError('Enter a finite Unix timestamp.');
  const milliseconds = unit === 'seconds' ? timestamp * 1000 : timestamp;
  if (!Number.isFinite(milliseconds) || Math.abs(milliseconds) > 8.64e15) {
    throw new RangeError('Timestamp is outside the supported date range.');
  }
  const date = new Date(milliseconds);
  if (!Number.isFinite(date.getTime())) throw new RangeError('Timestamp is not a valid date.');
  return { isoUtc: date.toISOString(), seconds: date.getTime() / 1000, milliseconds: date.getTime() };
}

export interface WordCountResult {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  estimatedReadingMinutes: number;
}

export function countText(text: string, wordsPerMinute: number): WordCountResult {
  if (typeof text !== 'string' || !Number.isFinite(wordsPerMinute) || wordsPerMinute <= 0 || wordsPerMinute > 2000) {
    throw new RangeError('Enter text and a reading speed greater than 0 and no more than 2,000 words per minute.');
  }
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/u).length : 0;
  const sentences = (trimmed.match(/[.!?]+(?=\s|$)/gu) ?? []).length;
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/u).filter((paragraph) => paragraph.trim()).length : 0;
  const estimatedReadingMinutes = words / wordsPerMinute;
  if (!Number.isFinite(estimatedReadingMinutes)) throw new RangeError('Text is outside the supported calculation range.');
  return {
    words,
    charactersWithSpaces: text.length,
    charactersWithoutSpaces: text.replace(/\s/gu, '').length,
    sentences,
    paragraphs,
    estimatedReadingMinutes,
  };
}

export function calculateDensity(massKilograms: number, volumeLiters: number) {
  if (![massKilograms, volumeLiters].every(Number.isFinite) || massKilograms <= 0 || volumeLiters <= 0) {
    throw new RangeError('Mass and volume must be finite values greater than zero.');
  }
  const kilogramsPerCubicMeter = massKilograms / volumeLiters * 1000;
  const gramsPerCubicCentimeter = massKilograms / volumeLiters;
  if (![kilogramsPerCubicMeter, gramsPerCubicCentimeter].every(Number.isFinite)) {
    throw new RangeError('Density is outside the supported calculation range.');
  }
  return { kilogramsPerCubicMeter, gramsPerCubicCentimeter };
}