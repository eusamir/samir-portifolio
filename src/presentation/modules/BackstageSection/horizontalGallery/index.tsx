'use client'

import Image from 'next/image'
import { useRef } from 'react'

import type { BackstagePhotoProps } from '@/business/domain/BackstagePhoto'
import { LogoMonogram } from '@/presentation/shared/components/ui/Logo'
import { RipSticker } from '@/presentation/shared/components/ui/RipSticker'
import { TornPaper } from '@/presentation/shared/components/ui/TornPaper'
import { cn } from '@/presentation/shared/lib/cn'
import { gsap, useGSAP } from '@/presentation/shared/lib/gsap'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'

const DEPTH = [1, 0.55, 1.25, 0.7, 1.1, 0.6]

/** Colagem horizontal guiada pelo scroll vertical, com fotos em profundidades diferentes. */
export function HorizontalGallery({
  photos,
  location,
}: {
  photos: BackstagePhotoProps[]
  location: string
}) {
  const pin = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const { isStatic } = usePreferences()

  useGSAP(
    () => {
      if (isStatic || !track.current || !pin.current) return
      const distance = () =>
        Math.max(0, track.current!.scrollWidth - pin.current!.clientWidth)
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      gsap.utils.toArray<HTMLElement>('.bs-item .photo').forEach((photo, i) => {
        const d = DEPTH[i % DEPTH.length]!
        gsap.fromTo(
          photo,
          {
            xPercent: 6 * (d - 0.8),
            yPercent: -8 * (d - 0.5),
            scale: 0.9 + 0.1 * d,
          },
          {
            xPercent: -6 * (d - 0.8),
            yPercent: 8 * (d - 0.5),
            ease: 'none',
            scrollTrigger: {
              trigger: photo,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        )
      })
    },
    {
      scope: pin,
      dependencies: [isStatic, photos.length],
      revertOnUpdate: true,
    },
  )

  const [first, second, ...rest] = photos

  const renderPhoto = (p: BackstagePhotoProps) => (
    <figure key={p.src} className={cn('bs-item', p.size, p.shape, p.offset)}>
      <div className="photo">
        <Image
          src={p.src}
          alt={p.alt}
          fill
          sizes="(max-width: 760px) 70vw, 40vw"
        />
      </div>
      <figcaption className="mono">{p.caption}</figcaption>
    </figure>
  )

  return (
    <div className="bs-pin" ref={pin}>
      <div className="bs-track" ref={track}>
        {first && renderPhoto(first)}
        {second && renderPhoto(second)}
        <div className="bs-item bs-mark" aria-hidden="true">
          <LogoMonogram className="bs-logo" />
          <span className="mono">{location}</span>
        </div>
        <div className="bs-item bs-rip">
          <RipSticker
            className="rip-bs"
            rotate={6}
            paper={<TornPaper seed={35} className="rip-paper" />}
          >
            <Image
              src="/images/heads/smirk.webp"
              alt=""
              width={300}
              height={420}
              sizes="160px"
            />
          </RipSticker>
        </div>
        {rest.map(renderPhoto)}
      </div>
    </div>
  )
}
