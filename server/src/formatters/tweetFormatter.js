'use strict';

/**
 * Position-based match-performance stat-line formatter.
 *
 * Design rule: only render a stat if it's actually present in `stats`.
 * Different data-provider tiers/leagues expose different fields (xG and
 * key passes are common gaps) — never fabricate a number, just omit the
 * field. See CLAUDE.md "Data vendor decisions."
 */

function pluralize(n, singular, plural) {
  const word = n === 1 ? singular : plural || `${singular}s`;
  return `${n} ${word}`;
}

const POSITION_STAT_FIELDS = {
  FWD: [
    { key: 'goals', label: (v) => pluralize(v, 'goal') },
    { key: 'assists', label: (v) => pluralize(v, 'assist') },
    { key: 'shotsOnTarget', label: (v) => `${v} SOG` },
    { key: 'xG', label: (v) => `xG ${v.toFixed(1)}` },
  ],
  MID: [
    { key: 'goals', label: (v) => pluralize(v, 'goal') },
    { key: 'assists', label: (v) => pluralize(v, 'assist') },
    { key: 'keyPasses', label: (v) => pluralize(v, 'key pass', 'key passes') },
    { key: 'progressivePasses', label: (v) => pluralize(v, 'progressive pass', 'progressive passes') },
    { key: 'passAccuracy', label: (v) => `${v}% passing` },
  ],
  DEF: [
    { key: 'goals', label: (v) => pluralize(v, 'goal') },
    { key: 'assists', label: (v) => pluralize(v, 'assist') },
    { key: 'tacklesWon', label: (v) => pluralize(v, 'tackle won', 'tackles won') },
    { key: 'interceptions', label: (v) => pluralize(v, 'interception') },
    { key: 'clearances', label: (v) => pluralize(v, 'clearance') },
    { key: 'aerialsWon', label: (v) => pluralize(v, 'aerial duel won', 'aerial duels won') },
    { key: 'cleanSheet', label: (v) => (v ? 'clean sheet' : null) },
  ],
  GK: [
    { key: 'saves', label: (v) => pluralize(v, 'save') },
    { key: 'goalsConceded', label: (v) => pluralize(v, 'goal conceded', 'goals conceded') },
    { key: 'cleanSheet', label: (v) => (v ? 'clean sheet' : null) },
    { key: 'savePct', label: (v) => `${v}% save rate` },
  ],
};

/**
 * @param {{name: string, shortClub: string, position: 'GK'|'DEF'|'MID'|'FWD'}} player
 * @param {{opponent: string, competition?: string}} matchContext
 * @param {{minutes?: number, [stat: string]: number|boolean|undefined}} stats
 * @returns {string}
 */
function formatPerformanceTweet(player, matchContext, stats) {
  const fields = POSITION_STAT_FIELDS[player.position];
  if (!fields) {
    throw new Error(`Unknown position "${player.position}" for player "${player.name}" — ` +
      `expected one of GK, DEF, MID, FWD.`);
  }

  const parts = [`${player.shortClub} vs ${matchContext.opponent}`];
  if (matchContext.competition) parts.push(matchContext.competition);
  if (stats.minutes != null) parts.push(`${stats.minutes} minutes played`);

  for (const field of fields) {
    const value = stats[field.key];
    if (value === undefined || value === null) continue;
    const text = field.label(value);
    if (text) parts.push(text);
  }

  return `${player.name}, ${parts.join(', ')}`;
}

module.exports = { formatPerformanceTweet, POSITION_STAT_FIELDS };
