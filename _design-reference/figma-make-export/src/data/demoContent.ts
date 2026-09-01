/**
 * demoContent.ts
 *
 * All editorial demo data for The World From Below prototype.
 * This file is the single source of truth for placeholder content used
 * across all page and section components. Do not hardcode content inside
 * layout components — import it from here instead.
 *
 * DOCUMENTARY INTEGRITY NOTE:
 * All content is clearly labeled as editorial demo material.
 * Authors, titles, years, and place names reference verifiable published works.
 * Unverified images are described with "PLACEHOLDER IMAGE" in alt text.
 */

import { PHOTOS } from '../config'

// ---------------------------------------------------------------------------
// Places
// ---------------------------------------------------------------------------

export type Place = {
  name: string
  country: string
  region: string
  imgId: string
  summary: string
  forces: string[]
  storyCount: number
}

export const places: Place[] = [
  {
    name: 'Shenyang',
    country: 'China',
    region: 'Northeast',
    imgId: PHOTOS.trainStation,
    summary: 'Once the iron heart of Chinese socialist industry. After the layoffs, a city reckoning with what remains.',
    forces: ['Work', 'Industrial Decline', 'Class'],
    storyCount: 4,
  },
  {
    name: 'Brooklyn',
    country: 'USA',
    region: 'New York',
    imgId: PHOTOS.brooklynSidewalk,
    summary: 'Multiple Brooklyns exist simultaneously: the working-class borough of the 20th century and the expensive address of the 21st.',
    forces: ['Class', 'Urbanization', 'Identity'],
    storyCount: 3,
  },
  {
    name: 'Mumbai',
    country: 'India',
    region: 'Maharashtra',
    imgId: PHOTOS.mumbaiSkyline,
    summary: 'Sixteen million people finding ways to live in proximity. The city as daily negotiation.',
    forces: ['Migration', 'Work', 'Family'],
    storyCount: 2,
  },
  {
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    region: 'Kuala Lumpur Federal Territory',
    imgId: PHOTOS.runnersWatcher,
    summary: 'A city assembled from migration. Multiple cultures living beside each other, sometimes inside each other.',
    forces: ['Migration', 'Identity', 'Urbanization'],
    storyCount: 2,
  },
  {
    name: 'Oakland',
    country: 'USA',
    region: 'California',
    imgId: PHOTOS.bench,
    summary: 'Across the bay from San Francisco. What happens to a city when the money arrives next door.',
    forces: ['Class', 'Urbanization', 'Power'],
    storyCount: 2,
  },
]

// ---------------------------------------------------------------------------
// Library Works
// ---------------------------------------------------------------------------

export type Medium = 'Book' | 'Film' | 'Photography'

export type Work = {
  title: string
  author: string
  year: number
  medium: Medium
  places: string[]
  forces: string[]
  note: string
  bgColor: string
  fgColor: string
}

