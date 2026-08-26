'use strict';

/**
 * Full pool mapping (all 26 FORMATION players + all 24 BOARD players from
 * site/index.html) to what the tweet-feed needs: position (for template
 * selection), a short club name (for the stat-line header), and a
 * provider player ID to fill in once a real stats provider is wired up
 * (see CLAUDE.md "Data vendor decisions").
 *
 * Transcribed directly from site/index.html as of this writing — this
 * will drift as the pool changes. Next step is generating this file from
 * the site data instead of hand-maintaining both in parallel; until then,
 * re-sync by hand whenever FORMATION/BOARD changes (scripts/validate.py
 * catches formation-count bugs but won't catch this file going stale).
 */
const POOL = [
  // --- FORMATION: starters ---
  { name: 'Okoye', fullName: 'Maduka Okoye', shortClub: 'Udinese', position: 'GK', providerPlayerId: null },
  { name: 'Aina', fullName: 'Ola Aina', shortClub: 'Forest', position: 'DEF', providerPlayerId: null },
  { name: 'Bassey', fullName: 'Calvin Bassey', shortClub: 'Fulham', position: 'DEF', providerPlayerId: null },
  { name: 'Ahanor', fullName: 'Honest Ahanor', shortClub: 'Atalanta', position: 'DEF', providerPlayerId: null },
  { name: 'Sanusi', fullName: 'Zaidu Sanusi', shortClub: 'Porto', position: 'DEF', providerPlayerId: null },
  { name: 'Iwobi', fullName: 'Alex Iwobi', shortClub: 'Fulham', position: 'MID', providerPlayerId: null },
  { name: 'Ndidi', fullName: 'Wilfred Ndidi', shortClub: 'Besiktas', position: 'MID', providerPlayerId: null },
  { name: 'Onyedika', fullName: 'Raphael Onyedika', shortClub: 'Club Brugge', position: 'MID', providerPlayerId: null },
  { name: 'Ngumoha', fullName: 'Rio Ngumoha', shortClub: 'Liverpool', position: 'MID', providerPlayerId: null },
  { name: 'Osimhen', fullName: 'Victor Osimhen', shortClub: 'Gala', position: 'FWD', providerPlayerId: null },
  { name: 'Lookman', fullName: 'Ademola Lookman', shortClub: 'Atleti', position: 'FWD', providerPlayerId: null },

  // --- FORMATION: reserves (depth) ---
  { name: 'Nwabali', fullName: 'Stanley Nwabali', shortClub: 'Chippa Utd', position: 'GK', providerPlayerId: null },
  { name: 'Adeyinka', fullName: 'Adewale Adeyinka', shortClub: 'Nice', position: 'GK', providerPlayerId: null },
  { name: 'Osayi-Samuel', fullName: 'Bright Osayi-Samuel', shortClub: 'Fenerbahçe', position: 'DEF', providerPlayerId: null },
  { name: 'Ndukwe', fullName: 'Ifeanyi Ndukwe', shortClub: 'Levante', position: 'DEF', providerPlayerId: null },
  { name: 'Adarabioyo', fullName: 'Tosin Adarabioyo', shortClub: 'Chelsea', position: 'DEF', providerPlayerId: null },
  { name: 'Fredrick', fullName: 'Benjamin Fredrick', shortClub: 'Standard Liège', position: 'DEF', providerPlayerId: null },
  { name: 'Adiele', fullName: 'Emeka Adiele', shortClub: 'West Ham', position: 'DEF', providerPlayerId: null },
  { name: 'Nwaneri', fullName: 'Ethan Nwaneri', shortClub: 'Marseille', position: 'MID', providerPlayerId: null },
  { name: 'Onyeka', fullName: 'Frank Onyeka', shortClub: 'Brentford', position: 'MID', providerPlayerId: null },
  { name: 'Etebo', fullName: 'Peter Etebo', shortClub: 'Al Qadsiah', position: 'MID', providerPlayerId: null },
  { name: 'Chukwueze', fullName: 'Samuel Chukwueze', shortClub: 'AC Milan', position: 'MID', providerPlayerId: null },
  { name: 'Simon', fullName: 'Moses Simon', shortClub: 'Nantes', position: 'MID', providerPlayerId: null },
  { name: 'Awoniyi', fullName: 'Taiwo Awoniyi', shortClub: 'Forest', position: 'FWD', providerPlayerId: null },
  { name: 'Ekhator', fullName: 'Jeff Ekhator', shortClub: 'Juventus', position: 'FWD', providerPlayerId: null },
  { name: 'Iheanacho', fullName: 'Kelechi Iheanacho', shortClub: 'Sevilla', position: 'FWD', providerPlayerId: null },

  // --- BOARD: ranks 27-50 ---
  { name: 'Oyebade', fullName: 'Rayan Oyebade', shortClub: 'West Ham', position: 'DEF', providerPlayerId: null },
  { name: 'Adeniran', fullName: 'Samuel Adeniran', shortClub: 'LASK', position: 'FWD', providerPlayerId: null },
  { name: 'Adewumi', fullName: 'Oluwaseun Adewumi', shortClub: 'Hertha BSC', position: 'MID', providerPlayerId: null },
  { name: 'Ndiweni', fullName: 'Michael Ndiweni', shortClub: 'Genk', position: 'MID', providerPlayerId: null },
  { name: 'Eyerinde', fullName: 'Josh Eyerinde', shortClub: 'Hoffenheim', position: 'DEF', providerPlayerId: null },
  { name: 'Fobi', fullName: 'Kingsley Fobi', shortClub: 'Cercle Brugge', position: 'MID', providerPlayerId: null },
  { name: 'Obaje', fullName: 'Godwin Obaje', shortClub: 'Sivasspor', position: 'FWD', providerPlayerId: null },
  { name: 'Ndubuisi', fullName: 'Christian Ndubuisi', shortClub: 'KAA Gent', position: 'DEF', providerPlayerId: null },
  { name: 'Nwaiwu', fullName: 'Chibuike Nwaiwu', shortClub: 'Trabzonspor', position: 'DEF', providerPlayerId: null },
  { name: 'Kehinde', fullName: 'Tosin Kehinde', shortClub: 'Sparta Rotterdam', position: 'FWD', providerPlayerId: null },
  { name: 'Abiodun', fullName: 'Daniel Abiodun', shortClub: 'Real Sociedad B', position: 'GK', providerPlayerId: null },
  { name: 'Okonkwo', fullName: 'Chidi Okonkwo', shortClub: 'Norwich City', position: 'DEF', providerPlayerId: null },
  { name: 'Obiora Jr.', fullName: 'Emeka Obiora Jr.', shortClub: 'Basel', position: 'MID', providerPlayerId: null },
  { name: 'George', fullName: 'Tyrique George', shortClub: 'Chelsea', position: 'FWD', providerPlayerId: null },
  { name: 'Ezenwata', fullName: 'Chizzy Ezenwata', shortClub: 'Chelsea', position: 'FWD', providerPlayerId: null },
  { name: 'Ejiofor', fullName: 'Ugonna Ejiofor', shortClub: 'Molde', position: 'FWD', providerPlayerId: null },
  { name: 'Osaghae', fullName: 'Wisdom Osaghae', shortClub: 'Vitesse', position: 'DEF', providerPlayerId: null },
  { name: 'Nwabueze', fullName: 'Chuka Nwabueze', shortClub: 'Standard Liège', position: 'GK', providerPlayerId: null },
  { name: 'Fatukasi', fullName: 'Ola Fatukasi', shortClub: 'Randers', position: 'MID', providerPlayerId: null },
  { name: 'Iheukwumere', fullName: 'Marvellous Iheukwumere', shortClub: 'Anderlecht U21', position: 'FWD', providerPlayerId: null },
  { name: 'Okereke Jr.', fullName: 'David Okereke Jr.', shortClub: 'Trabzonspor', position: 'DEF', providerPlayerId: null },
  { name: 'Adekanye', fullName: 'Femi Adekanye', shortClub: 'Slavia Prague', position: 'MID', providerPlayerId: null },
  { name: 'Ibekwe', fullName: 'Uche Ibekwe', shortClub: 'KV Mechelen', position: 'FWD', providerPlayerId: null },
  { name: 'Troost-Ekong', fullName: 'William Troost-Ekong', shortClub: 'Besiktas', position: 'DEF', providerPlayerId: null },
];

module.exports = { POOL };
