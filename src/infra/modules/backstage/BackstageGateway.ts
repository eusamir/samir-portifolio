import type { BackstagePhoto } from '@/business/domain/BackstagePhoto'

export interface BackstageGateway {
  getPhotos(): Promise<BackstagePhoto[]>
}
