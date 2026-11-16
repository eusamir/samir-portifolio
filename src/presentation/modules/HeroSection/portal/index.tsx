'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

import { progressIn, smoothstep } from '@/presentation/shared/lib/math'

export interface PortalHandle {
  setProgress: (p: number) => void
}

/** O anel âmbar que a câmera atravessa. Desenhado em vetor (nítido em qualquer escala). */
export const Portal = forwardRef<PortalHandle>(function Portal(_props, ref) {
  const svg = useRef<SVGSVGElement>(null)
  const inner = useRef<SVGCircleElement>(null)
  const ring = useRef<SVGCircleElement>(null)
  const geo = useRef({ x: 0, y: 0, r: 16, far: 1000 })
  const progress = useRef(0)

  const layout = useCallback(() => {
    const el = svg.current
    if (!el) return
    const w = el.clientWidth
    const h = el.clientHeight
    const mobile = w < 760
    const x = w * (mobile ? 0.8 : 0.78)
    const y = h * (mobile ? 0.22 : 0.3)
    const r = Math.max(16, Math.min(26, w * 0.016))
    geo.current = {
      x,
      y,
      r,
      far: Math.hypot(Math.max(x, w - x), Math.max(y, h - y)),
    }
    el.setAttribute('viewBox', `0 0 ${w} ${h}`)
    for (const c of [inner.current, ring.current]) {
      c?.setAttribute('cx', x.toFixed(1))
      c?.setAttribute('cy', y.toFixed(1))
    }
  }, [])

  const draw = useCallback((p: number) => {
    const { r, far } = geo.current
    const zoom = progressIn(p, 0.18, 0.74)
    const grow = Math.pow(zoom, 2.6)
    const rIn =
      (r - 2) * smoothstep(progressIn(p, 0.06, 0.2)) +
      grow * (far * 1.04 - (r - 2))
    inner.current?.setAttribute('r', Math.max(0, rIn).toFixed(1))
    ring.current?.setAttribute('r', (r + grow * (far * 1.1 - r)).toFixed(1))
    if (ring.current) {
      ring.current.style.strokeWidth = (4 + grow * 60).toFixed(1)
      ring.current.style.opacity = (1 - progressIn(zoom, 0.2, 0.3)).toFixed(3)
    }
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      setProgress: (p) => {
        progress.current = p
        draw(p)
      },
    }),
    [draw],
  )

  useEffect(() => {
    layout()
    draw(progress.current)
    const ro = new ResizeObserver(() => {
      layout()
      draw(progress.current)
    })
    if (svg.current) ro.observe(svg.current)
    return () => ro.disconnect()
  }, [layout, draw])

  return (
    <svg ref={svg} className="portal-svg" aria-hidden="true" focusable="false">
      <circle ref={inner} className="portal-in" r="0" />
      <circle ref={ring} className="portal-ring" r="16" />
    </svg>
  )
})
