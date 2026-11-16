import type { TraceSpanKind } from '@/business/domain/TraceSpan'

export interface TraceSpanDTO {
  id: string
  role: string
  organization: string
  kind: TraceSpanKind
  start: string
  end: string | null
  periodLabel: string
  title: string
  description: string
  tags: string[]
}
