import type { APIRoute } from 'astro';
import { rates, gbp } from '../data/rates';

// Built, not hand-written, so every price here is the one the pages show:
// both read rates.ts. Only published offers and public pages belong in it.
// The Enablement Sprint stays out until its page ships.
const body = `# Intentionaut

Saielle DaSilva is a product leader working across design, data and AI. She offers fractional and interim product leadership, product building, mentoring, and speaking.

## Services and rates

- [Strategy session](https://intentionaut.com/strategic-direction/): ${gbp(rates.strategySession)} for a 90-minute session.
- [Fractional leadership](https://intentionaut.com/fractional/): part-time product leadership, ${gbp(rates.fractional)} a day.
- [Product building](https://intentionaut.com/forward-deployed/): embedded work to make a product idea tangible, ${gbp(rates.forwardDeployed)} a day.
- [Two-day pilot](https://intentionaut.com/forward-deployed/): a fixed-price pilot that opens a product building block, ${gbp(rates.fdePilot)}.
- [AI pilot to production](https://intentionaut.com/ai-pilot-to-production/): product building for an AI pilot that has not reached production.
- [Speaking and workshops](https://intentionaut.com/keynote-speaker/): from ${gbp(rates.speaking)} an event.

## Main pages

- [About Saielle](https://intentionaut.com/about/): background and approach.
- [Work with me](https://intentionaut.com/contact/): services, rates and ways to get in touch.
- [FAQ](https://intentionaut.com/faq/): engagements, sessions, speaking logistics and payment.
- [Writing](https://intentionaut.com/writing/): published essays and articles.
- [Projects](https://intentionaut.com/projects/): selected work and products.

The website pages are the source for current details. The [sitemap](https://intentionaut.com/sitemap.xml) lists published URLs.
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
