# SEO / organic search — progress log

Append-only narrative. Newest entry at the bottom. Keeps the wrong turns and
the numbers that `README.md` prunes.

Goal behind the work: make intentionaut.com the site that shows up (and
converts) when a hiring team or executive-search consultant looks Saielle up,
and rank for the buyer-education queries that feed fractional/advisory work and
signal Director+ seniority.

---

## 2026-08-28 — Phases 0–2 (branch `seo-phases-0-2`)

Context gathered first: live site behind Cloudflare returns 200 to Googlebot
and Bingbot (checked with UA spoofing), so no crawl-blocking. `blossomat.work`
no longer resolves — the old-site cannibalisation problem is already gone.
Newsletter moved to `newsletter.intentionaut.com` (beehiiv custom domain);
`saielle.beehiiv.com` 301s there.

Name-search reality check (WebSearch "Saielle DaSilva product leader"): page one
is Mind the Product, Turing Fest, One Knight in Product, ProdPad. intentionaut.com
does not appear. New domain, no authority yet. MTP profile is under the
old-name slug `eli-silva` and now 404s (both `/profile/` and `/author/`).

### Done in this branch

**Phase 0 — consolidate / crawl**
- `public/robots.txt`: sitemap pointer was `…/sitemap.xml` (404). Fixed to
  `…/sitemap-index.xml` (the file Astro's sitemap integration actually emits).

**Phase 1 — entity legibility (structured data)**
- `src/layouts/BaseLayout.astro`: every page now emits one JSON-LD `@graph`
  with stable `Person` (`#person`), `Organization` (`#organization`,
  Intentionaut Ltd), `WebSite` (`#website`) nodes plus a per-page `WebPage`
  node. New optional props: `noindex`, `ogType`, `profilePage`,
  `publishedTime`, `modifiedTime`, `jsonLd` (merges extra nodes into the graph).
  - `Person`: jobTitle "Fractional & Interim Product Leader", `knowsAbout`
    list, `alumniOf` (Sainsbury's, StepStone, Cazoo, Pivotal, Amazon, AT&T —
    all already stated on `/about`), `sameAs` (LinkedIn, Turing Fest speaker
    page, Business of Software speaker page, One Knight in Product episode,
    newsletter). MTP deliberately left out of `sameAs` — the only live URL is
    the old-name slug; add it back once MTP fixes it.
  - `Person.image` deliberately omitted: `public/og.png` is a 1200×630 brand
    card, not a portrait. TODO: add a real headshot + set `Person.image`.
  - `Organization.logo` → `/favicon.svg`.
- `/about` passes `profilePage` → WebPage node becomes `["WebPage","ProfilePage"]`
  with `mainEntity` → Person.
- `src/pages/writing/[slug].astro`: adds `BlogPosting` + `BreadcrumbList` nodes
  and `og:type=article` + `article:published_time` for both beehiiv posts and
  local essays. Author → `#person`, publisher → `#organization`.
- `src/pages/faq.astro`: migrated its hand-rolled `<script slot="head">` to the
  new `jsonLd` prop so there is one graph per page. FAQPage schema unchanged.

**Phase 2 — duplicate content / crawl hygiene**
- `/draft/*` (reworked versions of published essays): now `noindex, follow`
  and excluded from the sitemap via `sitemap({ filter })` in
  `astro.config.mjs`. Still crawlable and linked for readers. Verified: no
  `/draft` URLs in `dist/sitemap-0.xml`.
- `astro.config.mjs`: `trailingSlash: 'always'`.
- Internal links normalised to trailing slashes: `Header.astro`, `Footer.astro`,
  `index.astro`, `writing.ts` (data), and the `/faq` + back-links in
  `execution`, `strategic-direction`, `404`, `mentoring`, `fractional`,
  `draft/*`, `writing/[slug]`, `projects/[slug]`.
  - `speaker.astro` skipped on purpose: it has unrelated uncommitted WIP
    (rates wiring). One bare `/faq` link left there — sweep it when that WIP
    lands.

Build green (`npm run build`, 51 pages). Verified in `dist/`: schema types per
page, robots meta on drafts only, canonical URLs, `og:type`, sitemap contents.

### Not done / deferred

- **Beehiiv canonical URLs** (Phase 0): must be set in the beehiiv app
  (Post → SEO → canonical URL) to `https://intentionaut.com/writing/<slug>/`
  for every post, back-catalogue included. Can't do from this repo. Make it a
  publish-checklist step.
- **Google Search Console + Bing Webmaster Tools** (Phase 0): needs Saielle's
  accounts + a DNS TXT record. Verify domain, submit `sitemap-index.xml`,
  request indexing for `/`, `/about/`, `/fractional/`.
- **Email Mind the Product** to fix the `eli-silva` profile slug / display
  name, then add the corrected URL to `Person.sameAs`.

### Flags found, not fixed (out of phase scope)

- Article pages render two `<h1>`s (page header + an `<h1>` inside the imported
  beehiiv body). `stripBeehiivHtml` should demote headings one level. Phase 5.
- No per-article OG image; no font preload; article `<img>` tags have no
  width/height/lazy. Phase 5.

### 2026-08-28 (later) — follow-ups before merge

- **Headshot added.** Saielle sent a portrait (iPhone, only a 360×480
  derivative was reachable on disk — low-res but she okayed it). Saved to
  `public/saielle-dasilva.jpg`, EXIF/APP segments stripped (no PIL/exiftool on
  the box; did it with a small JPEG-marker script). Wired into `Person.image`
  as an `ImageObject` and shown on `/about` in a framed portrait matching the
  site's `.img-card` double-border style. TODO: swap in a higher-res version.
- **Archive dates corrected.** `writing.ts` had the 2026 Intentionaut posts
  under invented 2026 dates + `dateLabel: '2026'`. Pulled the real
  `publish_date` from the beehiiv API and set them: Aug–Oct 2025. Dropped the
  now-redundant `dateLabel`, so the archive shows real "Mon YYYY".
- Note: `the-ai-opportunity-you-re-missing` (beehiiv, 2025-09-23) has a built
  page + sitemap entry but no `writing.ts` archive row — looks like a
  deliberate omission by Saielle, left as-is.
- Merged to `main` and pushed → GitHub Pages deploy.
