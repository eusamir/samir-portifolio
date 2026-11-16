export type PhotoSize = 'lg' | 'md' | 'sm'
export type PhotoShape = 'landscape' | 'portrait' | 'square'

export interface BackstagePhotoProps {
  src: string
  alt: string
  caption: string
  size: PhotoSize
  shape: PhotoShape
  /** Deslocamento vertical na colagem */
  offset?: 'up' | 'down'
}

export class BackstagePhoto {
  constructor(public readonly props: BackstagePhotoProps) {}
}
