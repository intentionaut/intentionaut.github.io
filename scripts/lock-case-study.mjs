#!/usr/bin/env node
// Locks case studies behind one private link. Every locked page shares the
// same key, so one link opens them all.
//
//   node scripts/lock-case-study.mjs <path/to/slug.md> [<path/to/other.md> ...]
//
// The source .md files live OUTSIDE this repo (the private prototype). This
// repo is public, so the readable text must never be written here.
//
// At the prompt, paste the current link to keep the key (locking a new page,
// or re-locking one after an edit), or press Enter for a new key (the first
// lock ever, or a rotation). The key is never written to disk.
//
// Two rules keep the key universal, and the script enforces both:
//   - a pasted link must open every page already locked; a mistyped or old
//     link is refused before anything is written;
//   - a new key must re-lock every locked page in the same run, so no page is
//     left on the old key. Name all their source files.
//
// After a rotation, old links stop opening the current pages. Old ciphertext
// stays in git history, and an old link still opens those old versions.

import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { keyFromLink, lock, newKey, unlock } from '../src/lib/case-lock.js';

const SITE = 'https://intentionaut.com';
const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = resolve(repo, 'src/content/case-studies');
const jsonFor = (slug) => resolve(repo, 'public/case-studies', slug, 'locked.json');
const mdFor = (slug) => resolve(contentDir, `${slug}.md`);
const fail = (msg) => {
  console.error(`lock-case-study: ${msg}`);
  process.exit(1);
};

const srcs = process.argv.slice(2).map((p) => resolve(p));
if (!srcs.length || srcs.some((s) => !s.endsWith('.md'))) {
  fail('usage: node scripts/lock-case-study.mjs <path/to/slug.md> [<path/to/other.md> ...]');
}

// Read and check every source before asking for anything.
const pages = srcs.map((src) => {
  if (!relative(repo, src).startsWith('..')) fail(`${src} is inside this public repo. Lock from the private copy.`);
  const slug = basename(src, '.md');
  const m = readFileSync(src, 'utf8').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) fail(`${slug}: no front matter found`);
  const [, front, body] = m;
  if (!body.trim()) fail(`${slug}: the body is empty`);
  if (/<mark class="ask">/.test(body)) fail(`${slug}: the body still has <mark class="ask"> questions. Finish the page first.`);
  // A local image would sit in public/ as a plain file, readable by anyone, so
  // only images already public elsewhere (an https URL) may appear. Same for
  // an iframe: an embed from another site, never a page of this one.
  const srcs = [
    ...[...body.matchAll(/<(?:img|iframe|source|video)\b[^>]*\bsrc="([^"]*)"/g)].map((m) => m[1]),
    ...[...body.matchAll(/!\[[^\]]*\]\(([^)\s]*)/g)].map((m) => m[1]),
  ];
  const local = srcs.filter((u) => !/^https:\/\//.test(u));
  if (local.length) fail(`${slug}: these would be public, unencrypted files: ${local.join(', ')}. Only images and embeds already public elsewhere (https) can go on a locked page.`);

  // Public front matter: drop sources (the public template never shows them)
  // and any existing locked line, then add locked: true.
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
  return { slug, body, front: kept.join('\n') };
});
if (new Set(pages.map((p) => p.slug)).size !== pages.length) fail('the same page is named twice');

// Pages already locked in this repo, from their front matter.
const lockedNow = readdirSync(contentDir)
  .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  .filter((f) => /^locked:\s*true\s*$/m.test(readFileSync(resolve(contentDir, f), 'utf8')))
  .map((f) => basename(f, '.md'));
const running = new Set(pages.map((p) => p.slug));
const others = lockedNow.filter((s) => !running.has(s));

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

const pasted = (await askHidden('Current private link (paste it to keep the key, or press Enter for a new one): ')).trim();
let key;
if (pasted) {
  key = keyFromLink(pasted);
  if (!key) fail("that doesn't look like a private link (no #k=...). Nothing was written.");
  for (const slug of lockedNow) {
    const opens = await unlock(JSON.parse(readFileSync(jsonFor(slug), 'utf8')), key).then(
      () => true,
      () => false,
    );
    if (!opens) fail(`that link doesn't open ${slug}, so it isn't the current key. Nothing was written.`);
  }
} else {
  if (others.length) {
    fail(
      `a new key has to re-lock every locked page, or they'd need different links.\n` +
        `  Also name: ${others.join(', ')} (their .md files in the private copy). Nothing was written.`,
    );
  }
  key = newKey();
}

// Astro's own markdown pipeline with its defaults (GFM, smart quotes), so the
// unlocked pages read like every other case study.
const md = await createMarkdownProcessor();
const touched = []; // { path, before } so a failure puts every file back
for (const page of pages) {
  const { code: html } = await md.render(page.body);
  const jsonPath = jsonFor(page.slug);
  const mdPath = mdFor(page.slug);
  for (const path of [jsonPath, mdPath]) {
    touched.push({ path, before: existsSync(path) ? readFileSync(path) : null });
  }
  mkdirSync(dirname(jsonPath), { recursive: true });
  writeFileSync(jsonPath, JSON.stringify(await lock(html, key)) + '\n');
  writeFileSync(mdPath, `---\n${page.front}\n---\n`);

  // Validate what was written, from disk, before calling it done.
  const ok = (await unlock(JSON.parse(readFileSync(jsonPath, 'utf8')), key).catch(() => null)) === html;
  const leaked = readFileSync(mdPath, 'utf8').includes(page.body.trim().slice(0, 80));
  if (!ok || leaked) {
    for (const { path, before } of touched) {
      if (before) writeFileSync(path, before);
      else rmSync(path, { force: true });
    }
    fail(`${page.slug}: ${ok ? 'readable text reached the public .md' : "the ciphertext didn't round-trip"}. Every file is back as it was.`);
  }
}

const all = [...new Set([...lockedNow, ...running])].sort();
console.log(`Locked ${pages.map((p) => p.slug).join(', ')}${pasted ? ' with the current key. Existing links keep working.' : ' with a new key. Older links no longer open them.'}`);
for (const p of pages) console.log(`  public/case-studies/${p.slug}/locked.json, src/content/case-studies/${p.slug}.md`);
console.log('');
console.log(`One link opens every locked page (${all.join(', ')}).`);
console.log('Keep it in your password manager; it is not saved anywhere:');
console.log(`  ${SITE}/case-studies/#k=${key}`);
console.log('');
console.log('The same #k=... on the end of any locked page works too, e.g.');
console.log(`  ${SITE}/case-studies/${pages[0].slug}/#k=${key}`);
