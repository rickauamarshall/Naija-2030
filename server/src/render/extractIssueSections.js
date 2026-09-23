'use strict';

// Parses this project's issue-draft convention (see LAUNCH.md / ISSUE-02.md):
// a top-level "# ... — Issue №N" heading starts the newsletter body, which
// runs until a "## X Thread" heading; that section holds one "**Tweet N
// (...):**" label per tweet followed by its body as a Markdown blockquote.
// This is intentionally coupled to that convention, not a general parser -
// if a future issue draft changes shape, update this alongside it.

function extractNewsletterBody(markdown) {
  const lines = markdown.split('\n');
  const h1Indexes = [];
  lines.forEach((l, i) => { if (/^#\s+/.test(l)) h1Indexes.push(i); });
  const threadIdx = lines.findIndex((l) => /^##\s*X Thread/i.test(l));
  if (h1Indexes.length === 0) throw new Error('No top-level "# " heading found to start the newsletter body.');
  // The newsletter's own H1 is the last one before the X Thread heading.
  const titleIdx = [...h1Indexes].reverse().find((i) => threadIdx === -1 || i < threadIdx);
  const end = threadIdx === -1 ? lines.length : threadIdx;
  return {
    title: lines[titleIdx].replace(/^#\s+/, '').trim(),
    body: lines.slice(titleIdx + 1, end).join('\n').trim(),
  };
}

function extractTweetThread(markdown) {
  const threadIdx = markdown.search(/^##\s*X Thread/im);
  if (threadIdx === -1) return [];
  const rest = markdown.slice(threadIdx);
  const nextHeading = rest.slice(1).search(/^##\s+/m);
  const section = nextHeading === -1 ? rest : rest.slice(0, nextHeading + 1);
  const tweetBlocks = [...section.matchAll(/\*\*Tweet[^*]*\*\*\n((?:>.*\n?)+)/g)];
  return tweetBlocks.map(([, quoted]) =>
    quoted
      .split('\n')
      .filter((l) => l.startsWith('>'))
      .map((l) => l.replace(/^>\s?/, ''))
      .join('\n')
      .trim()
  );
}

module.exports = { extractNewsletterBody, extractTweetThread };
