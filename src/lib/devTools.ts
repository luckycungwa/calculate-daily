/**
 * Developer and design utilities.
 *
 * Everything here is pure: no network access, no storage, and no encoding of secrets beyond the
 * exact string the user typed. IP math is IPv4 only, which is what subnet questions overwhelmingly
 * mean; IPv6 is deliberately out of scope rather than half-implemented.
 */

// ==========================================
// IPv4 subnetting
// ==========================================

export interface SubnetResult {
  ip: string;
  prefix: number;
  mask: string;
  wildcard: string;
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  totalAddresses: number;
  usableHosts: number;
}

function ipv4ToInt(ip: string): number {
  const parts = ip.trim().split('.');
  if (parts.length !== 4) {
    throw new RangeError('Enter an IPv4 address in dotted form, such as 192.168.1.10.');
  }
  let value = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) {
      throw new RangeError('Each octet must be a whole number between 0 and 255.');
    }
    const octet = Number(part);
    if (octet > 255) {
      throw new RangeError('Each octet must be between 0 and 255.');
    }
    value = value * 256 + octet;
  }
  return value >>> 0;
}

function intToIpv4(value: number): string {
  const v = value >>> 0;
  return [v >>> 24, (v >>> 16) & 255, (v >>> 8) & 255, v & 255].join('.');
}

export function calculateSubnet(ip: string, prefix: number): SubnetResult {
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    throw new RangeError('The prefix length must be a whole number from 0 to 32.');
  }

  const address = ipv4ToInt(ip);
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const wildcard = (~mask) >>> 0;
  const network = (address & mask) >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  const totalAddresses = 2 ** (32 - prefix);

  // /31 is a point-to-point link with two usable addresses; /32 is a single host.
  const usableHosts = prefix === 32 ? 1 : prefix === 31 ? 2 : totalAddresses - 2;
  const firstHost = prefix >= 31 ? network : network + 1;
  const lastHost = prefix >= 31 ? broadcast : broadcast - 1;

  return {
    ip: intToIpv4(address),
    prefix,
    mask: intToIpv4(mask),
    wildcard: intToIpv4(wildcard),
    network: intToIpv4(network),
    broadcast: intToIpv4(broadcast),
    firstHost: intToIpv4(firstHost),
    lastHost: intToIpv4(lastHost),
    totalAddresses,
    usableHosts,
  };
}

// ==========================================
// Number bases
// ==========================================

export type NumberBase = 2 | 8 | 10 | 16;

export interface BaseConversion {
  decimal: number;
  binary: string;
  octal: string;
  hexadecimal: string;
}

const BASE_PATTERNS: Record<NumberBase, RegExp> = {
  2: /^[01]+$/,
  8: /^[0-7]+$/,
  10: /^\d+$/,
  16: /^[0-9a-f]+$/i,
};

export function convertNumberBases(input: string, base: NumberBase): BaseConversion {
  let text = input.trim().replace(/[\s_]/g, '');
  if (base === 2) text = text.replace(/^0b/i, '');
  if (base === 8) text = text.replace(/^0o/i, '');
  if (base === 16) text = text.replace(/^0x/i, '');

  if (!text) {
    throw new RangeError('Enter a value to convert.');
  }
  if (!BASE_PATTERNS[base].test(text)) {
    throw new RangeError(`That is not a valid base-${base} number.`);
  }

  const decimal = parseInt(text, base);
  if (!Number.isSafeInteger(decimal)) {
    throw new RangeError('That number is too large to convert exactly. Keep it below 9,007,199,254,740,991.');
  }

  return {
    decimal,
    binary: decimal.toString(2),
    octal: decimal.toString(8),
    hexadecimal: decimal.toString(16),
  };
}

// ==========================================
// Password entropy
// ==========================================

export interface PasswordEntropyInput {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  digits: boolean;
  symbols: boolean;
}

export interface PasswordEntropyResult {
  poolSize: number;
  entropyBits: number;
  /** log10 of the raw number of combinations, so huge values stay representable. */
  combinationsLog10: number;
  /** Seconds to exhaust half the keyspace at one trillion guesses per second. */
  secondsToCrack: number;
}

