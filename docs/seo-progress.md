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
- Merged to `main` and pushed → GitHub Pages deploy (live, verified).
- MTP email sent by Saielle 2026-08-28. Recommended contributor bio (pulled
  the old bio off the Wayback Machine and refreshed it):

  > Saielle DaSilva is a product leader who works across design, product, data
  > and AI. She was on the founding team at Cazoo, building the UK's first
  > fully digital car-buying experience through to a $7B IPO, and has since led
  > product and design organisations at StepStone and Sainsbury's, where she
  > took production AI from a handful of experiments to a platform serving
  > millions of customers. Earlier roles include founding hire at Pivotal and
  > early chapters at Amazon and AT&T. She now takes fractional and interim
  > product leadership engagements, writes and speaks about building strong
  > product cultures and hiring for inclusion, and publishes the fortnightly
  > Intentionaut newsletter.

### 2026-08-28 (later still) — beehiiv canonical + Search Console

**Beehiiv canonical URLs — the original plan item was wrong.** Checked the
beehiiv API (`PATCH .../posts/{id}` `seo_settings` only supports
default/og/twitter title+description — no canonical) and beehiiv's own docs +
third-party writeups: **beehiiv has no canonical-URL feature at all**, UI or
API. So there is no "Post → SEO → canonical" step to add.

What beehiiv *does* have: a publication-level **"Discoverable on the web"**
toggle and a per-post **"Search engine indexing"** toggle (Settings → Page
settings). Publication toggle wins — if it's off, everything is noindex.

**Recommended fix (Saielle to action, it's a publication setting):** turn OFF
"Discoverable on the web" so `newsletter.intentionaut.com` stops competing with
`intentionaut.com/writing/` for the same article text. One switch, covers the
back catalogue and every future post, nothing to maintain. Cost: the beehiiv
archive itself won't rank — acceptable, since the newsletter grows by
email/referral/recommendations and intentionaut.com is the search home. The
`/writing/` pages already carry self-canonical + BlogPosting schema and are in
the sitemap, so they become the sole indexable version. As of this writing the
beehiiv posts have no robots/canonical meta — still fully indexable.

**Google Search Console (Saielle to action — needs her Google login).** Recon:
`dig TXT intentionaut.com` already returns
`google-site-verification=uKyxLgcSsXDmfFp7FGeKKaRXVZ2XkjhOS3zbRLrq0Bo`, so the
**domain property is already DNS-verified** (or will verify instantly). Steps:
1. search.google.com/search-console, sign in with the Google account that owns
   it (likely the gmail on file). The `intentionaut.com` domain property should
   be listed / verifiable with no new DNS work.
2. Sitemaps → submit `sitemap-index.xml`.
3. URL Inspection → `https://intentionaut.com/` → Request indexing. Repeat for
   `/about/` and `/fractional/`.
4. Bing: bing.com/webmasters → Import from Google Search Console (one click).

No DNS record for Bing (`msvalidate`) exists yet; the GSC import path avoids
needing one.

Nothing to build for either item — both are external console/settings work.
Live sitemap verified: 38 URLs, 25 `/writing/`, 0 `/draft/`.

### 2026-08-28 (evening) — beehiiv decisions actioned

- Saielle turned **"Discoverable on the web" OFF** in beehiiv. The newsletter
  subdomain is now noindex; `intentionaut.com/writing/` is the sole indexable
  copy of each essay. No canonical needed, no publish-checklist step.
- Newsletter social description: replaced the off-brand auto-generated Twitter
  copy ("insights delivered weekly", em dash, "fast-changing world") with the
  approved Open Graph line across meta / OG / Twitter.
- **`fetchPosts()` now drops `hidden_from_feed` posts** (`src/lib/beehiiv.ts`).
  beehiiv's "hide from feed" = unlisted on the newsletter; we honour the same
  intent so that toggle is the one switch for "is this post public?". Premium
  posts are deliberately NOT filtered — they'd publish with the free/paywalled
  web content, which is the funnel, not a leak (noted in a code comment).
- Tried to unhide `the-ai-opportunity-you-re-missing` via the beehiiv API
  (`PATCH .../posts/{id}` `web_settings.hide_from_feed:false`) — **403
  `SEND_API_NOT_ENTERPRISE_PLAN`**, the update endpoint is max/enterprise only.
  Saielle to toggle "Hide the post from feed" off in the beehiiv post's Web
  settings manually.
- **Push held** until she confirms that toggle: pushing the filter first would
  drop that (currently live, in-sitemap) URL until a later rebuild. With the
  post unhidden first, the filter is a no-op for it and nothing 404s.
- Build with the filter: 50 pages (was 51), 24 `/writing/` sitemap URLs.

Next: SEO Phase 3 — money-page titles + `/fractional` rewrite.
