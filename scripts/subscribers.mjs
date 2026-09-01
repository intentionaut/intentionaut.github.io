#!/usr/bin/env node
/**
 * Where the list came from, in one command.
 *
 * Growth Plan action 1.1's finish line is "a new subscriber's source is visible
 * without reading raw API output". This is that. It reads every subscription,
 * groups it, and prints the breakdown.
 *
 *   npm run subscribers            the whole list
 *   npm run subscribers -- --days 30   only people who joined in the last 30 days
 *
 * Read-only. It never writes to beehiiv.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUB_ID = 'pub_96b7bfbb-25ad-448f-a8e8-b4d61019e30d';

function apiKey() {
  if (process.env.BEEHIIV_API_KEY) return process.env.BEEHIIV_API_KEY;
  try {
    const env = readFileSync(join(ROOT, '.env'), 'utf8');
    const line = env.split('\n').find((l) => l.startsWith('BEEHIIV_API_KEY='));
    if (line) return line.slice('BEEHIIV_API_KEY='.length).trim();
  } catch {
    /* fall through to the error below */
  }
  console.error(
    'No BEEHIIV_API_KEY found, in the environment or in .env at the repo root.'
  );
  process.exit(1);
}

const daysFlag = process.argv.indexOf('--days');
const days = daysFlag !== -1 ? Number(process.argv[daysFlag + 1]) : null;
const since = days ? Date.now() / 1000 - days * 86400 : null;

async function fetchAll(key) {
  const all = [];
  let page = 1;
  for (;;) {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions` +
        `?limit=100&page=${page}&expand=stats`,
      { headers: { Authorization: `Bearer ${key}` } }
    );
    if (!res.ok) {
      console.error(`beehiiv returned ${res.status}: ${await res.text()}`);
      process.exit(1);
    }
    const { data, total_pages: totalPages } = await res.json();
    all.push(...data);
    if (!totalPages || page >= totalPages) break;
    page += 1;
  }
  return all;
}

/**
 * An unset tag is not the same fact as a tag that says "website", so they are
 * never merged. "(not recorded)" means this person signed up before the tag
 * existed, or through a path that does not set it, and that gap is itself
 * worth seeing.
 */
const tag = (v) => (v && String(v).trim() ? String(v).trim() : '(not recorded)');

function group(rows, key) {
  const counts = new Map();
  for (const r of rows) counts.set(tag(r[key]), (counts.get(tag(r[key])) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function table(title, rows, total) {
  console.log(`\n${title}`);
  console.log('-'.repeat(title.length));
  if (!rows.length) {
    console.log('  nothing yet');
    return;
  }
  const width = Math.max(...rows.map(([label]) => label.length));
  for (const [label, count] of rows) {
    const pct = ((count / total) * 100).toFixed(0).padStart(3);
    const bar = '#'.repeat(Math.round((count / total) * 28));
    console.log(`  ${label.padEnd(width)}  ${String(count).padStart(4)}  ${pct}%  ${bar}`);
  }
}

const key = apiKey();
let subs = await fetchAll(key);

const active = subs.filter((s) => s.status === 'active');
if (since) subs = subs.filter((s) => Number(s.created) >= since);

const scope = days ? `joined in the last ${days} days` : 'the whole list';
console.log(`\nIntentionaut subscribers: ${scope}`);
console.log(`${subs.length} in scope. ${active.length} active on the list overall.`);

if (!subs.length) {
  console.log('\nNobody in that window.\n');
  process.exit(0);
}

table('Where they came from (utm_source)', group(subs, 'utm_source'), subs.length);
table('How they arrived (utm_medium)', group(subs, 'utm_medium'), subs.length);
table('Which piece earned it (utm_campaign)', group(subs, 'utm_campaign'), subs.length);
table('Referring site', group(subs, 'referring_site'), subs.length);

const recent = [...subs].sort((a, b) => Number(b.created) - Number(a.created)).slice(0, 10);
console.log('\nMost recent 10');
console.log('--------------');
for (const s of recent) {
  const when = new Date(Number(s.created) * 1000).toISOString().slice(0, 10);
  console.log(
    `  ${when}  ${tag(s.utm_source).padEnd(18)} ${tag(s.utm_medium).padEnd(12)} ${tag(s.utm_campaign)}`
  );
}
console.log('');
