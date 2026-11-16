import { forwardRef } from 'react'

import { FLIGHT_ROUTE } from '../constants'

/** Filtros SVG do papel rasgado, da sombra do avião e a máscara que revela a rota. */
export const MapFilters = forwardRef<SVGPathElement>(
  function MapFilters(_props, trailRef) {
    return (
      <defs>
        <filter id="mapTorn" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves={4}
            seed={9}
            result="n"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={1}
            seed={4}
            result="f"
          />
          <feComposite
            in="n"
            in2="f"
            operator="arithmetic"
            k2={1}
            k3={0.5}
            result="m"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="m"
            scale={12}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="mapCore" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves={4}
            seed={9}
            result="n"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.1"
            numOctaves={1}
            seed={7}
            result="f"
          />
          <feComposite
            in="n"
            in2="f"
            operator="arithmetic"
            k2={1}
            k3={0.7}
            result="m"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="m"
            scale={16}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="flagTorn" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.08"
            numOctaves={3}
            seed={5}
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale={4.5}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="planeInk" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx={-3} dy={3} stdDeviation={0} floodColor="#7C4DFF" />
          <feDropShadow
            dx={0}
            dy={6}
            stdDeviation={4}
            floodColor="#000"
            floodOpacity={0.35}
          />
        </filter>
        <mask id="trailMask" maskUnits="userSpaceOnUse">
          <path
            ref={trailRef}
            d={FLIGHT_ROUTE}
            fill="none"
            stroke="#fff"
            strokeWidth={10}
            strokeLinecap="round"
          />
        </mask>
        <pattern
          id="mapDots"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r=".8" fill="#000" opacity=".16" />
        </pattern>
      </defs>
    )
  },
)
