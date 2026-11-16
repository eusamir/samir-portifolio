import { makePageGateway } from '@/infra/factories/makePageGateway'

import { HeroStage } from './heroStage'

/** Seção de abertura. O texto chega pronto do servidor; a cena (lente, letras e portal) hidrata no cliente. */
export async function HeroSection() {
  const { profile } = makePageGateway()
  const result = await profile.getProfile()

  if (!result) return null

  const { name, role } = result.props
  return (
    <section
      className="hero-pin"
      id="inicio"
      data-zone="a"
      data-rail="início"
      aria-labelledby="h-nome"
    >
      <h1 id="h-nome" className="sr-only">
        {name}
      </h1>
      <HeroStage name={name}>
        <div className="hero-foot">
          <p className="lede">{role}</p>
          <div className="actions">
            <a className="btn solid" href="#trajetoria">
              Ver a trajetória
            </a>
            <a className="btn" href="#contato">
              Falar comigo
            </a>
          </div>
        </div>
      </HeroStage>
    </section>
  )
}
