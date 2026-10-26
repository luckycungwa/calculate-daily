import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePasswordEntropy,
  calculateSubnet,
  contrastRatio,
  convertNumberBases,
  decodeUrlComponent,
  encodeUrlComponent,
  parseColor,
  relativeLuminance,
  rgbToHex,
  rgbToHsl,
  simplifyRatio,
  transferSeconds,
} from './devTools';

test('subnet maths covers /24, /30, and single-host prefixes', () => {
  const slash24 = calculateSubnet('192.168.1.10', 24);
  assert.equal(slash24.network, '192.168.1.0');
  assert.equal(slash24.broadcast, '192.168.1.255');
  assert.equal(slash24.mask, '255.255.255.0');
  assert.equal(slash24.wildcard, '0.0.0.255');
  assert.equal(slash24.firstHost, '192.168.1.1');
  assert.equal(slash24.lastHost, '192.168.1.254');
  assert.equal(slash24.usableHosts, 254);
  assert.equal(slash24.totalAddresses, 256);

  const slash30 = calculateSubnet('10.0.0.5', 30);
  assert.equal(slash30.network, '10.0.0.4');
  assert.equal(slash30.broadcast, '10.0.0.7');
  assert.equal(slash30.usableHosts, 2);

  const single = calculateSubnet('10.0.0.5', 32);
  assert.equal(single.network, '10.0.0.5');
  assert.equal(single.usableHosts, 1);
  assert.equal(single.firstHost, '10.0.0.5');

  assert.throws(() => calculateSubnet('192.168.1', 24), /dotted form/);
  assert.throws(() => calculateSubnet('192.168.1.300', 24), /between 0 and 255/);
  assert.throws(() => calculateSubnet('192.168.1.1', 33), /0 to 32/);
});

test('number base conversion handles prefixes, case, and invalid digits', () => {
  assert.deepEqual(convertNumberBases('0xFF', 16), {
    decimal: 255,
    binary: '11111111',
    octal: '377',
    hexadecimal: 'ff',
  });
  assert.equal(convertNumberBases('1111 1111', 2).decimal, 255);
  assert.equal(convertNumberBases('0b1010', 2).decimal, 10);
  assert.equal(convertNumberBases('755', 8).hexadecimal, '1ed');
  assert.equal(convertNumberBases('1_000', 10).decimal, 1000);

  assert.throws(() => convertNumberBases('102', 2), /valid base-2/);
  assert.throws(() => convertNumberBases('', 10), /Enter a value/);
  assert.throws(() => convertNumberBases('99999999999999999999', 10), /too large/);
});

test('password entropy scales with pool size and length', () => {
  const lowerOnly = calculatePasswordEntropy({
    length: 8,
    lowercase: true,
    uppercase: false,
    digits: false,
    symbols: false,
  });
  assert.equal(lowerOnly.poolSize, 26);
  assert.equal(Number(lowerOnly.entropyBits.toFixed(4)), 37.6035);

  const everything = calculatePasswordEntropy({
    length: 12,
    lowercase: true,
    uppercase: true,
    digits: true,
    symbols: true,
  });
  assert.equal(everything.poolSize, 94);
  assert.ok(everything.entropyBits > 78 && everything.entropyBits < 79);

  assert.throws(
    () =>
      calculatePasswordEntropy({ length: 8, lowercase: false, uppercase: false, digits: false, symbols: false }),
    /at least one character set/
  );
  assert.throws(
    () =>
      calculatePasswordEntropy({ length: 0, lowercase: true, uppercase: false, digits: false, symbols: false }),
    /1 to 128/
  );
});

test('colour parsing, HSL, and WCAG contrast are consistent', () => {
  assert.deepEqual(parseColor('#f00'), { r: 255, g: 0, b: 0 });
  assert.deepEqual(parseColor('#00FF00'), { r: 0, g: 255, b: 0 });
  assert.deepEqual(parseColor('rgb(0, 0, 255)'), { r: 0, g: 0, b: 255 });

  assert.equal(rgbToHex({ r: 26, g: 43, b: 60 }), '#1a2b3c');
  assert.equal(rgbToHex({ r: 300, g: -4, b: 0 }), '#ff0000');

  const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
  assert.deepEqual({ h: Math.round(hsl.h), s: Math.round(hsl.s), l: Math.round(hsl.l) }, { h: 0, s: 100, l: 50 });

  assert.equal(Number(relativeLuminance({ r: 0, g: 0, b: 0 }).toFixed(4)), 0);
  assert.equal(Number(relativeLuminance({ r: 255, g: 255, b: 255 }).toFixed(4)), 1);
  assert.equal(Number(contrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }).toFixed(2)), 21);
  assert.equal(Number(contrastRatio({ r: 255, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }).toFixed(3)), 3.998);

  assert.throws(() => parseColor('not-a-colour'), /hex colour/);
  assert.throws(() => parseColor('rgb(300, 0, 0)'), /between 0 and 255/);
});

test('URL encoding round-trips and rejects malformed input', () => {
  assert.equal(encodeUrlComponent('a b&c=d'), 'a%20b%26c%3Dd');
  assert.equal(decodeUrlComponent('a%20b%26c%3Dd'), 'a b&c=d');
  assert.equal(decodeUrlComponent('hello+world'), 'hello world');
  assert.throws(() => decodeUrlComponent('%E0%A4%A'), /not valid percent-encoding/);
});

test('ratio simplification and transfer time use the right units', () => {
  assert.equal(simplifyRatio(16, 9), '16:9');
  assert.equal(simplifyRatio(1920, 1080), '16:9');
  assert.equal(simplifyRatio(4, 3), '4:3');
  assert.throws(() => simplifyRatio(0, 9), /positive/);

  // 1,000 MB over 100 Mbps is 80 seconds at full efficiency.
  assert.equal(transferSeconds(1000, 100), 80);
  assert.equal(transferSeconds(1000, 100, 50), 160);
  assert.throws(() => transferSeconds(1000, 0), /greater than zero/);
  assert.throws(() => transferSeconds(1000, 100, 0), /Efficiency/);
});
