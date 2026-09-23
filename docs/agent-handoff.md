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

