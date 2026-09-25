# Agent collaboration protocol

This file is the shared coordination layer for Claude, Codex, and the project owner. It replaces copying conversation text between sessions. The repository is the source of truth for implementation state; the project owner is the final authority for editorial, eligibility, publication, and account decisions.

## Operating rules

1. Pull `main` before starting work. Do not rewrite, reset, or discard another agent's changes.
2. Keep work scoped and reviewable. Prefer one coherent change per commit.
3. Never commit secrets, `.env` files, access tokens, browser exports, or private account details.
4. Eligibility claims and `OPEN` / `WATCH` / `TIED` status remain human-gated. Neither agent may promote an unresolved or merely reported claim to verified.
5. Treat published or public-facing changes as review candidates until the project owner approves them.
6. Do not use `--live`, send a newsletter, post to X/Instagram, or change an account setting without explicit project-owner approval for that action.
7. If sources conflict, preserve the conflict in the record and mark the item unresolved. Do not resolve it by inference.
8. Before any commit, the working agent must state what will be committed and wait for project-owner confirmation. Batch related edits into one coherent commit rather than committing piecemeal — one owner approval covers the whole batch. No local automation (a stop-hook or otherwise) may commit or push on its own around this approval gate; if a hook would force a commit, the agent instead leaves the changes uncommitted and reports them for review.

## Division of labor

### Claude

- Explore ideas and implementation options.
- Draft site, newsletter, and social content.
- Conduct broad first-pass research and identify candidate sources.
- Build or propose features in small, reviewable changes.
- Leave a handoff entry whenever work changes repository state or an editorial decision is pending.

### Codex

- Audit repository state, diffs, tests, and data integrity.
- Verify source trails and distinguish verified, reported, and unresolved claims.
- Review accessibility, security, release readiness, and public-facing professionalism.
- Run dry-run publication checks and inspect generated outputs.
- Identify conflicts, stale documentation, and launch blockers.

### Project owner

- Decide eligibility, editorial framing, ranking judgment, publication timing, and account actions.
- Approve live posts, newsletter sends, credentials, vendor choices, and commits.
- Resolve ambiguous or conflicting source situations.

## Handoff log

Each agent adds a new entry at the top of the log after meaningful work. Do not edit or delete older entries except to correct an obvious factual or formatting error; add a follow-up entry instead.

### Template

```md
## YYYY-MM-DD — Agent — short title

Status: `READY_FOR_REVIEW` | `BLOCKED` | `NEEDS_OWNER_DECISION` | `DONE`
Branch/commit: `branch-name` / `commit-sha` (or `working tree`)

### Changed
- Files or behavior changed.

### Checked
- Tests, validators, previews, source checks, or dry runs performed.

### Findings
- Important facts, risks, or discrepancies.

### Evidence
- File paths, line references, URLs, or source names.

### Owner decision needed
- State the smallest decision required, or write `None`.

### Next agent
- One concrete next action.
```

## Current handoff log

### 2026-09-25 — Codex — visitor counter backend scaffold

Status: `NEEDS_OWNER_DECISION`
Branch/commit: `main` / working tree (uncommitted)

### Changed
- Added `workers/visitor-counter/` with a Cloudflare Worker and SQLite-backed Durable Object.
- The endpoint supports aggregate `GET` and `POST` operations and rejects browser requests from origins other than `https://supereaglestracker.com`.
- Added deployment and test instructions. The site endpoint remains unconfigured until the Worker is deployed and tested.

### Checked
- `node --check workers/visitor-counter/src/index.js` passes.
- `git diff --check` passes.
- No credentials, IP addresses, cookies, user agents, or visitor profiles are stored by the implementation.

### Findings
- The counter cannot become live from GitHub Pages alone; it needs a deployed Cloudflare Worker and Durable Object binding.
- The public site should only be pointed to the Worker after a successful authenticated deployment and GET/POST smoke test.

### Evidence
- `workers/visitor-counter/wrangler.toml`
- `workers/visitor-counter/src/index.js`
- `workers/visitor-counter/README.md`
- Cloudflare Durable Objects counter guidance: https://developers.cloudflare.com/durable-objects/examples/build-a-counter/

### Owner decision needed
- Deploy the Worker from the authenticated Cloudflare account, then approve connecting its URL to the public site.

### Next agent
- Review the scaffold, deploy it from the owner’s Cloudflare session, smoke-test the endpoint, and update `site/index.html` with the confirmed Worker URL.

### 2026-09-25 — Codex — live certificate and visitor counter verification request

