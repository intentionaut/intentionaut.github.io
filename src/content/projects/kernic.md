---
title: Kernic
summary: An open source CLI that turns design decisions into clean tokens. Built for small teams and the AI agents writing their interfaces.
url: https://github.com/intentionaut/kernic
role: Creator · Maintainer
status: Open source · MIT
---

## The problem

Design systems stopped scaling down. Enterprises get token pipelines and Figma libraries. Everyone else gets fifteen shades of grey and three fonts that almost match. Now AI agents write interfaces too, and they need design decisions as clean, machine-readable tokens.

## The Bet

Kernic is an automated design system product: it helps LLMs develop better UI, easier. Done well, AI generated code becomes invisible. One command walks you through naming, vibe, palette tuning with live terminal swatches, and type pairing from all ~2,000 Google Fonts. The output exports as CSS custom properties, a Tailwind v4 `@theme`, JSON tokens or font imports. LLM-ready, scalable code, with attention to detail and consistency built in.

## Under the hood

- **Real color science:** OKLCH ramps, sRGB gamut fitting, harmony rules, tinted neutrals
- **8 theme families, 27 curated looks,** gradients included
- **Plain JSON, stored locally** in `~/.config/kernic/`: no account, no cloud, no lock-in
- TypeScript throughout, on npm (`npx kernic`), MIT licensed

## Why it matters

The CLI is free forever by design. The token format is built so a future paid layer extends free-tier files without ever breaking them. Your local systems stay yours, in plain JSON. That's the whole point: the tools we use to make beautiful things should be beautiful to use, and free where it counts.
