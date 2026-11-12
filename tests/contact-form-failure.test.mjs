// npm test
// A failed send gives the visitor a way forward. Source checks: the script is
// browser-only, so these read the component the way the other page tests do.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/components/ContactForm.astro', import.meta.url), 'utf8');
const script = src.slice(src.indexOf('<script>'));
const failure = script.slice(script.indexOf('const sayFailure'), script.indexOf("form?.addEventListener"));
const nonOk = script.slice(script.indexOf('} else {\n        trackEvent'), script.indexOf('} catch {'));
const rejected = script.slice(script.indexOf('} catch {'), script.indexOf('} finally {'));

test('the failure message has the mailto link and a new-tab booking link', () => {
  assert.match(failure, /mailto:hello@intentionaut\.com/);
  assert.match(failure, /link\(BOOKING_URL, 'Book a free call', true\)/);
  assert.match(script, /a\.rel = 'noopener noreferrer'/);
  assert.match(script, /a\.target = '_blank'/);
  assert.match(failure, /That message didn't send\. Your text is still here/);
});

test('the message is built from DOM nodes, never innerHTML', () => {
  assert.doesNotMatch(script, /innerHTML/);
  assert.match(failure, /replaceChildren/);
});

test('a non-OK response and a rejected fetch both show it, and both are tracked', () => {
  assert.match(nonOk, /contact_enquiry_failed/);
  assert.match(nonOk, /sayFailure\(result\.error\)/);
  assert.match(rejected, /contact_enquiry_failed/);
  assert.match(rejected, /sayFailure\(\)/);
});

test('a failure never resets the form, so typed text stays', () => {
  assert.doesNotMatch(nonOk, /form\.reset/);
  assert.doesNotMatch(rejected, /form\.reset/);
});