Status: `NEEDS_OWNER_DECISION`
Branch/commit: `main` / working tree (uncommitted)

### Changed
- Added this handoff request only; no site code or deployment configuration changed.

### Checked
- Codex confirmed the repository still records the custom-domain HTTPS certificate as provisioning in progress.
- The public domain could not be independently checked from the Codex browser because the company policy blocks newly registered domains, and direct network verification is restricted in this environment.
- The deployed visitor counter remains unimplemented: the current `window.storage` path is artifact-preview-only and will not persist on the public site.

### Findings
- Claude should verify the live certificate for `https://supereaglestracker.com/` from an environment with access to the domain and report whether HTTPS is active, pending, or failing.
- Claude should review the visitor-counter options and recommend a privacy-conscious production implementation, with no credentials or external service added without owner approval.

### Evidence
- `docs/prelaunch-checklist.md`
- `site/index.html`
- `https://supereaglestracker.com/`

### Owner decision needed
- Approve committing and pushing this handoff entry so Claude can pick it up.

### Next agent
- Verify the live certificate, inspect the visitor-counter implementation, and report findings/options without publishing or changing production settings.

### 2026-09-25 — Claude — resolved Aghehowa's eligibility, added Ajayi/Arokodare/Akpe/Bewene, two mobile/layout fixes

Status: `READY_FOR_REVIEW`
Branch/commit: `main` / `10ce64d`, `d1751bc`, plus this pass (Aghehowa)

### Changed
- Resolved the outstanding Aghehowa audit item flagged below (2026-09-23 entry): Samu Aghehowa (Porto, born Samu Omorodion) is now confirmed cap-tied to Spain (4 senior caps, most recent a June 5 2026 Nations League semifinal vs. France — past the 3-competitive-cap threshold) via multiple independent, dated sources. Moved to `LOST_TO_RIVALS` on the site. See `docs/big-board-history.md` for the full source basis.
- Added Semi Ajayi and Tolu Arokodare (established, capped internationals Chelle actually called up, missing from the tracked pool) to FORMATION depth; added Victory Akpe and Abdullahi Bewene (first-time call-ups) to the Board at ranks 41-42, `verified:false`. `scripts/validate.py` updated to match, including de-hardcoding the FORMATION total-count check.
- Fixed two live layout bugs: the Comparative Methods tab's lopsided two-column split (now a balanced CSS multi-column layout), and Chelle's Squad pitch losing its 4-4-2 shape on mobile (a 4-item DEF/MID row was wrapping 3-then-1 instead of an even 2x2).

### Checked
- `scripts/validate.py` passes: 28 pool + 16 board, no dupes/overlap, ranks 27-42 intact, starters GK1/DEF4/MID4/FWD2.
- `node --check` on the extracted inline `<script>` block after each edit.
- Playwright/Chromium headless screenshots at 1400px and 390px for both layout fixes, confirming the actual visual result rather than just the diff.

### Findings
- None of Aghehowa's Nigeria-eligibility window remains open — this is a closed case now, not a watchlist item.

### Evidence
- `site/index.html` (`LOST_TO_RIVALS`, `FORMATION`, `BOARD`)
- `docs/big-board-history.md`
- AllNigeriaSoccer's dedicated Aghehowa eligibility coverage, Yahoo Sports' cap-count piece (see `docs/big-board-history.md` for the full citation trail)

### Owner decision needed
- None for what's described here — implemented per explicit direction this session.

