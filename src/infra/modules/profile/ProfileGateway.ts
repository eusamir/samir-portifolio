import type { Profile } from '@/business/domain/Profile'

export interface ProfileGateway {
  getProfile(): Promise<Profile | null>
}
