import { BackstagePhoto } from '@/business/domain/BackstagePhoto'

import type { BackstagePhotoDTO } from '../dtos/DTO'

export class BackstageGatewayMapper {
  static toPhotos(data: BackstagePhotoDTO[]): BackstagePhoto[] {
    return [...data]
      .sort((a, b) => a.order - b.order)
      .map(
        (d) =>
          new BackstagePhoto({
            src: d.image.url,
            alt: d.alt,
            caption: d.caption,
            size: d.size,
            shape: d.shape,
            offset: d.offset ?? undefined,
          }),
      )
  }
}
