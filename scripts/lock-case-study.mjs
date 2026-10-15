#!/usr/bin/env node
// Locks a case study behind a private link.
//
//   node scripts/lock-case-study.mjs <path/to/slug.md>
//
// The source .md lives OUTSIDE this repo (the private prototype). This repo is
// public, so the readable text must never be written here. The script:
//   1. refuses a source inside this repo, a body still carrying an
//      <mark class="ask"> (unfinished pages don't ship, locked or not), and
//      images (they would sit in public/ unencrypted);
//   2. asks for the current link, hidden. Paste it to keep the key (for an
//      edit), or press Enter for a new key (first lock, or a rotation);
//   3. renders the body the way Astro does and writes
//      public/case-studies/<slug>/locked.json (ciphertext only) and
//      src/content/case-studies/<slug>.md (front matter, locked: true, no
//      body, no sources);
//   4. decrypts what it wrote and compares, and deletes both files if they
//      don't round-trip;
//   5. prints the link to send. The key is never written to disk.
//
// A new key means old links stop opening the current page. The old ciphertext
// stays in git history, and an old link still opens that old version.

import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { keyFromLink, lock, newKey, unlock } from '../src/lib/case-lock.js';

const SITE = 'https://intentionaut.com';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fail = (msg) => {
  console.error(`lock-case-study: ${msg}`);
  process.exit(1);
};

const src = process.argv[2] && resolve(process.argv[2]);
if (!src || !src.endsWith('.md')) fail('usage: node scripts/lock-case-study.mjs <path/to/slug.md>');
if (!relative(repo, src).startsWith('..')) fail(`${src} is inside this public repo. Lock from the private copy.`);

const slug = basename(src, '.md');
const raw = readFileSync(src, 'utf8');
const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
if (!m) fail('no front matter found');
const [, front, body] = m;
if (!body.trim()) fail('the body is empty');
if (/<mark class="ask">/.test(body)) fail('the body still has <mark class="ask"> questions. Finish the page first.');
// Images sit in public/ as plain files, readable by anyone. Not supported yet.
if (/<img\b|!\[[^\]]*\]\(/.test(body)) fail('the body has images, which would be public. Locking images is not supported yet.');

// Public front matter: drop sources (the public template never shows them) and
// any existing locked line, then add locked: true.
const lines = front.split('\n');
const kept = [];
for (let i = 0; i < lines.length; i++) {
  if (/^sources:/.test(lines[i])) {
    while (i + 1 < lines.length && /^\s+-/.test(lines[i + 1])) i++;
    continue;
  }
  if (/^locked:/.test(lines[i])) continue;
  kept.push(lines[i]);
}
kept.push('locked: true');

const askHidden = async (prompt) => {
  if (!process.stdin.isTTY) fail('run this in a terminal; a link is pasted, never passed in.');
  process.stdout.write(prompt);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  let value = '';
  return new Promise((done) => {
    // Characters arrive in chunks (a paste is one chunk), so walk each one.
    const onData = (chunk) => {
      for (const ch of chunk) {
        if (ch === '\r' || ch === '\n') {
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdin.off('data', onData);
          process.stdout.write('\n');
          return done(value);
        } else if (ch === '\u0003') {
          process.stdout.write('\n');
          process.exit(130);
        } else if (ch === '\u007f') {
          value = value.slice(0, -1);
        } else {
          value += ch;
        }
      }
    };
    process.stdin.on('data', onData);
  });
};

const pasted = (await askHidden(`Current link for ${slug} (paste it to keep it, or press Enter for a new one): `)).trim();
const key = pasted ? keyFromLink(pasted) : newKey();
if (!key) fail("that doesn't look like a case study link (no #k=...). Nothing was written.");

// Astro's own markdown pipeline with its defaults (GFM, smart quotes), so the
// unlocked page reads like every other case study.
const md = await createMarkdownProcessor();
const { code: html } = await md.render(body);

const jsonPath = resolve(repo, 'public/case-studies', slug, 'locked.json');
const mdPath = resolve(repo, 'src/content/case-studies', `${slug}.md`);
mkdirSync(dirname(jsonPath), { recursive: true });
writeFileSync(jsonPath, JSON.stringify(await lock(html, key)) + '\n');
writeFileSync(mdPath, `---\n${kept.join('\n')}\n---\n`);

// Validate what was written, from disk, before calling it done.
const back = JSON.parse(readFileSync(jsonPath, 'utf8'));
const ok = (await unlock(back, key).catch(() => null)) === html;
const leaked = readFileSync(mdPath, 'utf8').includes(body.trim().slice(0, 80));
if (!ok || leaked) {
  rmSync(jsonPath, { force: true });
  rmSync(mdPath, { force: true });
  fail(ok ? 'readable text reached the public .md; removed both files' : "the ciphertext didn't round-trip; removed both files");
}

console.log(`Locked ${slug}${pasted ? ' with the same key. Existing links keep working.' : ' with a new key. Older links no longer open it.'}`);
console.log(`  ${relative(repo, jsonPath)}  (encrypted)`);
console.log(`  ${relative(repo, mdPath)}  (front matter only, locked: true)`);
console.log('');
console.log('The link to send (keep it in your password manager; it is not saved anywhere):');
console.log(`  ${SITE}/case-studies/${slug}/#k=${key}`);
