// Playbook downloads are tracked server-side by the /api/d redirect, so only
// outbound links that cannot be redirected are reported from the browser.
const DOWNLOAD_ENDPOINT = 'https://thankful-dune-0ba7c140f.6.azurestaticapps.net/api/collect';

function trackDownload(href, label) {
  const detail = {
    file: href.split('/').pop(),
    label,
    page: location.pathname,
    referrer: document.referrer || null,
    at: new Date().toISOString()
  };

  // text/plain keeps this a simple request, so no CORS preflight is needed --
  // sendBeacon cannot recover from a failed preflight.
  if (DOWNLOAD_ENDPOINT && navigator.sendBeacon) {
    navigator.sendBeacon(DOWNLOAD_ENDPOINT, new Blob([JSON.stringify(detail)], { type: 'text/plain' }));
  }

  // Hand off to a hosted analytics tool if one is present.
  window.gtag?.('event', 'file_download', { file_name: detail.file, link_url: href });
  window.plausible?.('Download', { props: { file: detail.file } });
  window.goatcounter?.count?.({ path: 'download/' + detail.file, title: label, event: true });
}

document.querySelectorAll('a[href*="microsoft-foundry-labs"]').forEach(link => {
  link.addEventListener('click', () => {
    trackDownload(link.getAttribute('href'), link.textContent.trim());
  });
});

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});
