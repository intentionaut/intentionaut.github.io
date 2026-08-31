# Forward Deployed Product Builder — internal linking and technical SEO

Phase 4, deliverables 4 and 5. Written 31 August 2026. Companion to
`docs/forward-deployed-positioning.md`.

## 1. What was built

| File | URL | Role |
|---|---|---|
| `src/pages/forward-deployed.astro` | `/forward-deployed/` | Pillar. Brand carrier and the page an advisor forwards. |
| `src/pages/ai-pilot-to-production.astro` | `/ai-pilot-to-production/` | Supporting. Problem cluster 1, the best-evidenced one. |
| `src/pages/embedded-or-agency.astro` | `/embedded-or-agency/` | Supporting. Comparison intent. |
| `src/pages/for-advisors.astro` | `/for-advisors/` | Channel page for the actual buyer. Not a ranking page. |
| `src/data/faqs.ts` | `/faq/` and `/forward-deployed/` | Two questions added site-wide, twelve on the pillar. |
| `src/data/rates.ts` | quoted everywhere | `forwardDeployed: 1750`, `scopingBlock: 6000`. |
| `src/pages/contact.astro` | `/contact/` | Fifth rate card, between fractional and speaking. |
| `contact-form/src/index.ts` | worker | Two new topic labels so enquiry emails read properly. |

**Why these three supporting pages and not others.** Workstream A found five
candidate clusters. Cluster 1 (AI pilot stuck) had by far the strongest
evidence and became a page. Cluster 4 (agency comparison) had indirect but
consistent evidence and became a page. Cluster 2 (no senior product
leadership) is deliberately **not** built: `/fractional/` already owns it, and
a second page targeting it would cannibalise the site's main money page.
Cluster 3 (strategy without execution) came back thin, with no buyer-authored
evidence, and `/execution/` is adjacent to it already. Cluster 5 (cost) is
served by the FAQ rather than a page.

`/for-advisors/` is not a query cluster and does not pretend to be. It exists
because the buyer is intermediaries, which the original brief did not assume.
It will get traffic from being sent, not from being found.

## 2. Link map

Every link added, with the paragraph it sits in and its exact anchor text.

**Outbound from the pillar (`/forward-deployed/`)**

| Anchor text | Target | Paragraph it sits in |
|---|---|---|
| fractional and interim leadership | `/fractional/` | "What this is not", second paragraph, immediately after the sentence about prototyping around an absent product leader. Routes the wrong-fit reader out rather than converting them badly. |
| projects page | `/projects/` | "What I have built", second paragraph, after naming Friday, Familiar and Kernic. |
| Read the FAQ. | `/faq/` | Standard house `.faq-link` line under the form. |

**Outbound from `/ai-pilot-to-production/`**

| Anchor text | Target | Paragraph |
|---|---|---|
| forward deployed product building | `/forward-deployed/` | "How it works", first paragraph, where the shape and rates would otherwise be repeated. Deliberately does not restate the price. |
| fractional and interim leadership | `/fractional/` | "How it works", second paragraph, the wrong-fit escape. |

**Outbound from `/embedded-or-agency/`**

| Anchor text | Target | Paragraph |
|---|---|---|
| forward deployed product building | `/forward-deployed/` | "What it costs, both ways", first sentence. |
| fractional and interim leadership | `/fractional/` | "A third answer", the closing paragraph. |

**Outbound from `/for-advisors/`**

| Anchor text | Target | Paragraph |
|---|---|---|
| fractional page | `/fractional/` | "Two shapes I take", first shape. |
| forward deployed page | `/forward-deployed/` | "Two shapes I take", second shape. |
| contact page | `/contact/` | "Commercials", first bullet. |
| forward deployed page / fractional page / projects | `/forward-deployed/`, `/fractional/`, `/projects/` | "What to send your client", one paragraph, three links, each tied to a different client situation. |

**Inbound, still to add**

| From | Anchor text | Where | Status |
|---|---|---|---|
| `/contact/` | the rate card itself | Rate card 2 of 5 | **Done** |
| `/fractional/` | forward deployed product building | New closing paragraph under "How it works": the reader who wants building rather than leadership | **Not done.** Needs Saielle's sign-off, because it puts a competing option on her main money page. Recommended, but her call. |
| `/projects/familiar/` | (see linking decision below) | | Not done |

## 3. The "Taking a spell" link, and why it only runs one way

The article is `04-Projects/Writing/2026-08-30-familiar/draft.md` in the Dex
vault, publishing 3 September 2026 and mirroring to
`/writing/taking-a-spell/` (slug to confirm at publication).

**Pillar to article: yes.** The essay contains the single best piece of
evidence the offering has. This passage:

> "Between a sleepless night and dinner, working beside the machine: the tool
> itself, seven stages of it. A public repo with a licence and a changelog. A
> page on my site telling its story... The catch, and there is one, is that
> the speed only worked because every gate stopped the machine and made me
> decide."

That is the offering's whole thesis in the writer's own voice: fast building,
gated by forced human decisions. It is more persuasive than anything the
sales page can assert about itself.

Add to `/forward-deployed/`, in the "Where you can see the work" section,
after the sentence naming Familiar:

