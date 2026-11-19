// npm test
// Page layout and calls to action, read from source so no build is needed.
// target and rel on booking links are checked sitewide in site-rules.test.mjs.
const SAYS_NEW_TAB = /<span class="sr-only">\(opens in a new tab\)<\/span>/;
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read } from './lib.mjs';

const BOOK = /<a class="btn-primary" href=\{BOOKING_URL\}[^>]*>[\s\S]*?<\/a>/;
const order = (s, ...marks) => marks.map((m) => s.indexOf(m)).every((i, n, a) => i >= 0 && (n === 0 || a[n - 1] < i));

test('/about/ ends with the booking button, then the message link', () => {
  const s = read('src/pages/about.astro');
  assert.match(s, /<a class="link-arrow" href="\/contact\/#contact-section"[^>]*><span>Send a message<\/span><\/a>/);
  assert.ok(order(s, 'A brief history.', 'href={BOOKING_URL}', 'href="/contact/#contact-section"'));
});

test('/about/ and /case-studies/ link to both offers', () => {
  for (const p of ['src/pages/about.astro', 'src/pages/case-studies/index.astro'])
    for (const o of ['fractional', 'forward-deployed']) assert.ok(read(p).includes(`<a href="/${o}/">`), `${p} ${o}`);
});

test('/ai-adoption-evidence/ closes after the figures with a link to /fractional/, then the booking button', () => {
  const s = read('src/pages/ai-adoption-evidence.astro');
  const close = s.match(/<section class="ev-close" aria-labelledby="ev-close-h">[\s\S]*?<\/section>/);
  const words = s.match(/const closing = \{[\s\S]*?\};/)[0];
  assert.ok(close);
  assert.match(close[0], /<h2 id="ev-close-h">[\s\S]*<div class="cta-row">/);
  assert.match(close[0], /<a class="link-arrow" href="\/fractional\/"><span>\{closing\.link\}<\/span><\/a>/);
  assert.ok(words.includes("link: 'See how fractional work runs'"));
  assert.ok(order(close[0], 'link-arrow', 'btn-primary') && close[0].match(BOOK)[0].includes('Book a free call'));
  assert.match(close[0].match(BOOK)[0], SAYS_NEW_TAB);
  assert.ok(order(s, 'class="ev-grid"', '<RelatedReading', 'class="ev-close"'));
  assert.ok(!close[0].includes('—') && !words.includes('—'), 'no em dashes');
});

// #71: one primary action above the fold, and it is the tracked form.
test('/ai-pilot-to-production/ head has one action, to the form that carries this page as source', () => {
  const s = read('src/pages/ai-pilot-to-production.astro');
  const head = s.slice(s.indexOf('<header class="page-head">'), s.indexOf('</header>'));
  assert.equal((head.match(/<a /g) || []).length, 1);
  assert.match(head, /<a class="btn-primary" href="#contact-section">/);
  assert.match(s, /<section class="contact-form-section" id="contact-section"/);
  assert.match(s, /<ContactForm source="ai-pilot-to-production"/);
});

test('/fractional/ has the booking button right after the lede, before the problem lines', () => {
  const s = read('src/pages/fractional.astro');
  const lede = s.match(/<p class="lede">[\s\S]*?<\/p>/), book = s.match(BOOK);
  assert.ok(book[0].includes('Book a free call'));
  assert.match(book[0], SAYS_NEW_TAB);
  assert.equal(s.slice(lede.index + lede[0].length, book.index).replace('<div class="cta-row">', '').trim(), '');
  assert.ok(book.index < s.indexOf('class="problem-lines"'));
});

test('/fractional/ and /forward-deployed/ link Cazoo to its study, which is open', () => {
  assert.doesNotMatch(read('src/content/case-studies/cazoo.md').split('---')[1], /^locked:/m);
  for (const p of ['fractional', 'forward-deployed']) assert.ok(read(`src/pages/${p}.astro`).includes('<a href="/case-studies/cazoo/">Cazoo</a>'), p);
});

