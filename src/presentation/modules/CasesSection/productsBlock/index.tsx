import type { CaseProduct, CaseFact } from '@/business/domain/CaseStudy'

export function ProductsBlock({
  title,
  intro,
  items,
  facts,
}: {
  title: string
  intro: string
  items: CaseProduct[]
  facts: CaseFact[]
}) {
  return (
    <div className="wrap ml">
      <div className="ml-intro">
        <h4 className="ml-title">{title}</h4>
        <p>{intro}</p>
      </div>
      <div className="ml-products">
        {items.map((p) => (
          <article key={p.name} className="ml-prod">
            <span className="mono ml-flag">{p.flag}</span>
            <h5>{p.name}</h5>
            <p>{p.description}</p>
            <a href={p.url} target="_blank" rel="noopener noreferrer">
              {p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </a>
          </article>
        ))}
      </div>
      <dl className="ml-facts">
        {facts.map((f) => (
          <div key={f.value}>
            <dt className="mono">{f.value}</dt>
            <dd>{f.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
