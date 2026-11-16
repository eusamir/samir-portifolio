/** Rota com um looping no meio do Atlântico, de Ovar (direita) a São Luís (esquerda). */
export const FLIGHT_ROUTE =
  'M792 92 C700 40 610 64 570 138 C540 196 604 228 616 188 C628 148 548 146 506 206 C452 282 362 262 288 196'

/** Contornos simplificados, no espírito de recorte de mapa */
export const PORTUGAL_SHAPE =
  'M800 38 L852 44 L860 82 L844 112 L852 152 L840 192 L832 228 L812 236 L796 206 L788 170 L778 130 L782 90 L790 60 Z'
export const BRAZIL_SHAPE =
  'M186 172 L240 166 L302 190 L362 212 L376 250 L348 302 L302 342 L256 384 L220 408 L192 396 L198 360 L158 332 L118 300 L88 268 L92 228 L128 202 L158 186 Z'

export const ORIGIN_PIN = { x: 792, y: 92 }
export const DESTINATION_PIN = { x: 288, y: 196 }

/** Stop-motion: quantos quadros o voo tem e quanto tempo dura cada um */
export const FLIGHT_TIMING = {
  steps: 30,
  frameMs: 150,
  holdAfterLandingMs: 1800,
  takeoffSoundDelayMs: 120,
}

export const PLANE = {
  width: 150,
  height: 39.5,
  landedScale: 0.85,
  hoverAboveLanding: 26,
}
