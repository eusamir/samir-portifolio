import { makePageGateway } from '@/infra/factories/makePageGateway'
import { HeadSticker } from '@/presentation/shared/components/ui/Heads'

/** Seção 100% de servidor: nenhuma interatividade, nenhum JavaScript. */
export async function StackSection() {
  const { stack } = makePageGateway()
  const layers = await stack.getLayers()

  return (
    <section
      id="stack"
      data-zone="a"
      data-rail="stack"
      aria-labelledby="h-stack"
    >
      <div className="wrap section-head">
        <HeadSticker
          name="squint"
          seed={42}
          rotate={-5}
          className="rip-stack"
        />
        <h2 id="h-stack">Ferramentas e formação.</h2>
        <p>
          Organizadas pelo lugar onde atuam na arquitetura, não por logotipo.
        </p>
      </div>
      <div className="wrap">
        <ul className="layers">
          {layers.map((l) => (
            <li key={l.props.title}>
              <h3>{l.props.title}</h3>
              <p>{l.props.items.join(', ')}.</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