export const works: Work[] = [
  {
    title: 'A Tree Grows in Brooklyn',
    author: 'Betty Smith',
    year: 1943,
    medium: 'Book',
    places: ['Brooklyn'],
    forces: ['Class', 'Family', 'Education'],
    note: 'A working-class girl navigates poverty, aspiration, and family love in early 20th century Williamsburg. Extraordinary in its attention to the texture of ordinary life.',
    bgColor: '#2A1F14',
    fgColor: '#C8B89A',
  },
  {
    title: 'Still Life',
    author: 'Jia Zhangke',
    year: 2006,
    medium: 'Film',
    places: ['Shenyang'],
    forces: ['Work', 'Family', 'Industrial Decline'],
    note: "Jia's most tender film — two strangers travel to a town being swallowed by the Three Gorges Dam, about loss that is too slow to call catastrophe.",
    bgColor: '#1A2030',
    fgColor: '#8AABB8',
  },
  {
    title: 'Factory Girls',
    author: 'Leslie T. Chang',
    year: 2008,
    medium: 'Book',
    places: ['Shenyang'],
    forces: ['Work', 'Migration', 'Identity'],
    note: 'Chang follows young women from rural China as they make their way in factory towns. Essential for understanding what the Chinese economic miracle felt like from the inside.',
    bgColor: '#1F1820',
    fgColor: '#B8A0B0',
  },
  {
    title: 'Platform',
    author: 'Jia Zhangke',
    year: 2000,
    medium: 'Film',
    places: ['Shenyang'],
    forces: ['Work', 'Identity', 'Industrial Decline'],
    note: 'A decade in the life of a small-town performance troupe as China opens to the market. A slow, patient, devastating film.',
    bgColor: '#1A1A14',
    fgColor: '#B0AA88',
  },
  {
    title: 'Farewell My Concubine',
    author: 'Chen Kaige',
    year: 1993,
    medium: 'Film',
    places: ['Shenyang'],
    forces: ['Power', 'Identity', 'Family'],
    note: 'Two Peking opera performers across fifty years of Chinese history. How people survive what history does to them.',
    bgColor: '#201018',
    fgColor: '#B88898',
  },
  {
    title: 'The Uses of Literacy',
    author: 'Richard Hoggart',
    year: 1957,
    medium: 'Book',
    places: ['Brooklyn'],
    forces: ['Class', 'Education', 'Identity'],
    note: "A foundational text in cultural studies. Hoggart's portrait of working-class life in Britain — its warmth, its textures, what mass culture does to it.",
    bgColor: '#141A14',
    fgColor: '#90A888',
  },
  {
    title: 'Maximum City',
    author: 'Suketu Mehta',
    year: 2004,
    medium: 'Book',
    places: ['Mumbai'],
    forces: ['Urbanization', 'Migration', 'Power'],
    note: "An immersive portrait of Mumbai — its gangsters, bar girls, police, and millions of ordinary people trying to survive the city's intensity.",
    bgColor: '#201810',
    fgColor: '#C0A878',
  },
  {
    title: 'In the Mood for Love',
    author: 'Wong Kar-wai',
    year: 2000,
    medium: 'Film',
    places: ['Kuala Lumpur'],
    forces: ['Family', 'Migration', 'Identity'],
    note: 'Two neighbours in a Shanghai émigré apartment block in 1962 Hong Kong. A film about restraint, longing, and the life not lived.',
    bgColor: '#1A0A10',
    fgColor: '#C07878',
  },
  {
    title: 'Surviving the Rust Belt',
    author: 'Various',
    year: 2018,
    medium: 'Photography',
    places: ['Oakland', 'Shenyang'],
    forces: ['Work', 'Industrial Decline', 'Class'],
    note: 'A documentary photography collection following deindustrialisation across the American midwest and Chinese northeast. Remarkable parallels.',
    bgColor: '#181818',
    fgColor: '#A0A0A0',
  },
]

// ---------------------------------------------------------------------------
// Forces
// ---------------------------------------------------------------------------

export type Force = {
  name: string
  question: string
  description: string
  places: string[]
  storyCount: number
}

