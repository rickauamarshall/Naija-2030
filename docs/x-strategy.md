# X strategy & weekly content calendar

Cross-platform monitoring and the Instagram workflow are defined in [`social-editorial.md`](social-editorial.md). This document remains the X-specific calendar and content-pillar reference.

## Positioning

Super Eagles Tracker is a data-forward, receipts-first fan account — not a hot-takes account, not an NFF mouthpiece, not an anonymous complaint page. The voice earns trust the same way the site does: numbers first, sourced, transparent about what's verified vs. not. That's also what makes it *hard to dismiss* — the whole point of "legitimacy for leverage" is that a federation, a journalist, or a rival account can't wave it away as noise. Every post should survive the question "could this be screenshotted and stand up?"

Bio-level framing (site footer already sets the tone, mirror it in the X bio): *fan-built, independent tracker of Nigeria's best-available Super Eagles pool. Not affiliated with the NFF, CAF, or FIFA.* Say this once, clearly, and don't relitigate it in every post — but never let a post imply official status either.

**Also make the opinion explicit in the bio, not just the site.** Now that `site/index.html`'s Methodology tab says plainly that rankings are editorial judgment informed by (not dictated by) the composite score, the X bio should carry the same framing in short form — e.g. *"One fan's Super Eagles pool rankings, not a neutral algorithm. Data-informed, not data-dictated."* Keeps the account inside "commentary" rather than "purporting to be authoritative fact," which matters both for credibility (nobody can accuse it of hiding the ball) and for how defensible it is if a ranking call gets pushback.

## Handle & site link

Handle: **@SuperEaglesTrkr**. The site's ticker bar now links out to it (`site/index.html`); once the site has a real hosted URL, add it to the X bio and pin a link-out post — the two should point at each other from day one, not be introduced separately.

## Content pillars

1. **Live match-day performance feed (the core function).** After every match involving a pool player, post the stat-line — this is what `server/` automates. High frequency, low effort per post, and it's the thing that makes the account *useful* to follow, not just opinionated. This is the account's spine; everything else hangs off the audience it builds.
2. **Weekly recap.** A Monday thread or single post summarizing the week: standout stat-lines, and once the ranking pipeline exists, Big Board movers/fallers. Links back to the site. This is also the raw material for the newsletter (see `newsletter-plan.md`) — write it once, ship it twice.
3. **Eligibility alerts.** The single best differentiator this account has. When a dual-national's status changes — a youth call-up elsewhere, a senior debut that cap-ties them, a "yes" or "no" signal — that's urgent, shareable, and exactly the kind of thing that gets picked up by bigger accounts and journalists. This is where "leverage" actually comes from: being first and correct on a story nobody else is tracking full-time. **Hard constraint from CLAUDE.md: never post a status change (OPEN/WATCH/TIED) that hasn't cleared the `verified_by_human` gate.** Being fast is worthless if you're also the account that got a minor's eligibility wrong.
4. **Spotlight / deep-dive threads.** Periodic (roughly biweekly) long-form threads: one player, one position group ("Nigeria's fullback options for 2030"), or one explainer ("how cap-tying actually works, and who's close to losing eligibility"). This is what tends to travel beyond the existing follower base — it's shareable on its own merits, not just to people already paying attention to Nigerian football.
5. **Weekend Watch (preview).** Friday post: which pool players have matches this weekend, kickoff times, storylines to watch. Cheap to produce, gives followers a reason to check back Saturday/Sunday, and sets up the live feed's payoff.
6. **Methodology/transparency posts.** Occasional posts explaining how the ranking works, citing the same 40/30/20/10 composite the site's "Methodology" tab publishes. Boring compared to a goal, but this is what separates an advocacy account from a rumor account — show your work, especially when the account starts getting pushback.
7. **Community engagement.** Polls ("who starts up top: Osimhen-Lookman or bring in Ekhator?"), open questions, replies to fans' own scouting takes. This is the "healthy community" half of the goal — the account can't just broadcast, it has to be worth talking *to*.

## Weekly cadence

| Day | Content |
|---|---|
| Event-driven (matchday) | Live stat-line posts as matches finish — not scheduled, driven by `server/`'s poller |
| Monday | Weekly recap (pillar 2) |
| Wednesday | Spotlight/deep-dive thread (pillar 4) — rotate: player deep-dive → position group → explainer → repeat |
| Friday | Weekend Watch preview (pillar 5) |
| Ad hoc, same-day | Eligibility alerts (pillar 3) and reactive NFF/transfer news commentary — these don't wait for a slot |
| Ongoing | 1-2 community/poll posts per week (pillar 7), replies to relevant Nigerian football accounts and journalists |

Newsletter (see `newsletter-plan.md`) ships weekly, timed just after the Monday recap so the thread and the newsletter reinforce each other instead of competing for the same news.

## Growth tactics, roughly in order of leverage-per-effort

1. **Nail the live feed first.** It's the lowest-effort-per-post pillar and the one that gives people a reason to *follow* rather than just see one viral thread. Get `server/` onto a real stats provider before investing heavily in the other pillars.
2. **Engage authentically with existing Nigerian football Twitter** — journalists, other fan accounts, diaspora scouting accounts. Reply with real analysis, not just self-promotion. Credibility compounds through who engages with you, not just follower count.
3. **Let the methodology carry the account's authority.** Every ranking claim should be traceable to the published formula and to real sources (Transfermarkt links, Wikidata items) once `scripts/` is wired up — see CLAUDE.md's "Next steps" item on source links. An account that can always show its work survives its first big public disagreement; one that can't, doesn't.
4. **Cross-promote with the newsletter and vice versa** — the newsletter is a natural pitch to other Nigerian football newsletters/podcasts (the kind of outlet the Nutmeg Soccer example represents) for a mention or swap once there's a few solid issues to point to.
5. **Don't chase engagement-bait.** Hot takes and ragebait grow faster short-term and cost the account's credibility the first time it matters — and credibility is the entire point here, not follower count in isolation.

## What "leverage" should mean in practice

Once there's real traction, the account has earned standing to: get a straight answer or a quote when it asks the NFF or club press officers a direct question; get cited or credited when a journalist picks up an eligibility story it broke first; be a source other Nigerian football media treats as reliable enough to build on. That's the leverage — not virality for its own sake, and not anything that requires being right about who's "to blame," just being the account that was accurate and public about it first.

## Guardrails (see CLAUDE.md for the full hard rules)

- Never post an eligibility status that isn't `verified_by_human: true`.
- Never imply NFF/CAF/FIFA affiliation.
- Never post a real club crest/logo without an actual licensing relationship.
- Every mock/illustrative number posted before `server/` has a real stats provider must be clearly marked as a demo, not shipped as if live.