test('/interim-cpo/: title, H1, booking under the lede, form preselects Interim cover', () => {
  const s = read('src/pages/interim-cpo.astro'), frac = read('src/pages/fractional.astro');
  // The name suffix is read from /fractional/, so release text never spells the name.
  assert.equal(s.match(/title="([^"]+)"/)[1], `Interim CPO UK | ${frac.match(/title="[^"|]*\| ([^"]+)"/)[1]}`);
  assert.match(s, /<h1>Interim CPO for UK companies<\/h1>/);
  assert.match(s, /<p class="lede">[\s\S]*?<\/p>\s*<div class="cta-row">\s*<a class="btn-primary" href=\{BOOKING_URL\}[^>]*>Book a free call/);
  assert.match(s, /<ContactForm[^>]*selected="interim"/);
  assert.match(read('src/components/ContactForm.astro'), /\['interim', 'Interim cover'\]/);
  assert.match(frac, /<ContactForm[^>]*selected="fractional"/);
  assert.match(read('src/pages/contact.astro'), /<ContactForm[^>]*selected="other"/);
  assert.ok(frac.includes('href="/interim-cpo/"'));
  assert.ok(!read('astro.config.mjs').includes('interim-cpo'), 'sitemap filter keeps the page');
});

test('/interim-cpo/: only published figures, full-time pricing from rates.ts, no em dashes', () => {
  const s = read('src/pages/interim-cpo.astro');
  assert.ok(!s.includes('—') && !s.includes('data/positioning') && !s.includes('80%'));
  const published = read('src/pages/for-advisors.astro') + read('src/pages/fractional.astro');
  for (const fig of ['450 per cent in 90 days', '3.2x return on investment']) assert.ok(s.includes(fig) && published.includes(fig), fig);
  assert.match(s, /jsonLd=\{\[serviceSchema, faqSchema\]\}/);
  assert.match(s, /'@type': 'Service'[\s\S]*price: rates\.interim/);
  assert.ok(!s.includes('fractionalMonthly'), 'interim is full time: no part-time monthly prices');
});

test('home: case studies sit between offers and projects; headline unchanged', () => {
  const s = read('src/pages/index.astro');
  assert.ok(order(s, 'id="offers-h"', 'id="studies-h"', 'id="built-h"'));
  assert.match(s, /href="\/case-studies\/"><span>All case studies<\/span>/);
  // The id is the headline test's hook; the served text (what crawlers read) stays this.
  assert.match(s, /<p id="hero-h1" class="hero-title">I speak <em>four<\/em> languages: design, product, data&nbsp;&amp;&nbsp;AI\.<\/p>/);
});

test('case study: open studies get the subscribe card after the body, then a booking link; locked ones neither', () => {
  const s = read('src/pages/case-studies/[slug].astro');
  // Only the template's `locked ? (...) : (...)` switch; the import above it is not a render.
  const [locked, open] = s.slice(s.indexOf('locked ? (')).split(/\)\s*:\s*\(/);
  for (const a of ['source="case-study"', 'campaign={study.id}', 'heading="Results start as decisions"',
    'sub="Follow the reasoning behind them, one letter at a time."', 'buttonLabel="Follow along"']) assert.ok(open.includes(a), a);
  assert.ok(order(open, '<Content />', '<FrameSubscribe'));
  assert.match(open.slice(open.indexOf('<FrameSubscribe')), /<\/section>\s*<p class="cs-book">\s*<a class="link-arrow" href=\{BOOKING_URL\}[^>]*><span>Book a free call<\/span>/);
  assert.ok(s.includes('noindex={locked}') && locked.includes('cs-lock') && !locked.includes('FrameSubscribe'));
});

test('header: Services, Resources and links in order; Work with me to /contact/; disclosure panels', () => {
  const s = read('src/components/Header.astro');
  const hrefs = (from, to) => [...s.slice(s.indexOf(from), s.indexOf(to)).matchAll(/href: '([^']+)'/g)].map((m) => m[1]);
  assert.deepEqual(hrefs('const services', 'const resources'), ['/fractional/', '/forward-deployed/', '/workshops/', '/keynote-speaker/', '/office-hours/']);
  assert.deepEqual(hrefs('const resources', 'const groups'), ['/case-studies/', '/tools/', '/speaking/']);
  assert.deepEqual(hrefs('const links', 'const here'), ['/writing/', '/projects/', '/about/']);
  assert.match(s, /href: '\/workshops\/', label: 'Workshops'/);
  assert.match(s, /<a class="btn-primary nav-cta" href="\/contact\/"/);
  assert.match(s, /\{ id: 'services', label: 'Services'[\s\S]*\{ id: 'resources', label: 'Resources'/);
  assert.match(s, /class="nav-services-toggle"[\s\S]*?aria-expanded="false"[\s\S]*?aria-controls=\{`nav-\$\{g\.id\}-panel`\}/);
  assert.match(s, /id=\{`nav-\$\{g\.id\}-panel`\}/);
  const footer = read('src/components/Footer.astro');
  assert.ok(footer.includes('href="/guides/"') && footer.includes('href="/media-kit/"'), 'footer carries Guides and Media kit');
});
