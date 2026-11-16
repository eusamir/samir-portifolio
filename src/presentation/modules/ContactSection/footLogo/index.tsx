'use client'

import { useRef, useState } from 'react'

import { LogoWordmark } from '@/presentation/shared/components/ui/Logo'
import { gsap, useGSAP } from '@/presentation/shared/lib/gsap'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'

import { EasterEgg } from '../easterEgg'

/** Logo do rodapé desenhado com DrawSVG ao entrar na tela; a bolinha guarda uma surpresa. */
export function FootLogo() {
  const root = useRef<HTMLDivElement>(null)
  const [egg, setEgg] = useState(0)
  const { reduceMotion } = usePreferences()

  useGSAP(
    () => {
      if (reduceMotion) return
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      })
      tl.from('.logo path', {
        drawSVG: 0,
        duration: 1.4,
        stagger: 0.25,
        ease: 'power2.inOut',
      }).from(
        '.lg-ball',
        {
          scale: 0,
          transformOrigin: '50% 50%',
          duration: 0.5,
          ease: 'back.out(3)',
        },
        '-=0.3',
      )
    },
    { scope: root, dependencies: [reduceMotion], revertOnUpdate: true },
  )

  return (
    <div className="foot-logo" ref={root}>
      <LogoWordmark className="logo-big" pathLength={false} />
      <button
        type="button"
        className="egg-btn"
        aria-label="Clique na bolinha: tem uma surpresa"
        onClick={() => setEgg((n) => n + 1)}
      />
      <EasterEgg trigger={egg} />
    </div>
  )
}
