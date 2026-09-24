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

