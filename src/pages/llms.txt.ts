import type { APIRoute } from 'astro';
import { rates, gbp, fractionalMonthly1Day, fractionalMonthly2Day, buildingWeekly } from '../data/rates';

// Built, not hand-written, so every price here is the one the pages show:
// both read rates.ts. Only published offers and public pages belong in it.
// The Enablement Sprint stays out until its page ships.
const body = `# Intentionaut

Saielle DaSilva is a product leader working across design, data and AI. She offers fractional and interim product leadership, product building, mentoring, and speaking.
She is based in London and works across the UK and Europe.

## Services and rates

- [Strategy session](https://intentionaut.com/strategic-direction/): ${gbp(rates.strategySession)} for a 90-minute session.
- [Fractional leadership](https://intentionaut.com/fractional/): part-time product leadership, from ${gbp(fractionalMonthly1Day)} a month for one day a week or ${gbp(fractionalMonthly2Day)} a month for two; day rate ${gbp(rates.fractional)}.
- [Product building](https://intentionaut.com/forward-deployed/): embedded work to make a product idea tangible, ${gbp(buildingWeekly)} a week.
- [Two-day pilot](https://intentionaut.com/forward-deployed/): a fixed-price pilot that opens a product building block, ${gbp(rates.fdePilot)}.
- [AI pilot to production](https://intentionaut.com/ai-pilot-to-production/): product building for an AI pilot that has not reached production.
- [Speaking and workshops](https://intentionaut.com/keynote-speaker/): keynote from ${gbp(rates.keynote)}, full-day team workshop from ${gbp(rates.workshop)}, half day on request from ${gbp(rates.workshopHalfDay)}.

## Capabilities

- Saielle DaSilva is an interim and fractional Chief Product Officer for AI and data products, with more than 15 years of product leadership on both sides of the bridge between the people who build and the boards who fund.
- At Sainsbury's she ran product for AI, data platforms and machine learning, and took production AI from a handful of experiments to a platform serving over 100 million customers. She brought all 26 data engineering teams onto one platform.
- At StepStone she led the product and design organisation, where the satellite portfolio delivered a 3.2x return on investment, and co-authored the group strategy. Three AI products shipped using LLMs.
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
