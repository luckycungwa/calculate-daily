import test from 'node:test';
import assert from 'node:assert/strict';
import {
  aquariumVolume,
  fertilizerProduct,
  formatDuration,
  golfDifferential,
  golfHandicapIndex,
  movingCost,
  petCalories,
  pondVolume,
  predictRaceTime,
  salaryIncrease,
} from './sportsAndHome';

test('Riegel prediction scales time with distance and reports pace', () => {
  const prediction = predictRaceTime(10, 3000, 21.0975);
  assert.ok(Math.abs(prediction.seconds - 6620.4) < 5);
  assert.ok(Math.abs(prediction.minutes - 110.34) < 0.1);
  assert.ok(Math.abs(prediction.paceSecondsPerKm - 313.8) < 0.5);

  const sameDistance = predictRaceTime(5, 1500, 5);
  assert.equal(sameDistance.seconds, 1500);

  assert.equal(formatDuration(6620), '1:50:20');
  assert.equal(formatDuration(125), '2:05');
  assert.throws(() => predictRaceTime(0, 3000, 21.1), /Known distance/);
  assert.throws(() => predictRaceTime(10, 0, 21.1), /Known time/);
});

test('golf differential follows the WHS course rating and slope formula', () => {
  assert.equal(golfDifferential(85, 72, 113), 13);
  assert.equal(Number(golfDifferential(85, 72, 130).toFixed(3)), 11.3);

  assert.throws(() => golfDifferential(0, 72, 113), /Score/);
  assert.throws(() => golfDifferential(85, 72, 50), /Slope/);
});

test('handicap index uses the WHS best-round table', () => {
  const three = golfHandicapIndex([10, 12, 14]);
  assert.equal(three.index, 8);
  assert.equal(three.used, 1);
  assert.equal(three.adjustment, -2);

  const five = golfHandicapIndex([10, 12, 14, 16, 18]);
  assert.equal(five.index, 10);

  const eight = golfHandicapIndex([10, 11, 12, 13, 14, 15, 16, 17]);
  assert.equal(eight.index, 10.5);
  assert.equal(eight.used, 2);

  const twenty = golfHandicapIndex(Array.from({ length: 20 }, (_, i) => i + 1));
  assert.equal(twenty.index, 4.5);
  assert.equal(twenty.used, 8);

  const tooFew = golfHandicapIndex([10, 11]);
  assert.equal(tooFew.index, null);

  assert.throws(() => golfHandicapIndex([]), /at least three/);
  assert.throws(() => golfHandicapIndex([10, 11, 99]), /between -10 and 60/);
});

test('pet calories apply resting energy and life-stage factors', () => {
  const dog = petCalories(10, 'dog', 'neutered');
  assert.ok(Math.abs(dog.resting - 393.65) < 0.1);
  assert.ok(Math.abs(dog.maintenance - 629.84) < 0.1);
  assert.equal(dog.factor, 1.6);

  const cat = petCalories(4, 'cat', 'neutered');
  assert.ok(Math.abs(cat.resting - 197.99) < 0.1);
  assert.ok(Math.abs(cat.maintenance - 237.59) < 0.1);

  assert.throws(() => petCalories(0, 'dog', 'neutered'), /Weight/);
});

test('aquarium volume accounts for substrate and displacement', () => {
  const tank = aquariumVolume(100, 50, 50, 5, 10);
  assert.equal(tank.grossLitres, 250);
  assert.equal(tank.netLitres, 202.5);
  assert.ok(Math.abs(tank.usGallons - 53.49) < 0.05);
  assert.ok(Math.abs(tank.ukGallons - 44.54) < 0.05);
  assert.equal(tank.waterKg, 202.5);

  assert.throws(() => aquariumVolume(100, 50, 50, 60), /Substrate/);
  assert.throws(() => aquariumVolume(100, 50, 50, 0, 95), /Displacement/);
});

test('pond volume converts cubic metres to litres and gallons', () => {
  const pond = pondVolume(5, 3, 1.5, 0.8);
  assert.equal(pond.cubicMetres, 18);
  assert.equal(pond.litres, 18000);
  assert.ok(Math.abs(pond.usGallons - 4755.1) < 1);
  assert.equal(pond.waterTonnes, 18);

  assert.throws(() => pondVolume(5, 3, 0), /greater than zero/);
  assert.throws(() => pondVolume(5, 3, 1, 1.2), /Shape factor/);
});

test('fertiliser targets nitrogen rather than total bag weight', () => {
  const result = fertilizerProduct(5000, 1, 10, 50);
  assert.equal(result.productPer1000, 10);
  assert.equal(result.totalProduct, 50);
  assert.equal(result.totalNitrogen, 5);
  assert.equal(result.bagsNeeded, 1);
  assert.ok(Math.abs(result.productPer1000Kg - 4.5359) < 0.001);

  const stronger = fertilizerProduct(5000, 1, 20, 50);
  assert.equal(stronger.productPer1000, 5);
  assert.equal(stronger.totalProduct, 25);

  assert.throws(() => fertilizerProduct(5000, 1, 0, 50), /nitrogen percentage/);
});

test('salary increase separates nominal and real gains', () => {
  const result = salaryIncrease(50000, 5, 2.5);
  assert.equal(result.newSalary, 52500);
  assert.equal(result.raise, 2500);
  assert.ok(Math.abs(result.monthlyRaise - 208.333) < 0.01);
  assert.ok(Math.abs(result.realIncreasePercent - 2.439) < 0.01);
  assert.ok(Math.abs(result.purchasingPower - 51219.51) < 0.05);

  const cut = salaryIncrease(50000, -10, 0);
  assert.equal(cut.newSalary, 45000);

  assert.throws(() => salaryIncrease(50000, -200), /between -100%/);
});

test('moving cost separates transport, labour, and extras', () => {
  const result = movingCost({
    distanceKm: 500,
    ratePerKm: 2,
    baseFee: 200,
    laborHours: 8,
    hourlyRate: 50,
    packingCost: 300,
    suppliesCost: 100,
    otherCost: 0,
  });

  assert.equal(result.transport, 1200);
  assert.equal(result.labor, 400);
  assert.equal(result.extras, 400);
  assert.equal(result.total, 2000);
  assert.equal(result.costPerKm, 4);

  assert.throws(
    () =>
      movingCost({
        distanceKm: 500,
        ratePerKm: 2,
        baseFee: 200,
        laborHours: 8,
        hourlyRate: 50,
        packingCost: -1,
        suppliesCost: 0,
        otherCost: 0,
      }),
    /Packing cost/
  );
});
