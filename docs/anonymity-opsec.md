# Anonymity / ops-sec checklist

Scope, as decided for this project: **public-facing only.** Nothing here should link the project back to you personally or to your work, in anything a follower, journalist, or the NFF could see. The private GitHub repo, commit history, and this codebase do **not** need identity-scrubbing — that's an explicit, deliberate choice, not an oversight, so don't over-engineer it later without a reason.

## X account

- Sign up with an email dedicated to this project — not a personal or work address.
- X may still require phone verification for posting-tier API access. That number is known to X the company either way; the goal here is keeping it off anything *public*, not achieving anonymity from the platform itself. Worth knowing the difference going in.
- Don't cross-link from a personal account early on — no early follow/like from an account that's identifiable as you, no personal account "vouching" for the new one. Network analysis (who followed/engaged first) is a more common deanonymization vector than people expect.
- No personal photo as the avatar/header.
- Enable 2FA on the account.

## Domain (if/when you buy one)

- Use WHOIS privacy protection — nearly every registrar offers it, sometimes it's on by default. Don't skip checking.
- Register through the project's dedicated email, same as the X account.

## Newsletter platform

- Sender name and reply-to address should be a project alias, not a personal name/email.
- Check what the platform exposes publicly by default (some show a "powered by" or account-holder name in obscure places) before your first send.

## Hosting / GitHub / API accounts

- These are **not** public-facing, so per your call they don't need to be anonymized — using your existing GitHub account (as this repo already does) is fine.
- Still worth enabling 2FA everywhere as basic account hygiene, independent of the anonymity question.

## Content itself

- Write consistently as the project's voice/persona, not "I" in a way that leaks personal details (location, employer, schedule) incidentally through anecdotes.
- Watch for metadata leaks in anything you upload directly (image EXIF data, document author fields) — most platforms strip this automatically, but don't assume it for every tool.

## Posting-time misdirection

Deliberate choice for this project: scheduled content (the weekly "stock rise and fall" report, the newsletter) publishes Monday morning **Spain time**, not whenever it's actually written — a consistent timezone pattern in public timestamps is a real, if soft, signal of where an anonymous account operator actually lives, and this project intentionally points that signal at Spain instead.

- **This only works if it's consistent.** One Spain-timed post a week alongside a bunch of other activity (replies, ad-hoc commentary, community posts) at scattered real-local hours undercuts the pattern rather than reinforcing it — a mismatched cluster of timestamps is itself a tell. If this matters to you, the safest default is to schedule *all* discretionary posting (not just the weekly report) rather than posting live in the moment, and keep it inside a plausible Spain waking-hours window.
- **Live match-reaction tweets are the exception, and they're already safe.** The match-day feed posts right after a game ends, and kickoff times are dictated by the fixture list, not your clock — full-time whistles land at all hours relative to Spain regardless of where you actually are, so there's no consistent pattern to read into those. It's the *discretionary* stuff (recap, newsletter, spotlight threads, polls) that needs deliberate scheduling.
- **Concrete schedule:** "Monday morning Spain time" = 9:00 local. Spain runs CEST (UTC+2) roughly late March–late October and CET (UTC+1) the rest of the year — GitHub Actions cron is UTC-only and doesn't track DST, so `.github/workflows/weekly-recap.yml` is set to `0 7 * * 1` (07:00 UTC Monday), which is correct for CEST. Across the October/March DST boundary it'll land at 8am Spain time instead of 9am until you nudge the cron by an hour — a one-hour drift twice a year is a minor, low-risk tell; fix it if you want precision, but it's not urgent.
- Same logic extends to anything else with a visible public timestamp — GitHub commit times, if this repo or its activity is ever public, follow the same rule if it matters at that point (it doesn't need to today, per the repo-scope decision above).

## If this takes off

Worth revisiting down the line, not now: a business entity (LLC or similar) to hold a domain/payment methods/newsletter-platform billing at more of a remove, if the project starts generating income or the NFF/press start looking into who's behind it. That's a bigger step with real cost and paperwork — flag it as a future decision point, not something to set up preemptively.