> anchor text: **an account of the day it was built**
> target: `/writing/taking-a-spell/`

**Article to pillar: no. I recommend against it, and the reason is the
article's own argument.**

The essay is about wanting help without letting a machine think for you, and
about reading every line you put your name to. Its closing move is an
invitation to the reader to reply. Dropping a link to a page selling embedded
delivery into that would be a non-sequitur to a reader, and it would do the
exact thing the piece criticises: taking something that was made carefully and
quietly repurposing it into something that sells. The essay's "who this is
for" is vibe coders and creators, not people commissioning product work. They
are not the same audience and pretending otherwise is visible.

**What to do instead.** Once the essay is live, add it to the projects entry
for Familiar as a "how it was built" link. Readers who arrive at the essay and
want to know who wrote it already have the site header, the footer and the
author identity in the schema. That is enough. If a commercial link ever
belongs in that piece, it belongs on a future essay written about client work,
not this one.

I am flagging this as a disagreement with the brief, which asked for
bidirectional links. One direction is honest and I have specified it. The
other is not, so I have not written it.

## 4. Technical SEO

### `/forward-deployed/`

- **Title:** Forward Deployed Product Building | Saielle DaSilva
- **Meta:** Embedded product building for teams that cannot get a working version of the idea in front of anyone: three days a week in your environment, prototyping on your problems, ending in a proof of concept your team can carry.
- **Slug:** `/forward-deployed/` — short, memorable, pasteable into an email. Chosen over a keyword slug on purpose, because this page's job is forwarding rather than ranking.
- **H1:** Someone who builds it, not just decides what to build.
- **H2s:** Sound familiar? / What I do / What you get / How it works / What this is not / Where you can see the work / Fair questions. / Let's talk.
- **H3s:** the twelve FAQ questions.
- **Schema:** `Service` with an `Offer` (GBP 1750, unit day, LimitedAvailability) plus `FAQPage` with all twelve, merged into the site `@graph`. Verified in `dist/`.

### `/ai-pilot-to-production/`

- **Title:** From an AI Pilot to a Working Product | Saielle DaSilva
- **Meta:** For teams whose AI pilot proves something in a notebook and nothing in production: embedded product building that gets a working version running against your real data and your real constraints.
- **Slug:** `/ai-pilot-to-production/` — problem language, matches how the cluster is described in the wild.
- **H1:** Your AI pilot works. It never became a product.
- **H2s:** Sound familiar? / What is in the way / What I do about it / What you get / How it works / Let's talk.
- **Schema:** site `@graph` only. No `Service` node: the service is the pillar's, and two `Service` nodes for one offering would be a duplicate-entity problem.

### `/embedded-or-agency/`

- **Title:** Embedded Product Builder or Agency? | Saielle DaSilva
- **Meta:** How to choose between hiring an agency and embedding one senior product builder in your team, including the cases where the agency is the right answer.
- **Slug:** `/embedded-or-agency/`
- **H1:** One builder inside your team, or an agency around it.
- **H2s:** When an agency is the right answer / When one embedded builder is the right answer / What is different in practice / What it costs, both ways / A third answer / Let's talk.
- **Schema:** site `@graph` only.

### `/for-advisors/`

- **Title:** For Advisors & Recruiters | Saielle DaSilva
- **Meta:** For startup advisors and recruiters placing fractional and interim product people: what Saielle DaSilva does, the two engagement shapes, availability, rates and what to send a client.
- **Slug:** `/for-advisors/`
- **H1:** If you place product people, here is the short version.
- **H2s:** What I am / Two shapes I take / What I am not right for / Commercials / What to send your client / Let's talk.
- **Schema:** site `@graph` only.

### Publishing constraints

The brief's example constraint was "can add JSON-LD; cannot change nav". No
real constraints were supplied, so here is what was actually done and what it
would cost to reverse:

- **JSON-LD:** added through the existing `jsonLd` prop on `BaseLayout`. No
  layout changes. Clean.
- **Nav: not touched.** `Header.astro` still has its five items. All four new
  pages are reachable from `/contact/` and from each other. If the nav rule is
  real, nothing here breaks it. If it is not, `/for-advisors/` is the one that
  would most benefit from being findable, and the footer is a lighter place to
  put it than the header.
- **Sitemap:** all four pages are in `dist/sitemap-0.xml` automatically. None
  is excluded and none is noindex.
- **Build:** green. 66 pages.

## 5. Before this can publish

1. Confirm £1,750 and £6,000.
2. Get IR35 advice before the FAQ answer on employment status is published.
3. Decide whether `/fractional/` links out to the new page.
4. Add the "Taking a spell" link once the essay is live at its real slug.

All proof placeholders and unverified statistics have been removed. The one
statistic now on the pages is attributed: IDC in partnership with Lenovo,
Lenovo CIO Playbook 2025, 88 per cent of observed proofs of concept never
reaching widescale deployment and four in thirty-three reaching production.
Reported by CIO.com, 25 March 2025:
https://www.cio.com/article/3850763/88-of-ai-pilots-fail-to-reach-production-but-thats-not-all-on-it.html
