'use strict';

// Runs both jobs against the mock provider in dry-run mode — no credentials
// needed. This is what `npm run demo` calls; use it to see exactly what the
// bot would post before ever wiring up real API keys.

const { runMatchdayPoll } = require('./matchdayPoll');
const { buildWeeklyRecap } = require('./weeklyRecap');

async function main() {
  console.log('=== Match-day tweet feed (dry run, mock provider) ===\n');
  const results = await runMatchdayPoll({ dryRun: true });
  for (const r of results) {
    console.log(`[would post] ${r.text}`);
  }

  console.log('\n=== Weekly recap (mock provider) ===\n');
  const { text } = await buildWeeklyRecap();
  console.log(text);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
