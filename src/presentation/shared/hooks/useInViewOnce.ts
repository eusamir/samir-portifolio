'use client'

import { type RefObject, useEffect, useState } from 'react'

/** Vira `true` na primeira vez que o elemento entra na tela e para de observar. */
export function useInViewOnce<T extends Element>(
  ref: RefObject<T | null>,
  threshold = 0.4,
): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold, inView])

  return inView
}
