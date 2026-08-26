'use strict';

const fs = require('fs');
const path = require('path');

const { getProvider } = require('../providers/statsProvider');
const { formatPerformanceTweet } = require('../formatters/tweetFormatter');
const xClient = require('../poster/xClient');

const STATE_DIR = path.join(__dirname, '..', '..', '.state');
const STATE_FILE = path.join(STATE_DIR, 'posted.json');

function loadPostedIds() {
  try {
    return new Set(JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')));
  } catch {
    return new Set();
  }
}

function savePostedIds(ids) {
  fs.mkdirSync(STATE_DIR, { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify([...ids], null, 2));
}

/**
 * Polls the configured stats provider for finished pool-player matches,
 * formats a stat-line tweet for each, and posts (or dry-runs) it. Dedupes
 * against server/.state/posted.json so re-running the poll on a schedule
 * doesn't double-post.
 *
 * @param {{dryRun?: boolean}} options dryRun defaults to true — callers must
 *   opt in to actually posting.
 */
async function runMatchdayPoll({ dryRun = true } = {}) {
  const provider = getProvider();
  const performances = await provider.getFinishedMatchesForPool();
  const posted = loadPostedIds();
  const results = [];

  for (const { player, matchContext, stats } of performances) {
    if (posted.has(matchContext.matchId)) continue;

    const text = formatPerformanceTweet(player, matchContext, stats);

    if (dryRun) {
      results.push({ matchId: matchContext.matchId, text, posted: false });
    } else {
      await xClient.postTweet(text);
      results.push({ matchId: matchContext.matchId, text, posted: true });
    }
    posted.add(matchContext.matchId);
  }

  if (!dryRun) savePostedIds(posted);
  return results;
}

module.exports = { runMatchdayPoll };
