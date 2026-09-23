# Super Eagles Tracker — working notes for Claude Code

Super Eagles Tracker (brand/reader-facing name; the repo and some internal file paths still say `naija-2030`/`naija2030` — that's fine, don't chase renaming those) is a fan-built, independent tracker of Nigeria's best-available Super Eagles pool for the 2030 World Cup cycle — a public depth chart (26-man pool + a ranked 27–50 "Big Board") that includes uncapped dual nationals who could still be persuaded to switch, plus a diaspora technical-staff directory. It exists to make a public, transparent case that the talent pool is deeper than the results suggest, and to pressure the NFF with receipts rather than vibes. **It is not affiliated with the NFF, CAF, or FIFA, and must never imply otherwise** — site copy, social bios, and any future domain should keep saying so explicitly.

This project is deliberately **separate from `fadius-app-dev`** — different repo, different brand, no shared history or cross-references. If you're a session that also has Fadius context loaded, don't mix the two up.

## Where things stand

- `site/index.html` — the whole live site: single-file HTML/CSS/vanilla JS, no build step, no framework. Same "validated prototype first" pattern as Fadius's `fadius.jsx`. Player data lives in plain JS arrays (`FORMATION`, `BOARD`, `LOST_TO_RIVALS`, `DIASPORA_ELSEWHERE`) near the bottom of the file.
- `data/nigeria_eligible_scan.rq` — a manually-verified Wikidata SPARQL query for discovering Nigeria-eligible, uncapped footballers (father or mother is a Nigerian citizen, player isn't, no senior Nigeria caps on record). Discovery only — it does not check rival-federation cap-tying; that still needs a human or LLM-assisted news pass.
- `scripts/` — the data pipeline: Wikidata → Transfermarkt enrichment → LLM-drafted eligibility classification → human review → publish. **Only `fetch_wikidata.py` is runnable today.** `fetch_transfermarkt.py` is a stub blocked on a real data-source decision (see "Data vendor decisions," same shape as Fadius's fixture-data problem). `classify_eligibility.py` and `pipeline.py` are wired but nothing auto-publishes to the site — see the verification gate below.
- `server/` — the match-day tweet-feed service (new this session): position-based stat-line formatter, a mock stats provider, an X (Twitter) poster stub, and job skeletons for match-day posts + weekly recaps. Ships in **mock-data mode only** — no real stats API or X credentials are wired in yet. See `docs/x-strategy.md` for the content strategy this serves.
- `docs/` — `x-strategy.md` (content pillars + weekly calendar, handle is `@SuperEaglesTrkr`), `newsletter-plan.md`, `anonymity-opsec.md` (public-facing scope only, per project owner's explicit call — the private repo itself does not need identity-scrubbing), `prelaunch-checklist.md` (the living done-vs-outstanding tracker — **prefer this over re-deriving status from git/chat history**, same role as Fadius's own prelaunch checklist).

**GitHub account note:** the owner account was renamed from `MLSMDProgram` to `rickauamarshall` (same account, in-place rename, not a new one). A Claude Code session's git credentials are pinned to whatever owner string was true when that session started — a session started under the old name can still push to this repo via GitHub's automatic rename redirect (don't "fix" the remote URL to the new name mid-session, that breaks auth entirely — verify with `git ls-remote origin` before and after touching a remote), but it flatly cannot authenticate to anything under the new name that didn't already exist under the old one. If a repo is unreachable and the owner was recently renamed, check for this before assuming it's a real permissions problem.

**Data integrity check (run this after any edit to the FORMATION/BOARD arrays):**
```bash
sed -n "/const FORMATION/,/^];/p" site/index.html | grep -oP "name:'\K[^']+" | sort > /tmp/f.txt
sed -n "/const BOARD/,/^];/p" site/index.html | grep -oP "name:'\K[^']+" | sort > /tmp/b.txt
sort /tmp/f.txt | uniq -d                          # dupes in formation — must be empty
sort /tmp/b.txt | uniq -d                          # dupes in board — must be empty
comm -12 /tmp/f.txt /tmp/b.txt                      # overlap — must be empty
wc -l < /tmp/f.txt                                  # must be 26
wc -l < /tmp/b.txt                                  # must be 24
grep -oP "rank:\K[0-9]+" site/index.html | sort -n | tr '\n' ' '   # must be 27..50, no gaps/repeats
```
Or just run `python3 scripts/validate.py` — same checks, scripted. This project has shipped duplicate-player and formation-count bugs multiple times before by hand-editing the arrays; don't skip this. As of the last check (this session), the data is clean: 26 pool + 24 board, zero dupes/overlap, ranks 27–50 intact, starters exactly GK 1 / DEF 4 / MID 4 / FWD 2 (a 4-4-2 — earlier handoff notes describe a 3-4-2-1 mislabeling bug that no longer reproduces against this file; don't reintroduce it).

## Hard rules

- **Never commit secrets.** X/Twitter API keys, any stats-data-vendor API key, the Anthropic API key used by `classify_eligibility.py` — all environment-only, never in source. `.env` is gitignored; `.env.example` holds placeholders only.
- **Eligibility status is human-gated, permanently.** `OPEN` / `WATCH` / `TIED` classifications — whether hand-written or LLM-drafted by `classify_eligibility.py` — must carry `verified_by_human: false` until an actual person checks the source and flips it. Never auto-publish a classification to `site/index.html`. Several candidates in this pool are minors; a wrong public eligibility claim about a minor is a real harm, not an embarrassing typo.
- **Match performance stats are a different category and can be automated.** Once `server/` is wired to a real stats provider, objective in-match numbers (minutes, goals, shots, xG, saves, etc.) sourced from a licensed API are fine to auto-post via the tweet-feed job — they're facts from a paid data vendor, not a judgment call about someone's nationality. Don't conflate this with the eligibility gate above.
- **Mock/illustrative data stays labeled as such** until backed by a real integration — the site footer's "DATA SHOWN IS ILLUSTRATIVE SAMPLE DATA" and the Big Board's verified/unverified badges are load-bearing UI, not decoration. Keep that pattern for anything new.
- **Don't re-add `DIASPORA_ELSEWHERE` players** (Saka, Eze, Madueke, Balogun, Olise, etc.) to `FORMATION` or `BOARD` — they were never realistic targets, not "lost." Keep `LOST_TO_RIVALS` (real near-misses) and `DIASPORA_ELSEWHERE` (informational only) conceptually separate.
- **Don't silently delete aging players** — move them down the Big Board with a note (see Troost-Ekong at rank 50). Transparency about who's being phased out is part of the site's credibility.
- **No real club/federation crests or trademarks** — same rule as Fadius: don't source or hardcode real club logos without an actual data-vendor relationship providing them under license.
- **Anonymity scope is public-facing only** (project owner's explicit decision): no real name, personal photo, or personally-identifying detail in site copy, the X bio, or any future domain's WHOIS. The private GitHub repo, commit metadata, and this codebase do **not** need identity-scrubbing — don't over-engineer that. See `docs/anonymity-opsec.md`.

## Data vendor decisions (pending)

- **Transfermarkt enrichment** (`scripts/fetch_transfermarkt.py`): community scraper (fast to start, ToS/fragility risk, cache aggressively and rate-limit) vs. a licensed data feed (Wyscout/Opta/Sofascore partner API — costs money, removes the fragility problem). Not decided yet — don't build past the stub until this is picked.
- **Match-stats provider for the tweet feed** (`server/src/providers/`): needs a provider that covers Süper Lig, Serie A, Premier League, Ligue 1, etc. for every pool player's club, with player-level xG and shot data at a reasonable tier — this is a similar coverage question to Fadius's API-Football vs. Sportmonks vs. TheStatsAPI decision. Not all stats in the tweet templates (esp. xG, key passes, detailed defensive actions) are available on every plan — `server/src/formatters/tweetFormatter.js` degrades gracefully and only includes fields present in the input rather than assuming full coverage.
- **X (Twitter) API tier**: posting requires a developer app and a paid/appropriate access tier — check current X API pricing and rate limits before committing to a posting cadence, since free-tier write limits change and near-real-time match-day posting needs enough headroom.

## Tech direction

- Static prototype now (`site/index.html`), same "validate cheap first" posture as Fadius. No framework decision has been made for a v2 site.
- `server/` (the tweet-feed + recap service) is Node.js. It runs end-to-end today against the mock provider; going live only requires supplying real env vars, not code changes to the formatter/job logic.
