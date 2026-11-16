import { makePageGateway } from '@/infra/factories/makePageGateway'

import { FlightMap } from './flightMap'
import { HorizontalGallery } from './horizontalGallery'
import { RansomTitle } from './ransomTitle'

export async function BackstageSection() {
  const { backstage, profile } = makePageGateway()
  const [photos, result] = await Promise.all([
    backstage.getPhotos(),
    profile.getProfile(),
  ])

  if (!result) return null

  const { flight, location } = result.props
  return (
    <section
      id="bastidores"
      data-zone="b"
      data-rail="bastidores"
      aria-labelledby="h-bs"
    >
      <div className="wrap section-head">
        <RansomTitle id="h-bs">Quem está por trás do trace.</RansomTitle>
        <p>
          Eventos, times e projetos, em São Luís e por onde o trabalho levou.
        </p>
      </div>
      <div className="wrap voo">
        <p className="voo-txt">{flight.text}</p>
        <FlightMap
          origin={flight.origin.label}
          destination={flight.destination.label}
        />
      </div>
      <HorizontalGallery
        photos={photos.map((p) => p.props)}
        location={location}
      />
    </section>
  )
}
