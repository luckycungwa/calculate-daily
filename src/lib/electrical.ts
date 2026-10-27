/**
 * Electrical helpers: Ohm's law, conductor voltage drop, and resistor colour codes.
 *
 * Voltage-drop arithmetic here is the standard two-wire approximation for a resistive load. It
 * ignores reactance, power factor, and temperature correction, which is why the tool states that
 * final conductor sizing must follow local wiring regulations.
 */

export type OhmsMode = 'vi' | 'vr' | 'ir' | 'vp' | 'ip' | 'rp';

export interface OhmsResult {
  voltage: number;
  current: number;
  resistance: number;
  power: number;
}

export function solveOhmsLaw(mode: OhmsMode, first: number, second: number): OhmsResult {
  if (!Number.isFinite(first) || first <= 0 || !Number.isFinite(second) || second <= 0) {
    throw new RangeError('Both known values must be greater than zero.');
  }

  switch (mode) {
    case 'vi': {
      const voltage = first;
      const current = second;
      return { voltage, current, resistance: voltage / current, power: voltage * current };
    }
    case 'vr': {
      const voltage = first;
      const resistance = second;
      return { voltage, current: voltage / resistance, resistance, power: (voltage * voltage) / resistance };
    }
    case 'ir': {
      const current = first;
      const resistance = second;
      return { voltage: current * resistance, current, resistance, power: current * current * resistance };
    }
    case 'vp': {
      const voltage = first;
      const power = second;
      const current = power / voltage;
      return { voltage, current, resistance: voltage / current, power };
    }
    case 'ip': {
      const current = first;
      const power = second;
      const voltage = power / current;
      return { voltage, current, resistance: voltage / current, power };
    }
    case 'rp': {
      const resistance = first;
      const power = second;
      const current = Math.sqrt(power / resistance);
      return { voltage: current * resistance, current, resistance, power };
    }
    default:
      throw new RangeError('Choose which two values you know.');
  }
}

export interface VoltageDropInput {
  systemVoltage: number;
  current: number;
  oneWayLengthM: number;
  areaMm2: number;
  /** Ohm square millimetres per metre: copper ≈ 0.0175, aluminium ≈ 0.0282 at 20 °C. */
  resistivity: number;
}

export interface VoltageDropResult {
  dropVolts: number;
  dropPercent: number;
  loadVoltage: number;
  powerLossW: number;
  loopResistance: number;
}

export function calculateVoltageDrop({
  systemVoltage,
  current,
  oneWayLengthM,
  areaMm2,
  resistivity,
}: VoltageDropInput): VoltageDropResult {
  if (!Number.isFinite(systemVoltage) || systemVoltage <= 0) {
    throw new RangeError('System voltage must be greater than zero.');
  }
  if (!Number.isFinite(current) || current <= 0) {
    throw new RangeError('Current must be greater than zero.');
  }
  if (!Number.isFinite(oneWayLengthM) || oneWayLengthM <= 0) {
    throw new RangeError('Cable length must be greater than zero.');
  }
  if (!Number.isFinite(areaMm2) || areaMm2 <= 0) {
    throw new RangeError('Conductor cross-section must be greater than zero.');
  }
  if (!Number.isFinite(resistivity) || resistivity <= 0) {
    throw new RangeError('Resistivity must be greater than zero.');
  }

  // Two conductors: out and back.
  const loopResistance = (2 * resistivity * oneWayLengthM) / areaMm2;
  const dropVolts = current * loopResistance;

  return {
    dropVolts,
    dropPercent: (dropVolts / systemVoltage) * 100,
    loadVoltage: systemVoltage - dropVolts,
    powerLossW: current * current * loopResistance,
    loopResistance,
  };
}

export interface ConductorSizeInput {
  systemVoltage: number;
  current: number;
  oneWayLengthM: number;
  maxDropPercent: number;
  resistivity: number;
}