export function calculatePasswordEntropy({
  length,
  lowercase,
  uppercase,
  digits,
  symbols,
}: PasswordEntropyInput): PasswordEntropyResult {
  if (!Number.isInteger(length) || length < 1 || length > 128) {
    throw new RangeError('Password length must be a whole number from 1 to 128.');
  }

  const poolSize =
    (lowercase ? 26 : 0) + (uppercase ? 26 : 0) + (digits ? 10 : 0) + (symbols ? 32 : 0);
  if (poolSize === 0) {
    throw new RangeError('Choose at least one character set.');
  }

  const entropyBits = length * Math.log2(poolSize);
  const guessesPerSecond = 1e12;
  // log10(combinations) = length * log10(pool); half the keyspace is one bit less.
  const combinationsLog10 = length * Math.log10(poolSize);
  const secondsToCrack = 10 ** (combinationsLog10 - Math.log10(2) - 12);

  return {
    poolSize,
    entropyBits,
    combinationsLog10,
    secondsToCrack,
  };
}

// ==========================================
// Colour
// ==========================================

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

function clampByte(value: number): number {
  return Math.min(255, Math.max(0, Math.round(value)));
}

export function parseColor(input: string): RgbColor {
  const text = input.trim().toLowerCase();

  const hex = text.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (hex) {
    const raw = hex[1];
    if (raw.length === 3) {
      return {
        r: parseInt(raw[0] + raw[0], 16),
        g: parseInt(raw[1] + raw[1], 16),
        b: parseInt(raw[2] + raw[2], 16),
      };
    }
    return {
      r: parseInt(raw.slice(0, 2), 16),
      g: parseInt(raw.slice(2, 4), 16),
      b: parseInt(raw.slice(4, 6), 16),
    };
  }

  const rgb = text.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*[\d.]+\s*)?\)$/);
  if (rgb) {
    const values = [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
    if (values.some((value) => value > 255)) {
      throw new RangeError('RGB channels must be between 0 and 255.');
    }
    return { r: values[0], g: values[1], b: values[2] };
  }

  throw new RangeError('Enter a hex colour (#1a2b3c or #abc) or rgb(26, 43, 60).');
}

export function rgbToHex({ r, g, b }: RgbColor): string {
  return `#${[r, g, b].map((channel) => clampByte(channel).toString(16).padStart(2, '0')).join('')}`;
}

export function rgbToHsl({ r, g, b }: RgbColor): HslColor {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return { h, s: s * 100, l: l * 100 };
}

/** WCAG 2.x relative luminance, using the sRGB linearisation defined in the specification. */
export function relativeLuminance({ r, g, b }: RgbColor): number {
  const linear = [r, g, b].map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

export function contrastRatio(foreground: RgbColor, background: RgbColor): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

// ==========================================
// URL encoding
// ==========================================

export function encodeUrlComponent(text: string): string {
  return encodeURIComponent(text);
}

export function decodeUrlComponent(text: string): string {
  try {
    return decodeURIComponent(text.replace(/\+/g, ' '));
  } catch {
    throw new RangeError('That is not valid percent-encoding. Check for a stray % sign.');
  }
}

// ==========================================
// Ratio, resolution, transfer time
// ==========================================

export function simplifyRatio(width: number, height: number): string {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new RangeError('Ratio terms must be positive numbers.');
  }
  const scale = 1000;
  const a = Math.round(width * scale);
  const b = Math.round(height * scale);
  const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
  const divisor = gcd(a, b) || 1;
  return `${a / divisor}:${b / divisor}`;
}

export function transferSeconds(fileSizeMb: number, speedMbps: number, efficiencyPercent = 100): number {
  if (!Number.isFinite(fileSizeMb) || fileSizeMb < 0) {
    throw new RangeError('File size must be zero or greater.');
  }
  if (!Number.isFinite(speedMbps) || speedMbps <= 0) {
    throw new RangeError('Connection speed must be greater than zero.');
  }
  if (!Number.isFinite(efficiencyPercent) || efficiencyPercent <= 0 || efficiencyPercent > 100) {
    throw new RangeError('Efficiency must be above 0 and at most 100%.');
  }
  // MB to megabits is x8; Mbps to MB/s is /8, so the two cancel into size * 8 / speed.
  return (fileSizeMb * 8) / (speedMbps * (efficiencyPercent / 100));
}
