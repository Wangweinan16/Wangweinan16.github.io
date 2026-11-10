import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createAnalytics, validEndpoint, privacyKey } from '../web/src/analytics.mjs';

function setup(overrides = {}) {
  const scripts = [], visits = [], values = new Map();
  const env = {
    endpoint: 'https://test-owner.goatcounter.com/count', productionHost: 'wangweinan16.github.io',
    window: { location: { hostname: 'wangweinan16.github.io' } }, navigator: {},
    storage: { getItem: key => values.get(key) },
    document: { referrer: 'https://example.org/private?secret=discarded', head: { appendChild: s => scripts.push(s) },
      createElement: () => ({ setAttribute(key,value) { this[key] = value; }, remove() {} }) },
    ...overrides,
  };
  const client = createAnalytics(env);
  function loaded() {
    env.window.goatcounter.count = value => visits.push(value);
    env.window.goatcounter.filter = () => false;
    scripts.at(-1).onload();
  }
  return { client, env, scripts, visits, values, loaded };
}

test('no third-party script or visit is sent without a valid account, in previews, or with privacy opt-out', () => {
  for (const overrides of [{ endpoint: '' }, { endpoint: 'http://x.goatcounter.com/count' },
    { endpoint: 'https://attacker.example/count' }, { navigator: { doNotTrack: '1' } },
    { navigator: { globalPrivacyControl: true } }, { window: { location: { hostname: 'localhost' } } },
    { storage: { getItem() { throw new Error('blocked'); } } }]) {
    const s = setup(overrides); s.client.track('home'); assert.equal(s.scripts.length, 0);
  }
  const s = setup(); s.values.set(privacyKey, 'true'); s.client.track('home'); assert.equal(s.scripts.length, 0);
});

test('async loading sends only fixed paths, explicit section events and normalized referrer domains', () => {
  const s = setup(); s.client.track('home'); s.client.track('research'); s.client.track('unbounded-input');
  assert.equal(s.scripts.length, 1); assert.equal(s.visits.length, 0);
  assert.equal(s.scripts[0].src, 'https://gc.zgo.at/count.js');
  assert.equal(JSON.parse(s.scripts[0]['data-goatcounter-settings']).no_onload, true);
  s.loaded();
  assert.deepEqual(s.visits, [
    { path: '/', title: 'Weinan Wang', event: false, referrer: 'https://example.org' },
    { path: 'section-research', title: 'Section: research', event: true, referrer: 'https://example.org' },
  ]);
});

test('opting out during script loading drops queued events and later visits', () => {
  const s = setup(); s.client.track('home'); s.values.set(privacyKey,'true'); s.client.clear(); s.loaded();
  s.client.track('research'); assert.equal(s.visits.length, 0);
});

test('provider filter and load failures never break browsing or send visits', () => {
  const s = setup(); s.client.track('home'); s.scripts[0].onerror(); assert.equal(s.visits.length, 0);
  s.client.track('research'); assert.equal(s.scripts.length, 2);
  s.env.window.goatcounter.count = value => s.visits.push(value);
  s.env.window.goatcounter.filter = () => 'bot'; s.scripts[1].onload(); assert.equal(s.visits.length, 0);
  assert.equal(validEndpoint('https://x.goatcounter.com/count?extra=1'),false);
  assert.equal(validEndpoint('https://test-owner.goatcounter.com/count'),true);
});
