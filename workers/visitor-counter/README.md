# Super Eagles Tracker visitor counter

This is a deliberately small, aggregate-only counter for the public site. It
does not store IP addresses, cookies, user agents, referrers, or visitor
profiles. `POST /` increments the site total; `GET /` reads it.

## Deploy

From this directory, after authenticating Wrangler to the project owner's
Cloudflare account:

```text
npx wrangler deploy
```

Use the deployed Worker URL as the site's `VISITOR_COUNTER_ENDPOINT`.
Test it before connecting the site:

```text
curl -X POST https://<worker-subdomain>.workers.dev/
curl https://<worker-subdomain>.workers.dev/
```

The Worker rejects browser requests whose `Origin` is not
`https://supereaglestracker.com`. Keep the endpoint private until it has been
tested, and do not add credentials to this repository.
