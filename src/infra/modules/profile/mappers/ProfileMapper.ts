import { Profile } from '@/business/domain/Profile'

import type { ProfileDTO } from '../dtos/DTO'

export class ProfileGatewayMapper {
  static toProfile(data: ProfileDTO): Profile {
    return new Profile({
      ...data,
      socials: data.socials ?? [],
      manifestoHighlights: data.manifestoHighlights ?? [],
    })
  }
}
