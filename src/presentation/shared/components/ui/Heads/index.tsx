import Image from 'next/image'

import { TornPaper } from '@/presentation/shared/components/ui/TornPaper'
import { RipSticker } from '@/presentation/shared/components/ui/RipSticker'
import { Sparkle } from '@/presentation/shared/components/ui/Sparkle'

/** As expressões disponíveis (recortes em P&B com retícula, em /public/images/heads) */
export type HeadName =
  | 'wow'
  | 'wink-wide'
  | 'side-surprise'
  | 'squint'
  | 'big-smile'
  | 'side-eye'
  | 'smirk'

const SIZE = { width: 300, height: 420 }

export function HeadSticker({
  name,
  seed,
  rotate,
  flip,
  className,
}: {
  name: HeadName
  seed: number
  rotate?: number
  flip?: boolean
  className?: string
}) {
  return (
    <RipSticker
      className={className}
      rotate={rotate}
      flip={flip}
      paper={<TornPaper seed={seed} className="rip-paper" />}
    >
      <Image
        src={`/images/heads/${name}.webp`}
        alt=""
        {...SIZE}
        sizes="160px"
      />
    </RipSticker>
  )
}

/** O "gif" do piscar: dois quadros alinhados e uma estrela, em CSS (leve e nítido). */
export function WinkSticker({ className }: { className?: string }) {
  return (
    <RipSticker
      className={className}
      rotate={-4}
      paper={<TornPaper seed={7} className="rip-paper" />}
      extra={
        <span className="rip-tags">
          <b className="t-ink">ainda</b>
          <b className="t-vio">em execução</b>
          <b className="t-amb">desde 2021</b>
        </span>
      }
    >
      <span className="wink-stack">
        <Image
          src="/images/heads/open.webp"
          alt=""
          width={300}
          height={420}
          sizes="160px"
          priority={false}
        />
        <Image
          className="wink-closed"
          src="/images/heads/wink.webp"
          alt=""
          width={300}
          height={420}
          sizes="160px"
        />
        <Sparkle className="wink-star" />
      </span>
    </RipSticker>
  )
}
