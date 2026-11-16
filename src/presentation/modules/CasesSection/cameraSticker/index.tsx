'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'

import { RipSticker } from '@/presentation/shared/components/ui/RipSticker'
import { TornPaper } from '@/presentation/shared/components/ui/TornPaper'
import { useSound } from '@/presentation/shared/providers/SoundProvider'

/** Câmera com três tiltes em stop-motion; dispara o flash ao aparecer e a cada clique. */
export function CameraSticker() {
  const { play } = useSound()
  const [flash, setFlash] = useState(0)
  const shotOnce = useRef(false)

  const shoot = useCallback(() => {
    setFlash((f) => f + 1)
    play('camera')
  }, [play])

  const onEnter = useCallback(() => {
    if (shotOnce.current) return
    shotOnce.current = true
    setTimeout(shoot, 900)
  }, [shoot])

  return (
    <button
      type="button"
      className="cam-hit"
      onClick={shoot}
      aria-label="Tirar uma foto com a câmera"
    >
      <RipSticker
        className="rip-cam"
        rotate={-5}
        paper={<TornPaper seed={33} className="rip-paper" />}
        onEnter={onEnter}
        extra={flash ? <span key={flash} className="cam-flash" /> : null}
      >
        <Image
          src="/images/collage/camera.webp"
          alt=""
          width={505}
          height={380}
          sizes="220px"
        />
      </RipSticker>
    </button>
  )
}
