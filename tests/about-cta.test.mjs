// npm test
// shortcut: needs dist/ from `npm run build`; skips when absent so a bare `npm test` still runs, upgrade by building in CI before tests.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const about = new URL('../dist/about/index.html', import.meta.url);
const contact = new URL('../dist/contact/index.html', import.meta.url);
const skip = !(existsSync(about) && existsSync(contact)) && 'run npm run build first';

const bookHref = (html) => html.match(/<a class="btn-primary" href="([^"]+)"[^>]*>Book a free call<\/a>/)?.[1];

test('built /about/ ends with the booking button and the message link', { skip }, () => {
  const html = readFileSync(about, 'utf8');
  const href = bookHref(html);
  assert.ok(href, 'booking button present');
  assert.equal(href, bookHref(readFileSync(contact, 'utf8')), 'same booking target as /contact/');
  const send = html.match(/<a class="link-arrow" href="\/contact\/#contact-section"[^>]*><span[^>]*>Send a message<\/span><\/a>/);
  assert.ok(send, 'message link reaches the form on /contact/');
  assert.ok(html.indexOf('A brief history.') < html.indexOf('>Book a free call<') && html.indexOf('>Book a free call<') < send.index, 'row comes after the history, button before link');
});
