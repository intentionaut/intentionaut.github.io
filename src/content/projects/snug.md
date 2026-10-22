---
title: Snug
summary: A small Mac app that tidies the menu bar. Three rows, Showing, Hidden and Always hidden, and you drag an icon to move it. Nothing leaves your Mac, and the build fails if the code so much as mentions the network.
url: https://github.com/intentionaut/snug?utm_source=intentionaut.com&utm_medium=referral&utm_campaign=projects
linkLabel: github.com/intentionaut/snug
ctaLabel: Read the code on GitHub
role: Creator · Design · Build
timeline: Built in a day, October 2026
status: Source available · PolyForm Noncommercial
order: 1.5
---

## The Problem

A Mac menu bar fills up. Every app that runs in the background adds an icon, and on a laptop with a notch the ones on the left end up behind it, out of reach. The tools that fix this are good, and I didn't want to compete with them. I wanted to know whether I could build something small, useful and local myself.

## The Bet

Snug hides the icons you don't need to see. Click the mousehole, or press ⌃⌥⌘B, and a dropdown shows three rows: Showing, Hidden and Always hidden. Click an icon to use it. Drag it to another row to move it. That is the whole app.

The hard part was moving icons that sit beside the notch. My first approach dragged them across the screen, took about five seconds and sometimes never landed. The fix was to send the click straight to the icon's own window instead of dragging, and a move now takes under a third of a second.

## Under the Hood

- **Local by construction:** no networking at all. A build check fails if the app references any networking API
- **Two permissions, both explained first:** Accessibility, to see which app owns each icon and move it for you; Screen Recording, optional, to show the real icons. The pictures stay in memory and are never saved. Without it, Snug shows each app's Dock icon instead
- **Honest about limits:** if an icon is behind the notch and can't be moved, the window says so rather than failing silently
- Swift, macOS 14 or later, Liquid Glass on macOS 26. Opens at login if you want it to

## Why it matters to you

If you use a Mac and your menu bar is crowded, you can build Snug from source and use it for free. If you make things, the code is there to read, fork and change, with credit, for anything non-commercial.
