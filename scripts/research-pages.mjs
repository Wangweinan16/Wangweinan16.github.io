import { mkdir, readFile, writeFile } from 'node:fs/promises';

function escapeHtml(value) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value).replace(/[&<>"']/g, character => entities[character]);
}

function figureCard(figure, featured) {
  const { id, src, width, height, title, alt, caption } = figure;
  return `<figure id="${escapeHtml(id)}" class="research-figure${featured || figure.wide || width / height > 1.5 ? ' research-figure-wide' : ''}">
    <a class="research-image" href="${escapeHtml(src)}" target="_blank" rel="noopener" aria-label="Open full-size image: ${escapeHtml(title)}">
      <img src="${escapeHtml(src)}" width="${width}" height="${height}" alt="${escapeHtml(alt)}" loading="${featured ? 'eager' : 'lazy'}" decoding="async">
    </a>
    <figcaption><h3>${escapeHtml(title)}</h3><p>${escapeHtml(caption)}</p></figcaption>
  </figure>`;
}

export async function buildResearchPages() {
  const projects = JSON.parse(await readFile('content/research.json', 'utf8'));
  const home = await readFile('dist/index.html', 'utf8');
  const css = home.match(/href="([^"]+\.css)"/)[1];
  for (const project of projects) {
    const { id, short, title, status, authors, introduction, sections } = project;
    const url = `https://wangweinan16.github.io/research/${id}/`;
    const links = sections.map((section, index) => `<a href="#topic-${index}">${escapeHtml(section.title)}</a>`).join('');
    const content = sections.map((section, index) => `<section id="topic-${index}" class="research-topic">
      <h2>${escapeHtml(section.title)}</h2>
      <p>${escapeHtml(section.description)}</p>
      <div class="research-figures">${section.figures.map(figure => figureCard(figure, id === 'ebl' && figure.id === 'overview')).join('')}</div>
    </section>`).join('');
    const citation = authors ? `
      <p class="research-authors">${escapeHtml(authors)}.</p>` : '';
    const otherProjects = projects.filter(item => item.id !== id).map(item => `<a href="/research/${item.id}/">${escapeHtml(item.short)} ↗</a>`).join('');
    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="referrer" content="origin">
  <meta name="description" content="${escapeHtml(project.summary)}">
  <title>${escapeHtml(short)} | Weinan Wang</title>
  <link rel="canonical" href="${url}">
  <link rel="icon" href="/favicon.svg">
  <link rel="stylesheet" href="${css}">
</head>
<body>
  <a class="skip-link" href="#project-content">Skip to content</a>
  <header class="site-header">
    <a class="wordmark" href="/"><span class="monogram">WW<span>.</span></span><span class="wordmark-name">Weinan Wang</span></a>
    <a class="text-link" href="/#research">← All research</a>
  </header>
  <main id="project-content" class="research-page">
    <div class="research-lead">
      <p class="eyebrow">${escapeHtml(short)} · ${escapeHtml(status)}</p>
      <h1>${escapeHtml(project.heading ?? title)}</h1>${citation}
      <p class="research-intro">${escapeHtml(introduction)}</p>
    </div>
    <nav class="research-jump" aria-label="On this page">${links}</nav>
    ${content}
    <footer class="research-footer">
      <nav class="research-jump" aria-label="Other projects">${otherProjects}<a href="/#research">All research ↗</a></nav>
      <label><input type="checkbox" id="optout"> Don’t include my visits in analytics.</label>
      <p id="privacy-state" role="status"></p>
      <a class="text-link" href="https://www.goatcounter.com/help/privacy">GoatCounter privacy policy ↗</a>
    </footer>
  </main>
  <script type="module" src="/research/project-analytics.mjs" data-project="${escapeHtml(id)}"></script>
</body>
</html>`;
    await mkdir(`dist/research/${id}`, { recursive: true });
    await writeFile(`dist/research/${id}/index.html`, html);
  }
  await writeFile('dist/research/analytics-config.json', await readFile('content/analytics.json'));
  await writeFile('dist/research/analytics.mjs', await readFile('web/src/analytics.mjs'));
}
