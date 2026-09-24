# Prelaunch checklist

Living done-vs-outstanding tracker — prefer this over re-deriving status from chat history. Update it whenever something here changes state.

## Site
- [x] Static prototype (`site/index.html`) — pool depth chart, Big Board, staff directory, "Elsewhere," "Why This Exists" tabs
- [x] Header countdown clocks wired to real, confirmed fixture dates (Madagascar Sept 25, Guinea-Bissau MD2 Sept 29, Russia friendly Oct 6) — 2030 WCQ card stays a static "DATE TBD" since CAF hasn't published a calendar; no fake countdown shown
- [x] Renamed the "Methodology" tab to "Why This Exists" and cut the ranking-formula breakdown and "A note on subjectivity" copy per project owner's call — just the mission statement stays. The verified/unverified/partial badges on the Big Board are the actual enforcement mechanism regardless of what explanatory copy sits next to them; this only removed prose, not the gate itself.
- [x] Live newsletter signup link in the ticker bar — points to `https://supereaglestracker.beehiiv.com/subscribe`
- [x] X follow link in the ticker bar (`@SuperEaglesTrkr`)
- [x] Instagram follow link in the ticker bar (`@supereaglestracker`)
- [x] "Chelle's Squad" tab — the real, announced squad for each fixture window, cross-checked live against FORMATION/BOARD (computed at render time from a Set of pool names, not hardcoded) so the tracked/untracked badges can't silently go stale
- [x] Removed two literal `[Add: ...]` placeholder entries from the public Staff tab (Scouting & Data, Medical & Performance) — found by Codex's audit. Tracking the actual research gap here instead of leaving a raw TODO live: **still need real names for** (a) diaspora scouts/recruitment analysts at CIES or club scouting departments, (b) club-level sports scientists/physios of Nigerian origin. Add back as real entries once researched, not as placeholders.
- [x] Masthead player count and Big Board rank-range header are now computed from the live `FORMATION`/`BOARD` arrays via JS, not hardcoded strings — can't drift out of sync with the data again the way "50 PLAYERS" / "(27–50)" did
- [x] `server/src/config/pool.js` was badly stale (still had all 17 purged fabricated names, including the Iheukwumere misattribution, plus 6 stale club names) — resynced by hand to match the current 38-player site pool. Its own header comment still flags the real fix: generate this file from `site/index.html` instead of hand-maintaining both in parallel.
- [x] GitHub Pages deploy workflow added (`.github/workflows/pages.yml`) and Pages source set to GitHub Actions; the site is live at `https://supereaglestracker.com/`.
- [x] Custom domain configured: `supereaglestracker.com` uses the four GitHub Pages apex A records plus the DNS-only `www` CNAME; GitHub DNS check has succeeded and HTTPS certificate provisioning is in progress.
- [ ] Real view counter backend — current one uses the artifact-preview environment's `window.storage`, which won't exist once actually deployed (flagged in the original handover, still open)
- [x] Per-player source links — verified Wikidata and official federation/competition/club links are attached where identities are clear; unresolved profiles remain visibly marked pending verification

## Data pipeline
- [x] Wikidata discovery query (`data/nigeria_eligible_scan.rq`) + `fetch_wikidata.py`, runnable today
- [x] `scripts/validate.py` — formalized the dedup/formation-count checks, wired into CI
- [x] **Placeholder-data purge (found via project owner flag + manual verification pass):** 17 of the Big Board's 29 entries (ranks 30-49, minus the 3 already partial/verified) turned out to be fabricated or badly misattributed — the original handover's own notes had warned this tier was "placeholder names from early prototyping" but it was never actually fixed. One case (Marvellous Iheukwumere) misattributed a real, identifiable person — a corporate attorney with zero football connection — as an 18-year-old male striker; several others borrowed a real player's name onto a fabricated club/profile (Tosin Kehinde, David Okereke Jr.). Removed all 17; kept only Chibuike Nwaiwu (independently verified: real Trabzonspor CB, real provisional AFCON call-up). Board is now 12 entries, all individually verified or explicitly marked TBD pending verification — smaller and honest beats bigger and fake. Also caught and fixed 3 similar issues in the FORMATION pool itself (Adeyinka, Fredrick, Adiele had wrong/stale clubs; Adeyinka turned out to already be a capped senior international, not an uncapped reserve). **This is exactly the failure mode `scripts/fetch_wikidata.py` + `classify_eligibility.py` exist to prevent** — worth prioritizing that pipeline over more hand-entered names.
- [ ] Transfermarkt enrichment — vendor decision pending (community scraper vs. licensed feed, see `CLAUDE.md`)
- [ ] Eligibility classification end-to-end — `classify_eligibility.py` drafts via Claude but has no real news-search input wired in yet; `verified_by_human` gate stays required regardless
- [ ] `pipeline.py` → `site/index.html` export step (deliberately manual — see "Things NOT to do" in `CLAUDE.md`)

