'use client'

import { type ReactNode, useRef } from 'react'

import { gsap, ScrollTrigger, useGSAP } from '@/presentation/shared/lib/gsap'
import { progressIn, smoothstep } from '@/presentation/shared/lib/math'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'

import { GlyphField, type GlyphFieldHandle } from '../glyphField'
import { NameLens } from '../nameLens'
import { Portal, type PortalHandle } from '../portal'

/** Velocidade máxima das faixas de letras quando a câmera mergulha no anel */
const MAX_WARP = 9

/**
 * Coreografia da abertura: ao rolar, o nome sobe e some, as letras do logo aceleram
 * e a câmera atravessa o anel; o interior dele vira o fundo do manifesto.
 */
export function HeroStage({
  name,
  children,
}: {
  name: string
  children: ReactNode
}) {
  const root = useRef<HTMLDivElement>(null)
  const glyphs = useRef<GlyphFieldHandle>(null)
  const portal = useRef<PortalHandle>(null)
  const { isStatic } = usePreferences()

  useGSAP(
    () => {
      const section = root.current?.closest('section')
      if (!section || isStatic) {
        glyphs.current?.setWarp(1)
        portal.current?.setProgress(0)
        return
      }
      const nameEl = root.current!.querySelector('.hero-name')
      const footEl = root.current!.querySelector('.hero-foot')
      const fieldEl = root.current!.querySelector('.glyphs')
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: ({ progress: p }) => {
          const footOut = progressIn(p, 0, 0.2)
          const nameOut = smoothstep(progressIn(p, 0.08, 0.42))
          const fieldOut = smoothstep(progressIn(p, 0.35, 0.4))

          gsap.set(footEl, { opacity: 1 - footOut, y: -footOut * 40 })
          gsap.set(nameEl, {
            opacity: 1 - nameOut,
            y: -nameOut * 60,
            scale: 1 - nameOut * 0.08,
          })
          gsap.set(fieldEl, {
            opacity: 1 - fieldOut,
            scale: 1 + smoothstep(progressIn(p, 0, 0.8)) * 0.35,
          })
          glyphs.current?.setWarp(
            1 + smoothstep(progressIn(p, 0, 0.7)) * MAX_WARP,
          )
          portal.current?.setProgress(p)
        },
      })
    },
    { scope: root, dependencies: [isStatic], revertOnUpdate: true },
  )

  return (
    <div className="hero-sticky" ref={root}>
      <GlyphField ref={glyphs} />
      <Portal ref={portal} />
      <div className="hero wrap">
        <NameLens name={name} />
        {children}
      </div>
    </div>
  )
}
