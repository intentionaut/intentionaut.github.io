// Shared helpers for the source-reading tests. Paths are from the repo root.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const read = (p) => readFileSync(p, 'utf8');
export const walk = (dir) =>
  readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
// One entry of src/data/testimonials.ts, from its id to its closing brace.
const data = read('src/data/testimonials.ts');
export const testimonialsSrc = data;
export const testimonial = (id) => data.slice(data.indexOf(`id: '${id}'`), data.indexOf('},', data.indexOf(`id: '${id}'`)));
