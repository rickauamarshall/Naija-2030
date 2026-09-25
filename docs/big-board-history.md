# Big Board history

A running record of Big Board (and FORMATION pool) rank changes, for tracking and record-keeping — not a public-facing feature. Add a new dated entry at the top each time rankings are adjusted, promoted/demoted, or a player is added/removed. Don't duplicate exact player counts here — those live in `docs/prelaunch-checklist.md` and `scripts/validate.py`, and go stale if hand-copied into a second place.

## Format

```md
### YYYY-MM-DD — short summary

- What changed: player X moved from [FORMATION depth / Board rank N] to [Board rank M / FORMATION depth], and why.
- Any additions or removals, and the source/reasoning.
```

## Log

### 2026-09-25 — Market-value pass: converted to USD, refreshed all 44 values, Tyrique George club correction

- Per explicit direction ("just do a normal Google search," not an automated Transfermarkt integration), manually researched a current market value for every FORMATION/BOARD player via search - not `scripts/fetch_transfermarkt.py`, which stays a disabled stub per `CLAUDE.md`'s hard rule against automating Transfermarkt access. Where a result explicitly attributed a figure to Transfermarkt, used that; otherwise fell back to FotMob, then Soccerway, in that order. This is a one-time manual snapshot, not a live feed - values will drift and need another pass eventually.
- Converted every value from EUR (and one GBP figure, Iheanacho) to USD at the Sept 25, 2026 rates (EUR/USD 1.1384, GBP/USD ~1.334) per explicit direction to standardize on dollars.
- Several values moved a lot from what was on the site (all were manually-entered estimates, not sourced from this pass): Taiwo Awoniyi $9.1m (was more than double that), Benjamin Fredrick $460k (was ~6x that), Peter Etebo $270k (was ~10x that), Frank Onyeka $7.6m (was more than double), Zaidu Sanusi $1.8m (was ~4x that), Kelechi Iheanacho $3.4m (was ~1.8x that), Rayan Oyebade $150k (was ~8x that), Emeka Adiele $740k (was ~2x that) - and the reverse for Jeff Ekhator, now $20.5m (was undervalued at the equivalent of ~$8m), tied to his real €16.4m Juventus fee.
- Filled in real numbers for five entries that were `TBD`: Lesley Ugochukwu $26.7m, David Ozoh $2.3m, Isaac James $680k, George Ilenikhena $13.7m, Abdullahi Bewene $970k.
- Chizzy Ezenwata moved the other way, from a manually-set $3m-equivalent to `TBD` - no market value exists anywhere for a 17-year-old who hasn't made a senior appearance, and the site shouldn't assert one that isn't backed by anything findable. Samuel James stays `TBD` for the same reason (obscure third-tier Finnish club).
- **Tyrique George: corrected from "Chelsea" to "Everton."** He signed a permanent four-year deal (to June 2030) in July 2026 - not on loan, as an earlier pass on this site had it. Value updated to $23.5m alongside the club fix.
- Two things flagged but deliberately not changed: Victor Osimhen (one outlier source claimed a "doubled to €150m" Transfermarkt value after his Galatasaray move - not trusted against everything else found, which clustered around the site's existing $75m-equivalent) and William Troost-Ekong (search results described a club move that looked like a name collision with a different player - his Besiktas listing was left alone rather than acted on from ambiguous data).

### 2026-09-25 — Resolved Samu Aghehowa's eligibility: cap-tied to Spain, moved to Lost to Rivals

- Aghehowa (Porto forward, born Samu Omorodion, switched to his mother's surname Sept 2026) had been flagged as "genuinely unresolved" since Issue №1/LAUNCH.md — conflicting cap counts across sources (1, 2, 4) and whether his Nov 2024 Nations League debut vs. Switzerland was competitive. He was never added to FORMATION/BOARD pending that resolution — see `docs/agent-handoff.md`'s outstanding-audit-items note.
- Now settled via multiple independent, dated sources (AllNigeriaSoccer's dedicated eligibility piece, Yahoo Sports, others): 4 senior caps for Spain, most recently a June 5, 2026 Nations League semifinal vs. France — past the 3-competitive-cap FIFA one-time-switch threshold. Permanently cap-tied to Spain, no longer Nigeria-eligible.
- Added to `LOST_TO_RIVALS` on the site (real near-miss, not a `DIASPORA_ELSEWHERE` case — Nigeria was genuinely in the conversation, unlike players who committed elsewhere long before that was realistic).

### 2026-09-25 — Added Ajayi/Arokodare to FORMATION, Akpe/Bewene to Board

- FORMATION: Semi Ajayi (DEF, 32, Hull City, 50+ caps) added as depth alongside Bright Osayi-Samuel under Ola Aina's slot, and Tolu Arokodare (FWD, 25, Ajax loan from Wolves, 10 caps) added as depth alongside Awoniyi/Ekhator under Osimhen's slot. Both are established, capped Super Eagles internationals actually in Chelle's AFCON qualifying squad — not eligibility cases — who were missing from the tracked pool entirely. `scripts/validate.py`'s `EXPECTED_RESERVES` bumped DEF 5→6 and FWD 3→4 to match; the FORMATION total-count check, previously hardcoded to `26`, is now derived from `EXPECTED_STARTERS`/`EXPECTED_RESERVES` (same fix class as the earlier board-count hardcode) so it can't go stale silently.
- Board: added Victory Akpe (rank 41, DEF, FC Basel, `verified:false`) and Abdullahi Bewene (rank 42, DEF, Baník Ostrava, `verified:false`) — both first-time Chelle call-ups (Russia friendly) missing from the pool. `EXPECTED_BOARD_RANK_END` bumped 40→42. Bewene's note explicitly flags an unresolved discrepancy: one source describes him as already having debuted for Nigeria (vs. Poland), contradicting the "first call-up" framing used elsewhere — not resolved by inference, needs a direct source check.
- `docs/prelaunch-checklist.md`'s source-audit-gaps note updated to add Akpe and Bewene as open gaps.

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
