#!/usr/bin/env python3
"""Enrich discovery candidates with permitted free sources.

This deliberately does not fetch Transfermarkt. Transfermarkt's current
terms prohibit bots, spiders, screen scraping, and automated copying, and it
does not provide a public API. Use this module for the free, auditable layer:

* Wikidata REST data for identity, dates, positions, club identifiers, and
  external identifiers.
* API-Football's free plan, when API_FOOTBALL_KEY is present, for recent
  club/player metadata and statistics. The free plan is quota-limited.
* Human-curated official federation, club, and competition URLs for claims
  that need primary-source evidence.

No output from this script is eligible for direct site publication. The
eligibility gate remains human-owned, and market value is intentionally not
invented when no permitted source supplies it.

Usage:
    python scripts/enrich_free_sources.py candidates.json > candidates_enriched.json
    python scripts/enrich_free_sources.py candidates.json --no-api-football

The API key is read only from API_FOOTBALL_KEY or a local .env file. Never
place it in JSON output, source control, or handoff notes.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
from pathlib import Path

import requests
from dotenv import load_dotenv

ROOT = Path(__file__).parent.parent
CACHE_DIR = ROOT / ".cache" / "free-enrichment"
WIKIDATA_ENTITY = "https://www.wikidata.org/wiki/Special:EntityData/{qid}.json"
API_FOOTBALL_URL = "https://v3.football.api-sports.io/players"
USER_AGENT = "SuperEaglesTracker/0.1 (free-source-enrichment; https://supereaglestracker.com/)"


def cached_json(path: Path, fetch):
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    value = fetch()
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False), encoding="utf-8")
    return value


def wikidata_enrichment(qid: str) -> dict:
    """Return identity metadata only; do not infer eligibility from it."""
    if not qid:
        return {}
    path = CACHE_DIR / "wikidata" / f"{qid}.json"

    def fetch():
        response = requests.get(
            WIKIDATA_ENTITY.format(qid=qid),
            headers={"User-Agent": USER_AGENT, "Accept": "application/json"},
            timeout=20,
        )
        response.raise_for_status()
        return response.json()

    payload = cached_json(path, fetch)
    entity = payload.get("entities", {}).get(qid, {})
    claims = entity.get("claims", {})

    def first_value(property_id: str):
        values = claims.get(property_id, [])
        if not values:
            return None
        value = values[0].get("mainsnak", {}).get("datavalue", {}).get("value")
        if isinstance(value, dict):
            return value.get("id") or value.get("numeric-id")
        return value

    return {
        "wikidata_url": f"https://www.wikidata.org/wiki/{qid}",
        "fifa_id": first_value("P1469"),
        "transfermarkt_id": first_value("P2446"),
        "date_of_birth_wikidata": first_value("P569"),
        "position_wikidata": first_value("P413"),
        "club_wikidata": first_value("P54"),
        "source_provenance": "Wikidata entity record; identity metadata only",
    }


def api_football_enrichment(name: str, api_key: str | None) -> dict:
    if not api_key or not name:
        return {"api_football_status": "not_requested"}
    safe_name = "".join(ch if ch.isalnum() else "_" for ch in name.lower()).strip("_")
    path = CACHE_DIR / "api-football" / f"{safe_name}.json"

    def fetch():
        response = requests.get(
            API_FOOTBALL_URL,
            params={"search": name},
            headers={"x-apisports-key": api_key, "User-Agent": USER_AGENT},
            timeout=20,
        )
        response.raise_for_status()
        return response.json()

    payload = cached_json(path, fetch)
    results = payload.get("response", [])
    if not results:
        return {"api_football_status": "no_match"}
    # Keep the raw candidate set out of public output; a human must confirm
    # identity before accepting any match returned by a name search.
    return {
        "api_football_status": "candidate_match",
        "api_football_candidates": len(results),
        "api_football_id_candidates": [item.get("player", {}).get("id") for item in results],
        "api_football_note": "Name-search result only; human identity match required.",
    }


def enrich(candidate: dict, api_key: str | None, use_api: bool) -> dict:
    qid = candidate.get("wikidata_id")
    output = {**candidate}
    output["free_sources"] = wikidata_enrichment(qid)
    output["market_value_eur"] = None
    output["market_value_status"] = "not_available_from_permitted_free_source"
    if use_api:
        output["free_sources"].update(api_football_enrichment(candidate.get("name", ""), api_key))
        # Keep the free endpoint's 100/day tier safe for a first pass.
        time.sleep(0.25)
    output["verified_by_human"] = False
    return output


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("--no-api-football", action="store_true")
    args = parser.parse_args()
    load_dotenv(ROOT / ".env")
    api_key = os.getenv("API_FOOTBALL_KEY")
    candidates = json.loads(args.input.read_text(encoding="utf-8"))
    enriched = []
    for index, candidate in enumerate(candidates, start=1):
        print(f"Enriching {index}/{len(candidates)}: {candidate.get('name')}", file=sys.stderr)
        try:
            enriched.append(enrich(candidate, api_key, not args.no_api_football))
        except requests.RequestException as exc:
            print(f"WARN: source request failed for {candidate.get('name')}: {exc}", file=sys.stderr)
            enriched.append({**candidate, "enrichment_status": "source_request_failed", "verified_by_human": False})
    print(json.dumps(enriched, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
