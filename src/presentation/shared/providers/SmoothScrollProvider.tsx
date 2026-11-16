'use client'

import Lenis from 'lenis'
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import { gsap, ScrollTrigger } from '@/presentation/shared/lib/gsap'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'

interface SmoothScrollControls {
  /** Trava a rolagem da página (ex.: com o menu aberto) */
  lock: () => void
  unlock: () => void
}

const SmoothScrollContext = createContext<SmoothScrollControls | null>(null)

/** Lenis sincronizado com o ticker do GSAP, para o ScrollTrigger não dessincronizar. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { reduceMotion } = usePreferences()
  const lenis = useRef<Lenis | null>(null)

  useEffect(() => {
    if (reduceMotion) return
    const instance = new Lenis({
      autoRaf: false,
      lerp: 0.12,
      anchors: { offset: -80 },
    })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    lenis.current = instance
    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      lenis.current = null
    }
  }, [reduceMotion])

  const controls = useMemo<SmoothScrollControls>(
    () => ({
      lock: () => {
        lenis.current?.stop()
        document.documentElement.classList.add('scroll-locked')
      },
      unlock: () => {
        lenis.current?.start()
        document.documentElement.classList.remove('scroll-locked')
      },
    }),
    [],
  )

  return (
    <SmoothScrollContext.Provider value={controls}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

export function useSmoothScroll(): SmoothScrollControls {
  const ctx = useContext(SmoothScrollContext)
  if (!ctx) {
    throw new Error(
      'useSmoothScroll precisa estar dentro de <SmoothScrollProvider>',
    )
  }
  return ctx
}
