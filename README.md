# intentionaut.com

Personal site of Saielle DaSilva — product leader across design, data & AI.

## Stack

- [Astro](https://astro.build) — static site generator
- [GitHub Pages](https://pages.github.com) — hosting (deploys on every push to `main` via GitHub Actions)
- [PagesCMS](https://pagescms.org) — git-based CMS for editing content & uploading photos
- Fonts self-hosted via Fontsource: Fraunces (display), Jost (body/UI); Roboto Serif on the contact form

## Commands

| Command         | What it does                    |
| --------------- | ------------------------------- |
| `npm run dev`   | Local dev server at localhost:4321 |
| `npm run build` | Production build into `dist/`   |
| `npm run preview` | Preview the production build  |

## Editing content without code (the easy way)

1. Go to **https://pagescms.org** and sign in with GitHub.
2. Open the `intentionaut.github.io` repo.
3. Edit the **Speaking** talks or the **About** page, upload photos, hit publish.
4. The commit triggers a rebuild — live in ~2 minutes.

## Editing with code

- Homepage hero/lanes copy → `src/pages/index.astro`
- Contact page & rates → `src/pages/contact.astro`
- Writing/Newsletter link → `src/pages/writing.astro`
- Site-wide meta description → `src/layouts/BaseLayout.astro`
- Colors & typography → `src/styles/global.css` (CSS variables at top)
- Talks & About story → `src/content/…` (or use the CMS)

## Custom domain setup (intentionaut.com)

The repo already ships a `CNAME` file. At your domain registrar, add:

**Apex (`intentionaut.com`) — A records:**

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**www — CNAME record:** `intentionaut.github.io`

Then in GitHub: repo **Settings → Pages → Custom domain** → `intentionaut.com`,
and once DNS propagates, tick **Enforce HTTPS**.

## TODO before "done"

- [x] Talks are real (mtpcon keynote, Business of Software ×2, Turing Fest 2021, One Knight in Product); sample removed
- [ ] Personalize About story (via CMS) — current text is a strong draft
- [x] Cloudflare Web Analytics live (token in `BaseLayout.astro`, production-only)
- [x] Confirm newsletter URL in `src/pages/writing.astro` (beehiiv)
- [ ] Set up email forwarding for `hello@intentionaut.com` (GoDaddy → Email Forwarding → forward to your real inbox)
- [x] Email decided: `hello@intentionaut.com` (spelling-proof, on-brand)
- [x] Confirm LinkedIn URL: `/in/intentionaut` in Footer, Contact
- [ ] Point DNS records above, then enforce HTTPS
- [x] Add an og-image (`public/og.png`) for nicer link previews

## Working docs

- `docs/framework.md` — The Intention Test: canonical definition of the shared-understanding framework behind *Impact First Leadership* (work in progress, not published)
