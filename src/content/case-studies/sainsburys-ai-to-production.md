---
title: "Sainsbury's: AI pilots into production"
summary: "Nobody at Sainsbury's knew how many AI systems were in production, because there was no register. One platform, one strategy and a governance council took generative AI in production from fewer than 5 systems to over 20."
company: Sainsbury's
role: Senior Head of Product, AI, ML and Data Platforms
years: 2024 to 2026
depth: in-depth
order: 1.4
---

When I joined Sainsbury's data platforms, nobody knew how many AI systems were in production, because there was no register. There were multiple roadmaps pulling in different directions, and no sense of strategy. [One concrete example of a pilot that worked in a demo and stalled.]

<ul class="cs-stats">
  <li><strong>&lt;5 to 20+</strong>generative AI systems in production, alongside more than 50 ML models</li>
  <li><strong>26</strong>data engineering teams on one platform</li>
  <li><strong>44%</strong>less data engineering capacity spent on maintenance and triage, against a 30% target set in advance</li>
  <li><strong>58%</strong>fewer outage hours, against a 20% target</li>
</ul>

## The problem

AI pilots stalled for reasons that had nothing to do with the model. There was no register, so no one could say what was live. There was no shared platform for getting a product into production, and no common way to watch it once it was there.

Underneath sat the data. When the data is late, missing or wrong, a store is run on guesswork, and the data engineering teams spent their capacity on triage rather than on work customers would see.

## One strategy, then one platform

Three roadmaps became one strategy. The people who had to agree were the CTO, the Chief Data Officer and the Operating Board, who had to fund it. A weekly update and a few working sessions to settle the dependencies kept 26 teams looking at the same thing. That turned out to be most of the job.

Then we built what every team needed once, and shared it:

- **A platform for getting agentic products into production**, so a working pilot had somewhere to go.
- **A compliance and governance platform, with observability**, so a live system had an owner and could be watched.
- **An AI register, a governance council and a community of practice**, so we knew what was running and who answered for it.
- **The first AI playground**, so developers could experiment with LLMs safely, before production.
- **Data lineage**, which brought the cost of triage down and cut the time to recover from incidents.

[What you deliberately left to each team, and the order the 26 teams moved onto the platform.]

## A product on the platform: Nectar360 Pollen

Pollen, Sainsbury's programmatic retail media platform, ran on that data infrastructure. Owning both the platform and the product built on it meant owning the feedback loop between them.

We put AI only where there was a bottleneck. Creative generation was rejected because it wasn't one. Compliance review was, and the data for it was already in-house and highly structured, which suited supervised learning. The AI-guided campaign builder cut creative review from weeks to 90 seconds, and advertiser self-service rose from around 40% to over 80% in 30 days.

## What it produced

| Measure | Target | Result |
|---|---|---|
| Data engineering capacity spent on maintenance and triage | Reduce 30% | Reduced 44% |
| Mid-sprint changes | Reduce 40% | Reduced 45% |
| Outage hours | Reduce 20% | Reduced 58% |

Generative AI in production went from fewer than 5 systems to over 20. The capacity freed from maintenance moved to customer-facing product. [One example of what a team built with it.]

## Why it matters

I'm the leader you bring in when AI works in the demo and nowhere else.

At Sainsbury's, generative AI in production went from fewer than 5 systems to over 20, and maintenance load fell 44% against a 30% target set in advance.

If your AI pilot won't reach production, [let's talk](/ai-pilot-to-production/).
