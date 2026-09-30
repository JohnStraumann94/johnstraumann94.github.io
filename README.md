# John Straumann — Chief AI Officer

A responsive, static personal/leadership website designed for GitHub Pages.

## Files

- `index.html` — page structure/content
- `styles.css` — visual design and responsive layout
- `script.js` — mobile navigation
- `playbooks/` — the AI Playbook documents served for direct download from the
  Playbooks & Toolkits section. Masters live in
  `D:\Johnz Projects\Training\AI\Playbooks`; copy a new version in and update the
  matching `<a class="asset-link">` href, which carries the version in the file name.

## Sections

`index.html` is a single page with seven sections: About, AI Leadership, Selected Work,
Playbooks & Toolkits, Training, Perspective, and Contact. The section kickers are numbered
by hand (`01 — ABOUT` … `07 — CONTACT`), so renumber them if a section is inserted or removed.

The Training section links out to
[microsoft-foundry-labs](https://github.com/JohnStraumann94/microsoft-foundry-labs), the
20-module hands-on Microsoft Foundry course.

## Still to replace

- the LinkedIn placeholder (`href="#"`) — no LinkedIn URL is published on the GitHub profile
- the four Selected Work descriptions and their `href="#"` links, which are still template text

## GitHub Pages

The site is served from the `main` branch root of `johnstraumann94.github.io` — no build
step and no Jekyll theme, so a push to `main` is live within about a minute at
<https://johnstraumann94.github.io>. Settings are under the repository's Settings → Pages.
