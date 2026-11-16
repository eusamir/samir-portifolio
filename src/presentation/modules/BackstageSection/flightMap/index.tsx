'use client'

import { useRef } from 'react'

import {
  BRAZIL_SHAPE,
  DESTINATION_PIN,
  FLIGHT_ROUTE,
  ORIGIN_PIN,
  PLANE,
  PORTUGAL_SHAPE,
} from './constants'
import { MapFilters } from './mapFilters'
import { PaperFlags } from './paperFlags'
import { useFlightAnimation } from './useFlightAnimation'

interface FlightMapProps {
  origin: string
  destination: string
}

const LANDS = [
  { id: 'pt', shape: PORTUGAL_SHAPE, color: '#FFB547' },
  { id: 'br', shape: BRAZIL_SHAPE, color: '#7C4DFF' },
]

/** Avião voando de Ovar a São Luís em stop-motion, com rota tracejada e bandeiras de papel. */
export function FlightMap({ origin, destination }: FlightMapProps) {
  const figure = useRef<HTMLElement>(null)
  const route = useRef<SVGPathElement>(null)
  const trail = useRef<SVGPathElement>(null)
  const plane = useRef<SVGGElement>(null)
  const landingRing = useRef<SVGCircleElement>(null)

  useFlightAnimation({ figure, route, trail, plane, landingRing })

  return (
    <figure
      className="voo-map"
      ref={figure}
      role="img"
      aria-label={`Animação de um avião voando de ${origin} até ${destination}`}
    >
      <svg viewBox="0 0 1000 420" aria-hidden="true" focusable="false">
        <MapFilters ref={trail} />

        {LANDS.map((land) => (
          <g key={land.id} className="land">
            <path d={land.shape} fill="#fff" filter="url(#mapCore)" />
            <path d={land.shape} fill={land.color} filter="url(#mapTorn)" />
            <path d={land.shape} fill="url(#mapDots)" filter="url(#mapTorn)" />
          </g>
        ))}

        <path className="route-ghost" d={FLIGHT_ROUTE} />
        <path
          className="route"
          ref={route}
          d={FLIGHT_ROUTE}
          mask="url(#trailMask)"
        />
        <PaperFlags />

        <circle className="pin" cx={ORIGIN_PIN.x} cy={ORIGIN_PIN.y} r="7" />
        <circle
          className="pin"
          cx={DESTINATION_PIN.x}
          cy={DESTINATION_PIN.y}
          r="7"
        />
        <circle
          className="pin-ring"
          ref={landingRing}
          cx={DESTINATION_PIN.x}
          cy={DESTINATION_PIN.y}
          r="7"
        />

        <g className="tag t-ink" transform="translate(846 118) rotate(4)">
          <rect y="-22" width="170" height="34" />
          <text x="12" y="1">
            {origin}
          </text>
        </g>
        <text className="mono-lbl" x="872" y="90" transform="rotate(4 872 90)">
          origem
        </text>
        <g className="tag t-vio" transform="translate(52 128) rotate(-4)">
          <rect y="-22" width="200" height="34" />
          <text x="12" y="1">
            {destination}
          </text>
        </g>
        <text className="mono-lbl" x="56" y="96" transform="rotate(-4 56 96)">
          destino
        </text>

        <g ref={plane} filter="url(#planeInk)">
          <image
            href="/images/collage/plane.webp"
            x={-PLANE.width / 2}
            y={-PLANE.height / 2}
            width={PLANE.width}
            height={PLANE.height}
          />
        </g>
      </svg>
    </figure>
  )
}
