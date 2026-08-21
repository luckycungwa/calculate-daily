import React, { createContext, useContext, useState } from 'react';
import { RegionCode, RegionConfig, DEFAULT_REGION_CODE, getRegionConfig } from '../data/regions';
import { setCurrencySymbol, getCurrencySymbol } from './currency';

const STORAGE_KEY = 'calculate_daily_region';

export interface RegionContextValue {
  region: RegionConfig;
  regionCode: RegionCode;
  setRegion: (code: RegionCode) => void;
}

const RegionContext = createContext<RegionContextValue>({
  region: getRegionConfig(DEFAULT_REGION_CODE),
  regionCode: DEFAULT_REGION_CODE,
  setRegion: () => {},
});

function getInitialRegionCode(): RegionCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as RegionCode | null;
    if (saved && getRegionConfig(saved)) return saved;
  } catch {
    /* ignore */
  }
  return DEFAULT_REGION_CODE;
}

export const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [regionCode, setRegionCode] = useState<RegionCode>(() => getInitialRegionCode());

  const setRegion = (code: RegionCode) => {
    setRegionCode(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
    const cfg = getRegionConfig(code);
    if (cfg.currencySymbol !== getCurrencySymbol()) {
      setCurrencySymbol(cfg.currencySymbol);
    }
  };

  const region = getRegionConfig(regionCode);

  return (
    <RegionContext.Provider value={{ region, regionCode, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
};

export function useRegion(): RegionContextValue {
  return useContext(RegionContext);
}