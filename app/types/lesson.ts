import { initialActivity, type activityItem } from './activity'
import type { Language } from './language'
import { optionsObj, type Options } from './options'

export interface Lesson {
  rows: activityItem[]
  tl: Language
  id?: string
  created?: Date
  updated?: Date
  options: Options
  user: string
}

export const initialLesson: Lesson = { rows: [], tl: { vocab: [], grammar: [], receptive: [], rules: [], review: [] }, options: optionsObj, user: '' }
