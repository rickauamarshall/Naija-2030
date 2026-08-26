'use strict';

// Thin CLI entry so CI/cron can call `npm run recap` without importing
// the module directly. Prints the recap text; doesn't send/post anything
// yet — see .github/workflows/weekly-recap.yml for what's wired up so far.

const { buildWeeklyRecap } = require('./weeklyRecap');

buildWeeklyRecap()
  .then(({ text }) => console.log(text))
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
