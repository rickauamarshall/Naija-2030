# Prelaunch checklist

Living done-vs-outstanding tracker — prefer this over re-deriving status from chat history. Update it whenever something here changes state.

## Site
- [x] Static prototype (`site/index.html`) — pool depth chart, Big Board, staff directory, "Elsewhere," Methodology tabs
- [x] Editorial-stance disclosure (masthead line + Methodology tab "A note on subjectivity") — rankings are opinion informed by the formula, not dictated by it; eligibility badges stay fact-only and human-verified
- [x] Newsletter signup link in the ticker bar — **placeholder URL, not live yet**
- [x] X follow link in the ticker bar (`@SuperEaglesTrkr`)
- [ ] Real hosting + deploy (Netlify/Vercel/Cloudflare Pages/GitHub Pages) — today it's a local file only, nothing to link X to yet
- [ ] Custom domain, if wanted — WHOIS privacy on registration (see `anonymity-opsec.md`)
- [ ] Real view counter backend — current one uses the artifact-preview environment's `window.storage`, which won't exist once actually deployed (flagged in the original handover, still open)
- [ ] Per-player source links (Transfermarkt profile, Wikidata item) so claims are auditable, not just asserted

## Data pipeline
- [x] Wikidata discovery query (`data/nigeria_eligible_scan.rq`) + `fetch_wikidata.py`, runnable today
- [x] `scripts/validate.py` — formalized the dedup/formation-count checks, wired into CI
- [ ] Transfermarkt enrichment — vendor decision pending (community scraper vs. licensed feed, see `CLAUDE.md`)
- [ ] Eligibility classification end-to-end — `classify_eligibility.py` drafts via Claude but has no real news-search input wired in yet; `verified_by_human` gate stays required regardless
- [ ] `pipeline.py` → `site/index.html` export step (deliberately manual — see "Things NOT to do" in `CLAUDE.md`)

## Tweet-feed / X automation
- [x] Position-based formatter (GK/DEF/MID/FWD) — tested, matches the Osimhen reference example exactly
- [x] Full 50-player pool config (`server/src/config/pool.js`)
- [x] Mock provider, weekly recap aggregation, dry-run demo (`npm run demo`, `npm run recap`)
- [x] Scheduled GitHub Actions workflow for the weekly recap (Monday morning Spain time — see `anonymity-opsec.md`)
- [ ] Real stats-provider integration — **nothing auto-posts until this exists**; today's Adeniran/LASK-Celtic line was hand-drafted through the real formatter as a one-off, not pulled from a live feed
- [ ] Real X API credentials + posting-tier decision (check current pricing/limits before committing to a cadence)
- [ ] `@SuperEaglesTrkr` account setup per `anonymity-opsec.md` (dedicated email, no personal photo, no early cross-linking, 2FA)
- [ ] First live post

## Newsletter
- [x] Structure/plan drafted (`newsletter-plan.md`) — built from general newsletter conventions since the Nutmeg Soccer reference page was blocked by network egress in-session; revisit if you paste the actual text in
- [ ] Platform account created (beehiiv or alternative) — blocks the site's Subscribe link from being real
- [ ] Graphics/video-clip production workflow — not started; needs either manual design each week or a templated approach
- [ ] First issue

## Editorial / trust
- [x] "This is opinion, not a neutral algorithm" made explicit, site-wide
- [x] `verified_by_human` gate preserved for eligibility claims specifically — kept conceptually separate from ranking judgment calls, which are allowed to be subjective
- [ ] Adeniran's new Big Board rank — waiting on the project owner's call by the weekend

## Anonymity / ops-sec
- [x] Scope decided: public-facing only, not the private repo
- [x] Posting-time misdirection (Spain mornings) designed and scheduled
- [x] GitHub account renamed in place (`rickauamarshall`) — repo-level, so lower priority under the scope above anyway
- [ ] Domain WHOIS privacy, once/if a domain is bought

## Repo / infra
- [x] `naija-2030` repo created on GitHub (by the project owner)
- [x] Full project content transcribed and pushed by a Claude Code session sourced directly from this repo, after the originating session's credentials (pinned to the account's pre-rename name) couldn't reach it
- [x] CI (tests + data validation), Dependabot, `SECURITY.md`
- [ ] A future session's GitHub scope pointed at `rickauamarshall` from the start, so the cross-account push problem doesn't recur
