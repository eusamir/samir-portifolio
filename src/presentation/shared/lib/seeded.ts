/** Gerador pseudoaleatório determinístico: mesmo resultado no servidor e no cliente (sem erro de hidratação). */
export function seeded(seed: number) {
  let x = (seed * 9301 + 49297) % 233280
  return () => (x = (x * 9301 + 49297) % 233280) / 233280
}
