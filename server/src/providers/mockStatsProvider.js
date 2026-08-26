'use strict';

const { POOL } = require('../config/pool');

function findPlayer(name) {
  const p = POOL.find((pl) => pl.name === name);
  if (!p) throw new Error(`Unknown pool player "${name}" — add them to src/config/pool.js first.`);
  return p;
}

// Illustrative fixture data — mirrors site/index.html's own "ILLUSTRATIVE
// SAMPLE DATA" labeling convention. Swap for a real provider by setting
// STATS_PROVIDER in .env once a data-vendor decision is made.
const FIXTURES = [
  {
    player: findPlayer('Osimhen'),
    matchContext: { opponent: 'Fenerbahçe', competition: 'Süper Lig', matchId: 'demo-osimhen-1' },
    stats: { minutes: 87, goals: 2, shotsOnTarget: 5, xG: 1.8 },
  },
  {
    player: findPlayer('Bassey'),
    matchContext: { opponent: 'Brentford', competition: 'Premier League', matchId: 'demo-bassey-1' },
    stats: { minutes: 90, tacklesWon: 3, interceptions: 2, clearances: 4, aerialsWon: 5, cleanSheet: true },
  },
  {
    player: findPlayer('Iwobi'),
    matchContext: { opponent: 'Brentford', competition: 'Premier League', matchId: 'demo-iwobi-1' },
    stats: { minutes: 90, assists: 1, keyPasses: 3, progressivePasses: 6, passAccuracy: 88 },
  },
  {
    player: findPlayer('Okoye'),
    matchContext: { opponent: 'Roma', competition: 'Serie A', matchId: 'demo-okoye-1' },
    stats: { minutes: 90, saves: 4, goalsConceded: 1, cleanSheet: false, savePct: 80 },
  },
];

async function getFinishedMatchesForPool() {
  return FIXTURES;
}

module.exports = { getFinishedMatchesForPool };