export const forces: Force[] = [
  {
    name: 'Work',
    question: 'What does labour do to a life — not just economically, but psychologically, socially, temporally?',
    description: 'Work organizes time, identity, community, and status. When it disappears, something larger than income is lost.',
    places: ['Shenyang', 'Mumbai', 'Oakland'],
    storyCount: 6,
  },
  {
    name: 'Class',
    question: 'How does social position determine not just material conditions but the range of imaginable futures?',
    description: "Class is not only economic. It is a cultural inheritance, a set of dispositions, an inner sense of where you belong and where you don't.",
    places: ['Brooklyn', 'Oakland'],
    storyCount: 5,
  },
  {
    name: 'Migration',
    question: 'What is lost, gained, and transformed when people leave one world to enter another?',
    description: 'Migration is not a single event but a long adjustment — of language, habit, memory, and self.',
    places: ['Kuala Lumpur', 'Mumbai', 'Brooklyn'],
    storyCount: 4,
  },
  {
    name: 'Family',
    question: 'How do families hold together — or come apart — under economic and social pressure?',
    description: 'The family is the smallest institution, and often the most resilient. It absorbs what larger systems cannot carry.',
    places: ['Shenyang', 'Mumbai'],
    storyCount: 4,
  },
  {
    name: 'Education',
    question: 'What does schooling teach, and what does it require you to leave behind?',
    description: 'Education is presented as opportunity. Less often discussed: the cost of crossing, and what you cannot take with you.',
    places: ['Brooklyn', 'Kuala Lumpur'],
    storyCount: 3,
  },
  {
    name: 'Power',
    question: 'How does authority enter ordinary life — not as spectacle, but as daily constraint?',
    description: 'Power is mostly experienced not as event but as condition: the shape of what is possible and what is not.',
    places: ['Shenyang', 'Mumbai'],
    storyCount: 3,
  },
  {
    name: 'Identity',
    question: 'How do people construct a self inside conditions that tell them who they are?',
    description: 'Identity is not given — it is made, maintained, and sometimes remade under pressure.',
    places: ['Kuala Lumpur', 'Brooklyn', 'Mumbai'],
    storyCount: 3,
  },
  {
    name: 'Industrial Decline',
    question: 'What happens to a world built around production when production moves, or disappears?',
    description: 'The post-industrial landscape is more than an economic phenomenon. It is an experience of loss without ceremony.',
    places: ['Shenyang', 'Oakland'],
    storyCount: 3,
  },
  {
    name: 'Urbanization',
    question: 'What does the city do to the people who arrive in it — and to those already there?',
    description: 'Cities are not neutral containers. They accelerate, displace, mix, and stratify.',
    places: ['Mumbai', 'Kuala Lumpur', 'Brooklyn'],
    storyCount: 2,
  },
]

// ---------------------------------------------------------------------------
// Field Notes — full content
// ---------------------------------------------------------------------------

export type FieldNote = {
  n: string
  date: string
  title: string
  forces: string[]
  body: string
}

