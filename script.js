// Playbook downloads are tracked server-side by the /api/d redirect, so only
// outbound links that cannot be redirected are reported from the browser.
const DOWNLOAD_ENDPOINT = 'https://thankful-dune-0ba7c140f.6.azurestaticapps.net/api/collect';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'];

// Campaign tags arrive on the landing URL but the download links point at a
// different host, so carry them for the rest of the visit. Social apps often
// strip the referrer, which makes these the only reliable attribution.
function campaignTags() {
  const incoming = new URLSearchParams(location.search);
  const tags = {};

  UTM_KEYS.forEach(key => {
    const value = incoming.get(key);
    if (value) {
      tags[key] = value.slice(0, 60);
    }
  });

  try {
    if (Object.keys(tags).length) {
      sessionStorage.setItem('campaign', JSON.stringify(tags));
      return tags;
    }
    return JSON.parse(sessionStorage.getItem('campaign') || '{}');
  } catch {
    return tags;
  }
}

const campaign = campaignTags();

// Append the campaign to the tracked download links so the redirect can record
// which post the visitor came from.
if (Object.keys(campaign).length) {
  document.querySelectorAll('a[href*="/api/d?"]').forEach(link => {
    const url = new URL(link.href);
    Object.entries(campaign).forEach(([key, value]) => url.searchParams.set(key, value));
    link.href = url.toString();
  });
}

function trackDownload(href, label) {
  const detail = {
    file: href.split('/').pop(),
    label,
    page: location.pathname,
    referrer: document.referrer || null,
    utmSource: campaign.utm_source || '',
    utmMedium: campaign.utm_medium || '',
    utmCampaign: campaign.utm_campaign || '',
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

document.querySelectorAll('a[data-download]').forEach(link => {
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
