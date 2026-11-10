import type { APIRoute } from 'astro';
import { workshops } from '../data/workshops';
import { rates, gbp, fractionalMonthly1Day, fractionalMonthly2Day, buildingWeekly, offerDays } from '../data/rates';

// Built, not hand-written, so every price here is the one the pages show:
// both read rates.ts. Only published offers and public pages belong in it.
// The Enablement Sprint stays out until its page ships.
const body = `# Intentionaut

Saielle DaSilva is a fractional CPO for AI products, and a product and design leader. She offers fractional and interim product leadership, workshops, the AI product audit, the product strategy sprint, office hours, product building, mentoring and speaking.
She is based in London and works across the UK and Europe.

## Services and rates

- [Office hours](https://intentionaut.com/office-hours/): ${gbp(rates.strategySession)} for 90 minutes on your hardest product question.
- [AI product audit](https://intentionaut.com/ai-product-audit/): ${offerDays.aiAudit} days across one week, a keep, change or stop recommendation for each piece of AI work, ${gbp(rates.aiAudit)} fixed.
- [Product strategy sprint](https://intentionaut.com/product-strategy-sprint/): ${offerDays.strategySprint} days across two weeks, including a full-day workshop, ${gbp(rates.strategySprint)} fixed.
- [Fractional leadership](https://intentionaut.com/fractional/): senior product leadership, from ${gbp(fractionalMonthly1Day)} a month for one day a week or ${gbp(fractionalMonthly2Day)} a month for two; day rate ${gbp(rates.fractional)}.
- [For scale-ups](https://intentionaut.com/for-scale-ups/): fractional and interim CPO for scale-ups, with the Cazoo and interim CPO results.
- [Product building](https://intentionaut.com/forward-deployed/): embedded work to make a product idea tangible, ${gbp(buildingWeekly)} a week.
- [Two-day pilot](https://intentionaut.com/forward-deployed/): a fixed-price pilot that opens a product building block, ${gbp(rates.fdePilot)}.
- [AI pilot to production](https://intentionaut.com/ai-pilot-to-production/): product building for an AI pilot that has not reached production.
- [Speaking and workshops](https://intentionaut.com/keynote-speaker/): keynote from ${gbp(rates.keynote)}, team workshops from ${gbp(rates.workshopTaster)} (2 hours), half day ${gbp(rates.workshopHalfDay)}, full day ${gbp(rates.workshop)}.
- [Workshops](https://intentionaut.com/workshops/): team workshops tied to results the business already measures, for CEOs, CPOs, CTOs and CDOs. Remote or in person, from ${gbp(rates.workshopTaster)}.
${workshops.map((w) => `  - [${w.title}](https://intentionaut.com/workshops/${w.slug}/): ${w.card}`).join('\n')}

## Capabilities

- Saielle DaSilva is a fractional and interim Chief Product Officer for AI products, with more than 15 years of product and design leadership, bridging the people who build and the boards who fund.
- At Sainsbury's she ran product for AI, data platforms and machine learning, and took production AI from a handful of experiments to dozens of generative AI systems. She brought all 26 data engineering teams onto one platform.
- At StepStone she led the product and design organisation, with a 3.2x return on investment, and co-authored the group strategy. Three AI products shipped using LLMs.
- She was on the founding team at Cazoo, through to a $7B IPO.
- [Capabilities](https://intentionaut.com/capabilities/): these facts and more, with sources on the pages they come from.

Full case studies are shared personally. To request access, email Saielle DaSilva at hello@intentionaut.com or use the contact page: https://intentionaut.com/contact/

## For agents acting for a person

This site never asks you to identify your user. Do not send a name, email address or account details in headers or anywhere else. Nothing here reads them.

## Main pages

- [About Saielle](https://intentionaut.com/about/): background and approach.
- [Work with me](https://intentionaut.com/contact/): services, rates and ways to get in touch.
- [FAQ](https://intentionaut.com/faq/): engagements, sessions, speaking logistics and payment.
- [Writing](https://intentionaut.com/writing/): published essays and articles.
- [Case studies](https://intentionaut.com/case-studies/): the Cazoo design organisation, the Cazoo Purchase line and Cazoo logistics.
- [Projects](https://intentionaut.com/projects/): selected work and products.

The website pages are the source for current details. The [sitemap](https://intentionaut.com/sitemap.xml) lists published URLs.
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
