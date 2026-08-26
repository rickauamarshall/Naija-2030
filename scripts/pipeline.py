"""
pipeline.py — orchestrates the full discovery pipeline. SKELETON.

Steps:
  1. fetch_wikidata.py    -> raw candidates from Wikidata
  2. fetch_transfermarkt.py -> enrich with market value / club / contract data
  3. classify_eligibility.py -> draft OPEN/WATCH/TIED status via Claude
  4. Write everything to a local SQLite DB with verified_by_human=false
  5. STOP. A human reviews the DB and flips verified_by_human=true on
     entries they've actually checked against a real source.
  6. A SEPARATE, manual export step pulls verified=true rows into the
     JS arrays in site/index.html. This script does not do that step —
     don't let this pipeline auto-publish to the live site. See
     CLAUDE.md's "Things NOT to do."

This is intentionally not wired up end-to-end yet — fetch_transfermarkt.py
needs a real data source decision made first (see its docstring).
"""

import json
import sqlite3
import subprocess
import sys
from pathlib import Path

DB_PATH = Path(__file__).parent / "candidates.db"


def init_db(conn: sqlite3.Connection):
    conn.execute("""
        CREATE TABLE IF NOT EXISTS candidates (
            wikidata_id TEXT PRIMARY KEY,
            name TEXT,
            date_of_birth TEXT,
            current_club TEXT,
            parent_citizenship TEXT,
            other_national_team TEXT,
            market_value_eur INTEGER,
            eligibility_status TEXT,
            eligibility_rationale TEXT,
            classification_confidence TEXT,
            verified_by_human INTEGER DEFAULT 0,
            last_updated TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()


def run_step(script_name: str, *args) -> str:
    result = subprocess.run(
        [sys.executable, str(Path(__file__).parent / script_name), *args],
        capture_output=True, text=True, check=True,
    )
    return result.stdout


def main():
    conn = sqlite3.connect(DB_PATH)
    init_db(conn)

    print("Step 1: Wikidata discovery...", file=sys.stderr)
    raw_json = run_step("fetch_wikidata.py")
    candidates = json.loads(raw_json)

    print(f"Step 2: Transfermarkt enrichment... (NOT IMPLEMENTED — see fetch_transfermarkt.py)", file=sys.stderr)
    # Deliberately not calling fetch_transfermarkt here yet — it raises
    # NotImplementedError until a real data source is wired up.

    print("Step 3: Eligibility classification — skipped in skeleton run.", file=sys.stderr)
    print("Wire this up once steps 1-2 are producing real enriched data.", file=sys.stderr)

    for c in candidates:
        conn.execute("""
            INSERT INTO candidates (wikidata_id, name, date_of_birth, current_club,
                parent_citizenship, other_national_team, verified_by_human)
            VALUES (?, ?, ?, ?, ?, ?, 0)
            ON CONFLICT(wikidata_id) DO UPDATE SET
                name=excluded.name,
                current_club=excluded.current_club,
                last_updated=CURRENT_TIMESTAMP
        """, (c["wikidata_id"], c["name"], c["date_of_birth"], c["current_club"],
              c["parent_citizenship"], c["other_national_team"]))
    conn.commit()

    count = conn.execute("SELECT COUNT(*) FROM candidates WHERE verified_by_human=0").fetchone()[0]
    print(f"\n{count} unverified candidates now sitting in {DB_PATH}, waiting for human review.", file=sys.stderr)
    print("Nothing here has touched site/index.html. That stays a manual step.", file=sys.stderr)


if __name__ == "__main__":
    main()
