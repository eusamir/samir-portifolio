import type { BackstagePhoto } from '@/business/domain/BackstagePhoto'
import { backstageData } from '@/infra/data/backstage'

import type { BackstageGateway } from './BackstageGateway'
import { BackstageGatewayMapper } from './mappers/BackstageMapper'

export class BackstageGatewayLocal implements BackstageGateway {
  async getPhotos(): Promise<BackstagePhoto[]> {
    return BackstageGatewayMapper.toPhotos(backstageData)
  }
}
