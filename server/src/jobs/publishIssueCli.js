'use strict';

// Usage: node src/jobs/publishIssueCli.js <path-to-issue.md> [--live] [--no-thread]
// Defaults to a dry run (prints what would be posted, posts nothing).
// --live actually creates the beehiiv draft and posts the X thread.
// --no-thread skips the X thread even in --live mode (beehiiv draft only).

const fs = require('fs');
const path = require('path');
const { runPublishIssue } = require('./publishIssue');

const args = process.argv.slice(2);
const filePath = args.find((a) => !a.startsWith('--'));
const dryRun = !args.includes('--live');
const postThread = !args.includes('--no-thread');

if (!filePath) {
  console.error('Usage: node src/jobs/publishIssueCli.js <path-to-issue.md> [--live] [--no-thread]');
  process.exit(1);
}

const markdown = fs.readFileSync(path.resolve(filePath), 'utf8');

runPublishIssue({ markdown, dryRun, postThread })
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error(err.message || err);
    process.exitCode = 1;
  });
