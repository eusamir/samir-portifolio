/** Nós de serviço desenhados por cima do nome (a "arquitetura" revelada pela lente). */
const SERVICE_NODES = [
  { label: 'edge', line: 1, at: 0.14, y: 112 },
  { label: 'auth', line: 1, at: 0.58, y: 58 },
  { label: 'service', line: 1, at: 0.96, y: 150 },
  { label: 'data', line: 2, at: 0.2, y: 326 },
  { label: 'queue', line: 2, at: 0.55, y: 376 },
  { label: 'logs', line: 2, at: 0.9, y: 298 },
] as const

export interface BlueprintNode {
  label: string
  x: number
  y: number
}

/** Posiciona os nós proporcionalmente à largura real de cada linha do nome. */
export function buildBlueprint(
  firstLineWidth: number,
  secondLineWidth: number,
) {
  const nodes: BlueprintNode[] = SERVICE_NODES.map((n) => ({
    label: n.label,
    x: (n.line === 1 ? firstLineWidth : secondLineWidth) * n.at,
    y: n.y,
  }))
  const [start, ...rest] = nodes
  const path = rest.reduce(
    (d, n) => `${d} H${n.x.toFixed(1)} V${n.y}`,
    `M${start!.x.toFixed(1)} ${start!.y}`,
  )
  return { nodes, path }
}

/** Trajeto da passada automática da lente na abertura (ease in-out com uma ondulação). */
export function introSweepPoint(t: number, width: number) {
  const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  return {
    x: -80 + (width * 0.78 + 80) * e,
    y: 130 + 230 * e + Math.sin(e * Math.PI * 2) * 60,
  }
}
