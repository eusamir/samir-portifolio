/** Um período da carreira, lido como um span de trace distribuído. */
export type TraceSpanKind = 'job' | 'parallel' | 'milestone'

export interface TraceSpanProps {
  id: string
  role: string
  organization: string
  kind: TraceSpanKind
  /** Início no formato YYYY-MM */
  start: string
  /** Fim no formato YYYY-MM; `null` para spans ainda em execução */
  end: string | null
  periodLabel: string
  title: string
  description: string
  tags: string[]
}

export class TraceSpan {
  constructor(public readonly props: TraceSpanProps) {}

  get isOpen(): boolean {
    return this.props.end === null && this.props.kind !== 'milestone'
  }

  /** Converte YYYY-MM em ano decimal (2021-07 -> 2021.5) */
  static toDecimal(value: string): number {
    const [year, month] = value.split('-').map(Number)
    return (year ?? 0) + ((month ?? 1) - 1) / 12
  }
}
