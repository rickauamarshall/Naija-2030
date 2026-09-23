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
8. Before any commit, the working agent must state what will be committed and wait for project-owner confirmation.

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

