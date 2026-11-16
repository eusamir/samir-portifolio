'use client'

import Image from 'next/image'
import { type CSSProperties, useRef, useState } from 'react'

import type { ScreenStep } from '@/business/domain/CaseStudy'
import { cn } from '@/presentation/shared/lib/cn'
import { ScrollTrigger, useGSAP } from '@/presentation/shared/lib/gsap'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'

/** Galeria fixa: a jornada em passos à esquerda e as telas trocando dentro do navegador. */
export function ScreensShowcase({ steps }: { steps: ScreenStep[] }) {
  const pin = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { isStatic } = usePreferences()

  useGSAP(
    () => {
      if (isStatic || !pin.current) return
      ScrollTrigger.create({
        trigger: pin.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: ({ progress }) =>
          setActive(
            Math.min(steps.length - 1, Math.floor(progress * steps.length)),
          ),
      })
    },
    {
      scope: pin,
      dependencies: [isStatic, steps.length],
      revertOnUpdate: true,
    },
  )

  const current = steps[active] ?? steps[0]

  return (
    <div className="shots">
      <div
        className="pin"
        ref={pin}
        style={{ '--steps': steps.length } as CSSProperties}
      >
        <div className="pin-stage">
          <div className="wrap shots-grid">
            <ol className="shots-steps">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className={cn((isStatic || i === active) && 'on')}
                >
                  <h5>{s.title}</h5>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            <figure className="device">
              <div className="browser depth-card">
                <div className="bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span className="url mono">{current?.url}</span>
                </div>
                <div className="screens">
                  {steps.map((s, i) => (
                    <div
                      key={s.title}
                      className={cn(
                        'screen',
                        (isStatic || i === active) && 'on',
                      )}
                    >
                      <Image
                        src={s.image.src}
                        alt={s.image.alt}
                        fill
                        sizes="(max-width: 860px) 100vw, 60vw"
                      />
                      <span className="cap">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <figcaption className="arch-disclaimer">
                Telas públicas do produto em produção, capturadas dos sites
                oficiais.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  )
}
