import type { StackLayer } from '@/business/domain/StackLayer'
import { stackData } from '@/infra/data/stack'

import { StackGatewayMapper } from './mappers/StackMapper'
import type { StackGateway } from './StackGateway'

export class StackGatewayLocal implements StackGateway {
  async getLayers(): Promise<StackLayer[]> {
    return StackGatewayMapper.toLayers(stackData)
  }
}
