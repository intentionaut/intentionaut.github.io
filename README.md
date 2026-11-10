# intentionaut.com

Source for [intentionaut.com](https://intentionaut.com) - the personal site of Saielle DaSilva, product leader across design, data and AI. Fractional CPO work, case studies, talks and writing.

Built with [Astro](https://astro.build) and deployed to GitHub Pages on every push to `main`. Fonts are self-hosted via Fontsource (Fraunces, Jost).

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server at localhost:4321 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |
| `npm test` | Run the test suite (`tests/`) |

## Layout

- `src/pages/` - routes (Astro pages)
- `src/content/` - case studies and talks (Astro content collections)
- `src/layouts/`, `src/styles/` - shared layout; colours and typography as CSS variables
- `public/` - static assets, including the og-image
- `scripts/` - build-time tooling (see "Private case studies")
- `tests/` - Node test suite (`node --test`)

## Private case studies

Some case studies are private. `scripts/lock-case-study.mjs` encrypts a study's body with AES-GCM and commits only the ciphertext; the key travels in the link's URL fragment (`#k=...`) and is never sent to the server. Locked pages are `noindex` and excluded from the sitemap. Plaintext sources stay outside this repo.

## License

(c) Saielle DaSilva, all rights reserved.
