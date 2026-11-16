import type { Profile } from '@/business/domain/Profile'
import { profileData } from '@/infra/data/profile'

import { ProfileGatewayMapper } from './mappers/ProfileMapper'
import type { ProfileGateway } from './ProfileGateway'

export class ProfileGatewayLocal implements ProfileGateway {
  async getProfile(): Promise<Profile | null> {
    return ProfileGatewayMapper.toProfile(profileData)
  }
}
