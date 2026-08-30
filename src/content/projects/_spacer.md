---
title: Spacer
summary: A swipe-to-delete photo cleaner for iPhone that you pay for once. Oldest first, keep or let go, confirm one batch. No account, no servers, no subscription.
url: https://spacerforphotos.com/?utm_source=intentionaut.com&utm_medium=referral&utm_campaign=projects
linkLabel: spacerforphotos.com
ctaLabel: Get Spacer on the App Store
role: Creator · Design · Build
timeline: First iOS app, concept to App Store submission in [X weeks]
status: In App Store review · £9.99 one-time
order: 3
---

## The Problem

Everyone has a camera roll they don't look at. Thousands of photos, most of them screenshots and near-misses, and a storage warning every few months. The Photos app is built for keeping; deleting is tap, tap, tap, confirm, for an hour. The apps that promise to make it faster mostly charge a subscription, some by the week, to remove photos from a phone you already own.

## The Bet

Deleting your own photos should be a one-time purchase and a two-minute habit, not a weekly bill. Spacer makes each decision a swipe: left to let go, right to keep, oldest first. Nothing is deleted while you swipe. The pile waits in a review screen, and one tap clears the batch behind Apple's own confirmation dialog. iOS insists on that prompt; Spacer treats the constraint as the undo button rather than fighting it.

## Under the Hood

- **Swift and PhotoKit, fully on-device:** no servers, no accounts, no analytics. The App Store privacy label reads "Data Not Collected" because it is true.
- **Two-stage delete:** session pile first, one system confirmation for the whole batch. Recently Deleted keeps everything for 30 days on top.
- **iCloud-aware:** thumbnails stream in while you swipe; the deck never blocks on a download.
- **StoreKit one-time purchase:** £9.99, three free deletions to try it, Family Sharing on, offer codes for creators built into the paywall.
- **Built in conversation with an AI coding agent** as a first Swift project. The product decisions were made by hand; the code was written together.

## Outcomes

In review at the App Store as of late August 2026. The running cost of the app is Apple's developer fee, which is the point: it can stay what it is without ever needing to charge again. Measuring from launch: installs, free-to-paid rate, and reviews. [Replace with real figures after the first month.]

## Why it Matters

Spacer is small on purpose. One job, done well, paid for once. It is also a test of how far a person who has never written Swift can get with an AI agent as a pair, and the answer so far is: to the App Store, with the hard part being Xcode rather than the code. The lesson carries beyond photo apps. Describing what you want, clearly, is most of building it.
