"""
fetch_wikidata.py

Runs the Nigeria-eligibility discovery query (data/nigeria_eligible_scan.rq)
against Wikidata's public SPARQL endpoint and returns structured results.

This is a DISCOVERY step only. It tells you who to look into next — it does
NOT tell you whether someone is actually still eligible for Nigeria (see the
caveats in the .rq file itself and in CLAUDE.md). Every hit here needs a
human or an LLM-assisted news check before it goes anywhere near the site.

Usage:
    python fetch_wikidata.py > candidates.json
"""

import json
import sys
import time
from pathlib import Path

from SPARQLWrapper import SPARQLWrapper, JSON

WIKIDATA_ENDPOINT = "https://query.wikidata.org/sparql"
QUERY_PATH = Path(__file__).parent.parent / "data" / "nigeria_eligible_scan.rq"
USER_AGENT = "Naija2030PoolTracker/0.1 (https://github.com/rickauamarshall/naija-2030; contact@example.com)"


def load_query() -> str:
    """Strip the leading comment block, SPARQLWrapper doesn't need it but
    keeping the file human-readable with comments matters more than a
    marginally smaller request body."""
    return QUERY_PATH.read_text(encoding="utf-8")


def run_query(query: str) -> list[dict]:
    sparql = SPARQLWrapper(WIKIDATA_ENDPOINT, agent=USER_AGENT)
    sparql.setQuery(query)
    sparql.setReturnFormat(JSON)

    results = sparql.query().convert()
    bindings = results["results"]["bindings"]

    out = []
    for row in bindings:
        out.append({
            "wikidata_id": row.get("player", {}).get("value", "").rsplit("/", 1)[-1],
            "name": row.get("playerLabel", {}).get("value"),
            "date_of_birth": row.get("dob", {}).get("value"),
            "current_club": row.get("clubLabel", {}).get("value"),
            "parent_name": row.get("parentLabel", {}).get("value"),
            "parent_citizenship": row.get("parentCitizenshipLabel", {}).get("value"),
            "other_national_team": row.get("otherTeamLabel", {}).get("value"),
        })
    return out


def main():
    query = load_query()
    print(f"Querying Wikidata... (endpoint: {WIKIDATA_ENDPOINT})", file=sys.stderr)

    # Wikidata's public endpoint rate-limits aggressively. Be polite:
    # don't call this in a tight loop, and always identify your client
    # with a real User-Agent (see USER_AGENT above) or you'll get blocked.
    candidates = run_query(query)

    print(f"Found {len(candidates)} raw candidates before dedup/verification.", file=sys.stderr)

    # Basic dedup by wikidata_id (a player can match the query twice if
    # they have both P22 and P25 pointing to Nigerian-citizen parents)
    seen = set()
    deduped = []
    for c in candidates:
        if c["wikidata_id"] in seen:
            continue
        seen.add(c["wikidata_id"])
        deduped.append(c)

    print(json.dumps(deduped, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
