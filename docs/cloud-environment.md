# Cloud environment

This project uses the repository as the shared source of truth. Claude and Codex may run in different sandboxes; the reproducible development environment is for Codex, future human contributors, and CI—not a shared live filesystem.

## Development environment

The checked-in `.devcontainer/` definition provides:

- Node.js 20 for `server/`.
- Python 3.12 for `scripts/`.
- A post-create setup that installs the locked Node dependencies and runs validation and Python syntax checks.

GitHub Codespaces can create this environment directly from the repository. A contributor should pull `main`, open the Codespace, and then use the handoff protocol in `docs/agent-handoff.md`. Do not open two simultaneous editing sessions against the same working tree.

## CI and deployment boundaries

GitHub Actions remains the automated verification layer:

- `ci.yml` runs Node tests, site-data validation, and Python syntax checks.
- `pages.yml` deploys the static site to GitHub Pages after approved changes reach `main`.
- `weekly-recap.yml` remains mock-only until a licensed stats provider and an approved delivery design exist.

The static site does not need a VPS or always-on server. A separate runtime should be introduced only when the project has a real need for a database, live stats ingestion, or a backend service that GitHub Pages cannot provide.

## Production publishing boundary

Live publishing should eventually run only from a protected GitHub Actions `production` environment:

1. Create a `production` environment in repository settings.
2. Set the required reviewer to the project owner’s human GitHub account. Do not use an agent, bot, or service account as the publication approver.
3. Store Beehiiv, X, and any future provider credentials as environment secrets—not repository files, Codespaces secrets, or `.env` files used for live publishing.
4. Add a workflow job that references `environment: production` and invokes the publisher only after the environment approval is granted.
5. Keep Beehiiv draft creation and X posting as separately visible steps so a human can approve the intended issue and thread together.

Until that workflow exists, local `.env` is for dry-run development only. Never run `--live` from a local checkout or Codespace as part of normal operations.

## Required safeguards

- No credential values belong in this repository or in handoff notes.
- Do not configure live secrets as part of a code commit.
- Keep `--live` unavailable to validation and pull-request workflows.
- Require passing CI before production approval can be requested.
- Keep eligibility claims human-gated even when other publication steps become automated.
