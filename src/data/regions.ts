export type RegionCode = 'US' | 'UK' | 'IN' | 'ZA' | 'AU';

export interface RegionConfig {
  code: RegionCode;
  label: string;
  locale: string;
  currencyCode: string;
  currencySymbol: string;
  measurementSystem: 'metric' | 'imperial';
  temperatureUnit: 'C' | 'F';
  dateFormat: string;
  phonePrefix: string;
  taxNote?: string;
}

export const REGIONS: RegionConfig[] = [
  {
    code: 'US',
    label: 'United States',
    locale: 'en-US',
    currencyCode: 'USD',
    currencySymbol: '$',
    measurementSystem: 'imperial',
    temperatureUnit: 'F',
    dateFormat: 'MM/DD/YYYY',
    phonePrefix: '+1',
    taxNote: 'State sales tax varies by jurisdiction; no national VAT.',
  },
  {
    code: 'UK',
    label: 'United Kingdom',
    locale: 'en-GB',
    currencyCode: 'GBP',
    currencySymbol: '£',
    measurementSystem: 'imperial',
    temperatureUnit: 'C',
    dateFormat: 'DD/MM/YYYY',
    phonePrefix: '+44',
    taxNote: 'VAT is 20% standard rate on most goods and services.',
  },
  {
    code: 'IN',
    label: 'India',
    locale: 'en-IN',
    currencyCode: 'INR',
    currencySymbol: '₹',
    measurementSystem: 'metric',
    temperatureUnit: 'C',
    dateFormat: 'DD/MM/YYYY',
    phonePrefix: '+91',
    taxNote: 'GST rates are 5%, 12%, 18%, or 28% depending on the category.',
  },
  {
    code: 'ZA',
    label: 'South Africa',
    locale: 'en-ZA',
    currencyCode: 'ZAR',
    currencySymbol: 'R',
    measurementSystem: 'metric',
    temperatureUnit: 'C',
    dateFormat: 'YYYY/MM/DD',
    phonePrefix: '+27',
    taxNote: 'VAT is 15% standard rate.',
  },
  {
    code: 'AU',
    label: 'Australia',
    locale: 'en-AU',
    currencyCode: 'AUD',
    currencySymbol: 'A$',
    measurementSystem: 'metric',
    temperatureUnit: 'C',
    dateFormat: 'DD/MM/YYYY',
    phonePrefix: '+61',
    taxNote: 'GST is 10% on most goods and services.',
  },
];

export const DEFAULT_REGION_CODE: RegionCode = 'US';

export function getRegionConfig(code: RegionCode): RegionConfig {
  return REGIONS.find((r) => r.code === code) ?? REGIONS[0];
}

export function getRegionByCurrencySymbol(symbol: string): RegionCode | undefined {
  return REGIONS.find((r) => r.currencySymbol === symbol)?.code;
}