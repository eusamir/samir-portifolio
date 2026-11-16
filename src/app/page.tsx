import { BackstageSection } from '@/presentation/modules/BackstageSection'
import { CasesSection } from '@/presentation/modules/CasesSection'
import { ContactSection } from '@/presentation/modules/ContactSection'
import { HeroSection } from '@/presentation/modules/HeroSection'
import { ManifestoSection } from '@/presentation/modules/ManifestoSection'
import { ProjectsSection } from '@/presentation/modules/ProjectsSection'
import { StackSection } from '@/presentation/modules/StackSection'
import { TrajectorySection } from '@/presentation/modules/TrajectorySection'

/** Conteúdo local: a página inteira é gerada no build (estática) e servida pela CDN da Vercel. */
export const dynamic = 'force-static'

export default async function Home() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <TrajectorySection />
      <CasesSection />
      <ProjectsSection />
      <BackstageSection />
      <StackSection />
      <ContactSection />
    </>
  )
}
