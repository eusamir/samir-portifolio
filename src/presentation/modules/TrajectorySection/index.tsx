import { TraceSpan } from '@/business/domain/TraceSpan'
import { makePageGateway } from '@/infra/factories/makePageGateway'
import { WinkSticker } from '@/presentation/shared/components/ui/Heads'

import { TraceWaterfall, type WaterfallSpan } from './traceWaterfall'

/**
 * Trajetória como um trace distribuído. O servidor converte as entidades em dados simples
 * (serializáveis) e renderiza títulos e textos; o gráfico animado é uma ilha de cliente.
 */
export async function TrajectorySection() {
  const { trajectory, profile } = makePageGateway()
  const [spans, result] = await Promise.all([
    trajectory.getSpans(),
    profile.getProfile(),
  ])
  const traceStart =
    result?.props.traceStart ?? spans[0]?.props.start ?? '2021-01'

  const data: WaterfallSpan[] = spans.map((s) => ({
    ...s.props,
    startDecimal: TraceSpan.toDecimal(s.props.start),
    endDecimal: s.props.end ? TraceSpan.toDecimal(s.props.end) : null,
  }))

  return (
    <section
      id="trajetoria"
      data-zone="b"
      data-rail="trajetória"
      aria-labelledby="h-traj"
    >
      <div className="wrap section-head">
        <WinkSticker className="rip-wink" />
        <h2 id="h-traj">Cinco anos, lidos como um trace.</h2>
        <p>
          Cada emprego é um span, com início e fim reais.{' '}
          <span className="if-pin">
            Role para percorrer o tempo: as barras se desenham conforme a linha
            do tempo passa por elas.
          </span>
          <span className="if-static">
            As barras mostram a duração de cada um, de 2021 até hoje.
          </span>
        </p>
      </div>
      <TraceWaterfall
        spans={data}
        traceStart={TraceSpan.toDecimal(traceStart)}
      />
    </section>
  )
}
