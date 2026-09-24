# Super Eagles Tracker

A weekly view of Nigeria's Super Eagles player pool — established internationals, emerging players, and eligible dual nationals — ranked by form, market value, and how much time is left before someone else takes them. Fan-built. Not affiliated with the NFF, CAF, or FIFA.

Read `CLAUDE.md` first if you're picking this up as a dev (human or agent) — it has the data model, hard rules, and a validation check to run after any player-data edit.

For cross-agent coordination, read [`docs/agent-handoff.md`](docs/agent-handoff.md) before starting work. It defines the shared handoff log, approval gates, and the boundary between agent recommendations and project-owner decisions.

For the reproducible cloud development environment and future protected publishing setup, read [`docs/cloud-environment.md`](docs/cloud-environment.md).

## What's in this repo

| Path | What it is |
|---|---|
| `site/index.html` | The live site — single HTML file, vanilla JS, no build step. Open it in a browser and it works. |
| `data/nigeria_eligible_scan.rq` | Wikidata SPARQL query for discovering Nigeria-eligible, uncapped footballers. Paste into query.wikidata.org, no setup needed. |
| `scripts/` | The discovery/enrichment/classification pipeline. `fetch_wikidata.py` runs today; the rest is stubbed pending a Transfermarkt data-source decision — see `CLAUDE.md`. |
| `server/` | The match-day tweet-feed service — formats and (once wired to real API keys) posts a stat-line for pool players after each match, plus weekly recap generation. Runs in mock mode out of the box. |
| `docs/` | X/Instagram editorial strategy, weekly content calendar, newsletter plan, anonymity/ops-sec checklist, prelaunch checklist. |

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
- **`BOARD`** — the next tier, ranked, with weekly movement arrows. Size and rank range aren't fixed — run `python3 scripts/validate.py` for the current true count rather than trusting a number here.
- **`LOST_TO_RIVALS`** / **`DIASPORA_ELSEWHERE`** — informational panels. One is "we were in the running and lost," the other is "never a realistic target." See `CLAUDE.md` for why that distinction matters and must be kept.

There's currently no build step and no backend for the site itself. Editing player data means editing the JS arrays directly — fine at this scale, see `CLAUDE.md`'s "Next steps" for what changes once the pipeline in `scripts/` is built out.

## Contact / provenance

Built conversationally with Claude (Anthropic). Player data is populated through live web research, cross-checked against Transfermarkt, club/federation statements, and news sources. It has not always stayed that way — 17 Big Board entries turned out to be fabricated or badly misattributed placeholder filler from early prototyping, and were purged in a verification pass (see git log). A few entries remain explicitly marked `TBD` or `verified:'partial'` pending confirmation, rather than guessed at. **Every entry still needs to survive a human review before being treated as settled**, especially eligibility claims — several candidates in this pool are minors, and a wrong public claim about one is real harm, not a typo. See the `verified_by_human` gate in `CLAUDE.md`.
