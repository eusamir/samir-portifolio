'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'

import { gsap, useGSAP } from '@/presentation/shared/lib/gsap'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'

import { GLYPHS, LANES, SEQUENCE } from './glyphs'

export interface GlyphFieldHandle {
  /** Multiplica a velocidade das faixas (1 = normal) */
  setWarp: (factor: number) => void
}

const SVG_NS = 'http://www.w3.org/2000/svg'

/** Monta uma faixa com peças suficientes para cobrir a tela, duplicadas para o loop. */
function buildLane(lane: (typeof LANES)[number], viewportWidth: number) {
  const element = document.createElement('div')
  element.className = 'lane'
  element.style.top = `${lane.top}%`
  element.style.opacity = String(lane.op)
  const track = document.createElement('div')
  track.className = 'lane-track'

  const pieces: SVGSVGElement[] = []
  let width = 0
  let n = lane.off
  while (width < viewportWidth + 200) {
    const glyph = GLYPHS[SEQUENCE[n % SEQUENCE.length]!]
    n++
    const svg = document.createElementNS(SVG_NS, 'svg')
    svg.setAttribute('viewBox', glyph.vb)
    svg.setAttribute('class', 'gl')
    svg.innerHTML = glyph.html
    svg.style.width = `${lane.size * glyph.w}px`
    svg.style.marginRight = `${lane.size * lane.gap}px`
    svg.style.transform = `translateY(${(((n * 37) % 5) - 2) * lane.size * 0.18}px) rotate(${((n * 53) % 30) - 15}deg)`
    pieces.push(svg)
    width += lane.size * glyph.w + lane.size * lane.gap
  }
  pieces.forEach((piece) => track.appendChild(piece))
  pieces.forEach((piece) => track.appendChild(piece.cloneNode(true)))
  element.appendChild(track)
  return { element, track, width }
}

/**
 * Peças do logo correndo em faixas sem fim. Cada faixa é um tween infinito do
 * GSAP; todas ficam numa timeline cujo `timeScale` acelera no mergulho do hero.
 */
export const GlyphField = forwardRef<GlyphFieldHandle>(
  function GlyphField(_props, ref) {
    const field = useRef<HTMLDivElement>(null)
    const loop = useRef<gsap.core.Timeline | null>(null)
    const { reduceMotion } = usePreferences()

    useImperativeHandle(ref, () => ({
      setWarp: (factor) => loop.current?.timeScale(factor),
    }))

    useGSAP(
      () => {
        const container = field.current
        if (!container) return
        container.textContent = ''
        const timeline = gsap.timeline()

        LANES.forEach((lane, i) => {
          const { element, track, width } = buildLane(
            lane,
            container.clientWidth || innerWidth,
          )
          container.appendChild(element)
          const offset = (i * 137) % width
          timeline.fromTo(
            track,
            { x: -offset, yPercent: -50 },
            {
              x: -offset - width,
              duration: width / lane.speed,
              ease: 'none',
              repeat: -1,
            },
            0,
          )
        })

        loop.current = timeline
        if (reduceMotion) timeline.pause()
        return () => {
          timeline.kill()
          loop.current = null
        }
      },
      { scope: field, dependencies: [reduceMotion], revertOnUpdate: true },
    )

    return <div className="glyphs" ref={field} aria-hidden="true" />
  },
)
