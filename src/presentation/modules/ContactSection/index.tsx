import { makePageGateway } from '@/infra/factories/makePageGateway'
import { HeadSticker } from '@/presentation/shared/components/ui/Heads'
import { traceDuration } from '@/presentation/shared/lib/time'
import { TraceSpan } from '@/business/domain/TraceSpan'

import { CopyEmail } from './copyEmail'
import { FootLogo } from './footLogo'

export async function ContactSection() {
  const { profile } = makePageGateway()
  const result = await profile.getProfile()

  if (!result) return null

  const { email, socials, location, traceStart } = result.props
  return (
    <section
      id="contato"
      data-zone="b"
      data-rail="contato"
      aria-labelledby="h-contato"
    >
      <div className="wrap contact">
        <div>
          <HeadSticker
            name="big-smile"
            seed={49}
            rotate={6}
            className="rip-hi"
          />
          <h2 id="h-contato">Vamos conversar sobre o seu sistema.</h2>
          <div className="contact-grid">
            <ul className="channels">
              <li>
                <CopyEmail email={email} />
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    <span className="k mono">{s.label}</span>
                    {s.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <FootLogo />
        <footer className="foot mono">
          <span>{location}</span>
          <span>
            trace samir-andrade,{' '}
            {traceDuration(TraceSpan.toDecimal(traceStart))}, 200 OK
          </span>
        </footer>
      </div>
    </section>
  )
}
