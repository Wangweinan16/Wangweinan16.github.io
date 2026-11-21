export const privacyKey = 'weinan-analytics-optout';
const projects = new Set(['ebl', 'centimani', 'gchip']);
const sections = new Set(['home', 'research', 'experience', 'interests', 'photos', ...projects]);

export function validEndpoint(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.goatcounter\.com$/.test(url.hostname)
      && url.pathname === '/count' && !url.search && !url.hash && !url.port && !url.username && !url.password;
  } catch { return false; }
}

// Browser dependencies are injected so privacy behavior can be checked without
// sending real visits or loading a third-party script during tests.
export function createAnalytics({ window, document, navigator, storage, endpoint, productionHost }) {
  let loading = false;
  let pending = [];
  function allowed() {
    try {
      return validEndpoint(endpoint) && window.location.hostname === productionHost
        && navigator.doNotTrack !== '1' && navigator.globalPrivacyControl !== true
        && storage.getItem(privacyKey) !== 'true';
    } catch { return false; }
  }
  function referrer() {
    try { return document.referrer ? new URL(document.referrer).origin : ''; }
    catch { return ''; }
  }
  function flush() {
    const queue = pending;
    pending = [];
    if (!allowed()) return;
    const counter = window.goatcounter;
    if (!counter?.count || counter.filter?.()) return;
    for (const item of queue) {
      if (!allowed()) break;
      counter.count(item);
    }
  }
  function load() {
    if (loading) return;
    loading = true;
    window.goatcounter = { no_onload: true, no_events: true, endpoint };
    const script = document.createElement('script');
    script.src = 'https://gc.zgo.at/count.js';
    script.async = true;
    script.setAttribute('data-goatcounter', endpoint);
    script.setAttribute('data-goatcounter-settings', JSON.stringify({ no_onload: true, no_events: true }));
    script.onload = flush;
    script.onerror = () => { pending = []; loading = false; script.remove(); };
    document.head.appendChild(script);
  }
  return {
    track(page) {
      if (!sections.has(page) || !allowed()) return;
      pending.push({
        path: page === 'home' ? '/' : projects.has(page) ? `/research/${page}/` : `section-${page}`,
        title: page === 'home' ? 'Weinan Wang' : projects.has(page) ? `Research: ${page}` : `Section: ${page}`,
        event: page !== 'home' && !projects.has(page),
        referrer: referrer(),
      });
      if (window.goatcounter?.count) flush(); else load();
    },
    clear() { pending = []; },
  };
}
