import assert from 'node:assert/strict';
import test from 'node:test';
import { APEX_REDIRECT_ORIGIN, CANONICAL_ORIGIN, resolveSite } from './siteConfig';

test('the canonical production origin is the www host', () => {
  assert.equal(CANONICAL_ORIGIN, 'https://www.totalcalculation.com');
  assert.equal(APEX_REDIRECT_ORIGIN, 'https://totalcalculation.com');
  assert.deepEqual(resolveSite({ SITE_URL: CANONICAL_ORIGIN, VERCEL_ENV: 'production' }), {
    url: CANONICAL_ORIGIN,
    isPreview: false,
  });
});

test('normalizes a trailing slash on the canonical origin', () => {
  assert.deepEqual(resolveSite({ SITE_URL: `${CANONICAL_ORIGIN}/`, VERCEL_ENV: 'production' }), {
    url: CANONICAL_ORIGIN,
    isPreview: false,
  });
});

test('normalizes the redirecting apex host to the canonical www host', () => {
  assert.deepEqual(resolveSite({ SITE_URL: APEX_REDIRECT_ORIGIN, VERCEL_ENV: 'production' }), {
    url: CANONICAL_ORIGIN,
    isPreview: false,
  });
});

test('a production build refuses any non-canonical origin', () => {
  assert.throws(
    () => resolveSite({ SITE_URL: 'https://example.com', VERCEL_ENV: 'production' }),
    /must be https:\/\/www\.totalcalculation\.com/
  );
});

test('retired hosts are rejected in every mode', () => {
  for (const SITE_URL of [
    'https://calculate-daily.vercel.app',
    'https://totalcalculation.vercel.app',
  ]) {
    assert.throws(() => resolveSite({ SITE_URL }), /retired host/);
    assert.throws(() => resolveSite({ SITE_URL, VERCEL_ENV: 'production' }), /retired host/);
    assert.throws(() => resolveSite({ SITE_URL, VERCEL_ENV: 'preview' }), /retired host/);
  }
});

test('an unconfigured build falls back to the canonical origin, never localhost', () => {
  assert.deepEqual(resolveSite({}), { url: CANONICAL_ORIGIN, isPreview: false });
});

test('a production deployment without SITE_URL uses the canonical origin, not the deployment host', () => {
  assert.deepEqual(
    resolveSite({ VERCEL_ENV: 'production', VERCEL_URL: 'calculate-daily.vercel.app' }),
    { url: CANONICAL_ORIGIN, isPreview: false }
  );
});

test('production requires HTTPS', () => {
  assert.throws(
    () => resolveSite({ SITE_URL: 'http://www.totalcalculation.com', VERCEL_ENV: 'production' }),
    /must use HTTPS/
  );
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
  assert.deepEqual(resolveSite({ VERCEL_ENV: 'preview' }), {
    url: 'http://localhost:3000',
    isPreview: true,
  });
  assert.deepEqual(
    resolveSite({ SITE_URL: 'https://preview.example.com', VERCEL_ENV: 'preview' }),
    { url: 'https://preview.example.com', isPreview: true }
  );
  assert.deepEqual(resolveSite({ VERCEL_ENV: 'preview', VERCEL_URL: 'preview.example.com' }), {
    url: 'https://preview.example.com',
    isPreview: true,
  });
});

test('a Vercel deployment URL without an explicit environment stays preview', () => {
  assert.deepEqual(resolveSite({ VERCEL_URL: 'preview.example.com' }), {
    url: 'https://preview.example.com',
    isPreview: true,
  });
});
