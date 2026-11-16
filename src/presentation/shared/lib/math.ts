/** Limita um valor ao intervalo [min, max]. */
export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value))

/** Curva suave de 0 a 1 (smoothstep), usada nas transições guiadas pelo scroll. */
export const smoothstep = (t: number) => t * t * (3 - 2 * t)

/** Progresso de `value` dentro de [start, start + length], já limitado a [0, 1]. */
export const progressIn = (value: number, start: number, length: number) =>
  clamp((value - start) / length)
