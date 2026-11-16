import { makePageGateway } from '@/infra/factories/makePageGateway'
import { HeadSticker } from '@/presentation/shared/components/ui/Heads'

import { CaseStudySection } from './caseStudy'

export async function CasesSection() {
  const { cases: casesGateway } = makePageGateway()
  const cases = await casesGateway.getCaseStudies()

  if (!cases.length) return null

  return (
    <>
      <section
        id="casos"
        data-zone="a"
        data-rail="casos"
        aria-labelledby="h-casos"
      >
        <div className="wrap section-head">
          <HeadSticker
            name="side-eye"
            seed={14}
            rotate={5}
            flip
            className="rip-casos"
          />
          <h2 id="h-casos">
            {cases.length === 3 ? 'Três' : cases.length} projetos, do problema
            ao resultado.
          </h2>
          <p>
            Cada caso começa pelo resumo e segue pelas telas: uma plataforma em
            produção em dois países, um app de campo e um portfólio de atriz.
          </p>
        </div>
      </section>
      {cases.map((c) => (
        <CaseStudySection key={c.props.slug} caseStudy={c} />
      ))}
    </>
  )
}
