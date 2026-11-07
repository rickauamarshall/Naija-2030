#!/usr/bin/env node
'use strict';

/**
 * Generates server/src/config/pool.js from site/index.html's live
 * FORMATION and BOARD arrays, instead of hand-syncing the two files.
 *
 * pool.js has drifted out of sync with the site three times now (see
 * docs/agent-handoff.md, 2026-09-26 entry) - wrong starters vs. depth,
 * players placed in the wrong section, stale counts in its own header
 * comment. Hand-editing it is what keeps causing that. Run this instead
 * whenever FORMATION/BOARD changes:
 *
 *   node scripts/generate_pool_config.js
 *
 * It re-derives every entry (short name, short club, position) from the
 * live site data, so there's exactly one source of truth. `providerPlayerId`
 * values are preserved across regeneration by reading the existing file
 * first - they're not present in the site data and have to be filled in
 * by hand once a real stats provider is wired up.
 */

const fs = require('fs');
const path = require('path');

const SITE_PATH = path.join(__dirname, '..', 'site', 'index.html');
const POOL_PATH = path.join(__dirname, '..', 'server', 'src', 'config', 'pool.js');

function extractBlock(text, startMarker) {
  const start = text.indexOf(startMarker);
  if (start === -1) throw new Error(`Marker not found: ${startMarker}`);
  const end = text.indexOf('\n];', start);
  if (end === -1) throw new Error(`Closing "];" not found after: ${startMarker}`);
  return text.slice(start, end);
}

function foldDiacritics(str) {
  return str.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// A handful of well-known shorthand club names that don't come from any
// mechanical rule - kept minimal and explicit rather than guessed.
const CLUB_NICKNAMES = {
  'Galatasaray': 'Gala',
  'Atletico Madrid': 'Atleti',
};

function shortenClub(rawClub) {
  // Strip a trailing parenthetical: "(loan from X)", "(on loan, X)",
  // "(Saudi Pro League)", "(Portugal)", "TBD (Finland)", etc.
  let club = rawClub.replace(/\s*\([^)]*\)\s*$/, '').trim();
  club = foldDiacritics(club);
  club = club.replace(/\s+United$/, '');
  if (CLUB_NICKNAMES[club]) return CLUB_NICKNAMES[club];
  return club || rawClub; // fall back to the raw value if stripping left nothing
}

// Finds the index of the bracket that closes the one at `openIndex`,
// accounting for nesting (needed because slot/board objects can contain
// nested braces, e.g. rivalCaps:{...}).
function findMatchingBracket(str, openIndex, openChar, closeChar) {
  let depth = 0;
  for (let i = openIndex; i < str.length; i++) {
    if (str[i] === openChar) depth++;
    else if (str[i] === closeChar) {
      depth--;
      if (depth === 0) return i;
    }
  }
  throw new Error(`No matching '${closeChar}' found for '${openChar}' at index ${openIndex}`);
}

// Splits a string of sibling `{...}, {...}` object literals into each
// object's inner body, respecting brace nesting - a plain non-greedy
// regex breaks the moment any object contains a nested object (e.g.
// rivalCaps:{...}), because it can't tell a nested "}" from the real one.
function splitTopLevelObjects(str) {
  const bodies = [];
  let i = 0;
  while (i < str.length) {
    const open = str.indexOf('{', i);
    if (open === -1) break;
    const close = findMatchingBracket(str, open, '{', '}');
    bodies.push(str.slice(open + 1, close));
    i = close + 1;
  }
  return bodies;
}

// Pulls name/club (and optionally pos) out of a single, already-isolated
// object body - safe to use a simple regex here since there's exactly
// one object's worth of text, not siblings to accidentally run into.
function readPlayerFields(objectBody) {
  const name = objectBody.match(/name:'([^']+)'/);
  const club = objectBody.match(/club:'([^']+)'/);
  const pos = objectBody.match(/pos:'([A-Z]+)'/);
  if (!name || !club) return null;
  return { fullName: name[1], club: club[1], position: pos ? pos[1] : undefined };
}

