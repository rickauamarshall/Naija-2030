# Security policy

This is a private, single-owner repository. There's no public issue tracker for security reports — if you have access to this repo and find a problem (an exposed secret, a dependency vulnerability, a way the site could leak more than intended), raise it directly with the owner rather than opening a public issue.

## Secrets

- No API keys, tokens, or credentials are ever committed to this repo — see `CLAUDE.md`'s hard rules.
- Real values live in `.env` (gitignored) locally, or in the hosting/CI platform's own secret store in deployed environments — never in source, never in a GitHub Actions workflow file directly.
- If a secret is ever accidentally committed: rotate it immediately at the provider (don't just delete the commit — assume it's compromised the moment it's pushed), then remove it from history.

## Dependencies

- Dependabot is configured (`.github/dependabot.yml`) for both the `server/` npm project and the `scripts/` pip requirements, on a weekly schedule.
- GitHub's secret scanning and push protection should be left enabled on this repo (repo Settings → Code security) — push protection blocks a commit containing a recognizable credential pattern before it ever lands in history.

## Data handling

- This project publishes claims about real people, including minors (dual-national eligibility status). See `CLAUDE.md`'s verification gate — this is a correctness/harm issue as much as a security one.
