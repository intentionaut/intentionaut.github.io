// Helpers for /ai-adoption-evidence/. Plain JS so `npm test` can import it.

export const TOPICS = {
  value: 'Value realised',
  depth: 'Usage depth',
  readiness: 'Readiness',
  failure: 'Project failure',
};
export const SOURCE_TYPES = { government: 'Government', analyst: 'Analyst', vendor: 'Vendor' };
export const REGIONS = { uk: 'UK', global: 'Global', unstated: 'Not stated by source' };
export const MAX_CARDS = 8;
export const STALE_MONTHS = 6;

/** Newest first. Dates are ISO, possibly month-only ("2026-01"), so string order works. */
export function sortNewestFirst(cards) {
  return [...cards].sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));
}

/** True when `reviewed` (YYYY-MM-DD) is more than STALE_MONTHS before `now`. */
export function isStale(reviewed, now = new Date()) {
  const cutoff = new Date(now);
  cutoff.setMonth(cutoff.getMonth() - STALE_MONTHS);
  return new Date(reviewed) < cutoff;
}

/** Returns a list of problems; empty means the data is sound. */
export function validate(data) {
  const errs = [];
  const need = ['id', 'topic', 'sourceType', 'region', 'kind', 'figure', 'base', 'publisher', 'title', 'published', 'publishedLabel', 'reviewed', 'url'];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.lastChecked ?? '')) errs.push('lastChecked must be YYYY-MM-DD');
  if (data.cards.length > MAX_CARDS) errs.push(`more than ${MAX_CARDS} cards`);
  const ids = new Set();
  for (const c of data.cards) {
    for (const k of need) if (!c[k] || typeof c[k] !== 'string') errs.push(`${c.id ?? '?'}: missing ${k}`);
    if (ids.has(c.id)) errs.push(`${c.id}: duplicate id`);
    ids.add(c.id);
    if (!(c.topic in TOPICS)) errs.push(`${c.id}: unknown topic ${c.topic}`);
    if (!(c.sourceType in SOURCE_TYPES)) errs.push(`${c.id}: unknown sourceType ${c.sourceType}`);
    if (!(c.region in REGIONS)) errs.push(`${c.id}: unknown region ${c.region}`);
    if (!/^https:\/\//.test(c.url ?? '')) errs.push(`${c.id}: url must be https`);
    if (!/^\d{4}-\d{2}(-\d{2})?$/.test(c.published ?? '')) errs.push(`${c.id}: bad published date`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(c.reviewed ?? '')) errs.push(`${c.id}: bad reviewed date`);
  }
  return errs;
}
