'use client'

import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react'

import { useInViewOnce } from '@/presentation/shared/hooks/useInViewOnce'
import { cn } from '@/presentation/shared/lib/cn'
import { useSound } from '@/presentation/shared/providers/SoundProvider'

interface RipStickerProps {
  className?: string
  rotate?: number
  flip?: boolean
  /** Papel rasgado renderizado no servidor (<TornPaper />) */
  paper: ReactNode
  children: ReactNode
  /** Conteúdo extra por cima do recorte (etiquetas, estrelas) */
  extra?: ReactNode
  onEnter?: () => void
}

/**
 * Recorte de colagem: o papel se rasga ao entrar na tela e a cabeça salta.
 * Só a detecção de entrada e o som rodam no cliente; o resto é CSS.
 */
export function RipSticker({
  className,
  rotate = 0,
  flip,
  paper,
  children,
  extra,
  onEnter,
}: RipStickerProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInViewOnce(ref, 0.4)
  const { play } = useSound()

  useEffect(() => {
    if (!inView) return
    play('tear')
    onEnter?.()
  }, [inView, play, onEnter])

  return (
    <figure
      ref={ref}
      aria-hidden="true"
      className={cn('rip', flip && 'flip', inView && 'in', className)}
      style={{ '--r': `${rotate}deg` } as CSSProperties}
    >
      {paper}
      <span className="rip-head">{children}</span>
      {extra}
      <i className="tape" />
    </figure>
  )
}