export const allNotes: FieldNote[] = [
  {
    n: '01',
    date: 'December 2024',
    title: '"Why is humiliation such an effective form of control?"',
    forces: ['Power', 'Class'],
    body: `Institutions that wish to control people rarely need to use violence. Violence is expensive, unreliable, and generates resistance. What works better — more efficiently, more durably — is humiliation. The small, daily experience of being made to feel that you are less than, that your presence is conditional, that the space you occupy is a favour rather than a right.

This is what James Scott calls the "hidden transcript" — the performance of deference that subordinate groups enact before power, and the alternative reality they maintain among themselves. The performance is not false exactly. It is strategic. It is how you survive the room.

The genius of humiliation as control is that it naturalises hierarchy. If you can make people feel that their lower position reflects something true about them — their intelligence, their worthiness, their culture, their competence — you do not need to enforce that position from outside. They police it themselves. This is why dignity, when it is asserted in conditions of subordination, is such a political act. It refuses the premise.`,
  },
  {
    n: '02',
    date: 'November 2024',
    title: '"The last generation to know the old industrial order"',
    forces: ['Work', 'Industrial Decline'],
    body: `There is a generation alive now — in their sixties and seventies in China, in their seventies and eighties in Britain, Pennsylvania, the Ruhr — who remember what it felt like to work in a factory that expected to exist forever. This is not nostalgia for factory work. Factory work was often hard, dangerous, monotonous, and badly paid. It is something more specific: the memory of economic certainty. Of knowing what next year would look like. Of a job you would pass on to your children if you chose.

That generation is leaving us. And with them goes a particular kind of testimony — not about what work was like in the abstract, but about how it shaped a life, a neighbourhood, a set of expectations about what it meant to be a person in the world.

Oral historians are racing to record this testimony. They are right to race.`,
  },
  {
    n: '03',
    date: 'November 2024',
    title: '"What a kitchen can tell you about a country"',
    forces: ['Family', 'Migration'],
    body: `When my grandmother moved from rural Fujian province to a city apartment in Guangzhou, she brought with her a wok that was older than she was. The wok came from her mother's kitchen. It was black, seasoned beyond any possible cleaning, heavy in a way that made you aware of the arm that had learned to use it.

The kitchen is perhaps the most private public space in any home: the place where domestic economy is most visible, where the compromises between what you can afford and what you want to eat are most legible, where the traces of origin and migration are most honestly preserved.

Food writers sometimes miss this in their enthusiasm for authenticity. The migrant kitchen is not about authenticity. It is about negotiation. Between what you had and what is available. Between what you remember and what you can make here, now, with these ingredients.`,
  },
  {
    n: '04',
    date: 'October 2024',
    title: '"Learning to be somewhere else: notes on migration and language"',
    forces: ['Migration', 'Identity'],
    body: `Learning a new language as an adult is not just cognitive. It is an experience of diminishment. You arrive in a new country with a full personality — opinions, humour, a sense of irony, the ability to disagree with precision — and find that you cannot adequately express most of it. You become, linguistically, a child.

The migrant's interior life often runs on two tracks simultaneously: the full, rich, complex life in the first language (thought, dream, prayer, anger) and the simpler, effortful, imprecise life in the second (transactions, explanations, requests for help). The two tracks do not always connect. There are things you can say in one language that have no equivalent in the other.

Eva Hoffman's memoir Lost in Translation describes this with unusual precision. To translate yourself, she suggests, is not just to move words from one column to another. It is to lose — temporarily, sometimes permanently — the self that the words were attached to.`,
  },
  {
    n: '05',
    date: 'October 2024',
    title: '"The dignity of small shops"',
    forces: ['Work', 'Urbanization'],
    body: `The corner shop, the small café, the family restaurant that has been on the same block for thirty years: these are not just economic units. They are, in neighbourhood life, a form of collective memory. The owner knows what happened to the building next door. They remember the family that used to live in the apartment above. They have watched who moved in and who moved out.

Urban redevelopment tends to treat small commercial spaces as inefficiencies to be optimized. The calculations are about rent, footfall, rates of return. What they miss is the social function of the small shop — its role as neighbourhood anchor, informal information exchange, the place where you can be known rather than processed.

When a neighbourhood loses its small shops, it does not simply lose convenience. It loses a certain kind of social tissue. The corner is just a corner again.`,
  },
]

// ---------------------------------------------------------------------------
// Homepage Field Notes summary (short list for homepage section)
// ---------------------------------------------------------------------------

export type HomeFieldNote = { code: string; title: string; date: string }

export const homeFieldNotes: HomeFieldNote[] = [
  { code: 'FN-001', title: '"Why is humiliation such an effective form of control?"', date: 'Sep 2026' },
  { code: 'FN-002', title: '"The last generation to know the old industrial order"',  date: 'Aug 2026' },
  { code: 'FN-003', title: '"What a kitchen can tell you about a country"',           date: 'Aug 2026' },
  { code: 'FN-004', title: '"Learning to be somewhere else: notes on migration and language"', date: 'Jul 2026' },
  { code: 'FN-005', title: '"The dignity of small shops"',                            date: 'Jul 2026' },
]

// ---------------------------------------------------------------------------
// Homepage forces — editorial weighting for Issue 001
// Work, Migration, Identity are 'primary' (larger) per editorial decision
// ---------------------------------------------------------------------------

export type HomeForce = { name: string; n: string; weight: 'primary' | 'secondary' }

export const homeForces: HomeForce[] = [
  { name: 'Work',         n: '01', weight: 'primary'   },
  { name: 'Class',        n: '02', weight: 'secondary' },
  { name: 'Migration',    n: '03', weight: 'primary'   },
  { name: 'Family',       n: '04', weight: 'secondary' },
  { name: 'Education',    n: '05', weight: 'secondary' },
  { name: 'Power',        n: '06', weight: 'secondary' },
  { name: 'Identity',     n: '07', weight: 'primary'   },
  { name: 'Urbanization', n: '08', weight: 'secondary' },
]
