# Weinan Wang — personal website

Public website: https://wangweinan16.github.io/

This repository preserves the design and public research content of the original
Sites website. GitHub Pages hosts the static files for free. No server, database,
paid hosting plan, custom domain, or API secret is required.

## Editing

- `content/site.ts`: biography, research projects, publication, experience and photos.
- `web/src/App.tsx`: page layout and interactions.
- `web/src/styles.css`: existing visual design and responsive layout.
- `content/analytics.json`: the owner's public GoatCounter counting endpoint.

Run `npm ci`, `npm test`, then `npm run build` using Node.js 22.13 or newer.
Commit both the editable source and the generated root `index.html`, `assets/`,
favicon, robots and sitemap files. Pages serves the root of the `master` branch.
`.nojekyll` ensures the generated page is served directly. The original starter
`index.md` and `_config.yml` remain in history and are not used by this design.

All deployed content is prerendered into HTML for search engines and visitors;
React adds the menu, project disclosures, privacy controls, and photo dialogs.

## Free visitor analytics

GoatCounter is free for reasonable personal-site usage:
https://www.goatcounter.com/

The owner must create an account at https://www.goatcounter.com/signup and put its
actual counting endpoint in `content/analytics.json`, then rebuild and commit.
An empty endpoint disables all third-party script loading and counting. No
account or active tracking is implied by the prepared integration alone.

Keep the GoatCounter dashboard private and individual-pageview collection off.
Do not put passwords or API tokens in this repository. The counting endpoint is
public by design; a password or API token is never needed by this website.

The integration counts `/` as a pageview and section visibility as named events,
once per section per page load. GoatCounter may deduplicate repeat visits under
its own rules, so metrics differ from the original Sites counters. Only fixed
paths and referring origins are sent; query strings and full referral URLs are
excluded. Counting is disabled in local previews and respects the site's opt-out,
Do Not Track and Global Privacy Control before loading the external script.
Privacy details: https://www.goatcounter.com/help/privacy

The former Sites database is separate and is not copied into GitHub or
GoatCounter. Existing data remains with the original Sites account until the
owner chooses to export or remove it. No live analytics data is in this repo.

## Ownership and portability

The repository and Pages site belong to the owner's GitHub account. Only users
with repository write permission can change the original site. Public source can
be viewed or copied, which does not grant permission to edit this repository.
No additional collaborators are added by the migration.

Keep source and original-photo backups in storage you control. A custom domain
can be connected later. GitHub and GoatCounter availability and free-tier terms
may change over time. Never add private CVs, unpublished figures, or credentials
to public assets. Use only figures approved for public release.
