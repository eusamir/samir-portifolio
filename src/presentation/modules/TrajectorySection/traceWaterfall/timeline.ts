/** Eixo do gráfico: de janeiro de 2021 até um respiro depois de 2027 */
export const AXIS_START = 2021
export const AXIS_END = 2027.25
const AXIS_LENGTH = AXIS_END - AXIS_START

/** Até onde a linha do tempo anda depois do último span */
export const SCRUB_END = 2027.08

/** Posição (0 a 1) de um ano decimal no eixo */
export const axisPosition = (year: number) => (year - AXIS_START) / AXIS_LENGTH

/** Quanto de um span já foi "percorrido" no instante `time` (0 a 1) */
export function spanProgress(
  start: number,
  end: number,
  time: number,
  isMilestone: boolean,
) {
  if (isMilestone) return time >= start ? 1 : 0
  return Math.min(
    1,
    Math.max(0, (Math.min(time, end) - start) / Math.max(0.001, end - start)),
  )
}

/** Converte o progresso do scroll no instante da linha do tempo e no span ativo */
export function scrubTime(progress: number, starts: number[]) {
  const count = starts.length
  const x = progress * count
  const index = Math.min(count - 1, Math.floor(x))
  const fraction = Math.min(1, x - index)
  const from = starts[index]!
  const to = index < count - 1 ? starts[index + 1]! : SCRUB_END
  return { time: from + (to - from) * fraction, index }
}
