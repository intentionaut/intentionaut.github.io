# intentionaut — agent notes

## Writing style (Saielle's voice)

- Short sentences. Prefer commas, colons, semicolons and periods.
- Never use em dashes in prose or titles.
- Plain language: aim for reading ease 60+, grade level ~8 or below on main pages.
- Keep the dry wit and concrete detail; simplify structure, not substance.

## Newsletter posts (beehiiv)

- **Never publish a blank public page.** If a post is email-only, or beehiiv
  serves it with its web body gated, it gets no page and no archive row. It must
  not exist as a URL rather than exist as an empty one.
- `hasWebBody` in `src/lib/beehiiv.ts` is the single check. The archive listing
  and the page generation both ask it, so the two cannot disagree about what
  exists.
- The build names every post it skipped, and why. Ungating a post in beehiiv
  brings back its page and its row on the next build, with no code change.
- Email-only content stays out of the web render generally, not just as pages.
  The letter footer is stripped from essay pages for the same reason: it asks
  the reader to forward the letter, which only makes sense in an inbox.

## Commands

- `npm run build` — production build to `dist/` (run before pushing)

## Project pages

- Follow the template in `src/content/projects/_template.md`: The Problem, The Bet, Under the Hood, Outcomes, Why it Matters.
- Files starting with `_` are templates; the content glob excludes them (see `src/content.config.ts`).
- Executive summary register: show the levels the work spans; never claim solo heroics.

## SEO and markup changes

- Changing a tag (h1, p, h2) changes its look when CSS styles by tag. #361
  made the home headline a `<p>` and it lost its typeface and spacing.
- `tests/type-guard.test.mjs` pins the computed type and spacing of every
  page's header block (.hero, .page-head) at 1000px and 1440px, in real
  Chrome, keyed by position, not tag. It runs in `npm test`, the required
  `test` check.
- If it fails, fix the CSS so the page looks as before. Run
  `npm run type-baseline` only when Elle asked for the look to change, and
  put a before/after table in the PR.
- Style by class, not by tag, so tags can change for search without moving
  the design.
- Enforcement: CI blocks accidental drift. Updating the baseline is
  instruction only.
