# intentionaut.com

Personal site of Saielle DaSilva — product leader across design, data & AI.

## Stack

- [Astro](https://astro.build) — static site generator
- [GitHub Pages](https://pages.github.com) — hosting (deploys on every push to `main` via GitHub Actions)
- [PagesCMS](https://pagescms.org) — git-based CMS for editing content & uploading photos
- Fonts self-hosted via Fontsource (Fraunces + Inter)

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
- Writing/Substack link → `src/pages/writing.astro` (`substackUrl`)
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

- [ ] Replace sample talk in `src/content/talks/` with real ones (via CMS)
- [ ] Personalize About story (via CMS) — current text is a strong draft
- [ ] Confirm Substack URL in `src/pages/writing.astro`
- [ ] Set up email forwarding for `hello@intentionaut.com` (GoDaddy → Email Forwarding → forward to your real inbox)
- [x] Email decided: `hello@intentionaut.com` (spelling-proof, on-brand)
- [ ] Confirm LinkedIn URL (`saielle-dasilva`) in Header/Footer/Contact
- [ ] Point DNS records above, then enforce HTTPS
- [ ] Add an og-image (`public/og.png`) for nicer link previews
