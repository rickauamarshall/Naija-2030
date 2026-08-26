'use strict';

function isConfigured() {
  return Boolean(
    process.env.X_API_KEY &&
    process.env.X_API_SECRET &&
    process.env.X_ACCESS_TOKEN &&
    process.env.X_ACCESS_SECRET
  );
}

async function postTweet(text) {
  if (!isConfigured()) {
    throw new Error(
      'X API credentials are not set. Copy .env.example to .env and fill in ' +
      'X_API_KEY / X_API_SECRET / X_ACCESS_TOKEN / X_ACCESS_SECRET, or run jobs ' +
      'with dryRun so they never try to post.'
    );
  }
  // Lazy require so `npm test` and dry-run demos never need this package
  // installed or any credentials present.
  const { TwitterApi } = require('twitter-api-v2');
  const client = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_SECRET,
  });
  const { data } = await client.v2.tweet(text);
  return data;
}

module.exports = { postTweet, isConfigured };
