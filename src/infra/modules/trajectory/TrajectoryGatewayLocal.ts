import type { TraceSpan } from '@/business/domain/TraceSpan'
import { trajectoryData } from '@/infra/data/trajectory'

import { TrajectoryGatewayMapper } from './mappers/TrajectoryMapper'
import type { TrajectoryGateway } from './TrajectoryGateway'

export class TrajectoryGatewayLocal implements TrajectoryGateway {
  async getSpans(): Promise<TraceSpan[]> {
    return TrajectoryGatewayMapper.toTraceSpans(trajectoryData)
  }
}