export function requiredConductorArea({
  systemVoltage,
  current,
  oneWayLengthM,
  maxDropPercent,
  resistivity,
}: ConductorSizeInput): number {
  if (!Number.isFinite(systemVoltage) || systemVoltage <= 0) {
    throw new RangeError('System voltage must be greater than zero.');
  }
  if (!Number.isFinite(current) || current <= 0) {
    throw new RangeError('Current must be greater than zero.');
  }
  if (!Number.isFinite(oneWayLengthM) || oneWayLengthM <= 0) {
    throw new RangeError('Cable length must be greater than zero.');
  }
  if (!Number.isFinite(maxDropPercent) || maxDropPercent <= 0 || maxDropPercent >= 100) {
    throw new RangeError('Maximum voltage drop must be between 0 and 100%.');
  }
  if (!Number.isFinite(resistivity) || resistivity <= 0) {
    throw new RangeError('Resistivity must be greater than zero.');
  }

  const allowableVolts = (systemVoltage * maxDropPercent) / 100;
  return (2 * resistivity * oneWayLengthM * current) / allowableVolts;
}

export interface ResistorColor {
  name: string;
  hex: string;
  digit?: number;
  multiplier?: number;
  tolerance?: number;
}

export const RESISTOR_COLORS: ResistorColor[] = [
  { name: 'Black', hex: '#111111', digit: 0, multiplier: 1 },
  { name: 'Brown', hex: '#7b4a1e', digit: 1, multiplier: 10, tolerance: 1 },
  { name: 'Red', hex: '#c81f1f', digit: 2, multiplier: 100, tolerance: 2 },
  { name: 'Orange', hex: '#e8730c', digit: 3, multiplier: 1e3 },
  { name: 'Yellow', hex: '#e8c318', digit: 4, multiplier: 1e4 },
  { name: 'Green', hex: '#1f8a3b', digit: 5, multiplier: 1e5, tolerance: 0.5 },
  { name: 'Blue', hex: '#1b5fc1', digit: 6, multiplier: 1e6, tolerance: 0.25 },
  { name: 'Violet', hex: '#7a3fb5', digit: 7, multiplier: 1e7, tolerance: 0.1 },
  { name: 'Grey', hex: '#808080', digit: 8, multiplier: 1e8, tolerance: 0.05 },
  { name: 'White', hex: '#f2f2f2', digit: 9, multiplier: 1e9 },
  { name: 'Gold', hex: '#c9a227', multiplier: 0.1, tolerance: 5 },
  { name: 'Silver', hex: '#b8b8b8', multiplier: 0.01, tolerance: 10 },
];

export interface ResistorResult {
  ohms: number;
  minimumOhms: number;
  maximumOhms: number;
  tolerance: number;
}

export function calculateResistorValue(
  firstDigit: number,
  secondDigit: number,
  multiplier: number,
  tolerance: number
): ResistorResult {
  if (![firstDigit, secondDigit].every((digit) => Number.isInteger(digit) && digit >= 0 && digit <= 9)) {
    throw new RangeError('The first two bands must be digits from 0 to 9.');
  }
  if (!Number.isFinite(multiplier) || multiplier <= 0) {
    throw new RangeError('The multiplier band must be a positive multiplier.');
  }
  if (!Number.isFinite(tolerance) || tolerance < 0 || tolerance > 20) {
    throw new RangeError('Tolerance must be between 0 and 20%.');
  }

  const ohms = (firstDigit * 10 + secondDigit) * multiplier;
  const spread = (ohms * tolerance) / 100;

  return {
    ohms,
    minimumOhms: ohms - spread,
    maximumOhms: ohms + spread,
    tolerance,
  };
}

/** Formats a resistance with an appropriate SI prefix for display. */
export function formatResistance(ohms: number): string {
  if (!Number.isFinite(ohms)) return '—';
  if (ohms >= 1e9) return `${(ohms / 1e9).toFixed(2)} GΩ`;
  if (ohms >= 1e6) return `${(ohms / 1e6).toFixed(2)} MΩ`;
  if (ohms >= 1e3) return `${(ohms / 1e3).toFixed(2)} kΩ`;
  return `${Number.isInteger(ohms) ? ohms : ohms.toFixed(2)} Ω`;
}
