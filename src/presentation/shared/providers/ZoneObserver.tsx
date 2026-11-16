'use client'

import { ScrollTrigger, useGSAP } from '../lib/gsap'

/**
 * Troca as cores da página (zona clara/escura) quando cada seção cruza o meio
 * da tela. `refreshPriority: -1` calcula estes gatilhos depois das cenas fixas,
 * que mudam a altura da página.
 */
export function ZoneObserver() {
  useGSAP(() => {
    const sections = document.querySelectorAll<HTMLElement>('main [data-zone]')
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        refreshPriority: -1,
        onToggle: ({ isActive }) => {
          if (isActive) document.body.dataset.zone = section.dataset.zone
        },
      })
    })
  })

  return null
}
