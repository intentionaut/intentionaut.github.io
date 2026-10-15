// Private-link lock for case studies. Shared by the browser (the locked page)
// and Node (scripts/lock-case-study.mjs), so the two can never disagree.
//
// The page text is encrypted with a random 256-bit AES-GCM key. The key travels
// only in the link Elle sends, after the # (/case-studies/<slug>/#k=<key>).
// Browsers never send that part to a server, so GitHub and Cloudflare never see
// it, and the ciphertext in this public repo is useless without it. A random
// key can't be guessed, so unlike a password there is no strength to get wrong.
//
// Rotating means locking again with a new key: the current page then needs the
// new link. Old ciphertext stays in git history and the old link still opens
// that old version.
//
// GCM authenticates, so a wrong key or a tampered file fails to decrypt rather
// than producing garbage.

const enc = new TextEncoder();
const dec = new TextDecoder();

// base64url: safe in a URL fragment without escaping.
const toB64 = (bytes) => {
  let s = '';
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const fromB64 = (s) => {
  const b = s.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(b + '='.repeat((4 - (b.length % 4)) % 4)), (c) => c.charCodeAt(0));
};

export const newKey = () => toB64(crypto.getRandomValues(new Uint8Array(32)));

const importKey = (k) => {
  const raw = fromB64(k);
  if (raw.length !== 32) throw new Error('not a 256-bit key');
  return crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
};

export async function lock(html, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await importKey(key), enc.encode(html));
  return { v: 2, alg: 'AES-GCM-256', iv: toB64(iv), ct: toB64(ct) };
}

// Throws on a wrong key or a tampered file.
export async function unlock(box, key) {
  if (box.v !== 2) throw new Error(`unknown lock format v${box.v}`);
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(box.iv) }, await importKey(key), fromB64(box.ct));
  return dec.decode(pt);
}

// The key from a whole link, or from "#k=..." / "k=...", or null.
export const keyFromLink = (s) => s.match(/(?:^|[#&])k=([A-Za-z0-9_-]{43})(?:&|$)/)?.[1] ?? null;
