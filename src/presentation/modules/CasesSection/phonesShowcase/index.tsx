'use client'

import Image from 'next/image'
import { useRef } from 'react'

import type { PhoneScreen } from '@/business/domain/CaseStudy'
import { gsap, useGSAP } from '@/presentation/shared/lib/gsap'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'

/** Trio de celulares que chega em leque 3D e se alinha ao entrar na tela. */
export function PhonesShowcase({ screens }: { screens: PhoneScreen[] }) {
  const root = useRef<HTMLDivElement>(null)
  const { isStatic } = usePreferences()

  useGSAP(
    () => {
      if (isStatic) return
      gsap.utils.toArray<HTMLElement>('.phone').forEach((phone, i) => {
        const side = i - 1
        gsap.fromTo(
          phone,
          {
            y: side === 0 ? 220 : 120,
            rotateY: -side * 28,
            rotateZ: side * 4,
            transformPerspective: 1400,
          },
          {
            y: 0,
            rotateY: 0,
            rotateZ: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: phone.parentElement,
              start: 'top bottom',
              end: 'top 15%',
              scrub: true,
            },
          },
        )
      })
    },
    { scope: root, dependencies: [isStatic], revertOnUpdate: true },
  )

  return (
    <div className="wrap" ref={root}>
      <div className="phones">
        {screens.map((s) => (
          <figure key={s.title} className="phone-f">
            <div className="phone">
              <div className="shot">
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(max-width: 760px) 72vw, 270px"
                />
              </div>
            </div>
            <figcaption>
              <b>{s.title}</b>
              {s.text}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
