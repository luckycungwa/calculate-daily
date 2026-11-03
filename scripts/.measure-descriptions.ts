import { CALCULATOR_CATALOG } from '../src/data/calculators';
import { GUIDE_REGISTRY } from '../src/data/guides';

const lens = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const q = (p: number) => s[Math.min(s.length - 1, Math.floor(p * (s.length - 1)))];
  return { min: s[0], p25: q(0.25), median: q(0.5), p75: q(0.75), max: s[s.length - 1] };
};

const introLens = CALCULATOR_CATALOG.map((c) => (c.content.intro ?? '').length);
const shortLens = CALCULATOR_CATALOG.map((c) => (c.shortDesc ?? '').length);

console.log('CALCULATORS:', CALCULATOR_CATALOG.length);
console.log('intro length:', JSON.stringify(lens(introLens)));
console.log('shortDesc length:', JSON.stringify(lens(shortLens)));

const noIntro = CALCULATOR_CATALOG.filter((c) => !c.content.intro || c.content.intro.trim().length < 40);
console.log('intro missing/short(<40):', noIntro.length, noIntro.slice(0, 10).map((c) => c.slug));

const introDupes = new Map<string, string[]>();
for (const c of CALCULATOR_CATALOG) {
  const k = (c.content.intro ?? '').trim();
  introDupes.set(k, [...(introDupes.get(k) ?? []), c.slug]);
}
const dupedIntros = [...introDupes.entries()].filter(([k, v]) => k && v.length > 1);
console.log('duplicate intros:', dupedIntros.length);
dupedIntros.slice(0, 5).forEach(([k, v]) => console.log('   ', v.length, 'x', k.slice(0, 70)));

const shortDupes = new Map<string, string[]>();
for (const c of CALCULATOR_CATALOG) {
  const k = (c.shortDesc ?? '').trim();
  shortDupes.set(k, [...(shortDupes.get(k) ?? []), c.slug]);
}
console.log('duplicate shortDesc:', [...shortDupes.entries()].filter(([, v]) => v.length > 1).length);

const withExplicit = CALCULATOR_CATALOG.filter((c) => c.seo?.description);
console.log('calculators with seo.description:', withExplicit.length);

const introOver160 = introLens.filter((n) => n > 160).length;
console.log('intro > 160 chars:', introOver160);

console.log('GUIDES:', GUIDE_REGISTRY.length);
GUIDE_REGISTRY.forEach((g) => {
  console.log(
    `   ${g.slug}: shortDesc=${g.shortDesc.length} seoDesc=${g.seo?.description?.length ?? '-'} updatedAt=${g.seo?.updatedAt ?? '-'} status=${g.seo?.status}/${g.seo?.reviewStatus}`
  );
});
