---
title: Kernic
summary: An open source CLI for vibe coders to add style to their app automatically. Design systems with a click.
url: https://github.com/intentionaut/kernic
role: Creator · Maintainer
status: Open source · MIT
---

## The problem

Design systems have a distribution problem. Enterprises get token pipelines, governance and Figma libraries. Everyone else gets a `colors.css` file named `final-v2` and a hope that nobody asks for a dark mode. Solo developers and small teams skip the system entirely — so their apps ship with fifteen shades of grey and three fonts that almost match.

And in an era where AI agents write more of our interfaces, there's a new consumer nobody designed for: the agent that needs your design decisions as clean, machine-readable tokens.

## The move

Kernic treats a design system like kerning — adjust the space between everything until the whole feels right, invisible when done well. One command walks you through naming, vibe, palette tuning with live terminal swatches, and type pairing from all ~2,000 Google Fonts. A local visual editor (`kernic studio`) opens in the browser for people who think better with their eyes. The output exports as CSS custom properties, a Tailwind v4 `@theme`, JSON tokens, or font imports — pipe-friendly, stdout by default.

## Under the hood

- **Real color science** — ramps generated in OKLCH with automatic sRGB gamut fitting, harmony rules (analogous, complementary, triadic, monochrome) and tinted neutrals, not HSL spin-the-wheel
- **8 theme families, 27 curated looks** — from 70s retro to Stripe-style gradient fintech, with gradient tokens that export straight to Tailwind utilities
- **Plain JSON, local forever** — systems live in `~/.config/kernic/`, no account, no cloud, no lock-in
- TypeScript throughout, published to npm (`npx kernic`), MIT licensed

## Why it matters

The CLI is free forever by design, and the token format is built so a future paid layer — multi-brand management, sync, version history — extends free-tier files without ever breaking them. Your local systems stay yours, in plain JSON. That's the whole point: the tools we use to make beautiful things should be beautiful to use, and free where it counts.
