"""
classify_eligibility.py

Given a candidate player (from fetch_wikidata.py, enriched with
fetch_transfermarkt.py data), searches recent news and asks Claude to draft
an eligibility classification: OPEN / WATCH / TIED, with a one-sentence
rationale citing what it found.

*** THIS DRAFTS. IT DOES NOT PUBLISH. ***

Every result from this script needs `verified_by_human: false` until a
person reads the sources and confirms. This matters more here than in a
typical scraping pipeline: several of these candidates are minors, and a
wrong public claim about a 16-year-old's international eligibility is a
real harm, not just an embarrassing typo. See CLAUDE.md's "Things NOT to
do" section before changing this gate.

Usage:
    export ANTHROPIC_API_KEY=...
    python classify_eligibility.py candidates_enriched.json > classified.json
"""

import json
import os
import sys

import anthropic

MODEL = "claude-sonnet-5"  # keep in sync with whatever current model your org standardizes on

SYSTEM_PROMPT = """You are helping classify football players' international eligibility \
for a Nigerian football advocacy site. Given a player's name, birth details, parent \
nationality, and any news snippets provided, classify them as exactly one of:

- OPEN: fully uncapped at senior level for any country, no strong signal of imminent \
  commitment elsewhere.
- WATCH: uncapped at senior level, but currently appearing for another country's youth \
  setup (U17-U21) — a live urgency case, could be lost soon.
- TIED: has already made a senior COMPETITIVE appearance for a country other than \
  Nigeria (this permanently cap-ties them under FIFA rules regardless of caps count \
  for one-time-switch-eligible cases — flag those separately as TIED-BUT-SWITCH-ELIGIBLE \
  if they have 3 or fewer senior caps and were under 21 at the time).

Respond ONLY in this JSON shape, nothing else:
{"status": "OPEN"|"WATCH"|"TIED"|"TIED-BUT-SWITCH-ELIGIBLE", "rationale": "<one sentence, cite the specific fact that drove this>", "confidence": "high"|"medium"|"low"}

If the provided information is insufficient to classify confidently, use "confidence": "low" \
rather than guessing. Do not invent facts not present in the input."""


def classify_candidate(client: anthropic.Anthropic, candidate: dict, news_snippets: list[str]) -> dict:
    user_content = f"""Player: {candidate.get('name')}
Date of birth: {candidate.get('date_of_birth')}
Current club: {candidate.get('current_club')}
Parent nationality (Nigeria confirmed via Wikidata): {candidate.get('parent_citizenship')}
Other national team on record: {candidate.get('other_national_team')}

Recent news snippets:
{chr(10).join(f"- {s}" for s in news_snippets) if news_snippets else "(none found)"}
"""

    response = client.messages.create(
        model=MODEL,
        max_tokens=300,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_content}],
    )

    text = response.content[0].text
    try:
        parsed = json.loads(text)
    except json.JSONDecodeError:
        parsed = {"status": "OPEN", "rationale": "PARSE_ERROR — raw model output: " + text, "confidence": "low"}

    parsed["verified_by_human"] = False  # ALWAYS false at this stage. Do not change this default.
    return parsed


def main():
    if len(sys.argv) < 2:
        print("Usage: python classify_eligibility.py candidates_enriched.json", file=sys.stderr)
        sys.exit(1)

    candidates = json.loads(open(sys.argv[1], encoding="utf-8").read())
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    results = []
    for candidate in candidates:
        # TODO: plug in your actual news search here (web_search tool, News API,
        # Google News RSS, whatever you have available). Passing an empty list
        # for now — the classifier will correctly return low confidence.
        news_snippets: list[str] = []

        classification = classify_candidate(client, candidate, news_snippets)
        results.append({**candidate, **classification})

    print(json.dumps(results, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
