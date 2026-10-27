import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBtu,
  calculateConversionRate,
  calculateDimensionalWeight,
  calculateEvCharge,
  calculateFreelanceRate,
  calculateInsulation,
  calculateTripCost,
  conversionsForRate,
  findDimWeightProfile,
  visitorsForConversions,
  wilsonInterval,
} from './practicalCalculations';

function closeTo(actual: number, expected: number, tolerance = 0.01): void {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`
  );
}

test('conversion rate derives rate, unit economics, and a Wilson interval', () => {
  const result = calculateConversionRate({
    visitors: 2500,
    conversions: 75,
    spend: 500,
    revenue: 7500,
  });
  closeTo(result.ratePct, 3);
  closeTo(result.visitorsPerConversion, 33.3333, 0.001);
  closeTo(result.costPerConversion!, 6.6667, 0.001);
  closeTo(result.revenuePerVisitor!, 3);
  closeTo(result.revenuePerConversion!, 100);
  assert.ok(result.intervalLowPct < result.ratePct);
  assert.ok(result.intervalHighPct > result.ratePct);
  closeTo(result.standardErrorPct, Math.sqrt((0.03 * 0.97) / 2500) * 100);
});

test('a small sample has a much wider interval than a large one', () => {
  const small = wilsonInterval(3, 100);
  const large = wilsonInterval(300, 10000);
  closeTo(small[0], 1.0256, 0.01);
  closeTo(small[1], 8.4521, 0.01);
  closeTo(large[0], 2.6834, 0.01);
  closeTo(large[1], 3.3488, 0.01);
  assert.ok(small[1] - small[0] > (large[1] - large[0]) * 5);
});

test('conversion targets round up and reject impossible rates', () => {
  assert.equal(visitorsForConversions(50, 2.5), 2000);
  assert.equal(visitorsForConversions(10, 3), 334);
  assert.equal(conversionsForRate(2500, 3.2), 80);
  assert.equal(conversionsForRate(1000, 2.55), 26);
  assert.throws(() => visitorsForConversions(50, 0), RangeError);
  assert.throws(() => visitorsForConversions(0, 3), RangeError);
});

test('conversion rate rejects impossible counts', () => {
  assert.throws(() => calculateConversionRate({ visitors: 0, conversions: 0 }), RangeError);
  assert.throws(() => calculateConversionRate({ visitors: 100, conversions: 101 }), RangeError);
  assert.throws(() => calculateConversionRate({ visitors: 100, conversions: 2.5 }), RangeError);
  assert.throws(() => calculateConversionRate({ visitors: 100, conversions: -1 }), RangeError);
  assert.throws(() => calculateConversionRate({ visitors: 100, conversions: 1, spend: -5 }), RangeError);
});

test('zero conversions produce a null cost per conversion rather than a divide-by-zero', () => {
  const result = calculateConversionRate({ visitors: 500, conversions: 0, spend: 100 });
  assert.equal(result.ratePct, 0);
  assert.equal(result.costPerConversion, null);
  assert.equal(result.visitorsPerConversion, Number.POSITIVE_INFINITY);
  assert.equal(result.intervalLowPct, 0);
  assert.ok(result.intervalHighPct > 0);
});

test('dimensional weight uses the carrier divisor and bills the greater weight', () => {
  const ups = calculateDimensionalWeight({
    length: 20,
    width: 16,
    height: 12,
    actualWeight: 10,
    profileId: 'ups-fedex',
  });
  assert.equal(ups.volume, 3840);
  assert.equal(ups.divisor, 139);
  closeTo(ups.dimensionalWeight, 27.6259, 0.001);
  closeTo(ups.billableWeight, 27.6259, 0.001);
  closeTo(ups.difference, 17.6259, 0.001);
  closeTo(ups.percentOverActual!, 176.259, 0.01);
  assert.equal(ups.dimensionalGoverns, true);

  const usps = calculateDimensionalWeight({
    length: 20,
    width: 16,
    height: 12,
    actualWeight: 30,
    profileId: 'usps-retail',
  });
  closeTo(usps.dimensionalWeight, 23.1325, 0.001);
  assert.equal(usps.billableWeight, 30);
  assert.equal(usps.dimensionalGoverns, false);
  assert.equal(usps.difference, 0);
});

test('metric dimensional weight divides cubic centimetres by 5,000 or 6,000', () => {
  const dhl = calculateDimensionalWeight({
    length: 50,
    width: 40,
    height: 30,
    actualWeight: 8,
    profileId: 'dhl',
  });
  closeTo(dhl.dimensionalWeight, 12);
  assert.equal(dhl.billableWeight, 12);

  const air = calculateDimensionalWeight({
    length: 50,
    width: 40,
    height: 30,
    actualWeight: 8,
    profileId: 'air-freight-6000',
  });
  closeTo(air.dimensionalWeight, 10);
  assert.equal(findDimWeightProfile('air-freight-6000').divisor, 6000);
});

test('dimensional weight rejects missing dimensions and unknown profiles', () => {
  assert.throws(
    () => calculateDimensionalWeight({ length: 0, width: 10, height: 10, actualWeight: 1, profileId: 'dhl' }),
    RangeError
  );
  assert.throws(
    () =>
      calculateDimensionalWeight({
        length: 10,
        width: 10,
        height: 10,
        actualWeight: 1,
        profileId: 'not-a-carrier' as never,
      }),
    RangeError
  );
});

test('freelance rate grosses up for tax and expenses over billable hours', () => {
  const result = calculateFreelanceRate({
    targetIncome: 80000,
    taxRatePct: 30,
    businessExpenses: 12000,
    billableHoursPerWeek: 25,
    weeksOff: 4,
    hoursPerDay: 6,
  });
  assert.equal(result.weeksWorked, 48);
  assert.equal(result.billableHoursPerYear, 1200);
  closeTo(result.revenueNeeded, 126285.714, 0.01);
  closeTo(result.hourlyRate, 105.2381, 0.001);
  closeTo(result.dayRate, 631.4286, 0.001);
  closeTo(result.weeklyRevenue, 2630.9524, 0.001);
  closeTo(result.monthlyRetainer, 11400.7937, 0.01);
  closeTo(result.netPerBillableHour, 66.6667, 0.001);
  closeTo(result.expenseSharePct, 9.5023, 0.001);
});

test('freelance rate rejects impossible working patterns', () => {
  const base = {
    targetIncome: 80000,
    taxRatePct: 30,
    businessExpenses: 12000,
    billableHoursPerWeek: 25,
    weeksOff: 4,
    hoursPerDay: 6,
  };
  assert.throws(() => calculateFreelanceRate({ ...base, taxRatePct: 100 }), RangeError);
  assert.throws(() => calculateFreelanceRate({ ...base, billableHoursPerWeek: 0 }), RangeError);
  assert.throws(() => calculateFreelanceRate({ ...base, weeksOff: 52 }), RangeError);
  assert.throws(() => calculateFreelanceRate({ ...base, targetIncome: 0 }), RangeError);
});

test('EV charging separates battery energy from grid energy', () => {
  const result = calculateEvCharge({
    batteryKwh: 75,
    startPct: 20,
    endPct: 80,
    efficiencyPerKwh: 3.5,
    homePricePerKwh: 0.16,
    publicPricePerKwh: 0.45,
    chargingLossPct: 10,
    chargerKw: 7.2,
  });
  closeTo(result.energyAddedKwh, 45);
  closeTo(result.gridEnergyKwh, 50);
  closeTo(result.lossKwh, 5);
  closeTo(result.rangeAdded, 157.5);
  closeTo(result.homeCost, 8);
  closeTo(result.publicCost, 22.5);
  closeTo(result.publicPremium, 14.5);
  closeTo(result.costPerDistanceHome, 0.05079, 0.0001);
  closeTo(result.costPerDistancePublic, 0.14286, 0.0001);
  closeTo(result.chargingMinutes, 416.667, 0.01);
});

test('EV charging rejects an empty or reversed charge window', () => {
  const base = {
    batteryKwh: 75,
    startPct: 20,
    endPct: 80,
    efficiencyPerKwh: 3.5,
    homePricePerKwh: 0.16,
    publicPricePerKwh: 0.45,
    chargingLossPct: 10,
    chargerKw: 7.2,
  };
  assert.throws(() => calculateEvCharge({ ...base, endPct: 20 }), RangeError);
  assert.throws(() => calculateEvCharge({ ...base, endPct: 120 }), RangeError);
  assert.throws(() => calculateEvCharge({ ...base, efficiencyPerKwh: 0 }), RangeError);
  assert.throws(() => calculateEvCharge({ ...base, chargingLossPct: 60 }), RangeError);
  assert.throws(() => calculateEvCharge({ ...base, chargerKw: 0 }), RangeError);
});

test('trip cost adds fuel, tolls, parking, lodging, food, and extras', () => {
  const result = calculateTripCost({
    oneWayDistance: 250,
    roundTrip: true,
    efficiency: 25,
    fuelPrice: 3.5,
    efficiencyUnit: 'mpg',
    tolls: 30,
    parkingPerDay: 12,
    days: 3,
    lodgingPerNight: 120,
    nights: 2,
    foodPerDay: 40,
    travellers: 3,
    other: 50,
  });
  assert.equal(result.distance, 500);
  closeTo(result.fuelVolume, 20);
  closeTo(result.fuelCost, 70);
  closeTo(result.parkingCost, 36);
  closeTo(result.lodgingCost, 240);
  closeTo(result.foodCost, 360);
  closeTo(result.otherCost, 80);
  closeTo(result.total, 786);
  closeTo(result.perPerson, 262);
  closeTo(result.perDistance, 1.572);
  closeTo(result.fuelSharePct, 8.9059, 0.001);
});

test('metric trip cost uses litres per 100 km', () => {
  const result = calculateTripCost({
    oneWayDistance: 400,
    roundTrip: true,
    efficiency: 7.5,
    fuelPrice: 1.6,
    efficiencyUnit: 'l-per-100km',
    tolls: 0,
    parkingPerDay: 0,
    days: 1,
    lodgingPerNight: 0,
    nights: 0,
    foodPerDay: 0,
    travellers: 2,
    other: 0,
  });
  assert.equal(result.distance, 800);
  closeTo(result.fuelVolume, 60);
  closeTo(result.fuelCost, 96);
  closeTo(result.total, 96);
  closeTo(result.perPerson, 48);
});

test('trip cost rejects zero distance, zero efficiency, and fractional travellers', () => {
  const base = {
    oneWayDistance: 250,
    roundTrip: true,
    efficiency: 25,
    fuelPrice: 3.5,
    efficiencyUnit: 'mpg' as const,
    tolls: 0,
    parkingPerDay: 0,
    days: 1,
    lodgingPerNight: 0,
    nights: 0,
    foodPerDay: 0,
    travellers: 1,
    other: 0,
  };
  assert.throws(() => calculateTripCost({ ...base, oneWayDistance: 0 }), RangeError);
  assert.throws(() => calculateTripCost({ ...base, efficiency: 0 }), RangeError);
  assert.throws(() => calculateTripCost({ ...base, travellers: 1.5 }), RangeError);
  assert.throws(() => calculateTripCost({ ...base, days: -1 }), RangeError);
});

test('BTU load scales with area, ceiling height, insulation, sun, people, and kitchen', () => {
  const base = calculateBtu({
    areaSqFt: 300,
    ceilingHeightFt: 8,
    insulation: 'average',
    sun: 'sunny',
    occupants: 2,
    kitchen: false,
  });
  assert.equal(base.btuPerHour, 6600);
  assert.equal(base.recommendedBtu, 8000);
  closeTo(base.tons, 0.55);
  closeTo(base.kw, 1.9343, 0.001);

  const withKitchen = calculateBtu({
    areaSqFt: 300,
    ceilingHeightFt: 8,
    insulation: 'average',
    sun: 'sunny',
    occupants: 2,
    kitchen: true,
  });
  assert.equal(withKitchen.btuPerHour, 10600);
  assert.equal(withKitchen.recommendedBtu, 12000);

  const busyRoom = calculateBtu({
    areaSqFt: 300,
    ceilingHeightFt: 10,
    insulation: 'poor',
    sun: 'sunny',
    occupants: 4,
    kitchen: false,
  });
  // 300 x 20 x (10/8) x 1.15 x 1.1 + 2 x 600 = 10,686 -> rounded to 10,700
  assert.equal(busyRoom.btuPerHour, 10700);
  assert.equal(busyRoom.recommendedBtu, 12000);
});

test('BTU rejects impossible room inputs', () => {
  const base = {
    areaSqFt: 300,
    ceilingHeightFt: 8,
    insulation: 'average' as const,
    sun: 'sunny' as const,
    occupants: 2,
    kitchen: false,
  };
  assert.throws(() => calculateBtu({ ...base, areaSqFt: 0 }), RangeError);
  assert.throws(() => calculateBtu({ ...base, ceilingHeightFt: 5 }), RangeError);
  assert.throws(() => calculateBtu({ ...base, occupants: -1 }), RangeError);
  assert.throws(() => calculateBtu({ ...base, insulation: 'straw' as never }), RangeError);
});

test('insulation quantity subtracts openings and rounds packages up', () => {
  const result = calculateInsulation({
    area: 800,
    openings: 100,
    targetR: 38,
    existingR: 13,
    materialId: 'fiberglass-batt',
    coveragePerPackage: 88,
    wastePct: 10,
    pricePerPackage: 55,
  });
  assert.equal(result.netArea, 700);
  assert.equal(result.additionalR, 25);
  assert.equal(result.totalR, 38);
  closeTo(result.thicknessIn, 7.8125);
  assert.equal(result.packages, 9);
  assert.equal(result.cost, 495);
  assert.equal(result.coveredArea, 792);
  assert.equal(result.leftoverArea, 92);
  assert.equal(result.meetsTarget, false);
});

test('insulation reports no work when the existing R-value already meets the target', () => {
  const result = calculateInsulation({
    area: 800,
    openings: 100,
    targetR: 38,
    existingR: 40,
    materialId: 'blown-cellulose',
    coveragePerPackage: 40,
    wastePct: 10,
    pricePerPackage: 20,
  });
  assert.equal(result.additionalR, 0);
  assert.equal(result.thicknessIn, 0);
  assert.equal(result.packages, 0);
  assert.equal(result.cost, 0);
  assert.equal(result.totalR, 40);
  assert.equal(result.meetsTarget, true);
});

test('insulation rejects openings larger than the wall and unknown materials', () => {
  const base = {
    area: 800,
    openings: 100,
    targetR: 38,
    existingR: 13,
    materialId: 'fiberglass-batt' as const,
    coveragePerPackage: 88,
    wastePct: 10,
    pricePerPackage: 55,
  };
  assert.throws(() => calculateInsulation({ ...base, openings: 900 }), RangeError);
  assert.throws(() => calculateInsulation({ ...base, targetR: 0 }), RangeError);
  assert.throws(() => calculateInsulation({ ...base, coveragePerPackage: 0 }), RangeError);
  assert.throws(() => calculateInsulation({ ...base, wastePct: 60 }), RangeError);
  assert.throws(() => calculateInsulation({ ...base, materialId: 'newspaper' as never }), RangeError);
});
