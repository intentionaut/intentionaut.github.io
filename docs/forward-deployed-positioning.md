# Forward Deployed Product Builder — positioning

Phase 3 of the FDPB launch. Written 31 August 2026. Decisions here govern the
pages in `src/pages/forward-deployed.astro`, `ai-pilot-to-production.astro`,
`embedded-or-agency.astro` and `for-advisors.astro`.

Nothing here is published. This is the argument the pages rest on, kept
separate so the reasoning survives after the copy gets edited.

## What this offering is

Saielle embeds with one team for a defined block, three to four days a week,
and prototypes in their environment on their problems. The work is part
facilitation and part building: get the team to say what they actually intend,
then build a working proof of concept against it, in their stack, with their
data, while they watch.

The artefact at the end is **a working proof of concept, not production
software**. Every page says this in plain words. Overclaiming here would fail
on first contact with a technical buyer, and it would contradict the ethic in
"Taking a spell", which is the piece that makes this offering legible.

## Who is buying

**The buyer is intermediaries: startup advisors and recruiters who place
fractional and interim product people.** Confirmed by Saielle, 31 August 2026.
Not the end client directly.

This is the single most consequential fact in this document, and it changes the
job of every page:

- Advisors and recruiters do not run problem-led searches. They search names,
  and they file people into categories they can pitch.
- The pillar page is therefore **collateral an intermediary forwards**, not a
  page that wins a competitive query. It must be scannable in ninety seconds,
  legible about level and price, and safe to paste into an email to their
  client without further explanation.
- The end client still has the problem. So problem-led pages still earn their
  place, they just sit behind the pillar rather than being it.

Second-order consequence, and a commercial one Saielle should settle before
quoting anyone: **whose margin is it?** IIM data puts recruiter margin on
interim placements at 20 to 25 per cent, 15 at the low end (VERIFIED, IIM
Guide to Interim Management Fees and Day Rates, 3rd ed., July 2019). If that
margin comes out of the quoted rate, £1,750 becomes roughly £1,400 net, for
work that is more intense and carries more IR35 risk than fractional at
£1,200. That is a poor trade. If it sits on top, the client pays about £2,190
and Saielle keeps £1,750. Quote net, and say so.

## The line between this and fractional

Tested against the existing `/fractional` copy rather than assumed. The
hypothesis in the brief was that fractional sells recurring part-time
leadership while forward deployed sells time-boxed embedded delivery with
shipped artefacts. **It half holds.** The correction matters.

| Axis | Fractional & interim | Forward Deployed Product Builder |
|---|---|---|
| What the client is buying | A senior product owner in the room. Judgement, direction, someone accountable when it is unclear what to do. | A working prototype of the thing they cannot yet describe, plus the conversation that makes them able to describe it. |
| Time shape and intensity | One or two days a week, three months minimum, open-ended rhythm. | Three days a week default, four by exception, six to twelve weeks, fixed start and stop. |
| Who does the hands-on work | The client's team. Saielle leads and decides. | Saielle. In their repo, their stack, their data. The team works alongside, not underneath. |
| What exists at the end that did not before | A functioning team, an operating model, decisions that do not need relitigating. | A proof of concept that runs, and a written record of what it proved and what it did not. |
| Decision rights | Executive authority. Leads the team, makes strategic calls, owns delivery. | Deliberately less. Facilitates the team to its own intent, then builds against it. Saielle decides how to build, not what the business should want. |
| Exit condition | The operating model runs without her. | The prototype exists and the team can carry it, extend it, or bin it on evidence. |

**Where the hypothesis was wrong.** `/fractional` already claims delivery
accountability, in those words. So the line is not "advises versus delivers".
It is **decision rights and whose hands are on the keyboard**. Fractional buys
authority. This buys construction, with authority deliberately left where it
is. That is a sharper and more defensible distinction, and it is also less
threatening to an existing product leader, which widens the buyer set rather
than narrowing it.

## Even over

Five principles. Each names a trade-off actually accepted. Each reverses into
something a reasonable person sells, which is how you know it is choosing.

1. **A rough thing that runs, even over a polished thing that does not.**
   Accepts: what you get has edges, no test suite worth the name, and code
   nobody should ship to customers without rewriting.

2. **Your environment, even over my convenience.**
   Accepts: slow starts, access requests, security review, and days spent on
   plumbing rather than product. Building in a private sandbox would be faster
   and would prove less.

3. **Your team's intent, even over my answer.**
   Accepts: facilitation eats days that could have been building, and the
   prototype often ends up smaller than the one Saielle would have built
   alone.