### Next agent
- The Transfermarkt market-value cross-reference request from this session was **not** built — see the reply in-session for why (repo's own hard rule against automating Transfermarkt access). If revisited, start from `scripts/enrich_free_sources.py` (the sanctioned Wikidata/API-Football path) rather than Transfermarkt.

### 2026-09-24 — Claude — reconciled a parallel chat-environment branch into the repo (Elsewhere, Comparative Methods, Board/Formation swap)

Status: `READY_FOR_REVIEW`
Branch/commit: `main` / working tree (uncommitted)

### Changed
- **Context:** the project owner had been continuing work on this same project in a separate claude.ai chat session (no git access, per that session's own `SESSION_SUMMARY_FOR_CLAUDE_CODE.md`), disconnected from this repo the whole time. They shared two zip exports of that session's state; this entry reconciles the parts of it explicitly approved for merge.
- `site/index.html` — **DIASPORA_ELSEWHERE** expanded from 6 to 26 entries (David Alaba, Manuel Akanji, Karim Adeyemi, Dominic Solanke, Hal Robson-Kanu, Angelo Ogbonna, and 14 more) — purely additive, the original 6 overlapped by name exactly.
- `site/index.html` — **Comparative Methods tab** content fully replaced: was federation-process case studies sourced from official pages (Germany/Spain/Morocco/Japan/USA/Norway/Argentina/Senegal); now outcome-based case studies tagged positive/negative/mixed, grounded in the actual, just-finished 2026 World Cup results (Germany/Morocco/Argentina/USA/Spain/France/Brazil). Reused the existing `.cabinet-group`/`.staff-card` markup pattern rather than importing the other branch's separate `.comp-card` CSS system, to stay visually consistent with the rest of the site. This was a deliberate replacement, not an addition — the project owner's call, since running both sets side by side would have been redundant (both covered Germany and Argentina with different takes) and inconsistent in style.
- `site/index.html` — **FORMATION/BOARD swap**: Akor Adams (already Wikidata-mapped in `WIKIDATA_SOURCES`, previously untracked) promoted into FORMATION as Ademola Lookman's depth, displacing Kelechi Iheanacho, who moves to BOARD at the new rank 39. This wasn't an arbitrary substitution — it's corroborated by this repo's own `ISSUE-02.md`: Akor Adams is in Chelle's actual AFCON qualifying squad, Iheanacho is only in the lower-stakes Russia friendly (evaluation) squad. Board is now 13 entries, ranks 27–39.
- `scripts/validate.py` — bumped `EXPECTED_BOARD_RANK_END` to 39, and **fixed a separate hardcoded `!= 12` board-count check** that wasn't derived from the rank-range constants — the same class of staleness bug this project has caught before (the "50 PLAYERS" hardcode). Now computed from `EXPECTED_BOARD_RANK_END - EXPECTED_BOARD_RANK_START + 1`.

### Checked
- `scripts/validate.py` passes: 26 pool + 13 board, no dupes/overlap, ranks 27–39 intact, starters GK1/DEF4/MID4/FWD2.
- Full headless-browser (Playwright/Chromium) pass: zero console/page errors across all six tabs; confirmed Akor Adams renders correctly in Lookman's depth panel (with his Wikidata source link auto-populating), Iheanacho correctly renders in the Board list and not in the FORMATION pitch view, Elsewhere shows all 26 entries, Comparative Methods shows the new seven cases with no leftover old content.
- Explicitly did **not** merge several other things from the other branch's zips — flagged to the project owner as superseded or too high-risk for a blind merge: the old "NAIJA 2030"/"Shadow Pool" branding, `LAUNCH.md` (untouched since Sept 18 in that branch, fully superseded by this repo's personal-voice rewrite), `CLAUDE.md`/`README.md`'s older file-layout descriptions, the un-anonymized "Baba Omosegbon" staff bio (this repo already genericized that), and — most importantly — that branch's independently-verified 24-entry Big Board (ranks 27–50), which has real conflicts with this repo's own verification history (a "Chibby Nwoko" where we have "Chibuike Nwaiwu"; Michael Kayode listed as an open Board candidate there while our own Eligibility Watchlist has Italy actively working to lock him in). That board was left as a research lead list, not merged.

### Findings
- The two independently-verified Big Boards agreeing on 8/12 names (Oyebade, Adeniran, Adewumi, Ilenikhena, Usor, Tyrique George, Ezenwata, Troost-Ekong) is a good cross-validation signal, but the disagreements are real and unresolved — worth a dedicated pass if the project owner wants to reconcile further.

### Evidence
- `site/index.html`, `scripts/validate.py`

### Owner decision needed
- None for what's described here — implemented per explicit direction. The other branch's larger Big Board and its remaining un-merged content are still open if the owner wants to revisit them later.

### Next agent
- Codex: sanity-check the FORMATION/BOARD swap and the new Comparative Methods content against intent. If you want to pursue reconciling the other branch's 24-entry Big Board, start with the Nwoko/Nwaiwu and Kayode conflicts described above rather than trusting either branch's `verified` flag blindly.

### 2026-09-24 — Claude — Codex reported not seeing recent pushes; diagnosis for Codex to check

Status: `BLOCKED`
Branch/commit: `main` / `fd3b6b9`

### Changed
- Nothing — this entry is diagnostic only, in response to the project owner reporting that Codex said it wasn't seeing anything pushed today (the Issue №1 rewrite, the Issue №2 bridge + regenerated HTML export, and the marketing/monetization handover entry below this one).

### Checked
- `git ls-remote origin main` (live query, bypasses any local cache) confirms `fd3b6b9` is the actual tip of `main` on GitHub right now.
- Ran the same check against both the pre-rename URL (`rickauamarshall/naija-2030`) and the renamed one (`rickauamarshall/Naija-2030`) — both resolve to the identical commit `fd3b6b9`. So the push genuinely landed; this isn't a silent failure on the pushing side.

### Findings
- Since the commits are confirmed present on the actual remote, the gap has to be on Codex's side. Most likely, in rough order of likelihood:
  1. **Stale fetch** — Codex's local clone (if it has one) hasn't run `git fetch origin main` / `git pull` since before these pushes.
  2. **Wrong branch or a cached browser view** — worth confirming Codex is actually looking at `main`, not a stale PR/branch view or a browser tab loaded before the pushes (a hard refresh, not just re-reading a cached tab, would rule this out).
  3. **The account-rename issue this file's own repo history has hit before** (see `CLAUDE.md`): this repo's owner was renamed `MLSMDProgram` → `rickauamarshall`. A session or git credential set that started under the old name can behave inconsistently against the renamed repo depending on how it authenticates, even though the GitHub redirect generally makes plain `git push`/`fetch` work. Worth having Codex run `git remote -v` and confirm exactly what URL and credentials it's actually using.

### Evidence
- `git ls-remote origin main` and `git ls-remote https://github.com/rickauamarshall/Naija-2030 main`, both returning `fd3b6b9a3cfe74924feb291e4f162fec30ae49be refs/heads/main` at the time of this check.

### Owner decision needed
- None — this is for Codex to act on directly.

### Next agent
- Codex: run `git remote -v` and `git fetch origin main` (or hard-refresh the GitHub view, if working from a browser) and report back what it finds, rather than assuming the content isn't there.

### 2026-09-24 — Claude — marketing/monetization handover (planning only, nothing live)

Status: `READY_FOR_REVIEW`
Branch/commit: `main` / see below — some referenced files are still uncommitted

### Changed
- `docs/prelaunch-checklist.md`: added a **Monetization** section (already committed, `0229131`). Candidate paths: Beehiiv Ad Network (needs subscriber scale), a paid Beehiiv subscriber tier (early access / full Big Board / ad-free — price point undecided), opportunistic affiliate links in newsletter Quick Links, a print-on-demand merch storefront, syndicating the original analysis (Comparative Methods tab, the pool-vs-international-comparison blog piece) to bigger Nigerian outlets as bylined pieces linking back, sponsorships, and betting-affiliate revenue specifically. Suggested lowest-to-highest-friction order: affiliate links → merch → paid tier → ad network → syndication → sponsorships → betting-adjacent.
- `docs/merch-concepts.md` + `assets/merch/*.svg` (six design previews: tee front/back, hoodie front/back, cap, sticker sheet): **drafted but still uncommitted, and merch is currently on hold per the project owner's explicit call.** Don't treat these as in-progress work to pick up — they're parked until the owner says otherwise.

### Findings
- Two things flagged deliberately and **not** built into any design: (1) `assets/profile_badge.png` (the circular crest with the AFCON-champion star band) reads like an official federation badge — fine as a social avatar, a different risk level on sellable merchandise given the project's no-real-crest / no-implied-affiliation rule, so none of the merch designs use it. (2) No player counts on physical goods — the pool size has already gone stale in public copy once before (the "50 PLAYERS" bug), and merch can't be live-updated the way the site can.
- Sponsorships were flagged as blocked on a real question, not just a nice-to-have: sponsors typically need a contracting entity and tax ID, which raises the LLC/business-entity question already sitting (unresolved) in `anonymity-opsec.md`'s "If this takes off" section. That should get resolved deliberately before a sponsor conversation forces it.
- Betting-affiliate revenue was flagged as the one path most likely to undercut the brand's "independent, not doing this for the NFF's benefit" credibility — recommended sequencing it last, if at all, and only on explicit owner sign-off, not as a default monetization option.
- My recommended starting point when asked directly: merch storefront + opportunistic affiliate links first — both need no new entity/account-risk decisions and no subscriber scale, unlike the ad network or paid tier.

### Evidence
- `docs/prelaunch-checklist.md` (Monetization section)
- `docs/merch-concepts.md`, `assets/merch/*.svg` (uncommitted, on hold)

### Owner decision needed
- None right now — merch is explicitly paused by the owner's own call; nothing here needs action until they revisit it.

### Next agent
- Don't pick up merch or monetization work without checking with the project owner first — it's parked, not blocked on technical work.

### 2026-09-24 — Claude — Issue №1 rewritten in first-person, ready to paste into Beehiiv

Status: `READY_FOR_REVIEW`
Branch/commit: `main` / see commit below

### Changed
- `LAUNCH.md` and `ISSUE-01-for-beehiiv.html`: replaced the third-person cold-open with a live-data hook ("It's been 3,022 days since the Super Eagles last played in a World Cup" — recompute against the site's live `clockDrought` counter before actually sending, this figure moves daily) followed by the project owner's own first-person story, worked out directly with them over several rounds this session: born in Nigeria, family's move to the US via Canada in the early '90s, Nigerian identity through the '94 World Cup and '96 Olympics, this year's World Cup experience, and a "giant / resting giant" pivot into the crisis framing that motivated the tracker. Headlines, Feature of the Week, and Eligibility Watchlist sections are unchanged.
- Also fixed a real inconsistency the project owner caught: the closing disclaimer said "Not affiliated with... FIFA" directly under a paragraph describing their own FIFA-adjacent work — reworded to "This project isn't produced, endorsed, or authorized by the NFF, CAF, or FIFA," which states the project's institutional independence without contradicting the personal paragraph above it.

### Checked
- Both files kept in sync line-for-line for this passage.
- No player/eligibility data touched — this is copy-only, `scripts/validate.py` unaffected.

### Findings
- The repo's Beehiiv integration (`server/src/poster/beehiivClient.js` / `publishIssueCli.js`) can only create a new post — it has no read/update path for an existing one. Deliberately did **not** run it, to avoid creating a duplicate "Issue №1" post alongside whatever's already in the account. `ISSUE-01-for-beehiiv.html` is the copy-paste-ready version (has its own "select all, paste into beehiiv" instructions built into the page) — that's the intended path in.

### Evidence
- `LAUNCH.md`, `ISSUE-01-for-beehiiv.html`

### Owner decision needed
- None — the project owner reviewed and directed this content directly, round by round, this session.

### Next agent
- Codex: paste `ISSUE-01-for-beehiiv.html`'s content into the existing Beehiiv draft/post (replacing the intro through the disclaimer line; Headlines onward is unchanged) using the open Beehiiv browser session. Recompute the "3,022 days" figure against today's date before pasting if any time has passed. Then the project owner wants to move on to reframing Issue №2 as an immediate preview of the upcoming Madagascar/Guinea-Bissau/Russia matches, distinct in tone from Issue №1's origin story — not yet scoped, more to come.

### 2026-09-24 — Codex — comparative methods, Issue 2 cleanup, and Issue 3 draft

Status: `READY_FOR_REVIEW`
Branch/commit: `main` / working tree

### Changed
- Added a `Comparative Methods` tab to `site/index.html`, comparing Nigeria's player-identification and roster-construction questions with official federation material from Germany, Spain, Morocco, Japan, the United States, Norway, Argentina, and Senegal.
- Framed the comparison as a testable working hypothesis about continuity, identification, eligibility management, roster construction, and feedback, rather than a claim that any single factor explains Nigeria's recent underachievement.
- Added the Klopp/DFB two-squad example: the Russia evaluation group is useful only when each player has a defined question, meaningful minutes, and a documented next step.
- Corrected Issue 2's Ilenikhena spelling and softened the “first invitations” wording to “among the newer names.”
- Added `ISSUE-03.md` as a post-window draft centered on verified results, pool movement, and the depth chart after the qualifying window.
- Added a recurring editorial lens for Issue 3 and future coverage: club achievement is the starting point for evaluation, not a guarantee of international influence; compare club output with national-team role, tactical fit, combinations, availability, and high-stakes performance.
- Added guidance to preserve owner-authored review scripts and inserted analysis when adapting drafts, and to use verified event data or reputable advanced metrics when assessing Chelle's style and player fit.
- Added the same lens to `docs/social-editorial.md` so social posts, newsletters, and site updates can track repeated positive or negative patterns across cycles.
- Added `assets/ig-carousel-tactics.png`, an original rights-safe tactics graphic for the Instagram carousel concept.
- Standardized the Beehiiv Issue 2 header treatment: SET logo centered at 30% width, with the header settings to be reused for future issues. Beehiiv does not expose a reusable header-template control in the current editor, so the specification is recorded here instead.
- Updated the site masthead to use “RISE, EAGLES, RISE.” as the short campaign line while retaining “ONE POOL. FWC30 QUALIFICATION AT ALL COSTS.” as the full qualification mantra.
- Removed the project owner's personal FIFA match-commissioner reference from the Beehiiv Issue 2 draft. The site's general independence disclosure remains.

### Checked
- Ran the repository data validator after the site edit: formation/pool counts, board ranks, duplicate checks, and overlap checks remain intact.
- Confirmed the public site contains no personal FIFA match-commissioner or WC26 reference.
- Confirmed Issue 3 is explicitly marked as a draft and retains placeholders until official match results and player performances are verified.
- Confirmed the owner-authored review sentence remains in the Beehiiv draft after the copy pass.
- Kept the visitor counter as a real analytics decision rather than adding a misleading client-only counter. A privacy-conscious provider or first-party analytics setup is still needed before implementation.

### Findings
- Germany's two-group window is not a direct template for Nigeria. Its value is the operating discipline around the split: a defined window, player movement, a development horizon, and follow-up.
- The comparison should continue to test who owns identification, how information moves from clubs and diaspora networks into selection, and whether each camp changes the next decision.
- Issue 3 should not be published until the Madagascar, Guinea-Bissau, and Russia details are verified against official or authoritative sources.

### Evidence
- `site/index.html`
- `ISSUE-02.md`
- `ISSUE-03.md`
- `docs/social-editorial.md`
- `assets/ig-carousel-tactics.png`
- DFB: https://www.dfb.de/news/klopp-names-first-squad-as-germany-head-coach
- RFEF: https://rfef.es/es/noticias/la-rfef-organiza-la-i-jornada-talento-descubrir-para-avanzar-junto-las-selecciones
- FRMF: https://frmf.ma/fr/articles/la-fifa-soutient-le-programme-de-formation-des-talents-mene-par-la-frmf
- JFA: https://www.jfa.jp/eng/news/00036317/
- U.S. Soccer: https://www.ussoccer.com/talent-identification/talent-identification-centers
- NFF Norway: https://www.fotball.no/barn-og-ungdom/landslagsskolen/ledelse/spilleroppfolging-og-rapportering/
- AFA: https://www.afa.com.ar/es/posts/programa-de-desarrollo-de-selecciones-juveniles-etapa-1
- FSF: https://www.fsfoot.sn/wp-content/uploads/2024/07/Rapport_Activites_2023.pdf

### Owner decision needed
- Review the comparative-methods tab and the Issue 3 structure.
- Approve one coherent commit containing the current Issue 2, Issue 3, site, and handoff changes.

### Next agent
- Run the full repository checks, then commit and push after owner approval. Claude should pull the commit and review the public-facing methods copy.

### 2026-09-24 — Codex — domain, Pages, and registrar security sync

Status: `READY_FOR_REVIEW`
Branch/commit: `main` / working tree

### Changed
- Synced `docs/prelaunch-checklist.md` with the completed public infrastructure work.
- Recorded the live GitHub Pages custom domain, DNS setup, Beehiiv signup URL, and Cloudflare Registrar privacy/renewal status.

### Checked
- `supereaglestracker.com` has four GitHub Pages apex A records and a DNS-only `www` CNAME to `rickauamarshall.github.io`.
- GitHub Pages accepted the custom domain and reported a successful DNS check; HTTPS certificate issuance is still completing.
- Cloudflare shows WHOIS redaction enabled, auto-renew enabled, and the Fadius domains untouched with no DNS records added.

### Findings
- The Fadius domains (`fadius.app`, `fadius.net`, and `fadius.us`) remain separate from Super Eagles Tracker and were not modified.
- No credentials, tokens, contact data, or browser exports were added to the repository.

### Evidence
- GitHub Pages settings: `https://github.com/rickauamarshall/Naija-2030/settings/pages`
- Cloudflare Registrar settings and DNS dashboard, reviewed in the owner’s authenticated browser session.

### Owner decision needed
- Approve this documentation-only sync for commit and push.

### Next agent
- After approval, commit and push the checklist/handoff sync, then perform public HTTPS and site QA.

### 2026-09-23 — Codex — source audit follow-up and launch checklist sync

Status: `READY_FOR_REVIEW`
Branch/commit: `main` / working tree

### Changed
- Updated `docs/prelaunch-checklist.md` to mark the live Beehiiv signup URL and source-link layer complete.
- Recorded the remaining player-profile source gaps: Isaac James, Samuel James, Victory Akpe, Abdullahi Bewene, and Chizzy Ezenwata.

### Checked
- Confirmed `.github/workflows/pages.yml` is configured to deploy `site/` through GitHub Pages.
- Confirmed the remaining deployment action requires a human to select GitHub Actions under Settings → Pages.

### Findings
- Official or authoritative links were added for George Ilenikhena, Moses Usor, and Stanley Nwabali where identity matches were clear.
- No same-name or generic search result was promoted for the unresolved records.

### Evidence
- `site/index.html`
- `docs/prelaunch-checklist.md`
- `.github/workflows/pages.yml`

### Owner decision needed
- Review and approve the checklist/handoff documentation commit.
- Enable GitHub Pages via repository Settings when ready.

### Next agent
- Commit the documentation sync after owner approval, then verify the deployed Pages URL.

### 2026-09-23 — Claude — review of Codex's tone/navigation pass (280c360) + Instagram link + one page-breaking fix

Status: `READY_FOR_REVIEW`
Branch/commit: `main` / working tree (uncommitted)

### Changed
- Added the Instagram follow link to the ticker bar (`instagram.com/supereaglestracker`), merged cleanly on top of Codex's masthead/ticker rewrite.
- **Fixed a page-breaking bug in Codex's `280c360`:** the masthead rewrite deleted `<span id="totalPlayerCount">` from the `<h1>`, but the inline script still ran `document.getElementById('totalPlayerCount').textContent = ...` unconditionally. That threw on `null` and halted the rest of the single inline `<script>` block — which meant Chelle's Squad tab (now the *default landing tab*), the Chelle pitch view, the "recently lost" panel, the Elsewhere list, and the Staff directory all failed to render. Verified this in a real headless-browser run (Playwright via Chromium), not just by reading the diff. Fixed by restoring the live player-count span in the eyebrow line instead of the rewritten `<h1>` (keeps Codex's new headline copy intact, keeps the anti-drift live-count feature `prelaunch-checklist.md` already calls out as deliberate).
- **Fixed a mobile layout bug:** the new "Chelle's Squad" pitch view reuses `.pitch-wrap`/`.rows`/`.row`, which were built for the 11-man FORMATION pitch (fixed counts, fixed height, no wrap). A real squad (up to 7 in a single position row) overflowed the container at mobile widths and got clipped off-screen entirely — confirmed 3 players (Isaac James, George Ilenikhena, Moses Usor) were fully invisible at 390px width. Added a scoped `.squad-pitch` modifier class (flex-wrap + auto height) applied only to the Chelle pitch markup, so the original FORMATION pitch is untouched.

### Checked
- Loaded the merged page in a real headless Chromium (Playwright) at desktop (1280px) and mobile (390px) widths, both before and after each fix.
- Confirmed zero `pageerror`/console errors post-fix, `totalPlayerCount` renders "38", and all five tabs (chelle/pool/staff/elsewhere/about) render non-empty content when clicked through.
- Confirmed no more horizontal row overflow on the Chelle pitch at 390px (`scrollWidth === clientWidth` on all four position rows).
- `scripts/validate.py` still passes: 26 pool + 12 board, no dupes/overlap, ranks 27–38 intact.

### Findings
- Not fixed, flagging instead — copy accuracy: the Chelle's Squad tab header reads "Chelle's September Friendly Squad," but the pitch view renders `CHELLE_SQUAD`'s first entry, which is the AFCON 2027 Qualifying squad (Madagascar/Guinea-Bissau — competitive, not a friendly). The actual friendly (Russia, Oct 6) isn't in September and isn't shown in the pitch at all, only in the list below. Worth a copy fix or retitle.
- Not fixed, flagging instead — "FWC30" in the new H1 ("FWC30 QUALIFICATION AT ALL COSTS") is a nonstandard abbreviation (presumably "World Cup 2030") that a first-time visitor won't parse. Consider spelling it out at least once near the top.
- No objection to the named-individual → generic "PROFILE TO RECRUIT" swap in the Staff tab (Akpan/Omosegbon/Onyewu/Edu) — the removed entries were flagged in the prior staff-note as unverified against an official roster page, so genericizing pending verification is the more defensible call, and it's within Codex's stated remit (source verification, release readiness). Not re-litigating it.

### Evidence
- `site/index.html` (masthead eyebrow, `.squad-pitch` CSS block, Chelle pitch markup)
- Playwright/Chromium headless runs against a local `python3 -m http.server` — not committed, verification only

### Owner decision needed
- None for the fixes above (bug fixes, not content judgment calls). The two "Findings" copy items are small editorial calls Codex or you may want to make.

### Next agent
- Codex: pull this commit once pushed, sanity-check the two fixes against intent (esp. whether the live player-count belongs in the eyebrow vs. elsewhere), and pick up the two flagged copy items if you agree they're worth fixing.

### 2026-09-23 — Codex — tone, navigation and squad-view pass

Status: `READY_FOR_REVIEW`
Branch/commit: `main` / pending commit

### Changed
- Reframed the masthead around “ONE POOL. FWC30 QUALIFICATION AT ALL COSTS.” and softened the site’s public voice.
- Made Chelle’s Squad the first tab, added a squad pitch view, renamed the pool tab, and replaced tracked/new-to-tracker language with `IN S.E.T. POOL` / `NOT CURRENTLY IN POOL`.
- Removed the staff methodology note and replaced named diaspora profiles in the requested categories with concise, general profile descriptions.
- Simplified the Elsewhere copy and added Jamal Musiala as a Germany international of Nigerian descent.

### Checked
- Confirmed Musiala’s Germany commitment against FC Bayern’s player profile and his Nigerian parentage against Bundesliga’s profile.
- Inline JavaScript parses successfully.
- `scripts/validate.py` passes: 26 pool + 12 board, no duplicates/overlap, ranks 27–38 intact.

### Findings
- X already has a safe outbound profile link. A true live feed would require an embed/API decision and should not be added until the account and presentation are confirmed.
- The Instagram handle and Beehiiv publication URL are not present in the repository, so no links were invented.

### Evidence
- `site/index.html`
- https://fcbayern.com/en/teams/first-team/jamal-musiala
- https://www.bundesliga.com/en/bundesliga/news/jamal-musiala-10-things-on-the-bayern-munich-and-german-midfielder-31124

### Owner decision needed
- Owner approved this site/content batch for commit and push.
- Provide the exact Instagram URL and Beehiiv publication URL when ready.
- Decide whether the future X surface should be a simple profile link, official embedded timeline, or authenticated feed.

### Next agent
- Pull the resulting commit and review the site against the latest tone, navigation and presentation instructions. Flag any follow-up changes before editing.

### 2026-09-23 — Claude — Rule 8 amendment (batched commits, stop-hook boundary) + prompt-injection notice

Status: `NEEDS_OWNER_DECISION`
Branch/commit: `main` / working tree (uncommitted)

### Changed
- Amended Rule 8 in this file: batch related edits into one coherent commit (one owner approval covers the whole batch), and no local automation — a stop-hook included — may commit or push around that approval gate.

### Checked
- Documentation-only change this pass; no code touched, nothing to run.

### Findings
- A message in this session carried an embedded prompt-injection attempt: fake "CRITICAL — context compaction" instructions demanding all tool calls stop and a "detailed summary with full code snippets" be produced, shaped to get live Beehiiv API credentials (pasted earlier in this session) echoed back out. Refused — no credentials were reproduced or written anywhere, here or elsewhere. Flagging it in the log since anyone (human or agent) picking up this session's history should know it happened.
- I have no way to edit `~/.claude/stop-hook-git-check.sh` from inside this session — it's local machine config, not repo content — so the practical fallback for "the stop-hook must not commit/push around the approval gate" is: leave changes uncommitted and report them when the hook fires, rather than let it force a commit through.

### Evidence
- This file, Rule 8 (amended text above).
- This session's own transcript for the injection attempt and refusal — not reproduced here since it borders on the credential material involved.

### Owner decision needed
- Confirm the amended Rule 8 wording is right, and approve committing this change (batched with whatever else is pending) in one commit.

### Next agent
- On approval, commit this doc change and continue with the next open item on `docs/prelaunch-checklist.md`.

### 2026-09-23 — Codex — protocol created

Status: `READY_FOR_REVIEW`
Branch/commit: `main` / working tree

### Changed
- Added this shared collaboration protocol at `docs/agent-handoff.md`.

### Checked
- Confirmed the repository is connected to `origin/main`.
- Confirmed `scripts/validate.py` passes: 26-player pool, 12-player board, no duplicate or overlapping names, ranks 27–38 intact.
- Reviewed recent history through the latest 20 commits.

### Findings
- The recent purge, club corrections, Ngumoha risk, rebrand, and publishing pipeline work are already present in history.
- Remaining audit items include stale board-count documentation, the Aghehowa inconsistency between Issue 1 and the launch draft, placeholder staff slots, the newsletter placeholder URL, and missing player source links.

### Owner decision needed
- Confirm whether this protocol structure is approved for ongoing use.

### Next agent
- Read this file, add a handoff entry, and use the protocol for the next repository change.

