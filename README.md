# John Straumann — Chief AI Officer

A responsive, static personal/leadership website designed for GitHub Pages.

## Files

- `index.html` — page structure/content
- `styles.css` — visual design and responsive layout
- `script.js` — mobile navigation and download-click tracking
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

## Download tracking

GitHub Pages serves static files only, so no server-side logging is possible here. Playbook
downloads therefore route through a small Azure endpoint that records the click and then
redirects to the file, which still lives in `playbooks/` on this site:

```
https://thankful-dune-0ba7c140f.6.azurestaticapps.net/api/d?f=<filename>
```

Because that is an ordinary navigation rather than a background request, it is not defeated
by ad blockers or by JavaScript being turned off. When you add or re-version a playbook you
must update the file name in **two** places: the `href` in `index.html`, and the allowlist in
`api/shared/files.js` in the `site-analytics-api` project. The endpoint returns 404 for any
file not on that list.

Outbound links to the Foundry course cannot be redirected, so `script.js` reports those with
`navigator.sendBeacon` to `/api/collect` instead. That part *is* blockable.

Clicks land in the `johnz-site-insights` Application Insights resource in `rg-site-analytics`.
See the `site-analytics-api` project README for the KQL queries and the redeploy command.

## Still to replace

- the LinkedIn placeholder (`href="#"`) — no LinkedIn URL is published on the GitHub profile
- the four Selected Work descriptions and their `href="#"` links, which are still template text

## GitHub Pages

The site is served from the `main` branch root of `johnstraumann94.github.io` — no build
step and no Jekyll theme, so a push to `main` is live within about a minute at
<https://johnstraumann94.github.io>. Settings are under the repository's Settings → Pages.