4. **Fewer clients at once, even over a fuller book.**
   Accepts: one, at most two, engagements at a time. Thinner revenue
   diversification and real gaps between blocks.

5. **Ending, even over extending.**
   Accepts: a defined stop, no support tail sold as standard, and the client
   free to hire someone else to take it forward.

## Cannibalisation, honestly

**What it takes from fractional:** the enquiries where the client actually
wanted someone to build something, and bought fractional days because that was
the only shape on offer. Those convert to this at a higher rate and a shorter
term.

**Is that a good trade?** Conditionally yes.

- Higher day rate, shorter engagement. Six weeks at three days and £1,750 is
  £31,500; three months of fractional at one day a week is about £19,000. The
  cheque is bigger and the calendar risk is worse, because it ends sooner and
  there is no rhythm carrying it forward.
- The honest risk is not cannibalisation, it is **funnel splitting**. The
  pipeline is currently one live opportunity. Dividing thin attention across
  two offerings, on a domain with no search authority, could produce less of
  both.
- The judgement: worth doing **because the buyer is intermediaries**. An
  advisor with two briefs on their desk can place a person who has two clear
  shapes more easily than one who has a single fuzzy one. Category legibility
  is the product here. If the buyer were end clients arriving cold on the
  site, the answer would be no, and it would not be close.

**What it must not take:** `/fractional` stays the page for "we have no senior
product voice". No new page targets that. The FAQ and the pillar both route
that reader back to it, by name.

## Rate and structure

All figures ESTIMATE. There is no public UK benchmark for premium embedded
delivery; Workstream B established that no UK boutique publishes a rate card
and no named practitioner publicly justifies this premium with a price
attached.

- **Day rate: £1,750, net to Saielle.** 1.46x the £1,200 fractional rate.
  Bracketed by the IIM "1% rule" (a £150k to £175k equivalent salary implies
  £1,500 to £1,750 a day) and below the £2,000 ceiling in the 2019 IIM guide.
  Held under 1.5x deliberately: the IIM 2025 survey reports the interim market
  contracting, and there is no case study yet to defend more.
- **Scoping block: five days, £6,000, at the standard rate.** Deliberately no
  premium at the entry point. It answers the two best-evidenced buyer
  objections at once, reversibility and proof, and it is how the premium on
  the main block gets earned rather than asserted. Lands at 12.5 per cent of a
  typical total, inside the 8 to 15 per cent discovery convention.
- **Main block: six to twelve weeks, three days a week.** Eight weeks at three
  days is £42,000. Four days a week is available and priced the same per day,
  with the IR35 caveat below.
- **Minimums:** three days a week, six weeks. Below that this is a strategy
  session or fractional, not this.
- **Fallback:** if the market resists at £1,750, drop to £1,500 before
  dropping the shape. The shape is the product.

## IR35

Three days is a deliberate design choice, not a scheduling preference.

Embedded, on client premises, using client tooling, taking client direction on
priorities, at four or more days a week is close to the weakest outside-IR35
fact pattern available. HMRC's CEST weighs control over how, when and where
the work is done, and integration into the client organisation (VERIFIED,
gov.uk). Multiple concurrent clients, own method, defined deliverable and
genuine substitution rights all push the other way.

What follows for the offering: keep three days the default, contract on a
defined deliverable rather than on time, retain freedom over method, and keep
a second client running where possible. **This needs an accountant or IR35
specialist to confirm before any of it is stated as fact on a public page.**
The pages as drafted make no IR35 claim; the FAQ acknowledges the question and
says the determination is the client's to make.

## Proof

There is no client case study yet, and the pages do not pretend otherwise.
They are written as an offering rather than as an evidence file: no client
metrics, no placeholder markers, no borrowed numbers.

What the pages do carry is the mix, which is the actual differentiator. The
company side (StepStone, Sainsbury's, Cazoo, Pivotal, Amazon, AT&T) is the
same set already published in the homepage credibility strip. The solo side
(Friday, Familiar, Kernic) is already published on the projects pages. Both
are Saielle's own material, already live, and neither makes a claim about a
client outcome.

When a first engagement lands, the thing that turns it into proof is a
case-study permission clause agreed at signature rather than at the end.

## Open

- Whether "Forward Deployed Product Builder" survives contact with a recruiter.
  It claims the differentiator and not the seniority, which is right for the
  work and risky for the placement. Seniority is carried in the surrounding
  copy instead.
- Whether Saielle asks for a case-study clause on the next engagement.
