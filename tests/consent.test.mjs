import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const consent = readFileSync(new URL('../src/components/Consent.astro', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const footer = readFileSync(new URL('../src/components/Footer.astro', import.meta.url), 'utf8');

test('PostHog only loads after Accept, never on page load by default', () => {
  // load() is called from choose('yes') and from a stored 'yes' only.
  assert.match(consent, /if \(v === 'yes'\) load\(\);/);
  assert.match(consent, /if \(c === 'yes'\) load\(\);/);
  assert.equal((consent.match(/\bload\(\);/g) || []).length, 2);
});

test('Decline is offered beside Accept', () => {
  assert.match(consent, /data-consent="yes">Accept</);
  assert.match(consent, /data-consent="no">Decline</);
});

test('PostHog goes through the EU managed proxy on our domain, with session recording off', () => {
  assert.match(consent, /api_host: 'https:\/\/e\.intentionaut\.com'/);
  assert.match(consent, /ui_host: 'https:\/\/eu\.posthog\.com'/);
  assert.match(consent, /disable_session_recording: true/);
});

test('URL fragments, where case-study keys live, are stripped before sending', () => {
  assert.match(consent, /split\('#'\)\[0\]/);
  assert.match(consent, /before_send/);
});

test('pages that opt out of analytics opt out of PostHog too', () => {
  assert.match(layout, /<Consent disabled=\{noAnalytics\} \/>/);
});

test('the footer can reopen the choice', () => {
  assert.match(footer, /data-cookie-settings>Cookie settings</);
});

test('survey is capped: selector marker, 3 showings in 30 days, none after an answer', () => {
  assert.match(consent, /m\.id = 'survey-ok'/);
  assert.match(consent, /< 3;/);
  assert.match(consent, /30 \* 864e5/);
  assert.match(consent, /indexOf\('sent'\) !== -1\) return false/);
  assert.match(consent, /noteSurvey\(ev\);/);
});

// Analytics that sets a cookie or stores an id loads only from Consent.astro,
// after Accept (AGENTS.md, "Analytics and consent"). #147 and #197 each tried
// to load a tracker on page load. Add a new tool's loader to this list too.
const TRACKER = /posthog\.init|\/static\/array\.js|pendo\.initialize|cdn\.(eu\.)?pendo\.io|googletagmanager|gtag\(|hotjar|clarity\.ms|mixpanel|amplitude|fullstory|cdn\.segment|['"](posthog-js|@amplitude|mixpanel-browser)['"]/i;
const ALLOWED = new Set(['src/components/Consent.astro']);

function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = `${dir}/${d.name}`;
    if (d.isDirectory()) return p === 'src/content' ? [] : files(p); // prose may name tools; it cannot load scripts
    return /\.(astro|ts|js|mjs|html|md|mdx)$/.test(d.name) ? [p] : [];
  });
}

test('no analytics loader outside Consent.astro', () => {
  const hits = [...files('src'), ...files('public'), 'package.json', 'astro.config.mjs']
    .filter((f) => !ALLOWED.has(f))
    .flatMap((f) => readFileSync(f, 'utf8').split('\n')
      .map((line, i) => (TRACKER.test(line) ? `${f}:${i + 1}: ${line.trim().slice(0, 80)}` : null))
      .filter(Boolean));
  assert.deepEqual(hits, [], 'Analytics must load from Consent.astro after Accept, with a privacy page line:\n' + hits.join('\n'));
});

test('Pendo loads only inside load(), and Decline stops it and clears its ids', () => {
  assert.match(consent, /function load\(\) \{\n\s+loadPendo\(\);/);
  assert.equal((consent.match(/\bloadPendo\(\);/g) || []).length, 1);
  assert.match(consent, /stopSendingEvents/);
  assert.match(consent, /indexOf\('_pendo_'\) === 0/);
  assert.match(consent, /attr: 'hash', action: 'Clear'/);
});
