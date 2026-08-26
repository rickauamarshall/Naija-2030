'use strict';

const { getProvider } = require('../providers/statsProvider');

function goalContribution(stats) {
  return (stats.goals || 0) + (stats.assists || 0);
}

/**
 * Builds a weekly recap from the current provider's finished matches.
 *
 * NOTE: this only summarizes match performances, not Big Board rank
 * movement — that needs the ranking-recompute pipeline described in
 * CLAUDE.md's "Next steps" (scripts/pipeline.py), which isn't built yet.
 * Once it exists, fold movers/fallers in here too.
 */
async function buildWeeklyRecap() {
  const provider = getProvider();
  const performances = await provider.getFinishedMatchesForPool();

  const ranked = [...performances].sort(
    (a, b) => goalContribution(b.stats) - goalContribution(a.stats)
  );

  const lines = ranked.map(({ player, matchContext, stats }) => {
    const contribution = goalContribution(stats);
    const tag = contribution > 0 ? ` (${contribution} G/A)` : '';
    return `- ${player.name} vs ${matchContext.opponent} (${matchContext.competition}): ${stats.minutes}' played${tag}`;
  });

  const text = [
    'NAIJA26 Weekly Recap',
    '',
    ...lines,
    '',
    'Full pool + Big Board movement: [site link]',
  ].join('\n');

  return { performances: ranked, text };
}

module.exports = { buildWeeklyRecap };
