'use client'

import { useRef } from 'react'

import { gsap, SplitText, useGSAP } from '@/presentation/shared/lib/gsap'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'

/** SplitText divide em palavras e o ScrollTrigger acende cada uma conforme a rolagem. */
export function ManifestoReveal({
  children,
  highlights,
}: {
  children: string
  highlights: string[]
}) {
  const pin = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLParagraphElement>(null)
  const { isStatic } = usePreferences()

  useGSAP(
    () => {
      if (!text.current) return
      const split = SplitText.create(text.current, {
        type: 'words',
        wordsClass: 'w',
      })
      split.words.forEach((w) => {
        if (highlights.includes(w.textContent ?? '')) w.classList.add('hot')
      })
      if (isStatic) {
        split.words.forEach((w) => w.classList.add('on'))
        return () => split.revert()
      }
      gsap.fromTo(
        text.current,
        { scale: 0.93 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: pin.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      )
      gsap.to(split.words, {
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: ({ progress }) => {
            const lit = Math.round(progress * split.words.length * 1.15)
            split.words.forEach((w, i) => w.classList.toggle('on', i < lit))
          },
        },
      })
      return () => split.revert()
    },
    { scope: pin, dependencies: [isStatic, highlights], revertOnUpdate: true },
  )

  return (
    <div className="mf-pin" ref={pin}>
      <div className="mf-stage">
        <p className="mf-text wrap" ref={text}>
          {children}
        </p>
      </div>
    </div>
  )
}
