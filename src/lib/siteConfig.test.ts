import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveSite } from './siteConfig';

test('normalizes a configured production origin and requires HTTPS', () => {
  assert.deepEqual(
    resolveSite({ SITE_URL: 'https://example.com/', VERCEL_ENV: 'production' }),
    { url: 'https://example.com', isPreview: false }
  );
  assert.throws(
    () => resolveSite({ SITE_URL: 'http://example.com', VERCEL_ENV: 'production' }),
    /must use HTTPS/
  );
  assert.throws(() => resolveSite({ VERCEL_ENV: 'production' }), /SITE_URL is required/);
});

test('rejects SITE_URL values that are not bare HTTP(S) origins', () => {
  for (const SITE_URL of [
    'https://example.com/path',
    'https://example.com?campaign=test',
    'https://example.com#section',
    'https://user:pass@example.com',
    'ftp://example.com',
    'not a URL',
  ]) {
    assert.throws(() => resolveSite({ SITE_URL }), /origin/);
  }
});

test('preview deployments remain noindex even when VERCEL_URL is missing', () => {
  assert.deepEqual(
    resolveSite({ VERCEL_ENV: 'preview' }),
    { url: 'http://localhost:3000', isPreview: true }
  );
  assert.deepEqual(
    resolveSite({
      SITE_URL: 'https://preview.example.com',
      VERCEL_ENV: 'preview',
    }),
    { url: 'https://preview.example.com', isPreview: true }
  );
  assert.deepEqual(
    resolveSite({ VERCEL_ENV: 'preview', VERCEL_URL: 'preview.example.com' }),
    { url: 'https://preview.example.com', isPreview: true }
  );
});

test('local builds use the inspection origin unless Vercel supplies a deployment URL', () => {
  assert.deepEqual(resolveSite({}), { url: 'http://localhost:3000', isPreview: false });
  assert.deepEqual(
    resolveSite({ VERCEL_URL: 'preview.example.com' }),
    { url: 'https://preview.example.com', isPreview: true }
  );
});