## Tweet-feed / X automation
- [x] Position-based formatter (GK/DEF/MID/FWD) — tested, matches the Osimhen reference example exactly
- [x] Current 38-player pool config (`server/src/config/pool.js`)
- [x] Mock provider, weekly recap aggregation, dry-run demo (`npm run demo`, `npm run recap`)
- [x] Scheduled GitHub Actions workflow for the weekly recap (Monday morning Spain time — see `anonymity-opsec.md`)
- [ ] Real stats-provider integration — **nothing auto-posts until this exists**; today's Adeniran/LASK-Celtic line was hand-drafted through the real formatter as a one-off, not pulled from a live feed
- [ ] Real X API credentials + posting-tier decision (check current pricing/limits before committing to a cadence)
- [ ] `@SuperEaglesTrkr` account setup per `anonymity-opsec.md` — account is live (Issue №1 posted), but dedicated-email/no-personal-photo/2FA compliance hasn't been confirmed here, so leaving this open rather than assuming
- [x] First live post — Issue №1 posted to X. This was a manual post of the pre-drafted thread, not the automated stats feed; "Real stats-provider integration" above is still what's needed before anything auto-posts

## Newsletter
- [x] Structure/plan drafted (`newsletter-plan.md`) — built from general newsletter conventions since the Nutmeg Soccer reference page was blocked by network egress in-session; revisit if you paste the actual text in
- [x] Platform account created (beehiiv) — site Subscribe link points to `https://supereaglestracker.beehiiv.com/subscribe`
- [ ] Graphics/video-clip production workflow — not started; needs either manual design each week or a templated approach
- [x] First issue — Issue №1 ("The Origin Issue") posted across newsletter, X, and Instagram

## Editorial / trust
- [x] "This is opinion, not a neutral algorithm" made explicit, site-wide
- [x] `verified_by_human` gate preserved for eligibility claims specifically — kept conceptually separate from ranking judgment calls, which are allowed to be subjective
- [ ] Adeniran's new Big Board rank — still open, awaiting the project owner's ranking call (no fixed date; the pool ranking is still being sorted)

## Anonymity / ops-sec
- [x] Scope decided: public-facing only, not the private repo
- [x] Posting-time misdirection (Spain mornings) designed and scheduled
- [x] GitHub account renamed in place (`rickauamarshall`) — repo-level, so lower priority under the scope above anyway
- [x] Domain WHOIS privacy enabled by default through Cloudflare Registrar for `supereaglestracker.com`; registrar auto-renew is enabled and the domain is transfer-locked during its initial registration period

## Repo / infra
- [x] `naija-2030` repo created on GitHub (by the project owner)
- [x] Full project content transcribed and pushed by a Claude Code session sourced directly from this repo, after the originating session's credentials (pinned to the account's pre-rename name) couldn't reach it
- [x] CI (tests + data validation), Dependabot, `SECURITY.md`
- [ ] A future session's GitHub scope pointed at `rickauamarshall` from the start, so the cross-account push problem doesn't recur

### Current source-audit gaps

The following records still need identity/profile-level confirmation before a player-specific link is added: Isaac James, Samuel James, Victory Akpe, Abdullahi Bewene, and Chizzy Ezenwata. Do not substitute a same-name result or a generic search page.
