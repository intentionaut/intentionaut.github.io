// npm test
// shortcut: reads the component source, not rendered HTML, because tests run before the build.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const form = readFileSync(new URL('../src/components/SubscribeForm.astro', import.meta.url), 'utf8');
const contact = readFileSync(new URL('../src/components/ContactForm.astro', import.meta.url), 'utf8');
const markup = form.slice(form.indexOf('<form'), form.indexOf('</form>'));

test('the signup form carries the Turnstile widget, with the contact form\'s site key', () => {
  const key = contact.match(/TURNSTILE_SITEKEY = '([^']+)'/)[1];
  assert.match(markup, /class="subscribe-turnstile"/);
  assert.ok(form.includes(key));
  assert.match(markup, /data-appearance="interaction-only"/);
});

test('the token goes to the Worker with the signup', () => {
  assert.match(form, /'cf-turnstile-response': fd\.get\('cf-turnstile-response'\)/);
});

test('a failed try resets only that form\'s widget, since a token is single-use', () => {
  assert.match(form, /turnstile\?\.reset\(id\)/);
  assert.ok((form.match(/resetWidget\(form\)/g) || []).length >= 2);
});

test('the Turnstile script loads once per page, however many forms it has', () => {
  assert.ok(!/<script[^>]*src="https:\/\/challenges\.cloudflare\.com/.test(form));
  assert.match(form, /querySelector<HTMLScriptElement>\(`script\[src\^="\$\{API\}"\]`\)/);
  assert.match(form, /render=explicit&onload=onSubscribeTurnstile/);
});
