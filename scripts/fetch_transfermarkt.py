"""
fetch_transfermarkt.py — SKELETON, NOT FUNCTIONAL YET

Transfermarkt has no official public API. Before writing this file for real,
decide which path you're taking, because they have real tradeoffs:

  1. Community scraper library (fastest to start with):
     Search GitHub for actively-maintained projects like
     "transfermarkt-scraper" or "transfermarkt-datasets" — quality and
     upkeep varies, check last-commit dates before trusting one.
     Respect Transfermarkt's robots.txt and terms of service. Cache
     every response locally and re-fetch on a weekly schedule at most,
     not on every pipeline run — hammering their servers will get your
     IP blocked and is the kind of thing that kills a project's ability
     to ship on time.

  2. Paid data feed (the "actually sustainable" path):
     If this project gets real traffic, look at licensed football data
     providers (Wyscout, Opta, Sofascore's partner API, etc). Costs
     money but removes the scraping-fragility problem entirely.

Either way, the shape of what this file needs to produce is:

    def get_player_market_data(name: str, date_of_birth: str) -> dict | None:
        '''
        Returns:
            {
                "transfermarkt_id": str,
                "market_value_eur": int,
                "market_value_trend_90d": float,  # percent change
                "current_club": str,
                "contract_expires": str,  # ISO date
                "position": str,
            }
        or None if no confident match found.
        '''

Match candidates from fetch_wikidata.py by (name, date_of_birth) — name
alone is not reliable enough, there are multiple footballers named
"Emmanuel Adeyemo" etc. If date_of_birth is missing from the Wikidata
result, flag the candidate for manual lookup rather than guessing.
"""

import sys


def get_player_market_data(name: str, date_of_birth: str) -> dict | None:
    raise NotImplementedError(
        "Pick a Transfermarkt data source (see module docstring) and implement this. "
        "Do not scrape without caching and rate-limiting — see the caveats above."
    )


if __name__ == "__main__":
    print(__doc__, file=sys.stderr)
