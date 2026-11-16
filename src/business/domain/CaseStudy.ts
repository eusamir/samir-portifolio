export interface CaseSummaryItem {
  label: string
  text: string
}

export interface ShowcaseImage {
  src: string
  alt: string
}

export interface ScreenStep {
  title: string
  text: string
  url: string
  image: ShowcaseImage
}

export interface PhoneScreen {
  title: string
  text: string
  image: ShowcaseImage
}

export type CaseShowcase =
  | { type: 'screens'; steps: ScreenStep[] }
  | { type: 'phones'; screens: PhoneScreen[] }
  | {
      type: 'frames'
      url: string
      desktop: ShowcaseImage
      mobile: ShowcaseImage
      strip: (ShowcaseImage & { caption: string })[]
    }

export interface CaseProduct {
  flag: string
  name: string
  description: string
  url: string
}

export interface CaseFact {
  value: string
  label: string
}

export interface CaseStudyProps {
  slug: string
  railLabel: string
  kicker: string
  title: string
  summary: CaseSummaryItem[]
  notice?: string
  stack: string
  link?: { label: string; url: string }
  products?: {
    title: string
    intro: string
    items: CaseProduct[]
    facts: CaseFact[]
  }
  showcase: CaseShowcase
  /** Recorte animado que acompanha o caso */
  sticker?: 'camera' | 'fish'
  tone: 'light' | 'dark'
}

export class CaseStudy {
  constructor(public readonly props: CaseStudyProps) {}
}
