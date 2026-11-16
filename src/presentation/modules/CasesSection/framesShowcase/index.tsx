'use client'

import Image from 'next/image'
import { useRef } from 'react'

import type { ShowcaseImage } from '@/business/domain/CaseStudy'
import { gsap, useGSAP } from '@/presentation/shared/lib/gsap'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'

import { CameraSticker } from '../cameraSticker'

interface FramesShowcaseProps {
  url: string
  desktop: ShowcaseImage
  mobile: ShowcaseImage
  strip: (ShowcaseImage & { caption: string })[]
  withCamera?: boolean
}

/** Navegador e celular em profundidade: as telas entram deitadas e se levantam com a rolagem. */
export function FramesShowcase({
  url,
  desktop,
  mobile,
  strip,
  withCamera,
}: FramesShowcaseProps) {
  const root = useRef<HTMLDivElement>(null)
  const { isStatic } = usePreferences()

  useGSAP(
    () => {
      if (isStatic) return
      gsap.utils.toArray<HTMLElement>('.depth-card').forEach((card) => {
        gsap.fromTo(
          card,
          {
            rotateX: 18,
            scale: 0.86,
            transformPerspective: 1600,
            transformOrigin: '50% 0%',
          },
          {
            rotateX: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card.parentElement,
              start: 'top bottom',
              end: 'top 15%',
              scrub: true,
            },
          },
        )
      })
      gsap.fromTo(
        '.feat-main .phone',
        { y: 160 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.feat-main',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        },
      )
    },
    { scope: root, dependencies: [isStatic], revertOnUpdate: true },
  )

  return (
    <div className="wrap" ref={root}>
      <div className="feat">
        <div className="feat-main">
          {withCamera && <CameraSticker />}
          <div className="browser depth-card">
            <div className="bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span className="url mono">{url}</span>
            </div>
            <div className="shot">
              <Image
                src={desktop.src}
                alt={desktop.alt}
                fill
                sizes="(max-width: 760px) 100vw, 80vw"
              />
            </div>
          </div>
          <div className="phone">
            <div className="shot">
              <Image src={mobile.src} alt={mobile.alt} fill sizes="260px" />
            </div>
          </div>
        </div>
        <div className="feat-strip">
          {strip.map((s) => (
            <figure key={s.caption}>
              <div className="browser depth-card">
                <div className="bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="shot">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 30vw"
                  />
                </div>
              </div>
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
