export interface UnitDef {
  value: string;
  label: string;
  toBaseFactor: number;
  toBaseOffset?: number;
}

export interface UnitGroup {
  id: string;
  name: string;
  baseUnit: string;
  units: UnitDef[];
}

export const UNIT_GROUPS: Record<string, UnitGroup> = {
  temperature: {
    id: 'temperature',
    name: 'Temperature',
    baseUnit: 'C',
    units: [
      { value: 'C', label: 'Celsius (°C)', toBaseFactor: 1, toBaseOffset: 0 },
      { value: 'F', label: 'Fahrenheit (°F)', toBaseFactor: 5 / 9, toBaseOffset: -160 / 9 },
      { value: 'K', label: 'Kelvin (K)', toBaseFactor: 1, toBaseOffset: -273.15 },
    ],
  },
  length: {
    id: 'length',
    name: 'Length & Distance',
    baseUnit: 'm',
    units: [
      { value: 'mm', label: 'Millimeter (mm)', toBaseFactor: 0.001 },
      { value: 'cm', label: 'Centimeter (cm)', toBaseFactor: 0.01 },
      { value: 'm', label: 'Meter (m)', toBaseFactor: 1 },
      { value: 'km', label: 'Kilometer (km)', toBaseFactor: 1000 },
      { value: 'in', label: 'Inch (in)', toBaseFactor: 0.0254 },
      { value: 'ft', label: 'Foot (ft)', toBaseFactor: 0.3048 },
      { value: 'yd', label: 'Yard (yd)', toBaseFactor: 0.9144 },
      { value: 'mi', label: 'Mile (mi)', toBaseFactor: 1609.344 },
    ],
  },
  weight: {
    id: 'weight',
    name: 'Weight & Mass',
    baseUnit: 'kg',
    units: [
      { value: 'mg', label: 'Milligram (mg)', toBaseFactor: 0.000001 },
      { value: 'g', label: 'Gram (g)', toBaseFactor: 0.001 },
      { value: 'kg', label: 'Kilogram (kg)', toBaseFactor: 1 },
      { value: 'oz', label: 'Ounce (oz)', toBaseFactor: 0.0283495 },
      { value: 'lb', label: 'Pound (lb)', toBaseFactor: 0.453592 },
      { value: 'st', label: 'Stone (st)', toBaseFactor: 6.35029 },
      { value: 't', label: 'Metric Ton (t)', toBaseFactor: 1000 },
    ],
  },
  volume: {
    id: 'volume',
    name: 'Volume & Capacity',
    baseUnit: 'l',
    units: [
      { value: 'ml', label: 'Milliliter (ml)', toBaseFactor: 0.001 },
      { value: 'l', label: 'Liter (L)', toBaseFactor: 1 },
      { value: 'tsp', label: 'Teaspoon (tsp)', toBaseFactor: 0.00492892 },
      { value: 'tbsp', label: 'Tablespoon (tbsp)', toBaseFactor: 0.0147868 },
      { value: 'floz', label: 'Fluid Ounce (fl oz)', toBaseFactor: 0.0295735 },
      { value: 'cup', label: 'Cup (US)', toBaseFactor: 0.236588 },
      { value: 'pint', label: 'Pint (US)', toBaseFactor: 0.473176 },
      { value: 'quart', label: 'Quart (US)', toBaseFactor: 0.946353 },
      { value: 'gal', label: 'Gallon (US)', toBaseFactor: 3.78541 },
      { value: 'm3', label: 'Cubic Meter (m³)', toBaseFactor: 1000 },
    ],
  },
  speed: {
    id: 'speed',
    name: 'Speed',
    baseUnit: 'kmh',
    units: [
      { value: 'mps', label: 'Meters/Second (m/s)', toBaseFactor: 3.6 },
      { value: 'kmh', label: 'Kilometers/Hour (km/h)', toBaseFactor: 1 },
      { value: 'mph', label: 'Miles/Hour (mph)', toBaseFactor: 1.609344 },
      { value: 'kn', label: 'Knots (kn)', toBaseFactor: 1.852 },
      { value: 'fps', label: 'Feet/Second (ft/s)', toBaseFactor: 1.09728 },
    ],
  },
  area: {
    id: 'area',
    name: 'Area',
    baseUnit: 'm2',
    units: [
      { value: 'mm2', label: 'Square Millimeter (mm²)', toBaseFactor: 0.000001 },
      { value: 'cm2', label: 'Square Centimeter (cm²)', toBaseFactor: 0.0001 },
      { value: 'm2', label: 'Square Meter (m²)', toBaseFactor: 1 },
      { value: 'km2', label: 'Square Kilometer (km²)', toBaseFactor: 1000000 },
      { value: 'in2', label: 'Square Inch (in²)', toBaseFactor: 0.00064516 },
      { value: 'ft2', label: 'Square Foot (ft²)', toBaseFactor: 0.092903 },
      { value: 'yd2', label: 'Square Yard (yd²)', toBaseFactor: 0.836127 },
      { value: 'ac', label: 'Acre (ac)', toBaseFactor: 4046.86 },
      { value: 'ha', label: 'Hectare (ha)', toBaseFactor: 10000 },
      { value: 'mi2', label: 'Square Mile (mi²)', toBaseFactor: 2589988.11 },
    ],
  },
  digital: {
    id: 'digital',
    name: 'Data Storage',
    baseUnit: 'byte',
    units: [
      { value: 'bit', label: 'Bit (b)', toBaseFactor: 0.125 },
      { value: 'byte', label: 'Byte (B)', toBaseFactor: 1 },
      { value: 'kb', label: 'Kilobyte (KB)', toBaseFactor: 1024 },
      { value: 'mb', label: 'Megabyte (MB)', toBaseFactor: 1024 * 1024 },
      { value: 'gb', label: 'Gigabyte (GB)', toBaseFactor: 1024 * 1024 * 1024 },
      { value: 'tb', label: 'Terabyte (TB)', toBaseFactor: 1024 ** 4 },
      { value: 'pb', label: 'Petabyte (PB)', toBaseFactor: 1024 ** 5 },
    ],
  },
};

export const UNIT_GROUP_LIST = Object.values(UNIT_GROUPS);