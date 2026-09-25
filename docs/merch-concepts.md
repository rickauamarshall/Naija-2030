# Merch concepts

Print-on-demand merch line for Super Eagles Tracker — no upfront inventory, launches off the existing brand assets and campaign line. This doc is the plan; the execution checklist at the bottom is what to actually do.

## Before you upload anything

Two things to resolve first, both flagged here rather than baked silently into the designs:

1. **The badge (`assets/profile_badge.png`) is not used in any design below.** It's a circular crest — eagle emblem, Nigerian flag colors, gold ring, a star band reading "AFCON CHAMPIONS 1980 · 1994 · 2013." That reads like an official federation badge. Fine as a small social avatar; a different risk level once it's on a physical product for sale, given `CLAUDE.md`'s explicit rule against real club/federation crests or anything implying NFF/CAF/FIFA affiliation. If you want it on merch anyway (patches, a badge tee, pins), that's your call to make deliberately — it isn't included here by default.
2. **No player counts or fixed numbers on physical goods.** The pool size has already changed multiple times this project (see the "50 PLAYERS" staleness bug in git history) and merch can't be live-updated the way the site can. Every design below uses timeless copy instead of a number that will go stale on a printed product.

Every listing description should carry the same line the site footer already uses:

> *Independent fan project. Not affiliated with the NFF, CAF, or FIFA.*

## Design previews

Six SVG mockups in `assets/merch/`, built from the site's own tokens (Oswald display font, IBM Plex Mono for small/mono labels, pitch green `#0E3B2E` / gold `#C99B3F` / paper `#F1EDE1` / clay `#A6432D` / up-green `#3E7A54`):

| File | Product | Placement |
|---|---|---|
| `tee-front-chest.svg` | T-shirt | Small chest print, gold on pitch green |
| `tee-back-full.svg` | T-shirt | Full back print — eyebrow line, "RISE, EAGLES, RISE.", sub-line |
| `hoodie-front-chest.svg` | Hoodie | "ONE POOL." centered chest |
| `hoodie-back-small.svg` | Hoodie | Small back print — "FWC30 QUALIFICATION AT ALL COSTS." |
| `cap-embroidery.svg` | Cap | "ONE POOL. ZERO EXCUSES." single line, embroidery-simplified |
| `sticker-sheet.svg` | Sticker pack | Wordmark + VERIFIED/WATCH/TBD badges (pulled straight from the Big Board's own badge language) + campaign-line sticker |

The **tactics-board tee** doesn't need a new file — use `assets/ig-carousel-tactics.png` as-is as the print file. No text, just the formation-arrows graphic; reads as a football-nerd piece rather than fan merch.

**These are layout/copy previews, not camera-ready print files.** They're plain SVG with web-font references (Oswald/IBM Plex Mono via Google Fonts), which won't be available in a print vendor's pipeline. Before submitting anything to Printful: either recreate the text directly in Printful's own design tool (it has Oswald or a close equivalent), or convert the text to outlines/paths in a vector editor first. Don't upload these SVGs as-is expecting correct fonts to survive.

## Product line and pricing (starting point, adjust once you see Printful's base costs)

| Product | Design | Suggested retail |
|---|---|---|
| T-shirt | Front chest + back full print | $28–32 |
| Hoodie | Front chest + back small print | $48–55 |
| Cap | Embroidered, one line | $24–28 |
| Sticker sheet | Full sheet, single item | $6–8 |
| Tactics tee | Full front print, no text | $28–32 |

Keep the catalog small at launch — five items, not fifteen. A tight catalog is easier to feature in one newsletter CTA and easier to keep in stock/quality-checked.

## Execution checklist

1. Create a Printful account under the project's dedicated email (same one used for X/Instagram/Beehiiv — see `anonymity-opsec.md`). Printful will still require a real payout bank account and tax info from you directly; that's unavoidable and fine — the goal is keeping it off anything *public*, same principle as the X phone-verification note.
2. Recreate the six designs above in Printful's design tool (or finalize them in a vector editor first, then upload) — don't rely on the raw SVGs' web fonts surviving.
3. Order physical proofs before listing anything publicly. Check color accuracy (pitch green and gold shift more than you'd expect across different garment fabrics) and print placement.
4. Set up the storefront (Printful's own hosted store is the lowest-effort option; skip building custom e-commerce for a five-item catalog).
5. Add a "Shop" link to the site's ticker bar, next to the existing X/IG/newsletter links.
6. Write one newsletter CTA and one X/IG post announcing the launch — keep it short, link to the store, use the same independence line as everywhere else.
7. Add a line to `docs/prelaunch-checklist.md`'s Monetization section marking the merch item done once it's live, with the real store URL.

Nothing above requires touching player data, eligibility claims, or anything gated by `verified_by_human` — this is pure brand/commerce work, independent of the editorial pipeline.
