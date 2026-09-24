# Big Board history

A running record of Big Board (and FORMATION pool) rank changes, for tracking and record-keeping — not a public-facing feature. Add a new dated entry at the top each time rankings are adjusted, promoted/demoted, or a player is added/removed. Don't duplicate exact player counts here — those live in `docs/prelaunch-checklist.md` and `scripts/validate.py`, and go stale if hand-copied into a second place.

## Format

```md
### YYYY-MM-DD — short summary

- What changed: player X moved from [FORMATION depth / Board rank N] to [Board rank M / FORMATION depth], and why.
- Any additions or removals, and the source/reasoning.
```

## Log

### 2026-09-24 — Merge conflict resolved in favor of the fully-verified Board (14 entries, ranks 27-40)

- `site/index.html` had diverged from `origin/main`: this session's own later commit (`e2e1753`) had independently re-verified all 6 remaining unconfirmed Board entries (Tyrique George, Chizzy Ezenwata, David Ozoh, Isaac James, George Ilenikhena, Moses Usor) via live search and flipped them to `verified:true` with sourced detail, while `origin/main`'s parallel edit (from Codex) still had those same 6 entries as `verified:'partial'`/`false` from before that research pass. Resolved by keeping this session's fully-verified version rather than blending two different reordering/verification states — confirmed against `docs/agent-handoff.md`'s handoff log and the `e2e1753` commit message before trusting it over the more cautious `origin/main` side.
- Also updated `docs/prelaunch-checklist.md`'s "Current source-audit gaps" note, which had gone stale (written before the verification pass): dropped Isaac James and Chizzy Ezenwata from the open-gaps list, kept Samuel James/Victory Akpe/Abdullahi Bewene (Chelle's Squad-only entries with no sourced Board/FORMATION profile yet).
- Kayode's watch note: kept this session's slightly longer version (one extra closing sentence) over `origin/main`'s near-identical wording — no factual disagreement, just completeness.
- Verified post-merge: `python3 scripts/validate.py` passes (26 pool + 14 board, ranks 27-40 intact, no dupes/overlap, GK1/DEF4/MID4/FWD2), and `node --check` on the extracted inline `<script>` block confirms no syntax errors.

### 2026-09-24 — Etebo/Ugochukwu swap, Kayode added, Onyeka/Nwaneri promoted

- Peter Etebo (FORMATION, Onyedika's MID depth) and Lesley Ugochukwu (Board rank 35) swapped directly: Ugochukwu now sits in Onyedika's depth (his France U21 call-up on Sept 18 means his case is trending the wrong way, worth watching closely rather than burying), Etebo moves to Board rank 35 with a note tying his demotion explicitly to Ugochukwu's rise, matching the phased-out-not-deleted treatment already used for Troost-Ekong and Iheanacho.
- Michael Kayode added at Board rank 40 — independently verified (ESPN, Pulse Sports, OwnGoal Nigeria, AfricaTopSports): Brentford, left out of Italy's World Cup qualifying playoff squad, NFF has arranged a London meeting with Chelle's personal backing.
- Frank Onyeka promoted ahead of Wilfred Ndidi (MID starter); Ethan Nwaneri promoted ahead of Alex Iwobi (MID starter) — Nwaneri's urgency explicitly calibrated a notch below Ngumoha's.
- Kelechi Iheanacho moved from FORMATION (Lookman's FWD depth) to Board rank 39 the session before this one, with Akor Adams promoted into his old depth slot — noted here for continuity since it's the same kind of change this log now tracks going forward.

### Earlier history (not itemized per-change)

The original placeholder-data purge — 17 of 29 Big Board entries turned out to be fabricated or badly misattributed and were removed, keeping only independently-verified names — is documented in `docs/prelaunch-checklist.md` under "Data pipeline" rather than duplicated here. Treat that as the starting point this log picks up from.
