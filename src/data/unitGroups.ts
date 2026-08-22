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
  pressure: {
    id: 'pressure',
    name: 'Pressure',
    baseUnit: 'pa',
    units: [
      { value: 'pa', label: 'Pascal (Pa)', toBaseFactor: 1 },
      { value: 'kpa', label: 'Kilopascal (kPa)', toBaseFactor: 1000 },
      { value: 'bar', label: 'Bar', toBaseFactor: 100000 },
      { value: 'psi', label: 'PSI (lbf/in²)', toBaseFactor: 6894.757 },
      { value: 'atm', label: 'Atmosphere (atm)', toBaseFactor: 101325 },
      { value: 'mmhg', label: 'mmHg (Torr)', toBaseFactor: 133.3224 },
    ],
  },
  energy: {
    id: 'energy',
    name: 'Energy',
    baseUnit: 'j',
    units: [
      { value: 'j', label: 'Joule (J)', toBaseFactor: 1 },
      { value: 'kj', label: 'Kilojoule (kJ)', toBaseFactor: 1000 },
      { value: 'cal', label: 'Calorie (cal)', toBaseFactor: 4.184 },
      { value: 'kcal', label: 'Kilocalorie (kcal)', toBaseFactor: 4184 },
      { value: 'wh', label: 'Watt-hour (Wh)', toBaseFactor: 3600 },
      { value: 'kwh', label: 'Kilowatt-hour (kWh)', toBaseFactor: 3600000 },
      { value: 'btu', label: 'BTU', toBaseFactor: 1055.06 },
    ],
  },
  'fuel-economy': {
    id: 'fuel-economy',
    name: 'Fuel Economy',
    baseUnit: 'l100km',
    units: [
      { value: 'l100km', label: 'Liters/100km (L/100km)', toBaseFactor: 1 },
      { value: 'mpgus', label: 'MPG (US)', toBaseFactor: 235.215, toBaseOffset: 0 },
      { value: 'mpguk', label: 'MPG (UK)', toBaseFactor: 282.481, toBaseOffset: 0 },
      { value: 'kml', label: 'Kilometers/Liter (km/L)', toBaseFactor: 100, toBaseOffset: 0 },
    ],
  },
  angle: {
    id: 'angle',
    name: 'Angle',
    baseUnit: 'deg',
    units: [
      { value: 'deg', label: 'Degrees (°)', toBaseFactor: 1 },
      { value: 'rad', label: 'Radians (rad)', toBaseFactor: 180 / Math.PI },
      { value: 'grad', label: 'Gradians (gon)', toBaseFactor: 0.9 },
    ],
  },
  frequency: {
    id: 'frequency',
    name: 'Frequency',
    baseUnit: 'hz',
    units: [
      { value: 'hz', label: 'Hertz (Hz)', toBaseFactor: 1 },
      { value: 'khz', label: 'Kilohertz (kHz)', toBaseFactor: 1000 },
      { value: 'mhz', label: 'Megahertz (MHz)', toBaseFactor: 1000000 },
      { value: 'ghz', label: 'Gigahertz (GHz)', toBaseFactor: 1000000000 },
    ],
  },
  'time-conv': {
    id: 'time-conv',
    name: 'Time',
    baseUnit: 's',
    units: [
      { value: 'ms', label: 'Millisecond (ms)', toBaseFactor: 0.001 },
      { value: 's', label: 'Second (s)', toBaseFactor: 1 },
      { value: 'min', label: 'Minute (min)', toBaseFactor: 60 },
      { value: 'hr', label: 'Hour (hr)', toBaseFactor: 3600 },
      { value: 'day', label: 'Day', toBaseFactor: 86400 },
      { value: 'week', label: 'Week', toBaseFactor: 604800 },
      { value: 'month', label: 'Month (30 days)', toBaseFactor: 2592000 },
      { value: 'year', label: 'Year (365 days)', toBaseFactor: 31536000 },
    ],
  },
};

export const UNIT_GROUP_LIST = Object.values(UNIT_GROUPS);