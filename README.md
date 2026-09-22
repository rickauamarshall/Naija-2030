# NAIJA 2030 — The Super Eagles Shadow Pool

A public, weekly-updated depth chart of every uncapped or Nigeria-eligible player good enough to wear the Super Eagles shirt — ranked by form, market value, and how much time is left before someone else takes them. Fan-built. Not affiliated with the NFF, CAF, or FIFA.

Read `CLAUDE.md` first if you're picking this up as a dev (human or agent) — it has the data model, hard rules, and a validation check to run after any player-data edit.

## What's in this repo

| Path | What it is |
|---|---|
| `site/index.html` | The live site — single HTML file, vanilla JS, no build step. Open it in a browser and it works. |
| `data/nigeria_eligible_scan.rq` | Wikidata SPARQL query for discovering Nigeria-eligible, uncapped footballers. Paste into query.wikidata.org, no setup needed. |
| `scripts/` | The discovery/enrichment/classification pipeline. `fetch_wikidata.py` runs today; the rest is stubbed pending a Transfermarkt data-source decision — see `CLAUDE.md`. |
| `server/` | The match-day tweet-feed service — formats and (once wired to real API keys) posts a stat-line for pool players after each match, plus weekly recap generation. Runs in mock mode out of the box. |
| `docs/` | X/social strategy, weekly content calendar, newsletter plan, anonymity/ops-sec checklist, prelaunch checklist. |

## Quick start

**Site** — nothing to install:
```bash
open site/index.html                                    # macOS, or just double-click it
python3 -m http.server --directory site                 # or serve it locally
```

**Wikidata discovery query** — no installation needed:
1. Go to https://query.wikidata.org
2. Paste in the contents of `data/nigeria_eligible_scan.rq`
3. Click ▶ (play)

**Tweet-feed service** (mock mode — no real credentials required):
```bash
cd server
npm install
npm test                  # formatter tests, includes the Osimhen example as a fixture
npm run demo              # runs the match-day job against the mock provider and prints what would be posted
```
To go live, copy `.env.example` to `.env` and fill in real X API + stats-provider credentials. Nothing else changes — the formatter and job logic are already provider-agnostic.

## How the site is structured (data-wise)

All player data lives in plain JS arrays near the bottom of `site/index.html`:

- **`FORMATION`** — the 26-man pool (11 starters + 15 reserves), drawn as the pitch depth chart.
- **`BOARD`** — ranks 27–50, the next tier, with weekly movement arrows.
- **`LOST_TO_RIVALS`** / **`DIASPORA_ELSEWHERE`** — informational panels. One is "we were in the running and lost," the other is "never a realistic target." See `CLAUDE.md` for why that distinction matters and must be kept.

There's currently no build step and no backend for the site itself. Editing player data means editing the JS arrays directly — fine at this scale, see `CLAUDE.md`'s "Next steps" for what changes once the pipeline in `scripts/` is built out.

## Contact / provenance

Built conversationally with Claude (Anthropic) as a working prototype. Player data was populated through a mix of live web research (cross-checked against Transfermarkt, Wikipedia, and news sources) and placeholder filler for volume — several lower-Big-Board entries are explicitly marked unverified. **Before any of this goes live publicly, every entry needs a human verification pass.** See the `verified_by_human` gate in `CLAUDE.md` — it is not optional, especially for eligibility claims about players who are minors.
