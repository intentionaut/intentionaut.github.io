---
title: Familiar
summary: A companion for your newsletter. Open source prompts that interview you, propose structures, draft in your voice and hand back editor's reports instead of rewrites. Every stage waits for you.
url: https://intentionaut.com/open-source/familiar/?utm_source=intentionaut.com&utm_medium=referral&utm_campaign=projects
linkLabel: intentionaut.com/open-source/familiar
ctaLabel: Read the full story
role: Creator · Maintainer
status: Open source · MIT
order: 4
repoUrl: https://github.com/intentionaut/familiar?utm_source=intentionaut.com&utm_medium=referral&utm_campaign=projects
repoLabel: GitHub Repo
---

## The Problem

Writing about your own work is hard for a specific reason: the good material is the part you take for granted. Most AI writing tools make this worse. They generate from a description of your voice, or they clean up model text after the fact, and either way the result sounds like nobody. The tools that rewrite for you have two failure modes people keep reporting: they flag your deliberate choices as mistakes, and they drop claims while "only" changing shape.

## The Bet

Familiar is what makes Intentionaut. Every issue of the letter goes through it, and it is open source so it can make yours too. It takes you through a series of gates, each one a plain markdown prompt, and each one asking for the part only you can give. It asks you questions one at a time until the idea is sharp. It proposes three structures and you pick. It drafts in your voice with a bracket wherever it would otherwise have invented something. Then the edits come back as reports: the quote, the problem, the exact fix, and you decide. What comes out is the piece and the posts that carry it. Nothing is applied for you. Nothing ships until you say so.

## Under the Hood

- **Works from human material:** your interview answers, your published pieces, and what you actually changed between draft and final. The learn stage reads a body of past writing and drafts your voice files from evidence, with counts, not adjectives
- **Reports, never rewrites:** no in-place edits, no silent file writes, a gate at every stage
- **An honest tell list:** a full checklist of AI writing patterns, checked weekly against [humanizer](https://github.com/blader/humanizer) with candidates raised as issues and adopted one at a time with a real example
- **Language aware:** the English-only rules are marked and skipped for other languages; per-language files are contributed by fluent writers
- Plain markdown, no app, no account. Runs in Claude Code, opencode, or a claude.ai Project. `npx skills add intentionaut/familiar`

## Why it Matters

The longer story, with how a piece moves from a question to something sent, and what Familiar refuses to do, is at [intentionaut.com/open-source/familiar](/open-source/familiar/).

## Why it matters to you

A newsletter is worth reading when it sounds like a person who knows something. The fastest way to lose that is to let a model fill the gaps. Familiar keeps the gaps visible and the decisions yours, and it gets better at your voice the more you publish. Free, MIT, and built in public. If you write in a language other than English, the language files are where a pull request helps most.
