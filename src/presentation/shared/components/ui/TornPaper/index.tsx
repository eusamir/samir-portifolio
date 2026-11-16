import { seeded } from '@/presentation/shared/lib/seeded'

const COMBOS: [string, string][] = [
  ['#7C4DFF', '#FFB547'],
  ['#FFB547', '#17121F'],
  ['#CDBDFF', '#7C4DFF'],
  ['#17121F', '#7C4DFF'],
  ['#7C4DFF', '#CDBDFF'],
  ['#FFB547', '#7C4DFF'],
]

function tornFilter(id: string, seed: number, scale: number) {
  return (
    <filter id={id} x="-20%" y="-60%" width="140%" height="220%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.012 0.034"
        numOctaves={4}
        seed={seed}
        result="n"
      />
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.9"
        numOctaves={1}
        seed={seed + 5}
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
        scale={scale}
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  )
}

function Strip({
  seed,
  x,
  y,
  w,
  h,
  rot,
  color,
}: {
  seed: number
  x: number
  y: number
  w: number
  h: number
  rot: number
  color: string
}) {
  const core = `tc${seed}`
  const face = `tf${seed}`
  const crumple = `cr${seed}`
  return (
    <>
      <defs>
        {tornFilter(core, seed, 30)}
        {tornFilter(face, seed, 24)}
        <filter id={crumple} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves={4}
            seed={seed + 2}
            result="t"
          />
          <feDiffuseLighting
            in="t"
            lightingColor="#fff"
            surfaceScale={2.4}
            result="l"
          >
            <feDistantLight azimuth={235} elevation={52} />
          </feDiffuseLighting>
          <feComposite
            in="l"
            in2="SourceGraphic"
            operator="arithmetic"
            k1={1.18}
            k4={0.02}
            result="lit"
          />
          <feComposite in="lit" in2="SourceAlpha" operator="in" />
        </filter>
      </defs>
      <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
        <rect
          x={x - 4}
          y={y - 5}
          width={w + 8}
          height={h + 10}
          fill="#fff"
          filter={`url(#${core})`}
        />
        <g filter={`url(#${crumple})`}>
          <rect
            x={x}
            y={y}
            width={w}
            height={h}
            fill={color}
            filter={`url(#${face})`}
          />
        </g>
      </g>
    </>
  )
}

/**
 * Duas tiras de papel colorido rasgado, com a fibra branca na borda e textura amassada.
 * Renderizado no servidor: o seed garante o mesmo rasgo no SSR e no cliente.
 */
export function TornPaper({
  seed,
  className,
}: {
  seed: number
  className?: string
}) {
  const rnd = seeded(seed)
  const [c1, c2] = COMBOS[seed % COMBOS.length] ?? COMBOS[0]!
  const r1 = Math.round(rnd() * 7) - 4
  const r2 = Math.round(rnd() * 6) - 2
  return (
    <svg
      className={className}
      viewBox="0 0 400 230"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <Strip seed={seed} x={6} y={34} w={388} h={118} rot={r1} color={c1} />
      <Strip
        seed={seed + 11}
        x={22}
        y={110}
        w={360}
        h={92}
        rot={r2}
        color={c2}
      />
    </svg>
  )
}
