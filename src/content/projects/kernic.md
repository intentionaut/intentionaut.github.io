---
title: Kernic
summary: An open source CLI that turns vibe coding into MCP ready design systems for easier management and consistency. Built for small teams and the AI agents writing their interfaces.
url: https://github.com/intentionaut/kernic?utm_source=intentionaut.com&utm_medium=referral&utm_campaign=projects
linkLabel: GitHub Repo
ctaLabel: Visit GitHub Repo
role: Creator · Maintainer
status: Open source · MIT
order: 2
---

## The Problem

Design systems stopped scaling down. Enterprises get token pipelines and Figma libraries. Everyone else gets fifteen shades of grey and three fonts that almost match. Now AI agents write interfaces too, and they need design decisions as clean, machine-readable tokens.

## The Bet

Kernic is an automated design system product: it helps LLMs develop better UI, easier. Done well, AI generated code becomes invisible. One command walks you through naming, vibe, palette tuning with live terminal swatches, and type pairing from all ~2,000 Google Fonts. The output exports as CSS custom properties, a Tailwind v4 `@theme`, JSON tokens or font imports. LLM-ready, scalable code, with attention to detail and consistency built in.

## Under the Hood

- **Real color science:** OKLCH ramps, sRGB gamut fitting, harmony rules, tinted neutrals
- **8 theme families, 27 curated looks,** gradients included
- **Plain JSON, stored locally** in `~/.config/kernic/`: no account, no cloud, no lock-in
- TypeScript throughout, on npm (`npx kernic`), MIT licensed

## Why it Matters

The longer story, with how it works and what it refuses to do, is at [intentionaut.com/open-source/kernic](/open-source/kernic/).


The CLI is free forever by design. Nobody knows where code automation goes next, so we won't pretend otherwise. The paid layer on the Kernic Studio roadmap (multi-brand management, sync, version history) will extend free-tier files without ever breaking them. Your local systems stay yours, in plain JSON. In an era when everyone can build, why not make designing well easy, beautiful and smart?
