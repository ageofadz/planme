export interface Options {
  dragonImage?: string
  theme?: 'black' | 'white' | 'league' | 'beige' | 'night' | 'serif' | 'simple' | 'solarized' | 'moon' | 'dracula' | 'sky' | 'blood'
  songs?: {
    intro?: string
    one?: string
    two?: string
    three?: string
    cleanup?: string
    goodbye?: string
    timer?: string
  }
  rules?: {
    sitNicely?: boolean
    listen?: boolean
    english?: boolean
    nice?: boolean
    tryBest?: boolean
    raiseHand?: boolean
    sticker?: boolean
  }
  generateHandouts?: boolean
  languageOrReading?: boolean
  rulesAfterActivities?: boolean
  name?: string
}

export const optionsObj: Options = {
  songs: {
    timer: 'https://www.youtube.com/watch?v=_W0bSen8Qjg',
    intro: 'https://www.youtube.com/watch?v=tVlcKp3bWH8',
    cleanup: 'https://www.youtube.com/watch?v=SFE0mMWbA-Y',
    goodbye: 'https://www.youtube.com/watch?v=PraN5ZoSjiY'

  },
  rules: {
    listen: true,
    sitNicely: true,
    english: true,
    nice: true,
    tryBest: true,
    raiseHand: true,
    sticker: true
  },
  dragonImage: 'https://media1.tenor.com/m/W9Dmn0ZkTmsAAAAC/dragon-rawr.gif',
  generateHandouts: true,
  rulesAfterActivities: true,
  theme: 'white'
}
