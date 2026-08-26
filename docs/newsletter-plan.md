# Newsletter plan

**Note on sourcing:** the reference newsletter you linked (Nutmeg Soccer, beehiiv) couldn't be fetched in this session — that domain is blocked by the environment's network egress rules, not a content issue. What follows is built from general independent-football-newsletter conventions (Nutmeg Soccer's public reputation is squarely in this style: conversational, roundup-driven, punchy alliterative subject lines like the one you linked) rather than a scrape of that specific issue. If you paste in the actual text, I'll match its structure more precisely.

## Format: weekly roundup, ~5-8 min read

Ship it right after the Monday X recap (see `x-strategy.md`) so they reinforce each other — the thread is the teaser, the newsletter is the fuller version with more room for context per player.

### Structure

1. **Subject line** — punchy, list-y, alliterative where it fits naturally (matching the energy of "Transfers, Transfers, Transfers, and Then Some"). E.g. *"Osimhen's Brace, Ahanor's Clock, and Who Else Is Watching"*.
2. **Cold open (2-3 sentences)** — a hook, usually the single biggest story of the week (a big stat-line, an eligibility development, a notable NFF headline). Conversational, first-person, opinionated but grounded.
3. **TL;DR bullets** (3-5 lines) — scannable summary for readers who won't make it further. This is also the easiest section to reuse from the week's X recap.
4. **This Week's Stat-Lines** — the week's pool performances, same data `server/src/jobs/weeklyRecap.js` already aggregates. One line or short paragraph per notable performance, a little more color than the tweet version affords (e.g. "Osimhen's brace vs. Fenerbahçe means he's now Süper Lig's joint-top scorer among non-Turkish forwards" instead of just the stat-line).
5. **Big Board Movement** — risers/fallers, once the ranking-recompute pipeline exists (see `CLAUDE.md`'s pipeline "Next steps"). Until then, skip this section rather than fabricate movement.
6. **Eligibility Watch** — same hard rule as everywhere else: only verified (`verified_by_human: true`) status changes. If nothing verified changed this week, say so plainly ("no confirmed eligibility movement this week") rather than padding with speculation.
7. **Feature of the week** — the long-form piece, reused/adapted from that week's X spotlight thread (pillar 4 in `x-strategy.md`). Write it once as the newsletter's full version, then cut it down into thread form for X, not the other way around — long-form reads better as the source of truth.
8. **Elsewhere in Nigerian football** — a short, clearly-labeled roundup of broader news (NFF decisions, camp call-ups, Super Falcons if relevant) that didn't fit elsewhere. Keep this section short; it's context, not the newsletter's reason to exist.
9. **Sign-off + CTA** — invite replies (tips, corrections, disagreement), point to the X account, and a one-line reminder of what this project is: *fan-built, independent, not affiliated with the NFF*.

### Voice notes

- Stats-forward but not dry — the personality shows up in the commentary around the numbers, not in the numbers themselves.
- Short paragraphs, scannable subheads, occasional bold on player names/numbers — this is a roundup people read on their phone, not a report.
- Consistent sign-off identity (a project name/persona, not a personal name) across every issue — see `anonymity-opsec.md`.

### Platform

beehiiv (like the reference) or a comparable newsletter platform (Substack, ConvertKit) all work — the format above doesn't depend on the platform choice. Whichever one you pick, set the sender name and reply-to address to a project alias, not a personal email (see `anonymity-opsec.md`).
