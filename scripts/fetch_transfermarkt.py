"""
fetch_transfermarkt.py — intentionally disabled

Transfermarkt has no official public API, and its current terms prohibit bots,
spiders, screen scraping, and automated copying. This module remains as a
compatibility stub so older pipeline references fail safely rather than
silently introducing a prohibited scraper.

  Licensed data feed (the sustainable path):
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
        "Transfermarkt automation is disabled. Use scripts/enrich_free_sources.py "
        "for Wikidata/API-Football, or obtain a licensed data source."
    )


if __name__ == "__main__":
    print(__doc__, file=sys.stderr)
