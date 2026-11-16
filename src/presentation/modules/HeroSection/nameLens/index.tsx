'use client'

import { useCallback, useEffect, useRef } from 'react'

import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'

import { buildBlueprint, introSweepPoint } from './blueprint'

/** Quantos círculos formam o rastro da lente e o raio do maior deles */
const TRAIL = 16
const RADIUS = 158
const INTRO_DELAY_MS = 700
const INTRO_DURATION_MS = 2100
const NS = 'http://www.w3.org/2000/svg'

/**
 * O nome em tipografia grande. Uma lente que segue o cursor revela o "blueprint"
 * por baixo (contorno das letras, guias e nós de serviço). Na abertura, a lente passa sozinha uma vez.
 */
export function NameLens({ name }: { name: string }) {
  const [first, ...rest] = name.split(' ')
  const last = rest.join(' ')
  const wrap = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const lensGroup = useRef<SVGGElement>(null)
  const nodes = useRef<SVGGElement>(null)
  const path = useRef<SVGPathElement>(null)
  const l1 = useRef<SVGTextElement>(null)
  const l2 = useRef<SVGTextElement>(null)
  const { reduceMotion } = usePreferences()

  const state = useRef({
    target: null as null | { x: number; y: number },
    inside: false,
    energy: 0,
    last: 0,
    running: false,
    touched: false,
    W: 1300,
  })
  const trail = useRef(
    Array.from({ length: TRAIL }, () => ({ x: -999, y: -999 })),
  )
  const circles = useRef<SVGCircleElement[]>([])

  const layout = useCallback(() => {
    const s = svg.current
    if (!s || !l1.current || !l2.current) return
    const w1 = l1.current.getComputedTextLength()
    const w2 = l2.current.getComputedTextLength()
    const W = Math.ceil(Math.max(w1, w2)) + 14
    state.current.W = W
    s.setAttribute('viewBox', `-8 0 ${W} 468`)
    s.querySelectorAll<SVGElement>('.bp-wide').forEach((el) =>
      el.setAttribute('width', String(W + 120)),
    )
    s.querySelectorAll<SVGLineElement>('.bp-guide').forEach((el) =>
      el.setAttribute('x2', String(W + 60)),
    )
    const blueprint = buildBlueprint(w1, w2)
    path.current?.setAttribute('d', blueprint.path)
    const g = nodes.current
    if (!g) return
    g.textContent = ''
    for (const p of blueprint.nodes) {
      const c = document.createElementNS(NS, 'circle')
      c.setAttribute('class', 'bp-node')
      c.setAttribute('cx', String(p.x))
      c.setAttribute('cy', String(p.y))
      c.setAttribute('r', '9')
      const t = document.createElementNS(NS, 'text')
      t.setAttribute('class', 'bp-label')
      t.setAttribute('x', String(p.x + 16))
      t.setAttribute('y', String(p.y - 14))
      t.textContent = p.label
      g.append(c, t)
    }
  }, [])

  const frame = useCallback(
    (now: number) => {
      const st = state.current
      const moving = now - st.last < 140
      const goal = !st.inside ? 0 : moving ? 1 : 0.5
      st.energy += (goal - st.energy) * (reduceMotion ? 1 : 0.09)
      if (!st.inside && st.energy < 0.03) st.energy = 0
      const tr = trail.current
      if (st.target) {
        const f0 = reduceMotion ? 1 : 0.34
        const f1 = reduceMotion ? 1 : 0.42
        tr[0]!.x += (st.target.x - tr[0]!.x) * f0
        tr[0]!.y += (st.target.y - tr[0]!.y) * f0
        for (let i = 1; i < TRAIL; i++) {
          tr[i]!.x += (tr[i - 1]!.x - tr[i]!.x) * f1
          tr[i]!.y += (tr[i - 1]!.y - tr[i]!.y) * f1
        }
      }
      circles.current.forEach((c, i) => {
        const k = 1 - i / TRAIL
        c.setAttribute('cx', tr[i]!.x.toFixed(1))
        c.setAttribute('cy', tr[i]!.y.toFixed(1))
        c.setAttribute(
          'r',
          Math.max(0, RADIUS * st.energy * (0.3 + 0.7 * k)).toFixed(1),
        )
      })
      if (st.inside || st.energy > 0.003) requestAnimationFrame(frame)
      else st.running = false
    },
    [reduceMotion],
  )

  const kick = useCallback(() => {
    if (!state.current.running) {
      state.current.running = true
      requestAnimationFrame(frame)
    }
  }, [frame])

  const moveTo = useCallback(
    (pt: { x: number; y: number }) => {
      const st = state.current
      if (!st.inside) trail.current.forEach((t) => Object.assign(t, pt))
      st.target = pt
      st.inside = true
      st.last = performance.now()
      kick()
    },
    [kick],
  )

  useEffect(() => {
    const g = lensGroup.current
    if (!g) return
    circles.current = Array.from({ length: TRAIL }, () => {
      const c = document.createElementNS(NS, 'circle')
      c.setAttribute('fill', 'url(#lens-soft)')
      c.setAttribute('r', '0')
      g.appendChild(c)
      return c
    })
    layout()
    document.fonts?.ready.then(layout)
    return () => {
      g.textContent = ''
    }
  }, [layout])

  useEffect(() => {
    const el = wrap.current
    const s = svg.current
    if (!el || !s) return
    const toSvg = (e: PointerEvent) => {
      const m = s.getScreenCTM()
      if (!m) return { x: 0, y: 0 }
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse())
      return { x: p.x, y: p.y }
    }
    const onMove = (e: PointerEvent) => {
      state.current.touched = true
      moveTo(toSvg(e))
    }
    const onLeave = () => {
      state.current.inside = false
      kick()
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerdown', onMove)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointercancel', onLeave)

    // passada automática na abertura, para ensinar a interação
    let raf = 0
    const intro = setTimeout(() => {
      if (reduceMotion || state.current.touched) return
      const t0 = performance.now()
      const W = state.current.W
      const step = (now: number) => {
        if (state.current.touched) return
        const t = Math.min(1, (now - t0) / INTRO_DURATION_MS)
        moveTo(introSweepPoint(t, W))
        if (t < 1) raf = requestAnimationFrame(step)
        else onLeave()
      }
      raf = requestAnimationFrame(step)
    }, INTRO_DELAY_MS)

    return () => {
      clearTimeout(intro)
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerdown', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointercancel', onLeave)
    }
  }, [moveTo, kick, reduceMotion])

  return (
    <div className="hero-name" ref={wrap} aria-hidden="true">
      <svg ref={svg} viewBox="0 0 1300 470" focusable="false">
        <defs>
          <radialGradient id="lens-soft">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset=".66" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="bp-grid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path d="M36 0H0V36" className="bp-grid" />
          </pattern>
          <mask
            id="lens"
            maskUnits="userSpaceOnUse"
            x="-400"
            y="-300"
            width="2400"
            height="1100"
          >
            <rect x="-400" y="-300" width="2400" height="1100" fill="#000" />
            <g ref={lensGroup} />
          </mask>
        </defs>
        <g className="name-base">
          <text ref={l1} className="name-text" x="0" y="200">
            {first}
          </text>
          <text ref={l2} className="name-text" x="0" y="430">
            {last}
          </text>
        </g>
        <g mask="url(#lens)">
          <rect
            className="bp-bg bp-wide"
            x="-60"
            y="-40"
            width="1420"
            height="540"
            rx="22"
          />
          <rect
            className="bp-wide"
            x="-60"
            y="-40"
            width="1420"
            height="540"
            fill="url(#bp-grid)"
          />
          <line className="bp-guide" x1="-40" x2="1340" y1="200" y2="200" />
          <line className="bp-guide" x1="-40" x2="1340" y1="30" y2="30" />
          <line className="bp-guide" x1="-40" x2="1340" y1="430" y2="430" />
          <line className="bp-guide" x1="-40" x2="1340" y1="260" y2="260" />
          <text className="name-text bp-outline" x="0" y="200">
            {first}
          </text>
          <text className="name-text bp-outline" x="0" y="430">
            {last}
          </text>
          <path ref={path} id="bp-path" className="bp-edge" d="M0 0" />
          <g ref={nodes} />
          <circle className="bp-pulse" r="7">
            <animateMotion dur="5.5s" repeatCount="indefinite" rotate="auto">
              <mpath href="#bp-path" />
            </animateMotion>
          </circle>
        </g>
      </svg>
    </div>
  )
}
