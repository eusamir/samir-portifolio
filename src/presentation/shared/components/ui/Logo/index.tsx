import { cn } from '@/presentation/shared/lib/cn'

/** Logo SAM em traço contínuo; a bolinha é o nó da requisição. */
export function LogoWordmark({
  className,
  pathLength = true,
}: {
  className?: string
  pathLength?: boolean
}) {
  const pl = pathLength ? { pathLength: 1 } : {}
  return (
    <svg
      className={cn('logo', className)}
      viewBox="0 0 276 64"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="lg-s"
        {...pl}
        d="M38 12 A20 20 0 0 0 38 52 C52 52 56 12 70 12 A20 20 0 0 1 70 52"
      />
      <path className="lg-a" {...pl} d="M112 54 L133 10 L154 54" />
      <path
        className="lg-m"
        {...pl}
        d="M172 54 V28 A16 16 0 0 1 204 28 V54 M204 28 A16 16 0 0 1 220 12 H250"
      />
      <circle className="lg-ball" cx="261" cy="12" r="9.5" />
    </svg>
  )
}

export function LogoMonogram({ className }: { className?: string }) {
  return (
    <svg
      className={cn('logo', className)}
      viewBox="0 0 124 64"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="lg-s"
        pathLength={1}
        d="M38 12 A20 20 0 0 0 38 52 C52 52 56 12 70 12 A20 20 0 0 1 70 52 H98"
      />
      <circle className="lg-ball" cx="109" cy="52" r="9.5" />
    </svg>
  )
}
