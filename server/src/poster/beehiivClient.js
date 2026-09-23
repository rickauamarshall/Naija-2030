'use strict';

// beehiiv API v2 - https://developers.beehiiv.com/api-reference/posts/create
// NOTE: written from the public API reference (POST /v2/publications/:id/posts,
// Bearer auth, body via `body_content` HTML or `blocks`). The full required-field
// list couldn't be fully confirmed against live docs when this was written -
// verify field names against the current reference before first real use, and
// run a dry run against a real (but unpublished) draft first.

const API_BASE = 'https://api.beehiiv.com/v2';

function isConfigured() {
  return Boolean(process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID);
}

/**
 * Creates a post in the configured beehiiv publication.
 * Defaults to status:'draft' - it will NOT go out to subscribers or appear
 * publicly until someone reviews it in the beehiiv dashboard and hits send,
 * regardless of how this function is called. Pass status:'confirmed' only
 * once you're deliberately bypassing that review step.
 *
 * @param {{title: string, subtitle?: string, bodyHtml: string, status?: 'draft'|'confirmed'}} post
 */
async function createPost({ title, subtitle, bodyHtml, status = 'draft' }) {
  if (!title || !bodyHtml) {
    throw new Error('createPost requires at least { title, bodyHtml }.');
  }
  if (!isConfigured()) {
    throw new Error(
      'beehiiv API credentials are not set. Copy .env.example to .env and fill in ' +
      'BEEHIIV_API_KEY / BEEHIIV_PUBLICATION_ID, or run jobs with dryRun so this ' +
      'is never called.'
    );
  }
  const res = await fetch(
    `${API_BASE}/publications/${process.env.BEEHIIV_PUBLICATION_ID}/posts`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        subtitle,
        status,
        body_content: bodyHtml,
      }),
    }
  );
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`beehiiv createPost failed: ${res.status} ${res.statusText} - ${errText}`);
  }
  return res.json();
}

module.exports = { createPost, isConfigured };
