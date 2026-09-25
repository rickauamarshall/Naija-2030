const ALLOWED_ORIGIN = 'https://supereaglestracker.com';

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
  };
}

function json(data, status = 200, origin = '') {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });
}

export class VisitorCounter {
  constructor(ctx) {
    this.ctx = ctx;
    ctx.blockConcurrencyWhile(async () => {
      ctx.storage.sql.exec(
        'CREATE TABLE IF NOT EXISTS totals (name TEXT PRIMARY KEY, value INTEGER NOT NULL DEFAULT 0)'
      );
      ctx.storage.sql.exec(
        "INSERT OR IGNORE INTO totals (name, value) VALUES ('site', 0)"
      );
    });
  }

  async fetch(request) {
    const origin = request.headers.get('Origin') || '';
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (origin && origin !== ALLOWED_ORIGIN) return json({ error: 'origin not allowed' }, 403, origin);
    if (request.method === 'POST') {
      this.ctx.storage.sql.exec(
        "UPDATE totals SET value = value + 1 WHERE name = 'site'"
      );
    } else if (request.method !== 'GET') {
      return json({ error: 'method not allowed' }, 405, origin);
    }

    const row = this.ctx.storage.sql
      .exec("SELECT value FROM totals WHERE name = 'site'")
      .one();
    return json({ count: Number(row.value) }, 200, origin);
  }
}

export default {
  async fetch(request, env) {
    const id = env.COUNTER.idFromName('site');
    return env.COUNTER.get(id).fetch(request);
  },
};
