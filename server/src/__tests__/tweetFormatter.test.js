'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { formatPerformanceTweet } = require('../formatters/tweetFormatter');

test('formats a forward stat line exactly like the reference example', () => {
  const player = { name: 'Osimhen', shortClub: 'Gala', position: 'FWD' };
  const matchContext = { opponent: 'Fenerbahçe', competition: 'Süper Lig' };
  const stats = { minutes: 87, goals: 2, shotsOnTarget: 5, xG: 1.8 };

  assert.equal(
    formatPerformanceTweet(player, matchContext, stats),
    'Osimhen, Gala vs Fenerbahçe, Süper Lig, 87 minutes played, 2 goals, 5 SOG, xG 1.8'
  );
});

test('omits stat fields missing from the input instead of guessing', () => {
  const player = { name: 'Lookman', shortClub: 'Atleti', position: 'FWD' };
  const matchContext = { opponent: 'Betis', competition: 'La Liga' };
  const stats = { minutes: 62, goals: 1 }; // no SOG/xG available from this feed tier

  assert.equal(
    formatPerformanceTweet(player, matchContext, stats),
    'Lookman, Atleti vs Betis, La Liga, 62 minutes played, 1 goal'
  );
});

test('formats a defender line with a clean sheet', () => {
  const player = { name: 'Bassey', shortClub: 'Fulham', position: 'DEF' };
  const matchContext = { opponent: 'Brentford', competition: 'Premier League' };
  const stats = { minutes: 90, tacklesWon: 3, interceptions: 2, clearances: 4, aerialsWon: 5, cleanSheet: true };

  assert.equal(
    formatPerformanceTweet(player, matchContext, stats),
    'Bassey, Fulham vs Brentford, Premier League, 90 minutes played, 3 tackles won, 2 interceptions, 4 clearances, 5 aerial duels won, clean sheet'
  );
});

test('omits clean sheet entirely rather than printing "false"', () => {
  const player = { name: 'Bassey', shortClub: 'Fulham', position: 'DEF' };
  const matchContext = { opponent: 'Arsenal', competition: 'Premier League' };
  const stats = { minutes: 90, tacklesWon: 1, cleanSheet: false };

  assert.equal(
    formatPerformanceTweet(player, matchContext, stats),
    'Bassey, Fulham vs Arsenal, Premier League, 90 minutes played, 1 tackle won'
  );
});

test('formats a midfielder line', () => {
  const player = { name: 'Iwobi', shortClub: 'Fulham', position: 'MID' };
  const matchContext = { opponent: 'Brentford', competition: 'Premier League' };
  const stats = { minutes: 90, assists: 1, keyPasses: 3, progressivePasses: 6, passAccuracy: 88 };

  assert.equal(
    formatPerformanceTweet(player, matchContext, stats),
    'Iwobi, Fulham vs Brentford, Premier League, 90 minutes played, 1 assist, 3 key passes, 6 progressive passes, 88% passing'
  );
});

test('formats a goalkeeper line', () => {
  const player = { name: 'Okoye', shortClub: 'Udinese', position: 'GK' };
  const matchContext = { opponent: 'Roma', competition: 'Serie A' };
  const stats = { minutes: 90, saves: 4, goalsConceded: 1, cleanSheet: false, savePct: 80 };

  assert.equal(
    formatPerformanceTweet(player, matchContext, stats),
    'Okoye, Udinese vs Roma, Serie A, 90 minutes played, 4 saves, 1 goal conceded, 80% save rate'
  );
});

test('throws on an unrecognized position instead of silently skipping', () => {
  const player = { name: 'Mystery Player', shortClub: 'FC', position: 'AM' };
  assert.throws(() =>
    formatPerformanceTweet(player, { opponent: 'X', competition: 'Y' }, { minutes: 10 })
  );
});
