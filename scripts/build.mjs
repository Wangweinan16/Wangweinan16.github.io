import { build, createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { cp, mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
let markup;
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  markup = renderToString(createElement(App));
} finally { await server.close(); }
process.env.NODE_ENV = 'production';
await build({ plugins: [{ name: 'prerender-home', transformIndexHtml(html) {
  return html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
} }] });
// Existing Pages configuration serves the master branch root. Commit these
// generated files with the editable sources; no paid build service is needed.
await mkdir(path.join(root, 'assets'), { recursive: true });
const currentAssets = new Set(await readdir(path.join(root, 'dist/assets')));
for (const entry of await readdir(path.join(root, 'assets'), { withFileTypes: true })) {
  if (entry.isFile() && /\.(css|js)$/.test(entry.name) && !currentAssets.has(entry.name)) {
    await unlink(path.join(root, 'assets', entry.name));
  }
}
for (const entry of await readdir(path.join(root, 'dist'))) {
  await cp(path.join(root, 'dist', entry), path.join(root, entry), { recursive: true });
}
await writeFile(path.join(root, '.nojekyll'), '');
const notices = [];
for (const name of ['react', 'react-dom', 'tailwindcss']) {
  const license = path.join(root, 'node_modules', name, 'LICENSE');
  try { notices.push(`${name}\n${await readFile(license, 'utf8')}`); }
  catch { if (name === 'tailwindcss') notices.push('Tailwind CSS preflight: MIT License, Copyright Tailwind Labs, Inc. See https://github.com/tailwindlabs/tailwindcss/blob/main/LICENSE'); }
}
await writeFile(path.join(root, 'THIRD-PARTY-NOTICES.txt'), notices.join('\n\n'));
console.log('Built and prerendered GitHub Pages files at repository root.');
