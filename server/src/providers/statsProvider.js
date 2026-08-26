'use strict';

/**
 * Stats provider interface.
 *
 * A real implementation (api-football, sportmonks, etc.) must export an
 * async `getFinishedMatchesForPool()` resolving to:
 *
 *   Array<{
 *     player: { name, shortClub, position: 'GK'|'DEF'|'MID'|'FWD' },
 *     matchContext: { opponent, competition, matchId },
 *     stats: { minutes, ...position-dependent fields, see formatters/tweetFormatter.js }
 *   }>
 *
 * Only include stat fields you actually have data for — the formatter
 * skips anything missing rather than assuming full coverage. Not every
 * plan/league has xG, key passes, or detailed defensive actions. See
 * CLAUDE.md "Data vendor decisions" before picking a provider.
 *
 * `matchId` must be stable and unique per (player, match) — the posting
 * job dedupes against it via server/.state/posted.json.
 */

function getProvider() {
  const providerName = process.env.STATS_PROVIDER || 'mock';
  if (providerName === 'mock') {
    return require('./mockStatsProvider');
  }
  throw new Error(
    `Unknown STATS_PROVIDER "${providerName}". Only "mock" is wired up today — ` +
    `see CLAUDE.md "Data vendor decisions" before adding a real provider.`
  );
}

module.exports = { getProvider };
