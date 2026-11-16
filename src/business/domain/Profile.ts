export interface SocialLink {
  label: string
  value: string
  url: string
}

export interface FlightStory {
  text: string
  origin: { label: string; country: 'PT' | 'BR' }
  destination: { label: string; country: 'PT' | 'BR' }
}

export interface ProfileProps {
  name: string
  role: string
  location: string
  email: string
  socials: SocialLink[]
  manifesto: string
  /** Palavras do manifesto destacadas em âmbar */
  manifestoHighlights: string[]
  flight: FlightStory
  traceStart: string
}

export class Profile {
  constructor(public readonly props: ProfileProps) {}
}
