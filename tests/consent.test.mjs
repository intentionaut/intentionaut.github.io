import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

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
