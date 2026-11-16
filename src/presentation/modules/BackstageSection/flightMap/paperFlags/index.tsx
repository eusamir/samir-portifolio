import { DESTINATION_PIN, ORIGIN_PIN } from '../constants'

const POLE_HEIGHT = { origin: 82, destination: 102 }

/** Bandeiras de papel de Portugal e do Brasil, fincadas nos pinos e tremulando em stop-motion. */
export function PaperFlags() {
  return (
    <g>
      <line
        className="pole"
        x1={ORIGIN_PIN.x}
        y1={ORIGIN_PIN.y}
        x2={ORIGIN_PIN.x}
        y2={ORIGIN_PIN.y - POLE_HEIGHT.origin}
      />
      <g
        transform={`translate(${ORIGIN_PIN.x + 1} ${ORIGIN_PIN.y - POLE_HEIGHT.origin + 2})`}
      >
        <g className="flag" filter="url(#flagTorn)">
          <rect width="26.4" height="44" fill="#046A38" />
          <rect x="26.4" width="39.6" height="44" fill="#DA291C" />
          <circle
            cx="26.4"
            cy="22"
            r="10.5"
            fill="none"
            stroke="#FFE900"
            strokeWidth="2.6"
          />
          <path
            d="M21.4 15.5 h10 v8 a5 5 0 0 1 -10 0 Z"
            fill="#DA291C"
            stroke="#fff"
            strokeWidth="1.6"
          />
          <rect width="66" height="44" fill="url(#mapDots)" />
        </g>
      </g>

      <line
        className="pole"
        x1={DESTINATION_PIN.x}
        y1={DESTINATION_PIN.y}
        x2={DESTINATION_PIN.x}
        y2={DESTINATION_PIN.y - POLE_HEIGHT.destination}
      />
      <g
        transform={`translate(${DESTINATION_PIN.x + 1} ${DESTINATION_PIN.y - POLE_HEIGHT.destination + 2})`}
      >
        <g className="flag br" filter="url(#flagTorn)">
          <rect width="66" height="46" fill="#009C3B" />
          <path d="M33 5 L61 23 L33 41 L5 23 Z" fill="#FFDF00" />
          <circle cx="33" cy="23" r="10.5" fill="#002776" />
          <path
            d="M22.9 20.6 Q33 17.6 43.1 24.4"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
          />
          <rect width="66" height="46" fill="url(#mapDots)" />
        </g>
      </g>
    </g>
  )
}