function extractFormation(text) {
  const block = extractBlock(text, 'const FORMATION = [');
  const posMarker = /\{pos:'([A-Z]+)',\s*slots:\[/g;
  const starts = [];
  let m;
  while ((m = posMarker.exec(block)) !== null) {
    starts.push({ pos: m[1], index: m.index });
  }
  const starters = [];
  const depth = [];
  starts.forEach((row, i) => {
    const chunkEnd = i + 1 < starts.length ? starts[i + 1].index : block.length;
    const rowBody = block.slice(row.index, chunkEnd);
    const mainRe = /main:\{/g;
    let mm;
    while ((mm = mainRe.exec(rowBody)) !== null) {
      const mainOpen = mm.index + 'main:'.length; // index of the "{"
      const mainClose = findMatchingBracket(rowBody, mainOpen, '{', '}');
      const mainBody = rowBody.slice(mainOpen + 1, mainClose);
      const mainPlayer = readPlayerFields(mainBody);
      if (mainPlayer) starters.push({ ...mainPlayer, position: row.pos });

      const depthKeyword = ', depth:[';
      const depthOpen = rowBody.indexOf(depthKeyword, mainClose);
      if (depthOpen === -1) continue;
      const bracketIndex = depthOpen + depthKeyword.length - 1; // index of "["
      const depthClose = findMatchingBracket(rowBody, bracketIndex, '[', ']');
      const depthBody = rowBody.slice(bracketIndex + 1, depthClose);
      for (const objBody of splitTopLevelObjects(depthBody)) {
        const p = readPlayerFields(objBody);
        if (p) depth.push({ ...p, position: row.pos });
      }
    }
  });
  return { starters, depth };
}

function extractBoard(text) {
  const block = extractBlock(text, 'const BOARD = [');
  const players = splitTopLevelObjects(block.slice(block.indexOf('[') + 1))
    .map(readPlayerFields)
    .filter(Boolean);
  // BOARD.push(...) entries (new additions appended after BOARD_UPDATES)
  const pushMatch = text.match(/BOARD\.push\(([\s\S]*?)\n\);/);
  if (pushMatch) {
    for (const objBody of splitTopLevelObjects(pushMatch[1])) {
      const p = readPlayerFields(objBody);
      if (p) players.push(p);
    }
  }
  return players;
}

function buildShortNames(allPlayers) {
  const surnameCounts = new Map();
  for (const p of allPlayers) {
    const surname = p.fullName.trim().split(/\s+/).pop();
    surnameCounts.set(surname, (surnameCounts.get(surname) || 0) + 1);
  }
  return allPlayers.map((p) => {
    const parts = p.fullName.trim().split(/\s+/);
    const surname = parts.pop();
    if (surnameCounts.get(surname) > 1) {
      return { ...p, shortName: `${parts[0][0]}. ${surname}` };
    }
    return { ...p, shortName: surname };
  });
}

function formatEntry(p) {
  const escape = (s) => s.replace(/'/g, "\\'");
  return `  { name: '${escape(p.shortName)}', fullName: '${escape(p.fullName)}', shortClub: '${escape(shortenClub(p.club))}', position: '${p.position}', providerPlayerId: ${JSON.stringify(p.providerPlayerId)} },`;
}

function loadExistingProviderIds() {
  if (!fs.existsSync(POOL_PATH)) return {};
  const text = fs.readFileSync(POOL_PATH, 'utf-8');
  const ids = {};
  const re = /fullName:\s*'([^']+)'[^}]*?providerPlayerId:\s*([^,}\s]+)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m[2] !== 'null') ids[m[1]] = JSON.parse(m[2]);
  }
  return ids;
}

function main() {
  const siteText = fs.readFileSync(SITE_PATH, 'utf-8');
  const { starters, depth } = extractFormation(siteText);
  const board = extractBoard(siteText);
  const existingIds = loadExistingProviderIds();

  const withIds = (players) =>
    players.map((p) => ({ ...p, providerPlayerId: existingIds[p.fullName] || null }));

  const allNamed = buildShortNames([...starters, ...depth, ...board]);
  const byFullName = new Map(allNamed.map((p) => [p.fullName, p]));
  const finalStarters = withIds(starters.map((p) => byFullName.get(p.fullName)));
  const finalDepth = withIds(depth.map((p) => byFullName.get(p.fullName)));
  const finalBoard = withIds(board.map((p) => byFullName.get(p.fullName)));

  const total = finalStarters.length + finalDepth.length + finalBoard.length;
  const out = `'use strict';

/**
 * Full pool mapping (all FORMATION + BOARD players from site/index.html)
 * to what the tweet-feed needs: position (for template selection), a
 * short club name (for the stat-line header), and a provider player ID
 * to fill in once a real stats provider is wired up (see CLAUDE.md "Data
 * vendor decisions").
 *
 * GENERATED by scripts/generate_pool_config.js - do not hand-edit. Run
 * that script again after any FORMATION/BOARD change in site/index.html
 * instead of patching this file directly; hand-syncing it drifted stale
 * three times before this generator existed (see docs/agent-handoff.md,
 * 2026-09-26 entry, for what that looked like: wrong starters vs. depth,
 * players in the wrong section, a stale count in this very comment).
 *
 * Current count: ${finalStarters.length + finalDepth.length} FORMATION + ${finalBoard.length} BOARD = ${total} total.
 */
const POOL = [
  // --- FORMATION: starters ---
${finalStarters.map(formatEntry).join('\n')}

  // --- FORMATION: reserves (depth) ---
${finalDepth.map(formatEntry).join('\n')}

  // --- BOARD (${finalBoard.length} entries - see site/index.html for current ranks, not fixed) ---
${finalBoard.map(formatEntry).join('\n')}
];

module.exports = { POOL };
`;

  fs.writeFileSync(POOL_PATH, out);
  console.log(`Wrote ${POOL_PATH}: ${finalStarters.length} starters + ${finalDepth.length} depth + ${finalBoard.length} board = ${total} total.`);
}

main();
