import type { PhotoShape, PhotoSize } from '@/business/domain/BackstagePhoto'

export interface BackstagePhotoDTO {
  image: { url: string }
  alt: string
  caption: string
  size: PhotoSize
  shape: PhotoShape
  offset?: 'up' | 'down' | null
  order: number
}
