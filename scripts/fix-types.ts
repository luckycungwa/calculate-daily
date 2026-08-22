import fs from 'fs';

// Fix conversion.ts - remove defaultFrom/defaultTo and fix double comma
let conv = fs.readFileSync('src/data/catalog/conversion.ts', 'utf8');
conv = conv.replace(/,\s*defaultFrom: '[^']*',/g, '');
conv = conv.replace(/,\s*defaultTo: '[^']*',/g, '');
conv = conv.replace(/,,/g, ',');
fs.writeFileSync('src/data/catalog/conversion.ts', conv);
console.log('Fixed conversion.ts');

// Fix finance.ts - replace inputs/compute with config format, fix double comma
let fin = fs.readFileSync('src/data/catalog/finance.ts', 'utf8');
fin = fin.replace(/,,/g, ',');
fs.writeFileSync('src/data/catalog/finance.ts', fin);
console.log('Fixed finance.ts');
