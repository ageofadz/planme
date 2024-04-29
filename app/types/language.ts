export interface LanguageItem {
  language: string
  image?: string
}

export interface Language {
  vocab: LanguageItem[]
  receptive: LanguageItem[]
  grammar: LanguageItem[]
  rules: LanguageItem[]
  review: LanguageItem[]
}

export function getLanguageType (val: number, language: Language): LanguageItem[] {
  switch (val) {
    case 0:
      return language.vocab
    case 1:
      return language.receptive
    case 2:
      return language.grammar
    case 3:
      return language.rules
    case 4:
      return language.review
    default:
      return language.vocab
  }
}

export enum LanguageType {
  vocab, receptive, grammar, rules, review, other
}
