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

/**
 * Posts a sequence of tweets as a reply chain (a thread) - each tweet
 * replies to the one before it, same as posting a thread by hand.
 * @param {string[]} tweets - tweet bodies in posting order.
 * @returns {Promise<Array<{id:string, text:string}>>} the posted tweets, in order.
 */
async function postThread(tweets) {
  if (!Array.isArray(tweets) || tweets.length === 0) {
    throw new Error('postThread requires a non-empty array of tweet bodies.');
  }
  if (!isConfigured()) {
    throw new Error(
      'X API credentials are not set. Copy .env.example to .env and fill in ' +
      'X_API_KEY / X_API_SECRET / X_ACCESS_TOKEN / X_ACCESS_SECRET, or run jobs ' +
      'with dryRun so they never try to post.'
    );
  }
  const { TwitterApi } = require('twitter-api-v2');
  const client = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_SECRET,
  });
  const posted = [];
  let replyToId;
  for (const text of tweets) {
    const { data } = await client.v2.tweet(
      replyToId ? { text, reply: { in_reply_to_tweet_id: replyToId } } : { text }
    );
    posted.push(data);
    replyToId = data.id;
  }
  return posted;
}

module.exports = { postTweet, postThread, isConfigured };
