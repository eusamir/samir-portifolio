import type { TraceSpan } from '@/business/domain/TraceSpan'

export interface TrajectoryGateway {
  getSpans(): Promise<TraceSpan[]>
}
