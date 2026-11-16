import { TraceSpan } from '@/business/domain/TraceSpan'

import type { TraceSpanDTO } from '../dtos/DTO'

export class TrajectoryGatewayMapper {
  static toTraceSpan(data: TraceSpanDTO): TraceSpan {
    return new TraceSpan({ ...data, tags: data.tags ?? [] })
  }

  static toTraceSpans(data: TraceSpanDTO[]): TraceSpan[] {
    return data
      .map(TrajectoryGatewayMapper.toTraceSpan)
      .sort(
        (a, b) =>
          TraceSpan.toDecimal(a.props.start) -
          TraceSpan.toDecimal(b.props.start),
      )
  }
}
