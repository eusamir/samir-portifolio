'use client'

import { useRef, useState } from 'react'

import { gsap, ScrollTrigger, useGSAP } from '@/presentation/shared/lib/gsap'

interface RailItem {
  id: string
  label: string
  position: number
}

/**
 * Minimapa lateral: cada seção com `data-rail` vira um nó do trace.
 * O progresso vai direto para a variável CSS `--p` (sem re-render por quadro).
 */
export function TraceRail() {
  const rail = useRef<HTMLElement>(null)
  const [items, setItems] = useState<RailItem[]>([])
  const [reached, setReached] = useState(0)

  useGSAP(
    () => {
      const setProgress = gsap.quickSetter(rail.current, '--p')
      let nodes: RailItem[] = []

      const layout = () => {
        const max = ScrollTrigger.maxScroll(window) || 1
        nodes = [...document.querySelectorAll<HTMLElement>('[data-rail]')].map(
          (el) => ({
            id: el.id,
            label: el.dataset.rail ?? '',
            position: Math.min(
              1,
              Math.max(
                0,
                (el.getBoundingClientRect().top + scrollY - innerHeight * 0.3) /
                  max,
              ),
            ),
          }),
        )
        setItems(nodes)
      }

      ScrollTrigger.addEventListener('refresh', layout)
      layout()

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: ({ progress }) => {
          setProgress(progress)
          const count = nodes.filter(
            (n) => progress >= n.position - 0.002,
          ).length
          setReached((prev) => (prev === count ? prev : count))
        },
      })

      return () => ScrollTrigger.removeEventListener('refresh', layout)
    },
    { scope: rail },
  )

  return (
    <nav className="rail" ref={rail} aria-label="Progresso da página">
      <div className="rail-track" />
      <div className="rail-fill" />
      <div className="rail-head" />
      <ol>
        {items.map((item, i) => (
          <li
            key={item.id}
            className={`${i < reached ? 'done' : ''} ${i === reached - 1 ? 'active' : ''}`}
            style={{ top: `${item.position * 100}%` }}
          >
            <button
              type="button"
              aria-label={`Ir para ${item.label}`}
              onClick={() =>
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <span className="node" aria-hidden="true" />
              <span className="lbl">{item.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
