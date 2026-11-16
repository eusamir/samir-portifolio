import type { CaseStudy } from '@/business/domain/CaseStudy'
import { HeadSticker } from '@/presentation/shared/components/ui/Heads'

import { FramesShowcase } from '../framesShowcase'
import { PhonesShowcase } from '../phonesShowcase'
import { ScreensShowcase } from '../screensShowcase'
import { ProductsBlock } from '../productsBlock'
import { FishSticker } from '../fishSticker'

/** Um caso: resumo e textos no servidor; a vitrine animada escolhe a ilha de cliente pelo tipo. */
export function CaseStudySection({ caseStudy }: { caseStudy: CaseStudy }) {
  const {
    slug,
    railLabel,
    kicker,
    title,
    summary,
    notice,
    stack,
    link,
    products,
    showcase,
    sticker,
    tone,
  } = caseStudy.props
  const headingId = `h-${slug}`

  return (
    <section
      className={`case case-${slug}`}
      id={`caso-${slug}`}
      data-zone={tone === 'dark' ? 'b' : 'a'}
      data-rail={railLabel}
      aria-labelledby={headingId}
    >
      <div className="wrap">
        <div className="case-head">
          <p className="case-meta">{kicker}</p>
          {sticker === 'fish' && <FishSticker />}
          <h3 id={headingId}>{title}</h3>
          <dl className="tldr">
            {summary.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
          <p className="case-stack">
            {stack}{' '}
            {link && (
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            )}
          </p>
          {notice && (
            <div className="confid-row">
              <HeadSticker
                name="wink-wide"
                seed={21}
                rotate={-6}
                className="rip-shh"
              />
              <p className="confid mono">{notice}</p>
            </div>
          )}
        </div>
      </div>

      {products && <ProductsBlock {...products} />}

      {showcase.type === 'screens' && (
        <ScreensShowcase steps={showcase.steps} />
      )}
      {showcase.type === 'phones' && (
        <PhonesShowcase screens={showcase.screens} />
      )}
      {showcase.type === 'frames' && (
        <FramesShowcase {...showcase} withCamera={sticker === 'camera'} />
      )}
    </section>
  )
}
