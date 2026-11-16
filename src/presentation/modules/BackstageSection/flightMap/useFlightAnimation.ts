'use client'

import { type RefObject, useRef } from 'react'

import { gsap, ScrollTrigger, useGSAP } from '@/presentation/shared/lib/gsap'
import { usePreferences } from '@/presentation/shared/providers/PreferencesProvider'
import { useSound } from '@/presentation/shared/providers/SoundProvider'

import { FLIGHT_TIMING, PLANE } from './constants'

interface FlightRefs {
  figure: RefObject<HTMLElement | null>
  route: RefObject<SVGPathElement | null>
  trail: RefObject<SVGPathElement | null>
  plane: RefObject<SVGGElement | null>
  landingRing: RefObject<SVGCircleElement | null>
}

/** Pseudoaleatório determinístico para os tremores do stop-motion */
function createJitter(seed = 7) {
  let x = seed
  return () => (x = (x * 9301 + 49297) % 233280) / 233280 - 0.5
}

/**
 * Corrige o ângulo calculado pelo MotionPath para o avião nunca ficar de cabeça
 * para baixo: a foto olha para a esquerda, então indo para a esquerda ele só
 * inclina e indo para a direita ele espelha.
 */
export function planeOrientation(angle: number) {
  const normalized = ((((angle + 180) % 360) + 360) % 360) - 180
  const headingLeft = Math.abs(normalized) > 90
  const rotation = headingLeft
    ? normalized > 0
      ? normalized - 180
      : normalized + 180
    : normalized
  return { rotation, mirrored: !headingLeft }
}

/**
 * Voo em stop-motion com GSAP: o MotionPathPlugin leva o avião pela rota e o
 * DrawSVGPlugin revela o rastro, os dois com `ease: steps()`. O ScrollTrigger
 * toca o voo só enquanto o mapa está na tela.
 */
export function useFlightAnimation({
  figure,
  route,
  trail,
  plane,
  landingRing,
}: FlightRefs) {
  const { reduceMotion } = usePreferences()
  const { play } = useSound()
  const takeoffPlayed = useRef(false)

  useGSAP(
    () => {
      const planeEl = plane.current
      const routeEl = route.current
      const trailEl = trail.current
      if (!planeEl || !routeEl || !trailEl) return

      const landedPose = {
        rotation: 0,
        scaleX: PLANE.landedScale,
        scaleY: PLANE.landedScale,
        yPercent: -(PLANE.hoverAboveLanding / PLANE.height) * 100,
      }

      if (reduceMotion) {
        gsap.set(planeEl, {
          motionPath: {
            path: routeEl,
            align: routeEl,
            alignOrigin: [0.5, 0.5],
            start: 1,
            end: 1,
          },
        })
        gsap.set(planeEl, landedPose)
        gsap.set(trailEl, { drawSVG: '100%' })
        return
      }

      const jitter = createJitter()
      const duration = (FLIGHT_TIMING.steps * FLIGHT_TIMING.frameMs) / 1000
      const stepped = `steps(${FLIGHT_TIMING.steps})`

      const flight = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: FLIGHT_TIMING.holdAfterLandingMs / 1000,
      })

      flight
        .set(planeEl, { scaleX: 1, scaleY: 1, yPercent: 0 })
        .set(trailEl, { drawSVG: '0%' })
        .to(
          planeEl,
          {
            duration,
            ease: stepped,
            motionPath: {
              path: routeEl,
              align: routeEl,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            onUpdate() {
              const angle = Number(gsap.getProperty(planeEl, 'rotation'))
              const { rotation, mirrored } = planeOrientation(angle)
              const shake = jitter()
              gsap.set(planeEl, {
                rotation: rotation + shake * 8,
                scaleX: mirrored ? -1 : 1,
                yPercent: shake * 15,
              })
            },
          },
          0,
        )
        .to(trailEl, { duration, ease: stepped, drawSVG: '100%' }, 0)
        .set(planeEl, landedPose)
        .call(() => {
          const ring = landingRing.current
          ring?.classList.remove('hit')
          requestAnimationFrame(() => ring?.classList.add('hit'))
        })

      ScrollTrigger.create({
        trigger: figure.current,
        start: 'top 85%',
        end: 'bottom 15%',
        onToggle: ({ isActive }) => {
          if (!isActive) return flight.pause()
          if (!takeoffPlayed.current) {
            takeoffPlayed.current = true
            gsap.delayedCall(FLIGHT_TIMING.takeoffSoundDelayMs / 1000, () =>
              play('plane'),
            )
          }
          flight.play()
        },
      })
    },
    { scope: figure, dependencies: [reduceMotion, play], revertOnUpdate: true },
  )
}
