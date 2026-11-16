'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/presentation/shared/lib/cn'
import {
  LogoMonogram,
  LogoWordmark,
} from '@/presentation/shared/components/ui/Logo'

/** "SAM" se recolhe e vira o monograma ao rolar; volta a se desenhar no topo. */
export function HeaderLogo() {
  const [scrolled, setScrolled] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    const onScroll = () => setScrolled(scrollY > 60)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(id)
      removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <a
      className={cn('mark', ready && 'ready', scrolled && 'scrolled')}
      href="#inicio"
      aria-label="Samir Andrade, voltar ao início"
    >
      <LogoWordmark className="logo-word" />
      <LogoMonogram className="logo-mono" />
    </a>
  )
}
