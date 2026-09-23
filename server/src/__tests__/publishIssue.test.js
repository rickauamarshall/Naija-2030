'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { markdownToHtml } = require('../render/markdownToHtml');
const { extractNewsletterBody, extractTweetThread } = require('../render/extractIssueSections');
const { runPublishIssue } = require('../jobs/publishIssue');

const SAMPLE = `# Super Eagles Tracker — Issue №99

## A Section

Some **bold** text and a [link](https://example.com).

## X Thread (post today)

**Tweet 1 (hook):**
> Line one.
>
> Line two.

**Tweet 2:**
> Second tweet body.

## Instagram Post

Not part of the thread.
`;

test('extractNewsletterBody grabs the title and body, stopping before X Thread', () => {
  const { title, body } = extractNewsletterBody(SAMPLE);
  assert.equal(title, 'Super Eagles Tracker — Issue №99');
  assert.match(body, /## A Section/);
  assert.doesNotMatch(body, /X Thread/);
});

test('extractTweetThread pulls quoted tweet bodies, not the Tweet N labels', () => {
  const tweets = extractTweetThread(SAMPLE);
  assert.equal(tweets.length, 2);
  assert.equal(tweets[0], 'Line one.\n\nLine two.');
  assert.equal(tweets[1], 'Second tweet body.');
});

test('markdownToHtml renders bold and links', () => {
  const html = markdownToHtml('Some **bold** text and a [link](https://example.com).');
  assert.match(html, /<b>bold<\/b>/);
  assert.match(html, /<a href="https:\/\/example\.com">link<\/a>/);
});

test('runPublishIssue dry run posts nothing and reports counts', async () => {
  const result = await runPublishIssue({ markdown: SAMPLE, dryRun: true });
  assert.equal(result.dryRun, true);
  assert.equal(result.tweetCount, 2);
  assert.equal(result.beehiivPost, undefined);
});
