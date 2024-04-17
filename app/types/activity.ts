import { type Category } from './category'
import { type LanguageType } from './language'

export enum Activity {
  VocabOnBoard,
  Zombie,
  HowAreYou,
  Dragon,
  HotPotato,
  Intro,
  Cleanup,
  Goodbye,
  VocabBingo,
  Song1,
  Song2,
  Song3,
  Rules,
  StickyCollage,
  StickyTargets,
  SlapCollage,
  SlapTargets,
  Charades,
  SpellingRace,
  SlapOrder,
  UnderlineVocab,
  MissingPicture,
  Wordsearch
}

export interface activityItem {
  id: string
  name: string
  category: Category
  media?: string
  language: LanguageType[]
  instructions?: string
  extra?: string
  layout: Layout
}

export enum Layout {
  onBoard,
  random,
  tabThrough,
  fillScreen,
  multimedia,
  worksheet
}
