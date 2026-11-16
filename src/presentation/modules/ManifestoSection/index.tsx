import { makePageGateway } from '@/infra/factories/makePageGateway'

import { ManifestoReveal } from './manifestoReveal'

/** O texto é renderizado no servidor (indexável); o efeito de acender palavra por palavra é progressivo. */
export async function ManifestoSection() {
  const { profile } = makePageGateway()
  const result = await profile.getProfile()

  if (!result) return null

  const { manifesto, manifestoHighlights } = result.props
  return (
    <section
      id="manifesto"
      data-zone="b"
      aria-label="Manifesto"
      className="manifesto"
    >
      <ManifestoReveal highlights={manifestoHighlights}>
        {manifesto}
      </ManifestoReveal>
    </section>
  )
}
