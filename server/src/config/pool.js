'use strict';

/**
 * Full pool mapping (all FORMATION + BOARD players from site/index.html)
 * to what the tweet-feed needs: position (for template selection), a
 * short club name (for the stat-line header), and a provider player ID
 * to fill in once a real stats provider is wired up (see CLAUDE.md "Data
 * vendor decisions").
 *
 * Transcribed directly from site/index.html as of this writing (26
 * FORMATION + 12 BOARD = 38 total) — this will drift as the pool
 * changes. Next step is generating this file from the site data instead
 * of hand-maintaining both in parallel; until then, re-sync by hand
 * whenever FORMATION/BOARD changes (scripts/validate.py catches
 * formation-count bugs but won't catch this file going stale). This file
 * itself was caught badly stale once already - see git log for the
 * "Purge fabricated Big Board placeholders" and pool-verification commits
 * this had drifted behind - don't let it happen again silently.
 */
const POOL = [
  // --- FORMATION: starters ---
  { name: 'Okoye', fullName: 'Maduka Okoye', shortClub: 'Udinese', position: 'GK', providerPlayerId: null },
  { name: 'Aina', fullName: 'Ola Aina', shortClub: 'Forest', position: 'DEF', providerPlayerId: null },
  { name: 'Bassey', fullName: 'Calvin Bassey', shortClub: 'Fulham', position: 'DEF', providerPlayerId: null },
  { name: 'Ahanor', fullName: 'Honest Ahanor', shortClub: 'Crystal Palace', position: 'DEF', providerPlayerId: null },
  { name: 'Sanusi', fullName: 'Zaidu Sanusi', shortClub: 'Porto', position: 'DEF', providerPlayerId: null },
  { name: 'Iwobi', fullName: 'Alex Iwobi', shortClub: 'Fulham', position: 'MID', providerPlayerId: null },
  { name: 'Ndidi', fullName: 'Wilfred Ndidi', shortClub: 'Besiktas', position: 'MID', providerPlayerId: null },
  { name: 'Onyedika', fullName: 'Raphael Onyedika', shortClub: 'Eintracht Frankfurt', position: 'MID', providerPlayerId: null },
  { name: 'Ngumoha', fullName: 'Rio Ngumoha', shortClub: 'Liverpool', position: 'MID', providerPlayerId: null },
  { name: 'Osimhen', fullName: 'Victor Osimhen', shortClub: 'Gala', position: 'FWD', providerPlayerId: null },
  { name: 'Lookman', fullName: 'Ademola Lookman', shortClub: 'Atleti', position: 'FWD', providerPlayerId: null },

  // --- FORMATION: reserves (depth) ---
  { name: 'Nwabali', fullName: 'Stanley Nwabali', shortClub: 'Chippa Utd', position: 'GK', providerPlayerId: null },
  { name: 'S. James', fullName: 'Samuel James', shortClub: 'TBD (Finland)', position: 'GK', providerPlayerId: null },
  { name: 'Osayi-Samuel', fullName: 'Bright Osayi-Samuel', shortClub: 'Birmingham City', position: 'DEF', providerPlayerId: null },
  { name: 'Ndukwe', fullName: 'Ifeanyi Ndukwe', shortClub: 'Levante', position: 'DEF', providerPlayerId: null },
  { name: 'Adarabioyo', fullName: 'Tosin Adarabioyo', shortClub: 'Chelsea', position: 'DEF', providerPlayerId: null },
  { name: 'Fredrick', fullName: 'Benjamin Fredrick', shortClub: 'FCV Dender EH', position: 'DEF', providerPlayerId: null },
  { name: 'Adiele', fullName: 'Emeka Adiele', shortClub: 'Utrecht', position: 'DEF', providerPlayerId: null },
  { name: 'Nwaneri', fullName: 'Ethan Nwaneri', shortClub: 'Marseille', position: 'MID', providerPlayerId: null },
  { name: 'Onyeka', fullName: 'Frank Onyeka', shortClub: 'Coventry', position: 'MID', providerPlayerId: null },
  { name: 'Etebo', fullName: 'Peter Etebo', shortClub: 'Genclerbirligi', position: 'MID', providerPlayerId: null },
  { name: 'Chukwueze', fullName: 'Samuel Chukwueze', shortClub: 'AC Milan', position: 'MID', providerPlayerId: null },
  { name: 'Simon', fullName: 'Moses Simon', shortClub: 'Paris FC', position: 'MID', providerPlayerId: null },
  { name: 'Awoniyi', fullName: 'Taiwo Awoniyi', shortClub: 'Coventry', position: 'FWD', providerPlayerId: null },
  { name: 'Ekhator', fullName: 'Jeff Ekhator', shortClub: 'Juventus', position: 'FWD', providerPlayerId: null },
  { name: 'Iheanacho', fullName: 'Kelechi Iheanacho', shortClub: 'Bursaspor', position: 'FWD', providerPlayerId: null },

  // --- BOARD (12 entries, ranks 27-38 - see site/index.html, not a fixed range) ---
  { name: 'Oyebade', fullName: 'Rayan Oyebade', shortClub: 'West Ham', position: 'DEF', providerPlayerId: null },
  { name: 'Adeniran', fullName: 'Samuel Adeniran', shortClub: 'LASK', position: 'FWD', providerPlayerId: null },
  { name: 'Adewumi', fullName: 'Oluwaseun Adewumi', shortClub: 'Hertha BSC', position: 'MID', providerPlayerId: null },
  { name: 'Nwaiwu', fullName: 'Chibuike Nwaiwu', shortClub: 'Trabzonspor', position: 'DEF', providerPlayerId: null },
  { name: 'George', fullName: 'Tyrique George', shortClub: 'Chelsea', position: 'FWD', providerPlayerId: null },
  { name: 'Ezenwata', fullName: 'Chizzy Ezenwata', shortClub: 'Chelsea', position: 'FWD', providerPlayerId: null },
  { name: 'Troost-Ekong', fullName: 'William Troost-Ekong', shortClub: 'Besiktas', position: 'DEF', providerPlayerId: null },
  { name: 'Ozoh', fullName: 'David Ozoh', shortClub: 'Derby County', position: 'MID', providerPlayerId: null },
  { name: 'Ugochukwu', fullName: 'Lesley Ugochukwu', shortClub: 'Galatasaray', position: 'MID', providerPlayerId: null },
  { name: 'I. James', fullName: 'Isaac James', shortClub: 'TBD (Portugal)', position: 'DEF', providerPlayerId: null },
  { name: 'Ilenikhena', fullName: 'George Ilenikhena', shortClub: 'TBD', position: 'FWD', providerPlayerId: null },
  { name: 'Usor', fullName: 'Moses Usor', shortClub: 'TBD', position: 'FWD', providerPlayerId: null },
];

module.exports = { POOL };
