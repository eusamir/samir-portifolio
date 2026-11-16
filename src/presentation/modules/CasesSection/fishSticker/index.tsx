import Image from 'next/image'

import { RipSticker } from '@/presentation/shared/components/ui/RipSticker'
import { TornPaper } from '@/presentation/shared/components/ui/TornPaper'

/** Peixe se debatendo em stop-motion: três quadros alternados só com CSS. */
export function FishSticker() {
  return (
    <RipSticker
      className="rip-fish"
      rotate={-3}
      paper={<TornPaper seed={61} className="rip-paper" />}
    >
      <span className="fish-stack">
        <Image
          className="f-straight"
          src="/images/collage/fish-straight.webp"
          alt=""
          width={440}
          height={247}
          sizes="250px"
        />
        <Image
          className="f-up"
          src="/images/collage/fish-up.webp"
          alt=""
          width={440}
          height={247}
          sizes="250px"
        />
        <Image
          className="f-down"
          src="/images/collage/fish-down.webp"
          alt=""
          width={440}
          height={247}
          sizes="250px"
        />
      </span>
    </RipSticker>
  )
}
