import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="not-found wrap" data-zone="b">
      <Image
        src="/images/heads/wow.webp"
        alt=""
        width={180}
        height={252}
        priority
      />
      <h1>404, este span não existe.</h1>
      <p className="mono">GET {'<rota>'} → 404 Not Found</p>
      <Link className="btn solid" href="/">
        Voltar ao início
      </Link>
    </section>
  )
}
