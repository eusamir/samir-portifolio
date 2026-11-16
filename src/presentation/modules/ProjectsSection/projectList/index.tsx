'use client'

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react'
import { type PointerEvent, useState } from 'react'

import type { ProjectProps } from '@/business/domain/Project'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'

/** Lista de projetos com um cartão de prévia que segue o cursor (só em telas com mouse). */
export function ProjectList({ projects }: { projects: ProjectProps[] }) {
  const [hovered, setHovered] = useState<ProjectProps | null>(null)
  const { reduceMotion } = usePreferences()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 28 })
  const sy = useSpring(y, { stiffness: 260, damping: 28 })

  const onMove = (e: PointerEvent) => {
    x.set(e.clientX + 26)
    y.set(e.clientY - 70)
  }

  return (
    <>
      <ul className="index" onPointerMove={onMove}>
        {projects.map((p) => (
          <li
            key={p.name}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(p)}
            onPointerLeave={() => setHovered(null)}
          >
            <strong>{p.name}</strong>
            <p>
              {p.description}
              <span className="stack mono">{p.stack.join(', ')}</span>
            </p>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                {p.linkLabel ?? 'Ver site'}
              </a>
            ) : (
              <span />
            )}
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {hovered && !reduceMotion && (
          <motion.div
            className="pvcard"
            aria-hidden="true"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <span className="mono">{hovered.stack.join(', ')}</span>
            <strong>{hovered.name}</strong>
            <span>{hovered.description}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
