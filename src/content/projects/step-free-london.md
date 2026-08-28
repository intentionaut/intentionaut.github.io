---
title: Step-Free London
summary: Where London's tube network leaves disabled and older residents behind, measured from five free data sources and shipped as a live map.
url: https://intentionaut.com/step-free-london/
linkLabel: Live map
ctaLabel: Explore the live map
role: Author · Data · Build
status: Live
order: 3
---

## The Problem

London prides itself on its transport, but the network is not for everyone. Only a fraction of tube stations are step-free, and that fraction decides who the city is actually for. The gap was never a mystery to the people it hurt. It was a mystery to everyone else, because nobody had put numbers on it. "Somewhere" is not a target.

## The Bet

Official data would not be enough. The TfL API's access field exists for only 82 of 272 stations, and where it disagrees with OpenStreetMap, the crowd is more current: Epping, High Barnet and Woodford all gained lifts years ago and still read "No" in the official interface. So the project bets on the ground over the API. Cross-check every source, close every unknown, and let the numbers name the worst-served boroughs. The result overturns the guess: disabled residents and inaccessible stations barely correlate at all (r = 0.02). The gap is a matter of decisions, not demand.

## Under the Hood

- **Five free sources:** TfL Unified API, OpenStreetMap wheelchair tags, ONS Census 2021 disability data, the TfL Step-free Tube guide, London Datastore boundaries
- **A re-runnable pipeline:** fetch, cross-check, join, score; every download caches into `data/raw` untouched
- **Zero unknowns:** all 272 stations carry a status and a source note, so every claim in the write-up can be checked and re-run from `scripts/`
- **A live map:** every station plotted and colour-coded by access status, deployed from the repo

## Outcomes

The finding that matters most: r = 0.02, no meaningful relationship between need and access. The worst-served places are now named and ranked, with numbers: Haringey has 13.7% disabled residents and one accessible station in seven; Kensington & Chelsea has 83% of its stations inaccessible; Camden and Westminster sit on the same list. The honest measure of success will be whether the official data itself moves. TfL's own API field is stale, and a reproducible public comparison is the cheapest pressure a citizen can apply to a data owner. It is too early to say what changes. The dataset is the argument, and the argument is now on the record.

## Why it Matters

Accessible transport is a design decision made at city scale, and data is one of the only ways a citizen can see it, let alone argue with it. "Not step-free" is not a technical fact about a Victorian tunnel. It is a decision about who the station is for. The map turns those decisions, line by line and borough by borough, into something a person can hold in their hands.