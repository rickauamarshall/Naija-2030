#!/usr/bin/env python3
"""
validate.py — data-integrity checks for site/index.html's FORMATION and
BOARD arrays. Formalizes the checks CLAUDE.md asks every editor to run by
hand, after this project shipped duplicate-player and formation-count bugs
more than once from hand-editing the arrays directly.

Usage:
    python3 scripts/validate.py

Exits non-zero (and prints what failed) if any check fails. Run this after
every edit to FORMATION/BOARD — it's also wired into CI (see
.github/workflows/ci.yml) so a bad edit can't merge silently.

Known limitation: this is regex-based, not a real JS parser — same
approach as the hand-run bash check it replaces. It assumes names/notes
don't contain unescaped single quotes. Fine for today's data; if that
ever stops being true, move the arrays to a JSON file and parse that
properly instead of patching this regex further.
"""

import re
import sys
from pathlib import Path

SITE_PATH = Path(__file__).parent.parent / "site" / "index.html"
EXPECTED_STARTERS = {"GK": 1, "DEF": 4, "MID": 4, "FWD": 2}
EXPECTED_RESERVES = {"GK": 2, "DEF": 5, "MID": 5, "FWD": 3}
EXPECTED_BOARD_RANK_START = 27
EXPECTED_BOARD_RANK_END = 55


def extract_block(text: str, start_marker: str) -> str:
    start = text.index(start_marker)
    end = text.index("\n];", start)
    return text[start:end]


def extract_names(block: str) -> list[str]:
    return re.findall(r"name:'([^']+)'", block)


def extract_formation_rows(block: str) -> list[tuple[str, str]]:
    """Returns [(pos, row_body), ...] for each position row in FORMATION."""
    pieces = re.split(r"\{pos:'([A-Z]+)',\s*slots:\[", block)[1:]
    return [(pieces[i], pieces[i + 1]) for i in range(0, len(pieces), 2)]


def find_dupes(names: list[str]) -> set[str]:
    seen, dup = set(), set()
    for n in names:
        (dup if n in seen else seen).add(n)
    return dup


def main() -> int:
    text = SITE_PATH.read_text(encoding="utf-8")
    ok = True

    formation_block = extract_block(text, "const FORMATION = [")
    board_block = extract_block(text, "const BOARD = [")

    formation_names = extract_names(formation_block)
    board_names = extract_names(board_block)

    formation_dupes = find_dupes(formation_names)
    board_dupes = find_dupes(board_names)
    overlap = set(formation_names) & set(board_names)

    if formation_dupes:
        ok = False
        print(f"FAIL: duplicate name(s) within FORMATION: {sorted(formation_dupes)}")
    if board_dupes:
        ok = False
        print(f"FAIL: duplicate name(s) within BOARD: {sorted(board_dupes)}")
    if overlap:
        ok = False
        print(f"FAIL: player(s) appear in both FORMATION and BOARD: {sorted(overlap)}")

    if len(formation_names) != 26:
        ok = False
        print(f"FAIL: FORMATION has {len(formation_names)} players, expected 26")
    if len(board_names) != 29:
        ok = False
        print(f"FAIL: BOARD has {len(board_names)} players, expected 29")

    ranks = sorted(int(r) for r in re.findall(r"rank:(\d+)", board_block))
    expected_ranks = list(range(EXPECTED_BOARD_RANK_START, EXPECTED_BOARD_RANK_END + 1))
    if ranks != expected_ranks:
        ok = False
        print(f"FAIL: BOARD rank sequence is {ranks}, expected {expected_ranks}")

    rows = extract_formation_rows(formation_block)
    seen_positions = set()
    for pos, body in rows:
        seen_positions.add(pos)
        starters = len(re.findall(r"main:\{", body))
        reserves = len(extract_names(body)) - starters

        if starters != EXPECTED_STARTERS.get(pos):
            ok = False
            print(f"FAIL: {pos} has {starters} starters, expected {EXPECTED_STARTERS.get(pos)}")
        if reserves != EXPECTED_RESERVES.get(pos):
            ok = False
            print(f"FAIL: {pos} has {reserves} reserves, expected {EXPECTED_RESERVES.get(pos)}")

    missing_positions = set(EXPECTED_STARTERS) - seen_positions
    if missing_positions:
        ok = False
        print(f"FAIL: FORMATION is missing position row(s): {sorted(missing_positions)}")

    if ok:
        starter_summary = ", ".join(f"{p}{EXPECTED_STARTERS[p]}" for p in ["GK", "DEF", "MID", "FWD"])
        print(
            f"OK: {len(formation_names)} pool + {len(board_names)} board, "
            f"no dupes/overlap, ranks {ranks[0]}..{ranks[-1]} intact, "
            f"starters {starter_summary}"
        )
        return 0
    return 1


if __name__ == "__main__":
    sys.exit(main())
