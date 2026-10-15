// Password lock for case studies. Shared by the browser (the locked page) and
// Node (scripts/lock-case-study.mjs), so the two can never disagree on the
// parameters.
//
// The ciphertext is committed to a public repo, so anyone can copy it and guess
// passwords offline for as long as they like. PBKDF2 makes each guess slow; the
// password's length does the rest. That is why the script refuses short ones.
//
// Format v1: PBKDF2-SHA256 (600,000 iterations, 16-byte salt) derives an
// AES-GCM 256 key; the 12-byte IV is fresh per encryption. GCM authenticates, so
// a wrong password or a tampered file fails to decrypt rather than producing
// garbage.

export const ITERATIONS = 600_000;

const enc = new TextEncoder();
const dec = new TextDecoder();

const toB64 = (bytes) => {
  let s = '';
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s);
};
const fromB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

export async function deriveKey(password, salt, iterations = ITERATIONS) {
  const base = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
    base,
    { name: 'AES-GCM', length: 256 },
    true, // extractable, so the page can keep the key for this tab only
    ['encrypt', 'decrypt'],
  );
}

export async function lock(html, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(html));
  return { v: 1, kdf: 'PBKDF2-SHA256', iterations: ITERATIONS, salt: toB64(salt), iv: toB64(iv), ct: toB64(ct) };
}

export async function keyFor(box, password) {
  if (box.v !== 1) throw new Error(`unknown lock format v${box.v}`);
  return deriveKey(password, fromB64(box.salt), box.iterations);
}

// Throws (OperationError) on a wrong key or a tampered file.
export async function unlockWithKey(box, key) {
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(box.iv) }, key, fromB64(box.ct));
  return dec.decode(pt);
}

export async function unlock(box, password) {
  return unlockWithKey(box, await keyFor(box, password));
}

export const exportKey = async (key) => toB64(await crypto.subtle.exportKey('raw', key));
export const importKey = (b64) =>
  crypto.subtle.importKey('raw', fromB64(b64), { name: 'AES-GCM' }, true, ['decrypt']);
