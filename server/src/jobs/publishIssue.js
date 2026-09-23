'use strict';

const beehiivClient = require('../poster/beehiivClient');
const xClient = require('../poster/xClient');
const { markdownToHtml } = require('../render/markdownToHtml');
const { extractNewsletterBody, extractTweetThread } = require('../render/extractIssueSections');

/**
 * Publishes an issue draft (see LAUNCH.md/ISSUE-02.md's format): the
 * newsletter body to beehiiv (always as a draft - beehiiv still requires a
 * human to hit "send" in the dashboard, which is a safety net worth
 * keeping), and the X thread live if dryRun is false.
 *
 * dryRun defaults to true, same convention as matchdayPoll.js - callers
 * must explicitly opt in to actually posting anywhere.
 *
 * @param {{markdown: string, dryRun?: boolean, postThread?: boolean}} opts
 */
async function runPublishIssue({ markdown, dryRun = true, postThread = true }) {
  const { title, body } = extractNewsletterBody(markdown);
  const tweets = postThread ? extractTweetThread(markdown) : [];
  const bodyHtml = markdownToHtml(body);

  const result = { title, tweetCount: tweets.length, dryRun };

  if (dryRun) {
    console.log(`[dry run] Would create beehiiv draft: "${title}" (${bodyHtml.length} chars of HTML)`);
    tweets.forEach((t, i) => console.log(`[dry run] Would post tweet ${i + 1}/${tweets.length}:\n${t}\n`));
    return result;
  }

  if (!beehiivClient.isConfigured()) {
    throw new Error('beehiiv is not configured (BEEHIIV_API_KEY/BEEHIIV_PUBLICATION_ID) - cannot publish for real.');
  }
  const post = await beehiivClient.createPost({ title, bodyHtml, status: 'draft' });
  result.beehiivPost = post;

  if (tweets.length) {
    if (!xClient.isConfigured()) {
      throw new Error('X is not configured (X_API_KEY etc.) - beehiiv draft was created, but the thread was not posted.');
    }
    result.tweets = await xClient.postThread(tweets);
  }
  return result;
}

module.exports = { runPublishIssue };
