export interface CurrencyDef {
  code: string;
  name: string;
  symbol: string;
}

export const CURRENCIES: CurrencyDef[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$' },
  { code: 'CLP', name: 'Chilean Peso', symbol: 'CLP$' },
  { code: 'COP', name: 'Colombian Peso', symbol: 'COP$' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'ILS', name: 'Israeli New Shekel', symbol: '₪' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'VND', name: 'Vietnamese Đồng', symbol: '₫' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
];

export const currencyByCode = (code: string): CurrencyDef | undefined =>
  CURRENCIES.find((c) => c.code === code);

// Reference rates per 1 USD. Used as the initial/offline fallback so the tool
// always shows a result, even before the live feed loads or when offline.
// These are indicative averages and should not be used for transactions.
export const RATES_AS_OF = '2025-01-01';
export const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 156.5,
  CNY: 7.25,
  INR: 83.5,
  CAD: 1.37,
  AUD: 1.52,
  CHF: 0.89,
  HKD: 7.81,
  SGD: 1.35,
  NZD: 1.66,
  SEK: 10.55,
  NOK: 10.9,
  DKK: 6.86,
  PLN: 3.98,
  CZK: 23.2,
  HUF: 362,
  RON: 4.58,
  BGN: 1.8,
  TRY: 34.4,
  RUB: 92.0,
  UAH: 41.2,
  MXN: 18.4,
  BRL: 5.5,
  ARS: 1030,
  CLP: 950,
  COP: 4150,
  ZAR: 18.0,
  EGP: 48.7,
  SAR: 3.75,
  AED: 3.67,
  ILS: 3.72,
  KRW: 1380,
  THB: 34.2,
  IDR: 16250,
  MYR: 4.35,
  PHP: 58.5,
  VND: 25400,
  NGN: 1620,
  KES: 129.5,
};

export const CURRENCY_API_URL = 'https://open.er-api.com/v6/latest/USD';