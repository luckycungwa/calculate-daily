import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCarDepreciation,
  calculatePizzaDough,
  calculateTireSize,
  convertButter,
  convertOvenTemperature,
  findFlourType,
  findIngredientDensity,
  formatGasMark,
  formatHoursMinutes,
  formatPace,
  gramsFromVolume,
  solveSpeedDistanceTime,
  volumeFromGrams,
} from './foodAndAuto';

test('ingredient density converts cups, spoons, millilitres, and fluid ounces', () => {
  assert.equal(gramsFromVolume(120, 1, 'cup'), 120);
  assert.equal(gramsFromVolume(120, 2, 'cup'), 240);
  assert.equal(gramsFromVolume(120, 1, 'tbsp'), 7.5);
  assert.equal(gramsFromVolume(120, 1, 'tsp'), 2.5);
  assert.equal(Number(gramsFromVolume(120, 236.5882365, 'ml').toFixed(6)), 120);
  assert.equal(gramsFromVolume(120, 1, 'floz'), 15);

  assert.equal(volumeFromGrams(120, 240, 'cup'), 2);
  assert.equal(Number(volumeFromGrams(120, 15, 'tbsp').toFixed(6)), 2);

  assert.equal(findIngredientDensity('Granulated sugar').gramsPerCup, 200);
  assert.throws(() => findIngredientDensity('Unicorn dust'), /Choose an ingredient/);
  assert.throws(() => gramsFromVolume(0, 1, 'cup'), /Density/);
  assert.throws(() => gramsFromVolume(120, -1, 'cup'), /Amount/);
});

test('butter converts between sticks, cups, spoons, grams, and ounces', () => {
  const stick = convertButter(1, 'stick');
  assert.equal(stick.grams, 113.4);
  assert.equal(stick.cups, 0.5);
  assert.equal(stick.tablespoons, 8);
  assert.equal(stick.teaspoons, 24);
  assert.equal(Number(stick.ounces.toFixed(4)), 4.0001);

  const gram = convertButter(250, 'gram');
  assert.equal(Number(gram.sticks.toFixed(4)), 2.2046);

  assert.throws(() => convertButter(-1, 'cup'), /zero or greater/);
});

test('oven conversion follows the conventional gas-mark chart and fan adjustment', () => {
  const gas4 = convertOvenTemperature(4, 'gas');
  assert.equal(gas4.celsius, 180);
  assert.equal(Number(gas4.fahrenheit.toFixed(2)), 356);
  assert.equal(gas4.fanCelsius, 160);
  assert.equal(gas4.gasLabel, '4');

  const celsius = convertOvenTemperature(180, 'celsius');
  assert.equal(celsius.gas, 4);
  assert.equal(celsius.fanCelsius, 160);

  const fahrenheit = convertOvenTemperature(350, 'fahrenheit');
  assert.equal(fahrenheit.gas, 4);
  assert.equal(Number(fahrenheit.celsius.toFixed(2)), 176.67);

  assert.equal(formatGasMark(0.25), '¼');
  assert.equal(formatGasMark(0.5), '½');

  assert.throws(() => convertOvenTemperature(20, 'celsius'), /between 50 and 300/);
  assert.throws(() => convertOvenTemperature(10, 'gas'), /¼ to 9/);
});

test('pizza dough uses baker percentages of total dough weight', () => {
  const dough = calculatePizzaDough({
    balls: 4,
    ballWeight: 250,
    hydration: 60,
    saltPercent: 2,
    yeastPercent: 0.5,
  });

  assert.equal(dough.totalDough, 1000);
  assert.equal(Number(dough.flour.toFixed(4)), 615.3846);
  assert.equal(Number(dough.water.toFixed(4)), 369.2308);
  assert.equal(Number(dough.salt.toFixed(4)), 12.3077);
  assert.equal(Number(dough.yeast.toFixed(4)), 3.0769);

  assert.throws(
    () => calculatePizzaDough({ balls: 4, ballWeight: 250, hydration: 120, saltPercent: 2, yeastPercent: 0.5 }),
    /Hydration/
  );
});

test('tire size compares diameters, circumference, and speedometer error', () => {
  const result = calculateTireSize(
    { width: 205, aspect: 55, rim: 16 },
    { width: 215, aspect: 60, rim: 17 }
  );

  assert.equal(Number(result.oldDiameter.toFixed(2)), 631.9);
  assert.equal(Number(result.newDiameter.toFixed(2)), 689.8);
  assert.equal(Number(result.diameterChange.toFixed(2)), 57.9);
  assert.equal(Number(result.diameterChangePercent.toFixed(3)), 9.163);
  assert.equal(Number(result.actualSpeedAt100.toFixed(2)), 109.16);
  assert.equal(Number(result.oldCircumference.toFixed(2)), 1985.17);

  assert.throws(
    () => calculateTireSize({ width: 50, aspect: 55, rim: 16 }, { width: 215, aspect: 60, rim: 17 }),
    /width must be/
  );
});

test('car depreciation applies declining balance with a salvage floor', () => {
  const plain = calculateCarDepreciation(30000, 15, 5);
  assert.equal(Number(plain.finalValue.toFixed(2)), 13311.16);
  assert.equal(Number(plain.totalDepreciation.toFixed(2)), 16688.84);
  assert.equal(plain.schedule.length, 6);

  const floored = calculateCarDepreciation(30000, 40, 5, 5000);
  assert.equal(floored.finalValue, 5000);
  assert.equal(floored.totalDepreciation, 25000);

  const capped = calculateCarDepreciation(20000, 10, 5, 50000);
  assert.equal(capped.finalValue, 20000);
  assert.equal(capped.totalDepreciation, 0);

  const fractional = calculateCarDepreciation(30000, 10, 0.5);
  assert.equal(Number(fractional.finalValue.toFixed(2)), 28460.5);

  assert.throws(() => calculateCarDepreciation(0, 10, 5), /Purchase price/);
  assert.throws(() => calculateCarDepreciation(1000, 100, 5), /between 0% and 100%/);
});

test('speed, distance, and time solve in all three directions', () => {
  const time = solveSpeedDistanceTime('time', 42.195, 10);
  assert.equal(Number(time.timeHours.toFixed(4)), 4.2195);
  assert.equal(Number(time.paceMinPerKm.toFixed(2)), 6);

  const speed = solveSpeedDistanceTime('speed', 10, 0.5);
  assert.equal(speed.speedKmh, 20);
  assert.equal(speed.paceMinPerKm, 3);

  const distance = solveSpeedDistanceTime('distance', 60, 1.5);
  assert.equal(distance.distanceKm, 90);

  assert.equal(formatHoursMinutes(4.2195), '4 h 13 min');
  assert.equal(formatHoursMinutes(0.5), '30 min');
  assert.equal(formatPace(6), '6:00 /km');
  assert.equal(formatPace(5.5), '5:30 /km');

  assert.throws(() => solveSpeedDistanceTime('speed', 0, 1), /greater than zero/);
});

test('flour lookup exposes distinct densities by type', () => {
  assert.equal(findFlourType('Cake flour').gramsPerCup, 114);
  assert.equal(findFlourType('Bread flour').gramsPerCup, 127);
  assert.throws(() => findFlourType('Semolina'), /Choose a flour/);
});
