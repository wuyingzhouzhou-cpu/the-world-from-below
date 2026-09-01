export const BRAND = {
  name: "The World From Below",
  tagline: "Stories, books and images about ordinary lives inside history, culture and forces larger than ourselves.",
  question: "How do ordinary people live in a world they didn't design?",
  newsletter: {
    name: "Letters From Below",
    description: "One story, one question, and something worth reading.",
  },
}

export const photo = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export const photoRaw = (path: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/${path}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export const PHOTOS = {
  factoryHero:     '1569167419666-e94167ac991d',
  workbench:       '1768550005921-8782adcb798c',
  doorWorkers:     '1586776699177-b9d70feea1cd',
  cook:            '1741922519288-a5c9e8142f00',
  twoMen:          '1631733156581-2e204995e8d2',
  streetMarket:    '1781413587644-63623a927710',
  bench:           '1737028512200-beec1a39e2f0',
  runnersWatcher:  '1758506971926-658fab9f9d01',
  brooklynBuilding:'1557500608-1c483bc8d90d',
  brooklynSidewalk:'1590232588776-1abed3583f00',
  streetCorner:    '1768321611271-a53dfaa8cfe4',
  mumbaiFamily:    '1634622483410-f92a5433884a',
  mumbaiSkyline:   '1753806390395-dbf6773e02bd',
  trainStation:    '1567951171134-c7dccd06cf39',
  trainGroup:      '1572363044907-c338c12949e2',
}
