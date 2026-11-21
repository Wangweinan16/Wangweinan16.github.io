import { createAnalytics, privacyKey } from './analytics.mjs';

const project = document.querySelector('script[data-project]')?.dataset.project;
const optout = document.getElementById('optout');
const status = document.getElementById('privacy-state');

try {
  optout.checked = localStorage.getItem(privacyKey) === 'true';
  const response = await fetch(new URL('./analytics-config.json', import.meta.url));
  if (!response.ok) throw new Error('Analytics configuration is unavailable');
  const config = await response.json();
  const counter = createAnalytics({ window, document, navigator, storage: localStorage, ...config });
  const report = () => {
    status.textContent = optout.checked || navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true
      ? 'Your visits are not counted.'
      : 'Aggregate visitor analytics are enabled. You can opt out at any time.';
  };
  optout.addEventListener('change', () => {
    try {
      localStorage.setItem(privacyKey, String(optout.checked));
      if (optout.checked) counter.clear();
      report();
    } catch {
      counter.clear();
      status.textContent = 'Your preference could not be saved on this device.';
    }
  });
  report();
  counter.track(project);
} catch {
  status.textContent = 'Analytics are unavailable.';
}
